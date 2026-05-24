// ─── Données des expériences ──────────────────────────────────────────────────
// Pour ajouter des médias à une expérience, remplir le tableau "media" avec
// des objets { type: 'image'|'video', src: 'chemin/fichier', label: 'Titre' }

var experiences = [
    {
        id: 0,
        titre: "Stage — Analyste SIG & Données Foncières",
        organisme: "ONEAD",
        lieu: "Djibouti",
        periode: "Fév – Avr 2022 · 3 mois",
        type: "stage",
        logo: "logo/onead.jpeg",
        description: "Analyse et structuration de bases de données foncières au sein de l'Office National de l'Eau et de l'Assainissement de Djibouti. Création de couches SIG, contrôle qualité des données et production de cartographies thématiques.",
        coords: [11.5893, 43.1450],
        media: []
    },
    {
        id: 1,
        titre: "Stage — Cartographe & Analyste Spatial",
        organisme: "DDCF Djibouti",
        lieu: "Djibouti",
        periode: "Juin – Août 2022 · 3 mois",
        type: "stage",
        logo: "logo/ddcf.png",
        description: "Réalisation de cartes thématiques et d'analyses spatiales pour la Direction des Domaines et du Cadastre Foncier. Traitement de données géographiques et production de rapports cartographiques.",
        coords: [11.5818, 43.1480],
        media: []
    },
    {
        id: 2,
        titre: "Stage — Géomaticien Environnement",
        organisme: "ORREC / CERD",
        lieu: "Djibouti",
        periode: "Jan – Mar 2023 · 3 mois",
        type: "stage",
        logo: "logo/orrec.jpeg",
        description: "Travaux de géomatique appliquée à l'environnement au sein du Centre d'Étude et de Recherche de Djibouti. Traitement d'images satellitaires, analyse de l'occupation des sols et suivi diachronique des dynamiques environnementales.",
        coords: [11.5150, 43.1700],
        media: []
    },
    {
        id: 3,
        titre: "Stage — Géomatique & Aménagement du territoire",
        organisme: "UniLaSalle Beauvais",
        lieu: "Beauvais, France",
        periode: "Avr – Juin 2024 · 3 mois",
        type: "stage",
        logo: "logo/unilasalle.png",
        description: "Stage de fin d'études en géomatique appliquée à la dynamique territoriale. Conception d'outils SIG pour l'analyse du territoire, développement d'applications cartographiques web et contribution à des projets d'aménagement durable.",
        coords: [49.4193, 2.0792],
        media: [
            { type: 'image', src: 'images/image30.png', label: 'Éco-quartier Angers' },
            { type: 'image', src: 'images/image31.png', label: 'Plan d\'aménagement' },
            { type: 'image', src: 'images/image32.png', label: 'Zonage' },
            { type: 'image', src: 'images/image27.png', label: 'Analyse territoriale' }
        ]
    },
    {
        id: 4,
        titre: "Bénévole — Développeur SIG Web",
        organisme: "GEOHORN",
        lieu: "Beauvais, France",
        periode: "Sep 2024 – Fév 2025 · 6 mois",
        type: "benevole",
        logo: "logo/geohorn.png",
        description: "Contribution bénévole au développement de solutions SIG web pour l'association GEOHORN. Conception et déploiement d'applications cartographiques interactives, intégration de données géospatiales open data.",
        coords: [49.4309, 2.0856],
        media: [
            { type: 'image', src: 'images/image0.png',  label: 'Webmapping densité population' },
            { type: 'video', src: 'videos/media1.mp4',  label: 'Application R-Shiny' }
        ]
    },
    {
        id: 5,
        titre: "CDD — Géomaticien & Chargé de données",
        organisme: "UniLaSalle Beauvais",
        lieu: "Beauvais, France",
        periode: "Mar – Août 2025 · 6 mois",
        type: "cdd",
        logo: "logo/unilasalle.png",
        description: "Poste de géomaticien en contrat à durée déterminée au sein d'UniLaSalle Beauvais. Gestion et traitement de bases de données spatiales, production de cartographies thématiques, développement d'outils d'aide à la décision territoriale.",
        coords: [49.4180, 2.0810],
        media: [
            { type: 'image', src: 'images/N2.gif',      label: 'Carte interactive' },
            { type: 'image', src: 'images/N1.jpg',      label: 'Analyse spatiale' },
            { type: 'video', src: 'videos/VID-20241215-WA0002.mp4', label: 'Datathon Normandie 2024' }
        ]
    }
];

var typeColors = {
    stage:    "#00aa55",
    benevole: "#3a86ff",
    cdd:      "#ff9f1c"
};

var typeLabels = {
    stage:    "Stage",
    benevole: "Bénévole",
    cdd:      "CDD"
};

// ─── État ─────────────────────────────────────────────────────────────────────

var expMap      = null;
var expMarkers  = [];
var currentExp  = null;
var currentMedia = [];

// ─── Initialisation de la carte ───────────────────────────────────────────────

function initExpMap() {
    if (expMap) { expMap.invalidateSize(); return; }

    expMap = L.map('exp-map', {
        zoomControl: true,
        scrollWheelZoom: true,
        minZoom: 3,
        maxZoom: 14
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(expMap);

    expMap.fitBounds([[10.5, 1.5], [50.5, 44.5]]);

    experiences.forEach(function(exp) {
        var color = typeColors[exp.type];
        var icon = L.divIcon({
            className: '',
            html: '<div class="exp-marker" style="background:' + color + ';border-color:' + color + ';"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });
        var marker = L.marker(exp.coords, { icon: icon }).addTo(expMap);
        marker.on('click', function() { selectExperience(exp.id); });
        expMarkers.push(marker);
    });

    buildExpList();
    selectExperience(0);
}

// ─── Sélection d'une expérience ───────────────────────────────────────────────

function selectExperience(id) {
    currentExp = id;
    var exp    = experiences[id];
    var color  = typeColors[exp.type];

    // Panneau d'info
    document.getElementById('exp-info-type').textContent = typeLabels[exp.type];
    document.getElementById('exp-info-type').style.background = color;
    document.getElementById('exp-info-organisme').textContent = exp.organisme;
    document.getElementById('exp-info-titre').textContent = exp.titre;
    document.getElementById('exp-info-lieu').textContent = exp.lieu;
    document.getElementById('exp-info-periode').textContent = exp.periode;
    document.getElementById('exp-info-desc').textContent = exp.description;

    // Logo
    var iconEl = document.getElementById('exp-main-icon');
    iconEl.style.border = '2px solid ' + color + '44';
    iconEl.innerHTML = '<img src="' + exp.logo + '" alt="' + exp.organisme + '" style="width:100%;height:100%;object-fit:contain;border-radius:8px;">';

    // Liste — mise en évidence
    document.querySelectorAll('.exp-list-item').forEach(function(item) {
        item.classList.remove('active');
        item.style.borderLeftColor = '#e0e0e0';
    });
    var activeItem = document.querySelector('.exp-list-item[data-id="' + id + '"]');
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.style.borderLeftColor = color;
    }

    // Marqueurs
    expMarkers.forEach(function(m, i) {
        var el  = m.getElement();
        if (!el) return;
        var dot = el.querySelector('.exp-marker');
        if (!dot) return;
        dot.style.transform  = i === id ? 'scale(1.6)' : 'scale(1)';
        dot.style.boxShadow  = i === id ? '0 0 0 4px ' + typeColors[experiences[i].type] + '44' : 'none';
    });

    // Centrage carte
    if (expMap) expMap.flyTo(exp.coords, expMap.getZoom() < 5 ? 5 : expMap.getZoom(), { duration: 1 });

    // Galerie de médias
    currentMedia = exp.media || [];
    var section = document.getElementById('exp-media-section');
    if (currentMedia.length > 0) {
        section.style.display = 'flex';
        buildMediaGallery(color);
    } else {
        section.style.display = 'none';
    }
}

// ─── Galerie de médias ────────────────────────────────────────────────────────

function buildMediaGallery(color) {
    var count  = currentMedia.length;
    var images = currentMedia.filter(function(m) { return m.type === 'image'; }).length;
    var videos = currentMedia.filter(function(m) { return m.type === 'video'; }).length;

    // Label de comptage
    var parts = [];
    if (images > 0) parts.push(images + ' image' + (images > 1 ? 's' : ''));
    if (videos > 0) parts.push(videos + ' vidéo' + (videos > 1 ? 's' : ''));
    document.getElementById('exp-media-count').textContent = parts.join(' · ');

    // Miniatures
    var thumbsEl = document.getElementById('exp-media-thumbs');
    thumbsEl.innerHTML = '';
    currentMedia.forEach(function(m, i) {
        var thumb = document.createElement('div');
        thumb.className = 'exp-media-thumb' + (i === 0 ? ' active' : '');
        thumb.title = m.label;
        if (m.type === 'image') {
            thumb.innerHTML = '<img src="' + m.src + '" alt="' + m.label + '" loading="lazy">';
        } else {
            thumb.innerHTML = '<div class="exp-thumb-video"><i class="fa-solid fa-circle-play"></i></div>';
        }
        (function(index) {
            thumb.addEventListener('click', function() { selectMedia(index); });
        })(i);
        thumbsEl.appendChild(thumb);
    });

    // Afficher le premier média
    selectMedia(0);
}

function selectMedia(index) {
    var m = currentMedia[index];

    // Mettre à jour la miniature active
    document.querySelectorAll('.exp-media-thumb').forEach(function(t, i) {
        t.classList.toggle('active', i === index);
    });

    // Mettre à jour le viewer
    var viewer = document.getElementById('exp-media-viewer');
    if (m.type === 'image') {
        viewer.innerHTML =
            '<img src="' + m.src + '" alt="' + m.label + '">' +
            '<div class="exp-media-caption">' + m.label + '</div>';
    } else {
        viewer.innerHTML =
            '<video src="' + m.src + '" controls playsinline></video>' +
            '<div class="exp-media-caption">' + m.label + '</div>';
    }
}

// ─── Construction de la liste ─────────────────────────────────────────────────

function buildExpList() {
    var listEl = document.getElementById('exp-list');
    listEl.innerHTML = '';
    experiences.forEach(function(exp) {
        var color = typeColors[exp.type];
        var hasMedia = exp.media && exp.media.length > 0;
        var item = document.createElement('div');
        item.className = 'exp-list-item';
        item.setAttribute('data-id', exp.id);
        item.style.borderLeftColor = '#e0e0e0';
        item.innerHTML =
            '<span class="exp-badge" style="background:' + color + '">' + typeLabels[exp.type] + '</span>' +
            '<span class="exp-list-title">' + exp.organisme +
                (hasMedia ? ' <span class="exp-list-media-dot" title="Médias disponibles"></span>' : '') +
            '</span>' +
            '<span class="exp-list-sub">' + exp.periode + '</span>';
        item.addEventListener('click', function() { selectExperience(exp.id); });
        listEl.appendChild(item);
    });
}
