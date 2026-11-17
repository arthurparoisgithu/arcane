/* ===== Arcanes · Magie : le troisième cercle, « Hors les murs » =====
   Module XVII · La magie populaire française · Module XVIII · La magie naturelle · Module XIX · Le rêve et la vision.
   Leçons, quiz, fiches, schémas (saints guérisseurs, herbier planétaire, les cinq rêves de Macrobe, carnet de rêve,
   tests de réalité) et le rituel guidé de l'incubation. Chargé après magie-cours-pentacles.js. */
(() => {
  const M = window.ArcanesMagie; if(!M || !M._) return;
  const _ = M._, X = _.EXT, K = _.K, D = _.D, PL = _.PL, {h, cap, uid} = _;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const st = () => _.st(), save = () => _.save();

  /* ================================================================
     XVII · LA MAGIE POPULAIRE FRANÇAISE
     ================================================================ */
  const M17 = {id:"m17", n:"XVII", cercle:3, t:"La magie populaire française", sous:"Secrets, guérisseurs et grimoires bleus", img:"grimoire",
   lecons:[
    {id:"m17l1", t:"Le secret et le guérisseur", sous:"Coupeurs de feu, rebouteux, panseurs",
     idee:[
      "Dans les campagnes françaises, le savant n'était pas le seul à soigner. Le <b>rebouteux</b> remettait les os et les nerfs « froissés » ; le <b>coupeur de feu</b> ôtait la douleur des brûlures ; d'autres « arrêtaient le sang », chassaient les verrues ou le zona. Beaucoup n'avaient pour tout outil qu'un <b>secret</b>.",
      "Le secret est une courte prière, souvent tirée de la vie d'un saint ou du Christ, qu'on récite à voix basse en passant la main ou en faisant un signe de croix au-dessus du mal. Il ne s'écrit pas, ou très peu. Il se transmet de vive voix, à une seule personne, parfois à la veille de la mort ; dans certaines familles, d'un homme à une femme et d'une femme à un homme.",
      "Deux règles reviennent partout. Le guérisseur ne se fait pas payer, ou seulement par un don laissé librement ; et l'on évite de le remercier, de peur de « couper » le secret. Le don est vécu comme une charge plus que comme un pouvoir : on le tient de Dieu, et l'on doit répondre quand on vous appelle, de jour comme de nuit.",
      "Ces pratiques n'ont pas disparu. Les ethnologues en ont recueilli des milliers ; des coupeurs de feu sont encore appelés aujourd'hui, en France comme en Suisse romande, et certains soignants les connaissent. Arcanes n'en tire aucune promesse de guérison : il les présente comme une manière de soigner aussi le lien, la peur et la solitude du malade."],
     source:{txt:"Feu de Dieu, perds ta chaleur, comme Judas perdit sa couleur quand il trahit Notre-Seigneur au jardin des Oliviers.", ref:"Formule de coupeur de feu, tradition orale française, recueillie aux XIXe et XXe siècles", st:"trad"},
     schema:"saints",
     ex:{t:"Ce qu'on savait chez toi", txt:"Demande à un parent ou à un grand-parent s'il a connu un rebouteux, un coupeur de feu, une prière pour les brûlures. Note ce qu'on t'en dit, sans juger."},
     carnet:"Ce qu'on m'a raconté d'un guérisseur, d'un secret ou d'une prière :",
     marge:[{t:"Saint Laurent", txt:"Martyrisé sur un gril en 258, il est l'un des saints qu'on invoque contre les brûlures."},
            {t:"Voir aussi", txt:"La sympathie, module II : le mal qui ressemble guérit le mal.", go:"lec:m2l1"}]},
    {id:"m17l2", t:"Les grimoires bleus", sous:"Le Petit Albert, le Grand Grimoire, le Dragon rouge",
     idee:[
      "À partir du XVIIe siècle, des imprimeurs de Troyes, puis de Rouen, de Limoges et d'Épinal, publient de petits livres bon marché sur du papier grossier, sous une couverture bleue. Les <b>colporteurs</b> les emportent de foire en foire avec les almanachs et les images pieuses. C'est la <b>Bibliothèque bleue</b>.",
      "Parmi eux, des grimoires. Le <b>Petit Albert</b>, prétendument tiré d'Albert le Grand, mêle des recettes de cuisine et de jardin, des remèdes, des tours de passe-passe et quelques secrets inquiétants, comme la « main de gloire ». Le <b>Grand Grimoire</b>, ou <b>Dragon rouge</b>, promet de faire venir un esprit, Lucifuge Rofocale, et de trouver des trésors. L'<b>Enchiridion du pape Léon</b> rassemble des prières de protection.",
      "Leur pouvoir tenait d'abord à leur réputation. Posséder un grimoire suffisait à passer pour sorcier ; des curés les brûlaient en chaire ; des familles les cachaient dans le grenier. On les consultait surtout pour leurs remèdes, leurs prières et leurs calendriers, beaucoup moins pour invoquer qui que ce soit.",
      "Arcanes ne reproduit pas leurs rituels de pacte : ils appartiennent à l'histoire, pas à la pratique. Ce qu'on peut en garder, c'est le regard d'historien : ce que ces livres disent des peurs et des désirs des paysans, la faim, la maladie, la peur des loups et des voleurs, et l'espoir d'un trésor."],
     source:{txt:"Secrets merveilleux de la magie naturelle et cabalistique du Petit Albert.", ref:"Titre du Petit Albert, éditions de colportage du XVIIIe siècle", st:"doc"},
     schema:"grimoires",
     ex:{t:"Le grimoire de ta famille", txt:"Quels livres ou cahiers circulaient chez toi : un livre de recettes, un almanach, un cahier de remèdes ? C'est souvent là que les secrets se cachaient."},
     carnet:"Le livre, le cahier ou l'almanach de ma famille, et ce qu'il contenait :",
     marge:[{t:"Bibliothèque bleue", txt:"Le nom vient du papier bleu grossier qui servait de couverture."},
            {t:"Voir aussi", txt:"L'histoire : bûchers et grimoires de colportage.", go:"hist:h9"}]},
    {id:"m17l3", t:"Sorts et désorcèlement", sous:"Ce que les ethnologues ont appris",
     idee:[
      "Dans les années 1970, l'ethnologue <b>Jeanne Favret-Saada</b> s'installe dans le Bocage mayennais pour étudier la sorcellerie. Elle découvre qu'on n'en parle jamais à un observateur neutre : on n'en parle qu'à quelqu'un qui est « pris » dedans, comme ensorcelé ou comme désorceleur. Elle-même finit par être prise.",
      "Ce qu'elle décrit n'est pas une croyance folklorique, mais une manière de dire une crise. Quand les malheurs s'enchaînent dans une ferme, bêtes mortes, maladie, accident, on cherche qui « veut du mal ». Le <b>désorceleur</b> nomme un voisin, ou laisse le malade le reconnaître, puis organise un contre-sort.",
      "Le livre de Favret-Saada, <i>Les Mots, la mort, les sorts</i> (1977), montre la puissance de la parole : dire qu'un voisin est sorcier, c'est déjà agir, et cela peut détruire des familles entières. La sorcellerie des campagnes est d'abord une affaire de relations, de jalousies et de terres.",
      "D'où une règle que le module VIII posait déjà : la magie d'Arcanes ne vise personne. Ni sort, ni contre-sort, ni accusation. Quand tout va mal, la bonne question n'est pas « qui me veut du mal ? », mais « de quoi ai-je besoin, et qui peut m'aider ? »."],
     source:{txt:"En sorcellerie, la parole, c'est la guerre.", ref:"Jeanne Favret-Saada, Les Mots, la mort, les sorts, 1977", st:"doc"},
     ex:{t:"Retourner la question", txt:"Pense à une période où tout semblait aller de travers. Au lieu de chercher un coupable, écris trois choses dont tu avais besoin, et une personne qui aurait pu t'aider."},
     carnet:"Quand tout va mal, ce dont j'ai besoin :",
     marge:[{t:"Être pris", txt:"Le mot du Bocage pour celui qui est entré dans le jeu de la sorcellerie, de quelque côté que ce soit."},
            {t:"Voir aussi", txt:"Discernement et limites, module VIII.", go:"lec:m8l3"}]},
    {id:"m17l4", t:"L'abbé Julio et les prières merveilleuses", sous:"Un prêtre guérisseur, des pentacles imprimés",
     idee:[
      "Julien-Ernest Houssay, né en 1844 en Saône-et-Loire, ordonné prêtre en 1867, exerce d'abord dans des paroisses rurales. Il entre en conflit avec sa hiérarchie, quitte l'Église romaine et prend le nom d'<b>abbé Julio</b>. Il se présente comme le successeur et le biographe d'un guérisseur, Jean Sempé.",
      "Il publie les prières de Sempé, qu'il appelle <b>prières merveilleuses</b>, puis un livre de pentacles : quarante-quatre pentacles et sept prières, avec leurs usages et leurs explications. Il les imprime sur papier, les bénit parfois, et les distribue avec des consignes précises : protéger la maison, voyager sans danger, garder la santé.",
      "Ses pentacles mêlent tout ce qu'on a vu dans ce cours : la croix et les noms saints de la médaille chrétienne, les cercles et les versets des clavicules, la forme imprimée des grimoires bleus. Il meurt en 1912. Ses livres n'ont jamais cessé d'être réédités, et l'on trouve encore ses pentacles dans les portefeuilles et sur les murs des cuisines.",
      "Ce qui frappe chez lui, c'est la place laissée à la personne. Ses prières sont faites pour être dites par celui qui souffre, pas seulement par un prêtre. C'est l'idée qu'Arcanes reprend dans le cabinet des pentacles : un emblème qu'on compose et qu'on garde pour soi."],
     source:{txt:"Ces prières merveilleuses, que nous donnons dans ce petit volume, sont les prières mêmes que disait Jean Sempé.", ref:"L'abbé Julio, Prières merveilleuses, vers 1900", st:"doc"},
     ex:{t:"Une médaille pour la maison", txt:"Dans le cabinet des pentacles, choisis le style « médaille chrétienne » ou « libre » et compose une médaille de protection pour ta maison, avec une devise à toi.", outil:"outil:pentacles"},
     carnet:"La phrase de protection que je mettrais sur la porte de ma maison :",
     marge:[{t:"Jean Sempé", txt:"Un guérisseur dont on ne sait presque rien hors de ce que Julio en raconte."},
            {t:"Voir aussi", txt:"Les pentacles du monde.", go:"atelier:pentacles:monde"}]}
   ],
   quiz:[
    {q:"Qu'est-ce qu'un « secret » chez les guérisseurs ?", r:["Une courte prière transmise de vive voix","Une plante séchée","Un livre interdit","Un objet béni"], ok:0, exp:"On la récite à voix basse au-dessus du mal, et on la transmet à une seule personne."},
    {q:"Pourquoi évite-t-on de remercier un coupeur de feu ?", r:["De peur de « couper » le secret","Par politesse","Parce qu'il est payé","Pour ne pas le vexer"], ok:0, exp:"La croyance dit que le remerciement affaiblit le don."},
    {q:"Où naît la Bibliothèque bleue ?", r:["À Troyes","À Paris","À Lyon","À Bruxelles"], ok:0, exp:"Des imprimeurs de Troyes lancent ces petits livres au XVIIe siècle."},
    {q:"Qui a étudié la sorcellerie du Bocage mayennais ?", r:["Jeanne Favret-Saada","George Sand","Claude Lévi-Strauss","Mircea Eliade"], ok:0, exp:"Dans Les Mots, la mort, les sorts, en 1977."},
    {q:"Combien de pentacles l'abbé Julio a-t-il publiés ?", r:["Quarante-quatre","Sept","Soixante-douze","Douze"], ok:0, exp:"Quarante-quatre pentacles et sept prières."}
   ]};

  /* ================================================================
     XVIII · LA MAGIE NATURELLE
     ================================================================ */
  const M18 = {id:"m18", n:"XVIII", cercle:3, t:"La magie naturelle", sous:"Plantes, pierres, parfums et sympathies", img:"herbier",
   lecons:[
    {id:"m18l1", t:"Qu'est-ce que la magie naturelle ?", sous:"Les vertus cachées des choses",
     idee:[
      "Au Moyen Âge et à la Renaissance, on distingue deux magies. La magie <b>démoniaque</b>, condamnée, passe par des esprits. La magie <b>naturelle</b>, elle, utilise seulement les « vertus occultes » des choses : la force cachée de l'aimant, des plantes, des pierres, des parfums. Elle passe pour licite, et même savante.",
      "Le mot « occulte » ne veut pas dire secret, mais <b>caché à la vue</b> : on voit que l'aimant attire le fer, on ne voit pas pourquoi. Pour l'expliquer, on invoque la sympathie du module II : chaque chose tient ses vertus d'une étoile, et les choses qui se ressemblent s'attirent.",
      "Agrippa consacre à cette magie le premier livre de sa <i>Philosophie occulte</i>. En 1558, le Napolitain <b>Giambattista Della Porta</b> publie une <i>Magie naturelle</i>, qu'il augmente jusqu'à vingt livres en 1589 : on y trouve des recettes de parfums et de teintures, mais aussi des lentilles, des miroirs, la chambre noire, l'aimant.",
      "C'est l'un des berceaux de la science expérimentale. Della Porta fonde à Naples une académie des « secrets de la nature », et l'Académie des Lynx, celle de Galilée, l'accueille parmi ses membres. La frontière entre la magie naturelle et la physique se brouille, puis se déplace : ce qu'on comprend cesse d'être occulte."],
     source:{txt:"La magie naturelle n'est rien d'autre que la connaissance de toute la nature, et sa plus haute perfection.", ref:"Giambattista Della Porta, Magiae naturalis libri XX, 1589, livre I, chapitre 2, traduction pour Arcanes", st:"doc"},
     ex:{t:"Une vertu cachée", txt:"Prends un aimant de frigo et un trombone. Avant de te souvenir de ce qu'est le magnétisme, regarde l'attraction comme l'aurait fait un homme de 1558. Qu'aurais-tu pensé ?"},
     carnet:"Une chose de la nature dont je ne comprends pas le fonctionnement :",
     marge:[{t:"Occulte", txt:"Du latin occultus, « caché ». En astronomie, une étoile est occultée quand la Lune passe devant."},
            {t:"Voir aussi", txt:"La sympathie universelle, module II.", go:"lec:m2l1"}]},
    {id:"m18l2", t:"L'herbier des planètes", sous:"Signatures, analogies et prudence",
     idee:[
      "Chaque planète a ses plantes. Les raisons sont des <b>analogies</b> : le laurier et le romarin, toujours verts et parfumés, sont solaires ; le saule et le nénuphar, qui vivent près de l'eau, sont lunaires ; l'ortie qui pique et l'ail qui brûle sont martiens ; le lierre et le cyprès, plantes des tombes, sont saturniens.",
      "Paracelse et ses disciples ajoutent la <b>théorie des signatures</b> : la nature marque chaque plante d'un signe de sa vertu. La pulmonaire, aux feuilles tachées comme un poumon, soignerait les poumons ; la noix, qui ressemble à un cerveau, la tête. L'idée est fausse en médecine, mais elle dit beaucoup de la façon de regarder le monde.",
      "En 1653, l'Anglais <b>Nicholas Culpeper</b> publie un herbier immensément populaire, où chaque plante reçoit sa planète. Ses attributions ne sont pas toujours celles d'Agrippa : les auteurs ne s'accordent pas, et c'est normal. L'herbier ci-dessous retient les plantes sur lesquelles ils se rejoignent le plus souvent.",
      "Une règle absolue : Arcanes ne donne <b>aucun usage à avaler</b>. Une plante associée à une planète peut être regardée, dessinée, cultivée, posée sur un autel. Pour la boire ou la manger, il faut l'avis d'un professionnel : la digitale, l'ellébore ou la belladone, toutes saturniennes, sont des poisons."],
     source:{txt:"C'est une herbe du Soleil, sous le signe du Lion.", ref:"Nicholas Culpeper, The English Physitian, 1652-1653, à propos du romarin, traduction pour Arcanes", st:"doc"},
     schema:"herbier",
     ex:{t:"Ta plante", txt:"Dans l'herbier, choisis la plante de la planète qui te parle. Trouve-la en vrai, dans un jardin, chez un fleuriste ou au marché, et dessine-la."},
     carnet:"La plante que j'ai choisie, où je l'ai trouvée, et ce qu'elle m'évoque :",
     marge:[{t:"Prudence", txt:"Aucune recette à avaler dans Arcanes. Une plante magique se regarde et se cultive."},
            {t:"Voir aussi", txt:"Le caractère des planètes, module III.", go:"lec:m3l3"}]},
    {id:"m18l3", t:"Les pierres et les métaux", sous:"Lapidaires et correspondances",
     idee:[
      "Les <b>lapidaires</b> sont des livres sur les vertus des pierres. Le plus lu au Moyen Âge est le poème latin de <b>Marbode</b>, évêque de Rennes, à la fin du XIe siècle : soixante pierres, de l'agate au jaspe, avec leurs pouvoirs. On y apprend que le saphir apaise, que l'agate rend éloquent, que le jaspe protège.",
      "Les sept <b>métaux</b> sont plus constants : plomb pour Saturne, étain pour Jupiter, fer pour Mars, or pour le Soleil, cuivre pour Vénus, mercure pour Mercure, argent pour la Lune. Ce sont ceux de l'alchimie et des talismans : un pentacle de Jupiter se grave sur l'étain.",
      "Pour les pierres, les auteurs varient davantage. Les règles d'analogie restent les mêmes : la couleur, la dureté, l'éclat. Les pierres sombres et lourdes vont à Saturne, les rouges à Mars, les dorées au Soleil, les vertes à Vénus, les blanches et nacrées comme la perle et la pierre de lune à la Lune.",
      "Aujourd'hui, la lithothérapie a fait des pierres un commerce immense. Aucune étude sérieuse ne leur trouve d'effet propre sur la santé. Ce qui reste, c'est ce que dit Marbode sans le savoir : une pierre qu'on choisit, qu'on porte et qu'on touche est un rappel, comme un pentacle."],
     source:{txt:"Le saphir, la plus belle des pierres, est digne des doigts des rois.", ref:"Marbode de Rennes, Liber lapidum, fin du XIe siècle, traduction pour Arcanes", st:"doc"},
     ex:{t:"Une pierre de rappel", txt:"Choisis un caillou ou une pierre qui te plaît. Associe-lui une intention, et garde-le dans ta poche une semaine. Chaque fois que tu le touches, rappelle-toi l'intention.", outil:"outil:toile"},
     carnet:"La pierre que je porte, et ce qu'elle me rappelle :",
     marge:[{t:"Marbode", txt:"Son lapidaire a été traduit en français dès le XIIe siècle et copié partout."},
            {t:"Voir aussi", txt:"Les sept métaux de l'alchimie, module XIII.", go:"lec:m13l2"}]},
    {id:"m18l4", t:"Parfums et fumigations", sous:"La fumée qui monte vers le ciel",
     idee:[
      "Toutes les religions de l'Antiquité brûlent des parfums pour les dieux : l'encens, la myrrhe, le styrax. La fumée monte, comme une prière visible. Les <i>Hymnes orphiques</i> commencent chacun par le nom du parfum qu'on doit brûler pour le dieu, comme tu l'as vu au module X.",
      "Agrippa reprend l'idée sous le nom de <b>suffumigations</b> : chaque planète a ses odeurs. Les parfums lourds et sombres pour Saturne, les parfums doux et nobles pour Jupiter, les odeurs âcres et piquantes pour Mars, l'encens et les aromates précieux pour le Soleil, les odeurs douces et fleuries pour Vénus, les mélanges pour Mercure, les odeurs fraîches et humides pour la Lune.",
      "Dans la Clavicule, l'encens purifie les instruments et les pentacles. Dans les églises, il honore l'autel. Dans les cabinets des alchimistes, il accompagne le travail. Partout, il marque un <b>changement d'état</b> : on entre dans un temps à part.",
      "Quelques précautions. On aère la pièce, on ne laisse jamais une braise sans surveillance, on évite la fumée avec un asthme ou près d'un enfant. Et l'on ne brûle jamais n'importe quelle plante : certaines fumées sont toxiques. Un simple bâton d'encens, ou une bougie parfumée, suffit à marquer le seuil."],
     source:{txt:"Parfum de Hèlios : de l'encens et de la manne.", ref:"Hymnes orphiques, hymne à Hèlios, traduction de Leconte de Lisle, 1869", st:"doc"},
     ex:{t:"Le seuil", txt:"Avant ta prochaine pratique, allume un encens ou une bougie, et regarde la fumée ou la flamme une minute. Remarque comment le geste change ton attention."},
     carnet:"Une odeur qui me fait changer d'état, et pourquoi :",
     marge:[{t:"Fumigation", txt:"Du latin fumus, « fumée ». La suffumigation est la fumée qu'on fait monter par-dessous."},
            {t:"Voir aussi", txt:"Ficin et les hymnes, module X.", go:"lec:m10l2"}]}
   ],
   quiz:[
    {q:"Que veut dire « occulte » dans « vertus occultes » ?", r:["Caché à la vue","Diabolique","Secret et interdit","Venu d'Orient"], ok:0, exp:"On voit l'effet, pas la cause : l'aimant attire le fer, on ne voit pas pourquoi."},
    {q:"Qui publie une Magie naturelle en vingt livres en 1589 ?", r:["Giambattista Della Porta","Paracelse","Marsile Ficin","John Dee"], ok:0, exp:"On y trouve des lentilles, des miroirs, l'aimant et la chambre noire."},
    {q:"Selon les herbiers, quelle planète gouverne l'ortie ?", r:["Mars","Vénus","La Lune","Jupiter"], ok:0, exp:"Elle pique et brûle, comme le fer et la guerre."},
    {q:"Quel métal pour Vénus ?", r:["Le cuivre","L'étain","Le plomb","L'argent"], ok:0, exp:"Le cuivre, dont on faisait les miroirs, et dont le vert-de-gris rappelle la couleur de Vénus."},
    {q:"Qui a écrit un lapidaire très lu au Moyen Âge ?", r:["Marbode de Rennes","Albert le Grand","Hildegarde de Bingen","Isidore de Séville"], ok:0, exp:"Hildegarde et Albert en ont écrit aussi, mais le poème de Marbode est le plus copié."}
   ]};

  /* ================================================================
     XIX · LE RÊVE ET LA VISION
     ================================================================ */
  const M19 = {id:"m19", n:"XIX", cercle:3, t:"Le rêve et la vision", sous:"Incubation, rêve lucide, miroirs, et le carnet de la nuit", img:"songes",
   lecons:[
    {id:"m19l1", t:"Dormir au temple", sous:"Asclépios, Artémidore et les cinq rêves de Macrobe",
     idee:[
      "À Épidaure, dans le sanctuaire d'Asclépios, le dieu guérisseur, les malades se purifiaient, offraient un sacrifice, puis dormaient dans une salle sacrée, l'<b>abaton</b>. La nuit, le dieu venait en rêve : il soignait, ou il indiquait le remède. C'est l'<b>incubation</b>, du latin <i>incubare</i>, « se coucher dessus ».",
      "Des stèles du IVe siècle avant notre ère racontent ces guérisons : un aveugle qui voit, un muet qui parle. Des récits de dévots, bien sûr, mais qui montrent l'importance de la nuit. L'incubation s'est pratiquée dans tout le monde grec, puis dans les églises chrétiennes, auprès des reliques des saints guérisseurs.",
      "Au IIe siècle, <b>Artémidore de Daldis</b> écrit l'<i>Onirocritique</i>, « l'art de juger les rêves », après avoir recueilli des milliers de songes dans les marchés. Sa règle : un même rêve n'a pas le même sens pour un riche et pour un pauvre, pour un homme et pour une femme. Il faut connaître le rêveur.",
      "Vers 400, <b>Macrobe</b> distingue cinq sortes de rêves. Deux ne disent rien : le cauchemar, qui rejoue les soucis du jour, et l'apparition, au bord du sommeil. Trois annoncent quelque chose : le songe énigmatique, qu'il faut interpréter ; la vision, qui se réalisera telle quelle ; l'oracle, où un être vénérable parle. Le Moyen Âge a gardé cette grille pendant mille ans."],
     source:{txt:"Il faut que l'interprète connaisse la condition, le métier, la naissance, la fortune et la santé du rêveur.", ref:"Artémidore de Daldis, Onirocritique, livre I, IIe siècle, traduction pour Arcanes", st:"doc"},
     schema:"macrobe",
     ex:{t:"Ce soir, l'incubation", txt:"Prends un rêve récent et cherche sa case dans le schéma. Puis, ce soir, lance l'incubation guidée : une question posée à la nuit, et le carnet prêt pour le matin.", outil:"rituel:incubation"},
     carnet:"Un rêve récent, et la case de Macrobe où je le range :",
     marge:[{t:"Épidaure", txt:"Le théâtre du sanctuaire, l'un des mieux conservés de Grèce, accueillait les fêtes du dieu."},
            {t:"Voir aussi", txt:"L'histoire : l'Égypte grecque et les papyrus.", go:"hist:h3"}]},
    {id:"m19l2", t:"Le carnet de rêves", sous:"Se souvenir, noter, relire",
     idee:[
      "Tout le monde rêve, plusieurs fois par nuit, surtout pendant le sommeil paradoxal. Mais on oublie presque tout dans les minutes qui suivent le réveil. Le premier art du rêve est donc un art de la <b>mémoire</b> : rester immobile quelques instants, les yeux fermés, et remonter le fil avant de bouger.",
      "Puis on <b>note</b>, tout de suite, au présent : « je marche dans une maison inconnue ». Les détails d'abord, même absurdes ; les émotions ; les personnes. On donne un <b>titre</b> au rêve, comme à une nouvelle. Au bout de quelques semaines, on se souvient de plus en plus, et l'on voit revenir des lieux, des figures, des situations.",
      "La <b>relecture</b> est le deuxième temps. Quels symboles reviennent ? Dans quelles périodes ? Jung proposait d'<b>amplifier</b> un symbole : au lieu de le traduire par une clé toute faite, chercher tout ce qu'il évoque, dans ta vie, dans les mythes, dans les contes. L'univers Psyché d'Arcanes ira plus loin.",
      "Une précaution : le carnet de rêves sert à se connaître, pas à prédire. Si des cauchemars reviennent sans cesse, ou si le sommeil se dégrade, c'est un médecin qu'il faut voir, pas un livre d'interprétation."],
     source:{txt:"Le rêve est un théâtre où le rêveur est à la fois la scène, l'acteur, le souffleur, le metteur en scène, l'auteur, le public et le critique.", ref:"C. G. Jung, d'après ses séminaires, traduction pour Arcanes", st:"mod"},
     schema:"reverec",
     ex:{t:"Sept matins", txt:"Pendant sept matins, note ton rêve dans le schéma, même s'il n'en reste qu'une image. Le septième jour, relis tout."},
     carnet:"Mon rêve de cette nuit, son titre et l'émotion qu'il m'a laissée :",
     marge:[{t:"Sommeil paradoxal", txt:"Découvert en 1953 par Aserinsky et Kleitman, et nommé ainsi en France par Michel Jouvet."},
            {t:"Voir aussi", txt:"Le carnet.", go:"carnet"}]},
    {id:"m19l3", t:"Le rêve lucide", sous:"Savoir qu'on rêve",
     idee:[
      "Un rêve est <b>lucide</b> quand on sait qu'on rêve, sans se réveiller. En 1867, le marquis <b>Hervey de Saint-Denys</b> publie <i>Les Rêves et les moyens de les diriger</i> : il a noté ses rêves depuis l'âge de treize ans, et appris à les orienter. Le mot « rêve lucide » vient du psychiatre néerlandais Frederik van Eeden, en 1913.",
      "Longtemps, on a douté. En 1975, Keith Hearne en Angleterre, puis Stephen LaBerge en Californie, en apportent la preuve en laboratoire : un rêveur convient d'avance d'un signal, bouger les yeux de gauche à droite plusieurs fois, et le fait pendant le sommeil paradoxal, pendant que les appareils enregistrent.",
      "Les techniques sont simples. Le <b>test de réalité</b> : plusieurs fois par jour, se demander sérieusement « est-ce que je rêve ? » et vérifier, en relisant un texte ou en regardant ses mains ; l'habitude finit par revenir en rêve. L'<b>intention</b> du soir : se répéter en s'endormant « la prochaine fois que je rêve, je saurai que je rêve ».",
      "Deux précautions. On ne sacrifie pas son sommeil pour ces exercices. Et la <b>paralysie du sommeil</b>, qu'on rencontre parfois, est un phénomène connu et sans danger : le corps reste endormi quand l'esprit s'éveille, souvent avec une impression de présence. Elle passe en quelques instants ; respirer calmement aide."],
     source:{txt:"Je ne m'étais jamais douté qu'on pût avoir, en dormant, la conscience de sa situation.", ref:"Hervey de Saint-Denys, Les Rêves et les moyens de les diriger, 1867", st:"doc"},
     schema:"lucide",
     ex:{t:"Trois tests par jour", txt:"Pendant une semaine, fais trois tests de réalité par jour, à des moments fixes. Note chaque matin si tu as rêvé que tu en faisais un."},
     carnet:"Un rêve où j'ai su, ou presque su, que je rêvais :",
     marge:[{t:"Hervey de Saint-Denys", txt:"Sinologue au Collège de France, il publia son livre sans nom d'auteur."},
            {t:"Voir aussi", txt:"La respiration en carré, pour s'endormir.", go:"rituel:carre"}]},
    {id:"m19l4", t:"Miroirs, cristaux et visions", sous:"Ce qu'on voit dans une surface sombre",
     idee:[
      "Regarder fixement une surface, de l'eau, un miroir noir, une boule de cristal, jusqu'à y voir des images : c'est la <b>divination par le miroir</b>, qu'on appelle aussi <i>scrying</i>. On la trouve dans l'Antiquité, chez les Perses, dans les papyrus magiques grecs, et chez les mages de la Renaissance.",
      "Le plus célèbre est celui de <b>John Dee</b>. À partir de 1582, avec le médium Edward Kelley, il cherche à parler aux anges à travers une pierre de cristal et un miroir d'obsidienne, venu des Aztèques par l'Espagne. Kelley regarde, décrit et répète ; Dee note tout. Le miroir est aujourd'hui au British Museum.",
      "La psychologie éclaire ces visions sans les épuiser. Le cerveau voit des formes là où il n'y en a pas, des visages dans les nuages : c'est la <b>paréidolie</b>. Dans la pénombre et l'immobilité, il remplit le vide d'images, comme au bord du sommeil, dans les états <b>hypnagogiques</b>. Ce qu'on y voit vient de soi : c'est ce qui le rend intéressant.",
      "Si tu essaies, fais-le simplement : un bol d'eau, une lumière douce, trois minutes, puis tu notes ce qui est venu. Si une image t'inquiète, tu arrêtes, tu rallumes, tu bouges. Et si des visions viennent sans que tu les cherches, ou deviennent envahissantes, parles-en à un médecin : ce n'est plus un exercice."],
     source:{txt:"Assis de nuit seul au secret estude, / Seul reposé sur la selle d'airain.", ref:"Nostradamus, Centuries, I, 1, 1555", st:"doc"},
     ex:{t:"Le bol d'eau", txt:"Le soir, dans une lumière douce, regarde un bol d'eau sombre pendant trois minutes, sans rien chercher. Note ensuite les formes et les images venues, puis allume la lumière."},
     carnet:"Ce que j'ai vu dans l'eau, et ce que cela m'évoque :",
     marge:[{t:"Le miroir de Dee", txt:"Un disque d'obsidienne polie, d'origine aztèque, rapporté en Europe après la conquête du Mexique."},
            {t:"Voir aussi", txt:"L'histoire : John Dee et la Rose-Croix.", go:"hist:h8"}]}
   ],
   quiz:[
    {q:"Comment s'appelle la pratique de dormir dans un sanctuaire pour recevoir un rêve ?", r:["L'incubation","L'oniromancie","L'invocation","La catalepsie"], ok:0, exp:"Du latin incubare, « se coucher dessus »."},
    {q:"Qui a écrit l'Onirocritique ?", r:["Artémidore de Daldis","Macrobe","Aristote","Hippocrate"], ok:0, exp:"Au IIe siècle, à partir de milliers de rêves recueillis."},
    {q:"Qui a publié Les Rêves et les moyens de les diriger en 1867 ?", r:["Hervey de Saint-Denys","Freud","Jung","Alfred Maury"], ok:0, exp:"Le marquis notait ses rêves depuis l'âge de treize ans."},
    {q:"Comment a-t-on prouvé le rêve lucide en laboratoire ?", r:["Par un signal des yeux convenu d'avance","Par un questionnaire","Par une prise de sang","On ne l'a jamais prouvé"], ok:0, exp:"Keith Hearne en 1975, puis Stephen LaBerge."},
    {q:"Avec quoi John Dee et Edward Kelley cherchaient-ils à voir les anges ?", r:["Un cristal et un miroir d'obsidienne","Un jeu de tarot","Un pendule","Des cartes du ciel"], ok:0, exp:"Le miroir d'obsidienne, d'origine aztèque, est au British Museum."}
   ]};

  const ETOF = {
   m17l1:{acc:"Un mot dit à voix basse, une main passée au-dessus d'une brûlure : la médecine des campagnes tenait souvent en une prière.",
     conf:[["Les guérisseurs sont des sorciers.","Ils se disent souvent très chrétiens, et tiennent leur don de Dieu. Le sorcier, c'est celui qu'on accuse de faire le mal."]],
     ret:["Rebouteux, coupeur de feu, panseur de secret.","Le secret se transmet de vive voix, à une seule personne.","Ni paiement exigé, ni remerciement."],
     loin:["Marcelle Bouteiller, <i>Médecine populaire d'hier et d'aujourd'hui</i>, 1966."]},
   m17l2:{acc:"Des livres à quelques sous, une couverture bleue, et la réputation de faire venir le diable.",
     conf:[["Les grimoires bleus sont des livres anciens de magie médiévale.","Ce sont des compilations des XVIIe-XIXe siècles, attribuées à des auteurs prestigieux pour mieux se vendre."]],
     ret:["La Bibliothèque bleue de Troyes.","Petit Albert, Grand Grimoire, Enchiridion.","Leur force venait de leur réputation."]},
   m17l3:{acc:"Dire qu'un voisin vous jette un sort, c'est déjà lui jeter le sien.",
     conf:[["La sorcellerie a disparu des campagnes au XIXe siècle.","Les ethnologues l'ont trouvée bien vivante dans les années 1970, et elle n'a pas disparu."]],
     ret:["Être « pris ».","Le désorceleur nomme ou laisse reconnaître.","La parole agit : on ne vise personne."],
     loin:["Jeanne Favret-Saada, <i>Les Mots, la mort, les sorts</i>, Gallimard, 1977."]},
   m17l4:{acc:"Un prêtre qui quitte son Église pour soigner, et qui imprime des pentacles pour tout le monde.",
     conf:[["Les pentacles de l'abbé Julio viennent de la Clé de Salomon.","Ils en empruntent la forme, mais leur contenu est chrétien et tourné vers la protection."]],
     ret:["Julien-Ernest Houssay, 1844-1912.","Jean Sempé, le maître guérisseur.","Quarante-quatre pentacles et sept prières."]},
   m18l1:{acc:"Pourquoi l'aimant attire-t-il le fer ? Pendant deux mille ans, la réponse a été : par une vertu occulte.",
     conf:[["Magie naturelle et science sont opposées.","Elles se sont longtemps confondues : Della Porta décrit la chambre noire et les lentilles."]],
     ret:["Magie naturelle : les vertus des choses.","Occulte : caché à la vue.","Della Porta, 1558 et 1589."]},
   m18l2:{acc:"Le romarin est solaire, l'ortie martienne, le saule lunaire : un herbier se lit comme un ciel.",
     conf:[["La théorie des signatures a été confirmée par la médecine.","Non. La forme d'une plante ne dit rien de ses effets."]],
     ret:["Les analogies : couleur, lieu, saveur, forme.","Culpeper, 1653.","Rien à avaler sans avis d'un professionnel."],
     prat:["Plante une herbe de ta planète sur un rebord de fenêtre, et dessine-la chaque semaine."]},
   m18l3:{acc:"Une pierre qu'on touche dans sa poche est le plus petit des talismans.",
     conf:[["Les pierres ont des effets prouvés sur la santé.","Aucune étude sérieuse ne leur en trouve. Leur effet est celui d'un rappel."]],
     ret:["Marbode, fin du XIe siècle.","Sept métaux, sept planètes.","Les pierres varient selon les auteurs."]},
   m18l4:{acc:"La fumée monte : c'est la plus ancienne image de la prière.",
     conf:[["Toute plante séchée peut se brûler en encens.","Certaines fumées sont toxiques. Un encens du commerce suffit."]],
     ret:["Hymnes orphiques : un parfum par dieu.","Agrippa : les suffumigations des planètes.","Aérer, surveiller, éviter près d'un enfant ou d'un asthme."]},
   m19l1:{acc:"Dormir dans un temple pour rencontrer un dieu : la plus ancienne clinique du monde était un dortoir.",
     conf:[["Les Anciens croyaient que tous les rêves venaient des dieux.","Macrobe en distingue cinq sortes, dont deux qui ne disent rien."]],
     ret:["L'incubation à Épidaure.","Artémidore : connaître le rêveur.","Macrobe : cinq sortes de rêves."]},
   m19l2:{acc:"Un rêve non noté s'efface en quelques minutes. Un rêve noté peut durer toute une vie.",
     conf:[["Les clés des songes donnent le sens des symboles.","Un même symbole n'a pas le même sens pour chacun. Artémidore le disait déjà."]],
     ret:["Ne pas bouger, remonter le fil, noter au présent.","Un titre par rêve.","Relire, amplifier, sans prédire."]},
   m19l3:{acc:"Savoir qu'on rêve, sans se réveiller : la science a mis un siècle à le croire.",
     conf:[["La paralysie du sommeil est dangereuse ou surnaturelle.","C'est un phénomène connu, fréquent et sans danger."]],
     ret:["Hervey de Saint-Denys, 1867 ; van Eeden, 1913.","La preuve par le signal des yeux.","Tests de réalité et intention du soir."],
     loin:["Hervey de Saint-Denys, <i>Les Rêves et les moyens de les diriger</i>, 1867, réédité."]},
   m19l4:{acc:"Une surface sombre, un regard qui ne cherche rien, et des images qui montent : d'où viennent-elles ?",
     conf:[["Ce qu'on voit dans le miroir vient d'ailleurs.","La psychologie y voit la paréidolie et les images hypnagogiques : elles viennent de soi."]],
     ret:["Le scrying : eau, cristal, miroir noir.","Dee et Kelley, à partir de 1582.","Trois minutes, lumière douce, et l'on s'arrête si l'on est mal."]}
  };
  [M17, M18, M19].forEach(m => { if(!K.MODULES.find(x => x.id === m.id)) K.MODULES.push(m); });
  Object.assign(window.MAGIE_ETOFFE = window.MAGIE_ETOFFE || {}, ETOF);
  _.CRED.herbier = "La camomille, Leonhart Fuchs, De historia stirpium, Bâle, 1542, gravure sur bois coloriée";
  _.CRED.songes = "Le sommeil de la raison engendre des monstres, Francisco de Goya, Los Caprichos, planche 43, 1799";

  /* ================================================================
     LES SCHÉMAS
     ================================================================ */
  const SAINTS = [
    ["Saint Laurent", "les brûlures", "Martyrisé sur un gril : il connaît le feu."],
    ["Sainte Apolline", "les maux de dents", "On lui arracha les dents pendant son martyre."],
    ["Saint Blaise", "la gorge", "Il aurait sauvé un enfant qui s'étouffait avec une arête."],
    ["Saint Antoine", "le « mal des ardents »", "Ses moines soignaient l'ergotisme, ce feu qui brûlait les membres."],
    ["Sainte Claire", "les yeux", "Son nom dit la clarté."],
    ["Saint Hubert", "la rage", "Patron des chasseurs et des chiens."],
    ["Saint Roch", "la peste", "Pèlerin pestiféré, nourri par un chien."],
    ["Saint Guy (Vit)", "la danse de Saint-Guy", "On dansait en son honneur jusqu'à l'épuisement."],
    ["Saint Fiacre", "le « fic », une grosseur", "Son nom ressemble au mal."]
  ];
  const HERB = {
    soleil:[["Le laurier","Laurus nobilis","Toujours vert, couronne des vainqueurs et d'Apollon."],["Le romarin","Rosmarinus officinalis","« Herbe du Soleil », dit Culpeper ; son parfum réchauffe."],["Le safran","Crocus sativus","Le doré de ses stigmates."]],
    lune:[["Le saule","Salix alba","Il pousse au bord de l'eau et plie sans rompre."],["Le nénuphar","Nymphaea alba","Une fleur blanche posée sur l'eau dormante."],["La laitue","Lactuca sativa","Fraîche, pleine d'eau, réputée apaiser le sommeil."]],
    mercure:[["La lavande","Lavandula angustifolia","Mêlée, vive, parfumée."],["Le fenouil","Foeniculum vulgare","Des feuilles fines comme des fils, une saveur double."],["La valériane","Valeriana officinalis","Une odeur étrange, entre deux mondes."]],
    venus:[["La verveine","Verbena officinalis","« Herbe sacrée » des Romains et des druides."],["La rose de Damas","Rosa damascena","La fleur d'Aphrodite."],["Le myrte","Myrtus communis","Couronne des amants et de Vénus."]],
    mars:[["L'ortie","Urtica dioica","Elle pique et brûle."],["L'ail","Allium sativum","Brûlant au goût, il chasse."],["Le basilic","Ocimum basilicum","Ardent et fort, dit Culpeper."]],
    jupiter:[["Le chêne","Quercus robur","L'arbre de Zeus et de la foudre, roi de la forêt."],["La sauge","Salvia officinalis","Son nom vient de salvare, « sauver »."],["La bourrache","Borago officinalis","Ses fleurs bleues, la couleur de Jupiter."]],
    saturne:[["Le lierre","Hedera helix","Il s'accroche aux ruines et aux tombes."],["Le cyprès","Cupressus sempervirens","L'arbre des cimetières."],["La prêle","Equisetum arvense","Une plante plus vieille que les dinosaures."]]
  };
  const ORD = ["soleil","lune","mercure","venus","mars","jupiter","saturne"];
  const MACROBE = [
    ["L'insomnium", "le cauchemar", "Il rejoue les soucis du jour, la faim, l'amour, la peur. Il ne dit rien de l'avenir.", false],
    ["Le visum", "l'apparition", "Au bord du sommeil, des formes passent, des figures se penchent. Il ne dit rien non plus.", false],
    ["Le somnium", "le songe", "Il dit la vérité sous un voile : il faut l'interpréter. C'est le rêve de Joseph et des clés des songes.", true],
    ["La visio", "la vision", "Ce qu'on voit se réalisera tel quel.", true],
    ["L'oraculum", "l'oracle", "Un parent, un prêtre ou un dieu apparaît et dit ce qui arrivera ou ce qu'il faut faire.", true]
  ];
  const TESTS = [["Lire deux fois", "Lis un texte, détourne les yeux, relis : en rêve, les mots changent."], ["Regarder ses mains", "En rêve, les doigts sont souvent flous ou en trop."], ["Le nez pincé", "Pince-toi le nez et essaie de respirer : en rêve, l'air passe quand même."], ["L'heure", "Regarde une montre deux fois : en rêve, l'heure saute."], ["La lumière", "Actionne un interrupteur : en rêve, la lumière change rarement."], ["Se souvenir", "Comment suis-je arrivé ici ? En rêve, on ne le sait pas."]];

  Object.assign(_.schemas, {
    saints: fig => {
      fig.innerHTML = `<div class="xs"><p class="help m-left">Pourquoi tel saint pour tel mal ? Touche une carte : c'est presque toujours une analogie, comme dans la sympathie du module II.</p><div class="x3-cards">${SAINTS.map((s, i) => `<button type="button" class="x3-card" data-x3s="${i}"><b>${s[0]}</b><small>${s[1]}</small><span hidden>${s[2]}</span></button>`).join("")}</div></div>`;
      qa("[data-x3s]", fig).forEach(b => b.onclick = () => { const sp = q1("span", b); sp.hidden = !sp.hidden; b.classList.toggle("on", !sp.hidden); });
    },
    grimoires: fig => {
      const G = [["La Bibliothèque bleue", "Troyes, XVIIe – XIXe siècle", "Des centaines de titres à quelques sous : almanachs, contes, vies de saints, recettes, et grimoires."],
        ["Le Petit Albert", "XVIIIe siècle", "Recettes de cuisine et de jardin, remèdes, tours de passe-passe, et quelques secrets macabres."],
        ["Le Grand Grimoire", "XVIIIe – XIXe siècle", "Aussi appelé Dragon rouge : il promet de faire venir un esprit pour trouver un trésor. Arcanes n'en donne pas le rituel."],
        ["L'Enchiridion du pape Léon", "XVIIe – XVIIIe siècle", "Des prières de protection, attribuées sans fondement à un pape du IXe siècle."],
        ["L'almanach", "chaque année", "Le calendrier, les foires, les lunes, les conseils pour semer : le livre le plus lu des campagnes."]];
      fig.innerHTML = `<div class="xs"><div class="x3-shelf">${G.map((g, i) => `<button type="button" class="x3-book" data-x3g="${i}" aria-label="${g[0]}" style="--bk:${["#2a4f8f","#3d6aa8","#1f3b6a","#4a6fa5","#2e5a8a"][i]}"><span>${["Bibl. bleue","Petit Albert","Grand Grimoire","Enchiridion","Almanach"][i]}</span></button>`).join("")}</div><div class="x3-bookd"></div></div>`;
      const show = i => { qa("[data-x3g]", fig).forEach(b => b.classList.toggle("on", +b.dataset.x3g === i)); q1(".x3-bookd", fig).innerHTML = `<h4>${G[i][0]}</h4><p class="help m-left">${G[i][1]}</p><p>${G[i][2]}</p>`; };
      qa("[data-x3g]", fig).forEach(b => b.onclick = () => show(+b.dataset.x3g)); show(0);
    },
    herbier: fig => {
      let pl = "soleil";
      const draw = () => { const p = PL[pl];
        fig.innerHTML = `<div class="xs"><div class="pt-pls">${ORD.map(k => `<button type="button" data-x3p="${k}" aria-pressed="${k === pl}" style="--pc:${(PL[k] || {}).hex || "#555"}"><b>${PL[k].gl}</b><small>${PL[k].nom}</small></button>`).join("")}</div>
          <div class="x3-herb" style="--pc:${p.hex}">${HERB[pl].map(x => `<article><h4>${x[0]}</h4><p class="x3-lat">${x[1]}</p><p>${x[2]}</p></article>`).join("")}</div>
          <p class="help m-left">D'après Agrippa et Culpeper, qui ne s'accordent pas toujours. Rien de tout cela n'est à avaler : regarde, dessine, cultive.</p></div>`;
        qa("[data-x3p]", fig).forEach(b => b.onclick = () => { pl = b.dataset.x3p; draw(); }); };
      draw();
    },
    macrobe: fig => {
      fig.innerHTML = `<div class="xs"><div class="x3-mac">${MACROBE.map((m, i) => `<button type="button" class="x3-macc${m[3] ? " vrai" : ""}" data-x3m="${i}"><b>${m[0]}</b><small>${m[1]}</small></button>`).join("")}</div><div class="x3-macd"></div>
        <p class="help m-left">En haut, les deux rêves qui ne disent rien ; en bas, les trois qui annoncent. Macrobe, Commentaire au Songe de Scipion, vers 400.</p></div>`;
      const show = i => { qa("[data-x3m]", fig).forEach(b => b.classList.toggle("on", +b.dataset.x3m === i)); const m = MACROBE[i]; q1(".x3-macd", fig).innerHTML = `<h4>${m[0]}, ${m[1]}</h4><p>${m[2]}</p><p class="x3-tag${m[3] ? " v" : ""}">${m[3] ? "Il annonce quelque chose" : "Il ne dit rien de l'avenir"}</p>`; };
      qa("[data-x3m]", fig).forEach(b => b.onclick = () => show(+b.dataset.x3m)); show(2);
    },
    reverec: fig => {
      const EMO = ["la paix", "la joie", "la peur", "la tristesse", "la colère", "l'étrangeté", "le désir", "la honte"];
      let emo = null;
      fig.innerHTML = `<form class="xs x3-dream" autocomplete="off"><label class="pt-sel">Le titre de ton rêve<input type="text" maxlength="60" name="t" placeholder="Par exemple : la maison aux escaliers"></label>
        <label class="pt-sel">Le récit, au présent<textarea name="r" rows="5" maxlength="2000" placeholder="Je marche dans une maison que je ne connais pas…"></textarea></label>
        <p class="pm-lab">L'émotion au réveil</p><div class="m-chips">${EMO.map(e => `<button type="button" class="chip small" data-x3e="${e}">${e}</button>`).join("")}</div>
        <label class="pt-sel">Les symboles, séparés par des virgules<input type="text" maxlength="160" name="s" placeholder="maison, escalier, eau"></label>
        <div class="m-acts start"><button type="submit" class="btn small">Garder dans le carnet</button></div><p class="help m-left x3-dmsg" aria-live="polite"></p></form>`;
      qa("[data-x3e]", fig).forEach(b => b.onclick = () => { emo = b.dataset.x3e; qa("[data-x3e]", fig).forEach(x => x.classList.toggle("on", x === b)); });
      q1("form", fig).onsubmit = e => { e.preventDefault(); const f = e.target, t = f.t.value.trim(), r = f.r.value.trim();
        if(!r){ q1(".x3-dmsg", fig).textContent = "Écris au moins une phrase du rêve."; return; }
        const S = st(); S.carnet.unshift({id:uid(), t:Date.now(), type:"reve", titre:t || "Un rêve", intention:emo ? "Au réveil : " + emo : "",
          texte:r + (f.s.value.trim() ? `\n\nSymboles : ${f.s.value.trim()}` : "")}); save();
        f.reset(); emo = null; qa("[data-x3e]", fig).forEach(x => x.classList.remove("on"));
        const n = S.carnet.filter(x => x.type === "reve").length; q1(".x3-dmsg", fig).textContent = `Gardé dans le carnet. Tu as noté ${n} rêve${n > 1 ? "s" : ""}.`; };
    },
    lucide: fig => {
      fig.innerHTML = `<div class="xs"><p class="help m-left">Six tests de réalité. Choisis-en trois, et fais-les chaque jour à heure fixe.</p><div class="x3-cards">${TESTS.map((t, i) => `<button type="button" class="x3-card" data-x3t="${i}"><b>${t[0]}</b><span>${t[1]}</span></button>`).join("")}</div><p class="x3-tmsg" aria-live="polite">Choisis trois tests.</p></div>`;
      const sel = new Set();
      qa("[data-x3t]", fig).forEach(b => b.onclick = () => { const i = +b.dataset.x3t; if(sel.has(i)) sel.delete(i); else if(sel.size < 3) sel.add(i); qa("[data-x3t]", fig).forEach(x => x.classList.toggle("on", sel.has(+x.dataset.x3t)));
        q1(".x3-tmsg", fig).innerHTML = sel.size < 3 ? `Choisis encore ${3 - sel.size} test${3 - sel.size > 1 ? "s" : ""}.` : `<b>Tes trois tests :</b> ${[...sel].map(k => TESTS[k][0].toLowerCase()).join(", ")}. Matin, midi et soir, demande-toi vraiment : « est-ce que je rêve ? »`; });
    }
  });

  /* ================================================================
     LE RITUEL GUIDÉ : L'INCUBATION DU SOIR
     ================================================================ */
  D.RITUELS.incubation = {nom:"L'incubation du soir", sous:"Poser une question à la nuit", duree:"5 minutes", niveau:"Module 19", statut:"D'après la tradition",
    intro:"Les malades d'Épidaure dormaient au temple pour recevoir un rêve. Arcanes en garde un geste simple : poser une question avant de dormir, et préparer le carnet pour le matin. Fais-le au lit, la lumière baissée.",
    etapes:[
      {t:"S'installer", txt:"Allongé, la lumière baissée, le carnet et un stylo à portée de main. Respire lentement quatre fois.", vis:"nuit:0", d:40},
      {t:"La question", txt:"Formule une seule question, simple, sur toi : « que m'apprend cette période ? », « de quoi ai-je besoin ? ». Dis-la à voix basse.", vis:"nuit:1", d:40},
      {t:"L'image", txt:"Imagine un lieu calme où tu aimerais recevoir une réponse : une pièce, un jardin, une rive. Regarde-le un moment.", vis:"nuit:2", d:60},
      {t:"L'intention", txt:"Répète doucement :", dire:"Cette nuit, je me souviendrai de mon rêve.", vis:"nuit:3", d:40},
      {t:"Lâcher", txt:"Ne cherche plus rien. Laisse venir le sommeil. Au réveil, ne bouge pas : remonte le fil, puis note, même une seule image.", vis:"nuit:4", d:30}]};

  X.vis.nuit = n => { n = n || 0; const stars = [[40,40],[160,30],[130,70],[60,110],[175,120],[25,150],[100,25]].slice(0, 3 + n);
    return `<div class="m-rite-glyph x3-nuit"><svg viewBox="0 0 200 200" width="180" height="180" aria-hidden="true"><circle cx="100" cy="100" r="96" fill="#141a33" opacity="${.55 + n*.1}"/>${stars.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.4 + (i % 3)*.5}" fill="#e8e3c9" opacity=".85"><animate attributeName="opacity" values=".3;1;.3" dur="${3 + i}s" repeatCount="indefinite"/></circle>`).join("")}<path d="M118 58a46 46 0 1 0 24 78a38 38 0 1 1 -24 -78z" fill="#e8e3c9"/>${n >= 4 ? `<text x="100" y="186" text-anchor="middle" font-size="13" fill="#e8e3c9" font-style="italic">z z z</text>` : ""}</svg></div>`; };

  /* ================================================================
     L'ÉCOLE : le troisième cercle
     ================================================================ */
  const head0 = X.ecoleHead;
  X.ecoleHead = (c, ms) => c === 3
    ? `<header class="m-cercle"><span class="m-cercle-n">III</span><div><p class="eyebrow">Le troisième cercle · modules XVII à XIX</p><h2>Hors les murs</h2><p>Ce qui se pratiquait loin des bibliothèques : les secrets des guérisseurs, les grimoires bleus, les plantes et les pierres, et la nuit des rêves.</p></div></header>`
    : c === 2 ? `<header class="m-cercle"><span class="m-cercle-n">II</span><div><p class="eyebrow">Le second cercle · modules IX à XVI</p><h2>Les fondements et les arts</h2><p>Pourquoi la magie a semblé possible, et les arts qui l'accompagnent : la musique des sphères, la géomancie, les lettres, l'alchimie, la mémoire, les pentacles et les écritures secrètes.</p></div></header>`
    : head0(c, ms);
})();
