let slides = {
    cartographie: ["images/image0.png"],
    sig: ["images/image24.png","images/image25.png","images/image7.png", "images/image23.png", "images/image36.png","images/Image1.png"],
    amenagement:["images/image30.png","images/image31.png","images/image32.png","images/image27.png"],
    amenagement1:["images/image33.png","images/image34.png","images/image5.png","images/image35.png"]
};

let slideIndex = { cartographie: 0, sig: 0, amenagement: 0, amenagement1 :0 };

// Masquer tous les projets au début
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".projet-content").forEach(el => el.style.display = "none");
});
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".projet-content").forEach(el => el.style.display = "none");
    document.getElementById("projet1").style.display = "block"; // ✅ Afficher le premier projet par défaut
});

function showProject(num) {
    // Masquer tous les projets
    document.querySelectorAll(".projet-content").forEach(el => {
        el.style.display = "none";

        // Arrêter la vidéo en arrière-plan
        let video = el.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0; // Remet la vidéo au début
        }
    });

    // Afficher le projet sélectionné
    document.getElementById(`projet${num}`).style.display = "block";
}

function changeSlide(n, category) {
    slideIndex[category] = (slideIndex[category] + n + slides[category].length) % slides[category].length;
    document.getElementById(`${category}-img`).src = slides[category][slideIndex[category]];
}

// ✅ Fonction pour agrandir l'image au clic
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".slider-container img").forEach(img => {
        img.addEventListener("click", function() {
            let modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100vw";
            modal.style.height = "100vh";
            modal.style.background = "rgba(0, 0, 0, 0.8)";
            modal.style.display = "flex";
            modal.style.alignItems = "center";
            modal.style.justifyContent = "center";
            modal.style.zIndex = "1000";
            
            let imgClone = document.createElement("img");
            imgClone.src = this.src;
            imgClone.style.maxWidth = "90%";
            imgClone.style.maxHeight = "90%";
            imgClone.style.borderRadius = "10px";

            modal.appendChild(imgClone);
            document.body.appendChild(modal);

            // Fermer en cliquant sur l'image
            modal.addEventListener("click", function() {
                modal.remove();
            });
        });
    });
});
