import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa'
import Button from '@/components/Button'

const Lobby = ({
    setIsLocked,
    isLocked,
    gamePIN,
    connectedUsers,
    kickPlayer,
    startTheGame,
}) => {
    return (
        <>
            <div className="flex flex-row p-5">
                <div className="w-1/4"></div>
                <div className="w-full lg:w-2/4">
                    <div className="flex flex-row justify-between items-center space-x-5 px-6 py-4 text-gray-200 bg-gray-pattern ">
                        <div>
                            {isLocked ? (
                                <>
                                    <div className="hidden lg:block border-b-2 mb-1">
                                        This room is locked!
                                    </div>
                                    <span className="font-semibold">
                                        No one can join!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="hidden lg:block border-b-2 mb-1">
                                        How to join the qiuz?
                                    </div>
                                    <div>
                                        Join at{' '}
                                        <span className="font-semibold">
                                            {
                                                process.env
                                                    .NEXT_PUBLIC_FRONTEND_URL
                                            }
                                            /play
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="border-r-2 h-full">&nbsp;</div>
                        <div>
                            {isLocked ? (
                                <>
                                    <div>
                                        <FaLock className="w-14 h-14 inline-block mb-1" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-base lg:text-md font-semibold bg-white-pattern p-1 text-black rounded inline-block">
                                        Game PIN:
                                    </div>
                                    <div className="text-4xl lg:text-5xl font-black text-white">
                                        {gamePIN ? (
                                            gamePIN
                                        ) : (
                                            <span className="animate-ping">
                                                Loading...
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/4"></div>
            </div>
            <div className="flex justify-between items-start bg-purple-pattern p-8">
                <div className=" w-1/4">
                    <div className="bg-gray-pattern p-2 text-lg text-white font-bold inline-block">
                        <FaUser className="w-5 h-5 inline-block mb-1 mr-2" />
                        {connectedUsers.length}
                    </div>
                </div>
                <div className="text-3xl lg:text-5xl text-center font-medium text-white font-gluten drop-shadow-md">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
                <div className="inline-flex justify-end space-x-2 font-gluten w-1/4">
                    <Button
                        onClick={() => setIsLocked(!isLocked)}
                        className={`text-md text-gray-900 border h-10 bg-white-pattern`}>
                        {isLocked ? (
                            <FaLockOpen className="w-4 h-4 inline-block mb-1" />
                        ) : (
                            <FaLock className="w-4 h-4 inline-block mb-1" />
                        )}
                    </Button>
                    <Button
                        disabled={connectedUsers.length == 0}
                        onClick={() =>
                            connectedUsers.length > 0 && startTheGame()
                        }
                        className={`text-md text-gray-900 border h-10 bg-white-pattern`}>
                        Start
                    </Button>
                </div>
            </div>
            <section className="mt-4 select-none">
                {connectedUsers.length == 0 ? (
                    <>
                        <div className="text-white text-center text-xl font-semibold py-3 px-4 bg-opacity-20 bg-black border-black ">
                            Waiting for players to join..
                        </div>
                    </>
                ) : (
                    <>
                        <ul className="flex flex-row-reverse flex-wrap-reverse justify-center space-x-3 space-y-3 list-none text-base text-white font-semibold">
                            {connectedUsers.map(
                                user =>
                                    !user.hasLeft && (
                                        <li
                                            Style={
                                                'animation: 1s ease 0s 1 normal none running animation-play-joined;'
                                            }
                                            className="py-3 px-4 ml-2 bg-opacity-20 bg-black border-black cursor-pointer hover:line-through"
                                            key={user.name}
                                            onClick={() => kickPlayer(user.id)}>
                                            {user.name}
                                        </li>
                                    ),
                            )}
                        </ul>
                    </>
                )}
            </section>
        </>
    )
}
export default Lobby
