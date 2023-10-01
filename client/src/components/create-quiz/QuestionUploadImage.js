import Button from '../Button'

const QuestionUploadImage = ({ setSlides, slides, slide }) => {
    const onSelectImage = event => {
        if (event.target.files[0] != null) {
            let mapped = slides.map(i => {
                return i.id === Number(slide.id)
                    ? {
                          ...i,
                          image: event.target.files[0],
                          image_preview: URL.createObjectURL(
                              event.target.files[0],
                          ),
                      }
                    : { ...i }
            })
            setSlides(mapped)
        }
    }

    const onDeselectImage = () => {
        let mapped = slides.map(i => {
            return i.id === Number(slide.id)
                ? { ...i, image: null, image_preview: null }
                : { ...i }
        })
        setSlides(mapped)
    }

    return (
        <div className="h-52 w-64 lg:h-72 lg:w-96 relative bg-white-pattern shadow-black-sm mt-1 border border-black rounded-md">
            <img
                className={`${
                    !slide.image_preview && 'hidden'
                }  object-contain absolute w-full h-full`}
                src={slide.image_preview && slide.image_preview}
            />
            <div
                className={`${
                    !slide.image_preview && 'hidden'
                } bottom-0 right-0 absolute bg-gray-100 w-full p-2 rounded-b`}>
                <Button onClick={onDeselectImage} className={`text-sm `}>
                    Remove
                </Button>
            </div>
            <div
                className={`${
                    slide.image_preview && 'hidden'
                } flex w-full h-full justify-center items-center px-6 pt-5 pb-6 `}>
                <div className="space-y-1 text-center">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer ">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <input
                                type="file"
                                accept="image/*"
                                id="file-upload"
                                name="file-upload"
                                className="sr-only"
                                onChange={onSelectImage}
                            />
                            <p className="pl-1">
                                Upload image or drag and drop
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                        </p>
                        <div
                            className={`text-sm mt-1 p-2 bg-purple-pattern font-gluten text-white rounded shadow-black-sm`}>
                            Upload image
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default QuestionUploadImage
