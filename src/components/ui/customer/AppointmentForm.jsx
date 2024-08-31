import React, { useState } from 'react'
import { addressService } from '@/services/addressService'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

export const AppointmentForm = () => {
    const [isCustomer, setIsCustomer] = useState(0)

    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()

    const [provinceList, setProvinceList] = useState(
        addressService.getProvinceList()
    )
    const [districtList, setDistrictList] = useState(
        addressService.getDistrictList()
    )
    const [wardList, setWardList] = useState(addressService.getWardList())

    const disabledPastDate = (current) => {
        return current && current < dayjs().startOf('day')
    }

    return (
        <div>
            <div className="mt-4 flex flex-col">
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary mr-4"
                        onChange={() => setIsCustomer(1)}
                    />
                    <span>Bạn đã có mã khách hàng tại trung tâm.</span>
                </div>

                <div className="flex items-center">
                    <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary mr-4"
                        onChange={() => setIsCustomer(0)}
                    />
                    <span>Bạn chưa có mã khách hàng tại trung tâm.</span>
                </div>
            </div>

            <div className="mt-5">
                {isCustomer == 0 ? (
                    <form
                        className=" max-w-fit"
                        //onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className=" text-blue-500 size-5 w-full font-bold text-xl text-center">
                            Thông tin người tiêm
                        </div>

                        <div className="relative z-0 w-full mb-5 group mt-5">
                            <input
                                // value={fullname}
                                // onChange={(e) =>
                                //     setFullName(e.target.value)
                                // }
                                type="text"
                                name="floating_fullname"
                                id="floating_fullname"
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_fullname"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Họ và tên
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                placeholder=" "
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                // value={phone}
                                // onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                name="repeat_phone"
                                id="floating_phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Số điện thoại
                            </label>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group space-x-2">
                                <label>Ngày sinh: </label>
                                <DatePicker
                                    isClearable
                                    format="DD-MM-YYYY"
                                    // onChange={(date) =>
                                    //     setBirthday(
                                    //         dayjs(date).format('DD-MM-YYYY')
                                    //     )
                                    // }
                                />
                            </div>

                            <div className="relative z-0 w-full mb-5 group border-2 flex justify-center">
                                <div className="grid grid-cols-2 gap-5 h-10 mt-2">
                                    <div className="flex space-x-2 justify-center">
                                        <label className="">Nam</label>
                                        <input
                                            type="radio"
                                            name="radio-gender"
                                            className="radio radio-accent"
                                            // value={1}
                                            // onChange={(e) =>
                                            //     setGender(e.target.value)
                                            // }
                                        />
                                    </div>

                                    <div className="flex space-x-2 justify-center">
                                        <label className="">Nữ</label>
                                        <input
                                            type="radio"
                                            name="radio-gender"
                                            className="radio radio-accent"
                                            // value={0}
                                            // onChange={(e) =>
                                            //     setGender(e.target.value)
                                            // }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <label>Địa chỉ thường trú:</label>
                        </div>

                        <div className="flex flex-row space-x-4">
                            <div className="relative z-0 w-full mb-5 group ">
                                <label>Tỉnh/Thành phố:</label>
                                <select
                                    onChange={(e) =>
                                        setProvince(e.target.value)
                                    }
                                    value={province}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                >
                                    {provinceList.map((province, index) => (
                                        <option
                                            key={index}
                                            value={province.code}
                                        >
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label>Quận/Huyện:</label>
                                <select
                                    onChange={(e) =>
                                        setDistrict(e.target.value)
                                    }
                                    value={district}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                >
                                    {province &&
                                        districtList
                                            .filter(
                                                (district) =>
                                                    Number(
                                                        district.province_code
                                                    ) == province
                                            )
                                            .map((districts, index) => (
                                                <option
                                                    key={index}
                                                    value={districts.code}
                                                >
                                                    {districts.name}
                                                </option>
                                            ))}
                                </select>
                            </div>

                            <div className="relative z-0 w-full mb-5 group text-nowrap">
                                <label>Xã/Phường/Thị Trấn:</label>
                                <select
                                    onChange={(e) => setWard(e.target.value)}
                                    value={ward}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                >
                                    {district &&
                                        wardList
                                            .filter(
                                                (ward) =>
                                                    Number(
                                                        ward.district_code
                                                    ) == district
                                            )
                                            .map((ward, index) => (
                                                <option
                                                    key={index}
                                                    value={ward.code}
                                                >
                                                    {ward.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                        </div>

                        <div className=" text-blue-600 size-5 w-full font-bold my-5 text-xl text">
                            Thông tin liên hệ
                        </div>
                        <div className="relative z-0 w-full mb-5 group mt-5">
                            <input
                                // value={relativesName}
                                // onChange={(e) =>
                                //     setRelativesName(e.target.value)
                                // }
                                type="text"
                                name="floating_fullname"
                                id="floating_fullname"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_fullname"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Họ và tên người liên hệ
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                // value={relativesEmail}
                                // onChange={(e) =>
                                //     setRelativesEmail(e.target.value)
                                // }
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email người liên hệ
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                // value={relativesPhone}
                                // onChange={(e) =>
                                //     setRelativesPhone(e.target.value)
                                // }
                                type="text"
                                name="repeat_phone"
                                id="floating_phone"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Số điện thoại người liên hệ
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group space-x-2">
                            <label>Chọn ngày đăng ký tiêm: </label>
                            <DatePicker
                                isClearable
                                format={'DD-MM-YYYY'}
                                disabledDate={disabledPastDate}
                                // onChange={(date) =>
                                //     setInjectionDate(
                                //         dayjs(date).format('DD-MM-YYYY')
                                //     )
                                // }
                            ></DatePicker>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                //onClick={handleRegisterAppointment}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Hoàn Thành Đăng Ký
                            </button>
                        </div>
                    </form>
                ) : (
                    <form
                        className="max-w-full"
                        //onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className=" text-blue-500 size-5 w-full font-bold text-xl">
                            Thông tin người tiêm
                        </div>

                        <div className="relative z-0 w-full group my-5 space-x-2">
                            <input
                                // value={customerId}
                                // onChange={(e) =>
                                //     setCustomerId(e.target.value)
                                // }
                                type="text"
                                name="customer_id"
                                id="customer_id"
                                className="block py-2.5 px-0 w-full  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                required
                            />
                            <label
                                htmlFor="customer_id"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Mã số khách hàng
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group space-x-2">
                            <label>Chọn ngày đăng ký tiêm: </label>
                            <DatePicker
                                isClearable
                                format={'DD-MM-YYYY'}
                                disabledDate={disabledPastDate}
                                // onChange={(date) =>
                                //     setInjectionDate(
                                //         dayjs(date).format('DD-MM-YYYY')
                                //     )
                                // }
                            ></DatePicker>
                        </div>

                        <div>
                            <button
                                type="submit"
                                //onClick={handleRegisterAppointment}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Hoàn Thành Đăng Ký
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
