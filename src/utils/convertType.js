export const convertAppointmentStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return 'Đang chờ'
        case 'CONFIRMED':
            return 'Xác nhận'  
        case 'COMPLETED':
            return 'Hoàn thành'
        case 'CANCELLED':
            return 'Hủy lịch'
        default:
            break;
    }
}

export const convertQualification = (qual) => {
    switch (qual) {
        case 'ĐD':
            return 'Điều dưỡng'
        case 'BS':
            return 'Bác sĩ'
        case 'BS.CKI':
            return 'Bác sĩ chuyên khoa I'
        case 'BS.CKII':
            return 'Bác sĩ chuyên khoa II'
        case 'Ths.Bs':
            return 'Thạc sĩ, Bác sĩ'
        case 'Ts.Bs':
            return 'Tiến sĩ, Bác sĩ'
        default:
            return qual
    }
}

export const convertPaymentType = (payment) => {
    switch (payment) {
        case 'PAYPAL':
            return 'Paypal'
        case 'TRANSFER':
            return 'Tiền mặt'
        case 'CASH':
            return 'Chuyển khoản'
        default:
            return payment
    }
}

export const convertScreeningResult = (result) => {
    switch (result) {
        case 'ELIGIBLE':
            return 'Đủ điều kiện tiêm'
        case 'NOT_ELIGIBLE':
            return 'Chưa đủ điều kiện tiêm'
        default:
            return result
    }
}