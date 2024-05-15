const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetUsuarios() {
   app.get('/usuarios', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select usuarios.id  as "id"
         , usuarios.login  as "login"
         , '*********' as "senha"
         , perfil_usuario.nome_perfil as "perfil"
      from usuarios
     inner join perfil_usuario
        on perfil_usuario.id  = usuarios.id_perfil_usuario
     order by 1 `,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter os usuários.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = GetUsuarios;
