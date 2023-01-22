const form = document.querySelector("form");
const email = "pedrohcb21@gamil.com";
const senha = "66708";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let InputEmail = form.querySelector("#email").value;
    let inputPass = form.querySelector("#pass").value;

    if (valida(InputEmail)
    && valida(inputPass)) {
        if (InputEmail === "pedrohcb21@gmail.com"
        && inputPass === "66708") {
            sessionStorage.setItem("logado", JSON.stringify(true));
            window.location = "index.html";
        } else {
            sessionStorage.setItem("logado", JSON.stringify(false));
            alert(`Usuário ou senha incorretos!`);
        };
    };

});

const valida = function (campo) {
    if (campo === "") {
        alert("Preencha todos os campos");
        return false;
    } else {
        return true;
    };
};