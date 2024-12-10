import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3004,
    PATH: {
        TESING: '/hometask_01/api/testing/all-data',
        VIDEOS: '/hometask_01/api/videos',
    },
}
