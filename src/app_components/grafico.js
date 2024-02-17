class Grafico{
    constructor(){
        this.element = document.createElement("div");
        this.element.className = "grafico";
        this.cores = ["red", "yellow", "green", "blue"]; 
    }

    adicionarColuna(valor, maiorValor, descricao){
        const coluna = new Div("graficoColuna","grafico-coluna");
        const cor = new Div("cor");
        cor.element.style.height = (valor/maiorValor)*100;
        cor.element.style.background = this.cores.pop();
        const colunaTexto = new Div("colunaTexto", "grafico-coluna-texto");
        colunaTexto.element.innerText = descricao;
        coluna.adicionarElementoFilho(cor.element);
        coluna.adicionarElementoFilho(colunaTexto.element);
        this.element.appendChild(coluna.element);
    }
}