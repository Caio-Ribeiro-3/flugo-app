import { useNavigate as useNavigateTS } from '@tanstack/react-router'
import { useCallback } from 'react'

export const useNavigate = () => {
    const navigate = useNavigateTS()

    const finalNavigate = useCallback((to: string) => {
        navigate({
            to
        })
    }, [navigate])

    return finalNavigate
}