function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

const numOfDays = 42;

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months = ["January", "February",
    "March", "April", "May",
    "June", "July", "August",
    "September", "October", "November",
    "December"];

export { getFirstDayOfMonth, numOfDays, months, week }