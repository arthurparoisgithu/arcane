/* ===== Arcanes · Magie : les données =====
   Les sept planètes et leurs correspondances, les quatre éléments, les carrés d'Agrippa,
   l'Arbre de vie de la Golden Dawn et ses 22 sentiers, les rituels guidés.
   Les correspondances varient d'un auteur à l'autre : on suit d'abord Agrippa (1533) et la Golden Dawn (1888),
   et pour les plantes et parfums on a gardé des choix courants et sans danger. */
const MAGIE_DATA = (() => {
  const T = "︎";

  /* ---------- les sept planètes, dans l'ordre chaldéen ---------- */
  const PLANETES = [
    {id:"saturne", nom:"Saturne", gl:"♄", jour:"samedi", wd:6, metal:"le plomb", couleur:"le noir, le gris de plomb", hex:"#4a4553",
      pierre:"l'onyx, le jais", plantes:"le cyprès, la prêle", parfum:"la myrrhe",
      nombre:3, ange:"Cassiel", sephira:3, lettre:"ת", lettreNom:"Tav", lame:{id:"monde", n:"XXI", nom:"Le Monde"},
      domaines:"la durée, les fondations, la patience, la mémoire, la terre qu'on cultive, la vieillesse, le deuil et la fin des choses",
      ombre:"la mélancolie, la rigidité, la peur",
      verbe:"tenir", mot:"Ce qui dure.",
      contemple:"Le gris du plomb, la pierre froide, le temps long. Laisse venir ce qui, dans ta vie, demande de la patience plutôt que de l'effort."},
    {id:"jupiter", nom:"Jupiter", gl:"♃", jour:"jeudi", wd:4, metal:"l'étain", couleur:"le bleu profond, le pourpre", hex:"#2f4f8f",
      pierre:"le saphir, le lapis-lazuli", plantes:"le chêne, la sauge, l'hysope", parfum:"le cèdre",
      nombre:4, ange:"Sachiel", sephira:4, lettre:"כ", lettreNom:"Kaph", lame:{id:"roue", n:"X", nom:"La Roue de Fortune"},
      domaines:"l'honneur, la justice, la prospérité, la protection, la foi, la générosité et la confiance",
      ombre:"l'excès, l'orgueil, la complaisance",
      verbe:"élargir", mot:"Ce qui grandit.",
      contemple:"Le bleu d'un ciel d'été, un chêne large. Pense à ce que tu pourrais donner sans rien attendre, et à qui t'a donné ainsi."},
    {id:"mars", nom:"Mars", gl:"♂", jour:"mardi", wd:2, metal:"le fer", couleur:"le rouge", hex:"#a3301f",
      pierre:"le rubis, l'hématite", plantes:"l'ortie, le basilic, le gingembre", parfum:"le sang-dragon (une résine)",
      nombre:5, ange:"Samaël", sephira:5, lettre:"פ", lettreNom:"Peh", lame:{id:"maisondieu", n:"XVI", nom:"La Tour"},
      domaines:"le courage, la force, la décision, le tranchant, l'effort physique et le combat",
      ombre:"la colère, la précipitation, la violence",
      verbe:"trancher", mot:"Ce qui ose.",
      contemple:"Le rouge du fer chauffé. Repère une décision que tu repousses : qu'est-ce qui te manque pour la prendre ?"},
    {id:"soleil", nom:"Soleil", gl:"☉", jour:"dimanche", wd:0, metal:"l'or", couleur:"l'or, le jaune", hex:"#b98618",
      pierre:"la topaze, l'ambre", plantes:"le laurier, le romarin, le tournesol", parfum:"l'oliban (l'encens)",
      nombre:6, ange:"Michaël", sephira:6, lettre:"ר", lettreNom:"Resh", lame:{id:"soleil", n:"XIX", nom:"Le Soleil"},
      domaines:"l'autorité, la gloire, la vitalité et la santé, la faveur des puissants, la clarté et le cœur",
      ombre:"la vanité, l'aveuglement",
      verbe:"rayonner", mot:"Ce qui éclaire.",
      contemple:"Une lumière dorée au centre de la poitrine, qui s'élargit à chaque inspiration. Qu'est-ce qui, aujourd'hui, te rend vivant ?"},
    {id:"venus", nom:"Vénus", gl:"♀", jour:"vendredi", wd:5, metal:"le cuivre", couleur:"le vert émeraude", hex:"#3d7a55",
      pierre:"l'émeraude", plantes:"la rose, le myrte, la verveine", parfum:"la rose, le benjoin",
      nombre:7, ange:"Anaël", sephira:7, lettre:"ד", lettreNom:"Daleth", lame:{id:"imperatrice", n:"III", nom:"L'Impératrice"},
      domaines:"l'amour, l'amitié, la beauté, les arts, le plaisir et la réconciliation",
      ombre:"la paresse, la dépendance, la jalousie",
      verbe:"unir", mot:"Ce qui attire.",
      contemple:"Le vert d'un jardin après la pluie, le parfum d'une rose. Pense à un lien que tu aimerais réparer ou nourrir."},
    {id:"mercure", nom:"Mercure", gl:"☿", jour:"mercredi", wd:3, metal:"le vif-argent (qu'on ne manipule jamais : il est toxique)", couleur:"l'orange, les couleurs changeantes", hex:"#c0661f",
      pierre:"l'agate", plantes:"la lavande, le fenouil, la menthe", parfum:"le mastic, la lavande",
      nombre:8, ange:"Raphaël", sephira:8, lettre:"ב", lettreNom:"Beth", lame:{id:"bateleur", n:"I", nom:"Le Bateleur"},
      domaines:"la parole, l'écriture, le commerce, les sciences, les petits voyages, l'habileté et la ruse",
      ombre:"la tromperie, la dispersion, le bavardage",
      verbe:"relier", mot:"Ce qui passe.",
      contemple:"Un éclat orange qui va et vient, rapide. Quelle phrase as-tu besoin de dire, ou d'écrire, et à qui ?"},
    {id:"lune", nom:"Lune", gl:"☽", jour:"lundi", wd:1, metal:"l'argent", couleur:"le blanc, l'argent", hex:"#7e86a0",
      pierre:"la perle, la pierre de lune", plantes:"le saule, le jasmin, le lys", parfum:"le jasmin",
      nombre:9, ange:"Gabriel", sephira:9, lettre:"ג", lettreNom:"Gimel", lame:{id:"papesse", n:"II", nom:"La Papesse"},
      domaines:"le rêve, les eaux, les voyages, la fécondité, la foule et tout ce qui change",
      ombre:"l'inconstance, l'illusion",
      verbe:"refléter", mot:"Ce qui change.",
      contemple:"Une eau calme où se reflète un disque d'argent. Laisse remonter un rêve récent, ou une image qui revient souvent."}
  ];
  const PL = Object.fromEntries(PLANETES.map(p => [p.id, p]));
  const CHALD = ["saturne","jupiter","mars","soleil","venus","mercure","lune"];
  const WEEK = ["soleil","lune","mars","mercure","jupiter","venus","saturne"];   // dimanche → samedi

  /* ---------- les quatre éléments, tels que la Golden Dawn les place autour du cercle ---------- */
  const ELEMENTS = [
    {id:"air", nom:"Air", dir:"Est", angle:0, archange:"Raphaël", outil:"la dague", suite:"les Épées", signes:"Gémeaux, Balance, Verseau",
      couleur:"le jaune", hex:"#c9a227", qual:"chaud et humide", humeur:"le sang : le tempérament sanguin", lettre:"א", lettreNom:"Aleph", tri:"△ barré",
      sens:"la pensée, le souffle, la parole, le discernement"},
    {id:"feu", nom:"Feu", dir:"Sud", angle:90, archange:"Michaël", outil:"la baguette", suite:"les Bâtons", signes:"Bélier, Lion, Sagittaire",
      couleur:"le rouge", hex:"#b5361f", qual:"chaud et sec", humeur:"la bile jaune : le tempérament colérique", lettre:"ש", lettreNom:"Shin",
      sens:"la volonté, l'élan, le désir, la transformation"},
    {id:"eau", nom:"Eau", dir:"Ouest", angle:180, archange:"Gabriel", outil:"la coupe", suite:"les Coupes", signes:"Cancer, Scorpion, Poissons",
      couleur:"le bleu", hex:"#2b5fa0", qual:"froid et humide", humeur:"le flegme : le tempérament flegmatique", lettre:"מ", lettreNom:"Mem",
      sens:"l'émotion, l'intuition, le lien, la mémoire"},
    {id:"terre", nom:"Terre", dir:"Nord", angle:270, archange:"Auriel", outil:"le pentacle", suite:"les Deniers", signes:"Taureau, Vierge, Capricorne",
      couleur:"le vert sombre, le noir", hex:"#4f6b3a", qual:"froid et sec", humeur:"la bile noire : le tempérament mélancolique", lettre:"ת", lettreNom:"Tav (partagée avec Saturne)",
      sens:"le corps, la matière, la stabilité, ce qui se construit"}
  ];

  /* ---------- les carrés magiques d'Agrippa (De occulta philosophia, livre II, chap. 22), vérifiés ---------- */
  const KAMEAS = {
    saturne:[[4,9,2],[3,5,7],[8,1,6]],
    jupiter:[[4,14,15,1],[9,7,6,12],[5,11,10,8],[16,2,3,13]],
    mars:[[11,24,7,20,3],[4,12,25,8,16],[17,5,13,21,9],[10,18,1,14,22],[23,6,19,2,15]],
    soleil:[[6,32,3,34,35,1],[7,11,27,28,8,30],[19,14,16,15,23,24],[18,20,22,21,17,13],[25,29,10,9,26,12],[36,5,33,4,2,31]],
    venus:[[22,47,16,41,10,35,4],[5,23,48,17,42,11,29],[30,6,24,49,18,36,12],[13,31,7,25,43,19,37],[38,14,32,1,26,44,20],[21,39,8,33,2,27,45],[46,15,40,9,34,3,28]],
    mercure:[[8,58,59,5,4,62,63,1],[49,15,14,52,53,11,10,56],[41,23,22,44,45,19,18,48],[32,34,35,29,28,38,39,25],[40,26,27,37,36,30,31,33],[17,47,46,20,21,43,42,24],[9,55,54,12,13,51,50,16],[64,2,3,61,60,6,7,57]],
    lune:[[37,78,29,70,21,62,13,54,5],[6,38,79,30,71,22,63,14,46],[47,7,39,80,31,72,23,55,15],[16,48,8,40,81,32,64,24,56],[57,17,49,9,41,73,33,65,25],[26,58,18,50,1,42,74,34,66],[67,27,59,10,51,2,43,75,35],[36,68,19,60,11,52,3,44,76],[77,28,69,20,61,12,53,4,45]]
  };

  /* ---------- l'Arbre de vie (disposition de la Golden Dawn) ---------- */
  const SEPHIROTH = [
    {n:1, nom:"Kether", heb:"כתר", sens:"la Couronne", x:150, y:42, pilier:"milieu", nomDivin:"Eheieh (« Je serai »)", archange:"Metatron", sphere:"le Premier Mobile, le premier tourbillon", hex:"#f6f1e2", txt:"#2a241c",
      dit:"Le point d'où tout procède, avant toute forme. On ne peut rien en dire, sinon qu'il est."},
    {n:2, nom:"Chokmah", heb:"חכמה", sens:"la Sagesse", x:250, y:98, pilier:"droite", nomDivin:"Yah", archange:"Ratziel", sphere:"le Zodiaque", hex:"#8d8a86", txt:"#fff",
      dit:"La première force, l'élan pur qui jaillit de la Couronne. Le pôle actif, encore sans forme."},
    {n:3, nom:"Binah", heb:"בינה", sens:"l'Intelligence", x:50, y:98, pilier:"gauche", nomDivin:"YHVH Elohim", archange:"Tzaphkiel", sphere:"Saturne", hex:"#1f1b19", txt:"#f3ead6", planete:"saturne",
      dit:"La grande Mère qui reçoit l'élan et lui donne une forme. Comprendre, c'est limiter, et donc rendre possible."},
    {n:4, nom:"Chesed", heb:"חסד", sens:"la Miséricorde", x:250, y:212, pilier:"droite", nomDivin:"El", archange:"Tzadkiel", sphere:"Jupiter", hex:"#2f4f8f", txt:"#fff", planete:"jupiter",
      dit:"La générosité, l'ordre bienveillant qui organise et protège. Le roi juste sur son trône."},
    {n:5, nom:"Geburah", heb:"גבורה", sens:"la Rigueur", x:50, y:212, pilier:"gauche", nomDivin:"Elohim Gibor", archange:"Khamael", sphere:"Mars", hex:"#a3301f", txt:"#fff", planete:"mars",
      dit:"La force qui tranche et retranche. Sans elle, la Miséricorde déborde ; avec elle seule, tout se durcit."},
    {n:6, nom:"Tiphareth", heb:"תפארת", sens:"la Beauté", x:150, y:270, pilier:"milieu", nomDivin:"YHVH Eloah ve-Daath", archange:"Raphaël", sphere:"le Soleil", hex:"#d4a53a", txt:"#2a1d08", planete:"soleil",
      dit:"Le cœur de l'Arbre, l'équilibre entre Miséricorde et Rigueur. Tous les sentiers y passent ou presque."},
    {n:7, nom:"Netzach", heb:"נצח", sens:"la Victoire", x:250, y:370, pilier:"droite", nomDivin:"YHVH Tzabaoth", archange:"Haniel", sphere:"Vénus", hex:"#3d7a55", txt:"#fff", planete:"venus",
      dit:"Le désir, les émotions, les arts, la nature. L'énergie qui persévère."},
    {n:8, nom:"Hod", heb:"הוד", sens:"la Gloire", x:50, y:370, pilier:"gauche", nomDivin:"Elohim Tzabaoth", archange:"Michaël", sphere:"Mercure", hex:"#c0661f", txt:"#fff", planete:"mercure",
      dit:"L'intellect, le langage, les formes et les noms. C'est la sphère propre de la magie cérémonielle."},
    {n:9, nom:"Yesod", heb:"יסוד", sens:"le Fondement", x:150, y:430, pilier:"milieu", nomDivin:"Shaddai El Chai", archange:"Gabriel", sphere:"la Lune", hex:"#6b4f8a", txt:"#fff", planete:"lune",
      dit:"Le monde des images, des rêves et de l'imagination, qui donne forme à ce qui va naître dans la matière."},
    {n:10, nom:"Malkuth", heb:"מלכות", sens:"le Royaume", x:150, y:500, pilier:"milieu", nomDivin:"Adonai ha-Aretz", archange:"Sandalphon", sphere:"la Terre et les quatre éléments", hex:"quart", txt:"#fff",
      dit:"Le monde tel qu'on le touche. Le point d'arrivée de la descente, et le point de départ de toute remontée."}
  ];
  const PATHS = [
    [11,1,2,"א","Aleph","le bœuf","l'Air","mat","0","Le Mat"],
    [12,1,3,"ב","Beth","la maison","Mercure","bateleur","I","Le Bateleur"],
    [13,1,6,"ג","Gimel","le chameau","la Lune","papesse","II","La Papesse"],
    [14,2,3,"ד","Daleth","la porte","Vénus","imperatrice","III","L'Impératrice"],
    [15,2,6,"ה","Heh","la fenêtre","le Bélier","empereur","IV","L'Empereur"],
    [16,2,4,"ו","Vav","le clou","le Taureau","pape","V","Le Pape"],
    [17,3,6,"ז","Zayin","l'épée","les Gémeaux","amoureux","VI","L'Amoureux"],
    [18,3,5,"ח","Cheth","l'enclos","le Cancer","chariot","VII","Le Chariot"],
    [19,4,5,"ט","Teth","le serpent","le Lion","force","VIII","La Force"],
    [20,4,6,"י","Yod","la main","la Vierge","ermite","IX","L'Ermite"],
    [21,4,7,"כ","Kaph","la paume","Jupiter","roue","X","La Roue de Fortune"],
    [22,5,6,"ל","Lamed","l'aiguillon","la Balance","justice","XI","La Justice"],
    [23,5,8,"מ","Mem","l'eau","l'Eau","pendu","XII","Le Pendu"],
    [24,6,7,"נ","Nun","le poisson","le Scorpion","sansnom","XIII","La Mort"],
    [25,6,9,"ס","Samekh","l'appui","le Sagittaire","temperance","XIV","Tempérance"],
    [26,6,8,"ע","Ayin","l'œil","le Capricorne","diable","XV","Le Diable"],
    [27,7,8,"פ","Peh","la bouche","Mars","maisondieu","XVI","La Tour"],
    [28,7,9,"צ","Tzaddi","l'hameçon","le Verseau","etoile","XVII","L'Étoile"],
    [29,7,10,"ק","Qoph","la nuque","les Poissons","lune","XVIII","La Lune"],
    [30,8,9,"ר","Resh","la tête","le Soleil","soleil","XIX","Le Soleil"],
    [31,8,10,"ש","Shin","la dent","le Feu","jugement","XX","Le Jugement"],
    [32,9,10,"ת","Tav","la marque","Saturne et la Terre","monde","XXI","Le Monde"]
  ].map(([n, a, b, heb, lettre, sens, attr, lame, num, lameNom]) => ({n, a, b, heb, lettre, sens, attr, lame, num, lameNom,
    type: ["Aleph","Mem","Shin"].includes(lettre) ? "mère" : ["Beth","Gimel","Daleth","Kaph","Peh","Resh","Tav"].includes(lettre) ? "double" : "simple"}));

  /* ---------- les rituels guidés ----------
     chaque étape : titre, texte, dire (à prononcer ou vibrer), vis (l'image), duree (secondes, facultatif) */
  const RITUELS = {
    carre:{nom:"La respiration en carré", sous:"Quatre temps égaux, pour poser l'attention", duree:"3 minutes", niveau:"Pour commencer", statut:"Pratique moderne",
      intro:"Un exercice de base, venu des techniques de respiration et repris par la plupart des écoles : on inspire, on retient, on expire, on reste vide, chaque fois sur quatre temps. Il prépare à tout le reste.",
      souffle:true, cycles:8},
    lbrp:{nom:"Le Pentagramme mineur", sous:"Le rituel de bannissement de la Golden Dawn", duree:"8 à 10 minutes", niveau:"Module 6", statut:"Tradition",
      intro:"Enseigné aux nouveaux membres de la Golden Dawn à partir de 1888, publié par Israel Regardie en 1937-1940. On l'utilise pour « faire place nette » avant une pratique, ou seul, chaque jour, comme un exercice de concentration. Debout, face à l'est, avec assez d'espace pour tourner.",
      etapes:[
        {t:"Se poser", txt:"Debout, face à l'est. Respire lentement quelques fois. Imagine que tu grandis jusqu'à ce que ta tête touche le ciel et que tes pieds reposent sur la Terre, petite sous toi.", vis:"pose", d:30},
        {t:"La Croix kabbalistique · 1", txt:"Imagine une sphère de lumière blanche au-dessus de ta tête. Touche ton front et vibre :", dire:"Ateh", trad:"« À toi »", vis:"croix:0", d:12},
        {t:"La Croix kabbalistique · 2", txt:"Fais descendre un rayon de lumière jusqu'à tes pieds. Touche ta poitrine, en pointant vers le bas :", dire:"Malkuth", trad:"« le Royaume »", vis:"croix:1", d:12},
        {t:"La Croix kabbalistique · 3", txt:"Touche ton épaule droite, et imagine un rayon qui part vers la droite :", dire:"ve-Geburah", trad:"« et la Puissance »", vis:"croix:2", d:12},
        {t:"La Croix kabbalistique · 4", txt:"Touche ton épaule gauche ; le rayon traverse ta poitrine de part en part :", dire:"ve-Gedulah", trad:"« et la Gloire »", vis:"croix:3", d:12},
        {t:"La Croix kabbalistique · 5", txt:"Joins les mains sur la poitrine, au croisement des deux rayons :", dire:"le-Olam, Amen", trad:"« pour les siècles. Amen »", vis:"croix:4", d:14},
        {t:"À l'est", txt:"Bras tendu, trace dans l'air un grand pentagramme de bannissement : de ta hanche gauche jusqu'au-dessus de ta tête, puis vers ta hanche droite, ton épaule gauche, ton épaule droite, et retour à la hanche gauche. Imagine-le en flamme bleue. Pointe son centre et vibre :", dire:"YHVH", trad:"Yod-Heh-Vav-Heh, le Tétragramme", vis:"penta:0", d:25},
        {t:"Au sud", txt:"Le bras toujours tendu, tourne vers le sud en traçant un quart de cercle de lumière blanche. Trace le même pentagramme et vibre :", dire:"Adonaï", trad:"« Seigneur »", vis:"penta:1", d:25},
        {t:"À l'ouest", txt:"Continue le cercle jusqu'à l'ouest. Trace le pentagramme et vibre :", dire:"Eheieh", trad:"« Je serai »", vis:"penta:2", d:25},
        {t:"Au nord", txt:"Continue jusqu'au nord. Trace le pentagramme et vibre :", dire:"AGLA", trad:"Atah Gibor le-Olam Adonaï, « tu es puissant pour toujours, Seigneur »", vis:"penta:3", d:25},
        {t:"Fermer le cercle", txt:"Reviens à l'est en achevant le cercle. Tu es au centre d'un anneau de lumière blanche, marqué de quatre pentagrammes bleus.", vis:"cercle", d:15},
        {t:"Les archanges", txt:"Bras en croix, dis lentement, en imaginant chaque figure :", dire:"Devant moi Raphaël, derrière moi Gabriel, à ma droite Michaël, à ma gauche Auriel.", trad:"Raphaël en jaune, à l'est ; Gabriel en bleu, à l'ouest ; Michaël en rouge, au sud ; Auriel en vert sombre, au nord.", vis:"anges", d:30},
        {t:"L'étoile", txt:"Puis :", dire:"Autour de moi flamboient les pentagrammes, et dans la colonne brille l'étoile à six rayons.", vis:"etoile", d:20},
        {t:"La Croix, à nouveau", txt:"Refais la Croix kabbalistique : Ateh, Malkuth, ve-Geburah, ve-Gedulah, le-Olam, Amen.", vis:"croix:4", d:40},
        {t:"Revenir", txt:"Reste un moment immobile. Remarque ce qui a changé, ou non. Puis note-le dans ton carnet.", vis:"pose", d:30}
      ]},
    pilier:{nom:"Le Pilier du milieu", sous:"L'exercice d'Israel Regardie (1938)", duree:"10 minutes", niveau:"Module 6", statut:"Tradition",
      intro:"Israel Regardie l'a décrit dans The Middle Pillar (1938), en le rapprochant de la psychologie de Jung. On fait descendre la lumière le long du pilier central de l'Arbre de vie, en cinq centres, en vibrant à chaque fois un nom divin. Assis ou debout, le dos droit.",
      etapes:[
        {t:"Se poser", txt:"Assis ou debout, le dos droit, les yeux fermés. Quelques respirations lentes, la respiration en carré si tu la connais.", vis:"corps:-1", d:40},
        {t:"Kether, au-dessus de la tête", txt:"Imagine une sphère de lumière blanche, éclatante, juste au-dessus de ton crâne. À chaque expiration, vibre :", dire:"Eheieh", trad:"« Je serai »", vis:"corps:0", d:45},
        {t:"Daath, à la gorge", txt:"Fais descendre un rayon de lumière jusqu'à ta gorge, où s'allume une deuxième sphère, gris-violet. Vibre :", dire:"YHVH Elohim", vis:"corps:1", d:45},
        {t:"Tiphareth, au cœur", txt:"Le rayon descend jusqu'au milieu de la poitrine : une sphère dorée, chaude. Vibre :", dire:"YHVH Eloah ve-Daath", vis:"corps:2", d:45},
        {t:"Yesod, au bas-ventre", txt:"La lumière descend jusqu'au bassin : une sphère violette. Vibre :", dire:"Shaddai El Chai", vis:"corps:3", d:45},
        {t:"Malkuth, sous les pieds", txt:"Elle descend jusqu'au sol, sous tes pieds : une sphère aux couleurs de la terre. Vibre :", dire:"Adonai ha-Aretz", vis:"corps:4", d:45},
        {t:"Le pilier entier", txt:"Vois le pilier en entier : cinq sphères reliées par un rayon de lumière, du ciel à la terre, à travers toi.", vis:"corps:5", d:40},
        {t:"La circulation", txt:"En inspirant, fais remonter la lumière le long de ton dos jusqu'au sommet de la tête ; en expirant, laisse-la redescendre devant toi comme une fontaine qui t'enveloppe. Quelques cycles, sans forcer.", vis:"corps:6", d:60},
        {t:"Revenir", txt:"Laisse la lumière se poser. Bouge les doigts, ouvre les yeux. Note dans ton carnet ce que tu as ressenti, même si c'est « rien ».", vis:"corps:-1", d:30}
      ]},
    contemple:{nom:"La contemplation planétaire", sous:"Cinq minutes avec la planète de l'heure", duree:"5 minutes", niveau:"Module 3", statut:"Pratique moderne",
      intro:"Un exercice simple, dans l'esprit de Marsile Ficin qui conseillait de s'entourer des couleurs, des parfums et des musiques d'une planète pour en recevoir l'influence. On le fait ici avec la planète qui gouverne l'heure présente.", planet:true}
  };

  /* ---------- les grades de la Golden Dawn, pour marquer la progression ---------- */
  const GRADES = [
    {min:0, nom:"Néophyte", code:"0=0"},
    {min:2, nom:"Zelator", code:"1=10"},
    {min:4, nom:"Theoricus", code:"2=9"},
    {min:6, nom:"Practicus", code:"3=8"},
    {min:8, nom:"Philosophus", code:"4=7"}
  ];

  return {T, PLANETES, PL, CHALD, WEEK, ELEMENTS, KAMEAS, SEPHIROTH, PATHS, RITUELS, GRADES};
})();
