import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import Button from '@/components/Button'
import Header from '@/components/Layouts/Header'
import Image from 'next/image'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Quizzerie</title>
            </Head>

            <Header user={user} />
            {/* <header className="gradient-white fixed top-0 left-0 right-0 z-50">
                <nav className="z-10 h-14 flex relative justify-between items-center shadow-sm px-4">
                    <Link href="/">
                        <a>
                            <div className="text-3xl font-gluten w-24">
                                Quizzerie
                            </div>
                        </a>
                    </Link>
                    <div>
                        {user ? (
                            <Link href="/dashboard">
                                <a className="ml-4 text-base font-bold text-gray-700 left-underline">
                                    Dashboard
                                </a>
                            </Link>
                        ) : (
                            <div className="flex flex-row space-x-6">
                                {[
                                    ['Home', '/'],
                                    ['login', '/login'],
                                    ['Sign up', '/register'],
                                ].map(([title, url]) => (
                                    <Link href={url}>
                                        <a className="text-base font-bold text-gray-700 left-underline">
                                            {title}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div>
                            <Link href="/play">
                                <Button className="h-8">Play</Button>
                            </Link>
                        </div>
                        <div className="bg-white border border-black shadow-black-sm rounded-full w-full h-full cursor-pointer">
                            <img src="https://assets-cdn.kahoot.it/auth/assets/language-picker-black.cca293f9.svg" />
                        </div>
                    </div>
                </nav>
            </header> */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="py-4">
                    <div className="mb-8 text-3xl lg:text-4xl lg:text-center font-bold font-gluten">
                        How to use it!
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div
                            className={`font-gluten border-3 border-black  shadow-yellow rounded-xl w-full p-2 flex justify-center items-center bg-blue-pattern`}>
                            <div className="text-center">
                                <div className="text-4xl block text-white">
                                    Step 1
                                </div>
                                <span className="text-base text-gray-50">
                                    Create a quiz
                                </span>
                                <div className="mt-2">
                                    <Image
                                        width="1913"
                                        height="896"
                                        src={'/images/how-to-guide-1.jpg'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative inline-flex">
                            <div
                                className={`font-gluten border-3 border-black shadow-yellow rounded-xl w-full p-2 flex justify-center items-center bg-pink-pattern`}>
                                <div className="text-center">
                                    <div className="text-4xl  text-white">
                                        Step 2
                                    </div>
                                    <span className="text-base text-gray-50">
                                        Lauch your quiz
                                    </span>
                                    <div className="mt-2">
                                        <Image
                                            width="1913"
                                            height="896"
                                            src={'/images/how-to-guide-2.jpg'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="flex absolute h-5 w-5 -top-1 -right-1 font-gluten">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full  bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 shadow bg-yellow-500 justify-center content-center text-xs border-3 border-black"></span>
                            </span>
                        </div>
                        <div
                            className={`font-gluten border-3 border-black shadow-yellow-xl rounded-xl w-full p-2 flex justify-center items-center bg-purple-pattern`}>
                            <div className="text-center">
                                <div className="text-4xl text-white">
                                    Step 3
                                </div>
                                <span className="text-base text-gray-50">
                                    Wait for users to join using the PIN code
                                </span>
                                <div className="mt-2">
                                    <Image
                                        width="1913"
                                        height="896"
                                        src={'/images/how-to-guide-3.jpg'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 font-bold text-3xl lg:text-center font-gluten">
                        <Link href="create-quiz">
                            <Button className="border text-md">
                                Create your own quiz
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
