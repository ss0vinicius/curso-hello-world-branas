const janeiro = new Mes("janeiro");
janeiro.adicionarLancamento(new Lancamento("Salário","receita", 3000));
janeiro.adicionarLancamento(new Lancamento("Aluguel","despesa", 1000));
janeiro.adicionarLancamento(new Lancamento("Luz","despesa", 200));
janeiro.adicionarLancamento(new Lancamento("Água","despesa", 100));
janeiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
janeiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 300));
janeiro.adicionarLancamento(new Lancamento("Lazer", "despesa", 300));
janeiro.adicionarLancamento(new Lancamento("Alimentação","despesa", 500));
janeiro.adicionarLancamento(new Lancamento("Condomínio","despesa", 300));
janeiro.adicionarLancamento(new Lancamento("Farmácia", "despesa", 100));


const fevereiro = new Mes("fevereiro");
fevereiro.adicionarLancamento(new Lancamento("Salário", "receita",3000));
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
fevereiro.adicionarLancamento(new Lancamento("Luz", "despesa", 250));
fevereiro.adicionarLancamento(new Lancamento("Água", "despesa", 100));
fevereiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
fevereiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 500));
fevereiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));
fevereiro.adicionarLancamento(new Lancamento("Condomínio", "despesa", 400));


const marco = new Mes("março");
marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000)); 
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
marco.adicionarLancamento(new Lancamento("Luz", "despesa", 200));
marco.adicionarLancamento(new Lancamento("Água", "despesa", 100)); 
marco.adicionarLancamento(new Lancamento("Internet", "despesa", 200)); 
marco.adicionarLancamento(new Lancamento("Transporte", "despesa", 500)); 
marco.adicionarLancamento(new Lancamento("Lazer", "despesa", 800));
marco.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000)); 
marco.adicionarLancamento(new Lancamento("Condomínio", "despesa", 400));

janeiro.adicionarLancamento(new Lancamento("Escola","despesa",500));
janeiro.calcularSaldo();

const abril = new Mes("abril");
marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000)); 
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));

const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
ano.adicionarMes(abril);
ano.calcularSaldo();
console.log(ano.meses);

console.log(document);

function addElement(parent, elementType, text){
    const element = document.createElement(elementType);
    if(text !== "" && text !== undefined && text !== null){
        element.innerText = text;
    }
    parent.appendChild(element);
}

function renderizar(){
    const app = document.getElementById("app");
    if (app.firstChild){
        app.firstChild.remove();
    }

    const painel = document.createElement("div");
    
    const grafico = document.createElement("div");
    grafico.className = "grafico";
    painel.appendChild(grafico);
    const cores = ["red", "yellow", "green", "blue"]; 
    let maiorSaldo = 10000;
    for (const mesMaior of ano.meses){
        if(maiorSaldo < mesMaior.totalizador.saldo){
            maiorSaldo = mesMaior.totalizador.saldo;
        }
        console.log("Maior Saldo: " + maiorSaldo + " | Mês atual: " + mesMaior.nome + " | saldo do mês: " + mesMaior.totalizador.saldo);
    }
    for(const mes of ano.meses){
        const graficoColuna = document.createElement("div");
        graficoColuna.className = "grafico-coluna";
        grafico.appendChild(graficoColuna);
        const graficoColunaCor = document.createElement("div");
        graficoColunaCor.style.height = (mes.totalizador.saldo/maiorSaldo)*100;
        graficoColunaCor.style.background = cores.pop();
        graficoColuna.appendChild(graficoColunaCor);
        const graficoColunaTexto = document.createElement("div");
        graficoColunaTexto.className = "grafico-coluna-texto";
        graficoColunaTexto.innerText = mes.nome;
        graficoColuna.appendChild(graficoColunaTexto);
    }

    for (const mes of ano.meses){
        addElement(painel, "h3", mes.nome);
        const tabelaLancamentos = document.createElement("table");
        tabelaLancamentos.className = "tabela-lancamentos";
        const caption = document.createElement("caption");
        addElement(caption, "caption", "Informações do Mês");
        tabelaLancamentos.appendChild(caption);        
        const header = document.createElement("tr");
        addElement(header, "th", "Categoria");
        addElement(header, "th", "Valor (R$)");
        tabelaLancamentos.appendChild(header);        
        for(const lancamento of mes.lancamentos){
            const linhaLancamento = document.createElement("tr");
            addElement(linhaLancamento, "td", lancamento.categoria);
            addElement(linhaLancamento, "td", formatarDinheiro(lancamento.valor));
            tabelaLancamentos.appendChild(linhaLancamento);
        } 
        const linhaJuros = document.createElement("tr");
        addElement(linhaJuros, "th", "Juros");
        addElement(linhaJuros, "th", formatarDinheiro(mes.totalizador.juros));
        tabelaLancamentos.appendChild(linhaJuros);
        const linhaRendimentos = document.createElement("tr");
        addElement(linhaRendimentos, "th", "Rendimentos");
        addElement(linhaRendimentos, "th", formatarDinheiro(mes.totalizador.rendimentos));      
        tabelaLancamentos.appendChild(linhaRendimentos); 
        const linhaSaldo = document.createElement("tr");
        addElement(linhaSaldo, "th", "Total");
        addElement(linhaSaldo, "th", formatarDinheiro(mes.totalizador.saldo));
        tabelaLancamentos.appendChild(linhaSaldo);
        painel.appendChild(tabelaLancamentos);
        addElement(painel, "hr");
    }    
    app.appendChild(painel);
}

renderizar();   

function adicionarLancamento(){
    const mesInput = document.getElementById("mes").value;
    const tipoInput = document.getElementById("tipo").value;
    const categoriaInput = document.getElementById("categoria").value;
    const valorInput = document.getElementById("valor").value;
    ano.adicionarLancamento(mesInput, new Lancamento(categoriaInput, tipoInput, parseFloat(valorInput)));
    ano.calcularSaldo();
    renderizar();
    document.getElementById("mes").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("valor").value = "";
}

const botao = document.getElementById("botao");
botao.addEventListener("click", adicionarLancamento);

const mesSelect = document.getElementById("mes");
for (const mes of ano.meses){
    const option = document.createElement("option");
    option.text = mes.nome;
    mesSelect.add(option);
}