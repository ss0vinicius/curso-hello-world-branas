class Mes{
    constructor(nome){
        if (nome ==="") throw new Error("Mês Inválido: O nome é obrigatório.");
        this.nome = nome;
        this.saldoInicial = 0;
        this.totalizador = {saldo: 0, receitas: 0, despesas: 0,  rendimentos: 0, juros: 0, distribuicaoDeReceitas:[], distribuicaoDeDespesas:[]};
        this.lancamentos = [];
    }

    adicionarLancamento(lancamento){
        this.lancamentos.push(lancamento);
    }

    calcularSaldo () {
        console.log(this.nome);
        this.totalizador = {saldo: 0, receitas: 0, despesas: 0,  rendimentos: 0, juros: 0, distribuicaoDeReceitas:[], distribuicaoDeDespesas:[]};
        this.totalizador.saldo = this.saldoInicial;
        this.apurarReceitas();
        this.apurarDespesas();          
        this.apurarJuros();
        this.apurarRendimentos();        
        this.mostrarInformacoes();        
    }    

    mostrarInformacoes(){
        console.log("Tipo     | Categoria   | proporção no total do mês");
        this.distribuirReceitas();
        this.distribuirDespesas();
        console.log("Receitas R$", this.totalizador.receitas, this.totalizador.distribuicaoDeReceitas);
        console.log("Despesas R$", this.totalizador.despesas, this.totalizador.distribuicaoDeDespesas);	
        console.log(this.totalizador);
        console.log("");
    }

    apurarReceitas(){
        console.log(this.lancamentos)
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "receita") {
                this.totalizador.saldo += lancamento.valor;
                this.totalizador.receitas += lancamento.valor;
            }
        }  
    }

    distribuirReceitas(){
        for (const lancamento of this.lancamentos){
            if (lancamento.tipo === "receita"){
                const proporcaoReceita = arredondar((lancamento.valor/this.totalizador.receitas)*100);
                console.log(lancamento.tipo,"  ", lancamento.categoria,"              ", proporcaoReceita,"%");
                this.totalizador.distribuicaoDeReceitas.push({categoria: lancamento.categoria, valor: lancamento.valor, proporcao: proporcaoReceita});
            }
        }
    }

    apurarRendimentos(){
        const estaPositivo = this.totalizador.saldo >= 0;
        if(estaPositivo) {
            this.calcularRendimentos();
            this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
        }
    }

    calcularRendimentos () {
        this.totalizador.rendimentos = arredondar(this.totalizador.saldo * 0.005);
    }

    apurarDespesas(){
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "despesa") {
                this.totalizador.saldo -= lancamento.valor;
                this.totalizador.despesas += lancamento.valor;
            }
        }  
    }

    distribuirDespesas(){
        for (const lancamento of this.lancamentos){
            if (lancamento.tipo === "despesa"){
                const proporcaoDespesa = arredondar((lancamento.valor/this.totalizador.despesas)*100);
                console.log(lancamento.tipo,"  ", lancamento.categoria,"              ", proporcaoDespesa,"%");
                this.totalizador.distribuicaoDeDespesas.push({categoria: lancamento.categoria, valor: lancamento.valor, proporcao: proporcaoDespesa});
            }
        }
    }

    apurarJuros(){
        const estaNegativo = this.totalizador.saldo < 0;
        if (estaNegativo) {
            this.calcularJuros();
            this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.juros);
        } 
    }

    calcularJuros () {
        this.totalizador.juros = arredondar(this.totalizador.saldo * 0.1);
    }
}