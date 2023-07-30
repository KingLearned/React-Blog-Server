import express from 'express'
import cors from 'cors'
import authRoutes from './Routes/Auth.js'
import postRoutes from './Routes/Posts.js'
import MULTER from 'multer'
const app = express()



app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.use("/server/auth", authRoutes)
app.use("/server/posts", postRoutes)

const newsImgStorage = MULTER.diskStorage({
    destination: '../Client/public/uploads',

    filename(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = MULTER({ storage:newsImgStorage })

app.post('/server/upload', upload.single('file'), function (req, res){
    if(req.file){
        const newsImg = req.file
        res.status(200).json(newsImg.filename)
    } 
})

const ImgCache = MULTER.diskStorage({
    destination: '../../React-Blog-Project/Client/public/cacheImages',

    filename(req, file, cb){
        cb(null, file.originalname)
    }
})

const cacheImg = MULTER({ storage:ImgCache })

app.post('/server/imgpreview', cacheImg.single('cache'), function (req, res){
    if(req.file){
        const Img = req.file
        console.log(Img)
        res.status(200).json(Img.filename)
    } 
})

app.get('/', (req,res) => {
    res.send('Hello World')
})


app.listen(8800, () => {
    console.log('Server Running')
})