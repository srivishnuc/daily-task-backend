const express = require('express')
const router = express.Router()
var { registerUser, loginUser, regData } = require('./controller.js')


router.post('/', registerUser)

router.put('/login', loginUser)

router.get('/regData', regData)



module.exports = router 