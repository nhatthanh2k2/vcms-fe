import React from 'react'

export const CustomerInfo = ({ customer }) => {
    return (
        <div>
            <div className="flex gap-10 ">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Mã khách hàng:</label>
                    <input
                        readOnly
                        value={customer?.customerCode}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Họ và tên:</label>
                    <input
                        readOnly
                        value={customer?.customerFullName}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>
            </div>

            <div className="flex gap-10 mt-5">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Email:</label>
                    <input
                        readOnly
                        value={customer?.customerEmail}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Số điện thoại:</label>
                    <input
                        readOnly
                        value={customer?.customerPhone}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>
            </div>

            <div className="flex gap-10 mt-5">
                <div className="flex-1 flex flex-col space-y-2">
                    <label className="font-semibold">Ngày sinh:</label>
                    <input
                        readOnly
                        value={customer?.customerDob}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>

                <div className="flex-1 flex flex-col space-y-2 font-semibold">
                    <label>Giới tính:</label>
                    <div className="flex gap-10 ">
                        <div className="flex gap-5">
                            <label htmlFor="">Nam</label>
                            <input
                                readOnly
                                type="radio"
                                name="radio-5"
                                className="radio radio-success"
                                checked={customer?.customerGender === 'MALE'}
                            />
                        </div>

                        <div className="flex gap-5">
                            <label htmlFor="">Nữ</label>
                            <input
                                readOnly
                                type="radio"
                                name="radio-5"
                                className="radio radio-success"
                                checked={customer?.customerGender === 'FEMALE'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="font-semibold mt-5">
                <label>Địa chỉ thường trú:</label>
            </div>

            <div className="flex gap-10 ">
                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Tỉnh/Thành:</label>
                    <input
                        readOnly
                        value={customer?.customerProvince}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Quận/Huyện:</label>
                    <input
                        readOnly
                        value={customer?.customerDistrict}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <label className="font-semibold">Xã/Phường:</label>
                    <input
                        readOnly
                        value={customer?.customerWard}
                        type="text"
                        className="input input-bordered input-success w-full input-sm"
                    />
                </div>
            </div>
        </div>
    )
}
