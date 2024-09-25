
function askForName() {
    let userName;

    while (true) {
        userName = prompt("Por favor, ingresa tu nombre (mínimo 3 letras):");

        if (userName === null) {
           
            return;
        } else if (userName.trim() === "") {
            alert("Debes completar tu nombre.");
        } else if (userName.length < 3) {
            alert("El nombre debe tener al menos 3 letras.");
        } else {
            break; 
        }
    }

    document.getElementById("welcome").textContent = `Hola, ${userName.toUpperCase()}`;
    

    document.getElementById("ticket-icon").style.display = "inline";
}


askForName();
