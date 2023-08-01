import express from 'express'
import cors from 'cors'
import authRoutes from './Routes/Auth.js'
import postRoutes from './Routes/Posts.js'
import MULTER from 'multer'
import appwriteSDK from 'node-appwrite'
const PORT = 1000
const app = express()

const apiKey = '0074d8a2662e7782495369b57eb4de049c4fee6eb6bcf5197b5a276a7123540252e293c317724b370785f9056d0faef3580d0048a5616d9c9cf7bcc29127f6ace652aa45f14cd340213c072a0150cd41039d4680282ad31a6b5b6f7a6fb40deb653f9c976b3df6f4d77906f442ced14564dbef114e9358a3ca0eff7ac11658d6'


const client = new appwriteSDK.Client()
const storage = new appwriteSDK.Storage(client)

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('64c7e9ee17c84cabe3cd').setKey(apiKey)

    // https://cloud.appwrite.io/v1/storage/buckets/64c7eca766fabd64a806/files/64c7ecf86160a19cfb51/view?project=64c7e9ee17c84cabe3cd&mode=admin
    // const promise = storage.listFiles('64c7eca766fabd64a806');
    // const promise = storage.listBuckets();
    // const promise = storage.deleteBucket('64c897d46e0041c938b7');
    // const promise = storage.getBucket('64c7eca766fabd64a806');
    // const promise = storage.createBucket('mainUpload', 'blogApiMainUpload')


app.use(express.json())
app.use(cors({ origin: '*' }))

app.use("/server/posts", postRoutes)
app.use("/server/auth", authRoutes)

const ImgCache = MULTER.memoryStorage();
const cacheImg = MULTER({ storage: ImgCache });

app.post('/server/imgpreview', cacheImg.single('cache'), (req, res) => {
    if(req.file){
        const Img = req.file
        const ID = Img.originalname.replace(/[^a-z^A-Z]/g, '').length > 20 ? Img.originalname.replace(/[^a-z^A-Z]/g, '').slice(0,20) : Img.originalname.replace(/[^a-z^A-Z]/g, '')

        const promise = storage.createFile('cacheBucket', ID, appwriteSDK.InputFile.fromBuffer(Img.buffer, Img.originalname))
        promise.then(function (response) {
            res.json(response.$id)
        }, function (error) {
            console.log(error)
        })
    } 
})

const fileUpload = MULTER.memoryStorage()
const Upload = MULTER({ storage: fileUpload })
app.post('/server/upload', Upload.single('mainImg'), (req, res) => {
    if(req.file){
        const Img = req.file
        const ID = Img.originalname.replace(/[^a-z^A-Z]/g, '').length > 20 ? Img.originalname.replace(/[^a-z^A-Z]/g, '').slice(0,20) : Img.originalname.replace(/[^a-z^A-Z]/g, '')
        

        const promise = storage.createFile('64c899ada58fb46d6840', ID, appwriteSDK.InputFile.fromBuffer(Img.buffer, Img.originalname))
        promise.then(function (response) {
            res.json(response.$id)

            // DELETING OF CACHE STORAGE IN THE CLOUD
            const deleteImg = storage.listFiles('cacheBucket')
            deleteImg.then(function (data) {
                if(data.files.length > 0){
                    for (let i = 0; i < data.files.length; i++) {
                        storage.deleteFile('cacheBucket', data.files[i].$id)
                    }
                }
            }, function (error) {
                console.log(error)
            })
        }, function (error) {
            console.log(error)
        })
    } 
})



app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})