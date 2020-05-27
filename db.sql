create table employees
(
id serial ,
empno numeric primary key,
password varchar(100),
name varchar(50),
dept_no numeric,
des_no numeric,
report_to numeric,
created_time timestamp
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

create table responsibility(
id  serial,
empno numeric,
empres varchar(50) 
)


create table tasks 
(id serial, 
assignto numeric ,
assignby numeric,
queryreg varchar(50),
querydetail varchar(3000),
status varchar(15),
createdtime timestamp)

alter table responsibility add foreign key(empno) references employees(empno)

alter table department add foreign key(dept_head) references employees(empno)
alter table employees add foreign key(dept_no) references department(dept_no) , add foreign key(des_no) references roles(des_no)

alter table tasks add foreign key(assignby) references employees(empno)

alter table tasks add foreign key(assignto) references employees(empno)


--insert

	insert into roles (des_no , designation) values (10, 'Junior Supervisor - Trainee')
	insert into roles (des_no , designation) values (20, 'Junior Supervisor')
	insert into roles (des_no , designation) values (30, 'Senior')
	insert into roles (des_no , designation) values (40, 'Junior Executive')
	insert into roles (des_no , designation) values (50, 'Executive')
	insert into roles (des_no , designation) values (60, 'Manager')


--
insert into department (dept_no , dept_name ) values (10,'Systems')
insert into department (dept_no , dept_name ) values (20,'Sales')
insert into department (dept_no , dept_name ) values (30,'Purchase')
insert into department (dept_no , dept_name ) values (40,'Accounts')
insert into department (dept_no , dept_name ) values (50,'Projects')


