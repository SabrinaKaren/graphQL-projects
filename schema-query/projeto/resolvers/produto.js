module.exports = {
    precoComDesconto(parent) {
        if (parent.desconto) {
            return parent.preco - (parent.desconto * parent.preco);
        } else {
            return parent.preco;
        }
    }
};