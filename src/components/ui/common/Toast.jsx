import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            zIndex={9999}
        />
    )
}

const ToastOption = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
}

export async function MyToast(type, message) {
    switch (type) {
        case 'success': {
            toast.success(message, ToastOption)
            break
        }
        case 'error': {
            toast.error(message, ToastOption)
            break
        }
        case 'info': {
            toast.info(message, ToastOption)
            break
        }
        case 'warn': {
            toast.warn(message, ToastOption)
            break
        }
        default: {
        }
    }
}
