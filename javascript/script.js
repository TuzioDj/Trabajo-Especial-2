// NAVBAR RESPONSIVE

document.querySelector(".navbarMenu").addEventListener('click', displayMenu);

function displayMenu(){
    document.querySelector(".navbarButtons").classList.toggle("navbarButtonsAfter");
    let navbarLink = document.querySelectorAll("nav ul li");

    for (let i = 0; i < navbarLink.length; i++) {
        navbarLink[i].classList.toggle("liAfter");
    }

}

// CAPTCHA

    let captchaCode = document.querySelector("#captchaText"),
    captchaInsert = document.querySelector("#captchaInsert"),
    captchaBtn = document.querySelector("#enviar"),
    captchaVerificated = document.querySelector("#captchaVerification"),
    cpuInsert = document.querySelector("#CPU"),
    motherInsert = document.querySelector("#Mother"),
    gpuInsert = document.querySelector("#GPU"),
    powersupplyInsert = document.querySelector("#PowerSupply"),
    captchaInserted = captchaInsert.value;

    let characteres =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                        't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    function newCaptcha(){
        for (let i = 0; i < 6; i++) {
            let randomCharacter = characteres[Math.floor(Math.random() * characteres.length)];
            captchaCode.textContent += randomCharacter;
        }
    }
    function captchaVerification(){
        captchaVerificated.style.visibility = "visible";
        if (cpuInsert.value == "") {
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo del CPU"
            return false;
        }
        else if (motherInsert.value == "") {
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo de la Motherboard"
            return false;
        }
        else if (gpuInsert.value == "") {
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo de la GPU"
            return false;
        }
        else if (powersupplyInsert.value == "") {
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo de la Fuente de poder"
            return false;
        }
        else if(captchaInsert.value != captchaCode.textContent){
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Sos un robot >:("
            return false;
        }
        else if(captchaInsert.value == captchaCode.textContent){
            captchaVerificated.style.color = "rgb(0, 255, 0)";
            captchaVerificated.textContent = "Felicidades!, no sos un robot :D"
            return true;
        }
    }

// TABLA Y DATOS
    
    table = document.querySelector(".formTable"),
    enviar3 = document.querySelector("#enviar3"),
    borrarUno = document.querySelector("#borrarUno");
    borrarTodo = document.querySelector("#borrarTodo");

    captchaBtn.addEventListener('click',createItem);
    enviar3.addEventListener('click', create3Items);
    borrarUno.addEventListener('click',cleanItem);
    borrarTodo.addEventListener('click',cleanAllItems);

    let PC = [];
    function sendInfoAndCreateTable(){
        let newPC ={
            "CPU": cpuInsert.value,
            "Mother": motherInsert.value,
            "GPU": gpuInsert.value,
            "Fuente": powersupplyInsert.value
        }
        PC.push(newPC);
        table.innerHTML +=  "<tr id=" + "item" + PC.length + 
                                "><td>" + newPC.CPU + "</td>" + 
                                "<td>" + newPC.Mother + "</td>" + 
                                "<td>" + newPC.GPU + "</td>" + 
                                "<td>" + newPC.Fuente + "</td>" +
                            "</tr>";
    }
    function createItem(){
        captchaState = captchaVerification();
        if(captchaState == true){
            sendInfoAndCreateTable();
            cleanInputs();
        }
    }
    function create3Items(){
        captchaState = captchaVerification();
        if(captchaState == true){
            for (let i = 0; i < 3; i++) {
                sendInfoAndCreateTable()  
            }
            cleanInputs();
        }
    }
    function cleanAllItems(){
        while(PC.length > 0){
            cleanItem();
        }
    }
    function cleanItem(){
        let lastItem = document.querySelector("#item" + PC.length)
        if(PC.length > 0){
            lastItem.remove();
            PC.splice(PC.length-1)
        }
    }
    function cleanInputs(){
        motherInsert.value="";
        cpuInsert.value="";
        gpuInsert.value="";
        powersupplyInsert.value="";
    }
    newCaptcha();
