const mysql = require('mysql');

/**
 * This function creates a connection to the MySQL database.
 *
 * The connection will be created using the environment variables
 * MYSQL_ADDRESS_DB, MYSQL_ADMIN_USER, MYSQL_ADMIN_PASSWORD and
 * MYSQL_DATABASE_NAME.
 *
 * @return {Object} A MySQL connection object.
 */
function mysqlConnection() {
   const con = mysql.createConnection({
      /**
       * The host of the MySQL server.
       */
      host: process.env.MYSQL_ADDRESS_DB,
      /**
       * The user to use to connect to the database.
       */
      user: process.env.MYSQL_ADMIN_USER,
      /**
       * The password to use to connect to the database.
       */
      password: process.env.MYSQL_ADMIN_PASSWORD,
      /**
       * The name of the database to connect to.
       */
      database: process.env.MYSQL_DATABASE_NAME,
   });

   return con;
}

module.exports = { mysqlConnection };
