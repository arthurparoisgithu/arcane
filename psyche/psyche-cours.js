/* ===== Arcanes · Psyché : le cours =====
   Dix modules, trente leçons, rangés dans la maison du rêve de Jung (1909) :
   le seuil, l'étage, le rez-de-chaussée, la cave, la grotte, et la tour de Bollingen.
   Jung est protégé par le droit d'auteur jusqu'à la fin de 2031 : ses idées sont résumées, les citations restent brèves.
   st : doc (documenté), mod (lecture moderne), trad (tradition), crit (critique). */
window.PSY_COURS = (() => {
  const M = [];
  const mod = o => M.push(o);

  mod({id:"p1", n:"I", lieu:"seuil", t:"La maison de Jung", sous:"Un rêve, un médecin, une méthode",
   lecons:[
    {id:"p1l1", t:"Le rêve de la maison", sous:"1909, en mer, entre Brême et New York",
     idee:[
      "En 1909, Carl Gustav Jung et Sigmund Freud traversent l'Atlantique pour donner des conférences aux États-Unis. Chaque matin, ils se racontent leurs rêves. Jung rêve d'une maison qu'il ne connaît pas, mais qui est « sa » maison.",
      "À l'<b>étage</b>, un salon du XVIIIe siècle, avec de beaux meubles. Il descend : le <b>rez-de-chaussée</b> est plus sombre, médiéval. Une porte lourde, un escalier de pierre : la <b>cave</b> a des murs romains. Dans le sol, une dalle avec un anneau. Dessous, une <b>grotte</b> pleine de poussière, d'os, de poteries brisées, et deux crânes humains.",
      "Freud cherche à qui appartiennent les crânes : à qui Jung souhaite-t-il la mort ? Jung, mal à l'aise, répond par un nom quelconque. Lui voit autre chose : une image de la psyché elle-même. La conscience en haut, puis des couches de plus en plus anciennes, jusqu'à ce qui appartient à l'humanité entière.",
      "Ce rêve, Jung le racontera dans ses souvenirs comme le point de départ de l'idée d'<b>inconscient collectif</b>. Arcanes en fait la carte du cours : on entre par le seuil, on visite l'étage, puis on descend, une pièce après l'autre."],
     source:{txt:"C'était une image de la psyché, une sorte de plan.", ref:"D'après C. G. Jung, Ma vie. Souvenirs, rêves et pensées, 1962, rédigé avec Aniela Jaffé", st:"doc"},
     ex:{t:"Ta maison", txt:"Dessine la maison où tu as grandi, ou celle de tes rêves. Quelle pièce évites-tu ? Laquelle aimes-tu le plus ? Note ce qui vient, sans chercher à interpréter."},
     carnet:"La pièce de ma maison que j'évite, et celle que je préfère :"},
    {id:"p1l2", t:"Un médecin du Burghölzli", sous:"De Kesswil à Küsnacht",
     idee:[
      "Jung naît en 1875 en Suisse, à Kesswil, fils d'un pasteur. Il étudie la médecine à Bâle et soutient en 1902 une thèse sur une jeune médium spirite, sa cousine : déjà, il s'intéresse à ce qui parle en nous sans que nous le sachions.",
      "En 1900, il entre au <b>Burghölzli</b>, l'hôpital psychiatrique de Zurich, dirigé par Eugen Bleuler, l'inventeur du mot « schizophrénie ». Il y mène des expériences sur les associations de mots qui le font connaître dans le monde entier.",
      "En 1907, il rencontre Freud à Vienne : ils parlent treize heures d'affilée. Freud voit en lui son héritier. Mais Jung ne croit pas que tout se ramène à la sexualité, et la rupture éclate en 1913. Jung traverse alors une longue crise, qu'il appellera sa « confrontation avec l'inconscient ».",
      "Il en sort une psychologie à lui, la <b>psychologie analytique</b>, qu'il enseigne et pratique jusqu'à sa mort en 1961, à Küsnacht, au bord du lac de Zurich. Entre-temps, il a voyagé en Afrique, en Inde, au Nouveau-Mexique, et bâti de ses mains une tour à Bollingen."],
     source:{txt:"Ma vie est l'histoire d'un inconscient qui s'est accompli.", ref:"D'après C. G. Jung, Ma vie, prologue, 1962", st:"doc"},
     ex:{t:"Ton fil", txt:"Écris en cinq lignes les grandes étapes de ta vie, comme Jung l'a fait. Puis demande-toi : quel est le fil qui les relie ?"},
     carnet:"Les cinq étapes de ma vie, et le fil qui les relie :"},
    {id:"p1l3", t:"Ce qu'Arcanes en garde", sous:"Des lunettes, pas une science exacte",
     idee:[
      "La psychologie de Jung n'est pas une science au sens des laboratoires d'aujourd'hui. Beaucoup de ses idées sont difficiles à mettre à l'épreuve : on ne peut pas mesurer un archétype. Les psychologues universitaires la regardent souvent de loin, et parfois de haut.",
      "Elle reste pourtant l'une des grandes <b>lectures</b> de l'âme humaine, comme une philosophie ou une mythologie. Ses mots sont passés dans la langue de tous : complexe, introverti, extraverti, persona, ombre, synchronicité. Elle a nourri la littérature, le cinéma, les jeux, l'art-thérapie.",
      "Arcanes la propose comme un ensemble de <b>lunettes</b> : des concepts qui aident à se regarder, à écrire, à rêver, à comprendre un symbole. Chaque leçon distingue ce qui est documenté, ce qui relève de l'interprétation, et ce que les critiques en disent.",
      "Une règle, enfin : ce cours ne remplace pas un soin. Si tu traverses une souffrance qui dure, un psychologue, un psychiatre ou un médecin est la bonne porte. Les exercices proposés ici sont faits pour la curiosité et la réflexion, pas pour guérir."],
     source:{txt:"Connais-toi toi-même.", ref:"Inscription du temple d'Apollon à Delphes, rapportée par Platon", st:"trad"},
     ex:{t:"Tes lunettes", txt:"Parmi les mots complexe, introverti, persona, ombre, synchronicité, lequel utilises-tu déjà ? Que crois-tu qu'il veut dire ? Garde ta réponse : tu la reliras à la fin du cours."},
     carnet:"Le mot de Jung que j'emploie déjà, et ce que j'en comprends :"}
   ],
   quiz:[
    {q:"En quelle année Jung fait-il le rêve de la maison ?", r:["1909","1875","1913","1961"], ok:0, exp:"Pendant le voyage vers les États-Unis avec Freud."},
    {q:"Que trouve-t-il tout en bas de la maison ?", r:["Une grotte avec des os et deux crânes","Une bibliothèque","Un jardin","Une chapelle"], ok:0, exp:"La couche la plus ancienne, qu'il relie à l'inconscient collectif."},
    {q:"Dans quel hôpital Jung commence-t-il sa carrière ?", r:["Le Burghölzli, à Zurich","La Salpêtrière, à Paris","L'hôpital de Vienne","Bethlem, à Londres"], ok:0, exp:"Sous la direction d'Eugen Bleuler, à partir de 1900."},
    {q:"Comment s'appelle la psychologie de Jung ?", r:["La psychologie analytique","La psychanalyse","La psychologie cognitive","Le béhaviorisme"], ok:0, exp:"Freud garde le mot psychanalyse ; Jung choisit psychologie analytique."}
   ]});

  mod({id:"p2", n:"II", lieu:"etage", t:"Le moi et la persona", sous:"Celui qui dit « je », et le masque qu'il porte",
   lecons:[
    {id:"p2l1", t:"Le moi", sous:"Le centre de la conscience",
     idee:[
      "Pour Jung, le <b>moi</b> est le centre de la conscience : ce qui dit « je », se souvient d'hier, choisit, se raconte. Il est indispensable : sans lui, pas de mémoire ni de décision.",
      "Mais le moi n'est qu'une petite partie de la psyché, comme une île sur un océan. Autour de lui, et beaucoup plus vaste, il y a l'<b>inconscient</b> : ce que nous avons oublié, ce que nous refusons de voir, et ce qui n'a jamais été conscient.",
      "Le moi se croit souvent le maître de la maison. Les lapsus, les oublis, les colères soudaines, les rêves lui rappellent qu'il ne l'est pas. Toute la psychologie de Jung est une négociation entre ce moi et ce qui le dépasse.",
      "La psychologie actuelle dit des choses proches avec d'autres mots : une grande part de nos perceptions, de nos jugements et de nos gestes se fait sans que nous en ayons conscience. Le moi arrive souvent après, pour expliquer."],
     source:{txt:"Le moi n'est pas maître dans sa propre maison.", ref:"Sigmund Freud, Une difficulté de la psychanalyse, 1917", st:"doc"},
     ex:{t:"Le maître de maison", txt:"Note une chose que tu as faite cette semaine sans l'avoir vraiment décidée : un mot qui t'a échappé, un achat, une colère. Qui a agi ?"},
     carnet:"Ce que j'ai fait cette semaine sans l'avoir décidé :"},
    {id:"p2l2", t:"La persona", sous:"Le masque de l'acteur",
     idee:[
      "Dans le théâtre romain, la <b>persona</b> était le masque de l'acteur, celui à travers lequel passait la voix. Jung reprend le mot pour désigner le visage que nous montrons au monde : le professionnel, le parent, l'ami drôle, l'élève sérieux.",
      "La persona n'est pas un mensonge. C'est un compromis utile entre ce que nous sommes et ce que la société attend. On ne parle pas à un client comme à un frère ; on ne se présente pas en entretien comme au comptoir d'un bar.",
      "Chacun a plusieurs masques, selon les lieux. Un comédien, un animateur ou un serveur le savent bien : on « entre en scène » en passant une porte, on change de voix, de posture, de vocabulaire.",
      "Les réseaux sociaux ont fait de la persona un objet travaillé, photographié, mesuré. Jung n'en parlait pas, mais sa notion aide à les regarder : quelle image montres-tu, et à qui ?"],
     source:{txt:"Persona : le masque que portait l'acteur et qui faisait résonner sa voix.", ref:"Étymologie traditionnelle, rapportée par Aulu-Gelle, Nuits attiques, V, 7", st:"trad"},
     ex:{t:"Tes masques", txt:"Écris trois lieux où tu passes du temps (travail, famille, amis…). Pour chacun, trois mots qui décrivent la persona que tu y portes."},
     carnet:"Mes trois masques, et les trois mots de chacun :"},
    {id:"p2l3", t:"Quand le masque colle", sous:"Identification et inflation",
     idee:[
      "Le danger, pour Jung, n'est pas d'avoir une persona, mais de s'y <b>identifier</b>. Le directeur qui reste directeur à table, le médecin qui ne sait plus être malade, le comique qui ne peut jamais être triste : le masque a collé au visage.",
      "Le jour où le rôle disparaît, retraite, licenciement, rupture, enfants partis, il ne reste presque rien, et c'est la crise. Beaucoup de « crises du milieu de la vie », que Jung a été l'un des premiers à décrire, commencent là.",
      "À l'inverse, certains refusent tout masque et souffrent d'être exposés sans protection. Une persona souple, qu'on peut mettre et retirer, est un signe de santé.",
      "Jung parle aussi d'<b>inflation</b> quand le moi se gonfle d'un rôle trop grand pour lui : se prendre pour le sauveur, le génie, le gourou. Le mot est resté dans la psychologie des groupes et des sectes."],
     source:{txt:"La persona est un compromis entre l'individu et la société.", ref:"D'après C. G. Jung, Dialectique du moi et de l'inconscient, 1928", st:"doc"},
     ex:{t:"Sans le masque", txt:"Imagine que ton métier ou ton rôle principal disparaisse demain. Qu'est-ce qui resterait de toi ? Écris-le sans te juger."},
     carnet:"Ce qui resterait de moi sans mon rôle principal :"}
   ],
   quiz:[
    {q:"Que désignait la persona dans le théâtre romain ?", r:["Le masque de l'acteur","Le décor","Le chœur","Le rideau"], ok:0, exp:"Un masque à travers lequel passait la voix."},
    {q:"Selon Jung, quel est le danger lié à la persona ?", r:["S'y identifier complètement","En avoir une","En avoir plusieurs","La montrer au travail"], ok:0, exp:"Le masque qui colle au visage laisse démuni le jour où le rôle disparaît."},
    {q:"Comment Jung appelle-t-il le moi gonflé d'un rôle trop grand ?", r:["L'inflation","La projection","La compensation","La sublimation"], ok:0, exp:"Se prendre pour le sauveur ou le génie, par exemple."},
    {q:"Qui a écrit que le moi n'est pas maître dans sa propre maison ?", r:["Freud","Jung","Descartes","Pascal"], ok:0, exp:"En 1917, dans Une difficulté de la psychanalyse."}
   ]});

  mod({id:"p3", n:"III", lieu:"etage", t:"Les types psychologiques", sous:"Introvertis, extravertis, et quatre fonctions",
   lecons:[
    {id:"p3l1", t:"Introversion et extraversion", sous:"Deux directions de l'énergie",
     idee:[
      "En 1921, Jung publie <i>Types psychologiques</i>. Il y cherche à comprendre pourquoi Freud, Adler et lui voient les mêmes patients si différemment. Sa réponse : nous ne regardons pas le monde avec la même orientation.",
      "L'<b>extraverti</b> tourne son énergie vers le dehors : les gens, les choses, l'action. Il se recharge au contact des autres. L'<b>introverti</b> la tourne vers le dedans : les idées, les impressions, la réflexion. Il se recharge seul.",
      "Personne n'est entièrement l'un ou l'autre. Jung parle d'attitudes dominantes, et pense que l'attitude négligée vit dans l'inconscient : l'extraverti a des moments d'introversion maladroits, l'introverti des élans d'extraversion qui le surprennent.",
      "C'est l'idée de Jung la mieux confirmée par la recherche. L'extraversion est l'un des cinq grands traits de personnalité que mesure la psychologie actuelle, avec des résultats solides. Mais on la voit comme un continuum, pas comme deux types."],
     source:{txt:"Il n'existe pas d'introverti ni d'extraverti pur : un tel homme serait à l'asile.", ref:"D'après C. G. Jung, entretien de 1957 avec Richard Evans", st:"doc"},
     ex:{t:"Te recharger", txt:"Après une semaine fatigante, qu'est-ce qui te recharge vraiment : une soirée avec du monde ou une soirée seul ? Note trois exemples récents."},
     carnet:"Ce qui me recharge vraiment :"},
    {id:"p3l2", t:"Les quatre fonctions", sous:"Penser, sentir, percevoir, pressentir",
     idee:[
      "Jung ajoute quatre <b>fonctions</b>. Deux servent à percevoir : la <b>sensation</b>, qui dit ce qui est là, par les cinq sens, et l'<b>intuition</b>, qui devine ce qui pourrait être, les possibles, les liens cachés.",
      "Deux servent à juger : la <b>pensée</b>, qui dit ce qu'une chose est, par la logique, et le <b>sentiment</b>, qui dit ce qu'elle vaut, agréable ou non, juste ou non. Pour Jung, le sentiment est un jugement de valeur, pas une émotion.",
      "Chacun aurait une fonction dominante, une ou deux auxiliaires, et une fonction <b>inférieure</b>, la moins développée, qui reste dans l'ombre. Le penseur brillant peut être maladroit avec ses émotions ; l'intuitif visionnaire peut oublier de payer ses factures.",
      "Jung dispose ces fonctions en croix, la pensée face au sentiment, la sensation face à l'intuition. On retrouve là son goût pour les quaternités, qu'il voyait aussi dans les quatre éléments ou les quatre évangélistes."],
     source:{txt:"La sensation constate ce qui est, la pensée dit ce que c'est, le sentiment ce que ça vaut, l'intuition d'où ça vient et où ça va.", ref:"D'après C. G. Jung, L'Homme et ses symboles, 1964, résumé pour Arcanes", st:"mod"},
     schema:"croix",
     ex:{t:"Ta fonction inférieure", txt:"Dans la croix des fonctions, laquelle te semble la plus naturelle, et laquelle la plus difficile ? Pense à une situation où cette dernière t'a manqué."},
     carnet:"Ma fonction la plus naturelle, et la plus difficile :"},
    {id:"p3l3", t:"Ce que les tests en ont fait", sous:"Du livre de Jung au MBTI",
     idee:[
      "Dans les années 1940, deux Américaines, <b>Katharine Briggs</b> et sa fille <b>Isabel Myers</b>, tirent des types de Jung un questionnaire : le <b>MBTI</b>. Il range chacun dans l'un de seize types de quatre lettres, comme INFP ou ESTJ. Il est devenu l'un des tests les plus utilisés en entreprise.",
      "Les psychologues sont sévères. Une même personne obtient souvent un autre type quelques semaines plus tard. Les traits mesurés sont continus : couper au milieu fabrique des catégories là où il y a des nuances. Et le type prédit mal les performances au travail.",
      "Jung lui-même se méfiait des cases. Il voyait ses types comme une boussole pour s'orienter, pas comme une étiquette. Le modèle le plus étudié aujourd'hui, celui des <b>cinq grands traits</b>, garde l'extraversion, mais sans types.",
      "Ce qu'on peut retenir : ces outils aident à parler des différences, à comprendre qu'un collègue ne fonctionne pas comme soi. Ils deviennent nuisibles quand ils servent à trier les gens ou à s'excuser : « je suis comme ça, c'est mon type »."],
     source:{txt:"Les classifications ne servent à rien si l'on ne voit que des étiquettes.", ref:"D'après C. G. Jung, avant-propos à l'édition argentine des Types psychologiques, 1934", st:"mod"},
     ex:{t:"Au-delà de l'étiquette", txt:"Si tu as déjà fait un test de personnalité, note ton résultat. Puis écris une situation où tu t'es comporté à l'opposé. Que dit cet écart ?"},
     carnet:"Mon étiquette, et la fois où je l'ai contredite :"}
   ],
   quiz:[
    {q:"En quelle année paraissent les Types psychologiques ?", r:["1921","1900","1944","1961"], ok:0, exp:"Jung y cherche pourquoi Freud, Adler et lui voient les patients différemment."},
    {q:"Pour Jung, le « sentiment » est…", r:["Un jugement de valeur","Une émotion","Une intuition","Une sensation physique"], ok:0, exp:"Il dit ce qu'une chose vaut, pas ce qu'on ressent."},
    {q:"Quelle notion de Jung est la mieux confirmée par la recherche ?", r:["L'extraversion","La fonction inférieure","L'anima","La synchronicité"], ok:0, exp:"Elle fait partie des cinq grands traits, mesurée comme un continuum."},
    {q:"Que reproche-t-on surtout au MBTI ?", r:["Des résultats qui changent d'une fois à l'autre","D'être trop long","D'être trop récent","D'être secret"], ok:0, exp:"Sa fidélité test-retest est faible, et il coupe des traits continus en catégories."}
   ]});

  mod({id:"p4", n:"IV", lieu:"rdc", t:"Les complexes", sous:"Ce qui nous fait trébucher sur un mot",
   lecons:[
    {id:"p4l1", t:"L'expérience des associations", sous:"Un chronomètre et cent mots",
     idee:[
      "Au Burghölzli, à partir de 1904, Jung et Franz Riklin reprennent une expérience de laboratoire : on lit au sujet un mot, « tête », « vert », « eau », et il doit répondre le plus vite possible par le premier mot qui lui vient. Un chronomètre mesure le temps de réaction.",
      "Le plus souvent, la réponse vient en une à deux secondes. Mais parfois, le sujet hésite, rougit, rit, répète le mot, répond à côté, ou oublie ensuite ce qu'il a répondu. Jung appelle ces accidents des <b>indicateurs de complexe</b>.",
      "En regroupant les mots qui font trébucher, il voit apparaître des thèmes : l'argent, un mariage, une dispute avec un frère, un secret. Le sujet ne les avait pas mentionnés, mais ils pesaient sur lui. Le test a même servi, à l'époque, à confondre un voleur.",
      "Ces travaux, publiés en 1906, rendent Jung célèbre et le rapprochent de Freud, qui y voit une preuve expérimentale du refoulement. Le test d'associations, dans le carnet, te permet d'en faire l'expérience, à titre de curiosité."],
     source:{txt:"Tête. Vert. Eau. Chanter. Mort. Long. Bateau. Payer.", ref:"Les huit premiers mots de la liste de Jung, Études diagnostiques sur les associations, 1906", st:"doc"},
     ex:{t:"Faire le test", txt:"Fais le test d'associations, au calme, sans tricher. Regarde ensuite les mots marqués : ont-ils quelque chose en commun ?", outil:"outil:assoc"},
     carnet:"Les mots qui m'ont fait trébucher, et ce qu'ils ont en commun :"},
    {id:"p4l2", t:"Ce qu'est un complexe", sous:"Un nœud d'images et d'émotions",
     idee:[
      "Un <b>complexe</b>, pour Jung, est un ensemble d'idées, de souvenirs et d'images chargés d'une même émotion, souvent pénible. Il se forme autour d'une expérience forte : une humiliation, une perte, un conflit qui n'a pas trouvé de solution.",
      "Tout le monde a des complexes. Le complexe paternel ou maternel, le complexe d'infériorité (un mot d'Alfred Adler), le complexe de l'argent, de l'échec, du corps. Ils ne sont pas des maladies : ce sont les points sensibles de la psyché.",
      "On reconnaît un complexe à ses effets : une réaction disproportionnée, toujours la même, devant un certain type de situation. Un mot de travers d'un chef, et c'est l'enfant grondé qui répond. Un retard de l'autre, et c'est la peur d'être abandonné.",
      "Le mot a fait fortune, au point de devenir banal (« avoir des complexes »). Jung lui donnait un sens plus précis : une petite personnalité secondaire, avec ses souvenirs et sa logique, qui peut prendre la parole à notre place."],
     source:{txt:"Le complexe est l'image d'une situation psychique fortement chargée d'émotion.", ref:"D'après C. G. Jung, Considérations générales sur la théorie des complexes, 1934", st:"doc"},
     ex:{t:"Ta réaction disproportionnée", txt:"Pense à une situation qui déclenche chez toi, chaque fois, une réaction trop forte. Décris la situation, la réaction, et l'âge que tu as à ce moment-là, intérieurement."},
     carnet:"La situation qui me fait toujours trop réagir, et l'âge que j'ai alors :"},
    {id:"p4l3", t:"« Les complexes nous ont »", sous:"L'autonomie de l'inconscient",
     idee:[
      "Jung aimait dire que ce n'est pas nous qui avons des complexes, mais les complexes qui nous ont. Ils agissent comme des personnes autonomes : ils surgissent sans être appelés, et le moi est momentanément « possédé ».",
      "Cette idée le rapproche de son maître parisien, <b>Pierre Janet</b>, qui parlait de « dissociation » : des parties de l'esprit fonctionnent séparément de la conscience. Elle explique pour Jung les voix des médiums, les personnalités multiples, mais aussi les rêves, où nos complexes deviennent des personnages.",
      "Que faire d'un complexe ? Pas le supprimer : c'est impossible. Le <b>reconnaître</b>, le nommer, lui donner une forme par l'écriture ou le dessin, dialoguer avec lui. Un complexe qu'on connaît garde son émotion, mais perd une partie de son pouvoir.",
      "Les thérapies actuelles disent souvent la même chose avec d'autres mots : repérer les « schémas » ou les « déclencheurs », observer la réaction au lieu de la subir. Le vocabulaire a changé, l'intuition reste."],
     source:{txt:"Ce n'est pas nous qui avons des complexes, ce sont les complexes qui nous ont.", ref:"D'après C. G. Jung, Considérations générales sur la théorie des complexes, 1934", st:"doc"},
     ex:{t:"Donner un nom", txt:"Donne un nom de personnage à ton complexe de la leçon précédente, comme dans un conte : « le Juge », « l'Orphelin », « la Petite Voix ». Écris trois phrases qu'il dit souvent."},
     carnet:"Le nom de mon complexe, et les trois phrases qu'il répète :"}
   ],
   quiz:[
    {q:"Que mesure l'expérience des associations ?", r:["Le temps de réaction à un mot","La mémoire des rêves","Le quotient intellectuel","La fréquence cardiaque seule"], ok:0, exp:"Une hésitation, une réponse bizarre ou un oubli signalent un complexe."},
    {q:"Avec qui Jung mène-t-il ces expériences ?", r:["Franz Riklin","Sigmund Freud","Pierre Janet","Alfred Adler"], ok:0, exp:"Au Burghölzli, à partir de 1904."},
    {q:"D'où vient l'expression « complexe d'infériorité » ?", r:["D'Alfred Adler","De Jung","De Freud","De Charcot"], ok:0, exp:"Adler, autre dissident de Freud, a fondé la psychologie individuelle."},
    {q:"Que conseille Jung face à un complexe ?", r:["Le reconnaître et dialoguer avec lui","Le supprimer","L'ignorer","Le cacher aux autres"], ok:0, exp:"Un complexe connu garde son émotion mais perd une partie de son pouvoir."}
   ]});

  mod({id:"p5", n:"V", lieu:"rdc", t:"L'ombre", sous:"Ce que nous ne voulons pas être",
   lecons:[
    {id:"p5l1", t:"Le côté sombre", sous:"Tout ce que le moi refuse",
     idee:[
      "L'<b>ombre</b>, pour Jung, rassemble tout ce que nous ne voulons pas être : les traits jugés honteux, faibles, méchants, ridicules, que l'éducation nous a appris à cacher. Ils n'ont pas disparu : ils vivent dans l'inconscient personnel.",
      "Chacun a son ombre propre. Pour quelqu'un d'élevé dans la douceur, elle contiendra la colère ; pour quelqu'un d'élevé dans la compétition, la vulnérabilité ; pour un enfant sage, la paresse ou l'insolence. L'ombre est le négatif de la persona.",
      "Elle apparaît dans les rêves sous la forme d'un personnage du même sexe que le rêveur, souvent inquiétant ou méprisé : un voleur, un clochard, un frère jaloux, un double. La littérature l'a mise en scène bien avant Jung : Dr Jekyll et Mr Hyde, Le Horla, le Portrait de Dorian Gray.",
      "Rencontrer son ombre est, pour Jung, la première épreuve du chemin intérieur. Ce n'est pas agréable : cela demande d'admettre qu'on est capable de ce qu'on condamne chez les autres."],
     source:{txt:"Je ne suis pas sûr d'être réellement moi.", ref:"Guy de Maupassant, Le Horla, 1887", st:"doc"},
     ex:{t:"Le personnage méprisé", txt:"Quel type de personne méprises-tu le plus ? Décris-la en cinq adjectifs. Garde la liste : elle servira pour le miroir de l'ombre.", outil:"outil:ombre"},
     carnet:"Le type de personne que je méprise, en cinq adjectifs :"},
    {id:"p5l2", t:"La projection", sous:"La paille et la poutre",
     idee:[
      "Ce que nous refusons en nous, nous le voyons chez les autres. C'est la <b>projection</b> : comme un projecteur de cinéma, l'inconscient envoie son image sur l'écran d'autrui. L'Évangile le disait déjà : on voit la paille dans l'œil du voisin, pas la poutre dans le sien.",
      "Le signe d'une projection, c'est l'excès d'émotion. Un défaut chez quelqu'un nous agace normalement ; s'il nous obsède, nous enrage, nous fascine, il y a de bonnes chances qu'il touche notre ombre.",
      "Les groupes aussi projettent leur ombre : sur une minorité, un pays voisin, un bouc émissaire. Jung, qui a vécu deux guerres mondiales, voyait là un des grands dangers collectifs. Reconnaître son ombre, c'est aussi désarmer un peu les haines.",
      "Attention à l'excès inverse : tout ce qui nous dérange chez les autres n'est pas une projection. Certaines personnes sont réellement injustes ou dangereuses. La question n'est pas « ai-je raison d'être en colère ? », mais « pourquoi cette colère est-elle si forte ? »."],
     source:{txt:"Pourquoi vois-tu la paille qui est dans l'œil de ton frère, et n'aperçois-tu pas la poutre qui est dans ton œil ?", ref:"Évangile selon Matthieu, 7, 3, traduction Louis Segond", st:"doc"},
     ex:{t:"Le miroir", txt:"Ouvre le miroir de l'ombre. Reprends un trait qui t'agace fortement chez quelqu'un, et cherche honnêtement quand tu as pu, toi aussi, te comporter ainsi.", outil:"outil:ombre"},
     carnet:"Le trait qui m'agace chez l'autre, et quand je l'ai eu moi aussi :"},
    {id:"p5l3", t:"L'or dans l'ombre", sous:"Ce que l'ombre cache de précieux",
     idee:[
      "L'ombre ne contient pas que du mauvais. Elle contient aussi des qualités que nous n'avons pas eu le droit de développer : la colère qui pourrait devenir courage, l'égoïsme qui pourrait devenir le droit de dire non, la paresse qui pourrait devenir le repos.",
      "Les jungiens parlent de l'<b>or dans l'ombre</b>. Celui qui admire passionnément quelqu'un projette aussi : il voit chez l'autre une qualité qu'il porte sans le savoir. L'admiration excessive est l'autre face de la projection.",
      "Intégrer l'ombre ne veut pas dire lui obéir. Il ne s'agit pas de devenir méchant, mais de devenir <b>entier</b> : connaître sa colère pour la diriger, connaître sa paresse pour se reposer avant l'épuisement.",
      "Jung voyait dans l'alchimie une image de ce travail : la première étape de l'Œuvre, la <i>nigredo</i>, l'œuvre au noir, est une descente dans la pourriture d'où sortira la pierre. L'univers Alchimie d'Arcanes te la fait traverser."],
     source:{txt:"On ne devient pas lumineux en imaginant des figures de lumière, mais en rendant l'obscurité consciente.", ref:"D'après C. G. Jung, L'Arbre philosophique, 1945", st:"doc"},
     ex:{t:"Ce que j'admire trop", txt:"Pense à une personne que tu admires énormément. Quelle qualité vois-tu chez elle ? Où cette qualité existe-t-elle, en petit, chez toi ?"},
     carnet:"La qualité que j'admire trop chez quelqu'un, et sa graine en moi :"}
   ],
   quiz:[
    {q:"Que rassemble l'ombre ?", r:["Ce que nous ne voulons pas être","Nos souvenirs d'enfance heureux","Les images de l'humanité entière","Nos rêves prémonitoires"], ok:0, exp:"Les traits refusés, qui vivent dans l'inconscient personnel."},
    {q:"Quel est le signe d'une projection ?", r:["Un excès d'émotion face à un trait","Une indifférence","Un oubli","Un rêve récurrent"], ok:0, exp:"Si un défaut chez l'autre nous obsède, il touche peut-être notre ombre."},
    {q:"Dans les rêves, l'ombre apparaît souvent comme…", r:["Un personnage du même sexe, inquiétant","Un vieux sage","Un enfant divin","Un mandala"], ok:0, exp:"Un voleur, un double, un frère jaloux."},
    {q:"Que signifie « l'or dans l'ombre » ?", r:["Les qualités cachées dans l'ombre","Un trésor alchimique","La richesse matérielle","La sagesse des anciens"], ok:0, exp:"La colère peut devenir courage, l'égoïsme le droit de dire non."}
   ]});

  mod({id:"p6", n:"VI", lieu:"cave", t:"Le rêve selon Jung", sous:"Une lettre de l'inconscient",
   lecons:[
    {id:"p6l1", t:"Freud et Jung devant le rêve", sous:"Un désir caché, ou une compensation ?",
     idee:[
      "En 1900, Freud publie <i>L'Interprétation du rêve</i>. Pour lui, le rêve est la réalisation déguisée d'un désir refoulé. Le récit qu'on se rappelle est un contenu « manifeste », un masque ; il faut remonter par les associations libres jusqu'au contenu « latent ».",
      "Jung s'écarte de cette idée. Pour lui, le rêve ne cache pas : il <b>montre</b>, dans la langue des images, qui n'est pas celle de la logique. Il ne faut pas le décoder comme un message chiffré, mais le lire comme un poème.",
      "Surtout, le rêve <b>compense</b>. Il équilibre ce que la conscience exagère ou néglige. Celui qui se croit très fort rêve qu'il tombe ; celui qui se méprise rêve parfois qu'il est couronné. Le rêve fait le contrepoids, comme un régulateur.",
      "La question à poser à un rêve n'est donc pas seulement « pourquoi ? » mais « pour quoi ? » : qu'essaie-t-il de me montrer que je ne vois pas ? Cette question vaut même pour qui ne suit ni Freud ni Jung."],
     source:{txt:"Le rêve est la voie royale qui mène à la connaissance de l'inconscient.", ref:"Sigmund Freud, L'Interprétation du rêve, 1900, chapitre VII", st:"doc"},
     ex:{t:"Le contrepoids", txt:"Note ton dernier rêve dans le journal. Puis demande-toi : qu'est-ce que je pensais de moi, ou de cette situation, la veille ? Le rêve dit-il le contraire ?", outil:"outil:reves"},
     carnet:"Ce que mon rêve compense peut-être :"},
    {id:"p6l2", t:"Les deux niveaux", sous:"L'objet et le sujet",
     idee:[
      "Jung propose de lire chaque rêve à deux niveaux. Au <b>niveau de l'objet</b>, les personnages sont les personnes réelles : si je rêve de ma sœur, le rêve parle de ma relation avec elle.",
      "Au <b>niveau du sujet</b>, chaque personnage est une partie de moi. Ma sœur, dans le rêve, peut représenter ce que je partage avec elle, ou ce qu'elle incarne pour moi : la rivalité, la tendresse, l'audace. Le rêve devient un théâtre intérieur.",
      "Les deux lectures se complètent. Quand le personnage est quelqu'un de proche et d'important, on commence souvent par le niveau de l'objet. Quand c'est un inconnu, une figure lointaine ou historique, le niveau du sujet est presque toujours le plus fécond.",
      "Le niveau du sujet change tout : la poursuite par un monstre devient la fuite devant une part de soi ; la maison en ruine devient l'état de son propre intérieur. Le rêveur cesse d'être spectateur."],
     source:{txt:"Le rêve est une pièce de théâtre intérieure, dont le rêveur est à la fois l'auteur, l'acteur et le public.", ref:"D'après C. G. Jung, Considérations générales sur la psychologie du rêve, 1928", st:"mod"},
     ex:{t:"Tous les rôles", txt:"Reprends un rêve et, pour chaque personnage, écris une phrase en commençant par « la partie de moi qui… »."},
     carnet:"Les personnages de mon rêve, comme parties de moi :"},
    {id:"p6l3", t:"Amplifier", sous:"Et lire les rêves en série",
     idee:[
      "Freud demandait au rêveur d'associer librement à partir de chaque élément, chaîne après chaîne. Jung préfère l'<b>amplification</b> : on reste près de l'image et on l'enrichit, d'abord avec les associations personnelles, puis avec ce que les mythes, les contes, les religions ont fait de cette image.",
      "Si tu rêves d'un serpent, tu notes d'abord ce que le serpent t'évoque à toi. Puis tu te rappelles le serpent de la Genèse, celui d'Asclépios qui guérit, l'ouroboros qui se mord la queue, la mue qui renouvelle. L'image s'ouvre, sans qu'on lui impose un sens.",
      "Jung insiste sur la <b>série</b> : un rêve isolé est difficile à comprendre, mais vingt rêves notés sur quelques mois montrent des thèmes qui reviennent et évoluent. C'est pourquoi le journal de rêves est son outil de base.",
      "La recherche moderne sur le rêve, fondée sur des milliers de récits, retrouve une partie de cette intuition : les rêves reflètent les préoccupations de la vie éveillée, ses personnes et ses émotions. C'est l'« hypothèse de continuité »."],
     source:{txt:"Il faut s'en tenir à l'image.", ref:"D'après C. G. Jung, séminaires sur les rêves d'enfants, 1936-1940", st:"mod"},
     ex:{t:"Amplifier un symbole", txt:"Dans le journal de rêves, note un rêve, puis ouvre l'amplification de l'un de ses symboles. Écris d'abord tes associations à toi, avant de lire les mythes.", outil:"outil:reves"},
     carnet:"Un symbole de mes rêves, mes associations, puis ce que disent les mythes :"}
   ],
   quiz:[
    {q:"Pour Freud, le rêve est…", r:["La réalisation déguisée d'un désir","Une compensation","Un message des dieux","Un bruit du cerveau"], ok:0, exp:"Dans L'Interprétation du rêve, 1900."},
    {q:"Pour Jung, la fonction principale du rêve est…", r:["De compenser la conscience","De réaliser un désir","De prédire l'avenir","De nettoyer la mémoire"], ok:0, exp:"Il équilibre ce que la conscience exagère ou néglige."},
    {q:"Lire un rêve « au niveau du sujet », c'est…", r:["Voir chaque personnage comme une partie de soi","Analyser les personnes réelles","Chercher un désir sexuel","Compter les symboles"], ok:0, exp:"Le rêve devient un théâtre intérieur."},
    {q:"Qu'est-ce que l'amplification ?", r:["Enrichir une image par les mythes et les associations","Augmenter la durée du sommeil","Associer librement d'un mot à l'autre","Répéter un rêve"], ok:0, exp:"On reste près de l'image au lieu de s'en éloigner."}
   ]});

  mod({id:"p7", n:"VII", lieu:"cave", t:"Anima et animus", sous:"L'image intérieure de l'autre",
   lecons:[
    {id:"p7l1", t:"L'image intérieure", sous:"Une figure qui mène vers l'inconscient",
     idee:[
      "Dans les rêves des hommes qu'il soigne, Jung remarque une figure féminine récurrente, inconnue, tantôt séduisante, tantôt inquiétante : il l'appelle l'<b>anima</b>, « l'âme » en latin. Dans les rêves des femmes, il décrit une figure masculine, l'<b>animus</b>, « l'esprit ».",
      "Ces figures ne représentent pas une personne réelle. Elles incarnent ce qui, dans la psyché, est le plus éloigné du moi conscient. Elles servent de <b>guide</b> vers l'inconscient, comme Béatrice qui conduit Dante au Paradis.",
      "Jung décrit des étapes : l'anima peut prendre les traits d'Ève, de la séductrice, de la Vierge, de la Sagesse ; l'animus, ceux de l'athlète, de l'homme d'action, du professeur, du guide spirituel.",
      "Ces descriptions reflètent beaucoup l'époque de Jung, nous y reviendrons. Mais l'idée d'une figure intérieure, à la fois étrangère et familière, qui nous attire vers ce que nous ne connaissons pas de nous, reste féconde."],
     source:{txt:"Au milieu du chemin de notre vie, je me retrouvai par une forêt obscure.", ref:"Dante, La Divine Comédie, Enfer, chant I, traduction de Lamennais, 1863", st:"doc"},
     ex:{t:"La figure inconnue", txt:"Dans tes rêves, y a-t-il une figure inconnue qui revient, attirante ou troublante ? Décris-la : âge, voix, ce qu'elle fait, ce qu'elle semble vouloir."},
     carnet:"La figure inconnue de mes rêves :"},
    {id:"p7l2", t:"Projections amoureuses", sous:"Tomber amoureux d'une image",
     idee:[
      "Comme l'ombre, l'anima et l'animus se <b>projettent</b>. Le coup de foudre, pour Jung, est souvent la rencontre d'une personne réelle avec l'image intérieure : on ne voit pas l'autre, on voit sa propre figure, et la fascination est immense.",
      "D'où les déceptions qui suivent. Après quelques mois, la personne réelle apparaît sous l'image, avec ses défauts, ses manies, sa liberté. On croit qu'elle a changé ; en réalité, la projection se retire.",
      "Ce moment est décisif. Soit on cherche une nouvelle personne sur qui projeter, et l'on répète la même histoire ; soit on apprend à aimer l'autre tel qu'il est, et à reconnaître en soi ce qu'on lui avait prêté.",
      "La psychologie actuelle parle d'idéalisation et de désidéalisation, et étudie les « modèles » relationnels que chacun reproduit. Le langage est différent, mais l'observation est voisine."],
     source:{txt:"L'amour ne voit pas avec les yeux, mais avec l'âme.", ref:"William Shakespeare, Le Songe d'une nuit d'été, I, 1, 1595, traduction pour Arcanes", st:"doc"},
     ex:{t:"Le portrait commun", txt:"Pense aux personnes qui t'ont le plus fasciné, en amour ou en amitié. Qu'ont-elles en commun ? Ce portrait dit peut-être quelque chose de ton image intérieure."},
     carnet:"Ce qu'ont en commun les personnes qui m'ont fasciné :"},
    {id:"p7l3", t:"Ce qui a vieilli", sous:"Lire Jung avec les yeux d'aujourd'hui",
     idee:[
      "La théorie de l'anima et de l'animus est l'une des plus critiquées de Jung. Elle repose sur des oppositions de son temps : le féminin serait sentiment et relation, le masculin raison et action. Beaucoup de lecteurs y voient des stéréotypes plutôt que des archétypes.",
      "Les jungiens eux-mêmes l'ont révisée. Certains, comme James Hillman, disent que chacun, homme ou femme, a une anima et un animus. D'autres parlent simplement de la figure de l'« autre intérieur », sans genre fixe.",
      "Elle suppose aussi un couple homme-femme comme modèle de base, et dit peu de choses des personnes homosexuelles ou non binaires. Les analystes d'aujourd'hui adaptent ces notions ou les laissent de côté.",
      "Ce qu'on peut garder : l'idée que nous portons des figures intérieures de l'autre, façonnées par notre histoire et notre culture, qui colorent nos rencontres. Ce qu'on peut laisser : la certitude que ces figures ont un sexe et un contenu fixés une fois pour toutes."],
     source:{txt:"Les idées d'un auteur sont aussi celles de son temps.", ref:"Principe d'histoire des idées, formulé pour Arcanes", st:"crit"},
     ex:{t:"Trier", txt:"Relis les deux leçons précédentes. Note une idée qui te parle et une idée qui te semble datée. Tu fais là le travail de l'historien."},
     carnet:"Ce que je garde, et ce que je laisse, de l'anima et de l'animus :"}
   ],
   quiz:[
    {q:"Que signifie anima en latin ?", r:["L'âme","L'esprit","Le souffle de vie","L'animal"], ok:0, exp:"Animus signifie plutôt l'esprit."},
    {q:"Quel personnage Jung cite-t-il comme figure d'anima guide ?", r:["Béatrice, chez Dante","Ève","Pénélope","Jeanne d'Arc"], ok:0, exp:"Elle conduit Dante vers le Paradis."},
    {q:"Que se passe-t-il, pour Jung, dans le coup de foudre ?", r:["On projette son image intérieure sur l'autre","On voit l'autre tel qu'il est","On réalise un désir d'enfance","On rencontre son ombre"], ok:0, exp:"D'où les déceptions quand la projection se retire."},
    {q:"Que reproche-t-on surtout à cette théorie ?", r:["Elle reprend les stéréotypes de genre de son époque","Elle est trop récente","Elle ne parle pas des rêves","Elle est mathématique"], ok:0, exp:"Les jungiens actuels l'ont largement révisée."}
   ]});

  mod({id:"p8", n:"VIII", lieu:"grotte", t:"L'inconscient collectif", sous:"Les archétypes, sous la cave",
   lecons:[
    {id:"p8l1", t:"Sous la cave, la grotte", sous:"Un inconscient qui n'est pas à moi",
     idee:[
      "Sous l'inconscient personnel, fait de nos souvenirs et de nos refoulements, Jung pense trouver une couche plus profonde, commune à tous les humains : l'<b>inconscient collectif</b>. C'est la grotte du rêve de 1909.",
      "Ce qui l'en convainc : des patients psychotiques produisent des images qu'ils ne peuvent pas avoir apprises, et que Jung retrouve dans des mythes anciens. Le cas le plus célèbre est celui d'un patient qui voyait au soleil un pénis d'où naissait le vent, image que Jung dit avoir retrouvée plus tard dans un papyrus mithriaque.",
      "Ce récit a été discuté : le texte du papyrus avait été publié avant que Jung n'en parle, et le patient aurait pu le connaître. Mais l'idée générale reste : les mêmes motifs reviennent dans des cultures qui ne se sont jamais rencontrées, le déluge, le héros qui descend aux enfers, la mère terrible, l'arbre du monde.",
      "Jung appelle <b>archétypes</b> ces formes communes. L'inconscient collectif n'est pas un réservoir d'images toutes faites ; c'est, dit-il, une disposition à former certaines images, comme le corps a une disposition à marcher."],
     source:{txt:"L'inconscient collectif ne se développe pas individuellement ; il est hérité.", ref:"D'après C. G. Jung, Le concept d'inconscient collectif, 1936", st:"doc"},
     ex:{t:"Un motif partagé", txt:"Choisis un motif : le déluge, la descente aux enfers, le serpent, l'arbre du monde. Cherche-le dans deux cultures différentes. Qu'ont-elles en commun ?"},
     carnet:"Le motif que j'ai suivi, et ce qu'il garde d'une culture à l'autre :"},
    {id:"p8l2", t:"Les figures", sous:"La Mère, le Vieux Sage, l'Enfant, le Fripon, le Héros",
     idee:[
      "Jung et ses élèves décrivent de nombreux archétypes. La <b>Grande Mère</b>, qui nourrit et dévore : Déméter, la Vierge, Kali, la sorcière des contes. Le <b>Vieux Sage</b>, qui conseille au moment critique : Merlin, Gandalf, l'Ermite du tarot.",
      "L'<b>Enfant divin</b>, fragile et promis à un grand avenir : Moïse sauvé des eaux, l'enfant de la crèche, Hercule qui étrangle les serpents au berceau. Le <b>Fripon</b> (le <i>trickster</i>), qui renverse l'ordre en riant : Hermès, Loki, Renart, le Bateleur.",
      "Le <b>Héros</b> qui quitte sa maison, affronte le monstre, descend dans l'abîme et revient transformé. En 1949, Joseph Campbell, nourri de Jung, en tire le « monomythe », que Hollywood a abondamment utilisé pour écrire ses scénarios.",
      "Le tarot se prête particulièrement à cette lecture. Jung l'évoque lui-même dans un séminaire de 1933 comme un ensemble d'images archétypiques. La carte du jour, dans Psyché, te propose chaque jour un archétype à méditer."],
     source:{txt:"Un héros s'aventure hors du monde quotidien dans un domaine de merveilles surnaturelles.", ref:"D'après Joseph Campbell, Le Héros aux mille et un visages, 1949", st:"doc"},
     ex:{t:"Ton héros", txt:"Pense à un film ou un roman que tu aimes. Repère le héros, le vieux sage, le fripon, l'ombre. Qui, parmi eux, te ressemble le plus ?"},
     carnet:"Les archétypes de mon histoire préférée, et celui qui me ressemble :"},
    {id:"p8l3", t:"Hérédité ou culture ?", sous:"Le débat sur les archétypes",
     idee:[
      "L'idée d'archétypes hérités pose un problème. Comment des images, ou même des dispositions à des images, se transmettraient-elles par les gènes ? Jung reste flou, et certains critiques lui reprochent une biologie imaginaire.",
      "D'autres explications existent. Les humains partagent un corps, des parents, une mort, un ciel, des saisons : il est normal qu'ils inventent des histoires semblables. Les mythes voyagent aussi bien plus qu'on ne le croyait, avec le commerce et les migrations.",
      "Les sciences cognitives proposent une version prudente : notre cerveau a des préférences pour certaines formes, les visages, les agents cachés, les récits avec un but. Ces préférences expliqueraient pourquoi certains motifs reviennent sans supposer une mémoire de l'espèce.",
      "Pour Arcanes, les archétypes sont un outil de <b>lecture</b> très riche : ils aident à reconnaître des structures dans les rêves, les contes et les cartes. Leur statut biologique reste une question ouverte, et il est honnête de le dire."],
     source:{txt:"Les mythes se pensent dans les hommes, et à leur insu.", ref:"D'après Claude Lévi-Strauss, Le Cru et le Cuit, 1964", st:"crit"},
     ex:{t:"Deux explications", txt:"Pour le motif choisi à la première leçon, écris deux explications : l'une par un archétype, l'autre par l'histoire ou la culture. Laquelle te convainc le plus, et pourquoi ?"},
     carnet:"Mes deux explications du même motif :"}
   ],
   quiz:[
    {q:"Qu'est-ce que l'inconscient collectif ?", r:["Une couche commune à tous les humains","La somme des souvenirs d'un groupe","L'opinion publique","L'inconscient d'une famille"], ok:0, exp:"La grotte du rêve de 1909, sous l'inconscient personnel."},
    {q:"Quel archétype renverse l'ordre en riant ?", r:["Le Fripon, ou trickster","Le Vieux Sage","La Grande Mère","L'Enfant divin"], ok:0, exp:"Hermès, Loki, Renart, le Bateleur."},
    {q:"Qui a tiré de Jung le « monomythe » du héros ?", r:["Joseph Campbell","James Hillman","Mircea Eliade","Carl Rogers"], ok:0, exp:"Dans Le Héros aux mille et un visages, 1949."},
    {q:"Que reproche-t-on à l'idée d'archétypes hérités ?", r:["On ne voit pas comment des images se transmettraient","Elle est trop simple","Elle est mathématique","Elle ignore les mythes"], ok:0, exp:"D'autres explications passent par la culture ou les préférences du cerveau."}
   ]});

  mod({id:"p9", n:"IX", lieu:"grotte", t:"Le Soi et l'individuation", sous:"Devenir entier, pas parfait",
   lecons:[
    {id:"p9l1", t:"Le Soi", sous:"Le centre et la totalité",
     idee:[
      "Au-delà du moi, Jung place le <b>Soi</b> (avec une majuscule) : à la fois le centre et la totalité de la psyché, conscient et inconscient réunis. Le moi est à la surface ; le Soi est l'ensemble, et son principe d'ordre.",
      "Le Soi apparaît dans les rêves sous des formes de totalité ou de valeur suprême : un cercle, un carré, une pierre précieuse, un enfant divin, un vieillard lumineux, une ville à quatre portes, un arbre au centre du monde.",
      "Jung reconnaît que le Soi ressemble beaucoup à ce que les religions appellent Dieu ou l'âme. Il refuse de trancher : il dit seulement que, psychologiquement, l'image de Dieu et l'image du Soi sont difficiles à distinguer.",
      "Cette prudence lui a valu des critiques des deux côtés : les théologiens lui reprochaient de réduire Dieu à la psyché, les scientifiques de faire entrer la religion dans la psychologie."],
     source:{txt:"Le Soi n'est pas seulement le centre, mais aussi toute la circonférence.", ref:"D'après C. G. Jung, Psychologie et alchimie, 1944", st:"doc"},
     ex:{t:"Le centre", txt:"Qu'est-ce qui, dans ta vie, te donne le sentiment d'être « au centre », entier ? Un lieu, une activité, une personne, un moment ?"},
     carnet:"Ce qui me donne le sentiment d'être entier :"},
    {id:"p9l2", t:"Les mandalas", sous:"1916-1918, un cercle par jour",
     idee:[
      "Pendant la crise qui suit sa rupture avec Freud, Jung dessine presque chaque matin, dans un carnet, un petit cercle rempli de formes. Il ne sait pas pourquoi. En 1918, commandant d'un camp d'internés à Château-d'Œx, il continue.",
      "Peu à peu, il comprend que ces cercles reflètent son état intérieur du jour : apaisé, ils sont harmonieux ; troublé, ils se brisent. Plus tard, il découvre le mot sanskrit <b>mandala</b>, « cercle », et les mandalas tibétains, qui sont des supports de méditation.",
      "Pour Jung, le mandala est une image spontanée du Soi : la psyché, quand elle se réorganise, dessine un centre et une enceinte. Il en a recueilli des centaines chez ses patients, de toutes cultures.",
      "Dessiner un mandala est devenu un exercice courant en art-thérapie. Il n'a rien de magique : c'est une manière de concentrer l'attention, de laisser venir des formes, et de regarder ce qu'elles disent de son humeur. L'atelier du mandala, dans Psyché, est fait pour cela."],
     source:{txt:"Mandala : en sanskrit, « cercle ».", ref:"Étymologie", st:"doc"},
     ex:{t:"Le cercle du matin", txt:"Pendant une semaine, dessine chaque matin un petit mandala dans l'atelier, sans réfléchir. Le septième jour, regarde-les ensemble.", outil:"outil:mandala"},
     carnet:"Ce que mes mandalas de la semaine disent de mes jours :"},
    {id:"p9l3", t:"L'imagination active", sous:"Et le Livre rouge",
     idee:[
      "En 1913, Jung commence à noter ses visions et ses dialogues intérieurs. Il invente une méthode, l'<b>imagination active</b> : partir d'une image de rêve ou d'une émotion, la laisser se développer comme un film, et y entrer, parler avec les personnages, sans les diriger.",
      "Il recopie ces visions, avec des peintures, dans un grand livre relié de cuir rouge : le <b>Livre rouge</b>. Il y travaille jusqu'en 1930 environ, puis le laisse inachevé. Sa famille le garde secret ; il n'est publié qu'en 2009.",
      "On y croise un vieux prophète, Élie, une jeune aveugle, Salomé, et surtout <b>Philémon</b>, un vieillard aux ailes de martin-pêcheur, que Jung considère comme un maître intérieur. Ces figures annoncent les archétypes de sa théorie.",
      "L'imagination active demande de la prudence. Jung la réservait à des personnes stables, accompagnées. Pour qui traverse une période fragile, mieux vaut écrire, dessiner, marcher, et parler à quelqu'un de confiance."],
     source:{txt:"Les années où je poursuivais mes images intérieures furent les plus importantes de ma vie.", ref:"D'après C. G. Jung, Ma vie, 1962", st:"doc"},
     ex:{t:"Une image qui bouge", txt:"Si tu te sens bien : reprends une image d'un rêve, ferme les yeux, et laisse-la bouger quelques minutes, sans la diriger. Puis écris ce qui s'est passé. Si quelque chose t'inquiète, arrête et reviens au présent."},
     carnet:"L'image de départ, et ce qu'elle est devenue :"}
   ],
   quiz:[
    {q:"Qu'est-ce que le Soi pour Jung ?", r:["Le centre et la totalité de la psyché","Le moi conscient","L'ombre","La persona"], ok:0, exp:"Conscient et inconscient réunis, et leur principe d'ordre."},
    {q:"Que signifie « mandala » ?", r:["Cercle","Lumière","Âme","Chemin"], ok:0, exp:"Un mot sanskrit."},
    {q:"Quand le Livre rouge a-t-il été publié ?", r:["En 2009","En 1930","En 1962","Jamais"], ok:0, exp:"Gardé par la famille de Jung pendant près de cinquante ans."},
    {q:"Qui est Philémon ?", r:["Un maître intérieur de Jung, aux ailes de martin-pêcheur","Un patient du Burghölzli","Un alchimiste du XVIe siècle","Le fils de Jung"], ok:0, exp:"Une figure des visions consignées dans le Livre rouge."}
   ]});

  mod({id:"p10", n:"X", lieu:"tour", t:"Synchronicité et ésotérisme", sous:"Jung, l'alchimie, le tarot et les étoiles",
   lecons:[
    {id:"p10l1", t:"Le scarabée", sous:"Des coïncidences qui ont un sens",
     idee:[
      "Une patiente raconte à Jung un rêve où on lui offre un scarabée d'or. À cet instant, un insecte heurte la vitre : une cétoine dorée, le scarabée le plus proche qu'on trouve en Suisse. Jung l'attrape et le lui tend. La patiente, très rationnelle, en est bouleversée, et la thérapie avance.",
      "Jung appelle <b>synchronicité</b> une coïncidence entre un état intérieur et un événement extérieur, sans lien de cause, mais chargée de sens pour celui qui la vit. En 1952, il publie un essai sur ce sujet avec le physicien <b>Wolfgang Pauli</b>, prix Nobel.",
      "Les critiques sont nombreuses. Nous remarquons les coïncidences frappantes et oublions les milliers d'occasions où rien ne s'est passé : c'est le <b>biais de confirmation</b>. Avec des millions de personnes et d'événements, les coïncidences étonnantes sont statistiquement inévitables.",
      "On peut garder la synchronicité comme une <b>expérience vécue</b> : il arrive qu'une coïncidence nous frappe et nous fasse réfléchir. Ce qui compte alors n'est pas d'en prouver la cause, mais ce qu'on en fait."],
     source:{txt:"Synchronicité : la coïncidence temporelle de deux ou plusieurs événements sans lien causal, ayant un sens identique ou analogue.", ref:"D'après C. G. Jung, Synchronicité, principe de relations acausales, 1952", st:"doc"},
     ex:{t:"Une coïncidence", txt:"Raconte une coïncidence qui t'a frappé. Puis essaie de calculer, même grossièrement, combien d'occasions elle avait de se produire. Que reste-t-il de son sens ?"},
     carnet:"Ma coïncidence, et ce qu'elle m'a fait faire :"},
    {id:"p10l2", t:"Jung et les arts anciens", sous:"Alchimie, Yi king, astrologie, tarot",
     idee:[
      "Jung a lu des centaines de traités d'<b>alchimie</b>. Dans <i>Psychologie et alchimie</i> (1944), il soutient que les alchimistes projetaient sur la matière leur propre transformation intérieure : le plomb devenu or serait l'âme qui s'individue. Les historiens nuancent : beaucoup d'alchimistes faisaient d'abord de la chimie.",
      "Il préface en 1949 la traduction du <b>Yi king</b> par Richard Wilhelm, qu'il consultait lui-même, et y voit un exemple de synchronicité. Il fait faire des thèmes <b>astrologiques</b> de ses patients, et tente même dans son essai de 1952 une expérience sur les thèmes de couples mariés, aux résultats peu concluants.",
      "Le <b>tarot</b> apparaît dans un séminaire de 1933 : Jung y voit des images archétypiques, propres à éclairer une situation. Cette remarque, avec la lecture psychologique de l'astrologie, a inspiré tout un courant moderne qui fait du tarot un outil de réflexion plutôt que de prédiction.",
      "C'est pourquoi Jung est le pont naturel entre les univers d'Arcanes : les archétypes du tarot, l'œuvre de l'alchimie, les planètes de l'astrologie, les cercles de la magie. Ce pont est une <b>lecture</b> moderne : les inventeurs de ces arts ne pensaient pas en termes de psychologie."],
     source:{txt:"Le tarot semble descendre d'images archétypiques de transformation.", ref:"D'après C. G. Jung, séminaire du 1er février 1933", st:"doc"},
     ex:{t:"Un pont", txt:"Choisis une lame du tarot que tu connais. Quel archétype y vois-tu : la Mère, le Sage, le Fripon, l'Ombre, le Héros, le Soi ? Va la revoir dans l'univers Tarot."},
     carnet:"La lame choisie, et l'archétype que j'y vois :"},
    {id:"p10l3", t:"Que garder ?", sous:"Lire Jung en adulte",
     idee:[
      "Jung a été admiré comme un sage et attaqué comme un gourou. Des historiens comme Richard Noll lui ont reproché d'avoir fondé une sorte de religion ; d'autres, comme Sonu Shamdasani, qui a édité le Livre rouge, ont défendu sa démarche de chercheur. Ses positions des années 1930 sur la « psychologie des peuples » ont aussi été vivement critiquées.",
      "Le philosophe Karl Popper rangeait la psychanalyse parmi les théories qui expliquent tout et ne peuvent donc jamais être réfutées. Le reproche vaut pour Jung : un rêve qui va dans le sens de la conscience la confirme, un rêve qui la contredit la « compense ».",
      "Pourtant, plusieurs intuitions de Jung ont été reprises : l'introversion et l'extraversion, la crise du milieu de la vie, l'importance des récits et des symboles dans la santé psychique, l'art comme moyen d'expression en thérapie.",
      "Lire Jung en adulte, c'est le lire comme on lit un grand écrivain ou un philosophe : avec curiosité, en prenant ce qui éclaire, en laissant ce qui a vieilli, et sans lui demander d'être la science qu'il n'est pas. Tu as fait le tour de la maison."],
     source:{txt:"Une théorie qui n'est réfutable par aucun événement concevable n'est pas scientifique.", ref:"D'après Karl Popper, Conjectures et réfutations, 1963", st:"crit"},
     ex:{t:"Relire", txt:"Relis ce que tu avais écrit à la troisième leçon du cours, sur le mot de Jung que tu employais déjà. Le comprends-tu autrement aujourd'hui ?"},
     carnet:"Ce que je garde de Jung, et ce que je laisse :"}
   ],
   quiz:[
    {q:"Quel insecte apparaît dans l'histoire du scarabée ?", r:["Une cétoine dorée","Une coccinelle","Une abeille","Un papillon"], ok:0, exp:"Le scarabée le plus proche qu'on trouve en Suisse."},
    {q:"Avec quel physicien Jung publie-t-il sur la synchronicité ?", r:["Wolfgang Pauli","Albert Einstein","Niels Bohr","Werner Heisenberg"], ok:0, exp:"En 1952, avec le prix Nobel de physique 1945."},
    {q:"Quel biais explique beaucoup de coïncidences frappantes ?", r:["Le biais de confirmation","L'effet placebo","L'effet Dunning-Kruger","Le biais d'ancrage"], ok:0, exp:"On retient les coïncidences et l'on oublie les occasions où rien ne s'est passé."},
    {q:"Que reprochait Popper à la psychanalyse ?", r:["De ne pouvoir être réfutée","D'être trop mathématique","D'ignorer les rêves","D'être trop récente"], ok:0, exp:"Une théorie qui explique tout n'apprend plus rien."}
   ]});

  const LIEUX = {
    seuil:{nom:"Le seuil", sous:"La porte de la maison"},
    etage:{nom:"L'étage", sous:"Le salon du XVIIIe siècle : la conscience"},
    rdc:{nom:"Le rez-de-chaussée", sous:"Les salles médiévales : l'inconscient personnel"},
    cave:{nom:"La cave", sous:"Les murs romains : les images de l'autre"},
    grotte:{nom:"La grotte", sous:"Les os et les crânes : l'inconscient collectif"},
    tour:{nom:"La tour", sous:"Bollingen, au bord du lac : les ponts vers les autres arts"}
  };
  return {MODULES:M, LIEUX};
})();
