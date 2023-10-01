import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <AuthCard title="Log in" padding={false}>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4 px-6 py-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors
                    className="mb-4 px-6 py-4"
                    errors={errors}
                />

                <form onSubmit={submitForm}>
                    <div className="px-6 py-4">
                        {/* Email Address */}
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block mt-1 w-full"
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <div className="block mt-4">
                                <label
                                    htmlFor="remember_me"
                                    className="inline-flex items-center">
                                    <input
                                        id="remember_me"
                                        type="checkbox"
                                        name="remember"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />

                                    <span className="ml-2 text-sm font-semibold text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                            <Link href="/forgot-password">
                                <a className="left-underline text-sm pt-2 font-semibold text-gray-500">
                                    Forgot your password?
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="px-4 py-3 gradient-gray text-right sm:px-6 ">
                        <div className="flex items-center justify-between">
                            <Link href="/register">
                                <a className="left-underline text-sm font-semibold text-gray-200">
                                    Create an account?
                                </a>
                            </Link>

                            <Button className="ml-3 w-32">Log in</Button>
                        </div>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
