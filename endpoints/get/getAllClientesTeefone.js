const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodosClientesTelefone() {
   app.get('/clientes-telefone', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select cliente_telefone.id 
         , cliente_telefone.numero_telefone 
         , cliente.nome as "nome_cliente"
      from cliente_telefone
     inner join cliente
        on cliente.id  = cliente_telefone.id_cliente   `,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter as Clientes.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetTodosClientesTelefone = GetTodosClientesTelefone;
