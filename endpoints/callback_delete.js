const DeleteCategoria = require('./delete/deleteCategorias');
const DeleteCidade = require('./delete/deleteCidade');
const DeleteFornecedor = require('./delete/deleteFornecedores');
const DeleteProduto = require('./delete/deleteProduto');

function CallbackDelete() {
   DeleteCategoria();
   DeleteProduto();
   DeleteFornecedor();
   DeleteCidade();
}

module.exports = { CallbackDelete };
