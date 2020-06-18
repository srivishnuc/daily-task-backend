var { formDataModel, submitQueryModel, getQueryModel, insertLogModel, getCountModel } = require('./model.js')

const getFormData = (req, res) => {
    formDataModel(req, res)
}

const submitQuery = (req, res) => {
    submitQueryModel(req, res)
}

const getQueryList = (req, res) => {
    getQueryModel(req, res)
}


const insertLog = (req, res) => {
    insertLogModel(req, res)
}


const queryCount = (req, res) => {
    getCountModel(req, res)
}


module.exports = { getFormData, submitQuery, getQueryList, insertLog, queryCount } 