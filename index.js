const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var port = process.env.PORT || 8001

const jwt = require('jsonwebtoken')

require('dotenv').config()


let userRouter = require('./user/router')
let queryRouter = require('./query/router')


const app = express()

app.use(cors());

const authMiddleware = (req, res, next) => {
    //console.log(req.body)
    let isLogin = req.method == 'PUT' && (req.url == '/user/login/' || req.url == '/user/login')
    let isSignup = req.method == 'POST' && (req.url == '/user' || req.url == '/user/')

    if (isLogin || isSignup) {

        next()

    }

    else {
        const { authorization } = req.headers
        jwt.verify(authorization, 'testsecret', (err, decoded) => {
            if (err)
                res.status(500).send({ status: 'failed', msg: 'un authorized' })
            else {
                req.id = decoded.data.id
                next()
            }
        })
        // next()
    }
}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(authMiddleware)

app.use('/user', userRouter)
app.use('/query', queryRouter)

app.listen(port, () => console.log(`Listening at port ${port}`))
