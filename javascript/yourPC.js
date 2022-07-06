"use strict";
document.addEventListener('DOMContentLoaded', startScript)
function startScript(){
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
            if(PC.length == 0){
                lastItem = 0
            }
            else{
                lastItem = PC[PC.length-1].id;
            }
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
    let editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "Editar";
    editButton.classList= "buttonTable";
    
    let deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Eliminar";
    deleteButton.classList= "buttonTable";
    
    let newRow = table.insertRow(-1);
    newRow.id = `item${PC.id}`
    
    let newCell = newRow.insertCell(0);
    newCell.textContent = PC.CPU;
    newCell = newRow.insertCell(1);
    newCell.textContent = PC.Mother;
    newCell = newRow.insertCell(2);
    newCell.textContent = PC.GPU;
    newCell = newRow.insertCell(3);
    newCell.textContent = PC.Fuente;
    
    let actionCell = newRow.insertCell(4);
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    editButton.addEventListener('click', ()=>{
        replaceElement(PC.id);
    });
    deleteButton.addEventListener('click', ()=>{
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
function replaceElement(id) {
    let captchaState = captchaVerification();
    if (captchaState == true) {
        let PC = createObject();
        editElement(PC, id);
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
        console.log(object.id);
        if (res.status == 201) {
            console.log("Nueva PC creada!");
            createTable(object);
            lastItem++;
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
async function editElement(object, id) {
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(object)
        });
        if (res.status == 200) {
            console.log("Nueva PC modificada!");
            let row = document.querySelector(`#item${id}`);
            row.innerHTML =`<td> ${object.CPU} </td>
                            <td> ${object.Mother} </td>
                            <td> ${object.GPU} </td>
                            <td> ${object.Fuente} </td>
                            <td>
                                <input class=buttonTable type=button value=Editar id=editarElemento${id}>
                                <input class=buttonTable type=button value=Eliminar id=eliminarElemento${id}>  
                            </td>`;
            document.querySelector(`#editarElemento${id}`).addEventListener('click', ()=>{
                replaceElement(id);
            });
            document.querySelector(`#eliminarElemento${id}`).addEventListener('click', ()=>{
                deleteElement(id);
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
}
