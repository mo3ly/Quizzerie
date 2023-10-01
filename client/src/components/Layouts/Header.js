import { Fragment, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { HiMenu, HiSearch, HiX } from 'react-icons/hi'
import Link from 'next/link'
import Button from '../Button'

// source: https://tailwindui.com/components/application-ui
const navigation = {
    categories: [
        {
            id: 'home',
            name: 'Home',
            sections: [
                {
                    id: 'quizz',
                    name: 'Quizz',
                    items: [
                        { name: 'Make a quizz', href: '/create-quiz' },
                        { name: 'Join a quizz', href: '/play' },
                    ],
                },
                {
                    id: 'support',
                    name: 'Support',
                    items: [{ name: 'FAQs', href: '#' }],
                },
                {
                    id: 'getInTouch',
                    name: 'Get in touch',
                    items: [
                        { name: 'Contact us', href: '#' },
                        { name: 'About us', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Schools', href: '/' },
        { name: 'Work', href: '/' },
        { name: 'Study', href: '/' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ user }) {
    const [open, setOpen] = useState(false)
    const { logout } = useAuth()

    return (
        <div className="gradient-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 lg:hidden"
                    onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full">
                        <div className="relative max-w-xs w-full gradient-purple shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 inline-flex items-center justify-center rounded-full text-black border border-black gradient-white shadow-black outline-none"
                                    onClick={() => setOpen(false)}>
                                    <span className="sr-only">Close menu</span>
                                    <HiX
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-900">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {navigation.categories.map(category => (
                                            <Tab
                                                key={category.name}
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected
                                                            ? 'text-yellow-400 border-yellow-400'
                                                            : 'text-white border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium outline-none',
                                                    )
                                                }>
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map(category => (
                                        <Tab.Panel
                                            key={category.name}
                                            className="pt-10 pb-8 px-4 space-y-10">
                                            {category.sections.map(section => (
                                                <div key={section.name}>
                                                    <p
                                                        id={`${category.id}-${section.id}-heading-mobile`}
                                                        className="font-medium text-yellow-400">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6">
                                                        {section.items.map(
                                                            item => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="flow-root">
                                                                    <Link
                                                                        href={
                                                                            item.href
                                                                        }>
                                                                        <a className="-m-2 p-2 block text-gray-200 left-underline">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                {navigation.pages.map(page => (
                                    <div key={page.name} className="flow-root">
                                        <a
                                            href={page.href}
                                            className="-m-2 p-2 block font-medium text-gray-200">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                {user ? (
                                    <>
                                        <div className="flow-root">
                                            <Link href="/dashboard">
                                                <a className="-m-2 p-2 block font-medium px-3 py-2 text-sm justify-center text-black border-2 border-black rounded-full gradient-yellow transform duration-200 hover:scale-105 focus:scale-100">
                                                    Dashboard
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href="#">
                                                <a
                                                    onClick={logout}
                                                    className="-m-2 p-2 block font-medium px-3 py-2 text-sm justify-center text-black border-2 border-black rounded-full gradient-red transform duration-200 hover:scale-105 focus:scale-100">
                                                    Log out
                                                </a>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flow-root">
                                            <Link href="/login">
                                                <a className="-m-2 p-2 block font-medium px-3 py-2 text-sm justify-center text-black border-2 border-black rounded-full gradient-yellow transform duration-200 hover:scale-105 focus:scale-100">
                                                    Sign in
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href="/register">
                                                <a className="-m-2 p-2 block font-medium px-3 py-2 text-sm justify-center text-black border-2 border-black rounded-full gradient-red transform duration-200 hover:scale-105 focus:scale-100">
                                                    Create account
                                                </a>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4">
                                <a
                                    href="#"
                                    className="-m-2 p-2 flex items-center">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-united-kingdom.svg"
                                        alt=""
                                        className="w-5 h-auto block flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-base font-medium text-gray-200">
                                        ENG
                                    </span>
                                    <span className="sr-only">
                                        , change langauge
                                    </span>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white-pattern shadow-sm w-full">
                <nav
                    aria-label="Top"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="h-16 flex items-center content-center">
                            <button
                                type="button"
                                className="gradient-white p-2 rounded-full border border-black shadow-black text-black lg:hidden"
                                onClick={() => setOpen(true)}>
                                <span className="sr-only">Open menu</span>
                                <HiMenu
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 lg:ml-0 flex items-center justify-center flex-grow sm:flex-grow-0">
                                <a href="#">
                                    <span className="sr-only">Logo</span>
                                    <span
                                        className="text-black font-gluten text-3xl p-2 -border border-black"
                                        Style="text-shadow: 0px 1px #303030;">
                                        Quizzerie
                                    </span>
                                    {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" /> */}
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">
                                    {navigation.categories.map(category => (
                                        <Popover
                                            key={category.name}
                                            className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-violet-600 text-violet-600'
                                                                    : 'border-transparent text-gray-600 hover:text-gray-500 left-underline',
                                                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-base font-semibold border-b-2 -mb-px pt-px',
                                                            )}>
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0">
                                                        <Popover.Panel className="absolute z-50 top-full inset-x-0 text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div
                                                                className="absolute inset-0 top-1/2 bg-white shadow"
                                                                aria-hidden="true"
                                                            />

                                                            <div className="relative gradient-white">
                                                                <div className="max-w-7xl mx-auto px-8">
                                                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                                            {category.sections.map(
                                                                                section => (
                                                                                    <div
                                                                                        key={
                                                                                            section.name
                                                                                        }>
                                                                                        <p
                                                                                            id={`${section.name}-heading`}
                                                                                            className="font-medium text-gray-900">
                                                                                            {
                                                                                                section.name
                                                                                            }
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                                                            {section.items.map(
                                                                                                item => (
                                                                                                    <li
                                                                                                        key={
                                                                                                            item.name
                                                                                                        }
                                                                                                        className="flex">
                                                                                                        <Link
                                                                                                            href={
                                                                                                                item.href
                                                                                                            }>
                                                                                                            <a
                                                                                                                href={
                                                                                                                    item.href
                                                                                                                }
                                                                                                                className="hover:text-gray-800 left-underline">
                                                                                                                {
                                                                                                                    item.name
                                                                                                                }
                                                                                                            </a>
                                                                                                        </Link>
                                                                                                    </li>
                                                                                                ),
                                                                                            )}
                                                                                        </ul>
                                                                                    </div>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map(page => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-base font-semibold text-gray-600 left-underline hover:text-gray-500">
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? (
                                        <>
                                            <Link href="/dashboard">
                                                <Button className="text-sm">
                                                    Dashboard
                                                </Button>
                                            </Link>
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                            <Link href="#">
                                                <Button
                                                    onClick={logout}
                                                    className="text-sm bg-white-pattern text-gray-900 border">
                                                    logout
                                                </Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login">
                                                <Button className="text-sm bg-white-pattern text-gray-900 border">
                                                    Sign in
                                                </Button>
                                            </Link>
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                            <Link href="/register">
                                                <Button className="text-sm">
                                                    Create account
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>

                                <div className="hidden lg:ml-8 lg:flex">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-gray-500 flex items-center">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-united-kingdom.svg"
                                            alt=""
                                            className="w-5 h-auto block flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">
                                            ENG
                                        </span>
                                        <span className="sr-only">
                                            , change langauge
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
