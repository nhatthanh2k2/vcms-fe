import React from 'react'

export const EmployeeProfileTab = () => {
    return (
        <div>
            <div className="flex gap-10">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Họ và tên:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>

                <div className="flex-1 flex flex-col space-y-2">
                    <label className="font-semibold">Ngày sinh:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
            </div>

            <div className="flex gap-10 mt-5">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Email:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Số điện thoại:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
            </div>

            <div className="flex gap-10 mt-5">
                <div className="flex-1 flex flex-col space-y-2 font-semibold">
                    <label>Giới tính:</label>
                    <div className="flex gap-10 ">
                        <div className="flex gap-5">
                            <label htmlFor="">Nam</label>
                            <input type="radio" name="radio-5" className="radio radio-info" />
                        </div>

                        <div className="flex gap-5">
                            <label htmlFor="">Nữ</label>
                            <input type="radio" name="radio-5" className="radio radio-info" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Trình độ chuyên môn:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
            </div>

            <div className="font-semibold mt-5">
                <label>Địa chỉ thường trú:</label>
            </div>

            <div className="flex gap-10 ">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Tỉnh/Thành:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Quận/Huyện:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Xã/Phường:</label>
                    <input
                        type="text"
                        className="input input-bordered input-info w-full input-sm"
                    />
                </div>
            </div>
        </div>
    )
}
