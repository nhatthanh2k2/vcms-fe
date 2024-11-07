import React from 'react'

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: 1000,
}

export const LoadingDot = () => {
    return (
        <div style={overlayStyle}>
            <div
                className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"
                style={{ animationDuration: '1s', animationDelay: '-0.6s' }}
            ></div>
            <div
                className="h-8 w-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-bounce"
                style={{ animationDuration: '1s', animationDelay: '-0.45s' }}
            ></div>
            <div
                className="h-8 w-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-bounce"
                style={{ animationDuration: '1s', animationDelay: '-0.3s' }}
            ></div>
            <div
                className="h-8 w-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-bounce"
                style={{ animationDuration: '1s', animationDelay: '-0.15s' }}
            ></div>
            <div
                className="h-8 w-8 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-bounce"
                style={{ animationDuration: '1s' }}
            ></div>
        </div>
    )
}
