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