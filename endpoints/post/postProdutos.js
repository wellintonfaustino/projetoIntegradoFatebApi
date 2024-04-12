const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostProdutos() {
   app.post('/produtos', (req, res) => {
      const { nome_produto, id_categoria } = req.headers;

      if (!nome_produto && !id_categoria) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a categoria.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO produto
         (nome_produto, id_categoria)
         VALUES( ? , ? ) `,
         [nome_produto, id_categoria],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar a categoria.',
               });
            }

            const dadosInseridos = results.insertId;

            res.status(201).json({
               id: dadosInseridos,
               nome_produto,
               id_categoria,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostProdutos;
