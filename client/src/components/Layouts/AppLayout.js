import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Header from './Header'

const AppLayout = ({ navigation = true, header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            {navigation ? <Header user={user} /> : ''}

            {/* Page Heading */}
            {/* <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header> */}

            {/* Page Content */}
            <main>{children}</main>
        </>
    )
}

export default AppLayout
