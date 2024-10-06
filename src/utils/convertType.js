export const convertPackageType = (type) => {
    switch (type) {
        case '6-MONTH':
            return '(Gói 6 tháng)'
        case '9-MONTH':
            return '(Gói 9 tháng)'
        case '12-MONTH':
            return '(Gói 12 tháng)'
        case '24-MONTH':
            return '(Gói 24 tháng)'
        default:
            return '' // Hoặc return một giá trị mặc định nào đó
    }
}

export const convertVaccineType = (type) => {
    switch (type) {
        case 'BOTH':
            return ''
        default:
            return type
    }
}

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