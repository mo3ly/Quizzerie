import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'

const QuestionResult = ({ questionResult }) => {
    return (
        <>
            <div class="relative inline-flex w-3/4">
                <div
                    class={`font-gluten border-3 border-black shadow-yellow rounded-xl w-full p-2 flex justify-center items-center ${
                        questionResult.isCorrect
                            ? 'bg-green-pattern'
                            : 'bg-red-pattern'
                    }`}>
                    <div class="text-center">
                        <div>
                            {questionResult.isCorrect ? (
                                <IoMdCheckmarkCircle className="w-20 h-20 mx-auto block text-black" />
                            ) : (
                                <IoMdCloseCircle className="w-20 h-20 mx-auto block" />
                            )}
                        </div>
                        <div className="font-bold text-4xl text-shadow-gray">
                            + {questionResult.score} points
                        </div>
                    </div>
                </div>
            </div>
            <span class="text-base text-gray-50 font-semibold">
                <div>{questionResult.place} st Place</div>
            </span>
        </>
    )
}

export default QuestionResult
