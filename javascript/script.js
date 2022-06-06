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

    // let captchaCode = document.querySelector("#captchaText"),
    // captchaInsert = document.querySelector("#captchaInsert"),
    // captchaBtn = document.querySelector (".formButton"),
    // captchaVerificated = document.querySelector("#captchaVerification");
    // cpuInsert = document.querySelector("#CPU")
    // motherInsert = document.querySelector("#Mother")
    // gpuInsert = document.querySelector("#GPU")
    // powersupplyInsert = document.querySelector("#PowerSupply")

    // let characteres =  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    //                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    //                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    //                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // function newCaptcha(){
    //     for (let i = 0; i < 6; i++) {
    //         let randomCharacter = characteres[Math.floor(Math.random() * characteres.length)];
    //         captchaCode.textContent += randomCharacter;
    //     }
    // }
    // captchaBtn.addEventListener("click", e=>{
    //     e.preventDefault()
    //     captchaVerificated.style.display = "block";
    //     let captchaInserted = captchaInsert.value;
    //     if (cpuInsert.value == "") {
    //         captchaVerificated.style.color = "rgb(255, 0, 0)";
    //         captchaVerificated.textContent = "Primero llená el campo del CPU"
    //     }
    //     else if (motherInsert.value == "") {
    //         captchaVerificated.style.color = "rgb(255, 0, 0)";
    //         captchaVerificated.textContent = "Primero llená el campo de la Motherboard"
    //     }
    //     else if (gpuInsert.value == "") {
    //         captchaVerificated.style.color = "rgb(255, 0, 0)";
    //         captchaVerificated.textContent = "Primero llená el campo de la GPU"
    //     }
    //     else if (powersupplyInsert.value == "") {
    //         captchaVerificated.style.color = "rgb(255, 0, 0)";
    //         captchaVerificated.textContent = "Primero llená el campo de la Fuente de poder"
    //     }
    //     else if(captchaInserted == captchaCode.textContent){
    //         captchaVerificated.style.color = "rgb(0, 255, 0)";
    //         captchaVerificated.textContent = "Felicidades!, no sos un robot :D"
    //     }
    //     else{
    //         captchaVerificated.style.color = "rgb(255, 0, 0)";
    //         captchaVerificated.textContent = "Sos un robot >:("
    //     }
    // })

    // newCaptcha()