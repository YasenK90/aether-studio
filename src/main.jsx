import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,useScroll,useTransform,useSpring,AnimatePresence} from 'framer-motion';
import './styles.css';

const projects=[
 {no:'01',title:'House of Silence',place:'Cairo, Egypt',year:'2026',tag:'Residential',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85'},
 {no:'02',title:'Monument / 28',place:'Lisbon, Portugal',year:'2025',tag:'Hospitality',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85'},
 {no:'03',title:'Casa Nera',place:'Marrakech, Morocco',year:'2025',tag:'Residential',image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=85'},
];

const EASE=[.16,1,.3,1];
const REDUCE=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=[{id:'work',label:'Work'},{id:'studio',label:'Studio'},{id:'approach',label:'Approach'},{id:'contact',label:'Contact'}];
const tickerItems=['Architecture','Interiors','Objects','Cairo','Lisbon','Marrakech','Quiet luxury','Est. 2012'];

const heroV={hidden:{},show:{transition:{staggerChildren:.1,delayChildren:.2}}};
const lineV={hidden:{y:'112%'},show:{y:'0%',transition:{duration:1,ease:EASE}}};
const projV={hidden:{opacity:0,y:70},show:{opacity:1,y:0,transition:{duration:.9,ease:EASE}}};
const fadeV={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:.8,ease:EASE}}};

function App(){
 const [menu,setMenu]=useState(false);
 const [pointer,setPointer]=useState({x:-100,y:-100});
 const [hover,setHover]=useState('');
 const [active,setActive]=useState('');
 const [time,setTime]=useState('');
 const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:150,damping:30,mass:.4});
 const heroY=useTransform(scrollYProgress,[0,.4],['0%',REDUCE?'0%':'-16%']);

 const hv=s=>({onMouseEnter:()=>setHover(s),onMouseLeave:()=>setHover('')});

 useEffect(()=>{
  const move=e=>setPointer({x:e.clientX,y:e.clientY});
  window.addEventListener('pointermove',move);
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-45% 0px -45% 0px'});
  document.querySelectorAll('main section[id]').forEach(s=>obs.observe(s));
  const tick=()=>setTime(new Date().toLocaleTimeString('en-GB',{timeZone:'Africa/Cairo',hour:'2-digit',minute:'2-digit'}));
  tick();
  const id=setInterval(tick,15000);
  return()=>{window.removeEventListener('pointermove',move);obs.disconnect();clearInterval(id)};
 },[]);

 useEffect(()=>{
  document.body.style.overflow=menu?'hidden':'';
  const k=e=>{if(menu&&e.key==='Escape')setMenu(false)};
  window.addEventListener('keydown',k);
  return()=>{document.body.style.overflow='';window.removeEventListener('keydown',k)};
 },[menu]);

 return <div className="site">
  <div className="grain" aria-hidden="true"/>
  <div className="cursor" style={{left:pointer.x,top:pointer.y}} aria-hidden="true">
    <span className="cursorLabel">View</span>
  </div>

  <header className="nav">
    <a href="#top" className="logo" {...hv('link')}>Aether<span>Studio</span></a>
    <div className="navRight">
      <span className="navPlaces">Cairo / Lisbon / Marrakech</span>
      <button className="menuBtn" onClick={()=>setMenu(true)} aria-label="Open menu" {...hv('link')}>Menu <i>↗</i></button>
    </div>
    <motion.i className="navProgress" style={{scaleX:progress}} aria-hidden="true"/>
  </header>

  <AnimatePresence>{menu&&(
   <motion.div className="overlay" initial={{y:'-100%'}} animate={{y:0}} exit={{y:'-100%'}} transition={{duration:.7,ease:[.77,0,.18,1]}} role="dialog" aria-modal="true" aria-label="Menu">
    <div className="overlayBar">
      <span className="mono muted">Navigate</span>
      <button className="close" onClick={()=>setMenu(false)} aria-label="Close menu" {...hv('link')}>Close <i>×</i></button>
    </div>
    <nav className="menuLinks">
      {nav.map((s,i)=>(
       <motion.a key={s.id} href={'#'+s.id} onClick={()=>setMenu(false)} initial={{y:'115%'}} animate={{y:'0%'}} transition={{delay:.18+i*.07,duration:.75,ease:EASE}} {...hv('link')}>
         <span className="menuIdx">{String(i+1).padStart(2,'0')}</span>
         <span className="menuName">{s.label}</span>
         <span className="menuArrow">↗</span>
       </motion.a>))}
    </nav>
    <div className="overlayFoot mono">
      <span>Independent architecture &amp; interiors</span>
      <a href="mailto:hello@aether.studio" {...hv('link')}>hello@aether.studio</a>
      <span>{time||'--:--'} Cairo</span>
    </div>
   </motion.div>)}
  </AnimatePresence>

  <nav className="rail" aria-hidden="true">
    {nav.map((s,i)=><span key={s.id} className={active===s.id?'on':''}>{String(i+1).padStart(2,'0')}</span>)}
  </nav>

  <main id="top">
   <section className="hero">
    <motion.div className="heroMeta mono" initial={REDUCE?false:{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:.7}}>
      <span><i className="sq"/>Architecture / Interiors</span>
      <span>Est. 2012 — Cairo</span>
    </motion.div>

    <div className="heroTitleWrap">
      <motion.div className="heroTitle" style={{y:heroY}} initial={REDUCE?'show':'hidden'} animate="show" variants={heroV}>
        <span className="line"><motion.span className="lineIn" variants={lineV}>We make</motion.span></span>
        <span className="line"><motion.span className="lineIn serif" variants={lineV}>Space</motion.span></span>
        <span className="line"><motion.span className="lineIn" variants={lineV}>feel <em>inevitable.</em></motion.span></span>
      </motion.div>
    </div>

    <motion.div className="heroBottom" initial={REDUCE?false:{opacity:0}} animate={{opacity:1}} transition={{delay:1.1,duration:.7}}>
      <p>We design quiet, enduring places where material, light and life meet without compromise.</p>
      <a href="#work" className="circleLink" {...hv('link')}>Explore<br/>work <b>↓</b></a>
    </motion.div>
   </section>

   <div className="ticker" aria-hidden="true">
    <div className="tickerTrack">
      {[0,1].map(g=><div className="tickerGroup" key={g}>
        {tickerItems.map((t,i)=><span key={g+'-'+i}>{t}<i>◆</i></span>)}
      </div>)}
    </div>
   </div>

   <section id="work" className="work section">
    <div className="sectionHead"><span className="shLabel"><i className="sq"/>Selected work</span><span className="shCount">01 — 03</span></div>
    {projects.map((p,i)=><motion.article className="project" key={p.no} variants={projV} initial={REDUCE?'show':'hidden'} whileInView="show" viewport={{once:true,amount:.15}}>
      <div className="projectTop mono"><span className="pno">{p.no}</span><span>{p.tag}</span><span>{p.year}</span></div>
      <div className="projectImage" {...hv('view')}>
        <img src={p.image} alt={`${p.title}, ${p.place}`} loading={i?'lazy':'eager'} decoding="async" draggable="false"/>
        <div className="imageVeil"/>
        <span className="projectNo" aria-hidden="true">{p.no}</span>
      </div>
      <div className="projectInfo">
        <h2>{p.title}</h2>
        <span className="pPlace mono">{p.place}</span>
        <a className="projLink mono" href="#contact" {...hv('link')}>View project <b>↗</b></a>
      </div>
    </motion.article>)}
   </section>

   <section id="studio" className="manifesto section">
    <div className="sectionHead"><span className="shLabel"><i className="sq"/>The studio</span><span className="shCount">02</span></div>
    <div className="manifestoGrid">
      <motion.h2 className="manifestoTitle" variants={fadeV} initial={REDUCE?'show':'hidden'} whileInView="show" viewport={{once:true,amount:.4}}>Less,<br/><em>better.</em></motion.h2>
      <div className="manifestoCopy">
        <p className="lead">Architecture should not ask for attention. It should earn it over time.</p>
        <p>We work across architecture, interiors and objects with a conviction that the best spaces are composed through restraint: honest materials, precise proportions, and light treated as a building material.</p>
        <div className="stats mono">
          <span><b>14</b> years in practice</span>
          <span><b>40+</b> completed works</span>
          <span><b>03</b> cities</span>
        </div>
        <a className="textLink mono" href="#approach" {...hv('link')}>Our approach <b>→</b></a>
      </div>
    </div>
   </section>

   <section id="approach" className="approach section">
    <div className="sectionHead"><span className="shLabel"><i className="sq"/>How we work</span><span className="shCount">03</span></div>
    <div className="approachRows">
      {[['01','Observe','We begin with the life of a place, not its image.'],
        ['02','Edit','Every line earns its presence. Nothing decorative survives by accident.'],
        ['03','Build','We stay close to material, craft and construction until the final detail.']].map(r=>
       <motion.div className="approachRow" key={r[0]} variants={projV} initial={REDUCE?'show':'hidden'} whileInView="show" viewport={{once:true,amount:.4}} onMouseEnter={()=>setHover('link')} onMouseLeave={()=>setHover('')}>
         <span className="rowNo mono">{r[0]}</span>
         <h3>{r[1]}</h3>
         <p>{r[2]}</p>
         <b className="rowArrow">↗</b>
       </motion.div>)}
    </div>
   </section>

   <section id="contact" className="contact section">
    <div className="contactTop mono"><span className="shLabel"><i className="sq"/>Start a conversation</span><span>04 — {time||'--:--'} Cairo</span></div>
    <div className="contactMain">
      <motion.h2 initial={REDUCE?false:{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:.9,ease:EASE}} viewport={{once:true,amount:.4}}>Have a place<br/>in mind<span className="q">?</span></motion.h2>
      <a href="mailto:hello@aether.studio" className="email mono" {...hv('link')}>hello@aether.studio <b>↗</b></a>
    </div>
    <footer className="mono">
      <span>© 2026 Aether Studio</span>
      <span>Cairo · Lisbon · Marrakech</span>
      <span className="footLinks">
        <a href="#top" {...hv('link')}>Instagram</a>
        <a href="#top" {...hv('link')}>Pinterest</a>
        <a href="#top" className="toTop" {...hv('link')}>Back to top ↑</a>
      </span>
    </footer>
   </section>
  </main>
 </div>
}

createRoot(document.getElementById('root')).render(<App/>);
