var router = require('express').Router()
var { getFormData } = require('./controller')



router.get('/formData', getFormData)


module.exports = router