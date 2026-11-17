/* ===== Arcanes · Le globe : huit traditions de plus =====
   Pour mieux couvrir l'Asie centrale et orientale, l'Afrique, l'Amérique du Sud et l'Océanie.
   Chargé après globe-data.js et les fiches détaillées : ajoute les traditions, leurs fiches et leurs fils. */
(() => {
  const D = window.GLOBE_DATA, PL = window.GLOBE_PLUS = window.GLOBE_PLUS || {}; if(!D) return;
  const NEW = [
   {id:"etrusques", fam:"anc", nom:"Les haruspices étrusques", lon:11.75, lat:42.25, lieu:"Tarquinia", de:-700, a:410, st:"doc",
    x:"Les Étrusques lisaient la volonté des dieux dans le foie des bêtes sacrifiées et dans la foudre. Rome a gardé leurs devins, les haruspices, jusqu'à la fin de l'Antiquité. Un foie de bronze couvert de noms divins, retrouvé près de Plaisance en 1877, montre comment le ciel était reporté sur l'organe.", l:["astro"]},
   {id:"onmyodo", fam:"asi", nom:"L'onmyōdō", lon:135.75, lat:35.03, lieu:"Kyōto", de:675, a:1870, st:"doc",
    x:"« La voie du yin et du yang ». Venue de Chine, cette science du calendrier, des présages et des directions devient au Japon un bureau officiel de la cour. Ses devins, les onmyōji, choisissent les jours favorables, éloignent les influences néfastes et lisent les signes du ciel.", l:["astro"]},
   {id:"mudang", fam:"pre", nom:"Le chamanisme coréen", lon:126.96, lat:37.58, lieu:"Séoul, mont Inwang", de:0, dt:"Tradition vivante", st:"trad", n:"sacre",
    x:"En Corée, les mudang, le plus souvent des femmes, servent d'intermédiaires entre les vivants, les ancêtres et les esprits. Combattue par l'État confucéen, puis sous la colonisation japonaise et la modernisation des années 1970, leur pratique a survécu et reste vivante aujourd'hui."},
   {id:"tengri", fam:"pre", nom:"Tengri, le ciel des steppes", lon:102.83, lat:47.20, lieu:"Karakorum", de:-200, dt:"Depuis l'Antiquité", st:"trad",
    x:"Les peuples turcs et mongols honoraient Tengri, le Ciel éternel, et la Terre. Les chamanes y servaient d'intermédiaires avec les esprits. Gengis Khan et ses successeurs se disaient mandatés par « l'éternel Ciel bleu ». On élève encore sur les cols des tas de pierres, les ovoo, en l'honneur des esprits du lieu."},
   {id:"tombouctou", fam:"afr", nom:"Les savants de Tombouctou", lon:-3.00, lat:16.77, lieu:"Tombouctou", de:1300, a:1600, st:"doc",
    x:"Aux XVe et XVIe siècles, Tombouctou est une ville de savants. On y copie des centaines de milliers de manuscrits : droit, théologie, médecine, astronomie, mais aussi astrologie, géomancie et science des lettres, qui servent à composer des talismans. En 2012, des bibliothécaires en ont sauvé la plupart en les sortant clandestinement de la ville occupée.", l:["magie"]},
   {id:"muisca", fam:"ame", nom:"Les Muiscas et l'Eldorado", lon:-73.78, lat:4.98, lieu:"Lagune de Guatavita", de:600, a:1600, st:"doc", n:"leg",
    x:"Sur les hauts plateaux de Colombie, les Muiscas offraient de l'or aux divinités des lagunes. Un chroniqueur raconte qu'au sacre d'un chef, celui-ci, couvert de poudre d'or, se jetait dans la lagune de Guatavita depuis un radeau chargé d'offrandes. De ce rite est née la légende de l'Eldorado, une cité d'or que les conquérants ont cherchée en vain."},
   {id:"ulugh", fam:"asi", nom:"L'observatoire de Samarcande", lon:66.99, lat:39.67, lieu:"Samarcande", de:1420, a:1449, st:"doc",
    x:"Ulugh Beg, petit-fils de Tamerlan et prince astronome, fait bâtir vers 1420 un observatoire géant. Ses tables recensent plus d'un millier d'étoiles, avec une précision inégalée avant Tycho Brahe. L'astrologie y est inséparable de l'astronomie : on calcule le ciel pour le connaître et pour le lire. Le prince est assassiné en 1449.", l:["astro"]},
   {id:"cargo", fam:"pre", nom:"Les mouvements du cargo", lon:169.45, lat:-19.52, lieu:"Île de Tanna (Vanuatu)", de:1940, st:"doc", n:"mod",
    x:"En Mélanésie, l'arrivée des Européens puis des soldats américains, avec leurs cargaisons, a fait naître des mouvements religieux attendant le retour d'un messager et de ses richesses. Sur l'île de Tanna, celui de John Frum célèbre chaque année son fondateur. Le mot « culte du cargo », forgé par des observateurs, simplifie des mouvements qui parlaient aussi de dignité et de résistance aux missionnaires."}
  ];
  const PLUS = {
   etrusques:{c:"La « discipline étrusque » tenait en trois sortes de livres : ceux des haruspices, sur les entrailles ; ceux de la foudre, qui distinguaient onze sortes d'éclairs selon le dieu qui les lançait et la région du ciel d'où ils partaient ; ceux des rites, pour fonder une ville ou purifier un lieu. Le ciel était divisé en seize régions, chacune habitée par des dieux, et le foie de la victime en était le miroir.",
    f:[["Tagès","légende","un enfant à la sagesse de vieillard, sorti d'un sillon près de Tarquinia, qui aurait dicté la discipline"],["Spurinna","Ier s. av. J.-C.","l'haruspice qui, selon Suétone, mit César en garde contre les ides de mars"],["Claude","empereur, 41-54","historien des Étrusques, il organisa à Rome un collège de soixante haruspices"]],
    t:[["Le foie de Plaisance","bronze, IIe – Ier s. av. J.-C."],["Le Liber linteus, rituel écrit sur une toile réemployée pour une momie","Zagreb"],["Cicéron, De la divination","44 av. J.-C."]],
    r:"En 408, pendant le siège de Rome par Alaric, on fit encore appel à des haruspices. La langue étrusque, elle, se lit sans se comprendre tout à fait. Le mot « haruspice » est resté, et l'idée que le ciel se reporte sur le corps a nourri toute l'astrologie médicale."},
   onmyodo:{c:"Le monde naît de l'alternance du yin et du yang et des cinq agents : bois, feu, terre, métal, eau. Chaque jour, chaque direction, chaque année a sa qualité. L'onmyōji dresse le calendrier, interprète les éclipses et les comètes, indique les directions interdites qu'il faut contourner, et accomplit des rites pour écarter les esprits malfaisants.",
    f:[["Kamo no Yasunori","Xe siècle","maître du calendrier et de la divination"],["Abe no Seimei","921 – 1005","le plus célèbre des onmyōji, devenu un héros de légendes"],["Ashiya Dōman","légende","le rival malheureux de Seimei dans les contes"]],
    t:[["Le Senji ryakketsu, traité de divination attribué à Seimei","Xe – XIe siècle"],["Le sanctuaire de Seimei","Kyōto, fondé en 1007"]],
    r:"Le bureau officiel est supprimé en 1870 par le gouvernement de Meiji. Mais le calendrier des jours fastes et néfastes reste consulté pour les mariages, et l'étoile à cinq branches de Seimei, emblème de son sanctuaire, se retrouve dans les mangas et les films."},
   mudang:{c:"La mudang est choisie par les esprits, souvent après une maladie que rien ne guérit, puis initiée par une aînée. Lors des cérémonies, les gut, elle chante, danse et prête sa voix aux ancêtres et aux divinités pour apaiser un mort, protéger une maison ou soigner une affliction. Arcanes n'en décrit pas le détail.",
    f:[["Dangun","légende","le fondateur mythique de la Corée, fils d'un dieu du ciel, que certains tiennent pour le premier chamane"]],
    t:[["Les chants narratifs des cérémonies, transmis oralement","toujours vivants"]],
    r:"Plusieurs cérémonies sont aujourd'hui classées au patrimoine national sud-coréen. Les mudang exercent dans les villes comme à la campagne, et des cinéastes coréens en ont fait des personnages de premier plan."},
   tengri:{c:"Le Ciel est le père, la Terre la mère. Les montagnes, les sources et les arbres ont leurs esprits. Le chamane, homme ou femme, voyage en esprit pour retrouver une âme égarée ou obtenir une guérison. Les tas de pierres des cols, les ovoo, reçoivent des pierres, des rubans bleus et du lait.",
    f:[["Gengis Khan","vers 1162 – 1227","il se disait investi par « l'éternel Ciel bleu »"],["Teb Tengri","XIIe – XIIIe siècle","le chamane qui proclama Gengis Khan, puis fut exécuté sur son ordre"]],
    t:[["L'Histoire secrète des Mongols","XIIIe siècle"],["Les inscriptions de l'Orkhon","VIIIe siècle, Mongolie"]],
    r:"Depuis la fin de l'Union soviétique, un « tengrisme » renaît au Kazakhstan, au Kirghizstan et en Mongolie, en partie comme affirmation nationale : c'est une lecture moderne. Les ovoo, eux, n'ont jamais cessé d'être honorés."},
   tombouctou:{c:"La ville vit du commerce transsaharien et de ses mosquées savantes. Les lettrés y enseignent la grammaire, le droit et la théologie, mais aussi le calcul des heures de prière, l'astronomie et des sciences plus secrètes : la géomancie venue du monde arabe, l'astrologie, et la science des lettres et des carrés magiques qui sert à composer des amulettes.",
    f:[["Ahmad Baba","1556 – 1627","le plus grand savant de la ville, déporté au Maroc après la conquête de 1591"],["Abdel Kader Haïdara","né en 1964","le bibliothécaire qui organisa le sauvetage des manuscrits en 2012"]],
    t:[["Les manuscrits de Tombouctou","XIIIe – XXe siècle"],["La mosquée de Sankoré","XVe siècle"]],
    r:"Plusieurs milliers de manuscrits ont été brûlés pendant l'occupation de 2012-2013. La plupart ont été sauvés, et se trouvent à Bamako, où l'on travaille à les restaurer et à les numériser."},
   muisca:{c:"Les Muiscas tenaient les lagunes pour des lieux sacrés, portes vers le monde des divinités. On y jetait de l'or, des émeraudes et de petites figures. Pour eux, l'or n'était pas une richesse à accumuler, mais une matière qui portait l'énergie du soleil.",
    f:[["Juan Rodríguez Freyle","1566 – 1642","le chroniqueur qui raconta en 1636 le sacre du chef doré"],["Antonio de Sepúlveda","XVIe siècle","le marchand qui tenta de vider la lagune vers 1580"]],
    t:[["El Carnero, de Rodríguez Freyle","1636"],["Le radeau muisca en or","retrouvé en 1969 à Pasca"]],
    r:"Le radeau d'or, qui montre un chef entouré de sa suite, est la pièce maîtresse du musée de l'Or de Bogotá. Les descendants des Muiscas vivent toujours dans la région. L'Eldorado, lui, a quitté la Colombie pour devenir un nom commun."},
   ulugh:{c:"Pour les savants de la cour timouride, mesurer le ciel et l'interpréter vont ensemble. L'observatoire abritait un immense arc de méridien creusé dans la colline, qui permettait de mesurer la hauteur du Soleil et des étoiles avec une précision extraordinaire. Les tables qu'on en tira servirent aux astronomes et aux astrologues de l'Inde à l'Europe.",
    f:[["Ulugh Beg","1394 – 1449","prince astronome, gouverneur de Samarcande"],["Ghiyath al-Din al-Kashi","vers 1380 – 1429","mathématicien, il calcula le nombre pi avec seize décimales"],["Ali Qushji","1403 – 1474","il emporta les tables à Istanbul"]],
    t:[["Le Zij-i Sultani, tables astronomiques","vers 1437"],["Le thème de naissance du prince Iskandar","Chiraz, 1411"]],
    r:"L'observatoire est détruit après la mort du prince. Un archéologue russe en retrouve les fondations en 1908. L'arc du méridien se visite à Samarcande, en Ouzbékistan."},
   cargo:{c:"Les mouvements mélanésiens réinterprètent un monde bouleversé : pourquoi les Blancs reçoivent-ils tant de marchandises sans les fabriquer ? Certains prophètes annoncent qu'elles reviendront aux ancêtres et aux vivants. On imite parfois les gestes des étrangers, pistes et défilés, comme des rites. Mais ces mouvements ont aussi servi à refuser les missions et à défendre la coutume.",
    f:[["John Frum","années 1930-1940","le messager, réel ou imaginé, dont se réclame le mouvement de Tanna"]],
    t:[["Le jour de John Frum","célébré chaque 15 février"]],
    r:"Le mouvement John Frum existe toujours et a même eu son parti politique au Vanuatu. Les anthropologues emploient aujourd'hui l'expression « culte du cargo » avec précaution, car elle a longtemps servi à se moquer."}
  };
  NEW.forEach(t => { if(!D.TR.find(x => x.id === t.id)) D.TR.push(t); });
  Object.assign(PL, PLUS);
  const L = window.GLOBE_LIENS; if(L && L.L) L.L.push(
    ["tao","onmyodo","Le yin et le yang, les cinq agents, le calendrier","doc"],
    ["yijing","onmyodo","La divination par les signes","doc"],
    ["r_astro","ulugh","L'astrologie et l'astronomie des savants de langue arabe et persane","doc"],
    ["soufisme","tombouctou","Les confréries et la science des lettres","trad"],
    ["r_geomancie","tombouctou","La géomancie arabe, de part et d'autre du Sahara","trad"],
    ["tengri","siberie","Les chamanes des steppes et ceux de la taïga","trad"],
    ["etrusques","r_astro","Le ciel découpé en régions, reporté sur le corps","trad"]);
})();
