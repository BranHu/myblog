# Mysql
## Mysql基础知识
### 存储过程
* 定义
 将常用的或很复杂的工作，预先用SQL语句写好并用一个指定的名称存储起来, 那么以后要叫数据库提供与已定义好的存储过程的功能相同的服务时,只需调用execute,  即可自动完成命令。讲到这里,可能有人要问：这么说存储过程就是一堆SQL语句而已啊? 为什么还要添加这个技术呢?
* 存储过程的优点
** 存储过程只在创造时进行编译，以后每次执行存储过程都不需再重新编译，而一般SQL语句每执行一次就编译一次,所以使用存储过程可提高数据库执行速度。

** 当对数据库进行复杂操作时(如对多个表进行Update,Insert,Query,Delete时)，可将此复杂操作用存储过程封装起来与数据库提供的事务处理结合一起使用。

** 存储过程可以重复使用,可减少数据库开发人员的工作量。

** 安全性高,可设定只有某此用户才具有对指定存储过程的使用权。

### 连接池
### 数据库事务
## Mysql语法
### 查询/创建数据库
 ```sql
 show databases;
 create database samp_db;
 ```
### 选择数据库
 ```sql
 use samp_db;
 ```
### 显示该数据库的表
 ```sql
 show tables;
 ```
### 创建数据库表
 ```sql
 create table students
 (
 id int unsigned not null auto_increment primary key,
 name char(8) not null,
 sex char(4) not null,
 age tinyint unsigned not null,
 tel char(13) null default "-"
 );
 ```
 * e.g.
 ```sql
 CREATE DATABASE IF NOT EXISTS nodesample CHARACTER SET UTF8;
 
 USE nodesample;

 SET FOREIGN_KEY_CHECKS=0;

 DROP TABLE IF EXISTS userinfo;
 CREATE TABLE userinfo (
   Id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
   UserName varchar(64) NOT NULL COMMENT '用户名',
   UserPass varchar(64) NOT NULL COMMENT '用户密码',
   PRIMARY KEY (Id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
 ```
###  表中插入数据
 ```sql
 insert into students values(NULL,"王刚","男","20","13469974191");
 ```
### 查询表中的数据
 ```sql
 select name,age from students;
 ```
### 按特定条件查询
 ```sql
 select * from students where set="女";
 ```
### 更新/修改表中的数据
 ```sql
 update students set tel=default where id=5;
 update students set age=age+1;
 ```
 * e.g. 将手机号为 13288097888 的姓名改为 "张伟鹏", 年龄改为 19 <br>
 ```sql
 update students set namel="张伟鹏",age=19 where tel="13288097888";
 update students set age=age+1;
 ```
### 删除表中的数据
 ```sql
 delete from students where id=5;
 delete from students;
 ```
### 添加列
 ```sql
 alter table students add columnName hobby;
 ```
### 修改列

 * e.g. 将表 tel 列改名为 telphone
 ```sql
 alter table students change tel telphone char(13) default "-";
 ```
 * e.g. 将 name 列的数据类型改为 char(16)
 ```sql
 alter table students change name name char(16) not null;
 ```
### 删除列

 * e.g. 删除birthday列
 ```sql
 alter table students drop birthday;
 ```
### 重命名表

 * e.g. 重命名 students 表为 workmates
 ```sql
 alter table students rename workmates;
 ```
### 删除整张表
 ```sql
 drop table workmates;
 ```
### 删除整个数据库
 ```sql
 drop database samp_db;
 ```
