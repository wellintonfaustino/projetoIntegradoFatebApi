const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodosClientes() {
   app.get('/clientes', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select cliente.id
         , cliente.nome 
         , cliente.email 
         , cliente.documento  
         , cliente.endereco 
         , cidade.nome_cidade  
      from cliente
     inner join cidade
        on cidade.id  = cliente.id_cidade  `,
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

exports.GetTodosClientes = GetTodosClientes;
