"use strict";
// document.addEventListener('DOMContentLoaded', startScript)
// function startScript(){
const captchaCode = document.querySelector("#captchaText"),
    captchaVerificated = document.querySelector("#captchaVerification"),
    table = document.querySelector(".formTable"),
    url = 'https://62bf51900bc9b125616baca4.mockapi.io/api/table/PCs',
    inputs = document.querySelectorAll('.inputs input'),
    buttons = document.querySelectorAll("#buttons input");
createInitialTable();

// CAPTCHA

let characteres = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function newCaptcha() {
    for (let i = 0; i < 6; i++) {
        let randomCharacter = characteres[Math.floor(Math.random() * characteres.length)];
        captchaCode.textContent += randomCharacter;
    }
}

function captchaVerification() {
    captchaVerificated.style.visibility = "visible";
    let firstInput = 0;
    while (firstInput < (inputs.length - 1)) {
        if (inputs[firstInput].value == "") {
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo: " + inputs[firstInput].name;
            return false;
        }
        else {
            firstInput++
        }
    }
    if (inputs[firstInput].value != captchaCode.textContent) {
        captchaVerificated.style.color = "rgb(255, 0, 0)";
        captchaVerificated.textContent = "Sos un robot >:("
        return false;
    }
    else if (inputs[firstInput].value == captchaCode.textContent) {
        captchaVerificated.style.color = "rgb(0, 255, 0)";
        captchaVerificated.textContent = "Felicidades!, no sos un robot :D"
        return true;
    }
}

// TABLA Y DATOS

let lastItem;

async function obtainLastItem(){
    try {
        let res = await fetch(url);
        let PC = await res.json();
        if (res.ok) {
            lastItem = PC[PC.length-1].id;
        }
        else
            table.innerHTML = "<h1>Se ha perdido la conexion con el servidor REST</h1>";
    }
    catch (error) {
        table.innerHTML = `<h1>Se ha perdido la conexion con el servidor REST</h1>`;
        console.log(error);
    };
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        switch (e.target.name) {
            case "enviar":
                createItem();
                break;
            case "enviar3":
                create3Items();
                break;
            case "borrarUno":
                deleteElement();
                break;
            case "borrarTodo":
                cleanAllItems();
                break;
        }
    })
});

async function createInitialTable() {
    table.innerHTML = "<h1>Cargando...</h1>";
    try {
        let res = await fetch(url);
        let PC = await res.json();
        if (res.ok) {
            table.innerHTML = "<tr><th>CPU</th><th>Mother</th><th>GPU</th><th>Fuente</th><th>Accion</th></tr>";
            for (let i = 0; i < PC.length; i++) {
                createTable(PC[i]);
            }
            obtainLastItem();
        }
        else
            table.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (error) {
        table.innerHTML = "<h1>Connection error</h1>";
        console.log(error);
    };
}
function createTable(PC) {
    table.innerHTML += "<tr id=" + "item" + PC.id +
        "><td>" + PC.CPU + "</td>" +
        "<td>" + PC.Mother + "</td>" +
        "<td>" + PC.GPU + "</td>" +
        "<td>" + PC.Fuente + "</td>" +
        `<td><input class=buttonTable type=button value=Editar id=editarElemento${PC.id}><input class=buttonTable type=button value=Eliminar id=eliminarElemento${PC.id}></td>` +
        "</tr>";
        document.querySelector(`#editarElemento${PC.id}`).addEventListener('click', ()=>{
            replaceElement(PC.id);
        });
        document.querySelector(`#eliminarElemento${PC.id}`).addEventListener('click', ()=>{
            deleteElement(PC.id);
        });
}

function createItem() {
    let captchaState = captchaVerification();
    if (captchaState == true) {
        let PC = createObject();
        sendElement(PC);
        cleanInputs();
    }
}

function create3Items() {
    let captchaState = captchaVerification();
    if (captchaState == true) {
        let i = 0;
            let PC = createObject();
            setInterval(() => {
                if(i<3){
                    sendElement(PC);
                    i++
                }
            }, 50);
        cleanInputs();
    }
}

function replaceElement(number) {
    let captchaState = captchaVerification();
    if (captchaState == true) {
        let PC = createObject();
        editElement(PC, number);
        cleanInputs();
    }
}

function createObject() {
    let newPC = {
        "CPU": inputs[0].value,
        "Mother": inputs[1].value,
        "GPU": inputs[2].value,
        "Fuente": inputs[3].value,
        "id": (parseInt(lastItem) + 1)
    }
    return newPC;
}

async function sendElement(object) {
    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(object)
        });
        if (res.status == 201) {
            console.log("Nueva PC creada!");
            createTable(object);
            obtainLastItem();
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteElement(number) {
    try {
        let res = await fetch(`${url}/${number}`, {
            "method": "DELETE",
        });
        if (res.status == 200) {
            console.log("Elemento borrado!");
            let row = document.querySelector(`#item${number}`)
            row.remove();
            obtainLastItem();
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function editElement(object, number) {
    try {
        let res = await fetch(`${url}/${number}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(object)
        });
        if (res.status == 200) {
            console.log("Nueva PC modificada!");
            let row = document.querySelector(`#item${number}`);
            row.innerHTML = "<td>" + object.CPU + "</td>" +
                            "<td>" + object.Mother + "</td>" +
                            "<td>" + object.GPU + "</td>" +
                            "<td>" + object.Fuente + "</td>" +
                            `<td><input class=buttonTable type=button value=Editar id=editarElemento${number}>
                                 <input class=buttonTable type=button value=Eliminar id=eliminarElemento${number}>  
                             </td>`;
            document.querySelector(`#editarElemento${number}`).addEventListener('click', ()=>{
                replaceElement(number);
            });
            document.querySelector(`#eliminarElemento${number}`).addEventListener('click', ()=>{
                deleteElement(number);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

function cleanInputs() {
    for (let i = 0; i < (inputs.length - 1); i++) {
        inputs[i].value = ""
    }
}

newCaptcha();
// }
