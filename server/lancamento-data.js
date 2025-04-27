class LancamentoData{
    constructor(connection){
        this.connection = connection;
    }

    async getLancamentos(){
        const lancamentos = await this.connection.query("SELECT * FROM financas_pessoais.lancamento", []);
        return lancamentos;
    }

    async saveLancamento(lancamento){
        await this.connection.query("INSERT into financas_pessoais.lancamento (mes, categoria, tipo, valor) VALUES ($1, $2, $3, $4)", [lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor]);
    }
}

module.exports = LancamentoData;