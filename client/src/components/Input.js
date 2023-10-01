const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-xl hover:border-purple-500 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
