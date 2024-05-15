const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutUsuarios() {
   app.put('/usuarios', (req, res) => {
      const { id, login, senha, id_perfil_usuario } = req.headers;

      if (!id) {
         return res.status(400).json({
            error: 'É necessário fornecer um id, nome e id categoria.',
         });
      }

      // Construir a consulta SQL baseada nos campos não nulos
      let query = 'UPDATE usuarios SET';
      const values = [];

      if (login) {
         query += ' login = ?,';
         values.push(login);
      }

      if (senha) {
         query += ' senha = ?,';
         values.push(senha);
      }

      if (id_perfil_usuario) {
         query += ' id_perfil_usuario = ?,';
         values.push(id_perfil_usuario);
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
               error: 'Ocorreu um erro ao tentar atualizar o Usuario.',
            });
         }

         if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado.' });
         }

         res.json({ message: 'Usuario atualizado com sucesso.' });
      });
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutUsuarios;
