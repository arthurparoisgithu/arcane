/* ===== Arcanes · Alchimie : l'interface =====
   Un quatrième univers, à côté du tarot, de l'astrologie et de la magie :
   L'athanor (le jour, le feu, ton Œuvre), Le laboratoire (les outils), L'école (douze leçons), Histoire, Le carnet.
   On y entre par la pilule de l'en-tête. Les outils du laboratoire sont dans alchimie-labo.js. */
(() => {
  if(!window.ALCH_DATA || !window.ALCH_COURS) return;
  const D = window.ALCH_DATA, K = window.ALCH_COURS, VA = window.AlchVase;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
  const nb = t => String(t ?? "").replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
  const ST = {doc:"Documenté", trad:"Tradition", mod:"Lecture moderne", leg:"Légende"};
  const badge = k => `<span class="al-st al-st-${k}">${ST[k]}</span>`;
  const IMG = k => k.startsWith("m:") ? `magie/img/${k.slice(2)}.webp` : `alchimie/img/${k}.webp`;
  const fig = (k, cls = "", alt = "") => `<figure class="al-fig ${cls}"><img src="${IMG(k)}" alt="${h(alt)}" loading="lazy" decoding="async"><figcaption>${h(D.CRED[k] || "")}</figcaption></figure>`;
  const glyph = (id, cls = "", w = 5) => `<svg class="al-gl ${cls}" viewBox="0 0 100 100" aria-hidden="true">${(D.G[id] || []).map((d, i) => `<path d="${d}" pathLength="1" style="--i:${i}" stroke-width="${w}"/>`).join("")}</svg>`;
  const rule4 = `<i class="al-rule" aria-hidden="true"><b></b><b></b><b></b><b></b></i>`;
  const fmtD = t => new Date(t).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"});
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const EXT = {tools:{}, order:[]};

  /* ---------- mémoire ---------- */
  const STORE = "arcanes.alchimie.v1";
  const DEF = () => ({vue:"athanor", done:[], oeuvre:null, archives:[], planches:[], grand:{n:0, best:null, last:null, felures:0, bestL:{}}, signes:0, defis:[], niveau:0});
  const load = () => { try{ const v = JSON.parse(localStorage.getItem(STORE) || "{}"); const s = Object.assign(DEF(), v && typeof v === "object" ? v : {}); s.grand = Object.assign(DEF().grand, s.grand || {}); return s; }catch(e){ return DEF(); } };
  let st = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(st)); }catch(e){} };
  function gagne(id){ if(!D.PLANCHES[id] || st.planches.includes(id)) return false; st.planches.push(id); save(); return true; }

  /* ---------- le jour ---------- */
  const SIGN_FR = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  const JOURS = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  const metalDuJour = (d = new Date()) => D.METAUX.find(m => m.wd === d.getDay());
  const metalDe = pl => D.METAUX.find(m => m.pl === pl);
  function sunSign(d = new Date()){
    try{ return Math.floor((((window.Astronomy.SunPosition(d).elon % 360) + 360) % 360)/30); }
    catch(e){ const md = (d.getMonth() + 1)*100 + d.getDate(), c = [321,420,521,621,723,823,923,1023,1122,1222]; if(md < 120 || md >= 1222) return 9; if(md < 219) return 10; if(md < 321) return 11; let i = 0; while(i < 9 && md >= c[i + 1]) i++; return i; }
  }
  function heureNow(){
    try{ const H = window.ArcanesMagie.hoursOf(new Date()), now = new Date(); const x = H && H.hours.find(o => o.start <= now && now < o.end); return x ? {m:metalDe(x.pl), fin:x.end} : null; }catch(e){ return null; }
  }
  /* le métal du thème natal : la planète dominante parmi les sept */
  function metalNatal(){
    try{ const A = window.ArcanesAstro, C = typeof ASTRO_CALC !== "undefined" ? ASTRO_CALC : window.ASTRO_CALC, me = A.state().themes.find(x => x.moi); if(!me) return null;
      const ch = C.chart({date:C.localToUTC(me.y, me.m, me.d, me.heure ? me.h : 12, me.heure ? me.mi : 0, me.lieu), lat:+me.lieu.lat, lon:+me.lieu.lon, heure:me.heure, system:"placidus"});
      const dom = C.dominants(ch, "tradition")[0]; return dom ? metalDe(dom.id) : null; }catch(e){ return null; }
  }
  const phaseOf = id => D.PHASES.find(p => p.id === id);

  /* ---------- le vase vivant ---------- */
  function mountVase(root, o){ const cv = q1("canvas[data-vase]", root); if(!cv || !VA) return null; try{ return VA.create(cv, o); }catch(e){ return null; } }
  function vaseEtat(){
    if(st.oeuvre) return {p:D.OEUVRE[st.oeuvre.phase].p, heat:.3, txt:`Ton Œuvre est ${D.OEUVRE[st.oeuvre.phase].nom.toLowerCase()}.`};
    if(st.grand.n) return {p:5, heat:.24, dry:.9, stone:true, crown:true, txt:"La pierre repose dans le vase."};
    return {p:0, heat:.2, txt:"La matière première attend."};
  }

  /* ---------- la feuille (détail) ---------- */
  function sheet(html){
    const sh = document.getElementById("sheet"); if(!sh) return;
    sh.querySelector(".sheet-body").innerHTML = `<div class="al-sheet">${html}</div>`;
    sh.hidden = false; document.body.classList.add("locked");
    const p = sh.querySelector(".sheet-panel"); if(p) p.scrollTop = 0;
  }
  const close = () => { if(typeof closeSheet === "function") closeSheet(); else { const sh = document.getElementById("sheet"); if(sh) sh.hidden = true; document.body.classList.remove("locked"); } };
  function plancheSheet(id){ const P = D.PLANCHES[id]; if(!P) return;
    sheet(`<p class="eyebrow">Planche · d'après le Splendor solis</p><h2>${h(P.t)}</h2>${fig(P.img, "al-fig-plate", P.t)}<p class="al-p">${nb(h(P.x))}</p>
      <p class="help al-left">Le Splendor solis est un manuscrit peint au XVIe siècle. Ces aquarelles en sont des copies modernes, fidèles, réalisées par E. A. Ibbs d'après l'exemplaire de Londres (1582).</p>`); }

  /* ================================================================
     L'ATHANOR : l'accueil
     ================================================================ */
  let vaseHome = null;
  function renderAthanor(){
    const root = q1("#v-al-athanor"); if(!root) return;
    const now = new Date(), m = metalDuJour(now), hr = heureNow(), si = sunSign(now), op = D.OPS[si], ve = vaseEtat();
    const keys = Object.keys(D.PLANCHES), pk = keys[Math.floor(now.getTime()/864e5) % keys.length], P = D.PLANCHES[pk];
    const o = st.oeuvre;
    root.innerHTML = `
      <header class="al-hero al-hero-home">
        <div class="al-hero-txt">
          <p class="eyebrow">${cap(JOURS[now.getDay()])}, jour de ${h(m.planete)}</p>
          <h1>L'athanor</h1>${rule4}
          <p class="al-lede">Le fourneau où la matière mûrit lentement. Tu y retrouves le métal du jour, le feu à conduire et ton Œuvre en cours.</p>
          <div class="al-cta"><button type="button" class="btn" data-algo="labo:jeu">Conduire le Grand Œuvre</button><button type="button" class="btn ghost" data-algo="labo:oeuvre">${o ? "Reprendre mon Œuvre" : "Commencer mon Œuvre"}</button></div>
        </div>
        <figure class="al-niche al-niche-home"><canvas class="al-vase" data-vase aria-label="Le vase sur son feu"></canvas><figcaption>${h(ve.txt)}</figcaption></figure>
      </header>
      <section class="al-today" aria-label="Aujourd'hui">
        <button type="button" class="al-card al-tcard" data-algo="labo:metaux:${m.id}" style="--mc:${m.hex}">
          <span class="al-tk">Le métal du jour</span><span class="al-tg">${glyph(m.id, "draw")}</span>
          <b>${h(m.nom)}</b><span class="al-tm">${h(m.mot)}</span>
          <span class="al-tx"><i>Le geste</i> ${nb(h(m.geste))}</span>${badge("mod")}</button>
        ${hr && hr.m ? `<button type="button" class="al-card al-tcard" data-algo="labo:metaux:${hr.m.id}" style="--mc:${hr.m.hex}">
          <span class="al-tk">L'heure qu'il est</span><span class="al-tg">${glyph(hr.m.id, "draw")}</span>
          <b>Heure de ${h(hr.m.planete.replace(/^l[ae] /, ""))}</b><span class="al-tm">${h(hr.m.nom)}, jusqu'à ${hr.fin.toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"})}</span>
          <span class="al-tx">Chaque heure du jour a sa planète, donc son métal. Le détail est dans la Magie, onglet Aujourd'hui.</span>${badge("trad")}</button>` : ""}
        <article class="al-card al-tcard al-tcard-op">
          <span class="al-tk">L'opération du mois</span><span class="al-tg al-tg-txt">${h(SIGN_FR[si])}</span>
          <b>${h(op[1])}</b><span class="al-tm">${nb(h(op[2]))}</span>
          <span class="al-tx"><i>Le geste</i> ${nb(h(op[3]))}</span>${badge("trad")}
          <span class="al-tnote">Le Soleil est en ${h(SIGN_FR[si])}. En 1758, Dom Pernety associe une opération à chaque signe.</span></article>
      </section>
      ${o ? `<section class="al-card al-oe-home"><div>${VA ? VA.mini(phaseOf(D.OEUVRE[o.phase].id).hex, {level:.5 + o.phase*.1, id:"h"}) : ""}</div><div><p class="eyebrow">Mon Œuvre · ${h(D.OEUVRE[o.phase].nom)}</p><h3>« ${h(o.sujet)} »</h3><p class="al-p">${h(D.OEUVRE[o.phase].verbe)}. Commencée le ${fmtD(o.debut)}.</p><button type="button" class="linkbtn" data-algo="labo:oeuvre">Reprendre</button></div></section>` : ""}
      <section class="al-plate-day">
        <button type="button" class="al-plate-img" data-alplanche="${pk}" aria-label="Voir la planche : ${h(P.t)}"><img src="${IMG(P.img)}" alt="${h(P.t)}" loading="lazy" decoding="async"></button>
        <div><p class="eyebrow">La planche du jour</p><h2>${h(P.t)}</h2><p class="al-p">${nb(h(P.x))}</p>
          <div class="al-acts"><button type="button" class="linkbtn" data-algo="labo:planches">Toutes les planches</button><button type="button" class="linkbtn" data-algo="ecole:l11">Apprendre à lire une image</button></div></div>
      </section>
      <section><h2 class="al-k">Le laboratoire</h2><div class="al-tools al-tools-home">${toolCards(["metaux","elements","signes"])}</div></section>
      <section class="al-card al-warn"><h3>Un laboratoire sans danger</h3><p class="al-p">L'alchimie historique maniait le mercure, le plomb, l'arsenic et des acides forts. Arcanes ne propose aucune recette de ce genre : ici, on apprend l'histoire, on lit les images et on se sert des symboles pour réfléchir. Les seules expériences proposées se font avec de l'eau, du sel et une bougie.</p></section>`;
    vaseHome = mountVase(root, {p:ve.p, heat:ve.heat, dry:ve.dry || 0, stone:!!ve.stone, crown:!!ve.crown});
  }
  const toolCards = ids => ids.map(id => { const t = EXT.tools[id]; return t ? `<button type="button" class="al-card al-tool" data-algo="labo:${id}"><span class="al-tool-ico">${t.ico}</span><span class="al-tool-k">${h(t.genre)}</span><b>${h(t.t)}</b><span>${nb(h(t.x))}</span></button>` : ""; }).join("");

  /* ================================================================
     LE LABORATOIRE : l'index des outils (les outils eux-mêmes sont dans alchimie-labo.js)
     ================================================================ */
  let lab = {tool:null, arg:null}, labOff = null;
  function renderLabo(){
    const root = q1("#v-al-labo"); if(!root) return;
    if(labOff){ try{ labOff(); }catch(e){} labOff = null; }
    const T = lab.tool && EXT.tools[lab.tool];
    if(T){ root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-algo="labo">‹ Le laboratoire</button></p><div class="al-toolview" data-tool="${lab.tool}"></div>`;
      labOff = T.render(q1(".al-toolview", root), lab.arg) || null; return; }
    root.innerHTML = `<header class="al-hero"><p class="eyebrow">Les outils</p><h1>Le laboratoire</h1>${rule4}
        <p class="al-lede">Six outils pour pratiquer : conduire le feu, transformer quelque chose de ta vie, et apprendre le langage des métaux, des éléments, des signes et des images.</p></header>
      <div class="al-tools al-tools-main">${toolCards(["jeu","oeuvre"])}</div>
      <div class="al-tools">${toolCards(["metaux","elements","signes","planches"])}</div>`;
  }

  /* ================================================================
     L'ÉCOLE
     ================================================================ */
  let ev = {lec:null}, quizSt = {};
  const LECS = K.flatMap(m => m.lec.map(l => Object.assign({mod:m}, l)));
  const lecOf = id => LECS.find(l => l.id === id);
  const MODIMG = {m1:["table","50% 30%"], m2:["clef","30% 40%"], m3:["p_union","50% 22%"], m4:["ata42","20% 30%"], m5:["wright","50% 70%"]};
  const NOMBRE = n => ["zéro","une","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit"][n] || String(n);
  function renderEcole(){
    const root = q1("#v-al-ecole"); if(!root) return;
    if(ev.lec && lecOf(ev.lec)) return renderLecon(root, lecOf(ev.lec));
    const n = st.done.length, tot = LECS.length, next = LECS.find(l => !st.done.includes(l.id));
    root.innerHTML = `<header class="al-hero"><p class="eyebrow">${cap(NOMBRE(LECS.length))} leçons, ${NOMBRE(K.length)} modules</p><h1>L'école</h1>${rule4}
        <p class="al-lede">Un cours d'alchimie pour comprendre de quoi il s'agit vraiment : les idées, le laboratoire, le Grand Œuvre, les textes et les images. Chaque leçon se lit en six minutes et se termine par une pratique sans danger.</p>
        <div class="al-prog" role="img" aria-label="${n} leçons sur ${tot}"><i style="width:${Math.round(n/tot*100)}%"></i></div>
        <p class="help al-left">${n ? `${n} leçon${n > 1 ? "s" : ""} sur ${tot}.` : "Tu n'as pas encore commencé."} ${next ? `<button type="button" class="linkbtn" data-algo="ecole:${next.id}">${n ? "Continuer" : "Commencer"} : ${h(next.t)}</button>` : "Tu as tout lu. Bravo."}</p></header>
      ${K.map((m, i) => `<section class="al-mod"><div class="al-mod-h"><span class="al-mod-n">${["I","II","III","IV","V","VI"][i]}</span><div><h2>${h(m.t)}</h2><p>${h(m.sous)}</p></div><img class="al-mod-img" src="${IMG(MODIMG[m.id][0])}" style="object-position:${MODIMG[m.id][1]}" alt="" loading="lazy" decoding="async"></div>
        <div class="al-lecs">${m.lec.map(l => `<button type="button" class="al-card al-lec ${st.done.includes(l.id) ? "done" : ""}" data-algo="ecole:${l.id}"><span class="al-lec-t">${h(l.t)}</span><span class="al-lec-a">${nb(h(l.acc))}</span><span class="al-lec-m">${st.done.includes(l.id) ? "Lue" : l.dur + " min"}</span></button>`).join("")}</div></section>`).join("")}
      <section><h2 class="al-k">Le bestiaire</h2><p class="al-p al-narrow">Les animaux des images alchimiques ne sont pas un décor. Chacun désigne une matière, une étape ou un geste.</p>
        <dl class="al-dl al-dl-2">${D.BESTIAIRE.map(b => `<div><dt>${h(b[0])}</dt><dd>${nb(h(b[1]))}</dd></div>`).join("")}</dl></section>
      <section><h2 class="al-k">Le glossaire</h2><label class="al-search"><span class="sr-only">Chercher un mot</span><input type="search" placeholder="Chercher un mot : athanor, élixir…" data-algloss></label>
        <dl class="al-dl al-gloss">${D.GLOSS.map(g => `<div><dt>${h(g[0])}</dt><dd>${nb(h(g[1]))}</dd></div>`).join("")}</dl><p class="help al-left" data-alnone hidden>Aucun mot ne correspond.</p></section>`;
    const inp = q1("[data-algloss]", root);
    inp.oninput = () => { const v = inp.value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); let c = 0;
      qa(".al-gloss > div", root).forEach(d => { const ok = !v || d.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(v); d.hidden = !ok; if(ok) c++; }); q1("[data-alnone]", root).hidden = c > 0; };
  }
  function renderLecon(root, l){
    const i = LECS.indexOf(l), nx = LECS[i + 1], T = l.outil && EXT.tools[l.outil === "oeuvre-jeu" ? "jeu" : l.outil], qs = quizSt[l.id] || (quizSt[l.id] = {});
    root.innerHTML = `<p class="crumb"><button type="button" class="linkbtn" data-algo="ecole">‹ L'école</button></p>
      <article class="al-lesson">
        <p class="eyebrow">${h(l.mod.t)} · leçon ${i + 1} sur ${LECS.length} · ${l.dur} min</p>
        <h1>${h(l.t)}</h1>${rule4}
        <figure class="al-lesson-img"><img src="${IMG(MODIMG[l.mod.id][0])}" style="object-position:${MODIMG[l.mod.id][1]}" alt=""><figcaption>${h(D.CRED[MODIMG[l.mod.id][0]] || "")}</figcaption></figure>
        <p class="al-acc">${nb(h(l.acc))}</p>
        ${l.idee.map(p => `<p class="al-p">${nb(h(p))}</p>`).join("")}
        <aside class="al-card al-src"><p class="al-src-k">La source ${badge(l.src.st)}</p><h3>${h(l.src.t)}</h3><p class="al-p">${nb(h(l.src.x))}</p></aside>
        <section class="al-ret"><h2>À retenir</h2><ul>${l.ret.map(r => `<li>${nb(h(r))}</li>`).join("")}</ul></section>
        <section class="al-card al-prat"><p class="al-src-k">La pratique</p><h3>${h(l.prat.t)}</h3><p class="al-p">${nb(h(l.prat.x))}</p>
          ${T ? `<button type="button" class="btn small" data-algo="labo:${l.outil === "oeuvre-jeu" ? "jeu" : l.outil}">Ouvrir : ${h(T.t)}</button>` : ""}</section>
        <section class="al-quiz"><h2>Trois questions</h2>
          ${l.quiz.map((q, qi) => `<fieldset class="al-q" data-q="${qi}"><legend>${nb(h(q.q))}</legend><div class="al-q-o">${q.o.map((o, oi) => `<button type="button" data-o="${oi}" ${qs[qi] != null ? "disabled" : ""} class="${qs[qi] != null ? (oi === q.r ? "ok" : oi === qs[qi] ? "ko" : "") : ""}">${h(o)}</button>`).join("")}</div><p class="al-q-e" ${qs[qi] != null ? "" : "hidden"}>${nb(h(q.e))}</p></fieldset>`).join("")}</section>
        <div class="al-lesson-end">${st.done.includes(l.id) ? `<p class="al-done">Leçon lue.</p>` : `<button type="button" class="btn" data-aldone>J'ai lu cette leçon</button>`}
          ${nx ? `<button type="button" class="btn ghost" data-algo="ecole:${nx.id}">Leçon suivante : ${h(nx.t)}</button>` : `<button type="button" class="btn ghost" data-algo="ecole">Retour à l'école</button>`}</div>
      </article>`;
    const finish = () => { if(!st.done.includes(l.id)){ st.done.push(l.id); save(); if(l.mod.lec.every(x => st.done.includes(x.id)) && l.mod.id === "m1" && gagne("dragon")) toast("Une planche gagnée : L'enfant et le dragon."); } };
    qa(".al-q", root).forEach(f => qa("[data-o]", f).forEach(b => b.onclick = () => { const qi = +f.dataset.q, q = l.quiz[qi]; qs[qi] = +b.dataset.o;
      qa("[data-o]", f).forEach((x, oi) => { x.disabled = true; if(oi === q.r) x.classList.add("ok"); else if(oi === qs[qi]) x.classList.add("ko"); });
      q1(".al-q-e", f).hidden = false;
      if(Object.keys(qs).length === l.quiz.length){ finish(); const e = q1(".al-lesson-end", root), d = q1("[data-aldone]", e); if(d) d.outerHTML = `<p class="al-done">Leçon lue.</p>`; } }));
    const dn = q1("[data-aldone]", root); if(dn) dn.onclick = () => { finish(); dn.outerHTML = `<p class="al-done">Leçon lue.</p>`; };
  }

  /* ================================================================
     HISTOIRE
     ================================================================ */
  function renderHistoire(){
    const root = q1("#v-al-histoire"); if(!root) return;
    root.innerHTML = `<header class="al-hero"><p class="eyebrow">Dix-sept siècles au fourneau</p><h1>Une histoire de l'alchimie</h1>${rule4}
        <p class="al-lede">D'Alexandrie à Bagdad, des monastères aux cours des princes, puis des laboratoires aux divans des psychologues. Chaque fait porte son étiquette : ce qui est documenté, ce qui relève de la légende, ce qui est une lecture moderne.</p>
        <nav class="al-eras" aria-label="Les époques">${D.HIST.map(e => `<button type="button" class="chip" data-alera="${e.id}">${h(e.ere)}</button>`).join("")}</nav></header>
      ${D.HIST.map((e, ei) => `<section class="al-era" id="al-era-${e.id}"><header class="al-era-h"><span class="al-era-n">${ei + 1}</span><div><p class="eyebrow">${h(e.quand)}</p><h2>${h(e.ere)}</h2></div></header>
        <p class="al-lede al-era-c">${nb(h(e.chapo))}</p>
        <ol class="al-tl">${e.faits.map(f => `<li class="al-ev ${f.img ? "has-img" : ""}"><div class="al-ev-b"><p class="al-ev-an">${h(f.an)}</p><h3>${h(f.t)} ${badge(f.st)}</h3><p class="al-p">${nb(h(f.x))}</p></div>${f.img ? fig(f.img, "al-ev-fig", f.t) : ""}</li>`).join("")}</ol></section>`).join("")}
      <section class="al-vrai"><h2 class="al-k">Vrai ou légende ?</h2><p class="al-p al-narrow">Cinq idées reçues. Touche une carte pour voir ce qu'en disent les historiens.</p>
        <div class="al-flips">${D.VRAI.map((v, i) => `<button type="button" class="al-flip" data-alflip aria-expanded="false"><span class="al-flip-in"><span class="al-flip-a"><i>On entend dire</i>« ${nb(h(v[0]))} »</span><span class="al-flip-b">${badge(v[2])}${nb(h(v[1]))}</span></span></button>`).join("")}</div></section>
      <section class="al-card al-biblio"><h2>Pour aller plus loin</h2><ul>
        <li>Lawrence M. Principe, <i>The Secrets of Alchemy</i>, University of Chicago Press, 2013.</li>
        <li>Didier Kahn, <i>Le Fixe et le Volatil. Chimie et alchimie, de Paracelse à Lavoisier</i>, CNRS Éditions, 2016.</li>
        <li>William R. Newman, <i>Newton the Alchemist</i>, Princeton University Press, 2019.</li>
        <li>Bernard Joly, <i>Histoire de l'alchimie</i>, Vuibert, 2013.</li>
        <li>Michael Maier, <i>Atalanta fugiens</i>, 1617 : l'édition numérique « Furnace and Fugue » (Brown University) permet d'écouter les fugues.</li></ul></section>`;
    qa("[data-alera]", root).forEach(b => b.onclick = () => { const s = q1("#al-era-" + b.dataset.alera, root); if(s) s.scrollIntoView({behavior:"smooth", block:"start"}); });
    qa("[data-alflip]", root).forEach(b => b.onclick = () => { const on = b.classList.toggle("on"); b.setAttribute("aria-expanded", on); });
    reveal(root, ".al-ev, .al-era-h");
  }
  function reveal(root, sel){
    const els = qa(sel, root); if(!("IntersectionObserver" in window)){ els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {rootMargin:"0px 0px -8% 0px"});
    els.forEach(e => io.observe(e));
  }

  /* ================================================================
     LE CARNET
     ================================================================ */
  function renderCarnet(){
    const root = q1("#v-al-carnet"); if(!root) return;
    const E = window.ArcanesAstro && window.ArcanesAstro.espace, o = st.oeuvre, g = st.grand, np = st.planches.length, tp = Object.keys(D.PLANCHES).length;
    const notes = x => (x.notes || []).map(n => `<div class="al-note"><p class="al-note-k" style="--pc:${phaseOf(D.OEUVRE[n.phase].id).hex}">${h(D.OEUVRE[n.phase].nom)} · ${fmtD(n.t)}</p><p class="al-note-q">${nb(h(D.OEUVRE[n.phase].q))}</p><p class="al-p">${nb(h(n.txt))}</p></div>`).join("");
    root.innerHTML = `${E ? E.bar("alchimie") : ""}
      <header class="al-hero"><p class="eyebrow">Ce que tu as fait ici</p><h1>Le carnet</h1>${rule4}</header>
      <div class="al-stats">
        <div class="al-card al-stat"><b>${st.done.length}<small>/${LECS.length}</small></b><span>leçons lues</span></div>
        <div class="al-card al-stat"><b>${g.n}</b><span>Grand${g.n > 1 ? "s" : ""} Œuvre${g.n > 1 ? "s" : ""} conduit${g.n > 1 ? "s" : ""}</span></div>
        <div class="al-card al-stat"><b>${np}<small>/${tp}</small></b><span>planches gagnées</span></div>
        <div class="al-card al-stat"><b>${st.archives.length}</b><span>Œuvre${st.archives.length > 1 ? "s" : ""} accomplie${st.archives.length > 1 ? "s" : ""}</span></div>
      </div>
      <section><h2 class="al-k">Mon Œuvre en cours</h2>
        ${o ? `<div class="al-card al-oe-card"><p class="eyebrow">${h(D.OEUVRE[o.phase].nom)} · commencée le ${fmtD(o.debut)}</p><h3>« ${h(o.sujet)} »</h3>${notes(o) || `<p class="al-p">Aucune note pour l'instant.</p>`}<div class="al-acts"><button type="button" class="btn small" data-algo="labo:oeuvre">Reprendre</button></div></div>`
          : `<div class="al-card"><p class="al-p">Aucune Œuvre en cours. Tu peux en commencer une dans le laboratoire : tu choisis ce que tu veux transformer, et l'outil t'accompagne à travers les quatre couleurs.</p><div class="al-acts"><button type="button" class="btn small" data-algo="labo:oeuvre">Commencer mon Œuvre</button></div></div>`}</section>
      ${st.archives.length ? `<section><h2 class="al-k">Les Œuvres accomplies</h2>${st.archives.map(a => `<details class="al-card al-arch"><summary><span>« ${h(a.sujet)} »</span><small>${fmtD(a.debut)} → ${fmtD(a.fin)}</small></summary>${notes(a)}</details>`).join("")}</section>` : ""}
      <section><h2 class="al-k">Le Grand Œuvre</h2><div class="al-card"><p class="al-p">${g.n ? `Tu as conduit le feu jusqu'au rouge ${g.n} fois. Ton meilleur temps : ${fmtT(g.best)}. Le vase s'est fêlé ${g.felures || 0} fois en tout.` : "Tu n'as pas encore conduit le feu jusqu'au rouge."} ${(st.defis || []).length ? `Défis du jour réussis : ${st.defis.length}.` : ""}</p><div class="al-acts"><button type="button" class="btn small ghost" data-algo="labo:jeu">${g.n ? "Rejouer" : "Essayer"}</button><button type="button" class="btn small ghost" data-algo="labo:planches">Voir les planches</button></div></div></section>
      <section class="al-card"><h3>La sauvegarde</h3><p class="al-p">La sauvegarde d'Arcanes emporte aussi ton carnet d'alchimie. Elle se fait depuis l'espace du tarot.</p>
        <div class="al-acts"><button type="button" class="linkbtn danger" data-alreset>Effacer mes données d'alchimie</button></div></section>`;
    if(E) E.bind(root);
    const rs = q1("[data-alreset]", root);
    rs.onclick = () => { if(rs.dataset.sure){ st = DEF(); st.vue = "carnet"; save(); renderCarnet(); toast("Tes données d'alchimie sont effacées."); } else { rs.dataset.sure = "1"; rs.textContent = "Confirmer : tout effacer"; } };
  }
  const fmtT = s => s == null ? "" : `${Math.floor(s/60)} min ${String(Math.round(s % 60)).padStart(2, "0")} s`;

  /* ---------- un message bref ---------- */
  let toastEl = null, toastT = 0;
  function toast(msg){
    if(!toastEl){ toastEl = document.createElement("div"); toastEl.className = "al-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("on"), 3400);
  }

  /* ================================================================
     L'UNIVERS : entrer, sortir, naviguer
     ================================================================ */
  const VIEWS = ["athanor","labo","ecole","histoire","carnet"], DARK = ["athanor","labo"];
  const ICO = {
    athanor:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.4 3.5v5.3C10.4 11 6 12.4 6 16.3a6 6 0 0 0 12 0c0-3.9-4.4-5.3-4.4-7.5V3.5"/><path d="M9.4 3.5h5.2"/><path d="M7.2 15.6c1.6-.9 3.2.9 4.8 0s3.2.9 4.8 0" stroke-width="1.2"/></svg>`,
    labo:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="8.5" cy="14.5" r="5.5"/><path d="M8.5 9V5h4c3.4 0 6 2 7.5 5.5"/><path d="M19 12.5v2M5.6 15.2c1.8 1.1 4 1.1 5.8 0" stroke-width="1.2"/></svg>`,
    ecole:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.4c-2.3-1.7-5.4-2.1-8.5-1.4v13.2c3.1-.7 6.2-.3 8.5 1.4 2.3-1.7 5.4-2.1 8.5-1.4V5c-3.1-.7-6.2-.3-8.5 1.4z"/><path d="M12 6.4v12.8"/></svg>`,
    histoire:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10"/><path d="M8 3c0 4.5 4 5.5 4 9s-4 4.5-4 9M16 3c0 4.5-4 5.5-4 9s4 4.5 4 9"/></svg>`,
    carnet:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="1.6"/><path d="M9 3.5v17M12.2 8h3.6M12.2 11.5h3.6" stroke-width="1.3"/></svg>`
  };
  const LAB = {athanor:["Aujourd'hui","Jour"], labo:["Pratiquer","Pratiquer"], ecole:["Apprendre","Apprendre"], histoire:["Histoire","Histoire"], carnet:["Carnet","Carnet"]};
  const FOOT = `<p class="foot-line">L'alchimie est présentée ici comme une histoire, un patrimoine d'images et un langage symbolique, pour apprendre et réfléchir. Elle ne remplace pas l'avis d'un médecin ou d'un psychologue, et aucune expérience chimique n'est proposée. <button type="button" class="foot-cred" data-credits>Crédits et sources</button></p>`;
  let on = false, inited = false, nav = null, otherFoot = "";
  const active = () => on;
  const redraw = () => { if(typeof drawBackground === "function") try{ drawBackground(); }catch(e){} };

  function go(target){
    const [v, a, b] = String(target).split(":");
    if(typeof closeSheet === "function"){ const sh = document.getElementById("sheet"); if(sh && !sh.hidden) closeSheet(); }
    if(v === "labo"){ lab = {tool:a || null, arg:b || null}; view("labo"); }
    else if(v === "ecole"){ ev = {lec:a || null}; view("ecole"); }
    else view(v);
  }
  function view(v){
    if(!VIEWS.includes(v)) v = "athanor";
    if(!on) return enter(v);
    st.vue = v; save();
    const dark = DARK.includes(v), was = document.documentElement.classList.contains("u-four");
    document.documentElement.classList.toggle("u-four", dark); document.body.classList.toggle("u-four", dark);
    if(dark !== was) redraw();
    if(v !== "labo" && labOff){ try{ labOff(); }catch(e){} labOff = null; }
    qa(".view").forEach(s => { s.hidden = s.id !== "v-al-" + v; if(s.hidden && s.classList.contains("al-view")) s.innerHTML = ""; });
    qa("button", nav).forEach(b => b.setAttribute("aria-current", b.dataset.alview === v ? "page" : "false"));
    try{ history.replaceState(null, "", "#alchimie-" + v); }catch(e){}
    if(v === "athanor") renderAthanor(); if(v === "labo") renderLabo(); if(v === "ecole") renderEcole(); if(v === "histoire") renderHistoire(); if(v === "carnet") renderCarnet();
    window.scrollTo({top:0});
  }
  function init(){
    if(inited) return true;
    const tNav = q1(".top .nav"); if(!tNav) return false;
    nav = document.createElement("nav"); nav.className = "nav alnav"; nav.setAttribute("aria-label", "Sections de l'alchimie"); nav.hidden = true;
    nav.innerHTML = VIEWS.map(v => `<button type="button" data-alview="${v}">${ICO[v]}<span class="l-long">${LAB[v][0]}</span><span class="l-short">${LAB[v][1]}</span></button>`).join("");
    (qa(".top .nav").pop() || tNav).after(nav);
    qa("button", nav).forEach(b => b.onclick = () => { const v = b.dataset.alview; if(v === "labo") lab = {tool:null, arg:null}; if(v === "ecole") ev = {lec:null}; view(v); });
    const main = q1("main");
    VIEWS.forEach(v => { const s = document.createElement("section"); s.className = "view al-view"; s.id = "v-al-" + v; s.hidden = true; main.appendChild(s); });
    document.addEventListener("click", e => { if(!on) return; const t = e.target.closest && e.target.closest("[data-algo],[data-alplanche]"); if(!t) return;
      if(t.hasAttribute("data-alplanche")) plancheSheet(t.dataset.alplanche); else go(t.dataset.algo); });
    inited = true; return true;
  }
  function enter(v){
    if(!init()) return;
    const foot = q1(".foot");
    if(!on && foot){ otherFoot = foot.innerHTML; foot.innerHTML = FOOT; }
    on = true;
    qa(".top .nav").forEach(n => n.hidden = n !== nav);
    document.documentElement.classList.add("u-alch"); document.body.classList.add("u-alch");
    document.documentElement.classList.remove("u-astro", "u-night"); document.body.classList.remove("u-astro", "u-night");
    view(v || (VIEWS.includes(st.vue) ? st.vue : "athanor"));
  }
  function leave(){
    if(!on) return;
    on = false; if(labOff){ try{ labOff(); }catch(e){} labOff = null; }
    if(nav) nav.hidden = true;
    qa(".al-view").forEach(s => { s.hidden = true; s.innerHTML = ""; });
    document.documentElement.classList.remove("u-alch", "u-four"); document.body.classList.remove("u-alch", "u-four");
    const foot = q1(".foot"); if(foot && otherFoot) foot.innerHTML = otherFoot;
  }
  /* le fond : le cercle, le carré, le triangle et le cercle de l'emblème XXI de l'Atalanta fugiens */
  window.alchBackdrop = (x, w, h2, v) => {
    const wide = w > 900, dark = document.documentElement.classList.contains("u-four"), A = (wide ? .2 : .12)*(dark ? .55 : .8);
    x.strokeStyle = v("--tree") || "#2c6a5c"; x.lineWidth = 1; x.globalAlpha = A;
    const Rr = Math.min(h2*.4, 380, w*.46), cx = wide ? w - Rr - Math.max(30, w*.045) : w/2, cy = wide ? h2*.54 : h2*.46, T = Math.PI*2;
    const ring = r => { x.beginPath(); x.arc(cx, cy, r, 0, T); x.stroke(); };
    ring(Rr); ring(Rr*.975);
    const tri = [0, 1, 2].map(i => { const a = -Math.PI/2 + i*T/3; return [cx + Math.cos(a)*Rr*.975, cy + Math.sin(a)*Rr*.975]; });
    x.beginPath(); tri.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); x.stroke();
    const R0 = Rr*.975, sq = R0*.4019, by = cy + R0*.5;   // le carré inscrit dans le triangle, posé sur sa base
    x.strokeRect(cx - sq, by - sq*2, sq*2, sq*2);
    x.beginPath(); x.arc(cx, by - sq, sq, 0, T); x.stroke();
    for(let d = 0; d < 360; d += 6){ const a = d*Math.PI/180, r1 = Rr*1.0, r2 = Rr*(d % 30 ? 1.02 : 1.045); x.beginPath(); x.moveTo(cx + Math.cos(a)*r1, cy + Math.sin(a)*r1); x.lineTo(cx + Math.cos(a)*r2, cy + Math.sin(a)*r2); x.stroke(); }
    x.globalAlpha = 1;
  };

  window.ArcanesAlchimie = {enter, leave, active, view, go, state:() => st,
    _:{D, K, VA, EXT, q1, qa, h, cap, nb, badge, IMG, fig, glyph, rule4, fmtD, fmtT, uid, save, st:() => st, gagne, toast, sheet, close, mountVase, phaseOf, metalDuJour, metalNatal, metalDe, plancheSheet, go, view, LECS}};
})();
