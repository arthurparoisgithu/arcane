/* ===== Arcanes · Astrologie : l'interface =====
   Un deuxième univers à côté du tarot, avec la même navigation :
   Aujourd'hui (le ciel du jour), Thème (thème natal et dés), Apprendre, Quiz, Histoire, Mon espace.
   On passe d'un univers à l'autre en touchant « Arcanes » en haut de l'écran. */
(() => {
  if(typeof ASTRO_DATA === "undefined" || typeof ASTRO_CALC === "undefined") return;
  const D = ASTRO_DATA, C = ASTRO_CALC, T = D.T, PL = C.PL, SG = C.SG, rad = Math.PI/180;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
  const ROM = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  const ASP = Object.fromEntries(D.ASPECTS.map(a => [a.id, a]));
  const shuffle = a => { const b = [...a]; for(let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const pick = a => a[Math.floor(Math.random()*a.length)];

  /* ---------- mémoire ---------- */
  const STORE = "arcanes.astro.v1";
  const DEF = () => ({univers:"tarot", vue:"ciel", ecole:"moderne", sysMod:"placidus", sysTrad:"regio",
    lieu:{nom:"Paris (France)", lat:48.857, lon:2.352, tz:"Europe/Paris"}, themes:[], cur:null, done:[], best:{}, des:[]});
  const load = () => { try{ const v = JSON.parse(localStorage.getItem(STORE) || "{}"); return Object.assign(DEF(), v && typeof v === "object" ? v : {}); }catch(e){ return DEF(); } };
  let st = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(st)); }catch(e){} };
  const school = () => st.ecole === "tradition" ? "tradition" : "moderne";
  const system = () => school() === "tradition" ? st.sysTrad : st.sysMod;
  const SYS_NOM = {placidus:"Placidus", regio:"Regiomontanus", campanus:"Campanus", porphyre:"Porphyre", signes:"signes entiers", egal:"maisons égales"};

  /* ---------- petits morceaux d'affichage ---------- */
  const gl = (s, cls = "") => `<span class="ag ${cls}" aria-hidden="true">${s}${T}</span>`;
  const pg = id => D.ANGLES[id] ? `<span class="ag ang" aria-hidden="true">${D.ANGLES[id].gl}</span>` : gl(PL[id].gl, "pl");
  const sgl = k => gl(SG[k].gl, "el-" + SG[k].el);
  const pn = id => PL[id] ? PL[id].court : D.ANGLES[id].court;
  const pnom = id => PL[id] ? PL[id].nom : D.ANGLES[id].nom;
  const fs = id => PL[id] ? PL[id].fs : D.ANGLES[id].fs;
  const ton = id => (PL[id] && PL[id].genre === "f" ? "ta " : "ton ") + pn(id);
  const fmtDeg = lon => { const d = C.norm(lon) % 30; let a = Math.floor(d), m = Math.round((d - a)*60); if(m === 60){ a++; m = 0; } return `${a}°${String(m).padStart(2,"0")}′`; };
  const fmtPos = lon => `${fmtDeg(lon)} ${sgl(C.si(lon))} ${SG[C.si(lon)].nom}`;
  const fmtOrb = o => { const a = Math.floor(o), m = Math.round((o - a)*60); return m === 60 ? `${a+1}°` : `${a}°${String(m).padStart(2,"0")}′`; };
  const fmtD = (d, tz, o) => { try{ return d.toLocaleString("fr-FR", Object.assign(tz ? {timeZone:tz} : {}, o)); }catch(e){ return d.toLocaleString("fr-FR", o); } };
  const dayFmt = {weekday:"long", day:"numeric", month:"long"}, dateFmt = {day:"numeric", month:"long", year:"numeric"}, hm = {hour:"2-digit", minute:"2-digit"};
  const fiche = (k, label, cls = "") => `<button type="button" class="a-link ${cls}" data-afiche="${k}">${label}</button>`;
  /* Les gravures : un seul fichier (astro-img.js), chargé à la première visite de l'astrologie */
  const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  const IMG = k => (window.ASTRO_IMG && window.ASTRO_IMG[k]) || BLANK;
  window.ASTRO_IMG_SRC = IMG;
  let imgLoading = false;
  function loadImgs(){
    if(window.ASTRO_IMG || imgLoading) return; imgLoading = true;
    const sc = document.createElement("script"); sc.src = "astro/astro-img.js"; sc.async = true;
    sc.onload = () => { if(st.univers === "astro") rerender(); };
    sc.onerror = () => { imgLoading = false; };
    document.head.appendChild(sc);
  }
  function rerender(){ const v = st.vue, y = window.scrollY;
    if(v === "ciel") renderCiel(); if(v === "theme" && thMode === "natal" && !editing && st.themes.length) renderTheme(); if(v === "apprendre") renderLearn(); if(v === "histoire") renderHist();
    window.scrollTo({top:y}); }
  const ELN = {feu:"feu", terre:"terre", air:"air", eau:"eau"};


  /* ---------- le fond de l'astrologie : une sphère céleste et quelques constellations ---------- */
  window.astroBackdrop = (x, w, h, v) => {
    const wide = w > 900, A = (wide ? .22 : .14) * (document.documentElement.classList.contains("u-night") ? 1 : .55);
    x.strokeStyle = v("--tree") || "#d9b45a"; x.fillStyle = v("--tree") || "#d9b45a"; x.lineWidth = 1; x.globalAlpha = A;
    const R = Math.min(h*.42, 410, w*.46), cx = wide ? w - R - Math.max(36, w*.05) : w/2, cy = wide ? h*.52 : h*.42;
    const P = (a, r) => [cx + Math.cos(a)*r, cy - Math.sin(a)*r];
    const ring = r => { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI*2); x.stroke(); };
    ring(R); ring(R*.985); ring(R*.855);
    for(let d = 0; d < 360; d += 5){ const a = d*Math.PI/180, [x1, y1] = P(a, R*.985), [x2, y2] = P(a, R*(d % 30 === 0 ? .855 : d % 10 === 0 ? .955 : .968)); x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); }
    x.font = `${Math.round(R/11)}px "Arcanes Symboles","Segoe UI Symbol",serif`; x.textAlign = "center"; x.textBaseline = "middle";
    const G = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
    G.forEach((g, i) => { const [tx, ty] = P(Math.PI - (i + .5)*Math.PI/6, R*.92); x.fillText(g + "︎", tx, ty); });
    const r = R*.855;
    for(let i = 1; i < 4; i++){ x.beginPath(); x.ellipse(cx, cy, r*Math.cos(i*Math.PI/8), r, 0, 0, Math.PI*2); x.stroke(); }
    x.beginPath(); x.ellipse(cx, cy, r, r*.3, 0, 0, Math.PI*2); x.stroke();
    x.save(); x.setLineDash([2, 6]); x.lineWidth = 1.4; x.beginPath(); x.ellipse(cx, cy, r, r*.3, -0.41, 0, Math.PI*2); x.stroke(); x.restore();
    x.beginPath(); x.moveTo(cx, cy - R*1.08); x.lineTo(cx, cy + R*1.08); x.stroke();
    x.beginPath(); x.arc(cx - r*.72*Math.cos(.41), cy + r*.72*Math.sin(.41)*.62, 4, 0, Math.PI*2); x.fill();
    x.beginPath(); x.arc(cx, cy, 3, 0, Math.PI*2); x.fill();
    // les constellations, en traits fins
    const CONST = [
      {s:[[.22,.05],[.72,.12],[.43,.46],[.5,.49],[.58,.52],[.26,.92],[.76,.86]], e:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]]},              // Orion
      {s:[[0,.36],[.17,.3],[.33,.37],[.49,.45],[.52,.76],[.88,.8],[.93,.48]], e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},           // la Grande Ourse
      {s:[[0,.22],[.26,.8],[.5,.38],[.74,.88],[1,.3]], e:[[0,1],[1,2],[2,3],[3,4]]}                                                    // Cassiopée
    ];
    const place = wide ? [[w*.035, h*.55, 150], [w*.06, h*.1, 190], [w*.43, h*.03, 120]] : [[w*.05, h*.72, 110], [w*.55, h*.8, 130]];
    place.forEach(([ox, oy, s], i) => { const C = CONST[i], pt = k => [ox + C.s[k][0]*s, oy + C.s[k][1]*s];
      x.globalAlpha = A*.7; C.e.forEach(([a, b]) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); });
      x.globalAlpha = Math.min(1, A*2.2); C.s.forEach((_, k) => { const [px, py] = pt(k); x.beginPath(); x.arc(px, py, k % 3 ? 1.6 : 2.4, 0, Math.PI*2); x.fill(); }); });
    x.globalAlpha = 1;
  };

  /* ---------- la roue du thème ---------- */
  function sector(a0, a1, r0, r1, ref){
    const A = l => (180 + l - ref)*rad, p = (l, r) => `${(r*Math.cos(A(l))).toFixed(2)} ${(-r*Math.sin(A(l))).toFixed(2)}`;
    return `M${p(a0, r1)}A${r1} ${r1} 0 0 0 ${p(a1, r1)}L${p(a1, r0)}A${r0} ${r0} 0 0 1 ${p(a0, r0)}Z`;
  }
  function spread(items, gap){
    const s = [...items].sort((a, b) => a.lon - b.lon).map(x => ({...x, d:x.lon}));
    for(let it = 0; it < 6; it++){
      for(let i = 0; i < s.length; i++){ const p = s[(i - 1 + s.length) % s.length], c = s[i]; const diff = C.norm(c.d - p.d);
        if(s.length > 1 && diff < gap){ const push = (gap - diff)/2; c.d = C.norm(c.d + push); p.d = C.norm(p.d - push); } }
    }
    return s;
  }
  function wheel(ch, o = {}){
    const ref = ch && ch.heure ? ch.asc : 0, A = l => (180 + l - ref)*rad;
    const xy = (l, r) => [r*Math.cos(A(l)), -r*Math.sin(A(l))], f = n => n.toFixed(1);
    const R0 = 292, R1 = 250, RH = 128;
    let s = `<svg class="awheel${o.small ? " small" : ""}" viewBox="-322 -322 644 644" role="img" aria-label="${h(o.label || "Roue du zodiaque")}">`;
    s += `<circle r="${R0}" class="w-out"/>`;
    for(let k = 0; k < 12; k++){
      s += `<path d="${sector(30*k, 30*k + 30, R1, R0, ref)}" class="w-sec el-${SG[k].el}" data-afiche="s:${k}"/>`;
      const [x, y] = xy(30*k + 15, (R0 + R1)/2);
      s += `<text x="${f(x)}" y="${f(y)}" class="w-sg el-${SG[k].el}" text-anchor="middle" dominant-baseline="central" data-afiche="s:${k}">${SG[k].gl}${T}</text>`;
    }
    for(let d = 0; d < 360; d += 5){ const [x1, y1] = xy(d, R1), [x2, y2] = xy(d, R1 - (d % 30 === 0 ? 0 : d % 10 === 0 ? 9 : 5)); if(d % 30) s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="w-tick"/>`; }
    for(let k = 0; k < 12; k++){ const [x1, y1] = xy(30*k, R0), [x2, y2] = xy(30*k, R1); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="w-div"/>`; }
    s += `<circle r="${R1}" class="w-in"/><circle r="${RH}" class="w-core"/>`;
    if(o.houses){ // schéma pédagogique des maisons
      for(let i = 0; i < 12; i++){ const [x1, y1] = xy(30*i, RH), [x2, y2] = xy(30*i, R1), [tx, ty] = xy(30*i + 15, (R1 + RH)/2), ty_ = ["angulaire","succédente","cadente"][i % 3];
        s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="w-cusp${i % 3 === 0 ? " axis" : ""}"/><text x="${f(tx)}" y="${f(ty)}" text-anchor="middle" dominant-baseline="central" class="w-hn big t-${ty_}">${ROM[i+1]}</text>`; }
      [["AS",0],["FC",90],["DS",180],["MC",270]].forEach(([t, a]) => { const [x, y] = xy(a, R0 + 18); s += `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="central" class="w-axl">${t}</text>`; });
      return s + `</svg>`;
    }
    if(!ch) return s + `</svg>`;
    if(ch.heure && ch.cusps){
      ch.cusps.forEach((c, i) => { const ax = i % 3 === 0, [x1, y1] = xy(c, RH), [x2, y2] = xy(c, ax ? R0 + 8 : R1);
        s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="w-cusp${ax ? " axis" : ""}"/>`;
        const nx = ch.cusps[(i+1) % 12], mid = c + C.norm(nx - c)/2, [tx, ty] = xy(mid, RH + 13);
        s += `<text x="${f(tx)}" y="${f(ty)}" text-anchor="middle" dominant-baseline="central" class="w-hn">${i+1}</text>`; });
      [["AS",ch.asc],["MC",ch.mc],["DS",ch.asc+180],["FC",ch.mc+180]].forEach(([t, l]) => { const [x, y] = xy(l, R0 + 20); s += `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="central" class="w-axl">${t}</text>`; });
    }
    const ids = o.ids || (school() === "tradition" ? [...C.TRAD7, "noeudn"] : [...C.MOD10, "noeudn"]);
    // aspects
    if(o.aspects !== false){
      const A2 = (o.asp || C.aspects(ch, school())).filter(x => PL[x.a] && PL[x.b] && x.asp !== "conj" && !PL[x.a].point && !PL[x.b].point);
      A2.forEach(x => { const [x1, y1] = xy(ch.P[x.a].lon, RH - 4), [x2, y2] = xy(ch.P[x.b].lon, RH - 4);
        s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="w-asp ${ASP[x.asp].cls}" style="opacity:${Math.max(.3, 1 - x.orb/9).toFixed(2)}"/>`; });
    }
    const items = spread(ids.map(id => ({id, lon:ch.P[id].lon})), 8.5);
    items.forEach(it => {
      const p = ch.P[it.id], [tx1, ty1] = xy(it.lon, R1), [tx2, ty2] = xy(it.lon, R1 - 10), [gx, gy] = xy(it.d, 222), [dx, dy] = xy(it.d, 190), [lx, ly] = xy(it.d, 236);
      s += `<g class="w-pl" data-afiche="${o.prefix || "np"}:${it.id}" tabindex="0" role="button" aria-label="${h(PL[it.id].court)} ${fmtDeg(p.lon).replace("′","")} ${SG[C.si(p.lon)].nom}">`;
      s += `<line x1="${f(tx1)}" y1="${f(ty1)}" x2="${f(tx2)}" y2="${f(ty2)}" class="w-ptick"/><line x1="${f(tx2)}" y1="${f(ty2)}" x2="${f(lx)}" y2="${f(ly)}" class="w-plink"/>`;
      s += `<circle cx="${f(gx)}" cy="${f(gy)}" r="15" class="w-pbg"/><text x="${f(gx)}" y="${f(gy)}" text-anchor="middle" dominant-baseline="central" class="w-pg">${PL[it.id].gl}${T}</text>`;
      s += `<text x="${f(dx)}" y="${f(dy)}" text-anchor="middle" dominant-baseline="central" class="w-pd">${Math.floor(p.lon % 30)}°${p.retro ? "℞" : ""}</text></g>`;
    });
    return s + `</svg>`;
  }

  /* ---------- phrases ---------- */
  const DIGN_LAB = {domicile:"en domicile", exaltation:"exaltée", triplicite:"maîtresse de triplicité", terme:"dans ses termes", face:"dans sa face", exil:"en exil", chute:"en chute"};
  const DIGN_TXT = {
    domicile:"Elle est chez elle : elle agit librement, avec toutes ses ressources.",
    exaltation:"Elle est exaltée : honorée comme un invité de marque, elle donne le meilleur d'elle-même, parfois avec un peu d'excès.",
    exil:"Elle est en exil : loin de chez elle, elle doit composer avec un terrain qui ne lui ressemble pas. Ce n'est pas un défaut, c'est une manière moins directe d'agir.",
    chute:"Elle est en chute : elle manque d'appui et doit gagner sa place. Ce qui ne vient pas tout seul se construit.",
    peregrine:"Elle est pérégrine : sans dignité dans ce signe, comme un voyageur sans abri, elle dépend beaucoup de son dispositeur et de ses aspects."};
  const sentencePlanet = (ch, id) => {
    const p = ch.P[id], S = SG[C.si(p.lon)];
    let t = `${cap(PL[id].fn)} se vit sur le mode ${S.du} : ${S.style}.`;
    if(ch.heure && p.house) t += ` Cela se joue surtout ${D.HOUSES[p.house - 1].dom}.`;
    return t;
  };
  const aspSentence = (x, natal) => { const a = ASP[x.asp];
    return `${a.nom} ${natal ? "" : ""}${pn(x.a)}–${pn(x.b)} : ${a.sens}, entre ${fs(x.a)} et ${fs(x.b)}.`; };
  const tags = (ch, id) => {
    const p = ch.P[id], out = [];
    if(p.retro) out.push(`<span class="a-tag">℞ rétrograde</span>`);
    if(!PL[id].point && !PL[id].moderne){
      if(school() === "tradition"){ const d = C.dignities(id, p.lon, ch.diurne); d.list.filter(x => ["domicile","exaltation","exil","chute"].includes(x)).forEach(x => out.push(`<span class="a-tag ${["exil","chute"].includes(x) ? "bad" : "good"}">${DIGN_LAB[x]}</span>`)); if(d.peregrine && !d.list.some(x => ["exil","chute"].includes(x))) out.push(`<span class="a-tag">pérégrine</span>`); }
      else { const m = C.modState(id, p.lon); if(m) out.push(`<span class="a-tag ${["exil","chute"].includes(m) ? "bad" : "good"}">${DIGN_LAB[m]}</span>`); }
      const so = C.solarState(id, ch); if(so) out.push(`<span class="a-tag ${so === "cazimi" ? "good" : "bad"}">${so}</span>`);
    } else if(PL[id].moderne){ const m = C.modState(id, p.lon); if(m) out.push(`<span class="a-tag ${["exil","chute"].includes(m) ? "bad" : "good"}">${DIGN_LAB[m]}</span>`); }
    return out.join("");
  };

  /* ---------- fiches (feuille du bas) ---------- */
  function sheet(html){
    const sh = document.getElementById("sheet"); if(!sh) return;
    sh.querySelector(".sheet-body").innerHTML = `<div class="a-sheet">${html}</div>`;
    sh.hidden = false; document.body.classList.add("locked");
    const p = sh.querySelector(".sheet-panel"); if(p) p.scrollTop = 0;
  }
  const two = (trad, mod) => school() === "tradition"
    ? `<h4>Lecture traditionnelle</h4><p>${trad}</p><h4>Lecture moderne</h4><p>${mod}</p>`
    : `<h4>Lecture moderne</h4><p>${mod}</p><h4>Lecture traditionnelle</h4><p>${trad}</p>`;
  function planetFiche(id){
    const P = PL[id], dom = SG.filter(s => s.maitre === id).map(s => s.nom), domM = SG.filter(s => s.maitreMod === id && s.maitre !== id).map(s => s.nom), ex = SG.find(s => s.exalt && s.exalt[0] === id);
    return `<div class="a-sh-top">${gl(P.gl, "huge pl")}<div><p class="eyebrow">${P.point ? "Point" : P.moderne ? "Planète moderne" : P.qual === "luminaire" ? "Luminaire" : "Planète"}</p><h2>${P.nom}</h2><p class="a-mots">${P.mots.join(" · ")}</p></div></div>
      <section class="rub"><h3><span>I</span>Ce qu'elle signifie</h3>${two(P.trad, P.mod)}</section>
      <section class="rub"><h3><span>II</span>Repères</h3><ul class="a-facts">
        <li><b>Mouvement</b> ${P.cycle}</li>
        ${dom.length ? `<li><b>Domicile</b> ${dom.join(" et ")}</li>` : ""}${domM.length ? `<li><b>Domicile moderne</b> ${domM.join(", ")}</li>` : ""}
        ${ex ? `<li><b>Exaltation</b> ${ex.nom} (${ex.exalt[1]}°) · <b>chute</b> ${SG[(SG.indexOf(ex)+6)%12].nom}</li>` : ""}
        ${dom.length ? `<li><b>Exil</b> ${SG.filter(s => SG[(SG.indexOf(s)+6)%12].maitre === id).map(s => s.nom).join(" et ")}</li>` : ""}
        ${P.nature && P.nature !== "—" ? `<li><b>Nature</b> ${P.nature}${P.secte ? `, ${P.secte}` : ""}</li>` : ""}
        ${P.joie ? `<li><b>Joie</b> maison ${ROM[P.joie]}</li>` : ""}${P.jour && P.jour !== "—" ? `<li><b>Jour et métal</b> ${P.jour}, ${P.metal}</li>` : ""}</ul></section>`;
  }
  function signFiche(k){
    const S = SG[k], E = D.ELEMENTS[S.el], opp = SG[(k+6)%12];
    return `<div class="a-sh-top">${gl(S.gl, "huge el-" + S.el)}<div><p class="eyebrow">${S.dates}</p><h2>${S.nom}</h2><p class="a-mots">${S.mots.join(" · ")}</p></div></div>
      <figure class="a-sh-fig"><img src="${IMG("s" + k)}" alt="${S.nom}, gravure d'Urania's Mirror (Londres, 1824)"></figure>
      <ul class="a-facts"><li><b>Élément</b> ${E.nom.toLowerCase()} (${E.qual})</li><li><b>Mode</b> ${S.mode}</li><li><b>Polarité</b> ${S.pol}</li>
        <li><b>Maître</b> ${fiche("p:" + S.maitre, PL[S.maitre].court)}${S.maitreMod !== S.maitre ? ` · moderne : ${fiche("p:" + S.maitreMod, PL[S.maitreMod].court)}` : ""}</li>
        ${S.exalt ? `<li><b>Exaltation</b> ${PL[S.exalt[0]].court} (${S.exalt[1]}°)</li>` : ""}<li><b>Signe opposé</b> ${fiche("s:" + ((k+6)%12), opp.nom)}</li><li><b>Le corps</b> ${S.corps}</li></ul>
      <section class="rub"><h3><span>I</span>Son caractère</h3>${two(S.trad, S.mod)}<p class="a-style">Une planète dans ce signe s'exprime ${S.style}.</p></section>
      <section class="rub"><h3><span>II</span>Le mythe</h3><p>${S.mythe}</p></section>`;
  }
  function houseFiche(n){
    const H = D.HOUSES[n-1];
    return `<div class="a-sh-top"><span class="ag huge rom">${ROM[n]}</span><div><p class="eyebrow">Maison ${H.type} · ${H.latin}</p><h2>${H.nom}</h2><p class="a-mots">${H.mots.join(" · ")}</p></div></div>
      <section class="rub"><h3><span>I</span>Son domaine</h3>${two(H.trad, H.mod)}${H.joie ? `<p class="help">Joie de ${PL[H.joie].court}.</p>` : ""}</section>`;
  }
  function aspectFiche(id){
    const A = ASP[id];
    return `<div class="a-sh-top">${gl(A.gl, "huge asp " + A.cls)}<div><p class="eyebrow">${A.ang}° · ${A.nature}${A.moderne ? " · aspect moderne" : ""}</p><h2>${A.nom}</h2></div></div>
      <section class="rub"><h3><span>I</span>Ce qu'il dit</h3><p class="lead">${cap(A.sens)}.</p>${two(A.trad, A.mod)}<p class="help">Orbe moderne habituel : ${A.orb}°.</p></section>`;
  }
  function placedFiche(ch, id, ctx){
    const p = ch.P[id], k = C.si(p.lon), S = SG[k], P = PL[id], H = ch.heure && p.house ? D.HOUSES[p.house-1] : null;
    const asp = (ctx.asp || C.aspects(ch, school())).filter(x => x.a === id || x.b === id);
    let etat = "";
    if(!P.point && !P.moderne){
      const d = C.dignities(id, p.lon, ch.diurne), parts = [];
      ["domicile","exaltation","exil","chute"].forEach(x => { if(d.list.includes(x)) parts.push(DIGN_TXT[x]); });
      if(d.peregrine && !parts.length) parts.push(DIGN_TXT.peregrine);
      const so = C.solarState(id, ch); if(so === "combuste") parts.push("Elle est combuste, trop près du Soleil : elle perd de sa force, comme une étoile noyée dans la lumière."); if(so === "cazimi") parts.push("Elle est cazimi, au cœur du Soleil : une place d'honneur."); if(so === "sous les rayons") parts.push("Elle est sous les rayons du Soleil : un peu voilée.");
      if(p.retro) parts.push("Elle est rétrograde : son action est intériorisée, différée, ou revient sur le passé.");
      if(H){ parts.push(["angulaire"].includes(H.type) ? "Angulaire, elle est forte et visible." : H.type === "succédente" ? "Succédente, elle a une force moyenne." : "Cadente, elle est plus discrète."); if(P.joie === p.house) parts.push(`Elle est dans sa joie, en maison ${ROM[p.house]}.`); }
      etat = `<section class="rub"><h3><span>${H ? "IV" : "III"}</span>Son état</h3><p>${parts.join(" ")}</p>${school() === "tradition" ? `<p class="help">Barème de Lilly : ${d.score > 0 ? "+" : ""}${d.score} (${d.list.map(x => DIGN_LAB[x]).join(", ") || "aucune dignité"}).</p>` : ""}</section>`;
    } else if(p.retro) etat = `<section class="rub"><h3><span>${H ? "IV" : "III"}</span>Son état</h3><p>Rétrograde : son action est intériorisée, ou revient sur le passé.</p></section>`;
    return `<div class="a-sh-top">${gl(P.gl, "huge pl")}<div><p class="eyebrow">${ctx.ciel ? "Dans le ciel du jour" : ctx.nom ? h(ctx.nom) : "Thème"}</p><h2>${P.court} en ${S.nom}${H ? `, maison ${ROM[p.house]}` : ""}</h2><p class="a-mots">${fmtPos(p.lon)}${p.retro ? " · rétrograde" : ""}</p></div></div>
      <p class="lead">${ctx.ciel ? `En ce moment, ${PL[id].fn} se colore ${S.du} : ${S.style}.` : sentencePlanet(ch, id)}</p>
      <section class="rub"><h3><span>I</span>${P.court}</h3>${two(P.trad, P.mod)}${fiche("p:" + id, "Toute la fiche →", "more")}</section>
      <section class="rub"><h3><span>II</span>En ${S.nom}</h3>${two(S.trad, S.mod)}${fiche("s:" + k, "Toute la fiche →", "more")}</section>
      ${H ? `<section class="rub"><h3><span>III</span>En maison ${ROM[p.house]} · ${H.nom}</h3>${two(H.trad, H.mod)}</section>` : ""}
      ${etat}
      ${asp.length ? `<section class="rub"><h3><span>${H ? "V" : "IV"}</span>Ses aspects</h3><ul class="a-asplist">${asp.map(x => `<li>${pg(x.a)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.b)} <span>${aspSentence(x)} <i>Orbe ${fmtOrb(x.orb)}, ${x.app ? "appliquant" : "séparant"}.</i></span></li>`).join("")}</ul></section>` : ""}
      ${JOUR ? `<p class="a-why-r">Pourquoi on dit ça ? Une planète dit <i>quoi</i>, un signe dit <i>comment</i>, une maison dit <i>où</i>. La phrase du haut assemble les trois.</p>` + JOUR.lessonBtns(["place"]) : ""}`;
  }
  let lastCharts = {}; // pour ouvrir les fiches depuis la roue
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-afiche]"); if(!b) return;
    const [t, v] = b.dataset.afiche.split(":");
    if(t === "p") sheet(planetFiche(v)); else if(t === "s") sheet(signFiche(+v)); else if(t === "h") sheet(houseFiche(+v)); else if(t === "a") sheet(aspectFiche(v));
    else if(t === "np" && lastCharts.natal) sheet(placedFiche(lastCharts.natal.ch, v, lastCharts.natal));
    else if(t === "cp" && lastCharts.ciel) sheet(placedFiche(lastCharts.ciel.ch, v, lastCharts.ciel));
    else if(t === "l"){ const [, mod, lec] = b.dataset.afiche.split(":"), M = ASTRO_COURS.find(m => m.id === mod); if(!M) return;   // « l:module » ou « l:module:leçon »
      if(typeof closeSheet === "function") closeSheet(); lv = {mod, lec:lec != null && M.lecons[+lec] ? +lec : null, fiches:null}; aView("apprendre"); scrollTo({top:0}); }
  });
  document.addEventListener("keydown", e => { if((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("g.w-pl")){ e.preventDefault(); e.target.dispatchEvent(new MouseEvent("click", {bubbles:true})); } });

  /* =================================================================
     AUJOURD'HUI : le ciel du jour
     ================================================================= */
  const PHASES = [["Nouvelle lune","Le temps des intentions : on sème sans voir encore."],["Premier croissant","La lumière revient : les projets prennent forme, il faut les nourrir."],
    ["Premier quartier","Le moment de l'effort et des décisions : les premiers obstacles se présentent."],["Gibbeuse croissante","Peaufiner, ajuster : ce qui a été semé approche de sa maturité."],
    ["Pleine lune","Le sommet du cycle : tout est visible, les émotions aussi. On récolte, on comprend."],["Gibbeuse décroissante","Le temps de partager ce que l'on a appris."],
    ["Dernier quartier","Faire le tri : lâcher ce qui ne sert plus."],["Dernier croissant","Le repos avant le renouveau : ralentir, se retirer, rêver."]];
  const MOON_TIP = ["Journée d'élan : commence ce que tu repoussais, mais garde de la patience pour les autres.","Journée pour ralentir et savourer : un bon repas, un travail manuel, un achat réfléchi.",
    "Journée de mots et de rencontres : écris, appelle, apprends quelque chose.","Journée pour le foyer et les proches : la sensibilité est à fleur de peau, prends soin de toi.",
    "Journée pour te montrer et créer : ose, joue, fais plaisir à quelqu'un.","Journée pour trier et ranger : les détails réglés aujourd'hui allègent la semaine.",
    "Journée de relation et de diplomatie : un accord, une réconciliation, un beau moment à deux.","Journée intense : va au fond d'une question, mais méfie-toi des rancunes.",
    "Journée d'horizon : lis, voyage, parle de ce qui a du sens pour toi.","Journée de sérieux : avance sur un projet au long cours, une étape à la fois.",
    "Journée d'idées et d'amitié : sors de tes habitudes, retrouve ton groupe.","Journée de rêve et d'intuition : écoute tes impressions, fais place au silence et à l'art."];
  let cielWhen = null, jourCtx = null;
  const moonPic = f => typeof moonSVG === "function" ? moonSVG(f) : "";
  const JOUR = window.AstroJour ? window.AstroJour({C, D, SG, PL, ASP, h, cap, gl, pg, sgl, fmtPos, fmtOrb, fmtD, pn, fs, ton, sheet, IMG, PHASES, MOON_TIP}) : null;
  const deP = id => (id === "lune" ? "de la " : id === "soleil" ? "du " : "de ") + PL[id].court;
  const why = (k, lab) => JOUR ? `<button type="button" class="a-why" data-awhy="${k}">${lab || "Pourquoi on dit ça ?"}</button>` : "";
  function moiTheme(){ const t = st.themes.find(x => x.moi); return t ? {t, ch:chartOf(t)} : null; }
  function renderCiel(){
    const root = q1("#v-a-ciel"), now = cielWhen || new Date(), L = st.lieu, tz = L.tz;
    const ch = C.chart({date:now, lat:L.lat, lon:L.lon, system:system()}), sc = school();
    lastCharts.ciel = {ch, ciel:true};
    const ids = sc === "tradition" ? [...C.TRAD7, "noeudn"] : [...C.MOD10, "noeudn"];
    const mi = C.moonInfo(now), ms = C.si(ch.P.lune.lon), ph = PHASES[mi.idx];
    const lun = C.lunations(now, 2), hour = C.planetaryHour(now, L.lat, L.lon, tz);
    const asp = C.aspects(ch, sc).filter(x => !["asc","mc"].includes(x.a) && !["asc","mc"].includes(x.b) && x.orb < 3 && !(x.a === "noeudn" || x.b === "noeudn"));
    const ev = [...C.events(now, 45), ...C.eclipses(now).filter(x => x.date - now < 200*86400000)].sort((a, b) => a.date - b.date).slice(0, 10);
    const me = moiTheme(), tr = me ? C.transits(me.ch, now, sc).slice(0, 8) : null;
    const evTxt = e => e.type === "ingres" ? `${pg(e.id)} ${PL[e.id].court} entre en ${sgl(e.sign)} ${SG[e.sign].nom}${e.retro ? " (en rétrogradant)" : ""}`
      : e.type === "station" ? `${pg(e.id)} ${PL[e.id].court} ${e.retro ? "devient rétrograde" : "reprend sa marche directe"} à ${fmtPos(e.lon)}`
      : e.type === "lune" ? `☾ Éclipse de Lune ${({penumbral:"par la pénombre", partial:"partielle", total:"totale"})[e.kind] || ""}` : `☉ Éclipse de Soleil ${({partial:"partielle", annular:"annulaire", total:"totale", hybrid:"hybride"})[e.kind] || ""}`;
    const all = me ? C.transits(me.ch, now, sc) : [], dj = JOUR && me ? JOUR.duJour(all, now) : null;
    jourCtx = {me, now, tz, ms, mi, ch, dj, ev, lun, all};
    const hourCard = hour ? `<article class="a-card a-c3"><p class="eyebrow">Jour et heure planétaires</p>
        <div class="a-c3-g">${gl(PL[hour.dayRuler].gl, "pl")}<span class="a-c3-sep">·</span>${gl(PL[hour.hourRuler].gl, "pl")}</div>
        <h3>Jour ${deP(hour.dayRuler)}, heure ${deP(hour.hourRuler)}</h3>
        <p class="help">Jusqu'à ${fmtD(hour.end, tz, hm)}. Du lever au coucher du Soleil, la tradition compte douze heures inégales, chacune gouvernée par un astre dans l'ordre chaldéen. Les jours de la semaine en gardent la trace : lundi la Lune, mardi Mars, mercredi Mercure…</p></article>` : "";
    const ss = C.si(ch.P.soleil.lon), a0 = asp.slice().sort((x, y) => x.orb - y.orb)[0];
    const resume = `Lune en ${SG[ms].nom} (${ph[0].toLowerCase()}), Soleil en ${SG[ss].nom}.${a0 ? ` L'aspect le plus serré du moment : ${PL[a0.a].court} ${ASP[a0.asp].nom.toLowerCase()} ${PL[a0.b].court}.` : ""}`;
    /* la phrase du jour : d'abord ce que le ciel dit, ensuite seulement la roue qui l'explique */
    const lunePh = `<p class="a-ph-m">${moonPic(mi.f)}<span><b>La Lune en ${SG[ms].nom}, ${ph[0].toLowerCase()}.</b> ${me ? MOON_TIP[ms] : ph[1]} ${why("lune", "Pourquoi ?")}</span></p>`;
    const trio = me ? `<p class="a-trio" aria-label="Ton trio de naissance">${[["soleil","Soleil",me.ch.P.soleil.lon],["lune","Lune",me.ch.P.lune.lon]].concat(me.ch.heure ? [["asc","Ascendant",me.ch.asc]] : []).map(([id, n, lon]) => `<button type="button" data-afiche="s:${C.si(lon)}">${pg(id)}<span>${n}</span><b>${SG[C.si(lon)].nom}</b></button>`).join("")}</p>` : "";
    let phrase;
    if(me && dj && (dj.pJour || dj.pFond)){ const A = dj.pJour || dj.pFond, B = dj.pJour && dj.pFond ? dj.pFond : null, xa = dj.pJour ? dj.jour : dj.fond;
      phrase = `<div class="a-ph"><p class="a-ph-t">${h(A.txt)}</p>
          <p class="a-ph-k">${pg(xa.t)}${gl(ASP[xa.asp].gl, "asp " + ASP[xa.asp].cls)}${pg(xa.n)} <span>${h(A.titre)}${A.duree ? ` · ${h(A.duree)}` : ""}</span> ${why(dj.pJour ? "jour" : "fond")}</p></div>
        ${B ? `<div class="a-ph a-ph-2"><p class="eyebrow">En toile de fond</p><p class="a-ph-t">${h(B.txt)}</p><p class="a-ph-k">${pg(dj.fond.t)}${gl(ASP[dj.fond.asp].gl, "asp " + ASP[dj.fond.asp].cls)}${pg(dj.fond.n)} <span>${h(B.titre)} · ${h(B.duree)}</span> ${why("fond")}</p></div>` : ""}${lunePh}`;
    } else if(me){
      phrase = `<div class="a-ph"><p class="a-ph-t">Rien ne touche ton thème de près aujourd'hui : un ciel calme pour toi. ${h(MOON_TIP[ms])}</p><p class="a-ph-k">${sgl(ms)} <span>Lune en ${SG[ms].nom} · ${ph[0].toLowerCase()}</span> ${why("lune")}</p></div>`;
    } else {
      phrase = `<div class="a-ph"><p class="a-ph-t">${h(MOON_TIP[ms])}</p><p class="a-ph-k">${sgl(ms)} <span>Lune en ${SG[ms].nom} · ${ph[0].toLowerCase()}</span> ${why("lune")}</p></div>
        <div class="a-ph-cta"><p><b>Cette phrase vaut pour tout le monde.</b> Avec ta date, ton heure et ton lieu de naissance, Arcanes te dit chaque jour quelle planète touche ton thème, et pourquoi.</p><button type="button" class="btn small" data-agoto="theme">Calculer mon thème</button></div>`;
    }
    const autres = me && all.length > 1 ? `<details class="a-fold a-fold-tr"><summary><span><b>Tout ce qui touche ton thème</b><small>${all.length} transit${all.length > 1 ? "s" : ""} en cours, du plus lent au plus rapide</small></span><i class="a-chev" aria-hidden="true"></i></summary>
        <div class="a-fold-b"><ul class="a-asplist a-trlist">${all.slice(0, 8).map((x, i) => `<li>${pg(x.t)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.n)} <span><b>${JOUR ? h(JOUR.titre(x)) : `${PL[x.t].court} ${ASP[x.asp].nom.toLowerCase()} ${ton(x.n)}`}</b> : ${JOUR ? h(JOUR.lire(x, !["lune","soleil","mercure","venus","mars"].includes(x.t), now).txt) : ASP[x.asp].sens} <i>Orbe ${fmtOrb(x.orb)}, ${x.app ? "en approche" : "en train de passer"}.</i> ${why("tr:" + i, "Pourquoi ?")}</span></li>`).join("")}</ul>
          <div class="a-toi-f"><button type="button" class="btn ghost small" data-thgo="temps">Mes rendez-vous</button><button type="button" class="btn ghost small" data-thgo="annee">Mon année</button></div></div></details>` : "";
    root.innerHTML = `<header class="a-hero a-jour"><p class="eyebrow">${cap(fmtD(now, tz, dayFmt))} · ${fmtD(now, tz, hm)} · ${h(L.nom)}</p><h1>${me ? "Ton ciel aujourd'hui" : "Le ciel aujourd'hui"}</h1>
        ${phrase}
        <div class="a-jour-acts">${JOUR ? `<button type="button" class="btn" data-ashare>Partager mon ciel</button>` : ""}${me ? `<button type="button" class="btn ghost" data-thgo="guide">Lire mon thème</button>` : ""}</div>${trio}</header>${window.ArcanesCielJeu ? window.ArcanesCielJeu.carte() : ""}
      ${autres}
      <div class="a-h2row a-h2why"><h2 class="lsub">Le ciel en ce moment</h2></div>
      <p class="a-lede a-lede-sky">C'est de cette carte que sort tout ce qui précède. ${resume} Touche une planète pour lire sa fiche.</p>
      <div class="a-sky">
        <figure class="a-sky-wheel">${wheel(ch, {prefix:"cp", label:"Le ciel en ce moment"})}
          <figcaption class="help">Ascendant (AS) à gauche, Milieu du Ciel (MC) en haut, pour ${h(L.nom)} · maisons ${SYS_NOM[ch.system] || ""}${ch.fallback ? " (repli : latitude trop haute)" : ""}.</figcaption>
          <div class="a-skybar"><div class="a-seg" role="group" aria-label="École de lecture"><button type="button" data-ecole="tradition" class="${sc === "tradition" ? "on" : ""}">Tradition</button><button type="button" data-ecole="moderne" class="${sc === "moderne" ? "on" : ""}">Moderne</button></div>
            <button type="button" class="btn ghost small" data-pvgo>Vu du Soleil</button><button type="button" class="btn ghost small" data-awhen aria-expanded="false">${cielWhen ? "Changer de moment" : "Un autre moment"}</button>${cielWhen ? `<button type="button" class="btn small" data-anow>Revenir à maintenant</button>` : ""}</div>
          <div class="a-other" hidden><div class="a-row2"><input type="datetime-local" id="a-when" aria-label="Date et heure"><button type="button" class="btn small" id="a-when-go">Afficher</button></div><p class="help">Le lieu se change dans <button type="button" class="linkbtn" data-agoto="moi">Mon espace</button>.</p></div></figure>
        <aside class="a-sky-moon"><div class="a-bigmoon">${moonPic(mi.f)}</div>
          <p class="eyebrow">La Lune</p><h2>${ph[0]}</h2><p class="a-moon-sub">en ${sgl(ms)} ${SG[ms].nom} · ${Math.round(mi.ill*100)} % éclairée</p>
          <p>${ph[1]}</p>
          <dl class="a-lun">${lun.map((x, i) => `<div><dt>${x.type === "nl" ? "Nouvelle lune" : "Pleine lune"}</dt><dd>${fmtD(x.date, tz, {day:"numeric", month:"long"})} · ${fmtD(x.date, tz, hm)}<br>en ${SG[C.si(x.lon)].nom}<br>${why("lu:" + i, "Pourquoi ça compte ?")}</dd></div>`).join("")}</dl></aside></div>
      ${hourCard ? `<div class="a-c3s a-c3s-1">${hourCard}</div>` : ""}
      <p class="eyebrow a-foldk">Le détail</p>
      <details class="a-fold"><summary><span><b>Où sont les planètes</b><small>${ids.length} positions · signe, maison, état</small></span><i class="a-chev" aria-hidden="true"></i></summary>
        <div class="a-fold-b"><div class="a-table" role="table">${ids.map(id => { const p = ch.P[id]; return `<button type="button" class="a-row" data-afiche="cp:${id}" role="row">${pg(id)}<span class="a-rn">${PL[id].court}</span><span class="a-rp">${fmtPos(p.lon)}</span><span class="a-rh">${p.house ? "maison " + ROM[p.house] : ""}</span><span class="a-rt">${tags(ch, id)}</span></button>`; }).join("")}</div>
          <div data-obs-detail></div></div></details>
      <details class="a-fold"><summary><span><b>Les aspects du moment</b><small>${asp.length ? `${asp.length} aspect${asp.length > 1 ? "s" : ""} serré${asp.length > 1 ? "s" : ""} entre les planètes` : "Aucun aspect serré"}</small></span><i class="a-chev" aria-hidden="true"></i></summary>
        <div class="a-fold-b">${asp.length ? `<ul class="a-asplist">${asp.map(x => `<li>${pg(x.a)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.b)} <span>${aspSentence(x)} <i>Orbe ${fmtOrb(x.orb)}, ${x.app ? "il se forme" : "il se défait"}.</i></span></li>`).join("")}</ul>` : `<p class="help">Aucun aspect serré entre les planètes en ce moment.</p>`}</div></details>
      <div class="a-h2row"><h2 class="lsub">À venir</h2><button type="button" class="btn ghost small" data-popen="outils:calendrier">Tout le calendrier</button></div>
      <div class="a-frise" role="list">${ev.map((e, i) => `<article class="a-ev" role="listitem"><p class="a-evd"><b>${fmtD(e.date, tz, {day:"numeric"})}</b><span>${fmtD(e.date, tz, {month:"short"})}</span></p><p class="a-evt">${evTxt(e)}</p>${why("ev:" + i, "Pourquoi ?")}</article>`).join("")}</div>
      <div class="a-explore" data-obs-slot></div>
      <article class="a-card a-desc"><div><p class="eyebrow">Un jeu</p><h3>Les dés astrologiques</h3><p class="help">Une question, trois dés : une planète, un signe, une maison.</p></div><button type="button" class="btn small" data-ades>Lancer les dés</button></article>`;
    qa("[data-awhy]", root).forEach(b => b.onclick = () => { const [k, i] = b.dataset.awhy.split(":"), J = jourCtx; if(!JOUR || !J) return;
      if(k === "lune") JOUR.pourquoi("lune", {ms:J.ms, idx:J.mi.idx, ill:J.mi.ill, lon:J.ch.P.lune.lon});
      else if(k === "jour" || k === "fond") JOUR.pourquoi("transit", {x:J.dj[k], ch:J.me.ch, now:J.now});
      else if(k === "tr") JOUR.pourquoi("transit", {x:J.all[+i], ch:J.me.ch, now:J.now});
      else if(k === "ev") JOUR.pourquoi("ev", {e:J.ev[+i], tz:J.tz});
      else if(k === "lu") JOUR.pourquoi("lunaison", {l:J.lun[+i], tz:J.tz}); });
    const shb = q1("[data-ashare]", root); if(shb) shb.onclick = () => { const J = jourCtx, P = PHASES[J.mi.idx], si = C.si;
      const A = J.dj && (J.dj.pJour || J.dj.pFond), natal = J.me && J.me.ch;
      const t3 = natal ? [["Soleil", natal.P.soleil.lon], ["Lune", natal.P.lune.lon]].concat(natal.heure ? [["Ascendant", natal.asc]] : []) : [["Soleil du jour", J.ch.P.soleil.lon], ["Lune du jour", J.ch.P.lune.lon]];
      JOUR.partager({now:J.now, date:fmtD(J.now, J.tz, dateFmt), f:J.mi.f, phase:P[0], sous:`Lune en ${SG[J.ms].nom}`, titre:A ? A.titre : "Le ton du jour", phrase:A ? A.txt : MOON_TIP[J.ms],
        trio:t3.map(([k, lon]) => ({k, v:SG[si(lon)].nom, img:IMG("s" + si(lon))})), pied:natal ? (natal.heure ? "✶  Mon Soleil, ma Lune, mon Ascendant  ✶" : "✶  Mon Soleil et ma Lune  ✶") : "✶  Le ciel du jour  ✶"}); };
    const go = q1("#a-when-go", root); if(go) go.onclick = () => { const v = q1("#a-when", root).value; if(!v) return; const [d, t] = v.split("T"), [y, m, dd] = d.split("-").map(Number), [hh, mm] = t.split(":").map(Number); cielWhen = C.localToUTC(y, m, dd, hh, mm, L); renderCiel(); };
    const nw = q1("[data-anow]", root); if(nw) nw.onclick = () => { cielWhen = null; renderCiel(); };
    const wb = q1("[data-awhen]", root); if(wb) wb.onclick = () => { const o = q1(".a-other", root); o.hidden = !o.hidden; wb.setAttribute("aria-expanded", String(!o.hidden)); if(!o.hidden) q1("#a-when", root).focus(); };
    qa("[data-ecole]", root).forEach(b => b.onclick = () => { st.ecole = b.dataset.ecole; save(); const y = window.scrollY; renderCiel(); window.scrollTo(0, y); });
  }

  /* =================================================================
     THÈME : le thème natal et les dés
     ================================================================= */
  let thMode = "natal", thTab = "guide", editing = false, editId = null, desFrom = null;
  const MOIS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  function chartOf(t, sys){
    const lieu = t.lieu || {};
    const date = t.heure ? C.localToUTC(t.y, t.m, t.d, t.h, t.mi, lieu) : C.localToUTC(t.y, t.m, t.d, 12, 0, lieu);
    return C.chart({date, lat:+lieu.lat || 0, lon:+lieu.lon || 0, heure:!!t.heure, system:sys || system()});
  }
  const cityOf = inp => (window.ArcanesVilles && window.ArcanesVilles.pick(inp)) || findCity(inp.value);
  const cityOpts = () => D.CITIES.map(c => `<option value="${h(c[0])} (${h(c[1])})">`).join("");
  const findCity = v => { v = (v || "").trim().toLowerCase(); if(!v) return null;
    return D.CITIES.find(c => `${c[0]} (${c[1]})`.toLowerCase() === v) || D.CITIES.find(c => c[0].toLowerCase() === v) || D.CITIES.find(c => c[0].toLowerCase().startsWith(v)); };
  function formHTML(t){
    t = t || {};
    const L = t.lieu || {}, pad = n => String(n).padStart(2, "0");
    return `<header class="a-hero"><p class="eyebrow">Thème natal</p><h1>${t.nom ? "Modifier un thème" : "Dresser un thème"}</h1>
        <p class="a-lede">Trois questions : qui, quand, où. L'heure compte, car l'Ascendant change de signe environ toutes les deux heures. Tout est calculé sur ton appareil, rien n'est envoyé.</p></header>
      <div class="a-wiz">
      <form class="a-form a-wform" id="a-form" autocomplete="off" novalidate>
        <ol class="a-steps" aria-hidden="true"><li data-s="1"><span>1</span>Qui ?</li><li data-s="2"><span>2</span>Quand ?</li><li data-s="3"><span>3</span>Où ?</li></ol>
        <fieldset class="a-step" data-s="1"><legend>Pour qui est ce thème ?</legend>
          <label>Prénom ou nom<input name="nom" required maxlength="40" value="${h(t.nom || "")}" placeholder="Ton prénom, ou celui d'un proche"></label>
          <label class="a-check"><input type="checkbox" name="moi" ${t.moi || !st.themes.some(x => x.moi) ? "checked" : ""}> C'est mon thème (pour recevoir mes transits du jour)</label></fieldset>
        <fieldset class="a-step" data-s="2" hidden><legend>La date et l'heure de naissance</legend>
          <div class="a-row2"><label>Date de naissance<input type="date" name="date" required min="1000-01-01" max="2200-12-31" value="${t.y ? `${String(t.y).padStart(4,"0")}-${pad(t.m)}-${pad(t.d)}` : ""}"></label>
            <label>Heure<input type="time" name="heure" value="${t.heure ? `${pad(t.h)}:${pad(t.mi)}` : ""}"></label></div>
          <label class="a-check"><input type="checkbox" name="sansheure" ${t.y && !t.heure ? "checked" : ""}> Je ne connais pas l'heure (thème calculé pour midi, sans maisons ni Ascendant)</label></fieldset>
        <fieldset class="a-step" data-s="3" hidden><legend>Le lieu de naissance</legend>
          <label>Lieu de naissance<input name="ville" list="a-cities" placeholder="Commence à taper : Carquefou, Montréal, Dakar…" value="${h(L.nom || "")}"></label><datalist id="a-cities">${window.ArcanesVilles ? "" : cityOpts()}</datalist>
          <p class="help">Toutes les communes de France et d'outre-mer, et les villes du monde. Un village introuvable ? Tu pourras aussi chercher en ligne.</p>
          <details class="a-adv" ${L.manuel ? "open" : ""}><summary>Lieu absent de la liste, ou heure particulière ?</summary>
            <p class="help">Entre les coordonnées (latitude nord positive, longitude est positive). Le décalage horaire se remplit seul pour les villes de la liste, avec l'heure d'été de l'époque ; laisse-le vide sauf si tu connais le décalage exact (en minutes par rapport à l'heure universelle, par exemple 60 pour l'heure d'hiver française).</p>
            <div class="a-row3"><label>Latitude<input name="lat" inputmode="decimal" value="${L.manuel ? h(L.lat) : ""}" placeholder="48.86"></label><label>Longitude<input name="lon" inputmode="decimal" value="${L.manuel ? h(L.lon) : ""}" placeholder="2.35"></label><label>Décalage (min)<input name="off" inputmode="numeric" value="${L.off != null ? h(L.off) : ""}" placeholder="60"></label></div></details></fieldset>
        <p class="a-err" role="alert"></p>
        <div class="a-acts a-wacts"><button type="button" class="btn ghost" data-prev hidden>← Retour</button><button type="button" class="btn" data-next>Continuer</button><button type="submit" class="btn" data-go hidden>Calculer le thème</button>${st.themes.length ? `<button type="button" class="linkbtn" data-cancel>Annuler</button>` : ""}</div>
      </form>
      <figure class="a-wiz-prev" aria-hidden="true"><div class="a-wiz-wheel">${wheel(null, {small:true})}</div><figcaption class="a-wiz-cap">La roue se dessine au fil de tes réponses.</figcaption></figure></div>`;
  }
  function bindForm(root){
    const f = q1("#a-form", root), err = q1(".a-err", f), E = f.elements;
    if(window.ArcanesVilles) window.ArcanesVilles.attach(E.ville);
    const prevLieu = (st.themes.find(x => x.id === editId) || {}).lieu;
    const lieuOf = () => { const c = cityOf(E.ville); if(c) return {nom:`${c[0]} (${c[1]})`, lat:c[2], lon:c[3], tz:c[4], c};
      if(prevLieu && !prevLieu.manuel && E.ville.value.trim() === prevLieu.nom) return {...prevLieu, c:[prevLieu.nom, "", prevLieu.lat, prevLieu.lon, prevLieu.tz]}; return null; };
    const cb = E.sansheure, hr = E.heure; const sync = () => { hr.disabled = cb.checked; }; cb.onchange = () => { sync(); preview(); }; sync();
    const cancel = q1("[data-cancel]", f); if(cancel) cancel.onclick = () => { editing = false; renderTheme(); };
    let step = 1;
    const show = n => { step = n;
      qa(".a-step", f).forEach(s => s.hidden = +s.dataset.s !== n);
      qa(".a-steps li", f).forEach(li => { li.classList.toggle("on", +li.dataset.s === n); li.classList.toggle("done", +li.dataset.s < n); });
      q1("[data-prev]", f).hidden = n === 1; q1("[data-next]", f).hidden = n === 3; q1("[data-go]", f).hidden = n !== 3; err.textContent = "";
      const first = q1(`.a-step[data-s="${n}"] input`, f); if(first) first.focus({preventScroll:true}); };
    const check = n => {
      if(n === 1 && !E.nom.value.trim()){ err.textContent = "Indique un prénom ou un nom."; return false; }
      if(n === 2){ if(!E.date.value){ err.textContent = "Indique la date de naissance."; return false; }
        if(!cb.checked && !hr.value){ err.textContent = "Indique l'heure, ou coche « Je ne connais pas l'heure »."; return false; } }
      return true; };
    q1("[data-next]", f).onclick = () => { if(check(step)) show(step + 1); };
    q1("[data-prev]", f).onclick = () => show(step - 1);
    /* la roue d'aperçu, recalculée à chaque réponse */
    const prevW = q1(".a-wiz-wheel", root), cap_ = q1(".a-wiz-cap", root); let raf = 0;
    function preview(){ cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const dv = E.date.value; if(!dv){ return; }
      const [y, m, d] = dv.split("-").map(Number); if(!y || y < 1000) return;
      const lo_ = lieuOf(), c = lo_ && lo_.c, lieu = c ? {lat:c[2], lon:c[3], tz:c[4]} : st.lieu, known = !cb.checked && !!hr.value;
      const [hh, mm] = known ? hr.value.split(":").map(Number) : [12, 0];
      try{ const ch = C.chart({date:C.localToUTC(y, m, d, hh, mm, lieu), lat:+lieu.lat, lon:+lieu.lon, heure:known && !!c, system:system()});
        prevW.innerHTML = wheel(ch, {small:true, aspects:false, prefix:"pv", label:"Aperçu du thème"});
        cap_.innerHTML = `${gl(PL.soleil.gl, "pl")} Soleil en ${SG[C.si(ch.P.soleil.lon)].nom} · ${gl(PL.lune.gl, "pl")} Lune en ${SG[C.si(ch.P.lune.lon)].nom}${known && c ? ` · <b>AS</b> en ${SG[C.si(ch.asc)].nom}` : known ? " · l'Ascendant viendra avec le lieu" : ""}`;
      }catch(e){} }); }
    ["date","heure","ville"].forEach(n => E[n].addEventListener("input", preview)); preview();
    f.onsubmit = e => {
      e.preventDefault();
      if(step < 3){ if(check(step)) show(step + 1); return; }
      err.textContent = "";
      const nom = E.nom.value.trim(), dv = E.date.value, hv = E.heure.value, sans = cb.checked;
      if(!nom || !dv){ err.textContent = "Il manque le nom ou la date."; show(!nom ? 1 : 2); return; }
      if(!sans && !hv){ show(2); err.textContent = "Indique l'heure, ou coche « Je ne connais pas l'heure »."; return; }
      const [y, m, d] = dv.split("-").map(Number), [hh, mm] = sans ? [12, 0] : hv.split(":").map(Number);
      const lo_ = lieuOf(), c = lo_ && lo_.c, la = parseFloat(String(E.lat.value).replace(",", ".")), lo = parseFloat(String(E.lon.value).replace(",", ".")), off = E.off.value.trim();
      let lieu;
      if(!isNaN(la) && !isNaN(lo)){
        if(Math.abs(la) > 89.9 || Math.abs(lo) > 180){ err.textContent = "Coordonnées impossibles."; return; }
        lieu = {nom: E.ville.value.trim() || `${la.toFixed(2)}, ${lo.toFixed(2)}`, lat:la, lon:lo, tz: c ? c[4] : null, manuel:true};
        if(!c && off === ""){ err.textContent = "Pour un lieu hors de la liste, indique le décalage horaire en minutes."; return; }
      } else if(lo_){ lieu = {...lo_}; delete lieu.c; }
      else { err.textContent = "Lieu introuvable : choisis-le dans la liste qui s'ouvre quand tu tapes, cherche en ligne, ou entre ses coordonnées."; return; }
      if(off !== ""){ if(isNaN(+off) || Math.abs(+off) > 900){ err.textContent = "Décalage horaire invalide."; return; } lieu.off = +off; }
      const t = {id: editId || ("t" + Date.now().toString(36)), nom, y, m, d, h:hh, mi:mm, heure:!sans, lieu, moi:E.moi.checked};
      if(t.moi) st.themes.forEach(x => x.moi = false);
      const i = st.themes.findIndex(x => x.id === t.id); if(i >= 0) st.themes[i] = t; else st.themes.unshift(t);
      st.themes = st.themes.slice(0, 40); st.cur = t.id; save(); editing = false; editId = null; thTab = "guide"; renderTheme(); window.scrollTo({top:0});
    };
    show(1);
  }
  const EL_FORT = {feu:"Beaucoup de feu : de l'enthousiasme, de l'élan, le besoin d'agir et d'inspirer.", terre:"Beaucoup de terre : du sens pratique, de la patience, le besoin de résultats concrets.", air:"Beaucoup d'air : de la curiosité, de la sociabilité, le besoin de comprendre et d'échanger.", eau:"Beaucoup d'eau : de la sensibilité, de l'intuition, le besoin de liens profonds."};
  const EL_FAIBLE = {feu:"Peu de feu : l'élan ne va pas de soi, il se cultive par des projets qui te passionnent.", terre:"Peu de terre : le concret (argent, horaires, corps) demande un effort conscient.", air:"Peu d'air : prendre du recul et mettre des mots sur ce que tu vis peut demander du temps.", eau:"Peu d'eau : les émotions sont parfois difficiles à reconnaître, mais elles parlent quand même."};
  const MO_FORT = {cardinal:"Une dominante cardinale : tu lances plus volontiers que tu ne termines.", fixe:"Une dominante fixe : tu tiens bon, parfois au point de résister au changement.", mutable:"Une dominante mutable : tu t'adaptes vite, au risque de te disperser."};
  const bars = (obj, lab) => { const mx = Math.max(...Object.values(obj), 1); return `<div class="a-bars">${Object.entries(obj).map(([k, v]) => `<div class="a-bar"><span>${lab(k)}</span><i style="--w:${(v/mx*100).toFixed(0)}%" class="b-${k}"></i><b>${v}</b></div>`).join("")}</div>`; };
  function tSynth(ch, t){
    const sc = school(), B = C.balance(ch), dom = C.dominants(ch, sc).slice(0, 3), pat = C.patterns(ch, sc);
    const elS = Object.entries(B.el).sort((a, b) => b[1] - a[1]), moS = Object.entries(B.mo).sort((a, b) => b[1] - a[1]);
    const tfold = (k, eyebrow, titre, texte, fic, open) => `<details class="a-tfold"${open ? " open" : ""}><summary><span class="a-tcard-img"><img src="${IMG("s" + k)}" alt="" loading="lazy"></span><span class="a-tcard-body"><span class="eyebrow">${eyebrow}</span><b>${SG[k].nom}</b><span class="a-tcard-m">${SG[k].mots.slice(0, 3).join(" · ")}</span></span><i class="a-chev" aria-hidden="true"></i></summary>
      <div class="a-tfold-b"><h3>${titre}</h3><p>${texte}</p><button type="button" class="linkbtn" data-afiche="${fic}">Ouvrir la fiche</button></div></details>`;
    const trio = [["soleil", "Ton Soleil"], ["lune", "Ta Lune"]].map(([id, lab], n) => { const k = C.si(ch.P[id].lon);
      return tfold(k, `${gl(PL[id].gl, "pl")} ${lab}`, `${lab} en ${SG[k].nom}${ch.heure ? `, maison ${ROM[ch.P[id].house]}` : ""}`, sentencePlanet(ch, id), "np:" + id, n === 0); }).join("");
    let ascT = "";
    if(ch.heure){ const k = C.si(ch.asc), r = C.rulerOf(k, sc), rp = ch.P[r];
      ascT = tfold(k, `<span class="ag ang">AS</span> Ton Ascendant`, `Ton Ascendant en ${SG[k].nom}`, `Ta manière d'aborder la vie et de te présenter se vit sur le mode ${SG[k].du} : ${SG[k].style}. Son maître, ${fiche("np:" + r, PL[r].court)}, est en ${SG[C.si(rp.lon)].nom}, maison ${ROM[rp.house]} : c'est le fil conducteur du thème, et le domaine où se joue l'essentiel de ta vie, ${D.HOUSES[rp.house-1].dom}.`, "s:" + k, false); }
    else ascT = `<p class="help">Sans heure de naissance, pas d'Ascendant ni de maisons. La Lune peut aussi avoir bougé de quelques degrés dans la journée.</p>`;
    const hemi = B.hemi ? [B.hemi.est > B.hemi.ouest + 1 ? "La plupart de tes planètes sont à l'est (à gauche de la roue) : tu prends l'initiative, tu te construis par toi-même." : B.hemi.ouest > B.hemi.est + 1 ? "La plupart de tes planètes sont à l'ouest (à droite de la roue) : tu te construis beaucoup à travers les autres et les circonstances." : "",
      B.hemi.haut > B.hemi.bas + 1 ? "Elles sont surtout au-dessus de l'horizon : une vie tournée vers le monde, le métier, le regard des autres." : B.hemi.bas > B.hemi.haut + 1 ? "Elles sont surtout sous l'horizon : une vie tournée vers l'intime, la famille, le monde intérieur." : ""].filter(Boolean).join(" ") : "";
    const patT = pat.map(p => p.type === "stellium" ? `<li><b>Un stellium en ${SG[p.sign].nom}</b> (${p.ids.map(pn).join(", ")}) : plusieurs planètes réunies, un centre de gravité du thème. Les qualités ${SG[p.sign].du} y sont très présentes.</li>`
      : p.type === "grandtrigone" ? `<li><b>Un grand trigone</b> (${p.ids.map(pn).join(", ")}) : trois planètes en harmonie, un talent naturel, une aisance… qui peut aussi endormir.</li>`
      : `<li><b>Un T-carré</b> : ${pn(p.ids[0])} et ${pn(p.ids[1])} s'opposent, ${pn(p.apex)} les relie en carré. Une tension motrice : c'est souvent par ${fs(p.apex)} que se joue la solution.</li>`);
    const secte = ch.heure ? (ch.diurne ? "Thème <b>diurne</b> : la naissance a eu lieu de jour, le Soleil au-dessus de l'horizon. Pour la tradition, le Soleil mène le thème ; Jupiter est le bénéfique le plus favorable, Saturne le maléfique le mieux tempéré, et Mars le plus délicat."
      : "Thème <b>nocturne</b> : la naissance a eu lieu de nuit, le Soleil sous l'horizon. Pour la tradition, la Lune mène le thème ; Vénus est le bénéfique le plus favorable, Mars le maléfique le mieux tempéré, et Saturne le plus délicat.") : "";
    return `<h2 class="lsub">Soleil, Lune, Ascendant</h2><div class="a-tfolds">${trio}${ascT}</div>
      <h2 class="lsub">La répartition</h2><div class="a-two"><div><h4 class="a-h4">Les éléments</h4>${bars(B.el, k => ELN[k])}</div><div><h4 class="a-h4">Les modes</h4>${bars(B.mo, k => k)}</div></div>
      <p>${EL_FORT[elS[0][0]]} ${elS[3][1] <= 1 ? EL_FAIBLE[elS[3][0]] : ""} ${MO_FORT[moS[0][0]]}</p>${hemi ? `<p>${hemi}</p>` : ""}
      <p class="help">On compte chaque planète une fois, le Soleil, la Lune et l'Ascendant deux fois, le Milieu du Ciel une fois.</p>
      <h2 class="lsub">Les planètes dominantes</h2><ol class="a-dom">${dom.map(d => `<li>${pg(d.id)} ${fiche("np:" + d.id, PL[d.id].court)}${d.why.length ? ` <span class="help">${d.why.join(", ")}</span>` : ""}</li>`).join("")}</ol>
      ${patT.length ? `<h2 class="lsub">Les figures</h2><ul class="a-ul">${patT.join("")}</ul>` : ""}
      ${secte ? `<h2 class="lsub">Jour ou nuit</h2><p>${secte}</p>` : ""}`;
  }
  function tPlanets(ch){
    const ids = school() === "tradition" ? [...C.TRAD7, "noeudn", "noeuds"] : [...C.MOD10, "noeudn", "noeuds"];
    return `<div class="a-plist">${ids.map(id => `<button type="button" class="a-pcard" data-afiche="np:${id}">${gl(PL[id].gl, "big pl")}<div><h3>${PL[id].court} en ${SG[C.si(ch.P[id].lon)].nom}${ch.heure ? ` · maison ${ROM[ch.P[id].house]}` : ""}</h3><p class="a-pos">${fmtPos(ch.P[id].lon)} ${tags(ch, id)}</p><p>${sentencePlanet(ch, id)}</p></div></button>`).join("")}</div>
      ${school() === "tradition" ? `<p class="help">Lecture traditionnelle : Uranus, Neptune et Pluton ne sont pas pris en compte. Passe en lecture moderne pour les voir.</p>` : ""}`;
  }
  function tHouses(ch){
    if(!ch.heure) return `<p class="help">Sans heure de naissance, les maisons ne peuvent pas être calculées.</p>`;
    const sc = school(), ids = sc === "tradition" ? C.TRAD7 : C.MOD10;
    return `<p class="help">Système : ${SYS_NOM[ch.system]}${ch.fallback ? " (repli automatique : latitude trop haute pour " + SYS_NOM[ch.fallback] + ")" : ""}. Le maître d'une maison est la planète qui gouverne le signe de sa cuspide${sc === "moderne" ? " (maîtres modernes)" : " (maîtres traditionnels)"}.</p>
      <div class="a-hlist">${ch.cusps.map((c, i) => { const n = i + 1, H = D.HOUSES[i], k = C.si(c), r = C.rulerOf(k, sc), inH = ids.filter(id => ch.P[id].house === n);
        return `<article class="a-hcard"><button type="button" class="a-hnum" data-afiche="h:${n}">${ROM[n]}</button><div><h3>${H.nom} <span class="help">· ${H.type}</span></h3>
          <p class="a-pos">Cuspide ${fmtPos(c)} · maître ${fiche("np:" + r, PL[r].court)} en maison ${ROM[ch.P[r].house]}</p>
          <p>${cap(H.dom.replace(/^dans /, ""))}.${inH.length ? ` Planète${inH.length > 1 ? "s" : ""} présente${inH.length > 1 ? "s" : ""} : ${inH.map(id => fiche("np:" + id, PL[id].court)).join(", ")}.` : ""} Le maître de la ${ROM[n]} en maison ${ROM[ch.P[r].house]} relie ce domaine ${D.HOUSES[ch.P[r].house - 1].dom.replace(/^dans /, "à ")}.</p></div></article>`; }).join("")}</div>`;
  }
  function tAspects(ch){
    const sc = school(), asp = C.aspects(ch, sc), pts = C.pointsFor(ch, sc).map(p => p.id);
    const cell = (a, b) => { const x = asp.find(z => (z.a === a && z.b === b) || (z.a === b && z.b === a)); return x ? `<td class="${ASP[x.asp].cls}" title="${ASP[x.asp].nom} ${fmtOrb(x.orb)}">${ASP[x.asp].gl}${T}</td>` : `<td></td>`; };
    return `<div class="a-grid-wrap"><table class="a-grid"><tbody>${pts.map((a, i) => `<tr><th>${pg(a)}</th>${pts.slice(0, i).map(b => cell(a, b)).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="help">${sc === "tradition" ? "Tradition : les cinq aspects de Ptolémée, formés entre signes, avec les moitiés d'orbes d'al-Biruni." : "Moderne : orbes fixes (8° pour la conjonction et l'opposition, 7° pour le carré et le trigone, 4° pour le sextile), un peu plus larges pour les luminaires, et le quinconce."} ${fiche("a:trigone", "Les aspects, en détail")}</p>
      <ul class="a-asplist">${asp.map(x => `<li>${pg(x.a)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.b)} <span>${aspSentence(x)} <i>Orbe ${fmtOrb(x.orb)}, ${x.app ? "appliquant" : "séparant"}.</i></span></li>`).join("")}</ul>`;
  }
  function tTrad(ch){
    const L = C.lots(ch), pr = C.profection(ch), rec = C.receptions(ch), D7 = C.TRAD7.map(id => ({id, ...C.dignities(id, ch.P[id].lon, ch.diurne)}));
    const best = [...D7].sort((a, b) => b.score - a.score)[0], worst = [...D7].sort((a, b) => a.score - b.score)[0];
    const joies = C.TRAD7.filter(id => ch.heure && PL[id].joie === ch.P[id].house);
    const comb = C.TRAD7.map(id => [id, C.solarState(id, ch)]).filter(x => x[1]);
    let asc = "";
    if(ch.heure){ const k = C.si(ch.asc), r = SG[k].maitre, d = D7.find(x => x.id === r), p = ch.P[r];
      asc = `<p>Le <b>maître de l'Ascendant</b> représente la personne. Ici, l'Ascendant est en ${SG[k].nom} : son maître est ${fiche("np:" + r, PL[r].court)}, placé en ${SG[C.si(p.lon)].nom}, maison ${ROM[p.house]}${d.list.length ? `, ${d.list.map(x => DIGN_LAB[x]).join(", ")}` : ", pérégrin"} (${d.score > 0 ? "+" : ""}${d.score}). ${d.score >= 4 ? "Bien digne : il tient ses promesses." : d.score <= -4 ? "Débile : il doit composer, et ses réussites passent par l'effort ou par l'aide des planètes qui le reçoivent." : "Ni très fort ni très faible : son état dépend surtout de sa maison et de ses aspects."}</p>`; }
    return `${ch.heure ? `<p>${ch.diurne ? "Thème <b>diurne</b>. Planètes de secte : le Soleil, Jupiter, Saturne. Le maléfique contraire à la secte, Mars, est le plus délicat." : "Thème <b>nocturne</b>. Planètes de secte : la Lune, Vénus, Mars. Le maléfique contraire à la secte, Saturne, est le plus délicat."}</p>` : `<p class="help">Sans heure, on ne peut pas savoir si le thème est diurne ou nocturne : les triplicités sont comptées comme de jour.</p>`}
      ${asc}
      <h2 class="lsub">Les dignités essentielles</h2>
      <div class="a-grid-wrap"><table class="a-dtab"><thead><tr><th></th><th>Position</th><th>Dom.</th><th>Exalt.</th><th>Trip.</th><th>Terme</th><th>Face</th><th>Débilité</th><th>Score</th></tr></thead><tbody>
        ${D7.map(d => `<tr><th>${pg(d.id)} ${PL[d.id].court}</th><td>${fmtPos(ch.P[d.id].lon)}</td>${["domicile","exaltation","triplicite","terme","face"].map(x => `<td>${d.list.includes(x) ? "●" : ""}</td>`).join("")}<td>${d.list.filter(x => ["exil","chute"].includes(x)).join(", ") || (d.peregrine ? "pérégrine" : "")}</td><td class="${d.score > 0 ? "pos" : d.score < 0 ? "neg" : ""}">${d.score > 0 ? "+" : ""}${d.score}</td></tr>`).join("")}</tbody></table></div>
      <p class="help">Barème de William Lilly : domicile 5, exaltation 4, triplicité 3, terme 2, face 1 ; exil −5, chute −4, pérégrine −5. Termes égyptiens, faces chaldéennes, triplicités de Dorothée.</p>
      <p>La planète la plus digne est ${fiche("np:" + best.id, PL[best.id].court)} ; la plus débile, ${fiche("np:" + worst.id, PL[worst.id].court)}.${joies.length ? ` ${joies.map(pn).join(" et ")} ${joies.length > 1 ? "sont" : "est"} dans ${joies.length > 1 ? "leur" : "sa"} joie.` : ""}${comb.length ? ` Près du Soleil : ${comb.map(([id, s]) => `${PL[id].court} (${s})`).join(", ")}.` : ""}</p>
      <h2 class="lsub">Réceptions mutuelles</h2>${rec.length ? `<ul class="a-ul">${rec.map(([a, b]) => `<li>${pg(a)} ${PL[a].court} et ${pg(b)} ${PL[b].court} sont chacun dans le domicile de l'autre : ils s'entraident, et peuvent même échanger leurs places.</li>`).join("")}</ul>` : `<p class="help">Aucune réception mutuelle par domicile.</p>`}
      ${L ? `<h2 class="lsub">Les parts</h2><ul class="a-ul"><li><b>Part de Fortune</b> à ${fmtPos(L.fortune)}, maison ${ROM[C.houseOf(L.fortune, ch.cusps)]} : ce qui arrive sans qu'on le choisisse, le corps, les biens qui viennent.</li><li><b>Part de l'Esprit</b> à ${fmtPos(L.esprit)}, maison ${ROM[C.houseOf(L.esprit, ch.cusps)]} : ce que l'on choisit et entreprend.</li></ul>` : ""}
      ${pr ? `<h2 class="lsub">La profection de l'année</h2><p>À ${pr.age} ans, l'Ascendant a avancé de ${pr.age} signe${pr.age > 1 ? "s" : ""} : l'année active la <b>maison ${ROM[pr.house]}</b> (${D.HOUSES[pr.house-1].nom.toLowerCase()}), en ${SG[pr.sign].nom}. Le <b>maître de l'année</b> est ${fiche("np:" + pr.lord, PL[pr.lord].court)} : ses transits comptent particulièrement jusqu'au prochain anniversaire. Les thèmes de l'année : ${D.HOUSES[pr.house-1].dom.replace(/^dans /, "")}.</p>` : ""}`;
  }
  let tempsCache = {};
  /* deux thèmes côte à côte : les aspects que les planètes de l'un forment avec celles de l'autre */
  let compId = null;
  function tComp(ch, t){
    const autres = st.themes.filter(x => x.id !== t.id); if(!autres.length) return "";
    const o = autres.find(x => x.id === compId) || autres.find(x => x.moi) || autres[0], ch2 = chartOf(o), ids = C.TRAD7;
    const DEF = [["conj", 0, 7], ["opp", 180, 6], ["trigone", 120, 6], ["carre", 90, 6], ["sext", 60, 4]], lum = id => id === "soleil" || id === "lune" ? 1.5 : 0;
    const L = [];
    ids.forEach(a => ids.forEach(b => { const d = C.sep(ch.P[a].lon, ch2.P[b].lon); DEF.forEach(([k, ang, orb]) => { const e = Math.abs(d - ang), mx = orb + Math.max(lum(a), lum(b)); if(e <= mx) L.push({a, b, k, e, w:(1 - e/mx)*(1 + (lum(a) + lum(b))/3)}); }); }));
    L.sort((x, y) => y.w - x.w);
    const dur = k => k === "carre" || k === "opp", doux = L.filter(x => !dur(x.k)).slice(0, 5), frotte = L.filter(x => dur(x.k)).slice(0, 5);
    const li = x => `<li>${pg(x.a)}${gl(ASP[x.k].gl, "asp " + ASP[x.k].cls)}${pg(x.b)}<span><b>${PL[x.a].court} de ${h(t.nom)} ${ASP[x.k].nom.toLowerCase()} ${PL[x.b].court} de ${h(o.nom)}</b> : ${ASP[x.k].sens}. Entre ${PL[x.a].mots[0]} et ${PL[x.b].mots[0]}. <i>Écart ${fmtOrb(x.e)}.</i></span></li>`;
    const el = c => { const B = C.balance(c).el; return Object.entries(B).sort((x, y) => y[1] - x[1])[0][0]; }, e1 = el(ch), e2 = el(ch2), EN = {feu:"le Feu", terre:"la Terre", air:"l'Air", eau:"l'Eau"};
    return `<div class="a-comp"><p class="a-lede">Deux thèmes posés l'un sur l'autre. On regarde les angles que les planètes de l'un forment avec celles de l'autre : c'est ce que les astrologues appellent une synastrie.</p>
      <div class="a-comp-pick" role="group" aria-label="Comparer avec"><span class="eyebrow">Comparer ${h(t.nom)} avec</span>${autres.map(x => `<button type="button" class="chip small${x.id === o.id ? " on" : ""}" data-comp="${x.id}">${x.moi ? "★ " : ""}${h(x.nom)}</button>`).join("")}</div>
      <div class="a-comp-w"><figure>${wheel(ch, {small:true, aspects:false, prefix:"c1", label:"Thème de " + t.nom})}<figcaption><b>${h(t.nom)}</b><span>${EN[e1] || e1} domine</span></figcaption></figure>
        <figure>${wheel(ch2, {small:true, aspects:false, prefix:"c2", label:"Thème de " + o.nom})}<figcaption><b>${h(o.nom)}</b><span>${EN[e2] || e2} domine</span></figcaption></figure></div>
      <div class="a-comp-g"><section class="a-card"><p class="eyebrow">Ce qui rapproche</p><h3>${doux.length ? "Les ententes" : "Peu d'aspects doux"}</h3>${doux.length ? `<ul class="a-toi-l">${doux.map(li).join("")}</ul>` : `<p class="help">Aucun aspect harmonieux serré entre les sept planètes classiques.</p>`}</section>
        <section class="a-card"><p class="eyebrow">Ce qui frotte</p><h3>${frotte.length ? "Les tensions" : "Peu de tensions"}</h3>${frotte.length ? `<ul class="a-toi-l">${frotte.map(li).join("")}</ul>` : `<p class="help">Aucun carré ni opposition serrés entre les sept planètes classiques.</p>`}</section></div>
      <p class="help">${e1 === e2 ? `Vous avez le même élément dominant : ${EN[e1] || e1}. On se comprend vite, on peut aussi s'y enfermer à deux.` : `Vos éléments dominants diffèrent : ${EN[e1] || e1} pour ${h(t.nom)}, ${EN[e2] || e2} pour ${h(o.nom)}.`} Seules les sept planètes classiques sont comparées${t.heure && o.heure ? "" : ", sans les maisons quand une heure de naissance manque"}.</p>
      <p class="help">Ce n'est pas un verdict. Une tension peut rendre une relation vivante, une entente peut l'endormir : la synastrie décrit un climat, elle ne dit pas si deux personnes iront bien ensemble. Comparer les thèmes de deux époux se lit déjà chez Ptolémée, au IIe siècle.</p></div>`;
  }
  let tempsTr = null;
  document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-twhy]"); if(!b || !JOUR || !tempsTr) return; JOUR.pourquoi("transit", {x:tempsTr.tr[+b.dataset.twhy], ch:tempsTr.ch, now:tempsTr.now}); });
  function tTemps(ch, t){
    const now = new Date(), sc = school(), tz = (t.lieu && t.lieu.tz) || undefined;
    const sr = C.solarReturn(ch, new Date(now.getTime() - 2*86400000));
    const age = (now - ch.date)/31556952000, prog = C.planets(new Date(ch.date.getTime() + age*86400000));
    const key = t.id + ":" + now.toDateString();
    if(!tempsCache[key]) tempsCache[key] = {j:C.nextReturn("jupiter", ch.P.jupiter.lon, now, 4600), s:C.nextReturn("saturne", ch.P.saturne.lon, now, 11000)};
    const R = tempsCache[key], tr = C.transits(ch, now, sc).slice(0, 10), pr = C.profection(ch);
    tempsTr = {tr, ch, now};
    return `<h2 class="lsub">Les transits du jour</h2>${tr.length ? `<ul class="a-asplist">${tr.map((x, i) => `<li>${pg(x.t)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.n)} <span><b>${JOUR ? h(JOUR.titre(x)) : `${PL[x.t].court} ${ASP[x.asp].nom.toLowerCase()} ${ton(x.n)}`}</b> : ${JOUR ? h(JOUR.lire(x, !["lune","soleil","mercure","venus","mars"].includes(x.t), now).txt) : ASP[x.asp].sens + "."} <i>Orbe ${fmtOrb(x.orb)}.</i> ${JOUR ? `<button type="button" class="a-why" data-twhy="${i}">Pourquoi ?</button>` : ""}</span></li>`).join("")}</ul>` : `<p class="help">Aucun transit serré aujourd'hui.</p>`}
      <h2 class="lsub">Les rendez-vous</h2><ul class="a-ul">
        ${sr ? `<li><b>Révolution solaire</b> : le Soleil revient à sa place de naissance le ${fmtD(sr, tz, dateFmt)} à ${fmtD(sr, tz, hm)}${tz ? " (heure du lieu de naissance)" : ""}. Le thème dressé pour cet instant décrit l'année qui commence.</li>` : ""}
        ${pr ? `<li><b>Profection</b> : jusqu'à ton prochain anniversaire, maison ${ROM[pr.house]} et maître de l'année ${PL[pr.lord].court}.</li>` : ""}
        ${R.j ? `<li><b>Prochain retour de Jupiter</b> : ${fmtD(R.j, tz, dateFmt)}. Une nouvelle phase de croissance, tous les douze ans.</li>` : ""}
        ${R.s ? `<li><b>Prochain retour de Saturne</b> : ${fmtD(R.s, tz, dateFmt)}. Un bilan et une maturité nouvelle, tous les vingt-neuf ans et demi.</li>` : ""}</ul>
      <h2 class="lsub">Les progressions secondaires</h2><p>Un jour après la naissance pour une année de vie. Aujourd'hui, ton <b>Soleil progressé</b> est à ${fmtPos(prog.soleil.lon)} et ta <b>Lune progressée</b> à ${fmtPos(prog.lune.lon)}${ch.heure ? `, en maison ${ROM[C.houseOf(prog.lune.lon, ch.cusps)]}` : ""}. La Lune progressée change de signe tous les deux ans et demi environ : elle décrit le climat affectif de la période.</p>
      <p class="help">Pour comprendre ces techniques : ${fiche("l:temps", "le module « Le temps » de L'école")}.</p>`;
  }
  const LECT = window.AstroLecture ? window.AstroLecture({C, D, SG, PL, ROM, ASP, h, cap, gl, pg, sgl, fiche, fmtPos, fmtOrb, fmtD, school, st:() => st, save, IMG, wheel, sysNom:ch => SYS_NOM[ch.system] || ch.system}) : null;
  const THT = (LECT ? [["guide","Lecture guidée"]] : []).concat([["synth","Synthèse"],["planetes","Planètes"],["maisons","Maisons"],["aspects","Aspects"],["trad","Tradition"],["temps","Le temps"]], LECT ? [["annee","Mon année"]] : []);
  function themeResult(t){
    const ch = chartOf(t), sc = school(), tz = t.lieu && t.lieu.tz;
    lastCharts.natal = {ch, nom:t.nom};
    const born = `${t.d} ${MOIS[t.m-1]} ${t.y}${t.heure ? ` à ${String(t.h).padStart(2,"0")} h ${String(t.mi).padStart(2,"0")}` : ", heure inconnue"}`;
    if(!LECT && (thTab === "guide" || thTab === "annee")) thTab = "synth";
    const body = thTab === "guide" ? LECT.guide(ch, t) : thTab === "annee" ? LECT.annee(ch, t) : thTab === "planetes" ? tPlanets(ch) : thTab === "maisons" ? (LECT && LECT.maisons ? LECT.maisons(ch) : tHouses(ch)) : thTab === "aspects" ? tAspects(ch) : thTab === "trad" ? tTrad(ch) : thTab === "temps" ? tTemps(ch, t) : thTab === "comp" && st.themes.length > 1 ? tComp(ch, t) : tSynth(ch, t) + (LECT && LECT.lames ? `<h2 class="lsub">Tes lames de tarot</h2>${LECT.lames(ch, t, {compact:true})}` : "");
    return `<div class="a-thhead"><div><p class="eyebrow">Thème natal${t.moi ? " · le tien" : ""}</p><h1>${h(t.nom)}</h1><p class="help">${born} · ${h(t.lieu.nom)}</p></div>
        <div class="a-thtools"><div class="a-seg" role="group" aria-label="École de lecture"><button type="button" data-ecole="tradition" class="${sc === "tradition" ? "on" : ""}">Tradition</button><button type="button" data-ecole="moderne" class="${sc === "moderne" ? "on" : ""}">Moderne</button></div>
          <button type="button" class="btn ghost small" data-th-edit>Modifier</button>${LECT ? `<button type="button" class="btn ghost small" data-th-print>Imprimer</button>` : ""}<button type="button" class="btn ghost small" data-popen="outils:ephem">Outils</button></div></div>
      <figure class="a-card a-wheelcard a-thwheel">${wheel(ch, {prefix:"np", label:"Thème de " + t.nom})}<figcaption class="help">Touche une planète pour lire sa fiche. ${ch.heure ? `Maisons ${SYS_NOM[ch.system]}.` : "Sans heure : roue sans maisons, le 0° Bélier à gauche."}</figcaption></figure>
      <nav class="subtabs a-tabs" aria-label="Les lectures du thème">${THT.concat(st.themes.length > 1 ? [["comp","À deux"]] : []).map(([k, n]) => `<button type="button" class="subtab${thTab === k ? " on" : ""}" data-thtab="${k}">${n}</button>`).join("")}</nav>
      <div class="a-thbody">${body}</div>
      <div class="a-acts a-thacts">${t.moi ? "" : `<button type="button" class="btn ghost small" data-th-moi>C'est mon thème</button>`}<button type="button" class="linkbtn danger" data-th-del>Supprimer ce thème</button></div>`;
  }
  function desHTML(){
    const last = st.des[0];
    return `<p class="crumb"><button type="button" class="linkbtn" data-desback>← Retour</button></p><header class="sec-head"><p class="eyebrow">Un jeu de divination</p><h1>Les dés astrologiques</h1>
        <p>Trois dés à douze faces. Le premier tire une planète : <i>de quoi</i> il s'agit. Le deuxième un signe : <i>comment</i>. Le troisième une maison : <i>où</i>. C'est la grammaire de l'astrologie, en trois gestes. Pose une question précise, puis lance.</p></header>
      <div class="a-des"><label class="a-q">Ta question<input id="a-dq" maxlength="140" placeholder="Que dois-je comprendre de cette situation ?"></label>
        <button type="button" class="btn big" id="a-roll">Lancer les dés</button>
        <div class="a-dice" aria-live="polite">${[0,1,2].map(i => `<div class="a-die" data-i="${i}"><span>?</span></div>`).join("")}</div>
        <div id="a-dres">${last ? desReading(last) : ""}</div></div>
      ${st.des.length > 1 ? `<h2 class="lsub">Tes derniers lancers</h2><ul class="a-ul a-dhist">${st.des.slice(1, 8).map(r => `<li><span class="help">${fmtD(new Date(r.t), undefined, {day:"numeric", month:"short"})}</span> ${gl(PL[r.p].gl, "pl")}${gl(SG[r.s].gl, "el-" + SG[r.s].el)}<b>${ROM[r.h]}</b> ${h(r.q || "sans question")}</li>`).join("")}</ul>` : ""}`;
  }
  const DIE_P = ["soleil","lune","mercure","venus","mars","jupiter","saturne","uranus","neptune","pluton","noeudn","noeuds"];
  function desReading(r){
    const P = PL[r.p], S = SG[r.s], H = D.HOUSES[r.h - 1];
    return `<article class="a-card a-dread">${r.q ? `<p class="eyebrow">« ${h(r.q)} »</p>` : ""}<h2>${P.court} · ${S.nom} · maison ${ROM[r.h]}</h2>
      <p class="lead">Il s'agit de ${P.fn}. Cela demande d'agir ${S.style}, ${H.dom}.</p>
      <ul class="a-ul"><li><b>${fiche("p:" + r.p, P.court)}</b> : ${P.mots.join(", ")}.</li><li><b>${fiche("s:" + r.s, S.nom)}</b> : ${S.mots.join(", ")}.</li><li><b>${fiche("h:" + r.h, "Maison " + ROM[r.h])}</b>, ${H.nom.toLowerCase()} : ${H.mots.join(", ")}.</li></ul>
      <p class="help">Lis la phrase à voix haute, puis demande-toi ce qu'elle éclaire dans ta question. Les dés ne prédisent pas : ils proposent un angle.</p></article>`;
  }
  function bindDes(root){
    const b = q1("#a-roll", root); if(!b) return;
    b.onclick = () => {
      const r = {p:pick(DIE_P), s:Math.floor(Math.random()*12), h:1 + Math.floor(Math.random()*12), q:q1("#a-dq", root).value.trim(), t:Date.now()};
      const dice = qa(".a-die", root); b.disabled = true;
      dice.forEach(d => d.classList.add("roll"));
      if(typeof sfx === "function") try{ sfx("flip"); }catch(e){}
      let n = 0; const spin = setInterval(() => { dice[0].innerHTML = `<span>${gl(PL[pick(DIE_P)].gl, "pl")}</span>`; dice[1].innerHTML = `<span>${gl(pick(SG).gl)}</span>`; dice[2].innerHTML = `<span>${ROM[1 + Math.floor(Math.random()*12)]}</span>`; if(++n > 9){ clearInterval(spin);
        dice[0].innerHTML = `<span>${gl(PL[r.p].gl, "pl")}</span><small>${PL[r.p].court}</small>`; dice[1].innerHTML = `<span>${sgl(r.s)}</span><small>${SG[r.s].nom}</small>`; dice[2].innerHTML = `<span>${ROM[r.h]}</span><small>maison</small>`;
        dice.forEach(d => d.classList.remove("roll")); st.des.unshift(r); st.des = st.des.slice(0, 30); save(); q1("#a-dres", root).innerHTML = desReading(r); b.disabled = false; b.textContent = "Relancer"; } }, 90);
    };
  }
  function renderTheme(){
    const root = q1("#v-a-theme");
    const tabs = "";
    if(thMode === "des"){ root.innerHTML = desHTML(); bindDes(root); q1("[data-desback]", root).onclick = () => { thMode = "natal"; aView(desFrom || "ciel"); }; }
    else {
      const t = st.themes.find(x => x.id === st.cur) || st.themes[0];
      if(!t || editing){ root.innerHTML = tabs + formHTML(editing && editId ? st.themes.find(x => x.id === editId) : null); bindForm(root); }
      else {
        st.cur = t.id;
        const chips = `<div class="a-chips">${st.themes.map(x => `<button type="button" class="chip${x.id === t.id ? " on" : ""}" data-thid="${x.id}">${x.moi ? "★ " : ""}${h(x.nom)}</button>`).join("")}<button type="button" class="chip a-new" data-th-new>+ Nouveau thème</button></div>`;
        root.innerHTML = tabs + chips + themeResult(t);
        qa("[data-thid]", root).forEach(b => b.onclick = () => { st.cur = b.dataset.thid; save(); renderTheme(); });
        q1("[data-th-new]", root).onclick = () => { editing = true; editId = null; renderTheme(); };
        q1("[data-th-edit]", root).onclick = () => { editing = true; editId = t.id; renderTheme(); };
        const mo = q1("[data-th-moi]", root); if(mo) mo.onclick = () => { st.themes.forEach(x => x.moi = x.id === t.id); save(); renderTheme(); };
        const del = q1("[data-th-del]", root); del.onclick = () => { const w = del.parentElement; w.innerHTML = `<span class="confirm">Supprimer le thème de ${h(t.nom)} ?</span><button type="button" class="linkbtn danger" data-yes>Oui</button><button type="button" class="linkbtn" data-no>Non</button>`;
          q1("[data-yes]", w).onclick = () => { st.themes = st.themes.filter(x => x.id !== t.id); st.cur = st.themes[0] ? st.themes[0].id : null; save(); renderTheme(); }; q1("[data-no]", w).onclick = renderTheme; };
        qa("[data-comp]", root).forEach(b => b.onclick = () => { compId = b.dataset.comp; renderTheme(); });
        qa("[data-thtab]", root).forEach(b => b.onclick = () => { thTab = b.dataset.thtab; renderTheme(); const tb = q1(".a-tabs", root); if(tb){ if(tb.getBoundingClientRect().top < 4) window.scrollTo(0, window.scrollY + q1(".a-thbody", root).getBoundingClientRect().top - tb.offsetHeight - 8); const on = q1(".subtab.on", tb); if(on) tb.scrollLeft = on.offsetLeft - 16; } });
        qa("[data-ecole]", root).forEach(b => b.onclick = () => { st.ecole = b.dataset.ecole; save(); const y = window.scrollY; renderTheme(); window.scrollTo(0, y); });
        const tb0 = q1(".a-tabs", root), on0 = tb0 && q1(".subtab.on", tb0); if(on0) tb0.scrollLeft = on0.offsetLeft - 16;
        if(LECT && lastCharts.natal){ const ch0 = lastCharts.natal.ch; LECT.bind(root, ch0, t, thTab); const pb = q1("[data-th-print]", root); if(pb) pb.onclick = () => LECT.print(ch0, t); }
      }
    }
    qa("[data-thmode]", root).forEach(b => b.onclick = () => { thMode = b.dataset.thmode; renderTheme(); });
  }

  /* =================================================================
     APPRENDRE
     ================================================================= */
  let lv = {mod:null, lec:0, fiches:null};
  const W = {
    zodiaque: () => `<figure class="a-fig">${wheel(null, {small:true})}<figcaption>Les douze signes, comptés depuis l'équinoxe de printemps (0° Bélier, à gauche). Couleurs : feu, terre, air, eau.</figcaption></figure>`,
    maisons: () => `<figure class="a-fig">${wheel(null, {houses:true, small:true})}<figcaption>Les douze maisons, l'Ascendant à gauche, le Milieu du Ciel en haut. Les angulaires sont en gras.</figcaption></figure>`,
    retro: () => `<figure class="a-fig"><svg class="a-retro" viewBox="0 0 520 170" role="img" aria-label="Boucle de rétrogradation"><path d="M20 120 C120 112 180 100 230 80 C285 58 300 40 270 40 C240 40 250 70 300 92 C350 112 420 120 500 118" class="r-path"/><circle cx="268" cy="40" r="5"/><circle cx="246" cy="66" r="5"/><text x="300" y="30">station rétrograde</text><text x="150" y="60">station directe</text><text x="20" y="150">sens du zodiaque →</text></svg><figcaption>Vue de la Terre, la planète avance, s'arrête, recule, s'arrête encore puis repart : une boucle sur le ciel.</figcaption></figure>`,
    elements: () => `<div class="a-grid-wrap"><table class="a-etab"><thead><tr><th></th>${Object.keys(D.MODES).map(m => `<th>${D.MODES[m].nom}</th>`).join("")}</tr></thead><tbody>${Object.entries(D.ELEMENTS).map(([k, E]) => `<tr><th class="el-${k}">${E.nom}<br><small>${E.qual}</small></th>${Object.keys(D.MODES).map(m => { const s = SG.findIndex(x => x.el === k && x.mode === m); return `<td>${fiche("s:" + s, `${gl(SG[s].gl, "el-" + k)} ${SG[s].nom}`)}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`,
    aspects: () => `<figure class="a-fig"><svg class="a-aspfig" viewBox="-130 -130 260 260" role="img" aria-label="Les aspects"><circle r="100" class="c"/>${[[0,"conj"],[60,"doux"],[90,"dur"],[120,"doux"],[180,"dur"]].map(([a, c]) => { const x = 100*Math.cos((180 - a)*rad), y = -100*Math.sin((180 - a)*rad); return `<line x1="-100" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="${c}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" class="${c}"/><text x="${(x*1.18).toFixed(1)}" y="${(y*1.18).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${a}°</text>`; }).join("")}<circle cx="-100" cy="0" r="7" class="o"/></svg><figcaption>Depuis une planète (à gauche) : sextile 60°, carré 90°, trigone 120°, opposition 180°. En bleu les aspects harmonieux, en rouge les tendus.</figcaption></figure>`,
    thema: () => `<div class="a-grid-wrap"><table class="a-dtab"><thead><tr><th></th><th>Domicile</th><th>Exaltation</th><th>Exil</th><th>Chute</th></tr></thead><tbody>${C.TRAD7.map(id => { const dom = SG.filter(s => s.maitre === id), ex = SG.find(s => s.exalt && s.exalt[0] === id); return `<tr><th>${pg(id)} ${PL[id].court}</th><td>${dom.map(s => s.nom).join(", ")}</td><td>${ex ? `${ex.nom} ${ex.exalt[1]}°` : ""}</td><td>${dom.map(s => SG[(SG.indexOf(s)+6)%12].nom).join(", ")}</td><td>${ex ? SG[(SG.indexOf(ex)+6)%12].nom : ""}</td></tr>`; }).join("")}</tbody></table></div>`,
    termes: () => `<div class="a-grid-wrap"><table class="a-dtab a-terms"><thead><tr><th></th><th colspan="5">Termes égyptiens (jusqu'au degré)</th><th colspan="3">Faces</th></tr></thead><tbody>${SG.map((s, k) => `<tr><th>${sgl(k)} ${s.nom}</th>${D.TERMS[s.id].map(([p, u]) => `<td>${gl(PL[p].gl, "pl")}${u}</td>`).join("")}${[0,1,2].map(i => `<td>${gl(PL[C.faceOf(30*k + 10*i + 1)].gl, "pl")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
  };
  const lessonKey = (m, i) => `${m}:${i}`;
  const COVER = {bases:["c_bases","Cellarius, Harmonia Macrocosmica (1661) : le système de Ptolémée, la Terre au centre"], planetes:["c_planetes","Cellarius, Harmonia Macrocosmica (1661) : le système de Copernic"],
    signes:["c_signes","Cellarius, Harmonia Macrocosmica (1661) : le planisphère d'Aratos et ses constellations"], maisons:["c_maisons","Cellarius, Harmonia Macrocosmica (1661) : le planisphère de Ptolémée"],
    aspects:["c_aspects","Cellarius, Harmonia Macrocosmica (1661) : le planisphère de Tycho Brahe"], dignites:["p_titre","Les sept planètes et les jours de la semaine, gravure de 1539 (Rijksmuseum)"],
    lire:["c_lire","Cellarius, Harmonia Macrocosmica (1661) : l'hémisphère céleste boréal"], temps:["c_temps","Kepler, De Stella Nova (1606) : le trigone des grandes conjonctions"]};
  const ATLAS = [["planetes","Les planètes","p_soleil","Dix astres et deux nœuds"],["signes","Les signes","s4","Douze manières d'être"],["maisons","Les maisons","c_maisons","Douze domaines de vie"],["aspects","Les aspects","c_aspects","Les regards entre planètes"]];
  const PIMG = id => (C.TRAD7.includes(id) || id === "neptune" || id === "pluton") ? IMG("p_" + id) : null;
  const houseMini = n => `<svg class="a-hmini" viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46" class="w-out"/><circle r="20" class="w-core"/>${Array.from({length:12}, (_, i) => { const a = (180 + i*30)*rad, b = (180 + i*30 + 30)*rad, p = (r, t) => `${(r*Math.cos(t)).toFixed(1)} ${(-r*Math.sin(t)).toFixed(1)}`;
      return `<path d="M${p(46, a)}A46 46 0 0 0 ${p(46, b)}L${p(20, b)}A20 20 0 0 1 ${p(20, a)}Z" class="${i + 1 === n ? "on" : ""}"/>`; }).join("")}</svg>`;
  const aspMini = A => { const r = 34, a = A.ang*rad; return `<svg class="a-amini ${A.cls}" viewBox="-45 -45 90 90" aria-hidden="true"><circle r="${r}" class="c"/><line x1="${-r}" y1="0" x2="${(-r*Math.cos(a)).toFixed(1)}" y2="${(-r*Math.sin(a)).toFixed(1)}"/><circle cx="${-r}" r="4"/><circle cx="${(-r*Math.cos(a)).toFixed(1)}" cy="${(-r*Math.sin(a)).toFixed(1)}" r="4"/></svg>`; };
  function renderLearn(){
    const root = q1("#v-a-apprendre"), M = lv.mod && ASTRO_COURS.find(m => m.id === lv.mod);
    const total = ASTRO_COURS.reduce((t, m) => t + m.lecons.length, 0), done = st.done.length;
    const crumb = rest => `<p class="crumb"><button type="button" class="linkbtn" data-lhome>L'école</button>${rest ? " › " + rest : ""}</p>`;
    if(lv.fiches){
      const k = lv.fiches, tt = {planetes:"Les planètes", signes:"Les signes", maisons:"Les maisons", aspects:"Les aspects"}[k];
      const cards = k === "planetes" ? D.PLANETS.map(p => `<button type="button" class="a-acard${PIMG(p.id) ? "" : " noimg"}" data-afiche="p:${p.id}">${PIMG(p.id) ? `<span class="a-acard-img"><img src="${PIMG(p.id)}" alt="" loading="lazy"></span>` : `<span class="a-acard-gl">${gl(p.gl, "pl")}</span>`}<span class="a-acard-t">${gl(p.gl, "pl")} ${p.court}</span><span class="a-acard-m">${p.mots.slice(0, 3).join(" · ")}</span></button>`)
        : k === "signes" ? SG.map((s, i) => `<button type="button" class="a-acard" data-afiche="s:${i}"><span class="a-acard-img wide"><img src="${IMG("s" + i)}" alt="" loading="lazy"></span><span class="a-acard-t">${sgl(i)} ${s.nom}</span><span class="a-acard-m">${s.dates.replace(/^du /, "")}</span></button>`)
        : k === "maisons" ? D.HOUSES.map(x => `<button type="button" class="a-acard noimg" data-afiche="h:${x.n}"><span class="a-acard-gl">${houseMini(x.n)}</span><span class="a-acard-t"><span class="ag rom">${ROM[x.n]}</span> ${x.nom}</span><span class="a-acard-m">${x.mots.slice(0, 3).join(" · ")}</span></button>`)
        : D.ASPECTS.map(a => `<button type="button" class="a-acard noimg" data-afiche="a:${a.id}"><span class="a-acard-gl">${aspMini(a)}</span><span class="a-acard-t">${gl(a.gl, "asp " + a.cls)} ${a.nom}</span><span class="a-acard-m">${a.ang}° · ${a.nature}</span></button>`);
      root.innerHTML = `${crumb("L'atlas")}<header class="a-hero"><p class="eyebrow">L'atlas</p><h1>${tt}</h1><p class="a-lede">Touche une carte pour lire sa fiche : chacune donne la lecture traditionnelle et la lecture moderne.</p></header>
        <nav class="a-atabs">${ATLAS.map(([key, n]) => `<button type="button" class="subtab${key === k ? " on" : ""}" data-lfich="${key}">${n}</button>`).join("")}</nav>
        <div class="a-agrid ${k}">${cards.join("")}</div>`;
    } else if(!M){
      const next = ASTRO_COURS.find(m => m.lecons.some((_, j) => !st.done.includes(lessonKey(m.id, j))));
      root.innerHTML = `<header class="a-hero a-school"><p class="eyebrow">Apprendre l'astrologie</p><h1>L'école du ciel</h1>
          <p class="a-lede">Huit modules de leçons courtes, chacune avec un schéma à manipuler. Chaque module se termine par un quiz.</p>
          <div class="a-prog"><div class="a-prog-bar"><i style="--w:${(done/total*100).toFixed(0)}%"></i></div><span>${done} leçon${done > 1 ? "s" : ""} sur ${total}</span>${next ? `<button type="button" class="btn small" data-lmod="${next.id}">${done ? "Reprendre" : "Commencer"} : ${next.t}</button>` : ""}</div></header>
        <div class="a-mods2">${ASTRO_COURS.map((m, i) => { const d = m.lecons.filter((_, j) => st.done.includes(lessonKey(m.id, j))).length, cv = COVER[m.id];
          return `<button type="button" class="a-mod2${d === m.lecons.length ? " fini" : ""}" data-lmod="${m.id}"><span class="a-mod2-img"><img src="${IMG(cv[0])}" alt="" loading="lazy"></span>
            <span class="a-mod2-body"><span class="a-mod2-n">Module ${i + 1}</span><b>${m.t}</b><span class="a-mod2-d">${m.d}</span>
            <span class="a-mod2-foot"><i style="--w:${(d/m.lecons.length*100).toFixed(0)}%"></i><small>${d}/${m.lecons.length}${m.quiz && st.best[m.quiz] != null ? ` · quiz ${st.best[m.quiz]}/10` : ""}</small></span></span></button>`; }).join("")}</div>
        <h2 class="lsub">L'atlas</h2><p class="help">Toutes les fiches, pour réviser ou retrouver un détail.</p>
        <div class="a-atlas">${ATLAS.map(([k, n, im, d]) => `<button type="button" class="a-atile" data-lfich="${k}"><img src="${IMG(im)}" alt=""><span><b>${n}</b><small>${d}</small></span></button>`).join("")}</div>
        <h2 class="lsub">Les quiz</h2><p class="help">Chaque module a son quiz, à la fin des leçons. Pour tout mêler, ou choisir un thème :</p>
        <div class="a-acts"><button type="button" class="btn small" data-lquiz="${Object.keys(QTHEMES).pop()}">${QTHEMES[Object.keys(QTHEMES).pop()][0]}${st.best[Object.keys(QTHEMES).pop()] != null ? ` · ${st.best[Object.keys(QTHEMES).pop()]}/10` : ""}</button><button type="button" class="btn ghost small" data-agoto="quiz">Tous les quiz</button></div>`;
    } else if(lv.lec == null){
      const cv = COVER[M.id], i = ASTRO_COURS.indexOf(M), resume = Math.max(0, M.lecons.findIndex((_, j) => !st.done.includes(lessonKey(M.id, j))));
      root.innerHTML = `${crumb(M.t)}<header class="a-mhead"><figure class="a-mhead-img"><img src="${IMG(cv[0])}" alt=""><figcaption>${cv[1]}</figcaption></figure>
          <div class="a-mhead-txt"><p class="eyebrow">Module ${i + 1} sur ${ASTRO_COURS.length}</p><h1>${M.t}</h1><p class="a-lede">${M.d}.</p>
          <div class="a-acts"><button type="button" class="btn" data-llec="${resume}">${M.lecons.some((_, j) => st.done.includes(lessonKey(M.id, j))) ? "Reprendre" : "Commencer"}</button>${M.quiz ? `<button type="button" class="btn ghost" data-lquiz="${M.quiz}">Tester ce module${st.best[M.quiz] != null ? ` · ${st.best[M.quiz]}/10` : ""}</button>` : ""}</div></div></header>
        <ol class="a-lecs2">${M.lecons.map((l, j) => { const sk = ASTRO_SCHEMAS.get(M.id, j); return `<li><button type="button" data-llec="${j}" class="${st.done.includes(lessonKey(M.id, j)) ? "lu" : ""}"><span class="n">${j + 1}</span><span class="t">${l.t}</span><span class="c" aria-hidden="true">${st.done.includes(lessonKey(M.id, j)) ? "✓" : "→"}</span></button></li>`; }).join("")}</ol>
        ${M.fiches ? `<p class="help">Pour réviser : <button type="button" class="linkbtn" data-lfich="${M.fiches}">l'atlas, ${({planetes:"les planètes", signes:"les signes", maisons:"les maisons", aspects:"les aspects"})[M.fiches]}</button>.</p>` : ""}`;
    } else {
      const L = M.lecons[lv.lec], k = lessonKey(M.id, lv.lec), last = lv.lec === M.lecons.length - 1, nextM = ASTRO_COURS[ASTRO_COURS.indexOf(M) + 1];
      if(!st.done.includes(k)){ st.done.push(k); save(); }
      const sch = ASTRO_SCHEMAS.render(M.id, lv.lec, W) || (L.w && W[L.w] ? W[L.w]() : "");
      root.innerHTML = `${crumb(`<button type="button" class="linkbtn" data-lmod="${M.id}">${M.t}</button>`)}
        <div class="a-ldots" aria-hidden="true">${M.lecons.map((_, j) => `<i class="${j === lv.lec ? "on" : st.done.includes(lessonKey(M.id, j)) ? "lu" : ""}"></i>`).join("")}</div>
        <article class="lesson a-lesson"><header class="lesson-top"><p class="eyebrow">Leçon ${lv.lec + 1} sur ${M.lecons.length}</p><h1>${L.t}</h1></header>
          ${L.p.slice(0, 1).map(p => `<p class="lead">${p}</p>`).join("")}
          ${sch}
          ${L.p.slice(1).map(p => `<p>${p}</p>`).join("")}
          ${L.ret ? `<aside class="a-ret"><h3>À retenir</h3><ul>${L.ret.map(r => `<li>${r}</li>`).join("")}</ul></aside>` : ""}</article>
        <div class="a-acts a-lnav">${lv.lec > 0 ? `<button type="button" class="btn ghost" data-llec="${lv.lec - 1}">← Précédente</button>` : ""}${last ? (M.quiz ? `<button type="button" class="btn" data-lquiz="${M.quiz}">Tester ce module</button>` : "") + (nextM ? `<button type="button" class="btn${M.quiz ? " ghost" : ""}" data-lnext>Module suivant →</button>` : "") : `<button type="button" class="btn" data-llec="${lv.lec + 1}">Leçon suivante →</button>`}</div>`;
      ASTRO_SCHEMAS.bind(root);
    }
    qa("[data-lhome]", root).forEach(b => b.onclick = () => { lv = {mod:null, lec:null, fiches:null}; renderLearn(); scrollTo({top:0}); });
    qa("[data-lmod]", root).forEach(b => b.onclick = () => { lv = {mod:b.dataset.lmod, lec:null, fiches:null}; renderLearn(); scrollTo({top:0}); });
    qa("[data-llec]", root).forEach(b => b.onclick = () => { lv.lec = +b.dataset.llec; renderLearn(); scrollTo({top:0}); });
    qa("[data-lfich]", root).forEach(b => b.onclick = () => { lv = {mod:null, lec:null, fiches:b.dataset.lfich}; renderLearn(); scrollTo({top:0}); });
    qa("[data-lquiz]", root).forEach(b => b.onclick = () => { startQuiz(b.dataset.lquiz); aView("quiz"); });
    const nx = q1("[data-lnext]", root); if(nx) nx.onclick = () => { lv = {mod:ASTRO_COURS[ASTRO_COURS.indexOf(M) + 1].id, lec:null, fiches:null}; renderLearn(); scrollTo({top:0}); };
  }

  /* =================================================================
     QUIZ
     ================================================================= */
  const QTHEMES = {glyphes:["Les symboles","Reconnaître les glyphes"], bases:["Les bases","Zodiaque, mouvements, écoles"], planetes:["Les planètes","Sens, cycles, maîtrises"], signes:["Les signes","Éléments, modes, dates"],
    maisons:["Les maisons","Domaines et noms anciens"], aspects:["Les aspects","Angles et natures"], dignites:["La tradition","Dignités, secte, joies"], temps:["Le temps","Transits, profections, retours"], histoire:["L'histoire","De Babylone à aujourd'hui"], melange:["Le grand mélange","Un peu de tout"]};
  const mk = (q, ok, wrong, why) => { const opts = shuffle([ok, ...shuffle(wrong.filter(w => w !== ok)).slice(0, 3)]); return {q, opts, ok:opts.indexOf(ok), why}; };
  const P7 = C.TRAD7, PALL = D.PLANETS.filter(p => !p.point).map(p => p.id), SN = SG.map(s => s.nom);
  const GEN = {
    glyphes: [
      () => { const p = pick(PALL); return mk(`Quel astre a pour symbole ${gl(PL[p].gl, "pl big")} ?`, PL[p].court, PALL.map(x => PL[x].court), `${PL[p].gl}${T} est le symbole de ${PL[p].nom.replace(/^L[ae] /, m => m.toLowerCase())}.`); },
      () => { const k = Math.floor(Math.random()*12); return mk(`Quel signe a pour symbole ${sgl(k).replace("ag ", "ag big ")} ?`, SG[k].nom, SN, `${SG[k].gl}${T} : ${SG[k].nom}.`); },
      () => { const a = pick(D.ASPECTS); return mk(`Quel aspect a pour symbole ${gl(a.gl, "big asp " + a.cls)} ?`, a.nom, D.ASPECTS.map(x => x.nom), `${a.gl}${T} : ${a.nom.toLowerCase()}, ${a.ang}°.`); },
      () => { const p = pick(PALL); return mk(`Quel est le symbole ${PL[p].genre === "f" ? "de la" : "de"} ${PL[p].court} ?`, `${PL[p].gl}${T}`, PALL.map(x => `${PL[x].gl}${T}`), `${PL[p].court} : ${PL[p].gl}${T}.`); }
    ],
    bases: [
      () => mk("Comment s'appelle le chemin apparent du Soleil parmi les étoiles ?", "L'écliptique", ["L'équateur céleste","Le méridien","L'horizon"], "Le zodiaque est la bande du ciel qui l'entoure."),
      () => mk("Où commence le zodiaque tropical ?", "À l'équinoxe de printemps", ["Au solstice d'hiver","À l'étoile Spica","Au 1er janvier"], "Le 0° Bélier est la position du Soleil au premier jour du printemps."),
      () => mk("Pourquoi les signes ne correspondent-ils plus aux constellations ?", "À cause de la précession des équinoxes", ["À cause des éclipses","Parce que les étoiles bougent vite","À cause du calendrier grégorien"], "Le point du printemps recule d'environ un degré tous les 72 ans."),
      () => mk("Qui a découvert la précession des équinoxes ?", "Hipparque", ["Ptolémée","Kepler","Copernic"], "Vers 130 avant notre ère."),
      () => mk("Une planète rétrograde…", "semble reculer, vue de la Terre", ["recule vraiment sur son orbite","s'éloigne du Soleil","disparaît du ciel"], "La rétrogradation est une illusion d'optique : la Terre double la planète, ou l'inverse."),
      () => mk("De combien de degrés Mercure peut-il s'éloigner du Soleil, au plus ?", "28°", ["47°","90°","180°"], "Vénus, elle, va jusqu'à 47°."),
      () => mk("Environ combien de temps l'Ascendant reste-t-il dans un même signe ?", "Deux heures", ["Deux jours","Un mois","Un an"], "Tout le zodiaque se lève en 24 heures, soit un signe toutes les deux heures environ."),
      () => mk("Dans un thème, la planète dit…", "quoi : la fonction, le besoin", ["comment : le style","où : le domaine","quand : la date"], "Planète = quoi, signe = comment, maison = où."),
      () => mk("Combien d'astres utilise l'astrologie traditionnelle ?", "Sept", ["Dix","Douze","Cinq"], "Le Soleil, la Lune, Mercure, Vénus, Mars, Jupiter, Saturne : les astres visibles à l'œil nu."),
      () => mk("Quel zodiaque utilise l'astrologie indienne ?", "Le zodiaque sidéral", ["Le zodiaque tropical","Le zodiaque chinois","Aucun"], "Elle suit les étoiles ; l'Occident suit les saisons.")
    ],
    planetes: [
      () => { const k = Math.floor(Math.random()*12); return mk(`Quel est le maître traditionnel ${SG[k].du} ?`, PL[SG[k].maitre].court, P7.map(x => PL[x].court), `${SG[k].nom} : domicile de ${PL[SG[k].maitre].court}${SG[k].maitreMod !== SG[k].maitre ? ` (maître moderne : ${PL[SG[k].maitreMod].court})` : ""}.`); },
      () => { const k = pick([7, 10, 11]); return mk(`Quelle planète est le maître moderne ${SG[k].du} ?`, PL[SG[k].maitreMod].court, ["Uranus","Neptune","Pluton","Saturne","Jupiter","Mars"], `L'astrologie moderne donne ${PL[SG[k].maitreMod].court} au ${SG[k].nom} ; la tradition garde ${PL[SG[k].maitre].court}.`); },
      () => { const p = pick(["mercure","venus","mars","jupiter","saturne","uranus","neptune","pluton"]); const ans = {mercure:"88 jours (autour du Soleil)", venus:"225 jours (autour du Soleil)", mars:"Environ 2 ans", jupiter:"12 ans", saturne:"29 ans et demi", uranus:"84 ans", neptune:"165 ans", pluton:"248 ans"};
        return mk(`Combien de temps met ${PL[p].court} pour faire le tour du zodiaque ?`, ans[p], Object.values(ans), PL[p].cycle); },
      () => { const p = pick(P7); return mk(`Quel jour de la semaine est consacré ${PL[p].genre === "f" ? "à la" : "à"} ${PL[p].court} ?`, cap(PL[p].jour), P7.map(x => cap(PL[x].jour)), `Les noms des jours viennent des sept astres : ${PL[p].jour} pour ${PL[p].court}.`); },
      () => { const p = pick(P7); return mk(`Quel métal correspond ${PL[p].genre === "f" ? "à la" : "à"} ${PL[p].court} ?`, cap(PL[p].metal), P7.map(x => cap(PL[x].metal)), `Les alchimistes associaient ${PL[p].metal} à ${PL[p].court}.`); },
      () => { const p = pick(["venus","jupiter"]); return mk("Quelle planète est la « grande bénéfique » de la tradition ?", "Jupiter", ["Vénus","Saturne","Mars"], "Jupiter est le grand bénéfique, Vénus la petite."); },
      () => mk("Quelle planète la tradition appelle-t-elle le « grand maléfique » ?", "Saturne", ["Mars","Pluton","Mercure"], "Saturne le grand, Mars le petit."),
      () => { const p = pick(["uranus","neptune","pluton"]); const y = {uranus:"1781", neptune:"1846", pluton:"1930"}; return mk(`En quelle année ${p === "pluton" ? "Pluton a-t-il" : p === "uranus" ? "Uranus a-t-il" : "Neptune a-t-il"} été découvert ?`, y[p], ["1781","1846","1930","1610"], PL[p].cycle); },
      () => { const p = pick(P7.concat(["uranus","neptune","pluton"])); return mk(`Quel mot-clé correspond le mieux ${PL[p].genre === "f" ? "à la" : "à"} ${PL[p].court} ?`, PL[p].mots[0], P7.concat(["uranus","neptune","pluton"]).filter(x => x !== p).map(x => PL[x].mots[0]), `${PL[p].court} : ${PL[p].mots.join(", ")}.`); }
    ],
    signes: [
      () => { const k = Math.floor(Math.random()*12); return mk(`À quel élément appartient ${SG[k].du.replace(/^du /, "le ").replace(/^de la /, "la ").replace(/^des /, "les ")} ?`, cap(SG[k].el), ["Feu","Terre","Air","Eau"], `${SG[k].nom} : signe de ${SG[k].el}.`); },
      () => { const k = Math.floor(Math.random()*12); return mk(`Quel est le mode ${SG[k].du} ?`, cap(SG[k].mode), ["Cardinal","Fixe","Mutable"], D.MODES[SG[k].mode].txt); },
      () => { const k = Math.floor(Math.random()*12); return mk(`Quel signe est opposé ${SG[k].du.replace(/^du /, "au ").replace(/^de la /, "à la ").replace(/^des /, "aux ")} ?`, SG[(k+6)%12].nom, SN.filter((_, i) => i !== k), `Axe ${SG[k].nom}-${SG[(k+6)%12].nom}.`); },
      () => { const k = Math.floor(Math.random()*12); return mk(`Quelle partie du corps gouverne ${SG[k].du.replace(/^du /, "le ").replace(/^de la /, "la ").replace(/^des /, "les ")} ?`, cap(SG[k].corps), SG.map(s => cap(s.corps)), `L'« homme zodiacal » va de la tête (Bélier) aux pieds (Poissons).`); },
      () => { const k = Math.floor(Math.random()*12); return mk(`Quel signe correspond à la période ${SG[k].dates} ?`, SG[k].nom, SN, `Dates approximatives : elles varient d'un jour selon les années.`); },
      () => { const p = pick(["mercure","venus","mars","jupiter","saturne"]), dom = SG.filter(s => s.maitre === p).map(s => s.nom); return mk(`Lequel de ces signes est un domicile de ${PL[p].court} ?`, pick(dom), SN.filter(n => !dom.includes(n)), `${PL[p].court} gouverne ${dom.join(" et ")}.`); },
      () => mk("Quels signes ouvrent les saisons ?", "Les signes cardinaux", ["Les signes fixes","Les signes mutables","Les signes d'eau"], "Bélier, Cancer, Balance, Capricorne : équinoxes et solstices."),
      () => mk("Deux signes du même élément forment…", "un trigone", ["un carré","une opposition","un sextile"], "Ils sont séparés de 120°.")
    ],
    maisons: [
      () => { const x = pick(D.HOUSES); return mk(`Quelle maison les Latins appelaient-ils « ${x.latin} » ?`, "Maison " + ROM[x.n], D.HOUSES.map(z => "Maison " + ROM[z.n]), `${x.latin} : ${x.nom.toLowerCase()}.`); },
      () => { const x = pick(D.HOUSES); return mk(`Quel domaine concerne la maison ${ROM[x.n]} ?`, cap(x.mots.join(", ")), D.HOUSES.map(z => cap(z.mots.join(", "))), x.mod); },
      () => mk("Quelles maisons sont angulaires ?", "I, IV, VII, X", ["II, V, VIII, XI","III, VI, IX, XII","I, II, III, IV"], "Elles commencent aux quatre angles."),
      () => { const n = pick([2, 6, 8, 12]); return mk("Laquelle de ces maisons ne « voit » pas l'Ascendant ?", "Maison " + ROM[n], ["Maison III","Maison V","Maison VII","Maison IX","Maison X","Maison XI"], "II, VI, VIII et XII sont en aversion à la maison I."); },
      () => mk("Quel point se lève à l'horizon est au moment de la naissance ?", "L'Ascendant", ["Le Milieu du Ciel","Le Fond du Ciel","Le Descendant"], "C'est la pointe de la maison I."),
      () => mk("Quel système de maisons est le plus utilisé par l'astrologie moderne ?", "Placidus", ["Les signes entiers","Regiomontanus","Porphyre"], "Diffusé par les éphémérides anglaises du XIXe siècle."),
      () => mk("Quel système de maisons utilisaient les astrologues hellénistiques ?", "Les signes entiers", ["Placidus","Regiomontanus","Koch"], "Le signe qui se lève forme la maison I tout entière.")
    ],
    aspects: [
      () => { const a = pick(D.ASPECTS); return mk(`Quel angle forme ${a.id === "opp" || a.id === "conj" ? "une" : "un"} ${a.nom.toLowerCase()} ?`, a.ang + "°", D.ASPECTS.map(x => x.ang + "°"), `${a.nom} : ${a.ang}°.`); },
      () => { const a = pick(D.ASPECTS.filter(x => x.id !== "conj")); return mk(`Deux planètes séparées de ${a.ang}° forment…`, a.nom.toLowerCase(), D.ASPECTS.map(x => x.nom.toLowerCase()), cap(a.sens) + "."); },
      () => mk("Quels sont les aspects harmonieux ?", "Le sextile et le trigone", ["Le carré et l'opposition","La conjonction et le carré","Le quinconce et l'opposition"], "Le carré et l'opposition sont les aspects tendus."),
      () => mk("Un aspect « appliquant » est un aspect…", "qui se rapproche de l'exactitude", ["déjà passé","entre deux maléfiques","sans orbe"], "Appliquant : à venir. Séparant : passé."),
      () => mk("Qui a introduit le quinconce et les aspects mineurs ?", "Kepler", ["Ptolémée","Lilly","Rudhyar"], "Au début du XVIIe siècle, en s'inspirant de l'harmonie musicale."),
      () => mk("Combien d'aspects connaissait Ptolémée ?", "Cinq", ["Trois","Sept","Douze"], "Conjonction, sextile, carré, trigone, opposition."),
      () => mk("Une opposition, un carré aux deux planètes opposées : comment s'appelle cette figure ?", "Un T-carré", ["Un grand trigone","Un stellium","Un Yod"], "Une tension motrice, qui se résout par le point vide.")
    ],
    dignites: [
      () => { const p = pick(P7.filter(x => x !== "soleil" && x !== "lune")); const ex = SG.filter(s => SG[(SG.indexOf(s)+6)%12].maitre === p).map(s => s.nom); return mk(`Dans quel signe ${PL[p].court} est-${PL[p].genre === "f" ? "elle" : "il"} en exil ?`, pick(ex), SN.filter(n => !ex.includes(n)), `${PL[p].court} est en exil en ${ex.join(" et ")}, face à ${ex.length > 1 ? "ses domiciles" : "son domicile"}.`); },
      () => { const p = pick(P7), ex = SG.find(s => s.exalt && s.exalt[0] === p), art = p === "soleil" ? "le " : p === "lune" ? "la " : ""; return mk(`Dans quel signe ${art}${PL[p].court} s'exalte-t-${PL[p].genre === "f" ? "elle" : "il"} ?`, ex.nom, SN, `${PL[p].court} s'exalte à ${ex.exalt[1]}° ${ex.du}.`); },
      () => { const p = pick(P7); const ex = SG.find(s => s.exalt && s.exalt[0] === p), ch = SG[(SG.indexOf(ex)+6)%12]; return mk(`Dans quel signe ${PL[p].court} est-${PL[p].genre === "f" ? "elle" : "il"} en chute ?`, ch.nom, SN, `En face de son exaltation (${ex.nom}).`); },
      () => mk("Combien de points vaut une exaltation dans le barème de Lilly ?", "4", ["5","3","1"], "Domicile 5, exaltation 4, triplicité 3, terme 2, face 1."),
      () => mk("Combien de points vaut un domicile dans le barème de Lilly ?", "5", ["4","3","2"], "Domicile 5, exil −5."),
      () => mk("Un thème est diurne quand…", "le Soleil est au-dessus de l'horizon", ["la Lune est pleine","le Soleil est en Lion","Mars est angulaire"], "Maisons VII à XII."),
      () => mk("Dans un thème nocturne, quel maléfique est le plus difficile ?", "Saturne", ["Mars","Vénus","Jupiter"], "Mars est de la secte de nuit et s'y adoucit ; Saturne, diurne, y devient le plus lourd."),
      () => { const p = pick(P7); return mk(`Dans quelle maison ${PL[p].court} se réjouit-${PL[p].genre === "f" ? "elle" : "il"} ?`, "Maison " + ROM[PL[p].joie], ["I","III","V","VI","IX","XI","XII"].map(x => "Maison " + x), `Les joies : Mercure I, Lune III, Vénus V, Mars VI, Soleil IX, Jupiter XI, Saturne XII.`); },
      () => mk("Une planète sans aucune dignité essentielle est…", "pérégrine", ["combuste","cazimi","rétrograde"], "Comme un voyageur sans abri."),
      () => mk("Une planète trop proche du Soleil est dite…", "combuste", ["pérégrine","exaltée","angulaire"], "Elle est noyée dans sa lumière. Au cœur exact du Soleil, elle est au contraire cazimi."),
      () => { const e = pick(Object.keys(D.ELEMENTS)); return mk(`Quel est le maître de triplicité diurne de ${D.ELEMENTS[e].nom.toLowerCase()} ?`, PL[D.ELEMENTS[e].trip[0]].court, P7.map(x => PL[x].court), `Selon Dorothée : ${D.ELEMENTS[e].trip.map(x => PL[x].court).join(", ")} (jour, nuit, participant).`); },
      () => mk("Comment calcule-t-on la part de Fortune dans un thème de jour ?", "Ascendant + Lune − Soleil", ["Ascendant + Soleil − Lune","Soleil + Lune − Ascendant","Milieu du Ciel + Lune"], "De nuit, on inverse : Ascendant + Soleil − Lune.")
    ],
    temps: [
      () => { const a = 1 + Math.floor(Math.random()*70); return mk(`À ${a} ans, quelle maison est activée par la profection annuelle ?`, "Maison " + ROM[a % 12 + 1], D.HOUSES.map(x => "Maison " + ROM[x.n]), `${a} = ${Math.floor(a/12)} × 12 + ${a % 12} : on avance de ${a % 12} signe${a % 12 > 1 ? "s" : ""} depuis l'Ascendant.`); },
      () => mk("Vers quel âge a lieu le premier retour de Saturne ?", "29 ans", ["12 ans","42 ans","7 ans"], "Saturne met 29 ans et demi à faire le tour du zodiaque."),
      () => mk("Dans les progressions secondaires, un jour après la naissance correspond à…", "une année de vie", ["un mois","une heure","dix ans"], "Un jour = un an."),
      () => mk("Qu'est-ce qu'une révolution solaire ?", "Le thème du retour du Soleil à sa place natale", ["Un tour complet de la Lune","Une éclipse de Soleil","Le passage du Soleil au MC"], "On la dresse chaque année pour l'instant exact du retour."),
      () => mk("Qui a fait de la révolution solaire l'un des piliers de sa méthode ?", "Morin de Villefranche", ["Alan Leo","Ptolémée","Dane Rudhyar"], "Dans l'Astrologia Gallica (1661)."),
      () => mk("Tous les combien d'années Jupiter et Saturne se rejoignent-ils ?", "Environ 20 ans", ["Environ 12 ans","Environ 30 ans","Environ 84 ans"], "Les « grandes conjonctions » d'Abu Ma'shar."),
      () => mk("Quelle technique utilise le mouvement diurne, un degré pour un an ?", "Les directions primaires", ["Les transits","Les profections","Les dés astrologiques"], "La grande technique de la tradition, de Ptolémée à Placidus.")
    ],
    histoire: ASTRO_QHIST.map(([q, o, ok, why]) => () => mk(q, o[ok], o, why))
  };
  let qz = {mode:"home"};
  function startQuiz(th){
    const pool = th === "melange" ? Object.entries(GEN).filter(([k]) => k !== "glyphes").flatMap(([, v]) => v) : GEN[th];
    const qs = [], seen = new Set();
    for(let tries = 0; qs.length < 10 && tries < 200; tries++){ const g = pick(pool)(); if(!seen.has(g.q)){ seen.add(g.q); qs.push(g); } }
    qz = {mode:"play", th, qs, i:0, score:0, ans:null};
  }
  function renderQuiz(){
    const root = q1("#v-a-quiz");
    if(qz.mode === "home"){
      root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-agoto="apprendre">L'école</button> › Les quiz</p><header class="a-hero"><p class="eyebrow">L'école du ciel</p><h1>Le quiz du ciel</h1><p>Dix questions par partie. Chaque réponse est expliquée : c'est la meilleure façon de retenir. Ton meilleur score est gardé pour chaque thème.</p></header>
        <div class="qtiles a-qtiles">${Object.entries(QTHEMES).map(([k, [t, d]]) => `<button type="button" class="qtile" data-qth="${k}"><span class="qtile-t">${t}</span><span class="qtile-m">${d}</span>${st.best[k] != null ? `<span class="a-best">Record : ${st.best[k]}/10</span>` : ""}</button>`).join("")}</div>`;
      qa("[data-qth]", root).forEach(b => b.onclick = () => { startQuiz(b.dataset.qth); renderQuiz(); });
      return;
    }
    if(qz.mode === "end"){
      const best = st.best[qz.th]; if(best == null || qz.score > best){ st.best[qz.th] = qz.score; save(); }
      const msg = qz.score >= 9 ? "Magnifique : tu lis le ciel comme un livre." : qz.score >= 7 ? "Très bien : l'essentiel est acquis." : qz.score >= 5 ? "Bon début. Relis le module correspondant et retente ta chance." : "Le ciel est vaste : passe par L'école, puis reviens.";
      root.innerHTML = `<div class="quiz"><p class="eyebrow">${QTHEMES[qz.th][0]}</p><h1 class="a-score">${qz.score} / 10</h1><p class="lead">${msg}</p>${best != null && qz.score > best ? `<p class="help">Nouveau record (avant : ${best}/10).</p>` : ""}
        <div class="a-acts"><button type="button" class="btn" data-again>Rejouer</button><button type="button" class="btn ghost" data-agoto="apprendre">Retour à L'école</button><button type="button" class="linkbtn" data-qhome>Autres quiz</button></div></div>`;
      q1("[data-again]", root).onclick = () => { startQuiz(qz.th); renderQuiz(); }; q1("[data-qhome]", root).onclick = () => { qz = {mode:"home"}; renderQuiz(); };
      return;
    }
    const Q = qz.qs[qz.i];
    root.innerHTML = `<div class="quiz"><div class="quiz-head"><p class="eyebrow">${QTHEMES[qz.th][0]} · question ${qz.i+1} sur ${qz.qs.length}</p><p class="eyebrow">Score : ${qz.score}</p></div>
      <div class="a-qbar"><i style="--w:${(qz.i/qz.qs.length*100).toFixed(0)}%"></i></div>
      <h2 class="quiz-q">${Q.q}</h2><div class="qopts">${Q.opts.map((o, j) => `<button type="button" class="qopt" data-o="${j}">${o}</button>`).join("")}</div>
      <div class="a-qwhy"></div><div class="a-acts"><button type="button" class="linkbtn" data-qhome>Quitter</button></div></div>`;
    q1("[data-qhome]", root).onclick = () => { qz = {mode:"home"}; renderQuiz(); };
    qa("[data-o]", root).forEach(b => b.onclick = () => {
      const j = +b.dataset.o, good = j === Q.ok; if(good) qz.score++;
      qa("[data-o]", root).forEach((x, k) => { x.disabled = true; if(k === Q.ok) x.classList.add("ok"); else if(k === j) x.classList.add("ko"); });
      if(typeof buzz === "function") try{ buzz(good ? 12 : 40); }catch(e){}
      const w = q1(".a-qwhy", root); w.innerHTML = `<p class="qwhy${good ? "" : " bad"}"><b>${good ? "Exact." : "Pas tout à fait."}</b> ${Q.why}</p><button type="button" class="btn" data-next>${qz.i === qz.qs.length - 1 ? "Voir mon score" : "Question suivante"}</button>`;
      const n = q1("[data-next]", w); n.focus({preventScroll:true}); n.onclick = () => { qz.i++; if(qz.i >= qz.qs.length) qz.mode = "end"; renderQuiz(); };
    });
  }

  /* =================================================================
     HISTOIRE
     ================================================================= */
  let histObs = null;
  function renderHist(){
    const root = q1("#v-a-histoire"), HX = window.ArcanesHistoire;
    const CH = JSON.parse(JSON.stringify(window.ASTRO_HISTOIRE || []).replace(/"@(h\d)"/g, (m, k) => JSON.stringify(IMG(k))));
    if(!st.hist || !Array.isArray(st.hist.lu)) st.hist = {lu:[]};
    const sources = `<section class="hx-fin"><h2>Pour vérifier et aller plus loin</h2><ul>
        <li>Francesca Rochberg, <i>The Heavenly Writing</i>, Cambridge University Press, 2004</li>
        <li>Auguste Bouché-Leclercq, <i>L'Astrologie grecque</i>, 1899</li>
        <li>Tamsyn Barton, <i>Ancient Astrology</i>, Routledge, 1994</li>
        <li>Jean-Patrice Boudet, <i>Entre science et nigromance</i>, Publications de la Sorbonne, 2006</li>
        <li>Nicholas Campion, <i>A History of Western Astrology</i>, 2 vol., Continuum, 2008-2009</li>
        <li>Chris Brennan, <i>Hellenistic Astrology</i>, Amor Fati, 2017</li>
        <li>Geoffrey Dean et Ivan Kelly, « Is Astrology Relevant to Consciousness and Psi? », <i>Journal of Consciousness Studies</i>, 2003</li></ul>
        <div class="a-acts a-hend"><button type="button" class="btn" data-hquiz>Tester mes connaissances</button></div></section>`;
    HX.mount(root, {pfx:"ah", eyebrow:"Vingt-cinq siècles de regards sur le ciel", titre:"Une histoire de l'astrologie",
      lede:"Dix chapitres, de Babylone à ton téléphone. Chacun s'ouvre sur une scène : un roi caché, une ville fondée à l'heure dite, un astrologue convoqué après un incendie. Qui a inventé l'astrologie, comment elle a voyagé, pourquoi elle est sortie des sciences, et ce qu'en disent les études.",
      chapitres:CH, etat:st.hist, onEtat:e => { st.hist = e; save(); }, fin:sources,
      finChap:`<div class="hxp-fini"><p class="eyebrow">Fin de l'histoire</p><h3>Tu as tout lu.</h3><p>Le reste se passe dans ton propre ciel.</p><div class="a-acts"><button type="button" class="btn" data-hquiz>Tester mes connaissances</button><button type="button" class="btn ghost" data-agoto="ciel">Mon ciel aujourd'hui</button></div></div>`,
      apres:r => qa("[data-hquiz]", r).forEach(b => b.onclick = () => { startQuiz("histoire"); aView("quiz"); })});
  }

  /* =================================================================
     MON ESPACE
     ================================================================= */
  function renderMoi(){
    const root = q1("#v-a-moi"), total = ASTRO_COURS.reduce((t, m) => t + m.lecons.length, 0);
    const sel = (name, v) => `<select data-sys="${name}">${Object.entries(SYS_NOM).map(([k, n]) => `<option value="${k}"${v === k ? " selected" : ""}>${cap(n)}</option>`).join("")}</select>`;
    root.innerHTML = espaceBar("astro") + `<header class="a-hero"><p class="eyebrow">Mon espace · astrologie</p><h1>Mon espace</h1><p class="a-lede">Ton lieu, tes thèmes et ta progression. Tout reste sur cet appareil.</p></header>
      <section class="a-card a-set"><h2>Le lieu du ciel du jour</h2><p>Pour calculer l'Ascendant, les maisons et les heures planétaires de l'onglet Aujourd'hui.</p>
        <div class="a-row2"><input id="a-lieu" list="a-cities2" value="${h(st.lieu.nom)}" aria-label="Ville"><datalist id="a-cities2">${window.ArcanesVilles ? "" : cityOpts()}</datalist><button type="button" class="btn small" id="a-lieu-ok">Enregistrer</button></div><p class="help" id="a-lieu-st"></p></section>
      <section class="a-card a-set"><h2>Les réglages de calcul</h2><p>L'école de lecture, Tradition ou Moderne, se choisit là où on voit son effet : sous la roue du Ciel et en tête de Mon thème. Elle vaut partout. Aujourd'hui : <b>${school() === "tradition" ? "Tradition" : "Moderne"}</b>.</p>
        <button type="button" class="btn ghost small" data-popen="outils:reglages">Maisons, orbes, zodiaque</button></section>
      <section class="a-card a-set"><h2>Mes thèmes</h2>${st.themes.length ? `<ul class="a-tlist">${st.themes.map(t => `<li><button type="button" class="a-link" data-open="${t.id}">${t.moi ? "★ " : ""}${h(t.nom)}</button><span class="help">${t.d} ${MOIS[t.m-1]} ${t.y} · ${h(t.lieu.nom)}</span></li>`).join("")}</ul>` : `<p class="help">Aucun thème pour l'instant.</p>`}
        <button type="button" class="btn ghost small" data-agoto="theme">Calculer un thème</button></section>
      <section class="a-card a-set"><h2>Ma progression</h2><p>${st.done.length} leçon${st.done.length > 1 ? "s" : ""} lue${st.done.length > 1 ? "s" : ""} sur ${total}.</p>
        ${Object.keys(st.best).length ? `<ul class="a-ul">${Object.entries(st.best).map(([k, v]) => `<li>${QTHEMES[k] ? QTHEMES[k][0] : k} : ${v}/10</li>`).join("")}</ul>` : `<p class="help">Pas encore de quiz terminé.</p>`}
        <p class="help">${st.des.length} lancer${st.des.length > 1 ? "s" : ""} de dés enregistré${st.des.length > 1 ? "s" : ""}.</p></section>
      <section class="a-card a-set"><h2>Sauvegarde</h2><p>La sauvegarde d'Arcanes emporte aussi tes thèmes et ta progression en astrologie. Elle se trouve dans l'espace Tarot.</p><button type="button" class="btn ghost small" data-esp="tarot">Ouvrir la sauvegarde</button></section>
      <p class="help">Les positions sont calculées avec Astronomy Engine de Don Cross (licence MIT).</p>`;
    bindEspace(root);
    if(window.ArcanesVilles) window.ArcanesVilles.attach(q1("#a-lieu", root));
    q1("#a-lieu-ok", root).onclick = () => { const c = cityOf(q1("#a-lieu", root)), o = q1("#a-lieu-st", root);
      if(!c){ o.textContent = "Ville introuvable : choisis-la dans la liste."; return; } st.lieu = {nom:`${c[0]} (${c[1]})`, lat:c[2], lon:c[3], tz:c[4]}; save(); o.textContent = `C'est noté : ${st.lieu.nom}.`; };
    qa("[data-open]", root).forEach(b => b.onclick = () => { st.cur = b.dataset.open; save(); thMode = "natal"; editing = false; aView("theme"); });
  }

  /* =================================================================
     L'UNIVERS ASTROLOGIE : navigation, sélecteur Tarot · Astrologie, ambiance nuit
     ================================================================= */
  const VIEWS = ["ciel","theme","apprendre","quiz","histoire","moi"];
  const NAVV = ["ciel","theme","apprendre","histoire","moi"];
  const ICO = {
    ciel:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.6 4.2a7.8 7.8 0 1 0 5.2 10.9 6.3 6.3 0 0 1-5.2-10.9z"/><path d="M18.4 3.2l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5zM20.6 9.6l.3.8.8.3-.8.3-.3.8-.3-.8-.8-.3.8-.3z" stroke-width="1.05"/></svg>`,
    theme:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><path d="M12 3v3.8M12 17.2V21M3 12h3.8M17.2 12H21M5.6 5.6l2.7 2.7M15.7 15.7l2.7 2.7M5.6 18.4l2.7-2.7M15.7 8.3l2.7-2.7"/></svg>`,
    apprendre:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.4c-2.3-1.7-5.4-2.1-8.5-1.4v13.2c3.1-.7 6.2-.3 8.5 1.4 2.3-1.7 5.4-2.1 8.5-1.4V5c-3.1-.7-6.2-.3-8.5 1.4z"/><path d="M12 6.4v12.8"/><path d="M6.6 9.4l.4 1 1 .4-1 .4-.4 1-.4-1-1-.4 1-.4z" stroke-width="1"/></svg>`,
    histoire:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10"/><path d="M8 3c0 4.5 4 5.5 4 9s-4 4.5-4 9M16 3c0 4.5-4 5.5-4 9s4 4.5 4 9"/></svg>`,
    moi:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.6" r="3.6"/><path d="M4.8 20.2c.9-3.7 3.8-5.8 7.2-5.8s6.3 2.1 7.2 5.8"/></svg>`
  };
  const LAB = {ciel:["Aujourd'hui","Jour"], theme:["Pratiquer","Pratiquer"], apprendre:["Apprendre","Apprendre"], histoire:["Histoire","Histoire"], moi:["Carnet","Carnet"]};
  let tNav, aNav, foot, tarotFoot = "", pillEl = null;
  const ASTRO_FOOT = `<p class="foot-line">L'astrologie est proposée ici comme un langage symbolique et un patrimoine culturel, pour réfléchir et apprendre : elle ne remplace pas l'avis d'un médecin, d'un juriste ou d'un conseiller financier. <button type="button" class="foot-cred" data-credits>Crédits et sources</button></p>`;
  const reduce = () => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } };
  const redraw = () => { if(typeof drawBackground === "function") try{ drawBackground(); }catch(e){} };
  function setAmbiance(on){
    document.documentElement.classList.toggle("u-astro", on);
    document.body.classList.toggle("u-astro", on);
    if(!on){ document.documentElement.classList.remove("u-night"); document.body.classList.remove("u-night"); }
    redraw(); syncPill();
  }
  function aView(v){
    if(!VIEWS.includes(v)) v = "ciel";
    if(st.univers !== "astro") enterAstro(v, true);
    st.vue = v; save();
    const night = v === "ciel", was = document.documentElement.classList.contains("u-night");
    document.documentElement.classList.toggle("u-night", night); document.body.classList.toggle("u-night", night);
    if(night !== was) redraw();
    const nv = v === "quiz" ? "apprendre" : v;
    qa(".view").forEach(s => s.hidden = s.id !== "v-a-" + v);
    qa("button", aNav).forEach(b => b.setAttribute("aria-current", b.dataset.aview === nv ? "page" : "false"));
    try{ history.replaceState(null, "", "#astro-" + v); }catch(e){}
    if(v === "ciel") renderCiel(); if(v === "theme") renderTheme(); if(v === "apprendre") renderLearn(); if(v === "quiz") renderQuiz(); if(v === "histoire") renderHist(); if(v === "moi") renderMoi();
    window.scrollTo({top:0});
  }
  const MG = () => window.ArcanesMagie, inMagie = () => !!(MG() && MG().active());
  const AL = () => window.ArcanesAlchimie, inAlch = () => !!(AL() && AL().active());
  const PS = () => window.ArcanesPsyche, inPsy = () => !!(PS() && PS().active());
  function enterAstro(v, silent){
    if(inMagie()) MG().leave(); if(inAlch()) AL().leave(); if(inPsy()) PS().leave();
    st.univers = "astro"; save();
    tNav.hidden = true; aNav.hidden = false;
    if(foot) foot.innerHTML = ASTRO_FOOT;
    setAmbiance(true); loadImgs();
    if(!silent) aView(v || st.vue || "ciel");
  }
  function enterTarot(v){
    if(inMagie()) MG().leave(); if(inAlch()) AL().leave(); if(inPsy()) PS().leave();
    st.univers = "tarot"; save();
    tNav.hidden = false; aNav.hidden = true;
    if(foot && tarotFoot) foot.innerHTML = tarotFoot;
    setAmbiance(false);
    if(typeof setView === "function") setView(v || "jour");
  }
  /* Changer d'art, avec un fondu enchaîné quand le navigateur sait le faire */
  const curU = () => inPsy() ? "psyche" : inAlch() ? "alchimie" : inMagie() ? "magie" : document.documentElement.classList.contains("u-astro") ? "astro" : "tarot";
  function enterAlch(v){
    if(!AL()) return;
    if(inMagie()) MG().leave(); if(inPsy()) PS().leave();
    if(document.documentElement.classList.contains("u-astro")){ document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night"); }
    if(foot && tarotFoot && aNav && !aNav.hidden) foot.innerHTML = tarotFoot;
    st.univers = "alchimie"; save();
    AL().enter(v); redraw(); syncPill();
  }
  function enterMagie(v){
    if(!MG()) return;
    if(inAlch()) AL().leave(); if(inPsy()) PS().leave();
    if(document.documentElement.classList.contains("u-astro")){ document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night"); }
    if(foot && tarotFoot && aNav && !aNav.hidden) foot.innerHTML = tarotFoot;
    st.univers = "magie"; save();
    MG().enter(v); redraw(); syncPill();
  }
  function enterPsy(v){
    if(!PS()) return;
    if(inMagie()) MG().leave(); if(inAlch()) AL().leave();
    if(document.documentElement.classList.contains("u-astro")){ document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night"); }
    if(foot && tarotFoot && aNav && !aNav.hidden) foot.innerHTML = tarotFoot;
    st.univers = "psyche"; save();
    PS().enter(v); redraw(); syncPill();
  }
  function switchTo(u, v){
    if(u === curU()){ if(v){ if(u === "psyche") PS().view(v); else if(u === "alchimie") AL().go(v); else if(u === "magie") MG().view(v); else if(u === "astro") aView(v); else if(typeof setView === "function") setView(v); } return; }
    const go = () => { if(u === "psyche") enterPsy(v); else if(u === "alchimie") enterAlch(v); else if(u === "magie") enterMagie(v); else if(u === "astro") enterAstro(v || (VIEWS.includes(st.vue) ? st.vue : "ciel")); else enterTarot(v); };
    if(document.startViewTransition && !reduce()){ try{ document.startViewTransition(go); return; }catch(e){} }
    go();
  }
  /* Le sélecteur Tarot · Astrologie, dans l'en-tête */
  function syncPill(){
    if(!pillEl) return;
    const u = curU();
    qa("[data-u]", pillEl).forEach(b => { const on = b.dataset.u === u; b.setAttribute("aria-selected", on ? "true" : "false"); b.tabIndex = on ? 0 : -1; });
    const cur = q1(`[data-u="${u}"]`, pillEl), ind = q1(".u-ind", pillEl);
    if(cur && ind && cur.offsetWidth){ ind.style.width = cur.offsetWidth + "px"; ind.style.transform = `translateX(${cur.offsetLeft}px)`; }
  }
  function makePill(){
    const p = document.createElement("div"); p.className = "u-pill"; p.setAttribute("role", "tablist"); p.setAttribute("aria-label", "Choisir un art");
    p.innerHTML = `<i class="u-ind" aria-hidden="true"></i><button type="button" role="tab" data-u="tarot">Tarot</button><button type="button" role="tab" data-u="astro"><span class="u-l">Astrologie</span><span class="u-s">Astro</span></button>${window.ArcanesMagie ? `<button type="button" role="tab" data-u="magie">Magie</button>` : ""}${window.ArcanesAlchimie ? `<button type="button" role="tab" data-u="alchimie"><span class="u-l">Alchimie</span><span class="u-s">Alchi</span></button>` : ""}${window.ArcanesPsyche ? `<button type="button" role="tab" data-u="psyche"><span class="u-l">Psyché</span><span class="u-s">Psy</span></button>` : ""}`;
    if(window.ArcanesAlchimie) p.classList.add("four"); if(window.ArcanesPsyche) p.classList.add("five");
    qa("[data-u]", p).forEach(b => b.onclick = () => switchTo(b.dataset.u));
    p.addEventListener("keydown", e => { if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key)) return; e.preventDefault();
      const U = qa("[data-u]", p).map(b => b.dataset.u), i = U.indexOf(curU());
      const u = e.key === "Home" ? U[0] : e.key === "End" ? U[U.length - 1] : U[(i + (e.key === "ArrowLeft" ? U.length - 1 : 1)) % U.length]; switchTo(u); const b = q1(`[data-u="${u}"]`, p); if(b) b.focus(); });
    return p;
  }
  /* Mon espace : un seul espace, deux onglets (tarot, astrologie) */
  const espaceBar = cur => `<div class="esp-bar" role="tablist" aria-label="Mon espace"><button type="button" role="tab" data-esp="tarot" aria-selected="${cur === "tarot"}">Tarot</button><button type="button" role="tab" data-esp="astro" aria-selected="${cur === "astro"}">Astrologie</button>${window.ArcanesMagie ? `<button type="button" role="tab" data-esp="magie" aria-selected="${cur === "magie"}">Magie</button>` : ""}${window.ArcanesAlchimie ? `<button type="button" role="tab" data-esp="alchimie" aria-selected="${cur === "alchimie"}">Alchimie</button>` : ""}${window.ArcanesPsyche ? `<button type="button" role="tab" data-esp="psyche" aria-selected="${cur === "psyche"}">Psyché</button>` : ""}</div>${window.ArcanesChemin ? window.ArcanesChemin.chip() : ""}`;
  function bindEspace(root){ qa("[data-esp]", root).forEach(b => b.onclick = () => { if(b.dataset.esp === "psyche") switchTo("psyche", "carnet"); else if(b.dataset.esp === "alchimie") switchTo("alchimie", "carnet"); else if(b.dataset.esp === "magie") switchTo("magie", "carnet"); else if(b.dataset.esp === "astro") switchTo("astro", "moi"); else switchTo("tarot", "journal"); }); }

  function init(){
    tNav = q1(".top .nav"); if(!tNav) return;
    foot = q1(".foot"); tarotFoot = foot ? foot.innerHTML : "";
    aNav = document.createElement("nav"); aNav.className = "nav anav"; aNav.setAttribute("aria-label", "Sections de l'astrologie"); aNav.hidden = true;
    aNav.innerHTML = NAVV.map(v => `<button type="button" data-aview="${v}">${ICO[v]}<span class="l-long">${LAB[v][0]}</span><span class="l-short">${LAB[v][1]}</span></button>`).join("");
    tNav.after(aNav);
    qa("button", aNav).forEach(b => b.onclick = () => { const v = b.dataset.aview; if(v === "apprendre" && ["apprendre","quiz"].includes(st.vue)) lv = {mod:null, lec:null, fiches:null}; if(v === "theme") editing = false; aView(v); });
    const main = q1("main");
    VIEWS.forEach(v => { const s = document.createElement("section"); s.className = "view a-view"; s.id = "v-a-" + v; s.hidden = true; main.appendChild(s); });
    document.addEventListener("click", e => { const g = e.target.closest && e.target.closest("[data-thgo],[data-ades]"); if(!g) return;
      if(g.hasAttribute("data-ades")){ desFrom = st.vue; thMode = "des"; } else { thMode = "natal"; editing = false; thTab = g.dataset.thgo; const me = st.themes.find(x => x.moi); if(me) st.cur = me.id; }
      aView("theme"); if(!g.hasAttribute("data-ades")) setTimeout(() => { const tb = q1("#v-a-theme .a-tabs"); if(tb) tb.scrollIntoView({block:"start"}); }, 60); });
    document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-agoto]"); if(b){ if(typeof closeSheet === "function" && !document.getElementById("sheet").hidden) closeSheet(); aView(b.dataset.agoto); } });
    document.addEventListener("click", e => { const b = e.target.closest && e.target.closest('[data-afiche^="l:"]'); if(b){ lv = {mod:b.dataset.afiche.slice(2), lec:null, fiches:null}; if(typeof closeSheet === "function") closeSheet(); aView("apprendre"); } }, true);
    // l'en-tête : le logo ramène à l'accueil de l'art en cours, la pilule change d'art
    const brand = q1(".brand");
    if(brand){ brand.removeAttribute("data-view"); brand.setAttribute("aria-label", "Arcanes, accueil");
      brand.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); if(inPsy()) PS().view("jour"); else if(inAlch()) AL().view("athanor"); else if(inMagie()) MG().view("moment"); else if(st.univers === "astro") aView("ciel"); else if(typeof setView === "function") setView("jour"); }, true);
      pillEl = makePill(); const grp = document.createElement("div"); grp.className = "brand-grp"; brand.before(grp); grp.append(brand, pillEl); }
    document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("#v-a-moi [data-esp]"); if(!b) return; if(b.dataset.esp === "psyche") switchTo("psyche", "carnet"); else if(b.dataset.esp === "alchimie") switchTo("alchimie", "carnet"); else if(b.dataset.esp === "magie") switchTo("magie", "carnet"); else if(b.dataset.esp === "tarot") switchTo("tarot", "journal"); });
    window.addEventListener("resize", syncPill);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(syncPill);
    // un lien interne du tarot alors qu'on est en astrologie : on revient au tarot
    if(typeof setView === "function"){ const sv = setView; window.setView = setView = function(v){
        if(inMagie()) MG().leave(); if(inAlch()) AL().leave(); if(inPsy()) PS().leave();
        if(document.documentElement.classList.contains("u-astro") || st.univers === "magie" || st.univers === "alchimie" || st.univers === "psyche"){ st.univers = "tarot"; save(); tNav.hidden = false; aNav.hidden = true; if(foot && tarotFoot) foot.innerHTML = tarotFoot; setAmbiance(false); }
        const r = sv.apply(this, arguments);
        if(v === "journal"){ const j = document.getElementById("v-journal"); if(j && !q1(".esp-bar", j)){ j.insertAdjacentHTML("afterbegin", espaceBar("tarot")); bindEspace(j); } }
        return r; }; }
    const h0 = (window.__arcanesHash || "").replace("#", "");
    if(h0.startsWith("psyche-") && PS()) enterPsy(h0.slice(7));
    else if(h0.startsWith("alchimie-") && AL()) enterAlch(h0.slice(9));
    else if(h0.startsWith("magie-") && MG()) enterMagie(h0.slice(6));
    else if(h0.startsWith("astro-")) enterAstro(h0.slice(6));
    else if(st.univers === "psyche" && PS() && !VIEWS_T.includes(h0)) enterPsy();
    else if(st.univers === "alchimie" && AL() && !VIEWS_T.includes(h0)) enterAlch();
    else if(st.univers === "magie" && MG() && !VIEWS_T.includes(h0)) enterMagie();
    else if(st.univers === "astro" && !VIEWS_T.includes(h0)) enterAstro(VIEWS.includes(st.vue) ? st.vue : "ciel");
    else syncPill();
    requestAnimationFrame(syncPill);
  }
  const VIEWS_T = ["jour","tirer","apprendre","histoire","chemin","lames","journal"];
  window.ArcanesAstro = {aView, enterAstro, enterTarot, switchTo, syncPill, espace:{bar:espaceBar, bind:bindEspace}, state:() => st, cielWhen:() => cielWhen, wheel, helpers:{gl, pg, sgl, fmtPos, fmtDeg, fiche, school, ROM, h, cap}};
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
