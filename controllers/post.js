import DB from "../DBase/dataBase.js"
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
    const q = req.query.cat ? 'SELECT * FROM posts WHERE cat=? ORDER BY posts.postId DESC':
    'SELECT * FROM posts ORDER BY posts.postId DESC'

    DB.query(q, [req.query.cat], (err,data) => {
        if(err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}
export const getPost = (req, res) => {
    
    const q = "SELECT `postId`, `username`, `title`, `descrp`, `img`, `cat`, `date`, `likes` FROM authors u JOIN posts p ON u.Id=p.uid WHERE p.postId=?"
    DB.query(q, [req.params.id], (err, data) => {
        
        if(err) return res.status(500).send(err)

        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {
    // if(!token) return res.status(401).json("Not authenticated!")

    // jwt.verify(token, "jwkey", (err, userInfo) => {
    //     if(err) return res.status(403).json("Token is not Valid!")

    const q = 'INSERT INTO posts (`title`, `descrp`, `img`, `cat`, `date`, `uid`) VALUES(?)'
    const values = [
        req.body.title,
        req.body.descrp,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.userId
    ]

    DB.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json("Post has been created!")
    })
    // })
}

export const updatePost = (req, res) => {
    const token = req.body.userId

    jwt.verify(token, "jwtkey", (err, userInfo) => { // Decrypt User Token Key

        const postId = req.params.id
        const q = 'UPDATE posts SET `title`=?, `descrp`=?, `cat`=?, `img`=? WHERE `postId`=? AND `uid`=?'
        const values = [ req.body.title, req.body.descrp, req.body.cat, req.body.img, ]

        if(userInfo){
            DB.query(q, [...values, postId, userInfo.id ], (err, data) => {
                if(err) return res.status(500).json(err)
                return res.json("Post has been updated!")
            })

        }
    })

}

export const deletePost = (req, res) => {
    const postId = req.params.id
    const q = 'DELETE FROM posts WHERE posts.postId=?'

    DB.query(q, postId, (err,data) => {
        if(err) return console.log(err)
        
        if(data) return res.json("Post has been deleted")
    })
    
}

export const updatePostLikes = (req, res) => {
    const postId = Number(req.params.id)
    const q = 'UPDATE posts SET `likes`=? WHERE `postId`=?'

    DB.query(q, [req.body.currentLikes, postId], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json("Post likes has been updated!")
    })
}