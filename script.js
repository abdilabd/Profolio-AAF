const header=document.querySelector('.site-header'),toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelector('#year').textContent=new Date().getFullYear();

if(window.L&&document.querySelector('#experience-map')){
  const experienceMap=L.map('experience-map',{
    minZoom:3,
    maxZoom:8,
    zoomSnap:1,
    scrollWheelZoom:true,
    maxBounds:[[-60,-30],[75,70]],
    maxBoundsViscosity:1
  });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; OpenStreetMap &copy; CARTO',
    subdomains:'abcd',
    minZoom:3,
    maxZoom:8
  }).addTo(experienceMap);
  const places=[
    {
      name:'Beauvais, France',
      coords:[49.43,2.08],
      experiences:['Ingénieur d’étude en géomatique — INTERACT','Géomaticien — INTERACT','Géomaticien bénévole — GeoHorn']
    },
    {
      name:'Djibouti',
      coords:[11.59,43.15],
      experiences:['Développement et gestion SIG — DDCF','Géomaticien cartographe — ONEAD']
    }
  ];
  const markerIcon=L.divIcon({className:'experience-marker-wrap',html:'<span class="experience-marker"></span>',iconSize:[24,24],iconAnchor:[12,12]});
  places.forEach(place=>{
    const items=place.experiences.map(item=>'<li>'+item+'</li>').join('');
    L.marker(place.coords,{icon:markerIcon}).addTo(experienceMap).bindPopup('<strong>'+place.name+'</strong><ul>'+items+'</ul>',{maxWidth:280});
  });
  experienceMap.fitBounds(places.map(place=>place.coords),{padding:[45,45],maxZoom:4});
  setTimeout(()=>experienceMap.invalidateSize(),250);
}

const categoryView=document.querySelector('#category-view');
const catalogView=document.querySelector('#catalog-view');
const catalogBack=document.querySelector('#catalog-back');
const projectSearch=document.querySelector('#project-search');
const projectCategory=document.querySelector('#project-category');
const catalogReset=document.querySelector('#catalog-reset');
const projectCount=document.querySelector('#project-count');
const catalogTitle=document.querySelector('#catalog-title');
const catalogEmpty=document.querySelector('#catalog-empty');
const productionCards=[...document.querySelectorAll('.production-card')];
const categoryNames={all:'Toutes les réalisations',cartographie:'Cartographie',websig:'Applications Web SIG',projets:'Projets'};

function normalizeText(value){
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function filterProjects(){
  const selected=projectCategory.value;
  const query=normalizeText(projectSearch.value.trim());
  let visible=0;
  productionCards.forEach(card=>{
    const categoryMatch=selected==='all'||card.dataset.category===selected;
    const searchMatch=!query||normalizeText(card.dataset.search+' '+card.textContent).includes(query);
    card.hidden=!(categoryMatch&&searchMatch);
    if(!card.hidden) visible++;
  });
  projectCount.textContent=visible;
  catalogTitle.textContent=categoryNames[selected];
  catalogEmpty.hidden=visible!==0;
}

document.querySelectorAll('[data-open-category]').forEach(button=>{
  button.addEventListener('click',()=>{
    categoryView.hidden=true;
    catalogView.hidden=false;
    document.querySelector('#projets').classList.add('catalog-open');
    projectCategory.value=button.dataset.openCategory;
    projectSearch.value='';
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

projectSearch.addEventListener('input',filterProjects);
projectCategory.addEventListener('change',filterProjects);
catalogReset.addEventListener('click',()=>{
  projectSearch.value='';
  projectCategory.value='all';
  filterProjects();
  projectSearch.focus();
});

document.querySelectorAll('.production-media video').forEach(video=>{
  const card=video.closest('.production-card');
  card.addEventListener('mouseenter',()=>video.play().catch(()=>{}));
  card.addEventListener('mouseleave',()=>{video.pause();video.currentTime=0});
});
