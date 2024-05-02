const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function DeleteFornecedor() {
   app.delete('/fornecedores', (req, res) => {
      const id = req.headers.id;

      const con = mysqlConnection();

      con.query(
         'DELETE FROM fornecedor WHERE id = ?',
         [id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar excluir fornecedor',
               });
            }

            if (results.affectedRows === 0) {
               return res
                  .status(404)
                  .json({ error: 'fornecedor não encontrado.' });
            }

            res.json({ message: 'fornecedor excluído com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = DeleteFornecedor;
