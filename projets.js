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

function buildModalGallery(mediaList) {
    var thumbwrap  = document.getElementById('modal-thumbwrap');
    var thumbstrip = document.getElementById('modal-thumbstrip');
    var viewer     = document.getElementById('modal-viewer');
    thumbstrip.innerHTML = '';
    viewer.innerHTML     = '';

    if (mediaList.length <= 1) {
        thumbwrap.style.display = 'none';
    } else {
        thumbwrap.style.display = 'flex';
        mediaList.forEach(function(item, i) {
            var thumb = document.createElement('div');
            thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
            if (item.type === 'video') {
                thumb.innerHTML = '<div class="modal-thumb-video"><i class="fa-solid fa-play"></i></div>';
            } else {
                thumb.innerHTML = '<img src="' + item.src + '" alt="">';
            }
            thumb.addEventListener('click', function() { selectModalMedia(i); });
            thumbstrip.appendChild(thumb);
        });
    }

    selectModalMedia(0);
}

function selectModalMedia(index) {
    modalCurrentIndex = index;
    var item   = modalMediaList[index];
    var viewer = document.getElementById('modal-viewer');
    viewer.innerHTML = '';

    if (item.type === 'video') {
        var video = document.createElement('video');
        video.controls = true;
        video.innerHTML = '<source src="' + item.src + '" type="video/mp4">';
        viewer.appendChild(video);
    } else {
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = '';
        viewer.appendChild(img);
    }

    document.querySelectorAll('.modal-thumb').forEach(function(t, i) {
        t.classList.toggle('active', i === index);
    });

    // Scroll the active thumb into view
    var activThumb = document.querySelector('.modal-thumb.active');
    if (activThumb) activThumb.scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
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
            var videoSrc   = this.querySelector('video source').getAttribute('src');
            modalMediaList = [{ type: 'video', src: videoSrc }];
        } else if (type === 'image') {
            var imgList    = (category && slides[category]) ? slides[category]
                           : [this.style.backgroundImage.replace(/url\(["']?/, '').replace(/["']?\)$/, '')];
            modalMediaList = imgList.map(function(src) { return { type: 'image', src: src }; });
        }

        buildModalGallery(modalMediaList);

        document.getElementById('modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('modal-viewer').innerHTML = '';
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Thumbnail strip scroll buttons
document.getElementById('thumb-prev').addEventListener('click', function() {
    document.getElementById('modal-thumbstrip').scrollBy({ left: -200, behavior: 'smooth' });
});
document.getElementById('thumb-next').addEventListener('click', function() {
    document.getElementById('modal-thumbstrip').scrollBy({ left: 200, behavior: 'smooth' });
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
