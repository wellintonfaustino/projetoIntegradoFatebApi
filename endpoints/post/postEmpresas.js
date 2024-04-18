const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostEmpresas() {
   app.post('/empresas', (req, res) => {
      const {
         cnpj,
         email,
         endereco,
         ie,
         nome_fantasia,
         razao_social,
         id_cidade,
      } = req.headers;

      if (
         !cnpj &&
         !email &&
         !endereco &&
         !ie &&
         !nome_fantasia &&
         !razao_social &&
         !id_cidade
      ) {
         return res
            .status(400)
            .json({ error: 'Falta campos para cadastrar a empresa.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO empresa
         ( cnpj, email, endereco, ie, nome_fantasia, razao_social, id_cidade )
         VALUES(?, ?, ?, ?, ?, ?, ?);`,
         [cnpj, email, endereco, ie, nome_fantasia, razao_social, id_cidade],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar a empresa.',
               });
            }

            const insertedId = results.insertId;

            res.status(201).json({
               id: insertedId,
               cnpj,
               email,
               endereco,
               ie,
               nome_fantasia,
               razao_social,
               id_cidade,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostEmpresas;
