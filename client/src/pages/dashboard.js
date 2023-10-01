import { useState, useEffect } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import useSWR from 'swr'
import Button from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'

const Dashboard = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const { data: quizzes, error, mutate } = useSWR('/api/quiz', () =>
        axios.get('/api/quiz').then(response => response.data),
    )

    // try SWR to post the data
    const playQuiz = quizId => {
        toast.dismiss()
        setLoading(true)
        axios
            .post('/api/room', { quiz_id: quizId })
            .then(response => {
                if (response.status === 201) {
                    // if valid token is returned redirect to room page with that token otherwise show an error
                    console.log(response.data)
                    router.push('quiz-room/' + response.data.room_token)
                    toast.loading('Redirecting...')
                } else {
                    // show error toast
                    toast.error(response)
                }
            })
            .catch(e => toast.error("Couldn't create a room, try again later!"))
            .finally(() => setLoading(false))
    }

    // if (error) return 'An error has occured'
    // if (!quizzes) return 'loading'
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Quizzerie - Dashboard</title>
            </Head>

            <div className="py-12 first-letter:">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 h-full bg-white border-b border-gray-200">
                            <div className="font-gluten text-xl mb-2">
                                Quizzes
                            </div>
                            {quizzes && quizzes.length !== 0 ? (
                                quizzes.map(quiz => (
                                    <>
                                        <div class="flex flex-row mb-3 justify-between border trasnform transition-transform hover:skew-x-2 shadow-sm p-2 rounded">
                                            <div
                                                className={`w-20 h-20 ${
                                                    !quiz.cover && 'bg-gray-500'
                                                }`}>
                                                {quiz.cover && (
                                                    <img src={quiz.cover} />
                                                )}
                                            </div>
                                            <div>
                                                {quiz.title}
                                                <p
                                                    className={`text-sm text-gray-500`}>
                                                    {quiz.description} —{''}
                                                    {quiz.questions.length}
                                                    &nbsp; question(s)
                                                </p>
                                            </div>
                                            <div className="flex-inline space-x-2">
                                                <Button
                                                    loading={loading}
                                                    onClick={() =>
                                                        playQuiz(quiz.id)
                                                    }>
                                                    Play
                                                </Button>
                                                <Button
                                                    className={`bg-gray-pattern`}>
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <div>
                                    No avaliable quizzes
                                    <Link href="/create-quiz">
                                        <Button>Create one</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </AppLayout>
    )
}

export default Dashboard
