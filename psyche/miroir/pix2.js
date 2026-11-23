/* ===== Arcanes · Psyché · Le Miroir : les images des époques =====
   Même palette, même lumière tramée que pix.js. Ici : les personnages, les décors 3D d'Épidaure, de Passy et de Buzancy,
   et les scènes 2D (le salon de Mesmer, le cabinet de Faria, Braid, Bernheim et Janet, l'amphithéâtre de la Salpêtrière,
   le divan de Vienne, la pharmacie de Coué). Tout est dessiné par le code. */
(() => {
  const PX = window.MiroirPix, {mk, R, disc, rng, relight, halo, W, S, cv} = PX;
  Object.assign(PX.THEMES, { aube:{sh:[34, 26, 52], hi:[255, 214, 176]}, songe:{sh:[10, 10, 30], hi:[214, 226, 255]}, bougie:{sh:[16, 8, 26], hi:[255, 220, 150]}, gaz:{sh:[14, 18, 22], hi:[226, 240, 214]}, jour:{sh:[36, 40, 58], hi:[255, 248, 226]} });
  const noise = (x, w, h, cols, seed, n) => { const r = rng(seed); for(let i = 0; i < n; i++) R(x, cols[(r()*cols.length) | 0], r()*w, r()*h, 1 + r()*2, 1); };
  const SK = "#e0b08e", SK2 = "#c08a6a", NO = "#2a2622";

  /* ---------- un personnage (12 × 24 debout, 12 × 17 assis), pieds en (cx, by) ---------- */
  function perso(x, cx, by, o){
    o = o || {}; const k = o.k || 1, Q = (c, a, b, w, h) => R(x, c, cx + Math.round((a - cx)*k), by + Math.round((b - by)*k), Math.ceil(w*k), Math.ceil(h*k));
    const sk = o.skin || SK, c = o.c || NO, c2 = o.c2 || c, hr = o.h || "#3d2a1c", p = o.p || NO, as = o.pose === "assis", H = as ? 17 : 24, top = by - H + (o.dy || 0), hx = cx + (o.tilt || 0);
    if(o.pose === "couche"){ Q(c, cx - 9, by - 4, 14, 3); Q(c2, cx - 9, by - 2, 14, 1); Q(p, cx + 5, by - 4, 6, 3); Q(sk, cx - 13, by - 6, 4, 4); Q(hr, cx - 14, by - 6, 2, 4); return; }
    if(o.robe){ Q(c, cx - 4, top + 12, 9, H - 12); Q(c2, cx - 5, by - 4, 11, 4); Q(c2, cx - 4, top + 12, 1, H - 12); }
    else if(as){ Q(p, cx - 3, top + 13, 8, 3); Q(p, cx + 3, top + 14, 2, 3); }
    else { Q(p, cx - 3, top + 15, 3, 9); Q(p, cx + 1, top + 15, 3, 9); Q(NO, cx - 3, by - 1, 3, 1); Q(NO, cx + 1, by - 1, 3, 1); }
    Q(c, cx - 3, top + 6, 7, as ? 8 : 10); Q(c2, cx - 3, top + 6, 1, as ? 8 : 10); if(o.gilet) Q(o.gilet, cx - 1, top + 7, 3, 6); if(o.col !== false) Q(o.col || "#f4efe2", cx - 1, top + 6, 3, 1);
    if(o.bras === "haut"){ Q(c, cx + 4, top + 1, 2, 7); Q(sk, cx + 4, top, 2, 1); Q(c2, cx - 4, top + 7, 1, 6); }
    else if(o.bras === "deux"){ Q(c, cx + 4, top + 1, 2, 7); Q(sk, cx + 4, top, 2, 1); Q(c, cx - 5, top + 1, 2, 7); Q(sk, cx - 5, top, 2, 1); }
    else if(o.bras === "tendu"){ Q(c, cx + 4, top + 7, 6, 2); Q(sk, cx + 10, top + 7, 1, 2); Q(c2, cx - 4, top + 7, 1, 6); }
    else if(o.bras === "tenduG"){ Q(c, cx - 9, top + 7, 6, 2); Q(sk, cx - 10, top + 7, 1, 2); Q(c2, cx + 4, top + 7, 1, 6); }
    else if(o.bras === "avant"){ Q(c, cx + 4, top + 7, 5, 2); Q(c, cx - 3, top + 9, 8, 2); Q(sk, cx + 9, top + 7, 1, 2); Q(sk, cx + 5, top + 9, 1, 2); }
    else { Q(c2, cx + 4, top + 7, 1, 7); Q(c2, cx - 4, top + 7, 1, 7); Q(sk, cx + 4, top + 14, 1, 1); Q(sk, cx - 4, top + 14, 1, 1); }
    Q(sk, hx - 2, top + 1, 5, 5); Q(o.skin2 || SK2, hx + 2, top + 2, 1, 4); Q(hr, hx - 2, top, 5, 2);
    if(o.long){ Q(hr, hx - 3, top + 1, 1, 6); Q(hr, hx + 3, top + 1, 1, 6); } if(o.chignon){ Q(hr, hx - 2, top - 2, 5, 2); Q(hr, hx - 1, top - 3, 3, 1); }
    if(o.perruque){ Q("#f4efe2", hx - 3, top, 7, 2); Q("#d9cfb8", hx - 3, top + 2, 1, 4); Q("#d9cfb8", hx + 3, top + 2, 1, 4); }
    if(o.chauve){ Q(sk, hx - 1, top, 3, 1); } if(o.barbe){ Q(o.barbe, hx - 2, top + 4, 5, 3); Q(o.barbe, hx - 1, top + 7, 3, 1); } if(o.favoris){ Q(hr, hx - 2, top + 2, 1, 4); Q(hr, hx + 2, top + 2, 1, 4); }
    if(o.bandeau){ Q("#f4efe2", hx - 2, top + 2, 5, 2); } else if(o.ferme){ Q(SK2, hx - 1, top + 3, 1, 1); Q(SK2, hx + 1, top + 3, 1, 1); } else if(o.yeux !== false){ Q(NO, hx - 1, top + 3, 1, 1); Q(NO, hx + 1, top + 3, 1, 1); }
    if(o.bouche) Q("#7a2c24", hx - 1, top + 5, 2, 1);
    if(o.lunettes){ Q(NO, hx - 2, top + 3, 5, 1); Q("#cfd9ea", hx - 1, top + 3, 1, 1); Q("#cfd9ea", hx + 1, top + 3, 1, 1); } if(o.chapeau){ Q(o.chapeau, hx - 3, top, 7, 1); Q(o.chapeau, hx - 2, top - 2, 5, 2); } if(o.bonnet){ Q(o.bonnet, hx - 2, top - 1, 5, 2); }
  }
  const chaise = (x, cx, by, c) => { R(x, "#3d2a1c", cx - 13, by - 40, 4, 40); R(x, c || "#5c3f26", cx - 13, by - 16, 26, 4); R(x, "#3d2a1c", cx + 9, by - 12, 4, 12); R(x, c || "#5c3f26", cx - 13, by - 40, 4, 4); };
  const fig = (o, w, h) => mk(w || 22, h || 26, x => perso(x, (w || 22) >> 1, (h || 26) - 1, o));
  PX.perso = perso;

  /* ---------- Épidaure ---------- */
  const dMarbre = x => { R(x, "#d9cfb8", 0, 0, 32, 32); for(let j = 0; j < 32; j += 8){ R(x, "#a89c84", 0, j, 32, 1); for(let i = (j/8 % 2)*8; i < 32; i += 16) R(x, "#a89c84", i, j, 1, 8); } noise(x, 32, 32, ["#f4efe2", "#cfc5ae"], 71, 70); };
  W.marbre = mk(32, 32, dMarbre);
  W.portique = mk(32, 32, x => { dMarbre(x); R(x, "#14162b", 4, 6, 24, 26); R(x, "#17203a", 6, 8, 20, 24); R(x, "#f4efe2", 2, 4, 28, 2); R(x, "#a89c84", 2, 6, 28, 1); R(x, "#f4efe2", 3, 6, 3, 26); R(x, "#f4efe2", 26, 6, 3, 26); R(x, "#a89c84", 5, 6, 1, 26); R(x, "#a89c84", 28, 6, 1, 26); });
  W.cypres = mk(32, 32, x => { R(x, "#0a0a14", 0, 0, 32, 32); const r = rng(81); for(let i = 0; i < 7; i++){ const a = 2 + i*4.4 + r()*2; for(let j = 0; j < 32; j++){ const w = Math.max(1, (j/32)*3.2 + r()); R(x, j % 3 ? "#17203a" : "#2f4a3a", a - w/2, j, w, 1); } } });
  S.colonne = mk(18, 80, x => { R(x, "#f4efe2", 4, 6, 10, 70); for(let i = 5; i < 14; i += 2) R(x, "#d9cfb8", i, 7, 1, 68); R(x, "#a89c84", 12, 6, 2, 70); R(x, "#f4efe2", 1, 0, 16, 3); R(x, "#d9cfb8", 2, 3, 14, 3); R(x, "#a89c84", 2, 5, 14, 1); R(x, "#d9cfb8", 2, 76, 14, 2); R(x, "#a89c84", 1, 78, 16, 2); });
  S.stele = mk(20, 38, x => { R(x, "#a89c84", 3, 4, 14, 34); x.fillStyle = "#a89c84"; x.beginPath(); x.moveTo(3, 5); x.lineTo(10, 0); x.lineTo(17, 5); x.fill(); R(x, "#d9cfb8", 4, 5, 11, 32); R(x, "#6f6a5e", 15, 5, 2, 33); for(let j = 8; j < 34; j += 3) R(x, "#6f6a5e", 6, j, 5 + ((j*5) % 4), 1); R(x, "#6f6a5e", 1, 36, 18, 2); });
  S.fontaine = mk(36, 28, x => { R(x, "#a89c84", 14, 12, 8, 14); R(x, "#6f6a5e", 20, 12, 2, 14); disc(x, "#d9cfb8", 18, 10, 15, 5); disc(x, "#2e3a66", 18, 9, 12, 3); R(x, "#8fa3c8", 9, 8, 6, 1); R(x, "#cfd9ea", 20, 9, 5, 1); R(x, "#a89c84", 8, 26, 20, 2); R(x, "#8fa3c8", 17, 2, 2, 6); R(x, "#cfd9ea", 17, 1, 1, 2); });
  S.autel = mk(28, 34, x => { R(x, "#d9cfb8", 4, 14, 20, 18); R(x, "#a89c84", 20, 14, 4, 18); R(x, "#f4efe2", 2, 11, 24, 3); R(x, "#a89c84", 2, 32, 24, 2); R(x, "#6f6a5e", 8, 20, 8, 1); R(x, "#6f6a5e", 8, 24, 8, 1); R(x, "#c2501c", 10, 5, 8, 6); R(x, "#f08a24", 11, 3, 6, 7); R(x, "#ffe9a8", 13, 5, 2, 5); R(x, "#f08a24", 13, 1, 2, 2); }, true);
  S.gateau = mk(10, 6, x => { disc(x, "#e2bd5a", 5, 3, 4, 2); R(x, "#b08a3c", 2, 4, 6, 1); R(x, "#ffe9a8", 3, 2, 3, 1); });
  S.lampe = mk(10, 30, x => { R(x, "#45423c", 4, 10, 2, 18); R(x, "#45423c", 2, 28, 6, 2); R(x, "#86603a", 2, 8, 6, 2); R(x, "#f08a24", 4, 4, 2, 4); R(x, "#ffe9a8", 4, 5, 2, 2); }, true);
  S.dormeur = mk(44, 18, x => { R(x, "#86603a", 2, 10, 40, 4); R(x, "#5c3f26", 4, 14, 3, 4); R(x, "#5c3f26", 37, 14, 3, 4); R(x, "#d9cfb8", 10, 6, 28, 5); R(x, "#a89c84", 10, 9, 28, 2); R(x, SK, 5, 5, 5, 5); R(x, "#3d2a1c", 4, 4, 3, 5); R(x, SK2, 8, 7, 1, 1); });
  S.couche = mk(44, 18, x => { R(x, "#86603a", 2, 10, 40, 4); R(x, "#5c3f26", 4, 14, 3, 4); R(x, "#5c3f26", 37, 14, 3, 4); R(x, "#a89c84", 3, 8, 38, 2); R(x, "#d9cfb8", 4, 6, 10, 3); });
  const dSerpent = (x, c1, c2) => { disc(x, c1, 12, 16, 9, 3); disc(x, c2, 12, 15, 6, 2); R(x, c1, 14, 4, 3, 11); R(x, c2, 15, 5, 1, 9); R(x, c1, 13, 2, 5, 3); R(x, "#0a0a14", 16, 3, 1, 1); R(x, "#c2501c", 18, 3, 2, 1); };
  S.serpent = mk(24, 20, x => dSerpent(x, "#4f6a52", "#3aa36a")); S.serpentOr = mk(24, 20, x => dSerpent(x, "#e2bd5a", "#ffe9a8"), true);
  const dChien = (x, c1, c2) => { R(x, c1, 4, 8, 16, 6); R(x, c2, 4, 8, 16, 2); R(x, c1, 5, 14, 2, 5); R(x, c1, 17, 14, 2, 5); R(x, c1, 18, 4, 6, 5); R(x, c1, 22, 6, 3, 2); R(x, c1, 19, 2, 2, 3); R(x, "#0a0a14", 21, 5, 1, 1); R(x, c1, 2, 5, 2, 5); };
  S.chien = mk(26, 20, x => dChien(x, "#86603a", "#b08a3c")); S.chienOr = mk(26, 20, x => dChien(x, "#e2bd5a", "#ffe9a8"), true);
  S.des = mk(18, 12, x => { R(x, "#ffe9a8", 1, 3, 7, 7); R(x, "#e2bd5a", 1, 9, 7, 1); R(x, "#2a2622", 3, 5, 1, 1); R(x, "#2a2622", 5, 7, 1, 1); R(x, "#ffe9a8", 10, 1, 7, 7); R(x, "#e2bd5a", 10, 7, 7, 1); R(x, "#2a2622", 13, 4, 1, 1); }, true);
  S.oeil = mk(20, 12, x => { disc(x, "#ffe9a8", 10, 6, 9, 4); disc(x, "#2e3a66", 10, 6, 3, 3); R(x, "#0a0a14", 10, 5, 1, 2); R(x, "#e2bd5a", 2, 6, 2, 1); R(x, "#e2bd5a", 16, 6, 2, 1); }, true);
  S.pretre = mk(22, 28, x => { perso(x, 11, 27, {c:"#f4efe2", c2:"#d9cfb8", robe:true, h:"#6f6a5e", barbe:"#a89c84", col:false}); R(x, "#86603a", 18, 2, 1, 25); });
  S.dieu = mk(30, 60, x => { halo(x, 15, 22, 15, "#b08a3c", "#e2bd5a"); R(x, "#ffe9a8", 9, 18, 12, 40); R(x, "#e2bd5a", 9, 18, 2, 40); R(x, "#e2bd5a", 13, 26, 1, 30); R(x, "#e2bd5a", 17, 24, 1, 32); R(x, "#ffe9a8", 6, 56, 18, 3); R(x, "#ffe9a8", 11, 8, 8, 10); R(x, "#f4efe2", 11, 13, 8, 6); R(x, "#e2bd5a", 10, 6, 10, 3); R(x, "#2e3a66", 13, 11, 1, 1); R(x, "#2e3a66", 16, 11, 1, 1); R(x, "#86603a", 24, 10, 2, 48); for(let j = 14; j < 52; j += 6){ R(x, "#3aa36a", 23, j, 1, 3); R(x, "#3aa36a", 26, j + 3, 1, 3); } R(x, "#3aa36a", 22, 10, 3, 2); }, true);
  S.pelerin = fig({c:"#86603a", c2:"#5c3f26", robe:true, h:"#2a2622", col:false});

  /* ---------- Passy, 1784 ---------- */
  W.haie = mk(32, 32, x => { R(x, "#2f4a3a", 0, 0, 32, 32); noise(x, 32, 32, ["#4f6a52", "#17203a", "#2f4a3a", "#3aa36a"], 91, 240); R(x, "#17203a", 0, 28, 32, 4); });
  W.passy = mk(32, 32, x => { R(x, "#d9cfb8", 0, 0, 32, 32); noise(x, 32, 32, ["#cfc5ae", "#f4efe2"], 93, 50); R(x, "#6f6a5e", 0, 0, 32, 2); R(x, "#a89c84", 0, 26, 32, 6); R(x, "#f4efe2", 9, 5, 14, 19); R(x, "#2e3a66", 10, 6, 12, 17); R(x, "#f4efe2", 15, 6, 2, 17); R(x, "#f4efe2", 10, 13, 12, 1); R(x, "#8fa3c8", 11, 7, 2, 4); });
  const dArbre = (x, f1, f2, fruit) => { const r = rng(97); R(x, "#3d2a1c", 21, 44, 5, 36); R(x, "#5c3f26", 23, 44, 1, 36); R(x, "#3d2a1c", 16, 78, 15, 2); for(let i = 0; i < 26; i++){ const a = 23 + (r() - .5)*30, b = 8 + r()*38; disc(x, r() > .5 ? f1 : f2, a, b, 5 + r()*5, 3 + r()*4); } if(fruit) for(let i = 0; i < 12; i++) R(x, fruit, 8 + r()*30, 8 + r()*36, 1, 1); };
  S.abricotier = mk(46, 80, x => dArbre(x, "#2f4a3a", "#4f6a52", "#f08a24"));
  S.orme = mk(64, 96, x => { const r = rng(101); R(x, "#3d2a1c", 27, 44, 10, 52); R(x, "#5c3f26", 31, 44, 2, 52); R(x, "#2a2622", 35, 44, 2, 52); R(x, "#3d2a1c", 20, 92, 24, 4); R(x, "#3d2a1c", 18, 40, 12, 3); R(x, "#3d2a1c", 36, 36, 14, 3); for(let i = 0; i < 46; i++){ const a = 32 + (r() - .5)*56, b = 4 + r()*40; disc(x, r() > .55 ? "#2f4a3a" : r() > .4 ? "#4f6a52" : "#17203a", a, b, 6 + r()*7, 4 + r()*4); } for(const [a, b] of [[20, 43], [47, 39], [12, 30], [54, 28]]){ for(let j = b; j < 78; j += 2) R(x, "#d9cfb8", a + Math.round((j - b)*(a < 32 ? -.12 : .12)), j, 1, 1); } });
  S.garcon = mk(18, 22, x => perso(x, 9, 21, {c:"#8fa3c8", c2:"#4a5a8a", p:"#5c3f26", h:"#86603a", bandeau:true, bras:"avant", col:false}));
  S.garconChute = mk(26, 10, x => perso(x, 16, 9, {pose:"couche", c:"#8fa3c8", c2:"#4a5a8a", p:"#5c3f26", h:"#86603a"}));
  S.garconTremble = mk(18, 22, x => perso(x, 9, 21, {c:"#8fa3c8", c2:"#4a5a8a", p:"#5c3f26", h:"#86603a", bandeau:true, bras:"deux", tilt:1, col:false}));
  S.franklin = mk(24, 22, x => { R(x, "#5c3f26", 3, 6, 4, 16); R(x, "#5c3f26", 3, 14, 16, 2); R(x, "#5c3f26", 17, 14, 2, 8); perso(x, 11, 19, {pose:"assis", c:"#5c3f26", c2:"#3d2a1c", h:"#a89c84", long:true, chauve:true, lunettes:true, p:"#45423c", gilet:"#86603a"}); R(x, "#45423c", 13, 16, 2, 5); R(x, "#86603a", 20, 4, 1, 18); });
  S.lavoisier = fig({c:"#17203a", c2:"#0a0a14", perruque:true, gilet:"#d9cfb8", p:"#d9cfb8", bras:"avant"});
  /* ---------- Buzancy, 1784 ---------- */
  W.chateau = mk(32, 32, x => { R(x, "#8a3a30", 0, 0, 32, 32); for(let j = 0; j < 32; j += 4){ R(x, "#7a2c24", 0, j, 32, 1); for(let i = (j/4 % 2)*4; i < 32; i += 8) R(x, "#7a2c24", i, j, 1, 4); } R(x, "#d9cfb8", 0, 0, 3, 32); R(x, "#d9cfb8", 29, 0, 3, 32); R(x, "#a89c84", 0, 28, 32, 4); R(x, "#d9cfb8", 9, 5, 14, 20); R(x, "#ffe9a8", 11, 7, 10, 16); R(x, "#5c3f26", 15, 7, 2, 16); R(x, "#5c3f26", 11, 14, 10, 1); R(x, "#f08a24", 12, 16, 3, 6); }, false);
  S.puysegur = fig({c:"#2e3a66", c2:"#1f2444", gilet:"#7a2c24", perruque:true, p:"#f4efe2", bras:"tendu"});
  S.victor = fig({c:"#86603a", c2:"#5c3f26", h:"#3d2a1c", p:"#45423c", col:false});
  S.victorDort = fig({c:"#86603a", c2:"#5c3f26", h:"#3d2a1c", p:"#45423c", col:false, ferme:true, tilt:-1});
  S.paysans = [0, 1, 2].map(i => mk(22, 20, x => perso(x, 11, 19, [{pose:"assis", c:"#4a5a8a", c2:"#2e3a66", robe:true, h:"#5c3f26", bonnet:"#f4efe2", ferme:true, col:false}, {pose:"assis", c:"#6f6a5e", c2:"#45423c", h:"#a89c84", chapeau:"#3d2a1c", col:false}, {pose:"assis", c:"#7a2c24", c2:"#4f1c1c", robe:true, h:"#2a2622", bonnet:"#d9cfb8", col:false, ferme:true}][i])));

  /* ---------- les lueurs de la nuit qui manquaient : l'orme, l'objet brillant, la ficelle ---------- */
  const lueur = draw => mk(48, 36, x => { halo(x, 24, 19, 22, "#4f1c1c", "#c2501c"); halo(x, 24, 19, 13, "#f08a24", "#ffe9a8"); draw(x); }, true);
  S.lueurOrme = lueur(x => { R(x, "#3d2a1c", 22, 16, 4, 16); for(const [a, b, r1] of [[24, 10, 9], [17, 13, 6], [31, 13, 6], [24, 5, 6]]) disc(x, "#2f4a3a", a, b, r1, r1 - 2); R(x, "#d9cfb8", 16, 16, 1, 12); R(x, "#d9cfb8", 32, 16, 1, 12); disc(x, SK, 14, 28, 1, 1); R(x, "#4a5a8a", 13, 29, 3, 4); disc(x, SK, 34, 28, 1, 1); R(x, "#7a2c24", 33, 29, 3, 4); });
  S.lueurObjet = lueur(x => { R(x, "#2a2622", 14, 18, 5, 12); disc(x, SK, 16, 15, 2, 2); R(x, "#2a2622", 19, 19, 7, 2); R(x, "#f4efe2", 26, 14, 2, 6); R(x, "#ffffff", 26, 13, 2, 2); R(x, "#ffe9a8", 23, 13, 8, 1); R(x, "#ffe9a8", 27, 10, 1, 8); R(x, "#4a5a8a", 32, 20, 5, 10); disc(x, SK, 34, 17, 2, 2); });
  S.lueurFicelle = lueur(x => { R(x, SK, 20, 6, 8, 4); R(x, "#f4efe2", 18, 4, 4, 5); R(x, "#2a2622", 24, 10, 1, 14); disc(x, "#e2bd5a", 24, 25, 2, 2); disc(x, "#6f6a5e", 24, 30, 9, 2); R(x, "#2a2622", 16, 30, 17, 1); });

  /* ================= les scènes 2D (160 × 100) ================= */
  const parquet = (x, y0, c1, c2) => { R(x, c1, 0, y0, 160, 100 - y0); for(let j = y0; j < 100; j++){ const k = (j - 38)/62; for(let i = -6; i <= 12; i++){ const xx = 80 + (-60 + i*26 - 80)*k; if(xx >= 0 && xx < 160) R(x, c2, xx, j, 1, 1); } } };
  /* le salon de Mesmer : o.rideaux, o.musique, o.mesmer, o.crise (0 à 5), o.attente */
  function salon(x, t, o){
    o = o || {}; const fl = .88 + .12*Math.sin(t*7)*Math.sin(t*2.3), r = rng(((t*9) | 0) + 11);
    R(x, "#6a5a8a", 0, 0, 160, 54); for(let i = 6; i < 160; i += 26){ R(x, "#4a5a8a", i, 6, 18, 34); R(x, "#6a5a8a", i + 1, 7, 16, 32); R(x, "#b08a3c", i, 6, 18, 1); R(x, "#b08a3c", i, 39, 18, 1); }
    R(x, "#3d2a1c", 0, 0, 160, 3); R(x, "#b08a3c", 0, 3, 160, 1); R(x, "#4f1c1c", 0, 42, 160, 12); R(x, "#b08a3c", 0, 42, 160, 1); R(x, "#2a2622", 0, 53, 160, 1);
    parquet(x, 54, "#5c3f26", "#3d2a1c");
    for(const mx of [34, 112]){ R(x, "#b08a3c", mx - 1, 7, 14, 32); R(x, "#e2bd5a", mx, 8, 12, 30); R(x, "#4a5a8a", mx + 1, 9, 10, 28); R(x, "#8fa3c8", mx + 2, 10, 2, 24); disc(x, "#e2bd5a", mx + 6, 7, 4, 2); }
    R(x, "#3d2a1c", 138, 5, 22, 46); R(x, o.rideaux ? "#4f1c1c" : "#cfd9ea", 140, 7, 20, 42); if(o.rideaux){ for(let i = 141; i < 160; i += 3) R(x, "#7a2c24", i, 7, 1, 42); } else { R(x, "#8fa3c8", 140, 28, 20, 21); R(x, "#3d2a1c", 149, 7, 2, 42); R(x, "#3d2a1c", 140, 26, 20, 2); R(x, "#4f1c1c", 138, 5, 5, 46); }
    /* l'harmonica de verre */
    R(x, "#3d2a1c", 0, 62, 26, 12); R(x, "#5c3f26", 0, 60, 26, 3); R(x, "#2a2622", 2, 74, 3, 12); R(x, "#2a2622", 21, 74, 3, 12); for(let i = 0; i < 8; i++){ disc(x, i % 2 ? "#8fa3c8" : "#cfd9ea", 3 + i*3, 57, 1, 3); }
    perso(x, 12, 99, {k:1.5, pose:"assis", c:"#2f4a3a", c2:"#17203a", perruque:true, bras:o.musique ? "avant" : null, dy:o.musique ? Math.round(Math.sin(t*2)) : 0});
    /* les malades du fond, puis le baquet, puis ceux de devant */
    const M = [[62, 80, {c:"#2e3a66", c2:"#17203a", perruque:true}], [84, 78, {c:"#d9cfb8", c2:"#a89c84", robe:true, h:"#86603a", chignon:true}], [106, 80, {c:"#4f6a52", c2:"#2f4a3a", perruque:true}], [40, 96, {c:"#8a3a30", c2:"#4f1c1c", robe:true, h:"#d9cfb8", chignon:true}], [126, 96, {c:"#b08a3c", c2:"#86603a", robe:true, h:"#3d2a1c", chignon:true}]];
    const un = (m, i) => { const cr = (o.crise || 0) > i, att = o.attente && !cr; perso(x, m[0] + (cr ? Math.round(r()*2 - 1) : 0), m[1], Object.assign({k:1.5, pose:"assis"}, m[2], cr ? {bras:r() > .5 ? "deux" : "haut", tilt:r() > .5 ? 1 : -1, dy:-Math.round(r()*2), ferme:true, bouche:true} : att ? {tilt:i % 2 ? 1 : -1} : {})); };
    M.slice(0, 3).forEach(un);
    for(const [a, b] of [[66, 56], [76, 52], [92, 52], [102, 56], [84, 50]]){ R(x, "#a89c84", a, b, 1, 26); R(x, "#a89c84", a + (a < 84 ? -5 : a > 84 ? 1 : 0), b, a === 84 ? 1 : 5, 1); }
    disc(x, "#3d2a1c", 84, 88, 30, 10); disc(x, "#5c3f26", 84, 83, 30, 9); disc(x, "#86603a", 84, 82, 26, 7); R(x, "#3d2a1c", 57, 85, 54, 1); for(let i = 60; i < 110; i += 8) R(x, "#3d2a1c", i, 84, 1, 12); R(x, "#b08a3c", 82, 80, 5, 3);
    M.slice(3).forEach((m, i) => un(m, i + 3)); R(x, "#d9cfb8", 46, 84, 76, 1);
    if(o.mesmer){ perso(x, 147, 99, {k:1.5, c:"#6a5a8a", c2:"#4a5a8a", gilet:"#e2bd5a", perruque:true, p:"#f4efe2", bras:"tenduG"}); R(x, "#a89c84", 122, 74, 10, 1); }
    R(x, "#b08a3c", 79, 4, 2, 7); R(x, "#b08a3c", 66, 11, 28, 2); R(x, "#e2bd5a", 68, 13, 24, 1); for(let i = 68; i < 94; i += 5) R(x, "#f4efe2", i, 8, 1, 3);
    const L = [[80, 12, o.rideaux ? 70 : 100, (o.rideaux ? .56 : .62)*fl], [40, 24, 26, .25], [118, 24, 26, .25]]; if(!o.rideaux) L.push([152, 28, 104, .75]); if(o.mesmer) L.push([140, 70, 26, .22]);
    relight(x, 160, 100, L, o.rideaux ? .12 : .2);
    for(let i = 68; i < 94; i += 5){ R(x, "#ffe9a8", i, 6, 1, 2); if(r() > .3) R(x, "#f08a24", i, 5, 1, 1); } if(o.musique){ for(let i = 0; i < 4; i++){ const k = ((t*.35) + i/4) % 1; R(x, k < .5 ? "#cfd9ea" : "#8fa3c8", 6 + i*5 + Math.round(Math.sin(k*6 + i)*2), 52 - k*30, 1 + (k < .3), 1); } }
  }
  /* un cabinet : Faria (1813), Braid (1841), Bernheim (1884), Janet (1886). o.lieu, o.sujets, o.objet, o.paup (0 à 1) */
  function etude(x, t, o){
    o = o || {}; const lieu = o.lieu || "braid", jour = lieu === "nancy" || lieu === "havre", mur = lieu === "faria" ? "#4f1c1c" : lieu === "braid" ? "#2f4a3a" : lieu === "nancy" ? "#a89c84" : "#4a5a8a", mur2 = lieu === "faria" ? "#7a2c24" : lieu === "braid" ? "#4f6a52" : lieu === "nancy" ? "#d9cfb8" : "#6a5a8a";
    R(x, mur, 0, 0, 160, 54); for(let i = 4; i < 160; i += 22){ R(x, mur2, i, 8, 1, 30); R(x, mur2, i + 14, 8, 1, 30); R(x, mur2, i, 8, 15, 1); R(x, mur2, i, 38, 15, 1); }
    R(x, "#3d2a1c", 0, 0, 160, 3); R(x, "#5c3f26", 0, 42, 160, 12); R(x, "#86603a", 0, 42, 160, 1); R(x, "#2a2622", 0, 53, 160, 1); parquet(x, 54, "#5c3f26", "#3d2a1c");
    R(x, "#3d2a1c", 118, 5, 38, 44); R(x, jour ? "#cfd9ea" : "#17203a", 120, 7, 34, 40);
    if(lieu === "braid"){ R(x, "#1f2444", 120, 28, 34, 19); for(const [a, h] of [[124, 16], [133, 22], [144, 13]]){ R(x, "#0a0a14", a, 47 - h, 4, h); R(x, "#2e3a66", a - 1 + Math.round(Math.sin(t + a)), 42 - h, 3, 3); } }
    else if(jour){ R(x, "#8fa3c8", 120, 30, 34, 17); disc(x, "#4f6a52", 130, 34, 8, 6); disc(x, "#2f4a3a", 146, 36, 7, 6); } else { R(x, "#cfd9ea", 128, 13, 1, 1); R(x, "#8fa3c8", 146, 19, 1, 1); }
    R(x, "#3d2a1c", 136, 7, 2, 40); R(x, "#3d2a1c", 120, 26, 34, 2); R(x, "#5c3f26", 116, 47, 42, 2);
    R(x, "#2a2622", 2, 6, 30, 40); const cs = ["#7a2c24", "#2f4a3a", "#2e3a66", "#b08a3c", "#4f1c1c", "#86603a"], rb = rng(57); for(let j = 8; j < 44; j += 10){ R(x, "#5c3f26", 3, j + 8, 28, 1); let i = 4; while(i < 30){ const w = 1 + ((rb()*3) | 0); R(x, cs[(rb()*cs.length) | 0], i, j + 1 + ((rb()*2) | 0), w, 7); i += w; } }
    R(x, "#b08a3c", 104, 18, 2, 8); R(x, "#f4efe2", 103, 14, 4, 4);
    const SU = o.sujets || [], xs = SU.length === 3 ? [40, 70, 100] : SU.length === 2 ? [50, 92] : [lieu === "havre" ? 96 : 66], D = {faria:{c:"#0a0a14", c2:"#0a0a14", robe:true, h:"#2a2622", skin:"#86603a", skin2:"#5c3f26", col:"#f4efe2"}, braid:{c:"#2a2622", c2:"#0a0a14", h:"#86603a", favoris:true, gilet:"#7a2c24"}, nancy:{c:"#2a2622", c2:"#0a0a14", h:"#45423c", barbe:"#6f6a5e", lunettes:true}, havre:{c:"#2a2622", c2:"#0a0a14", h:"#3d2a1c", barbe:"#3d2a1c", lunettes:true}}[lieu];
    const dx = lieu === "faria" ? 138 : lieu === "havre" ? 46 : 112;
    if(lieu === "havre") perso(x, dx, 97, Object.assign({k:2, bras:o.geste || null}, D));
    SU.forEach((s, i) => { const cx = xs[i]; chaise(x, cx, 97); perso(x, cx, 97, Object.assign({k:2, pose:"assis"}, s)); if(s.croise){ R(x, s.c2 || NO, cx - 6, 81, 14, 4); } });
    if(lieu === "havre"){ R(x, "#86603a", 70, 84, 60, 4); R(x, "#5c3f26", 70, 88, 60, 2); R(x, "#3d2a1c", 74, 90, 4, 10); R(x, "#3d2a1c", 122, 90, 4, 10); R(x, "#f4efe2", 106, 81, 16, 3); R(x, "#3d2a1c", 104, 79, 6, 1); if(o.ecrit){ for(let i = 0; i < Math.min(13, o.ecrit*2); i++) R(x, "#2a2622", 108 + i, 81 + (i % 3 === 0 ? 1 : 0), 1, 1); } }
    else perso(x, dx, 97, Object.assign({k:2, bras:o.geste || (lieu === "braid" ? "haut" : null)}, D));
    const ob = lieu === "braid" && o.objet !== false ? [dx + 9, 46] : null;
    const L = jour ? [[137, 26, 130, .9], [18, 28, 40, .15]] : [[105, 14, 86, .74*(.9 + .1*Math.sin(t*6))], [137, 28, 40, .16]]; if(ob) L.push([ob[0], ob[1], 22, .5]);
    relight(x, 160, 100, L, jour ? .26 : .14);
    if(!jour){ R(x, "#ffe9a8", 104, 11, 2, 3); R(x, "#f08a24", 104, 10, 2, 1); }
    if(ob){ R(x, "#ffffff", ob[0], ob[1], 2, 3); const k = ((t*3) | 0) % 2; R(x, "#ffe9a8", ob[0] - 3 - k, ob[1] + 1, 3 + k, 1); R(x, "#ffe9a8", ob[0] + 2, ob[1] + 1, 3 + k, 1); R(x, "#ffe9a8", ob[0], ob[1] - 3 - k, 1, 3 + k); R(x, "#ffe9a8", ob[0], ob[1] + 3, 1, 3 + k); }
    if(o.paup){ const h = Math.round(o.paup*50); R(x, "#05050a", 0, 0, 160, h); R(x, "#05050a", 0, 100 - h, 160, h); for(let i = 0; i < 160; i += 2){ R(x, "#05050a", i, h, 1, 1); R(x, "#05050a", i + 1, 99 - h, 1, 1); } }
  }
  /* la Salpêtrière : o.stade (0 rien, 1 léthargie, 2 catalepsie, 3 somnambulisme), o.salle (les quatre patientes), o.poses */
  function amphi(x, t, o){
    o = o || {}; R(x, "#a89c84", 0, 0, 160, 54); R(x, "#6f6a5e", 0, 0, 160, 3); R(x, "#6f6a5e", 0, 44, 160, 10); R(x, "#45423c", 0, 53, 160, 1); parquet(x, 54, "#86603a", "#5c3f26");
    R(x, "#45423c", 2, 3, 40, 42); R(x, "#cfd9ea", 4, 5, 36, 38); R(x, "#8fa3c8", 4, 27, 36, 16); for(const i of [15, 28]) R(x, "#45423c", i, 5, 1, 38); R(x, "#45423c", 4, 17, 36, 1); R(x, "#45423c", 4, 30, 36, 1);
    if(o.salle){ for(let i = 0; i < 4; i++){ const bx = 58 + i*28; R(x, "#45423c", bx - 12, 34, 1, 30); R(x, "#45423c", bx + 12, 44, 1, 20); R(x, "#f4efe2", bx - 11, 50, 23, 7); R(x, "#d9cfb8", bx - 11, 56, 23, 3); R(x, "#45423c", bx - 12, 64, 25, 1); }
      for(let i = 0; i < 4; i++){ const bx = 58 + i*28, p = (o.poses || [])[i] || {}; perso(x, bx, 97, Object.assign({k:2, c:"#f4efe2", c2:"#d9cfb8", robe:true, h:["#3d2a1c", "#86603a", "#2a2622", "#5c3f26"][i], chignon:i !== 3, long:i === 3, col:false}, p)); if(i === 3){ R(x, "#86603a", bx + 12, 86, 9, 9); R(x, "#5c3f26", bx + 14, 83, 5, 3); R(x, "#5c3f26", bx - 6, 96, 5, 2); R(x, "#5c3f26", bx + 2, 96, 5, 2); } if(o.sel === i){ R(x, "#e2bd5a", bx - 8, 98, 17, 1); } } }
    else { R(x, "#5c3f26", 104, 6, 36, 28); R(x, "#2a2622", 106, 8, 32, 24); disc(x, "#d9cfb8", 122, 18, 5, 6); R(x, "#d9cfb8", 112, 26, 20, 3);
      for(let row = 0; row < 3; row++) for(let i = 0; i < 6 - row; i++){ const cx = 50 + i*8 + row*4, cy = 60 - row*8; R(x, "#0a0a14", cx - 3, cy, 6, 9); R(x, SK, cx - 2, cy - 5, 4, 5); R(x, (i + row) % 4 === 1 ? "#3d2a1c" : "#2a2622", cx - 2, cy - 6, 4, 2); if((i + row) % 3 === 0) R(x, "#6f6a5e", cx - 2, cy - 2, 4, 2); }
      R(x, "#5c3f26", 44, 64, 54, 5); R(x, "#3d2a1c", 44, 69, 54, 1);
      const st = o.stade || 0;
      perso(x, 104, 98, {k:2, c:"#0a0a14", c2:"#0a0a14", h:"#a89c84", long:true, bras:st ? "tendu" : null, gilet:"#2a2622"});
      perso(x, 148, 97, {k:2, c:"#2a2622", c2:"#0a0a14", h:"#3d2a1c", barbe:"#3d2a1c", bras:st === 1 ? "tenduG" : null});
      perso(x, 130, 98, Object.assign({k:2, c:"#f4efe2", c2:"#d9cfb8", robe:true, h:"#3d2a1c", chignon:true, col:false}, st === 1 ? {tilt:2, ferme:true, dy:1} : st === 2 ? {bras:"haut"} : st === 3 ? {bras:"avant", ferme:true} : {})); }
    relight(x, 160, 100, [[22, 24, 150, .95], [122, 18, 30, .12]], .2);
  }
  /* Vienne : o.parle, o.assise, o.silence (0 à 1) */
  function vienne(x, t, o){
    o = o || {}; const fl = .9 + .1*Math.sin(t*5);
    R(x, "#7a2c24", 0, 0, 160, 54); for(let j = 5; j < 42; j += 7) for(let i = ((j/7 | 0) % 2)*5 + 2; i < 160; i += 10) R(x, "#8a3a30", i, j, 2, 2);
    R(x, "#3d2a1c", 0, 0, 160, 3); R(x, "#3d2a1c", 0, 44, 160, 10); R(x, "#5c3f26", 0, 44, 160, 1); parquet(x, 54, "#5c3f26", "#3d2a1c");
    R(x, "#2a2622", 98, 5, 58, 38); for(let j = 7; j < 40; j += 12){ R(x, "#5c3f26", 99, j + 10, 56, 1); for(let i = 101; i < 154; i += 5){ const k = (i*7 + j) % 5; R(x, ["#d9cfb8", "#86603a", "#a89c84", "#4f6a52", "#b08a3c"][k], i, j + 10 - 3 - k, 2 + (k % 2), 3 + k); } }
    R(x, "#b08a3c", 42, 7, 24, 18); R(x, "#17203a", 44, 9, 20, 14); disc(x, "#d9cfb8", 54, 16, 4, 5);
    R(x, "#45423c", 74, 14, 14, 30); R(x, "#6f6a5e", 75, 15, 12, 8); R(x, "#2a2622", 77, 30, 8, 9); R(x, "#f08a24", 78, 32, 6, 5);
    R(x, "#2f4a3a", 2, 50, 30, 40); R(x, "#4f6a52", 4, 52, 26, 8); R(x, "#2a2622", 2, 90, 4, 8); R(x, "#2a2622", 28, 90, 4, 8);
    perso(x, 17, 96, {k:2, pose:"assis", c:"#2a2622", c2:"#0a0a14", h:"#45423c", barbe:"#6f6a5e", gilet:"#45423c"}); R(x, "#5c3f26", 24, 76, 6, 1); R(x, "#f08a24", 30, 76, 1, 1);
    R(x, "#3d2a1c", 40, 84, 114, 9); R(x, "#2a2622", 43, 93, 4, 6); R(x, "#2a2622", 147, 93, 4, 6); R(x, "#7a2c24", 40, 76, 114, 9); for(let i = 43; i < 152; i += 8){ R(x, "#b08a3c", i, 78, 4, 4); R(x, "#2e3a66", i + 4, 77, 3, 6); } R(x, "#8a3a30", 40, 64, 18, 13); R(x, "#b08a3c", 43, 67, 12, 1); R(x, "#b08a3c", 43, 72, 12, 1); for(let i = 42; i < 154; i += 3) R(x, "#d9cfb8", i, 93, 1, 2);
    if(o.assise) perso(x, 96, 80, {k:2, pose:"assis", c:"#4a5a8a", c2:"#2e3a66", robe:true, h:"#3d2a1c", chignon:true});
    else { R(x, "#4a5a8a", 66, 66, 56, 10); R(x, "#2e3a66", 66, 73, 56, 3); R(x, "#4a5a8a", 122, 68, 24, 8); R(x, "#2a2622", 144, 66, 6, 8); R(x, SK, 52, 60, 10, 10); R(x, "#3d2a1c", 48, 58, 6, 12); R(x, "#3d2a1c", 52, 58, 8, 3); R(x, SK2, 59, 65, 2, 1); R(x, NO, 58, 63, 1, 1); R(x, o.parle && ((t*6) | 0) % 2 ? "#4f1c1c" : SK2, 60, 67, 2, 1); R(x, SK, 84, 63, 9, 3); R(x, "#f4efe2", 62, 66, 5, 3); }
    relight(x, 160, 100, [[81, 34, 46, .32*fl], [18, 62, 54, .5], [150, 20, 60, .2]], .16 + (o.silence || 0)*.06);
    R(x, "#ffe9a8", 80, 33, 3, 2);
    if(o.parle){ const n = ((t*2) | 0) % 4; for(let i = 0; i < n; i++) R(x, "#cfd9ea", 64 + i*6, 54 - i*4, 2, 1); }
  }
  /* la pharmacie de Coué : o.ang (l'angle du pendule) */
  function pendule(x, t, o){
    o = o || {}; R(x, "#d9cfb8", 0, 0, 160, 64); R(x, "#5c3f26", 0, 0, 160, 3); for(let j = 8; j < 60; j += 14){ R(x, "#5c3f26", 0, j + 12, 160, 2); for(let i = 4; i < 160; i += 9){ const k = (i*5 + j*3) % 6; R(x, ["#8fa3c8", "#b08a3c", "#f4efe2", "#4f6a52", "#7a2c24", "#cfd9ea"][k], i, j + 12 - 8 - (k % 3), 5, 8 + (k % 3)); R(x, "#f4efe2", i + 1, j + 8, 3, 2); R(x, "#5c3f26", i + 1, j + 12 - 9 - (k % 3), 3, 1); } }
    R(x, "#5c3f26", 0, 64, 160, 36); R(x, "#86603a", 0, 64, 160, 2); R(x, "#3d2a1c", 0, 66, 160, 1);
    perso(x, 26, 99, {k:2, c:"#2a2622", c2:"#0a0a14", h:"#d9cfb8", barbe:"#f4efe2", chauve:true, gilet:"#45423c", bras:"tendu"});
    disc(x, "#f4efe2", 104, 84, 28, 9); disc(x, "#d9cfb8", 104, 84, 22, 7); disc(x, "#f4efe2", 104, 84, 21, 6); R(x, "#2a2622", 84, 84, 40, 1); R(x, "#2a2622", 104, 78, 1, 13);
    R(x, "#2a2622", 122, 12, 38, 20); R(x, "#f4efe2", 112, 14, 12, 16); R(x, SK, 92, 18, 22, 9); R(x, SK2, 92, 25, 22, 2); R(x, SK, 98, 27, 5, 6); R(x, SK, 104, 27, 5, 5); R(x, SK2, 102, 28, 1, 4);
    relight(x, 160, 100, [[104, 44, 96, .7], [20, 20, 60, .3]], .3);
    const a = o.ang || 0, L0 = 46, bx = 103 + Math.sin(a)*L0, by = 33 + Math.cos(a)*L0; for(let k = 0; k <= 24; k++) R(x, "#2a2622", Math.round(103 + (bx - 103)*k/24), Math.round(33 + (by - 33)*k/24), 1, 1); disc(x, "#b08a3c", Math.round(bx), Math.round(by), 3, 3); R(x, "#ffe9a8", Math.round(bx) - 1, Math.round(by) - 2, 2, 1);
  }
  /* un tableau pour les volets : un ciel, un sol, des sprites posés, une lumière */
  function tableau(x, o){
    R(x, o.ciel || "#14162b", 0, 0, 160, 100); const r = rng(o.seed || 3); if(o.etoiles !== false) for(let i = 0; i < 60; i++) R(x, r() > .8 ? "#ffe9a8" : r() > .5 ? "#cfd9ea" : "#4a5a8a", r()*160, r()*(o.hz || 62), 1, 1);
    if(o.fond) o.fond(x); R(x, o.sol || "#2a2622", 0, o.hz || 62, 160, 100 - (o.hz || 62)); if(o.dalles){ for(let j = (o.hz || 62); j < 100; j += 6) R(x, o.dalles, 0, j, 160, 1); }
    (o.items || []).forEach(it => { const c = PX.show(it[0]), k = it[3] || 1; x.imageSmoothingEnabled = false; x.drawImage(c, Math.round(it[1] - c.width*k/2), Math.round(it[2] - c.height*k), Math.round(c.width*k), Math.round(c.height*k)); });
    if(o.avant) o.avant(x); relight(x, 160, 100, o.lights || [[80, 50, 110, .7]], o.amb == null ? .2 : o.amb); if(o.apres) o.apres(x);
  }
  Object.assign(PX, {salon, etude, amphi, vienne, pendule, tableau, fig});
})();
