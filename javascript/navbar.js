// NAVBAR RESPONSIVE
document.addEventListener('DOMContentLoaded', displayNavbar)
function displayNavbar(){
    document.querySelector(".navbarMenu").addEventListener('click', e => {
        document.querySelector(".navbarButtons").classList.toggle("navbarButtonsAfter");
        let navbarLink = document.querySelectorAll("nav ul li");
    
        for (let i = 0; i < navbarLink.length; i++) {
            navbarLink[i].classList.toggle("liAfter");
        }
    });
}
