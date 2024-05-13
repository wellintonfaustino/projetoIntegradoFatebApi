const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostClientes() {
   app.post('/clientes', (req, res) => {
      const { documento, email, endereco, nome, id_cidade } = req.headers;

      if (!documento && !email && !endereco && !nome && !id_cidade) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer todos os campos.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO a.cliente
           ( documento, email, endereco, nome, id_cidade)
           VALUES( ?, ?, ?, ? , ?);`,
         [documento, email, endereco, nome, id_cidade],
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
               documento,
               email,
               endereco,
               nome,
               id_cidade,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostClientes;
