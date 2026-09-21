// ─── Données des expériences ──────────────────────────────────────────────────

var experiences = [
    {
        id: 0,
        titre: "CDD — Ingénieur d'étude en Géomatique",
        organisme: "INTERACT – UniLaSalle",
        lieu: "Beauvais, France",
        periode: "Jan – Juil 2026 · 7 mois",
        type: "cdd",
        logo: "logo/unilasalle.png",
        description: "Poste d'ingénieur d'étude en géomatique en contrat à durée déterminée au sein d'INTERACT – UniLaSalle Beauvais. Conception et développement d'outils SIG, gestion et traitement de bases de données spatiales, production de cartographies thématiques et contribution à des projets de recherche appliquée.",
        coords: [49.4193, 2.0792]
    },
    {
        id: 1,
        titre: "Bénévole — Développeur SIG Web",
        organisme: "GEOHORN",
        lieu: "Beauvais, France",
        periode: "Oct – Déc 2025 · 3 mois",
        type: "benevole",
        logo: "logo/geohorn.png",
        description: "Contribution bénévole au développement de solutions SIG web pour l'association GEOHORN. Conception et déploiement d'applications cartographiques interactives, intégration de données géospatiales open data.",
        coords: [49.4309, 2.0856]
    },
    {
        id: 2,
        titre: "Stage — Géomaticien",
        organisme: "INTERACT – UniLaSalle",
        lieu: "Beauvais, France",
        periode: "Fév – Juil 2025 · 6 mois",
        type: "stage",
        logo: "logo/unilasalle.png",
        description: "Stage de géomaticien au sein d'INTERACT – UniLaSalle Beauvais. Développement d'applications SIG, traitement de données géospatiales et contribution à des projets de géomatique appliquée à la dynamique territoriale.",
        coords: [49.4180, 2.0810]
    },
    {
        id: 3,
        titre: "Stage — Géomaticien Analyste des données",
        organisme: "ORREC / CERD",
        lieu: "Djibouti",
        periode: "Avr – Juil 2024 · 4 mois",
        type: "stage",
        logo: "logo/orrec.jpeg",
        description: "Stage de géomaticien axé sur l'analyse des données environnementales au sein de l'Observatoire Régional de la Recherche pour l'Environnement et le Climat (ORREC – CERD). Traitement d'images satellitaires, analyse de l'occupation des sols et suivi des dynamiques environnementales.",
        coords: [11.5150, 43.1700]
    },
    {
        id: 4,
        titre: "Stage — Géomaticien, Développement et gestion SIG",
        organisme: "DDCF Djibouti",
        lieu: "Djibouti",
        periode: "Mai – Juil 2022 · 3 mois",
        type: "stage",
        logo: "logo/ddcf.png",
        description: "Stage axé sur le développement et la gestion de systèmes d'information géographique à la Direction des Domaines et de la Conservation Foncière de Djibouti. Structuration de bases de données foncières, création de couches SIG et production de cartographies thématiques.",
        coords: [11.5818, 43.1480]
    },
    {
        id: 5,
        titre: "Stage — Géomaticien Cartographe",
        organisme: "ONEAD",
        lieu: "Djibouti",
        periode: "Mai – Juil 2019 · 3 mois",
        type: "stage",
        logo: "logo/onead.jpeg",
        description: "Stage de cartographe au sein de l'Office National de l'Eau et de l'Assainissement de Djibouti. Contribution à la réalisation de cartes thématiques et à l'analyse géospatiale des données relatives aux réseaux d'eau et d'assainissement.",
        coords: [11.5893, 43.1450]
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

// ─── État de la carte ─────────────────────────────────────────────────────────

var expMap     = null;
var expMarkers = [];
var currentExp = null;

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
    var exp   = experiences[id];
    var color = typeColors[exp.type];

    document.getElementById('exp-info-type').textContent = typeLabels[exp.type];
    document.getElementById('exp-info-type').style.background = color;
    document.getElementById('exp-info-organisme').textContent = exp.organisme;
    document.getElementById('exp-info-titre').textContent = exp.titre;
    document.getElementById('exp-info-lieu').textContent = exp.lieu;
    document.getElementById('exp-info-periode').textContent = exp.periode;
    document.getElementById('exp-info-desc').textContent = exp.description;

    var iconEl = document.getElementById('exp-main-icon');
    iconEl.style.border = '2px solid ' + color + '44';
    iconEl.innerHTML = '<img src="' + exp.logo + '" alt="' + exp.organisme + '" style="width:100%;height:100%;object-fit:contain;border-radius:8px;">';

    document.querySelectorAll('.exp-list-item').forEach(function(item) {
        item.classList.remove('active');
        item.style.borderLeftColor = '#e0e0e0';
    });
    var activeItem = document.querySelector('.exp-list-item[data-id="' + id + '"]');
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.style.borderLeftColor = color;
    }

    expMarkers.forEach(function(m, i) {
        var el  = m.getElement();
        if (!el) return;
        var dot = el.querySelector('.exp-marker');
        if (!dot) return;
        dot.style.transform = i === id ? 'scale(1.6)' : 'scale(1)';
        dot.style.boxShadow = i === id ? '0 0 0 4px ' + typeColors[experiences[i].type] + '44' : 'none';
    });

    if (expMap) expMap.flyTo(exp.coords, expMap.getZoom() < 5 ? 5 : expMap.getZoom(), { duration: 1 });
}

// ─── Construction de la liste ─────────────────────────────────────────────────

function buildExpList() {
    var listEl = document.getElementById('exp-list');
    listEl.innerHTML = '';
    experiences.forEach(function(exp) {
        var color = typeColors[exp.type];
        var item  = document.createElement('div');
        item.className = 'exp-list-item';
        item.setAttribute('data-id', exp.id);
        item.style.borderLeftColor = '#e0e0e0';
        item.innerHTML =
            '<span class="exp-badge" style="background:' + color + '">' + typeLabels[exp.type] + '</span>' +
            '<span class="exp-list-title">' + exp.organisme + '</span>' +
            '<span class="exp-list-sub">' + exp.periode + '</span>';
        item.addEventListener('click', function() { selectExperience(exp.id); });
        listEl.appendChild(item);
    });
}
