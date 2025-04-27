const Connection = require("./server/connection");
const HttpServer = require("./server/http-server");
const LancamentoData = require("./server/lancamento-data");
const LancamentoController = require("./server/lancamento-controller");

const connection = new Connection();
const lancamentoData = new LancamentoData(connection);
const httpServer = new HttpServer(); 
new LancamentoController(httpServer, lancamentoData);
httpServer.listen(3000);
