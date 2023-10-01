import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IoMdArrowRoundBack } from 'react-icons/io'

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

const GuestLayout = ({ children }) => {
    return (
        <div className="select-none">
            <Head>
                <title>Quizzerie</title>
            </Head>
            {/* <div className="h-full flex flex-col"></div>
            <div className="h-full w-full gradient-red flex flex-1 relative"></div> 
            <div className="bg-black opacity-10 tranform rotate-45" Style="top: -15vmin; left: -15vmin;min-width: 75vmin; min-height: 75vmin"></div>*/}
            <header className="fixed left-0 right-0 z-50">
                <nav className="bg-white z-10 h-14 flex relative justify-between items-center shadow-sm px-4">
                    <Link href="/">
                        <a>
                            <div className="text-3xl font-gluten">
                                Quizzerie
                            </div>
                        </a>
                    </Link>
                    <Link href="/">
                        <div className="p-3">
                            <div className="bg-white rounded-full shadow-lg cursor-pointer p-1">
                                <IoMdArrowRoundBack className="h-8 w-8 " />
                            </div>
                        </div>
                    </Link>
                </nav>
            </header>
            <main className="font-sans text-gray-900 antialiased relative overflow-hidden">
                <div className="absolute w-96 h-96 bg-zinc-600 opacity-5 transform scale-150 rounded-full -z-10 -top-12 -left-12 hidden sm:block"></div>
                <div className="absolute w-96 h-96 bg-zinc-600 opacity-5 tranform scale-110 rotate-45 -z-50 -right-12 -bottom-12 hidden sm:block"></div>
                <motion.div
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ type: 'linear' }}>
                    {children}
                </motion.div>
            </main>
        </div>
    )
}

export default GuestLayout
