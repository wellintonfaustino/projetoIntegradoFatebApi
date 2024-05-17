const DeleteCategoria = require('./delete/deleteCategorias');
const DeleteCidade = require('./delete/deleteCidade');
const DeleteClientes = require('./delete/deleteClientes');
const DeleteClientesTelefone = require('./delete/deleteClientesTelefone');
const DeleteEmpresa = require('./delete/deleteEmpresas');
const DeleteFormaPagamento = require('./delete/deleteFormaPagamento');
const DeleteFornecedor = require('./delete/deleteFornecedores');
const DeleteProduto = require('./delete/deleteProduto');
const DeleteUsuarios = require('./delete/deleteUsuarios');

function CallbackDelete() {
   DeleteCategoria();
   DeleteProduto();
   DeleteFornecedor();
   DeleteCidade();
   DeleteEmpresa();
   DeleteClientes();
   DeleteClientesTelefone();
   DeleteFormaPagamento();
   DeleteUsuarios();
}

module.exports = { CallbackDelete };