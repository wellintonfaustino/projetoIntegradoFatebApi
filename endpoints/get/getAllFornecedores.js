const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodosFornecedores() {
   app.get('/fornecedores', (req, res) => {
      const con = mysqlConnection();

      con.query('SELECT * FROM fornecedor', (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar obter fornecedores.',
            });
         }

         res.json(results);
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetTodosFornecedores = GetTodosFornecedores;
