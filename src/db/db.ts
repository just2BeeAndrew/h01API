import {DBType, Resolution} from '../types/db.types'

export const db: DBType = { // создаём базу данных (пока это просто переменная)
    videos: [{
        id: 1,
        title: 'Video1',
        author: 'Author1',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: '12.12.2012',
        publicationDate: '13.12.2012',
        availableResolution: [Resolution.P144],
    }],
}
// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos.length = 0
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}

export const addDays = (Day: Date, addDay: number) => {
    Day.setDate(Day.getDate() + addDay)
    return Day

}