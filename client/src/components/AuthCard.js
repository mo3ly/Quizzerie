const AuthCard = ({ title, children, padding = true }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-14 sm:pt-6">
        <div className="w-full sm:max-w-md border-black sm:border sm:shadow-black overflow-hidden sm:rounded-lg">
            <div className="px-4 py-2 font-gluten gradient-purple text-left sm:px-6">
                <div className="py-2 text-lg text-white">{title}</div>
            </div>
            <div className={`pt-2 sm:bg-white ${padding ? 'px-6 py-4' : ''}`}>
                {children}
            </div>
        </div>
    </div>
)

export default AuthCard
