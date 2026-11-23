/* ===== Arcanes · Psyché : La descente (le jeu) =====
   On descend dans la maison du rêve de Jung : l'étage, le rez-de-chaussée, la cave, la grotte.
   À chaque étage, un symbole à trouver, des ombres qui rôdent, et l'escalier vers le bas.
   Le miroir, trouvé au rez-de-chaussée, permet de « faire face » : l'ombre regardée se dissout en lumière.
   Au fond, les quatre symboles forment un mandala. Commandes : flèches ou ZQSD, Espace pour faire face ;
   au doigt, on touche l'endroit où aller, et le bouton « Faire face ». */
(() => {
  const A = window.PSY_APP; if(!A) return;
  const {TOOLR, st, save} = A._;
  const W = 400, H = 560;
  const FLOORS = [
    {nom:"L'étage", sous:"Le salon du XVIIIe siècle : la conscience", sym:"masque", symNom:"le masque", txt:"Le masque : la persona, le visage pour le monde.", bg:"#efe8dc", wall:"#6d5a3c", light:1, sh:1, sp:42,
      furn:[[60, 120, 90, 40], [250, 130, 90, 50], [150, 300, 100, 60], [40, 420, 60, 70]], sym0:[330, 450], stairs:[40, 40]},
    {nom:"Le rez-de-chaussée", sous:"Les salles médiévales : l'inconscient personnel", sym:"miroir", symNom:"le miroir", txt:"Le miroir : tu peux désormais faire face à une ombre. Elle se dissout en lumière.", bg:"#ddd3c2", wall:"#4b3d2a", light:.85, sh:2, sp:48,
      furn:[[120, 90, 40, 140], [240, 90, 40, 140], [60, 330, 120, 40], [230, 380, 110, 40]], sym0:[200, 130], stairs:[330, 470]},
    {nom:"La cave", sous:"Les murs romains : les images de l'autre", sym:"serpent", symNom:"le serpent", txt:"Le serpent : il mue, il se renouvelle. Il guérit aussi, enroulé sur le bâton d'Asclépios.", bg:"#b9ac98", wall:"#3a2f22", light:.6, sh:3, sp:54,
      furn:[[90, 100, 30, 120], [190, 60, 30, 140], [290, 100, 30, 120], [90, 340, 30, 140], [190, 360, 30, 140], [290, 340, 30, 140]], sym0:[350, 80], stairs:[40, 480]},
    {nom:"La grotte", sous:"Les os et les crânes : l'inconscient collectif", sym:"cercle", symNom:"le cercle", txt:"Le cercle : le mandala, l'image du Soi qui rassemble.", bg:"#8f8474", wall:"#2a231a", light:.4, sh:4, sp:58,
      furn:[[70, 160, 70, 50], [260, 120, 80, 60], [160, 280, 80, 40], [60, 400, 60, 60], [280, 420, 70, 50]], sym0:[200, 470], stairs:[200, 60], fin:true}
  ];
  const SYMS = {
    masque:(x, cx, cy, r, c) => { x.strokeStyle = c; x.lineWidth = 2; x.beginPath(); x.ellipse(cx, cy, r*.75, r, 0, 0, Math.PI*2); x.stroke(); x.beginPath(); x.ellipse(cx - r*.3, cy - r*.15, r*.17, r*.1, 0, 0, Math.PI*2); x.ellipse(cx + r*.3, cy - r*.15, r*.17, r*.1, 0, 0, Math.PI*2); x.stroke(); x.beginPath(); x.arc(cx, cy + r*.3, r*.3, .2, Math.PI - .2); x.stroke(); },
    miroir:(x, cx, cy, r, c) => { x.strokeStyle = c; x.lineWidth = 2; x.beginPath(); x.ellipse(cx, cy - r*.15, r*.6, r*.75, 0, 0, Math.PI*2); x.stroke(); x.beginPath(); x.moveTo(cx, cy + r*.6); x.lineTo(cx, cy + r); x.stroke(); x.beginPath(); x.moveTo(cx - r*.25, cy - r*.45); x.lineTo(cx + r*.05, cy - r*.75); x.stroke(); },
    serpent:(x, cx, cy, r, c) => { x.strokeStyle = c; x.lineWidth = 2.4; x.beginPath(); for(let t = 0; t <= 1.001; t += .05){ const yy = cy - r + t*2*r, xx = cx + Math.sin(t*Math.PI*3)*r*.45; t ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); x.fillStyle = c; x.beginPath(); x.arc(cx, cy - r, r*.16, 0, Math.PI*2); x.fill(); },
    cercle:(x, cx, cy, r, c) => { x.strokeStyle = c; x.lineWidth = 2; [1, .62, .25].forEach(k => { x.beginPath(); x.arc(cx, cy, r*k, 0, Math.PI*2); x.stroke(); }); x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.moveTo(cx, cy - r); x.lineTo(cx, cy + r); x.stroke(); }
  };
  const hit = (ax, ay, ar, [bx, by, bw, bh]) => { const nx = Math.max(bx, Math.min(ax, bx + bw)), ny = Math.max(by, Math.min(ay, by + bh)); return (ax - nx)**2 + (ay - ny)**2 < ar*ar; };

  TOOLR.miroir = host => { host.innerHTML = `<button type="button" class="ps-miroir" data-miroir><svg viewBox="0 0 40 52" width="56" height="73" aria-hidden="true" shape-rendering="crispEdges"><path d="M4 50V20C4 9 11 3 20 3s16 6 16 17v30z" fill="#b08a3c"/><path d="M6 50V20C6 10 12 5 20 5s14 5 14 15v30z" fill="#e2bd5a"/><path d="M9 48V21c0-8 5-12 11-12s11 4 11 12v27z" fill="#14162b"/><rect x="17" y="24" width="6" height="6" fill="#f4efe2"/><rect x="15" y="30" width="10" height="10" fill="#f4efe2"/><rect x="11" y="34" width="6" height="12" fill="#c2501c"/><rect x="12" y="36" width="3" height="8" fill="#ffe9a8"/><rect x="2" y="49" width="36" height="3" fill="#86603a"/></svg><div><small>Le jeu</small><b>Le Miroir</b><span>Une nuit étoilée, sept époques à traverser, du temple des rêves au cabinet de Jung. Chaque niveau ouvre ses volets d'histoire. La partie se reprend où tu l'as laissée.</span></div></button>`; };
  TOOLR.descente = host => {
    const G = st().descente || (st().descente = {n:0, best:null});
    host.innerHTML = `<div class="ps-game"><div class="ps-game-hud"><span data-gfl>L'étage</span><span data-glives aria-label="Lumière"></span><span data-gt>0:00</span></div>
      <div class="ps-game-cv"><canvas width="${W}" height="${H}" tabindex="0" aria-label="La descente : la maison du rêve de Jung. Flèches pour bouger, Espace pour faire face."></canvas>
        <div class="ps-game-ov" data-gov></div></div>
      <div class="ps-game-ctl"><button type="button" class="btn small" data-gface disabled>Faire face</button><span class="help">Touche ou clique un endroit pour y aller. Au clavier : flèches, Espace.</span></div></div>`;
    const cv = q("canvas"), x = cv.getContext("2d"), ov = q("[data-gov]");
    function q(s){ return host.querySelector(s); }
    const dark = document.createElement("canvas"); dark.width = W; dark.height = H; const dx = dark.getContext("2d");
    let fl = 0, F = null, P = null, S = [], sym = null, got = [], lives = 3, face = 0, faceCd = 0, t0 = 0, tEl = 0, raf = 0, last = 0, run = false, keys = {}, target = null, inv = 0, msg = null, msgT = 0;
    const reduce = (() => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } })();

    function setFloor(i){
      fl = i; F = FLOORS[i]; P = {x:F.fin ? 200 : (i % 2 ? 60 : 340), y:F.fin ? 140 : (i % 2 ? 60 : 500), r:11};
      if(i === 0){ P.x = 200; P.y = 250; }
      sym = {x:F.sym0[0], y:F.sym0[1], got:false};
      S = Array.from({length:F.sh}, (_, k) => { let sx, sy, n = 0; do{ sx = 40 + Math.random()*320; sy = 40 + Math.random()*480; n++; }while(n < 50 && (Math.hypot(sx - P.x, sy - P.y) < 180 || F.furn.some(b => hit(sx, sy, 16, b)))); return {x:sx, y:sy, r:14, vx:0, vy:0, ph:Math.random()*6, gone:0, wob:Math.random()*6}; });
      inv = 1.2; target = null;
      q("[data-gfl]").textContent = F.nom; say(F.nom, F.sous);
    }
    function say(a, b){ msg = [a, b]; msgT = 2.6; }
    function hud(){ q("[data-glives]").innerHTML = Array.from({length:3}, (_, k) => `<i class="${k < lives ? "on" : ""}"></i>`).join(""); const s = Math.floor(tEl); q("[data-gt]").textContent = `${Math.floor(s/60)}:${String(s % 60).padStart(2, "0")}`;
      const fb = q("[data-gface]"); fb.disabled = !got.includes("miroir") || faceCd > 0; fb.textContent = faceCd > 0 ? `Faire face (${Math.ceil(faceCd)})` : "Faire face"; }
    function intro(){
      run = false; ov.hidden = false;
      ov.innerHTML = `<div><p class="eyebrow">Jeu · environ trois minutes</p><h3>La descente</h3><p>En 1909, Jung rêve d'une maison où chaque étage est plus ancien que le précédent. Descends-la. À chaque étage, trouve le <b>symbole</b>, puis l'<b>escalier</b>. Les <b>ombres</b> rôdent : si elles te touchent, ta lanterne faiblit.</p>
        <p>Au rez-de-chaussée, le miroir te permettra de <b>faire face</b> : une ombre qu'on regarde se dissout en lumière.</p>
        ${G.n ? `<p class="help">Descentes réussies : ${G.n}${G.best ? ` · meilleur temps ${fmt(G.best)}` : ""}</p>` : ""}<button type="button" class="btn" data-gstart>Descendre</button></div>`;
      q("[data-gstart]").onclick = start; draw(0);
    }
    const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    function start(){ got = []; lives = 3; faceCd = 0; face = 0; tEl = 0; setFloor(0); ov.hidden = true; run = true; last = performance.now(); cv.focus(); hud(); loop(last); }
    function lose(){ run = false; ov.hidden = false;
      ov.innerHTML = `<div><h3>La lanterne s'est éteinte</h3><p>Les ombres ont gagné cette fois, ${F.nom.toLowerCase()}. Jung disait qu'on ne s'éclaire pas en imaginant la lumière, mais en regardant l'obscurité : le miroir aide.</p><button type="button" class="btn" data-gstart>Recommencer</button></div>`;
      q("[data-gstart]").onclick = start; }
    function win(){ run = false; G.n = (G.n || 0) + 1; if(!G.best || tEl < G.best) G.best = Math.round(tEl); G.last = Date.now(); save();
      try{ window.dispatchEvent(new CustomEvent("arcanes:jeu", {detail:{art:"psyche"}})); }catch(e){}
      ov.hidden = false;
      ov.innerHTML = `<div><div class="ps-game-mand">${mandSVG()}</div><h3>Le Soi</h3><p>Le masque, le miroir, le serpent et le cercle se rassemblent : un mandala, l'image que Jung voyait surgir quand la psyché se réorganise autour d'un centre.</p>
        <p class="help">Temps : ${fmt(tEl)} · lumière restante : ${lives} sur 3${G.best === Math.round(tEl) ? " · meilleur temps" : ""}</p><div class="ps-row c"><button type="button" class="btn" data-gstart>Redescendre</button><button type="button" class="btn ghost" data-psgo="lec:p1l1">Le rêve de la maison</button></div></div>`;
      q("[data-gstart]").onclick = start; }
    function mandSVG(){ const pos = [[50, 18], [82, 50], [50, 82], [18, 50]];
      return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="30"/><path d="M50 4V96M4 50H96"/><circle cx="50" cy="50" r="6" class="f"/>${pos.map(([a, b]) => `<circle cx="${a}" cy="${b}" r="9"/>`).join("")}</svg>`; }

    function step(dt){
      tEl += dt; if(inv > 0) inv -= dt; if(faceCd > 0) faceCd -= dt; if(face > 0) face -= dt; if(msgT > 0) msgT -= dt;
      let mx = 0, my = 0;
      if(keys.ArrowLeft || keys.q || keys.a) mx -= 1; if(keys.ArrowRight || keys.d) mx += 1; if(keys.ArrowUp || keys.z || keys.w) my -= 1; if(keys.ArrowDown || keys.s) my += 1;
      if(!mx && !my && target){ const ddx = target[0] - P.x, ddy = target[1] - P.y, d = Math.hypot(ddx, ddy); if(d > 4){ mx = ddx/d; my = ddy/d; } else target = null; }
      const l = Math.hypot(mx, my) || 1, sp = 130*dt;
      move(P, mx/l*sp, my/l*sp);
      S.forEach(s => { if(s.gone){ s.gone += dt; return; }
        const ddx = P.x - s.x, ddy = P.y - s.y, d = Math.hypot(ddx, ddy) || 1, seen = d < 210 + 60*F.light;
        s.wob += dt; const wx = Math.cos(s.wob*.9 + s.ph), wy = Math.sin(s.wob*1.1 + s.ph);
        const vx = seen ? ddx/d : wx*.6, vy = seen ? ddy/d : wy*.6, v = F.sp*(seen ? 1 : .5)*dt;
        move(s, vx*v, vy*v, true);
        if(face > 0 && d < 120){ s.gone = .001; return; }
        if(inv <= 0 && d < s.r + P.r - 2){ lives--; inv = 1.6; s.x = P.x < W/2 ? W - 50 : 50; s.y = P.y < H/2 ? H - 60 : 60; hud(); if(lives <= 0) return lose(); say("La peur", "Ta lanterne faiblit."); } });
      S = S.filter(s => !s.gone || s.gone < .8);
      if(!run) return;
      if(!sym.got && Math.hypot(sym.x - P.x, sym.y - P.y) < 22){ sym.got = true; got.push(F.sym); say("Tu as trouvé " + F.symNom, F.txt); hud(); }
      const [sx, sy] = F.stairs;
      if(sym.got && Math.hypot(sx - P.x, sy - P.y) < 24){ if(F.fin) return win(); setFloor(fl + 1); }
      hud();
    }
    function move(o, ddx, ddy, ghost){
      const r = o.r; let nx = Math.max(18 + r, Math.min(W - 18 - r, o.x + ddx)); if(ghost || !F.furn.some(b => hit(nx, o.y, r, b))) o.x = nx;
      let ny = Math.max(18 + r, Math.min(H - 18 - r, o.y + ddy)); if(ghost || !F.furn.some(b => hit(o.x, ny, r, b))) o.y = ny;
    }
    function draw(now){
      const T = (now || 0)/1000;
      F = F || FLOORS[0]; if(!P) setFloor(0);
      x.fillStyle = F.bg; x.fillRect(0, 0, W, H);
      /* le sol : un dallage discret */
      x.strokeStyle = "rgba(0,0,0,.06)"; x.lineWidth = 1; for(let i = 40; i < W; i += 40){ x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for(let j = 40; j < H; j += 40){ x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
      x.strokeStyle = F.wall; x.lineWidth = 10; x.strokeRect(5, 5, W - 10, H - 10);
      F.furn.forEach(([bx, by, bw, bh]) => { x.fillStyle = F.wall; x.globalAlpha = .82; x.fillRect(bx, by, bw, bh); x.globalAlpha = 1; x.strokeStyle = "rgba(255,255,255,.15)"; x.lineWidth = 1; x.strokeRect(bx + 3, by + 3, bw - 6, bh - 6); });
      if(fl === 3){ x.fillStyle = "rgba(240,230,210,.5)"; [[110, 250], [300, 300], [140, 470]].forEach(([a, b]) => { x.beginPath(); x.arc(a, b, 7, 0, Math.PI*2); x.fill(); x.fillRect(a - 3, b + 5, 6, 6); }); }
      /* l'escalier */
      const [sx, sy] = F.stairs; x.save(); x.translate(sx, sy); x.fillStyle = sym && sym.got ? "#2b2540" : "rgba(43,37,64,.35)"; x.fillRect(-20, -20, 40, 40); x.strokeStyle = "#f4efe2"; x.lineWidth = 1.5; for(let k = -12; k <= 12; k += 6){ x.beginPath(); x.moveTo(-14, k); x.lineTo(14, k); x.stroke(); }
      if(sym && sym.got && !reduce){ x.strokeStyle = "rgba(122,104,173," + (.5 + .5*Math.sin(T*4)) + ")"; x.lineWidth = 3; x.strokeRect(-24, -24, 48, 48); } x.restore();
      /* le symbole */
      if(sym && !sym.got){ const b = reduce ? 0 : Math.sin(T*2.4)*3; x.fillStyle = "rgba(244,239,226,.85)"; x.beginPath(); x.arc(sym.x, sym.y + b, 18, 0, Math.PI*2); x.fill(); SYMS[F.sym](x, sym.x, sym.y + b, 11, "#5b4a8a"); }
      /* les ombres */
      S.forEach(s => { const a = s.gone ? Math.max(0, 1 - s.gone/.8) : 1, rr = s.r*(s.gone ? 1 + s.gone*2 : 1) + (reduce ? 0 : Math.sin(T*3 + s.ph)*1.5);
        const gr = x.createRadialGradient(s.x, s.y, 2, s.x, s.y, rr*1.6); gr.addColorStop(0, s.gone ? `rgba(244,226,160,${a})` : `rgba(20,14,30,${.95*a})`); gr.addColorStop(1, "rgba(20,14,30,0)");
        x.fillStyle = gr; x.beginPath(); x.arc(s.x, s.y, rr*1.6, 0, Math.PI*2); x.fill();
        if(!s.gone){ x.fillStyle = "#e9e1ff"; x.beginPath(); x.arc(s.x - 4, s.y - 2, 1.8, 0, Math.PI*2); x.arc(s.x + 4, s.y - 2, 1.8, 0, Math.PI*2); x.fill(); } });
      /* le rêveur */
      if(P){ const blink = inv > 0 && !reduce && Math.floor(T*10) % 2; if(!blink){ x.fillStyle = "#2b2540"; x.beginPath(); x.arc(P.x, P.y - 4, 6, 0, Math.PI*2); x.fill(); x.beginPath(); x.moveTo(P.x - 8, P.y + 12); x.lineTo(P.x, P.y + 1); x.lineTo(P.x + 8, P.y + 12); x.closePath(); x.fill();
        x.fillStyle = "#f2c35b"; x.beginPath(); x.arc(P.x + 9, P.y + 4, 3.2, 0, Math.PI*2); x.fill(); } }
      /* l'obscurité, que la lanterne repousse */
      const lr = (70 + 220*F.light)*(.55 + .15*lives) + (face > 0 ? 80 : 0);
      dx.globalCompositeOperation = "source-over"; dx.clearRect(0, 0, W, H); dx.fillStyle = `rgba(12,8,20,${.35 + (1 - F.light)*.55})`; dx.fillRect(0, 0, W, H);
      if(P){ dx.globalCompositeOperation = "destination-out"; const g = dx.createRadialGradient(P.x, P.y, lr*.25, P.x, P.y, lr); g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)"); dx.fillStyle = g; dx.beginPath(); dx.arc(P.x, P.y, lr, 0, Math.PI*2); dx.fill(); }
      x.drawImage(dark, 0, 0);
      if(face > 0){ x.strokeStyle = `rgba(244,226,160,${face})`; x.lineWidth = 3; x.beginPath(); x.arc(P.x, P.y, 120*(1 - face/.6) + 10, 0, Math.PI*2); x.stroke(); }
      /* les symboles trouvés */
      got.forEach((g, i) => { x.fillStyle = "rgba(244,239,226,.9)"; x.beginPath(); x.arc(W - 26 - i*30, 30, 12, 0, Math.PI*2); x.fill(); SYMS[g](x, W - 26 - i*30, 30, 7, "#5b4a8a"); });
      if(msg && msgT > 0){ const a = Math.min(1, msgT); x.fillStyle = `rgba(20,14,30,${.72*a})`; x.fillRect(20, H - 92, W - 40, 70); x.fillStyle = `rgba(250,246,236,${a})`; x.font = "600 16px Georgia, serif"; x.textAlign = "center"; x.fillText(msg[0], W/2, H - 64);
        x.font = "13px system-ui, sans-serif"; wrap(msg[1], W/2, H - 44, W - 70, 16); }
    }
    function wrap(t, cx, y, mw, lh){ const w = String(t).split(" "); let line = "", yy = y; w.forEach(word => { const test = line ? line + " " + word : word; if(x.measureText(test).width > mw && line){ x.fillText(line, cx, yy); line = word; yy += lh; } else line = test; }); x.fillText(line, cx, yy); }
    function loop(now){ if(!run){ draw(now); return; } const dt = Math.min(.05, (now - last)/1000); last = now; step(dt); draw(now); if(run) raf = requestAnimationFrame(loop); }
    const doFace = () => { if(!run || !got.includes("miroir") || faceCd > 0) return; face = .6; faceCd = 6; hud(); };
    const kd = e => { if(!run || !cv.isConnected || /input|textarea|select/i.test((e.target && e.target.tagName) || "")) return; const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," "].includes(e.key)) e.preventDefault(); if(e.key === " "){ doFace(); return; } keys[k] = true; target = null; };
    const ku = e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = false; };
    const pt = e => { if(!run) return; const b = cv.getBoundingClientRect(); target = [(e.clientX - b.left)/b.width*W, (e.clientY - b.top)/b.height*H]; };
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
    cv.addEventListener("pointerdown", e => { pt(e); cv.setPointerCapture(e.pointerId); }); cv.addEventListener("pointermove", e => { if(e.buttons) pt(e); });
    q("[data-gface]").onclick = doFace;
    cv._dbg = {next:() => { if(!run) return; if(!sym.got){ sym.got = true; got.push(F.sym); } if(F.fin) win(); else setFloor(fl + 1); hud(); }, lives:() => lives};
    intro();
    return () => { run = false; cancelAnimationFrame(raf); window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  };
})();
