// задать значения для выпадающего меню
export const towerOptions = [
    { value: 'A', label: 'Башня А' },
    { value: 'B', label: 'Башня Б' },
];

export const floorOptions = [...Array(25)].map((_, index) => (
    {
        value: `${index + 3}`,
        label: `${index + 3}`
    }
));

export const roomOptions = [...Array(10)].map((_, index) => (
    {
        value: `${index + 1}`,
        label: `${index + 1}`
    }
));

export const timeOptions = [...Array(20 - 9).keys()]
    .flatMap((hour) => [`${hour + 9}:00`, `${hour + 9}:30`])
    .map((time) => ({
        value: time,
        label: time
    }));

// установить максимально доступную дату бронирования
export const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
