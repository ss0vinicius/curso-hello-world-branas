const express = require("express");
const app = express();
app.use(express.json());
app.use("/app", express.static("./client"));

const lancamentos = [
    {mes: "janeiro", categoria: "Salário", tipo: "receita", valor: 8000},
    {mes: "janeiro", categoria: "Aluguel", tipo: "despesa", valor: 1000},
    {mes: "janeiro", categoria: "Luz", tipo: "despesa", valor: 200},
    {mes: "janeiro", categoria: "Água", tipo: "despesa", valor: 100},
    {mes: "janeiro", categoria: "Internet",  tipo: "despesa", valor: 100},
    {mes: "janeiro", categoria: "Transporte",  tipo: "despesa", valor: 300},
    {mes: "janeiro", categoria: "Lazer",  tipo: "despesa", valor: 300},
    {mes: "janeiro", categoria: "Alimentação", tipo: "despesa", valor: 500},
    {mes: "janeiro", categoria: "Condomínio", tipo: "despesa", valor: 300},
    {mes: "janeiro", categoria: "Farmácia",  tipo: "despesa", valor: 100},
    {mes: "janeiro", categoria: "Escola", tipo: "despesa", valor:500},
    {mes: "fevereiro", categoria: "Salário",  tipo: "receita", valor: 8000},
    {mes: "fevereiro", categoria: "Aluguel", tipo: "despesa", valor: 120},
    {mes: "fevereiro", categoria: "Luz", tipo: "despesa", valor: 250},
    {mes: "fevereiro", categoria: "Água", tipo: "despesa", valor: 100},
    {mes: "fevereiro", categoria: "Internet", tipo: "despesa", valor: 100},
    {mes: "fevereiro", categoria: "Transporte", tipo: "despesa", valor: 500},
    {mes: "fevereiro", categoria: "Alimentação", tipo: "despesa", valor: 100},
    {mes: "fevereiro", categoria: "Condomínio", tipo: "despesa", valor: 400},
    {mes: "marco", categoria: "Salário", tipo: "receita", valor: 6000}, 
    {mes: "marco", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    {mes: "marco", categoria: "Luz", tipo: "despesa", valor: 200},
    {mes: "marco", categoria: "Água", tipo: "despesa", valor: 100}, 
    {mes: "marco", categoria: "Internet", tipo: "despesa", valor: 200}, 
    {mes: "marco", categoria: "Transporte", tipo: "despesa", valor: 500}, 
    {mes: "marco", categoria: "Lazer", tipo: "despesa", valor: 800},
    {mes: "marco", categoria: "Alimentação", tipo: "despesa", valor: 1000}, 
    {mes: "marco", categoria: "Condomínio", tipo: "despesa", valor: 400},
    {mes: "marco", categoria: "Renda Extra", tipo: "receita", valor: 2000}, 
    {mes: "marco", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    {mes: "abril", categoria: "Salário", tipo: "receita", valor: 6000}, 
    {mes: "abril", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    {mes: "abril", categoria: "Luz", tipo: "despesa", valor: 200}
];

app.get("/api/lancamentos", function (req, res){
    res.json(lancamentos);
});

app.post("/api/lancamentos", function (req, res){
    const lancamento = req.body;
    lancamentos.push(lancamento);
    res.end();
})

app.listen(3000);
