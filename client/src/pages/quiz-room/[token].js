import { useReducer, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from '@/lib/axios'
import pusher from '@/lib/pusher'
import useSWR from 'swr'
import { useAuth } from '@/hooks/auth'
import Lobby from '@/components/quiz-room/lobby'
import PreStart from '@/components/quiz-room/PreStart'
import PreQuestion from '@/components/quiz-room/PreQuestion'
import Question from '@/components/quiz-room/Question'
import Leaderboard from '@/components/quiz-room/Leaderboard'

let roomChannel = null
let hostId = null
let quizId = null
let lastQuestionTime = null
let currentQuestion = null

const states = {
    lobby: 'LOBBY',
    pre_start: 'PRE_START',
    pre_question: 'PRE_QUESTION',
    question: 'QUESTION',
    result: 'RESULT',
    leaderboard: 'LEADERBOARD',
}

const roomReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            if (
                !state.players.some(e => e.id === action.player.id) &&
                hostId !== action.player.id
            )
                return {
                    ...state,
                    players: [...state.players, action.player],
                }
            else
                return {
                    ...state,
                    players: state.players.map(player =>
                        player.id === action.player.id
                            ? { ...player, hasLeft: false }
                            : player,
                    ),
                }
        case 'LEFT_PLAYER':
            return {
                ...state,
                players: state.players.map(player =>
                    player.id === action.id
                        ? { ...player, hasLeft: true }
                        : player,
                ),
            }
        case 'NICKNAME_PLAYER':
            return {
                ...state,
                players: state.players.map(player =>
                    player.id === action.id && player.name === ''
                        ? { ...player, name: action.nickname }
                        : player,
                ),
            }
        case 'TOGGLE_LOCK_ROOM':
            return {
                ...state,
                data: { ...state.data, isLocked: !state.data.isLocked },
            }
        case 'GAME_PIN_ROOM':
            return {
                ...state,
                data: { ...state.data, roomPIN: action.pin },
            }
        case 'CURRENT_QUESTION_ROOM':
            return {
                ...state,
                data: { ...state.data, currentQuestion: action.questionNo },
            }
        case 'STATE_ROOM':
            return {
                ...state,
                data: { ...state.data, currentState: action.state },
            }
        case 'DATA_QUIZ':
            return {
                ...state,
                quiz: {
                    ...state.quiz,
                    cover: action.cover,
                    title: action.title,
                    description: action.desc,
                },
            }
        case 'DATA_QUESTION':
            return {
                ...state,
                questions: [...state.questions, action.question],
            }
        case 'ADD_ANSWER':
            if (
                !state.answers.some(
                    e =>
                        e.user_id === action.answer.user_id &&
                        e.question_no === action.answer.question_no,
                )
            )
                return {
                    ...state,
                    answers: [...state.answers, action.answer],
                }
            else return state
        default:
            return state
    }
}

const QuizRoom = () => {
    const router = useRouter()
    const {} = useAuth({ middleware: 'auth' })

    const [room, dispatch] = useReducer(roomReducer, {
        data: {
            roomPIN: null,
            isLocked: false,
            currentState: states.lobby,
            currentQuestion: 0,
        },
        players: [],
        quiz: { cover: null, title: null, description: null },
        questions: [],
        answers: [],
    })

    // Room handlers
    const handleLockRoom = () => dispatch({ type: 'TOGGLE_LOCK_ROOM' })

    const handlePinRoom = pin => dispatch({ type: 'GAME_PIN_ROOM', pin: pin })

    const handleCurrentQuestionRoom = questionNo =>
        dispatch({ type: 'CURRENT_QUESTION_ROOM', questionNo: questionNo })

    const handleStateRoom = state =>
        dispatch({ type: 'STATE_ROOM', state: state })

    // quiz handlers
    const handleDataQuiz = (cover, title, desc) =>
        dispatch({
            type: 'DATA_QUIZ',
            cover: cover,
            title: title,
            desc: desc,
        })

    // question handlers
    const handleDataQuestion = question =>
        dispatch({
            type: 'DATA_QUESTION',
            question: question,
        })

    // Player handlers
    const handleNewPlayer = player =>
        dispatch({ type: 'ADD_PLAYER', player: player })

    const handleLeftPlayer = userId =>
        dispatch({ type: 'LEFT_PLAYER', id: userId })

    const handleNicknamePlayer = (userId, nickname) =>
        dispatch({ type: 'NICKNAME_PLAYER', id: userId, nickname: nickname })

    // Answer handlers
    const handleNewAnswer = answer =>
        dispatch({ type: 'ADD_ANSWER', answer: answer })

    // game states
    const startTheGame = () => {
        requestGameState(states.pre_start)
        startQuestion(room.data.currentQuestion + 1)
    }

    const startQuestion = questionId => {
        handleCurrentQuestionRoom(questionId)
        const timeout1 = setTimeout(function () {
            requestGameState(states.pre_question)
        }, 3000)
        const timeout2 = setTimeout(function () {
            requestGameState(states.question)
        }, 7000)
        // clearTimeout(timeout1)
        // clearTimeout(timeout2)
    }

    const nextQuestion = questionId => {
        handleCurrentQuestionRoom(questionId)
        handleStateRoom(states.pre_question)
        requestGameState(states.pre_question)
        const timeout2 = setTimeout(function () {
            requestGameState(states.question)
        }, 4000)
        // clearTimeout(timeout1)
        // clearTimeout(timeout2)
    }

    const finishTheGame = () => {
        requestGameState(states.leaderboard)
    }

    const calculateScore = (isCorrect, time, type) => {
        if (type == 0 || !isCorrect) return 0
        else if (type == 1) return Math.round(1000 / time)
        else if (type == 2) return Math.round(2000 / time)
    }

    const requestGameState = state => {
        axios
            .post('/api/room/game/state', {
                game_state: state,
                current_question: room.data.currentQuestion + 1,
                room_token: router.query.token,
            })
            .then(response => {
                if (state == states.question) {
                    lastQuestionTime = new Date()
                    currentQuestion = room.questions.find(
                        (o, index) => index == room.data.currentQuestion,
                    )
                }
                handleStateRoom(state)
                // this a replacement of the server side state changer to check if it'll fix the socket!
                //gameStateTrigger(state)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const requestQuizData = quizId => {
        if (room.questions.length > 0) return
        axios
            .get('/api/quiz/' + quizId)
            .then(response => {
                const data = response.data[0]
                handleDataQuiz(data.cover, data.title, data.description)
                data.questions.forEach(q => handleDataQuestion(q))
            })
            .catch(error => {
                console.log(error)
            })
    }

    const requestPlayerAnswer = (userId, answerId, answerWithin, score) => {
        axios
            .post('/api/room/player/answer-request', {
                room_token: router.query.token,
                user_id: userId,
                answer_id: answerId,
                answer_within: answerWithin,
                score: score,
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const gameStateTrigger = state => {
        roomChannel.trigger('client-game-state', {
            state: state,
        })
    }
    const kickPlayer = id => {
        roomChannel.trigger('client-kick-player', {
            user_id: id,
        })
    }

    const sendToClient = (id, message) => {
        roomChannel.trigger('client-' + router.query.token + '-' + id, {
            message: message,
        })
    }

    const questionIsOver = () => {
        roomChannel.trigger('client-question-over-' + router.query.token, {
            host_id: hostId,
        })
    }

    const endTheRoom = () => {
        roomChannel.trigger('client-room-end-' + router.query.token, {
            host_id: hostId,
        })
        window.location.pathname = '/dashboard'
    }

    const validateRoom = _callback => {
        axios
            .post('/api/room/validate-host/' + router.query.token)
            .then(response => {
                if (response.status === 200) {
                    hostId = response.data.host_id
                    quizId = response.data.quiz_id
                    requestQuizData(quizId)
                    _callback()
                } else router.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
                router.push('/dashboard')
            })
    }

    const stateRender = () => {
        switch (room.data.currentState) {
            case states.lobby:
                return (
                    <Lobby
                        setIsLocked={handleLockRoom}
                        isLocked={room.data.isLocked}
                        gamePIN={room.data.roomPIN}
                        connectedUsers={room.players.filter(
                            user => !user.hasLeft,
                        )}
                        kickPlayer={kickPlayer}
                        startTheGame={startTheGame}
                    />
                )
            case states.pre_start:
                return (
                    <PreStart
                        quiz={room.quiz}
                        isLocked={room.data.isLocked}
                        gamePIN={room.data.roomPIN}
                        connectedUsers={room.players.filter(
                            user => !user.hasLeft,
                        )}
                    />
                )
            case states.pre_question:
                return (
                    <PreQuestion
                        currentQuestion={room.data.currentQuestion}
                        count={room.questions.length}
                        question={room.questions[room.data.currentQuestion - 1]}
                        isLocked={room.data.isLocked}
                        gamePIN={room.data.roomPIN}
                        connectedUsers={room.players.filter(
                            user => !user.hasLeft,
                        )}
                    />
                )
            case states.question:
                return (
                    <Question
                        currentQuestion={room.data.currentQuestion}
                        count={room.questions.length}
                        question={room.questions[room.data.currentQuestion - 1]}
                        answers={room.answers.filter(
                            i => i.question_no == room.data.currentQuestion,
                        )}
                        allAnswers={room.answers}
                        nextQuestion={nextQuestion}
                        finish={finishTheGame}
                        questionIsOver={questionIsOver}
                    />
                )
            case states.leaderboard:
                return (
                    <Leaderboard
                        allAnswers={room.answers}
                        method={endTheRoom}
                    />
                )
        }
    }

    useEffect(() => {
        if (!router.isReady) return

        document
            .querySelector('body')
            .classList.add('overflow-x-hidden', 'h-full', 'w-screen')

        validateRoom(() => {
            axios
                .post('/api/room/request-pin/' + router.query.token)
                .then(response => {
                    if (response.status === 201)
                        handlePinRoom(response.data.room_pin)
                })
                .catch(error => {
                    console.log(error)
                })

            roomChannel = pusher.subscribe(
                'presence-game.' + router.query.token,
            )

            roomChannel.bind('pusher:subscription_succeeded', members => {
                // for (const [key, value] of Object.entries(members.members))
                //     handleNewPlayer({ id: value.id, name: value.name })
            })

            roomChannel.bind('pusher:subscription_error', error => {
                console.log(JSON.stringify(error))
            })

            roomChannel.bind('pusher:member_added', member => {
                handleNewPlayer({
                    id: member.info.id,
                    name: '',
                    hasLeft: false,
                })
            })

            roomChannel.bind('pusher:member_removed', member => {
                handleLeftPlayer(member.info.id)
            })

            roomChannel.bind('client-player-nickname', (data, metadata) => {
                handleNicknamePlayer(data.user_id, data.nickname)
            })

            roomChannel.bind('client-submit-answer', (data, metadata) => {
                // validate the submitted answer
                if (data.answer_id > 3) return
                const answerWithin = (new Date() - lastQuestionTime) / 1000
                const answer = currentQuestion.answers[data.answer_id]
                const score = calculateScore(
                    answer.is_correct,
                    answerWithin,
                    currentQuestion.points,
                )
                // validate that this user didn't answer this question before
                handleNewAnswer({
                    user_id: data.user_id,
                    name: data.name,
                    question_no: data.question_no,
                    answer_index: data.answer_id,
                    answer_id: answer.id,
                    isCorrect: answer.is_correct,
                    time: answerWithin,
                    score: score,
                })
                sendToClient(data.user_id, {
                    score: score,
                    isCorrect: answer.is_correct,
                    place: 1,
                })
                // insert in the database
                requestPlayerAnswer(
                    data.user_id,
                    answer.id,
                    answerWithin,
                    score,
                )
            })
        })

        return () => {
            document
                .querySelector('body')
                .classList.remove('overflow-x-hidden', 'h-full', 'w-screen')
            pusher.unsubscribe('presence-game.' + router.query.token)
        }
    }, [router.isReady, pusher])

    return (
        <>
            <Head>
                <title>Quizzerie | Quiz room</title>
            </Head>
            <div className="flex flex-col h-full bg-purple-pattern min-h-screen">
                {stateRender()}
            </div>
        </>
    )
}

export default QuizRoom
