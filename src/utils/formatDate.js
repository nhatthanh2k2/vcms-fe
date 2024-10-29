import dayjs from "dayjs"

export const disabledPastDate = (current) => {
    const tomorrow = dayjs().add(1, 'day').startOf('day')
    return current && current < tomorrow
}

export const disabledPastDateForEmployee = (current) => {
    const today = dayjs().startOf('day'); 
    return current && current < today;
}


export const disabledDoB = (current) => {
    return current && current > dayjs().endOf('day')
}

export const calculateAge = (dob) => {
    if (dob === null) return;
    const [day, month, year] = dob.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let age = currentYear - year;

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }
    
    if (age <= 2) {
        let months = (age * 12) + (currentMonth - month);
        if (currentDay < day) months--; 
        return { ageInMonths: months, ageInYears: age };
    }

    return { ageInMonths: null, ageInYears: age };
};

export const convertAgeRangeToMonths = (range) => {
    if (range.includes('tháng')) {
        const [start, end] = range.match(/\d+/g).map(Number);
        return { start, end };
    } else if (range.includes('tuổi')) {
        const [start, end] = range.match(/\d+/g).map(num => Number(num) * 12);
        return { start, end };
    } else if (range === 'Người trưởng thành') {
        return { start: 18 * 12, end: Infinity };
    } else if (range === 'Phụ nữ trước mang thai') {
        return { start: 18 * 12, end: Infinity };
    }
    return null;
};
