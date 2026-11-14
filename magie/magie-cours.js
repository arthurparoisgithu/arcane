/* ===== Arcanes · Magie : le cours et l'histoire =====
   Huit modules de trois leçons. Chaque leçon : l'idée, une source datée avec son statut,
   un schéma à manipuler (clé « schema », dessiné par magie.js), un exercice facultatif, une question pour le carnet.
   Statuts : doc = documenté (on cite un texte ou un fait établi), trad = tradition (une pratique transmise),
   mod = lecture moderne (une interprétation ou une adaptation d'aujourd'hui). */
const MAGIE_COURS = (() => {
  const MODULES = [
  /* ---------------- 1 ---------------- */
  {id:"m1", n:"I", t:"Qu'est-ce que la magie ?", sous:"Trois siècles de définitions, et ce qu'elles ont en commun", img:"homme",
   lecons:[
    {id:"m1l1", t:"Trois définitions qui se répondent", sous:"Un anthropologue, un mage, une occultiste",
     idee:[
      "Il n'existe pas de définition de la magie sur laquelle tout le monde s'accorde. Ce qui existe, ce sont des définitions qui se répondent, et chacune éclaire une face de la chose.",
      "Pour l'anthropologue écossais James Frazer, dans <i>Le Rameau d'or</i> (1890), la magie repose sur deux lois de pensée. La <b>similitude</b> : le semblable produit le semblable, comme une figurine qu'on pique pour atteindre quelqu'un. La <b>contagion</b> : ce qui a été en contact reste lié, comme une mèche de cheveux. Frazer y voyait une science fausse.",
      "Pour Aleister Crowley, en 1929, c'est l'inverse : la magie est « la science et l'art de provoquer des changements conformément à la Volonté ». Tout acte voulu devient, en ce sens, un acte magique.",
      "Dion Fortune, occultiste anglaise, déplace encore la question : la magie serait l'art de provoquer des changements <b>dans la conscience</b>. On ne change pas le monde directement, on change celui qui le regarde, et qui agit ensuite autrement."],
     source:{txt:"La Magick est la science et l'art de provoquer des changements conformément à la Volonté.", ref:"Aleister Crowley, Magick in Theory and Practice, 1929 (traduction)", st:"doc"},
     schema:"defs",
     ex:{t:"Ta propre définition", txt:"En une phrase, écris ce que tu entends toi-même par « magie ». Tu la reliras à la fin du cours."},
     carnet:"Ma définition de la magie, aujourd'hui :"},
    {id:"m1l2", t:"Magie, religion, science", sous:"Une échelle, puis un partage des tâches",
     idee:[
      "Frazer rangeait l'histoire humaine sur une échelle : d'abord la magie, puis la religion, enfin la science. On ne pense plus ainsi. Ce modèle supposait que certains peuples étaient « en retard » sur d'autres, et les enquêtes de terrain l'ont démenti.",
      "Bronisław Malinowski, qui a vécu aux îles Trobriand pendant la Première Guerre mondiale, a observé autre chose : les pêcheurs de la lagune, où la pêche est sûre, ne faisaient pas de rites ; ceux de la haute mer, où l'on peut mourir, en faisaient beaucoup. La magie, concluait-il dans <i>Magie, science et religion</i> (1925), ne remplace pas la technique : elle prend le relais là où la technique ne garantit plus rien.",
      "Marcel Mauss et Henri Hubert, en 1902-1903, avaient proposé un autre critère : la religion est un culte public et organisé, la magie un rite privé, souvent secret, parfois mal vu. Le même geste peut être religieux dans une église et magique dans une chambre."],
     source:{txt:"Nous appelons ainsi tout rite qui ne fait pas partie d'un culte organisé, rite privé, secret, mystérieux et tendant comme limite vers le rite prohibé.", ref:"Marcel Mauss et Henri Hubert, Esquisse d'une théorie générale de la magie, 1902-1903", st:"doc"},
     schema:"echelle",
     ex:{t:"La haute mer", txt:"Pense à un domaine de ta vie où tu as tes petits rites (un objet fétiche, un geste avant un examen). Est-ce plutôt la lagune ou la haute mer ?"},
     carnet:"Mes petits rites du quotidien, et ce qu'ils me donnent :"},
    {id:"m1l3", t:"Les quatre outils de l'adepte", sous:"Intention, attention, symbole, rite",
     idee:[
      "Toutes les écoles modernes, de la Golden Dawn à la magie du chaos, s'appuient sur les mêmes quatre outils, même si elles les nomment autrement.",
      "<b>L'intention</b> : savoir ce qu'on veut, formulé clairement. <b>L'attention</b> : la capacité de rester concentré sur une image, un son, un geste, sans se disperser. <b>Le symbole</b> : le langage des correspondances, qui relie une couleur, un jour, une planète. <b>Le rite</b> : une forme répétable, avec un début et une fin, qui fait de l'ordinaire un moment à part.",
      "Le premier qui manque, c'est presque toujours l'attention. C'est pourquoi presque tous les manuels commencent par la respiration et la concentration, bien avant les cercles et les sceaux."],
     source:{txt:"Ce découpage en quatre outils est une synthèse moderne : on le retrouve, sous d'autres noms, chez Dion Fortune, chez Israel Regardie et dans les manuels de magie du chaos.", ref:"Synthèse d'Arcanes", st:"mod"},
     schema:"souffle",
     ex:{t:"La respiration en carré", txt:"Quatre temps pour inspirer, quatre pour retenir, quatre pour expirer, quatre pour rester vide. Huit cycles. C'est la base de tous les rituels de ce cours.", outil:"rituel:carre"},
     carnet:"Après la respiration en carré, mon attention était :"}
   ],
   quiz:[
    {q:"Selon Frazer, quelles sont les deux lois de la pensée magique ?", r:["La similitude et la contagion","La volonté et l'imagination","Le secret et l'interdit","Le haut et le bas"], ok:0, exp:"Le semblable produit le semblable ; ce qui a été en contact reste lié."},
    {q:"Qui définit la magie comme « la science et l'art de provoquer des changements conformément à la Volonté » ?", r:["Aleister Crowley","James Frazer","Marcel Mauss","Marsile Ficin"], ok:0, exp:"Crowley, dans Magick in Theory and Practice, en 1929."},
    {q:"Qu'a observé Malinowski chez les pêcheurs des îles Trobriand ?", r:["Les rites se concentrent là où la pêche est dangereuse","Ils n'avaient aucun rite","Les rites remplacent la technique","Seuls les prêtres pratiquaient la magie"], ok:0, exp:"La magie prend le relais là où la technique ne garantit plus rien : en haute mer, pas dans la lagune."},
    {q:"Pour Mauss et Hubert, qu'est-ce qui distingue la magie de la religion ?", r:["La magie est un rite privé, hors du culte organisé","La magie est toujours maléfique","La religion n'a pas de rites","La magie est plus ancienne"], ok:0, exp:"Le même geste peut être religieux dans un culte public et magique dans un cadre privé."},
    {q:"Quel outil manque le plus souvent aux débutants, selon les manuels ?", r:["L'attention","Le symbole","Le matériel","La chance"], ok:0, exp:"C'est pourquoi presque tous commencent par la respiration et la concentration."}
   ]},

  /* ---------------- 2 ---------------- */
  {id:"m2", n:"II", t:"La sympathie universelle", sous:"Un monde où tout se répond", img:"influences",
   lecons:[
    {id:"m2l1", t:"Ce qui est en bas est comme ce qui est en haut", sous:"Microcosme, macrocosme et les trois mondes",
     idee:[
      "La phrase la plus citée de l'hermétisme vient de la <i>Table d'émeraude</i>, un court texte attribué à Hermès Trismégiste. On le connaît par des versions arabes, puis par une traduction latine du XIIe siècle.",
      "L'idée : l'univers et l'être humain sont construits sur le même modèle. L'homme est un petit monde, un <b>microcosme</b>, qui reflète le grand, le <b>macrocosme</b>. Agrippa dessine ainsi l'homme inscrit dans un carré et dans un cercle, les membres tendus vers les points du monde.",
      "Agrippa va plus loin dans <i>La Philosophie occulte</i> (1533) : il y a trois mondes emboîtés. Le monde <b>élémentaire</b> (les choses, les plantes, les pierres), le monde <b>céleste</b> (les astres), le monde <b>intellectuel</b> (les anges, les idées, le divin). Chaque monde est gouverné par celui du dessus, et le mage remonte l'échelle."],
     source:{txt:"Ce qui est en bas est comme ce qui est en haut, et ce qui est en haut est comme ce qui est en bas, pour accomplir les miracles d'une seule chose.", ref:"Table d'émeraude, traduction latine du XIIe siècle", st:"doc"},
     schema:"mondes",
     ex:{t:"Le petit monde", txt:"Choisis une chose devant toi (une tasse, une plante). À quel monde appartient-elle ? Et qu'est-ce qui, dans le monde du dessus, pourrait lui correspondre ?"},
     carnet:"Une chose de mon quotidien, et ce qu'elle reflète en haut :"},
    {id:"m2l2", t:"Les signatures", sous:"Quand la forme dit la vertu",
     idee:[
      "À la Renaissance, beaucoup pensent que Dieu a « signé » les choses : leur forme indique leur usage. La noix, qui ressemble à un cerveau dans son crâne, soignerait la tête ; la pulmonaire, aux feuilles tachées comme un poumon, soignerait les poumons.",
      "Paracelse popularise l'idée au XVIe siècle ; Giambattista Della Porta en fait un livre entier, la <i>Phytognomonica</i> (1588), et Oswald Croll un traité, <i>Des signatures</i> (1609).",
      "La médecine moderne a abandonné la doctrine : la ressemblance ne dit rien de l'effet d'une plante. Mais elle montre bien la manière de penser de la magie : lire le monde comme un texte, où chaque forme est un mot."],
     source:{txt:"La doctrine des signatures est un fait d'histoire des idées ; elle n'a aucune valeur médicale. Ne te soigne jamais d'après elle.", ref:"Mise en garde d'Arcanes", st:"doc"},
     schema:"signatures",
     ex:{t:"Lire une forme", txt:"Promène-toi, regarde une plante ou un objet comme si sa forme était un mot. Qu'est-ce qu'il dirait ? C'est un exercice d'imagination, pas de médecine."},
     carnet:"Une forme que j'ai « lue » aujourd'hui :"},
    {id:"m2l3", t:"Les chaînes de correspondances", sous:"Du ciel à la pierre",
     idee:[
      "Pour les néoplatoniciens, chaque astre est la tête d'une <b>chaîne</b> qui descend jusqu'à nous : une planète, puis des dieux, des animaux, des plantes, des pierres. Le philosophe Proclus, au Ve siècle, raconte que l'héliotrope tourne avec le soleil et que, si l'on pouvait entendre le bruit de son mouvement, on y reconnaîtrait un hymne à son roi.",
      "Marsile Ficin reprend l'idée à Florence. Dans le troisième livre de <i>De vita</i> (1489), il conseille à ses lecteurs studieux, menacés par la mélancolie de Saturne, de s'entourer de choses solaires et joviennes : l'or, les couleurs claires, certaines plantes, la musique.",
      "C'est l'origine des grandes tables de correspondances, d'Agrippa jusqu'au <i>777</i> de Crowley (1909). Elles ne se contredisent pas qu'un peu : chaque auteur a ses choix. L'important est d'en adopter une et de s'y tenir."],
     source:{txt:"L'héliotrope se meut avec le soleil ; si l'on pouvait entendre le battement de l'air que produit son mouvement, on reconnaîtrait qu'il chante un hymne à son roi.", ref:"Proclus, Sur l'art hiératique, Ve siècle (paraphrase)", st:"doc"},
     schema:"chaine",
     ex:{t:"Ta chaîne", txt:"Choisis une planète dans le schéma, et trouve chez toi trois choses qui lui appartiennent : une couleur, un objet, une plante ou un aliment."},
     carnet:"La planète que j'ai choisie, et ses trois choses autour de moi :"}
   ],
   quiz:[
    {q:"De quel texte vient la phrase « ce qui est en bas est comme ce qui est en haut » ?", r:["La Table d'émeraude","Le Picatrix","Le Sefer Yetsirah","La Clavicule de Salomon"], ok:0, exp:"Un court texte hermétique, connu en Occident par une traduction latine du XIIe siècle."},
    {q:"Quels sont les trois mondes d'Agrippa ?", r:["Élémentaire, céleste, intellectuel","Terre, mer, ciel","Corps, âme, esprit","Passé, présent, avenir"], ok:0, exp:"Chaque monde est gouverné par celui du dessus."},
    {q:"Selon la doctrine des signatures, la noix soignerait…", r:["La tête","Le cœur","Les poumons","Le foie"], ok:0, exp:"Parce qu'elle ressemble à un cerveau. Une idée sans valeur médicale, mais révélatrice d'une manière de penser."},
    {q:"Quelle plante Proclus prend-il en exemple ?", r:["L'héliotrope","La rose","La mandragore","Le laurier"], ok:0, exp:"Elle suit le soleil, comme si elle lui chantait un hymne."},
    {q:"Pourquoi Ficin conseille-t-il de s'entourer d'or et de couleurs claires ?", r:["Pour contrer la mélancolie de Saturne","Pour devenir riche","Pour invoquer les anges","Pour soigner la fièvre"], ok:0, exp:"Dans De vita (1489), il s'adresse aux lettrés, que l'étude rend mélancoliques."}
   ]},

  /* ---------------- 3 ---------------- */
  {id:"m3", n:"III", t:"Les sept planètes", sous:"La semaine, les heures, les caractères", img:"necessite",
   lecons:[
    {id:"m3l1", t:"L'ordre chaldéen et la semaine", sous:"Pourquoi lundi suit dimanche",
     idee:[
      "Les Anciens rangeaient les sept astres errants de la plus lente à la plus rapide : Saturne, Jupiter, Mars, le Soleil, Vénus, Mercure, la Lune. C'est l'<b>ordre chaldéen</b>.",
      "Chaque heure du jour était confiée à une planète, dans cet ordre, en boucle. La planète de la première heure donnait son nom au jour. Or un jour compte 24 heures : en 24 pas, on avance de trois rangs dans la liste de sept. Après le jour de Saturne vient donc celui du Soleil, puis de la Lune, de Mars, de Mercure, de Jupiter et de Vénus.",
      "C'est exactement notre semaine : samedi (Saturne, <i>Saturday</i>), dimanche (le Soleil, <i>Sunday</i>), lundi (la Lune), mardi (Mars), mercredi (Mercure), jeudi (Jupiter), vendredi (Vénus). Tracé sur un cercle, ce saut de trois rangs dessine une étoile à sept branches : l'<b>heptagramme</b> de la semaine."],
     source:{txt:"Si l'on attribue chaque heure à une planète en commençant par Saturne, on trouve que la première heure du jour suivant revient au Soleil, et ainsi de suite.", ref:"Dion Cassius, Histoire romaine, livre XXXVII (paraphrase), IIIe siècle", st:"doc"},
     schema:"heptagramme",
     ex:{t:"Le saut de trois", txt:"Dans le schéma, fais avancer les heures une à une et regarde l'étoile se dessiner. Combien de jours faut-il pour revenir au point de départ ?"},
     carnet:"Le jour de la semaine que je préfère, et sa planète :"},
    {id:"m3l2", t:"Les heures planétaires", sous:"Des heures qui changent de longueur",
     idee:[
      "Les heures planétaires ne sont pas nos heures. On divise le temps entre le lever et le coucher du soleil en <b>douze heures de jour</b>, et la nuit en <b>douze heures de nuit</b>. En été, les heures de jour sont longues ; en hiver, elles sont courtes.",
      "La première heure après le lever du soleil appartient à la planète du jour : le samedi commence par une heure de Saturne, le dimanche par une heure du Soleil. Les suivantes suivent l'ordre chaldéen.",
      "Les grimoires, de l'<i>Heptameron</i> à la <i>Clavicule de Salomon</i>, demandent de faire chaque opération au jour et à l'heure de la planète qui lui convient. Arcanes calcule ces heures pour ton lieu, avec le lever et le coucher réels du soleil."],
     source:{txt:"L'Heptameron, attribué à Pierre d'Abano et imprimé au XVIe siècle, donne pour chaque jour son ange, sa planète et ses heures.", ref:"Heptameron, attribué à Pierre d'Abano, imprimé au XVIe siècle", st:"doc"},
     schema:"heures",
     ex:{t:"Remarquer l'heure", txt:"Aujourd'hui, à trois moments, regarde quelle planète gouverne l'heure. Est-ce que ce que tu fais à ce moment-là lui ressemble ?"},
     carnet:"Trois heures de ma journée et leurs planètes :"},
    {id:"m3l3", t:"Le caractère des planètes", sous:"Ce que chacune gouverne",
     idee:[
      "Chaque planète a ses domaines. Ils viennent de l'astrologie antique, du <i>Picatrix</i> et d'Agrippa, et ils ont peu changé en deux mille ans.",
      "Saturne tient ce qui dure, Jupiter élargit, Mars tranche, le Soleil éclaire, Vénus unit, Mercure relie, la Lune reflète et change. Chacune a aussi son ombre : l'excès de sa propre qualité.",
      "En magie, on choisit la planète d'après ce qu'on cherche : Vénus pour une réconciliation, Mercure pour un examen, Jupiter pour un projet qui doit grandir. Ce choix commande le jour, l'heure, la couleur, le métal et tout le reste."],
     source:{txt:"Les domaines des planètes suivent ici Agrippa, De occulta philosophia, livre I, chap. 22 à 29, et les listes du Picatrix.", ref:"Agrippa, 1533 ; Picatrix, version latine de 1256", st:"trad"},
     schema:"caracteres",
     ex:{t:"Ta planète du moment", txt:"Quel est ton souci principal en ce moment ? Quelle planète le gouverne ? Regarde son jour dans la semaine qui vient."},
     carnet:"Mon souci du moment, et la planète qui le gouverne :"}
   ],
   quiz:[
    {q:"Quel est l'ordre chaldéen ?", r:["Saturne, Jupiter, Mars, Soleil, Vénus, Mercure, Lune","Soleil, Lune, Mars, Mercure, Jupiter, Vénus, Saturne","Lune, Mercure, Vénus, Soleil, Mars, Jupiter, Saturne","Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Lune"], ok:0, exp:"De la plus lente à la plus rapide, vue de la Terre."},
    {q:"Pourquoi passe-t-on du jour de Saturne au jour du Soleil ?", r:["24 heures font avancer de trois rangs dans l'ordre chaldéen","Par décision d'un empereur","Parce que le Soleil est le plus important","Par hasard"], ok:0, exp:"24 = 3 × 7 + 3 : on saute trois planètes chaque jour, ce qui dessine l'heptagramme."},
    {q:"Combien y a-t-il d'heures planétaires de jour ?", r:["Douze, de longueur variable","Douze, d'une heure chacune","Vingt-quatre","Sept"], ok:0, exp:"Le temps entre le lever et le coucher du soleil divisé en douze."},
    {q:"Quelle planète gouverne la première heure d'un jeudi ?", r:["Jupiter","Le Soleil","Mercure","Saturne"], ok:0, exp:"La première heure appartient toujours à la planète du jour."},
    {q:"Pour une réconciliation, la tradition choisit plutôt…", r:["Vénus","Mars","Saturne","Mercure"], ok:0, exp:"Vénus unit : l'amour, l'amitié, la paix."}
   ]},

  /* ---------------- 4 ---------------- */
  {id:"m4", n:"IV", t:"Talismans et carrés magiques", sous:"Des nombres, un moment, une image", img:"tmercure",
   lecons:[
    {id:"m4l1", t:"Les carrés d'Agrippa", sous:"Sept tables de nombres",
     idee:[
      "Un carré magique est une grille où chaque ligne, chaque colonne et chaque diagonale donnent la même somme. Le plus ancien connu, le <i>Lo Shu</i> chinois, a trois cases de côté.",
      "Agrippa, au livre II de <i>La Philosophie occulte</i>, attribue un carré à chaque planète : trois cases de côté pour Saturne, quatre pour Jupiter, et ainsi de suite jusqu'à neuf pour la Lune. Ce sont les mêmes nombres que les sephiroth de l'Arbre de vie, de Binah (3) à Yesod (9).",
      "Le plus célèbre est peut-être celui de Jupiter, que Dürer a gravé dans <i>Melencolia I</i> en 1514. Les historiens Panofsky, Saxl et Klibansky y ont vu un remède jovien contre la mélancolie saturnienne. C'est une interprétation, mais elle est devenue classique."],
     source:{txt:"On dit que ces tables ont de grandes vertus, parce qu'en elles se trouve la raison des nombres célestes, et la mesure des proportions des choses d'en haut.", ref:"Agrippa, De occulta philosophia, livre II, chap. 22, 1533 (paraphrase)", st:"doc"},
     schema:"kamea",
     ex:{t:"Vérifier", txt:"Dans le schéma, touche une ligne, une colonne ou une diagonale du carré de Saturne. Toutes font 15. Essaie celui du Soleil : 111. Son total, 666, a une longue histoire."},
     carnet:"Le carré qui m'a le plus frappé, et pourquoi :"},
    {id:"m4l2", t:"Le talisman, une image faite au bon moment", sous:"Le Picatrix et l'art des élections",
     idee:[
      "Un talisman, dans la tradition arabe puis latine, est une image gravée ou dessinée <b>au moment où une planète est forte</b>, pour en recueillir la vertu. Le <i>Picatrix</i>, traité arabe traduit en latin en 1256 à la cour d'Alphonse X de Castille, en donne des dizaines de recettes.",
      "L'essentiel n'est pas l'image, mais le moment. C'est l'art des <b>élections</b> : on choisit le jour et l'heure de la planète, une Lune croissante, une planète bien placée dans le ciel (dans un signe où elle est « chez elle » ou honorée, et pas rétrograde).",
      "Marsile Ficin s'y intéresse avec prudence dans <i>De vita</i> : il préfère parler de musique, de couleurs et de parfums plutôt que d'images gravées, que l'Église regardait de travers."],
     source:{txt:"Le Picatrix enseigne que l'image doit être faite quand la planète est dans sa dignité, libre de l'influence des malfaisantes, et la Lune en bon état.", ref:"Picatrix, version latine (paraphrase), 1256", st:"doc"},
     schema:"election",
     ex:{t:"Trouver le moment", txt:"Dans le schéma, choisis une planète et regarde quand vient sa prochaine bonne fenêtre. Note-la, sans forcément rien faire : l'exercice est d'apprendre à lire le moment."},
     carnet:"La prochaine fenêtre de la planète que j'ai choisie :"},
    {id:"m4l3", t:"Tracer un sceau sur le carré", sous:"Un nom devient une ligne",
     idee:[
      "Sur chaque carré, Agrippa donne des « sceaux » et les signatures d'esprits planétaires. Plus tard, la Golden Dawn systématise une méthode : on convertit les lettres d'un nom en nombres, on repère ces nombres sur le carré, et on les relie d'un trait. On marque le départ d'un petit cercle et l'arrivée d'une barre.",
      "Agrippa et la Golden Dawn travaillaient avec l'alphabet hébreu, où chaque lettre est aussi un nombre. Arcanes propose une adaptation moderne avec l'alphabet latin : A vaut 1, B vaut 2… jusqu'à Z, 26. Quand un nombre dépasse la plus grande case du carré, on additionne ses chiffres.",
      "Le résultat est une ligne unique, qui ne ressemble plus au mot. C'est tout l'intérêt : on garde le sens, sans le dire."],
     source:{txt:"L'adaptation à l'alphabet latin est un choix d'Arcanes. La méthode de tracé suit la pratique de la Golden Dawn ; les sceaux d'Agrippa sont construits autrement.", ref:"Note d'Arcanes", st:"mod"},
     schema:"sceau",
     ex:{t:"Ton premier sceau", txt:"Écris un mot qui résume ce que tu souhaites (« patience », « courage »), choisis la planète qui lui correspond et regarde la ligne apparaître. Tu peux le garder dans ton carnet.", outil:"outil:sceau"},
     carnet:"Le mot que j'ai tracé, et sur quel carré :"}
   ],
   quiz:[
    {q:"Combien de cases de côté a le carré de Saturne ?", r:["Trois","Sept","Neuf","Six"], ok:0, exp:"Trois, comme le Lo Shu chinois ; chaque ligne fait 15."},
    {q:"Quelle est la somme d'une ligne du carré du Soleil ?", r:["111","34","15","369"], ok:0, exp:"Le carré de 6 × 6 donne 111 par ligne et 666 au total."},
    {q:"Quelle gravure de Dürer contient un carré magique ?", r:["Melencolia I","Le Chevalier, la Mort et le Diable","Saint Jérôme dans sa cellule","Adam et Ève"], ok:0, exp:"Un carré de 4 × 4, de type jovien, gravé en 1514."},
    {q:"Qu'est-ce qui compte le plus pour un talisman, selon le Picatrix ?", r:["Le moment où il est fait","La matière la plus chère","La taille de l'image","Le nombre de mots"], ok:0, exp:"On le fait quand la planète est forte : c'est l'art des élections."},
    {q:"Comment marque-t-on le début d'un sceau tracé sur un carré ?", r:["Par un petit cercle","Par une croix","Par une étoile","On ne le marque pas"], ok:0, exp:"Un cercle au départ, une barre à l'arrivée."}
   ]},

  /* ---------------- 5 ---------------- */
  {id:"m5", n:"V", t:"La Kabbale hermétique", sous:"L'Arbre de vie et ses sentiers", img:"ktitre",
   lecons:[
    {id:"m5l1", t:"De la Kabbale juive à la Kabbale hermétique", sous:"Trois emprunts successifs",
     idee:[
      "La Kabbale est d'abord une tradition mystique <b>juive</b>, toujours vivante. Ses textes fondateurs sont le <i>Sefer Yetsirah</i> (le Livre de la formation, d'une date discutée entre le IIe et le VIe siècle) et le <i>Zohar</i>, composé en Castille à la fin du XIIIe siècle, en grande partie par Moïse de León.",
      "À la Renaissance, des chrétiens s'en emparent. Pic de la Mirandole, en 1486, affirme qu'aucune science ne prouve mieux la divinité du Christ que « la magie et la kabbale ». Johannes Reuchlin publie <i>De arte cabalistica</i> en 1517. C'est la <b>Kabbale chrétienne</b>.",
      "Au XIXe siècle, Éliphas Lévi puis la Golden Dawn en font un système de classement universel, où l'on range les planètes, les signes, le tarot et les dieux de toutes les cultures. C'est la <b>Kabbale hermétique</b>, qu'on écrit souvent Qabalah pour la distinguer. Elle s'est beaucoup éloignée de sa source, et ce cours parle d'elle, pas de la Kabbale juive."],
     source:{txt:"Il n'est pas de science qui nous rende plus certains de la divinité du Christ que la magie et la kabbale.", ref:"Pic de la Mirandole, Conclusiones magicae, 9, 1486", st:"doc"},
     schema:"frise",
     ex:{t:"Trois strates", txt:"Retiens les trois strates : juive, chrétienne, hermétique. Quand tu lis un livre sur la Kabbale, demande-toi de laquelle il parle."},
     carnet:"Ce que je savais (ou croyais savoir) de la Kabbale avant cette leçon :"},
    {id:"m5l2", t:"L'Arbre de vie", sous:"Dix sphères, trois piliers",
     idee:[
      "Le <i>Sefer Yetsirah</i> commence ainsi : Dieu a créé le monde « par trente-deux voies merveilleuses de sagesse ». Ces 32 voies, ce sont les <b>dix sephiroth</b> (les sphères, ou les nombres) et les <b>vingt-deux lettres</b> de l'alphabet hébreu.",
      "Les dix sephiroth sont disposées sur trois piliers : à droite la Miséricorde, à gauche la Rigueur, au milieu l'Équilibre. On les lit de haut en bas comme la descente de la création, de Kether, la Couronne, jusqu'à Malkuth, le Royaume, notre monde. Ce chemin en zigzag s'appelle l'<b>Éclair</b>.",
      "La Golden Dawn attribue une planète à chacune, de Saturne en Binah jusqu'à la Lune en Yesod, et les numérote comme les carrés d'Agrippa. Le mage, lui, fait le trajet inverse : il remonte."],
     source:{txt:"Par trente-deux voies merveilleuses de sagesse, il a gravé et créé son monde.", ref:"Sefer Yetsirah, I, 1", st:"doc"},
     schema:"arbre",
     ex:{t:"L'Éclair", txt:"Dans le schéma, lance l'Éclair et suis la descente des dix sphères. Puis touche celle de la planète de ton jour de naissance."},
     carnet:"La sephira qui m'attire le plus, et pourquoi :"},
    {id:"m5l3", t:"Les 22 sentiers et le tarot", sous:"Un atout par lettre",
     idee:[
      "Les vingt-deux lettres de l'alphabet hébreu deviennent les vingt-deux <b>sentiers</b> qui relient les sephiroth. Elles se répartissent en trois <b>mères</b> (les éléments), sept <b>doubles</b> (les planètes) et douze <b>simples</b> (les signes).",
      "En 1856, Éliphas Lévi a l'idée d'associer les 22 atouts du tarot aux 22 lettres. La Golden Dawn reprend l'idée en 1888, mais change l'ordre : le Mat, numéro 0, va sur la première lettre, Aleph. La Force et la Justice échangent leurs numéros.",
      "Depuis, l'Arbre sert de carte pour méditer les lames : on « parcourt » un sentier en contemplant son atout, sa lettre et son astre. C'est le pont entre les trois sections d'Arcanes."],
     source:{txt:"Lévi place le Mat juste avant le Monde, sur la lettre Shin ; la Golden Dawn le place en tête, sur Aleph. Arcanes suit ici la Golden Dawn.", ref:"Éliphas Lévi, Dogme et rituel de la haute magie, 1856 ; Golden Dawn, 1888", st:"doc"},
     schema:"sentiers",
     ex:{t:"Parcourir un sentier", txt:"Choisis une lame du tarot que tu aimes, trouve son sentier sur l'Arbre, et regarde quelles sphères elle relie. Est-ce que ça change ta lecture ?"},
     carnet:"Ma lame, son sentier, et ce qu'il relie :"}
   ],
   quiz:[
    {q:"Où et quand le Zohar a-t-il été composé ?", r:["En Castille, à la fin du XIIIe siècle","À Jérusalem, au Ier siècle","À Florence, en 1486","À Londres, en 1888"], ok:0, exp:"En grande partie par Moïse de León."},
    {q:"Qui publie De arte cabalistica en 1517 ?", r:["Johannes Reuchlin","Éliphas Lévi","Marsile Ficin","John Dee"], ok:0, exp:"C'est l'un des textes fondateurs de la Kabbale chrétienne."},
    {q:"Combien de « voies de sagesse » cite le Sefer Yetsirah ?", r:["Trente-deux","Vingt-deux","Dix","Sept"], ok:0, exp:"Dix sephiroth et vingt-deux lettres."},
    {q:"Quelle sephira est attribuée au Soleil ?", r:["Tiphareth","Kether","Malkuth","Hod"], ok:0, exp:"Tiphareth, la Beauté, le cœur de l'Arbre."},
    {q:"Dans la Golden Dawn, sur quelle lettre se trouve le Mat ?", r:["Aleph","Shin","Tav","Beth"], ok:0, exp:"Sur la première lettre ; Lévi le plaçait sur Shin."}
   ]},

  /* ---------------- 6 ---------------- */
  {id:"m6", n:"VI", t:"Le rituel cérémoniel", sous:"Le cercle, le pentagramme, le pilier", img:"pentacles",
   lecons:[
    {id:"m6l1", t:"Le cercle et les quatre quartiers", sous:"Orienter un espace",
     idee:[
      "Dans les grimoires, de la <i>Clavicule de Salomon</i> au <i>Grand Grimoire</i>, l'opérateur trace un <b>cercle</b> autour de lui. C'est un espace à part, protégé, où le rite a lieu.",
      "La Golden Dawn l'oriente selon les quatre éléments : l'Air à l'est, le Feu au sud, l'Eau à l'ouest, la Terre au nord. Chaque quartier a son archange, son outil et sa suite du tarot : la dague et les Épées pour l'Air, la baguette et les Bâtons pour le Feu, la coupe et les Coupes pour l'Eau, le pentacle et les Deniers pour la Terre.",
      "Ces attributions ne sont pas universelles : beaucoup de wiccans, par exemple, associent la dague (l'athamé) au Feu et la baguette à l'Air, à l'inverse de la Golden Dawn. Ce qui compte, c'est la cohérence d'un système."],
     source:{txt:"Les attributions des quartiers suivent la Golden Dawn, telles que les a publiées Israel Regardie (The Golden Dawn, 1937-1940).", ref:"Golden Dawn, publié par Regardie", st:"trad"},
     schema:"boussole",
     ex:{t:"Trouver l'est", txt:"Chez toi, où est l'est ? Repère-le (le soleil se lève à peu près là). Tu en auras besoin pour le Pentagramme mineur."},
     carnet:"Le coin de chez moi qui pourrait servir de cercle :"},
    {id:"m6l2", t:"Le Pentagramme mineur", sous:"Le rituel de base de la Golden Dawn",
     idee:[
      "Le Rituel mineur du Pentagramme est le premier exercice qu'on enseignait aux nouveaux membres de la Golden Dawn. Il s'en sert pour « bannir » : faire place nette avant une opération, ou chasser les pensées parasites.",
      "Il se compose de trois parties : la <b>Croix kabbalistique</b> (on trace sur soi une croix de lumière en vibrant des mots hébreux), les <b>quatre pentagrammes</b> tracés aux quatre points cardinaux avec un nom divin chacun, puis l'<b>invocation des archanges</b>, avant une seconde Croix.",
      "Le sens dans lequel on trace le pentagramme compte : en partant du sommet vers le bas à gauche, on <b>invoque</b> ; en partant du bas à gauche vers le sommet, on <b>bannit</b>. Beaucoup de pratiquants le font chaque jour, comme une gymnastique de la concentration."],
     source:{txt:"Le rituel était transmis aux néophytes ; Israel Regardie l'a rendu public, avec l'essentiel des enseignements de l'ordre, entre 1937 et 1940.", ref:"Golden Dawn, 1888 ; publication par Regardie, 1937-1940", st:"trad"},
     schema:"pentagramme",
     ex:{t:"Le faire une fois", txt:"Suis le rituel guidé, étape par étape. Prends ton temps : les mots se vibrent lentement, sur une expiration, en les sentant résonner.", outil:"rituel:lbrp"},
     carnet:"Mon premier Pentagramme mineur : ce que j'ai ressenti, ce qui m'a gêné :"},
    {id:"m6l3", t:"Le Pilier du milieu", sous:"Faire descendre la lumière",
     idee:[
      "En 1938, Israel Regardie publie <i>The Middle Pillar</i>. Il y propose un exercice tiré de la Golden Dawn mais présenté comme une pratique psychologique, très influencée par Jung : la magie y devient un travail sur l'équilibre intérieur.",
      "On imagine les sephiroth du pilier central de l'Arbre de vie le long de son propre corps : au-dessus de la tête, à la gorge, au cœur, au bas-ventre, sous les pieds. On les allume une à une en vibrant leur nom divin, puis on fait circuler la lumière.",
      "C'est l'exemple même de la magie comme travail sur la conscience, au sens de Dion Fortune : rien ne bouge au-dehors, mais l'attention, la respiration et l'imagination sont entraînées ensemble."],
     source:{txt:"Regardie présente l'exercice comme une méthode d'intégration psychologique autant que comme un rite.", ref:"Israel Regardie, The Middle Pillar, 1938", st:"doc"},
     schema:"pilier",
     ex:{t:"Le Pilier, guidé", txt:"Dix minutes, assis. Si une visualisation ne vient pas, ne force pas : contente-toi de la respiration et des mots.", outil:"rituel:pilier"},
     carnet:"Le centre que j'ai senti le plus nettement, et celui qui m'a échappé :"}
   ],
   quiz:[
    {q:"À quel point cardinal la Golden Dawn place-t-elle l'Air ?", r:["L'est","Le sud","L'ouest","Le nord"], ok:0, exp:"Avec l'archange Raphaël et la dague."},
    {q:"Quel outil correspond à l'Eau ?", r:["La coupe","La baguette","La dague","Le pentacle"], ok:0, exp:"Et dans le tarot, les Coupes."},
    {q:"Par quoi commence le Pentagramme mineur ?", r:["La Croix kabbalistique","L'invocation des archanges","Un pentagramme au nord","Une prière à la Lune"], ok:0, exp:"Ateh, Malkuth, ve-Geburah, ve-Gedulah, le-Olam, Amen."},
    {q:"Pour bannir, d'où part-on pour tracer le pentagramme ?", r:["Du bas à gauche vers le sommet","Du sommet vers le bas à gauche","Du centre","De la droite"], ok:0, exp:"Le sens inverse sert à invoquer."},
    {q:"Qui publie The Middle Pillar en 1938 ?", r:["Israel Regardie","Aleister Crowley","Dion Fortune","Samuel Mathers"], ok:0, exp:"Un exercice de la Golden Dawn relu à la lumière de la psychologie de Jung."}
   ]},

  /* ---------------- 7 ---------------- */
  {id:"m7", n:"VII", t:"Sigils et magie du chaos", sous:"Spare, Carroll et la croyance comme outil", img:"sigil",
   lecons:[
    {id:"m7l1", t:"Austin Osman Spare", sous:"Un peintre et ses sigils",
     idee:[
      "Austin Osman Spare (1886-1956) est un dessinateur londonien, exposé très jeune, passé un temps par l'ordre de Crowley. Dans <i>The Book of Pleasure</i> (1913), il décrit une méthode simple pour fabriquer des <b>sigils</b>.",
      "On écrit un désir en une phrase. On barre les lettres qui se répètent. Avec celles qui restent, on compose un dessin, en les superposant, jusqu'à ce qu'on ne reconnaisse plus aucun mot. Puis on « charge » le sigil dans un état de concentration intense, et surtout, on <b>oublie</b> le désir.",
      "Pour Spare, le désir conscient bloque la réalisation : il faut le confier à la part de nous qui n'est pas la volonté raisonnable. Les psychologues parleraient d'inconscient, ou simplement d'intention mise de côté."],
     source:{txt:"Spare décrit sa méthode des sigils dans The Book of Pleasure (Self-Love), publié à compte d'auteur à Londres en 1913.", ref:"Austin Osman Spare, The Book of Pleasure, 1913", st:"doc"},
     schema:"spareetapes",
     ex:{t:"Regarder la méthode", txt:"Dans le schéma, suis une phrase d'exemple jusqu'au dessin. Remarque comme le sens disparaît à chaque étape."},
     carnet:"Ce que m'inspire l'idée d'« oublier » un désir pour qu'il se réalise :"},
    {id:"m7l2", t:"La magie du chaos", sous:"Quand la croyance devient un outil",
     idee:[
      "À la fin des années 1970, en Angleterre, Peter Carroll et Ray Sherwin fondent ce qu'on appelle la <b>magie du chaos</b>. Le livre de Carroll, <i>Liber Null</i> (1978), en est le texte de base.",
      "Leur idée : aucun système n'est « vrai ». Les dieux, les esprits, les correspondances fonctionnent comme des <b>outils</b>, qu'on prend et qu'on pose. On peut travailler un mois avec les dieux grecs et le mois suivant avec des personnages de roman, pour voir ce qui se passe. C'est le « changement de paradigme ».",
      "Ils reprennent de Spare la notion de <b>gnose</b> : un état de conscience altéré où l'on « lance » une intention. Carroll en distingue deux : la gnose calme (méditation, vide, immobilité) et la gnose excitée (danse, chant, épuisement). Dans un cours, on s'en tient à la première."],
     source:{txt:"Carroll pose la croyance comme un outil plutôt que comme une vérité, et l'état de gnose comme la condition de l'efficacité magique.", ref:"Peter J. Carroll, Liber Null, 1978 (résumé)", st:"doc"},
     schema:"gnose",
     ex:{t:"Une semaine, un paradigme", txt:"Pendant une semaine, regarde le monde comme si les planètes gouvernaient vraiment les heures. Note ce qui change dans ton attention. Puis arrête, et note aussi ce qui reste."},
     carnet:"Un système de croyances que j'aimerais essayer comme un outil :"},
    {id:"m7l3", t:"Fabriquer un sigil", sous:"De la phrase au signe",
     idee:[
      "Une bonne phrase est au <b>présent</b> et à l'<b>affirmatif</b> : « je suis calme le jour de l'examen » plutôt que « je ne veux pas stresser ». Elle vise un état ou une action qui dépend de toi.",
      "Spare barrait seulement les lettres répétées. Beaucoup de pratiquants d'aujourd'hui enlèvent aussi les voyelles, pour aller plus vite. Ensuite, on superpose les lettres qui restent, on simplifie, on arrondit, jusqu'à obtenir un signe qui te plaît.",
      "On le regarde dans un moment de calme profond, quelques secondes, puis on le range, et on passe à autre chose. Le carnet permet de le cacher, et d'y revenir plus tard pour voir ce qui s'est passé."],
     source:{txt:"Retirer aussi les voyelles est une habitude moderne ; Spare, lui, ne barrait que les lettres répétées.", ref:"Pratique de la magie du chaos, depuis les années 1980", st:"mod"},
     schema:"spare",
     ex:{t:"Ton sigil", txt:"Écris ta phrase dans l'atelier et compose ton signe. Ne pense plus à la phrase après l'avoir chargé : c'est la règle du jeu.", outil:"outil:sigil"},
     carnet:"J'ai fait un sigil aujourd'hui. Je l'ai chargé ainsi :"}
   ],
   quiz:[
    {q:"Dans quel livre Spare décrit-il sa méthode des sigils ?", r:["The Book of Pleasure","Liber Null","The Middle Pillar","777"], ok:0, exp:"Publié à compte d'auteur à Londres en 1913."},
    {q:"Dans la méthode de Spare, que barre-t-on ?", r:["Les lettres qui se répètent","Toutes les consonnes","Les mots négatifs","Rien"], ok:0, exp:"Retirer les voyelles est une habitude plus récente."},
    {q:"Qu'est-ce qu'un « changement de paradigme » en magie du chaos ?", r:["Adopter un système de croyance comme un outil, puis en changer","Changer de maître","Passer de la magie blanche à la magie noire","Renoncer à la magie"], ok:0, exp:"Aucun système n'est vrai ; chacun est un outil."},
    {q:"Qui a écrit Liber Null ?", r:["Peter Carroll","Austin Spare","Aleister Crowley","Israel Regardie"], ok:0, exp:"En 1978 ; c'est le texte de base de la magie du chaos."},
    {q:"Quelle est la forme recommandée pour la phrase d'un sigil ?", r:["Au présent et à l'affirmatif","Au futur et au négatif","Sous forme de question","En latin"], ok:0, exp:"« Je suis calme » plutôt que « je ne veux pas stresser »."}
   ]},

  /* ---------------- 8 ---------------- */
  {id:"m8", n:"VIII", t:"Éthique et psychologie de la pratique", sous:"Le carnet, les études, les limites", img:"hibou",
   lecons:[
    {id:"m8l1", t:"Le carnet", sous:"L'outil le plus sous-estimé",
     idee:[
      "Presque tous les magiciens sérieux ont tenu un journal. John Dee consignait ses séances avec Edward Kelley dans les années 1580 ; Crowley exigeait de ses élèves un « registre magique » quotidien, daté, précis, honnête.",
      "Le carnet sert à trois choses. <b>Se souvenir</b> : ce qu'on a fait, quand, dans quel état. <b>Comparer</b> : ce qui marche pour soi, et ce qui ne marche pas. <b>Garder les pieds sur terre</b> : relire six mois plus tard une prédiction qui ne s'est pas réalisée vaut toutes les leçons.",
      "Arcanes remplit pour toi la date, l'heure planétaire et la phase de la Lune. À toi d'écrire l'intention, le déroulé et ce que tu as ressenti, y compris « rien »."],
     source:{txt:"Crowley demande d'inscrire chaque exercice, avec l'heure, les conditions et les résultats, et de le faire sans s'épargner.", ref:"Aleister Crowley, Liber E vel Exercitiorum, 1909 (paraphrase)", st:"doc"},
     schema:"carnetmodele",
     ex:{t:"Ta première page", txt:"Ouvre le carnet et écris ta première entrée : ce que tu attends de ce cours.", outil:"carnet"},
     carnet:"Ce que j'attends de ce cours :"},
    {id:"m8l2", t:"Ce que dit la psychologie", sous:"Des effets mesurés, et des pièges connus",
     idee:[
      "La psychologie expérimentale s'est intéressée aux rituels. Elle trouve des <b>effets réels sur celui qui les fait</b> : en 2016, une équipe de Harvard (Alison Wood Brooks et ses collègues) a montré qu'un rituel fait avant de chanter en public ou de passer un test réduisait l'anxiété et améliorait la performance. En 2014, Michael Norton et Francesca Gino ont montré que des rituels aidaient à traverser un deuil.",
      "Elle connaît aussi des pièges. L'<b>illusion de contrôle</b> (Ellen Langer, 1975) : on se croit plus d'influence sur le hasard qu'on n'en a. Le <b>biais de confirmation</b> : on retient ce qui a marché et on oublie le reste. L'effet <b>Barnum</b> (Bertram Forer, 1949) : une description vague semble faite pour soi.",
      "Ces études ne disent rien de l'effet d'un rite sur le monde extérieur. Elles disent qu'un rite agit sur toi. C'est déjà beaucoup, et c'est aussi la raison du carnet."],
     source:{txt:"Brooks et al., « Don't stop believing: Rituals improve performance by decreasing anxiety », 2016 ; Norton et Gino, 2014 ; Langer, 1975 ; Forer, 1949.", ref:"Études de psychologie expérimentale", st:"doc"},
     schema:"etudes",
     ex:{t:"Le contre-carnet", txt:"La prochaine fois que quelque chose « marche », cherche aussi trois fois où rien ne s'est passé. Note les deux."},
     carnet:"Une fois où j'ai cru à une coïncidence, et ce que j'en pense aujourd'hui :"},
    {id:"m8l3", t:"Discernement et limites", sous:"Ce que la pratique ne doit pas devenir",
     idee:[
      "Une pratique saine te laisse <b>plus libre</b> : plus calme, plus attentif, plus présent aux autres. Si elle t'angoisse, t'empêche de dormir, t'isole, ou si tu n'oses plus rien décider sans un signe, c'est le moment de faire une pause et d'en parler à quelqu'un de confiance.",
      "La magie ne remplace jamais un soin, un médecin, un psychologue, un avocat. Méfie-toi de quiconque promet, contre de l'argent, de lever un « envoûtement » ou de faire revenir un être aimé : en France, la Miviludes met régulièrement en garde contre ces promesses.",
      "Enfin, on ne travaille que sur <b>soi</b> et sur ce qui dépend de soi. Agir sur quelqu'un sans son accord, même avec de bonnes intentions, n'a pas sa place dans ce cours. La gravure de Khunrath le dit à sa manière : à quoi bon des torches et des lunettes, si l'on ne veut pas voir ?"],
     source:{txt:"À quoi servent torches, lumière et lunettes, si les gens ne veulent pas voir ?", ref:"Heinrich Khunrath, légende de la gravure de la chouette, vers 1600", st:"doc"},
     schema:"signaux",
     ex:{t:"Faire le point", txt:"Coche honnêtement les signaux du schéma. S'il y en a deux ou plus, mets la pratique de côté quelques jours, et parles-en."},
     carnet:"Ce que la pratique m'apporte, et ce que je ne veux pas qu'elle devienne :"}
   ],
   quiz:[
    {q:"Quel magicien exigeait de ses élèves un « registre magique » quotidien ?", r:["Aleister Crowley","Austin Spare","Marsile Ficin","Pic de la Mirandole"], ok:0, exp:"Daté, précis, honnête, y compris quand rien ne se passe."},
    {q:"Qu'a montré l'étude de Brooks et ses collègues (2016) ?", r:["Un rituel réduit l'anxiété et améliore la performance","Les rituels n'ont aucun effet","Les rituels changent la météo","Les rituels rendent superstitieux"], ok:0, exp:"Un effet réel sur celui qui fait le rite, pas sur le monde."},
    {q:"Qu'est-ce que l'illusion de contrôle ?", r:["Se croire plus d'influence sur le hasard qu'on n'en a","Contrôler ses émotions","Un rituel de protection","La peur de perdre le contrôle"], ok:0, exp:"Décrite par Ellen Langer en 1975."},
    {q:"Quel signal invite à faire une pause dans la pratique ?", r:["Elle t'empêche de dormir ou t'isole","Elle te rend plus calme","Tu tiens ton carnet","Tu as appris les correspondances"], ok:0, exp:"Une pratique saine te laisse plus libre."},
    {q:"Que dit la légende de la chouette de Khunrath ?", r:["À quoi bon des torches et des lunettes si l'on ne veut pas voir ?","Le savoir est un trésor caché","La nuit est la mère de la sagesse","Il faut tout croire"], ok:0, exp:"Une gravure d'Heinrich Khunrath, vers 1600."}
   ]}
  ];

  /* ---------------- l'histoire ---------------- */
  const HISTOIRE = [
    {id:"h1", n:"I", t:"Les papyrus et les philosophes", per:"IIe s. av. J.-C. – VIe s.", img:"",
     lead:"La magie savante de l'Occident naît dans l'Égypte grecque et romaine, entre recettes de praticiens et spéculations de philosophes.",
     p:["Les <b>papyrus grecs magiques</b>, retrouvés en Égypte et datés du IIe siècle avant notre ère au Ve siècle, sont des carnets de praticiens : formules d'amour, de protection, de divination, invocations où se mêlent dieux égyptiens, grecs et juifs. Ce sont nos plus anciens « grimoires ».",
        "En même temps circulent les textes attribués à <b>Hermès Trismégiste</b>, « trois fois grand », un sage mythique qui mêle Thot et Hermès. Le <i>Corpus hermeticum</i>, écrit en grec aux IIe et IIIe siècles, enseigne que l'homme peut remonter vers le divin par la connaissance.",
        "Les néoplatoniciens vont plus loin. <b>Jamblique</b>, au IVe siècle, défend la <i>théurgie</i>, littéralement « l'œuvre divine » : des rites qui élèvent l'âme. <b>Proclus</b>, au Ve siècle, décrit les chaînes de sympathie qui relient chaque astre à ses plantes et à ses pierres."],
     gens:[["Hermès Trismégiste","Un auteur mythique, à qui l'on a prêté des dizaines de traités pendant plus de mille ans."],["Jamblique (vers 245 – vers 325)","Philosophe syrien, il fait de la théurgie le sommet de la vie philosophique."]]},
    {id:"h2", n:"II", t:"Le Moyen Âge : le Picatrix et les clavicules", per:"Xe – XVe s.", img:"",
     lead:"Par l'Espagne arrivent les savoirs arabes ; dans les marges des bibliothèques naissent les grimoires.",
     p:["Le <b>Picatrix</b>, en arabe <i>Ghayat al-Hakim</i>, « le but du sage », est composé en al-Andalus vers le XIe siècle. Traduit en espagnol puis en latin à la cour d'Alphonse X de Castille en 1256, il devient le grand manuel de la magie astrale : talismans, parfums, prières aux planètes.",
        "Les clercs distinguent une <b>magie naturelle</b>, qui utilise les vertus cachées des choses et peut être licite, et une <b>nécromancie</b>, qui traite avec les démons. Le <i>Speculum astronomiae</i>, vers 1260, longtemps attribué à Albert le Grand, trie les livres « permis » et « défendus ».",
        "Circulent aussi des manuscrits attribués au roi Salomon, dont la <b>Clavicule de Salomon</b> (XIVe-XVe siècles), et le <i>Livre juré d'Honorius</i>. En 1398, la faculté de théologie de Paris condamne vingt-huit propositions sur la magie."],
     gens:[["Alphonse X de Castille (1221-1284)","Le roi « savant », qui fait traduire des dizaines de traités arabes d'astronomie et de magie."]]},
    {id:"h3", n:"III", t:"La Renaissance : les mages philosophes", per:"1460 – 1550", img:"p_agrippa",
     lead:"À Florence, la magie devient une philosophie ; en Allemagne, elle devient un système.",
     p:["En 1463, Cosme de Médicis demande à <b>Marsile Ficin</b> d'interrompre sa traduction de Platon pour traduire d'urgence un manuscrit qu'on vient de lui apporter : le <i>Corpus hermeticum</i>. On croit alors Hermès plus ancien que Moïse. En 1489, Ficin publie <i>De vita</i>, dont le troisième livre enseigne à « capter la vie du ciel ».",
        "En 1486, <b>Pic de la Mirandole</b>, vingt-trois ans, propose de débattre de 900 thèses, dont des thèses magiques et kabbalistiques. Une commission pontificale en juge treize suspectes, puis le pape interdit le tout. Le moine <b>Trithème</b> écrit la <i>Stéganographie</i>, un traité de cryptographie déguisé en invocation d'anges.",
        "Son élève, <b>Henri Corneille Agrippa</b>, rassemble tout dans les trois livres de <i>La Philosophie occulte</i>, écrits vers 1510 et imprimés en 1531-1533 : magie naturelle, céleste et cérémonielle. Le livre servira de référence pendant quatre siècles."],
     gens:[["Marsile Ficin (1433-1499)","Médecin et prêtre, traducteur de Platon et d'Hermès, il fonde la magie astrale de la Renaissance."],["Agrippa (1486-1535)","Médecin, soldat, juriste, il rédige l'encyclopédie de la magie occidentale, puis écrit un livre sur la vanité des sciences."]]},
    {id:"h4", n:"IV", t:"Les mages élisabéthains et la Rose-Croix", per:"1560 – 1650", img:"p_dee",
     lead:"Entre science naissante et quête des anges, les derniers grands mages savants.",
     p:["<b>John Dee</b>, mathématicien et conseiller d'Élisabeth Ire, publie en 1564 la <i>Monas hieroglyphica</i>, un symbole unique censé résumer le cosmos. Dans les années 1580, avec le voyant Edward Kelley, il consigne des conversations avec des anges, qui leur dictent une langue : l'<b>énochien</b>.",
        "<b>Heinrich Khunrath</b> publie l'<i>Amphithéâtre de la sagesse éternelle</i> (1595, puis 1609), dont la gravure du laboratoire-oratoire, où l'alchimiste prie à côté de ses fourneaux, est devenue l'image même de l'Œuvre.",
        "Entre 1614 et 1616 paraissent en Allemagne des <b>manifestes rosicruciens</b> annonçant une fraternité secrète de sages. Personne ne l'a jamais trouvée, mais des centaines de lecteurs se réclament d'elle. <b>Robert Fludd</b>, médecin à Londres, la défend dans d'immenses volumes illustrés."],
     gens:[["John Dee (1527-1609)","Mathématicien, astrologue de la reine, il passe la fin de sa vie à parler aux anges et meurt pauvre."],["Robert Fludd (1574-1637)","Ses gravures du macrocosme et du microcosme comptent parmi les plus belles de l'ésotérisme."],["Heinrich Khunrath (vers 1560-1605)","Médecin et alchimiste, il veut réconcilier la prière et le laboratoire."]]},
    {id:"h5", n:"V", t:"Bûchers et grimoires de colportage", per:"1560 – 1800", img:"grimoire",
     lead:"La magie savante se cache ; la magie populaire se vend au coin de la rue.",
     p:["La grande <b>chasse aux sorcières</b> culmine en Europe entre 1560 et 1630. Les historiens estiment le nombre d'exécutions à environ 40 000 à 60 000, surtout des femmes, surtout dans le Saint-Empire. Les accusées n'avaient pour la plupart rien d'occultistes.",
        "En France, l'<b>affaire des Poisons</b> (1679-1682) éclabousse la cour de Louis XIV. L'édit de 1682 qui suit traite désormais la sorcellerie comme une <b>imposture</b> : on punit l'escroquerie et l'empoisonnement, plus le pacte avec le diable.",
        "Au XVIIIe siècle, les colporteurs de la Bibliothèque bleue de Troyes vendent des <b>grimoires populaires</b> à quelques sous : le <i>Petit Albert</i>, le <i>Grand Grimoire</i>, le <i>Dragon rouge</i>. Recettes de bergers, conjurations, secrets pour trouver des trésors : la magie des campagnes."],
     gens:[["Le Petit Albert","Faussement attribué à Albert le Grand, il mêle recettes domestiques, remèdes et talismans."]]},
    {id:"h6", n:"VI", t:"Le XIXe siècle : Lévi et la Golden Dawn", per:"1801 – 1900", img:"",
     lead:"Le romantisme réinvente l'occultisme, et l'Angleterre victorienne l'organise en ordre initiatique.",
     p:["En 1801, l'Anglais Francis Barrett publie <i>The Magus</i>, compilation d'Agrippa qui remet la magie cérémonielle en circulation. À Paris, l'abbé défroqué Alphonse-Louis Constant, devenu <b>Éliphas Lévi</b>, publie <i>Dogme et rituel de la haute magie</i> (1854-1856). C'est lui qui relie le tarot à la Kabbale.",
        "En 1888, trois francs-maçons londoniens, William Wynn Westcott, Samuel Liddell MacGregor Mathers et William Robert Woodman, fondent l'<b>Hermetic Order of the Golden Dawn</b>. Grades, rituels, correspondances : ils construisent le système dont s'inspirent presque toutes les écoles de magie occidentale actuelles.",
        "Le poète W. B. Yeats en est membre. L'ordre éclate dès 1900 en querelles de personnes, mais ses enseignements survivront."],
     gens:[["Éliphas Lévi (1810-1875)","Il invente le mot et l'image de l'occultisme moderne, du Baphomet au pentagramme de l'homme."],["Samuel Mathers (1854-1918)","Traducteur de la Clavicule de Salomon, il écrit l'essentiel des rituels de la Golden Dawn."]]},
    {id:"h7", n:"VII", t:"Le XXe siècle : Crowley, Fortune, Regardie", per:"1900 – 1960", img:"",
     lead:"La magie se publie, se psychologise et devient religion pour certains.",
     p:["<b>Aleister Crowley</b>, passé par la Golden Dawn, annonce en 1904 une nouvelle ère, <i>Thelema</i>, et fonde l'A∴A∴ en 1907. Provocateur, il publie tout ce qu'on lui a appris sous le sceau du secret, et rédige <i>777</i>, le grand tableau des correspondances.",
        "<b>Dion Fortune</b> fonde la Society of the Inner Light et publie <i>La Kabbale mystique</i> (1935), restée l'introduction la plus lue à l'Arbre de vie. <b>Israel Regardie</b>, ancien secrétaire de Crowley, publie entre 1937 et 1940 les rituels de la Golden Dawn.",
        "Austin Osman Spare invente ses sigils dans son coin ; Gerald Gardner, en 1954, lance la Wicca. La magie cesse d'être un secret."],
     gens:[["Aleister Crowley (1875-1947)","Alpiniste, poète, mage, scandale permanent ; son influence dépasse largement le petit monde de l'occultisme."],["Dion Fortune (1890-1946)","Psychothérapeute de formation, elle relie la magie à la psychologie de son temps."]]},
    {id:"h8", n:"VIII", t:"Aujourd'hui : le chaos et l'université", per:"1970 – aujourd'hui", img:"",
     lead:"Une pratique éclatée, et pour la première fois des chercheurs pour l'étudier.",
     p:["À partir de 1976-1978, la <b>magie du chaos</b> de Peter Carroll et Ray Sherwin fait de la croyance un outil. Elle influence la culture pop, de la bande dessinée aux jeux vidéo. Le néopaganisme et la Wicca se répandent, puis les réseaux sociaux donnent à la sorcellerie une visibilité inédite.",
        "Dans le même temps, l'<b>ésotérisme occidental</b> devient une discipline universitaire. Antoine Faivre l'enseigne à l'École pratique des hautes études, à Paris, à partir de 1979 ; Wouter Hanegraaff ouvre une chaire à Amsterdam en 1999.",
        "Faivre propose de reconnaître l'ésotérisme à quelques traits : la pensée des <b>correspondances</b>, une <b>nature vivante</b>, le rôle de l'<b>imagination</b> et des intermédiaires, la recherche d'une <b>transmutation</b> de soi. Ce sont, à peu de chose près, les modules de ce cours."],
     gens:[["Antoine Faivre (1934-2021)","Le premier à faire de l'ésotérisme occidental un objet d'histoire, ni pour ni contre."]]}
  ];

  /* ---------------- les petits jeux des schémas ---------------- */
  const SIGNATURES = [
    {chose:"La noix", forme:"un cerveau dans son crâne", organe:"la tête"},
    {chose:"La pulmonaire", forme:"des feuilles tachées comme un poumon", organe:"les poumons"},
    {chose:"L'euphraise", forme:"une fleur qui ressemble à un œil", organe:"les yeux"},
    {chose:"Le haricot", forme:"la forme d'un rein", organe:"les reins"}
  ];
  const SIGNAUX = [
    "La pratique m'empêche de dormir ou me réveille la nuit.",
    "J'ai peur de ce qui arrivera si je ne fais pas mon rituel.",
    "Je n'ose plus prendre une décision sans un signe ou un tirage.",
    "Je m'isole de mes proches à cause de la pratique.",
    "J'ai dépensé de l'argent que je n'avais pas pour du matériel ou une consultation.",
    "J'entends ou je vois des choses qui m'inquiètent en dehors de la pratique."
  ];

  return {MODULES, HISTOIRE, SIGNATURES, SIGNAUX};
})();
