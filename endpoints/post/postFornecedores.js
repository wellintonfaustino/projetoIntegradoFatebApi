const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostFornecedores() {
   app.post('/fornecedores', (req, res) => {
      const { cnpj, email, endereco, ie, nome_fornecedor, telefone } =
         req.headers;

      if (
         !cnpj &&
         !email &&
         !endereco &&
         !ie &&
         !nome_fornecedor &&
         !telefone
      ) {
         return res
            .status(400)
            .json({ error: 'Falta campos para cadastrar o fornecedor.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO fornecedor
         ( cnpj, email, endereco, ie, nome_fornecedor, telefone)
         VALUES(?, ?, ?, ?, ?, ?);`,
         [cnpj, email, endereco, ie, nome_fornecedor, telefone],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar fornecror.',
               });
            }

            const insertedId = results.insertId;

            res.status(201).json({
               id: insertedId,
               nome_fornecedor,
               cnpj,
               email,
               endereco,
               ie,
               telefone,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostFornecedores;
