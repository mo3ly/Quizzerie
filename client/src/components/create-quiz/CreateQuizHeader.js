import { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { IoImagesOutline } from 'react-icons/io5'
import { IoCogSharp } from 'react-icons/io5'
import Input from '../Input'
import Button from '../Button'
import Label from '../Label'

const CreateQuizHeader = ({ quiz, setQuiz, onCreate, loading }) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false)

    const openModal = () => setIsOpen(true)

    const updateTitle = value => {
        let temp = JSON.parse(JSON.stringify(quiz))
        temp.title = value
        setQuiz(temp)
    }

    const updateDescription = value => {
        let temp = JSON.parse(JSON.stringify(quiz))
        temp.description = value
        setQuiz(temp)
    }

    const onSelectImage = event => {
        if (event.target.files[0] != null) {
            let temp = JSON.parse(JSON.stringify(quiz))
            temp.image = event.target.files[0]
            temp.image_preview = URL.createObjectURL(event.target.files[0])
            setQuiz(temp)
        }
    }

    const onDeselectImage = () => {
        let temp = JSON.parse(JSON.stringify(quiz))
        temp.image = null
        temp.image_preview = null
        setQuiz(temp)
    }

    return (
        <header className="fixed left-0 right-0 top-0 z-50">
            <nav className="bg-white z-10 h-14 flex relative justify-between items-center border-b-2 border-gray-300 px-4">
                <Link href="/">
                    <div className="text-3xl font-gluten cursor-pointer">
                        Quizzerie
                    </div>
                </Link>

                {
                    <>
                        <button
                            type="button"
                            onClick={() => openModal()}
                            className="pl-3 duration-200
                            hover:border-zinc-200 rounded border text-sm font-bold hidden
                            sm:inline w-60">
                            <div className="flex flex-row justify-between items-center">
                                <div className="text-zinc-500 text-sm tracking-wider text-ellipsis whitespace-nowrap max-w-full overflow-hidden">
                                    {quiz.title || 'Enter quiz title...'}
                                </div>
                                <div className="px-3 py-2 rounded bg-gray-100 border ml-3 text-center">
                                    Settings
                                </div>
                            </div>
                        </button>

                        <Button
                            onClick={() => openModal()}
                            className="bg-yellow-pattern h-8 border text-sm inline sm:hidden px-1">
                            <IoCogSharp className="w-6 h-6 text-gray-900 " />
                        </Button>

                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={closeModal}>
                                <div className="min-h-screen px-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                    </Transition.Child>

                                    <span
                                        className="inline-block h-screen align-middle"
                                        aria-hidden="true">
                                        &#8203;
                                    </span>

                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95">
                                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-3 border-black gradient-white shadow-xl rounded-2xl">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl font-medium leading-6 text-gray-900">
                                                Quiz settings
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 mb-5">
                                                    Input your quiz settings.
                                                </p>
                                                <div className="flex flex-col gap-y-4">
                                                    <div>
                                                        <Label htmlFor="quiz-title">
                                                            Quiz title
                                                        </Label>
                                                        <Input
                                                            value={quiz.title}
                                                            onChange={event =>
                                                                updateTitle(
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            id="quiz-title"
                                                            type="text"
                                                            placeholder="Type your quiz title.."
                                                            className="w-full font-medium "
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="quiz-description">
                                                            Quiz description
                                                        </Label>
                                                        <Input
                                                            value={
                                                                quiz.description
                                                            }
                                                            onChange={event =>
                                                                updateDescription(
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            id="quiz-description"
                                                            type="text"
                                                            placeholder="Type your quiz description.."
                                                            className="w-full font-medium "
                                                        />
                                                    </div>
                                                    <div className="h-40 w-full lg:h-60 relative bg-white-pattern shadow-black-sm mt-1 border border-black rounded-md">
                                                        <img
                                                            className={`${
                                                                !quiz.image_preview &&
                                                                'hidden'
                                                            }  object-contain absolute w-full h-full`}
                                                            src={
                                                                quiz.image_preview &&
                                                                quiz.image_preview
                                                            }
                                                        />
                                                        <div
                                                            className={`${
                                                                !quiz.image_preview &&
                                                                'hidden'
                                                            } bottom-0 right-0 absolute bg-gray-100 w-full p-2 rounded-b`}>
                                                            <Button
                                                                onClick={
                                                                    onDeselectImage
                                                                }
                                                                className={`text-sm `}>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                        <div
                                                            className={`${
                                                                quiz.image_preview &&
                                                                'hidden'
                                                            } flex w-full h-full justify-center items-center px-6 pt-5 pb-6 `}>
                                                            <div className="space-y-1 text-center">
                                                                <label
                                                                    htmlFor="quiz-image-upload"
                                                                    className="relative cursor-pointer ">
                                                                    <svg
                                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                                        stroke="currentColor"
                                                                        fill="none"
                                                                        viewBox="0 0 48 48"
                                                                        aria-hidden="true">
                                                                        <path
                                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            id="quiz-image-upload"
                                                                            name="quiz-image-upload"
                                                                            className="sr-only"
                                                                            onChange={
                                                                                onSelectImage
                                                                            }
                                                                        />
                                                                        <p className="pl-1">
                                                                            Upload
                                                                            image
                                                                            or
                                                                            drag
                                                                            and
                                                                            drop
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500">
                                                                        PNG,
                                                                        JPG, GIF
                                                                        up to
                                                                        5MB
                                                                    </p>
                                                                    <div
                                                                        className={`text-sm mt-1 p-2 bg-purple-pattern font-gluten text-white rounded shadow-black-sm`}>
                                                                        Upload
                                                                        image
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex space-x-3">
                                                <Button
                                                    className="w-24"
                                                    onClick={() =>
                                                        closeModal()
                                                    }>
                                                    Done
                                                </Button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </>
                }

                <div className="flex flex-column space-x-2">
                    <span className="border-l hidden sm:inline">&nbsp;</span>
                    <Button
                        loading={loading}
                        onClick={() => onCreate()}
                        className="bg-green-pattern h-8 border text-sm text-gray-900">
                        Save
                    </Button>
                    <Link href="/">
                        <Button className="bg-white-pattern h-8 border text-sm text-gray-900 ">
                            Exit
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
export default CreateQuizHeader
