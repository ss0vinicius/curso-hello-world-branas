class Table{
    constructor(className){
        this.element = document.createElement("table");
        this.element.className = className;
    }

    addRow(type, values){
        const tr = document.createElement("tr");
        for (const value of values){
            const td = document.createElement(type);
            (typeof(value)==="string") ? td.innerText = value : td.appendChild(value);
            tr.appendChild(td);
        }
        this.element.appendChild(tr);
    }
}
