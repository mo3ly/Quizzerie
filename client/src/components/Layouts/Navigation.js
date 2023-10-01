import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '../Button'
import Link from 'next/link'

const Navigation = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <header className="gradient-white relative top-0 left-0 right-0 z-50">
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
        </header>
    )
}

export default Navigation
