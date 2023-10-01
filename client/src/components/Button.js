const Button = ({
    children,
    type = 'submit',
    loading = false,
    disabled = false,
    className,
    ...props
}) => (
    <button
        disabled={loading || disabled}
        type={type}
        className={`btn bg-purple-pattern font-gluten inline-flex items-center justify-center px-4 py-2 text-white transform duration-200 hover:scale-105 border-black rounded-full shadow-black ${className} 
        ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        {...props}>
        {children}
    </button>
)

export default Button
