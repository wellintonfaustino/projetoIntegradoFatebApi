const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PostClientesTelefone() {
   app.post('/clientes-telefone', (req, res) => {
      const { numero_telefone, id_cliente } = req.headers;

      //console.log(numero_telefone, id_cliente);

      if (!numero_telefone && !id_cliente) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer todos os campos.' });
      }

      const con = mysqlConnection();

      con.query(
         `INSERT INTO a.cliente_telefone
         ( numero_telefone, id_cliente)
         VALUES(?, ?);`,
         [numero_telefone, id_cliente],
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
               numero_telefone,
               id_cliente,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostClientesTelefone;
