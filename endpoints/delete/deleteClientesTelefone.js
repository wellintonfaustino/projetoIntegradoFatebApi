const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function DeleteClientesTelefone() {
   app.delete('/clientes-telefone', (req, res) => {
      const id = req.headers.id;

      const con = mysqlConnection();

      con.query(
         'DELETE FROM cliente_telefone WHERE id = ?',
         [id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar excluir telefone',
               });
            }

            if (results.affectedRows === 0) {
               return res
                  .status(404)
                  .json({ error: 'telefone não encontrado.' });
            }

            res.json({ message: 'telefone excluído com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = DeleteClientesTelefone;
