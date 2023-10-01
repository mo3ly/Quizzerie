import Button from '@/components/Button'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

const Question = ({
    nextQuestion,
    finish,
    currentQuestion,
    answers,
    allAnswers,
    count,
    question,
    questionIsOver,
}) => {
    const [showResults, setShowResults] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)

    const getTopScores = () => {
        let scores = []
        allAnswers.map(i => {
            if (!scores.some(x => i.user_id == x.user_id)) {
                const userScores = allAnswers
                    .filter(x => i.user_id == x.user_id)
                    .map(y => y.score)
                    .reduce((prev, next) => prev + next)
                scores.push({
                    user_id: i.user_id,
                    name: i.name,
                    scores: userScores,
                })
            }
        })
        // https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
        return scores.sort(function (a, b) {
            return b.scores - a.scores
        })
    }

    return (
        <>
            <div className="flex flex-col h-full bg-purple-pattern min-h-screen select-none">
                <div className="flex flex-row items-center justify-between text-center p-3 text-2xl lg:text-2xl font-medium bg-white-pattern  drop-shadow-md">
                    <div className="bg-gray-pattern text-xl font-bold text-white rounded p-2">
                        {currentQuestion}
                        <span className="text-gray-200 text-md">
                            &nbsp; of {count}
                        </span>
                    </div>
                    <div>{question.content}</div>
                    <div>
                        {currentQuestion == count ? (
                            <Button
                                onClick={() => {
                                    if (showResults) {
                                        finish()
                                    } else {
                                        questionIsOver()
                                        setIsPlaying(false)
                                        setShowResults(true)
                                    }
                                }}
                                className={`text-md text-gray-900 border h-10 bg-white-pattern`}>
                                {showResults ? 'Finish' : 'Skip'}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    if (showResults) {
                                        setShowResults(false)
                                        nextQuestion(currentQuestion + 1)
                                    } else {
                                        questionIsOver()
                                        setIsPlaying(false)
                                        setShowResults(true)
                                    }
                                }}
                                className={`text-md text-gray-900 border h-10 bg-white-pattern`}>
                                {showResults ? 'Next' : 'Skip'}
                            </Button>
                        )}
                    </div>
                </div>
                <div className="text-white h-full max-h-screen overflow-y-auto flex-col justify-center items-center text-center flex-grow flex">
                    <div className="my-6 w-full">
                        {showResults ? (
                            <>
                                <div className="text-3xl font-gluten">
                                    Result
                                </div>
                                <div className="flex flex-col h-52 text-center items-center justify-center space-y-2 my-6">
                                    {getTopScores()
                                        .slice(0, 3)
                                        .map((i, index) => (
                                            <div className="p-4 w-1/2 px-3 bg-black bg-opacity-25 inline-flex justify-between items-center font-semibold">
                                                <div>{index + 1}.</div>
                                                <div>{i.name}</div>
                                                <div>{i.scores} Points</div>
                                            </div>
                                        ))}
                                </div>
                                <div className="flex flex-row items-end text-xl font-bold text-gray-800 space-x-2 justify-around ">
                                    {[0, 1, 2, 3].map((i, index) => (
                                        <div
                                            className={`w-1/6 ${
                                                index == 0
                                                    ? 'bg-green-pattern'
                                                    : index == 1
                                                    ? 'bg-yellow-pattern'
                                                    : index == 2
                                                    ? 'bg-red-pattern'
                                                    : 'bg-blue-pattern-flat'
                                            } `}>
                                            {
                                                answers.filter(
                                                    i =>
                                                        i.answer_index ==
                                                            index &&
                                                        i.question_no ==
                                                            currentQuestion,
                                                ).length
                                            }
                                            {question.answers[index]
                                                .is_correct ? (
                                                <AiFillCheckCircle className=" inline-flex mb-1 ml-3 h-5 w-5" />
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row items-center justify-around w-full">
                                    <div className="p-2 border-3 rounded-full w-16 h-16 inline-flex items-center justify-center text-4xl font-bold font-gluten">
                                        <CountdownCircleTimer
                                            isPlaying={isPlaying}
                                            duration={question.duration}
                                            initialRemainingTime={
                                                question.duration
                                            }
                                            isSmoothColorTransition={true}
                                            strokeWidth={4}
                                            size={66}
                                            colors={[
                                                '#20cd75',
                                                '#333',
                                                '#ee3838',
                                            ]}
                                            trailColor={'#fff'}
                                            onComplete={() => {
                                                questionIsOver()
                                                setShowResults(true)
                                            }}>
                                            {({ remainingTime }) =>
                                                remainingTime
                                            }
                                        </CountdownCircleTimer>
                                    </div>
                                    <div className="h-64 w-72 lg:h-72 lg:w-96 relative bg-white-pattern shadow-black-sm mt-1 border border-black rounded-md">
                                        {question.image && (
                                            <img
                                                className={` object-contain absolute w-full h-full`}
                                                src={question.image}
                                            />
                                        )}
                                    </div>
                                    <div className="text-xl font-bold">
                                        <div className="text-4xl">
                                            {answers.length}
                                        </div>{' '}
                                        Answers
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="p-6">
                            <div class="grid grid-cols-2 gap-3">
                                {question.answers.map((i, index) => (
                                    <a
                                        href="#"
                                        class={`w-full opacity-100 p-4 ${
                                            showResults &&
                                            !i.is_correct &&
                                            'opacity-25'
                                        } ${
                                            index == 0
                                                ? 'bg-green-pattern'
                                                : index == 1
                                                ? 'bg-yellow-pattern'
                                                : index == 2
                                                ? 'bg-red-pattern'
                                                : 'bg-blue-pattern-flat'
                                        } border border-black shadow-black transition-opacity `}>
                                        <div class="flex flex-col justify-start">
                                            <p class="text text-gray-800 text-2xl text-left font-bold my-4">
                                                {i.content}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Question
