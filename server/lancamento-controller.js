const express = require("express");

class LancamentoController{
    constructor(httpServer, lancamentoData){
        
        httpServer.register("get","/api/lancamentos", async function (params, body){
            const lancamentos = await lancamentoData.getLancamentos();
            return lancamentos;
        });
    
        httpServer.register("post", "/api/lancamentos", async function (params, body){
            const lancamento = body;
            await lancamentoData.saveLancamento(lancamento);
        });
    }    
}

module.exports = LancamentoController;