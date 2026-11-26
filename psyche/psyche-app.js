/* ===== Arcanes · Psyché : l'interface =====
   Hors du jeu, Psyché est le codex du Miroir. Trois lieux : la nuit (l'accueil, le ciel du jeu), le livre (huit chapitres
   que le jeu ouvre, puis la maison de Jung), le carnet (cinq exercices et ce qu'on y laisse). Chargé à la demande par psyche.js,
   après les dessins du jeu (pix.js, pix2.js) et ses niveaux (saga.js), dont il reprend les images et les textes. */
(() => {
  const D = window.PSY_DATA, K = window.PSY_COURS, HIST = window.PSY_HIST, PX = window.MiroirPix, SAGA = window.MiroirSaga;
  if(!D || !K || !HIST || !PX || !SAGA) return;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const fmtD = t => new Date(t).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"});
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dayN = (d = new Date()) => Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(2026, 0, 1))/864e5);
  const mod = (n, m) => ((n % m) + m) % m;
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  const ST = {doc:"Documenté", trad:"Tradition", mod:"Lecture moderne", crit:"Critique"};
  const badge = k => `<span class="ps-st ps-st-${k}">${ST[k] || ""}</span>`;
  const IMG = k => k.startsWith("m:") ? `magie/img/${k.slice(2)}.webp` : `psyche/img/${k}.webp`;
  const CRED = {"m:songes":"Francisco de Goya, Le sommeil de la raison engendre des monstres, Los Caprichos, planche 43, 1799",
    "m:hx_mesmer":"Le magnétisme animal : une séance autour du baquet de Mesmer, gravure coloriée, vers 1784 (Wellcome Collection)",
    "cauchemar":"Johann Heinrich Füssli, Le Cauchemar, 1781, Detroit Institute of Arts"};
  const fig = (k, cls = "") => k ? `<figure class="ps-fig ${cls}"><img src="${IMG(k)}" alt="" loading="lazy" decoding="async"><figcaption>${h(CRED[k] || "")}</figcaption></figure>` : "";
  const LECS = K.MODULES.flatMap(m => m.lecons.map((l, i) => ({...l, mod:m, i})));
  const lecOf = id => LECS.find(l => l.id === id);

  /* ---------- mémoire ---------- */
  const STORE = "arcanes.psyche.v1";
  const DEF = () => ({vue:"nuit", chap:{}, descente:null, done:[], notes:{}, jour:{}, reves:[], assoc:[], ombre:[], mandalas:[], coue:{}, quiz:{}, xp:null});
  const load = () => { try{ const v = JSON.parse(localStorage.getItem(STORE) || "{}"); return Object.assign(DEF(), v && typeof v === "object" ? v : {}); }catch(e){ return DEF(); } };
  let st = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(st)); }catch(e){ toast("La mémoire du navigateur est pleine : supprime quelques mandalas."); } };

  let toastEl = null, toastT = 0;
  function toast(msg){
    if(!toastEl){ toastEl = document.createElement("div"); toastEl.className = "ps-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("on"), 3200);
  }
  const root = v => q1("#v-ps-" + ({jour:"nuit", pratiquer:"carnet", apprendre:"livre", histoire:"livre"}[v] || v));
  const nextLec = () => LECS.find(l => !st.done.includes(l.id)) || null;
  const archDuJour = () => D.ARCH[mod(dayN(), D.ARCH.length)];
  const back = (lab, go) => `<button type="button" class="ps-back" data-psgo="${go}">← ${h(lab)}</button>`;

  /* ================================================================
     CE QUE LE JEU A OUVERT
     Hors du jeu, Psyché est le codex du Miroir : la même nuit, les mêmes trente et une couleurs, les mêmes gros pixels.
     Trois lieux. La nuit : l'accueil, le ciel du jeu et ses constellations. Le livre : les chapitres que le jeu ouvre,
     puis la maison de Jung. Le carnet : cinq exercices et ce qu'on y laisse.
     ================================================================ */
  const NIV = SAGA.N, ORDRE = SAGA.ORDRE, FIG = SAGA.FIG || {};
  const HCH = {I:["h1"], II:["h2", "h3"], III:["h4"], IV:["h5"], V:["h6"], VI:["h7", "h8"], VII:["h9"], E:["h10", "h11"]};
  const AN = {I:"−350", II:"1778", III:"1784", IV:"1843", V:"1882", VI:"1895", VII:"1913", E:"1922"};
  const numero = n => n === "E" ? "Épilogue" : "Chapitre " + n, chiffre = n => n === "E" ? "É" : n;
  /* où en est la partie : on lit la sauvegarde du jeu, sans le charger */
  function nuit(){ let s = null; try{ s = JSON.parse(localStorage.getItem("arcanes.miroir.v1") || "null"); }catch(e){}
    const sg = (s && s.saga) || {}, faits = sg.faits || {}, fait = n => faits[n] === true;
    return {fait, n:ORDRE.filter(fait).length, pro:ORDRE.find(n => !fait(n)) || null}; }
  let viewOff = null; const offView = () => { if(viewOff){ try{ viewOff(); }catch(e){} viewOff = null; } };

  /* les images : les scènes du jeu, repeintes ici telles quelles */
  const sous = (th, fn) => { const cur = PX.theme(); PX.setTheme(th); try{ fn(); }finally{ PX.setTheme(cur); } };
  const HERO = {
    I:x => NIV.I.volets[2].img(x),
    II:(x, t) => sous("jour", () => PX.salon(x, t, {rideaux:1, musique:1, mesmer:1})),
    III:x => NIV.III.volets[0].img(x),
    IV:(x, t) => sous("gaz", () => PX.etude(x, t, {lieu:"braid", sujets:[]})),
    V:(x, t) => sous("jour", () => PX.amphi(x, t, {stade:1})),
    VI:(x, t) => sous("nuit", () => PX.vienne(x, t, {})),
    VII:(x, t) => sous("nuit", () => PX.cabinet(x, t, {pluie:true, assis:true})),
    E:(x, t) => sous("jour", () => PX.pendule(x, t, {ang:Math.sin(t*1.6)*.3}))};
  const VIVANT = {II:1, IV:1, V:1, VI:1, VII:1, E:1};
  function peint(c, n, t){ const x = c.getContext("2d"); x.imageSmoothingEnabled = false; try{ HERO[n](x, t == null ? 1.3 : t); }catch(e){ try{ NIV[n].volets[0].img(x); }catch(_){} } }
  const peintTous = r => qa("canvas[data-hero]", r).forEach(c => peint(c, c.dataset.hero));
  function sprite(c, key){ let tx = PX.S[key]; if(Array.isArray(tx)) tx = tx[0]; if(!tx || !tx.w) return; const s = PX.show(tx, 6), x = c.getContext("2d"), k = Math.min(c.width/s.width, c.height/s.height);
    x.imageSmoothingEnabled = false; x.drawImage(s, Math.round((c.width - s.width*k)/2), Math.round(c.height - s.height*k), Math.round(s.width*k), Math.round(s.height*k)); }
  /* une constellation, en petit */
  function constel(c, n){ const x = c.getContext("2d"), f = FIG[n]; if(!f) return; x.clearRect(0, 0, c.width, c.height); const s = c.width*3, cx = c.width/2, cy = c.height*.66, P = f.p.map(q => [Math.round(cx + q[0]*s), Math.round(cy - q[1]*s)]);
    x.fillStyle = "#b08a3c"; f.l.forEach(([a, b]) => { const [x0, y0] = P[a], [x1, y1] = P[b], m = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for(let i = 0; i <= m; i += 2) x.fillRect(Math.round(x0 + (x1 - x0)*i/m), Math.round(y0 + (y1 - y0)*i/m), 1, 1); });
    P.forEach(([px, py]) => { x.fillStyle = "#e2bd5a"; x.fillRect(px - 1, py, 3, 1); x.fillRect(px, py - 1, 1, 3); x.fillStyle = "#ffe9a8"; x.fillRect(px, py, 1, 1); }); }

  /* ================================================================
     LA NUIT : l'accueil
     ================================================================ */
  /* le ciel : peint en gros pixels, comme dans le jeu. Les constellations allumées mènent au Livre, la lueur mène au jeu. */
  function ciel(sec, E){
    const cv = q1(".pn-cv", sec), zone = q1(".pn-zone", sec), marks = q1(".pn-marks", sec), x = cv.getContext("2d"), bg = document.createElement("canvas"), lueurs = {};
    let W = 0, H = 0, k = 2, stars = [], pos = {}, S = 120, T = 0, fil = null, larg = 0;
    const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], COL = ["#0a0a14", "#14162b", "#1f2444"];
    const trait = (x0, y0, x1, y1, col, pas) => { const m = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; x.fillStyle = col; for(let i = 0; i <= m; i += pas) x.fillRect(Math.round(x0 + (x1 - x0)*i/m), Math.round(y0 + (y1 - y0)*i/m), 1, 1); };
    function taille(){ const b = sec.getBoundingClientRect(), z = zone.getBoundingClientRect(); if(!b.width || b.width === larg) return; larg = b.width; k = b.width < 620 ? 2 : 3; W = cv.width = bg.width = Math.round(b.width/k); H = cv.height = bg.height = Math.round(b.height/k);
      /* le fond : trois bleus de la palette, fondus à la trame */
      const g = bg.getContext("2d"); for(let y = 0; y < H; y++){ const f = Math.pow(y/H, 1.3)*2, i = Math.min(1, Math.floor(f)), fr = (f - i)*16; let x0 = 0, c0 = -1; for(let xx = 0; xx <= W; xx++){ const c = xx === W ? -2 : i + (fr > B4[(xx & 3) + (y & 3)*4] ? 1 : 0); if(c !== c0){ if(c0 >= 0){ g.fillStyle = COL[c0]; g.fillRect(x0, y, xx - x0, 1); } x0 = xx; c0 = c; } } }
      const r = PX.rng(11); stars = Array.from({length:Math.round(W*H/170)}, () => [r()*W | 0, r()*H | 0, r(), r()*6.28, .5 + r()*2]);
      const zx = (z.left - b.left)/k, zy = (z.top - b.top)/k, zw = z.width/k, zh = z.height/k, paysage = zw > zh*1.4; S = Math.max(96, Math.min(170, paysage ? zh*.7 : zw*.62));
      ORDRE.forEach((n, i) => { const t = i/(ORDRE.length - 1); pos[n] = paysage ? [zx + zw*(.07 + .86*t), zy + zh*(.42 + (i % 2 ? .2 : -.2) - .05*Math.sin(t*3.1))] : [zx + zw*(.5 + (i % 2 ? .24 : -.24) + .04*Math.sin(i*1.7)), zy + zh*(.9 - .84*t)]; });
      marks.style.setProperty("--dy", Math.round(S*.15*k) + "px");
      marks.innerHTML = ORDRE.map(n => { const L = NIV[n], on = E.fait(n), pro = n === E.pro, [px, py] = pos[n], ou = `left:${(px*k/b.width*100).toFixed(2)}%;top:${(py*k/b.height*100).toFixed(2)}%`;
        return on ? `<button type="button" class="pn-mark on${st.chap[n] ? "" : " neuf"}" style="${ou}" data-psgo="chap:${n}" aria-label="${numero(n)}, ${h(L.nom)} : ouvrir dans le Livre"><b>${chiffre(n)}</b><span>${h(L.ciel)}</span></button>`
          : pro ? `<button type="button" class="pn-mark pro" style="${ou}" data-miroir aria-label="Jouer : ${h(L.nom)}"><b>${chiffre(n)}</b><span>une lueur</span></button>`
          : `<span class="pn-mark off" style="${ou}" aria-hidden="true"><b>${chiffre(n)}</b></span>`; }).join("");
      dessine(); }
    function dessine(){ if(!W) return; x.drawImage(bg, 0, 0);
      for(const s of stars){ const b = .5 + .5*Math.sin(T*s[4] + s[3]);
        if(s[2] < .55){ if(b > .25){ x.fillStyle = "#2e3a66"; x.fillRect(s[0], s[1], 1, 1); } }
        else if(s[2] < .9){ x.fillStyle = b > .5 ? "#8fa3c8" : "#4a5a8a"; x.fillRect(s[0], s[1], 1, 1); }
        else { if(b > .8){ x.fillStyle = "#4a5a8a"; x.fillRect(s[0] - 1, s[1], 3, 1); x.fillRect(s[0], s[1] - 1, 1, 3); } x.fillStyle = b > .4 ? "#f4efe2" : "#8fa3c8"; x.fillRect(s[0], s[1], 1, 1); } }
      /* le chemin, de lueur en lueur */
      ORDRE.forEach((n, i) => { if(!i) return; const a = pos[ORDRE[i - 1]], b = pos[n], ok = E.fait(ORDRE[i - 1]) && (E.fait(n) || n === E.pro); trait(a[0], a[1], b[0], b[1], ok ? "#4a5a8a" : "#1f2444", ok ? 3 : 5); });
      ORDRE.forEach((n, i) => { const f = FIG[n]; if(!f) return; const cx = Math.round(pos[n][0]), cy = Math.round(pos[n][1]), P = f.p.map(q => [Math.round(cx + q[0]*S), Math.round(cy - q[1]*S)]), on = E.fait(n), pro = n === E.pro;
        if(on){ f.l.forEach(([a, b]) => trait(P[a][0], P[a][1], P[b][0], P[b][1], "#b08a3c", 2));
          P.forEach(([px, py], j) => { x.fillStyle = "#e2bd5a"; x.fillRect(px - 1, py, 3, 1); x.fillRect(px, py - 1, 1, 3); if(Math.sin(T*1.7 + j*1.3 + i) > .3){ x.fillStyle = "#b08a3c"; x.fillRect(px - 2, py, 1, 1); x.fillRect(px + 2, py, 1, 1); x.fillRect(px, py - 2, 1, 1); x.fillRect(px, py + 2, 1, 1); } x.fillStyle = "#ffe9a8"; x.fillRect(px, py, 1, 1); }); }
        else if(pro){ x.fillStyle = "#4a5a8a"; P.forEach(([px, py]) => x.fillRect(px, py, 1, 1));
          const L = NIV[n], yb = Math.round(Math.sin(T*2)*2); let tex = null; try{ tex = L.lueur ? L.lueur() : null; }catch(e){}
          if(tex && tex.w){ const c = lueurs[n] || (lueurs[n] = PX.show(tex, 7)), hh = 20, ww = Math.round(c.width/c.height*hh); x.drawImage(c, Math.round(cx - ww/2), cy - 10 + yb, ww, hh); }
          else { x.fillStyle = "#b08a3c"; x.fillRect(cx - 5, cy - 8 + yb, 10, 16); x.fillStyle = "#cfd9ea"; x.fillRect(cx - 4, cy - 7 + yb, 8, 14); x.fillStyle = "#f4efe2"; x.fillRect(cx - 3, cy - 6 + yb, 2, 5); }
          const rr = 13 + (T*5 % 7); x.fillStyle = "#e2bd5a"; for(let a = 0; a < 20; a++){ if((a + Math.floor(T*3)) % 2) continue; x.fillRect(Math.round(cx + Math.cos(a/20*6.283)*rr), Math.round(cy + Math.sin(a/20*6.283)*rr), 1, 1); } }
        else { x.fillStyle = "#2e3a66"; P.forEach(([px, py]) => x.fillRect(px, py, 1, 1)); } });
      /* une étoile filante, de temps en temps */
      if(!fil && Math.random() < .012) fil = {x:Math.random()*W*.8, y:Math.random()*H*.3, n:0};
      if(fil){ for(let i = 0; i < 7; i++){ x.fillStyle = ["#f4efe2", "#cfd9ea", "#8fa3c8", "#4a5a8a", "#2e3a66", "#2e3a66", "#1f2444"][i]; x.fillRect(Math.round(fil.x - i*2), Math.round(fil.y - i), 1, 1); } fil.x += 5; fil.y += 2.5; if(++fil.n > 9) fil = null; } }
    const calme = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = calme ? 0 : setInterval(() => { T += .1; dessine(); }, 100), rs = () => taille();
    window.addEventListener("resize", rs); taille(); requestAnimationFrame(taille);
    return () => { clearInterval(timer); window.removeEventListener("resize", rs); };
  }
  /* une ligne de chapitre : ouverte, elle mène à sa page ; fermée, elle renvoie à la nuit */
  function ligne(n, E){ const L = NIV[n], on = E.fait(n), pro = n === E.pro;
    return on ? `<button type="button" class="pl-ch on" data-psgo="chap:${n}"><canvas class="pl-th" width="160" height="100" data-hero="${n}" aria-hidden="true"></canvas><span class="pl-n">${chiffre(n)}</span><span class="pl-t"><b>${h(L.nom)}</b><small>${h(L.lieu)} · ${h(L.ep)}</small><em>Ce qui agit : ${h(L.agit)}</em></span>${st.chap[n] ? "" : `<i class="pl-new">Nouveau</i>`}</button>`
      : `<div class="pl-ch off${pro ? " pro" : ""}"><span class="pl-th clos" aria-hidden="true"><canvas width="160" height="100" data-hero="${n}"></canvas></span><span class="pl-n">${chiffre(n)}</span><span class="pl-t"><b>${h(L.nom)}</b><small>${h(L.lieu)} · ${h(L.ep)}</small><em>${pro ? "La prochaine lueur dans la nuit" : "Encore dans la nuit"}</em></span>${pro ? `<button type="button" class="pl-jouer" data-miroir>Jouer</button>` : ""}</div>`; }
  function renderNuit(){
    const r = root("nuit"), E = nuit(), A = archDuJour(), Q = D.QUESTIONS[mod(dayN(), D.QUESTIONS.length)], k = dayKey(), J = st.jour[k] || {}, pro = E.pro, P = pro ? NIV[pro] : null;
    const date = new Date().toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long"}), dernier = [...ORDRE].reverse().find(n => E.fait(n)), neufs = ORDRE.filter(n => E.fait(n) && !st.chap[n]), montre = neufs[0] || dernier;
    r.innerHTML = `<section class="pn-ciel"><canvas class="pn-cv" aria-hidden="true"></canvas>
        <header class="pn-tete"><p class="pn-eye">Psyché</p><h1>La nuit</h1><p class="pn-lede">Vingt-cinq siècles à chercher ce qui agit en nous. Chaque lueur est une époque à traverser. Chaque époque traversée ouvre un chapitre du Livre.</p></header>
        <div class="pn-pied"><button type="button" class="pn-go" data-miroir><b>${!E.n ? "Entrer dans la nuit" : pro ? "Reprendre la nuit" : "Revenir dans la nuit"}</b><small>${P ? `${pro === "E" ? "Épilogue" : pro} · ${h(P.nom)} · ${h(P.lieu)}` : "Les huit constellations sont allumées"}</small></button>
          <p class="pn-compte">${E.n ? `<b>${E.n}</b> constellation${E.n > 1 ? "s" : ""} sur 8` : "Huit lueurs, huit époques"}${neufs.length ? ` · <button type="button" class="pn-lien" data-psgo="chap:${neufs[0]}">${neufs.length} chapitre${neufs.length > 1 ? "s" : ""} à lire</button>` : ""}</p></div>
        <div class="pn-zone"></div><div class="pn-marks"></div></section>
      <section class="pn-bloc"><h2 class="pn-h"><small>Dans le Livre</small>${!montre ? "Encore fermé" : neufs.length ? "Un chapitre vient de s'ouvrir" : "Le dernier chapitre ouvert"}</h2>
        ${montre ? `<div class="pl-chs">${ligne(montre, E)}</div>` : `<p class="pn-vide">Le Livre s'écrit pendant que tu joues. Traverse la première lueur, Épidaure, et son chapitre s'ouvrira ici : l'histoire, ce qu'on croyait alors, et ce qui agissait vraiment.</p>`}</section>
      <section class="pn-bloc"><h2 class="pn-h"><small>${h(date)}</small>La page du jour</h2>
        <article class="ps-arch" style="--i:${D.ARCH.indexOf(A)}">
          <div class="ps-arch-sym" aria-hidden="true">${archSVG(D.ARCH.indexOf(A))}</div>
          <div><p class="eyebrow">L'archétype du jour</p><h2>${h(A.nom)}</h2><p class="ps-arch-sous">${h(A.sous)}</p><p>${h(A.txt)}</p>
            <p class="ps-arch-m"><b>Dans les mythes</b> ${h(A.mythes)} · <b>Dans le tarot</b> ${h(A.lame)}</p>
            <label class="ps-field"><span>${h(A.q)}</span><textarea rows="3" data-jour="a" placeholder="Quelques mots suffisent.">${h(J.a || "")}</textarea></label></div>
        </article>
        <div class="ps-q"><p class="eyebrow">La question du jour</p><p class="ps-q-t">${h(Q)}</p><textarea rows="3" data-jour="q" aria-label="Ta réponse">${h(J.q || "")}</textarea><p class="help ps-saved" aria-live="polite"></p></div></section>
      <p class="ps-care">Psyché est un espace de curiosité et de réflexion, pas un soin. Si une souffrance dure, parles-en à un médecin ou à un psychologue.</p>`;
    /* sur téléphone, le ciel va d'un bord à l'autre de l'écran */
    const sec = q1(".pn-ciel", r); if(window.innerWidth < 720) sec.style.setProperty("--pn-bord", Math.max(0, Math.round(r.getBoundingClientRect().left)) + "px");
    peintTous(r); viewOff = ciel(sec, E);
    let t = 0;
    qa("[data-jour]", r).forEach(ta => ta.oninput = () => { clearTimeout(t); t = setTimeout(() => { st.jour[k] = Object.assign(st.jour[k] || {}, {[ta.dataset.jour]:ta.value, arch:A.id}); save(); q1(".ps-saved", r).textContent = "Gardé dans le carnet."; }, 500); });
  }
  /* un sceau différent pour chaque archétype : des cercles et des traits simples */
  function archSVG(i){
    const n = [3, 4, 5, 6, 7, 8][i % 6], rot = i*15, pts = Array.from({length:n}, (_, k) => { const a = (k/n)*Math.PI*2 - Math.PI/2 + rot*Math.PI/180; return [50 + Math.cos(a)*34, 50 + Math.sin(a)*34]; });
    return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="40" class="t"/><path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(" ")).join("L")}Z"/>${i % 2 ? `<circle cx="50" cy="50" r="12"/>` : `<path d="M50 30V70M30 50H70" class="t"/>`}<circle cx="50" cy="50" r="2.5" class="f"/></svg>`;
  }

  /* ================================================================
     LES EXERCICES : cinq, chacun rattaché au chapitre où on l'a croisé
     ================================================================ */
  const TOOLS = [
    ["reves", "Le journal des rêves", "Noter un rêve au réveil, puis amplifier ses symboles.", "I", "dormeur"],
    ["assoc", "Le test d'associations", "Cent mots, un chronomètre. Là où tu hésites, quelque chose accroche.", "VII", "carnet"],
    ["ombre", "Le miroir de l'ombre", "Ce qui t'agace chez les autres, et l'or que cela cache.", "VII", "ombreOr"],
    ["mandala", "L'atelier du mandala", "Dessiner un cercle en symétrie, comme Jung le faisait chaque matin en 1918.", "VII", "scarabee"],
    ["coue", "La ficelle de Coué", "Vingt nœuds et une phrase, matin et soir.", "E", "lueurFicelle"]];
  let pv = {tool:null, arg:null}, toolOff = null;
  function renderOutil(r){ const T = TOOLS.find(t => t[0] === pv.tool);
    r.innerHTML = `${back("Le carnet", "carnet")}<header class="ps-head sm"><p class="eyebrow">Exercice · croisé ${T[3] === "E" ? "à l'épilogue" : "au chapitre " + T[3]}</p><h1>${h(T[1])}</h1></header><div class="ps-tool"></div>`;
    toolOff = TOOLR[pv.tool](q1(".ps-tool", r), pv.arg) || null; }
  const TOOLR = {};

  /* ---------- I. le test d'associations ---------- */
  TOOLR.assoc = host => {
    let words = [], res = [], i = 0, t0 = 0, phase = "intro";
    const intro = () => { host.innerHTML = `<div class="ps-card"><p>En 1904, au Burghölzli, Jung lisait un mot à ses sujets, qui devaient répondre le plus vite possible par le premier mot venu. Il chronométrait. Les hésitations, les réponses étranges et les oublis signalaient, selon lui, un <b>complexe</b>.</p>
        <p>Les mots ci-dessous sont ceux de sa liste de 1906, traduits. Réponds par <b>un seul mot</b>, le premier qui vient, puis appuie sur Entrée. Ensuite, on te demandera de retrouver tes réponses.</p>
        <p class="ps-warn">Ce n'est pas un test psychologique validé, ni un diagnostic : c'est une expérience historique, à faire par curiosité, au calme.</p>
        <div class="ps-row"><span class="pm-lab">Nombre de mots</span>${[25, 50, 100].map(n => `<button type="button" class="chip" data-an="${n}"${n === 25 ? ` aria-pressed="true"` : ""}>${n}</button>`).join("")}</div>
        <button type="button" class="btn" data-astart>Commencer</button></div>${hist()}`;
      let n = 25; qa("[data-an]", host).forEach(b => b.onclick = () => { n = +b.dataset.an; qa("[data-an]", host).forEach(x => x.setAttribute("aria-pressed", x === b)); });
      q1("[data-astart]", host).onclick = () => { words = D.MOTS.slice(0, n); res = []; i = 0; phase = "run"; run(); }; };
    const hist = () => st.assoc.length ? `<p class="help">Tu as fait le test ${st.assoc.length} fois. Les résultats sont dans ton carnet.</p>` : "";
    const run = () => {
      host.innerHTML = `<div class="ps-card ps-assoc"><p class="ps-assoc-n">${i + 1} / ${words.length}</p><p class="ps-assoc-w" aria-live="assertive">${h(words[i])}</p>
        <form class="ps-assoc-f" autocomplete="off"><input type="text" maxlength="40" aria-label="Ta réponse" autocapitalize="off" spellcheck="false"><button type="submit" class="btn small">OK</button></form>
        <button type="button" class="linkbtn" data-askip>Rien ne vient</button></div>`;
      const inp = q1("input", host); inp.focus(); t0 = performance.now();
      const done = v => { res.push({w:words[i], r:v.trim(), t:Math.round(performance.now() - t0)}); i++; i < words.length ? run() : repro(0); };
      q1("form", host).onsubmit = e => { e.preventDefault(); done(inp.value); };
      q1("[data-askip]", host).onclick = () => done("");
    };
    const repro = k => {
      if(k === 0) host.innerHTML = `<div class="ps-card"><p>Deuxième temps : Jung relisait la liste et demandait au sujet de <b>retrouver ses réponses</b>. Les oublis sont aussi des indicateurs.</p><div class="ps-row"><button type="button" class="btn" data-rgo>Retrouver mes réponses</button><button type="button" class="btn ghost" data-rskip>Passer aux résultats</button></div></div>`;
      if(k === 0){ q1("[data-rgo]", host).onclick = () => step(0); q1("[data-rskip]", host).onclick = results; return; }
    };
    const step = k => {
      if(k >= res.length) return results();
      host.innerHTML = `<div class="ps-card ps-assoc"><p class="ps-assoc-n">Retrouver · ${k + 1} / ${res.length}</p><p class="ps-assoc-w">${h(res[k].w)}</p>
        <form class="ps-assoc-f" autocomplete="off"><input type="text" maxlength="40" aria-label="Ce que tu avais répondu" spellcheck="false"><button type="submit" class="btn small">OK</button></form></div>`;
      const inp = q1("input", host); inp.focus();
      q1("form", host).onsubmit = e => { e.preventDefault(); res[k].rep = inp.value.trim(); step(k + 1); };
    };
    const results = () => {
      const ts = res.filter(x => x.r).map(x => x.t).sort((a, b) => a - b), med = ts.length ? ts[Math.floor(ts.length/2)] : 1500, seen = {};
      res.forEach(x => { const f = []; const r = norm(x.r);
        if(!r) f.push("pas de réponse"); if(x.r && x.t > med*1.5) f.push("lent"); if(r && r === norm(x.w)) f.push("répète le mot");
        if(r.split(" ").length > 1) f.push("plusieurs mots"); if(r && seen[r]) f.push("réponse déjà donnée"); if(r) seen[r] = 1;
        if(x.rep != null && norm(x.rep) !== r) f.push("oubliée"); x.f = f; });
      const fl = res.filter(x => x.f.length), max = Math.max(...res.map(x => x.t), 1);
      host.innerHTML = `<div class="ps-card"><h3>Tes résultats</h3><p>Temps médian : <b>${(med/1000).toFixed(1)} s</b>. ${fl.length} mot${fl.length > 1 ? "s" : ""} sur ${res.length} présente${fl.length > 1 ? "nt" : ""} au moins un indicateur.</p>
        <div class="ps-bars">${res.map(x => `<div class="ps-bar${x.f.length ? " on" : ""}"><span class="w">${h(x.w)}</span><span class="b"><i style="width:${Math.max(3, x.t/max*100)}%"></i></span><span class="r">${h(x.r || "·")}</span>${x.f.length ? `<em>${x.f.join(", ")}</em>` : ""}</div>`).join("")}</div>
        <p class="help">Un temps long peut venir de la fatigue, d'un mot rare ou d'une distraction. Jung regardait surtout si les mots marqués <b>tournaient autour d'un même thème</b>.</p>
        <label class="ps-field"><span>Les mots marqués ont-ils quelque chose en commun ?</span><textarea rows="3" data-anote></textarea></label>
        <div class="ps-row"><button type="button" class="btn" data-asave>Garder dans le carnet</button><button type="button" class="btn ghost" data-again>Recommencer</button></div></div>`;
      q1("[data-asave]", host).onclick = e => { st.assoc.unshift({id:uid(), t:Date.now(), n:res.length, med, marques:fl.map(x => [x.w, x.r, x.f]), note:q1("[data-anote]", host).value}); save(); e.target.textContent = "Gardé ✓"; e.target.disabled = true; };
      q1("[data-again]", host).onclick = intro;
    };
    intro();
  };

  /* ---------- II. le journal des rêves ---------- */
  const EMO = ["la paix", "la joie", "la peur", "la tristesse", "la colère", "l'étrangeté", "le désir", "la honte", "la curiosité"];
  const symsIn = txt => { const t = " " + norm(txt) + " "; return D.SYM.filter(s => s.k.some(k => { const n = norm(k); return n.length < 4 ? t.includes(" " + n + " ") : t.includes(" " + n); })); };
  TOOLR.reves = (host, arg) => {
    const list = () => {
      const freq = {}; st.reves.forEach(r => Object.keys(r.sym || {}).concat(symsIn(r.titre + " " + r.txt).map(s => s.id)).forEach(id => freq[id] = (freq[id] || 0) + 1));
      Object.keys(freq).forEach(k => freq[k] = Math.ceil(freq[k]/2));
      const top = Object.entries(freq).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 6);
      host.innerHTML = `<form class="ps-card ps-dream" autocomplete="off"><p class="help m0">Note au présent, juste après le réveil, sans chercher le sens. Même une image suffit.</p>
          <label class="ps-field"><span>Un titre</span><input type="text" name="titre" maxlength="70" placeholder="La maison aux escaliers"></label>
          <label class="ps-field"><span>Le rêve</span><textarea name="txt" rows="6" maxlength="4000" placeholder="Je suis dans une maison que je ne connais pas…"></textarea></label>
          <p class="pm-lab">L'émotion au réveil</p><div class="ps-chips">${EMO.map(e => `<button type="button" class="chip" data-emo="${e}">${e}</button>`).join("")}</div>
          <button type="submit" class="btn">Garder et amplifier</button></form>
        ${top.length ? `<section class="ps-card"><h3>Tes symboles qui reviennent</h3><p class="ps-chips">${top.map(([id, n]) => `<span class="ps-pill">${h(D.SYM.find(s => s.id === id).nom)} <b>×${n}</b></span>`).join("")}</p><p class="help">Jung lisait les rêves en série : ce qui revient compte plus qu'un rêve isolé.</p></section>` : ""}
        ${st.reves.length ? `<section class="ps-list"><h3>Ton journal</h3>${st.reves.map(r => `<button type="button" class="ps-li" data-rv="${r.id}"><b>${h(r.titre)}</b><span>${fmtD(r.t)}${r.emo ? " · " + h(r.emo) : ""}</span></button>`).join("")}</section>` : ""}`;
      let emo = "";
      qa("[data-emo]", host).forEach(b => b.onclick = () => { emo = emo === b.dataset.emo ? "" : b.dataset.emo; qa("[data-emo]", host).forEach(x => x.classList.toggle("on", x.dataset.emo === emo)); });
      q1("form", host).onsubmit = e => { e.preventDefault(); const f = e.target, txt = f.txt.value.trim(); if(!txt){ f.txt.focus(); return; }
        const r = {id:uid(), t:Date.now(), titre:f.titre.value.trim() || "Un rêve", txt, emo, sym:{}}; st.reves.unshift(r); save(); open(r.id); };
      qa("[data-rv]", host).forEach(b => b.onclick = () => open(b.dataset.rv));
    };
    const open = id => {
      const r = st.reves.find(x => x.id === id); if(!r) return list();
      const found = symsIn(r.titre + " " + r.txt), ids = [...new Set(found.map(s => s.id).concat(Object.keys(r.sym || {})))], S = ids.map(i => D.SYM.find(s => s.id === i)).filter(Boolean);
      host.innerHTML = `<button type="button" class="ps-back" data-rlist>← Le journal</button>
        <article class="ps-card"><p class="eyebrow">${fmtD(r.t)}${r.emo ? " · au réveil : " + h(r.emo) : ""}</p><h3>${h(r.titre)}</h3><p class="ps-dream-t">${h(r.txt).replace(/\n/g, "<br>")}</p></article>
        <section class="ps-amp"><h3>Amplifier</h3><p class="help">D'abord <b>tes</b> associations : ce que l'image t'évoque, à toi. Ensuite seulement, ce que disent les mythes. ${S.length ? "" : "Aucun symbole de la liste n'a été repéré : ajoute-en un."}</p>
          ${S.map(s => `<div class="ps-ampc" data-sid="${s.id}"><h4>${h(s.nom)}</h4><p class="ps-ampq">${h(s.q)}</p><textarea rows="2" data-sa="${s.id}" placeholder="Mes associations…">${h((r.sym || {})[s.id] || "")}</textarea>
            <details><summary>Ce qu'en disent les mythes</summary><p>${h(s.m)}</p></details></div>`).join("")}
          <label class="ps-field"><span>Ajouter un symbole</span><select data-addsym><option value="">Choisir…</option>${D.SYM.filter(s => !ids.includes(s.id)).map(s => `<option value="${s.id}">${h(s.nom)}</option>`).join("")}</select></label>
          <label class="ps-field"><span>Ce que ce rêve compense peut-être</span><textarea rows="2" data-comp>${h(r.comp || "")}</textarea></label>
        </section>
        <div class="ps-row"><button type="button" class="btn ghost small" data-rdel>Supprimer ce rêve</button></div>`;
      q1("[data-rlist]", host).onclick = list;
      let tt = 0; const later = () => { clearTimeout(tt); tt = setTimeout(save, 400); };
      qa("[data-sa]", host).forEach(ta => ta.oninput = () => { r.sym = r.sym || {}; r.sym[ta.dataset.sa] = ta.value; later(); });
      q1("[data-comp]", host).oninput = e => { r.comp = e.target.value; later(); };
      q1("[data-addsym]", host).onchange = e => { if(!e.target.value) return; r.sym = r.sym || {}; r.sym[e.target.value] = r.sym[e.target.value] || ""; save(); open(id); };
      q1("[data-rdel]", host).onclick = () => { if(!confirmInline(q1("[data-rdel]", host))) return; st.reves = st.reves.filter(x => x.id !== id); save(); list(); };
    };
    arg ? open(arg) : list();
  };
  /* une confirmation sans boîte de dialogue : il faut toucher deux fois */
  function confirmInline(b){ if(b.dataset.sure){ return true; } b.dataset.sure = "1"; b.textContent = "Toucher encore pour confirmer"; setTimeout(() => { if(b.isConnected){ delete b.dataset.sure; b.textContent = "Supprimer"; } }, 3000); return false; }

  /* ---------- III. le mandala ---------- */
  TOOLR.mandala = host => {
    const COLS = ["#2b2540", "#5b4a8a", "#2a4f8f", "#2c6a47", "#c2a14a", "#a8371f", "#d77a8a", "#f4efe2"];
    let sym = 8, mir = true, col = COLS[0], wd = 4, guide = true, drawing = false, last = null, undo = [];
    host.innerHTML = `<div class="ps-mand"><div class="ps-mand-cv"><canvas width="720" height="720" aria-label="Le mandala : dessine avec le doigt ou la souris"></canvas><canvas class="g" width="720" height="720" aria-hidden="true"></canvas></div>
      <div class="ps-mand-ctl"><p class="pm-lab">Symétrie</p><div class="ps-chips">${[4, 6, 8, 12, 16].map(n => `<button type="button" class="chip" data-sym="${n}">${n}</button>`).join("")}</div>
        <p class="pm-lab">Couleur</p><div class="ps-cols">${COLS.map(c => `<button type="button" data-col="${c}" style="--c:${c}" aria-label="Couleur ${c}"></button>`).join("")}</div>
        <p class="pm-lab">Trait</p><div class="ps-chips">${[2, 4, 8, 16].map(n => `<button type="button" class="chip" data-wd="${n}">${n}</button>`).join("")}</div>
        <div class="ps-chips"><button type="button" class="chip" data-mir>Miroir</button><button type="button" class="chip" data-guide>Guides</button></div>
        <div class="ps-row"><button type="button" class="btn ghost small" data-undo>Annuler</button><button type="button" class="btn ghost small" data-clear>Effacer</button></div>
        <div class="ps-row"><button type="button" class="btn small" data-msave>Garder dans le carnet</button><button type="button" class="btn ghost small" data-mdl>Télécharger</button></div>
        <p class="help">Jung dessinait un petit cercle presque chaque matin, entre 1916 et 1918, sans savoir pourquoi. Il y voyait ensuite le reflet de son état du jour.</p></div></div>`;
    const cv = q1("canvas", host), g = q1("canvas.g", host), x = cv.getContext("2d"), gx = g.getContext("2d"), C = 360;
    const bg = () => { x.fillStyle = "#fbf8ef"; x.fillRect(0, 0, 720, 720); };
    bg();
    const drawGuide = () => { gx.clearRect(0, 0, 720, 720); if(!guide) return; gx.strokeStyle = "rgba(91,74,138,.22)"; gx.lineWidth = 1;
      [80, 170, 260, 340].forEach(r => { gx.beginPath(); gx.arc(C, C, r, 0, Math.PI*2); gx.stroke(); });
      for(let k = 0; k < sym; k++){ const a = k/sym*Math.PI*2; gx.beginPath(); gx.moveTo(C, C); gx.lineTo(C + Math.cos(a)*350, C + Math.sin(a)*350); gx.stroke(); } };
    const sync = () => { qa("[data-sym]", host).forEach(b => b.setAttribute("aria-pressed", +b.dataset.sym === sym)); qa("[data-wd]", host).forEach(b => b.setAttribute("aria-pressed", +b.dataset.wd === wd));
      qa("[data-col]", host).forEach(b => b.setAttribute("aria-pressed", b.dataset.col === col)); q1("[data-mir]", host).setAttribute("aria-pressed", mir); q1("[data-guide]", host).setAttribute("aria-pressed", guide); drawGuide(); };
    sync();
    const pos = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left)/b.width*720 - C, (e.clientY - b.top)/b.height*720 - C]; };
    const seg = (a, b) => { x.strokeStyle = col; x.lineWidth = wd; x.lineCap = "round"; x.lineJoin = "round";
      for(let k = 0; k < sym; k++){ const ang = k/sym*Math.PI*2, co = Math.cos(ang), si = Math.sin(ang);
        [1, mir ? -1 : null].forEach(m => { if(m == null) return; const P = p => [C + (p[0]*co - p[1]*m*si), C + (p[0]*si + p[1]*m*co)];
          const p1 = P(a), p2 = P(b); x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke(); }); } };
    cv.onpointerdown = e => { e.preventDefault(); cv.setPointerCapture(e.pointerId); drawing = true; undo.push(x.getImageData(0, 0, 720, 720)); if(undo.length > 12) undo.shift(); last = pos(e); seg(last, [last[0] + .1, last[1] + .1]); };
    cv.onpointermove = e => { if(!drawing) return; const p = pos(e); seg(last, p); last = p; };
    cv.onpointerup = cv.onpointercancel = () => { drawing = false; };
    qa("[data-sym]", host).forEach(b => b.onclick = () => { sym = +b.dataset.sym; sync(); });
    qa("[data-wd]", host).forEach(b => b.onclick = () => { wd = +b.dataset.wd; sync(); });
    qa("[data-col]", host).forEach(b => b.onclick = () => { col = b.dataset.col; sync(); });
    q1("[data-mir]", host).onclick = () => { mir = !mir; sync(); };
    q1("[data-guide]", host).onclick = () => { guide = !guide; sync(); };
    q1("[data-undo]", host).onclick = () => { const d = undo.pop(); if(d) x.putImageData(d, 0, 0); };
    q1("[data-clear]", host).onclick = () => { undo.push(x.getImageData(0, 0, 720, 720)); bg(); };
    q1("[data-mdl]", host).onclick = () => { const a = document.createElement("a"); a.download = `mandala-${dayKey()}.png`; a.href = cv.toDataURL("image/png"); a.click(); };
    q1("[data-msave]", host).onclick = e => { const t = document.createElement("canvas"); t.width = t.height = 200; t.getContext("2d").drawImage(cv, 0, 0, 200, 200);
      st.mandalas.unshift({id:uid(), t:Date.now(), img:t.toDataURL("image/jpeg", .72)}); st.mandalas = st.mandalas.slice(0, 24); save(); e.target.textContent = "Gardé ✓"; setTimeout(() => { if(e.target.isConnected) e.target.textContent = "Garder dans le carnet"; }, 2000); };
  };

  /* ---------- IV. le miroir de l'ombre ---------- */
  TOOLR.ombre = host => {
    const orOf = t => { const n = norm(t); const f = D.OR.find(([k]) => n.includes(norm(k).slice(0, 6))); return f ? f[1] : null; };
    host.innerHTML = `<div class="ps-card"><p>Ce qui nous agace très fort chez les autres touche souvent notre <b>ombre</b>. Le miroir se fait en trois temps. Sois honnête : personne d'autre ne lira.</p></div>
      <form class="ps-ombre" autocomplete="off"><datalist id="ps-traits">${D.OR.map(([k]) => `<option value="${k}">`).join("")}</datalist>
      ${[0, 1, 2].map(k => `<fieldset class="ps-card ps-om" data-k="${k}"><legend>Miroir ${k + 1}</legend>
        <div class="ps-om-2"><label class="ps-field"><span>Une personne, ou un type de personne</span><input name="qui${k}" maxlength="60" placeholder="un collègue, ma sœur, les gens qui…"></label>
        <label class="ps-field"><span>Le trait qui t'agace, en un mot</span><input name="trait${k}" maxlength="40" list="ps-traits" placeholder="arrogant"></label></div>
        <label class="ps-field"><span>Quand ai-je été, moi aussi, comme ça ?</span><textarea name="moi${k}" rows="2"></textarea></label>
        <p class="ps-or" hidden></p>
        <label class="ps-field"><span>La qualité cachée que je pourrais m'autoriser</span><textarea name="or${k}" rows="2"></textarea></label></fieldset>`).join("")}
      <button type="submit" class="btn">Garder dans le carnet</button><p class="help ps-omsg" aria-live="polite"></p></form>`;
    qa(".ps-om", host).forEach(fs => { const k = fs.dataset.k, inp = q1(`[name=trait${k}]`, fs), p = q1(".ps-or", fs);
      inp.oninput = () => { const o = orOf(inp.value); p.hidden = !o; if(o) p.innerHTML = `<b>L'or possible :</b> derrière « ${h(inp.value)} », il y a peut-être ${h(o)}.`; }; });
    q1("form", host).onsubmit = e => { e.preventDefault(); const f = e.target, items = [0, 1, 2].map(k => ({qui:f["qui" + k].value, trait:f["trait" + k].value, moi:f["moi" + k].value, or:f["or" + k].value})).filter(x => x.trait || x.qui);
      if(!items.length){ q1(".ps-omsg", host).textContent = "Remplis au moins un miroir."; return; }
      st.ombre.unshift({id:uid(), t:Date.now(), items}); save(); q1(".ps-omsg", host).textContent = "Gardé dans le carnet."; f.reset(); qa(".ps-or", host).forEach(p => p.hidden = true); };
  };

  TOOLR.coue = host => {
    let n = 0, voix = false;
    const k = dayKey();
    const draw = () => {
      host.innerHTML = `<div class="ps-card ps-coue"><p class="ps-coue-f">« ${h(D.COUE)} »</p>
        <svg class="ps-knots" viewBox="0 0 400 80" aria-label="${n} nœuds sur 20"><path d="M10 40C60 10 100 70 150 40S240 10 290 40 360 70 390 40" class="s"/>${Array.from({length:20}, (_, i) => { const t = i/19, xx = 14 + t*372, yy = 40 + Math.sin(t*Math.PI*3)*18*(1 - Math.abs(t - .5)); return `<circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${i < n ? 7 : 5}" class="${i < n ? "on" : ""}"/>`; }).join("")}</svg>
        <p class="ps-coue-n" aria-live="polite">${n < 20 ? `${n} sur 20` : "Vingt fois. C'est fait."}</p>
        <div class="ps-row c"><button type="button" class="btn" data-cn${n >= 20 ? " disabled" : ""}>Dire la formule</button><button type="button" class="chip" data-cv aria-pressed="${voix}">Lire à voix haute</button>${n ? `<button type="button" class="btn ghost small" data-cr>Recommencer</button>` : ""}</div>
        <p class="help">${st.coue[k] ? `Aujourd'hui : ${st.coue[k]} fois la ficelle entière.` : "Coué conseillait de le faire le matin au réveil et le soir au coucher, à mi-voix, sans effort, comme une litanie."}</p></div>
        <div class="ps-card"><p><b>D'où ça vient.</b> Émile Coué, pharmacien à Troyes puis à Nancy, comptait la formule sur une ficelle à vingt nœuds. Sa règle : quand la volonté et l'imagination s'opposent, c'est l'imagination qui l'emporte. ${badge("doc")}</p>
        <p><b>Ce qu'on en sait.</b> La formule ne guérit aucune maladie. Mais les attentes positives, la répétition calme et la détente ont des effets réels sur le stress et la perception de la douleur : c'est ce que montrent les études sur le placebo et la relaxation. ${badge("mod")}</p></div>`;
      const nb = q1("[data-cn]", host); if(nb) nb.onclick = () => { n++; if(voix) parle(); if(n >= 20){ st.coue[k] = (st.coue[k] || 0) + 1; save(); } draw(); const b = q1("[data-cn]", host); if(b && !b.disabled) b.focus(); };
      q1("[data-cv]", host).onclick = () => { voix = !voix; draw(); };
      const r = q1("[data-cr]", host); if(r) r.onclick = () => { n = 0; draw(); };
    };
    const parle = () => { try{ const u = new SpeechSynthesisUtterance(D.COUE); u.lang = "fr-FR"; u.rate = .9; speechSynthesis.cancel(); speechSynthesis.speak(u); }catch(e){} };
    draw();
    return () => { try{ speechSynthesis.cancel(); }catch(e){} };
  };

  /* ================================================================
     APPRENDRE : la maison de Jung
     ================================================================ */
  let av = {mod:null, lec:null};
  const SHORT = {p1:["La maison","de Jung"], p2:["Le moi et","la persona"], p3:["Les types",""], p4:["Les","complexes"], p5:["L'ombre",""], p6:["Le rêve",""], p7:["Anima et","animus"], p8:["L'inconscient","collectif"], p9:["Le Soi",""], p10:["Synchro-","nicité"]};
  const BOX = {p1:[8, 226, 58, 60], p2:[78, 140, 92, 64], p3:[176, 140, 92, 64], p4:[78, 224, 92, 64], p5:[176, 224, 92, 64], p6:[78, 318, 92, 58], p7:[176, 318, 92, 58], p8:[86, 410, 88, 60], p9:[180, 410, 84, 60], p10:[288, 150, 58, 76]};
  function houseSVG(){
    const nextId = (nextLec() || {mod:{}}).mod.id;
    const room = m => { const [x, y, w, hh] = BOX[m.id], done = m.lecons.filter(l => st.done.includes(l.id)).length, all = done === m.lecons.length, nm = SHORT[m.id], sm = w < 70;
      return `<g class="ps-room${all ? " done" : ""}${m.id === nextId ? " next" : ""}" data-psgo="mod:${m.id}" role="button" tabindex="0" aria-label="Module ${m.n} : ${h(m.t)}, ${done} leçon${done > 1 ? "s" : ""} sur ${m.lecons.length}">
        <rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="2"/><text class="n" x="${x + 7}" y="${y + 17}">${m.n}</text>
        <text class="t${sm ? " sm" : ""}" x="${x + 7}" y="${y + (sm ? 32 : 36)}">${h(nm[0])}</text><text class="t${sm ? " sm" : ""}" x="${x + 7}" y="${y + (sm ? 43 : 49)}">${h(nm[1])}</text>
        ${m.lecons.map((l, k) => `<circle class="pip${st.done.includes(l.id) ? " on" : ""}" cx="${x + w - 9 - (m.lecons.length - 1 - k)*8}" cy="${y + hh - 9}" r="2.6"/>`).join("")}</g>`; };
    return `<svg class="ps-house" viewBox="0 40 360 460" role="group" aria-label="La maison du rêve de Jung : dix salles, une par module">
      <defs><pattern id="ps-earth" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><line x1="0" y1="0" x2="0" y2="7"/></pattern></defs>
      <rect class="earth" x="0" y="296" width="360" height="204"/>
      <path class="cave" d="M70 392C60 380 78 372 100 376C130 360 170 384 200 372C240 360 268 376 280 392C292 410 282 470 268 480C230 494 120 492 86 482C66 472 62 412 70 392Z"/>
      <rect class="wall" x="70" y="304" width="206" height="78"/>
      <path class="roof" d="M60 128L173 54L286 128Z"/><rect class="wall" x="70" y="128" width="206" height="166"/><path class="floor" d="M70 212H276"/>
      <path class="tower" d="M282 296V140h70v156z"/><path class="roof" d="M278 140l39-46 39 46z"/>
      <path class="ground" d="M0 296H360"/><path class="step" d="M4 296h66M10 290h60"/>
      <path class="way" d="M173 382v18"/>
      <text class="lab" x="173" y="137">L'étage</text><text class="lab" x="173" y="221">Le rez-de-chaussée</text><text class="lab" x="173" y="314">La cave</text><text class="lab" x="173" y="406">La grotte</text>
      <text class="lab" x="317" y="288">La tour</text><text class="lab" x="37" y="220">Le seuil</text>
      ${K.MODULES.map(room).join("")}</svg>`;
  }
  /* ================================================================
     LE LIVRE
     Livre premier, la nuit : huit chapitres, un par niveau du jeu, fermés tant que le niveau n'est pas traversé.
     Livre second, la maison : le cours de Jung, ouvert dès le début.
     ================================================================ */
  let lv = {ch:null, maison:false};
  function renderLivre(){
    const r = root("livre");
    if(av.lec) return renderLecon(r, lecOf(av.lec));
    if(av.mod) return renderModule(r, K.MODULES.find(m => m.id === av.mod));
    if(lv.ch) return renderChapitre(r, lv.ch);
    const E = nuit(), n = st.done.length, tot = LECS.length, nl = nextLec();
    r.innerHTML = `<header class="ps-head"><p class="eyebrow">${E.n} chapitre${E.n > 1 ? "s" : ""} sur 8 · ${n} leçon${n > 1 ? "s" : ""} sur ${tot}</p><h1>Le Livre</h1>
        <p class="ps-lede">Il s'écrit pendant que tu joues. Chaque époque traversée dans la nuit y ouvre un chapitre : ce qui s'est passé, ce qu'on croyait alors, et ce qui agissait vraiment.</p></header>
      <h2 class="pl-part"><small>Livre premier</small>La nuit</h2>
      <div class="pl-chs">${ORDRE.map(c => ligne(c, E)).join("")}</div>
      <h2 class="pl-part" id="pl-maison"><small>Livre second</small>La maison</h2>
      <p class="pl-intro">En 1909, Jung rêve d'une maison : un salon à l'étage, des salles médiévales en bas, une cave romaine, et dessous une grotte pleine d'os. Il y voit une carte de la psyché. C'est la maison que le niveau VII fait traverser. Ce second livre la visite pièce par pièce, et il est ouvert dès le début.</p>
      ${nl ? `<p><button type="button" class="btn small" data-psgo="lec:${nl.id}">${n ? "Reprendre" : "Entrer"} : ${h(nl.t)}</button></p>` : ""}
      <div class="ps-map">${houseSVG()}<div class="ps-mods">${Object.entries(K.LIEUX).map(([lk, L]) => { const ms = K.MODULES.filter(m => m.lieu === lk); return `<section><h3>${h(L.nom)} <small>${h(L.sous)}</small></h3>${ms.map(m => { const d = m.lecons.filter(l => st.done.includes(l.id)).length;
        return `<button type="button" class="ps-modc${d === m.lecons.length ? " done" : ""}" data-psgo="mod:${m.id}"><span class="n">${m.n}</span><span><b>${h(m.t)}</b><small>${h(m.sous)}</small></span><em>${d}/${m.lecons.length}</em></button>`; }).join("")}</section>`; }).join("")}</div></div>`;
    peintTous(r);
    if(lv.maison){ lv.maison = false; const m = q1("#pl-maison", r); if(m) requestAnimationFrame(() => m.scrollIntoView({block:"start"})); }
  }
  function renderApprendre(){ lv.ch = null; return renderLivre(); }
  /* la frise : huit points sur vingt-cinq siècles */
  const frise = (n, E) => `<nav class="pc-frise" aria-label="Les huit chapitres">${ORDRE.map(c => E.fait(c) ? `<button type="button" class="${c === n ? "ici" : ""}" data-psgo="chap:${c}" ${c === n ? `aria-current="page"` : ""}><b>${chiffre(c)}</b><small>${AN[c]}</small></button>` : `<span><b>${chiffre(c)}</b><small>${AN[c]}</small></span>`).join("")}</nav>`;
  function renderChapitre(r, n){
    const E = nuit(), L = NIV[n]; if(!L || !E.fait(n)){ lv.ch = null; return renderLivre(); }
    const hs = HCH[n].map(id => HIST.find(c => c.id === id)).filter(Boolean), i = ORDRE.indexOf(n), prev = ORDRE[i - 1], next = ORDRE[i + 1], neuf = !st.chap[n], pro = E.pro;
    if(neuf){ st.chap[n] = Date.now(); save(); }
    r.innerHTML = `${back("Le Livre", "livre")}<article class="pchap${neuf ? " neuf" : ""}">
      <figure class="pc-hero"><canvas width="160" height="100" data-hero="${n}" aria-hidden="true"></canvas><b aria-hidden="true">${chiffre(n)}</b></figure>
      <header class="ps-head sm pc-tete"><p class="eyebrow">${numero(n)} · ${h(L.lieu)} · ${h(L.ep)}</p><h1>${h(L.nom)}</h1></header>
      <div class="pc-agit"><canvas class="pc-const" width="56" height="40" aria-hidden="true"></canvas><p><small>Ce qui agit</small><b>${h(L.agit)}</b><span>Dans le ciel : ${h(L.ciel)}</span></p></div>
      ${hs.map((c, j) => `<section class="pc-txt${j ? "" : " lettrine"}"><h2 class="pc-h">${h(c.t)}<small>${h(c.per)}</small></h2>${c.p.map(p => `<p>${p}</p>`).join("")}${c.img ? fig(c.img, "wide") : ""}</section>`).join("")}
      <section class="pc-volets"><h2 class="pc-h">Les trois volets<small>ouverts au seuil du niveau</small></h2>${L.volets.map((v, j) => `<article class="pc-vol"><canvas width="160" height="100" data-vol="${j}" aria-hidden="true"></canvas><div><p class="eyebrow">Volet ${j + 1}</p><h3>${h(v.t)}</h3><p>${h(v.txt)}</p></div></article>`).join("")}</section>
      <aside class="pc-cles"><h2 class="pc-h">À retenir</h2><ul>${hs.flatMap(c => c.cles).map(c => `<li>${h(c)}</li>`).join("")}</ul></aside>
      ${frise(n, E)}
      <div class="pc-fin">${n === "VII" ? `<button type="button" class="btn" data-psgo="apprendre">Visiter la maison de Jung</button>` : ""}
        ${next && E.fait(next) ? `<button type="button" class="btn${n === "VII" ? " ghost" : ""}" data-psgo="chap:${next}">${numero(next)} : ${h(NIV[next].nom)}</button>` : pro ? `<button type="button" class="btn${n === "VII" ? " ghost" : ""}" data-miroir>Retourner dans la nuit</button>` : ""}
        ${prev && E.fait(prev) ? `<button type="button" class="linkbtn" data-psgo="chap:${prev}">← ${numero(prev)}</button>` : ""}
        ${pro && !(next && E.fait(next)) ? `<p class="help">La prochaine lueur : ${pro === "E" ? "l'épilogue" : pro} · ${h(NIV[pro].nom)}, ${h(NIV[pro].lieu)}.</p>` : ""}</div></article>`;
    const hero = q1("canvas[data-hero]", r); peint(hero, n);
    qa("canvas[data-vol]", r).forEach(c => { const x = c.getContext("2d"); x.imageSmoothingEnabled = false; try{ L.volets[+c.dataset.vol].img(x); }catch(e){} });
    constel(q1(".pc-const", r), n);
    /* l'image du haut vit, comme dans le jeu */
    if(VIVANT[n] && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)){ let t = 1.3; const id = setInterval(() => { if(!hero.isConnected) return clearInterval(id); t += .14; peint(hero, n, t); }, 140); viewOff = () => clearInterval(id); }
  }
  function renderModule(r, m){
    if(!m){ av.mod = null; return renderApprendre(); }
    const L = K.LIEUX[m.lieu] || {}, best = st.quiz[m.id];
    r.innerHTML = `${back("La maison", "apprendre")}<header class="ps-head sm"><p class="eyebrow">Module ${m.n} · ${h(L.nom || "")}</p><h1>${h(m.t)}</h1><p class="ps-lede">${h(m.sous)}</p></header>
      ${m.id === "p6" ? fig("cauchemar", "wide") : ""}
      <ol class="ps-lecs">${m.lecons.map((l, i) => `<li><button type="button" class="ps-lecb${st.done.includes(l.id) ? " done" : ""}" data-psgo="lec:${l.id}"><span class="n">${i + 1}</span><span><b>${h(l.t)}</b><small>${h(l.sous)}</small></span></button></li>`).join("")}</ol>
      <section class="ps-quiz"><h3>Le quiz du module ${best != null ? `<small>meilleur score : ${best} sur ${m.quiz.length}</small>` : ""}</h3>${m.quiz.map((q, qi) => { const ord = q.r.map((t, k) => ({t, ok:k === q.ok})).sort(() => Math.random() - .5);
        return `<fieldset class="ps-qz" data-qi="${qi}"><legend>${h(q.q)}</legend>${ord.map(o => `<button type="button" data-ok="${o.ok ? 1 : 0}">${h(o.t)}</button>`).join("")}<p class="ps-qz-e" hidden>${h(q.exp)}</p></fieldset>`; }).join("")}
        <p class="ps-qz-s" aria-live="polite"></p></section>`;
    let ans = 0, ok = 0;
    qa(".ps-qz", r).forEach(fs => qa("button", fs).forEach(b => b.onclick = () => { if(fs.dataset.done) return; fs.dataset.done = 1; ans++; const good = b.dataset.ok === "1"; if(good) ok++;
      qa("button", fs).forEach(x => { x.disabled = true; x.classList.toggle("ok", x.dataset.ok === "1"); }); if(!good) b.classList.add("ko"); q1(".ps-qz-e", fs).hidden = false;
      if(ans === m.quiz.length){ st.quiz[m.id] = Math.max(st.quiz[m.id] || 0, ok); save(); q1(".ps-qz-s", r).textContent = `${ok} sur ${m.quiz.length}.${ok === m.quiz.length ? " Sans faute." : ""}`; } }));
  }
  function renderLecon(r, l){
    if(!l){ av.lec = null; return renderApprendre(); }
    const m = l.mod, i = LECS.indexOf(l), prev = LECS[i - 1], next = LECS[i + 1], done = st.done.includes(l.id), ex = l.ex || {};
    const exGo = ex.outil ? `<button type="button" class="btn small" data-psgo="${ex.outil}">Ouvrir l'outil</button>` : "";
    r.innerHTML = `${back(`Module ${m.n}`, "mod:" + m.id)}<article class="ps-lec"><header class="ps-head sm"><p class="eyebrow">Module ${m.n} · leçon ${l.i + 1} sur ${m.lecons.length}</p><h1>${h(l.t)}</h1><p class="ps-lede">${h(l.sous)}</p></header>
      ${l.idee.map(p => `<p>${p}</p>`).join("")}
      ${l.schema && SCHEMAS[l.schema] ? `<figure class="ps-schema" data-schema="${l.schema}"></figure>` : ""}
      ${l.source ? `<blockquote class="ps-src"><p>« ${h(l.source.txt)} »</p><footer>${h(l.source.ref)} ${badge(l.source.st)}</footer></blockquote>` : ""}
      <section class="ps-ex"><p class="eyebrow">Exercice</p><h3>${h(ex.t || "")}</h3><p>${h(ex.txt || "")}</p>${exGo}</section>
      ${l.carnet ? `<label class="ps-field ps-note"><span>${h(l.carnet)}</span><textarea rows="3" data-note>${h(st.notes[l.id] || "")}</textarea></label><p class="help ps-saved" aria-live="polite"></p>` : ""}
      <div class="ps-lecnav"><button type="button" class="btn${done ? " ghost" : ""}" data-ldone>${done ? "Leçon lue ✓" : "J'ai lu cette leçon"}</button>
        <span>${prev ? `<button type="button" class="linkbtn" data-psgo="lec:${prev.id}">← Précédente</button>` : ""}${next ? `<button type="button" class="linkbtn" data-psgo="lec:${next.id}">Suivante →</button>` : ""}</span></div></article>`;
    const sc = q1("[data-schema]", r); if(sc) SCHEMAS[l.schema](sc);
    const ta = q1("[data-note]", r); let t = 0; if(ta) ta.oninput = () => { clearTimeout(t); t = setTimeout(() => { st.notes[l.id] = ta.value; save(); q1(".ps-saved", r).textContent = "Gardé dans le carnet."; }, 500); };
    q1("[data-ldone]", r).onclick = () => { if(st.done.includes(l.id)) st.done = st.done.filter(x => x !== l.id); else { st.done.push(l.id); toast(next ? "Leçon lue. La suivante t'attend." : "Tu as visité toute la maison."); } save();
      if(!done && next) go("lec:" + next.id); else renderLecon(r, l); };
  }
  const SCHEMAS = {
    croix: fig => {
      const F = [["pensee", "La pensée", "Ce que c'est", "juger", 0, -1], ["sentiment", "Le sentiment", "Ce que ça vaut", "juger", 0, 1], ["sensation", "La sensation", "Ce qui est là", "percevoir", -1, 0], ["intuition", "L'intuition", "Ce qui pourrait être", "percevoir", 1, 0]];
      const TXT = {pensee:"Elle relie les choses par la logique : causes, définitions, classements. Le savant, l'ingénieur, le juriste.", sentiment:"Elle évalue : agréable ou non, juste ou injuste, important ou pas. Rien à voir avec l'émotion : c'est un jugement de valeur.",
        sensation:"Elle constate, par les cinq sens, ce qui est présent : les détails, les faits, le concret. L'artisan, le sportif, le cuisinier.", intuition:"Elle devine les possibilités, les liens cachés, l'avenir d'une situation. L'inventeur, l'entrepreneur, le visionnaire."};
      fig.innerHTML = `<div class="ps-croix"><svg viewBox="-110 -110 220 220" aria-hidden="true"><circle r="96"/><path d="M0-96V96M-96 0H96"/><text y="-60" class="j">juger</text><text x="60" y="4" class="p">percevoir</text></svg>
        ${F.map(([id, n, s, , dx, dy]) => `<button type="button" data-fx="${id}" style="--dx:${dx};--dy:${dy}"><b>${n}</b><small>${s}</small></button>`).join("")}</div><p class="ps-croix-t" aria-live="polite">Touche une fonction.</p>`;
      qa("[data-fx]", fig).forEach(b => b.onclick = () => { qa("[data-fx]", fig).forEach(x => x.classList.toggle("on", x === b)); q1(".ps-croix-t", fig).textContent = TXT[b.dataset.fx]; });
    }
  };

  /* ================================================================
     CARNET
     ================================================================ */
  function renderCarnet(){
    const r = root("carnet"), A = window.ArcanesAstro;
    if(toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    if(pv.tool && TOOLR[pv.tool] && TOOLS.some(t => t[0] === pv.tool)) return renderOutil(r);
    const notes = Object.entries(st.notes).filter(([, v]) => v && v.trim()).map(([id, v]) => ({l:lecOf(id), v})).filter(x => x.l);
    const jours = Object.entries(st.jour).filter(([, v]) => (v.a || v.q || "").trim()).sort((a, b) => b[0] < a[0] ? -1 : 1).slice(0, 14);
    const coue = Object.values(st.coue).reduce((a, b) => a + b, 0);
    const combien = {reves:st.reves.length ? `${st.reves.length} rêve${st.reves.length > 1 ? "s" : ""} noté${st.reves.length > 1 ? "s" : ""}` : "", assoc:st.assoc.length ? `${st.assoc.length} passage${st.assoc.length > 1 ? "s" : ""}` : "", ombre:st.ombre.length ? `${st.ombre.length} miroir${st.ombre.length > 1 ? "s" : ""}` : "", mandala:st.mandalas.length ? `${st.mandalas.length} mandala${st.mandalas.length > 1 ? "s" : ""}` : "", coue:coue ? `${coue} fois` : ""};
    r.innerHTML = `${A && A.espace ? A.espace.bar("psyche") : ""}<header class="ps-head"><p class="eyebrow">Cinq exercices, et tes pages</p><h1>Le carnet</h1><p class="ps-lede">Ce que la nuit t'a montré, à essayer sur toi. Chaque exercice vient d'une époque que le jeu fait traverser. Ils servent à se connaître, jamais à se diagnostiquer.</p></header>
      <div class="pk-exos">${TOOLS.map(([id, t, d, ch, sp]) => `<button type="button" class="pk-exo" data-psgo="outil:${id}"><canvas data-sp="${sp}" width="40" height="40" aria-hidden="true"></canvas><span><b>${h(t)}</b><small>${h(d)}</small><em>${ch === "E" ? "Épilogue" : "Chapitre " + ch}${combien[id] ? " · " + combien[id] : ""}</em></span></button>`).join("")}</div>
      <h2 class="pl-part"><small>Ce que tu y as laissé</small>Tes pages</h2>
      <section class="ps-cs"><h2>Les rêves</h2>${st.reves.length ? st.reves.map(rv => `<button type="button" class="ps-li" data-psgo="outil:reves:${rv.id}"><b>${h(rv.titre)}</b><span>${fmtD(rv.t)}${Object.keys(rv.sym || {}).length ? ` · ${Object.keys(rv.sym).length} symbole(s) amplifié(s)` : ""}</span></button>`).join("") : `<p class="help">Aucun rêve noté. <button type="button" class="linkbtn" data-psgo="outil:reves">Ouvrir le journal</button></p>`}</section>
      ${st.mandalas.length ? `<section class="ps-cs"><h2>Les mandalas</h2><div class="ps-mgal">${st.mandalas.map(m => `<figure><img src="${m.img}" alt="Mandala du ${fmtD(m.t)}"><figcaption>${fmtD(m.t)} <button type="button" class="ps-x" data-mdel="${m.id}" aria-label="Supprimer">×</button></figcaption></figure>`).join("")}</div></section>` : ""}
      ${jours.length ? `<section class="ps-cs"><h2>Les jours</h2>${jours.map(([k, v]) => { const a = D.ARCH.find(x => x.id === v.arch); return `<div class="ps-entry"><p class="eyebrow">${fmtD(k + "T12:00")}${a ? " · " + h(a.nom) : ""}</p>${v.a ? `<p>${h(v.a)}</p>` : ""}${v.q ? `<p>${h(v.q)}</p>` : ""}</div>`; }).join("")}</section>` : ""}
      ${st.assoc.length ? `<section class="ps-cs"><h2>Les tests d'associations</h2>${st.assoc.map(a => `<div class="ps-entry"><p class="eyebrow">${fmtD(a.t)} · ${a.n} mots · médiane ${(a.med/1000).toFixed(1)} s</p><p>${a.marques.map(([w, rr]) => `<span class="ps-pill">${h(w)} → ${h(rr || "·")}</span>`).join(" ")}</p>${a.note ? `<p>${h(a.note)}</p>` : ""}</div>`).join("")}</section>` : ""}
      ${st.ombre.length ? `<section class="ps-cs"><h2>Le miroir de l'ombre</h2>${st.ombre.map(o => `<div class="ps-entry"><p class="eyebrow">${fmtD(o.t)}</p>${o.items.map(x => `<p><b>${h(x.trait || "?")}</b>${x.qui ? ` (${h(x.qui)})` : ""}${x.moi ? ` · moi aussi : ${h(x.moi)}` : ""}${x.or ? ` · l'or : ${h(x.or)}` : ""}</p>`).join("")}</div>`).join("")}</section>` : ""}
      ${notes.length ? `<section class="ps-cs"><h2>Mes notes de cours</h2>${notes.map(({l, v}) => `<div class="ps-entry"><p class="eyebrow">Module ${l.mod.n} · ${h(l.t)}</p><p class="ps-entry-q">${h(l.carnet)}</p><p>${h(v)}</p></div>`).join("")}</section>` : ""}
      <p class="help">Tout reste dans ce navigateur. Rien n'est envoyé ailleurs.</p>`;
    if(A && A.espace) A.espace.bind(r);
    qa("canvas[data-sp]", r).forEach(c => sprite(c, c.dataset.sp));
    qa("[data-mdel]", r).forEach(b => b.onclick = () => { st.mandalas = st.mandalas.filter(m => m.id !== b.dataset.mdel); save(); renderCarnet(); });
  }

  /* ================================================================
     L'UNIVERS : entrer, sortir, naviguer
     ================================================================ */
  const VIEWS = ["nuit", "livre", "carnet"], ANCIEN = {jour:"nuit", pratiquer:"carnet", apprendre:"livre", histoire:"livre"};
  /* les icônes : des pixels, comme le reste */
  const pix = d => `<svg class="ico ps-ico" viewBox="0 0 24 24" aria-hidden="true" shape-rendering="crispEdges"><path fill-rule="evenodd" d="${d}"/></svg>`;
  const ICO = {
    nuit:pix("M11 3h2v6h6v2h-6v6h-2v-6H5v-2h6zM4 4h2v2H4zM18 17h2v2h-2zM17 5h1v1h-1zM5 18h1v1H5z"),
    livre:pix("M3 5h8v2H5v10h6v2H3zM13 5h8v14h-8v-2h6V7h-6zM11 6h2v14h-2zM7 9h3v1H7zM7 12h3v1H7zM14 9h3v1h-3zM14 12h3v1h-3z"),
    carnet:pix("M6 3h12v18H6zM8 5v14h8V5zM11 8h4v1h-4zM11 11h4v1h-4zM11 14h3v1h-3zM4 6h3v1H4zM4 11h3v1H4zM4 16h3v1H4z")};
  const LAB = {nuit:["La nuit", "La nuit"], livre:["Le livre", "Le livre"], carnet:["Le carnet", "Le carnet"]};
  const FOOT = `<p class="foot-line">Psyché présente l'histoire de la psychologie et les idées de Jung comme une culture et des outils de réflexion. Elle ne remplace ni un psychologue, ni un médecin, et ses exercices ne sont pas des tests validés. <button type="button" class="foot-cred" data-credits>Crédits et sources</button></p>`;
  let on = false, inited = false, nav = null, otherFoot = "";
  const redraw = () => { if(typeof drawBackground === "function") try{ drawBackground(); }catch(e){} };
  function go(target){
    const [v, a, b] = String(target).split(":");
    if(typeof closeSheet === "function"){ const sh = document.getElementById("sheet"); if(sh && !sh.hidden) closeSheet(); }
    const raz = () => { av = {mod:null, lec:null}; lv.ch = null; };
    if(v === "outil"){ if(TOOLS.some(t => t[0] === a)){ pv = {tool:a, arg:b || null}; view("carnet"); } else { pv = {tool:null, arg:null}; view("nuit"); } }
    else if(v === "pratiquer" || v === "carnet"){ pv = {tool:null, arg:null}; view("carnet"); }
    else if(v === "lec"){ raz(); av.lec = a; view("livre"); }
    else if(v === "mod"){ raz(); av.mod = a; view("livre"); }
    else if(v === "apprendre"){ raz(); lv.maison = true; view("livre"); }
    else if(v === "chap"){ raz(); lv.ch = a; view("livre"); }
    else if(v === "hist"){ raz(); const n = ORDRE.find(c => HCH[c].includes(a)); lv.ch = n && nuit().fait(n) ? n : null; view("livre"); }
    else if(v === "histoire" || v === "livre"){ raz(); view("livre"); }
    else view(v);
  }
  function view(v){
    v = ANCIEN[v] || v; if(!VIEWS.includes(v)) v = "nuit";
    if(!on) return enter(v);
    st.vue = v; save(); offView();
    if(toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    qa(".view").forEach(s => { s.hidden = s.id !== "v-ps-" + v; if(s.hidden && s.classList.contains("ps-view")) s.innerHTML = ""; });
    qa("button", nav).forEach(b => b.setAttribute("aria-current", b.dataset.psview === v ? "page" : "false"));
    try{ history.replaceState(null, "", "#psyche-" + v); }catch(e){}
    ({nuit:renderNuit, livre:renderLivre, carnet:renderCarnet})[v]();
    window.scrollTo({top:0});
  }
  function init(){
    if(inited) return true;
    const tNav = q1(".top .nav"); if(!tNav) return false;
    nav = document.createElement("nav"); nav.className = "nav psnav"; nav.setAttribute("aria-label", "Sections de Psyché"); nav.hidden = true;
    nav.innerHTML = VIEWS.map(v => `<button type="button" data-psview="${v}">${ICO[v]}<span class="l-long">${LAB[v][0]}</span><span class="l-short">${LAB[v][1]}</span></button>`).join("");
    (qa(".top .nav").pop() || tNav).after(nav);
    qa("button", nav).forEach(b => b.onclick = () => { pv = {tool:null, arg:null}; av = {mod:null, lec:null}; lv.ch = null; view(b.dataset.psview); });
    const main = q1("main");
    VIEWS.forEach(v => { const s = document.createElement("section"); s.className = "view ps-view"; s.id = "v-ps-" + v; s.hidden = true; main.appendChild(s); });
    document.addEventListener("click", e => { if(!on) return; const t = e.target.closest && e.target.closest("[data-psgo]"); if(!t) return; e.preventDefault(); go(t.dataset.psgo); });
    /* quand le jeu se ferme, la page se remet à jour : une constellation de plus, un chapitre de plus */
    window.addEventListener("miroir:ferme", () => { if(on) view(st.vue); });
    document.addEventListener("keydown", e => { if(!on) return; const g = e.target.closest && e.target.closest(".ps-room"); if(g && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); go(g.dataset.psgo); } });
    inited = true; return true;
  }
  function enter(v){
    if(!init()) return;
    const foot = q1(".foot");
    if(!on && foot){ otherFoot = foot.innerHTML; foot.innerHTML = FOOT; }
    on = true;
    qa(".top .nav").forEach(n => n.hidden = n !== nav);
    document.documentElement.classList.add("u-psy"); document.body.classList.add("u-psy");
    document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night");
    redraw();
    view(v || st.vue);
  }
  function leave(){
    if(!on) return;
    on = false; offView(); if(toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    if(nav) nav.hidden = true;
    qa(".ps-view").forEach(s => { s.hidden = true; s.innerHTML = ""; });
    document.documentElement.classList.remove("u-psy"); document.body.classList.remove("u-psy");
    const foot = q1(".foot"); if(foot && otherFoot) foot.innerHTML = otherFoot;
    redraw();
  }
  /* le fond : quelques étoiles carrées de plus, aux couleurs du jeu */
  window.psyBackdrop = (x, w, h2) => {
    const r = PX.rng(31), n = Math.round(w*h2/9000);
    for(let i = 0; i < n; i++){ const px = Math.round(r()*w/2)*2, py = Math.round(r()*h2/2)*2, b = r(); x.globalAlpha = .35 + r()*.5; x.fillStyle = b > .9 ? "#ffe9a8" : b > .6 ? "#8fa3c8" : "#4a5a8a"; x.fillRect(px, py, 2, 2); if(b > .95){ x.fillRect(px - 2, py, 6, 2); x.fillRect(px, py - 2, 2, 6); } }
    x.globalAlpha = 1;
  };
  window.PSY_APP = {enter, leave, view, go, state:() => st, active:() => on, _:{D, K, HIST, LECS, TOOLR, save, st:() => st, toast, go}};
})();
