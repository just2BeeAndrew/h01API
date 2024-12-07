import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
const app = express()

const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/',(req: Request,res: Response)=>{
    res.send('Hello IT-Incubator! This my first homework!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})