/* ===== Arcanes · Alchimie : les outils du laboratoire =====
   Le Grand Œuvre (conduire le feu), Mon Œuvre (pratique en quatre couleurs), La roue des métaux,
   Le carré des éléments, La table des signes, Les planches. Chaque outil s'inscrit dans EXT.tools. */
(() => {
  const A = window.ArcanesAlchimie; if(!A) return;
  const _ = A._, {D, VA, EXT, q1, qa, h, cap, nb, badge, IMG, fig, glyph, rule4, fmtD, fmtT, uid, save, gagne, toast, mountVase, phaseOf} = _;
  const st = () => _.st();
  const lerp = (a, b, t) => a + (b - a)*t, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), ease = t => t*t*(3 - 2*t);
  const ico = d => `<svg viewBox="0 0 48 48" aria-hidden="true">${d}</svg>`;
  const reg = (id, o) => { EXT.tools[id] = o; EXT.order.push(id); };

  /* ================================================================
     LE GRAND ŒUVRE : conduire le feu au soufflet, du noir au rouge
     ================================================================ */
  function jeu(root){
    const E0 = D.ETAPES, N = E0.length, NV = D.NIVEAUX, today = new Date().toISOString().slice(0, 10), DJ = D.DEFIS[Math.floor(Date.now()/864e5) % D.DEFIS.length];
    let state = "intro", i = 0, heat = .1, prog = 0, danger = 0, blow = false, elapsed = 0, breaks = 0, lock = 0, vase = null, lastMsg = "";
    let niv = Math.min(NV.length - 1, Math.max(0, st().niveau | 0)), defi = null, lost = false, wind = 0, nextEv = 8, evT = 0, evMsg = "";
    root.innerHTML = `<div class="al-game" data-state="intro">
      <div class="al-niche al-g-stage">
        <canvas class="al-vase" data-vase aria-label="Le vase sur son feu"></canvas>
        <div class="al-gauge" aria-hidden="true"><div class="al-gauge-track">${D.FEUX.map(f => `<span style="bottom:${f.de*100}%;height:${(f.a - f.de)*100}%"><em>${h(f.nom.replace(/^L[ae]s? /, ""))}</em></span>`).join("")}<i class="al-gauge-band"></i><i class="al-gauge-needle"></i></div></div>
        <p class="al-g-wind" aria-hidden="true">Courant d'air</p>
      </div>
      <div class="al-g-panel">
        <ol class="al-g-steps" aria-label="Les cinq étapes">${E0.map((e, k) => `<li data-k="${k}" style="--pc:${phaseOf(e.ph).hex};--pc2:${phaseOf(e.ph).clair}"><i></i><span>${h(phaseOf(e.ph).lat)}</span></li>`).join("")}</ol>
        <div class="al-g-info" data-info></div>
        <div class="al-g-live">
          <div class="al-g-prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Avancement de l'étape"><i></i></div>
          <p class="al-g-msg" aria-live="polite"></p>
          <button type="button" class="al-bellows" data-blow aria-label="Souffler : maintiens pour attiser le feu">
            <svg viewBox="0 0 64 40" aria-hidden="true"><g class="bl-a"><path d="M6 20L30 6h10v28H30z"/><path d="M14 16v8M21 12v16"/></g><path d="M40 16h14l6 4-6 4H40z"/><path class="bl-w" d="M61 13c2 2 2 4 0 6M61 21c2 2 2 4 0 6"/></svg>
            <span><b>Souffler</b><small>maintiens appuyé</small></span></button>
        </div>
      </div></div>`;
    const game = q1(".al-game", root), info = q1("[data-info]", root), bar = q1(".al-g-prog", root), fill = q1(".al-g-prog i", root), msg = q1(".al-g-msg", root),
      band = q1(".al-gauge-band", root), needle = q1(".al-gauge-needle", root), gauge = q1(".al-gauge", root), btn = q1("[data-blow]", root);
    vase = mountVase(root, {p:0, heat});
    const setState = s => { state = s; game.dataset.state = s; };
    const steps = () => qa(".al-g-steps li", root).forEach((li, k) => { li.classList.toggle("done", k < i || state === "fin"); li.classList.toggle("cur", k === i && state !== "fin" && state !== "intro"); });
    const say = t => { if(t !== lastMsg){ lastMsg = t; msg.textContent = t; } };
    /* l'étape telle qu'elle se joue : la zone et le refroidissement dépendent du niveau et du défi */
    const eff = k => { const e = E0[k], L = NV[niv], c = (e.de + e.a)/2, hw = (e.a - e.de)/2*L.band; return {ph:e.ph, de:c - hw, a:c + hw, dur:e.dur, cool:e.cool*L.cool*(defi && defi.id === "vif" ? 1.4 : 1), dire:e.dire, fait:e.fait}; };
    const ventF = () => Math.max(NV[niv].vent, defi && defi.id === "vent" ? 1 : 0)*(defi && defi.id === "vent" ? 2 : 1);

    function intro(){
      setState("intro"); steps(); const s = st(), fait = (s.defis || []).includes(today), g = s.grand;
      info.innerHTML = `<p class="eyebrow">Jeu · environ trois minutes</p><h1>Le Grand Œuvre</h1>${rule4}
        <p class="al-p">Tu conduis le feu, du noir au rouge : cinq couleurs, cinq chaleurs. Maintiens le soufflet pour attiser, relâche pour laisser retomber, et garde l'aiguille dans la zone claire. Trop de feu, et le vase se fêle.</p>
        <div class="al-seg al-g-niv" role="group" aria-label="Niveau">${NV.map((L, k) => `<button type="button" data-niv="${k}" aria-pressed="${k === niv}">${h(L.nom)}</button>`).join("")}</div>
        <p class="al-g-nivx" data-nivx></p>
        <button type="button" class="btn big" data-start>Allumer le feu</button>
        <div class="al-card al-g-defi${fait ? " ok" : ""}"><p class="al-src-k">Le défi du jour${fait ? " · réussi" : ""}</p><h3>${h(DJ.nom)}</h3><p class="al-p">${nb(h(DJ.x))}</p>
          <button type="button" class="btn small ghost" data-defi>${fait ? "Le refaire" : "Relever le défi"}</button></div>
        <p class="help al-left">Les alchimistes qui ne juraient que par le soufflet avaient un surnom moqueur : les « souffleurs ». Les vrais maîtres, disaient les textes, savent surtout attendre.</p>`;
      const nx = () => { const L = NV[niv], b = g.bestL && g.bestL[L.id]; q1("[data-nivx]", info).textContent = L.x + (b != null ? ` Ton meilleur temps : ${fmtT(b)}.` : ""); qa("[data-niv]", info).forEach((x, k) => x.setAttribute("aria-pressed", k === niv)); };
      qa("[data-niv]", info).forEach(x => x.onclick = () => { niv = +x.dataset.niv; s.niveau = niv; save(); nx(); }); nx();
      q1("[data-start]", info).onclick = () => start(null);
      q1("[data-defi]", info).onclick = () => start(DJ);
    }
    function start(d){ defi = d; lost = false; i = 0; heat = .1; prog = 0; danger = 0; elapsed = 0; breaks = 0; wind = 0; evT = 0; nextEv = 7 + Math.random()*5; game.dataset.defi = d ? d.id : "";
      Object.assign(vase.S, {p:0, dry:0, stone:false, crown:false, crack:0, wind:0}); stage(); }
    function stage(){
      const e = eff(i), ph = phaseOf(e.ph); prog = 0; danger = 0; setState("play"); steps();
      info.innerHTML = `<p class="eyebrow">Étape ${i + 1} sur ${N} · ${h(ph.lat)} · ${h(defi ? defi.nom : NV[niv].nom)}</p><h2>${h(ph.nom)}</h2><p class="al-g-dire">${nb(h(e.dire))}</p>`;
      band.style.bottom = e.de*100 + "%"; band.style.height = (e.a - e.de)*100 + "%"; band.style.setProperty("--pc", ph.id === "noir" ? "#8c7fa6" : ph.hex);
      fill.style.setProperty("--pc", ph.id === "noir" ? "#8c7fa6" : ph.hex); fill.style.width = "0%";
      if(window.innerWidth <= 860) try{ game.scrollIntoView({behavior:"smooth", block:"start"}); }catch(x){}
    }
    function won(){
      const e = eff(i), ph = phaseOf(e.ph), P = D.PLANCHES[ph.planche], isNew = gagne(ph.planche), last = i === N - 1;
      vase.S.p = ph.p; vase.S.wind = 0; vase.burst(ph.id); blow = false; btn.classList.remove("on"); game.classList.remove("windy");
      if(last){ vase.S.stone = true; vase.S.crown = true; vase.S.dry = .92; }
      setState("plate"); steps(); qa(".al-g-steps li", root)[i].classList.add("done");
      info.innerHTML = `<div class="al-reward"><button type="button" class="al-reward-img" data-alplanche="${ph.planche}" aria-label="Agrandir la planche"><img src="${IMG(P.img)}" alt="${h(P.t)}"></button>
          <div><p class="eyebrow">${isNew ? "Planche gagnée" : "Planche"} · ${h(P.t)}</p><h2>${h(e.fait)}</h2><p class="al-p">${nb(h(ph.texte))}</p><p class="al-reward-src">${badge(ph.st)} ${nb(h(ph.src))}</p></div></div>
        <button type="button" class="btn big" data-next>${last ? "Voir la pierre" : "Continuer : " + h(phaseOf(E0[i + 1].ph).nom.toLowerCase())}</button>`;
      q1("[data-next]", info).onclick = () => { if(last) fin(); else { i++; stage(); } };
    }
    function fin(){
      const s = st(), g = s.grand, t = Math.round(elapsed), L = NV[niv]; g.n++; g.last = Date.now(); g.felures = (g.felures || 0) + breaks;
      g.bestL = g.bestL || {}; const rec = g.bestL[L.id] == null || t < g.bestL[L.id]; if(rec) g.bestL[L.id] = t; if(g.best == null || t < g.best) g.best = t;
      const ok = defi && !lost && (defi.id !== "montre" || t < 150); s.defis = s.defis || []; if(ok && !s.defis.includes(today)) s.defis.push(today); save();
      setState("fin"); steps();
      info.innerHTML = `<p class="eyebrow">L'Œuvre est accomplie</p><h1>La pierre</h1>${rule4}
        ${defi ? `<p class="al-g-verdict ${ok ? "ok" : "ko"}">${ok ? `Défi du jour réussi : ${h(defi.nom)}.` : `Défi manqué : ${h(defi.nom)}. ${defi.id === "montre" ? "Il fallait moins de deux minutes trente." : defi.id === "fragile" ? "Le vase s'est fêlé." : ""} Tu peux le retenter.`}</p>` : ""}
        <p class="al-p">La matière est rouge, fixe, et ne craint plus le feu. Dans les textes, il ne reste qu'un geste : la « projection ». On jette un peu de pierre sur un métal fondu, et il devient or.</p>
        <p class="al-p">Personne n'y est jamais parvenu. Mais en cherchant, les alchimistes ont inventé le laboratoire.</p>
        <dl class="al-g-stats"><div><dt>Ton temps</dt><dd>${fmtT(t)}${rec && g.n > 1 ? " · record" : ""}</dd></div><div><dt>Fêlures</dt><dd>${breaks}</dd></div><div><dt>Niveau</dt><dd>${h(L.nom)}</dd></div></dl>
        <div class="al-acts"><button type="button" class="btn" data-again>Recommencer</button>${niv < NV.length - 1 && !breaks ? `<button type="button" class="btn ghost" data-up>Essayer en ${h(NV[niv + 1].nom.toLowerCase())}</button>` : ""}<button type="button" class="btn ghost" data-algo="labo:oeuvre">${s.oeuvre ? "Reprendre mon Œuvre" : "Commencer mon Œuvre"}</button><button type="button" class="btn ghost" data-algo="labo:planches">Voir les planches</button></div>
        <p class="help al-left">Le vrai Grand Œuvre, lui, se fait sur soi : c'est une lecture moderne, et c'est l'outil « Mon Œuvre ».</p>`;
      q1("[data-again]", info).onclick = () => { vase.S.stone = false; vase.S.crown = false; vase.S.dry = 0; vase.S.p = 0; intro(); };
      const up = q1("[data-up]", info); if(up) up.onclick = () => { niv++; s.niveau = niv; save(); start(null); };
    }
    vase && (vase.onFrame = dt => {
      if(state !== "play"){ const tg = state === "intro" ? .14 : state === "fin" ? .22 : heat; heat += (tg - heat)*Math.min(1, dt*.8); vase.S.heat = heat; if(vase.S.crack > 0) vase.S.crack = Math.max(0, vase.S.crack - dt*.5); needle.style.bottom = heat*100 + "%"; return; }
      const e = eff(i), ph = phaseOf(e.ph), prev = i ? phaseOf(E0[i - 1].ph).p : 0, vf = ventF();
      elapsed += dt; if(lock > 0) lock -= dt; if(evT > 0) evT -= dt;
      // les imprévus : un courant d'air qui refroidit, une bûche qui s'embrase
      if(vf > 0 && lock <= 0){ nextEv -= dt*vf;
        if(nextEv <= 0 && wind <= 0){ nextEv = 9 + Math.random()*8;
          if(NV[niv].buche && Math.random() < .35){ heat = Math.min(1, heat + .09); evMsg = "Une bûche s'embrase. Laisse retomber."; evT = 2.4; vase.burst("feu"); }
          else { wind = 2.3; evMsg = "Un courant d'air ! Souffle."; evT = 2.6; } } }
      if(wind > 0){ wind -= dt; heat -= e.cool*(.6 + heat*1.2)*dt*1.7; }
      vase.S.wind = wind > 0 ? 1 : 0; game.classList.toggle("windy", wind > 0);
      heat = clamp(heat + (blow ? .36 : 0)*dt - e.cool*(.6 + heat*1.2)*dt, 0, 1);
      const inB = heat >= e.de && heat <= e.a, hot = heat > e.a + .02;
      if(inB) prog = Math.min(1, prog + dt/e.dur);
      danger = hot ? danger + dt/1.9 : Math.max(0, danger - dt*1.3);
      if(vase.S.crack > 0) vase.S.crack = Math.max(0, vase.S.crack - dt*.35);
      if(danger >= 1){ danger = 0; breaks++; prog = Math.max(0, prog - .45); heat = Math.max(.05, e.de - .1); vase.S.crack = 1; vase.S.shake = 1; lock = 2.8; blow = false; btn.classList.remove("on"); try{ navigator.vibrate && navigator.vibrate(120); }catch(x){}
        if(defi && defi.id === "fragile" && !lost){ lost = true; toast("Défi manqué : le vase s'est fêlé. Tu peux finir l'Œuvre quand même."); } }
      vase.S.heat = heat; vase.S.shake = Math.max(vase.S.shake, danger*.55);
      vase.S.p = lerp(prev, ph.p, ease(prog)); if(ph.id === "rouge") vase.S.dry = prog*.92;
      needle.style.bottom = heat*100 + "%"; fill.style.width = prog*100 + "%"; bar.setAttribute("aria-valuenow", Math.round(prog*100));
      gauge.classList.toggle("hot", hot); gauge.classList.toggle("ok", inB);
      const blind = defi && defi.id === "oeil";
      say(lock > 0 ? "Le vase s'est fêlé. On reprend, plus doucement." : hot ? "Trop de feu ! Relâche." : evT > 0 ? evMsg : blind ? (inB ? "La matière travaille." : "Regarde les bulles et les vapeurs.") : inB ? "C'est le bon feu. Tiens-le." : heat < e.de - .09 ? "Le feu dort. Souffle." : heat < e.de ? "Presque. Encore un peu." : "Laisse retomber un peu.");
      if(prog >= 1) won();
    });
    const down = e => { if(state !== "play") return; e.preventDefault(); blow = true; btn.classList.add("on"); heat = Math.min(1, heat + .012); try{ btn.setPointerCapture(e.pointerId); }catch(x){} };
    const up = () => { blow = false; btn.classList.remove("on"); };
    btn.addEventListener("pointerdown", down); ["pointerup","pointercancel","lostpointercapture"].forEach(ev => btn.addEventListener(ev, up));
    btn.addEventListener("contextmenu", e => e.preventDefault());
    const kd = e => { if(state !== "play" || e.repeat) return; if(e.code === "Space" || e.code === "ArrowUp"){ e.preventDefault(); blow = true; btn.classList.add("on"); } };
    const ku = e => { if(e.code === "Space" || e.code === "ArrowUp") up(); };
    document.addEventListener("keydown", kd); document.addEventListener("keyup", ku); window.addEventListener("blur", up);
    intro();
    return () => { document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku); window.removeEventListener("blur", up); if(vase) vase.destroy(); };
  }
  reg("jeu", {t:"Le Grand Œuvre", genre:"Jeu · 3 min", x:"Conduis le feu au soufflet, du noir au rouge. Trois niveaux, un défi par jour, et une planche du Splendor solis à chaque couleur.",
    ico:ico(`<path d="M21 6v10c0 4-9 6-9 15a12 12 0 0 0 24 0c0-9-9-11-9-15V6"/><path d="M19 6h10"/><path d="M24 42c-3-2-3-5 0-8 3 3 3 6 0 8z" fill="currentColor" stroke="none"/><path d="M14 30c3-2 6 2 10 0s7 2 10 0"/>`), render:jeu});

  /* ================================================================
     MON ŒUVRE : transformer quelque chose de sa vie, en quatre couleurs (lecture moderne)
     ================================================================ */
  function moonNext(i){ try{ const t = window.Astronomy.SearchMoonPhase([0, 90, 180, 270][i], new Date(), 35); return t ? t.date : null; }catch(e){ return null; } }
  function oeuvre(root){
    let vase = null;
    const O = D.OEUVRE;
    function draw(celebrate){
      const s = st(), o = s.oeuvre;
      if(!o) return celebrate ? fini(celebrate) : debut();
      const ph = O[o.phase], P = phaseOf(ph.id), gs = (o.gestes && o.gestes[o.phase]) || [], nxt = O[o.phase + 1], mn = moonNext(o.phase);
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Mon Œuvre · commencée le ${fmtD(o.debut)}</p><h1>« ${h(o.sujet)} »</h1>${rule4}</header>
        <ol class="al-oe-steps">${O.map((x, k) => `<li class="${k < o.phase ? "done" : k === o.phase ? "cur" : ""}" style="--pc:${phaseOf(x.id).hex}"><i></i><b>${h(x.nom)}</b><span>${h(x.verbe)}</span></li>`).join("")}</ol>
        <div class="al-oe">
          <figure class="al-niche al-oe-niche"><canvas class="al-vase" data-vase></canvas><figcaption>${h(P.nom)} · <i>${h(P.lat)}</i></figcaption></figure>
          <section class="al-card al-oe-phase">
            <p class="eyebrow">Temps ${o.phase + 1} sur 4 ${badge("mod")}</p><h2>${h(ph.nom)} : ${h(ph.verbe.toLowerCase())}</h2>
            <p class="al-p">${nb(h(ph.intro))}</p>
            <h3>Trois gestes</h3>
            <ul class="al-checks">${ph.gestes.map((g, k) => `<li><label><input type="checkbox" data-g="${k}" ${gs[k] ? "checked" : ""}><span>${nb(h(g))}</span></label></li>`).join("")}</ul>
            <h3>La question</h3><p class="al-oe-q">${nb(h(ph.q))}</p>
            <label class="sr-only" for="al-note">Ta réponse</label><textarea id="al-note" rows="5" maxlength="2000" placeholder="Écris ici, pour toi. Quelques lignes suffisent.">${h(o.brouillon || "")}</textarea>
            <div class="al-acts"><button type="button" class="btn" data-next ${(o.brouillon || "").trim().length < 3 ? "disabled" : ""}>${nxt ? "Passer " + h(nxt.nom.toLowerCase()) : "Achever l'Œuvre"}</button></div>
            <p class="help al-left">Écris ta réponse pour passer à la suite. Rien ne presse : un rythme possible est de suivre la Lune, un temps par quartier.${mn ? ` Pour ce temps-ci : ${h(ph.lune.toLowerCase())}, le ${mn.toLocaleDateString("fr-FR", {day:"numeric", month:"long"})}.` : ""}</p>
          </section>
        </div>
        ${o.notes.length ? `<section><h2 class="al-k">Ce que tu as déjà écrit</h2>${o.notes.map(n => `<details class="al-card al-arch"><summary><span>${h(O[n.phase].nom)} : ${h(O[n.phase].verbe.toLowerCase())}</span><small>${fmtD(n.t)}</small></summary><p class="al-note-q">${nb(h(O[n.phase].q))}</p><p class="al-p">${nb(h(n.txt))}</p></details>`).join("")}</section>` : ""}
        <p class="al-oe-drop"><button type="button" class="linkbtn danger" data-drop>Abandonner cette Œuvre</button></p>`;
      vase = mountVase(root, {p:celebrate ? O[o.phase - 1].p : ph.p, heat:.3});
      if(celebrate && vase){ setTimeout(() => { vase.S.p = ph.p; vase.burst(ph.id); }, 350); }
      const ta = q1("#al-note", root), nx = q1("[data-next]", root);
      ta.oninput = () => { o.brouillon = ta.value; save(); nx.disabled = ta.value.trim().length < 3; };
      qa("[data-g]", root).forEach(c => c.onchange = () => { o.gestes = o.gestes || {}; const a = o.gestes[o.phase] || (o.gestes[o.phase] = []); a[+c.dataset.g] = c.checked; save(); });
      nx.onclick = () => { o.notes.push({phase:o.phase, txt:ta.value.trim(), t:Date.now()}); o.brouillon = "";
        if(o.phase >= 3){ const done = Object.assign({}, o, {fin:Date.now()}); delete done.brouillon; s.archives.unshift(done); s.archives = s.archives.slice(0, 40); s.oeuvre = null; save(); draw(done); }
        else { o.phase++; save(); draw(true); }
        window.scrollTo({top:0, behavior:"smooth"}); };
      const dr = q1("[data-drop]", root);
      dr.onclick = () => { if(dr.dataset.sure){ s.oeuvre = null; save(); draw(); } else { dr.dataset.sure = "1"; dr.textContent = "Confirmer l'abandon (tes notes seront effacées)"; } };
    }
    function debut(){
      const ex = ["Ma façon de remettre à plus tard", "Un projet qui n'avance pas", "Une période difficile", "Ma relation au travail", "Une habitude dont je ne veux plus"];
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Pratique ${badge("mod")}</p><h1>Mon Œuvre</h1>${rule4}
          <p class="al-lede">Choisis une chose que tu veux transformer. L'outil t'accompagne à travers les quatre couleurs du Grand Œuvre : regarder en face, clarifier, laisser mûrir, puis fixer dans le réel.</p></header>
        <div class="al-oe">
          <figure class="al-niche al-oe-niche"><canvas class="al-vase" data-vase></canvas><figcaption>La matière première</figcaption></figure>
          <form class="al-card al-oe-form">
            <label for="al-sujet">Que veux-tu transformer ?</label>
            <input id="al-sujet" type="text" maxlength="90" required placeholder="Une habitude, un projet, une période…" autocomplete="off">
            <div class="al-chips">${ex.map(e => `<button type="button" class="chip small" data-ex>${h(e)}</button>`).join("")}</div>
            <ol class="al-oe-plan">${O.map(x => `<li style="--pc:${phaseOf(x.id).hex}"><i></i><b>${h(x.nom)}</b> ${h(x.verbe.toLowerCase())}</li>`).join("")}</ol>
            <button type="submit" class="btn">Sceller le vase</button>
            <p class="help al-left">D'où vient cette pratique ? Pas des alchimistes eux-mêmes, qui travaillaient au fourneau. C'est le psychologue Carl Gustav Jung qui, au XXe siècle, a lu leurs quatre couleurs comme les étapes d'une transformation intérieure. Cet outil s'en inspire librement. Il ne remplace pas un accompagnement si tu traverses un moment vraiment difficile.</p>
          </form></div>`;
      vase = mountVase(root, {p:0, heat:.18});
      const inp = q1("#al-sujet", root);
      qa("[data-ex]", root).forEach(b => b.onclick = () => { inp.value = b.textContent; inp.focus(); });
      q1("form", root).onsubmit = e => { e.preventDefault(); const v = inp.value.trim(); if(v.length < 2) return;
        st().oeuvre = {id:uid(), sujet:v, debut:Date.now(), phase:0, gestes:{}, notes:[], brouillon:""}; save();
        if(gagne("union")) toast("Une planche gagnée : Le roi et la reine."); draw(); window.scrollTo({top:0, behavior:"smooth"}); };
    }
    function fini(a){
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">L'Œuvre est accomplie · ${fmtD(a.debut)} → ${fmtD(a.fin)}</p><h1>« ${h(a.sujet)} »</h1>${rule4}
          <p class="al-lede">Tu es allé du noir au rouge. Relis ce que tu as écrit à chaque temps : c'est le chemin parcouru.</p></header>
        <div class="al-oe"><figure class="al-niche al-oe-niche"><canvas class="al-vase" data-vase></canvas><figcaption>La pierre</figcaption></figure>
          <section class="al-oe-recap">${a.notes.map(n => `<div class="al-card al-note"><p class="al-note-k" style="--pc:${phaseOf(O[n.phase].id).hex}">${h(O[n.phase].nom)}</p><p class="al-note-q">${nb(h(O[n.phase].q))}</p><p class="al-p">${nb(h(n.txt))}</p></div>`).join("")}
            <div class="al-acts"><button type="button" class="btn" data-new>Commencer une autre Œuvre</button><button type="button" class="btn ghost" data-algo="carnet">Voir mon carnet</button></div></section></div>`;
      vase = mountVase(root, {p:4, heat:.34}); if(vase) setTimeout(() => { Object.assign(vase.S, {p:5, dry:.92, stone:true, crown:true}); vase.burst("rouge"); }, 400);
      q1("[data-new]", root).onclick = () => draw();
    }
    draw();
    return () => { if(vase) vase.destroy(); };
  }
  reg("oeuvre", {t:"Mon Œuvre", genre:"Pratique", x:"Transforme quelque chose de ta vie en quatre temps : au noir, au blanc, au jaune, au rouge. Avec un journal.",
    ico:ico(`<circle cx="12" cy="24" r="6" fill="#17141c"/><circle cx="24" cy="12" r="6" fill="#e9eef0"/><circle cx="36" cy="24" r="6" fill="#e2b23c"/><circle cx="24" cy="36" r="6" fill="#c2311f"/><path d="M16.5 19.5l3-3M28.5 16.5l3 3M31.5 28.5l-3 3M19.500 31.5l-3-3"/>`), render:oeuvre});

  /* ================================================================
     LA ROUE DES MÉTAUX
     ================================================================ */
  function metaux(root, arg){
    const M = D.METAUX, n = M.length, step = 360/n, today = _.metalDuJour(), natal = _.metalNatal();
    let sel = Math.max(0, M.findIndex(m => m.id === (arg || today.id))), rot = -sel*step;
    const paths = (id, w) => (D.G[id] || []).map(d => `<path d="${d}" stroke-width="${w}"/>`).join("");
    root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Sept métaux, sept planètes, sept jours</p><h1>La roue des métaux</h1>${rule4}
        <p class="al-lede">Du plomb à l'or, l'échelle que la matière doit gravir. Touche un métal pour le faire monter en haut de la roue.</p>
        <div class="al-chips"><button type="button" class="chip small" data-pick="${today.id}">Métal du jour : ${h(today.nom.replace(/^L[e'] ?/, "").replace(/^l'/, ""))}</button>${natal ? `<button type="button" class="chip small" data-pick="${natal.id}">Ton métal : ${h(natal.nom.replace(/^L[e'] ?/, ""))}</button>` : `<button type="button" class="chip small" data-altheme>Ton métal : calcule ton thème</button>`}</div></header>
      <div class="al-metaux">
        <div class="al-wheel-wrap"><svg class="al-wheel" viewBox="0 0 400 400" role="group" aria-label="La roue des sept métaux">
          <circle class="w-ring" cx="200" cy="200" r="150"/><circle class="w-ring f" cx="200" cy="200" r="104"/>
          <g class="w-rot" style="transform:rotate(${rot}deg)">
            <path class="w-star" d="${M.map((m, i) => { const a = (-90 + ((i*3) % n)*step)*Math.PI/180; return (i ? "L" : "M") + (200 + Math.cos(a)*104).toFixed(1) + " " + (200 + Math.sin(a)*104).toFixed(1); }).join("")}Z"/>
            ${M.map((m, i) => `<g transform="rotate(${i*step} 200 200)"><g transform="translate(200 50)"><g class="w-m" data-m="${i}" role="button" tabindex="0" aria-label="${h(m.nom)}" style="--mc:${m.hex};transform:rotate(${-i*step - rot}deg)"><circle r="38" class="w-hit"/><circle r="34" class="w-disc"/><g transform="translate(-21 -21) scale(.42)" class="w-gl">${paths(m.id, 6.5)}</g></g></g></g>`).join("")}
          </g>
          <g class="w-center" data-center></g>
        </svg>
        <ol class="al-ladder" aria-label="L'échelle des métaux">${M.map((m, i) => `<li><button type="button" data-m="${i}" style="--mc:${m.hex}" aria-label="${h(m.nom)}"><i></i><span>${h(m.sym)}</span></button></li>`).join("")}</ol></div>
        <div class="al-card al-m-detail" data-detail aria-live="polite"></div>
      </div>`;
    const rotG = q1(".w-rot", root), center = q1("[data-center]", root), det = q1("[data-detail]", root);
    function show(i, first){
      const d = ((i - sel) % n + n) % n, delta = d > n/2 ? d - n : d; rot -= delta*step; sel = i;
      rotG.style.transform = `rotate(${rot}deg)`;
      qa(".w-m", root).forEach((g, k) => { g.style.transform = `rotate(${-k*step - rot}deg)`; g.classList.toggle("on", k === sel); });
      qa(".al-ladder button", root).forEach((b, k) => b.classList.toggle("on", k === sel));
      const m = M[i];
      center.innerHTML = `<g class="w-big" style="--mc:${m.hex}" transform="translate(148 142) scale(1.04)">${(D.G[m.id] || []).map((p, k) => `<path d="${p}" pathLength="1" style="--i:${k}" stroke-width="3.6"/>`).join("")}</g><text x="200" y="272" class="w-name">${h(m.planete.replace(/^l[ae] /, ""))}</text>`;
      det.style.setProperty("--mc", m.hex);
      det.innerHTML = `<p class="eyebrow">${h(cap(m.planete))} · ${h(m.jour)}${m === today ? " · métal du jour" : ""}${natal && m === natal ? " · ton métal" : ""}</p><h2>${h(m.nom)}</h2><p class="al-m-mot">${h(m.mot)}</p>
        <dl class="al-m-facts"><div><dt>Symbole</dt><dd>${h(m.sym)} <small>${h(m.lat)}</small></dd></div><div><dt>Fond à</dt><dd>${h(m.fus)}</dd></div><div><dt>Rang</dt><dd>${i + 1} sur 7</dd></div></dl>
        <div class="al-m-sec"><h3>La tradition ${badge("trad")}</h3><p class="al-p">${nb(h(m.trad))}</p></div>
        <div class="al-m-sec"><h3>La chimie ${badge("doc")}</h3><p class="al-p">${nb(h(m.chim))}</p></div>
        <div class="al-m-sec"><h3>Le geste ${badge("mod")}</h3><p class="al-p">${nb(h(m.geste))}</p></div>
        ${natal && m === natal ? `<p class="help al-left">« Ton métal » est celui de la planète dominante de ton thème natal, parmi les sept planètes des Anciens.</p>` : ""}`;
    }
    root.addEventListener("click", e => { const b = e.target.closest("[data-m]"); if(b) show(+b.dataset.m); const p = e.target.closest("[data-pick]"); if(p) show(M.findIndex(m => m.id === p.dataset.pick));
      if(e.target.closest("[data-altheme]") && window.ArcanesAstro) window.ArcanesAstro.switchTo("astro", "theme"); });
    root.addEventListener("keydown", e => { const b = e.target.closest && e.target.closest(".w-m"); if(b && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); show(+b.dataset.m); } });
    show(sel, true);
  }
  reg("metaux", {t:"La roue des métaux", genre:"À explorer", x:"Sept métaux, sept planètes, sept jours. Ce qu'en disent la tradition et la chimie.",
    ico:ico(`<circle cx="24" cy="24" r="17"/><circle cx="24" cy="7" r="3.4" fill="currentColor"/><circle cx="37.300" cy="13.4" r="2.6"/><circle cx="40.600" cy="27.800" r="2.6"/><circle cx="31.400" cy="39.300" r="2.6"/><circle cx="16.600" cy="39.300" r="2.6"/><circle cx="7.400" cy="27.800" r="2.6"/><circle cx="10.700" cy="13.4" r="2.6"/><circle cx="24" cy="24" r="5"/><circle cx="24" cy="24" r=".8" fill="currentColor"/>`), render:metaux});

  /* ================================================================
     LE CARRÉ DES ÉLÉMENTS
     ================================================================ */
  function elements(root){
    const EL = D.ELEMENTS, ORD = ["feu","air","eau","terre"], POS = {feu:[200, 62], air:[338, 200], eau:[200, 338], terre:[62, 200]};
    const of = (c, s) => ORD.find(k => EL[k].chaud === c && EL[k].sec === s);
    let cur = "feu", timer = 0;
    root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">La physique d'Aristote ${badge("doc")}</p><h1>Le carré des éléments</h1>${rule4}
        <p class="al-lede">Chaque élément réunit deux qualités. Change une seule qualité, et l'élément devient son voisin : c'est toute l'idée de la transmutation.</p></header>
      <div class="al-elements">
        <div class="al-niche al-el-stage" data-el="feu"><div class="al-el-amb" aria-hidden="true">${Array.from({length:16}, (x, k) => `<i style="--k:${k};--x:${(k*61) % 100}%;--d:${(k*37 % 50)/10}s;--s:${.6 + (k*13 % 10)/12}"></i>`).join("")}</div>
          <svg class="al-el-svg" viewBox="0 0 400 400" role="group" aria-label="Le carré des quatre éléments">
            <path class="e-sq" d="M200 62L338 200L200 338L62 200Z"/>
            ${[["feu","air","chaud"],["air","eau","humide"],["eau","terre","froid"],["terre","feu","sec"]].map(([a, b, q]) => `<g class="e-edge" data-e="${a}-${b}"><line x1="${POS[a][0]}" y1="${POS[a][1]}" x2="${POS[b][0]}" y2="${POS[b][1]}"/><text x="${(POS[a][0] + POS[b][0])/2 + ((POS[a][0] + POS[b][0])/2 > 200 ? 26 : -26)}" y="${(POS[a][1] + POS[b][1])/2 + ((POS[a][1] + POS[b][1])/2 > 200 ? 22 : -14)}">${q}</text></g>`).join("")}
            ${ORD.map(k => `<g class="e-node" data-n="${k}" role="button" tabindex="0" aria-label="${h(EL[k].nom)}" style="--ec:${EL[k].hex}" transform="translate(${POS[k][0]} ${POS[k][1]})"><circle r="40"/><g transform="translate(-19 -21) scale(.38)">${D.G[k].map(d => `<path d="${d}" stroke-width="7"/>`).join("")}</g></g>`).join("")}
            <g class="e-center" data-center></g>
          </svg></div>
        <div class="al-el-side">
          <div class="al-card al-el-ctl">
            <div class="al-seg" role="group" aria-label="Chaud ou froid"><button type="button" data-q="chaud:1">Chaud</button><button type="button" data-q="chaud:0">Froid</button></div>
            <div class="al-seg" role="group" aria-label="Sec ou humide"><button type="button" data-q="sec:1">Sec</button><button type="button" data-q="sec:0">Humide</button></div>
            <p class="al-el-msg" aria-live="polite"></p>
            <button type="button" class="btn small ghost" data-turn>Faire tourner la roue</button>
          </div>
          <div class="al-card al-el-detail" data-detail></div>
        </div></div>`;
    const stage = q1(".al-el-stage", root), center = q1("[data-center]", root), det = q1("[data-detail]", root), msg = q1(".al-el-msg", root);
    function set(k, why){
      const prev = cur, a = EL[prev], b = EL[k]; cur = k; stage.dataset.el = k; stage.style.setProperty("--ec", b.hex);
      qa(".e-node", root).forEach(g => g.classList.toggle("on", g.dataset.n === k));
      qa(".e-edge", root).forEach(g => { const [x, y] = g.dataset.e.split("-"); g.classList.toggle("on", prev !== k && ((x === prev && y === k) || (x === k && y === prev))); });
      qa("[data-q]", root).forEach(bt => { const [q, v] = bt.dataset.q.split(":"); bt.setAttribute("aria-pressed", b[q] === +v); });
      center.innerHTML = `<circle r="62" cx="200" cy="200" class="e-halo"/><g class="e-big" transform="translate(152 150) scale(.96)">${D.G[k].map((d, i) => `<path d="${d}" pathLength="1" style="--i:${i}" stroke-width="4"/>`).join("")}</g>`;
      if(prev !== k){ const dc = a.chaud !== b.chaud, ds = a.sec !== b.sec, nom = x => x.nom.replace(/^L[ae'] ?/, m => m.toLowerCase());
        msg.textContent = dc && ds ? `${a.nom} et ${nom(b)} n'ont aucune qualité en commun : pour Aristote, c'est le passage le plus difficile.`
          : dc ? `Change le ${a.chaud ? "chaud en froid" : "froid en chaud"} : ${nom(a)} devient ${nom(b)}.` : `Change le ${a.sec ? "sec en humide" : "humide en sec"} : ${nom(a)} devient ${nom(b)}.`; }
      else if(!why) msg.textContent = "Touche une qualité ou un élément.";
      det.style.setProperty("--ec", b.hex);
      det.innerHTML = `<p class="eyebrow">${h(b.mot)}</p><h2>${h(b.nom)}</h2><p class="al-p">${nb(h(b.txt))}</p>
        <dl class="al-m-facts two"><div><dt>Au tarot</dt><dd>${h(b.tarot)}</dd></div><div><dt>Au zodiaque</dt><dd><small>${h(b.signes)}</small></dd></div></dl>`;
    }
    const stop = () => { clearInterval(timer); timer = 0; const t = q1("[data-turn]", root); if(t) t.textContent = "Faire tourner la roue"; };
    root.addEventListener("click", e => {
      const nd = e.target.closest("[data-n]"), qb = e.target.closest("[data-q]"), tr = e.target.closest("[data-turn]");
      if(nd){ stop(); set(nd.dataset.n); }
      if(qb){ stop(); const [q, v] = qb.dataset.q.split(":"), c = EL[cur]; set(of(q === "chaud" ? +v : c.chaud, q === "sec" ? +v : c.sec)); }
      if(tr){ if(timer) return stop(); tr.textContent = "Arrêter la roue"; const tick = () => set(ORD[(ORD.indexOf(cur) + 1) % 4]); tick(); timer = setInterval(tick, 2300); }
    });
    root.addEventListener("keydown", e => { const nd = e.target.closest && e.target.closest("[data-n]"); if(nd && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); stop(); set(nd.dataset.n); } });
    set("feu");
    return stop;
  }
  reg("elements", {t:"Le carré des éléments", genre:"À manipuler", x:"Chaud ou froid, sec ou humide : change une qualité et regarde l'élément devenir son voisin.",
    ico:ico(`<path d="M24 5L43 24L24 43L5 24Z"/><path d="M24 15l6 10H18z"/><path d="M14.500 14.500l19 19M33.500 14.500l-19 19" opacity=".35"/>`), render:elements});

  /* ================================================================
     LA TABLE DES SIGNES (et le jeu du déchiffrage)
     ================================================================ */
  function signes(root){
    const S = D.SIGNES, key = s => s.key || s.id, FAM = ["Tous", ...new Set(S.map(s => s.fam))];
    let fam = "Tous", cur = key(S[2]), quiz = null;
    root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">L'écriture du laboratoire</p><h1>La table des signes</h1>${rule4}
        <p class="al-lede">Un cercle, un croissant, une croix, un triangle. Touche un signe pour le voir se tracer et comprendre de quoi il est fait.</p></header>
      <div class="al-signes">
        <div class="al-niche al-sg-stage" data-stage></div>
        <div class="al-sg-side">
          <div class="al-chips" role="group" aria-label="Familles de signes">${FAM.map(f => `<button type="button" class="chip small ${f === fam ? "on" : ""}" data-fam="${h(f)}">${h(f)}</button>`).join("")}</div>
          <div class="al-sg-grid" data-grid></div>
          <p class="help al-left">Ces signes n'ont jamais été fixés par une règle : ils varient d'un livre à l'autre. Voici les formes les plus courantes aux XVIIe et XVIIIe siècles.</p>
        </div></div>`;
    const stage = q1("[data-stage]", root), grid = q1("[data-grid]", root);
    const drawGrid = () => { grid.innerHTML = S.filter(s => fam === "Tous" || s.fam === fam).map(s => `<button type="button" class="al-sg ${key(s) === cur ? "on" : ""}" data-s="${key(s)}">${glyph(s.id, "", 6)}<span>${h(s.nom)}</span></button>`).join(""); };
    function show(k){
      cur = k; quiz = null; const s = S.find(x => key(x) === k);
      qa(".al-sg", grid).forEach(b => b.classList.toggle("on", b.dataset.s === k));
      stage.innerHTML = `<div class="al-sg-big">${glyph(s.id, "draw", 3.4)}</div>
        <div class="al-sg-txt"><p class="eyebrow">${h(s.fam)}</p><h2>${h(s.nom)}</h2><p class="al-p">${nb(h(s.txt))}</p>
          <ul class="al-pieces">${s.pieces.map(p => `<li>${nb(h(D.PIECES[p]))}</li>`).join("")}</ul>
          <div class="al-acts"><button type="button" class="linkbtn" data-redraw>Retracer</button><button type="button" class="btn small" data-quiz>Jouer au déchiffrage</button></div></div>`;
    }
    function ask(){
      const pool = S.filter(s => !s.key), s = quiz.list[quiz.i], opts = [s, ...pool.filter(x => x.id !== s.id).sort(() => Math.random() - .5).slice(0, 3)].sort(() => Math.random() - .5);
      stage.innerHTML = `<div class="al-sg-big">${glyph(s.id, "draw", 3.4)}</div>
        <div class="al-sg-txt"><p class="eyebrow">Déchiffrage · signe ${quiz.i + 1} sur ${quiz.list.length} · ${quiz.ok} trouvé${quiz.ok > 1 ? "s" : ""}</p><h2>Quel est ce signe ?</h2>
          <div class="al-q-o">${opts.map(o => `<button type="button" data-a="${o.id}">${h(o.nom)}</button>`).join("")}</div><p class="al-q-e" hidden></p>
          <div class="al-acts"><button type="button" class="linkbtn" data-quit>Arrêter</button></div></div>`;
      qa("[data-a]", stage).forEach(b => b.onclick = () => { const ok = b.dataset.a === s.id; if(ok) quiz.ok++;
        qa("[data-a]", stage).forEach(x => { x.disabled = true; if(x.dataset.a === s.id) x.classList.add("ok"); else if(x === b) x.classList.add("ko"); });
        const e = q1(".al-q-e", stage); e.hidden = false; e.textContent = (ok ? "Oui. " : `C'était ${s.nom.toLowerCase()}. `) + s.txt;
        setTimeout(() => { quiz.i++; if(quiz && quiz.i < quiz.list.length) ask(); else end(); }, ok ? 1500 : 2900); });
    }
    function end(){
      const sc = quiz.ok, n = quiz.list.length, s = st(); if(sc > (s.signes || 0)){ s.signes = sc; save(); }
      const won = sc >= 6 && gagne("aigle"); quiz = null;
      stage.innerHTML = `<div class="al-sg-big al-sg-score"><b>${sc}</b><span>sur ${n}</span></div>
        <div class="al-sg-txt"><p class="eyebrow">Déchiffrage terminé</p><h2>${sc === n ? "Sans faute." : sc >= 6 ? "Tu sais lire les signes." : sc >= 4 ? "Ça vient." : "Les signes résistent encore."}</h2>
          <p class="al-p">${won ? "Tu gagnes une planche : L'aigle à trois têtes." : sc >= 6 ? "Ton meilleur score : " + s.signes + " sur " + n + "." : "Il faut six signes sur huit pour gagner la planche de l'aigle."}</p>
          <div class="al-acts"><button type="button" class="btn small" data-quiz>Rejouer</button><button type="button" class="linkbtn" data-back>Revenir à la table</button>${won ? `<button type="button" class="linkbtn" data-alplanche="aigle">Voir la planche</button>` : ""}</div></div>`;
    }
    root.addEventListener("click", e => {
      const f = e.target.closest("[data-fam]"), s = e.target.closest("[data-s]");
      if(f){ fam = f.dataset.fam; qa("[data-fam]", root).forEach(b => b.classList.toggle("on", b === f)); drawGrid(); }
      if(s) show(s.dataset.s);
      if(e.target.closest("[data-redraw]")){ const b = q1(".al-sg-big", stage); b.innerHTML = b.innerHTML; }
      if(e.target.closest("[data-quiz]")){ quiz = {list:S.filter(x => !x.key).sort(() => Math.random() - .5).slice(0, 8), i:0, ok:0}; ask(); }
      if(e.target.closest("[data-quit],[data-back]")) show(cur);
    });
    drawGrid(); show(cur);
    return () => { quiz = null; };
  }
  reg("signes", {t:"La table des signes", genre:"À explorer · jeu", x:"Seize signes qui se tracent sous tes yeux, et un jeu de déchiffrage.",
    ico:ico(`<path d="M17 8a7 7 0 0 0 14 0"/><circle cx="24" cy="22" r="7"/><path d="M24 29v13M18 36h12"/>`), render:signes});

  /* ================================================================
     LES PLANCHES (la collection) et LES EMBLÈMES COMMENTÉS
     ================================================================ */
  const COND = {noir:"Grand Œuvre, étape 1", paon:"Grand Œuvre, étape 2", blanc:"Grand Œuvre, étape 3", jaune:"Grand Œuvre, étape 4", rouge:"Grand Œuvre, étape 5", union:"Commence ton Œuvre", dragon:"Termine le premier module de l'école", aigle:"Réussis six signes sur huit au déchiffrage"};
  const GOTO = {union:"labo:oeuvre", dragon:"ecole", aigle:"labo:signes"};
  function planches(root, arg){
    let tab = arg === "emblemes" ? "emb" : "pl", emb = 0, pt = -1;
    const draw = () => {
      const s = st(), ks = Object.keys(D.PLANCHES), E = D.EMBLEMES;
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Les images de l'art</p><h1>Les planches</h1>${rule4}
          <p class="al-lede">L'alchimie a parlé par images. Gagne les planches du Splendor solis dans le laboratoire, et apprends à lire six grands emblèmes, détail par détail.</p>
          <div class="subtabs" role="tablist"><button type="button" role="tab" class="subtab ${tab === "pl" ? "on" : ""}" data-tab="pl" aria-selected="${tab === "pl"}">Ma collection · ${s.planches.length}/${ks.length}</button><button type="button" role="tab" class="subtab ${tab === "emb" ? "on" : ""}" data-tab="emb" aria-selected="${tab === "emb"}">Emblèmes commentés</button></div></header>
        ${tab === "pl" ? `<div class="al-plates">${ks.map(k => { const P = D.PLANCHES[k], ok = s.planches.includes(k);
            return ok ? `<button type="button" class="al-plate ok" data-alplanche="${k}"><img src="${IMG(P.img)}" alt="${h(P.t)}" loading="lazy" decoding="async"><span>${h(P.t)}</span></button>`
              : `<button type="button" class="al-plate lock" data-algo="${GOTO[k] || "labo:jeu"}"><span class="al-plate-q" aria-hidden="true">${VA ? VA.mini("#1c2420", {level:.5, id:"p" + k}) : "?"}</span><span>${h(P.t)}</span><small>${h(COND[k])}</small></button>`; }).join("")}</div>
          <p class="help al-left">Aquarelles d'E. A. Ibbs d'après le Splendor solis, conservées à la Wellcome Collection de Londres.</p>`
        : E.length ? emblemeHTML(E[emb]) + `<div class="al-emb-nav">${E.map((x, i) => `<button type="button" class="chip small ${i === emb ? "on" : ""}" data-emb="${i}">${h(x.court)}</button>`).join("")}</div>` : `<p class="al-p">Les emblèmes arrivent.</p>`}`;
      if(tab === "emb") point(pt);
    };
    const emblemeHTML = e => `<div class="al-emb"><div class="al-emb-fig"><div class="al-emb-img"><img src="${IMG(e.img)}" alt="${h(e.t)}">${e.pts.map((p, i) => `<button type="button" class="al-hot" data-pt="${i}" style="left:${p.x}%;top:${p.y}%" aria-label="Détail ${i + 1} : ${h(p.t)}"><b>${i + 1}</b></button>`).join("")}</div><p class="al-emb-cred">${h(D.CRED[e.img] || "")}</p></div>
        <div class="al-emb-txt"><p class="eyebrow">${h(e.src)}</p><h2>${h(e.t)}</h2><p class="al-p">${nb(h(e.intro))}</p>
          <div class="al-card al-emb-pt" data-ptbox aria-live="polite"></div>
          <ol class="al-emb-list">${e.pts.map((p, i) => `<li><button type="button" data-pt="${i}"><b>${i + 1}</b>${h(p.t)}</button></li>`).join("")}</ol></div></div>`;
    function point(i){
      const e = D.EMBLEMES[emb], box = q1("[data-ptbox]", root); if(!e || !box) return; pt = i;
      qa("[data-pt]", root).forEach(b => b.classList.toggle("on", +b.dataset.pt === i));
      box.innerHTML = i < 0 ? `<p class="al-p">Touche un numéro sur l'image. Mieux : regarde d'abord l'image une minute, et demande-toi ce que tu vois.</p>` : `<h3><b>${i + 1}</b> ${h(e.pts[i].t)}</h3><p class="al-p">${nb(h(e.pts[i].x2))}</p>`;
    }
    root.addEventListener("click", ev => {
      const t = ev.target.closest("[data-tab]"), e = ev.target.closest("[data-emb]"), p = ev.target.closest("[data-pt]");
      if(t){ tab = t.dataset.tab; pt = -1; draw(); }
      if(e){ emb = +e.dataset.emb; pt = -1; draw(); }
      if(p) point(+p.dataset.pt);
    });
    draw();
  }
  reg("planches", {t:"Les planches", genre:"Collection · lecture d'images", x:"Huit planches du Splendor solis à gagner, et six emblèmes commentés détail par détail.",
    ico:ico(`<rect x="9" y="5" width="30" height="38" rx="1.5"/><rect x="13" y="9" width="22" height="30" rx="1" opacity=".5"/><path d="M22 15v6c0 2-5 3.500-5 8a7 7 0 0 0 14 0c0-4.500-5-6-5-8v-6"/>`), render:planches});
})();
