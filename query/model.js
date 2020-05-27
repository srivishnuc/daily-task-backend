var { executeQuery } = require('../db/connection')


formDataModel = (req, res) => {

    // executeQuery(`select  json_agg(json_build_object('empno',emp.empno,'empname',emp.name,'deptno',dpt.dept_no,'deptname',dpt.dept_name,'desno',rl.des_no,'designation',rl.designation)) as empdet,
    // json_agg(json_build_object('resid',res.id,'empno',res.empno ,'responsibility',res.empres)) as responsibility
    // from employees emp , roles rl , department dpt , responsibility res
    // where emp.dept_no = dpt.dept_no
    // and emp.des_no = rl.des_no
    // and res.empno = emp.empno`, [])
    executeQuery(`select  json_agg(json_build_object('empno',emp.empno,'empname',emp.name,'deptno',dpt.dept_no,'deptname',dpt.dept_name,'desno',rl.des_no,'designation',rl.designation)) as empdet
    from employees emp , roles rl , department dpt 
    where emp.dept_no = dpt.dept_no
    and emp.des_no = rl.des_no
	union all
	select json_agg(json_build_object('resid',res.id,'empno',res.empno ,'responsibility',res.empres)) as responsibility								   
	from responsibility res`, [])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
}

submitQueryModel = (req, res) => {
    const { assignto, query, queryDetails } = req.body
    executeQuery(`insert into tasks(assignto,queryreg,querydetail,status,createdtime,assignby) 
    values($1,$2,$3,'NEW',now(),2302)`, [assignto, query, queryDetails])
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error))
}


module.exports = { formDataModel, submitQueryModel }