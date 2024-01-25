function arredondar (valor) {
    const valorArredondado = Math.round(valor*100)/100;
    return valorArredondado;
}

function formatarDinheiro(valor){
    return new Intl.NumberFormat("pt-br", {currency: "BRL", style: "currency"}).format(valor);
}