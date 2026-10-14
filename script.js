const header=document.querySelector('.site-header'),toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelector('#year').textContent=new Date().getFullYear();

const experienceMap=document.querySelector('#experience-map');
if(experienceMap&&window.L){
  const places=[
    {
      name:'Beauvais, France',
      coordinates:[49.4295,2.0807],
      experiences:['Ingénieur d’étude en géomatique — INTERACT','Géomaticien — INTERACT','Géomaticien bénévole — GeoHorn']
    },
    {
      name:'Djibouti',
      coordinates:[11.5721,43.1456],
      experiences:['Développement et gestion SIG — DDCF','Géomaticien cartographe — ONEAD']
    }
  ];
  const map=L.map(experienceMap,{zoomControl:true,minZoom:3,maxZoom:6,scrollWheelZoom:false,worldCopyJump:false,attributionControl:true});
  const localFallback=L.imageOverlay('images/experience-map.svg',[[-60,-30],[75,80]],{opacity:.92});
  const esriFallback=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{
    minZoom:3,
    maxZoom:6,
    attribution:'Tiles &copy; Esri'
  });
  const baseTiles=L.tileLayer('https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=cb1_4ka0_1_deb1fc5e0d9dcac1b853d0f2',{
    minZoom:3,
    maxZoom:6,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  });
  let tileErrors=0;
  let fallbackErrors=0;
  baseTiles.on('tileerror',()=>{
    tileErrors++;
    if(tileErrors===3){
      map.removeLayer(baseTiles);
      esriFallback.addTo(map);
    }
  });
  esriFallback.on('tileerror',()=>{
    fallbackErrors++;
    if(fallbackErrors===3){
      map.removeLayer(esriFallback);
      localFallback.addTo(map);
    }
  });
  baseTiles.addTo(map);
  const bounds=L.latLngBounds(places.map(place=>place.coordinates));
  map.fitBounds(bounds,{padding:[42,42],maxZoom:4});
  places.forEach(place=>{
    const icon=L.divIcon({
      className:'experience-div-icon',
      html:'<span class="experience-pin"><i></i><b>'+place.name+'</b></span>',
      iconSize:null,
      iconAnchor:[9,9]
    });
    L.marker(place.coordinates,{icon,keyboard:true,title:place.name})
      .addTo(map)
      .bindPopup('<strong>'+place.name+'</strong><ul>'+place.experiences.map(item=>'<li>'+item+'</li>').join('')+'</ul>',{className:'experience-popup',maxWidth:300});
  });
  L.polyline(places.map(place=>place.coordinates),{color:'#75f0a7',weight:2,opacity:.75,dashArray:'6 8'}).addTo(map);
  setTimeout(()=>map.invalidateSize(),100);
}

const categoryView=document.querySelector('#category-view');
const catalogView=document.querySelector('#catalog-view');
const catalogBack=document.querySelector('#catalog-back');
const filterButtons=[...document.querySelectorAll('[data-filter-category]')];
const projectCount=document.querySelector('#project-count');
const catalogTitle=document.querySelector('#catalog-title');
const catalogEmpty=document.querySelector('#catalog-empty');
const productionCards=[...document.querySelectorAll('.production-card')];
const categoryNames={all:'Toutes les réalisations',cartographie:'Cartographie',websig:'Applications Web SIG',projets:'Projets'};
let activeCategory='all';

function filterProjects(){
  let visible=0;
  productionCards.forEach(card=>{
    const categoryMatch=activeCategory==='all'||card.dataset.category===activeCategory;
    card.hidden=!categoryMatch;
    if(!card.hidden) visible++;
  });
  projectCount.textContent=visible;
  catalogTitle.textContent=categoryNames[activeCategory];
  catalogEmpty.hidden=visible!==0;
  filterButtons.forEach(button=>{
    const active=button.dataset.filterCategory===activeCategory;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}

document.querySelectorAll('[data-open-category]').forEach(button=>{
  button.addEventListener('click',()=>{
    categoryView.hidden=true;
    catalogView.hidden=false;
    document.querySelector('#projets').classList.add('catalog-open');
    activeCategory=button.dataset.openCategory;
    filterProjects();
    catalogView.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

catalogBack.addEventListener('click',()=>{
  catalogView.hidden=true;
  categoryView.hidden=false;
  document.querySelector('#projets').classList.remove('catalog-open');
  document.querySelector('#projets').scrollIntoView({behavior:'smooth',block:'start'});
});

filterButtons.forEach(button=>button.addEventListener('click',()=>{
  activeCategory=button.dataset.filterCategory;
  filterProjects();
}));

document.querySelectorAll('.production-media video').forEach(video=>{
  const card=video.closest('.production-card');
  card.addEventListener('mouseenter',()=>video.play().catch(()=>{}));
  card.addEventListener('mouseleave',()=>{video.pause();video.currentTime=0});
});

const projectGalleries={
  'study-areas':{
    category:'Cartographie de recherche',title:'Localisation des zones d’étude',tags:['QGIS','Localisation','Recherche'],slides:[
      {src:'images/portfolio-gallery/study-areas.webp',title:'Maroc, Turquie et Égypte',label:'Contexte géographique',description:'Cette carte situe les différents territoires mobilisés dans une étude comparative. Elle permet au lecteur de comprendre immédiatement l’étendue géographique de l’analyse et la position des zones étudiées.'}
    ]
  },
  'idf-demography':{
    category:'Analyse démographique',title:'Dynamiques démographiques — Île-de-France',tags:['INSEE','Cartographie thématique','Analyse spatiale'],slides:[
      {src:'images/portfolio-gallery/idf-migration.webp',title:'Migration par département et par genre',label:'Carte 1',description:'Cette carte compare le niveau et l’évolution de la migration entre les départements franciliens, tout en distinguant la répartition entre femmes et hommes.'},
      {src:'images/portfolio-gallery/idf-natural-growth.webp',title:'Accroissement naturel par département',label:'Carte 2',description:'Cette représentation met en évidence les écarts d’accroissement naturel entre les départements et permet d’identifier les territoires où la dynamique démographique est la plus marquée.'}
    ]
  },
  biowaste:{
    category:'Cartographie d’acteurs',title:'Filière biodéchets — Normandie',tags:['Recensement','Géolocalisation','QGIS'],slides:[
      {src:'images/portfolio-gallery/biodiversity-waste.webp',title:'Répartition des acteurs de la filière',label:'Couverture territoriale',description:'Cette carte localise les structures de sensibilisation, les acteurs agricoles et alimentaires ainsi que les jardins partagés. Elle permet d’observer leur répartition et de repérer les secteurs moins couverts.'}
    ]
  },
  normandy:{
    category:'Analyse territoriale multi-échelle',title:'Relations rurales et urbaines — Normandie',tags:['Occupation du sol','Télédétection','Analyse multi-échelle'],slides:[
      {src:'images/portfolio-gallery/normandy-night.webp',title:'Pollution nocturne',label:'Carte 1 sur 3',description:'Cette carte compare l’intensité lumineuse entre les espaces ruraux et les principaux pôles urbains. Elle fait ressortir la vallée de la Seine et les grandes agglomérations normandes.'},
      {src:'images/portfolio-gallery/normandy-landcover.webp',title:'Occupation et usage du sol',label:'Carte 2 sur 3',description:'Cette production compare les principales classes d’occupation du sol à l’échelle de la Normandie, de la vallée de la Seine et de la métropole rouennaise.'},
      {src:'images/portfolio-gallery/normandy-urban.webp',title:'Occupation bâtie dans la vallée de la Seine',label:'Carte 3 sur 3',description:'La représentation par grille permet d’identifier les concentrations bâties et de comparer l’intensité de l’urbanisation entre Le Havre, Rouen et les espaces intermédiaires.'}
    ]
  },
  flood:{
    category:'Cartographie des risques',title:'Exposition au risque d’inondation',tags:['Analyse de risque','Modélisation','Animation temporelle'],slides:[
      {src:'images/portfolio-gallery/flood-buildings.webp',title:'Bâtiments potentiellement exposés',label:'Analyse d’exposition',description:'Cette carte croise la localisation des bâtiments avec les zones potentiellement inondables. Elle sert à repérer les secteurs bâtis les plus exposés et à appuyer la prévention du risque.'},
      {src:'images/portfolio-gallery/flood-evolution.gif',title:'Évolution des surfaces inondées à Saumur',label:'Animation temporelle',description:'Cette animation représente la progression de l’inondation après une rupture de digue. Elle permet de suivre la diffusion du phénomène et d’identifier les zones atteintes en premier.'}
    ]
  },
  bordeaux:{
    category:'Visualisation 3D',title:'Morphologie urbaine — Bordeaux',tags:['ArcGIS Pro','Modélisation 3D','Topographie'],slides:[
      {src:'images/portfolio-gallery/bordeaux-3d.webp',title:'Bâtiments classés selon leur hauteur',label:'Vue 3D',description:'Cette représentation replace les bâtiments dans la topographie bordelaise et les différencie selon leur hauteur. Elle facilite la lecture des volumes et des contrastes de la morphologie urbaine.'}
    ]
  },
  ndvi:{
    category:'Télédétection',title:'Végétation — Corne de l’Afrique',tags:['NDVI','Sentinel-2','Landsat-8'],slides:[
      {src:'images/portfolio-gallery/horn-ndvi.gif',title:'Évolution du NDVI dans la Corne de l’Afrique',label:'Analyse régionale',description:'Cette production compare la végétation à plusieurs dates et propose une projection de son évolution. Elle met en évidence les contrastes régionaux et les secteurs où la couverture végétale pourrait fortement diminuer.'},
      {src:'images/portfolio-gallery/somalia-ndvi.webp',title:'NDVI en Somalie',label:'Analyse nationale',description:'La grille hexagonale synthétise les valeurs de végétation sur l’ensemble du territoire. Elle permet de repérer rapidement les zones les plus végétalisées et les espaces où la végétation est faible.'}
    ]
  },
  ecoquartier:{
    category:'Projet d’aménagement',title:'Écoquartier durable',tags:['Urbanisme','Phasage','Conception SIG'],slides:[
      {src:'images/portfolio-gallery/ecoquartier-01.webp',title:'Phase 0 — Réseau viaire',label:'Étape 1 sur 4',description:'Cette première carte définit les voies principales et secondaires. Elle pose la structure de déplacement qui organisera ensuite les parcelles et les différents secteurs du quartier.'},
      {src:'images/portfolio-gallery/ecoquartier-02.webp',title:'Phase 1 — Lotissements',label:'Étape 2 sur 4',description:'Cette étape traduit le réseau viaire en parcelles et unités foncières. Elle permet de répartir l’espace constructible avant l’implantation des bâtiments.'},
      {src:'images/portfolio-gallery/ecoquartier-03.webp',title:'Phase 2 — Construction',label:'Étape 3 sur 4',description:'La troisième carte présente l’implantation progressive des logements, du centre de santé et des établissements scolaires et préscolaires.'},
      {src:'images/portfolio-gallery/ecoquartier-04.webp',title:'Plan d’aménagement final',label:'Étape 4 sur 4',description:'Le plan final rassemble logements, équipements, stationnement, voirie et espaces verts. Il offre une lecture complète de l’organisation et du fonctionnement projetés du quartier.'}
    ]
  },
  ecopark:{
    category:'Conception paysagère',title:'Conception d’un écoparc',tags:['Aménagement','Paysage','Organisation des usages'],slides:[
      {src:'images/portfolio-gallery/ecopark-01.webp',title:'Délimitation des espaces',label:'Étape 1 sur 4',description:'Cette première étape structure le site en plusieurs secteurs et définit les circulations principales en tenant compte des limites naturelles et des plans d’eau.'},
      {src:'images/portfolio-gallery/ecopark-02.webp',title:'Trame paysagère et desserte',label:'Étape 2 sur 4',description:'Le projet introduit les espaces végétalisés, les cheminements, les plantations et le stationnement afin de construire une trame paysagère cohérente.'},
      {src:'images/portfolio-gallery/ecopark-03.webp',title:'Implantation des équipements',label:'Étape 3 sur 4',description:'Cette étape répartit les activités de loisirs, de restauration, de découverte et d’hébergement selon les différents secteurs du parc.'},
      {src:'images/portfolio-gallery/ecopark-04.webp',title:'Plan d’ensemble de l’écoparc',label:'Étape 4 sur 4',description:'Le plan final présente la complémentarité des usages et montre comment les équipements sont reliés par les circulations et les espaces végétalisés.'}
    ]
  },
  ses:{
    category:'Projet scientifique',title:'Services écosystémiques et télédétection',tags:['Sentinel-2','Séries temporelles','Analyse spatiale'],slides:[
      {src:'images/portfolio-gallery/ses-poster.webp',title:'Évaluation d’un service de régulation climatique',label:'Poster scientifique',description:'Ce poster synthétise une analyse menée à partir de séries temporelles Sentinel-2 dans deux territoires marocains. Les cartes et graphiques permettent de comparer la distribution spatiale de l’indicateur et son évolution entre 2017 et 2024.'}
    ]
  }
};

projectGalleries['static-maps']={
  category:'Cartes statiques',
  title:'Sélection de cartes statiques',
  tags:['QGIS','ArcGIS Pro','Cartographie thématique'],
  slides:[
    ...projectGalleries['study-areas'].slides,
    ...projectGalleries['idf-demography'].slides,
    ...projectGalleries.biowaste.slides,
    ...projectGalleries.normandy.slides,
    projectGalleries.flood.slides[0],
    ...projectGalleries.bordeaux.slides,
    projectGalleries.ndvi.slides[1]
  ]
};

projectGalleries['interactive-maps']={
  category:'Cartes interactives',
  title:'Sélection de cartes interactives',
  tags:['Leaflet','Webmapping','Exploration des données'],
  slides:[
    {iframe:'https://abdilabd.github.io/carte-douaisis-agglo/',url:'https://abdilabd.github.io/carte-douaisis-agglo/',title:'Réseau hydrographique — Douaisis Agglo',label:'Carte interactive 1 sur 2',description:'Cette carte interactive permet de structurer et de valoriser le réseau hydrographique afin de faciliter le suivi des tronçons et la préparation des interventions. Elle permet d’explorer 1 687 tronçons par commune, bassin versant, nature et largeur.'},
    {src:'images/image0.png',url:'https://abdilabd.github.io/Webmapping/',title:'Densité de population — Rouen',label:'Carte interactive 2 sur 2',description:'Cette carte permet d’explorer la répartition de la population et de faire ressortir les contrastes spatiaux à l’échelle du territoire rouennais.'}
  ]
};

projectGalleries['animated-maps']={
  category:'GIF cartographiques',
  title:'Cartes animées',
  tags:['GIF','Animation','Analyse temporelle'],
  slides:[projectGalleries.flood.slides[1],projectGalleries.ndvi.slides[0]]
};

const galleryModal=document.querySelector('#gallery-modal');
const galleryImage=document.querySelector('#gallery-image');
const galleryIframe=document.querySelector('#gallery-iframe');
const galleryTitle=document.querySelector('#gallery-title');
const galleryCategory=document.querySelector('#gallery-category');
const gallerySlideLabel=document.querySelector('#gallery-slide-label');
const gallerySlideTitle=document.querySelector('#gallery-slide-title');
const galleryDescription=document.querySelector('#gallery-description');
const galleryCounter=document.querySelector('#gallery-counter');
const galleryTags=document.querySelector('#gallery-tags');
const galleryThumbs=document.querySelector('#gallery-thumbs');
const galleryPrev=document.querySelector('.gallery-prev');
const galleryNext=document.querySelector('.gallery-next');
const galleryProjectLink=document.querySelector('#gallery-project-link');
let activeGallery=null,activeSlide=0,galleryTrigger=null;

function renderGallerySlide(index){
  activeSlide=index;
  const slide=activeGallery.slides[index];
  const isInteractive=Boolean(slide.iframe);
  galleryImage.hidden=isInteractive;
  galleryIframe.hidden=!isInteractive;
  if(isInteractive){
    galleryImage.src='';
    galleryIframe.src=slide.iframe;
    galleryIframe.title='Aperçu de '+slide.title;
  }else{
    galleryIframe.src='';
    galleryImage.src=slide.src;
    galleryImage.alt=slide.title;
  }
  galleryProjectLink.hidden=!slide.url;
  galleryProjectLink.href=slide.url||'#';
  gallerySlideLabel.textContent=slide.label;
  gallerySlideTitle.textContent=slide.title;
  galleryDescription.textContent=slide.description;
  galleryCounter.textContent=(index+1)+' / '+activeGallery.slides.length;
  galleryPrev.hidden=activeGallery.slides.length<2;
  galleryNext.hidden=activeGallery.slides.length<2;
  [...galleryThumbs.children].forEach((thumb,thumbIndex)=>thumb.classList.toggle('active',thumbIndex===index));
}

function openGallery(id,trigger){
  activeGallery=projectGalleries[id];
  if(!activeGallery)return;
  galleryTrigger=trigger;
  galleryTitle.textContent=activeGallery.title;
  galleryCategory.textContent=activeGallery.category;
  galleryTags.innerHTML=activeGallery.tags.map(tag=>'<span>'+tag+'</span>').join('');
  galleryThumbs.innerHTML='';
  activeGallery.slides.forEach((slide,index)=>{
    const button=document.createElement('button');
    button.className='gallery-thumb';
    button.type='button';
    button.setAttribute('aria-label','Afficher '+slide.title);
    button.innerHTML=slide.src?'<img src="'+slide.src+'" alt="">':'<span>'+String(index+1).padStart(2,'0')+'<b>'+slide.title+'</b></span>';
    button.addEventListener('click',()=>renderGallerySlide(index));
    galleryThumbs.append(button);
  });
  renderGallerySlide(0);
  galleryModal.hidden=false;
  document.body.classList.add('gallery-open');
  document.querySelector('.gallery-close').focus();
}

function closeGallery(){
  galleryModal.hidden=true;
  document.body.classList.remove('gallery-open');
  galleryImage.src='';
  galleryIframe.src='';
  if(galleryTrigger)galleryTrigger.focus();
}

document.querySelectorAll('.open-gallery').forEach(button=>button.addEventListener('click',()=>openGallery(button.dataset.gallery,button)));
document.querySelectorAll('[data-close-gallery]').forEach(button=>button.addEventListener('click',closeGallery));
galleryPrev.addEventListener('click',()=>renderGallerySlide((activeSlide-1+activeGallery.slides.length)%activeGallery.slides.length));
galleryNext.addEventListener('click',()=>renderGallerySlide((activeSlide+1)%activeGallery.slides.length));
document.addEventListener('keydown',event=>{
  if(galleryModal.hidden)return;
  if(event.key==='Escape')closeGallery();
  if(event.key==='ArrowLeft'&&activeGallery.slides.length>1)galleryPrev.click();
  if(event.key==='ArrowRight'&&activeGallery.slides.length>1)galleryNext.click();
});
