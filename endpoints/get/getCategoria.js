const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetCategorias() {
   app.get('/categorias', (req, res) => {
      const con = mysqlConnection();

      con.query(
         'SELECT id, nome_categoria FROM categoria',
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter as categorias.',
               });
            }

            res.json(results);
         },
      );
   });
}

exports.GetCategorias = GetCategorias;
