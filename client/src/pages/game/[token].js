import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from '@/lib/axios'
import pusher from '@/lib/pusher'
import { useAuth } from '@/hooks/auth'
import Question from '@/components/game/Question'
import QuestionResult from '@/components/game/QuestionResult'

const states = {
    lobby: 'LOBBY',
    pre_start: 'PRE_START',
    pre_question: 'PRE_QUESTION',
    question: 'QUESTION',
    result: 'RESULT',
    leaderboard: 'LEADERBOARD',
}

let userId = null
let hostId = null
let gameChannel = null
let hasAnswered = false
let scoreCounter = 0

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_RESULT':
            return {
                ...state,
                result: {
                    ...state.result,
                    score: action.score,
                    isCorrect: action.isCorrect,
                    place: action.place,
                },
            }
        case 'STATE_GAME':
            return {
                ...state,
                data: { ...state.data, currentState: action.state },
            }
        case 'CURRENT_QUESTION_GAME':
            return {
                ...state,
                data: { ...state.data, currentQuestion: action.questionNo },
            }
        default:
            return state
    }
}

const QuizRoom = () => {
    const router = useRouter()
    const {} = useAuth({ middleware: 'auth' })
    const [game, dispatch] = useReducer(gameReducer, {
        data: {
            currentState: states.lobby,
            currentQuestion: 0,
        },
        result: { score: 0, isCorrect: 0, place: 0 },
    })
    const [score, setScore] = useState(0)

    const handleStateGame = state =>
        dispatch({ type: 'STATE_GAME', state: state })

    const handleCurrentQuestionGame = questionNo =>
        dispatch({ type: 'CURRENT_QUESTION_GAME', questionNo: questionNo })

    const handleUpdateResult = (score, isCorrect, place) =>
        dispatch({
            type: 'UPDATE_RESULT',
            score: score,
            isCorrect: isCorrect,
            place: place,
        })

    const requestNickname = () => {
        // check if the nickname is already set then don't set it again
        axios
            .post('/api/room/player/nickname-request', {
                room_token: router.query.token,
                nickname: router.query.nickname,
            })
            .then(response => {
                console.log(response.data)
                gameChannel.trigger('client-player-nickname', {
                    nickname: router.query.nickname,
                    user_id: userId,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const validateGame = _callback => {
        axios
            .post('/api/room/validate/' + router.query.token)
            .then(response => {
                if (response.status === 200) {
                    userId = response.data.user_id
                    hostId = response.data.host_id
                    _callback()
                } else window.location.pathname = '/'
            })
            .catch(error => {
                console.log(error)
                window.location.pathname = '/'
            })
    }

    const submitAnswer = id => {
        gameChannel.trigger('client-submit-answer', {
            user_id: userId,
            answer_id: id,
            question_no: game.data.currentQuestion,
            name: router.query.nickname,
        })
    }

    const updateResult = data => {
        handleUpdateResult(data.score, data.isCorrect, data.place)
        handleStateGame(states.result)
        scoreCounter += data.score
        setScore(scoreCounter)
    }

    const renderState = () => {
        switch (game.data.currentState) {
            case states.lobby:
                return (
                    <>
                        <div class="relative inline-flex">
                            <div
                                className={`border-3 border-black shadow-yellow-xl rounded-xl w-full h-24 p-2 flex justify-center items-center bg-pink-pattern`}
                                Style="box-shadow: 6px 6px 0 #fcd34d">
                                <div className="text-center">
                                    <div className="text-4xl font-bold block text-white text-shadow-gray font-gluten ">
                                        You're in
                                    </div>
                                    <span className="text-base text-gray-50 font-semibold">
                                        Please wait, until the host starts the
                                        game!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case states.pre_start:
                return (
                    <>
                        <div class="relative inline-flex">
                            <div class="font-gluten border-3 border-black shadow-yellow rounded-xl w-full h-24 p-2 flex justify-center items-center gradient-pink">
                                <div class="text-center">
                                    <div className="font-bold text-4xl text-shadow-gray animate-pulse">
                                        Loading
                                    </div>
                                    <span class="text-base text-gray-50 font-semibold">
                                        Get ready, the fun is about begin!
                                    </span>
                                </div>
                            </div>
                            <span class="flex absolute h-5 w-5 -top-1 -right-1 font-gluten">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-5 w-5 shadow bg-yellow-500 justify-center content-center text-xs border-3 border-black"></span>
                            </span>
                        </div>
                    </>
                )
            case states.pre_question:
                return (
                    <>
                        <div class="relative inline-flex">
                            <div
                                className={`border-3 border-black shadow-yellow-xl rounded-xl w-full h-24 p-2 flex justify-center items-center bg-pink-pattern`}
                                Style="box-shadow: 1px 2px 0 #fcd34d">
                                <div className="text-center">
                                    <div className="text-4xl font-bold block text-white text-shadow-gray font-gluten ">
                                        Question {game.data.currentQuestion}
                                    </div>
                                    <span className="text-base text-gray-50 font-semibold">
                                        Are you ready to answer it!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case states.question:
                return (
                    <Question
                        currentQuestion={game.data.currentQuestion}
                        submitAnswer={submitAnswer}
                    />
                )
            case states.result:
                return <QuestionResult questionResult={game.result} />
            case states.leaderboard:
                return (
                    <>
                        <div className="font-bold text-4xl text-shadow-gray animate-pulse">
                            Leaderboard
                        </div>
                    </>
                )
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.nickname.length < 2) window.location.pathname = '/'

        document
            .querySelector('body')
            .classList.add('overflow-x-hidden', 'h-full', 'w-screen')

        validateGame(() => {
            gameChannel = pusher.subscribe(
                'presence-game.' + router.query.token,
            )

            gameChannel.bind('pusher:subscription_succeeded', members => {
                requestNickname()
            })

            gameChannel.bind('pusher:subscription_error', error => {
                console.log(JSON.stringify(error))
            })

            gameChannel.bind('pusher:member_removed', member => {
                if (member.info.id === hostId)
                    window.location.pathname = '/play'
            })

            // gameChannel.bind('client-game-state', data => {
            //     if (data.state === states.question) hasAnswered = false
            //     handleStateGame(data.state)
            //     handleCurrentQuestionGame(data.current_question)
            // })

            gameChannel.bind('game.state', data => {
                if (data.state === states.question) hasAnswered = false
                handleStateGame(data.state)
                handleCurrentQuestionGame(data.current_question)
            })

            gameChannel.bind('client-kick-player', (data, metadata) => {
                if (userId === data.user_id) window.location.pathname = '/play'
            })

            gameChannel.bind(
                'client-room-end-' + router.query.token,
                (data, metadata) => {
                    window.location.pathname = '/play'
                },
            )

            gameChannel.bind(
                'client-question-over-' + router.query.token,
                (data, metadata) => {
                    if (!hasAnswered) {
                        handleUpdateResult(0, 0, 1)
                        handleStateGame(states.result)
                    }
                },
            )

            gameChannel.bind(
                'client-' + router.query.token + '-' + userId,
                (data, metadata) => {
                    updateResult(data.message)
                    hasAnswered = true
                },
            )
        })

        return () => pusher.unsubscribe('presence-game.' + router.query.token)
    }, [router.isReady, pusher])

    return (
        <>
            <Head>
                <title>Quizzerie | Quiz game</title>
            </Head>
            <div
                className={`flex flex-col h-full ${
                    game.data.currentState == states.question
                        ? 'bg-purple-pattern'
                        : 'bg-blue-pattern'
                } min-h-screen select-none`}>
                <div className="p-5 text-3xl lg:text-5xl text-center font-medium text-white font-gluten text-shadow-gray">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
                <div className="text-white h-full max-h-screen overflow-y-auto flex-col justify-center items-center text-center flex-grow flex">
                    {renderState()}
                </div>
                <div className="p-5 bg-gray-pattern items-center justify-between inline-flex text-white text-2xl font-gluten h-1/6">
                    <div>{router.query.nickname}</div>
                    <div className="rounded bg-white-pattern text-black px-2 py-1 w-32">
                        {score}
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizRoom
