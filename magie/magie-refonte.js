/* ===== Arcanes · Magie : la refonte =====
   Se branche sur magie.js par ArcanesMagie._.EXT :
   · la couleur de l'heure (l'interface prend la teinte de la planète qui gouverne l'heure) ;
   · l'atelier rangé en familles, avec des vignettes qui se tracent ;
   · Le moment : un seul geste, « Que faire de cette heure ? », et le détail replié ;
   · le toucher : tracer le sceau au doigt, maintenir pour charger, vibrations, glisser d'une heure à l'autre ;
   · les rituels : une bougie qui brûle, l'écran qui reste allumé ;
   · l'école : la carte du château, une salle par module ;
   · « Composer un rituel » : une intention, et la planète, l'heure, la lame, le métal et le sigil se proposent. */
(() => {
  const M = window.ArcanesMagie; if(!M || !M._) return;
  const _ = M._, {EXT, D, PL, T, h, cap, nb, badge} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const buzz = p => { try{ if(navigator.vibrate && !matchMedia("(prefers-reduced-motion: reduce)").matches) navigator.vibrate(p); }catch(e){} };
  const reduce = () => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } };
  const HM = {hour:"2-digit", minute:"2-digit"};
  const de = p => p.nom === "Lune" ? "de la Lune" : p.nom === "Soleil" ? "du Soleil" : "de " + p.nom;
  const la = p => p.nom === "Lune" ? "la Lune" : p.nom === "Soleil" ? "le Soleil" : p.nom;
  const gl = (id, cls = "") => `<span class="ag mg ${cls}" aria-hidden="true">${PL[id].gl}${T}</span>`;

  /* ================================================================
     LA COULEUR DE L'HEURE
     ================================================================ */
  const TEINTE = { // [sur vélin, sur fond de nuit]
    saturne:["#3f3d63","#a9a6dd"], jupiter:["#2a4f8f","#8fb0ea"], mars:["#9b2c1c","#e8795a"], soleil:["#8a5f0a","#e6bb5a"],
    venus:["#2c6a47","#86c896"], mercure:["#a34e12","#f0a35e"], lune:["#595e7c","#cdd1ea"] };
  const root = document.documentElement;
  function heure(){ try{ const H = M.hoursOf(new Date()); if(H && H.cur >= 0) return H.hours[H.cur]; }catch(e){} return null; }
  let plNow = null;
  function teinter(){
    const on = root.classList.contains("u-magie");
    if(!on){ ["--rub","--acc","--tree","--or","--pl"].forEach(v => root.style.removeProperty(v)); delete root.dataset.mpl; return; }
    const hr = heure(); if(!hr) return; plNow = hr.pl;
    const dark = root.classList.contains("u-rite"), c = TEINTE[hr.pl][dark ? 1 : 0];
    root.style.setProperty("--rub", c); root.style.setProperty("--acc", c); root.style.setProperty("--tree", c); root.style.setProperty("--pl", PL[hr.pl].hex);
    if(dark) root.style.setProperty("--or", c); else root.style.removeProperty("--or");
    root.dataset.mpl = hr.pl;
  }
  try{ new MutationObserver(teinter).observe(root, {attributes:true, attributeFilter:["class"]}); }catch(e){}
  setInterval(() => { if(root.classList.contains("u-magie") && !document.hidden){ const b = plNow; teinter(); if(b !== plNow) chip(); } }, 30000);
  /* le repère de l'heure, en haut des pages claires */
  function chip(){
    qa(".m-hchip").forEach(e => e.remove());
    const v = _.st().vue, hr = heure(); if(!hr || v === "moment") return;
    const host = q1("#v-m-" + v); if(!host || host.hidden) return;
    const p = PL[hr.pl], b = document.createElement("button"); b.type = "button"; b.className = "m-hchip"; b.dataset.mgo = "moment";
    b.innerHTML = `${gl(hr.pl)}<span>Heure ${de(p)}</span><small>jusqu'à ${_.fmt(hr.end, HM)}</small><small class="w">· elle donne sa couleur à la page</small>`;
    b.onclick = () => _.go("moment"); host.prepend(b);
  }
  EXT.onView = () => { teinter(); chip(); };

  /* ================================================================
     L'ATELIER : des familles, deux vedettes, des vignettes qui se tracent
     ================================================================ */
  const FAM = [
    ["Signes et sceaux", "Donner une forme à une intention.", ["sigil","sceau","pentacles","ecritures","monade"]],
    ["Cartes du monde", "Voir comment tout se répond.", ["arbre","corresp","toile","decans"]],
    ["Le temps et la musique", "Choisir son heure, écouter le ciel.", ["election","kepler"]],
    ["Interroger et se souvenir", "Poser une question, compter, combiner, retenir.", ["geomancie","guematrie","roues","palais"]]
  ];
  const VEDETTES = ["composer","rituels"];
  EXT.atelierHome = (tools, icon) => {
    const by = Object.fromEntries(tools.map(t => [t[0], t])), used = new Set(VEDETTES.concat(FAM.flatMap(f => f[2])));
    const card = (k, big) => { const t = by[k]; if(!t) return ""; return `<button type="button" class="mr-tool${big ? " big" : ""}" data-mtool="${t[0]}"><span class="mr-vig">${icon(t[3])}</span><span class="mr-tool-t"><b>${t[1]}</b><small>${t[2]}</small>${big ? `<i class="mr-go">Ouvrir</i>` : ""}</span></button>`; };
    const rest = tools.filter(t => !used.has(t[0]));
    return `<header class="m-hero"><p class="eyebrow">Les instruments</p><h1>L'atelier</h1><p class="m-lede">${tools.length} instruments de la magie savante, rangés par usage. Rien ne s'envoie nulle part : tout est calculé sur ton appareil.</p></header>
      <div class="mr-heroes">${VEDETTES.map(k => card(k, true)).join("")}</div>
      ${FAM.map(([t, x, ks]) => `<section class="mr-fam"><header><h2>${t}</h2><p>${x}</p></header><div class="mr-grid">${ks.map(k => card(k)).join("")}</div></section>`).join("")}
      ${rest.length ? `<section class="mr-fam"><header><h2>Et aussi</h2></header><div class="mr-grid">${rest.map(t => card(t[0])).join("")}</div></section>` : ""}`;
  };
  EXT.atelierBind = r => { qa(".mr-vig", r).forEach((v, i) => { v.style.setProperty("--d", (i*.37 % 2.6).toFixed(2) + "s"); qa(".s, path:not(.f):not(.d2)", v).forEach(p => p.setAttribute("pathLength", "1")); }); };

  /* ================================================================
     LE MOMENT : « Que faire de cette heure ? »
     ================================================================ */
  EXT.momentCta = () => `<div class="mr-cta"><button type="button" class="btn big" data-mrque aria-expanded="false">Que faire de cette heure ?</button><div class="mr-que" hidden></div></div>`;
  EXT.momentBind = r => {
    const b = q1("[data-mrque]", r), box = q1(".mr-que", r);
    if(b) b.onclick = () => {
      const open = box.hidden; b.setAttribute("aria-expanded", open); box.hidden = !open; if(!open) return;
      const hr = heure(); if(!hr){ box.innerHTML = `<p class="help">L'heure n'a pas pu être calculée.</p>`; return; }
      const p = PL[hr.pl];
      box.innerHTML = `<p class="mr-que-h">${gl(hr.pl, "big")}<span><b>Heure ${de(p)}</b>, jusqu'à ${_.fmt(hr.end, HM)}. Elle convient à ${nb(p.domaines)}.</span></p>
        <div class="mr-que-g">
          <button type="button" class="mr-act" data-mrite="contemple:${hr.pl}"><b>Cinq minutes avec ${la(p)}</b><small>Une contemplation guidée, à la couleur de la planète</small></button>
          <button type="button" class="mr-act" data-mgo="atelier:composer:${hr.pl}"><b>Composer un rituel</b><small>Une intention, et la planète, la lame, le métal et le sigil se proposent</small></button>
          <button type="button" class="mr-act" data-mgo="atelier:sceau:${hr.pl}"><b>Tracer un sceau ${de(p)}</b><small>Un mot devient une ligne sur son carré, à suivre du doigt</small></button>
          <button type="button" class="mr-act" data-mgo="carnet:new"><b>Écrire dans le carnet</b><small>Une entrée datée à cette heure</small></button>
        </div>`;
      _.bindLinks(box); buzz(10);
    };
    /* glisser sur l'horloge : une heure planétaire en avant ou en arrière */
    const ck = q1(".m-clock-svg", r); if(!ck) return;
    let x0 = null, y0 = 0;
    ck.addEventListener("pointerdown", e => { x0 = e.clientX; y0 = e.clientY; });
    ck.addEventListener("pointerup", e => { if(x0 == null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if(Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)*1.6){ const s = q1(`[data-mstep="${dx < 0 ? 1 : -1}"]`, r); if(s){ s.click(); buzz(10); } } });
    ck.addEventListener("pointercancel", () => { x0 = null; });
  };

  /* ================================================================
     LE TOUCHER
     ================================================================ */
  /* tracer soi-même le sceau sur le carré, du doigt, case après case */
  const sceau0 = _.schemas.sceau;
  _.schemas.sceau = function(fig, o = {}){
    sceau0.call(this, fig, o);
    const kh = q1(".m-kh", fig); if(!kh || !o.full) return;
    const bar = document.createElement("div"); bar.className = "mr-trace-bar";
    bar.innerHTML = `<button type="button" class="btn small ghost" data-mrtrace>Le tracer moi-même</button><p class="help m-left" data-mrtmsg></p>`;
    kh.after(bar);
    const btn = q1("[data-mrtrace]", bar), msg = q1("[data-mrtmsg]", bar);
    let on = false, seq = [], k = 0, line = null, sv = null, down = false;
    const read = () => { sv = q1("svg", kh); seq = []; if(!sv) return;
      const pos = {}; qa(".m-k-cell", sv).forEach(rc => { const t = rc.nextElementSibling; if(t) pos[t.textContent.trim()] = [+rc.getAttribute("x") + +rc.getAttribute("width")/2, +rc.getAttribute("y") + +rc.getAttribute("height")/2, +rc.getAttribute("width")]; });
      qa(".m-kv", fig).forEach(s => { const v = s.textContent.replace(/^\D+/, "").trim(), p = pos[v]; if(p && (!seq.length || seq[seq.length - 1].v !== v)) seq.push({v, p}); }); };
    const mark = () => { qa(".m-k-cell", sv).forEach(rc => rc.classList.remove("mr-next", "mr-ok")); if(!on || !seq.length) return;
      qa(".m-k-cell", sv).forEach(rc => { const t = rc.nextElementSibling, v = t && t.textContent.trim(); if(seq.slice(0, k).some(s => s.v === v)) rc.classList.add("mr-ok"); if(k < seq.length && seq[k].v === v) rc.classList.add("mr-next"); });
      msg.textContent = k >= seq.length ? "C'est tracé. Ce sceau est le tien : tu peux le garder dans le carnet." : k === 0 ? `Pose le doigt sur la case ${seq[0].v}, puis glisse de case en case en suivant les nombres sous le carré.` : `Encore ${seq.length - k} case${seq.length - k > 1 ? "s" : ""} : va vers le ${seq[k].v}.`; };
    const start = () => { read(); if(!sv || seq.length < 2){ msg.textContent = "Écris d'abord un mot d'au moins deux lettres différentes."; on = false; btn.textContent = "Le tracer moi-même"; return; }
      k = 0; sv.classList.add("mr-tracing"); line = document.createElementNS("http://www.w3.org/2000/svg", "polyline"); line.setAttribute("class", "mr-trace"); sv.appendChild(line); mark(); };
    const stop = () => { on = false; btn.textContent = "Le tracer moi-même"; msg.textContent = ""; if(sv){ sv.classList.remove("mr-tracing", "mr-done"); qa(".mr-trace", sv).forEach(e => e.remove()); qa(".m-k-cell", sv).forEach(rc => rc.classList.remove("mr-next", "mr-ok")); } };
    const hit = e => { if(!on || !sv || k >= seq.length) return; const m = sv.getScreenCTM(); if(!m) return; const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()), t = seq[k];
      if(Math.abs(pt.x - t.p[0]) < t.p[2]*.48 && Math.abs(pt.y - t.p[1]) < t.p[2]*.48){ k++; line.setAttribute("points", seq.slice(0, k).map(s => s.p[0].toFixed(1) + "," + s.p[1].toFixed(1)).join(" ")); buzz(k >= seq.length ? [30, 50, 80] : 12); if(k >= seq.length) sv.classList.add("mr-done"); mark(); } };
    btn.onclick = () => { if(on) return stop(); on = true; btn.textContent = "Revenir au tracé automatique"; start(); };
    kh.addEventListener("pointerdown", e => { if(!on) return; down = true; e.preventDefault(); hit(e); });
    kh.addEventListener("pointermove", e => { if(on && down) hit(e); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(n => kh.addEventListener(n, () => { down = false; }));
    try{ new MutationObserver(() => { if(on && !q1(".mr-trace", kh)) start(); }).observe(kh, {childList:true}); }catch(e){}
  };
  /* maintenir pour charger : le sigil ne se charge pas d'un simple toucher */
  let hold = null;
  const holdEnd = ok => { if(!hold) return; cancelAnimationFrame(hold.raf); const b = hold.b; hold = null; b.classList.remove("mr-holding"); b.style.removeProperty("--hp");
    if(ok){ buzz([30, 40, 70]); b.dataset.mrheld = "1"; b.click(); delete b.dataset.mrheld; }
    else { const m = b.parentElement && q1("[data-sxmsg]", b.parentElement); if(m && !b.disabled) m.textContent = "Garde le doigt appuyé sur le bouton, le temps d'une respiration."; } };
  document.addEventListener("pointerdown", e => { const b = e.target.closest && e.target.closest("[data-sxcharge]"); if(!b || b.disabled) return;
    const t0 = performance.now(); let last = 0; hold = {b, raf:0}; b.classList.add("mr-holding");
    const tick = now => { if(!hold) return; const p = Math.min(1, (now - t0)/1500); b.style.setProperty("--hp", p); if(now - last > 300){ last = now; buzz(8); } if(p >= 1) return holdEnd(true); hold.raf = requestAnimationFrame(tick); };
    hold.raf = requestAnimationFrame(tick); }, true);
  ["pointerup", "pointercancel"].forEach(n => document.addEventListener(n, () => holdEnd(false), true));
  document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-sxcharge]"); if(!b || b.dataset.mrheld || e.detail === 0) return; e.stopPropagation(); e.preventDefault(); }, true);

  /* ================================================================
     LES RITUELS : une bougie, l'écran qui reste allumé, une vibration à chaque étape
     ================================================================ */
  let candle = null, wake = null, lastStep = "";
  function bougie(cv){
    const x = cv.getContext("2d"), W = 160, H = 200; let t = 0, raf = 0, last = 0, alive = true;
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); if(cv.width !== W*d){ cv.width = W*d; cv.height = H*d; } x.setTransform(d, 0, 0, d, 0, 0); };
    const frame = ts => { if(!alive) return; raf = requestAnimationFrame(frame); const dt = Math.min(.05, (ts - (last || ts))/1000); last = ts; t += dt; size(); x.clearRect(0, 0, W, H);
      const fl = .82 + .1*Math.sin(t*9.1) + .08*Math.sin(t*23.7 + 1), sw = Math.sin(t*2.3)*3 + Math.sin(t*5.9)*1.4, by = 118, hh = 50*fl;
      let g = x.createRadialGradient(80, by - 24, 2, 80, by - 24, 86); g.addColorStop(0, `rgba(255,190,90,${.3*fl})`); g.addColorStop(1, "rgba(255,170,70,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H);
      g = x.createLinearGradient(66, 0, 94, 0); g.addColorStop(0, "#cbbf9f"); g.addColorStop(.45, "#f4ecd6"); g.addColorStop(1, "#a89c7c"); x.fillStyle = g;
      x.beginPath(); x.moveTo(67, by + 8); x.quadraticCurveTo(80, by + 2, 93, by + 8); x.lineTo(93, H); x.lineTo(67, H); x.closePath(); x.fill();
      x.fillStyle = `rgba(255,214,150,${.5*fl})`; x.beginPath(); x.ellipse(80, by + 9, 12, 3.4, 0, 0, 7); x.fill();
      x.strokeStyle = "#2a1c10"; x.lineWidth = 1.6; x.beginPath(); x.moveTo(80, by + 8); x.lineTo(80.5 + sw*.1, by - 3); x.stroke();
      x.globalCompositeOperation = "lighter";
      for(let p = 0; p < 3; p++){ const k = [1, .62, .32][p], w = 11*k, h2 = hh*[1, .7, .4][p];
        g = x.createLinearGradient(0, by, 0, by - h2);
        if(p === 0){ g.addColorStop(0, "rgba(90,130,255,.55)"); g.addColorStop(.25, "rgba(255,170,60,.6)"); g.addColorStop(1, "rgba(230,80,20,0)"); }
        else if(p === 1){ g.addColorStop(0, "rgba(255,230,150,.75)"); g.addColorStop(1, "rgba(255,180,70,0)"); }
        else { g.addColorStop(0, "rgba(255,255,240,.9)"); g.addColorStop(1, "rgba(255,240,190,0)"); }
        x.fillStyle = g; x.beginPath(); x.moveTo(80 - w, by - 2); x.quadraticCurveTo(80 - w*1.05, by - h2*.5, 80 + sw*k, by - h2); x.quadraticCurveTo(80 + w*1.05, by - h2*.5, 80 + w, by - 2); x.quadraticCurveTo(80, by + 5, 80 - w, by - 2); x.fill(); }
      x.globalCompositeOperation = "source-over"; };
    if(reduce()){ last = 0; frame(0); cancelAnimationFrame(raf); } else raf = requestAnimationFrame(frame);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }
  function riteWatch(){
    const ov = q1("#m-rite"), open = ov && !ov.hidden && ov.innerHTML;
    if(open && !candle){ const cv = document.createElement("canvas"); cv.className = "mr-candle"; cv.setAttribute("aria-hidden", "true"); document.body.appendChild(cv); candle = {cv, stop:bougie(cv)};
      try{ if(navigator.wakeLock) navigator.wakeLock.request("screen").then(w => { wake = w; }).catch(() => {}); }catch(e){} lastStep = ""; }
    if(!open && candle){ candle.stop(); candle.cv.remove(); candle = null; try{ if(wake) wake.release(); }catch(e){} wake = null; }
    if(open){ const eb = q1(".eyebrow", ov), s = eb ? eb.textContent : ""; if(s !== lastStep){ if(lastStep) buzz(22); lastStep = s; } }
  }
  try{ new MutationObserver(riteWatch).observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:["hidden"]}); }catch(e){}

  /* ================================================================
     L'ÉCOLE : la carte du château, une salle par module
     ================================================================ */
  const SALLES = {m1:["Qu'est-ce que","la magie ?"], m2:["La sympathie","universelle"], m3:["Les sept","planètes"], m4:["Talismans","et carrés"], m5:["La Kabbale","hermétique"], m6:["Le rituel","cérémoniel"], m7:["Sigils et","chaos"], m8:["L'éthique de","la pratique"],
    m9:["L'âme","du monde"], m10:["Ficin","et le ciel"], m11:["La","géomancie"], m12:["Lettres","et nombres"], m13:["L'alchimie","spirituelle"], m14:["L'art de","la mémoire"]};
  const COUL = ["#9b2c1c","#2c6a47","#8a5f0a","#2a4f8f","#3f3d63","#a34e12","#595e7c"];
  EXT.ecoleMap = (mods, st, next) => {
    const box = {}, W = 96, Hh = 112;
    ["m1","m2","m3","m4"].forEach((id, i) => box[id] = [26, 486 - i*118, W, Hh]);
    ["m5","m6","m7","m8"].forEach((id, i) => box[id] = [238, 132 + i*118, W, Hh]);
    ["m9","m10","m11","m12","m13","m14"].forEach((id, i) => box[id] = [134, 425 - i*55, 92, 55]);
    const nextId = next ? next[0].id : null;
    const room = (m, i) => { const b = box[m.id]; if(!b) return ""; const [x, y, w, hh] = b, done = m.lecons.filter(l => st.done.includes(l.id)).length, all = done === m.lecons.length, nm = SALLES[m.id] || [m.t, ""], tw = hh < 60;
      return `<g class="mr-room${all ? " done" : ""}${m.id === nextId ? " next" : ""}" data-mmod="${m.id}" role="button" tabindex="0" aria-label="Module ${m.n} : ${h(m.t)}, ${done} leçon${done > 1 ? "s" : ""} sur ${m.lecons.length}" style="--rc:${COUL[i % 7]}">
        <rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="2"/>
        <text class="n" x="${x + 9}" y="${y + (tw ? 19 : 26)}">${m.n}</text>
        <text class="t" x="${x + 9}" y="${y + (tw ? 33 : 50)}">${h(nm[0])}</text><text class="t" x="${x + 9}" y="${y + (tw ? 45 : 63)}">${h(nm[1])}</text>
        ${m.lecons.map((l, k) => `<circle class="pip${st.done.includes(l.id) ? " on" : ""}" cx="${x + w - 12 - (m.lecons.length - 1 - k)*9}" cy="${y + (tw ? 14 : hh - 13)}" r="3"/>`).join("")}
        </g>`; };
    const cren = Array.from({length:23}, (z, k) => `M${21 + k*14.5} 70v-7h7v7`).join("");
    return `<section class="mr-castle"><header><p class="eyebrow">La carte de l'école</p><h2>Le château de la mémoire</h2>
        <p>Chaque salle est un module. Les huit salles de l'enceinte forment le premier cercle : la pratique. Le donjon, au centre, est le second : les fondements et les arts. Touche une salle pour y entrer.</p></header>
      <svg class="mr-plan" viewBox="0 0 360 640" role="group" aria-label="Plan du château : quatorze salles, une par module">
        <defs><pattern id="mr-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5"/></pattern></defs>
        <rect class="ground" x="14" y="70" width="332" height="540"/><rect class="court" x="128" y="126" width="104" height="478"/>
        <path class="wall" d="M14 70h332v540H214M146 610H14z"/><path class="wall thin" d="${cren}"/>
        ${[[14, 70], [346, 70], [14, 610], [346, 610]].map(([cx, cy]) => `<circle class="tower" cx="${cx}" cy="${cy}" r="19"/><circle class="tower in" cx="${cx}" cy="${cy}" r="11"/>`).join("")}
        <path class="wall" d="M146 610v-16a34 34 0 0 1 68 0v16"/><text class="lab" x="180" y="632">L'entrée</text>
        <path class="way" d="M180 592V552M180 552C150 552 140 545 124 540M180 552V486"/>
        <circle class="well" cx="180" cy="528" r="13"/><circle class="well in" cx="180" cy="528" r="6"/>
        <path class="keep" d="M130 484V150a50 50 0 0 1 100 0v334z"/><text class="lab sm" x="180" y="140">Le donjon</text>
        <g class="rose" transform="translate(180 36)"><path d="M0-14L3-3L14 0L3 3L0 14L-3 3L-14 0L-3-3Z"/><circle r="2.2"/></g>
        ${mods.map(room).join("")}
      </svg></section>`;
  };
  document.addEventListener("keydown", e => { const g = e.target.closest && e.target.closest(".mr-room"); if(g && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); g.dispatchEvent(new MouseEvent("click", {bubbles:true})); } });

  /* ================================================================
     COMPOSER UN RITUEL : les quatre arts autour d'une intention
     ================================================================ */
  const VOEUX = {soleil:"Réussir, rayonner, retrouver confiance", lune:"Rêver, s'apaiser, protéger son foyer", mercure:"Apprendre, parler, voyager, négocier", venus:"Aimer, se réconcilier, créer du beau",
    mars:"Oser, trancher, se défendre", jupiter:"Grandir, saisir sa chance, obtenir justice", saturne:"Tenir, structurer, finir, poser une limite"};
  const DAY = 864e5;
  function prochaines(pl, n = 3){
    const out = [], seen = new Set(), now = new Date();
    for(let d = 0; d < 9 && out.length < n; d++){ let H = null; try{ H = M.hoursOf(new Date(now.getTime() + d*DAY)); }catch(e){} if(!H) continue;
      H.hours.forEach(x => { if(x.pl === pl && x.end > now && !seen.has(+x.start) && out.length < n){ seen.add(+x.start); out.push({s:x.start, e:x.end, fort:H.hours[0].pl === pl}); } }); }
    return out;
  }
  function composer(fig, o = {}){
    let pl = o.arg && PL[o.arg] ? o.arg : null, txt = "";
    const draw = () => {
      const p = pl && PL[pl];
      fig.innerHTML = `<div class="mr-comp">
        <section class="m-card mr-step"><p class="mr-num">1</p><h3>Ton intention</h3>
          <label class="sr-only" for="mr-int">Ton intention, en une phrase</label><input id="mr-int" type="text" maxlength="110" placeholder="Une phrase au présent : « Je trouve le calme avant mon entretien »" value="${h(txt)}" autocomplete="off">
          <p class="help m-left">Formule-la pour toi, au présent. On ne fait pas de magie sur quelqu'un d'autre : « je m'ouvre à une rencontre », jamais « qu'il m'aime ».</p>
          <p class="mr-lab">De quoi s'agit-il ?</p>
          <div class="mr-voeux">${D.CHALD.map(id => `<button type="button" class="mr-voeu${id === pl ? " on" : ""}" data-voeu="${id}" style="--vc:${TEINTE[id][0]}" aria-pressed="${id === pl}">${gl(id)}<span>${VOEUX[id]}</span></button>`).join("")}</div></section>
        ${p ? suite(p) : `<p class="help m-left mr-wait">Choisis ce dont il s'agit : la planète, l'heure, la lame, le métal et le sigil se proposeront.</p>`}</div>`;
      const inp = q1("#mr-int", fig); inp.oninput = () => { txt = inp.value; const sg = q1("[data-mrsig]", fig); if(sg) sg.innerHTML = sigil(); const dz = q1("[data-mrdire]", fig); if(dz) dz.textContent = txt.trim() || "ton intention"; };
      qa("[data-voeu]", fig).forEach(b => b.onclick = () => { pl = b.dataset.voeu; buzz(10); draw(); const s2 = q1(".mr-step.two", fig); if(s2) s2.scrollIntoView({behavior:reduce() ? "auto" : "smooth", block:"start"}); });
      const lm = q1("[data-mrlame]", fig); if(lm) lm.onclick = () => { try{ openSheet(lm.dataset.mrlame); }catch(e){} };
      const mt = q1("[data-mrmetal]", fig); if(mt) mt.onclick = () => { try{ window.ArcanesAstro.switchTo("alchimie", "labo:metaux:" + mt.dataset.mrmetal); }catch(e){} };
      const kp = q1("[data-mrkeep]", fig); if(kp) kp.onclick = () => { _.setCn({edit:"new", prefill:resume(PL[pl])}); _.mView("carnet"); };
      _.bindLinks(fig);
    };
    const sigil = () => { const L = (() => { try{ return _.spareLetters(txt || "je trouve le calme", true).keep; }catch(e){ return []; } })(); try{ return L.length ? _.sigilSVG(L, 2, {cercle:true}) : ""; }catch(e){ return ""; } };
    const quand = x => `${cap(_.fmt(x.s, {weekday:"long", day:"numeric", month:"long"}))}, de ${_.fmt(x.s, HM)} à ${_.fmt(x.e, HM)}`;
    const metal = p => { try{ return window.ALCH_DATA.METAUX.find(m => m.pl === p.id); }catch(e){ return null; } };
    const resume = p => { const hs = prochaines(p.id, 1), m = metal(p);
      return `Rituel composé · ${p.nom}\nIntention : ${txt.trim() || "(à écrire)"}\nHeure : ${hs[0] ? quand(hs[0]) : "une heure " + de(p)}\nCouleur : ${p.couleur}. Métal : ${p.metal}. Lame : ${p.lame.nom}.\n\nCe qui s'est passé :\n`; };
    const suite = p => { const hs = prochaines(p.id, 3), m = metal(p), card = (() => { try{ return cardSVG(byId(p.lame.id)); }catch(e){ return ""; } })();
      return `<section class="m-card mr-step two" style="--vc:${TEINTE[p.id][0]}"><p class="mr-num">2</p><h3>La planète : ${p.nom} ${badge("trad")}</h3>
          <div class="mr-pl"><span class="mr-pl-g" style="color:${p.hex}">${gl(p.id, "huge")}</span><p>Son domaine : ${nb(p.domaines)}. Son verbe : <b>${p.verbe}</b>. Son jour : le ${p.jour}.</p></div>
          <div class="m-acts start"><button type="button" class="linkbtn" data-mpl="${p.id}">Sa fiche</button><button type="button" class="linkbtn" data-mgo="atelier:corresp:${p.id}">Toutes ses correspondances</button></div></section>
        <section class="m-card mr-step"><p class="mr-num">3</p><h3>L'heure</h3>
          ${hs.length ? `<ul class="mr-hours">${hs.map(x => `<li${x.fort ? ` class="fort"` : ""}><b>${quand(x)}</b>${x.fort ? `<small>Jour et heure ${de(p)} : le moment le plus fort</small>` : ""}</li>`).join("")}</ul>` : `<p class="help m-left">Les heures n'ont pas pu être calculées pour ton lieu.</p>`}
          <div class="m-acts start"><button type="button" class="linkbtn" data-mgo="atelier:election:${p.id}">Affiner avec la Lune et les signes</button></div></section>
        <section class="m-card mr-step"><p class="mr-num">4</p><h3>La lame, le métal, la couleur</h3>
          <div class="mr-trio">
            <button type="button" class="mr-lame" data-mrlame="${p.lame.id}" aria-label="Voir la lame : ${h(p.lame.nom)}">${card}<span><b>${p.lame.nom}</b><small>La lame ${de(p)}, à poser devant toi</small></span></button>
            <div class="mr-two"><div><p class="mr-lab">La couleur</p><p><i class="mr-sw" style="background:${p.hex}"></i>${cap(p.couleur)}</p></div>
              <div><p class="mr-lab">Le métal</p><p>${cap(p.metal)}${m ? ` <button type="button" class="linkbtn" data-mrmetal="${m.id}">Le voir en alchimie</button>` : ""}</p></div>
              <div><p class="mr-lab">Le parfum</p><p>${cap(p.parfum)}</p></div></div></div>
          <p class="help m-left">Rien n'est obligatoire. Un tissu, un objet ou une bougie de la bonne couleur suffisent.</p></section>
        <section class="m-card mr-step"><p class="mr-num">5</p><h3>Le sigil</h3>
          <div class="mr-sig"><div class="mr-sig-art" data-mrsig>${sigil()}</div><p>Ta phrase, débarrassée de ses voyelles et de ses lettres en double, devient un signe. Dessine-le sur une feuille, ou travaille-le dans l'atelier.</p></div>
          <div class="m-acts start"><button type="button" class="linkbtn" data-mgo="atelier:sigil">Composer mon sigil dans l'atelier</button><button type="button" class="linkbtn" data-mgo="atelier:sceau:${p.id}">Ou tracer un sceau sur le carré ${de(p)}</button></div></section>
        <section class="m-card mr-step mr-fin"><p class="mr-num">6</p><h3>Le déroulé ${badge("mod")}</h3>
          <ol class="mr-ol">
            <li>Attends une heure ${de(p)}. Pose devant toi la lame, ton sigil et quelque chose de la bonne couleur.</li>
            <li>Respire en carré, trois minutes. <button type="button" class="linkbtn" data-mrite="carre">Lancer la respiration</button></li>
            <li>Dis une fois, à voix haute : « <span data-mrdire>${h(txt.trim() || "ton intention")}</span> ».</li>
            <li>Reste cinq minutes avec ${la(p)}. <button type="button" class="linkbtn" data-mrite="contemple:${p.id}">Lancer la contemplation</button></li>
            <li>Note ce qui s'est passé. Puis range tout, et n'y pense plus.</li></ol>
          <div class="m-acts start"><button type="button" class="btn" data-mrkeep>Garder ce rituel dans le carnet</button></div>
          <p class="help m-left">Les correspondances viennent d'Agrippa et de la Golden Dawn. Le déroulé est une proposition d'Arcanes : un cadre pour se concentrer, pas une promesse de résultat.</p></section>`; };
    draw();
  }
  EXT.tools.push(["composer", "Composer un rituel", "Une intention, et la planète, l'heure, la lame, le métal et le sigil se proposent", "composer"]);
  EXT.toolRender.composer = {t:"Composer un rituel", sous:"Dis ce que tu cherches. L'astrologie donne l'heure, le tarot l'image, l'alchimie le métal, la magie le signe.", render:composer};
  EXT.toolIcon.composer = `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="24" class="f"/><path d="M30 6v48M6 30h48" class="f"/><path d="M30 12L46 30 30 48 14 30Z" class="s"/><circle cx="30" cy="12" r="3.2"/><circle cx="46" cy="30" r="3.2"/><circle cx="30" cy="48" r="3.2"/><circle cx="14" cy="30" r="3.2"/></svg>`;

  if(M.active()){ teinter(); }
})();
