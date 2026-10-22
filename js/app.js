/* =========================================================
   TWSA — shared JS + Lakbay-style header + intro video
   ========================================================= */

/* ---- Sticky header scroll effect (transparent → white) ---- */
const siteHeader = document.querySelector('header.site');
function updateHeader() {
  if (!siteHeader) return;
  if (window.scrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ---- Year ---- */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ---- Back to top ---- */
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 400));
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Theme toggle (sun/moon) ---- */
const themeBtn = document.querySelector('.nav-buttons .theme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
  });
}

/* =========================================================
   INTRO VIDEO (index page only)
   ========================================================= */
(function initIntroVideo() {
  const video = document.getElementById('heroVideo');
  const introOverlay = document.getElementById('intro-overlay');
  const mainWebsite = document.getElementById('main-website');
  if (!video || !introOverlay || !mainWebsite) return;

  document.body.classList.add('has-intro');

  const MOBILE_BREAKPOINT = 768;
  const DESKTOP_SRC = 'videos/w.mp4';
  const MOBILE_SRC  = 'videos/t.mp4';

  function getVideoSrc() {
    return window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_SRC : DESKTOP_SRC;
  }

  function setupVideo() {
    const src = getVideoSrc();
    video.innerHTML = '';
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();
    video.currentTime = 0;
    video.play().catch((err) => {
      console.warn('Autoplay blocked:', err);
      setTimeout(revealMainWebsite, 3000);
    });
  }

  function revealMainWebsite() {
    introOverlay.classList.add('fade-out');
    setTimeout(() => {
      introOverlay.style.display = 'none';
      mainWebsite.classList.add('show');
      document.body.classList.remove('has-intro');
      document.body.classList.add('revealed');
      if (typeof initSlider === 'function') initSlider();
    }, 1000);
  }

  video.addEventListener('ended', () => {
    setTimeout(revealMainWebsite, 1500);
  });

  setupVideo();
})();

/* =========================================================
   COURSE DATA + SERVICES (Services page)
   ========================================================= */
const COURSE_IMG = {
  firstaid: 'images/firstaid.jpg',
  fire: 'images/fire.jpg',
  marshal: 'images/marshal.jpg',
  agt: 'images/agt.jpg',
  confined: 'images/confined.jpg',
  diving: 'images/diving.jpg',
  p8: 'images/bgas.jpg',
  p7: 'images/p7.jpg',
  defdrive: 'images/defdrive.jpg',
  moto2: 'images/moto2.jpg',
  iecex: 'images/iecex.jpg',
  thermal: 'images/thermal.jpg',
  bgas: 'images/bgas.jpg',
  rope: 'images/rope.jpg',
  allcourses: 'images/allcourses.jpg'
};

const COURSES = [
  { cat:'safety', title:'First Aid & Emergency Response', img:'firstaid', desc:'Comprehensive first aid training covering CPR, AED usage, wound care, and emergency response protocols. Validates skills in providing immediate care for injuries and life-threatening situations.', objectives:['CPR and AED usage','Wound care and bleeding control','Fracture and sprain management','Burn and shock treatment','Legal and ethical considerations'] },
  { cat:'safety', title:'Fire Safety & Fire Fighting', img:'fire', desc:'Designed for professionals responsible for fire safety. Covers fire prevention, risk assessment, extinguisher usage, and emergency evacuation procedures.', objectives:['Conduct fire risk assessments','Proper usage of fire extinguishers','Plan and execute evacuations','Operate fire alarm systems','Manage fire incidents'] },
  { cat:'safety', title:'Authorized Gas Tester', img:'agt', desc:'For professionals working in gas hazard environments. Covers gas types, detection equipment, confined space testing, and permit-to-work systems. Certificate valid for two years.', objectives:['Operate and calibrate gas detection equipment','Identify hazardous gas types','Conduct gas testing in confined spaces','Implement atmospheric monitoring','Execute emergency response'] },
  { cat:'safety', title:'Confined Space Entry & Rescue', img:'confined', desc:'Intensive training for safely working in and managing confined space operations. Combines theory with practical exercises including rescue scenarios.', objectives:['Confined space recognition','Risk assessment and mitigation','Atmospheric testing expertise','Permit-to-work systems','PPE proficiency'] },
  { cat:'safety', title:'Water Diving & Rescue', img:'diving', desc:'Validates skills in water safety, diving rescue techniques, and SCUBA operations. Covers underwater navigation, emergency response, and compliance with global diving standards.', objectives:['Basic water safety and survival','SCUBA equipment handling','Underwater navigation','Emergency procedures','Dive planning and risk assessment'] },
  { cat:'safety', title:'Fire Marshal', img:'marshal', desc:'Essential skills for ensuring fire safety in the workplace. Covers fire prevention, risk assessment, emergency response, and leading evacuation drills.', objectives:['Fire risk assessment','Fire extinguisher usage','Emergency evacuation planning','Fire alarm operation','Incident management and reporting'] },
  { cat:'industrial', title:'Bolted Flange Joint Assembly', img:'p8', desc:'Hands-on training aligned with ASME PCC-1 standards. For engineers, technicians, and supervisors involved in piping and maintenance operations.', objectives:['Bolted joint principles','Gasket selection and flange inspection','Bolt tightening techniques','Apply ASME PCC-1 standards','Leak prevention'] },
  { cat:'industrial', title:'Hydraulic Torque Wrench Operations', img:'p8', desc:'Advanced training on hydraulic bolting systems. Covers safety protocols, torque calculations, and field maintenance.', objectives:['System components and set-up','Operational safety protocols','Torque calculations and conversion','Advanced bolting techniques','Troubleshooting and maintenance'] },
  { cat:'industrial', title:'Scaffolder Training', img:'p7', desc:'Advanced scaffolding principles, regulations, and compliance. Covers erection/dismantling of specialized scaffolds, inspection, and supervisory skills.', objectives:['Advanced scaffolding principles','Regulations and compliance','Risk assessment for complex scaffolding','Scaffold inspection and auditing','Supervisory skills'] },
  { cat:'driving', title:'Defensive Driving Training', img:'defdrive', desc:'Practical training to enhance safety, competence, and professionalism on the road. Focuses on hazard awareness and accident prevention.', objectives:['Hazard identification','Safe driving techniques','Accident prevention','Vehicle inspection','Emergency handling'] },
  { cat:'driving', title:'Motorcycle Rider Training', img:'moto2', desc:'Comprehensive rider training covering defensive riding techniques, safety awareness, and practical skills for commercial and delivery riders.', objectives:['Defensive riding techniques','Commercial rider safety','Inspection and maintenance','Road safety awareness','Customer care and professional conduct'] }
  ,
  { cat:'industrial', title:"IECEx", img:'iecex', desc:"Explosive atmospheres, hazardous area classification and certified equipment use, for safe installation, inspection and maintenance that meets international standards and reduces fire and explosion risk.", objectives:["Explosive atmosphere awareness", "Hazardous area classification", "Certified equipment handling", "Inspection and maintenance", "IECEx standards compliance"] },
  { cat:'industrial', title:"Thermal Insulation", img:'thermal', desc:"Skills to select, install and maintain insulation systems safely, improving energy efficiency, reducing heat loss and protecting equipment across industrial and construction sites.", objectives:["Insulation material knowledge", "Proper installation techniques", "Energy efficiency improvement", "Safety compliance standards", "Maintenance and inspection"] },
  { cat:'industrial', title:"BGAS CSWIP", img:'bgas', desc:"Welding inspection, non-destructive testing awareness and quality control, ensuring compliance with international standards and the integrity of welded structures.", objectives:["Welding inspection principles", "NDT awareness basics", "Quality control procedures", "Standards compliance knowledge", "Inspection reporting skills"] },
  { cat:'safety', title:"High Angle Rope Rescue", img:'rope', desc:"Practical skills to access, secure and evacuate casualties from elevated or steep environments, with proper rope systems, anchor setup and teamwork.", objectives:["Rope system setup", "Anchor point selection", "Safe casualty handling", "Team coordination skills", "Rescue safety procedures"] }
];

/* ---- Services page: build grid + filter + dialog ---- */
(function initServices() {
  const grid = document.getElementById('svcGrid');
  if (!grid) return;

  const dlg    = document.getElementById('svcDlg');
  const dImg   = document.getElementById('dImg');
  const dTitle = document.getElementById('dTitle');
  const dText  = document.getElementById('dText');
  const dList  = document.getElementById('dList');

  COURSES.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'svc';
    btn.dataset.cat = c.cat;
    btn.innerHTML =
      `<div class="ph"><img src="${COURSE_IMG[c.img] || COURSE_IMG.allcourses}" alt="${c.title}"></div>` +
      `<h3>${c.title}</h3>` +
      `<div class="tx"><span>${c.desc}</span><span class="more">View details →</span></div>`;
    btn.addEventListener('click', () => {
      dImg.src = COURSE_IMG[c.img] || COURSE_IMG.allcourses;
      dTitle.textContent = c.title;
      dText.textContent  = c.desc;
      dList.innerHTML = c.objectives.map(o => `<li>${o}</li>`).join('');
      dlg.showModal();
    });
    grid.appendChild(btn);
  });

  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      const f = btn.dataset.f;
      document.querySelectorAll('.svc').forEach(card => {
        card.hidden = f !== 'all' && card.dataset.cat !== f;
      });
    });
  });

  if (dlg) {
    dlg.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => dlg.close()));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }
})();

/* ---- Contact page: gallery lightbox ---- */
(function initGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const PROJECTS = [
    { img:'proj1', title:'Basic First Aid',        sub:'SINOPEC' },
    { img:'proj2', title:'Confined Space Entry',   sub:'Excel Terrain' },
    { img:'proj3', title:'Fire Safety Training',   sub:'SINOPEC' },
    { img:'proj4', title:'Fire Safety Training',   sub:'SINOPEC' },
    { img:'proj5', title:'Authorised Gas Testing', sub:'SINOPEC' },
    { img:'proj6', title:'Defensive Driving',      sub:'PACKWACH' },
    { img:'proj7', title:'Water Safety Training',  sub:'BULISA' },
    { img:'proj8', title:'Graduates',              sub:'Kyanja, Kampala' }
  ];

  const lb = document.getElementById('lb');

  PROJECTS.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'gal' + (i === 0 ? ' big' : '');
    btn.innerHTML =
      `<img src="images/${p.img}.jpg" alt="${p.title}">` +
      `<span>${p.title}<em>${p.sub}</em></span>`;
    btn.addEventListener('click', () => {
      document.getElementById('lbImg').src = `images/${p.img}.jpg`;
      document.getElementById('lbCap').textContent = `${p.title} — ${p.sub}`;
      lb.showModal();
    });
    gallery.appendChild(btn);
  });

  if (lb) {
    lb.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => lb.close()));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  }
})();

/* ---- Contact page: course select + form ---- */
(function initContact() {
  const sel = document.getElementById('courseSel');
  if (!sel) return;

  COURSES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.title;
    opt.textContent = c.title;
    sel.appendChild(opt);
  });

  const enquiry = document.getElementById('enquiry');
  if (enquiry) {
    enquiry.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('formNote').textContent = 'Thank you. We will get back to you shortly.';
      e.target.reset();
    });
  }
})();

/* =========================================================
   HERO SLIDER (home page) — mobile uses 1-3, desktop uses 4-6
   ========================================================= */
let currentIndex = 0;
let autoPlayInterval;
let sliderReady = false;

const destinations = [
  { mobileImg:'images/1.jpg', desktopImg:'images/6.jpg', location:'Kampala, Uganda', title:'FIRE SAFETY<br>&amp; FIGHTING', desc:'Fire prevention, risk assessment, extinguisher use and emergency evacuation, taught by certified lead trainers.' },
  { mobileImg:'images/2.jpg', desktopImg:'images/5.jpg', location:'Kyanja Training Centre', title:'FIRE MARSHAL<br>TRAINING', desc:'Live, hands-on drills that build the skills to lead evacuations and manage fire incidents at work.' },
  { mobileImg:'images/3.jpg', desktopImg:'images/4.jpg', location:'On your site or ours', title:'ALARMS &amp;<br>DETECTION', desc:'Learn how detection and alarm systems work and how to respond the moment they sound.' }
];

function changeDestination(index) {
  const d = destinations[index];
  if (!d) return;
  currentIndex = index;
  const bg = document.getElementById('main-bg');
  if (bg) bg.style.backgroundImage = `url('${window.innerWidth <= 768 ? d.mobileImg : d.desktopImg}')`;
  const t = document.getElementById('title-text'), p = document.getElementById('desc-text'), l = document.getElementById('location-text');
  if (t) t.innerHTML = d.title;
  if (p) p.textContent = d.desc;
  if (l) l.textContent = d.location;
  document.querySelectorAll('.thumbnail-container .card').forEach((c, i) => c.classList.toggle('active', i === index));
}
function nextSlide() { changeDestination((currentIndex + 1) % destinations.length); }
function startAutoPlay() { stopAutoPlay(); autoPlayInterval = setInterval(nextSlide, 5000); }
function stopAutoPlay() { clearInterval(autoPlayInterval); }

function initSlider() {
  if (sliderReady || !document.getElementById('main-bg')) return;
  sliderReady = true;
  changeDestination(0);
  document.querySelectorAll('.thumbnail-container .card').forEach((card, i) => {
    card.addEventListener('click', () => { stopAutoPlay(); changeDestination(i); startAutoPlay(); });
  });
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => changeDestination(currentIndex), 250);
  });
  startAutoPlay();
}


/* ---- Team page: curved auto-sliding photo row ---- */
(function initTeamSlider() {
  const stage = document.getElementById('tmStage');
  if (!stage) return;
  const cards = Array.from(stage.children);
  const n = cards.length;
  let active = 0, timer;
  const small = () => window.innerWidth <= 700;

  function render() {
    const gap = small() ? 112 : 215, vis = small() ? 2 : 3, base = small() ? 120 : 150, step = small() ? 22 : 38;
    cards.forEach((c, i) => {
      let d = (((i - active) % n) + n) % n;
      if (d > n / 2) d -= n;
      const ad = Math.abs(d);
      c.style.opacity = ad > vis ? 0 : 1;
      c.style.height = (base + ad * step) + 'px';
      c.style.transform = `translate(-50%,-50%) translateX(${d * gap}px) rotateY(${-d * 16}deg)`;
      c.style.zIndex = 10 - ad;
    });
  }
  const next = () => { active = (active + 1) % n; render(); };
  const start = () => { stop(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(next, 2800); };
  const stop = () => clearInterval(timer);

  stage.addEventListener('mouseenter', stop);
  stage.addEventListener('mouseleave', start);
  window.addEventListener('resize', render);
  render();
  start();
})();


/* ---- Services page: auto-sliding split hero ---- */
(function initServicesHero() {
  const hero = document.getElementById('svHero');
  if (!hero) return;
  const texts = hero.querySelectorAll('.sv-t'), pics = hero.querySelectorAll('.sv-p'), dots = hero.querySelectorAll('.sv-dots button');
  let i = 0, timer;
  function show(n) {
    i = (n + texts.length) % texts.length;
    [texts, pics, dots].forEach(list => list.forEach((el, k) => el.classList.toggle('on', k === i)));
  }
  const start = () => { stop(); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => show(i + 1), 5000); };
  const stop = () => clearInterval(timer);
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  start();
})();
