var { executeQuery } = require('../db/connection')

const registerModel = (req, res) => {
    const { empname, empno, password, deptno, desno } = req.body
    executeQuery('insert into employees(name,empno,password,dept_no,des_no,created_time ) values ($1,$2,$3,$4,$5,now())', [empname, empno, password, deptno, desno])
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



const getUserByEmpnoModal = (empno) => {
    return new Promise((resolve, reject) => {
        executeQuery(`SELECT * FROM employees where empno = $1`, [empno])
            .then(result => resolve(result.rows))
            .catch(err => reject({ msg: 'Error executing query', error: err }))
    })
}

module.exports = { registerModel, getUserByEmpnoModal, regDataModel }