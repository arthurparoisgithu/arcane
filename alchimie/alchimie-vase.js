/* ===== Arcanes · Alchimie : le vase animé =====
   L'œuf philosophique sur son feu, dessiné dans un canvas : liquide, bulles, vapeurs, gouttes qui retombent, flammes, verre.
   La couleur suit une échelle continue : 0 matière première · 1 noir · 2 queue du paon · 3 blanc · 4 jaune · 5 rouge.
   AlchVase.create(canvas, {p, heat}) rend un objet {S, burst(), destroy(), onFrame}. S est l'état que l'on modifie librement. */
window.AlchVase = (() => {
  const W = 400, H = 520, TAU = Math.PI*2;
  const STOPS = [
    {top:[96,116,104], bot:[36,50,44], glow:[96,150,128]},
    {top:[40,33,48], bot:[5,4,8], glow:[96,70,130]},
    {top:[36,150,134], bot:[46,30,96], glow:[70,205,180]},
    {top:[246,249,251], bot:[170,186,202], glow:[214,232,255]},
    {top:[251,224,122], bot:[198,134,22], glow:[255,204,88]},
    {top:[238,86,50], bot:[118,12,18], glow:[255,92,52]}
  ];
  const lerp = (a, b, t) => a + (b - a)*t, clamp = (v, a, b) => Math.max(a, Math.min(b, v)), R = Math.random;
  const mix = (A, B, t) => [0, 1, 2].map(i => Math.round(lerp(A[i], B[i], t)));
  const colAt = (p, k) => { p = clamp(p, 0, 5); const i = Math.min(4, Math.floor(p)); return mix(STOPS[i][k], STOPS[i + 1][k], p - i); };
  const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const reduce = () => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } };

  /* le profil du vase : demi-largeur intérieure à la hauteur y */
  const PROF = [];
  (() => { const bz = (a, b, c, d, t) => { const u = 1 - t; return u*u*u*a + 3*u*u*t*b + 3*u*t*t*c + t*t*t*d; };
    for(let i = 0; i <= 40; i++){ const t = i/40; PROF.push([bz(150, 212, 246, 336, t), 200 - bz(183, 183, 92, 92, t)]); }
    for(let i = 1; i <= 40; i++){ const t = i/40; PROF.push([bz(336, 396, 436, 436, t), 200 - bz(92, 92, 138, 200, t)]); } })();
  function halfW(y){ if(y <= 150) return 17; if(y >= 436) return 0;
    for(let i = 1; i < PROF.length; i++) if(PROF[i][0] >= y){ const a = PROF[i - 1], b = PROF[i]; return lerp(a[1], b[1], (y - a[0])/((b[0] - a[0]) || 1)); }
    return 0; }
  function flask(x){
    x.beginPath(); x.moveTo(183, 62); x.lineTo(183, 150);
    x.bezierCurveTo(183, 212, 92, 246, 92, 336); x.bezierCurveTo(92, 396, 138, 436, 200, 436);
    x.bezierCurveTo(262, 436, 308, 396, 308, 336); x.bezierCurveTo(308, 246, 217, 212, 217, 150);
    x.lineTo(217, 62); x.quadraticCurveTo(217, 38, 200, 34); x.quadraticCurveTo(183, 38, 183, 62); x.closePath();
  }
  const SP = {};
  function sprite(key, r, g, b){
    if(SP[key]) return SP[key];
    const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d");
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${r},${g},${b},1)`); gr.addColorStop(.38, `rgba(${r},${g},${b},.5)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return SP[key] = c;
  }
  const HUES = [[60,220,190],[120,90,230],[240,200,70],[70,200,110],[230,90,170],[80,150,240]];

  function create(cv, o = {}){
    const S = Object.assign({p:0, heat:.2, fire:true, dry:0, stone:false, crown:false, crack:0, shake:0, wind:0, bete:null, ink:"206,170,104"}, o);
    const V = {p:S.p, heat:S.heat, dry:S.dry, stone:S.stone ? 1 : 0, wind:0};
    const calm = reduce();
    let bub = [], vap = [], drp = [], flm = [], spk = [], t = 0, last = 0, raf = 0, alive = true, vis = true, k = 1;
    const acc = {b:0, v:0, d:0, f:0}, x = cv.getContext("2d"), api = {S, V, onFrame:null};
    const white = sprite("w", 255, 255, 255), fl = [sprite("f0", 255, 236, 170), sprite("f1", 255, 160, 60), sprite("f2", 230, 70, 30), sprite("f3", 110, 150, 255)];
    const hues = HUES.map((h, i) => sprite("h" + i, h[0], h[1], h[2]));

    function size(){ const r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.max(120, Math.round(r.width || 320));
      const cw = Math.round(w*d), ch = Math.round(w*H/W*d); if(cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; } k = cv.width/W; }
    const blit = (img, px, py, r, a) => { if(a <= 0.003) return; x.globalAlpha = a; x.drawImage(img, px - r, py - r, r*2, r*2); };

    function update(dt){
      t += dt;
      V.p += (S.p - V.p)*Math.min(1, dt*1.15); V.heat += (S.heat - V.heat)*Math.min(1, dt*6); V.dry += (S.dry - V.dry)*Math.min(1, dt*1.4);
      V.stone += ((S.stone ? 1 : 0) - V.stone)*Math.min(1, dt*1.2); V.wind += ((S.wind || 0) - V.wind)*Math.min(1, dt*4);
      if(S.shake > 0) S.shake = Math.max(0, S.shake - dt*1.8);
      const L = api.L = lerp(318, 408, V.dry) - V.heat*5, q = calm ? .35 : 1, wet = 1 - V.dry*.85;
      acc.b += dt*(1.5 + V.heat*V.heat*52)*wet*q;
      while(acc.b > 1){ acc.b--; const y = lerp(L + 18, 430, R()), hw = halfW(y)*.86; bub.push({x:200 + (R()*2 - 1)*hw, y, r:1 + R()*3.2*(.5 + V.heat), v:26 + R()*64, w:R()*TAU}); }
      acc.v += dt*Math.max(0, V.heat - .1)*30*wet*q;
      while(acc.v > 1){ acc.v--; vap.push({x:200 + (R()*2 - 1)*halfW(L)*.8, y:L - 2, r:11 + R()*15, v:16 + R()*26 + V.heat*34, life:0, max:2.4 + R()*2.2, w:R()*TAU}); }
      acc.d += dt*Math.max(0, V.heat - .28)*6*wet*q;
      while(acc.d > 1){ acc.d--; drp.push({s:R() < .5 ? -1 : 1, y:152 + R()*96, v:8 + R()*12, r:1.3 + R()*1.5}); }
      if(S.fire){ acc.f += dt*(5 + V.heat*96)*q;
        while(acc.f > 1){ acc.f--; flm.push({x:200 + (R() - .5)*(64 + V.heat*56), y:487 - R()*6, vx:(R() - .5)*16, vy:-(46 + R()*56 + V.heat*176), life:0, max:.42 + R()*.46, r:11 + R()*10 + V.heat*11, c:V.heat < .16 && R() < .5 ? 3 : 0}); } }
      bub = bub.filter(b => { b.y -= b.v*dt*(.6 + V.heat*.9); b.x += Math.sin(t*5 + b.w)*10*dt; return b.y > L + 1; });
      vap = vap.filter(p => { p.life += dt; p.y -= p.v*dt; p.x += Math.sin(t*1.3 + p.w)*9*dt; const hw = Math.max(3, halfW(p.y) - p.r*.35); p.x = clamp(p.x, 200 - hw, 200 + hw); return p.life < p.max && p.y > 58; });
      drp = drp.filter(d => { d.v += 34*dt; d.y += d.v*dt; return d.y < L; });
      flm = flm.filter(f => { f.life += dt; f.vx += V.wind*190*dt; f.x += f.vx*dt; f.y += f.vy*dt; if(f.y < 450 && Math.abs(f.x - 200) < 74){ f.vy *= 1 - 4*dt; f.vx += Math.sign(f.x - 200 || R() - .5)*300*dt; } return f.life < f.max; });
      spk = spk.filter(s => { s.life += dt; s.x += s.vx*dt; s.y += s.vy*dt; s.vy += 120*dt; return s.life < s.max; });
    }

    function support(front){
      x.strokeStyle = `rgba(${S.ink},.62)`; x.lineWidth = 1.6; x.lineCap = "round";
      if(front){ x.beginPath(); x.ellipse(200, 424, 80, 10, 0, .08, Math.PI - .08); x.stroke(); return; }
      x.beginPath(); x.ellipse(200, 424, 80, 10, 0, Math.PI, TAU); x.stroke();
      x.beginPath(); x.moveTo(122, 427); x.lineTo(100, 508); x.moveTo(278, 427); x.lineTo(300, 508); x.moveTo(92, 508); x.lineTo(110, 508); x.moveTo(290, 508); x.lineTo(308, 508); x.stroke();
      x.lineWidth = 1; x.strokeStyle = `rgba(${S.ink},.36)`; x.beginPath(); x.moveTo(112, 468); x.lineTo(288, 468); x.stroke();
      // le brasero et ses braises
      x.fillStyle = "rgba(10,8,6,.9)"; x.beginPath(); x.moveTo(130, 488); x.quadraticCurveTo(200, 524, 270, 488); x.closePath(); x.fill();
      x.strokeStyle = `rgba(${S.ink},.62)`; x.lineWidth = 1.6; x.beginPath(); x.moveTo(130, 488); x.quadraticCurveTo(200, 524, 270, 488); x.stroke();
      x.beginPath(); x.ellipse(200, 488, 70, 7, 0, 0, TAU); x.stroke();
      x.globalCompositeOperation = "lighter";
      for(let i = 0; i < 9; i++){ const px = 146 + i*13.5, a = (.25 + .2*Math.sin(t*2.2 + i*1.7))*(.35 + V.heat*.9); blit(fl[i % 2 ? 1 : 2], px, 489 + (i % 3) - 1, 9 + (i % 3)*2, S.fire ? a : a*.2); }
      x.globalAlpha = 1; x.globalCompositeOperation = "source-over";
    }

    function draw(){
      size(); x.setTransform(k, 0, 0, k, 0, 0); x.clearRect(0, 0, W, H);
      if(S.shake > 0) x.translate((R() - .5)*7*S.shake, (R() - .5)*7*S.shake);
      const top = colAt(V.p, "top"), bot = colAt(V.p, "bot"), glow = colAt(V.p, "glow"), L = api.L, irid = Math.max(0, 1 - Math.abs(V.p - 2));
      let g = x.createRadialGradient(200, 345, 8, 200, 345, 250); g.addColorStop(0, rgb(glow, .15 + V.heat*.2 + V.stone*.16)); g.addColorStop(1, rgb(glow, 0)); x.fillStyle = g; x.fillRect(0, 0, W, H);
      if(S.fire){ g = x.createRadialGradient(200, 478, 4, 200, 478, 150); g.addColorStop(0, `rgba(255,140,50,${.1 + V.heat*.26})`); g.addColorStop(1, "rgba(255,140,50,0)"); x.fillStyle = g; x.fillRect(0, 300, W, 220); }
      support(false);
      // les flammes : des langues de feu, puis un halo de particules
      x.globalCompositeOperation = "lighter";
      if(S.fire){ const hh = 14 + V.heat*84;
        for(let i = 0; i < 9; i++){ const cx = 158 + i*10.5 + Math.sin(t*3.1 + i*1.9)*3, w = 9 + V.heat*7 + (i % 3)*1.5, mid = 1 - Math.abs(i - 4)/6.5,
            hg = hh*mid*(.62 + .38*Math.sin(t*(6.5 + i*.83) + i*2.4))*(.85 + .15*Math.sin(t*13 + i)), sw = Math.sin(t*4.3 + i*1.3)*(4 + V.heat*7) + V.wind*(20 + 8*Math.sin(t*17 + i)), by = 487;
          for(let pass = 0; pass < 2; pass++){ const k2 = pass ? .52 : 1, ww = w*k2, h2 = hg*(pass ? .58 : 1);
            const gr = x.createLinearGradient(0, by, 0, by - h2);
            if(pass){ gr.addColorStop(0, "rgba(255,250,225,.8)"); gr.addColorStop(.6, "rgba(255,225,140,.45)"); gr.addColorStop(1, "rgba(255,200,90,0)"); }
            else if(V.heat < .14){ gr.addColorStop(0, "rgba(120,160,255,.5)"); gr.addColorStop(.5, "rgba(255,150,60,.38)"); gr.addColorStop(1, "rgba(220,70,20,0)"); }
            else { gr.addColorStop(0, "rgba(255,214,120,.62)"); gr.addColorStop(.45, "rgba(255,132,40,.46)"); gr.addColorStop(1, "rgba(214,50,16,0)"); }
            x.fillStyle = gr; x.beginPath(); x.moveTo(cx - ww, by); x.quadraticCurveTo(cx - ww*.95, by - h2*.5, cx + sw*k2, by - h2); x.quadraticCurveTo(cx + ww*.95, by - h2*.5, cx + ww, by); x.closePath(); x.fill(); } } }
      for(const f of flm){ const u = f.life/f.max, c = f.c === 3 ? fl[3] : u < .28 ? fl[0] : u < .66 ? fl[1] : fl[2]; blit(c, f.x, f.y, f.r*(1 - u*.62)*.8, (1 - u)*.3); }
      x.globalAlpha = 1; x.globalCompositeOperation = "source-over";
      // l'intérieur du vase
      x.save(); flask(x); x.clip();
      x.fillStyle = "rgba(190,226,214,.05)"; x.fillRect(60, 30, 280, 420);
      x.globalCompositeOperation = "lighter";
      for(const p of vap){ const a = Math.sin(Math.PI*p.life/p.max)*.15; blit(white, p.x, p.y, p.r, a); if(irid > .1) blit(hues[(p.w*3 | 0) % 6], p.x, p.y, p.r, a*irid*.8); }
      x.globalAlpha = 1; x.globalCompositeOperation = "source-over";
      // le liquide et sa surface
      const amp = 1.2 + V.heat*4.2, wave = px => L + Math.sin(px*.045 + t*1.7)*amp + Math.sin(px*.11 - t*2.6)*amp*.45;
      x.beginPath(); x.moveTo(84, wave(84)); for(let px = 90; px <= 318; px += 6) x.lineTo(px, wave(px)); x.lineTo(318, 446); x.lineTo(84, 446); x.closePath();
      g = x.createLinearGradient(0, L - 4, 0, 438); g.addColorStop(0, rgb(top)); g.addColorStop(1, rgb(bot)); x.fillStyle = g; x.fill();
      x.save(); x.clip();
      g = x.createRadialGradient(200, 392, 6, 200, 392, 130); g.addColorStop(0, rgb(glow, .2 + V.heat*.3)); g.addColorStop(1, rgb(glow, 0)); x.globalCompositeOperation = "lighter"; x.fillStyle = g; x.fillRect(84, L - 8, 234, 150);
      if(irid > .02) for(let i = 0; i < 7; i++){ const a = t*.5 + i*TAU/7; blit(hues[i % 6], 200 + Math.cos(a*1.3 + i)*78, lerp(L + 12, 420, .5 + .5*Math.sin(a + i*2.1)), 56, irid*.5); }
      const sh = clamp(V.p - 2.5, 0, 1)*clamp(5.4 - V.p, 0, 1);   // paillettes du blanc et du jaune
      if(sh > .02) for(let i = 0; i < 26; i++){ const px = 200 + Math.sin(i*12.9)*96, py = lerp(L + 6, 430, (i*.618 + t*.03*(1 + i % 3)) % 1), tw = .5 + .5*Math.sin(t*3 + i*2.4); if(Math.abs(px - 200) < halfW(py)) blit(white, px, py, 2.4 + tw*2.6, sh*tw*.75); }
      x.globalAlpha = 1; x.globalCompositeOperation = "source-over";
      // la bête de la phase, en transparence dans le liquide (contour fourni par alchimie-objets.js, boîte de 200 × 200)
      if(S.bete){ if(!api._bp || api._bd !== S.bete){ try{ api._bp = new Path2D(S.bete); api._bd = S.bete; }catch(e){ api._bp = null; } }
        if(api._bp){ const pale = V.p > 2.6 && V.p < 4.6, br = .5 + .5*Math.sin(t*.9);
          x.save(); x.globalCompositeOperation = "source-over"; x.translate(200 - 70 + Math.sin(t*.6)*2, 303 + Math.sin(t*.8)*2.5); x.scale(.7, .7);
          x.globalAlpha = pale ? .13 + br*.06 : .3 + br*.12; x.fillStyle = pale ? "rgba(96,64,14,1)" : rgb(mix(glow, [255, 255, 255], .45)); x.fill(api._bp);
          x.globalAlpha = pale ? .42 + br*.14 : .5 + br*.2; x.lineWidth = 2; x.strokeStyle = pale ? "rgba(96,64,14,1)" : "rgba(255,255,255,1)"; x.stroke(api._bp); x.restore(); } }
      // le dépôt au fond
      x.fillStyle = rgb(mix(bot, [0, 0, 0], .45), .5); x.beginPath(); x.ellipse(200, 438, 70, 13, 0, 0, TAU); x.fill();
      // les bulles
      const lightB = V.p > 2.6 && V.p < 4.6;
      for(const b of bub){ x.beginPath(); x.arc(b.x, b.y, b.r, 0, TAU); x.strokeStyle = lightB ? "rgba(90,70,30,.34)" : "rgba(255,255,255,.4)"; x.lineWidth = .9; x.stroke(); x.fillStyle = lightB ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.3)"; x.beginPath(); x.arc(b.x - b.r*.3, b.y - b.r*.3, b.r*.3, 0, TAU); x.fill(); }
      x.restore();
      // le reflet de la surface
      x.beginPath(); x.moveTo(84, wave(84)); for(let px = 90; px <= 318; px += 6) x.lineTo(px, wave(px));
      x.strokeStyle = irid > .2 ? `rgba(190,255,235,${.3 + irid*.4})` : rgb(mix(top, [255, 255, 255], .55), .7); x.lineWidth = 1.4; x.stroke();
      // la pierre
      if(V.stone > .02){ const a = V.stone, pu = .5 + .5*Math.sin(t*2.2);
        x.globalCompositeOperation = "lighter"; blit(fl[2], 200, 408, 70 + pu*14, a*.75); blit(fl[1], 200, 408, 34 + pu*6, a*.5); x.globalAlpha = a; x.globalCompositeOperation = "source-over";
        const P = [[200,382],[224,398],[217,426],[183,426],[176,398]];
        g = x.createLinearGradient(176, 382, 224, 428); g.addColorStop(0, "#ff8a5c"); g.addColorStop(.5, "#d3261c"); g.addColorStop(1, "#6e0a12"); x.fillStyle = g;
        x.beginPath(); P.forEach((q, i) => i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])); x.closePath(); x.fill();
        x.strokeStyle = "rgba(255,220,190,.75)"; x.lineWidth = 1; x.stroke();
        x.beginPath(); P.forEach(q => { x.moveTo(200, 404); x.lineTo(q[0], q[1]); }); x.strokeStyle = "rgba(255,210,180,.42)"; x.stroke();
        x.fillStyle = "rgba(255,255,255,.55)"; x.beginPath(); x.moveTo(200, 382); x.lineTo(224, 398); x.lineTo(200, 404); x.closePath(); x.fill(); x.globalAlpha = 1; }
      // les gouttes qui redescendent le long du verre
      x.fillStyle = "rgba(235,248,255,.7)"; for(const d of drp){ const px = 200 + d.s*(halfW(d.y) - 3.5); x.beginPath(); x.ellipse(px, d.y, d.r*.8, d.r*1.5, 0, 0, TAU); x.fill(); }
      // le feu se reflète dans le ventre du vase
      if(S.fire){ x.globalCompositeOperation = "lighter"; blit(fl[1], 200, 446, 96, V.heat*.3); x.globalAlpha = 1; x.globalCompositeOperation = "source-over"; }
      x.restore();
      // le verre
      flask(x); x.lineJoin = "round"; x.strokeStyle = "rgba(255,255,255,.07)"; x.lineWidth = 7; x.stroke();
      g = x.createLinearGradient(92, 0, 308, 0); g.addColorStop(0, "rgba(255,255,255,.82)"); g.addColorStop(.55, "rgba(255,255,255,.4)"); g.addColorStop(1, "rgba(255,255,255,.2)");
      flask(x); x.strokeStyle = g; x.lineWidth = 2; x.stroke();
      x.lineCap = "round"; x.strokeStyle = "rgba(255,255,255,.2)"; x.lineWidth = 5; x.beginPath(); x.moveTo(112, 318); x.quadraticCurveTo(116, 262, 158, 226); x.stroke();
      x.strokeStyle = "rgba(255,255,255,.3)"; x.lineWidth = 2; x.beginPath(); x.moveTo(189.5, 70); x.lineTo(189.5, 146); x.stroke();
      x.strokeStyle = "rgba(255,255,255,.1)"; x.lineWidth = 3; x.beginPath(); x.moveTo(290, 350); x.quadraticCurveTo(286, 392, 256, 414); x.stroke();
      support(true);
      // la couronne des vases du Splendor solis
      if(S.crown){ g = x.createLinearGradient(0, 70, 0, 100); g.addColorStop(0, "#f6dc8a"); g.addColorStop(1, "#b98524"); x.fillStyle = g; x.strokeStyle = "rgba(60,36,6,.8)"; x.lineWidth = 1;
        x.beginPath(); x.moveTo(174, 100); x.lineTo(172, 78); x.lineTo(184, 88); x.lineTo(191, 70); x.lineTo(200, 86); x.lineTo(209, 70); x.lineTo(216, 88); x.lineTo(228, 78); x.lineTo(226, 100); x.closePath(); x.fill(); x.stroke();
        x.fillStyle = "#c2311f"; [[184, 94], [200, 94], [216, 94]].forEach(q => { x.beginPath(); x.arc(q[0], q[1], 2, 0, TAU); x.fill(); }); }
      // la fêlure
      if(S.crack > .01){ x.strokeStyle = `rgba(255,255,255,${.8*S.crack})`; x.lineWidth = 1.3; x.beginPath();
        [[118,300,138,318,128,338,150,352,144,372],[138,318,160,312,172,326],[284,290,268,306,276,326,258,338],[128,338,112,350]].forEach(c => { x.moveTo(c[0], c[1]); for(let i = 2; i < c.length; i += 2) x.lineTo(c[i], c[i + 1]); }); x.stroke(); }
      // les étincelles
      if(spk.length){ x.globalCompositeOperation = "lighter"; for(const s of spk){ const u = s.life/s.max; blit(s.c, s.x, s.y, s.r*(1 - u*.5), (1 - u)*.9); } x.globalAlpha = 1; x.globalCompositeOperation = "source-over"; }
    }

    function frame(ts){
      if(!alive) return;
      if(!cv.isConnected){ destroy(); return; }
      raf = requestAnimationFrame(frame);
      if(!vis || document.hidden){ last = ts; return; }
      const dt = Math.min(.05, (ts - (last || ts))/1000); last = ts;
      if(api.onFrame) try{ api.onFrame(dt); }catch(e){}
      update(dt); draw();
    }
    function burst(kind){
      const c = kind === "blanc" ? white : kind === "jaune" || kind === "or" ? fl[0] : kind === "rouge" ? fl[2] : kind === "paon" ? null : fl[1];
      for(let i = 0; i < (calm ? 20 : 70); i++){ const a = R()*TAU, v = 60 + R()*220; spk.push({x:200, y:330, vx:Math.cos(a)*v, vy:Math.sin(a)*v - 60, life:0, max:.7 + R()*.9, r:5 + R()*9, c:c || hues[i % 6]}); }
    }
    function destroy(){ alive = false; cancelAnimationFrame(raf); try{ io && io.disconnect(); }catch(e){} }
    let io = null;
    try{ io = new IntersectionObserver(es => { vis = es[0].isIntersecting; }); io.observe(cv); }catch(e){}
    V.dry = S.dry; api.L = 318; raf = requestAnimationFrame(frame);
    return Object.assign(api, {burst, destroy, draw});
  }

  /* une petite fiole au trait, pour les listes et les repères */
  function mini(hex, o = {}){
    const lvl = o.level == null ? .55 : o.level, y = 88 - lvl*46;
    return `<svg class="al-mini ${o.cls || ""}" viewBox="0 0 64 100" aria-hidden="true"><defs><clipPath id="alm${o.id || ""}"><path d="M27 8v18C27 40 8 46 8 66a24 24 0 0 0 48 0C56 46 37 40 37 26V8z"/></clipPath></defs>
      <g clip-path="url(#alm${o.id || ""})"><rect x="0" y="${y}" width="64" height="100" fill="${hex}"/><rect x="0" y="${y}" width="64" height="3" fill="#fff" opacity=".28"/></g>
      <path d="M27 8v18C27 40 8 46 8 66a24 24 0 0 0 48 0C56 46 37 40 37 26V8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M24 8h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 62c1-8 6-13 11-17" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".45"/></svg>`;
  }
  return {create, mini, colAt, STOPS};
})();
