const DeleteCategoria = require('./delete/deleteCategorias');
const DeleteCidade = require('./delete/deleteCidade');
const DeleteEmpresa = require('./delete/deleteEmpresas');
const DeleteFornecedor = require('./delete/deleteFornecedores');
const DeleteProduto = require('./delete/deleteProduto');

function CallbackDelete() {
   DeleteCategoria();
   DeleteProduto();
   DeleteFornecedor();
   DeleteCidade();
   DeleteEmpresa();
}

module.exports = { CallbackDelete };
