/* ===== Arcanes · Alchimie : le cours =====
   Quatre modules de trois leçons. Chaque leçon : une accroche, l'idée en trois paragraphes, une source commentée,
   trois choses à retenir, une pratique sans danger, trois questions. Le champ « outil » relie la leçon à un outil du laboratoire. */
window.ALCH_COURS = [
  {id:"m1", t:"Les fondations", sous:"De quoi parle-t-on, et avec quelles idées ?", lec:[
    {id:"l1", t:"Qu'est-ce que l'alchimie ?", dur:6,
     acc:"On croit la connaître : des vieillards qui veulent changer le plomb en or. C'est vrai. Et c'est très incomplet.",
     idee:[
      "Pendant près de quinze siècles, de l'Égypte grecque au siècle des Lumières, l'alchimie a été l'art de transformer la matière. Elle poursuivait trois buts à la fois : perfectionner les métaux jusqu'à l'or (c'est la chrysopée), préparer des remèdes, et comprendre comment la nature fabrique les choses.",
      "Le mot nous vient de l'arabe al-kīmiyā', lui-même pris au grec. Son origine reste discutée : certains y lisent le nom égyptien de l'Égypte, « la terre noire », d'autres un verbe grec qui veut dire fondre. Jusque vers 1700, « alchimie » et « chimie » désignent la même activité. C'est seulement ensuite qu'on les oppose.",
      "Pourquoi y croyait-on ? Parce que l'idée était raisonnable. Dans les mines, on trouve de l'argent mêlé au plomb, et de l'or mêlé à l'argent. On en concluait que les métaux mûrissent sous terre, lentement, comme des fruits, et que l'or est le fruit mûr. L'alchimiste ne voulait pas tricher avec la nature : il voulait l'aider à aller plus vite."],
     src:{t:"Roger Bacon, Opus tertium, vers 1267", st:"doc", x:"Le franciscain anglais distingue deux alchimies. L'une, « spéculative », étudie comment toutes les choses naissent des éléments. L'autre, « opérative », apprend à fabriquer les métaux nobles, les couleurs et bien d'autres choses « mieux que la nature ne les fait ». Théorie et atelier : les deux moitiés de l'art sont déjà là."},
     ret:["L'alchimie est un art de la transformation, pas seulement une chasse à l'or.", "Le mot vient de l'arabe, et l'art de l'Égypte grecque.", "Jusqu'en 1700 environ, alchimie et chimie ne font qu'un."],
     prat:{t:"Trois transformations", x:"Aujourd'hui, repère trois transformations qu'on ne peut pas défaire : un œuf qui cuit, du sucre qui devient caramel, du pain qui grille. Pour chacune, note ce qui a changé : la couleur, l'odeur, la consistance. C'est exactement le regard de l'alchimiste : il juge une opération à ses signes."},
     quiz:[
      {q:"Que veut dire « chrysopée » ?", o:["La fabrication de l'or","L'art de distiller","La médecine par les plantes"], r:0, e:"Du grec khrusos, l'or. C'est le but le plus célèbre de l'alchimie, mais pas le seul."},
      {q:"Jusqu'à quand « alchimie » et « chimie » désignent-elles la même chose ?", o:["Jusqu'à l'an mil","Jusque vers 1700","Elles ont toujours été opposées"], r:1, e:"Les historiens parlent même de « chymie » pour désigner cette activité commune."},
      {q:"Pourquoi la transmutation paraissait-elle raisonnable ?", o:["Un texte sacré l'affirmait","On pensait que les métaux mûrissent sous terre","Des rois l'avaient vue"], r:1, e:"On trouvait l'argent mêlé au plomb dans les mines : on y voyait un plomb en train de mûrir."}]},
    {id:"l2", t:"Les quatre éléments", dur:6, outil:"elements",
     acc:"Le Feu, l'Air, l'Eau et la Terre ne sont pas quatre substances. Ce sont quatre manières d'être de la matière.",
     idee:[
      "Au Ve siècle avant notre ère, le Grec Empédocle propose que tout soit fait de quatre « racines » : le feu, l'air, l'eau et la terre. Un siècle plus tard, Aristote ajoute l'idée décisive. Chaque élément réunit deux qualités : le Feu est chaud et sec, l'Air chaud et humide, l'Eau froide et humide, la Terre froide et sèche.",
      "La conséquence est immense. Si l'on change une seule qualité, l'élément devient son voisin. Chauffe l'Eau (froide et humide) : elle devient vapeur, c'est-à-dire Air (chaud et humide). Toute matière peut donc, en principe, devenir une autre matière. La transmutation n'est pas un miracle : c'est une conséquence de la physique d'Aristote.",
      "Aristote ajoutait un cinquième élément, réservé au ciel : l'éther. Les alchimistes en feront la « quintessence », la part la plus pure d'une chose, qu'on extrait à force de distillations. Au XIVe siècle, Jean de Roquetaillade croit la tenir : c'est l'alcool, distillé et redistillé."],
     src:{t:"Aristote, De la génération et de la corruption, livre II", st:"doc", x:"C'est là qu'on lit que les éléments se changent les uns dans les autres, et que le passage est plus facile entre deux éléments qui partagent une qualité. Pendant deux mille ans, ce texte a servi de fondement théorique à toute l'alchimie."},
     ret:["Chaque élément réunit deux qualités : chaud ou froid, sec ou humide.", "Changer une qualité, c'est changer d'élément.", "La quintessence est le « cinquième élément », la part la plus pure."],
     prat:{t:"L'eau qui devient air", x:"Fais chauffer une casserole d'eau avec son couvercle. L'Eau reçoit du chaud : elle monte en vapeur, elle est devenue Air. Soulève le couvercle : au contact du métal froid, l'Air est redevenu Eau, en gouttes. Tu viens de faire tourner la roue des éléments, et de voir ce qui se passe dans un alambic."},
     quiz:[
      {q:"Quelles sont les deux qualités de l'Air ?", o:["Froid et sec","Chaud et humide","Chaud et sec"], r:1, e:"Chaud comme le Feu, humide comme l'Eau : il fait le lien entre les deux."},
      {q:"Que se passe-t-il si l'on change une qualité d'un élément ?", o:["Rien","Il devient un élément voisin","Il disparaît"], r:1, e:"C'est le fondement théorique de la transmutation."},
      {q:"Qu'est-ce que la quintessence ?", o:["Le cinquième élément, la part la plus pure","Un acide très fort","Le nom savant du mercure"], r:0, e:"« Quinte essence » : cinquième essence. Le mot est resté dans la langue courante."}]},
    {id:"l3", t:"Soufre, mercure et sel", dur:7,
     acc:"Le soufre des alchimistes n'est pas jaune, et leur mercure ne coule pas. Ce sont des principes, pas des produits.",
     idee:[
      "Les traités arabes signés Jābir posent une théorie qui va durer mille ans. Tous les métaux seraient faits de deux principes. Le soufre est ce qui, dans un métal, brûle et colore. Le mercure est ce qui le rend brillant et fusible. L'or serait un soufre et un mercure très purs, en équilibre parfait. Le plomb, les mêmes principes, mais impurs et mal proportionnés.",
      "L'idée change tout pour l'artisan. S'il n'y a entre le plomb et l'or qu'une différence de pureté et de proportion, alors il suffit de purifier et de rééquilibrer. Toute la pratique en découle : séparer, laver, réunir.",
      "Au XVIe siècle, Paracelse ajoute un troisième principe, le sel, et donne un exemple resté célèbre. Brûle un morceau de bois. Ce qui flambe, c'est le soufre. Ce qui s'en va en fumée, c'est le mercure. Ce qui reste en cendre, c'est le sel. Il étend ces trois principes à toute chose, corps humain compris : c'est le début d'une médecine chimique."],
     src:{t:"Paracelse, Opus paramirum, 1531", st:"doc", x:"Paracelse y expose ses « trois premiers » (tria prima). Pour lui, une maladie est un déséquilibre entre le soufre, le mercure et le sel du corps, et le remède doit être préparé au laboratoire. Beaucoup de ses idées étaient fausses, mais celle-ci a lancé la chimie des médicaments."},
     ret:["Soufre : ce qui brûle. Mercure : ce qui s'envole. Sel : ce qui reste.", "Pour Jābir, les métaux ne diffèrent que par la pureté et la proportion de leurs principes.", "Ces mots désignent des principes, pas le soufre ni le mercure du commerce."],
     prat:{t:"La bougie de Paracelse", x:"Allume une bougie et regarde-la une minute. La flamme : le soufre. La fumée, quand tu la souffles : le mercure. La mèche noircie qui reste : le sel. Puis pose-toi la question pour un projet en cours : qu'est-ce qui l'enflamme, qu'est-ce qui s'évapore, qu'est-ce qui restera ?"},
     quiz:[
      {q:"Dans la théorie de Jābir, de quoi sont faits les métaux ?", o:["De terre et d'eau","De soufre et de mercure","D'or dilué"], r:1, e:"Deux principes, en proportions et en puretés différentes."},
      {q:"Qui ajoute le sel aux deux principes ?", o:["Aristote","Zosime","Paracelse"], r:2, e:"Au XVIe siècle. Les trois ensemble s'appellent les tria prima."},
      {q:"Dans le bois qui brûle, que représente la cendre ?", o:["Le sel","Le soufre","Le mercure"], r:0, e:"Le sel est ce qui reste : le corps fixe."}]}
  ]},
  {id:"m2", t:"La matière et le ciel", sous:"Les métaux, le laboratoire et l'écriture secrète.", lec:[
    {id:"l4", t:"Sept métaux, sept planètes", dur:6, outil:"metaux",
     acc:"Le saturnisme, le vif-argent, le mercure : notre langue garde la trace d'un temps où chaque métal avait sa planète.",
     idee:[
      "Les Anciens connaissaient sept métaux et sept astres mobiles. Ils les ont mariés : l'or au Soleil, l'argent à la Lune, le mercure à Mercure, le cuivre à Vénus, le fer à Mars, l'étain à Jupiter, le plomb à Saturne. On pensait que chaque planète faisait pousser son métal dans la terre.",
      "Cette liste ne s'est fixée qu'à la fin de l'Antiquité. Avant, elle variait : l'étain a d'abord été donné à Mercure, et un alliage d'or et d'argent, l'électrum, à Jupiter. Une « tradition immémoriale » a souvent une date de naissance.",
      "Les sept métaux forment une échelle, du plomb terne à l'or inaltérable. Le Grand Œuvre consiste à faire monter la matière le long de cette échelle. Les chimistes ont longtemps gardé ce vocabulaire : le « sucre de Saturne » est un sel de plomb, le « safran de Mars » une rouille de fer, les « cristaux de Vénus » un sel de cuivre."],
     src:{t:"Olympiodore et Étienne d'Alexandrie, VIe – VIIe siècles", st:"doc", x:"Chez le philosophe Olympiodore, au VIe siècle, la liste est presque la nôtre, mais Jupiter a encore l'électrum et Mercure l'étain. Un siècle plus tard, chez Étienne d'Alexandrie, le vif-argent prend le nom de Mercure et l'étain passe à Jupiter. La liste ne bougera plus : elle sert encore dans les laboratoires du XVIIIe siècle."},
     ret:["Sept métaux, sept planètes, sept jours de la semaine.", "La liste classique date de la fin de l'Antiquité.", "Du plomb à l'or : une échelle de perfection."],
     prat:{t:"Le métal du jour", x:"Chaque jour de la semaine a sa planète, donc son métal. Va voir dans l'athanor quel est celui d'aujourd'hui, et essaie son « geste » : une petite consigne pour la journée. C'est une lecture moderne, mais c'est une bonne façon de retenir les sept."},
     quiz:[
      {q:"Quel métal va avec Vénus ?", o:["Le fer","Le cuivre","L'étain"], r:1, e:"Cuprum vient de Chypre, l'île d'Aphrodite, la Vénus des Grecs."},
      {q:"D'où vient le mot « saturnisme » ?", o:["De Saturne, la planète du plomb","D'un médecin nommé Saturnin","Du samedi"], r:0, e:"C'est l'intoxication au plomb, le métal de Saturne."},
      {q:"La liste des sept métaux et planètes est-elle la même depuis toujours ?", o:["Oui, depuis l'Égypte ancienne","Non, elle s'est fixée à la fin de l'Antiquité"], r:1, e:"L'étain, par exemple, a d'abord été attribué à Mercure."}]},
    {id:"l5", t:"Le laboratoire", dur:7, outil:"oeuvre-jeu",
     acc:"Le verre, le feu et la patience. L'alchimiste est d'abord quelqu'un qui surveille un fourneau pendant des semaines.",
     idee:[
      "Au centre, il y a l'athanor : un fourneau construit pour garder une chaleur égale très longtemps. On y pose le vase, souvent un ballon de verre à long col qu'on appelle l'œuf philosophique. Pour que rien ne s'échappe, on fond le col : le vase est « scellé d'Hermès ». C'est l'origine de notre expression « hermétiquement fermé ».",
      "Autour, les instruments. L'alambic sert à distiller : on chauffe, la vapeur monte dans le chapiteau, se refroidit et coule goutte à goutte. Le pélican est un vase dont le bec replonge dans le ventre : la vapeur y monte et y retombe sans fin. Le creuset supporte les plus fortes chaleurs.",
      "L'art le plus difficile est celui du feu. Les traités distinguent quatre degrés : la chaleur du bain d'eau, celle des cendres, celle du sable, puis la flamme nue. Trop de feu, et le vase éclate. Les textes le répètent : « toute hâte vient du diable ». Il y avait aussi de vrais dangers. Le mercure, l'arsenic et l'antimoine ont empoisonné beaucoup d'alchimistes. On ne refait pas ces expériences chez soi."],
     src:{t:"Hieronymus Brunschwig, Liber de arte distillandi, Strasbourg, 1500", st:"doc", x:"Le premier livre imprimé consacré à la distillation. Ce chirurgien y dessine les fourneaux et les alambics un par un, avec leur mode d'emploi. Le livre a été réédité pendant un siècle : c'est par lui que les apothicaires d'Europe ont appris à distiller."},
     ret:["L'athanor garde une chaleur égale ; l'œuf philosophique est scellé d'Hermès.", "Distiller : faire monter en vapeur, puis recueillir goutte à goutte.", "Quatre degrés du feu : le bain, les cendres, le sable, la flamme."],
     prat:{t:"Une distillation de cuisine", x:"Sale fortement un fond d'eau dans une casserole. Chauffe à couvert. Quand des gouttes se sont formées sous le couvercle, laisse-les tiédir et goûtes-en une : elle n'est pas salée. Le sel, « fixe », est resté au fond. L'eau, « volatile », est montée. Tu as séparé le subtil de l'épais."},
     quiz:[
      {q:"Que veut dire « scellé d'Hermès » ?", o:["Marqué d'un sceau magique","Fermé en fondant le col du vase","Enterré"], r:1, e:"D'où l'expression « hermétiquement fermé »."},
      {q:"Quel est le degré de feu le plus doux ?", o:["Le sable","Les cendres","Le bain"], r:2, e:"Le bain d'eau tiède : notre bain-marie."},
      {q:"À quoi sert un pélican ?", o:["À faire circuler la vapeur sans fin","À broyer les métaux","À mesurer la chaleur"], r:0, e:"Son bec replonge dans son ventre : ce qui monte y redescend."}]},
    {id:"l6", t:"Lire les signes", dur:6, outil:"signes",
     acc:"Un cercle, un croissant, une croix. Avec trois pièces, les alchimistes ont écrit presque toute leur matière.",
     idee:[
      "Les signes alchimiques servent d'abord à écrire vite. Dans un carnet de laboratoire, on trace un cercle pointé au lieu d'écrire « or ». Les sept métaux portent les signes de leurs planètes, les quatre éléments sont quatre triangles, et les principes combinent les deux.",
      "On peut les lire comme un jeu de construction. Le cercle évoque le Soleil et l'or. Le croissant, la Lune et l'argent. La croix, la matière et ses quatre éléments. Le signe du mercure est le seul à réunir les trois. En 1564, John Dee en tire tout un livre, la Monade hiéroglyphique. C'est une lecture séduisante, mais c'est une lecture : au quotidien, ces signes étaient surtout des abréviations.",
      "Il n'y a jamais eu de code unique. Une même matière peut avoir dix signes selon les livres. Et les alchimistes ajoutaient une seconde couche de secret : les noms de couverture. « Lion vert », « lait de vierge », « aigle » désignent des produits bien réels. On cachait ses recettes par prudence, par esprit de métier, et parce qu'on pensait que le savoir doit se mériter."],
     src:{t:"L'Encyclopédie de Diderot et d'Alembert, planche « Caractères de chymie », 1763", st:"doc", x:"Au siècle des Lumières, on grave encore une pleine page de signes alchimiques pour que les lecteurs puissent déchiffrer les vieux livres. Vingt-cinq ans plus tard, Lavoisier et ses collègues les remplacent par une nomenclature nouvelle. Les signes des planètes, eux, sont restés."},
     ret:["Trois pièces de base : le cercle, le croissant, la croix.", "Les éléments sont des triangles : pointe en haut pour ce qui monte.", "Pas de code unique : les signes varient d'un livre à l'autre."],
     prat:{t:"Ton propre signe", x:"Ouvre la table des signes et regarde comment chacun se construit. Puis invente le tien pour un projet qui t'occupe, avec les mêmes pièces : qu'y a-t-il d'accompli (le cercle), de réceptif (le croissant), de matériel (la croix) ? Dessine-le en haut d'une page de ton carnet."},
     quiz:[
      {q:"Quel signe réunit le croissant, le cercle et la croix ?", o:["L'or","Le mercure","Le plomb"], r:1, e:"C'est le seul des sept à contenir les trois pièces."},
      {q:"Un triangle pointe en bas, sans barre : c'est…", o:["Le Feu","L'Eau","La Terre"], r:1, e:"L'Eau descend. Avec une barre, ce serait la Terre."},
      {q:"Qu'est-ce qu'un « lion vert » ?", o:["Un animal fabuleux","Un nom de couverture pour un dissolvant","Un signe du zodiaque"], r:1, e:"Les alchimistes cachaient leurs produits sous des noms d'animaux."}]}
  ]},
  {id:"m3", t:"Le Grand Œuvre", sous:"Les couleurs, les opérations et le bestiaire.", lec:[
    {id:"l7", t:"Les couleurs de l'Œuvre", dur:7, outil:"oeuvre-jeu",
     acc:"Noir, blanc, jaune, rouge. Depuis Alexandrie, l'alchimiste suit son travail à la couleur.",
     idee:[
      "Les premiers alchimistes grecs décrivent quatre étapes, nommées par leur couleur : le noircissement, le blanchiment, le jaunissement et le rougissement. Ces mots viennent des ateliers. Les artisans d'Égypte savaient teindre les métaux : noircir du cuivre, le blanchir, puis lui donner l'aspect de l'or. L'alchimie est d'abord née comme un art de la teinture.",
      "Le Moyen Âge latin garde les quatre couleurs et leur donne leurs noms célèbres : nigredo, albedo, citrinitas, rubedo. Il leur associe des oiseaux : le corbeau pour le noir, le cygne ou la colombe pour le blanc, le phénix pour le rouge. Entre le noir et le blanc, on décrit souvent un moment irisé : la queue du paon.",
      "À partir du XVe siècle, le jaune s'efface et beaucoup d'auteurs ne comptent plus que trois couleurs. Peu importe le nombre : l'idée est que la matière doit mourir (le noir), être lavée (le blanc), puis être fixée (le rouge). Ce schéma en trois temps aura une longue postérité, bien au-delà du laboratoire."],
     src:{t:"Zosime de Panopolis, vers 300", st:"doc", x:"Chez Zosime, les quatre couleurs organisent déjà toute la pratique. Il cite sans cesse ses prédécesseurs, surtout Marie la Juive et un auteur qui signe Démocrite. Pour eux tous, le changement de couleur est le signe sûr que la matière a changé de nature."},
     ret:["Quatre couleurs chez les Grecs, souvent trois après le XVe siècle.", "Noir : défaire. Blanc : laver. Rouge : fixer.", "Ce vocabulaire vient des ateliers de teinture des métaux."],
     prat:{t:"Conduire le feu", x:"Ouvre « Le Grand Œuvre » dans le laboratoire. Tu y conduis le feu au soufflet, d'une couleur à l'autre. Tu verras vite pourquoi les textes insistent tant sur la patience : le noir demande un feu très doux, le rouge un feu fort, et le vase ne pardonne pas la précipitation."},
     quiz:[
      {q:"Dans quel ordre viennent les couleurs ?", o:["Blanc, noir, rouge, jaune","Noir, blanc, jaune, rouge","Rouge, jaune, blanc, noir"], r:1, e:"Nigredo, albedo, citrinitas, rubedo."},
      {q:"Quel oiseau désigne l'œuvre au noir ?", o:["Le corbeau","Le phénix","Le cygne"], r:0, e:"On parle de « la tête du corbeau »."},
      {q:"Quelle couleur disparaît souvent après le XVe siècle ?", o:["Le noir","Le jaune","Le rouge"], r:1, e:"Beaucoup d'auteurs passent alors directement du blanc au rouge."}]},
    {id:"l8", t:"Les opérations", dur:7,
     acc:"Sept opérations ? Douze ? Quatorze ? Les alchimistes ne sont jamais tombés d'accord, et c'est une information en soi.",
     idee:[
      "Les couleurs disent où en est la matière. Les opérations disent ce que fait l'artiste : calciner (réduire en cendre), dissoudre, distiller, sublimer (faire monter un solide en vapeur), fixer. En 1471, l'Anglais George Ripley en compte douze, qu'il appelle les douze portes d'un château. En 1758, Dom Pernety en donne douze aussi, une par signe du zodiaque, mais ce ne sont pas tout à fait les mêmes.",
      "Tu liras partout qu'il existe « les sept opérations de l'alchimie ». Cette liste est récente : elle a été popularisée à la fin du XXe siècle. Elle n'est pas absurde, mais aucun traité ancien ne la donne comme la règle. Les vrais textes se contredisent sur le nombre, les noms et l'ordre.",
      "Sous cette diversité, deux gestes reviennent toujours. Défaire : dissoudre, séparer, rendre volatil. Et refaire : réunir, coaguler, rendre fixe. Les alchimistes le disent en trois mots latins : solve et coagula, dissous et coagule. Tout le Grand Œuvre est une suite de ces deux temps."],
     src:{t:"George Ripley, The Compound of Alchymy, 1471", st:"doc", x:"Ce long poème dédié au roi Édouard IV décrit douze « portes » : calcination, dissolution, séparation, conjonction, putréfaction, congélation, cibation, sublimation, fermentation, exaltation, multiplication, projection. C'est l'un des textes les plus copiés de l'alchimie anglaise."},
     ret:["Le nombre et l'ordre des opérations varient d'un auteur à l'autre.", "La liste des « sept opérations » est moderne.", "Deux gestes de fond : dissoudre et coaguler."],
     prat:{t:"Solve et coagula", x:"Prends un problème qui résiste. Premier temps, dissous : écris-le en morceaux, un par ligne, les plus petits possible. Laisse reposer une heure. Second temps, coagule : rassemble les morceaux dans un autre ordre que celui du départ. Souvent, la solution était dans l'ordre."},
     quiz:[
      {q:"Combien de « portes » George Ripley décrit-il ?", o:["Sept","Douze","Vingt-deux"], r:1, e:"De la calcination à la projection."},
      {q:"La liste des « sept opérations » est…", o:["Dans tous les traités anciens","Une synthèse moderne","Due à Aristote"], r:1, e:"Elle date de la fin du XXe siècle. Les textes anciens ne s'accordent pas."},
      {q:"Que veut dire « solve et coagula » ?", o:["Prie et travaille","Dissous et coagule","Cherche et trouve"], r:1, e:"Défaire, puis refaire autrement."}]},
    {id:"l9", t:"Le bestiaire", dur:6, outil:"planches",
     acc:"Un lion dévore le Soleil. Un roi se noie. Un serpent se mord la queue. Ce ne sont pas des rêves : c'est une notation.",
     idee:[
      "Pour décrire ce qui se passe dans le vase, les alchimistes ont choisi les images plutôt que les formules. Quelques règles suffisent pour commencer à lire. Ce qui a des ailes est volatil : cela s'évapore. Ce qui n'en a pas est fixe : cela reste au fond. Un aigle enchaîné à un crapaud, c'est une vapeur qu'on retient.",
      "Les actions se lisent de la même façon. Dévorer, c'est dissoudre : le lion vert qui avale le Soleil est un dissolvant qui attaque l'or. Un mariage est une combinaison de deux matières. Une mort est un noircissement. Une résurrection, le retour de la couleur. Le roi et la reine sont les deux principes, soufre et mercure, qu'il faut unir.",
      "Certaines images disent une idée plus qu'une recette. L'ouroboros, le serpent qui se mord la queue, vient de l'Égypte ancienne : il dit que la matière est une et que tout se transforme en tout. Le pélican, qui se perce la poitrine pour nourrir ses petits, donne son nom à un vase où la matière se nourrit d'elle-même."],
     src:{t:"Le Rosaire des philosophes, Francfort, 1550", st:"doc", x:"Vingt gravures sur bois, presque sans décor. Un roi et une reine se rencontrent, se dévêtent, s'unissent dans un bain, meurent, puis renaissent en un seul être à deux têtes. C'est le récit en images le plus lu de l'alchimie, et celui que Jung a commenté."},
     ret:["Ailé : volatil. Sans ailes : fixe.", "Dévorer, c'est dissoudre. Se marier, c'est se combiner. Mourir, c'est noircir.", "Le roi et la reine : le soufre et le mercure."],
     prat:{t:"Lire une planche", x:"Ouvre les planches dans le laboratoire et choisis-en une. Avant de lire l'explication, décris ce que tu vois comme si tu parlais à quelqu'un qui a les yeux fermés. Puis cherche : qu'est-ce qui a des ailes ? Y a-t-il un couple ? Quelle couleur domine ? Compare ensuite avec la légende."},
     quiz:[
      {q:"Dans une image alchimique, un animal ailé désigne…", o:["Ce qui est volatil","Ce qui est précieux","Ce qui est dangereux"], r:0, e:"Ce qui s'envole à la chaleur. Sans ailes, c'est le fixe."},
      {q:"Que fait le lion vert quand il « dévore le Soleil » ?", o:["Il éclipse le Soleil","Il dissout l'or","Il annonce l'hiver"], r:1, e:"Dévorer, c'est dissoudre. Le Soleil, c'est l'or."},
      {q:"D'où vient l'image de l'ouroboros ?", o:["Du Moyen Âge chrétien","De l'Égypte ancienne","De la Chine"], r:1, e:"On la trouve déjà dans une tombe de pharaon, bien avant l'alchimie."}]}
  ]},
  {id:"m4", t:"Les textes et les images", sous:"La Table d'émeraude, les livres d'emblèmes et ce qu'il en reste.", lec:[
    {id:"l10", t:"La Table d'émeraude", dur:7,
     acc:"Une douzaine de phrases. Tous les alchimistes l'ont citée, de Bagdad à Newton.",
     idee:[
      "Le texte se présente comme les paroles d'Hermès Trismégiste, gravées sur une tablette d'émeraude et retrouvées dans son tombeau. C'est une légende. Ce qu'on sait : il apparaît en arabe au VIIIe ou au IXe siècle, à la fin d'un Livre du secret de la création, puis il est traduit en latin au XIIe siècle.",
      "Il commence ainsi : « Il est vrai, sans mensonge, certain et très véritable : ce qui est en bas est comme ce qui est en haut, et ce qui est en haut est comme ce qui est en bas, pour accomplir les miracles d'une seule chose. » C'est de là que vient la formule « comme en haut, comme en bas ». Le ciel et la terre se répondent : c'est aussi le fondement de l'astrologie.",
      "La suite ressemble à une recette voilée : « Son père est le Soleil, sa mère est la Lune. […] Tu sépareras la terre du feu, le subtil de l'épais, doucement, avec grande adresse. Il monte de la terre au ciel, puis redescend sur la terre. » Beaucoup y ont lu une distillation : la vapeur monte, se condense et retombe. D'autres, un chemin intérieur. Le texte est assez court et assez obscur pour porter les deux lectures."],
     src:{t:"Isaac Newton, traduction manuscrite, vers 1680", st:"doc", x:"Newton a traduit lui-même la Table d'émeraude en anglais et l'a commentée. Le manuscrit est conservé à Cambridge. Qu'un des fondateurs de la physique ait pris ce texte au sérieux montre à quel point, à son époque, l'alchimie faisait encore partie de la science."},
     ret:["Le plus ancien texte connu est en arabe (VIIIe – IXe siècle).", "« Ce qui est en bas est comme ce qui est en haut. »", "On peut y lire une distillation, ou un chemin intérieur."],
     prat:{t:"Monter et redescendre", x:"Prends une question qui t'occupe. Premier mouvement, monte « de la terre au ciel » : écris-la de très haut, en une phrase générale, comme si elle concernait n'importe qui. Second mouvement, redescends : écris ce qu'elle exige de toi, cette semaine, en un geste précis. Les deux phrases s'éclairent l'une l'autre."},
     quiz:[
      {q:"Dans quelle langue trouve-t-on la plus ancienne version connue ?", o:["En égyptien","En arabe","En latin"], r:1, e:"Au VIIIe ou au IXe siècle. Le latin vient au XIIe."},
      {q:"Quelle formule vient de la Table d'émeraude ?", o:["Solve et coagula","Comme en haut, comme en bas","Ora et labora"], r:1, e:"Le texte dit : ce qui est en bas est comme ce qui est en haut."},
      {q:"Quel savant célèbre l'a traduite vers 1680 ?", o:["Isaac Newton","Antoine Lavoisier","Galilée"], r:0, e:"Newton a consacré trente ans à l'alchimie."}]},
    {id:"l11", t:"Les livres d'images", dur:6, outil:"planches",
     acc:"À la Renaissance, l'alchimie invente un genre : des livres qu'on regarde plus qu'on ne les lit.",
     idee:[
      "Quatre livres dominent. Le Splendor solis (années 1530) est une suite de peintures somptueuses, dont sept vases où la matière change de figure, du dragon au roi rouge. Le Rosaire des philosophes (1550) raconte l'union du roi et de la reine en vingt gravures sur bois. Le Mutus Liber (1677), le « livre muet », montre un couple au travail en quinze planches, sans un mot d'explication.",
      "Le plus étonnant est l'Atalanta fugiens de Michael Maier (1617). Chacun de ses cinquante emblèmes réunit une gravure, une devise, un poème, un commentaire et une fugue à trois voix. Les voix portent des noms : Atalante qui fuit, Hippomène qui la poursuit, et la pomme d'or qui la retarde. On devait regarder, lire et chanter en même temps.",
      "Comment lire un emblème ? D'abord décrire, sans interpréter. Puis chercher les couples : Soleil et Lune, roi et reine, ailé et sans ailes. Puis la couleur. Enfin la devise, qui donne la clé. Et accepter de ne pas tout comprendre : ces images sont faites pour être regardées longtemps."],
     src:{t:"Michael Maier, Atalanta fugiens, Oppenheim, 1617", st:"doc", x:"Maier était médecin à la cour de l'empereur Rodolphe II, à Prague, grand protecteur des alchimistes. Les gravures sont de Matthäus Merian, l'un des meilleurs graveurs de son temps. L'emblème XXI dit : « Fais de l'homme et de la femme un cercle, puis un carré, puis un triangle, puis un cercle, et tu auras la pierre des philosophes. »"},
     ret:["Splendor solis, Rosaire, Atalanta fugiens, Mutus Liber : les quatre grands livres d'images.", "L'Atalanta fugiens joint une fugue à chaque emblème.", "Lire un emblème : décrire, chercher les couples, la couleur, puis la devise."],
     prat:{t:"Dix minutes devant une image", x:"Choisis une planche et regarde-la pendant dix vraies minutes, montre en main. Les trois premières sont faciles, les trois suivantes ennuyeuses. C'est après que les détails apparaissent. Note ce que tu n'avais pas vu au début. Les alchimistes appelaient cela méditer une figure."},
     quiz:[
      {q:"Qu'a de particulier le Mutus Liber ?", o:["Il est écrit à l'envers","Il n'a presque aucun texte","Il est en hébreu"], r:1, e:"« Mutus liber » veut dire « livre muet »."},
      {q:"Qu'accompagne chaque emblème de l'Atalanta fugiens ?", o:["Une recette","Une fugue à trois voix","Un horoscope"], r:1, e:"Cinquante emblèmes, cinquante fugues."},
      {q:"Par quoi commencer devant un emblème ?", o:["Chercher le sens caché","Décrire ce qu'on voit","Lire le commentaire"], r:1, e:"Décrire d'abord, interpréter ensuite."}]},
    {id:"l12", t:"Alchimie, chimie, psychologie", dur:7, outil:"oeuvre",
     acc:"L'alchimie a perdu son pari sur l'or. Elle a gagné presque tout le reste.",
     idee:[
      "Que nous a-t-elle laissé ? D'abord un laboratoire : l'alambic, le bain-marie, les fourneaux, l'habitude de peser et de noter. Ensuite des découvertes : l'alcool distillé, les grands acides, le phosphore. Même la porcelaine européenne : en 1708, en Saxe, c'est un alchimiste retenu prisonnier pour faire de l'or, Johann Friedrich Böttger, qui en trouve le secret.",
      "Au XIXe siècle, quand la chimie n'en veut plus, l'alchimie change de sens. On se met à dire que les alchimistes parlaient en réalité de l'âme. Les historiens ne suivent pas cette idée pour les textes anciens : on y travaille vraiment au fourneau. Mais au XXe siècle, Carl Gustav Jung propose une lecture plus fine. Selon lui, les alchimistes projetaient sur la matière ce qui se passait en eux, et leurs images décrivent les étapes d'une transformation intérieure.",
      "On peut donc tenir trois choses ensemble. L'alchimie historique est une chimie ancienne, sérieuse, qui s'est trompée sur l'or. Ses images sont un des grands trésors de l'art européen. Et le schéma noir, blanc, rouge reste un bon outil pour penser un changement, à condition de dire d'où il vient : c'est une lecture moderne. C'est ainsi qu'Arcanes te le propose."],
     src:{t:"Lawrence Principe, The Secrets of Alchemy, 2013", st:"doc", x:"Historien et chimiste, Principe a refait au laboratoire des expériences décrites dans les traités des XVIe et XVIIe siècles. Beaucoup fonctionnent, à condition d'utiliser les matières impures de l'époque. Son livre est aujourd'hui la meilleure introduction à l'alchimie telle que la voient les historiens."},
     ret:["L'héritage : le matériel de laboratoire, la distillation, les acides, le phosphore.", "La lecture purement spirituelle date du XIXe siècle, celle de Jung du XXe.", "Chimie ancienne, trésor d'images, outil pour penser : les trois se tiennent."],
     prat:{t:"Commencer ton Œuvre", x:"Ouvre « Mon Œuvre » dans le laboratoire. Choisis une chose que tu veux transformer : une habitude, un projet, une période. L'outil te fait passer par les quatre couleurs, avec pour chacune trois gestes et une question. Prends ton temps : un mois de Lune est un bon rythme."},
     quiz:[
      {q:"Qui trouve le secret de la porcelaine européenne en 1708 ?", o:["Un potier chinois","Un alchimiste prisonnier, Böttger","Lavoisier"], r:1, e:"Le prince de Saxe le retenait pour qu'il fabrique de l'or."},
      {q:"De quand date la lecture psychologique de l'alchimie ?", o:["De l'Antiquité","Du Moyen Âge","Du XXe siècle"], r:2, e:"Jung publie Psychologie et Alchimie en 1944."},
      {q:"Que montrent les historiens qui refont les vieilles expériences ?", o:["Qu'elles sont toutes imaginaires","Que beaucoup fonctionnent","Qu'elles produisent de l'or"], r:1, e:"Les alchimistes étaient de vrais expérimentateurs."}]}
  ]}
];
