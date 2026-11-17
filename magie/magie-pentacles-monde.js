/* ===== Arcanes · Magie : les pentacles du monde et l'atelier en sept étapes =====
   Remplace le cabinet des pentacles : « Composer le tien » (sept étapes), « Les pentacles du monde » (galerie),
   « Anatomie ». S'appuie sur magie-pentacles.js (window.MAGIE_PENT) et sur le moteur des écritures
   (window.ArcanesEcritures).
   Garde-fou d'Arcanes : on ne montre que des pentacles tournés vers soi, et l'atelier ne fabrique que des emblèmes.
   Caractères de l'Arbatel redessinés pour Arcanes d'après l'édition anglaise de 1655 (Turner), domaine public.
   Les 72 noms sont calculés à partir d'Exode 14, 19-21, comme le font les kabbalistes. */
(() => {
  const M = window.ArcanesMagie, PT = window.MAGIE_PENT, E = window.ArcanesEcritures;
  if(!M || !M._ || !PT || !E) return;
  const _ = M._, X = _.EXT, PL = _.PL, D = _.D, {h, cap, f1, sheet, uid} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const st = () => _.st(), save = () => _.save();
  const AC = typeof ASTRO_CALC !== "undefined" ? ASTRO_CALC : null;
  const PLAN = PT.PLAN, PP = id => PLAN.find(p => p.id === id) || PLAN[1];
  const DAY = 864e5, rad = Math.PI/180;

  /* ================================================================
     LES 72 GÉNIES (Lenain, 1823) : noms tirés d'Exode 14, 19-21
     ================================================================ */
  const V19 = "ויסע מלאך האלהים ההלך לפני מחנה ישראל וילך מאחריהם ויסע עמוד הענן מפניהם ויעמד מאחריהם";
  const V20 = "ויבא בין מחנה מצרים ובין מחנה ישראל ויהי הענן והחשך ויאר את הלילה ולא קרב זה אל זה כל הלילה";
  const V21 = "ויט משה את ידו על הים ויולך יהוה את הים ברוח קדים עזה כל הלילה וישם את הים לחרבה ויבקעו המים";
  const NOMS72 = "Vehuiah Jeliel Sitael Elemiah Mahasiah Lelahel Achaiah Cahethel Haziel Aladiah Lauviah Hahaiah Iezalel Mebahel Hariel Hakamiah Lauviah Caliel Leuviah Pahaliah Nelchael Ieiaiel Melahel Haheuiah Nith-Haiah Haaiah Ierathel Seheiah Reiiel Omael Lecabel Vasariah Iehuiah Lehahiah Chavakiah Menadel Aniel Haamiah Rehael Ieiazel Hahahel Mikael Veuliah Ielahiah Sealiah Ariel Asaliah Mihael Vehuel Daniel Hahasiah Imamiah Nanael Nithael Mebahiah Poiel Nemamiah Ieialel Harahel Mitzrael Umabel Iahhel Anauel Mehiel Damabiah Manakel Eiael Habuhiah Rochel Iabamiah Haiaiel Mumiah".split(" ");
  const BASE = s => [...s.replace(/ /g, "")].map(c => ({"ך":"כ","ם":"מ","ן":"נ","ף":"פ","ץ":"צ"}[c] || c));
  const SOF = {"כ":"ך","מ":"ם","נ":"ן","פ":"ף","צ":"ץ"};
  const GENIES = (() => { const a = BASE(V19), b = BASE(V20), c = BASE(V21);
    return NOMS72.map((nom, i) => { const rac = a[i] + b[71 - i] + c[i], suf = /iah$/i.test(nom) ? "יה" : "אל", full = rac + suf;
      return {n:i + 1, nom, rac, heb:full.slice(0, -1) + (SOF[full.slice(-1)] || full.slice(-1)), suf}; }); })();
  const SIGNES = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  const sunLon = d => { try{ if(AC) return ((AC.lonOf("soleil", d) % 360) + 360) % 360; }catch(e){} const y0 = Date.UTC(d.getUTCFullYear(), 2, 20); return ((((d - y0)/DAY)*0.9856 % 360) + 360) % 360; };
  const DF = {day:"numeric", month:"long"};
  function genieOf(date){
    const lon = sunLon(date), i = Math.floor(lon/5) % 72, g = GENIES[i], y = date.getUTCFullYear(), days = [];
    for(let k = 0; k < 366; k++){ const d = new Date(Date.UTC(y, 0, 1, 12) + k*DAY); if(Math.floor(sunLon(d)/5) % 72 === i) days.push(d); }
    const deg = i*5, sg = SIGNES[Math.floor(deg/30)], d0 = deg % 30;
    return Object.assign({}, g, {deg:`de ${d0}° à ${d0 + 5}° du ${sg}`, du:days.length ? days[0].toLocaleDateString("fr-FR", DF) : "", au:days.length ? days[days.length - 1].toLocaleDateString("fr-FR", DF) : ""});
  }

  /* ================================================================
     LES CARACTÈRES DE L'ARBATEL (1575), redessinés
     ================================================================ */
  const OLY = [
    {nom:"Aratron", pl:"saturne", vb:"362 208 416 196", d:"M377 223V386H762V223M377 325H531V222M449 325V283H654M583 223V326H762",
      dit:"Il gouverne ce qui relève de Saturne. Le texte lui prête l'enseignement de l'alchimie, de la magie et de la médecine, et le pouvoir de changer en pierre."},
    {nom:"Bethor", pl:"jupiter", vb:"333 757 474 186", d:"M348 773V925H730V771M348 848H526V787M486 786H419V892H791V821", dots:[[419,875,7],[446,891,7]],
      dit:"Jupiter. Celui qui porte son caractère serait élevé aux plus hautes dignités ; il ouvre les trésors et prolonge la vie."},
    {nom:"Phaleg", pl:"mars", vb:"404 1148 332 180", d:"M419 1164V1312H623V1166M465 1163V1276H671V1164M507 1163V1246H720V1163M534 1194C548 1188 556 1175 559 1163C562 1175 570 1188 578 1194ZM557 1194V1215M557 1206C560 1200 567 1200 567 1208V1226",
      dit:"Mars, « le prince de la paix », dit l'Arbatel. Son caractère donnerait de grands honneurs dans les affaires de la guerre."},
    {nom:"Och", pl:"soleil", vb:"564 268 296 236", d:"M579 282V436H845V283M712 294V472", rings:[[711,481,9]],
      dit:"Le Soleil. Il donnerait la santé, une grande sagesse et la science des remèdes, et changerait toute chose en or."},
    {nom:"Hagith", pl:"venus", vb:"491 771 442 216", d:"M646 972H505V786H918V972H727M645 843V972M728 843V972M593 843V895H793V843",
      dit:"Vénus. Celui qui porte son caractère deviendrait très beau ; il change le cuivre en or, et l'or en cuivre."},
    {nom:"Ophiel", pl:"mercure", vb:"421 238 298 256", d:"M435 252V479M470 279H605L437 477M470 279L435 355M433 358H705L626 479H519M521 322V479", rings:[[520,315,6]],
      dit:"Mercure. Il enseigne tous les arts, et son caractère permettrait de changer le vif-argent en pierre philosophale."},
    {nom:"Phul", pl:"lune", vb:"468 674 204 220", d:"M485 696V865M544 696V877M602 698V883M654 696V865M485 865Q570 815 654 865M544 877Q573 855 602 883", rings:[[486,690,5],[545,690,5],[603,692,5],[655,690,5]], dots:[[544,841,5],[602,879,6]],
      dit:"La Lune. Il change les métaux en argent, gouverne les eaux et guérirait l'hydropisie."}
  ];
  const olySVG = (o, cls = "") => `<svg class="pm-oly ${cls}" viewBox="${o.vb}" role="img" aria-label="Caractère de ${o.nom}"><path d="${o.d}" class="pm-oly-l"/>${(o.rings || []).map(r => `<circle cx="${r[0]}" cy="${r[1]}" r="${r[2]}" class="pm-oly-r"/>`).join("")}${(o.dots || []).map(r => `<circle cx="${r[0]}" cy="${r[1]}" r="${r[2]}" class="pm-oly-d"/>`).join("")}</svg>`;

  /* ================================================================
     LE DESSIN D'UN PENTACLE COMPOSÉ
     ================================================================ */
  const NDIV = PT.NDIV, VERSETS = PT.VERSETS;
  const SCRIPTS = [["latin","Latin"],["grec","Grec"],["hebreu","Hébreu"],["theban","Thébain"],["celeste","Céleste"],["malachim","Malachim"],["passage","Passage du fleuve"],["ideo","Idéogrammes"]];
  const SRC = [["verset","Un verset"],["devise","Ma devise"],["nom","Le nom divin"],["prenom","Mon prénom"],["genie","Mon génie"]];
  const FIGS = [["aucune","Aucune"],["carre","Carré"],["penta","Pentagramme"],["hexa","Hexagramme"],["hepta","Heptagramme"],["octo","Octogramme"],["rayons","Rayons"]];
  const CTRS = [["kamea","Le carré de la planète"],["sceau","Le sceau de ta devise"],["sigil","Le sigil de ta devise"],["glyphe","Le signe de la planète"],["nom","Le nom divin"],["croix","La croix"],["sator","Le carré SATOR"],["genie","Le nom de ton génie"]];
  /* le contenu d'un texte de couronne, selon l'écriture */
  function srcText(r, o){
    const v = VERSETS[o.vi || 0] || VERSETS[0], g = o.genie ? GENIES[o.genie - 1] : null;
    if(r.src === "verset") return {heb:v[2], fr:v[1]};
    if(r.src === "nom") return {heb:NDIV[o.pl][0], fr:NDIV[o.pl][1]};
    if(r.src === "genie" && g) return {heb:g.heb, fr:g.nom};
    if(r.src === "prenom") return {fr:(o.prenom || "").trim() || "Mon prénom"};
    return {fr:(o.devise || "").trim() || "Ce que je cultive"};
  }
  function ringContent(r, o){
    const t = srcText(r, o), fr = t.fr || "", sc = r.script;
    if(sc === "latin") return {u:fr.toUpperCase(), cls:"lat"};
    if(sc === "grec") return {u:E.grText(fr) || fr.toUpperCase(), cls:"lat gr"};
    if(sc === "hebreu") return {u:t.heb || E.hebText(fr), cls:"he"};
    if(sc === "ideo"){ const s = E.ideoText(fr); return {u:s.toUpperCase(), cls:"lat id"}; }
    const seq = t.heb && sc !== "theban" ? E.layoutHeb(t.heb, sc) : E.layout(fr, sc);
    return seq && seq.length ? {g:seq} : {u:fr.toUpperCase(), cls:"lat"};
  }
  const ringPath = (id, r) => `<path id="${id}" d="M${f1(-r)} 0 A${f1(r)} ${f1(r)} 0 1 1 ${f1(r)} 0 A${f1(r)} ${f1(r)} 0 1 1 ${f1(-r)} 0" fill="none"/>`;
  function ringSVG(c, rb, ch, id){
    const C = 2*Math.PI*rb;
    if(c.u != null){
      const one = c.u.trim() || "·", sep = c.cls === "he" ? "  ✶  " : "  ·  ", fs = ch/(c.cls === "he" ? .62 : .72);
      let txt = one, guard = 0; while(txt.length*fs*.62 < C*.82 && guard++ < 12) txt += sep + one; txt += sep;
      return `<defs>${ringPath(id, rb)}</defs><text class="pm-rt ${c.cls}" style="font-size:${f1(fs)}px" ${c.cls === "he" ? 'lang="he"' : ""}><textPath href="#${id}" textLength="${f1(C*.985)}" lengthAdjust="spacing">${h(txt)}</textPath></text>`;
    }
    const s = ch/100, gap = 16, sepW = 34; let unit = c.g.reduce((a, g, i) => a + g.w + (i < c.g.length - 1 ? gap : 0), 0) + sepW;
    const avail = C/s, n = Math.max(1, Math.floor(avail/unit)), items = [];
    for(let k = 0; k < n; k++){ c.g.forEach(g => items.push(g)); items.push({sep:true, w:sepW - gap}); }
    const used = items.reduce((a, g) => a + g.w, 0), extra = (avail - used)/items.length;
    let a = 0; const out = [];
    items.forEach(g => { const w = g.w + extra; const mid = a + w/2, th = (mid*s/rb)/rad;
      if(g.sep) out.push(`<circle transform="rotate(${f1(th)}) translate(0 ${f1(-rb - ch*.42)})" r="${f1(ch*.12)}" class="pm-sep"/>`);
      else if(!g.sp) out.push(`<path transform="rotate(${f1(th)}) translate(0 ${f1(-rb)}) scale(${s.toFixed(4)}) translate(${f1(-g.w/2)} 0)" d="${g.d}" class="pm-gl"/>`);
      a += w; });
    return out.join("");
  }
  function figSVG(f, R){
    const pts = (n, step, rot = -90) => { const P = Array.from({length:n}, (_x, i) => { const a = (rot + i*360/n)*rad; return [R*Math.cos(a), R*Math.sin(a)]; }); const order = []; let k = 0; for(let i = 0; i < n; i++){ order.push(P[k]); k = (k + step) % n; } return "M" + order.map(p => f1(p[0]) + " " + f1(p[1])).join(" L") + " Z"; };
    if(f === "carre") return `<path d="${pts(4, 1, -45)}" class="pt-fig thin"/>`;
    if(f === "penta") return `<path d="${pts(5, 2)}" class="pt-fig thin"/>`;
    if(f === "hexa") return `<path d="${pts(3, 1)} ${pts(3, 1, 90)}" class="pt-fig thin"/>`;
    if(f === "hepta") return `<path d="${pts(7, 3)}" class="pt-fig thin"/>`;
    if(f === "octo") return `<path d="${pts(8, 3)}" class="pt-fig thin"/>`;
    if(f === "rayons") return `<g class="pt-fig thin">${Array.from({length:12}, (_x, i) => { const a = (-90 + i*30)*rad, r0 = R*.55; return `<line x1="${f1(r0*Math.cos(a))}" y1="${f1(r0*Math.sin(a))}" x2="${f1(R*Math.cos(a))}" y2="${f1(R*Math.sin(a))}"/>`; }).join("")}</g>`;
    return "";
  }
  /* le sceau d'Agrippa : le mot suivi lettre à lettre sur le carré de la planète */
  function sceauSVG(pl, mot, R){
    const K = D.KAMEAS[pl]; if(!K) return "";
    const n = K.length, max = n*n, c = 2*R/n, pos = {}; K.forEach((row, i) => row.forEach((v, j) => pos[v] = [-R + j*c + c/2, -R + i*c + c/2]));
    const dg = v => String(v).split("").reduce((a, b) => a + +b, 0);
    const nums = String(mot || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "").split("").map(ch => { let v = ch.charCodeAt(0) - 64; while(v > max) v = dg(v); return v; });
    const pts = []; nums.forEach(v => { if(!pts.length || pts[pts.length - 1] !== v) pts.push(v); });
    let s = `<g class="pm-grid">${Array.from({length:n + 1}, (_x, i) => `<line x1="${f1(-R + i*c)}" y1="${f1(-R)}" x2="${f1(-R + i*c)}" y2="${f1(R)}"/><line x1="${f1(-R)}" y1="${f1(-R + i*c)}" x2="${f1(R)}" y2="${f1(-R + i*c)}"/>`).join("")}</g>`;
    if(pts.length < 2) return s + `<text y="5" class="pt-heb sm">${h(PL[pl].gl || "")}</text>`;
    const P = pts.map(v => pos[v]); s += `<path d="M${P.map(p => f1(p[0]) + " " + f1(p[1])).join(" L")}" class="pt-fig pm-seal"/>`;
    s += `<circle cx="${f1(P[0][0])}" cy="${f1(P[0][1])}" r="${f1(c*.16)}" class="pm-seal-o"/>`;
    const a = P[P.length - 1], b = P[P.length - 2]; let dx = a[0] - b[0], dy = a[1] - b[1]; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L; const bl = c*.2;
    return s + `<line x1="${f1(a[0] - dy*bl)}" y1="${f1(a[1] + dx*bl)}" x2="${f1(a[0] + dy*bl)}" y2="${f1(a[1] - dx*bl)}" class="pt-fig"/>`;
  }
  function centreSVG(o, Rc){
    const k = Rc/68, sc = inner => `<g transform="scale(${k.toFixed(3)})">${inner}</g>`;
    if(o.ctr === "sceau") return sceauSVG(o.pl, o.devise || o.prenom || "lumiere", Rc*.62);
    if(o.ctr === "croix") return `<g class="pt-fig">${`<path d="M0 ${f1(-Rc*.72)} V${f1(Rc*.72)} M${f1(-Rc*.48)} ${f1(-Rc*.2)} H${f1(Rc*.48)}"/>`}</g>${[[0, -Rc*.72], [0, Rc*.72], [-Rc*.48, -Rc*.2], [Rc*.48, -Rc*.2]].map(p => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${f1(Rc*.05)}" class="pt-dot"/>`).join("")}`;
    if(o.ctr === "genie" && o.genie){ const g = GENIES[o.genie - 1]; return sc(PT.centre({dessin:"nom", pl:o.pl, centre:[g.heb, g.rac.split("").join(" ")]}, o.col)); }
    if(o.ctr === "sigil"){ const L = _.spareLetters(o.devise || "je trouve le calme", true).keep; const sig = _.sigilSVG(L.length ? L : ["C"], 1, {cercle:false}); return sc(PT.centre({dessin:"sigil", sigil:sig, pl:o.pl}, o.col)); }
    if(o.ctr === "sator") return sc(PT.centre({dessin:"sator"}, o.col));
    const map = {kamea:"kamea", glyphe:"glyphe", nom:"nom"};
    return sc(PT.centre({dessin:map[o.ctr] || "glyphe", pl:o.pl}, o.col));
  }
  let pmid = 0;
  function compose(o, opt = {}){
    const id = "pm" + (++pmid), col = PP(o.pl).hex, rings = (o.rings || []).slice(0, 3), n = Math.max(1, rings.length);
    const B = n === 1 ? 23 : n === 2 ? 19 : 16, out = [], Rc = 98 - n*B - 4;
    rings.forEach((r, k) => { const e = 98 - k*B, i = e - B, c = ringContent(r, o), gl = !!c.g, rb = i + B*(gl ? .2 : .3), ch = B*(gl ? .6 : .46);
      out.push(`<circle r="${f1(i)}" class="pt-c2"/>`, `<g class="pt-ring">${ringSVG(c, rb, ch, id + "r" + k)}</g>`); });
    const fig = figSVG(o.fig, Rc*.96), small = o.fig && o.fig !== "aucune" && o.fig !== "rayons";
    return `<svg class="pt-svg pm-svg${opt.trait ? " trait" : ""}${opt.anim ? " anim" : ""}" viewBox="-110 -110 220 220" role="img" aria-label="${h(opt.label || "Pentacle de " + PP(o.pl).nom)}" style="--pc:${col}" xmlns="http://www.w3.org/2000/svg">
      <circle r="104" class="pt-disc"/><circle r="104" class="pt-c1"/><circle r="98" class="pt-c2"/>${out.join("")}<circle r="${f1(Rc)}" class="pt-c3"/>
      ${opt.trait ? `<g class="pm-guide"><line x1="-108" y1="0" x2="108" y2="0"/><line x1="0" y1="-108" x2="0" y2="108"/><circle r="1.6"/></g>` : ""}
      ${fig}<g class="pt-ctr">${centreSVG(Object.assign({}, o, {col}), small ? Rc*.62 : Rc)}</g></svg>`;
  }
  /* l'image autonome (couleur ou gabarit), pour le téléchargement */
  function standalone(svg, col, trait){
    const ink = trait ? "#1a1a1a" : col, paper = trait ? "#ffffff" : "#f6efe0";
    const css = `.pt-disc{fill:${paper}}.pt-c1{fill:none;stroke:${ink};stroke-width:2.4}.pt-c2{fill:none;stroke:${ink};stroke-width:1.1}.pt-c3{fill:none;stroke:${ink};stroke-width:.6;stroke-dasharray:1.5 2.5}
      .pt-fig,.pt-sator rect,.pt-sator line{fill:none;stroke:${ink};stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}.pt-fig.thin{stroke-width:.8}.pt-dot{fill:${ink}}
      .pt-heb{font:500 22px 'Frank Ruhl Libre','Times New Roman',serif;fill:${trait ? "none" : ink};${trait ? `stroke:${ink};stroke-width:.4;` : ""}text-anchor:middle}.pt-heb.sm{font-size:14px}
      .pt-gl{font:400 48px Georgia,serif;fill:${trait ? "none" : ink};${trait ? `stroke:${ink};stroke-width:.5;` : ""}text-anchor:middle}
      .pt-sator text{font:600 13px Georgia,serif;fill:${ink};text-anchor:middle;dominant-baseline:central}
      .pt-kg .m-k-frame,.pt-kg .m-k-cell{fill:none;stroke:${ink}}.pt-kg .m-k-num{fill:${ink};font:600 22px Georgia,serif;text-anchor:middle;dominant-baseline:central}.pt-kg path,.pt-kg circle{display:none}
      .pt-ctr svg path,.pt-ctr svg line{stroke:${ink}!important;fill:none}
      .pm-rt{fill:${trait ? "none" : ink};${trait ? `stroke:${ink};stroke-width:.35;` : ""}font-family:Georgia,'Times New Roman',serif;font-weight:600;letter-spacing:.12em}.pm-rt.he{font-family:'Frank Ruhl Libre','Times New Roman',serif;letter-spacing:0;font-weight:500}.pm-rt.id{font-family:'Segoe UI Symbol','Noto Sans Symbols 2',serif}
      .pm-gl{fill:${trait ? "none" : ink};${trait ? `stroke:${ink};stroke-width:6;` : ""}}.pm-sep{fill:${ink}}
      .pm-grid line{stroke:${ink};stroke-width:.3;opacity:.45}.pm-seal{stroke-width:1.8}.pm-seal-o{fill:${paper};stroke:${ink};stroke-width:1.4}
      .pm-guide line,.pm-guide circle{stroke:#b04a3a;stroke-width:.35;stroke-dasharray:2 2;fill:#b04a3a}`;
    return svg.replace(/^<svg ([^>]*)>/, (m, a) => `<svg ${a.replace(/class="[^"]*"/, "").replace(/style="[^"]*"/, "")} width="1200" height="1200"><style>${css}</style>${trait ? `<rect x="-110" y="-110" width="220" height="220" fill="#ffffff"/>` : ""}`);
  }
  function download(svgText, name){
    const blob = new Blob([svgText], {type:"image/svg+xml"}), url = URL.createObjectURL(blob), img = new Image();
    img.onload = () => { try{ const c = document.createElement("canvas"); c.width = c.height = 1200; const g = c.getContext("2d"); g.drawImage(img, 0, 0, 1200, 1200);
        c.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name + ".png"; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); URL.revokeObjectURL(url); }, 600); }, "image/png");
      }catch(e){ const a = document.createElement("a"); a.href = url; a.download = name + ".svg"; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 600); } };
    img.onerror = () => { const a = document.createElement("a"); a.href = url; a.download = name + ".svg"; document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 600); };
    img.src = url;
  }

  /* ================================================================
     L'ATELIER EN SEPT ÉTAPES
     ================================================================ */
  const INTENTS = [
    {id:"calme", t:"Le calme", pl:"lune", vi:2, dv:"Je trouve le calme"},
    {id:"courage", t:"Le courage", pl:"mars", vi:1, dv:"Je tiens bon"},
    {id:"etude", t:"L'étude", pl:"mercure", vi:7, dv:"J'apprends chaque jour"},
    {id:"sagesse", t:"La patience", pl:"saturne", vi:8, dv:"Je prends le temps"},
    {id:"abondance", t:"L'abondance", pl:"jupiter", vi:3, dv:"Je reçois et je partage"},
    {id:"elan", t:"L'élan", pl:"soleil", vi:0, dv:"Je rayonne"},
    {id:"lien", t:"Le lien", pl:"venus", vi:6, dv:"Je reste fidèle à moi-même"},
    {id:"voyage", t:"Le voyage", pl:"lune", vi:5, dv:"Je pars et je reviens"},
    {id:"liberation", t:"Se libérer", pl:"saturne", vi:4, dv:"Je me libère"}
  ];
  const STYLES = [
    {id:"salomon", t:"À la manière de Salomon", d:"Un verset en hébreu autour, le carré ou le nom divin au centre.", set:{rings:[{src:"verset", script:"hebreu"}], fig:"aucune", ctr:"kamea"}},
    {id:"agrippa", t:"À la manière d'Agrippa", d:"Le nom divin, puis ta devise en écriture céleste ; le sceau de ta devise sur le carré.", set:{rings:[{src:"nom", script:"hebreu"}, {src:"devise", script:"celeste"}], fig:"aucune", ctr:"sceau"}},
    {id:"gd", t:"À la manière de la Golden Dawn", d:"L'hexagramme et le nom divin, ta devise en capitales.", set:{rings:[{src:"devise", script:"latin"}], fig:"hexa", ctr:"nom"}},
    {id:"chretien", t:"Médaille chrétienne", d:"Dans l'esprit des médailles et de l'abbé Julio : la croix, et ta devise autour.", set:{rings:[{src:"devise", script:"latin"}], fig:"aucune", ctr:"croix"}},
    {id:"genie", t:"Ton génie de naissance", d:"D'après Lenain : le nom de ton génie au centre, en hébreu et en écriture céleste.", set:{rings:[{src:"genie", script:"celeste"}, {src:"devise", script:"latin"}], fig:"aucune", ctr:"genie"}},
    {id:"libre", t:"Libre", d:"Ta devise, ton sigil, la figure de ton choix.", set:{rings:[{src:"devise", script:"latin"}], fig:"penta", ctr:"sigil"}}
  ];
  const DEF = () => ({intent:"calme", pl:"lune", vi:2, devise:"Je trouve le calme", prenom:"", style:"salomon", rings:[{src:"verset", script:"hebreu"}], fig:"aucune", ctr:"kamea", genie:0, naiss:""});
  function nextHour(pl){
    try{ const now = new Date(); for(let k = 0; k < 18; k++){ const H = M.hoursOf(new Date(now.getTime() + k*12*3600000)); if(!H) return null;
        const x = H.hours.find(y => y.pl === pl && y.end > now); if(x) return x; } }catch(e){}
    return null;
  }
  function atelier(host, arg){
    const s = st(); let o = Object.assign(DEF(), s.pentDraft2 || {}); let open = {1:true};
    if(arg && typeof arg === "object") Object.assign(o, arg);
    const keep = () => { s.pentDraft2 = o; save(); };
    const chip = (attr, v, on, t) => `<button type="button" class="chip small${on ? " on" : ""}" ${attr}="${v}" aria-pressed="${!!on}">${t}</button>`;
    const step = (n, t, sum, body) => `<details class="pm-step" data-pms="${n}"${open[n] ? " open" : ""}><summary><span class="pm-n">${n}</span><span class="pm-st"><b>${t}</b><small>${sum}</small></span></summary><div class="pm-body">${body}</div></details>`;
    const draw = anim => {
      const p = PL[o.pl] || PL.jupiter, pp = PP(o.pl), it = INTENTS.find(x => x.id === o.intent), sty = STYLES.find(x => x.id === o.style), g = o.genie ? GENIES[o.genie - 1] : null;
      const hr = nextHour(o.pl), mo = _.moon ? _.moon(new Date()) : null;
      const rsum = o.rings.map(r => `${SRC.find(x => x[0] === r.src)[1].toLowerCase()} en ${SCRIPTS.find(x => x[0] === r.script)[1].toLowerCase()}`).join(", ");
      host.innerHTML = `<div class="pm-at"><div class="pm-prev"><div class="pm-prev-svg">${compose(o, {anim})}</div>
          <p class="pm-cap">${cap(pp.nom)} · ${pp.coul} · ${pp.metal}</p></div>
        <div class="pm-steps">
          <p class="pt-at-i">Un pentacle d'Arcanes n'agit sur rien ni sur personne. C'est un <b>emblème</b> : tu y mets en forme ce que tu veux cultiver en toi, pour le regarder chaque jour.</p>
          ${step(1, "L'intention", it ? it.t + " · " + PP(it.pl).nom.replace(/^l[ea] /, "") : "", `<div class="m-chips">${INTENTS.map(x => chip("data-pmi", x.id, x.id === o.intent, x.t)).join("")}</div>
            <p class="help m-left">L'intention propose une planète, un verset et une devise. Tu peux tout changer ensuite.</p>
            <div class="pt-pls">${PLAN.map(q => `<button type="button" data-pmp="${q.id}" aria-pressed="${q.id === o.pl}" style="--pc:${q.hex}"><b>${(PL[q.id] || {}).gl}</b><small>${q.nom.replace(/^l[ea] /, "")}</small></button>`).join("")}</div>
            <p class="help m-left">${cap(p.domaines)}.</p>
            <label class="pt-sel">Ta devise<input type="text" maxlength="60" data-pmd value="${h(o.devise)}" placeholder="Par exemple : je tiens ma parole"></label>`)}
          ${step(2, "Le style", sty ? sty.t : "", `<div class="pm-styles">${STYLES.map(x => `<button type="button" class="pm-sty${x.id === o.style ? " on" : ""}" data-pmy="${x.id}"><b>${x.t}</b><small>${x.d}</small></button>`).join("")}</div>
            ${o.style === "genie" || o.ctr === "genie" || o.rings.some(r => r.src === "genie") ? `<label class="pt-sel">Ta date de naissance<input type="date" data-pmn value="${h(o.naiss)}"></label>${g ? `<p class="pm-gen"><span lang="he">${g.heb}</span> <b>${g.nom}</b>, ${g.n}<sup>e</sup> génie</p>` : `<p class="help m-left">Entre ta date pour trouver ton génie.</p>`}` : ""}
            <p class="help m-left">Le style règle les étapes suivantes d'un coup. Tu peux ensuite les modifier une à une.</p>`)}
          ${step(3, "La forme", `${o.rings.length} couronne${o.rings.length > 1 ? "s" : ""} · ${FIGS.find(x => x[0] === o.fig)[1].toLowerCase()}`, `<p class="pm-lab">Couronnes</p><div class="m-chips">${[1,2,3].map(n => chip("data-pmr", n, n === o.rings.length, n)).join("")}</div>
            <p class="pm-lab">Figure</p><div class="m-chips">${FIGS.map(x => chip("data-pmf", x[0], x[0] === o.fig, x[1])).join("")}</div>`)}
          ${step(4, "Le centre", CTRS.find(x => x[0] === o.ctr)[1], `<div class="m-chips">${CTRS.filter(x => x[0] !== "genie" || g).map(x => chip("data-pmc", x[0], x[0] === o.ctr, x[1])).join("")}</div>
            ${o.ctr === "sceau" ? `<p class="help m-left">À la manière d'Agrippa : chaque lettre de ta devise devient un nombre (A = 1, B = 2…), réduit si besoin, et la ligne passe de case en case sur le carré ${p.nom === "Lune" ? "de la Lune" : "de " + p.nom}. Le petit cercle marque le début, le trait la fin.</p>` : ""}
            ${o.ctr === "sigil" ? `<p class="help m-left">À la manière d'Austin Spare : on garde les consonnes de ta devise, une fois chacune, et on les superpose.</p>` : ""}`)}
          ${step(5, "Les écritures", rsum, o.rings.map((r, k) => `<div class="pm-ring"><p class="pm-lab">Couronne ${k + 1}${k === 0 ? " (extérieure)" : ""}</p>
              <label class="pt-sel">Le texte<select data-pmrs="${k}">${SRC.filter(x => x[0] !== "genie" || g).map(x => `<option value="${x[0]}"${x[0] === r.src ? " selected" : ""}>${x[1]}</option>`).join("")}</select></label>
              ${r.src === "verset" ? `<label class="pt-sel">Le verset<select data-pmv>${VERSETS.map((v, i) => `<option value="${i}"${i === o.vi ? " selected" : ""}>${v[3]} · ${v[0]}</option>`).join("")}</select></label><p class="pt-vs"><span lang="he" dir="rtl">${VERSETS[o.vi][2]}</span> « ${VERSETS[o.vi][1]} »</p>` : ""}
              ${r.src === "prenom" ? `<label class="pt-sel">Ton prénom<input type="text" maxlength="30" data-pmpr value="${h(o.prenom)}"></label>` : ""}
              <div class="m-chips">${SCRIPTS.map(x => chip(`data-pmsc="${k}" data-v`, x[0], x[0] === r.script, x[1])).join("")}</div></div>`).join("") + `<p class="help m-left">Un verset garde son hébreu dans les écritures d'Agrippa ; en latin, en grec ou en thébain, c'est sa traduction qui s'écrit. Les détails sont dans <button type="button" class="linkbtn" data-mtool="ecritures">le traducteur d'écritures</button>.</p>`)}
          ${step(6, "Le moment", hr ? `${_.fmt(hr.start, {weekday:"long"})} à ${_.fmt(hr.start, _.HM)}` : "Le jour de la planète", `<p>La Clavicule demande de tracer un pentacle au jour et à l'heure de sa planète, la Lune croissante. Pour ${pp.nom} : le <b>${p.jour}</b>.</p>
            ${hr ? `<p class="pm-hr"><b>Prochaine heure ${p.nom === "Lune" ? "de la Lune" : "de " + p.nom}</b> : ${_.fmt(hr.start, {weekday:"long", day:"numeric", month:"long"})}, de ${_.fmt(hr.start, _.HM)} à ${_.fmt(hr.end, _.HM)}.</p>` : `<p class="help m-left">Les heures planétaires se calculent pour le lieu choisi en astrologie.</p>`}
            ${mo ? `<p class="pm-hr">Aujourd'hui : ${mo.nom.toLowerCase()}, ${mo.croit ? "la Lune croît" : "la Lune décroît"}.</p>` : ""}
            <p class="help m-left">Rien ne t'y oblige : la seule règle d'Arcanes, c'est de le faire avec attention. <button type="button" class="linkbtn" data-mgo="atelier:election:${o.pl}">Choisir un moment</button></p>`)}
          ${step(7, "Le garder", "Image, gabarit, carnet", `<div class="m-acts start"><button type="button" class="btn small" data-pmsave>Garder dans le carnet</button><button type="button" class="btn ghost small" data-pmimg>Image en couleur</button><button type="button" class="btn ghost small" data-pmtr>Gabarit à tracer</button></div>
            <p class="help m-left">Le gabarit est en noir sur blanc, avec les axes pour poser le compas : imprime-le, ou recopie-le à la main sur papier ou sur le métal de la planète.</p>`)}
        </div></div>`;
      bind();
    };
    const setStyle = id => { const x = STYLES.find(y => y.id === id); if(!x) return; o.style = id; o.rings = x.set.rings.map(r => Object.assign({}, r)); o.fig = x.set.fig; o.ctr = x.set.ctr; };
    const bind = () => {
      qa(".pm-step", host).forEach(d => d.ontoggle = () => { open[d.dataset.pms] = d.open; });
      qa("[data-pmi]", host).forEach(b => b.onclick = () => { const it = INTENTS.find(x => x.id === b.dataset.pmi); o.intent = it.id; o.pl = it.pl; o.vi = it.vi; if(!o.dvPerso) o.devise = it.dv; keep(); draw(true); });
      qa("[data-pmp]", host).forEach(b => b.onclick = () => { o.pl = b.dataset.pmp; keep(); draw(true); });
      qa("[data-pmy]", host).forEach(b => b.onclick = () => { setStyle(b.dataset.pmy); keep(); draw(true); });
      qa("[data-pmr]", host).forEach(b => b.onclick = () => { const n = +b.dataset.pmr; while(o.rings.length < n) o.rings.push({src:o.rings.length === 1 ? "devise" : "nom", script:o.rings.length === 1 ? "celeste" : "hebreu"}); o.rings = o.rings.slice(0, n); keep(); draw(true); });
      qa("[data-pmf]", host).forEach(b => b.onclick = () => { o.fig = b.dataset.pmf; keep(); draw(false); });
      qa("[data-pmc]", host).forEach(b => b.onclick = () => { o.ctr = b.dataset.pmc; keep(); draw(false); });
      qa("[data-pmrs]", host).forEach(sel => sel.onchange = () => { o.rings[+sel.dataset.pmrs].src = sel.value; keep(); draw(false); });
      qa("[data-pmsc]", host).forEach(b => b.onclick = () => { o.rings[+b.dataset.pmsc].script = b.dataset.v; keep(); draw(false); });
      const v = q1("[data-pmv]", host); if(v) v.onchange = () => { o.vi = +v.value; keep(); draw(false); };
      const live = (sel, f) => { const el = q1(sel, host); if(!el) return; el.oninput = () => { f(el.value); keep(); const prev = q1(".pm-prev-svg", host); if(prev) prev.innerHTML = compose(o); }; el.onchange = () => draw(false); };
      live("[data-pmd]", val => { o.devise = val; o.dvPerso = true; });
      live("[data-pmpr]", val => { o.prenom = val; });
      const nd = q1("[data-pmn]", host); if(nd) nd.onchange = () => { o.naiss = nd.value; const d = nd.value ? new Date(nd.value + "T12:00:00Z") : null; o.genie = d && !isNaN(d) ? genieOf(d).n : 0; keep(); draw(true); };
      _.bindLinks(host);
      const pp = PP(o.pl), name = "pentacle-" + pp.id;
      q1("[data-pmimg]", host).onclick = () => download(standalone(compose(o), pp.hex, false), name);
      q1("[data-pmtr]", host).onclick = () => download(standalone(compose(o, {trait:true}), pp.hex, true), name + "-gabarit");
      q1("[data-pmsave]", host).onclick = e => { const S = st(), it = INTENTS.find(x => x.id === o.intent), p = PL[o.pl], g = o.genie ? GENIES[o.genie - 1] : null;
        S.carnet.unshift({id:uid(), t:Date.now(), type:"pentacle", titre:"Mon pentacle de " + pp.nom, intention:it ? it.t : o.devise,
          texte:`Planète : ${pp.nom} (${p.jour}, ${pp.coul}, ${pp.metal}).\nStyle : ${(STYLES.find(x => x.id === o.style) || {}).t || ""}.\nCouronnes : ${o.rings.map(r => SRC.find(x => x[0] === r.src)[1].toLowerCase() + " en " + SCRIPTS.find(x => x[0] === r.script)[1].toLowerCase()).join(" ; ")}.\nCentre : ${CTRS.find(x => x[0] === o.ctr)[1].toLowerCase()}.\nDevise : « ${o.devise} ».${g ? `\nGénie : ${g.nom} (${g.heb}).` : ""}\nCe que je veux cultiver : `}); save();
        e.target.textContent = "Gardé dans le carnet ✓"; e.target.disabled = true; };
    };
    draw(true);
  }

  /* ================================================================
     LES PENTACLES DU MONDE
     ================================================================ */
  const benoitSVG = () => { const C = "C S S M L".split(" "), N = "N D S M D".split(" "), ring = "V R S N S M V · S M Q L I V B";
    return `<svg class="pt-svg pm-svg" viewBox="-110 -110 220 220" role="img" aria-label="Le revers de la médaille de saint Benoît" style="--pc:#6b5a2e"><defs><path id="pmben" d="M${f1(84*Math.cos(-72*rad))} ${f1(84*Math.sin(-72*rad))} A84 84 0 1 1 ${f1(84*Math.cos(-108*rad))} ${f1(84*Math.sin(-108*rad))}" fill="none"/></defs>
      <circle r="104" class="pt-disc"/><circle r="104" class="pt-c1"/><circle r="98" class="pt-c2"/><circle r="74" class="pt-c2"/>
      <text class="pm-rt lat" style="font-size:12px"><textPath href="#pmben" textLength="${f1(2*Math.PI*84*(324/360))}" lengthAdjust="spacing">${ring}</textPath></text>
      <text y="-80" class="pm-ben pax">PAX</text>
      <path d="M-12 -66 H12 V-12 H66 V12 H12 V66 H-12 V12 H-66 V-12 H-12 Z" class="pt-fig thin"/>
      ${C.map((l, i) => `<text x="0" y="${-50 + i*25}" class="pm-ben">${l}</text>`).join("")}${N.map((l, i) => i === 2 ? "" : `<text x="${-50 + i*25}" y="0" class="pm-ben">${l}</text>`).join("")}
      ${[["C",-38,-38],["S",38,-38],["P",-38,38],["B",38,38]].map(x => `<text x="${x[1]}" y="${x[2]}" class="pm-ben big">${x[0]}</text>`).join("")}</svg>`; };
  const wafqSVG = (nums) => { const N = [[4,9,2],[3,5,7],[8,1,6]], A = {1:"ا",2:"ب",3:"ج",4:"د",5:"ه",6:"و",7:"ز",8:"ح",9:"ط"}, c = 44;
    return `<svg class="pt-svg pm-svg" viewBox="-80 -80 160 160" role="img" aria-label="Le carré budūḥ" style="--pc:#2f5d55"><rect x="-70" y="-70" width="140" height="140" class="pt-disc" rx="4"/>
      ${N.map((row, i) => row.map((v, j) => `<rect x="${-66 + j*c}" y="${-66 + i*c}" width="${c}" height="${c}" class="pm-wq${[2,4,6,8].includes(v) ? " on" : ""}"/><text x="${-66 + j*c + c/2}" y="${-66 + i*c + c/2}" class="pm-wqt" ${nums ? "" : 'lang="ar"'}>${nums ? v : A[v]}</text>`).join("")).join("")}</svg>`; };
  const satorSVG = () => PT.pentSVG({pl:"saturne", col:"#2a241e", ring:"SATOR AREPO TENET OPERA ROTAS", dessin:"sator", label:"Le carré SATOR"});
  const sampleSVG = () => { const P = PT.P.jupiter[3]; return PT.pentSVG({pl:"jupiter", col:PP("jupiter").hex, ring:P.v.heb, dessin:P.dessin, centre:P.centre, label:"Quatrième pentacle de Jupiter"}); };
  const julioSVG = () => compose({pl:"soleil", rings:[{src:"devise", script:"latin"}], devise:"Protection · Voyage · Santé", fig:"aucune", ctr:"croix"}, {label:"Évocation d'une médaille de protection"});
  const lenainSVG = () => compose({pl:"lune", rings:[{src:"genie", script:"celeste"}], genie:1, fig:"aucune", ctr:"genie"}, {label:"Pentacle du premier génie, Vehuiah"});
  const terreMini = () => { const t = document.createElement("div"); PT.terre(t); const s = q1("svg", t); return s ? s.outerHTML : ""; };
  const MONDE = [
    {id:"salomon", t:"La Clé de Salomon", q:"Italie et France, XVe-XVIIIe siècle", art:sampleSVG, style:"salomon",
      p:["Le grimoire le plus copié de la Renaissance. Ses pentacles sont des médailles couvertes de noms divins et d'un verset de la Bible en hébreu, rangées par planète.",
         "Sur les quarante-quatre de l'édition Mathers, Arcanes ne montre que ceux qui sont tournés vers soi : protection en voyage et contre les eaux, étude, prospérité."],
      extra:"cat"},
    {id:"arbatel", t:"L'Arbatel et les sept esprits olympiques", q:"Bâle, 1575", art:() => olySVG(OLY[3], "big"), style:"agrippa",
      p:["Un petit livre anonyme, très différent des grimoires : quarante-neuf aphorismes sur la sagesse, la prière et la sobriété. Il attribue chaque planète à un « gouverneur olympique », dont il donne le <b>caractère</b>, un signe fait de traits droits.",
         "On les montre ici comme des signes d'histoire, avec ce que le texte leur prête. Ces promesses (l'or, des siècles de vie) appartiennent au livre, pas à Arcanes."],
      extra:"oly"},
    {id:"lenain", t:"Les 72 génies", q:"Lenain, La Science cabalistique, 1823", art:lenainSVG, style:"genie",
      p:["Les kabbalistes lisent trois versets de l'Exode (14, 19-21), de 72 lettres chacun, en boustrophédon : la 1re lettre du premier, la dernière du deuxième, la 1re du troisième, et ainsi de suite. On obtient 72 racines de trois lettres, auxquelles on ajoute <i>-yah</i> ou <i>-el</i> : les 72 noms du Shem ha-Mephorash.",
         "Lenain en fait des génies bienveillants, chacun gouvernant cinq degrés du zodiaque à partir de l'équinoxe de printemps. Chacun a son pentacle : son nom en hébreu, au centre."],
      extra:"genie"},
    {id:"picatrix", t:"Les talismans du Picatrix", q:"Monde arabe vers l'an 1000, traduit en latin vers 1256", art:() => compose({pl:"jupiter", rings:[{src:"nom", script:"hebreu"}], fig:"aucune", ctr:"glyphe"}, {label:"Évocation d'un talisman planétaire"}), style:"agrippa",
      p:["La <i>Ghāyat al-Ḥakīm</i>, « le but du sage », traduite en latin à la cour d'Alphonse X de Castille. Elle enseigne à graver une <b>image</b> au moment où une planète est forte : la figure, la pierre, le métal et l'heure travaillent ensemble.",
         "C'est la source des talismans de la Renaissance, de Ficin à Agrippa. Dans Arcanes, son héritage se trouve dans l'étape « Le moment »."]},
    {id:"paracelse", t:"Les sceaux de Paracelse", q:"Archidoxis magica, publiée après sa mort, fin du XVIe siècle", art:() => compose({pl:"soleil", rings:[{src:"devise", script:"latin"}], devise:"Archidoxis magica", fig:"aucune", ctr:"kamea"}, {label:"Évocation d'un sceau planétaire"}), style:"agrippa",
      p:["Le médecin suisse donne des sceaux pour chaque planète et pour chaque signe du zodiaque, à fondre dans le bon métal au bon moment. Il les destine surtout aux maux du corps.",
         "C'est un pont entre la magie et l'alchimie, que tu retrouves dans l'univers Alchimie d'Arcanes. Une précision qui va de soi : un sceau n'a jamais soigné personne."]},
    {id:"moise", t:"Les sceaux de Moïse", q:"Le Sixième et le Septième Livre de Moïse, Stuttgart, 1849", art:() => compose({pl:"saturne", rings:[{src:"nom", script:"hebreu"}], fig:"aucune", ctr:"nom"}, {label:"Évocation d'un sceau"}), style:"salomon",
      p:["Un recueil allemand imprimé par Johann Scheible, attribué à Moïse sans aucun fondement. Il aligne des « sceaux » planétaires et élémentaires couverts de noms en hébreu.",
         "Il a eu une immense diffusion populaire, en Europe comme dans les Amériques, où il a nourri le hoodoo afro-américain et les pratiques des Caraïbes."]},
    {id:"julio", t:"Les pentacles de l'abbé Julio", q:"France, fin du XIXe siècle", art:julioSVG, style:"chretien",
      p:["Julien-Ernest Houssay, dit l'abbé Julio, prêtre devenu guérisseur, reprend les prières de son maître Jean Sempé. Il publie 44 pentacles et 7 prières, avec leurs usages et leurs explications.",
         "Il les imprime sur papier, les bénit parfois, et les distribue avec des consignes précises : protéger la maison, voyager sans danger, la santé. Tous sont tournés vers la protection. L'image ici est une évocation, pas un de ses pentacles."]},
    {id:"benoit", t:"La médaille de saint Benoît", q:"Abbayes bénédictines ; forme actuelle de 1880", art:benoitSVG, style:"chretien",
      p:["La plus répandue des médailles de protection catholiques. Au revers, une croix et des initiales latines : <b>C S P B</b>, <i>Crux Sancti Patris Benedicti</i>, « croix du saint père Benoît » ; sur la croix, <b>C S S M L</b>, « que la sainte croix soit ma lumière », et <b>N D S M D</b>, « que le dragon ne soit pas mon guide ».",
         "Autour : <b>V R S N S M V · S M Q L I V B</b>, « Arrière, Satan, ne me conseille pas tes vanités ; ce que tu offres est mauvais, bois toi-même tes poisons ». Une formule de refus, pas une attaque."]},
    {id:"wafq", t:"Le wafq et le carré budūḥ", q:"Monde musulman ; al-Būnī, mort en 1225", art:() => wafqSVG(false), style:"libre",
      p:["Le <i>wafq</i> est le carré magique de la tradition arabe, écrit avec les lettres-nombres de l'abjad. Le plus célèbre est le carré de trois : chaque ligne, chaque colonne et chaque diagonale font 15.",
         "Ses quatre coins, 2, 4, 6 et 8, sont les lettres <bdi lang='ar' dir='rtl'>ب د و ح</bdi>, qui forment le mot <b>budūḥ</b> (<bdi lang='ar' dir='rtl'>بدوح</bdi>). Le mot lui-même est devenu une formule de protection, qu'on écrivait sur les lettres et les seuils."],
      extra:"wafq"},
    {id:"sator", t:"Le carré SATOR", q:"Pompéi, avant 79", art:satorSVG, style:"libre",
      p:["Vingt-cinq lettres qui se lisent dans tous les sens, gravées sur un mur de Pompéi avant l'éruption. On le retrouve sur des amulettes pendant deux mille ans, puis comme deuxième pentacle de Saturne dans la Clavicule.",
         "Son sens reste discuté : « le semeur Arepo tient les roues avec soin » est la lecture la plus littérale."], ctr:"sator"},
    {id:"gd", t:"Le pentacle de la Terre", q:"Golden Dawn, Londres, 1888", art:terreMini, style:"gd",
      p:["Dans la Golden Dawn, le pentacle devient l'instrument de la Terre : un disque de bois peint aux quatre couleurs de Malkuth, avec un hexagramme et des noms divins.",
         "C'est de là que viennent les « Pentacles » du tarot Waite-Smith, qui remplacent les deniers en 1909."]}
  ];
  function genieBox(box){
    const s = st(), cur = (s.pentDraft2 || {}).naiss || "";
    const show = val => { const d = val ? new Date(val + "T12:00:00Z") : null; const r = q1(".pm-gres", box);
      if(!d || isNaN(d)){ r.innerHTML = ""; return; } const g = genieOf(d);
      r.innerHTML = `<div class="pm-gcard"><div class="pm-gsvg">${compose({pl:"lune", rings:[{src:"genie", script:"celeste"}], genie:g.n, fig:"aucune", ctr:"genie"}, {anim:true, label:"Pentacle de " + g.nom})}</div>
        <div><p class="eyebrow">${g.n}<sup>e</sup> génie</p><h3>${g.nom}</h3><p class="pm-gheb" lang="he" dir="rtl">${g.heb}</p>
        <p>Il gouverne ${g.deg}${g.du ? `, soit à peu près du ${g.du} au ${g.au}` : ""}.</p>
        <p class="help m-left">Racine de trois lettres : <span lang="he">${g.rac.split("").join(" ")}</span>, tirée d'Exode 14, 19-21, avec la terminaison <span lang="he">${g.suf}</span> (${g.suf === "יה" ? "-yah" : "-el"}).</p>
        <button type="button" class="btn small" data-pmgo="${g.n}" data-pmgd="${val}">Composer mon pentacle avec ce génie</button></div></div>`;
      q1("[data-pmgo]", r).onclick = e => { const S = st(); S.pentDraft2 = Object.assign(DEF(), S.pentDraft2 || {}, {genie:+e.target.dataset.pmgo, naiss:e.target.dataset.pmgd}); const x = STYLES.find(y => y.id === "genie"); Object.assign(S.pentDraft2, {style:"genie", rings:x.set.rings.map(r => Object.assign({}, r)), fig:x.set.fig, ctr:x.set.ctr}); save(); _.close(); openCabinet("composer"); };
    };
    box.innerHTML = `<label class="pt-sel">Ta date de naissance<input type="date" value="${h(cur)}" data-pmgn></label><div class="pm-gres"></div>`;
    const inp = q1("[data-pmgn]", box); inp.onchange = () => show(inp.value); if(cur) show(cur);
  }
  function mondeSheet(id){
    const m = MONDE.find(x => x.id === id); if(!m) return;
    sheet(`<p class="eyebrow">Les pentacles du monde</p><h2>${m.t}</h2><p class="pm-q">${m.q}</p>
      <figure class="pt-sh-fig dr pm-sh-art">${m.art()}</figure>${m.p.map(x => `<p>${x}</p>`).join("")}
      ${m.extra === "oly" ? `<div class="pm-olys">${OLY.map(o => `<figure class="pm-olyf" style="--pc:${PP(o.pl).hex}">${olySVG(o)}<figcaption><b>${o.nom} <small>· ${PP(o.pl).nom}</small></b><span>${o.dit}</span></figcaption></figure>`).join("")}</div><p class="help m-left">Caractères redessinés d'après l'édition anglaise de Robert Turner (1655).</p>` : ""}
      ${m.extra === "genie" ? `<div class="pm-genbox"></div>` : ""}
      ${m.extra === "wafq" ? `<div class="m-acts start"><button type="button" class="chip small" data-pmwq="1">Voir les nombres</button></div><div class="pm-wqbox"></div>` : ""}
      ${m.extra === "cat" ? `<div class="pm-catbox"></div>` : ""}
      <div class="m-acts start"><button type="button" class="btn small" data-pmsty="${m.style}"${m.ctr ? ` data-pmctr="${m.ctr}"` : ""}>Composer dans cet esprit</button></div>`);
    const sh = document.getElementById("sheet"); if(!sh) return;
    const gb = q1(".pm-genbox", sh); if(gb) genieBox(gb);
    const cb = q1(".pm-catbox", sh); if(cb) PT.catalogue(cb, {pl:"jupiter"});
    const wb = q1("[data-pmwq]", sh); if(wb) wb.onclick = () => { const on = wb.dataset.on !== "1"; wb.dataset.on = on ? "1" : ""; wb.textContent = on ? "Voir les lettres" : "Voir les nombres"; q1(".pm-sh-art", sh).innerHTML = wafqSVG(on); };
    const sb = q1("[data-pmsty]", sh); if(sb) sb.onclick = () => { const S = st(), x = STYLES.find(y => y.id === sb.dataset.pmsty) || STYLES[5]; S.pentDraft2 = Object.assign(DEF(), S.pentDraft2 || {}, {style:x.id, rings:x.set.rings.map(r => Object.assign({}, r)), fig:x.set.fig, ctr:sb.dataset.pmctr || x.set.ctr}); save(); _.close(); openCabinet("composer"); };
  }
  function monde(host){
    host.innerHTML = `<p class="m-lede pm-intro">Le pentacle n'appartient pas qu'à Salomon. Voici onze familles de médailles, de sceaux et de carrés, de Pompéi à la Golden Dawn. Arcanes n'en retient que ce qui protège, élève ou rappelle une intention.</p>
      <div class="pm-grid">${MONDE.map(m => `<button type="button" class="pm-card" data-pmm="${m.id}"><span class="pm-art">${m.art()}</span><span class="pm-ct"><b>${m.t}</b><small>${m.q}</small></span></button>`).join("")}</div>`;
    qa("[data-pmm]", host).forEach(b => b.onclick = () => mondeSheet(b.dataset.pmm));
  }

  /* ================================================================
     LE CABINET
     ================================================================ */
  let cabTab = "composer";
  function cabinet(root, opt = {}){
    if(opt.arg && ["composer","monde","anat"].includes(opt.arg)) cabTab = opt.arg;
    const draw = () => {
      root.innerHTML = `<div class="sc-seg m-seg" role="group" aria-label="Le cabinet"><button type="button" data-pmt="composer" aria-pressed="${cabTab === "composer"}">Composer le tien</button><button type="button" data-pmt="monde" aria-pressed="${cabTab === "monde"}">Les pentacles du monde</button><button type="button" data-pmt="anat" aria-pressed="${cabTab === "anat"}">Anatomie</button></div><div class="pt-host pm-host"></div>`;
      const H = q1(".pm-host", root);
      if(cabTab === "composer") atelier(H); else if(cabTab === "monde") monde(H); else PT.anatomie(H);
      qa("[data-pmt]", root).forEach(b => b.onclick = () => { cabTab = b.dataset.pmt; draw(); });
    };
    draw();
  }
  function openCabinet(tab){ cabTab = tab || "composer"; if(_.setAt) _.setAt("pentacles", tab); if(_.mView) _.mView("atelier"); if(_.renderAtelier) _.renderAtelier(); window.scrollTo({top:0}); }
  X.toolRender.pentacles = {t:"Le cabinet des pentacles", sous:"Compose ton propre pentacle en sept étapes, ou parcours les pentacles du monde : Salomon, l'Arbatel, les 72 génies, l'abbé Julio, la médaille de saint Benoît, le wafq…", render:cabinet};
  const T0 = X.tools.find(t => t[0] === "pentacles"); if(T0) T0[2] = "Compose le tien, et ceux du monde entier";
  Object.assign(_.schemas, {pentcompose:fig => { fig.innerHTML = `<div class="pt-host"></div>`; atelier(q1(".pt-host", fig)); }, pentmonde:fig => { fig.innerHTML = `<div class="pt-host"></div>`; monde(q1(".pt-host", fig)); }});
  window.MAGIE_PENT2 = {compose, GENIES, genieOf, OLY, olySVG, MONDE, mondeSheet, openCabinet, atelier, monde};
})();
