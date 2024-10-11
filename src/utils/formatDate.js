import dayjs from "dayjs"

export const disabledPastDate = (current) => {
    const tomorrow = dayjs().add(1, 'day').startOf('day')
    return current && current < tomorrow
}

export const disabledDoB = (current) => {
    return current && current > dayjs().endOf('day')
}

export const calculateAge = (dob) => {
    if(dob === null) return
    const [day, month, year] = dob.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let age = currentYear - year;

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }

    return age;
}