const validaFormaDePagamentos = (metodoDePagamento) => {
  const metodosPagamentos = ["credito", "dinheiro", "debito"];

  const encontraMetodoDePagamento =
    metodosPagamentos.includes(metodoDePagamento);

  if (!encontraMetodoDePagamento) {
    return null;
  }

  return encontraMetodoDePagamento;
};

export { validaFormaDePagamentos };
