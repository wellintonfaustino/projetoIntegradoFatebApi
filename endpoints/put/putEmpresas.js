const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutEmpresas() {
   app.put('/Empresas', (req, res) => {
      const {
         id,
         cnpj,
         email,
         endereco,
         ie,
         nome_fantasia,
         razao_social,
         id_cidade,
      } = req.headers;

      // Verificar se há pelo menos um campo preenchido
      if (
         !id &&
         !cnpj &&
         !email &&
         !endereco &&
         !ie &&
         !nome_fantasia &&
         !razao_social &&
         !id_cidade
      ) {
         return res.status(400).json({
            error: 'É necessário fornecer ao menos um campo para atualizar a empresa.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE empresa SET';
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

      if (nome_fantasia) {
         query += ' nome_fantasia = ?,';
         values.push(nome_fantasia);
      }

      if (razao_social) {
         query += ' razao_social = ?,';
         values.push(razao_social);
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
               error: 'Ocorreu um erro ao tentar atualizar o empresa.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'empresa não encontrado.' });
         }

         res.json({ message: 'empresa atualizado com sucesso.' });
      });

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutEmpresas;
