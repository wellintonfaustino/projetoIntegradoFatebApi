const mysql = require('mysql');

function mysqlConnection() {
   const con = mysql.createConnection({
      host: process.env.MYSQL_ADDRESS_DB,
      user: process.env.MYSQL_ADMIN_USER,
      password: process.env.MYSQL_ADMIN_PASSWORD,
      database: 'projetointegrado',
   });

   con.connect(function (err) {
      if (err) throw err;
      console.log('Mysql conectado!');
   });
   return con;
}

module.exports = { mysqlConnection };
