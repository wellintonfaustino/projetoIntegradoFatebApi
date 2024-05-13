const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutClientes() {
   app.put('/clientes', (req, res) => {
      const { id, documento, email, endereco, nome, id_cidade } = req.headers;

      // Verificar se há pelo menos um campo preenchido
      if (!id && !documento && !email && !endereco && !nome && !id_cidade) {
         return res.status(400).json({
            error: 'É necessário fornecer ao menos um campo para atualizar o cliente.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE cliente SET';
      const values = [];

      if (documento) {
         query += ' documento = ?,';
         values.push(documento);
      }

      if (email) {
         query += ' email = ?,';
         values.push(email);
      }

      if (endereco) {
         query += ' endereco = ?,';
         values.push(endereco);
      }

      if (nome) {
         query += ' nome = ?,';
         values.push(nome);
      }

      if (id_cidade) {
         query += ' id_cidade = ?,';
         values.push(id_cidade);
      }

      // Remover a última vírgula da consulta SQL
      query = query.slice(0, -1);

      // Adicionar a cláusula WHERE para atualizar apenas o empresa com o ID fornecido
      query += ' WHERE id = ?';
      values.push(id);

      const con = mysqlConnection();

      con.query(query, values, (error, results) => {
         if (error) {
            console.error('Erro ao executar consulta:', error);
            return res.status(500).json({
               error: 'Ocorreu um erro ao tentar atualizar o cliente.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'cliente não encontrado.' });
         }

         res.json({ message: 'cliente atualizado com sucesso.' });
      });

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutClientes;
