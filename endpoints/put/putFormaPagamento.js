const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutFormaPagamento() {
   app.put('/forma-pagamento', (req, res) => {
      const {
         id,
         descricao_forma_pagamento,
         quantidade_parcelamento,
         tipo_prazo,
      } = req.headers;

      // Verificar se há pelo menos um campo preenchido
      if (!id) {
         return res.status(400).json({
            error: 'É necessário fornecer ao menos um campo para atualizar o cliente.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE forma_pagamento SET';
      const values = [];

      if (descricao_forma_pagamento) {
         query += ' descricao_forma_pagamento = ?,';
         values.push(descricao_forma_pagamento);
      }

      if (quantidade_parcelamento) {
         query += ' quantidade_parcelamento = ?,';
         values.push(quantidade_parcelamento);
      }

      if (tipo_prazo) {
         query += ' tipo_prazo = ?,';
         values.push(tipo_prazo);
      }

      //console.log(query);
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
               error: 'Ocorreu um erro ao tentar atualizar o telefone.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'telefone não encontrado.' });
         }

         res.json({ message: 'telefone atualizado com sucesso.' });
      });

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutFormaPagamento;
