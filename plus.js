/* ===== Arcanes · Crédits et sources =====
   Une seule page, ouverte depuis le pied de page, au lieu d'un long paragraphe sous chaque écran. */
(() => {
  const SECTIONS = [
 [
  "À savoir",
  [
   "Le tarot est proposé ici comme un outil de réflexion et de divertissement. Il ne remplace pas l'avis d'un médecin, d'un juriste ou d'un conseiller financier.",
   "L'astrologie est proposée comme un langage symbolique et un patrimoine culturel, pour réfléchir et apprendre. Textes originaux. Tout est calculé et gardé sur ton appareil."
  ]
 ],
 [
  "Les lames",
  [
   "Lames : Tarot de Marseille de Nicolas Conver (1760), réédition Reality Publishing (2020), photographies <a href=\"https://commons.wikimedia.org/wiki/Category:Tarot_de_Marseille_-_Nicolas_Conver_1760\" target=\"_blank\" rel=\"noopener\">Tarot World Project via Wikimedia Commons</a>, licence <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY-SA 4.0</a>, recadrées et redimensionnées.",
   "Jeu Waite-Smith jouable (78 cartes) : dessins de Pamela Colman Smith pour l'édition Rider de 1909, domaine public, scans d'un jeu original restaurés par Steve P. ; Tarot Sola Busca (vers 1491, Pinacothèque de Brera), domaine public, via Wikimedia Commons ; arcanes mineurs du Marseille : jeu de type Marseille de Lequart (Paris, XIXe siècle), domaine public, via Wikimedia Commons ; « Rider-Waite » est une marque de U.S. Games Systems, sans lien avec Arcanes, qui n'utilise que les dessins originaux de 1909."
  ]
 ],
 [
  "La section Histoire du tarot",
  [
   "Jeux historiques de la section Histoire (Visconti-Sforza, Sola Busca, Viéville, Etteilla, Wirth, Tarot Nouveau, Waite-Smith 1909) : domaine public, d'après les numérisations de la BnF (Gallica), de Wikimedia Commons, de David Madore et de Steve P., réunies par le projet <a href=\"https://github.com/mixvlad/TarotCards\" target=\"_blank\" rel=\"noopener\">TarotCards</a>.",
   "Autres images de la section Histoire (jeu mamelouk, tarot dit de Charles VI, jeu Cary-Yale, feuille Rosenwald, Dodal, Besançon, planches de Court de Gébelin, gravures et portraits) : domaine public via <a href=\"https://commons.wikimedia.org\" target=\"_blank\" rel=\"noopener\">Wikimedia Commons</a>, sauf trois photographies : Oswald Wirth (licence <a href=\"https://creativecommons.org/licenses/by-sa/3.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY-SA 3.0</a>), Michael Dummett par Klaus Reisinger (licence <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY-SA 4.0</a>) et Alejandro Jodorowsky (CC0)."
  ]
 ],
 [
  "Le tarot dans la culture",
  [
   "Rubrique « Le tarot dans la culture » : affiche de Carmen (1875), page 13 de l'édition originale de <i>The Waste Land</i> de T. S. Eliot (New York, Boni and Liveright, 1922 ; domaine public aux États-Unis, numérisation Internet Archive), portraits de Charles Williams par Anne Spalding et de Salvador Dalí par Carl Van Vechten (1939), domaine public ; Hirohiko Araki (monoprixgourmet) et Stephen King (Pinguino Kolb), CC BY 2.0 ; Moebius (Jarek Obważanek) et Agnès Varda (Martin Kraft), CC BY-SA 4.0 ; Alan Moore (Mirka), CC BY-SA 3.0 ; via Wikimedia Commons."
  ]
 ],
 [
  "La carte des symboles",
  [
   "Gravures : Michael Maier, <i>Atalanta fugiens</i> (1617), gravées par Matthäus Merian, domaine public."
  ]
 ],
 [
  "L'astrologie",
  [
   "Positions des astres calculées sur l'appareil avec <a href=\"https://github.com/cosinekitty/astronomy\" target=\"_blank\" rel=\"noopener\">Astronomy Engine</a> de Don Cross, licence MIT.",
   "Lieux de naissance : <a href=\"https://www.geonames.org\" target=\"_blank\" rel=\"noopener\">GeoNames</a>, licence CC BY 4.0 (communes de France et d'outre-mer, villes du monde) ; recherche en ligne de secours : <a href=\"https://open-meteo.com/en/docs/geocoding-api\" target=\"_blank\" rel=\"noopener\">géocodage d'Open-Meteo</a> (données GeoNames).",
   "Cartes des signes : Sidney Hall, <a href=\"https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania's_Mirror_-_Aries_and_Musca_Borealis.jpg\" target=\"_blank\" rel=\"noopener\"><i>Urania's Mirror</i></a> (Londres, 1824), domaine public, d'après les numérisations de la Bibliothèque du Congrès restaurées par Adam Cuerden, via Wikimedia Commons.",
   "Planètes : série gravée de 1539 « Les sept planètes et leurs signes », <a href=\"https://commons.wikimedia.org/wiki/File:Saturnus_met_sterrenbeelden_Steenbok_en_Waterman_Sattvrnvs_(titel_op_object)_Zeven_planeten_en_sterrenbeelden_(serietitel),_RP-P-OB-10.827.jpg\" target=\"_blank\" rel=\"noopener\">Rijksmuseum, Amsterdam</a>, <a href=\"https://creativecommons.org/publicdomain/zero/1.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC0</a>.",
   "Neptune et Pluton : Gian Giacomo Caraglio, d'après Rosso Fiorentino, « Les dieux dans des niches » (1526), <a href=\"https://www.metmuseum.org/art/collection/search/368125\" target=\"_blank\" rel=\"noopener\">Metropolitan Museum of Art, New York</a>, domaine public (Open Access).",
   "Couvertures des modules : Andreas Cellarius, <a href=\"https://commons.wikimedia.org/wiki/File:Cellarius_Harmonia_Macrocosmica_-_Hypothesis_Ptolemaica.jpg\" target=\"_blank\" rel=\"noopener\"><i>Harmonia Macrocosmica</i></a> (Amsterdam, 1661), domaine public ; Johannes Kepler, <a href=\"https://commons.wikimedia.org/wiki/File:Keplers_trigon.jpg\" target=\"_blank\" rel=\"noopener\">trigone des grandes conjonctions</a>, <i>De Stella Nova</i> (1606), domaine public.",
   "Histoire de l'astrologie : <a href=\"https://commons.wikimedia.org/wiki/File:Babylonian_astronomical_diary_recording_the_death_of_Alexander_the_Great_(British_Museum).jpg\" target=\"_blank\" rel=\"noopener\">journal astronomique babylonien</a> (British Museum, photo domaine public) ; <a href=\"https://commons.wikimedia.org/wiki/File:Claudius_Ptolemaeus_(Ptolemy)._Line_engraving._Wellcome_V0004806.jpg\" target=\"_blank\" rel=\"noopener\">portrait de Ptolémée</a> et <a href=\"https://commons.wikimedia.org/wiki/File:William_Lilly._Line_engraving,_1660._Wellcome_V0003571.jpg\" target=\"_blank\" rel=\"noopener\">portrait de William Lilly</a>, Wellcome Collection, <a href=\"https://creativecommons.org/licenses/by/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY 4.0</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:Farnese_Atlas-.jpg\" target=\"_blank\" rel=\"noopener\">Atlas Farnèse</a>, photo Yair Haklai, <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY-SA 4.0</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:Illustrations_de_De_magnis_coniunctionibus_-_annorum_revolutionibus,_ac_eorum_profectionibus,_octo_continens_tractatus_-_(Non_identifié)_;_Albumasar,_aut._de_texte_-_btv1b26002089_(15_of_30).jpg\" target=\"_blank\" rel=\"noopener\">Abu Ma'shar, <i>De magnis coniunctionibus</i></a> (1489, Observatoire de Paris), <a href=\"https://commons.wikimedia.org/wiki/File:Anatomical_Man.jpg\" target=\"_blank\" rel=\"noopener\">Très Riches Heures du duc de Berry</a> (musée Condé), <a href=\"https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Morin_by_Etienne_Desrochers.jpg\" target=\"_blank\" rel=\"noopener\">portrait de Morin de Villefranche</a> par Étienne Desrochers, <a href=\"https://commons.wikimedia.org/wiki/File:Leochart1241.JPG\" target=\"_blank\" rel=\"noopener\">thème publié dans la biographie d'Alan Leo</a> (1919) et <a href=\"https://commons.wikimedia.org/wiki/File:Flammarion.jpg\" target=\"_blank\" rel=\"noopener\">gravure dite de Flammarion</a> (1888) : domaine public, via Wikimedia Commons."
  ]
 ],
 [
  "Les récits d'histoire et les pentacles",
  [
   "Histoires de la magie (onze chapitres) et de l'astrologie (dix chapitres) : 59 gravures, manuscrits et objets venant de <a href=\"https://wellcomecollection.org/\" target=\"_blank\" rel=\"noopener\">Wellcome Collection</a> (53 images, <a href=\"https://creativecommons.org/publicdomain/mark/1.0/deed.fr\" target=\"_blank\" rel=\"noopener\">Public Domain Mark</a> ou <a href=\"https://creativecommons.org/licenses/by/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY 4.0</a>), de l'<a href=\"https://www.artic.edu/open-access\" target=\"_blank\" rel=\"noopener\">Art Institute of Chicago</a> (4, CC0) et du <a href=\"https://www.clevelandart.org/open-access\" target=\"_blank\" rel=\"noopener\">Cleveland Museum of Art</a> (2, CC0). La légende de chaque image donne l'œuvre, la date et la source. Les gravures de Robert Fludd viennent pour la plupart de l'<i>Utriusque cosmi historia</i> (Oppenheim, 1617-1621).",
   "Pentacles : pages de deux manuscrits de la <i>Clavicule de Salomon</i> (une Clavicule italienne et latine vers 1775, et <i>Les Clavicules de R. Salomon</i>, manuscrit français de 1796) et une amulette hébraïque du XVIIIe siècle, <a href=\"https://wellcomecollection.org/\" target=\"_blank\" rel=\"noopener\">Wellcome Collection</a>, <a href=\"https://creativecommons.org/licenses/by/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY 4.0</a>. Les pentacles redessinés suivent l'édition de S. L. MacGregor Mathers, <i>The Key of Solomon the King</i> (1889), et l'édition critique de Joseph H. Peterson (esotericarchives.com).",
   "Arbre de vie et guématrie : textes rédigés pour Arcanes. Pour aller plus loin : Gershom Scholem, <i>La Kabbale</i> (Cerf) ; Moshe Idel, <i>Kabbalah: New Perspectives</i> (Yale, 1988) ; le <i>Sefer Yetsira</i>, trad. Charles Mopsik ; Joscelyn Godwin et Jean-Pierre Brach sur la kabbale chrétienne. Les valeurs et versets hébreux ont été vérifiés par calcul."
  ]
 ],
 [
  "Le globe des traditions",
  [
   "Fond de carte : <a href=\"https://www.naturalearthdata.com/\" target=\"_blank\" rel=\"noopener\">Natural Earth</a> (domaine public), tracés des côtes simplifiés pour Arcanes. Projection : <a href=\"https://github.com/d3/d3-geo\" target=\"_blank\" rel=\"noopener\">d3-geo</a> de Mike Bostock (licence ISC). L'habillage de carte ancienne, les sceaux et les vingt-six symboles sont dessinés pour Arcanes.",
   "Les notices sont rédigées pour Arcanes. Pour vérifier et aller plus loin : Wouter J. Hanegraaff (dir.), <i>Dictionary of Gnosis and Western Esotericism</i> (Brill, 2005) ; Antoine Faivre, <i>L'Ésotérisme</i> (PUF) ; Jean-Pierre Brach et Jérôme Rousse-Lacordaire (dir.), <i>Études d'histoire de l'ésotérisme</i> (Cerf, 2007) ; les listes du <a href=\"https://ich.unesco.org/fr/listes\" target=\"_blank\" rel=\"noopener\">patrimoine culturel immatériel de l'UNESCO</a>.",
   "Les traditions vivantes, en particulier celles des peuples autochtones, sont présentées comme des religions et des cultures. Arcanes n'en reproduit ni les objets sacrés ni le détail des cérémonies. Les emplacements des sceaux sont des repères, pas des frontières.",
   "Fleuves, lacs, montagnes et déserts : <a href=\"https://www.naturalearthdata.com/\" target=\"_blank\" rel=\"noopener\">Natural Earth</a> (domaine public), simplifiés pour Arcanes. Les navires, les monstres marins, la sphère armillaire et le pied du globe sont dessinés pour Arcanes.",
   "Images des fiches (72) : <a href=\"https://wellcomecollection.org/\" target=\"_blank\" rel=\"noopener\">Wellcome Collection</a> (domaine public ou CC BY), <a href=\"https://www.artic.edu/open-access\" target=\"_blank\" rel=\"noopener\">Art Institute of Chicago</a> (CC0) et <a href=\"https://www.clevelandart.org/open-access\" target=\"_blank\" rel=\"noopener\">Cleveland Museum of Art</a> (CC0). La légende de chaque image donne l'œuvre, la date et la source. Les gravures ont été recadrées et passées en tons sépia."
  ]
 ],
 [
  "L'alchimie",
  [
   "Planches du Splendor solis : huit aquarelles d'E. A. Ibbs d'après le manuscrit de Londres (1582), <a href=\"https://wellcomecollection.org/search/works?query=Ibbs%20Trismosin\" target=\"_blank\" rel=\"noopener\">Wellcome Collection</a>. Domaine public, sauf le soleil noir et l'aigle à trois têtes, sous licence <a href=\"https://creativecommons.org/licenses/by/4.0/deed.fr\" target=\"_blank\" rel=\"noopener\">CC BY 4.0</a> (images recadrées).",
   "Emblèmes : Michael Maier, <i>Atalanta fugiens</i> (1617), gravures de Matthäus Merian, emblèmes <a href=\"https://wellcomecollection.org/works?query=L0029171\" target=\"_blank\" rel=\"noopener\">XXI (Wellcome Collection)</a> et <a href=\"https://commons.wikimedia.org/wiki/File:Michael_Maier_Atalanta_Fugiens_Emblem_42.jpeg\" target=\"_blank\" rel=\"noopener\">XLII</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:Mutus_liber_1677_1.jpg\" target=\"_blank\" rel=\"noopener\"><i>Mutus Liber</i>, première planche (1677)</a>. Domaine public.",
   "Le livre muet : les quinze planches du <i>Mutus Liber</i> (La Rochelle, Pierre Savouret, 1677), d'après l'<a href=\"https://archive.org/details/b14557551_0002\" target=\"_blank\" rel=\"noopener\">exemplaire de la Wellcome Library</a> numérisé sur Internet Archive. Domaine public (images recadrées). La Table d'émeraude phrase par phrase reprend la traduction française dite de l'Hortulain et la version latine dite vulgate. Les bêtes du bestiaire sont dessinées pour Arcanes.",
   "Histoire : <a href=\"https://commons.wikimedia.org/wiki/File:Zosimos_distillation_equipment.jpg\" target=\"_blank\" rel=\"noopener\">appareils de Zosime</a> (BnF, grec 2327) ; <a href=\"https://commons.wikimedia.org/wiki/File:Chrysopoea_of_Cleopatra_1.png\" target=\"_blank\" rel=\"noopener\">Chrysopée de Cléopâtre</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:Man_Florence,_Ashburnham_1166_fol_12r.jpg\" target=\"_blank\" rel=\"noopener\">« Geber », manuscrit Ashburnham 1166</a> ; <a href=\"https://wellcomecollection.org/works?query=M0012393\" target=\"_blank\" rel=\"noopener\">Table d'émeraude de Khunrath</a> (Wellcome Collection, CC BY 4.0) ; <a href=\"https://commons.wikimedia.org/wiki/File:Roi_et_Reine_Alchimie.jpg\" target=\"_blank\" rel=\"noopener\">Rosaire des philosophes</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:Musaeum_Hermeticum,_XII_Clavis_by_Matthaeus_Merian.jpg\" target=\"_blank\" rel=\"noopener\">douzième clef de Basile Valentin</a> ; <a href=\"https://commons.wikimedia.org/wiki/File:JosephWright-Alchemist.jpg\" target=\"_blank\" rel=\"noopener\">Joseph Wright of Derby, <i>L'Alchimiste</i> (1771)</a>. Œuvres du domaine public.",
   "Sources du cours : Lawrence M. Principe, <i>The Secrets of Alchemy</i> (2013) ; Didier Kahn, <i>Le Fixe et le Volatil</i> (2016) ; William R. Newman, <i>Newton the Alchemist</i> (2019) ; Bernard Joly, <i>Histoire de l'alchimie</i> (2013). Les opérations par signe suivent Dom Pernety, <i>Dictionnaire mytho-hermétique</i> (1758). Les citations de la Table d'émeraude et des devises de Maier sont traduites du latin pour Arcanes.",
   "« Mon Œuvre » est une pratique moderne, inspirée de la lecture de l'alchimie par C. G. Jung (<i>Psychologie et Alchimie</i>, 1944). Le vase animé, les signes et les jeux sont dessinés pour Arcanes."
  ]
 ],
 [
  "Psyché",
  [
   "Images : Johann Heinrich Füssli, <i>Le Cauchemar</i> (1781, Detroit Institute of Arts) et Francisco de Goya, <i>Los Caprichos</i>, planche 43 (1799), via <a href=\"https://commons.wikimedia.org/\" target=\"_blank\" rel=\"noopener\">Wikimedia Commons</a> (domaine public) ; le baquet de Mesmer, gravure coloriée, <a href=\"https://wellcomecollection.org/\" target=\"_blank\" rel=\"noopener\">Wellcome Collection</a> (domaine public).",
   "Les œuvres de C. G. Jung sont protégées par le droit d'auteur : le cours en résume les idées et ne cite que de courts passages, à des fins d'enseignement. La liste de mots du test d'associations vient des <i>Études diagnostiques sur les associations</i> de Jung et Riklin (1906), traduite pour Arcanes.",
   "Sources : Henri F. Ellenberger, <i>À la découverte de l'inconscient</i> (1970) ; Sonu Shamdasani, <i>Jung and the Making of Modern Psychology</i> (2003) ; Deirdre Bair, <i>Jung</i> (2003) ; Robert Darnton, <i>La Fin des Lumières : le mesmérisme et la Révolution</i> (1984) ; le <i>Rapport des commissaires chargés par le roi de l'examen du magnétisme animal</i> (Bailly, 1784) ; Émile Coué, <i>La Maîtrise de soi-même par l'autosuggestion consciente</i> (1922).",
   "Les exercices (associations, journal de rêves, mandala, miroir de l'ombre, ficelle de Coué) sont des outils de réflexion dessinés pour Arcanes, pas des tests psychologiques validés."
  ]
 ],
 [
  "La magie",
  [
   "Heures planétaires et phases de la Lune calculées sur l'appareil avec Astronomy Engine (Don Cross, licence MIT), pour le lieu choisi en astrologie.",
   "Gravures : <a href=\"https://wellcomecollection.org/works?query=L0021164\" target=\"_blank\" rel=\"noopener\">Khunrath, l'oratoire-laboratoire (1609)</a> ; <a href=\"https://wellcomecollection.org/works?query=L0015113\" target=\"_blank\" rel=\"noopener\">Agrippa, l'homme dans le carré (1533)</a> ; <a href=\"https://wellcomecollection.org/works?query=L0040386\" target=\"_blank\" rel=\"noopener\">les influences des astres sur l'homme</a> ; <a href=\"https://wellcomecollection.org/works?query=V0047951\" target=\"_blank\" rel=\"noopener\">la Nécessité et les planètes</a> ; <a href=\"https://wellcomecollection.org/works?query=L0048844\" target=\"_blank\" rel=\"noopener\">la table de Mercure (Agrippa, 1651)</a> ; <a href=\"https://wellcomecollection.org/works?query=L0002757\" target=\"_blank\" rel=\"noopener\">Khunrath, page de titre de l'Amphitheatrum (1609)</a> ; <a href=\"https://wellcomecollection.org/works?query=L0023806\" target=\"_blank\" rel=\"noopener\">les pentacles d'Agrippa (1651)</a> ; <a href=\"https://wellcomecollection.org/works?query=L0002753\" target=\"_blank\" rel=\"noopener\">la chouette de Khunrath</a> ; <a href=\"https://wellcomecollection.org/works?query=L0015114\" target=\"_blank\" rel=\"noopener\">portrait d'Agrippa</a> ; <a href=\"https://wellcomecollection.org/works?query=V0001505\" target=\"_blank\" rel=\"noopener\">portrait de John Dee</a> ; <a href=\"https://wellcomecollection.org/works?query=V0025898\" target=\"_blank\" rel=\"noopener\">un philosophe se moque de la magie</a>. Wellcome Collection, Londres, <a href=\"https://creativecommons.org/publicdomain/mark/1.0/deed.fr\" target=\"_blank\" rel=\"noopener\">Public Domain Mark</a>.",
   "Lames des sentiers de l'Arbre de vie : tarot Waite-Smith (1909), dessiné par Pamela Colman Smith, domaine public.",
   "Second cercle, gravures : <a href=\"https://wellcomecollection.org/works?query=L0013220\" target=\"_blank\" rel=\"noopener\">le monocorde divin de Fludd (1618)</a> ; <a href=\"https://wellcomecollection.org/works?query=V0025818\" target=\"_blank\" rel=\"noopener\">les secrets de la géomancie arabique</a> ; <a href=\"https://wellcomecollection.org/works?query=V0025640\" target=\"_blank\" rel=\"noopener\">le roi rouge dans le vase, d'après le Splendor solis</a> ; <a href=\"https://wellcomecollection.org/works?query=V0007564\" target=\"_blank\" rel=\"noopener\">le château de la connaissance (1556)</a> ; <a href=\"https://wellcomecollection.org/works?query=V0035811\" target=\"_blank\" rel=\"noopener\">Hermès Trismégiste, eau-forte de Cook</a> ; <a href=\"https://wellcomecollection.org/works?query=L0025673\" target=\"_blank\" rel=\"noopener\">le miroir de la nature de Fludd</a> ; <a href=\"https://wellcomecollection.org/works?query=L0063697\" target=\"_blank\" rel=\"noopener\">la Monade de Dee</a> ; <a href=\"https://wellcomecollection.org/works?query=V0049800\" target=\"_blank\" rel=\"noopener\">Kircher parmi les sphères</a>. Wellcome Collection, Public Domain Mark.",
   "Bibliothèque, textes du domaine public cités mot pour mot : Table d'émeraude, traduction dite de l'Hortulain (via Wikipédia) ; Platon, <i>Timée</i>, trad. Victor Cousin ; Plotin, <i>Ennéades</i>, trad. M.-N. Bouillet ; <i>Hermès Trismégiste</i>, trad. Louis Ménard (1866) ; <i>Hymnes orphiques</i>, trad. Leconte de Lisle (1869) ; <i>Vers dorés</i>, trad. P.-C. Lévesque et Fabre d'Olivet (1813). Textes établis par <a href=\"https://fr.wikisource.org\" target=\"_blank\" rel=\"noopener\">Wikisource</a>. Les courts fragments marqués « traduction pour Arcanes » sont traduits pour l'application.",
   "Second cercle, autres sources : Agrippa, <i>De occulta philosophia</i>, II, 48 (géomancie) ; Kepler, <i>Harmonices Mundi</i>, V (1619) ; Ficin, <i>De vita libri tres</i> (1489) ; Dee, <i>Monas hieroglyphica</i> (1564) ; Lulle, <i>Ars brevis</i> (1308) ; <i>Rhétorique à Herennius</i>, III ; Dresler et al., <i>Neuron</i> (2017) ; D. P. Walker (1958), F. A. Yates (1964, 1966), L. M. Principe (2013). Positions héliocentriques et passages du Soleil : Astronomy Engine.",
   "Carrés planétaires, correspondances et caractères : Henri Corneille Agrippa, <i>De occulta philosophia</i> (1533), livre II ; anges des jours : <i>Heptameron</i> attribué à Pierre d'Abano ; heures et élections : <i>Picatrix</i> (Ghāyat al-Ḥakīm, XIe siècle, trad. latine 1256) ; Arbre de vie, sentiers, Pentagramme mineur et grades : système de la Golden Dawn tel que publié par Israel Regardie (<i>The Golden Dawn</i>, 1937-1940) ; Pilier du milieu : Regardie, <i>The Middle Pillar</i> (1938) ; sigils : Austin Osman Spare, <i>The Book of Pleasure</i> (1913), et Peter J. Carroll, <i>Liber Null</i> (1978).",
   "Écritures secrètes : écriture céleste, écriture des anges (Malachim) et passage du fleuve vectorisées pour Arcanes d'après <a href=\"https://commons.wikimedia.org/wiki/File:Agrippa_von_Nettesheim_-_3_Alphabets.png\" target=\"_blank\" rel=\"noopener\">la planche d'Agrippa, <i>De occulta philosophia</i> III, 30</a> (domaine public) ; alphabet thébain d'après les <a href=\"https://commons.wikimedia.org/wiki/File:Theban_glyph_A.svg\" target=\"_blank\" rel=\"noopener\">tracés de Fuzzypeg sur Wikimedia Commons</a> (domaine public), d'après Trithème, <i>Polygraphia</i> (1518).",
   "Histoire : Antoine Faivre, Frances Yates, Wouter J. Hanegraaff, Jean-Patrice Boudet et Owen Davies (références dans l'onglet Histoire). Études citées : Brooks et al. (2016), Norton et Gino (2014), Langer (1975), Forer (1949)."
  ]
 ],
 [
  "Polices",
  [
   "Polices IM Fell English SC, Alegreya, Alegreya Sans et Frank Ruhl Libre, sous licence SIL Open Font License 1.1."
  ]
 ],
 [
  "Lectures",
  [
   "Lectures inspirées de la restauration du Tarot de Marseille par Alejandro Jodorowsky et Philippe Camoin, et de la tradition de la Golden Dawn reprise par le tarot Waite-Smith."
  ]
 ]
];
  function openCredits(){
    const sh = document.getElementById("sheet"); if(!sh) return;
    sh.querySelector(".sheet-body").innerHTML = `<div class="credits"><p class="eyebrow">Arcanes</p><h2>Crédits et sources</h2>
      ${SECTIONS.map(([t, ps]) => `<section><h3>${t}</h3>${ps.map(p => `<p>${p}</p>`).join("")}</section>`).join("")}</div>`;
    sh.hidden = false; document.body.classList.add("locked");
    const p = sh.querySelector(".sheet-panel"); if(p) p.scrollTop = 0;
    const c = sh.querySelector(".sheet-close"); if(c) c.focus();
  }
  document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-credits]"); if(b){ e.preventDefault(); openCredits(); } });
  window.openCredits = openCredits;
})();

/* ===== Arcanes · le mouvement =====
   Trois durées, deux courbes (voir styles.css, chantier 0).
   1. Chaque vue qui apparaît entre en cascade.
   2. La fiche descend avant de disparaître.
   3. Une lame touchée devient la lame de la fiche, d'un seul geste (View Transitions). */
(() => {
  const RM = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const P = window.ArcanesPlus = window.ArcanesPlus || {};

  /* 1. La cascade : on numérote les enfants directs, la feuille de style fait le reste */
  function cascade(el, max = 14){
    if(!el || RM()) return;
    const kids = [...el.children].filter(k => k.offsetParent !== null || k.tagName === "SECTION");
    kids.slice(0, max).forEach((k, i) => k.style.setProperty("--i", i));
    el.classList.remove("m-in"); void el.offsetWidth; el.classList.add("m-in");
    clearTimeout(el._mIn); el._mIn = setTimeout(() => el.classList.remove("m-in"), 1400);
  }
  P.cascade = cascade;
  function watchViews(){
    const main = document.querySelector("main"); if(!main) return;
    new MutationObserver(ms => {
      for(const m of ms){ const t = m.target;
        if(m.type === "attributes" && t.classList && t.classList.contains("view") && !t.hidden && m.oldValue !== null) cascade(t);
      }
    }).observe(main, {attributes:true, attributeFilter:["hidden"], attributeOldValue:true, subtree:true});
  }

  /* 2. Fermer la fiche en douceur */
  function softClose(){
    const sh = document.getElementById("sheet"); if(!sh || typeof window.closeSheet !== "function") return;
    const orig = window.closeSheet;
    new MutationObserver(() => sh.classList.remove("closing")).observe(sh.querySelector(".sheet-body"), {childList:true});
    window.closeSheet = function(){
      if(sh.hidden || RM()){ sh.classList.remove("closing"); return orig.apply(this, arguments); }
      sh.classList.add("closing");
      setTimeout(() => { if(sh.classList.contains("closing")){ sh.classList.remove("closing"); orig(); } }, 300);
      document.body.classList.remove("locked");
    };
    try{ closeSheet = window.closeSheet; }catch(e){}
  }

  /* 3. La lame touchée glisse jusque dans la fiche */
  let lastImg = null;
  document.addEventListener("pointerdown", e => {
    const t = e.target.closest && e.target.closest("[data-sheet],[data-open],.lame,.sym-lame,.st-card,.hcol");
    lastImg = t ? (t.querySelector("img,svg.card,.card-svg") || (t.tagName === "IMG" ? t : null)) : null;
  }, true);
  function morphSheet(){
    if(typeof window.openSheet !== "function" || !document.startViewTransition) return;
    const orig = window.openSheet;
    window.openSheet = function(id){
      const src = lastImg; lastImg = null;
      const sh = document.getElementById("sheet");
      if(!src || RM() || !sh.hidden || !src.isConnected){ return orig.apply(this, arguments); }
      src.style.viewTransitionName = "lame-vt";
      let vt;
      try{
        vt = document.startViewTransition(() => {
          src.style.viewTransitionName = "";
          orig(id);
          const art = sh.querySelector(".sheet-art img, .sheet-art svg, .sheet-art .card, .sheet-top img");
          if(art) art.style.viewTransitionName = "lame-vt";
        });
      }catch(err){ src.style.viewTransitionName = ""; return orig(id); }
      vt.finished.finally(() => { const art = sh.querySelector('[style*="lame-vt"]'); if(art) art.style.viewTransitionName = ""; });
    };
    try{ openSheet = window.openSheet; }catch(e){}
  }

  P.onReady = P.onReady || [];
  P.onReady.push(watchViews);
  P.onLate = P.onLate || []; P.onLate.push(() => { softClose(); morphSheet(); });
})();

/* ===== Chantier 4 · Le pont entre le tarot et le ciel =====
   Les correspondances de la Golden Dawn (fin du XIXe siècle), publiées par Crowley dans
   Liber 777 (1909) et reprises dans le Book T : les majeures reçoivent une planète, un signe
   ou un élément ; les petites cartes de 2 à 10 reçoivent chacune un décan, c'est-à-dire
   dix degrés du zodiaque, avec la planète qui le gouverne (ordre chaldéen).
   Le Grand Etteilla a ses propres signes, imprimés sur les cartes 2 à 12.
   On voit le lien des deux côtés : de la lame vers l'astre, de l'astre vers la lame. */
(() => {
  const P = window.ArcanesPlus;
  const SIGNES = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  const SGL = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  const PLN = {soleil:["le Soleil","☉"], lune:["la Lune","☽"], mercure:["Mercure","☿"], venus:["Vénus","♀"], mars:["Mars","♂"], jupiter:["Jupiter","♃"], saturne:["Saturne","♄"]};
  const ELN = {air:["l'Air","🜁"], eau:["l'Eau","🜄"], feu:["le Feu","🜂"], terre:["la Terre","🜃"]};
  const CHALD = ["mars","soleil","venus","mercure","lune","saturne","jupiter"];
  const DE_S = {Bélier:"du Bélier", Taureau:"du Taureau", Gémeaux:"des Gémeaux", Cancer:"du Cancer", Lion:"du Lion", Vierge:"de la Vierge", Balance:"de la Balance", Scorpion:"du Scorpion", Sagittaire:"du Sagittaire", Capricorne:"du Capricorne", Verseau:"du Verseau", Poissons:"des Poissons"};
  const DE = s => DE_S[s] || "de " + s;
  const DEC_ORD = ["premier","deuxième","troisième"];

  /* Les majeures. t : p planète, s signe (index), e élément */
  const GD = {
    mat:{t:"e", k:"air"}, bateleur:{t:"p", k:"mercure"}, papesse:{t:"p", k:"lune"}, imperatrice:{t:"p", k:"venus"},
    empereur:{t:"s", k:0}, pape:{t:"s", k:1}, amoureux:{t:"s", k:2}, chariot:{t:"s", k:3}, force:{t:"s", k:4},
    ermite:{t:"s", k:5}, roue:{t:"p", k:"jupiter"}, justice:{t:"s", k:6}, pendu:{t:"e", k:"eau"}, sansnom:{t:"s", k:7},
    temperance:{t:"s", k:8}, diable:{t:"s", k:9}, maisondieu:{t:"p", k:"mars"}, etoile:{t:"s", k:10}, lune:{t:"s", k:11},
    soleil:{t:"p", k:"soleil"}, jugement:{t:"e", k:"feu"}, monde:{t:"p", k:"saturne"}
  };
  /* Pourquoi : quelques mots sur la logique de chaque attribution */
  const WHY = {
    mat:"Aleph, la première lettre, est une des trois lettres « mères » de l'alphabet hébreu, liées aux éléments : l'Air, le souffle avant toute forme.",
    bateleur:"Mercure est le dieu des messagers, des marchands et des habiles : le Bateleur manie ses objets comme Mercure les mots.",
    papesse:"La Lune règne sur ce qui est caché, réfléchi, intérieur : la Papesse tient un livre fermé.",
    imperatrice:"Vénus, la fécondité et l'amour : l'Impératrice est la mère, la nature qui donne.",
    empereur:"Le Bélier ouvre le zodiaque et l'année astrologique : l'élan du commandement, Mars qui gouverne le signe.",
    pape:"Le Taureau, signe fixe de Terre : la tradition qui dure, la parole transmise. Vénus y règne, la Lune y est exaltée.",
    amoureux:"Les Gémeaux, le signe double : le choix entre deux voies, la rencontre de deux êtres.",
    chariot:"Le Cancer, signe cardinal d'Eau, la carapace qui protège : le char est une maison qui avance.",
    force:"Le Lion : la Force dompte un lion. La Golden Dawn a échangé les places de la Force et de la Justice pour accorder les signes au zodiaque ; au Marseille, la Force reste XI.",
    ermite:"La Vierge, signe de Terre gouverné par Mercure : la patience, l'étude, la recherche solitaire.",
    roue:"Jupiter, la grande fortune des astrologues : les cycles qui tournent et la chance qui vient.",
    justice:"La Balance : la Justice tient la balance.",
    pendu:"Mem, deuxième lettre mère : l'Eau, ce qui se renverse et se dissout.",
    sansnom:"Le Scorpion, signe de la mort et de la transformation dans l'astrologie traditionnelle.",
    temperance:"Le Sagittaire, l'archer qui vise loin : la Tempérance mélange les contraires pour atteindre un but.",
    diable:"Le Capricorne, la chèvre, gouverné par Saturne : la matière, les liens, la tentation du pouvoir.",
    maisondieu:"Mars, la guerre et la destruction soudaine : la tour frappée par le feu.",
    etoile:"Le Verseau, le porteur d'eau : l'Étoile verse ses deux cruches.",
    lune:"Les Poissons, dernier signe, l'eau profonde : la Lune et son étang d'où sort une écrevisse.",
    soleil:"Le Soleil pour le Soleil : la seule correspondance qui va de soi.",
    jugement:"Shin, troisième lettre mère : le Feu de la résurrection.",
    monde:"Saturne, la dernière planète des anciens, la limite du cosmos : le Monde ferme le jeu."
  };
  /* Les titres des petites cartes dans la Golden Dawn (« Book T ») */
  const TITRES = {
    batons:["la Domination","la Force établie","l'Œuvre accomplie","la Lutte","la Victoire","la Vaillance","la Rapidité","la Grande Force","l'Oppression"],
    coupes:["l'Amour","l'Abondance","le Plaisir mêlé","la Perte dans le plaisir","le Plaisir","le Succès illusoire","le Succès abandonné","le Bonheur matériel","le Succès accompli"],
    epees:["la Paix restaurée","le Chagrin","le Repos après la lutte","la Défaite","le Succès mérité","l'Effort instable","la Force raccourcie","le Désespoir et la Cruauté","la Ruine"],
    deniers:["le Changement harmonieux","les Travaux matériels","la Puissance terrestre","les Soucis matériels","le Succès matériel","le Succès inaccompli","la Prudence","le Gain matériel","la Richesse"]
  };
  const TITRES_EN = {
    batons:["Dominion","Established Strength","Perfected Work","Strife","Victory","Valour","Swiftness","Great Strength","Oppression"],
    coupes:["Love","Abundance","Blended Pleasure","Loss in Pleasure","Pleasure","Illusionary Success","Abandoned Success","Material Happiness","Perfected Success"],
    epees:["Peace Restored","Sorrow","Rest from Strife","Defeat","Earned Success","Unstable Effort","Shortened Force","Despair and Cruelty","Ruin"],
    deniers:["Harmonious Change","Material Works","Earthly Power","Material Trouble","Material Success","Success Unfulfilled","Prudence","Material Gain","Wealth"]
  };
  /* chaque couleur parcourt les trois signes de son élément : cardinal, fixe, mutable */
  const SUIT_SIGNS = {batons:[0,4,8], coupes:[3,7,11], epees:[6,10,2], deniers:[9,1,5]};
  const SUIT_EL = {batons:"feu", coupes:"eau", epees:"air", deniers:"terre"};

  function decanOf(id){
    const m = /^(batons|coupes|epees|deniers)(\d+)$/.exec(id); if(!m) return null;
    const suit = m[1], r = +m[2]; if(r < 2 || r > 10) return null;
    const g = Math.floor((r - 2)/3), d = (r - 2) % 3, sign = SUIT_SIGNS[suit][g];
    return {suit, r, sign, d, lon0:sign*30 + d*10, ruler:CHALD[(sign*3 + d) % 7], titre:TITRES[suit][r-2], en:TITRES_EN[suit][r-2]};
  }
  const cardOfDecan = lon => { const sign = Math.floor(lon/30) % 12, d = Math.floor((lon % 30)/10);
    for(const suit in SUIT_SIGNS){ const g = SUIT_SIGNS[suit].indexOf(sign); if(g >= 0) return suit + (2 + g*3 + d); } };
  /* les dates où le Soleil traverse un décan, à un jour près selon les années */
  function sunDates(lon0){
    const f = t => new Date(t).toLocaleDateString("fr-FR", {day:"numeric", month:"long"});
    try{
      const y = new Date().getFullYear(), start = new Astronomy.AstroTime(new Date(Date.UTC(y, 0, 1)));
      const a = Astronomy.SearchSunLongitude(lon0, start, 370), b = Astronomy.SearchSunLongitude((lon0 + 10) % 360, a, 40);
      return `du ${f(a.date)} au ${f(b.date.getTime() - 864e5)}`;
    }catch(e){
      const t0 = Date.UTC(2026, 2, 20, 14) + lon0/360*365.2422*864e5;
      return `du ${f(t0)} au ${f(t0 + 9*864e5)} environ`;
    }
  }
  const majFor = (t, k) => Object.keys(GD).find(id => GD[id].t === t && GD[id].k === k);
  const etSign = id => { if(typeof ET === "undefined" || !ET.maj[id]) return -1; const pl = ET.maj[id].place || ""; if(!pl.includes("signe")) return -1; return SIGNES.findIndex(s => pl.includes(DE_S[s] + ",") || pl.includes(DE_S[s] + ".")); };
  const etFor = sign => typeof ET === "undefined" ? null : Object.keys(ET.maj).find(id => etSign(id) === sign);

  const nomCarte = (id, deckId) => { try{ const c = byId(id); if(!c) return id;
      if(deckId === "et" && ET.maj[id]) return ET.maj[id].nom;
      if(deckId === "ws" && WS.noms[id]) return WS.noms[id];
      if(deckId === "sb" && SB.noms[id]) return SB.noms[id];
      return c.nom; }catch(e){ return id; } };
  const imgCarte = (id, deckId) => { try{ return PLAY_DECKS[deckId].src(id); }catch(e){ return ""; } };
  const deckNow = () => { try{ return DECK_ID; }catch(e){ return "conver"; } };
  const mini = (id, sub, deckId = deckNow()) => `<button type="button" class="pt-card" data-sheet="${id}"><img src="${imgCarte(id, deckId)}" alt="" loading="lazy"><span><b>${nomCarte(id, deckId)}</b>${sub ? `<small>${sub}</small>` : ""}</span></button>`;
  const astroBtn = (k, label) => `<button type="button" class="pt-astre" data-afiche="${k}">${label}</button>`;
  const sym = g => `<span class="pt-g" aria-hidden="true">${g}︎</span>`;

  /* ---------- de la lame vers le ciel ---------- */
  function tarotSide(id){
    const dk = deckNow();
    let h = "";
    if(GD[id]){
      const a = GD[id];
      const lab = a.t === "p" ? astroBtn("p:" + a.k, `${sym(PLN[a.k][1])} ${PLN[a.k][0]}`) : a.t === "s" ? astroBtn("s:" + a.k, `${sym(SGL[a.k])} ${SIGNES[a.k]}`) : `<span class="pt-astre is-el">${sym(ELN[a.k][1])} ${ELN[a.k][0]}</span>`;
      h += `<div class="pt-row"><p class="pt-k">Golden Dawn</p><div class="pt-v">${lab}<p>${WHY[id]}</p></div></div>`;
      const es = dk === "et" ? etSign(id) : -1;
      if(es >= 0) h += `<div class="pt-row"><p class="pt-k">Grand Etteilla</p><div class="pt-v">${astroBtn("s:" + es, `${sym(SGL[es])} ${SIGNES[es]}`)}<p>Dans le Grand Etteilla, la carte « ${ET.maj[id].nom} » porte le signe ${DE(SIGNES[es])}. Etteilla ne suit pas la Golden Dawn, qui viendra un siècle après lui : ses signes accompagnent les jours de la Création et les vertus.</p></div></div>`;
    } else {
      const D = decanOf(id);
      if(D){
        const S = SIGNES[D.sign], R = PLN[D.ruler];
        h += `<div class="pt-row"><p class="pt-k">Golden Dawn</p><div class="pt-v">${astroBtn("s:" + D.sign, `${sym(SGL[D.sign])} ${D.d*10}° à ${D.d*10 + 10}° ${S}`)} ${astroBtn("p:" + D.ruler, `${sym(R[1])} ${R[0]}`)}
          <p>Le ${DEC_ORD[D.d]} décan ${DE(S)}, gouverné par ${R[0]}. La Golden Dawn l'appelle « Seigneur de ${D.titre} » (<i lang="en">Lord of ${D.en}</i>). Le Soleil le traverse ${sunDates(D.lon0)}.</p>
          <p class="help">Pourquoi ce décan ? Les Bâtons suivent les signes de Feu, les Coupes ceux d'Eau, les Épées ceux d'Air, les Deniers ceux de Terre ; dans chaque couleur, le 2, le 3 et le 4 prennent le signe cardinal, le 5, le 6 et le 7 le signe fixe, le 8, le 9 et le 10 le signe mutable. Les planètes se succèdent dans l'ordre chaldéen, en partant de Mars au premier décan du Bélier.</p></div></div>`;
      } else {
        const m = /^(batons|coupes|epees|deniers)(\d+)$/.exec(id);
        if(m){ const el = ELN[SUIT_EL[m[1]]], r = +m[2];
          h += `<div class="pt-row"><p class="pt-k">Golden Dawn</p><div class="pt-v"><span class="pt-astre is-el">${sym(el[1])} ${el[0]}</span>
            <p>${r === 1 ? `L'as est la racine de ${el[0]} : il ne prend pas de décan, il contient toute la couleur. La Golden Dawn le place au pôle du ciel, au-dessus du zodiaque.` : `Les figures ne prennent pas un décan mais trente degrés à cheval sur deux signes, et chacune est un élément dans l'élément de sa couleur. Leur correspondance avec les figures du Marseille (valet, cavalier, reine, roi) varie selon les auteurs : Arcanes ne la tranche pas.`}</p></div></div>`; }
      }
    }
    if(!h) return "";
    return `<section class="rub pont" data-pont><h3><span>✶</span>Dans le ciel</h3>${h}<div class="pt-foot">Ces correspondances viennent de l'Ordre hermétique de la Golden Dawn (Londres, fin du XIXe siècle). Le tarot n'a pas été dessiné avec elles : elles ont été posées sur lui quatre siècles après sa naissance.</div></section>`;
  }

  /* ---------- de l'astre vers la lame ---------- */
  function astroSide(key, label){
    const [t, v] = key.split(":");
    let h = "";
    const planet = (t === "p" || t === "np" || t === "cp") ? v : null;
    if(planet && PLN[planet]){
      const maj = majFor("p", planet);
      const decs = []; for(const s in SUIT_SIGNS) for(let r = 2; r <= 10; r++){ const D = decanOf(s + r); if(D.ruler === planet) decs.push(D); }
      decs.sort((a, b) => a.lon0 - b.lon0);
      if(maj) h += `<div class="pt-row"><p class="pt-k">Son arcane</p><div class="pt-v pt-cards">${mini(maj, "Golden Dawn")}<p>${WHY[maj]}</p></div></div>`;
      if(decs.length) h += `<div class="pt-row"><p class="pt-k">Ses décans</p><div class="pt-v"><div class="pt-strip">${decs.map(D => mini(D.suit + D.r, `${SGL[D.sign]}︎ ${D.d*10}–${D.d*10 + 10}°`)).join("")}</div><p class="help">${PLN[planet][0][0].toUpperCase() + PLN[planet][0].slice(1)} gouverne ${decs.length} décans du zodiaque, donc ${decs.length} petites cartes.</p></div></div>`;
      const m = label && /(\d{1,2})°\s?(\d{1,2})?.{0,12}?(Bélier|Taureau|Gémeaux|Cancer|Lion|Vierge|Balance|Scorpion|Sagittaire|Capricorne|Verseau|Poissons)/.exec(label);
      if(m && (t === "np" || t === "cp")){ const lon = SIGNES.indexOf(m[3])*30 + (+m[1]); const c = cardOfDecan(lon), D = decanOf(c);
        h += `<div class="pt-row"><p class="pt-k">${t === "cp" ? "En ce moment" : "Dans ce thème"}</p><div class="pt-v pt-cards">${mini(c, `${m[1]}° ${m[3]}`)}<p>À ${m[1]}° ${m[3]}, ${PLN[planet][0]} traverse le ${DEC_ORD[D.d]} décan ${DE(m[3])}, celui de la carte « ${nomCarte(c, deckNow())} ».</p></div></div>`; }
    } else if(planet === "uranus" || planet === "neptune" || planet === "pluton"){
      const k = {uranus:["mat","l'Air"], neptune:["pendu","l'Eau"], pluton:["jugement","le Feu"]}[planet];
      h += `<div class="pt-row"><p class="pt-k">Après la Golden Dawn</p><div class="pt-v pt-cards">${mini(k[0], "attribution moderne")}<p>Les planètes découvertes après l'Antiquité n'avaient pas de lame. Au XXe siècle, beaucoup d'auteurs leur ont donné les trois lames des éléments : ici ${k[1]}. Ce n'est pas la Golden Dawn, c'est une convention plus récente.</p></div></div>`;
    }
    if(t === "s"){
      const s = +v, maj = majFor("s", s), et = etFor(s);
      if(maj) h += `<div class="pt-row"><p class="pt-k">Son arcane</p><div class="pt-v pt-cards">${mini(maj, "Golden Dawn")}<p>${WHY[maj]}</p></div></div>`;
      const decs = [0,1,2].map(d => cardOfDecan(s*30 + d*10 + 1));
      h += `<div class="pt-row"><p class="pt-k">Ses trois décans</p><div class="pt-v"><div class="pt-strip">${decs.map((c, d) => { const D = decanOf(c); return mini(c, `${d*10}–${d*10 + 10}° · ${PLN[D.ruler][1]}︎ ${PLN[D.ruler][0]}`); }).join("")}</div></div></div>`;
      if(et) h += `<div class="pt-row"><p class="pt-k">Grand Etteilla</p><div class="pt-v pt-cards">${mini(et, ET.maj[et].place.split(" : ")[0], "et")}<p>${ET.maj[et].place}</p></div></div>`;
    }
    if(!h) return "";
    return `<section class="rub pont" data-pont><h3><span>✶</span>Dans le tarot</h3>${h}</section>`;
  }

  function appendTo(html){
    const body = document.querySelector("#sheet .sheet-body"); if(!body || !html || body.querySelector("[data-pont]")) return;
    const slot = body.querySelector("[data-pont-slot]"), box = slot || body.querySelector(".a-sheet") || body; box.insertAdjacentHTML("beforeend", html);
    /* dans la fiche de lame, « Dans le ciel » donne déjà la correspondance : on ne la répète pas dans la ligne de la Golden Dawn */
    if(slot && html.includes("Dans le ciel")) body.querySelectorAll("[data-corr]").forEach(e => e.remove());
    box.querySelectorAll("[data-pont] [data-sheet]").forEach(b => b.onclick = e => { e.stopPropagation(); openSheet(b.dataset.sheet); });
  }

  P.pont = {GD, decanOf, cardOfDecan, tarotSide, astroSide, SIGNES, SGL, PLN, sunDates, TITRES};
  P.onReady.push(() => {
    ["openSheet","openMinorSheet"].forEach(fn => {
      const orig = window[fn]; if(typeof orig !== "function") return;
      window[fn] = function(id){ const r = orig.apply(this, arguments); try{ appendTo(tarotSide(id)); }catch(e){ console.error(e); } return r; };
    });
    // les fiches de l'astrologie sont ouvertes par un clic sur [data-afiche] : on passe juste après
    document.addEventListener("click", e => {
      const b = e.target.closest && e.target.closest("[data-afiche]"); if(!b) return;
      const k = b.dataset.afiche; if(!/^(p|s|np|cp):/.test(k)) return;
      const label = (b.getAttribute("aria-label") || "") + " " + b.textContent;
      setTimeout(() => { try{ appendTo(astroSide(k, label)); }catch(err){ console.error(err); } }, 0);
    });
  });
})();

/* ===== Chantier 1 · Le comparateur : une lame, six jeux =====
   Dans l'ordre chronologique : Visconti-Sforza (Milan, v. 1450), Sola Busca (1491),
   Marseille de Conver (1760), Grand Etteilla (système de 1789), Wirth (1889), Waite-Smith (1909).
   Pour chaque lame : ce qu'on voit dans chaque jeu, puis le fil qui relie les images, et pourquoi elles changent. */
(() => {
  const P = window.ArcanesPlus;
  const COLS = [
    {k:"visconti", nom:"Visconti-Sforza", date:"v. 1450", y:1450, lieu:"Milan"},
    {k:"sb", nom:"Sola Busca", date:"1491", y:1491, lieu:"Venise ou Ferrare"},
    {k:"conver", nom:"Marseille", date:"1760", y:1760, lieu:"Nicolas Conver"},
    {k:"et", nom:"Grand Etteilla", date:"1789", y:1789, lieu:"Paris"},
    {k:"wirth", nom:"Wirth", date:"1889", y:1889, lieu:"Paris"},
    {k:"rws", nom:"Waite-Smith", date:"1909", y:1909, lieu:"Londres"}
  ];
  /* Pourquoi chaque jeu dessine autrement : la raison d'être de chacun */
  const RAISON = {
    visconti:"Une commande de prince, peinte à la main sur fond d'or pour les ducs de Milan. Les atouts sont un défilé de triomphes, comme dans les poèmes de Pétrarque : chaque figure en surpasse une autre.",
    sb:"La première série complète gravée au burin. Un humaniste a remplacé les allégories par des héros de Rome et de la Bible : le numéro reste, l'image change de sujet.",
    conver:"Un jeu populaire, gravé sur bois et colorié au pochoir, copié d'atelier en atelier depuis le modèle milanais. Les formes se simplifient, les détails se figent, quelques erreurs de copie deviennent des symboles.",
    et:"Le premier tarot fait pour la divination. Etteilla le croit égyptien, le réordonne selon la Création et imprime sur chaque carte un sens à l'endroit et un sens renversé.",
    wirth:"L'occultisme français relit le Marseille : Wirth garde ses figures, ajoute la lettre hébraïque, des symboles égyptiens et des couleurs codées, sous la direction de Stanislas de Guaita.",
    rws:"La Golden Dawn veut un tarot qui porte toute sa doctrine. Pamela Colman Smith dessine des scènes de théâtre où chaque détail renvoie à une planète, un signe, une lettre."
  };
  /* Ce qu'on voit dans le Visconti-Sforza */
  const VIS = {
    mat:"Un fou en guenilles, des plumes dans les cheveux, les jambes nues : le bouffon de cour, pas encore un voyageur.",
    bateleur:"Un homme à chapeau assis derrière une table où sont posés un couteau, des gobelets et un pain : un artisan ou un joueur de gobelets.",
    papesse:"Une religieuse en habit brun coiffée d'une tiare, un livre et une croix à la main.",
    imperatrice:"Une souveraine couronnée, le sceptre à la main et l'écu à l'aigle impérial des Visconti.",
    empereur:"Un empereur barbu sur son trône, le globe et le sceptre en main, l'aigle impérial sur le chapeau.",
    pape:"Un pape trônant sous la tiare, qui bénit et tient la croix.",
    amoureux:"Un couple se donne la main sous un Amour aux yeux bandés juché sur un piédestal : un mariage princier.",
    chariot:"Une dame couronnée sur un char triomphal tiré par des chevaux blancs : un triomphe au sens romain.",
    justice:"Une femme assise, l'épée et la balance ; au-dessus, un chevalier en armure galope.",
    ermite:"Un vieillard tient un sablier : c'est le Temps, avant d'être l'ermite.",
    roue:"La Fortune aux yeux bandés fait tourner sa roue ; quatre hommes à oreilles d'âne y montent et en tombent : je régnerai, je règne, j'ai régné, je suis sans règne.",
    force:"Un homme lève sa massue sur un lion : Hercule, la force du corps.",
    pendu:"Un homme pendu par un pied : l'image d'infamie qu'on peignait sur les murs pour humilier les traîtres.",
    sansnom:"Un squelette tient un arc et des flèches.",
    temperance:"Une femme verse l'eau d'un vase dans un autre : la vertu qui coupe le vin.",
    etoile:"Une femme élégante tient une grande étoile à huit branches.",
    lune:"Une femme tient un croissant de lune.",
    soleil:"Un enfant ailé, debout sur un nuage, élève une tête de soleil rouge.",
    jugement:"Deux anges sonnent de la trompette sous Dieu le Père ; des morts sortent du tombeau.",
    monde:"Deux angelots tiennent un globe où l'on voit une ville fortifiée entre mer et ciel.",
    diable:null, maisondieu:null
  };
  /* Le fil : ce qui relie les six images, et ce qui fait bouger le sens */
  const FIL = {
    mat:"Au XVe siècle, le fou est un exclu, à la cour ou sur les routes. Le Marseille le met en marche avec son baluchon. Etteilla le pousse au bout du jeu, après toutes les cartes. Wirth l'installe entre le Jugement et le Monde. La Golden Dawn le numérote 0 et le place en tête, au bord d'un précipice : il est devenu l'âme qui commence le voyage.",
    bateleur:"D'abord un homme de métier ou de foire, assis devant ses gobelets. Le Marseille en garde la table et les objets. Etteilla le range parmi les cartes de la vie, comme un mauvais présage. Wirth et la Golden Dawn en font un mage : les objets de la table deviennent les quatre couleurs du jeu, l'escamoteur devient celui qui relie le ciel et la terre.",
    papesse:"Une religieuse à tiare, peut-être une hérésiarque lombarde (Maifreda da Pirovano), selon l'hypothèse de Gertrude Moakley. Le Marseille la garde, Etteilla la remplace par une femme qui consulte. Wirth la met entre deux colonnes, la Golden Dawn la fait Grande Prêtresse : la femme d'Église devient gardienne d'un savoir caché.",
    imperatrice:"Une souveraine aux armes de l'Empire. Le Marseille la fige de face, l'écu à l'aigle contre elle. Etteilla range sous ce numéro une carte du quatrième jour de la Création. La Golden Dawn lui donne Vénus : la reine politique devient la mère et la nature.",
    empereur:"Le pouvoir temporel, l'aigle des Visconti. Le Marseille le met de profil, les jambes croisées. Wirth le fait trôner sur un cube. La Golden Dawn lui donne le Bélier et des têtes de bélier sur son trône : l'empereur devient un principe d'élan et d'ordre.",
    pape:"Le chef de l'Église. Il ne change guère jusqu'au XIXe siècle. La Golden Dawn le rebaptise Hiérophante, le prêtre des mystères antiques : il garde la tiare et les deux clercs, mais ce qu'il enseigne n'est plus le dogme, c'est la tradition initiatique.",
    amoureux:"Un mariage princier sous un Amour aveugle. Le Marseille introduit un jeune homme entre deux femmes : on y voit un choix. La Golden Dawn revient à un couple, Adam et Ève sous un ange : le sens glisse du dilemme vers l'union.",
    chariot:"Un triomphe à la romaine, avec une dame sur son char. Le Marseille y met un prince armé. Wirth et la Golden Dawn remplacent les chevaux par deux sphinx, noir et blanc : la victoire devient la maîtrise de deux forces contraires.",
    justice:"Une vertu cardinale, avec l'épée et la balance, et toujours reconnaissable. Le seul changement est son numéro : VIII au Marseille, XI chez la Golden Dawn, qui l'échange avec la Force pour que la Balance tombe à la bonne place du zodiaque.",
    ermite:"Le Visconti montre le Temps, un vieillard au sablier. Au Marseille, le sablier devient une lanterne : le Temps devient un ermite qui cherche. La Golden Dawn le pose au sommet d'une montagne, une étoile dans sa lanterne.",
    roue:"Une Fortune aveugle et ses quatre rois d'un jour : une leçon morale sur l'instabilité du pouvoir. Le Marseille ne garde que la roue et trois créatures. Wirth et la Golden Dawn y mettent un sphinx, Anubis, un serpent et des lettres : la morale devient une loi cosmique des cycles.",
    force:"Hercule et sa massue : la force du corps. Le Marseille en fait une femme qui ouvre la gueule d'un lion à mains nues : la force devient douceur. La Golden Dawn la passe au numéro VIII pour lui donner le Lion.",
    pendu:"Une image d'infamie : on peignait les traîtres pendus par un pied. Le Marseille garde la pose. Etteilla en fait la Prudence. La Golden Dawn lui donne une auréole : le supplice devient un sacrifice volontaire, un renversement du regard.",
    sansnom:"Un squelette archer, la Mort qui frappe tout le monde. Le Marseille le fait faucher et ne lui donne pas de nom. La Golden Dawn le met en cavalier en armure, devant un roi tombé et un soleil qui se lève entre deux tours : la fin devient passage.",
    temperance:"Une vertu cardinale qui verse l'eau dans le vin. Le Marseille lui donne des ailes : elle devient un ange. La Golden Dawn y ajoute un pied dans l'eau, un pied sur la terre, et l'associe au Sagittaire : la modération devient une alchimie des contraires.",
    diable:"Le Diable du Visconti a disparu, comme la Tour. Le Marseille en fixe le modèle : un démon hermaphrodite et deux petits diables enchaînés. Wirth le rapproche du Baphomet d'Éliphas Lévi, la Golden Dawn aussi : le démon chrétien devient la matière qui enchaîne.",
    maisondieu:"Disparue du Visconti. Au Marseille, la foudre décapite une tour, des personnages tombent. Etteilla y lit la Misère et la prison, Wirth la tour de Babel. La Golden Dawn lui donne Mars : la punition divine devient l'effondrement brutal d'une construction.",
    etoile:"Une dame tient une étoile. Le Marseille la déshabille et lui met deux cruches entre les mains, au bord de l'eau, sous huit étoiles. Toutes les versions suivantes gardent ce modèle, que la Golden Dawn attache au Verseau, le porteur d'eau.",
    lune:"Une dame tient un croissant. Le Marseille invente un paysage inquiétant : deux chiens, deux tours, une écrevisse dans l'étang. Wirth et la Golden Dawn gardent ce paysage, qui devient la carte de l'inconscient et du doute.",
    soleil:"Un enfant ailé élève le soleil. Le Marseille met deux enfants devant un muret. La Golden Dawn revient à un seul enfant, nu, sur un cheval blanc : la joie retrouve sa simplicité.",
    jugement:"La résurrection des morts, de la peinture d'église au jeu populaire. Le modèle traverse presque intact les six jeux. La Golden Dawn lui donne le Feu, Etteilla en fait une carte de la vie des hommes.",
    monde:"Deux angelots portent une ville dans un globe : le monde terrestre. Le Marseille dessine une figure nue dans une mandorle, entourée des quatre évangélistes. La Golden Dawn lui donne Saturne : la carte devient l'achèvement du voyage."
  };
  const RN = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];

  function cell(col, id){
    let src = null, name = "", desc = "", note = "";
    const has = p => true;
    try{
      if(col.k === "visconti"){ const v = DECK_NAMES.visconti[id]; if(v){ src = "jeux/visconti/" + id + ".webp"; name = v; } desc = VIS[id] || "Carte perdue : on ne connaît pas l'image du Visconti-Sforza."; }
      if(col.k === "sb"){ src = "jeux/sb/" + id + ".webp"; name = SB.noms[id]; desc = SB.cartes[id][0]; note = "Même numéro, autre sujet"; }
      if(col.k === "conver"){ src = "lames/" + String(BASE_N[id]).padStart(2, "0") + ".webp"; name = BASE_NOM[id]; desc = (byId(id).symb || ""); }
      if(col.k === "et"){ const E = ET.maj[id]; src = "jeux/et/" + id + ".webp"; name = E.nom; desc = E.symb || ""; note = `Carte ${E.num || E.n}${ET.incertain.includes(id) ? " · correspondance incertaine" : ""}`; }
      if(col.k === "wirth"){ src = "jeux/wirth/" + id + ".webp"; name = DECK_NAMES.wirth[id]; desc = WO.cartes[id] ? WO.cartes[id][0] : ""; }
      if(col.k === "rws"){ src = "jeux/rws/" + id + ".webp"; name = DECK_NAMES.rws[id]; desc = RWS_NOTE[id] || ""; }
    }catch(e){}
    return `<figure class="cmp-col" data-col="${col.k}">
      <div class="cmp-art">${src ? `<img src="${src}" alt="${esc(name)}, ${col.nom}" loading="lazy">` : `<div class="cmp-lost"><span>Carte perdue</span></div>`}</div>
      <figcaption><span class="cmp-date">${col.date}</span><b>${name || "—"}</b><span class="cmp-deck">${col.nom}${note ? ` · ${note}` : ""}</span><p>${desc}</p></figcaption></figure>`;
  }
  function compare(id){
    const k = {nom:BASE_NOM[id]}, n = BASE_N[id];
    return `<div class="cmp" data-cmp="${id}">
      <div class="cmp-time" aria-hidden="true">${COLS.map(c => `<i style="--x:${((c.y - 1440)/(1920 - 1440)*100).toFixed(1)}%"><b>${c.date}</b></i>`).join("")}</div>
      <div class="cmp-row">${COLS.map(c => cell(c, id)).join("")}</div>
      <div class="cmp-why">
        <div class="cmp-fil"><p class="eyebrow">Le fil · ${RN[n]} ${k.nom}</p><p>${FIL[id]}</p>
          <p><button type="button" class="linkbtn" data-sheet="${id}">Ouvrir la fiche ${k.nom}</button></p></div>
        <details class="cmp-raisons"><summary>Pourquoi chaque jeu dessine autrement</summary>
          <dl>${COLS.map(c => `<dt>${c.nom} <span>${c.date}</span></dt><dd>${RAISON[c.k]}</dd>`).join("")}</dl></details>
      </div></div>`;
  }
  P.compare = compare;
  P.onReady.push(() => {
    if(typeof compareHTML === "function") { window.compareHTML = compare; try{ compareHTML = compare; }catch(e){} }
  });
})();

/* ===== Chantiers 2 et 3 · Les dossiers du Sola Busca et du Grand Etteilla =====
   Chaque affirmation porte son statut : documenté (on le lit sur les cartes ou dans les archives),
   hypothèse savante (proposée par des historiens, discutée), spéculation (une lecture d'auteur). */
(() => {
  const P = window.ArcanesPlus;
  const ST = {
    doc:["Documenté","st-doc","Ce qu'on lit sur les cartes ou dans les archives."],
    hyp:["Hypothèse savante","st-hyp","Proposée par des historiens de l'art, discutée."],
    spe:["Spéculation","st-spe","Une lecture d'auteur, sans preuve directe."],
    sur:["Identifié","st-doc",""], prob:["Probable","st-hyp",""], inc:["Incertain","st-spe",""], inconnu:["Non identifié","st-non",""]
  };
  const badge = k => `<span class="st ${ST[k][1]}">${ST[k][0]}</span>`;
  const img = id => `jeux/sb/${id}.webp`;

  /* ---------------- Sola Busca ---------------- */
  const LECTURES = [
    {st:"doc", t:"Une commande humaniste", sous:"Trahor fatis : « je suis entraîné par les destins »",
      p:[`Ce qu'on lit sur les cartes : des noms latins de la fin de la République romaine, des sigles comme S.C., « par décret du Sénat », plusieurs inscriptions qui renvoient à la République de Venise, et quatre fois la devise <i lang="la">TRAHOR FATIS</i>, « les destins m'entraînent ».`,
        `Elle provient d'une expression latine classique liée à la philosophie stoïcienne et à la poésie antique, qui évoque la puissance inéluctable du destin (<i lang="la">fatum</i>) auquel l'être humain ne peut se soustraire. Elle fait directement écho à une autre sentence latine très connue, attribuée au philosophe Sénèque :`,
        `<blockquote class="dos-quote"><p><i lang="la">Ducunt volentem fata, nolentem trahunt.</i></p><p>« Le destin conduit celui qui y consent, et entraîne celui qui résiste. »</p></blockquote>`,
        `Contrairement à une idée de résignation passive, cette formule invite, dans la pensée ancienne, à accepter les événements que l'on ne peut pas contrôler pour mieux concentrer son énergie sur ses propres actions.`,
        `<h4 class="dos-h4">L'étoile à sept branches</h4>`,
        `L'étoile à sept branches (l'heptagramme) représente l'ordre du cosmos qui dicte le destin humain :`,
        `<ul class="dos-ul"><li>Les sept planètes traditionnelles de l'astrologie ancienne : la Lune, Mercure, Vénus, le Soleil, Mars, Jupiter, Saturne. Dans la philosophie de la Renaissance, fortement imprégnée du <i>Songe de Scipion</i> de Cicéron et de Macrobe, l'âme humaine traverse ces sept sphères planétaires et subit leur influence astrale en descendant sur Terre.</li><li>L'étoile matérialise graphiquement les forces célestes qui « tirent » les personnages vers leur destin, le <i lang="la">fatum</i>.</li></ul>`,
        `<h4 class="dos-h4">La comète</h4>`,
        `L'apparition d'une comète, une « étoile chevelue », du latin <i lang="la">stella crinita</i>, est le symbole absolu du destin inéluctable des dirigeants et de la fin d'une ère.`,
        `L'exemple le plus célèbre que le créateur du jeu avait en tête est le <i lang="la">Sidus Iulium</i>, la comète de Jules César, apparue peu après son assassinat, interprétée à la fois comme le signe de sa divinisation et de la chute définitive de la République romaine. Elle illustre la marche implacable du temps, face à laquelle même les plus grands héros romains (comme Caton ou Postumius, qui portent cette inscription dans le jeu) ne peuvent rien.`,
        `<h4 class="dos-h4">Rome et Venise</h4>`,
        `La présence des sigles de la République de Venise (<i lang="la">Senatus Venetus</i>) aux côtés de ceux de Rome (S.C., <i lang="la">Senatus Consultum</i>) n'est pas un hasard. Au XVe siècle, la République de Venise aimait se présenter comme la « Nouvelle Rome », l'héritière légitime des institutions républicaines antiques.`,
        `Cependant, à l'époque de la création de ces cartes, Venise traverse de graves crises géopolitiques : les guerres d'Italie, l'avancée ottomane. Les étoiles à sept branches et le rappel du destin tragique des héros romains font office d'avertissement humaniste et politique : les empires terrestres, aussi puissants soient-ils, qu'il s'agisse de Rome ou de Venise, sont soumis aux cycles du cosmos et à la fatalité.`,
        `<p class="dos-sum">En résumé, cette poignée d'étoiles chevelues est la représentation graphique de la fatalité astrale. C'est un avertissement destiné à un lecteur humaniste : la fortune politique et le pouvoir ne sont rien face aux décrets du temps et des étoiles.</p>`]},
    {st:"hyp", t:"Une lecture alchimique", sous:"Le secret des secrets",
      p:[`Des historiens italiens ont proposé de lire le jeu comme un parcours alchimique : les vases, les feux, les fourneaux et le soleil noir des cartes correspondraient aux étapes de l'Œuvre. Sofia Di Vincenzo a développé cette lecture en 1998, et l'exposition de la Pinacothèque de Brera, en 2012, l'a mise en avant dès son titre : <i lang="it">Il segreto dei segreti</i>.`,
        `Ce titre renvoie au <i lang="la">Secretum secretorum</i>, un traité attribué à Aristote, très lu à la Renaissance, présenté comme ses conseils à Alexandre le Grand, alchimie comprise. Or Alexandre et sa famille occupent les figures du jeu : c'est le principal argument. L'hypothèse est sérieuse, mais elle repose sur des rapprochements d'images, sans texte de l'époque qui la confirme.`]},
    {st:"spe", t:"Un rituel de magie astrale", sous:"Peter Mark Adams, The Game of Saturn (2017)",
      p:[`Pour Peter Mark Adams, le jeu serait l'instrument d'un rite théurgique pratiqué par un cercle de l'élite vénitienne : l'orthographe volontairement ambiguë des noms et certains objets glissés dans les images seraient des signaux pour initiés, en lien avec la magie astrale de Marsile Ficin et le culte de Saturne.`,
        `Le livre est riche et stimulant, mais ses preuves sont indirectes : des coïncidences de noms, de dates, d'images. Les historiens du jeu de cartes ne l'ont pas suivi.`,
        `<h4 class="dos-h4">Saturne</h4>`,
        `Dans l'astrologie antique et médiévale, Saturne est la planète la plus lointaine, la plus sombre et la plus redoutée. Elle est associée à la mélancolie, à la vieillesse, au temps qui détruit tout (Chronos), à la fatalité, et parfois à des figures divines plus sombres, comme le dieu phénicien Ba'al Hammon ou Moloch.`,
        `<ul class="dos-ul dos-ul-k"><li><b>Le paradoxe des humanistes.</b> Ficin et les intellectuels de la Renaissance ont réhabilité Saturne. Ils considéraient que les grands génies, les philosophes et les artistes étaient tous nés sous l'influence de Saturne : les « mélancoliques ».</li>
          <li><b>Dans le jeu Sola Busca.</b> Peter Mark Adams soutient une thèse encore plus radicale dans son livre <i>The Game of Saturn</i> : le jeu aurait été commandé par une élite vénitienne adepte d'un véritable culte ésotérique secret, utilisant les cartes comme un grimoire rituel dédié à Saturne pour s'assurer le pouvoir politique face à la fatalité.</li>
          <li><b>Coïncidences d'images : l'alchimie et la violence.</b> Contrairement à tous les tarots de l'époque, qui montrent le Pape, l'Impératrice, le Jugement, les atouts du Sola Busca représentent des guerriers antiques romains ou hellénistiques dans des postures souvent brutales ou bizarres (décapitations, rituels). Les partisans de la thèse ésotérique y voient des allégories alchimiques précises, comme le dragon ou le basilic, ou des rites théurgiques d'ascension de l'âme ; les historiens classiques y voient simplement un hommage érudit à l'histoire romaine (Tite-Live, Plutarque).</li>
          <li><b>Coïncidences de dates et de cercles intellectuels.</b> Le jeu a été gravé vers 1491 en Italie du Nord (Ferrare ou Venise). C'est précisément l'époque où les écrits de Ficin sur la magie astrale (<i lang="la">De vita libri tres</i>, 1489) circulent partout parmi les élites. Le concepteur présumé du texte des cartes, le poète humaniste Ludovico Lazzarelli, était lui-même un disciple de la magie hermétique.</li>
          <li><b>La coïncidence des noms et de la devise.</b> La fameuse devise <i lang="la">TRAHOR FATIS</i>, « je suis entraîné par le destin », répétée quatre fois sur les cartes et associée à ces étoiles-comètes à sept branches, correspond exactement à l'obsession de la Renaissance ficinienne pour les sept sphères planétaires et la soumission de l'homme aux forces astrales de Saturne et de la Fatalité.</li></ul>`]}
  ];
  /* Qui est qui : les atouts */
  const ATOUTS = [
    ["mat","Mato","Le fou","Ce n'est pas un nom propre : matto veut dire « fou » en italien.","sur"],
    ["empereur","Mario","Caius Marius, sept fois consul, vainqueur des Cimbres","Le grand général de la fin de la République.","prob"],
    ["pape","Catulo","Quintus Lutatius Catulus, collègue de Marius contre les Cimbres","","prob"],
    ["justice","Nerone","Néron, le dernier empereur de la dynastie julio-claudienne","Le seul empereur de la série, et le seul qui ne soit pas de la République.","prob"],
    ["pendu","Carbone","Cnaeus Papirius Carbo, consul, allié de Marius, exécuté sur ordre de Pompée","","prob"],
    ["sansnom","Catone","Caton d'Utique, qui se donna la mort par l'épée plutôt que de se soumettre à César","L'image montre un homme qui se transperce.","prob"],
    ["temperance","Bocho","Bocchus, roi de Maurétanie, qui livra Jugurtha aux Romains","","prob"],
    ["diable","Metelo","Un Caecilius Metellus, peut-être Metellus le Numidique, adversaire de Jugurtha","La famille a donné beaucoup de consuls : impossible de trancher.","inc"],
    ["lune","Lentulo","Un Cornelius Lentulus, peut-être le complice de Catilina","","inc"],
    ["jugement","Nenbroto","Nemrod, le roi de la tour de Babel","Un roi de la Bible, puni pour son orgueil.","sur"],
    ["monde","Nabuchodenasor","Nabuchodonosor, roi de Babylone, changé en bête pour son orgueil","","sur"],
    ["bateleur","Panfilio","","",""], ["papesse","Postumio","Un Postumius ?","","inc"], ["imperatrice","Lenpio","","",""], ["amoureux","Sesto","Un Sextus ?","","inc"],
    ["chariot","Deo Tauro","« Le dieu Taureau » ?","Le nom est peut-être une divinité plutôt qu'un homme.","inc"], ["ermite","Falco","","",""], ["roue","Venturio","Publius Ventidius ?","","inc"],
    ["force","Tulio","Un Tullius : Cicéron, ou le roi Servius Tullius ?","","inc"], ["maisondieu","Olivo","","",""], ["etoile","Ipeo","","",""], ["soleil","Sabino","Un Sabinus ?","","inc"]
  ];
  /* Qui est qui : les figures (le valet n'a pas de nom) */
  const FIGURES = [
    ["epees14","ALECXANDRO M","Alexandre le Grand","Le roi d'Épées, en armure, entre deux sphinx ailés.","sur"],
    ["epees13","OLINPIA","Olympias, sa mère","Réputée magicienne dans les récits antiques.","sur"],
    ["epees12","AMONE","Zeus Ammon, que la légende donne pour père à Alexandre ?","Le British Museum, qui en possède une épreuve, propose aussi Amon, roi de Juda : rien n'est sûr.","inc"],
    ["coupes12","NATANABO","Nectanébo II, le dernier pharaon","Dans le Roman d'Alexandre, ce prêtre-magicien séduit Olympias et devient le vrai père du héros.","sur"],
    ["deniers14","R. FILIPO","Philippe II de Macédoine, le père officiel","Sous une bannière marquée PAX.","sur"],
    ["deniers13","ELENA","Hélène de Troie","Les romans médiévaux mêlaient la guerre de Troie et la vie d'Alexandre.","prob"],
    ["coupes13","POLISENA","Polyxène, princesse troyenne","","prob"],
    ["batons13","PALAS","Pallas Athéna","","prob"],
    ["batons12","APOLLINO","Apollon","Philippe consulte son oracle pour savoir qui régnera après lui.","prob"],
    ["deniers12","SARAFINO","Non identifié","","inconnu"],
    ["batons14","LEVIO PLAVTO R.","Un Romain, non identifié","","inconnu"],
    ["coupes14","LUCIO CECILIO R.","Un Romain, peut-être un Caecilius","","inc"]
  ];
  const PAMELA = [
    {a:"epees3", b:"epees3", t:"Le Trois d'Épées", ab:"Trois d'Épées → Trois d'Épées",
      sb:"Un cœur percé par trois épées, sur fond de ciel, au-dessus d'une guirlande. En 1491, c'est une carte numérale : elle sert à compter dans un jeu de levées, et on ne lui connaît aucun sens divinatoire. Le cœur percé appartient à l'imagerie amoureuse et religieuse du temps.",
      ws:"Pamela Colman Smith reprend le cœur et les trois lames presque à l'identique, ajoute des nuages et la pluie. Waite y lit la séparation, l'absence, la rupture. L'image est copiée ; le sens, lui, est donné en 1909."},
    {a:"epees10", b:"batons10", t:"Du Dix d'Épées au Dix de Bâtons", ab:"Dix d'Épées → Dix de Bâtons",
      sb:"Un homme courbé serre contre lui dix épées enveloppées dans une toile, le dos tourné, le visage caché.",
      ws:"Smith garde la posture exacte, le dos rond, la tête enfouie dans le fardeau, mais change de couleur : les épées deviennent dix bâtons, et une ville apparaît au loin. Pour Waite, c'est l'oppression, la charge trop lourde. L'emprunt est visuel : il saute même d'une couleur à l'autre."},
    {a:"coupes13", b:"coupes13", t:"La Reine de Coupe", ab:"Reine de Coupe → Reine de Coupe",
      sb:"Polisena, Polyxène, la princesse troyenne, est assise de profil, couronnée, tournée vers la gauche. Devant elle, sur un pied rouge, une coupe ouvragée d'où montent des flammes ; derrière elle, une queue de poisson, et à son siège une roue. Comme toutes les figures du jeu, elle sert d'abord à jouer : on ne lui connaît pas de sens divinatoire.",
      ws:"Smith garde la reine assise de profil, couronnée, les yeux fixés sur une coupe ouvragée, et la seule coupe fermée de tout le jeu. La queue de poisson devient la mer à ses pieds et les enfants-sirènes sculptés sur son trône. Waite en fait une femme aimante et intuitive, qui voit dans sa coupe : l'image vient de 1491, la lecture de 1909."}
  ];

  function sbLectures(){
    return `<section class="ar-text dos" id="he-lectures"><h2 class="lsub">Trois lectures</h2>
      <p>On ne sait pas ce que ses créateurs voulaient dire. Trois lectures circulent ; elles n'ont pas le même poids. Chacune porte ici son statut.</p>
      <div class="dos-legend">${["doc","hyp","spe"].map(k => `<span>${badge(k)} ${ST[k][2]}</span>`).join("")}</div>
      <div class="dos-reads dos-fold">${LECTURES.map((L, i) => `<details class="dos-read ${ST[L.st][1]}"><summary><span class="dos-n">${["I","II","III"][i]}</span><span class="dos-sum-t">${badge(L.st)}<h3>${L.t}</h3><span class="dos-sous">${L.sous}</span></span><span class="dos-chev" aria-hidden="true"></span></summary>
        <div class="dos-body">${L.p.map(x => /^\s*</.test(x) ? x : `<p>${x}</p>`).join("")}</div></details>`).join("")}</div></section>`;
  }
  function sbQui(){
    const row = ([id, nom, qui, note, st], fig) => `<li class="qq-item"><button type="button" class="qq-art" data-sheet="${id}" aria-label="Ouvrir la fiche"><img src="${img(id)}" alt="" loading="lazy"></button>
      <div><p class="qq-nom">${fig ? nom : `<span class="qq-num">${ROMAN_BASE[BASE_N[id]] || "0"}</span> ${nom}`}</p><p class="qq-qui">${qui || "Personnage non identifié"}${st ? " " + badge(st) : " " + badge("inconnu")}</p>${note ? `<p class="qq-note">${note}</p>` : ""}</div></li>`;
    const known = ATOUTS.filter(a => a[4] === "sur" || a[4] === "prob"), rest = ATOUTS.filter(a => !(a[4] === "sur" || a[4] === "prob"));
    return `<section class="ar-text dos" id="he-figures"><h2 class="lsub">Qui est qui</h2>
      <p>Les noms sont gravés sur les cartes ; les identifications sont des déductions. Beaucoup de familles romaines ont porté le même nom pendant des siècles : pour certains atouts, plusieurs candidats sont possibles, pour d'autres aucun.</p>
      <h3 class="dos-h3">Les atouts : Rome et deux rois de la Bible</h3>
      <ol class="qq">${known.map(a => row(a)).join("")}</ol>
      <details class="dos-more"><summary>Les atouts qu'on ne sait pas identifier (${rest.length})</summary><ol class="qq">${rest.map(a => row(a)).join("")}</ol></details>
      <h3 class="dos-h3">Les figures : le cercle d'Alexandre</h3>
      <p>Les rois, reines et cavaliers portent eux aussi un nom ; les valets n'en ont pas. Autour d'Alexandre le Grand se rassemblent sa mère, ses deux pères, celui de l'histoire et celui de la légende, et des héroïnes de Troie, que les romans médiévaux mêlaient à son histoire.</p>
      <ol class="qq qq-fig">${FIGURES.map(f => row(f, true)).join("")}</ol></section>`;
  }
  function sbPamela(){
    return `<section class="ar-text dos" id="he-pamela"><h2 class="lsub">Ce que Pamela en a fait</h2>
      <p>En 1907, la famille Busca fait don au British Museum de photographies de toutes les cartes. Deux ans plus tard, Pamela Colman Smith dessine le Waite-Smith. Certaines de ses mineures reprennent le Sola Busca trait pour trait. Fais glisser pour passer d'une image à l'autre.</p>
      <div class="pm-list">${PAMELA.map((m, i) => `<article class="pm">
        <div class="pm-stage" style="--v:0"><img class="pm-a" src="jeux/sb/${m.a}.webp" alt="Sola Busca, ${m.ab.split(" → ")[0]}"><img class="pm-b" src="jeux/ws/${m.b}.webp" alt="Waite-Smith, ${m.ab.split(" → ")[1]}">
          <span class="pm-tag pm-ta">Sola Busca · 1491</span><span class="pm-tag pm-tb">Waite-Smith · 1909</span></div>
        <label class="pm-ctl"><span>1491</span><input type="range" class="pm-range" min="0" max="100" value="0" aria-label="Passer du Sola Busca au Waite-Smith : ${m.t}"><span>1909</span></label>
        <div class="pm-txt"><p class="eyebrow">${m.ab}</p><h3>${m.t}</h3><p><b>Sola Busca.</b> ${m.sb}</p><p><b>Waite-Smith.</b> ${m.ws}</p></div></article>`).join("")}</div>
      <p class="dos-conc">L'emprunt est visuel, pas symbolique. Smith cherchait des scènes pour donner un visage aux petites cartes, que les tarots de son temps ne montraient que par des emblèmes ; le Sola Busca était le seul jeu ancien à en offrir. Le sens, lui, vient de Waite et de la Golden Dawn : ni l'un ni l'autre ne prétendait retrouver celui de 1491.</p></section>`;
  }
  function sbExplorer(){
    const ids = CARDS.map(c => c.id).sort((a, b) => BASE_N[a] - BASE_N[b]).filter(id => HOT.sb && HOT.sb[id]);
    return `<section class="ar-text dos" id="he-explorer"><h2 class="lsub">Explorer les atouts</h2>
      <p>Chaque atout se lit détail par détail : touche une carte, puis les points posés sur l'image.</p>
      <div class="xg">${ids.map(id => `<button type="button" class="xg-c" data-xpopen="${id}"><img src="${img(id)}" alt="" loading="lazy"><span>${ROMAN_BASE[BASE_N[id]] || "0"} · ${SB.noms[id]}</span><i aria-hidden="true">${HOT.sb[id].length}</i></button>`).join("")}</div></section>`;
  }

  /* ---------------- Grand Etteilla ---------------- */
  const etn = id => { try{ return etNum(id); }catch(e){ return 0; } };
  const PARTS = [
    {t:"Le Chaos", r:"1", f:n => n === 1},
    {t:"Les sept jours de la Création", r:"2 à 8", f:n => n >= 2 && n <= 8},
    {t:"Les quatre vertus", r:"9 à 12", f:n => n >= 9 && n <= 12},
    {t:"La vie des hommes", r:"13 à 21", f:n => n >= 13 && n <= 21},
    {t:"Les petites cartes", r:"22 à 77", f:() => false},
    {t:"La Folie", r:"78", f:n => n === 78}
  ];
  const SG = () => P.pont.SGL, SN = () => P.pont.SIGNES;
  const EL = {Feu:"🜂", Eau:"🜄", Air:"🜁", Terre:"🜃"};
  function etInfo(id){
    const E = ET.maj[id], pl = E.place || "";
    const el = (/élément (Feu|Eau|Air|Terre)/.exec(pl) || [])[1] || "";
    const jour = (/le (premier|deuxième|troisième|quatrième|cinquième|sixième|septième) jour/.exec(pl) || [])[1] || "";
    let sg = -1; SN().forEach((s, i) => { if(new RegExp("signe (du|de la|des|de l') ?" + s).test(pl)) sg = i; });
    return {E, el, jour, sg, n:etn(id)};
  }
  function etSchema(){
    const ids = Object.keys(ET.maj).sort((a, b) => etn(a) - etn(b));
    const card = id => { const I = etInfo(id);
      return `<button type="button" class="ls-c" data-sheet="${id}"><img src="jeux/et/${id}.webp" alt="" loading="lazy"><span class="ls-n">${I.n}</span><b>${I.E.nom}</b>
        <span class="ls-tags">${I.jour ? `<i>${I.jour} jour</i>` : ""}${I.el ? `<i class="ls-el">${EL[I.el]}︎ ${I.el}</i>` : ""}${I.sg >= 0 ? `<i class="ls-sg">${SG()[I.sg]}︎ ${SN()[I.sg]}</i>` : ""}</span></button>`; };
    const suits = [["batons","Bâtons","22–35"],["coupes","Coupes","36–49"],["epees","Épées","50–63"],["deniers","Deniers","64–77"]];
    return `<section class="ar-text dos" id="th-schema"><h2 class="lsub">Le livre ouvert</h2>
      <p>Mis dans l'ordre d'Etteilla, les 78 cartes se lisent comme un livre en six chapitres : avant le monde, la Création jour après jour, les vertus qui règlent la vie, les événements de l'existence, les petites cartes de la vie quotidienne, et la Folie qui ferme le tout. Les cartes 2 à 5 portent un élément ; de 2 à 12, la plupart portent un signe du zodiaque.</p>
      <ol class="ls">${PARTS.map((Pt, i) => `<li class="ls-part${i === 4 ? " ls-min" : ""}"><p class="ls-h"><span>${Pt.r}</span>${Pt.t}</p>
        ${i === 4 ? `<div class="ls-suits">${suits.map(([s, nom, r]) => `<button type="button" class="ls-suit" data-sheet="${s}1"><img src="jeux/et/${s}1.webp" alt="" loading="lazy"><b>${nom}</b><span>${r}</span></button>`).join("")}</div>`
          : `<div class="ls-cards">${ids.filter(id => Pt.f(etn(id))).sort((a, b) => i === 1 ? (etInfo(a).jour ? ET_JOURS.indexOf(etInfo(a).jour) : 9) - (etInfo(b).jour ? ET_JOURS.indexOf(etInfo(b).jour) : 9) : 0).map(card).join("")}</div>`}</li>`).join("")}</ol>
      <p class="help">Les jours, les éléments et les signes sont ceux qu'on lit sur les cartes de l'édition Pussey reproduite ici. Ici, les cartes de la Création sont rangées dans l'ordre des jours ; leurs numéros, eux, ne le suivent pas : le firmament, deuxième jour, porte le numéro 4, et la terre peuplée, sixième jour, le numéro 5. Ses signes ne suivent pas non plus la Golden Dawn, qui viendra un siècle plus tard.</p></section>`;
  }
  function etRetourner(){
    const ids = Object.keys(ET.maj).sort((a, b) => etn(a) - etn(b));
    return `<section class="ar-text dos" id="th-retourner"><h2 class="lsub">Endroit, envers</h2>
      <p>Dans ce jeu, retourner la carte fait partie de la lecture : chaque carte porte deux inscriptions, une en haut, une en bas, tête-bêche. Touche une carte pour la renverser et lire l'autre mot, celui qui était gravé à l'envers.</p>
      <p><button type="button" class="btn ghost small" data-rv-all>Tout renverser</button></p>
      <div class="rv">${ids.map(id => { const E = ET.maj[id], same = E.sur[0] === E.sur[1];
        return `<button type="button" class="rv-c" data-rv aria-pressed="false" aria-label="${esc(E.nom)} : renverser la carte"><span class="rv-img"><img src="jeux/et/${id}.webp" alt="" loading="lazy"></span><span class="rv-n">${etn(id)}</span>
          <span class="rv-w"><b class="rv-u">${E.sur[0]}</b><b class="rv-r">${same ? E.sur[1] + " <small>même mot</small>" : E.sur[1]}</b></span></button>`; }).join("")}</div></section>`;
  }
  function etConcordance(){
    const ids = Object.keys(ET.maj).sort((a, b) => etn(a) - etn(b));
    const ws = id => (DECK_NAMES.rws[id] || "").replace(/^[XVI]+ · /, "");
    return `<section class="ar-text dos" id="th-concordance"><h2 class="lsub">Concordance</h2>
      <p>La même carte dans trois systèmes. Pour cinq cartes, Etteilla n'a pas d'équivalent sûr : la correspondance indiquée est celle qu'Arcanes utilise pour ranger le jeu, pas une vérité historique.</p>
      <div class="ccd" role="table" aria-label="Concordance Etteilla, Marseille, Waite-Smith">
        <div class="cc-h" role="row"><span role="columnheader">Etteilla</span><span role="columnheader">Marseille</span><span role="columnheader">Waite-Smith</span></div>
        ${ids.map(id => { const E = ET.maj[id], unsure = ET.incertain.includes(id), k = byId(id);
          return `<div class="cc-r${unsure ? " cc-unsure" : ""}" role="row"><span role="cell"><button type="button" class="cc-btn" data-sheet="${id}"><img src="jeux/et/${id}.webp" alt="" loading="lazy"><span><small>${etn(id)}</small> ${E.nom}</span></button></span>
            <span role="cell"><img src="lames/${String(BASE_N[id]).padStart(2, "0")}.webp" alt="" loading="lazy"><span><small>${BASE_N[id] ? ROMAN_BASE[BASE_N[id]] : "—"}</small> ${BASE_NOM[id]}${unsure ? ` <em class="st st-spe">sans équivalent sûr</em>` : ""}</span></span>
            <span role="cell"><img src="jeux/rws/${id}.webp" alt="" loading="lazy"><span><small>${({force:"VIII", justice:"XI"})[id] || (BASE_N[id] ? ROMAN_BASE[BASE_N[id]] : "0")}</small> <span lang="en">${ws(id)}</span></span></span></div>`; }).join("")}
      </div></section>`;
  }

  P.dossiers = {sbLectures, sbQui, sbPamela, sbExplorer, etSchema, etRetourner, etConcordance};

  /* les commandes : une délégation, posée une fois */
  P.onReady.push(() => {
    document.addEventListener("input", e => { const r = e.target.closest && e.target.closest(".pm-range"); if(!r) return;
      r.closest(".pm").querySelector(".pm-stage").style.setProperty("--v", r.value/100); });
    document.addEventListener("click", e => {
      const c = e.target.closest && e.target.closest("[data-rv]");
      if(c){ const on = c.getAttribute("aria-pressed") !== "true"; c.setAttribute("aria-pressed", on); return; }
      const all = e.target.closest && e.target.closest("[data-rv-all]");
      if(all){ const cs = [...document.querySelectorAll("[data-rv]")], on = !cs.every(x => x.getAttribute("aria-pressed") === "true");
        cs.forEach((x, i) => setTimeout(() => x.setAttribute("aria-pressed", on), i*35)); all.textContent = on ? "Tout remettre à l'endroit" : "Tout renverser"; return; }
      const x = e.target.closest && e.target.closest(".dos [data-xpopen]");
      if(x && typeof openExplore === "function") openExplore(x.dataset.xpopen);
    });
  });
})();

/* ===== Chantier 5 · L'atelier de l'astrologue =====
   Une page à onglets, ouverte depuis L'école : la glyphothèque, la révision espacée,
   le tracé des symboles et deux thèmes historiques.
   La même page accueille les outils de l'expert (chantier 7), ouverts depuis Mon thème. */
(() => {
  const P = window.ArcanesPlus;
  const STORE = "arcanes.plus.v1";
  const load = () => { try{ return JSON.parse(localStorage.getItem(STORE) || "{}") || {}; }catch(e){ return {}; } };
  let S = load();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(S)); }catch(e){} };
  P.store = {get:k => S[k], set:(k, v) => { S[k] = v; save(); }};
  const hx = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const T = "︎";
  const norm = a => ((a % 360) + 360) % 360;
  const SGN = () => ASTRO_CALC.SG, PLS = () => ASTRO_CALC.PL;
  const fmt = l => { l = norm(l); const d = Math.floor(l % 30), m = Math.floor((l % 1)*60); return `${d}°${String(m).padStart(2, "0")}′ ${SGN()[Math.floor(l/30)].gl}${T} ${SGN()[Math.floor(l/30)].nom}`; };
  P.fmt = fmt; P.hx = hx;

  /* ================= la page ================= */
  const PAGES = {
    atelier:{nav:"apprendre", titre:"L'atelier", lede:"Apprendre les symboles et lire les maîtres sur leurs propres cartes.",
      tabs:[["cles","Les trois clés"],["glyphes","Les glyphes"],["histo","Thèmes historiques"]]},
    outils:{nav:"theme", titre:"Les outils", lede:"Pour aller plus loin : les éphémérides et le calendrier du ciel, les comparaisons de thèmes, les questions horaires, et tous les réglages.",
      tabs:[["ephem","Éphémérides"],["calendrier","Calendrier"],["synastrie","Synastrie"],["revolution","Révolution solaire"],["horaire","Horaire"],["elective","Élective"],["reglages","Réglages"]]}
  };
  P.pages = PAGES; P.renderers = P.renderers || {};
  let cur = {page:null, tab:null};
  function sec(){ return document.getElementById("v-a-plus"); }
  function open(page, tab){
    const Pg = PAGES[page]; if(!Pg) return;
    tab = tab || (cur.page === page && cur.tab) || Pg.tabs[0][0];
    if(!Pg.tabs.some(([k]) => k === tab)) tab = Pg.tabs[0][0];
    cur = {page, tab};
    const A = window.ArcanesAstro; if(A && A.state().univers !== "astro") A.enterAstro(Pg.nav, true);
    document.documentElement.classList.remove("u-night"); document.body.classList.remove("u-night");
    document.querySelectorAll(".view").forEach(s => s.hidden = s.id !== "v-a-plus");
    document.querySelectorAll(".anav button").forEach(b => b.setAttribute("aria-current", b.dataset.aview === Pg.nav ? "page" : "false"));
    try{ history.replaceState(null, "", `#astro-${page}-${tab}`); }catch(e){}
    render(); window.scrollTo({top:0});
    if(typeof redraw === "function"){}
  }
  P.open = open;
  function render(){
    const s = sec(), Pg = PAGES[cur.page];
    s.innerHTML = `<header class="a-hero"><p class="crumb"><button type="button" class="linkbtn" data-plus-back>${cur.page === "atelier" ? "← L'école" : "← Mon thème"}</button></p>
      <h1>${Pg.titre}</h1><p class="a-lede">${Pg.lede}</p></header>
      <div class="pg-tabs" role="tablist">${Pg.tabs.map(([k, l]) => `<button type="button" role="tab" data-ptab="${k}" aria-selected="${k === cur.tab}">${l}</button>`).join("")}</div>
      <div class="pg-body" data-pbody></div>`;
    const body = s.querySelector("[data-pbody]");
    const r = P.renderers[cur.tab];
    try{ if(r) r(body); else body.innerHTML = `<p class="help">Bientôt.</p>`; }catch(e){ console.error(e); body.innerHTML = `<p class="help">Cet outil n'a pas pu s'afficher.</p>`; }
    if(P.cascade) P.cascade(body);
  }
  function entryTiles(page, intro){
    const Pg = PAGES[page];
    const DESC = {cles:"Planète, signe, maison : lire une position", glyphes:"Tous les symboles, leur origine, leurs variantes", reviser:"Des cartes qui reviennent au bon moment", tracer:"Dessiner chaque glyphe du bout du doigt", histo:"Kepler pour Wallenstein, Lilly et le navire",
      ephem:"Les positions jour par jour", calendrier:"Lunaisons, rétrogradations, Lune vide de course", synastrie:"Deux thèmes face à face, et le composite", revolution:"Le thème de ton anniversaire solaire", horaire:"Dresser le thème d'une question", elective:"Chercher le bon moment", reglages:"Orbes, maisons, zodiaque, étoiles fixes"};
    const ICO = {cles:"☉", glyphes:"♈", reviser:"☾", tracer:"♃", histo:"♄", ephem:"☉", calendrier:"☽", synastrie:"♀", revolution:"☉", horaire:"☿", elective:"♂", reglages:"✶"};
    return `<section class="pg-entry" data-pentry="${page}"><div class="pg-entry-h"><p class="eyebrow">${page === "atelier" ? "Pratiquer" : "Pour l'expert"}</p><h2 class="lsub">${Pg.titre}</h2><p class="help">${intro}</p></div>
      <div class="pg-tiles">${Pg.tabs.map(([k, l]) => `<button type="button" class="pg-tile" data-popen="${page}:${k}"><span class="pg-ico" aria-hidden="true">${ICO[k]}${T}</span><b>${l}</b><small>${DESC[k]}</small></button>`).join("")}</div></section>`;
  }
  function injectEntries(){
    const ec = document.getElementById("v-a-apprendre");
    if(ec && ec.querySelector(".a-mods2") && !ec.querySelector('[data-pentry="atelier"]')){
      const anchor = ec.querySelector(".a-mods2"); let a = anchor.closest("section"); if(!a || a.classList.contains("view")) a = anchor; a.insertAdjacentHTML("afterend", entryTiles("atelier", "Quatre exercices pour apprendre en faisant."));
    }
    const th = document.getElementById("v-a-theme");
    if(th && th.children.length && !th.querySelector('[data-popen^="outils"]')) th.insertAdjacentHTML("beforeend", `<p class="pg-mini" data-pentry="outils"><button type="button" class="btn ghost small" data-popen="outils:ephem">Les outils : éphémérides, calendrier, synastrie…</button></p>`);
  }

  /* ================= une roue dessinée à la main ================= */
  /* o : {asc, cusps, inner:[{id,lon,cls}], outer:[...], ghost:[...], aspects:[[lonA,lonB,cls]], size} */
  function roue(o = {}){
    const ref = o.asc != null ? o.asc : 0, rad = Math.PI/180;
    const A = l => (180 + l - ref)*rad, xy = (l, r) => [r*Math.cos(A(l)), -r*Math.sin(A(l))], f = n => n.toFixed(1);
    const R0 = 300, R1 = 258, R2 = o.outer ? 196 : 246, RI = o.outer ? 128 : 170;
    let s = `<svg class="rw" viewBox="-345 -345 690 690" role="img" aria-label="${hx(o.label || "Roue du zodiaque")}"><g class="rw-z">`;
    s += `<circle r="${R0}" class="rw-o"/><circle r="${R1}" class="rw-o"/>`;
    for(let k = 0; k < 12; k++){
      const [x1, y1] = xy(k*30, R1), [x2, y2] = xy(k*30, R0); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="rw-t"/>`;
      const [tx, ty] = xy(k*30 + 15, (R0 + R1)/2); s += `<text x="${f(tx)}" y="${f(ty)}" class="rw-sg el-${SGN()[k].el}" text-anchor="middle" dominant-baseline="central">${SGN()[k].gl}${T}</text>`;
      for(let d = 5; d < 30; d += 5){ const [a1, b1] = xy(k*30 + d, R1), [a2, b2] = xy(k*30 + d, R1 + (d % 10 ? 5 : 9)); s += `<line x1="${f(a1)}" y1="${f(b1)}" x2="${f(a2)}" y2="${f(b2)}" class="rw-tk"/>`; }
    }
    s += `</g><circle r="${RI}" class="rw-i"/>`;
    if(o.cusps){ o.cusps.forEach((c, i) => { const [x1, y1] = xy(c, RI), [x2, y2] = xy(c, R1), ang = i % 3 === 0; s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="rw-h${ang ? " ang" : ""}"/>`;
      const nx = (c + norm(o.cusps[(i+1)%12] - c)/2), [hx2, hy2] = xy(nx, RI + 12); s += `<text x="${f(hx2)}" y="${f(hy2)}" class="rw-hn" text-anchor="middle" dominant-baseline="central">${i + 1}</text>`; }); }
    if(o.outer) s += `<circle r="${R2}" class="rw-sep"/>`;
    (o.aspects || []).forEach(([a, b, cls]) => { const [x1, y1] = xy(a, RI - 4), [x2, y2] = xy(b, RI - 4); s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="rw-a ${cls || ""}"/>`; });
    const draw = (list, r, cls) => { const sp = spread(list, o.outer ? 8 : 7); sp.forEach(p => {
      const [px, py] = xy(p.d, r), [lx, ly] = xy(p.lon, R1), [mx, my] = xy(p.lon, R1 - 7);
      s += `<line x1="${f(lx)}" y1="${f(ly)}" x2="${f(mx)}" y2="${f(my)}" class="rw-pt ${cls}"/>`;
      s += `<g class="rw-p ${cls} ${p.cls || ""}" data-rwp="${p.id}"><circle cx="${f(px)}" cy="${f(py)}" r="15" class="rw-pc"/><text x="${f(px)}" y="${f(py)}" text-anchor="middle" dominant-baseline="central">${p.gl || (PLS()[p.id] ? PLS()[p.id].gl : "•")}${T}</text>${p.lab ? `<text x="${f(px)}" y="${f(py + 24)}" class="rw-pl" text-anchor="middle">${p.lab}</text>` : ""}</g>`; }); };
    if(o.ghost) draw(o.ghost, R2 - 2, "ghost");
    if(o.inner) draw(o.inner, o.outer ? R2 - 32 : R2 - 20, "in");
    if(o.outer) draw(o.outer, R2 + 30, "out");
    if(o.asc != null){ const [x, y] = xy(o.asc, R0 + 6); s += `<text x="${f(x - 6)}" y="${f(y)}" class="rw-ang" text-anchor="end" dominant-baseline="central">AS</text>`; }
    (o.lines || []).forEach(([a, b, cls]) => { const [x1, y1] = xy(a, R2 - 20), [x2, y2] = xy(b, R2 - 20); s += `<path d="M${f(x1)} ${f(y1)}A${R2 - 20} ${R2 - 20} 0 0 ${norm(b - a) > 180 ? 1 : 0} ${f(x2)} ${f(y2)}" class="rw-err ${cls || ""}"/>`; });
    return s + `</svg>`;
  }
  function spread(items, gap){
    const s = [...items].sort((a, b) => a.lon - b.lon).map(x => ({...x, d:x.lon}));
    for(let it = 0; it < 8; it++) for(let i = 0; i < s.length; i++){ const p = s[(i - 1 + s.length) % s.length], c = s[i]; const diff = norm(c.d - p.d);
      if(s.length > 1 && diff < gap){ const push = (gap - diff)/2; c.d = norm(c.d + push); p.d = norm(p.d - push); } }
    return s;
  }
  const lonAt = (svg, ev, asc = 0) => { const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left)/r.width*690 - 345, y = (ev.clientY - r.top)/r.height*690 - 345;
    return {lon:norm(Math.atan2(-y, x)*180/Math.PI - 180 + asc), dist:Math.hypot(x, y)}; };
  P.roue = roue; P.lonAt = lonAt;

  /* ================= les glyphes ================= */
  const ORIG = {
    soleil:["Un cercle et son centre : la forme la plus ancienne, déjà dans les papyrus grecs.", [["☉","forme courante"],["☼","soleil rayonnant des imprimés anciens"]]],
    lune:["Un croissant. Selon les époques, il s'ouvre à droite ou à gauche.", [["☽","croissant tourné à droite"],["☾","croissant tourné à gauche"]]],
    mercure:["On y voit le caducée d'Hermès, surmonté de deux cornes. Dans les papyrus grecs, le signe vient sans doute de l'abréviation de Stilbôn, le nom grec de la planète.", [["☿","forme moderne"]]],
    venus:["On le lit depuis la Renaissance comme le miroir de Vénus. Les papyrus grecs montrent plutôt une abréviation de Phôsphoros, « porteur de lumière », son nom d'étoile du matin.", [["♀","forme moderne"]]],
    mars:["Le bouclier et la lance, dit-on aujourd'hui. À l'origine, une abréviation de Thouros, l'un des noms grecs de la planète.", [["♂","forme moderne"]]],
    jupiter:["Dérivé de la lettre Z de Zeus, avec un trait qui le barre.", [["♃","forme moderne"]]],
    saturne:["On y voit une faux. Plus probablement l'abréviation de Kronos (ΚΡ), barrée d'un trait.", [["♄","forme moderne"]]],
    uranus:["Découverte par William Herschel en 1781. Les Anglais l'ont notée d'un H, son initiale ; le continent préfère un globe surmonté d'une flèche, qui mêle les signes du Soleil et de Mars.", [["♅","H de Herschel, usage anglais"],["⛢","globe et flèche, usage européen"]]],
    neptune:["Le trident du dieu de la mer. La planète est découverte en 1846, à Berlin, d'après les calculs du Français Le Verrier.", [["♆","trident"]]],
    pluton:["Découverte en 1930. Le monde anglophone écrit PL, initiales de Percival Lowell et début du nom ; l'Europe préfère un bident surmonté d'un cercle.", [["♇","monogramme PL"],["⯓","bident et cercle"]]],
    noeudn:["La tête du dragon. On croyait qu'un dragon avalait le Soleil ou la Lune pendant les éclipses, qui ont lieu près des nœuds.", [["☊","tête du dragon"]]],
    noeuds:["La queue du dragon, à l'opposé exact de la tête.", [["☋","queue du dragon"]]]
  };
  const SIGN_ORIG = ["Les cornes du bélier.","La tête et les cornes du taureau.","Deux figures côte à côte, ou le chiffre romain II.","Les pinces du crabe, ou deux spirales tête-bêche.","La crinière ou la queue du lion.","Un M bouclé : l'origine est discutée, peut-être une ligature des lettres grecques de parthenos, « la vierge ».","Le fléau d'une balance, ou le Soleil qui se couche sur l'horizon.","Le M du Scorpion, avec son dard.","La flèche de l'archer.","Sa forme a beaucoup varié ; les imprimés anciens l'écrivent souvent comme un V suivi d'un S inversé. On y lit une ligature des lettres grecques de tragos, « le bouc ».","Les ondes de l'eau versée.","Deux poissons reliés par un lien."];
  function glyphList(){
    const D = ASTRO_DATA, out = [];
    D.PLANETS.forEach(p => out.push({k:"p:" + p.id, cat:"Planètes et points", gl:p.gl, nom:p.nom, sub:(p.mots || []).slice(0, 3).join(" · "), orig:(ORIG[p.id] || [""])[0], vars:(ORIG[p.id] || [0, []])[1], afiche:"p:" + p.id}));
    SGN().forEach((s, i) => out.push({k:"s:" + i, cat:"Signes", gl:s.gl, nom:s.nom, sub:`${s.el} · ${s.mode}`, orig:SIGN_ORIG[i], vars:[[s.gl, "forme moderne"]], afiche:"s:" + i}));
    D.ASPECTS.forEach(a => out.push({k:"a:" + a.id, cat:"Aspects", gl:a.gl, nom:a.nom, sub:`${a.ang}°`, orig:a.sens ? a.sens.charAt(0).toUpperCase() + a.sens.slice(1) + "." : "", vars:[[a.gl, "forme courante"]], afiche:"a:" + a.id}));
    [["℞","Rétrograde","La planète semble reculer dans le ciel. Le signe vient de l'abréviation latine du mot."],["⊗","Part de Fortune","Un cercle barré d'une croix : la plus célèbre des « parts » arabes."],["AS","Ascendant","Le degré qui se lève à l'horizon est."],["MC","Milieu du Ciel","Le point le plus haut du zodiaque, au méridien."],["🜂","Feu","Le triangle qui monte, comme la flamme."],["🜄","Eau","Le triangle qui descend, comme la pluie."],["🜁","Air","Le triangle du feu, barré d'un trait."],["🜃","Terre","Le triangle de l'eau, barré d'un trait."]]
      .forEach(([g, n, o]) => out.push({k:"x:" + n, cat:"Autres signes", gl:g, nom:n, sub:"", orig:o, vars:[[g, ""]]}));
    return out;
  }
  P.glyphList = glyphList;
  P.renderers.glyphes = body => {
    const L = glyphList(), cats = [...new Set(L.map(g => g.cat))];
    body.innerHTML = `<p class="help">Touche un symbole pour voir son origine et ses variantes. Les origines sont celles qu'avancent les historiens ; plusieurs restent discutées.</p>
      ${cats.map(c => `<h3 class="dos-h3">${c}</h3><div class="gl-grid">${L.filter(g => g.cat === c).map(g => `<button type="button" class="gl-c" data-gk="${hx(g.k)}"><span class="gl-g">${g.gl}${T}</span><b>${g.nom}</b><small>${g.sub}</small></button>`).join("")}</div>`).join("")}
      <div class="gl-detail" data-gdetail hidden></div>`;
    body.addEventListener("click", e => { const b = e.target.closest("[data-gk]"); if(!b) return;
      const g = L.find(x => x.k === b.dataset.gk), d = body.querySelector("[data-gdetail]");
      body.querySelectorAll(".gl-c.on").forEach(x => x.classList.remove("on")); b.classList.add("on");
      d.hidden = false;
      d.innerHTML = `<div class="gl-big">${g.gl}${T}</div><div><p class="eyebrow">${g.cat}</p><h3>${g.nom}</h3><p>${g.orig}</p>
        ${g.vars.length > 1 ? `<h4>Les variantes</h4><ul class="gl-vars">${g.vars.map(([v, l]) => `<li><span>${v}${T}</span>${l}</li>`).join("")}</ul>` : ""}
        <p class="gl-acts">${g.afiche ? `<button type="button" class="btn small ghost" data-afiche="${g.afiche}">Lire sa fiche</button>` : ""}</p></div>`;
      b.after(d); d.scrollIntoView({block:"nearest", behavior:"smooth"});
    });
    body.addEventListener("click", e => { const t = e.target.closest("[data-gtrace]"); if(t){ P.store.set("traceStart", t.dataset.gtrace); open("atelier", "tracer"); } });
  };

  /* ================= la révision espacée (boîtes de Leitner) ================= */
  const BOX_DAYS = [0, 0, 1, 3, 7, 16];
  P.renderers.reviser = body => {
    const L = glyphList().filter(g => g.cat !== "Autres signes"), now = Date.now();
    const srs = S.srs || (S.srs = {});
    const due = L.filter(g => !srs[g.k] || srs[g.k].due <= now);
    const counts = [1,2,3,4,5].map(b => L.filter(g => (srs[g.k] ? srs[g.k].b : 1) === b).length);
    let queue = due.sort(() => Math.random() - .5).slice(0, 12), i = 0, ok = 0;
    const head = `<div class="rv-boxes" aria-label="Tes cinq boîtes">${counts.map((n, b) => `<div class="rv-box"><span>${n}</span><small>${["Nouvelles","Demain","Dans 3 jours","Dans 7 jours","Acquises"][b]}</small></div>`).join("")}</div>`;
    function card(){
      if(i >= queue.length){ body.innerHTML = head.replace(/<span>\d+<\/span>/g, m => m) + `<div class="sr-end"><h3>${queue.length ? `${ok} sur ${queue.length}` : "Rien à revoir"}</h3><p>${queue.length ? "Les cartes réussies reviendront plus tard, les autres demain." : "Toutes tes cartes sont à jour. Reviens demain, ou trace quelques glyphes."}</p><p><button type="button" class="btn" data-sr-again>Une autre série</button></p></div>`;
        const a = body.querySelector("[data-sr-again]"); if(a) a.onclick = () => P.renderers.reviser(body); return; }
      const g = queue[i], sameCat = L.filter(x => x.cat === g.cat && x.k !== g.k).sort(() => Math.random() - .5).slice(0, 3);
      const opts = [g, ...sameCat].sort(() => Math.random() - .5), rev = Math.random() < .5;
      body.innerHTML = head + `<div class="sr"><p class="sr-n">${i + 1} / ${queue.length} · boîte ${srs[g.k] ? srs[g.k].b : 1}</p>
        <div class="sr-q">${rev ? `<b class="sr-name">${g.nom}</b><small>Quel est son symbole ?</small>` : `<span class="sr-g">${g.gl}${T}</span><small>Quel est ce symbole ?</small>`}</div>
        <div class="sr-opts${rev ? " glyphs" : ""}">${opts.map(o => `<button type="button" class="sr-o" data-sro="${hx(o.k)}">${rev ? `<span>${o.gl}${T}</span>` : o.nom}</button>`).join("")}</div></div>`;
      body.querySelectorAll("[data-sro]").forEach(b => b.onclick = () => {
        const good = b.dataset.sro === g.k, st = srs[g.k] || {b:1};
        st.b = good ? Math.min(5, st.b + 1) : 1; st.due = Date.now() + BOX_DAYS[st.b]*864e5 - 36e5; srs[g.k] = st; save();
        if(good) ok++;
        body.querySelectorAll("[data-sro]").forEach(x => { x.disabled = true; if(x.dataset.sro === g.k) x.classList.add("good"); else if(x === b) x.classList.add("bad"); });
        setTimeout(() => { i++; card(); }, good ? 650 : 1500);
      });
    }
    card();
  };

  /* ================= tracer les glyphes ================= */
  P.renderers.tracer = body => {
    const L = glyphList().filter(g => !/^[A-Z]{2}$/.test(g.gl));
    let idx = Math.max(0, L.findIndex(g => g.k === S.traceStart)); S.traceStart = null;
    const best = S.trace || (S.trace = {});
    body.innerHTML = `<div class="tr"><div class="tr-pad"><canvas width="560" height="560" aria-label="Zone de tracé"></canvas></div>
      <div class="tr-side"><p class="eyebrow" data-tcat></p><h3 data-tnom></h3><p class="help">Suis le modèle en gris, d'un seul geste ou de plusieurs, puis vérifie. Ton meilleur score est gardé.</p>
        <p class="tr-score" data-tscore></p>
        <div class="tr-acts"><button type="button" class="btn" data-tcheck>Vérifier</button><button type="button" class="btn ghost" data-tclear>Effacer</button></div>
        <div class="tr-acts"><button type="button" class="btn ghost small" data-tprev>← Précédent</button><button type="button" class="btn ghost small" data-tnext>Suivant →</button><button type="button" class="btn ghost small" data-tguide aria-pressed="true">Masquer le modèle</button></div>
        <div class="tr-strip">${L.map((g, i) => `<button type="button" class="tr-chip${best[g.k] >= 70 ? " done" : ""}" data-ti="${i}" title="${hx(g.nom)}">${g.gl}${T}</button>`).join("")}</div></div></div>`;
    const cv = body.querySelector("canvas"), ctx = cv.getContext("2d"), W = 560;
    let strokes = [], drawing = null, guide = true;
    const FONT = `360px "Arcanes Symboles","Segoe UI Symbol","Noto Sans Symbols 2","Noto Sans Symbols","DejaVu Sans",serif`;
    const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1d2340";
    function glyphCanvas(mode){
      const c = document.createElement("canvas"); c.width = c.height = W; const x = c.getContext("2d");
      x.font = FONT; x.textAlign = "center"; x.textBaseline = "alphabetic";
      const g = L[idx].gl + T, m = x.measureText(g), y = W/2 + ((m.actualBoundingBoxAscent || 250) - (m.actualBoundingBoxDescent || 0))/2;
      if(mode === "zone"){ x.lineWidth = 34; x.lineJoin = "round"; x.strokeStyle = "#000"; x.strokeText(g, W/2, y); }
      x.fillStyle = "#000"; x.fillText(g, W/2, y); return c;
    }
    function paint(){
      ctx.clearRect(0, 0, W, W);
      ctx.strokeStyle = "rgba(29,35,64,.08)"; ctx.lineWidth = 1;
      for(let k = 1; k < 4; k++){ ctx.beginPath(); ctx.moveTo(k*W/4, 0); ctx.lineTo(k*W/4, W); ctx.moveTo(0, k*W/4); ctx.lineTo(W, k*W/4); ctx.stroke(); }
      if(guide){ ctx.save(); ctx.globalAlpha = .13; ctx.drawImage(glyphCanvas(), 0, 0); ctx.restore(); }
      ctx.strokeStyle = ink(); ctx.lineWidth = 16; ctx.lineCap = ctx.lineJoin = "round";
      [...strokes, drawing].filter(Boolean).forEach(st => { ctx.beginPath(); st.forEach(([x, y], k) => k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); if(st.length === 1) ctx.lineTo(st[0][0] + .1, st[0][1]); ctx.stroke(); });
    }
    function setG(){ body.querySelector("[data-tcat]").textContent = L[idx].cat; body.querySelector("[data-tnom]").innerHTML = `${L[idx].gl}${T} ${L[idx].nom}`;
      body.querySelector("[data-tscore]").innerHTML = best[L[idx].k] != null ? `Meilleur score : <b>${best[L[idx].k]}</b> / 100` : "";
      body.querySelectorAll(".tr-chip").forEach((c, i) => c.classList.toggle("on", i === idx)); strokes = []; paint(); }
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left)/r.width*W, (e.clientY - r.top)/r.height*W]; };
    cv.addEventListener("pointerdown", e => { e.preventDefault(); try{ cv.setPointerCapture(e.pointerId); }catch(err){} drawing = [pos(e)]; paint(); });
    cv.addEventListener("pointermove", e => { if(!drawing) return; drawing.push(pos(e)); paint(); });
    const end = () => { if(drawing){ strokes.push(drawing); drawing = null; paint(); } };
    cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end);
    cv.style.touchAction = "none";
    function score(){
      if(!strokes.length) return null;
      const user = document.createElement("canvas"); user.width = user.height = W; const u = user.getContext("2d");
      const fat = document.createElement("canvas"); fat.width = fat.height = W; const fx = fat.getContext("2d");
      [[u, 16], [fx, 40]].forEach(([c, w]) => { c.strokeStyle = "#000"; c.lineWidth = w; c.lineCap = c.lineJoin = "round"; strokes.forEach(st => { c.beginPath(); st.forEach(([x, y], k) => k ? c.lineTo(x, y) : c.moveTo(x, y)); if(st.length === 1) c.lineTo(st[0][0] + .1, st[0][1]); c.stroke(); }); });
      const tgt = glyphCanvas().getContext("2d").getImageData(0, 0, W, W).data, zone = glyphCanvas("zone").getContext("2d").getImageData(0, 0, W, W).data;
      const ud = u.getImageData(0, 0, W, W).data, fd = fx.getImageData(0, 0, W, W).data;
      let t = 0, tc = 0, us = 0, ui = 0;
      for(let p = 3; p < tgt.length; p += 16){ if(tgt[p] > 100){ t++; if(fd[p] > 100) tc++; } if(ud[p] > 100){ us++; if(zone[p] > 100) ui++; } }
      if(!t || !us) return 0;
      const cover = tc/t, prec = ui/us;
      return Math.round(100 * Math.min(1, cover*1.12) * Math.min(1, prec*1.05));
    }
    body.querySelector("[data-tcheck]").onclick = () => { const s = score(); if(s == null) return;
      const k = L[idx].k; best[k] = Math.max(best[k] || 0, s); save();
      body.querySelector("[data-tscore]").innerHTML = `<b class="tr-big">${s}</b> / 100 · ${s >= 85 ? "Très beau tracé." : s >= 70 ? "Bien : le glyphe est reconnaissable." : s >= 45 ? "Presque : suis mieux le modèle." : "Recommence en suivant le modèle."}${best[k] > s ? ` <small>Meilleur : ${best[k]}</small>` : ""}`;
      body.querySelector(`[data-ti="${idx}"]`).classList.toggle("done", best[k] >= 70); };
    body.querySelector("[data-tclear]").onclick = () => { strokes = []; paint(); };
    body.querySelector("[data-tprev]").onclick = () => { idx = (idx - 1 + L.length) % L.length; setG(); };
    body.querySelector("[data-tnext]").onclick = () => { idx = (idx + 1) % L.length; setG(); };
    body.querySelector("[data-tguide]").onclick = e => { guide = !guide; e.target.setAttribute("aria-pressed", guide); e.target.textContent = guide ? "Masquer le modèle" : "Montrer le modèle"; paint(); };
    body.querySelectorAll("[data-ti]").forEach(b => b.onclick = () => { idx = +b.dataset.ti; setG(); });
    (document.fonts && document.fonts.load ? document.fonts.load(FONT, L[idx].gl) : Promise.resolve()).finally(setG);
  };

  /* ================= thèmes historiques ================= */
  const HISTO = [
    {id:"wallenstein", titre:"Kepler pour Wallenstein", date:"1608",
      data:"Né le 24 septembre 1583 (calendrier julien, soit le 4 octobre grégorien) à Heřmanice, en Bohême, vers 16 h 30. Kepler calcule pour la latitude qu'on lui a donnée, 51° nord.",
      mk:C => C.chart({date:new Date(Date.UTC(1583, 9, 4, 16, 30) - 63.5*60000), lat:51, lon:15.88, heure:true, system:"regio"}),
      steps:ch => [
        ["La commande", "En 1608, un jeune noble de Bohême fait demander son horoscope à Kepler, mathématicien de l'empereur Rodolphe II, par un intermédiaire : il veut rester anonyme. Il a vingt-cinq ans et n'est encore personne."],
        ["Ce que montre la roue", `Arcanes recalcule le thème avec les données transmises à Kepler. Saturne (${P.fmt(ch.P.saturne.lon)}) et Jupiter (${P.fmt(ch.P.jupiter.lon)}) se lèvent ensemble, juste sous l'Ascendant (${P.fmt(ch.asc)}) : les deux planètes lentes, rétrogrades, réunies dans la première maison. C'est la figure qui domine le thème.`],
        ["Ce que Kepler y lit", "Kepler dresse le portrait d'un homme ambitieux, avide de pouvoir et sans pitié, et lui annonce une grande carrière au service de l'État. Wallenstein deviendra généralissime des armées impériales pendant la guerre de Trente Ans."],
        ["Ce qui cloche", "La latitude donnée à Kepler, 51°, est à peu près celle de Dresde : Heřmanice est plus au sud. Les historiens qui ont refait les calculs ont aussi montré que l'Ascendant et le Milieu du Ciel notés par Kepler ne correspondent pas tout à fait à l'heure indiquée. En 1624, Wallenstein fait corriger son thème, et Kepler le recalcule en 1625."],
        ["La leçon", "Kepler était l'un des astronomes les plus exacts de son temps, et un critique sévère de l'astrologie de son époque. Il en vivait pourtant, et ce thème reste le plus célèbre qu'il ait dressé. Le portrait a frappé par sa justesse, alors que les données étaient fausses."]],
      src:"Kepler, horoscope de 1608 ; P. Hadrava et A. Hadravová, Acta Universitatis Carolinae (2005) ; R. Wulff, sur Skyscript."},
    {id:"navire", titre:"Lilly et le navire en mer", date:"1647",
      data:"Une question posée à William Lilly à Londres, le 19 mars 1647 (calendrier grégorien) vers 10 h 28 : dans quel état est le navire ? Maisons de Regiomontanus, comme Lilly.",
      mk:C => C.chart({date:new Date(Date.UTC(1647, 2, 19, 10, 28, 30)), lat:51.51, lon:-0.12, heure:true, system:"regio"}),
      steps:ch => [
        ["L'horaire", "En astrologie horaire, on ne dresse pas le thème d'une naissance, mais celui du moment où la question est comprise par l'astrologue. Lilly publie cet exemple dans Christian Astrology, en 1647."],
        ["Le navire, c'est l'Ascendant", `L'Ascendant (${P.fmt(ch.asc)}) représente le navire et ceux qui sont à bord. Le Cancer est gouverné par la Lune : elle devient le significateur du navire.`],
        ["La Lune", `La Lune (${P.fmt(ch.P.lune.lon)}) est en Vierge, où elle n'a presque aucune dignité : elle est pérégrine. Son dernier aspect était un carré à Saturne, la planète des pertes ; depuis, elle est restée sans aspect.`],
        ["Le regard qui vient", `Elle s'avance maintenant vers un trigone à Saturne (${P.fmt(ch.P.saturne.lon)}). Un trigone est d'ordinaire une bonne nouvelle, mais Lilly pèse aussi les étoiles fixes violentes et les autres témoignages du thème.`],
        ["Le jugement", "Les témoignages défavorables l'emportent : selon la reconstitution d'Anthony Louis, Lilly conclut que le navire est perdu. La méthode compte plus que la réponse : un significateur, ses dignités, son dernier aspect et le suivant."]],
      src:"William Lilly, Christian Astrology (1647), p. 165 ; reconstitution moderne d'Anthony Louis."}
  ];
  P.renderers.histo = body => {
    const C = ASTRO_CALC, A = window.ArcanesAstro;
    let which = 0, step = 0;
    function ui(){
      const H = HISTO[which], ch = H.mk(C), steps = H.steps(ch);
      body.innerHTML = `<div class="hx-pick">${HISTO.map((h, i) => `<button type="button" class="chip${i === which ? " on" : ""}" data-hx="${i}">${h.titre} <small>${h.date}</small></button>`).join("")}</div>
        <div class="hx">
          <figure class="hx-wheel">${A.wheel(ch, {prefix:"hx", label:H.titre})}<figcaption class="help">${H.data}</figcaption></figure>
          <div class="hx-read"><p class="eyebrow">Lecture guidée · ${step + 1} / ${steps.length}</p>
            <ol class="hx-steps">${steps.map(([t, x], i) => `<li class="${i === step ? "on" : i < step ? "done" : ""}"><button type="button" data-hs="${i}"><span>${i + 1}</span>${t}</button>${i === step ? `<p>${x}</p>` : ""}</li>`).join("")}</ol>
            <div class="tr-acts"><button type="button" class="btn ghost small" data-hprev ${step ? "" : "disabled"}>← Étape précédente</button><button type="button" class="btn small" data-hnext ${step < steps.length - 1 ? "" : "disabled"}>Étape suivante →</button></div>
            <p class="help hx-src">Sources : ${H.src}</p></div></div>`;
      body.querySelectorAll("[data-hx]").forEach(b => b.onclick = () => { which = +b.dataset.hx; step = 0; ui(); });
      body.querySelectorAll("[data-hs]").forEach(b => b.onclick = () => { step = +b.dataset.hs; ui(); });
      body.querySelector("[data-hprev]").onclick = () => { step--; ui(); };
      body.querySelector("[data-hnext]").onclick = () => { step++; ui(); };
    }
    ui();
  };

  /* ================= branchements ================= */
  P.onReady.push(() => {
    const main = document.querySelector("main"); if(!main) return;
    const s = document.createElement("section"); s.className = "view a-view"; s.id = "v-a-plus"; s.hidden = true; main.appendChild(s);
    document.addEventListener("click", e => {
      const o = e.target.closest && e.target.closest("[data-popen]"); if(o){ const [pg, tb] = o.dataset.popen.split(":"); open(pg, tb); return; }
      const t = e.target.closest && e.target.closest("[data-ptab]"); if(t){ cur.tab = t.dataset.ptab; open(cur.page, cur.tab); return; }
      const b = e.target.closest && e.target.closest("[data-plus-back]"); if(b && window.ArcanesAstro){ window.ArcanesAstro.aView(PAGES[cur.page].nav); }
    });
    ["v-a-apprendre","v-a-theme"].forEach(id => { const v = document.getElementById(id); if(v) new MutationObserver(injectEntries).observe(v, {childList:true}); });
    injectEntries();
    const m = /^#astro-(atelier|outils)-(\w+)$/.exec(window.__arcanesHash || location.hash || "");
    if(m) setTimeout(() => open(m[1], m[2]), 50);
  });
})();

/* ===== Chantier 6 · Le planétaire de Cellarius =====
   La planche « Planisphaerium Copernicanum » d'Andreas Cellarius (Harmonia Macrocosmica, 1661).
   Les anneaux de la planche tournent pour mettre chaque planète peinte à sa position réelle autour du Soleil.
   Les mesures ci-dessous sont prises sur la planche (recadrée en 920 × 920, Soleil au centre). */
(() => {
  const P = window.ArcanesPlus;
  const CX = 460, CY = 460, IMG = "jeux/hist/cellarius-cop.webp";
  /* chaque planète peinte : position sur la planche, rayon du disque, angle d'où l'on prend le fond pour la masquer */
  const PEINT = [
    {id:"mercure", body:"Mercury", nom:"Mercure", x:489, y:503, r:23, cover:38},
    {id:"venus", body:"Venus", nom:"Vénus", x:393, y:420, r:24, cover:-34},
    {id:"terre", body:"Earth", nom:"la Terre et la Lune", x:450, y:286, r:62, cover:44, ax:463, ay:289},
    {id:"mars", body:"Mars", nom:"Mars", x:353, y:689, r:25, cover:24},
    {id:"jupiter", body:"Jupiter", nom:"Jupiter et ses quatre lunes", x:747, y:390, r:44, cover:-30},
    {id:"saturne", body:"Saturn", nom:"Saturne", x:121, y:457, r:26, cover:-22}
  ];
  /* sur la planche, le 0° du Bélier est à -150° (sens trigonométrique), le zodiaque tourne dans le sens direct */
  const OFFSET = -150;
  const ang = p => Math.atan2(-((p.ay || p.y) - CY), (p.ax || p.x) - CX) * 180/Math.PI;
  const norm = a => ((a % 360) + 360) % 360;
  function helio(body, date){
    const A = window.Astronomy; if(!A) return null;
    if(body === "Earth"){ return norm(A.SunPosition(date).elon + 180); }
    const v = A.HelioVector(A.Body[body], date); return norm(A.Ecliptic(v).elon);
  }
  const SIG = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];

  let when = new Date(), playing = 0, raf = 0, last = 0;
  function svg(){
    const defs = PEINT.map((p, i) => `<clipPath id="pl-c${i}"><circle cx="${p.x}" cy="${p.y}" r="${p.r}"/></clipPath><clipPath id="pl-k${i}"><circle cx="${p.x}" cy="${p.y}" r="${p.r + 3}"/></clipPath>`).join("");
    const covers = PEINT.map((p, i) => `<g clip-path="url(#pl-k${i})"><image href="${IMG}" width="920" height="920" transform="rotate(${p.cover} ${CX} ${CY})"/></g>`).join("");
    const sprites = PEINT.map((p, i) => `<g class="pl-sp" data-pl="${p.id}" style="transform-origin:${CX}px ${CY}px"><g clip-path="url(#pl-c${i})"><image href="${IMG}" width="920" height="920"/></g><circle class="pl-hit" cx="${p.x}" cy="${p.y}" r="${p.r}"><title>${p.nom}</title></circle></g>`).join("");
    return `<svg class="pl-svg" viewBox="0 0 920 920" role="img" aria-label="Le système de Copernic selon Cellarius, planètes à leur position du jour">
      <defs>${defs}<clipPath id="pl-disc"><circle cx="${CX}" cy="${CY}" r="452"/></clipPath><radialGradient id="pl-vig" cx="50%" cy="50%" r="50%"><stop offset="80%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#050918" stop-opacity=".6"/></radialGradient></defs>
      <g clip-path="url(#pl-disc)"><image href="${IMG}" width="920" height="920"/>${covers}${sprites}<circle cx="${CX}" cy="${CY}" r="452" fill="url(#pl-vig)"/></g>
      <circle cx="${CX}" cy="${CY}" r="452" class="pl-rim"/>
    </svg>`;
  }
  function place(root){
    const out = [];
    PEINT.forEach(p => {
      const L = helio(p.body, when); if(L == null) return;
      const target = L + OFFSET, d = target - ang(p);
      const g = root.querySelector(`[data-pl="${p.id}"]`); if(g) g.style.transform = `rotate(${-d}deg)`;
      out.push([p, L]);
    });
    const lab = root.querySelector(".pl-date"); if(lab) lab.textContent = when.toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"});
    const li = root.querySelector(".pl-list"); if(li) li.innerHTML = out.map(([p, L]) => `<li><b>${p.nom.replace(/ et .*/, "")}</b> <span>${Math.floor(L % 30)}° ${SIG[Math.floor(L/30)]}</span></li>`).join("");
  }
  function html(){
    return `<section class="pl" data-plan aria-labelledby="pl-h">
      <div class="pl-head"><p class="eyebrow">Le planétaire · Cellarius, 1661</p><h2 class="lsub" id="pl-h">Le ciel vu du Soleil</h2>
        <p class="a-lede">La planche de Copernic de l'<i lang="la">Harmonia Macrocosmica</i>. Ses anneaux tournent pour mettre chaque planète peinte à sa vraie place du jour autour du Soleil, sur le zodiaque de la gravure. Lance le temps pour voir Mercure filer et Saturne à peine bouger.</p></div>
      <div class="pl-stage"><figure class="pl-fig">${svg()}</figure>
        <div class="pl-side">
          <p class="pl-date"></p>
          <div class="pl-ctl"><button type="button" class="btn ghost small" data-pl-step="-30" aria-label="Reculer d'un mois">−1 mois</button><button type="button" class="btn small" data-pl-play aria-pressed="false">Lancer le temps</button><button type="button" class="btn ghost small" data-pl-step="30" aria-label="Avancer d'un mois">+1 mois</button></div>
          <p><button type="button" class="linkbtn" data-pl-now>Revenir à aujourd'hui</button></p>
          <ul class="pl-list"></ul>
          <p class="help">Longitudes héliocentriques, vues du Soleil : elles diffèrent de celles du thème, vu de la Terre. La planche n'est pas à l'échelle, et Cellarius y a peint les quatre lunes de Jupiter découvertes par Galilée en 1610.</p>
          <p class="help">Andreas Cellarius, <i lang="la">Harmonia Macrocosmica</i>, Amsterdam, 1661. Domaine public, via Wikimedia Commons.</p>
        </div></div></section>`;
  }
  function tick(t){
    if(!playing){ raf = 0; return; }
    const root = document.querySelector("[data-plan]"); if(!root || !root.isConnected){ playing = 0; raf = 0; return; }
    const dt = last ? Math.min(64, t - last) : 16; last = t;
    when = new Date(when.getTime() + dt/1000 * 40 * 864e5);   // 40 jours par seconde
    place(root); raf = requestAnimationFrame(tick);
  }
  function bind(root){
    place(root);
    root.addEventListener("click", e => {
      const s = e.target.closest("[data-pl-step]"); if(s){ when = new Date(when.getTime() + (+s.dataset.plStep)*864e5); place(root); return; }
      if(e.target.closest("[data-pl-now]")){ when = new Date(); place(root); return; }
      const pb = e.target.closest("[data-pl-play]");
      if(pb){ playing = !playing; pb.setAttribute("aria-pressed", playing); pb.textContent = playing ? "Arrêter" : "Lancer le temps"; root.classList.toggle("is-playing", !!playing); last = 0; if(playing && !raf) raf = requestAnimationFrame(tick); }
    });
  }
  function inject(){
    if(P.useObservatoire) return;   /* remplacé par l'Observatoire astral (astro/observatoire.html) */
    const v = document.getElementById("v-a-ciel"); if(!v || v.querySelector("[data-plan]")) return;
    const anchor = v.querySelector(".a-c3s") || v.querySelector(".a-sky"); if(!anchor) return;
    playing = 0; when = new Date();
    anchor.insertAdjacentHTML("afterend", html());
    bind(v.querySelector("[data-plan]"));
  }
  P.planetaire = {inject, PEINT, helio};
  P.onReady.push(() => {
    const v = document.getElementById("v-a-ciel"); if(!v) return;
    new MutationObserver(() => inject()).observe(v, {childList:true});
    inject();
  });
})();

/* ===== Chantier 7 · Les outils de l'expert =====
   Vague 1 : éphémérides, calendrier du ciel (lunaisons, stations, Lune vide de course), export image et PDF.
   Vague 2 : synastrie, composite, révolution solaire.
   Vague 3 : astrologie horaire et élective.
   Vague 4 : réglages fins (orbes, maisons, zodiaque sidéral) et techniques (étoiles fixes, antisces, firdaria, releasing zodiacal). */
(() => {
  const P = window.ArcanesPlus, R = P.renderers, hx = P.hx, T = "︎";
  const C = () => ASTRO_CALC, D = () => ASTRO_DATA, A = () => window.ArcanesAstro;
  const norm = a => ((a % 360) + 360) % 360, sep = (a, b) => { const d = norm(a - b); return d > 180 ? 360 - d : d; };
  const DAY = 864e5, rad = Math.PI/180;
  const SG = () => ASTRO_CALC.SG, PL = () => ASTRO_CALC.PL;
  const TRAD = ["soleil","lune","mercure","venus","mars","jupiter","saturne"], MOD = [...TRAD, "uranus","neptune","pluton"];
  const fmtD = d => d.toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"});
  const fmtDT = d => d.toLocaleString("fr-FR", {day:"numeric", month:"short", hour:"2-digit", minute:"2-digit"});
  const fmtH = d => d.toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"});
  const gpl = id => `<span class="ag pl">${PL()[id].gl}${T}</span>`;
  const gsg = k => `<span class="ag el-${SG()[k].el}">${SG()[k].gl}${T}</span>`;
  const st = () => A().state();
  const school = () => st().ecole === "tradition" ? "tradition" : "moderne";

  /* ---------- réglages ---------- */
  const REG0 = {orbe:1, zodiaque:"tropical", etoiles:true, antisces:true};
  const reg = () => Object.assign({}, REG0, P.store.get("reg") || {});
  const setReg = (k, v) => { const r = reg(); r[k] = v; P.store.set("reg", r); if(k === "orbe") applyOrbs(); };
  let ORB0 = null, MOI0 = null;
  function applyOrbs(){
    const Dd = D(); if(!ORB0){ ORB0 = Dd.ASPECTS.map(a => a.orb); MOI0 = Object.assign({}, Dd.MOIETY); }
    const k = reg().orbe; Dd.ASPECTS.forEach((a, i) => a.orb = +(ORB0[i]*k).toFixed(2)); for(const id in MOI0) Dd.MOIETY[id] = +(MOI0[id]*k).toFixed(2);
  }
  /* ayanamsa de Lahiri, approximation linéaire (23°51′ en 2000, 50,29″ par an) */
  const ayan = date => 23.853 + (date.getUTCFullYear() + date.getUTCMonth()/12 - 2000) * 50.29/3600;
  const zlon = (lon, date) => reg().zodiaque === "sideral" ? norm(lon - ayan(date)) : lon;
  const fmt = (lon, date) => { const l = date ? zlon(lon, date) : lon; return P.fmt(l); };
  const fmtShort = l => { l = norm(l); const s = Math.floor(l/30), d = Math.floor(l % 30), m = Math.floor((l % 1)*60); return `${String(d).padStart(2, " ")}°${gsg(s)}${String(m).padStart(2, "0")}′`; };

  /* ---------- outils communs ---------- */
  function themes(){ return (st().themes || []); }
  function chartOfTheme(t, sys){
    const lieu = t.lieu || {}, c = C();
    const date = t.heure ? c.localToUTC(t.y, t.m, t.d, t.h, t.mi, lieu) : c.localToUTC(t.y, t.m, t.d, 12, 0, lieu);
    return c.chart({date, lat:+lieu.lat || 0, lon:+lieu.lon || 0, heure:!!t.heure, system:sys || (school() === "tradition" ? st().sysTrad : st().sysMod)});
  }
  const themeSelect = (name, val, label) => `<label class="pf-l"><span class="eyebrow">${label}</span><select data-${name}>${themes().map(t => `<option value="${t.id}"${val === t.id ? " selected" : ""}>${hx(t.nom)}${t.moi ? " (moi)" : ""}</option>`).join("")}</select></label>`;
  const noThemes = body => { body.innerHTML = `<div class="pg-empty"><h3>Il faut d'abord un thème</h3><p>Cet outil part d'un thème natal enregistré. Dresse le tien, ou celui d'un proche, dans Mon thème.</p><p><button type="button" class="btn" data-agoto="theme">Dresser un thème</button></p></div>`; };
  const ptsOf = ch => { const ids = school() === "tradition" ? TRAD : MOD; return ids.map(id => ({id, lon:ch.P[id].lon, speed:ch.P[id].speed})); };
  const aspCls = id => ({conj:"conj", carre:"dur", opp:"dur", trigone:"", sext:""})[id] || "";
  const ASP = () => Object.fromEntries(D().ASPECTS.map(a => [a.id, a]));
  const lieuOpts = () => D().CITIES.map(c => `<option value="${c[0]} (${c[1]})">`).join("");
  const findCity = v => { const n = (v || "").toLowerCase(); const c = D().CITIES.find(c => `${c[0]} (${c[1]})`.toLowerCase() === n || c[0].toLowerCase() === n); return c ? {nom:`${c[0]} (${c[1]})`, lat:c[2], lon:c[3], tz:c[4]} : null; };

  /* export : image (la roue en PNG) et PDF (impression) */
  async function saveBlob(name, blob){
    const dl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
    if(dl){ try{ const r = await dl.save({filename:name, data:blob}); if(r) return true; }catch(e){} }
    try{ const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); return true; }catch(e){ return false; }
  }
  P.saveBlob = saveBlob;
  async function svgToPng(svg, name, title){
    const clone = svg.cloneNode(true), src = [svg, ...svg.querySelectorAll("*")], dst = [clone, ...clone.querySelectorAll("*")];
    const props = ["fill","stroke","stroke-width","stroke-dasharray","opacity","font-size","font-family","font-weight","text-anchor","dominant-baseline"];
    src.forEach((el, i) => { const cs = getComputedStyle(el); dst[i].setAttribute("style", props.map(p => `${p}:${cs.getPropertyValue(p)}`).join(";")); });
    const vb = svg.viewBox.baseVal, W = 1600, H = Math.round(W*vb.height/vb.width) + (title ? 120 : 0);
    clone.setAttribute("width", W); clone.setAttribute("height", W*vb.height/vb.width);
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], {type:"image/svg+xml"}));
    const img = new Image(); await new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; img.src = url; });
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
    x.fillStyle = "#f4eddd"; x.fillRect(0, 0, W, H);
    if(title){ x.fillStyle = "#1d2340"; x.font = "56px 'IM Fell English SC', Georgia, serif"; x.textAlign = "center"; x.fillText(title, W/2, 78); }
    x.drawImage(img, 0, title ? 110 : 0, W, W*vb.height/vb.width); URL.revokeObjectURL(url);
    x.fillStyle = "#50566e"; x.font = "26px 'Alegreya Sans', sans-serif"; x.textAlign = "right"; x.fillText("Arcanes", W - 30, H - 24);
    const blob = await new Promise(r => cv.toBlob(r, "image/png")); return saveBlob(name, blob);
  }
  const exportBar = (img) => `<div class="pg-export">${img ? `<button type="button" class="btn ghost small" data-xpng>Enregistrer l'image</button>` : ""}<button type="button" class="btn ghost small" data-xpdf>Imprimer ou PDF</button></div>`;
  function bindExport(body, name, title){
    const b = body.querySelector("[data-xpng]"); if(b) b.onclick = async () => { const s = body.querySelector(".rw, .awheel"); if(!s) return; b.disabled = true; b.textContent = "Préparation…"; await svgToPng(s, name + ".png", title).catch(() => {}); b.disabled = false; b.textContent = "Enregistrer l'image"; };
    const p = body.querySelector("[data-xpdf]"); if(p) p.onclick = () => { document.documentElement.classList.add("print-pg"); setTimeout(() => { try{ window.print(); }catch(e){} setTimeout(() => document.documentElement.classList.remove("print-pg"), 500); }, 50); };
  }

  /* ---------- la Lune : aspects à venir, vide de course ---------- */
  const PTOL = [[0,"conj"],[60,"sext"],[90,"carre"],[120,"trigone"],[180,"opp"]];
  function moonAspects(t0, t1, step = 3600e3){
    const c = C(), out = [], others = ["soleil","mercure","venus","mars","jupiter","saturne"];
    let prev = null;
    for(let t = t0; t <= t1; t += step){
      const d = new Date(t), m = c.lonOf("lune", d), o = others.map(id => c.lonOf(id, d));
      const cur = o.map(l => PTOL.map(([a]) => { let x = norm(m - l - a); if(x > 180) x -= 360; let y = norm(m - l + a); if(y > 180) y -= 360; return [x, y]; }));
      if(prev) others.forEach((id, i) => PTOL.forEach(([a, nm], j) => [0, 1].forEach(k => {
        const p = prev[i][j][k], q = cur[i][j][k]; if(Math.sign(p) !== Math.sign(q) && Math.abs(p - q) < 30){ out.push({date:new Date(t - step*(q/(q - p))), id, asp:nm}); } })));
      prev = cur;
    }
    const seen = new Set(); return out.filter(e => { const k = e.id + e.asp + Math.round(e.date/6e5); if(seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.date - b.date);
  }
  function moonIngresses(t0, t1){
    const c = C(), out = []; let s0 = c.si(c.lonOf("lune", new Date(t0)));
    for(let t = t0 + 3600e3; t <= t1; t += 3600e3){ const s1 = c.si(c.lonOf("lune", new Date(t)));
      if(s1 !== s0){ let a = t - 3600e3, b = t; for(let i = 0; i < 20; i++){ const mm = (a + b)/2; if(c.si(c.lonOf("lune", new Date(mm))) === s0) a = mm; else b = mm; } out.push({date:new Date(b), sign:s1}); s0 = s1; } }
    return out;
  }
  /* périodes de Lune vide de course : du dernier aspect exact au changement de signe */
  function vocPeriods(t0, t1){
    const ing = moonIngresses(t0 - 3*DAY, t1 + 3*DAY), asp = moonAspects(t0 - 3*DAY, t1 + 3*DAY), out = [];
    ing.forEach((g, i) => { const prevIng = i ? ing[i - 1].date : new Date(t0 - 3*DAY);
      const last = asp.filter(a => a.date > prevIng && a.date < g.date).pop(); const start = last ? last.date : prevIng;
      if(g.date > t0 && start < t1) out.push({start, end:g.date, last, sign:g.sign}); });
    return out;
  }
  P.moon = {moonAspects, moonIngresses, vocPeriods};

  /* ================= vague 1 : éphémérides ================= */
  let ephM = null;
  R.ephem = body => {
    const now = new Date(); if(!ephM) ephM = {y:now.getFullYear(), m:now.getMonth()};
    const c = C(), ids = [...MOD, "noeudn"], days = new Date(ephM.y, ephM.m + 1, 0).getDate();
    const rows = []; let prevSign = {}, prevRetro = {};
    for(let d = 1; d <= days; d++){ const date = new Date(Date.UTC(ephM.y, ephM.m, d)); const P_ = c.planets(date);
      rows.push({date, cells:ids.map(id => { const p = P_[id], l = zlon(p.lon, date), s = Math.floor(l/30); const ing = prevSign[id] != null && prevSign[id] !== s, sta = prevRetro[id] != null && prevRetro[id] !== p.retro; prevSign[id] = s; prevRetro[id] = p.retro; return {l, retro:p.retro, ing, sta}; })}); }
    const mname = new Date(ephM.y, ephM.m, 1).toLocaleDateString("fr-FR", {month:"long", year:"numeric"});
    const csv = () => ["Date;" + ids.map(id => PL()[id].court).join(";"), ...rows.map(r => r.date.toISOString().slice(0, 10) + ";" + r.cells.map(x => x.l.toFixed(3) + (x.retro ? " R" : "")).join(";"))].join("\n");
    body.innerHTML = `<div class="pf pf-bar"><button type="button" class="btn ghost small" data-em="-1">←</button><h2 class="pg-h2">${mname}</h2><button type="button" class="btn ghost small" data-em="1">→</button>
        <span class="pg-sp"></span><span class="help">À 0 h TU · zodiaque ${reg().zodiaque === "sideral" ? "sidéral (Lahiri)" : "tropical"}</span>${exportBar(false)}<button type="button" class="btn ghost small" data-csv>Tableau CSV</button></div>
      <div class="eph-wrap"><table class="eph"><thead><tr><th>Jour</th>${ids.map(id => `<th title="${PL()[id].court}">${gpl(id)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr${r.date.getUTCDay() === 0 ? ' class="sun"' : ""}><th>${r.date.toLocaleDateString("fr-FR", {weekday:"short", day:"numeric"})}</th>${r.cells.map(x => `<td class="${x.ing ? "ing" : ""}${x.sta ? " sta" : ""}">${fmtShort(x.l)}${x.retro ? "<i>℞</i>" : ""}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="help">En couleur : un changement de signe (fond) ou une station, quand la planète change de sens (trait). ℞ : rétrograde.</p>`;
    body.querySelectorAll("[data-em]").forEach(b => b.onclick = () => { ephM.m += +b.dataset.em; if(ephM.m < 0){ ephM.m = 11; ephM.y--; } if(ephM.m > 11){ ephM.m = 0; ephM.y++; } R.ephem(body); });
    body.querySelector("[data-csv]").onclick = () => saveBlob(`ephemerides-${ephM.y}-${String(ephM.m + 1).padStart(2, "0")}.csv`, new Blob(["﻿" + csv()], {type:"text/csv"}));
    bindExport(body, "ephemerides");
  };

  /* ================= vague 1 : le calendrier du ciel ================= */
  let calM = null;
  R.calendrier = body => {
    const now = new Date(); if(!calM) calM = {y:now.getFullYear(), m:now.getMonth()};
    const c = C(), t0 = new Date(calM.y, calM.m, 1), t1 = new Date(calM.y, calM.m + 1, 1), days = new Date(calM.y, calM.m + 1, 0).getDate();
    body.innerHTML = `<p class="help">Calcul du mois en cours…</p>`;
    setTimeout(() => {
      const ev = [];
      c.lunations(new Date(t0.getTime() - 2*DAY), 4).forEach(l => ev.push({date:l.date, k:l.type, t:`${l.type === "nl" ? "Nouvelle lune" : "Pleine lune"} à ${fmt(l.lon, l.date)}`}));
      c.events(t0, days + 1, ["soleil","mercure","venus","mars","jupiter","saturne","uranus","neptune","pluton"]).forEach(e => ev.push({date:e.date, k:e.type, t:e.type === "ingres" ? `${PL()[e.id].court} entre en ${SG()[e.sign].nom}` : `${PL()[e.id].court} ${e.retro ? "devient rétrograde" : "reprend sa marche directe"} à ${fmt(e.lon, e.date)}`}));
      c.eclipses(t0).forEach(e => { if(e.date < t1) ev.push({date:e.date, k:"ecl", t:`Éclipse ${e.type === "lune" ? "de Lune" : "de Soleil"} (${({total:"totale", partial:"partielle", annular:"annulaire", penumbral:"par la pénombre", hybrid:"hybride"})[e.kind] || e.kind})`}); });
      const voc = vocPeriods(t0.getTime(), t1.getTime());
      const inM = d => d >= t0 && d < t1;
      const retroDays = {}; for(let d = 1; d <= days; d++){ const P_ = c.planets(new Date(calM.y, calM.m, d, 12)); retroDays[d] = ["mercure","venus","mars","jupiter","saturne"].filter(id => P_[id].retro); }
      const first = (t0.getDay() + 6) % 7, cells = [];
      for(let i = 0; i < first; i++) cells.push(`<div class="cal-d empty"></div>`);
      for(let d = 1; d <= days; d++){
        const dd0 = new Date(calM.y, calM.m, d), dd1 = new Date(calM.y, calM.m, d + 1);
        const e = ev.filter(x => x.date >= dd0 && x.date < dd1), v = voc.filter(x => x.start < dd1 && x.end > dd0);
        const today = dd0.toDateString() === new Date().toDateString();
        cells.push(`<div class="cal-d${today ? " cal-today" : ""}"><b>${d}</b>${retroDays[d].length ? `<span class="cal-r" title="Rétrogrades">${retroDays[d].map(id => gpl(id)).join("")}℞</span>` : ""}
          ${e.map(x => `<p class="cal-e k-${x.k}">${x.k === "nl" ? "●" : x.k === "pl" ? "○" : x.k === "ecl" ? "◐" : x.k === "station" ? "℞" : "→"} ${x.t}</p>`).join("")}
          ${v.map(x => `<p class="cal-v">Lune vide ${x.start >= dd0 ? "dès " + fmtH(x.start) : ""}${x.end < dd1 ? (x.start >= dd0 ? " " : "") + "jusqu'à " + fmtH(x.end) : x.start < dd0 ? "toute la journée" : ""}</p>`).join("")}</div>`);
      }
      const list = [...ev.filter(x => inM(x.date)).map(x => ({d:x.date, t:x.t, k:x.k})), ...voc.filter(x => inM(x.start) || inM(x.end)).map(x => ({d:x.start, t:`Lune vide de course jusqu'à ${fmtDT(x.end)}, puis entrée en ${SG()[x.sign].nom}${x.last ? ` (dernier aspect : ${ASP()[x.last.asp].nom.toLowerCase()} à ${PL()[x.last.id].court})` : ""}`, k:"voc"}))].sort((a, b) => a.d - b.d);
      const mname = t0.toLocaleDateString("fr-FR", {month:"long", year:"numeric"});
      body.innerHTML = `<div class="pf pf-bar"><button type="button" class="btn ghost small" data-cm="-1">←</button><h2 class="pg-h2">${mname}</h2><button type="button" class="btn ghost small" data-cm="1">→</button><span class="pg-sp"></span>${exportBar(false)}</div>
        <div class="cal"><div class="cal-h">${["lun","mar","mer","jeu","ven","sam","dim"].map(x => `<span>${x}</span>`).join("")}</div><div class="cal-g">${cells.join("")}</div></div>
        <h3 class="dos-h3">Le mois en liste</h3><ol class="cal-list">${list.map(x => `<li class="k-${x.k}"><time>${fmtDT(x.d)}</time><span>${x.t}</span></li>`).join("")}</ol>
        <p class="help">Heures locales de cet appareil. La Lune est dite vide de course entre son dernier aspect exact (conjonction, sextile, carré, trigone, opposition) aux sept planètes traditionnelles et son entrée dans le signe suivant. Pour William Lilly, rien de ce qu'on commence alors n'aboutit.</p>`;
      body.querySelectorAll("[data-cm]").forEach(b => b.onclick = () => { calM.m += +b.dataset.cm; if(calM.m < 0){ calM.m = 11; calM.y--; } if(calM.m > 11){ calM.m = 0; calM.y++; } R.calendrier(body); });
      bindExport(body, "calendrier-du-ciel");
    }, 30);
  };

  /* ================= vague 2 : synastrie et composite ================= */
  const mid = (a, b) => { const d = norm(b - a); return norm(a + (d > 180 ? d - 360 : d)/2); };
  let syn = {a:null, b:null, mode:"syn"};
  R.synastrie = body => {
    const th = themes(); if(th.length < 2){ body.innerHTML = `<div class="pg-empty"><h3>Il faut deux thèmes</h3><p>La synastrie compare deux thèmes : le tien et celui d'une autre personne. Enregistre-les dans Mon thème, puis reviens ici.</p><p><button type="button" class="btn" data-agoto="theme">Ajouter un thème</button></p></div>`; return; }
    if(!syn.a || !th.find(t => t.id === syn.a)) syn.a = (th.find(t => t.moi) || th[0]).id;
    if(!syn.b || !th.find(t => t.id === syn.b) || syn.b === syn.a) syn.b = th.find(t => t.id !== syn.a).id;
    const tA = th.find(t => t.id === syn.a), tB = th.find(t => t.id === syn.b), chA = chartOfTheme(tA), chB = chartOfTheme(tB), c = C(), sc = school();
    let wheelH, listH;
    if(syn.mode === "syn"){
      const asp = c.aspectsBetween(ptsOf(chA), ptsOf(chB), sc, false).filter(x => x.orb <= 6);
      wheelH = P.roue({asc:chA.heure ? chA.asc : null, cusps:chA.heure ? chA.cusps : null, inner:ptsOf(chA).map(p => ({id:p.id, lon:p.lon})), outer:ptsOf(chB).map(p => ({id:p.id, lon:p.lon})), aspects:asp.filter(x => x.orb < 3).map(x => [chA.P[x.a].lon, chB.P[x.b].lon, aspCls(x.asp)]), label:`Synastrie de ${tA.nom} et ${tB.nom}`});
      const houseIn = (lon, ch) => ch.heure ? c.houseOf(lon, ch.cusps) : null;
      listH = `<h3 class="dos-h3">Les aspects entre les deux thèmes</h3><ul class="sy-list">${asp.slice(0, 18).map(x => `<li>${gpl(x.a)} <span class="ag asp ${ASP()[x.asp].cls}">${ASP()[x.asp].gl}${T}</span> ${gpl(x.b)}<span><b>${PL()[x.a].court} de ${hx(tA.nom)}</b> ${ASP()[x.asp].nom.toLowerCase()} <b>${PL()[x.b].court} de ${hx(tB.nom)}</b> · ${ASP()[x.asp].sens}. <i>Orbe ${x.orb.toFixed(1)}°</i></span></li>`).join("") || "<li>Aucun aspect serré.</li>"}</ul>
        ${chA.heure ? `<h3 class="dos-h3">Les planètes de ${hx(tB.nom)} dans les maisons de ${hx(tA.nom)}</h3><ul class="sy-houses">${ptsOf(chB).map(p => `<li>${gpl(p.id)} ${PL()[p.id].court} <b>maison ${houseIn(p.lon, chA)}</b></li>`).join("")}</ul>` : `<p class="help">Sans heure de naissance pour ${hx(tA.nom)}, les maisons ne sont pas calculées.</p>`}`;
    } else {
      const comp = ptsOf(chA).map(p => ({id:p.id, lon:mid(p.lon, chB.P[p.id].lon)}));
      const cAsc = chA.heure && chB.heure ? mid(chA.asc, chB.asc) : null, cMc = chA.heure && chB.heure ? mid(chA.mc, chB.mc) : null;
      const pseudo = {P:Object.fromEntries(comp.map(p => [p.id, {lon:p.lon, speed:0}])), heure:false};
      const asp = c.aspectsBetween(comp.map(p => ({...p, speed:0})), comp.map(p => ({...p, speed:0})), sc, true);
      wheelH = P.roue({asc:cAsc, inner:comp, aspects:asp.filter(x => x.orb < 4).map(x => [pseudo.P[x.a].lon, pseudo.P[x.b].lon, aspCls(x.asp)]), label:"Thème composite"});
      listH = `<p class="help">Le composite place chaque planète au point milieu entre ses deux positions : le thème du couple ou de la relation, comme une troisième personne. Méthode de Robert Hand (années 1970).</p>
        ${cAsc != null ? `<p>Ascendant composite : <b>${fmt(cAsc)}</b> · Milieu du Ciel composite : <b>${fmt(cMc)}</b></p>` : ""}
        <ul class="sy-houses">${comp.map(p => `<li>${gpl(p.id)} ${PL()[p.id].court} <b>${fmt(p.lon)}</b></li>`).join("")}</ul>
        <h3 class="dos-h3">Ses aspects</h3><ul class="sy-list">${asp.slice(0, 12).map(x => `<li>${gpl(x.a)} <span class="ag asp ${ASP()[x.asp].cls}">${ASP()[x.asp].gl}${T}</span> ${gpl(x.b)}<span>${ASP()[x.asp].nom} ${PL()[x.a].court}–${PL()[x.b].court} : ${ASP()[x.asp].sens}. <i>Orbe ${x.orb.toFixed(1)}°</i></span></li>`).join("")}</ul>`;
    }
    body.innerHTML = `<div class="pf pf-bar">${themeSelect("sa", syn.a, "Premier thème")}${themeSelect("sb", syn.b, "Second thème")}
        <div class="a-seg" role="group"><button type="button" data-smode="syn" class="${syn.mode === "syn" ? "on" : ""}">Synastrie</button><button type="button" data-smode="comp" class="${syn.mode === "comp" ? "on" : ""}">Composite</button></div></div>
      <div class="pg-two"><figure class="pg-wheel">${wheelH}<figcaption class="help">${syn.mode === "syn" ? `Au centre, ${hx(tA.nom)} ; en rouge, à l'extérieur, ${hx(tB.nom)}.` : `Les points milieux de ${hx(tA.nom)} et ${hx(tB.nom)}.`}</figcaption>${exportBar(true)}</figure><div>${listH}</div></div>`;
    body.querySelector("[data-sa]").onchange = e => { syn.a = e.target.value; if(syn.b === syn.a) syn.b = null; R.synastrie(body); };
    body.querySelector("[data-sb]").onchange = e => { syn.b = e.target.value; R.synastrie(body); };
    body.querySelectorAll("[data-smode]").forEach(b => b.onclick = () => { syn.mode = b.dataset.smode; R.synastrie(body); });
    bindExport(body, syn.mode === "syn" ? "synastrie" : "composite", syn.mode === "syn" ? `${tA.nom} et ${tB.nom}` : `Composite ${tA.nom} et ${tB.nom}`);
  };

  /* ================= vague 2 : révolution solaire ================= */
  let rs = {id:null, year:new Date().getFullYear(), lieu:"natal"};
  R.revolution = body => {
    const th = themes(); if(!th.length) return noThemes(body);
    if(!rs.id || !th.find(t => t.id === rs.id)) rs.id = (th.find(t => t.moi) || th[0]).id;
    const t = th.find(x => x.id === rs.id), nat = chartOfTheme(t), c = C();
    const after = new Date(Date.UTC(rs.year, (t.m || 1) - 1, (t.d || 1) - 5));
    const when = c.solarReturn(nat, after);
    const L = rs.lieu === "natal" ? (t.lieu || {}) : st().lieu;
    const ch = c.chart({date:when, lat:+L.lat || 0, lon:+L.lon || 0, heure:true, system:school() === "tradition" ? st().sysTrad : st().sysMod});
    const ids = school() === "tradition" ? TRAD : MOD;
    const natHouse = nat.heure ? c.houseOf(ch.asc, nat.cusps) : null;
    const angular = ids.filter(id => [1, 4, 7, 10].includes(ch.P[id].house));
    body.innerHTML = `<div class="pf pf-bar">${themeSelect("rt", rs.id, "Le thème")}<label class="pf-l"><span class="eyebrow">L'année</span><input type="number" data-ry value="${rs.year}" min="1900" max="2100" style="width:96px"></label>
        <label class="pf-l"><span class="eyebrow">Le lieu de l'anniversaire</span><select data-rl><option value="natal"${rs.lieu === "natal" ? " selected" : ""}>Lieu de naissance (${hx((t.lieu || {}).nom || "")})</option><option value="ici"${rs.lieu === "ici" ? " selected" : ""}>Lieu du ciel du jour (${hx(st().lieu.nom)})</option></select></label></div>
      <div class="pg-two"><figure class="pg-wheel">${P.roue({asc:ch.asc, cusps:ch.cusps, inner:ids.map(id => ({id, lon:ch.P[id].lon})), outer:ids.map(id => ({id, lon:nat.P[id].lon})), label:"Révolution solaire"})}<figcaption class="help">Au centre, la révolution ; à l'extérieur, en rouge, le thème natal.</figcaption>${exportBar(true)}</figure>
      <div><p class="eyebrow">Révolution solaire ${rs.year}</p><h3 class="pg-h3">${fmtD(when)} à ${fmtH(when)}</h3>
        <p>Le Soleil revient exactement à sa place de naissance (${fmt(nat.P.soleil.lon)}). Le thème de cet instant, dressé pour le lieu où l'on se trouve, se lit comme le climat de l'année qui s'ouvre.</p>
        <ul class="sy-houses"><li>Ascendant de l'année <b>${fmt(ch.asc)}</b>${natHouse ? `, dans ta maison ${natHouse} natale` : ""}</li><li>Soleil <b>maison ${ch.P.soleil.house}</b> : le domaine où l'énergie de l'année se concentre</li><li>Lune <b>${fmt(ch.P.lune.lon)}</b>, maison ${ch.P.lune.house}</li>
        ${angular.length ? `<li>Planètes angulaires : <b>${angular.map(id => PL()[id].court).join(", ")}</b>, les plus fortes de l'année</li>` : ""}</ul>
        <p class="help">Changer de lieu pour son anniversaire change les maisons de la révolution : c'est le principe des « voyages de révolution », discuté chez les astrologues.</p></div></div>`;
    body.querySelector("[data-rt]").onchange = e => { rs.id = e.target.value; R.revolution(body); };
    body.querySelector("[data-ry]").onchange = e => { rs.year = +e.target.value || rs.year; R.revolution(body); };
    body.querySelector("[data-rl]").onchange = e => { rs.lieu = e.target.value; R.revolution(body); };
    bindExport(body, "revolution-solaire-" + rs.year, `${t.nom} · révolution ${rs.year}`);
  };

  /* ================= vague 3 : astrologie horaire ================= */
  const MAISONS_Q = [[2,"L'argent, un objet perdu"],[3,"Un frère, une sœur, un message, un court trajet"],[4,"La maison, un bien immobilier, un parent"],[5,"Un enfant, une grossesse, un plaisir"],[6,"Une maladie, un employé, un animal"],[7,"Le partenaire, l'adversaire, un contrat"],[8,"La mort, l'argent d'autrui, un héritage"],[9,"Un long voyage, les études, la religion"],[10,"Le métier, la réputation, un supérieur"],[11,"Un ami, un espoir"],[12,"Un ennemi caché, une épreuve, un grand animal"]];
  let hq = {q:"", h:7, when:null, lieu:null};
  const rulerOf = s => SG()[s].maitre;
  function horaryChart(date, L){ return C().chart({date, lat:+L.lat, lon:+L.lon, heure:true, system:"regio"}); }
  R.horaire = body => {
    const L = hq.lieu || st().lieu, when = hq.when || new Date(), c = C();
    const ch = horaryChart(when, L), ascS = c.si(ch.asc), ascDeg = ch.asc % 30;
    const sigQ = rulerOf(ascS), cuspQ = ch.cusps[hq.h - 1], sigE = rulerOf(c.si(cuspQ));
    const asp = moonAspects(when.getTime(), when.getTime() + 3*DAY, 1800e3), ing = moonIngresses(when.getTime(), when.getTime() + 3*DAY)[0];
    const before = asp.filter(a => ing && a.date < ing.date), voc = !before.length;
    const pastAsp = moonAspects(when.getTime() - 3*DAY, when.getTime(), 1800e3).pop();
    const vc = ch.P.lune.lon >= 195 && ch.P.lune.lon <= 225;
    const sat = [1, 7].includes(ch.P.saturne.house) ? ch.P.saturne.house : null;
    let ph = null; try{ ph = c.planetaryHour(when, +L.lat, +L.lon, L.tz); }catch(e){}
    const perf = c.aspectsBetween([{id:sigQ, lon:ch.P[sigQ].lon, speed:ch.P[sigQ].speed}], [{id:sigE, lon:ch.P[sigE].lon, speed:ch.P[sigE].speed}], "tradition", false).filter(x => x.app);
    const moonToE = asp.find(a => a.id === sigE && (!ing || a.date < ing.date));
    const checks = [
      [ascDeg < 3 ? "warn" : ascDeg > 27 ? "warn" : "ok", "L'Ascendant", ascDeg < 3 ? `${Math.floor(ascDeg)}° seulement : la question est posée trop tôt, l'affaire n'est pas mûre.` : ascDeg > 27 ? `${Math.floor(ascDeg)}° : trop tard, l'affaire est déjà jouée ou la personne a déjà décidé.` : `${Math.floor(ascDeg)}° ${SG()[ascS].nom} : ni trop tôt, ni trop tard.`],
      [voc ? "warn" : "ok", "La Lune", voc ? `Vide de course jusqu'à son entrée en ${ing ? SG()[ing.sign].nom : "?"} : selon Lilly, il n'en sortira pas grand-chose.` : `Elle formera encore ${before.length} aspect${before.length > 1 ? "s" : ""} avant de changer de signe, le premier : ${ASP()[before[0].asp].nom.toLowerCase()} à ${PL()[before[0].id].court}.`],
      [vc ? "warn" : "ok", "La voie combuste", vc ? "La Lune est entre 15° Balance et 15° Scorpion : une zone que la tradition juge troublée." : "La Lune n'est pas dans la voie combuste."],
      [sat ? "warn" : "ok", "Saturne", sat ? `En maison ${sat} : un avertissement de Lilly, ${sat === 1 ? "l'affaire tourne rarement bien pour celui qui demande" : "l'astrologue risque de se tromper"}.` : "Ni en maison 1 ni en maison 7."],
      ["info", "L'heure planétaire", ph ? `Heure de ${PL()[ph.hourRuler].court}, jour de ${PL()[ph.dayRuler].court}. Le maître de l'Ascendant est ${PL()[sigQ].court}.` : "Non calculée."]
    ];
    body.innerHTML = `<div class="pf pf-bar"><label class="pf-l pf-grow"><span class="eyebrow">La question</span><input type="text" data-hq value="${hx(hq.q)}" placeholder="Par exemple : vais-je obtenir ce poste ?"></label>
        <label class="pf-l"><span class="eyebrow">Ce qu'elle concerne</span><select data-hh>${MAISONS_Q.map(([n, l]) => `<option value="${n}"${hq.h === n ? " selected" : ""}>${n}. ${l}</option>`).join("")}</select></label>
        <label class="pf-l"><span class="eyebrow">Le moment</span><input type="datetime-local" data-hw value="${new Date(when.getTime() - when.getTimezoneOffset()*6e4).toISOString().slice(0, 16)}"></label>
        <label class="pf-l"><span class="eyebrow">Le lieu</span><input list="pg-cities" data-hl value="${hx(L.nom)}"><datalist id="pg-cities">${lieuOpts()}</datalist></label></div>
      <div class="pg-two"><figure class="pg-wheel">${A().wheel(ch, {prefix:"hq", label:"Thème horaire"})}<figcaption class="help">Maisons de Regiomontanus, comme chez Lilly. ${hx(L.nom)}, ${fmtDT(when)}.</figcaption>${exportBar(true)}</figure>
      <div><h3 class="pg-h3">${hq.q ? hx(hq.q) : "Ta question"}</h3>
        <p class="eyebrow">Avant de juger</p><ul class="hq-checks">${checks.map(([k, t, x]) => `<li class="hq-${k}"><b>${t}</b><span>${x}</span></li>`).join("")}</ul>
        <p class="eyebrow">Les significateurs</p>
        <ul class="sy-houses"><li>Toi : ${gpl(sigQ)} <b>${PL()[sigQ].court}</b>, maître de l'Ascendant, à ${fmt(ch.P[sigQ].lon)}, et la Lune, ${fmt(ch.P.lune.lon)}</li>
          <li>L'objet de la question : ${gpl(sigE)} <b>${PL()[sigE].court}</b>, maître de la maison ${hq.h} (${SG()[c.si(cuspQ)].nom}), à ${fmt(ch.P[sigE].lon)}</li></ul>
        <p class="eyebrow">La perfection</p>
        <p>${sigQ === sigE ? `Le même astre gouverne les deux maisons : l'affaire et la personne sont liées d'avance.` : perf.length ? `${PL()[sigQ].court} et ${PL()[sigE].court} s'appliquent l'un à l'autre par ${ASP()[perf[0].asp].nom.toLowerCase()} (orbe ${perf[0].orb.toFixed(1)}°) : la tradition y voit une affaire qui se fait${["carre","opp"].includes(perf[0].asp) ? ", mais avec peine" : ""}.` : moonToE ? `Pas d'aspect direct entre les significateurs, mais la Lune porte la lumière vers ${PL()[sigE].court} (${ASP()[moonToE.asp].nom.toLowerCase()} le ${fmtDT(moonToE.date)}).` : `Aucun aspect appliquant entre les significateurs, et la Lune ne les relie pas : selon les règles de Lilly, l'affaire ne se fait pas, ou pas maintenant.`}</p>
        ${pastAsp ? `<p class="help">Dernier aspect de la Lune : ${ASP()[pastAsp.asp].nom.toLowerCase()} à ${PL()[pastAsp.id].court}, le ${fmtDT(pastAsp.date)} : ce qui vient de se passer.</p>` : ""}
        <p class="help">Ces règles sont celles de William Lilly (Christian Astrology, 1647). Arcanes les applique mécaniquement : un astrologue horaire pèse aussi les réceptions, les dignités et le contexte de la question.</p></div></div>`;
    body.querySelector("[data-hq]").onchange = e => { hq.q = e.target.value; R.horaire(body); };
    body.querySelector("[data-hh]").onchange = e => { hq.h = +e.target.value; R.horaire(body); };
    body.querySelector("[data-hw]").onchange = e => { const d = new Date(e.target.value); if(!isNaN(d)) hq.when = d; R.horaire(body); };
    body.querySelector("[data-hl]").onchange = e => { const f = findCity(e.target.value); if(f){ hq.lieu = f; R.horaire(body); } };
    bindExport(body, "theme-horaire", hq.q || "Thème horaire");
  };

  /* ================= vague 3 : astrologie élective ================= */
  const BUTS = {contrat:["Signer un contrat", "mercure"], amour:["Un rendez-vous amoureux", "venus"], argent:["Un achat, une affaire", "jupiter"], projet:["Lancer un projet", "soleil"], voyage:["Partir en voyage", "mercure"], sante:["Une opération, un soin", "mars"]};
  let el = {but:"contrat", jours:30};
  R.elective = body => {
    body.innerHTML = `<div class="pf pf-bar"><label class="pf-l"><span class="eyebrow">Ce que tu veux commencer</span><select data-eb>${Object.entries(BUTS).map(([k, [l]]) => `<option value="${k}"${el.but === k ? " selected" : ""}>${l}</option>`).join("")}</select></label>
      <label class="pf-l"><span class="eyebrow">Dans les</span><select data-ej>${[14, 30, 60].map(n => `<option value="${n}"${el.jours === n ? " selected" : ""}>${n} prochains jours</option>`).join("")}</select></label></div>
      <p class="help" data-eload>Recherche des bons moments…</p><div data-eres></div>`;
    body.querySelector("[data-eb]").onchange = e => { el.but = e.target.value; R.elective(body); };
    body.querySelector("[data-ej]").onchange = e => { el.jours = +e.target.value; R.elective(body); };
    setTimeout(() => {
      const c = C(), t0 = Date.now(), t1 = t0 + el.jours*DAY, key = BUTS[el.but][1];
      const voc = vocPeriods(t0, t1), asp = moonAspects(t0, t1 + 3*DAY, 3600e3);
      const slots = [];
      for(let t = t0; t < t1; t += 3*3600e3){
        const d = new Date(t), P_ = c.planets(d), why = [], bad = [];
        let s = 0;
        if(voc.some(v => d >= v.start && d < v.end)){ bad.push("Lune vide de course"); s -= 5; }
        const mi = c.moonInfo(d); if(mi.phase < 180){ s += 1; why.push("Lune croissante"); } else bad.push("Lune décroissante");
        if(P_.lune.lon >= 195 && P_.lune.lon <= 225){ s -= 2; bad.push("voie combuste"); }
        const next = asp.find(a => a.date > d); if(next){ if(["venus","jupiter"].includes(next.id) && !["carre","opp"].includes(next.asp)){ s += 2; why.push(`la Lune va vers ${PL()[next.id].court}`); } else if(["mars","saturne"].includes(next.id) && ["carre","opp","conj"].includes(next.asp)){ s -= 2; bad.push(`la Lune va vers ${PL()[next.id].court}`); } }
        if(P_[key].retro){ s -= 2; bad.push(`${PL()[key].court} rétrograde`); } else if(key !== "soleil"){ s += 1; why.push(`${PL()[key].court} direct`); }
        if(P_.mercure.retro && key !== "mercure" && el.but !== "amour"){ s -= 1; bad.push("Mercure rétrograde"); }
        const dg = (() => { const sg = c.si(P_.lune.lon); return SG()[sg].maitre === "lune" || (SG()[sg].exalt && SG()[sg].exalt[0] === "lune"); })(); if(dg){ s += 1; why.push("Lune en dignité"); }
        slots.push({d, s, why, bad});
      }
      const wins = []; let curW = null;
      slots.forEach(x => { if(x.s >= 3 && !x.bad.length){ if(curW && x.d - curW.end <= 3*3600e3 + 1){ curW.end = x.d; curW.s = Math.max(curW.s, x.s); } else { curW = {start:x.d, end:x.d, s:x.s, why:x.why}; wins.push(curW); } } else curW = null; });
      wins.sort((a, b) => b.s - a.s || a.start - b.start);
      const top = wins.slice(0, 8).sort((a, b) => a.start - b.start);
      body.querySelector("[data-eload]").remove();
      body.querySelector("[data-eres]").innerHTML = top.length ? `<ol class="el-list">${top.map(w => `<li><time>${fmtDT(w.start)} → ${fmtDT(new Date(w.end.getTime() + 3*3600e3))}</time><span>${w.why.join(" · ")}</span></li>`).join("")}</ol>` : `<p>Aucune fenêtre ne réunit toutes les conditions sur cette période. Allonge la recherche, ou accepte une Lune décroissante.</p>`;
      body.querySelector("[data-eres]").insertAdjacentHTML("beforeend", `<p class="help">Les règles retenues sont classiques en astrologie élective : éviter la Lune vide de course et la voie combuste, préférer la Lune croissante qui va vers un bénéfique, et un astre principal direct (ici ${PL()[key].court}). L'heure exacte, l'Ascendant et le thème natal de la personne restent à choisir avec soin.</p>`);
    }, 30);
  };

  /* ================= vague 4 : réglages et techniques ================= */
  /* longitudes écliptiques J2000 */
  const ETOILES = [["Algol", 56.17, "β Persée", "malheur, violence"], ["Alcyone", 59.99, "les Pléiades", "larmes, vue"], ["Aldébaran", 69.79, "α Taureau", "honneur, intégrité"], ["Rigel", 76.84, "β Orion", "renommée"], ["Bételgeuse", 88.75, "α Orion", "succès"], ["Sirius", 104.08, "α Grand Chien", "gloire, ardeur"], ["Castor", 110.24, "α Gémeaux", "esprit vif"], ["Pollux", 113.22, "β Gémeaux", "audace"], ["Régulus", 149.83, "α Lion", "royauté, chute par la vengeance"], ["Spica", 203.84, "α Vierge", "talent, protection"], ["Arcturus", 204.24, "α Bouvier", "prospérité"], ["Antarès", 249.77, "α Scorpion", "courage, violence"], ["Vega", 285.32, "α Lyre", "art, charme"], ["Altaïr", 301.78, "α Aigle", "audace"], ["Fomalhaut", 333.87, "α Poisson austral", "idéal, renommée"], ["Achernar", 345.32, "α Éridan", "succès religieux"]];
  const starLon = (l2000, date) => norm(l2000 + (date.getUTCFullYear() - 2000) * 50.29/3600);
  const FIRD_D = [["soleil",10],["venus",8],["mercure",13],["lune",9],["saturne",11],["jupiter",12],["mars",7],["noeudn",3],["noeuds",2]];
  const FIRD_N = [["lune",9],["saturne",11],["jupiter",12],["mars",7],["soleil",10],["venus",8],["mercure",13],["noeudn",3],["noeuds",2]];
  const ZR_YEARS = [15, 8, 20, 25, 19, 20, 8, 15, 12, 27, 30, 12];
  let tech = {id:null};
  R.reglages = body => {
    const r = reg(), s = st(), th = themes();
    const sysSel = (name, v) => `<select data-rsys="${name}">${[["placidus","Placidus"],["regio","Regiomontanus"],["campanus","Campanus"],["porphyre","Porphyre"],["signes","Signes entiers"],["egal","Maisons égales"]].map(([k, n]) => `<option value="${k}"${v === k ? " selected" : ""}>${n}</option>`).join("")}</select>`;
    let techH = "";
    if(th.length){
      if(!tech.id || !th.find(t => t.id === tech.id)) tech.id = (th.find(t => t.moi) || th[0]).id;
      const t = th.find(x => x.id === tech.id), ch = chartOfTheme(t), c = C(), born = ch.date, now = new Date();
      const pts = [...TRAD.map(id => ({id, nom:PL()[id].court, lon:ch.P[id].lon})), ...(ch.heure ? [{id:"asc", nom:"Ascendant", lon:ch.asc}, {id:"mc", nom:"Milieu du Ciel", lon:ch.mc}] : [])];
      const stars = []; ETOILES.forEach(([n, l, con, sens]) => { const L = starLon(l, born); pts.forEach(p => { const o = sep(p.lon, L); if(o <= 1.5) stars.push({n, con, sens, p, o}); }); });
      const anti = []; pts.forEach(p => { const a = norm(180 - p.lon), ca = norm(360 - p.lon); pts.forEach(q => { if(q.id === p.id) return; if(sep(a, q.lon) <= 1.5 && p.id < q.id) anti.push({p, q, o:sep(a, q.lon), k:"antiscion"}); if(sep(ca, q.lon) <= 1.5 && p.id < q.id) anti.push({p, q, o:sep(ca, q.lon), k:"contrantiscion"}); }); });
      const diurne = ch.heure ? ch.diurne : true, seq = diurne ? FIRD_D : FIRD_N;
      const fird = []; let y0 = 0; seq.forEach(([id, yrs]) => { const start = new Date(born.getTime() + y0*365.2422*DAY), end = new Date(born.getTime() + (y0 + yrs)*365.2422*DAY);
        const subs = id.startsWith("noeud") ? [] : (() => { const order = seq.filter(x => !x[0].startsWith("noeud")).map(x => x[0]); const i0 = order.indexOf(id); return order.slice(i0).concat(order.slice(0, i0)).map((sid, k) => ({id:sid, start:new Date(start.getTime() + k*(end - start)/7), end:new Date(start.getTime() + (k + 1)*(end - start)/7)})); })();
        fird.push({id, yrs, start, end, subs}); y0 += yrs; });
      const fNow = fird.find(f => now >= f.start && now < f.end), fsub = fNow && fNow.subs.find(x => now >= x.start && now < x.end);
      const lots = c.lots(ch);
      let zr = null;
      if(lots){ const s0 = c.si(lots.esprit), fort = c.si(lots.fortune), yr = 360*DAY; const L1 = []; let t0 = born.getTime(), k = 0;
        while(t0 < born.getTime() + 100*365.25*DAY && k < 24){ const sg = (s0 + k) % 12, len = ZR_YEARS[sg]*yr; L1.push({sg, start:new Date(t0), end:new Date(t0 + len), peak:[0, 3, 6, 9].includes((sg - fort + 12) % 12)}); t0 += len; k++; }
        const cur = L1.find(p => now >= p.start && now < p.end); let L2 = [];
        if(cur){ let t = cur.start.getTime(), j = 0; while(t < cur.end.getTime() && j < 40){ const sg = (cur.sg + j) % 12; const len = ZR_YEARS[sg]/12*yr; L2.push({sg, start:new Date(t), end:new Date(Math.min(t + len, cur.end.getTime())), peak:[0, 3, 6, 9].includes((sg - fort + 12) % 12)}); t += len; j++; } }
        zr = {L1, cur, L2, s0, fort}; }
      const yrs = d => ((d - born)/(365.2422*DAY)).toFixed(0);
      techH = `<section class="pg-sec"><div class="pf pf-bar">${themeSelect("tt", tech.id, "Les techniques appliquées au thème de")}</div>
        <div class="tq-grid">
          <article class="tq"><h3>Les étoiles fixes</h3><p class="help">Conjonctions à 1°30 près avec les planètes et les angles, étoiles précessées à la date de naissance.</p>
            ${stars.length ? `<ul class="tq-list">${stars.map(x => `<li><b>${x.n}</b> <small>${x.con}</small> conjointe à ${x.p.nom} <i>${x.o.toFixed(1)}°</i><span>${x.sens}</span></li>`).join("")}</ul>` : `<p>Aucune grande étoile ne touche une planète ou un angle.</p>`}</article>
          <article class="tq"><h3>Les antisces</h3><p class="help">Le reflet de chaque point de part et d'autre de l'axe Cancer–Capricorne (l'axe des solstices). Deux planètes dont l'une tombe sur le reflet de l'autre se « voient » en secret.</p>
            ${anti.length ? `<ul class="tq-list">${anti.map(x => `<li>${x.p.nom} et ${x.q.nom} <small>${x.k}</small> <i>${x.o.toFixed(1)}°</i></li>`).join("")}</ul>` : `<p>Aucun contact par antisce à 1°30 près.</p>`}
            <details><summary>Tous les antisces</summary><ul class="tq-list">${pts.map(p => `<li>${p.nom} : ${fmt(norm(180 - p.lon))}</li>`).join("")}</ul></details></article>
          <article class="tq tq-wide"><h3>Les firdaria</h3><p class="help">Les périodes de vie des astrologues persans (Abu Ma'shar) : chaque astre gouverne quelques années, ${diurne ? "en partant du Soleil pour une naissance de jour" : "en partant de la Lune pour une naissance de nuit"}, puis les nœuds. Chaque période planétaire se divise en sept.</p>
            <ol class="tl">${fird.map(f => `<li class="${f === fNow ? "on" : ""}" style="--w:${f.yrs}"><b>${PL()[f.id].gl}${T}</b><span>${PL()[f.id].court}</span><small>${yrs(f.start)}–${yrs(f.end)} ans</small></li>`).join("")}</ol>
            ${fNow ? `<p>En ce moment : période de <b>${PL()[fNow.id].court}</b>${fsub ? `, sous-période de <b>${PL()[fsub.id].court}</b> jusqu'au ${fmtD(fsub.end)}` : ""}.</p>` : ""}</article>
          <article class="tq tq-wide"><h3>Le releasing zodiacal</h3><p class="help">La technique de Vettius Valens (IIe siècle) : depuis le Lot de l'Esprit, chaque signe ouvre une période d'autant d'années que son maître a d'« années mineures » (années de 360 jours). Les signes angulaires depuis le Lot de Fortune marquent les sommets.</p>
            ${zr ? `<p>Lot de l'Esprit en <b>${SG()[zr.s0].nom}</b>, Lot de Fortune en <b>${SG()[zr.fort].nom}</b>.</p>
              <ol class="tl">${zr.L1.filter(p => p.start < new Date(born.getTime() + 95*365.25*DAY)).map(p => `<li class="${p === zr.cur ? "on" : ""}${p.peak ? " peak" : ""}" style="--w:${(p.end - p.start)/(360*DAY)}"><b>${SG()[p.sg].gl}${T}</b><span>${SG()[p.sg].nom}</span><small>${yrs(p.start)} ans</small></li>`).join("")}</ol>
              ${zr.cur ? `<p>Niveau 1 : <b>${SG()[zr.cur.sg].nom}</b> jusqu'au ${fmtD(zr.cur.end)}${zr.cur.peak ? ", une période de sommet" : ""}. Niveau 2 :</p><ol class="tl tl-2">${zr.L2.map(p => `<li class="${new Date() >= p.start && new Date() < p.end ? "on" : ""}${p.peak ? " peak" : ""}" style="--w:${(p.end - p.start)/(30*DAY)}"><b>${SG()[p.sg].gl}${T}</b><small>${p.start.toLocaleDateString("fr-FR", {month:"short", year:"2-digit"})}</small></li>`).join("")}</ol>` : ""}
              <p class="help">Version simplifiée : la « libération du lien », quand le niveau 2 saute au signe opposé après un tour complet, n'est pas encore appliquée.</p>` : `<p>Il faut l'heure de naissance pour calculer les lots.</p>`}</article>
        </div></section>`;
    }
    body.innerHTML = `<section class="pg-sec"><div class="rg-grid">
        <div class="rg"><h3>Les orbes</h3><p class="help">La tolérance accordée aux aspects, dans tout Arcanes. 100 % : les valeurs de l'école choisie.</p>
          <input type="range" data-rorb min="50" max="150" step="5" value="${Math.round(r.orbe*100)}"><p><b data-rorbv>${Math.round(r.orbe*100)} %</b> · conjonction ${(ASP().conj.orb).toFixed(1)}°, carré ${(ASP().carre.orb).toFixed(1)}°</p></div>
        <div class="rg"><h3>Les maisons</h3><p class="help">Utilisées dans tous les thèmes. Campanus et Porphyre s'ajoutent aux quatre systèmes d'origine.</p>
          <label>En tradition ${sysSel("sysTrad", s.sysTrad)}</label><label>En moderne ${sysSel("sysMod", s.sysMod)}</label></div>
        <div class="rg"><h3>Le zodiaque</h3><p class="help">Tropical : le 0° du Bélier à l'équinoxe, comme en Occident. Sidéral : calé sur les étoiles, comme en Inde (ayanamsa de Lahiri, environ ${ayan(new Date()).toFixed(1)}° aujourd'hui). Le sidéral s'applique aux outils de cette page.</p>
          <div class="a-seg"><button type="button" data-rz="tropical" class="${r.zodiaque === "tropical" ? "on" : ""}">Tropical</button><button type="button" data-rz="sideral" class="${r.zodiaque === "sideral" ? "on" : ""}">Sidéral</button></div></div>
      </div></section>
      ${techH || `<div class="pg-empty"><h3>Les techniques</h3><p>Étoiles fixes, antisces, firdaria et releasing zodiacal s'appliquent à un thème enregistré.</p><p><button type="button" class="btn" data-agoto="theme">Dresser un thème</button></p></div>`}`;
    const orb = body.querySelector("[data-rorb]"); orb.oninput = () => { body.querySelector("[data-rorbv]").textContent = orb.value + " %"; }; orb.onchange = () => { setReg("orbe", +orb.value/100); R.reglages(body); };
    body.querySelectorAll("[data-rsys]").forEach(sel => sel.onchange = () => { const S = st(); S[sel.dataset.rsys] = sel.value; try{ localStorage.setItem("arcanes.astro.v1", JSON.stringify(S)); }catch(e){} });
    body.querySelectorAll("[data-rz]").forEach(b => b.onclick = () => { setReg("zodiaque", b.dataset.rz); R.reglages(body); });
    const tt = body.querySelector("[data-tt]"); if(tt) tt.onchange = () => { tech.id = tt.value; R.reglages(body); };
  };

  P.onReady.push(applyOrbs);
})();

/* ===== Démarrage des modules ===== */
(() => {
  const P = window.ArcanesPlus;
  const run = () => [...(P.onReady || []), ...(P.onLate || [])].forEach(f => { try{ f(); }catch(e){ console.error("Arcanes", e); } });
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(run, 0)); else setTimeout(run, 0);
})();


/* ===== Deux objets à part entière, accueillis tels quels =====
   L'Observatoire astral (astro/observatoire.html) remplace « Le ciel vu du Soleil » dans Le ciel du jour,
   avec en option le détail des positions. L'Atelier du Zodiaque (astro/atelier-zodiaque.html) ouvre L'atelier.
   Leur code n'est pas modifié : ils vivent dans leur propre page, chargée dans un cadre qui prend leur hauteur.
   Pour les retirer : P.useObservatoire = false et enlever l'onglet « cles » de PAGES.atelier. */
(() => {
  const P = window.ArcanesPlus, hx = P.hx, T = "︎";
  P.useObservatoire = true;

  /* un cadre qui prend exactement la hauteur de son contenu */
  function fit(frame){
    const set = () => { try{ const d = frame.contentDocument; if(!d || !d.body) return; const h = Math.ceil(d.body.getBoundingClientRect().height); if(h) frame.style.height = h + "px"; }catch(e){} };
    frame.addEventListener("load", () => {
      set();
      try{ const d = frame.contentDocument; new ResizeObserver(set).observe(d.body); d.fonts && d.fonts.ready.then(set); }catch(e){}
      setTimeout(set, 400); setTimeout(set, 1500);
    });
  }
  P.fitFrame = fit;
  /* secours : si l'app ne peut pas lire le cadre, c'est la page hôte qui donne sa hauteur */
  window.addEventListener("message", e => {
    if(!e.data || e.data.type !== "arcanes-frame-height" || !(e.data.h > 0)) return;
    document.querySelectorAll(".obs-frame, .az-frame").forEach(f => { if(f.contentWindow === e.source) f.style.height = e.data.h + "px"; });
  });

  /* ---------- L'Observatoire dans Le ciel du jour ---------- */
  const SIG = ["Bélier","Taureau","Gémeaux","Cancer","Lion","Vierge","Balance","Scorpion","Sagittaire","Capricorne","Verseau","Poissons"];
  const norm = a => ((a % 360) + 360) % 360;
  const pos = l => { l = norm(l); const d = Math.floor(l % 30), m = Math.floor((l % 1)*60); return `${d}°${String(m).padStart(2, "0")}′ ${SIG[Math.floor(l/30)]}`; };
  const sgOf = l => SIG[Math.floor(norm(l)/30)];
  const nf = (x, p = 2) => x.toLocaleString("fr-FR", {minimumFractionDigits:p, maximumFractionDigits:p});
  const AU_KM = 149597870.7;
  let obsT = null;

  function geoLon(A, body, d){ return A.Ecliptic(A.GeoVector(body, d, true)).elon; }
  function data(t){
    const A = window.Astronomy, d = new Date(t), D = ASTRO_DATA;
    const half = new Date(t + 432e5), halfB = new Date(t - 432e5);
    const earthHelio = norm(A.SunPosition(d).elon + 180);
    return D.PLANETS.filter(p => p.body && A.Body[p.body]).map(p => {
      const B = A.Body[p.body];
      const geo = geoLon(A, B, d);
      const speed = ((geoLon(A, B, half) - geoLon(A, B, halfB) + 540) % 360) - 180;
      const gv = A.GeoVector(B, d, true), dEarth = Math.hypot(gv.x, gv.y, gv.z);
      let helio = null, dSun = null;
      if(p.body === "Moon"){ helio = null; }
      else if(p.body !== "Sun"){ const hv = A.HelioVector(B, d); helio = A.Ecliptic(hv).elon; dSun = Math.hypot(hv.x, hv.y, hv.z); }
      return {p, geo, helio, speed, dEarth, dSun};
    }).concat([{earth:true, helio:earthHelio, dSun:Math.hypot(...["x","y","z"].map(k => A.HelioVector(A.Body.Earth, d)[k]))}]);
  }
  function mouvement(r){
    const id = r.p.id, v = r.speed, a = Math.abs(v);
    if(id === "soleil") return `Il avance d'environ ${nf(a)}° par jour : c'est en réalité la Terre qui tourne autour de lui, et le Soleil semble parcourir le zodiaque en un an.`;
    if(id === "lune") return `Elle avance de ${nf(a, 1)}° par jour, plus vite que tout le reste : elle traverse un signe en deux jours et demi.`;
    if(a < 0.02) return `Elle est presque immobile (${nf(v, 3)}° par jour) : c'est une <b>station</b>, le moment où elle change de sens vue de la Terre.`;
    if(v < 0){
      const inner = id === "mercure" || id === "venus";
      return `Elle est <b>rétrograde</b> : vue de la Terre, elle recule de ${nf(a, 3)}° par jour. ` + (inner ? "Elle passe entre la Terre et le Soleil et la double par l'intérieur : vue d'ici, elle semble repartir en arrière." : "La Terre, plus rapide, la double sur son orbite : comme une voiture qu'on dépasse, elle semble reculer.") + " Sur son orbite, elle avance toujours.";
    }
    return `Elle est <b>directe</b> : elle avance de ${nf(a, a < 0.2 ? 3 : 2)}° par jour dans le zodiaque.`;
  }
  function ecart(r){
    if(r.helio == null) return "";
    const g = norm(r.geo), h = norm(r.helio), dd = Math.abs(((g - h + 540) % 360) - 180);
    const same = sgOf(g) === sgOf(h);
    return `Vue du Soleil, ${r.p.court} est à ${pos(h)} ; vue de la Terre, à ${pos(g)}. ${dd < 2 ? "Les deux regards se confondent presque" : `Les deux regards diffèrent de ${Math.round(dd)}°`}${same ? "" : ", au point de changer de signe"} : l'écart vient de notre propre place sur l'orbite terrestre. ${r.dSun > 5 ? "Plus une planète est lointaine, plus il est faible." : "Pour les planètes proches, il peut être très grand."}`;
  }
  function card(r){
    if(r.earth) return `<article class="obs-row"><h4><span class="ag" aria-hidden="true">⊕${T}</span> La Terre</h4>
      <dl><div><dt>Vue du Soleil</dt><dd>${pos(r.helio)}</dd></div><div><dt>Distance au Soleil</dt><dd>${nf(r.dSun, 3)} UA</dd></div></dl>
      <p>Vue du Soleil, la Terre est exactement à l'opposé du Soleil vu de la Terre. C'est pour cela que ton « signe solaire » est le signe opposé à celui où se trouve la Terre ce jour-là.</p></article>`;
    const p = r.p, isMoon = p.body === "Moon";
    const dist = isMoon ? `${Math.round(r.dEarth*AU_KM).toLocaleString("fr-FR")} km` : `${nf(r.dEarth)} UA`;
    return `<article class="obs-row"><h4><span class="ag pl" aria-hidden="true">${p.gl}${T}</span> ${hx(p.court)}</h4>
      <dl><div><dt>Vue de la Terre</dt><dd>${pos(r.geo)}</dd></div>${r.helio != null ? `<div><dt>Vue du Soleil</dt><dd>${pos(r.helio)}</dd></div>` : ""}
        <div><dt>Distance à la Terre</dt><dd>${dist}</dd></div>${r.dSun != null ? `<div><dt>Distance au Soleil</dt><dd>${nf(r.dSun)} UA</dd></div>` : ""}
        <div><dt>Mouvement</dt><dd>${r.speed < 0 ? "rétrograde" : Math.abs(r.speed) < 0.02 && !isMoon && p.body !== "Sun" ? "station" : "direct"}, ${nf(r.speed, Math.abs(r.speed) < 1 ? 3 : 2)}°/jour</dd></div></dl>
      <p>${mouvement(r)}</p>${r.helio != null ? `<p>${ecart(r)}</p>` : ""}
      <p class="obs-sens"><b>En astrologie</b> · ${hx(sgOf(r.geo))} : c'est ce signe-là, vu de la Terre, que retient le thème. ${hx(p.court)} parle de ${(p.mots || []).slice(0, 3).map(hx).join(", ")}. ${p.cycle ? hx(p.cycle) : ""}</p></article>`;
  }
  function renderDetail(){
    const body = document.querySelector("#v-a-ciel [data-obs-body]"); if(!body || !window.Astronomy) return;
    const cw = window.ArcanesAstro.cielWhen && window.ArcanesAstro.cielWhen();
    const t = obsT || (cw || new Date()).getTime();
    let rows; try{ rows = data(t); }catch(e){ console.error(e); body.innerHTML = `<p class="help">Les positions n'ont pas pu être calculées.</p>`; return; }
    const tz = (window.ArcanesAstro.state().lieu || {}).tz;
    let when; try{ when = new Date(t).toLocaleString("fr-FR", {day:"numeric", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit", timeZone:tz || undefined}); }catch(e){ when = new Date(t).toLocaleString("fr-FR"); }
    body.innerHTML = `<p class="obs-when">Positions au <b>${when}</b>${obsT ? ", la date de l'observatoire" : ""}.</p>
      <div class="obs-lex"><p><b>Vue de la Terre</b> (géocentrique) : la direction de l'astre depuis le centre de la Terre. C'est celle du thème.</p>
        <p><b>Vue du Soleil</b> (héliocentrique) : sa place sur son orbite, comme dans le planétarium de l'observatoire.</p>
        <p><b>UA</b> : unité astronomique, la distance moyenne Terre–Soleil, environ 150 millions de km.</p>
        <p><b>Mouvement</b> : ce que l'astre parcourt chaque jour dans le zodiaque, vu de la Terre. Négatif, il est rétrograde.</p></div>
      <div class="obs-rows">${rows.map(card).join("")}</div>`;
  }
  function inject(){
    const v = document.getElementById("v-a-ciel"); if(!v || v.querySelector("[data-obs]")) return;
    const slot = v.querySelector("[data-obs-slot]"); if(!slot) return;
    obsT = null;
    const cw = window.ArcanesAstro.cielWhen && window.ArcanesAstro.cielWhen();
    /* « Explorer le ciel » : d'abord Vu de la Terre / Vu du Soleil, puis l'Observatoire, chargé seulement à la demande */
    slot.innerHTML = `<div class="ex-head"><p class="eyebrow">Explorer le ciel</p><h2 class="lsub">Le ciel en mouvement</h2>
        <p class="help">Quatre ateliers animés pour comprendre le ciel en le manipulant : changer de point de vue, voir une planète « reculer », faire tourner un aspect, suivre la Lune pendant un mois.</p></div>
      <div data-pv-slot></div>
      <section class="obs obs-off" data-obs aria-label="L'Observatoire astral"><div class="obs-cta">
        <div class="obs-cta-art" aria-hidden="true"><svg viewBox="-60 -60 120 120"><circle r="54" class="o1"/><circle r="40" class="o2"/><circle r="26" class="o2"/><circle r="12" class="o3"/><circle cx="40" r="4.5" class="o4"/><circle cx="-18" cy="-20" r="3.5" class="o4"/><circle cx="-16" cy="51" r="5" class="o4"/></svg></div>
        <div><p class="eyebrow">Version d'origine</p><h3>Le grand planétarium</h3><p class="help">Le premier Observatoire d'Arcanes, avec son planétarium complet. Il s'ouvre dans un cadre à part et met un instant à se charger.</p>
          <button type="button" class="btn small ghost" data-obsopen>Ouvrir le planétarium</button></div></div></section>`;
    slot.querySelector("[data-obsopen]").onclick = () => openObs();
    if(window.ArcanesObs) try{ window.ArcanesObs.mount(slot.querySelector("[data-pv-slot]")); }catch(e){ console.warn("observatoire", e); }
    else if(window.ArcanesPV) try{ window.ArcanesPV.mount(slot.querySelector("[data-pv-slot]")); }catch(e){ console.warn("point de vue", e); }
    const dslot = v.querySelector("[data-obs-detail]");
    if(dslot){ dslot.innerHTML = `<details class="obs-det"><summary><span class="obs-det-t"><b>Vues du Soleil, distances et mouvements</b><small>Les mêmes astres en chiffres, et ce que ces chiffres veulent dire</small></span><i class="a-chev" aria-hidden="true"></i></summary><div class="obs-det-body" data-obs-body></div></details>`;
      const det = dslot.querySelector(".obs-det"); det.addEventListener("toggle", () => { if(det.open) renderDetail(); }); }
  }
  /* ouvre l'Observatoire (sans le modifier) à une date donnée, ou à celle du Ciel du jour */
  function openObs(t){
    const sec = document.querySelector("#v-a-ciel [data-obs]"); if(!sec) return null;
    const cw = window.ArcanesAstro.cielWhen && window.ArcanesAstro.cielWhen();
    t = Math.round(t || (cw || new Date()).getTime());
    let fr = sec.querySelector(".obs-frame");
    if(fr){ fr.src = `astro/observatoire.html?t=${t}`; return fr; }
    sec.classList.remove("obs-off");
    sec.innerHTML = `<iframe class="obs-frame" src="astro/observatoire.html?t=${t}" title="L'Observatoire astral : planétarium, rétrogradations, aspects, phases lunaires" scrolling="no"></iframe>`;
    fr = sec.querySelector(".obs-frame"); fit(fr);
    return fr;
  }
  window.addEventListener("message", e => {
    if(!e.data || e.data.type !== "arcanes-observatoire") return;
    const fr = document.querySelector(".obs-frame"); if(!fr || fr.contentWindow !== e.source) return;
    const t = e.data.state && e.data.state.time; if(!Number.isFinite(t)) return;
    obsT = t;
    const det = document.querySelector("#v-a-ciel .obs-det"); if(det && det.open) renderDetail();
  });
  P.observatoire = {inject, renderDetail, open:openObs};
  P.onReady.push(() => {
    const v = document.getElementById("v-a-ciel"); if(!v) return;
    new MutationObserver(() => inject()).observe(v, {childList:true});
    inject();
  });

  /* ---------- L'Atelier du Zodiaque, premier exercice de L'atelier ---------- */
  P.renderers.cles = body => {
    body.innerHTML = `<div class="az-host"><iframe class="az-frame" src="astro/atelier-zodiaque.html" title="L'Atelier du Zodiaque : planète, signe et maison" scrolling="no"></iframe></div>`;
    fit(body.querySelector(".az-frame"));
  };
})();
