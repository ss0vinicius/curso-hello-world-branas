const saldoInicial = 0;
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

const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
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
    for (const mes of ano.meses){
        addElement(painel, "h3", mes.nome);
        for(const lancamento of mes.lancamentos){
            const detalhesLancamento = lancamento.tipo + " " + lancamento.categoria + " " + lancamento.valor;
            addElement(painel, "p", detalhesLancamento);   
        }
        addElement(painel, "h4", "Saldo: R$ " + mes.totalizador.saldo);
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