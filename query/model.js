var { executeQuery } = require('../db/connection')


formDataModel = (req, res) => {

    executeQuery(`select emp.empno,emp.name,dpt.dept_no,dpt.dept_name,rl.des_no,rl.designation 
    from employees emp , roles rl , department dpt  where emp.dept_no = dpt.dept_no and emp.des_no = rl.des_no`, [])
        .then(res => res.status(200).send(res))
        .catch(err => res.status(400).send(err))
}



module.exports = { formDataModel }