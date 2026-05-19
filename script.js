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
    "Developpeur SIG",
    "Cartographe",
    "Analyste de données spatiales"
]
let speed = 100;
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

// ─── Animations section Compétences ───────────────────────────────────────────

// Entrée en cascade : chaque carte glisse vers le haut avec un délai
function animateCompetences() {
    const cards = document.querySelectorAll('.competence');
    cards.forEach(function(card, i) {
        card.style.transition = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        setTimeout(function() {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 60 + i * 90);
    });
}

// Effet tilt 3D au survol (gyroscope de la souris)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.competence').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -7;
            const rotY = ((x - cx) / cx) * 7;
            this.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
            this.style.transform = 'perspective(700px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.04)';
            this.style.boxShadow = (-rotY * 1.5) + 'px ' + (rotX * 1.5) + 'px 28px rgba(0,170,85,0.45)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

// ─── Navigation par sections — sans scroll libre ──────────────────────────────

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(function(s) {
        s.classList.remove('active');
    });
    const target = document.querySelector(sectionId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
        history.pushState(null, '', sectionId);
        if (sectionId === '#competences') animateCompetences();
    }
}

// Initialisation au chargement
window.addEventListener('load', function() {
    const hash = window.location.hash;
    const start = (hash && document.querySelector(hash)) ? hash : '#home';
    showSection(start);
});

// Clics sur les liens de navigation
document.querySelectorAll('nav a').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (href && href.startsWith("#")) {
            event.preventDefault();
            const dropdown = document.querySelector(".dropdown");
            if (dropdown) dropdown.style.transform = "translateY(-500px)";
            showSection(href);
        }
    });
});
