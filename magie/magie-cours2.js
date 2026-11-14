/* ===== Arcanes · Magie : le second cercle =====
   Modules IX à XIV (les fondements et les arts), la bibliothèque, la géomancie, les décans, l'alphabet hébreu,
   l'harmonie de Kepler, le cycle de 28 jours, les gloses en marge et les grades étendus.
   Statuts des sources : doc = documenté, trad = tradition, mod = lecture moderne. */
const MAGIE_COURS2 = (() => {

/* ---------------------------------------------------------------- les modules */
const MODULES = [
{ id:"m9", n:"IX", cercle:2, t:"L'âme du monde", sous:"Pourquoi, pour les Anciens, la magie est possible", img:"singe",
  lecons:[
  { id:"m9l1", t:"Un vivant doué d'une âme", sous:"Platon, Plotin et la sympathie",
    idee:[
      "Pour comprendre la magie savante, il faut d'abord comprendre le monde dans lequel elle a été pensée. Dans le <i>Timée</i>, vers 360 avant notre ère, Platon décrit l'univers comme <b>un seul être vivant</b> : un corps, une âme, une intelligence. Cette <b>âme du monde</b> enveloppe tout et relie toutes les parties de l'univers, comme notre âme relie les parties de notre corps.",
      "Six siècles plus tard, Plotin (205-270) en tire une conséquence vertigineuse. Si le monde est un seul vivant, chaque partie « ressent » les autres, comme une douleur au pied se ressent dans tout le corps. Il appelle ce lien la <b>sympathie</b>, du grec <i>sympatheia</i>, « éprouver ensemble ». La magie n'est alors ni surnaturelle ni diabolique : elle se sert de liens qui existent déjà dans la nature.",
      "Plotin ajoute une limite : le sage, tourné vers l'intelligence, échappe aux charmes, qui ne touchent que la partie irrationnelle de l'âme. C'est cette double idée, un monde sympathique et un esprit libre, que la Renaissance redécouvre avec Ficin, et sur laquelle reposent les correspondances d'Agrippa du module II. Sans elle, les tables de correspondances ressemblent à des listes arbitraires ; avec elle, elles deviennent la carte d'un corps vivant."
    ],
    source:{ txt:"La Magie véritable, c'est l'Amitié qui règne dans l'univers, avec la Haine, son contraire. Le premier magicien, celui que les hommes consultent pour agir au moyen de ses philtres et de ses enchantements, c'est l'Amour.", ref:"Plotin, Ennéades, IV, 4, 40, trad. M.-N. Bouillet (1857)", st:"doc" },
    schema:"ame",
    ex:{ t:"Le corps du monde", txt:"Choisis un objet près de toi : une pierre, une plante, un métal. Dans la toile des correspondances, retrouve à quelle planète la tradition le relie, puis regarde tout ce qui partage cette planète avec lui.", outil:"outil:toile" },
    carnet:"Est-ce que je vis le monde comme un mécanisme ou comme un vivant ? Où, aujourd'hui, ai-je senti un lien inattendu ?",
    marge:[ {t:"Le mot", txt:"<i>Sympatheia</i> : chez les stoïciens déjà, le lien qui fait de l'univers un tout. Plotin en fait la clé de la magie."},
            {t:"Lire le texte", txt:"Le passage du <i>Timée</i> et celui de Plotin, en entier, dans la bibliothèque.", go:"biblio:plotin"} ] },
  { id:"m9l2", t:"Goétie et théurgie", sous:"Jamblique et la magie qui élève",
    idee:[
      "Les Grecs avaient plusieurs mots. Le <i>goès</i> était le sorcier des campagnes, celui qui marmonne des charmes : de là vient la <b>goétie</b>, la magie qui contraint les puissances, souvent pour nuire. La <i>mageia</i> désignait d'abord le savoir des prêtres perses. Au IIe siècle apparaît un troisième terme, dans les <i>Oracles chaldaïques</i> : la <b>théurgie</b>, littéralement « l'œuvre divine ».",
      "Vers 300, le philosophe Porphyre écrit à un prêtre égyptien pour critiquer les rites : comment des gestes et des objets pourraient-ils agir sur les dieux ? Jamblique (vers 245-325) lui répond dans <i>Les Mystères d'Égypte</i>. Pour lui, le théurge ne contraint rien : par les rites, les symboles et les prières, il <b>se rend semblable</b> aux dieux et se laisse élever vers eux. Ce n'est pas la pensée seule, dit-il en substance, qui unit l'âme au divin, mais l'accomplissement des actes sacrés.",
      "Proclus (412-485) en donne l'image la plus belle : l'héliotrope tourne sa fleur avec le soleil et, à sa manière, lui chante un hymne. Chaque chose a sa place dans une « chaîne » qui remonte jusqu'à son astre. La théurgie, c'est faire consciemment ce que la plante fait par nature. Toute la magie astrale de la Renaissance, et jusqu'aux rituels de la Golden Dawn, s'est voulue théurgie plutôt que goétie."
    ],
    source:{ txt:"L'héliotrope se meut avec le soleil ; et si l'on pouvait entendre le bruit de sa rotation, on comprendrait qu'il chante à son roi un hymne, comme une plante peut le chanter.", ref:"Proclus, Sur l'art hiératique des Grecs (paraphrase)", st:"doc" },
    schema:"theurgie",
    ex:{ t:"Se tourner", txt:"Demain, au moment où tu vois le soleil pour la première fois, tourne-toi vers lui une minute, comme l'héliotrope. Simplement. Le salut au soleil guidé t'en propose une forme.", outil:"rituel:salut" },
    carnet:"Dans ma pratique, est-ce que je cherche à obtenir quelque chose, ou à devenir quelque chose ?",
    marge:[ {t:"Le mot", txt:"<i>Théurgie</i> : de <i>theos</i>, dieu, et <i>ergon</i>, œuvre."},
            {t:"Nuance", txt:"La frontière entre goétie et théurgie était aussi morale et sociale : chacun appelait volontiers « goétie » la magie des autres."} ] },
  { id:"m9l3", t:"L'harmonie des sphères", sous:"De Pythagore à Kepler",
    idee:[
      "Selon une légende rapportée par Nicomaque puis par Jamblique, Pythagore passa devant une forge et entendit des marteaux sonner en accord. Il comprit que les intervalles musicaux sont des <b>rapports de nombres simples</b> : l'octave vaut 2/1, la quinte 3/2, la quarte 4/3. Si la musique est nombre, et si le monde est ordonné par le nombre, alors le monde doit être musique.",
      "Dans le mythe d'Er, à la fin de la <i>République</i>, Platon place une Sirène sur chaque sphère céleste : chacune chante une seule note, et toutes ensemble forment une harmonie. Au VIe siècle, Boèce distingue trois musiques : celle du monde (<i>mundana</i>), celle de l'être humain, qui accorde le corps et l'âme (<i>humana</i>), et celle des instruments. Pendant mille ans, on étudiera la musique comme une science du cosmos, à côté de l'arithmétique, de la géométrie et de l'astronomie.",
      "En 1619, Johannes Kepler, celui qui a découvert que les orbites sont des ellipses, publie <i>Harmonices Mundi</i>. Il calcule la vitesse de chaque planète vue du Soleil, au plus loin et au plus près de son orbite : leurs rapports donnent de vrais intervalles. Saturne chante une tierce majeure, Jupiter une tierce mineure, Mars une quinte, la Terre un demi-ton, <i>mi-fa</i>, que Kepler lit comme <i>misère</i> et <i>famine</i>. Ce n'est plus un mythe mais une mesure, et l'outil de l'atelier la recalcule pour aujourd'hui."
    ],
    source:{ txt:"Les mouvements célestes ne sont rien d'autre qu'un chant continu à plusieurs voix, perçu par l'intelligence et non par l'oreille.", ref:"Kepler, Harmonices Mundi, livre V, chap. 7 (1619), traduction pour Arcanes", st:"doc" },
    schema:"kepler",
    ex:{ t:"Écouter le ciel d'aujourd'hui", txt:"Ouvre l'harmonie de Kepler, lance le son, puis écoute les planètes une par une. Laquelle chante l'intervalle le plus large ? Laquelle presque rien ?", outil:"outil:kepler" },
    carnet:"Une musique qui me remet en ordre intérieurement, et le moment où je l'écoute :",
    marge:[ {t:"Les rapports", txt:"Octave 2:1 · quinte 3:2 · quarte 4:3 · ton 9:8. La gamme pythagoricienne se construit avec ces seuls rapports."},
            {t:"Voir aussi", txt:"La Nécessité et les Sirènes, la gravure du module III.", go:"lec:m3l1"} ] }
  ],
  quiz:[
    { q:"Pour Plotin, sur quoi repose la magie ?", r:["Sur la sympathie qui relie les parties d'un même monde vivant","Sur des pactes avec des démons","Sur la seule force de la volonté","Sur des lois physiques inconnues"], ok:0, exp:"Ennéades IV, 4, 40 : la vraie magie, c'est l'amitié et la haine qui règnent dans l'univers." },
    { q:"Comment Platon décrit-il le monde dans le Timée ?", r:["Comme un être vivant doué d'une âme et d'une intelligence","Comme une horloge parfaite","Comme une illusion","Comme un combat entre deux dieux"], ok:0, exp:"Le monde est « un animal véritablement doué d'une âme et d'une intelligence » (30b)." },
    { q:"Que signifie « théurgie » ?", r:["L'œuvre divine : s'élever vers les dieux par les rites","L'art de contraindre les esprits","La divination par les entrailles","L'étude des métaux"], ok:0, exp:"Le théurge ne force rien : il se rend semblable au divin." },
    { q:"Qui répond à Porphyre dans Les Mystères d'Égypte ?", r:["Jamblique","Plotin","Proclus","Ficin"], ok:0, exp:"Jamblique défend les rites contre les critiques de Porphyre, vers 300." },
    { q:"Selon Kepler, quel intervalle chante la Terre ?", r:["Un demi-ton, mi-fa","Une octave","Une quinte","Une tierce majeure"], ok:0, exp:"Le rapport de ses vitesses extrêmes vaut 16:15 ; Kepler y lit « misère et famine »." }
  ] },

{ id:"m10", n:"X", cercle:2, t:"Ficin : la vie venue du ciel", sous:"Le chant, les images et les décans", img:"monocorde",
  lecons:[
  { id:"m10l1", t:"Marsile Ficin et le spiritus", sous:"La magie d'un médecin philosophe",
    idee:[
      "Marsile Ficin (1433-1499) est le fils du médecin de Cosme de Médicis. Vers 1463, Cosme lui demande d'interrompre sa traduction de Platon pour traduire d'urgence un manuscrit arrivé de Macédoine : le <i>Corpus Hermeticum</i>, attribué à Hermès Trismégiste. Hermès passe avant Platon : on le croyait plus ancien que Moïse.",
      "En 1489, Ficin publie <i>Les Trois Livres de la vie</i>, un traité de santé pour les savants, que l'étude rend mélancoliques. Le troisième livre, « Comment obtenir la vie du ciel », est un traité de magie astrale. Son concept central est le <b>spiritus</b> : une vapeur très subtile, faite du sang le plus pur, qui relie notre corps et notre âme. Le monde a lui aussi son spiritus. Agir sur le nôtre avec ce qui ressemble à une planète, c'est l'accorder à elle.",
      "Sa magie est douce : pas d'esprits invoqués, mais une hygiène de vie. Contre la mélancolie de Saturne, il conseille d'attirer les « trois Grâces », <b>Jupiter, le Soleil et Vénus</b> : vivre au grand air et à la lumière, porter leurs couleurs, respirer leurs parfums, et surtout écouter et chanter leur musique. Il fut tout de même soupçonné de magie et dut écrire une <i>Apologie</i>."
    ],
    source:{ txt:"Elle consiste dans la vertu divine qui existe naturellement dans les herbes, les pierres, les aromates ; c'est pourquoi ils aiment les sacrifices fréquents, les hymnes et les louanges, une douce musique rappelant l'harmonie céleste.", ref:"Asclépius, 38, trad. Louis Ménard (1866) : le passage sur les statues animées que Ficin discute au livre III", st:"doc" },
    schema:"spiritus",
    ex:{ t:"Une journée sous les Grâces", txt:"Choisis un jeudi, un dimanche ou un vendredi. Vingt minutes dehors à la lumière, une couleur de la planète du jour sur toi, une musique qui lui ressemble. Le soir, compare avec un jour ordinaire, dans ton carnet.", outil:"carnet" },
    carnet:"Ce qui nourrit mon « spiritus » : les lumières, les odeurs et les musiques qui me remettent d'aplomb.",
    marge:[ {t:"Le mot", txt:"<i>Spiritus</i> : rien à voir avec l'« esprit » au sens moderne. C'est un souffle matériel très fin, hérité de la médecine de Galien."},
            {t:"Pour lire", txt:"D. P. Walker, <i>Spiritual and Demonic Magic from Ficino to Campanella</i> (1958) : l'étude classique."},
            {t:"Lire le texte", txt:"Les statues animées de l'<i>Asclépius</i>, dans la bibliothèque.", go:"biblio:asclepios"} ] },
  { id:"m10l2", t:"Les hymnes et la musique", sous:"Chanter pour une planète",
    idee:[
      "Ficin chantait. Ses contemporains racontent qu'il s'accompagnait d'une <i>lira da braccio</i> en chantant les <b>Hymnes orphiques</b>, des prières grecques de la fin de l'Antiquité qu'il croyait d'Orphée. Chaque hymne s'adresse à une divinité et commence par l'indication d'un parfum : l'encens pour Hèlios, les aromates pour Sélènè, le styrax pour Kronos.",
      "Pour Ficin, le chant est le plus puissant des moyens, car le son est fait d'air en mouvement, comme le spiritus : il le touche directement. Il donne des règles : savoir ce qu'une planète apporte, observer la musique des gens qui lui ressemblent, chanter à son jour et à son heure, et faire coïncider les paroles, la mélodie et le moment.",
      "On ne connaît pas ses mélodies : il ne les a pas notées. Ce que propose l'atelier est une <b>lecture moderne</b> : la note de la planète d'après Kepler, tenue doucement, pendant que tu lis lentement son hymne orphique dans la traduction de Leconte de Lisle (1869)."
    ],
    source:{ txt:"Entends-moi, Bienheureux, qui vois éternellement toutes choses, Titan resplendissant d'or, Hypériôn, lumière ouranienne…", ref:"Hymnes orphiques, VIII, « Parfum de Hèlios : l'Encens », trad. Leconte de Lisle (1869)", st:"doc" },
    schema:"chant",
    ex:{ t:"Le chant planétaire", txt:"Lance le rituel guidé : il prend la planète de l'heure, tient sa note et te fait lire son hymne. Lis à voix haute si tu peux, lentement.", outil:"rituel:chant" },
    carnet:"Pendant le chant, ce qui s'est passé dans ma voix, mon souffle, mon humeur :",
    marge:[ {t:"Les hymnes", txt:"87 hymnes, sans doute composés en Asie Mineure entre le IIe et le IVe siècle de notre ère, et non par Orphée."},
            {t:"Prudence", txt:"Le chant ne remplace aucun soin. Ficin était médecin : chez lui, le chant venait en plus, jamais à la place."} ] },
  { id:"m10l3", t:"Les trente-six décans", sous:"Des étoiles égyptiennes aux fresques de Ferrare",
    idee:[
      "Les Égyptiens divisaient le ciel nocturne en 36 groupes d'étoiles qui se levaient chacun pendant une dizaine de jours : les <b>décans</b>. On les trouve peints sur des couvercles de sarcophages du Moyen Empire, où ils servaient d'horloge pour les heures de la nuit.",
      "À l'époque hellénistique, les décans deviennent des tranches de 10° du zodiaque, trois par signe. Chacun reçoit une planète maîtresse, dans l'ordre chaldéen à partir de Mars au premier décan du Bélier, et une <b>image</b> à méditer ou à graver sur un talisman. Au IXe siècle, Abu Ma'shar décrit celle du premier décan du Bélier : un homme noir aux yeux rouges, grand et fort, vêtu de blanc et ceint d'une corde. Le <i>Picatrix</i> en donne une version voisine.",
      "Vers 1470, à Ferrare, le palais Schifanoia se couvre des fresques des mois, avec leurs décans. En 1912, l'historien d'art Aby Warburg montre que ces figures étranges descendent d'images indiennes et arabes transmises par Abu Ma'shar : c'est un des actes de naissance de l'iconologie. La Golden Dawn, enfin, a donné à chaque décan une carte du tarot, du 2 au 10 de chaque série : la roue de l'atelier te montre lesquelles."
    ],
    source:{ txt:"Chacun des douze signes se divise en trois faces, et chaque face a sa figure et son seigneur parmi les planètes.", ref:"Picatrix, livre II, chap. 11 (paraphrase)", st:"doc" },
    schema:"decans",
    ex:{ t:"Le décan d'aujourd'hui", txt:"Dans la roue des décans, trouve celui où se tient le Soleil aujourd'hui, puis celui de ton anniversaire. Regarde leurs cartes du tarot.", outil:"outil:decans" },
    carnet:"Le décan du Soleil aujourd'hui, sa carte, et ce qu'elle m'inspire pour les dix jours qui viennent :",
    marge:[ {t:"Le calcul", txt:"36 × 10° = 360°. Le Soleil traverse un décan en dix jours environ."},
            {t:"Pour lire", txt:"Aby Warburg, « Art italien et astrologie internationale au palais Schifanoia » (1912)."} ] }
  ],
  quiz:[
    { q:"Quel texte Cosme de Médicis fait-il traduire à Ficin avant Platon ?", r:["Le Corpus Hermeticum","Le Picatrix","La Bible","Les Ennéades"], ok:0, exp:"On croyait Hermès plus ancien que Platon, et même que Moïse." },
    { q:"Qu'est-ce que le spiritus chez Ficin ?", r:["Une vapeur subtile qui relie le corps et l'âme","Un ange gardien","L'âme immortelle","Un démon familier"], ok:0, exp:"Une notion médicale, héritée de Galien, que Ficin étend au monde entier." },
    { q:"Quelles planètes Ficin appelle-t-il les trois Grâces ?", r:["Jupiter, le Soleil et Vénus","Saturne, Mars et la Lune","Mercure, Vénus et la Lune","Le Soleil, la Lune et Mars"], ok:0, exp:"Les trois astres favorables à opposer à la mélancolie de Saturne." },
    { q:"Combien de degrés du zodiaque couvre un décan ?", r:["10°","30°","12°","5°"], ok:0, exp:"Trois décans par signe de 30°." },
    { q:"Qui a identifié l'origine des figures de Schifanoia en 1912 ?", r:["Aby Warburg","Frances Yates","Carl Jung","Éliphas Lévi"], ok:0, exp:"Dans une conférence célèbre au congrès d'histoire de l'art de Rome." }
  ] },

{ id:"m11", n:"XI", cercle:2, t:"La géomancie", sous:"La science du sable", img:"geomancie",
  lecons:[
  { id:"m11l1", t:"La science du sable", sous:"Une divination venue du monde arabe",
    idee:[
      "La géomancie naît dans le monde arabe sous le nom de <i>'ilm al-raml</i>, « la science du sable » : on traçait des lignes de points du bout du doigt dans le sable. Elle passe en Europe au XIIe siècle, notamment par la traduction latine de Hugues de Santalla, et devient la divination la plus pratiquée du Moyen Âge savant : il suffit de quoi écrire.",
      "Son principe est d'une grande élégance. On trace au hasard seize lignes de points, sans les compter. Chaque ligne donne pair ou impair : deux points ou un seul. Quatre lignes forment une <b>figure</b>. Il n'en existe que seize (2 × 2 × 2 × 2), et chacune a un nom latin, une planète et un caractère.",
      "Agrippa et Robert Fludd lui ont consacré des traités, et des systèmes apparentés existent encore à Madagascar, le <i>sikidy</i>. Aujourd'hui, on peut en faire un outil de réflexion : le hasard propose une figure, et c'est toi qui cherches ce qu'elle dit de ta question."
    ],
    source:{ txt:"La géomancie juge de toutes choses au moyen de points tracés au hasard, puis réduits en figures.", ref:"Définition commune des traités latins de géomancie (paraphrase)", st:"trad" },
    schema:"geohist",
    ex:{ t:"Seize lignes", txt:"Pose une question claire, en une phrase. Puis ouvre l'outil de géomancie et trace tes seize lignes de points, sans compter.", outil:"outil:geomancie" },
    carnet:"Ma question, formulée en une phrase, et ce que j'espère entendre :",
    marge:[ {t:"Le mot", txt:"<i>Géomancie</i> : du grec <i>gê</i>, la terre, et <i>manteia</i>, la divination. La terre, parce qu'on traçait dans le sable."},
            {t:"L'image", txt:"« Secrets de la géomancie arabique » : une planche gravée du XVIIIe siècle."} ] },
  { id:"m11l2", t:"Les seize figures", sous:"Quatre étages, un ou deux points",
    idee:[
      "Chaque figure a quatre étages : la tête, le cou, le corps et les pieds, que la tradition rattache au Feu, à l'Air, à l'Eau et à la Terre. Un point, c'est un élément actif ; deux points, un élément au repos.",
      "Les noms parlent d'eux-mêmes. <i>Via</i>, le chemin, n'a qu'un point par étage ; <i>Populus</i>, le peuple, en a deux partout. <i>Fortuna Major</i>, la grande fortune, et <i>Fortuna Minor</i>, la petite, sont le reflet l'une de l'autre, comme <i>Acquisitio</i>, le gain, et <i>Amissio</i>, la perte. Deux figures portent le nom du dragon : la tête (<i>Caput Draconis</i>), qui ouvre, et la queue (<i>Cauda Draconis</i>), qui ferme ; ce sont les nœuds de la Lune.",
      "Chaque figure reçoit une planète, et chaque planète en a deux. On les classe aussi en favorables, défavorables et mêlées : <i>Fortuna Major</i> est la meilleure, <i>Carcer</i>, la prison, l'une des plus dures. Apprends-les comme on apprend des lettres : par leur forme, puis par leur nom."
    ],
    source:{ txt:"Via et Populus à la Lune, les deux Fortunes au Soleil, Acquisitio et Laetitia à Jupiter, Amissio et Puella à Vénus, Puer et Rubeus à Mars, Conjunctio et Albus à Mercure, Carcer et Tristitia à Saturne.", ref:"Agrippa, De occulta philosophia, II, 48 (1533), résumé", st:"doc" },
    schema:"figures",
    ex:{ t:"Les apprendre par cœur", txt:"Dans le schéma, cache les noms et retrouve-les en regardant seulement les points. Commence par les paires de miroirs." },
    carnet:"La figure qui m'attire, celle qui me rebute, et pourquoi :",
    marge:[ {t:"Le calcul", txt:"16 figures = 2⁴. Chaque figure est un nombre binaire de quatre chiffres, des siècles avant Leibniz."} ] },
  { id:"m11l3", t:"Le bouclier", sous:"Des quatre Mères au Juge",
    idee:[
      "Tes seize lignes donnent quatre figures : les <b>Mères</b>. On lit ensuite leurs étages en travers : les têtes des quatre Mères forment la première <b>Fille</b>, les cous la deuxième, et ainsi de suite. On a huit figures.",
      "On les additionne ensuite deux à deux, étage par étage : un point plus un point font deux points ; un point plus deux points en font un. Les Mères donnent deux <b>Nièces</b>, les Filles deux autres. Les quatre Nièces donnent deux <b>Témoins</b>, le droit et le gauche. Les deux Témoins donnent le <b>Juge</b>, qui répond à la question.",
      "Une propriété mathématique sert de contrôle : le Juge a toujours un nombre pair de points, parce que les Filles contiennent exactement les mêmes points que les Mères. Seules huit figures peuvent donc juger. Le dessin entier s'appelle le bouclier, parce qu'on le traçait en forme d'écu."
    ],
    source:{ txt:"Des quatre Mères naissent les quatre Filles ; d'elles naissent les Nièces, des Nièces les Témoins, et des Témoins le Juge.", ref:"Structure commune des traités de géomancie (paraphrase)", st:"trad" },
    schema:"bouclier",
    ex:{ t:"Ton premier bouclier", txt:"Pose ta question, trace tes lignes dans l'outil et regarde le bouclier se construire. Lis d'abord le Juge, puis les deux Témoins : selon une lecture courante, le droit parle de ce qui vient du passé, le gauche de ce qui s'annonce.", outil:"outil:geomancie" },
    carnet:"Ma question, mon Juge, et ce que j'en fais, moi :",
    marge:[ {t:"Vérification", txt:"Si ton Juge a un nombre impair de points, il y a une erreur d'addition quelque part."},
            {t:"Discernement", txt:"Un tirage éclaire une question ; il ne décide pas à ta place.", go:"lec:m8l3"} ] }
  ],
  quiz:[
    { q:"Que signifie 'ilm al-raml ?", r:["La science du sable","La science des étoiles","L'art des lettres","La lecture des mains"], ok:0, exp:"On traçait les points dans le sable." },
    { q:"Combien existe-t-il de figures géomantiques ?", r:["16","12","22","64"], ok:0, exp:"Quatre étages, deux possibilités chacun : 2 × 2 × 2 × 2." },
    { q:"Comment s'appelle la figure à un seul point par étage ?", r:["Via","Populus","Carcer","Albus"], ok:0, exp:"Via, le chemin. Son contraire, Populus, a deux points partout." },
    { q:"Comment obtient-on les Filles ?", r:["En lisant en travers les étages des quatre Mères","En additionnant les Mères","En traçant quatre nouvelles lignes","En retournant les Mères"], ok:0, exp:"Les têtes des Mères donnent la première Fille, les cous la deuxième…" },
    { q:"Pourquoi le Juge a-t-il toujours un nombre pair de points ?", r:["Parce que les Filles contiennent exactement les mêmes points que les Mères","Par une convention arbitraire","Parce qu'on le tire à part","Parce qu'il représente la Lune"], ok:0, exp:"Tout se retrouve compté deux fois dans l'addition finale." }
  ] },

{ id:"m12", n:"XII", cercle:2, t:"Les lettres et les nombres", sous:"Guématrie, notarikon, temurah, et la Monade de Dee", img:"monas",
  lecons:[
  { id:"m12l1", t:"Vingt-deux lettres", sous:"L'alphabet comme matière du monde",
    idee:[
      "Le <i>Sefer Yetsirah</i>, le « Livre de la formation », est un très court traité hébreu, composé entre le IIe et le VIe siècle. Il affirme que le monde a été créé par <b>trente-deux voies de sagesse</b> : les dix nombres, les <i>sephiroth</i>, et les vingt-deux lettres de l'alphabet hébreu.",
      "Il range les lettres en trois familles. Trois <b>mères</b>, Aleph, Mem et Shin, pour l'air, l'eau et le feu. Sept <b>doubles</b>, qui avaient deux prononciations, pour les sept planètes et les sept jours. Douze <b>simples</b>, pour les douze signes et les douze mois. Tout le système des 22 sentiers vu au module V sort de ce découpage.",
      "L'hébreu n'a pas de chiffres à part : chaque lettre est aussi un nombre. Aleph vaut 1, Beth 2, et ainsi de suite jusqu'à Yod, 10 ; puis les dizaines jusqu'à Tsadé, 90 ; puis les centaines, de Qoph, 100, à Tav, 400. Un mot est donc aussi une somme. C'est de là que naît la guématrie."
    ],
    source:{ txt:"Par trente-deux voies merveilleuses de sagesse, Yah, l'Éternel des armées, a gravé et créé son monde.", ref:"Sefer Yetsirah, I, 1, traduction pour Arcanes", st:"doc" },
    schema:"alphabet",
    ex:{ t:"Ton prénom en lettres hébraïques", txt:"Dans l'outil de guématrie, écris ton prénom avec les lettres qui s'en approchent par le son, et regarde sa valeur.", outil:"outil:guematrie" },
    carnet:"Une lettre dont la forme me parle, et ce qu'elle m'évoque :",
    marge:[ {t:"Les finales", txt:"Cinq lettres ont une forme finale (Kaph, Mem, Nun, Peh, Tsadé). Certains systèmes leur donnent les valeurs 500 à 900."},
            {t:"Voir aussi", txt:"L'Arbre de vie de l'atelier : chaque sentier porte une de ces lettres.", go:"outil:arbre"} ] },
  { id:"m12l2", t:"Guématrie, notarikon, temurah", sous:"Trois façons de lire entre les lettres",
    idee:[
      "La <b>guématrie</b> rapproche les mots de même valeur. Exemple classique : <i>ehad</i>, « un » (אחד), vaut 1 + 8 + 4 = 13, et <i>ahavah</i>, « amour » (אהבה), vaut 1 + 5 + 2 + 5 = 13 aussi. Les commentateurs y lisent que l'amour fait l'unité. Le Nom divin, YHVH, vaut 26, deux fois 13.",
      "Le <b>notarikon</b> lit un mot comme les initiales d'une phrase, ou l'inverse. <i>AGLA</i>, gravé sur bien des talismans de la Renaissance, réunit les initiales de <i>Atah Gibor Le-olam Adonai</i>, « Tu es puissant pour l'éternité, Seigneur ». Le Talmud lit déjà <i>Amen</i> comme les initiales de <i>El Melekh Ne'eman</i>, « Dieu, Roi fidèle ».",
      "La <b>temurah</b> permute les lettres selon une règle. La plus connue, l'<i>atbash</i>, échange la première et la dernière lettre de l'alphabet, la deuxième et l'avant-dernière, et ainsi de suite. Dans le livre de Jérémie, le mystérieux <i>Sheshakh</i> est déjà « Babel » écrit en atbash. Ces techniques sont des outils de méditation sur un texte : elles ne prouvent rien, elles font réfléchir."
    ],
    source:{ txt:"Et le roi de Sheshakh boira après eux.", ref:"Jérémie 25, 26 : « Sheshakh » (ששך) est « Babel » (בבל) en atbash", st:"doc" },
    schema:"guematrie",
    ex:{ t:"Deux mots, une somme", txt:"Dans l'outil, compose deux mots hébreux de même valeur, ou compare deux mots français en guématrie simple (A = 1, B = 2…). La coïncidence te dit-elle quelque chose, ou rien du tout ?", outil:"outil:guematrie" },
    carnet:"Une coïncidence de nombres que j'ai trouvée, et pourquoi elle me parle, ou pas :",
    marge:[ {t:"Prudence", txt:"Avec assez de mots, on trouve toujours des égalités : c'est la loi des grands nombres. La guématrie est une poésie, pas une preuve."},
            {t:"Le mot", txt:"<i>Guématrie</i> vient sans doute du grec <i>geômetria</i>."} ] },
  { id:"m12l3", t:"La Monade hiéroglyphique", sous:"Tout l'univers en un seul signe",
    idee:[
      "En 1564, à Anvers, John Dee publie un petit livre étrange, écrit selon lui en douze jours : la <i>Monas hieroglyphica</i>. Il y construit un seul signe, la <b>Monade</b>, en vingt-quatre théorèmes, comme un géomètre construit une figure.",
      "Le signe réunit les symboles de toutes les planètes. Au centre, un point dans un cercle : le Soleil. Au-dessus, un croissant qui touche le cercle : la Lune. En dessous, une croix : les quatre éléments, mais aussi le trois et le quatre, dont la somme fait sept. Tout en bas, deux demi-cercles : le signe du Bélier, le feu qui commence l'œuvre. En prélevant des morceaux de la Monade, on retrouve le glyphe de chaque planète.",
      "Pour Dee, la Monade est à la fois un alphabet, une équation et un talisman : qui la comprend tient la clé de l'astronomie, de l'alchimie et de la Kabbale. Elle fascinera les rosicruciens : on la retrouve sur la lettre d'invitation des <i>Noces chymiques de Christian Rosenkreutz</i>, en 1616."
    ],
    source:{ txt:"Le Soleil et la Lune, la croix des éléments et le feu du Bélier : de ces quatre, toute la Monade.", ref:"D'après John Dee, Monas hieroglyphica (1564), résumé des premiers théorèmes", st:"doc" },
    schema:"monade",
    ex:{ t:"Dessiner la Monade", txt:"Regarde la Monade se construire, puis dessine-la à main levée, étape par étape, en disant le nom de chaque partie.", outil:"outil:monade" },
    carnet:"Si je devais résumer ce que je cherche en un seul signe, il ressemblerait à :",
    marge:[ {t:"Le livre", txt:"<i>Monas hieroglyphica</i>, Anvers, 1564, dédié à l'empereur Maximilien II."},
            {t:"Voir aussi", txt:"John Dee, au chapitre IV de l'Histoire.", go:"hist:h4"} ] }
  ],
  quiz:[
    { q:"Selon le Sefer Yetsirah, par combien de voies le monde a-t-il été créé ?", r:["32 : dix nombres et vingt-deux lettres","22","10","72"], ok:0, exp:"Les dix sephiroth et les vingt-deux lettres." },
    { q:"Quelles sont les trois lettres mères ?", r:["Aleph, Mem, Shin","Aleph, Beth, Gimel","Yod, He, Vav","Kaph, Peh, Resh"], ok:0, exp:"L'air, l'eau et le feu." },
    { q:"Que vaut YHVH en guématrie ?", r:["26","13","72","10"], ok:0, exp:"10 + 5 + 6 + 5 = 26." },
    { q:"Qu'est-ce que l'atbash ?", r:["Une permutation qui échange la première et la dernière lettre, la deuxième et l'avant-dernière…","Le calcul de la valeur d'un mot","La lecture d'un mot comme des initiales","Un alphabet inventé par Dee"], ok:0, exp:"Aleph ↔ Tav, Beth ↔ Shin… d'où son nom : A-T-B-Sh." },
    { q:"Quel symbole se trouve au centre de la Monade de Dee ?", r:["Le Soleil, un point dans un cercle","La Lune","La croix","Le Bélier"], ok:0, exp:"Le Soleil, autour duquel s'organisent les autres signes." }
  ] },

{ id:"m13", n:"XIII", cercle:2, t:"L'alchimie spirituelle", sous:"Le grand œuvre, de l'atelier à l'âme", img:"alchimie",
  lecons:[
  { id:"m13l1", t:"Le grand œuvre", sous:"Noir, blanc, jaune, rouge",
    idee:[
      "L'alchimie cherche à porter la matière à sa perfection : changer le plomb en or, mais aussi trouver la médecine universelle, l'élixir. Ses textes décrivent l'œuvre par des couleurs. D'abord la <b>nigredo</b>, l'œuvre au noir : la matière se décompose et meurt. Puis l'<b>albedo</b>, l'œuvre au blanc : elle est lavée, purifiée. Parfois la <b>citrinitas</b>, le jaune. Enfin la <b>rubedo</b>, l'œuvre au rouge : la pierre philosophale.",
      "Les alchimistes ont caché leurs procédés sous des images : le roi et la reine qui s'unissent, le corbeau noir, le paon aux mille couleurs, le pélican qui nourrit ses petits de son sang. L'image de ce module reprend le <i>Splendor solis</i> (XVIe siècle) : le roi rouge couronné dans le vase, c'est l'œuvre accomplie.",
      "La <i>Table d'émeraude</i>, attribuée à Hermès, est devenue le texte sacré de l'alchimie : « Tu sépareras la terre du feu, le subtil de l'épais, doucement, avec grande industrie. » Ces phrases ont été lues comme des instructions de laboratoire, puis comme les étapes d'une transformation intérieure. La suite du module raconte comment."
    ],
    source:{ txt:"Il monte de la terre au ciel, et derechef il descend en terre, & il reçoit la force des choses supérieures et inférieures.", ref:"Table d'émeraude, traduction française dite de l'Hortulain", st:"doc" },
    schema:"oeuvre",
    ex:{ t:"Ton œuvre au noir", txt:"Pense à une période difficile que tu as traversée. Qu'est-ce qui a dû se défaire ? Qu'est-ce qui en est sorti de plus clair ? Écris-le en quatre couleurs.", outil:"carnet" },
    carnet:"Ce qui, en ce moment, est dans mon noir, mon blanc, mon rouge :",
    marge:[ {t:"Les couleurs", txt:"Le jaune, <i>citrinitas</i>, disparaît de beaucoup de traités après le XVe siècle : on passe directement du blanc au rouge."},
            {t:"Lire le texte", txt:"La Table d'émeraude en entier, dans la bibliothèque.", go:"biblio:tabula"} ] },
  { id:"m13l2", t:"Les sept métaux et les trois principes", sous:"Le plomb de Saturne, l'or du Soleil",
    idee:[
      "Chaque métal est lié à une planète, et c'est pourquoi les alchimistes écrivent les métaux avec les glyphes des astres : le plomb de Saturne, l'étain de Jupiter, le fer de Mars, l'or du Soleil, le cuivre de Vénus, le vif-argent de Mercure, l'argent de la Lune. L'œuvre est souvent pensée comme une montée sur cette échelle, du plomb le plus lourd à l'or le plus pur.",
      "Pour les alchimistes arabes, comme ceux du corpus attribué à Jabir, tous les métaux sont faits de deux principes : le <b>soufre</b>, qui brûle, et le <b>mercure</b>, qui coule. Au XVIe siècle, Paracelse en ajoute un troisième, le <b>sel</b>, qui fixe. Soufre, mercure, sel : on y lira aussi l'âme, l'esprit et le corps.",
      "Ces correspondances sont les mêmes que celles d'Agrippa : l'alchimie n'est pas un monde à part, c'est la même cosmologie appliquée aux métaux. Newton lui-même a laissé plus d'un million de mots de notes alchimiques. L'économiste Keynes, qui en avait acheté une grande partie, l'a appelé « le dernier des magiciens »."
    ],
    source:{ txt:"Newton n'a pas été le premier de l'âge de la raison. Il a été le dernier des magiciens.", ref:"John Maynard Keynes, « Newton, the Man » (1946), traduction pour Arcanes", st:"doc" },
    schema:"metaux",
    ex:{ t:"L'échelle des métaux", txt:"Dans le schéma, monte de Saturne au Soleil. Pour chaque métal, cherche un objet de ta maison qui en contient, sans le toucher s'il s'agit de plomb ou de mercure." },
    carnet:"Mon « plomb », ce qui est lourd en moi, et mon « or », ce qui est déjà précieux :",
    marge:[ {t:"Le mot", txt:"<i>Vif-argent</i> : l'ancien nom du mercure, « l'argent vivant », parce qu'il coule."},
            {t:"Prudence", txt:"Le mercure et le plomb sont toxiques. Ici, l'alchimie se lit comme une histoire et une image, jamais comme une recette."} ] },
  { id:"m13l3", t:"De l'atelier à l'âme", sous:"Atwood, Jung, et ce qu'en disent les historiens",
    idee:[
      "Au XIXe siècle naît une idée nouvelle : l'alchimie n'aurait jamais été de la chimie, mais un langage codé pour la transformation spirituelle. Mary Anne Atwood en 1850, Ethan Allen Hitchcock en 1857 la défendent ; les occultistes, puis la Golden Dawn, la reprennent.",
      "En 1944, le psychiatre Carl Gustav Jung publie <i>Psychologie et alchimie</i>. Il voit dans les images des traités des projections de l'inconscient : l'œuvre au noir, c'est la rencontre avec l'ombre ; l'union du roi et de la reine, celle des contraires en nous ; la pierre, le Soi. Il appelle ce chemin l'<b>individuation</b>. Sa lecture est très féconde pour la méditation et l'écriture.",
      "Les historiens d'aujourd'hui, comme Lawrence Principe et William Newman, ont montré que la plupart des alchimistes faisaient de vraies expériences de laboratoire, et que la lecture « purement spirituelle » est surtout une invention du XIXe siècle. Les deux choses tiennent ensemble : on sait ce qu'était l'alchimie, et on peut se servir de ses images pour penser sa propre transformation. C'est le sens du statut « lecture moderne »."
    ],
    source:{ txt:"Les images de l'alchimie décrivent un processus psychique de transformation, que Jung nomme individuation.", ref:"C. G. Jung, Psychologie et alchimie (1944), résumé de la thèse", st:"mod" },
    schema:"lectures",
    ex:{ t:"Le journal des rêves", txt:"Jung travaillait sur les rêves. Pendant une semaine, note chaque matin ce dont tu te souviens, même un fragment, dans le carnet (type « Un rêve »). Cherche ensuite les images qui reviennent.", outil:"carnet" },
    carnet:"Une image de rêve qui revient, et ce qu'elle pourrait représenter :",
    marge:[ {t:"Pour lire", txt:"Lawrence M. Principe, <i>The Secrets of Alchemy</i> (2013) : l'histoire de l'alchimie telle qu'on la connaît aujourd'hui."},
            {t:"Nuance", txt:"Jung ne dit pas que les alchimistes ne faisaient pas de chimie, mais qu'ils projetaient aussi leur psyché sur la matière."} ] }
  ],
  quiz:[
    { q:"Quelle est la première étape du grand œuvre ?", r:["La nigredo, l'œuvre au noir","La rubedo","L'albedo","La citrinitas"], ok:0, exp:"D'abord la décomposition, puis la purification, puis l'œuvre au rouge." },
    { q:"Quel métal est lié à Saturne ?", r:["Le plomb","L'étain","Le fer","Le cuivre"], ok:0, exp:"Le plus lourd des métaux pour le plus lent des astres." },
    { q:"Quel principe Paracelse ajoute-t-il au soufre et au mercure ?", r:["Le sel","L'or","L'eau","L'azote"], ok:0, exp:"Le sel, qui fixe : les tria prima." },
    { q:"Qui a appelé Newton « le dernier des magiciens » ?", r:["Keynes","Jung","Voltaire","Einstein"], ok:0, exp:"John Maynard Keynes, en 1946, après avoir acheté une partie de ses manuscrits." },
    { q:"Qu'ont montré les historiens comme Principe et Newman ?", r:["Que la plupart des alchimistes faisaient de vraies expériences de laboratoire","Que l'alchimie était uniquement spirituelle","Que la pierre philosophale a été trouvée","Que Jung avait inventé l'alchimie"], ok:0, exp:"La lecture purement spirituelle date surtout du XIXe siècle." }
  ] },

{ id:"m14", n:"XIV", cercle:2, t:"L'art de la mémoire", sous:"Lieux, images, roues et théâtres", img:"chateau",
  lecons:[
  { id:"m14l1", t:"Des lieux et des images", sous:"La méthode de Simonide",
    idee:[
      "Cicéron raconte que le poète Simonide de Céos quitta un jour un banquet juste avant que le toit ne s'effondre. Les corps étaient méconnaissables, mais Simonide put les identifier tous : il se rappelait où chacun était assis. Il en tira une méthode : pour retenir des choses, on les place en imagination dans des <b>lieux</b> bien ordonnés.",
      "Le plus ancien manuel, la <i>Rhétorique à Herennius</i> (vers 85 avant notre ère), en donne les règles. Choisir un bâtiment qu'on connaît, avec des lieux distincts, bien éclairés, pas trop proches les uns des autres. Y déposer des <b>images</b> frappantes, drôles, belles ou laides, car on se souvient de ce qui sort de l'ordinaire. Pour réciter, il suffit de reparcourir le bâtiment.",
      "La méthode marche, et c'est mesuré : en 2017, une équipe de chercheurs a entraîné des volontaires pendant six semaines à la méthode des lieux ; le nombre de mots qu'ils retenaient a plus que doublé, et l'effet durait encore quatre mois après. Les champions de mémoire l'utilisent tous."
    ],
    source:{ txt:"La mémoire artificielle se compose donc de lieux et d'images.", ref:"Rhétorique à Herennius, III, 16, 29 (« Constat igitur artificiosa memoria ex locis et imaginibus »), traduction pour Arcanes", st:"doc" },
    schema:"palais",
    ex:{ t:"Ton premier palais", txt:"Place cinq mots dans cinq lieux, puis récite-les en reparcourant les lieux. Le lendemain, recommence sans regarder.", outil:"outil:palais" },
    carnet:"Les cinq lieux de mon premier palais, dans l'ordre :",
    marge:[ {t:"L'étude", txt:"Dresler et al., <i>Neuron</i>, 2017 : quarante jours d'entraînement à la méthode des lieux."},
            {t:"Le mot", txt:"Les « lieux communs » viennent de là : les <i>loci communes</i> où l'orateur rangeait ses arguments."} ] },
  { id:"m14l2", t:"Roues et théâtres", sous:"Lulle, Camillo, Bruno",
    idee:[
      "Vers 1300, le Majorquin Raymond Lulle invente un « art » pour démontrer la foi chrétienne aux savants juifs et musulmans : des cercles de papier qui tournent, portant des lettres de B à K. Chaque lettre désigne une dignité de Dieu : bonté, grandeur, éternité, pouvoir, sagesse, volonté, vertu, vérité, gloire. En tournant les cercles, on obtient toutes les combinaisons : une machine à penser.",
      "À la Renaissance, l'art de la mémoire devient un art magique. Vers 1530, Giulio Camillo construit en Italie un <b>théâtre de mémoire</b> en bois, assez grand pour y entrer : sept gradins, sept planètes, et dans chaque case des images et des tiroirs de textes, de quoi contenir tout le savoir. En 1582, Giordano Bruno combine les roues de Lulle avec les images des décans : retenir les images du ciel, c'est accorder son esprit à l'univers.",
      "Bruno est brûlé à Rome en 1600, pour ses thèses théologiques plus que pour sa magie. L'historienne Frances Yates a raconté cette histoire dans <i>L'Art de la mémoire</i> (1966) : pour ces penseurs, la mémoire n'était pas un entrepôt, mais un miroir du cosmos au-dedans de soi."
    ],
    source:{ txt:"Le théâtre s'élève en sept gradins, divisés par sept allées qui figurent les sept planètes.", ref:"D'après Giulio Camillo, L'Idea del Theatro (1550), résumé", st:"doc" },
    schema:"roues",
    ex:{ t:"Tourner les roues", txt:"Tourne les trois roues de Lulle et lis la combinaison obtenue comme une phrase : « la bonté est grande, selon la concordance »… Laquelle t'arrête ?", outil:"outil:roues" },
    carnet:"La combinaison des roues qui m'a donné à penser, et ce qu'elle m'a dit :",
    marge:[ {t:"Les lettres", txt:"B bonté, C grandeur, D éternité, E pouvoir, F sagesse, G volonté, H vertu, I vérité, K gloire. Le J n'était pas encore une lettre distincte."},
            {t:"Pour lire", txt:"Frances A. Yates, <i>L'Art de la mémoire</i> (1966), trad. Gallimard."} ] },
  { id:"m14l3", t:"Le temple intérieur", sous:"Un lieu qu'on bâtit en soi",
    idee:[
      "Les occultistes du XXe siècle ont réuni l'art de la mémoire et la méditation guidée. Dans la Golden Dawn, puis chez Dion Fortune, l'élève bâtit en imagination un <b>temple</b> précis, toujours le même, qu'il visite en méditation et où il accomplit ses rituels quand il ne peut pas les faire physiquement.",
      "Jung, de son côté, appelait <b>imagination active</b> le fait de laisser vivre des images en restant éveillé et attentif, de dialoguer avec elles et de noter ce qui vient. Il la distinguait de la rêverie : on y reste présent, et on peut s'arrêter à tout moment.",
      "Le parcours proposé ici est une <b>lecture moderne</b> de ces pratiques, en sept séances : le seuil, le sol et les murs, les quatre fenêtres, l'autel, la lampe, la bibliothèque, puis habiter le lieu. Fais une séance par jour au plus. Si une image te met mal à l'aise, ouvre les yeux, bouge, et reprends un autre jour, ou pas du tout."
    ],
    source:{ txt:"L'imagination active consiste à laisser émerger des images tout en restant conscient, et à entrer en rapport avec elles.", ref:"C. G. Jung, d'après Dialectique du Moi et de l'inconscient (1928), résumé", st:"mod" },
    schema:"temple",
    ex:{ t:"Les sept séances", txt:"Lance la première séance du temple intérieur. Chaque séance ajoute un élément ; l'application se souvient de ta progression.", outil:"rituel:temple" },
    carnet:"Ce que j'ai vu sur le seuil de mon temple :",
    marge:[ {t:"Prudence", txt:"L'imagination guidée est déconseillée sans accompagnement en cas de troubles dissociatifs ou psychotiques.", go:"lec:m8l3"},
            {t:"Voir aussi", txt:"Le palais de mémoire : le même principe, des lieux ordonnés, au service du souvenir.", go:"outil:palais"} ] }
  ],
  quiz:[
    { q:"À qui la tradition attribue-t-elle l'invention de la méthode des lieux ?", r:["Simonide de Céos","Cicéron","Giordano Bruno","Raymond Lulle"], ok:0, exp:"Après l'effondrement du toit d'une salle de banquet, selon le récit de Cicéron." },
    { q:"Selon la Rhétorique à Herennius, de quoi se compose la mémoire artificielle ?", r:["De lieux et d'images","De nombres et de lettres","De sons et de couleurs","De répétitions"], ok:0, exp:"« Ex locis et imaginibus »." },
    { q:"Que portent les roues de Lulle ?", r:["Des lettres désignant les dignités de Dieu","Les signes du zodiaque","Les 22 lettres hébraïques","Les sept métaux"], ok:0, exp:"B la bonté, C la grandeur, et ainsi de suite jusqu'à K, la gloire." },
    { q:"Combien de gradins compte le théâtre de Camillo ?", r:["Sept","Douze","Trois","Vingt-deux"], ok:0, exp:"Sept, comme les sept planètes." },
    { q:"Comment Jung appelle-t-il le fait de laisser vivre des images en restant éveillé ?", r:["L'imagination active","La rêverie dirigée","L'hypnose","La projection"], ok:0, exp:"On y reste présent, et on peut s'arrêter à tout moment." }
  ] }
];

/* ---------------------------------------------------------------- la bibliothèque */
const BIBLIO = [
  { id:"tabula", t:"La Table d'émeraude", auteur:"Attribuée à Hermès Trismégiste", date:"Arabe, VIIIe-IXe siècle ; latin, XIIe siècle", trad:"Traduction française dite de l'Hortulain", img:"hermes",
    com:["Treize phrases à peine, et mille ans de commentaires. La plus ancienne version connue est arabe, dans le <i>Livre du secret de la création</i> attribué à Balînûs (Apollonius de Tyane). La version latine dite « vulgate » circule à partir du XIIe siècle, et la première édition imprimée paraît en 1541.",
         "Le mot <i>telesme</i> vient d'une incompréhension : le traducteur latin n'a pas compris l'arabe <i>tilasm</i>, « talisman », et l'a recopié. Les alchimistes y ont lu « le secret », « le trésor »."],
    go:["lec:m2l1","lec:m13l1"] },
  { id:"timee", t:"Le monde, un vivant", auteur:"Platon", date:"Timée, 29e-30b, vers 360 avant notre ère", trad:"Traduction de Victor Cousin (1839)",
    com:["Le passage fondateur de toute la cosmologie magique : le monde est un « animal », un être vivant, doué d'une âme et d'une intelligence. Les néoplatoniciens, puis Ficin et Agrippa, bâtiront sur lui.",
         "Remarque le raisonnement : rien de visible n'est plus beau qu'un être intelligent, il n'y a pas d'intelligence sans âme, donc le monde a une âme."],
    go:["lec:m9l1"] },
  { id:"plotin", t:"Comment agit la magie", auteur:"Plotin", date:"Ennéades, IV, 4, 40, IIIe siècle", trad:"Traduction de Marie-Nicolas Bouillet (1857)",
    com:["La première théorie philosophique de la magie. Pour Plotin, le magicien n'a aucun pouvoir propre : il utilise des attractions qui existent déjà entre les choses, parce qu'elles font partie d'un même vivant.",
         "La suite du chapitre précise que ces charmes n'atteignent que la partie irrationnelle de l'âme : le sage, tourné vers l'intelligence, leur échappe."],
    go:["lec:m9l1"] },
  { id:"poimandres", t:"Poimandrès", auteur:"Corpus Hermeticum, traité I", date:"Égypte romaine, IIe-IIIe siècle", trad:"Traduction de Louis Ménard (1866)",
    com:["Le premier traité du <i>Corpus Hermeticum</i>, celui que Ficin traduisit pour Cosme de Médicis. Hermès y reçoit une vision de la création de la bouche de Poimandrès, « l'intelligence souveraine ».",
         "En 1614, le philologue Isaac Casaubon montra que ces textes datent des premiers siècles de notre ère, et non de l'Égypte des pharaons. Ils n'en restent pas moins l'une des sources de la pensée hermétique."],
    go:["lec:m10l1","hist:h1"] },
  { id:"asclepios", t:"Les statues animées", auteur:"Asclépius, 23-24 et 37-38", date:"Égypte romaine, IIe-IIIe siècle", trad:"Traduction de Louis Ménard (1866)",
    com:["Le passage le plus célèbre et le plus discuté de la littérature hermétique : les Égyptiens savaient faire descendre des dieux dans des statues, en les attirant par des herbes, des pierres, des parfums et de la musique.",
         "Augustin le condamne dans <i>La Cité de Dieu</i> ; Ficin le discute avec prudence au livre III de <i>La Vie</i>. Toute la théorie du talisman en découle."],
    go:["lec:m10l1","lec:m4l2"] },
  { id:"hymnes", t:"Les hymnes des sept planètes", auteur:"Hymnes orphiques", date:"Asie Mineure, IIe-IVe siècle", trad:"Traduction de Leconte de Lisle (1869)",
    com:["Les hymnes que Ficin chantait en s'accompagnant de sa lyre. Chacun s'ouvre sur le parfum à brûler pour la divinité. On a gardé ici les sept dieux des planètes : Hèlios, Sélènè, Kronos, Zeus, Herméias, Aphroditè et Arès.",
         "Lis-les à voix haute : ils ont été écrits pour être dits."],
    go:["lec:m10l2","rituel:chant"] },
  { id:"versdores", t:"L'examen du soir", auteur:"Vers dorés, attribués à Pythagore", date:"Grèce, IVe-IIIe siècle avant notre ère (date discutée)", trad:"Traduction de P.-C. Lévesque ; en vers, Fabre d'Olivet (1813)",
    com:["Un petit catéchisme moral de l'école pythagoricienne. Ce passage décrit l'examen du soir : repasser sa journée avant de dormir.",
         "C'est la pratique du soir du cycle de 28 jours. Fabre d'Olivet, en 1813, l'a mise en vers ; on donne aussi ses trois vers."],
    go:["cycle","rituel:examen"] },
  { id:"florilege", t:"Florilège", auteur:"Courts fragments cités dans le cours", date:"De l'Antiquité au XXe siècle", trad:"Traductions pour Arcanes, sauf mention",
    com:["Les phrases brèves qui ouvrent les leçons du second cercle, réunies ici avec leurs références."],
    items:[
      ["Par trente-deux voies merveilleuses de sagesse, Yah, l'Éternel des armées, a gravé et créé son monde.","Sefer Yetsirah, I, 1"],
      ["La mémoire artificielle se compose donc de lieux et d'images.","Rhétorique à Herennius, III, 16, 29"],
      ["Les mouvements célestes ne sont rien d'autre qu'un chant continu à plusieurs voix, perçu par l'intelligence et non par l'oreille.","Kepler, Harmonices Mundi, V, 7 (1619)"],
      ["Newton n'a pas été le premier de l'âge de la raison. Il a été le dernier des magiciens.","Keynes, « Newton, the Man » (1946)"],
      ["Et le roi de Sheshakh boira après eux.","Jérémie 25, 26"]
    ],
    go:["lec:m12l1","lec:m14l1"] }
];

/* ---------------------------------------------------------------- la géomancie (Agrippa, II, 48) */
const GEO = [
  { id:"via", nom:"Via", fr:"le chemin", p:[1,1,1,1], pl:"lune", q:"mix", sens:"Le mouvement, le voyage, le changement. Bon pour ce qui doit bouger, mauvais pour ce qui doit durer." },
  { id:"populus", nom:"Populus", fr:"le peuple", p:[2,2,2,2], pl:"lune", q:"mix", sens:"La foule, l'assemblée, le groupe. Elle reflète ce qui l'entoure : son sens dépend des figures voisines." },
  { id:"conjunctio", nom:"Conjunctio", fr:"la conjonction", p:[2,1,1,2], pl:"mercure", q:"mix", sens:"La rencontre, l'union, le lien. Ce qui se rejoint ou se retrouve." },
  { id:"carcer", nom:"Carcer", fr:"la prison", p:[1,2,2,1], pl:"saturne", q:"def", sens:"L'enfermement, le retard, la contrainte. Mais aussi ce qui protège et ce qui tient." },
  { id:"fortunamajor", nom:"Fortuna Major", fr:"la grande fortune", p:[2,2,1,1], pl:"soleil", q:"fav", sens:"La réussite durable, gagnée par ses propres forces. La meilleure des figures." },
  { id:"fortunaminor", nom:"Fortuna Minor", fr:"la petite fortune", p:[1,1,2,2], pl:"soleil", q:"fav", sens:"Le succès rapide et passager, l'aide extérieure. À saisir vite." },
  { id:"acquisitio", nom:"Acquisitio", fr:"le gain", p:[2,1,2,1], pl:"jupiter", q:"fav", sens:"Ce que l'on reçoit, gagne ou obtient. Favorable aux biens et aux projets." },
  { id:"amissio", nom:"Amissio", fr:"la perte", p:[1,2,1,2], pl:"venus", q:"def", sens:"Ce qui s'en va. Défavorable aux biens, mais pas toujours en amour, où l'on « se perd »." },
  { id:"laetitia", nom:"Laetitia", fr:"la joie", p:[1,2,2,2], pl:"jupiter", q:"fav", sens:"La joie, la santé, l'élan vers le haut, comme une tour." },
  { id:"tristitia", nom:"Tristitia", fr:"la tristesse", p:[2,2,2,1], pl:"saturne", q:"def", sens:"La tristesse, la descente, ce qui pèse. Favorable seulement à ce qui doit s'enraciner." },
  { id:"puella", nom:"Puella", fr:"la jeune fille", p:[1,2,1,1], pl:"venus", q:"fav", sens:"L'harmonie, la douceur, la beauté. Favorable, mais parfois inconstante." },
  { id:"puer", nom:"Puer", fr:"le jeune garçon", p:[1,1,2,1], pl:"mars", q:"mix", sens:"L'ardeur, le courage, l'impulsion, le conflit. Bon pour l'action, mauvais pour la paix." },
  { id:"rubeus", nom:"Rubeus", fr:"le rouge", p:[2,1,2,2], pl:"mars", q:"def", sens:"La passion, la colère, le sang chaud. Une figure qui met en garde." },
  { id:"albus", nom:"Albus", fr:"le blanc", p:[2,2,1,2], pl:"mercure", q:"fav", sens:"La sagesse, la paix, la clarté, la réflexion. Lente, mais favorable." },
  { id:"caput", nom:"Caput Draconis", fr:"la tête du dragon", p:[2,1,1,1], pl:"nn", q:"fav", sens:"Le commencement, l'entrée, la porte qui s'ouvre. Favorable à ce qui commence." },
  { id:"cauda", nom:"Cauda Draconis", fr:"la queue du dragon", p:[1,1,1,2], pl:"ns", q:"def", sens:"La fin, la sortie, la porte qui se ferme. Favorable seulement à ce qui doit finir." }
];

/* ---------------------------------------------------------------- l'alphabet hébreu (Sefer Yetsirah, attributions de la Golden Dawn) */
const HEBREU = [
  ["א","Aleph",1,"mère","le bœuf","l'Air"],["ב","Beth",2,"double","la maison","Mercure"],["ג","Gimel",3,"double","le chameau","la Lune"],
  ["ד","Daleth",4,"double","la porte","Vénus"],["ה","He",5,"simple","la fenêtre","le Bélier"],["ו","Vav",6,"simple","le clou","le Taureau"],
  ["ז","Zayin",7,"simple","l'épée","les Gémeaux"],["ח","Heth",8,"simple","l'enclos","le Cancer"],["ט","Teth",9,"simple","le serpent","le Lion"],
  ["י","Yod",10,"simple","la main","la Vierge"],["כ","Kaph",20,"double","la paume","Jupiter"],["ל","Lamed",30,"simple","l'aiguillon","la Balance"],
  ["מ","Mem",40,"mère","l'eau","l'Eau"],["נ","Nun",50,"simple","le poisson","le Scorpion"],["ס","Samekh",60,"simple","l'appui","le Sagittaire"],
  ["ע","Ayin",70,"simple","l'œil","le Capricorne"],["פ","Peh",80,"double","la bouche","Mars"],["צ","Tsadé",90,"simple","l'hameçon","le Verseau"],
  ["ק","Qoph",100,"simple","la nuque","les Poissons"],["ר","Resh",200,"double","la tête","le Soleil"],["ש","Shin",300,"mère","la dent","le Feu"],
  ["ת","Tav",400,"double","le signe","Saturne"]
].map(([l, nom, v, f, sens, attr]) => ({l, nom, v, f, sens, attr}));
const FINALES = {"ך":20,"ם":40,"ן":50,"ף":80,"ץ":90};
const EXEMPLES_GEMATRIE = [
  {w:"אחד", tr:"ehad", fr:"un"}, {w:"אהבה", tr:"ahavah", fr:"amour"}, {w:"יהוה", tr:"YHVH", fr:"le Nom"},
  {w:"אמן", tr:"amen", fr:"amen"}, {w:"בבל", tr:"Babel", fr:"Babel"}, {w:"חיים", tr:"hayim", fr:"la vie"}, {w:"אור", tr:"or", fr:"la lumière"}
];

/* ---------------------------------------------------------------- Kepler, Harmonices Mundi, V (1619) */
const KEPLER = [
  { id:"saturne", nom:"Saturne", r:"4:5", iv:"tierce majeure", base:98.0 },
  { id:"jupiter", nom:"Jupiter", r:"5:6", iv:"tierce mineure", base:196.0 },
  { id:"mars", nom:"Mars", r:"2:3", iv:"quinte", base:261.6 },
  { id:"terre", nom:"La Terre", r:"15:16", iv:"demi-ton, mi-fa", base:392.0 },
  { id:"venus", nom:"Vénus", r:"24:25", iv:"dièse, presque l'unisson", base:659.3 },
  { id:"mercure", nom:"Mercure", r:"5:12", iv:"octave et tierce mineure", base:523.3 }
];

/* ---------------------------------------------------------------- le cycle de 28 jours */
const CYCLE = {
  semaines:[
    { t:"Le corps et le souffle", matin:"carre", desc:"Respirer, observer, écrire. Rien d'autre : on pose les fondations." },
    { t:"Le cercle", matin:"lbrp", desc:"Le Pentagramme mineur chaque matin. On apprend à faire place nette." },
    { t:"Les planètes", matin:"lbrp", plus:"contemple", desc:"Le Pentagramme, puis cinq minutes avec la planète du jour." },
    { t:"La colonne et le temple", matin:"lbrp", plus:"pilier", soirPlus:"temple", desc:"Le Pentagramme et le Pilier du milieu ; le soir, une séance du temple intérieur." }
  ],
  midi:"salut", soir:"examen",
  consignes:[
    "Observe ta respiration trois fois dans la journée, sans la changer.",
    "Note l'heure planétaire de trois moments de ta journée. Est-ce qu'elle « colle » ?",
    "Mange un repas entier sans écran, en remarquant les couleurs.",
    "Repère dans ta rue un objet de chacune des sept planètes.",
    "Pendant la respiration en carré, compte plus lentement d'un temps.",
    "Écris une page sur ce qui te pousse vers la magie, sans te relire.",
    "Relis tes six jours de carnet. Qu'est-ce qui revient ?",
    "Avant le Pentagramme, oriente-toi : où est l'est, chez toi ?",
    "Pendant la Croix kabbalistique, sens le poids de tes pieds.",
    "Trace le pentagramme lentement, comme si tu dessinais dans du sable.",
    "Ce soir, pendant l'examen, cherche un seul geste dont tu es fier.",
    "Fais le Pentagramme à voix basse, presque murmurée. Qu'est-ce qui change ?",
    "Dans la journée, refais mentalement le cercle autour de toi, en dix secondes.",
    "Relis la deuxième semaine. Le matin est-il plus calme qu'au début ?",
    "Après le Pentagramme, contemple la planète du jour : sa couleur, son verbe.",
    "Porte quelque chose de la couleur de la planète du jour.",
    "Écoute la note de la planète du jour dans l'harmonie de Kepler.",
    "Lis l'hymne orphique de la planète du jour, à voix haute.",
    "Pendant la contemplation, laisse venir une image, sans la chercher.",
    "Remarque une personne qui, aujourd'hui, ressemble à la planète du jour.",
    "Relis la troisième semaine : quelle planète t'a le plus parlé ?",
    "Après le Pentagramme, allume le Pilier du milieu, sphère par sphère.",
    "Pendant le Pilier, attarde-toi sur la sphère du cœur.",
    "Fais circuler la lumière du Pilier trois fois avant de finir.",
    "Dans ton temple intérieur, remarque un détail que tu n'avais pas vu.",
    "Fais tout le matin sans regarder l'application.",
    "Écris ce que tu gardes de ces quatre semaines, et ce que tu laisses.",
    "Le cycle se termine. Relis tout ton carnet, du premier jour à aujourd'hui."
  ]
};

/* ---------------------------------------------------------------- les grades, sur l'Arbre (Golden Dawn) */
const GRADES = [
  { min:0, nom:"Néophyte", code:"0=0", sep:null, el:"", phrase:"Tu as franchi le seuil. Tout reste à apprendre, et c'est une bonne place." },
  { min:2, nom:"Zelator", code:"1=10", sep:10, el:"la Terre", phrase:"Malkuth, le Royaume : la terre sous tes pieds. Le premier grade est celui du corps et du concret." },
  { min:4, nom:"Theoricus", code:"2=9", sep:9, el:"l'Air", phrase:"Yesod, le Fondement, sphère de la Lune : le monde des images et des rêves." },
  { min:6, nom:"Practicus", code:"3=8", sep:8, el:"l'Eau", phrase:"Hod, la Splendeur, sphère de Mercure : l'intelligence, les mots et les nombres." },
  { min:8, nom:"Philosophus", code:"4=7", sep:7, el:"le Feu", phrase:"Netzach, la Victoire, sphère de Vénus : le désir, la beauté et les arts." },
  { min:11, nom:"Seigneur du Portail", code:"P", sep:null, path:25, el:"l'Esprit", phrase:"Le Portail : tu te tiens au pied du sentier qui monte vers le cœur de l'Arbre." },
  { min:14, nom:"Adeptus Minor", code:"5=6", sep:6, el:"", phrase:"Tiphareth, la Beauté, le Soleil au centre de l'Arbre. Le cours est parcouru ; la pratique, elle, commence." }
];

/* ---------------------------------------------------------------- les gloses (notes en marge automatiques) */
const GLOSSAIRE = {
  "Agrippa":"Henri Corneille Agrippa (1486-1535), auteur de <i>La Philosophie occulte</i> (1533), la grande somme de la magie de la Renaissance.",
  "Picatrix":"Traité arabe de magie astrale (<i>Ghāyat al-Ḥakīm</i>, XIe siècle), traduit en latin en 1256 à la cour d'Alphonse X.",
  "Golden Dawn":"L'Ordre hermétique de l'Aube dorée, fondé à Londres en 1888 : la source de la plupart des rituels occidentaux modernes.",
  "Hermès Trismégiste":"« Hermès trois fois très grand » : le nom grec du dieu égyptien Thot, auteur légendaire des textes hermétiques.",
  "Corpus Hermeticum":"Dix-sept traités grecs des premiers siècles de notre ère, attribués à Hermès, traduits en latin par Ficin en 1463.",
  "Kabbale":"La tradition mystique juive, dont les chrétiens de la Renaissance ont tiré une « Kabbale chrétienne », puis hermétique.",
  "sephiroth":"Les dix sphères de l'Arbre de vie : les nombres ou émanations par lesquels le divin se manifeste.",
  "Sefer Yetsirah":"Le « Livre de la formation », court traité hébreu (IIe-VIe siècle) sur les 10 nombres et les 22 lettres.",
  "néoplaton":"Le néoplatonisme : la philosophie de Plotin et de ses successeurs (IIIe-VIe siècle), qui fait tout émaner de l'Un.",
  "Plotin":"Philosophe grec (205-270), fondateur du néoplatonisme. Ses écrits ont été réunis par Porphyre en six <i>Ennéades</i>.",
  "Jamblique":"Philosophe syrien (vers 245-325), défenseur de la théurgie dans <i>Les Mystères d'Égypte</i>.",
  "Proclus":"Philosophe néoplatonicien d'Athènes (412-485), le dernier grand systématicien de l'école.",
  "Ficin":"Marsile Ficin (1433-1499), philosophe florentin, traducteur de Platon et du Corpus Hermeticum.",
  "Kepler":"Johannes Kepler (1571-1630), astronome : les orbites elliptiques, et l'harmonie du monde.",
  "décans":"Les 36 tranches de 10° du zodiaque, héritées des étoiles horaires de l'Égypte.",
  "théurgie":"L'« œuvre divine » : s'élever vers les dieux par les rites, selon les néoplatoniciens.",
  "goétie":"La magie qui contraint les puissances ; le mot a fini par désigner l'invocation des démons.",
  "spiritus":"Chez Ficin, le souffle subtil qui relie le corps et l'âme, et l'âme du monde à son corps.",
  "guématrie":"La lecture des mots par la valeur numérique de leurs lettres.",
  "Pentagramme mineur":"Le rituel de bannissement de la Golden Dawn : la Croix kabbalistique, quatre pentagrammes, les quatre archanges.",
  "Pilier du milieu":"L'exercice d'Israel Regardie (1938) : cinq sphères de lumière le long du corps.",
  "Regardie":"Israel Regardie (1907-1985), ancien secrétaire de Crowley, qui publia les rituels de la Golden Dawn.",
  "Crowley":"Aleister Crowley (1875-1947), occultiste anglais, fondateur de Thelema.",
  "Dion Fortune":"Violet Firth (1890-1946), occultiste anglaise, autrice de <i>La Kabbale mystique</i> (1935).",
  "Éliphas Lévi":"Alphonse-Louis Constant (1810-1875), qui relia le tarot aux 22 lettres hébraïques.",
  "Spare":"Austin Osman Spare (1886-1956), peintre et mage anglais, inventeur de la méthode des sigils.",
  "sigil":"Un signe fabriqué à partir d'une intention écrite, dont on a ôté les lettres en double.",
  "Dee":"John Dee (1527-1608), mathématicien et astrologue d'Élisabeth Ire, auteur de la <i>Monade hiéroglyphique</i>.",
  "Fludd":"Robert Fludd (1574-1637), médecin anglais, défenseur de la Rose-Croix et grand faiseur de gravures cosmiques.",
  "Bruno":"Giordano Bruno (1548-1600), philosophe de l'univers infini et de la mémoire magique, brûlé à Rome.",
  "Lulle":"Raymond Lulle (vers 1232-1316), philosophe majorquin, inventeur d'un art combinatoire à roues.",
  "Paracelse":"Médecin suisse (1493-1541), réformateur de la médecine et de l'alchimie : les trois principes.",
  "Jung":"Carl Gustav Jung (1875-1961), psychiatre suisse, fondateur de la psychologie analytique.",
  "talisman":"Une image ou un signe fait au moment favorable, pour capter la vertu d'un astre.",
  "grimoire":"Un livre de magie pratique, souvent attribué à Salomon ou à un mage fameux.",
  "Heptameron":"Petit traité attribué à Pierre d'Abano, imprimé au XVIe siècle : les anges et les rites des jours.",
  "élection":"En astrologie, le choix du moment favorable pour commencer une action.",
  "ordre chaldéen":"L'ordre des sept astres du plus lent au plus rapide : Saturne, Jupiter, Mars, Soleil, Vénus, Mercure, Lune.",
  "Simonide":"Poète grec (vers 556-468 avant notre ère), inventeur légendaire de l'art de la mémoire."
};

/* ---------------------------------------------------------------- notes en marge du premier cercle */
const MARGES = {
  m1l1:[{t:"Voir aussi", txt:"Plotin, pour qui la vraie magie est l'amour qui règne dans l'univers.", go:"biblio:plotin"}],
  m1l2:[{t:"Plus loin", txt:"Goétie, mageia, théurgie : les mots grecs de la magie, au module IX.", go:"lec:m9l2"}],
  m1l3:[{t:"Pratiquer", txt:"Le cycle de 28 jours met ces quatre outils en pratique, un mois durant.", go:"cycle"}],
  m2l1:[{t:"Lire le texte", txt:"La Table d'émeraude en entier.", go:"biblio:tabula"},{t:"Plus loin", txt:"D'où vient l'idée de sympathie : l'âme du monde, au module IX.", go:"lec:m9l1"}],
  m2l2:[{t:"Voir aussi", txt:"Les sept métaux et leurs planètes, en alchimie.", go:"lec:m13l2"}],
  m2l3:[{t:"L'outil", txt:"La toile des correspondances relie tout d'un geste.", go:"outil:toile"}],
  m3l1:[{t:"Plus loin", txt:"L'harmonie des sphères : chaque planète a aussi sa note.", go:"lec:m9l3"}],
  m3l2:[{t:"Pratiquer", txt:"Le chant planétaire de Ficin se fait à l'heure de la planète.", go:"rituel:chant"}],
  m3l3:[{t:"Lire", txt:"Les hymnes orphiques des sept planètes.", go:"biblio:hymnes"}],
  m4l1:[{t:"Plus loin", txt:"Les nombres des lettres hébraïques, au module XII.", go:"lec:m12l1"}],
  m4l2:[{t:"Lire le texte", txt:"Les statues animées de l'Asclépius, ancêtres du talisman.", go:"biblio:asclepios"},{t:"Voir aussi", txt:"Les images des décans, que l'on gravait sur les talismans.", go:"lec:m10l3"}],
  m4l3:[{t:"Voir aussi", txt:"AGLA et les initiales sacrées : le notarikon.", go:"lec:m12l2"}],
  m5l1:[{t:"Plus loin", txt:"Le Sefer Yetsirah et les trois familles de lettres.", go:"lec:m12l1"}],
  m5l2:[{t:"Ta progression", txt:"Les grades de l'école montent l'Arbre, de Malkuth à Tiphareth."}],
  m5l3:[{t:"Voir aussi", txt:"Les 36 décans et les petites lames du tarot.", go:"outil:decans"}],
  m6l1:[{t:"Pratiquer", txt:"La deuxième semaine du cycle de 28 jours est consacrée au cercle.", go:"cycle"}],
  m6l2:[{t:"Voir aussi", txt:"Le salut au soleil, pour les autres moments du jour.", go:"rituel:salut"}],
  m6l3:[{t:"Plus loin", txt:"Le temple intérieur prolonge le Pilier par l'imagination.", go:"lec:m14l3"}],
  m7l1:[{t:"Voir aussi", txt:"Les lettres comme matière du monde, dans la Kabbale.", go:"lec:m12l1"}],
  m7l2:[{t:"Plus loin", txt:"Jung et l'imagination active, au module XIV.", go:"lec:m14l3"}],
  m7l3:[{t:"Voir aussi", txt:"La Monade de Dee : un autre signe qui condense tout.", go:"outil:monade"}],
  m8l1:[{t:"Lire le texte", txt:"L'examen du soir des Vers dorés : le plus vieux carnet de pratique.", go:"biblio:versdores"}],
  m8l2:[{t:"Plus loin", txt:"La méthode des lieux, une technique mentale dont l'efficacité est mesurée.", go:"lec:m14l1"}],
  m8l3:[{t:"Pratiquer", txt:"L'examen du soir, guidé.", go:"rituel:examen"}]
};

return { MODULES, BIBLIO, GEO, HEBREU, FINALES, EXEMPLES_GEMATRIE, KEPLER, CYCLE, GRADES, GLOSSAIRE, MARGES };
})();
