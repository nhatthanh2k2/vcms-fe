import dayjs from "dayjs"

export const disabledPastDate = (current) => {
    const tomorrow = dayjs().add(1, 'day').startOf('day')
    return current && current < tomorrow
}

export const disabledDoB = (current) => {
    return current && current > dayjs().endOf('day')
}
