import React, { useState, useEffect } from 'react'

export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={goToTop}
                    title="Go To Top"
                    className="fixed bottom-4 right-12 w-14 h-14 p-4 border-0 rounded-full shadow-md bg-green-600 hover:bg-green-700 text-white text-lg font-semibold transition-colors duration-300 z-40"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
                    </svg>
                </button>
            )}
        </>
    )
}
