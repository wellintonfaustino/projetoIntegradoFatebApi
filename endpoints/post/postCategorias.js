const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostCategorias() {
   app.post('/categorias', (req, res) => {
      const { nome_categoria } = req.headers;

      if (!nome_categoria) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a categoria.' });
      }

      const con = mysqlConnection();

      con.query(
         'INSERT INTO categoria (nome_categoria) VALUES (?)',
         [nome_categoria],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar a categoria.',
               });
            }

            const insertedId = results.insertId;

            res.status(201).json({ id: insertedId, nome_categoria });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostCategorias;
