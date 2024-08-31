import React from 'react'
import { Carousel } from 'antd'

export const CarouselIntroduction = () => {
    return (
        <Carousel autoplay arrows>
            <div>
                <img
                    className="h-1/2 w-full pointer-events-none"
                    src="/images/banner2.jpg"
                    alt=""
                />
            </div>
            <div>
                <img
                    className="h-1/2 w-full pointer-events-none"
                    src="/images/banner3.jpg"
                    alt=""
                />
            </div>
            <div>
                <img
                    className="h-1/2 w-full pointer-events-none"
                    src="/images/banner4.jpg"
                    alt=""
                />
            </div>
        </Carousel>
    )
}
