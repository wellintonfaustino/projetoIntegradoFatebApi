const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function PutFornecedores() {
   app.put('/fornecedores', (req, res) => {
      const { id, cnpj, email, endereco, ie, nome_fornecedor, telefone } =
         req.headers;

      if (
         !cnpj &&
         !email &&
         !endereco &&
         !ie &&
         !nome_fornecedor &&
         !telefone &&
         !id
      ) {
         return res
            .status(400)
            .json({ error: 'É necessário fornecer um nome para a categoria.' });
      }

      const con = mysqlConnection();

      con.query(
         `UPDATE fornecedor
         SET cnpj=?, email=?, endereco=?, ie=?, nome_fornecedor=?, telefone=?
         WHERE id_fornecedor=?;`,
         [cnpj, email, endereco, ie, nome_fornecedor, telefone, id],
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar atualizar a categoria.',
               });
            }

            if (results.affectedRows === 0) {
               return res
                  .status(404)
                  .json({ error: 'fornecedor não encontrado.' });
            }

            res.json({ message: 'fornecedor atualizado com sucesso.' });
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

module.exports = PutFornecedores;
