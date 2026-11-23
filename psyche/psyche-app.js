/* ===== Arcanes · Psyché : l'interface =====
   Le cinquième univers : Aujourd'hui (l'archétype du jour), Pratiquer (six outils), Apprendre (la maison de Jung),
   Histoire (de Mesmer au laboratoire du sommeil), Carnet. Chargé à la demande par psyche.js. */
(() => {
  const D = window.PSY_DATA, K = window.PSY_COURS, HIST = window.PSY_HIST;
  if(!D || !K || !HIST) return;
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
  const DEF = () => ({vue:"jour", descente:null, done:[], notes:{}, jour:{}, reves:[], assoc:[], ombre:[], mandalas:[], coue:{}, quiz:{}, xp:null});
  const load = () => { try{ const v = JSON.parse(localStorage.getItem(STORE) || "{}"); return Object.assign(DEF(), v && typeof v === "object" ? v : {}); }catch(e){ return DEF(); } };
  let st = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(st)); }catch(e){ toast("La mémoire du navigateur est pleine : supprime quelques mandalas."); } };

  let toastEl = null, toastT = 0;
  function toast(msg){
    if(!toastEl){ toastEl = document.createElement("div"); toastEl.className = "ps-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("on"), 3200);
  }
  const root = v => q1("#v-ps-" + v);
  const nextLec = () => LECS.find(l => !st.done.includes(l.id)) || null;
  const archDuJour = () => D.ARCH[mod(dayN(), D.ARCH.length)];
  const back = (lab, go) => `<button type="button" class="ps-back" data-psgo="${go}">← ${h(lab)}</button>`;

  /* ================================================================
     AUJOURD'HUI
     ================================================================ */
  function renderJour(){
    const r = root("jour"), A = archDuJour(), Q = D.QUESTIONS[mod(dayN(), D.QUESTIONS.length)], k = dayKey(), J = st.jour[k] || {}, nl = nextLec(), cn = (st.coue[k] || 0);
    const date = new Date().toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long"});
    r.innerHTML = `<header class="ps-head"><p class="eyebrow">${h(date)}</p><h1>Psyché</h1><p class="ps-lede">L'âme, les rêves et l'inconscient : de Mesmer à Jung, une maison à visiter pièce par pièce, et des outils pour se regarder.</p></header>
      <button type="button" class="ps-miroir" data-miroir><svg viewBox="0 0 40 52" width="56" height="73" aria-hidden="true" shape-rendering="crispEdges"><path d="M4 50V20C4 9 11 3 20 3s16 6 16 17v30z" fill="#b08a3c"/><path d="M6 50V20C6 10 12 5 20 5s14 5 14 15v30z" fill="#e2bd5a"/><path d="M9 48V21c0-8 5-12 11-12s11 4 11 12v27z" fill="#14162b"/><rect x="17" y="24" width="6" height="6" fill="#f4efe2"/><rect x="15" y="30" width="10" height="10" fill="#f4efe2"/><rect x="11" y="34" width="6" height="12" fill="#c2501c"/><rect x="12" y="36" width="3" height="8" fill="#ffe9a8"/><rect x="2" y="49" width="36" height="3" fill="#86603a"/></svg><div><small>Le jeu</small><b>Le Miroir</b><span>Une nuit, un miroir très loin, le cabinet de Jung, et une maison plus grande dedans que dehors.</span></div></button>
      <article class="ps-arch" style="--i:${D.ARCH.indexOf(A)}">
        <div class="ps-arch-sym" aria-hidden="true">${archSVG(D.ARCH.indexOf(A))}</div>
        <div><p class="eyebrow">L'archétype du jour</p><h2>${h(A.nom)}</h2><p class="ps-arch-sous">${h(A.sous)}</p><p>${h(A.txt)}</p>
          <p class="ps-arch-m"><b>Dans les mythes</b> ${h(A.mythes)} · <b>Dans le tarot</b> ${h(A.lame)}</p>
          <label class="ps-field"><span>${h(A.q)}</span><textarea rows="3" data-jour="a" placeholder="Quelques mots suffisent.">${h(J.a || "")}</textarea></label></div>
      </article>
      <section class="ps-q"><p class="eyebrow">La question du jour</p><p class="ps-q-t">${h(Q)}</p><textarea rows="3" data-jour="q" aria-label="Ta réponse">${h(J.q || "")}</textarea><p class="help ps-saved" aria-live="polite"></p></section>
      <div class="ps-tiles">
        <button type="button" class="ps-tile" data-psgo="outil:reves"><b>Noter un rêve</b><span>${st.reves.length ? `${st.reves.length} rêve${st.reves.length > 1 ? "s" : ""} dans ton journal` : "Le journal et l'amplification"}</span></button>
        ${nl ? `<button type="button" class="ps-tile" data-psgo="lec:${nl.id}"><b>Continuer le cours</b><span>Module ${nl.mod.n} · ${h(nl.t)}</span></button>` : `<button type="button" class="ps-tile" data-psgo="apprendre"><b>Le cours est fini</b><span>Relis la maison</span></button>`}
        <button type="button" class="ps-tile" data-psgo="outil:coue"><b>La ficelle de Coué</b><span>${cn ? `${cn} fois aujourd'hui` : "Vingt nœuds, une formule"}</span></button>
        <button type="button" class="ps-tile" data-psgo="outil:descente"><b>La descente</b><span>${st.descente && st.descente.n ? `Le jeu · ${st.descente.n} fois au fond` : "Le jeu : descendre dans la maison"}</span></button>
      </div>
      <p class="ps-care">Psyché est un espace de curiosité et de réflexion, pas un soin. Si une souffrance dure, parles-en à un médecin ou à un psychologue.</p>`;
    let t = 0;
    qa("[data-jour]", r).forEach(ta => ta.oninput = () => { clearTimeout(t); t = setTimeout(() => { st.jour[k] = Object.assign(st.jour[k] || {}, {[ta.dataset.jour]:ta.value, arch:A.id}); save(); q1(".ps-saved", r).textContent = "Gardé dans le carnet."; }, 500); });
  }
  /* un sceau différent pour chaque archétype : des cercles et des traits simples */
  function archSVG(i){
    const n = [3, 4, 5, 6, 7, 8][i % 6], rot = i*15, pts = Array.from({length:n}, (_, k) => { const a = (k/n)*Math.PI*2 - Math.PI/2 + rot*Math.PI/180; return [50 + Math.cos(a)*34, 50 + Math.sin(a)*34]; });
    return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="40" class="t"/><path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(" ")).join("L")}Z"/>${i % 2 ? `<circle cx="50" cy="50" r="12"/>` : `<path d="M50 30V70M30 50H70" class="t"/>`}<circle cx="50" cy="50" r="2.5" class="f"/></svg>`;
  }

  /* ================================================================
     PRATIQUER
     ================================================================ */
  const TOOLS = [
    ["miroir", "Le Miroir", "Le grand jeu : la nuit, le cabinet de Jung, la maison"],
    ["descente", "La descente", "Un petit jeu : quatre étages, quatre symboles, et les ombres"],
    ["assoc", "Le test d'associations", "Cent mots, un chronomètre : l'expérience de Jung en 1904"],
    ["reves", "Le journal des rêves", "Noter, puis amplifier les symboles"],
    ["mandala", "L'atelier du mandala", "Dessiner un cercle en symétrie"],
    ["ombre", "Le miroir de l'ombre", "Ce qui t'agace chez les autres, et l'or qu'il cache"],
    ["xp", "L'expérience de 1784", "Rejoue les épreuves des commissaires du roi"],
    ["coue", "La ficelle de Coué", "Vingt nœuds et une formule"]];
  let pv = {tool:null, arg:null}, toolOff = null;
  function renderPratiquer(){
    const r = root("pratiquer");
    if(toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    if(pv.tool && TOOLR[pv.tool]){ const T = TOOLS.find(t => t[0] === pv.tool);
      r.innerHTML = `${back("Les outils", "pratiquer")}<header class="ps-head sm"><p class="eyebrow">Pratiquer</p><h1>${h(T[1])}</h1></header><div class="ps-tool"></div>`;
      toolOff = TOOLR[pv.tool](q1(".ps-tool", r), pv.arg) || null; return; }
    r.innerHTML = `<header class="ps-head"><p class="eyebrow">Pratiquer</p><h1>Les outils</h1><p class="ps-lede">Deux jeux et six exercices tirés de l'histoire de la psychologie. Ils servent à se connaître et à réfléchir, jamais à se diagnostiquer.</p></header>
      <div class="ps-tools">${TOOLS.map(([id, t, d], i) => `<button type="button" class="ps-toolc" data-psgo="outil:${id}"><span class="ps-toolc-n">${["I","II","III","IV","V","VI","VII","VIII"][i]}</span><b>${h(t)}</b><span>${h(d)}</span></button>`).join("")}</div>`;
  }
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

  /* ---------- V. l'expérience de 1784 ---------- */
  TOOLR.xp = host => {
    let k = 0, score = 0;
    const intro = () => { host.innerHTML = `${fig("m:hx_mesmer", "wide")}<div class="ps-card"><p>Paris, 1784. Le roi charge des savants d'examiner le <b>magnétisme animal</b> de Mesmer : un fluide invisible qui guérirait les malades par des « crises ». Parmi eux, Benjamin Franklin et Lavoisier.</p>
        <p>Tu es commissaire. Pour chaque épreuve, prévois ce qui va se passer.</p><button type="button" class="btn" data-xgo>Commencer</button></div>`;
      q1("[data-xgo]", host).onclick = () => { k = 0; score = 0; step(); }; };
    const step = () => { const X = D.XP[k];
      host.innerHTML = `<div class="ps-card ps-xp"><p class="eyebrow">Épreuve ${k + 1} sur ${D.XP.length}</p><h3>${h(X.t)}</h3><p>${h(X.txt)}</p>
        <div class="ps-xp-ch">${X.ch.map((c, i) => `<button type="button" class="ps-xp-b" data-xc="${i}">${h(c)}</button>`).join("")}</div><div class="ps-xp-r" aria-live="polite"></div></div>`;
      qa("[data-xc]", host).forEach(b => b.onclick = () => { const i = +b.dataset.xc, ok = i === X.ok; if(ok) score++;
        qa("[data-xc]", host).forEach(x => { x.disabled = true; x.classList.toggle("ok", +x.dataset.xc === X.ok); x.classList.toggle("ko", +x.dataset.xc === i && !ok); });
        q1(".ps-xp-r", host).innerHTML = `<p><b>${ok ? "Bien vu." : "Pas tout à fait."}</b> ${h(X.rep)}</p><button type="button" class="btn small" data-xn>${k + 1 < D.XP.length ? "Épreuve suivante" : "Le verdict"}</button>`;
        q1("[data-xn]", host).onclick = () => { k++; k < D.XP.length ? step() : fin(); }; }); };
    const fin = () => { st.xp = {t:Date.now(), score}; save();
      host.innerHTML = `<div class="ps-card ps-xp"><p class="eyebrow">Le verdict · ${score} sur ${D.XP.length}</p><h3>L'imagination fait tout</h3>
        <p>Le rapport rédigé par Bailly conclut que l'imagination sans magnétisme produit des convulsions, et que le magnétisme sans imagination ne produit rien. <b>Le fluide n'existe pas.</b></p>
        <p>Mais les commissaires ont fait deux découvertes. Une méthode : l'expérience à l'aveugle, où le sujet ignore ce qu'on lui fait, qui est devenue la base des essais médicaux. Et un phénomène : la force de l'attente sur le corps, qu'on appellera l'<b>effet placebo</b>.</p>
        <div class="ps-row"><button type="button" class="btn small" data-psgo="hist:h3">Lire le chapitre</button><button type="button" class="btn ghost small" data-xagain>Rejouer</button></div></div>`;
      q1("[data-xagain]", host).onclick = intro; };
    intro();
  };

  /* ---------- VI. la ficelle de Coué ---------- */
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
  function renderApprendre(){
    const r = root("apprendre");
    if(av.lec) return renderLecon(r, lecOf(av.lec));
    if(av.mod) return renderModule(r, K.MODULES.find(m => m.id === av.mod));
    const n = st.done.length, tot = LECS.length, nl = nextLec();
    r.innerHTML = `<header class="ps-head"><p class="eyebrow">Apprendre · ${n} leçon${n > 1 ? "s" : ""} sur ${tot}</p><h1>La maison de Jung</h1>
        <p class="ps-lede">En 1909, Jung rêve d'une maison : un salon à l'étage, des salles médiévales en bas, une cave romaine, et dessous une grotte pleine d'os. Il y voit une carte de la psyché. Le cours la visite, du seuil à la grotte.</p>
        ${nl ? `<button type="button" class="btn small" data-psgo="lec:${nl.id}">${n ? "Reprendre" : "Entrer"} : ${h(nl.t)}</button>` : ""}</header>
      <div class="ps-map">${houseSVG()}<div class="ps-mods">${Object.entries(K.LIEUX).map(([lk, L]) => { const ms = K.MODULES.filter(m => m.lieu === lk); return `<section><h3>${h(L.nom)} <small>${h(L.sous)}</small></h3>${ms.map(m => { const d = m.lecons.filter(l => st.done.includes(l.id)).length;
        return `<button type="button" class="ps-modc${d === m.lecons.length ? " done" : ""}" data-psgo="mod:${m.id}"><span class="n">${m.n}</span><span><b>${h(m.t)}</b><small>${h(m.sous)}</small></span><em>${d}/${m.lecons.length}</em></button>`; }).join("")}</section>`; }).join("")}</div></div>`;
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
     HISTOIRE
     ================================================================ */
  let hv = {ch:null};
  function renderHistoire(){
    const r = root("histoire"), c = HIST.find(x => x.id === hv.ch);
    if(c){ const i = HIST.indexOf(c), prev = HIST[i - 1], next = HIST[i + 1];
      r.innerHTML = `${back("La frise", "histoire")}<article class="ps-hch"><header class="ps-head sm"><p class="eyebrow">Chapitre ${c.n} · ${h(c.per)}</p><h1>${h(c.t)}</h1></header>
        ${c.img ? fig(c.img, "wide") : ""}${c.p.map(p => `<p>${p}</p>`).join("")}
        <aside class="ps-cles"><p class="eyebrow">À retenir</p><ul>${c.cles.map(k => `<li>${h(k)}</li>`).join("")}</ul></aside>
        <div class="ps-lecnav"><span></span><span>${prev ? `<button type="button" class="linkbtn" data-psgo="hist:${prev.id}">← ${h(prev.court)}</button>` : ""}${next ? `<button type="button" class="linkbtn" data-psgo="hist:${next.id}">${h(next.court)} →</button>` : ""}</span></div></article>`;
      return; }
    r.innerHTML = `<header class="ps-head"><p class="eyebrow">Histoire</p><h1>Du temple au laboratoire</h1><p class="ps-lede">Comment on a cherché à soigner l'âme : le sommeil des temples, le fluide de Mesmer, le somnambulisme, l'hypnose, la querelle de Paris et de Nancy, Janet, Freud, Jung, Coué, et le laboratoire du sommeil.</p></header>
      ${fig("cauchemar", "wide")}
      <ol class="ps-frise">${HIST.map(c => `<li><button type="button" data-psgo="hist:${c.id}"><span class="n">${c.n}</span><span><small>${h(c.per)}</small><b>${h(c.t)}</b></span></button></li>`).join("")}</ol>
      <p class="help">Le globe d'Arcanes situe aussi ces épisodes sur la carte : la famille « L'inconscient ».</p>`;
  }

  /* ================================================================
     CARNET
     ================================================================ */
  function renderCarnet(){
    const r = root("carnet"), A = window.ArcanesAstro;
    const notes = Object.entries(st.notes).filter(([, v]) => v && v.trim()).map(([id, v]) => ({l:lecOf(id), v})).filter(x => x.l);
    const jours = Object.entries(st.jour).filter(([, v]) => (v.a || v.q || "").trim()).sort((a, b) => b[0] < a[0] ? -1 : 1).slice(0, 14);
    const coue = Object.values(st.coue).reduce((a, b) => a + b, 0);
    r.innerHTML = `${A && A.espace ? A.espace.bar("psyche") : ""}<header class="ps-head sm"><p class="eyebrow">Carnet</p><h1>Mon carnet de Psyché</h1><p class="ps-lede">${st.reves.length} rêve${st.reves.length > 1 ? "s" : ""}, ${st.assoc.length} test${st.assoc.length > 1 ? "s" : ""} d'associations, ${st.mandalas.length} mandala${st.mandalas.length > 1 ? "s" : ""}, ${st.done.length} leçon${st.done.length > 1 ? "s" : ""} lue${st.done.length > 1 ? "s" : ""}${coue ? `, ${coue} ficelle${coue > 1 ? "s" : ""} de Coué` : ""}.</p></header>
      <section class="ps-cs"><h2>Les rêves</h2>${st.reves.length ? st.reves.map(rv => `<button type="button" class="ps-li" data-psgo="outil:reves:${rv.id}"><b>${h(rv.titre)}</b><span>${fmtD(rv.t)}${Object.keys(rv.sym || {}).length ? ` · ${Object.keys(rv.sym).length} symbole(s) amplifié(s)` : ""}</span></button>`).join("") : `<p class="help">Aucun rêve noté. <button type="button" class="linkbtn" data-psgo="outil:reves">Ouvrir le journal</button></p>`}</section>
      ${st.mandalas.length ? `<section class="ps-cs"><h2>Les mandalas</h2><div class="ps-mgal">${st.mandalas.map(m => `<figure><img src="${m.img}" alt="Mandala du ${fmtD(m.t)}"><figcaption>${fmtD(m.t)} <button type="button" class="ps-x" data-mdel="${m.id}" aria-label="Supprimer">×</button></figcaption></figure>`).join("")}</div></section>` : ""}
      ${jours.length ? `<section class="ps-cs"><h2>Les jours</h2>${jours.map(([k, v]) => { const a = D.ARCH.find(x => x.id === v.arch); return `<div class="ps-entry"><p class="eyebrow">${fmtD(k + "T12:00")}${a ? " · " + h(a.nom) : ""}</p>${v.a ? `<p>${h(v.a)}</p>` : ""}${v.q ? `<p>${h(v.q)}</p>` : ""}</div>`; }).join("")}</section>` : ""}
      ${st.assoc.length ? `<section class="ps-cs"><h2>Les tests d'associations</h2>${st.assoc.map(a => `<div class="ps-entry"><p class="eyebrow">${fmtD(a.t)} · ${a.n} mots · médiane ${(a.med/1000).toFixed(1)} s</p><p>${a.marques.map(([w, rr]) => `<span class="ps-pill">${h(w)} → ${h(rr || "·")}</span>`).join(" ")}</p>${a.note ? `<p>${h(a.note)}</p>` : ""}</div>`).join("")}</section>` : ""}
      ${st.ombre.length ? `<section class="ps-cs"><h2>Le miroir de l'ombre</h2>${st.ombre.map(o => `<div class="ps-entry"><p class="eyebrow">${fmtD(o.t)}</p>${o.items.map(x => `<p><b>${h(x.trait || "?")}</b>${x.qui ? ` (${h(x.qui)})` : ""}${x.moi ? ` · moi aussi : ${h(x.moi)}` : ""}${x.or ? ` · l'or : ${h(x.or)}` : ""}</p>`).join("")}</div>`).join("")}</section>` : ""}
      ${notes.length ? `<section class="ps-cs"><h2>Mes notes de cours</h2>${notes.map(({l, v}) => `<div class="ps-entry"><p class="eyebrow">Module ${l.mod.n} · ${h(l.t)}</p><p class="ps-entry-q">${h(l.carnet)}</p><p>${h(v)}</p></div>`).join("")}</section>` : ""}
      <p class="help">Tout reste dans ce navigateur. Rien n'est envoyé ailleurs.</p>`;
    if(A && A.espace) A.espace.bind(r);
    qa("[data-mdel]", r).forEach(b => b.onclick = () => { st.mandalas = st.mandalas.filter(m => m.id !== b.dataset.mdel); save(); renderCarnet(); });
  }

  /* ================================================================
     L'UNIVERS : entrer, sortir, naviguer
     ================================================================ */
  const VIEWS = ["jour", "pratiquer", "apprendre", "histoire", "carnet"];
  const ICO = {
    jour:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4" stroke-width="1.2"/></svg>`,
    pratiquer:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19c3-1 4-4 5-7s3-6 7-7c1 3 0 7-3 9s-6 2-9 5z"/><path d="M8.5 15.5l3-3" stroke-width="1.2"/></svg>`,
    apprendre:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5"/><path d="M6 9v11h12V9M6 14.5h12" stroke-width="1.3"/><path d="M11 20v-3h2v3" stroke-width="1.1"/></svg>`,
    histoire:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10M7 21h10"/><path d="M8 3c0 4.5 4 5.5 4 9s-4 4.5-4 9M16 3c0 4.5-4 5.5-4 9s4 4.5 4 9"/></svg>`,
    carnet:`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="1.6"/><path d="M9 3.5v17M12.2 8h3.6M12.2 11.5h3.6" stroke-width="1.3"/></svg>`};
  const LAB = {jour:["Aujourd'hui","Jour"], pratiquer:["Pratiquer","Pratiquer"], apprendre:["Apprendre","Apprendre"], histoire:["Histoire","Histoire"], carnet:["Carnet","Carnet"]};
  const FOOT = `<p class="foot-line">Psyché présente l'histoire de la psychologie et les idées de Jung comme une culture et des outils de réflexion. Elle ne remplace ni un psychologue, ni un médecin, et ses exercices ne sont pas des tests validés. <button type="button" class="foot-cred" data-credits>Crédits et sources</button></p>`;
  let on = false, inited = false, nav = null, otherFoot = "";
  const redraw = () => { if(typeof drawBackground === "function") try{ drawBackground(); }catch(e){} };
  function go(target){
    const [v, a, b] = String(target).split(":");
    if(typeof closeSheet === "function"){ const sh = document.getElementById("sheet"); if(sh && !sh.hidden) closeSheet(); }
    if(v === "outil"){ pv = {tool:a || null, arg:b || null}; view("pratiquer"); }
    else if(v === "pratiquer"){ pv = {tool:null, arg:null}; view("pratiquer"); }
    else if(v === "lec"){ av = {mod:null, lec:a}; view("apprendre"); }
    else if(v === "mod"){ av = {mod:a, lec:null}; view("apprendre"); }
    else if(v === "apprendre"){ av = {mod:null, lec:null}; view("apprendre"); }
    else if(v === "hist"){ hv = {ch:a}; view("histoire"); }
    else if(v === "histoire"){ hv = {ch:null}; view("histoire"); }
    else view(v);
  }
  function view(v){
    if(!VIEWS.includes(v)) v = "jour";
    if(!on) return enter(v);
    st.vue = v; save();
    if(v !== "pratiquer" && toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    qa(".view").forEach(s => { s.hidden = s.id !== "v-ps-" + v; if(s.hidden && s.classList.contains("ps-view")) s.innerHTML = ""; });
    qa("button", nav).forEach(b => b.setAttribute("aria-current", b.dataset.psview === v ? "page" : "false"));
    try{ history.replaceState(null, "", "#psyche-" + v); }catch(e){}
    ({jour:renderJour, pratiquer:renderPratiquer, apprendre:renderApprendre, histoire:renderHistoire, carnet:renderCarnet})[v]();
    window.scrollTo({top:0});
  }
  function init(){
    if(inited) return true;
    const tNav = q1(".top .nav"); if(!tNav) return false;
    nav = document.createElement("nav"); nav.className = "nav psnav"; nav.setAttribute("aria-label", "Sections de Psyché"); nav.hidden = true;
    nav.innerHTML = VIEWS.map(v => `<button type="button" data-psview="${v}">${ICO[v]}<span class="l-long">${LAB[v][0]}</span><span class="l-short">${LAB[v][1]}</span></button>`).join("");
    (qa(".top .nav").pop() || tNav).after(nav);
    qa("button", nav).forEach(b => b.onclick = () => { const v = b.dataset.psview; if(v === "pratiquer") pv = {tool:null, arg:null}; if(v === "apprendre") av = {mod:null, lec:null}; if(v === "histoire") hv = {ch:null}; view(v); });
    const main = q1("main");
    VIEWS.forEach(v => { const s = document.createElement("section"); s.className = "view ps-view"; s.id = "v-ps-" + v; s.hidden = true; main.appendChild(s); });
    document.addEventListener("click", e => { if(!on) return; const t = e.target.closest && e.target.closest("[data-psgo]"); if(!t) return; e.preventDefault(); go(t.dataset.psgo); });
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
    view(v || (VIEWS.includes(st.vue) ? st.vue : "jour"));
  }
  function leave(){
    if(!on) return;
    on = false; if(toolOff){ try{ toolOff(); }catch(e){} toolOff = null; }
    if(nav) nav.hidden = true;
    qa(".ps-view").forEach(s => { s.hidden = true; s.innerHTML = ""; });
    document.documentElement.classList.remove("u-psy"); document.body.classList.remove("u-psy");
    const foot = q1(".foot"); if(foot && otherFoot) foot.innerHTML = otherFoot;
    redraw();
  }
  /* le fond : un mandala très pâle, quatre cercles et une croix */
  window.psyBackdrop = (x, w, h2, v) => {
    const wide = w > 900, A = wide ? .16 : .1;
    x.strokeStyle = v("--tree") || "#5b4a8a"; x.lineWidth = 1; x.globalAlpha = A;
    const R = Math.min(h2*.42, 400, w*.46), cx = wide ? w - R - Math.max(30, w*.045) : w/2, cy = wide ? h2*.54 : h2*.46, T = Math.PI*2;
    [1, .78, .52, .26].forEach(k => { x.beginPath(); x.arc(cx, cy, R*k, 0, T); x.stroke(); });
    for(let i = 0; i < 8; i++){ const a = i/8*T; x.beginPath(); x.moveTo(cx + Math.cos(a)*R*.26, cy + Math.sin(a)*R*.26); x.lineTo(cx + Math.cos(a)*R, cy + Math.sin(a)*R); x.stroke(); }
    for(let i = 0; i < 8; i++){ const a = (i + .5)/8*T, px = cx + Math.cos(a)*R*.65, py = cy + Math.sin(a)*R*.65; x.beginPath(); x.arc(px, py, R*.13, 0, T); x.stroke(); }
    x.globalAlpha = 1;
  };
  window.PSY_APP = {enter, leave, view, go, state:() => st, active:() => on, _:{D, K, HIST, LECS, TOOLR, save, st:() => st, toast, go}};
})();
