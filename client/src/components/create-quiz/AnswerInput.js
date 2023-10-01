import { useState } from 'react'
import { Switch } from '@headlessui/react'

const AnswerInput = ({ index, setSlides, slides, slide, answer }) => {
    const onAnswertUpdate = value => {
        let answersTemp = slide.answers
        answersTemp[index].content = value
        setSlides(
            slides.map(i => {
                return i.id === Number(slide.id)
                    ? { ...i, answers: answersTemp }
                    : { ...i }
            }),
        )
    }

    const onCorrectAnswertUpdate = value => {
        let answersTemp = slide.answers
        answersTemp[index].isCorrect = value
        setSlides(
            slides.map(i => {
                return i.id === Number(slide.id)
                    ? { ...i, answers: answersTemp }
                    : { ...i }
            }),
        )
    }

    return (
        <div className="grid grid-cols-3 gap-6 mb-3">
            <div className="col-span-3 -sm:col-span-2">
                <div className="mt-1 flex rounded-xl">
                    <span
                        className={`inline-flex items-center px-3 rounded-l-xl border border-r-0 border-black shadow-black-sm ${
                            index == 0
                                ? 'bg-green-pattern'
                                : index == 1
                                ? 'bg-yellow-pattern'
                                : index == 2
                                ? 'bg-red-pattern'
                                : 'bg-blue-pattern'
                        } text-white text-xl`}>
                        <Switch
                            checked={answer.isCorrect}
                            onChange={onCorrectAnswertUpdate}
                            Style="width: 64px; height: 31px"
                            className={`${answer.isCorrect ? '' : 'bg-white'}
                      relative inline-flex flex-shrink-0 border-2 p-1 border-black hover:scale-105 transform transition-all rounded-full cursor-pointer ease-in-out duration-200 focus:outline-none`}>
                            <span className="sr-only">Answer settings</span>
                            <span
                                aria-hidden="true"
                                Style="width: 18px; height: 18px"
                                className={`${
                                    answer.isCorrect
                                        ? 'translate-x-8 bg-black'
                                        : 'translate-x-0 bg-black'
                                }
                        pointer-events-none inline-block rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200`}
                            />
                        </Switch>
                    </span>
                    <input
                        value={answer.content}
                        onChange={event => onAnswertUpdate(event.target.value)}
                        type="text"
                        placeholder={`Type answer ${index + 1}`}
                        className={`flex-1 block w-full lg:h-16 rounded-none rounded-r-xl text-base lg:text-md focus:border-purple-500  hover:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50`}
                    />
                </div>
            </div>
        </div>
    )
}

export default AnswerInput
