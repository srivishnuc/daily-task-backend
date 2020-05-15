const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const jwt = require('jsonwebtoken')

require('dotenv').config()


let userRouter = require('./user/router')


const app = express()

app.use(cors());

const authMiddleware = (req, res, next) => {
    let isLogin = req.method == 'PUT' && (req.url == '/user/login/' || req.url == '/user/login')
    let isSignup = req.method == 'POST' && (req.url == '/user' || req.url == '/user/')

    if (isLogin || isSignup)
        next()

    else {
        const { authorization } = req.header

        jwt.verify(authorization, 'testsecret', (err, decoded) => {
            if (err)
                res.status(500).send({ status: 'failed', msg: 'un authorized' })

            else {
                req.id = decoded.data.id
                next()
            }
        })
    }
}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(authMiddleware)

app.use('/user', userRouter)

app.listen(process.env.PORT, () => console.log(`Listening at port ${process.env.PORT}`))
