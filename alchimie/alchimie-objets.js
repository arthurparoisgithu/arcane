/* ===== Arcanes · Alchimie : les objets qui parlent =====
   Cinq objets interactifs, branchés sur le laboratoire :
   1. Les planches à explorer : chaque planche du Splendor solis se lit détail par détail.
   2. Le bestiaire vivant : du dragon au phénix, chaque bête se change en la suivante dans le vase.
   3. Le livre muet : les quinze planches du Mutus Liber (1677), où l'on regarde avant de lire.
   4. La Table d'émeraude : treize phrases gravées une à une, chacune avec sa figure.
   5. L'athanor vivant : la bête de ta phase apparaît dans le vase de l'accueil (window.ALCH_BETES). */
(() => {
  const A = window.ArcanesAlchimie; if(!A) return;
  const _ = A._, {D, VA, EXT, q1, qa, h, nb, badge, IMG, rule4, save, toast, sheet} = _;
  const st = () => _.st();
  const ico = d => `<svg viewBox="0 0 48 48" aria-hidden="true">${d}</svg>`;
  const reg = (id, o) => { EXT.tools[id] = o; EXT.order.push(id); };
  const calm = () => { try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } };
  const lerp = (a, b, t) => a + (b - a)*t, ease = t => t*t*(3 - 2*t);
  for(let k = 1; k <= 15; k++) D.CRED["ml" + String(k).padStart(2, "0")] = "Mutus Liber, La Rochelle, Pierre Savouret, 1677. Exemplaire de la Wellcome Library (domaine public)";

  /* ================================================================
     1. LES PLANCHES À EXPLORER
     x, y : position du repère en % de l'image
     ================================================================ */
  const PLX = {
    noir:{note:"C'est l'une des premières images du manuscrit, avant la série des sept vases.", pts:[
      {x:48, y:33, t:"Le soleil noir", x2:"Un disque sombre posé sur l'horizon, entouré de rayons d'or. Les textes l'appellent le soleil noir : la matière, enfermée dans le vase, noircit et se défait. C'est le premier signe attendu, et le seul qu'on ne peut pas sauter."},
      {x:46, y:42, t:"Le visage", x2:"Sous le disque, un visage affleure. Dans tout le manuscrit, le Soleil a une figure humaine. Ici il s'enfonce jusqu'aux yeux, comme un astre qui se couche dans la terre."},
      {x:13, y:22, t:"Les arbres nus", x2:"À gauche, des arbres sans feuilles. Tout le paysage dit l'hiver. Les alchimistes comparent ce moment au grain qui pourrit en terre avant de germer."},
      {x:42, y:56, t:"La souche", x2:"Un tronc brisé, au milieu de l'image. Ce qui était debout est tombé. Les textes y insistent : il faut que la première forme disparaisse pour qu'une autre vienne."},
      {x:47, y:89, t:"Ce qui pousse déjà", x2:"Regarde tout en bas : des feuilles, des fleurs claires, de l'herbe. Le peintre a placé le printemps sous l'hiver. Le noir n'est pas une fin, c'est un terreau."},
      {x:75, y:31, t:"La ville au loin", x2:"À l'horizon, des tours pâles dans la lumière. La scène ne se passe pas dans un laboratoire, mais dans un paysage : le manuscrit montre l'Œuvre comme un travail de la nature, que l'artiste accompagne."}]},
    paon:{note:"Cinquième des sept vases couronnés du manuscrit.", pts:[
      {x:49, y:59, t:"Le paon", x2:"Un paon fait la roue dans le ventre du vase. Entre le noir et le blanc, les textes décrivent un moment où la surface se couvre de reflets changeants. Ils l'appellent la queue du paon."},
      {x:27, y:63, t:"Les yeux de la roue", x2:"Chaque plume porte un œil bleu et vert. Toutes les couleurs sont là en même temps, mais aucune n'est encore fixée. C'est un passage, pas un état."},
      {x:50, y:18, t:"La couronne", x2:"Le vase porte une couronne d'or, comme les six autres de la série. Dans le manuscrit, chacun des sept vases est placé sous une planète. Celui-ci est le vase de Vénus."},
      {x:48, y:5, t:"Le col fermé", x2:"Le col est long et clos. Rien n'entre, rien ne sort : toute la transformation se fait à l'intérieur, par la seule chaleur. On appelle cela un vase scellé d'Hermès, d'où vient notre « hermétiquement fermé »."},
      {x:85, y:74, t:"Le verre", x2:"Le peintre a rendu la transparence et les reflets. Le verre compte beaucoup pour l'alchimiste : c'est lui qui permet de surveiller les couleurs sans ouvrir le vase."}]},
    blanc:{note:"Sixième des sept vases : dans le manuscrit, c'est celui de Mercure.", pts:[
      {x:50, y:54, t:"La reine", x2:"Une femme couronnée, drapée de bleu. C'est la matière arrivée au blanc : lavée, claire, apaisée. Les textes l'appellent la reine blanche, ou la Lune."},
      {x:71, y:60, t:"Le sceptre et le globe", x2:"Elle tient un sceptre d'une main et un globe de l'autre : les insignes d'un souverain. Le blanc est déjà un premier règne. Les textes disent qu'à ce stade, la pierre changerait les métaux en argent."},
      {x:21, y:63, t:"L'ovale bleu et or", x2:"Autour d'elle, un ovale bleu bordé d'or. Le bleu et le blanc sont les couleurs de la Lune dans tout le manuscrit. Le liseré d'or annonce ce qui vient ensuite."},
      {x:50, y:91, t:"Sous ses pieds", x2:"Elle se tient sur un croissant. La Lune est son astre : l'argent, le reflet, ce qui reçoit la lumière sans la produire."},
      {x:50, y:20, t:"La couronne du vase", x2:"La même couronne que sur les autres vases. Reine dans le verre, couronne sur le verre : le manuscrit répète l'idée pour qu'on ne la manque pas."}]},
    jaune:{note:"Dans le manuscrit, cette image vient tout au début. Arcanes lui fait représenter l'œuvre au jaune à cause de son liquide doré.", pts:[
      {x:38, y:13, t:"La banderole", x2:"En latin, sur le ruban noir : « Allons chercher la nature des quatre éléments. » C'est une invitation. Avant de travailler, il faut partir chercher."},
      {x:55, y:43, t:"Le vase", x2:"Il tient un vase à long col, à moitié plein d'un liquide doré. C'est le même vase que tu retrouves, couronné, dans les sept planches de l'Œuvre."},
      {x:45, y:40, t:"Le doigt", x2:"De l'autre main, il montre le vase. Toute l'attention doit aller là : ce qui se passe dans le verre."},
      {x:27, y:56, t:"Le rouge et le bleu", x2:"Robe rouge, manteau bleu, bonnet rouge : un savant, pas un artisan. Le rouge et le bleu sont aussi les couleurs du roi et de la reine, les deux principes qu'il devra unir."},
      {x:21, y:89, t:"Les pieds nus", x2:"Il marche, et il est pieds nus. L'alchimiste des images est souvent un voyageur : on parle du chemin, de la voie, de la quête."},
      {x:76, y:70, t:"Le paysage", x2:"Une rivière, des collines, un ciel ouvert. « Suivre la nature » est le premier conseil des textes : observer comment elle s'y prend, puis l'imiter."}]},
    rouge:{note:"Septième et dernier vase : dans le manuscrit, c'est celui de la Lune.", pts:[
      {x:48, y:56, t:"Le roi", x2:"Un jeune roi en tunique rouge. La matière est arrivée au rouge : elle est fixe, elle ne craint plus le feu. C'est la pierre."},
      {x:27, y:50, t:"L'ovale d'or", x2:"Un grand ovale rayonnant l'entoure. Le rouge et l'or sont les couleurs du Soleil. La reine blanche avait le même ovale, en bleu."},
      {x:69, y:62, t:"Le sceptre et le globe", x2:"Sceptre dans une main, globe d'or dans l'autre : il règne. La reine portait les mêmes insignes. Le rouge achève ce que le blanc a commencé."},
      {x:45, y:92, t:"Le croissant", x2:"Il est debout sur un croissant d'or. La Lune est sous ses pieds : le blanc est dépassé, mais c'est encore lui qui porte le roi."},
      {x:50, y:19, t:"La couronne du vase", x2:"Dernier vase couronné. Les sept vases suivent l'ordre des planètes, de Saturne à la Lune : la série se termine donc sous la Lune, avec un roi solaire dans le verre."}]},
    union:{note:"Avant les sept vases, le manuscrit présente les deux personnages de toute l'histoire.", pts:(D.EMBLEMES.find(e => e.img === "p_union") || {pts:[]}).pts},
    dragon:{note:"Premier des sept vases couronnés : dans le manuscrit, c'est celui de Saturne.", pts:[
      {x:57, y:52, t:"L'enfant", x2:"Un enfant nu, debout dans le vase. Il n'a pas peur. Dans les images, l'enfant est souvent la matière nouvelle, celle qui vient de naître."},
      {x:40, y:61, t:"La fiole", x2:"Il verse une fiole sombre dans la gueule du dragon. On nourrit la bête : la matière brute doit d'abord être abreuvée."},
      {x:33, y:72, t:"Le dragon", x2:"Il occupe tout le fond du vase. C'est la matière première : brute, dangereuse, pas encore travaillée. Les textes disent qu'il faut la « tuer » pour commencer."},
      {x:60, y:68, t:"Le soufflet", x2:"De l'autre main, l'enfant tient un soufflet, l'outil qui attise le feu. Nourrir et chauffer : les deux gestes du début. Tu retrouves ce soufflet dans le Grand Œuvre du laboratoire."},
      {x:50, y:18, t:"La couronne", x2:"Saturne est la planète du plomb et des commencements. C'est sous son signe que le manuscrit place ce premier vase."},
      {x:50, y:93, t:"Le coussin de feuilles", x2:"Le vase repose sur une couronne de feuillage. Chaque vase de la série a le sien, d'une couleur différente."}]},
    aigle:{note:"Troisième des sept vases : dans le manuscrit, c'est celui de Mars.", pts:[
      {x:48, y:49, t:"Les trois têtes", x2:"Un oiseau à trois têtes, chacune couronnée. Trois têtes pour un seul corps : beaucoup de lecteurs y voient le corps, l'âme et l'esprit, ou bien le sel, le soufre et le mercure."},
      {x:19, y:66, t:"Les ailes", x2:"Les ailes sont ouvertes. L'oiseau, c'est ce qui s'envole : la partie volatile de la matière, celle que la chaleur fait monter dans le vase."},
      {x:50, y:70, t:"Le plumage blanc", x2:"Au premier vase, la matière était un dragon sombre. Elle s'est éclaircie à force de monter et de retomber."},
      {x:52, y:20, t:"La couronne", x2:"Le vase qui précède, dans le manuscrit, montre trois oiseaux, un noir, un blanc et un rouge, qui se disputent. Ici ils ne font plus qu'un."}]}
  };
  EXT.planche = id => {
    const P = D.PLANCHES[id], X = PLX[id]; if(!P) return false; if(!X || !X.pts.length) return false;
    let pt = -1;
    sheet(`<p class="eyebrow">Planche à explorer · d'après le Splendor solis</p><h2>${h(P.t)}</h2>
      <div class="al-px">
        <div class="al-px-fig"><div class="al-emb-img al-px-img" data-pxzone><div class="al-px-in"><img src="${IMG(P.img)}" alt="${h(P.t)}">${X.pts.map((p, i) => `<button type="button" class="al-hot" data-pxpt="${i}" style="left:${p.x}%;top:${p.y}%" aria-label="Détail ${i + 1} : ${h(p.t)}"><b>${i + 1}</b></button>`).join("")}</div></div>
          <p class="al-emb-cred">${h(D.CRED[P.img] || "")}</p></div>
        <div class="al-px-txt">
          <div class="al-card al-emb-pt" data-pxbox aria-live="polite"></div>
          <div class="al-px-nav"><button type="button" class="btn small ghost" data-pxgo="-1">‹ Précédent</button><span data-pxn></span><button type="button" class="btn small" data-pxgo="1">Détail suivant ›</button></div>
          <p class="al-p al-px-sum">${nb(h(P.x))}</p>
          <p class="help al-left">${nb(h(X.note))} Le Splendor solis est un manuscrit peint au XVIe siècle. Ces aquarelles en sont des copies modernes, fidèles, réalisées par E. A. Ibbs d'après l'exemplaire de Londres (1582).</p>
        </div></div>`);
    const root = q1("#sheet .al-px"); if(!root) return true;
    const zone = q1("[data-pxzone]", root), inn = q1(".al-px-in", root), box = q1("[data-pxbox]", root), n = X.pts.length;
    const show = i => { pt = i;
      qa("[data-pxpt]", root).forEach(b => b.classList.toggle("on", +b.dataset.pxpt === i));
      if(i < 0){ zone.classList.remove("zoom"); box.innerHTML = `<p class="al-p">Regarde d'abord l'image en entier, une minute. Puis touche un numéro : l'image s'approche du détail.</p>`; q1("[data-pxn]", root).textContent = `${n} détails`; return; }
      const p = X.pts[i]; inn.style.transformOrigin = `${p.x}% ${p.y}%`; zone.classList.add("zoom");
      box.innerHTML = `<h3><b>${i + 1}</b> ${h(p.t)}</h3><p class="al-p">${nb(h(p.x2))}</p>`; q1("[data-pxn]", root).textContent = `${i + 1} sur ${n}`; };
    root.onclick = ev => { const b = ev.target.closest("[data-pxpt]"), g = ev.target.closest("[data-pxgo]");
      if(b){ const i = +b.dataset.pxpt; show(i === pt ? -1 : i); }
      else if(g){ const d = +g.dataset.pxgo; show((((pt + 1 + d) % (n + 1)) + n + 1) % (n + 1) - 1); }
      else if(ev.target.closest("[data-pxzone]")) show(-1); };
    show(-1); return true;
  };

  /* ================================================================
     2. LE BESTIAIRE VIVANT
     Chaque silhouette est une liste de points dans une boîte de 200 × 200 (le 3e nombre marque un angle vif).
     Les six suivent l'échelle du vase animé : 0 matière première · 1 noir · 2 paon · 3 blanc · 4 jaune · 5 rouge.
     ================================================================ */
  const fan = (() => { const o = [], cx = 100, cy = 100, R = 88, n = 13, a0 = 200*Math.PI/180, a1 = -20*Math.PI/180;
    for(let k = 0; k < n; k++){ const a = a0 + (a1 - a0)*k/(n - 1); o.push([cx + R*Math.cos(a), cy - R*Math.sin(a), 1]);
      if(k < n - 1){ const am = a0 + (a1 - a0)*(k + .5)/(n - 1); o.push([cx + (R - 10)*Math.cos(am), cy - (R - 10)*Math.sin(am)]); } }
    return o.concat([[160,142],[136,152],[122,160],[118,178],[126,190,1],[104,186],[100,180],[96,186],[74,190,1],[82,178],[78,160],[64,152],[40,142]]); })();
  const mir = (r, from, tail) => r.concat(r.slice(from, -1).map(p => [200 - p[0], p[1], p[2]]).reverse(), tail);
  const AIGLE = mir([[100,22],[110,24],[118,30],[131,41,1],[118,43],[113,51],[113,60],[124,58],[140,40],[156,24],[172,12,1],[168,38],[190,38,1],[174,56],[193,65,1],[172,76],[187,94,1],[164,92],[172,116,1],[150,105],[137,112],[131,126],[137,140],[147,153],[162,166,1],[147,163],[151,178,1],[138,163],[125,153],[124,170],[121,191,1],[109,180],[100,195,1]], 7, [[87,60],[87,40],[91,27]]);
  const PHENIX = mir([[90,8,1],[99,22],[109,26],[126,34,1],[112,38],[108,48],[108,60],[120,62],[134,44],[146,24],[160,3,1],[158,30],[181,13,1],[170,44],[193,38,1],[176,62],[193,71,1],[168,82],[177,101,1],[150,96],[135,104],[130,120],[152,116,1],[145,138],[171,130,1],[158,157],[178,158,1],[152,180],[126,190],[100,193]], 7, [[92,60],[90,44],[84,30],[78,18,1],[86,22]]);
  const ocelli = (() => { let o = ""; const cx = 100, cy = 100, a0 = 200, a1 = -20;
    for(let k = 0; k < 13; k++){ const a = (a0 + (a1 - a0)*k/12)*Math.PI/180, x = cx + 70*Math.cos(a), y = cy - 70*Math.sin(a);
      o += `<path class="l f" d="M100 118L${(cx + 84*Math.cos(a)).toFixed(1)} ${(cy - 84*Math.sin(a)).toFixed(1)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.4" fill="#e4c46a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="#1fa08c"/><circle cx="${x.toFixed(1)}" cy="${(y + .8).toFixed(1)}" r="2.4" fill="#1c2a7a"/>`; }
    for(let k = 0; k < 12; k++){ const a = (a0 + (a1 - a0)*(k + .5)/12)*Math.PI/180, x = cx + 47*Math.cos(a), y = cy - 47*Math.sin(a) + 6;
      o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" fill="#e4c46a"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#1fa08c"/><circle cx="${x.toFixed(1)}" cy="${(y + .6).toFixed(1)}" r="1.5" fill="#1c2a7a"/>`; }
    return o; })();
  const mirL = ds => ds.map(d => `<path class="l" d="${d}"/><path class="l" d="${d}" transform="translate(200 0) scale(-1 1)"/>`).join("");
  const BETES = [
    {id:"dragon", p:0, nom:"Le dragon", etat:"La matière première", lat:"prima materia", c1:[122,156,112], c2:[32,62,50], glow:[96,150,128], ink:"rgba(12,30,22,.6)", planche:"dragon",
     court:"Avant toute couleur. La matière est brute et sauvage.",
     texte:"Le dragon est la matière de départ, celle que personne n'a encore travaillée. Les textes la disent dangereuse et répètent qu'il faut la « tuer » pour commencer : la dissoudre, la défaire. Le premier vase du Splendor solis le montre abreuvé par un enfant.",
     pts:[[186,60,1],[172,50],[160,42],[150,22,1],[148,44],[138,48],[126,62],[120,80],[118,96],[110,92],[98,64],[86,36],[76,8,1],[72,40],[48,26,1],[54,58],[26,52,1],[42,80],[16,84,1],[44,100],[40,116],[26,132],[10,138,1],[16,150],[2,170,1],[20,166],[28,180,1],[32,160],[52,146],[74,152],[92,160],[100,170],[96,188,1],[116,188,1],[112,168],[128,160],[134,170],[132,188,1],[152,188,1],[146,166],[154,146],[156,124],[148,104],[146,86],[152,72],[164,76],[184,78,1],[164,66,1]],
     det:`<circle cx="160" cy="56" r="3.2" fill="#f2d36b"/><circle cx="160.6" cy="56" r="1.2" fill="#14110a"/><path class="l" d="M110 92L77 12M110 92L50 29M110 92L29 54M110 92L20 85"/><path class="l" d="M146 97q-9 5-19 3M150 113q-11 6-24 4M153 131q-13 8-28 6M150 148q-12 7-24 6"/><path class="l" d="M52 146q8-12 22-14M30 132q10-4 18-12"/><path d="M170 67l2.600 4.500l2.600-4.300M176 77.500l-2.400-4.300l-2.600 4.100" fill="#f4efe0"/>`},
    {id:"corbeau", p:1, nom:"Le corbeau", etat:"L'œuvre au noir", lat:"nigredo", c1:[70,62,88], c2:[10,8,14], glow:[120,96,170], ink:"rgba(190,176,226,.5)", planche:"noir", rim:"rgba(196,184,230,.55)",
     court:"La matière noircit et se défait.",
     texte:"« La tête du corbeau » est le nom courant de la putréfaction. La matière, enfermée et chauffée doucement, devient noire. Tous les textes insistent : sans ce noir, rien ne commence. C'est le soleil noir du Splendor solis.",
     pts:[[188,70,1],[170,56],[158,46],[146,36],[130,34],[116,42],[104,60],[88,84],[70,106],[52,126],[34,146],[10,176,1],[26,184,1],[46,168],[60,162],[78,168],[98,166],[116,156],[132,140],[143,118],[148,98],[152,86],[160,80],[174,78]],
     det:`<circle cx="151" cy="52" r="3" fill="#e9e2f6"/><circle cx="151.500" cy="52" r="1.300" fill="#0c0a10"/><path class="l" d="M160 66Q174 68 188 70"/><path class="l" d="M122 60Q100 92 68 124Q54 138 36 152"/><path class="l" d="M114 84Q94 108 62 136"/><path class="l" d="M106 106Q90 124 64 146"/><path class="k" d="M90 166V188M90 188l-9 4M90 188l9 4M108 162V186M108 186l-9 4M108 186l9 4"/>`},
    {id:"paon", p:2, nom:"Le paon", etat:"La queue du paon", lat:"cauda pavonis", c1:[52,170,150], c2:[58,40,128], glow:[70,205,180], ink:"rgba(8,30,40,.42)", planche:"paon",
     court:"Toutes les couleurs passent sur la matière.",
     texte:"Entre le noir et le blanc, beaucoup de textes décrivent une surface qui se couvre de reflets changeants, comme une flaque d'huile. Ils y voient le signe que la matière « s'ouvre ». Aucune couleur ne reste : c'est un passage.",
     pts:fan,
     det:ocelli + `<path d="M100 92c7 0 11 6 9 13l-3 14c12 8 18 22 14 36-3 10-10 16-20 16s-17-6-20-16c-4-14 2-28 14-36l-3-14c-2-7 2-13 9-13z" fill="#1d3fa3" stroke="#0e1c5c" stroke-width="1"/><path d="M107 99l10 3-9 3z" fill="#e4c46a"/><circle cx="103" cy="99" r="1.500" fill="#fff"/><path class="l" style="stroke:#e4c46a" d="M97 92l-4-12M100 91V78M103 92l4-12"/><circle cx="93" cy="79" r="2" fill="#1fa08c"/><circle cx="100" cy="77" r="2" fill="#1fa08c"/><circle cx="107" cy="79" r="2" fill="#1fa08c"/><path d="M88 150c6 10 18 10 24 0" class="l" style="stroke:rgba(255,255,255,.35)"/>`},
    {id:"cygne", p:3, nom:"Le cygne", etat:"L'œuvre au blanc", lat:"albedo", c1:[255,255,255], c2:[176,194,212], glow:[214,232,255], ink:"rgba(60,84,120,.45)", planche:"blanc",
     court:"La matière est lavée. Elle blanchit.",
     texte:"Les vapeurs montent, retombent et lavent la matière, encore et encore. Elle devient blanche. Les textes parlent du cygne ou de la colombe, de la reine blanche, de la Lune. À ce stade, la pierre changerait les métaux en argent.",
     pts:[[182,58,1],[168,50],[158,42],[148,36],[138,40],[131,54],[124,72],[123,88],[129,102],[126,110],[110,104],[92,90],[68,80],[44,78],[18,64,1],[26,90],[8,106,1],[20,130],[42,150],[76,162],[112,164],[142,156],[160,140],[166,122],[160,106],[147,92],[142,80],[146,67],[154,61],[164,62],[172,64]],
     det:`<path d="M182 58L167 50.500L165 62.500L172 64Z" fill="#e58a2c"/><path d="M167 50.500L160 47L158.500 58L165 62.500Z" fill="#14110a"/><circle cx="153" cy="46" r="1.900" fill="#14110a"/><path class="l" d="M118 108Q88 90 44 84M114 122Q82 104 32 98M110 136Q80 120 28 114M104 148Q78 138 40 132"/><path class="w" d="M4 172q12-6 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0M16 182q12-5 24 0t24 0t24 0t24 0t24 0t24 0t24 0"/>`},
    {id:"aigle", p:4, nom:"L'aigle", etat:"L'œuvre au jaune", lat:"citrinitas", c1:[253,232,140], c2:[196,132,22], glow:[255,204,88], ink:"rgba(96,58,4,.5)", planche:"aigle",
     court:"Le blanc se dore, comme une aube. Quelque chose s'envole.",
     texte:"L'aigle est ce qui monte : la partie volatile de la matière, que la chaleur élève dans le vase. Les textes associent ce moment à l'aurore, quand le blanc se réchauffe et jaunit. À partir du XVe siècle, beaucoup d'auteurs sautent cette étape et ne comptent plus que trois couleurs.",
     pts:AIGLE,
     det:`<path d="M90 19l-2-12l7 6l5-9l5 9l7-6l-2 12z" fill="#f6dc8a" stroke="rgba(96,58,4,.7)" stroke-width=".8"/><circle cx="113" cy="33" r="2" fill="#14110a"/><path class="l" d="M118 37L130 41"/>` + mirL(["M126 62L168 22","M128 72L182 44","M130 82L184 68","M132 94L178 94","M134 106L164 110"]) + `<path class="l" d="M86 94q7 7 14 0q7 7 14 0M88 108q6 7 12 0q6 7 12 0M90 122q5 6 10 0q5 6 10 0M100 152V186M108 152L114 178M92 152L86 178"/>`},
    {id:"phenix", p:5, nom:"Le phénix", etat:"L'œuvre au rouge", lat:"rubedo", c1:[255,170,72], c2:[150,16,20], glow:[255,92,52], ink:"rgba(88,8,4,.5)", planche:"rouge",
     court:"Ce qui renaît du feu et ne le craint plus.",
     texte:"Le feu le plus fort fixe la matière : elle devient rouge et stable. Les textes parlent du phénix, du roi rouge, du Soleil. C'est la pierre philosophale. Elle changerait les métaux en or et, pour certains auteurs, guérirait les corps.",
     pts:PHENIX,
     back:`<circle cx="100" cy="96" r="96" fill="url(#albt-sun)"/>`,
     det:`<circle cx="110" cy="30" r="2" fill="#14110a"/><path class="l" d="M114 35L125 34"/>` + mirL(["M122 64L158 10","M124 72L178 20","M126 80L188 42","M130 90L188 70","M134 100L172 98"]) + `<path d="M100 191C78 187 68 168 77 148C83 163 92 158 89 138C102 150 105 166 100 175C108 164 110 148 123 143C118 160 127 166 124 176C119 186 110 191 100 191Z" fill="#ffe08a" opacity=".85"/><path d="M100 190C90 186 86 176 92 166C95 174 100 172 99 162C106 168 108 178 104 184C103 187 102 189 100 190Z" fill="#fff6d8"/>`}
  ];
  /* la courbe : Catmull-Rom fermée, puis points à distance égale */
  function dense(pts){
    const P = []; pts.forEach(p => { P.push(p); if(p[2]) P.push(p); });
    const n = P.length, out = [];
    for(let i = 0; i < n; i++){ const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      if(p1[0] === p2[0] && p1[1] === p2[1]) continue;
      for(let s = 0; s < 10; s++){ const t = s/10, t2 = t*t, t3 = t2*t;
        out.push([.5*(2*p1[0] + (-p0[0] + p2[0])*t + (2*p0[0] - 5*p1[0] + 4*p2[0] - p3[0])*t2 + (-p0[0] + 3*p1[0] - 3*p2[0] + p3[0])*t3),
                  .5*(2*p1[1] + (-p0[1] + p2[1])*t + (2*p0[1] - 5*p1[1] + 4*p2[1] - p3[1])*t2 + (-p0[1] + 3*p1[1] - 3*p2[1] + p3[1])*t3)]); } }
    return out;
  }
  const NPT = 220;
  function resample(pts){
    const Dn = dense(pts), n = Dn.length, L = [0]; for(let i = 1; i <= n; i++){ const a = Dn[i - 1], b = Dn[i % n]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
    const tot = L[n], out = []; let j = 0;
    for(let k = 0; k < NPT; k++){ const d = tot*k/NPT; while(j < n - 1 && L[j + 1] < d) j++; const a = Dn[j], b = Dn[(j + 1) % n], u = (d - L[j])/((L[j + 1] - L[j]) || 1); out.push([a[0] + (b[0] - a[0])*u, a[1] + (b[1] - a[1])*u]); }
    let ar = 0; for(let i = 0; i < NPT; i++){ const a = out[i], b = out[(i + 1) % NPT]; ar += a[0]*b[1] - b[0]*a[1]; }
    return ar < 0 ? out.reverse() : out;
  }
  const toD = P => "M" + P.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L") + "Z";
  BETES.forEach(b => { b.S = resample(b.pts); b.d = toD(b.S); });
  /* le décalage qui rapproche le mieux deux contours */
  function align(Aa, Bb){ let best = 0, bd = Infinity;
    for(let s = 0; s < NPT; s += 2){ let d = 0; for(let i = 0; i < NPT; i += 4){ const a = Aa[i], b = Bb[(i + s) % NPT]; d += (a[0] - b[0])**2 + (a[1] - b[1])**2; } if(d < bd){ bd = d; best = s; } }
    return best; }
  const rgb = c => `rgb(${c.map(v => Math.round(v)).join(",")})`, mix3 = (a, b, t) => [0, 1, 2].map(i => lerp(a[i], b[i], t));
  const beteOf = id => BETES.find(b => b.id === id), beteAtP = p => BETES.find(b => b.p === p);
  window.ALCH_BETES = {list:BETES, at:beteAtP, of:beteOf};

  const FLASK = "M180 44V150C180 176 70 196 70 300A130 130 0 0 0 330 300C330 196 220 176 220 150V44Q220 28 200 26Q180 28 180 44Z";
  const AUTRES = ["Le pélican","Le lion vert","L'ouroboros","Le crapaud","Le roi et la reine","Le rebis"];
  function bestiaire(root, arg){
    let cur = Math.max(0, BETES.findIndex(b => b.id === arg)), raf = 0, busy = false, alive = true;
    const s0 = st(); if(!s0.betes) { s0.betes = 1; save(); }
    root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Les bêtes de l'Œuvre</p><h1>Le bestiaire vivant</h1>${rule4}
        <p class="al-lede">Les alchimistes ont raconté leur travail avec des animaux. Touche le vase : chaque bête se change en la suivante, du dragon au phénix.</p></header>
      <div class="al-bt">
        <div class="al-niche al-bt-stage">
          <button type="button" class="al-bt-vase" data-btnext aria-label="Chauffer : faire venir la bête suivante">
            <svg viewBox="0 0 400 480" aria-hidden="true">
              <defs><radialGradient id="albt-g"><stop offset="0" data-g0 stop-opacity=".5"/><stop offset="1" data-g1 stop-opacity="0"/></radialGradient>
                <linearGradient id="albt-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" data-c1/><stop offset="1" data-c2/></linearGradient>
                <radialGradient id="albt-sun"><stop offset="0" stop-color="#fff2b0" stop-opacity=".95"/><stop offset=".45" stop-color="#ffb84a" stop-opacity=".5"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
                <linearGradient id="albt-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".55" stop-color="#fff" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient>
                <clipPath id="albt-c"><path d="${FLASK}"/></clipPath></defs>
              <circle cx="200" cy="300" r="196" fill="url(#albt-g)"/>
              <g class="al-bt-fire"><path d="M168 470q-10-22 6-40q2 16 12 20q-2-20 14-34q0 22 14 34q8-8 6-20q16 18 8 40z" fill="#ff9a3c" opacity=".8"/><path d="M186 470q-6-14 4-24q2 10 10 12q0-12 8-18q2 14 10 20q4 6 0 10z" fill="#ffe08a"/></g>
              <path d="${FLASK}" fill="rgba(190,226,214,.05)"/>
              <g clip-path="url(#albt-c)"><g transform="translate(104 212) scale(.96)"><g class="al-bt-back" data-btback></g><path class="al-bt-sil" data-btsil fill="url(#albt-f)"/><g class="al-bt-det" data-btdet></g></g>
                <g class="al-bt-sparks" data-btsp></g></g>
              <path d="${FLASK}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"/><path d="${FLASK}" fill="none" stroke="url(#albt-v)" stroke-width="2.200"/>
              <path d="M96 318Q98 246 146 206" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="6" stroke-linecap="round"/><path d="M188 54V146" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
              <path d="M170 104l-3-24l13 11l8-19l12 17l12-17l8 19l13-11l-3 24z" fill="#e8c76e" stroke="rgba(60,36,6,.8)"/><circle cx="184" cy="97" r="2.300" fill="#c2311f"/><circle cx="200" cy="97" r="2.300" fill="#c2311f"/><circle cx="216" cy="97" r="2.300" fill="#c2311f"/>
              <path d="M130 470H270" stroke="rgba(206,170,104,.6)" stroke-width="2" stroke-linecap="round"/>
            </svg></button>
          <ol class="al-bt-steps" aria-label="Les six bêtes">${BETES.map((b, i) => `<li><button type="button" data-btgo="${i}" style="--bc:${rgb(b.c1)};--bc2:${rgb(b.c2)}" aria-label="${h(b.nom)}"><i></i><span>${h(b.nom.replace(/^L[ea'] ?/, ""))}</span></button></li>`).join("")}</ol>
        </div>
        <div class="al-bt-txt" data-bttxt aria-live="polite"></div>
      </div>
      <section class="al-bt-more"><h2 class="al-k">Les autres bêtes</h2><p class="al-p al-narrow">Elles ne marquent pas une couleur de l'Œuvre, mais une matière, un vase ou un geste.</p>
        <dl class="al-dl al-dl-2">${D.BESTIAIRE.filter(b => AUTRES.includes(b[0])).map(b => `<div><dt>${h(b[0])}</dt><dd>${nb(h(b[1]))}</dd></div>`).join("")}</dl>
        <p class="help al-left">${badge("trad")} Cette suite de bêtes est une convention des images, surtout à partir du XVe siècle. Tous les auteurs ne les rangent pas dans le même ordre, et certains remplacent le cygne par la colombe ou l'aigle par l'aurore.</p></section>`;
    const sil = q1("[data-btsil]", root), det = q1("[data-btdet]", root), back = q1("[data-btback]", root), txt = q1("[data-bttxt]", root), sp = q1("[data-btsp]", root);
    const stops = {c1:q1("[data-c1]", root), c2:q1("[data-c2]", root), g0:q1("[data-g0]", root), g1:q1("[data-g1]", root)};
    const paint = (c1, c2, g) => { stops.c1.setAttribute("stop-color", rgb(c1)); stops.c2.setAttribute("stop-color", rgb(c2)); stops.g0.setAttribute("stop-color", rgb(g)); stops.g1.setAttribute("stop-color", rgb(g)); };
    function settle(i){ const b = BETES[i], nx = BETES[(i + 1) % BETES.length], s = st();
      sil.setAttribute("d", b.d); sil.style.stroke = b.rim || "rgba(255,255,255,.28)"; paint(b.c1, b.c2, b.glow);
      det.innerHTML = b.det; det.style.setProperty("--ink", b.ink); back.innerHTML = b.back || "";
      requestAnimationFrame(() => { det.classList.add("in"); back.classList.add("in"); });
      qa("[data-btgo]", root).forEach((x, k) => { x.classList.toggle("on", k === i); x.classList.toggle("past", k < i); });
      const P = D.PLANCHES[b.planche], won = s.planches.includes(b.planche);
      txt.innerHTML = `<p class="eyebrow">${i + 1} sur ${BETES.length} · <i>${h(b.lat)}</i></p><h2>${h(b.nom)}</h2><p class="al-bt-etat">${h(b.etat)}</p>
        <p class="al-acc">${nb(h(b.court))}</p><p class="al-p">${nb(h(b.texte))}</p>
        <div class="al-acts"><button type="button" class="btn" data-btnext>${i === BETES.length - 1 ? "Recommencer l'Œuvre" : `Chauffer : ${h(nx.nom.toLowerCase())}`}</button>
          ${P ? (won ? `<button type="button" class="btn ghost" data-alplanche="${b.planche}">Voir la planche : ${h(P.t)}</button>` : `<button type="button" class="btn ghost" data-algo="labo:planches">La planche « ${h(P.t)} » est à gagner</button>`) : ""}</div>
        ${i === BETES.length - 1 ? `<p class="help al-left">Après le rouge, les textes disent qu'on peut tout recommencer avec la pierre obtenue : ils appellent cela la multiplication.</p>` : ""}`;
    }
    function sparks(c){ if(calm()) return; let o = ""; for(let k = 0; k < 16; k++){ const a = Math.random()*6.283, r = 40 + Math.random()*90; o += `<circle cx="200" cy="308" r="${(1.5 + Math.random()*3).toFixed(1)}" fill="${rgb(c)}" style="--dx:${(Math.cos(a)*r).toFixed(0)}px;--dy:${(Math.sin(a)*r - 20).toFixed(0)}px;animation-delay:${(Math.random()*.25).toFixed(2)}s"/>`; } sp.innerHTML = o; }
    function go(to){
      if(busy || to === cur) return; const a = BETES[cur], b = BETES[to];
      if(calm()){ cur = to; det.classList.remove("in"); back.classList.remove("in"); settle(cur); return; }
      busy = true; det.classList.remove("in"); back.classList.remove("in"); root.querySelector(".al-bt-stage").classList.add("hot"); sparks(b.glow);
      const sh = align(a.S, b.S), t0 = performance.now(), dur = 1050;
      const step = now => { if(!alive) return; const u = Math.min(1, (now - t0)/dur), e = ease(u), P = new Array(NPT);
        const sw = Math.sin(u*Math.PI)*5;
        for(let i = 0; i < NPT; i++){ const p = a.S[i], q = b.S[(i + sh) % NPT], w = Math.sin(i*.35 + u*9)*sw; P[i] = [lerp(p[0], q[0], e) + w, lerp(p[1], q[1], e) + w*.6]; }
        sil.setAttribute("d", toD(P)); paint(mix3(a.c1, b.c1, e), mix3(a.c2, b.c2, e), mix3(a.glow, b.glow, e));
        if(u < 1) raf = requestAnimationFrame(step); else { cur = to; busy = false; root.querySelector(".al-bt-stage").classList.remove("hot"); settle(cur); } };
      raf = requestAnimationFrame(step);
    }
    root.addEventListener("click", ev => { const n = ev.target.closest("[data-btnext]"), g = ev.target.closest("[data-btgo]");
      if(n) go((cur + 1) % BETES.length); else if(g) go(+g.dataset.btgo); });
    settle(cur);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }
  reg("bestiaire", {t:"Le bestiaire vivant", genre:"Objet · les bêtes de l'Œuvre", x:"Du dragon au phénix : touche le vase, chaque bête se change en la suivante.",
    ico:ico(`<path d="M20 5v11c0 6-11 9-11 19a15 15 0 0 0 30 0c0-10-11-13-11-19V5"/><path d="M33 26l-6 2-3-4-5 6-4 8 5-2 6 3 6-5z" opacity=".7"/>`), render:bestiaire});

  /* ================================================================
     3. LE LIVRE MUET (Mutus Liber, La Rochelle, 1677)
     Pour chaque planche : une question à laquelle on répond en regardant, ce qu'on voit, ce qu'on en a lu.
     ================================================================ */
  const ML = [
    {t:"Le songe de Jacob", q:"Que fait l'homme allongé, en bas de l'image ?", o:["Il dort","Il prie","Il lit"], st:"doc",
     voit:"Un homme dort sur un rocher, de nuit. Une échelle monte vers le ciel étoilé. Deux anges y descendent en sonnant de la trompette. Deux branches de rosier nouées encadrent la scène.",
     lu:"C'est le songe de Jacob, dans la Genèse. Les trois lignes de chiffres, lues à l'envers, renvoient à la Bible : le songe, puis deux bénédictions qui promettent « la rosée du ciel ». Le livre annonce ainsi sa matière sans la nommer."},
    {t:"Le vase et le fourneau", q:"Qui tient le grand vase, en haut ?", o:["Deux anges","L'homme et la femme","Le Soleil"], st:"trad",
     voit:"Sous un Soleil à visage, deux anges tiennent un vase de verre. À l'intérieur, Neptune et son trident, entre deux enfants : l'un porte un soleil, l'autre une lune. En bas, un homme et une femme sont à genoux de part et d'autre d'un fourneau où repose un petit vase.",
     lu:"L'image pose tout le programme. En haut, ce que l'on cherche : réunir le Soleil et la Lune dans le verre. En bas, la manière : un fourneau, un couple, et la prière avant le travail. L'homme et la femme feront tout ensemble jusqu'à la dernière planche, ce qui est rare dans les livres d'alchimie."},
    {t:"Les trois cercles", q:"Quels animaux se font face dans le cercle du milieu ?", o:["Un bélier et un taureau","Un lion et un aigle","Deux chevaux"], st:"trad",
     voit:"Trois cercles emboîtés, entre le Soleil et la Lune. Tout en haut, Jupiter sur son aigle. Dans les cercles : Junon et son paon, un bélier et un taureau, une nuée d'oiseaux, un couple dans une barque avec une ligne de pêche, Neptune sur les flots, une sirène.",
     lu:"C'est la planche la plus discutée. Le bélier et le taureau sont les signes du printemps : ils reviendront. La ligne de pêche et la nuée d'oiseaux disent qu'il y a quelque chose à capturer, dans l'eau et dans l'air. Sur le reste, les commentateurs ne s'accordent pas, et le livre ne tranche pas."},
    {t:"La rosée", q:"Que font-ils avec le drap, au premier plan ?", o:["Ils le tordent au-dessus d'un bassin","Ils le mettent à sécher","Ils le plient"], st:"trad",
     voit:"Un pré, à l'écart d'une ville. Des draps sont tendus sur des piquets. Du ciel, entre le Soleil et la Lune, descendent de grands faisceaux. Un bélier et un taureau. Au premier plan, l'homme et la femme tordent un drap au-dessus d'un grand bassin.",
     lu:"Ils récoltent la rosée. Les draps ont passé la nuit dehors, on les tord au matin. Le bélier et le taureau donnent la saison : le printemps. C'est la planche la plus célèbre du livre, et celle dont la lecture fait le moins débat."},
    {t:"La première cuisson", q:"Un nombre est gravé sur le fourneau du bas. Lequel ?", o:["40","7","12"], st:"trad",
     voit:"Trois scènes, de haut en bas. Ils versent le bassin dans un chaudron, puis distillent. La femme recueille ce qui reste et le remet à un homme nu, marqué d'un croissant, qui porte un enfant. En bas, ils placent des fioles dans un fourneau marqué du nombre 40.",
     lu:"La rosée est distillée : une part s'élève, une part reste. Le nombre 40 est lu comme une durée, quarante jours de chaleur douce. Le personnage au croissant reçoit la part du fond ; les commentateurs ne s'accordent pas sur son nom."},
    {t:"La fleur", q:"Qu'est-ce qui est apparu dans le vase, au milieu de l'image ?", o:["Une fleur","Un oiseau","Une clef"], st:"trad",
     voit:"Le travail reprend : distiller, verser, chauffer. Dans le vase du milieu, une petite fleur est apparue. En bas, l'homme remet une fiole marquée de cette fleur à un personnage en armure, couronné de rayons, un arc à la main.",
     lu:"La fleur est le signe que quelque chose s'est formé. Le personnage rayonnant à l'arc est Apollon, le Soleil. Après la part donnée au croissant, voici la part du Soleil : on reconnaît les deux principes de toute l'alchimie."},
    {t:"Saturne et l'enfant", q:"Que fait le personnage assis dans les flammes ?", o:["Il porte un enfant à sa bouche","Il dort","Il souffle sur le feu"], st:"trad",
     voit:"En haut et au milieu, on verse, on chauffe, on remue. En bas à gauche, un vieillard assis dans les flammes porte un enfant à sa bouche. Juste à côté, on le lave dans un baquet. À droite, un homme armé d'un sabre remet un flacon étoilé à une femme nue, coiffée d'un croissant.",
     lu:"C'est Saturne, qui dévore ses enfants dans le mythe. En alchimie, Saturne est le plomb, la matière noire : elle « mange » ce qu'on lui donne, puis on la lave. Brûler, puis laver : le noir, puis le blanc. Le flacon étoilé va à la Lune."},
    {t:"Mercure dans le vase", q:"Qui se tient dans le vase, cette fois ?", o:["Mercure, avec son casque ailé","Neptune et son trident","Un roi couronné"], st:"trad",
     voit:"La planche 2 revient, transformée. Les anges tiennent toujours le vase, mais Neptune a disparu. À sa place, Mercure, casque ailé et caducée, debout sur un soleil et une lune. Des oiseaux volent en dessous. En bas, le couple est de nouveau à genoux près du fourneau.",
     lu:"La première partie de l'Œuvre est faite : ce qui était promis dans le vase s'y trouve. Mercure est le nom que les alchimistes donnent à leur matière vivante, celle qui unit le Soleil et la Lune. Les oiseaux qui montent et descendent sont lus comme les vapeurs."},
    {t:"La seconde récolte", q:"Les draps ont disparu. Qu'est-ce qui les remplace dans le pré ?", o:["Des bassins posés au sol","Des tonneaux","Des filets"], st:"trad",
     voit:"Le même pré, le même bélier, le même taureau. Cette fois, six bassins sont posés à même le sol sous les faisceaux du ciel. En bas, le couple verse un bassin dans une bouteille à l'aide d'un entonnoir, puis la femme la remet à Mercure.",
     lu:"On recommence, mais autrement : la rosée est reçue directement, sans drap. Le livre montre plusieurs fois chaque geste. Les alchimistes disent qu'il faut refaire l'Œuvre pour la rendre plus forte."},
    {t:"Sceller le vase", q:"Que fait l'homme assis à la table, au milieu ?", o:["Il souffle dans un tube, vers une flamme","Il écrit","Il boit"], st:"trad",
     voit:"En haut, on pèse, puis on verse deux liqueurs dans un même vase : l'une est marquée d'une étoile, l'autre d'une fleur. Au milieu, l'homme souffle dans un chalumeau sur la flamme d'une lampe pour fermer le col du vase, que l'on pose ensuite dans le fourneau. En bas, la Lune et le Soleil se donnent la main.",
     lu:"C'est le scellement d'Hermès : on fond le verre du col pour fermer le vase. Rien n'en sortira plus. L'étoile et la fleur sont réunies, et en bas la Lune et le Soleil se tiennent par la main. C'est le mariage dont parlent tous les textes."},
    {t:"Le vase, encore", q:"Où as-tu déjà vu cette image ?", o:["À la planche 8","À la planche 4","Nulle part"], st:"trad",
     voit:"C'est presque la planche 8 : les anges, Mercure dans le vase, les oiseaux, le couple à genoux. Le vase est un peu plus grand, et deux ronds clairs sont apparus au mur, de part et d'autre du fourneau.",
     lu:"Le livre se répète exprès. Les planches 8 à 10 forment un tour, les planches 11 à 13 le refont. Les alchimistes appellent cela la multiplication : chaque passage rendrait la pierre plus forte."},
    {t:"La troisième récolte", q:"Et celle-ci, où l'as-tu vue ?", o:["À la planche 9","À la planche 2","Nulle part"], st:"trad",
     voit:"Le pré, les six bassins, le bélier et le taureau, le couple à l'entonnoir, la bouteille remise à Mercure. Tout est repris de la planche 9, à quelques détails près.",
     lu:"Même geste, même saison. Le travail, tel que le livre le montre, est patient et répétitif. Il n'y a pas de coup d'éclat : seulement des tours que l'on refait."},
    {t:"Dix, cent, mille", q:"Des nombres sont écrits tout en bas. Comment se suivent-ils ?", o:["Chacun vaut dix fois le précédent","Ils diminuent","Ils sont tous égaux"], st:"trad",
     voit:"La planche 10 revient : peser, verser, sceller le vase au chalumeau, le mettre au fourneau. En bas, la Lune et le Soleil se donnent de nouveau la main. Mais des nombres sont apparus à leurs pieds : 100, 1000, 10000, « etc. ».",
     lu:"C'est la multiplication, presque en toutes lettres. Les textes affirment qu'à chaque nouveau tour, la pierre agit sur dix fois plus de métal. Le « etc. » dit que cela peut continuer."},
    {t:"Prie, lis, travaille", q:"Quel geste font l'homme et la femme, tout en bas ?", o:["Un doigt sur la bouche","Ils se serrent la main","Ils montrent le ciel"], st:"doc",
     voit:"Trois fourneaux en haut. Dessous, trois personnages s'affairent chacun au-dessus d'un petit récipient, accompagnés de chiffres romains. Puis une balance, un mortier, deux vases sur le feu. Tout en bas, l'homme et la femme posent un doigt sur leurs lèvres. Et, pour la première fois, une phrase.",
     lu:"« Ora, lege, lege, lege, relege, labora et invenies » : prie, lis, lis, lis, relis, travaille, et tu trouveras. C'est la seule consigne du livre, et elle est devenue une devise de l'alchimie. Le doigt sur la bouche rappelle que ce livre a choisi de se taire."},
    {t:"Tu t'en vas clairvoyant", q:"Qu'est devenue l'échelle de la première planche ?", o:["Elle est couchée par terre","Elle monte toujours au ciel","Elle a disparu"], st:"trad",
     voit:"Le cadre de rosiers de la première planche est revenu. Deux anges couronnent un homme qui s'élève, tenu par une corde que le couple agenouillé retient. Au sol, un corps est étendu sur une peau de bête. L'échelle est couchée. Sur les banderoles : « Oculatus abis ».",
     lu:"« Tu t'en vas clairvoyant » : celui qui dormait à la première planche a maintenant les yeux ouverts. L'échelle ne sert plus. Le corps au sol, avec sa peau de lion, est lu comme celui d'Hercule : les travaux sont finis. Le couple se tient par la main, entre un soleil et une lune."}
  ];
  /* les réponses justes sont toujours écrites en premier : on mélange à l'affichage, de façon stable */
  const ordre = k => { const o = [0, 1, 2], r = (k*7 + 3) % 6; return [[0,1,2],[1,0,2],[2,1,0],[1,2,0],[0,2,1],[2,0,1]][r].map(i => o[i]); };
  function muet(root, arg){
    const s = st(); if(!Array.isArray(s.muet)) s.muet = [];
    let k = Math.min(14, Math.max(0, arg ? (+arg || 1) - 1 : (s.muet.length && s.muet.length < 15 ? Math.max(...s.muet) : 0))), rep = {}, tx = null;
    if(k > 14) k = 14;
    const img = i => `alchimie/img/ml${String(i + 1).padStart(2, "0")}.webp`;
    const HAUT = [901, 947, 960, 941, 917, 922, 962, 895, 965, 959, 900, 903, 914, 912, 916];   // hauteur de chaque planche, pour une largeur de 680
    const draw = dir => {
      const P = ML[k], seen = s.muet.includes(k + 1), ans = rep[k], open = seen || ans != null, ord = ordre(k);
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Mutus Liber · La Rochelle, 1677</p><h1>Le livre muet</h1>${rule4}
          <p class="al-lede">Quinze planches, presque aucun mot. Un homme et une femme y travaillent côte à côte. Regarde chaque image avant de lire ce qu'on en dit.</p></header>
        <div class="al-ml">
          <div class="al-ml-book">
            <div class="al-ml-page ${dir ? "turn-" + dir : ""}" data-mlzone><img src="${img(k)}" width="680" height="${HAUT[k]}" alt="Planche ${k + 1} : ${h(P.t)}" decoding="async"></div>
            <div class="al-ml-nav"><button type="button" class="btn small ghost" data-mlgo="-1" ${k ? "" : "disabled"}>‹ Planche ${k || ""}</button><span>Planche ${k + 1} sur 15</span><button type="button" class="btn small ghost" data-mlgo="1" ${k < 14 ? "" : "disabled"}>Planche ${k < 14 ? k + 2 : ""} ›</button></div>
            <ol class="al-ml-dots" aria-label="Les quinze planches">${ML.map((x, i) => `<li><button type="button" data-mlk="${i}" class="${i === k ? "on" : ""} ${s.muet.includes(i + 1) ? "seen" : ""}" aria-label="Planche ${i + 1} : ${h(x.t)}">${i + 1}</button></li>`).join("")}</ol>
            <p class="al-emb-cred">Touche l'image pour l'agrandir. ${h(D.CRED.ml01)}.</p>
          </div>
          <div class="al-ml-txt">
            <p class="eyebrow">Planche ${k + 1}</p>
            ${open ? `<h2>${h(P.t)}</h2>` : `<h2 class="al-ml-hid">Regarde d'abord</h2>`}
            <fieldset class="al-q al-ml-q"><legend>${nb(h(P.q))}</legend><div class="al-q-o">${ord.map(oi => `<button type="button" data-mlo="${oi}" ${open ? "disabled" : ""} class="${open ? (oi === 0 ? "ok" : oi === ans ? "ko" : "") : ""}">${h(P.o[oi])}</button>`).join("")}</div>
              ${open ? "" : `<button type="button" class="linkbtn" data-mlskip>Je ne sais pas : lire directement</button>`}</fieldset>
            ${open ? `<div class="al-ml-read"><h3>Ce qu'on voit</h3><p class="al-p">${nb(h(P.voit))}</p><h3>Ce qu'on en a lu ${badge(P.st)}</h3><p class="al-p">${nb(h(P.lu))}</p>
                ${k === 0 ? `<p class="help al-left">Cette première planche est aussi commentée détail par détail dans <button type="button" class="linkbtn" data-algo="labo:planches:emblemes">Les planches</button>.</p>` : ""}
                <div class="al-acts">${k < 14 ? `<button type="button" class="btn" data-mlgo="1">Tourner la page</button>` : `<button type="button" class="btn" data-mlk="0">Relire depuis le début</button><button type="button" class="btn ghost" data-algo="labo">Retour au laboratoire</button>`}</div></div>` : ""}
          </div></div>
        <section class="al-card al-ml-about"><h3>D'où vient ce livre</h3><p class="al-p">Le <i>Mutus Liber</i>, « livre muet », paraît à La Rochelle en 1677, chez Pierre Savouret, avec privilège du roi. L'auteur signe « Altus ». Les bibliothèques l'attribuent aujourd'hui à Isaac Baulot, apothicaire de la ville. Les lectures proposées ici résument celles de ses commentateurs, de Pierre Dujols (1914) à Eugène Canseliet (1967) : ce sont des interprétations, le livre lui-même ne dit rien.</p></section>`;
    };
    const lire = () => { if(!s.muet.includes(k + 1)){ s.muet.push(k + 1); save(); if(s.muet.length === 15) toast("Tu as lu les quinze planches du livre muet."); } };
    const aller = (i, dir) => { if(i < 0 || i > 14 || i === k) return; k = i; draw(calm() ? "" : dir); const t = q1(".al-ml", root); if(t && t.getBoundingClientRect().top < 0) t.scrollIntoView({block:"start"}); };
    root.addEventListener("click", ev => {
      const g = ev.target.closest("[data-mlgo]"), d = ev.target.closest("[data-mlk]"), o = ev.target.closest("[data-mlo]"), sk = ev.target.closest("[data-mlskip]"), z = ev.target.closest("[data-mlzone]");
      if(g) aller(k + (+g.dataset.mlgo), +g.dataset.mlgo > 0 ? "next" : "prev");
      else if(d) aller(+d.dataset.mlk, +d.dataset.mlk > k ? "next" : "prev");
      else if(o){ rep[k] = +o.dataset.mlo; lire(); draw(""); }
      else if(sk){ rep[k] = -1; lire(); draw(""); }
      else if(z) z.classList.toggle("zoom");
    });
    root.addEventListener("touchstart", ev => { const z = ev.target.closest("[data-mlzone]"); tx = z && !z.classList.contains("zoom") ? ev.touches[0].clientX : null; }, {passive:true});
    root.addEventListener("touchend", ev => { if(tx == null) return; const dx = ev.changedTouches[0].clientX - tx; tx = null; if(Math.abs(dx) > 60) aller(k + (dx < 0 ? 1 : -1), dx < 0 ? "next" : "prev"); }, {passive:true});
    draw("");
  }
  reg("muet", {t:"Le livre muet", genre:"Objet · quinze planches à feuilleter", x:"Le Mutus Liber de 1677, planche par planche. On regarde, on devine, puis on lit.",
    ico:ico(`<path d="M24 11c-5-3.500-11-4.500-17-3v28c6-1.500 12-.5 17 3 5-3.500 11-4.500 17-3V8c-6-1.500-12-.5-17 3z"/><path d="M24 11v28"/><path d="M12 17l3 12M12 29l6-12M30 18h6M30 23h6M30 28h4" opacity=".6"/>`), render:muet});

  /* ================================================================
     4. LA TABLE D'ÉMERAUDE, PHRASE PAR PHRASE
     Texte français : traduction dite de l'Hortulain (domaine public), la même que dans la bibliothèque de la Magie.
     Chaque figure est dessinée au trait dans une boîte de 120 × 120.
     ================================================================ */
  const ray = (cx, cy, r1, r2, n, off = 0) => { let d = ""; for(let i = 0; i < n; i++){ const a = off + i*6.2832/n; d += `M${(cx + Math.cos(a)*r1).toFixed(1)} ${(cy + Math.sin(a)*r1).toFixed(1)}L${(cx + Math.cos(a)*r2).toFixed(1)} ${(cy + Math.sin(a)*r2).toFixed(1)}`; } return d; };
  const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`;
  const TE = [
    {fr:"Il est vrai, sans mensonge, certain, & très véritable : Ce qui est en bas, est comme ce qui est en haut ; et ce qui est en haut est comme ce qui est en bas, pour faire les miracles d'une seule chose.",
     la:"Verum, sine mendacio, certum et verissimum : quod est inferius est sicut quod est superius, et quod est superius est sicut quod est inferius, ad perpetranda miracula rei unius.",
     mot:"Le haut et le bas", st:"trad", g:"C'est la phrase la plus citée de tout l'hermétisme. Pour les alchimistes, elle dit que le vase est un petit monde : ce qui s'y passe imite ce qui se passe dans le grand. Regarder l'un, c'est comprendre l'autre.",
     f:["M60 12L90 50H30Z", "M60 108L90 70H30Z", "M16 60H104"]},
    {fr:"Et comme toutes les choses ont été, & sont venues d'une, par la médiation d'une : ainsi toutes les choses ont été nées de cette chose unique, par adaptation.",
     la:"Et sicut omnes res fuerunt ab uno, meditatione unius, sic omnes res natae fuerunt ab hac una re, adaptatione.",
     mot:"Tout vient d'un", st:"trad", g:"Tout sort d'une seule chose. Les alchimistes en tirent leur idée centrale : il n'y a qu'une matière, et les métaux n'en sont que des états plus ou moins mûrs. Si tout vient d'un, tout peut se changer en tout.",
     f:[circ(60, 60, 7), ray(60, 60, 14, 44, 8), ray(60, 60, 49, 50, 8)]},
    {fr:"Le soleil en est le père, la lune est sa mère, le vent l'a porté dans son ventre ; la Terre est sa nourrice.",
     la:"Pater eius est Sol, mater eius Luna ; portavit illud ventus in ventre suo ; nutrix eius terra est.",
     mot:"Les quatre parents", st:"doc", g:"Quatre parents pour une seule chose. Les alchimistes y ont reconnu leurs matières : le Soleil et la Lune, l'or et l'argent ; le vent, la vapeur qui monte dans le vase ; la Terre, ce qui reste au fond. Michael Maier en a fait les deux premiers emblèmes de son Atalanta fugiens (1617).",
     f:[circ(28, 28, 13), circ(28, 28, 2), "M98 14A15 15 0 1 0 98 42A11.500 11.500 0 1 1 98 14", "M36 38L54 58M86 40L66 58", circ(60, 66, 8), "M60 76V84", "M40 86H80L60 114Z", "M48 97H72"]},
    {fr:"Le père de tout le telesme de tout le monde est ici.",
     la:"Pater omnis telesmi totius mundi est hic.",
     mot:"Le telesme", st:"doc", g:"Un mot étrange, que personne ne comprenait. Il vient de l'arabe tilasm, « talisman » : le traducteur latin du XIIe siècle l'a recopié tel quel. Les alchimistes y ont lu « le secret », « le trésor », « la perfection ».",
     f:[circ(60, 60, 44), "M60 16L98 82H22Z", "M60 104L22 38H98Z", circ(60, 60, 5)]},
    {fr:"Sa force ou puissance est entière, si elle est convertie en terre.",
     la:"Vis eius integra est, si versa fuerit in terram.",
     mot:"Devenir terre", st:"trad", g:"Une force qui ne prend pas corps reste incomplète. En laboratoire, c'est la fixation : rendre solide et stable ce qui s'envolait. Dans une Œuvre personnelle, c'est le passage à l'acte.",
     f:["M60 8V50", "M48 38L60 52L72 38", "M26 60H94L60 112Z", "M40 82H80"]},
    {fr:"Tu sépareras la terre du feu, le subtil de l'épais doucement, avec grande industrie.",
     la:"Separabis terram ab igne, subtile a spisso, suaviter, cum magno ingenio.",
     mot:"Séparer", st:"trad", g:"Séparer, mais doucement. Les alchimistes y lisent la distillation : la chaleur fait monter la part légère et laisse la part lourde. Le mot qui compte est « doucement » : un feu trop fort gâche tout, comme dans le Grand Œuvre du laboratoire.",
     f:["M60 6L84 44H36Z", "M36 76H84L60 114Z", "M46 92H74", "M18 60H30M40 60H52M68 60H80M90 60H102"]},
    {fr:"Il monte de la terre au ciel, et derechef il descend en terre, & il reçoit la force des choses supérieures et inférieures.",
     la:"Ascendit a terra in coelum, iterumque descendit in terram, et recipit vim superiorum et inferiorum.",
     mot:"Monter et redescendre", st:"trad", g:"C'est le mouvement même du vase : la vapeur monte, se condense, retombe, et recommence. Les alchimistes appellent cela la circulation. L'échelle de Jacob, à la première planche du livre muet, dit la même chose.",
     f:["M40 96C20 70 20 46 40 22", "M30 30L40 20L48 32", "M80 24C100 50 100 74 80 98", "M90 90L80 100L72 88", "M22 108H98", "M30 12H90"]},
    {fr:"Tu auras par ce moyen la gloire de tout le monde ; et pour cela toute obscurité s'enfuira de toi.",
     la:"Sic habebis gloriam totius mundi. Ideo fugiet a te omnis obscuritas.",
     mot:"La clarté", st:"trad", g:"La promesse. Elle est plus large que la fabrication de l'or : c'est la fin de l'obscurité, donc une connaissance. Beaucoup de lecteurs s'en sont servis pour dire que l'alchimie cherchait autre chose qu'un métal.",
     f:[circ(60, 60, 17), ray(60, 60, 25, 46, 12), ray(60, 60, 25, 36, 12, .2618)]},
    {fr:"C'est la force forte de toute force : car elle vaincra toute chose subtile, et pénétrera toute chose solide.",
     la:"Hic est totius fortitudinis fortitudo fortis ; quia vincet omnem rem subtilem, omnemque solidam penetrabit.",
     mot:"La force", st:"trad", g:"Une force qui retient ce qui est léger et traverse ce qui est dur. Les alchimistes y voient le portrait de la pierre : elle fixerait le mercure, qui s'échappe toujours, et entrerait dans les métaux pour les changer.",
     f:["M38 36H82V84H38Z", "M8 60H108", "M96 50L110 60L96 70", circ(22, 28, 5), circ(98, 30, 3), circ(88, 18, 2)]},
    {fr:"Ainsi le monde a été créé.",
     la:"Sic mundus creatus est.",
     mot:"Le monde", st:"trad", g:"Cinq mots. L'artiste, dans son laboratoire, refait en petit ce qui a fait le monde. C'est une idée très haute de son travail, et la raison pour laquelle tant d'alchimistes priaient avant d'allumer le feu.",
     f:[circ(60, 70, 36), "M24 70H96", "M60 70V106", "M60 34V8", "M48 18H72"]},
    {fr:"De ceci seront & sortiront d'admirables adaptations, desquelles le moyen en est ici.",
     la:"Hinc erunt adaptationes mirabiles, quarum modus est hic.",
     mot:"Les applications", st:"trad", g:"Une seule méthode, des applications sans nombre. Paracelse s'en souviendra en appliquant l'alchimie à la médecine : préparer des remèdes plutôt que de l'or.",
     f:["M60 112V72", "M60 72L32 46M60 72V40M60 72L88 46", "M32 46L20 24M32 46L42 22M60 40V14M88 46L78 22M88 46L100 24", circ(60, 112, 3)]},
    {fr:"C'est pourquoi j'ai été appelé Hermès Trismégiste, ayant les trois parties de la philosophie de tout le monde.",
     la:"Itaque vocatus sum Hermes Trismegistus, habens tres partes philosophiae totius mundi.",
     mot:"Trois fois grand", st:"leg", g:"Trismégiste veut dire « trois fois très grand ». Hermès est un personnage légendaire, mélange du dieu grec Hermès et du dieu égyptien Thot. L'Hortulain, au XIVe siècle, comprend les « trois parties » comme les trois règnes : minéral, végétal, animal.",
     f:[circ(60, 40, 23), circ(42, 72, 23), circ(78, 72, 23)]},
    {fr:"Ce que j'ai dit de l'opération du Soleil est accompli, et parachevé.",
     la:"Completum est quod dixi de operatione Solis.",
     mot:"L'opération du Soleil", st:"trad", g:"Le dernier mot nomme enfin le sujet : l'opération du Soleil. Pour les alchimistes, le Soleil est l'or. Tout le texte serait donc la recette du Grand Œuvre, en treize phrases et sans un seul nom de matière.",
     f:[circ(60, 60, 34), circ(60, 60, 4), circ(60, 60, 46)]}
  ];
  const fig = (i, cls = "") => `<svg class="al-te-fig ${cls}" viewBox="0 0 120 120" aria-hidden="true">${TE[i].f.map((d, k) => `<path d="${d}" pathLength="1" style="--i:${k}"/>`).join("")}</svg>`;
  const ROM = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII"];
  function table(root){
    const s = st(); s.table = Math.min(13, Math.max(0, s.table | 0));
    let cur = s.table >= 13 ? -1 : s.table;   // -1 : la table entière
    const draw = () => {
      const all = cur < 0, lit = Math.max(s.table, all ? 13 : cur + 1);
      root.innerHTML = `<header class="al-hero sm"><p class="eyebrow">Tabula smaragdina</p><h1>La Table d'émeraude</h1>${rule4}
          <p class="al-lede">Treize phrases attribuées à Hermès, et le texte le plus commenté de l'alchimie. Grave-les une à une : chacune a sa figure.</p></header>
        <div class="al-te">
          <div class="al-te-slab ${all ? "all" : ""}">
            <ol class="al-te-list">${TE.map((p, i) => `<li class="${i < lit ? "lit" : ""} ${i === cur ? "on" : ""}"><button type="button" data-tek="${i}" ${i < lit ? "" : "disabled"} aria-label="Phrase ${i + 1}${i < lit ? " : " + h(p.mot) : ", pas encore gravée"}"><b>${ROM[i]}</b>${all ? `<span>${nb(h(p.fr))}</span>` : `<i>${i < lit ? h(p.mot) : "· · ·"}</i>`}</button></li>`).join("")}</ol>
          </div>
          ${all ? `<div class="al-te-txt"><p class="eyebrow">La table entière</p><h2>Treize phrases gravées</h2><p class="al-p">Touche une phrase pour revoir sa figure et son commentaire. Le texte français est la traduction ancienne dite de l'Hortulain.</p>
              <div class="al-te-all">${TE.map((p, i) => `<button type="button" data-tek="${i}" aria-label="${h(p.mot)}">${fig(i, "sm")}</button>`).join("")}</div>
              <div class="al-acts"><button type="button" class="btn ghost" data-algo="labo">Retour au laboratoire</button></div></div>`
            : `<div class="al-te-txt" aria-live="polite"><div class="al-te-figbox">${fig(cur, "draw")}</div>
              <p class="eyebrow">Phrase ${cur + 1} sur 13 · ${h(TE[cur].mot)}</p>
              <blockquote class="al-te-fr">${nb(h(TE[cur].fr))}</blockquote><p class="al-te-la" lang="la">${h(TE[cur].la)}</p>
              <h3>Ce qu'on y a lu ${badge(TE[cur].st)}</h3><p class="al-p">${nb(h(TE[cur].g))}</p>
              <div class="al-acts">${cur < 12 ? `<button type="button" class="btn" data-tek="${cur + 1}" data-tenew>Graver la phrase suivante</button>` : `<button type="button" class="btn" data-tek="-1">Voir la table entière</button>`}${cur > 0 ? `<button type="button" class="btn ghost" data-tek="${cur - 1}">‹ Précédente</button>` : ""}${s.table >= 13 && cur < 12 ? `<button type="button" class="btn ghost" data-tek="-1">La table entière</button>` : ""}</div></div>`}
        </div>
        <section class="al-card al-ml-about"><h3>D'où vient ce texte</h3><p class="al-p">La plus ancienne version connue est arabe, à la fin du <i>Livre du secret de la création</i> attribué à Balînûs (VIIIe ou IXe siècle). Elle est traduite en latin au XIIe siècle, et imprimée pour la première fois en 1541. Personne n'a jamais vu de table en émeraude : c'est le récit qui accompagne le texte. Tu peux le lire d'une traite dans la bibliothèque de la Magie.</p></section>`;
      if(cur >= 0 && s.table < cur + 1){ s.table = cur + 1; save(); if(s.table === 13) toast("La Table d'émeraude est gravée en entier."); }
    };
    root.addEventListener("click", ev => { const b = ev.target.closest("[data-tek]"); if(!b) return; cur = +b.dataset.tek; draw();
      const t = q1(".al-te-txt", root); if(t && (t.getBoundingClientRect().top < 0 || t.getBoundingClientRect().top > innerHeight*.6)) t.scrollIntoView({behavior:calm() ? "auto" : "smooth", block:"start"}); });
    draw();
  }
  reg("table", {t:"La Table d'émeraude", genre:"Objet · treize phrases", x:"Le texte fondateur, gravé phrase par phrase. Chacune a sa figure et son commentaire.",
    ico:ico(`<rect x="10" y="6" width="28" height="36" rx="2"/><path d="M24 12l7 10H17zM24 36l7-10H17z" opacity=".7"/><path d="M14 24h20"/>`), render:table});
})();
