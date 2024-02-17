class Span{
    constructor(className){
        this.element = document.createElement("span");
        this.element.className = className;
    }
    adicionarCor(value){
        if(typeof(value)==="object"){
            const valor = parseFloat(value.getValorString());
            (valor < 0) ? this.element.style.color = "red" : this.element.style.color = "green";  
            this.element.innerText = this.formatarDinheiro(value.getValorString());
        }
        else{
            const valor = parseFloat(value);
            (valor < 0) ? this.element.style.color = "red" : this.element.style.color = "green";  
            this.element.innerText = this.formatarDinheiro(value);
        }
    }
    
    formatarDinheiro(valor){
        return new Intl.NumberFormat("pt-br", {currency: "BRL", style: "currency"}).format(valor);
    }
}    