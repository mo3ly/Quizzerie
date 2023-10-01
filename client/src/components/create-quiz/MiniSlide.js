import {
    IoCopy,
    IoTrashBinSharp,
    IoImagesOutline,
    IoFlashOutline,
    IoArrowUpOutline,
    IoArrowDownOutline,
} from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const MiniSlide = ({
    index,
    setSlides,
    slides,
    slide,
    activeSlide,
    showAlert,
    setCurrentSlide,
    updateCounterId,
    onClick,
}) => {
    const onDelete = () => {
        if (slides.length != 1) {
            setSlides(prev => prev.filter(i => i.id !== slide.id))
            // if (slides.length === 1) setCurrentSlide(slides[0].id)
            // else setCurrentSlide(slides[slides.length - 1].id)
            setCurrentSlide(slides[0].id)
        } else showAlert('You need to have atleast one question!')
    }

    const onDuplicate = () => {
        let temp = JSON.parse(JSON.stringify(slide))
        temp.id = updateCounterId()
        setSlides(prev => [...prev, temp])
        setCurrentSlide(temp.id)
    }

    const onMoveUp = () => {
        let index = slides.indexOf(slide)
        if (index == 0) return
        let tempSlide = JSON.parse(JSON.stringify(slide))
        let tempSlides = JSON.parse(JSON.stringify(slides))
        tempSlides.splice(index, 1)
        tempSlides.splice(index - 1, 0, tempSlide)
        setSlides(tempSlides)
        setCurrentSlide(slide.id)
    }

    const onMoveDown = () => {
        let index = slides.indexOf(slide)
        let tempSlide = JSON.parse(JSON.stringify(slide))
        let tempSlides = JSON.parse(JSON.stringify(slides))
        tempSlides.splice(index, 1)
        tempSlides.splice(index + 1, 0, tempSlide)
        setSlides(tempSlides)
        setCurrentSlide(slide.id)
    }

    return (
        <div
            className={`${
                activeSlide == slide.id && 'bg-sky-50'
            } pb-5 transition-colors pt-2 px-2 select-none cursor-pointer`}>
            <div className="ml-8 mb-1 font-bold text-xs hidden lg:block">
                Question {index + 1}
            </div>
            <div className="lg:hidden justify-between w-full content-center inline-flex">
                {activeSlide == slide.id && (
                    <>
                        <IoIosArrowBack
                            onClick={onMoveUp}
                            className="w-4 h-4 text-gray-600"
                        />
                        <IoIosArrowForward
                            onClick={onMoveDown}
                            className="w-4 h-4 text-gray-600 "
                        />
                    </>
                )}
            </div>
            <div className="flex flex-row gap-1 lg:gap-4">
                <div className="lg:mt-auto">
                    <div className="hidden lg:block">
                        {activeSlide == slide.id && (
                            <>
                                <IoArrowUpOutline
                                    onClick={onMoveUp}
                                    className="w-4 h-4 text-gray-600 hover:text-gray-400 mb-2"
                                />
                                <IoArrowDownOutline
                                    onClick={onMoveDown}
                                    className="w-4 h-4 text-gray-600 hover:text-gray-400 mb-2"
                                />
                                <div className="my-6 border" />
                            </>
                        )}
                        <IoCopy
                            onClick={onDuplicate}
                            className="w-4 h-4 text-gray-600 hover:text-gray-400 mb-2"
                        />
                        <IoTrashBinSharp
                            onClick={onDelete}
                            className="w-4 h-4 text-gray-600 hover:text-gray-400"
                        />
                    </div>
                    <div className="flex flex-col lg:hidden font-bold text-xs">
                        <div>{index + 1}</div>
                        <div className="my-2" />
                        <IoCopy
                            onClick={onDuplicate}
                            className="w-3 h-3 text-gray-600 hover:text-gray-400 mb-1"
                        />
                        <IoTrashBinSharp
                            onClick={onDelete}
                            className="w-3 h-3 text-gray-600 hover:text-gray-400"
                        />
                    </div>
                </div>
                <div
                    onClick={onClick}
                    className={`${
                        slide.has_error && 'border-red-500'
                    } w-20 lg:w-44 bg-white-flat-pattern hover:border-gray-400 duration-200 border p-1 lg:p-3 rounded text-center lg:text-xs text-xxs`}>
                    <div class="flex-col justify-center lg:grid lg:grid-cols-3 lg:gap-4 text-gray-500">
                        <div class="lg:col-span-3 mb-1 text-ellipsis whitespace-nowrap max-w-full overflow-hidden">
                            {slide.title || 'Question'}
                        </div>
                        <div class="w-7 h-7 mt-1 hidden lg:inline-flex items-center justify-center rounded-full border border-gray-200">
                            {slide.duration}
                        </div>
                        <div class="border relative border-dashed px-3 py-1 lg:p-1 inline-flex items-center justify-center">
                            <IoImagesOutline className="lg:w-6 lg:h-6 h-5 w-5" />
                            {slide.image_preview && (
                                <img
                                    className="absolute w-full h-full object-contain"
                                    src={slide.image_preview}
                                />
                            )}
                        </div>
                        <div class="w-7 h-7 mt-1 ml-auto hidden lg:inline-flex items-center justify-center rounded-full border border-gray-200">
                            <IoFlashOutline className="w-4 h-4" />
                        </div>
                    </div>
                    <div class="lg:grid grid-cols-2 gap-x-3 gap-y-1 mt-4 hidden bottom-0">
                        {slide.answers.map(answer => (
                            <div
                                className={`${
                                    answer.isCorrect
                                        ? 'bg-green-100'
                                        : 'bg-gray-100'
                                } rounded w-full h-2`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniSlide
