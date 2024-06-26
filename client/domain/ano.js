class Ano{
    constructor(){
        this.meses = [];
        this.maiorSaldoDoAno = 0;
    }

    adicionarMes(mes){
        this.meses.push(mes);
    }

    adicionarLancamento(nomeDoMes, lancamento){
        for (const mes of this.meses){
            if (mes.nome === nomeDoMes){
                mes.adicionarLancamento(lancamento);
                break;
            }
        }
    }

    calcularSaldo(){
        let saldoInicial = 0;
        for(const mes of this.meses){
            mes.saldoInicial = saldoInicial;
            mes.calcularSaldo();
            saldoInicial = mes.totalizador.saldo;
        }
    }
    
    maiorSaldo(){
        for (const mes of this.meses){
            if(this.maiorSaldoDoAno < mes.totalizador.saldo){
                this.maiorSaldoDoAno = mes.totalizador.saldo;
            }
        }
    }
}