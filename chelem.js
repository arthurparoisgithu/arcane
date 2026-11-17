/* ===== Arcanes · Le grand chelem : les trois petits jeux =====
   Chargé à la demande par chemin.js. Un jeu par art ; l'alchimie (Le Grand Œuvre) et Psyché (La descente)
   ont le leur dans leur univers. Ici : L'ordre des lames (tarot), La roue du zodiaque (astrologie), Le carré de Saturne (magie).
   Résultats dans localStorage « arcanes.chelem.v1 ». ArcanesChelem = {JEUX, play(id, host, done)}. */
(() => {
  const KEY = "arcanes.chelem.v1";
  const read = () => { try{ const v = JSON.parse(localStorage.getItem(KEY) || "{}"); return v && typeof v === "object" ? v : {}; }catch(e){ return {}; } };
  const write = v => { try{ localStorage.setItem(KEY, JSON.stringify(v)); }catch(e){} };
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const shuffle = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const ROM = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];
  function gagne(id, sec){ const v = read(), o = v[id] || {n:0, best:null}; o.n++; o.last = Date.now(); if(o.best == null || sec < o.best) o.best = Math.round(sec); v[id] = o; write(v);
    try{ window.dispatchEvent(new CustomEvent("arcanes:jeu", {detail:{art:id}})); }catch(e){} return o; }
  function timer(el){ const t0 = performance.now(); let pen = 0, id = setInterval(() => { if(!el.isConnected) return clearInterval(id); el.textContent = fmt(sec()); }, 250);
    const sec = () => (performance.now() - t0)/1000 + pen; return {sec, pen:s => { pen += s; }, stop:() => clearInterval(id)}; }
  const fin = (host, titre, txt, o, again, done) => {
    host.querySelector(".chg-play").innerHTML = `<div class="chg-win"><p class="eyebrow">Gagné en ${fmt(o.lastSec)}</p><h3>${h(titre)}</h3><p>${txt}</p>
      <p class="help">${o.n} partie${o.n > 1 ? "s" : ""} gagnée${o.n > 1 ? "s" : ""} · meilleur temps ${fmt(o.best)}</p>
      <div class="chg-acts"><button type="button" class="btn small" data-chagain>Rejouer</button><button type="button" class="btn ghost small" data-chback>Le grand chelem</button></div></div>`;
    host.querySelector("[data-chagain]").onclick = again; host.querySelector("[data-chback]").onclick = done; };

  /* ---------- le tarot : L'ordre des lames ---------- */
  function tarot(host, done){
    const C = typeof CARDS !== "undefined" ? CARDS.filter(c => c.n >= 0 && c.n <= 21).sort((a, b) => a.n - b.n) : [];
    if(C.length < 22){ host.innerHTML = `<p class="help">Les lames ne sont pas disponibles.</p>`; return; }
    host.innerHTML = `<div class="chg-top"><p>Touche les vingt-deux atouts <b>dans l'ordre</b>, du Mat (0) au Monde (XXI). Une erreur coûte trois secondes.</p><span class="chg-t" aria-live="off">0:00</span></div><p class="chg-next" aria-live="polite"></p><div class="chg-play"><div class="chg-cards"></div></div>`;
    let k = 0; const T = timer(host.querySelector(".chg-t")), grid = host.querySelector(".chg-cards"), nx = host.querySelector(".chg-next");
    const say = () => { nx.innerHTML = k < 22 ? `Cherche : <b>${ROM[k]} · ${h(C[k].nom)}</b>` : ""; };
    grid.innerHTML = shuffle(C).map(c => `<button type="button" class="chg-card" data-n="${c.n}" aria-label="${h(c.nom)}"><img src="lames/${String(c.n).padStart(2, "0")}.webp" alt="" loading="lazy"></button>`).join("");
    say();
    grid.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { if(b.disabled) return;
      if(+b.dataset.n === C[k].n){ b.disabled = true; b.classList.add("ok"); b.insertAdjacentHTML("beforeend", `<span>${ROM[k]}</span>`); k++; say();
        if(k === 22){ T.stop(); const s = T.sec(), o = gagne("tarot", s); o.lastSec = Math.round(s); fin(host, "L'ordre des lames", "Les vingt-deux atouts sont à leur place. Cet ordre, fixé au XVIe siècle à Marseille, n'était pas le même à Milan ni à Ferrare : chaque ville avait le sien.", o, () => tarot(host, done), done); } }
      else { T.pen(3); b.classList.remove("ko"); void b.offsetWidth; b.classList.add("ko"); } });
  }

  /* ---------- l'astrologie : La roue du zodiaque ---------- */
  const SIGNES = [["♈","Bélier","feu"],["♉","Taureau","terre"],["♊","Gémeaux","air"],["♋","Cancer","eau"],["♌","Lion","feu"],["♍","Vierge","terre"],["♎","Balance","air"],["♏","Scorpion","eau"],["♐","Sagittaire","feu"],["♑","Capricorne","terre"],["♒","Verseau","air"],["♓","Poissons","eau"]];
  function astro(host, done){
    host.innerHTML = `<div class="chg-top"><p>Place les douze signes sur la roue, <b>dans l'ordre</b>, en partant du Bélier, le point du printemps. Une erreur coûte trois secondes.</p><span class="chg-t">0:00</span></div><p class="chg-next" aria-live="polite"></p>
      <div class="chg-play"><div class="chg-wheel"><svg viewBox="-110 -110 220 220" aria-hidden="true"><circle r="104"/><circle r="70"/>${SIGNES.map((s, i) => { const a = (180 - i*30)*Math.PI/180; return `<path d="M${(70*Math.cos(a)).toFixed(1)} ${(-70*Math.sin(a)).toFixed(1)}L${(104*Math.cos(a)).toFixed(1)} ${(-104*Math.sin(a)).toFixed(1)}"/>`; }).join("")}<g class="chg-placed"></g></svg></div>
      <div class="chg-signs">${shuffle(SIGNES.map((s, i) => [...s, i])).map(s => `<button type="button" class="chg-sign el-${s[2]}" data-i="${s[3]}" aria-label="${s[1]}"><b>${s[0]}︎</b><small>${s[1]}</small></button>`).join("")}</div></div>`;
    let k = 0; const T = timer(host.querySelector(".chg-t")), nx = host.querySelector(".chg-next"), g = host.querySelector(".chg-placed");
    const say = () => { nx.innerHTML = k < 12 ? `Signe ${k + 1} sur 12` : ""; }; say();
    host.querySelectorAll("[data-i]").forEach(b => b.onclick = () => { if(b.disabled) return;
      if(+b.dataset.i === k){ b.disabled = true; b.classList.add("ok"); const a = (180 - k*30 - 15)*Math.PI/180, s = SIGNES[k];
        g.insertAdjacentHTML("beforeend", `<text class="el-${s[2]}" x="${(87*Math.cos(a)).toFixed(1)}" y="${(-87*Math.sin(a) + 6).toFixed(1)}">${s[0]}︎</text>`); k++; say();
        if(k === 12){ T.stop(); const sec = T.sec(), o = gagne("astro", sec); o.lastSec = Math.round(sec); fin(host, "La roue du zodiaque", "Feu, terre, air, eau : les éléments tournent trois fois autour de la roue. Le Bélier ouvre l'année au printemps, comme l'année babylonienne.", o, () => astro(host, done), done); } }
      else { T.pen(3); b.classList.remove("ko"); void b.offsetWidth; b.classList.add("ko"); } });
  }

  /* ---------- la magie : Le carré de Saturne ---------- */
  function magie(host, done){
    host.innerHTML = `<div class="chg-top"><p>Le carré de Saturne, le plus petit des carrés magiques : place les nombres de 1 à 9 pour que <b>chaque ligne, chaque colonne et les deux diagonales</b> fassent 15. Touche une case, puis un nombre.</p><span class="chg-t">0:00</span></div>
      <div class="chg-play"><div class="chg-sq" role="grid" aria-label="Le carré de 3 sur 3">${Array.from({length:9}, (_, i) => `<button type="button" class="chg-cell" data-c="${i}" aria-label="Case ${i + 1}"></button>`).join("")}</div>
      <div class="chg-pad">${[1,2,3,4,5,6,7,8,9].map(n => `<button type="button" data-v="${n}">${n}</button>`).join("")}<button type="button" data-v="0" aria-label="Effacer">⌫</button></div>
      <p class="chg-msg help" aria-live="polite">Indice : quel nombre se trouve au milieu de 1 à 9 ?</p></div>`;
    const T = timer(host.querySelector(".chg-t")), V = Array(9).fill(0); let sel = 0;
    const cells = [...host.querySelectorAll("[data-c]")], L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const draw = () => { cells.forEach((c, i) => { c.textContent = V[i] || ""; c.classList.toggle("sel", i === sel); });
      host.querySelectorAll("[data-v]").forEach(b => { const v = +b.dataset.v; b.classList.toggle("used", v > 0 && V.includes(v)); });
      const full = V.every(Boolean), ok = full && L.every(l => l.reduce((s, i) => s + V[i], 0) === 15);
      const bad = L.filter(l => l.every(i => V[i]) && l.reduce((s, i) => s + V[i], 0) !== 15);
      cells.forEach((c, i) => c.classList.toggle("bad", bad.some(l => l.includes(i))));
      if(ok){ T.stop(); const s = T.sec(), o = gagne("magie", s); o.lastSec = Math.round(s); fin(host, "Le carré de Saturne", "Quinze partout. Agrippa le donne en 1533 pour les talismans de Saturne ; les Chinois le connaissaient depuis l'Antiquité sous le nom de Lo Shu, le dessin sur la carapace d'une tortue.", o, () => magie(host, done), done); } };
    cells.forEach((c, i) => c.onclick = () => { sel = i; draw(); });
    host.querySelectorAll("[data-v]").forEach(b => b.onclick = () => { const v = +b.dataset.v; if(v){ const j = V.indexOf(v); if(j >= 0) V[j] = 0; } V[sel] = v; sel = V.indexOf(0) >= 0 ? (V[sel] ? V.indexOf(0) : sel) : sel; draw(); });
    draw();
  }

  const JEUX = {tarot:{t:"L'ordre des lames", f:tarot}, astro:{t:"La roue du zodiaque", f:astro}, magie:{t:"Le carré de Saturne", f:magie}};
  window.ArcanesChelem = {JEUX, read, play:(id, host, done) => { const J = JEUX[id]; if(J) J.f(host, done); }};
})();
