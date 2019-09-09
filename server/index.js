require('dotenv').config()

const cors = require('cors')
const massive = require('massive')
const express = require('express')
const session = require('express-session')

const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env


app.use(cors())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 6000000
    }
}))

//Auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//post endpoints
app.get('/api/post/getAll', postCtrl.getPosts)
app.get('/api/post/:id', postCtrl.getPost)
app.post('/api/post/add', postCtrl.addPost)

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DATABASE')
})

app.listen(SERVER_PORT, () => {
    console.log('SERVER')
})