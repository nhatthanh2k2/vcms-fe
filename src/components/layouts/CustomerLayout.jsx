import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { BackToTopButton, CustomerHeader, CustomerFooter, ChatBotButton, ChatWindow } from '../ui'

export const CustomerLayout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <CustomerHeader />
            <div className="flex-1 pb-2">
                <Outlet />
            </div>
            <CustomerFooter />

            <BackToTopButton />
            <ChatBotButton toggleChat={toggleChat} />
            {isChatOpen && <ChatWindow toggleChat={toggleChat} />}
        </div>
    )
}
