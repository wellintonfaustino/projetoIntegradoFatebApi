const { app } = require('../..');
const { mysqlConnection } = require('../../mysql_con');

function GetTodosProdutos() {
   app.get('/produtos', (req, res) => {
      const con = mysqlConnection();

      con.query(
         `select produto.id 
         , produto.nome_produto 
         , produto.preco 
         , produto.id_categoria 
         , produto.id_fornecedor 
         , categoria.nome_categoria 
         , fornecedor.nome_fornecedor
         , count(produto_pedido.id) qnt_pedido
      from produto
      left join categoria
        on categoria.id = produto.id_categoria  
      left join fornecedor
        on fornecedor.id  = produto.id_fornecedor
      left join produto_pedido
        on produto_pedido.id_produto  = produto.id
     group by produto.id 
         , produto.nome_produto 
         , produto.preco 
         , produto.id_categoria 
         , produto.id_fornecedor 
         , categoria.nome_categoria 
         , fornecedor.nome_fornecedor`,
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

exports.GetTodosProdutos = GetTodosProdutos;
