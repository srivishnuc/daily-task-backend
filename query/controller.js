var { formDataModel, submitQueryModel } = require('./model.js')

const getFormData = (req, res) => {

    formDataModel(req, res)

}

const submitQuery = (req, res) => {

    submitQueryModel(req, res)
}


module.exports = { getFormData, submitQuery } 