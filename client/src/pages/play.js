// this page takes a game pin and checks in the server if it is valid the game hasn't started yet then it allows the user to join
// The user will be redidrected to route </game/{id}>
// he should wait in the lobby then, it starts the game when "start_quiz" event is received
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/hooks/auth'
import useSWR from 'swr'
import axios from '@/lib/axios'

const play = () => {
    const router = useRouter()
    const {} = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })

    const [pin, setPin] = useState('')
    const [roomToken, setRoomToken] = useState(null)
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document
            .querySelector('body')
            .classList.add('overflow-hidden', 'w-full', 'fixed')

        return () => {
            document
                .querySelector('body')
                .classList.remove('overflow-hidden', 'w-full', 'fixed')
        }
    }, [])

    const onPinSubmit = async event => {
        event.preventDefault()
        setLoading(true)
        toast.dismiss()

        axios
            .post('/api/room/join', { room_pin: pin })
            .then(response => {
                if (response.status === 201)
                    setRoomToken(response.data.room_token)
            })
            .catch(error => {
                console.log(error)
                toast.error('The entered game PIN is incorrect!')
            })
            .finally(() => {
                setLoading(false)
                setPin('')
            })
    }

    const onNicknameSubmit = async event => {
        event.preventDefault()
        toast.dismiss()

        if (nickname.length < 2) {
            toast.error('Nickname cannot be less than 2 characters!')
            return
        }

        setLoading(true)

        axios
            .post('/api/room/player/nickname-validate', {
                room_token: roomToken,
                nickname: nickname,
            })
            .then(response => {
                if (response.data.message === 'success')
                    router.push('game/' + roomToken + '?nickname=' + nickname)
                else toast.error('This nickname is unavaliable!')
            })
            .catch(error => {
                console.log(error)
                toast.error('This nickname is unavaliable!')
            })
            .finally(() => {
                setLoading(false)
                setPin('')
            })
    }

    return (
        <>
            <Head>
                <title>Quizzerie | Join a quizz</title>
            </Head>
            <main className=" bg-zinc-700 min-h-screen flex items-center text-center justify-center py-12 px-4 sm:px-6 lg:px-8 antialiased relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-black opacity-20 transform scale-150 rounded-full -top-12 -left-12 hidden sm:block"></div>
                <div className="absolute w-96 h-96 bg-black opacity-20 tranform scale-110 rotate-45 -right-12 -bottom-12 "></div>
                <div className="z-10">
                    <div className="mb-6 font-gluten text-white ">
                        <h1 className="text-5xl text-shadow-gray uppercase">
                            quizzerie
                        </h1>
                        <span>Education with a little bit of magic</span>
                    </div>
                    <div className="mt-4 p-4 bg-white-flat-pattern border border-black rounded-xl shadow-black text-center">
                        {roomToken ? (
                            <>
                                <form
                                    onSubmit={onNicknameSubmit}
                                    className="mb-8">
                                    <Input
                                        type="text"
                                        name="nickname"
                                        id="nickname"
                                        placeholder="Nickname"
                                        className="rounded-full mb-3 text-center text-lg w-full font-bold"
                                        value={nickname}
                                        onChange={event =>
                                            setNickname(event.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                    <Button
                                        loading={loading}
                                        className="bg-gray-pattern block rounded-xl text-lg w-full">
                                        Start!
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <form onSubmit={onPinSubmit} className="mb-8">
                                    <Input
                                        type="text"
                                        name="quiz-pin"
                                        id="quiz-pin"
                                        placeholder="Game PIN"
                                        className="rounded-full mb-3 text-center text-lg w-full font-bold"
                                        value={pin}
                                        onChange={event =>
                                            setPin(event.target.value)
                                        }
                                        autoComplete="off"
                                    />
                                    <Button
                                        loading={loading}
                                        className="bg-gray-pattern block rounded-xl text-lg w-full">
                                        JOIN
                                    </Button>
                                </form>
                                <div
                                    className="border border-b-0 border-x-0 border-gray-700 text-sm my-5"
                                    Style="line-height: 0em;">
                                    <span
                                        className="bg-white"
                                        Style="padding:0 10px">
                                        OR
                                    </span>
                                </div>
                                <Link href="/">
                                    <a className="left-underline uppercase text-gray-700 text-base mt-4">
                                        Create your own quiz
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    )
}

export default play
