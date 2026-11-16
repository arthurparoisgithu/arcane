/* ===== Arcanes · Magie : l'Arbre de vie en détail, les 22 lettres, la guématrie complète =====
   Données pour l'atelier (Arbre, guématrie) et leçons ajoutées aux modules V et XII.
   Statuts : doc = documenté, trad = tradition, mod = lecture moderne.
   Les valeurs numériques sont toutes recalculées par le code (voir GEM.val) : aucune n'est saisie à la main. */
window.MAGIE_KAB = (() => {

/* ---------------------------------------------------------------- les sephiroth, en plus des fiches existantes
   monde et triade : découpage enseigné par la Golden Dawn et Dion Fortune ; vertu, vice, expérience : Dion Fortune, La Kabbale mystique, 1935 */
const SEPH = {
  1:{tri:"céleste", monde:"Atziluth", corps:"le sommet du crâne", role:"L'unité avant toute division. Rien ne s'y oppose à rien.",
     exp:"l'union avec la source", vertu:"l'accomplissement", vice:"aucun", image:"un vieux roi vu de profil",
     q:"Qu'est-ce qui, dans cette affaire, est un et ne se discute pas ?"},
  2:{tri:"céleste", monde:"Atziluth", corps:"le côté droit de la tête", role:"La force pure, l'élan qui sort de l'unité. Le pôle qui donne.",
     exp:"la vision face à face", vertu:"le dévouement", vice:"aucun", image:"un homme barbu",
     q:"Quelle est l'impulsion première, avant tout plan ?"},
  3:{tri:"céleste", monde:"Atziluth", corps:"le côté gauche de la tête", role:"La forme pure, qui reçoit l'élan et le limite. Le pôle qui contient. Avec elle commence le temps, d'où Saturne.",
     exp:"la vision de la douleur", vertu:"le silence", vice:"l'avarice", image:"une femme mûre, une mère",
     q:"Quelle limite rend la chose possible ?"},
  4:{tri:"morale", monde:"Briah", corps:"le bras droit", role:"Ce qui bâtit, accorde, rassemble. La loi qui protège.",
     exp:"la vision de l'amour", vertu:"l'obéissance", vice:"la tyrannie, l'hypocrisie, la gloutonnerie", image:"un roi couronné sur son trône",
     q:"Qu'est-ce que je dois donner, élargir, autoriser ?"},
  5:{tri:"morale", monde:"Briah", corps:"le bras gauche", role:"Ce qui tranche, retire, corrige. Le chirurgien de l'Arbre.",
     exp:"la vision de la puissance", vertu:"l'énergie, le courage", vice:"la cruauté, la destruction", image:"un guerrier sur son char",
     q:"Qu'est-ce que je dois couper, refuser, finir ?"},
  6:{tri:"morale", monde:"Briah", corps:"la poitrine, le cœur", role:"Le centre. Elle reçoit de huit sephiroth et les accorde. C'est le « soi » qui tient ensemble le haut et le bas.",
     exp:"la vision de l'harmonie des choses", vertu:"le dévouement au grand œuvre", vice:"l'orgueil", image:"un roi, un enfant, un dieu sacrifié",
     q:"Où est le point d'équilibre ? Qu'est-ce qui est juste et beau à la fois ?"},
  7:{tri:"astrale", monde:"Yetzirah", corps:"la hanche et la jambe droites", role:"Le sentiment, l'élan vers ce qu'on aime, la nature et les arts.",
     exp:"la vision de la beauté triomphante", vertu:"le désintéressement", vice:"la luxure", image:"une belle femme nue",
     q:"Qu'est-ce que je désire vraiment ici ?"},
  8:{tri:"astrale", monde:"Yetzirah", corps:"la hanche et la jambe gauches", role:"La pensée qui nomme, classe et formule. La sphère des livres et des rites.",
     exp:"la vision de la splendeur", vertu:"la véracité", vice:"le mensonge", image:"un hermaphrodite",
     q:"Comment le dire exactement ? Quel est le plan ?"},
  9:{tri:"astrale", monde:"Yetzirah", corps:"le sexe", role:"Le réservoir des images. Tout ce qui va prendre corps passe d'abord par là, comme un moule.",
     exp:"la vision de la machinerie de l'univers", vertu:"l'indépendance", vice:"la paresse", image:"un bel homme nu, très fort",
     q:"Quelle image, quelle habitude, quel rêve porte la chose ?"},
  10:{tri:"", monde:"Assiah", corps:"les pieds", role:"Le résultat. Le monde des corps et des faits, où tout ce qui précède se vérifie.",
     exp:"la rencontre de son ange gardien", vertu:"le discernement", vice:"l'avarice, l'inertie", image:"une jeune femme couronnée sur son trône",
     q:"Concrètement, qu'est-ce que je fais demain matin ?"}
};
const DAATH = {nom:"Daath", heb:"דעת", sens:"la Connaissance",
  txt:"Daath n'est pas une onzième sephira. C'est le point où la Sagesse et l'Intelligence se joignent, dessiné en pointillé sur le pilier du milieu. Il se trouve au-dessus de l'<b>Abîme</b>, la coupure qui sépare les trois sephiroth d'en haut, que l'esprit ne peut que pressentir, des sept d'en bas, que l'on peut vivre. Le <i>Sefer Yetsirah</i> insiste : « dix et non neuf, dix et non onze ». Les kabbalistes juifs comptent Daath à la place de Kether quand ils regardent l'Arbre du point de vue de l'homme. Les occultistes modernes en ont fait une porte, parfois inquiétante."};

/* ---------------------------------------------------------------- les façons de lire l'Arbre (calques de l'atelier) */
const LECTURES = [
  {id:"piliers", t:"Les trois piliers", st:"trad",
   txt:"L'Arbre tient sur trois colonnes. À droite, la <b>Miséricorde</b> : Chokmah, Chesed, Netzach, tout ce qui donne, pousse, élargit. On l'appelle aussi le pilier de la Force. À gauche, la <b>Rigueur</b> : Binah, Geburah, Hod, tout ce qui reçoit, limite, donne une forme. Au milieu, l'<b>Équilibre</b> : Kether, Tiphareth, Yesod, Malkuth, où les deux se concilient.",
   regle:"La règle à retenir : aucune sephira n'est bonne ou mauvaise seule. Trop de Chesed étouffe, trop de Geburah détruit. Chaque paire horizontale est une balance, et la sephira du milieu, juste en dessous, en est l'aiguille."},
  {id:"triades", t:"Les trois triades", st:"trad",
   txt:"Neuf sephiroth forment trois triangles. En haut, la <b>triade céleste</b> : Kether, Chokmah, Binah, pointe en haut. C'est le plan des principes. Au milieu, la <b>triade morale</b> : Chesed, Geburah, Tiphareth, pointe en bas. C'est le plan des choix. En bas, la <b>triade astrale</b> : Netzach, Hod, Yesod, pointe en bas. C'est le plan des désirs, des pensées et des images. <b>Malkuth</b> pend seule, en dessous : elle reçoit tout.",
   regle:"Dans chaque triangle, on retrouve le même mouvement : une force, une forme qui lui répond, et un troisième terme qui les réunit. C'est la même loi rejouée à trois étages."},
  {id:"mondes", t:"Les quatre mondes", st:"trad",
   txt:"La Kabbale décrit quatre mondes, du plus subtil au plus dense. <b>Atziluth</b>, l'Émanation, où tout est encore en Dieu. <b>Briah</b>, la Création, monde des archanges et des idées. <b>Yetzirah</b>, la Formation, monde des anges et des images. <b>Assiah</b>, l'Action, le monde matériel. On les rattache aux quatre lettres du Nom, Yod, Hé, Vav, Hé, et aux quatre éléments : feu, eau, air, terre.",
   regle:"Deux façons de les placer. Sur un seul Arbre, comme ici : la triade céleste, la triade morale, la triade astrale, puis Malkuth. Ou bien en comptant quatre Arbres complets, l'un sous l'autre, le Malkuth de chacun devenant le Kether du suivant. C'est pourquoi chaque sephira a quatre couleurs dans la Golden Dawn ; Arcanes montre celles du monde de Briah."},
  {id:"eclair", t:"L'Éclair : la descente", st:"trad",
   txt:"L'<b>Éclair</b>, ou l'Épée flamboyante, relie les sephiroth dans l'ordre de leurs numéros, de 1 à 10. C'est le chemin de la création : une idée devient force, puis forme, puis loi, puis décision, puis équilibre, puis désir, puis plan, puis image, puis fait.",
   regle:"Tu peux lire ainsi la naissance de n'importe quel projet. Entre Binah et Chesed, l'Éclair saute l'Abîme : c'est le seul endroit où il ne suit aucun sentier. Passer du principe à la réalisation demande toujours un saut."},
  {id:"serpent", t:"Le Serpent : la remontée", st:"trad",
   txt:"Le <b>Serpent de sagesse</b> part de Malkuth et monte en s'enroulant sur les vingt-deux sentiers, du 32e au 11e, sans en oublier un seul. C'est le chemin de l'initié, lent et complet. La Golden Dawn y a calqué ses grades : on entre en Malkuth, puis Yesod, Hod, Netzach, et l'on devient adepte en Tiphareth.",
   regle:"Il existe un raccourci, le <b>chemin de la Flèche</b> : tout droit par le pilier du milieu, par les sentiers de Tav, de Samekh et de Gimel. C'est la voie des mystiques, qui visent l'union sans s'arrêter aux pouvoirs."},
  {id:"voiles", t:"L'Abîme et les voiles", st:"trad",
   txt:"Deux coupures traversent l'Arbre. L'<b>Abîme</b>, sous la triade céleste, où se tient Daath. Et le <b>voile de Paroketh</b>, du nom du rideau du Temple, sous Tiphareth : il sépare ce que la personnalité ordinaire connaît d'elle-même, en bas, de ce qu'elle est en profondeur. Au-dessus de Kether, la tradition place encore trois voiles de « non-existence » : <b>Ain</b>, le Rien ; <b>Ain Soph</b>, le Sans-limite ; <b>Ain Soph Aur</b>, la Lumière sans limite.",
   regle:"L'Arbre ne commence donc pas à Kether. Il sort d'un fond dont on ne peut rien dire. Les kabbalistes ont une image pour cela : avant de créer, l'Infini s'est retiré pour laisser une place vide. Isaac Louria, au XVIe siècle, a appelé ce retrait le <i>tsimtsoum</i>."}
];
/* calques : ce que chaque lecture allume */
const CALQUES = {
  piliers:{g:[[2,4,7,"#3f6fb0"],[3,5,8,"#a3301f"],[1,6,9,10,"#c9a23f"]].map(a => ({s:a.slice(0, -1), c:a[a.length - 1]}))},
  triades:{tri:[[1,2,3,"#e9dcc0"],[4,5,6,"#c9a23f"],[7,8,9,"#8a6fb0"]]},
  mondes:{bandes:[[20,128,"Atziluth · feu","#c8553a"],[128,300,"Briah · eau","#3f6fb0"],[300,462,"Yetzirah · air","#c9a23f"],[462,535,"Assiah · terre","#5d7a3a"]]},
  eclair:{flash:true}, serpent:{serpent:true}, voiles:{voiles:true}
};

/* ---------------------------------------------------------------- les vingt-deux lettres, une à une
   [lettre, sens du nom, forme, ce que la tradition en dit, mot exemple, translittération, sens du mot] */
const LETTRES = {
"א":{sens:"le bœuf, la tête du troupeau", son:"muette : elle porte la voyelle, comme une inspiration avant de parler",
  dit:"La première lettre ne se prononce pas. Les kabbalistes voient dans sa forme deux Yod séparés par un Vav oblique, soit 10 + 6 + 10 = 26, la valeur du Nom divin : l'unité cachée dans la première lettre. Un récit ancien raconte qu'elle se plaignit de ne pas ouvrir la Torah, qui commence par Beth ; il lui fut répondu qu'elle ouvrirait les Dix Paroles, avec le mot <i>Anokhi</i>, « Je suis ».",
  sentier:"Elle relie Kether à Chokmah : le tout premier mouvement, avant toute direction. D'où le Mat, qui s'avance sans savoir où.", mot:["אמת","emet","la vérité"]},
"ב":{sens:"la maison", son:"b ou v",
  dit:"C'est par elle que la Torah commence : <i>Bereshit</i>, « Au commencement ». Les rabbins remarquent qu'elle est fermée en haut, en bas et derrière, et ouverte seulement vers l'avant, dans le sens de la lecture : on n'a pas à demander ce qu'il y avait avant, au-dessus ou au-dessous, seulement ce qui vient. Deux, c'est aussi la première dualité, donc la possibilité d'un monde.",
  sentier:"De Kether à Binah : l'unité se donne une demeure. D'où le Bateleur, qui dispose ses outils sur la table.", mot:["ברכה","berakha","la bénédiction"]},
"ג":{sens:"le chameau", son:"g dur",
  dit:"Le Talmud lit les lettres comme une phrase : Gimel court après Daleth, parce que <i>gomel</i> veut dire « faire le bien » et <i>dal</i> « le pauvre ». Le riche va vers le pauvre. Le chameau, lui, est la bête qui traverse le désert.",
  sentier:"De Kether à Tiphareth, le plus long sentier de l'Arbre : il franchit l'Abîme d'un trait, comme le chameau le désert. D'où la Papesse et la Lune, gardiennes du passage.", mot:["גן","gan","le jardin"]},
"ד":{sens:"la porte", son:"d",
  dit:"<i>Delet</i>, la porte, et <i>dal</i>, le pauvre : celui qui se tient sur le seuil et attend. Sa forme est celle d'un montant et d'un linteau. Elle tourne le dos à Gimel, dit le Talmud, pour que celui qui donne le fasse sans humilier.",
  sentier:"Entre Chokmah et Binah, le Père et la Mère : la porte par laquelle la vie entre. D'où l'Impératrice et Vénus.", mot:["דעת","daath","la connaissance"]},
"ה":{sens:"la fenêtre, ou le cri « voici »", son:"h aspiré, un souffle",
  dit:"La lettre du souffle. Elle figure deux fois dans le Nom divin. Selon le Talmud, ce monde a été créé avec Hé, parce qu'elle se dit sans effort, sans remuer la langue ni les lèvres. Quand Abram et Saraï reçoivent leur vocation, c'est un Hé qui s'ajoute à leur nom : Abraham, Sarah.",
  sentier:"De Chokmah à Tiphareth : la vision qui descend organiser. La Golden Dawn y met l'Empereur et le Bélier ; Crowley l'échangera avec l'Étoile.", mot:["הר","har","la montagne"]},
"ו":{sens:"le clou, le crochet", son:"v, ou les voyelles o et ou",
  dit:"En hébreu, Vav placé devant un mot veut dire « et ». C'est la lettre qui attache. Sa forme est un trait vertical, un homme debout, un pilier entre ciel et terre. Sa valeur, six, est celle des directions de l'espace : haut, bas et les quatre horizons.",
  sentier:"De Chokmah à Chesed : la sagesse reliée à la loi. D'où le Pape, celui qui fait le pont, et le Taureau.", mot:["ורד","vered","la rose"]},
"ז":{sens:"l'épée, l'arme", son:"z",
  dit:"Une lame et sa garde. Mais sept est aussi le chiffre du septième jour : l'épée qui tranche est celle qui sépare le sabbat des autres jours, le saint de l'ordinaire. Choisir, c'est couper.",
  sentier:"De Binah à Tiphareth. D'où les Amoureux et les Gémeaux : le choix entre deux.", mot:["זהב","zahav","l'or"]},
"ח":{sens:"l'enclos, la barrière", son:"h guttural, comme la jota espagnole",
  dit:"Un Vav et un Zayin réunis par un toit, disent les scribes : un espace protégé. C'est l'initiale de <i>haï</i>, « vivant », et de <i>hayim</i>, « la vie ». Huit, c'est un de plus que les sept jours : ce qui dépasse la nature. La circoncision se fait le huitième jour.",
  sentier:"De Binah à Geburah. D'où le Chariot, l'enclos qui avance, et le Cancer avec sa carapace.", mot:["חכמה","hokhmah","la sagesse"]},
"ט":{sens:"le serpent enroulé, ou la corbeille", son:"t emphatique",
  dit:"Sa première apparition dans la Torah est dans le mot <i>tov</i>, « bon » : « Dieu vit que la lumière était bonne ». Le Talmud en conclut que voir un Teth en rêve est bon signe. Sa forme se replie sur elle-même : le bien caché à l'intérieur, comme l'enfant dans le ventre, neuf mois.",
  sentier:"De Chesed à Geburah, première des trois traverses horizontales. D'où la Force, qui tient le lion, et le signe du Lion.", mot:["טוב","tov","bon"]},
"י":{sens:"la main", son:"y, ou la voyelle i",
  dit:"La plus petite lettre, un simple point suspendu. Toutes les autres commencent par elle quand la plume touche le parchemin. Elle ouvre le Nom divin. C'est elle, le « iota » dont l'Évangile dit que pas un seul ne passera. Dix, c'est le nombre complet, les dix sephiroth, les dix doigts.",
  sentier:"De Chesed à Tiphareth. D'où l'Ermite, la petite lumière qui porte tout, et la Vierge.", mot:["יין","yayin","le vin"]},
"כ":{sens:"la paume de la main", son:"k, ou kh en fin de mot", fin:"ך",
  dit:"Après Yod, la main fermée qui agit, Kaph est la main ouverte, courbée pour recevoir ou pour bénir. C'est l'initiale de <i>keter</i>, la couronne, et de <i>kavod</i>, la gloire. Première des lettres à avoir une forme finale, allongée sous la ligne.",
  sentier:"De Chesed à Netzach. D'où la Roue de Fortune et Jupiter : ce que la main reçoit, elle le rendra.", mot:["כתר","keter","la couronne"]},
"ל":{sens:"l'aiguillon du bouvier", son:"l",
  dit:"La plus haute des lettres : elle seule dépasse la ligne vers le haut, « une tour qui vole dans l'air ». Sa racine, <i>lamad</i>, veut dire à la fois apprendre et enseigner. Elle est au milieu de l'alphabet, comme le cœur au milieu du corps. Avec Aleph, le bœuf, l'aiguillon forme <i>El</i>, « Dieu », et à l'envers <i>lo</i>, « non ».",
  sentier:"De Geburah à Tiphareth. D'où la Justice, qui corrige pour instruire, et la Balance.", mot:["לב","lev","le cœur"]},
"מ":{sens:"l'eau", son:"m", fin:"ם",
  dit:"<i>Mayim</i>, les eaux. La forme courante est ouverte en bas, la forme finale est close : ce qui se révèle et ce qui reste caché. Quarante est le temps d'une gestation ou d'une épreuve : quarante jours de déluge, quarante ans au désert, quarante jours de Moïse sur la montagne.",
  sentier:"De Geburah à Hod. D'où le Pendu, plongé dans l'eau comme dans un miroir, immobile.", mot:["מים","mayim","les eaux"]},
"נ":{sens:"le poisson", son:"n", fin:"ן",
  dit:"En araméen, <i>noun</i> est le poisson, qui vit dans l'eau de Mem. Courbée, elle est l'humble ; en finale, droite, elle se redresse. Cinquante : les cinquante « portes de l'Intelligence », dont Moïse, dit-on, n'ouvrit que quarante-neuf, et l'année du jubilé où tout est remis.",
  sentier:"De Tiphareth à Netzach. D'où l'Arcane sans nom et le Scorpion : ce qui meurt pour changer d'état.", mot:["נפש","nefesh","l'âme vivante"]},
"ס":{sens:"l'appui, l'étai", son:"s",
  dit:"Un cercle fermé : ce qui entoure et soutient. <i>Somekh</i>, « il soutient ceux qui tombent », dit un psaume. Dans les Tables de la Loi, gravées de part en part selon la légende, son centre aurait tenu en l'air par miracle.",
  sentier:"De Tiphareth à Yesod, sur le pilier du milieu. D'où la Tempérance et le Sagittaire : la flèche tirée vers le haut.", mot:["סוד","sod","le secret"]},
"ע":{sens:"l'œil, et aussi la source", son:"un coup de gorge, souvent muet aujourd'hui",
  dit:"Soixante-dix : les soixante-dix nations, les soixante-dix langues, les soixante-dix « visages » de la Torah, c'est-à-dire la multiplicité de ce qui se voit. L'œil saisit la surface des choses.",
  sentier:"De Tiphareth à Hod. D'où le Diable et le Capricorne : l'apparence qui retient, tant qu'on la prend pour le tout.", mot:["עץ","ets","l'arbre"]},
"פ":{sens:"la bouche", son:"p ou f", fin:"ף",
  dit:"Elle vient juste après l'œil : on voit, puis on parle. Regarde l'intérieur de la lettre : le blanc y dessine un Beth, la maison cachée dans la bouche. La parole crée et détruit.",
  sentier:"De Netzach à Hod, la traverse du bas. D'où la Maison-Dieu et Mars : la parole qui fait tomber la tour.", mot:["פה","peh","la bouche"]},
"צ":{sens:"l'hameçon", son:"ts", fin:"ץ",
  dit:"C'est l'initiale de <i>tsaddik</i>, « le juste », celui sur qui le monde repose. La forme courante est pliée, la finale se relève. L'hameçon tire le poisson de Nun hors de l'eau de Mem : la pensée qui ramène quelque chose des profondeurs.",
  sentier:"De Netzach à Yesod. D'où l'Étoile et le Verseau pour la Golden Dawn ; Crowley y mettra l'Empereur.", mot:["צדק","tsedek","la justice"]},
"ק":{sens:"la nuque, ou le chas de l'aiguille", son:"q, un k du fond de la gorge",
  dit:"Sa jambe descend sous la ligne : elle touche ce qui est en dessous. C'est l'initiale de <i>qadosh</i>, « saint », mais <i>qof</i> veut aussi dire « le singe », celui qui imite. La même lettre pour le sacré et sa contrefaçon.",
  sentier:"De Netzach à Malkuth. D'où la Lune et les Poissons : le chemin de nuit, où l'on ne sait pas si l'on voit ou si l'on rêve.", mot:["קדוש","qadosh","saint"]},
"ר":{sens:"la tête", son:"r",
  dit:"<i>Rosh</i>, la tête, le commencement, le chef. Une tête penchée, dit-on. À un petit angle près, elle ressemble à Daleth : les scribes doivent prendre garde de ne pas les confondre, car cela changerait « un » en « autre » dans la profession de foi.",
  sentier:"De Hod à Yesod. D'où le Soleil : la clarté de l'esprit qui éclaire les images.", mot:["רוח","rouah","le souffle, l'esprit"]},
"ש":{sens:"la dent", son:"sh ou s",
  dit:"Trois branches comme trois flammes. C'est l'initiale de <i>Shaddaï</i>, l'un des noms divins, celle qu'on voit sur les boîtiers fixés aux portes des maisons juives. Sa valeur, 300, est celle des mots <i>rouah Elohim</i>, « le souffle de Dieu ». Les kabbalistes chrétiens la glissent au milieu du Nom pour obtenir celui de Jésus.",
  sentier:"De Hod à Malkuth. D'où le Jugement et le Feu : ce qui réveille.", mot:["שלום","shalom","la paix"]},
"ת":{sens:"le signe, la marque", son:"t",
  dit:"Dans l'écriture ancienne, c'était une croix. Le prophète Ézéchiel voit un ange marquer d'un Tav le front des justes. Dernière lettre, elle est le sceau : <i>emet</i>, la vérité, commence par la première lettre, passe par celle du milieu et finit par elle.",
  sentier:"De Yesod à Malkuth, la dernière marche de la descente et la première de la remontée. D'où le Monde et Saturne.", mot:["תורה","torah","l'enseignement"]}
};
const FAMILLES = {
  "mère":"Trois lettres mères : Aleph, Mem, Shin. L'air, l'eau, le feu. Sur l'Arbre des kabbalistes juifs, elles occupent les trois traverses horizontales ; la Golden Dawn les a placées ailleurs.",
  "double":"Sept lettres doubles : Beth, Gimel, Daleth, Kaph, Peh, Resh, Tav. Chacune avait deux prononciations, une dure et une douce. Elles vont aux sept planètes et à sept contraires : vie et mort, paix et guerre, sagesse et folie, richesse et pauvreté, grâce et laideur, fécondité et stérilité, maîtrise et servitude.",
  "simple":"Douze lettres simples, pour les douze signes, les douze mois et douze facultés : la vue, l'ouïe, l'odorat, la parole, le goût, l'union, le travail, la marche, la colère, le rire, la pensée, le sommeil."
};

/* ---------------------------------------------------------------- la guématrie */
const ORD = "אבגדהוזחטיכלמנסעפצקרשת";
const STD = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400];
const FIN = {"ך":"כ","ם":"מ","ן":"נ","ף":"פ","ץ":"צ"}, FINV = {"ך":500,"ם":600,"ן":700,"ף":800,"ץ":900};
const NOMS = {"א":"אלף","ב":"בית","ג":"גימל","ד":"דלת","ה":"הא","ו":"ואו","ז":"זין","ח":"חית","ט":"טית","י":"יוד","כ":"כף","ל":"למד","מ":"מם","נ":"נון","ס":"סמך","ע":"עין","פ":"פא","צ":"צדי","ק":"קוף","ר":"ריש","ש":"שין","ת":"תו"};
const base = c => FIN[c] || c, idx = c => ORD.indexOf(base(c));
const GEM = {
  std: w => [...w].reduce((a, c) => a + (idx(c) < 0 ? 0 : STD[idx(c)]), 0),
  gadol: w => [...w].reduce((a, c) => a + (FINV[c] || (idx(c) < 0 ? 0 : STD[idx(c)])), 0),
  katan: w => [...w].reduce((a, c) => a + (idx(c) < 0 ? 0 : +String(STD[idx(c)])[0]), 0),
  siduri: w => [...w].reduce((a, c) => a + (idx(c) + 1), 0),
  milui: w => [...w].reduce((a, c) => a + (idx(c) < 0 ? 0 : GEM.std(NOMS[base(c)])), 0),
  atbash: w => [...w].map(c => idx(c) < 0 ? c : ORD[21 - idx(c)]).join(""),
  reduit: n => { while(n > 9) n = String(n).split("").reduce((a, b) => a + +b, 0); return n; }
};
GEM.val = GEM.std;
const METHODES = [
  {id:"std", nom:"Valeur classique", heb:"mispar hekhrehi", txt:"La méthode de base. Unités d'Aleph à Teth, dizaines de Yod à Tsadé, centaines de Qoph à Tav. Les lettres finales gardent la valeur de leur lettre."},
  {id:"gadol", nom:"Grand nombre", heb:"mispar gadol", txt:"Les cinq lettres finales prolongent la série : Kaph final 500, Mem final 600, Nun final 700, Peh final 800, Tsadé final 900. On atteint ainsi presque mille, et Aleph, qui peut se lire <i>eleph</i>, « mille », referme la boucle."},
  {id:"katan", nom:"Petit nombre", heb:"mispar katan", txt:"On efface les zéros : Yod vaut 1 comme Aleph, Kaph 2, Qoph 1, Tav 4. Chaque lettre est ramenée à un chiffre de 1 à 9. C'est l'ancêtre de la réduction des numérologues."},
  {id:"siduri", nom:"Nombre ordinal", heb:"mispar sidouri", txt:"Chaque lettre vaut son rang dans l'alphabet, de 1 à 22. Kaph vaut 11, Tav vaut 22."},
  {id:"milui", nom:"Valeur pleine", heb:"milouï", txt:"On écrit le nom de chaque lettre en toutes lettres, puis on additionne. Aleph s'écrit Aleph-Lamed-Peh et vaut 111. La lettre « contient » ainsi d'autres lettres, comme un fruit ses pépins. Les kabbalistes de l'école de Louria en ont tiré leurs calculs sur le Nom."}
];
/* petit dictionnaire pour chercher les mots de même valeur : [mot, translittération, sens] */
const MOTS = [
 ["אחד","ehad","un"],["אהבה","ahavah","l'amour"],["יהוה","YHVH","le Nom"],["אדני","Adonaï","Seigneur"],["אלהים","Elohim","Dieu"],["הטבע","ha-teva","la nature"],["אל","El","Dieu"],["יה","Yah","nom divin"],["שדי","Shaddaï","le Tout-Puissant"],["אהיה","Ehyeh","Je serai"],
 ["אמן","amen","amen"],["אמת","emet","la vérité"],["מת","met","mort"],["אדם","adam","l'homme"],["מה","mah","quoi ?"],["חי","haï","vivant"],["חיים","hayim","la vie"],["אור","or","la lumière"],["רז","raz","le mystère"],["אין סוף","Ain Soph","le Sans-limite"],
 ["יין","yayin","le vin"],["סוד","sod","le secret"],["משיח","mashiah","le messie"],["נחש","nahash","le serpent"],["סלם","soulam","l'échelle"],["סיני","Sinaï","le Sinaï"],["קול","qol","la voix"],["צום","tsom","le jeûne"],["ממון","mamon","l'argent"],
 ["לב","lev","le cœur"],["כבוד","kavod","la gloire"],["טוב","tov","bon"],["זהב","zahav","l'or"],["יד","yad","la main"],["דוד","David","David"],["בבל","Babel","Babel"],["ששך","Sheshakh","Sheshakh"],["אליעזר","Eliezer","Éliézer"],
 ["חסד","hesed","la miséricorde"],["חכמה","hokhmah","la sagesse"],["בינה","binah","l'intelligence"],["כתר","keter","la couronne"],["מלכות","malkhout","le royaume"],["דעת","daath","la connaissance"],["תפארת","tiferet","la beauté"],["יסוד","yesod","le fondement"],["גבורה","gevourah","la rigueur"],["נצח","netsah","la victoire"],["הוד","hod","la gloire, l'éclat"],
 ["קבלה","qabbalah","la Kabbale"],["תורה","torah","la Torah"],["שלום","shalom","la paix"],["שם","shem","le nom"],["משה","Moshé","Moïse"],["ישראל","Israël","Israël"],["שבת","shabbat","le sabbat"],["נפש","nefesh","l'âme"],["רוח","rouah","le souffle"],["נשמה","neshamah","l'âme haute"],
 ["אש","esh","le feu"],["מים","mayim","les eaux"],["ארץ","erets","la terre"],["שמים","shamayim","les cieux"],["עץ","ets","l'arbre"],["גן","gan","le jardin"],["אבן","even","la pierre"],["מלך","melekh","le roi"],["בן","ben","le fils"],["אב","av","le père"],["אם","em","la mère"],
 ["רוח אלהים","rouah Elohim","le souffle de Dieu"],["ש","Shin","la lettre Shin"],["גרתי","garti","j'ai séjourné"],["השטן","ha-Satan","l'Accusateur"],["חן","hen","la grâce"],["גלגל","galgal","la roue"],["עין","ayin","l'œil"],["אגלא","AGLA","nom formé d'initiales"],["ורד","vered","la rose"],["צדק","tsedek","la justice"]
];
/* les grandes rencontres : [titre, [mots hébreux], explication, statut, méthode facultative] */
const RENCONTRES = [
 {t:"Un et amour", w:["אחד","אהבה"], st:"trad", txt:"<i>Ehad</i>, « un », et <i>ahavah</i>, « amour », valent tous deux 13. Les commentateurs en tirent que l'amour est ce qui fait de deux un seul. Et 13 + 13 = 26, la valeur du Nom divin : l'unité et l'amour, ensemble, donnent Dieu."},
 {t:"Le messie et le serpent", w:["משיח","נחש"], st:"trad", txt:"<i>Mashiah</i>, le messie, et <i>nahash</i>, le serpent de l'Éden, valent 358. C'est la rencontre la plus célèbre, et la plus troublante. Les kabbalistes y lisent que le remède a la mesure exacte du mal : celui qui répare doit descendre aussi bas que la faute. Les occultistes du XIXe siècle en ont fait un de leurs thèmes favoris."},
 {t:"Le vin et le secret", w:["יין","סוד"], st:"doc", txt:"<i>Yayin</i>, le vin, et <i>sod</i>, le secret, valent 70. Le Talmud en fait un proverbe : « Quand le vin entre, le secret sort. » C'est l'une des plus anciennes guématries attestées, et la plus souriante."},
 {t:"Dieu et la nature", w:["אלהים","הטבע"], st:"trad", txt:"<i>Elohim</i>, le nom de Dieu dans le récit de la création, et <i>ha-teva</i>, « la nature », valent 86. Les kabbalistes du XIIIe siècle l'ont remarqué : la nature est le visage sous lequel Dieu agit dans le monde. Quatre siècles plus tard, Spinoza écrira « Dieu, c'est-à-dire la Nature »."},
 {t:"L'échelle et le Sinaï", w:["סלם","סיני"], st:"trad", txt:"L'échelle du songe de Jacob, <i>soulam</i>, et le mont <i>Sinaï</i> valent 130. L'échelle qui relie la terre au ciel, c'est la Loi donnée sur la montagne."},
 {t:"La voix, le jeûne, l'argent", w:["קול","צום","ממון"], st:"trad", txt:"Trois mots, la même valeur : 136. La liturgie du Nouvel An dit que trois choses écartent le mauvais décret : la prière, le jeûne et l'aumône. Dans certains livres de prières, on imprime au-dessus de ces trois mots <i>qol</i>, la voix, <i>tsom</i>, le jeûne, <i>mamon</i>, l'argent. Aucun ne suffit sans les deux autres."},
 {t:"L'homme est une question", w:["אדם","מה"], st:"trad", txt:"<i>Adam</i>, l'être humain, vaut 45, comme <i>mah</i>, « quoi ? ». L'homme est la créature qui demande. C'est aussi la valeur du Nom divin écrit en toutes lettres d'une certaine façon : voir la valeur pleine."},
 {t:"La vie vaut dix-huit", w:["חי"], st:"doc", txt:"<i>Haï</i>, « vivant », vaut 18. C'est pourquoi, dans le monde juif, on offre volontiers des sommes multiples de dix-huit, et pourquoi tant de pendentifs portent ces deux lettres."},
 {t:"La vérité et la mort", w:["אמת","מת"], st:"trad", txt:"<i>Emet</i>, la vérité, est faite de la première, de la moyenne et de la dernière lettre de l'alphabet : elle tient d'un bout à l'autre. Ôte l'Aleph, il reste <i>met</i>, « mort ». Dans la légende du Golem, on anime la créature d'argile en écrivant <i>emet</i> sur son front, et on la défait en effaçant la première lettre."},
 {t:"Le cœur et les trente-deux voies", w:["לב"], st:"trad", txt:"<i>Lev</i>, le cœur, vaut 32, le nombre des voies de sagesse du <i>Sefer Yetsirah</i> : dix sephiroth et vingt-deux lettres. La Torah commence par un Beth et finit par un Lamed. Lue en boucle, elle écrit « cœur »."},
 {t:"Les 318 serviteurs d'Abraham", w:["אליעזר"], st:"doc", txt:"La Genèse dit qu'Abraham partit en guerre avec 318 hommes. Le Talmud répond : il n'en avait qu'un, son serviteur Éliézer, dont le nom vaut 318. C'est la plus ancienne guématrie rabbinique que l'on puisse dater. Les premiers chrétiens, eux, lisaient 318 en grec : T, 300, la croix, et IH, 18, les deux premières lettres de Jésus."},
 {t:"La lumière, le mystère, l'Infini", w:["אור","רז","אין סוף"], st:"trad", txt:"<i>Or</i>, la lumière, <i>raz</i>, le mystère, et <i>Ain Soph</i>, le Sans-limite, valent tous trois 207. Le Zohar joue sur les deux premiers : la lumière du premier jour est un secret. Les kabbalistes ont ajouté le troisième : ce secret, c'est l'Infini lui-même."},
 {t:"Amen réunit deux noms", w:["אמן","יהוה","אדני"], st:"trad", txt:"<i>Amen</i> vaut 91. C'est la somme de 26, le Nom qui s'écrit, et de 65, <i>Adonaï</i>, le nom qui se prononce à sa place. Dire amen, c'est joindre ce qu'on écrit et ce qu'on dit."},
 {t:"Le souffle de Dieu est un Shin", w:["רוח אלהים","ש"], st:"trad", txt:"<i>Rouah Elohim</i>, « le souffle de Dieu » qui plane sur les eaux au début de la Genèse, vaut 300. C'est la valeur de la seule lettre Shin. D'où le Shin comme lettre de l'esprit et du feu, et le Jugement du tarot sur son sentier."},
 {t:"L'Accusateur a un jour de congé", w:["השטן"], st:"doc", txt:"<i>Ha-Satan</i>, l'Accusateur, vaut 364. Le Talmud en déduit qu'il a pouvoir sur 364 jours de l'année, et qu'il en manque un : le jour du Grand Pardon."},
 {t:"La Kabbale et le nombre des physiciens", w:["קבלה"], st:"mod", txt:"<i>Qabbalah</i> vaut 137. C'est, à très peu près, l'inverse d'une constante fondamentale de la physique, celle qui règle la force entre la lumière et la matière. Le physicien Wolfgang Pauli était hanté par ce nombre ; l'historien de la Kabbale Gershom Scholem fit un jour remarquer la coïncidence à l'un de ses collègues, qui en resta stupéfait. Pure coïncidence, bien sûr. C'est un bon exemple de ce que la guématrie fait à l'esprit."},
 {t:"« J'ai séjourné » et les 613 commandements", w:["גרתי","תורה"], st:"trad", txt:"Jacob fait dire à son frère : « J'ai séjourné chez Laban. » <i>Garti</i> vaut 613, le nombre traditionnel des commandements. Le commentateur Rachi, au XIe siècle, complète : j'ai séjourné chez Laban le trompeur, et j'ai pourtant gardé les 613 commandements. <i>Torah</i>, elle, vaut 611 : les deux manquants sont ceux que le peuple entendit de la bouche de Dieu."}
];
/* les quatre « remplissages » du Nom (école de Louria) et le Nom en triangle */
const NOM = {
  pleins:[["יוד הי ויו הי","Av","72"],["יוד הי ואו הי","Sag","63"],["יוד הא ואו הא","Mah","45"],["יוד הה וו הה","Ben","52"]],
  triangle:["י","יה","יהו","יהוה"]
};
/* hors de l'hébreu : la même idée en grec et en arabe */
const AILLEURS = [
 ["Ἰησοῦς","Jésus, en grec","888","Les premiers chrétiens opposaient ce nombre au 666 de l'Apocalypse."],
 ["נרון קסר","Néron César, en hébreu","666","L'explication la plus admise du « nombre de la Bête » : le nom de l'empereur persécuteur, écrit en lettres hébraïques."],
 ["Ἀβρασάξ","Abrasax","365","Le nom gravé sur les gemmes magiques vaut le nombre des jours de l'année."],
 ["Μείθρας","Mithra, en grec","365","Même valeur : le dieu solaire et l'année."],
 ["Θέλημα · Ἀγάπη","Volonté · Amour","93","Les deux mots grecs ont la même valeur. Aleister Crowley en a fait le chiffre de sa religion."],
 ["بسم الله الرحمن الرحيم","Au nom de Dieu…, en arabe","786","Dans le sous-continent indien, on écrit souvent 786 en tête d'une lettre à la place de la formule."]
];

/* ---------------------------------------------------------------- les leçons ajoutées */
const LECONS5 = [
 {id:"m5l4", t:"Comment fonctionne l'Arbre", sous:"Piliers, triades, mondes",
  idee:[
   "L'Arbre n'est pas une liste de dix cases. C'est une machine à trois règles, et une fois qu'on les tient, on peut lire n'importe quelle sephira sans rien apprendre par cœur.",
   "Première règle : la <b>polarité</b>. Les sephiroth vont par paires qui se font face, une à droite qui donne, une à gauche qui limite. Chokmah lance, Binah contient. Chesed accorde, Geburah retranche. Netzach désire, Hod formule. Aucune des deux n'a raison seule : une force sans forme se disperse, une forme sans force est morte.",
   "Deuxième règle : l'<b>équilibre</b>. Sous chaque paire, sur le pilier du milieu, une troisième sephira les réconcilie. Tiphareth, la Beauté, est l'accord de la générosité et de la rigueur. Yesod, le Fondement, est l'accord du sentiment et de la pensée : une image qui tient. Cela donne trois triangles superposés, et Malkuth, le Royaume, qui recueille le tout.",
   "Troisième règle : l'<b>enchaînement</b>. Chaque sephira reçoit de celle qui la précède et donne à celle qui la suit. Elle est donc « féminine » vers le haut et « masculine » vers le bas, pour parler comme les anciens livres. Rien n'est fixe : tout est passage. C'est pourquoi les sentiers comptent autant que les sphères."],
  source:{txt:"Dix sephiroth sans rien : leur fin est fichée dans leur commencement, et leur commencement dans leur fin, comme la flamme est liée à la braise.", ref:"Sefer Yetsirah, I, 7", st:"doc"},
  schema:"arbrelect",
  ex:{t:"Lire une décision sur l'Arbre", txt:"Prends une décision que tu dois prendre. Dans le schéma, ouvre tour à tour Chesed et Geburah et réponds à la question de chacune : qu'est-ce que je dois élargir, qu'est-ce que je dois couper ? Puis ouvre Tiphareth.", outil:"outil:arbre"},
  carnet:"En ce moment, quel pilier pèse le plus lourd chez moi : celui qui donne ou celui qui limite ?",
  marge:[{t:"Le mot", txt:"<i>Sephira</i>, au pluriel <i>sephiroth</i>, vient d'une racine qui veut dire « compter ». Ce sont d'abord des nombres."},
         {t:"Jakin et Boaz", txt:"Les deux piliers latéraux portent parfois les noms des colonnes du Temple de Salomon. La Papesse du tarot Waite-Smith est assise entre elles."}]},
 {id:"m5l5", t:"Descendre et remonter", sous:"L'Éclair, le Serpent, l'Abîme",
  idee:[
   "L'Arbre se parcourt dans deux sens. De haut en bas, c'est l'<b>Éclair</b> : la lumière descend de Kether à Malkuth en dix étapes, et le monde apparaît. De bas en haut, c'est le <b>Serpent</b> : l'âme remonte, sentier après sentier. La première lecture est une cosmologie, la seconde un chemin.",
   "Les kabbalistes juifs ont donné de la descente un récit saisissant. Pour Isaac Louria, qui enseigne à Safed, en Galilée, vers 1570, l'Infini a d'abord dû se <b>retirer</b> pour faire place au monde. Puis la lumière a jailli dans des vases, les sephiroth. Les vases d'en bas, trop fragiles, se sont <b>brisés</b>, et des étincelles sont tombées parmi les débris. La tâche de l'homme est la <b>réparation</b> : relever les étincelles, une à une, par ses actes. On comprend mieux, avec ce récit, pourquoi l'Arbre a un côté d'ombre, celui des « écorces ».",
   "La Golden Dawn a retenu la remontée et en a fait une carrière. Chaque grade correspond à une sephira : on est reçu en Malkuth, on travaille la terre et le corps ; puis Yesod et l'imagination, Hod et l'étude, Netzach et le sentiment. Entre ces quatre grades et le suivant se tient un <b>voile</b>. Le franchir, c'est atteindre Tiphareth : ne plus être mené par ses humeurs, mais par ce qu'on a de plus central.",
   "Plus haut s'étend l'<b>Abîme</b>, et Daath en son milieu. Les ordres initiatiques y placent leurs grades suprêmes ; presque personne ne prétend sérieusement les avoir atteints. Pour un débutant, l'Arbre utile s'arrête à Tiphareth, et c'est déjà beaucoup."],
  source:{txt:"Dix sephiroth sans rien : dix et non neuf, dix et non onze. Comprends avec sagesse, et sois sage avec intelligence.", ref:"Sefer Yetsirah, I, 4", st:"doc"},
  schema:"arbrelect",
  ex:{t:"Suivre un projet le long de l'Éclair", txt:"Pense à quelque chose que tu as mené à bien. Dans le schéma, choisis « L'Éclair » et retrouve ses dix étapes : l'idée, l'élan, la contrainte, le cadre, les renoncements, l'équilibre, l'envie, le plan, l'image, le fait. Laquelle a été la plus difficile ?", outil:"outil:arbre"},
  carnet:"L'étape de l'Éclair où mes projets s'arrêtent le plus souvent :",
  marge:[{t:"Safed", txt:"Petite ville de Galilée devenue au XVIe siècle la capitale de la Kabbale, après l'expulsion des Juifs d'Espagne en 1492."},
         {t:"Les écorces", txt:"En hébreu <i>qlippoth</i> : ce qui reste quand la forme n'est plus habitée par la force. La face déréglée de chaque sephira."},
         {t:"Voir aussi", txt:"La Golden Dawn, au chapitre X de l'Histoire.", go:"hist:h10"}]},
 {id:"m5l6", t:"Les vingt-deux lettres, une à une", sous:"Un nom, une forme, un nombre, un sentier",
  idee:[
   "Chaque lettre hébraïque est quatre choses à la fois. Un <b>son</b>. Un <b>nom</b> qui est un mot ordinaire : Aleph le bœuf, Beth la maison, Gimel le chameau. Une <b>forme</b>, que les scribes tracent selon des règles strictes et que les commentateurs lisent comme un dessin. Et un <b>nombre</b>. Méditer une lettre, c'est tenir ces quatre choses ensemble.",
   "Les noms racontent une petite histoire dans l'ordre. Le bœuf, la maison, le chameau, la porte : un monde de bergers. Puis la main, la paume, l'aiguillon ; l'eau, le poisson ; l'œil, la bouche ; la tête, la dent, et pour finir la marque. Les enfants apprenaient l'alphabet avec ces images, et le Talmud rapporte les phrases qu'ils en tiraient.",
   "Le <i>Sefer Yetsirah</i> les range en trois familles, trois mères, sept doubles et douze simples, pour les éléments, les planètes et les signes. Sur cette base, la Golden Dawn a posé chaque lettre sur un sentier de l'Arbre et lui a donné une lame du tarot. Il faut savoir que les manuscrits anciens ne s'accordent pas sur le détail : quelle planète va à quelle lettre double, par exemple, varie d'une version à l'autre. Le tableau d'Arcanes est celui de la Golden Dawn, le plus répandu aujourd'hui.",
   "Dans le schéma, touche une lettre pour ouvrir sa fiche : ce que veut dire son nom, ce que la tradition juive en raconte, pourquoi elle se trouve sur ce sentier, et un mot qui commence par elle."],
  source:{txt:"Vingt-deux lettres de fondement : il les a gravées, taillées, pesées, permutées, combinées, et il a formé par elles tout ce qui est formé et tout ce qui sera formé.", ref:"Sefer Yetsirah, II, 2", st:"doc"},
  schema:"lettres",
  ex:{t:"Ta lettre", txt:"Cherche la lettre qui correspond à ton signe solaire, ouvre sa fiche, puis regarde la lame du tarot qui lui est attachée. Recopie la lettre dix fois à la main, lentement.", outil:"outil:arbre"},
  carnet:"La lettre que j'ai recopiée, et ce que sa forme m'a fait penser :",
  marge:[{t:"De droite à gauche", txt:"L'hébreu s'écrit de droite à gauche et ne note que les consonnes. Les voyelles sont de petits points ajoutés au Moyen Âge."},
         {t:"Voir aussi", txt:"La guématrie, au module XII.", go:"lec:m12l2"}]}
];
const LECONS12 = [
 {id:"m12l4", t:"Cinq façons de compter", sous:"Grand nombre, petit nombre, rang, valeur pleine",
  idee:[
   "La guématrie que tu connais, où Aleph vaut 1 et Tav 400, n'est que la première d'une famille. Les kabbalistes en ont pratiqué des dizaines. Cinq suffisent pour comprendre comment ils travaillaient.",
   "Le <b>grand nombre</b> donne aux cinq lettres finales les valeurs 500 à 900 : l'alphabet devient un système décimal complet. Le <b>petit nombre</b>, à l'inverse, efface les zéros : Yod vaut 1, Kaph 2, Qoph 1. Le <b>nombre ordinal</b> donne à chaque lettre son rang, de 1 à 22. Selon la méthode, un même mot change de valeur, et de nouveaux voisins apparaissent.",
   "La plus subtile est la <b>valeur pleine</b>. On écrit le nom de chaque lettre, puis on additionne le tout. Or certains noms s'écrivent de plusieurs façons : Hé peut s'écrire avec un Aleph, un Yod ou un second Hé. Le Nom divin, YHVH, peut donc se « remplir » de quatre manières, qui donnent 72, 63, 45 et 52. L'école de Louria attache ces quatre nombres aux quatre mondes, et toute sa méditation en dépend. Remarque que 45 est aussi la valeur d'<i>adam</i>.",
   "Dernier outil, le <b>kolel</b> : on s'autorise à ajouter 1, pour le mot lui-même. Deux mots qui diffèrent d'une unité sont alors tenus pour égaux. Tu vois le danger : avec cinq méthodes et un joker, presque tout finit par égaler presque tout. Les maîtres le savaient. Pour eux, une guématrie ne <i>prouve</i> jamais une idée ; elle illustre une idée qu'on tient déjà d'ailleurs."],
  source:{txt:"Les calculs des solstices et les guématries sont les hors-d'œuvre de la sagesse.", ref:"Mishna, Pirké Avot, III, 18 : les hors-d'œuvre, non le plat", st:"doc"},
  schema:"guematrie",
  ex:{t:"Un mot, cinq nombres", txt:"Dans l'outil, compose <i>shalom</i> (Shin, Lamed, Vav, Mem final) et lis ses cinq valeurs. Puis écris le Nom, Yod, Hé, Vav, Hé, et regarde sa valeur pleine.", outil:"outil:guematrie"},
  carnet:"Ce qui me gêne, ou me plaît, dans le fait qu'un mot ait plusieurs nombres :",
  marge:[{t:"Le Nom en triangle", txt:"Écris Yod, puis Yod-Hé, puis Yod-Hé-Vav, puis le Nom entier, et additionne : 10 + 15 + 21 + 26 = 72. C'est le nombre des 72 noms que les kabbalistes tirent de trois versets de l'Exode."},
         {t:"Prudence", txt:"Plus on a de méthodes, plus on trouve de coïncidences. C'est une loi des probabilités, pas un signe."}]},
 {id:"m12l5", t:"Les grandes rencontres", sous:"Les égalités qui ont fait réfléchir",
  idee:[
   "Si la guématrie a traversé vingt siècles, c'est grâce à une poignée d'égalités si frappantes qu'on ne les oublie plus. Elles ne valent pas par le calcul, qu'un enfant peut refaire, mais par ce qu'on a su en dire.",
   "Les plus anciennes sont dans le Talmud. Le vin et le secret valent 70 : quand l'un entre, l'autre sort. Les 318 guerriers d'Abraham n'étaient qu'un seul homme, Éliézer, dont le nom vaut 318. L'Accusateur vaut 364 : il lui manque un jour par an. Ce sont des traits d'esprit, faits pour être retenus.",
   "Les kabbalistes du Moyen Âge vont plus loin. Un et amour valent 13, et leur somme donne le Nom. Dieu et la nature valent 86. Le messie et le serpent valent 358. Ici, l'égalité devient une pensée : elle oblige à tenir ensemble deux mots que tout sépare, et à chercher ce qui les relie. C'est cette secousse que l'on cherche.",
   "L'idée n'est pas propre à l'hébreu. Les Grecs appelaient cela l'<b>isopséphie</b> : leurs lettres aussi étaient des chiffres. Un graffiti de Pompéi dit : « J'aime celle dont le nombre est 545. » Le nombre de la Bête, 666, est très probablement le nom de Néron écrit en hébreu. Les Arabes ont leur <b>abjad</b>, qui sert encore à composer des chronogrammes : un vers dont les lettres donnent une date."],
  source:{txt:"Quand le vin entre, le secret sort.", ref:"Talmud de Babylone, Érouvin 65a : yayin et sod valent 70", st:"doc"},
  schema:"rencontres",
  ex:{t:"Vérifie toi-même", txt:"Ouvre trois rencontres dans le schéma et refais le calcul lettre par lettre. Puis cherche, dans l'outil, un mot qui ait la même valeur qu'un mot qui compte pour toi.", outil:"outil:guematrie"},
  carnet:"La rencontre qui m'a le plus frappé, et ce que j'en fais :",
  marge:[{t:"Honnêteté", txt:"Chaque rencontre porte son étiquette : attestée dans un texte ancien, transmise par la tradition, ou simple rapprochement moderne."},
         {t:"Voir aussi", txt:"Hermès Trismégiste et les papyrus, où Abrasax vaut 365.", go:"hist:h3"}]}
];
const ETOFFE = {
 m5l4:{acc:"On présente souvent l'Arbre comme un tableau à apprendre. C'est le prendre à l'envers. Il faut d'abord voir comment il marche.",
  conf:[["Le pilier de gauche est le « mauvais » côté.","Non. La Rigueur limite, et sans limite rien n'existe. Un fleuve sans rives est un marécage."],
        ["Kether est « mieux » que Malkuth.","Les kabbalistes disent l'inverse autant que cela : Kether est en Malkuth, et Malkuth en Kether. Le but de la descente, c'est le monde."]],
  ret:["Trois règles : polarité, équilibre, enchaînement.","Droite : ce qui donne. Gauche : ce qui limite. Milieu : ce qui accorde.","Trois triangles, céleste, moral, astral, et Malkuth qui reçoit.","Quatre mondes : Atziluth, Briah, Yetzirah, Assiah."]},
 m5l5:{acc:"Un même dessin, deux histoires : celle du monde qui descend, celle de l'âme qui remonte.",
  conf:[["Daath est la onzième sephira.","Le Sefer Yetsirah dit expressément « dix et non onze ». Daath est un point de jonction, pas une sphère de plus."],
        ["On « monte » sur l'Arbre comme on passe des niveaux.","Les grades sont une image. Personne ne quitte Malkuth : on apprend à y faire descendre ce qu'on a compris plus haut."]],
  ret:["L'Éclair descend de 1 à 10 : la création.","Le Serpent remonte par les 22 sentiers : l'initiation.","Louria : le retrait, la brisure des vases, la réparation.","Deux seuils : le voile sous Tiphareth, l'Abîme sous la triade céleste."]},
 m5l6:{acc:"Avant d'être des symboles, ce sont des lettres qu'on trace à la plume. Commence par les regarder.",
  conf:[["Les attributions des lettres sont fixées depuis toujours.","Elles varient selon les manuscrits du Sefer Yetsirah, puis selon les écoles. Lévi, la Golden Dawn et Crowley ne placent pas les lames de la même façon."]],
  ret:["Une lettre : un son, un nom, une forme, un nombre.","Trois mères, sept doubles, douze simples.","Vingt-deux lettres, vingt-deux sentiers, vingt-deux lames : le montage date de 1888."]},
 m12l4:{acc:"Une seule façon de compter, ce serait un code. Plusieurs, c'est un art d'interpréter, avec ses libertés et ses abus.",
  conf:[["La guématrie démontre des vérités cachées.","Les maîtres eux-mêmes l'appellent un « hors-d'œuvre ». Elle sert à mémoriser et à faire penser, non à prouver."]],
  ret:["Classique, grand nombre, petit nombre, ordinal, valeur pleine.","Le Nom se remplit de quatre façons : 72, 63, 45, 52.","Le kolel autorise un écart de 1 : à manier avec prudence."]},
 m12l5:{acc:"Voici les égalités que tout le monde cite. Refais les additions : c'est le seul moyen de sentir pourquoi elles frappent.",
  conf:[["Si deux mots ont la même valeur, ils ont le même sens.","Ils ont un rapport que le commentateur doit trouver et justifier. Sans le commentaire, l'égalité ne dit rien."]],
  ret:["13 : un, amour. 26 : le Nom.","70 : le vin, le secret.","86 : Dieu, la nature.","358 : le messie, le serpent.","Les Grecs disaient isopséphie, les Arabes abjad."]}
};
const QUIZ5 = [
 {q:"Que fait le pilier de gauche de l'Arbre ?", r:["Il limite et donne forme","Il donne et élargit","Il équilibre","Il représente le mal"], ok:0, exp:"C'est le pilier de la Rigueur : Binah, Geburah, Hod."},
 {q:"Quelle sephira équilibre Chesed et Geburah ?", r:["Tiphareth","Yesod","Kether","Malkuth"], ok:0, exp:"La Beauté, au centre de l'Arbre."},
 {q:"Qu'est-ce que l'Éclair ?", r:["Le chemin de la création, de Kether à Malkuth","La remontée par les sentiers","Un sentier particulier","Le nom d'un archange"], ok:0, exp:"Il suit les sephiroth dans l'ordre de leurs numéros."},
 {q:"Que dit le Sefer Yetsirah du nombre des sephiroth ?", r:["Dix et non neuf, dix et non onze","Onze avec Daath","Sept comme les planètes","Douze comme les signes"], ok:0, exp:"Daath n'est donc pas une sephira."},
 {q:"Que veut dire le nom de la lettre Beth ?", r:["La maison","Le bœuf","La porte","La main"], ok:0, exp:"C'est par elle que commence la Torah."}
];
const QUIZ12 = [
 {q:"Dans le « grand nombre », que vaut le Mem final ?", r:["600","40","13","4"], ok:0, exp:"Les finales vont de 500 à 900."},
 {q:"Quels deux mots valent 358 ?", r:["Le messie et le serpent","Un et amour","Le vin et le secret","Dieu et la nature"], ok:0, exp:"Mashiah et nahash."},
 {q:"Que vaut le mot haï, « vivant » ?", r:["18","13","26","70"], ok:0, exp:"Heth 8 et Yod 10."},
 {q:"Comment les Grecs appelaient-ils ce calcul ?", r:["L'isopséphie","La temurah","Le notarikon","L'abjad"], ok:0, exp:"« Même compte de cailloux »."}
];

/* injection dans les cours (ce fichier est chargé après magie-cours.js et magie-cours2.js) */
try {
  const add = (mods, id, L, Q) => { const m = (mods || []).find(x => x.id === id); if(!m) return; L.forEach(l => { if(!m.lecons.some(x => x.id === l.id)) m.lecons.push(l); }); if(Q && m.quiz) Q.forEach(q => { if(!m.quiz.some(x => x.q === q.q)) m.quiz.push(q); }); };
  if(typeof MAGIE_COURS !== "undefined") add(MAGIE_COURS.MODULES, "m5", LECONS5, QUIZ5);
  if(typeof MAGIE_COURS2 !== "undefined") add(MAGIE_COURS2.MODULES, "m12", LECONS12, QUIZ12);
  Object.assign(window.MAGIE_ETOFFE = window.MAGIE_ETOFFE || {}, ETOFFE);
} catch(e){ console.error("kabbale", e); }

return {SEPH, DAATH, LECTURES, CALQUES, LETTRES, FAMILLES, GEM, METHODES, MOTS, RENCONTRES, NOM, AILLEURS, NOMS, ORD, FINV};
})();
