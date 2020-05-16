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
designation varchar(100)
)




alter table department add foreign key(dept_head) references employees(empno)
alter table roles add foreign key(dept_no) references department(dept_no)
alter table employees add foreign key(dept_no) references department(dept_no) , add foreign key(des_no) references roles(des_no)