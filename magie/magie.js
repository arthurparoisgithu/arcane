/* ===== Arcanes · Magie : l'interface =====
   Un troisième univers à côté du tarot et de l'astrologie, avec la même logique :
   Le moment (l'heure planétaire), L'atelier (les outils), L'école (huit modules), Histoire, Le carnet.
   On y entre par la pilule Tarot · Astrologie · Magie de l'en-tête. Le calcul du ciel vient du moteur de l'astrologie. */
(() => {
  if(typeof MAGIE_DATA === "undefined" || typeof MAGIE_COURS === "undefined") return;
  const D = MAGIE_DATA, K = MAGIE_COURS, T = D.T, PL = D.PL;
  const AC = typeof ASTRO_CALC !== "undefined" ? ASTRO_CALC : null;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
  const f1 = n => (+n).toFixed(1);
  const nb = t => String(t ?? "").replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");
  const rad = Math.PI/180, DAY = 864e5;
  const gl = (s, cls = "") => `<span class="ag mg ${cls}" aria-hidden="true">${s}${T}</span>`;
  const pg = id => `<span class="ag mg" style="color:${PL[id].hex}" aria-hidden="true">${PL[id].gl}${T}</span>`;
  const ST = {doc:["Documenté","st-doc"], trad:["Tradition","st-trad"], mod:["Lecture moderne","st-mod"]};
  const badge = k => `<span class="m-st ${ST[k][1]}">${ST[k][0]}</span>`;

  /* ---------- mémoire ---------- */
  const STORE = "arcanes.magie.v1";
  const DEF = () => ({vue:"moment", done:[], best:{}, carnet:[], sceaux:[], last:null, signaux:[]});
  const load = () => { try{ const v = JSON.parse(localStorage.getItem(STORE) || "{}"); return Object.assign(DEF(), v && typeof v === "object" ? v : {}); }catch(e){ return DEF(); } };
  let st = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(st)); }catch(e){} };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  /* ---------- les gravures (chargées à la première visite) ---------- */
  const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  const IMG = k => (window.MAGIE_IMG && window.MAGIE_IMG[k]) || BLANK;
  let imgLoading = false;
  function loadImgs(){
    if(window.MAGIE_IMG || imgLoading) return; imgLoading = true;
    const sc = document.createElement("script"); sc.src = "magie/magie-img.js"; sc.async = true;
    sc.onload = () => { if(active()) qa(".m-view img[data-mimg]").forEach(i => i.src = IMG(i.dataset.mimg)); };
    sc.onerror = () => { imgLoading = false; };
    document.head.appendChild(sc);
  }
  const img = (k, alt = "", cls = "") => `<img class="${cls}" data-mimg="${k}" src="${IMG(k)}" alt="${h(alt)}">`;
  const CRED = {
    lab:"Heinrich Khunrath, l'oratoire-laboratoire, Amphitheatrum sapientiae aeternae, 1609",
    homme:"L'homme dans le carré, Agrippa, De occulta philosophia, 1533",
    tmercure:"La table de Mercure, Agrippa, Three Books of Occult Philosophy, Londres, 1651",
    pentacles:"Pentacles, Agrippa, Three Books of Occult Philosophy, 1651",
    influences:"Les planètes et les signes versent leur influence sur l'homme, gravure, XVIIe siècle",
    singe:"Le singe de la Nature, Robert Fludd, Utriusque cosmi historia, 1618",
    necessite:"La Nécessité entourée des planètes et des Sirènes, gravure",
    kircher:"Kircher guidé par un ange à travers les sphères, Iter exstaticum, 1660",
    hibou:"La chouette de Khunrath, vers 1600",
    ktitre:"Khunrath, Amphitheatrum sapientiae aeternae, page de titre, 1609",
    monas:"La Monade hiéroglyphique de John Dee, 1564",
    grimoire:"Un philosophe se moque de la magie, gravure, XVIIIe siècle",
    p_agrippa:"Agrippa, gravure sur bois, 1533", p_dee:"John Dee, gravure, 1658", p_fludd:"Robert Fludd, gravure, 1626", p_khunrath:"Heinrich Khunrath, gravure, 1602"
  };

  /* ---------- le lieu et le ciel (moteur de l'astrologie) ---------- */
  const lieu = () => { try{ return window.ArcanesAstro.state().lieu; }catch(e){ return {nom:"Paris (France)", lat:48.857, lon:2.352, tz:"Europe/Paris"}; } };
  const fmt = (d, o) => { try{ return d.toLocaleString("fr-FR", Object.assign({timeZone:lieu().tz}, o)); }catch(e){ return d.toLocaleString("fr-FR", o); } };
  const HM = {hour:"2-digit", minute:"2-digit"};
  const wdOf = d => { try{ return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(new Intl.DateTimeFormat("en-US", {timeZone:lieu().tz, weekday:"short"}).format(d)); }catch(e){ return d.getDay(); } };
  /* les 24 heures planétaires du « jour planétaire » (du lever au lever suivant) qui contient la date */
  function hoursOf(date){
    const A = window.Astronomy; if(!A) return null;
    try{
      const L = lieu(), obs = new A.Observer(L.lat, L.lon, 0);
      let rise = A.SearchRiseSet(A.Body.Sun, obs, +1, new Date(date.getTime() - 1.6*DAY), 2); if(!rise) return null;
      for(let i = 0; i < 4; i++){ const n = A.SearchRiseSet(A.Body.Sun, obs, +1, new Date(rise.date.getTime() + 3600000), 2); if(!n || n.date > date) break; rise = n; }
      const set = A.SearchRiseSet(A.Body.Sun, obs, -1, rise.date, 1), next = set && A.SearchRiseSet(A.Body.Sun, obs, +1, set.date, 1);
      if(!set || !next) return null;
      const day = D.WEEK[wdOf(rise.date)], c0 = D.CHALD.indexOf(day), dl = (set.date - rise.date)/12, nl = (next.date - set.date)/12;
      const hours = [];
      for(let i = 0; i < 24; i++){ const s = i < 12 ? rise.date.getTime() + i*dl : set.date.getTime() + (i - 12)*nl, e = s + (i < 12 ? dl : nl);
        hours.push({i, start:new Date(s), end:new Date(e), pl:D.CHALD[(c0 + i) % 7], jour:i < 12}); }
      const cur = hours.findIndex(x => date >= x.start && date < x.end);
      return {day, rise:rise.date, set:set.date, next:next.date, hours, cur};
    }catch(e){ return null; }
  }
  const PHASES = ["Nouvelle Lune","Premier croissant","Premier quartier","Lune gibbeuse croissante","Pleine Lune","Lune gibbeuse décroissante","Dernier quartier","Dernier croissant"];
  function moon(date){
    if(!AC) return null;
    try{ const m = AC.moonInfo(date), lon = AC.lonOf("lune", date), k = AC.si(lon); return {phase:m.phase, ill:m.ill, nom:PHASES[m.idx % 8], croit:m.phase < 180, signe:AC.SG[k], k, next:(AC.lunations(date, 1) || [])[0]}; }catch(e){ return null; }
  }
  const PID = {saturne:"saturne", jupiter:"jupiter", mars:"mars", soleil:"soleil", venus:"venus", mercure:"mercure", lune:"lune"};
  function etat(pid, date, diurne){
    const p = AC.posOf(pid, date), dg = AC.dignities(pid, p.lon, diurne).list, k = AC.si(p.lon);
    return {lon:p.lon, retro:p.retro, signe:AC.SG[k], fort:dg.includes("domicile") || dg.includes("exaltation"), faible:dg.includes("exil") || dg.includes("chute"), dg};
  }

  /* ================================================================
     LES DESSINS
     ================================================================ */
  /* l'heptagramme de la semaine : les sept planètes dans l'ordre chaldéen, reliées de trois en trois */
  const HPOS = i => { const a = (-90 + i*360/7)*rad; return [Math.cos(a), Math.sin(a)]; };
  function heptaSVG(o = {}){
    const R = o.R || 112, cls = o.cls || "";
    const P = id => { const [x, y] = HPOS(D.CHALD.indexOf(id)); return [x*R, y*R]; };
    let s = `<svg class="m-hepta ${cls}" viewBox="-160 -160 320 320" role="img" aria-label="${h(o.label || "L'heptagramme des jours et des heures")}">`;
    if(o.ring){ // les 24 heures du jour planétaire
      const H = o.ring.hours, total = o.ring.next - o.ring.rise, a = t => -90 + (t - o.ring.rise)/total*360;
      const arc = (a0, a1, r0, r1) => { const p = (aa, r) => [r*Math.cos(aa*rad), r*Math.sin(aa*rad)], [x0, y0] = p(a0, r1), [x1, y1] = p(a1, r1), [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0), big = a1 - a0 > 180 ? 1 : 0;
        return `M${f1(x0)} ${f1(y0)}A${r1} ${r1} 0 ${big} 1 ${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}A${r0} ${r0} 0 ${big} 0 ${f1(x3)} ${f1(y3)}Z`; };
      H.forEach((x, i) => { const a0 = a(x.start), a1 = a(x.end) - .6, on = i === o.ring.cur;
        s += `<path d="${arc(a0, a1, 140, 152)}" class="m-hr${x.jour ? " j" : " n"}${on ? " on" : ""}" style="${on ? `fill:${PL[x.pl].hex}` : ""}"><title>${PL[x.pl].nom}</title></path>`; });
      const pr = (o.now - o.ring.rise)/total, na = (-90 + pr*360)*rad;
      s += `<line x1="${f1(Math.cos(na)*134)}" y1="${f1(Math.sin(na)*134)}" x2="${f1(Math.cos(na)*158)}" y2="${f1(Math.sin(na)*158)}" class="m-now"/>`;
      const sa = a(o.ring.set)*rad; s += `<circle cx="${f1(Math.cos(sa)*146)}" cy="${f1(Math.sin(sa)*146)}" r="2.6" class="m-sunset"/>`;
    }
    s += `<circle r="${R + 18}" class="m-h-out"/><circle r="${R - 22}" class="m-h-in"/>`;
    const order = [0, 3, 6, 2, 5, 1, 4];
    let d = "";
    order.forEach((ci, k) => { const [x, y] = HPOS(ci); d += (k ? "L" : "M") + f1(x*R) + " " + f1(y*R); });
    s += `<path d="${d}Z" class="m-h-star"/>`;
    if(o.drawn){ // les jours déjà parcourus dans le schéma
      let dd = ""; o.drawn.forEach((id, k) => { const [x, y] = P(id); dd += (k ? "L" : "M") + f1(x) + " " + f1(y); });
      s += `<path d="${dd}" class="m-h-walk"/>`;
    }
    if(o.hourStep != null){ // la boucle des heures
      const [x0, y0] = P(o.hourFrom), [x1, y1] = P(o.hourPl);
      s += `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" class="m-h-hop"/>`;
    }
    D.CHALD.forEach(id => { const [x, y] = P(id), p = PL[id], isDay = o.day === id, isHour = o.hour === id;
      s += `<g class="m-h-node${isDay ? " day" : ""}${isHour ? " hour" : ""}" data-mpl="${id}" role="button" tabindex="0" aria-label="${p.nom}">
        <circle cx="${f1(x)}" cy="${f1(y)}" r="19" class="m-h-disc" style="${isHour ? `fill:${p.hex};stroke:${p.hex}` : ""}"/>
        <text x="${f1(x)}" y="${f1(y + 1)}" class="m-h-gl" style="${isHour ? "fill:#fff" : `fill:${p.hex}`}">${p.gl}${T}</text>
        ${o.labels !== false ? `<text x="${f1(x*1.36)}" y="${f1(y*1.36 + 1)}" class="m-h-lab">${o.dayNames ? cap(p.jour) : p.nom}</text>` : ""}</g>`; });
    if(o.center) s += o.center;
    return s + `</svg>`;
  }

  /* le carré magique, et le tracé d'un sceau */
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/Œ/g, "OE").replace(/Æ/g, "AE");
  const digits = v => String(v).split("").reduce((a, b) => a + +b, 0);
  function sceauNums(mot, n){
    const max = n*n, out = [];
    norm(mot).replace(/[^A-Z]/g, "").split("").forEach(c => { let v = c.charCodeAt(0) - 64; while(v > max) v = digits(v); out.push({c, v}); });
    return out;
  }
  function kameaSVG(pid, o = {}){
    const M = D.KAMEAS[pid], n = M.length, S = 300, c = S/n, fs = Math.min(30, c*.42);
    const pos = {}; M.forEach((row, i) => row.forEach((v, j) => pos[v] = [j*c + c/2, i*c + c/2]));
    let s = `<svg class="m-kamea${o.cls ? " " + o.cls : ""}" viewBox="-6 -6 ${S + 12} ${S + 12}" role="img" aria-label="${h(o.label || "Carré de " + PL[pid].nom)}">`;
    s += `<rect x="-4" y="-4" width="${S + 8}" height="${S + 8}" class="m-k-frame"/>`;
    M.forEach((row, i) => row.forEach((v, j) => { const hl = o.hl && o.hl(i, j);
      s += `<rect x="${f1(j*c)}" y="${f1(i*c)}" width="${f1(c)}" height="${f1(c)}" class="m-k-cell${hl ? " hl" : ""}" data-kc="${i},${j}"/>`;
      s += `<text x="${f1(j*c + c/2)}" y="${f1(i*c + c/2 + 1)}" class="m-k-num${hl ? " hl" : ""}" style="font-size:${f1(fs)}px">${v}</text>`; }));
    if(o.path && o.path.length){
      const pts = []; o.path.forEach(x => { const p = pos[x.v]; if(!pts.length || pts[pts.length-1].v !== x.v) pts.push({v:x.v, p, rep:1}); else pts[pts.length-1].rep++; });
      const d = pts.map((x, k) => (k ? "L" : "M") + f1(x.p[0]) + " " + f1(x.p[1])).join("");
      s += `<path d="${d}" class="m-k-path"${o.anim ? ` pathLength="1"` : ""}/>`;
      const [sx, sy] = pts[0].p; s += `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(c*.16)}" class="m-k-start"/>`;
      pts.forEach(x => { if(x.rep > 1) s += `<circle cx="${f1(x.p[0] + c*.18)}" cy="${f1(x.p[1] - c*.18)}" r="${f1(c*.09)}" class="m-k-rep"/>`; });
      const last = pts[pts.length-1].p, prev = pts.length > 1 ? pts[pts.length-2].p : [last[0] - 1, last[1]];
      let dx = last[0] - prev[0], dy = last[1] - prev[1]; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
      const bl = c*.22; s += `<line x1="${f1(last[0] - dy*bl)}" y1="${f1(last[1] + dx*bl)}" x2="${f1(last[0] + dy*bl)}" y2="${f1(last[1] - dx*bl)}" class="m-k-end"/>`;
    }
    return s + `</svg>`;
  }
  /* le sceau seul (pour le carnet) */
  function sceauSeul(pid, mot){
    return kameaSVG(pid, {path:sceauNums(mot, D.KAMEAS[pid].length), cls:"seul"});
  }

  /* les sigils à la manière de Spare : des lettres superposées */
  const LETTRES = {
    A:[[[0,14],[5,0],[10,14]],[[2.5,8],[7.5,8]]], B:[[[0,0],[0,14]],[[0,0],[6,0],[8.5,1.8],[8.5,5],[6,7],[0,7]],[[6,7],[9,9],[9,12.2],[6.5,14],[0,14]]],
    C:[[[10,2],[7,0],[3,0],[0,3],[0,11],[3,14],[7,14],[10,12]]], D:[[[0,0],[0,14]],[[0,0],[5,0],[10,4],[10,10],[5,14],[0,14]]],
    E:[[[10,0],[0,0],[0,14],[10,14]],[[0,7],[7,7]]], F:[[[10,0],[0,0],[0,14]],[[0,7],[7,7]]],
    G:[[[10,2],[7,0],[3,0],[0,3],[0,11],[3,14],[7,14],[10,11],[10,8],[6,8]]], H:[[[0,0],[0,14]],[[10,0],[10,14]],[[0,7],[10,7]]],
    I:[[[5,0],[5,14]],[[2,0],[8,0]],[[2,14],[8,14]]], J:[[[8,0],[8,11],[5,14],[2,14],[0,11]]],
    K:[[[0,0],[0,14]],[[10,0],[0,8]],[[3,6],[10,14]]], L:[[[0,0],[0,14],[10,14]]], M:[[[0,14],[0,0],[5,8],[10,0],[10,14]]],
    N:[[[0,14],[0,0],[10,14],[10,0]]], O:[[[5,0],[8.5,1.4],[10,5],[10,9],[8.5,12.6],[5,14],[1.5,12.6],[0,9],[0,5],[1.5,1.4],[5,0]]],
    P:[[[0,14],[0,0],[7,0],[10,2.5],[10,5],[7,7.5],[0,7.5]]], Q:[[[5,0],[8.5,1.4],[10,5],[10,9],[8.5,12.6],[5,14],[1.5,12.6],[0,9],[0,5],[1.5,1.4],[5,0]],[[6,10],[10,14]]],
    R:[[[0,14],[0,0],[7,0],[10,2.5],[10,5],[7,7.5],[0,7.5]],[[5,7.5],[10,14]]], S:[[[10,1.5],[7,0],[3,0],[0,2.5],[0,5],[3,6.8],[7,7.2],[10,9],[10,11.5],[7,14],[3,14],[0,12.5]]],
    T:[[[0,0],[10,0]],[[5,0],[5,14]]], U:[[[0,0],[0,10],[3,14],[7,14],[10,10],[10,0]]], V:[[[0,0],[5,14],[10,0]]],
    W:[[[0,0],[2.5,14],[5,5],[7.5,14],[10,0]]], X:[[[0,0],[10,14]],[[10,0],[0,14]]], Y:[[[0,0],[5,7],[10,0]],[[5,7],[5,14]]], Z:[[[0,0],[10,0],[0,14],[10,14]]]
  };
  const VOY = new Set(["A","E","I","O","U","Y"]);
  function spareLetters(phrase, sansVoyelles){
    const all = norm(phrase).replace(/[^A-Z]/g, "").split(""), seen = new Set(), keep = [], marks = [];
    all.forEach(c => { const drop = seen.has(c) || (sansVoyelles && VOY.has(c)); marks.push({c, drop}); if(!drop){ keep.push(c); } seen.add(c); });
    return {all, marks, keep};
  }
  const rnd = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function sigilSVG(letters, variation = 0, o = {}){
    const r = rnd(7919*(variation + 1) + letters.join("").length*131 + letters.join("").charCodeAt(0));
    const ROT = variation ? [0, 0, 45, -45, 90, -90, 180] : [0, 0, 0, 90, -90];
    const segs = [];
    letters.forEach((c, i) => {
      const L = LETTRES[c]; if(!L) return;
      const mx = r() < .5 ? -1 : 1, sc = .5 + r()*.45, rot = ROT[Math.floor(r()*ROT.length)]*rad;
      const ox = (r() - .5)*(i ? 9 : 0), oy = (r() - .5)*(i ? 9 : 0);
      L.forEach(pl => { segs.push(pl.map(([x, y]) => { let X = (x - 5)*mx*sc, Y = (y - 7)*sc;
        const xx = X*Math.cos(rot) - Y*Math.sin(rot), yy = X*Math.sin(rot) + Y*Math.cos(rot);
        return [xx + ox, yy + oy]; })); });
    });
    // recentrer et mettre à l'échelle dans le cercle
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    segs.forEach(pl => pl.forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }));
    const k = segs.length ? 132/Math.max(x1 - x0, y1 - y0, 1) : 1, cx = (x0 + x1)/2, cy = (y0 + y1)/2;
    segs.forEach(pl => pl.forEach(p => { p[0] = (p[0] - cx)*k; p[1] = (p[1] - cy)*k; }));
    // supprimer les traits en double (les lettres qui partagent une même barre)
    const key = pl => pl.map(([x, y]) => Math.round(x/5) + ":" + Math.round(y/5)).join("|"), seen = new Set(), uniq = [];
    segs.forEach(pl => { const k1 = key(pl), k2 = key([...pl].reverse()); if(seen.has(k1) || seen.has(k2)) return; seen.add(k1); uniq.push(pl); });
    const d = uniq.map(pl => pl.map(([x, y], k) => (k ? "L" : "M") + f1(x) + " " + f1(y)).join("")).join("");
    const ends = uniq.length ? [uniq[0][0], uniq[uniq.length-1][uniq[uniq.length-1].length-1]] : [];
    let s = `<svg class="m-sigil${o.cls ? " " + o.cls : ""}" viewBox="-110 -110 220 220" role="img" aria-label="Un sigil">`;
    if(o.cercle !== false) s += `<circle r="104" class="m-sg-ring"/><circle r="98" class="m-sg-ring2"/>`;
    s += `<path d="${d}" class="m-sg-path"${o.anim ? ` pathLength="1"` : ""}/>`;
    if(ends.length) s += `<circle cx="${f1(ends[0][0])}" cy="${f1(ends[0][1])}" r="4" class="m-sg-dot"/><circle cx="${f1(ends[1][0])}" cy="${f1(ends[1][1])}" r="2.6" class="m-sg-dot"/>`;
    return s + `</svg>`;
  }

  /* l'Arbre de vie */
  const SEP = Object.fromEntries(D.SEPHIROTH.map(s => [s.n, s]));
  function treeSVG(o = {}){
    const mode = o.mode || "lettres";
    let s = `<svg class="m-tree" viewBox="0 0 300 540" role="img" aria-label="L'Arbre de vie, ses dix sephiroth et ses vingt-deux sentiers">`;
    s += `<g class="m-t-pillars"><line x1="50" y1="70" x2="50" y2="400"/><line x1="250" y1="70" x2="250" y2="400"/><line x1="150" y1="20" x2="150" y2="525"/></g>`;
    s += `<circle cx="150" cy="155" r="18" class="m-t-daath"/>`;
    D.PATHS.forEach(p => { const a = SEP[p.a], b = SEP[p.b], on = o.path === p.n;
      s += `<g class="m-t-path${on ? " on" : ""}" data-mpath="${p.n}" role="button" tabindex="0" aria-label="Sentier ${p.n}, ${p.lettre}, ${p.lameNom}">
        <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="m-t-hit"/><line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="m-t-line ${p.type}"/></g>`; });
    D.PATHS.forEach(p => { const a = SEP[p.a], b = SEP[p.b]; let t = .5;
      if(p.n === 13) t = .62; if(p.n === 25) t = .45; if(p.n === 32) t = .5;
      const x = a.x + (b.x - a.x)*t, y = a.y + (b.y - a.y)*t;
      const lab = mode === "lettres" ? `<text x="${f1(x)}" y="${f1(y + 1)}" class="m-t-heb">${p.heb}</text>` : mode === "lames" ? `<text x="${f1(x)}" y="${f1(y + 1)}" class="m-t-num">${p.num}</text>` : `<text x="${f1(x)}" y="${f1(y + 1)}" class="m-t-num">${p.n}</text>`;
      s += `<g class="m-t-tag" data-mpath="${p.n}" pointer-events="none"><circle cx="${f1(x)}" cy="${f1(y)}" r="9.5" class="m-t-tagbg"/>${lab}</g>`; });
    s += `<path class="m-t-flash" d="M150 42 L250 98 L50 98 L250 212 L50 212 L150 270 L250 370 L50 370 L150 430 L150 500" pathLength="1"/>`;
    D.SEPHIROTH.forEach(x => { const on = o.sep === x.n;
      let fill = `fill="${x.hex}"`;
      s += `<g class="m-t-sep${on ? " on" : ""}" data-msep="${x.n}" role="button" tabindex="0" aria-label="${x.nom}, ${x.sens}">`;
      if(x.hex === "quart"){ s += `<g class="m-t-quart"><path d="M${x.x} ${x.y}L${x.x - 16} ${x.y - 16}A22.6 22.6 0 0 1 ${x.x + 16} ${x.y - 16}Z" fill="#c9b037"/><path d="M${x.x} ${x.y}L${x.x + 16} ${x.y - 16}A22.6 22.6 0 0 1 ${x.x + 16} ${x.y + 16}Z" fill="#6b7a2e"/><path d="M${x.x} ${x.y}L${x.x + 16} ${x.y + 16}A22.6 22.6 0 0 1 ${x.x - 16} ${x.y + 16}Z" fill="#1c1a17"/><path d="M${x.x} ${x.y}L${x.x - 16} ${x.y + 16}A22.6 22.6 0 0 1 ${x.x - 16} ${x.y - 16}Z" fill="#8a4b2a"/></g><circle cx="${x.x}" cy="${x.y}" r="22.6" class="m-t-disc ring"/>`; fill = ""; }
      else s += `<circle cx="${x.x}" cy="${x.y}" r="22.6" class="m-t-disc" ${fill}/>`;
      s += `<text x="${x.x}" y="${x.y - 3}" class="m-t-n" fill="${x.txt}">${x.n}</text><text x="${x.x}" y="${x.y + 9}" class="m-t-sheb" fill="${x.txt}">${x.heb}</text>`;
      s += `<text x="${x.x}" y="${x.y + (x.n === 10 ? 36 : 35)}" class="m-t-name">${x.nom}</text></g>`; });
    return s + `</svg>`;
  }

  /* la boussole des éléments (vue de dessus, l'est en haut) */
  function boussoleSVG(cur){
    let s = `<svg class="m-bous" viewBox="-150 -150 300 300" role="img" aria-label="Les quatre quartiers du cercle">`;
    s += `<circle r="140" class="m-b-out"/>`;
    const pos = {air:-90, feu:0, eau:90, terre:180};
    D.ELEMENTS.forEach(e => { const a0 = (pos[e.id] - 45)*rad, a1 = (pos[e.id] + 45)*rad, on = cur === e.id;
      const p = (a, r) => `${f1(Math.cos(a)*r)} ${f1(Math.sin(a)*r)}`;
      s += `<g class="m-b-q${on ? " on" : ""}" data-mel="${e.id}" role="button" tabindex="0" aria-label="${e.dir} : ${e.nom}">
        <path d="M${p(a0, 46)}A46 46 0 0 1 ${p(a1, 46)}L${p(a1, 132)}A132 132 0 0 0 ${p(a0, 132)}Z" style="fill:${e.hex}" class="m-b-wedge"/>
        <text x="${f1(Math.cos(pos[e.id]*rad)*96)}" y="${f1(Math.sin(pos[e.id]*rad)*96 - 7)}" class="m-b-dir">${e.dir.toUpperCase()}</text>
        <text x="${f1(Math.cos(pos[e.id]*rad)*96)}" y="${f1(Math.sin(pos[e.id]*rad)*96 + 11)}" class="m-b-el">${e.nom}</text></g>`; });
    s += `<circle r="44" class="m-b-core"/><path d="M0 -30 L7 -6 L0 -12 L-7 -6Z" class="m-b-arrow"/><text y="16" class="m-b-you">toi</text>`;
    return s + `</svg>`;
  }

  /* le pentagramme, tracé pour bannir ou invoquer (de la Terre) */
  const PENT = (() => { const p = k => { const a = (-90 + k*72)*rad; return [Math.cos(a)*90, Math.sin(a)*90]; }; return {top:p(0), ur:p(1), lr:p(2), ll:p(3), ul:p(4)}; })();
  function pentaSVG(kind, o = {}){
    const ord = kind === "invoquer" ? ["top","ll","ur","ul","lr","top"] : ["ll","top","lr","ul","ur","ll"];
    const d = ord.map((k, i) => (i ? "L" : "M") + f1(PENT[k][0]) + " " + f1(PENT[k][1])).join("");
    const [sx, sy] = PENT[ord[0]], [nx, ny] = PENT[ord[1]];
    const ax = sx + (nx - sx)*.32, ay = sy + (ny - sy)*.32, ang = Math.atan2(ny - sy, nx - sx)/rad;
    return `<svg class="m-penta${o.cls ? " " + o.cls : ""}" viewBox="-120 -120 240 240" role="img" aria-label="Pentagramme ${kind === "invoquer" ? "d'invocation" : "de bannissement"}">
      <circle r="108" class="m-p-ring"/><path d="${d}" class="m-p-ghost"/><path d="${d}" class="m-p-path" pathLength="1"/>
      <circle cx="${f1(sx)}" cy="${f1(sy)}" r="7" class="m-p-start"/><path d="M-7 -6 L7 0 L-7 6Z" transform="translate(${f1(ax)} ${f1(ay)}) rotate(${f1(ang)})" class="m-p-arrow"/></svg>`;
  }

  /* le corps et les cinq centres du Pilier du milieu */
  const PILIER = [
    {y:20, nom:"Kether", lieu:"au-dessus de la tête", dit:"Eheieh", c:"#f6f1e2"},
    {y:92, nom:"Daath", lieu:"à la gorge", dit:"YHVH Elohim", c:"#a99bc4"},
    {y:150, nom:"Tiphareth", lieu:"au cœur", dit:"YHVH Eloah ve-Daath", c:"#e2b04a"},
    {y:228, nom:"Yesod", lieu:"au bas-ventre", dit:"Shaddai El Chai", c:"#8a64b8"},
    {y:330, nom:"Malkuth", lieu:"sous les pieds", dit:"Adonai ha-Aretz", c:"#8a4b2a"}
  ];
  function corpsSVG(k, o = {}){
    let s = `<svg class="m-corps${o.cls ? " " + o.cls : ""}${k === 6 ? " circule" : ""}" viewBox="-90 -10 180 360" role="img" aria-label="Le Pilier du milieu">`;
    s += `<path class="m-c-body" d="M0 34 C-16 34 -22 46 -22 58 C-22 72 -14 82 0 82 C14 82 22 72 22 58 C22 46 16 34 0 34Z M-14 86 C-44 90 -54 104 -56 132 L-60 214 C-60 222 -48 222 -47 214 L-40 140 L-34 214 L-38 318 C-38 328 -22 328 -22 318 L-8 226 L0 226 L8 226 L22 318 C22 328 38 328 38 318 L34 214 L40 140 L47 214 C48 222 60 222 60 214 L56 132 C54 104 44 90 14 86Z"/>`;
    if(k >= 5) s += `<line x1="0" y1="20" x2="0" y2="330" class="m-c-beam"/>`;
    if(k === 6) s += `<path class="m-c-flow" d="M0 330 C-70 300 -74 60 0 20 C74 60 70 300 0 330" pathLength="1"/>`;
    PILIER.forEach((c, i) => { const on = k >= i;
      s += `<circle cx="0" cy="${c.y}" r="${i === 0 ? 15 : 12}" class="m-c-sph${on ? " on" : ""}" style="${on ? `fill:${c.c}` : ""}"/>`;
      if(o.labels) s += `<text x="${i % 2 ? -26 : 26}" y="${c.y + 4}" class="m-c-lab" text-anchor="${i % 2 ? "end" : "start"}">${c.nom}</text>`; });
    return s + `</svg>`;
  }

  /* une silhouette debout, pour la Croix kabbalistique */
  function croixSVG(k){
    const pts = [[0,30],[0,150],[34,104],[-34,104],[0,122]];
    let s = `<svg class="m-croix" viewBox="-100 -10 200 280" role="img" aria-label="La Croix kabbalistique">`;
    s += `<path class="m-c-body" d="M0 8 C-15 8 -21 20 -21 32 C-21 46 -13 56 0 56 C13 56 21 46 21 32 C21 20 15 8 0 8Z M-13 60 C-44 64 -52 78 -54 104 L-58 186 C-58 194 -46 194 -45 186 L-38 112 L-32 186 L-36 262 C-36 270 -20 270 -20 262 L-7 196 L7 196 L20 262 C20 270 36 270 36 262 L32 186 L38 112 L45 186 C46 194 58 194 58 186 L54 104 C52 78 44 64 13 60Z"/>`;
    s += `<circle cx="0" cy="-2" r="11" class="m-c-sph on" style="fill:#fffaf0"/>`;
    if(k >= 1) s += `<line x1="0" y1="-2" x2="0" y2="270" class="m-c-beam"/>`;
    if(k >= 3) s += `<line x1="-80" y1="104" x2="80" y2="104" class="m-c-beam"/>`;
    else if(k >= 2) s += `<line x1="0" y1="104" x2="80" y2="104" class="m-c-beam"/>`;
    pts.forEach((p, i) => { if(i <= k) s += `<circle cx="${p[0]}" cy="${p[1]}" r="${i === k ? 7 : 4.5}" class="m-c-pt${i === k ? " on" : ""}"/>`; });
    return s + `</svg>`;
  }

  /* les quartiers du rituel, vus de dessus */
  function cercleRitSVG(k, mode){
    const dirs = [["E",-90,"#c9a227","Raphaël"],["S",0,"#b5361f","Michaël"],["O",90,"#2b5fa0","Gabriel"],["N",180,"#4f6b3a","Auriel"]];
    let s = `<svg class="m-rcercle" viewBox="-150 -150 300 300" role="img" aria-label="Le cercle et les quatre quartiers">`;
    const done = mode === "cercle" || mode === "anges" || mode === "etoile" ? 4 : k + 1;
    if(done >= 1){ const end = mode === "cercle" || mode === "anges" || mode === "etoile" ? 359.9 : k*90; const a0 = -90*rad, a1 = (-90 + end)*rad;
      if(end > 0) s += `<path d="M${f1(Math.cos(a0)*100)} ${f1(Math.sin(a0)*100)}A100 100 0 ${end > 180 ? 1 : 0} 1 ${f1(Math.cos(a1)*100)} ${f1(Math.sin(a1)*100)}" class="m-r-arc"/>`; }
    s += `<circle r="100" class="m-r-guide"/>`;
    dirs.forEach(([l, a, col, ange], i) => { const x = Math.cos(a*rad)*100, y = Math.sin(a*rad)*100, on = i < done, cur = mode === "penta" && i === k;
      if(on){ const P = ["ll","top","lr","ul","ur","ll"].map(p => `${f1(x + PENT[p][0]*.2)} ${f1(y + PENT[p][1]*.2)}`); s += `<path d="M${P.join("L")}" class="m-r-pent${cur ? " cur" : ""}"/>`; }
      s += `<text x="${f1(Math.cos(a*rad)*132)}" y="${f1(Math.sin(a*rad)*132 + 4)}" class="m-r-dir${cur ? " cur" : ""}">${l}</text>`;
      if(mode === "anges") s += `<circle cx="${f1(Math.cos(a*rad)*62)}" cy="${f1(Math.sin(a*rad)*62)}" r="15" style="fill:${col}" class="m-r-ange"/><text x="${f1(Math.cos(a*rad)*62)}" y="${f1(Math.sin(a*rad)*62 + 30)}" class="m-r-alab">${ange}</text>`; });
    if(mode === "etoile") s += `<path d="M0 -26 L22.5 13 L-22.5 13Z M0 26 L22.5 -13 L-22.5 -13Z" class="m-r-hex"/>`;
    s += `<circle r="5" class="m-r-you"/>`;
    return s + `</svg>`;
  }

  /* ================================================================
     LA FEUILLE DU BAS
     ================================================================ */
  function sheet(html){
    const sh = document.getElementById("sheet"); if(!sh) return;
    sh.querySelector(".sheet-body").innerHTML = `<div class="m-sheet">${html}</div>`;
    sh.hidden = false; document.body.classList.add("locked");
    const p = sh.querySelector(".sheet-panel"); if(p) p.scrollTop = 0;
    bindLinks(sh);
  }
  const close = () => { if(typeof closeSheet === "function") closeSheet(); else { const sh = document.getElementById("sheet"); if(sh) sh.hidden = true; document.body.classList.remove("locked"); } };
  function planetSheet(id){
    const p = PL[id], now = new Date(), H = hoursOf(now);
    const nexts = H ? H.hours.filter(x => x.pl === id && x.end > now).slice(0, 3) : [];
    sheet(`<p class="eyebrow">Planète · ${cap(p.jour)}</p><h2><span class="ag mg big" style="color:${p.hex}">${p.gl}${T}</span> ${p.nom}</h2>
      <p class="m-lede">${p.mot} Le verbe de ${p.nom === "Lune" ? "la Lune" : p.nom} : <b>${p.verbe}</b>.</p>
      <h4>Ce qu'elle gouverne</h4><p>${cap(p.domaines)}.</p><p class="help m-left">Son ombre : ${p.ombre}.</p>
      ${corrTable(id)}
      ${nexts.length ? `<h4>Ses prochaines heures aujourd'hui</h4><p>${nexts.map(x => `${fmt(x.start, HM)} – ${fmt(x.end, HM)}`).join(" · ")}</p>` : ""}
      <div class="m-acts"><button type="button" class="btn small" data-mgo="atelier:election:${id}">Choisir un moment</button><button type="button" class="btn ghost small" data-mgo="atelier:sceau:${id}">Son carré</button></div>`);
  }
  function corrTable(id){
    const p = PL[id], sp = SEP[p.sephira];
    return `<dl class="m-corr">
      <div><dt>Jour</dt><dd>${cap(p.jour)}</dd></div><div><dt>Métal</dt><dd>${cap(p.metal)}</dd></div>
      <div><dt>Couleur</dt><dd><i class="m-sw" style="background:${p.hex}"></i>${cap(p.couleur)}</dd></div><div><dt>Pierre</dt><dd>${cap(p.pierre)}</dd></div>
      <div><dt>Plantes</dt><dd>${cap(p.plantes)}</dd></div><div><dt>Parfum</dt><dd>${cap(p.parfum)}</dd></div>
      <div><dt>Nombre et carré</dt><dd>${p.nombre} × ${p.nombre}, ${p.nombre*(p.nombre*p.nombre + 1)/2} par ligne</dd></div><div><dt>Ange du jour</dt><dd>${p.ange} <small>(Heptameron)</small></dd></div>
      <div><dt>Sephira</dt><dd>${sp.nom}, ${sp.sens}</dd></div><div><dt>Lettre</dt><dd><span class="m-heb">${p.lettre}</span> ${p.lettreNom}</dd></div>
      <div class="w"><dt>Lame du tarot</dt><dd>${p.lame.n} · ${p.lame.nom} <small>(Golden Dawn)</small></dd></div></dl>
      <p class="help m-left">Les correspondances varient selon les auteurs : on suit Agrippa et la Golden Dawn. Pour les plantes et les parfums, on a gardé des choix courants et sans danger.</p>`;
  }
  function sepSheet(n){
    const x = SEP[n], pths = D.PATHS.filter(p => p.a === n || p.b === n);
    sheet(`<p class="eyebrow">Sephira ${n} · pilier ${x.pilier === "milieu" ? "du milieu" : x.pilier === "droite" ? "de droite, la Miséricorde" : "de gauche, la Rigueur"}</p>
      <h2><span class="m-heb big">${x.heb}</span> ${x.nom}</h2><p class="m-lede">${cap(x.sens)}.</p><p>${x.dit}</p>
      <dl class="m-corr"><div><dt>Nom divin</dt><dd>${x.nomDivin}</dd></div><div><dt>Archange</dt><dd>${x.archange}</dd></div>
        <div><dt>Sphère</dt><dd>${cap(x.sphere)}</dd></div><div><dt>Couleur</dt><dd>${x.hex === "quart" ? "citrin, olive, roux et noir" : `<i class="m-sw" style="background:${x.hex}"></i>`}</dd></div></dl>
      <h4>Ses sentiers</h4><div class="m-chips">${pths.map(p => `<button type="button" class="chip" data-mpath="${p.n}">${p.n} · ${p.lettre} · ${p.lameNom}</button>`).join("")}</div>
      ${x.planete ? `<div class="m-acts"><button type="button" class="btn ghost small" data-mpl="${x.planete}">Sa planète : ${PL[x.planete].nom}</button></div>` : ""}
      <p class="help m-left">Attributions de la Golden Dawn (couleurs de l'« échelle de la Reine »).</p>`);
  }
  function pathSheet(n){
    const p = D.PATHS.find(x => x.n === n), a = SEP[p.a], b = SEP[p.b];
    sheet(`<p class="eyebrow">Sentier ${p.n} · lettre ${p.type}</p>
      <div class="m-path-head"><img class="m-trump" src="jeux/ws/${p.lame}.webp" alt="${h(p.lameNom)}, tarot Waite-Smith" loading="lazy">
      <div><h2><span class="m-heb big">${p.heb}</span> ${p.lettre}</h2><p class="m-lede">« ${p.sens} »</p>
      <dl class="m-corr one"><div><dt>Lame</dt><dd>${p.num} · ${p.lameNom}</dd></div><div><dt>Astre ou élément</dt><dd>${cap(p.attr)}</dd></div>
      <div><dt>Relie</dt><dd>${a.nom} (${a.sens}) et ${b.nom} (${b.sens})</dd></div></dl></div></div>
      <p>Méditer ce sentier, c'est contempler la lame en sachant qu'elle mène de ${a.nom} à ${b.nom} : ${b.n > a.n ? `de ${a.sens} vers ${b.sens}` : ""}. Dans le sens de la remontée, on part de ${b.nom}.</p>
      <p class="help m-left">Attribution de la Golden Dawn (1888). Lévi, en 1856, rangeait les lames autrement. Illustration : tarot Waite-Smith (1909), dessiné par Pamela Colman Smith, membre de la Golden Dawn.</p>`);
  }

  /* ================================================================
     LES PAGES
     ================================================================ */
  const VIEWS = ["moment","atelier","ecole","histoire","carnet"];
  const ICO = {
    moment:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M12 4.2L15.6 18.5 5.3 9.4 18.7 9.4 8.4 18.5Z" stroke-width="1.1"/></svg>`,
    atelier:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6.2"/><path d="M8.6 9.2l6.8 5.6M9.4 15.6c1.6-4 3.6-6.2 6-7" stroke-width="1.15"/><circle cx="8.6" cy="9.2" r=".9" fill="currentColor"/></svg>`,
    ecole:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.4c-2.3-1.7-5.4-2.1-8.5-1.4v13.2c3.1-.7 6.2-.3 8.5 1.4 2.3-1.7 5.4-2.1 8.5-1.4V5c-3.1-.7-6.2-.3-8.5 1.4z"/><path d="M12 6.4v12.8"/><path d="M15.6 8.4l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" stroke-width="1"/></svg>`,
    histoire:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h10.5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H8.5"/><path d="M6.5 4.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2V8.5"/><path d="M8 11.5h7M8 14.5h5" stroke-width="1.1"/></svg>`,
    carnet:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h11.5a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H5z"/><path d="M8 3.5v17"/><path d="M20.5 3.8l-6.2 8.4-.6 2.4 2.1-1.4 6.2-8.4z" stroke-width="1.05"/></svg>`
  };
  const LAB = {moment:["Le moment","Moment"], atelier:["L'atelier","Atelier"], ecole:["L'école","École"], histoire:["Histoire","Histoire"], carnet:["Le carnet","Carnet"]};
  const FOOT = `<p class="foot-line">La magie est présentée ici comme un patrimoine culturel et une pratique symbolique, pour réfléchir et apprendre : elle ne remplace pas l'avis d'un médecin, d'un psychologue, d'un juriste ou d'un conseiller financier. <button type="button" class="foot-cred" data-credits>Crédits et sources</button></p>`;
  let mNav = null, inited = false, on = false, otherFoot = "";
  const active = () => on;

  /* ---------- LE MOMENT ---------- */
  let momTimer = null;
  function renderMoment(){
    const root = q1("#v-m-moment"); if(!root) return;
    const now = new Date(), H = hoursOf(now), L = lieu();
    if(!H || H.cur < 0){ root.innerHTML = `<header class="m-hero"><p class="eyebrow">Le moment</p><h1>Les heures planétaires</h1><p class="m-lede">Le lever et le coucher du soleil n'ont pas pu être calculés pour ${h(L.nom)}. Change de lieu dans l'astrologie, onglet Mon espace.</p></header>`; return; }
    const cur = H.hours[H.cur], hp = PL[cur.pl], dp = PL[H.day], M = moon(now);
    const rest = Math.round((cur.end - now)/60000);
    const center = `<g class="m-h-center"><circle r="40" class="m-h-cdisc"/><text y="-6" class="m-h-cgl" style="fill:${hp.hex}">${hp.gl}${T}</text><text y="22" class="m-h-ctx">heure ${cur.jour ? cur.i + 1 : cur.i - 11}</text><text y="32" class="m-h-ctx">${cur.jour ? "du jour" : "de la nuit"}</text></g>`;
    const prochaines = H.hours.slice(H.cur + 1, H.cur + 5);
    root.innerHTML = `
      <header class="m-hero m-hero-moment"><p class="eyebrow">${cap(fmt(now, {weekday:"long", day:"numeric", month:"long"}))} · ${h(L.nom)}</p>
        <h1>L'heure ${hp.nom === "Lune" ? "de la Lune" : (/^[AEIOUVÉ]/.test(hp.nom) ? "de " : "de ") + hp.nom}</h1>
        <p class="m-lede">Jour ${dp.nom === "Lune" ? "de la Lune" : "de " + dp.nom} · jusqu'à ${fmt(cur.end, HM)}, encore ${rest < 60 ? rest + " min" : Math.floor(rest/60) + " h " + String(rest % 60).padStart(2, "0")}.</p></header>
      <section class="m-clock">${heptaSVG({ring:H, now, day:H.day, hour:cur.pl, center, label:"L'horloge planétaire du jour"})}
        <p class="help">L'anneau extérieur, ce sont les 24 heures du jour planétaire, du lever au lever suivant ; le petit point marque le coucher du soleil. Touche une planète.</p></section>
      <div class="m-grid2">
        <article class="m-card m-hourcard" style="--pc:${hp.hex}"><p class="eyebrow">L'heure</p><h2>${pg(cur.pl)} ${hp.nom}</h2>
          <p class="m-verbe">${hp.mot} Son verbe : <b>${hp.verbe}</b>.</p><p>La tradition lui confie ${hp.domaines}.</p>
          <div class="m-tags"><span>${cap(hp.couleur.split(",")[0])}</span><span>${cap(hp.metal.split(" (")[0])}</span><span>${cap(hp.parfum)}</span></div>
          <div class="m-acts"><button type="button" class="btn small" data-mrite="contemple:${cur.pl}">Cinq minutes avec ${hp.nom === "Lune" ? "la Lune" : hp.nom}</button><button type="button" class="btn ghost small" data-mpl="${cur.pl}">Ses correspondances</button></div></article>
        <article class="m-card"><p class="eyebrow">Le jour</p><h2>${pg(H.day)} ${cap(dp.jour)}</h2>
          <p>Le jour ${dp.nom === "Lune" ? "de la Lune" : "de " + dp.nom}, sous la garde de l'ange <b>${dp.ange}</b> selon l'<i>Heptameron</i>. Il convient à ${dp.domaines.split(", ").slice(0, 3).join(", ")}.</p>
          <p class="help m-left">Lever ${fmt(H.rise, HM)} · coucher ${fmt(H.set, HM)}</p></article>
        ${M ? `<article class="m-card"><p class="eyebrow">La Lune</p><h2>${M.nom}</h2>
          <p>En ${h(M.signe.nom)}, éclairée à ${Math.round(M.ill*100)} %. ${M.croit ? "Elle <b>croît</b> : la tradition y place ce qu'on veut commencer, attirer ou faire grandir." : "Elle <b>décroît</b> : la tradition y place ce qu'on veut terminer, défaire ou éloigner."}</p>
          ${M.next ? `<p class="help m-left">${M.next.type === "nl" ? "Nouvelle Lune" : "Pleine Lune"} le ${fmt(M.next.date, {day:"numeric", month:"long"})} à ${fmt(M.next.date, HM)}</p>` : ""}</article>` : ""}
        <article class="m-card"><p class="eyebrow">Les heures qui viennent</p>
          <ol class="m-next">${prochaines.map(x => `<li><span class="t">${fmt(x.start, HM)}</span>${pg(x.pl)}<span>${PL[x.pl].nom}</span>${x.jour !== cur.jour && x === prochaines.find(y => y.jour !== cur.jour) ? `<em>${x.jour ? "lever" : "coucher"}</em>` : ""}</li>`).join("")}</ol>
          <details class="m-fold in"><summary><span>Les 24 heures</span><i class="a-chev" aria-hidden="true"></i></summary>
            <div class="m-allh"><div><p class="eyebrow">Jour</p>${H.hours.slice(0, 12).map(x => `<p class="${x.i === H.cur ? "on" : ""}"><span class="t">${fmt(x.start, HM)}</span>${pg(x.pl)} ${PL[x.pl].nom}</p>`).join("")}</div>
              <div><p class="eyebrow">Nuit</p>${H.hours.slice(12).map(x => `<p class="${x.i === H.cur ? "on" : ""}"><span class="t">${fmt(x.start, HM)}</span>${pg(x.pl)} ${PL[x.pl].nom}</p>`).join("")}</div></div></details></article>
      </div>
      <p class="eyebrow m-k">Préparer un moment</p>
      <div class="m-quick">
        <button type="button" class="m-qt" data-mgo="atelier:election"><span class="m-qi">${gl("♃")}</span><b>Choisir le moment</b><small>La prochaine bonne fenêtre d'une planète</small></button>
        <button type="button" class="m-qt" data-mrite="carre"><span class="m-qi"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1"/><circle cx="5" cy="5" r="1.8" fill="currentColor"/></svg></span><b>Respirer</b><small>La respiration en carré, 3 minutes</small></button>
        <button type="button" class="m-qt" data-mrite="lbrp"><span class="m-qi"><svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="M-6.5 8.5L0 -10 6.5 8.5 -9.5 -2.5 9.5 -2.5Z"/></svg></span><b>Le Pentagramme</b><small>Faire place nette, 10 minutes</small></button>
        <button type="button" class="m-qt" data-mgo="carnet:new"><span class="m-qi">${ICO.carnet}</span><b>Écrire</b><small>Une entrée datée à cette heure</small></button>
      </div>
      <p class="m-cross"><button type="button" class="btn ghost small" data-mastro="ciel">Voir le ciel du jour, en astrologie</button></p>`;
    bindLinks(root);
    clearTimeout(momTimer);
    momTimer = setTimeout(() => { if(on && st.vue === "moment" && !document.hidden) renderMoment(); }, Math.max(30000, Math.min(cur.end - now + 1500, 300000)));
  }

  /* ---------- L'ATELIER ---------- */
  let at = {tool:null, arg:null};
  const TOOLS = [
    ["sceau","Le sceau sur le carré","Un mot devient une ligne sur le carré d'une planète, à la manière d'Agrippa", "kamea"],
    ["sigil","Le sigil","Une phrase devient un signe, à la manière d'Austin Spare", "sigil"],
    ["arbre","L'Arbre de vie","Dix sphères, vingt-deux sentiers, et le tarot de la Golden Dawn", "arbre"],
    ["corresp","Les correspondances","Ce qu'Agrippa et la Golden Dawn rattachent à chaque planète et à chaque élément", "corresp"],
    ["election","Choisir le moment","Les prochaines bonnes fenêtres d'une planète, calculées pour ton lieu", "election"],
    ["rituels","Les rituels guidés","Respiration, Pentagramme mineur, Pilier du milieu, contemplation", "rituels"]
  ];
  function toolIcon(k){
    if(k === "kamea") return `<svg viewBox="0 0 60 60" aria-hidden="true"><rect x="6" y="6" width="48" height="48"/><path d="M22 6v48M38 6v48M6 22h48M6 38h48" class="f"/><path d="M14 46L30 14 46 30 30 46" class="s"/><circle cx="14" cy="46" r="3"/></svg>`;
    if(k === "sigil") return `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><path d="M18 44L30 14 42 44M22 34h16M30 14v34M20 22h20" class="s"/></svg>`;
    if(k === "arbre") return `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M30 6L46 15 14 15 46 30 14 30 30 39 46 46 14 46 30 52" class="f"/><g class="d"><circle cx="30" cy="6" r="3.4"/><circle cx="46" cy="15" r="3.4"/><circle cx="14" cy="15" r="3.4"/><circle cx="46" cy="30" r="3.4"/><circle cx="14" cy="30" r="3.4"/><circle cx="30" cy="39" r="3.4"/><circle cx="46" cy="46" r="3.4"/><circle cx="14" cy="46" r="3.4"/><circle cx="30" cy="52" r="3.4"/></g></svg>`;
    if(k === "corresp") return `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="24" class="f"/><path d="M30 8L41.6 52.6 9.6 22.4 50.4 22.4 18.4 52.6Z" class="s" transform="rotate(0 30 30)"/></svg>`;
    if(k === "election") return `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="24" class="f"/><path d="M30 12v18l11 8" class="s"/><path d="M44 8a10 10 0 1 0 8 14 8 8 0 0 1-8-14z" class="d2"/></svg>`;
    return `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="24" class="f"/><path d="M30 10L41.8 46.2 11 23.8 49 23.8 18.2 46.2Z" class="s"/></svg>`;
  }
  function renderAtelier(){
    const root = q1("#v-m-atelier"); if(!root) return;
    if(!at.tool){
      root.innerHTML = `<header class="m-hero"><p class="eyebrow">Les instruments</p><h1>L'atelier</h1><p class="m-lede">Les outils de la magie savante, à manipuler. Rien ne s'envoie nulle part : tout est calculé sur ton appareil.</p></header>
        <figure class="m-medal">${img("lab", "Le laboratoire-oratoire de Khunrath", "m-medal-img")}<figcaption>${CRED.lab}</figcaption></figure>
        <div class="m-tools">${TOOLS.map(([k, t, d, ic]) => `<button type="button" class="m-tool" data-mtool="${k}"><span class="m-tool-ic">${toolIcon(ic)}</span><span class="m-tool-t"><b>${t}</b><small>${d}</small></span></button>`).join("")}</div>`;
      bindLinks(root); return;
    }
    const head = (t, sous) => `<p class="crumb"><button type="button" class="linkbtn" data-mtool="">← L'atelier</button></p><header class="m-hero sm"><p class="eyebrow">L'atelier</p><h1>${t}</h1>${sous ? `<p class="m-lede">${sous}</p>` : ""}</header>`;
    const host = `<div class="m-toolhost"></div>`;
    const T0 = at.tool;
    if(T0 === "sceau"){ root.innerHTML = head("Le sceau sur le carré", "Écris un mot, choisis la planète qui lui convient : le mot devient une ligne sur son carré.") + host; schemas.sceau(q1(".m-toolhost", root), {full:true, pl:at.arg}); }
    else if(T0 === "sigil"){ root.innerHTML = head("Le sigil", "Écris ton intention en une phrase, au présent. Les lettres en double disparaissent, celles qui restent se superposent.") + host; schemas.spare(q1(".m-toolhost", root), {full:true}); }
    else if(T0 === "arbre"){ root.innerHTML = head("L'Arbre de vie", "Touche une sphère ou un sentier. Change l'affichage pour voir les lettres, les lames ou les numéros.") + host; schemas.arbre(q1(".m-toolhost", root), {full:true}); }
    else if(T0 === "corresp"){ root.innerHTML = head("Les correspondances", "Choisis une planète ou un élément : tout ce que la tradition lui rattache, au même endroit.") + host; schemas.corresp(q1(".m-toolhost", root), {pl:at.arg}); }
    else if(T0 === "election"){ root.innerHTML = head("Choisir le moment", "Les heures de la planète choisie, sur les trente prochains jours, classées selon les règles des élections.") + host; schemas.election(q1(".m-toolhost", root), {full:true, pl:at.arg}); }
    else if(T0 === "rituels"){ root.innerHTML = head("Les rituels guidés", "Étape par étape, avec un minuteur. Commence par la respiration en carré.") + `<div class="m-rites">${Object.entries(D.RITUELS).map(([k, r]) => `<button type="button" class="m-rite-c" data-mrite="${k}"><span class="m-rite-ic">${riteIcon(k)}</span><span><span class="m-st ${ST[r.statut === "Tradition" ? "trad" : "mod"][1]}">${r.statut}</span><b>${r.nom}</b><small>${r.sous} · ${r.duree}</small></span></button>`).join("")}</div>
      <p class="help m-left">Si un exercice te met mal à l'aise, arrête-le. Ces pratiques ne remplacent aucun soin.</p>`; }
    bindLinks(root);
  }
  const riteIcon = k => k === "carre" ? `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="9" y="9" width="22" height="22"/><circle cx="9" cy="9" r="2.6" fill="currentColor"/></svg>` : k === "lbrp" ? `<svg viewBox="-20 -20 40 40" aria-hidden="true"><circle r="16"/><path d="M-8.8 12.1L0 -13 8.8 12.1 -13.3 -4 13.3 -4Z"/></svg>` : k === "pilier" ? `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4v32"/><circle cx="20" cy="6" r="3"/><circle cx="20" cy="14" r="2.4"/><circle cx="20" cy="21" r="2.4"/><circle cx="20" cy="28" r="2.4"/><circle cx="20" cy="35" r="2.4"/></svg>` : `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="8"/><circle cx="20" cy="20" r="15" stroke-dasharray="2 4"/></svg>`;

  /* ---------- L'ÉCOLE ---------- */
  let ev = {mod:null, lec:null, quiz:false};
  const MOD = id => K.MODULES.find(m => m.id === id);
  const modDone = m => m.lecons.every(l => st.done.includes(l.id));
  const grade = () => { const n = K.MODULES.filter(modDone).length; let g = D.GRADES[0]; D.GRADES.forEach(x => { if(n >= x.min) g = x; }); return {g, n}; };
  function renderEcole(){
    const root = q1("#v-m-ecole"); if(!root) return;
    if(ev.mod && ev.quiz) return renderQuiz(root);
    if(ev.mod && ev.lec != null) return renderLecon(root);
    if(ev.mod) return renderModule(root);
    const {g, n} = grade(), tot = K.MODULES.reduce((a, m) => a + m.lecons.length, 0), lus = st.done.filter(x => /^m\dl\d$/.test(x)).length;
    const next = (() => { for(const m of K.MODULES) for(let i = 0; i < m.lecons.length; i++) if(!st.done.includes(m.lecons[i].id)) return [m, i]; return null; })();
    root.innerHTML = `<header class="m-hero"><p class="eyebrow">Apprendre la magie</p><h1>L'école</h1>
        <p class="m-lede">Huit modules, de la définition de la magie jusqu'aux rituels de la Golden Dawn et aux sigils de la magie du chaos. Chaque leçon donne ses sources, avec leur statut : ce qui est documenté, ce qui relève d'une tradition, ce qui est une lecture moderne.</p></header>
      <section class="m-grade"><div class="m-grade-seal"><svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46"/><circle r="40"/><path d="${(() => { const o = [0,3,6,2,5,1,4]; return o.map((i, k) => { const a = (-90 + i*360/7)*rad; return (k ? "L" : "M") + f1(Math.cos(a)*30) + " " + f1(Math.sin(a)*30); }).join("") + "Z"; })()}"/></svg><b>${g.code}</b></div>
        <div><p class="eyebrow">Ton degré</p><h2>${g.nom}</h2><p class="help m-left">${lus} leçon${lus > 1 ? "s" : ""} sur ${tot} · ${n} module${n > 1 ? "s" : ""} achevé${n > 1 ? "s" : ""}. Les noms sont ceux des grades de la Golden Dawn ; ici, ils marquent seulement ton chemin.</p>
        ${next ? `<button type="button" class="btn small" data-mlec="${next[0].id}:${next[1]}">${lus ? "Reprendre" : "Commencer"} : ${h(next[0].lecons[next[1]].t)}</button>` : `<p><b>Tu as parcouru tout le cours.</b></p>`}</div></section>
      <div class="m-mods">${K.MODULES.map(m => { const d = m.lecons.filter(l => st.done.includes(l.id)).length;
        return `<button type="button" class="m-mod${modDone(m) ? " done" : ""}" data-mmod="${m.id}"><span class="m-mod-img">${m.img === "sigil" ? sigilSVG(spareLetters("je trouve le calme", true).keep, 2, {cercle:true}) : img(m.img)}</span>
          <span class="m-mod-b"><span class="m-mod-n">${m.n}</span><b>${nb(m.t)}</b><small>${m.sous}</small><span class="m-mod-p"><i style="width:${Math.round(d/m.lecons.length*100)}%"></i></span><span class="m-mod-f">${d}/${m.lecons.length} leçons${st.best[m.id] != null ? ` · quiz ${st.best[m.id]}/${m.quiz.length}` : ""}</span></span></button>`; }).join("")}</div>`;
    bindLinks(root);
  }
  function renderModule(root){
    const m = MOD(ev.mod); if(!m){ ev.mod = null; return renderEcole(); }
    root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-mmod="">← L'école</button></p>
      <header class="m-modhead"><div class="m-modhead-img">${m.img === "sigil" ? sigilSVG(spareLetters("je trouve le calme", true).keep, 2) : img(m.img)}</div>
        <div><p class="eyebrow">Module ${m.n}</p><h1>${nb(m.t)}</h1><p class="m-lede">${m.sous}</p>${m.img !== "sigil" ? `<p class="help m-left">${CRED[m.img] || ""}</p>` : ""}</div></header>
      <ol class="m-lecs">${m.lecons.map((l, i) => `<li><button type="button" class="m-lec${st.done.includes(l.id) ? " done" : ""}" data-mlec="${m.id}:${i}"><span class="m-lec-n">${i + 1}</span><span><b>${l.t}</b><small>${l.sous}</small></span><span class="m-lec-ok" aria-label="${st.done.includes(l.id) ? "lue" : ""}">${st.done.includes(l.id) ? "✓" : ""}</span></button></li>`).join("")}
        <li><button type="button" class="m-lec quiz" data-mquiz="${m.id}"><span class="m-lec-n">?</span><span><b>Le quiz du module</b><small>${m.quiz.length} questions, chaque réponse expliquée${st.best[m.id] != null ? ` · ton meilleur score : ${st.best[m.id]}/${m.quiz.length}` : ""}</small></span></button></li></ol>`;
    bindLinks(root);
  }
  function renderLecon(root){
    const m = MOD(ev.mod), i = ev.lec, l = m.lecons[i]; st.last = {mod:m.id, lec:i}; save();
    const prev = i > 0 ? `${m.id}:${i - 1}` : null, next = i < m.lecons.length - 1 ? `${m.id}:${i + 1}` : null;
    const exAct = l.ex && l.ex.outil ? (() => { const [k, v] = l.ex.outil.split(":"); return k === "rituel" ? `<button type="button" class="btn small" data-mrite="${v}">Lancer le rituel guidé</button>` : k === "outil" ? `<button type="button" class="btn small" data-mgo="atelier:${v}">Ouvrir l'atelier</button>` : `<button type="button" class="btn small" data-mgo="carnet:new">Ouvrir le carnet</button>`; })() : "";
    root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-mmod="${m.id}">← Module ${m.n} · ${m.t}</button></p>
      <article class="m-lesson"><header><p class="eyebrow">Leçon ${i + 1} sur ${m.lecons.length}</p><h1>${nb(l.t)}</h1><p class="m-lede">${l.sous}</p></header>
        <div class="m-idee">${l.idee.map((p, k) => `<p${k === 0 ? ' class="m-lettrine"' : ""}>${p}</p>`).join("")}</div>
        <blockquote class="m-source"><p>${l.source.txt}</p><footer>${badge(l.source.st)}<cite>${l.source.ref}</cite></footer></blockquote>
        <figure class="m-schema" data-schema="${l.schema}"></figure>
        ${l.ex ? `<section class="m-ex"><p class="eyebrow">L'exercice · facultatif</p><h3>${l.ex.t}</h3><p>${l.ex.txt}</p>${exAct ? `<div class="m-acts">${exAct}</div>` : ""}</section>` : ""}
        <section class="m-note"><p class="eyebrow">Pour ton carnet</p><p class="m-q">${l.carnet}</p><button type="button" class="btn ghost small" data-mnote="${l.id}">Écrire dans le carnet</button></section>
        <nav class="m-lnav">${prev ? `<button type="button" class="btn ghost small" data-mlec="${prev}">← Précédente</button>` : "<span></span>"}
          <button type="button" class="btn small" data-mread="${l.id}" data-mnext="${next || "quiz:" + m.id}">${st.done.includes(l.id) ? (next ? "Leçon suivante →" : "Le quiz du module →") : (next ? "J'ai lu · suivante →" : "J'ai lu · le quiz →")}</button></nav></article>`;
    const fig = q1(".m-schema", root); if(schemas[l.schema]) schemas[l.schema](fig, {}); else fig.remove();
    bindLinks(root);
  }
  let qz = null;
  function renderQuiz(root){
    const m = MOD(ev.mod);
    if(!qz || qz.mod !== m.id){ const order = m.quiz.map((q, i) => ({i, r:q.r.map((t, k) => ({t, ok:k === q.ok})).sort(() => Math.random() - .5)})); qz = {mod:m.id, k:0, score:0, ans:null, order}; }
    if(qz.k >= m.quiz.length){
      const best = Math.max(st.best[m.id] || 0, qz.score); st.best[m.id] = best; save();
      root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-mmod="${m.id}">← Module ${m.n}</button></p><section class="m-quiz end"><p class="eyebrow">Quiz · ${m.t}</p><h1>${qz.score} sur ${m.quiz.length}</h1>
        <p class="m-lede">${qz.score === m.quiz.length ? "Sans faute." : qz.score >= m.quiz.length - 1 ? "Presque parfait." : "Les leçons sont là pour y revenir."}</p>
        <div class="m-acts"><button type="button" class="btn small" data-mquiz="${m.id}" data-mredo="1">Recommencer</button><button type="button" class="btn ghost small" data-mmod="">Retour à l'école</button></div></section>`;
      qz = null; bindLinks(root); return;
    }
    const o = qz.order[qz.k], q = m.quiz[o.i];
    root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-mmod="${m.id}">← Module ${m.n}</button></p>
      <section class="m-quiz"><p class="eyebrow">Question ${qz.k + 1} sur ${m.quiz.length} · ${qz.score} bonne${qz.score > 1 ? "s" : ""} réponse${qz.score > 1 ? "s" : ""}</p><h2>${nb(q.q)}</h2>
      <div class="m-ans">${o.r.map((r, k) => `<button type="button" class="m-an${qz.ans != null ? (r.ok ? " ok" : qz.ans === k ? " ko" : "") : ""}" data-man="${k}"${qz.ans != null ? " disabled" : ""}>${r.t}</button>`).join("")}</div>
      ${qz.ans != null ? `<p class="m-exp"><b>${o.r[qz.ans].ok ? "Juste." : "Pas tout à fait."}</b> ${q.exp}</p><div class="m-acts"><button type="button" class="btn small" data-mqnext>${qz.k + 1 < m.quiz.length ? "Question suivante" : "Voir le score"}</button></div>` : ""}</section>`;
    qa("[data-man]", root).forEach(b => b.onclick = () => { qz.ans = +b.dataset.man; if(o.r[qz.ans].ok) qz.score++; renderQuiz(root); });
    const nx = q1("[data-mqnext]", root); if(nx) nx.onclick = () => { qz.k++; qz.ans = null; renderQuiz(root); window.scrollTo({top:0}); };
    bindLinks(root);
  }

  /* ---------- HISTOIRE ---------- */
  function renderHistoire(){
    const root = q1("#v-m-histoire"); if(!root) return;
    root.innerHTML = `<header class="m-hero"><p class="eyebrow">Deux mille ans en huit chapitres</p><h1>Histoire de la magie</h1>
        <p class="m-lede">Des papyrus d'Égypte aux chercheurs d'aujourd'hui : la magie savante de l'Occident, ses livres, ses figures, ses procès.</p></header>
      <nav class="m-htoc" aria-label="Les chapitres">${K.HISTOIRE.map(c => `<a href="#${c.id}" data-mh="${c.id}">${c.n}</a>`).join("")}</nav>
      <div class="m-eras">${K.HISTOIRE.map(c => `<section class="m-era" id="${c.id}"><p class="eyebrow">${c.n} · ${c.per}</p><h2>${nb(c.t)}</h2>
        ${c.img ? `<figure class="m-era-fig">${img(c.img, "")}<figcaption>${CRED[c.img] || ""}</figcaption></figure>` : ""}
        <p class="m-lede">${c.lead}</p>
        <details class="m-fold"><summary><span><b>Lire le chapitre</b><small>${c.gens.map(g => g[0].split(" (")[0]).join(" · ")}</small></span><i class="a-chev" aria-hidden="true"></i></summary>
          <div class="m-fold-b">${c.p.map(p => `<p>${p}</p>`).join("")}<div class="m-gens">${c.gens.map(([n, t]) => `<article class="m-gen"><h3>${n}</h3><p>${t}</p></article>`).join("")}</div></div></details></section>`).join("")}
        <section class="m-era"><p class="eyebrow">Pour aller plus loin</p><h2>Quelques livres sérieux</h2>
          <ul class="m-biblio"><li>Antoine Faivre, <i>L'Ésotérisme</i>, PUF, « Que sais-je ? »</li><li>Frances Yates, <i>Giordano Bruno et la tradition hermétique</i> (1964), trad. Dervy</li>
          <li>Wouter J. Hanegraaff, <i>Western Esotericism: A Guide for the Perplexed</i>, Bloomsbury, 2013</li><li>Jean-Patrice Boudet, <i>Entre science et nigromance</i>, Publications de la Sorbonne, 2006</li>
          <li>Owen Davies, <i>Grimoires: A History of Magic Books</i>, Oxford University Press, 2009</li></ul></section></div>`;
    qa("[data-mh]", root).forEach(a => a.onclick = e => { e.preventDefault(); const t = document.getElementById(a.dataset.mh); if(t) window.scrollTo({top:t.getBoundingClientRect().top + scrollY - 70, behavior:"smooth"}); });
    bindLinks(root);
  }

  /* ---------- LE CARNET ---------- */
  let cn = {edit:null, prefill:null, ref:null, tab:"entrees"};
  const TYPES = [["rituel","Un rituel"],["sigil","Un sigil ou un sceau"],["contemplation","Une contemplation"],["lecture","Une leçon"],["reve","Un rêve"],["autre","Autre chose"]];
  function stamp(d){
    const H = hoursOf(d), M = moon(d), cur = H && H.cur >= 0 ? H.hours[H.cur] : null;
    return {jour:H ? H.day : null, heure:cur ? cur.pl : null, lune:M ? M.nom : null, croit:M ? M.croit : null};
  }
  function renderCarnet(){
    const root = q1("#v-m-carnet"); if(!root) return;
    const {g, n} = grade();
    if(cn.edit){
      const e = cn.edit === "new" ? null : st.carnet.find(x => x.id === cn.edit);
      const d = e ? new Date(e.t) : new Date(), sp = stamp(d), pre = cn.prefill || "";
      const local = new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0, 16);
      root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-mcn="">← Le carnet</button></p>
        <header class="m-hero sm"><p class="eyebrow">${e ? "Modifier une entrée" : "Nouvelle entrée"}</p><h1>${e ? h(e.titre || "Une entrée") : "Une page du carnet"}</h1>
          <p class="m-lede">${sp.jour ? `Jour ${PL[sp.jour].nom === "Lune" ? "de la Lune" : "de " + PL[sp.jour].nom}, ` : ""}${sp.heure ? `heure ${PL[sp.heure].nom === "Lune" ? "de la Lune" : "de " + PL[sp.heure].nom}` : ""}${sp.lune ? `, ${sp.lune.toLowerCase()}` : ""}.</p></header>
        <form class="m-form" autocomplete="off">
          <label>Quand<input type="datetime-local" name="t" value="${local}"></label>
          <label>Ce que j'ai fait<select name="type">${TYPES.map(([k, l]) => `<option value="${k}"${(e ? e.type : cn.ref ? "lecture" : "rituel") === k ? " selected" : ""}>${l}</option>`).join("")}</select></label>
          <label>Un titre<input type="text" name="titre" maxlength="80" value="${h(e ? e.titre : cn.ref ? "Leçon : " + cn.ref : "")}" placeholder="Pentagramme du matin, sigil du calme…"></label>
          <label>L'intention<input type="text" name="intention" maxlength="160" value="${h(e ? e.intention : "")}" placeholder="Ce que je cherchais"></label>
          <label>Le déroulé, ce que j'ai ressenti<textarea name="texte" rows="7" placeholder="Y compris « rien »">${h(e ? e.texte : pre)}</textarea></label>
          <fieldset class="m-calme"><legend>Mon état après</legend>${[1,2,3,4,5].map(v => `<label><input type="radio" name="calme" value="${v}"${(e ? e.calme : 3) === v ? " checked" : ""}><span>${["agité","tendu","neutre","calme","très calme"][v-1]}</span></label>`).join("")}</fieldset>
          <div class="m-acts"><button type="submit" class="btn">Enregistrer</button>${e ? `<button type="button" class="linkbtn danger" data-mdel="${e.id}">Supprimer cette entrée</button>` : ""}</div></form>`;
      const f = q1("form", root);
      f.onsubmit = ev2 => { ev2.preventDefault(); const fd = new FormData(f), t = new Date(fd.get("t")).getTime() || Date.now(), s = stamp(new Date(t));
        const rec = {id:e ? e.id : uid(), t, type:fd.get("type"), titre:String(fd.get("titre") || "").trim(), intention:String(fd.get("intention") || "").trim(), texte:String(fd.get("texte") || "").trim(), calme:+fd.get("calme") || 3, jour:s.jour, heure:s.heure, lune:s.lune};
        if(e) Object.assign(e, rec); else st.carnet.unshift(rec);
        st.carnet.sort((a, b) => b.t - a.t); st.carnet = st.carnet.slice(0, 400); save(); cn = {edit:null, prefill:null, ref:null, tab:"entrees"}; renderCarnet(); window.scrollTo({top:0}); };
      bindLinks(root); return;
    }
    const tab = cn.tab;
    const E = window.ArcanesAstro && window.ArcanesAstro.espace;
    root.innerHTML = (E ? E.bar("magie") : "") + `<header class="m-hero"><p class="eyebrow">Le registre de l'adepte</p><h1>Le carnet</h1><p class="m-lede">Tes pratiques, datées avec leur heure planétaire et leur Lune, et tes sceaux. Tout reste sur cet appareil.</p></header>
      <section class="m-grade small"><div class="m-grade-seal"><svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46"/><circle r="40"/></svg><b>${g.code}</b></div><div><p class="eyebrow">Degré</p><h2>${g.nom}</h2><p class="help m-left">${n} module${n > 1 ? "s" : ""} sur 8 · ${st.carnet.length} entrée${st.carnet.length > 1 ? "s" : ""} · ${st.sceaux.length} sceau${st.sceaux.length > 1 ? "x" : ""}</p></div></section>
      <div class="m-acts start"><button type="button" class="btn" data-mgo="carnet:new">Nouvelle entrée</button></div>
      <nav class="subtabs" aria-label="Le carnet"><button type="button" class="subtab${tab === "entrees" ? " on" : ""}" data-mctab="entrees">Les entrées</button><button type="button" class="subtab${tab === "sceaux" ? " on" : ""}" data-mctab="sceaux">Mes sceaux</button><button type="button" class="subtab${tab === "reglages" ? " on" : ""}" data-mctab="reglages">Lieu et sauvegarde</button></nav>
      <div class="m-cbody">${tab === "entrees" ? entries() : tab === "sceaux" ? sceaux() : reglages()}</div>`;
    if(E) E.bind(root);
    qa("[data-mctab]", root).forEach(b => b.onclick = () => { cn.tab = b.dataset.mctab; renderCarnet(); });
    qa("[data-mreveal]", root).forEach(b => b.onclick = () => { const p = b.closest(".m-sc").querySelector(".m-sc-txt"); p.hidden = !p.hidden; b.textContent = p.hidden ? "Voir la phrase" : "Cacher la phrase"; });
    qa("[data-mscdel]", root).forEach(b => b.onclick = () => { st.sceaux = st.sceaux.filter(x => x.id !== b.dataset.mscdel); save(); renderCarnet(); });
    bindLinks(root);
  }
  function entries(){
    if(!st.carnet.length) return `<div class="m-empty"><p>Ton carnet est vide.</p><p class="help">Écris après chaque pratique, même courte, même si « rien » ne s'est passé. C'est ce qui rend la pratique honnête.</p></div>`;
    return `<ol class="m-entries">${st.carnet.map(e => `<li><button type="button" class="m-entry" data-mcn="${e.id}">
      <span class="m-e-gl">${e.heure ? pg(e.heure) : ""}</span>
      <span class="m-e-b"><span class="m-e-d">${cap(fmt(new Date(e.t), {weekday:"short", day:"numeric", month:"short", year:"numeric"}))} · ${fmt(new Date(e.t), HM)}${e.heure ? ` · heure ${PL[e.heure].nom === "Lune" ? "de la Lune" : "de " + PL[e.heure].nom}` : ""}</span>
      <b>${h(e.titre || (TYPES.find(t => t[0] === e.type) || ["",""])[1])}</b>${e.intention ? `<small>${h(e.intention)}</small>` : ""}${e.texte ? `<span class="m-e-x">${h(e.texte.slice(0, 160))}${e.texte.length > 160 ? "…" : ""}</span>` : ""}</span>
      <span class="m-e-c" title="État après">${"●".repeat(e.calme || 3)}<i>${"●".repeat(5 - (e.calme || 3))}</i></span></button></li>`).join("")}</ol>`;
  }
  function sceaux(){
    if(!st.sceaux.length) return `<div class="m-empty"><p>Pas encore de sceau.</p><div class="m-acts"><button type="button" class="btn small" data-mgo="atelier:sigil">Faire un sigil</button><button type="button" class="btn ghost small" data-mgo="atelier:sceau">Tracer sur un carré</button></div></div>`;
    return `<div class="m-scs">${st.sceaux.map(x => `<article class="m-sc"><div class="m-sc-art">${x.kind === "kamea" ? sceauSeul(x.pl, x.mot) : sigilSVG(spareLetters(x.mot, x.sv).keep, x.v || 0)}</div>
      <p class="m-sc-d">${x.kind === "kamea" ? `Sur le carré ${PL[x.pl].nom === "Lune" ? "de la Lune" : "de " + PL[x.pl].nom}` : "Sigil"} · ${fmt(new Date(x.t), {day:"numeric", month:"short", year:"numeric"})}</p>
      <p class="m-sc-txt" hidden>« ${h(x.mot)} »</p><div class="m-acts"><button type="button" class="linkbtn" data-mreveal>Voir la phrase</button><button type="button" class="linkbtn danger" data-mscdel="${x.id}">Supprimer</button></div></article>`).join("")}</div>
      <p class="help m-left">Dans la méthode de Spare, on oublie la phrase une fois le sigil chargé : elle reste cachée ici, tu peux la révéler plus tard pour faire le point.</p>`;
  }
  function reglages(){
    const L = lieu();
    return `<section class="m-card"><h3>Le lieu</h3><p>Les heures planétaires sont calculées pour <b>${h(L.nom)}</b>, avec le lever et le coucher réels du soleil. Le lieu est le même qu'en astrologie.</p><div class="m-acts start"><button type="button" class="btn ghost small" data-mastro="moi">Changer de lieu</button></div></section>
      <section class="m-card"><h3>La sauvegarde</h3><p>La sauvegarde d'Arcanes emporte aussi ton carnet, tes sceaux et ta progression en magie. Elle se fait depuis l'espace du tarot.</p><div class="m-acts start"><button type="button" class="btn ghost small" data-mtarot="journal">Ouvrir la sauvegarde</button></div></section>
      <section class="m-card"><h3>Effacer</h3><p>Efface ton carnet, tes sceaux et ta progression en magie, sur cet appareil seulement.</p><div class="m-acts start"><button type="button" class="linkbtn danger" data-mwipe>Tout effacer</button></div></section>`;
  }

  /* ================================================================
     LES SCHÉMAS (dans les leçons, et en grand dans l'atelier)
     ================================================================ */
  const chipsPl = (cur, attr = "data-spl") => `<div class="m-plchips" role="group" aria-label="Choisir une planète">${D.PLANETES.map(p => `<button type="button" class="m-plc${cur === p.id ? " on" : ""}" ${attr}="${p.id}" style="--pc:${p.hex}" aria-pressed="${cur === p.id}"><span class="ag mg">${p.gl}${T}</span><span class="l">${p.nom}</span></button>`).join("")}</div>`;
  const schemas = {
    defs(fig){
      const C = [["Frazer, 1890","Une science fausse","La magie applique deux lois : le semblable produit le semblable, et ce qui a été en contact reste lié."],
        ["Mauss et Hubert, 1902","Un rite privé","La magie est un rite hors du culte organisé : privé, secret, parfois défendu."],
        ["Crowley, 1929","La Volonté","La science et l'art de provoquer des changements conformément à la Volonté."],
        ["Dion Fortune","La conscience","L'art de provoquer des changements dans la conscience, conformément à la volonté."]];
      fig.innerHTML = `<div class="m-flips">${C.map(([a, t, d], i) => `<button type="button" class="m-flip" data-fl="${i}" aria-pressed="false"><span class="fr"><small>${a}</small><b>${t}</b><i>Touche pour lire</i></span><span class="bk">${d}</span></button>`).join("")}</div><figcaption>Quatre définitions, quatre angles : le monde, la société, la volonté, la conscience.</figcaption>`;
      qa("[data-fl]", fig).forEach(b => b.onclick = () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")));
    },
    echelle(fig){
      const draw = m => m === "frazer"
        ? `<svg viewBox="0 0 320 170" class="m-sv" role="img" aria-label="L'échelle de Frazer"><path d="M20 150h90v-40h90v-40h90" class="m-sv-l"/><text x="65" y="138" class="m-sv-t">Magie</text><text x="155" y="98" class="m-sv-t">Religion</text><text x="245" y="58" class="m-sv-t">Science</text><path d="M30 40 L280 20" class="m-sv-a" marker-end="url(#m-arr)"/><text x="40" y="30" class="m-sv-s">le « progrès » selon Frazer</text><defs><marker id="m-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="m-sv-af"/></marker></defs></svg>`
        : `<svg viewBox="0 0 320 170" class="m-sv" role="img" aria-label="La lagune et la haute mer selon Malinowski"><rect x="12" y="30" width="140" height="120" rx="8" class="m-sv-box"/><rect x="168" y="30" width="140" height="120" rx="8" class="m-sv-box dark"/><text x="82" y="54" class="m-sv-t">La lagune</text><text x="238" y="54" class="m-sv-t lt">La haute mer</text><path d="M30 110 q15 -8 30 0 t30 0 t30 0 t30 0" class="m-sv-w"/><path d="M186 110 q15 -22 30 0 t30 0 t30 0 t30 0" class="m-sv-w lt"/><text x="82" y="138" class="m-sv-s">technique seule</text><text x="238" y="138" class="m-sv-s lt">technique + rite</text></svg>`;
      fig.innerHTML = `<div class="sc-seg m-seg" role="group"><button type="button" data-em="frazer" aria-pressed="true">Frazer, 1890</button><button type="button" data-em="mali" aria-pressed="false">Malinowski, 1925</button></div><div class="m-sv-host">${draw("frazer")}</div><figcaption></figcaption>`;
      const cap1 = {frazer:"Une échelle : la magie serait un premier stade, dépassé par la religion puis par la science. On ne pense plus ainsi.", mali:"Un partage des tâches : là où la technique suffit, pas de rite ; là où l'on risque sa vie, la magie prend le relais."};
      const set = m => { q1(".m-sv-host", fig).innerHTML = draw(m); q1("figcaption", fig).textContent = cap1[m]; qa("[data-em]", fig).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.em === m))); };
      qa("[data-em]", fig).forEach(b => b.onclick = () => set(b.dataset.em)); set("frazer");
    },
    souffle(fig){ fig.innerHTML = `<div class="m-breath-host"></div><figcaption>Quatre temps par côté. Lance quelques cycles, puis essaie le rituel guidé en entier.</figcaption>`; breath(q1(".m-breath-host", fig), {cycles:4, compact:true}); },
    mondes(fig){
      const M = [["intellectuel","Le monde intellectuel","Les anges, les intelligences, les idées, et au sommet le divin. Le mage y accède par la religion et la contemplation."],
        ["celeste","Le monde céleste","Les étoiles et les sept planètes, avec leurs nombres et leurs figures. On y travaille par l'astrologie et les mathématiques."],
        ["elementaire","Le monde élémentaire","Les quatre éléments, les pierres, les plantes, les animaux, le corps. On y agit par la magie naturelle et la médecine."]];
      fig.innerHTML = `<div class="m-mondes">${M.map(([k, t, d], i) => `<button type="button" class="m-monde m${i}" data-mo="${k}"><b>${t}</b></button>`).join("")}</div><p class="m-mo-d"></p><figcaption>Agrippa, La Philosophie occulte, livre I, chapitre 1 : chaque monde reçoit les vertus de celui du dessus.</figcaption>`;
      const set = k => { const x = M.find(m => m[0] === k); q1(".m-mo-d", fig).innerHTML = `<b>${x[1]}.</b> ${x[2]}`; qa("[data-mo]", fig).forEach(b => b.classList.toggle("on", b.dataset.mo === k)); };
      qa("[data-mo]", fig).forEach(b => b.onclick = () => set(b.dataset.mo)); set("celeste");
    },
    signatures(fig){
      const S = K.SIGNATURES, orgs = [...S].sort(() => Math.random() - .5); let pick = null, okN = 0;
      fig.innerHTML = `<div class="m-match"><div>${S.map((s, i) => `<button type="button" class="m-mt a" data-ma="${i}"><b>${s.chose}</b><small>${s.forme}</small></button>`).join("")}</div><div>${orgs.map(s => `<button type="button" class="m-mt b" data-mb="${S.indexOf(s)}">${cap(s.organe)}</button>`).join("")}</div></div><figcaption>Touche une plante, puis l'organe que sa forme « signe ». Un jeu d'histoire, pas un conseil de santé.</figcaption>`;
      qa("[data-ma]", fig).forEach(b => b.onclick = () => { if(b.classList.contains("ok")) return; pick = +b.dataset.ma; qa("[data-ma]", fig).forEach(x => x.classList.toggle("sel", x === b)); });
      qa("[data-mb]", fig).forEach(b => b.onclick = () => { if(pick == null || b.classList.contains("ok")) return; const a = q1(`[data-ma="${pick}"]`, fig);
        if(+b.dataset.mb === pick){ a.classList.add("ok"); b.classList.add("ok"); a.classList.remove("sel"); okN++; if(okN === S.length) q1("figcaption", fig).textContent = "Les quatre signatures. La médecine moderne n'en retient aucune : la forme ne dit rien de l'effet."; }
        else { b.classList.add("ko"); setTimeout(() => b.classList.remove("ko"), 600); } pick = null; });
    },
    chaine(fig){
      let cur = "soleil";
      const draw = () => { const p = PL[cur]; const L = [["L'astre", p.nom, p.gl], ["Le jour", cap(p.jour)], ["Le métal", cap(p.metal.split(" (")[0])], ["La pierre", cap(p.pierre)], ["Les plantes", cap(p.plantes)], ["Le parfum", cap(p.parfum)], ["La couleur", cap(p.couleur)]];
        q1(".m-chain", fig).innerHTML = L.map(([k, v, g], i) => `<li style="--pc:${p.hex}"><span class="k">${k}</span><span class="v">${g ? `<span class="ag mg" style="color:${p.hex}">${g}${T}</span> ` : ""}${v}</span></li>`).join("");
        qa("[data-spl]", fig).forEach(b => { b.classList.toggle("on", b.dataset.spl === cur); b.setAttribute("aria-pressed", String(b.dataset.spl === cur)); }); };
      fig.innerHTML = chipsPl(cur) + `<ol class="m-chain"></ol><figcaption>De l'astre à la pierre : une « chaîne » au sens des néoplatoniciens.</figcaption>`;
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = b.dataset.spl; draw(); }); draw();
    },
    heptagramme(fig){
      let hr = 0; const start = "saturne";
      const draw = () => { const day = D.CHALD[(D.CHALD.indexOf(start) + Math.floor(hr/24)*3) % 7], hp = D.CHALD[(D.CHALD.indexOf(start) + hr) % 7];
        const drawn = []; for(let d = 0; d <= Math.floor(hr/24); d++) drawn.push(D.CHALD[(D.CHALD.indexOf(start) + d*3) % 7]);
        q1(".m-hh", fig).innerHTML = heptaSVG({day, hour:hp, drawn, dayNames:true, hourStep:hr, hourFrom:hr ? D.CHALD[(D.CHALD.indexOf(start) + hr - 1) % 7] : hp});
        q1(".m-hh-t", fig).innerHTML = `Heure <b>${hr % 24 + 1}</b> du <b>${PL[day].jour}</b> : heure ${PL[hp].nom === "Lune" ? "de la Lune" : "de " + PL[hp].nom}.${hr % 24 === 0 && hr ? ` <em>Un nouveau jour commence : trois rangs plus loin.</em>` : ""}`; };
      fig.innerHTML = `<div class="m-hh"></div><p class="m-hh-t"></p><div class="m-acts"><button type="button" class="btn ghost small" data-hh="1">+1 heure</button><button type="button" class="btn small" data-hh="24">+1 jour</button><button type="button" class="btn ghost small" data-hh="0">Recommencer</button></div><figcaption>Le trait doré suit les jours : samedi, dimanche, lundi… jusqu'à refermer l'étoile en sept jours.</figcaption>`;
      qa("[data-hh]", fig).forEach(b => b.onclick = () => { const v = +b.dataset.hh; hr = v ? Math.min(hr + v, 24*7) : 0; draw(); }); draw();
    },
    heures(fig){
      const now = new Date(), H = hoursOf(now);
      if(!H){ fig.innerHTML = `<p class="help">Les heures n'ont pas pu être calculées.</p>`; return; }
      fig.innerHTML = `<div class="m-hbar">${H.hours.map(x => `<span class="${x.jour ? "j" : "n"}${x.i === H.cur ? " on" : ""}" style="--pc:${PL[x.pl].hex};flex:${(x.end - x.start)/36e5}" title="${fmt(x.start, HM)} · ${PL[x.pl].nom}"><span class="ag mg">${PL[x.pl].gl}${T}</span></span>`).join("")}</div>
        <div class="m-hbar-l"><span>Lever ${fmt(H.rise, HM)}</span><span>Coucher ${fmt(H.set, HM)}</span><span>Lever ${fmt(H.next, HM)}</span></div>
        <figcaption>Les 24 heures d'aujourd'hui pour ${h(lieu().nom)} : remarque comme les heures de jour et de nuit n'ont pas la même longueur.</figcaption>`;
    },
    caracteres(fig){
      let cur = "venus";
      fig.innerHTML = `<div class="m-cars">${D.PLANETES.map(p => `<button type="button" class="m-car" data-car="${p.id}" style="--pc:${p.hex}"><span class="ag mg">${p.gl}${T}</span><b>${p.verbe}</b></button>`).join("")}</div><div class="m-car-d"></div><figcaption>Chaque planète en un verbe. Touche pour lire ce qu'elle gouverne, et son ombre.</figcaption>`;
      const set = id => { cur = id; const p = PL[id]; q1(".m-car-d", fig).innerHTML = `<h4>${pg(id)} ${p.nom} · ${p.mot}</h4><p>${cap(p.domaines)}.</p><p class="help m-left">Son ombre : ${p.ombre}.</p>`; qa("[data-car]", fig).forEach(b => b.classList.toggle("on", b.dataset.car === id)); };
      qa("[data-car]", fig).forEach(b => b.onclick = () => set(b.dataset.car)); set(cur);
    },
    kamea(fig){
      let cur = "saturne", sel = null;
      const draw = () => { const M = D.KAMEAS[cur], n = M.length, sum = n*(n*n + 1)/2;
        const hl = sel == null ? null : sel.t === "r" ? (i, j) => i === sel.k : sel.t === "c" ? (i, j) => j === sel.k : sel.t === "d" ? (i, j) => i === j : (i, j) => i + j === n - 1;
        q1(".m-kh", fig).innerHTML = kameaSVG(cur, {hl});
        const vals = sel == null ? null : sel.t === "r" ? M[sel.k] : sel.t === "c" ? M.map(r => r[sel.k]) : sel.t === "d" ? M.map((r, i) => r[i]) : M.map((r, i) => r[n - 1 - i]);
        q1(".m-ks", fig).innerHTML = vals ? `${vals.join(" + ")} = <b>${sum}</b>` : `Carré ${PL[cur].nom === "Lune" ? "de la Lune" : "de " + PL[cur].nom} : ${n} × ${n} cases, <b>${sum}</b> par ligne, <b>${n*n*(n*n + 1)/2}</b> au total. Touche une case pour voir sa ligne.`;
        qa("[data-spl]", fig).forEach(b => { b.classList.toggle("on", b.dataset.spl === cur); b.setAttribute("aria-pressed", String(b.dataset.spl === cur)); });
        qa("[data-kc]", fig).forEach(r => r.onclick = () => { const [i, j] = r.dataset.kc.split(",").map(Number); sel = sel && sel.t === "r" && sel.k === i ? {t:"c", k:j} : {t:"r", k:i}; draw(); }); };
      fig.innerHTML = chipsPl(cur) + `<div class="m-kh"></div><p class="m-ks"></p><div class="m-acts"><button type="button" class="btn ghost small" data-kd="d">Diagonale</button><button type="button" class="btn ghost small" data-kd="a">Autre diagonale</button></div><figcaption>Les carrés d'Agrippa, livre II, chapitre 22. Toutes les lignes, colonnes et diagonales donnent la même somme.</figcaption>`;
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = b.dataset.spl; sel = null; draw(); });
      qa("[data-kd]", fig).forEach(b => b.onclick = () => { sel = {t:b.dataset.kd}; draw(); }); draw();
    },
    sceau(fig, o = {}){
      let cur = o.pl && PL[o.pl] ? o.pl : "venus", mot = "harmonie";
      fig.innerHTML = `<div class="m-form inline"><label>Un mot<input type="text" maxlength="24" value="${mot}" data-smot></label></div>${chipsPl(cur)}<div class="m-kh big"></div><p class="m-ks"></p>${o.full ? `<div class="m-acts"><button type="button" class="btn small" data-ssave>Garder ce sceau dans le carnet</button></div>` : ""}<figcaption>Adaptation moderne : A = 1, B = 2… Z = 26 ; au-delà de la plus grande case, on additionne les chiffres. Un cercle au départ, une barre à l'arrivée.</figcaption>`;
      const draw = () => { const n = D.KAMEAS[cur].length, nums = sceauNums(mot, n);
        q1(".m-kh", fig).innerHTML = nums.length ? kameaSVG(cur, {path:nums, anim:true}) : kameaSVG(cur);
        q1(".m-ks", fig).innerHTML = nums.length ? nums.map(x => `<span class="m-kv"><b>${x.c}</b>${x.v}</span>`).join("") : "Écris un mot.";
        qa("[data-spl]", fig).forEach(b => { b.classList.toggle("on", b.dataset.spl === cur); b.setAttribute("aria-pressed", String(b.dataset.spl === cur)); }); };
      q1("[data-smot]", fig).oninput = e => { mot = e.target.value; draw(); };
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = b.dataset.spl; draw(); });
      const sv = q1("[data-ssave]", fig); if(sv) sv.onclick = () => { if(!norm(mot).replace(/[^A-Z]/g, "")) return; st.sceaux.unshift({id:uid(), t:Date.now(), kind:"kamea", pl:cur, mot:mot.trim()}); save(); sv.textContent = "Gardé dans le carnet ✓"; sv.disabled = true; };
      draw();
    },
    election(fig, o = {}){
      let cur = o.pl && PL[o.pl] ? o.pl : "jupiter";
      fig.innerHTML = chipsPl(cur) + `<div class="m-el"></div><figcaption>Règles retenues : l'heure de la planète, une Lune croissante, la planète dans un signe où elle est forte (domicile ou exaltation) et pas rétrograde. Elles viennent du Picatrix et de la tradition des élections ; elles sont simplifiées.</figcaption>`;
      const run = () => { qa("[data-spl]", fig).forEach(b => { b.classList.toggle("on", b.dataset.spl === cur); b.setAttribute("aria-pressed", String(b.dataset.spl === cur)); });
        const host = q1(".m-el", fig); host.innerHTML = `<p class="help">Calcul des trente prochains jours…</p>`;
        setTimeout(() => { host.innerHTML = electionHTML(cur, o.full ? 6 : 3); bindLinks(host); }, 30); };
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = b.dataset.spl; run(); }); run();
    },
    frise(fig){
      const F = [["juive","IIe–VIe s.","Sefer Yetsirah","Le Livre de la formation : 10 sephiroth et 22 lettres."],["juive","vers 1280","Le Zohar","Composé en Castille, en grande partie par Moïse de León."],
        ["chret","1486","Pic de la Mirandole","900 thèses, dont des thèses magiques et kabbalistiques."],["chret","1517","Reuchlin","De arte cabalistica."],["chret","1652","Kircher","L'Arbre de vie dans l'Œdipe égyptien, avec la disposition reprise ensuite."],
        ["herm","1856","Éliphas Lévi","Relie les 22 atouts du tarot aux 22 lettres."],["herm","1888","Golden Dawn","Un système de correspondances universel."],["herm","1935","Dion Fortune","La Kabbale mystique."]];
      fig.innerHTML = `<div class="m-frise">${F.map(([k, d, t, x], i) => `<button type="button" class="m-fr ${k}" data-fr="${i}"><span class="d">${d}</span><b>${t}</b></button>`).join("")}</div><div class="m-fr-l"><span class="juive">Kabbale juive</span><span class="chret">Kabbale chrétienne</span><span class="herm">Kabbale hermétique</span></div><p class="m-fr-d"></p>`;
      const set = i => { q1(".m-fr-d", fig).innerHTML = `<b>${F[i][2]}, ${F[i][1]}.</b> ${F[i][3]}`; qa("[data-fr]", fig).forEach(b => b.classList.toggle("on", +b.dataset.fr === i)); };
      qa("[data-fr]", fig).forEach(b => b.onclick = () => set(+b.dataset.fr)); set(0);
    },
    arbre(fig, o = {}){
      let mode = o.mode || "lettres";
      fig.innerHTML = `<div class="sc-seg m-seg" role="group" aria-label="Affichage des sentiers"><button type="button" data-tm="lettres">Lettres</button><button type="button" data-tm="lames">Lames</button><button type="button" data-tm="nums">Numéros</button></div>
        <div class="m-treehost"></div><div class="m-acts"><button type="button" class="btn small" data-flash>L'Éclair</button></div>
        <figcaption>Disposition et attributions de la Golden Dawn. Les traits épais sont les lettres mères, les moyens les doubles, les fins les simples.</figcaption>`;
      const draw = () => { q1(".m-treehost", fig).innerHTML = treeSVG({mode}); qa("[data-tm]", fig).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tm === mode))); };
      qa("[data-tm]", fig).forEach(b => b.onclick = () => { mode = b.dataset.tm; draw(); });
      q1("[data-flash]", fig).onclick = () => { const t = q1(".m-tree", fig); t.classList.remove("flash"); void t.getBoundingClientRect(); t.classList.add("flash"); };
      draw();
    },
    sentiers(fig){ schemas.arbre(fig, {mode:"lames"}); q1("figcaption", fig).textContent = "Chaque numéro est un atout du tarot, dans la numérotation de la Golden Dawn (la Force en VIII, la Justice en XI). Touche un sentier pour voir sa lame."; },
    corresp(fig, o = {}){
      let cur = o.pl && PL[o.pl] ? "p:" + o.pl : "p:soleil";
      fig.innerHTML = `<div class="m-corr-pick">${chipsPl(cur.slice(2))}<div class="m-elchips">${D.ELEMENTS.map(e => `<button type="button" class="m-elc" data-sel="${e.id}" style="--pc:${e.hex}">${e.nom}</button>`).join("")}</div></div><div class="m-corr-out"></div>`;
      const draw = () => { const [t, id] = cur.split(":");
        qa("[data-spl]", fig).forEach(b => { b.classList.toggle("on", t === "p" && b.dataset.spl === id); b.setAttribute("aria-pressed", String(t === "p" && b.dataset.spl === id)); });
        qa("[data-sel]", fig).forEach(b => b.classList.toggle("on", t === "e" && b.dataset.sel === id));
        const out = q1(".m-corr-out", fig);
        if(t === "p"){ const p = PL[id]; out.innerHTML = `<article class="m-card m-cc" style="--pc:${p.hex}"><div class="m-cc-h"><span class="ag mg huge" style="color:${p.hex}">${p.gl}${T}</span><div><p class="eyebrow">${cap(p.jour)}</p><h2>${p.nom}</h2><p class="m-verbe">${p.mot} Son verbe : <b>${p.verbe}</b>.</p></div><div class="m-cc-k">${kameaSVG(id, {cls:"mini"})}</div></div>
            <p>${cap(p.domaines)}.</p>${corrTable(id)}<div class="m-acts start"><button type="button" class="btn small" data-mgo="atelier:election:${id}">Choisir un moment</button><button type="button" class="btn ghost small" data-mgo="atelier:sceau:${id}">Tracer sur son carré</button><button type="button" class="btn ghost small" data-msep="${p.sephira}">Sa sephira</button></div></article>`; }
        else { const e = D.ELEMENTS.find(x => x.id === id); out.innerHTML = `<article class="m-card m-cc" style="--pc:${e.hex}"><div class="m-cc-h"><span class="m-heb huge" style="color:${e.hex}">${e.lettre}</span><div><p class="eyebrow">Élément · ${e.dir}</p><h2>${e.nom}</h2><p class="m-verbe">${cap(e.sens)}.</p></div></div>
            <dl class="m-corr"><div><dt>Point cardinal</dt><dd>${e.dir}</dd></div><div><dt>Archange</dt><dd>${e.archange}</dd></div><div><dt>Outil</dt><dd>${cap(e.outil)}</dd></div><div><dt>Suite du tarot</dt><dd>${cap(e.suite)}</dd></div>
            <div><dt>Signes</dt><dd>${e.signes}</dd></div><div><dt>Qualités</dt><dd>${cap(e.qual)}</dd></div><div><dt>Humeur</dt><dd>${cap(e.humeur)}</dd></div><div><dt>Lettre</dt><dd><span class="m-heb">${e.lettre}</span> ${e.lettreNom}</dd></div><div class="w"><dt>Couleur</dt><dd><i class="m-sw" style="background:${e.hex}"></i>${cap(e.couleur)}</dd></div></dl>
            <p class="help m-left">Attributions de la Golden Dawn ; les qualités et les humeurs viennent de la médecine antique (Galien).</p></article>`; }
        bindLinks(out); };
      qa("[data-spl]", fig).forEach(b => b.onclick = () => { cur = "p:" + b.dataset.spl; draw(); });
      qa("[data-sel]", fig).forEach(b => b.onclick = () => { cur = "e:" + b.dataset.sel; draw(); });
      draw();
    },
    boussole(fig){
      let cur = "air";
      fig.innerHTML = `<div class="m-bh"></div><div class="m-b-d"></div><figcaption>Vue de dessus, l'est en haut : c'est vers lui qu'on se tourne pour commencer.</figcaption>`;
      const draw = () => { q1(".m-bh", fig).innerHTML = boussoleSVG(cur); const e = D.ELEMENTS.find(x => x.id === cur);
        q1(".m-b-d", fig).innerHTML = `<h4 style="color:${e.hex}">${e.dir} · ${e.nom}</h4><p><b>${e.archange}</b> · ${e.outil} · ${e.suite} · ${e.signes}</p><p class="help m-left">${cap(e.sens)}.</p>`;
        qa("[data-mel]", fig).forEach(g => g.onclick = () => { cur = g.dataset.mel; draw(); }); };
      draw();
    },
    pentagramme(fig){
      let k = "bannir";
      fig.innerHTML = `<div class="sc-seg m-seg" role="group"><button type="button" data-pk="bannir">Bannir</button><button type="button" data-pk="invoquer">Invoquer</button></div><div class="m-ph"></div><figcaption></figcaption>`;
      const draw = () => { q1(".m-ph", fig).innerHTML = pentaSVG(k, {cls:"anim"}); qa("[data-pk]", fig).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.pk === k)));
        q1("figcaption", fig).textContent = k === "bannir" ? "Le pentagramme de bannissement de la Terre : on part de la pointe en bas à gauche, on monte au sommet. C'est celui du Pentagramme mineur." : "Le pentagramme d'invocation de la Terre : on part du sommet vers la pointe en bas à gauche. Même figure, sens inverse."; };
      qa("[data-pk]", fig).forEach(b => b.onclick = () => { k = b.dataset.pk; draw(); }); draw();
    },
    pilier(fig){
      let k = -1, tm = null;
      fig.innerHTML = `<div class="m-pil"><div class="m-pil-c"></div><ol class="m-pil-l">${PILIER.map((c, i) => `<li data-pi="${i}"><b>${c.nom}</b> <span>${c.lieu}</span><i>${c.dit}</i></li>`).join("")}</ol></div><div class="m-acts"><button type="button" class="btn small" data-pgo>Allumer le pilier</button></div><figcaption>Les cinq centres du Pilier du milieu, d'après Regardie (1938).</figcaption>`;
      const draw = () => { q1(".m-pil-c", fig).innerHTML = corpsSVG(k); qa("[data-pi]", fig).forEach(li => li.classList.toggle("on", +li.dataset.pi <= k)); };
      q1("[data-pgo]", fig).onclick = () => { clearInterval(tm); k = -1; draw(); tm = setInterval(() => { k++; draw(); if(k >= 5){ clearInterval(tm); } }, 900); };
      draw();
    },
    spareetapes(fig){
      const ph = "Je trouve le calme", R = spareLetters(ph, true); let s = 0;
      const steps = [
        () => `<p class="m-sp-ph">« ${ph} »</p><p class="help">1. Une phrase, au présent, à l'affirmatif.</p>`,
        () => `<p class="m-sp-ph">${R.marks.map(m => `<span class="${m.drop ? "x" : ""}">${m.c}</span>`).join("")}</p><p class="help">2. On barre les lettres en double, et ici aussi les voyelles.</p>`,
        () => `<p class="m-sp-ph keep">${R.keep.map(c => `<span>${c}</span>`).join("")}</p><p class="help">3. Il reste ${R.keep.length} lettres.</p>`,
        () => `<div class="m-sp-g">${sigilSVG(R.keep, 0, {anim:true})}</div><p class="help">4. On les superpose et on simplifie : le sens a disparu.</p>`];
      fig.innerHTML = `<div class="m-sp"></div><div class="m-acts"><button type="button" class="btn ghost small" data-sp="-1">← Étape</button><button type="button" class="btn small" data-sp="1">Étape suivante →</button></div>`;
      const draw = () => { q1(".m-sp", fig).innerHTML = steps[s](); };
      qa("[data-sp]", fig).forEach(b => b.onclick = () => { s = Math.max(0, Math.min(steps.length - 1, s + +b.dataset.sp)); draw(); }); draw();
    },
    gnose(fig){
      fig.innerHTML = `<div class="m-two"><article class="m-card"><p class="eyebrow">Gnose calme</p><h4>Le vide</h4><p>Méditation, immobilité, respiration lente, fixation d'un point ou d'un sigil jusqu'à ce que la pensée s'arrête un instant.</p><p class="help m-left">C'est celle de ce cours.</p></article>
        <article class="m-card dim"><p class="eyebrow">Gnose excitée</p><h4>Le trop-plein</h4><p>Danse, chant, rythme, épuisement : on sature les sens jusqu'à ce que la pensée lâche.</p><p class="help m-left">Décrite par Carroll ; on ne la pratique pas ici.</p></article></div>
        <figcaption>Les deux voies de la gnose selon Peter Carroll, Liber Null, 1978.</figcaption>`;
    },
    spare(fig, o = {}){
      let ph = "Je suis calme et confiant", sv = true, v = 0;
      fig.innerHTML = `<div class="m-form inline"><label>Ta phrase<input type="text" maxlength="80" value="${h(ph)}" data-sph></label><label class="m-check"><input type="checkbox" data-ssv checked> Retirer aussi les voyelles</label></div>
        <p class="m-sp-ph small"></p><div class="m-sp-g big"></div><div class="m-acts"><button type="button" class="btn ghost small" data-sv>Une autre forme</button>${o.full ? `<button type="button" class="btn small" data-ssave>Garder dans le carnet</button>` : ""}</div>
        <figcaption>Chaque forme est un arrangement possible des mêmes lettres. Choisis celle qui te parle, puis oublie la phrase.</figcaption>`;
      const draw = () => { const R = spareLetters(ph, sv);
        q1(".m-sp-ph", fig).innerHTML = R.marks.length ? R.marks.map(m => `<span class="${m.drop ? "x" : ""}">${m.c}</span>`).join("") : "Écris une phrase.";
        q1(".m-sp-g", fig).innerHTML = R.keep.length ? sigilSVG(R.keep, v, {anim:true}) : ""; };
      q1("[data-sph]", fig).oninput = e => { ph = e.target.value; draw(); };
      q1("[data-ssv]", fig).onchange = e => { sv = e.target.checked; draw(); };
      q1("[data-sv]", fig).onclick = () => { v++; draw(); };
      const s2 = q1("[data-ssave]", fig); if(s2) s2.onclick = () => { if(!spareLetters(ph, sv).keep.length) return; st.sceaux.unshift({id:uid(), t:Date.now(), kind:"sigil", mot:ph.trim(), sv, v}); save(); s2.textContent = "Gardé dans le carnet ✓"; s2.disabled = true; };
      draw();
    },
    carnetmodele(fig){
      fig.innerHTML = `<article class="m-card m-sample"><p class="m-e-d">Mercredi 12 novembre · 7 h 42 · heure de Mercure · premier quartier</p><h4>Pentagramme du matin</h4>
        <p><b>Intention :</b> commencer la journée concentré.</p><p><b>Déroulé :</b> j'ai buté sur le pentagramme du nord, trop vite. Mains froides. Le calme est venu après la seconde Croix.</p><p><b>État après :</b> calme.</p></article>
        <figcaption>Une entrée type : la date, l'heure planétaire et la Lune sont remplies pour toi ; le reste, c'est toi.</figcaption>`;
    },
    etudes(fig){
      const E = [["Avant de chanter en public","Un petit rituel inventé diminue l'anxiété et améliore la performance.","Brooks et al., 2016"],["Après une perte","Les personnes qui font un rituel ressentent moins de chagrin.","Norton et Gino, 2014"],["Le piège","On se croit plus d'influence sur le hasard qu'on n'en a.","Langer, 1975"],["L'autre piège","Une description vague semble écrite pour soi.","Forer, 1949"]];
      fig.innerHTML = `<div class="m-studies">${E.map(([t, d, r], i) => `<article class="m-study${i > 1 ? " warn" : ""}"><b>${t}</b><p>${d}</p><small>${r}</small></article>`).join("")}</div><figcaption>Deux effets mesurés, deux biais connus.</figcaption>`;
    },
    signaux(fig){
      fig.innerHTML = `<ul class="m-sig">${K.SIGNAUX.map((s, i) => `<li><label><input type="checkbox" data-sg="${i}"> <span>${s}</span></label></li>`).join("")}</ul><p class="m-sig-r" aria-live="polite"></p>`;
      const upd = () => { const n = qa("[data-sg]:checked", fig).length; q1(".m-sig-r", fig).innerHTML = n === 0 ? "Aucun signal coché." : n === 1 ? "Un signal : garde-le à l'œil, et note-le dans ton carnet." : `<b>${n} signaux.</b> Mets la pratique de côté quelques jours et parles-en à quelqu'un de confiance, ou à un professionnel de santé.`; };
      qa("[data-sg]", fig).forEach(c => c.onchange = upd); upd();
    }
  };

  /* l'élection : les bonnes fenêtres d'une planète sur trente jours */
  function electionHTML(pid, nShow){
    if(!AC || !window.Astronomy) return `<p class="help">Le calcul n'est pas disponible.</p>`;
    const now = new Date(), out = []; let t = now;
    const diurnes = ["soleil","jupiter","saturne"], nocturnes = ["lune","venus","mars"];
    for(let d = 0; d < 30; d++){
      const H = hoursOf(t); if(!H) break;
      H.hours.forEach(x => { if(x.pl !== pid || x.end < now) return;
        const mid = new Date((x.start.getTime() + x.end.getTime())/2), m = AC.moonInfo(mid), e = etat(pid, mid, x.jour);
        let sc = 0; const why = [], warn = [];
        if(m.phase < 180){ sc += 2; why.push("Lune croissante"); } else warn.push("Lune décroissante");
        if(e.fort){ sc += 2; why.push(`${PL[pid].nom} ${e.dg.includes("domicile") ? "chez elle" : "exaltée"} en ${e.signe.nom}`); }
        if(e.faible){ sc -= 2; warn.push(`${PL[pid].nom} ${e.dg.includes("exil") ? "en exil" : "en chute"} en ${e.signe.nom}`); }
        if(e.retro){ sc -= 2; warn.push("rétrograde"); }
        if((diurnes.includes(pid) && x.jour) || (nocturnes.includes(pid) && !x.jour)){ sc += 1; why.push(x.jour ? "une heure de jour, sa secte" : "une heure de nuit, sa secte"); }
        out.push({x, sc, why, warn, signe:e.signe}); });
      t = new Date(H.next.getTime() + 60000);
    }
    if(!out.length) return `<p class="help">Aucune heure trouvée.</p>`;
    const best = [...out].sort((a, b) => b.sc - a.sc || a.x.start - b.x.start).slice(0, nShow).sort((a, b) => a.x.start - b.x.start);
    const nextAny = out[0];
    return `<p class="m-el-next">Prochaine heure ${PL[pid].nom === "Lune" ? "de la Lune" : "de " + PL[pid].nom} : <b>${cap(fmt(nextAny.x.start, {weekday:"long", day:"numeric", month:"long"}))}, ${fmt(nextAny.x.start, HM)} – ${fmt(nextAny.x.end, HM)}</b>.</p>
      <ol class="m-el-l">${best.map(r => `<li class="${r.sc >= 4 ? "top" : r.sc >= 2 ? "ok" : "low"}"><span class="m-el-d"><b>${cap(fmt(r.x.start, {weekday:"short", day:"numeric", month:"short"}))}</b>${fmt(r.x.start, HM)} – ${fmt(r.x.end, HM)}</span>
        <span class="m-el-w">${r.why.map(w => `<i class="y">${w}</i>`).join("")}${r.warn.map(w => `<i class="n">${w}</i>`).join("")}</span><span class="m-el-s" aria-label="score ${r.sc}">${"✦".repeat(Math.max(1, Math.min(5, r.sc)))}</span></li>`).join("")}</ol>
      <p class="help m-left">Les meilleures fenêtres des trente prochains jours, pour ${h(lieu().nom)}.</p>`;
  }

  /* la respiration en carré (animation) */
  function breath(host, o = {}){
    const LAB = ["Inspire","Retiens","Expire","Reste vide"];
    host.innerHTML = `<div class="m-breath${o.compact ? " compact" : ""}"><svg viewBox="-70 -70 140 140" aria-hidden="true"><rect x="-50" y="-50" width="100" height="100" rx="3" class="m-br-sq"/><path d="M-50 50 L-50 -50 L50 -50 L50 50 Z" class="m-br-prog" pathLength="4"/><circle r="6" class="m-br-dot" cx="-50" cy="50"/></svg>
      <div class="m-br-t"><b>Prêt</b><span>${o.cycles || 8} cycles · 4 temps</span></div></div><div class="m-acts"><button type="button" class="btn small" data-br>Commencer</button></div>`;
    const dot = q1(".m-br-dot", host), prog = q1(".m-br-prog", host), lb = q1(".m-br-t b", host), sub = q1(".m-br-t span", host), btn = q1("[data-br]", host);
    const C = [[-50,50],[-50,-50],[50,-50],[50,50],[-50,50]], SIDE = 4000, N = o.cycles || 8;
    let raf = null, t0 = 0;
    const stop = () => { cancelAnimationFrame(raf); raf = null; btn.textContent = "Recommencer"; };
    const tick = ts => { if(!host.isConnected){ cancelAnimationFrame(raf); return; }
      const el = ts - t0, tot = SIDE*4*N; if(el >= tot){ lb.textContent = "Terminé"; sub.textContent = `${N} cycles`; dot.setAttribute("cx", -50); dot.setAttribute("cy", 50); prog.style.strokeDashoffset = 4; stop(); if(o.onEnd) o.onEnd(); return; }
      const cyc = Math.floor(el/(SIDE*4)), inC = el % (SIDE*4), side = Math.floor(inC/SIDE), f = (inC % SIDE)/SIDE, a = C[side], b = C[side + 1];
      dot.setAttribute("cx", f1(a[0] + (b[0] - a[0])*f)); dot.setAttribute("cy", f1(a[1] + (b[1] - a[1])*f));
      prog.style.strokeDashoffset = String(4 - (side + f));
      lb.textContent = LAB[side]; sub.textContent = `${Math.ceil((1 - f)*4)} · cycle ${cyc + 1} sur ${N}`;
      raf = requestAnimationFrame(tick); };
    btn.onclick = () => { if(raf){ stop(); lb.textContent = "En pause"; return; } t0 = performance.now(); btn.textContent = "Arrêter"; raf = requestAnimationFrame(tick); };
  }

  /* ================================================================
     LE RITUEL GUIDÉ (plein écran)
     ================================================================ */
  let rite = null;
  function openRite(key, arg){
    const R = D.RITUELS[key]; if(!R) return;
    close();
    let ov = q1("#m-rite"); if(!ov){ ov = document.createElement("div"); ov.id = "m-rite"; ov.className = "m-rite"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); document.body.appendChild(ov); }
    const H = hoursOf(new Date()), pl = arg && PL[arg] ? arg : (H && H.cur >= 0 ? H.hours[H.cur].pl : "soleil");
    let steps = R.etapes;
    if(R.planet){ const p = PL[pl]; steps = [
      {t:"S'installer", txt:`Assieds-toi confortablement. Devant toi, imagine — ou pose — quelque chose de la couleur ${p.nom === "Lune" ? "de la Lune" : "de " + p.nom} : ${p.couleur}.`, vis:"glyph", d:40},
      {t:"Respirer la couleur", txt:`À chaque inspiration, laisse cette couleur emplir ta poitrine. À chaque expiration, laisse-la s'étendre autour de toi.`, vis:"glyph", d:60},
      {t:"Le signe", txt:`Regarde le glyphe ${p.nom === "Lune" ? "de la Lune" : "de " + p.nom}, sans effort, comme on regarde une flamme. ${p.contemple}`, vis:"glyph", d:90},
      {t:"Le verbe", txt:`Répète intérieurement, lentement : « ${cap(p.verbe)} ». Laisse venir les images, sans les retenir.`, dire:cap(p.verbe), vis:"glyph", d:60},
      {t:"Revenir", txt:"Laisse la couleur pâlir. Bouge les mains, ouvre les yeux. Note dans ton carnet ce qui est venu.", vis:"glyph", d:30}]; }
    rite = {key, R, steps, i:R.souffle ? 0 : -1, auto:false, t0:0, pl, tm:null};
    ov.style.setProperty("--pc", PL[pl].hex);
    ov.hidden = false; document.body.classList.add("locked", "m-riting");
    drawRite();
  }
  function riteVis(v, pl){
    if(!v) return "";
    const [k, a] = v.split(":"), n = a != null ? +a : null;
    if(k === "croix") return croixSVG(n);
    if(k === "pose") return croixSVG(-1);
    if(k === "penta") return cercleRitSVG(n, "penta");
    if(k === "cercle" || k === "anges" || k === "etoile") return cercleRitSVG(3, k);
    if(k === "corps") return corpsSVG(n, {labels:true});
    if(k === "glyph") return `<div class="m-rite-glyph" style="color:${PL[pl].hex}"><span class="ag mg">${PL[pl].gl}${T}</span></div>`;
    return "";
  }
  function drawRite(){
    const ov = q1("#m-rite"), r = rite; if(!ov || !r) return;
    clearTimeout(r.tm);
    if(r.R.souffle){
      ov.innerHTML = `<div class="m-rite-in"><header><p class="eyebrow">${r.R.statut} · ${r.R.duree}</p><h2>${r.R.nom}</h2><button type="button" class="m-rite-x" data-rx aria-label="Fermer">×</button></header>
        <div class="m-rite-body"><p class="m-rite-intro">${r.R.intro}</p><div class="m-rite-br"></div></div>
        <footer><button type="button" class="btn ghost small" data-rnote>Noter dans le carnet</button></footer></div>`;
      breath(q1(".m-rite-br", ov), {cycles:r.R.cycles});
    } else if(r.i < 0){
      ov.innerHTML = `<div class="m-rite-in"><header><p class="eyebrow">${r.R.statut} · ${r.R.duree}</p><h2>${r.R.nom}${r.R.planet ? ` · ${PL[r.pl].nom}` : ""}</h2><button type="button" class="m-rite-x" data-rx aria-label="Fermer">×</button></header>
        <div class="m-rite-body"><div class="m-rite-vis">${riteVis(r.steps[0].vis, r.pl)}</div><p class="m-rite-intro">${r.R.intro}</p><p class="help">${r.steps.length} étapes. Tu peux avancer toi-même, ou laisser le minuteur passer d'une étape à l'autre.</p>
          ${r.R.planet ? `<div class="m-rite-pl">${chipsPl(r.pl, "data-rpl")}</div>` : ""}</div>
        <footer><label class="m-check"><input type="checkbox" data-rauto${r.auto ? " checked" : ""}> Minuteur</label><button type="button" class="btn" data-rgo="0">Commencer</button></footer></div>`;
    } else {
      const s = r.steps[r.i], last = r.i === r.steps.length - 1;
      ov.innerHTML = `<div class="m-rite-in"><header><p class="eyebrow">${r.R.nom} · ${r.i + 1} / ${r.steps.length}</p><h2>${s.t}</h2><button type="button" class="m-rite-x" data-rx aria-label="Fermer">×</button></header>
        <div class="m-rite-dots">${r.steps.map((_, k) => `<i class="${k < r.i ? "d" : k === r.i ? "c" : ""}"></i>`).join("")}</div>
        <div class="m-rite-body"><div class="m-rite-vis">${riteVis(s.vis, r.pl)}</div><p class="m-rite-txt">${s.txt}</p>${s.dire ? `<p class="m-rite-dire">${s.dire}</p>` : ""}${s.trad ? `<p class="m-rite-trad">${s.trad}</p>` : ""}</div>
        ${r.auto && s.d ? `<div class="m-rite-time"><i style="animation-duration:${s.d}s"></i></div>` : ""}
        <footer><button type="button" class="btn ghost small" data-rgo="${r.i - 1}"${r.i === 0 ? " disabled" : ""}>←</button><label class="m-check"><input type="checkbox" data-rauto${r.auto ? " checked" : ""}> Minuteur</label>
          ${last ? `<button type="button" class="btn" data-rnote>Terminer et noter</button>` : `<button type="button" class="btn" data-rgo="${r.i + 1}">Suivant</button>`}</footer></div>`;
      if(r.auto && s.d && !last) r.tm = setTimeout(() => { if(rite === r && r.i === r.steps.indexOf(s)){ r.i++; drawRite(); } }, s.d*1000);
    }
    q1("[data-rx]", ov).onclick = closeRite;
    qa("[data-rgo]", ov).forEach(b => b.onclick = () => { r.i = Math.max(0, +b.dataset.rgo); drawRite(); });
    qa("[data-rauto]", ov).forEach(c => c.onchange = () => { r.auto = c.checked; drawRite(); });
    qa("[data-rpl]", ov).forEach(b => b.onclick = () => { const k = r.key; openRite(k, b.dataset.rpl); });
    qa("[data-rnote]", ov).forEach(b => b.onclick = () => { const nom = r.R.nom + (r.R.planet ? " · " + PL[r.pl].nom : ""); closeRite(); cn = {edit:"new", prefill:"", ref:null, tab:"entrees", titre:nom}; mView("carnet"); const t = q1('#v-m-carnet input[name="titre"]'); if(t){ t.value = nom; } const ty = q1('#v-m-carnet select[name="type"]'); if(ty) ty.value = r.R.planet ? "contemplation" : "rituel"; });
  }
  function closeRite(){ const ov = q1("#m-rite"); if(rite) clearTimeout(rite.tm); rite = null; if(ov){ ov.hidden = true; ov.innerHTML = ""; } document.body.classList.remove("locked", "m-riting"); }
  document.addEventListener("keydown", e => { if(e.key === "Escape" && rite) closeRite(); });

  /* ================================================================
     LES LIENS COMMUNS
     ================================================================ */
  function bindLinks(root){
    qa("[data-mpl]", root).forEach(b => { const f = () => planetSheet(b.dataset.mpl); b.onclick = f; b.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
    qa("[data-msep]", root).forEach(b => { const f = () => sepSheet(+b.dataset.msep); b.onclick = f; b.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
    qa("[data-mpath]", root).forEach(b => { if(b.getAttribute("pointer-events") === "none") return; const f = () => pathSheet(+b.dataset.mpath); b.onclick = f; b.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
    qa("[data-mrite]", root).forEach(b => b.onclick = () => { const [k, a] = b.dataset.mrite.split(":"); openRite(k, a); });
    qa("[data-mtool]", root).forEach(b => b.onclick = () => { at = {tool:b.dataset.mtool || null, arg:null}; renderAtelier(); window.scrollTo({top:0}); });
    qa("[data-mgo]", root).forEach(b => b.onclick = () => go(b.dataset.mgo));
    qa("[data-mmod]", root).forEach(b => b.onclick = () => { ev = {mod:b.dataset.mmod || null, lec:null, quiz:false}; renderEcole(); window.scrollTo({top:0}); });
    qa("[data-mlec]", root).forEach(b => b.onclick = () => { const [m, i] = b.dataset.mlec.split(":"); ev = {mod:m, lec:+i, quiz:false}; renderEcole(); window.scrollTo({top:0}); });
    qa("[data-mquiz]", root).forEach(b => b.onclick = () => { ev = {mod:b.dataset.mquiz, lec:null, quiz:true}; qz = null; renderEcole(); window.scrollTo({top:0}); });
    qa("[data-mread]", root).forEach(b => b.onclick = () => { const id = b.dataset.mread; if(!st.done.includes(id)){ st.done.push(id); save(); }
      const nx = b.dataset.mnext; if(nx.startsWith("quiz:")){ ev = {mod:nx.slice(5), lec:null, quiz:true}; qz = null; } else { const [m, i] = nx.split(":"); ev = {mod:m, lec:+i, quiz:false}; } renderEcole(); window.scrollTo({top:0}); });
    qa("[data-mnote]", root).forEach(b => b.onclick = () => { const l = K.MODULES.flatMap(m => m.lecons).find(x => x.id === b.dataset.mnote); cn = {edit:"new", prefill:l ? l.carnet + "\n" : "", ref:l ? l.t : null, tab:"entrees"}; mView("carnet"); });
    qa("[data-mcn]", root).forEach(b => b.onclick = () => { cn = {edit:b.dataset.mcn || null, prefill:null, ref:null, tab:cn.tab || "entrees"}; renderCarnet(); window.scrollTo({top:0}); });
    qa("[data-mdel]", root).forEach(b => b.onclick = () => { if(b.dataset.armed !== "1"){ b.dataset.armed = "1"; b.textContent = "Toucher encore pour supprimer"; return; } st.carnet = st.carnet.filter(x => x.id !== b.dataset.mdel); save(); cn = {edit:null, tab:"entrees"}; renderCarnet(); });
    qa("[data-mwipe]", root).forEach(b => b.onclick = () => { if(b.dataset.armed !== "1"){ b.dataset.armed = "1"; b.textContent = "Toucher encore : tout sera effacé"; return; } const v = st.vue; st = DEF(); st.vue = v; save(); renderCarnet(); });
    qa("[data-mastro]", root).forEach(b => b.onclick = () => { close(); if(window.ArcanesAstro) window.ArcanesAstro.switchTo("astro", b.dataset.mastro); });
    qa("[data-mtarot]", root).forEach(b => b.onclick = () => { close(); if(window.ArcanesAstro) window.ArcanesAstro.switchTo("tarot", b.dataset.mtarot); });
  }
  function go(s){
    const [v, a, b] = s.split(":"); close();
    if(v === "atelier"){ at = {tool:a || null, arg:b || null}; mView("atelier"); }
    else if(v === "carnet"){ cn = a === "new" ? {edit:"new", prefill:null, ref:null, tab:"entrees"} : {edit:null, tab:"entrees"}; mView("carnet"); }
    else mView(v);
  }

  /* ================================================================
     L'UNIVERS : entrer, sortir, naviguer
     ================================================================ */
  const redraw = () => { if(typeof drawBackground === "function") try{ drawBackground(); }catch(e){} };
  function mView(v){
    if(!VIEWS.includes(v)) v = "moment";
    if(!on) return enter(v);
    st.vue = v; save();
    const rite_ = v === "moment", was = document.documentElement.classList.contains("u-rite");
    document.documentElement.classList.toggle("u-rite", rite_); document.body.classList.toggle("u-rite", rite_);
    if(rite_ !== was) redraw();
    qa(".view").forEach(s => s.hidden = s.id !== "v-m-" + v);
    qa("button", mNav).forEach(b => b.setAttribute("aria-current", b.dataset.mview === v ? "page" : "false"));
    try{ history.replaceState(null, "", "#magie-" + v); }catch(e){}
    if(v !== "moment") clearTimeout(momTimer);
    if(v === "moment") renderMoment(); if(v === "atelier") renderAtelier(); if(v === "ecole") renderEcole(); if(v === "histoire") renderHistoire(); if(v === "carnet") renderCarnet();
    window.scrollTo({top:0});
  }
  function init(){
    if(inited) return true;
    const tNav = q1(".top .nav"); if(!tNav) return false;
    mNav = document.createElement("nav"); mNav.className = "nav mnav"; mNav.setAttribute("aria-label", "Sections de la magie"); mNav.hidden = true;
    mNav.innerHTML = VIEWS.map(v => `<button type="button" data-mview="${v}">${ICO[v]}<span class="l-long">${LAB[v][0]}</span><span class="l-short">${LAB[v][1]}</span></button>`).join("");
    const last = q1(".top .anav") || tNav; last.after(mNav);
    qa("button", mNav).forEach(b => b.onclick = () => { const v = b.dataset.mview;
      if(v === "atelier" && st.vue === "atelier") at = {tool:null, arg:null};
      if(v === "ecole" && st.vue === "ecole") ev = {mod:null, lec:null, quiz:false};
      if(v === "carnet") cn = {edit:null, tab:cn.tab || "entrees"};
      mView(v); });
    const main = q1("main");
    VIEWS.forEach(v => { const s = document.createElement("section"); s.className = "view m-view"; s.id = "v-m-" + v; s.hidden = true; main.appendChild(s); });
    document.addEventListener("visibilitychange", () => { if(!document.hidden && on && st.vue === "moment") renderMoment(); });
    inited = true; return true;
  }
  function enter(v){
    if(!init()) return;
    const foot = q1(".foot");
    if(!on && foot){ otherFoot = foot.innerHTML; foot.innerHTML = FOOT; }
    on = true;
    qa(".top .nav").forEach(n => n.hidden = n !== mNav);
    document.documentElement.classList.add("u-magie"); document.body.classList.add("u-magie");
    document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night");
    loadImgs();
    mView(v || (VIEWS.includes(st.vue) ? st.vue : "moment"));
  }
  /* quitter la magie : l'autre univers reprend la main (il remet lui-même sa navigation et son pied de page) */
  function leave(){
    if(!on) return;
    on = false; clearTimeout(momTimer); closeRite();
    if(mNav) mNav.hidden = true;
    document.documentElement.classList.remove("u-magie", "u-rite"); document.body.classList.remove("u-magie", "u-rite");
    const foot = q1(".foot"); if(foot && otherFoot) foot.innerHTML = otherFoot;
  }
  window.magieBackdrop = (x, w, h2, v) => {
    const wide = w > 900, dark = document.documentElement.classList.contains("u-rite"), A = (wide ? .2 : .13)*(dark ? 1 : .7);
    if(dark) return; // Le moment a déjà son horloge en heptagramme : le fond reste un ciel nu
    x.strokeStyle = v("--tree") || "#8a2a1b"; x.fillStyle = v("--tree") || "#8a2a1b"; x.lineWidth = 1; x.globalAlpha = A;
    const R = Math.min(h2*.42, 400, w*.46), cx = wide ? w - R - Math.max(36, w*.05) : w/2, cy = wide ? h2*.52 : h2*.44;
    const ring = r => { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI*2); x.stroke(); };
    ring(R); ring(R*.97); ring(R*.72); ring(R*.7);
    for(let d = 0; d < 360; d += 360/28){ const a = d*rad; x.beginPath(); x.moveTo(cx + Math.cos(a)*R*.97, cy + Math.sin(a)*R*.97); x.lineTo(cx + Math.cos(a)*R*.9, cy + Math.sin(a)*R*.9); x.stroke(); }
    const P = i => { const a = (-90 + i*360/7)*rad; return [cx + Math.cos(a)*R*.7, cy + Math.sin(a)*R*.7]; };
    const o = [0, 3, 6, 2, 5, 1, 4]; x.beginPath(); o.forEach((i, k) => { const [px, py] = P(i); if(k) x.lineTo(px, py); else x.moveTo(px, py); }); x.closePath(); x.stroke();
    x.beginPath(); for(let i = 0; i < 7; i++){ const [px, py] = P(i); if(i) x.lineTo(px, py); else x.moveTo(px, py); } x.closePath(); x.stroke();
    x.font = `${Math.round(R/9)}px "Arcanes Symboles","Segoe UI Symbol",serif`; x.textAlign = "center"; x.textBaseline = "middle";
    D.CHALD.forEach((id, i) => { const a = (-90 + i*360/7)*rad; x.fillText(PL[id].gl + T, cx + Math.cos(a)*R*.835, cy + Math.sin(a)*R*.835); });
    x.font = `${Math.round(R/16)}px "Frank Ruhl Libre",serif`;
    "אבגדהוזחטיכלמנסעפצקרשת".split("").forEach((c, i) => { const a = (-90 + (i + .5)*360/22)*rad; x.globalAlpha = A*.8; x.fillText(c, cx + Math.cos(a)*R*1.07, cy + Math.sin(a)*R*1.07); });
    x.globalAlpha = A; x.beginPath(); x.arc(cx, cy, 3, 0, Math.PI*2); x.fill();
    x.globalAlpha = 1;
  };
  const S0 = () => st;
  window.ArcanesMagie = {enter, leave, active, view:mView, state:S0, openRite, hoursOf};
  /* l'entrée directe par l'adresse (#magie-…) est gérée par astro.js, qui tient la pilule des trois arts */
})();
