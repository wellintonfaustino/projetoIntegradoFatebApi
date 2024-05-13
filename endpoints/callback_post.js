const PostClientes = require('./post/PostCliente');
const PostCategorias = require('./post/postCategorias');
const PostCidades = require('./post/postCidades');
const PostEmpresas = require('./post/postEmpresas');
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
   PutClientes();
}

module.exports = { CallbackPost };
