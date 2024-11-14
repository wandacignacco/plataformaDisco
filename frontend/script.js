let bg = document.getElementById('bg')
let sidebar = document.getElementById('sidebar')
let ham = document.getElementById('ham')

ham.onclick = () => {
    bg.style.display = "block";
    sidebar.style.right = "0";
    
};

bg.onclick = () => {
    bg.style.display = "none";
    sidebar.style.right = "-100%";

};

/* icono interactivo */ 
function toggleLike(element) {
    if (element.textContent === '🖤') {
        element.textContent = '💖'; // Cambia a corazón rosado
        element.classList.add('liked');
    } else {
        element.textContent = '🖤'; // Vuelve al corazón negro
        element.classList.remove('liked');
    }
}

    async function getUser(){
        try{
                const response = await axios.get("http://localhost:3000/user/6735289f3c1f73bf2f4beca2")
                console.log(response);
        }catch(error){
            console.log(error)
        }
    }

    async function getAlbum(){
        try{
                const response = await axios.get("http://localhost:3000/album/6734f7034fa2fb50145df2f0")
                console.log(response);
        }catch(error){
            console.log(error)
        }
    }
