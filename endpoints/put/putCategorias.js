const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutCategoria() {
   app.put('/categorias', (req, res) => {
      const { id, nome_categoria } = req.headers;

      if (!nome_categoria) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a categoria.' });
      }

      const con = mysqlConnection();

      con.query(
         'UPDATE categoria SET nome_categoria = ? WHERE id = ?',
         [nome_categoria, id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar atualizar a categoria.',
               });
            }

            if (results.affectedRows === 0) {
               return res
                  .status(404)
                  .json({ error: 'Categoria não encontrada.' });
            }

            res.json({ message: 'Categoria atualizada com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutCategoria;
