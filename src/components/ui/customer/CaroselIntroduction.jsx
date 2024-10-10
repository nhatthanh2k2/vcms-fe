import React from 'react'
import { Carousel } from 'antd'

export const CarouselIntroduction = () => {
    return (
        <section className="slider">
            <Carousel autoplay arrows>
                <div className=" bg-cover bg-center bg-no-repeat h-[600px] bg-slider">
                    <div className="container mx-auto h-full">
                        <div className=" flex mt-30 h-full">
                            <div className="">
                                <div>
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Tiêm chủng hôm nay, bảo vệ sức khỏe ngày mai.
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal text-lg">
                                        Hãy đầu tư cho sức khỏe tương lai của bản thân và gia đình
                                        bằng cách tiêm chủng đầy đủ và đúng lịch.
                                    </p>
                                    <img
                                        src="/images/slide-1.jpg"
                                        className="h-70 object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" bg-cover bg-center bg-no-repeat h-[600px] bg-slider2">
                    <div className="container mx-auto h-full">
                        <div className="row flex mt-30 h-full">
                            <div className="">
                                <div>
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Sức khỏe mạnh mẽ từ mỗi mũi tiêm của bạn!
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal text-lg">
                                        Tiêm chủng giúp bạn phòng tránh các bệnh nguy hiểm mà không
                                        cần phải lo lắng về việc điều trị sau này.
                                    </p>
                                    <img
                                        src="/images/slide-2.jpg"
                                        className="h-70 object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" bg-cover bg-center bg-no-repeat h-[600px] bg-slider3">
                    <div className="container mx-auto h-full">
                        <div className="row flex mt-30 h-full">
                            <div className="">
                                <div className="">
                                    <h1 className="text-[#2C2D3F] text-[38px] font-bold leading-[42px]">
                                        Một mũi tiêm, vạn lần an tâm.
                                    </h1>
                                    <p className="text-[#2C2D3F] mt-[27px] font-normal text-lg">
                                        Mỗi mũi tiêm giúp bạn và người thân ngăn ngừa bệnh tật và
                                        sống khỏe mạnh hơn.
                                    </p>
                                    <img
                                        src="/images/slide-3.jpg"
                                        className="h-70 object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}
