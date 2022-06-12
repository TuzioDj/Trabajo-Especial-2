// CAPTCHA
document.addEventListener('DOMContentLoaded', startScript)
function startScript(){

    let captchaCode = document.querySelector("#captchaText"),
    captchaVerificated = document.querySelector("#captchaVerification");

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
        let firstInput = 0;
        while(firstInput < (inputs.length - 1)){
            if(inputs[firstInput].value == ""){
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Primero llená el campo: " + inputs[firstInput].name;
            return false;
            }
            else{
                firstInput++
            }
        }
        if(inputs[firstInput].value != captchaCode.textContent){
            captchaVerificated.style.color = "rgb(255, 0, 0)";
            captchaVerificated.textContent = "Sos un robot >:("
            return false;
        }
        else if(inputs[firstInput].value == captchaCode.textContent){
            captchaVerificated.style.color = "rgb(0, 255, 0)";
            captchaVerificated.textContent = "Felicidades!, no sos un robot :D"
            return true;
        }
    }

// TABLA Y DATOS
    
    let PC = [],
    table = document.querySelector(".formTable"),
    inputs = document.querySelectorAll('.inputs input'),
    buttons = document.querySelectorAll("#buttons input");

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            switch(e.target.name){
                case "enviar":
                    createItem();
                    break;
                case "enviar3":
                    create3Items();
                    break;
                case "borrarUno":
                    cleanItem();
                    break;
                case "borrarTodo":
                    cleanAllItems();
                    break;
            }
        })
    });
               


    function sendInfoAndCreateTable(){
        let newPC ={
            "CPU": inputs[0].value,
            "Mother": inputs[1].value,
            "GPU": inputs[2].value,
            "Fuente": inputs[3].value
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
        for (let i = 0; i < (inputs.length - 1); i++) {
            inputs[i].value = ""
        }
    }
    
    newCaptcha();
}
