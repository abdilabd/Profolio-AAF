// Get modal elements
var modal = document.getElementById("modal");
var modalMedia = document.getElementById("modal-media");
var modalText = document.getElementById("modal-text");

// Slides data
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
let currentCategory = null;

// Add click event to cards
var cards = document.querySelectorAll('.card');
cards.forEach(function(card) {
    card.addEventListener('click', function() {
        var title = this.querySelector('.title').textContent;
        var content = this.getAttribute('data-content');
        var type = this.getAttribute('data-type');
        var category = this.getAttribute('data-category');
        // Remove title if it appears at the beginning of content
        if (content.startsWith(title)) {
            content = content.substring(title.length).trim();
        }
        modalText.textContent = content;
        
        // Clear previous media
        modalMedia.innerHTML = '';
        
        // Add media based on type
        if (type === 'video') {
            var videoSrc = this.querySelector('video source').getAttribute('src');
            var video = document.createElement('video');
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '400px';
            video.style.objectFit = 'contain';
            var source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            video.appendChild(source);
            modalMedia.appendChild(video);
        } else if (type === 'image') {
            if (category && slides[category] && slides[category].length > 1) {
                // Show slider
                currentCategory = category;
                var sliderContainer = document.createElement('div');
                sliderContainer.className = 'slider-container';
                var prevBtn = document.createElement('button');
                prevBtn.className = 'prev';
                prevBtn.innerHTML = '&#10094;';
                prevBtn.onclick = function() { changeSlide(-1); };
                var img = document.createElement('img');
                img.id = 'modal-slider-img';
                img.src = slides[category][slideIndex[category]];
                img.style.maxWidth = '100%';
                img.style.maxHeight = '400px';
                img.style.objectFit = 'contain';
                var nextBtn = document.createElement('button');
                nextBtn.className = 'next';
                nextBtn.innerHTML = '&#10095;';
                nextBtn.onclick = function() { changeSlide(1); };
                sliderContainer.appendChild(prevBtn);
                sliderContainer.appendChild(img);
                sliderContainer.appendChild(nextBtn);
                modalMedia.appendChild(sliderContainer);
            } else {
                // Show single image
                var imgSrc = this.style.backgroundImage.replace('url("', '').replace('")', '');
                if (imgSrc) {
                    var img = document.createElement('img');
                    img.src = imgSrc;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '400px';
                    img.style.objectFit = 'contain';
                    modalMedia.appendChild(img);
                }
            }
        }
        
        // Add link button if exists
        var link = this.getAttribute('data-link');
        if (link) {
            var btn = document.createElement('a');
            btn.href = link;
            btn.target = '_blank';
            btn.className = 'btn';
            btn.textContent = 'Voir le site';
            modalMedia.appendChild(btn);
        }
        
        modal.style.display = "block";
        document.body.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";
        modal.style.pointerEvents = "auto";
        // Hide all card titles
        document.querySelectorAll('.title').forEach(t => t.style.display = 'none');
    });
});

// Function to close modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    // Show all card titles again
    document.querySelectorAll('.title').forEach(t => t.style.display = 'block');
}

// Close modal when clicking outside
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Function to change slide
function changeSlide(n) {
    if (currentCategory) {
        slideIndex[currentCategory] = (slideIndex[currentCategory] + n + slides[currentCategory].length) % slides[currentCategory].length;
        document.getElementById('modal-slider-img').src = slides[currentCategory][slideIndex[currentCategory]];
    }
}

// Hamburger menu function
function hamburg() {
    const links = document.querySelector('.links');
    links.classList.toggle('active');
}