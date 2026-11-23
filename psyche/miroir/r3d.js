/* ===== Arcanes · Psyché · Le Miroir : le moteur 3D =====
   Un lancer de rayons sur grille (murs de hauteur 1, vue à la première personne), rendu en basse définition
   et agrandi sans lissage : gros pixels, brouillard, sprites toujours face au joueur. Aucune bibliothèque.
   Un niveau = {map:[lignes], walls:{car:texture}, sprites:[], fog:[r,g,b], dens, sky, floor, speed, tick, onCell}. */
window.MiroirR3D = function(canvas){
  const ctx = canvas.getContext("2d");
  let W = 160, H = 100, img, buf, zb, proj = 1, lvl = null, grid = [], raf = 0, last = 0, T = 0;
  let FOV = 1.05; const P = {x:1.5, y:1.5, a:0}, keys = {}, stick = {on:false, x:0, y:0, id:null, x0:0, y0:0, moved:false, t0:0};
  const E = {P, pause:false, dim:1, target:null, onTarget:null, onAct:null, auto:false, onStep:null};
  function resize(){
    const r = canvas.getBoundingClientRect(); if(!r.width || !r.height) return;
    const portrait = r.height > r.width*1.1;
    W = portrait ? 132 : Math.min(240, Math.max(180, Math.round(r.width/4.5))); FOV = portrait ? .8 : 1.05;
    H = Math.max(80, Math.min(300, Math.round(W*r.height/r.width)));
    canvas.width = W; canvas.height = H; img = ctx.createImageData(W, H); buf = new Uint32Array(img.data.buffer); zb = new Float32Array(W);
    proj = (W/2)/Math.tan(FOV/2);
  }
  const cell = (x, y) => (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) ? " " : grid[y][x];
  const solid = (x, y) => { const c = cell(x | 0, y | 0); return !!(lvl.walls[c]); };
  function load(L, at){
    lvl = L; grid = L.map.map(r => r.split("")); L.mk = {};
    grid.forEach((row, y) => row.forEach((c, x) => { if(c !== " " && c !== "." && !L.walls[c]){ (L.mk[c] = L.mk[c] || []).push([x + .5, y + .5]); row[x] = "."; } }));
    const s = at || (L.mk.S && L.mk.S[0]) || [1.5, 1.5]; P.x = s[0]; P.y = s[1]; P.a = L.a0 != null ? L.a0 : 0; lastCell = ""; E.target = null; E.auto = false;
    if(L.init) L.init(E, L);
  }
  const setCell = (x, y, c) => { if(grid[y]) grid[y][x] = c; };
  /* ---------- le rendu ----------
     Chaque surface a une couleur de la palette et reçoit une quantité de lumière (0 à 1) ; la trame de Bayer
     choisit le cran dans la rampe. Le brouillard, c'est simplement la lumière qui baisse avec la distance. */
  const PX = window.MiroirPix, LUT = PX.LUT, BAY = PX.BAYER;
  const hash = (x, y) => { let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0)/4294967295; };
  const lv = (L, x, y) => { const v = (L*7 + BAY[(x & 3) | ((y & 3) << 2)]) | 0; return v > 7 ? 7 : v < 0 ? 0 : v; };
  const lit = (wx, wy) => { const Ls = lvl.lights; let a = 0; if(Ls) for(let k = 0; k < Ls.length; k++){ const l = Ls[k]; if(l[4] === 0) continue; const q = 1 - Math.hypot(wx - l[0], wy - l[1])/l[2]; if(q > 0) a += l[3]*q*q; } return a; };
  function frame(){
    const dx = Math.cos(P.a), dy = Math.sin(P.a), pl = Math.tan(FOV/2), px = -dy*pl, py = dx*pl, hz = H >> 1, dens = lvl.dens, far = lvl.far || 22, lum = (lvl.lum == null ? .8 : lvl.lum)*(E.dim == null ? 1 : E.dim), hasL = lvl.lights && lvl.lights.length;
    /* ciel ou plafond, puis sol */
    for(let y = 0; y < H; y++){
      const row = y*W;
      if(y < hz){
        if(lvl.sky){ const k = y/hz, s = lvl.sky, L = s[1] + (s[2] - s[1])*k*k*k; for(let x = 0; x < W; x++) buf[row + x] = LUT[s[0]*8 + lv(L, x, y)]; }
        else { const d = (.5*proj)/(hz - y), L = lum*Math.exp(-d*dens)*.8, c = lvl.ceil || 13; if(!hasL || d > 9){ for(let x = 0; x < W; x++) buf[row + x] = LUT[c*8 + lv(L, x, y)]; }
          else { const fx0 = P.x + d*(dx - px), fy0 = P.y + d*(dy - py), sx = d*2*px/W, sy = d*2*py/W; for(let x = 0; x < W; x++) buf[row + x] = LUT[c*8 + lv(L + lit(fx0 + sx*x, fy0 + sy*x)*.6, x, y)]; } }
      } else {
        const d = (.5*proj)/(y - hz + .5), L = lum*Math.exp(-d*dens), mode = lvl.floor || "plain", c1 = lvl.floorC || 12, c2 = lvl.floorC2 || c1;
        if(d > far){ for(let x = 0; x < W; x++) buf[row + x] = LUT[c1*8 + lv(L, x, y)]; }
        else { const fx0 = P.x + d*(dx - px), fy0 = P.y + d*(dy - py), sx = d*2*px/W, sy = d*2*py/W;
          for(let x = 0; x < W; x++){ const wx = fx0 + sx*x, wy = fy0 + sy*x; let c = c1, LL = L;
            if(mode === "spark"){ if(d > 3.2){ const gx = wx*2.5, gy = wy*2.5, ix = Math.floor(gx), iy = Math.floor(gy), h = hash(ix, iy); if(h > .9){ const ux = gx - ix - .5, uy = gy - iy - .5; if(ux*ux + uy*uy < (.01 + (h - .9)*.12)*Math.min(1, d/9)){ c = h > .985 ? 19 : 7; LL = (.34 + .3*Math.sin(T*1.6 + h*90))*Math.min(1, 1.6*Math.exp(-d*.06)) + .06; } } } }
            else if(mode === "planks"){ const u = wx - Math.floor(wx); if(u < .07 || ((wy*.5 - Math.floor(wy*.5)) < .035 && hash(Math.floor(wx), Math.floor(wy*.5)) > .35)) c = c2; }
            else if(mode === "tiles"){ if(((Math.floor(wx) + Math.floor(wy)) & 1)) c = c2; }
            else if(mode === "earth"){ const s = d > 6 ? 4 : d > 3 ? 8 : d > 1.5 ? 16 : 32, h = hash(Math.floor(wx*s), Math.floor(wy*s) + s*977); if(h > .72) LL -= .075; else if(h < .1) LL += .05; }
            if(hasL && d < 10) LL += lit(wx, wy);
            buf[row + x] = LUT[c*8 + lv(LL, x, y)]; } }
      }
    }
    /* les étoiles */
    if(lvl.stars){ const st = lvl.stars; for(let i = 0; i < st.length; i++){ const s = st[i]; let da = s[0] - P.a; da = Math.atan2(Math.sin(da), Math.cos(da)); if(Math.abs(da) > FOV*.62) continue;
        const x = (W/2 + Math.tan(da)*proj) | 0, y = (hz - 1 - s[1]*hz*1.05) | 0; if(x < 0 || x >= W || y < 0 || y >= hz) continue;
        const tw = .55 + .45*Math.sin(T*s[3] + i), b = s[2]*tw; buf[y*W + x] = LUT[(s[4] || 7)*8 + (b > .8 ? 7 : b > .6 ? 5 : b > .4 ? 4 : 3)];
        if(lvl.mirror){ const y2 = hz + (hz - 1 - y); if(y2 < H && b > .45) buf[y2*W + x] = LUT[(s[4] || 7)*8 + (b > .8 ? 4 : 3)]; }
        if(s[2] > .94 && b > .8){ if(x + 1 < W) buf[y*W + x + 1] = LUT[6*8 + 4]; if(x > 0) buf[y*W + x - 1] = LUT[6*8 + 4]; if(y > 0) buf[(y - 1)*W + x] = LUT[6*8 + 4]; if(y + 1 < hz) buf[(y + 1)*W + x] = LUT[6*8 + 4]; } } }
    /* les constellations allumées : des étoiles d'or reliées par un pointillé */
    if(lvl.consts){ for(const c of lvl.consts){ if(!c.on) continue; const q = c.pts.map(p => { let da = p[0] - P.a; da = Math.atan2(Math.sin(da), Math.cos(da)); return Math.abs(da) > 1.25 ? null : [(W/2 + Math.tan(da)*proj) | 0, (hz - 1 - p[1]*hz*1.05) | 0]; });
        for(const l of c.lines){ const A = q[l[0]], B = q[l[1]]; if(!A || !B) continue; const n = Math.max(Math.abs(B[0] - A[0]), Math.abs(B[1] - A[1])); for(let k = 2; k < n - 1; k += 2){ const x = (A[0] + (B[0] - A[0])*k/n) | 0, y = (A[1] + (B[1] - A[1])*k/n) | 0; if(x >= 0 && x < W && y >= 0 && y < hz) buf[y*W + x] = LUT[17*8 + (c.neuf ? 5 : 3)]; } }
        q.forEach((A, i) => { if(!A) return; const x = A[0], y = A[1], tw = Math.sin(T*1.7 + i*2) > -.6 ? 7 : 5; for(const [ox, oy, l] of [[0, 0, tw], [1, 0, 4], [-1, 0, 4], [0, 1, 4], [0, -1, 4]]){ const xx = x + ox, yy = y + oy; if(xx >= 0 && xx < W && yy >= 0 && yy < hz) buf[yy*W + xx] = LUT[19*8 + l]; } }); } }
    /* les murs */
    let tgt = null;
    for(let x = 0; x < W; x++){
      const cam = 2*x/W - 1, rx = dx + px*cam, ry = dy + py*cam; let mx = P.x | 0, my = P.y | 0;
      const ddx = Math.abs(1/rx), ddy = Math.abs(1/ry), stx = rx < 0 ? -1 : 1, sty = ry < 0 ? -1 : 1;
      let sdx = rx < 0 ? (P.x - mx)*ddx : (mx + 1 - P.x)*ddx, sdy = ry < 0 ? (P.y - my)*ddy : (my + 1 - P.y)*ddy, side = 0, hit = null, n = 0, d = 0;
      while(n++ < 64){ if(sdx < sdy){ d = sdx; sdx += ddx; mx += stx; side = 0; } else { d = sdy; sdy += ddy; my += sty; side = 1; } if(d > far) break; const c = cell(mx, my); if(lvl.walls[c]){ hit = c; break; } }
      if(!hit){ zb[x] = 1e9; continue; }
      zb[x] = d; if(x === (W >> 1) && d < 1.5) tgt = {wall:hit, x:mx, y:my, d};
      const tex = lvl.walls[hit], lh = proj/d; let u = side ? P.x + d*rx : P.y + d*ry; u -= Math.floor(u); if((side === 0 && rx < 0) || (side === 1 && ry > 0)) u = 1 - u;
      const tx = Math.min(tex.w - 1, (u*tex.w) | 0), y0 = hz - lh/2, ya = Math.max(0, y0 | 0), yb = Math.min(H, (y0 + lh) | 0), stp = tex.h/lh;
      let L = tex.em ? Math.max(.5, .82*Math.exp(-d*dens*.4)) : lum*Math.exp(-d*dens)*(side ? .8 : 1) + (hasL && d < 12 ? lit(P.x + (d - .05)*rx, P.y + (d - .05)*ry) : 0);
      for(let y = ya; y < yb; y++){ let ty = ((y - y0)*stp) | 0; if(ty < 0) ty = 0; else if(ty >= tex.h) ty = tex.h - 1; buf[y*W + x] = LUT[tex.i[ty*tex.w + tx]*8 + lv(L, x, y)]; }
    }
    /* les sprites, du plus loin au plus près */
    const sp = lvl.sprites.filter(s => !s.off); for(const s of sp){ s._d = (s.x - P.x)**2 + (s.y - P.y)**2; } sp.sort((a, b) => b._d - a._d);
    const inv = 1/(px*dy - dx*py); let best = null;
    for(const s of sp){
      const ox = s.x - P.x, oy = s.y - P.y, tX = inv*(dy*ox - dx*oy), tY = inv*(-py*ox + px*oy); if(tY < .12) continue;
      const tex = typeof s.tex === "function" ? s.tex(E, s) : s.tex; if(!tex) continue;
      const scx = (W/2)*(1 + tX/tY), hh = proj/tY*(s.h || 1), ww = hh*(tex.w/tex.h)*(s.wf == null ? 1 : s.wf), bot = hz + proj/tY*(.5 - (s.z || 0)), top = bot - hh;
      const xa = Math.max(0, (scx - ww/2) | 0), xb = Math.min(W, (scx + ww/2) | 0), ya = Math.max(0, top | 0), yb = Math.min(H, bot | 0); if(ww < .6) continue;
      const em = s.em || tex.em, L = em ? Math.max(s.emMin || 0, (s.emL || .78)*Math.exp(-tY*dens*(s.emK == null ? .35 : s.emK))) : lum*Math.exp(-tY*dens) + (hasL ? lit(s.x, s.y) : 0), al = s.alpha == null ? 1 : s.alpha;
      for(let x = xa; x < xb; x++){ if(tY >= zb[x]) continue; const tx = Math.min(tex.w - 1, ((x - (scx - ww/2))/ww*tex.w) | 0);
        for(let y = ya; y < yb; y++){ const ti = (Math.min(tex.h - 1, ((y - top)/hh*tex.h) | 0))*tex.w + tx;
          if(al < 1 && BAY[(x & 3) | ((y & 3) << 2)] > al) continue;
          if(tex.raw){ const p = tex.d[ti]; if((p >>> 24) < 128) continue; if(L >= .7){ buf[y*W + x] = p; } else { const f = Math.min(1, (lv(L, x, y) + 1)/6); buf[y*W + x] = (255 << 24) | ((((p >> 16) & 255)*f) << 16) | ((((p >> 8) & 255)*f) << 8) | ((p & 255)*f); } }
          else { const c = tex.i[ti]; if(!c) continue; buf[y*W + x] = LUT[c*8 + lv(L, x, y)]; } } }
      if(s.act && !s.noAct){ const dist = Math.sqrt(s._d), ang = Math.abs(Math.atan2(tX, tY)); if(dist < (s.range || 1.9) && ang < .42 && (!best || dist < best.d)) best = {sprite:s, d:dist}; }
    }
    if(best) tgt = best; else if(tgt && !(lvl.wallAct && lvl.wallAct[tgt.wall])) tgt = null;
    if(lvl.post) lvl.post(buf, W, H, T, E);
    ctx.putImageData(img, 0, 0);
    const lab = tgt ? (tgt.sprite ? (typeof tgt.sprite.label === "function" ? tgt.sprite.label() : tgt.sprite.label) : (typeof lvl.wallAct[tgt.wall].label === "function" ? lvl.wallAct[tgt.wall].label(tgt) : lvl.wallAct[tgt.wall].label)) : null;
    if(!lab) tgt = null;
    if((E.target && E.target.lab) !== lab){ E.target = tgt ? Object.assign(tgt, {lab}) : null; if(E.onTarget) E.onTarget(lab); } else if(tgt) E.target = Object.assign(tgt, {lab});
  }
  /* ---------- le déplacement ---------- */
  let lastCell = "", walked = 0;
  function update(dt){
    let f = 0, r = 0;
    if(keys.ArrowUp || keys.z || keys.w) f += 1; if(keys.ArrowDown || keys.s) f -= 1; if(keys.ArrowLeft || keys.q || keys.a) r -= 1; if(keys.ArrowRight || keys.d) r += 1;
    if(stick.on && stick.moved){ f += Math.max(-1, Math.min(1, -stick.y/46)); r += Math.max(-1, Math.min(1, stick.x/52)); }
    if(E.auto) f = Math.max(f, 1);
    f = Math.max(-1, Math.min(1, f)); r = Math.max(-1.2, Math.min(1.2, r));
    P.a += r*(lvl.turn || 1.9)*dt;
    const v = f*(f < 0 ? .6 : 1)*(lvl.speed || 1.7)*dt; if(v){ const nx = P.x + Math.cos(P.a)*v, ny = P.y + Math.sin(P.a)*v, m = .22;
      const okx = !solid(nx + (v*Math.cos(P.a) > 0 ? m : -m), P.y) && !solid(nx, P.y), oky = !solid(P.x, ny + (v*Math.sin(P.a) > 0 ? m : -m)) && !solid(P.x, ny);
      if(okx && (!lvl.block || !lvl.block(nx, P.y))) P.x = nx; if(oky && (!lvl.block || !lvl.block(P.x, ny))) P.y = ny;
      walked += Math.abs(v); if(walked > .62){ walked = 0; if(E.onStep) E.onStep(); } }
    const k = (P.x | 0) + "," + (P.y | 0); if(k !== lastCell){ lastCell = k; if(lvl.onCell) lvl.onCell(P.x | 0, P.y | 0, E); }
    if(lvl.tick) lvl.tick(dt, E, T);
  }
  function loop(t){ raf = requestAnimationFrame(loop); const dt = Math.min(.05, (t - last)/1000 || 0); last = t; if(!lvl || !img) return; if(!E.pause){ T += dt; update(dt); } frame(); }
  /* ---------- les commandes ---------- */
  const kd = e => { if(E.pause) return; const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(k)) e.preventDefault(); keys[k] = true; if((k === " " || k === "Enter" || k === "e") && E.target && E.onAct){ e.preventDefault(); E.onAct(E.target); } };
  const ku = e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = false; };
  const pd = e => { if(E.pause) return; stick.on = true; stick.id = e.pointerId; stick.x0 = e.clientX; stick.y0 = e.clientY; stick.x = stick.y = 0; stick.moved = false; stick.t0 = performance.now(); try{ canvas.setPointerCapture(e.pointerId); }catch(_){} if(E.onStick) E.onStick(true, e.clientX, e.clientY); };
  const pm = e => { if(!stick.on || e.pointerId !== stick.id) return; stick.x = e.clientX - stick.x0; stick.y = e.clientY - stick.y0; if(Math.abs(stick.x) + Math.abs(stick.y) > 10) stick.moved = true; if(E.onStick) E.onStick(true, stick.x0, stick.y0, stick.x, stick.y); };
  const pu = e => { if(!stick.on || e.pointerId !== stick.id) return; const tap = !stick.moved && performance.now() - stick.t0 < 400; stick.on = false; if(E.onStick) E.onStick(false); if(tap && E.target && E.onAct && !E.pause) E.onAct(E.target); };
  function start(){ resize(); addEventListener("keydown", kd); addEventListener("keyup", ku); canvas.addEventListener("pointerdown", pd); canvas.addEventListener("pointermove", pm); canvas.addEventListener("pointerup", pu); canvas.addEventListener("pointercancel", pu); addEventListener("resize", resize); last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop(){ cancelAnimationFrame(raf); removeEventListener("keydown", kd); removeEventListener("keyup", ku); removeEventListener("resize", resize); canvas.removeEventListener("pointerdown", pd); canvas.removeEventListener("pointermove", pm); canvas.removeEventListener("pointerup", pu); canvas.removeEventListener("pointercancel", pu); }
  const clearKeys = () => { for(const k in keys) keys[k] = false; stick.on = false; };
  return Object.assign(E, {load, start, stop, resize, setCell, cell, solid, clearKeys, time:() => T, level:() => lvl, hash, size:() => [W, H]});
};
