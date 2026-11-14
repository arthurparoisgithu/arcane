/* ===== Arcanes · Astrologie : les données =====
   Planètes, signes, maisons, aspects, dignités, villes.
   Chaque fiche porte deux lectures : la tradition (de Ptolémée à Morin de Villefranche,
   telle que la relisent aujourd'hui Denis Labouré ou Robert Hand) et l'astrologie moderne
   (d'Alan Leo à Dane Rudhyar, André Barbault et Liz Greene). */
const ASTRO_DATA = (() => {
  const T = "︎"; // force l'affichage en texte, pas en emoji

  /* ---------- Les planètes ---------- */
  const PLANETS = [
    {id:"soleil", nom:"Le Soleil", court:"Soleil", gl:"☉", body:"Sun", genre:"m", secte:"diurne", nature:"chaud et sec", qual:"luminaire", jour:"dimanche", metal:"l'or", joie:9,
      cycle:"Il fait le tour du zodiaque en un an, environ un mois par signe. C'est lui qui fixe le « signe » dont tout le monde parle.",
      mots:["identité","volonté","vitalité","rayonnement","le père"],
      fn:"ton identité et ce qui te fait briller", fs:"ta volonté",
      trad:"Le grand luminaire du jour. Chaud et sec, il donne la vie, l'autorité et l'honneur. Il signifie le père, le roi et les supérieurs, la renommée, le cœur, les yeux. Il gouverne le Lion et s'exalte au 19e degré du Bélier. Son jour est le dimanche, son métal l'or. Il se réjouit en maison IX, que les Grecs appelaient « le Dieu ». Les planètes trop proches de lui sont « brûlées » (combustes) : elles perdent leur force, sauf au cœur exact du Soleil (cazimi), où elles sont au contraire renforcées.",
      mod:"Le centre du thème : l'identité consciente, la volonté, ce vers quoi tu tends pour devenir pleinement toi-même. Pour l'astrologie psychologique, c'est le moi qui s'affirme et l'image du père. Son signe dit le style de ton rayonnement, sa maison le domaine où tu cherches à exister."},
    {id:"lune", nom:"La Lune", court:"Lune", gl:"☽", body:"Moon", genre:"f", secte:"nocturne", nature:"froide et humide", qual:"luminaire", jour:"lundi", metal:"l'argent", joie:3,
      cycle:"Elle fait le tour du zodiaque en 27 jours et passe environ deux jours et demi dans chaque signe. Une lunaison complète, de nouvelle lune à nouvelle lune, dure 29 jours et demi.",
      mots:["émotions","besoins","mémoire","le corps","la mère"],
      fn:"ta sensibilité et ce qui te rassure", fs:"tes émotions",
      trad:"Le luminaire de la nuit. Froide et humide, elle règne sur le corps, la fécondité, la mère, les femmes, le peuple, les voyages et tout ce qui change. Elle gouverne le Cancer et s'exalte au 3e degré du Taureau. Son jour est le lundi, son métal l'argent. Elle se réjouit en maison III, « la Déesse ». Comme elle va vite, elle recueille la lumière des autres planètes et la transmet : les anciens suivaient de près ses aspects, surtout dans les questions posées à l'heure (astrologie horaire).",
      mod:"Ton monde affectif et instinctif : les besoins, les habitudes, la mémoire, ce que tu as reçu dans l'enfance. Elle dit comment tu te sens en sécurité et comment tu prends soin des autres. C'est la part réceptive de la psyché et l'image de la mère."},
    {id:"mercure", nom:"Mercure", court:"Mercure", gl:"☿", body:"Mercury", genre:"m", secte:"variable", nature:"variable, plutôt froid et sec", qual:"neutre", jour:"mercredi", metal:"le vif-argent", joie:1,
      cycle:"Il tourne autour du Soleil en 88 jours et ne s'en éloigne jamais de plus de 28°. Il paraît reculer (rétrograder) trois ou quatre fois par an, pendant trois semaines environ.",
      mots:["pensée","parole","échanges","commerce","apprentissage"],
      fn:"ta façon de penser et de communiquer", fs:"ta pensée",
      trad:"La planète changeante : Mercure prend la nature des planètes qui le touchent, bénéfique avec les bénéfiques, maléfique avec les maléfiques. Il est diurne quand il se lève avant le Soleil, nocturne quand il le suit. Il signifie la parole, l'écrit, le calcul, le commerce, les jeunes gens, les messagers, les secrétaires et les voleurs. Il gouverne les Gémeaux et la Vierge, où il s'exalte au 15e degré. Jour : mercredi ; métal : le vif-argent. Il se réjouit en maison I.",
      mod:"L'intellect et l'échange : apprendre, relier, nommer, négocier. Mercure dit comment tu traites l'information, comment tu parles et tu écoutes, ta curiosité, ton humour. C'est aussi le passeur entre ce que tu sais et ce que tu ressens."},
    {id:"venus", nom:"Vénus", court:"Vénus", gl:"♀", body:"Venus", genre:"f", secte:"nocturne", nature:"froide et humide, tempérée", qual:"bénéfique", jour:"vendredi", metal:"le cuivre", joie:5,
      cycle:"Elle tourne autour du Soleil en 225 jours et ne s'en éloigne jamais de plus de 47°. Étoile du matin ou étoile du soir, elle rétrograde environ tous les dix-neuf mois.",
      mots:["amour","plaisir","beauté","harmonie","valeurs"],
      fn:"ta façon d'aimer et ce que tu trouves beau", fs:"ton goût d'aimer",
      trad:"La petite bénéfique. Froide et humide, tempérée, nocturne. Elle donne la beauté, l'amour, les plaisirs, la musique et les arts, la parure, la paix et la concorde ; elle signifie l'épouse et les jeunes femmes. Elle gouverne le Taureau et la Balance et s'exalte au 27e degré des Poissons. Jour : vendredi ; métal : le cuivre. Elle se réjouit en maison V, « la Bonne Fortune ».",
      mod:"Le principe d'attraction : ce que tu aimes, ce qui te fait plaisir, la manière dont tu crées du lien et de l'harmonie, tes valeurs et ton rapport à l'argent. Elle décrit ton idéal amoureux et ton sens esthétique."},
    {id:"mars", nom:"Mars", court:"Mars", gl:"♂", body:"Mars", genre:"m", secte:"nocturne", nature:"chaud et sec à l'excès", qual:"maléfique", jour:"mardi", metal:"le fer", joie:6,
      cycle:"Il fait le tour du zodiaque en 687 jours et passe environ six semaines dans un signe, beaucoup plus quand il rétrograde, tous les deux ans environ.",
      mots:["action","désir","courage","conflit","énergie"],
      fn:"ta façon d'agir et de désirer", fs:"ton énergie d'agir",
      trad:"Le petit maléfique. Chaud et sec à l'excès, nocturne. Il signifie les querelles, la guerre, le fer et le feu, les blessures, la chirurgie, les soldats et les artisans du métal. Bien placé, il donne le courage, l'audace et la force de trancher. Il gouverne le Bélier et le Scorpion et s'exalte au 28e degré du Capricorne. Jour : mardi ; métal : le fer. Il se réjouit en maison VI.",
      mod:"L'énergie, le désir, l'affirmation. Mars dit comment tu passes à l'acte, comment tu te défends, ce qui te met en colère, ta sexualité et ton goût de la compétition. C'est le moteur du thème : sans lui, rien ne commence."},
    {id:"jupiter", nom:"Jupiter", court:"Jupiter", gl:"♃", body:"Jupiter", genre:"m", secte:"diurne", nature:"chaud et humide, tempéré", qual:"bénéfique", jour:"jeudi", metal:"l'étain", joie:11,
      cycle:"Il fait le tour du zodiaque en douze ans : environ un an par signe. Il revient à sa place de naissance vers 12, 24, 36, 48 ans…",
      mots:["confiance","croissance","sens","générosité","loi"],
      fn:"ta confiance et ta façon de grandir", fs:"ton besoin de grandir",
      trad:"Le grand bénéfique. Chaud et humide, tempéré, diurne. Il donne l'abondance, la justice, la religion et la loi, la générosité et la protection ; il signifie les juges, les prêtres, les gens riches et honorables. Il gouverne le Sagittaire et les Poissons et s'exalte au 15e degré du Cancer. Jour : jeudi ; métal : l'étain. Il se réjouit en maison XI, « le Bon Génie ».",
      mod:"L'expansion : la foi, l'optimisme, le besoin de sens, le désir de comprendre et de s'élargir. Jupiter dit où tu as confiance et où la vie te sourit, mais aussi où tu risques l'excès. Il relie l'individu à la société et à ses valeurs."},
    {id:"saturne", nom:"Saturne", court:"Saturne", gl:"♄", body:"Saturn", genre:"m", secte:"diurne", nature:"froid et sec", qual:"maléfique", jour:"samedi", metal:"le plomb", joie:12,
      cycle:"Il fait le tour du zodiaque en 29 ans et demi, environ deux ans et demi par signe. Son retour à sa place de naissance, vers 29 ans puis vers 58 ans, marque de grands tournants.",
      mots:["temps","limites","effort","structure","maturité"],
      fn:"ton sens des limites et ce que tu bâtis dans la durée", fs:"ton sens des limites",
      trad:"Le grand maléfique. Froid et sec, diurne. Il signifie le temps et la vieillesse, les ancêtres, la terre et l'agriculture, les héritages, la solitude, les pertes et les retards ; bien placé, la patience, la profondeur, la fidélité et la sagesse. Il gouverne le Capricorne et le Verseau et s'exalte au 21e degré de la Balance. Jour : samedi ; métal : le plomb. Il se réjouit en maison XII, « le Mauvais Génie ».",
      mod:"La structure : les règles, les responsabilités, les peurs, ce qui demande du temps et de l'effort. Saturne montre où tu te sens limité, mais aussi où tu deviens solide et maître de toi. Liz Greene en a fait, en 1976, le grand maître d'apprentissage du thème."},
    {id:"uranus", nom:"Uranus", court:"Uranus", gl:"♅", body:"Uranus", genre:"m", moderne:true, nature:"—", qual:"moderne", jour:"—", metal:"—",
      cycle:"Il fait le tour du zodiaque en 84 ans, environ sept ans par signe. William Herschel l'a découvert en 1781, au télescope.",
      mots:["liberté","rupture","originalité","intuition","avenir"],
      fn:"ton besoin de liberté et ce qui, en toi, est singulier", fs:"ton besoin de liberté",
      trad:"Inconnu des anciens : l'astrologie traditionnelle travaille avec les sept astres visibles à l'œil nu. Beaucoup de traditionalistes ne l'utilisent pas ; d'autres le regardent seulement quand il touche exactement un angle ou un luminaire, comme un indice d'événement brusque.",
      mod:"Le principe de rupture : l'originalité, l'indépendance, l'intuition soudaine, la révolte. L'astrologie moderne en fait le maître du Verseau. Uranus dit où tu refuses la règle commune et où ta vie connaît des tournants imprévus. Lent, il marque aussi des générations entières."},
    {id:"neptune", nom:"Neptune", court:"Neptune", gl:"♆", body:"Neptune", genre:"m", moderne:true, nature:"—", qual:"moderne", jour:"—", metal:"—",
      cycle:"Il fait le tour du zodiaque en 165 ans, environ quatorze ans par signe. Il a été trouvé en 1846 par le calcul d'Urbain Le Verrier avant d'être vu au télescope par Johann Galle.",
      mots:["rêve","idéal","compassion","illusion","l'invisible"],
      fn:"ton idéal et ta part de rêve", fs:"ton idéal",
      trad:"Inconnu des anciens. La tradition ne lui donne ni domicile ni dignité ; quand on l'observe, c'est seulement s'il est exactement placé sur un point sensible du thème.",
      mod:"La dissolution des frontières : l'imaginaire, la compassion, la spiritualité, l'art, mais aussi l'illusion et la confusion. L'astrologie moderne en fait le maître des Poissons. Neptune montre où tu idéalises, où tu te fonds dans plus grand que toi."},
    {id:"pluton", nom:"Pluton", court:"Pluton", gl:"♇", body:"Pluto", genre:"m", moderne:true, nature:"—", qual:"moderne", jour:"—", metal:"—",
      cycle:"Il met 248 ans à faire le tour du zodiaque, sur une orbite si allongée qu'il reste de 12 à 30 ans dans un signe. Découvert en 1930 par Clyde Tombaugh, il a été reclassé « planète naine » en 2006.",
      mots:["transformation","pouvoir","crise","profondeur","renaissance"],
      fn:"ta force de transformation et ce que tu vis intensément", fs:"ta force de transformation",
      trad:"Inconnu des anciens, et invisible à l'œil nu. La tradition l'ignore, ou le traite comme Uranus et Neptune : un indice secondaire, sans maîtrise.",
      mod:"La mort et la renaissance : le pouvoir, les crises qui transforment, ce qui est enfoui et remonte. L'astrologie moderne en fait le maître du Scorpion. Pluton dit où tu vis les choses en profondeur, sans demi-mesure."},
    {id:"noeudn", nom:"Le Nœud nord", court:"Nœud nord", gl:"☊", body:null, genre:"m", point:true, nature:"—", qual:"point", jour:"—", metal:"—",
      cycle:"Ce n'est pas un astre mais un point : là où l'orbite de la Lune croise l'écliptique en montant. Il recule dans le zodiaque et en fait le tour en 18 ans et demi. Les éclipses ont lieu près des nœuds.",
      mots:["direction","évolution","appétit","nouveauté"],
      fn:"la direction vers laquelle tu grandis", fs:"ta voie",
      trad:"La Tête du Dragon. Pour les médiévaux, elle a une nature de Jupiter et de Vénus : elle augmente ce qu'elle touche. Avec la Queue, elle marque les lieux des éclipses, que l'on redoutait.",
      mod:"Pour l'astrologie humaniste, le Nœud nord montre la direction d'évolution : ce qui est nouveau, un peu inconfortable, mais nourrissant."},
    {id:"noeuds", nom:"Le Nœud sud", court:"Nœud sud", gl:"☋", body:null, genre:"m", point:true, nature:"—", qual:"point", jour:"—", metal:"—",
      cycle:"Toujours exactement opposé au Nœud nord.",
      mots:["acquis","habitudes","détachement"],
      fn:"ce qui t'est familier, tes acquis", fs:"tes acquis",
      trad:"La Queue du Dragon. Elle a une nature de Saturne et de Mars : elle diminue ce qu'elle touche.",
      mod:"Le Nœud sud montre les talents acquis et les habitudes confortables, dont il faut peu à peu se détacher pour avancer."}
  ];

  /* Les angles, utilisés comme points dans les aspects */
  const ANGLES = {
    asc:{id:"asc", nom:"L'Ascendant", court:"Ascendant", gl:"AC", fs:"ta manière d'être au monde"},
    mc:{id:"mc", nom:"Le Milieu du Ciel", court:"Milieu du Ciel", gl:"MC", fs:"ta vocation"}
  };

  /* ---------- Les signes ---------- */
  const SIGNS = [
    {id:"belier", nom:"Bélier", gl:"♈", el:"feu", mode:"cardinal", pol:"masculin", dates:"du 21 mars au 20 avril", maitre:"mars", maitreMod:"mars", exalt:["soleil",19], corps:"la tête", du:"du Bélier",
      mots:["élan","courage","impatience","initiative"], style:"avec élan, franchise et goût du défi, en allant droit au but",
      mythe:"Le bélier à la toison d'or, qui emporta Phrixos et Hellé à travers le ciel ; sa toison est celle que Jason partit chercher.",
      trad:"Signe de feu, chaud et sec, masculin et diurne, cardinal : il ouvre le printemps, à l'équinoxe. Domicile de Mars, exaltation du Soleil, exil de Vénus, chute de Saturne. Il gouverne la tête et le visage. Signe « de tête » du zodiaque, il commence l'année astrologique.",
      mod:"L'énergie du commencement : le jaillissement, l'audace, le besoin d'agir tout de suite. Le Bélier vit dans l'instant, aime le défi et déteste attendre. Il apprend à finir ce qu'il commence."},
    {id:"taureau", nom:"Taureau", gl:"♉", el:"terre", mode:"fixe", pol:"féminin", dates:"du 21 avril au 20 mai", maitre:"venus", maitreMod:"venus", exalt:["lune",3], corps:"le cou et la gorge", du:"du Taureau",
      mots:["stabilité","sensualité","patience","possession"], style:"avec calme, constance et sens du concret, en prenant le temps de savourer",
      mythe:"Le taureau blanc dont Zeus prit la forme pour enlever Europe et l'emmener en Crète.",
      trad:"Signe de terre, froid et sec, féminin et nocturne, fixe : le printemps installé. Domicile de Vénus, exaltation de la Lune, exil de Mars. Il gouverne le cou et la gorge.",
      mod:"L'enracinement : le corps, les sens, la sécurité matérielle, le plaisir simple. Le Taureau construit lentement et tient bon. Il apprend à lâcher prise sur ce qu'il possède."},
    {id:"gemeaux", nom:"Gémeaux", gl:"♊", el:"air", mode:"mutable", pol:"masculin", dates:"du 21 mai au 21 juin", maitre:"mercure", maitreMod:"mercure", exalt:null, corps:"les épaules, les bras et les poumons", du:"des Gémeaux",
      mots:["curiosité","échange","mobilité","dualité"], style:"avec curiosité, vivacité et goût de l'échange, en butinant d'une idée à l'autre",
      mythe:"Castor et Pollux, les jumeaux inséparables : l'un mortel, l'autre immortel, ils partagent l'immortalité en vivant un jour sur deux chez les dieux.",
      trad:"Signe d'air, chaud et humide, masculin et diurne, mutable (« double » ou « bicorporel ») : la fin du printemps. Domicile de Mercure, exil de Jupiter. Il gouverne les épaules, les bras et les mains. Signe « humain », à voix, réputé pour les arts de la parole.",
      mod:"L'esprit en mouvement : apprendre, comparer, relier, raconter. Les Gémeaux ont besoin de variété et de conversation. Ils apprennent à approfondir."},
    {id:"cancer", nom:"Cancer", gl:"♋", el:"eau", mode:"cardinal", pol:"féminin", dates:"du 22 juin au 22 juillet", maitre:"lune", maitreMod:"lune", exalt:["jupiter",15], corps:"la poitrine et l'estomac", du:"du Cancer",
      mots:["protection","mémoire","famille","sensibilité"], style:"avec sensibilité, pudeur et besoin de protéger, en cherchant un nid",
      mythe:"Le crabe envoyé par Héra pour pincer Héraclès pendant son combat contre l'hydre de Lerne.",
      trad:"Signe d'eau, froid et humide, féminin et nocturne, cardinal : il ouvre l'été, au solstice. Domicile de la Lune, exaltation de Jupiter, exil de Saturne, chute de Mars. Il gouverne la poitrine et l'estomac. Signe « fécond ».",
      mod:"Le besoin d'appartenance : la famille, le foyer, les souvenirs, l'attachement. Le Cancer protège ce qu'il aime derrière sa carapace. Il apprend à sortir de sa coquille."},
    {id:"lion", nom:"Lion", gl:"♌", el:"feu", mode:"fixe", pol:"masculin", dates:"du 23 juillet au 22 août", maitre:"soleil", maitreMod:"soleil", exalt:null, corps:"le cœur et le dos", du:"du Lion",
      mots:["rayonnement","générosité","fierté","création"], style:"avec générosité, fierté et goût de la scène, en voulant rayonner",
      mythe:"Le lion de Némée, à la peau invulnérable, étouffé par Héraclès lors de son premier travail.",
      trad:"Signe de feu, chaud et sec, masculin et diurne, fixe : le cœur de l'été. Domicile du Soleil, exil de Saturne. Il gouverne le cœur, le dos et les flancs. Signe royal.",
      mod:"Le besoin d'être soi au grand jour : créer, briller, aimer avec panache. Le Lion donne beaucoup et attend d'être reconnu. Il apprend à rayonner sans dominer."},
    {id:"vierge", nom:"Vierge", gl:"♍", el:"terre", mode:"mutable", pol:"féminin", dates:"du 23 août au 22 septembre", maitre:"mercure", maitreMod:"mercure", exalt:["mercure",15], corps:"le ventre et les intestins", du:"de la Vierge",
      mots:["analyse","service","précision","santé"], style:"avec méthode, discernement et sens du service, en soignant les détails",
      mythe:"Astrée, la vierge de la justice, dernière des immortelles à quitter la Terre à la fin de l'âge d'or. Elle tient un épi de blé : l'étoile Spica.",
      trad:"Signe de terre, froid et sec, féminin et nocturne, mutable : la fin de l'été et des moissons. Domicile et exaltation de Mercure, exil de Jupiter, chute de Vénus. Il gouverne le ventre et les intestins.",
      mod:"Le besoin d'ordre et d'utilité : trier, améliorer, prendre soin du concret. La Vierge voit ce qui cloche et sait le réparer. Elle apprend l'indulgence, envers elle-même d'abord."},
    {id:"balance", nom:"Balance", gl:"♎", el:"air", mode:"cardinal", pol:"masculin", dates:"du 23 septembre au 22 octobre", maitre:"venus", maitreMod:"venus", exalt:["saturne",21], corps:"les reins et les lombes", du:"de la Balance",
      mots:["harmonie","relation","justice","élégance"], style:"avec tact, élégance et sens de l'équilibre, en passant par l'autre",
      mythe:"Seul objet du zodiaque : la balance d'Astrée, la justice. Les Grecs y voyaient les pinces du Scorpion ; les Romains en ont fait un signe à part.",
      trad:"Signe d'air, chaud et humide, masculin et diurne, cardinal : il ouvre l'automne, à l'équinoxe, quand jour et nuit sont égaux. Domicile de Vénus, exaltation de Saturne, exil de Mars, chute du Soleil. Il gouverne les reins et les lombes.",
      mod:"Le besoin de l'autre : la relation, l'accord, la beauté, le sens de la justice. La Balance pèse le pour et le contre et cherche la paix. Elle apprend à trancher."},
    {id:"scorpion", nom:"Scorpion", gl:"♏", el:"eau", mode:"fixe", pol:"féminin", dates:"du 23 octobre au 21 novembre", maitre:"mars", maitreMod:"pluton", exalt:null, corps:"les organes génitaux", du:"du Scorpion",
      mots:["intensité","passion","secret","transformation"], style:"avec intensité, profondeur et goût du tout ou rien, en allant au fond des choses",
      mythe:"Le scorpion envoyé contre le géant Orion, qui se vantait de tuer toutes les bêtes. Les dieux les placèrent aux deux bouts du ciel : quand l'un se lève, l'autre se couche.",
      trad:"Signe d'eau, froid et humide, féminin et nocturne, fixe : le cœur de l'automne. Domicile nocturne de Mars, exil de Vénus, chute de la Lune. Il gouverne les organes génitaux. L'astrologie moderne lui donne Pluton pour maître.",
      mod:"Le besoin de vérité et d'intensité : le désir, la crise, la transformation. Le Scorpion ne craint pas l'ombre et ne vit rien à moitié. Il apprend à faire confiance."},
    {id:"sagittaire", nom:"Sagittaire", gl:"♐", el:"feu", mode:"mutable", pol:"masculin", dates:"du 22 novembre au 21 décembre", maitre:"jupiter", maitreMod:"jupiter", exalt:null, corps:"les hanches et les cuisses", du:"du Sagittaire",
      mots:["enthousiasme","voyage","sens","liberté"], style:"avec enthousiasme, franchise et soif d'horizons, en cherchant un sens",
      mythe:"Un centaure archer, souvent identifié à Chiron, le sage précepteur d'Achille et d'Asclépios.",
      trad:"Signe de feu, chaud et sec, masculin et diurne, mutable : la fin de l'automne. Domicile de Jupiter, exil de Mercure. Il gouverne les hanches et les cuisses. Mi-humain, mi-animal.",
      mod:"Le besoin d'horizon : voyager, comprendre, croire, transmettre. Le Sagittaire vise loin et parle franc. Il apprend à tenir parole dans le détail."},
    {id:"capricorne", nom:"Capricorne", gl:"♑", el:"terre", mode:"cardinal", pol:"féminin", dates:"du 22 décembre au 19 janvier", maitre:"saturne", maitreMod:"saturne", exalt:["mars",28], corps:"les genoux et les os", du:"du Capricorne",
      mots:["ambition","rigueur","patience","responsabilité"], style:"avec sérieux, ambition et patience, en bâtissant pour durer",
      mythe:"Une chèvre à queue de poisson : le dieu Pan, qui se jeta dans le Nil pour fuir le monstre Typhon et se transforma à moitié.",
      trad:"Signe de terre, froid et sec, féminin et nocturne, cardinal : il ouvre l'hiver, au solstice. Domicile de Saturne, exaltation de Mars, exil de la Lune, chute de Jupiter. Il gouverne les genoux.",
      mod:"Le besoin d'accomplir : se fixer un sommet et y monter pas à pas. Le Capricorne prend ses responsabilités au sérieux. Il apprend à se faire confiance et à se détendre."},
    {id:"verseau", nom:"Verseau", gl:"♒", el:"air", mode:"fixe", pol:"masculin", dates:"du 20 janvier au 18 février", maitre:"saturne", maitreMod:"uranus", exalt:null, corps:"les mollets et les chevilles", du:"du Verseau",
      mots:["liberté","amitié","idéal","originalité"], style:"avec indépendance, originalité et sens du collectif, en inventant tes propres règles",
      mythe:"Ganymède, le bel échanson enlevé par Zeus pour servir à boire aux dieux, versant l'eau d'une jarre.",
      trad:"Signe d'air, chaud et humide, masculin et diurne, fixe : le cœur de l'hiver. Domicile diurne de Saturne, exil du Soleil. Il gouverne les mollets et les chevilles. L'astrologie moderne lui donne Uranus pour maître.",
      mod:"Le besoin de liberté et de fraternité : penser autrement, rêver l'avenir, faire partie d'un groupe sans s'y perdre. Le Verseau apprend la chaleur des liens personnels."},
    {id:"poissons", nom:"Poissons", gl:"♓", el:"eau", mode:"mutable", pol:"féminin", dates:"du 19 février au 20 mars", maitre:"jupiter", maitreMod:"neptune", exalt:["venus",27], corps:"les pieds", du:"des Poissons",
      mots:["intuition","compassion","rêve","dissolution"], style:"avec intuition, compassion et imagination, en te laissant porter",
      mythe:"Aphrodite et son fils Éros, changés en poissons et liés par une corde pour ne pas se perdre en fuyant Typhon dans l'Euphrate.",
      trad:"Signe d'eau, froid et humide, féminin et nocturne, mutable : la fin de l'hiver. Domicile nocturne de Jupiter, exaltation de Vénus, exil et chute de Mercure. Il gouverne les pieds. Signe double et fécond.",
      mod:"Le besoin de se fondre dans plus grand que soi : l'art, la spiritualité, la compassion. Les Poissons ressentent tout. Ils apprennent à se protéger sans se fermer."}
  ];

  const ELEMENTS = {
    feu:{nom:"Le feu", qual:"chaud et sec", signes:["belier","lion","sagittaire"], txt:"L'élan, l'enthousiasme, l'action qui part de l'intérieur. Le feu inspire et entraîne.", trip:["soleil","jupiter","saturne"]},
    terre:{nom:"La terre", qual:"froid et sec", signes:["taureau","vierge","capricorne"], txt:"Le concret, la patience, le sens pratique. La terre construit et fait durer.", trip:["venus","lune","mars"]},
    air:{nom:"L'air", qual:"chaud et humide", signes:["gemeaux","balance","verseau"], txt:"L'idée, l'échange, la relation. L'air relie et met en mots.", trip:["saturne","mercure","jupiter"]},
    eau:{nom:"L'eau", qual:"froid et humide", signes:["cancer","scorpion","poissons"], txt:"L'émotion, l'intuition, la mémoire. L'eau ressent et accueille.", trip:["venus","mars","lune"]}
  };
  const MODES = {
    cardinal:{nom:"Cardinal", txt:"Les signes qui ouvrent les saisons : ils lancent, ils initient. Bélier, Cancer, Balance, Capricorne."},
    fixe:{nom:"Fixe", txt:"Les signes du cœur des saisons : ils stabilisent, ils tiennent. Taureau, Lion, Scorpion, Verseau."},
    mutable:{nom:"Mutable", txt:"Les signes qui terminent les saisons : ils s'adaptent, ils préparent le passage. Gémeaux, Vierge, Sagittaire, Poissons."}
  };

  /* ---------- Les maisons ---------- */
  const HOUSES = [
    {n:1, latin:"Vita", nom:"La vie", type:"angulaire", joie:"mercure", mots:["le corps","l'apparence","l'élan vital"],
      dom:"dans ta manière de te présenter, ton corps et ton élan de vie",
      trad:"L'horoscope au sens propre : le degré qui se lève à l'est. La maison du corps, de la vie, du tempérament et de l'esprit. Son maître, le « maître de l'Ascendant », représente la personne elle-même. Mercure s'y réjouit.",
      mod:"Ta façon d'entrer en contact avec le monde : la première impression, l'allure, la réaction spontanée. L'Ascendant colore tout le thème, comme une porte d'entrée."},
    {n:2, latin:"Lucrum", nom:"Le gain", type:"succédente", mots:["l'argent","les biens","les ressources"],
      dom:"dans ton rapport à l'argent, à tes ressources et à ce que tu possèdes",
      trad:"La maison des biens meubles, de l'argent gagné et dépensé, des moyens de vivre. On l'appelait aussi « la porte de l'Hadès », car elle se trouve juste sous l'horizon.",
      mod:"Tes ressources au sens large : l'argent, mais aussi tes talents, ton estime de toi, ce qui te donne un sentiment de valeur et de sécurité."},
    {n:3, latin:"Fratres", nom:"Les frères", type:"cadente", joie:"lune", mots:["les frères et sœurs","l'entourage","les trajets"],
      dom:"dans tes échanges de tous les jours, tes proches, tes études et tes petits déplacements",
      trad:"La maison des frères et sœurs, des voisins, des courts voyages, des lettres et des rumeurs, mais aussi de la religion pour les Grecs : la Lune, « la Déesse », s'y réjouit.",
      mod:"L'environnement immédiat : la fratrie, les voisins, l'école, la parole quotidienne, les déplacements courts. La maison de la curiosité et de l'apprentissage."},
    {n:4, latin:"Genitor", nom:"Les parents", type:"angulaire", mots:["le foyer","la famille","les racines"],
      dom:"dans ta famille, ton foyer et tes racines",
      trad:"Le fond du ciel, à minuit. La maison du père, des terres, des maisons et des héritages immobiliers, des choses cachées sous la terre, et de la fin de la vie.",
      mod:"Les racines : la famille d'origine, le foyer, ce qui te nourrit en profondeur, ton monde intérieur. Le point le plus intime du thème."},
    {n:5, latin:"Nati", nom:"Les enfants", type:"succédente", joie:"venus", mots:["les enfants","les plaisirs","la création"],
      dom:"dans tes plaisirs, tes amours, ta créativité et tes enfants",
      trad:"La maison des enfants, des fêtes et des plaisirs, des messages et des dons. Vénus s'y réjouit : les Grecs l'appelaient « la Bonne Fortune ».",
      mod:"Ce que tu crées et ce qui te met en joie : les enfants, les amours naissantes, le jeu, l'art, la prise de risque. La maison du cœur qui s'exprime."},
    {n:6, latin:"Valetudo", nom:"La santé", type:"cadente", joie:"mars", mots:["la santé","le travail quotidien","le service"],
      dom:"dans ton travail de tous les jours, ta santé et tes habitudes",
      trad:"La maison des maladies, des serviteurs et des subordonnés, du petit bétail. Mars s'y réjouit : les Grecs l'appelaient « la Mauvaise Fortune ».",
      mod:"Le quotidien organisé : le travail, les collègues, la santé, l'hygiène de vie, l'envie d'être utile. La maison des ajustements."},
    {n:7, latin:"Uxor", nom:"L'épouse", type:"angulaire", mots:["le couple","les associés","les adversaires"],
      dom:"dans ton couple, tes associations et tes relations face à face",
      trad:"Le couchant. La maison du mariage et de l'épouse, des associés, des contrats, des procès et des ennemis déclarés.",
      mod:"L'autre en face de toi : le partenaire amoureux, l'associé, l'adversaire. Ce que tu cherches chez l'autre, et souvent ce que tu ne vois pas en toi."},
    {n:8, latin:"Mors", nom:"La mort", type:"succédente", mots:["les héritages","le partage","les crises"],
      dom:"dans ce que tu partages, ce que tu hérites et ce qui te transforme",
      trad:"La maison de la mort et de sa nature, des héritages, des biens du conjoint, des dettes et des peurs. Elle ne regarde pas l'Ascendant, d'où sa réputation de maison difficile.",
      mod:"Ce qui se partage et ce qui se transforme : l'intimité, la sexualité, l'argent commun, les crises et les renaissances. La maison des profondeurs."},
    {n:9, latin:"Pietas", nom:"La foi", type:"cadente", joie:"soleil", mots:["les voyages","la philosophie","la religion"],
      dom:"dans tes voyages, tes grandes études, tes croyances et ta quête de sens",
      trad:"La maison de la religion, des longs voyages, de la science, des songes et de la divination. Le Soleil, « le Dieu », s'y réjouit.",
      mod:"L'élargissement : les longs voyages, les études supérieures, la philosophie, la spiritualité, l'étranger. La maison de la quête de sens."},
    {n:10, latin:"Regnum", nom:"Le règne", type:"angulaire", mots:["la carrière","la réputation","les honneurs"],
      dom:"dans ta carrière, ta réputation et ce que tu accomplis aux yeux du monde",
      trad:"Le Milieu du Ciel, le plus haut point. La maison des actions, du métier, des honneurs, du roi et de l'autorité, et pour plusieurs auteurs de la mère.",
      mod:"Ta place dans le monde : la vocation, la carrière, l'image publique, l'autorité. Ce vers quoi tu montes."},
    {n:11, latin:"Benefacta", nom:"Les bienfaits", type:"succédente", joie:"jupiter", mots:["les amis","les soutiens","les espoirs"],
      dom:"dans tes amitiés, tes groupes et tes projets d'avenir",
      trad:"La maison des amis, des protecteurs, des espoirs et des bienfaits. Jupiter s'y réjouit : les Grecs l'appelaient « le Bon Génie ».",
      mod:"Les liens choisis : les amis, les réseaux, les causes collectives, les projets et les idéaux. Ce que tu espères pour demain."},
    {n:12, latin:"Carcer", nom:"La prison", type:"cadente", joie:"saturne", mots:["l'épreuve","la solitude","le caché"],
      dom:"dans ta vie intérieure, tes moments de retrait et ce qui se fait en coulisses",
      trad:"La maison des ennemis cachés, des épreuves, de l'exil, des prisons et des hôpitaux, et du gros bétail. Saturne s'y réjouit : « le Mauvais Génie ».",
      mod:"Ce qui se joue en coulisses : la solitude, le retrait, l'inconscient, la spiritualité, le dévouement. La maison où l'on se retrouve seul avec soi."}
  ];

  /* ---------- Les aspects ---------- */
  const ASPECTS = [
    {id:"conj", nom:"Conjonction", gl:"☌", ang:0, orb:8, cls:"conj", nature:"fusion",
      sens:"une fusion : les deux énergies agissent ensemble, pour le meilleur ou pour le pire selon leur nature",
      trad:"Les deux planètes sont dans le même signe et se mêlent. Pour les anciens, la conjonction n'est pas à proprement parler un aspect (un « regard ») : c'est une présence commune.",
      mod:"La rencontre la plus forte : deux fonctions de la psyché soudées, difficiles à distinguer l'une de l'autre."},
    {id:"sext", nom:"Sextile", gl:"⚹", ang:60, orb:4, cls:"doux", nature:"harmonie",
      sens:"une entente facile, une occasion à saisir",
      trad:"Un regard d'amitié entre signes de même polarité (feu et air, terre et eau). Favorable, mais moins puissant que le trigone.",
      mod:"Une collaboration fluide qui demande un petit effort pour se réaliser : une porte ouverte qu'il faut franchir."},
    {id:"carre", nom:"Carré", gl:"□", ang:90, orb:7, cls:"dur", nature:"tension",
      sens:"une tension qui pousse à agir",
      trad:"Un regard d'inimitié, entre signes de même mode mais d'éléments incompatibles. Il apporte conflits et obstacles, surtout avec les maléfiques.",
      mod:"Un frottement intérieur, inconfortable mais très moteur : c'est souvent là que l'on se construit."},
    {id:"trigone", nom:"Trigone", gl:"△", ang:120, orb:7, cls:"doux", nature:"harmonie",
      sens:"une harmonie naturelle, un talent",
      trad:"Le regard le plus amical, entre signes du même élément. Il facilite et protège.",
      mod:"Une aisance donnée d'emblée, un talent naturel, parfois une facilité qui endort."},
    {id:"opp", nom:"Opposition", gl:"☍", ang:180, orb:8, cls:"dur", nature:"tension",
      sens:"un face-à-face à équilibrer",
      trad:"Le regard de l'adversité : deux planètes face à face, dans des signes opposés. Il signifie séparation, rivalité ou procès.",
      mod:"Une polarité : deux besoins qui tirent en sens contraire et qui demandent un équilibre, souvent vécu à travers les autres."},
    {id:"quinc", nom:"Quinconce", gl:"⚻", ang:150, orb:2.5, cls:"mineur", nature:"ajustement", moderne:true,
      sens:"un ajustement délicat, deux logiques qui ne se comprennent pas",
      trad:"Les anciens ne le comptaient pas : les deux signes ne se « voient » pas (on dit qu'ils sont en aversion).",
      mod:"Introduit par Kepler parmi les aspects mineurs : un malaise discret, qui demande des ajustements constants."}
  ];
  /* moitiés d'orbes (moiety) de la tradition arabe, selon al-Biruni */
  const MOIETY = {soleil:7.5, lune:6, mercure:3.5, venus:3.5, mars:4, jupiter:4.5, saturne:4.5, noeudn:2, noeuds:2, asc:2.5, mc:2.5};

  /* ---------- Les dignités essentielles ---------- */
  // Termes « égyptiens » (Ptolémée les rapporte, Dorothée et Valens les utilisent) : [planète, jusqu'au degré]
  const TERMS = {
    belier:[["jupiter",6],["venus",12],["mercure",20],["mars",25],["saturne",30]],
    taureau:[["venus",8],["mercure",14],["jupiter",22],["saturne",27],["mars",30]],
    gemeaux:[["mercure",6],["jupiter",12],["venus",17],["mars",24],["saturne",30]],
    cancer:[["mars",7],["venus",13],["mercure",19],["jupiter",26],["saturne",30]],
    lion:[["jupiter",6],["venus",11],["saturne",18],["mercure",24],["mars",30]],
    vierge:[["mercure",7],["venus",17],["jupiter",21],["mars",28],["saturne",30]],
    balance:[["saturne",6],["mercure",14],["jupiter",21],["venus",28],["mars",30]],
    scorpion:[["mars",7],["venus",11],["mercure",19],["jupiter",24],["saturne",30]],
    sagittaire:[["jupiter",12],["venus",17],["mercure",21],["saturne",26],["mars",30]],
    capricorne:[["mercure",7],["jupiter",14],["venus",22],["saturne",26],["mars",30]],
    verseau:[["mercure",7],["venus",13],["jupiter",20],["mars",25],["saturne",30]],
    poissons:[["venus",12],["jupiter",16],["mercure",19],["mars",28],["saturne",30]]
  };
  // Ordre chaldéen : du plus lent au plus rapide. Il règle les faces (décans) et les heures planétaires.
  const CHALD = ["saturne","jupiter","mars","soleil","venus","mercure","lune"];
  const DIGNITY_PTS = {domicile:5, exaltation:4, triplicite:3, terme:2, face:1, exil:-5, chute:-4};
  const WEEK_RULER = ["soleil","lune","mars","mercure","jupiter","venus","saturne"]; // dimanche → samedi

  /* ---------- Les villes (coordonnées et fuseau, pour calculer sans connexion) ---------- */
  // [nom, pays, latitude, longitude (est positif), fuseau IANA]
  const CITIES = [
    ["Paris","France",48.857,2.352,"Europe/Paris"],["Marseille","France",43.296,5.370,"Europe/Paris"],["Lyon","France",45.764,4.836,"Europe/Paris"],
    ["Toulouse","France",43.605,1.444,"Europe/Paris"],["Nice","France",43.710,7.262,"Europe/Paris"],["Nantes","France",47.218,-1.554,"Europe/Paris"],
    ["Strasbourg","France",48.573,7.752,"Europe/Paris"],["Montpellier","France",43.611,3.877,"Europe/Paris"],["Bordeaux","France",44.838,-0.579,"Europe/Paris"],
    ["Lille","France",50.629,3.057,"Europe/Paris"],["Rennes","France",48.117,-1.678,"Europe/Paris"],["Reims","France",49.258,4.032,"Europe/Paris"],
    ["Le Havre","France",49.494,0.108,"Europe/Paris"],["Saint-Étienne","France",45.440,4.387,"Europe/Paris"],["Toulon","France",43.124,5.928,"Europe/Paris"],
    ["Grenoble","France",45.188,5.724,"Europe/Paris"],["Dijon","France",47.322,5.041,"Europe/Paris"],["Angers","France",47.478,-0.563,"Europe/Paris"],
    ["Nîmes","France",43.837,4.360,"Europe/Paris"],["Clermont-Ferrand","France",45.778,3.087,"Europe/Paris"],["Le Mans","France",48.006,0.199,"Europe/Paris"],
    ["Aix-en-Provence","France",43.530,5.447,"Europe/Paris"],["Brest","France",48.390,-4.486,"Europe/Paris"],["Tours","France",47.394,0.685,"Europe/Paris"],
    ["Amiens","France",49.894,2.296,"Europe/Paris"],["Limoges","France",45.834,1.262,"Europe/Paris"],["Annecy","France",45.900,6.129,"Europe/Paris"],
    ["Perpignan","France",42.699,2.896,"Europe/Paris"],["Metz","France",49.120,6.176,"Europe/Paris"],["Besançon","France",47.238,6.024,"Europe/Paris"],
    ["Orléans","France",47.903,1.909,"Europe/Paris"],["Rouen","France",49.443,1.100,"Europe/Paris"],["Mulhouse","France",47.750,7.336,"Europe/Paris"],
    ["Caen","France",49.183,-0.371,"Europe/Paris"],["Nancy","France",48.692,6.184,"Europe/Paris"],["Avignon","France",43.949,4.806,"Europe/Paris"],
    ["Poitiers","France",46.580,0.340,"Europe/Paris"],["La Rochelle","France",46.160,-1.151,"Europe/Paris"],["Pau","France",43.295,-0.371,"Europe/Paris"],
    ["Bayonne","France",43.493,-1.475,"Europe/Paris"],["Ajaccio","France",41.919,8.738,"Europe/Paris"],["Bastia","France",42.697,9.451,"Europe/Paris"],
    ["Calais","France",50.951,1.858,"Europe/Paris"],["Valence","France",44.933,4.892,"Europe/Paris"],["Chambéry","France",45.564,5.918,"Europe/Paris"],
    ["Troyes","France",48.297,4.074,"Europe/Paris"],["Lorient","France",47.748,-3.370,"Europe/Paris"],["Quimper","France",47.996,-4.102,"Europe/Paris"],
    ["Vannes","France",47.658,-2.760,"Europe/Paris"],["Saint-Malo","France",48.649,-2.026,"Europe/Paris"],["Cherbourg","France",49.640,-1.616,"Europe/Paris"],
    ["Colmar","France",48.079,7.358,"Europe/Paris"],["Béziers","France",43.344,3.216,"Europe/Paris"],["Carcassonne","France",43.213,2.351,"Europe/Paris"],
    ["Albi","France",43.929,2.148,"Europe/Paris"],["Montauban","France",44.018,1.355,"Europe/Paris"],["Agen","France",44.203,0.616,"Europe/Paris"],
    ["Périgueux","France",45.184,0.721,"Europe/Paris"],["Angoulême","France",45.649,0.156,"Europe/Paris"],["Niort","France",46.324,-0.459,"Europe/Paris"],
    ["Bourges","France",47.081,2.399,"Europe/Paris"],["Nevers","France",46.990,3.159,"Europe/Paris"],["Auxerre","France",47.798,3.567,"Europe/Paris"],
    ["Châlons-en-Champagne","France",48.957,4.363,"Europe/Paris"],["Charleville-Mézières","France",49.762,4.726,"Europe/Paris"],["Beauvais","France",49.430,2.081,"Europe/Paris"],
    ["Arras","France",50.291,2.778,"Europe/Paris"],["Dunkerque","France",51.034,2.377,"Europe/Paris"],["Laval","France",48.073,-0.770,"Europe/Paris"],
    ["Saint-Brieuc","France",48.514,-2.765,"Europe/Paris"],["La Roche-sur-Yon","France",46.670,-1.426,"Europe/Paris"],["Blois","France",47.586,1.335,"Europe/Paris"],
    ["Chartres","France",48.446,1.489,"Europe/Paris"],["Évreux","France",49.024,1.151,"Europe/Paris"],["Versailles","France",48.805,2.120,"Europe/Paris"],
    ["Saint-Denis","France",48.936,2.357,"Europe/Paris"],["Créteil","France",48.790,2.455,"Europe/Paris"],["Nanterre","France",48.892,2.207,"Europe/Paris"],
    ["Bobigny","France",48.908,2.439,"Europe/Paris"],["Cergy","France",49.036,2.076,"Europe/Paris"],["Évry","France",48.629,2.441,"Europe/Paris"],
    ["Melun","France",48.540,2.660,"Europe/Paris"],["Gap","France",44.559,6.079,"Europe/Paris"],["Digne-les-Bains","France",44.093,6.236,"Europe/Paris"],
    ["Mende","France",44.518,3.500,"Europe/Paris"],["Rodez","France",44.350,2.575,"Europe/Paris"],["Cahors","France",44.448,1.441,"Europe/Paris"],
    ["Tarbes","France",43.233,0.078,"Europe/Paris"],["Foix","France",42.965,1.607,"Europe/Paris"],["Aurillac","France",44.926,2.440,"Europe/Paris"],
    ["Le Puy-en-Velay","France",45.043,3.885,"Europe/Paris"],["Vichy","France",46.127,3.426,"Europe/Paris"],["Moulins","France",46.566,3.333,"Europe/Paris"],
    ["Guéret","France",46.171,1.871,"Europe/Paris"],["Tulle","France",45.267,1.772,"Europe/Paris"],["Mâcon","France",46.307,4.828,"Europe/Paris"],
    ["Bourg-en-Bresse","France",46.205,5.226,"Europe/Paris"],["Lons-le-Saunier","France",46.675,5.555,"Europe/Paris"],["Belfort","France",47.638,6.863,"Europe/Paris"],
    ["Épinal","France",48.174,6.450,"Europe/Paris"],["Vesoul","France",47.623,6.155,"Europe/Paris"],["Bar-le-Duc","France",48.772,5.160,"Europe/Paris"],
    ["Fort-de-France","Martinique",14.616,-61.059,"America/Martinique"],["Pointe-à-Pitre","Guadeloupe",16.241,-61.533,"America/Guadeloupe"],
    ["Cayenne","Guyane",4.938,-52.326,"America/Cayenne"],["Saint-Denis (La Réunion)","La Réunion",-20.882,55.451,"Indian/Reunion"],
    ["Mamoudzou","Mayotte",-12.781,45.228,"Indian/Mayotte"],["Nouméa","Nouvelle-Calédonie",-22.276,166.458,"Pacific/Noumea"],
    ["Papeete","Polynésie française",-17.535,-149.570,"Pacific/Tahiti"],["Saint-Pierre","Saint-Pierre-et-Miquelon",46.780,-56.177,"America/Miquelon"],
    ["Monaco","Monaco",43.738,7.424,"Europe/Monaco"],["Bruxelles","Belgique",50.847,4.357,"Europe/Brussels"],["Liège","Belgique",50.633,5.567,"Europe/Brussels"],
    ["Namur","Belgique",50.467,4.867,"Europe/Brussels"],["Charleroi","Belgique",50.411,4.444,"Europe/Brussels"],["Anvers","Belgique",51.219,4.402,"Europe/Brussels"],
    ["Luxembourg","Luxembourg",49.611,6.130,"Europe/Luxembourg"],["Genève","Suisse",46.204,6.143,"Europe/Zurich"],["Lausanne","Suisse",46.520,6.633,"Europe/Zurich"],
    ["Zurich","Suisse",47.377,8.540,"Europe/Zurich"],["Berne","Suisse",46.948,7.447,"Europe/Zurich"],["Neuchâtel","Suisse",46.990,6.931,"Europe/Zurich"],
    ["Montréal","Canada",45.502,-73.567,"America/Toronto"],["Québec","Canada",46.813,-71.208,"America/Toronto"],["Ottawa","Canada",45.421,-75.697,"America/Toronto"],
    ["Toronto","Canada",43.653,-79.383,"America/Toronto"],["Vancouver","Canada",49.283,-123.121,"America/Vancouver"],
    ["Alger","Algérie",36.754,3.059,"Africa/Algiers"],["Oran","Algérie",35.697,-0.633,"Africa/Algiers"],["Constantine","Algérie",36.365,6.615,"Africa/Algiers"],
    ["Tunis","Tunisie",36.806,10.181,"Africa/Tunis"],["Sfax","Tunisie",34.740,10.760,"Africa/Tunis"],["Casablanca","Maroc",33.573,-7.590,"Africa/Casablanca"],
    ["Rabat","Maroc",34.020,-6.841,"Africa/Casablanca"],["Marrakech","Maroc",31.630,-7.990,"Africa/Casablanca"],["Fès","Maroc",34.033,-5.000,"Africa/Casablanca"],
    ["Tanger","Maroc",35.759,-5.834,"Africa/Casablanca"],["Dakar","Sénégal",14.716,-17.467,"Africa/Dakar"],["Abidjan","Côte d'Ivoire",5.360,-4.008,"Africa/Abidjan"],
    ["Bamako","Mali",12.639,-8.003,"Africa/Bamako"],["Ouagadougou","Burkina Faso",12.371,-1.520,"Africa/Ouagadougou"],["Niamey","Niger",13.512,2.112,"Africa/Niamey"],
    ["Conakry","Guinée",9.641,-13.578,"Africa/Conakry"],["Lomé","Togo",6.131,1.223,"Africa/Lome"],["Cotonou","Bénin",6.366,2.418,"Africa/Porto-Novo"],
    ["Douala","Cameroun",4.051,9.768,"Africa/Douala"],["Yaoundé","Cameroun",3.848,11.502,"Africa/Douala"],["Libreville","Gabon",0.416,9.467,"Africa/Libreville"],
    ["Kinshasa","RD Congo",-4.441,15.266,"Africa/Kinshasa"],["Brazzaville","Congo",-4.263,15.242,"Africa/Brazzaville"],["Antananarivo","Madagascar",-18.879,47.508,"Indian/Antananarivo"],
    ["Port-Louis","Maurice",-20.161,57.499,"Indian/Mauritius"],["Port-au-Prince","Haïti",18.594,-72.307,"America/Port-au-Prince"],["Beyrouth","Liban",33.894,35.502,"Asia/Beirut"],
    ["Le Caire","Égypte",30.044,31.236,"Africa/Cairo"],["Johannesburg","Afrique du Sud",-26.204,28.047,"Africa/Johannesburg"],["Nairobi","Kenya",-1.292,36.822,"Africa/Nairobi"],
    ["Londres","Royaume-Uni",51.507,-0.128,"Europe/London"],["Édimbourg","Royaume-Uni",55.953,-3.189,"Europe/London"],["Dublin","Irlande",53.350,-6.260,"Europe/Dublin"],
    ["Madrid","Espagne",40.417,-3.704,"Europe/Madrid"],["Barcelone","Espagne",41.385,2.173,"Europe/Madrid"],["Séville","Espagne",37.389,-5.984,"Europe/Madrid"],
    ["Lisbonne","Portugal",38.722,-9.139,"Europe/Lisbon"],["Porto","Portugal",41.158,-8.629,"Europe/Lisbon"],["Rome","Italie",41.903,12.496,"Europe/Rome"],
    ["Milan","Italie",45.464,9.190,"Europe/Rome"],["Naples","Italie",40.852,14.268,"Europe/Rome"],["Turin","Italie",45.070,7.687,"Europe/Rome"],
    ["Florence","Italie",43.770,11.255,"Europe/Rome"],["Venise","Italie",45.441,12.316,"Europe/Rome"],["Berlin","Allemagne",52.520,13.405,"Europe/Berlin"],
    ["Munich","Allemagne",48.137,11.576,"Europe/Berlin"],["Francfort","Allemagne",50.110,8.682,"Europe/Berlin"],["Hambourg","Allemagne",53.551,9.994,"Europe/Berlin"],
    ["Cologne","Allemagne",50.938,6.960,"Europe/Berlin"],["Amsterdam","Pays-Bas",52.370,4.895,"Europe/Amsterdam"],["Vienne","Autriche",48.208,16.374,"Europe/Vienna"],
    ["Prague","Tchéquie",50.076,14.438,"Europe/Prague"],["Varsovie","Pologne",52.230,21.012,"Europe/Warsaw"],["Budapest","Hongrie",47.498,19.040,"Europe/Budapest"],
    ["Bucarest","Roumanie",44.426,26.103,"Europe/Bucharest"],["Athènes","Grèce",37.984,23.728,"Europe/Athens"],["Istanbul","Turquie",41.008,28.978,"Europe/Istanbul"],
    ["Copenhague","Danemark",55.676,12.568,"Europe/Copenhagen"],["Stockholm","Suède",59.329,18.069,"Europe/Stockholm"],["Oslo","Norvège",59.914,10.752,"Europe/Oslo"],
    ["Helsinki","Finlande",60.170,24.938,"Europe/Helsinki"],["Moscou","Russie",55.756,37.617,"Europe/Moscow"],["Kiev","Ukraine",50.450,30.524,"Europe/Kyiv"],
    ["New York","États-Unis",40.713,-74.006,"America/New_York"],["Washington","États-Unis",38.907,-77.037,"America/New_York"],["Miami","États-Unis",25.762,-80.192,"America/New_York"],
    ["Chicago","États-Unis",41.878,-87.630,"America/Chicago"],["La Nouvelle-Orléans","États-Unis",29.951,-90.072,"America/Chicago"],["Los Angeles","États-Unis",34.052,-118.244,"America/Los_Angeles"],
    ["San Francisco","États-Unis",37.775,-122.419,"America/Los_Angeles"],["Mexico","Mexique",19.433,-99.133,"America/Mexico_City"],["La Havane","Cuba",23.113,-82.366,"America/Havana"],
    ["Bogota","Colombie",4.711,-74.072,"America/Bogota"],["Lima","Pérou",-12.046,-77.043,"America/Lima"],["Santiago","Chili",-33.449,-70.669,"America/Santiago"],
    ["Buenos Aires","Argentine",-34.604,-58.382,"America/Argentina/Buenos_Aires"],["São Paulo","Brésil",-23.551,-46.633,"America/Sao_Paulo"],["Rio de Janeiro","Brésil",-22.907,-43.173,"America/Sao_Paulo"],
    ["Tokyo","Japon",35.676,139.650,"Asia/Tokyo"],["Pékin","Chine",39.904,116.407,"Asia/Shanghai"],["Shanghai","Chine",31.230,121.474,"Asia/Shanghai"],
    ["Hong Kong","Chine",22.320,114.169,"Asia/Hong_Kong"],["Séoul","Corée du Sud",37.567,126.978,"Asia/Seoul"],["Hanoï","Viêt Nam",21.028,105.834,"Asia/Ho_Chi_Minh"],
    ["Hô Chi Minh-Ville","Viêt Nam",10.823,106.630,"Asia/Ho_Chi_Minh"],["Phnom Penh","Cambodge",11.556,104.928,"Asia/Phnom_Penh"],["Bangkok","Thaïlande",13.756,100.502,"Asia/Bangkok"],
    ["Singapour","Singapour",1.352,103.820,"Asia/Singapore"],["Bombay","Inde",19.076,72.878,"Asia/Kolkata"],["New Delhi","Inde",28.614,77.209,"Asia/Kolkata"],
    ["Pondichéry","Inde",11.934,79.830,"Asia/Kolkata"],["Dubaï","Émirats arabes unis",25.205,55.271,"Asia/Dubai"],["Téhéran","Iran",35.689,51.389,"Asia/Tehran"],
    ["Jérusalem","Israël",31.769,35.216,"Asia/Jerusalem"],["Sydney","Australie",-33.869,151.209,"Australia/Sydney"],["Melbourne","Australie",-37.814,144.963,"Australia/Melbourne"],
    ["Auckland","Nouvelle-Zélande",-36.849,174.763,"Pacific/Auckland"]
  ];

  return {T, PLANETS, ANGLES, SIGNS, ELEMENTS, MODES, HOUSES, ASPECTS, MOIETY, TERMS, CHALD, DIGNITY_PTS, WEEK_RULER, CITIES};
})();

;
/* ===== Arcanes · Astrologie : le cours et l'histoire =====
   Huit modules, du ciel vu de la Terre jusqu'aux techniques de prévision.
   Chaque leçon : quelques paragraphes, l'essentiel à retenir, parfois un schéma (w). */
const ASTRO_COURS = [
  {id:"bases", t:"Les bases", d:"Le ciel vu de la Terre, le zodiaque, deux écoles", fiches:null, quiz:"bases", lecons:[
    {t:"Qu'est-ce qu'un thème astral ?", p:[
      "Un thème astral est une carte du ciel à un instant précis, vu depuis un lieu précis. On le dresse en général pour une naissance, mais on peut le faire pour n'importe quel moment : le début d'un voyage, la fondation d'une ville, une question posée.",
      "On y lit trois choses, et ce sont les trois questions de toute lecture. Les <b>planètes</b> disent <i>quoi</i> : une fonction, un besoin, un domaine de la vie. Les <b>signes</b> disent <i>comment</i> : le style, la couleur que prend cette fonction. Les <b>maisons</b> disent <i>où</i> : le terrain concret où elle s'exprime.",
      "Les <b>aspects</b>, enfin, sont les angles que les planètes forment entre elles : ils disent comment ces fonctions dialoguent, s'entendent ou se heurtent.",
      "« Vénus en Bélier en maison VII », c'est donc : ta façon d'aimer (Vénus) se vit avec élan et franchise (Bélier) dans tes relations de couple (maison VII). Toute l'astrologie consiste à combiner ces briques, puis à les hiérarchiser."],
      ret:["Planète = quoi · Signe = comment · Maison = où","Les aspects relient les planètes entre elles","Un thème se dresse pour un instant et un lieu"]},
    {t:"Le zodiaque et l'écliptique", w:"zodiaque", p:[
      "Vue de la Terre, le Soleil semble faire le tour du ciel en un an, en suivant toujours le même chemin parmi les étoiles : l'<b>écliptique</b>. La Lune et les planètes restent tout près de ce chemin, dans une bande d'une quinzaine de degrés de large : le <b>zodiaque</b>, « le cercle des animaux ».",
      "Les astronomes babyloniens ont découpé cette bande en douze parts égales de 30° vers le Ve siècle avant notre ère. Ce sont les signes. En Occident, on les compte depuis l'équinoxe de printemps : le 0° Bélier est le point où le Soleil se trouve au premier jour du printemps. C'est le <b>zodiaque tropical</b>, lié aux saisons.",
      "Les <b>constellations</b> qui ont donné leur nom aux signes, elles, ont glissé. L'axe de la Terre tourne lentement comme une toupie, et le point du printemps recule d'un degré tous les 72 ans environ : c'est la <b>précession des équinoxes</b>, découverte par Hipparque vers 130 avant notre ère. Aujourd'hui, l'écart atteint presque 25° : le Soleil du « Bélier » se trouve en réalité devant la constellation des Poissons.",
      "L'astrologie indienne (jyotish) suit le zodiaque des étoiles, dit <b>sidéral</b>. L'astrologie occidentale, ancienne comme moderne, garde le zodiaque des saisons. Ce n'est pas une erreur : ce sont deux conventions différentes."],
      ret:["Zodiaque = bande du ciel autour de l'écliptique","Signes = 12 secteurs de 30°, comptés depuis l'équinoxe de printemps","Constellations ≠ signes, à cause de la précession"]},
    {t:"Comment bougent les astres", w:"retro", p:[
      "Toutes les planètes avancent dans le même sens à travers le zodiaque, du Bélier vers le Taureau, mais à des vitesses très différentes : la Lune parcourt un signe en deux jours et demi, Saturne en deux ans et demi, Pluton en vingt ans ou plus.",
      "Parfois, une planète semble s'arrêter, reculer, puis repartir. C'est la <b>rétrogradation</b>. Elle est apparente : la Terre, qui tourne elle aussi autour du Soleil, double la planète (ou se fait doubler par elle), comme une voiture semble reculer quand on la dépasse sur l'autoroute. Les moments d'arrêt s'appellent les <b>stations</b>.",
      "Mercure et Vénus tournent plus près du Soleil que nous : vus de la Terre, ils ne s'en écartent jamais beaucoup, 28° au plus pour Mercure, 47° pour Vénus. Ils sont donc souvent dans le même signe que le Soleil, ou dans un signe voisin.",
      "Le Soleil et la Lune ne rétrogradent jamais. Les nœuds lunaires, eux, reculent en permanence."],
      ret:["Plus une planète est loin, plus elle est lente","Rétrograder = paraître reculer, vu de la Terre","Mercure et Vénus restent près du Soleil"]},
    {t:"Deux écoles, une même carte", p:[
      "Arcanes présente toujours deux lectures, parce que l'astrologie d'aujourd'hui en a deux grandes, qui utilisent la même carte du ciel mais ne la lisent pas de la même façon.",
      "L'<b>astrologie traditionnelle</b> est celle des auteurs grecs, arabes et latins, de Ptolémée et Vettius Valens à Guido Bonatti, William Lilly et Morin de Villefranche. Elle travaille avec les sept astres visibles à l'œil nu, mesure la force de chaque planète par ses <b>dignités</b>, distingue les thèmes de jour et de nuit (la <b>secte</b>), et vise des jugements concrets : santé, biens, mariage, métier, événements. Depuis les années 1980, elle connaît un vrai renouveau grâce aux traductions de textes anciens et à des praticiens comme Robert Hand aux États-Unis ou Denis Labouré dans le monde francophone.",
      "L'<b>astrologie moderne</b>, née à la fin du XIXe siècle avec Alan Leo puis renouvelée par Dane Rudhyar, André Barbault et Liz Greene, ajoute Uranus, Neptune et Pluton, s'appuie sur la psychologie (Freud, Jung) et parle plutôt de caractère, de potentiel et d'évolution intérieure que d'événements.",
      "Concrètement, elles diffèrent sur : le nombre de planètes, les maîtres du Scorpion, du Verseau et des Poissons, le système de maisons (signes entiers ou Regiomontanus pour beaucoup de traditionalistes, Placidus pour la plupart des modernes), la taille des orbes, et la façon de hiérarchiser. Dans le module « Mon espace », tu peux choisir l'école utilisée par défaut pour calculer tes thèmes."],
      ret:["Tradition : 7 astres, dignités, secte, jugements concrets","Moderne : 10 planètes, psychologie, évolution","Même ciel, deux grilles de lecture"]}
  ]},

  {id:"planetes", t:"Les planètes", d:"Dix astres et deux nœuds : ce qu'ils signifient", fiches:"planetes", quiz:"planetes", lecons:[
    {t:"Les deux luminaires", p:[
      "Le Soleil et la Lune ne sont pas des planètes au sens astronomique, mais l'astrologie les compte parmi les « planètes », c'est-à-dire les astres errants. On les appelle les <b>luminaires</b>.",
      "Le <b>Soleil</b> est le principe actif, la conscience, la vitalité, la volonté. Il règne sur le jour. La <b>Lune</b> est le principe réceptif, la sensibilité, le corps, la mémoire. Elle règne sur la nuit.",
      "Dans un thème, ce sont les deux premiers points à regarder, avec l'Ascendant : le Soleil dit ce vers quoi tu vas, la Lune ce dont tu as besoin pour te sentir bien. Un Soleil en Lion avec une Lune en Vierge, par exemple, veut briller mais a besoin d'ordre et d'utilité pour être tranquille.",
      "La tradition y lit aussi le père (Soleil le jour) et la mère (Lune la nuit), et pour les thèmes de jour ou de nuit, le luminaire « de secte » est le chef du thème."],
      ret:["Soleil = conscience, volonté, père","Lune = besoins, émotions, mère","Avec l'Ascendant, le trio de base de toute lecture"]},
    {t:"Mercure, Vénus et Mars", p:[
      "Ce sont les planètes dites <b>personnelles</b> : rapides, elles décrivent ta façon de penser, d'aimer et d'agir.",
      "<b>Mercure</b> est l'intelligence pratique : parler, écrire, compter, négocier, apprendre. Il est changeant : il prend la couleur des planètes qu'il touche.",
      "<b>Vénus</b> est l'attraction : le plaisir, la beauté, l'amour, l'accord. Elle dit ce que tu aimes et comment tu crées de l'harmonie.",
      "<b>Mars</b> est la force d'action : le désir, le courage, la colère, la compétition. Il dit comment tu passes à l'acte. Vénus et Mars forment un couple : l'une attire, l'autre conquiert."],
      ret:["Mercure = pensée et parole","Vénus = amour et plaisir","Mars = action et désir"]},
    {t:"Jupiter et Saturne, les grands rythmes", p:[
      "<b>Jupiter</b> (12 ans) et <b>Saturne</b> (29 ans et demi) sont les plus lents des astres visibles à l'œil nu. Ils marquent les grandes étapes de la vie et ce qui relie l'individu à la société.",
      "Jupiter élargit : la confiance, la croissance, la chance, le sens, la loi. Saturne contracte et structure : les limites, le temps, l'effort, la responsabilité, la maturité.",
      "Leurs retours rythment l'existence. Le retour de Saturne à sa position de naissance, vers 29 ans, est un passage célèbre : on y quitte souvent une vie qui n'était pas vraiment la sienne. Leur conjonction, tous les vingt ans environ, était pour les astrologues arabes comme Abu Ma'shar l'horloge de l'histoire : les « grandes conjonctions »."],
      ret:["Jupiter = expansion, confiance, sens","Saturne = structure, limites, temps","Leurs cycles rythment la vie"]},
    {t:"Uranus, Neptune, Pluton", p:[
      "Invisibles à l'œil nu, ces trois planètes ont été découvertes au télescope : Uranus en 1781, Neptune en 1846, Pluton en 1930. L'astrologie traditionnelle ne les utilise pas, ou à peine.",
      "L'astrologie moderne leur a donné un sens en les reliant aux époques de leur découverte. <b>Uranus</b>, trouvée au temps des révolutions américaine et française, parle de liberté, de rupture et d'innovation. <b>Neptune</b>, au temps du romantisme et des débuts de la photographie, de rêve, d'idéal, de dissolution. <b>Pluton</b>, à l'époque de la psychanalyse et de l'atome, de pouvoir, de crise et de transformation.",
      "Elles sont si lentes que tout le monde, sur plusieurs années, les a dans le même signe : on les dit <b>générationnelles</b>. Ce qui compte, c'est leur maison et leurs aspects aux planètes personnelles.",
      "Elles ont reçu des « maîtrises » modernes : Uranus le Verseau, Neptune les Poissons, Pluton le Scorpion. La tradition garde les maîtres anciens : Saturne, Jupiter et Mars."],
      ret:["Planètes modernes = invisibles à l'œil nu","Générationnelles : regarde leur maison et leurs aspects","Maîtrises modernes : ♅ Verseau, ♆ Poissons, ♇ Scorpion"]},
    {t:"Bénéfiques, maléfiques et secte", p:[
      "Pour la tradition, les planètes ne se valent pas. <b>Jupiter</b> et <b>Vénus</b> sont les <b>bénéfiques</b> : tempérées, elles favorisent. <b>Saturne</b> et <b>Mars</b> sont les <b>maléfiques</b> : excessivement froid pour l'un, excessivement chaud pour l'autre, ils éprouvent. Mercure est neutre, les luminaires à part.",
      "Mais tout dépend de la <b>secte</b>. Un thème est <b>diurne</b> si le Soleil est au-dessus de l'horizon (maisons VII à XII), <b>nocturne</b> s'il est en dessous. Le parti du jour réunit le Soleil, Jupiter et Saturne ; celui de la nuit, la Lune, Vénus et Mars.",
      "Une planète « de secte » est plus à l'aise. Dans un thème de jour, Saturne est tempéré par la chaleur du jour et Mars est le plus difficile ; dans un thème de nuit, c'est l'inverse : Mars est adouci par la fraîcheur nocturne et Saturne devient le plus lourd. Robert Hand a consacré un livre entier à cette règle oubliée, redécouverte dans les textes grecs.",
      "L'astrologie moderne ne parle plus de bénéfiques ni de maléfiques : chaque planète est une fonction nécessaire, ni bonne ni mauvaise. C'est l'une des grandes différences entre les deux écoles."],
      ret:["Bénéfiques : ♃ ♀ · Maléfiques : ♄ ♂","Thème diurne = Soleil au-dessus de l'horizon","Le maléfique contraire à la secte est le plus difficile"]},
    {t:"Les nœuds de la Lune", p:[
      "L'orbite de la Lune est inclinée d'environ 5° sur l'écliptique. Elle la croise en deux points opposés : les <b>nœuds</b>. Le nœud nord (ou ascendant), là où la Lune passe au-dessus de l'écliptique ; le nœud sud, là où elle repasse dessous.",
      "Les éclipses ont lieu quand une nouvelle lune ou une pleine lune tombe près d'un nœud : le Soleil, la Lune et la Terre sont alors alignés. D'où les noms anciens de <b>Tête</b> et de <b>Queue du Dragon</b>, le dragon qui avale le Soleil.",
      "Les médiévaux faisaient de la Tête un point favorable, de la Queue un point défavorable. L'astrologie humaniste y voit un axe d'évolution : le nœud sud, ce qui est acquis et confortable ; le nœud nord, la direction à prendre."],
      ret:["Nœuds = croisements de l'orbite lunaire et de l'écliptique","Éclipses près des nœuds","Tête du Dragon ☊ · Queue du Dragon ☋"]}
  ]},

  {id:"signes", t:"Les signes", d:"Éléments, modes et le tour du zodiaque", fiches:"signes", quiz:"signes", lecons:[
    {t:"Les quatre éléments", w:"elements", p:[
      "Chaque signe appartient à l'un des quatre éléments de la physique grecque, ceux d'Empédocle et d'Aristote : le <b>feu</b>, la <b>terre</b>, l'<b>air</b> et l'<b>eau</b>. Ils reviennent dans cet ordre, trois fois, autour du zodiaque.",
      "Pour les anciens, chaque élément combine deux qualités : le feu est chaud et sec, la terre froide et sèche, l'air chaud et humide, l'eau froide et humide. Le chaud dilate et active, le froid resserre ; le sec sépare et définit, l'humide unit et assouplit. Toute l'astrologie traditionnelle raisonne avec ces qualités, jusqu'au tempérament et à la médecine.",
      "Les modernes y lisent quatre façons d'être : le feu agit et inspire, la terre construit et concrétise, l'air pense et relie, l'eau ressent et accueille. Compter les planètes par élément donne une première image d'un thème : un manque de terre, un excès d'eau.",
      "Les signes d'un même élément forment un triangle : on parle de <b>triplicité</b>. Ils se regardent en trigone, l'aspect le plus harmonieux."],
      ret:["Feu ♈♌♐ · Terre ♉♍♑ · Air ♊♎♒ · Eau ♋♏♓","Chaud/froid, sec/humide","Même élément = trigone"]},
    {t:"Cardinaux, fixes, mutables", p:[
      "Le zodiaque tropical est un calendrier des saisons. Chaque saison compte trois signes, et ils jouent toujours le même rôle.",
      "Les signes <b>cardinaux</b> ouvrent les saisons, aux équinoxes et aux solstices : Bélier, Cancer, Balance, Capricorne. Ils lancent, ils initient. Les signes <b>fixes</b> sont le cœur des saisons : Taureau, Lion, Scorpion, Verseau. Ils stabilisent et persévèrent. Les signes <b>mutables</b> (les anciens disaient « doubles » ou « bicorporels ») terminent les saisons et préparent la suivante : Gémeaux, Vierge, Sagittaire, Poissons. Ils s'adaptent.",
      "Les signes d'un même mode forment une croix : ils se regardent en carré ou en opposition. C'est pourquoi les tensions d'un thème se jouent souvent entre signes de même rythme."],
      ret:["Cardinal = lancer","Fixe = tenir","Mutable = s'adapter","Même mode = carré ou opposition"]},
    {t:"Polarités et axes", p:[
      "Les signes alternent entre <b>masculins</b> (ou diurnes, ou yang) : les signes de feu et d'air, et <b>féminins</b> (ou nocturnes, ou yin) : les signes de terre et d'eau. Les mots sont anciens et ne parlent pas de genre : ils opposent l'élan qui va vers l'extérieur et la force qui recueille.",
      "Les signes opposés forment six <b>axes</b>, et chaque axe est une même question vue des deux côtés : Bélier-Balance, moi et l'autre ; Taureau-Scorpion, posséder et partager ; Gémeaux-Sagittaire, l'information et le sens ; Cancer-Capricorne, le foyer et le monde ; Lion-Verseau, l'individu et le groupe ; Vierge-Poissons, l'ordre et l'abandon.",
      "Lire un thème par axes plutôt que signe par signe évite bien des contresens : une planète en Balance parle toujours aussi, en creux, du Bélier."],
      ret:["Feu et air : masculins · Terre et eau : féminins","6 axes : une question, deux réponses"]},
    {t:"Le tour du zodiaque", p:[
      "On peut lire les douze signes comme une seule histoire, celle de l'année et celle d'une vie.",
      "Au <b>printemps</b>, le Bélier jaillit comme la pousse, le Taureau s'enracine et savoure, les Gémeaux découvrent et nomment le monde. En <b>été</b>, le Cancer construit le nid, le Lion s'épanouit en pleine lumière, la Vierge moissonne et trie. À l'<b>automne</b>, la Balance rencontre l'autre, le Scorpion descend dans les profondeurs et transforme, le Sagittaire part au loin chercher un sens. En <b>hiver</b>, le Capricorne bâtit et gravit, le Verseau imagine l'avenir commun, les Poissons dissolvent tout pour préparer un nouveau départ.",
      "Chaque signe répond au précédent : il apporte ce qui lui manquait. C'est la logique du zodiaque, et c'est elle qu'il faut retenir plutôt que des listes d'adjectifs."],
      ret:["Le zodiaque raconte un cycle complet","Chaque signe corrige le précédent"]}
  ]},

  {id:"maisons", t:"Les maisons", d:"L'horizon, les angles et les douze domaines", fiches:"maisons", quiz:"maisons", lecons:[
    {t:"L'horizon et les quatre angles", w:"maisons", p:[
      "Si les signes viennent du mouvement annuel du Soleil, les maisons viennent du mouvement de chaque jour : en 24 heures, tout le zodiaque se lève à l'est, culmine au sud et se couche à l'ouest.",
      "Quatre points forment la croix du thème. L'<b>Ascendant</b> (AS) est le degré du zodiaque qui se lève à l'horizon est au moment de la naissance : il change de signe environ toutes les deux heures, c'est pourquoi l'heure de naissance compte tant. En face, le <b>Descendant</b> (DS) se couche à l'ouest. Le <b>Milieu du Ciel</b> (MC) culmine au sud, au plus haut ; le <b>Fond du Ciel</b> (FC) est au plus bas, sous nos pieds.",
      "Sur la roue d'Arcanes, l'Ascendant est à gauche et le Milieu du Ciel en haut : on regarde vers le sud, l'est à gauche, comme sur les cartes du ciel anciennes.",
      "L'Ascendant est la première maison : ta façon d'aborder la vie, ton corps, ton allure. Le MC dit ta place dans le monde. Pour la tradition, l'Ascendant est « l'horoscope », celui qui regarde l'heure, et son maître représente la personne elle-même."],
      ret:["AS à l'est · DS à l'ouest · MC au sud · FC au nord","L'Ascendant change de signe toutes les deux heures environ","Sans heure de naissance, pas de maisons fiables"]},
    {t:"Angulaires, succédentes, cadentes", p:[
      "Les douze maisons se répartissent en trois groupes. Les maisons <b>angulaires</b> (I, IV, VII, X) commencent aux angles : elles sont les plus fortes, les planètes qui s'y trouvent agissent de façon visible. Les maisons <b>succédentes</b> (II, V, VIII, XI) les suivent : elles stabilisent et accumulent. Les maisons <b>cadentes</b> (III, VI, IX, XII) « tombent » des angles : les planètes y sont plus discrètes.",
      "Pour la tradition, c'est une dignité <b>accidentelle</b> : une planète angulaire est forte, une planète cadente faible. Les modernes, avec Michel Gauquelin, ont remarqué que les planètes juste après le lever ou la culmination (donc en fin de maisons XII et IX) semblaient elles aussi fortes.",
      "La tradition distingue aussi les maisons qui « voient » l'Ascendant de celles qui ne le voient pas. Les maisons II, VI, VIII et XII ne forment aucun aspect avec la première : elles sont en <b>aversion</b>, et c'est pourquoi on les disait difficiles."],
      ret:["Angulaires I IV VII X = fortes","Succédentes II V VIII XI · Cadentes III VI IX XII","II, VI, VIII, XII ne voient pas l'Ascendant"]},
    {t:"Les systèmes de maisons", p:[
      "Partager le ciel en douze n'a rien d'évident, et les astrologues ont proposé de nombreuses méthodes au cours des siècles.",
      "La plus ancienne est celle des <b>signes entiers</b> : le signe qui se lève tout entier forme la maison I, le suivant la maison II, et ainsi de suite. C'est la méthode des astrologues hellénistiques, simple et robuste, revenue en force aujourd'hui. Le système <b>égal</b> compte des maisons de 30° depuis le degré de l'Ascendant.",
      "Au Moyen Âge et à la Renaissance, on a cherché à partager l'espace ou le temps : <b>Porphyre</b> coupe en trois chaque quart du ciel, <b>Regiomontanus</b> (XVe siècle) partage l'équateur céleste ; c'est le système de William Lilly et de Morin de Villefranche. <b>Placidus</b> (XVIIe siècle) partage le temps que met chaque degré à monter de l'horizon au méridien : diffusé par les éphémérides anglaises du XIXe siècle, il est devenu le standard de l'astrologie moderne.",
      "Ces systèmes se mettent d'accord sur les angles, mais pas sur les cuspides intermédiaires, surtout loin de l'équateur : une planète peut changer de maison selon le système. Au-delà du cercle polaire, Placidus ne fonctionne plus du tout. Arcanes propose les signes entiers, Placidus, Regiomontanus et le système égal."],
      ret:["Signes entiers = la méthode hellénistique","Regiomontanus = Lilly, Morin","Placidus = le standard moderne"]},
    {t:"Les joies des planètes", p:[
      "Chaque planète se réjouit dans une maison où elle est particulièrement à son aise. C'est une très vieille doctrine grecque, et elle explique le nom ancien de plusieurs maisons.",
      "Mercure se réjouit en I. La Lune en III, la maison de « la Déesse », et le Soleil en IX, celle du « Dieu » : les deux luminaires se font face. Vénus en V, « la Bonne Fortune », et Mars en VI, « la Mauvaise Fortune ». Jupiter en XI, « le Bon Génie », et Saturne en XII, « le Mauvais Génie ».",
      "On remarque la logique : les bénéfiques se réjouissent dans les maisons succédentes de droite (V et XI), les maléfiques dans les cadentes (VI et XII), les luminaires sur l'axe III-IX, celui de la religion. Les joies sont une clé précieuse pour comprendre le sens traditionnel des maisons."],
      ret:["☿ I · ☽ III · ♀ V · ♂ VI · ☉ IX · ♃ XI · ♄ XII"]}
  ]},

  {id:"aspects", t:"Les aspects", d:"Les regards entre planètes", fiches:"aspects", quiz:"aspects", lecons:[
    {t:"Le regard des planètes", w:"aspects", p:[
      "Les anciens disaient que les planètes se « regardent ». Ces regards, ce sont les <b>aspects</b>, et ils viennent directement de la géométrie du zodiaque.",
      "Deux signes séparés par deux signes (60°) sont de même polarité : c'est le <b>sextile</b>, amical. Séparés par trois (90°), ils sont de même mode mais d'éléments incompatibles : c'est le <b>carré</b>, tendu. Séparés par quatre (120°), ils partagent l'élément : c'est le <b>trigone</b>, le plus harmonieux. Face à face (180°), c'est l'<b>opposition</b>. Ensemble, dans le même signe, c'est la <b>conjonction</b>.",
      "Ce sont les cinq aspects dits <b>ptoléméens</b>, les seuls que connaît la tradition. Les signes qui ne se regardent pas (voisins, ou séparés par cinq signes) sont dits en <b>aversion</b>.",
      "Pour la tradition, un aspect se forme d'abord entre signes : une planète à 29° du Bélier et une autre à 1° du Lion ne sont pas vraiment en trigone, même si l'écart est presque de 120°. Les modernes, eux, mesurent avant tout l'écart en degrés."],
      ret:["☌ 0° · ⚹ 60° · □ 90° · △ 120° · ☍ 180°","Harmonieux : sextile et trigone · Tendus : carré et opposition"]},
    {t:"Orbes, appliquant, séparant", p:[
      "Un aspect est rarement exact au degré près. On accepte une marge, l'<b>orbe</b>. Les modernes donnent des orbes fixes à chaque aspect : 8° pour la conjonction et l'opposition, 7° pour le carré et le trigone, 4° pour le sextile, davantage quand un luminaire est en jeu.",
      "La tradition arabe raisonne autrement : chaque planète a son propre rayon de lumière, une <b>moitié d'orbe</b> (moiety) : 7°30' pour le Soleil, 6° pour la Lune, 4°30' pour Jupiter et Saturne, 4° pour Mars, 3°30' pour Vénus et Mercure. Deux planètes sont en aspect quand leurs rayons se touchent, c'est-à-dire quand l'écart est inférieur à la somme de leurs moitiés.",
      "Un aspect est <b>appliquant</b> quand la planète rapide se rapproche de l'exactitude : l'événement est à venir, l'effet grandit. Il est <b>séparant</b> quand elle s'en éloigne : c'est déjà fait, l'effet décline. Cette distinction est capitale en astrologie horaire."],
      ret:["Orbe = marge de tolérance","Tradition : moitiés d'orbes propres à chaque planète","Appliquant = à venir · Séparant = passé"]},
    {t:"Aspects mineurs et configurations", p:[
      "Au début du XVIIe siècle, Johannes Kepler, astronome et astrologue, ajouta des aspects nouveaux, fondés sur l'harmonie musicale : le semi-sextile (30°), le semi-carré (45°), le quintile (72°), le sesqui-carré (135°), le <b>quinconce</b> (150°). Les modernes utilisent surtout ce dernier, signe d'un ajustement difficile.",
      "Plusieurs aspects peuvent former des figures. Le <b>grand trigone</b> relie trois planètes dans les trois signes d'un même élément : un talent, une facilité. Le <b>T-carré</b> associe une opposition et une planète en carré aux deux : une tension motrice, qui pousse vers le point vide. La <b>grande croix</b> réunit deux oppositions en carré. Le <b>stellium</b> rassemble trois planètes ou plus dans un même signe ou une même maison : un centre de gravité.",
      "Ces figures sont très utilisées par les modernes. La tradition préfère analyser chaque aspect, sa planète, sa dignité, sa réception."],
      ret:["Quinconce 150° = ajustement","Grand trigone · T-carré · Grande croix · Stellium"]}
  ]},

  {id:"dignites", t:"La tradition", d:"Dignités, maîtrises, réceptions, parts", fiches:null, quiz:"dignites", lecons:[
    {t:"Domicile et exil", w:"thema", p:[
      "Chaque planète a un ou deux signes où elle est « chez elle » : ses <b>domiciles</b>. Elle y agit librement, avec toutes ses ressources. Dans le signe opposé, elle est en <b>exil</b> (on dit aussi en détriment) : loin de chez elle, elle doit composer.",
      "Le schéma des domiciles est d'une logique parfaite. Les deux luminaires prennent les deux signes de l'été, les plus chauds et les plus lumineux : le Lion pour le Soleil, le Cancer pour la Lune. Puis, de part et d'autre, les planètes s'alignent selon leur vitesse : Mercure prend les signes voisins (Gémeaux et Vierge), puis Vénus (Taureau et Balance), Mars (Bélier et Scorpion), Jupiter (Sagittaire et Poissons), et enfin Saturne, le plus lent et le plus froid, prend les signes de l'hiver, en face des luminaires : Capricorne et Verseau.",
      "Les anciens rattachaient cela au <b>Thema mundi</b>, le thème mythique de la naissance du monde, avec le Cancer à l'Ascendant.",
      "Le maître du signe où se trouve une planète est son <b>dispositeur</b> : il « accueille » la planète, et l'état de l'hôte compte autant que celui de l'invité."],
      ret:["Domicile = chez soi · Exil = en face","☉ Lion · ☽ Cancer · ☿ Gémeaux, Vierge · ♀ Taureau, Balance · ♂ Bélier, Scorpion · ♃ Sagittaire, Poissons · ♄ Capricorne, Verseau"]},
    {t:"Exaltation et chute", p:[
      "L'<b>exaltation</b> est le signe, et même le degré, où une planète est honorée, comme un invité de marque. Le Soleil s'exalte à 19° du Bélier, la Lune à 3° du Taureau, Mercure à 15° de la Vierge, Vénus à 27° des Poissons, Mars à 28° du Capricorne, Jupiter à 15° du Cancer, Saturne à 21° de la Balance.",
      "Dans le signe opposé, la planète est en <b>chute</b> : elle manque d'appui et de reconnaissance.",
      "L'origine de ces degrés reste discutée. Certains historiens y voient les positions de planètes dans un ciel babylonien ancien ; d'autres, une logique symbolique : le Soleil exalté au printemps quand les jours grandissent, en chute en automne quand ils raccourcissent ; Saturne, l'astre du temps et de la justice, exalté dans la Balance."],
      ret:["Exaltation = honneur · Chute = en face","☉ ♈ 19° · ☽ ♉ 3° · ☿ ♍ 15° · ♀ ♓ 27° · ♂ ♑ 28° · ♃ ♋ 15° · ♄ ♎ 21°"]},
    {t:"Triplicités, termes et faces", w:"termes", p:[
      "La tradition ajoute trois dignités plus fines. Les <b>triplicités</b> : chaque élément a trois maîtres, l'un pour les thèmes de jour, l'autre pour ceux de nuit, le troisième participant. Selon Dorothée de Sidon : le feu, Soleil, Jupiter et Saturne ; la terre, Vénus, Lune et Mars ; l'air, Saturne, Mercure et Jupiter ; l'eau, Vénus, Mars et la Lune.",
      "Les <b>termes</b> (ou bornes) découpent chaque signe en cinq parts inégales attribuées aux cinq planètes. Arcanes utilise les termes dits égyptiens, les plus anciens et les plus employés. Les <b>faces</b> (ou décans) découpent chaque signe en trois tranches de 10°, attribuées dans l'ordre chaldéen à partir de Mars au début du Bélier.",
      "William Lilly a popularisé un barème : domicile 5 points, exaltation 4, triplicité 3, terme 2, face 1 ; exil −5, chute −4. Une planète sans aucune dignité est <b>pérégrine</b>, comme un voyageur sans abri. Arcanes calcule ce barème pour chaque planète de ton thème."],
      ret:["Domicile 5 · Exaltation 4 · Triplicité 3 · Terme 2 · Face 1","Exil −5 · Chute −4","Sans dignité = pérégrine"]},
    {t:"Réceptions et maîtrises", p:[
      "Quand une planète se trouve dans le domicile (ou l'exaltation) d'une autre, cette autre la <b>reçoit</b>. Quand les deux se reçoivent l'une l'autre, par exemple Mars en Balance et Vénus en Bélier, c'est une <b>réception mutuelle</b> : chacune est chez l'autre, et elles peuvent s'entraider, même si elles sont mal placées.",
      "Toute la méthode traditionnelle repose sur cette idée de maître. Chaque maison a pour maître la planète qui gouverne le signe de sa cuspide. Pour juger de l'argent, on regarde la maison II, les planètes qui s'y trouvent, et surtout le maître de la II : où il est, dans quel état, avec quels aspects. Morin de Villefranche a fait de cette méthode un système complet.",
      "En suivant de dispositeur en dispositeur, on remonte parfois jusqu'à une planète en domicile qui « dispose » de tout le thème : le <b>dispositeur final</b>."],
      ret:["Recevoir = accueillir dans son signe","Réception mutuelle = entraide","Maison jugée par son maître"]},
    {t:"La part de Fortune", p:[
      "Les <b>parts</b> (ou sorts, ou lots) sont des points calculés à partir de trois positions. La plus célèbre est la <b>part de Fortune</b> : on reporte depuis l'Ascendant la distance du Soleil à la Lune (dans un thème de jour), ou de la Lune au Soleil (de nuit).",
      "Elle dit ce qui arrive à la personne sans qu'elle le choisisse : le corps, la santé, les biens qui viennent, les circonstances. Sa sœur, la <b>part de l'Esprit</b>, se calcule à l'inverse et dit ce que la personne choisit et entreprend.",
      "Les astrologues hellénistiques, et Vettius Valens en particulier, utilisaient des dizaines de parts. Les Arabes en ont dressé des listes encore plus longues. Les modernes n'ont guère gardé que la part de Fortune."],
      ret:["Fortune (jour) = AS + Lune − Soleil","Fortune = ce qui arrive · Esprit = ce que l'on fait"]}
  ]},

  {id:"lire", t:"Lire un thème", d:"Méthode, hiérarchie, pièges", fiches:null, quiz:null, lecons:[
    {t:"La méthode moderne : les dominantes", p:[
      "L'astrologie moderne commence par une vue d'ensemble, comme on regarde un visage avant d'en détailler les traits. André Barbault a beaucoup travaillé cette lecture par <b>dominantes</b>.",
      "Regarde d'abord la <b>répartition</b> : combien de planètes par élément, par mode, dans chaque moitié du ciel. Beaucoup de planètes à l'est (à gauche) : une personne qui prend l'initiative ; à l'ouest : quelqu'un qui se construit par les autres. Au-dessus de l'horizon : une vie tournée vers le monde ; en dessous : vers l'intime.",
      "Puis les <b>planètes fortes</b> : celles qui touchent un angle, surtout l'Ascendant et le MC, le maître de l'Ascendant, les planètes très aspectées, les stelliums.",
      "Enfin le <b>trio</b> Soleil, Lune, Ascendant, que l'on lit ensemble : ce vers quoi tu vas, ce dont tu as besoin, la manière dont tu te présentes. L'onglet Synthèse de ton thème fait ce travail pour toi."],
      ret:["Répartition → planètes fortes → trio Soleil, Lune, Ascendant"]},
    {t:"La méthode traditionnelle", p:[
      "La tradition procède dans un ordre strict, que l'on retrouve de Ptolémée à Morin. D'abord, le thème est-il <b>diurne ou nocturne</b> ? Cela désigne le luminaire principal et les planètes favorisées.",
      "Ensuite, l'<b>état de chaque planète</b>. Sa dignité essentielle : domicile, exaltation, termes… ou au contraire exil et chute. Puis ses dignités <b>accidentelles</b> : est-elle angulaire, rapide, directe, libre des rayons du Soleil, aspectée par des bénéfiques ? Une planète bien née et bien placée tient ses promesses ; une planète débile les tient mal.",
      "Puis le <b>maître de l'Ascendant</b>, qui représente la personne, et sa relation aux autres maîtres.",
      "Enfin, on juge chaque domaine de la vie par sa maison : la maison elle-même, les planètes qui l'occupent, son maître et son état. C'est une lecture plus analytique, presque juridique. Elle demande de la patience, et elle est d'une grande précision."],
      ret:["Secte → état des planètes → maître de l'AS → maison par maison"]},
    {t:"Ce qu'un thème ne dit pas", p:[
      "Un thème n'est pas un verdict. Tous les grands auteurs, de Ptolémée à Barbault, rappellent qu'il faut le replacer dans une vie réelle : le pays, l'époque, la famille, les choix. Des milliers de personnes naissent chaque jour avec un thème presque identique, et elles ne vivent pas la même vie.",
      "Méfie-toi de l'<b>effet Barnum</b>, mis en évidence par le psychologue Bertram Forer en 1949 : on reconnaît volontiers comme personnelle une description assez vague pour convenir à tout le monde. Une bonne lecture est précise, et accepte d'être contredite.",
      "Reste prudent avec la santé, la mort, l'argent : un thème ne remplace jamais un médecin, un juriste ou un conseiller financier. Et lis le thème d'une autre personne seulement si elle le demande.",
      "Comme le tarot, l'astrologie est ici un langage symbolique pour réfléchir à sa vie, un héritage de plus de deux mille ans de culture. Le chapitre « Et la science ? » de l'Histoire fait le point sur ce que disent les études."],
      ret:["Un thème décrit des tendances, pas un destin","Attention à l'effet Barnum","Respect et prudence"]}
  ]},

  {id:"temps", t:"Le temps", d:"Transits, révolutions, progressions, profections", fiches:null, quiz:"temps", lecons:[
    {t:"Les transits", p:[
      "Les <b>transits</b> sont la méthode la plus simple : on compare le ciel du moment à ton thème de naissance. Quand une planète du ciel actuel forme un aspect à une planète ou à un angle de ton thème, on dit qu'elle « transite » sur ce point.",
      "Les transits des planètes rapides (Lune, Mercure, Vénus) passent en quelques heures ou quelques jours : ils colorent le quotidien. Ceux des planètes lentes (Jupiter, Saturne, et pour les modernes Uranus, Neptune, Pluton) durent des mois et accompagnent les grandes périodes de la vie.",
      "Quelques passages concernent tout le monde au même âge : le retour de Jupiter tous les douze ans, le carré de Saturne vers 7, 14, 22 ans, son retour vers 29 et 58 ans, l'opposition d'Uranus vers 42 ans. L'onglet Aujourd'hui t'indique tes transits du jour si tu as enregistré ton thème."],
      ret:["Transit = ciel du jour × thème natal","Lentes = grandes périodes · Rapides = quotidien"]},
    {t:"La révolution solaire", p:[
      "Chaque année, le Soleil revient exactement au degré qu'il occupait à ta naissance. C'est ton véritable anniversaire astrologique, qui peut tomber la veille ou le lendemain de la date civile.",
      "On dresse un thème pour cet instant précis, au lieu où l'on se trouve : c'est la <b>révolution solaire</b>. Elle décrit les grands thèmes de l'année qui commence : l'Ascendant de l'année, les maisons où tombent les planètes, les angles touchés.",
      "La méthode est ancienne : elle vient des astrologues arabes et persans. Morin de Villefranche en a fait l'un des piliers de sa méthode, et elle reste aujourd'hui l'une des techniques les plus pratiquées, par les traditionalistes comme par les modernes. Arcanes calcule le moment exact de ta prochaine révolution solaire."],
      ret:["Révolution solaire = retour du Soleil à sa place natale","Un thème pour chaque année"]},
    {t:"Directions et progressions", p:[
      "Les <b>directions primaires</b> sont la grande technique de prévision de la tradition, de Ptolémée à Placidus. Elles utilisent le mouvement diurne : après la naissance, le ciel continue de tourner, et chaque degré d'ascension droite qui passe correspond à une année de vie. Quand un point du thème est « dirigé » sur un autre, un événement se produit. Le calcul est délicat, et c'est une affaire de spécialiste.",
      "Les <b>progressions secondaires</b>, popularisées au XIXe siècle, appliquent une règle plus simple : <b>un jour = un an</b>. La position des astres 30 jours après ta naissance décrit ta trentième année. Le Soleil progressé avance d'un degré par an, la Lune progressée fait le tour du thème en 27 ans.",
      "Ces techniques montrent l'idée centrale de la prévision astrologique : le thème n'est pas une image figée, il se déploie dans le temps."],
      ret:["Directions primaires : 1° = 1 an (tradition)","Progressions secondaires : 1 jour = 1 an"]},
    {t:"Les profections annuelles", p:[
      "Les <b>profections</b> sont une technique hellénistique très simple, remise en lumière par les traductions des années 1990. Chaque année de vie, l'Ascendant « avance » d'un signe.",
      "De la naissance à ton premier anniversaire, c'est le signe de l'Ascendant qui est actif ; de 1 à 2 ans, le signe suivant ; et ainsi de suite. À 12 ans, on revient au signe de l'Ascendant, puis à 24, 36, 48 ans.",
      "Le maître du signe de l'année devient le <b>maître de l'année</b>, le « chronocrator » : ses transits et son état dans le thème natal comptent particulièrement pendant ces douze mois. Les thèmes de la maison activée sont mis en avant : à 6 ans, 18 ans, 30 ans, la maison VII, le couple et les associations.",
      "Arcanes calcule ta profection de l'année et son maître dans l'onglet Tradition de ton thème."],
      ret:["Chaque année, l'Ascendant avance d'un signe","Âge 0, 12, 24, 36… = maison I","Le maître du signe est le maître de l'année"]},
    {t:"Les cycles du monde", p:[
      "L'astrologie <b>mondiale</b> s'intéresse aux peuples et à l'histoire. Les astrologues arabes, avec Abu Ma'shar, lisaient l'histoire dans les <b>grandes conjonctions</b> de Jupiter et Saturne, qui se produisent tous les vingt ans environ et restent dans le même élément pendant deux siècles.",
      "Au XXe siècle, André Barbault a étudié les cycles des planètes lentes et proposé un « indice cyclique », qui mesure leur regroupement dans le ciel : selon lui, les périodes où elles se resserrent coïncident avec les grandes crises.",
      "Ces travaux sont discutés, même parmi les astrologues. Ils montrent la place de l'astrologie dans l'histoire des idées : la tentative, très ancienne, de lire le temps du monde dans le ciel."],
      ret:["Grandes conjonctions ♃♄ tous les 20 ans","Indice cyclique de Barbault"]}
  ]}
];

/* ===== L'histoire de l'astrologie ===== */
const ASTRO_HIST = [
  {t:"Babylone : les présages du ciel", d:"IIe millénaire – Ve siècle av. J.-C.", p:[
    "L'astrologie naît en Mésopotamie, comme une science des présages. Les scribes observent le ciel nuit après nuit et notent ce qui accompagne chaque phénomène. Le grand recueil <i>Enuma Anu Enlil</i>, compilé à la fin du IIe millénaire, réunit environ sept mille présages : une éclipse, une planète près d'une étoile annoncent la guerre, la famine ou la prospérité. Ces présages concernent le roi et le pays, pas les individus.",
    "Vers le Ve siècle avant notre ère, les astronomes babyloniens découpent l'écliptique en douze signes égaux de 30°. Le plus ancien horoscope individuel connu, une tablette cunéiforme, date de 410 avant notre ère : il donne les positions des planètes pour une naissance."],
    gens:[["Les scribes de Babylone","Ils tiennent pendant des siècles des « journaux astronomiques », la plus longue série d'observations de l'Antiquité."]]},
  {t:"Alexandrie : naissance de l'horoscope", d:"IIe – Ier siècle av. J.-C.", p:[
    "Après les conquêtes d'Alexandre, les savoirs babylonien, égyptien et grec se rencontrent, surtout à Alexandrie. C'est là que naît l'astrologie que nous connaissons : les douze signes babyloniens, les décans égyptiens, la géométrie et la physique grecques (les quatre éléments, les qualités).",
    "Les Grecs y ajoutent le mouvement quotidien : l'<b>horoskopos</b>, « celui qui regarde l'heure », le degré qui se lève à l'est. Il donne naissance aux douze lieux, nos maisons. Les premiers textes sont attribués à des figures légendaires : Hermès Trismégiste, le pharaon Néchepso et le prêtre Pétosiris."],
    gens:[["Hermès Trismégiste","Figure mythique, fusion du dieu grec Hermès et du dieu égyptien Thot, à qui l'on attribuait les savoirs secrets, dont l'astrologie."],["Néchepso et Pétosiris","Un roi et un prêtre égyptiens, auteurs supposés d'un traité fondateur, perdu, que les auteurs grecs citent sans cesse."]]},
  {t:"Rome et les grands manuels", d:"Ier – IVe siècle", p:[
    "Sous l'Empire romain, l'astrologie est partout, des empereurs aux places de marché. Tibère vivait entouré de son astrologue Thrasylle. Les grands manuels qui fondent toute la tradition sont écrits à cette époque.",
    "On interdit parfois de consulter les astres sur la mort de l'empereur, ce qui montre à quel point on les prenait au sérieux."],
    gens:[["Manilius","Sous Auguste et Tibère, il écrit les <i>Astronomiques</i>, un long poème latin sur l'astrologie, le plus ancien texte complet qui nous soit parvenu."],
      ["Dorothée de Sidon","Au Ier siècle, un poème astrologique (le <i>Carmen astrologicum</i>) qui transmet les maîtres de triplicité et de nombreuses techniques de prévision. Les Arabes le traduiront."],
      ["Claude Ptolémée","Astronome d'Alexandrie, auteur de l'<i>Almageste</i>, il écrit vers 150 le <i>Tétrabible</i>. Il y donne à l'astrologie une explication physique : les astres agissent par le chaud, le froid, le sec et l'humide. Ce livre restera la référence pendant quinze siècles."],
      ["Vettius Valens","Au IIe siècle, un praticien d'Antioche. Ses <i>Anthologies</i> sont un carnet de travail rempli de thèmes réels : profections, parts, périodes de vie. La source majeure pour l'astrologie hellénistique pratique."],
      ["Firmicus Maternus","Vers 335, un juriste romain écrit la <i>Mathesis</i>, le manuel latin le plus complet de l'Antiquité. Il se convertira ensuite au christianisme."]]},
  {t:"Bagdad et le monde arabe", d:"VIIIe – XIe siècle", p:[
    "Quand le califat abbasside fonde Bagdad en 762, les astrologues choisissent l'instant de la fondation. Les savants de la « Maison de la sagesse » traduisent en arabe les textes grecs, persans et indiens. L'astrologie arabe hérite de tout et organise tout : elle développe l'astrologie horaire, les élections (choisir le bon moment), l'astrologie mondiale et les révolutions annuelles."],
    gens:[["Masha'allah","Astrologue juif de Bassora, l'un des astrologues de la fondation de Bagdad. Ses traités d'astrologie horaire seront lus en latin pendant tout le Moyen Âge."],
      ["Abu Ma'shar","Né en 787, mort en 886. Le « prince des astrologues » pour les Latins, qui l'appellent Albumasar. Il fait de la conjonction de Jupiter et Saturne l'horloge de l'histoire et écrit une grande <i>Introduction</i> à l'astrologie."],
      ["Al-Biruni","Immense savant persan, il écrit en 1029 le <i>Livre de l'instruction dans les éléments de l'art de l'astrologie</i>, un manuel clair et complet. C'est à lui qu'Arcanes emprunte les moitiés d'orbes."]]},
  {t:"Le Moyen Âge latin et la Renaissance", d:"XIIe – XVIe siècle", p:[
    "Au XIIe siècle, à Tolède et en Sicile, on traduit les textes arabes en latin. L'astrologie entre à l'université, liée à la médecine : on soigne et on saigne selon la position de la Lune, et l'« homme zodiacal » des livres d'heures montre quel signe gouverne quelle partie du corps.",
    "À la Renaissance, les princes ont leurs astrologues. Catherine de Médicis consulte Nostradamus et Cosimo Ruggieri. Les plus grands astronomes dressent aussi des thèmes : Regiomontanus, Tycho Brahe, Galilée, Kepler."],
    gens:[["Guido Bonatti","Au XIIIe siècle, l'astrologue le plus célèbre d'Italie, conseiller de seigneurs de guerre. Son <i>Liber astronomiae</i> est une somme de la tradition arabe. Dante le place en Enfer, parmi les devins, la tête tournée vers l'arrière."],
      ["Regiomontanus","Astronome allemand du XVe siècle, il calcule des tables et donne son nom à un système de maisons que suivront Lilly et Morin."],
      ["Marsile Ficin","Philosophe de Florence, il publie en 1489 le <i>De vita</i> : une médecine de l'âme par la musique, les couleurs et les plantes accordées aux planètes."],
      ["Nostradamus","Médecin provençal (1503-1566), auteur d'almanachs et des <i>Prophéties</i> en 1555, consulté par Catherine de Médicis."],
      ["Johannes Kepler","L'astronome des lois du mouvement des planètes dresse des horoscopes toute sa vie. Il veut réformer l'astrologie, rejette une grande partie de la tradition et invente de nouveaux aspects fondés sur l'harmonie. En 1601, il écrit <i>Sur les fondements plus certains de l'astrologie</i>."]]},
  {t:"Le XVIIe siècle : apogée et rupture", d:"1600 – 1700", p:[
    "Le XVIIe siècle voit les sommets de l'astrologie classique, et sa sortie des sciences. Avec Copernic, Galilée puis Newton, le cosmos n'est plus fait de sphères et d'éléments. L'Académie des sciences, fondée par Colbert en 1666, laisse l'astrologie de côté. Elle quitte l'université et se réfugie dans les almanachs populaires."],
    gens:[["William Lilly","Astrologue anglais (1602-1681). Son <i>Christian Astrology</i>, publié en 1647 en anglais et non en latin, est le grand manuel d'astrologie horaire : on dresse le thème de l'instant où une question est posée. Il est aujourd'hui l'un des auteurs les plus lus du renouveau traditionnel."],
      ["Jean-Baptiste Morin de Villefranche","Médecin et mathématicien français (1583-1656), professeur au Collège royal. Son <i>Astrologia Gallica</i>, publiée en 1661 après sa mort, reconstruit toute l'astrologie de façon rigoureuse : maîtrises des maisons, déterminations, révolutions solaires. C'est la grande référence française."],
      ["Placidus de Titis","Moine et mathématicien italien (1603-1668). Son système de maisons, fondé sur le temps, deviendra le plus utilisé au XXe siècle."]]},
  {t:"Le renouveau moderne", d:"1880 – 1980", p:[
    "À la fin du XIXe siècle, l'astrologie renaît en Angleterre dans les milieux ésotériques. Elle change de visage : elle parle désormais de caractère plus que d'événements. En août 1930, le <i>Sunday Express</i> publie un thème pour la naissance de la princesse Margaret ; le succès est tel que le journal crée une rubrique, l'ancêtre de nos horoscopes de magazine, fondés sur le seul signe solaire.",
    "Au XXe siècle, l'astrologie rencontre la psychologie des profondeurs et devient un langage de connaissance de soi."],
    gens:[["Alan Leo","Astrologue anglais (1860-1917), proche de la Théosophie. Il simplifie l'astrologie, la diffuse par ses revues et ses manuels, et la tourne vers la description du caractère. Le père de l'astrologie moderne."],
      ["Paul Choisnard","Polytechnicien français (1867-1930), il tente le premier de vérifier l'astrologie par les statistiques."],
      ["Carl Gustav Jung","Le psychiatre suisse s'intéresse à l'astrologie comme à un langage de l'inconscient collectif. Dans son essai sur la synchronicité (1952), il présente une étude astrologique sur des thèmes de couples mariés."],
      ["Dane Rudhyar","Compositeur et astrologue franco-américain (1895-1985), né à Paris. Son livre <i>The Astrology of Personality</i> (1936) fonde l'astrologie « humaniste » : le thème comme potentiel d'accomplissement, pas comme destin."],
      ["André Barbault","Le grand nom de l'astrologie française du XXe siècle (1921-2019). Dans <i>De la psychanalyse à l'astrologie</i> (1961), il relie les deux disciplines. Il étudie les cycles planétaires et l'astrologie mondiale, et invente l'indice cyclique."],
      ["Jean-Pierre Nicola","Astrologue français, fondateur du « conditionalisme » à partir de <i>La Condition solaire</i> (1965) : il cherche une astrologie fondée sur les rythmes astronomiques réels plutôt que sur les mythes."],
      ["Liz Greene","Astrologue et analyste jungienne américaine installée à Londres. Son <i>Saturne</i> (1976) a renouvelé la lecture de cette planète. Elle fonde en 1983 le Centre for Psychological Astrology avec Howard Sasportas."]]},
  {t:"Le retour aux sources", d:"depuis 1980", p:[
    "À partir des années 1980, des astrologues se tournent vers les textes anciens, longtemps oubliés ou mal traduits. En 1993, le <b>Projet Hindsight</b>, lancé notamment par Robert Schmidt et Robert Hand, entreprend de traduire les auteurs grecs et latins. On redécouvre la secte, les signes entiers, les profections, les parts. L'astrologie traditionnelle redevient une école vivante, aux côtés de l'astrologie moderne."],
    gens:[["Robert Hand","Astrologue américain, auteur de classiques modernes (<i>Planets in Transit</i>, 1976) avant de devenir l'un des moteurs du retour à la tradition et de la traduction des textes anciens. Son <i>Night and Day</i> (1995) a remis la secte au cœur de la pratique."],
      ["Denis Labouré","Astrologue français, l'un des principaux artisans du retour de l'astrologie traditionnelle dans le monde francophone. Par ses livres, ses commentaires des auteurs anciens et son enseignement, il a remis en usage les outils de Ptolémée, des Arabes et de Morin de Villefranche : dignités, maîtrises, révolutions solaires, directions. Une lecture exigeante et concrète, qu'Arcanes suit dans sa lecture « tradition »."],
      ["Chris Brennan","Astrologue américain, auteur en 2017 d'une grande synthèse, <i>Hellenistic Astrology</i>, qui a fait connaître la tradition grecque à un large public."]]},
  {t:"Et la science ?", d:"Ce que disent les études", p:[
    "Depuis le XVIIe siècle, l'astrologie ne fait plus partie des sciences. Au XXe siècle, plusieurs chercheurs ont voulu la mettre à l'épreuve, et les résultats sont nets.",
    "En 1985, la revue <i>Nature</i> publie le test de Shawn Carlson : des astrologues devaient reconnaître, parmi trois profils de personnalité, celui qui correspondait à un thème. Ils ne font pas mieux que le hasard. En 2003, Geoffrey Dean et Ivan Kelly étudient plus de deux mille « jumeaux astraux », nés à quelques minutes d'intervalle : aucune ressemblance particulière entre eux.",
    "Seul le psychologue <b>Michel Gauquelin</b> (1928-1991) a trouvé, en 1955, un résultat troublant : les grands champions sportifs naissent un peu plus souvent quand Mars vient de se lever ou de culminer. Cet « effet Mars » a été vivement discuté pendant des décennies, et les vérifications ultérieures ne l'ont pas confirmé de façon convaincante. Il ne valide d'ailleurs pas l'astrologie classique : les signes, eux, ne montraient rien.",
    "L'astrologie reste un immense patrimoine culturel : elle a nourri l'astronomie, la médecine, l'art et la littérature pendant deux millénaires. Arcanes la présente comme le tarot : un langage symbolique pour réfléchir, pas une science qui prédit."],
    gens:[["Michel Gauquelin","Psychologue et statisticien français, auteur de <i>L'Influence des astres</i> (1955) et découvreur de l'« effet Mars »."],
      ["Bertram Forer","Psychologue américain : en 1949, il montre que chacun se reconnaît dans un portrait vague. On parle depuis d'effet Barnum, ou effet Forer."]]}
];

/* Questions d'histoire, pour le quiz : [question, propositions, index de la bonne, explication] */
const ASTRO_QHIST = [
  ["Où est né le découpage du zodiaque en douze signes égaux ?", ["À Babylone","À Athènes","À Rome","En Chine"], 0, "Les astronomes babyloniens l'établissent vers le Ve siècle avant notre ère."],
  ["De quand date le plus ancien horoscope de naissance connu ?", ["410 av. J.-C.","1200 av. J.-C.","150 apr. J.-C.","800 apr. J.-C."], 0, "Une tablette cunéiforme de Babylone, datée de 410 avant notre ère."],
  ["Que veut dire « horoskopos » en grec ?", ["Celui qui regarde l'heure","Le cercle des animaux","L'étoile du berger","La part de Fortune"], 0, "C'est le degré qui se lève à l'est : notre Ascendant."],
  ["Qui a écrit le Tétrabible vers 150 ?", ["Ptolémée","Vettius Valens","Firmicus Maternus","Manilius"], 0, "L'astronome d'Alexandrie, qui explique l'astrologie par les qualités physiques."],
  ["Quel auteur antique a laissé un carnet de travail rempli de thèmes réels, les Anthologies ?", ["Vettius Valens","Ptolémée","Dorothée de Sidon","Hermès Trismégiste"], 0, "Un praticien d'Antioche, au IIe siècle."],
  ["Quel astrologue arabe faisait des conjonctions de Jupiter et Saturne l'horloge de l'histoire ?", ["Abu Ma'shar","Al-Biruni","Masha'allah","Avicenne"], 0, "Abu Ma'shar (787-886), Albumasar pour les Latins."],
  ["Quelle ville a été fondée en 762 à une heure choisie par des astrologues ?", ["Bagdad","Le Caire","Cordoue","Damas"], 0, "Masha'allah faisait partie des astrologues de la fondation."],
  ["Qui Dante place-t-il en Enfer, la tête tournée vers l'arrière ?", ["Guido Bonatti","William Lilly","Nostradamus","Marsile Ficin"], 0, "L'astrologue italien du XIIIe siècle, parmi les devins."],
  ["Quel grand manuel d'astrologie horaire William Lilly publie-t-il en 1647 ?", ["Christian Astrology","Astrologia Gallica","Liber astronomiae","Mathesis"], 0, "Écrit en anglais, pas en latin, il reste aujourd'hui très lu."],
  ["Qui est l'auteur de l'Astrologia Gallica ?", ["Morin de Villefranche","Nostradamus","Regiomontanus","Placidus de Titis"], 0, "Le grand astrologue français du XVIIe siècle ; l'ouvrage paraît en 1661."],
  ["Quel astronome a inventé des aspects nouveaux fondés sur l'harmonie musicale ?", ["Kepler","Galilée","Copernic","Newton"], 0, "Kepler ajoute notamment le quinconce et le quintile."],
  ["En quelle année Uranus a-t-elle été découverte ?", ["1781","1846","1930","1610"], 0, "Par William Herschel, au télescope."],
  ["Qui a écrit De la psychanalyse à l'astrologie (1961) ?", ["André Barbault","Dane Rudhyar","Alan Leo","Liz Greene"], 0, "Le grand nom de l'astrologie française du XXe siècle."],
  ["Quel astrologue a fondé l'astrologie « humaniste » ?", ["Dane Rudhyar","Robert Hand","William Lilly","Paul Choisnard"], 0, "Avec The Astrology of Personality, en 1936."],
  ["Quel projet lancé en 1993 a traduit les auteurs grecs et latins ?", ["Le Projet Hindsight","Le Projet Apollo","La Maison de la sagesse","Le Projet Gauquelin"], 0, "Avec Robert Schmidt et Robert Hand, il a relancé l'astrologie traditionnelle."],
  ["Quel astrologue français est l'un des artisans du retour de la tradition dans le monde francophone ?", ["Denis Labouré","André Barbault","Michel Gauquelin","Jean-Pierre Nicola"], 0, "Il a remis en usage les dignités, les maîtrises et les révolutions solaires."],
  ["Qu'a montré le test de Shawn Carlson publié dans Nature en 1985 ?", ["Les astrologues ne font pas mieux que le hasard","L'effet Mars","L'existence des signes","La précession"], 0, "Ils devaient associer un thème à un profil de personnalité."],
  ["Comment appelle-t-on la tendance à se reconnaître dans un portrait vague ?", ["L'effet Barnum","L'effet Mars","La précession","La synchronicité"], 0, "Ou effet Forer, du nom du psychologue qui l'a montré en 1949."],
  ["Quel journal publie en 1930 l'ancêtre de nos horoscopes de magazine ?", ["Le Sunday Express","Le Times","Le Figaro","Le New York Times"], 0, "Pour la naissance de la princesse Margaret."],
  ["Qui a découvert la précession des équinoxes ?", ["Hipparque","Ptolémée","Kepler","Aristote"], 0, "Vers 130 avant notre ère."]
];

;
/* ===== Arcanes · Astrologie : le moteur de calcul =====
   Positions (Astronomy Engine, Don Cross, licence MIT), angles, maisons, aspects, dignités,
   parts, profections, transits, révolutions, lunaisons, heures planétaires.
   Tout est calculé dans le navigateur, sans connexion. */
const ASTRO_CALC = (() => {
  const D = ASTRO_DATA, rad = Math.PI/180, DAY = 86400000;
  const AE = () => (typeof Astronomy !== "undefined" ? Astronomy : null);
  const norm = x => ((x % 360) + 360) % 360;
  const sep = (a, b) => { const d = norm(a - b); return d > 180 ? 360 - d : d; };
  const si = lon => Math.floor(norm(lon) / 30);
  const PL = Object.fromEntries(D.PLANETS.map(p => [p.id, p]));
  const SG = D.SIGNS;
  const J2000 = Date.UTC(2000, 0, 1, 12);
  const Tc = d => (d.getTime() - J2000) / DAY / 36525;
  const obliq = d => { const T = Tc(d); return 23.4392911 - 0.0130042*T - 1.64e-7*T*T + 5.04e-7*T*T*T; };
  const meanNode = d => { const T = Tc(d); return norm(125.0445479 - 1934.1362891*T + 0.0020754*T*T + T*T*T/467441); };
  const TRAD7 = ["soleil","lune","mercure","venus","mars","jupiter","saturne"];
  const MOD10 = [...TRAD7, "uranus","neptune","pluton"];

  /* ---------- dates et fuseaux ---------- */
  const mkUTC = (y, m, d, h = 0, mi = 0) => { const t = new Date(0); t.setUTCFullYear(y, m - 1, d); t.setUTCHours(h, mi, 0, 0); return t; };
  function tzOffsetMin(tz, date){
    const f = new Intl.DateTimeFormat("en-US", {timeZone:tz, hourCycle:"h23", year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit"});
    const p = Object.fromEntries(f.formatToParts(date).map(x => [x.type, x.value]));
    const asUTC = mkUTC(+p.year, +p.month, +p.day, +p.hour, +p.minute).getTime() + (+p.second)*1000;
    return Math.round((asUTC - date.getTime()) / 60000);
  }
  /* heure locale → instant UTC. lieu.tz (fuseau IANA, avec l'heure d'été et l'histoire) ou lieu.off (minutes) */
  function localToUTC(y, m, d, h, mi, lieu){
    const guess = mkUTC(y, m, d, h, mi).getTime();
    if(lieu && lieu.off != null && lieu.off !== "") return new Date(guess - (+lieu.off)*60000);
    const tz = (lieu && lieu.tz) || "UTC";
    let off = tzOffsetMin(tz, new Date(guess)), t = guess - off*60000;
    const off2 = tzOffsetMin(tz, new Date(t)); if(off2 !== off) t = guess - off2*60000;
    return new Date(t);
  }

  /* ---------- positions ---------- */
  function lonOf(id, date){
    const A = AE();
    if(id === "soleil") return A.SunPosition(date).elon;
    if(id === "lune") return A.EclipticGeoMoon(date).lon;
    if(id === "noeudn") return meanNode(date);
    if(id === "noeuds") return norm(meanNode(date) + 180);
    return A.Ecliptic(A.GeoVector(PL[id].body, date, true)).elon;
  }
  function posOf(id, date){
    const l = lonOf(id, date), a = lonOf(id, new Date(date.getTime() - DAY/4)), b = lonOf(id, new Date(date.getTime() + DAY/4));
    let v = norm(b - a); if(v > 180) v -= 360;
    return {id, lon:norm(l), speed:v*2, retro: v < 0 && !PL[id].point};
  }
  const planets = date => Object.fromEntries(D.PLANETS.map(p => [p.id, posOf(p.id, date)]));

  /* ---------- angles et maisons ---------- */
  const ascFrom = (ramc, lat, eps) => { const r = ramc*rad, e = eps*rad, f = lat*rad;
    return norm(Math.atan2(Math.cos(r), -(Math.sin(r)*Math.cos(e) + Math.tan(f)*Math.sin(e))) / rad); };
  const mcFrom = (ramc, eps) => { const r = ramc*rad; return norm(Math.atan2(Math.sin(r), Math.cos(r)*Math.cos(eps*rad)) / rad); };
  function angles(date, lat, lon){
    const ramc = norm(AE().SiderealTime(date)*15 + lon), eps = obliq(date);
    const mc = mcFrom(ramc, eps); let asc = ascFrom(ramc, lat, eps);
    if(norm(asc - mc) > 180) asc = norm(asc + 180);
    return {ramc, eps, asc, mc};
  }
  function placidus(ramc, lat, eps, f, below){
    const e = eps*rad, tp = Math.tan(lat*rad);
    let ra = below ? ramc + 180 - f*90 : ramc + f*90, lam = 0;
    for(let i = 0; i < 40; i++){
      const a = ra*rad; lam = norm(Math.atan2(Math.sin(a), Math.cos(a)*Math.cos(e)) / rad);
      const dec = Math.asin(Math.sin(e)*Math.sin(lam*rad)), x = tp*Math.tan(dec);
      if(Math.abs(x) >= 1) return null;                              // au-delà du cercle polaire
      const ad = Math.asin(x) / rad, nra = below ? ramc + 180 - f*(90 - ad) : ramc + f*(90 + ad);
      if(Math.abs(norm(nra - ra + 180) - 180) < 1e-7){ ra = nra; break; } ra = nra;
    }
    const a = ra*rad; return norm(Math.atan2(Math.sin(a), Math.cos(a)*Math.cos(e)) / rad);
  }
  function houses(system, an, lat){
    const {ramc, eps, asc, mc} = an, c = new Array(12);
    if(system === "signes"){ const s = Math.floor(asc/30)*30; for(let i = 0; i < 12; i++) c[i] = norm(s + 30*i); return {cusps:c, system}; }
    if(system === "egal"){ for(let i = 0; i < 12; i++) c[i] = norm(asc + 30*i); return {cusps:c, system}; }
    if(system === "porphyre"){ const q = norm(asc - mc), r = norm(mc + 180 - asc);
      c[9] = mc; c[10] = norm(mc + q/3); c[11] = norm(mc + 2*q/3); c[0] = asc; c[1] = norm(asc + r/3); c[2] = norm(asc + 2*r/3);
      [9, 10, 11, 0, 1, 2].forEach(i => { c[(i + 6) % 12] = norm(c[i] + 180); }); return {cusps:c, system}; }
    if(system === "campanus"){   // le premier vertical divisé en douze (formule d'Astrolog)
      const R = ramc*rad, F = lat*rad, E = eps*rad;
      for(let i = 1; i <= 12; i++){ const K = (60.000001 + 30*i)*rad; let dn = Math.atan(Math.tan(K)*Math.cos(F)); if(dn < 0) dn += Math.PI; if(Math.sin(K) < 0) dn += Math.PI;
        const y = Math.sin(R + dn), x = Math.cos(R + dn)*Math.cos(E) - Math.sin(dn)*Math.tan(F)*Math.sin(E); c[i - 1] = norm(Math.atan2(y, x)/rad); }
      if(norm(c[0] - asc) > 90) for(let i = 0; i < 12; i++) c[i] = norm(c[i] + 180);
      for(let i = 0; i < 12; i++){ if(norm(c[(i+1)%12] - c[i]) > 180) return Object.assign(houses("signes", an, lat), {fallback:system}); }
      return {cusps:c, system}; }
    c[0] = asc; c[9] = mc;
    if(system === "regio"){
      const cusp = H => ascFrom(ramc + H - 90, Math.atan(Math.tan(lat*rad)*Math.sin(H*rad)) / rad, eps);
      c[10] = cusp(30); c[11] = cusp(60); c[1] = cusp(120); c[2] = cusp(150);
    } else {
      const p = [placidus(ramc, lat, eps, 1/3, false), placidus(ramc, lat, eps, 2/3, false), placidus(ramc, lat, eps, 2/3, true), placidus(ramc, lat, eps, 1/3, true)];
      if(p.some(x => x == null)) return Object.assign(houses("signes", an, lat), {fallback:"placidus"});
      [c[10], c[11], c[1], c[2]] = p;
    }
    [9, 10, 11, 0, 1, 2].forEach(i => { c[(i + 6) % 12] = norm(c[i] + 180); });   // IV à IX : en face de X à III
    // les cuspides doivent tourner dans l'ordre : sinon (latitudes extrêmes) on se replie sur les signes entiers
    for(let i = 0; i < 12; i++){ if(norm(c[(i+1)%12] - c[i]) > 180) return Object.assign(houses("signes", an, lat), {fallback:system}); }
    return {cusps:c, system};
  }
  const houseOf = (lon, cusps) => { for(let i = 0; i < 12; i++){ const a = cusps[i], b = cusps[(i+1)%12]; if(norm(lon - a) < norm(b - a)) return i + 1; } return 1; };

  /* ---------- le thème ---------- */
  /* input : {date (UTC), lat, lon, heure (bool), system} */
  function chart(input){
    const date = input.date, P = planets(date), out = {date, lat:input.lat, lon:input.lon, heure:input.heure !== false, P};
    if(out.heure){
      const an = angles(date, input.lat, input.lon); Object.assign(out, an);
      const H = houses(input.system || "placidus", an, input.lat); out.cusps = H.cusps; out.system = H.system; out.fallback = H.fallback;
      for(const id in P) P[id].house = houseOf(P[id].lon, out.cusps);
      out.diurne = norm(P.soleil.lon - an.asc) > 180;                  // Soleil entre le Descendant et l'Ascendant, par le MC
    } else {
      out.diurne = null;
    }
    return out;
  }

  /* ---------- aspects ---------- */
  const signDiff = (a, b) => { const d = (si(b) - si(a) + 12) % 12; return Math.min(d, 12 - d); };
  const SIGN_ASP = {0:"conj", 2:"sext", 3:"carre", 4:"trigone", 6:"opp"};
  function pointsFor(ch, school){
    const ids = school === "tradition" ? [...TRAD7, "noeudn"] : [...MOD10, "noeudn"];
    const pts = ids.map(id => ({id, lon:ch.P[id].lon, speed:ch.P[id].speed}));
    if(ch.heure){ pts.push({id:"asc", lon:ch.asc, speed:0}); pts.push({id:"mc", lon:ch.mc, speed:0}); }
    return pts;
  }
  function aspectsBetween(A1, A2, school, same){
    const out = [];
    for(let i = 0; i < A1.length; i++) for(let j = same ? i + 1 : 0; j < A2.length; j++){
      const a = A1[i], b = A2[j]; if(a.id === b.id && same) continue;
      if(same && ((a.id === "asc" && b.id === "mc") || (a.id === "mc" && b.id === "asc"))) continue;
      if((a.id === "noeudn" || b.id === "noeudn") && school === "tradition"){ /* la tradition ne regarde que les conjonctions aux nœuds */ }
      const s = sep(a.lon, b.lon);
      for(const asp of D.ASPECTS){
        if(asp.moderne && school === "tradition") continue;
        const nodeOnly = a.id === "noeudn" || b.id === "noeudn";
        if(nodeOnly && asp.id !== "conj") continue;
        let ok, lim;
        if(school === "tradition"){
          if(SIGN_ASP[signDiff(a.lon, b.lon)] !== asp.id) continue;
          lim = (D.MOIETY[a.id] || 2) + (D.MOIETY[b.id] || 2);
        } else {
          lim = asp.orb + ((["soleil","lune"].includes(a.id) || ["soleil","lune"].includes(b.id)) && asp.ang % 90 === 0 ? 2 : 0) - (nodeOnly || ["asc","mc"].includes(a.id) || ["asc","mc"].includes(b.id) ? 2 : 0);
        }
        const orb = Math.abs(s - asp.ang); ok = orb <= lim;
        if(!ok) continue;
        const dt = .05, s2 = sep(a.lon + a.speed*dt, b.lon + b.speed*dt), app = Math.abs(s2 - asp.ang) < orb;
        out.push({a:a.id, b:b.id, asp:asp.id, orb, app, exact:orb < 1});
      }
    }
    return out.sort((x, y) => x.orb - y.orb);
  }
  const aspects = (ch, school) => aspectsBetween(pointsFor(ch, school), pointsFor(ch, school), school, true);

  /* ---------- dignités ---------- */
  const rulerOf = (signIdx, school) => school === "moderne" ? SG[signIdx].maitreMod : SG[signIdx].maitre;
  const termOf = lon => { const s = SG[si(lon)], d = norm(lon) % 30; return D.TERMS[s.id].find(t => d < t[1])[0]; };
  const faceOf = lon => D.CHALD[(2 + Math.floor(norm(lon) / 10)) % 7];
  function dignities(pid, lon, diurne){
    const k = si(lon), s = SG[k], o = SG[(k + 6) % 12], E = D.ELEMENTS[s.el], out = [];
    if(s.maitre === pid) out.push("domicile");
    if(s.exalt && s.exalt[0] === pid) out.push("exaltation");
    if(E.trip[diurne === false ? 1 : 0] === pid) out.push("triplicite");
    if(termOf(lon) === pid) out.push("terme");
    if(faceOf(lon) === pid) out.push("face");
    if(o.maitre === pid) out.push("exil");
    if(o.exalt && o.exalt[0] === pid) out.push("chute");
    const score = out.reduce((t, x) => t + D.DIGNITY_PTS[x], 0);
    const peregrine = !out.some(x => D.DIGNITY_PTS[x] > 0);
    return {list:out, score: peregrine && !out.length ? -5 : score, peregrine};
  }
  /* état « moderne » simple : domicile, exaltation, exil, chute, avec les maîtres modernes */
  function modState(pid, lon){
    const k = si(lon), s = SG[k], o = SG[(k + 6) % 12];
    if(s.maitreMod === pid || s.maitre === pid) return "domicile";
    if(s.exalt && s.exalt[0] === pid) return "exaltation";
    if(o.maitreMod === pid || o.maitre === pid) return "exil";
    if(o.exalt && o.exalt[0] === pid) return "chute";
    return null;
  }
  function receptions(ch){
    const out = [];
    for(let i = 0; i < TRAD7.length; i++) for(let j = i + 1; j < TRAD7.length; j++){
      const a = TRAD7[i], b = TRAD7[j];
      if(SG[si(ch.P[a].lon)].maitre === b && SG[si(ch.P[b].lon)].maitre === a) out.push([a, b]);
    }
    return out;
  }
  function solarState(pid, ch){
    if(pid === "soleil" || PL[pid].point) return null;
    const d = sep(ch.P[pid].lon, ch.P.soleil.lon);
    if(d < 17/60) return "cazimi"; if(d < 8.5) return "combuste"; if(d < 17) return "sous les rayons"; return null;
  }

  /* ---------- parts, secte, profections ---------- */
  function lots(ch){
    if(!ch.heure) return null;
    const S = ch.P.soleil.lon, M = ch.P.lune.lon, d = ch.diurne;
    return {fortune: norm(ch.asc + (d ? M - S : S - M)), esprit: norm(ch.asc + (d ? S - M : M - S))};
  }
  function ageAt(birth, when){ let a = when.getUTCFullYear() - birth.getUTCFullYear(); const b = new Date(birth); b.setUTCFullYear(when.getUTCFullYear()); if(when < b) a--; return Math.max(0, a); }
  function profection(ch, when = new Date()){
    if(!ch.heure) return null;
    const age = ageAt(ch.date, when), k = (si(ch.asc) + age) % 12;
    return {age, house: age % 12 + 1, sign:k, lord: SG[k].maitre};
  }

  /* ---------- synthèse : répartitions, dominantes, figures ---------- */
  function balance(ch){
    const el = {feu:0, terre:0, air:0, eau:0}, mo = {cardinal:0, fixe:0, mutable:0};
    const add = (lon, w) => { const s = SG[si(lon)]; el[s.el] += w; mo[s.mode] += w; };
    MOD10.forEach(id => add(ch.P[id].lon, ["soleil","lune"].includes(id) ? 2 : 1));
    if(ch.heure){ add(ch.asc, 2); add(ch.mc, 1); }
    let hemi = null;
    if(ch.heure){ hemi = {est:0, ouest:0, haut:0, bas:0};
      MOD10.forEach(id => { const h = ch.P[id].house; if([10,11,12,1,2,3].includes(h)) hemi.est++; else hemi.ouest++; if(h >= 7) hemi.haut++; else hemi.bas++; }); }
    return {el, mo, hemi};
  }
  function dominants(ch, school){
    const ids = school === "tradition" ? TRAD7 : MOD10, sc = Object.fromEntries(ids.map(i => [i, 0])), why = Object.fromEntries(ids.map(i => [i, []]));
    const add = (id, n, w) => { if(id in sc){ sc[id] += n; why[id].push(w); } };
    if(ch.heure){
      ids.forEach(id => { const l = ch.P[id].lon;
        [["asc","l'Ascendant"],["mc","le Milieu du Ciel"]].forEach(([k, n]) => { if(sep(l, ch[k]) < 8) add(id, 4, `sur ${n}`); });
        if(sep(l, ch.asc + 180) < 7 || sep(l, ch.mc + 180) < 7) add(id, 2, "sur un angle"); });
      add(rulerOf(si(ch.asc), school), 4, "maître de l'Ascendant");
    }
    add(rulerOf(si(ch.P.soleil.lon), school), 2, "maître du signe solaire");
    add(rulerOf(si(ch.P.lune.lon), school), 2, "maître du signe lunaire");
    ids.forEach(id => { const st = modState(id, ch.P[id].lon); if(st === "domicile") add(id, 2, "en domicile"); if(st === "exaltation") add(id, 1, "exaltée"); });
    const asp = aspects(ch, school); asp.forEach(x => { if(x.orb < 4){ add(x.a, 1, null); add(x.b, 1, null); } });
    return ids.map(id => ({id, score:sc[id], why:[...new Set(why[id].filter(Boolean))]})).sort((a, b) => b.score - a.score);
  }
  function patterns(ch, school){
    const ids = school === "tradition" ? TRAD7 : MOD10, out = [], L = id => ch.P[id].lon;
    const cnt = {}; ids.forEach(id => { const k = si(L(id)); (cnt[k] = cnt[k] || []).push(id); });
    Object.entries(cnt).forEach(([k, v]) => { if(v.length >= 3) out.push({type:"stellium", sign:+k, ids:v}); });
    const asp = (a, b, ang, orb) => Math.abs(sep(L(a), L(b)) - ang) <= orb;
    for(let i = 0; i < ids.length; i++) for(let j = i+1; j < ids.length; j++) for(let k = j+1; k < ids.length; k++){
      const [a, b, c] = [ids[i], ids[j], ids[k]];
      if(asp(a,b,120,7) && asp(b,c,120,7) && asp(a,c,120,7)) out.push({type:"grandtrigone", ids:[a,b,c]});
      [[a,b,c],[a,c,b],[b,c,a]].forEach(([x, y, z]) => { if(asp(x,y,180,8) && asp(x,z,90,7) && asp(y,z,90,7)) out.push({type:"tcarre", ids:[x,y], apex:z}); });
    }
    return out;
  }

  /* ---------- le temps ---------- */
  function transits(natal, date, school){
    const now = planets(date), ids = school === "tradition" ? [...TRAD7] : [...MOD10];
    const T = ids.map(id => ({id, lon:now[id].lon, speed:now[id].speed}));
    const N = pointsFor(natal, school).filter(p => p.id !== "noeudn");
    const res = [];
    T.forEach(t => N.forEach(n => {
      const s = sep(t.lon, n.lon), lim = ["lune"].includes(t.id) ? 2 : ["soleil","mercure","venus","mars"].includes(t.id) ? 1.5 : 1.5;
      D.ASPECTS.forEach(a => { if(a.moderne) return; const orb = Math.abs(s - a.ang); if(orb <= lim){
        const s2 = sep(t.lon + t.speed*.05, n.lon); res.push({t:t.id, n:n.id, asp:a.id, orb, app: Math.abs(s2 - a.ang) < orb}); } });
    }));
    const W = {pluton:9, neptune:8, uranus:7, saturne:6, jupiter:5, mars:4, soleil:3, venus:2, mercure:2, lune:1};
    return res.sort((x, y) => (W[y.t] - W[x.t]) || x.orb - y.orb);
  }
  function moonInfo(date){
    const A = AE(), ph = A.MoonPhase(date), ill = (1 - Math.cos(ph*rad)) / 2;
    const idx = Math.floor(norm(ph + 22.5) / 45);
    return {phase:ph, ill, idx, f:ph/360};
  }
  function lunations(date, n = 4){
    const A = AE(), out = []; let q = A.SearchMoonQuarter(date);
    for(let i = 0; i < n*2 && out.length < n; i++){ if(q.quarter === 0 || q.quarter === 2) out.push({type:q.quarter === 0 ? "nl" : "pl", date:q.time.date, lon: lonOf("lune", q.time.date)}); q = A.NextMoonQuarter(q); }
    return out;
  }
  function eclipses(date){
    const A = AE(), out = [];
    try{ const l = A.SearchLunarEclipse(date); out.push({type:"lune", kind:l.kind, date:l.peak.date}); }catch(e){}
    try{ const s = A.SearchGlobalSolarEclipse(date); out.push({type:"soleil", kind:s.kind, date:s.peak.date}); }catch(e){}
    return out.sort((a, b) => a.date - b.date);
  }
  /* changements de signe et stations, par pas puis par dichotomie */
  function events(date, days, ids = ["soleil","mercure","venus","mars","jupiter","saturne"]){
    const out = [], step = .5;
    ids.forEach(id => {
      let t0 = date.getTime(), p0 = posOf(id, date);
      for(let k = 1; k <= days/step; k++){
        const t1 = date.getTime() + k*step*DAY, p1 = posOf(id, new Date(t1));
        if(si(p0.lon) !== si(p1.lon)){
          let a = t0, b = t1; for(let i = 0; i < 30; i++){ const m = (a+b)/2; if(si(lonOf(id, new Date(m))) === si(p0.lon)) a = m; else b = m; }
          out.push({type:"ingres", id, date:new Date(b), sign:si(p1.lon), retro:p1.retro});
        }
        if(id !== "soleil" && Math.sign(p0.speed) !== Math.sign(p1.speed)) out.push({type:"station", id, date:new Date((t0+t1)/2), retro: p1.speed < 0, lon:p1.lon});
        t0 = t1; p0 = p1;
      }
    });
    return out.sort((a, b) => a.date - b.date);
  }
  function solarReturn(natal, after){
    const A = AE(); const t = A.SearchSunLongitude(natal.P.soleil.lon, after, 370); return t ? t.date : null;
  }
  function nextReturn(id, lon, after, maxDays){
    let t0 = after.getTime(), d0 = norm(lonOf(id, after) - lon + 180) - 180;
    for(let k = 1; k <= maxDays; k++){
      const t1 = after.getTime() + k*DAY, d1 = norm(lonOf(id, new Date(t1)) - lon + 180) - 180;
      if(d0 < 0 && d1 >= 0 && Math.abs(d1 - d0) < 10) return new Date(t0 + (t1 - t0)*(-d0)/(d1 - d0));
      t0 = t1; d0 = d1;
    }
    return null;
  }
  /* jour et heure planétaires : la journée va d'un lever de Soleil au suivant, en douze heures de jour et douze de nuit */
  function planetaryHour(date, lat, lon, tz){
    const A = AE(); try{
      const obs = new A.Observer(lat, lon, 0);
      let rise = A.SearchRiseSet(A.Body.Sun, obs, +1, new Date(date.getTime() - 1.5*DAY), 2); if(!rise) return null;
      for(;;){ const n = A.SearchRiseSet(A.Body.Sun, obs, +1, new Date(rise.date.getTime() + 3600000), 2); if(!n || n.date > date) break; rise = n; }
      const set = A.SearchRiseSet(A.Body.Sun, obs, -1, rise.date, 1), next = A.SearchRiseSet(A.Body.Sun, obs, +1, set.date, 1);
      if(!set || !next) return null;
      const wd = new Intl.DateTimeFormat("en-US", {timeZone:tz || "UTC", weekday:"short"}).format(rise.date);
      const dayRuler = D.WEEK_RULER[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(wd)];
      let idx, start, len;
      if(date < set.date){ len = (set.date - rise.date)/12; idx = Math.floor((date - rise.date)/len); start = rise.date.getTime() + idx*len; }
      else { len = (next.date - set.date)/12; const j = Math.floor((date - set.date)/len); idx = 12 + j; start = set.date.getTime() + j*len; }
      const hourRuler = D.CHALD[(D.CHALD.indexOf(dayRuler) + idx) % 7];
      return {dayRuler, hourRuler, idx, start:new Date(start), end:new Date(start + len), rise:rise.date, set:set.date};
    }catch(e){ return null; }
  }

  return {norm, sep, si, PL, SG, TRAD7, MOD10, mkUTC, tzOffsetMin, localToUTC, lonOf, posOf, planets, angles, houses, houseOf, chart,
    aspects, aspectsBetween, pointsFor, rulerOf, termOf, faceOf, dignities, modState, receptions, solarState, lots, ageAt, profection,
    balance, dominants, patterns, transits, moonInfo, lunations, eclipses, events, solarReturn, nextReturn, planetaryHour};
})();

;
/* ===== Arcanes · Astrologie : les schémas de L'école =====
   Un schéma par leçon, dessiné en SVG, souvent manipulable (curseur, boutons).
   Chaque schéma : {html() -> chaîne, bind(fig) -> branche les commandes}.
   Repère des angles : 0° Bélier à gauche, le zodiaque tourne dans le sens inverse des aiguilles d'une montre. */
const ASTRO_SCHEMAS = (() => {
  if(typeof ASTRO_DATA === "undefined" || typeof ASTRO_CALC === "undefined") return {get:() => null};
  const D = ASTRO_DATA, C = ASTRO_CALC, PL = C.PL, SG = C.SG, T = D.T, rad = Math.PI/180;
  const f1 = n => n.toFixed(1);
  const xy = (l, r) => [-r*Math.cos(l*rad), r*Math.sin(l*rad)];          // longitude écliptique -> écran (Bélier à gauche, sens direct)
  const q1 = (s, r) => r.querySelector(s), qa = (s, r) => [...r.querySelectorAll(s)];
  const ROM = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  const g = (s, cls = "") => `<tspan class="sc-g ${cls}">${s}${T}</tspan>`;
  const txt = (x, y, s, cls = "") => `<text x="${f1(x)}" y="${f1(y)}" class="${cls}" text-anchor="middle" dominant-baseline="central">${s}</text>`;
  const arc = (l0, l1, r0, r1) => { const [a, b] = xy(l0, r1), [c, d] = xy(l1, r1), [e, f] = xy(l1, r0), [g2, h] = xy(l0, r0), big = (l1 - l0) > 180 ? 1 : 0;
    return `M${f1(a)} ${f1(b)}A${r1} ${r1} 0 ${big} 0 ${f1(c)} ${f1(d)}L${f1(e)} ${f1(f)}A${r0} ${r0} 0 ${big} 1 ${f1(g2)} ${f1(h)}Z`; };
  const line = (l, r0, r1, cls = "sc-line") => { const [a, b] = xy(l, r0), [c, d] = xy(l, r1); return `<line x1="${f1(a)}" y1="${f1(b)}" x2="${f1(c)}" y2="${f1(d)}" class="${cls}"/>`; };
  /* l'anneau du zodiaque : douze secteurs colorés par élément */
  const zring = (r0, r1, o = {}) => SG.map((s, k) => { const [tx, ty] = xy(30*k + 15, (r0 + r1)/2);
    return `<g class="sc-z el-${s.el}${o.on && o.on(k) ? " on" : ""}" data-k="${k}"${o.click ? ` role="button" tabindex="0" aria-label="${s.nom}"` : ""}><path d="${arc(30*k, 30*k + 30, r0, r1)}" class="sc-sec"/>${txt(tx, ty, s.gl + T, "sc-zg")}</g>`; }).join("");
  const svg = (vb, inner, label, cls = "") => `<svg class="sc-svg ${cls}" viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg>`;
  const slider = (id, min, max, val, step, label) => `<label class="sc-ctl"><span>${label}</span><input type="range" data-r="${id}" min="${min}" max="${max}" step="${step || 1}" value="${val}"><output data-o="${id}"></output></label>`;
  const seg = (name, opts, cur) => `<div class="sc-seg" role="group">${opts.map(([v, l]) => `<button type="button" data-${name}="${v}" aria-pressed="${v === cur}">${l}</button>`).join("")}</div>`;
  const press = (root, name, v) => qa(`[data-${name}]`, root).forEach(b => b.setAttribute("aria-pressed", b.dataset[name] === String(v)));
  const fmtDay = d => d.toLocaleDateString("fr-FR", {day:"numeric", month:"long"});
  const sgn = l => SG[C.si(l)];
  const W = () => window.ArcanesAstro;

  const S = {};

  /* ---------- LES BASES ---------- */
  S.carte = {html(){ const ch = C.chart({date:new Date(), lat:48.857, lon:2.352, system:"placidus"}), id = "venus", p = ch.P[id], k = C.si(p.lon);
      return `<div class="sc-two"><div class="sc-mini">${W().wheel(ch, {small:true, aspects:false, prefix:"cp", label:"Le ciel en ce moment"})}</div>
        <div class="sc-keys"><p class="sc-k"><b>La planète</b><span>dit <i>quoi</i> : une fonction, un besoin.</span><em>${g(PL[id].gl)} ${PL[id].court} : l'amour, le goût, l'accord</em></p>
          <p class="sc-k"><b>Le signe</b><span>dit <i>comment</i> : un style, une couleur.</span><em>${g(SG[k].gl)} en ${SG[k].nom} : ${SG[k].mots.slice(0, 2).join(", ")}</em></p>
          <p class="sc-k"><b>La maison</b><span>dit <i>où</i> : le domaine de vie.</span><em>maison ${ROM[p.house]} : ${D.HOUSES[p.house - 1].nom.toLowerCase()}</em></p></div></div>`; },
    cap:"Le ciel de cet instant, vu de Paris. Une phrase d'astrologie se lit toujours en trois mots : une planète, dans un signe, dans une maison."};

  S.ecliptique = {html(){ return svg("-170 -170 340 340", `<circle r="150" class="sc-faint"/>${zring(124, 150)}<circle r="86" class="sc-orbit"/>
        <g class="sc-earth"><circle r="13"/>${txt(0, 0, "♁" + T, "sc-eg")}</g><line class="sc-ray" data-ray x1="0" y1="0" x2="0" y2="0"/><g data-sun><circle r="11" class="sc-sun"/></g>`, "Le Soleil parcourt l'écliptique en un an")
        + slider("d", 0, 364, Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1))/864e5), 1, "Jour de l'année") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const y = new Date().getFullYear(), R = q1("[data-r=d]", fig), out = q1("[data-o=d]", fig), sun = q1("[data-sun]", fig), ray = q1("[data-ray]", fig), read = q1("[data-read]", fig);
      const up = () => { const d = new Date(y, 0, 1 + +R.value, 12), l = C.planets(d).soleil.lon, [x, yy] = xy(l, 86), [rx, ry] = xy(l, 124), k = C.si(l);
        sun.setAttribute("transform", `translate(${f1(x)} ${f1(yy)})`); ray.setAttribute("x2", f1(rx)); ray.setAttribute("y2", f1(ry));
        qa(".sc-z", fig).forEach(z => z.classList.toggle("on", +z.dataset.k === k)); out.textContent = fmtDay(d);
        read.innerHTML = `Ce jour-là, vu de la Terre, le Soleil est à <b>${Math.floor(l % 30)}° ${SG[k].nom}</b>.`; };
      R.oninput = up; up(); },
    cap:"Vu de la Terre, le Soleil semble faire le tour du ciel en un an, sur un chemin appelé l'écliptique. Le zodiaque, c'est cette route découpée en douze parts de 30°."};

  S.retro = {html(){ return svg("-170 -170 340 340", `<circle r="155" class="sc-faint"/><circle r="62" class="sc-orbit"/><circle r="104" class="sc-orbit"/>
        <circle r="10" class="sc-sun"/><path data-trace class="sc-trace" d=""/><line data-sight class="sc-ray"/><g data-e><circle r="6" class="sc-earthdot"/></g><g data-m><circle r="5.5" class="sc-mars"/></g><g data-p><circle r="4" class="sc-proj"/></g>`, "La boucle de rétrogradation de Mars")
        + slider("t", 0, 100, 0, 1, "Le temps (deux ans)") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=t]", fig), read = q1("[data-read]", fig), out = q1("[data-o=t]", fig);
      const pos = t => { const ae = t*2*Math.PI*2 + 2.2, am = t*2*Math.PI*2/1.881 + 2.2 + .35; const E = [62*Math.cos(ae), -62*Math.sin(ae)], M = [104*Math.cos(am), -104*Math.sin(am)];
        const dx = M[0] - E[0], dy = M[1] - E[1], n = Math.hypot(dx, dy), ang = Math.atan2(dy, dx); // projection sur la sphère des fixes
        const k = (() => { const b = 2*(E[0]*dx + E[1]*dy)/n, c = E[0]*E[0] + E[1]*E[1] - 155*155; return (-b + Math.sqrt(b*b - 4*c))/2; })();
        return {E, M, P:[E[0] + dx/n*k, E[1] + dy/n*k], ang}; };
      const up = () => { const t = +R.value/100, A = pos(t), B = pos(Math.max(0, t - .004)), tr = [];
        for(let i = 0; i <= +R.value; i++){ const p = pos(i/100).P; tr.push(`${f1(p[0])} ${f1(p[1])}`); }
        q1("[data-trace]", fig).setAttribute("d", tr.length > 1 ? "M" + tr.join("L") : "");
        q1("[data-e]", fig).setAttribute("transform", `translate(${f1(A.E[0])} ${f1(A.E[1])})`); q1("[data-m]", fig).setAttribute("transform", `translate(${f1(A.M[0])} ${f1(A.M[1])})`); q1("[data-p]", fig).setAttribute("transform", `translate(${f1(A.P[0])} ${f1(A.P[1])})`);
        const s = q1("[data-sight]", fig); s.setAttribute("x1", f1(A.E[0])); s.setAttribute("y1", f1(A.E[1])); s.setAttribute("x2", f1(A.P[0])); s.setAttribute("y2", f1(A.P[1]));
        let d = Math.atan2(A.P[1], A.P[0]) - Math.atan2(B.P[1], B.P[0]); if(d > Math.PI) d -= 2*Math.PI; if(d < -Math.PI) d += 2*Math.PI;
        const retro = t > 0 && d > 0; out.textContent = Math.round(t*24) + " mois";
        read.innerHTML = retro ? `<b class="sc-bad">Mars rétrograde</b> : la Terre, plus rapide, le double ; vu d'ici, il semble reculer.` : `<b>Mars en marche directe</b> : vu de la Terre, il avance dans le zodiaque.`; };
      R.oninput = up; up(); },
    cap:"Mars ne recule jamais vraiment. Quand la Terre, sur une orbite plus courte, le dépasse, la ligne de visée balaie le ciel à rebours : la planète dessine une boucle sur le fond des étoiles."};

  S.ecoles = {html(){ const row = ids => ids.map(id => `<span class="sc-pl${PL[id].moderne ? " new" : ""}">${g(PL[id].gl)}<small>${PL[id].court}</small></span>`).join("");
      return `<div class="sc-cols"><div class="sc-col"><h4>La tradition</h4><p class="help">Sept astres visibles à l'œil nu</p><div class="sc-pls">${row(C.TRAD7)}</div></div>
        <div class="sc-col"><h4>L'astrologie moderne</h4><p class="help">Dix planètes, dont trois découvertes au télescope</p><div class="sc-pls">${row(C.MOD10)}</div></div></div>
        <table class="sc-tab"><thead><tr><th>Signe</th><th>Maître traditionnel</th><th>Maître moderne</th></tr></thead><tbody>${SG.filter(s => s.maitreMod !== s.maitre).map(s => `<tr><th>${g(s.gl, "el-" + s.el)} ${s.nom}</th><td>${g(PL[s.maitre].gl)} ${PL[s.maitre].court}</td><td>${g(PL[s.maitreMod].gl)} ${PL[s.maitreMod].court}</td></tr>`).join("")}</tbody></table>`; },
    cap:"Même ciel, même carte : les deux écoles diffèrent par les astres qu'elles comptent et par quelques maîtrises."};

  /* ---------- LES PLANÈTES ---------- */
  const PH = ["Nouvelle lune","Premier croissant","Premier quartier","Gibbeuse croissante","Pleine lune","Gibbeuse décroissante","Dernier quartier","Dernier croissant"];
  S.luminaires = {html(){ return `<div class="sc-two">${svg("-170 -130 340 260", `<g class="sc-rays">${[-90,-45,0,45,90].map(y => `<line x1="-168" y1="${y}" x2="-120" y2="${y}"/>`).join("")}</g>${txt(-150, -112, "Lumière du Soleil", "sc-small")}
        <circle r="92" class="sc-orbit"/><circle r="16" class="sc-earthdot"/>${txt(0, 0, "♁" + T, "sc-eg")}<g data-moon><circle r="11" class="sc-moonlit"/><path data-dark class="sc-moondark"/></g>`, "La Lune autour de la Terre")}
        <div class="sc-moonview"><div data-mv></div><p class="sc-read" data-read></p></div></div>` + slider("f", 0, 100, 0, 1, "Le mois lunaire"); },
    bind(fig){ const R = q1("[data-r=f]", fig), out = q1("[data-o=f]", fig);
      const up = () => { const f = +R.value/100, a = Math.PI - f*2*Math.PI, x = 92*Math.cos(a), y = -92*Math.sin(a);   // pleine lune à droite (opposée au Soleil)
        q1("[data-moon]", fig).setAttribute("transform", `translate(${f1(x)} ${f1(y)})`); q1("[data-dark]", fig).setAttribute("d", "M0 -11A11 11 0 0 1 0 11Z");
        const mv = q1("[data-mv]", fig); mv.innerHTML = typeof moonSVG === "function" ? moonSVG(f) : "";
        out.textContent = Math.round(f*29.5) + " j"; q1("[data-read]", fig).innerHTML = `<b>${PH[Math.round(f*8) % 8]}</b><br>${Math.round((1 - Math.cos(f*2*Math.PI))/2*100)} % éclairée`; };
      R.oninput = up; up(); },
    cap:"La Lune est toujours à moitié éclairée par le Soleil ; c'est notre point de vue qui change. En 29 jours et demi, elle passe de la nouvelle lune (entre la Terre et le Soleil) à la pleine lune (à l'opposé)."};

  S.elongation = {html(){ return seg("pl", [["mercure","Mercure · 28°"],["venus","Vénus · 47°"]], "venus") + svg("-200 -130 400 260", `<circle r="13" class="sc-sun" cx="-40"/>${txt(-40, 26, "Soleil", "sc-small")}
        <circle data-orb cx="-40" r="70" class="sc-orbit"/><circle cx="120" r="7" class="sc-earthdot"/>${txt(120, 20, "Terre", "sc-small")}
        <line data-t1 class="sc-ray"/><line data-t2 class="sc-ray"/><line x1="120" y1="0" x2="-40" y2="0" class="sc-faint"/><path data-ang class="sc-angle"/><text data-lab class="sc-big" x="70" y="-6" text-anchor="middle"></text>`, "Écart maximal de Mercure et Vénus au Soleil")
        + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const up = id => { const r = id === "venus" ? 116 : 62, E = [120, 0], Sx = -40, d = E[0] - Sx, a = Math.asin(r/d), L = Math.sqrt(d*d - r*r);
        const tx = E[0] - L*Math.cos(a), ty = L*Math.sin(a);
        q1("[data-orb]", fig).setAttribute("r", r);
        [["[data-t1]", -1], ["[data-t2]", 1]].forEach(([s, k]) => { const l = q1(s, fig); l.setAttribute("x1", 120); l.setAttribute("y1", 0); l.setAttribute("x2", f1(tx)); l.setAttribute("y2", f1(k*ty)); });
        q1("[data-ang]", fig).setAttribute("d", `M${120 - 34} 0A34 34 0 0 1 ${f1(120 - 34*Math.cos(a))} ${f1(-34*Math.sin(a))}`);
        q1("[data-lab]", fig).textContent = Math.round(a/rad) + "°"; q1("[data-lab]", fig).setAttribute("y", -8 - 10*Math.sin(a));
        press(fig, "pl", id);
        q1("[data-read]", fig).innerHTML = id === "venus" ? "Vénus ne s'écarte jamais de plus de <b>47°</b> du Soleil : étoile du soir ou du matin, jamais en pleine nuit." : "Mercure reste à moins de <b>28°</b> du Soleil : on ne le voit qu'à l'aube ou au crépuscule, bas sur l'horizon."; };
      qa("[data-pl]", fig).forEach(b => b.onclick = () => up(b.dataset.pl)); up("venus"); },
    cap:"Mercure et Vénus tournent plus près du Soleil que la Terre : vus d'ici, ils restent toujours dans son voisinage. Mars, Jupiter et Saturne, plus lointains, peuvent lui faire face."};

  S.cycles = {html(){ const Y = 90, X = a => 20 + a/Y*560, P = [["jupiter", 11.86], ["saturne", 29.46]];
      const rows = P.map(([id, per], i) => { const y = 50 + i*58; let s = `<text x="16" y="${y - 18}" class="sc-small" text-anchor="start">${PL[id].court} · tous les ${String(per).replace(".", ",")} ans</text><line x1="20" y1="${y}" x2="580" y2="${y}" class="sc-faint"/>`;
        for(let a = per; a < Y; a += per) s += `<circle cx="${f1(X(a))}" cy="${y}" r="6" class="sc-dot"/><text x="${f1(X(a))}" y="${y + 18}" class="sc-small">${Math.round(a)}</text>`; return s; }).join("");
      return svg("0 0 600 180", `${rows}<line data-age x1="0" y1="20" x2="0" y2="160" class="sc-cursor"/>${[0,10,20,30,40,50,60,70,80,90].map(a => `<text x="${f1(X(a))}" y="170" class="sc-tick">${a}</text>`).join("")}`, "Les retours de Jupiter et de Saturne dans une vie")
        + slider("a", 0, 90, 29, 1, "Ton âge") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=a]", fig), X = a => 20 + a/90*560;
      const up = () => { const a = +R.value, l = q1("[data-age]", fig); l.setAttribute("x1", f1(X(a))); l.setAttribute("x2", f1(X(a))); q1("[data-o=a]", fig).textContent = a + " ans";
        const jr = a % 11.86, sr = a % 29.46; q1("[data-read]", fig).innerHTML = (sr < 1.2 || sr > 28.3) ? "<b>Retour de Saturne</b> : un bilan, une maturité nouvelle." : (jr < .8 || jr > 11.06) ? "<b>Retour de Jupiter</b> : un nouveau cycle de croissance." : `Prochain retour de Jupiter vers ${Math.round(Math.ceil((a + .5)/11.86)*11.86)} ans, de Saturne vers ${Math.round(Math.ceil((a + .5)/29.46)*29.46)} ans.`; };
      R.oninput = up; up(); },
    cap:"Jupiter revient à sa place de naissance tous les douze ans, Saturne tous les vingt-neuf ans et demi : les grands rendez-vous d'une vie."};

  S.lentes = {html(){ const P = [["uranus", 84, 1781], ["neptune", 164.8, 1846], ["pluton", 248, 1930]], X = y => 20 + y/250*560;
      return svg("0 0 600 200", `${P.map(([id, per, dec], i) => { const y = 40 + i*52; return `<text x="20" y="${y - 14}" class="sc-small" text-anchor="start">${g(PL[id].gl)} ${PL[id].court} · découvert en ${dec}</text><rect x="20" y="${y - 6}" width="${f1(X(per) - 20)}" height="12" rx="6" class="sc-bar"/><text x="${f1(X(per) + 8)}" y="${y}" class="sc-small" text-anchor="start">${String(per).replace(".", ",")} ans</text>`; }).join("")}
        <rect x="20" y="168" width="${f1(X(80) - 20)}" height="10" rx="5" class="sc-bar life"/><text x="${f1(X(80) + 8)}" y="173" class="sc-small" text-anchor="start">une vie humaine</text>`, "Les cycles des planètes lentes"); },
    cap:"Uranus, Neptune et Pluton tournent si lentement qu'elles marquent des générations plutôt que des individus : Pluton ne fait même pas le tiers de son tour en une vie."};

  S.secte = {html(){ return seg("sx", [["jour","Thème de jour"],["nuit","Thème de nuit"]], "jour") + svg("-170 -110 340 220", `<rect x="-170" y="-110" width="340" height="110" class="sc-day" data-sky/><rect x="-170" y="0" width="340" height="110" class="sc-ground"/><line x1="-170" y1="0" x2="170" y2="0" class="sc-line"/>
        ${txt(140, -10, "horizon", "sc-small")}<g data-sun><circle r="14" class="sc-sun"/></g>`, "Thème diurne ou nocturne") + `<div class="sc-cols" data-cols></div>`; },
    bind(fig){ const up = m => { const day = m === "jour"; press(fig, "sx", m); q1("[data-sun]", fig).setAttribute("transform", `translate(-60 ${day ? -58 : 58})`); q1("[data-sky]", fig).classList.toggle("night", !day);
        const L = day ? [["soleil","jupiter","saturne"], "Saturne s'adoucit, Jupiter rayonne", "mars", "Mars, de la nuit, devient le plus délicat"] : [["lune","venus","mars"], "Mars s'adoucit, Vénus rayonne", "saturne", "Saturne, du jour, devient le plus lourd"];
        q1("[data-cols]", fig).innerHTML = `<div class="sc-col"><h4>Planètes de la secte</h4><div class="sc-pls">${L[0].map(id => `<span class="sc-pl">${g(PL[id].gl)}<small>${PL[id].court}</small></span>`).join("")}</div><p class="help">${L[1]}.</p></div><div class="sc-col"><h4>Le maléfique contraire</h4><div class="sc-pls"><span class="sc-pl bad">${g(PL[L[2]].gl)}<small>${PL[L[2]].court}</small></span></div><p class="help">${L[3]}.</p></div>`; };
      qa("[data-sx]", fig).forEach(b => b.onclick = () => up(b.dataset.sx)); up("jour"); },
    cap:"Le Soleil au-dessus de l'horizon fait un thème diurne ; en dessous, un thème nocturne. Chaque camp a ses planètes, qui s'y trouvent plus à l'aise."};

  S.noeuds = {html(){ return svg("-180 -110 360 220", `<ellipse rx="160" ry="44" class="sc-orbit"/>${txt(0, 58, "écliptique (route du Soleil)", "sc-small")}
        <g transform="rotate(-10)"><ellipse rx="160" ry="62" class="sc-orbit moon"/></g>
        <g transform="translate(-157 -6)"><circle r="8" class="sc-node"/>${txt(0, -20, "☊" + T + " Nœud Nord", "sc-small")}</g><g transform="translate(157 6)"><circle r="8" class="sc-node"/>${txt(0, 22, "☋" + T + " Nœud Sud", "sc-small")}</g>
        <circle r="12" class="sc-earthdot"/><g data-moon><circle r="7" class="sc-moonlit"/></g>`, "Les nœuds de la Lune") + slider("m", 0, 100, 20, 1, "La Lune sur son orbite") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=m]", fig);
      const up = () => { const a = +R.value/100*2*Math.PI, c = Math.cos(-10*rad), s = Math.sin(-10*rad), x0 = -160*Math.cos(a), y0 = 62*Math.sin(a), x = x0*c - y0*s, y = x0*s + y0*c;
        q1("[data-moon]", fig).setAttribute("transform", `translate(${f1(x)} ${f1(y)})`); q1("[data-o=m]", fig).textContent = "";
        const near = Math.min(Math.abs(Math.sin(a)), 1) < .2; q1("[data-read]", fig).innerHTML = near ? "<b>Près d'un nœud</b> : si la lunaison tombe ici, une éclipse est possible." : "Loin des nœuds : la Lune passe au-dessus ou au-dessous de la route du Soleil, pas d'éclipse."; };
      R.oninput = up; up(); },
    cap:"L'orbite de la Lune est inclinée de 5° sur celle du Soleil. Elle la coupe en deux points, les nœuds : c'est là, et seulement là, que les éclipses peuvent se produire."};

  /* ---------- LES SIGNES ---------- */
  const wheelZ = (on, extra = "") => svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/>${zring(108, 150, {on, click:true})}<circle r="108" class="sc-faint"/><g data-extra>${extra}</g>`, "Le zodiaque");
  const poly = ks => `<path class="sc-poly" d="M${ks.map(k => xy(30*k + 15, 100).map(f1).join(" ")).join("L")}Z"/>`;
  S.elements = {html(){ return seg("el", Object.entries(D.ELEMENTS).map(([k, E]) => [k, E.nom.replace(/^L[ae]s? |^L'/, "")]), "feu") + `<div class="sc-two">${wheelZ(() => false)}<div class="sc-keys" data-txt></div></div>`; },
    bind(fig){ const up = e => { press(fig, "el", e); const ks = SG.map((s, k) => s.el === e ? k : -1).filter(k => k >= 0);
        qa(".sc-z", fig).forEach(z => z.classList.toggle("on", ks.includes(+z.dataset.k))); q1("[data-extra]", fig).innerHTML = poly(ks);
        const E = D.ELEMENTS[e]; q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b class="el-${e}">${E.nom}</b><span>${E.qual}</span><em>${ks.map(k => SG[k].nom).join(", ")}</em></p><p>${E.txt}</p><p class="help">Les trois signes d'un même élément forment un triangle : ils sont en trigone, à 120° les uns des autres.</p>`; };
      qa("[data-el]", fig).forEach(b => b.onclick = () => up(b.dataset.el)); up("feu"); },
    cap:"Feu, terre, air, eau : chaque élément revient trois fois dans le zodiaque, tous les quatre signes."};

  S.modes = {html(){ return seg("mo", Object.entries(D.MODES).map(([k, M]) => [k, M.nom]), "cardinal") + `<div class="sc-two">${wheelZ(() => false)}<div class="sc-keys" data-txt></div></div>`; },
    bind(fig){ const up = m => { press(fig, "mo", m); const ks = SG.map((s, k) => s.mode === m ? k : -1).filter(k => k >= 0);
        qa(".sc-z", fig).forEach(z => z.classList.toggle("on", ks.includes(+z.dataset.k))); q1("[data-extra]", fig).innerHTML = poly(ks);
        q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>${D.MODES[m].nom}</b><em>${ks.map(k => SG[k].nom).join(", ")}</em></p><p>${D.MODES[m].txt}</p><p class="help">Les quatre signes d'un même mode forment une croix : ils sont en carré ou en opposition, d'où leur énergie commune et leur tension.</p>`; };
      qa("[data-mo]", fig).forEach(b => b.onclick = () => up(b.dataset.mo)); up("cardinal"); },
    cap:"Chaque saison compte trois signes : celui qui l'ouvre (cardinal), celui qui l'installe (fixe), celui qui la prépare à finir (mutable)."};

  const AXES = ["moi et l'autre : s'affirmer, s'accorder", "avoir et partager : mes ressources, celles des autres", "apprendre et comprendre : le proche et le lointain", "racines et sommet : le foyer, la carrière", "créer et servir : le plaisir, le travail", "le service, le rêve : ordonner ou dissoudre"];
  S.axes = {html(){ return `<div class="sc-two">${wheelZ(k => k === 0 || k === 6)}<div class="sc-keys" data-txt></div></div><p class="help sc-hint">Touche un signe.</p>`; },
    bind(fig){ const up = k => { const o = (k + 6) % 12, a = Math.min(k, o); qa(".sc-z", fig).forEach(z => z.classList.toggle("on", [k, o].includes(+z.dataset.k)));
        const [x1, y1] = xy(30*k + 15, 104), [x2, y2] = xy(30*o + 15, 104); q1("[data-extra]", fig).innerHTML = `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="sc-axis"/>`;
        q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>${SG[a].nom} – ${SG[a + 6].nom}</b><em>${AXES[a]}</em></p><p class="help">Deux signes opposés partagent la même polarité et le même mode : ce sont les deux faces d'une même question.</p>`; };
      qa(".sc-z", fig).forEach(z => { z.onclick = () => up(+z.dataset.k); z.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); up(+z.dataset.k); } }; }); up(0); },
    cap:"Le zodiaque se lit aussi en six axes : chaque signe trouve en face de lui son complément."};

  S.tour = {html(){ return `<div class="sc-signs">${SG.map((s, k) => `<button type="button" class="sc-sign" data-afiche="s:${k}"><img src="${window.ASTRO_IMG_SRC ? window.ASTRO_IMG_SRC("s" + k) : ""}" alt="" loading="lazy"><span><b>${g(s.gl, "el-" + s.el)} ${s.nom}</b><small>${s.dates.replace(/^du /, "")}</small></span></button>`).join("")}</div>`; },
    cap:"Les douze signes, sur les cartes célestes d'Urania's Mirror (Londres, 1824). Touche un signe pour lire sa fiche."};

  /* ---------- LES MAISONS ---------- */
  S.angles = {html(){ return `<div class="sc-mini big" data-w></div>` + slider("h", 0, 23.75, 8, .25, "Heure de naissance (aujourd'hui, à Paris)") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=h]", fig), now = new Date(), L = {lat:48.857, lon:2.352, tz:"Europe/Paris"};
      const up = () => { const v = +R.value, hh = Math.floor(v), mm = Math.round((v - hh)*60), date = C.localToUTC(now.getFullYear(), now.getMonth() + 1, now.getDate(), hh, mm, L);
        const ch = C.chart({date, lat:L.lat, lon:L.lon, system:"placidus"}); q1("[data-w]", fig).innerHTML = W().wheel(ch, {aspects:false, prefix:"pv", ids:["soleil","lune"], label:"Le ciel à cette heure"});
        q1("[data-o=h]", fig).textContent = `${String(hh).padStart(2, "0")} h ${String(mm).padStart(2, "0")}`;
        q1("[data-read]", fig).innerHTML = `Ascendant en <b>${sgn(ch.asc).nom}</b>, Milieu du Ciel en <b>${sgn(ch.mc).nom}</b>. Le Soleil est en maison ${ROM[ch.P.soleil.house]}${ch.P.soleil.house >= 7 ? " : au-dessus de l'horizon, il fait jour." : " : sous l'horizon, il fait nuit."}`; };
      R.oninput = up; up(); },
    cap:"Fais glisser l'heure : le ciel tourne en un jour, et l'Ascendant change de signe toutes les deux heures environ. Le Soleil se lève à l'Ascendant, culmine au Milieu du Ciel, se couche au Descendant."};

  S.maisons = {html(){ return seg("ty", [["angulaire","Angulaires"],["succédente","Succédentes"],["cadente","Cadentes"]], "angulaire") + `<div class="sc-two"><div class="sc-mini">${W().wheel(null, {houses:true, small:true})}</div><div class="sc-keys" data-txt></div></div>`; },
    bind(fig){ const TX = {angulaire:["I, IV, VII, X", "Elles commencent aux quatre angles : les planètes y sont fortes et visibles."], succédente:["II, V, VIII, XI", "Elles suivent les angles : une force moyenne, ce qui se construit et se possède."], cadente:["III, VI, IX, XII", "Elles « tombent » avant l'angle suivant : une force plus discrète, le mouvement, l'apprentissage."]};
      const up = t => { press(fig, "ty", t); qa(".w-hn", fig).forEach(e => e.classList.toggle("dim", !e.classList.contains("t-" + t))); q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>Maisons ${t}s</b><em>${TX[t][0]}</em></p><p>${TX[t][1]}</p>`; };
      qa("[data-ty]", fig).forEach(b => b.onclick = () => up(b.dataset.ty)); up("angulaire"); },
    cap:"Les douze maisons, l'Ascendant à gauche et le Milieu du Ciel en haut."};

  S.systemes = {html(){ const date = new Date(), sys = [["signes","Signes entiers"],["egal","Maisons égales"],["placidus","Placidus"]];
      return `<div class="sc-3w">${sys.map(([k, n]) => { const ch = C.chart({date, lat:48.857, lon:2.352, system:k}); return `<figure>${W().wheel(ch, {small:true, aspects:false, ids:[], prefix:"pv", label:n})}<figcaption>${n}</figcaption></figure>`; }).join("")}</div>`; },
    cap:"Le même instant à Paris, trois façons de découper le ciel en maisons. Les planètes ne bougent pas ; ce sont les frontières des maisons qui changent."};

  S.joies = {html(){ const J = C.TRAD7.map(id => [id, PL[id].joie]);
      return `<div class="sc-two"><div class="sc-mini">${svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/><circle r="70" class="sc-faint"/>${Array.from({length:12}, (_, i) => line(i*30, 70, 150, i % 3 ? "sc-faint" : "sc-line")).join("")}
        ${Array.from({length:12}, (_, i) => { const [x, y] = xy(i*30 + 15, 58); return txt(x, y, ROM[i + 1], "sc-small"); }).join("")}
        ${J.map(([id, n]) => { const [x, y] = xy((n - 1)*30 + 15, 112); return `<g transform="translate(${f1(x)} ${f1(y)})"><circle r="17" class="sc-plbg"/>${txt(0, 1, PL[id].gl + T, "sc-plg")}</g>`; }).join("")}
        <line x1="-160" y1="0" x2="160" y2="0" class="sc-axis"/>`, "Les joies des planètes")}</div>
        <div class="sc-keys">${J.map(([id, n]) => `<p class="sc-k row"><b>${g(PL[id].gl)} ${PL[id].court}</b><em>maison ${ROM[n]}</em></p>`).join("")}</div></div>`; },
    cap:"Chaque astre a sa maison préférée, sa « joie ». Les astres du jour se réjouissent au-dessus de l'horizon (Soleil en IX, Jupiter en XI, Saturne en XII), ceux de la nuit en dessous (Lune en III, Vénus en V, Mars en VI), Mercure à l'Ascendant."};

  /* ---------- LES ASPECTS ---------- */
  const ASPS = D.ASPECTS;
  S.aspects = {html(){ return svg("-160 -160 320 320", `<circle r="120" class="sc-faint"/>${Array.from({length:12}, (_, i) => line(i*30, 112, 120, "sc-faint")).join("")}
        <line data-l class="sc-asp"/><path data-a class="sc-angle"/><g transform="translate(-120 0)"><circle r="15" class="sc-plbg"/>${txt(0, 1, "☉" + T, "sc-plg")}</g><g data-b><circle r="15" class="sc-plbg"/>${txt(0, 1, "☽" + T, "sc-plg")}</g>
        <text data-t class="sc-big" x="0" y="8" text-anchor="middle"></text>`, "Deux planètes et l'angle qui les sépare") + slider("a", 0, 180, 120, 1, "Écart entre les deux planètes") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=a]", fig);
      const up = () => { const a = +R.value, [x, y] = xy(-a, 120), hit = ASPS.map(A => ({A, o:Math.abs(a - A.ang)})).filter(z => z.o <= z.A.orb).sort((p, q) => p.o - q.o)[0];
        q1("[data-b]", fig).setAttribute("transform", `translate(${f1(x)} ${f1(y)})`); const l = q1("[data-l]", fig); l.setAttribute("x1", -120); l.setAttribute("y1", 0); l.setAttribute("x2", f1(x)); l.setAttribute("y2", f1(y));
        l.setAttribute("class", "sc-asp " + (hit ? hit.A.cls : "none")); q1("[data-o=a]", fig).textContent = a + "°"; q1("[data-t]", fig).textContent = hit ? hit.A.gl + T : "";
        q1("[data-read]", fig).innerHTML = hit ? `<b>${hit.A.nom}</b> (${hit.A.ang}°, orbe ${Math.round(hit.o)}°) : ${hit.A.sens}.` : "Aucun aspect majeur : les deux planètes ne se « regardent » pas."; };
      R.oninput = up; up(); },
    cap:"Un aspect est un angle particulier entre deux planètes, mesuré sur le zodiaque. Fais glisser la Lune : quand l'écart approche 0°, 60°, 90°, 120° ou 180°, un aspect se forme, avec une marge appelée orbe."};

  S.orbes = {html(){ return svg("-170 -90 340 180", `<path d="M-160 40A260 260 0 0 1 160 40" class="sc-orbit"/><g transform="translate(0 -1)"><circle cx="0" cy="-19" r="15" class="sc-plbg"/>${txt(0, -18, "♄" + T, "sc-plg")}</g>
        <g data-m><circle r="13" class="sc-plbg"/>${txt(0, 1, "☽" + T, "sc-plg")}</g><text data-t class="sc-small" x="0" y="70" text-anchor="middle"></text>`, "Un aspect qui se forme puis se défait") + slider("t", -10, 10, -6, .5, "Écart de la Lune à Saturne") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=t]", fig);
      const up = () => { const d = +R.value, a = (d*7)*rad, x = 260*Math.sin(a), y = 241 - 260*Math.cos(a) - 222;
        q1("[data-m]", fig).setAttribute("transform", `translate(${f1(x)} ${f1(y - 19)})`); q1("[data-o=t]", fig).textContent = (d > 0 ? "+" : "") + String(d).replace(".", ",") + "°";
        q1("[data-read]", fig).innerHTML = Math.abs(d) < .5 ? "<b>Exact</b> : la conjonction est à son sommet." : d < 0 ? `<b>Appliquant</b> : la Lune, plus rapide, s'approche. L'aspect est à venir, il monte en puissance.` : `<b>Séparant</b> : la Lune s'éloigne. L'aspect est passé, son effet décroît.`; };
      R.oninput = up; up(); },
    cap:"La planète la plus rapide fait l'aspect. Avant l'exactitude, il est appliquant ; après, séparant. L'orbe est la marge, en degrés, dans laquelle on le compte encore."};

  const CONF = {
    tcarre:["Le T-carré", [0, 180, 90], [[0,1,"dur"],[0,2,"dur"],[1,2,"dur"]], "Deux planètes opposées, une troisième en carré aux deux : une tension motrice, qui se résout par le point libre."],
    trigone:["Le grand trigone", [0, 120, 240], [[0,1,"doux"],[1,2,"doux"],[2,0,"doux"]], "Trois planètes en trigone, souvent dans un même élément : un talent naturel, une aisance… qui peut endormir."],
    croix:["La grande croix", [0, 90, 180, 270], [[0,1,"dur"],[1,2,"dur"],[2,3,"dur"],[3,0,"dur"],[0,2,"dur"],[1,3,"dur"]], "Quatre planètes en carré et en opposition : une énergie considérable, tirée dans quatre directions."],
    yod:["Le Yod", [0, 60, 210], [[0,1,"doux"],[0,2,"mineur"],[1,2,"mineur"]], "Deux planètes en sextile, toutes deux en quinconce à une troisième : le « doigt de Dieu », un ajustement permanent."],
    stellium:["Le stellium", [100, 108, 115, 122], [], "Au moins trois planètes réunies dans un même signe : un centre de gravité du thème."]
  };
  S.configs = {html(){ return seg("cf", Object.entries(CONF).map(([k, c]) => [k, c[0].replace(/^L[ea] |^L'/, "")]), "tcarre") + `<div class="sc-two"><div class="sc-mini" data-w></div><div class="sc-keys" data-txt></div></div>`; },
    bind(fig){ const up = k => { press(fig, "cf", k); const [n, P, E, t] = CONF[k], pt = a => xy(a, 104);
        q1("[data-w]", fig).innerHTML = svg("-160 -160 320 320", `<circle r="132" class="sc-faint"/>${zring(118, 146, {})}${E.map(([a, b, c]) => { const [x1, y1] = pt(P[a]), [x2, y2] = pt(P[b]); return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="sc-asp ${c}"/>`; }).join("")}${P.map(a => { const [x, y] = pt(a); return `<circle cx="${f1(x)}" cy="${f1(y)}" r="8" class="sc-dot"/>`; }).join("")}`, n);
        q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>${n}</b></p><p>${t}</p>`; };
      qa("[data-cf]", fig).forEach(b => b.onclick = () => up(b.dataset.cf)); up("tcarre"); },
    cap:"Quand plusieurs aspects s'emboîtent, ils dessinent des figures. Rouge : aspects tendus ; bleu : aspects harmonieux ; gris : aspects mineurs."};

  /* ---------- LA TRADITION ---------- */
  const thema = (sel, mode) => { const at = id => SG.map((s, k) => [s, k]).filter(([s]) => s.maitre === id).map(([, k]) => k);
    return svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/>${zring(112, 150, {on:k => sel && (mode === "ex" ? at(sel).map(x => (x + 6) % 12) : at(sel)).includes(k)})}
      ${SG.map((s, k) => { const [x, y] = xy(30*k + 15, 90); return `<g transform="translate(${f1(x)} ${f1(y)})" class="sc-pin${sel === s.maitre ? " on" : ""}"><circle r="13" class="sc-plbg"/>${txt(0, 1, PL[s.maitre].gl + T, "sc-plg")}</g>`; }).join("")}
      ${line(90, 0, 150, "sc-axis")}${line(270, 0, 150, "sc-axis")}`, "Les domiciles des planètes"); };
  S.domiciles = {html(){ return seg("dp", C.TRAD7.map(id => [id, `${PL[id].gl}${T}`]), "venus") + seg("dm", [["dom","Domiciles"],["ex","Exils"]], "dom") + `<div class="sc-two"><div class="sc-mini" data-w></div><div class="sc-keys" data-txt></div></div>`; },
    bind(fig){ let sel = "venus", mode = "dom";
      const up = () => { press(fig, "dp", sel); press(fig, "dm", mode); q1("[data-w]", fig).innerHTML = thema(sel, mode);
        const dom = SG.filter(s => s.maitre === sel).map(s => s.nom), ex = SG.filter(s => SG[(SG.indexOf(s) + 6) % 12].maitre === sel).map(s => s.nom);
        q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>${g(PL[sel].gl)} ${PL[sel].court}</b><span>chez elle en ${dom.join(" et ")}</span><em>en exil en ${ex.join(" et ")}</em></p><p class="help">Le Soleil et la Lune gouvernent le Lion et le Cancer, au cœur de l'été ; puis chaque planète, dans l'ordre de sa distance, reçoit un signe de chaque côté. L'exil est le signe d'en face.</p>`; };
      qa("[data-dp]", fig).forEach(b => b.onclick = () => { sel = b.dataset.dp; up(); }); qa("[data-dm]", fig).forEach(b => b.onclick = () => { mode = b.dataset.dm; up(); }); up(); },
    cap:"Le schéma des domiciles, symétrique de part et d'autre de l'axe Cancer-Lion."};

  S.exaltations = {html(){ const E = SG.map((s, k) => s.exalt ? [s.exalt[0], k, s.exalt[1]] : null).filter(Boolean);
      return svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/>${zring(116, 150, {})}${E.map(([id, k, d]) => { const l = 30*k + d, [x, y] = xy(l, 92), [cx, cy] = xy(l + 180, 92);
        return `${line(l, 104, 116, "sc-line")}<g transform="translate(${f1(x)} ${f1(y)})"><circle r="13" class="sc-plbg good"/>${txt(0, 1, PL[id].gl + T, "sc-plg")}</g><g transform="translate(${f1(cx)} ${f1(cy)})" class="sc-fall"><circle r="9" class="sc-plbg bad"/>${txt(0, 1, PL[id].gl + T, "sc-plg small")}</g>`; }).join("")}`, "Exaltations et chutes")
        + `<table class="sc-tab"><thead><tr><th></th><th>Exaltation</th><th>Chute</th></tr></thead><tbody>${E.map(([id, k, d]) => `<tr><th>${g(PL[id].gl)} ${PL[id].court}</th><td>${d}° ${SG[k].nom}</td><td>${SG[(k + 6) % 12].nom}</td></tr>`).join("")}</tbody></table>`; },
    cap:"Chaque astre a un degré d'honneur, son exaltation (grands cercles), et en face, sa chute (petits cercles)."};

  S.receptions = {html(){ return svg("-180 -100 360 200", `<g transform="translate(-95 0)"><circle r="62" class="sc-faint"/>${txt(0, -76, "♈" + T + " Bélier · domicile de Mars", "sc-small")}<circle r="20" class="sc-plbg"/>${txt(0, 1, "♀" + T, "sc-plg")}</g>
        <g transform="translate(95 0)"><circle r="62" class="sc-faint"/>${txt(0, -76, "♉" + T + " Taureau · domicile de Vénus", "sc-small")}<circle r="20" class="sc-plbg"/>${txt(0, 1, "♂" + T, "sc-plg")}</g>
        <path d="M-70 -18Q0 -62 70 -18" class="sc-arrow"/><path d="M70 18Q0 62 -70 18" class="sc-arrow"/>${txt(0, -44, "reçoit", "sc-small")}${txt(0, 48, "reçoit", "sc-small")}`, "Une réception mutuelle")
        + `<p class="sc-read">Vénus est dans la maison de Mars, Mars dans celle de Vénus : chacun héberge l'autre. C'est une <b>réception mutuelle</b> ; ils s'entraident, et peuvent même échanger leurs places.</p>`; },
    cap:"Une planète posée dans le domicile d'une autre dépend d'elle : cette autre est son dispositeur, son hôte."};

  S.fortune = {html(){ return seg("fs", [["jour","De jour"],["nuit","De nuit"]], "jour") + svg("-160 -160 320 320", `<circle r="140" class="sc-faint"/>${zring(124, 150, {})}<line x1="-150" y1="0" x2="150" y2="0" class="sc-line"/>${txt(-150, -12, "AS", "sc-small")}
        <path data-arc1 class="sc-arcA"/><path data-arc2 class="sc-arcA b"/><g data-sun><circle r="12" class="sc-plbg"/>${txt(0, 1, "☉" + T, "sc-plg")}</g><g data-moon><circle r="12" class="sc-plbg"/>${txt(0, 1, "☽" + T, "sc-plg")}</g><g data-pf><circle r="12" class="sc-plbg good"/>${txt(0, 1, "⊗" + T, "sc-plg")}</g>`, "La part de Fortune")
        + slider("m", 10, 170, 70, 1, "Distance du Soleil à la Lune") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ let mode = "jour"; const R = q1("[data-r=m]", fig);
      const up = () => { press(fig, "fs", mode); const asc = 0, sun = mode === "jour" ? 240 : 120, d = +R.value, moon = sun + d, pf = mode === "jour" ? asc + d : asc - d;
        const at = (s, l) => { const [x, y] = xy(l, 100); q1(s, fig).setAttribute("transform", `translate(${f1(x)} ${f1(y)})`); };
        at("[data-sun]", sun); at("[data-moon]", moon); at("[data-pf]", pf);
        const arcP = (a, b, r) => { const [x1, y1] = xy(a, r), [x2, y2] = xy(b, r), sw = b > a ? 0 : 1; return `M${f1(x1)} ${f1(y1)}A${r} ${r} 0 0 ${sw} ${f1(x2)} ${f1(y2)}`; };
        q1("[data-arc1]", fig).setAttribute("d", arcP(sun, moon, 76)); q1("[data-arc2]", fig).setAttribute("d", arcP(asc, pf, 76)); q1("[data-o=m]", fig).textContent = d + "°";
        q1("[data-read]", fig).innerHTML = mode === "jour" ? "De jour : <b>Ascendant + Lune − Soleil</b>. On reporte depuis l'Ascendant la distance qui va du Soleil à la Lune." : "De nuit : <b>Ascendant + Soleil − Lune</b>. On reporte la même distance, mais dans l'autre sens."; };
      qa("[data-fs]", fig).forEach(b => b.onclick = () => { mode = b.dataset.fs; up(); }); R.oninput = up; up(); },
    cap:"La part de Fortune est à l'Ascendant ce que la Lune est au Soleil : le même écart, reporté depuis l'horizon."};

  /* ---------- LIRE UN THÈME ---------- */
  S.dominantes = {html(){ const ch = C.chart({date:new Date(), lat:48.857, lon:2.352, system:"placidus"}), B = C.balance(ch), mx = o => Math.max(...Object.values(o), 1);
      const bars = (o, lab) => Object.entries(o).map(([k, v]) => `<div class="sc-hb"><span>${lab(k)}</span><i class="b-${k}" style="--w:${(v/mx(o)*100).toFixed(0)}%"></i><b>${v}</b></div>`).join("");
      return `<div class="sc-cols"><div class="sc-col"><h4>Les éléments</h4>${bars(B.el, k => k)}</div><div class="sc-col"><h4>Les modes</h4>${bars(B.mo, k => k)}</div></div>`; },
    cap:"La répartition du ciel de cet instant : on compte chaque planète une fois, les luminaires et l'Ascendant deux fois. Ce qui domine colore tout le thème."};

  S.methode = {html(){ const st = [["Jour ou nuit","La secte : qui mène le thème ?"],["Le maître de l'Ascendant","Où est-il, en quel état ?"],["Les dignités","Qui est fort, qui est faible ?"],["Les angles et les maisons","Qui est visible, où se joue la vie ?"],["Les aspects et réceptions","Qui aide, qui gêne ?"]];
      return `<ol class="sc-flow">${st.map(([a, b], i) => `<li><span>${i + 1}</span><b>${a}</b><small>${b}</small></li>`).join("")}</ol>`; },
    cap:"La lecture traditionnelle avance par étapes, du général au particulier : chaque réponse oriente la suivante."};

  S.limites = {html(){ return `<div class="sc-cols"><div class="sc-col"><h4>Ce qu'un thème décrit</h4><ul class="sc-ul"><li>des tendances, des tempéraments</li><li>des thèmes de vie, des questions</li><li>des rythmes et des moments</li></ul></div>
      <div class="sc-col"><h4>Ce qu'il ne dit pas</h4><ul class="sc-ul no"><li>le sexe, le métier, le milieu social</li><li>des événements certains</li><li>la valeur d'une personne</li></ul></div></div>`; },
    cap:"Deux personnes nées au même instant ont le même thème et des vies différentes : le thème est une carte, pas le territoire."};

  /* ---------- LE TEMPS ---------- */
  S.transits = {html(){ return `<div class="sc-mini big" data-w></div>` + slider("d", 0, 365, 0, 1, "Dans combien de jours") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=d]", fig), A = W().state ? W().state() : null, me = A && A.themes && A.themes.find(x => x.moi);
      const nat = me ? C.chart({date:C.localToUTC(me.y, me.m, me.d, me.heure ? me.h : 12, me.heure ? me.mi : 0, me.lieu), lat:+me.lieu.lat, lon:+me.lieu.lon, heure:me.heure, system:"placidus"}) : C.chart({date:new Date(Date.UTC(2000, 0, 1, 12)), lat:48.857, lon:2.352, system:"placidus"});
      const up = () => { const dt = new Date(Date.now() + +R.value*864e5), sky = C.planets(dt), list = C.transits(nat, dt, "moderne").slice(0, 4);
        q1("[data-w]", fig).innerHTML = W().wheel(nat, {aspects:false, prefix:"pv", label:"Thème natal et planètes du ciel"}) ;
        const svgEl = q1("[data-w] svg", fig); if(svgEl){ let s = ""; ["jupiter","saturne","mars","soleil"].forEach(id => { const l = sky[id].lon, ref = nat.heure ? nat.asc : 0, A2 = (180 + l - ref)*rad, x = 306*Math.cos(A2), y = -306*Math.sin(A2);
            s += `<g transform="translate(${f1(x)} ${f1(y)})"><circle r="15" class="sc-tr"/><text text-anchor="middle" dominant-baseline="central" class="sc-trg">${PL[id].gl}${T}</text></g>`; }); svgEl.insertAdjacentHTML("beforeend", s); svgEl.setAttribute("viewBox", "-345 -345 690 690"); }
        q1("[data-o=d]", fig).textContent = +R.value ? fmtDay(dt) : "aujourd'hui";
        q1("[data-read]", fig).innerHTML = list.length ? list.map(x => `<b>${PL[x.t].court}</b> ${D.ASPECTS.find(a => a.id === x.asp).nom.toLowerCase()} ${PL[x.n] ? PL[x.n].court : x.n} natal`).join(" · ") : "Aucun transit serré à cette date."; };
      R.oninput = up; up(); },
    cap:`Au centre, un thème natal (le tien si tu l'as marqué comme tel, sinon celui du 1er janvier 2000) ; dehors, quatre planètes du ciel à la date choisie. Quand elles forment un aspect à une planète natale, c'est un transit.`};

  S.revolution = {html(){ return svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/>${zring(120, 150, {})}<circle r="92" class="sc-orbit"/><path d="M-92 0A92 92 0 1 1 -91.9 -6" class="sc-arrow"/>
        <g transform="translate(-92 0)"><circle r="14" class="sc-plbg good"/>${txt(0, 1, "☉" + T, "sc-plg")}</g>${txt(-20, 0, "Soleil natal", "sc-small")}${txt(0, 30, "≈ 365,25 jours", "sc-small")}`, "La révolution solaire"); },
    cap:"Chaque année, autour de l'anniversaire, le Soleil revient au degré exact qu'il occupait à la naissance. Le thème dressé pour cet instant décrit l'année qui s'ouvre."};

  S.progressions = {html(){ return svg("0 0 600 150", `<text x="20" y="22" class="sc-small" text-anchor="start">Jours après la naissance</text><line x1="20" y1="40" x2="580" y2="40" class="sc-line"/>
        <text x="20" y="128" class="sc-small" text-anchor="start">Années de vie</text><line x1="20" y1="110" x2="580" y2="110" class="sc-line"/>
        ${Array.from({length:10}, (_, i) => { const x = 20 + i*62; return `<line x1="${x}" y1="40" x2="${x}" y2="110" class="sc-faint"/><circle cx="${x}" cy="40" r="3" class="sc-dot"/><circle cx="${x}" cy="110" r="3" class="sc-dot"/><text x="${x}" y="56" class="sc-tick">${i*10}</text><text x="${x}" y="98" class="sc-tick">${i*10}</text>`; }).join("")}
        <line data-c x1="0" y1="40" x2="0" y2="110" class="sc-cursor"/>`, "Un jour pour un an") + slider("a", 0, 90, 30, 1, "Âge") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=a]", fig); const up = () => { const a = +R.value, x = f1(20 + a*6.2), c = q1("[data-c]", fig); c.setAttribute("x1", x); c.setAttribute("x2", x); q1("[data-o=a]", fig).textContent = a + " ans";
        q1("[data-read]", fig).innerHTML = `À ${a} ans, on regarde le ciel du <b>${a}<sup>e</sup> jour</b> après la naissance. La Lune y a avancé d'environ ${Math.round(a*13.2) % 360}° : elle change de signe tous les deux ans et demi.`; };
      R.oninput = up; up(); },
    cap:"Les progressions secondaires assimilent chaque jour qui suit la naissance à une année de vie."};

  S.profections = {html(){ return `<div class="sc-two">${svg("-160 -160 320 320", `${Array.from({length:12}, (_, i) => `<path d="${arc(i*30, i*30 + 30, 70, 150)}" class="sc-house" data-h="${i + 1}"/>`).join("")}
        ${Array.from({length:12}, (_, i) => { const [x, y] = xy(i*30 + 15, 110); return txt(x, y, ROM[i + 1], "sc-hn"); }).join("")}<text data-age class="sc-big" x="0" y="0" text-anchor="middle" dominant-baseline="central"></text>`, "Les profections annuelles")}<div class="sc-keys" data-txt></div></div>` + slider("a", 0, 96, 30, 1, "Âge"); },
    bind(fig){ const R = q1("[data-r=a]", fig); const up = () => { const a = +R.value, n = a % 12 + 1; qa("[data-h]", fig).forEach(p => p.classList.toggle("on", +p.dataset.h === n)); q1("[data-age]", fig).textContent = a; q1("[data-o=a]", fig).textContent = a + " ans";
        q1("[data-txt]", fig).innerHTML = `<p class="sc-k"><b>Maison ${ROM[n]}</b><em>${D.HOUSES[n - 1].nom}</em></p><p>À ${a} ans, l'Ascendant a avancé de ${a % 12} signe${a % 12 > 1 ? "s" : ""} : l'année active la maison ${ROM[n]}, et son maître devient le maître de l'année.</p>`; };
      R.oninput = up; up(); },
    cap:"Un signe par an : à 0 an la maison I, à 1 an la II, à 12 ans de nouveau la I, et ainsi de suite."};

  S.conjonctions = {html(){ return svg("-160 -160 320 320", `<circle r="150" class="sc-faint"/>${zring(124, 150, {})}<path data-p class="sc-poly"/><g data-d></g>`, "Les grandes conjonctions de Jupiter et Saturne") + slider("n", 1, 30, 10, 1, "Nombre de conjonctions") + `<p class="sc-read" data-read></p>`; },
    bind(fig){ const R = q1("[data-r=n]", fig); const up = () => { const n = +R.value, P = Array.from({length:n}, (_, i) => 300.3 + i*242.7);   // 2020 : 0° Verseau
        q1("[data-p]", fig).setAttribute("d", "M" + P.map(l => xy(l, 112).map(f1).join(" ")).join("L"));
        q1("[data-d]", fig).innerHTML = P.map((l, i) => { const [x, y] = xy(l, 112); return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${i === n - 1 ? 6 : 3.5}" class="sc-dot${i === n - 1 ? " on" : ""}"/>`; }).join("");
        q1("[data-o=n]", fig).textContent = n; const k = C.si(P[n - 1] % 360);
        q1("[data-read]", fig).innerHTML = `Vers ${2020 + Math.round((n - 1)*19.86)} : conjonction en <b>${SG[k].nom}</b>, signe ${SG[k].el === "air" ? "d'" : "de "}${SG[k].el}. Tous les vingt ans, le point avance d'un tiers de tour : les conjonctions restent environ deux siècles dans le même élément.`; };
      R.oninput = up; up(); },
    cap:"Jupiter et Saturne se rejoignent tous les vingt ans environ. Reliées, leurs conjonctions dessinent un triangle qui tourne lentement : le « trigone » de Kepler et d'Abu Ma'shar."};

  /* La place de chaque schéma dans le cours */
  const MAP = {
    "bases:0":"carte", "bases:1":"ecliptique", "bases:2":"retro", "bases:3":"ecoles",
    "planetes:0":"luminaires", "planetes:1":"elongation", "planetes:2":"cycles", "planetes:3":"lentes", "planetes:4":"secte", "planetes:5":"noeuds",
    "signes:0":"elements", "signes:1":"modes", "signes:2":"axes", "signes:3":"tour",
    "maisons:0":"angles", "maisons:1":"maisons", "maisons:2":"systemes", "maisons:3":"joies",
    "aspects:0":"aspects", "aspects:1":"orbes", "aspects:2":"configs",
    "dignites:0":"domiciles", "dignites:1":"exaltations", "dignites:2":"termes", "dignites:3":"receptions", "dignites:4":"fortune",
    "lire:0":"dominantes", "lire:1":"methode", "lire:2":"limites",
    "temps:0":"transits", "temps:1":"revolution", "temps:2":"progressions", "temps:3":"profections", "temps:4":"conjonctions"
  };
  return {
    get:(mod, i) => { const k = MAP[`${mod}:${i}`]; return k && S[k] ? {key:k, ...S[k]} : (k ? {key:k} : null); },
    render(mod, i, legacy){
      const s = this.get(mod, i); if(!s) return "";
      if(!s.html) return legacy && legacy[s.key] ? legacy[s.key]() : "";
      let inner = ""; try{ inner = s.html(); }catch(e){ console.warn("schéma", s.key, e); return ""; }
      return `<figure class="sc" data-sc="${s.key}">${inner}${s.cap ? `<figcaption class="sc-cap">${s.cap}</figcaption>` : ""}</figure>`;
    },
    bind(root){ qa("figure.sc[data-sc]", root).forEach(fig => { const s = S[fig.dataset.sc]; if(s && s.bind) try{ s.bind(fig); }catch(e){ console.warn("schéma", fig.dataset.sc, e); } }); },
    MAP, S
  };
})();

;
