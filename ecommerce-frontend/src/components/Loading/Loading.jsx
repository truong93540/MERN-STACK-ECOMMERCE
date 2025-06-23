import React from 'react'

const Loading = ({ spinning = true, tip = 'Loading...', background, children }) => {
    background = background || 'bg-white/60'
    return (
        <div className="relative">
            {spinning && (
                <div
                    className={`absolute inset-0 z-[2] flex flex-col items-center justify-center ${background}`}>
                    <svg
                        className="animate-spin h-8 w-8 text-blue-500 mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span className="text-blue-500 text-sm">{tip}</span>
                </div>
            )}
            <div className={spinning ? 'opacity-50 pointer-events-none' : ''}>{children}</div>
        </div>
    )
}

export default Loading
