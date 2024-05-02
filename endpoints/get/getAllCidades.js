const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodasCidades() {
   app.get('/cidades', (req, res) => {
      const con = mysqlConnection();

      con.query(`select * from cidade `, (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar obter as Cidades.',
            });
         }

         res.json(results);
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetTodasCidades = GetTodasCidades;
