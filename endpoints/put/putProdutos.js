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

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE produto SET';
      const values = [];

      if (nome_produto) {
         query += ' nome_produto = ?,';
         values.push(nome_produto);
      }

      if (id_categoria) {
         query += ' id_categoria = ?,';
         values.push(id_categoria);
      }

      if (preco) {
         query += ' preco = ?,';
         values.push(preco);
      }

      if (id_fornecedor) {
         query += ' id_fornecedor = ?,';
         values.push(id_fornecedor);
      }

      // Remover a última vírgula da consulta SQL
      query = query.slice(0, -1);

      // Adicionar a cláusula WHERE para atualizar apenas o fornecedor com o ID fornecido
      query += ' WHERE id = ?';
      values.push(id);

      const con = mysqlConnection();

      con.query(query, values, (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar atualizar o Produto.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
         }

         res.json({ message: 'Produto atualizado com sucesso.' });
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutProduto;
