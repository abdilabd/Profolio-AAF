<<<<<<< HEAD
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

// Fonction pour scroller vers une ancre
function scrollToAnchor(anchorId) {
    const targetSection = document.querySelector(anchorId);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        });
    }
}

// Gère le scroll vers une ancre au chargement de la page
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => scrollToAnchor(hash), 100);
    }
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');

        // Vérifie si c'est une ancre (commence par "#" ou contient "#")
        if (href.startsWith("#") || href.includes("#")) {
            event.preventDefault();
            // Extrait l'ID de l'ancre
            const anchorId = href.substring(href.indexOf("#"));
            scrollToAnchor(anchorId);
        }
        // Sinon, laisser la navigation normale se faire (ex: projets.html)
    });
});

function showStage(index) {
    let contents = document.querySelectorAll(".tab-content");
    let buttons = document.querySelectorAll(".tab-button");

    // Cacher tous les contenus
    contents.forEach(content => content.classList.remove("active"));

    // Désactiver tous les boutons
    buttons.forEach(button => button.classList.remove("active"));

    // Afficher le bon contenu et activer le bouton correspondant
    contents[index].classList.add("active");
    buttons[index].classList.add("active");
}
=======
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

// Fonction pour scroller vers une ancre
function scrollToAnchor(anchorId) {
    const targetSection = document.querySelector(anchorId);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        });
    }
}

// Gère le scroll vers une ancre au chargement de la page
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => scrollToAnchor(hash), 100);
    }
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');

        // Vérifie si c'est une ancre (commence par "#" ou contient "#")
        if (href.startsWith("#") || href.includes("#")) {
            event.preventDefault();
            // Extrait l'ID de l'ancre
            const anchorId = href.substring(href.indexOf("#"));
            scrollToAnchor(anchorId);
        }
        // Sinon, laisser la navigation normale se faire (ex: projets.html)
    });
});

function showStage(index) {
    let contents = document.querySelectorAll(".tab-content");
    let buttons = document.querySelectorAll(".tab-button");

    // Cacher tous les contenus
    contents.forEach(content => content.classList.remove("active"));

    // Désactiver tous les boutons
    buttons.forEach(button => button.classList.remove("active"));

    // Afficher le bon contenu et activer le bouton correspondant
    contents[index].classList.add("active");
    buttons[index].classList.add("active");
}
>>>>>>> 1d19abc (Mise à jour du contenu du dossier)
