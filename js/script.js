// Login
let logado = "";
function login () {
    logado = JSON.parse(sessionStorage.getItem("logado")) || false;
    if (logado === false) {
        window.location = "login.html";
    }
};
login();

//Declarações de variáveis globais
const form = document.querySelector("form");
const btnLogout = document.querySelector("#btnLogout");
let lista = obterLocalStorage();
let filtro = document.querySelector("#filtro");
let ul = document.querySelector("#todo-list");

//Declarações de eventos
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let listaObj = obterInfo();

    if (listaObj != false) {
        let inserido = inserirLista(listaObj);
        if (inserido != false) {
            ul.innerHTML = "";
            atualizarDom();

            form.reset();
        };
    };
});

filtro.addEventListener("change", (e) => {
    let filtrado = e.target.value;
    ul.innerHTML = "";
    
    lista.forEach((i) => {
        if (i.status === filtrado ) {
            addDom(i);
        } else if (filtrado === "all") {
            addDom(i);
        };
    });
});

btnLogout.addEventListener("click", () => {
    window.location = "login.html";
    logado = false;
});

//Declarações de funções
const obterInfo = function () {
    let atividade = document.querySelector("#todo-input").value;

    if (valida(atividade) != false) {
        let listaObj = {
            "atividade": atividade,
            "status": "uncompleted"
        };

        return listaObj;
    } else {
        return false;
    };
};


const valida = function (campo) {
    if (campo === "") {
        alert("Preencha todos os campos");
        return false;
    } else {
        return true;
    };
};

const iguais = function (e1, e2) {
    return e1.atividade === e2.atividade;
};

const inserirLista = function (listaObj) {
    let filtrados = lista.filter((i) => {
        if (iguais(i, listaObj)) {
            alert("Atividade já inserida");
            return i
        };
    });

    if (filtrados.length === 0) {
        lista.push(listaObj);

        salvarLocalStorage();

        return true;
    };
    return false;
};

const addDom = function (listaObj) {
    let iExcluir = document.createElement("i");
    iExcluir.className = "fas fa-trash";
    iExcluir.ariaHidden = "true";

    let btnExcluir = document.createElement("button");
    btnExcluir.className = "trash-btn";
    btnExcluir.appendChild(iExcluir);

    let iConfirm = document.createElement("i");
    iConfirm.className = "fas fa-check";
    iConfirm.ariaHidden = "true";

    let btnConfirm = document.createElement("button");
    btnConfirm.className = "check-btn";
    btnConfirm.appendChild(iConfirm);

    let li = document.createElement("li");
    li.innerHTML = `${listaObj.atividade}`;
    li.className = "todo-item";

    let div = document.createElement("div");
    div.className = "todo";
    div.appendChild(li);
    div.appendChild(btnConfirm);
    div.appendChild(btnExcluir);

    ul.className = "todo-list";
    ul.appendChild(div);

    btnExcluir.addEventListener("click", (e) => {
        excluirDom(e, ul, listaObj);

        removerLista(lista, listaObj);
    });

    btnConfirm.addEventListener("click", (e) => {
        listaObj.status = "completed";
        salvarLocalStorage();
    });
};

const excluirDom = function (e, ul, listaObj) {
    let clickExcluir = e.target;
    let excluir = clickExcluir.parentNode;
    ul.removeChild(excluir);
};

const removerLista = function (lista, listaObj) {
    let index = lista.findIndex((i) => {
        return iguais(i, listaObj);
    });

    lista.splice(index, 1);

    salvarLocalStorage();
};

function salvarLocalStorage() {
    localStorage.setItem("listaObj", JSON.stringify(lista));
};

function obterLocalStorage() {
    let atividadeLS = JSON.parse(localStorage.getItem("listaObj")) || [];
    return atividadeLS;
};

function atualizarDom() {
    lista.forEach((e) => {
        addDom(e);
    });
};
atualizarDom();
