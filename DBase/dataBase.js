import MYSQL from 'mysql'

export const DB = MYSQL.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'Learned 1945',
    // database:'mainblog'
    host: "db4free.net",
    user: "learnedsconcept",
    password: 'm94jC6bS3Xp!2LR',
    database: 'lxpurchase'
})

DB.connect((err, result) => {
    if(err, result){
        console.log('DB Connected')
    }else{
        console.log('Data Base Not Found!')
    }
})

export default DB