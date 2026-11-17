/* ===== Arcanes · Le globe : l'inconscient, la magie populaire, la science des lettres =====
   Une famille de plus (« L'inconscient », de Mesmer à Jung), six traditions, onze événements, six vies sur la carte
   et leurs fils d'influence. Chargé après globe-plus-3.js, avant le moteur. */
(() => {
  const D = window.GLOBE_DATA, PL = window.GLOBE_PLUS = window.GLOBE_PLUS || {}, L = window.GLOBE_LIENS; if(!D) return;
  D.FAM.psy = D.FAM.psy || {nom:"L'inconscient", hex:"#5b4a8a"};
  const NEW = [
   {id:"guerisseurs", fam:"eso", nom:"Guérisseurs et sorciers des campagnes", lon:1.99, lat:46.58, lieu:"Le Berry (La Châtre)", de:1500, dt:"Toujours vivants", st:"doc", l:["magie"],
    x:"Leveurs de sorts, rebouteux, coupeurs de feu, panseurs de secrets : dans les campagnes françaises, on soignait les brûlures, les verrues et les entorses par des prières transmises en secret, d'une génération à l'autre. George Sand a raconté les sorciers du Berry ; les ethnologues ont montré que ces pratiques n'ont jamais disparu."},
   {id:"colportage", fam:"eso", nom:"Les grimoires de colportage", lon:4.07, lat:48.30, lieu:"Troyes", de:1600, a:1870, st:"doc", l:["magie"],
    x:"Imprimés à bas prix à Troyes, puis dans toute la France, de petits livres à couverture bleue partent sur les routes dans la balle des colporteurs : almanachs, vies de saints, romans, et grimoires. Le Petit Albert, le Grand Grimoire, le Dragon rouge mettent dans chaque village des recettes, des secrets et des pentacles."},
   {id:"lettres", fam:"mys", nom:"La science des lettres", lon:31.24, lat:30.04, lieu:"Le Caire", de:1200, dt:"Toujours pratiquée", st:"doc", l:["magie"],
    x:"Dans le monde musulman, la science des lettres, ʿilm al-ḥurūf, tient que les lettres de l'arabe et leurs nombres portent des forces. Al-Būnī, mort en 1225, en fait la somme : carrés magiques, noms divins, talismans. Ses livres circulent du Maroc à l'Inde et nourrissent les amulettes jusqu'à aujourd'hui."},
   {id:"hypnose", fam:"psy", nom:"L'hypnose, de la Salpêtrière à Nancy", lon:2.36, lat:48.84, lieu:"Paris, la Salpêtrière", de:1843, a:1910, st:"doc", l:["magie"],
    x:"Le chirurgien écossais James Braid invente le mot « hypnotisme » en 1843 pour débarrasser le magnétisme de son fluide. À Paris, Charcot fait de l'hypnose un objet de leçons publiques sur l'hystérie ; à Nancy, Liébeault et Bernheim y voient l'effet de la suggestion, et c'est Nancy qui a raison. Freud passe par les deux écoles."},
   {id:"psychanalyse", fam:"psy", nom:"La psychanalyse", lon:16.36, lat:48.22, lieu:"Vienne, Berggasse 19", de:1896, dt:"Depuis 1896", st:"doc",
    x:"Sigmund Freud nomme « psychanalyse » une méthode : laisser parler le patient, sans censure, et écouter ce que disent les rêves, les oublis et les lapsus. Derrière, l'inconscient, fait de désirs refoulés. La psychanalyse se répand dans le monde entier et marque toute la culture du XXe siècle, même là où on la conteste."},
   {id:"jung", fam:"psy", nom:"La psychologie des profondeurs de Jung", lon:8.58, lat:47.32, lieu:"Küsnacht, près de Zurich", de:1913, dt:"Depuis 1913", st:"doc", l:["tarot", "alchimie"],
    x:"Après sa rupture avec Freud, le psychiatre suisse Carl Gustav Jung traverse plusieurs années de visions qu'il consigne dans le Livre rouge. Il en tire une carte de la psyché : un inconscient collectif peuplé d'archétypes, l'ombre, l'anima, le Soi. Il lit l'alchimie et le tarot comme des images de l'âme, ce qui lui vaut un public immense hors de la psychiatrie."}
  ];
  const PLUS = {
   guerisseurs:{c:"Le secret est une prière, souvent tirée de la vie d'un saint, qu'on récite à voix basse en faisant un signe de croix sur le mal. Il se transmet à une seule personne, parfois d'un homme à une femme et d'une femme à un homme. Le sort, lui, s'explique : si tout va mal, c'est qu'un voisin vous veut du mal, et le désorceleur le retourne.",
    f:[["George Sand","1804 – 1876","elle raconte les sorciers, les meneurs de loups et les fades du Berry"],["L'abbé Julio","1844 – 1912","prêtre devenu guérisseur, auteur de prières et de pentacles"],["Jeanne Favret-Saada","née en 1934","l'ethnologue qui a enquêté sur la sorcellerie dans le Bocage mayennais"]],
    t:[["Légendes rustiques, de George Sand","1858"],["Les Mots, la mort, les sorts, de Jeanne Favret-Saada","1977"]],
    r:"Les coupeurs de feu sont toujours nombreux, en France comme en Suisse ; certains soignants les appellent pour des brûlés. Le module « La magie populaire française » de l'école de la Magie leur est consacré."},
   colportage:{c:"Ces livres promettent tout : trouver un trésor, se faire aimer, gagner au jeu, se protéger des loups et des voleurs. Mais on y trouve surtout des remèdes de bonne femme, des recettes de cuisine et de jardin, des prières et des tours de passe-passe. Leur réputation sulfureuse faisait leur succès.",
    f:[["Nicolas Oudot","XVIIe siècle","l'imprimeur de Troyes qui lance la « Bibliothèque bleue »"],["Le colporteur","XVIIe – XIXe siècle","marchand à pied, il vend des livres, des images et des almanachs de foire en foire"]],
    t:[["Le Petit Albert","XVIIIe siècle"],["Le Grand Grimoire, ou Dragon rouge","XVIIIe – XIXe siècle"]],
    r:"Le colportage disparaît avec le chemin de fer et l'école. Les grimoires bleus, eux, ont été réédités sans fin et sont devenus des objets de collection."},
   lettres:{c:"Chaque lettre arabe a une valeur, l'abjad, et une nature : chaude ou froide, sèche ou humide, rattachée à un élément. Les noms de Dieu, combinés aux lettres et aux carrés magiques, servent à composer des talismans pour la protection, la guérison ou la réussite. Le carré de trois, dont les coins font budūḥ, est le plus célèbre.",
    f:[["Al-Būnī","mort en 1225","l'auteur du Shams al-maʿārif, « le soleil des connaissances »"],["Ibn Khaldūn","1332 – 1406","l'historien qui la décrit, et la critique, dans sa Muqaddima"]],
    t:[["Le Shams al-maʿārif","XIIIe siècle, remanié ensuite"],["Les amulettes de Tombouctou et du Sénégal","jusqu'à aujourd'hui"]],
    r:"Des théologiens l'ont toujours condamnée, d'autres l'ont tolérée. Elle reste vivante en Afrique de l'Ouest, au Maghreb et en Asie du Sud. Arcanes en montre le carré budūḥ dans les pentacles du monde."},
   hypnose:{c:"Pour Braid, le sommeil nerveux vient de la fixation du regard, pas d'un fluide. Pour Charcot, seuls les hystériques sont hypnotisables, et l'hypnose révèle leur maladie. Pour Bernheim, tout le monde est plus ou moins suggestible, et l'hypnose n'est qu'une suggestion poussée. Le débat oppose deux écoles pendant vingt ans.",
    f:[["James Braid","1795 – 1860","il invente le mot « hypnotisme »"],["Jean-Martin Charcot","1825 – 1893","le maître de la Salpêtrière"],["Hippolyte Bernheim","1840 – 1919","le chef de l'école de Nancy"],["Pierre Janet","1859 – 1947","il parle de « subconscient » et de dissociation"]],
    t:[["Neurypnology, de Braid","1843"],["Une leçon clinique à la Salpêtrière, tableau d'André Brouillet","1887"]],
    r:"Après Charcot, l'hypnose recule dans les hôpitaux. Elle revient au XXe siècle avec Milton Erickson, puis dans les blocs opératoires, où l'hypnosédation aide à opérer avec moins d'anesthésie."},
   psychanalyse:{c:"Le rêve est « la voie royale qui mène à l'inconscient ». Ce qu'on refoule ne disparaît pas : cela revient dans les symptômes, les rêves, les actes manqués. La cure consiste à associer librement, allongé, et à interpréter. Freud ne cherche pas l'occulte, il s'en méfie, mais il s'intéresse à la télépathie, avec prudence.",
    f:[["Sigmund Freud","1856 – 1939","le fondateur"],["Anna Freud","1895 – 1982","sa fille, pionnière de la psychanalyse des enfants"],["Sándor Ferenczi","1873 – 1933","le disciple hongrois, passionné de transmission de pensée"]],
    t:[["L'Interprétation des rêves","1900"],["Le divan de la Berggasse","aujourd'hui à Londres, au Freud Museum"]],
    r:"La psychanalyse est aujourd'hui contestée par une partie de la psychologie scientifique, mais ses mots sont partout : refoulement, lapsus, complexe, inconscient. Le futur univers Psyché d'Arcanes en racontera l'histoire."},
   jung:{c:"Sous l'inconscient personnel, un inconscient collectif, commun à tous, où vivent des formes primordiales, les archétypes : la Mère, le Héros, le Vieux Sage, l'Enfant. La vie est un chemin vers le Soi, l'individuation. Jung lit l'alchimie comme une projection de ce chemin, et voit dans le mandala une image de l'âme qui se rassemble.",
    f:[["Carl Gustav Jung","1875 – 1961","psychiatre suisse"],["Toni Wolff","1888 – 1953","sa collaboratrice, qui l'a aidé à traverser ses années de visions"],["Marie-Louise von Franz","1915 – 1998","elle a poursuivi son travail sur les contes et l'alchimie"]],
    t:[["Le Livre rouge","1913 – 1930, publié en 2009"],["Psychologie et alchimie","1944"],["La tour de Bollingen","bâtie à partir de 1923"]],
    r:"Les archétypes ont inspiré le cinéma, la publicité, les jeux de rôle et la lecture psychologique du tarot. Les psychologues jungiens forment toujours une école. La science, elle, reste réservée sur l'inconscient collectif."}
  };
  NEW.forEach(t => { if(!D.TR.find(x => x.id === t.id)) D.TR.push(t); });
  Object.assign(PL, PLUS);

  /* événements : [id, lon, lat, lieu, année, quand, titre, statut, texte, tradition] */
  const EV = [
   ["occulta", 6.96, 50.94, "Cologne", 1533, "1533", "La Philosophie occulte d'Agrippa", "doc", "Après vingt ans de retouches, Agrippa publie enfin les trois livres de sa Philosophie occulte : magie naturelle, céleste et cérémonielle. On y trouve les carrés des planètes et les écritures secrètes.", "agrippa"],
   ["arbatel", 7.59, 47.56, "Bâle", 1575, "1575", "L'Arbatel", "doc", "Un imprimeur de Bâle publie l'Arbatel, un petit livre anonyme d'aphorismes sur la magie des anciens, la prière et les sept esprits olympiques.", "agrippa"],
   ["commission", 2.28, 48.86, "Paris, Passy", 1784, "1784", "La commission sur le magnétisme animal", "doc", "Louis XVI charge Benjamin Franklin, Lavoisier et Bailly d'examiner le baquet de Mesmer. Leur conclusion : le fluide n'existe pas, les effets viennent de l'imagination. C'est l'une des premières études avec placebo.", "mesmer"],
   ["puysegur", 3.33, 49.32, "Buzancy", 1784, "1784", "Le somnambule de Buzancy", "doc", "Le marquis de Puységur magnétise un jeune paysan, Victor Race, qui entre dans un sommeil où il parle, répond et semble plus lucide qu'éveillé. Le « somnambulisme magnétique » est né, ancêtre de l'hypnose.", "mesmer"],
   ["lenain", 2.30, 49.89, "Amiens", 1823, "1823", "La Science cabalistique de Lenain", "doc", "Un érudit picard publie les 72 génies du Shem ha-Mephorash, chacun gouvernant cinq degrés du zodiaque. Ils deviendront au XXe siècle les « anges gardiens » de la date de naissance.", "kabbale"],
   ["scheible", 9.18, 48.78, "Stuttgart", 1849, "1849", "Le Sixième et le Septième Livre de Moïse", "doc", "L'éditeur Johann Scheible publie des grimoires de sceaux attribués à Moïse. Traduits en anglais, ils font un succès immense en Amérique, où ils nourrissent le hoodoo.", "colportage"],
   ["sand", 1.97, 46.63, "Nohant", 1858, "1858", "Les Légendes rustiques", "doc", "George Sand publie les croyances du Berry qu'elle a entendues depuis l'enfance : sorciers, meneurs de loups, lavandières de nuit.", "guerisseurs"],
   ["brouillet", 2.36, 48.84, "Paris, la Salpêtrière", 1887, "1887", "Une leçon de Charcot", "doc", "Le peintre André Brouillet expose une leçon de Charcot : une patiente en crise, soutenue par un interne, devant un parterre de médecins. Freud en accroche une gravure dans son cabinet.", "hypnose"],
   ["reves", 16.36, 48.22, "Vienne", 1900, "1900", "L'Interprétation des rêves", "doc", "Paru à la fin de 1899, daté de 1900 : Freud y fait du rêve l'accomplissement déguisé d'un désir. Il faudra huit ans pour vendre les six cents premiers exemplaires.", "psychanalyse"],
   ["clark", -71.80, 42.26, "Worcester (Massachusetts)", 1909, "1909", "Freud et Jung en Amérique", "doc", "Invités à l'université Clark, Freud et Jung traversent l'Atlantique ensemble. Sur le bateau, ils s'analysent l'un l'autre ; leur amitié commence à se fissurer.", "psychanalyse"],
   ["livrerouge", 8.58, 47.32, "Küsnacht", 1913, "1913", "Le début du Livre rouge", "doc", "À la fin de 1913, Jung commence à noter et à peindre ses visions. Il y travaillera seize ans. Le livre ne sera publié qu'en 2009.", "jung"]
  ];
  EV.forEach(e => { if(!D.EV.find(x => x[0] === e[0])) D.EV.push(e); });

  if(L){
    (L.L = L.L || []).push(
      ["mesmer", "hypnose", "Du fluide magnétique au sommeil par suggestion", "doc"],
      ["hypnose", "psychanalyse", "Freud passe par la Salpêtrière et par Nancy avant d'inventer sa méthode", "doc"],
      ["psychanalyse", "jung", "Six ans d'amitié, puis la rupture de 1913", "doc"],
      ["jung", "r_alchimie", "L'alchimie lue comme un chemin de l'âme", "doc"],
      ["jung", "r_tarot", "Les arcanes majeurs lus comme des archétypes", "trad"],
      ["colportage", "guerisseurs", "Les grimoires bleus dans les fermes", "doc"],
      ["agrippa", "colportage", "Des carrés et des pentacles recopiés et simplifiés", "trad"],
      ["kabbale", "lettres", "Deux sciences sœurs des lettres et des nombres", "trad"],
      ["lettres", "tombouctou", "Les talismans des manuscrits", "doc"],
      ["soufisme", "lettres", "Les noms divins, médités et écrits", "trad"]);
    (L.VOY = L.VOY || []).push(
      {id:"v_agrippa", nom:"Agrippa, le savant sans repos", x:"Médecin, soldat, juriste, orateur, historiographe, et toujours en procès : un homme de toutes les cours d'Europe.", voy:1, stops:[
        [6.96, 50.94, "Cologne", "1486", "Naissance d'Henri Corneille Agrippa, dans une famille de petite noblesse au service des empereurs.", "agrippa"],
        [2.35, 48.86, "Paris", "vers 1507", "Étudiant, il réunit autour de lui une société secrète d'amis curieux des sciences occultes."],
        [5.49, 47.09, "Dole", "1509", "Il commente un livre de Reuchlin sur la Kabbale. Un moine l'accuse de judaïser ; il doit partir."],
        [9.93, 49.79, "Wurtzbourg", "1510", "Il rend visite à l'abbé Trithème, à qui il envoie le premier état de sa Philosophie occulte.", "agrippa"],
        [9.16, 45.19, "Pavie", "1515", "Il enseigne les livres d'Hermès à l'université."],
        [6.18, 49.12, "Metz", "1518", "Orateur de la ville, il défend une femme accusée de sorcellerie et la fait libérer."],
        [4.84, 45.76, "Lyon", "1524", "Médecin de Louise de Savoie, mère de François Ier, qui lui demande des horoscopes qu'il refuse de faire."],
        [4.48, 51.03, "Malines", "1530", "Historiographe de Marguerite d'Autriche. Il publie De la vanité des sciences, où il se moque de la magie."],
        [6.96, 50.94, "Cologne et Bonn", "1533", "Sous la protection de l'archevêque, il publie enfin la Philosophie occulte complète.", "agrippa"],
        [5.72, 45.19, "Grenoble", "1535", "Il meurt, pauvre, dans une maison de la ville."]]},
      {id:"v_mesmer", nom:"Mesmer, le magnétiseur", x:"Un médecin persuadé qu'un fluide invisible relie les astres, la terre et les corps.", voy:1, stops:[
        [8.95, 47.71, "Iznang", "1734", "Naissance de Franz Anton Mesmer, au bord du lac de Constance."],
        [16.37, 48.21, "Vienne", "1766 – 1777", "Il soutient une thèse sur l'influence des planètes sur le corps, puis soigne avec des aimants. Un scandale le pousse à partir.", "mesmer"],
        [2.35, 48.86, "Paris", "1778 – 1785", "Ses baquets attirent la foule et l'aristocratie. La commission royale de 1784 conclut à l'imagination.", "mesmer"],
        [9.27, 47.69, "Meersburg", "1815", "Il meurt au bord du même lac, presque oublié, alors que le magnétisme se répand dans toute l'Europe."]]},
      {id:"v_jung", nom:"Jung, le voyageur de l'âme", x:"Un psychiatre suisse qui a cherché l'inconscient jusqu'en Afrique, chez les Pueblos et en Inde.", voy:1, stops:[
        [9.24, 47.60, "Kesswil", "1875", "Naissance de Carl Gustav Jung, fils de pasteur, au bord du lac de Constance."],
        [7.59, 47.56, "Bâle", "1895 – 1900", "Études de médecine. Il assiste à des séances de spiritisme, qui deviennent le sujet de sa thèse."],
        [8.55, 47.36, "Zurich, le Burghölzli", "1900", "Il entre à l'hôpital psychiatrique, où il met au point le test des associations de mots.", "jung"],
        [16.36, 48.22, "Vienne", "1907", "Première rencontre avec Freud : ils parlent treize heures d'affilée.", "psychanalyse"],
        [-71.80, 42.26, "Worcester", "1909", "Avec Freud à l'université Clark.", "psychanalyse"],
        [8.58, 47.32, "Küsnacht", "1913", "Après la rupture, les années de visions et le Livre rouge.", "jung"],
        [-105.55, 36.44, "Taos Pueblo", "1925", "Il parle avec Ochwiay Biano, un chef pueblo, qui lui dit que les Blancs pensent avec la tête."],
        [34.55, 1.14, "Le mont Elgon", "1925", "Un voyage en Afrique de l'Est, où il observe les rites du lever du soleil."],
        [88.36, 22.57, "Calcutta", "1938", "Invité en Inde pour le jubilé de l'université de Calcutta, il découvre les temples et les mandalas."],
        [8.92, 47.23, "Bollingen", "1923 – 1961", "La tour de pierre qu'il bâtit au bord du lac de Zurich, sans électricité. Il meurt à Küsnacht en 1961.", "jung"]]},
      {id:"v_rumi", nom:"Rûmî, de Balkh à Konya", x:"Un enfant d'Asie centrale devenu, en Anatolie, le plus grand poète mystique de la langue persane.", voy:1, stops:[
        [66.90, 36.76, "Balkh", "1207", "Naissance de Jalâl al-Dîn, fils d'un théologien réputé.", "soufisme"],
        [58.80, 36.21, "Nichapour", "vers 1216", "La famille fuit vers l'ouest devant les Mongols. Selon la légende, le poète Attâr bénit l'enfant."],
        [36.29, 33.51, "Damas", "vers 1231", "Il y achève ses études de théologie."],
        [32.49, 37.87, "Konya", "1244", "Il rencontre Shams de Tabriz, un derviche errant. Leur amitié bouleverse sa vie : le savant devient poète.", "soufisme"],
        [32.49, 37.87, "Konya", "1273", "Il meurt après avoir dicté le Masnavi. Ses disciples fondent l'ordre des derviches tourneurs.", "soufisme"]]},
      {id:"v_gurdjieff", nom:"Gurdjieff, le maître de danse", x:"Un Arménien grec qui disait avoir trouvé dans les monastères d'Asie un enseignement oublié.", voy:1, stops:[
        [43.84, 40.79, "Alexandropol (Gyumri)", "vers 1866-1877", "Naissance dans une famille grecque d'Arménie, alors russe."],
        [43.10, 40.60, "Kars", "années 1880", "Il étudie auprès du doyen de la cathédrale, qui l'initie aux sciences et aux questions de l'âme."],
        [67.00, 39.65, "L'Asie centrale", "vers 1890-1910", "Ses voyages avec les « chercheurs de vérité », racontés plus tard dans un livre : impossible de les vérifier."],
        [37.62, 55.75, "Moscou", "1912 – 1917", "Il réunit ses premiers élèves, dont Piotr Ouspensky.", "gurdjieff"],
        [44.79, 41.72, "Tiflis", "1919", "Il fonde un premier Institut pour le développement harmonique de l'homme."],
        [28.98, 41.01, "Constantinople", "1920", "Il y découvre les derviches tourneurs et prépare son départ pour l'Europe."],
        [2.72, 48.40, "Fontainebleau-Avon", "1922", "Le Prieuré, où ses élèves travaillent la terre et apprennent ses « mouvements ».", "gurdjieff"],
        [2.35, 48.86, "Paris", "1949", "Il meurt dans son appartement de la rue des Colonels-Renard."]]},
      {id:"v_pythagore", nom:"Pythagore, entre légende et histoire", x:"On ne sait presque rien de sûr sur lui : ses disciples lui ont tout attribué.", voy:1, stops:[
        [26.98, 37.75, "Samos", "vers 570 av. J.-C.", "Naissance sur l'île, selon la tradition.", "pythagore"],
        [31.13, 29.98, "L'Égypte", "tradition", "Les auteurs tardifs disent qu'il y fut initié par les prêtres. Rien ne le prouve."],
        [17.13, 39.08, "Crotone", "vers 530 av. J.-C.", "Il fonde une communauté où l'on vit en commun, en silence, et où l'on étudie les nombres et l'âme qui revient.", "pythagore"],
        [16.83, 40.38, "Métaponte", "vers 495 av. J.-C.", "Chassé par une révolte, il y serait mort."]]}
    );
  }
})();
