class Mes{
    constructor(nome){
        if (nome ==="") throw new Error("Mês Inválido: O nome é obrigatório.");
        this.nome = nome;
        this.saldoInicial = 0;
        this.totalizador = {saldo: 0, receitas: 0, despesas: 0,  rendimentos: 0, juros: 0, distribuicaoDeReceitas:[], distribuicaoDeDespesas:[]};
        this.lancamentos = [];
    }

    arredondar (valor) {
        const valorArredondado = Math.round(valor*100)/100;
        return valorArredondado;
    }

    adicionarLancamento(lancamento){
        this.lancamentos.push(lancamento);
    }

    calcularSaldo () {
        this.totalizador = {saldo: 0, receitas: 0, despesas: 0,  rendimentos: 0, juros: 0, distribuicaoDeReceitas:[], distribuicaoDeDespesas:[]};
        this.totalizador.saldo = this.saldoInicial;
        this.apurarReceitas();
        this.apurarDespesas();          
        this.apurarJuros();
        this.apurarRendimentos();        
        this.mostrarInformacoes();        
    }    

    mostrarInformacoes(){
        this.distribuirReceitas();
        this.distribuirDespesas();
    }

    apurarReceitas(){
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
                const proporcaoReceita = this.arredondar((lancamento.valor/this.totalizador.receitas)*100);
                this.totalizador.distribuicaoDeReceitas.push({categoria: lancamento.categoria, valor: lancamento.valor, proporcao: proporcaoReceita});
            }
        }
    }

    apurarRendimentos(){
        const estaPositivo = this.totalizador.saldo >= 0;
        if(estaPositivo) {
            this.calcularRendimentos();
            this.totalizador.saldo = this.arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
        }
    }

    calcularRendimentos () {
        const porcentagemRendimento = (0.5/100);
        this.totalizador.rendimentos = this.arredondar(this.totalizador.saldo * porcentagemRendimento);
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
                const proporcaoDespesa = this.arredondar((lancamento.valor/this.totalizador.despesas)*100);
                this.totalizador.distribuicaoDeDespesas.push({categoria: lancamento.categoria, valor: lancamento.valor, proporcao: proporcaoDespesa});
            }
        }
    }

    apurarJuros(){
        const estaNegativo = this.totalizador.saldo < 0;
        if (estaNegativo) {
            this.calcularJuros();
            this.totalizador.saldo = this.arredondar(this.totalizador.saldo + this.totalizador.juros);
        } 
    }

    calcularJuros () {
        const porcentagemJuros = (10/100);
        this.totalizador.juros = this.arredondar(this.totalizador.saldo * porcentagemJuros);
    }
}