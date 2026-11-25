/* ===== Arcanes · Psyché · Le Miroir : ce qui flotte dans le rêve =====
   Le rêve d'Épidaure garde ses gros pixels (le ciel, les étoiles, le sol-miroir), mais ses colonnes sont peintes à part,
   en pleine définition, avec un modelé lisse : du marbre sous la lune, une lueur d'or par en dessous, un liseré bleu sur les bords.
   Les gens et les objets du rêve sont peints ici aussi, toujours en gros pixels, pour que chacun passe devant ou derrière au bon moment.
   Aucune bibliothèque : chaque tronçon de colonne est une silhouette remplie d'un dégradé calculé face par face. */
window.MiroirFlot = (() => {
  const PX = window.MiroirPix;
  const nz = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0]/l, v[1]/l, v[2]/l]; };
  const cr = (a, b) => [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
  const dt = (a, b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  /* la lumière du rêve */
  const LUNE = nz([-.62, .48, .5]), MARBRE = [.97, .94, .88], NUIT = [16, 18, 46];
  function teinte(n, v, d, dim, or){ const m = Math.max(0, dt(n, LUNE)), m2 = Math.max(0, -dt(n, LUNE))*.18, g = Math.max(0, .35 - n[2])/1.35, f = 1 - Math.abs(dt(n, v)), rim = f*f*f;
    let r = 64 + 200*(m + m2) + 255*g*.72*or, gg = 68 + 206*(m + m2) + 178*g*.72*or, b = 116 + 220*(m + m2) + 70*g*.72*or;
    r = r*MARBRE[0] + 110*rim; gg = gg*MARBRE[1] + 140*rim; b = b*MARBRE[2] + 255*rim;
    const k = 1 - Math.exp(-d*.032); r = (r*(1 - k) + NUIT[0]*k)*dim; gg = (gg*(1 - k) + NUIT[1]*k)*dim; b = (b*(1 - k) + NUIT[2]*k)*dim;
    return `rgb(${Math.min(255, r | 0)},${Math.min(255, gg | 0)},${Math.min(255, b | 0)})`; }

  /* une colonne : des tronçons empilés le long de son axe. Certaines sont entières, d'autres se défont. */
  function colonne(o){ const r = o.r || .26, h = o.h || 2.4, n = o.tambours || 3, ecart = o.ecart || 0, p = [], ouvert = ecart > 0;
    const hs = h*.86, ht = hs/n; for(let i = 0; i < n; i++) p.push({a:i*(ht + ecart), b:(i + 1)*ht + i*ecart, r0:r*(1 - .14*i/n), r1:r*(1 - .14*(i + 1)/n), fl:20, bas:i === 0 || ouvert, haut:ouvert || (i === n - 1 && o.sansChapiteau)});
    let z = n*ht + (n - 1)*ecart; if(!o.sansChapiteau){ const e = o.casse ? ecart*1.6 : 0; p.push({a:z + e, b:z + e + h*.075, r0:r*.86, r1:r*1.3, fl:0, bas:o.casse, haut:false}); p.push({a:z + e + h*.075, b:z + e + h*.12, r0:r*1.38, r1:r*1.38, fl:0, carre:1, bas:true, haut:true}); }
    const e1 = nz(cr(o.axe || [0, 0, 1], [1, 0, 0])); return Object.assign({x:0, y:0, z:0, axe:[0, 0, 1], rot0:0, rot:0, tour:.05, houle:.12, ph:0, or:1, e1}, o, {parts:p}); }

  /* projeter un point du monde sur l'écran du dessus */
  function pj(c, x, y, z, refl){ const ox = x - c.x, oy = y - c.y, d = ox*c.dx + oy*c.dy; if(d < .08) return null; const l = c.dy*ox - c.dx*oy;
    return [(c.W/2 - c.proj*l/d)*c.kx, (c.hz + c.proj*(.5 - (refl ? -z : z))/d)*c.ky, d]; }

  /* un tronçon : un tronc de cône, vu de face, avec ses cannelures qui tournent */
  function troncon(ctx, c, col, pt, A, B, refl){
    const cam = [c.x, c.y, .5], ax = A, m = [(B[0] + pt.a*ax[0] + B[0] + pt.b*ax[0])/2, (B[1] + pt.a*ax[1] + B[1] + pt.b*ax[1])/2, (B[2] + pt.a*ax[2] + B[2] + pt.b*ax[2])/2];
    const camR = refl ? [c.x, c.y, -.5] : cam;
    let V = [camR[0] - m[0], camR[1] - m[1], camR[2] - m[2]]; const dist = Math.hypot(V[0], V[1], V[2]); V = [V[0]/dist, V[1]/dist, V[2]/dist];
    const vp = dt(V, ax); let u = [V[0] - vp*ax[0], V[1] - vp*ax[1], V[2] - vp*ax[2]]; if(Math.hypot(u[0], u[1], u[2]) < 1e-4) return; u = nz(u); const w = cr(ax, u);
    const c0 = [B[0] + pt.a*ax[0], B[1] + pt.a*ax[1], B[2] + pt.a*ax[2]], c1 = [B[0] + pt.b*ax[0], B[1] + pt.b*ax[1], B[2] + pt.b*ax[2]];
    const N = refl ? 5 : pt.carre ? 6 : 10, pts = [];
    const P = (cc, rr, ph) => { const co = Math.cos(ph), si = Math.sin(ph); return pj(c, cc[0] + rr*(co*u[0] + si*w[0]), cc[1] + rr*(co*u[1] + si*w[1]), cc[2] + rr*(co*u[2] + si*w[2]), refl); };
    for(let i = 0; i <= N; i++){ const q = P(c0, pt.r0, -Math.PI/2 + Math.PI*i/N); if(!q) return; pts.push(q); }
    for(let i = N; i >= 0; i--){ const q = P(c1, pt.r1, -Math.PI/2 + Math.PI*i/N); if(!q) return; pts.push(q); }
    const rm = (pt.r0 + pt.r1)/2, g0 = P(m, rm, -Math.PI/2), g1 = P(m, rm, Math.PI/2); if(!g0 || !g1) return;
    const gr = ctx.createLinearGradient(g0[0], g0[1], g1[0], g1[1]), dim = c.dim*(refl ? 1 : 1), sl = (pt.r0 - pt.r1)/Math.max(.01, pt.b - pt.a);
    const nrm = ph => { const co = Math.cos(ph), si = Math.sin(ph); return nz([co*u[0] + si*w[0] + sl*ax[0], co*u[1] + si*w[1] + sl*ax[1], co*u[2] + si*w[2] + sl*ax[2]]); };
    const st = ph => (Math.sin(ph) + 1)/2, base = ph => teinte(nrm(ph), V, dist, dim, col.or);
    const ns = refl ? 4 : 12; for(let i = 0; i <= ns; i++){ const ph = -Math.PI/2 + Math.PI*i/ns; gr.addColorStop(st(ph), base(ph)); }
    /* les cannelures : des sillons qui tournent avec la colonne */
    if(pt.fl && !refl && dist < 16){ const e1 = col.e1, e2 = cr(ax, e1), dd = Math.PI/pt.fl*.55;
      for(let k = 0; k < pt.fl; k++){ const th = col.rot + k*2*Math.PI/pt.fl, ev = [Math.cos(th)*e1[0] + Math.sin(th)*e2[0], Math.cos(th)*e1[1] + Math.sin(th)*e2[1], Math.cos(th)*e1[2] + Math.sin(th)*e2[2]], ph = Math.atan2(dt(ev, w), dt(ev, u));
        if(Math.abs(ph) > Math.PI/2 - dd*1.2) continue; const n0 = nrm(ph), sombre = teinte(n0, V, dist, dim*.74, col.or*.5);
        gr.addColorStop(st(ph - dd), base(ph - dd)); gr.addColorStop(st(ph), sombre); gr.addColorStop(st(ph + dd), base(ph + dd)); } }
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for(let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath();
    ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = gr; ctx.lineWidth = .8; ctx.stroke();
    /* la face du bout qu'on voit, s'il y en a une */
    const bas = pt.bas && dt([camR[0] - c0[0], camR[1] - c0[1], camR[2] - c0[2]], ax) < 0, haut = pt.haut && dt([camR[0] - c1[0], camR[1] - c1[1], camR[2] - c1[2]], ax) > 0;
    if(bas || haut){ const cc = bas ? c0 : c1, rr = bas ? pt.r0 : pt.r1, nn = bas ? [-ax[0], -ax[1], -ax[2]] : ax, q = [];
      for(let i = 0; i < 20; i++){ const p = P(cc, rr, i/20*Math.PI*2); if(!p) return; q.push(p); }
      ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); for(const p of q) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fillStyle = teinte(nn, V, dist, dim*(bas ? .92 : 1), col.or*1.4); ctx.fill(); }
  }

  /* les gens et les objets du rêve, toujours en gros pixels */
  const cache = new Map();
  function bitmap(tex, lv){ let m = cache.get(tex); if(!m){ m = []; cache.set(tex, m); } return m[lv] || (m[lv] = PX.show(tex, lv)); }
  function sprite(ctx, c, s, refl){ const ox = s.x - c.x, oy = s.y - c.y, d = ox*c.dx + oy*c.dy; if(d < .12) return; const l = c.dy*ox - c.dx*oy;
    const tex = typeof s.tex === "function" ? s.tex(null, s) : s.tex; if(!tex) return;
    const hh = c.proj/d*(s.h || 1), ww = hh*(tex.w/tex.h)*(s.wf == null ? 1 : s.wf), cx = c.W/2 - c.proj*l/d, z = s.z || 0;
    const bot = refl ? c.hz + c.proj*(.5 + z)/d : c.hz + c.proj*(.5 - z)/d, top = refl ? bot + hh : bot - hh;
    const L = s.em || tex.em ? Math.max(s.emMin || 0, (s.emL || .78)*Math.exp(-d*.04*(s.emK == null ? .35 : s.emK))) : .55*Math.exp(-d*.04);
    const lv = Math.max(0, Math.min(7, Math.round(L*c.dim*7))), b = bitmap(tex, lv);
    ctx.save(); ctx.imageSmoothingEnabled = false; ctx.globalAlpha = (s.alpha == null ? 1 : s.alpha)*(refl ? .22 : 1);
    if(refl){ ctx.translate(0, bot*c.ky); ctx.scale(1, -1); ctx.drawImage(b, (cx - ww/2)*c.kx, -hh*c.ky, ww*c.kx, hh*c.ky); }
    else ctx.drawImage(b, (cx - ww/2)*c.kx, top*c.ky, ww*c.kx, hh*c.ky);
    ctx.restore(); }

  /* une image : les reflets d'abord, puis tout le reste, du plus loin au plus proche */
  function dessine(ctx, c, cols){
    const T = c.T, items = [];
    for(const col of cols){ const ax = col.axeT = nz([col.axe[0] + Math.sin(T*.21 + col.ph)*.05, col.axe[1] + Math.cos(T*.17 + col.ph)*.05, col.axe[2]]), z = col.z + Math.sin(T*.5 + col.ph)*col.houle;
      col.rot = col.rot0 + T*col.tour; const B = [col.x, col.y, z]; const mx = col.x - c.x, my = col.y - c.y, d = mx*c.dx + my*c.dy, lat = Math.abs(c.dy*mx - c.dx*my); col.vu = false; if(d < -1.5 || d > 30 || lat > d*(c.W/2/c.proj) + (col.h || 2.4)*.8 + .8) continue; col.vu = true; col.dist = d;
      col.parts.forEach(pt => { const zm = (pt.a + pt.b)/2, px = B[0] + ax[0]*zm, py = B[1] + ax[1]*zm, pz = B[2] + ax[2]*zm; items.push({k:0, col, pt, B, ax, refl:d < 20, d:Math.hypot(px - c.x, py - c.y, (pz - .5)*.6)}); }); }
    for(const s of c.sprites) if(s.ov && !s.off && !s.vide) items.push({k:1, s, d:Math.hypot(s.x - c.x, s.y - c.y)});
    items.sort((a, b) => b.d - a.d);
    /* le sol est un miroir : tout s'y reflète, à peine */
    ctx.save(); ctx.beginPath(); ctx.rect(0, c.hz*c.ky, c.W*c.kx, (c.H - c.hz)*c.ky); ctx.clip(); ctx.globalAlpha = .2;
    for(const it of items) if(it.k === 0 && it.refl) troncon(ctx, c, it.col, it.pt, it.ax, it.B, true); ctx.globalAlpha = 1;
    for(const it of items) if(it.k === 1) sprite(ctx, c, it.s, true); ctx.restore();
    /* une lueur douce autour de chaque colonne proche */
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for(const col of cols){ if(!col.vu || col.dist > 13) continue; const z = col.z + (col.h || 2.4)*.5, p = pj(c, col.x, col.y, z); if(!p) continue; const r = Math.min(c.W*c.kx*.45, (c.proj*(col.h || 2.4)/p[2])*c.kx*.6), g = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r);
      g.addColorStop(0, `rgba(150,150,255,${.13*c.dim})`); g.addColorStop(.55, `rgba(200,160,110,${.04*c.dim})`); g.addColorStop(1, "rgba(120,140,255,0)"); ctx.fillStyle = g; ctx.fillRect(p[0] - r, p[1] - r, r*2, r*2); }
    ctx.restore();
    for(const it of items){ if(it.k === 0) troncon(ctx, c, it.col, it.pt, it.ax, it.B, false); else sprite(ctx, c, it.s, false); }
  }
  return {colonne, dessine};
})();
