var router = require('express').Router()
var { getFormData, submitQuery, getQueryList, insertLog, queryCount } = require('./controller')



router.get('/formData', getFormData)
router.get('/queryList', getQueryList)

router.get('/queryCount', queryCount)

router.post('/queryData', submitQuery)
router.post('/queryLog', insertLog)



module.exports = router