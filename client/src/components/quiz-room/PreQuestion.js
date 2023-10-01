import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa'
import Button from '@/components/Button'
import Progressbar from '../Progressbar'

const PreQuestion = ({
    currentQuestion,
    count,
    question,
    isLocked,
    gamePIN,
    connectedUsers,
}) => {
    return (
        <>
            <div className="flex flex-col h-full bg-purple-pattern min-h-screen select-none">
                <div className="p-5 text-3xl lg:text-5xl text-center font-medium bg-white-pattern font-gluten drop-shadow-md">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
                <div className="text-white h-full max-h-screen overflow-y-auto flex-col justify-center items-center text-center flex-grow flex">
                    <div className="font-bold text-4xl text-shadow-gray">
                        <span className="bg-gray-pattern text-3xl rounded p-2">
                            {currentQuestion}{' '}
                            <span className="text-gray-400 text-xl">
                                {' '}
                                of {count}
                            </span>
                        </span>{' '}
                        {question.content}
                    </div>
                    <div className="my-6">
                        {question.image && (
                            <div className="h-52 w-64 lg:h-72 lg:w-96 relative bg-white-pattern shadow-black-sm mt-1 border border-black rounded-md">
                                <img
                                    className={` object-contain absolute w-full h-full`}
                                    src={question.image}
                                />
                            </div>
                        )}
                    </div>
                    <Progressbar />
                </div>
                <div className="flex flex-row items-center justify-between p-5 bg-gray-pattern text-white text-2xl font-gluten">
                    <div>
                        <FaUser className="w-5 h-5 inline-block mb-1 mr-2" />
                        {connectedUsers.length}
                    </div>
                    <div>
                        {!isLocked ? (
                            <>
                                <FaLockOpen className="w-5 h-5 inline-block mb-1" />{' '}
                                {gamePIN}
                            </>
                        ) : (
                            <FaLock className="w-5 h-5 inline-block mb-1" />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default PreQuestion
