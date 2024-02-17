class Select{
    constructor(id, className){
        this.element = document.createElement("select");
        this.element.id = id;
        this.element.className = className;
    }

    adicionarOpcao(text){
        const option = document.createElement("option");
        option.text = text;
        this.element.appendChild(option);
    }
}