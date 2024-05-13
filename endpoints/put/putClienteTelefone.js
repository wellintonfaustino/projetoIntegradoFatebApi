const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutClientesTelefone() {
   app.put('/clientes-telefone', (req, res) => {
      const { id, numero_telefone, id_cliente } = req.headers;

      // Verificar se há pelo menos um campo preenchido
      if (!numero_telefone && !id_cliente) {
         return res.status(400).json({
            error: 'É necessário fornecer ao menos um campo para atualizar o cliente.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE cliente_telefone SET';
      const values = [];

      if (numero_telefone) {
         query += ' numero_telefone = ?,';
         values.push(numero_telefone);
      }

      if (id_cliente) {
         query += ' id_cliente = ?,';
         values.push(id_cliente);
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

module.exports = PutClientesTelefone;
