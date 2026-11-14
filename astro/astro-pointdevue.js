/* ===== Arcanes · Astrologie : changer de point de vue =====
   Entre la roue du Ciel du jour et l'Observatoire astral : un même instant vu de la Terre (le ciel de l'astrologie)
   puis vu du Soleil (le système solaire), avec un passage animé de l'un à l'autre et une date partagée.
   L'Observatoire (astro/observatoire.html) n'est pas modifié : on ne fait que lui passer la date par son adresse,
   et écouter celle qu'il annonce. plus.js appelle ArcanesPV.mount(slot) quand il installe l'Observatoire. */
(() => {
  const T = "︎", rad = Math.PI/180, DAY = 864e5;
  const norm = a => ((a % 360) + 360) % 360;
  const SG = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"], EL = ["feu","terre","air","eau"];
  const SIG = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  const BOD = [
    {id:"mercure", b:"Mercury", gl:"☿", nom:"Mercure", r:46},
    {id:"venus", b:"Venus", gl:"♀", nom:"Vénus", r:70},
    {id:"mars", b:"Mars", gl:"♂", nom:"Mars", r:118},
    {id:"jupiter", b:"Jupiter", gl:"♃", nom:"Jupiter", r:144},
    {id:"saturne", b:"Saturn", gl:"♄", nom:"Saturne", r:166},
    {id:"uranus", b:"Uranus", gl:"♅", nom:"Uranus", r:184},
    {id:"neptune", b:"Neptune", gl:"♆", nom:"Neptune", r:199},
    {id:"pluton", b:"Pluto", gl:"♇", nom:"Pluton", r:212}
  ];
  const RE = 94, RG = 196;                 // l'orbite de la Terre, l'anneau des planètes vues de la Terre
  const xy = (lon, r) => [-r*Math.cos(lon*rad), r*Math.sin(lon*rad)];   // 0° Bélier à gauche, sens inverse des aiguilles
  const f = n => n.toFixed(1);
  const ease = x => x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3)/2;
  const reduce = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmtDeg = l => { l = norm(l); return `${Math.floor(l % 30)}° ${SIG[Math.floor(l/30)]}`; };

  function pos(t){
    const A = window.Astronomy, d = new Date(t), d1 = new Date(t - DAY/2), d2 = new Date(t + DAY/2);
    const geo = (B, dd) => A.Ecliptic(A.GeoVector(B, dd, true)).elon;
    const sun = A.SunPosition(d).elon, out = {sun, earth:norm(sun + 180), moon:A.EclipticGeoMoon(d).lon, P:{}};
    BOD.forEach(p => { const B = A.Body[p.b]; const g = geo(B, d), v = ((geo(B, d2) - geo(B, d1) + 540) % 360) - 180;
      out.P[p.id] = {geo:g, helio:A.Ecliptic(A.HelioVector(B, d)).elon, retro:v < 0}; });
    // sur l'anneau, on écarte un peu les astres trop proches, comme sur la roue du thème
    const items = [{id:"sun", l:sun}, {id:"moon", l:out.moon}, ...BOD.map(p => ({id:p.id, l:out.P[p.id].geo}))].sort((a, b) => norm(a.l) - norm(b.l)).map(x => ({...x, d:norm(x.l)}));
    for(let it = 0; it < 8; it++) for(let i = 0; i < items.length; i++){ const pv = items[(i - 1 + items.length) % items.length], c = items[i], diff = norm(c.d - pv.d);
      if(diff < 7.5){ const push = (7.5 - diff)/2; c.d = norm(c.d + push); pv.d = norm(pv.d - push); } }
    out.ring = Object.fromEntries(items.map(x => [x.id, x.d]));
    return out;
  }

  function scene(){
    let s = `<svg class="pv-svg" viewBox="-262 -262 524 524" role="img" aria-label="Les planètes vues de la Terre ou du Soleil">`;
    s += `<circle r="252" class="pv-out"/><circle r="222" class="pv-in"/>`;
    for(let k = 0; k < 12; k++){ const [x1, y1] = xy(30*k, 222), [x2, y2] = xy(30*k, 252), [tx, ty] = xy(30*k + 15, 237);
      s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="pv-div"/><text x="${f(tx)}" y="${f(ty)}" class="pv-sg el-${EL[k % 4]}">${SG[k]}${T}</text>`; }
    for(let d = 0; d < 360; d += 5){ if(d % 30){ const [x1, y1] = xy(d, 222), [x2, y2] = xy(d, d % 10 ? 226 : 229); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="pv-tick"/>`; } }
    s += `<g class="pv-orbits">${[...BOD.map(p => p.r), RE].map(r => `<circle r="${r}"/>`).join("")}</g>`;
    s += `<g class="pv-ring"><circle r="${RG}"/></g>`;
    s += `<g class="pv-sight">${BOD.map(p => `<line data-pvl="${p.id}"/>`).join("")}<line data-pvl="sun"/><line data-pvl="moon"/></g>`;
    s += `<g class="pv-bodies">`;
    s += `<g class="pv-b sun" data-pvb="sun"><circle r="15"/><text>☉${T}</text></g>`;
    s += `<g class="pv-b earth" data-pvb="earth"><circle r="11"/><text>⊕${T}</text></g>`;
    s += `<g class="pv-b moon" data-pvb="moon"><circle r="7"/><text>☽${T}</text></g>`;
    BOD.forEach(p => s += `<g class="pv-b pl" data-pvb="${p.id}" tabindex="0" role="button" aria-label="${p.nom}"><circle r="11"/><text>${p.gl}${T}</text><text class="pv-rx" x="12" y="-10">℞</text></g>`);
    s += `</g></svg>`;
    return s;
  }

  function mount(slot){
    if(!slot || slot.querySelector("[data-pv]") || !window.Astronomy) return;
    const cw = window.ArcanesAstro && window.ArcanesAstro.cielWhen && window.ArcanesAstro.cielWhen();
    const base = (cw || new Date()).getTime();
    const S = {t:base, base, k:0, target:0, play:false, sel:null, raf:0, last:0};
    const sec = document.createElement("section");
    sec.className = "pv"; sec.dataset.pv = "";
    sec.innerHTML = `<div class="pv-head"><p class="eyebrow">Changer de point de vue</p><h2>De la roue au système solaire</h2>
        <p class="pv-lede">La roue du ciel place la Terre au centre ; le système solaire place le Soleil au centre. C'est le même ciel, au même instant : passe de l'un à l'autre pour voir ce qui change, et ce qui ne change pas.</p><div class="pv-seg" role="group" aria-label="Point de vue"><button type="button" data-pvm="0" aria-pressed="true">Vu de la Terre</button><button type="button" data-pvm="1" aria-pressed="false">Vu du Soleil</button></div></div>
      <div class="pv-grid"><figure class="pv-fig">${scene()}<figcaption class="help pv-cap"></figcaption></figure>
        <div class="pv-side">
          <div class="pv-txt" aria-live="polite"></div>
          <div class="pv-time"><div class="pv-trow"><button type="button" class="pv-play" data-pvplay aria-label="Faire avancer le temps"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
            <input type="range" min="-365" max="365" step="1" value="0" data-pvr aria-label="Avancer ou reculer de jours, un an de chaque côté"></div>
            <p class="pv-date"><span data-pvd></span><button type="button" class="linkbtn" data-pvnow hidden>Revenir au ${cw ? "moment choisi" : "jour"}</button></p></div>
          <div class="pv-info" aria-live="polite"></div>
          <button type="button" class="btn small pv-cta" data-pvobs>Ouvrir l'Observatoire à cette date</button>
          <p class="help">L'Observatoire astral reste tel qu'il a été conçu : on lui transmet seulement la date.</p></div></div>`;
    slot.insertBefore(sec, slot.firstChild);
    const svg = sec.querySelector(".pv-svg"), G = {}, L = {};
    sec.querySelectorAll("[data-pvb]").forEach(g => G[g.dataset.pvb] = g);
    sec.querySelectorAll("[data-pvl]").forEach(l => L[l.dataset.pvl] = l);
    let P = pos(S.t);

    const TXT = [
      `<p><b>Vu de la Terre</b>, c'est le ciel de l'astrologie. La Terre est au centre ; chaque astre est projeté sur le cercle du zodiaque, dans la direction où on le voit d'ici. Le Soleil fait le tour du cercle en un an.</p><p>Mercure, Vénus, Mars et les autres semblent parfois s'arrêter puis reculer : ce sont les <b>rétrogradations</b>, marquées ℞. Fais avancer le temps pour les voir.</p>`,
      `<p><b>Vu du Soleil</b>, c'est le système solaire tel qu'il tourne. Chaque planète suit son orbite, toujours dans le même sens ; la Terre n'est qu'une planète parmi d'autres, avec la Lune à son côté.</p><p>Les reculs ont disparu : ils n'étaient qu'un effet de notre propre mouvement, comme une voiture qu'on double et qui semble reculer. <i>Les distances ne sont pas à l'échelle.</i></p>`
    ];
    function info(){
      const box = sec.querySelector(".pv-info");
      if(!S.sel){ box.innerHTML = `<p class="help">Touche une planète pour comparer ses deux positions.</p>`; return; }
      const p = BOD.find(x => x.id === S.sel), q = P.P[S.sel], dd = Math.abs(((q.geo - q.helio + 540) % 360) - 180);
      box.innerHTML = `<p class="pv-ititle"><span class="ag">${p.gl}${T}</span> ${p.nom}</p><dl class="pv-dl"><div><dt>Vue de la Terre</dt><dd>${fmtDeg(q.geo)}${q.retro ? " · rétrograde" : ""}</dd></div><div><dt>Vue du Soleil</dt><dd>${fmtDeg(q.helio)}</dd></div></dl>
        <p class="help">${dd < 3 ? "Les deux regards se confondent presque." : `Un écart de ${Math.round(dd)}°${SIG[Math.floor(norm(q.geo)/30)] !== SIG[Math.floor(norm(q.helio)/30)] ? ", au point de changer de signe" : ""} : il vient de notre place sur l'orbite terrestre.`} Le thème retient la vue de la Terre.</p>`;
    }
    function label(){
      const d = new Date(S.t), tz = window.ArcanesAstro && window.ArcanesAstro.state ? (window.ArcanesAstro.state().lieu || {}).tz : undefined;
      let s; try{ s = d.toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long", year:"numeric", timeZone:tz}); }catch(e){ s = d.toLocaleDateString("fr-FR"); }
      sec.querySelector("[data-pvd]").textContent = s[0].toUpperCase() + s.slice(1);
      sec.querySelector("[data-pvnow]").hidden = Math.abs(S.t - S.base) < DAY/2;
    }
    function draw(){
      const k = ease(S.k);
      const pol = (a0, r0, a1, r1) => { let da = ((a1 - a0 + 540) % 360) - 180; const a = r0 === 0 ? a1 : r1 === 0 ? a0 : a0 + da*k; return xy(a, r0 + (r1 - r0)*k); };
      const put = (id, x, y) => G[id].setAttribute("transform", `translate(${f(x)} ${f(y)})`);
      const [sx, sy] = pol(P.ring.sun, RG, P.ring.sun, 0); put("sun", sx, sy);
      const [ex, ey] = pol(P.earth, 0, P.earth, RE); put("earth", ex, ey);
      const [mg0, mg1] = xy(P.ring.moon, RG), [mo0, mo1] = xy(P.moon, 17), mx = mg0 + (ex + mo0 - mg0)*k, my = mg1 + (ey + mo1 - mg1)*k; put("moon", mx, my);
      BOD.forEach(p => { const q = P.P[p.id], [x, y] = pol(P.ring[p.id], RG, q.helio, p.r); put(p.id, x, y);
        G[p.id].classList.toggle("rx", q.retro); G[p.id].classList.toggle("sel", S.sel === p.id);
        const l = L[p.id], [gx, gy] = xy(P.ring[p.id], RG); l.setAttribute("x1", f(ex)); l.setAttribute("y1", f(ey)); l.setAttribute("x2", f(gx*(1 - k) + x*k)); l.setAttribute("y2", f(gy*(1 - k) + y*k)); });
      [["sun", sx, sy], ["moon", mx, my]].forEach(([id, x, y]) => { const l = L[id]; l.setAttribute("x1", f(ex)); l.setAttribute("y1", f(ey)); l.setAttribute("x2", f(x)); l.setAttribute("y2", f(y)); });
      svg.style.setProperty("--k", k.toFixed(3));
      sec.querySelector(".pv-cap").textContent = k < .5 ? "Vu de la Terre : la Terre au centre, la roue de l'astrologie, 0° Bélier à gauche." : "Vu du Soleil : le Soleil au centre, les orbites, distances non à l'échelle.";
    }
    function loop(ts){
      S.raf = 0;
      const dt = S.last ? Math.min(64, ts - S.last) : 16; S.last = ts;
      let again = false;
      if(S.k !== S.target){ const step = dt/1500; S.k = S.target > S.k ? Math.min(S.target, S.k + step) : Math.max(S.target, S.k - step); again = true; }
      if(S.play){ S.t += dt/1000*12*DAY; const r = sec.querySelector("[data-pvr]"), off = Math.round((S.t - S.base)/DAY);
        if(off > 365){ S.t = S.base - 365*DAY; } r.value = Math.max(-365, Math.min(365, off)); P = pos(S.t); label(); if(S.sel) info(); again = true; }
      draw();
      if(again) S.raf = requestAnimationFrame(loop); else S.last = 0;
    }
    const kick = () => { if(!S.raf){ S.last = 0; S.raf = requestAnimationFrame(loop); } };
    function setMode(m){
      S.target = m; if(reduce()) S.k = m;
      sec.querySelectorAll("[data-pvm]").forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.pvm === m)));
      sec.querySelector(".pv-txt").innerHTML = TXT[m]; sec.classList.toggle("helio", m === 1);
      kick();
    }
    sec.querySelectorAll("[data-pvm]").forEach(b => b.onclick = () => setMode(+b.dataset.pvm));
    const playB = sec.querySelector("[data-pvplay]");
    const setPlay = on => { S.play = on; playB.classList.toggle("on", on); playB.setAttribute("aria-label", on ? "Arrêter le temps" : "Faire avancer le temps");
      playB.innerHTML = on ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>` : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`; if(on) kick(); };
    playB.onclick = () => setPlay(!S.play);
    const rg = sec.querySelector("[data-pvr]");
    rg.oninput = () => { setPlay(false); S.t = S.base + +rg.value*DAY; P = pos(S.t); label(); info(); draw(); };
    sec.querySelector("[data-pvnow]").onclick = () => { setPlay(false); S.t = S.base; rg.value = 0; P = pos(S.t); label(); info(); draw(); };
    svg.addEventListener("click", e => { const g = e.target.closest("[data-pvb]"); if(!g || !BOD.find(p => p.id === g.dataset.pvb)) return; S.sel = S.sel === g.dataset.pvb ? null : g.dataset.pvb; info(); draw(); });
    svg.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ const g = e.target.closest("[data-pvb]"); if(g){ e.preventDefault(); g.dispatchEvent(new MouseEvent("click", {bubbles:true})); } } });
    sec.querySelector("[data-pvobs]").onclick = () => {
      setPlay(false);
      const P = window.ArcanesPlus, fr = P && P.observatoire && P.observatoire.open ? P.observatoire.open(S.t) : null; if(!fr) return;
      const obs = fr.closest(".obs") || fr; obs.classList.add("pv-arrive");
      obs.scrollIntoView({behavior:reduce() ? "auto" : "smooth", block:"start"});
      setTimeout(() => obs.classList.remove("pv-arrive"), 1600);
    };
    /* la date que l'Observatoire annonce devient celle d'ici */
    const onMsg = e => {
      if(!document.body.contains(sec)) { window.removeEventListener("message", onMsg); return; }
      if(!e.data || e.data.type !== "arcanes-observatoire") return;
      const fr = document.querySelector("#v-a-ciel .obs-frame"); if(!fr || fr.contentWindow !== e.source) return;
      const t = e.data.state && e.data.state.time; if(!Number.isFinite(t) || S.play || Math.abs(t - S.t) < 60000) return;
      S.t = t; rg.value = Math.max(-365, Math.min(365, Math.round((t - S.base)/DAY))); P = pos(S.t); label(); info(); draw();
    };
    window.addEventListener("message", onMsg);
    sec._pv = {setMode};
    setMode(0); label(); info(); draw();
  }
  /* depuis la roue du Ciel du jour : « Changer de point de vue » */
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-pvgo]"); if(!b) return;
    const sec = document.querySelector("#v-a-ciel [data-pv]"); if(!sec) return;
    sec.scrollIntoView({behavior:reduce() ? "auto" : "smooth", block:"start"});
    setTimeout(() => sec._pv && sec._pv.setMode(1), reduce() ? 0 : 650);
  });
  window.ArcanesPV = {mount};
})();
