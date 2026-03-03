import { useLayoutEffect, useState } from "react"

export const useMediaQuery = (cb: (windowWidth: number) => boolean) => {
    const [state, setState] = useState(cb(window.innerWidth))
    useLayoutEffect(() => {
        function callack() {
            setState(cb(window.innerWidth))
        }
        window.addEventListener('resize', callack)

        return () => window.removeEventListener('resize', callack)
    }, [])

    return state
}