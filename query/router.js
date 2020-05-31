var router = require('express').Router()
var { getFormData, submitQuery, getQueryList } = require('./controller')



router.get('/formData', getFormData)
router.get('/queryList', getQueryList)
router.post('/queryData', submitQuery)

module.exports = router