var mysql  = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({     
  host     : 'localhost',       //主机
  user     : 'root',               //MySQL认证用户名
  password : 'hujun',        //MySQL认证用户密码
  port     : '3306',             //端口号
  database : 'nodesample'      //数据库
}); 

connection.connect();

/*
**node-mysql的增
*/
// var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
// var  userAddSql_Params = ['Wilson', 'abcd'];

// connection.query(userAddSql,userAddSql_Params,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        

//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

/*
**node-mysql的改
*/
// var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
// var userModSql_Params = ['Json', '9527',1];

// connection.query(userModSql,userModSql_Params,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

/*
**node-mysql的查
*/
// var  userGetSql = 'SELECT * FROM userinfo';

// connection.query(userGetSql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }        

//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

/*
**node-mysql的删
*/
var  userDelSql = 'DELETE FROM userinfo';

connection.query(userDelSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        

       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});

connection.end();