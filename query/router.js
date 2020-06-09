var router = require('express').Router()
var { getFormData, submitQuery, getQueryList, insertLog } = require('./controller')



router.get('/formData', getFormData)
router.get('/queryList', getQueryList)
router.post('/queryData', submitQuery)
router.post('/queryLog', insertLog)



module.exports = router