create table employees
(
id serial ,
empno numeric primary key,
password varchar(50),
name varchar(50),
dept_no numeric,
des_no numeric,
report_to numeric
);

create table department(
	id serial,
	dept_no numeric primary key,
	dept_name varchar(100),
	dept_head numeric	
)


create table roles (
id serial,
des_no numeric primary key,
dept_no numeric,
designation varchar(100)
)