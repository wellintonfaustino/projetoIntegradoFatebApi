const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutProduto() {
   app.put('/produtos', (req, res) => {
      const { nome_produto, preco, id_categoria, id_fornecedor, id } =
         req.headers;

      if (!id && !nome_produto && !id_categoria && !preco && !id_fornecedor) {
         return res.status(400).json({
            error: 'É necessário fornecer um id, nome e id categoria.',
         });
      }

      const con = mysqlConnection();

      con.query(
         `UPDATE produto
         SET nome_produto=?, preco=?, id_categoria=?, id_fornecedor=?
         WHERE id=?; `,
         [nome_produto, preco, id_categoria, id_fornecedor, id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar atualizar o Produto.',
               });
            }

            if (results.affectedRows === 0) {
               return res
                  .status(404)
                  .json({ error: 'Produto não encontrado.' });
            }

            res.json({ message: 'Produto atualizado com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutProduto;
