const express = require("express");
const pgp = require("pg-promise");
const app = express();
app.use(express.json());
app.use("/app", express.static("./client"));

const connection = pgp()("postgres://postgres:yPKu&,w=i}'K03v2CJz%@localhost:5432/postgres");

app.get("/api/lancamentos", async function (req, res){
    const lancamentos = await connection.query("SELECT * FROM financas_pessoais.lancamento", []);
    res.json(lancamentos);
});

app.post("/api/lancamentos", async function (req, res){
    const lancamento = req.body;
    console.log(lancamento);
    //lancamentos.push(lancamento);
    await connection.query("INSERT into financas_pessoais.lancamento (mes, categoria, tipo, valor) VALUES ($1, $2, $3, $4)", [lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor]);
    res.end();
})

app.listen(3000);
