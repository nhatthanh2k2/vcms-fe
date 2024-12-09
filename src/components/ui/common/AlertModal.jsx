import React, { useEffect, useRef } from 'react'

export const AlertModal = ({ modalId, message }) => {
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24">
                        <path fill="#2980b9" d="M22 13a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                        <path fill="#3498db" d="M22 12a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" />
                        <path fill="#2980b9" d="M11 7v2h2V7h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z" />
                        <path fill="#ecf0f1" d="M11 6v2h2V6h-2zm-1 4-1 1h2v6H9v1h6v-1h-2v-7h-3z" />
                    </svg>
                    <span className="font-bold text-lg">Thông báo</span>
                </div>

                <p className="py-5 text-xl text-blue-600">{message}</p>
            </div>
        </dialog>
    )
}
