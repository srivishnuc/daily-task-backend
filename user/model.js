var { executeQuery, jwtToken } = require('../db/connection')

const registerModel = (req, res, givenPassword) => {
    const { name, empno, password, dept, des } = req.body
    executeQuery('insert into employees(name,empno,password,dept_no,des_no,created_time ) values ($1,$2,$3,$4,$5,now())', [name, empno, password, dept, des])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))

}

const regDataModel = (req, res) => {
    executeQuery(`select  json_agg(json_build_object('dept_no',dept_no , 'dept_name' , dept_name) ) as department from department`, null)
        .then(result1 => {
            executeQuery(`select json_agg(json_build_object('des_no',des_no , 'designation' , designation) ) as roles  from roles`, null)
                .then(result2 => res.status(200).send({ status: result2.status, msg: result2.msg, dept: result1.rows, roles: result2.rows }))
                .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))



}



const getUserByEmailModal = (email) => {
    return new Promise((resolve, reject) => {
        executeQuery(`SELECT * FROM users where email = $1`, [email])
            .then(result => resolve(result.rows))
            .catch(err => reject({ msg: 'Error executing query', error: err }))
    })
}

module.exports = { registerModel, getUserByEmailModal, regDataModel }