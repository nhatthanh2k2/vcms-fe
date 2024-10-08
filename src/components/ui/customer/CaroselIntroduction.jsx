import React from 'react'
import { Carousel } from 'antd'

export const CarouselIntroduction = () => {
    // const sliderData = [
    //     {
    //         bg: 'slider2',
    //         title: 'We Provide Medical Services That You Can Trust!',
    //         description:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.',
    //         button1: 'Get Appointment',
    //         button2: 'Learn More',
    //     },
    //     {
    //         bg: 'slider',
    //         title: 'We Provide Medical Services That You Can Trust!',
    //         description:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.',
    //         button1: 'Get Appointment',
    //         button2: 'About Us',
    //     },
    //     {
    //         bg: 'slider3',
    //         title: 'We Provide Medical Services That You Can Trust!',
    //         description:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.',
    //         button1: 'Get Appointment',
    //         button2: 'Contact Now',
    //     },

    return (
        <section className="slider">
            <Carousel autoplay arrows>
                <div className="single-slider bg-cover bg-center bg-no-repeat h-[600px] bg-slider">
                    <div className="container mx-auto h-full">
                        <div className="row flex items-center h-full">
                            <div className="col-lg-7">
                                <div className="text mt-[120px]">
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Day la 1
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal">xin chao</p>
                                    <div className="button mt-[30px]">
                                        <a
                                            href="#"
                                            className="btn bg-[#1a76d1] text-white font-medium inline-block mr-[10px] px-4 py-2"
                                        >
                                            btn 1
                                        </a>
                                        <a
                                            href="#"
                                            className="btn primary bg-[#2C2D3F] text-white inline-block px-4 py-2"
                                        >
                                            btn2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single-slider bg-cover bg-center bg-no-repeat h-[600px] bg-slider2">
                    <div className="container mx-auto h-full">
                        <div className="row flex items-center h-full">
                            <div className="col-lg-7">
                                <div className="text mt-[120px]">
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Day la 1
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal">xin chao</p>
                                    <div className="button mt-[30px]">
                                        <a
                                            href="#"
                                            className="btn bg-[#1a76d1] text-white font-medium inline-block mr-[10px] px-4 py-2"
                                        >
                                            btn 1
                                        </a>
                                        <a
                                            href="#"
                                            className="btn primary bg-[#2C2D3F] text-white inline-block px-4 py-2"
                                        >
                                            btn2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single-slider bg-cover bg-center bg-no-repeat h-[600px] bg-slider3">
                    <div className="container mx-auto h-full">
                        <div className="row flex items-center h-full">
                            <div className="col-lg-7">
                                <div className="text mt-[120px]">
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Day la 1
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal">xin chao</p>
                                    <div className="button mt-[30px]">
                                        <a
                                            href="#"
                                            className="btn bg-[#1a76d1] text-white font-medium inline-block mr-[10px] px-4 py-2"
                                        >
                                            btn 1
                                        </a>
                                        <a
                                            href="#"
                                            className="btn primary bg-[#2C2D3F] text-white inline-block px-4 py-2"
                                        >
                                            btn2
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}
