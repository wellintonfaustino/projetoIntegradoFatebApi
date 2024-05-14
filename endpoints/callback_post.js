const PostClientes = require('./post/PostCliente');
const PostClientesTelefone = require('./post/PostClienteTelefone');
const PostCategorias = require('./post/postCategorias');
const PostCidades = require('./post/postCidades');
const PostEmpresas = require('./post/postEmpresas');
const PostFormaPagamento = require('./post/postFormaPagamento');
const PostFornecedores = require('./post/postFornecedores');
const PostProdutos = require('./post/postProdutos');
const PutClientes = require('./put/putCliente');

function CallbackPost() {
   PostCategorias();
   PostProdutos();
   PostFornecedores();
   PostCidades();
   PostEmpresas();
   PostClientes();
   PostClientes();
   PostClientesTelefone();
   PostFormaPagamento();
}

module.exports = { CallbackPost };
