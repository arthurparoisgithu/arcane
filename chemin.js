/* ===== Arcanes · Le chemin =====
   Un seul fil de progression pour les arts, facultatif : rien n'est verrouillé.
   Un degré par art dont on a lu la moitié des leçons ; les noms sont ceux du premier ordre de la Golden Dawn (1888).
   On l'ouvre depuis n'importe quel carnet. ArcanesChemin = {etat, grade, chip, open}. */
(() => {
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const read = k => { try{ const v = JSON.parse(localStorage.getItem(k) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } };
  const arr = a => Array.isArray(a) ? a : [];
  const GRADES = [
    {nom:"Néophyte", code:"0=0", mot:"Le seuil. Tu regardes, tu choisis par où entrer."},
    {nom:"Zelator", code:"1=10", mot:"Le degré de la Terre : une première base solide."},
    {nom:"Theoricus", code:"2=9", mot:"Le degré de l'Air : les idées commencent à se relier."},
    {nom:"Practicus", code:"3=8", mot:"Le degré de l'Eau : tu sais lire les images."},
    {nom:"Philosophus", code:"4=7", mot:"Le degré du Feu : les quatre langages te sont familiers."},
    {nom:"Adeptus minor", code:"5=6", mot:"Tu as tout parcouru. Dans la Golden Dawn, c'est ici que commençait la pratique."}
  ];
  /* le grand chelem : un jeu gagné dans chaque art */
  const JEUX = [
    {id:"tarot", art:"Le tarot", t:"L'ordre des lames", x:"Les vingt-deux atouts, dans l'ordre, au chronomètre."},
    {id:"astro", art:"L'astrologie", t:"La roue du zodiaque", x:"Les douze signes autour de la roue."},
    {id:"magie", art:"La magie", t:"Le carré de Saturne", x:"Neuf nombres, quinze partout."},
    {id:"alchimie", art:"L'alchimie", t:"Le Grand Œuvre", x:"Conduire le feu du noir au rouge."},
    {id:"psyche", art:"Psyché", t:"La descente", x:"Quatre étages de la maison de Jung, et les ombres."}];
  function chelem(){
    const J = read("arcanes.chelem.v1"), C = read("arcanes.alchimie.v1"), P = read("arcanes.psyche.v1");
    const won = {tarot:!!(J.tarot && J.tarot.n), astro:!!(J.astro && J.astro.n), magie:!!(J.magie && J.magie.n), alchimie:!!(C.grand && C.grand.n), psyche:!!(P.descente && P.descente.n)};
    const jeux = JEUX.filter(j => j.id !== "psyche" || window.ArcanesPsyche).map(j => ({...j, ok:won[j.id], best:(J[j.id] || {}).best}));
    return {jeux, n:jeux.filter(j => j.ok).length, tout:jeux.every(j => j.ok)};
  }
  function etat(){
    const L = read("arcanes.learn.v1"), A = read("arcanes.astro.v1"), M = read("arcanes.magie.v1"), C = read("arcanes.alchimie.v1"), P = read("arcanes.psyche.v1");
    const tot = (f, d) => { try{ return f(); }catch(e){ return d; } };
    const arts = [
      {id:"tarot", nom:"Le tarot", dit:"Les images", fait:new Set(arr(L.done)).size + new Set(arr(L.keys)).size, tot:22 + tot(() => KEYS.length, 5), go:["tarot","apprendre"], unite:"lames et clés"},
      {id:"astro", nom:"L'astrologie", dit:"Le ciel", fait:new Set(arr(A.done)).size, tot:tot(() => ASTRO_COURS.reduce((t, m) => t + m.lecons.length, 0), 34), go:["astro","apprendre"], unite:"leçons"},
      {id:"alchimie", nom:"L'alchimie", dit:"La matière", fait:new Set(arr(C.done)).size, tot:tot(() => window.ALCH_COURS.reduce((t, m) => t + m.lec.length, 0), 12), go:["alchimie","ecole"], unite:"leçons"},
      {id:"magie", nom:"La magie", dit:"L'acte", fait:new Set(arr(M.done).filter(x => /^m\d+l\d+$/.test(x))).size, tot:tot(() => MAGIE_COURS.MODULES.reduce((t, m) => t + m.lecons.length, 0), 42), go:["magie","ecole"], unite:"leçons"},
      ...(window.ArcanesPsyche ? [{id:"psyche", nom:"Psyché", dit:"L'âme", fait:new Set(arr(P.done)).size, tot:tot(() => window.PSY_COURS.MODULES.reduce((t, m) => t + m.lecons.length, 0), 30), go:["psyche","apprendre"], unite:"leçons"}] : [])
    ];
    arts.forEach(a => { a.fait = Math.min(a.fait, a.tot); a.seuil = Math.ceil(a.tot/2); a.marque = a.fait >= a.seuil; a.fini = a.fait >= a.tot; });
    const n = arts.filter(a => a.marque).length, tout = arts.every(a => a.fini), g = GRADES[tout ? 5 : Math.min(n, 4)];
    const reste = arts.filter(a => !a.marque).sort((x, y) => (x.seuil - x.fait) - (y.seuil - y.fait))[0] || arts.filter(a => !a.fini).sort((x, y) => (x.tot - x.fait) - (y.tot - y.fait))[0] || null;
    return {arts, n, g, tout, reste, rang:tout ? 5 : Math.min(n, 4), chelem:chelem()};
  }
  const grade = () => etat().g;
  const seal = (code, cls = "") => `<span class="chm-seal ${cls}"><svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="46"/><circle r="40"/><path d="M0-30L23.500 18.700-29.200-6.700 29.200-6.700-23.500 18.700Z"/></svg><b>${code}</b></span>`;
  const chip = () => { const e = etat(); return `<button type="button" class="chm-chip" data-chemin>${seal(e.g.code, "xs")}<span><small>Le chemin</small><b>${h(e.g.nom)}</b></span></button>`; };
  function open(){
    const sh = document.getElementById("sheet"); if(!sh) return;
    const e = etat(), r = e.reste;
    sh.querySelector(".sheet-body").innerHTML = `<div class="chm">
      <header class="chm-head">${seal(e.g.code)}<div><p class="eyebrow">Le chemin · degré ${e.rang} sur 5</p><h2>${h(e.g.nom)}</h2><p>${h(e.g.mot)}</p></div></header>
      <ol class="chm-steps" aria-label="Les six degrés">${GRADES.map((g, i) => `<li class="${i < e.rang ? "done" : i === e.rang ? "cur" : ""}"><i></i><span>${h(g.nom)}</span></li>`).join("")}</ol>
      <div class="chm-arts">${e.arts.map(a => `<button type="button" class="chm-art${a.marque ? " ok" : ""}" data-chgo="${a.go.join(":")}">
          <span class="chm-art-h"><b>${h(a.nom)}</b><small>${h(a.dit)}</small><em>${a.fini ? "Parcouru" : a.marque ? "Degré acquis" : `encore ${a.seuil - a.fait}`}</em></span>
          <span class="chm-bar"><i style="width:${Math.round(a.fait/a.tot*100)}%"></i><u style="left:50%"></u></span>
          <span class="chm-art-f">${a.fait} sur ${a.tot} ${a.unite}</span></button>`).join("")}</div>
      ${r ? `<p class="chm-next"><b>Le prochain pas.</b> ${r.marque ? `Il te reste ${r.tot - r.fait} ${r.unite} pour finir ${h(r.nom.toLowerCase())}.` : `Encore ${r.seuil - r.fait} ${r.unite} dans ${h(r.nom.toLowerCase())}, et tu passes au degré suivant.`} <button type="button" class="btn small" data-chgo="${r.go.join(":")}">Y aller</button></p>` : `<p class="chm-next"><b>Tu as tout parcouru.</b> Il reste à pratiquer : compose un rituel, tiens ton carnet.</p>`}
      <section class="chm-chelem${e.chelem.tout ? " tout" : ""}"><h3>Le grand chelem <small>${e.chelem.n} jeu${e.chelem.n > 1 ? "x" : ""} sur ${e.chelem.jeux.length}</small></h3>
        <p class="help">Un jeu par art. Gagne-les tous${e.chelem.tout ? " : c'est fait. Le grand chelem est à toi." : " pour le grand chelem."}</p>
        <div class="chm-jeux">${e.chelem.jeux.map(j => `<button type="button" class="chm-jeu${j.ok ? " ok" : ""}" data-chjeu="${j.id}"><i aria-hidden="true">${j.ok ? "✦" : "◇"}</i><span><small>${h(j.art)}</small><b>${h(j.t)}</b><em>${h(j.x)}</em></span></button>`).join("")}</div></section>
      <div class="chm-note"><p><b>Comment ça marche.</b> Chaque art dont tu as lu la moitié des leçons te donne un degré, dans l'ordre que tu veux. Rien n'est verrouillé : le chemin ne fait que compter.</p>
        <p><b>D'où viennent ces noms.</b> <span class="chm-tag">Tradition · 1888</span> Ce sont les degrés du premier ordre de la Golden Dawn, une société anglaise fondée en 1888. On y apprenait d'abord les éléments, les planètes, les signes, les symboles de l'alchimie et le tarot. La magie pratique ne commençait qu'après. L'idée qu'il s'agit d'un seul et même langage date de cette époque, pas de l'Antiquité.</p></div></div>`;
    sh.hidden = false; document.body.classList.add("locked"); const p = sh.querySelector(".sheet-panel"); if(p) p.scrollTop = 0;
  }
  document.addEventListener("click", e => {
    const t = e.target.closest && e.target.closest("[data-chemin],[data-chgo],[data-chjeu]"); if(!t) return;
    if(t.hasAttribute("data-chemin")) return open();
    if(t.hasAttribute("data-chjeu")) return jouer(t.dataset.chjeu);
    const [u, v] = t.dataset.chgo.split(":"); if(typeof closeSheet === "function") closeSheet();
    try{ window.ArcanesAstro.switchTo(u, v); }catch(x){}
  });
  let chLoad = null;
  const loadChelem = () => chLoad || (chLoad = new Promise((ok, ko) => { if(window.ArcanesChelem) return ok(); const sc = document.createElement("script"); sc.src = "chelem.js"; sc.onload = ok; sc.onerror = () => { chLoad = null; ko(); }; document.head.appendChild(sc); }));
  function jouer(id){
    const AS = window.ArcanesAstro;
    if(id === "alchimie" || id === "psyche"){ if(typeof closeSheet === "function") closeSheet();
      try{ AS.switchTo(id); setTimeout(() => { if(id === "alchimie") window.ArcanesAlchimie.go("labo:jeu"); else window.ArcanesPsyche.go("outil:descente"); }, 80); }catch(x){} return; }
    const sh = document.getElementById("sheet"), body = sh && sh.querySelector(".sheet-body"); if(!body) return;
    const J = JEUX.find(j => j.id === id);
    body.innerHTML = `<div class="chg"><button type="button" class="chg-back" data-chemin>← Le chemin</button><p class="eyebrow">Le grand chelem · ${h(J.art)}</p><h2>${h(J.t)}</h2><div class="chg-host"><p class="help">Chargement…</p></div></div>`;
    sh.hidden = false; document.body.classList.add("locked");
    loadChelem().then(() => window.ArcanesChelem.play(id, body.querySelector(".chg-host"), open)).catch(() => { body.querySelector(".chg-host").innerHTML = `<p class="help">Le jeu n'a pas pu se charger.</p>`; });
  }
  window.ArcanesChemin = {etat, grade, chip, open, jouer, GRADES};
})();
