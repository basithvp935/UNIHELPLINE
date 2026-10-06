(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const U='https://unihelpline.com/public/uploads/universities/';
const unis=[["University of Georgia","Georgia",U+"17156336401715633640.png","University@of@Georgia"],["Swansea University","United Kingdom",U+"16617549451661754945.jpg","Swansea@University"],["University of Information Technology and Management in Rzeszow","Poland",U+"16548644011654864401.png","University@of@Information@Technology@and@Management@in@Rzeszow"],["Gannon University","USA",U+"16483268811648326881.jpg","Gannon@Univeristy"],["Trent University","Canada",U+"16901892501690189250.jpg","Trent@University"],["Southern Illinois University Carbondale","USA",U+"17290934941729093494.jpeg","Southern@Illinois@University@Carbondale"],["Ulster University – Belfast","United Kingdom",U+"16461710981646171098.png","Ulster@University@-@Belfast"],["Technological University Dublin","Ireland",U+"16777636461677763646.jpg","Technological@University@Dublin"],["University of Europe for Applied Sciences","Germany",U+"17447255421744725542.png","University@of@Europe@for@Applied@Sciences"],["University of the Fraser Valley","Canada",U+"16901895171690189517.jpg","Univeristy@of@Fraser@valley"],["Dublin City University","Ireland",U+"16777636461677763646.jpg","Dublin@City@University"],["University of Greenwich","United Kingdom",U+"16461710981646171098.png","University@of@Greenwich"]];
const C='https://unihelpline.com/search_cat_course/';
const cats=[["Business","bi-briefcase",2,[["Finance",8],["Accounting",11],["Business Management",12],["Marketing",14],["MBA",32],["Banking",57],["Insurance",58],["Risk Management",59]]],
["Engineering","bi-gear-wide-connected",1,[["Mechanical Engineering",3],["Civil Engineering",9],["Electronic Engineering",10],["Aerospace Engineering",15],["Electrical",26],["Construction",27],["Architecture Engineering",28],["Automobile Engineering",33]]],
["Computer Science","bi-cpu",6,[["Data Science and Analytics",34],["Cyber Security / Information Security",35],["Computer Science, Software Development",41],["Artificial Intelligence and Machine Learning",122],["IT Business Analysis",123],["Computer Information Systems",124],["Computer Technology",125],["Computer / Game Programing",126]]],
["Science","bi-radioactive",4,[["Food Science",18],["Chemistry",19],["Biology",20],["Physics",21],["Environmental Science and Marine Science",22],["Psychology",23],["Health Science",31],["Veterinarian & Animal",38]]],
["Health","bi-heart-pulse",3,[["Nursing",1],["Medicine",5],["Physiology",6],["Health and Safety",7],["Physiotherapy / Physical Therapy",13],["Health Care and Management",36],["Dental",40],["Dietetics, Food and Nutrition",43]]],
["Automotive & Transportation","bi-truck",5,[["Automotive",29],["Transport Management",30],["Aviation",314]]],
["Social Service","bi-people",10,[["Counselling",158],["Child Care",159],["Community Development",160],["Personal Support Work",161],["Social History",162],["Social Work",163],["Politics",176],["Special Educational Needs and Disabilities",179]]],
["Education","bi-book",9,[["Language and Linguistics",151],["TESOL",155],["Education and Educational Studies",164],["Educational Leadership",165],["Childhood Studies",167],["Philosophy",173],["Sports Coaching",178],["Physical Education",181]]],
["Arts","bi-palette",7,[["Creative Writing",140],["Languages and Cultures",141],["Journalism",142],["Music, Media, Multimedia & Performance",143],["Theology and Religious Studies",144],["History, Anthropology and Archaeology",145],["Art, Fine Arts and Design",146],["Drama, Theatre",147]]],
["Law","bi-bank2",8,[["Law",149],["Criminology",150],["Forensic",170],["Human Rights",205],["Commercial Law",221],["Maritime Law",272],["Legal Practice",274],["Tax Law",302]]]];
const dests=["United Kingdom","United States of America","Ireland","Canada","Germany","Georgia","Hungary","Poland","Malta","France","Dubai / UAE"];

/* typewriter effect on hero heading (3-phrase continuous loop) */
const twText = $('#typewriter-text');
if (twText) {
    const phrases = [
        "the perfect course.",
        "top universities.",
        "your dream career."
    ];
    let pIdx = 0;
    let charIdx = phrases[0].length;
    let isDeleting = true;

    function typeLoop() {
        const current = phrases[pIdx];

        if (isDeleting) {
            charIdx--;
            twText.textContent = current.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                setTimeout(typeLoop, 350);
                return;
            }
            setTimeout(typeLoop, 45);
        } else {
            charIdx++;
            twText.textContent = current.substring(0, charIdx);
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2000);
                return;
            }
            setTimeout(typeLoop, 75 + Math.random() * 30);
        }
    }

    // Start deleting after initial 1.6s so the user reads the initial heading
    setTimeout(typeLoop, 1600);
}

/* marquees */
const names=unis.map(u=>u[0]);const mq1=$('#mq1');if(mq1)mq1.innerHTML=[...names,...names].map(x=>'<span>'+x+'</span>').join('');
const dslugMap = {
    "United Kingdom": "uk",
    "United States of America": "usa",
    "Ireland": "ireland",
    "Canada": "canada",
    "Georgia": "georgia",
    "Hungary": "hungary",
    "Poland": "poland",
    "Malta": "malta",
    "France": "france",
    "Dubai / UAE": "dubai",
    "Germany": "france"
};
const dhalf=[...dests,...dests];
const dh=[...dhalf,...dhalf].map(x=>{
    const c = dslugMap[x] || 'uk';
    return `<a href="destination-detail.html?c=${c}"><span>${x}</span></a>`;
}).join('');
const d1El=$('#d1'), d2El=$('#d2');
if(d1El) d1El.innerHTML=dh;
if(d2El) d2El.innerHTML=dh;

/* universities + wishlist */
const wl=new Set(),mono=n=>n.split(' ').filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
const us=$('#us');
function rwl(){
    const wc=$('#wc'), wlb=$('#wlb');
    if(wc) wc.textContent=wl.size;
    if(wlb) wlb.innerHTML=wl.size?[...wl].map(i=>`<div class="wli"><span>${unis[i][0]}</span><a href="university-detail.html?u=${encodeURIComponent(unis[i][0])}" class="acc" title="View Profile"><i class="bi bi-box-arrow-up-right"></i></a></div>`).join(''):'<p class="text-secondary">Your wishlist is empty. Tap the heart on a university to save it.</p>';
    $$('.hrt').forEach(b=>{const on=wl.has(+b.dataset.i);b.classList.toggle('on',on);b.firstChild.className='bi bi-heart'+(on?'-fill':'')});
}
if(us){
    us.innerHTML=unis.map((u,i)=>`<div class="uc rv" data-rv="up"><div class="lg"><img src="${u[2]}" alt="${u[0]}" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=mono>${mono(u[0])}</span>'"></div><div class="uc-body"><span class="uc-badge"><i class="bi bi-patch-check-fill"></i> Partner</span><h6 title="${u[0]}">${u[0]}</h6><div class="uc-loc"><i class="bi bi-geo-alt-fill"></i><span>${u[1]}</span></div></div><div class="rb"><a class="vp" href="university-detail.html?u=${encodeURIComponent(u[0])}"><span>View profile</span><i class="bi bi-arrow-up-right"></i></a><button class="hrt" data-i="${i}" aria-label="Add to wishlist"><i class="bi bi-heart"></i></button></div></div>`).join('');
    us.addEventListener('click',e=>{const b=e.target.closest('.hrt');if(!b)return;const i=+b.dataset.i;wl.has(i)?wl.delete(i):wl.add(i);rwl()});
}
rwl();

/* auto-slider & controls (smooth full slide: 4 columns on desktop, 2 on mobile) */
const getColsPerPage = () => window.innerWidth >= 992 ? 4 : 2;
const getSlideAmount = () => {
    if(!us) return 310;
    const c = us.querySelector('.uc');
    if(!c) return 310;
    const gap = window.innerWidth >= 992 ? 20 : 10;
    return (c.offsetWidth + gap) * getColsPerPage();
};

const slideNext = () => {
    if(!us) return;
    const amount = getSlideAmount();
    const maxScroll = us.scrollWidth - us.clientWidth;
    if(us.scrollLeft >= maxScroll - 15){
        us.scrollTo({left: 0, behavior: 'smooth'});
    }else{
        const target = Math.min(us.scrollLeft + amount, maxScroll);
        us.scrollTo({left: target, behavior: 'smooth'});
    }
};

const slidePrev = () => {
    if(!us) return;
    const amount = getSlideAmount();
    const maxScroll = us.scrollWidth - us.clientWidth;
    if(us.scrollLeft <= 15){
        us.scrollTo({left: maxScroll, behavior: 'smooth'});
    }else{
        const target = Math.max(us.scrollLeft - amount, 0);
        us.scrollTo({left: target, behavior: 'smooth'});
    }
};

let autoTimer=null,isHover=false;
const startAuto=()=>{
    stopAuto();
    if(rm||!us)return;
    autoTimer=setInterval(()=>{if(!isHover&&!dn)slideNext()},3800);
};
const stopAuto=()=>{if(autoTimer){clearInterval(autoTimer);autoTimer=null}};

const pv=$('#pv'), nx=$('#nx');
if(pv) pv.onclick=()=>{slidePrev();startAuto()};
if(nx) nx.onclick=()=>{slideNext();startAuto()};

/* pagination dots for sets of 4 columns / 8 cards (desktop) or 2 columns / 4 cards (mobile) */
const dotsWrap=$('#uni-dots');
function renderDots(){
    if(!dotsWrap)return;
    const colsPerPage=getColsPerPage();
    const cardsPerPage=colsPerPage*2;
    const pages=Math.ceil(unis.length/cardsPerPage);
    dotsWrap.innerHTML=Array.from({length:pages},(_,i)=>`<button class="uni-dot ${i===0?'active':''}" data-page="${i}" aria-label="Page ${i+1}"></button>`).join('');
}
renderDots();

function updateDots(){
    if(!dotsWrap||!us)return;
    const step=getSlideAmount();
    if(!step)return;
    const activeIdx=Math.min(Math.round(us.scrollLeft/step),$$('.uni-dot',dotsWrap).length-1);
    $$('.uni-dot',dotsWrap).forEach((d,i)=>d.classList.toggle('active',i===activeIdx));
}
if(us) us.addEventListener('scroll',updateDots,{passive:true});

dotsWrap&&dotsWrap.addEventListener('click',e=>{
    if(!us)return;
    const d=e.target.closest('.uni-dot');
    if(!d)return;
    const page=+d.dataset.page;
    const step=getSlideAmount();
    us.scrollTo({left:page*step,behavior:'smooth'});
    startAuto();
});

addEventListener('resize',()=>{renderDots();updateDots()});

let dn=false,sx=0,sl=0,mv=false;
if(us){
    us.addEventListener('mouseenter',()=>{isHover=true});
    us.addEventListener('mouseleave',()=>{isHover=false});
    const arw=$('.arw');
    if(arw){arw.addEventListener('mouseenter',()=>{isHover=true});arw.addEventListener('mouseleave',()=>{isHover=false})}
    
    let touchStartX = 0, touchStartY = 0;
    us.addEventListener('touchstart', e => {
        isHover = true;
        if(e.touches && e.touches[0]){
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    us.addEventListener('touchend', e => {
        setTimeout(() => { isHover = false; }, 1200);
        if(e.changedTouches && e.changedTouches[0]){
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if(Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)){
                if(dx < 0){
                    slideNext();
                }else{
                    slidePrev();
                }
            }
        }
    }, { passive: true });

    us.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dn=true;mv=false;sx=e.clientX;sl=us.scrollLeft;us.style.scrollSnapType='none'});
    addEventListener('pointermove',e=>{if(!dn)return;const d=e.clientX-sx;if(Math.abs(d)>4)mv=true;us.scrollLeft=sl-d});
    addEventListener('pointerup',()=>{if(dn){dn=false;us.style.scrollSnapType='';startAuto()}});
    us.addEventListener('click',e=>{if(mv){e.preventDefault();e.stopPropagation();mv=false}},true);
    startAuto();
}

/* courses */
const cb=$('#cats'),cpn=$('#cpan');
if(cb && cpn){
    cats.forEach((c,i)=>{const b=document.createElement('button');b.innerHTML=`<i class="bi ${c[1]}"></i>${c[0]}`;b.onclick=()=>sc(i);cb.append(b)});
    function sc(i){const c=cats[i];$$('button',cb).forEach((b,j)=>b.classList.toggle('on',j===i));cpn.innerHTML=`<div class="pin"><h3>${c[0]}</h3><div class="cg">${c[3].map(x=>`<a href="${C+x[1]}" target="_blank" rel="noopener">${x[0]}<i class="bi bi-arrow-up-right"></i></a>`).join('')}</div><a class="btn-o" href="https://unihelpline.com/getdepcourses/${c[2]}" target="_blank" rel="noopener">View all ${c[0]} →</a></div>`}
    sc(0);
}

/* search */
const idx=cats.flatMap(c=>c[3].map(x=>({t:x[0],c:c[0],u:C+x[1]}))),q=$('#q'),res=$('#res');
if(q && res){
    q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();if(!v){res.style.display='none';return}const m=idx.filter(x=>x.t.toLowerCase().includes(v)).slice(0,8);res.innerHTML=m.length?m.map(x=>`<a href="${x.u}" target="_blank" rel="noopener"><span>${x.t}</span><small>${x.c}</small></a>`).join(''):'<a href="#contact"><span>No match. Ask our counsellors</span></a>';res.style.display='block'});
    document.addEventListener('click',e=>{if(!e.target.closest('#sf'))res.style.display='none'});
    const sf=$('#sf');
    if(sf){
        sf.addEventListener('submit',e=>{e.preventDefault();const v=q.value.trim().toLowerCase(),m=idx.filter(x=>x.t.toLowerCase().includes(v)).slice(0,3),sm=$('#smsg');if(sm)sm.innerHTML=`<strong>${$('#level').value}</strong> in <strong>${$('#country').value}</strong>${v?' for “'+q.value+'”':''}. `+(v&&m.length?m.map(x=>`<a class="acc" href="${x.u}" target="_blank" rel="noopener">${x.t}</a>`).join(' · ')+' · ':'')+'<a class="acc" href="#contact">Ask a counsellor</a>';res.style.display='none'});
    }
}
$$('.cmd-tag').forEach(b=>b.addEventListener('click',()=>{if(q){q.value=b.dataset.kw;q.dispatchEvent(new Event('input'));q.focus()}}));

/* about more */
const more=$('#more'),rmb=$('#rm');if(rmb&&more){rmb.onclick=()=>{const o=more.style.maxHeight;more.style.maxHeight=o?'':more.scrollHeight+'px';rmb.firstChild.textContent=o?'Read more':'Show less'};}

/* services expand + mobile slider */
const sxTrack=$('#sx'),sxCards=$$('#sx .ex'),sxDots=$$('#sx-dots .sx-dot'),sxPrev=$('#sx-prev'),sxNext=$('#sx-next');
let curSx=0;
sxCards.forEach((c,i)=>{if(c.classList.contains('on'))curSx=i});

function goSx(i){
    i=Math.max(0,Math.min(sxCards.length-1,i));
    curSx=i;
    const c=sxCards[i];
    if(c&&sxTrack&&window.innerWidth<992){
        sxTrack.scrollTo({left:c.offsetLeft-sxTrack.offsetLeft,behavior:'smooth'});
    }
    sxCards.forEach((y,idx)=>{
        const isOn = idx===i;
        y.classList.toggle('on',isOn);
        y.setAttribute('aria-expanded',isOn?'true':'false');
    });
    sxDots.forEach((d,idx)=>d.classList.toggle('on',idx===i));
}

sxCards.forEach((x,i)=>{
    x.setAttribute('tabindex','0');
    x.setAttribute('role','button');
    x.setAttribute('aria-expanded',x.classList.contains('on')?'true':'false');
    
    x.addEventListener('click',e=>{
        if(e.target.closest('a, button:not(.ex)'))return;
        goSx(i);
    });
    
    x.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){
            if(e.target.closest('a'))return;
            e.preventDefault();
            goSx(i);
        }
    });
});
sxDots.forEach((d,i)=>d.addEventListener('click',()=>goSx(i)));
if(sxPrev)sxPrev.addEventListener('click',()=>goSx(curSx-1));
if(sxNext)sxNext.addEventListener('click',()=>goSx(curSx+1));
if(sxTrack){
    let sxt;
    sxTrack.addEventListener('scroll',()=>{
        if(window.innerWidth>=992)return;
        clearTimeout(sxt);
        sxt=setTimeout(()=>{
            const sl=sxTrack.scrollLeft;
            let best=0,minD=Infinity;
            sxCards.forEach((c,i)=>{
                const d=Math.abs((c.offsetLeft-sxTrack.offsetLeft)-sl);
                if(d<minD){minD=d;best=i;}
            });
            curSx=best;
            sxCards.forEach((y,idx)=>y.classList.toggle('on',idx===best));
            sxDots.forEach((d,idx)=>d.classList.toggle('on',idx===best));
        },60);
    },{passive:true});
}

/* news knowledge hub mobile slider */
const newsTrack=$('#news-track'),newsCols=$$('#news-track .bl-col'),newsDots=$$('#news-dots .news-dot'),newsPrev=$('#news-prev'),newsNext=$('#news-next');
let curNews=0;
function goNews(i){
    if(!newsTrack||!newsCols.length)return;
    i=Math.max(0,Math.min(newsCols.length-1,i));
    curNews=i;
    const col=newsCols[i];
    if(col){
        newsTrack.scrollTo({left:col.offsetLeft-newsTrack.offsetLeft,behavior:'smooth'});
    }
    newsDots.forEach((d,idx)=>d.classList.toggle('on',idx===i));
}
newsDots.forEach((d,i)=>d.addEventListener('click',()=>goNews(i)));
if(newsPrev)newsPrev.addEventListener('click',()=>goNews(curNews-1));
if(newsNext)newsNext.addEventListener('click',()=>goNews(curNews+1));
if(newsTrack){
    let newsTimer;
    newsTrack.addEventListener('scroll',()=>{
        if(window.innerWidth>=992)return;
        clearTimeout(newsTimer);
        newsTimer=setTimeout(()=>{
            const sl=newsTrack.scrollLeft;
            let best=0,minD=Infinity;
            newsCols.forEach((c,i)=>{
                const d=Math.abs((c.offsetLeft-newsTrack.offsetLeft)-sl);
                if(d<minD){minD=d;best=i;}
            });
            curNews=best;
            newsDots.forEach((dot,idx)=>dot.classList.toggle('on',idx===best));
        },60);
    },{passive:true});
}

/* contact tabs + forms */
function tab(t){$$('.ctab button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));$('#f-enq').classList.toggle('d-none',t!=='enq');$('#f-meet').classList.toggle('d-none',t!=='meet')}
$$('.ctab button').forEach(b=>b.onclick=()=>tab(b.dataset.t));$$('[data-tab]').forEach(a=>a.addEventListener('click',()=>tab(a.dataset.tab)));
$$('.enq').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();$('.msg',f).textContent='Thank you! We will contact you soon.';f.reset()}));

/* back to top */
const topBtn = $('#top') || $('#btt');
if (topBtn) topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -4% 0px'});
$$('.rv').forEach(el=>{if(!el.style.getPropertyValue('--d')){const k=[...el.parentNode.children].indexOf(el);el.style.setProperty('--d',Math.min(k,7)*.08+'s')}rm?el.classList.add('in'):io.observe(el)});

/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.n;let c=0;const s=Math.max(1,Math.ceil(t/70));const iv=setInterval(()=>{c=Math.min(t,c+s);el.textContent=c.toLocaleString()+(c===t&&el.dataset.plus?'+':'');if(c===t)clearInterval(iv)},22);cio.unobserve(el)}),{threshold:.6});
$$('[data-n]').forEach(el=>cio.observe(el));

/* scroll: progress, nav, journey line, destination marquees */
const nv=$('.npill'),pg=$('#prog'),tp=$('#top'),jr=$('#jr'),js=$$('.js2'),d1=$('#d1'),d2=$('#d2'),dsec=$('#destinations');let tk=false;
function onS(){
    const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    if(pg)pg.style.width=(y/h*100)+'%';
    if(nv)nv.classList.toggle('sc',y>40);
    if(tp)tp.classList.toggle('show',y>800);
    if(jr){
        const r=jr.getBoundingClientRect();
        const isMob=window.innerWidth<992;
        if(isMob){
            const p=Math.max(0,Math.min(1,(innerHeight*0.72-r.top)/(r.height*0.82)));
            jr.style.setProperty('--p',p);
            js.forEach(s=>{
                const sr=s.getBoundingClientRect();
                s.classList.toggle('lit',sr.top<innerHeight*0.75);
            });
        }else{
            const p=Math.max(0,Math.min(1,(innerHeight*.75-r.top)/(r.height+innerHeight*.2)));
            jr.style.setProperty('--p',p);
            js.forEach((s,i)=>s.classList.toggle('lit',p>=i/4-.02&&p>0));
        }
    }
    tk=false;
}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});addEventListener('resize',onS);onS();
js.forEach(s=>{s.addEventListener('click',()=>s.classList.add('lit'))});

/* spotlight on bento */
document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const c=e.target.closest&&e.target.closest('.bc');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}});

/* universal smooth scrolling for all anchor links with navbar offset & mobile menu close */
document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const c = $('#nv');
    const isOpen = c && c.classList.contains('show');

    const doScroll = () => {
        const navPill = document.querySelector('.npill');
        const offset = (navPill ? navPill.offsetHeight : 70) + 15;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
        history.pushState(null, '', href);
    };

    if (isOpen && window.bootstrap) {
        const inst = bootstrap.Collapse.getInstance(c) || new bootstrap.Collapse(c, { toggle: false });
        // Listen for collapse to finish, then scroll
        c.addEventListener('hidden.bs.collapse', function onHidden() {
            c.removeEventListener('hidden.bs.collapse', onHidden);
            doScroll();
        });
        inst.hide();
    } else {
        doScroll();
    }
});

/* Touch and click handling for navbar dropdowns */
document.querySelectorAll('.npill .dropdown').forEach(dd => {
    const toggle = dd.querySelector('.dropdown-toggle');
    const menu = dd.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    // Ensure dropdown items navigate reliably on touch/mobile
    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', e => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                // Ensure page navigation occurs smoothly
                window.location.href = href;
            }
        });
    });
});
})();

