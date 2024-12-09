import React from 'react'
import { QRCode } from 'antd'

export const ModalTransfer = () => {
    return (
        <dialog id="modal_transfer" className="modal w-full h-full">
            <div className="modal-box max-w-xl mx-auto">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <QRCode
                        errorLevel="H"
                        value="https://ant.design/"
                        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        size={400}
                    />
                    <p className="text-center mt-4 text-black">Quét mã chuyển khoản đơn hàng</p>
                </div>
            </div>
        </dialog>
    )
}
