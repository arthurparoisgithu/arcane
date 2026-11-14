/* ===== Arcanes · Astrologie : l'Observatoire, refondu =====
   Quatre ateliers animés, dans la page, pour comprendre le ciel en le manipulant :
   Le point de vue (astro-pointdevue.js), Les rétrogradations, Les aspects, La Lune.
   ArcanesObs.mount(slot) installe les onglets. L'ancien Observatoire reste accessible en plein écran. */
(() => {
  const A = () => window.Astronomy, C = () => typeof ASTRO_CALC !== "undefined" ? ASTRO_CALC : window.ASTRO_CALC, D = () => typeof ASTRO_DATA !== "undefined" ? ASTRO_DATA : window.ASTRO_DATA;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const rad = Math.PI/180, DAY = 864e5, norm = x => ((x % 360) + 360) % 360;
  const reduce = () => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } };
  const fmt = (d, o) => d.toLocaleDateString("fr-FR", o || {day:"numeric", month:"long", year:"numeric"});
  const PLN = id => D().PLANETS.find(p => p.id === id);
  const HEX = {mercure:"#c9b06a", venus:"#74c494", mars:"#e8694c", jupiter:"#86aeea", saturne:"#aa9fdc", terre:"#5aa7e0", soleil:"#f0c04e", lune:"#d9dde8"};
  const glT = id => `${PLN(id).gl}${D().T || ""}`;
  const loops = new Set();
  const loop = (fn, host) => { let raf = 0, last = 0, on = true; const f = ts => { if(!on) return; if(host && !host.isConnected) return stop(); raf = requestAnimationFrame(f); const dt = Math.min(.05, (ts - (last || ts))/1000); last = ts; fn(dt); }; raf = requestAnimationFrame(f); const stop = () => { on = false; cancelAnimationFrame(raf); loops.delete(stop); }; loops.add(stop); return stop; };

  /* ================================================================
     LES RÉTROGRADATIONS : pourquoi une planète semble reculer
     ================================================================ */
  function retro(root){
    const IDS = ["mercure","venus","mars","jupiter","saturne"], RR = {mercure:34, venus:52, terre:74, mars:100, jupiter:124, saturne:144}, RZ = 160, cx = 180, cy = 172;
    const BODY = {mercure:"Mercury", venus:"Venus", mars:"Mars", jupiter:"Jupiter", saturne:"Saturn"};
    let id = "mars", off = 0, play = false, stop = null, S = null; const t0 = Date.now();
    const helio = (b, d) => { try{ return A().EclipticLongitude(A().Body[BODY[b]], d); }catch(e){ return 0; } };
    function series(){ const out = []; let prev = null, acc = 0;
      for(let d = -240; d <= 620; d += 2){ const dt = new Date(t0 + d*DAY), l = C().lonOf(id, dt); if(prev != null){ let dl = l - prev; if(dl > 180) dl -= 360; if(dl < -180) dl += 360; acc += dl; } prev = l; out.push({d, l, u:acc}); }
      out.forEach((p, i) => { p.r = i > 0 && p.u < out[i - 1].u; }); if(out[1]) out[0].r = out[1].r;
      const per = []; let st = null; out.forEach(p => { if(p.r && st == null) st = p.d; if(!p.r && st != null){ per.push([st, p.d]); st = null; } }); if(st != null) per.push([st, 620]);
      return {pts:out, per}; }
    root.innerHTML = `<div class="ob-grid"><div class="ob-stage"><svg class="ob-svg" viewBox="0 0 360 344" role="img" aria-label="Le Soleil, la Terre et la planète vus du dessus">
          <circle class="ob-z" cx="${cx}" cy="${cy}" r="${RZ}"/>${D().SIGNS.map((s, i) => { const a = (i*30 + 15)*rad, b = i*30*rad; return `<line class="ob-zt" x1="${cx + Math.cos(b)*(RZ - 5)}" y1="${cy - Math.sin(b)*(RZ - 5)}" x2="${cx + Math.cos(b)*(RZ + 5)}" y2="${cy - Math.sin(b)*(RZ + 5)}"/><text class="ob-zg" x="${cx + Math.cos(a)*(RZ - 13)}" y="${cy - Math.sin(a)*(RZ - 13) + 4}">${s.gl}${D().T || ""}</text>`; }).join("")}
          <circle class="ob-orb" cx="${cx}" cy="${cy}" r="${RR.terre}"/><circle class="ob-orb p" data-orb cx="${cx}" cy="${cy}" r="100"/>
          <line class="ob-sight" data-sight/><circle class="ob-sun" cx="${cx}" cy="${cy}" r="9"/>
          <circle class="ob-earth" data-earth r="6"/><circle class="ob-pl" data-pl r="6"/><g data-mark><circle class="ob-mark" r="7"/><text class="ob-mg" y="4.500" data-mg></text></g>
        </svg>
        <svg class="ob-strip" viewBox="0 0 360 86" role="img" aria-label="La position de la planète dans le zodiaque au fil des mois"><path class="ob-s-l" data-sl/><path class="ob-s-r" data-sr/><line class="ob-s-c" data-sc y1="4" y2="82"/><text class="ob-s-t" x="4" y="12">Sa position dans le zodiaque, mois après mois</text></svg></div>
      <div class="ob-side">
        <div class="ob-chips" role="group" aria-label="Choisir une planète">${IDS.map(k => `<button type="button" class="chip small" data-rp="${k}" style="--pc:${HEX[k]}">${PLN(k).court}</button>`).join("")}</div>
        <h3 data-rt></h3><p class="ob-p" data-rx></p><p class="help" data-rn></p>
        <div class="ob-ctl"><button type="button" class="btn small" data-rplay>Lancer le temps</button><input type="range" min="-240" max="620" step="2" value="0" aria-label="Avancer ou reculer dans le temps"><span data-rd></span></div>
        <p class="help">Les planètes ne reculent jamais. C'est un effet de perspective : quand la Terre double une planète plus lente, ou se fait doubler par une plus rapide, celle-ci semble repartir en arrière sur le fond du ciel. L'échelle des orbites est simplifiée.</p>
      </div></div>`;
    const el = k => q1(`[data-${k}]`, root), rng = q1("input[type=range]", root);
    function paint(){
      const d = new Date(t0 + off*DAY), le = norm(C().lonOf("soleil", d) + 180), lp = helio(id, d), R = RR[id];
      const E = [cx + Math.cos(le*rad)*RR.terre, cy - Math.sin(le*rad)*RR.terre], P = [cx + Math.cos(lp*rad)*R, cy - Math.sin(lp*rad)*R];
      const dx = P[0] - E[0], dy = P[1] - E[1], n = Math.hypot(dx, dy) || 1, ux = dx/n, uy = dy/n, ex = E[0] - cx, ey = E[1] - cy, b = ex*ux + ey*uy, t = -b + Math.sqrt(Math.max(0, b*b - (ex*ex + ey*ey - RZ*RZ))), Mk = [E[0] + ux*t, E[1] + uy*t];
      el("earth").setAttribute("cx", E[0]); el("earth").setAttribute("cy", E[1]); el("pl").setAttribute("cx", P[0]); el("pl").setAttribute("cy", P[1]);
      const sg = el("sight"); sg.setAttribute("x1", E[0]); sg.setAttribute("y1", E[1]); sg.setAttribute("x2", Mk[0]); sg.setAttribute("y2", Mk[1]);
      el("mark").setAttribute("transform", `translate(${Mk[0].toFixed(1)} ${Mk[1].toFixed(1)})`);
      const pt = S.pts[Math.max(0, Math.min(S.pts.length - 1, Math.round((off + 240)/2)))], isR = pt.r, nom = PLN(id).court, si = Math.floor(norm(pt.l)/30);
      root.classList.toggle("is-retro", isR);
      el("rt").textContent = isR ? `${nom} semble reculer` : `${nom} avance`;
      el("rx").textContent = `${isR ? "Rétrograde" : "En marche directe"} en ${D().SIGNS[si].nom}, à ${Math.floor(norm(pt.l) % 30)}°. ${["mercure","venus"].includes(id) ? `Plus rapide que nous, ${nom} ${isR ? "est en train de nous doubler par l'intérieur" : "file devant nous sur son orbite"}.` : `Plus lente que nous, ${nom} ${isR ? "est en train de se faire doubler par la Terre" : "avance, et nous aussi"}.`}`;
      const nx = S.per.find(p => p[1] > off), fd = x => fmt(new Date(t0 + x*DAY), {day:"numeric", month:"long", year:"numeric"});
      el("rn").textContent = nx ? (nx[0] <= off ? `Cette rétrogradation dure jusqu'au ${fd(nx[1])}.` : `Prochaine rétrogradation : du ${fd(nx[0])} au ${fd(nx[1])}.`) : "";
      el("rd").textContent = fmt(d, {day:"numeric", month:"short", year:"numeric"}); el("sc").setAttribute("x1", 4 + (off + 240)/860*352); el("sc").setAttribute("x2", 4 + (off + 240)/860*352);
    }
    function setPl(k){ id = k; S = series(); qa("[data-rp]", root).forEach(b => b.classList.toggle("on", b.dataset.rp === k));
      el("orb").setAttribute("r", RR[k]); el("pl").style.fill = HEX[k]; el("mg").textContent = glT(k); root.style.setProperty("--pc", HEX[k]);
      const us = S.pts.map(p => p.u), mn = Math.min(...us), mx = Math.max(...us), X = p => 4 + (p.d + 240)/860*352, Y = p => 78 - (p.u - mn)/((mx - mn) || 1)*56;
      let l = "", r = ""; S.pts.forEach((p, i) => { const seg = (i ? "L" : "M") + X(p).toFixed(1) + " " + Y(p).toFixed(1); l += seg; if(p.r) r += (i && S.pts[i - 1].r ? "L" : "M") + X(p).toFixed(1) + " " + Y(p).toFixed(1); });
      el("sl").setAttribute("d", l); el("sr").setAttribute("d", r); paint(); }
    qa("[data-rp]", root).forEach(b => b.onclick = () => setPl(b.dataset.rp));
    rng.oninput = () => { off = +rng.value; paint(); };
    const pb = el("rplay"); pb.onclick = () => { play = !play; pb.textContent = play ? "Arrêter le temps" : "Lancer le temps"; if(play){ stop = loop(dt => { off += dt*(id === "mercure" ? 22 : id === "venus" ? 34 : 46); if(off > 620) off = -240; rng.value = off; paint(); }, root); } else if(stop) stop(); };
    setPl("mars");
  }

  /* ================================================================
     LES ASPECTS : les angles qui font parler deux planètes
     ================================================================ */
  function aspects(root){
    const AS = D().ASPECTS.filter(a => [0, 60, 90, 120, 180].includes(a.ang)), R = 128, cx = 160, cy = 160, IDS = ["soleil","lune","mercure","venus","mars","jupiter","saturne"];
    let ang = 120, tw = null, noms = null;
    const now = new Date(), L = Object.fromEntries(IDS.map(i => [i, C().lonOf(i, now)])), ciel = [];
    IDS.forEach((a, i) => IDS.slice(i + 1).forEach(b => { let d = Math.abs(L[a] - L[b]); if(d > 180) d = 360 - d; AS.forEach(x => { if(Math.abs(d - x.ang) <= 5) ciel.push({a, b, x, d, e:Math.abs(d - x.ang)}); }); }));
    ciel.sort((p, q) => p.e - q.e);
    root.innerHTML = `<div class="ob-grid"><div class="ob-stage"><svg class="ob-svg ob-asp" viewBox="0 0 320 320" role="img" aria-label="Deux planètes sur le cercle du zodiaque">
          <circle class="ob-z" cx="${cx}" cy="${cy}" r="${R}"/>${Array.from({length:12}, (z, i) => { const a = i*30*rad; return `<line class="ob-zt" x1="${cx + Math.cos(a)*(R - 6)}" y1="${cy - Math.sin(a)*(R - 6)}" x2="${cx + Math.cos(a)*(R + 6)}" y2="${cy - Math.sin(a)*(R + 6)}"/>`; }).join("")}
          <path class="ob-poly" data-poly/><path class="ob-arc" data-arc/><line class="ob-ray" data-la x1="${cx}" y1="${cy}"/><line class="ob-ray" data-lb x1="${cx}" y1="${cy}"/>
          <text class="ob-deg" x="${cx}" y="${cy + 46}" data-deg></text>
          <g data-pa><circle class="ob-pt a" r="15"/><text class="ob-ptt" y="5.500" data-ga>A</text></g>
          <g data-pb class="ob-drag" role="slider" tabindex="0" aria-label="Deuxième planète : fais-la tourner" aria-valuemin="0" aria-valuemax="180"><circle class="ob-hit" r="30"/><circle class="ob-pt b" r="15"/><text class="ob-ptt" y="5.500" data-gb>B</text></g>
        </svg></div>
      <div class="ob-side">
        <div class="ob-chips" role="group" aria-label="Aller à un aspect">${AS.map(a => `<button type="button" class="chip small" data-asp="${a.ang}">${a.nom} · ${a.ang}°</button>`).join("")}</div>
        <h3 data-at></h3><p class="ob-p" data-ax></p>
        ${ciel.length ? `<p class="ob-lab">Dans le ciel en ce moment</p><div class="ob-chips">${ciel.slice(0, 6).map((c, i) => `<button type="button" class="chip small" data-ciel="${i}"><span class="ag">${glT(c.a)}</span> ${c.x.nom.toLowerCase()} <span class="ag">${glT(c.b)}</span></button>`).join("")}</div>` : ""}
        <p class="help">Fais tourner la seconde planète avec le doigt. Un aspect est un angle : quand deux planètes sont séparées d'un sixième, d'un quart, d'un tiers ou de la moitié du cercle, la tradition dit qu'elles se « regardent ». Le cercle se divise alors en hexagone, en carré, en triangle ou en deux.</p>
      </div></div>`;
    const el = k => q1(`[data-${k}]`, root), P = a => [cx + Math.cos(a*rad)*R, cy - Math.sin(a*rad)*R], svg = q1("svg", root);
    function paint(){
      const a0 = 180, b0 = a0 - ang, pa = P(a0), pb = P(b0), hit = AS.find(x => Math.abs(ang - x.ang) <= 6);
      el("pa").setAttribute("transform", `translate(${pa[0]} ${pa[1]})`); el("pb").setAttribute("transform", `translate(${pb[0].toFixed(1)} ${pb[1].toFixed(1)})`); el("pb").setAttribute("aria-valuenow", Math.round(ang));
      [["la", pa], ["lb", pb]].forEach(([k, p]) => { el(k).setAttribute("x2", p[0]); el(k).setAttribute("y2", p[1]); });
      const r2 = 34, s = [cx + Math.cos(a0*rad)*r2, cy - Math.sin(a0*rad)*r2], e = [cx + Math.cos(b0*rad)*r2, cy - Math.sin(b0*rad)*r2];
      el("arc").setAttribute("d", `M${s[0]} ${s[1]}A${r2} ${r2} 0 0 1 ${e[0].toFixed(1)} ${e[1].toFixed(1)}`);
      el("deg").textContent = Math.round(ang) + "°";
      root.dataset.asp = hit ? hit.cls : ""; let d = "";
      if(hit && hit.ang){ const n = 360/hit.ang; for(let i = 0; i < n; i++){ const p = P(a0 - i*hit.ang); d += (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); } d += n > 2 ? "Z" : ""; }
      el("poly").setAttribute("d", d);
      el("at").textContent = hit ? `${hit.nom}${noms ? ` : ${noms}` : ""}` : "Pas d'aspect";
      el("ax").textContent = hit ? `${Math.round(ang)}° : ${hit.sens}.` : "Entre deux aspects, les planètes ne se regardent pas. Continue de tourner.";
      qa("[data-asp]", root).forEach(b => b.classList.toggle("on", !!hit && +b.dataset.asp === hit.ang));
    }
    function go(to, nm){ noms = nm || null; if(tw) tw(); if(reduce()){ ang = to; return paint(); } const from = ang, t0 = performance.now(); let on = true; tw = () => { on = false; };
      const f = now2 => { if(!on) return; const u = Math.min(1, (now2 - t0)/600), k = u*u*(3 - 2*u); ang = from + (to - from)*k; paint(); if(u < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }
    const fromEvt = e => { const m = svg.getScreenCTM(); if(!m) return; const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); let a = Math.atan2(-(p.y - cy), p.x - cx)/rad; let d = norm(180 - a); if(d > 180) d = 360 - d; const sn = AS.find(x => Math.abs(d - x.ang) <= 2.5); ang = sn ? sn.ang : d; noms = null; paint(); };
    let drag = false; const pbEl = el("pb");
    pbEl.addEventListener("pointerdown", e => { drag = true; if(tw) tw(); try{ pbEl.setPointerCapture(e.pointerId); }catch(x){} e.preventDefault(); });
    pbEl.addEventListener("pointermove", e => { if(drag) fromEvt(e); }); ["pointerup","pointercancel"].forEach(n => pbEl.addEventListener(n, () => { drag = false; }));
    pbEl.addEventListener("keydown", e => { if(e.key === "ArrowLeft" || e.key === "ArrowDown"){ ang = Math.max(0, ang - 3); noms = null; paint(); e.preventDefault(); } if(e.key === "ArrowRight" || e.key === "ArrowUp"){ ang = Math.min(180, ang + 3); noms = null; paint(); e.preventDefault(); } });
    qa("[data-asp]", root).forEach(b => b.onclick = () => go(+b.dataset.asp));
    qa("[data-ciel]", root).forEach(b => b.onclick = () => { const c = ciel[+b.dataset.ciel]; el("ga").textContent = glT(c.a); el("gb").textContent = glT(c.b); go(c.d, `${PLN(c.a).court} et ${PLN(c.b).court}, aujourd'hui`); });
    paint();
  }

  /* ================================================================
     LA LUNE : pourquoi elle change de forme
     ================================================================ */
  function lune(root){
    const NOMS = ["Nouvelle lune","Premier croissant","Premier quartier","Gibbeuse croissante","Pleine lune","Gibbeuse décroissante","Dernier quartier","Dernier croissant"];
    const DIT = ["Elle est entre nous et le Soleil : on ne voit que sa face sombre.","Un mince croissant, le soir, à l'ouest.","On la voit de côté : une moitié éclairée. Elle a fait un quart de son tour.","Presque pleine, elle se lève dans l'après-midi.","Elle est à l'opposé du Soleil : on voit toute sa face éclairée.","Elle commence à décroître et se lève de plus en plus tard.","L'autre moitié, visible en fin de nuit.","Un mince croissant, à l'aube, à l'est."];
    let off = 0, play = false, stop = null; const t0 = Date.now(), cx = 130, cy = 120, R = 70, bx = 290, by = 120, BR = 46;
    root.innerHTML = `<div class="ob-grid"><div class="ob-stage"><svg class="ob-svg ob-moon" viewBox="0 0 360 240" role="img" aria-label="La Terre, la Lune sur son orbite, et la Lune vue de la Terre">
          ${[60, 95, 130, 165, 200].map(y => `<path class="ob-rayl" d="M4 ${y}h34m-8-4l8 4-8 4"/>`).join("")}<text class="ob-s-t" x="4" y="24">Le Soleil est à gauche</text>
          <circle class="ob-orb" cx="${cx}" cy="${cy}" r="${R}"/><circle class="ob-earth" cx="${cx}" cy="${cy}" r="13"/>
          <line class="ob-sight" data-ls x1="${cx}" y1="${cy}"/>
          <g data-mo><circle class="ob-m-d" r="11"/><path class="ob-m-l" d="M0-11A11 11 0 0 0 0 11Z"/></g>
          <circle class="ob-big-d" cx="${bx}" cy="${by}" r="${BR}"/><path class="ob-big-l" data-big/><circle class="ob-big-o" cx="${bx}" cy="${by}" r="${BR}"/>
          <text class="ob-s-t c" x="${bx}" y="${by + BR + 22}">Vue de la Terre</text></svg></div>
      <div class="ob-side"><h3 data-lt></h3><p class="ob-p" data-lx></p><p class="help" data-ln></p>
        <div class="ob-ctl"><button type="button" class="btn small" data-lplay>Lancer le mois</button><input type="range" min="-15" max="15" step=".25" value="0" aria-label="Avancer ou reculer de quinze jours"><span data-ld></span></div>
        <p class="help">La Lune est toujours à moitié éclairée, du côté du Soleil. Ce qui change en un mois, c'est l'angle sous lequel nous la voyons. La vue de droite est celle de l'hémisphère nord.</p></div></div>`;
    const el = k => q1(`[data-${k}]`, root), rng = q1("input[type=range]", root);
    function paint(){
      const d = new Date(t0 + off*DAY), e = norm(A().MoonPhase(d)), er = e*rad, mp = [cx - Math.cos(er)*R, cy + Math.sin(er)*R];
      el("mo").setAttribute("transform", `translate(${mp[0].toFixed(1)} ${mp[1].toFixed(1)})`); el("ls").setAttribute("x2", mp[0]); el("ls").setAttribute("y2", mp[1]);
      const wax = e < 180, rx = (BR*Math.abs(Math.cos(er))).toFixed(1), sw1 = wax ? 1 : 0, sw2 = wax ? (e < 90 ? 0 : 1) : (e < 270 ? 0 : 1);
      el("big").setAttribute("d", `M${bx} ${by - BR}A${BR} ${BR} 0 0 ${sw1} ${bx} ${by + BR}A${rx} ${BR} 0 0 ${sw2} ${bx} ${by - BR}Z`);
      const i = Math.floor(norm(e + 22.5)/45) % 8, ill = Math.round((1 - Math.cos(er))/2*100);
      el("lt").textContent = NOMS[i]; el("lx").textContent = `Éclairée à ${ill} %. ${DIT[i]}`; el("ld").textContent = fmt(d, {weekday:"short", day:"numeric", month:"short"});
      try{ const nl = A().SearchMoonPhase(0, d, 32), pl = A().SearchMoonPhase(180, d, 32); el("ln").textContent = `Nouvelle lune le ${fmt(nl.date, {day:"numeric", month:"long"})}, pleine lune le ${fmt(pl.date, {day:"numeric", month:"long"})}.`; }catch(x){}
    }
    rng.oninput = () => { off = +rng.value; paint(); };
    const pb = el("lplay"); pb.onclick = () => { play = !play; pb.textContent = play ? "Arrêter" : "Lancer le mois"; if(play){ stop = loop(dt => { off += dt*3.2; if(off > 15) off = -15; rng.value = off; paint(); }, root); } else if(stop) stop(); };
    paint();
  }

  /* ================================================================
     LES ONGLETS
     ================================================================ */
  const TABS = [["pv","Le point de vue"],["retro","Les rétrogradations"],["asp","Les aspects"],["lune","La Lune"]];
  function mount(slot){
    if(!slot || !A() || !C()) return;
    let cur = "pv"; const done = {};
    slot.innerHTML = `<section class="ob" aria-label="L'Observatoire"><div class="subtabs ob-tabs" role="tablist">${TABS.map(([k, n]) => `<button type="button" role="tab" class="subtab${k === cur ? " on" : ""}" data-obtab="${k}" aria-selected="${k === cur}">${n}</button>`).join("")}</div>
      ${TABS.map(([k]) => `<div class="ob-pane" data-obpane="${k}"${k === cur ? "" : " hidden"}></div>`).join("")}</section>`;
    const show = k => { cur = k; loops.forEach(s => s());
      qa("[data-obtab]", slot).forEach(b => { b.classList.toggle("on", b.dataset.obtab === k); b.setAttribute("aria-selected", b.dataset.obtab === k); });
      qa("[data-obpane]", slot).forEach(p => p.hidden = p.dataset.obpane !== k);
      const pane = q1(`[data-obpane="${k}"]`, slot);
      if(k === "pv"){ if(!done.pv && window.ArcanesPV){ try{ window.ArcanesPV.mount(pane); done.pv = 1; }catch(e){} } return; }
      try{ (k === "retro" ? retro : k === "asp" ? aspects : lune)(pane); }catch(e){ pane.innerHTML = `<p class="help">Cet atelier n'a pas pu se charger.</p>`; console.warn("observatoire", e); } };
    qa("[data-obtab]", slot).forEach(b => b.onclick = () => show(b.dataset.obtab));
    show(cur);
  }
  window.ArcanesObs = {mount};
})();
