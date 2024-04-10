const { GetCategorias } = require('./get/getCategoria');
const { GetLogin } = require('./get/getLogin');

function CallbackGet() {
   GetLogin();
   GetCategorias();
}

module.exports = { CallbackGet };
