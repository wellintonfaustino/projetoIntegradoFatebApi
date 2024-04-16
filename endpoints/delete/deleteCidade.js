const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function DeleteCidade() {
   app.delete('/cidades', (req, res) => {
      const id = req.headers.id;

      const con = mysqlConnection();

      con.query('DELETE FROM cidade WHERE id = ?', [id], (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar excluir a Cidade.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cidade não encontrada.' });
         }

         res.json({ message: 'Cidade excluída com sucesso.' });
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = DeleteCidade;
