var { formDataModel, submitQueryModel, getQueryModel } = require('./model.js')

const getFormData = (req, res) => {
    formDataModel(req, res)
}

const submitQuery = (req, res) => {
    submitQueryModel(req, res)
}

const getQueryList = (req, res) => {
    getQueryModel(req, res)
}

module.exports = { getFormData, submitQuery, getQueryList } 