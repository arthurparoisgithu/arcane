/* ===== Arcanes · Psyché · Le Miroir : les images =====
   Tout est dessiné par le code, en petits pixels : les textures des murs, les sprites, le cabinet de Jung
   (160 × 100) et son visage en gros plan (80 × 50, agrandi deux fois). Aucun fichier image. */
window.MiroirPix = (() => {
  /* ---------- la direction artistique : une palette fermée, des ombres indigo, une lumière ambre, tout en trame ----------
     Chaque image est stockée en numéros de couleur. La lumière ne se mélange jamais en dégradé lisse : elle choisit
     un cran dans la rampe de la couleur (0 = ombre, 5 = la couleur, 7 = éclat), et une trame de Bayer fait le passage. */
  const PAL = ["#000000", "#0a0a14", "#14162b", "#1f2444", "#2e3a66", "#4a5a8a", "#8fa3c8", "#cfd9ea", "#f4efe2", "#d9cfb8", "#a89c84", "#6f6a5e", "#45423c", "#2a2622",
    "#3d2a1c", "#5c3f26", "#86603a", "#b08a3c", "#e2bd5a", "#ffe9a8", "#f08a24", "#c2501c", "#7a2c24", "#4f1c1c", "#e0b08e", "#c08a6a", "#2f4a3a", "#4f6a52", "#3aa36a", "#6a5a8a", "#17203a", "#8a3a30"];
  const RGB = PAL.map(h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5)/16);
  const THEMES = { nuit:{sh:[8, 8, 20], hi:[255, 226, 170]}, noir:{sh:[5, 5, 12], hi:[244, 214, 168]}, blanc:{sh:[20, 28, 62], hi:[226, 236, 255]}, rouge:{sh:[40, 10, 14], hi:[255, 214, 120]} };
  const LUT = new Uint32Array(32*8), LRGB = new Uint8Array(32*8*3); let theme = "nuit";
  function setTheme(n){ theme = n; const T = THEMES[n]; for(let c = 0; c < 32; c++) for(let l = 0; l < 8; l++){ const b = RGB[c]; let r, g, bl;
      if(l <= 5){ const t = Math.pow(l/5, 1.15), d = .22; r = (T.sh[0]*(1 - d) + b[0]*d)*(1 - t) + b[0]*t; g = (T.sh[1]*(1 - d) + b[1]*d)*(1 - t) + b[1]*t; bl = (T.sh[2]*(1 - d) + b[2]*d)*(1 - t) + b[2]*t; }
      else { const k = l === 6 ? .2 : .42; r = b[0] + (T.hi[0] - b[0])*k; g = b[1] + (T.hi[1] - b[1])*k; bl = b[2] + (T.hi[2] - b[2])*k; }
      const i = c*8 + l; LRGB[i*3] = r; LRGB[i*3 + 1] = g; LRGB[i*3 + 2] = bl; LUT[i] = (255 << 24) | ((bl | 0) << 16) | ((g | 0) << 8) | (r | 0); } }
  setTheme("nuit");
  const NEAR = new Uint8Array(32768);
  const near = (r, g, b) => { const k = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3); let v = NEAR[k]; if(v) return v; let best = 1, bd = 1e9; for(let i = 1; i < 32; i++){ const c = RGB[i], d = (c[0] - r)**2*1.1 + (c[1] - g)**2*1.4 + (c[2] - b)**2; if(d < bd){ bd = d; best = i; } } return (NEAR[k] = best); };
  const cv = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  /* une texture : des numéros de couleur (0 = transparent). em : elle éclaire par elle-même. */
  const toTex = (c, em) => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data, n = c.width*c.height, ix = new Uint8Array(n); for(let i = 0; i < n; i++) ix[i] = d[i*4 + 3] < 128 ? 0 : near(d[i*4], d[i*4 + 1], d[i*4 + 2]); return {w:c.width, h:c.height, i:ix, em:!!em}; };
  /* une texture en couleurs directes (le miroir, qui montre une image déjà éclairée) */
  const toRaw = c => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height); return {w:c.width, h:c.height, d:new Uint32Array(d.data.buffer), raw:true, em:true}; };
  const mk = (w, h, fn, em) => { const c = cv(w, h), x = c.getContext("2d"); fn(x, w, h); return toTex(c, em); };
  /* éclairer une image dessinée à plat : lights = [[x, y, rayon, force]], amb = lumière de fond */
  function relight(x, w, h, lights, amb, amp){ if(amp == null) amp = 1; const im = x.getImageData(0, 0, w, h), d = im.data, o = new Uint32Array(d.buffer);
    for(let y = 0; y < h; y++) for(let xx = 0; xx < w; xx++){ const i = y*w + xx, c = near(d[i*4], d[i*4 + 1], d[i*4 + 2]); let L = amb;
      for(let k = 0; k < lights.length; k++){ const l = lights[k], q = 1 - Math.hypot(xx - l[0], (y - l[1])*1.15)/l[2]; if(q > 0) L += l[3]*q*q; }
      let lv = (L*7 + .5 + (BAYER[(xx & 3) | ((y & 3) << 2)] - .5)*amp) | 0; if(lv > 7) lv = 7; if(lv < 0) lv = 0; o[i] = LUT[c*8 + lv]; }
    x.putImageData(im, 0, 0); }
  /* un halo tramé, pour les lueurs */
  const halo = (x, cx, cy, r, c1, c2) => { for(let j = -r; j <= r; j++) for(let i = -r; i <= r; i++){ const q = 1 - Math.hypot(i, j)/r; if(q <= 0) continue; const b = BAYER[((cx + i) & 3) | (((cy + j) & 3) << 2)]; if(q*q*1.5 > b){ x.fillStyle = q > .55 ? c2 : c1; x.fillRect(cx + i, cy + j, 1, 1); } } };
  const rng = s => () => { s = (s*1664525 + 1013904223) >>> 0; return s/4294967296; };
  const R = (x, c, a, b, w, h) => { x.fillStyle = c; x.fillRect(a | 0, b | 0, w | 0, h | 0); };
  const disc = (x, c, cx, cy, rx, ry) => { x.fillStyle = c; for(let j = -ry; j <= ry; j++){ const k = Math.sqrt(Math.max(0, 1 - (j*j)/(ry*ry + .01)))*rx; x.fillRect(Math.round(cx - k), Math.round(cy + j), Math.max(1, Math.round(2*k)), 1); } };
  const noise = (x, w, h, cols, seed, n) => { const r = rng(seed); for(let i = 0; i < n; i++) R(x, cols[(r()*cols.length) | 0], r()*w, r()*h, 1 + r()*2, 1); };

  /* ---------- les murs (32 × 32) ---------- */
  const W = {};
  const lambris = (x, y0) => { R(x, "#4a3323", 0, y0, 32, 32 - y0); R(x, "#6b4a30", 0, y0, 32, 1); R(x, "#2e1f15", 0, y0 + 1, 32, 1); for(let i = 0; i < 32; i += 8){ R(x, "#3a281b", i, y0 + 2, 1, 32); R(x, "#5a3f2a", i + 2, y0 + 4, 4, 32 - y0 - 6); } };
  W.papier = mk(32, 32, x => { R(x, "#33443a", 0, 0, 32, 32); for(let j = 0; j < 22; j += 6) for(let i = (j/6 % 2)*4; i < 32; i += 8){ R(x, "#55684f", i + 1, j + 1, 1, 3); R(x, "#55684f", i, j + 2, 3, 1); R(x, "#8a8050", i + 1, j + 2, 1, 1); } R(x, "#1f2a23", 0, 0, 32, 1); lambris(x, 21); });
  W.porte = mk(32, 32, x => { R(x, "#33443a", 0, 0, 32, 32); lambris(x, 21); R(x, "#2a1a10", 5, 3, 22, 29); R(x, "#5c3d24", 6, 4, 20, 28); R(x, "#4a2f1b", 8, 6, 7, 10); R(x, "#4a2f1b", 17, 6, 7, 10); R(x, "#4a2f1b", 8, 19, 7, 11); R(x, "#4a2f1b", 17, 19, 7, 11); R(x, "#6e4a2c", 6, 4, 20, 1); R(x, "#c9a24a", 22, 17, 2, 2); });
  W.porteLum = mk(32, 32, x => { R(x, "#33443a", 0, 0, 32, 32); lambris(x, 21); R(x, "#2a1a10", 5, 3, 22, 29); R(x, "#f3d9a0", 6, 4, 20, 28); R(x, "#ffeec4", 9, 7, 14, 25); R(x, "#e2b56a", 6, 4, 2, 28); R(x, "#e2b56a", 24, 4, 2, 28); }, true);
  W.portrait = mk(32, 32, x => { R(x, "#33443a", 0, 0, 32, 32); lambris(x, 21); R(x, "#b08a3c", 8, 2, 16, 17); R(x, "#e2c26a", 9, 3, 14, 15); R(x, "#17130f", 10, 4, 12, 13); disc(x, "#3c3128", 16, 10, 3, 4); R(x, "#2a221c", 12, 14, 8, 3); });
  W.couloir = mk(32, 32, x => { R(x, "#5b5648", 0, 0, 32, 32); noise(x, 32, 20, ["#544f42", "#625d4e"], 7, 60); R(x, "#3b382f", 0, 0, 32, 1); lambris(x, 21); R(x, "#c9a24a", 15, 6, 2, 3); R(x, "#ffe9a8", 15, 5, 2, 1); });
  W.couloirPorte = mk(32, 32, x => { R(x, "#5b5648", 0, 0, 32, 32); lambris(x, 21); R(x, "#241710", 6, 3, 20, 29); R(x, "#3f2b1c", 7, 4, 18, 28); R(x, "#33221a", 9, 6, 14, 11); R(x, "#33221a", 9, 19, 14, 11); R(x, "#8a7a4a", 21, 17, 2, 2); });
  const dPierre = x => { R(x, "#6b665c", 0, 0, 32, 32); const r = rng(3); for(let j = 0; j < 32; j += 8){ R(x, "#3d3a34", 0, j, 32, 1); for(let i = (j/8 % 2)*6; i < 32; i += 12) R(x, "#3d3a34", i, j, 1, 8); } noise(x, 32, 32, ["#5f5a51", "#77726a", "#57534b"], 5, 110); R(x, "#8a8478", 2 + r()*4, 2, 5, 1); }; W.pierre = mk(32, 32, dPierre);
  W.pierrePorte = mk(32, 32, x => { dPierre(x); R(x, "#1c1611", 7, 5, 18, 27); disc(x, "#1c1611", 16, 8, 9, 5); R(x, "#4b3220", 8, 7, 16, 25); disc(x, "#4b3220", 16, 9, 8, 4); for(let i = 12; i < 24; i += 4) R(x, "#352315", i, 5, 1, 27); R(x, "#8f8f8f", 9, 12, 14, 1); R(x, "#8f8f8f", 9, 24, 14, 1); R(x, "#b9b9b9", 21, 18, 2, 3); });
  W.brique = mk(32, 32, x => { R(x, "#7a4a36", 0, 0, 32, 32); for(let j = 0; j < 32; j += 4){ R(x, "#c9b79a", 0, j, 32, 1); for(let i = (j/4 % 2)*5; i < 32; i += 10) R(x, "#c9b79a", i, j, 1, 4); } noise(x, 32, 32, ["#6c3f2d", "#8a5640", "#70442f"], 9, 120); });
  W.roche = mk(32, 32, x => { R(x, "#3b342c", 0, 0, 32, 32); noise(x, 32, 32, ["#2c2620", "#4a4238", "#342d26", "#554c40"], 11, 260); const r = rng(13); for(let i = 0; i < 5; i++){ let a = r()*32, b = 0; for(let k = 0; k < 30; k++){ R(x, "#1e1a15", a, b, 1, 2); a += r()*2 - 1; b += 1 + r(); } } });
  W.foret = mk(32, 32, x => { R(x, "#060a0a", 0, 0, 32, 32); const r = rng(21); for(let i = 0; i < 9; i++){ const a = r()*32, w = 1 + r()*3; R(x, r() > .5 ? "#0e1513" : "#131c18", a, 0, w, 32); } noise(x, 32, 14, ["#0b1210", "#101a16"], 23, 90); });
  W.rondin = mk(32, 32, x => { R(x, "#3b2a1c", 0, 0, 32, 32); for(let j = 0; j < 32; j += 5){ R(x, "#59402a", 0, j + 1, 32, 2); R(x, "#241810", 0, j + 4, 32, 1); } noise(x, 32, 32, ["#463321", "#2f2116"], 31, 70); });
  W.rondinPorte = mk(32, 32, x => { R(x, "#3b2a1c", 0, 0, 32, 32); for(let j = 0; j < 32; j += 5){ R(x, "#59402a", 0, j + 1, 32, 2); R(x, "#241810", 0, j + 4, 32, 1); } R(x, "#160e08", 8, 6, 16, 26); R(x, "#6a4a2a", 9, 7, 14, 25); R(x, "#ffd98a", 9, 30, 14, 2); R(x, "#c9a24a", 20, 19, 2, 2); R(x, "#4f3620", 13, 7, 1, 25); R(x, "#4f3620", 18, 7, 1, 25); });
  W.rondinFen = mk(32, 32, x => { R(x, "#3b2a1c", 0, 0, 32, 32); for(let j = 0; j < 32; j += 5){ R(x, "#59402a", 0, j + 1, 32, 2); R(x, "#241810", 0, j + 4, 32, 1); } R(x, "#160e08", 9, 9, 14, 12); R(x, "#ffcf7a", 10, 10, 12, 10); R(x, "#160e08", 15, 10, 2, 10); R(x, "#160e08", 10, 14, 12, 1); }, false);
  W.livres = mk(32, 32, x => { R(x, "#2a1c12", 0, 0, 32, 32); const r = rng(41), cs = ["#6b2a25", "#2f4a3a", "#3a3f5c", "#8a6a2c", "#4a2f3a", "#22303a", "#7a5a3a"]; for(let j = 1; j < 32; j += 8){ R(x, "#4a3323", 0, j + 6, 32, 2); let i = 1; while(i < 31){ const w = 1 + ((r()*3) | 0), h = 4 + ((r()*2) | 0); R(x, cs[(r()*cs.length) | 0], i, j + 6 - h, w, h); i += w + (r() > .85 ? 2 : 0); } } });
  const dTour = x => { R(x, "#57524a", 0, 0, 32, 32); for(let j = 0; j < 32; j += 6){ R(x, "#3a362f", 0, j, 32, 1); for(let i = (j/6 % 2)*5; i < 32; i += 10) R(x, "#3a362f", i, j, 1, 6); } noise(x, 32, 32, ["#4d4840", "#615b52"], 51, 90); }; W.tour = mk(32, 32, dTour);
  W.tourFen = mk(32, 32, x => { dTour(x); R(x, "#1c1814", 9, 5, 14, 19); disc(x, "#1c1814", 16, 7, 7, 4); R(x, "#0d1830", 10, 6, 12, 17); disc(x, "#0d1830", 16, 8, 6, 3); R(x, "#e8e2c8", 13, 9, 1, 1); R(x, "#e8e2c8", 19, 13, 1, 1); R(x, "#e8e2c8", 15, 17, 1, 1); R(x, "#1c1814", 15, 5, 2, 19); R(x, "#1c1814", 10, 14, 12, 1); });

  /* ---------- les sprites ---------- */
  const S = {};
  S.arbre = mk(40, 96, x => { const r = rng(61); R(x, "#0c100e", 17, 30, 6, 66); R(x, "#161d19", 19, 30, 2, 66); for(let i = 0; i < 16; i++){ const y = 4 + r()*40, w = 6 + r()*26; disc(x, r() > .5 ? "#0b1512" : "#10201a", 20 + (r() - .5)*12, y, w/2, 4 + r()*5); } R(x, "#0c100e", 12, 92, 16, 4); });
  S.table = mk(48, 40, x => { R(x, "#3d2818", 4, 16, 40, 4); R(x, "#5a3d24", 4, 15, 40, 2); R(x, "#2e1d11", 7, 20, 3, 20); R(x, "#2e1d11", 38, 20, 3, 20); R(x, "#e8dcc0", 18, 11, 14, 4); R(x, "#c9b990", 18, 14, 14, 1); R(x, "#7a2c24", 24, 11, 1, 4); R(x, "#c9a24a", 36, 6, 2, 9); R(x, "#ffe9a8", 35, 3, 4, 4); R(x, "#fff6d8", 36, 2, 2, 3); });
  S.carnet = mk(24, 20, x => { R(x, "#e8dcc0", 2, 4, 20, 14); R(x, "#c9b990", 2, 17, 20, 2); R(x, "#7a2c24", 11, 4, 2, 14); for(let j = 7; j < 16; j += 2){ R(x, "#55483a", 4, j, 6, 1); R(x, "#55483a", 14, j, 6, 1); } }, true);
  const masque = (c, m) => mk(28, 64, x => { R(x, "#2a2018", 13, 30, 2, 30); R(x, "#3a2c20", 8, 58, 12, 4); disc(x, c[0], 14, 16, 9, 12); disc(x, c[1], 16, 17, 6, 10); R(x, "#0e0a08", 8, 12, 4, 3); R(x, "#0e0a08", 16, 12, 4, 3); R(x, c[2], 13, 15, 2, 5);
    if(m === 0){ R(x, "#0e0a08", 9, 23, 10, 1); R(x, "#0e0a08", 8, 22, 1, 1); R(x, "#0e0a08", 19, 22, 1, 1); R(x, "#0e0a08", 10, 24, 8, 1); } if(m === 1){ R(x, "#0e0a08", 10, 23, 8, 1); R(x, "#0e0a08", 7, 10, 5, 1); R(x, "#0e0a08", 16, 10, 5, 1); } if(m === 2){ R(x, "#b9b2a2", 11, 23, 6, 1); } });
  S.masques = [masque(["#e8d9b8", "#f3e7cc", "#c9b78f"], 0), masque(["#8a8f96", "#a3a8ae", "#6c7178"], 1), masque(["#efece4", "#fbf9f2", "#d6d2c6"], 2)];
  S.habitant = mk(36, 72, x => { R(x, "#2b2019", 6, 34, 24, 34); R(x, "#3a2c22", 4, 40, 28, 6); R(x, "#1b1410", 9, 66, 5, 6); R(x, "#1b1410", 22, 66, 5, 6); R(x, "#4b3f3a", 11, 22, 14, 22); R(x, "#5c4f49", 13, 24, 4, 18); disc(x, "#d9c7ad", 18, 13, 6, 8); R(x, "#3a2f2a", 12, 5, 12, 4); R(x, "#4b3f3a", 7, 30, 5, 12); R(x, "#4b3f3a", 24, 30, 5, 12); });
  S.psyche = mk(32, 72, x => { R(x, "#8a6a2c", 6, 4, 20, 50); disc(x, "#8a6a2c", 16, 8, 10, 6); R(x, "#c9a24a", 7, 5, 18, 48); disc(x, "#c9a24a", 16, 9, 9, 5); R(x, "#9fb3bd", 9, 8, 14, 43); disc(x, "#9fb3bd", 16, 11, 7, 4); R(x, "#c7d6dc", 10, 10, 3, 38); R(x, "#5a4020", 8, 54, 3, 16); R(x, "#5a4020", 21, 54, 3, 16); R(x, "#5a4020", 5, 68, 22, 3); });
  S.ombre = mk(32, 76, x => { disc(x, "#050507", 16, 10, 6, 8); R(x, "#050507", 12, 16, 8, 5); R(x, "#050507", 6, 20, 20, 30); R(x, "#050507", 4, 22, 3, 26); R(x, "#050507", 25, 22, 3, 26); R(x, "#050507", 8, 48, 7, 28); R(x, "#050507", 17, 48, 7, 28); R(x, "#e9e2d0", 13, 9, 2, 1); R(x, "#e9e2d0", 18, 9, 2, 1); });
  S.ombreOr = mk(32, 76, x => { disc(x, "#f6dc8c", 16, 10, 6, 8); R(x, "#f6dc8c", 12, 16, 8, 5); R(x, "#f1cf6c", 6, 20, 20, 30); R(x, "#f1cf6c", 4, 22, 3, 26); R(x, "#f1cf6c", 25, 22, 3, 26); R(x, "#e9bf52", 8, 48, 7, 28); R(x, "#e9bf52", 17, 48, 7, 28); R(x, "#fffbe6", 11, 22, 10, 22); }, true);
  const ROM = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const carte = (n, draw) => mk(32, 60, x => { R(x, "#3a2c14", 3, 2, 26, 50); R(x, "#efe4c8", 4, 3, 24, 48); R(x, "#b08a3c", 5, 4, 22, 1); R(x, "#b08a3c", 5, 49, 22, 1); R(x, "#b08a3c", 5, 4, 1, 46); R(x, "#b08a3c", 26, 4, 1, 46); draw(x); x.fillStyle = "#3a2c14"; x.font = "bold 7px serif"; x.textAlign = "center"; x.fillText(ROM[n], 16, 47); }, true);
  S.cartes = {
    bateleur:carte(1, x => { disc(x, "#d9a886", 16, 15, 3, 3); R(x, "#7a2c24", 12, 19, 8, 12); R(x, "#2f4a6a", 9, 20, 3, 8); R(x, "#2f4a6a", 20, 20, 3, 8); R(x, "#c9a24a", 10, 10, 12, 2); R(x, "#c9a24a", 8, 11, 2, 2); R(x, "#c9a24a", 22, 11, 2, 2); R(x, "#5a3d24", 7, 32, 18, 2); R(x, "#c9a24a", 22, 14, 1, 6); }),
    imperatrice:carte(3, x => { disc(x, "#d9a886", 16, 14, 3, 3); R(x, "#c9a24a", 13, 9, 6, 2); R(x, "#c9a24a", 13, 8, 1, 1); R(x, "#c9a24a", 16, 7, 1, 2); R(x, "#c9a24a", 18, 8, 1, 1); R(x, "#2f6a4a", 10, 18, 12, 18); R(x, "#7a2c24", 12, 22, 8, 14); R(x, "#c9a24a", 21, 14, 1, 14); disc(x, "#c9a24a", 21, 13, 1, 1); }),
    ermite:carte(9, x => { disc(x, "#d9c7ad", 15, 14, 3, 3); R(x, "#4a4f6a", 10, 10, 10, 5); R(x, "#4a4f6a", 9, 15, 12, 22); R(x, "#efefe8", 13, 17, 4, 6); R(x, "#5a3d24", 22, 12, 1, 25); R(x, "#ffe9a8", 6, 18, 3, 4); R(x, "#c9a24a", 6, 17, 3, 1); R(x, "#c9a24a", 6, 22, 3, 1); }),
    mat:carte(0, x => { disc(x, "#d9a886", 17, 13, 3, 3); R(x, "#c9a24a", 14, 8, 6, 3); R(x, "#7a2c24", 13, 7, 2, 2); R(x, "#7a2c24", 19, 7, 2, 2); R(x, "#2f6a4a", 13, 17, 8, 10); R(x, "#c9a24a", 13, 27, 3, 9); R(x, "#7a2c24", 18, 27, 3, 9); R(x, "#5a3d24", 9, 10, 1, 26); R(x, "#e8dcc0", 6, 8, 4, 4); R(x, "#8a6a4a", 22, 32, 4, 3); })
  };
  S.cranes = mk(40, 28, x => { R(x, "#2a2520", 2, 20, 36, 8); disc(x, "#d9d2bd", 12, 14, 7, 7); disc(x, "#cfc7b0", 28, 15, 6, 6); R(x, "#17130f", 8, 13, 3, 3); R(x, "#17130f", 13, 13, 3, 3); R(x, "#17130f", 25, 14, 2, 3); R(x, "#17130f", 29, 14, 2, 3); R(x, "#17130f", 11, 18, 2, 2); R(x, "#d9d2bd", 9, 20, 7, 3); R(x, "#cfc7b0", 25, 20, 6, 3); for(let i = 9; i < 16; i += 2) R(x, "#17130f", i, 21, 1, 2); R(x, "#bdb59e", 18, 23, 14, 2); R(x, "#bdb59e", 4, 24, 10, 2); });
  S.lunette = mk(36, 60, x => { R(x, "#3a2c20", 17, 26, 2, 30); R(x, "#3a2c20", 9, 54, 18, 3); R(x, "#3a2c20", 12, 40, 12, 1); x.save(); x.translate(18, 22); x.rotate(-.6); R(x, "#b08a3c", -16, -3, 30, 6); R(x, "#e2c26a", -16, -3, 30, 2); R(x, "#8a6a2c", 12, -4, 4, 8); R(x, "#8a6a2c", -18, -2, 3, 4); x.restore(); });
  S.scarabee = mk(16, 14, x => { disc(x, "#3aa36a", 8, 8, 5, 4); R(x, "#7fe0a0", 6, 5, 2, 2); R(x, "#c9a24a", 8, 4, 1, 8); R(x, "#1c3a28", 2, 6, 2, 1); R(x, "#1c3a28", 12, 6, 2, 1); R(x, "#1c3a28", 2, 10, 2, 1); R(x, "#1c3a28", 12, 10, 2, 1); R(x, "#1c3a28", 6, 2, 1, 2); R(x, "#1c3a28", 9, 2, 1, 2); }, true);
  S.mot = mk(24, 30, x => { R(x, "#efe4c8", 2, 2, 20, 26); R(x, "#c9b990", 2, 27, 20, 1); for(let j = 6; j < 24; j += 3) R(x, "#55483a", 5, j, 6 + ((j*7) % 9), 1); }, true);
  /* les quatre lueurs de l'histoire : de petites scènes qui flottent dans la nuit */
  const lueur = draw => mk(48, 36, x => { halo(x, 24, 19, 22, "#4f1c1c", "#c2501c"); halo(x, 24, 19, 13, "#f08a24", "#ffe9a8"); draw(x); }, true);
  S.lueurs = [
    lueur(x => { R(x, "#f3ead6", 8, 10, 32, 3); x.fillStyle = "#f3ead6"; x.beginPath(); x.moveTo(8, 10); x.lineTo(24, 3); x.lineTo(40, 10); x.fill(); for(let i = 10; i < 40; i += 6) R(x, "#e2d6bc", i, 13, 3, 14); R(x, "#c9bda0", 6, 27, 36, 3); R(x, "#5a4a3a", 19, 23, 10, 3); disc(x, "#d9a886", 20, 22, 1, 1); }),
    lueur(x => { disc(x, "#5a3d24", 24, 22, 11, 7); disc(x, "#7a5433", 24, 20, 11, 5); R(x, "#8f8f8f", 16, 8, 1, 12); R(x, "#8f8f8f", 24, 6, 1, 14); R(x, "#8f8f8f", 32, 8, 1, 12); R(x, "#2a2018", 8, 24, 3, 8); disc(x, "#d9a886", 9, 22, 2, 2); R(x, "#2a2018", 38, 24, 3, 8); disc(x, "#d9a886", 39, 22, 2, 2); R(x, "#c9b990", 11, 21, 5, 1); R(x, "#c9b990", 33, 21, 5, 1); }),
    lueur(x => { R(x, "#17130f", 14, 14, 4, 16); disc(x, "#d9a886", 16, 12, 2, 2); R(x, "#efefe8", 24, 20, 5, 9); disc(x, "#d9a886", 26, 16, 2, 2); R(x, "#efefe8", 22, 22, 2, 5); R(x, "#17130f", 30, 16, 4, 14); disc(x, "#d9a886", 32, 14, 2, 2); for(let i = 6; i < 44; i += 4){ disc(x, "#3a2c20", i, 31, 1, 1); R(x, "#3a2c20", i - 1, 32, 3, 3); } }),
    lueur(x => { R(x, "#6b2a25", 8, 22, 30, 6); R(x, "#8a3a30", 8, 20, 30, 3); R(x, "#6b2a25", 34, 14, 5, 9); R(x, "#3a2018", 10, 28, 2, 4); R(x, "#3a2018", 35, 28, 2, 4); R(x, "#c9b78f", 12, 18, 18, 2); disc(x, "#d9a886", 31, 17, 2, 2); R(x, "#2a2018", 40, 16, 4, 12); disc(x, "#d9a886", 42, 14, 2, 2); R(x, "#efefe8", 41, 17, 2, 2); })
  ];

  /* ---------- le cabinet de Jung (160 × 100) ----------
     On dessine d'abord tout à plat, puis on éclaire (le feu, la lampe, la fenêtre), puis on pose ce qui brille. */
  const sol = (x, y0) => { R(x, "#3d2a1c", 0, y0, 160, 100 - y0); for(let j = y0; j < 100; j++){ const k = (j - 40)/60; for(let i = -6; i <= 12; i++){ const xb = -60 + i*26, xx = 80 + (xb - 80)*k; if(xx >= 0 && xx < 160) R(x, "#2a2622", xx, j, 1, 1); } } for(const j of [y0 + 3, y0 + 9, y0 + 18, y0 + 30]){ for(let i = (j*7) % 40; i < 160; i += 52) R(x, "#2a2622", i, j, 9, 1); } };
  function cabinet(x, t, o){
    o = o || {}; const fl = .82 + .18*Math.sin(t*9)*Math.sin(t*3.7), r = rng(((t*9) | 0) + 5), ecl = o.eclair || 0, fx0 = 120, fo = o.miroir ? 27 : 0;
    /* le mur, la corniche, le lambris, le sol */
    R(x, "#2f4a3a", 0, 0, 160, 62); for(let j = 6; j < 46; j += 8) for(let i = ((j/8 | 0) % 2)*6 + 3; i < 160; i += 12){ R(x, "#4f6a52", i, j, 1, 3); R(x, "#4f6a52", i - 1, j + 1, 3, 1); }
    R(x, "#3d2a1c", 0, 0, 160, 4); R(x, "#5c3f26", 0, 3, 160, 1); R(x, "#2a2622", 0, 4, 160, 1);
    R(x, "#5c3f26", 0, 46, 160, 16); R(x, "#86603a", 0, 46, 160, 1); R(x, "#3d2a1c", 0, 47, 160, 1); for(let i = 2; i < 160; i += 18){ R(x, "#3d2a1c", i, 49, 14, 11); R(x, "#5c3f26", i + 1, 50, 12, 9); R(x, "#86603a", i + 1, 50, 12, 1); } R(x, "#2a2622", 0, 61, 160, 1);
    sol(x, 62);
    /* le tapis, en trapèze */
    for(let j = 74; j < 97; j++){ const k = (j - 74)/23, a = 30 - k*10, b = 130 + k*10; R(x, "#4f1c1c", a, j, b - a, 1); if(j > 75 && j < 95) R(x, "#7a2c24", a + 3, j, b - a - 6, 1); if(j === 78 || j === 92) R(x, "#b08a3c", a + 5, j, b - a - 10, 1); }
    for(let i = 0; i < 7; i++){ const cx = 44 + i*12; R(x, "#8a3a30", cx, 83, 5, 5); R(x, "#b08a3c", cx + 2, 85, 1, 1); } for(let i = 21; i < 140; i += 3) R(x, "#d9cfb8", i, 97, 1, 2);
    /* la bibliothèque */
    const cs = ["#7a2c24", "#2f4a3a", "#2e3a66", "#b08a3c", "#4f1c1c", "#86603a", "#6a5a8a", "#45423c"], rb = rng(77);
    if(!o.miroir){ R(x, "#2a2622", 44, 7, 26, 41); R(x, "#3d2a1c", 45, 8, 24, 39); const _ = ["#7a2c24", "#2f4a3a", "#2e3a66", "#b08a3c", "#4f1c1c", "#86603a", "#6a5a8a", "#45423c"], rb = rng(77);
    for(let j = 9; j < 46; j += 10){ R(x, "#5c3f26", 45, j + 8, 24, 1); let i = 46; while(i < 68){ const w = 1 + ((rb()*3) | 0), hh = 6 + ((rb()*2) | 0); R(x, cs[(rb()*cs.length) | 0], i, j + 8 - hh, w, hh); if(rb() > .6) R(x, "#e2bd5a", i, j + 3, w, 1); i += w; } }
    R(x, "#86603a", 43, 6, 28, 1); }
    /* la pendule */
    R(x, "#2a2622", 99, 8, 12, 40); R(x, "#5c3f26", 100, 9, 10, 38); R(x, "#3d2a1c", 101, 21, 8, 24); R(x, "#86603a", 99, 7, 12, 1); disc(x, "#f4efe2", 105, 15, 3, 3); R(x, "#2a2622", 105, 13, 1, 3); R(x, "#2a2622", 105, 15, 2, 1);
    const pa = Math.sin(t*3)*2.2; R(x, "#b08a3c", 105 + pa*.5, 22, 1, 12); disc(x, "#e2bd5a", 105 + pa, 35, 2, 2);
    /* la cheminée, le mandala au-dessus */
    x.save(); x.translate(fo, 0);
    R(x, "#a89c84", 4, 24, 38, 38); R(x, "#d9cfb8", 2, 21, 42, 4); R(x, "#6f6a5e", 3, 25, 40, 1); R(x, "#6f6a5e", 4, 26, 4, 36); R(x, "#6f6a5e", 38, 26, 4, 36); R(x, "#d9cfb8", 20, 26, 6, 5); R(x, "#0a0a14", 10, 33, 26, 29); R(x, "#2a2622", 10, 33, 26, 2);
    R(x, "#3d2a1c", 13, 58, 20, 3); R(x, "#2a2622", 12, 60, 22, 2); R(x, "#45423c", 11, 52, 1, 10); R(x, "#45423c", 34, 52, 1, 10);
    disc(x, "#b08a3c", 23, 12, 6, 6); disc(x, "#14162b", 23, 12, 5, 5); disc(x, "#7a2c24", 23, 12, 3, 3); disc(x, "#e2bd5a", 23, 12, 1, 1); for(let k = 0; k < 8; k++){ const a = k*Math.PI/4; R(x, k % 2 ? "#4a5a8a" : "#e2bd5a", 23 + Math.cos(a)*4, 12 + Math.sin(a)*4, 1, 1); }
    R(x, "#b08a3c", 37, 15, 2, 6); R(x, "#f4efe2", 37, 12, 2, 3); R(x, "#45423c", 7, 17, 5, 4); disc(x, "#d9cfb8", 9, 18, 1, 1); x.restore();
    /* la fenêtre et ses rideaux */
    R(x, "#3d2a1c", fx0 - 2, 6, 36, 46); R(x, o.vitre === "miroir" ? "#8fa3c8" : "#14162b", fx0, 8, 32, 42);
    if(o.vitre !== "miroir"){ R(x, "#17203a", fx0, 36, 32, 14); disc(x, "#0a0a14", fx0 + 8, 38, 8, 6); disc(x, "#0a0a14", fx0 + 25, 40, 8, 7); R(x, "#0a0a14", fx0 + 15, 30, 2, 20); disc(x, "#0a0a14", fx0 + 16, 28, 4, 5); }
    R(x, "#3d2a1c", fx0 + 15, 8, 2, 42); R(x, "#3d2a1c", fx0, 28, 32, 2); R(x, "#5c3f26", fx0 - 2, 50, 36, 2);
    for(const [cx, w] of [[fx0 - 8, 9], [fx0 + 31, 9]]){ R(x, "#4f1c1c", cx, 5, w, 49); for(let i = 1; i < w; i += 3) R(x, "#7a2c24", cx + i, 6, 1, 47); R(x, "#b08a3c", cx, 36, w, 1); } R(x, "#b08a3c", fx0 - 10, 3, 52, 2); R(x, "#e2bd5a", fx0 - 10, 3, 52, 1);
    /* le fauteuil et Jung */
    if(!o.vide){ R(x, "#2a2622", 69, 24, 26, 30); R(x, "#4f1c1c", 71, 26, 22, 26); R(x, "#7a2c24", 72, 27, 20, 4); R(x, "#b08a3c", 70, 25, 1, 1); R(x, "#b08a3c", 93, 25, 1, 1);
      R(x, "#f4efe2", 72, 38, 20, 16); R(x, "#d9cfb8", 72, 40, 3, 14); R(x, "#d9cfb8", 89, 40, 3, 14); R(x, "#d9cfb8", 78, 38, 1, 14); R(x, "#d9cfb8", 85, 38, 1, 14); R(x, "#f4efe2", 80, 37, 4, 4); R(x, "#2a2622", 81, 39, 2, 9);
      R(x, "#c08a6a", 80, 35, 4, 3); disc(x, "#e0b08e", 82, 29, 5, 6); R(x, "#c08a6a", 86, 26, 1, 8); R(x, "#f4efe2", 77, 23, 10, 2); R(x, "#f4efe2", 76, 24, 2, 6); R(x, "#f4efe2", 86, 24, 2, 6); R(x, "#e0b08e", 79, 25, 6, 1);
      R(x, "#2a2622", 78, 28, 4, 3); R(x, "#2a2622", 83, 28, 4, 3); R(x, "#cfd9ea", 79, 29, 2, 1); R(x, "#cfd9ea", 84, 29, 2, 1); R(x, "#f4efe2", 79, 32, 7, 1); R(x, "#d9cfb8", 80, 33, 5, 1); R(x, "#7a2c24", 81, 34, 3, 1);
      R(x, "#3d2a1c", 85, 34, 5, 1); R(x, "#2a2622", 89, 32, 3, 3); }
    /* le bureau et ce qui est posé dessus */
    R(x, "#3d2a1c", 52, 55, 62, 15); R(x, "#86603a", 49, 52, 68, 2); R(x, "#5c3f26", 49, 54, 68, 1); R(x, "#2a2622", 52, 69, 62, 1);
    for(const cx of [55, 86]){ R(x, "#2a2622", cx, 57, 25, 11); R(x, "#5c3f26", cx + 1, 58, 23, 9); R(x, "#86603a", cx + 1, 58, 23, 1); R(x, "#e2bd5a", cx + 11, 62, 3, 1); } R(x, "#2a2622", 81, 57, 4, 12);
    if(!o.miroir){ R(x, "#b08a3c", 59, 45, 1, 7); R(x, "#b08a3c", 57, 51, 5, 1); R(x, "#2f4a3a", 54, 41, 11, 4); } R(x, "#f4efe2", 95, 50, 12, 2); R(x, "#d9cfb8", 95, 51, 12, 1); R(x, "#2a2622", 101, 50, 1, 2); R(x, "#7a2c24", 67, 49, 8, 3); R(x, "#2e3a66", 68, 47, 7, 2); R(x, "#14162b", 110, 49, 3, 3); R(x, "#f4efe2", 111, 45, 1, 4);
    if(o.couche){ R(x, "#2f4a3a", 0, 87, 160, 13); R(x, "#4f6a52", 0, 87, 160, 1); for(let i = 6; i < 160; i += 14) R(x, "#14162b", i, 92, 1, 1); R(x, "#a89c84", 58, 82, 44, 7); R(x, "#d9cfb8", 58, 82, 44, 2); }
    /* la lumière */
    const L = []; let amb = o.couche ? .1 : .17;
    if(!o.eteint){ L.push([23 + fo, 50, 104, .95*fl], [59, 47, 34, .5], [fx0 + 16, 30, 46, .2]); } else { L.push([fx0 + 16, 30, 86, .42]); amb = .1; }
    if(ecl > 0){ amb += .5*ecl; L.push([fx0 + 16, 28, 130, .9*ecl]); }
    relight(x, 160, 100, L, amb);
    /* ce qui brille : les flammes, la lampe, la braise, la bougie, l'éclair, la pluie */
    if(!o.eteint){ for(let i = 0; i < 10; i++){ const fx = 12 + fo + i*2.1, fh = 5 + r()*15*fl*(1 - Math.abs(i - 4.5)/7); R(x, "#c2501c", fx, 59 - fh, 3, fh); R(x, "#f08a24", fx + .5, 59 - fh*.72, 2, fh*.72); if(r() > .35) R(x, "#ffe9a8", fx + 1, 59 - fh*.4, 1, fh*.4); } for(let i = 0; i < 3; i++) if(r() > .5) R(x, "#f08a24", 14 + fo + r()*18, 36 + r()*10, 1, 1);
      if(!o.miroir){ R(x, "#3aa36a", 54, 41, 11, 3); R(x, "#ffe9a8", 55, 44, 9, 1); } R(x, "#ffe9a8", 37 + fo, 10, 2, 2); R(x, "#f08a24", 37 + fo, 11, 2, 1); if(!o.vide) R(x, "#f08a24", 89, 32, 3, 1); }
    else { R(x, "#4f1c1c", 15 + fo, 59, 3, 1); R(x, "#7a2c24", 24 + fo, 58, 2, 1); }
    if(!o.vide){ const ph = (t*.45) % 1; for(let i = 0; i < 3; i++){ const k = (ph + i/3) % 1; if(k < .8 && ((i + ((t*3) | 0)) & 1)) R(x, k < .4 ? "#8fa3c8" : "#4a5a8a", 90 + Math.round(Math.sin(k*6 + i)*2), 29 - k*18, 1 + (k > .4), 1); } }
    if(o.vitre === "miroir"){ R(x, "#cfd9ea", fx0 + 3, 10, 3, 16); R(x, "#cfd9ea", fx0 + 20, 32, 2, 12); disc(x, "#14162b", fx0 + 24, 20, 3, 4); R(x, "#14162b", fx0 + 20, 24, 9, 4); disc(x, "#14162b", fx0 + 8, 40, 3, 4); R(x, "#14162b", fx0 + 4, 44, 9, 6); R(x, "#3d2a1c", fx0 + 15, 8, 2, 42); R(x, "#3d2a1c", fx0, 28, 32, 2); }
    else { if(ecl > .5){ for(const [a, b, w, hh] of [[0, 8, 15, 20], [17, 8, 15, 20], [0, 30, 15, 20], [17, 30, 15, 20]]) R(x, "#cfd9ea", fx0 + a, b, w, hh); disc(x, "#4a5a8a", fx0 + 8, 44, 8, 6); disc(x, "#4a5a8a", fx0 + 25, 46, 7, 5);
        if(o.silhouette){ disc(x, "#0a0a14", fx0 + 23, 31, 2, 3); R(x, "#0a0a14", fx0 + 20, 34, 7, 16); R(x, "#0a0a14", fx0 + 19, 36, 1, 9); R(x, "#0a0a14", fx0 + 27, 36, 1, 9); } R(x, "#2a2622", fx0 + 15, 8, 2, 42); R(x, "#2a2622", fx0, 28, 32, 2); }
      else { R(x, "#cfd9ea", fx0 + 5, 12, 1, 1); R(x, "#8fa3c8", fx0 + 24, 16, 1, 1); R(x, "#8fa3c8", fx0 + 11, 22, 1, 1); }
      if(o.pluie){ const rp = rng(((t*16) | 0) + 3); for(let i = 0; i < 18; i++){ const a = fx0 + rp()*31, b = 8 + rp()*38; if(Math.abs(a - fx0 - 15.5) > 1.5) R(x, ecl > .5 ? "#4a5a8a" : "#2e3a66", a, b, 1, 3); } } }
    if((o.eteint && o.assis) || o.invite){ disc(x, "#000004", 34, 67, 5, 6); R(x, "#000004", 26, 72, 16, 26); R(x, "#000004", 23, 78, 3, 16); R(x, "#000004", 42, 78, 3, 16); R(x, "#cfd9ea", 32, 66, 1, 1); R(x, "#cfd9ea", 36, 66, 1, 1); }
  }

  /* ---------- le visage (80 × 50), éclairé de côté par le feu ---------- */
  function visage(x, t, o){
    o = o || {}; const fl = .85 + .15*Math.sin(t*8)*Math.sin(t*3.1), blink = (t % 4.2) > 4.05, talk = o.parle && ((t*7) | 0) % 2 === 0;
    R(x, "#17203a", 0, 0, 80, 50); R(x, "#2f4a3a", 0, 0, 58, 50); for(let j = 5; j < 50; j += 14) for(let i = ((j/14 | 0) % 2)*9 + 4; i < 58; i += 18) R(x, "#4f6a52", i, j, 1, 1);
    R(x, "#2a2622", 58, 0, 22, 44); const cs = ["#7a2c24", "#2f4a3a", "#2e3a66", "#b08a3c", "#4f1c1c", "#86603a"]; for(let j = 2; j < 42; j += 11){ R(x, "#5c3f26", 59, j + 9, 21, 1); for(let i = 60; i < 80; i += 3){ R(x, cs[(i*3 + j) % 6], i, j + 1 + (i % 2), 2, 8 - (i % 2)); } }
    /* le fauteuil, les épaules, le col, la cravate */
    R(x, "#4f1c1c", 12, 33, 56, 17); disc(x, "#4f1c1c", 40, 33, 28, 5); R(x, "#7a2c24", 16, 30, 48, 1); R(x, "#b08a3c", 12, 33, 1, 2); R(x, "#b08a3c", 67, 33, 1, 2);
    R(x, "#f4efe2", 13, 42, 54, 8); R(x, "#f4efe2", 18, 40, 44, 3); R(x, "#d9cfb8", 13, 45, 4, 5); R(x, "#d9cfb8", 62, 43, 5, 7); R(x, "#d9cfb8", 29, 42, 1, 8); R(x, "#d9cfb8", 50, 42, 1, 8); R(x, "#d9cfb8", 31, 44, 4, 6); R(x, "#d9cfb8", 45, 44, 4, 6);
    R(x, "#f4efe2", 35, 39, 10, 7); R(x, "#cfd9ea", 35, 39, 2, 3); R(x, "#cfd9ea", 43, 39, 2, 3); R(x, "#2a2622", 38, 41, 4, 9); R(x, "#45423c", 39, 41, 1, 9);
    R(x, "#c08a6a", 34, 35, 12, 5);
    /* la tête : le volume, les joues, le front */
    disc(x, "#e0b08e", 40, 21, 13, 16); R(x, "#e0b08e", 30, 30, 20, 6); disc(x, "#e0b08e", 40, 33, 9, 4); R(x, "#c08a6a", 49, 12, 4, 20); R(x, "#c08a6a", 45, 32, 5, 4); R(x, "#c08a6a", 36, 36, 9, 1);
    R(x, "#e0b08e", 25, 18, 3, 7); R(x, "#c08a6a", 26, 20, 1, 3); R(x, "#c08a6a", 52, 18, 3, 7);
    /* les cheveux blancs */
    disc(x, "#f4efe2", 40, 8, 12, 4); R(x, "#e0b08e", 32, 8, 16, 6); R(x, "#f4efe2", 27, 8, 4, 10); R(x, "#f4efe2", 49, 8, 5, 10); R(x, "#d9cfb8", 28, 15, 2, 4); R(x, "#d9cfb8", 51, 13, 2, 6); R(x, "#f4efe2", 31, 5, 18, 2); R(x, "#f4efe2", 34, 7, 3, 2); R(x, "#f4efe2", 44, 7, 4, 2);
    R(x, "#c08a6a", 34, 12, 12, 1); R(x, "#c08a6a", 36, 14, 8, 1);
    /* les sourcils, les lunettes rondes, les yeux */
    R(x, "#f4efe2", 30, 16, 8, 1); R(x, "#f4efe2", 43, 16, 8, 1); R(x, "#d9cfb8", 31, 17, 3, 1); R(x, "#d9cfb8", 47, 17, 3, 1);
    const lun = cx => { for(let a = 0; a < 24; a++){ const k = a*Math.PI/12; R(x, "#2a2622", Math.round(cx + Math.cos(k)*4.6), Math.round(21.5 + Math.sin(k)*4.6), 1, 1); } };
    lun(34); lun(46); R(x, "#2a2622", 39, 20, 3, 1); R(x, "#2a2622", 25, 20, 5, 1); R(x, "#2a2622", 51, 20, 4, 1);
    if(blink){ R(x, "#c08a6a", 32, 22, 5, 1); R(x, "#c08a6a", 44, 22, 5, 1); } else { R(x, "#f4efe2", 32, 21, 5, 2); R(x, "#f4efe2", 44, 21, 5, 2); R(x, "#2e3a66", 34 + (o.regard || 0), 21, 2, 2); R(x, "#2e3a66", 46 + (o.regard || 0), 21, 2, 2); R(x, "#c08a6a", 32, 20, 5, 1); R(x, "#c08a6a", 44, 20, 5, 1); R(x, "#c08a6a", 32, 23, 5, 1); R(x, "#c08a6a", 44, 23, 5, 1); }
    /* le nez, la moustache, la bouche, le menton */
    R(x, "#c08a6a", 41, 19, 1, 8); R(x, "#c08a6a", 38, 27, 6, 1); R(x, "#c08a6a", 37, 26, 1, 1); R(x, "#c08a6a", 44, 26, 1, 1);
    R(x, "#f4efe2", 33, 29, 15, 2); R(x, "#f4efe2", 32, 30, 3, 2); R(x, "#f4efe2", 46, 30, 3, 2); R(x, "#d9cfb8", 35, 31, 11, 1); R(x, "#d9cfb8", 40, 29, 1, 2);
    R(x, "#7a2c24", 37, 32, 7, 1); if(talk){ R(x, "#4f1c1c", 37, 33, 7, 1); R(x, "#e0b08e", 38, 34, 5, 1); }
    /* la pipe */
    R(x, "#3d2a1c", 44, 32, 9, 2); R(x, "#2a2622", 52, 29, 5, 6); R(x, "#5c3f26", 53, 30, 3, 4);
    relight(x, 80, 50, [[0, 24, 104, 1.22*fl], [55, 28, 12, .3*fl]], .2, .55);
    /* ce qui brille : la braise, les reflets des verres, les yeux, la fumée */
    R(x, "#f08a24", 53, 29, 3, 1); if(fl > .9) R(x, "#ffe9a8", 54, 29, 1, 1);
    R(x, "#f4efe2", 31, 19, 2, 1); R(x, "#f4efe2", 31, 20, 1, 1); R(x, "#cfd9ea", 43, 19, 2, 1); if(!blink){ R(x, "#f4efe2", 34 + (o.regard || 0), 21, 1, 1); R(x, "#cfd9ea", 46 + (o.regard || 0), 21, 1, 1); }
    const ph = (t*.4) % 1; for(let i = 0; i < 4; i++){ const k = (ph + i/4) % 1, sx = 55 + Math.round(Math.sin(k*5 + i*2)*3), sy = Math.round(27 - k*26); if(k < .85){ R(x, k < .35 ? "#8fa3c8" : "#4a5a8a", sx, sy, 1 + (k > .3), 1); if(k > .5) R(x, "#2e3a66", sx + 2, sy - 1, 1, 1); } }
  }

  /* ---------- le miroir de la nuit : un cadre d'artisan, et dedans le cabinet ou l'ombre ---------- */
  const MW = 80, MH = 104, cab = cv(160, 100), mir = cv(MW, MH);
  function cadre(x){
    const arc = (c, m) => { x.fillStyle = c; x.beginPath(); x.moveTo(m, 102 - m*.5); x.lineTo(m, 38); x.quadraticCurveTo(m, m, 40, m); x.quadraticCurveTo(80 - m, m, 80 - m, 38); x.lineTo(80 - m, 102 - m*.5); x.closePath(); x.fill(); };
    arc("#3d2a1c", 5); arc("#b08a3c", 6); arc("#e2bd5a", 7); arc("#b08a3c", 9); arc("#3d2a1c", 11);
    for(let j = 40; j < 96; j += 5){ R(x, "#ffe9a8", 7, j, 1, 2); R(x, "#86603a", 9, j + 2, 1, 2); R(x, "#ffe9a8", 71, j, 1, 2); R(x, "#86603a", 73, j + 2, 1, 2); }
    for(let a = 1; a < 16; a++){ const k = Math.PI*(1 - a/16); R(x, "#ffe9a8", Math.round(40 + Math.cos(k)*31), Math.round(35 - Math.sin(k)*27), 1, 1); }
    R(x, "#3d2a1c", 3, 99, 74, 5); R(x, "#b08a3c", 3, 99, 74, 2); R(x, "#e2bd5a", 4, 99, 72, 1); R(x, "#86603a", 6, 102, 5, 2); R(x, "#86603a", 69, 102, 5, 2);
    for(const [a, b] of [[40, 4], [29, 6], [51, 6], [19, 11], [61, 11], [12, 19], [68, 19]]){ disc(x, "#e2bd5a", a, b, 2, 2); R(x, "#ffe9a8", a - 1, b - 1, 1, 1); R(x, "#86603a", a + 1, b + 1, 1, 1); }
    disc(x, "#b08a3c", 40, 2, 4, 2); R(x, "#ffe9a8", 38, 1, 3, 1); disc(x, "#7a2c24", 40, 5, 1, 1);
    for(const sx of [3, 75]){ R(x, "#b08a3c", sx, 56, 2, 14); R(x, "#e2bd5a", sx, 58, 2, 3); R(x, "#e2bd5a", sx, 64, 2, 3); }
  }
  const verre = x => { x.beginPath(); x.moveTo(12, 96); x.lineTo(12, 38); x.quadraticCurveTo(12, 12, 40, 12); x.quadraticCurveTo(68, 12, 68, 38); x.lineTo(68, 96); x.closePath(); };
  const cadreLit = x => { const k = cv(MW, MH), kx = k.getContext("2d"); cadre(kx); relight(kx, MW, MH, [[40, 50, 80, .5]], .5); const d = kx.getImageData(0, 0, MW, MH), src = cv(MW, MH), sx = src.getContext("2d"); cadre(sx); const m = sx.getImageData(0, 0, MW, MH).data; for(let i = 0; i < MW*MH; i++) if(m[i*4 + 3] < 128) d.data[i*4 + 3] = 0; kx.putImageData(d, 0, 0); return k; };
  let tFace = -1, tBack = -1, texFace = null, texBack = null, frameCv = null;
  const frame = x => { if(!frameCv) frameCv = cadreLit(); x.clearRect(0, 0, MW, MH); x.drawImage(frameCv, 0, 0); };
  function miroirFace(t){ const k = (t*8) | 0; if(k === tFace && texFace) return texFace; tFace = k;
    const cx = cab.getContext("2d"); cabinet(cx, t, {miroir:true}); const x = mir.getContext("2d"); frame(x); x.save(); verre(x); x.clip(); x.imageSmoothingEnabled = false; x.drawImage(cab, 30, 0, 67, 100, 12, 12, 56, 84); x.restore();
    return (texFace = toRaw(mir)); }
  function miroirDos(t, sway){ const k = ((t*10) | 0) + ((sway*40) | 0)*1000; if(k === tBack && texBack) return texBack; tBack = k;
    const x = mir.getContext("2d"); frame(x); x.save(); verre(x); x.clip(); R(x, "#14162b", 0, 0, MW, MH); for(let j = 14; j < 96; j++) for(let i = 12; i < 68; i++) if(BAYER[(i & 3) | ((j & 3) << 2)] < .16 + (i < 22 ? .3 : 0)) R(x, "#1f2444", i, j, 1, 1);
    const sx = Math.round(40 + sway*9), by = Math.round(Math.sin(t*1.3)); disc(x, "#000004", sx, 42 + by, 6, 8); R(x, "#000004", sx - 4, 49 + by, 8, 5); R(x, "#000004", sx - 11, 53 + by, 22, 44); R(x, "#000004", sx - 13, 56 + by, 2, 30); R(x, "#000004", sx + 11, 56 + by, 2, 30); R(x, "#cfd9ea", sx - 3, 41 + by, 2, 1); R(x, "#cfd9ea", sx + 2, 41 + by, 2, 1); x.restore();
    return (texBack = toRaw(mir)); }
  function miroirMaison(lit){ const x = mir.getContext("2d"); frame(x); x.save(); verre(x); x.clip(); R(x, "#14162b", 0, 0, MW, MH); const r = rng(5); for(let i = 0; i < 34; i++) R(x, r() > .7 ? "#cfd9ea" : "#4a5a8a", 12 + r()*56, 14 + r()*36, 1, 1);
    for(let i = 0; i < 7; i++){ R(x, "#0a0a14", 14 + i*9, 50 - (i % 2)*6, 3, 46); disc(x, "#0a0a14", 15 + i*9, 48 - (i % 2)*6, 5, 9); } R(x, "#17203a", 12, 88, 56, 8); R(x, "#2a2622", 29, 66, 22, 24); x.fillStyle = "#3d2a1c"; x.beginPath(); x.moveTo(26, 67); x.lineTo(40, 54); x.lineTo(54, 67); x.fill();
    const win = () => { R(x, lit ? "#ffe9a8" : "#14162b", 33, 72, 7, 7); R(x, "#2a2622", 36, 72, 1, 7); R(x, "#2a2622", 33, 75, 7, 1); }; win(); R(x, "#0a0a14", 43, 77, 5, 13); if(lit){ halo(x, 36, 75, 10, "#c2501c", "#f08a24"); win(); R(x, "#f08a24", 43, 90, 5, 1); } x.restore(); return toRaw(mir); }
  /* pour voir une texture hors du moteur (le carnet, les essais) */
  const show = (t, lv) => { const c = cv(t.w, t.h), x = c.getContext("2d"), im = x.createImageData(t.w, t.h), o = new Uint32Array(im.data.buffer); for(let i = 0; i < o.length; i++) o[i] = t.raw ? t.d[i] : (t.i[i] ? LUT[t.i[i]*8 + (lv == null ? 5 : lv)] : 0); x.putImageData(im, 0, 0); return c; };
  return {W, S, PAL, LUT, BAYER, setTheme, theme:() => theme, cabinet, visage, miroirFace, miroirDos, miroirMaison, mk, R, disc, rng, toTex, toRaw, cv, relight, halo, show};
})();
