import cors from 'cors'
import authRoutes from './Routes/Auth.js'
import postRoutes from './Routes/Posts.js'
import cookieParser from 'cookie-parser'
import MULTER from 'multer'
import express from 'express'
import session from 'express-session'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        secret: '13254',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure:false,
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        }
    })
)

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