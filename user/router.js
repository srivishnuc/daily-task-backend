const express = require('express')
const router = express.Router()
var { registerUser, loginUser } = require('./controller.js')


router.post('/', registerUser)

router.put('/login', loginUser)



module.exports = router 