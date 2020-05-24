var { formDataModel } = require('./model.js')

const getFormData = (req, res) => {

    formDataModel(req, res)

}


module.exports = { getFormData } 