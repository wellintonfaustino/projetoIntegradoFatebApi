const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodasFormasPagamento() {
   app.get('/forma-pagamento', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `SELECT id
         , descricao_forma_pagamento
         , quantidade_parcelamento
         , case when (tipo_prazo = 'P') then
              'A Prazo'
                else
              'A vista'
           end as "Prazo"
      FROM forma_pagamento `,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter as forma pagamento.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = GetTodasFormasPagamento;
