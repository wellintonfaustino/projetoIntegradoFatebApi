const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function DeleteUsuarios() {
   app.delete('/usuarios', (req, res) => {
      const id = req.headers.id;

      const con = mysqlConnection();

      con.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar excluir o usuário',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuarios não encontrado.' });
         }

         res.json({ message: 'Usuarios excluído com sucesso.' });
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = DeleteUsuarios;
