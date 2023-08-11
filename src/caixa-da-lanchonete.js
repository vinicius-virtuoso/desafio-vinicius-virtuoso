import { validaFormaDePagamentos } from "./formas-de-pagamentos.js";
import { catalogoProdutos } from "./catalogo-da-lanchonente.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    let total = 0;

    if (validaFormaDePagamentos(metodoDePagamento) === null) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length <= 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valores = [];
    for (let i = 0; i < itens.length; i++) {
      let itemFormatadoSimples = itens[i].split(",");

      if (itemFormatadoSimples.length <= 1) {
        return "Item inválido!";
      }

      const itemFormatadoComCampos = {
        codigo: itemFormatadoSimples[0],
        quantidade: Number(itemFormatadoSimples[1]),
      };

      if (
        catalogoProdutos.find(
          (item) => item.codigo === itemFormatadoComCampos.codigo
        ) === undefined
      ) {
        return "Item inválido!";
      }

      if (itemFormatadoComCampos.quantidade <= 0) {
        return "Quantidade inválida!";
      }

      const produto = itens.map((item) => item.split(",")[0]);

      if (produto.includes("queijo")) {
        if (!produto.includes("sanduiche")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (produto.includes("chantily")) {
        if (!produto.includes("cafe")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      valores.push(
        catalogoProdutos.find(
          (prodVal) => prodVal.codigo === itemFormatadoComCampos.codigo
        ).valor * itemFormatadoComCampos.quantidade
      );
    }

    total = valores.reduce((acc, item) => acc + item, 0);

    if (metodoDePagamento === "dinheiro") {
      total = total * (1 - 0.05);
    }

    if (metodoDePagamento === "credito") {
      total = total * (1 + 0.03);
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
