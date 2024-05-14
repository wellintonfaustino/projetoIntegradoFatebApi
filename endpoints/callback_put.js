const PutProduto = require('./put/putProdutos');
const PutCategoria = require('./put/putCategorias');
const PutFornecedores = require('./put/putFornecedores');
const PutCidade = require('./put/putCidade');
const PutEmpresas = require('./put/putEmpresas');
const PutClientes = require('./put/putCliente');
const PutClientesTelefone = require('./put/putClienteTelefone');
const PutFormaPagamento = require('./put/putFormaPagamento');

function CallbackPut() {
   PutCategoria();
   PutProduto();
   PutFornecedores();
   PutCidade();
   PutEmpresas();
   PutClientes();
   PutClientesTelefone();
   PutFormaPagamento();
}

module.exports = { CallbackPut };
