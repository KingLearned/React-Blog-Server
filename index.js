import express from 'express'
import cors from 'cors'
import authRoutes from './Routes/Auth.js'
import postRoutes from './Routes/Posts.js'
import MULTER from 'multer'
const PORT = 1000

const apiKey = '0074d8a2662e7782495369b57eb4de049c4fee6eb6bcf5197b5a276a7123540252e293c317724b370785f9056d0faef3580d0048a5616d9c9cf7bcc29127f6ace652aa45f14cd340213c072a0150cd41039d4680282ad31a6b5b6f7a6fb40deb653f9c976b3df6f4d77906f442ced14564dbef114e9358a3ca0eff7ac11658d6'

const app = express()

import sdk from 'node-appwrite'
const client = new sdk.Client()
const storage = new sdk.Storage(client)

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('64c7e9ee17c84cabe3cd') // Your project ID
    .setKey(apiKey) // Your secret API key

    // https://cloud.appwrite.io/v1/storage/buckets/64c7eca766fabd64a806/files/64c7ecf86160a19cfb51/view?project=64c7e9ee17c84cabe3cd&mode=admin
    // const promise = storage.listFiles('64c7eca766fabd64a806');
    // const promise = storage.listBuckets();
    // const promise = storage.getBucket('64c7eca766fabd64a806');

// const promise = storage.createFile('64c7eca766fabd64a806', 'Depression-Relief-Concept', sdk.InputFile.fromPath('../Client/public/uploads/Depression-Relief-Concept-777x699.jpg', 'Depression-Relief-Concept-777x699.jpg'))
// sdk.InputFile.
// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// })

app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.use("/server/posts", postRoutes)
app.use("/server/auth", authRoutes)

const ImgCache = MULTER.memoryStorage();
const cacheImg = MULTER({ storage: ImgCache });

app.post('/server/imgpreview', cacheImg.single('cache'), (req, res) => {
    if(req.file){
        const Img = req.file
        const promise = storage.createFile('64c7eca766fabd64a806', 'buffertest', sdk.InputFile.fromBuffer(Img.buffer, Img.originalname))
        // const promise = storage.createFile('64c7eca766fabd64a806', 'Depression-Relief-Concept', sdk.InputFile.fromPath('../Client/public/uploads/Depression-Relief-Concept-777x699.jpg', 'Depression-Relief-Concept-777x699.jpg'))
        
        promise.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        })
        // res.status(200).json(Img.filename)
    } 
})

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})


