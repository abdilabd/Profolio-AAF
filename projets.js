<<<<<<< HEAD
let slides = {
    cartographie: ["images/image0.png"],
    sig: ["images/image24.png","images/image25.png","images/image7.png", "images/image23.png", "images/image36.png","images/Image1.png"],
    amenagement:["images/image30.png","images/image31.png","images/image32.png","images/image27.png"],
    amenagement1:["images/image33.png","images/image34.png","images/image5.png","images/image35.png"],
    arc:["images/N2.gif","images/N1.jpg","images/Image2.png","images/Image3.png","images/Image4.png","images/image12.png","images/image9.png","images/image11.png","images/image6.png","images/image21.jpg","images/image29.jpg"],
    bss:["images/image16.png","images/image37.png","images/image38.png","images/image18.png","images/image15.png"],
    espt1:["images/image14.png","images/image13.png","images/image39.png","images/Image40.png"]
};

let slideIndex = { cartographie: 0, sig: 0, amenagement: 0, amenagement1 :0, arc :0, bss: 0, espt1 : 0 };

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
=======
let slides = {
    cartographie: ["images/image0.png"],
    sig: ["images/image24.png","images/image25.png","images/image7.png", "images/image23.png", "images/image36.png","images/Image1.png"],
    amenagement:["images/image30.png","images/image31.png","images/image32.png","images/image27.png"],
    amenagement1:["images/image33.png","images/image34.png","images/image5.png","images/image35.png"],
    arc:["images/N3.jpg","images/N2.gif","images/N1.jpg","images/Image2.png","images/Image3.png","images/Image4.png","images/image12.png","images/image9.png","images/image11.png","images/image6.png","images/image21.jpg","images/image29.jpg"],
    bss:["images/image16.png","images/image37.png","images/image38.png","images/image18.png","images/image15.png"],
    espt1:["images/image14.png","images/image13.png","images/image39.png","images/Image40.png"]
};

let slideIndex = { cartographie: 0, sig: 0, amenagement: 0, amenagement1 :0, arc :0, bss: 0, espt1 : 0 };

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
            // catégorie déduite de l'id (ex: 'sig-img' -> 'sig')
            const id = this.id || '';
            const category = id.split('-')[0];

            // helper pour récupérer le nom de fichier (robuste aux URLs absolues)
            const basename = (p) => p.split('/').pop().split('?')[0];

            // déterminer l'index initial dans la série si disponible
            let index = 0;
            if (slides[category]) {
                const name = basename(this.src);
                const found = slides[category].findIndex(s => basename(s) === name);
                if (found !== -1) index = found;
            }

            let modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100vw";
            modal.style.height = "100vh";
            modal.style.background = "rgba(0, 0, 0, 0.85)";
            modal.style.display = "flex";
            modal.style.alignItems = "center";
            modal.style.justifyContent = "center";
            modal.style.zIndex = "1000";

            let imgClone = document.createElement("img");
            imgClone.src = this.src;
            imgClone.style.maxWidth = "90%";
            imgClone.style.maxHeight = "90%";
            imgClone.style.borderRadius = "10px";
            imgClone.style.zIndex = "1001";

            // boutons précédent / suivant (uniquement visibles dans la modal)
            let prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&#10094;';
            prevBtn.style.position = 'absolute';
            prevBtn.style.left = '20px';
            prevBtn.style.top = '50%';
            prevBtn.style.transform = 'translateY(-50%)';
            prevBtn.style.background = 'transparent';
            prevBtn.style.border = 'none';
            prevBtn.style.color = 'white';
            prevBtn.style.fontSize = '2.5rem';
            prevBtn.style.cursor = 'pointer';
            prevBtn.style.zIndex = '1002';

            let nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&#10095;';
            nextBtn.style.position = 'absolute';
            nextBtn.style.right = '20px';
            nextBtn.style.top = '50%';
            nextBtn.style.transform = 'translateY(-50%)';
            nextBtn.style.background = 'transparent';
            nextBtn.style.border = 'none';
            nextBtn.style.color = 'white';
            nextBtn.style.fontSize = '2.5rem';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.zIndex = '1002';

            // handlers pour changer l'image dans la modal sans toucher à la logique principale
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!slides[category]) return;
                index = (index - 1 + slides[category].length) % slides[category].length;
                imgClone.src = slides[category][index];
            });
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!slides[category]) return;
                index = (index + 1) % slides[category].length;
                imgClone.src = slides[category][index];
            });

            // assemble
            modal.appendChild(prevBtn);
            modal.appendChild(imgClone);
            modal.appendChild(nextBtn);
            document.body.appendChild(modal);

            // Fermer en cliquant en dehors de l'image
            modal.addEventListener("click", function(e) {
                if (e.target === modal) modal.remove();
            });
        });
    });
});
>>>>>>> 1d19abc (Mise à jour du contenu du dossier)
