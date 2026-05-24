// Slides data
var slides = {
    cartographie: ["images/image0.png"],
    amenagement:  ["images/image30.png","images/image31.png","images/image32.png","images/image27.png"],
    amenagement1: ["images/image33.png","images/image34.png","images/image5.png","images/image35.png"],
    arc:          ["images/N2.gif","images/N1.jpg","images/Image2.png","images/Image3.png","images/Image4.png","images/image12.png","images/image9.png","images/image11.png","images/image6.png","images/image21.jpg","images/image29.jpg"],
    bss:          ["images/image16.png","images/image37.png","images/image38.png","images/image18.png","images/image15.png"]
};

var modalMediaList    = [];
var modalCurrentIndex = 0;

function showMedia(index) {
    modalCurrentIndex = index;
    var item    = modalMediaList[index];
    var total   = modalMediaList.length;
    var wrap    = document.getElementById('modal-img-wrap');
    var counter = document.getElementById('modal-counter');
    var prev    = document.getElementById('modal-prev');
    var next    = document.getElementById('modal-next');

    wrap.innerHTML = '';

    if (item.type === 'video') {
        var video = document.createElement('video');
        video.controls = true;
        video.innerHTML = '<source src="' + item.src + '" type="video/mp4">';
        wrap.style.cursor = 'default';
        wrap.appendChild(video);
    } else {
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = '';
        wrap.style.cursor = 'zoom-in';
        img.addEventListener('click', function() { openFullscreen(item.src); });
        wrap.appendChild(img);
    }

    counter.textContent  = total > 1 ? (index + 1) + ' / ' + total : '';
    prev.style.display   = total > 1 ? 'flex' : 'none';
    next.style.display   = total > 1 ? 'flex' : 'none';
}

function openFullscreen(src) {
    document.getElementById('fullscreen-img').src = src;
    document.getElementById('fullscreen-overlay').style.display = 'flex';
}

function closeFullscreen() {
    document.getElementById('fullscreen-overlay').style.display = 'none';
    document.getElementById('fullscreen-img').src = '';
}

// Card click events
document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        var title    = this.querySelector('.title').textContent;
        var content  = this.getAttribute('data-content');
        var type     = this.getAttribute('data-type');
        var category = this.getAttribute('data-category');
        var link     = this.getAttribute('data-link');

        document.getElementById('modal-title-text').textContent = title;
        document.getElementById('modal-text').textContent       = content;

        var linkEl = document.getElementById('modal-link');
        linkEl.innerHTML = '';
        if (link) {
            var btn     = document.createElement('a');
            btn.href    = link;
            btn.target  = '_blank';
            btn.className   = 'btn';
            btn.textContent = 'Voir le site';
            linkEl.appendChild(btn);
        }

        modalMediaList = [];
        if (type === 'video') {
            var src = this.querySelector('video source').getAttribute('src');
            modalMediaList = [{ type: 'video', src: src }];
        } else if (type === 'image') {
            var list = (category && slides[category]) ? slides[category]
                     : [this.style.backgroundImage.replace(/url\(["']?/, '').replace(/["']?\)$/, '')];
            modalMediaList = list.map(function(s) { return { type: 'image', src: s }; });
        }

        showMedia(0);
        document.getElementById('modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

document.getElementById('modal-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    showMedia((modalCurrentIndex - 1 + modalMediaList.length) % modalMediaList.length);
});

document.getElementById('modal-next').addEventListener('click', function(e) {
    e.stopPropagation();
    showMedia((modalCurrentIndex + 1) % modalMediaList.length);
});

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('modal-img-wrap').innerHTML = '';
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('fullscreen-overlay').style.display === 'flex') {
            closeFullscreen();
        } else {
            closeModal();
        }
    }
    if (document.getElementById('modal').style.display === 'flex' && modalMediaList.length > 1) {
        if (e.key === 'ArrowLeft')  showMedia((modalCurrentIndex - 1 + modalMediaList.length) % modalMediaList.length);
        if (e.key === 'ArrowRight') showMedia((modalCurrentIndex + 1) % modalMediaList.length);
    }
});

// Hamburger menu — overrides script.js version for this page
function hamburg() {
    document.querySelector('.nav-container .links').classList.toggle('active');
}

document.querySelectorAll('.nav-container .links a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('.nav-container .links').classList.remove('active');
    });
});
