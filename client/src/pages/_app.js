import 'tailwindcss/tailwind.css'
import '../styles/global/globals.css'
import { AnimatePresence } from 'framer-motion'

const App = ({ Component, pageProps }) => (
    <>
        <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} />
        </AnimatePresence>
    </>
)

export default App
