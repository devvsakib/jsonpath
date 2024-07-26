import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        screenSize: undefined,
        height: undefined,
    })
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            function handleResize() {
                setWindowSize({
                    screenSize: window.innerWidth,
                    height: window.innerHeight,
                })
            }

            window.addEventListener('resize', handleResize)

            handleResize()

            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowSize

}

export default useWindowSize