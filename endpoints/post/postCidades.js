const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostCidades() {
   app.post('/cidades', (req, res) => {
      const { nome_cidade } = req.headers;

      if (!nome_cidade) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a categoria.' });
      }

      const con = mysqlConnection();

      con.query(
         'INSERT INTO cidade (nome_cidade) VALUES (?)',
         [nome_cidade],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar a cidade.',
               });
            }

            const insertedId = results.insertId;

            res.status(201).json({ id: insertedId, nome_cidade });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostCidades;
