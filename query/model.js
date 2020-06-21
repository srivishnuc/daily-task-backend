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
    and emp.empno <> $1
	union all
	select json_agg(json_build_object('resid',res.id,'empno',res.empno ,'responsibility',res.empres)) as responsibility								   
	from responsibility res`, [req.id])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => res.status(400).send(err))
}

submitQueryModel = (req, res) => {
    const { assignto, query, queryDetails } = req.body
    executeQuery(`insert into tasks(assignto,queryreg,querydetail,status,assignby) 
    values($1,$2,$3,'NEW',$4)`, [assignto, query, queryDetails, req.id])
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error))
}


getQueryModel = (req, res) => {
    executeQuery(`select  json_agg(json_build_object('id',tk.id , 'assignby' ,emp.name,'taskname',queryreg ,'query',querydetail,'status',status , 'createdtime',created_time)) as  by
    from tasks tk , employees emp
    where assignto = $1
    and tk.assignby = emp.empno
    union all
    select  json_agg(json_build_object('id',tk.id , 'assignto' ,emp.name , 'taskname',queryreg ,'query',querydetail,'status',status , 'createdtime',created_time)) as  to
    from tasks  tk, employees emp
    where assignby = $1
    and tk.assignto = emp.empno`, [req.id])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))
}

insertLogModel = (req, res) => {
    const { id, status, remark } = req.body
    executeQuery(`update tasks set status = $2 where id = $1 `, [id, status]).then(
        executeQuery(`insert into tasklog(id,status,remark,createdtime) values($1,$2,$3,now())`, [id, status, remark])
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error))
    ).catch(error => res.status(400).send(error))
}

getCountModel = (req, res) => {

    executeQuery(`select json_build_object('status' ,'Completed','count',sum(completed)) completed,json_build_object('status' ,'New','count',sum(new)) "new",
    json_build_object('status' ,'In-Process','count',sum(inprocess)) inprocess from 
    (select  
     case when status = 'COMPLETED' then count(*) else 0 end completed ,
     case when status = 'NEW' then count(*) else 0 end  "new" ,
     case when status = 'IN-PROCESS' then count(*) else 0 end  inprocess 
     from tasks
     where assignto = $1
     group by status)tc`, [req.id])
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err))

}


module.exports = { formDataModel, submitQueryModel, getQueryModel, insertLogModel, getCountModel }