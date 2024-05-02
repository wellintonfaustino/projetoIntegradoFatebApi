const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutFornecedores() {
   app.put('/fornecedores', (req, res) => {
      const { id, cnpj, email, endereco, ie, nome_fornecedor, telefone } =
         req.headers;

      // Verificar se há pelo menos um campo preenchido
      if (
         !id &&
         !cnpj &&
         !email &&
         !endereco &&
         !ie &&
         !nome_fornecedor &&
         !telefone
      ) {
         return res.status(400).json({
            error: 'É necessário fornecer ao menos um campo para atualizar o fornecedor.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE fornecedor SET';
      const values = [];

      if (cnpj) {
         query += ' cnpj = ?,';
         values.push(cnpj);
      }

      if (email) {
         query += ' email = ?,';
         values.push(email);
      }

      if (endereco) {
         query += ' endereco = ?,';
         values.push(endereco);
      }

      if (ie) {
         query += ' ie = ?,';
         values.push(ie);
      }

      if (nome_fornecedor) {
         query += ' nome_fornecedor = ?,';
         values.push(nome_fornecedor);
      }

      if (telefone) {
         query += ' telefone = ?,';
         values.push(telefone);
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
               error: 'Ocorreu um erro ao tentar atualizar o fornecedor.',
            });
         }

         if (results.affectedRows === 0) {
            return res
               .status(404)
               .json({ error: 'Fornecedor não encontrado.' });
         }

         res.json({ message: 'Fornecedor atualizado com sucesso.' });
      });

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutFornecedores;
