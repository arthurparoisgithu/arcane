/* ===== Arcanes · Alchimie : les données =====
   Métaux, couleurs de l'Œuvre, degrés du feu, opérations, éléments, signes, bestiaire, glossaire, histoire.
   Chaque affirmation porte une étiquette : doc (Documenté), trad (Tradition), mod (Lecture moderne), leg (Légende). */
window.ALCH_DATA = (() => {
  /* ---------- les signes, dessinés au trait dans une boîte de 100 × 100 ---------- */
  const G = {
    or:["M50 20a30 30 0 1 0 .01 0", "M50 46a4 4 0 1 0 .01 0"],
    argent:["M64 16A35 35 0 1 0 64 84A27 27 0 1 1 64 16"],
    mercure:["M35 18A15 15 0 0 0 65 18", "M50 33a15 15 0 1 0 .01 0", "M50 63V92", "M37 79H63"],
    cuivre:["M50 14a19 19 0 1 0 .01 0", "M50 52V90", "M35 72H65"],
    fer:["M40 42a19 19 0 1 0 .01 0", "M54 47L80 20", "M61 20H80V39"],
    etain:["M28 32C28 16 52 16 52 34C52 50 34 60 24 68H76", "M63 40V90"],
    plomb:["M38 10V62", "M25 25H52", "M38 46C45 33 67 34 67 52C67 66 56 70 56 80C56 87 63 91 70 86"],
    feu:["M50 14L86 80H14Z"],
    air:["M50 14L86 80H14Z", "M26 54H74"],
    eau:["M14 20H86L50 86Z"],
    terre:["M14 20H86L50 86Z", "M26 46H74"],
    soufre:["M50 12L77 58H23Z", "M50 58V92", "M36 76H64"],
    sel:["M50 20a30 30 0 1 0 .01 0", "M20 50H80"],
    antimoine:["M50 42a22 22 0 1 0 .01 0", "M50 42V8", "M36 22H64"],
    quint:["M50 14L59 40L86 40L64 56L72 84L50 67L28 84L36 56L14 40L41 40Z"],
    vitriol:["M50 34a26 26 0 1 0 .01 0", "M50 34V8", "M38 18H62", "M24 60H76"]
  };

  /* ---------- les sept métaux, du plus « vil » au plus « noble » ---------- */
  const METAUX = [
    {id:"plomb", nom:"Le plomb", pl:"saturne", planete:"Saturne", jour:"samedi", wd:6, sym:"Pb", lat:"plumbum", fus:"327 °C", hex:"#7d8791",
     mot:"Le poids, la lenteur, le commencement.",
     trad:"Le plus lourd et le plus terne des sept. Les alchimistes en font le point de départ : la matière brute, « malade », que l'art doit guérir. Saturne, la planète la plus lente connue alors, lui donne sa lenteur.",
     chim:"Mou, dense, fond à basse température. Il est toxique : l'intoxication au plomb s'appelle encore le saturnisme, du nom de sa planète.",
     geste:"Regarder ce qui pèse, sans chercher à l'alléger tout de suite."},
    {id:"etain", nom:"L'étain", pl:"jupiter", planete:"Jupiter", jour:"jeudi", wd:4, sym:"Sn", lat:"stannum", fus:"232 °C", hex:"#b9c1c9",
     mot:"La souplesse, l'alliance, la largeur.",
     trad:"Métal clair et docile, donné à Jupiter, la planète de l'abondance. On le voit comme un plomb déjà blanchi, à mi-chemin de l'argent.",
     chim:"Il fond très tôt et s'allie facilement : mêlé au cuivre, il donne le bronze. Une barre d'étain pur que l'on plie émet un petit crissement, le « cri de l'étain ».",
     geste:"Chercher l'alliance utile : avec qui, avec quoi ce projet devient-il plus solide ?"},
    {id:"fer", nom:"Le fer", pl:"mars", planete:"Mars", jour:"mardi", wd:2, sym:"Fe", lat:"ferrum", fus:"1 538 °C", hex:"#a5553c",
     mot:"La force, l'outil, la rouille.",
     trad:"Le métal des armes et des outils, donné à Mars. Dur mais vulnérable : il rouille. Les textes y voient une force qui s'use si on ne l'entretient pas.",
     chim:"Le plus difficile des sept à fondre. Sa rouille rouge (un oxyde) a fourni des pigments depuis la préhistoire. Mars, la planète, doit d'ailleurs sa couleur à des oxydes de fer.",
     geste:"Faire aujourd'hui la chose qui demande du courage, et la finir."},
    {id:"cuivre", nom:"Le cuivre", pl:"venus", planete:"Vénus", jour:"vendredi", wd:5, sym:"Cu", lat:"cuprum", fus:"1 085 °C", hex:"#c5733f",
     mot:"La beauté, le lien, le vert-de-gris.",
     trad:"Métal rouge et chaleureux, donné à Vénus. Sa patine verte fascine : le rouge qui devient vert, puis redevient rouge au feu.",
     chim:"Son nom latin, cuprum, vient de Chypre, l'île d'Aphrodite, où les Anciens l'extrayaient. Excellent conducteur. À l'air humide il se couvre de vert-de-gris.",
     geste:"Soigner un lien : un message, une attention, un objet que tu rends beau."},
    {id:"mercure", nom:"Le mercure", pl:"mercure", planete:"Mercure", jour:"mercredi", wd:3, sym:"Hg", lat:"hydrargyrum", fus:"−39 °C", hex:"#c9d3da",
     mot:"Le passage, le mélange, l'insaisissable.",
     trad:"Le vif-argent : un métal qui coule. Ni solide ni vraiment liquide, il devient pour les alchimistes le principe même du changement, et le messager entre les contraires.",
     chim:"Le seul métal liquide à température ambiante. Il dissout l'or et l'argent (on appelle cela un amalgame). Ses vapeurs sont très toxiques : on ne le manipule pas chez soi.",
     geste:"Relier deux idées, deux personnes ou deux mondes qui ne se parlaient pas."},
    {id:"argent", nom:"L'argent", pl:"lune", planete:"la Lune", jour:"lundi", wd:1, sym:"Ag", lat:"argentum", fus:"962 °C", hex:"#dfe5ea",
     mot:"Le reflet, la clarté, l'écoute.",
     trad:"Le métal blanc, presque parfait, donné à la Lune. Dans les images, c'est la reine. L'œuvre « au blanc » est censée pouvoir changer les métaux en argent.",
     chim:"Le métal qui réfléchit le mieux la lumière : on en a fait les miroirs. Il noircit à l'air (c'est du sulfure d'argent), mais ne rouille pas.",
     geste:"Écouter avant de répondre. Noter ce que la journée reflète de toi."},
    {id:"or", nom:"L'or", pl:"soleil", planete:"le Soleil", jour:"dimanche", wd:0, sym:"Au", lat:"aurum", fus:"1 064 °C", hex:"#e2b23c",
     mot:"L'accompli, l'inaltérable, le centre.",
     trad:"Le métal parfait, donné au Soleil. Dans les images, c'est le roi. Pour les alchimistes, tous les métaux tendent vers lui : la nature met des siècles, l'art veut aller plus vite.",
     chim:"Il ne s'oxyde pas et ne ternit pas. Seul un mélange de deux acides le dissout : on l'a nommé « eau régale », l'eau royale, parce qu'elle vient à bout du roi des métaux.",
     geste:"Faire une seule chose, mais la faire entièrement."}
  ];

  /* ---------- les couleurs de l'Œuvre (p = position sur l'échelle du vase animé) ---------- */
  const PHASES = [
    {id:"noir", p:1, nom:"L'œuvre au noir", lat:"nigredo", gr:"mélanose", hex:"#17141c", clair:"#3a3442", oiseau:"le corbeau", planche:"noir",
     court:"La matière se défait et noircit.",
     texte:"On enferme la matière dans le vase et on chauffe doucement. Elle se décompose, noircit, « pourrit ». Les textes parlent de la tête du corbeau, d'un soleil noir, d'une mort. Tous insistent : sans ce noir, rien ne commence.",
     st:"doc", src:"Les quatre couleurs sont déjà chez les alchimistes grecs d'Alexandrie (vers 300)."},
    {id:"paon", p:2, nom:"La queue du paon", lat:"cauda pavonis", gr:"", hex:"#2c8a7a", clair:"#7a5cc0", oiseau:"le paon", planche:"paon",
     court:"Toutes les couleurs passent sur la matière.",
     texte:"Entre le noir et le blanc, beaucoup de textes décrivent un moment où la surface se couvre de reflets changeants, comme une flaque d'huile ou une queue de paon. C'est le signe que la matière « s'ouvre ».",
     st:"doc", src:"L'image du paon devient courante à partir du XVe siècle ; elle figure dans le Splendor solis."},
    {id:"blanc", p:3, nom:"L'œuvre au blanc", lat:"albedo", gr:"leucose", hex:"#e9eef0", clair:"#ffffff", oiseau:"le cygne, la colombe", planche:"blanc",
     court:"La matière est lavée et blanchit.",
     texte:"Les vapeurs montent, retombent et lavent la matière, encore et encore. Elle blanchit. Les textes parlent de la reine blanche, de la Lune, d'un « travail de femmes » : laver le linge. À ce stade, la pierre changerait les métaux en argent.",
     st:"doc", src:"Le lavage et la reine blanche sont deux planches du Splendor solis."},
    {id:"jaune", p:4, nom:"L'œuvre au jaune", lat:"citrinitas", gr:"xanthose", hex:"#e2b23c", clair:"#f6dc7a", oiseau:"l'aigle, l'aurore", planche:"jaune",
     court:"Le blanc se dore, comme une aube.",
     texte:"Le blanc se réchauffe et jaunit : c'est l'aurore avant le plein jour. Cette étape est bien présente chez les Grecs et au Moyen Âge, puis elle s'efface : à partir du XVe siècle, beaucoup d'auteurs ne comptent plus que trois couleurs.",
     st:"doc", src:"Quatre couleurs chez les Grecs, souvent trois seulement après le XVe siècle."},
    {id:"rouge", p:5, nom:"L'œuvre au rouge", lat:"rubedo", gr:"iôsis", hex:"#c2311f", clair:"#ee6a3a", oiseau:"le phénix", planche:"rouge",
     court:"La matière se fixe, rouge et stable.",
     texte:"Le feu le plus fort fixe la matière, qui devient rouge et ne craint plus la chaleur. Les textes parlent du roi rouge, du phénix, du Soleil. C'est la pierre philosophale : elle changerait les métaux en or et, pour certains, guérirait les corps.",
     st:"doc", src:"Le roi rouge clôt la série des vases du Splendor solis."}
  ];
  /* les quatre temps de l'Œuvre personnelle (lecture moderne, d'après Jung) */
  const OEUVRE = [
    {id:"noir", nom:"Au noir", verbe:"Regarder en face", p:1, lune:"Nouvelle lune",
     intro:"On commence par ce qui ne va pas. Pas pour s'accabler : pour savoir de quoi la matière est faite. Dans les images, c'est le soleil noir, le corbeau, la matière qui se défait.",
     gestes:["Écris, sans te relire, tout ce qui te pèse dans cette situation. Cinq minutes.", "Souligne ce qui dépend de toi. Barre ce qui n'en dépend pas.", "Nomme une chose à laquelle tu tiens encore et qu'il faudrait lâcher."],
     q:"Qu'est-ce qui, dans cette situation, est en train de finir ?"},
    {id:"blanc", nom:"Au blanc", verbe:"Laver, clarifier", p:3, lune:"Premier quartier",
     intro:"Le noir est derrière. On lave : on sépare l'essentiel du reste, on regarde la situation à tête reposée. Dans les images, des femmes lavent du linge au bord de l'eau.",
     gestes:["Reprends ton texte au noir. Garde trois phrases, pas plus.", "Fais le tri dans un lieu ou un objet lié à ta question : un tiroir, un dossier, une liste.", "Dis à quelqu'un, en une phrase claire, où tu en es."],
     q:"Une fois le superflu enlevé, qu'est-ce qui reste et qui compte ?"},
    {id:"jaune", nom:"Au jaune", verbe:"Laisser mûrir", p:4, lune:"Pleine lune",
     intro:"Quelque chose se dessine. Ce n'est pas encore fait, mais la direction apparaît, comme une aube. Le travail est de laisser mûrir sans cueillir trop tôt.",
     gestes:["Écris ce que tu ferais si tu étais sûr de réussir.", "Découpe-le en trois pas. Le premier doit tenir en une heure.", "Repère ce qui te donne de l'élan dans ce projet, et ce qui t'en retire."],
     q:"Quelle direction apparaît, même si elle n'est pas encore sûre ?"},
    {id:"rouge", nom:"Au rouge", verbe:"Fixer, incarner", p:5, lune:"Dernier quartier",
     intro:"Il faut maintenant que cela tienne dans la vie réelle. Les alchimistes disent « fixer » : rendre stable ce qui s'envolait. Dans les images, c'est le roi rouge, le phénix, le Soleil levé.",
     gestes:["Fais le premier pas aujourd'hui. Un vrai geste, pas une intention.", "Fixe un rendez-vous dans ton agenda pour le deuxième.", "Dis à quelqu'un ce que tu as changé : dit à voix haute, cela tient mieux."],
     q:"Qu'est-ce qui est différent, concrètement, depuis le début de cette Œuvre ?"}
  ];

  /* ---------- les quatre degrés du feu ---------- */
  const FEUX = [
    {nom:"Le bain", de:.12, a:.34, txt:"La chaleur de l'eau tiède : le bain-marie."},
    {nom:"Les cendres", de:.34, a:.56, txt:"Le vase est posé dans des cendres chaudes."},
    {nom:"Le sable", de:.56, a:.78, txt:"Le bain de sable, bien plus chaud."},
    {nom:"La flamme nue", de:.78, a:1, txt:"Le feu touche le vase."}
  ];
  /* les cinq étapes du jeu : bande de chaleur à tenir, durée (s), vitesse de refroidissement */
  const ETAPES = [
    {ph:"noir", de:.16, a:.34, dur:13, cool:.085, dire:"Feu très doux. La matière doit pourrir, pas cuire.", fait:"La matière est noire comme l'aile du corbeau."},
    {ph:"paon", de:.3, a:.46, dur:13, cool:.095, dire:"Un peu plus de feu. Regarde la surface.", fait:"Toutes les couleurs ont passé sur la matière."},
    {ph:"blanc", de:.44, a:.6, dur:15, cool:.105, dire:"Feu de cendres. Laisse les vapeurs monter et retomber.", fait:"La matière est blanche. Certains s'arrêtent ici."},
    {ph:"jaune", de:.58, a:.73, dur:15, cool:.115, dire:"Feu de sable. Le blanc doit se dorer sans brûler.", fait:"Le blanc s'est doré : l'aurore."},
    {ph:"rouge", de:.74, a:.88, dur:17, cool:.13, dire:"Feu fort et constant. C'est le plus difficile.", fait:"La matière est rouge et ne craint plus le feu."}
  ];

  /* ---------- les douze opérations et les signes (Pernety, 1758) ---------- */
  const OPS = [
    ["Bélier","Calcination","Réduire en cendres par le feu.","Brûle le superflu : une chose à jeter, un engagement à annuler."],
    ["Taureau","Congélation","Faire prendre : le liquide s'épaissit et se fige.","Donne un corps à une idée : un plan, une date, un premier objet."],
    ["Gémeaux","Fixation","Rendre stable ce qui s'envolait.","Tiens une décision prise, sans la rediscuter."],
    ["Cancer","Dissolution","Défaire le solide dans un liquide.","Assouplis une certitude : et si c'était autrement ?"],
    ["Lion","Digestion","Cuire longtemps à chaleur douce.","Laisse mûrir. Ne force rien ce mois-ci."],
    ["Vierge","Distillation","Évaporer, puis recueillir goutte à goutte.","Extrais l'essentiel : une page devient trois lignes."],
    ["Balance","Sublimation","Le solide devient vapeur, puis se dépose plus pur.","Élève un travail ordinaire : fais-le avec soin."],
    ["Scorpion","Séparation","Trier le subtil de l'épais.","Trie : ce que tu gardes, ce que tu laisses."],
    ["Sagittaire","Incération","Ramollir la matière, la rendre fusible comme la cire.","Assouplis une habitude trop raide."],
    ["Capricorne","Fermentation","Un ferment transforme la masse de l'intérieur.","Introduis un levain : une lecture, une rencontre, une idée neuve."],
    ["Verseau","Multiplication","Augmenter la force de la pierre en répétant l'œuvre.","Répète ce qui marche, en plus grand."],
    ["Poissons","Projection","Jeter la pierre sur le métal pour le changer.","Mets ton travail à l'épreuve du réel : montre-le."]
  ];
  const PORTES = ["Calcination","Dissolution","Séparation","Conjonction","Putréfaction","Congélation","Cibation","Sublimation","Fermentation","Exaltation","Multiplication","Projection"];

  /* ---------- les quatre éléments (chaud/froid, sec/humide) ---------- */
  const ELEMENTS = {
    feu:{nom:"Le Feu", chaud:1, sec:1, hex:"#d6452a", mot:"chaud et sec", txt:"Il monte, il sépare, il transforme. C'est l'agent de toutes les opérations.", tarot:"Bâtons", signes:"Bélier, Lion, Sagittaire"},
    air:{nom:"L'Air", chaud:1, sec:0, hex:"#d9a93a", mot:"chaud et humide", txt:"Il monte aussi, mais il relie : c'est la vapeur qui circule dans le vase.", tarot:"Épées", signes:"Gémeaux, Balance, Verseau"},
    eau:{nom:"L'Eau", chaud:0, sec:0, hex:"#3f7fb5", mot:"froide et humide", txt:"Elle descend, elle dissout, elle lave. Toute dissolution est une œuvre d'eau.", tarot:"Coupes", signes:"Cancer, Scorpion, Poissons"},
    terre:{nom:"La Terre", chaud:0, sec:1, hex:"#5d8a4a", mot:"froide et sèche", txt:"Elle descend et elle fixe : le dépôt au fond du vase, le corps qui reste.", tarot:"Deniers", signes:"Taureau, Vierge, Capricorne"}
  };

  /* ---------- la table des signes ---------- */
  const SIGNES = [
    {id:"or", nom:"L'or", fam:"Métaux", pieces:["cercle","point"], txt:"Le cercle, figure parfaite, et son centre. Le même signe sert au Soleil."},
    {id:"argent", nom:"L'argent", fam:"Métaux", pieces:["croissant"], txt:"Le croissant : la Lune, et son métal blanc."},
    {id:"mercure", nom:"Le mercure", fam:"Métaux", pieces:["croissant","cercle","croix"], txt:"Le seul signe qui réunit les trois pièces : croissant, cercle et croix. John Dee en a tiré tout un traité en 1564."},
    {id:"cuivre", nom:"Le cuivre", fam:"Métaux", pieces:["cercle","croix"], txt:"Le cercle au-dessus de la croix. Le signe de Vénus."},
    {id:"fer", nom:"Le fer", fam:"Métaux", pieces:["cercle","flèche"], txt:"Le cercle et la flèche. Le signe de Mars."},
    {id:"etain", nom:"L'étain", fam:"Métaux", pieces:["croissant","croix"], txt:"Un croissant accroché à une croix. Le signe de Jupiter."},
    {id:"plomb", nom:"Le plomb", fam:"Métaux", pieces:["croix","croissant"], txt:"La croix au-dessus, le croissant en dessous. Le signe de Saturne : l'inverse de celui de Jupiter."},
    {id:"feu", nom:"Le Feu", fam:"Éléments", pieces:["triangle"], txt:"Un triangle pointe en haut : la flamme monte."},
    {id:"air", nom:"L'Air", fam:"Éléments", pieces:["triangle","barre"], txt:"Le triangle du Feu, barré : il monte, mais moins haut."},
    {id:"eau", nom:"L'Eau", fam:"Éléments", pieces:["triangle"], txt:"Un triangle pointe en bas : l'eau descend, comme dans une coupe."},
    {id:"terre", nom:"La Terre", fam:"Éléments", pieces:["triangle","barre"], txt:"Le triangle de l'Eau, barré : elle descend et s'arrête."},
    {id:"soufre", nom:"Le soufre", fam:"Principes", pieces:["triangle","croix"], txt:"Le triangle du Feu posé sur la croix : ce qui brûle dans la matière."},
    {id:"mercure", key:"mercure2", nom:"Le mercure (principe)", fam:"Principes", pieces:["croissant","cercle","croix"], txt:"Le même signe que le métal, mais il désigne ici un principe : ce qui est fluide et volatil dans toute chose."},
    {id:"sel", nom:"Le sel", fam:"Principes", pieces:["cercle","barre"], txt:"Un cercle coupé en deux : ce qui reste, le corps fixe. Paracelse l'ajoute au soufre et au mercure."},
    {id:"antimoine", nom:"L'antimoine", fam:"Matières", pieces:["cercle","croix"], txt:"Le signe de Vénus retourné : la croix au-dessus du cercle. Le même signe sert à la Terre des astronomes."},
    {id:"vitriol", nom:"Le vitriol", fam:"Matières", pieces:["cercle","croix","barre"], txt:"Un des signes du vitriol, ces cristaux verts ou bleus dont on tirait un acide puissant. Les signes des matières varient beaucoup d'un livre à l'autre."}
  ];
  const PIECES = {
    cercle:"Le cercle : le Soleil, l'or, ce qui est accompli.",
    point:"Le point : le centre, la semence.",
    croissant:"Le croissant : la Lune, l'argent, ce qui reçoit et reflète.",
    croix:"La croix : la matière, les quatre éléments.",
    "flèche":"La flèche : la force qui sort d'elle-même.",
    triangle:"Le triangle : une direction, vers le haut ou vers le bas.",
    barre:"La barre : un arrêt, une limite."
  };

  /* ---------- le bestiaire ---------- */
  const BESTIAIRE = [
    ["Le corbeau","La matière au noir. « La tête du corbeau » est le nom courant de la putréfaction."],
    ["Le paon","Les couleurs changeantes entre le noir et le blanc."],
    ["Le cygne, la colombe","La matière au blanc, lavée."],
    ["Le phénix","La matière au rouge : ce qui renaît du feu et ne le craint plus."],
    ["Le pélican","Un vase dont le bec replonge dans le ventre : les vapeurs y circulent sans fin. Et l'oiseau qui, dit-on, nourrit ses petits de son sang."],
    ["Le lion vert","Un dissolvant puissant (souvent un vitriol) qui « dévore le Soleil », c'est-à-dire qui attaque l'or."],
    ["L'ouroboros","Le serpent qui se mord la queue : la matière est une, tout se transforme en tout. L'image vient de l'Égypte ancienne."],
    ["L'aigle","Ce qui s'envole : la sublimation, la partie volatile."],
    ["Le crapaud","Ce qui reste au fond : la terre fixe. Souvent enchaîné à l'aigle."],
    ["Le dragon","La matière première, brute et dangereuse, qu'il faut « tuer » pour commencer."],
    ["Le roi et la reine","Le soufre et le mercure, le Soleil et la Lune : les deux principes qu'il faut unir."],
    ["Le rebis","« La chose double » : un être à deux têtes, roi et reine réunis après leur union."]
  ];

  /* ---------- le glossaire ---------- */
  const GLOSS = [
    ["Alambic","L'appareil à distiller : un chapiteau posé sur une cucurbite, avec un bec qui conduit les gouttes. Le mot vient de l'arabe al-anbīq, lui-même du grec ambix."],
    ["Albedo","L'œuvre au blanc."],
    ["Amalgame","Un alliage de mercure avec un autre métal."],
    ["Athanor","Le fourneau de l'alchimiste, conçu pour garder une chaleur égale pendant des semaines. De l'arabe al-tannūr, le four."],
    ["Bain-marie","Chauffer un vase dans de l'eau chaude plutôt que sur la flamme. La tradition l'attribue à Marie la Juive, alchimiste d'Alexandrie."],
    ["Chrysopée","« Fabrication de l'or » : le but le plus célèbre de l'alchimie."],
    ["Citrinitas","L'œuvre au jaune."],
    ["Cucurbite","Le ventre de l'alambic, en forme de courge."],
    ["Élixir","Une substance capable de perfectionner les métaux ou de guérir. De l'arabe al-iksīr."],
    ["Grand Œuvre","L'ensemble des opérations qui mènent à la pierre philosophale."],
    ["Hermétique","D'Hermès Trismégiste, patron légendaire de l'art. Un vase « scellé d'Hermès » est fermé en fondant son col : d'où notre « hermétiquement fermé »."],
    ["Matière première","La matière de départ de l'Œuvre. Les auteurs ne la nomment jamais clairement : c'est le grand secret."],
    ["Mercure philosophique","Non pas le métal, mais le principe fluide et volatil des choses, ou un dissolvant préparé par l'artiste."],
    ["Nigredo","L'œuvre au noir."],
    ["Œuf philosophique","Le vase de verre, rond et scellé, où mûrit la matière."],
    ["Pierre philosophale","Le produit final du Grand Œuvre : une substance censée changer les métaux en or."],
    ["Projection","Le geste final : jeter un peu de pierre sur un métal fondu pour le transmuter."],
    ["Rubedo","L'œuvre au rouge."],
    ["Soufflet","L'outil qui attise le feu. « Souffleur » était le surnom moqueur des alchimistes qui ne cherchaient que l'or."],
    ["Spagyrie","Mot forgé par Paracelse : séparer et réunir. L'art de préparer des remèdes par des moyens chimiques."],
    ["Transmutation","Le changement d'un métal en un autre."],
    ["Tria prima","Les trois principes de Paracelse : soufre, mercure et sel."],
    ["Vitriol","Des sulfates en cristaux (vert pour le fer, bleu pour le cuivre), d'où l'on tirait l'acide sulfurique."]
  ];

  /* ---------- l'histoire ---------- */
  const HIST = [
    {id:"alex", ere:"Alexandrie", quand:"Ier – IVe siècle", chapo:"L'alchimie naît en Égypte, en langue grecque, à la rencontre des ateliers de métallurgistes, de la philosophie grecque et des religions de l'époque.",
     faits:[
      {an:"IIIe – IVe s.", t:"Les papyrus de Leyde et de Stockholm", st:"doc", x:"Deux recueils de recettes d'atelier : comment imiter l'or, l'argent, les pierres précieuses et la pourpre. Pas de mystique : du savoir-faire. C'est le terreau technique de l'alchimie."},
      {an:"vers 300", t:"Zosime de Panopolis", st:"doc", img:"zosime", x:"Le premier alchimiste dont on lit encore les textes. Il décrit des appareils à distiller, cite ses prédécesseurs et raconte des rêves où des hommes de métal sont démembrés et transformés : la technique et la vision intérieure sont déjà mêlées."},
      {an:"avant 300", t:"Marie la Juive", st:"doc", x:"Zosime la cite comme une autorité. On lui attribue plusieurs appareils, dont un alambic à trois becs. Le « bain-marie » porte son nom, selon une tradition ancienne."},
      {an:"manuscrit des Xe – XIe s.", t:"La Chrysopée de Cléopâtre", st:"doc", img:"cleo", x:"Une page de dessins attribuée à une alchimiste nommée Cléopâtre (ce n'est pas la reine). On y voit un serpent qui se mord la queue, avec ces mots : « Un est le Tout. » C'est l'ouroboros."}
     ]},
    {id:"arabe", ere:"Le monde arabe", quand:"VIIIe – Xe siècle", chapo:"Les savants de langue arabe traduisent les Grecs, expérimentent et donnent à l'art son nom : al-kīmiyā'. Alambic, élixir, athanor, alcali : nos mots viennent de là.",
     faits:[
      {an:"VIIIe – Xe s.", t:"Le corpus de Jābir ibn Ḥayyān", st:"doc", img:"jabir", x:"Des centaines de traités circulent sous le nom de Jābir (Geber en latin). Ils posent une idée qui durera mille ans : tous les métaux sont faits de deux principes, le soufre et le mercure, en proportions différentes. Les historiens pensent que ce corpus a été écrit par plusieurs auteurs."},
      {an:"vers 900", t:"Al-Rāzī, Le Livre des secrets", st:"doc", x:"Le médecin Rhazès classe les substances, décrit les appareils et les opérations avec une grande netteté. On est tout près d'un manuel de laboratoire."},
      {an:"VIIIe – IXe s.", t:"La Table d'émeraude", st:"doc", img:"table", x:"Le texte le plus célèbre de l'alchimie apparaît pour la première fois en arabe, à la fin d'un Livre du secret de la création. Il se dit gravé par Hermès sur une tablette d'émeraude : cela, c'est la légende. Aucun original grec n'est connu."}
     ]},
    {id:"latin", ere:"L'Occident latin", quand:"XIIe – XVe siècle", chapo:"L'Europe découvre l'alchimie par les traductions de l'arabe, en Espagne surtout. Elle entre dans les monastères, les cours et les universités, et inquiète les papes.",
     faits:[
      {an:"1144", t:"La première traduction", st:"doc", x:"Robert de Chester achève de traduire de l'arabe en latin un dialogue entre le moine Morienus et le prince Khālid. Il prévient ses lecteurs : le monde latin ne sait pas encore ce qu'est l'alchimie."},
      {an:"vers 1300", t:"La Somme de perfection", st:"doc", x:"Signée « Geber », elle passe longtemps pour une œuvre de Jābir. Elle a été écrite en latin, sans doute par le franciscain Paul de Tarente. C'est le grand manuel du Moyen Âge."},
      {an:"1317", t:"Le pape contre les faux-monnayeurs", st:"doc", x:"Jean XXII condamne les alchimistes qui promettent de l'or et livrent du faux métal. Ce n'est pas l'art qu'il vise, mais la fraude."},
      {an:"1330 – 1418", t:"Nicolas Flamel", st:"leg", x:"Flamel a existé : c'était un écrivain public parisien, riche et généreux. Rien ne montre qu'il ait pratiqué l'alchimie. Sa légende naît deux siècles après sa mort, avec un livre publié sous son nom en 1612."},
      {an:"1471", t:"George Ripley, les douze portes", st:"doc", x:"Un chanoine anglais décrit l'Œuvre comme un château à douze portes, de la calcination à la projection. On donne aussi son nom à de longs rouleaux peints, pleins de dragons et de crapauds."}
     ]},
    {id:"images", ere:"L'âge des images", quand:"XVIe – XVIIe siècle", chapo:"L'imprimerie et la gravure changent tout. L'alchimie devient un art de l'image : des livres entiers parlent par emblèmes, pour être médités autant que lus.",
     faits:[
      {an:"1493 – 1541", t:"Paracelse", st:"doc", x:"Médecin errant et batailleur. Pour lui, le but de l'alchimie n'est pas l'or mais le remède. Il ajoute le sel au soufre et au mercure, et ouvre la voie à une chimie médicale."},
      {an:"1532 – 1582", t:"Le Splendor solis", st:"doc", img:"p_roi", x:"« La splendeur du Soleil » : vingt-deux peintures somptueuses, dont une série de sept vases où la matière change de figure. La plus ancienne copie date des années 1530, la plus célèbre de 1582. Son auteur, « Salomon Trismosin », est un personnage de légende."},
      {an:"1550", t:"Le Rosaire des philosophes", st:"doc", img:"roireine", x:"Vingt gravures sur bois racontent l'union d'un roi et d'une reine, leur mort et leur renaissance en un seul être. On y trouve aussi le lion vert qui dévore le Soleil."},
      {an:"1599", t:"Les Douze Clefs de Basile Valentin", st:"doc", img:"clef", x:"Le livre se donne pour l'œuvre d'un moine bénédictin du XVe siècle. On n'a jamais trouvé trace de ce moine : l'auteur est sans doute celui qui se présente comme son éditeur, Johann Thölde. Chaque « clef » est une énigme en image. Ici la douzième, gravée par Merian : le fourneau, le lion qui dévore le serpent, le Soleil et la Lune."},
      {an:"1609", t:"L'Amphithéâtre de Khunrath", st:"doc", img:"m:lab", x:"Une gravure célèbre montre l'alchimiste à genoux dans son oratoire, face à son laboratoire. Prier et travailler : « ora et labora »."},
      {an:"1617", t:"Atalanta fugiens", st:"doc", img:"ata21", x:"Michael Maier, médecin de l'empereur Rodolphe II, publie cinquante emblèmes gravés par Matthäus Merian. Chacun réunit une image, un poème, un commentaire et une fugue à trois voix. Un livre pour l'œil, l'esprit et l'oreille."},
      {an:"1677", t:"Le Mutus Liber", st:"doc", img:"mutus", x:"« Le livre muet » paraît à La Rochelle : quinze planches, presque aucun mot. Un homme et une femme y travaillent côte à côte, de la récolte de la rosée jusqu'à la fin de l'Œuvre."}
     ]},
    {id:"chimie", ere:"La naissance de la chimie", quand:"XVIIe – XVIIIe siècle", chapo:"On a longtemps raconté que la chimie avait chassé l'alchimie. Les historiens disent aujourd'hui autre chose : jusqu'en 1700 environ, c'est une seule et même activité.",
     faits:[
      {an:"1661", t:"Robert Boyle", st:"doc", x:"Dans Le Chimiste sceptique, il critique les quatre éléments et les trois principes. Mais il cherche lui-même la pierre philosophale toute sa vie, et croit avoir vu une transmutation."},
      {an:"1669", t:"Hennig Brand découvre le phosphore", st:"doc", img:"wright", x:"À Hambourg, un alchimiste qui cherche la pierre dans l'urine obtient une matière blanche qui luit dans le noir. C'est le premier élément chimique dont on connaît le découvreur."},
      {an:"1642 – 1727", t:"Isaac Newton", st:"doc", x:"Le père de la gravitation a laissé environ un million de mots sur l'alchimie, recopiés, annotés et expérimentés pendant trente ans. L'économiste Keynes, qui racheta ces papiers en 1936, a dit de lui qu'il était « le dernier des magiciens »."},
      {an:"1789", t:"Lavoisier", st:"doc", x:"Son Traité élémentaire de chimie donne aux substances des noms nouveaux et une méthode : peser tout, avant et après. Les éléments ne sont plus quatre. La transmutation sort de la science."}
     ]},
    {id:"apres", ere:"Les vies d'après", quand:"XIXe – XXIe siècle", chapo:"Chassée des laboratoires, l'alchimie ne disparaît pas. Elle devient un langage : spirituel pour les uns, psychologique pour les autres, et un objet d'étude pour les historiens.",
     faits:[
      {an:"1850", t:"L'alchimie spirituelle", st:"mod", x:"Mary Anne Atwood, en Angleterre, soutient que les alchimistes ne parlaient pas de métaux mais de l'âme. L'idée a un succès immense. Les historiens la jugent fausse pour les textes anciens : les alchimistes travaillaient bel et bien au fourneau."},
      {an:"1919", t:"La transmutation existe", st:"doc", x:"Ernest Rutherford change de l'azote en oxygène en le bombardant de particules. En 1980, une équipe américaine change un peu de bismuth en or dans un accélérateur. C'est possible, donc, mais à un coût sans commune mesure avec la valeur de l'or obtenu."},
      {an:"1926", t:"Fulcanelli", st:"leg", x:"Le Mystère des cathédrales lit Notre-Dame de Paris comme un livre d'alchimie en pierre. Personne ne sait qui se cache derrière ce nom. La thèse séduit, mais les historiens de l'art ne la retiennent pas."},
      {an:"1944", t:"Carl Gustav Jung", st:"mod", x:"Dans Psychologie et Alchimie, il lit les images alchimiques comme des étapes de la transformation intérieure. C'est de là que vient l'usage moderne de « l'œuvre au noir » pour dire une crise. Une lecture féconde, mais qui date du XXe siècle."},
      {an:"depuis 1990", t:"Le retour au laboratoire", st:"doc", x:"Des historiens comme Lawrence Principe et William Newman refont les expériences décrites dans les vieux textes. Résultat : beaucoup de recettes « absurdes » fonctionnent. Les alchimistes étaient de vrais expérimentateurs."}
     ]}
  ];
  const VRAI = [
    ["Les alchimistes étaient des charlatans.","Certains, oui : on les appelait les « souffleurs ». Mais beaucoup étaient des expérimentateurs sérieux. On leur doit la distillation, les acides forts, le phosphore et une bonne part du matériel de laboratoire.", "leg"],
    ["Nicolas Flamel a fabriqué de l'or.","Aucun document de son temps ne le dit. Sa fortune s'explique par son métier et par l'héritage de sa femme Pernelle. La légende date du XVIIe siècle.", "leg"],
    ["L'alchimie a toujours été une quête spirituelle déguisée.","Non. Les textes anciens décrivent de vrais travaux au fourneau. La lecture purement spirituelle date du XIXe siècle. Cela dit, beaucoup d'alchimistes voyaient un lien entre le travail sur la matière et le travail sur soi.", "mod"],
    ["Changer un métal en or est impossible.","C'est possible depuis le XXe siècle, par des réactions nucléaires. Mais pas par la chimie, et jamais de façon rentable.", "doc"],
    ["La Table d'émeraude vient de l'Égypte des pharaons.","Le texte le plus ancien qu'on connaisse est en arabe et date du VIIIe ou du IXe siècle. Rien ne permet de remonter plus haut.", "leg"]
  ];

  /* ---------- les planches (aquarelles d'E. A. Ibbs d'après le Splendor solis, Wellcome Collection) ---------- */
  const PLANCHES = {
    noir:{img:"p_noir", t:"Le soleil noir", x:"Un soleil sombre s'enfonce dans un paysage de marais. C'est la matière qui se défait : la putréfaction. Au premier plan, pourtant, l'herbe est déjà verte."},
    paon:{img:"p_paon", t:"Le paon dans le vase", x:"Dans le vase couronné, un paon fait la roue. Toutes les couleurs passent sur la matière : elle est en train de changer."},
    blanc:{img:"p_blanc", t:"La reine blanche", x:"Une reine vêtue de bleu et de blanc, debout sur un croissant de Lune. La matière est lavée. C'est l'œuvre au blanc."},
    jaune:{img:"p_jaune", t:"L'adepte au vase d'or", x:"Un homme porte un vase rempli d'un liquide doré. Sur la banderole : « Allons chercher la nature des quatre éléments. »"},
    rouge:{img:"p_roi", t:"Le roi rouge", x:"Un jeune roi vêtu de rouge, sceptre en main, dans un halo d'or. La matière est fixée : c'est la pierre."},
    union:{img:"p_union", t:"Le roi et la reine", x:"La reine sous la Lune, le roi sous le Soleil : les deux principes que l'art doit unir. Elle est debout sur une boule noire, lui sur un feu."},
    dragon:{img:"p_dragon", t:"L'enfant et le dragon", x:"Un enfant verse une fiole dans la gueule d'un dragon, tout en actionnant un soufflet. Le premier vase de la série : la matière brute, qu'il faut nourrir et dompter."},
    aigle:{img:"p_aigle", t:"L'aigle à trois têtes", x:"Un oiseau blanc à trois têtes dans le vase : la matière qui s'élève, sublimée trois fois."}
  };

  /* ---------- trois emblèmes commentés (x, y : position du repère en % de l'image) ---------- */
  const EMBLEMES = [
    {img:"ata21", court:"Le cercle et le carré", src:"Atalanta fugiens, emblème XXI · 1617", t:"Fais de l'homme et de la femme un cercle",
     intro:"Un philosophe trace une figure sur un mur, avec un compas plus grand que lui. C'est l'emblème le plus célèbre de Michael Maier, et un résumé de tout le Grand Œuvre en quatre figures de géométrie.",
     pts:[
      {x:49, y:10, t:"La devise", x2:"« Fais de l'homme et de la femme un cercle, puis un carré, puis un triangle ; fais un cercle, et tu auras la pierre des philosophes. » Tout l'emblème est dans cette phrase. L'image la suit mot à mot."},
      {x:60, y:69, t:"L'homme et la femme", x2:"Au centre, un homme et une femme dans un petit cercle. Ce sont les deux principes de la matière, que d'autres images appellent le roi et la reine, le soufre et le mercure. Le cercle dit qu'au départ ils ne font qu'un."},
      {x:73, y:60, t:"Le carré", x2:"Le cercle est enfermé dans un carré. Quatre côtés : les quatre éléments. C'est le premier travail de l'artiste, séparer l'unité de départ en Feu, Air, Eau et Terre."},
      {x:60, y:40, t:"Le triangle", x2:"Du carré, on passe au triangle : de quatre à trois. Maier parle du corps, de l'esprit et de l'âme. D'autres auteurs diraient le sel, le mercure et le soufre."},
      {x:86, y:46, t:"Le grand cercle", x2:"Enfin, on revient au cercle, mais bien plus grand que le premier. La matière est redevenue une, et elle est accomplie : c'est la pierre. Dans son commentaire, Maier rapproche ce parcours d'une vieille énigme des géomètres, la quadrature du cercle."},
      {x:37, y:48, t:"Le compas", x2:"Le philosophe ne travaille pas ici au fourneau, mais au compas. Le message est clair : l'art demande de la mesure et de la proportion, pas du hasard. À ses pieds, une équerre et un rapporteur."},
      {x:82, y:29, t:"Le mur", x2:"Regarde où la figure est tracée : sur un vieux mur dont l'enduit s'écaille. Maier n'en dit rien. On peut y voir un rappel que les textes répètent souvent : la matière de départ est commune, et personne ne la remarque."}]},
    {img:"ata42", court:"Suivre la Nature", src:"Atalanta fugiens, emblème XLII · 1617", t:"Le guide, le bâton, les lunettes et la lampe",
     intro:"La devise dit : « À celui qui s'occupe de chimie, que la Nature, la Raison, l'Expérience et la lecture servent de guide, de bâton, de lunettes et de lampe. » Chaque mot a son objet dans l'image.",
     pts:[
      {x:24, y:40, t:"La Nature", x2:"La femme qui marche devant, les bras chargés de fruits et de fleurs, c'est la Nature. Elle est le guide. L'alchimiste ne la devance jamais : il la suit."},
      {x:50, y:85, t:"Les traces de pas", x2:"Elle laisse des empreintes dans la terre. Tout l'art est là : observer comment la nature s'y prend, puis mettre ses pas dans les siens. L'alchimiste ne veut pas forcer la nature, mais l'imiter."},
      {x:67, y:63, t:"Le bâton : la Raison", x2:"Le vieil homme s'appuie sur un bâton. C'est la raison : ce qui empêche de tomber quand le terrain est mauvais."},
      {x:73, y:27, t:"Les lunettes : l'Expérience", x2:"Il porte des lunettes. C'est l'expérience, celle du laboratoire : ce qui permet de voir de près, et de corriger ce que la raison croyait savoir."},
      {x:94, y:46, t:"La lampe : la lecture", x2:"Dans sa main, une lanterne. Ce sont les livres des anciens. Ils éclairent le chemin, mais seulement à quelques pas : il faut continuer d'avancer."},
      {x:11, y:6, t:"La nuit", x2:"La Lune est levée : la scène se passe de nuit. Celui qui cherche avance dans l'obscurité, avec quatre aides seulement. C'est un portrait modeste, et assez juste, de toute recherche."}]},
    {img:"mutus", court:"L'échelle de Jacob", src:"Mutus Liber, première planche · 1677", t:"Le livre muet",
     intro:"C'est la première des quinze planches d'un livre presque sans texte. Un homme dort sur un rocher. Deux anges descendent une échelle et sonnent de la trompette pour le réveiller.",
     pts:[
      {x:23, y:49, t:"Le titre", x2:"« Le livre muet, dans lequel pourtant toute la philosophie hermétique est représentée en figures hiéroglyphiques. » L'auteur signe « Altus », un pseudonyme. Le livre parlera par images, sans un mot d'explication."},
      {x:60, y:73, t:"Le dormeur", x2:"C'est Jacob. Dans la Genèse, il s'endort la tête sur une pierre et voit en rêve une échelle qui relie la terre au ciel. Ici, c'est aussi le lecteur : celui qui ne sait pas encore, et qu'il faut réveiller."},
      {x:44, y:36, t:"L'échelle", x2:"Elle relie le bas et le haut. La Table d'émeraude dit la même chose : « Il monte de la terre au ciel, puis redescend sur la terre. » Dans le vase, c'est la vapeur qui monte et la goutte qui retombe."},
      {x:47, y:19, t:"Les anges", x2:"Ils descendent, trompette à la bouche. Le savoir est présenté comme un don qui vient d'en haut : beaucoup d'alchimistes parlaient de leur art comme d'un « don de Dieu »."},
      {x:33, y:65, t:"Les chiffres à l'envers", x2:"Trois lignes étranges. Lis-les de droite à gauche : Genèse 28, 11-12 ; Genèse 27, 28 et 39 ; Deutéronome 33, 13 et 28. Le premier passage est le songe de Jacob. Les deux autres parlent de « la rosée du ciel ». Or les planches suivantes montrent un couple qui recueille la rosée dans des draps tendus."},
      {x:90, y:5, t:"La Lune et les étoiles", x2:"C'est la nuit, le moment où la rosée se dépose. Dans ce livre, tout commence par elle."},
      {x:82, y:85, t:"Les rosiers", x2:"Deux branches de rosier nouées encadrent la scène. La rose est une des fleurs préférées des alchimistes : le Rosaire des philosophes lui doit son nom."},
      {x:55, y:94, t:"La Rochelle, 1677", x2:"« Rupellae » : à La Rochelle, chez Pierre Savouret, avec privilège du roi. Un livre d'alchimie imprimé tout à fait légalement, sous Louis XIV."}]},
    {img:"m:lab", court:"Prier et travailler", src:"Khunrath, Amphitheatrum sapientiae aeternae · 1595 – 1609", t:"L'oratoire et le laboratoire",
     intro:"Une seule pièce, deux moitiés. À gauche on prie, à droite on travaille au fourneau. C'est l'image la plus célèbre de l'alchimiste, et un programme : l'un ne va pas sans l'autre.",
     pts:[
      {x:14, y:45, t:"L'oratoire", x2:"À gauche, une tente dressée comme une chapelle. C'est l'oratoire, le lieu de la prière. Pour Khunrath, médecin et luthérien fervent, l'art est d'abord un don de Dieu : on le demande avant de le chercher."},
      {x:24, y:82, t:"L'alchimiste à genoux", x2:"Il est à genoux, les bras ouverts, tourné vers la tente. On ne le voit pas au fourneau : la gravure le montre au moment où il s'arrête de travailler."},
      {x:80, y:42, t:"Le laboratoire", x2:"À droite, le fourneau, les cornues et les fioles sur leur étagère. Les deux colonnes de la cheminée portent chacune un mot : Raison et Expérience. Les mêmes mots que dans l'emblème XLII de Maier."},
      {x:47, y:52, t:"La porte du fond", x2:"Au-dessus de la porte, au bout de la salle, une devise en latin : « Dormiens vigila », en dormant, veille. Même le repos fait partie du travail."},
      {x:50, y:92, t:"La table aux instruments", x2:"Au premier plan, une table couverte d'instruments de musique. Une inscription explique leur présence : la musique sacrée chasse la tristesse et les mauvais esprits. On dit souvent que « laboratoire » réunit labor et oratoire. C'est un joli jeu de mots, pas une étymologie."}]},
    {img:"clef", court:"Le lion et le serpent", src:"Basile Valentin, douzième clef · gravure de Merian", t:"La dernière clef",
     intro:"La dernière des douze clefs. Le texte parle de la fin de l'Œuvre : il faut unir la pierre à de l'or pur, « comme le levain à la pâte ». L'image, elle, montre un atelier où chaque objet veut dire quelque chose.",
     pts:[
      {x:12, y:45, t:"Le fourneau", x2:"Un fourneau en forme de tonneau, en plein feu. À la fin de l'Œuvre, le feu est au plus fort : c'est le quatrième degré, la flamme nue."},
      {x:36, y:13, t:"Le Soleil et la Lune", x2:"Accrochés au mur comme deux enseignes : l'or et l'argent, le soufre et le mercure, le roi et la reine. Les deux principes président à l'opération."},
      {x:35, y:37, t:"Les fleurs et le signe", x2:"Dans un pot, deux fleurs, et au-dessus le signe du mercure. La matière « fleurit » : les alchimistes parlent de fleurs pour ce qui monte et se dépose en cristaux sur les parois du vase."},
      {x:55, y:40, t:"L'artiste", x2:"Il ne regarde ni le feu ni les fleurs : il nous regarde. D'une main il désigne le pot, comme on montre un résultat."},
      {x:85, y:36, t:"La balance", x2:"Sur la table, une balance. Le poids est l'obsession des recettes sérieuses : combien de pierre pour combien d'or. C'est aussi par la balance que la chimie remplacera l'alchimie, deux siècles plus tard."},
      {x:72, y:74, t:"Le lion et le serpent", x2:"Un lion dévore un serpent. On sait lire ce genre de scène : dévorer, c'est absorber. Le fixe (le lion, sans ailes, bien campé) avale le volatil (le serpent). La matière ne s'envolera plus."}]},
    {img:"p_union", court:"Le roi et la reine", src:"Splendor solis, quatrième planche · XVIe siècle", t:"Les deux principes",
     intro:"Avant les sept vases, le Splendor solis présente les deux personnages de toute l'histoire. Tout ce qui est à gauche répond à ce qui est à droite.",
     pts:[
      {x:30, y:15, t:"La Lune", x2:"Au-dessus de la reine, une Lune au visage bleu. Elle est froide et humide : c'est le côté de l'eau, de l'argent, du mercure."},
      {x:67, y:15, t:"Le Soleil", x2:"Au-dessus du roi, un Soleil rouge. Il est chaud et sec : c'est le côté du feu, de l'or, du soufre."},
      {x:31, y:45, t:"La reine", x2:"Vêtue de bleu et de blanc, elle parle la première : sa main est levée vers le roi. Dans le manuscrit, sa banderole porte les mots « lait de vierge », un des noms de couverture du mercure des philosophes."},
      {x:68, y:46, t:"Le roi", x2:"Vêtu de rouge, il tient un sceptre où s'enroule une banderole. On y lit, dans le manuscrit : « Coagule le masculin. » Dissoudre et coaguler : les deux gestes de l'art, un par personnage."},
      {x:50, y:88, t:"Sous leurs pieds", x2:"Regarde sur quoi ils se tiennent. Elle, sur une boule sombre : la terre, la matière noire du début. Lui, sur un feu. L'Œuvre devra les réunir : les textes parlent de mariage, et les images suivantes le montrent."}]}
  ];
  /* ---------- les niveaux du Grand Œuvre et les défis du jour ---------- */
  const NIVEAUX = [
    {id:"apprenti", nom:"Apprenti", x:"Le feu est docile et les zones sont larges.", cool:.86, band:1.14, vent:0, buche:0},
    {id:"compagnon", nom:"Compagnon", x:"Des courants d'air refroidissent le feu.", cool:1, band:1, vent:1, buche:0},
    {id:"maitre", nom:"Maître", x:"Zones étroites, courants d'air, bûches qui s'embrasent.", cool:1.16, band:.8, vent:1.35, buche:1}
  ];
  const DEFIS = [
    {id:"fragile", nom:"Le vase fragile", x:"Conduis l'Œuvre jusqu'au rouge sans une seule fêlure."},
    {id:"oeil", nom:"À l'œil", x:"La zone à tenir n'est plus affichée. Fie-toi aux bulles, aux vapeurs et à la couleur."},
    {id:"montre", nom:"Contre la montre", x:"Atteins le rouge en moins de deux minutes trente."},
    {id:"vent", nom:"Grand vent", x:"Les courants d'air sont deux fois plus fréquents."},
    {id:"vif", nom:"Feu vif", x:"Le feu retombe bien plus vite : il faut souffler souvent, et court."}
  ];
  const CRED = {
    p_noir:"Le soleil noir, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection, CC BY 4.0)",
    p_paon:"Le paon dans le vase, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_blanc:"La reine blanche, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_jaune:"L'adepte portant le vase d'Hermès, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_roi:"Le roi rouge, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_union:"Le roi et la reine, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_dragon:"L'enfant et le dragon, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection)",
    p_aigle:"L'aigle à trois têtes, d'après le Splendor solis, aquarelle de E. A. Ibbs (Wellcome Collection, CC BY 4.0)",
    zosime:"Appareils à distiller d'après Zosime, manuscrit grec (Paris, BnF, grec 2327, XVe siècle)",
    cleo:"La Chrysopée de Cléopâtre, d'après le manuscrit de Venise (Marcianus graecus 299, Xe – XIe siècle)",
    jabir:"« Geber » enseignant, portrait imaginaire, manuscrit italien du XVe siècle (Florence, Bibliothèque Laurentienne, Ashburnham 1166)",
    table:"La Table d'émeraude gravée sur un rocher, Heinrich Khunrath, Amphitheatrum sapientiae aeternae, 1609 (Wellcome Collection, CC BY 4.0)",
    roireine:"Le roi et la reine, Rosarium philosophorum, Francfort, 1550",
    clef:"La douzième clef de Basile Valentin, gravure de Matthäus Merian, Musaeum hermeticum, 1678",
    ata42:"Michael Maier, Atalanta fugiens, emblème XLII, gravure de Matthäus Merian, 1617",
    ata21:"Michael Maier, Atalanta fugiens, emblème XXI, gravure de Matthäus Merian, 1617 (Wellcome Collection)",
    mutus:"Mutus Liber, première planche, La Rochelle, 1677",
    wright:"Joseph Wright of Derby, L'Alchimiste découvrant le phosphore, 1771 (Derby Museum)",
    "m:lab":"Heinrich Khunrath, l'oratoire-laboratoire, Amphitheatrum sapientiae aeternae, 1609"
  };

  return {G, METAUX, PHASES, OEUVRE, FEUX, ETAPES, OPS, PORTES, ELEMENTS, SIGNES, PIECES, BESTIAIRE, GLOSS, HIST, VRAI, PLANCHES, CRED, EMBLEMES, NIVEAUX, DEFIS};
})();
