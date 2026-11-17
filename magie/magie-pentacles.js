/* ===== Arcanes · Magie : les pentacles =====
   Un module de l'école (XV), un instrument de l'atelier (le cabinet des pentacles) et quatre schémas.
   Source principale : la Clé de Salomon éditée par S. L. MacGregor Mathers (1889), chapitre XVIII du livre I,
   et l'édition revue par Joseph H. Peterson (esotericarchives.com). Les buts sont paraphrasés en français.
   Garde-fou d'Arcanes : on raconte tous les pentacles, on ne dessine ni ne propose ceux qui visent autrui,
   et l'atelier ne fabrique que des emblèmes tournés vers soi. */
(() => {
  const M = window.ArcanesMagie;
  if(!M || !M._) return;
  const _ = M._, X = _.EXT, PL = _.PL, K = _.K, {h, cap, f1, badge, img, sheet, bindLinks, uid} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const st = () => _.st(), save = () => _.save();

  /* ---------------------------------------------------------------- images */
  const IM = {pt_soleil:"magie/img/pt_soleil.webp", pt_saturne5:"magie/img/pt_saturne5.webp", pt_mars6:"magie/img/pt_mars6.webp", pt_carre:"magie/img/pt_carre.webp",
    pt_jeudi:"magie/img/pt_jeudi.webp", pt_dimanche:"magie/img/pt_dimanche.webp", pt_jupiter:"magie/img/pt_jupiter.webp", pt_amulette:"magie/img/pt_amulette.webp"};
  const CR = {
    pt_soleil:"Le premier pentacle du Soleil, « le visage de Shaddaï », Clavicule italienne et latine, vers 1775. Wellcome Collection, CC BY 4.0.",
    pt_saturne5:"Le cinquième pentacle de Saturne. La légende dit en italien : « Celui-ci défend qui invoque les esprits de Saturne la nuit, et chasse les gardiens des trésors. » Clavicule, vers 1775. Wellcome Collection, CC BY 4.0.",
    pt_mars6:"Le sixième pentacle de Mars. Autour, le verset latin « que leur épée entre dans leur propre cœur » ; dessous : « Si tu en es armé, tu ne seras pas blessé au combat. » Clavicule, vers 1775. Wellcome Collection, CC BY 4.0.",
    pt_carre:"Un pentacle de Saturne : un carré de caractères dans un double cercle, à peine esquissé. Clavicule, vers 1775. Wellcome Collection, CC BY 4.0.",
    pt_jeudi:"Les pentacles du jeudi, sous Jupiter, et du vendredi, sous Vénus, avec leurs anges. <i>Les Clavicules de R. Salomon</i>, manuscrit français, 1796. Wellcome Collection, CC BY 4.0.",
    pt_dimanche:"Le pentacle du dimanche, sous le Soleil, et l'annonce du chapitre « dans lequel on trouvera les modèles des pentacles de chaque jour ». <i>Les Clavicules de R. Salomon</i>, 1796. Wellcome Collection, CC BY 4.0.",
    pt_jupiter:"Les caractères mystérieux de Jupiter et la composition de ses parfums. <i>Les Clavicules de R. Salomon</i>, 1796. Wellcome Collection, CC BY 4.0.",
    pt_amulette:"Amulette hébraïque pour la protection d'une femme nommée Bela, XVIIIe siècle : une grille de noms divins, puis la prière. Wellcome Collection, CC BY 4.0."
  };
  if(window.MAGIE_IMG) Object.assign(window.MAGIE_IMG, IM);
  else { const t = setInterval(() => { if(window.MAGIE_IMG){ Object.assign(window.MAGIE_IMG, IM); clearInterval(t); } }, 400); setTimeout(() => clearInterval(t), 20000); }
  Object.assign(_.CRED, CR);
  const pic = (k, cls = "") => `<img class="${cls}" src="${IM[k]}" alt="${h(CR[k].replace(/<[^>]+>/g, "").split(".")[0])}" loading="lazy" decoding="async">`;

  /* ---------------------------------------------------------------- les 44 pentacles
     k : "esprits" (sert à invoquer ou commander des esprits), "soi" (protection, étude, prospérité de l'opérateur),
         "nature" (agir sur le temps qu'il fait, la terre), "autrui" (vise une autre personne : raconté, jamais dessiné) */
  const V = (ref, fr, heb) => ({ref, fr, heb});
  const PLAN = [
   {id:"saturne", nom:"Saturne", n:7, coul:"noir", metal:"le plomb", hex:"#2a241e"},
   {id:"jupiter", nom:"Jupiter", n:7, coul:"bleu", metal:"l'étain", hex:"#2f4f8f"},
   {id:"mars", nom:"Mars", n:7, coul:"rouge", metal:"le fer", hex:"#a3301f"},
   {id:"soleil", nom:"le Soleil", n:7, coul:"jaune ou or", metal:"l'or", hex:"#b8892a"},
   {id:"venus", nom:"Vénus", n:5, coul:"vert", metal:"le cuivre", hex:"#3d7a55"},
   {id:"mercure", nom:"Mercure", n:5, coul:"couleurs mêlées", metal:"les métaux mêlés", hex:"#c0661f"},
   {id:"lune", nom:"la Lune", n:6, coul:"argent", metal:"l'argent", hex:"#6f7895"}
  ];
  const P = {
   saturne:[
    {k:"esprits", but:"Frapper les esprits de terreur : à sa vue, ils s'agenouillent et obéissent.", v:V("Psaume 72, 9", "Les nomades plieront le genou devant lui, et ses ennemis lécheront la poussière."), noms:"YHVH, Adonaï, Yiai, Eheieh, aux quatre côtés d'un carré"},
    {k:"soi", but:"Contre les adversités ; il rabat aussi l'orgueil des esprits.", v:V("Psaume 72, 8", "Il dominera d'une mer à l'autre, et du fleuve jusqu'aux extrémités de la terre.", "וירד מים עד ים ומנהר עד אפסי ארץ"), noms:"le carré SATOR : vingt-cinq lettres qui se lisent dans tous les sens", dessin:"sator",
     note:"Le carré SATOR est bien plus vieux que la Clavicule : on l'a trouvé gravé sur des murs de Pompéi, ensevelie en 79. Mathers remarquait que la valeur de ses lettres, ajoutée à celle du nom Elohim, retombe sur un compte rond."},
    {k:"esprits", but:"À tracer dans le cercle, pour invoquer de nuit les esprits de la nature de Saturne."},
    {k:"autrui", but:"Le grimoire lui prête les opérations de ruine, de destruction et de mort."},
    {k:"esprits", but:"Défend ceux qui invoquent les esprits de Saturne la nuit, et chasse les esprits gardiens des trésors.", v:V("Deutéronome 10, 17", "Un Dieu grand, puissant et terrible."), noms:"YHVH en croix, Eloah, et les anges Arehanah, Rakhaniel, Roelhaipha, Noaphiel", image:"pt_saturne5"},
    {k:"autrui", but:"Celui contre qui on le prononce serait obsédé par les démons."},
    {k:"nature", but:"Exciter les tremblements de terre : chaque ordre d'anges qu'il invoque suffirait, dit le texte, à faire trembler l'univers."}],
   jupiter:[
    {k:"esprits", but:"Invoquer les esprits de Jupiter, surtout Parasiel, que le texte dit seigneur des trésors.", noms:"Netoniel, Devachiah, Tzedeqiah, Parasiel"},
    {k:"soi", but:"Obtenir gloire, honneurs, dignités et richesses ; découvrir les trésors.", v:V("Psaume 112, 3", "Gloire et richesse sont dans sa maison, et sa justice demeure à jamais."), noms:"Eheieh au centre, Ab et YHVH aux angles"},
    {k:"esprits", but:"Défend et protège ceux qui invoquent les esprits et les font venir.", v:V("Psaume 125, 1", "Ceux qui se confient en YHVH sont comme le mont Sion, qui ne chancelle pas.")},
    {k:"soi", but:"Acquérir richesses et honneur, et vivre dans l'abondance.", v:V("Psaume 112, 3", "Gloire et richesse sont dans sa maison, et sa justice demeure à jamais.", "הון ועשר בביתו וצדקתו עמדת לעד"), noms:"Yah, et les anges Adoniel et Bariel", dessin:"nom", centre:["יה","אדניאל","בריאל"]},
    {k:"soi", but:"Grande puissance : il donne des visions sûres.", v:V("Ézéchiel 1, 1", "J'étais parmi les captifs, près du fleuve Kebar : les cieux s'ouvrirent, et je vis des visions de Dieu.")},
    {k:"soi", but:"Protection contre tous les dangers de la terre.", v:V("Psaume 22, 17", "Ils ont percé mes mains et mes pieds."), noms:"Séraph, Kéroub, Ariel, Tharsis : les anges des quatre éléments"},
    {k:"soi", but:"Grande puissance contre la pauvreté ; il chasse aussi les gardiens des trésors.", v:V("Psaume 113, 7", "Il relève le pauvre de la poussière, il retire l'indigent du fumier.", "מקימי מעפר דל מאשפת ירים אביון"), noms:"des caractères mystérieux de Jupiter", dessin:"kamea"}],
   mars:[
    {k:"esprits", but:"Invoquer les esprits de la nature de Mars, surtout ceux qui y sont écrits.", noms:"Madimiel, Bartzachiah, Eschiel, Ithuriel"},
    {k:"soi", but:"Le texte lui promet un grand succès contre toutes les maladies, posé sur la partie souffrante.", v:V("Jean 1, 4", "En lui était la vie, et la vie était la lumière des hommes."), noms:"YHVH, Yeheshuah, Elohim, et la lettre Hé au centre", note:"Une précision qui va de soi : un pentacle n'a jamais soigné personne. Il disait l'espoir du malade."},
    {k:"autrui", but:"Exciter la guerre, la colère, la discorde et l'hostilité."},
    {k:"autrui", but:"De grande vertu et de grande puissance à la guerre."},
    {k:"soi", but:"Terrible aux démons : à sa vue, ils n'osent plus résister. Au centre, un scorpion.", v:V("Psaume 91, 13", "Tu marcheras sur le lion et sur la vipère, tu fouleras le lionceau et le dragon.", "על שחל ופתן תדרך תרמס כפיר ותנין"), noms:"HVL, autour du scorpion", dessin:"glyphe"},
    {k:"soi", but:"Protection au combat : qui le porte ne sera pas blessé, et les armes de l'adversaire se retourneront contre lui.", v:V("Psaume 37, 15", "Leur épée entrera dans leur propre cœur, et leurs arcs seront brisés."), noms:"Elohim, écrit dans l'alphabet dit « des anges »", image:"pt_mars6"},
    {k:"nature", but:"Écrit au sang de chauve-souris, il ferait venir les démons avec la grêle et la tempête."}],
   soleil:[
    {k:"soi", but:"« Le visage de Shaddaï le Tout-Puissant », à l'aspect duquel toute créature obéit.", v:V("Ecce faciem eius", "Voici son visage."), noms:"El Shaddaï, et la tête de l'ange Métatron", image:"pt_soleil"},
    {k:"esprits", but:"Rabattre l'orgueil et l'arrogance des esprits solaires.", noms:"Shemeshiel, Paimoniah, Rekhodiah, Malkhiel"},
    {k:"autrui", but:"Acquérir royaume et empire, et renommée ; il servirait aussi à infliger des pertes.", v:V("Daniel 4, 31", "Son règne est un règne éternel.")},
    {k:"esprits", but:"Faire voir les esprits qui restent invisibles.", v:V("Psaume 13, 4", "Illumine mes yeux, de peur que je ne m'endorme dans la mort.")},
    {k:"esprits", but:"Invoquer les esprits qui transportent un homme au loin, en un instant.", v:V("Psaume 91, 11", "Il ordonnera à ses anges de te garder dans toutes tes voies.")},
    {k:"nature", but:"L'invisibilité, s'il est bien fait.", v:V("Psaume 69, 24", "Que leurs yeux s'obscurcissent, et qu'ils ne voient plus.")},
    {k:"soi", but:"Gravé dans l'or, il délivrerait celui qui est retenu dans les fers.", v:V("Psaume 116, 16", "Je suis ton serviteur, le fils de ta servante : tu as délié mes liens.", "אני עבדך בן אמתך פתחת למוסרי"), noms:"Chasan, Arel, Phorlakh, Taliahad, anges de l'air, du feu, de la terre et de l'eau", dessin:"elements"}],
   venus:[
    {k:"esprits", but:"Commander aux esprits de Vénus, surtout ceux qui y sont écrits.", noms:"Nogahiel, Acheliah, Socodiah, Nangariel"},
    {k:"soi", but:"Obtenir grâce et honneur, et mener à bien ce qui relève de Vénus.", v:V("Cantique des cantiques 8, 6", "Mets-moi comme un sceau sur ton cœur, comme un sceau sur ton bras.", "שימני כחותם על לבך כחותם על זרועך"), noms:"des noms d'esprits autour d'un pentagramme", dessin:"pentagramme"},
    {k:"autrui", but:"Attirer l'amour d'une personne, par la seule vue du pentacle."},
    {k:"autrui", but:"Contraindre une personne à venir."},
    {k:"autrui", but:"Exciter merveilleusement à l'amour celui ou celle à qui on le montre."}],
   mercure:[
    {k:"esprits", but:"Invoquer les esprits qui sont « sous le firmament ».", noms:"Yekahel, Agiel"},
    {k:"esprits", but:"Accomplir des choses contraires à l'ordre de la nature ; les esprits y répondent vite, mais se laissent mal voir.", noms:"Boël et d'autres esprits"},
    {k:"esprits", but:"Invoquer les esprits soumis à Mercure.", noms:"Kokaviel, Ghedoriah, Savaniah, Chokmahiel"},
    {k:"soi", but:"Acquérir la connaissance de toutes les choses créées, et en pénétrer les secrets.", noms:"El au centre, et la phrase « YHVH, fixe le volatil »"},
    {k:"soi", but:"Commander aux esprits de Mercure, et ouvrir toute porte, de quelque manière qu'elle soit fermée.", v:V("Psaume 24, 7", "Portes, élevez vos linteaux ; élevez-vous, portails éternels, et que le roi de gloire entre.", "שאו שערים ראשיכם והנשאו פתחי עולם ויבוא מלך הכבוד"), noms:"El Ab, YHVH", dessin:"porte"}],
   lune:[
    {k:"esprits", but:"Appeler les esprits de la Lune ; il sert aussi à ouvrir les portes.", v:V("Psaume 107, 16", "Car il a brisé les portes d'airain, il a rompu les verrous de fer.", "כי שבר דלתות נחשת ובריחי ברזל גדע"), noms:"YHVA au centre, Schioel, Vaol, Yashiel, Vehiel", dessin:"porte"},
    {k:"soi", but:"Protège des périls des eaux, et apaise les tempêtes.", v:V("Psaume 56, 12", "En Elohim je me confie, je ne crains rien : que peut me faire un homme ?", "באלהים בטחתי לא אירא מה יעשה אדם לי"), noms:"El, et l'ange Abariel désigné par une main", dessin:"nom", centre:["אל","אבריאל"]},
    {k:"soi", but:"Porté en voyage, il protège des attaques de la nuit et des dangers de l'eau.", v:V("Psaume 40, 14", "Daigne me délivrer, YHVH ; YHVH, hâte-toi de me secourir.", "רצה יהוה להצילני יהוה לעזרתי חושה"), noms:"Aub, Vevaphel", dessin:"kamea"},
    {k:"soi", but:"Défend de tous les maléfices et de tout mal du corps et de l'âme ; son ange donne la connaissance des herbes et des pierres.", noms:"Eheieh Asher Eheieh, « Je serai ce que je serai », et les anges Yahel et Sophiel"},
    {k:"autrui", but:"Obtenir des réponses en songe, mais aussi vaincre ses ennemis et faire venir les âmes des morts."},
    {k:"nature", but:"Gravé sur argent et posé sous l'eau, il ferait venir de fortes pluies.", v:V("Genèse 7, 11", "Toutes les sources du grand abîme jaillirent, et les écluses des cieux s'ouvrirent.")}]
  };
  const ORD = ["Premier","Deuxième","Troisième","Quatrième","Cinquième","Sixième","Septième"];
  const KIND = {soi:["Pour soi","protection, étude, prospérité"], esprits:["Pour les esprits","invoquer, se protéger en invoquant"], nature:["Sur la nature","pluie, séisme, invisibilité"], autrui:["Vise autrui","raconté, jamais dessiné ici"]};

  /* noms divins des planètes (sephiroth de la Golden Dawn) */
  const NDIV = {saturne:["יהוה אלהים","YHVH Elohim"], jupiter:["אל","El"], mars:["אלהים גבור","Elohim Gibor"], soleil:["יהוה אלוה ודעת","YHVH Eloah va-Daath"], venus:["יהוה צבאות","YHVH Tzabaoth"], mercure:["אלהים צבאות","Elohim Tzabaoth"], lune:["שדי אל חי","Shaddaï El Chaï"]};

  /* ---------------------------------------------------------------- dessin d'un pentacle */
  let pid = 0;
  const star = (n, R, r, rot = -90) => Array.from({length:n*2}, (_x, i) => { const a = (rot + i*180/n)*Math.PI/180, rr = i % 2 ? r : R; return `${f1(rr*Math.cos(a))},${f1(rr*Math.sin(a))}`; }).join(" ");
  const pentagram = R => { const p = Array.from({length:5}, (_x, i) => { const a = (-90 + i*144)*Math.PI/180; return [R*Math.cos(a), R*Math.sin(a)]; }); return `M${p.map(q => f1(q[0]) + " " + f1(q[1])).join(" L")} Z`; };
  const hexagram = R => { const t = o => Array.from({length:3}, (_x, i) => { const a = (o + i*120)*Math.PI/180; return `${f1(R*Math.cos(a))},${f1(R*Math.sin(a))}`; }).join(" "); return `<polygon points="${t(-90)}"/><polygon points="${t(90)}"/>`; };
  function centre(o, col){
    const t = o.dessin;
    if(t === "sator"){ const W = ["SATOR","AREPO","TENET","OPERA","ROTAS"], c = 19;
      return `<g class="pt-sator"><rect x="-49" y="-49" width="98" height="98"/>${W.map((w, i) => [...w].map((l, j) => `<text x="${f1(-38 + j*c)}" y="${f1(-37 + i*c)}">${l}</text>`).join("")).join("")}
        ${[1,2,3,4].map(i => `<line x1="${f1(-47.5 + i*c)}" y1="-47.5" x2="${f1(-47.5 + i*c)}" y2="47.5"/><line x1="-47.5" y1="${f1(-47.5 + i*c)}" x2="47.5" y2="${f1(-47.5 + i*c)}"/>`).join("")}</g>`; }
    if(t === "kamea" && o.pl && K && _.D.KAMEAS[o.pl]){ const sv = _.kameaSVG(o.pl, {cls:"pt-k"}).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
      return `<g transform="translate(-45 -45) scale(.3)" class="pt-kg">${sv}</g>`; }
    if(t === "pentagramme") return `<path d="${pentagram(52)}" class="pt-fig"/><circle r="11" class="pt-fig"/><text y="4" class="pt-heb sm">${(NDIV[o.pl] || NDIV.venus)[0].split(" ")[0]}</text>`;
    if(t === "hexagramme") return `<g class="pt-fig">${hexagram(54)}</g><text y="4" class="pt-heb sm">${(NDIV[o.pl] || NDIV.soleil)[0].split(" ")[0]}</text>`;
    if(t === "porte") return `<path d="M-26 48 V-14 A26 26 0 0 1 26 -14 V48 Z" class="pt-fig"/><path d="M-26 48 H26 M0 -40 V48 M-26 4 H26" class="pt-fig thin"/><circle cx="12" cy="18" r="2.6" class="pt-dot"/>`;
    if(t === "elements") return `<path d="M0 -56 V56 M-56 0 H56" class="pt-fig thin"/><circle r="15" class="pt-fig"/><circle r="3" class="pt-dot"/>${[0,1,2,3].map(i => { const a = [-135,-45,45,135][i]*Math.PI/180, x = 36*Math.cos(a), y = 36*Math.sin(a), up = i % 2 === 0, bar = i > 1;
      const d = up ? `M${f1(x)} ${f1(y - 9)} L${f1(x + 9)} ${f1(y + 7)} L${f1(x - 9)} ${f1(y + 7)} Z` : `M${f1(x)} ${f1(y + 9)} L${f1(x + 9)} ${f1(y - 7)} L${f1(x - 9)} ${f1(y - 7)} Z`;
      return `<path d="${d}${bar ? ` M${f1(x - 6)} ${f1(y)} H${f1(x + 6)}` : ""}" class="pt-fig"/>`; }).join("")}`;
    if(t === "glyphe") return `<circle r="30" class="pt-fig"/><text y="14" class="pt-gl">${(PL[o.pl] || {}).gl || ""}</text>`;
    if(t === "sigil" && o.sigil) return o.sigil.replace(/^<svg /, '<svg x="-54" y="-54" width="108" height="108" ');
    if(t === "nom"){ const C = o.centre || [(NDIV[o.pl] || NDIV.soleil)[0]];
      return `<g class="pt-noms">${C.map((w, i) => `<text y="${f1((i - (C.length - 1)/2)*22 + 6)}" class="pt-heb${i ? " sm" : ""}">${w}</text>`).join("")}</g><g class="pt-fig thin">${hexagram(56)}</g>`; }
    return `<text y="14" class="pt-gl">${(PL[o.pl] || {}).gl || "✶"}</text>`;
  }
  function pentSVG(o){
    const id = "ptp" + (++pid), col = o.col || "#2a241e", latin = !/[\u0590-\u05ff]/.test(o.ring || "");
    let ring = o.ring || ""; if(ring){ const one = ring; while(ring.length < (latin ? 44 : 50)) ring += (latin ? "  ·  " : "  ✶  ") + one; ring += latin ? "  ·  " : "  ✶  "; }
    return `<svg class="pt-svg${o.anim ? " anim" : ""}" viewBox="-110 -110 220 220" role="img" aria-label="${h(o.label || "Pentacle")}" style="--pc:${col}">
      <defs><path id="${id}" d="M-86 0 A86 86 0 1 1 86 0 A86 86 0 1 1 -86 0"/></defs>
      <circle r="104" class="pt-disc"/><circle r="104" class="pt-c1"/><circle r="98" class="pt-c2"/><circle r="75" class="pt-c2"/><circle r="70" class="pt-c3"/>
      <g class="pt-ring"><text class="pt-rt${latin ? " lat" : ""}" ${latin ? "" : 'lang="he"'}><textPath href="#${id}" textLength="532" lengthAdjust="spacing">${h(ring)}</textPath></text></g>
      <g class="pt-ctr">${centre(o, col)}</g></svg>`;
  }
  const P_ATTR = (pl, i) => { const x = P[pl][i]; return {pl, col:PLAN.find(p => p.id === pl).hex, ring:x.v ? (x.v.heb || x.v.fr.toUpperCase()) : "", dessin:x.dessin, centre:x.centre, label:`${ORD[i]} pentacle de ${PLAN.find(p => p.id === pl).nom}`}; };

  /* ---------------------------------------------------------------- la fiche d'un pentacle */
  function pentSheet(pl, i){
    const p = PLAN.find(q => q.id === pl), x = P[pl][i], kd = KIND[x.k];
    const vis = x.image ? `<figure class="pt-sh-fig">${pic(x.image)}<figcaption>${CR[x.image]}</figcaption></figure>`
      : x.dessin ? `<figure class="pt-sh-fig dr">${pentSVG(Object.assign(P_ATTR(pl, i), {anim:true}))}<figcaption>Reconstruction simplifiée par Arcanes : la couronne porte le verset donné par le manuscrit, le centre est un schéma, pas le dessin d'origine.</figcaption></figure>` : "";
    sheet(`<p class="eyebrow">Clé de Salomon · livre I, chapitre XVIII</p><h2>${ORD[i]} pentacle de ${p.nom}</h2>
      <p class="pt-kind k-${x.k}"><b>${kd[0]}</b> · ${kd[1]}</p>${vis}
      <p class="m-lede">${x.but}</p>
      ${x.k === "autrui" ? `<p class="pt-garde">Ce pentacle est cité pour l'histoire. Arcanes ne le dessine pas et ne propose rien qui agisse sur une autre personne.</p>` : ""}
      <dl class="m-corr">${x.v ? `<div><dt>Verset</dt><dd>${x.v.ref}${x.v.heb ? `<br><span lang="he" dir="rtl" class="pt-hebl">${x.v.heb}</span>` : ""}<br><i>« ${x.v.fr} »</i></dd></div>` : `<div><dt>Verset</dt><dd>Aucun</dd></div>`}
        ${x.noms ? `<div><dt>Noms et figures</dt><dd>${cap(x.noms)}</dd></div>` : ""}
        <div><dt>Couleur, métal</dt><dd>${cap(p.coul)}, ${p.metal}</dd></div><div><dt>Rang</dt><dd>${i + 1} sur ${p.n}</dd></div></dl>
      ${x.note ? `<p>${x.note}</p>` : ""}
      <p class="help m-left">Buts paraphrasés d'après l'édition de S. L. MacGregor Mathers (1889). Les manuscrits ne s'accordent ni sur l'ordre, ni sur les versets, ni sur les noms.</p>`);
  }

  /* ---------------------------------------------------------------- le catalogue */
  function catalogue(host, o = {}){
    let pl = o.pl || "saturne", filt = "";
    const draw = () => { const p = PLAN.find(q => q.id === pl);
      host.innerHTML = `<div class="pt-tabs" role="tablist" aria-label="Les sept planètes">${PLAN.map(q => `<button type="button" role="tab" aria-selected="${q.id === pl}" data-ptpl="${q.id}" style="--pc:${q.hex}"><span>${(PL[q.id] || {}).gl || ""}</span>${q.nom.replace(/^l[ea] /, "")}<small>${P[q.id].filter(x => x.k === "soi").length}</small></button>`).join("")}</div>
        <p class="pt-head" style="--pc:${p.hex}"><b>${P[pl].filter(x => x.k === "soi").length} pentacles pour soi de ${p.nom}</b> · ${p.coul} · ${p.metal}</p>
        <ol class="pt-list">${P[pl].map((x, i) => x.k !== "soi" ? "" : `<li><button type="button" class="pt-it k-${x.k}" data-pti="${i}" style="--pc:${p.hex}">
          <span class="pt-mini">${x.image ? pic(x.image) : x.dessin ? pentSVG(P_ATTR(pl, i)) : x.k === "autrui" ? `<i class="pt-veil" aria-hidden="true">—</i>` : `<i class="pt-num">${i + 1}</i>`}</span>
          <span class="pt-txt"><b>${ORD[i]}</b><span>${x.but}</span>${x.v ? `<small>${x.v.ref}</small>` : ""}</span></button></li>`).join("")}</ol>
        <figcaption>Seuls les pentacles tournés vers soi sont montrés : protection, étude, prospérité, voyage. Image du manuscrit ou reconstruction d'Arcanes.</figcaption>`;
      qa("[data-ptpl]", host).forEach(b => b.onclick = () => { pl = b.dataset.ptpl; draw(); });
      qa("[data-ptk]", host).forEach(b => b.onclick = () => { filt = filt === b.dataset.ptk ? "" : b.dataset.ptk; draw(); });
      qa("[data-pti]", host).forEach(b => b.onclick = () => pentSheet(pl, +b.dataset.pti)); };
    draw();
  }

  /* ---------------------------------------------------------------- l'anatomie */
  const PARTS = [
    ["c1", "Le double cercle", "La frontière. Rien de ce qui est tracé à l'intérieur ne doit en sortir. On le trace d'un seul geste, au compas ou à la plume, comme le cercle de protection du rituel, dont le pentacle est la miniature."],
    ["ring", "La couronne du verset", "Entre les deux cercles court un verset de la Bible en hébreu, le plus souvent un psaume. C'est lui qui « dit » ce que le pentacle doit faire : on choisit un passage où Dieu ouvre des portes pour ouvrir des portes, relève le pauvre pour sortir de la pauvreté. Le pentacle est une prière qu'on peut porter."],
    ["ctr", "La figure centrale", "Un carré de lettres, une étoile, des caractères, parfois un visage. C'est l'emblème du pentacle. Beaucoup viennent de la Kabbale (noms divins, lettres permutées), d'autres des carrés magiques d'Agrippa, d'autres encore d'alphabets inventés, dits « célestes » ou « des anges »."],
    ["noms", "Les noms divins et angéliques", "Dans le champ ou sur les rayons : les noms de Dieu (YHVH, Adonaï, Eheieh, El, Shaddaï) et ceux des anges de la planète. Pour le magicien de la Renaissance, le pentacle ne commande pas : il montre aux esprits l'autorité au nom de laquelle on parle."],
    ["disc", "La matière et la couleur", "Papier vierge, parchemin, ou le métal de la planète : plomb pour Saturne, étain pour Jupiter, fer pour Mars, or pour le Soleil, cuivre pour Vénus, argent pour la Lune. On écrit à l'encre ou dans la couleur de la planète, à la plume consacrée."]
  ];
  function anatomie(host){
    let k = 1;
    const draw = () => { host.innerHTML = `<div class="pt-anat"><div class="pt-anat-svg on-${PARTS[k][0]}">${pentSVG(Object.assign(P_ATTR("saturne", 1), {label:"Anatomie d'un pentacle : le deuxième de Saturne"}))}</div>
        <div class="pt-anat-t"><div class="pt-anat-b" role="group" aria-label="Les parties">${PARTS.map((p, i) => `<button type="button" class="chip small${i === k ? " on" : ""}" data-pta="${i}">${p[1]}</button>`).join("")}</div>
        <h3>${PARTS[k][1]}</h3><p>${PARTS[k][2]}</p></div></div>
        <figcaption>Le deuxième pentacle de Saturne, reconstruit : le carré SATOR et le Psaume 72, 8 en hébreu. Touche une partie.</figcaption>`;
      qa("[data-pta]", host).forEach(b => b.onclick = () => { k = +b.dataset.pta; draw(); }); };
    draw();
  }

  /* ---------------------------------------------------------------- les familles d'objets */
  function familles(host){
    const F = [
      ["Amulette", "Elle protège par ce qu'elle est ou par ce qui y est écrit : une pierre, une dent, un rouleau de prières. Le mot latin <i>amuletum</i> est déjà chez Pline.", "pt_amulette"],
      ["Talisman", "Il est fabriqué à un moment choisi pour retenir la force d'un astre. L'heure fait le talisman. Le mot vient de l'arabe <i>tilasm</i>, lui-même du grec <i>telesma</i>.", "pt_jupiter"],
      ["Pentacle", "Une figure tracée, couverte de noms divins et d'un verset, qu'on montre aux esprits ou qu'on porte sur soi. C'est le mot des grimoires de Salomon.", "pt_soleil"],
      ["Sceau", "La marque d'une autorité : le sceau de Salomon gravé sur son anneau, le sceau d'une planète tiré de son carré, la signature d'un esprit.", "pt_dimanche"]];
    host.innerHTML = `<div class="pt-fam">${F.map(f => `<article><div class="pt-fam-i">${pic(f[2])}</div><h3>${f[0]}</h3><p>${f[1]}</p></article>`).join("")}</div>
      <figcaption>Dans la pratique, les quatre se mêlent : beaucoup de pentacles de la Clavicule sont aussi des talismans, puisqu'il faut les faire au jour et à l'heure de leur planète.</figcaption>`;
    qa(".pt-fam img", host).forEach((im, i) => { im.style.cursor = "zoom-in"; im.onclick = () => window.ArcanesHistoire && ArcanesHistoire.zoom(im.src, CR[F[i][2]]); });
  }

  /* ---------------------------------------------------------------- le pentacle de terre de la Golden Dawn */
  function terre(host){
    host.innerHTML = `<div class="pt-terre"><svg viewBox="-110 -110 220 220" class="pt-svg anim" role="img" aria-label="Le pentacle de la Terre, à la manière de la Golden Dawn">
      <circle r="104" fill="#f3ede0" stroke="#1d1813" stroke-width="2"/>
      <path d="M0 0 L-73.5 -73.5 A104 104 0 0 1 73.5 -73.5 Z" fill="#c9b037"/><path d="M0 0 L73.5 -73.5 A104 104 0 0 1 73.5 73.5 Z" fill="#6b7a2e"/><path d="M0 0 L73.5 73.5 A104 104 0 0 1 -73.5 73.5 Z" fill="#1c1a17"/><path d="M0 0 L-73.5 73.5 A104 104 0 0 1 -73.5 -73.5 Z" fill="#8a4b2a"/>
      <circle r="78" fill="none" stroke="#f3ede0" stroke-width="2"/><g fill="none" stroke="#f6f1e2" stroke-width="5" stroke-linejoin="round" class="pt-hx">${hexagram(68)}</g>
      <circle r="24" fill="#1d1813" stroke="#f6f1e2" stroke-width="1.5"/><text y="7" class="pt-heb" fill="#f6f1e2" style="font-size:19px;fill:#f6f1e2">אדני</text></svg>
      <div><p>Dans la Golden Dawn, le pentacle n'est plus une médaille de grimoire : c'est l'<b>instrument de la Terre</b>, l'un des quatre outils élémentaires que l'adepte fabrique lui-même, avec la baguette du Feu, la coupe de l'Eau et la dague de l'Air.</p>
      <p>C'est un disque de bois. On le peint aux quatre couleurs de Malkuth, citrin, olive, roux et noir, on y trace un hexagramme et l'on y écrit des noms divins et des sceaux. Il sert à appeler la Terre dans le rituel, et il représente le corps, la stabilité, ce qui demeure.</p>
      <p>Le tarot en garde la trace. Les deniers du jeu de Marseille deviennent des <b>disques</b> dans les leçons de la Golden Dawn, des <b>pentacles</b> chez Waite et Pamela Colman Smith en 1909, et encore des disques chez Crowley.</p></div></div>
      <figcaption>Schéma d'après les descriptions publiées par Israel Regardie. Le nom central est Adonaï, « Seigneur », celui de Malkuth.</figcaption>`;
  }

  /* ---------------------------------------------------------------- l'atelier : composer son pentacle */
  const VERSETS = [
    ["Psaume 24, 7", "Portes, élevez vos linteaux.", "שאו שערים ראשיכם", "Ouvrir une voie"],
    ["Psaume 107, 16", "Il a brisé les portes d'airain.", "כי שבר דלתות נחשת", "Se défaire d'un blocage"],
    ["Psaume 56, 12", "En Elohim je me confie, je ne crains rien.", "באלהים בטחתי לא אירא", "Le courage"],
    ["Psaume 113, 7", "Il relève le pauvre de la poussière.", "מקימי מעפר דל", "Se relever"],
    ["Psaume 116, 16", "Tu as délié mes liens.", "פתחת למוסרי", "Se libérer d'une habitude"],
    ["Psaume 91, 11", "Il ordonnera à ses anges de te garder dans toutes tes voies.", "כי מלאכיו יצוה לך לשמרך בכל דרכיך", "Le voyage, la protection"],
    ["Cantique 8, 6", "Mets-moi comme un sceau sur ton cœur.", "שימני כחותם על לבך", "La fidélité à soi"],
    ["Psaume 13, 4", "Illumine mes yeux.", "האירה עיני", "L'étude, la lucidité"],
    ["Proverbes 3, 13", "Heureux l'homme qui a trouvé la sagesse.", "אשרי אדם מצא חכמה", "La sagesse"]
  ];
  const CENTRES = [["kamea","Le carré de la planète"],["pentagramme","Le pentagramme"],["hexagramme","L'hexagramme"],["nom","Le nom divin"],["glyphe","Le signe de la planète"],["sigil","Le sceau de ta devise"]];
  function atelier(host){
    const s = st(); let o = Object.assign({pl:"jupiter", ring:"v0", devise:"", ctr:"kamea"}, s.pentDraft || {});
    const draw = (anim) => {
      const p = PL[o.pl] || PL.jupiter, pp = PLAN.find(q => q.id === o.pl), vs = o.ring.startsWith("v") ? VERSETS[+o.ring.slice(1)] : null;
      const ring = vs ? vs[2] : (o.devise || "ce que je cultive").toUpperCase().slice(0, 64);
      let sig = "";
      if(o.ctr === "sigil"){ const L = _.spareLetters(o.devise || "je trouve le calme", true).keep; sig = _.sigilSVG(L.length ? L : ["C"], 1, {cercle:false}); }
      const svg = pentSVG({pl:o.pl, col:pp.hex, ring, dessin:o.ctr === "sigil" ? "sigil" : o.ctr, sigil:sig, anim, label:"Ton pentacle de " + pp.nom});
      host.innerHTML = `<div class="pt-at"><div class="pt-at-svg">${svg}</div><div class="pt-at-f">
        <p class="pt-at-i">Un pentacle d'Arcanes n'agit sur rien ni sur personne. C'est un <b>emblème</b> : tu y mets en forme ce que tu veux cultiver en toi, pour le regarder chaque jour.</p>
        <h3 class="pt-at-h"><span>1</span> La planète</h3><div class="pt-pls">${PLAN.map(q => `<button type="button" data-atp="${q.id}" aria-pressed="${q.id === o.pl}" style="--pc:${q.hex}"><b>${(PL[q.id] || {}).gl}</b><small>${q.nom.replace(/^l[ea] /, "")}</small></button>`).join("")}</div>
        <p class="help m-left">${cap(p.domaines)}. Couleur : ${pp.coul}. Métal : ${pp.metal}. Jour : le ${p.jour}. Nom divin : <span lang="he">${NDIV[o.pl][0]}</span>, ${NDIV[o.pl][1]}.</p>
        <h3 class="pt-at-h"><span>2</span> La couronne</h3>
        <label class="pt-sel">Un verset<select data-atv>${VERSETS.map((v, i) => `<option value="v${i}"${o.ring === "v" + i ? " selected" : ""}>${v[3]} · ${v[0]}</option>`).join("")}<option value="d"${o.ring === "d" ? " selected" : ""}>Ma propre devise, en français</option></select></label>
        ${vs ? `<p class="pt-vs"><span lang="he" dir="rtl">${vs[2]}</span> « ${vs[1]} »</p>` : `<label class="pt-sel">Ta devise<input type="text" maxlength="60" data-atd value="${h(o.devise)}" placeholder="Par exemple : je tiens ma parole"></label>`}
        <h3 class="pt-at-h"><span>3</span> Le centre</h3><div class="m-chips">${CENTRES.map(c => `<button type="button" class="chip small${o.ctr === c[0] ? " on" : ""}" data-atc="${c[0]}">${c[1]}</button>`).join("")}</div>
        ${o.ctr === "sigil" ? `<p class="help m-left">Le sceau est tiré des lettres de ta devise, à la manière d'Austin Spare : on garde les consonnes, une fois chacune.${o.ring !== "d" ? " Écris une devise pour qu'il change." : ""}</p>` : ""}
        <div class="m-acts start"><button type="button" class="btn small" data-atsave>Garder dans le carnet</button><button type="button" class="btn ghost small" data-atdl>Télécharger l'image</button></div>
        <p class="help m-left">La Clavicule demande de tracer les pentacles un jour et à une heure de Mercure, la Lune croissante, dans une pièce propre. Rien ne t'y oblige : la seule règle d'Arcanes, c'est de le faire avec attention.</p></div></div>`;
      const keep = () => { s.pentDraft = o; save(); };
      qa("[data-atp]", host).forEach(b => b.onclick = () => { o.pl = b.dataset.atp; keep(); draw(true); });
      qa("[data-atc]", host).forEach(b => b.onclick = () => { o.ctr = b.dataset.atc; keep(); draw(true); });
      q1("[data-atv]", host).onchange = e => { o.ring = e.target.value; keep(); draw(true); };
      const d = q1("[data-atd]", host); if(d) d.oninput = e => { o.devise = e.target.value; keep(); const pos = e.target.selectionStart; draw(false); const n = q1("[data-atd]", host); n.focus(); try{ n.setSelectionRange(pos, pos); }catch(e2){} };
      q1("[data-atsave]", host).onclick = e => { const S = st(); S.carnet.unshift({id:uid(), t:Date.now(), type:"pentacle", titre:"Mon pentacle de " + pp.nom, intention:vs ? vs[3] : o.devise,
          texte:`Planète : ${pp.nom} (${p.jour}, ${pp.coul}, ${pp.metal}).\nCouronne : ${vs ? vs[0] + " — « " + vs[1] + " »" : "« " + o.devise + " »"}.\nCentre : ${CENTRES.find(c => c[0] === o.ctr)[1].toLowerCase()}.\nCe que je veux cultiver : `}); save();
        e.target.textContent = "Gardé dans le carnet ✓"; e.target.disabled = true; };
      q1("[data-atdl]", host).onclick = () => { const el = q1(".pt-at-svg svg", host).cloneNode(true); el.classList.remove("anim"); el.setAttribute("xmlns", "http://www.w3.org/2000/svg"); el.setAttribute("width", "800"); el.setAttribute("height", "800");
        const css = `.pt-disc{fill:#f6efe0}.pt-c1{fill:none;stroke:${pp.hex};stroke-width:2.4}.pt-c2{fill:none;stroke:${pp.hex};stroke-width:1.1}.pt-c3{fill:none;stroke:${pp.hex};stroke-width:.6;stroke-dasharray:1.5 2.5}.pt-rt{font:500 13px 'Frank Ruhl Libre',serif;fill:${pp.hex}}.pt-rt.lat{font:600 10.5px Georgia,serif;letter-spacing:.2em}.pt-fig,.pt-sator rect,.pt-sator line{fill:none;stroke:${pp.hex};stroke-width:1.8}.pt-fig.thin{stroke-width:.9}.pt-heb{font:500 22px serif;fill:${pp.hex};text-anchor:middle}.pt-heb.sm{font-size:14px}.pt-gl{font:48px serif;fill:${pp.hex};text-anchor:middle}.pt-sator text{font:600 13px Georgia,serif;fill:${pp.hex};text-anchor:middle;dominant-baseline:central}.m-k-frame,.m-k-cell{fill:none;stroke:${pp.hex};stroke-width:2}.m-k-num{font:600 18px Georgia,serif;fill:${pp.hex};text-anchor:middle;dominant-baseline:central}.pt-el{font:16px serif;fill:${pp.hex};text-anchor:middle}`;
        el.insertAdjacentHTML("afterbegin", `<style>${css}</style>`);
        const blob = new Blob([el.outerHTML], {type:"image/svg+xml"}), a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "mon-pentacle.svg"; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); };
    };
    draw(true);
  }

  /* ---------------------------------------------------------------- l'instrument complet */
  function cabinet(root){
    let tab = "composer";
    const draw = () => {
      root.innerHTML = `<div class="sc-seg m-seg" role="group" aria-label="Le cabinet"><button type="button" data-ptt="composer" aria-pressed="${tab === "composer"}">Composer le tien</button><button type="button" data-ptt="cat" aria-pressed="${tab === "cat"}">Les 44 de Salomon</button><button type="button" data-ptt="anat" aria-pressed="${tab === "anat"}">Anatomie</button></div><div class="pt-host"></div>`;
      const H = q1(".pt-host", root);
      if(tab === "composer") atelier(H); else if(tab === "cat") catalogue(H); else anatomie(H);
      qa("[data-ptt]", root).forEach(b => b.onclick = () => { tab = b.dataset.ptt; draw(); });
    };
    draw();
  }
  X.tools.push(["pentacles", "Le cabinet des pentacles", "Les 44 pentacles de Salomon, et le tien", "pentacles"]);
  X.toolRender.pentacles = {t:"Le cabinet des pentacles", sous:"Compose ton propre pentacle, emblème de ce que tu cultives, ou parcours les quarante-quatre de la Clé de Salomon, planète par planète.", render:cabinet};
  X.toolIcon.pentacles = `<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" class="f"/><circle cx="30" cy="30" r="20" class="f"/><path d="${pentagram(15).replace(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g, (m, a, _b, c) => `${f1(+a + 30)} ${f1(+c + 30)}`)}" class="s"/><circle cx="30" cy="30" r="3" class="dd"/></svg>`;

  /* ---------------------------------------------------------------- schémas des leçons */
  Object.assign(_.schemas, {
    pentfam: familles,
    pentanat: anatomie,
    pentcat: fig => catalogue(fig),
    pentterre: terre,
    pentcompose: fig => { fig.innerHTML = `<div class="pt-host"></div>`; atelier(q1(".pt-host", fig)); }
  });

  /* ---------------------------------------------------------------- le module XV */
  const MOD = { id:"m15", n:"XV", cercle:2, t:"Les pentacles", sous:"Les médailles de Salomon, du grimoire à l'atelier", img:"pt_soleil",
   lecons:[
    { id:"m15l1", t:"Amulette, talisman, pentacle, sceau", sous:"Quatre mots, une très vieille histoire",
      idee:[
       "Depuis qu'on écrit, on porte sur soi des écritures. Les Égyptiens glissaient des formules dans de petits étuis pendus au cou ; les Grecs gravaient des pierres fines de noms étranges, comme <i>Abrasax</i> ; les communautés juives et musulmanes ont copié pendant des siècles des grilles de noms divins pour protéger une maison, une mère, un enfant. Le pentacle est l'héritier de tout cela.",
       "Le mot apparaît dans les grimoires de la fin du Moyen Âge. Son origine est discutée : peut-être le grec <i>pente</i>, « cinq », par confusion avec le pentagramme, peut-être un mot ancien désignant ce qui pend au cou. Dans la <b>Clé de Salomon</b>, il désigne n'importe quelle médaille tracée de noms et de figures, à cinq branches ou non. Il faut donc distinguer le <b>pentacle</b>, la médaille, du <b>pentagramme</b>, l'étoile à cinq branches.",
       "La légende qui les porte est celle de Salomon. Un récit grec des premiers siècles, le <i>Testament de Salomon</i>, raconte que l'archange Michel apporta au roi un anneau gravé d'un sceau, grâce auquel il soumit les démons et les fit bâtir le Temple. Le « sceau de Salomon » est devenu une étoile, tantôt à cinq, tantôt à six branches. Toute la tradition des pentacles se présente comme l'héritage de cet anneau.",
       "Dans la Clavicule, le pentacle a deux usages. Le magicien le montre aux esprits pendant le rituel, comme un ambassadeur montre ses lettres de créance : au nom de qui je parle. Ou bien il le porte sur lui, pour obtenir l'effet promis : protection, savoir, richesse, faveur."],
      source:{txt:"Les pentacles sont faits pour frapper de terreur les esprits et les réduire à l'obéissance ; ils servent aussi contre tous les périls de la terre, de l'air, de l'eau et du feu.", ref:"Clé de Salomon, livre I, chapitre XVIII, d'après l'édition de Mathers, 1889", st:"doc"},
      schema:"pentfam",
      ex:{t:"Ce que tu portes déjà", txt:"Regarde ce que tu portes sur toi : une médaille, une bague, un bracelet offert, une photo dans un portefeuille. Lequel est une amulette, lequel un souvenir, lequel les deux ?"},
      carnet:"Un objet que je porte et ce qu'il représente pour moi :",
      marge:[{t:"Le carré SATOR", txt:"Gravé sur un mur de Pompéi avant 79, il est devenu le deuxième pentacle de Saturne quinze siècles plus tard."},
             {t:"Voir aussi", txt:"Les clavicules, au chapitre VI de l'Histoire.", go:"hist:h6"}] },
    { id:"m15l2", t:"Anatomie d'un pentacle", sous:"Cercle, verset, noms, figure, matière",
      idee:[
       "Presque tous les pentacles de la Clavicule ont la même structure. Un <b>double cercle</b> fait la frontière. Entre les deux cercles court un <b>verset</b> de la Bible en hébreu, qui dit ce que le pentacle doit accomplir. Au centre se tient une <b>figure</b> : un carré de lettres, une étoile, des caractères inventés, parfois un visage. Dans le champ, des <b>noms</b> : ceux de Dieu, et ceux des anges de la planète.",
       "Le choix du verset est le cœur de l'affaire. Pour ouvrir les portes, le Psaume 24 : « Portes, élevez vos linteaux. » Contre la pauvreté, le Psaume 113 : « Il relève le pauvre de la poussière. » Pour la délivrance, le Psaume 116 : « Tu as délié mes liens. » Le pentacle est une prière qu'on porte, et sa logique est celle de l'analogie : ce que Dieu a fait dans le verset, on le lui demande à nouveau.",
       "La fabrication est réglée. Le texte demande de les tracer un jour et à une heure de <b>Mercure</b>, la Lune croissante, dans une chambre propre, par temps clair, sur du papier vierge ou dans le métal de la planète, avec une plume et des couleurs consacrées. Les couleurs principales sont l'or, le vermillon et l'azur. On les enveloppe ensuite de soie, on les passe dans la fumée de l'encens en récitant des psaumes, et on les garde à l'abri.",
       "Chaque planète a sa couleur : noir pour Saturne, bleu pour Jupiter, rouge pour Mars, jaune pour le Soleil, vert pour Vénus, couleurs mêlées pour Mercure, argent pour la Lune. On reconnaît là les correspondances du module II : le pentacle est un talisman écrit."],
      source:{txt:"Saturne gouverne le plomb ; Jupiter l'étain ; Mars le fer ; le Soleil l'or ; Vénus le cuivre ; Mercure le mélange des métaux ; et la Lune l'argent.", ref:"Clé de Salomon, livre I, chapitre XVIII, éd. Mathers, 1889", st:"doc"},
      schema:"pentanat",
      ex:{t:"Lire un pentacle", txt:"Dans le schéma, touche chaque partie du deuxième pentacle de Saturne. Puis ouvre le cabinet et regarde le cinquième pentacle de Saturne, dans un manuscrit italien : retrouves-tu les mêmes parties ?", outil:"outil:pentacles"},
      carnet:"Le verset ou la phrase que j'aimerais voir courir autour d'un cercle :",
      marge:[{t:"Les couleurs", txt:"Les manuscrits disent l'or, le cinabre ou vermillon, et l'azur céleste."},
             {t:"Voir aussi", txt:"Les correspondances des planètes.", go:"outil:toile"}] },
    { id:"m15l3", t:"Les quarante-quatre pentacles de Salomon", sous:"Sept planètes, et ceux qui sont pour soi",
      idee:[
       "L'édition de la Clé de Salomon publiée par Samuel Liddell MacGregor Mathers en 1889, à partir de manuscrits du British Museum, compte <b>quarante-quatre pentacles</b> : sept pour Saturne, Jupiter, Mars et le Soleil, cinq pour Vénus et Mercure, six pour la Lune. Les manuscrits plus anciens n'en ont pas tous autant : l'un n'en donne que treize, un autre aucun. Le chiffre de quarante-quatre est donc celui de Mathers, qui a fait école.",
       "Leurs buts sont de quatre sortes. Beaucoup servent à <b>invoquer ou commander des esprits</b>. D'autres prétendent agir sur la nature, ou sur une autre personne. Une partie seulement est tournée vers <b>l'opérateur lui-même</b> : protection en voyage, contre les eaux, contre la pauvreté, pour l'étude ou le savoir.",
       "Arcanes ne montre que ces derniers, les pentacles <b>pour soi</b>. Ce n'est pas qu'on croie les autres efficaces : c'est qu'une intention de commander, de nuire ou de contraindre n'a pas sa place dans une pratique qui se veut un travail sur soi.",
       "Regarde aussi ce que ces buts disent de leurs utilisateurs. Des trésors cachés gardés par des esprits, des chaînes dont on voudrait se libérer, des voyages dangereux, la peur de la pauvreté et des procès : le grimoire est un miroir des angoisses d'un petit clerc des XVIe et XVIIe siècles."],
      source:{txt:"Sept pentacles consacrés à Saturne, en noir ; sept à Jupiter, en bleu ; sept à Mars, en rouge ; sept au Soleil, en jaune ; cinq à Vénus, en vert ; cinq à Mercure, en couleurs mêlées ; six à la Lune, en argent.", ref:"Clé de Salomon, « l'ordre des pentacles », éd. Mathers, 1889", st:"doc"},
      schema:"pentcat",
      ex:{t:"Trier les pentacles", txt:"Dans le catalogue, parcours les pentacles planète par planète. Lequel répond le mieux à une inquiétude que tu as en ce moment ? Lis son verset à voix haute.", outil:"outil:pentacles"},
      carnet:"Le pentacle « pour soi » qui me parle, et pourquoi :",
      marge:[{t:"Mathers", txt:"Il travaillait au British Museum pendant que naissait la Golden Dawn. Sa Clé de Salomon reste l'édition de référence."},
             {t:"Un garde-fou", txt:"Arcanes ne montre que les pentacles tournés vers soi."}] },
    { id:"m15l4", t:"Le pentacle aujourd'hui", sous:"De Lévi au tarot, et le tien",
      idee:[
       "Au XIXe siècle, <b>Éliphas Lévi</b> fait du pentagramme le symbole même de la magie : l'étoile pointe en haut figure l'esprit qui gouverne les quatre éléments ; pointe en bas, la matière qui l'emporte. La confusion entre pentacle et pentagramme, déjà ancienne, devient la règle.",
       "La <b>Golden Dawn</b> transforme le pentacle en outil. L'adepte fabrique lui-même quatre instruments : la baguette du Feu, la coupe de l'Eau, la dague de l'Air et le pentacle de la Terre, un disque de bois peint aux quatre couleurs de Malkuth. Le pentacle représente désormais le corps et ce qui demeure. En 1909, le tarot Waite-Smith renomme la couleur des deniers : ce sont les <b>Pentacles</b>.",
       "Les magiciens d'aujourd'hui fabriquent volontiers leur pentacle personnel. Arcanes te propose de le faire dans le même esprit que le reste du cours : non comme une arme, mais comme un <b>emblème</b>. Tu choisis la planète qui gouverne ce que tu veux cultiver, un verset ou ta propre devise pour la couronne, une figure pour le centre. Puis tu le regardes, chaque jour, le temps d'une respiration.",
       "Ce qu'il fait, c'est ce que fait toute image qu'on choisit avec soin et qu'on garde sous les yeux : il rappelle une intention. Les psychologues parleraient d'amorçage, les anciens de sympathie. Arcanes ne promet rien de plus, et c'est déjà quelque chose."],
      source:{txt:"Le pentagramme exprime la domination de l'esprit sur les éléments.", ref:"Éliphas Lévi, Dogme et rituel de la haute magie, 1856, chapitre V", st:"doc"},
      schema:"pentterre",
      ex:{t:"Composer ton pentacle", txt:"Ouvre le cabinet des pentacles et compose le tien : une planète, une couronne, un centre. Garde-le dans le carnet, puis dessine-le à la main, au compas, un jour de la planète choisie.", outil:"outil:pentacles"},
      carnet:"Ce que mon pentacle doit me rappeler chaque jour :",
      marge:[{t:"Tarot", txt:"Deniers à Marseille, disques dans la Golden Dawn et chez Crowley, pentacles chez Waite."},
             {t:"Voir aussi", txt:"Le pentagramme dans le rituel du module VI.", go:"lec:m6l1"}] }
   ],
   quiz:[
    {q:"Combien de pentacles compte la Clé de Salomon éditée par Mathers ?", r:["Quarante-quatre","Soixante-douze","Vingt-deux","Sept"], ok:0, exp:"Sept pour Saturne, Jupiter, Mars et le Soleil, cinq pour Vénus et Mercure, six pour la Lune."},
    {q:"Qu'est-ce qui court entre les deux cercles d'un pentacle ?", r:["Un verset de la Bible en hébreu","Le nom de l'opérateur","Une date","Les douze signes"], ok:0, exp:"Le verset dit ce que le pentacle doit accomplir."},
    {q:"Quel carré de lettres, trouvé à Pompéi, devient un pentacle de Saturne ?", r:["SATOR AREPO","ABRACADABRA","AGLA","INRI"], ok:0, exp:"Le deuxième pentacle de Saturne."},
    {q:"Quel métal pour un pentacle de Jupiter ?", r:["L'étain","Le plomb","Le fer","Le cuivre"], ok:0, exp:"Plomb pour Saturne, fer pour Mars, cuivre pour Vénus."},
    {q:"Dans la Golden Dawn, que représente le pentacle ?", r:["L'élément Terre","L'élément Feu","La Lune","L'esprit"], ok:0, exp:"C'est l'un des quatre instruments élémentaires."}
   ]};
  const ETOF = {
   m15l1:{acc:"Une médaille couverte de lettres hébraïques, qu'on montre aux esprits : avant d'être un symbole de séries télévisées, le pentacle était un objet précis, avec ses règles.",
     conf:[["Un pentacle est une étoile à cinq branches.","C'est un pentagramme. Le pentacle est une médaille gravée ou tracée, qui peut porter une étoile à cinq ou six branches, ou aucune."],
           ["La Clé de Salomon date du roi Salomon.","Ses plus anciens manuscrits datent du XVe siècle. L'attribution est une signature de prestige."]],
     ret:["Amulette : protège par elle-même. Talisman : tient sa force de l'heure.","Pentacle : médaille de noms divins et de versets.","Le Testament de Salomon : l'anneau qui soumet les démons."]},
   m15l2:{acc:"Un pentacle se lit comme une phrase : une frontière, une prière, une figure, des noms, une matière.",
     conf:[["Les signes d'un pentacle sont secrets et intraduisibles.","La plupart sont des noms divins et des versets hébreux parfaitement lisibles. Seuls les « caractères » viennent d'alphabets inventés."]],
     ret:["Double cercle, verset, figure, noms, matière.","Le verset dit le but, par analogie.","Jour et heure de Mercure, Lune croissante, papier vierge ou métal de la planète."]},
   m15l3:{acc:"Quarante-quatre médailles, et autant de fenêtres sur les peurs et les espoirs de ceux qui les traçaient.",
     conf:[["Tous les manuscrits ont les mêmes pentacles.","Le nombre, l'ordre, les versets et les noms varient beaucoup. L'un n'en a que treize, un autre aucun."]],
     ret:["7 + 7 + 7 + 7 + 5 + 5 + 6 = 44.","Quatre usages : esprits, soi, nature, autrui.","Arcanes ne montre que ceux qui sont pour soi."]},
   m15l4:{acc:"Le pentacle a changé de nature trois fois : médaille de grimoire, outil de la Terre, couleur du tarot.",
     conf:[["Le pentagramme est un signe satanique.","Pour Lévi et la Golden Dawn, l'étoile pointe en haut dit l'esprit qui gouverne la matière. L'usage satanique de l'étoile renversée date surtout du XXe siècle."]],
     ret:["Lévi : le pentagramme, esprit et éléments.","Golden Dawn : le pentacle, instrument de la Terre.","Waite, 1909 : les deniers deviennent les Pentacles."]}
  };
  if(!K.MODULES.find(m => m.id === "m15")) K.MODULES.push(MOD);
  Object.assign(window.MAGIE_ETOFFE = window.MAGIE_ETOFFE || {}, ETOF);
  window.MAGIE_PENT = {P, PLAN, pentSVG, pentSheet, VERSETS, NDIV, centre, pentagram, hexagram, star, pic, IM, CR, catalogue, anatomie, terre, familles, ORD};
})();
