/* ===== Arcanes · Psyché · Le Miroir : le moteur 3D =====
   Un lancer de rayons sur grille (murs de hauteur 1, vue à la première personne), rendu en basse définition
   et agrandi sans lissage : gros pixels, brouillard, sprites toujours face au joueur. Aucune bibliothèque.
   Un niveau = {map:[lignes], walls:{car:texture}, sprites:[], fog:[r,g,b], dens, sky, floor, speed, tick, onCell}.
   Il peut aussi porter des volumes pleins (mesh), un sol à plusieurs hauteurs (ground) et un regard qui se lève (E.pitch). */
window.MiroirR3D = function(canvas){
  const ctx = canvas.getContext("2d");
  let W = 160, H = 100, img, buf, zb, zp, proj = 1, lvl = null, grid = [], raf = 0, last = 0, T = 0;
  let FOV = 1.05; const P = {x:1.5, y:1.5, a:0, z:0}, keys = {}, stick = {on:false, x:0, y:0, id:null, x0:0, y0:0, moved:false, t0:0};
  const E = {P, pause:false, dim:1, pitch:0, target:null, onTarget:null, onAct:null, auto:false, onStep:null};
  function resize(){
    const r = canvas.getBoundingClientRect(); if(!r.width || !r.height) return;
    const portrait = r.height > r.width*1.1;
    W = portrait ? 132 : Math.min(240, Math.max(180, Math.round(r.width/4.5))); FOV = portrait ? .8 : 1.05;
    H = Math.max(80, Math.min(300, Math.round(W*r.height/r.width)));
    canvas.width = W; canvas.height = H; img = ctx.createImageData(W, H); buf = new Uint32Array(img.data.buffer); zb = new Float32Array(W); zp = new Float32Array(W*H);
    proj = (W/2)/Math.tan(FOV/2);
  }
  const cell = (x, y) => (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) ? " " : grid[y][x];
  const solid = (x, y) => { const c = cell(x | 0, y | 0); return !!(lvl.walls[c]); };
  function load(L, at){
    lvl = L; grid = L.map.map(r => r.split("")); L.mk = {};
    grid.forEach((row, y) => row.forEach((c, x) => { if(c !== " " && c !== "." && !L.walls[c]){ (L.mk[c] = L.mk[c] || []).push([x + .5, y + .5]); row[x] = "."; } }));
    const s = at || (L.mk.S && L.mk.S[0]) || [1.5, 1.5]; P.x = s[0]; P.y = s[1]; P.a = L.a0 != null ? L.a0 : 0; P.z = L.ground ? L.ground(P.x, P.y) : 0; E.pitch = 0; lastCell = ""; E.target = null; E.auto = false;
    if(L.init) L.init(E, L);
  }
  const setCell = (x, y, c) => { if(grid[y]) grid[y][x] = c; };
  /* ---------- le rendu ----------
     Chaque surface a une couleur de la palette et reçoit une quantité de lumière (0 à 1) ; la trame de Bayer
     choisit le cran dans la rampe. Le brouillard, c'est simplement la lumière qui baisse avec la distance. */
  const PX = window.MiroirPix, LUT = PX.LUT, BAY = PX.BAYER;
  const hash = (x, y) => { let n = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0)/4294967295; };
  const lv = (L, x, y) => { const v = (L*7 + BAY[(x & 3) | ((y & 3) << 2)]) | 0; return v > 7 ? 7 : v < 0 ? 0 : v; };
  const LA = [], lit = (wx, wy) => { const Ls = LA; let a = 0; for(let k = 0; k < Ls.length; k++){ const l = Ls[k]; const q = 1 - Math.hypot(wx - l[0], wy - l[1])/l[2]; if(q > 0) a += l[3]*q*q; } return a; };
  function frame(){
    const dx = Math.cos(P.a), dy = Math.sin(P.a), pl = Math.tan(FOV/2), px = -dy*pl, py = dx*pl, hz = Math.max(6, Math.min(H - 6, (H >> 1) + Math.round((E.pitch || 0)*H))), eye = .5 + (P.z || 0), M = lvl.mesh, dens = lvl.dens, far = lvl.far || 22, lum = (lvl.lum == null ? .8 : lvl.lum)*(E.dim == null ? 1 : E.dim);
    /* seules comptent les lumières allumées et assez proches pour toucher ce qu'on voit */
    LA.length = 0; if(lvl.lights) for(const l of lvl.lights) if(l[4] !== 0 && l[3] > 0 && Math.hypot(l[0] - P.x, l[1] - P.y) < l[2] + 12) LA.push(l); const hasL = LA.length > 0;
    /* les volumes d'abord : le fond ne sera peint que là où ils ne sont pas */
    if(M){ zp.fill(1e9); if(E.prof){ const t0 = performance.now(); drawMesh(M, dx, dy, hz, eye); E.prof.mesh += performance.now() - t0; E.prof.n++; } else drawMesh(M, dx, dy, hz, eye); }
    /* ciel ou plafond, puis sol */
    for(let y = 0; y < H; y++){
      const row = y*W;
      if(y < hz){
        if(lvl.sky){ const k = y/hz, s = lvl.sky, L = s[1] + (s[2] - s[1])*k*k*k; for(let x = 0; x < W; x++) if(!M || zp[row + x] > 1e8) buf[row + x] = LUT[s[0]*8 + lv(L, x, y)]; }
        else { const d = ((1 - eye)*proj)/(hz - y), L = lum*Math.exp(-d*dens)*.8, c = lvl.ceil || 13; if(!hasL || d > 9){ for(let x = 0; x < W; x++) if(!M || zp[row + x] > 1e8) buf[row + x] = LUT[c*8 + lv(L, x, y)]; }
          else { const fx0 = P.x + d*(dx - px), fy0 = P.y + d*(dy - py), sx = d*2*px/W, sy = d*2*py/W; for(let x = 0; x < W; x++) if(!M || zp[row + x] > 1e8) buf[row + x] = LUT[c*8 + lv(L + lit(fx0 + sx*x, fy0 + sy*x)*.6, x, y)]; } }
      } else {
        const d = (eye*proj)/(y - hz + .5), L = lum*Math.exp(-d*dens), mode = lvl.floor || "plain", c1 = lvl.floorC || 12, c2 = lvl.floorC2 || c1;
        if(d > far){ for(let x = 0; x < W; x++) if(!M || zp[row + x] > 1e8) buf[row + x] = LUT[c1*8 + lv(L, x, y)]; }
        else { const fx0 = P.x + d*(dx - px), fy0 = P.y + d*(dy - py), sx = d*2*px/W, sy = d*2*py/W;
          for(let x = 0; x < W; x++){ if(M && zp[row + x] < 1e8) continue; const wx = fx0 + sx*x, wy = fy0 + sy*x; let c = c1, LL = L;
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
        const tw = .55 + .45*Math.sin(T*s[3] + i), b = s[2]*tw; if(M && zp[y*W + x] < 1e8) continue; buf[y*W + x] = LUT[(s[4] || 7)*8 + (b > .8 ? 7 : b > .6 ? 5 : b > .4 ? 4 : 3)];
        if(lvl.mirror){ const y2 = hz + (hz - 1 - y); if(y2 < H && b > .45 && !(M && zp[y2*W + x] < 1e8)) buf[y2*W + x] = LUT[(s[4] || 7)*8 + (b > .8 ? 4 : 3)]; }
        if(s[2] > .94 && b > .8 && !M){ if(x + 1 < W) buf[y*W + x + 1] = LUT[6*8 + 4]; if(x > 0) buf[y*W + x - 1] = LUT[6*8 + 4]; if(y > 0) buf[(y - 1)*W + x] = LUT[6*8 + 4]; if(y + 1 < hz) buf[(y + 1)*W + x] = LUT[6*8 + 4]; } } }
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
      const tx = Math.min(tex.w - 1, (u*tex.w) | 0), y0 = hz - lh*(1 - eye), ya = Math.max(0, y0 | 0), yb = Math.min(H, (y0 + lh) | 0), stp = tex.h/lh;
      let L = tex.em ? Math.max(.5, .82*Math.exp(-d*dens*.4)) : lum*Math.exp(-d*dens)*(side ? .8 : 1) + (hasL && d < 12 ? lit(P.x + (d - .05)*rx, P.y + (d - .05)*ry) : 0);
      for(let y = ya; y < yb; y++){ let ty = ((y - y0)*stp) | 0; if(ty < 0) ty = 0; else if(ty >= tex.h) ty = tex.h - 1; if(M){ if(d >= zp[y*W + x]) continue; zp[y*W + x] = d; } buf[y*W + x] = LUT[tex.i[ty*tex.w + tx]*8 + lv(L, x, y)]; }
    }
    /* les sprites, du plus loin au plus près */
    const sp = lvl.sprites.filter(s => !s.off); for(const s of sp){ s._d = (s.x - P.x)**2 + (s.y - P.y)**2; } sp.sort((a, b) => b._d - a._d);
    const inv = 1/(px*dy - dx*py); let best = null;
    for(const s of sp){
      const ox = s.x - P.x, oy = s.y - P.y, tX = inv*(dy*ox - dx*oy), tY = inv*(-py*ox + px*oy); if(tY < .12) continue;
      const tex = typeof s.tex === "function" ? s.tex(E, s) : s.tex; if(!tex) continue;
      const scx = (W/2)*(1 + tX/tY), hh = proj/tY*(s.h || 1), ww = hh*(tex.w/tex.h)*(s.wf == null ? 1 : s.wf), bot = hz + proj/tY*(eye - (s.z || 0)), top = bot - hh;
      const xa = Math.max(0, (scx - ww/2) | 0), xb = Math.min(W, (scx + ww/2) | 0), ya = Math.max(0, top | 0), yb = Math.min(H, bot | 0); if(ww < .6) continue;
      const em = s.em || tex.em, L = em ? Math.max(s.emMin || 0, (s.emL || .78)*Math.exp(-tY*dens*(s.emK == null ? .35 : s.emK))) : lum*Math.exp(-tY*dens) + (hasL ? lit(s.x, s.y) : 0), al = s.alpha == null ? 1 : s.alpha;
      for(let x = xa; x < xb; x++){ if(tY >= zb[x]) continue; const tx = Math.min(tex.w - 1, ((x - (scx - ww/2))/ww*tex.w) | 0);
        for(let y = ya; y < yb; y++){ if(M && tY >= zp[y*W + x]) continue; const ti = (Math.min(tex.h - 1, ((y - top)/hh*tex.h) | 0))*tex.w + tx;
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
  /* ---------- les volumes ----------
     Un niveau peut porter de vrais volumes (lvl.mesh, construit par vol.js) : des faces planes et convexes, remplies ligne à ligne
     avec une profondeur par pixel. Même palette, même trame, même brouillard : seule la forme est pleine.
     Une face : p (sommets x,y,z), uv (ses deux axes, en unités du monde), n (normale), c (couleur), mat (appareil de pierre). */
  const NEAR = .07, CV = new Float32Array(5*16), SX = new Float32Array(16), SY = new Float32Array(16), IZ = new Float32Array(16), UZ = new Float32Array(16), VZ = new Float32Array(16);
  function meshPrep(M){ const Ls = M.lights || [];
    for(const f of M.faces){ f.lt = []; Ls.forEach((l, i) => { if(!((f.g || 1) & (l.g || 1))) return; if(f.nx*(l.x - f.p[0]) + f.ny*(l.y - f.p[1]) + f.nz*(l.z - f.p[2]) <= .01) return; if(Math.hypot(l.x - f.cx, l.y - f.cy, l.z - f.cz) > l.r + f.rad) return; f.lt.push(l); }); }
    M._ord = M.faces.map((_, i) => i); M._sx = 1e9; M._ok = true; }
  function drawMesh(M, dx, dy, hz, eye){
    if(!M._ok) meshPrep(M);
    const F = M.faces, sun = M.sun || [0, 0, 1], dm = E.dim == null ? 1 : E.dim, amb = (M.amb == null ? .3 : M.amb)*dm, sI = (M.sunI == null ? .4 : M.sunI)*dm, sky = (M.sky || 0)*dm, hw = W/2, kd = M.dens == null ? lvl.dens : M.dens, cxp = P.x, cyp = P.y;
    /* du plus proche au plus loin : ce qui est caché est écarté avant d'être éclairé */
    if(Math.abs(cxp - M._sx) + Math.abs(cyp - M._sy) > .3 || M._sx === 1e9){ M._sx = cxp; M._sy = cyp; for(const f of F) f._d = (f.cx - cxp)**2 + (f.cy - cyp)**2 + (f.cz - eye)**2 - f.rad*f.rad; M._ord.sort((a, b) => F[a]._d - F[b]._d); }
    const ord = M._ord;
    for(let fi = 0; fi < ord.length; fi++){ const f = F[ord[fi]]; if(f.off) continue; const p = f.p, uv = f.uv, nv = f.n;
      if(!f.two && f.nx*(cxp - p[0]) + f.ny*(cyp - p[1]) + f.nz*(eye - p[2]) <= 0) continue;
      /* vers la caméra, et coupe au plan proche */
      let n = 0, j = nv - 1, ox = p[j*3] - cxp, oy = p[j*3 + 1] - cyp, pl = -dy*ox + dx*oy, pd = dx*ox + dy*oy, ph = p[j*3 + 2] - eye, pu = uv[j*2], pv = uv[j*2 + 1];
      for(let i = 0; i < nv; i++){ ox = p[i*3] - cxp; oy = p[i*3 + 1] - cyp; const cl = -dy*ox + dx*oy, cd = dx*ox + dy*oy, ch = p[i*3 + 2] - eye, cu = uv[i*2], cw = uv[i*2 + 1];
        if((pd >= NEAR) !== (cd >= NEAR)){ const t = (NEAR - pd)/(cd - pd), o = n*5; CV[o] = pl + t*(cl - pl); CV[o + 1] = ph + t*(ch - ph); CV[o + 2] = NEAR; CV[o + 3] = pu + t*(cu - pu); CV[o + 4] = pv + t*(cw - pv); n++; }
        if(cd >= NEAR){ const o = n*5; CV[o] = cl; CV[o + 1] = ch; CV[o + 2] = cd; CV[o + 3] = cu; CV[o + 4] = cw; n++; }
        pl = cl; pd = cd; ph = ch; pu = cu; pv = cw; }
      if(n < 3) continue;
      let xmin = 1e9, xmax = -1e9, ymin = 1e9, ymax = -1e9;
      for(let i = 0; i < n; i++){ const o = i*5, iz = 1/CV[o + 2], x = hw + proj*CV[o]*iz, y = hz - proj*CV[o + 1]*iz; SX[i] = x; SY[i] = y; IZ[i] = iz; UZ[i] = CV[o + 3]*iz; VZ[i] = CV[o + 4]*iz; if(x < xmin) xmin = x; if(x > xmax) xmax = x; if(y < ymin) ymin = y; if(y > ymax) ymax = y; }
      if(xmax < 0 || xmin >= W || ymax < 0 || ymin >= H) continue;
      const al = f.al ? f.al.v : 1; if(al <= 0) continue;
      const base = f.em != null ? f.em*(al < 1 ? al : 1) : f.ns ? amb*f.ns : amb + sI*Math.max(0, f.nx*sun[0] + f.ny*sun[1] + f.nz*sun[2]) + sky*Math.max(0, f.nz), kf = f.em != null ? 0 : f.k == null ? kd : f.k, mat = f.mat | 0, col = f.c, lt = f.lt, nl = lt.length, tex = f.tex,
        Ux = f.U[0], Uy = f.U[1], Uz = f.U[2], Vx = f.V[0], Vy = f.V[1], Vz = f.V[2], nx = f.nx, ny = f.ny, nz = f.nz, pn = f.pn, bh = f.bh || .42, fmin = f.em != null ? 1 : (M.fogMin || 0);
      let ya = Math.ceil(ymin - .5), yb = Math.floor(ymax - .5); if(ya < 0) ya = 0; if(yb > H - 1) yb = H - 1;
      let nlp = nl, Lc = 0; if(nl && (xmax - xmin)*(ymax - ymin) < 90){ nlp = 0; for(let k = 0; k < nl; k++){ const l = lt[k]; if(!l.i) continue; const lx = l.x - f.cx, ly = l.y - f.cy, lz = l.z - f.cz, dd = Math.sqrt(lx*lx + ly*ly + lz*lz), a = 1 - dd/l.r; if(a > 0){ const nd = (lx*nx + ly*ny + lz*nz)/(dd + .001); Lc += l.i*a*a*(.3 + .7*(nd > 0 ? nd : 0)); } } }
      for(let y = ya; y <= yb; y++){ const yc = y + .5; let xl = 1e9, xr = -1e9, izl = 0, izr = 0, uzl = 0, uzr = 0, vzl = 0, vzr = 0;
        for(let i = 0, k = n - 1; i < n; k = i++){ const y1 = SY[k], y2 = SY[i]; if((y1 <= yc) === (y2 <= yc)) continue; const t = (yc - y1)/(y2 - y1), x = SX[k] + t*(SX[i] - SX[k]);
          if(x < xl){ xl = x; izl = IZ[k] + t*(IZ[i] - IZ[k]); uzl = UZ[k] + t*(UZ[i] - UZ[k]); vzl = VZ[k] + t*(VZ[i] - VZ[k]); }
          if(x > xr){ xr = x; izr = IZ[k] + t*(IZ[i] - IZ[k]); uzr = UZ[k] + t*(UZ[i] - UZ[k]); vzr = VZ[k] + t*(VZ[i] - VZ[k]); } }
        if(xl > xr) continue; let x0 = Math.ceil(xl - .5), x1 = Math.floor(xr - .5); if(x0 < 0) x0 = 0; if(x1 > W - 1) x1 = W - 1; if(x0 > x1) continue;
        const wd = xr - xl, iw = wd > 1e-6 ? 1/wd : 0, diz = (izr - izl)*iw, duz = (uzr - uzl)*iw, dvz = (vzr - vzl)*iw, s0 = x0 + .5 - xl; let iz = izl + diz*s0, uz = uzl + duz*s0, vz = vzl + dvz*s0, Lp = 0, xp = -9;
        for(let x = x0, idx = y*W + x0; x <= x1; x++, idx++, iz += diz, uz += duz, vz += dvz){ const dep = 1/iz; if(dep >= zp[idx] || (al < 1 && BAY[(x & 3) | ((y & 3) << 2)] > al)) continue; const u = uz*dep, v = vz*dep; let c = col;
          if(tex){ const tu = ((u - f.u0)/f.tw*tex.w) | 0, tv = ((f.v1 - v)/f.th*tex.h) | 0; if(tu < 0 || tv < 0 || tu >= tex.w || tv >= tex.h) continue; c = tex.i[tv*tex.w + tu]; if(!c) continue; }
          zp[idx] = dep; const q = dep*kf; let fog = 1/(1 + q + q*q*.5); if(fog < fmin) fog = fmin; let L = base*fog + Lc;
          if(nlp){ if(x - xp > 1){ xp = x; Lp = 0; const wx = u*Ux + v*Vx + pn*nx, wy = u*Uy + v*Vy + pn*ny, wz = u*Uz + v*Vz + pn*nz; for(let k = 0; k < nl; k++){ const l = lt[k]; if(!l.i) continue; const lx = l.x - wx, ly = l.y - wy, lz = l.z - wz, d2 = lx*lx + ly*ly + lz*lz; if(d2 >= l.r*l.r) continue; const dd = Math.sqrt(d2), a = 1 - dd/l.r, nd = (lx*nx + ly*ny + lz*nz)/(dd + .001); Lp += l.i*a*a*(.3 + .7*(nd > 0 ? nd : 0)); } } L += Lp; }
          if(mat === 1){ const r = v/bh, ri = Math.floor(r); if(dep < 10 && r - ri < .085) L -= .09; else { const g = u/(bh*2.3) + (ri & 1)*.5, gi = Math.floor(g); if(dep < 10 && g - gi < .035) L -= .09; else L += (hash(gi, ri) - .5)*.07; } }
          else if(mat === 2){ const a = u/bh, b = v/bh, ai = Math.floor(a), bi = Math.floor(b); if(dep < 9 && (a - ai < .06 || b - bi < .06)) L -= .08; else L += (hash(ai, bi + 31) - .5)*.08 - (((ai + bi) & 1) ? .03 : 0); }
          else if(mat === 3){ const r = v/.24, ri = Math.floor(r); if(r - ri < .24) L -= .1; else { const g = u/.3 + (ri & 1)*.5; if(dep < 9 && g - Math.floor(g) < .14) L -= .06; } }
          else if(mat === 4){ const t = v - f.z0; if(t < .25){ if(dep < 10) L += (hash(Math.floor(u/1.1), 7) - .5)*.05; } else if(t < .3) L -= .12; else if(t < .53){ const g = u/.55 + .18, fg = g - Math.floor(g); if(fg < .36){ if(dep > 15) L -= .07; else { const b3 = fg/.36*3; if(b3 - Math.floor(b3) < .42) L -= .17; } } else L += .02; } else L += .07; }
          else if(mat === 6){ const a = u/.72, b = v/.72, fa = a - Math.floor(a), fb = b - Math.floor(b); if(fa < .2 || fb < .2) L += .04; else if(fa < .3 || fb < .3) L -= .12; else L -= .06; }
          else if(mat === 7){ const b = v/bh, bi = Math.floor(b), a = u/(bh*1.5) + hash(bi, 3)*.7, ai = Math.floor(a); if(dep < 8 && (a - ai < .05 || b - bi < .07)) L -= .08; else L += (hash(ai, bi) - .5)*.1; }
          let li = (L*7 + BAY[(x & 3) | ((y & 3) << 2)]) | 0; if(li > 7) li = 7; else if(li < 0) li = 0; buf[idx] = LUT[c*8 + li]; } }
    }
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
    if(lvl.ground){ const g = lvl.ground(P.x, P.y); P.z += (g - P.z)*Math.min(1, dt*9); }
    const k = (P.x | 0) + "," + (P.y | 0); if(k !== lastCell){ lastCell = k; if(lvl.onCell) lvl.onCell(P.x | 0, P.y | 0, E); }
    if(lvl.tick) lvl.tick(dt, E, T);
  }
  function loop(t){ raf = requestAnimationFrame(loop); const dt = Math.min(.05, (t - last)/1000 || 0); last = t; if(!lvl || !img) return; if(!E.pause){ T += dt; update(dt); } if(E.prof){ const t0 = performance.now(); frame(); E.prof.all += performance.now() - t0; } else frame(); }
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
