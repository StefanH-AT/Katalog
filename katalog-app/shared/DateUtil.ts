export function addDays(date: Date, daysToAdd: number) {
    date.setDate(date.getDate() + daysToAdd);
    return date;
}