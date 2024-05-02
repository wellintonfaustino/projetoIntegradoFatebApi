const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodasCategorias() {
   app.get('/categorias', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select categoria.id 
         , categoria.nome_categoria 
         , count(produto.id)  qnt_produtos
      from categoria
      left join produto
        on produto.id_categoria  = categoria.id
     group by categoria.id 
         , categoria.nome_categoria `,
         (error, results) => {
            if (error) {
               console.error('Erro ao executar consulta:', error);
               return res.status(500).json({
                  error: 'Ocorreu um erro ao tentar obter as categorias.',
               });
            }

            res.json(results);
         },
      );
      // Fechando a conexão com o MySQL
      con.end();
   });
}

exports.GetTodasCategorias = GetTodasCategorias;
