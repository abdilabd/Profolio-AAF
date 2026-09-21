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
