var { executeQuery } = require('../db/connection')


formDataModel = (req, res) => {

    executeQuery(`select  json_agg(json_build_object('empno',emp.empno,'empname',emp.name,'deptno',dpt.dept_no,'deptname',dpt.dept_name,'desno',rl.des_no,'designation',rl.designation)) as empdet,
    json_agg(json_build_object('resid',res.id,'empno',res.empno ,'responsibility',res.emp_res)) as responsibility
    from employees emp , roles rl , department dpt , responsibility res
    where emp.dept_no = dpt.dept_no
    and emp.des_no = rl.des_no
    and res.empno = emp.empno`, [])
        .then(res => res.status(200).send(res))
        .catch(err => res.status(400).send(err))
}



module.exports = { formDataModel }