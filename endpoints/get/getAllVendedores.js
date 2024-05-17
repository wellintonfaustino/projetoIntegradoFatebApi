const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodosVendedores() {
   app.get('/vendedores', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select vendedor.id
         , vendedor.cpf 
         , vendedor.endereco 
         , vendedor.nome_vendedor
         , usuarios.login  
         , empresa.nome_fantasia 
      from vendedor
     inner join usuarios
        on usuarios.id  = vendedor.id_usuario 
     inner join empresa
        on empresa.id   = vendedor.id_empresa  `,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter a lista de vendedores.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o BD
      con.end();
   });
}
module.exports = GetTodosVendedores;
