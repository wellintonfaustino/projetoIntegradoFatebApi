const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodasEmpresas() {
   app.get('/empresas', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select empresa.id 
         , empresa.cnpj 
         , empresa.nome_fantasia 
         , empresa.razao_social 
         , empresa.email 
         , empresa.ie 
         , empresa.endereco 
         , cidade.nome_cidade 
      from empresa
     inner join cidade
        on cidade.id  = empresa.id_cidade`,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter as Empresas.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetTodasEmpresas = GetTodasEmpresas;
