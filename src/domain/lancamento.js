class Lancamento {
    constructor (categoria, tipo, valor){
        if(categoria === "" || categoria === undefined) {
            throw new Error("Lançamento Inválido: categoria precisa ter uma descrição.");
        }
        if(tipo !== "receita" && tipo !== "despesa"){
            throw new Error("Lançamento Inválido: tipo precisa ser receita ou despesa.");
        }
        if(valor <= 0 | valor === undefined | valor === ""){
            throw new Error("Lançamento Inválido: valor precisa ser maior que zero.");
        }
        this.categoria = categoria;
        this.tipo = tipo;
        this.valor = valor;
    }

    getValorString(){
        return (this.tipo === "despesa") ? this.valor * -1 : this.valor;
    }
}