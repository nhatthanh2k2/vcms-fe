
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(value)
        .replace('₫', 'VNĐ')
}

const exchangeRate = 24000; 

export const convertVNDToUSD = (amountInVND) => {
    const amountInUSD = amountInVND / exchangeRate;
    return amountInUSD.toFixed(2); 
}