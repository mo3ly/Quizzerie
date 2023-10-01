const Question = ({ currentQuestion, submitAnswer }) => {
    const selectAnswer = i => {
        submitAnswer(i)
    }
    return (
        <>
            <div className="text-xl font-gluten -mt-12">Select your answer</div>
            <div className="w-full h-96">
                <div className="p-6">
                    <div class="grid grid-cols-2 h-96 gap-5">
                        {[0, 1, 2, 3].map((i, index) => (
                            <a
                                onClick={() => selectAnswer(i)}
                                href="#"
                                class={`w-full opacity-100 p-4 ${
                                    index == 0
                                        ? 'bg-green-pattern'
                                        : index == 1
                                        ? 'bg-yellow-pattern'
                                        : index == 2
                                        ? 'bg-red-pattern'
                                        : 'bg-blue-pattern-flat'
                                } border border-black shadow-black `}>
                                <div class="flex flex-col justify-start">
                                    <p class="text text-gray-800 text-2xl text-left font-bold my-4"></p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Question
