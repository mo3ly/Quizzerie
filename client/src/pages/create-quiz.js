import { useState, useEffect } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import AppLayout from '@/components/Layouts/AppLayout'
import CreateQuizHeader from '@/components/create-quiz/CreateQuizHeader'
import toast, { Toaster } from 'react-hot-toast'
import MiniSlide from '@/components/create-quiz/MiniSlide'
import Slide from '@/components/create-quiz/Slide'
import Button from '@/components/Button'
import ReactTooltip from 'react-tooltip'

const initQuiz = {
    title: '',
    description: '',
    image: null,
    image_preview: null,
}

const initSlide = [
    {
        id: 1,
        title: '',
        image: null,
        image_preview: null,
        duration: 20,
        points: 1, // 0 => none, 1 => normal, 2 => double
        has_error: false,
        answers: [
            {
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            },
            {
                content: '',
                isCorrect: false,
            },
        ],
    },
]

const CreateQuiz = () => {
    const router = useRouter()

    const [quiz, setQuiz] = useState(initQuiz)
    const [slides, setSlides] = useState(initSlide)
    const [currentSlide, setCurrentSlide] = useState(1)
    const [idCounter, setIdCounter] = useState(2)
    const [loading, setLoading] = useState(false)

    const addNewSlide = () => {
        if (slides.length >= 10) {
            toast.error('You Cannot create more than 10 questions!')
            return
        }
        setIdCounter(idCounter + 1)
        setSlides(prev => [
            ...prev,
            {
                id: idCounter,
                title: '',
                image: null,
                image_preview: null,
                duration: 20,
                points: 1,
                has_error: false,
                answers: [
                    {
                        content: '',
                        isCorrect: false,
                    },
                    {
                        content: '',
                        isCorrect: false,
                    },
                    {
                        content: '',
                        isCorrect: false,
                    },
                    {
                        content: '',
                        isCorrect: false,
                    },
                ],
            },
        ])
        setCurrentSlide(idCounter)
    }
    const updateCounterId = () => {
        setIdCounter(idCounter + 1)
        return idCounter
    }

    const showAlert = message => {
        toast.error(message)
    }

    const validateSlides = () => {
        slides.map(q => {
            if (
                q.title == '' ||
                q.answers.some(a => a.content == '') ||
                !q.answers.some(a => a.isCorrect)
            ) {
                setSlides(
                    slides.map(i => {
                        return i.id === Number(q.id)
                            ? { ...i, has_error: true }
                            : { ...i }
                    }),
                )
            } else
                setSlides(
                    slides.map(i => {
                        return i.id === Number(q.id)
                            ? { ...i, has_error: false }
                            : { ...i }
                    }),
                )
        })
    }

    const onCreate = () => {
        // validate the form by looping through all the slides and check that no has an empty field
        // store the id's of the slide that has errors
        // show a red border on the slide that has error
        // validate length and image types

        // validation
        let validationErrors = []
        if (slides.length == 0)
            validationErrors.push('Quiz must have atleast 1 question.')

        if (quiz.title == '') validationErrors.push('Quiz title is required.')

        if (quiz.description == '')
            validationErrors.push('Quiz description are required.')

        slides.map(q => {
            if (
                q.title == '' ||
                q.answers.some(a => a.content == '') ||
                !q.answers.some(a => a.isCorrect)
            ) {
                validationErrors.push(
                    `( Slide ${slides.indexOf(q) + 1} ) is incomplete.`,
                )
                setSlides(
                    slides.map(i => {
                        return i.id === Number(q.id)
                            ? { ...i, has_error: true }
                            : { ...i }
                    }),
                )
            } else
                setSlides(
                    slides.map(i => {
                        return i.id === Number(q.id)
                            ? { ...i, has_error: false }
                            : { ...i }
                    }),
                )
        })

        if (validationErrors.length > 0) {
            toast.custom(
                t => (
                    <div
                        className={`${
                            t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="font-medium text-red-600">
                                Whoops! Something went wrong.
                            </div>
                            <div className="flex items-start">
                                <ul className="ml-3 flex-1 mt-3 list-disc list-inside ">
                                    {validationErrors.map(e => (
                                        <li className="text-sm text-red-600">
                                            {e}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ),
                {
                    duration: 3000,
                    position: 'top-right',
                },
            )
            return
        }

        setLoading(true)
        toast.dismiss()
        let copySlides = JSON.parse(JSON.stringify(slides))
        let data = new FormData()
        data.append('quiz_title', quiz.title)
        data.append('quiz_description', quiz.description)
        data.append('quiz_image', quiz.image)

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            //onUploadProgress: (progressEvent) => (this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)),
        }

        toast.promise(
            axios
                .post('/api/quiz/create', data, config)
                .then(data => {
                    if (data.status == 201) {
                        slides.map(i => {
                            let formData = new FormData()
                            formData.append('quiz_id', data.data.quiz_id)
                            formData.append('title', i.title)
                            formData.append('image', i.image)
                            formData.append('duration', i.duration)
                            formData.append('points', i.points)
                            formData.append(
                                'answers',
                                JSON.stringify(i.answers),
                            )

                            setTimeout(function () {
                                // create question
                                axios
                                    .post(
                                        '/api/question/create',
                                        formData,
                                        config,
                                    )
                                    .then(data => {
                                        console.log(data)
                                        setLoading(false)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        setLoading(false)
                                    })
                            }, 200)
                        })
                        router.push('/dashboard')
                        // redirect to dashboard when done
                    }
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
                .finally(() => {
                    setLoading(false)
                }),
            {
                loading: 'Creating your quiz...',
                success: <b>Quiz has been created.</b>,
                error: <b>Could not create the quiz, try again later.</b>,
            },
        )
    }

    return (
        <AppLayout navigation={false} header={null}>
            <Head>
                <title>Quizzerie - Create a quiz</title>
            </Head>

            <CreateQuizHeader
                quiz={quiz}
                setQuiz={setQuiz}
                onCreate={onCreate}
                loading={loading}
            />

            <div class="flex flex-row h-screen w-full pt-14 mx-auto">
                <div class="hidden flex-col lg:flex">
                    <div class="w-64 bg-white h-full max-h-screen overflow-y-auto flex-col flex-grow flex border-r-2 drop-shadow-sm">
                        {slides.map((slide, i) => (
                            <MiniSlide
                                index={i}
                                setSlides={setSlides}
                                slides={slides}
                                slide={slide}
                                activeSlide={currentSlide}
                                setCurrentSlide={setCurrentSlide}
                                updateCounterId={updateCounterId}
                                showAlert={showAlert}
                                onClick={() => {
                                    setCurrentSlide(slide.id)
                                    validateSlides()
                                }}
                            />
                        ))}
                    </div>
                    <div className=" bg-white inline-flex justify-center items-center text-center p-3">
                        <Button onClick={() => addNewSlide()}>
                            Add Question
                        </Button>
                    </div>
                </div>
                <div class="flex flex-col w-full bg-gray-50 ">
                    <div class="w-full  overflow-hidden overflow-y-auto flex-col flex-grow flex -lg:justify-center">
                        <div className="py-0 lg:py-2">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                {slides.map(slide => (
                                    <Slide
                                        setSlides={setSlides}
                                        slides={slides}
                                        slide={slide}
                                        activeSlide={currentSlide}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div class="flex-row flex w-full lg:hidden border-t border-gray-300 ">
                        <div className="w-full overflow-hidden bg-white inline-flex overflow-x-auto justify-left items-center">
                            {slides.map((slide, i) => (
                                <MiniSlide
                                    index={i}
                                    setSlides={setSlides}
                                    slides={slides}
                                    slide={slide}
                                    activeSlide={currentSlide}
                                    setCurrentSlide={setCurrentSlide}
                                    updateCounterId={updateCounterId}
                                    showAlert={showAlert}
                                    onClick={() => {
                                        setCurrentSlide(slide.id)
                                        validateSlides()
                                    }}
                                />
                            ))}
                        </div>
                        <div className=" bg-white inline-flex justify-center items-center text-center p-2">
                            <Button onClick={() => addNewSlide()}>+</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster position="top-center" />

            <ReactTooltip
                effect="solid"
                arrowColor="#000"
                borderColor="#000"
                border="true"
            />
        </AppLayout>
    )
}

export default CreateQuiz
