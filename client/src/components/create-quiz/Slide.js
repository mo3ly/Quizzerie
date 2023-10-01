import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import Input from '../Input'
import { IoFlashOutline } from 'react-icons/io5'
import AnswerInput from './AnswerInput'
import QuestionUploadImage from './QuestionUploadImage'

const durationOptions = [
    { name: '5 seconds', value: 5 },
    { name: '10 seconds', value: 10 },
    { name: '20 seconds', value: 20 },
    { name: '30 seconds', value: 30 },
    { name: '1 minute', value: 60 },
    { name: '1 minute 30 seconds', value: 90 },
    { name: '2 minutes', value: 120 },
]

const pointOptions = [
    { name: 'None', value: 0 },
    { name: 'Normal', value: 1 },
    { name: 'Double', value: 2 },
]

const Slide = ({ setSlides, slides, slide, activeSlide }) => {
    // https://codesandbox.io/s/todo-list-hooks-ebfgw?file=/src/App.js:281-293

    const onQuestionUpdate = value => {
        setSlides(
            slides.map(i => {
                return i.id === Number(slide.id)
                    ? { ...i, title: value }
                    : { ...i }
            }),
        )
    }

    const onDurationUpdate = value => {
        setSlides(
            slides.map(i => {
                return i.id === Number(slide.id)
                    ? { ...i, duration: value }
                    : { ...i }
            }),
        )
    }

    const onPointUpdate = value => {
        setSlides(
            slides.map(i => {
                return i.id === Number(slide.id)
                    ? { ...i, points: value }
                    : { ...i }
            }),
        )
    }
    // https://tailwindui.com/components/ecommerce/components/category-filters
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            {activeSlide == slide.id && (
                <div className="p-5 select-none">
                    <div className="w-full -lg:bg-white-flat-pattern -lg:border lg:p-6 rounded text-center">
                        <div class="pb-8">
                            <Input
                                type="text"
                                value={slide.title}
                                onChange={event =>
                                    onQuestionUpdate(event.target.value)
                                }
                                placeholder="Type your question.."
                                className="w-full text-center font-medium text-base lg:text-md h-12"
                            />
                        </div>
                        <div class="flex justify-between items-center text-gray-500">
                            <div class="h-10 w-10 lg:h-14 lg:w-14 mt-1 inline-flex items-center justify-center rounded-full border border-black shadow-black-sm text-base lg:text-xl">
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left ">
                                    <div>
                                        <Menu.Button
                                            data-tip="Question time!"
                                            className="border-transparent focus:border-transparent focus:outline-none focus:ring-0">
                                            <div>{slide.duration}</div>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="origin-top-left absolute z-10 left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {durationOptions.map(option => (
                                                    <Menu.Item
                                                        onClick={() =>
                                                            onDurationUpdate(
                                                                option.value,
                                                            )
                                                        }
                                                        key={option.name}>
                                                        <a
                                                            className={classNames(
                                                                slide.duration ==
                                                                    option.value
                                                                    ? 'font-medium text-gray-900 bg-gray-100'
                                                                    : 'text-gray-500',
                                                                'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50',
                                                            )}>
                                                            {option.name}
                                                        </a>
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <QuestionUploadImage
                                setSlides={setSlides}
                                slides={slides}
                                slide={slide}
                            />
                            <div class="h-10 w-10 lg:h-14 lg:w-14 mt-1 inline-flex items-center justify-center rounded-full border border-black shadow-black-sm">
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left ">
                                    <div>
                                        <Menu.Button
                                            data-tip="Points system!"
                                            className="border-transparent focus:border-transparent focus:outline-none focus:ring-0">
                                            <div>
                                                <IoFlashOutline className="h-5 w-5 lg:h-8 lg:w-8 mt-1" />
                                            </div>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {pointOptions.map(option => (
                                                    <Menu.Item
                                                        onClick={() =>
                                                            onPointUpdate(
                                                                option.value,
                                                            )
                                                        }
                                                        key={option.name}>
                                                        <a
                                                            className={classNames(
                                                                slide.points ==
                                                                    option.value
                                                                    ? 'font-medium text-gray-900 bg-gray-100'
                                                                    : 'text-gray-500',
                                                                'block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50',
                                                            )}>
                                                            {option.name}
                                                        </a>
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-1 mt-6">
                            {slide.answers.map((answer, i) => (
                                <AnswerInput
                                    index={i}
                                    setSlides={setSlides}
                                    slides={slides}
                                    slide={slide}
                                    answer={answer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Slide
