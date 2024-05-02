const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostProdutos() {
   app.post('/produtos', (req, res) => {
      const { nome_produto, id_categoria, id_fornecedor, preco } = req.headers;

      if (!nome_produto && !id_categoria) {
         return res
            .status(400)
            .json({ error: 'É necessário todos os campos para cadastrar.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO produto 
         (nome_produto, id_categoria, id_fornecedor, preco)
         VALUES( ? , ? , ? , ? ) `,
         [nome_produto, id_categoria, id_fornecedor, preco],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar o produto.',
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
