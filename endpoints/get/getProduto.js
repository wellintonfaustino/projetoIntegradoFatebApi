const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetProdutos() {
   app.get('/produtos', (req, res) => {
      const con = mysqlConnection();

      con.query('SELECT * FROM produto', (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar obter as categorias.',
            });
         }

         res.json(results);
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetProdutos = GetProdutos;
