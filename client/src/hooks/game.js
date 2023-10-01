import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useGame = ({} = {}) => {
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    return {}
}
