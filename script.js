function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}
// Typewriter Effect
const texts = [
    "Géomaticien",
    "Developpeur SIG-WEB",
    "Cartographe",
    "Analyste de données spatiales"
]
let speed  =100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;
function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}
function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}
window.onload = typeWriter
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Décalage de 50px pour ne pas coller au haut de l'écran
                behavior: "smooth"
            });
        }
    });
});
const projects = [
    {
        title: "Projet SIG Urbain",
        description: "Analyse de l'urbanisation d'une ville à l'aide des SIG.",
        image: "images/projet1.jpg" // Chemin relatif
    },
    {
        title: "Cartographie 3D",
        description: "Création de modèles 3D pour l'analyse spatiale.",
        image: "images/projet2.jpg" // Chemin relatif
    },
    {
        title: "Analyse de Données SIG",
        description: "Exploration des tendances spatiales à travers la data science.",
        image: "images/projet3.jpg" // Chemin relatif
    },
    {
        title: "Web Mapping",
        description: "Développement de cartes interactives en ligne.",
        image: "images/projet4.jpg" // Chemin corrigé
    },
    {
        title: "Base de Données Géospatiales",
        description: "Stockage et gestion de données spatiales.",
        image: "images/projet5.jpg" // Chemin relatif
    },
    {
        title: "Télédétection et Occupation des Sols",
        description: "Analyse d'images satellites pour l'occupation des sols.",
        image: "images/projet6.jpg" // Chemin relatif
    },
    {
        title: "Application Mobile SIG",
        description: "Développement d'une application mobile SIG.",
        image: "images/projet7.jpg" // Chemin relatif
    },
    {
        title: "Géo-visualisation Interactive",
        description: "Exploration de données géospatiales avec des outils avancés.",
        image: "images/projet8.jpg" // Chemin relatif
    },
    {
        title: "Détection de Changements SIG",
        description: "Analyse temporelle des modifications du territoire.",
        image: "images/projet9.jpg" // Chemin relatif
    },
    {
        title: "OpenStreetMap Contributions",
        description: "Ajout et correction de données dans OSM.",
        image: "images/projet10.jpg" // Chemin relatif
    }
];

function showProject(index) {
    const projectDetail = document.querySelector(".projet-detail");
    const projectImage = document.getElementById("pimage");

    const project = projects[index - 1];

    console.log("🔍 Affichage du projet :", project.title, "| Image:", project.image);

    // Mise à jour des détails du projet
    projectDetail.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;

    // Charger l'image
    projectImage.src = project.image;
    projectImage.alt = project.title;
    projectImage.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM chargé !");
    showProject(1); // Charger le premier projet après que le DOM soit prêt
});
