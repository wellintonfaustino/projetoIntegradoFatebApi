const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutCidade() {
   app.put('/cidades', (req, res) => {
      const { id, nome_cidade } = req.headers;

      if (!nome_cidade) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a Cidade.' });
      }

      const con = mysqlConnection();

      con.query(
         'UPDATE cidade SET nome_cidade = ? WHERE id = ?',
         [nome_cidade, id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar atualizar a Cidade.',
               });
            }

            if (results.affectedRows === 0) {
               return res.status(404).json({ error: 'Cidade não encontrada.' });
            }

            res.json({ message: 'Cidade atualizada com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutCidade;
