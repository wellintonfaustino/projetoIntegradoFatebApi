const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostUsuarios() {
   app.post('/usuarios', (req, res) => {
      const { login, senha, id_perfil_usuario } = req.headers;

      if (!login && !senha && !id_perfil_usuario) {
         return res
            .status(400)
            .json({ error: 'É necessário todos os campos para cadastrar.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO usuarios
         (login, senha, id_perfil_usuario)
         VALUES(? , ? , ?); `,
         [login, senha, id_perfil_usuario],
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
               login,
               senha,
               id_perfil_usuario,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostUsuarios;
