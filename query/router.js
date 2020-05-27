var router = require('express').Router()
var { getFormData, submitQuery } = require('./controller')



router.get('/formData', getFormData)
router.post('/queryData', submitQuery)

module.exports = router