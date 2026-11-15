/* ===== Arcanes · Le globe des traditions : les données =====
   Traditions spirituelles et ésotériques, événements, symboles, parcours.
   Étiquettes : doc (Documenté), trad (Tradition), mod (Lecture moderne), leg (Légende).
   Les traditions vivantes sont présentées comme des religions et des cultures, sans reproduire leurs objets sacrés. */
window.GLOBE_DATA = (() => {
  const FAM = {
    anc:{nom:"Mondes anciens", hex:"#a5432a"},
    mys:{nom:"Voies mystiques", hex:"#2f4f8f"},
    asi:{nom:"Asie", hex:"#2c6a5c"},
    ame:{nom:"Amériques", hex:"#b0622a"},
    afr:{nom:"Afrique", hex:"#6a3d6f"},
    pre:{nom:"Chamanismes et peuples premiers", hex:"#3f6f8a"},
    eso:{nom:"Ésotérisme occidental", hex:"#8a6620"},
    art:{nom:"Les routes des arts", hex:"#2a2420"}
  };
  /* T(id, famille, nom, lon, lat, lieu, début, fin|null, étiquette, texte, {r:route, s:symboles, l:liens Arcanes, v:vivante, n:note}) */
  const TR = [];
  const T = (id, fam, nom, lon, lat, lieu, de, a, st, x, o = {}) => TR.push(Object.assign({id, fam, nom, lon, lat, lieu, de, a, st, x}, o));

  /* ---------- Mondes anciens ---------- */
  T("egypte","anc","La religion de l'Égypte ancienne",32.64,25.70,"Thèbes (Louxor)",-3000,400,"doc",
    "Pendant plus de trois mille ans : des temples, des rites pour les morts et des dieux à tête d'animal. Les Grecs y ont vu la source de toute sagesse, et les occultistes après eux. C'est en grande partie un rêve, mais l'ankh, l'œil oudjat et l'ouroboros en viennent bel et bien.",
    {s:["ankh","oudjat","ouroboros","aton"]});
  T("isis","anc","Les mystères d'Isis",32.88,24.02,"Philae",-300,537,"doc",
    "La déesse égyptienne devient, à l'époque grecque, le centre d'un culte à initiation qui gagne tout l'Empire romain. On promettait aux initiés une vie après la mort. Son dernier temple, à Philae, est fermé sous Justinien.",
    {r:[[29.92,31.2,"Alexandrie","vers −300","Le culte prend sa forme grecque."],[25.27,37.4,"Délos","vers −200","Les marchands le portent dans les ports."],[14.49,40.75,"Pompéi","IIe s. av. J.-C.","Un temple d'Isis, retrouvé presque intact."],[12.48,41.9,"Rome","Ier siècle","Un grand sanctuaire au Champ de Mars."],[-0.09,51.51,"Londres","Ier siècle","Une cruche gravée mentionne un temple d'Isis."],[32.88,24.02,"Philae","vers 537","Le dernier temple est fermé."]]});
  T("babylone","anc","L'astrologie babylonienne",44.42,32.54,"Babylone",-1800,-100,"doc",
    "Les scribes de Mésopotamie notent les présages du ciel sur des tablettes d'argile pendant plus de mille ans. Ils inventent le zodiaque de douze signes vers le Ve siècle avant notre ère. Les Grecs et les Romains les appelaient les « Chaldéens ».",
    {s:["ishtar"], l:["astro"]});
  T("eleusis","anc","Les mystères d'Éleusis",23.54,38.04,"Éleusis",-600,392,"doc",
    "Chaque automne, des milliers d'initiés marchaient d'Athènes à Éleusis pour une cérémonie nocturne autour de Déméter et de Perséphone. Il était interdit d'en parler sous peine de mort. Le secret a été si bien gardé qu'on ignore toujours ce qu'on y voyait.");
  T("delphes","anc","L'oracle de Delphes",22.5,38.48,"Delphes",-800,393,"doc",
    "Une prêtresse, la Pythie, rendait les réponses d'Apollon aux cités et aux rois. Sur le temple, on lisait : « Connais-toi toi-même. » Les vapeurs qui l'auraient mise en transe sont une explication tardive, encore discutée.");
  T("pythagore","anc","Les pythagoriciens",17.12,39.08,"Crotone",-530,-350,"trad",
    "Pythagore fonde en Italie du Sud une communauté à la fois savante et religieuse : le nombre est le secret du monde, l'âme passe d'un corps à l'autre. On ne sait presque rien de sûr sur lui. Ses disciples vénéraient une figure de dix points, la tétraktys.",
    {s:["tetraktys"]});
  T("zoroastre","anc","Le zoroastrisme",54.37,31.9,"Yazd",-1200,null,"doc",
    "La religion de l'Iran ancien, fondée sur l'enseignement de Zarathoustra : un dieu de sagesse, et le choix à faire entre le bien et le mal. Ses prêtres s'appelaient les mages, d'où vient notre mot « magie ». Elle est toujours vivante, en Iran et chez les Parsis de l'Inde.",
    {v:1, r:[[52.89,29.93,"Persépolis","vers −500","La religion des rois perses."],[44.58,33.09,"Ctésiphon","224","Religion d'État de l'empire sassanide."],[72.82,20.2,"Sanjan (Gujarat)","vers 900","Des fidèles s'installent en Inde : les Parsis."],[72.88,19.08,"Bombay","XVIIIe siècle","Le grand centre parsi."]]});
  T("mithra","anc","Les mystères de Mithra",12.49,41.89,"Rome",80,400,"doc",
    "Un culte à initiation réservé aux hommes, célébré dans de petites grottes artificielles, très répandu chez les soldats romains. Il porte le nom d'un dieu perse, mais son lien réel avec la Perse est discuté. On en a retrouvé des sanctuaires de l'Écosse à la Syrie.",
    {r:[[12.49,41.89,"Rome","Ier siècle","Les premiers sanctuaires."],[12.29,41.76,"Ostie","IIe siècle","Une quinzaine de sanctuaires dans le port."],[16.86,48.11,"Carnuntum","IIe siècle","Sur la frontière du Danube."],[-2.22,55.03,"Mur d'Hadrien","IIIe siècle","Jusqu'au nord de la Bretagne."],[40.73,34.75,"Doura-Europos","IIIe siècle","Un sanctuaire peint, sur l'Euphrate."],[-0.09,51.51,"Londres","vers 240","Le temple retrouvé sous la City."]]});
  T("hermetisme","anc","L'hermétisme",29.92,31.2,"Alexandrie",100,300,"doc",
    "Des textes grecs écrits en Égypte sous le nom d'Hermès Trismégiste : l'homme peut connaître Dieu en connaissant le monde et lui-même. La Renaissance les croira plus vieux que Moïse. En 1614, le savant Isaac Casaubon montre qu'ils datent des premiers siècles de notre ère.",
    {s:["caducee","ouroboros"], l:["magie","alchimie"], r:[[29.92,31.2,"Alexandrie","Ier – IIIe s.","Les traités sont rédigés en grec."],[39.03,36.86,"Harran","IXe siècle","Des savants se réclament encore d'Hermès."],[44.36,33.31,"Bagdad","IXe siècle","La Table d'émeraude apparaît en arabe."],[11.25,43.77,"Florence","1463","Marsile Ficin traduit le Corpus hermeticum."],[-0.1,51.51,"Londres","1614","Casaubon date les textes : ils ne sont pas égyptiens."]]});
  T("gnose","anc","Les gnostiques",32.27,26.05,"Nag Hammadi",100,400,"doc",
    "Des courants chrétiens des premiers siècles pour qui le monde est l'œuvre d'un dieu inférieur, et le salut une connaissance (gnôsis) qui réveille l'étincelle divine en nous. On ne les connaissait que par leurs adversaires, jusqu'à la découverte de leurs livres en 1945.");
  T("neoplat","anc","Le néoplatonisme et la théurgie",36.4,35.42,"Apamée",250,529,"doc",
    "À partir de Plotin, des philosophes font de Platon une voie de remontée vers l'Un. Jamblique y ajoute la théurgie : des rites qui font agir les dieux. Toute la magie savante de la Renaissance en découle.",
    {l:["magie"]});
  T("druides","anc","Les druides",-4.4,53.27,"Île de Mona (Anglesey)",-300,100,"doc",
    "Les prêtres, juges et savants des Celtes. Ils n'écrivaient pas leur enseignement : nous les connaissons surtout par César et les auteurs romains, leurs ennemis. Le néodruidisme naît à Londres en 1792, en partie à partir de textes forgés par son fondateur.",
    {s:["triskele"]});
  T("nordique","anc","La religion nordique",17.63,59.9,"Uppsala",200,1100,"doc",
    "Odin, Thor, Freyja, et une magie de voyantes appelée seiðr. Presque tout ce qu'on en sait a été mis par écrit en Islande, par des chrétiens, deux siècles après la conversion. Une religion qui s'en inspire, l'Ásatrú, est reconnue en Islande depuis 1973.",
    {s:["runes"]});

  /* ---------- Voies mystiques ---------- */
  T("kabbale","mys","La kabbale",2.82,41.98,"Gérone",1150,null,"doc",
    "La mystique juive : Dieu se déploie en dix émanations, les sephiroth, et chaque lettre de la Torah cache un sens. Elle naît en Provence et en Catalogne au XIIe siècle, et non au temps de Moïse comme le dit la tradition. Des chrétiens, puis des occultistes, en tireront leur propre version.",
    {v:1, s:["arbre"], l:["magie","tarot"], r:[[4.28,43.69,"Posquières (Vauvert)","vers 1180","Isaac l'Aveugle, premier kabbaliste connu."],[2.82,41.98,"Gérone","XIIIe siècle","Une école entière de kabbalistes."],[-3.17,40.63,"Guadalajara","vers 1280","Moïse de León fait circuler le Zohar."],[11.25,43.77,"Florence","1486","Pic de la Mirandole invente la kabbale chrétienne."],[35.5,32.96,"Safed","vers 1570","Isaac Louria renouvelle tout."],[27.41,49.44,"Medjybij","vers 1740","Le Baal Shem Tov fonde le hassidisme."]]});
  T("soufisme","mys","Le soufisme",47.78,30.51,"Bassora",750,null,"doc",
    "La voie mystique de l'islam : chercher Dieu par l'amour, le souvenir répété de son nom, la musique parfois, sous la conduite d'un maître. Ses confréries ont porté l'islam de l'Afrique de l'Ouest à l'Indonésie.",
    {v:1, r:[[47.78,30.51,"Bassora","VIIIe siècle","Rabia chante l'amour de Dieu pour lui-même."],[44.36,33.31,"Bagdad","Xe siècle","L'école de Junayd."],[32.48,37.87,"Konya","1273","Mort de Rûmî. Ses disciples : les derviches tourneurs."],[74.63,26.45,"Ajmer","XIIIe siècle","La confrérie Chishti s'enracine en Inde."],[-3.0,16.77,"Tombouctou","XVe siècle","Ville de saints et de lettrés."],[-15.88,14.87,"Touba","1887","Ville sainte des mourides du Sénégal."]]});
  T("desert","mys","Les Pères du désert",30.35,30.32,"Désert de Scété",270,500,"doc",
    "Des hommes et des femmes quittent les villes d'Égypte pour vivre seuls dans le désert, prier et lutter contre leurs pensées. Leurs paroles courtes ont été recueillies. Tout le monachisme chrétien vient d'eux.");
  T("athos","mys","L'hésychasme du mont Athos",24.33,40.16,"Mont Athos",963,null,"doc",
    "Une presqu'île de monastères orthodoxes. Les moines y pratiquent la « prière du cœur » : une courte invocation répétée au rythme du souffle, pour atteindre le silence intérieur, l'hésychia.", {v:1});
  T("rhenans","mys","Les mystiques rhénans",6.97,50.95,"Cologne",1150,1400,"doc",
    "Le long du Rhin, Hildegarde de Bingen note ses visions, puis Maître Eckhart prêche en allemand que Dieu naît au fond de l'âme. Plusieurs de ses phrases sont condamnées par le pape en 1329. Les béguines, des femmes sans couvent, vivent la même recherche.");
  T("manicheisme","mys","Le manichéisme",44.58,33.09,"Ctésiphon",240,1400,"doc",
    "Le prophète Mani enseigne en Mésopotamie le combat de la Lumière et des Ténèbres, et se présente comme le successeur de Zoroastre, du Bouddha et de Jésus. Sa religion va de l'Afrique du Nord à la Chine, où elle s'éteint au XIVe siècle. Il n'en reste aucun fidèle.",
    {r:[[44.58,33.09,"Ctésiphon","240","Mani commence à prêcher."],[10.32,36.85,"Carthage","373","Le jeune Augustin est manichéen pendant neuf ans."],[66.97,39.65,"Samarcande","VIIe siècle","Les marchands sogdiens la portent sur la route de la soie."],[89.19,42.95,"Tourfan","IXe siècle","Religion du royaume ouïghour de Qocho."],[118.59,24.91,"Quanzhou","XIVe siècle","Le dernier temple connu."]]});
  T("cathares","mys","Bogomiles et cathares",1.83,42.88,"Montségur",950,1321,"doc",
    "Des chrétiens pour qui le monde matériel est l'œuvre du mal. Leurs « bons hommes » et « bonnes femmes » vivent pauvres et refusent toute violence. Le mouvement vient des Balkans. L'Église lance contre lui une croisade, puis l'Inquisition.",
    {r:[[26.81,43.16,"Preslav","vers 950","Le prêtre Bogomil prêche en Bulgarie."],[28.98,41.01,"Constantinople","XIe siècle","Des bogomiles dans la capitale."],[9.33,45.59,"Concorezzo","XIIe siècle","Une Église cathare en Lombardie."],[1.44,43.6,"Toulouse","vers 1170","Le Languedoc devient leur terre."],[1.83,42.88,"Montségur","1244","Le dernier grand refuge tombe."]]});
  T("templiers","mys","Les Templiers",35.235,31.778,"Jérusalem",1120,1312,"doc",
    "Un ordre de moines soldats, fondé pour protéger les pèlerins, devenu très riche. Le roi de France le fait arrêter en 1307 sous des accusations d'hérésie obtenues par la torture. Le trésor caché, le Graal et la survie secrète de l'ordre sont des légendes nées bien plus tard.",
    {s:["croixpattee"], r:[[35.235,31.778,"Jérusalem","1120","Fondation, sur l'esplanade du Temple."],[4.07,48.3,"Troyes","1129","Un concile reconnaît l'ordre."],[2.36,48.86,"Paris","1307","Arrestation de tous les Templiers de France."],[4.87,45.52,"Vienne","1312","Le pape dissout l'ordre."],[-8.41,39.6,"Tomar","1319","Au Portugal, l'ordre continue sous un autre nom."]]});

  /* ---------- Asie ---------- */
  T("veda","asi","Le Véda et l'hindouisme",83.0,25.32,"Varanasi (Bénarès)",-1500,null,"doc",
    "Les hymnes du Véda, transmis par cœur pendant des siècles, sont le socle d'une immense famille de traditions : dieux innombrables, cycle des renaissances, quête de la délivrance. Varanasi, sur le Gange, en est la ville la plus sainte.",
    {v:1, s:["lotus"]});
  T("yoga","asi","Le yoga et le tantra",91.71,26.17,"Kamakhya (Assam)",400,null,"doc",
    "Le yoga est d'abord une discipline de l'esprit, décrite dans les Yoga-sûtra. Le tantra, à partir du VIe siècle, ajoute des rites, des mantras et un travail sur l'énergie du corps. Le « tantra » vendu en Occident comme un art amoureux est une invention du XXe siècle.",
    {v:1, n:"mod"});
  T("bouddhisme","asi","Le bouddhisme",84.99,24.7,"Bodh Gaya",-450,null,"doc",
    "Un prince du nord de l'Inde s'éveille sous un arbre et enseigne comment sortir de la souffrance. En quelques siècles, sa voie gagne toute l'Asie, en changeant de visage à chaque étape : moines de forêt au Sri Lanka, zen au Japon, lamas au Tibet.",
    {v:1, s:["roue","lotus"], r:[[84.99,24.7,"Bodh Gaya","Ve s. av. J.-C.","L'Éveil du Bouddha."],[83.02,25.38,"Sarnath","Ve s. av. J.-C.","Le premier sermon."],[80.4,8.35,"Anuradhapura","vers −250","Arrivée au Sri Lanka."],[72.8,33.75,"Taxila (Gandhara)","Ier siècle","Les premières statues du Bouddha."],[112.45,34.62,"Luoyang","Ier siècle","Entrée en Chine par la route de la soie."],[135.84,34.69,"Nara","VIe siècle","Arrivée au Japon par la Corée."],[91.5,29.33,"Samyé","vers 779","Premier monastère du Tibet."],[110.2,-7.61,"Borobudur","vers 800","Le plus grand monument bouddhique, à Java."]]});
  T("zen","asi","Le chan et le zen",112.94,34.51,"Shaolin",500,null,"trad",
    "Une école bouddhique de Chine qui met tout dans la méditation assise et dans le face-à-face avec un maître. La tradition la fait remonter au moine indien Bodhidharma : c'est une légende pieuse. Elle passe au Japon au XIIe siècle sous le nom de zen.",
    {v:1, r:[[112.94,34.51,"Shaolin","vers 500","Bodhidharma, selon la tradition."],[113.6,24.65,"Caoxi","VIIe siècle","Huineng, le sixième patriarche."],[135.77,35.0,"Kyoto","1202","Eisai fonde le premier temple zen."],[136.36,36.05,"Eihei-ji","1244","Dôgen fonde l'école Sôtô."]]});
  T("tao","asi","Le taoïsme",108.32,34.06,"Louguantai",-400,null,"doc",
    "Suivre la Voie, le Tao, qui agit sans forcer. À côté des sages comme Laozi, dont l'existence est incertaine, le taoïsme est une religion avec ses prêtres, ses dieux, et une alchimie intérieure qui cherche la longue vie par le souffle.",
    {v:1, s:["taijitu","bagua"], l:["alchimie"]});
  T("yijing","asi","Le Yi Jing",114.35,36.1,"Anyang",-1000,null,"doc",
    "Le Livre des changements : soixante-quatre figures de six traits, pleins ou brisés, qu'on tire pour éclairer une situation. Il prolonge une divination bien plus ancienne, sur os et carapaces de tortue, pratiquée à Anyang vers −1200.",
    {v:1, s:["bagua"]});
  T("shinto","asi","Le shintô",136.73,34.46,"Ise",300,null,"doc",
    "La « voie des dieux » du Japon : les kami habitent les montagnes, les arbres, les sources et les ancêtres. Pas de fondateur, pas de livre révélé, mais des sanctuaires et des fêtes. Celui d'Ise est reconstruit à l'identique tous les vingt ans depuis 690.",
    {v:1, s:["torii"], dt:"Origines anciennes"});
  T("bon","asi","Le bön et le Tibet",81.31,31.07,"Mont Kailash",600,null,"doc",
    "Le bön se présente comme la religion du Tibet d'avant le bouddhisme. Tel qu'on le connaît, il s'est formé en même temps que le bouddhisme tibétain, avec lequel il partage presque tout. Le mont Kailash est sacré pour quatre religions à la fois.", {v:1});
  T("jain","asi","Le jaïnisme",76.48,12.86,"Shravanabelagola",-500,null,"doc",
    "Une religion de l'Inde contemporaine du Bouddha, fondée sur la non-violence absolue envers tout être vivant. Ses moines balaient le sol devant eux pour n'écraser aucun insecte.", {v:1});
  T("sikh","asi","Le sikhisme",74.88,31.62,"Amritsar",1499,null,"doc",
    "Au Pendjab, Guru Nanak enseigne un Dieu unique, sans image, au-delà de l'hindouisme et de l'islam. Après dix maîtres, c'est le livre saint lui-même qui devient le guru. Au Temple d'or, un repas est offert chaque jour à qui se présente.", {v:1});
  T("cao","asi","Le caodaïsme",106.13,11.3,"Tây Ninh",1926,null,"doc",
    "Une religion née au Vietnam de séances de spiritisme, qui réunit Bouddha, Jésus, Confucius et Laozi sous un Dieu représenté par un œil. Elle compte Victor Hugo parmi ses saints.", {v:1, s:["delta"]});

  /* ---------- Amériques ---------- */
  T("maya","ame","Les Mayas",-89.62,17.22,"Tikal",-300,null,"doc",
    "Des cités, une écriture, et des calendriers d'une précision remarquable. En 1562, un évêque espagnol fait brûler leurs livres : il en reste quatre. La « fin du monde de 2012 » n'a jamais été une prophétie maya. Plusieurs millions de Mayas vivent aujourd'hui au Guatemala et au Mexique.",
    {v:1, s:["maya"], dt:"Depuis plus de deux mille ans"});
  T("azteque","ame","Les Mexicas (Aztèques)",-99.13,19.43,"Mexico-Tenochtitlan",1325,1521,"doc",
    "Une ville sur un lac, fondée selon la légende là où un aigle se posa sur un cactus. Une religion du Soleil qu'il faut nourrir, un calendrier divinatoire de 260 jours. Les Espagnols détruisent la ville en 1521 et bâtissent Mexico sur ses ruines.");
  T("inca","ame","Les Incas et les Andes",-71.97,-13.52,"Cuzco",1200,null,"doc",
    "L'empire du Soleil, dont Cuzco était le « nombril ». Les montagnes, les sources et les rochers y sont des présences sacrées, les huacas. Le culte de la Pachamama, la Terre mère, est toujours vivant dans les Andes.", {v:1, dt:"De l'empire inca à aujourd'hui"});
  T("lakota","ame","Les Lakota",-103.75,43.88,"Paha Sapa (Black Hills)",1700,null,"doc",
    "Pour les Lakota, les Black Hills sont le cœur du monde. Leurs cérémonies, dont la Danse du Soleil, ont été interdites par le gouvernement des États-Unis de 1883 à 1934. Elles appartiennent à la nation lakota : Arcanes n'en décrit pas le déroulement.",
    {v:1, n:"sacre", dt:"Tradition vivante"});
  T("hopi","ame","Les Hopi",-110.53,35.87,"Oraibi",1100,null,"doc",
    "Oraibi est l'un des plus anciens villages habités sans interruption en Amérique du Nord. L'année hopi est rythmée par les katsinam, des esprits qui séjournent parmi les vivants une partie de l'année. Les cérémonies ne se photographient pas.",
    {v:1, n:"sacre", dt:"Tradition vivante"});
  T("dine","ame","Les Diné (Navajo)",-109.47,36.13,"Canyon de Chelly",1500,null,"doc",
    "Au centre de la pensée diné, un mot : hózhó, l'harmonie, la beauté, l'équilibre qu'il faut sans cesse rétablir. Les cérémonies de guérison durent plusieurs nuits. Les peintures de sable qui les accompagnent sont effacées avant l'aube : on ne les reproduit pas ici.",
    {v:1, n:"sacre", dt:"Tradition vivante"});
  T("haudeno","ame","Les Haudenosaunee (Iroquois)",-76.13,42.95,"Onondaga",1450,null,"doc",
    "Cinq nations, puis six, unies par la Grande Loi de la Paix, apportée selon la tradition par le Pacificateur. Sa date est discutée, entre le XIIe et le XVe siècle. En 1799, le prophète Handsome Lake fonde la religion de la Longue Maison.", {v:1, dt:"Tradition vivante"});
  T("ghost","ame","La Danse des Esprits",-118.77,38.95,"Walker River (Nevada)",1889,1890,"doc",
    "Pendant une éclipse, le Païute Wovoka reçoit une vision : si les peuples dansent et vivent en paix, les morts reviendront et les bisons aussi. Le mouvement gagne les plaines en quelques mois. L'armée y voit une révolte.",
    {r:[[-118.77,38.95,"Walker River","1889","La vision de Wovoka."],[-102.55,43.03,"Pine Ridge","1890","Les Lakota adoptent la danse."],[-102.36,43.14,"Wounded Knee","29 déc. 1890","L'armée tue près de trois cents Lakota."]]});
  T("vaudou","ame","Le vaudou haïtien",-72.34,18.55,"Port-au-Prince",1700,null,"doc",
    "Une religion née de la rencontre, dans l'esclavage, des cultes d'Afrique de l'Ouest et du catholicisme. On y sert les lwa, des esprits qui viennent danser dans le corps des fidèles. Les poupées à épingles sont une invention du cinéma. Haïti l'a reconnu comme religion en 2003.",
    {v:1, r:[[2.09,6.36,"Ouidah","XVIIe siècle","Le vodun du golfe du Bénin."],[-72.34,18.55,"Saint-Domingue","XVIIIe siècle","Les cultes se mêlent dans les plantations."],[-72.24,19.72,"Bois-Caïman","1791","Une cérémonie précède la révolte des esclaves."],[-90.07,29.95,"La Nouvelle-Orléans","1809","Des réfugiés y apportent leurs rites."]]});
  T("candomble","ame","Candomblé et santería",-38.5,-12.97,"Salvador de Bahia",1800,null,"doc",
    "Au Brésil et à Cuba, les Africains déportés ont continué de servir leurs dieux, les orixás, en les abritant derrière des saints catholiques. Chaque divinité a ses couleurs, ses rythmes de tambour et ses nourritures.",
    {v:1, r:[[4.56,7.48,"Ilé-Ifè","avant 1500","Le pays yoruba."],[-38.5,-12.97,"Salvador de Bahia","vers 1830","Le premier grand terreiro."],[-82.38,23.13,"La Havane","XIXe siècle","La santería, sœur cubaine."]]});

  /* ---------- Afrique ---------- */
  T("ifa","afr","Ifá",4.56,7.48,"Ilé-Ifè",1300,null,"doc",
    "Le système de divination des Yoruba. Le devin, le babalawo, jette une chaîne ou des noix de palme et obtient l'un des 256 signes, auxquels sont attachés des milliers de poèmes appris par cœur. L'UNESCO l'a inscrit au patrimoine de l'humanité.",
    {v:1, l:["magie"], dt:"Tradition vivante"});
  T("vodun","afr","Le vodun",2.09,6.36,"Ouidah",1600,null,"doc",
    "La religion des peuples fon et éwé du Bénin et du Togo, mère du vaudou haïtien. Le monde est habité par des forces, les vodun, liées à la mer, au fer, à la foudre, aux ancêtres. Le Bénin lui consacre une fête nationale chaque 10 janvier.", {v:1, dt:"Tradition vivante"});
  T("ethiopie","afr","L'Éthiopie chrétienne",39.04,12.03,"Lalibela",330,null,"doc",
    "Une des plus anciennes Églises du monde. Sa Bible contient le Livre d'Hénoch, perdu partout ailleurs. À Lalibela, onze églises sont taillées d'un bloc dans la roche. La tradition dit que l'Arche d'Alliance repose à Aksoum : personne ne peut la voir.",
    {v:1, n:"trad"});
  T("dogon","afr","Les Dogon",-3.61,14.35,"Falaise de Bandiagara",1400,null,"doc",
    "Un peuple du Mali, célèbre pour ses masques et ses récits de création, recueillis par l'ethnologue Marcel Griaule. Griaule a écrit que les Dogon connaissaient l'étoile invisible Sirius B. Les chercheurs revenus sur place ne l'ont pas confirmé : l'idée venait sans doute de lui.",
    {v:1, n:"leg", dt:"Tradition vivante"});
  T("akan","afr","Les Akan et les signes adinkra",-1.62,6.69,"Kumasi",1700,null,"doc",
    "Au Ghana, des dizaines de signes imprimés sur les étoffes portent chacun un proverbe ou une idée. Le plus important, trois cercles l'un dans l'autre, désigne la grandeur et l'autorité.", {v:1, s:["adinkra"]});
  T("gnawa","afr","Les Gnawa",-9.77,31.51,"Essaouira",1500,null,"doc",
    "Une confrérie du Maroc, issue de descendants d'esclaves venus du sud du Sahara. Leurs nuits de musique, les lilas, mènent à la transe et visent la guérison. L'UNESCO les a inscrits au patrimoine de l'humanité en 2019.", {v:1});
  T("sikidy","afr","Le sikidy malgache",47.52,-18.91,"Antananarivo",1200,null,"doc",
    "À Madagascar, le devin dispose des graines en colonnes et lit les figures qu'elles forment. C'est un cousin de la géomancie arabe, arrivé par les marchands de l'océan Indien, et la même famille que les seize figures de la géomancie européenne.",
    {v:1, l:["magie"]});
  T("san","afr","Les San",21.73,-18.76,"Tsodilo",-20000,null,"doc",
    "Les collines de Tsodilo, au Botswana, portent plus de quatre mille peintures. Chez les San, des danses de guérison mènent à la transe. Y voir l'origine de tout l'art rupestre est une théorie moderne, discutée.", {v:1, n:"mod", dt:"Depuis des millénaires"});

  /* ---------- Chamanismes et peuples premiers ---------- */
  T("siberie","pre","Le chamanisme sibérien",100.2,64.3,"Pays évenk",0,null,"doc",
    "Le mot « chaman » vient de la langue des Évenks. Avec son tambour, le chaman voyage chez les esprits pour soigner, retrouver une âme égarée ou assurer la chasse. Le régime soviétique a persécuté les chamans dans les années 1930. Appliquer le mot au monde entier est un choix des savants du XXe siècle.",
    {v:1, n:"mod", dt:"Origines très anciennes"});
  T("sames","pre","Les Sames",23.04,69.01,"Kautokeino",0,null,"doc",
    "Le peuple du nord de la Scandinavie. Le noaidi lisait l'avenir et voyageait en esprit au son d'un tambour peint. Aux XVIIe et XVIIIe siècles, les missionnaires confisquent et brûlent ces tambours : il en reste environ soixante-dix.", {v:1, dt:"Origines très anciennes"});
  T("polynesie","pre","La Polynésie : mana et tapu",-151.37,-16.84,"Ra'iatea",1000,null,"doc",
    "Deux mots polynésiens sont passés dans toutes les langues : mana, la force qui habite les êtres et les choses, et tapu, ce qui est sacré et donc interdit, d'où vient « tabou ». Le marae de Taputapuātea était le centre religieux d'un monde d'îles.", {v:1, dt:"Tradition vivante"});
  T("reve","pre","Le Rêve des peuples d'Australie",131.04,-25.34,"Uluru",-40000,null,"doc",
    "Pour les Anangu, Uluru porte les traces des êtres qui ont façonné le monde : c'est la Tjukurpa, à la fois récit, loi et paysage. Beaucoup de ces récits ne sont transmis qu'aux initiés. L'ascension du rocher est fermée depuis 2019, à leur demande.",
    {v:1, n:"sacre", dt:"Depuis des dizaines de millénaires"});

  /* ---------- Ésotérisme occidental ---------- */
  T("ficin","eso","La Renaissance hermétique",11.25,43.77,"Florence",1463,1600,"doc",
    "Cosme de Médicis demande à Marsile Ficin de traduire Hermès avant Platon. Ficin en tire une magie douce, faite de musique, de parfums et d'astres. Son élève Pic de la Mirandole y ajoute la kabbale. L'ésotérisme occidental moderne commence ici.",
    {l:["magie","astro"]});
  T("agrippa","eso","Agrippa et la magie savante",6.95,50.93,"Cologne",1533,1600,"doc",
    "Les trois livres De la philosophie occulte rangent toute la magie en trois mondes : les éléments, le ciel, les esprits. C'est la somme où puiseront tous les magiciens pendant quatre siècles. Les carrés magiques des planètes en viennent.",
    {s:["penta"], l:["magie"]});
  T("dee","eso","John Dee et la magie des anges",-0.26,51.47,"Mortlake",1582,1589,"doc",
    "Mathématicien de la reine Élisabeth, John Dee passe des années à interroger des anges par l'entremise d'un voyant, Edward Kelley. Il en note une langue entière, l'énochien. Ses carnets sont conservés à Londres.",
    {s:["monade"], l:["magie"], r:[[-0.26,51.47,"Mortlake","1582","Premières séances avec Kelley."],[19.94,50.06,"Cracovie","1584","À la cour de Pologne."],[14.42,50.09,"Prague","1584","Devant l'empereur Rodolphe II."],[14.77,49.0,"Třeboň","1586","Trois ans chez un seigneur de Bohême."]]});
  T("rosecroix","eso","Les Rose-Croix",9.48,51.31,"Cassel",1614,null,"leg",
    "En 1614 paraît un manifeste anonyme : une fraternité secrète, fondée par un certain Christian Rosenkreutz, va réformer le monde. Toute l'Europe la cherche. Elle n'a sans doute jamais existé : c'était une fiction d'étudiants luthériens. Mais des ordres bien réels prendront ensuite son nom.",
    {s:["rosecroix"], r:[[9.05,48.52,"Tübingen","vers 1610","Le cercle où le texte est écrit."],[9.48,51.31,"Cassel","1614","Publication de la Fama Fraternitatis."],[2.35,48.86,"Paris","1623","Des affiches annoncent leur arrivée. Panique."],[-0.1,51.51,"Londres","1652","Traduction anglaise des manifestes."],[-75.2,40.03,"Pennsylvanie","1694","Une communauté d'inspiration rosicrucienne."],[-121.89,37.33,"San José","1927","Siège d'un ordre moderne, l'AMORC."]]});
  T("boehme","eso","Jacob Böhme",14.99,51.15,"Görlitz",1612,1700,"doc",
    "Un cordonnier de Silésie voit un jour la lumière se refléter dans un plat d'étain, et croit saisir d'un coup le fond des choses. Il écrit une œuvre obscure et brûlante, où Dieu lui-même naît d'un combat. Hegel le tenait pour le premier philosophe allemand.");
  T("macon","eso","La franc-maçonnerie",-0.1,51.513,"Londres",1717,null,"doc",
    "Des loges de tailleurs de pierre accueillent peu à peu des gentilshommes, puis ne parlent plus de construction qu'en symboles. En 1717, quatre loges de Londres se fédèrent. Sa filiation avec les Templiers ou avec les bâtisseurs du Temple de Salomon est une légende qu'elle se raconte.",
    {v:1, s:["equerre","delta"], r:[[-3.19,55.95,"Édimbourg","1599","Les plus anciens registres de loge."],[-0.1,51.513,"Londres","1717","Fondation de la première Grande Loge."],[2.35,48.86,"Paris","vers 1725","Première loge en France."],[88.36,22.57,"Calcutta","1730","Première loge en Inde."],[-75.16,39.95,"Philadelphie","1731","Benjamin Franklin est initié."],[12.45,41.9,"Rome","1738","Première condamnation par un pape."]]});
  T("martinisme","eso","Le martinisme",-0.58,44.84,"Bordeaux",1765,null,"doc",
    "Martinès de Pasqually fonde un ordre où l'on pratique des rites pour « réintégrer » l'homme dans son état premier. Son secrétaire, Louis-Claude de Saint-Martin, y renonce pour une voie tout intérieure. Papus relance un ordre martiniste à Paris vers 1890.");
  T("swedenborg","eso","Swedenborg",18.07,59.33,"Stockholm",1745,1772,"doc",
    "Ingénieur et savant reconnu, Emanuel Swedenborg affirme à cinquante-six ans qu'il visite le ciel et l'enfer et qu'il converse avec les anges. Il le raconte avec le calme d'un rapport technique. Balzac et Baudelaire l'ont lu de près.");
  T("mesmer","eso","Le magnétisme animal",16.37,48.21,"Vienne",1774,1850,"doc",
    "Le médecin Franz Anton Mesmer croit avoir découvert un fluide universel qu'il fait circuler pour guérir. À Paris, on se presse autour de son baquet. En 1784, une commission royale conclut que tout vient de l'imagination. On en tirera pourtant l'hypnose.");
  T("levi","eso","Le Paris des occultistes",2.345,48.853,"Paris",1856,1914,"doc",
    "Éliphas Lévi impose le mot « occultisme » et fait des vingt-deux lames du tarot la clé des vingt-deux lettres hébraïques. Après lui, Papus, Stanislas de Guaita et Péladan font de Paris la capitale de la magie fin de siècle.",
    {s:["penta"], l:["tarot","magie"]});
  T("spiritisme","eso","Le spiritisme",-77.06,43.06,"Hydesville",1848,null,"doc",
    "Dans une ferme de l'État de New York, deux jeunes sœurs disent communiquer par des coups frappés avec un mort. La mode des tables tournantes traverse l'Atlantique. À Paris, Allan Kardec en fait une doctrine. C'est au Brésil qu'elle compte aujourd'hui le plus de fidèles.",
    {v:1, r:[[-77.06,43.06,"Hydesville","1848","Les sœurs Fox."],[2.35,48.86,"Paris","1857","Allan Kardec publie Le Livre des Esprits."],[-43.17,-22.91,"Rio de Janeiro","1884","Fondation de la Fédération spirite brésilienne."],[-47.93,-19.75,"Uberaba","XXe siècle","Le médium Chico Xavier."]]});
  T("theosophie","eso","La théosophie",-74.0,40.71,"New York",1875,null,"doc",
    "Helena Blavatsky et Henry Olcott fondent une société pour étudier « la sagesse cachée » commune à toutes les religions, et se tournent vers l'Inde. C'est par elle que les mots karma et réincarnation entrent dans le langage courant en Occident. Ses « maîtres » tibétains invisibles n'ont jamais été attestés.",
    {r:[[-74.0,40.71,"New York","1875","Fondation de la Société théosophique."],[80.26,13.01,"Adyar","1882","Le siège s'installe en Inde."],[-0.13,51.52,"Londres","1888","Blavatsky publie La Doctrine secrète."],[7.62,47.49,"Dornach","1913","Rudolf Steiner s'en sépare."],[6.42,52.52,"Ommen","1929","Krishnamurti refuse d'être le nouveau messie."]]});
  T("gd","eso","La Golden Dawn",-0.14,51.52,"Londres",1888,1903,"doc",
    "L'Ordre hermétique de l'Aube dorée ne dure que quinze ans, mais il réunit en un seul système le tarot, l'astrologie, la kabbale, l'alchimie et la magie. Ses fondateurs disaient suivre un manuscrit chiffré venu d'Allemagne : les lettres qui le prouvaient étaient fausses.",
    {s:["rosecroix","arbre","hexa"], l:["magie","tarot"], r:[[-0.14,51.52,"Londres","1888","Le temple Isis-Urania."],[-1.75,53.79,"Bradford","1888","Le temple Horus."],[-3.19,55.95,"Édimbourg","1893","Le temple Amen-Ra."],[2.35,48.86,"Paris","1894","Le temple Ahathoor."]]});
  T("thelema","eso","Thelema",31.24,30.04,"Le Caire",1904,null,"doc",
    "Au Caire, Aleister Crowley écrit en trois jours Le Livre de la Loi, qu'il dit dicté par une voix. Sa formule : « Fais ce que tu voudras », au sens de trouver sa volonté profonde. En Sicile, sa communauté scandalise l'Italie, qui l'expulse en 1923.",
    {r:[[31.24,30.04,"Le Caire","1904","Le Livre de la Loi."],[-0.13,51.51,"Londres","1909","La revue The Equinox."],[14.02,38.04,"Cefalù","1920","L'abbaye de Thélème."]]});
  T("steiner","eso","L'anthroposophie",7.62,47.49,"Dornach",1913,null,"doc",
    "Rudolf Steiner veut une « science de l'esprit » et la décline en tout : des écoles, une agriculture, une médecine, une architecture. Ses écoles Waldorf existent dans le monde entier. Ses idées sur la médecine et sur les « races » sont vivement critiquées.");
  T("gurdjieff","eso","Gurdjieff",2.72,48.41,"Fontainebleau-Avon",1922,1949,"doc",
    "Un maître venu du Caucase enseigne que l'homme dort et qu'il peut s'éveiller par un travail constant sur lui-même, avec des danses qu'il nomme « mouvements ». Les sources orientales secrètes dont il se réclamait n'ont jamais été retrouvées.",
    {s:["ennea"]});
  T("wicca","eso","La wicca",-4.65,54.07,"Île de Man",1954,null,"doc",
    "Gerald Gardner révèle l'existence d'une religion de sorcières qui aurait survécu en secret depuis la préhistoire. Les historiens ont montré qu'il l'avait composée lui-même, à partir de la magie cérémonielle et du folklore. Elle n'en est pas moins devenue une vraie religion.",
    {v:1, s:["penta"], n:"leg"});
  T("newage","eso","Le New Age",-121.64,36.12,"Esalen (Californie)",1962,null,"mod",
    "Sur la côte californienne, un institut mêle psychologie, méditation orientale et thérapies du corps. Avec Findhorn, en Écosse, c'est le berceau d'une spiritualité à la carte : cristaux, channeling, ère du Verseau. Un grand marché plus qu'une doctrine.");

  /* ---------- Les routes des arts d'Arcanes ---------- */
  T("r_astro","art","La route de l'astrologie",44.6,32.4,"De Babylone à Londres",-410,null,"doc",
    "L'astrologie n'est pas née d'un coup. Elle a voyagé pendant deux mille ans, et chaque étape y a ajouté quelque chose : les présages à Babylone, l'horoscope en Égypte grecque, les maisons, puis les calculs arabes.",
    {l:["astro"], r:[[44.42,32.54,"Babylone","−410","Le plus ancien horoscope connu."],[29.92,31.2,"Alexandrie","vers 150","Ptolémée écrit la Tétrabible."],[75.78,23.18,"Ujjain","IIe – VIe s.","L'astrologie grecque rencontre l'Inde."],[44.36,33.31,"Bagdad","762","La ville est fondée à une heure choisie par des astrologues."],[-4.02,39.86,"Tolède","XIIe siècle","Les traités arabes passent en latin."],[-0.1,51.51,"Londres","1647","William Lilly publie L'Astrologie chrétienne."]]});
  T("r_tarot","art","La route du tarot",9.19,45.46,"De Milan à Londres",1440,null,"doc",
    "Le tarot est un jeu de cartes italien du XVe siècle. Pendant trois cents ans, on y joue, et rien d'autre. C'est à Paris, en 1781, qu'on lui invente une origine égyptienne et un usage divinatoire.",
    {l:["tarot"], r:[[9.19,45.46,"Milan","vers 1440","Les tarots peints pour les Visconti."],[11.62,44.84,"Ferrare","1442","Première mention écrite des cartes de « triomphes »."],[4.83,45.76,"Lyon","XVIe siècle","Les cartiers français s'y mettent."],[5.37,43.3,"Marseille","1760","Nicolas Conver grave le modèle le plus célèbre."],[2.35,48.86,"Paris","1781","Court de Gébelin y voit un livre égyptien."],[-0.13,51.51,"Londres","1909","Le tarot Rider-Waite-Smith."]]});
  T("r_alchimie","art","La route de l'alchimie",29.8,31.3,"D'Alexandrie à Paris",300,1789,"doc",
    "D'atelier en atelier, l'alchimie passe du grec à l'arabe, puis au latin, avant de devenir la chimie. La Chine a eu la sienne, tournée vers l'élixir de longue vie.",
    {l:["alchimie"], r:[[29.92,31.2,"Alexandrie","vers 300","Zosime, premier alchimiste connu."],[44.36,33.31,"Bagdad","IXe siècle","Les traités signés Jâbir."],[-4.12,40.95,"Ségovie","1144","Première traduction en latin, en Espagne."],[14.42,50.09,"Prague","vers 1600","La cour de Rodolphe II."],[0.12,52.2,"Cambridge","vers 1680","Newton à son fourneau."],[2.35,48.86,"Paris","1789","Lavoisier fonde la chimie moderne."]]});
  T("r_geomancie","art","La route de la géomancie",31.3,30.0,"Du Caire à Madagascar et à l'Espagne",900,null,"doc",
    "Seize figures de points, tracées d'abord dans le sable. Née dans le monde arabe, la « science du sable » est partie dans trois directions : l'Afrique de l'Ouest, l'océan Indien et l'Europe.",
    {l:["magie"], r:[[31.24,30.04,"Le Caire","vers 900","La science du sable."],[-3.0,16.77,"Tombouctou","XIVe siècle","Elle traverse le Sahara."],[4.56,7.48,"Ilé-Ifè","date discutée","Ifá lui ressemble : parenté ou hasard ?"],[47.52,-18.91,"Madagascar","vers 1200","Le sikidy."],[-1.72,41.9,"Tarazona","XIIe siècle","Hugues de Santalla la traduit en latin."]]});

  /* ---------- les événements : [id, lon, lat, lieu, année, date affichée, titre, étiquette, texte, tradition liée] ---------- */
  const EV = [
    ["aton",30.9,27.65,"Amarna",-1350,"vers −1350","Akhénaton et le dieu unique","doc","Un pharaon ferme les temples et impose le culte du seul disque solaire, Aton. Après sa mort, on efface son nom.","egypte"],
    ["bacch",12.48,41.89,"Rome",-186,"−186","Le scandale des Bacchanales","doc","Le Sénat interdit les fêtes secrètes de Bacchus et fait exécuter des milliers d'initiés. Première grande répression d'un culte à mystères.",null],
    ["serapeum",29.9,31.18,"Alexandrie",391,"391","La destruction du Sérapéum","doc","Des chrétiens détruisent le grand temple de Sérapis. La fin des cultes anciens est en marche.","hermetisme"],
    ["hypatie",29.91,31.2,"Alexandrie",415,"415","Le meurtre d'Hypatie","doc","La philosophe et mathématicienne est tuée par une foule chrétienne. Elle enseignait le néoplatonisme à des élèves de toutes religions.","neoplat"],
    ["athenes",23.73,37.97,"Athènes",529,"529","La fin de l'école d'Athènes","doc","L'empereur Justinien interdit aux païens d'enseigner. L'ampleur réelle de la fermeture est discutée, mais la date est restée un symbole.","neoplat"],
    ["wuzong",108.94,34.26,"Chang'an",845,"845","La grande persécution du bouddhisme","doc","L'empereur Wuzong ferme des milliers de monastères en Chine et renvoie les moines à la vie civile. Le manichéisme est frappé en même temps.","bouddhisme"],
    ["hallaj",44.4,33.34,"Bagdad",922,"922","L'exécution d'al-Hallâj","doc","Le mystique soufi avait dit : « Je suis la Vérité. » Il est condamné et mis à mort après des années de prison.","soufisme"],
    ["beziers",3.22,43.34,"Béziers",1209,"1209","La croisade contre les Albigeois","doc","Le sac de Béziers ouvre vingt ans de guerre dans le Languedoc. « Tuez-les tous, Dieu reconnaîtra les siens » : la phrase n'a sans doute jamais été dite.","cathares"],
    ["montsegur",1.83,42.875,"Montségur",1244,"16 mars 1244","Le bûcher de Montségur","doc","Après dix mois de siège, plus de deux cents cathares refusent d'abjurer et sont brûlés au pied de la montagne.","cathares"],
    ["temp1307",2.362,48.864,"Paris",1307,"13 octobre 1307","L'arrestation des Templiers","doc","Un vendredi 13, à l'aube, tous les Templiers de France sont arrêtés sur ordre de Philippe le Bel.","templiers"],
    ["molay",2.341,48.857,"Paris",1314,"mars 1314","La malédiction de Jacques de Molay","leg","Le dernier grand maître est brûlé sur une île de la Seine. Il aurait maudit le roi et le pape, morts tous deux dans l'année. Le récit apparaît plus tard.","templiers"],
    ["super",4.81,43.95,"Avignon",1326,"1326","Le pape contre les magiciens","doc","Jean XXII assimile l'invocation des démons à une hérésie. La magie savante devient l'affaire de l'Inquisition.",null],
    ["malleus",8.44,49.32,"Spire",1486,"1486","Le Marteau des sorcières","doc","L'inquisiteur Heinrich Kramer publie le manuel qui servira aux chasses aux sorcières. L'imprimerie lui donne une diffusion immense.",null],
    ["alhambra",-3.6,37.18,"Grenade",1492,"1492","L'expulsion des Juifs d'Espagne","doc","Des dizaines de milliers de Juifs quittent l'Espagne. Leurs savants emportent la kabbale autour de la Méditerranée, jusqu'à Safed.","kabbale"],
    ["landa",-89.39,20.39,"Maní",1562,"12 juillet 1562","Le bûcher des livres mayas","doc","L'évêque Diego de Landa fait brûler les manuscrits et les images mayas. Quatre livres seulement ont survécu.","maya"],
    ["bruno",12.472,41.896,"Rome",1600,"17 février 1600","Giordano Bruno est brûlé","doc","Philosophe des mondes infinis et magicien hermétiste, il refuse de se rétracter devant l'Inquisition.","ficin"],
    ["loudun",0.08,47.01,"Loudun",1634,"1634","Les possédées de Loudun","doc","Des religieuses se disent possédées. Le prêtre Urbain Grandier est brûlé pour sorcellerie, au terme d'un procès très politique.",null],
    ["pueblo",-105.6,36.44,"Taos",1680,"1680","La révolte des Pueblos","doc","Les peuples pueblos chassent les Espagnols, qui avaient interdit leurs cérémonies. Ils restent libres douze ans.","hopi"],
    ["poisons",2.36,48.85,"Paris",1680,"1680","L'affaire des Poisons","doc","Empoisonneuses, devineresses et messes noires jusque dans l'entourage de Louis XIV. La Voisin est brûlée en place de Grève.",null],
    ["salem",-70.9,42.52,"Salem",1692,"1692","Les sorcières de Salem","doc","En quelques mois, vingt personnes sont exécutées dans une colonie puritaine. Les juges reconnaîtront leur erreur.",null],
    ["nilsson",17.89,66.05,"Arjeplog",1693,"1693","L'exécution de Lars Nilsson","doc","Un Same est brûlé avec son tambour pour avoir pratiqué les rites de son peuple.","sames"],
    ["loge1717",-0.099,51.514,"Londres",1717,"24 juin 1717","La première Grande Loge","doc","Quatre loges se réunissent dans une taverne près de Saint-Paul. La franc-maçonnerie moderne commence.","macon"],
    ["eminenti",12.45,41.9,"Rome",1738,"1738","Le pape condamne les francs-maçons","doc","Première d'une longue série de condamnations : le secret et le serment inquiètent l'Église.","macon"],
    ["gebelin",2.34,48.86,"Paris",1781,"1781","Le tarot devient égyptien","leg","Antoine Court de Gébelin affirme que le tarot est un livre des prêtres d'Égypte. Aucune preuve, mais toute la cartomancie en sort.","r_tarot"],
    ["cagliostro",12.47,41.9,"Rome",1789,"1789","L'arrestation de Cagliostro","doc","Le guérisseur et fondateur d'une maçonnerie « égyptienne » est arrêté par l'Inquisition. Il meurt en prison six ans plus tard.","macon"],
    ["caiman",-72.24,19.72,"Bois-Caïman",1791,"14 août 1791","La cérémonie du Bois-Caïman","trad","Une cérémonie vaudou aurait scellé le serment des esclaves révoltés. Les détails viennent de récits tardifs, mais la révolte, elle, est bien réelle.","vaudou"],
    ["kapu",-155.99,19.64,"Hawaï",1819,"1819","La fin des tabous à Hawaï","doc","Le roi mange publiquement avec les femmes de sa cour : le système des interdits sacrés, le kapu, est aboli.","polynesie"],
    ["fox",-77.06,43.062,"Hydesville",1848,"31 mars 1848","Les coups frappés d'Hydesville","doc","Deux sœurs disent dialoguer avec un esprit. L'une d'elles avouera plus tard qu'elles faisaient craquer leurs articulations.","spiritisme"],
    ["meiji",139.75,35.68,"Tokyo",1868,"1868","Le shintô séparé du bouddhisme","doc","Le nouveau pouvoir impérial sépare de force deux religions mêlées depuis mille ans. Des temples bouddhiques sont détruits.","shinto"],
    ["wounded",-102.36,43.142,"Wounded Knee",1890,"29 décembre 1890","Wounded Knee","doc","L'armée américaine tue près de trois cents Lakota, dont beaucoup de femmes et d'enfants. La Danse des Esprits s'arrête.","ghost"],
    ["taxil",2.33,48.85,"Paris",1897,"19 avril 1897","Le canular de Léo Taxil","leg","Pendant douze ans, un journaliste a fait croire que les francs-maçons adoraient le diable. Il avoue tout en public. La rumeur, elle, court toujours.","macon"],
    ["nagh",32.28,26.06,"Nag Hammadi",1945,"1945","Les livres gnostiques retrouvés","doc","Un paysan égyptien déterre une jarre : treize volumes en copte, dont l'Évangile selon Thomas.","gnose"],
    ["qumran",35.46,31.74,"Qumrân",1947,"1947","Les manuscrits de la mer Morte","doc","Un berger découvre dans une grotte des rouleaux vieux de deux mille ans, dont des fragments du Livre d'Hénoch.",null],
    ["witch",-0.125,51.5,"Londres",1951,"1951","La loi sur la sorcellerie abolie","doc","Le Royaume-Uni abroge sa loi de 1735. Trois ans plus tard, Gardner peut publier son livre sur la wicca.","wicca"],
    ["lhassa",91.12,29.65,"Lhassa",1959,"mars 1959","Le dalaï-lama quitte le Tibet","doc","L'exil de milliers de moines fait connaître le bouddhisme tibétain au monde entier.","bon"],
    ["airfa",-77.04,38.9,"Washington",1978,"1978","La liberté religieuse des Amérindiens","doc","Une loi des États-Unis reconnaît enfin aux nations autochtones le droit de pratiquer leurs religions.","lakota"]
  ];

  /* ---------- les symboles : tracés dans une boîte de 100 × 100 ({d, f:1} = forme pleine ; {d, r} = tournée de r degrés) ---------- */
  const ring = (n, R, r) => { let d = ""; for(let i = 0; i < n*2; i++){ const a = -Math.PI/2 + i*Math.PI/n, q = i % 2 ? r : R; d += (i ? "L" : "M") + (50 + Math.cos(a)*q).toFixed(1) + " " + (50 + Math.sin(a)*q).toFixed(1); } return d + "Z"; };
  const bagua = () => { const T = [[1,1,1],[1,1,0],[0,1,0],[1,0,0],[0,0,0],[0,0,1],[1,0,1],[0,1,1]], out = [];
    T.forEach((t, k) => { const a = -90 + k*45; t.forEach((s, j) => { const y = 14 + j*6; out.push({d:s ? `M41 ${y}H59` : `M41 ${y}H48M52 ${y}H59`, r:a}); }); });
    out.push("M50 38a12 12 0 1 0 .01 0", "M50 38A6 6 0 0 1 50 50A6 6 0 0 0 50 62"); return out; };
  const SY = {
    ankh:{nom:"L'ankh", d:["M50 48C34 40 32 28 32 24A18 18 0 0 1 68 24C68 28 66 40 50 48Z","M26 52H74","M50 48V92"], x:"La « croix de vie » des Égyptiens : dans les images, les dieux la tendent au pharaon. Les chrétiens d'Égypte l'ont gardée comme croix.", ou:["egypte"]},
    oudjat:{nom:"L'œil oudjat", d:["M12 30C32 16 64 16 88 30","M16 44C30 28 62 28 82 44","M16 44C34 56 62 56 82 44","M50 36a8 8 0 1 0 .01 0","M44 54V74","M56 54C60 72 74 80 86 70C92 64 88 56 82 58"], x:"L'œil du dieu Horus, arraché dans un combat puis guéri. Les Égyptiens le portaient en amulette : c'est le signe de ce qui est redevenu entier.", ou:["egypte"]},
    aton:{nom:"Le disque d'Aton", d:["M50 10a12 12 0 1 0 .01 0","M50 34V88","M44 33L30 84","M56 33L70 84","M39 30L14 76","M61 30L86 76"], x:"Le Soleil et ses rayons, que les images d'Amarna terminent par de petites mains. Le seul dieu qu'Akhénaton voulait qu'on prie.", ou:["egypte"]},
    ouroboros:{nom:"L'ouroboros", d:["M72 27A32 32 0 1 1 58 19","M68 33A25 25 0 1 1 58 26","M58 19l11-5 5 9-6 3z"], x:"Le serpent qui se mord la queue. Il apparaît dans une tombe de pharaon, puis chez les alchimistes grecs avec ces mots : « Un est le Tout. »", ou:["egypte","hermetisme","r_alchimie"]},
    caducee:{nom:"Le caducée", d:["M50 14V92","M50 84C30 76 30 62 50 56C70 50 70 38 50 32","M50 84C70 76 70 62 50 56C30 50 30 38 50 32","M50 26C40 18 28 18 16 22C26 24 34 28 40 34","M50 26C60 18 72 18 84 22C74 24 66 28 60 34","M50 6a4 4 0 1 0 .01 0"], x:"Le bâton d'Hermès, messager des dieux : deux serpents enlacés et deux ailes. Les alchimistes y ont vu l'union des contraires. Ce n'est pas l'emblème des médecins, qui n'a qu'un serpent.", ou:["hermetisme"]},
    ishtar:{nom:"L'étoile d'Ishtar", d:[ring(8, 40, 15), "M50 42a8 8 0 1 0 .01 0"], x:"L'étoile à huit branches de la déesse Ishtar, c'est-à-dire la planète Vénus. On la voit sur les bornes de pierre de Babylone, à côté du croissant de la Lune et du disque du Soleil.", ou:["babylone"]},
    tetraktys:{nom:"La tétraktys", d:["M50 16a4 4 0 1 0 .01 0","M39 36a4 4 0 1 0 .01 0","M61 36a4 4 0 1 0 .01 0","M28 56a4 4 0 1 0 .01 0","M50 56a4 4 0 1 0 .01 0","M72 56a4 4 0 1 0 .01 0","M17 76a4 4 0 1 0 .01 0","M39 76a4 4 0 1 0 .01 0","M61 76a4 4 0 1 0 .01 0","M83 76a4 4 0 1 0 .01 0"], x:"Dix points en triangle : un, deux, trois, quatre. Les pythagoriciens prêtaient serment sur cette figure, où ils voyaient les rapports qui font l'harmonie de la musique et du monde.", ou:["pythagore"]},
    penta:{nom:"Le pentagramme", d:["M50 14L72.300 82.700L13.900 40.300L86.100 40.300L27.700 82.700Z","M50 8a44 44 0 1 0 .01 0"], x:"L'étoile à cinq branches, tracée d'un seul trait. Signe de santé chez les pythagoriciens, de protection au Moyen Âge, des quatre éléments et de l'esprit chez les magiciens. Son usage « satanique » date du XIXe siècle.", ou:["agrippa","levi","wicca"]},
    hexa:{nom:"L'hexagramme", d:["M50 12L83 69H17Z","M50 88L17 31H83Z"], x:"Deux triangles entrelacés : le feu et l'eau, le haut et le bas. On l'appelle sceau de Salomon dans les grimoires. Il ne devient l'emblème du judaïsme qu'à l'époque moderne.", ou:["gd","kabbale"]},
    arbre:{nom:"L'Arbre de Vie", d:["M50 8L76 22M50 8L24 22M24 22H76M76 22V68M24 22V68M50 8V94M24 42H76M24 68H76M76 22L50 52M24 22L50 52M76 42L50 52M24 42L50 52M50 52L76 68M50 52L24 68M76 68L50 78M24 68L50 78M76 68L50 94M24 68L50 94",
      ...[[50,8],[76,22],[24,22],[76,42],[24,42],[50,52],[76,68],[24,68],[50,78],[50,94]].map(p => ({d:`M${p[0]} ${p[1] - 4.5}a4.5 4.5 0 1 0 .01 0`, f:2}))], x:"Dix sphères et vingt-deux sentiers : le schéma par lequel les kabbalistes décrivent le passage de l'infini au monde. La Golden Dawn y a rangé les planètes, les lames du tarot et les grades de l'initié.", ou:["kabbale","gd"]},
    rosecroix:{nom:"La rose-croix", d:["M50 8V92","M22 36H78","M50 26a10 10 0 1 0 .01 0","M50 31a5 5 0 1 0 .01 0"], x:"Une rose au centre d'une croix. Le nom du fondateur légendaire, Rosenkreutz, veut dire « croix de roses ». La Golden Dawn en a fait un bijou à vingt-deux pétales, un par lettre hébraïque.", ou:["rosecroix","gd"]},
    equerre:{nom:"L'équerre et le compas", d:["M50 12L24 84","M50 12L76 84","M50 8a4 4 0 1 0 .01 0","M14 48L50 88L86 48"], x:"Les deux outils du tailleur de pierre. L'équerre trace l'angle droit : la rectitude. Le compas trace le cercle : la mesure. La franc-maçonnerie en a fait son emblème.", ou:["macon"]},
    delta:{nom:"Le delta rayonnant", d:["M50 14L90 82H10Z","M32 60C40 50 60 50 68 60C60 70 40 70 32 60Z","M50 55a5 5 0 1 0 .01 0"], x:"Un œil dans un triangle. D'abord une image chrétienne de la Trinité qui voit tout, reprise par les francs-maçons, puis par le billet d'un dollar. Le caodaïsme vénère lui aussi un œil divin.", ou:["macon","cao"]},
    croixpattee:{nom:"La croix pattée", d:["M42 42L30 14H70L58 42L86 30V70L58 58L70 86H30L42 58L14 70V30Z"], x:"La croix rouge aux bras évasés que les Templiers portaient sur leur manteau blanc. Aucun sens caché : c'était un signe de reconnaissance sur le champ de bataille.", ou:["templiers"]},
    monade:{nom:"La Monade de John Dee", d:["M36 14A14 14 0 0 0 64 14","M50 28a14 14 0 1 0 .01 0","M50 40a2 2 0 1 0 .01 0","M50 56V80","M38 68H62","M50 80C44 80 38 84 38 91","M50 80C56 80 62 84 62 91"], x:"En 1564, John Dee dessine un signe unique qui contient la Lune, le Soleil, la croix des éléments et le feu du Bélier. Pour lui, tous les signes des planètes en sortent.", ou:["dee"]},
    ennea:{nom:"L'ennéagramme", d:["M50 10a40 40 0 1 0 .01 0","M50 10L84.600 70H15.400Z","M75.700 19.400L63.700 87.600L89.400 43.100L24.300 19.400L36.300 87.600L10.600 43.100Z"], x:"Un cercle, un triangle et une figure à six pointes. Gurdjieff le présente vers 1916 comme le schéma de tout processus. Les neuf « types de personnalité » qu'on y accroche aujourd'hui datent des années 1970.", ou:["gurdjieff"]},
    taijitu:{nom:"Le taijitu", d:["M50 10a40 40 0 1 0 .01 0",{d:"M50 10A40 40 0 0 0 50 90A20 20 0 0 1 50 50A20 20 0 0 0 50 10Z", f:1},{d:"M50 24a6 6 0 1 0 .01 0", f:1},"M50 64a6 6 0 1 0 .01 0"], x:"Le yin et le yang : l'ombre et la lumière qui s'engendrent l'une l'autre, chacune portant le germe de l'autre. Le dessin tel qu'on le connaît se fixe en Chine vers le XIVe siècle.", ou:["tao"]},
    bagua:{nom:"Les huit trigrammes", d:bagua(), x:"Trois traits, pleins ou brisés : huit combinaisons, pour le ciel, la terre, le tonnerre, l'eau, la montagne, le vent, le feu et le lac. Deux trigrammes superposés donnent une figure du Yi Jing.", ou:["yijing","tao"]},
    roue:{nom:"La roue du Dharma", d:["M50 10a40 40 0 1 0 .01 0","M50 17a33 33 0 1 0 .01 0","M50 42a8 8 0 1 0 .01 0","M50 17V42M50 58V83M17 50H42M58 50H83M26.700 26.700L44.300 44.300M55.700 55.700L73.300 73.300M73.300 26.700L55.700 44.300M44.300 55.700L26.700 73.300"], x:"En donnant son premier sermon, le Bouddha a « mis en mouvement la roue de l'enseignement ». Ses huit rayons sont les huit branches du chemin qui mène hors de la souffrance.", ou:["bouddhisme"]},
    lotus:{nom:"Le lotus", d:["M50 20C40 40 40 60 50 72C60 60 60 40 50 20Z","M50 72C34 66 24 50 26 34C40 40 48 56 50 72Z","M50 72C66 66 76 50 74 34C60 40 52 56 50 72Z","M50 72C30 74 14 64 10 48C28 48 44 60 50 72Z","M50 72C70 74 86 64 90 48C72 48 56 60 50 72Z","M22 82C40 88 60 88 78 82"], x:"Une fleur qui naît dans la vase et s'ouvre intacte au-dessus de l'eau. En Inde, c'est l'image de l'esprit qui s'éveille. Les dieux et les bouddhas sont assis dessus.", ou:["veda","bouddhisme"]},
    torii:{nom:"Le torii", d:["M10 24C30 30 70 30 90 24","M18 38H82","M30 27V90","M70 27V90","M50 28V38"], x:"Le portique qui marque l'entrée d'un sanctuaire shintô. On le franchit pour passer du monde ordinaire à l'espace des kami.", ou:["shinto"]},
    triskele:{nom:"Le triskèle", d:[0, 120, 240].map(r => ({d:"M50 50C50 34 64 26 74 32C84 38 82 54 71 56C63 57 59 49 64 45", r})), x:"Trois spirales qui tournent autour d'un centre. Le motif orne les objets celtes depuis l'âge du fer, et plus tôt encore les pierres de Newgrange. Son sens d'origine est inconnu : les explications sont modernes.", ou:["druides"]},
    runes:{nom:"Les runes", d:["M18 20V80M18 30L34 20M18 46L34 36","M46 80V20L62 40V80","M74 20V80M74 34L88 46L74 58"], x:"L'alphabet des peuples germaniques, gravé dans la pierre et le bois à partir du IIe siècle. Ici ses trois premières lettres : F, U, Th. On s'en servait pour écrire. Leur usage divinatoire tel qu'on le pratique est moderne.", ou:["nordique"]},
    adinkra:{nom:"Adinkrahene", d:["M50 10a40 40 0 1 0 .01 0","M50 23a27 27 0 1 0 .01 0","M50 36a14 14 0 1 0 .01 0"], x:"Le « roi des signes adinkra » chez les Akan du Ghana : trois cercles concentriques, pour la grandeur et l'autorité. On dit que tous les autres signes en découlent.", ou:["akan"]},
    hamsa:{nom:"La main (hamsa)", d:["M34 50V26a5 5 0 0 1 10 0V46","M44 46V16a6 6 0 0 1 12 0V46","M56 46V26a5 5 0 0 1 10 0V50","M34 50C28 44 20 42 14 46C18 58 26 62 30 66C30 80 40 90 50 90C60 90 70 80 70 66C74 62 82 58 86 46C80 42 72 44 66 50","M38 66C44 58 56 58 62 66C56 74 44 74 38 66Z","M50 62a4 4 0 1 0 .01 0"], x:"Une main ouverte, souvent avec un œil dans la paume, contre le mauvais œil. Juifs et musulmans d'Afrique du Nord et du Proche-Orient la partagent. Le geste est bien plus ancien que les deux religions.", ou:["gnawa","kabbale"]},
    maya:{nom:"Les chiffres mayas", d:["M24 62H76","M24 76H76","M32 40a5 5 0 1 0 .01 0","M50 40a5 5 0 1 0 .01 0","M68 40a5 5 0 1 0 .01 0"], x:"Un point vaut un, une barre vaut cinq : voici treize. Avec un troisième signe pour le zéro, les Mayas comptaient par vingt et calculaient des dates sur des millions de jours.", ou:["maya"]}
  };

  /* ---------- les parcours guidés ---------- */
  const PARCOURS = [
    {id:"p_hermes", nom:"D'Hermès à la Golden Dawn", x:"Comment des textes d'Égypte grecque sont devenus la magie moderne, en sept étapes.", stops:[
      [29.92,31.2,"Alexandrie","Ier – IIIe siècle","Des Grecs d'Égypte écrivent sous le nom d'Hermès Trismégiste. Ils enseignent que tout se répond, le ciel et la terre, le monde et l'homme.","hermetisme"],
      [44.36,33.31,"Bagdad","IXe siècle","Les savants de langue arabe traduisent, expérimentent, et transmettent la Table d'émeraude avec l'alchimie et l'astrologie.","r_alchimie"],
      [-4.02,39.86,"Tolède","XIIe siècle","Juifs, chrétiens et musulmans traduisent ensemble de l'arabe au latin. L'Europe découvre d'un coup Aristote, l'astrologie et l'alchimie.","r_astro"],
      [11.25,43.77,"Florence","1463","Ficin traduit Hermès, Pic y ajoute la kabbale. La magie devient une philosophie.","ficin"],
      [14.42,50.09,"Prague","vers 1600","L'empereur Rodolphe II accueille alchimistes, astronomes et magiciens. John Dee y passe, Kepler y travaille.","dee"],
      [2.35,48.86,"Paris","1856","Éliphas Lévi rassemble le tout sous un mot neuf, l'occultisme, et y fait entrer le tarot.","levi"],
      [-0.14,51.52,"Londres","1888","La Golden Dawn en fait un système complet, avec des grades et des rituels. Presque toute la magie d'aujourd'hui en descend.","gd"]]},
    {id:"p_bouddha", nom:"Les routes du Bouddha", x:"De l'arbre de l'Éveil au Japon et au Tibet : mille ans de voyage.", stops:[
      [84.99,24.7,"Bodh Gaya","Ve siècle av. J.-C.","Siddhartha Gautama s'assoit sous un figuier et se relève « éveillé » : c'est le sens du mot bouddha.","bouddhisme"],
      [80.4,8.35,"Anuradhapura","vers −250","L'empereur Ashoka envoie des moines au Sri Lanka. C'est là que les paroles du Bouddha seront mises par écrit.","bouddhisme"],
      [72.8,33.75,"Gandhara","Ier siècle","Au contact de l'art grec, on ose pour la première fois représenter le Bouddha sous les traits d'un homme.","bouddhisme"],
      [112.45,34.62,"Luoyang","Ier siècle","Des moines arrivent en Chine par la route de la soie. Il faudra des siècles pour traduire les textes.","bouddhisme"],
      [112.94,34.51,"Shaolin","vers 500","En Chine naît une école tournée vers la seule méditation : le chan.","zen"],
      [135.84,34.69,"Nara","VIe siècle","Le bouddhisme entre au Japon, où il vivra pendant mille ans mêlé au shintô.","shinto"],
      [91.5,29.33,"Samyé","vers 779","Le Tibet fonde son premier monastère et développe une forme à part, riche en rites et en images.","bon"]]},
    {id:"p_atlantique", nom:"Les dieux qui ont traversé l'Atlantique", x:"Comment les religions d'Afrique de l'Ouest ont survécu à l'esclavage.", stops:[
      [4.56,7.48,"Ilé-Ifè","avant 1500","Pour les Yoruba, le monde a commencé ici. Leurs dieux s'appellent les orishas, et leur divination Ifá.","ifa"],
      [2.09,6.36,"Ouidah","XVIIe – XIXe siècle","Un des grands ports de la traite. Plus d'un million de personnes y sont embarquées de force, avec leurs dieux pour seul bagage.","vodun"],
      [-72.34,18.55,"Haïti","XVIIIe siècle","Dans les plantations de Saint-Domingue, les cultes se mêlent entre eux et au catholicisme : c'est le vaudou.","vaudou"],
      [-38.5,-12.97,"Salvador de Bahia","XIXe siècle","Au Brésil, les orixás se cachent derrière les saints. Le candomblé garde les langues et les rythmes d'Afrique.","candomble"],
      [-82.38,23.13,"La Havane","XIXe siècle","À Cuba, la même histoire donne la santería.","candomble"],
      [-90.07,29.95,"La Nouvelle-Orléans","1809","Des réfugiés de Saint-Domingue apportent leurs rites en Louisiane.","vaudou"]]},
    {id:"p_tarot", nom:"L'invention du tarot", x:"D'un jeu de cour italien au jeu divinatoire le plus célèbre du monde.", stops:[
      [9.19,45.46,"Milan","vers 1440","Les ducs de Milan se font peindre des cartes à l'or fin. On y ajoute une série de figures, les triomphes, pour pimenter le jeu.","r_tarot"],
      [5.37,43.3,"Marseille","XVIIe – XVIIIe siècle","Les cartiers gravent sur bois un modèle populaire, qui prendra le nom de la ville.","r_tarot"],
      [2.35,48.86,"Paris","1781","Court de Gébelin voit un tarot dans un salon et s'écrie que c'est un livre égyptien. Etteilla en tire aussitôt une méthode de divination.","levi"],
      [-0.14,51.52,"Londres","1909","Deux membres de la Golden Dawn, Arthur Waite et Pamela Colman Smith, dessinent un jeu où chaque carte est une scène.","gd"]]}
  ];
  return {FAM, TR, EV, SY, PARCOURS};
})();
