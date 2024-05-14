const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostFormaPagamento() {
   app.post('/forma-pagamento', (req, res) => {
      const { descricao_forma_pagamento, quantidade_parcelamento, tipo_prazo } =
         req.headers;

      if (
         !descricao_forma_pagamento &&
         !quantidade_parcelamento &&
         !tipo_prazo
      ) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer todos os campos.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO forma_pagamento
         (descricao_forma_pagamento, quantidade_parcelamento, tipo_prazo)
         VALUES(?, ? , ?)`,
         [descricao_forma_pagamento, quantidade_parcelamento, tipo_prazo],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar a categoria.',
               });
            }

            const insertedId = results.insertId;

            res.status(201).json({
               id: insertedId,
               descricao_forma_pagamento,
               quantidade_parcelamento,
               tipo_prazo,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostFormaPagamento;
