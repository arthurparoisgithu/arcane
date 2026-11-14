/* ===== Arcanes · Magie : le second cercle (interface) =====
   Se branche sur magie.js par ArcanesMagie._ : outils de l'atelier, schémas des leçons, rituels guidés,
   cycle de 28 jours, bibliothèque, notes en marge et passage de grade. */
(() => {
  const M = window.ArcanesMagie;
  if(!M || !M._ || typeof MAGIE_COURS2 === "undefined") return;
  const _ = M._, X = _.EXT, D = _.D, K = _.K, PL = _.PL, T = _.T, C2 = MAGIE_COURS2;
  const TX = typeof MAGIE_TEXTES !== "undefined" ? MAGIE_TEXTES : {T:{}, HYMNES:{}};
  const AC = typeof ASTRO_CALC !== "undefined" ? ASTRO_CALC : null;
  const A = () => window.Astronomy;
  const {h, cap, nb, f1, pg, badge, img, sheet, close, bindLinks, fmt, HM, uid} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const rad = Math.PI/180, DAY = 864e5;
  const st = () => _.st(), save = () => _.save();
  const de = id => PL[id] ? (PL[id].nom === "Lune" ? "de la Lune" : (/^[AEIOUÉ]/.test(PL[id].nom) ? "d'" : "de ") + PL[id].nom) : "";

  /* ---------- fusion des données ---------- */
  K.MODULES.forEach(m => { if(!m.cercle) m.cercle = 1; });
  C2.MODULES.forEach(m => { if(!K.MODULES.find(x => x.id === m.id)) K.MODULES.push(m); });
  D.GRADES.splice(0, D.GRADES.length, ...C2.GRADES);
  Object.assign(_.CRED, {});

  /* ================================================================
     LE SON (Web Audio) : des notes tenues, douces
     ================================================================ */
  const NOTE = {saturne:98.0, jupiter:196.0, mars:261.6, soleil:392.0, venus:659.3, mercure:523.3, lune:329.6};
  const AU = {ctx:null, v:{}};
  function actx(){ if(!AU.ctx){ const C = window.AudioContext || window.webkitAudioContext; if(!C) return null; AU.ctx = new C(); } if(AU.ctx.state === "suspended") AU.ctx.resume(); return AU.ctx; }
  function voice(id, freq, vol = .08){
    const c = actx(); if(!c) return null;
    if(AU.v[id]){ AU.v[id].set(freq); return AU.v[id]; }
    const g = c.createGain(); g.gain.value = 0; g.connect(c.destination);
    const o1 = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain();
    o1.type = "sine"; o2.type = "triangle"; g2.gain.value = .22; o1.frequency.value = freq; o2.frequency.value = freq/2;
    o1.connect(g); o2.connect(g2); g2.connect(g);
    const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = .18 + Math.random()*.1; lg.gain.value = vol*.25; lfo.connect(lg); lg.connect(g.gain);
    o1.start(); o2.start(); lfo.start();
    const k = Math.min(1, 300/freq); g.gain.setTargetAtTime(vol*k, c.currentTime, .6);
    const v = {set:f => { o1.frequency.setTargetAtTime(f, c.currentTime, .08); o2.frequency.setTargetAtTime(f/2, c.currentTime, .08); },
      stop:() => { g.gain.setTargetAtTime(0, c.currentTime, .35); setTimeout(() => { try{ o1.stop(); o2.stop(); lfo.stop(); g.disconnect(); }catch(e){} }, 1600); delete AU.v[id]; }};
    AU.v[id] = v; return v;
  }
  const hush = pre => Object.keys(AU.v).forEach(k => { if(!pre || k.startsWith(pre)) AU.v[k].stop(); });
  document.addEventListener("visibilitychange", () => { if(document.hidden) hush(); });

  /* ================================================================
     LES PETITS DESSINS COMMUNS
     ================================================================ */
  const GEO = C2.GEO, GEOF = Object.fromEntries(GEO.map(g => [g.p.join(""), g]));
  function figSVG(p, o = {}){
    const w = 36, hh = 64, dy = 15, r = 3.6;
    let s = `<svg class="m-fig${o.cls ? " " + o.cls : ""}" viewBox="0 0 ${w} ${hh}" aria-hidden="true">`;
    p.forEach((n, i) => { const y = 9 + i*dy; s += n === 1 ? `<circle cx="${w/2}" cy="${y}" r="${r}"/>` : `<circle cx="${w/2 - 7}" cy="${y}" r="${r}"/><circle cx="${w/2 + 7}" cy="${y}" r="${r}"/>`; });
    return s + `</svg>`;
  }
  const geoPl = g => g.pl === "nn" ? "Nœud nord de la Lune" : g.pl === "ns" ? "Nœud sud de la Lune" : PL[g.pl].nom;
  const geoGl = g => g.pl === "nn" ? "☊" : g.pl === "ns" ? "☋" : PL[g.pl].gl;
  const geoQ = {fav:"favorable", def:"défavorable", mix:"mêlée"};
  function figSheet(g, role){
    sheet(`<p class="eyebrow">${role ? role + " · " : ""}Figure géomantique</p>
      <div class="m-fighead">${figSVG(g.p, {cls:"big"})}<div><h2>${g.nom}</h2><p class="m-lede">${cap(g.fr)}</p>
      <p class="m-tags"><span>${geoGl(g)}${T} ${geoPl(g)}</span><span class="q-${g.q}">${cap(geoQ[g.q])}</span></p></div></div>
      <p>${g.sens}</p><p class="help m-left">Étages, de haut en bas : feu, air, eau, terre. Planètes selon Agrippa, <i>De occulta philosophia</i>, II, 48.</p>`);
  }
  const addFig = (a, b) => a.map((x, i) => ((x + b[i]) % 2 === 0 ? 2 : 1));
  function shield(m){ // m : 4 Mères (tableaux de 4)
    const f = [0,1,2,3].map(r => [m[0][r], m[1][r], m[2][r], m[3][r]]);
    const n = [addFig(m[0], m[1]), addFig(m[2], m[3]), addFig(f[0], f[1]), addFig(f[2], f[3])];
    const td = addFig(n[0], n[1]), tg = addFig(n[2], n[3]), j = addFig(td, tg), rec = addFig(j, m[0]);
    return {m, f, n, td, tg, j, rec};
  }
  const rndFig = () => [0,1,2,3].map(() => Math.random() < .5 ? 1 : 2);

  /* les décans */
  const SUITE = {feu:["batons","Bâtons"], terre:["deniers","Deniers"], air:["epees","Épées"], eau:["coupes","Coupes"]};
  const ELS = ["feu","terre","air","eau"];
  const DECANS = Array.from({length:36}, (_x, i) => {
    const k = Math.floor(i/3), d = i % 3, sg = AC ? AC.SG[k] : {nom:"", gl:""}, el = ELS[k % 4], mode = k % 3;
    const ruler = ["mars","soleil","venus","mercure","lune","saturne","jupiter"][i % 7], n = 2 + mode*3 + d;
    return {i, k, d, sg, el, ruler, n, carte:{id:SUITE[el][0] + n, nom:`${n} de ${SUITE[el][1]}`}, de:k*30 + d*10};
  });
  const sunLon = d => { try{ return AC.lonOf("soleil", d); }catch(e){ return 0; } };

  /* ================================================================
     1. L'HARMONIE DES SPHÈRES (Kepler)
     ================================================================ */
  const KB = {mercure:"Mercury", venus:"Venus", terre:"Earth", mars:"Mars", jupiter:"Jupiter", saturne:"Saturn"};
  const PER = {mercure:87.97, venus:224.7, terre:365.26, mars:686.98, jupiter:4332.6, saturne:10759.2};
  const KCOL = {mercure:PL.mercure.hex, venus:PL.venus.hex, terre:"#3f7fb0", mars:PL.mars.hex, jupiter:PL.jupiter.hex, saturne:"#8a7f6b"};
  const KGL = {mercure:"☿", venus:"♀", terre:"♁", mars:"♂", jupiter:"♃", saturne:"♄"};
  let RMAX = null;
  function rmax(){
    if(RMAX) return RMAX; const Ae = A(); if(!Ae) return null; RMAX = {};
    const t0 = new Date();
    C2.KEPLER.forEach(k => { let mx = 0, mn = 1e9; for(let i = 0; i < 96; i++){ const r = Ae.HelioDistance(Ae.Body[KB[k.id]], new Date(t0.getTime() + i/96*PER[k.id]*DAY)); mx = Math.max(mx, r); mn = Math.min(mn, r); } RMAX[k.id] = [mn, mx]; });
    return RMAX;
  }
  function keplerState(date){
    const Ae = A(), R = rmax(); if(!Ae || !R) return null;
    return C2.KEPLER.map(k => { const b = Ae.Body[KB[k.id]], r = Ae.HelioDistance(b, date), lon = Ae.EclipticLongitude(b, date);
      const [mn, mx] = R[k.id], ratio = (mx/r)**2, full = (mx/mn)**2, pos = Math.log(ratio)/Math.log(full);
      return {k, r, lon, ratio, pos:Math.max(0, Math.min(1, pos)), f:k.base*ratio}; });
  }
  function keplerTool(host, o = {}){
    if(!A()){ host.innerHTML = `<p class="help">Le calcul n'est pas disponible.</p>`; return; }
    let date = new Date(), speed = 0, raf = null, on = false, last = 0;
    const mute = new Set(o.full ? [] : ["mercure","venus"]);
    host.innerHTML = `<div class="m-kep${o.full ? " full" : ""}"><svg class="m-kep-sky" viewBox="-160 -160 320 320" role="img" aria-label="Les orbites vues du Soleil"></svg>
      <div class="m-kep-side"><p class="m-kep-date"></p><ol class="m-kep-list"></ol>
      <div class="m-acts start"><button type="button" class="btn small" data-kon>Écouter</button><button type="button" class="btn ghost small" data-kt>Faire passer le temps</button><button type="button" class="btn ghost small" data-know>Aujourd'hui</button></div></div></div>
      <figcaption>Hauteur de chaque note = vitesse réelle de la planète autour du Soleil, calculée pour la date. Au plus loin du Soleil, la note de base ; au plus près, l'intervalle de Kepler. Registre approximatif d'après <i>Harmonices Mundi</i>, livre V.</figcaption>`;
    const sky = q1(".m-kep-sky", host), list = q1(".m-kep-list", host), dt = q1(".m-kep-date", host);
    const Rd = au => 22 + Math.sqrt(au)*36;
    const draw = () => {
      const S = keplerState(date); if(!S) return;
      let s = `<circle r="9" class="m-kep-sun"/>`;
      S.forEach(x => { s += `<circle r="${f1(Rd(x.k.id === "saturne" ? 9.5 : x.k.id === "jupiter" ? 5.2 : x.k.id === "mars" ? 1.52 : x.k.id === "terre" ? 1 : x.k.id === "venus" ? .72 : .39))}" class="m-kep-orb"/>`; });
      S.forEach(x => { const a = -x.lon*rad, R = Rd(x.r), cx = Math.cos(a)*R, cy = Math.sin(a)*R, act = on && !mute.has(x.k.id);
        s += `<g class="m-kep-pl${act ? " on" : ""}" style="--pc:${KCOL[x.k.id]}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${act ? 9 : 7}" class="halo"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="5.2" class="dot"/><text x="${f1(cx)}" y="${f1(cy - 11)}" class="m-kep-gl">${KGL[x.k.id]}${T}</text></g>`; });
      sky.innerHTML = s;
      dt.innerHTML = `<b>${cap(fmt(date, {day:"numeric", month:"long", year:"numeric"}))}</b>${speed ? " · le temps passe" : ""}`;
      list.innerHTML = S.map(x => `<li style="--pc:${KCOL[x.k.id]}"><button type="button" class="m-kep-tog${mute.has(x.k.id) ? "" : " on"}" data-kmute="${x.k.id}" aria-pressed="${!mute.has(x.k.id)}"><span class="ag mg">${KGL[x.k.id]}${T}</span></button>
        <span class="m-kep-n"><b>${x.k.nom}</b><small>${x.k.iv} · ${x.k.r}</small></span><span class="m-kep-bar"><i style="left:${f1(x.pos*100)}%"></i></span><span class="m-kep-hz">${Math.round(x.f)} Hz</span></li>`).join("");
      qa("[data-kmute]", list).forEach(b => b.onclick = () => { const id = b.dataset.kmute; if(mute.has(id)) mute.delete(id); else { mute.add(id); if(AU.v["k-" + id]) AU.v["k-" + id].stop(); } sound(S); draw(); });
      if(on) sound(S);
    };
    const sound = S => { if(!on) return; S.forEach(x => { if(!mute.has(x.k.id)) voice("k-" + x.k.id, x.f, .05); }); };
    const loop = ts => { if(!host.isConnected){ stop(); return; } if(last){ date = new Date(date.getTime() + (ts - last)/1000*speed*DAY); } last = ts; draw(); raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = null; last = 0; hush("k-"); on = false; };
    q1("[data-kon]", host).onclick = e => { on = !on; e.target.textContent = on ? "Couper le son" : "Écouter"; if(!on) hush("k-"); draw(); };
    q1("[data-kt]", host).onclick = e => { speed = speed ? 0 : 20; e.target.textContent = speed ? "Arrêter le temps" : "Faire passer le temps"; if(speed && !raf){ last = 0; raf = requestAnimationFrame(loop); } if(!speed){ cancelAnimationFrame(raf); raf = null; last = 0; } draw(); };
    q1("[data-know]", host).onclick = () => { date = new Date(); draw(); };
    draw();
  }

  /* ================================================================
     2. LA TOILE DES CORRESPONDANCES
     ================================================================ */
  const RINGS = [
    ["jour", "Jour", p => cap(p.jour)],
    ["metal", "Métal", p => cap(p.metal.split(" (")[0])],
    ["couleur", "Couleur", p => cap(p.couleur.split(",")[0])],
    ["note", "Note", p => `${Math.round(NOTE[p.id])} Hz`],
    ["sephira", "Sephira", p => _.SEP[p.sephira].nom],
    ["lettre", "Lettre", p => `${p.lettre} ${p.lettreNom}`],
    ["lame", "Lame", p => `${p.lame.n} · ${p.lame.nom}`],
    ["geo", "Figures", p => GEO.filter(g => g.pl === p.id).map(g => g.nom).join(", ")]
  ];
  function toileTool(host, o = {}){
    let cur = o.arg && PL[o.arg] ? o.arg : "venus";
    host.innerHTML = `<div class="m-toile"><div class="m-toile-svg"></div><div class="m-toile-side"></div></div>
      <figcaption>Chaque rayon relie une planète à ce que la tradition lui attribue : son jour, son métal, sa couleur, sa note, sa sephira, sa lettre, sa lame du tarot et ses figures de géomancie. Touche une planète.</figcaption>`;
    const box = q1(".m-toile-svg", host), side = q1(".m-toile-side", host);
    const draw = () => {
      const idx = D.CHALD.indexOf(cur), rot = -idx*360/7;
      let s = `<svg viewBox="-170 -170 340 340" class="m-toile-s" role="img" aria-label="La toile des correspondances"><g class="m-toile-rot" style="transform:rotate(${f1(rot)}deg)">`;
      RINGS.forEach((_r, ri) => s += `<circle r="${52 + ri*14}" class="m-toile-ring"/>`);
      D.CHALD.forEach((id, i) => { const a = (-90 + i*360/7)*rad, p = PL[id], on = id === cur;
        s += `<line x1="${f1(Math.cos(a)*30)}" y1="${f1(Math.sin(a)*30)}" x2="${f1(Math.cos(a)*150)}" y2="${f1(Math.sin(a)*150)}" class="m-toile-spoke${on ? " on" : ""}" style="--pc:${p.hex}"/>`;
        RINGS.forEach((_r, ri) => { const R = 52 + ri*14; s += `<circle cx="${f1(Math.cos(a)*R)}" cy="${f1(Math.sin(a)*R)}" r="${on ? 4.2 : 2.6}" class="m-toile-node${on ? " on" : ""}" style="--pc:${p.hex}; transition-delay:${on ? ri*60 : 0}ms"/>`; });
        s += `<g class="m-toile-pl${on ? " on" : ""}" data-tpl="${id}" role="button" tabindex="0" aria-label="${p.nom}"><circle cx="${f1(Math.cos(a)*30)}" cy="${f1(Math.sin(a)*30)}" r="0"/>
          <circle cx="${f1(Math.cos(a)*160)}" cy="${f1(Math.sin(a)*160)}" r="13" class="m-toile-disc" style="--pc:${p.hex}"/>
          <text x="${f1(Math.cos(a)*160)}" y="${f1(Math.sin(a)*160 + 1)}" class="m-toile-gl" style="transform-origin:${f1(Math.cos(a)*160)}px ${f1(Math.sin(a)*160)}px; transform:rotate(${f1(-rot)}deg)">${p.gl}${T}</text></g>`; });
      s += `</g><circle r="22" class="m-toile-core"/><text y="2" class="m-toile-cgl" style="fill:${PL[cur].hex}">${PL[cur].gl}${T}</text></svg>`;
      box.innerHTML = s;
      const p = PL[cur];
      side.innerHTML = `<p class="eyebrow">${cap(p.jour)}</p><h3 style="color:${p.hex}">${p.nom}</h3><p class="m-verbe">${p.mot}</p>
        <ol class="m-toile-l">${RINGS.map(([k, lab, f], i) => `<li style="--d:${i*60}ms"><span>${lab}</span><b>${k === "couleur" ? `<i class="m-sw" style="background:${p.hex}"></i>` : ""}${f(p)}</b></li>`).join("")}</ol>
        <div class="m-acts start"><button type="button" class="btn small" data-mpl="${cur}">Toutes ses correspondances</button><button type="button" class="btn ghost small" data-mgo="atelier:sceau:${cur}">Son carré</button></div>`;
      qa("[data-tpl]", box).forEach(g => { const f = () => { cur = g.dataset.tpl; draw(); }; g.onclick = f; g.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
      bindLinks(side);
    };
    draw();
  }

  /* ================================================================
     3. LA ROUE DES DÉCANS
     ================================================================ */
  function decansTool(host, o = {}){
    if(!AC){ host.innerHTML = `<p class="help">Le calcul n'est pas disponible.</p>`; return; }
    const sl = sunLon(new Date()), cur = Math.floor(sl/10) % 36;
    const arc = (a0, a1, r0, r1) => { const p = (aa, r) => [r*Math.cos(aa*rad), r*Math.sin(aa*rad)], [x0, y0] = p(a0, r1), [x1, y1] = p(a1, r1), [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0);
      return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 0 0 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 0 1 ${f1(x3)} ${f1(y3)}Z`; };
    const ang = lon => 180 - lon; // le Bélier à gauche, sens antihoraire, comme une carte du ciel
    let s = `<svg viewBox="-170 -170 340 340" class="m-dec" role="img" aria-label="La roue des 36 décans">`;
    DECANS.forEach(x => { const a0 = ang(x.de), a1 = ang(x.de + 10), p = PL[x.ruler], on = x.i === cur, m = (a0 + a1)/2*rad;
      s += `<g class="m-dec-d${on ? " on" : ""}" data-dec="${x.i}" role="button" tabindex="0" aria-label="${x.d + 1}e décan ${x.sg.du || ""}, ${p.nom}, ${x.carte.nom}">
        <path d="${arc(a0, a1, 92, 128)}" style="--pc:${p.hex}" class="m-dec-w"/>
        <text x="${f1(Math.cos(m)*118)}" y="${f1(Math.sin(m)*118 + 1)}" class="m-dec-gl" style="fill:${p.hex}">${p.gl}${T}</text>
        <text x="${f1(Math.cos(m)*101)}" y="${f1(Math.sin(m)*101 + 1)}" class="m-dec-n">${x.n}</text></g>`; });
    for(let k = 0; k < 12; k++){ const a0 = ang(k*30), a1 = ang(k*30 + 30), m = (a0 + a1)/2*rad, sg = AC.SG[k];
      s += `<path d="${arc(a0, a1, 130, 158)}" class="m-dec-sg el-${ELS[k % 4]}"/><text x="${f1(Math.cos(m)*144)}" y="${f1(Math.sin(m)*144 + 1)}" class="m-dec-sgl">${sg.gl}${T}</text>`; }
    const sa = ang(sl)*rad;
    s += `<circle r="88" class="m-dec-in"/><line x1="0" y1="0" x2="${f1(Math.cos(sa)*86)}" y2="${f1(Math.sin(sa)*86)}" class="m-dec-sunl"/><circle cx="${f1(Math.cos(sa)*86)}" cy="${f1(Math.sin(sa)*86)}" r="6" class="m-dec-sun"/>
      <text y="-8" class="m-dec-c1">Le Soleil</text><text y="10" class="m-dec-c2">${f1(sl % 30)}° ${AC.SG[Math.floor(sl/30)].nom}</text></svg>`;
    host.innerHTML = `<div class="m-decwrap">${s}</div><p class="m-dec-now">Aujourd'hui, le Soleil est dans le <b>${cur % 3 + 1}<sup>e</sup> décan ${AC.SG[Math.floor(cur/3)].du || ""}</b>, gouverné par ${PL[DECANS[cur].ruler].nom} : ${DECANS[cur].carte.nom}.</p>
      <figcaption>Planètes des décans dans l'ordre chaldéen, à partir de Mars au premier décan du Bélier. Cartes du tarot selon la Golden Dawn. Touche un décan.</figcaption>`;
    qa("[data-dec]", host).forEach(g => { const f = () => decanSheet(+g.dataset.dec); g.onclick = f; g.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
  }
  function decanSheet(i){
    const x = DECANS[i], p = PL[x.ruler];
    let dates = "";
    try{ const Ae = A(), y = new Date(); const s0 = Ae.SearchSunLongitude(x.de, new Date(y.getFullYear(), 0, 1), 370), s1 = Ae.SearchSunLongitude((x.de + 10) % 360, s0.date, 40);
      if(s0 && s1) dates = `du ${fmt(s0.date, {day:"numeric", month:"long"})} au ${fmt(s1.date, {day:"numeric", month:"long"})}`; }catch(e){}
    sheet(`<p class="eyebrow">Décan ${i + 1} sur 36 · ${x.de % 30}° à ${x.de % 30 + 10}°</p>
      <div class="m-path-head"><img class="m-trump" src="jeux/ws/${x.carte.id}.webp" alt="${h(x.carte.nom)}, tarot Waite-Smith" loading="lazy">
      <div><h2>${x.d + 1}<sup>e</sup> décan ${x.sg.du || ""}</h2><p class="m-lede">${x.sg.gl}${T} ${x.sg.nom} · gouverné par <span style="color:${p.hex}">${p.gl}${T} ${p.nom}</span></p>
      <dl class="m-corr one"><div><dt>Carte</dt><dd>${x.carte.nom}</dd></div>${dates ? `<div><dt>Le Soleil y passe</dt><dd>${dates}</dd></div>` : ""}<div><dt>Élément du signe</dt><dd>${cap(x.el)}</dd></div></dl></div></div>
      <p>Pendant ces dix jours, la tradition colore le signe ${x.sg.du || ""} par ${p.nom} : ${p.domaines.split(", ").slice(0, 2).join(" et ")}.</p>
      <p class="help m-left">Maîtres des décans dans l'ordre chaldéen (Ptolémée les appelle les « faces ») ; cartes selon la Golden Dawn. Illustration : tarot Waite-Smith (1909).</p>
      <div class="m-acts"><button type="button" class="btn ghost small" data-mpl="${x.ruler}">${p.nom}</button></div>`);
  }

  /* ================================================================
     4. LA GÉOMANCIE
     ================================================================ */
  function shieldHTML(S, o = {}){
    const cell = (p, role, k) => { const g = GEOF[p.join("")]; return `<button type="button" class="m-sh-c${o.judge && k === "j" ? " judge" : ""}" data-gfig="${p.join("")}" data-grole="${role}" style="--k:${o.anim ? (o.order[k] || 0) : 0}"><span class="m-sh-r">${role}</span>${figSVG(p)}<b>${g.nom}</b></button>`; };
    const ord = {m0:0, m1:1, m2:2, m3:3, f0:4, f1:5, f2:6, f3:7, n0:8, n1:9, n2:10, n3:11, td:12, tg:13, j:14};
    const op = Object.assign({}, o, {order:ord, judge:true});
    o = op;
    return `<div class="m-shield${o.anim ? " anim" : ""}">
      <div class="m-sh-row r8">${[3,2,1,0].map(i => cell(S.f[i], `Fille ${i + 1}`, "f" + i)).join("")}${[3,2,1,0].map(i => cell(S.m[i], `Mère ${i + 1}`, "m" + i)).join("")}</div>
      <div class="m-sh-row r4">${[3,2,1,0].map(i => cell(S.n[i], `Nièce ${i + 1}`, "n" + i)).join("")}</div>
      <div class="m-sh-row r2">${cell(S.tg, "Témoin gauche", "tg")}${cell(S.td, "Témoin droit", "td")}</div>
      <div class="m-sh-row r1">${cell(S.j, "Le Juge", "j")}</div></div>`;
  }
  function bindShield(root){ qa("[data-gfig]", root).forEach(b => b.onclick = () => figSheet(GEOF[b.dataset.gfig], b.dataset.grole)); }
  function geoTool(host, o = {}){
    let q = "", lines = [], phase = "q";
    const render = () => {
      if(phase === "q"){
        host.innerHTML = `<div class="m-geo"><div class="m-form inline"><label>Ta question<input type="text" maxlength="140" placeholder="Une seule question, claire" data-gq value="${h(q)}"></label></div>
          <div class="m-acts"><button type="button" class="btn" data-gstart>Tracer les seize lignes</button><button type="button" class="btn ghost small" data-gauto>Laisser le hasard tracer</button></div>
          <p class="help">Tu vas taper des points sur une ligne, sans les compter, puis passer à la suivante. Seize fois.</p></div>`;
        q1("[data-gq]", host).oninput = e => q = e.target.value;
        q1("[data-gstart]", host).onclick = () => { lines = []; phase = "t"; render(); };
        q1("[data-gauto]", host).onclick = () => { lines = Array.from({length:16}, () => 3 + Math.floor(Math.random()*9)); phase = "s"; render(); };
        return;
      }
      if(phase === "t"){
        const i = lines.length; let n = 0;
        host.innerHTML = `<div class="m-geo"><p class="eyebrow">Ligne ${i + 1} sur 16 · Mère ${Math.floor(i/4) + 1}</p>
          <div class="m-geo-pad" data-gpad role="button" tabindex="0" aria-label="Taper des points"><div class="m-geo-dots"></div><span class="m-geo-hint">Tape ici, sans compter</span></div>
          <div class="m-geo-prog">${Array.from({length:16}, (_x, k) => `<i class="${k < i ? "d" : k === i ? "c" : ""}"></i>`).join("")}</div>
          <div class="m-acts"><button type="button" class="btn" data-gnext disabled>Ligne suivante</button><button type="button" class="btn ghost small" data-grest>Le hasard pour le reste</button></div></div>`;
        const pad = q1("[data-gpad]", host), dots = q1(".m-geo-dots", host), nx = q1("[data-gnext]", host);
        const add = e => { n++; const d = document.createElement("i"); d.style.left = (8 + Math.random()*84) + "%"; d.style.top = (18 + Math.random()*64) + "%"; dots.appendChild(d); nx.disabled = false; q1(".m-geo-hint", host).style.opacity = 0; if(e) e.preventDefault(); };
        pad.onpointerdown = add; pad.onkeydown = e => { if(e.key === " " || e.key === "Enter") add(e); };
        nx.onclick = () => { lines.push(n); if(lines.length >= 16) phase = "s"; render(); };
        q1("[data-grest]", host).onclick = () => { while(lines.length < 16) lines.push(3 + Math.floor(Math.random()*9)); phase = "s"; render(); };
        return;
      }
      const P = lines.map(n => n % 2 ? 1 : 2), Ms = [0,1,2,3].map(i => P.slice(i*4, i*4 + 4)), S = shield(Ms), J = GEOF[S.j.join("")];
      host.innerHTML = `<div class="m-geo">${q ? `<p class="m-geo-q">« ${h(q)} »</p>` : ""}${shieldHTML(S, {anim:true})}
        <div class="m-geo-ans"><p class="eyebrow">Le Juge</p><h3>${J.nom}, ${J.fr}</h3><p>${J.sens}</p>
        <p class="help m-left">Témoin droit : ${GEOF[S.td.join("")].nom}. Témoin gauche : ${GEOF[S.tg.join("")].nom}. Le Juge a ${S.j.reduce((a, b) => a + b, 0)} points, un nombre pair, comme il se doit.</p></div>
        <div class="m-acts"><button type="button" class="btn small" data-gsave>Garder dans le carnet</button><button type="button" class="btn ghost small" data-gagain>Nouvelle question</button></div></div>`;
      bindShield(host);
      q1("[data-gagain]", host).onclick = () => { q = ""; lines = []; phase = "q"; render(); };
      q1("[data-gsave]", host).onclick = e => { const s = st(); s.carnet.unshift({id:uid(), t:Date.now(), type:"geomancie", titre:"Géomancie" + (q ? " : " + q.slice(0, 60) : ""), intention:q, texte:`Mères : ${Ms.map(m => GEOF[m.join("")].nom).join(", ")}.\nTémoins : ${GEOF[S.td.join("")].nom} (droit), ${GEOF[S.tg.join("")].nom} (gauche).\nJuge : ${J.nom}.\n\nCe que j'en fais : `, calme:3}); save(); e.target.textContent = "Gardé dans le carnet ✓"; e.target.disabled = true; };
    };
    render();
  }

  /* ================================================================
     5. LA GUÉMATRIE
     ================================================================ */
  const HV = Object.fromEntries(C2.HEBREU.map(x => [x.l, x.v]));
  Object.assign(HV, C2.FINALES);
  const ATB = (() => { const L = C2.HEBREU.map(x => x.l), m = {}; L.forEach((l, i) => m[l] = L[21 - i]); const fin = {"ך":"כ","ם":"מ","ן":"נ","ף":"פ","ץ":"צ"}; Object.entries(fin).forEach(([f, b]) => m[f] = m[b]); return m; })();
  const hval = w => [...w].reduce((a, c) => a + (HV[c] || 0), 0);
  const latv = w => [...String(w).normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase()].filter(c => c >= "A" && c <= "Z").map(c => [c, c.charCodeAt(0) - 64]);
  function gemaTool(host, o = {}){
    let mode = "he", w = "אחד", fr = "Arcanes";
    const render = () => {
      if(mode === "he"){
        const v = hval(w), same = C2.EXEMPLES_GEMATRIE.filter(x => x.w !== w && hval(x.w) === v);
        host.innerHTML = `<div class="sc-seg m-seg" role="group"><button type="button" data-gm="he" aria-pressed="true">Hébreu</button><button type="button" data-gm="fr" aria-pressed="false">Français, guématrie simple</button></div>
          <div class="m-gem"><div class="m-gem-w" dir="rtl" lang="he">${w ? [...w].map(c => `<span>${c}</span>`).join("") : `<em>Touche des lettres</em>`}</div>
          <p class="m-gem-sum">${w ? [...w].map(c => `<span><b lang="he">${c}</b>${HV[c] || 0}</span>`).join("<i>+</i>") + `<i>=</i><strong>${v}</strong>` : ""}</p>
          ${same.length ? `<p class="m-gem-same">Même valeur que ${same.map(x => `<b lang="he">${x.w}</b> (${x.tr}, « ${x.fr} »)`).join(", ")}.</p>` : ""}
          <div class="m-gem-kb" dir="rtl">${C2.HEBREU.map(x => `<button type="button" data-gk="${x.l}" class="f-${x.f === "mère" ? "m" : x.f === "double" ? "d" : "s"}" aria-label="${x.nom}, ${x.v}"><b lang="he">${x.l}</b><small>${x.v}</small></button>`).join("")}${Object.entries(C2.FINALES).map(([l]) => `<button type="button" data-gk="${l}" class="fin" aria-label="finale"><b lang="he">${l}</b><small>fin.</small></button>`).join("")}</div>
          <div class="m-acts"><button type="button" class="btn ghost small" data-gdel>Effacer une lettre</button><button type="button" class="btn ghost small" data-gclr>Tout effacer</button><button type="button" class="btn small" data-gatb>Atbash</button></div>
          <div class="m-gem-ex"><span class="eyebrow">Exemples</span>${C2.EXEMPLES_GEMATRIE.map(x => `<button type="button" class="chip" data-gex="${x.w}"><b lang="he">${x.w}</b> ${x.fr} · ${hval(x.w)}</button>`).join("")}</div>
          <p class="m-gem-atb" hidden></p></div>
          <figcaption>Valeurs classiques des 22 lettres. Les formes finales gardent ici la valeur de leur lettre. Mères en rouge, doubles en or, simples en encre.</figcaption>`;
        qa("[data-gk]", host).forEach(b => b.onclick = () => { if(w.length < 12){ w += b.dataset.gk; render(); } });
        q1("[data-gdel]", host).onclick = () => { w = [...w].slice(0, -1).join(""); render(); };
        q1("[data-gclr]", host).onclick = () => { w = ""; render(); };
        qa("[data-gex]", host).forEach(b => b.onclick = () => { w = b.dataset.gex; render(); });
        q1("[data-gatb]", host).onclick = () => { const t = [...w].map(c => ATB[c] || c).join(""), p = q1(".m-gem-atb", host); p.hidden = false; p.innerHTML = w ? `En atbash, <b lang="he">${w}</b> devient <b lang="he">${t}</b>, qui vaut ${hval(t)}.${w === "בבל" || t === "בבל" ? " C'est le « Sheshakh » de Jérémie !" : ""}` : "Écris d'abord un mot."; };
      } else {
        const L = latv(fr), v = L.reduce((a, b) => a + b[1], 0), red = (n => { while(n > 9) n = String(n).split("").reduce((a, b) => a + +b, 0); return n; })(v);
        host.innerHTML = `<div class="sc-seg m-seg" role="group"><button type="button" data-gm="he" aria-pressed="false">Hébreu</button><button type="button" data-gm="fr" aria-pressed="true">Français, guématrie simple</button></div>
          <div class="m-gem"><div class="m-form inline"><label>Un mot ou un nom<input type="text" maxlength="40" value="${h(fr)}" data-gfr></label></div>
          <p class="m-gem-sum">${L.map(([c, n]) => `<span><b>${c}</b>${n}</span>`).join("<i>+</i>")}${L.length ? `<i>=</i><strong>${v}</strong>` : ""}</p>
          <p class="help">Réduction (somme des chiffres jusqu'à un seul) : <b>${red}</b>.</p></div>
          <figcaption>A = 1, B = 2… Z = 26 : une adaptation moderne. Agrippa donnait des tables pour le grec et le latin, différentes de celle-ci.</figcaption>`;
        const inp = q1("[data-gfr]", host); inp.oninput = e => { fr = e.target.value; const pos = e.target.selectionStart; render(); const n = q1("[data-gfr]", host); n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e2){} };
      }
      qa("[data-gm]", host).forEach(b => b.onclick = () => { mode = b.dataset.gm; render(); });
    };
    render();
  }

  /* ================================================================
     6. LA MONADE DE DEE
     ================================================================ */
  const MON = [
    {t:"Le point", txt:"Tout commence par un point : l'unité, d'où tout sort. Dee : par la ligne droite et le cercle, les choses ont été d'abord représentées."},
    {t:"Le cercle : le Soleil", txt:"Le point tourne autour de lui-même et trace le cercle. Point et cercle ensemble : le glyphe du Soleil ☉."},
    {t:"Le croissant : la Lune", txt:"Au-dessus, un croissant qui touche le cercle : la Lune ☽, qui reçoit sa lumière du Soleil."},
    {t:"La croix : les éléments", txt:"En dessous, la croix : les quatre éléments, mais aussi le trois (une ligne et ses deux côtés) et le quatre, dont la somme fait sept."},
    {t:"Le Bélier : le feu", txt:"Tout en bas, les deux cornes du Bélier ♈ : le feu, qui met l'œuvre en mouvement, au premier signe du zodiaque."},
    {t:"La Monade entière", txt:"Prends-en des morceaux : croissant et croix font Saturne ♄ et Jupiter ♃ ; cercle et croix, Vénus ♀ ; croissant, cercle et croix, Mercure ☿ ; cercle et cornes, Mars ♂."}
  ];
  function monadeSVG(k){
    const show = i => k >= i ? " on" : "", cur = i => k === i ? " cur" : "";
    return `<svg viewBox="-100 -130 200 270" class="m-mon" role="img" aria-label="La Monade hiéroglyphique, étape ${k + 1}">
      <circle r="4.2" class="m-mon-p${show(0)}${cur(0)}"/>
      <circle r="34" class="m-mon-s${show(1)}${cur(1)}" pathLength="1"/>
      <path d="M-40 -74 A40 40 0 0 0 40 -74 A42.57 42.57 0 0 1 -40 -74Z" class="m-mon-s${show(2)}${cur(2)}" pathLength="1"/>
      <path d="M0 34 L0 100 M-28 64 L28 64" class="m-mon-s${show(3)}${cur(3)}" pathLength="1"/>
      <path d="M0 100 A15 15 0 0 0 -30 100 M0 100 A15 15 0 0 1 30 100" class="m-mon-s${show(4)}${cur(4)}" pathLength="1"/>
      ${k >= 5 ? `<g class="m-mon-lab"><text x="62" y="-74">☽ Lune</text><text x="62" y="4">☉ Soleil</text><text x="62" y="68">✚ Éléments</text><text x="62" y="112">♈ Feu</text></g>` : ""}</svg>`;
  }
  function monadeTool(host, o = {}){
    let k = o.full ? 0 : 5, tm = null;
    const draw = () => { host.innerHTML = `<div class="m-monwrap">${monadeSVG(k)}<div class="m-mon-t"><p class="eyebrow">Étape ${k + 1} sur ${MON.length}</p><h3>${MON[k].t}</h3><p>${MON[k].txt}</p>
        ${k === 5 ? `<p class="m-mon-gl">${["♄","♃","♂","☉","♀","☿","☽"].map(g => `<span class="ag mg">${g}${T}</span>`).join("")}</p>` : ""}</div></div>
      <div class="m-acts"><button type="button" class="btn ghost small" data-mk="-1"${k === 0 ? " disabled" : ""}>←</button><button type="button" class="btn small" data-mk="1"${k === 5 ? " disabled" : ""}>Étape suivante</button><button type="button" class="btn ghost small" data-mall>Tout tracer</button></div>
      <figcaption>D'après John Dee, <i>Monas hieroglyphica</i>, Anvers, 1564. Construction simplifiée des premiers théorèmes.</figcaption>`;
      qa("[data-mk]", host).forEach(b => b.onclick = () => { clearInterval(tm); k = Math.max(0, Math.min(5, k + +b.dataset.mk)); draw(); });
      q1("[data-mall]", host).onclick = () => { clearInterval(tm); k = 0; draw(); tm = setInterval(() => { if(!host.isConnected || k >= 5){ clearInterval(tm); return; } k++; draw(); }, 1700); }; };
    draw();
  }

  /* ================================================================
     7. LES ROUES DE LULLE
     ================================================================ */
  const LUL = {
    l:["B","C","D","E","F","G","H","I","K"],
    s:["la bonté","la grandeur","l'éternité","le pouvoir","la sagesse","la volonté","la vertu","la vérité","la gloire"],
    g:["f","f","f","m","f","f","f","f","f"],
    a:[["bon","bonne"],["grand","grande"],["éternel","éternelle"],["puissant","puissante"],["sage","sage"],["aimant","aimante"],["vertueux","vertueuse"],["vrai","vraie"],["glorieux","glorieuse"]],
    t:["par différence","par concordance","par contrariété","au commencement","au milieu","à la fin","par majorité","par égalité","par minorité"]
  };
  function rouesTool(host, o = {}){
    const pos = [0, 1, 1];
    const ring = (r, labels, k, cls) => labels.map((x, i) => { const a = (-90 + i*40)*rad; return `<text x="${f1(Math.cos(a)*r)}" y="${f1(Math.sin(a)*r + 1)}" class="m-lu-t ${cls}" style="transform-origin:${f1(Math.cos(a)*r)}px ${f1(Math.sin(a)*r)}px; transform:rotate(${(i*40)}deg)">${x}</text>`; }).join("");
    host.innerHTML = `<div class="m-lull"><svg viewBox="-150 -150 300 300" class="m-lu" role="img" aria-label="Les trois roues de Lulle">
      <circle r="142" class="m-lu-c c3"/><g class="m-lu-r" data-lr="2">${ring(128, LUL.t.map(t => t.replace(/^par |^au |^à la /, "")), 2, "x")}</g>
      <circle r="112" class="m-lu-c c2"/><g class="m-lu-r" data-lr="1">${ring(98, LUL.l, 1, "l")}</g>
      <circle r="84" class="m-lu-c c1"/><g class="m-lu-r" data-lr="0">${ring(70, LUL.l, 0, "l")}</g>
      <circle r="52" class="m-lu-c c0"/><text y="-4" class="m-lu-a">A</text><text y="14" class="m-lu-as">Dieu</text>
      <path d="M0 -150 L-7 -138 L7 -138Z" class="m-lu-ptr"/></svg>
      <p class="m-lu-read"></p>
      <div class="m-lu-ctl">${["Intérieure","Médiane","Extérieure"].map((n, i) => `<span><button type="button" class="btn ghost small" data-lrot="${i}:-1" aria-label="Tourner la roue ${n.toLowerCase()} à gauche">‹</button><small>${n}</small><button type="button" class="btn ghost small" data-lrot="${i}:1" aria-label="Tourner la roue ${n.toLowerCase()} à droite">›</button></span>`).join("")}</div>
      <div class="m-acts"><button type="button" class="btn small" data-lspin>Faire tourner</button></div></div>
      <figcaption>D'après Raymond Lulle, <i>Ars brevis</i> (1308) : neuf dignités, de B à K, et les principes relatifs de la figure T. Lis la ligne sous la flèche.</figcaption>`;
    const apply = (spin) => {
      qa("[data-lr]", host).forEach(g => { const i = +g.dataset.lr; g.style.transition = spin ? "transform 1.6s cubic-bezier(.2,.8,.2,1)" : "transform .45s cubic-bezier(.3,.7,.3,1)"; g.style.transform = `rotate(${-pos[i]*40}deg)`; });
      const n = i => ((pos[i] % 9) + 9) % 9, s = n(0), p = n(1), t = n(2);
      q1(".m-lu-read", host).innerHTML = `<b>${LUL.l[s]} ${LUL.l[p]}</b> · ${cap(LUL.s[s])} est ${LUL.a[p][LUL.g[s] === "m" ? 0 : 1]}, ${LUL.t[t]}.`;
    };
    qa("[data-lrot]", host).forEach(b => b.onclick = () => { const [i, d] = b.dataset.lrot.split(":").map(Number); pos[i] += d; apply(false); });
    q1("[data-lspin]", host).onclick = () => { [0,1,2].forEach(i => pos[i] += 9*(i % 2 ? -1 : 1) + Math.floor(Math.random()*9)); apply(true); };
    apply(false);
  }

  /* ================================================================
     8. LE PALAIS DE MÉMOIRE
     ================================================================ */
  const LIEUX = [["La porte d'entrée",-88,46],["La table",-34,8],["La fenêtre",44,-62],["Le lit",70,40],["La lampe",-70,-50]];
  const MOTS = ["une baleine","un parapluie","une couronne","un violon","une échelle","un hibou","une clé d'or","un tambour","une pomme rouge","un miroir","une ancre","un phare","une plume","un sablier","un renard","une boussole","un éventail","une cloche","un serpent","une lanterne","un chapeau","une étoile de mer","une harpe","un dé","un sabre","une montgolfière","une tortue","un coquillage","une fourchette géante","un flamant rose"];
  function palaisTool(host, o = {}){
    let words = [], placed = [], phase = "intro", ask = 0, score = 0, choice = [];
    const plan = (act, lab) => `<svg viewBox="-130 -100 260 200" class="m-pal" role="img" aria-label="Le plan du palais">
      <rect x="-122" y="-92" width="244" height="184" rx="6" class="m-pal-w"/><path d="M-122 20 H-60 M10 -92 V-20 M10 20 V92 M60 20 H122" class="m-pal-in"/>
      ${LIEUX.map(([n, x, y], i) => `<g class="m-pal-l${act === i ? " on" : ""}${placed[i] != null ? " full" : ""}" data-pl="${i}" role="button" tabindex="0" aria-label="${n}"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 1}" class="n">${i + 1}</text>
        <text x="${x}" y="${y + 28}" class="lab">${lab ? lab(i) : n}</text></g>`).join("")}</svg>`;
    const render = () => {
      if(phase === "intro"){
        host.innerHTML = `<div class="m-palwrap">${plan(-1)}<p class="m-lede">Cinq lieux, dans l'ordre : la porte, la table, la fenêtre, le lit, la lampe. Tu vas y déposer cinq choses en imaginant à chaque fois une scène frappante.</p>
          <div class="m-acts"><button type="button" class="btn" data-pgo>Commencer</button></div>${st().palais ? `<p class="help">Ton meilleur score : ${st().palais}/5.</p>` : ""}</div>`;
        q1("[data-pgo]", host).onclick = () => { words = [...MOTS].sort(() => Math.random() - .5).slice(0, 5); placed = []; phase = "place"; render(); };
      } else if(phase === "place"){
        const i = placed.length;
        host.innerHTML = `<div class="m-palwrap">${plan(i, j => placed[j] != null ? words[j] : LIEUX[j][0])}
          <p class="m-pal-w1">Lieu ${i + 1} · ${LIEUX[i][0]}</p><p class="m-pal-word">${words[i]}</p>
          <p class="help">Imagine ${words[i]} à cet endroit, de la façon la plus étrange ou la plus drôle possible. Prends trois secondes, puis touche le lieu.</p></div>`;
        qa("[data-pl]", host).forEach(g => g.onclick = () => { if(+g.dataset.pl !== i) return; placed[i] = i; if(placed.length >= 5){ phase = "pause"; } render(); });
      } else if(phase === "pause"){
        host.innerHTML = `<div class="m-palwrap">${plan(-1)}<p class="m-lede">C'est rangé. Ferme les yeux, refais le chemin de la porte à la lampe, et revois chaque scène.</p><div class="m-acts"><button type="button" class="btn" data-prec>Réciter</button></div></div>`;
        q1("[data-prec]", host).onclick = () => { phase = "recall"; ask = 0; score = 0; render(); };
      } else if(phase === "recall"){
        choice = [words[ask], ...[...MOTS].filter(w => !words.includes(w)).sort(() => Math.random() - .5).slice(0, 3)].sort(() => Math.random() - .5);
        host.innerHTML = `<div class="m-palwrap">${plan(ask, () => "")}<p class="m-pal-w1">Lieu ${ask + 1} · ${LIEUX[ask][0]}</p><p class="help">Qu'y avais-tu placé ?</p>
          <div class="m-ans">${choice.map(w => `<button type="button" class="m-an" data-pw="${h(w)}">${w}</button>`).join("")}</div></div>`;
        qa("[data-pw]", host).forEach(b => b.onclick = () => { const ok = b.dataset.pw === words[ask]; if(ok) score++; b.classList.add(ok ? "ok" : "ko"); qa("[data-pw]", host).forEach(x => { x.disabled = true; if(x.dataset.pw === words[ask]) x.classList.add("ok"); });
          setTimeout(() => { ask++; if(ask >= 5){ phase = "end"; const s = st(); s.palais = Math.max(s.palais || 0, score); save(); } render(); }, 800); });
      } else {
        host.innerHTML = `<div class="m-palwrap">${plan(-1, j => words[j])}<p class="m-quiz-score">${score} sur 5</p><p class="m-lede">${score === 5 ? "Sans faute. Simonide serait content." : "Recommence demain avec cinq nouveaux mots : la méthode s'améliore vite."}</p>
          <div class="m-acts"><button type="button" class="btn small" data-pgo>Encore</button></div></div>`;
        q1("[data-pgo]", host).onclick = () => { words = [...MOTS].sort(() => Math.random() - .5).slice(0, 5); placed = []; phase = "place"; render(); };
      }
    };
    render();
  }

  /* ================================================================
     L'ATELIER : enregistrement des outils
     ================================================================ */
  const ICON = {
    kepler:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><circle cx="30" cy="30" r="16" class="f"/><circle cx="30" cy="30" r="4" class="d2"/><path d="M8 44 C18 36 22 52 32 44 S46 36 52 44" class="s"/><circle cx="46" cy="18" r="3" class="dd"/></svg>`,
    toile:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><circle cx="30" cy="30" r="15" class="f"/>${[0,1,2,3,4,5,6].map(i => { const a = (-90 + i*360/7)*rad; return `<line x1="30" y1="30" x2="${f1(30 + Math.cos(a)*25)}" y2="${f1(30 + Math.sin(a)*25)}" class="${i === 0 ? "s" : "f"}"/>`; }).join("")}<circle cx="30" cy="5" r="3.4" class="dd"/></svg>`,
    decans:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><circle cx="30" cy="30" r="17" class="f"/>${Array.from({length:36}, (_x, i) => { const a = i*10*rad; return `<line x1="${f1(30 + Math.cos(a)*17)}" y1="${f1(30 + Math.sin(a)*17)}" x2="${f1(30 + Math.cos(a)*(i % 3 ? 21 : 25))}" y2="${f1(30 + Math.sin(a)*(i % 3 ? 21 : 25))}" class="f"/>`; }).join("")}<circle cx="30" cy="30" r="5" class="d2"/><line x1="30" y1="30" x2="44" y2="20" class="s"/></svg>`,
    geomancie:`<svg viewBox="0 0 60 60" aria-hidden="true"><g class="dd"><circle cx="30" cy="10" r="3"/><circle cx="23" cy="22" r="3"/><circle cx="37" cy="22" r="3"/><circle cx="30" cy="34" r="3"/><circle cx="23" cy="46" r="3"/><circle cx="37" cy="46" r="3"/></g><path d="M8 54 H52" class="f"/></svg>`,
    guematrie:`<svg viewBox="0 0 60 60" aria-hidden="true"><text x="30" y="34" class="heb" text-anchor="middle">א</text><path d="M10 46 H50" class="f"/><text x="30" y="56" class="num" text-anchor="middle">= 1</text></svg>`,
    monade:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="24" r="8" class="s"/><circle cx="30" cy="24" r="1.6" class="dd"/><path d="M20 10 A10 10 0 0 0 40 10" class="s"/><path d="M30 32 V48 M24 40 H36 M30 48 A4 4 0 0 0 22 48 M30 48 A4 4 0 0 1 38 48" class="s"/></svg>`,
    roues:`<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><circle cx="30" cy="30" r="17" class="f"/><circle cx="30" cy="30" r="9" class="s"/><path d="M30 2 L27 8 H33Z" class="dd"/><text x="30" y="34" class="num" text-anchor="middle">A</text></svg>`,
    palais:`<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="8" y="12" width="44" height="38" rx="2" class="f"/><path d="M8 32 H22 M30 12 V26 M30 36 V50" class="f"/><g class="dd"><circle cx="14" cy="44" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="42" cy="18" r="3"/><circle cx="44" cy="40" r="3"/></g><path d="M14 44 L24 24 L42 18 L44 40" class="s"/></svg>`
  };
  Object.assign(X.toolIcon, ICON);
  const TOOLDEF = [
    ["kepler", "L'harmonie des sphères", "La musique des planètes, calculée d'après Kepler pour aujourd'hui", keplerTool, "Écoute les planètes chanter leur vitesse autour du Soleil, comme Kepler l'a calculé en 1619."],
    ["toile", "La toile des correspondances", "Jour, métal, couleur, note, sephira, lettre, lame : tout relié d'un geste", toileTool, "Touche une planète : ses correspondances s'allument sur toute la toile."],
    ["decans", "La roue des décans", "Les 36 visages du zodiaque, leur planète et leur carte du tarot", decansTool, "Le Soleil traverse un décan tous les dix jours environ. Le voici aujourd'hui."],
    ["geomancie", "La géomancie", "Seize lignes de points, et le bouclier jusqu'au Juge", geoTool, "Une question, seize lignes de points, et le bouclier se construit jusqu'au Juge."],
    ["guematrie", "La guématrie", "La valeur des mots en lettres hébraïques, et l'atbash", gemaTool, "Compose un mot en lettres hébraïques : sa valeur, les mots qui l'égalent, son reflet en atbash."],
    ["monade", "La Monade de Dee", "Le signe de 1564, construit étape par étape", monadeTool, "Le signe unique de John Dee, construit comme un théorème."],
    ["roues", "Les roues de Lulle", "La machine à penser de Raymond Lulle", rouesTool, "Tourne les roues et lis la phrase qui se forme sous la flèche."],
    ["palais", "Le palais de mémoire", "La méthode des lieux, en cinq étapes", palaisTool, "Cinq lieux, cinq images : la plus vieille technique de mémoire, et la plus efficace."]
  ];
  TOOLDEF.forEach(([k, t, d, fn, sous]) => { X.tools.push([k, t, d, k]); X.toolRender[k] = {t, sous, render:fn}; });

  /* ================================================================
     LES SCHÉMAS DES LEÇONS
     ================================================================ */
  const S = _.schemas;
  S.ame = fig => {
    const N = [["L'Un", "Au-delà de tout, sans forme ni nom. Tout en procède, comme la lumière du soleil."],["L'Intellect", "La pensée qui se pense elle-même : le lieu des Idées, les modèles de toutes choses."],["L'Âme du monde", "Elle anime le cosmos entier et relie ses parties : c'est par elle que tout « sympathise »."],["La Nature", "L'âme à l'œuvre dans les corps : la croissance des plantes, le mouvement des astres."],["La matière", "Le dernier reflet, presque rien : ce qui reçoit les formes."]];
    let k = 2;
    const draw = () => { fig.innerHTML = `<div class="m-ame">${N.map(([t], i) => `<button type="button" class="m-ame-l l${i}${i === k ? " on" : ""}" data-al="${i}" style="--w:${100 - i*14}%"><span>${t}</span></button>`).join("")}
      <svg class="m-ame-arr" viewBox="0 0 40 260" aria-hidden="true"><path d="M12 10 V240" class="down"/><path d="M8 230 L12 242 L16 230" class="down"/><path d="M28 250 V20" class="up"/><path d="M24 30 L28 18 L32 30" class="up"/></svg></div>
      <p class="m-ame-d"><b>${N[k][0]}.</b> ${N[k][1]}</p><figcaption>Selon Plotin, tout procède de l'Un par degrés (la flèche qui descend), et tout cherche à y revenir (celle qui monte). La magie agit au troisième étage, dans l'âme du monde.</figcaption>`;
      qa("[data-al]", fig).forEach(b => b.onclick = () => { k = +b.dataset.al; draw(); }); };
    draw();
  };
  S.theurgie = fig => {
    fig.innerHTML = `<div class="m-thg">${[["Goétie","goēteia","Contraindre","Forcer des puissances à obéir, souvent pour nuire. Le mot finira par désigner l'invocation des démons.","↓"],["Magie naturelle","mageia","Utiliser","Se servir des sympathies cachées entre les choses, comme un médecin se sert des plantes.","↔"],["Théurgie","theourgia","S'élever","Se rendre semblable au divin par les rites, et se laisser élever vers lui.","↑"]].map(([t, g, v, d, a], i) => `<article class="m-thg-c c${i}"><span class="m-thg-a" aria-hidden="true">${a}</span><p class="eyebrow">${g}</p><h4>${t}</h4><p class="m-thg-v">${v}</p><p>${d}</p></article>`).join("")}</div>
      <figcaption>Trois attitudes plus que trois techniques : les mêmes gestes peuvent servir l'une ou l'autre.</figcaption>`;
  };
  S.kepler = fig => keplerTool(fig, {full:false});
  S.spiritus = fig => {
    const pl = ["soleil","jupiter","venus"];
    fig.innerHTML = `<svg viewBox="0 0 320 230" class="m-spi" role="img" aria-label="Le spiritus selon Ficin">
      ${pl.map((id, i) => `<g><circle cx="${60 + i*100}" cy="28" r="15" style="fill:${PL[id].hex}" class="m-spi-p"/><text x="${60 + i*100}" y="29" class="m-spi-gl">${PL[id].gl}${T}</text>
        <path d="M${60 + i*100} 46 Q${60 + i*100 + (160 - (60 + i*100))*.3} 90 160 112" class="m-spi-ray" style="stroke:${PL[id].hex}; animation-delay:${i*.6}s"/></g>`).join("")}
      <text x="40" y="88" class="m-spi-s">musique</text><text x="246" y="88" class="m-spi-s">lumière</text><text x="150" y="80" class="m-spi-s">parfum</text>
      <ellipse cx="160" cy="134" rx="74" ry="24" class="m-spi-sp"/><text x="160" y="138" class="m-spi-t">spiritus</text>
      <rect x="40" y="176" width="100" height="36" rx="18" class="m-spi-b"/><text x="90" y="198" class="m-spi-t2">le corps</text>
      <rect x="180" y="176" width="100" height="36" rx="18" class="m-spi-b"/><text x="230" y="198" class="m-spi-t2">l'âme</text>
      <path d="M118 152 L96 174 M202 152 L224 174" class="m-spi-l"/></svg>
      <figcaption>Pour Ficin, la musique, la lumière et les parfums des « trois Grâces » touchent d'abord le spiritus, qui relie le corps et l'âme.</figcaption>`;
  };
  S.chant = fig => {
    let cur = "soleil", on = false;
    const draw = () => { const hy = TX.HYMNES[cur] || {}, p = PL[cur];
      fig.innerHTML = _.chipsPl(cur) + `<div class="m-chant" style="--pc:${p.hex}"><div class="m-chant-g${on ? " on" : ""}"><span class="ag mg">${p.gl}${T}</span></div>
        <div><p class="eyebrow">${hy.parfum ? "Parfum : " + hy.parfum.toLowerCase() : "Hymne orphique"} · note ${Math.round(NOTE[cur])} Hz</p><p class="m-chant-t">${hy.txt ? h(hy.txt.slice(0, 260)) + (hy.txt.length > 260 ? "…" : "") : ""}</p></div></div>
        <div class="m-acts"><button type="button" class="btn small" data-con>${on ? "Arrêter la note" : "Tenir la note"}</button><button type="button" class="btn ghost small" data-mrite="chant:${cur}">Le rituel complet</button></div>
        <figcaption>Hymnes orphiques, trad. Leconte de Lisle (1869). Notes : registre de Kepler pour les planètes ; le Soleil prend la note de la Terre, la Lune une note libre, Kepler n'en donnant pas.</figcaption>`;
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = b.dataset.spl; if(on){ hush("c-"); voice("c-" + cur, NOTE[cur], .07); } draw(); });
      q1("[data-con]", fig).onclick = () => { on = !on; if(on) voice("c-" + cur, NOTE[cur], .07); else hush("c-"); draw(); };
      bindLinks(fig); };
    draw();
    const obs = setInterval(() => { if(!fig.isConnected){ hush("c-"); clearInterval(obs); } }, 1000);
  };
  S.decans = fig => decansTool(fig, {});
  S.geohist = fig => {
    const F = [["IXe s.","Le monde arabe","'Ilm al-raml, la science du sable, d'Afrique du Nord jusqu'en Perse."],["XIIe s.","Hugues de Santalla","La première traduction latine, en Espagne."],["XIIIe-XVe s.","L'Europe savante","Manuels, tables, et même des machines à tirer les figures."],["XVIe-XVIIe s.","Agrippa, Fludd","Les mages philosophes l'intègrent à la magie astrale."],["Aujourd'hui","Le sikidy","À Madagascar, une géomancie vivante, cousine de la science du sable."]];
    fig.innerHTML = `<div class="m-frise m-gh">${F.map(([d, t], i) => `<button type="button" class="m-fr herm" data-gh="${i}"><span class="d">${d}</span><b>${t}</b></button>`).join("")}</div><p class="m-fr-d"></p>`;
    const set = i => { q1(".m-fr-d", fig).innerHTML = `<b>${F[i][1]}, ${F[i][0]}</b> ${F[i][2]}`; qa("[data-gh]", fig).forEach(b => b.classList.toggle("on", +b.dataset.gh === i)); };
    qa("[data-gh]", fig).forEach(b => b.onclick = () => set(+b.dataset.gh)); set(0);
  };
  S.figures = fig => {
    let hide = false;
    const draw = () => { fig.innerHTML = `<div class="m-figs${hide ? " hide" : ""}">${GEO.map(g => `<button type="button" class="m-figc q-${g.q}" data-gf="${g.id}">${figSVG(g.p)}<b>${g.nom}</b><small>${geoGl(g)}${T}</small></button>`).join("")}</div>
      <div class="m-acts"><button type="button" class="btn ghost small" data-gh>${hide ? "Montrer les noms" : "Cacher les noms"}</button></div><figcaption>Vert : favorable · rouge : défavorable · sans couleur : mêlée. Touche une figure.</figcaption>`;
      q1("[data-gh]", fig).onclick = () => { hide = !hide; draw(); };
      qa("[data-gf]", fig).forEach(b => b.onclick = () => { if(hide){ b.classList.add("peek"); setTimeout(() => b.classList.remove("peek"), 1400); } else figSheet(GEO.find(g => g.id === b.dataset.gf)); }); };
    draw();
  };
  S.bouclier = fig => {
    let Ms = [rndFig(), rndFig(), rndFig(), rndFig()], step = 0;
    const draw = () => { const Sh = shield(Ms);
      const lab = ["Les quatre Mères, tirées des seize lignes.","Les Filles : les étages des Mères, lus en travers.","Les Nièces : les figures additionnées deux à deux.","Les Témoins, puis le Juge."][step];
      fig.innerHTML = `<div class="m-bstep s${step}">${shieldHTML(Sh, {})}</div><p class="m-fr-d">${lab}</p>
        <div class="m-acts"><button type="button" class="btn small" data-bs>${step < 3 ? "Étape suivante" : "Nouveau tirage"}</button><button type="button" class="btn ghost small" data-mgo="atelier:geomancie">Ma propre question</button></div>`;
      bindShield(fig); bindLinks(fig);
      q1("[data-bs]", fig).onclick = () => { if(step < 3) step++; else { Ms = [rndFig(), rndFig(), rndFig(), rndFig()]; step = 0; } draw(); }; };
    draw();
  };
  S.alphabet = fig => {
    let cur = 0;
    const draw = () => { const x = C2.HEBREU[cur], p = D.PATHS.find(y => y.lettre === x.nom || y.heb === x.l);
      fig.innerHTML = `<div class="m-alpha" dir="rtl">${C2.HEBREU.map((y, i) => `<button type="button" class="f-${y.f === "mère" ? "m" : y.f === "double" ? "d" : "s"}${i === cur ? " on" : ""}" data-al="${i}"><b lang="he">${y.l}</b><small>${y.v}</small></button>`).join("")}</div>
        <div class="m-alpha-d"><span lang="he" class="m-heb huge">${x.l}</span><div><h4>${x.nom} · ${x.v}</h4><p>Lettre ${x.f} · « ${x.sens} » · ${x.attr}${p ? ` · sentier ${p.n}, ${p.lameNom}` : ""}</p></div></div>
        <figcaption>Rouge : les trois mères · or : les sept doubles · encre : les douze simples. Attributions de la Golden Dawn.</figcaption>`;
      qa("[data-al]", fig).forEach(b => b.onclick = () => { cur = +b.dataset.al; draw(); }); };
    draw();
  };
  S.guematrie = fig => gemaTool(fig, {});
  S.monade = fig => monadeTool(fig, {full:true});
  S.oeuvre = fig => {
    const O = [["nigredo","L'œuvre au noir","#1c1a17","Putréfaction, dissolution : ce qui était doit se défaire. Images : le corbeau, le cadavre, le soleil noir."],["albedo","L'œuvre au blanc","#e9e4d8","Lavage, purification : la matière blanchit. Images : la colombe, la lune, la reine."],["citrinitas","L'œuvre au jaune","#d4a72c","L'aube : la lumière solaire point dans la matière lunaire. Étape souvent omise après le XVe siècle."],["rubedo","L'œuvre au rouge","#9b2c1c","Fixation, union : la pierre est faite. Images : le roi rouge, le phénix, le pélican."]];
    let k = 0;
    const draw = () => { const R = 70;
      fig.innerHTML = `<div class="m-oeuvre"><svg viewBox="-110 -110 220 220" class="m-oe" role="img" aria-label="Les quatre couleurs du grand œuvre">${O.map(([id, t, c], i) => { const a0 = (-90 + i*90)*rad, a1 = (-90 + (i + 1)*90 - 4)*rad;
          return `<path d="M${f1(Math.cos(a0)*R)} ${f1(Math.sin(a0)*R)} A${R} ${R} 0 0 1 ${f1(Math.cos(a1)*R)} ${f1(Math.sin(a1)*R)}" class="m-oe-a${i === k ? " on" : ""}" style="stroke:${c}" data-oe="${i}"/>`; }).join("")}
          <circle r="44" class="m-oe-c" style="fill:${O[k][2]}"/><text y="4" class="m-oe-t" style="fill:${k === 1 || k === 2 ? "#1c1a17" : "#f3ead6"}">${O[k][0]}</text></svg>
        <div><h4>${O[k][1]}</h4><p>${O[k][3]}</p><div class="m-acts start"><button type="button" class="btn ghost small" data-oen>Étape suivante</button></div></div></div>`;
      qa("[data-oe]", fig).forEach(b => b.onclick = () => { k = +b.dataset.oe; draw(); });
      q1("[data-oen]", fig).onclick = () => { k = (k + 1) % 4; draw(); }; };
    draw();
  };
  S.metaux = fig => {
    const L = [["saturne","Plomb"],["jupiter","Étain"],["mars","Fer"],["venus","Cuivre"],["mercure","Vif-argent"],["lune","Argent"],["soleil","Or"]];
    let k = 0;
    const draw = () => { fig.innerHTML = `<div class="m-met"><ol class="m-met-l">${L.map(([id, m], i) => `<li class="${i <= k ? "on" : ""}" style="--pc:${PL[id].hex}"><button type="button" data-mt="${i}"><span class="ag mg">${PL[id].gl}${T}</span><b>${m}</b><small>${PL[id].nom}</small></button></li>`).join("")}</ol>
        <svg viewBox="-70 -70 140 130" class="m-tria" role="img" aria-label="Les trois principes"><path d="M0 -56 L52 36 L-52 36Z" class="m-tria-t"/><text x="0" y="-62" class="m-tria-x">Soufre · l'âme</text><text x="-56" y="54" class="m-tria-x">Mercure · l'esprit</text><text x="56" y="54" class="m-tria-x">Sel · le corps</text><text y="10" class="m-tria-c">tria prima</text></svg></div>
        <figcaption>L'échelle des métaux, du plus lourd au plus pur, et les trois principes de Paracelse. Touche un barreau.</figcaption>`;
      qa("[data-mt]", fig).forEach(b => b.onclick = () => { k = +b.dataset.mt; draw(); }); };
    draw();
  };
  S.lectures = fig => {
    const R = [["Nigredo","Calcination, putréfaction de la matière dans le vase","La rencontre avec l'ombre : ce qu'on refuse de voir en soi"],["Albedo","Lavages et distillations répétés","La clarté retrouvée, l'image intérieure apaisée"],["Rubedo","Fixation de la pierre, qui transmute","L'union des contraires, la personnalité entière : le Soi"]];
    let v = "labo";
    const draw = () => { fig.innerHTML = `<div class="sc-seg m-seg" role="group"><button type="button" data-lv="labo" aria-pressed="${v === "labo"}">Au laboratoire</button><button type="button" data-lv="psy" aria-pressed="${v === "psy"}">Dans la psyché, selon Jung</button></div>
      <dl class="m-corr one m-lect">${R.map(([t, a, b]) => `<div><dt>${t}</dt><dd>${v === "labo" ? a : b}</dd></div>`).join("")}</dl>
      <figcaption>${v === "labo" ? "Ce que faisaient la plupart des alchimistes : de la chimie, dans des vases." : "Une lecture moderne (1944), féconde pour la méditation, qui ne dit pas ce que pensaient les alchimistes."}</figcaption>`;
      qa("[data-lv]", fig).forEach(b => b.onclick = () => { v = b.dataset.lv; draw(); }); };
    draw();
  };
  S.palais = fig => palaisTool(fig, {});
  S.roues = fig => rouesTool(fig, {});
  S.temple = fig => {
    const n = Math.min(st().temple || 0, 7);
    fig.innerHTML = `<div class="m-tplwrap">${templeSVG(n)}<div><p class="eyebrow">Ta progression</p><h4>${n ? `${n} séance${n > 1 ? "s" : ""} sur 7` : "Pas encore commencé"}</h4><p>${n < 7 ? `Prochaine séance : ${TEMPLE[n].t.toLowerCase()}.` : "Le temple est bâti. Tu peux y revenir quand tu veux."}</p>
      <div class="m-acts start"><button type="button" class="btn small" data-mrite="temple">${n < 7 ? (n ? "Continuer" : "Commencer") : "Revenir au temple"}</button></div></div></div>`;
    bindLinks(fig);
  };

  /* ================================================================
     LES RITUELS DU SECOND CERCLE
     ================================================================ */
  const TEMPLE = [
    {t:"Le seuil", steps:[
      {t:"S'installer", txt:"Assieds-toi, le dos droit. Quatre respirations en carré. Laisse le corps s'alourdir un peu.", vis:"temple:0", d:40},
      {t:"Le chemin", txt:"Imagine un chemin calme qui mène à un bâtiment simple. Ne force rien : de quoi est fait le sol sous tes pieds ? Quel temps fait-il ?", vis:"temple:0", d:60},
      {t:"La porte", txt:"Devant toi, une porte. Regarde-la sans l'ouvrir : sa matière, sa couleur, sa poignée. C'est la porte de ton temple.", vis:"temple:0", d:60},
      {t:"Revenir", txt:"Laisse l'image. Sens le poids de ton corps, bouge les mains, ouvre les yeux. Note la porte dans ton carnet.", vis:"temple:0", d:30}]},
    {t:"Le sol et les murs", steps:[
      {t:"Revenir au seuil", txt:"Quelques respirations. Retrouve le chemin, puis la porte. Ouvre-la, entre.", vis:"temple:1", d:50},
      {t:"Le sol", txt:"Le sol est un dallage de carreaux noirs et blancs, comme dans les temples de la Golden Dawn : les contraires, en équilibre sous tes pas.", vis:"temple:1", d:60},
      {t:"Les murs", txt:"Regarde les murs. Ils sont pleins, solides. La pièce est carrée, ni trop grande ni trop petite. Fais-en le tour à pas lents.", vis:"temple:1", d:60},
      {t:"Revenir", txt:"Ressors par la porte, referme-la. Reviens à ton corps et à la pièce où tu es.", vis:"temple:1", d:30}]},
    {t:"Les quatre fenêtres", steps:[
      {t:"Entrer", txt:"Respire, retrouve la porte, entre, sens le dallage sous tes pieds.", vis:"temple:2", d:40},
      {t:"À l'est, l'air", txt:"Face à toi, à l'est, une fenêtre s'ouvre sur un ciel d'aube, un vent léger. Raphaël, disait la Golden Dawn.", vis:"temple:2", d:45},
      {t:"Au sud, le feu", txt:"Tourne-toi vers le sud : une fenêtre sur la lumière de midi, la chaleur. Michaël.", vis:"temple:2", d:45},
      {t:"À l'ouest, l'eau", txt:"À l'ouest : la mer, ou un lac, au soleil couchant. Gabriel.", vis:"temple:2", d:45},
      {t:"Au nord, la terre", txt:"Au nord : des champs, des montagnes, la nuit. Auriel. Reviens face à l'est.", vis:"temple:2", d:45},
      {t:"Revenir", txt:"Ressors, referme la porte. Reviens ici, maintenant.", vis:"temple:2", d:30}]},
    {t:"L'autel", steps:[
      {t:"Entrer", txt:"Respire, entre, salue les quatre fenêtres d'un regard.", vis:"temple:3", d:40},
      {t:"Le centre", txt:"Au centre de la pièce, un autel apparaît : un double cube, de pierre ou de bois noir. Approche-toi.", vis:"temple:3", d:60},
      {t:"Ce qu'il porte", txt:"Pose sur l'autel quelque chose qui compte pour toi en ce moment : un objet, une image, un mot. Ne choisis pas trop : prends ce qui vient.", vis:"temple:3", d:75},
      {t:"Revenir", txt:"Laisse l'objet sur l'autel. Ressors. Reviens à ton corps.", vis:"temple:3", d:30}]},
    {t:"La lampe", steps:[
      {t:"Entrer", txt:"Respire, entre, va jusqu'à l'autel.", vis:"temple:4", d:40},
      {t:"La flamme", txt:"Au-dessus de l'autel, une lampe s'allume. Sa lumière est douce, constante. Elle éclaire la pièce jusqu'aux coins.", vis:"temple:4", d:60},
      {t:"La lumière en toi", txt:"Laisse cette lumière descendre en toi, comme dans le Pilier du milieu : au-dessus de la tête, puis au cœur.", vis:"temple:4", d:60},
      {t:"Revenir", txt:"La lampe reste allumée quand tu pars. Ressors, reviens.", vis:"temple:4", d:30}]},
    {t:"La bibliothèque", steps:[
      {t:"Entrer", txt:"Respire, entre, salue la lampe.", vis:"temple:5", d:40},
      {t:"Les rayonnages", txt:"Contre le mur du nord, des étagères. C'est ta mémoire, rangée : comme le palais de Simonide, chaque chose y a son lieu.", vis:"temple:5", d:60},
      {t:"Un livre", txt:"Prends un livre au hasard. Ouvre-le. Ne lis pas : regarde seulement s'il y a une image, un mot, une couleur.", vis:"temple:5", d:70},
      {t:"Revenir", txt:"Repose le livre. Ressors, referme la porte. Note dans ton carnet ce que tu as vu.", vis:"temple:5", d:30}]},
    {t:"Habiter le temple", steps:[
      {t:"Entrer", txt:"Respire, entre. Tout est là : le dallage, les fenêtres, l'autel, la lampe, les livres.", vis:"temple:6", d:45},
      {t:"S'asseoir", txt:"Assieds-toi près de l'autel. Rien à faire. Sois simplement là, dans ce lieu que tu as bâti.", vis:"temple:6", d:90},
      {t:"La clé", txt:"Choisis un geste, un mot ou une image qui te ramènera ici d'un coup : c'est ta clé.", vis:"temple:6", d:45},
      {t:"Revenir", txt:"Ressors. Le temple restera, tu peux y revenir quand tu veux avec ta clé. Reviens à ton corps.", vis:"temple:6", d:30}]}
  ];
  function templeSVG(n){
    const on = i => n > i ? " on" : "";
    return `<svg viewBox="-80 -80 160 160" class="m-tpl" role="img" aria-label="Le plan du temple intérieur">
      <rect x="-60" y="-60" width="120" height="120" class="m-tpl-w${on(1)}"/>
      <g class="m-tpl-sol${on(1)}">${Array.from({length:36}, (_x, i) => { const r = Math.floor(i/6), c = i % 6; return (r + c) % 2 ? `<rect x="${-60 + c*20}" y="${-60 + r*20}" width="20" height="20"/>` : ""; }).join("")}</g>
      <g class="m-tpl-f${on(2)}"><rect x="-12" y="-66" width="24" height="6" style="fill:#c9a227"/><rect x="60" y="-12" width="6" height="24" style="fill:#b5361f"/><rect x="-12" y="60" width="24" height="6" style="fill:#2b5fa0"/><rect x="-66" y="-12" width="6" height="24" style="fill:#4f6b3a"/></g>
      <rect x="-9" y="-9" width="18" height="18" class="m-tpl-a${on(3)}"/>
      <circle r="5" class="m-tpl-l${on(4)}"/>
      <path d="M-50 52 H50" class="m-tpl-b${on(5)}"/>
      <path d="M-8 60 h16" class="m-tpl-d${on(0)}"/>
      ${n >= 7 ? `<circle r="70" class="m-tpl-h"/>` : ""}</svg>`;
  }
  const STATIONS = {lever:{dir:"l'est", nom:"Râ", lab:"au lever"}, midi:{dir:"le sud", nom:"Hathor", lab:"à midi"}, coucher:{dir:"l'ouest", nom:"Toum", lab:"au couchant"}, minuit:{dir:"le nord", nom:"Khépri", lab:"à minuit"}};
  function station(){
    const H = M.hoursOf(new Date()), now = Date.now(); if(!H) return "lever";
    const rise = H.rise.getTime(), set = H.set.getTime(), noon = (rise + set)/2, next = H.next.getTime(), mid = (set + next)/2;
    const c = [["lever", rise],["midi", noon],["coucher", set],["minuit", mid],["minuit", mid - DAY]].map(([k, t]) => [k, Math.abs(now - t)]).sort((a, b) => a[1] - b[1]);
    return c[0][0];
  }
  Object.assign(D.RITUELS, {
    examen:{ nom:"L'examen du soir", sous:"Repasser sa journée à rebours", duree:"8 minutes", niveau:"Débutant", statut:"Tradition",
      intro:"La pratique des Vers dorés pythagoriciens : avant de dormir, repasser sa journée, du soir au matin, sans se juger durement.",
      etapes:[
        {t:"S'installer", txt:"Assis ou allongé, lumière douce. Trois respirations lentes.", vis:"rebours:0", d:30},
        {t:"Le soir", txt:"Remonte depuis maintenant jusqu'au repas du soir. Regarde les scènes passer à l'envers, comme un film rembobiné.", vis:"rebours:1", d:70},
        {t:"L'après-midi", txt:"Continue de remonter : l'après-midi, les gens croisés, les mots échangés.", vis:"rebours:2", d:70},
        {t:"Le matin", txt:"Jusqu'au réveil. Comment t'es-tu levé ? Quelle a été ta première pensée ?", vis:"rebours:3", d:70},
        {t:"Les trois questions", txt:"Pose-toi les questions des Vers dorés, simplement :", dire:"Quelle faute ai-je commise ? Qu'ai-je fait ? À quel devoir ai-je manqué ?", trad:"Vers dorés, trad. P.-C. Lévesque", vis:"rebours:4", d:60},
        {t:"Garder, laisser", txt:"« Reproche-toi ce que tu as fait de mal ; jouis de ce que tu as fait de bien. » Choisis une chose à garder pour demain.", vis:"rebours:4", d:40},
        {t:"Fermer", txt:"Laisse la journée derrière toi. Elle est faite. Bonne nuit.", vis:"rebours:4", d:20}] },
    salut:{ nom:"Le salut au soleil", sous:"Quatre fois par jour, une pause", duree:"2 minutes", niveau:"Débutant", statut:"Tradition",
      intro:"Inspiré du <i>Liber Resh</i> de Crowley (1911), adapté sans ses formules : saluer le soleil au lever, à midi, au couchant et à minuit, tourné vers lui. L'application choisit le moment le plus proche.",
      build:() => { const k = station(), s = STATIONS[k]; return {sous:s.lab, steps:[
        {t:"Se tourner", txt:`Lève-toi si tu peux, et tourne-toi vers ${s.dir}, là où se trouve le soleil ${s.lab}.`, vis:"soleil:" + k, d:20},
        {t:"Le signe", txt:"Ouvre les mains, paumes vers le soleil, à hauteur du cœur. Une respiration ample.", vis:"soleil:" + k, d:20},
        {t:"Saluer", txt:`Salue le soleil ${s.lab} sous le nom que lui donnait l'Égypte, que Crowley reprend :`, dire:s.nom, trad:`le soleil ${s.lab}`, vis:"soleil:" + k, d:25},
        {t:"Un instant", txt:"Reste une minute en silence. Où en est ta journée ? Puis reprends ce que tu faisais.", vis:"soleil:" + k, d:50}]}; } },
    chant:{ nom:"Le chant planétaire", sous:"À la manière de Ficin", duree:"8 minutes", niveau:"Débutant", statut:"Lecture moderne", planet:true,
      intro:"La note de la planète tenue doucement, pendant que tu lis son hymne orphique, lentement, à voix haute si possible. Mets un casque ou baisse le son si tu n'es pas seul.",
      build:pl => { const hy = TX.HYMNES[pl] || {}, p = PL[pl]; return [
        {t:"Le parfum", txt:hy.parfum ? `L'hymne demande : ${hy.parfum.toLowerCase()}. Si tu en as, allume-le dans une pièce aérée ; sinon, imagine-le simplement.` : "Cet hymne ne nomme pas de parfum. Imagine une odeur qui ressemble à " + p.nom + ".", vis:"chant:0", d:30},
        {t:"La note", txt:`Écoute la note ${de(pl)}. Laisse-la emplir la pièce. Si tu veux, fredonne-la doucement, bouche fermée.`, vis:"chant:1", son:true, d:45},
        {t:"L'hymne", txt:`<span class="m-rite-hy">${h(hy.txt || "")}</span>`, vis:"chant:1", son:true, d:110},
        {t:"Le silence", txt:"La note continue un peu. Reste dans ce que l'hymne a laissé.", vis:"chant:1", son:true, d:40},
        {t:"Revenir", txt:"La note s'éteint. Note dans ton carnet ce qui a bougé : la voix, le souffle, l'humeur.", vis:"chant:0", d:20}]; },
      onStep:(r) => { const s = r.steps[r.i]; if(r.i >= 0 && s && s.son) voice("r-chant", NOTE[r.pl], .08); else hush("r-"); },
      onClose:() => hush("r-") },
    temple:{ nom:"Le temple intérieur", sous:"Sept séances d'imagination guidée", duree:"6 à 8 minutes", niveau:"Intermédiaire", statut:"Lecture moderne",
      intro:"Une séance par jour au plus. Tu peux ouvrir les yeux et t'arrêter à tout moment. Si une image te met mal à l'aise, reviens à ton corps et reprends un autre jour.",
      build:() => { const n = Math.min(st().temple || 0, 6); return {sous:`Séance ${n + 1} : ${TEMPLE[n].t.toLowerCase()}`, steps:TEMPLE[n].steps}; },
      onEnd:() => { const s = st(); s.temple = Math.min(7, (s.temple || 0) + 1); save(); } }
  });
  X.vis.rebours = n => { const a = (n || 0)/4; const end = -90 - a*360, sa = -90*rad, ea = end*rad, big = a > .5 ? 1 : 0;
    return `<svg viewBox="-70 -70 140 140" class="m-reb" aria-hidden="true"><circle r="56" class="m-reb-c"/>${a ? `<path d="M${f1(Math.cos(sa)*56)} ${f1(Math.sin(sa)*56)} A56 56 0 ${big} 0 ${f1(Math.cos(ea)*56)} ${f1(Math.sin(ea)*56)}" class="m-reb-a"/>` : ""}
      <line x1="0" y1="0" x2="${f1(Math.cos(ea)*40)}" y2="${f1(Math.sin(ea)*40)}" class="m-reb-h"/><circle r="4" class="m-reb-d"/>${n >= 4 ? `<text y="30" class="m-reb-t">☾</text>` : ""}</svg>`; };
  X.vis.soleil = (_n, _pl, k) => { const pos = {lever:[-70, 20], midi:[0, -52], coucher:[70, 20], minuit:[0, 60]}[k] || [0, -52], below = k === "minuit";
    return `<svg viewBox="-100 -80 200 150" class="m-sol" aria-hidden="true"><path d="M-96 32 H96" class="m-sol-h"/><circle cx="${pos[0]}" cy="${pos[1]}" r="14" class="m-sol-s${below ? " nuit" : ""}"/>
      ${below ? "" : Array.from({length:12}, (_x, i) => { const a = i*30*rad; return `<line x1="${f1(pos[0] + Math.cos(a)*19)}" y1="${f1(pos[1] + Math.sin(a)*19)}" x2="${f1(pos[0] + Math.cos(a)*26)}" y2="${f1(pos[1] + Math.sin(a)*26)}" class="m-sol-r"/>`; }).join("")}
      <text x="-92" y="24" class="m-sol-t" text-anchor="start">${{lever:"Est", midi:"Sud", coucher:"Ouest", minuit:"Nord"}[k] || ""}</text></svg>`; };
  X.vis.chant = (n, pl) => `<div class="m-rite-glyph m-rite-chant${n ? " son" : ""}" style="color:${PL[pl].hex}"><i></i><i></i><i></i><span class="ag mg">${PL[pl].gl}${T}</span></div>`;
  X.vis.temple = n => templeSVG(n + 1);

  /* ================================================================
     LE CYCLE DE 28 JOURS
     ================================================================ */
  const ymd = d => { const z = new Date(d); return z.getFullYear() + "-" + String(z.getMonth() + 1).padStart(2, "0") + "-" + String(z.getDate()).padStart(2, "0"); };
  const dayN = () => { const c = st().cycle; if(!c || !c.debut) return 0; const [y, m, dd] = c.debut.split("-").map(Number), d0 = new Date(y, m - 1, dd), t = new Date(); t.setHours(0, 0, 0, 0); return Math.floor((t - d0)/DAY) + 1; };
  const RN = k => (D.RITUELS[k] || {}).nom || k;
  function practices(n){
    const w = C2.CYCLE.semaines[Math.min(3, Math.floor((n - 1)/7))], P = [];
    P.push({slot:"matin", k:w.matin, lab:"Le matin"}); if(w.plus) P.push({slot:"matin2", k:w.plus, lab:"Le matin, ensuite"});
    P.push({slot:"midi", k:C2.CYCLE.midi, lab:"Dans la journée"}); P.push({slot:"soir", k:C2.CYCLE.soir, lab:"Le soir"}); if(w.soirPlus) P.push({slot:"soir2", k:w.soirPlus, lab:"Le soir, en plus"});
    return {w, P};
  }
  const doneOf = n => (st().cycle && st().cycle.fait && st().cycle.fait[n]) || {};
  function ringSVG(n){
    let s = `<svg viewBox="-110 -110 220 220" class="m-cyc" role="img" aria-label="Le cycle de 28 jours">`;
    for(let i = 1; i <= 28; i++){ const a0 = (-90 + (i - 1)*360/28 + 1)*rad, a1 = (-90 + i*360/28 - 1)*rad, P = practices(i).P, f = P.filter(p => doneOf(i)[p.slot]).length/P.length;
      const p = (a, r) => `${f1(Math.cos(a)*r)} ${f1(Math.sin(a)*r)}`;
      s += `<path d="M${p(a0, 96)} A96 96 0 0 1 ${p(a1, 96)} L${p(a1, 70)} A70 70 0 0 0 ${p(a0, 70)}Z" class="m-cyc-d${i === n ? " today" : ""}${i < n ? " past" : ""}" style="--f:${f1(f)}"/>`;
      if(i % 7 === 1){ const m = (a0 + a1)/2; s += `<text x="${f1(Math.cos(m)*106)}" y="${f1(Math.sin(m)*106 + 3)}" class="m-cyc-w">${i}</text>`; } }
    const ph = (() => { try{ return AC.moonInfo(new Date()).phase; }catch(e){ return 0; } })(), lit = Math.cos(ph*rad);
    s += `<circle r="44" class="m-cyc-m"/><path d="M0 -40 A40 40 0 0 ${ph < 180 ? 1 : 0} 0 40 A${f1(Math.abs(lit)*40)} 40 0 0 ${(ph < 180) === (lit > 0) ? 0 : 1} 0 -40Z" class="m-cyc-lit"/>
      <text y="-4" class="m-cyc-n">${n > 0 && n <= 28 ? n : ""}</text><text y="14" class="m-cyc-s">${n > 0 && n <= 28 ? "sur 28" : ""}</text></svg>`;
    return s;
  }
  function cycleHTML(){
    const c = st().cycle, n = dayN();
    if(!c || !c.debut) return `<section class="m-cycle intro">${ringSVG(0)}<div><p class="eyebrow">Quatre semaines, trois moments par jour</p><h3>Le cycle de 28 jours</h3>
      <p>Un mois lunaire de pratique : le matin un rituel, dans la journée le salut au soleil, le soir l'examen des Vers dorés. Chaque semaine ajoute un élément : le souffle, le cercle, les planètes, la colonne et le temple.</p>
      <ol class="m-cyc-sem">${C2.CYCLE.semaines.map((w, i) => `<li><b>Semaine ${i + 1} · ${w.t}</b><span>${w.desc}</span></li>`).join("")}</ol>
      <div class="m-acts start"><button type="button" class="btn" data-cyc-go>Commencer aujourd'hui</button></div></div></section>`;
    if(n > 28){ const tot = Object.values(c.fait || {}).reduce((a, d) => a + Object.values(d).filter(Boolean).length, 0);
      return `<section class="m-cycle">${ringSVG(29)}<div><p class="eyebrow">Cycle terminé</p><h3>Vingt-huit jours</h3><p>Tu as accompli ${tot} pratiques. Relis ton carnet depuis le ${fmt(new Date(c.debut + "T12:00"), {day:"numeric", month:"long"})}.</p>
        <div class="m-acts start"><button type="button" class="btn" data-cyc-go>Recommencer un cycle</button><button type="button" class="btn ghost small" data-mgo="carnet:entrees">Relire le carnet</button></div></div></section>`; }
    const {w, P} = practices(n), d = doneOf(n);
    return `<section class="m-cycle">${ringSVG(n)}<div><p class="eyebrow">Jour ${n} · semaine ${Math.ceil(n/7)} · ${w.t}</p><h3>${C2.CYCLE.consignes[n - 1]}</h3>
      <ul class="m-cyc-p">${P.map(p => `<li class="${d[p.slot] ? "ok" : ""}"><label class="m-check"><input type="checkbox" data-cyc-ck="${p.slot}"${d[p.slot] ? " checked" : ""}><span><small>${p.lab}</small><b>${RN(p.k)}</b></span></label><button type="button" class="btn ghost small" data-mrite="${p.k}">Lancer</button></li>`).join("")}</ul>
      <p class="help m-left">Une pratique lancée et menée jusqu'au bout se coche toute seule. Un jour manqué n'est pas grave : reprends simplement là où tu en es.</p>
      <div class="m-acts start"><button type="button" class="linkbtn danger" data-cyc-stop>Arrêter ce cycle</button></div></div></section>`;
  }
  function bindCycle(root){
    qa("[data-cyc-go]", root).forEach(b => b.onclick = () => { const s = st(); s.cycle = {debut:ymd(new Date()), fait:{}}; save(); refresh(); });
    qa("[data-cyc-ck]", root).forEach(c => c.onchange = () => { const s = st(), n = dayN(); s.cycle.fait = s.cycle.fait || {}; s.cycle.fait[n] = Object.assign({}, s.cycle.fait[n], {[c.dataset.cycCk]:c.checked}); save(); refresh(); });
    qa("[data-cyc-stop]", root).forEach(b => b.onclick = () => { if(b.dataset.armed !== "1"){ b.dataset.armed = "1"; b.textContent = "Toucher encore pour arrêter"; return; } const s = st(); delete s.cycle; save(); refresh(); });
    bindLinks(root);
  }
  const refresh = () => { if(!_.active()) return; const v = st().vue; if(v === "carnet") _.renderCarnet(); if(v === "moment") _.renderMoment(true); };
  X.carnetTabs.push({id:"cycle", label:"Le cycle", render:cycleHTML, bind:bindCycle});
  X.afterRite = key => {
    const s = st(); if(!s.cycle || !s.cycle.debut) return; const n = dayN(); if(n < 1 || n > 28) return;
    const {P} = practices(n), p = P.find(x => x.k === key && !doneOf(n)[x.slot]); if(!p) return;
    s.cycle.fait = s.cycle.fait || {}; s.cycle.fait[n] = Object.assign({}, s.cycle.fait[n], {[p.slot]:true}); save(); setTimeout(refresh, 50);
  };
  X.moment.push((H, Mo, now) => {
    const c = st().cycle, n = dayN();
    if(c && c.debut && n >= 1 && n <= 28){ const {P} = practices(n), d = doneOf(n), next = P.find(p => !d[p.slot]);
      return `<article class="m-card m-cyccard"><div class="m-cyccard-r">${ringSVG(n)}</div><div><p class="eyebrow">Ton cycle · jour ${n} sur 28</p><h3>${C2.CYCLE.consignes[n - 1]}</h3>
        <p class="help m-left">${P.filter(p => d[p.slot]).length} pratique${P.filter(p => d[p.slot]).length > 1 ? "s" : ""} sur ${P.length} aujourd'hui.</p>
        <div class="m-acts start">${next ? `<button type="button" class="btn small" data-mrite="${next.k}">${RN(next.k)}</button>` : ""}<button type="button" class="btn ghost small" data-mgo="carnet:cycle">Le cycle</button></div></div></article>`; }
    return `<article class="m-card m-cyccard invite"><div><p class="eyebrow">Pratiquer dans la durée</p><h3>Le cycle de 28 jours</h3><p>Un mois lunaire, trois moments par jour : un rituel le matin, le salut au soleil, l'examen du soir.</p>
      <div class="m-acts start"><button type="button" class="btn ghost small" data-mgo="carnet:cycle">Découvrir le cycle</button></div></div></article>`;
  });
  X.moment.push((H, Mo, now) => { if(!AC) return ""; const sl = sunLon(now), x = DECANS[Math.floor(sl/10) % 36], p = PL[x.ruler];
    return `<p class="m-decline"><button type="button" class="linkbtn" data-mgo="atelier:decans">Le Soleil traverse le ${x.d + 1}<sup>e</sup> décan ${x.sg.du || ""}, gouverné par ${p.gl}${T} ${p.nom} · ${x.carte.nom}</button></p>`; });

  /* ================================================================
     LA BIBLIOTHÈQUE
     ================================================================ */
  let bv = null;
  const BOOK = id => C2.BIBLIO.find(b => b.id === id);
  const goBtn = g => { const [k, v] = g.split(":"); const lab = k === "lec" ? (() => { const L = K.MODULES.flatMap(m => m.lecons.map(l => [l, m])).find(([l]) => l.id === v); return L ? `Leçon : ${L[0].t}` : "La leçon"; })()
      : k === "rituel" ? (D.RITUELS[v] ? D.RITUELS[v].nom : "Le rituel") : k === "cycle" ? "Le cycle de 28 jours" : k === "hist" ? "Le chapitre d'histoire" : k === "outil" ? ((X.toolRender[v] && X.toolRender[v].t) || "L'outil") : k === "biblio" ? ((BOOK(v) || {}).t || "Le texte") : "Voir";
    return `<button type="button" class="chip" data-mgo="${g}">${lab}</button>`; };
  function bookBody(b){
    const t = TX.T[b.id] || [];
    if(b.id === "hymnes") return Object.entries({soleil:"Hèlios", lune:"Sélènè", saturne:"Kronos", jupiter:"Zeus", mercure:"Herméias", venus:"Aphroditè", mars:"Arès"}).map(([id, n]) => { const hy = TX.HYMNES[id] || {};
      return `<section class="m-hy" style="--pc:${PL[id].hex}"><h3><span class="ag mg">${PL[id].gl}${T}</span> ${n}${hy.parfum ? ` <small>parfum : ${hy.parfum.toLowerCase()}</small>` : ""}</h3><p>${h(hy.txt || "")}</p></section>`; }).join("");
    if(b.id === "versdores") return `<p class="m-lettrine">${h(t[0] || "")}</p><p class="m-verse">${(TX.T.versdores_fo || []).map(h).join("<br>")}</p><p class="help m-left">Les trois vers : traduction de Fabre d'Olivet (1813).</p>`;
    if(b.items) return `<ul class="m-flor">${b.items.map(([x, r]) => `<li><p>« ${h(x)} »</p><cite>${r}</cite></li>`).join("")}</ul>`;
    return t.map((p, i) => `<p${i === 0 ? ' class="m-lettrine"' : ""}>${h(p).replace("&lt;i&gt;telesme&lt;/i&gt;", "<i>telesme</i>")}</p>`).join("");
  }
  function biblioHTML(tabs){
    if(bv){ const b = BOOK(bv);
      if(b) return tabs + `<p class="crumb"><button type="button" class="linkbtn" data-bv="">← La bibliothèque</button></p>
        <article class="m-book"><header>${b.img ? img(b.img, "", "m-book-img") : ""}<p class="eyebrow">${b.auteur}</p><h1>${b.t}</h1><p class="m-book-m">${b.date}<br>${b.trad}</p></header>
        <div class="m-book-txt">${bookBody(b)}</div>
        <section class="m-book-com"><p class="eyebrow">Commentaire</p>${b.com.map(p => `<p>${p}</p>`).join("")}</section>
        ${b.go && b.go.length ? `<div class="m-book-go"><p class="eyebrow">Dans le cours</p><div class="m-chips">${b.go.map(goBtn).join("")}</div></div>` : ""}</article>`; }
    return tabs + `<header class="m-hero"><p class="eyebrow">Les sources, dans leurs anciennes traductions</p><h1>La bibliothèque</h1>
      <p class="m-lede">Les textes eux-mêmes, et non ce qu'on en dit : Platon, Plotin, Hermès, les hymnes que chantait Ficin. Des traductions anciennes, pour la plupart du XIXe siècle, entrées dans le domaine public et citées mot pour mot, avec un commentaire et des renvois vers le cours.</p></header>
      <figure class="m-medal">${img("hermes", "Hermès Trismégiste", "m-medal-img")}<figcaption>${_.CRED.hermes || ""}</figcaption></figure>
      <div class="m-books">${C2.BIBLIO.map((b, i) => { const t = (TX.T[b.id] || [])[0] || (b.items ? b.items[0][0] : (TX.HYMNES.soleil || {}).txt || "");
        return `<button type="button" class="m-bk" data-bv="${b.id}"><span class="m-bk-n">${["I","II","III","IV","V","VI","VII","VIII","IX","X"][i]}</span><span class="m-bk-b"><b>${b.t}</b><small>${b.auteur} · ${b.date}</small><span class="m-bk-x">« ${h(String(t).replace(/<[^>]+>/g, "").slice(0, 120))}… »</span></span></button>`; }).join("")}</div>`;
  }
  X.histTabs.push({id:"biblio", label:"La bibliothèque", render:biblioHTML, bind:root => { qa("[data-bv]", root).forEach(b => b.onclick = () => { bv = b.dataset.bv || null; _.renderHistoire(); window.scrollTo({top:0}); }); }});

  /* ================================================================
     LES RENVOIS (data-mgo) : leçons, bibliothèque, histoire, outils, rituels, cycle
     ================================================================ */
  X.go.lec = id => { const m = K.MODULES.find(m => m.lecons.some(l => l.id === id)); if(!m) return; _.setEv({mod:m.id, lec:m.lecons.findIndex(l => l.id === id)}); _.mView("ecole"); };
  X.go.biblio = id => { bv = id || null; _.setHv("biblio"); _.mView("histoire"); };
  X.go.hist = id => { bv = null; _.setHv("chapitres"); _.mView("histoire"); setTimeout(() => { const t = document.getElementById(id); if(t){ window.scrollTo({top:t.getBoundingClientRect().top + scrollY - 70}); const d = t.querySelector("details"); if(d) d.open = true; } }, 60); };
  X.go.outil = (k, a) => { _.setAt(k, a || null); _.mView("atelier"); };
  X.go.rituel = k => M.openRite(k);
  X.go.cycle = () => { _.setCn({tab:"cycle"}); _.mView("carnet"); };

  /* ================================================================
     LES NOTES EN MARGE
     ================================================================ */
  const plain = s => String(s).replace(/<[^>]+>/g, " ");
  X.marge = (l, m) => {
    const items = (l.marge || C2.MARGES[l.id] || []).slice(), text = plain(l.idee.join(" ")), seen = plain(items.map(i => i.txt).join(" ")).toLowerCase();
    const gl = Object.entries(C2.GLOSSAIRE).filter(([k]) => { const re = new RegExp("(^|[^\\p{L}])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), k[0] === k[0].toLowerCase() ? "iu" : "u"); return re.test(text) && !seen.includes(k.toLowerCase()); }).slice(0, 3);
    if(!items.length && !gl.length) return "";
    return `<aside class="m-marge" aria-label="Notes en marge"><p class="m-marge-h">En marge</p>
      ${items.map(i => `<div class="m-gl${i.go ? " go" : ""}"><b>${i.t}</b><p>${i.txt}</p>${i.go ? `<button type="button" class="linkbtn" data-mgo="${i.go}">${i.go.startsWith("biblio") ? "Lire" : i.go.startsWith("lec") ? "Aller à la leçon" : i.go.startsWith("rituel") ? "Lancer" : i.go.startsWith("outil") ? "Ouvrir" : "Voir"} →</button>` : ""}</div>`).join("")}
      ${gl.map(([k, v]) => `<div class="m-gl gloss"><b>${k}</b><p>${v}</p></div>`).join("")}</aside>`;
  };

  /* ================================================================
     L'ÉCOLE : les deux cercles
     ================================================================ */
  X.ecoleHead = (c, ms) => c === 1
    ? `<header class="m-cercle"><span class="m-cercle-n">I</span><div><p class="eyebrow">Le premier cercle · modules I à VIII</p><h2>La pratique</h2><p>Les planètes, les carrés, l'Arbre, le rituel, les sigils, et l'éthique du praticien.</p></div></header>`
    : `<header class="m-cercle"><span class="m-cercle-n">II</span><div><p class="eyebrow">Le second cercle · modules IX à XIV</p><h2>Les fondements et les arts</h2><p>Pourquoi la magie a semblé possible, et les arts qui l'accompagnent : la musique des sphères, la géomancie, les lettres, l'alchimie, la mémoire.</p></div></header>`;

  /* ================================================================
     LE PASSAGE DE GRADE
     ================================================================ */
  X.onGrade = (g, g0) => {
    if(!g || (g0 && g.min <= g0.min)) return;
    let ov = q1("#m-gradeov"); if(!ov){ ov = document.createElement("div"); ov.id = "m-gradeov"; ov.className = "m-gradeov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); document.body.appendChild(ov); }
    ov.innerHTML = `<div class="m-go-in"><div class="m-go-tree">${_.treeSVG({sep:g.sep, path:g.path, mode:"lettres"})}</div>
      <div class="m-go-t"><p class="eyebrow">Passage de grade</p><p class="m-go-code">${g.code}</p><h2>${g.nom}</h2>${g.el ? `<p class="m-go-el">Sous le signe de ${g.el}</p>` : ""}<p class="m-go-ph">${g.phrase}</p>
      <button type="button" class="btn" data-goclose>Continuer</button><p class="help">Les noms des grades sont ceux de la Golden Dawn ; ici, ils marquent seulement ton chemin dans le cours.</p></div></div>`;
    ov.hidden = false; document.body.classList.add("locked");
    requestAnimationFrame(() => ov.classList.add("show"));
    q1("[data-goclose]", ov).onclick = () => { ov.classList.remove("show"); setTimeout(() => { ov.hidden = true; document.body.classList.remove("locked"); }, 400); };
  };
  window.ArcanesMagie.showGrade = (i = 1) => X.onGrade(D.GRADES[i], null);
})();
