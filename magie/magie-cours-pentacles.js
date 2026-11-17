/* ===== Arcanes · Magie : le cours des pentacles (module XV, six leçons) et des écritures secrètes (module XVI) =====
   Charge après magie-pentacles.js, magie-ecritures.js et magie-pentacles-monde.js.
   Ajoute aussi le rituel guidé « La consécration d'un pentacle » et ses schémas interactifs. */
(() => {
  const M = window.ArcanesMagie, PT = window.MAGIE_PENT, P2 = window.MAGIE_PENT2, E = window.ArcanesEcritures;
  if(!M || !M._ || !PT || !P2 || !E) return;
  const _ = M._, X = _.EXT, K = _.K, D = _.D, PL = _.PL, {h, cap, f1} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const st = () => _.st(), save = () => _.save();
  const PLAN = PT.PLAN, PP = id => PLAN.find(p => p.id === id) || PLAN[1];
  const DAY = 864e5;

  /* ================================================================
     LE MODULE XV, EN SIX LEÇONS
     ================================================================ */
  const L15 = [
    { id:"m15l1", t:"Amulette, talisman, pentacle, sceau", sous:"Quatre mots, une très vieille histoire",
      idee:[
       "Depuis qu'on écrit, on porte sur soi des écritures. Les Égyptiens glissaient des formules dans de petits étuis pendus au cou ; les Grecs gravaient des pierres fines de noms étranges, comme <i>Abrasax</i> ; les communautés juives et musulmanes ont copié pendant des siècles des grilles de noms divins pour protéger une maison, une mère, un enfant. Le pentacle est l'héritier de tout cela.",
       "Quatre mots se croisent. L'<b>amulette</b> protège par elle-même, parce qu'elle est ce qu'elle est : une pierre, un nom, une main. Le <b>talisman</b> tient sa force d'un moment : on le fabrique quand une planète est forte. Le <b>sceau</b> est une marque, celle d'un roi, d'un ange ou d'un esprit. Le <b>pentacle</b>, enfin, est une médaille couverte de noms et de figures, qui tient un peu des trois.",
       "Le mot apparaît dans les grimoires de la fin du Moyen Âge. Son origine est discutée : peut-être le grec <i>pente</i>, « cinq », par confusion avec le pentagramme, peut-être un mot ancien désignant ce qui pend au cou. Il faut donc distinguer le <b>pentacle</b>, la médaille, du <b>pentagramme</b>, l'étoile à cinq branches.",
       "La légende qui le porte est celle de Salomon : un récit grec des premiers siècles, le <i>Testament de Salomon</i>, raconte que l'archange Michel apporta au roi un anneau gravé d'un sceau. Mais le pentacle n'appartient pas qu'à Salomon. Dans ce module, on appelle pentacle toute médaille de noms et de figures qu'on garde sur soi ou sous les yeux : celles de la Clavicule, les sceaux de l'Arbatel, la médaille de saint Benoît, les carrés du <i>wafq</i>, et le tien."],
      source:{txt:"Les pentacles sont faits pour frapper de terreur les esprits et les réduire à l'obéissance ; ils servent aussi contre tous les périls de la terre, de l'air, de l'eau et du feu.", ref:"Clé de Salomon, livre I, chapitre XVIII, d'après l'édition de Mathers, 1889", st:"doc"},
      schema:"pentfam",
      ex:{t:"Ce que tu portes déjà", txt:"Regarde ce que tu portes sur toi : une médaille, une bague, un bracelet offert, une photo dans un portefeuille. Lequel est une amulette, lequel un souvenir, lequel les deux ?"},
      carnet:"Un objet que je porte et ce qu'il représente pour moi :",
      marge:[{t:"Le carré SATOR", txt:"Gravé sur un mur de Pompéi avant 79, il est devenu le deuxième pentacle de Saturne quinze siècles plus tard."},
             {t:"Voir aussi", txt:"Les clavicules, au chapitre VI de l'Histoire.", go:"hist:h6"}] },
    { id:"m15l2", t:"L'anatomie d'un pentacle", sous:"Six parties, de la frontière au moment",
      idee:[
       "Qu'il vienne de Salomon, de l'abbé Julio ou d'un carré arabe, un pentacle se lit comme une phrase en six parties. La <b>frontière</b> d'abord : un double cercle, parfois un carré, qui sépare le pentacle du reste du monde, comme le cercle sépare le temple de la pièce.",
       "Puis la <b>couronne</b>, le texte qui court entre les cercles. Dans la Clavicule, c'est un verset de la Bible en hébreu, qui dit ce que le pentacle doit accomplir : pour ouvrir les portes, le Psaume 24 ; contre la pauvreté, le Psaume 113. Ailleurs, une devise latine, des initiales, des noms d'anges. La logique est celle de l'analogie : ce que Dieu a fait dans le verset, on le lui demande à nouveau.",
       "Au <b>centre</b> se tient la figure : un carré de nombres ou de lettres, une étoile, une croix, un sceau, un nom. Les <b>écritures</b> font la quatrième partie : hébreu, grec, latin, ou les alphabets secrets du module suivant, qui donnent aux noms un air d'étrangeté.",
       "Restent la <b>matière</b> et le <b>moment</b>. Chaque planète a son métal et sa couleur : plomb et noir pour Saturne, étain et bleu pour Jupiter, fer et rouge pour Mars, or et jaune pour le Soleil, cuivre et vert pour Vénus, alliage et couleurs mêlées pour Mercure, argent pour la Lune. Et chaque pentacle a son heure, qu'on verra à la leçon 5."],
      source:{txt:"Saturne gouverne le plomb ; Jupiter l'étain ; Mars le fer ; le Soleil l'or ; Vénus le cuivre ; Mercure le mélange des métaux ; et la Lune l'argent.", ref:"Clé de Salomon, livre I, chapitre XVIII, éd. Mathers, 1889", st:"doc"},
      schema:"pentanat",
      ex:{t:"Lire un pentacle", txt:"Dans le schéma, touche chaque partie du deuxième pentacle de Saturne. Puis ouvre les pentacles du monde et regarde la médaille de saint Benoît : retrouves-tu la frontière, la couronne et le centre ?", outil:"outil:pentacles"},
      carnet:"Le verset ou la phrase que j'aimerais voir courir autour d'un cercle :",
      marge:[{t:"Les couleurs", txt:"Les manuscrits disent l'or, le cinabre ou vermillon, et l'azur céleste."},
             {t:"Voir aussi", txt:"Les correspondances des planètes.", go:"outil:toile"}] },
    { id:"m15l3", t:"Les pentacles de Salomon", sous:"Quarante-quatre médailles, et ceux qui sont pour soi",
      idee:[
       "L'édition de la Clé de Salomon publiée par Samuel Liddell MacGregor Mathers en 1889, à partir de manuscrits du British Museum, compte <b>quarante-quatre pentacles</b> : sept pour Saturne, Jupiter, Mars et le Soleil, cinq pour Vénus et Mercure, six pour la Lune. Les manuscrits plus anciens n'en ont pas tous autant : l'un n'en donne que treize, un autre aucun. Le chiffre de quarante-quatre est donc celui de Mathers, qui a fait école.",
       "Leurs buts sont de quatre sortes. Beaucoup servent à <b>invoquer ou commander des esprits</b>. D'autres prétendent agir sur la nature, ou sur une autre personne. Une partie seulement est tournée vers <b>l'opérateur lui-même</b> : protection en voyage, contre les eaux, contre la pauvreté, pour l'étude ou le savoir.",
       "Arcanes ne montre que ces derniers, les pentacles <b>pour soi</b>. Ce n'est pas qu'on croie les autres efficaces : c'est qu'une intention de commander, de nuire ou de contraindre n'a pas sa place dans une pratique qui se veut un travail sur soi.",
       "Regarde aussi ce que ces buts disent de leurs utilisateurs. Des trésors cachés gardés par des esprits, des voyages dangereux, la peur de la pauvreté et des procès : le grimoire est un miroir des angoisses d'un petit clerc des XVIe et XVIIe siècles."],
      source:{txt:"Sept pentacles consacrés à Saturne, en noir ; sept à Jupiter, en bleu ; sept à Mars, en rouge ; sept au Soleil, en jaune ; cinq à Vénus, en vert ; cinq à Mercure, en couleurs mêlées ; six à la Lune, en argent.", ref:"Clé de Salomon, « l'ordre des pentacles », éd. Mathers, 1889", st:"doc"},
      schema:"pentcat",
      ex:{t:"Trier les pentacles", txt:"Dans le catalogue, parcours les pentacles planète par planète. Lequel répond le mieux à une inquiétude que tu as en ce moment ? Lis son verset à voix haute.", outil:"outil:pentacles"},
      carnet:"Le pentacle « pour soi » qui me parle, et pourquoi :",
      marge:[{t:"Mathers", txt:"Il travaillait au British Museum pendant que naissait la Golden Dawn. Sa Clé de Salomon reste l'édition de référence."},
             {t:"Un garde-fou", txt:"Arcanes ne montre que les pentacles tournés vers soi."}] },
    { id:"m15l4", t:"Les pentacles du monde", sous:"Noms, caractères, carrés et médailles",
      idee:[
       "Hors de la Clavicule, on peut ranger les pentacles en quatre familles. Les <b>médailles de noms</b> d'abord : les sceaux de Moïse, imprimés à Stuttgart en 1849, et les soixante-douze pentacles des génies de Lenain, en 1823, dont chacun porte un nom tiré de trois versets de l'Exode.",
       "Puis les <b>caractères</b> : des signes faits de traits, qu'on ne lit pas mais qu'on reconnaît. L'<i>Arbatel</i>, publié à Bâle en 1575, en donne un pour chacun de ses sept « gouverneurs olympiques », un par planète. C'est un livre étonnamment sobre, fait d'aphorismes sur la prière et la sagesse.",
       "Les <b>carrés</b> forment la troisième famille : le carré SATOR de Pompéi, les carrés planétaires d'Agrippa, et le <i>wafq</i> de la tradition arabe, dont le plus célèbre, le carré de trois, a donné un mot de protection, <i>budūḥ</i>. Enfin les <b>médailles de dévotion</b> : la médaille de saint Benoît et ses initiales latines, les pentacles imprimés et bénis de l'abbé Julio.",
       "À côté, une autre lignée : les <b>talismans d'image</b> du Picatrix et de Paracelse, où compte moins le texte que la figure gravée au bon moment. Toutes ces familles partagent une idée : une forme choisie avec soin, portée ou regardée, garde une intention présente."],
      source:{txt:"En toutes choses, demande conseil au Seigneur ; ne pense, ne dis et ne fais rien sans qu'il soit ton conseiller.", ref:"Arbatel, premier aphorisme, Bâle, 1575, traduction pour Arcanes", st:"doc"},
      schema:"pentmonde",
      ex:{t:"Ta famille", txt:"Parcours les onze fiches. Laquelle te ressemble le plus ? Ouvre aussi les 72 génies et entre ta date de naissance.", outil:"outil:pentacles"},
      carnet:"La famille de pentacles qui me parle, et ce qu'elle dit de moi :",
      marge:[{t:"Lenain", txt:"Ses 72 génies ont été popularisés au XXe siècle sous le nom d'anges gardiens."},
             {t:"Voir aussi", txt:"La galerie dans le cabinet.", go:"atelier:pentacles:monde"}] },
    { id:"m15l5", t:"Le moment et la matière", sous:"Le jour, l'heure, la Lune, le métal",
      idee:[
       "Un pentacle ne se trace pas n'importe quand. La Clavicule est formelle : tous, quelle que soit leur planète, se font au jour et à l'heure de <b>Mercure</b>, la Lune croissante, dans un signe d'air ou de terre. Mercure est le scribe des dieux : c'est l'heure de l'écriture.",
       "La tradition des talismans dit autre chose. Pour le Picatrix, puis pour Ficin et Agrippa, on grave l'image au jour et à l'heure de la <b>planète même</b>, quand elle est forte dans le ciel. Le cabinet d'Arcanes suit cette seconde règle, plus simple : un pentacle de Jupiter se trace un jeudi, à une heure de Jupiter.",
       "Les heures planétaires viennent du module III : on divise le jour et la nuit en douze heures inégales, gouvernées tour à tour par les sept planètes dans l'ordre chaldéen. La première heure du jour appartient à la planète du jour. La Lune, elle, doit croître : on fait grandir ce qu'on désire en même temps qu'elle.",
       "La matière suit la planète : le métal, ou un papier vierge, avec des encres aux couleurs consacrées. Aujourd'hui, on peut garder l'esprit de la règle sans la lettre. Choisir un moment, l'attendre, s'y rendre disponible : c'est déjà un acte d'attention, et c'est lui qui compte."],
      source:{txt:"Les pentacles se font toujours au jour et à l'heure de Mercure, la Lune étant dans un signe d'air ou de terre ; elle doit aussi être croissante.", ref:"Clé de Salomon, livre I, chapitre XVIII, d'après l'édition de Mathers, 1889", st:"doc"},
      schema:"pentmoment",
      ex:{t:"Prendre rendez-vous", txt:"Choisis ta planète dans le schéma et note dans ton agenda sa prochaine heure. Ce jour-là, à cette heure, prends dix minutes pour tracer ton pentacle à la main.", outil:"outil:pentacles"},
      carnet:"Le moment que j'ai choisi pour tracer mon pentacle :",
      marge:[{t:"Deux règles", txt:"La Clavicule : toujours Mercure. Agrippa : la planète du pentacle. Les deux se défendent."},
             {t:"Voir aussi", txt:"Les heures planétaires, module III.", go:"atelier:election"}] },
    { id:"m15l6", t:"Composer et consacrer", sous:"Ton pentacle, en sept étapes et sept jours",
      idee:[
       "Composer un pentacle, c'est répondre à sept questions. Que veux-tu cultiver en toi ? Dans quel esprit, Salomon, Agrippa, la Golden Dawn, une médaille ? Combien de couronnes, quelle figure ? Que mettre au centre ? En quelles écritures ? À quel moment ? Et où le garder ? L'atelier du cabinet pose ces questions dans cet ordre.",
       "Une seule règle d'Arcanes : l'intention est <b>pour toi</b>, au présent. « Je trouve le calme », « j'apprends chaque jour », jamais « qu'il revienne » ou « qu'elle échoue ». Un pentacle qui vise quelqu'un d'autre n'a pas sa place ici, pas plus que dans les pages de la Clavicule que le cabinet a laissées de côté.",
       "La Clavicule demande ensuite de <b>consacrer</b> le pentacle : on le passe dans la fumée de l'encens en récitant des psaumes, on l'enveloppe de soie, on le garde à l'abri. Le rituel guidé d'Arcanes en garde l'esprit : regarder le pentacle partie par partie, lire sa couronne, dire son intention, faire un geste simple.",
       "Vient alors ce qui compte vraiment : <b>sept jours de regard</b>. Chaque jour, une minute devant ton pentacle, puis une ligne dans le carnet : ce que tu as remarqué, ce qui a changé. Ce que fait le pentacle, c'est ce que fait toute image qu'on choisit avec soin et qu'on garde sous les yeux : il rappelle une intention. Arcanes ne promet rien de plus, et c'est déjà quelque chose."],
      source:{txt:"Tu les passeras dans la fumée de l'encens, puis tu les envelopperas d'une étoffe de soie, et tu les garderas pour t'en servir.", ref:"D'après la Clé de Salomon, livre I, chapitre XVIII, éd. Mathers, 1889", st:"doc"},
      schema:"pentcompose",
      ex:{t:"Sept jours de regard", txt:"Compose ton pentacle, garde-le dans le carnet et lance la consécration guidée. Puis, sept jours de suite, regarde-le une minute et écris une ligne.", outil:"rituel:consacrer"},
      carnet:"Jour 1 de mon regard : ce que je remarque en regardant mon pentacle",
      marge:[{t:"Le geste", txt:"Pas d'encens ? Pose simplement la main sur le pentacle. Le geste compte plus que l'objet."},
             {t:"Voir aussi", txt:"Composer un rituel autour de ton intention.", go:"atelier:composer"}] }
  ];
  const Q15 = [
    {q:"Combien de pentacles compte la Clé de Salomon éditée par Mathers ?", r:["Quarante-quatre","Soixante-douze","Vingt-deux","Sept"], ok:0, exp:"Sept pour Saturne, Jupiter, Mars et le Soleil, cinq pour Vénus et Mercure, six pour la Lune."},
    {q:"Qu'est-ce qui court entre les deux cercles d'un pentacle de la Clavicule ?", r:["Un verset de la Bible en hébreu","Le nom de l'opérateur","Une date","Les douze signes"], ok:0, exp:"Le verset dit ce que le pentacle doit accomplir."},
    {q:"Quel carré de lettres, trouvé à Pompéi, devient un pentacle de Saturne ?", r:["SATOR AREPO","ABRACADABRA","AGLA","INRI"], ok:0, exp:"Le deuxième pentacle de Saturne."},
    {q:"D'où Lenain tire-t-il les noms de ses 72 génies ?", r:["De trois versets de l'Exode","Du Zohar","Des Psaumes","De l'Apocalypse"], ok:0, exp:"Exode 14, 19-21 : trois versets de 72 lettres, lus en boustrophédon."},
    {q:"Que disent les lettres V R S de la médaille de saint Benoît ?", r:["Vade retro Satana, « arrière, Satan »","Veritas, Regnum, Salus","Venite, Ridete, Sanate","Le nom d'un abbé"], ok:0, exp:"C'est une formule de refus, pas une attaque."},
    {q:"Selon la Clavicule, au jour de quelle planète se font tous les pentacles ?", r:["Mercure","Le Soleil","La planète du pentacle","Saturne"], ok:0, exp:"Mercure, l'heure de l'écriture. Agrippa, lui, prend la planète du talisman."},
    {q:"Dans la Golden Dawn, que représente le pentacle ?", r:["L'élément Terre","L'élément Feu","La Lune","L'esprit"], ok:0, exp:"C'est l'un des quatre instruments élémentaires, et l'origine des Pentacles du tarot Waite-Smith."}
  ];
  const ETOF15 = {
   m15l1:{acc:"Une médaille couverte de lettres hébraïques, qu'on montre aux esprits : avant d'être un symbole de séries télévisées, le pentacle était un objet précis, avec ses règles.",
     conf:[["Un pentacle est une étoile à cinq branches.","C'est un pentagramme. Le pentacle est une médaille gravée ou tracée, qui peut porter une étoile à cinq ou six branches, ou aucune."],
           ["La Clé de Salomon date du roi Salomon.","Ses plus anciens manuscrits datent du XVe siècle. L'attribution est une signature de prestige."]],
     ret:["Amulette : protège par elle-même. Talisman : tient sa force de l'heure.","Sceau : une marque. Pentacle : médaille de noms et de figures.","Le pentacle n'appartient pas qu'à Salomon."],
     prat:["Classe trois objets que tu possèdes : amulette, talisman, souvenir, ou rien de tout cela ?"],
     loin:["Owen Davies, <i>Grimoires : A History of Magic Books</i>, Oxford, 2009 : l'histoire des livres de magie, de l'Antiquité aux éditions de colportage."]},
   m15l2:{acc:"Un pentacle se lit comme une phrase : une frontière, une couronne, un centre, des écritures, une matière, un moment.",
     conf:[["Les signes d'un pentacle sont secrets et intraduisibles.","La plupart sont des noms divins et des versets parfaitement lisibles. Seuls les « caractères » viennent d'alphabets inventés, que le module XVI t'apprend à lire."]],
     ret:["Frontière, couronne, centre, écritures, matière, moment.","Le verset dit le but, par analogie.","À chaque planète son métal et sa couleur."],
     prat:["Prends une médaille ou une pièce de monnaie : retrouve sa frontière, sa couronne et son centre."]},
   m15l3:{acc:"Quarante-quatre médailles, et autant de fenêtres sur les peurs et les espoirs de ceux qui les traçaient.",
     conf:[["Tous les manuscrits ont les mêmes pentacles.","Le nombre, l'ordre, les versets et les noms varient beaucoup. L'un n'en a que treize, un autre aucun."]],
     ret:["7 + 7 + 7 + 7 + 5 + 5 + 6 = 44.","Quatre usages : esprits, soi, nature, autrui.","Arcanes ne montre que ceux qui sont pour soi."],
     loin:["S. L. MacGregor Mathers, <i>The Key of Solomon the King</i>, Londres, 1889."]},
   m15l4:{acc:"De Pompéi à Stuttgart, de Bâle au Caire : le pentacle a eu mille visages.",
     conf:[["L'Arbatel est un grimoire de démons.","C'est un livre d'aphorismes sur la prière, la sagesse et la sobriété. Ses « esprits olympiques » gouvernent les planètes."],
           ["Les 72 anges gardiens viennent de la Bible.","Les noms sont tirés de l'Exode par une lecture kabbalistique ; leur rôle de génies du jour de naissance date de Lenain, en 1823."]],
     ret:["Quatre familles : noms, caractères, carrés, médailles.","Et une lignée à part : les talismans d'image.","Arbatel, 1575 ; Lenain, 1823 ; Moïse, 1849."],
     loin:["Joseph H. Peterson, éd., <i>Arbatel : Concerning the Magic of the Ancients</i>, 2009 : le texte latin et sa traduction.","Lenain, <i>La Science cabalistique</i>, 1823, souvent réédité."]},
   m15l5:{acc:"Un pentacle a une heure de naissance, comme une personne.",
     conf:[["Il faut absolument respecter l'heure, sinon le pentacle ne vaut rien.","Les traditions ne sont même pas d'accord entre elles. Ce qui reste, c'est le choix d'un moment, et l'attention qu'il demande."]],
     ret:["Clavicule : jour et heure de Mercure, Lune croissante.","Picatrix, Agrippa : la planète du talisman.","Les heures planétaires suivent l'ordre chaldéen."],
     prat:["Pendant une semaine, regarde chaque matin la planète du jour et de l'heure. Note si elle colore ta journée."],
     loin:["<i>Picatrix</i>, trad. anglaise de John Michael Greer et Christopher Warnock, 2010-2011."]},
   m15l6:{acc:"Un emblème qu'on regarde chaque jour finit par regarder en nous.",
     conf:[["Un pentacle agit tout seul, une fois fait.","Il rappelle une intention. C'est le regard quotidien qui fait le travail."]],
     ret:["Une intention pour soi, au présent.","Consacrer : regarder, lire, dire, faire un geste.","Sept jours de regard, une ligne par jour."],
     prat:["Garde ton pentacle là où tu le verras chaque matin : sur le bureau, dans un carnet, en fond d'écran."]}
  };
  const m15 = K.MODULES.find(m => m.id === "m15");
  if(m15){ m15.sous = "Médailles, sceaux et carrés, de Salomon à ton atelier"; m15.lecons = L15; m15.quiz = Q15; }
  Object.assign(window.MAGIE_ETOFFE = window.MAGIE_ETOFFE || {}, ETOF15);

  /* ================================================================
     LE MODULE XVI : LES ÉCRITURES SECRÈTES
     ================================================================ */
  const M16 = { id:"m16", n:"XVI", cercle:2, t:"Les écritures secrètes", sous:"Hébreu, grec, thébain et les alphabets des anges", img:"ecr",
   lecons:[
    { id:"m16l1", t:"Pourquoi des écritures secrètes ?", sous:"Lettres de création, lettres à anneaux",
      idee:[
       "Pour les kabbalistes, les lettres ne notent pas seulement des sons. Le <i>Sefer Yetsirah</i>, le « Livre de la formation », affirme que Dieu a créé le monde par vingt-deux lettres et dix nombres. Écrire un nom, c'est manier un fragment de la création : on comprend pourquoi les pentacles sont couverts de lettres.",
       "Les magiciens de l'Égypte romaine, eux, couvraient leurs amulettes de <b>caractères</b> : des signes faits de traits terminés par de petits cercles, qu'on appelle les « lettres à anneaux ». On les retrouve dans les papyrus magiques grecs et sur les amulettes byzantines. Les écritures d'Agrippa en héritent.",
       "À la Renaissance, l'écriture secrète devient une science. En 1518 paraît la <i>Polygraphia</i> de Jean Trithème, abbé bénédictin, le premier traité imprimé de cryptographie : il y donne l'alphabet thébain. Son élève Agrippa reprend ces alphabets au livre III de la <i>Philosophie occulte</i>, en 1533. Dans les années 1580, John Dee et Edward Kelley disent recevoir des anges un alphabet entier, l'énochien.",
       "Pourquoi écrire dans une langue que personne ne lit ? Pour cacher, parfois. Mais surtout pour <b>séparer</b> : l'écriture secrète fait de la page un lieu à part, comme le cercle fait de la pièce un temple. Et pour <b>ralentir</b> : on ne trace pas une lettre inconnue sans y faire attention."],
      source:{txt:"Vingt-deux lettres fondamentales : il les a gravées, taillées, pesées, permutées et combinées, et il a formé par elles toute créature.", ref:"Sefer Yetsirah, chapitre II, 2, traduction pour Arcanes", st:"doc"},
      schema:"ecrcompare",
      ex:{t:"Ton prénom, sept fois", txt:"Écris ton prénom dans les sept écritures. Laquelle te semble la plus juste ? Recopie-la à la main trois fois, lentement.", outil:"outil:ecritures"},
      carnet:"Mon prénom dans l'écriture que je choisis, et pourquoi :",
      marge:[{t:"Trithème", txt:"Il a aussi écrit la <i>Steganographia</i>, un traité de cryptographie déguisé en livre d'anges."},
             {t:"Voir aussi", txt:"Les lettres et les nombres, module XII.", go:"lec:m12l1"}] },
    { id:"m16l2", t:"L'hébreu sans voyelles", sous:"Vingt-deux lettres, trois familles, un nombre chacune",
      idee:[
       "L'hébreu s'écrit de droite à gauche, avec vingt-deux lettres qui sont toutes des consonnes. Les voyelles sont de petits points ajoutés sous les lettres au haut Moyen Âge ; les pentacles n'en mettent jamais. Cinq lettres changent de forme à la fin d'un mot : Kaph, Mem, Noun, Pé et Tsadé.",
       "Le <i>Sefer Yetsirah</i> range les lettres en trois familles. Les trois <b>mères</b>, Aleph, Mem et Shin, sont l'air, l'eau et le feu. Les sept <b>doubles</b>, qui avaient deux prononciations, sont les sept planètes. Les douze <b>simples</b> sont les douze signes du zodiaque. La Golden Dawn a posé sur ces vingt-deux lettres les vingt-deux arcanes majeurs du tarot.",
       "Chaque lettre est aussi un <b>nombre</b> : Aleph vaut 1, Yod 10, Qoph 100, Tav 400. Un mot a donc une valeur, et deux mots de même valeur ont un lien secret : c'est la guématrie, vue au module XII.",
       "Pour écrire un mot français en hébreu, on garde les consonnes. Les voyelles disparaissent, ou deviennent des lettres d'appui : Vav pour <i>o</i>, <i>ou</i> et <i>u</i>, Yod pour <i>i</i>, Aleph au début du mot, Hé pour un <i>a</i> final. Il y a souvent deux transcriptions possibles : ce qui compte, c'est de garder la même."],
      source:{txt:"Vingt-deux lettres : trois mères, sept doubles et douze simples.", ref:"Sefer Yetsirah, chapitre I, 2, traduction pour Arcanes", st:"doc"},
      schema:"ecrheb",
      ex:{t:"La valeur de ton nom", txt:"Transcris ton prénom dans le schéma et lis sa valeur. Cherche un autre mot qui a la même : pour un kabbaliste, ils se répondent."},
      carnet:"Mon prénom en hébreu, sa valeur, et un mot qui vaut autant :",
      marge:[{t:"Les finales", txt:"ך ם ן ף ץ : on les trace à la fin d'un mot. Dans les écritures d'Agrippa, elles reprennent la forme ordinaire."},
             {t:"Voir aussi", txt:"La Kabbale hermétique, module V.", go:"lec:m5l1"}] },
    { id:"m16l3", t:"Le grec des gemmes", sous:"Abrasax, les sept voyelles et l'isopséphie",
      idee:[
       "Dans l'Égypte romaine, la langue de la magie savante est le grec. Les papyrus magiques grecs, écrits entre le IIe siècle avant notre ère et le Ve siècle, mêlent dieux égyptiens, noms hébreux et formules grecques. On y apprend à graver des pierres, à écrire des noms en triangle, à chanter des voyelles.",
       "Les pierres gravées de ce temps portent souvent un nom : <b>Abrasax</b>, ou Abraxas, avec une figure à tête de coq et aux jambes de serpent. En grec, chaque lettre est aussi un nombre, comme en hébreu : c'est l'<b>isopséphie</b>. Or les lettres d'ΑΒΡΑΣΑΞ font 365, le nombre des jours de l'année.",
       "Les sept voyelles grecques, Α Ε Η Ι Ο Υ Ω, répondent aux sept planètes, de la Lune à Saturne. Les papyrus les font chanter en longues suites, et le nom ΙΑΩ, forme grecque du nom divin hébreu, revient sans cesse sur les amulettes.",
       "Arcanes transcrit le français en capitales grecques, comme sur les gemmes, lettre à lettre : <i>th</i> donne Θ, <i>ph</i> Φ, <i>ch</i> Χ, <i>ps</i> Ψ, <i>x</i> Ξ ; le <i>é</i> devient êta, Η, le <i>ô</i> oméga, Ω."],
      source:{txt:"Le prince de ces cieux s'appelle Abrasax, et c'est pourquoi il contient en lui le nombre 365.", ref:"Irénée de Lyon, Contre les hérésies, I, 24, 7, vers 180, traduction pour Arcanes", st:"doc"},
      schema:"ecrgrec",
      ex:{t:"Vérifier Abrasax", txt:"Écris « Abrasax » dans le schéma : retrouves-tu 365 ? Puis calcule la valeur de ton prénom en grec."},
      carnet:"Mon prénom en grec et sa valeur :",
      marge:[{t:"Isopséphie", txt:"Du grec <i>isos</i>, « égal », et <i>psêphos</i>, « caillou » : les cailloux du calcul."},
             {t:"Voir aussi", txt:"Ficin et les hymnes des planètes, module X.", go:"lec:m10l2"}] },
    { id:"m16l4", t:"Le thébain et les écritures d'Agrippa", sous:"Honorius, les étoiles, les anges et le fleuve",
      idee:[
       "Le <b>thébain</b> paraît d'abord chez Trithème, en 1518, qui l'attribue à Honorius de Thèbes, un magicien légendaire, par l'intermédiaire de Pierre d'Abano. Agrippa le reprend. Il suit l'alphabet latin de la Renaissance, sans J, sans V, sans W. Au XXe siècle, la Wicca l'adopte : on l'appelle depuis « l'alphabet des sorcières ».",
       "Au chapitre 30 du livre III, Agrippa donne trois autres écritures. L'écriture <b>céleste</b>, que les kabbalistes, dit-il, lisent dans la figure des étoiles. L'écriture des <b>Malachim</b>, des anges ou des messagers, qu'on dit aussi royale. Et le <b>passage du fleuve</b>, <i>Transitus fluvii</i>, qui rappelle les exilés de Babylone repassant l'Euphrate.",
       "Toutes trois suivent l'alphabet hébreu, lettre pour lettre, et s'écrivent de droite à gauche. Leurs petits cercles au bout des traits viennent des lettres à anneaux de l'Antiquité. Pour écrire un mot français dans ces écritures, on le transcrit donc d'abord en hébreu.",
       "On les retrouve dans les grimoires, où elles donnent aux noms divins un air d'étrangeté, et dans plusieurs pentacles de la Clavicule. Elles ne cachent pas grand-chose : n'importe qui ayant le tableau peut les lire. Leur vrai pouvoir est ailleurs : elles obligent la main à ralentir."],
      source:{txt:"Il est une autre écriture, que les kabbalistes appellent céleste, parce qu'ils la montrent disposée et figurée parmi les étoiles.", ref:"Agrippa, De la philosophie occulte, livre III, chapitre 30, 1533, traduction pour Arcanes", st:"doc"},
      schema:"ecrjeu",
      ex:{t:"Dix d'affilée", txt:"Dans le schéma, reconnais les lettres jusqu'à en trouver dix d'affilée. Commence par le thébain, finis par le passage du fleuve.", outil:"outil:ecritures"},
      carnet:"L'écriture d'Agrippa que je préfère tracer, et ce qu'elle m'évoque :",
      marge:[{t:"Pierre d'Abano", txt:"Médecin et astrologue de Padoue, mort vers 1316. On lui a prêté plus de livres de magie qu'il n'en a écrit."},
             {t:"Voir aussi", txt:"Le traducteur d'écritures.", go:"outil:ecritures"}] },
    { id:"m16l5", t:"Les signes et ton propre code", sous:"Idéogrammes, monogrammes, et la règle d'or",
      idee:[
       "Les signes des planètes sont plus anciens que les alphabets secrets. Les alchimistes les ont étendus aux métaux, aux éléments, aux opérations : ☉ pour l'or, ☽ pour l'argent, 🜍 pour le soufre, 🜔 pour le sel. Des recettes entières s'écrivaient ainsi. Un signe ne note pas un son : il remplace un mot entier. C'est un <b>idéogramme</b>.",
       "En 1564, John Dee pousse l'idée jusqu'au bout avec sa <b>Monade hiéroglyphique</b> : un seul signe qui contient la Lune, le Soleil, les éléments et le feu, et d'où il prétend tirer toute la philosophie. Le sigil du module VII procède de la même façon : on superpose des lettres jusqu'à n'avoir plus qu'une forme.",
       "Tu peux construire ton propre code. Choisis une écriture par usage : une pour ton nom, une autre pour ta devise. Remplace certains mots par leur signe. Garde la même transcription d'un pentacle à l'autre. Le cabinet d'Arcanes te laisse choisir une écriture pour chaque couronne.",
       "La règle d'or : le secret n'est pas le but. Trithème cachait des messages ; toi, tu cherches l'attention. Une écriture qu'il faut déchiffrer lentement oblige à relire son intention, et c'est pour cela qu'elle vaut la peine."],
      source:{txt:"Que celui qui ne comprend pas se taise, ou qu'il apprenne.", ref:"John Dee, Monas hieroglyphica, Anvers, 1564, page de titre, traduction pour Arcanes", st:"doc"},
      schema:"ecrideo",
      ex:{t:"Ta devise en signes", txt:"Écris ta devise en remplaçant au moins deux mots par des signes, puis recopie-la au dos de ton pentacle.", outil:"outil:pentacles"},
      carnet:"Ma devise, écrite dans mon propre code :",
      marge:[{t:"La Monade", txt:"Dee la dessinait avec le signe du Bélier à sa base : le feu qui commence l'œuvre."},
             {t:"Voir aussi", txt:"Les sigils, module VII.", go:"lec:m7l1"}] }
   ],
   quiz:[
    {q:"Combien de lettres compte l'alphabet hébreu ?", r:["Vingt-deux","Vingt-six","Vingt-quatre","Dix-huit"], ok:0, exp:"Trois mères, sept doubles et douze simples."},
    {q:"Quelles sont les trois lettres mères ?", r:["Aleph, Mem, Shin","Yod, Hé, Vav","Beth, Gimel, Daleth","Aleph, Beth, Tav"], ok:0, exp:"L'air, l'eau et le feu, selon le Sefer Yetsirah."},
    {q:"Que vaut ΑΒΡΑΣΑΞ en isopséphie ?", r:["365","72","666","22"], ok:0, exp:"1 + 2 + 100 + 1 + 200 + 1 + 60 = 365, les jours de l'année."},
    {q:"Qui publie l'alphabet thébain en 1518 ?", r:["Jean Trithème","John Dee","Éliphas Lévi","Paracelse"], ok:0, exp:"Dans la Polygraphia, le premier traité imprimé de cryptographie."},
    {q:"Sur quel alphabet se calquent l'écriture céleste, les Malachim et le passage du fleuve ?", r:["L'hébreu","Le latin","Le grec","L'arabe"], ok:0, exp:"Lettre pour lettre, de droite à gauche."},
    {q:"D'où viennent les petits cercles au bout des traits ?", r:["Des « lettres à anneaux » des amulettes antiques","De l'écriture chinoise","Des notes de musique","Des runes"], ok:0, exp:"Les papyrus magiques grecs et les amulettes byzantines en sont couverts."}
   ]};
  const ETOF16 = {
   m16l1:{acc:"Une lettre qu'on ne sait pas lire, on la regarde. C'est tout le secret des écritures secrètes.",
     conf:[["Les écritures magiques sont des langues.","Ce sont des alphabets : ils transcrivent l'hébreu ou le latin. Seul l'énochien de Dee prétend être une langue."]],
     ret:["Sefer Yetsirah : le monde fait de lettres.","Les lettres à anneaux de l'Antiquité.","Trithème 1518, Agrippa 1533, Dee vers 1580."],
     loin:["Hans Dieter Betz, éd., <i>The Greek Magical Papyri in Translation</i>, Chicago, 1986."]},
   m16l2:{acc:"Vingt-deux lettres, et pas une voyelle : l'hébreu laisse au lecteur le soin de faire vivre les mots.",
     conf:[["Il n'y a qu'une bonne transcription d'un nom en hébreu.","Il y en a souvent plusieurs. L'important est de rester cohérent."]],
     ret:["De droite à gauche, sans voyelles, cinq finales.","Trois mères, sept doubles, douze simples.","Chaque lettre est un nombre."],
     prat:["Transcris trois prénoms de proches, et compare leurs valeurs."]},
   m16l3:{acc:"Une pierre grosse comme un ongle, un coq à jambes de serpent, et sept lettres qui font une année.",
     conf:[["Abraxas est un démon.","Sur les gemmes antiques, c'est un nom divin protecteur. Sa réputation démoniaque date des démonologues de la Renaissance."]],
     ret:["Les papyrus magiques grecs.","ΑΒΡΑΣΑΞ = 365.","Sept voyelles, sept planètes."]},
   m16l4:{acc:"Des étoiles reliées par des traits, des anges, un fleuve : trois manières de faire étranger l'hébreu.",
     conf:[["Le thébain est un alphabet médiéval de sorcières.","Il paraît chez Trithème en 1518 ; la Wicca l'adopte au XXe siècle."]],
     ret:["Thébain : alphabet latin, Trithème, 1518.","Céleste, Malachim, passage du fleuve : alphabet hébreu, Agrippa III, 30.","On transcrit d'abord en hébreu."],
     prat:["Écris la liste de tes courses de la semaine en thébain."]},
   m16l5:{acc:"Un signe vaut parfois mille lettres.",
     conf:[["Un code secret protège une intention.","Il la rend surtout plus lente à lire, donc plus présente."]],
     ret:["Idéogramme : un signe pour un mot.","La Monade de Dee : un signe pour tout.","Une écriture par usage, toujours la même."],
     loin:["John Dee, <i>Monas hieroglyphica</i>, 1564 ; trad. française de Grillot de Givry, 1925."]}
  };
  if(!K.MODULES.find(m => m.id === "m16")) K.MODULES.push(M16);
  Object.assign(window.MAGIE_ETOFFE, ETOF16);
  /* l'image du module XVI est déclarée dans magie-img.js, chargé à la première visite : ne pas créer MAGIE_IMG ici */
  _.CRED.ecr = "L'écriture céleste, d'après Agrippa, De occulta philosophia, livre III, chapitre 30, 1533 (planche redessinée pour Arcanes)";

  /* ================================================================
     LES SCHÉMAS
     ================================================================ */
  const HV = {aleph:1, beth:2, gimel:3, daleth:4, he:5, vau:6, zain:7, cheth:8, teth:9, iod:10, caph:20, lamed:30, mem:40, nun:50, samech:60, ain:70, pe:80, zade:90, kuff:100, res:200, shin:300, tau:400};
  const FAM = k => ["aleph","mem","shin"].includes(k) ? "mère" : ["beth","gimel","daleth","caph","pe","res","tau"].includes(k) ? "double" : "simple";
  const GV = {"Α":1,"Β":2,"Γ":3,"Δ":4,"Ε":5,"Ζ":7,"Η":8,"Θ":9,"Ι":10,"Κ":20,"Λ":30,"Μ":40,"Ν":50,"Ξ":60,"Ο":70,"Π":80,"Ρ":100,"Σ":200,"Τ":300,"Υ":400,"Φ":500,"Χ":600,"Ψ":700,"Ω":800};
  const HNOM = Object.fromEntries(E.HL.map(x => [x[0], x[2]])), HCH = Object.fromEntries(E.HL.map(x => [x[0], x[1]]));
  const draft = (k, def) => { const s = st(); return typeof (s.ecrDraft) === "string" && s.ecrDraft.trim() ? s.ecrDraft : def; };
  const input = (v, ph) => `<label class="ec-in sm"><span>Un mot ou un prénom</span><input type="text" maxlength="40" value="${h(v)}" placeholder="${ph}" data-xin autocomplete="off" spellcheck="false"></label>`;
  const live = (fig, f) => { const i = q1("[data-xin]", fig); i.oninput = () => { st().ecrDraft = i.value; save(); f(i.value); }; f(i.value); };

  Object.assign(_.schemas, {
    /* toutes les écritures d'un coup */
    ecrcompare: fig => {
      fig.innerHTML = `<div class="xs">${input(draft(0, "Lumière"), "Par exemple : lumière")}<div class="xs-rows"></div></div>`;
      live(fig, v => { q1(".xs-rows", fig).innerHTML = E.LIST.map(e => `<div class="xs-row"><b>${e.court}</b><div class="ec-out${e.dir === "rtl" ? " rtl" : ""}">${(v || "").trim() ? E.lineSVG(v, e.id, {h:26}).svg : ""}</div></div>`).join(""); });
    },
    /* l'hébreu lettre à lettre, avec familles et valeurs */
    ecrheb: fig => {
      fig.innerHTML = `<div class="xs">${input(draft(0, "Arthur"), "Par exemple : Arthur")}<div class="xs-heb"></div></div>`;
      live(fig, v => { const L = E.hebWord((v || "").split(/\s+/)[0] || ""), tot = L.reduce((a, x) => a + HV[x.k], 0);
        q1(".xs-heb", fig).innerHTML = L.length ? `<p class="xs-big" lang="he" dir="rtl">${E.hebText((v || "").split(/\s+/)[0])}</p>
          <div class="xs-cards rtl">${L.map(x => `<span class="xs-c f-${FAM(x.k) === "mère" ? "m" : FAM(x.k) === "double" ? "d" : "s"}"><i lang="he">${HCH[x.k]}</i><b>${HNOM[x.k]}</b><small>${HV[x.k]} · ${FAM(x.k)}</small><em>${h(x.src || "·")}</em></span>`).join("")}</div>
          <p class="xs-tot">Valeur : <b>${L.map(x => HV[x.k]).join(" + ")} = ${tot}</b></p>
          <p class="help m-left">En rouge les mères, en bleu les doubles, en vert les simples. Sous chaque lettre, ce qu'elle transcrit.</p>` : `<p class="help m-left">Écris un mot pour le voir en hébreu.</p>`; });
    },
    /* le grec et l'isopséphie */
    ecrgrec: fig => {
      const VOY = [["Α","la Lune"],["Ε","Mercure"],["Η","Vénus"],["Ι","le Soleil"],["Ο","Mars"],["Υ","Jupiter"],["Ω","Saturne"]];
      fig.innerHTML = `<div class="xs">${input("Abrasax", "Par exemple : Abrasax")}<div class="xs-gr"></div>
        <p class="pm-lab">Les sept voyelles et les sept planètes</p><div class="xs-voy">${VOY.map(v => `<span><b>${v[0]}</b><small>${v[1]}</small></span>`).join("")}</div></div>`;
      const i = q1("[data-xin]", fig);
      const f = v => { const g = E.grText(v || ""), letters = [...g.replace(/\s/g, "")], tot = letters.reduce((a, c) => a + (GV[c] || 0), 0);
        q1(".xs-gr", fig).innerHTML = letters.length ? `<p class="xs-big gr">${g}</p><div class="xs-cards">${letters.map(c => `<span class="xs-c"><i class="gr">${c}</i><small>${GV[c] || 0}</small></span>`).join("")}</div><p class="xs-tot">Valeur : <b>${letters.map(c => GV[c] || 0).join(" + ")} = ${tot}</b>${tot === 365 ? " : les jours de l'année." : ""}</p>` : `<p class="help m-left">Écris un mot.</p>`; };
      i.oninput = () => f(i.value); f(i.value);
    },
    /* reconnaître les lettres */
    ecrjeu: fig => {
      const SC = [["theban","Thébain"],["celeste","Céleste"],["malachim","Malachim"],["passage","Passage du fleuve"]];
      let sc = "theban", serie = 0, best = 0, cur = null, done = false;
      const keys = () => Object.keys(E.GL[sc]);
      const label = k => sc === "theban" ? (k === "I" ? "I ou J" : k === "U" ? "U ou V" : k) : `${HNOM[k]} <span lang="he">${HCH[k]}</span>`;
      const pick = () => { const K0 = keys(); const k = K0[Math.floor(Math.random()*K0.length)]; const opts = new Set([k]); while(opts.size < 4) opts.add(K0[Math.floor(Math.random()*K0.length)]); cur = {k, opts:[...opts].sort(() => Math.random() - .5)}; done = false; };
      const draw = msg => {
        fig.innerHTML = `<div class="xs xs-jeu"><div class="sc-seg m-seg" role="group" aria-label="Écriture">${SC.map(x => `<button type="button" data-xj="${x[0]}" aria-pressed="${x[0] === sc}">${x[1]}</button>`).join("")}</div>
          <div class="xs-q"><span class="xs-gl">${E.glyphMini(sc, cur.k)}</span><p>Quelle est cette lettre ?</p></div>
          <div class="xs-opts">${cur.opts.map(k => `<button type="button" class="chip${done && k === cur.k ? " on ok" : ""}" data-xo="${k}"${done ? " disabled" : ""}>${label(k)}</button>`).join("")}</div>
          <p class="xs-msg" aria-live="polite">${msg || `Série : <b>${serie}</b>${best ? ` · record : ${best}` : ""}`}</p>
          ${done ? `<div class="m-acts"><button type="button" class="btn small" data-xn>Lettre suivante</button></div>` : ""}</div>`;
        qa("[data-xj]", fig).forEach(b => b.onclick = () => { sc = b.dataset.xj; serie = 0; pick(); draw(); });
        qa("[data-xo]", fig).forEach(b => b.onclick = () => { done = true; const ok = b.dataset.xo === cur.k;
          if(ok){ serie++; best = Math.max(best, serie); } else serie = 0;
          draw(ok ? (serie >= 10 ? `<b>Dix d'affilée !</b> Tu lis le ${SC.find(x => x[0] === sc)[1].toLowerCase()}.` : `Juste. Série : <b>${serie}</b>`) : `C'était <b>${label(cur.k)}</b>. La série repart de zéro.`); });
        const n = q1("[data-xn]", fig); if(n) n.onclick = () => { pick(); draw(); };
      };
      pick(); draw();
    },
    /* les idéogrammes */
    ecrideo: fig => {
      const G = [["Les planètes et les métaux", 0, 7], ["Les éléments et les principes", 7, 21], ["Les signes du zodiaque", 21, 33]];
      fig.innerHTML = `<div class="xs"><label class="ec-in sm"><span>Une phrase</span><input type="text" maxlength="80" value="Le soleil et la lune sur le sel" data-xin autocomplete="off"></label><p class="xs-big id"></p>
        ${G.map(g => `<p class="pm-lab">${g[0]}</p><div class="xs-ideo">${E.IDEO.slice(g[1], g[2]).map(x => `<span><b>${x[0]}</b><small>${x.slice(1).filter(w => !/^(venus|etain|belier|gemeaux|caducee|etoile|equilibre|purete|putrefaction)$/.test(w)).slice(0, 2).join(", ")}</small></span>`).join("")}</div>`).join("")}</div>`;
      const i = q1("[data-xin]", fig), o = q1(".xs-big", fig); i.oninput = () => { o.textContent = E.ideoText(i.value); }; i.oninput();
    },
    /* le moment d'une planète */
    pentmoment: fig => {
      let pl = ((st().pentDraft2 || {}).pl) || "jupiter";
      const draw = () => {
        const p = PL[pl], pp = PP(pl), now = new Date(), out = []; const seen = new Set();
        for(let d = 0; d < 9 && out.length < 3; d++){ let H = null; try{ H = M.hoursOf(new Date(now.getTime() + d*DAY)); }catch(e){} if(!H) continue;
          H.hours.forEach(x => { if(x.pl === pl && x.end > now && !seen.has(+x.start) && out.length < 3){ seen.add(+x.start); out.push(x); } }); }
        const mo = _.moon ? _.moon(now) : null;
        fig.innerHTML = `<div class="xs"><div class="pt-pls">${PLAN.map(q => `<button type="button" data-xp="${q.id}" aria-pressed="${q.id === pl}" style="--pc:${q.hex}"><b>${(PL[q.id] || {}).gl}</b><small>${q.nom.replace(/^l[ea] /, "")}</small></button>`).join("")}</div>
          <dl class="xs-dl" style="--pc:${pp.hex}"><div><dt>Le jour</dt><dd>${cap(p.jour)}</dd></div><div><dt>Le métal</dt><dd>${cap(pp.metal.replace(/^l'/, ""))}</dd></div><div><dt>La couleur</dt><dd>${cap(pp.coul)}</dd></div><div><dt>La Lune aujourd'hui</dt><dd>${mo ? `${mo.nom}, ${mo.croit ? "croissante" : "décroissante"}` : "—"}</dd></div></dl>
          <p class="pm-lab">Les prochaines heures ${pp.nom.startsWith("la ") ? "de la " + pp.nom.slice(3) : "de " + pp.nom}</p>
          ${out.length ? `<ul class="xs-hours">${out.map(x => `<li><b>${cap(_.fmt(x.start, {weekday:"long", day:"numeric", month:"long"}))}</b> de ${_.fmt(x.start, _.HM)} à ${_.fmt(x.end, _.HM)}</li>`).join("")}</ul>` : `<p class="help m-left">Les heures se calculent pour le lieu choisi en astrologie.</p>`}
          <p class="help m-left">Pour la Clavicule, tous les pentacles se font à l'heure de Mercure ; pour Agrippa, à celle de leur planète.</p></div>`;
        qa("[data-xp]", fig).forEach(b => b.onclick = () => { pl = b.dataset.xp; draw(); });
      };
      draw();
    }
  });

  /* ================================================================
     LE RITUEL GUIDÉ : LA CONSÉCRATION D'UN PENTACLE
     ================================================================ */
  const myPent = () => { const o = Object.assign({intent:"calme", pl:"lune", vi:2, devise:"Je trouve le calme", rings:[{src:"verset", script:"hebreu"}], fig:"aucune", ctr:"kamea"}, st().pentDraft2 || {}); return o; };
  X.vis.pentacle = n => { const o = myPent(); return `<div class="m-rite-pent on-${["tout","ring","ctr","tout"][n || 0]}" style="--pc:${PP(o.pl).hex}">${P2.compose(o, {label:"Ton pentacle"})}</div>`; };
  D.RITUELS.consacrer = { nom:"La consécration d'un pentacle", sous:"Regarder, lire, dire, garder", duree:"6 minutes", niveau:"Module 15", statut:"D'après la tradition",
    intro:"La Clavicule passe les pentacles dans la fumée de l'encens et les enveloppe de soie. Arcanes en garde l'esprit : un moment d'attention devant ton pentacle, puis sept jours de regard. Prends ton pentacle dessiné, ou garde l'écran devant toi.",
    build:() => { const o = myPent(), v = PT.VERSETS[o.vi || 0] || PT.VERSETS[0], dv = (o.devise || "").trim() || "Je trouve le calme", pp = PP(o.pl);
      const couronne = o.rings && o.rings[0] && o.rings[0].src === "verset" ? `« ${v[1]} »` : `« ${dv} »`;
      return {sous:`Ton pentacle ${pp.nom.startsWith("la ") ? "de la " + pp.nom.slice(3) : "de " + pp.nom}`, steps:[
        {t:"Se poser", txt:"Assieds-toi, le pentacle devant toi. Respire lentement, quatre temps pour inspirer, quatre pour expirer, trois fois.", vis:"pose", d:40},
        {t:"Regarder", txt:"Regarde ton pentacle en entier, sans rien chercher. Puis laisse ton regard faire le tour de la frontière, lentement.", vis:"pentacle:0", d:50},
        {t:"La couronne", txt:"Suis la couronne des yeux. Lis à voix haute, ou intérieurement :", dire:couronne, vis:"pentacle:1", d:35},
        {t:"Le centre", txt:"Pose ton regard au centre. Suis la figure du doigt, comme si tu la traçais.", vis:"pentacle:2", d:40},
        {t:"L'intention", txt:"Dis ton intention, au présent, pour toi :", dire:dv, vis:"pentacle:0", d:30},
        {t:"Le geste", txt:"Si tu en as, passe le pentacle dans la fumée d'un encens, puis enveloppe-le d'un tissu propre. Sinon, pose simplement la main dessus, quelques souffles.", vis:"pentacle:3", d:45},
        {t:"Garder", txt:"Range-le là où tu le verras chaque jour. Pendant sept jours, regarde-le une minute et écris une ligne dans le carnet.", vis:"pentacle:0", d:25}]}; } };

  /* le compte des leçons lues, quel que soit le numéro du module (m10 et suivants inclus) */
  window.MAGIE_COURS_PENT = {L15, M16, HV, GV};
})();
