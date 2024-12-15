import express from 'express'
import cors from 'cors'
import {videoRouter,testRouter} from "./videoRouter"
import {SETTINGS} from "./settings";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
app.use(SETTINGS.PATH.VIDEOS, videoRouter)
app.use(SETTINGS.PATH.TESING, testRouter)

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: 'Спасибо что спросил! Я жив'})
})

