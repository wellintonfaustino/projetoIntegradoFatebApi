const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

// Cadastra um novo vendedor
function PostVendedores() {
   app.post('/vendedores', (req, res) => {
      const { cpf, endereco, nome_vendedor, id_usuario, id_empresa } =
         req.headers;

      if (!cpf && !endereco && !nome_vendedor && !id_usuario && !id_empresa) {
         return res
            .status(400)
            .json({ error: 'É necessário todos os campos para cadastrar.' });
      }
      // Cria uma nova conexão com o MySQL
      const con = mysqlConnection();

      // Executa a consulta SQL
      con.query(
         `INSERT INTO vendedor
         (cpf, endereco, nome_vendedor, id_usuario, id_empresa)
         VALUES(?, ?, ?, ?, ?); `,
         [cpf, endereco, nome_vendedor, id_usuario, id_empresa],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar criar o produto.',
               });
            }

            const dadosInseridos = results.insertId;

            res.status(201).json({
               id: dadosInseridos,
               cpf,
               endereco,
               nome_vendedor,
               id_usuario,
               id_empresa,
            });
         },
      );

      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PostVendedores;
