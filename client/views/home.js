class Home{
    constructor(){
        this.init();
    }
    
    async init(){
        const response = await fetch("http://localhost:3000/api/lancamentos");
        const lancamentos = await response.json();
        const ano = new Ano();
        ano.adicionarMes(new Mes("janeiro"));
        ano.adicionarMes(new Mes("fevereiro"));
        ano.adicionarMes(new Mes("marco"));
        ano.adicionarMes(new Mes("abril"));
        for (const lancamento of lancamentos){
            ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, lancamento.valor));
        }
        ano.calcularSaldo();
        this.ano = ano;
        this.renderizar();
    }

    adicionarLancamento(){
        const mes = document.getElementById("mes");
        const tipo = document.getElementById("tipo");
        const categoria = document.getElementById("categoria");
        const valor = document.getElementById("valor");
        this.ano.adicionarLancamento(mes.value, new Lancamento(categoria.value, tipo.value, parseFloat(valor.value)));
        fetch("http://localhost:3000/api/lancamentos", {method: "post", headers: {"content-type": "application/json"}, body: JSON.stringify({mes: mes.value, categoria: categoria.value, tipo: tipo.value, valor: parseFloat(valor.value)})});
        this.ano.calcularSaldo();
        this.renderizar();
        mes.value = this.ano.meses[0].nome;
        tipo.value = "receita";
        categoria.value = "";
        valor.value = "";
    }

    criaTela(){
        document.getElementById("app").remove();
        this.app = new Div("app");
        const titulo = new H3("Finanças Pessoais");
        this.app.adicionarElementoFilho(titulo.element);
    }
    
    criaForms(){
        const form = new Div("form-lancamento");
        const boxMes = new Div("","data-in");
        boxMes.element.innerText = "Selecione o mês: "
        const mesSelect = new Select("mes");
        for(const mes of this.ano.meses){
            mesSelect.adicionarOpcao(mes.nome);
        }
        boxMes.adicionarElementoFilho(mesSelect.element);
        const boxTipo = new Div("","data-in");
        boxTipo.element.innerText = "Selecione o Tipo: ";
        const tipoSelect = new Select("tipo");
        boxTipo.adicionarElementoFilho(tipoSelect.element);
        tipoSelect.adicionarOpcao("receita");
        tipoSelect.adicionarOpcao("despesa");
        const categoriaInputText = new Input("categoria", "text", "ex: Transporte");
        const valorInputNumber = new Input("valor","number", "ex: 0000");
        const adicionarButton = new Button("botao", "button buttonChanged", "Adicionar Lançamentos");
        adicionarButton.addListener(()=>{
            this.adicionarLancamento();
        }); //arrow function, posso passar uma função como parâmetro e implementar ela aqui mesmo. No caso, poderia ter só usado adicionarLancamento();
        form.adicionarElementoFilho(boxMes.element);
        form.adicionarElementoFilho(boxTipo.element);
        form.adicionarElementoFilho(categoriaInputText.element);
        form.adicionarElementoFilho(valorInputNumber.element);
        form.adicionarElementoFilho(adicionarButton.element);
        this.app.adicionarElementoFilho(form.element);
    }

    criaGrafico(){
        const grafico = new Grafico();
        this.ano.maiorSaldo();
        for(const mes of this.ano.meses){
            grafico.adicionarColuna(mes.totalizador.saldo, this.ano.maiorSaldoDoAno, mes.nome);    
        }
        this.app.adicionarElementoFilho(grafico.element);
    }

    criaTabela(){
        for (const mes of this.ano.meses){
            const nomeDoMes = new H4(mes.nome);
            this.app.adicionarElementoFilho(nomeDoMes.element);
            const tabelaLancamentos = new Table("tabela-lancamentos");
            tabelaLancamentos.addRow("th",["Categoria","Valor"]);
            for (const lancamento of mes.lancamentos){
                const valor = new Span("valorCor");
                valor.adicionarCor(lancamento);
                tabelaLancamentos.addRow("td", [lancamento.categoria, valor.element]);
            }
            const valorJuros = new Span("valorJuros");
            valorJuros.adicionarCor(mes.totalizador.juros);
            tabelaLancamentos.addRow("th", ["Juros", valorJuros.element]);
            const valorRendimentos = new Span("valorRendimentos");
            valorRendimentos.adicionarCor(mes.totalizador.rendimentos);
            tabelaLancamentos.addRow("th", ["Rendimentos", valorRendimentos.element]);
            const valorSaldo = new Span("valorSaldo");
            valorSaldo.adicionarCor(mes.totalizador.saldo);
            tabelaLancamentos.addRow("th", ["Saldo", valorSaldo.element]);
            this.app.adicionarElementoFilho(tabelaLancamentos.element);   
        }  
    }

    renderizar(){
        this.criaTela();
        this.criaForms();
        this.criaGrafico();
        this.criaTabela();    
        const [body] = document.getElementsByTagName("body");  //pega o primeiro elemento do body -> destructuring assigment
        body.appendChild(this.app.element);
    }    
}