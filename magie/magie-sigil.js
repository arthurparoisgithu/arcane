/* ===== Arcanes · Magie : l'atelier du sigil =====
   Des capitales dessinées comme des pièces : on les déplace, on les tourne, on les agrandit, on les retourne,
   on efface des traits, on choisit la plume et le cadre, puis on « charge » le sigil avant de le ranger au carnet.
   Expose window.MagieSigil = {svg, auto, editor, fromSaved} ; magie.js s'en sert s'il est là. */
(() => {
  const M = window.ArcanesMagie;
  if(!M || !M._) return;
  const _ = M._, {h, uid} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const rad = Math.PI/180;
  const n2 = v => String(Math.round(v*100)/100);
  const reduce = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- les capitales, dans une boîte de 60 × 100 ----------
     Des proportions de capitale romaine : O, C, D, G, Q larges ; E, F, L, B, P, R, S étroites.
     Uniquement des commandes absolues M L H V C, pour pouvoir calculer les boîtes. */
  const O = "M30 0 C47 0 58 22 58 50 C58 78 47 100 30 100 C13 100 2 78 2 50 C2 22 13 0 30 0";
  const G = {
    A:"M2 100 L30 0 L58 100 M14 66 L46 66",
    B:"M8 0 V100 M8 0 H30 C46 0 52 10 52 23 C52 37 43 46 28 46 H8 M28 46 C47 46 56 57 56 72 C56 89 45 100 28 100 H8",
    C:"M55 16 C49 5 40 0 31 0 C13 0 3 22 3 50 C3 78 13 100 31 100 C41 100 50 95 56 83",
    D:"M8 0 V100 M8 0 H24 C46 0 57 22 57 50 C57 78 46 100 24 100 H8",
    E:"M52 0 H8 V100 H54 M8 48 H42",
    F:"M52 0 H8 V100 M8 48 H42",
    G:"M55 16 C49 5 40 0 31 0 C13 0 3 22 3 50 C3 78 13 100 31 100 C43 100 52 92 55 82 V58 M36 58 H58",
    H:"M6 0 V100 M54 0 V100 M6 50 H54",
    I:"M30 0 V100 M16 0 H44 M16 100 H44",
    J:"M44 0 V72 C44 90 36 100 24 100 C14 100 7 94 4 84",
    K:"M8 0 V100 M54 0 L8 58 M24 40 L56 100",
    L:"M8 0 V100 H54",
    M:"M4 100 L8 0 L30 72 L52 0 L56 100",
    N:"M6 100 V0 L54 100 V0",
    O,
    P:"M8 100 V0 H30 C48 0 55 12 55 27 C55 42 45 53 29 53 H8",
    Q:O + " M34 80 L58 104",
    R:"M8 100 V0 H30 C48 0 55 12 55 26 C55 41 45 51 29 51 H8 M28 51 L56 100",
    S:"M52 13 C47 5 39 0 30 0 C17 0 8 8 8 22 C8 36 20 42 31 47 C44 53 54 60 54 75 C54 91 43 100 29 100 C18 100 9 94 5 85",
    T:"M2 0 H58 M30 0 V100",
    U:"M6 0 V66 C6 88 16 100 30 100 C44 100 54 88 54 66 V0",
    V:"M2 0 L30 100 L58 0",
    W:"M0 0 L15 100 L30 22 L45 100 L60 0",
    X:"M4 0 L56 100 M56 0 L4 100",
    Y:"M2 0 L30 50 L58 0 M30 50 V100",
    Z:"M4 0 H56 L4 100 H56"
  };
  /* découpe un tracé en traits (sous-chemins), avec leurs points de contrôle pour les boîtes */
  function parse(d){
    const subs = []; let cur = null, x = 0, y = 0, m;
    const re = /([MLHVC])([^MLHVC]*)/g;
    while((m = re.exec(d))){
      const c = m[1], n = (m[2].match(/-?\d*\.?\d+/g) || []).map(Number);
      if(c === "M"){ x = n[0]; y = n[1]; cur = {d:`M${x} ${y}`, pts:[[x, y]]}; subs.push(cur);
        for(let i = 2; i < n.length; i += 2){ x = n[i]; y = n[i+1]; cur.d += `L${x} ${y}`; cur.pts.push([x, y]); } }
      else if(c === "L"){ for(let i = 0; i < n.length; i += 2){ x = n[i]; y = n[i+1]; cur.d += `L${x} ${y}`; cur.pts.push([x, y]); } }
      else if(c === "H"){ n.forEach(v => { x = v; cur.d += `H${x}`; cur.pts.push([x, y]); }); }
      else if(c === "V"){ n.forEach(v => { y = v; cur.d += `V${y}`; cur.pts.push([x, y]); }); }
      else if(c === "C"){ for(let i = 0; i < n.length; i += 6){ cur.d += `C${n.slice(i, i + 6).join(" ")}`; cur.pts.push([n[i], n[i+1]], [n[i+2], n[i+3]]); x = n[i+4]; y = n[i+5]; cur.pts.push([x, y]); } }
    }
    subs.forEach(s => { s.a = s.pts[0]; s.z = s.pts[s.pts.length - 1]; });
    return subs;
  }
  const GL = Object.fromEntries(Object.entries(G).map(([k, d]) => [k, parse(d)]));

  /* ---------- géométrie d'une pièce : {c, x, y, s, r, f, hide} ---------- */
  const tf = p => `translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(p.r)}) scale(${n2(p.s*p.f)} ${n2(p.s)}) translate(-30 -50)`;
  const tp = (p, [px, py]) => { const X = (px - 30)*p.s*p.f, Y = (py - 50)*p.s, c = Math.cos(p.r*rad), s = Math.sin(p.r*rad); return [X*c - Y*s + p.x, X*s + Y*c + p.y]; };
  const vis = p => (GL[p.c] || []).map((s, j) => [s, j]).filter(([, j]) => !(p.hide || []).includes(j));
  function bbox(P){
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    P.forEach(p => vis(p).forEach(([s]) => s.pts.forEach(q => { const [x, y] = tp(p, q); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); })));
    return {x0, y0, x1, y1};
  }
  function fit(P, R = 84){
    if(!P.length) return P;
    const b = bbox(P), k = Math.min(2*R/Math.max(b.x1 - b.x0, b.y1 - b.y0, 1), 2.4), cx = (b.x0 + b.x1)/2, cy = (b.y0 + b.y1)/2;
    P.forEach(p => { p.x = (p.x - cx)*k; p.y = (p.y - cy)*k; p.s = Math.min(p.s*k, 1.9); });
    return P;
  }
  const rnd = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  /* une disposition de départ : les lettres se chevauchent autour du centre */
  function auto(letters, v = 0){
    const L = letters.filter(c => GL[c]), w = L.join("");
    const r = rnd(7919*(v + 1) + w.length*131 + (w.charCodeAt(0) || 0));
    const ROT = v ? [0, 0, 45, -45, 90, -90, 180] : [0, 0, 0, 90, -90];
    const spread = 18 + Math.min(L.length, 10)*3;
    const P = L.map((c, i) => ({c, x:i ? (r() - .5)*spread*2 : 0, y:i ? (r() - .5)*spread*2 : 0, s:.62 + r()*.38, r:ROT[Math.floor(r()*ROT.length)], f:r() < .5 ? -1 : 1, hide:[]}));
    return fit(P);
  }
  /* regrouper : toutes les lettres ramenées sur le même centre, à la même taille, comme une ligature */
  function cluster(P){
    P.forEach((p, i) => { const a = i*137.5*rad, d = i ? 10 + 3*Math.sqrt(i) : 0; p.x = Math.cos(a)*d; p.y = Math.sin(a)*d; p.s = .95; });
    return fit(P);
  }

  /* quand on choisit une symétrie, la composition se range dans sa part du cercle, pour que les copies ne se recouvrent pas */
  function arrange(P, sym){
    if(!P.length) return P;
    const R = {aucune:84, miroir:56, demi:52, quatre:40}[sym] || 84, off = {aucune:[0, 0], miroir:[48, 0], demi:[0, -46], quatre:[38, -38]}[sym] || [0, 0];
    fit(P, R); P.forEach(p => { p.x += off[0]; p.y += off[1]; });
    return P;
  }

  /* ---------- le rendu ---------- */
  let N = 0;
  const STYLES = [["plume", "Plume"], ["pinceau", "Pinceau"], ["trait", "Trait"], ["fondu", "Fondu"]];
  const SYMS = [["aucune", "Aucune"], ["miroir", "Miroir"], ["demi", "Demi-tour"], ["quatre", "Quatre"]];
  const FRAMES = [["cercle", "Cercle"], ["double", "Double"], ["aucun", "Aucun"]];
  const NIB = -35*rad, NIBW = 3.6, COPIES = 7;

  function layer(P, W, cls, o){
    let k = 0;
    return P.map((p, i) => `<g data-pg="${i}" transform="${tf(p)}">${vis(p).map(([s]) => `<path d="${s.d}" class="${cls}" stroke-width="${n2(W/p.s)}"${o.anim ? ` pathLength="1" style="--k:${k++}"` : ""}/>`).join("")}</g>`).join("");
  }
  function dotsOf(P){
    const firstP = P.findIndex(p => vis(p).length), lastP = P.length - 1 - [...P].reverse().findIndex(p => vis(p).length);
    if(firstP < 0) return [];
    const a = tp(P[firstP], vis(P[firstP])[0][0].a), V = vis(P[lastP]), z = tp(P[lastP], V[V.length - 1][0].z);
    return [a, z];
  }
  function inkInner(S, o){
    const P = S.pieces; if(!P.length) return "";
    const ao = {anim:!!o.anim};
    let ink = "";
    if(S.style === "plume"){
      const ux = Math.cos(NIB), uy = Math.sin(NIB);
      for(let c = 0; c < COPIES; c++){ const t = (c/(COPIES - 1)*2 - 1)*NIBW; ink += `<g transform="translate(${n2(ux*t)} ${n2(uy*t)})">${layer(P, 1.45, "m-sx-ink", ao)}</g>`; }
    } else if(S.style === "pinceau"){
      ink = `<g filter="url(#${o.id}-b)"><g class="m-sx-wet">${layer(P, 9, "m-sx-ink", ao)}</g>${layer(P, 5.4, "m-sx-ink", ao)}</g>`;
    } else if(S.style === "fondu"){
      ink = layer(P, 12.5, "m-sx-ink", ao) + layer(P, 6.2, "m-sx-paper", ao);
    } else ink = layer(P, 4.2, "m-sx-ink", ao);
    if(S.dots !== false){ const d = dotsOf(P); if(d.length) ink += `<circle data-dot="0" cx="${n2(d[0][0])}" cy="${n2(d[0][1])}" r="5" class="m-sx-dot"/><circle data-dot="1" cx="${n2(d[1][0])}" cy="${n2(d[1][1])}" r="3.2" class="m-sx-dot"/>`; }
    return ink;
  }
  function symWrap(S, inner){
    if(S.sym === "miroir") return inner + `<g transform="scale(-1 1)">${inner}</g>`;
    if(S.sym === "demi") return inner + `<g transform="rotate(180)">${inner}</g>`;
    if(S.sym === "quatre") return inner + [90, 180, 270].map(a => `<g transform="rotate(${a})">${inner}</g>`).join("");
    return inner;
  }
  function frameSVG(f, edit){
    if(f === "double") return `<circle r="116" class="m-sx-ring"/><circle r="104" class="m-sx-ring2 ink"/>${Array.from({length:28}, (_, i) => { const a = i*360/28*rad; return `<circle cx="${n2(Math.cos(a)*110)}" cy="${n2(Math.sin(a)*110)}" r="${i % 7 ? 1.1 : 2.2}" class="m-sx-tick"/>`; }).join("")}`;
    if(f === "aucun") return edit ? `<circle r="112" class="m-sx-guide"/>` : "";
    return `<circle r="112" class="m-sx-ring"/><circle r="105" class="m-sx-ring2"/>`;
  }
  const defsSVG = id => `<defs><filter id="${id}-b" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
  function svg(S, o = {}){
    const id = "msx" + (++N);
    return `<svg class="m-sigil m-sx${o.cls ? " " + o.cls : ""}${o.anim && !reduce() ? " draw" : ""}" viewBox="-122 -122 244 244" role="img" aria-label="Un sigil">${defsSVG(id)}${frameSVG(S.frame)}<g class="m-sx-art">${symWrap(S, inkInner(S, {anim:o.anim && !reduce(), id}))}</g></svg>`;
  }
  const fromSaved = x => svg({pieces:x.pieces || [], style:x.style || "plume", sym:x.sym || "aucune", frame:x.frame || "cercle", dots:x.dots !== false});

  /* ================================================================
     L'ÉDITEUR
     ================================================================ */
  function editor(fig, o = {}){
    const E = {ph:"Je suis calme et confiant", sv:true, v:0, pieces:[], style:"plume", sym:"aucune", frame:"cercle", dots:true, snap:true, sel:-1, simp:false};
    const id = "msx" + (++N);
    let hist = [], tmPh = null, drag = null, charged = false;
    const keep = () => _.spareLetters(E.ph, E.sv).keep.filter(c => GL[c]);
    E.pieces = auto(keep(), 0);
    const chips = (k, list) => `<div class="chips" role="group">${list.map(([v, t]) => `<button type="button" class="chip small${E[k] === v ? " on" : ""}" data-sxset="${k}:${v}" aria-pressed="${E[k] === v}">${t}</button>`).join("")}</div>`;
    fig.innerHTML = `<div class="m-sx-ed${o.full ? " full" : ""}">
      <div class="m-sx-main">
        <div class="m-form inline"><label>Ton intention<input type="text" maxlength="80" value="${h(E.ph)}" data-sph></label><label class="m-check"><input type="checkbox" data-ssv checked> Retirer aussi les voyelles</label></div>
        <p class="m-sp-ph small" data-sxm aria-live="polite"></p>
        <div class="m-sx-stage"><svg class="m-sigil m-sx edit" viewBox="-122 -122 244 244" data-sxsvg tabindex="0" role="application" aria-label="La composition du sigil. Touche une lettre pour la sélectionner ; avec le clavier, les flèches la déplacent."></svg>
          <p class="m-sx-gnose" aria-live="polite"></p></div>
        <div class="m-sx-piece" data-sxpiece></div>
      </div>
      <div class="m-sx-side">
        <div class="m-sx-grp"><p class="m-sx-lab">La disposition</p><div class="m-sx-btns"><button type="button" class="btn ghost small" data-sxa="auto">Une autre</button><button type="button" class="btn ghost small" data-sxa="cluster">Regrouper</button><button type="button" class="btn ghost small" data-sxa="undo" disabled>Annuler</button></div>
          <label class="m-check"><input type="checkbox" data-sxsnap checked> Aimanter au cercle</label></div>
        <div class="m-sx-grp"><p class="m-sx-lab">Simplifier</p><button type="button" class="chip small" data-sxa="simp" aria-pressed="false">Effacer des traits</button><p class="help m-left" data-sxsimp>Touche un trait pour l'effacer ; touche-le encore pour le rendre. Chaque lettre garde au moins un trait.</p></div>
        <div class="m-sx-grp"><p class="m-sx-lab">La plume</p><div data-sxg="style">${chips("style", STYLES)}</div></div>
        <div class="m-sx-grp"><p class="m-sx-lab">La symétrie</p><div data-sxg="sym">${chips("sym", SYMS)}</div></div>
        <div class="m-sx-grp"><p class="m-sx-lab">Le cadre</p><div data-sxg="frame">${chips("frame", FRAMES)}</div><label class="m-check"><input type="checkbox" data-sxdots checked> Les points du départ et de l'arrivée</label></div>
        ${o.full ? `<div class="m-sx-grp m-sx-charge"><button type="button" class="btn" data-sxcharge>Charger et garder</button><p class="help m-left" data-sxmsg>Quand la forme te parle, charge-la : le sigil se trace une dernière fois, tu fixes son centre le temps de trois respirations, puis il rejoint ton carnet et la phrase s'efface.</p></div>` : `<p class="help m-left">Dans l'atelier, tu peux charger ce sigil et le garder dans ton carnet.</p>`}
      </div></div>`;
    const sv = q1("[data-sxsvg]", fig), stage = q1(".m-sx-stage", fig), bar = q1("[data-sxpiece]", fig);
    const push = () => { hist.push(JSON.stringify(E.pieces)); if(hist.length > 60) hist.shift(); q1('[data-sxa="undo"]', fig).disabled = false; dirty(); };
    const dirty = () => { if(charged){ charged = false; const b = q1("[data-sxcharge]", fig); if(b){ b.disabled = false; b.textContent = "Charger et garder"; } } sv.classList.remove("draw", "lit"); fig.classList.remove("forget", "charging"); };

    function marks(){
      const R = _.spareLetters(E.ph, E.sv);
      q1("[data-sxm]", fig).innerHTML = R.marks.length ? R.marks.map(m => `<span class="${m.drop ? "x" : ""}">${m.c}</span>`).join("") : "Écris une phrase.";
    }
    function grid(){
      let g = `<g class="m-sx-grid">`;
      [22, 44, 66, 88].forEach(r => g += `<circle r="${r}"/>`);
      for(let a = 0; a < 360; a += 30) g += `<line x1="0" y1="0" x2="${n2(Math.cos(a*rad)*96)}" y2="${n2(Math.sin(a*rad)*96)}"/>`;
      return g + `</g>`;
    }
    function hits(){
      return `<g class="m-sx-hits">${E.pieces.map((p, i) => `<g data-ph="${i}" transform="${tf(p)}">${(GL[p.c] || []).map((s, j) => {
        const hid = p.hide.includes(j);
        if(hid && !E.simp) return "";
        return `${hid ? `<path d="${s.d}" class="m-sx-hid" stroke-width="${n2(2.4/p.s)}"/>` : ""}<path d="${s.d}" class="m-sx-hit" data-sub="${j}" stroke-width="${n2(20/p.s)}"/>`; }).join("")}</g>`).join("")}</g>`;
    }
    function selG(){
      const p = E.pieces[E.sel]; if(!p || E.simp) return "";
      const w = 30*p.s + 8, hh = 50*p.s + 8;
      return `<g class="m-sx-sel" data-sel transform="translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(p.r)})">
        <rect x="${n2(-w)}" y="${n2(-hh)}" width="${n2(2*w)}" height="${n2(2*hh)}" rx="3"/>
        <line x1="0" y1="${n2(-hh)}" x2="0" y2="${n2(-hh - 16)}"/>
        <g data-hh="rot" class="m-sx-h"><circle cy="${n2(-hh - 22)}" r="17" class="m-sx-hz"/><circle cy="${n2(-hh - 22)}" r="7"/><path d="M-3.4 ${n2(-hh - 24)}a3.6 3.6 0 1 1 1 4" class="m-sx-hi"/></g>
        <g data-hh="sc" class="m-sx-h"><circle cx="${n2(w)}" cy="${n2(hh)}" r="17" class="m-sx-hz"/><rect x="${n2(w - 6)}" y="${n2(hh - 6)}" width="12" height="12" rx="2"/></g></g>`;
    }
    function paint(){
      const S = E;
      sv.innerHTML = defsSVG(id) + frameSVG(S.frame, true) + grid() + `<g class="m-sx-art">${symWrap(S, inkInner(S, {id}))}</g>` + hits() + selG();
      sv.classList.toggle("simp", E.simp);
      toolbar();
    }
    function toolbar(){
      const p = E.pieces[E.sel];
      if(E.simp){ bar.innerHTML = `<p class="help">Mode simplifier : les traits effacés restent en pointillé rouge tant que tu es dans ce mode.</p>`; return; }
      if(!p){ bar.innerHTML = E.pieces.length ? `<p class="help">Touche une lettre pour la prendre : glisse-la, tourne-la par la poignée ronde, agrandis-la par la poignée carrée.</p><div class="m-sx-tools"><button type="button" class="chip small" data-sxp="next">Prendre la première lettre</button></div>` : ""; return; }
      bar.innerHTML = `<div class="m-sx-tools" role="toolbar" aria-label="La lettre ${p.c}">
        <button type="button" class="m-sx-tb" data-sxp="prev" aria-label="Lettre précédente">‹</button><span class="m-sx-cur" aria-live="polite">${p.c}</span><button type="button" class="m-sx-tb" data-sxp="next" aria-label="Lettre suivante">›</button>
        <span class="m-sx-sep"></span>
        <button type="button" class="m-sx-tb" data-sxp="rl" aria-label="Tourner à gauche">↺</button><button type="button" class="m-sx-tb" data-sxp="rr" aria-label="Tourner à droite">↻</button>
        <button type="button" class="m-sx-tb" data-sxp="sm" aria-label="Rapetisser">−</button><button type="button" class="m-sx-tb" data-sxp="sp" aria-label="Agrandir">+</button>
        <button type="button" class="m-sx-tb" data-sxp="flip" aria-label="Retourner en miroir">⇋</button><button type="button" class="m-sx-tb" data-sxp="ctr" aria-label="Ramener au centre">⊙</button>
        <button type="button" class="m-sx-tb" data-sxp="none" aria-label="Lâcher la lettre">✓</button></div>`;
    }
    /* mise à jour légère pendant un geste : on ne redessine que la pièce touchée */
    function moveOnly(i){
      const p = E.pieces[i], t = tf(p);
      qa(`[data-pg="${i}"],[data-ph="${i}"]`, sv).forEach(g => g.setAttribute("transform", t));
      const sg = q1("[data-sel]", sv); if(sg) sg.setAttribute("transform", `translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(p.r)})`);
      const d = dotsOf(E.pieces); if(d.length) qa("[data-dot]", sv).forEach(c => { const q = d[+c.dataset.dot]; c.setAttribute("cx", n2(q[0])); c.setAttribute("cy", n2(q[1])); });
    }
    const pt = e => { const m = sv.getScreenCTM(); if(!m) return [0, 0]; const P = sv.createSVGPoint(); P.x = e.clientX; P.y = e.clientY; const r = P.matrixTransform(m.inverse()); return [r.x, r.y]; };
    function snapPos(x, y){
      if(!E.snap) return [x, y];
      const R = Math.hypot(x, y); if(R < 8) return [0, 0];
      const rr = Math.round(R/22)*22, a = Math.round(Math.atan2(y, x)/(30*rad))*30*rad, sx = rr*Math.cos(a), sy = rr*Math.sin(a);
      return Math.hypot(sx - x, sy - y) < 8 ? [sx, sy] : [x, y];
    }
    sv.addEventListener("pointerdown", e => {
      const hh = e.target.closest("[data-hh]"), ph = e.target.closest("[data-ph]");
      const [x, y] = pt(e);
      if(E.simp){
        if(ph && e.target.dataset.sub != null){ const i = +ph.dataset.ph, j = +e.target.dataset.sub, p = E.pieces[i];
          const on = p.hide.includes(j);
          if(!on && vis(p).length <= 1){ gnose("Chaque lettre garde au moins un trait."); return; }
          push(); p.hide = on ? p.hide.filter(k => k !== j) : p.hide.concat(j); paint(); }
        return;
      }
      if(hh && E.sel >= 0){
        const p = E.pieces[E.sel];
        drag = {snap:JSON.stringify(E.pieces), kind:hh.dataset.hh, i:E.sel, a0:Math.atan2(y - p.y, x - p.x), r0:p.r, d0:Math.hypot(x - p.x, y - p.y) || 1, s0:p.s};
      } else if(ph){
        const i = +ph.dataset.ph, p = E.pieces[i];
        if(E.sel !== i){ E.sel = i; paint(); }
        drag = {snap:JSON.stringify(E.pieces), kind:"move", i, x0:x, y0:y, px:p.x, py:p.y, moved:false};
      } else { if(E.sel >= 0){ E.sel = -1; paint(); } return; }
      e.preventDefault(); sv.setPointerCapture(e.pointerId); stage.classList.add("dragging");
    });
    sv.addEventListener("pointermove", e => {
      if(!drag) return;
      const [x, y] = pt(e), p = E.pieces[drag.i];
      if(drag.kind === "move"){ const [nx, ny] = snapPos(drag.px + x - drag.x0, drag.py + y - drag.y0); p.x = Math.max(-118, Math.min(118, nx)); p.y = Math.max(-118, Math.min(118, ny)); drag.moved = true; }
      else if(drag.kind === "rot"){ let r = drag.r0 + (Math.atan2(y - p.y, x - p.x) - drag.a0)/rad; if(E.snap) r = Math.round(r/15)*15; p.r = ((r % 360) + 540) % 360 - 180; }
      else if(drag.kind === "sc"){ let s = drag.s0*Math.hypot(x - p.x, y - p.y)/drag.d0; s = Math.max(.25, Math.min(2.2, s)); if(E.snap) s = Math.round(s*20)/20; p.s = s; }
      if(drag.kind === "move") moveOnly(drag.i); else { moveOnly(drag.i); const sg = q1("[data-sel]", sv); if(sg) sg.outerHTML = selG(); }
    });
    const end = () => { if(!drag) return; const d = drag; drag = null; stage.classList.remove("dragging");
      if(d.snap !== JSON.stringify(E.pieces)){ hist.push(d.snap); if(hist.length > 60) hist.shift(); q1('[data-sxa="undo"]', fig).disabled = false; dirty(); }
      paint(); };
    sv.addEventListener("pointerup", end); sv.addEventListener("pointercancel", end);
    sv.addEventListener("keydown", e => {
      const p = E.pieces[E.sel]; if(!p) { if(e.key === "Enter" && E.pieces.length){ E.sel = 0; paint(); } return; }
      const st = e.shiftKey ? 1 : 4, K = {ArrowLeft:[-st, 0], ArrowRight:[st, 0], ArrowUp:[0, -st], ArrowDown:[0, st]}[e.key];
      if(K){ push(); p.x += K[0]; p.y += K[1]; paint(); e.preventDefault(); }
      else if(e.key === "[" || e.key === "]"){ push(); p.r += e.key === "[" ? -15 : 15; paint(); }
      else if(e.key === "+" || e.key === "-"){ push(); p.s = Math.max(.25, Math.min(2.2, p.s + (e.key === "+" ? .08 : -.08))); paint(); }
      else if(e.key === "Escape"){ E.sel = -1; paint(); }
      else if(e.key === "Tab" && !e.shiftKey && E.sel < E.pieces.length - 1){ E.sel++; paint(); e.preventDefault(); }
    });
    bar.addEventListener("click", e => {
      const b = e.target.closest("[data-sxp]"); if(!b) return; const a = b.dataset.sxp, n = E.pieces.length; if(!n) return;
      if(a === "next"){ E.sel = (E.sel + 1) % n; paint(); return; }
      if(a === "prev"){ E.sel = (E.sel - 1 + n) % n; paint(); return; }
      if(a === "none"){ E.sel = -1; paint(); return; }
      const p = E.pieces[E.sel]; if(!p) return; push();
      if(a === "rl") p.r -= 15; if(a === "rr") p.r += 15;
      if(a === "sm") p.s = Math.max(.25, p.s - .08); if(a === "sp") p.s = Math.min(2.2, p.s + .08);
      if(a === "flip") p.f *= -1; if(a === "ctr"){ p.x = 0; p.y = 0; }
      paint(); const nb = q1(`[data-sxp="${a}"]`, bar); if(nb) nb.focus();
    });
    fig.addEventListener("click", e => {
      const s = e.target.closest("[data-sxset]");
      if(s){ const [k, v] = s.dataset.sxset.split(":"); if(k === "sym" && E.sym !== v){ push(); arrange(E.pieces, v); } E[k] = v; dirty();
        qa(`[data-sxg="${k}"] .chip`, fig).forEach(c => { const on = c.dataset.sxset === s.dataset.sxset; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
        paint(); return; }
      const a = e.target.closest("[data-sxa]"); if(!a) return; const k = a.dataset.sxa;
      if(k === "auto"){ push(); E.v++; E.pieces = arrange(auto(keep(), E.v), E.sym); E.sel = -1; paint(); }
      else if(k === "cluster"){ push(); arrange(cluster(E.pieces), E.sym); paint(); }
      else if(k === "undo"){ const last = hist.pop(); if(last){ E.pieces = JSON.parse(last); if(E.sel >= E.pieces.length) E.sel = -1; paint(); } a.disabled = !hist.length; }
      else if(k === "simp"){ E.simp = !E.simp; E.sel = -1; a.classList.toggle("on", E.simp); a.setAttribute("aria-pressed", E.simp); a.textContent = E.simp ? "J'ai fini d'effacer" : "Effacer des traits"; paint(); }
    });
    q1("[data-sph]", fig).oninput = e => { E.ph = e.target.value; marks(); clearTimeout(tmPh); tmPh = setTimeout(() => { E.pieces = arrange(auto(keep(), E.v), E.sym); hist = []; q1('[data-sxa="undo"]', fig).disabled = true; E.sel = -1; dirty(); paint(); }, 260); };
    q1("[data-ssv]", fig).onchange = e => { E.sv = e.target.checked; marks(); E.pieces = arrange(auto(keep(), E.v), E.sym); hist = []; E.sel = -1; dirty(); paint(); };
    q1("[data-sxsnap]", fig).onchange = e => { E.snap = e.target.checked; };
    q1("[data-sxdots]", fig).onchange = e => { E.dots = e.target.checked; dirty(); paint(); };

    let tmG = null;
    function gnose(t, ms = 2200){ const g = q1(".m-sx-gnose", fig); g.textContent = t; g.classList.add("on"); clearTimeout(tmG); if(ms) tmG = setTimeout(() => g.classList.remove("on"), ms); }

    /* la charge : le sigil se trace une dernière fois, puis trois respirations, puis le carnet */
    const ch = q1("[data-sxcharge]", fig);
    if(ch) ch.onclick = () => {
      if(!E.pieces.length || charged) return;
      charged = true; ch.disabled = true; fig.classList.add("charging");
      stage.scrollIntoView({behavior:reduce() ? "auto" : "smooth", block:"center"}); E.sel = -1; if(E.simp) q1('[data-sxa="simp"]', fig).click();
      const red = reduce(), P = E.pieces, nTr = P.reduce((a, p) => a + vis(p).length, 0);
      sv.innerHTML = defsSVG(id) + frameSVG(E.frame, false) + `<g class="m-sx-art">${symWrap(E, inkInner(E, {id, anim:!red}))}</g>`;
      sv.classList.remove("lit"); void sv.getBoundingClientRect(); if(!red) sv.classList.add("draw");
      const tTrace = red ? 0 : Math.min(nTr*140 + 900, 4200);
      ch.textContent = "Le sigil se trace…";
      const steps = red ? [] : [["Fixe le centre. Inspire…", 0], ["… et expire.", 2400], ["Inspire…", 4800], ["… expire.", 7200], ["Une dernière fois.", 9600]];
      setTimeout(() => {
        sv.classList.add("lit"); ch.textContent = "Respire avec lui…";
        steps.forEach(([t, d]) => setTimeout(() => gnose(t, 0), d));
        setTimeout(() => {
          q1(".m-sx-gnose", fig).classList.remove("on");
          const S = _.st(); S.sceaux.unshift({id:uid(), t:Date.now(), kind:"compo", mot:E.ph.trim(), sv:E.sv,
            pieces:P.map(p => ({c:p.c, x:+n2(p.x), y:+n2(p.y), s:+n2(p.s), r:+n2(p.r), f:p.f, hide:p.hide.slice()})), style:E.style, sym:E.sym, frame:E.frame, dots:E.dots});
          _.save();
          fig.classList.add("forget"); fig.classList.remove("charging");
          ch.textContent = "Chargé et gardé ✓";
          const msg = q1("[data-sxmsg]", fig);
          if(msg){ msg.innerHTML = `Le sigil est dans ton carnet, avec ta phrase cachée. À présent, la tradition de Spare conseille de l'oublier. <button type="button" class="linkbtn" data-sxgo>Voir mes sceaux</button>`;
            q1("[data-sxgo]", msg).onclick = () => _.go("carnet:sceaux"); }
          paint();
        }, red ? 0 : 11600);
      }, tTrace);
    };

    marks(); paint();
  }

  window.MagieSigil = {svg, auto, cluster, editor, fromSaved, GLYPHES:G};
})();
