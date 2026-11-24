/* ===== Arcanes · Psyché · Le Miroir : les volumes =====
   De vrais solides pour le moteur 3D : des faces planes, posées dans le monde, que r3d.js remplit avec une profondeur par pixel.
   Ici, on ne fait que construire : des briques (face, boîte, fût), puis les deux bâtiments d'Épidaure, le temple et le portique.
   Les matières (mat) : 0 uni, 1 assises de pierre, 2 dalles, 3 tuiles, 4 entablement à triglyphes, 6 caissons, 7 pavage. */
window.MiroirVol = (() => {
  const PX = window.MiroirPix;
  const norm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0]/l, v[1]/l, v[2]/l]; };
  const cross = (a, b) => [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
  const dot = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  const mesh = o => Object.assign({faces:[], lights:[], circ:[], rects:[], plats:[]}, o || {});
  /* une face : pts dans l'ordre du contour, out = vers où elle regarde */
  function face(M, pts, out, o){
    let n = [0, 0, 0]; for(let i = 0; i < pts.length; i++){ const a = pts[i], b = pts[(i + 1) % pts.length]; n[0] += (a[1] - b[1])*(a[2] + b[2]); n[1] += (a[2] - b[2])*(a[0] + b[0]); n[2] += (a[0] - b[0])*(a[1] + b[1]); }
    n = norm(n); if(out && dot(n, out) < 0) n = [-n[0], -n[1], -n[2]];
    let U, V; if(Math.abs(n[2]) < .95){ U = norm(cross([0, 0, 1], n)); V = cross(n, U); } else { U = [1, 0, 0]; V = [0, 1, 0]; }
    const p = new Float32Array(pts.length*3), uv = new Float32Array(pts.length*2); let cx = 0, cy = 0, cz = 0;
    pts.forEach((q, i) => { p[i*3] = q[0]; p[i*3 + 1] = q[1]; p[i*3 + 2] = q[2]; uv[i*2] = dot(q, U); uv[i*2 + 1] = dot(q, V); cx += q[0]; cy += q[1]; cz += q[2]; });
    cx /= pts.length; cy /= pts.length; cz /= pts.length; let rad = 0; for(const q of pts) rad = Math.max(rad, Math.hypot(q[0] - cx, q[1] - cy, q[2] - cz));
    const f = Object.assign({p, uv, n:pts.length, nx:n[0], ny:n[1], nz:n[2], U, V, pn:dot(pts[0], n), cx, cy, cz, rad, c:9, mat:0, g:1}, o || {});
    M.faces.push(f); return f; }
  /* une boîte ; quels = les faces voulues parmi x X y Y z Z (minuscule : côté petit) ; o.top habille le dessus */
  function box(M, a, b, o, quels){ const [x0, y0, z0] = a, [x1, y1, z1] = b; quels = quels || "xXyYZ"; const F = {};
    if(quels.includes("x")) F.x = face(M, [[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]], [-1, 0, 0], o);
    if(quels.includes("X")) F.X = face(M, [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], [1, 0, 0], o);
    if(quels.includes("y")) F.y = face(M, [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0], o);
    if(quels.includes("Y")) F.Y = face(M, [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], [0, 1, 0], o);
    if(quels.includes("z")) F.z = face(M, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0]], [0, 0, -1], Object.assign({}, o, o && o.bot));
    if(quels.includes("Z")) F.Z = face(M, [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], Object.assign({}, o, o && o.top));
    return F; }
  /* un fût à n pans, qui peut s'amincir (r1 = 0 : un cône) */
  function fut(M, cx, cy, z0, z1, r0, r1, n, o, rot){ rot = rot || 0;
    for(let i = 0; i < n; i++){ const a = rot + i/n*Math.PI*2, b = rot + (i + 1)/n*Math.PI*2, m = (a + b)/2, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
      const pts = r1 > 0 ? [[cx + ca*r0, cy + sa*r0, z0], [cx + cb*r0, cy + sb*r0, z0], [cx + cb*r1, cy + sb*r1, z1], [cx + ca*r1, cy + sa*r1, z1]] : [[cx + ca*r0, cy + sa*r0, z0], [cx + cb*r0, cy + sb*r0, z0], [cx, cy, z1]];
      face(M, pts, [Math.cos(m), Math.sin(m), (r0 - r1)/(z1 - z0)*.6], o); } }
  /* une colonne dorique : le fût, l'échine, l'abaque */
  function colonne(M, x, y, z0, h, r, o){ const zt = z0 + h; fut(M, x, y, z0, zt - h*.075, r, r*.8, 8, o, Math.PI/8); fut(M, x, y, zt - h*.075, zt - h*.038, r*.8, r*1.28, 8, o, Math.PI/8); box(M, [x - r*1.36, y - r*1.36, zt - h*.038], [x + r*1.36, y + r*1.36, zt], o, "xXyYz"); M.circ.push([x, y, r]); }
  /* un toit à deux pentes, faîte le long de y, avec ses rives et ses dessous de débord */
  function toit(M, cx, hw, ya, yb, ze, zf, o){ const t = .1, tu = Object.assign({c:25, mat:3}, o), riv = Object.assign({c:8}, o), sous = Object.assign({c:10}, o);
    for(const s of [-1, 1]){ const xe = cx + s*hw;
      face(M, [[xe, ya, ze + t], [xe, yb, ze + t], [cx, yb, zf + t], [cx, ya, zf + t]], [s*.4, 0, 1], tu);
      face(M, [[xe, ya, ze], [xe, yb, ze], [xe, yb, ze + t], [xe, ya, ze + t]], [s, 0, 0], riv);
      for(const [y, d] of [[ya, -1], [yb, 1]]) face(M, [[xe, y, ze], [cx, y, zf], [cx, y, zf + t], [xe, y, ze + t]], [0, d, 0], riv);
      face(M, [[xe, ya, ze], [xe, yb, ze], [cx, yb, zf], [cx, ya, zf]], [s*-.4, 0, -1], sous); } }
  /* un cyprès : un cône sombre sur un bout de tronc */
  function cypres(M, x, y, h, o){ fut(M, x, y, 0, .3, .07, .07, 4, Object.assign({c:14}, o)); fut(M, x, y, .22, h, h*.15, 0, 6, Object.assign({c:26}, o), x); M.circ.push([x, y, .25]); }

  /* ---------- le temple d'Asclépios : six colonnes de face, neuf de côté, la chambre du dieu au milieu ---------- */
  function temple(M, cx, yb, yf){ const SW = 3.3, ZS = .33, HC = 2.47, ZC = ZS + HC, R = .21, o = {c:9}, ext = {c:9, g:1}, int = {c:9, g:2, ns:.36, mat:1};
    /* les trois degrés */
    for(let k = 0; k < 3; k++){ const e = (2 - k)*.24; box(M, [cx - SW - e, yb - e, k*.11], [cx + SW + e, yf + e, (k + 1)*.11], {c:9, g:1, top:{c:10, mat:2, bh:.82, g:1}}); }
    M.plats.push([cx - SW, yb, cx + SW, yf, ZS, .24, 3]);
    /* la colonnade */
    const xs = [], px = 2.75, n = 9, pas = (yf - yb - 1.1)/(n - 1); for(let i = 0; i < 6; i++) xs.push(cx - px + i*1.1);
    for(const x of xs){ colonne(M, x, yf - .55, ZS, HC, R, ext); colonne(M, x, yb + .55, ZS, HC, R, ext); }
    for(let j = 1; j < n - 1; j++) for(const x of [cx - px, cx + px]) colonne(M, x, yb + .55 + j*pas, ZS, HC, R, ext);
    /* le plafond à caissons, l'entablement, la corniche */
    face(M, [[cx - 3, yb + .3, ZC], [cx + 3, yb + .3, ZC], [cx + 3, yf - .3, ZC], [cx - 3, yf - .3, ZC]], [0, 0, -1], {c:10, mat:6, g:3, ns:.6});
    box(M, [cx - 3.03, yb + .27, ZC], [cx + 3.03, yf - .27, ZC + .55], {c:9, mat:4, z0:ZC, g:1}, "xXyY");
    box(M, [cx - 3.16, yb + .14, ZC + .55], [cx + 3.16, yf - .14, ZC + .63], {c:8, g:1}, "xXyYz");
    /* les frontons bleus, le toit, les acrotères d'or */
    const ZE = ZC + .62, ZF = ZE + 1.12, yp = [yb + .2, yf - .2];
    face(M, [[cx - 3.3, yp[1], ZE], [cx + 3.3, yp[1], ZE], [cx, yp[1], ZF]], [0, 1, 0], {c:5, g:1});
    face(M, [[cx - 3.3, yp[0], ZE], [cx + 3.3, yp[0], ZE], [cx, yp[0], ZF]], [0, -1, 0], {c:5, g:1});
    toit(M, cx, 3.36, yb + .04, yf - .04, ZE - .01, ZF, {g:1});
    const embl = PX.mk(22, 14, x => { PX.disc(x, "#b08a3c", 11, 7, 6, 6); PX.disc(x, "#e2bd5a", 11, 7, 5, 5); PX.R(x, "#ffe9a8", 8, 2, 3, 2); PX.R(x, "#5c3f26", 10, 1, 2, 12); for(let y = 3; y < 12; y++) PX.R(x, "#3d2a1c", 10 + Math.round(3.2*Math.sin((y - 3)*1.15)), y, 2, 1); });
    face(M, [[cx - .6, yp[1] + .02, ZE + .14], [cx + .6, yp[1] + .02, ZE + .14], [cx + .6, yp[1] + .02, ZE + .9], [cx - .6, yp[1] + .02, ZE + .9]], [0, 1, 0], {tex:embl, u0:-(cx + .6), tw:1.2, v1:ZE + .9, th:.76, em:.78});
    fut(M, cx, yf - .1, ZF + .08, ZF + .5, .1, 0, 4, {c:18, g:1}); for(const s of [-1, 1]) fut(M, cx + s*3.3, yf - .1, ZE + .08, ZE + .36, .09, 0, 4, {c:18, g:1});
    /* la chambre : murs dehors, murs dedans, la porte */
    const cw = 1.9, t = .18, ca = yb + 1.7, cb = yf - 2.1, dw = .62, zd = ZS + 1.95, ex1 = Object.assign({mat:1}, ext);
    face(M, [[cx - cw, ca, ZS], [cx - cw, cb, ZS], [cx - cw, cb, ZC], [cx - cw, ca, ZC]], [-1, 0, 0], ex1); face(M, [[cx + cw, ca, ZS], [cx + cw, cb, ZS], [cx + cw, cb, ZC], [cx + cw, ca, ZC]], [1, 0, 0], ex1);
    face(M, [[cx - cw, ca, ZS], [cx + cw, ca, ZS], [cx + cw, ca, ZC], [cx - cw, ca, ZC]], [0, -1, 0], ex1);
    const devant = (y, out, oo) => { face(M, [[cx - cw, y, ZS], [cx - dw, y, ZS], [cx - dw, y, ZC], [cx - cw, y, ZC]], out, oo); face(M, [[cx + dw, y, ZS], [cx + cw, y, ZS], [cx + cw, y, ZC], [cx + dw, y, ZC]], out, oo); face(M, [[cx - dw, y, zd], [cx + dw, y, zd], [cx + dw, y, ZC], [cx - dw, y, ZC]], out, oo); };
    devant(cb, [0, 1, 0], ex1); devant(cb - t, [0, -1, 0], int);
    face(M, [[cx - cw + t, ca + t, ZS], [cx - cw + t, cb - t, ZS], [cx - cw + t, cb - t, ZC], [cx - cw + t, ca + t, ZC]], [1, 0, 0], int); face(M, [[cx + cw - t, ca + t, ZS], [cx + cw - t, cb - t, ZS], [cx + cw - t, cb - t, ZC], [cx + cw - t, ca + t, ZC]], [-1, 0, 0], int);
    face(M, [[cx - cw + t, ca + t, ZS], [cx + cw - t, ca + t, ZS], [cx + cw - t, ca + t, ZC], [cx - cw + t, ca + t, ZC]], [0, 1, 0], int);
    const jamb = {c:8, g:3, ns:.7}; face(M, [[cx - dw, cb - t, ZS], [cx - dw, cb, ZS], [cx - dw, cb, zd], [cx - dw, cb - t, zd]], [1, 0, 0], jamb); face(M, [[cx + dw, cb - t, ZS], [cx + dw, cb, ZS], [cx + dw, cb, zd], [cx + dw, cb - t, zd]], [-1, 0, 0], jamb); face(M, [[cx - dw, cb - t, zd], [cx + dw, cb - t, zd], [cx + dw, cb, zd], [cx - dw, cb, zd]], [0, 0, -1], jamb);
    /* le sol de la chambre, un peu plus sombre, qui ne prend que la lumière du dedans */
    face(M, [[cx - cw + t, ca + t, ZS + .004], [cx + cw - t, ca + t, ZS + .004], [cx + cw - t, cb, ZS + .004], [cx - cw + t, cb, ZS + .004]], [0, 0, 1], {c:10, mat:2, bh:.55, g:2, ns:.36});
    M.rects.push([cx - cw, ca, cx - cw + t, cb], [cx + cw - t, ca, cx + cw, cb], [cx - cw, ca, cx + cw, ca + t], [cx - cw, cb - t, cx - dw, cb], [cx + dw, cb - t, cx + cw, cb]);
    return {cx, yb, yf, zs:ZS, cella:[cx - cw + t, ca + t, cx + cw - t, cb - t], porte:[cx, cb], zc:ZC}; }

  /* ---------- le portique des dormeurs (l'abaton) : un long toit, un mur au fond, des colonnes vers la cour ---------- */
  function portique(M, x0, x1, ya, yb, n){ const ZS = .11, HC = 1.75, ZC = ZS + HC, t = .2, k = M.kProche, o = {c:9, g:4, k}, mur = {c:9, mat:1, g:4, k};
    box(M, [x0, ya, 0], [x1, yb, ZS], {c:9, g:4, k, top:{c:10, mat:2, bh:.6, g:4, k, ns:.7}}); M.plats.push([x0, ya, x1, yb, ZS, .01, 1]);
    box(M, [x0, ya, ZS], [x0 + t, yb, ZC], mur, "xXyY"); box(M, [x0 + t, ya, ZS], [x1 - .7, ya + t, ZC], mur, "XyY"); box(M, [x0 + t, yb - t, ZS], [x1 - .7, yb, ZC], mur, "XyY");
    M.rects.push([x0, ya, x0 + t, yb], [x0, ya, x1 - .7, ya + t], [x0, yb - t, x1 - .7, yb]);
    const pas = (yb - ya - .8)/(n - 1); for(let j = 0; j < n; j++) colonne(M, x1 - .3, ya + .4 + j*pas, ZS, HC, .14, o);
    face(M, [[x0, ya, ZC], [x1, ya, ZC], [x1, yb, ZC], [x0, yb, ZC]], [0, 0, -1], {c:10, mat:6, g:4, k, ns:.6});
    box(M, [x0 - .04, ya - .04, ZC], [x1 + .04, yb + .04, ZC + .26], {c:9, g:4, k}, "xXyY");
    const xm = (x0 + x1)/2, hw = (x1 - x0)/2 + .16, ZE = ZC + .25, ZF = ZE + .62;
    for(const [y, d] of [[ya - .04, -1], [yb + .04, 1]]) face(M, [[xm - hw, y, ZE], [xm + hw, y, ZE], [xm, y, ZF]], [0, d, 0], {c:9, g:4, k});
    toit(M, xm, hw + .04, ya - .14, yb + .14, ZE - .01, ZF, {g:4, k});
    return {x0, x1, ya, yb, zs:ZS, zc:ZC}; }

  /* ---------- marcher dedans : ce qui arrête, et la hauteur du sol ---------- */
  const bloque = (M, x, y, m) => { m = m == null ? .2 : m; for(const c of M.circ){ const dx = x - c[0], dy = y - c[1], r = c[2] + m*.5; if(dx*dx + dy*dy < r*r) return true; } for(const r of M.rects) if(x > r[0] - m && x < r[2] + m && y > r[1] - m && y < r[3] + m) return true; return false; };
  const sol = (M, x, y) => { let z = 0; for(const p of M.plats){ const d = Math.max(p[0] - x, x - p[2], p[1] - y, y - p[3]); if(d <= 0){ z = Math.max(z, p[4]); continue; } const k = Math.ceil(d/p[5]); if(k < p[6]) z = Math.max(z, p[4]*(p[6] - k)/p[6]); } return z; };
  return {mesh, face, box, fut, colonne, toit, cypres, temple, portique, bloque, sol};
})();
