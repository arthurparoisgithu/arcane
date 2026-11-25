/* ===== Arcanes · Psyché · Le Miroir : la saga =====
   La nuit sert de carte. Chaque lueur est un niveau, une époque de l'histoire de la psyché, avec sa façon de jouer.
   Au bout de chaque niveau, un seuil : trois questions sur ce qu'on vient de vivre. Chaque bonne réponse ouvre un volet
   illustré, qui rejoint le corpus. Les trois volets lus, une constellation s'allume et la lueur suivante paraît.
   I Épidaure · II Mesmer et les commissaires · III Puységur · IV Braid (Faria dans les volets) · V Charcot et Bernheim · VI Janet et Freud
   VII Jung (le jeu « Le Miroir », dans miroir.js) · Épilogue : Coué, et aujourd'hui. */
window.MiroirSaga = (() => {
  let K = null, jeton = 0; const PX = window.MiroirPix, S = PX.S, W = PX.W;
  const ORDRE = ["I", "II", "III", "IV", "V", "VI", "VII", "E"];
  const fait = n => K.st.saga.faits[n] === true, prochain = () => ORDRE.find(n => !fait(n)) || null;
  const img = (fn, o, th) => x => { const cur = PX.theme(); PX.setTheme(th || "nuit"); fn(x, 1.3, o || {}); PX.setTheme(cur); };
  const tab = (o, th) => img((x, t, oo) => PX.tableau(x, oo), o, th);
  const colonnes = x => { for(const cx of [14, 44, 116, 146]){ const c = PX.show(S.colonne); x.drawImage(c, cx - 9, 4, 18, 66); } };

  /* ================================================================ LES NIVEAUX ET LEURS VOLETS */
  const N = {
    I:{nom:"Le sanctuaire", lieu:"Épidaure", ep:"Grèce, IVe siècle avant notre ère", agit:"le dieu", ciel:"le Serpentaire", qui:"Le prêtre", pos:[19, 46.6], lueur:() => S.lueurs[0],
      fin:"Va. Le dieu guérit ceux qui dorment chez lui. C'est du moins ce que disent les pierres.",
      volets:[
        {id:"I1", t:"Les récits de guérison", q:"Pourquoi t'a-t-on fait lire les stèles avant de dormir ?", o:["Pour honorer le dieu", "Pour que je sache quoi attendre du rêve", "Pour passer le temps"], ok:1, non:"Souviens-toi de ton rêve : l'œil, les osselets, le chien. Où les avais-tu vus d'abord ?",
          img:tab({items:[[S.stele, 44, 84, 1.3], [S.stele, 80, 88, 1.5], [S.stele, 118, 84, 1.3], [S.lampe, 146, 86, 1.2], [S.pelerin, 22, 92, 1.4]], lights:[[146, 56, 80, .8], [80, 60, 60, .2]], amb:.16, sol:"#6f6a5e", dalles:"#45423c"}),
          txt:"À l'entrée du sanctuaire d'Asclépios, à Épidaure, de grandes stèles racontaient des guérisons : une borgne incrédule, un homme aux doigts raides, un enfant aveugle. On en a retrouvé quatre, soit environ soixante-dix récits, gravés au IVe siècle avant notre ère. Le pèlerin les lisait avant de dormir. Il entrait dans la nuit en sachant déjà ce qu'un rêve pouvait faire."},
        {id:"I2", t:"La nuit sous le portique", q:"Où le dieu soigne-t-il ?", o:["Sur l'autel", "Dans l'eau de la fontaine", "Dans le sommeil du malade"], ok:2, non:"Le prêtre ne t'a rien donné à boire ni à avaler. Qu'as-tu fait, sous le portique ?",
          img:tab({fond:colonnes, items:[[S.dormeur, 46, 88, 1.3], [S.dormeur, 112, 88, 1.3], [S.serpent, 80, 92, 1.2], [S.lampe, 80, 72, 1]], lights:[[80, 46, 70, .7]], amb:.14, sol:"#6f6a5e", dalles:"#45423c"}),
          txt:"Le rite s'appelle l'incubation. On se purifie, on offre un gâteau de miel, puis on passe la nuit dans un long portique fermé aux curieux, parmi les autres malades. Le dieu vient en rêve : il opère, ou il prescrit des bains, des marches, un régime. Des centaines de sanctuaires ont soigné ainsi pendant près de mille ans. C'est la plus vieille médecine du rêve que l'on connaisse."},
        {id:"I3", t:"Le serpent et le bâton", q:"Dans le rêve, qu'est-ce qui faisait avancer le serpent ?", o:["Courir derrière lui", "M'arrêter et attendre", "L'appeler"], ok:1, non:"Quand tu courais, le rêve pâlissait. Qu'as-tu fait pour qu'il reprenne ?",
          img:tab({ciel:"#14162b", items:[[S.dieu, 80, 90, 1.3], [S.chienOr, 36, 90, 1.2], [S.serpentOr, 124, 90, 1.2]], lights:[[80, 44, 70, .8]], amb:.12, sol:"#17203a", seed:8}, "songe"),
          txt:"Des chiens et des serpents vivaient libres dans le sanctuaire : on disait qu'ils léchaient les plaies. Le bâton d'Asclépios, où s'enroule un seul serpent, est resté l'emblème des médecins. Les Grecs ont placé le dieu dans le ciel : c'est la constellation du Serpentaire. Et on ne force pas un rêve à venir. Coué, vingt-trois siècles plus tard, en fera une loi."}]},
    II:{nom:"Le baquet", lieu:"Paris et Passy", ep:"France, 1778 – 1784", agit:"le fluide ? Non : l'imagination", ciel:"le Baquet", qui:"Lavoisier", pos:[28, 53.4], lueur:() => S.lueurs[1],
      fin:"Notre rapport sera court. Le fluide n'existe pas. Ce qui existe est plus étrange : une idée suffit à faire tomber un homme.",
      volets:[
        {id:"II1", t:"Mesmer et le magnétisme animal", q:"Chez Mesmer, qu'est-ce qui préparait les crises ?", o:["Le fer du baquet", "La pénombre, la musique et l'attente", "L'harmonica tout seul"], ok:1, non:"Rappelle-toi la première fois que tu l'as annoncé : il manquait quelque chose, et rien ne s'est passé.",
          img:img(PX.salon, {rideaux:true, musique:true, attente:true, mesmer:true}, "bougie"),
          txt:"Franz Anton Mesmer, médecin viennois, soutient en 1766 une thèse sur l'influence des planètes sur le corps. Il en tire l'idée d'un fluide universel, qui relie les astres aux nerfs : le magnétisme animal. À Paris, en 1778, il traite par groupes autour d'un baquet de chêne hérissé de tiges de fer, dans la pénombre, au son de l'harmonica de verre. Les crises font courir toute la ville."},
        {id:"II2", t:"Les commissaires du roi", q:"Devant l'arbre vraiment magnétisé, quand tu lui disais qu'il n'avait rien, que faisait le garçon ?", o:["Il tombait", "Rien du tout", "Il devinait la vérité"], ok:1, non:"Retourne en pensée sous l'abricotier du fond. Il a embrassé le tronc. Et ensuite ?",
          img:tab({ciel:"#4a5a8a", etoiles:false, items:[[S.abricotier, 34, 86, 1], [S.abricotier, 128, 84, .9], [S.franklin, 66, 92, 1.4], [S.lavoisier, 98, 92, 1.4], [S.garconChute, 126, 96, 1.4]], lights:[[80, 30, 130, .9]], amb:.26, sol:"#4f6a52"}, "aube"),
          txt:"En 1784, Louis XVI charge deux commissions de juger le magnétisme. On y trouve Franklin, Lavoisier, l'astronome Bailly et le docteur Guillotin. Dans le jardin de Franklin, à Passy, ils bandent les yeux d'un garçon de douze ans et le mènent d'arbre en arbre. Il s'évanouit loin de l'arbre magnétisé. C'est l'un des premiers essais « à l'aveugle » de l'histoire des sciences."},
        {id:"II3", t:"Le pouvoir de l'imagination", q:"Les commissaires ont-ils conclu que les malades jouaient la comédie ?", o:["Oui : tout était simulé", "Non : les crises sont vraies, c'est la cause qui est ailleurs"], ok:1, non:"Franklin te l'a dit dans le jardin, à mi-voix. Les crises étaient-elles fausses ?",
          img:img(PX.salon, {rideaux:true, musique:true, mesmer:true, crise:5}, "bougie"),
          txt:"Le rapport, rédigé par Bailly, tient en une phrase : l'imagination sans magnétisme produit des convulsions, le magnétisme sans imagination ne produit rien. Mesmer quitte Paris. Mais les commissaires viennent, sans le vouloir, d'ouvrir un champ immense : si une idée peut convulser un corps, elle peut peut-être aussi le soigner. On appelle aujourd'hui cela l'effet placebo."}]},
    III:{nom:"L'orme", lieu:"Buzancy", ep:"Picardie, 1784", agit:"la volonté de celui qui endort", ciel:"l'Orme", qui:"Puységur", pos:[37, 46.6], lueur:() => S.lueurOrme,
      fin:"Croyez et veuillez : toute ma science tient là. Mais je vous l'accorde, Victor m'étonne plus que mon propre pouvoir.",
      volets:[
        {id:"III1", t:"Le sommeil magnétique", q:"En quoi le sommeil de Victor diffère-t-il des crises du baquet ?", o:["Il est plus violent", "Il est calme, et Victor parle", "Il ne dure qu'un instant"], ok:1, non:"Sous l'orme, as-tu entendu un seul cri ?",
          img:tab({ciel:"#6a5a8a", items:[[S.orme, 80, 92, 1], [S.victorDort, 104, 94, 1.6], [S.puysegur, 54, 94, 1.6], [S.paysans[0], 24, 94, 1.3], [S.paysans[1], 138, 94, 1.3]], lights:[[80, 50, 110, .75]], amb:.2, sol:"#2f4a3a", seed:5}, "bougie"),
          txt:"Le 4 mai 1784, à Buzancy, le marquis de Puységur magnétise un jeune paysan, Victor Race, vingt-trois ans. Pas de convulsion : Victor s'endort debout, et se met à parler avec une aisance qu'il n'a jamais éveillé. Puységur nomme cet état le sommeil magnétique. Un siècle plus tard, on dira : hypnose. Il soigne ensuite tout le village sous un orme d'où pendent des cordes."},
        {id:"III2", t:"Deux mémoires", q:"Au réveil, que sait Victor de ce qu'il a dit en dormant ?", o:["Tout", "Rien", "La moitié"], ok:1, non:"Tu lui as demandé le papier quand il veillait. Qu'a-t-il répondu ?",
          img:tab({ciel:"#1f2444", items:[[S.victor, 56, 92, 2.4], [S.victorDort, 104, 92, 2.4]], lights:[[40, 50, 60, .7], [124, 50, 50, .35]], amb:.14, sol:"#17203a", seed:12}, "songe"),
          txt:"Endormi, Victor confie au marquis une querelle de famille qu'il taisait. Réveillé, il ne se souvient de rien. Endormi de nouveau, il retrouve tout. Il y a donc deux mémoires dans le même homme, et la seconde est plus large que la première. C'est la première observation d'une vie mentale qui se poursuit hors de la conscience. Janet et Freud partiront de là."},
        {id:"III3", t:"Croyez et veuillez", q:"Pour Puységur, qu'est-ce qui agit ?", o:["Le baquet et ses tiges", "La volonté de celui qui magnétise", "Les astres"], ok:1, non:"Il te l'a dit lui-même : il pense un air, et Victor le chante.",
          img:tab({ciel:"#6a5a8a", items:[[S.orme, 80, 90, 1.05], [S.paysans[0], 40, 94, 1.5], [S.paysans[2], 120, 94, 1.5], [S.paysans[1], 80, 96, 1.5]], lights:[[80, 60, 100, .7]], amb:.2, sol:"#2f4a3a", seed:9}, "bougie"),
          txt:"« Croyez et veuillez » : pour Puységur, le fluide compte moins que la volonté de bien faire. Ses somnambules passent pour lucides. On leur demande de voir les maladies, les objets perdus, parfois l'avenir. Tout le XIXe siècle des voyantes, des tables tournantes et du spiritisme sort de cet orme. La science, elle, gardera une seule chose : le lien entre celui qui endort et celui qui dort."}]},
    IV:{nom:"L'objet brillant", lieu:"Manchester", ep:"1813 – 1843", agit:"l'attention de celui qui s'endort", ciel:"l'Œil", qui:"Braid", pos:[46, 53.4], lueur:() => S.lueurObjet,
      fin:"Ni fluide, ni volonté. Un regard qui se fatigue, une pensée qui se rétrécit. Je l'écrirai, et on me croira fou des deux côtés.",
      volets:[
        {id:"IV1", t:"Faria : tout est dans le dormeur", q:"Avant Braid, qui disait déjà que tout vient de celui qui s'endort ?", o:["Mesmer", "L'abbé Faria", "Le marquis de Puységur"], ok:1, non:"Braid te l'a dit en commençant : un abbé venu de Goa, trente ans plus tôt.",
          img:img(PX.etude, {lieu:"faria", sujets:[{c:"#2e3a66", perruque:true, ferme:true, tilt:2, dy:1}, {c:"#4f6a52", c2:"#2f4a3a", croise:true, h:"#5c3f26"}, {c:"#8a3a30", robe:true, chignon:true, h:"#3d2a1c", tilt:-1}], geste:"haut"}, "bougie"),
          txt:"L'abbé Faria, prêtre né à Goa, donne à Paris, à partir de 1813, des séances publiques. Il n'utilise ni baquet ni passes : il fixe le sujet et commande « Dormez ! ». Il affirme qu'aucun fluide ne passe de lui à l'autre et que tout vient de celui qui s'endort, de son attente et de sa concentration. On se moque de lui. Il a soixante-dix ans d'avance."},
        {id:"IV2", t:"Braid invente le mot", q:"Qu'est-ce qui a fermé tes paupières ?", o:["Le regard de Braid", "Ma propre attention, fixée sur un point", "La chaleur du gaz"], ok:1, non:"Braid n'a rien dit et rien fait. Où étaient tes yeux pendant tout ce temps ?",
          img:img(PX.etude, {lieu:"braid", sujets:[{c:"#4a5a8a", robe:true, chignon:true, h:"#86603a"}], paup:.22}, "gaz"),
          txt:"En 1841, le chirurgien James Braid assiste à Manchester au spectacle d'un magnétiseur, sûr d'y trouver une fraude. Il n'en trouve pas. Chez lui, il fait fixer à ses proches un objet brillant tenu un peu au-dessus des yeux : ils s'endorment. Aucun fluide n'est en cause, seulement la fatigue du regard et une attention réduite à un point. En 1843, il nomme cela l'hypnotisme."},
        {id:"IV3", t:"Opérer sans douleur", q:"Avant le chloroforme, à quoi cet état a-t-il servi ?", o:["À opérer sans douleur", "À lire l'avenir", "À rien de sérieux"], ok:0, non:"Braid est chirurgien. Que cherche un chirurgien, en 1841, plus que tout ?",
          img:img(PX.etude, {lieu:"braid", sujets:[{c:"#5c3f26", h:"#2a2622", ferme:true, tilt:1}], objet:false, geste:"tendu"}, "gaz"),
          txt:"En 1829, à Paris, le chirurgien Jules Cloquet opère une femme d'un cancer du sein pendant son sommeil magnétique : elle ne sent rien. Dans les années 1840, l'Écossais James Esdaile réalise ainsi des centaines d'opérations en Inde. L'éther, en 1846, puis le chloroforme rendent la méthode inutile. Elle reviendra à l'hôpital cent cinquante ans plus tard."}]},
    V:{nom:"Les deux salles", lieu:"La Salpêtrière et Nancy", ep:"France, 1878 – 1891", agit:"la suggestion", ciel:"le Gong", qui:"Bernheim", pos:[55, 46.6], lueur:() => S.lueurs[2],
      fin:"Paris montrait une maladie. Nous avons montré une idée qu'on accepte. Le maître de la Salpêtrière ne me le pardonnera pas.",
      volets:[
        {id:"V1", t:"Charcot à la Salpêtrière", q:"Pourquoi la nouvelle venue ne suivait-elle pas les trois stades ?", o:["Elle n'était pas assez malade", "Elle ne les avait jamais vus", "Elle résistait exprès"], ok:1, non:"Qu'est-ce qui a changé entre ton premier coup de gong et le second ?",
          img:img(PX.amphi, {stade:2}, "jour"),
          txt:"Jean-Martin Charcot, le plus grand neurologue de son temps, étudie l'hypnose à partir de 1878. Pour lui, c'est un état nerveux propre aux hystériques, avec trois stades fixes : catalepsie, léthargie, somnambulisme. Ses leçons du mardi, à la Salpêtrière, attirent médecins, écrivains et gens du monde. En l'adoptant, il rend l'hypnose respectable. Il se trompe pourtant sur sa nature."},
        {id:"V2", t:"L'école de Nancy", q:"Pour Bernheim, l'hypnose est…", o:["une maladie des nerfs", "de la suggestion, qui agit sur presque tout le monde", "un don de quelques médecins"], ok:1, non:"À Nancy, l'homme dont le bras montait était-il malade ? Dormait-il seulement ?",
          img:img(PX.etude, {lieu:"nancy", sujets:[{c:"#5c3f26", h:"#2a2622", bras:"haut"}]}, "jour"),
          txt:"À Nancy, un médecin de campagne, Ambroise Liébeault, endort ses patients d'une parole depuis les années 1860. Le professeur Hippolyte Bernheim le rejoint en 1882. Ils hypnotisent des ouvriers, des soldats, des enfants, sans jamais voir les trois stades. Leur conclusion : il n'y a que de la suggestion, une idée proposée et acceptée. Au congrès de 1889, Nancy l'emporte sur Paris."},
        {id:"V3", t:"Ceux qui regardaient", q:"En 1885, qui prenait des notes dans l'amphithéâtre ?", o:["Un jeune médecin viennois", "Un magnétiseur de foire", "Le roi"], ok:0, non:"Au deuxième rang, un visiteur étranger, la barbe sombre. Il venait de loin pour voir Charcot.",
          img:img(PX.amphi, {stade:0}, "jour"),
          txt:"Un jeune Viennois, Sigmund Freud, passe l'hiver 1885 à la Salpêtrière, puis va voir Bernheim à Nancy en 1889. Pierre Janet soutient sa thèse sous l'œil de Charcot. La psychologie du siècle suivant sort de ces deux salles. Il reste une ombre : des femmes pauvres, internées, montrées en public chaque semaine. Elles ont payé la découverte, et leurs noms sont presque oubliés."}]},
    VI:{nom:"La parole", lieu:"Le Havre et Vienne", ep:"1886 – 1900", agit:"ce qu'on ne sait pas de soi", ciel:"le Divan", qui:"Freud", pos:[63, 53.4], lueur:() => S.lueurs[3],
      fin:"J'ai renoncé à endormir. Un jour, un de mes élèves renoncera même au divan. Il fera lever ses malades. Vous verrez.",
      volets:[
        {id:"VI1", t:"Janet et le subconscient", q:"Comment la main de Marie a-t-elle pu répondre sans que Marie le sache ?", o:["Elle trichait", "Une partie d'elle pensait à part", "Janet guidait sa main"], ok:1, non:"Marie parlait de la pluie. Sa main écrivait autre chose. Les deux en même temps.",
          img:img(PX.etude, {lieu:"havre", sujets:[{c:"#4a5a8a", robe:true, chignon:true, h:"#3d2a1c"}], ecrit:6}, "jour"),
          txt:"Au Havre, de 1883 à 1889, le philosophe Pierre Janet observe des patientes dont une part de l'esprit agit seule : une main qui écrit pendant que la bouche parle d'autre chose. Il nomme cette part le subconscient. Un souvenir trop pénible s'en est détaché et devient une idée fixe, qui produit le symptôme. Sa patiente Marie retrouve la vue quand le souvenir est retrouvé, puis transformé."},
        {id:"VI2", t:"La cure par la parole", q:"À Vienne, qu'est-ce qui a fait parler la patiente ?", o:["Mes questions", "Mon silence", "Un ordre de Freud"], ok:1, non:"Chaque fois que tu l'as interrompue, elle s'est tue. Qu'as-tu fini par faire ?",
          img:img(PX.vienne, {parle:true}, "nuit"),
          txt:"De 1880 à 1882, le docteur Josef Breuer soigne à Vienne une jeune femme, restée célèbre sous le nom d'Anna O. Ses symptômes cèdent quand elle raconte le moment où ils sont nés. Elle appelle cela, en anglais, la « cure par la parole », ou le ramonage de cheminée. Freud et Breuer publient le cas en 1895. Peu après, Freud abandonne l'hypnose : il laisse dire, et il écoute."},
        {id:"VI3", t:"L'inconscient", q:"Pour Freud, pourquoi avait-elle oublié ?", o:["Par hasard", "Parce qu'elle ne voulait pas le savoir", "Parce que c'était sans importance"], ok:1, non:"Ce qu'elle a fini par dire, pouvait-elle le penser sans honte ?",
          img:img(PX.vienne, {assise:true}, "nuit"),
          txt:"Pour Janet, le souvenir se détache par faiblesse. Pour Freud, on l'écarte parce qu'il est insupportable : c'est le refoulement. Ce qui est refoulé n'est pas détruit. Il revient déguisé, dans les symptômes, les lapsus et surtout les rêves, dont Freud publie l'interprétation en 1900. L'inconscient cesse d'être une curiosité de malades : chacun en porte un."}]},
    VII:{nom:"Le Miroir", lieu:"Küsnacht", ep:"Suisse, 1907 – 1961", agit:"des images plus vieilles que nous", ciel:"le Miroir", qui:"Jung", pos:[72, 50], lueur:null,
      fin:"Voilà. Les autres cherchaient ce qui agit dans la tête d'un seul. J'ai cru voir des images qui n'appartiennent à personne.",
      volets:[
        {id:"VII1", t:"La rupture avec Freud", q:"Pourquoi vous ai-je fait lever du divan ?", o:["Vous étiez pressé", "Chez vous, on se parle face à face", "Le divan était cassé"], ok:1, non:"« Chez moi, on ne s'allonge pas. » Vous vous en souvenez.",
          img:img(PX.cabinet, {pluie:true}, "nuit"),
          txt:"Carl Gustav Jung, psychiatre à Zurich, rencontre Freud en 1907 et devient son héritier désigné. Ils se séparent en 1913. Jung refuse de tout ramener à la sexualité, et il veut comprendre les mythes, les religions, l'alchimie. Chez lui, à Küsnacht, on ne s'allonge pas : le médecin et le patient se font face, comme deux personnes qui cherchent ensemble."},
        {id:"VII2", t:"L'inconscient collectif", q:"Qui a creusé la grotte, sous la maison ?", o:["Vous, docteur", "Moi", "Personne. Elle était là avant"], ok:2, non:"L'Ermite vous a posé la question. Qu'avez-vous fini par répondre ?",
          img:tab({ciel:"#14162b", etoiles:false, items:[[S.cartes.ermite, 30, 86, 1.1], [S.cartes.imperatrice, 62, 80, 1], [S.cartes.bateleur, 98, 80, 1], [S.cartes.mat, 130, 86, 1.1], [S.cranes, 80, 96, 1.2]], lights:[[80, 50, 100, .75]], amb:.12, sol:"#2a2622"}, "blanc"),
          txt:"Sous l'inconscient de chacun, Jung suppose une couche commune à toute l'humanité : l'inconscient collectif. Il est peuplé d'archétypes, des figures qui reviennent dans les mythes, les contes et les rêves de tous les pays : la mère, le vieux sage, le fripon, l'ombre. Les lames du tarot en sont une galerie. L'hypothèse reste discutée, mais elle a changé notre façon de lire les images."},
        {id:"VII3", t:"L'ombre et le chemin", q:"Qu'avez-vous fait de l'ombre, dans la galerie ?", o:["Je l'ai vaincue", "Je l'ai semée", "Je me suis retourné et je l'ai regardée"], ok:2, non:"Fuir vous ramenait au début. Qu'est-ce qui a fini par ouvrir la porte ?",
          img:img(PX.cabinet, {invite:true}, "nuit"),
          txt:"L'ombre est ce que l'on refuse de voir en soi et que l'on prête aux autres. Jung ne demande pas de la détruire : il demande de la reconnaître. Il nomme individuation ce chemin où l'on rassemble ses parts séparées. Il en retrouve les étapes dans les traités d'alchimie, le noir, le blanc, le rouge, et il appelle synchronicité les coïncidences qui semblent nous répondre."}]},
    E:{nom:"La ficelle", lieu:"Nancy, puis aujourd'hui", ep:"1910 – aujourd'hui", agit:"nous, sans le savoir", ciel:"le Pendule", qui:"Coué", pos:[81, 50], lueur:() => S.lueurFicelle,
      fin:"Le dieu, le fluide, la volonté, le regard, la suggestion, l'inconscient. On a changé de mot à chaque siècle. La chose, elle, n'a pas bougé : elle était en vous.",
      volets:[
        {id:"E1", t:"Coué et l'autosuggestion", q:"Qui a fait bouger le pendule ?", o:["Monsieur Coué", "Un courant d'air", "Moi, sans le vouloir"], ok:2, non:"Coué avait les mains dans les poches. Qui tenait la ficelle ?",
          img:img(PX.pendule, {ang:.38}, "jour"),
          txt:"Émile Coué, pharmacien, s'installe à Nancy en 1910 après avoir suivi les leçons de Liébeault. Il remarque qu'un remède agit mieux quand on l'annonce avec confiance. Il en tire une méthode sans hypnotiseur : l'autosuggestion. On se répète soi-même, matin et soir, que l'on va de mieux en mieux. Le pendule lui sert de preuve : une idée fait bouger la main à notre insu."},
        {id:"E2", t:"Du divan au laboratoire", q:"À quoi sert l'hypnose, aujourd'hui, à l'hôpital ?", o:["À retrouver des souvenirs exacts", "À calmer la douleur et l'angoisse", "À faire obéir les patients"], ok:1, non:"Pense à l'objet brillant, et à ce que cherchait le chirurgien de Manchester.",
          img:tab({ciel:"#cfd9ea", etoiles:false, hz:54, items:[[S.dormeur, 84, 88, 1.7], [S.lampe, 132, 86, 1.3]], avant:x => { PX.perso(x, 40, 96, {k:2, c:"#4f6a52", c2:"#2f4a3a", bonnet:"#4f6a52", h:"#2a2622", bras:"tendu", p:"#4f6a52"}); }, lights:[[84, 30, 120, .9]], amb:.3, sol:"#a89c84", dalles:"#6f6a5e"}, "jour"),
          txt:"Depuis les années 1990, des hôpitaux opèrent des patients éveillés sous hypnose, avec très peu d'anesthésiques : c'est l'hypnosédation, mise au point à Liège. L'imagerie montre que l'attention et l'attente modifient réellement la douleur perçue. L'hypnose ne fait pas obéir, et elle ne rend pas les souvenirs plus fiables : elle peut même en fabriquer de faux. Ce qu'elle sait faire, on le mesure enfin."},
        {id:"E3", t:"Ce qui agit", q:"Alors, au bout de la nuit : qu'est-ce qui agit ?", o:["Le dieu", "Le fluide", "L'attente, l'attention, et quelqu'un en face"], ok:-1, non:"",
          img:tab({ciel:"#14162b", items:[], apres:x => { const c = PX.show(PX.miroirMaison(true)); x.drawImage(c, 50, 6, 60, 78); }, lights:[[80, 50, 90, .7]], amb:.2, sol:"#14162b", seed:21}, "nuit"),
          txt:"Chaque époque a cru tenir la cause, et chacune a eu raison d'une chose. Le sanctuaire avait compris l'attente. Mesmer, la mise en scène. Puységur, le lien. Braid, l'attention. Bernheim, l'idée acceptée. Freud, ce qu'on ne veut pas savoir. Jung, les images communes. Coué, la part que l'on y prend soi-même. Ce qui agit n'a jamais été dehors."}]}
  };
  const VOL = {}; ORDRE.forEach(n => N[n].volets.forEach(v => { VOL[v.id] = Object.assign(v, {niv:n}); }));

  /* ================================================================ LE SEUIL, LES VOLETS, LE CORPUS */
  async function volet(id, neuf){ const v = VOL[id], n = N[v.niv];
    const p = K.sheet(`<p class="mir-eye">${neuf ? "Un volet s'ouvre" : K.esc(n.nom)} · ${K.esc(n.ep)}</p><canvas class="mir-vol" width="160" height="100" aria-hidden="true"></canvas><h2>${K.esc(v.t)}</h2><p class="mir-page">${K.esc(K.nb(v.txt))}</p><div class="mir-row"><button type="button" class="mir-btn" data-x>${neuf ? "J'ai lu" : "Fermer"}</button></div>`, "volet");
    const c = K.$(".mir-vol"); if(c){ const x = c.getContext("2d"); x.imageSmoothingEnabled = false; try{ v.img(x); }catch(e){ console.error(e); } } await p; }
  async function seuil(niv){ const n = N[niv], sv = K.st.saga;
    for(const v of n.volets){ if(sv.volets.includes(v.id)) continue;
      for(;;){ const c = await K.choose(n.qui, v.q, v.o); if(v.ok < 0 || c === v.ok) break; K.Snd.grave(); await K.Nr(v.non); }
      K.endDlg(); K.Snd.or(); sv.volets.push(v.id); K.save(); await volet(v.id, true); }
    await K.say(n.qui, n.fin); K.endDlg(); await fini(niv); }
  async function fini(niv){ const sv = K.st.saga; sv.faits[niv] = true; if(!sv.agit.includes(niv)) sv.agit.push(niv); K.st.niv = "hub"; K.save(); K.Snd.verre(false); await K.fade(true, 900); hub(K, {neuf:niv}); }
  async function corpus(k){ K = k || K; const sv = K.st.saga;
    for(;;){ const dernier = sv.agit[sv.agit.length - 1];
      const v = await K.sheet(`<p class="mir-eye">Le corpus</p><h2>${sv.volets.length ? `${sv.volets.length} volets sur 24` : "Il est encore vide"}</h2>${sv.volets.length ? "" : `<p class="mir-page">Chaque niveau se termine par trois questions. Chaque bonne réponse ouvre un volet illustré, qui vient se ranger ici.</p>`}
        <div class="mir-corpus">${ORDRE.map(n => { const L = N[n], ouverts = L.volets.filter(x => sv.volets.includes(x.id)); if(!ouverts.length && !fait(n)) return `<section class="clos"><h3><b>${n === "E" ? "Épilogue" : n}</b> · · ·</h3></section>`;
          return `<section><h3><b>${n === "E" ? "Épilogue" : n}</b> ${K.esc(L.nom)}</h3><p class="mir-ep">${K.esc(L.lieu)} · ${K.esc(L.ep)}</p>${fait(n) ? `<p class="mir-agit${n !== dernier ? " barre" : ""}">Ce qui agit : <span>${K.esc(L.agit)}</span></p>` : ""}<div class="mir-vl">${L.volets.map(x => sv.volets.includes(x.id) ? `<button type="button" class="mir-lnk" data-x="v:${x.id}">${K.esc(x.t)}</button>` : `<span>· · ·</span>`).join("")}</div></section>`; }).join("")}</div>
        <div class="mir-row"><button type="button" class="mir-btn" data-x>Fermer</button>${K.st.carnet.length ? `<button type="button" class="mir-btn ghost" data-x="carnet">Le carnet de Küsnacht</button>` : ""}</div>`, "carnet corpus");
      if(typeof v === "string" && v.startsWith("v:")){ await volet(v.slice(2), false); continue; } if(v === "carnet"){ await K.carnet(); continue; } break; } }

  /* ================================================================ LA NUIT : LA CARTE */
  const FIG = { // les constellations : [écart d'angle, hauteur], puis les traits
    I:{a:-.98, e:.5, p:[[-.1, 0], [-.05, .07], [0, .02], [.05, .09], [.1, .05], [.13, .11]], l:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]},
    II:{a:-.66, e:.66, p:[[-.08, 0], [-.04, -.045], [.04, -.045], [.08, 0], [.04, .035], [-.04, .035], [0, .12]], l:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [4, 6], [5, 6]]},
    III:{a:-.36, e:.46, p:[[0, -.06], [0, .03], [-.08, .08], [0, .14], [.08, .08]], l:[[0, 1], [1, 2], [1, 4], [2, 3], [3, 4]]},
    IV:{a:-.14, e:.72, p:[[-.09, 0], [0, .05], [.09, 0], [0, -.05], [0, 0]], l:[[0, 1], [1, 2], [2, 3], [3, 0]]},
    V:{a:.2, e:.6, p:[[-.08, .04], [0, .09], [.08, .04], [0, -.05], [-.08, -.02], [.08, -.02]], l:[[0, 1], [1, 2], [1, 3], [0, 4], [2, 5]]},
    VI:{a:.5, e:.44, p:[[-.11, 0], [-.11, .06], [-.05, .03], [.1, .03], [.1, 0]], l:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]},
    VII:{a:0, e:.88, p:[[-.05, -.07], [-.05, .03], [0, .08], [.05, .03], [.05, -.07]], l:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]},
    E:{a:.86, e:.62, p:[[-.03, .12], [0, .03], [.035, -.06], [.05, -.09]], l:[[0, 1], [1, 2], [2, 3]]}
  };
  const consts = neuf => ORDRE.map(n => { const f = FIG[n]; return {on:fait(n), neuf:n === neuf, pts:f.p.map(q => [f.a + q[0]*1.25, f.e + q[1]*1.1]), lines:f.l}; });
  function hub(k, opt){
    K = k || K; opt = opt || {}; jeton++; const st = K.st, eng = K.eng, MX = 72, MY = 50, pro = prochain(); PX.setTheme("nuit"); K.Snd.verre(false); K.Snd.ambiance({vent:.15}); K.Snd.piano(true); K.setLieu("La nuit"); st.niv = "hub"; K.save();
    const jungFait = fait("VII"), maison = jungFait ? PX.miroirMaison(st.fin === "ouvert") : null; let hint = 0;
    const mir = {x:MX, y:MY, h:1.95, em:true, emK:.012, emL:.95, emMin:.5, range:2.6,
      tex:E => { const face = E.P.x < MX, d = Math.hypot(E.P.x - MX, E.P.y - MY); mir.wf = Math.max(.07, Math.abs(E.P.x - MX)/Math.max(.01, d)); if(jungFait) return (face || st.fin === "ouvert") ? maison : PX.miroirDos(E.time(), Math.max(-1, Math.min(1, (E.P.y - MY)*.5))); return face ? PX.miroirFace(E.time()) : PX.miroirDos(E.time(), Math.max(-1, Math.min(1, (E.P.y - MY)*.5))); },
      label:() => eng.P.x >= MX && !(jungFait && st.fin === "ouvert") ? "L'ombre te regarde" : jungFait ? "Le miroir" : st.saga.faits.VII === "jeu" ? "Le seuil du miroir" : pro === "VII" ? "Entrer dans le miroir" : "Regarder le miroir",
      act:async () => { if(eng.P.x >= MX && !(jungFait && st.fin === "ouvert")){ await K.Nr("Elle a ta taille. Elle ne dit rien. De ce côté du miroir, il n'y a qu'elle."); K.endDlg(); return; }
        if(jungFait){ const c = await K.choose("", "Le miroir montre la cabane, entre les arbres.", ["Relire les volets de ce niveau", "Rejouer Le Miroir", "Laisser"]); K.endDlg(); if(c === 0) await corpus(); else if(c === 1){ K.resetMiroir(); st.niv = "VII"; K.save(); await K.entrer(); } return; }
        if(st.saga.faits.VII === "jeu"){ setTimeout(() => apresMiroir(K), 0); return; }
        if(pro !== "VII"){ await K.Nr("Dans la glace, un cabinet, un feu, un homme en blanc qui fume la pipe. Tu poses la main : le verre est froid et ne cède pas."); await K.Nr(`Le miroir est le bout du chemin. Il manque des lueurs derrière toi. La prochaine : ${N[pro].nom.toLowerCase()}.`); K.endDlg(); return; }
        st.niv = "VII"; K.save(); if(!["nuit", "cabinet", "fin"].includes(st.etape)){ await K.fade(true, 700); setTimeout(() => K.demarrer(), 0); return; } await K.entrer(); } };
    const sp = [mir];
    ORDRE.forEach(n => { const L = N[n]; if(!L.lueur) return; const ouvert = fait(n) || n === pro; if(!ouvert) return; if(n === "E" && !jungFait) return;
      sp.push({x:L.pos[0], y:L.pos[1], h:fait(n) ? .95 : 1.3, z:fait(n) ? .2 : .3, em:true, emK:.05, emL:fait(n) ? .6 : .85, emMin:.3, tex:L.lueur(), range:2.6, label:() => fait(n) ? `${L.nom} (${L.lieu})` : `Entrer : ${L.nom}`,
        act:async () => { if(fait(n)){ const c = await K.choose("", `${L.nom}. ${L.ep}.`, ["Relire les volets", "Rejouer ce niveau", "Laisser"]); K.endDlg(); if(c === 0){ await corpus(); return; } if(c !== 1) return; }
          st.niv = n; K.save(); K.Snd.piano(false); await K.fade(true, 800); setTimeout(() => LANCE[n](), 0); } }); });
    const cible = opt.neuf ? N[opt.neuf].pos : pro ? N[pro].pos : [MX, MY], sx = opt.neuf ? cible[0] - (opt.neuf === "VII" ? 5 : opt.neuf === "E" ? -3 : 0) : Math.max(6, cible[0] - 7), sy = MY;
    eng.load({map:[" "], walls:{}, sprites:sp, sky:[3, .03, .36], stars:K.stars(520, 4), mirror:true, consts:consts(opt.neuf), floor:"spark", floorC:2, dens:.045, lum:.34, far:26, speed:1.6, turn:1.7, a0:opt.neuf ? -Math.PI/2 : Math.atan2(cible[1] - sy, cible[0] - sx),
      tick:(dt, E) => { const P = E.P; P.x = Math.max(3, Math.min(97, P.x)); P.y = Math.max(22, Math.min(78, P.y)); const d = Math.hypot(P.x - MX, P.y - MY); K.Snd.pianoVol(Math.max(.05, Math.min(.5, 2.2/(d*.16 + 1))));
        hint += dt; if(hint > 40 && pro && pro !== "VII" && Math.hypot(P.x - N[pro].pos[0], P.y - N[pro].pos[1]) > 12){ hint = 0; K.cap("La prochaine lueur est tout près du chemin. Le miroir, lui, est encore loin.", 6000); } } }, [sx, sy]);
    if(opt.neuf){ const f = FIG[opt.neuf]; eng.P.a = f.a; }
    K.setMode("3d"); K.fade(false, 1400);
    if(opt.neuf){ K.Snd.or(); K.cap(opt.neuf === "E" ? "La dernière constellation s'allume : le Pendule. Le ciel est plein." : `Une constellation s'allume : ${N[opt.neuf].ciel}.${prochain() ? " Plus loin, une autre lueur paraît." : ""}`, 9000); if(opt.neuf === "E") setTimeout(() => { if(K.alive && !K.busy) K.run(finSaga); }, 6500); }
    else if(!st.saga.agit.length && !st.saga.faits.VII) K.cap("Une lueur, tout près. Et très loin, droit devant, une lumière plus chaude.", 9000);
    else K.cap(pro ? `La nuit. La prochaine lueur : ${N[pro].nom.toLowerCase()}.` : "La nuit. Le ciel est plein.", 7000);
  }
  async function finSaga(){ const sv = K.st.saga;
    const v = await K.sheet(`<p class="mir-eye">Le Miroir</p><h2>Le ciel est plein.</h2><p class="mir-page">Huit constellations, vingt-cinq siècles. Tu peux rester te promener dans la nuit : tout ce que tu as traversé y est encore.</p><ol class="mir-fil">${sv.agit.map((n, i) => `<li class="${i < sv.agit.length - 1 ? "barre" : ""}"><b>${K.esc(N[n].lieu)}</b> <span>${K.esc(N[n].agit)}</span></li>`).join("")}</ol><div class="mir-col"><button type="button" class="mir-btn" data-x="corpus">Ouvrir le corpus</button><button type="button" class="mir-btn ghost" data-x>Rester dans la nuit</button></div><p class="mir-note">Ce jeu raconte une histoire des idées. Il ne soigne rien et ne remplace personne.</p>`, "fin");
    if(v === "corpus") await corpus(); }
  async function apresMiroir(k){ K = k || K; PX.setTheme("nuit"); K.scene2(K.visage, {}); K.setLieu("Le seuil"); K.Snd.ambiance({feu:.2}); await K.fade(false, 1000); await K.run(async () => { await K.J("Avant que vous repartiez. Trois questions, comme aux autres portes."); await seuil("VII"); }); }

  /* ================================================================ DES COMMANDES PARTICULIÈRES */
  const panneau = (who, txt, html) => { const d = K.$(".mir-dlg"); d.hidden = false; d.onclick = null; d.classList.remove("fin"); d.dataset.who = who ? "autre" : "nar"; const w = K.$(".mir-who"); w.textContent = who || ""; w.hidden = !who; K.$(".mir-txt").textContent = K.nb(txt); const b = K.$(".mir-in"); b.innerHTML = html; return b; };
  /* tenir appuyé : la jauge monte tant qu'on tient, redescend quand on lâche */
  function tenir(who, txt, label, sec, onP){ return new Promise(res => { const box = panneau(who, txt, `<div class="mir-bar"><i></i></div><div class="mir-row"><button type="button" class="mir-btn mir-hold">${label}</button></div>`), b = box.querySelector("button"), bar = box.querySelector("i"); let p = 0, on = false, last = performance.now(), fin = false; const tok = jeton;
      const dn = e => { if(e) e.preventDefault(); on = true; b.classList.add("on"); }, up = () => { on = false; b.classList.remove("on"); }, kd = e => { if(e.key === " " || e.key === "Enter"){ e.preventDefault(); dn(); } }, ku = e => { if(e.key === " " || e.key === "Enter") up(); };
      b.addEventListener("pointerdown", dn); b.addEventListener("pointerup", up); b.addEventListener("pointerleave", up); b.addEventListener("pointercancel", up); addEventListener("keydown", kd); addEventListener("keyup", ku);
      const loop = t => { if(fin || !K.alive || tok !== jeton){ removeEventListener("keydown", kd); removeEventListener("keyup", ku); return; } const dt = Math.min(.1, (t - last)/1000); last = t; p = Math.max(0, Math.min(1, p + (on ? dt/sec : -dt/(sec*.45)))); bar.style.width = (p*100) + "%"; if(onP) onP(p, on); if(p >= 1){ fin = true; removeEventListener("keydown", kd); removeEventListener("keyup", ku); box.innerHTML = ""; res(); return; } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }); }
  /* se taire : rien toucher pendant « sec » secondes ; le bouton qui tente fait tout recommencer */
  function silence(lignes, sec, o){ return new Promise(res => { const box = panneau("", "", `<div class="mir-bar"><i></i></div><div class="mir-row"><button type="button" class="mir-btn ghost" data-coupe>Lui poser une question</button></div>`), bar = box.querySelector("i"), txt = K.$(".mir-txt"); let t0 = performance.now(), fin = false, coupe = false, gel = 0; const tok = jeton;
      K.$(".mir-who").hidden = false; K.$(".mir-who").textContent = "La patiente"; K.$(".mir-dlg").dataset.who = "autre";
      const stop = () => { coupe = true; }; box.querySelector("[data-coupe]").onclick = stop; const kd = e => { if(e.key === " " || e.key === "Enter"){ e.preventDefault(); stop(); } }; addEventListener("keydown", kd);
      const loop = t => { if(fin || !K.alive || tok !== jeton){ removeEventListener("keydown", kd); return; } if(coupe){ coupe = false; gel = t + 1700; o.parle = false; o.silence = 0; bar.style.width = "0%"; txt.textContent = "« Vous m'avez coupée. Je ne sais plus où j'en étais. »"; K.Snd.grave(); } if(t < gel){ t0 = t; requestAnimationFrame(loop); return; }
        const p = Math.max(0, Math.min(1, (t - t0)/1000/sec)); bar.style.width = (p*100) + "%"; o.silence = p; if(t - t0 > 0){ o.parle = p > .08; const n = Math.max(0, Math.floor(p*lignes.length*1.0001)); if(p > .08) txt.textContent = K.nb("« " + lignes.slice(0, Math.min(lignes.length, n + 1)).join(" ") + (p < 1 ? "…" : "") + " »"); }
        if(p >= 1){ fin = true; removeEventListener("keydown", kd); o.parle = false; box.innerHTML = ""; res(); return; } requestAnimationFrame(loop); }; requestAnimationFrame(loop); }); }

  /* ================================================================ I. ÉPIDAURE */
  function sanctuaire(aube){
    const eng = K.eng, st = K.st; PX.setTheme(aube ? "aube" : "nuit"); K.setLieu("Épidaure"); K.Snd.ambiance({vent:.08});
    const etat = {lave:false, offre:false, lu:[false, false, false]};
    const STE = ["« Ambrosia d'Athènes, borgne. Elle riait de ces récits : comment un rêve rendrait-il un œil ? Elle dormit ici. Le dieu lui ouvrit la paupière et y versa un remède. Au matin, elle voyait. »", "« Un homme aux doigts raides, tous sauf un. Il se moquait des inscriptions. En rêve, il jouait aux osselets. Le dieu bondit sur sa main et lui étendit les doigts. Au jour, il sortit guéri. »", "« Un enfant aveugle, venu d'Hermione. Un des chiens du temple lui lécha les yeux. Il repartit voyant. »"];
    const sp = []; for(const cx of [4.5, 10.5]) for(let y = 4.5; y < 13; y += 2) sp.push({x:cx, y, h:1.7, tex:S.colonne});
    sp.push({x:3.4, y:11.5, h:.6, tex:S.fontaine, range:1.7, label:"La fontaine", act:async () => { if(aube){ await K.Nr("L'eau est rose, ce matin."); K.endDlg(); return; } etat.lave = true; K.Snd.vitre(); await K.Nr("L'eau est glacée. Tu te laves les mains et le visage, comme ceux qui sont passés avant toi."); K.endDlg(); }});
    sp.push({x:7.5, y:6.5, h:.75, tex:S.autel, em:true, emL:.8, emMin:.5, range:1.8, label:"L'autel", act:async () => { if(aube){ await K.Nr("Le feu de l'autel est presque éteint."); K.endDlg(); return; } if(!etat.lave){ await K.say("Le prêtre", "L'eau d'abord. On n'approche pas le dieu avec la poussière de la route."); K.endDlg(); return; } etat.offre = true; await K.Nr("Tu poses un gâteau de miel sur la pierre. La flamme se couche, puis se redresse."); K.endDlg(); }});
    [[11.6, 12.5], [12.2, 10.5], [11.6, 8.5]].forEach((p, i) => sp.push({x:p[0], y:p[1], h:.85, tex:S.stele, range:1.6, label:"Lire la stèle", act:async () => { etat.lu[i] = true; await K.Nr(STE[i]); K.endDlg(); }}));
    sp.push({x:6.2, y:13.4, h:.62, tex:S.lampe}, {x:8.8, y:13.4, h:.62, tex:S.lampe}, {x:5.6, y:9.6, h:.36, tex:S.chien}, {x:9.6, y:4.2, h:.32, tex:S.serpent});
    sp.push({x:4.4, y:2.7, h:.36, tex:S.dormeur}, {x:10.6, y:2.7, h:.36, tex:S.dormeur}, {x:2.6, y:2.7, h:.36, tex:S.dormeur});
    const pretre = {x:8.7, y:7.2, h:.95, tex:S.pretre, range:1.9, label:"Le prêtre", act:async () => { if(aube) return; const m = !etat.lave ? "Lave-toi à la fontaine." : !etat.offre ? "Porte ton offrande à l'autel." : etat.lu.includes(false) ? "Lis les stèles, toutes. Elles disent ce que le dieu a fait pour d'autres." : "Tu es prêt. Va t'allonger sous le portique."; await K.say("Le prêtre", "Le dieu vient aux dormeurs. Mais on ne dort pas ici comme chez soi. " + m); K.endDlg(); }}; sp.push(pretre);
    sp.push({x:7.5, y:2.7, h:.36, tex:S.couche, range:1.8, label:"S'allonger sous le portique", noAct:!!aube, act:async () => { const manque = !etat.lave ? "Tu as encore la poussière de la route sur les mains." : !etat.offre ? "Tu n'as rien offert." : etat.lu.includes(false) ? "Il reste des stèles que tu n'as pas lues." : ""; if(manque){ await K.Nr(manque + " Le prêtre secoue la tête."); K.endDlg(); return; }
      await K.Nr("Tu t'allonges parmi les dormeurs. Un serpent glisse entre les lits sans que personne ne bouge."); await K.Nr("Le toit du portique s'efface. Les étoiles entrent."); K.endDlg(); await K.fade(true, 1200); setTimeout(songe, 0); }});
    eng.load({map:["TTTTTTTTTTTTTTT", "T.MMMAAAAAMMM.T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "T.............T", "TTTTTTTTTTTTTTT"], walls:{T:W.cypres, M:W.marbre, A:W.portique}, sprites:sp,
      sky:aube ? [29, .25, .95] : [3, .03, .34], stars:K.stars(aube ? 40 : 300, 6), floor:"tiles", floorC:10, floorC2:11, dens:.11, lum:aube ? .82 : .5, far:18, speed:1.8, a0:aube ? Math.PI/2 : -Math.PI/2, lights:aube ? [] : [[7.5, 6.5, 4.5, .6], [6.2, 13.4, 3, .45], [8.8, 13.4, 3, .45], [7.5, 2.6, 3, .2]] }, aube ? [7.5, 3.6] : [7.5, 14.3]);
    K.setMode("3d"); K.fade(false, 1100);
    if(aube){ pretre.x = 7.5; pretre.y = 5; K.run(async () => { K.Snd.oiseau(); await K.Nr("Le jour. Le prêtre est debout au pied de ton lit."); const c = await K.choose("Le prêtre", "Qu'as-tu vu ?", ["Un œil qui s'ouvrait dans la nuit", "Des osselets, et une main qui se dépliait", "Un chien d'or"]); await K.say("Le prêtre", ["Le dieu t'a ouvert les yeux.", "Le dieu t'a délié les mains.", "Le dieu t'a envoyé son gardien."][c] + " Il t'ordonne des bains, de longues marches, et de revenir dormir."); await K.Nr("En te levant, tu repasses devant les stèles. L'œil, les osselets, le chien : tout y était déjà, gravé dans la pierre. Ton rêve n'a rien inventé."); await seuil("I"); }); }
    else K.cap("Épidaure, la nuit. Des colonnes, des lampes, et des gens qui dorment sous un portique.", 8000);
  }
  /* Le rêve : le seul endroit du jeu où les colonnes ne sont plus en gros pixels. Elles flottent, en vrai volume, lisses comme du marbre
     sous la lune (flot.js), au-dessus d'un sol qui reflète tout. On peut les toucher, comme le serpent, le chien et ce que le rêve fait apparaître. */
  function songe(){
    const eng = K.eng, F = window.MiroirFlot; PX.setTheme("songe"); K.setLieu("Le rêve"); K.Snd.ambiance({vent:.05}); K.Snd.verre(true);
    const WP = [[16, 50], [24, 45.5], [33, 54], [42, 46.5], [53, 50]];
    const TOUCHE = {oeil:"Il cligne. Tu sens tes propres yeux s'ouvrir plus grand, comme ceux d'Ambrosia.", des:"Tu les lances. Ils retombent sur quatre faces différentes : le coup d'Aphrodite, le meilleur. Ta main s'ouvre toute seule.", chien:"Il te lèche la main, comme il a léché les yeux de l'enfant d'Hermione. Sa langue est chaude, et elle brille."};
    const TAB = [null, [S.oeil, "Un œil s'ouvre dans la nuit. Tu as lu cela quelque part.", "Regarder l'œil", "oeil"], [S.des, "Des osselets roulent tout seuls. Une main se déplie.", "Ramasser les osselets", "des"], [S.chienOr, "Un chien d'or te regarde venir. Il a l'air de te connaître.", "Caresser le chien", "chien"], null];
    const PIERRE = ["La pierre est froide. Elle tourne lentement sous ta paume.", "Elle n'est posée sur rien, et elle tient quand même.", "Une colonne du sanctuaire. Ici, elle a oublié de peser.", "Sous tes doigts, les cannelures défilent comme l'eau d'une source."];
    const sp = [], cols = [], r = PX.rng(17), loinDuChemin = (x, y) => { for(let i = 0; i < WP.length - 1; i++){ const [ax, ay] = WP[i], [bx, by] = WP[i + 1], vx = bx - ax, vy = by - ay, t = Math.max(0, Math.min(1, ((x - ax)*vx + (y - ay)*vy)/(vx*vx + vy*vy))); if(Math.hypot(x - ax - t*vx, y - ay - t*vy) < 2.1) return false; } return Math.hypot(x - 10, y - 50) > 3 && Math.hypot(x - 57, y - 50) > 3; };
    let essais = 0, pi = 0; while(cols.length < 19 && essais++ < 500){ const x = 9 + r()*52, y = 35 + r()*30; if(!loinDuChemin(x, y) || cols.some(c => Math.hypot(c.x - x, c.y - y) < 3)) continue;
      const k = cols.length, bas = k % 3 === 0, casse = k % 4 === 1, z = bas ? .1 + r()*.35 : .6 + r()*1.9, penche = r() < .55;
      const col = F.colonne({x, y, z, h:2.2 + r()*1.4, r:.26 + r()*.1, tambours:casse ? 4 : 3, ecart:casse ? .14 + r()*.2 : 0, casse, sansChapiteau:k % 5 === 2, axe:penche ? [(r() - .5)*.5, (r() - .5)*.5, 1] : [0, 0, 1], rot0:r()*6, tour:(r() < .5 ? -1 : 1)*(.03 + r()*.07), houle:.08 + r()*.14, ph:r()*6, or:.7 + r()*.6});
      cols.push(col); if(z < 1.1) sp.push({x, y, h:1, tex:S.colonne, ov:true, vide:true, range:2.3, label:"Toucher la colonne", act:async () => { K.Snd.clair(); col.tour *= -2.2; setTimeout(() => col.tour /= -2.2, 2600); await K.Nr(PIERRE[pi++ % PIERRE.length]); K.endDlg(); }}); }
    const ser = {x:WP[0][0], y:WP[0][1], h:.42, z:.18, tex:S.serpentOr, em:true, emL:.9, emMin:.6, emK:.02, ov:true, range:1.9, label:"Toucher le serpent", act:async () => { K.Snd.or(); await K.Nr(i < WP.length - 1 ? "Il est tiède. Il ne fuit pas. Il attend que tu cesses de vouloir." : "Il s'enroule une fois autour de ton poignet, puis il te laisse."); K.endDlg(); }}; sp.push(ser);
    const dieu = {x:57, y:50, h:2.3, tex:S.dieu, em:true, emL:.9, emMin:.5, emK:.02, off:true, ov:true, range:3, label:"S'approcher du dieu", act:async () => { await K.Nr("Il est très grand. Il ne dit rien. Un serpent d'or s'enroule à son bâton."); await K.Nr("Il pose la main sur ton front."); K.endDlg(); K.Snd.gong(); await K.fade(true, 1500); K.Snd.verre(false); setTimeout(() => sanctuaire(true), 0); }}; sp.push(dieu);
    let i = 0, immobile = 0, cours = 0, va = false, px = 0, py = 0, dit = 0;
    eng.load({map:[" "], walls:{}, sprites:sp, sky:[3, .02, .3], stars:K.stars(700, 23), mirror:true, floor:"spark", floorC:2, dens:.04, lum:.5, far:26, speed:1.7, a0:0,
      over:(ctx, c) => F.dessine(ctx, c, cols),
      tick:(dt, E) => { const P = E.P; P.x = Math.max(4, Math.min(62, P.x)); P.y = Math.max(36, Math.min(64, P.y)); const bouge = Math.hypot(P.x - px, P.y - py) > .002; px = P.x; py = P.y;
        if(bouge){ immobile = 0; cours += dt; } else { immobile += dt; cours = Math.max(0, cours - dt*3); }
        E.dim = Math.max(.42, 1 - Math.max(0, cours - 1.6)*.3); if(cours > 2.6 && dit < 1){ dit = 1; K.cap("Quand tu cours, le rêve pâlit. Arrête-toi.", 5000); }
        const d = Math.hypot(P.x - ser.x, P.y - ser.y); ser.alpha = d < 1.5 && bouge ? .35 : 1;
        if(va){ const w = WP[i], vx = w[0] - ser.x, vy = w[1] - ser.y, l = Math.hypot(vx, vy); if(l < .15){ va = false; ser.x = w[0]; ser.y = w[1]; const T = TAB[i]; if(T){ sp.push({x:w[0] + .8, y:w[1] - .9, h:.5, z:.5, tex:T[0], em:true, emL:.85, emMin:.5, ov:true, range:2, label:T[2], act:async () => { K.Snd.clair(); await K.Nr(TOUCHE[T[3]]); K.endDlg(); }}); K.Snd.clair(); K.cap(T[1], 7000); } if(i === WP.length - 1){ dieu.off = false; ser.off = true; K.Snd.or(); K.cap("Au bout du chemin, quelqu'un t'attend.", 7000); } } else { ser.x += vx/l*3.2*dt; ser.y += vy/l*3.2*dt; } }
        else if(i < WP.length - 1 && d < 5 && immobile > 1.1){ i++; va = true; K.Snd.clair(); if(dit < 2){ dit = 2; K.cap("Le serpent avance quand tu cesses de vouloir.", 5000); } } } }, [10, 50]);
    K.setMode("3d"); K.fade(false, 1600); K.cap("Le sanctuaire flotte dans la nuit. Devant toi, un serpent d'or.", 8000);
  }

  /* ================================================================ II. MESMER, PUIS PASSY */
  async function mesmer(){
    PX.setTheme("jour"); const o = {}; K.scene2(PX.salon, o); K.setLieu("Paris, 1778"); K.Snd.ambiance({foule:.05}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Paris, 1778. Un hôtel particulier, place Vendôme. On te prend pour le nouveau valet.");
      await K.say("Le majordome", "Le docteur Mesmer reçoit dans une heure. La reine le protège, et tout Paris veut être malade chez lui. Prépare le salon.");
      const faits = {r:false, m:false, a:false};
      for(;;){ const opts = [], ids = []; if(!faits.r){ opts.push("Tirer les rideaux"); ids.push("r"); } if(!faits.m){ opts.push("Faire jouer l'harmonica de verre"); ids.push("m"); } if(!faits.a){ opts.push("Asseoir les malades autour du baquet, et les faire attendre"); ids.push("a"); } opts.push("Annoncer le docteur Mesmer"); ids.push("go");
        const c = ids[await K.choose("", "Le salon, avant la séance.", opts)];
        if(c === "r"){ faits.r = true; o.rideaux = true; PX.setTheme("bougie"); await K.Nr("Le jour disparaît. Il ne reste que les bougies et leur reflet dans les glaces."); }
        else if(c === "m"){ faits.m = true; o.musique = true; K.Snd.verre(true); await K.Nr("Des doigts mouillés sur des coupes de verre. Un son qui ne ressemble à rien, et qui serre un peu la gorge."); }
        else if(c === "a"){ faits.a = true; o.attente = true; await K.Nr("Ils s'assoient, prennent les tiges de fer, se relient par une corde. Personne ne parle. Chacun guette son voisin."); }
        else { o.mesmer = true; K.Snd.ambiance({foule:0}); await K.say("Mesmer", "Mesdames, messieurs. Je vais diriger le fluide."); if(faits.r && faits.m && faits.a) break;
          await K.Nr("Il lève sa baguette de fer. Rien. Une dame étouffe un bâillement."); await K.say("Mesmer", "Ils ne sont pas prêts. " + (!faits.r ? "Trop de jour." : !faits.m ? "Où est la musique ?" : "On ne les a pas fait attendre.") + " Le fluide ne passe pas dans une pièce mal tenue."); o.mesmer = false; } }
      await K.say("Mesmer", "Un fluide baigne l'univers. Il porte l'influence des astres jusque dans nos nerfs. Je ne fais que le conduire.");
      K.endDlg(); for(let i = 1; i <= 5; i++){ o.crise = i; K.Snd.cri(); await K.wait(650); }
      await K.Nr("La première gémit, rit, puis tombe. Les autres suivent, un par un. On emporte les plus agités dans une chambre aux murs matelassés.");
      await K.Nr("Ça marche. Tu l'as vu de tes yeux. Il y a donc un fluide.");
      K.endDlg(); await K.fade(true, 1000); K.Snd.verre(false); });
    passy();
  }
  function passy(){
    const eng = K.eng; PX.setTheme("aube"); K.setLieu("Passy, 1784"); K.Snd.ambiance({vent:.05});
    const AR = [[3.5, 3.6, true], [9.5, 3.6, false], [3.5, 8.4, false], [9.5, 8.4, false]]; const vu = {A:false, B:false}; let pret = false, oi = 0;
    const gar = {x:6.5, y:9.6, h:.82, tex:S.garcon}, sp = [gar, {x:5.6, y:1.9, h:.86, tex:S.franklin}];
    const lav = {x:7.6, y:2.3, h:.95, tex:S.lavoisier, range:2, label:"Lavoisier", act:async () => { if(vu.A && vu.B){ await K.say("Lavoisier", "Vous avez les deux preuves. L'imagination sans le magnétisme produit des convulsions. Le magnétisme sans l'imagination ne produit rien."); await K.say("Franklin", "Les crises sont vraies, mon ami. C'est la cause qui est ailleurs."); await seuil("II"); return; }
      await K.say("Lavoisier", !vu.A && !vu.B ? "Menez-le aux arbres. Essayez de lui dire vrai, puis de lui dire faux." : !vu.A ? "Il vous manque un cas : un arbre ordinaire, dont vous lui direz qu'il est magnétisé." : "Il vous manque un cas : l'arbre magnétisé, dont vous lui direz qu'il n'a rien."); K.endDlg(); }}; sp.push(lav);
    AR.forEach((a, i) => sp.push({x:a[0], y:a[1], h:1.9, tex:S.abricotier, range:2.1, label:a[2] ? "L'abricotier du fond, à gauche (le seul magnétisé)" : "Un abricotier ordinaire", act:async () => { if(!pret) return;
      gar.x = a[0] + .5; gar.y = a[1] + .9; gar.tex = S.garcon; await K.Nr("Tu guides le garçon jusqu'au tronc. Il ne voit rien : le bandeau est serré.");
      const c = await K.choose("", a[2] ? "Cet arbre est le seul que le disciple de Mesmer a magnétisé." : "Cet arbre n'a rien de particulier.", ["Lui dire : « Celui-ci est magnétisé »", "Lui dire : « Celui-ci n'a rien »"]);
      if(c === 0){ gar.tex = S.garconTremble; K.Snd.cri(); await K.Nr("Il pâlit. Ses bras se raidissent, ses jambes tremblent."); gar.tex = S.garconChute; gar.h = .36; await K.Nr(a[2] ? "Il tombe. Mais ici, comment savoir si c'est l'arbre ou l'idée ?" : "Il tombe, sans connaissance. L'arbre n'a pourtant rien."); if(!a[2]) vu.A = true; }
      else { await K.Nr(a[2] ? "Il embrasse le tronc, attend, hausse les épaules. Rien. C'est pourtant l'arbre magnétisé." : "Rien. Cela ne prouve pas grand-chose."); if(a[2]) vu.B = true; }
      K.endDlg(); setTimeout(() => { gar.tex = S.garcon; gar.h = .82; }, 1800); if(vu.A && vu.B) K.cap("Près de la maison, Lavoisier te fait signe.", 6000); }}));
    eng.load({map:["PPPPPPPPPPPPP", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "H...........H", "HHHHHHHHHHHHH"], walls:{H:W.haie, P:W.passy}, sprites:sp, sky:[29, .3, 1], stars:K.stars(20, 3), floor:"earth", floorC:27, floorC2:26, dens:.07, lum:.85, far:16, speed:1.8, a0:-Math.PI/2,
      tick:(dt) => { oi += dt; if(oi > 3.5 + Math.random()*4){ oi = 0; K.Snd.oiseau(); } } }, [6.5, 11.2]);
    K.setMode("3d"); K.fade(false, 1100);
    K.run(async () => { await K.Nr("Passy, 1784. Le jardin de Benjamin Franklin, à l'aube. Le roi a nommé des commissaires pour juger le fluide de Mesmer.");
      await K.say("Lavoisier", "Un disciple de Mesmer a magnétisé un seul de ces quatre abricotiers : celui du fond, à gauche. Le garçon a les yeux bandés. Il ignore lequel.");
      await K.say("Lavoisier", "Menez-le d'arbre en arbre, et dites-lui ce que vous voudrez. Puis regardez ce qui agit : l'arbre, ou ce qu'il croit."); K.endDlg(); pret = true; });
  }

  /* ================================================================ III. BUZANCY */
  /* Buzancy se joue de nuit, sous la lune : du bleu et de l'argent, l'or des lanternes dans l'orme. Rien du vert de Passy. */
  const recol = (t, m) => Object.assign({}, t, {i:t.i.map(c => m[c] == null ? c : m[c])}), NUITBLEUE = {26:3, 27:4, 28:5, 14:2, 15:3, 16:4};
  let lune = null, lanterne = null, lunePx = null;
  function decorNuit(){ if(lune) return; lune = PX.mk(32, 32, x => { PX.disc(x, "#cfd9ea", 16, 16, 14, 14); PX.disc(x, "#f4efe2", 15, 15, 12, 12); for(const [a, b, r] of [[11, 12, 3], [19, 18, 2], [17, 9, 2], [10, 20, 1]]) PX.disc(x, "#cfd9ea", a, b, r, r); });
    lune.em = true; lanterne = PX.mk(8, 14, x => { PX.R(x, "#45423c", 3, 0, 2, 3); PX.R(x, "#45423c", 1, 3, 6, 1); PX.R(x, "#e2bd5a", 1, 4, 6, 8); PX.R(x, "#ffe9a8", 2, 5, 4, 6); PX.R(x, "#45423c", 1, 12, 6, 2); }); lanterne.em = true; }
  function buzancy(){
    decorNuit(); const eng = K.eng; PX.setTheme("nuit"); K.setLieu("Buzancy, 1784"); K.Snd.ambiance({vent:.07}); let dort = false, etape = 0, intro = false;
    const vic = {x:8.9, y:7.4, h:.95, tex:S.victor, range:1.9, label:() => dort ? "Victor (il dort)" : "Victor", act:async () => { if(!intro){ await K.Nr("Un garçon de ferme, la casquette à la main. Il attend qu'on lui parle."); K.endDlg(); return; }
      if(!dort && etape === 0){ await K.say("Victor", "Je ne sais pas, monsieur. Ça va. Ça ira."); await K.Nr("Il regarde ses sabots."); }
      else if(dort && etape === 0){ await K.Nr("Pas un cri, pas une convulsion. Il dort debout. Son visage a changé, sa voix aussi."); await K.say("Victor, endormi", "C'est ma sœur. Elle veut la maison que la mère m'a laissée. J'ai le papier, mais je n'ose pas le montrer."); await K.choose("", "", ["Lui demander où est le papier"]); await K.say("Victor, endormi", "Sous la pierre du seuil. Mais ne me le demandez pas quand je veillerai : je ne le saurai plus."); etape = 1; }
      else if(!dort && etape === 1){ const c = await K.choose("", "Il est réveillé. Il te regarde sans se douter de rien.", ["Lui demander où est le papier", "Lui répéter ce qu'il a dit en dormant"]);
        if(c === 0){ await K.say("Victor", "Quel papier, monsieur ?"); await K.Nr("Il ne ment pas. Il ne sait plus."); }
        else { await K.Nr("Il t'écoute, la bouche ouverte."); await K.say("Victor", "Sous la pierre du seuil… Oui. C'est moi qui l'y ai mis. Comment le savez-vous ?"); await K.Nr("Il respire mieux. Ce qu'il savait endormi, il fallait le lui rapporter éveillé."); etape = 2; K.endDlg(); K.Snd.or(); K.cap("Le marquis te regarde.", 6000); return; } }
      else if(dort){ await K.say("Victor, endormi", etape === 1 ? "Je vous l'ai dit. Allez le dire à l'autre : à celui que je suis quand je veille." : "Il sait, maintenant. Nous sommes deux à savoir."); }
      else { await K.say("Victor", "Je vais lui parler, à ma sœur. Je crois que je peux."); }
      K.endDlg(); }};
    const puy = {x:6.2, y:7.6, h:.97, tex:S.puysegur, range:2, label:"Le marquis de Puységur", act:async () => {
      if(!intro){ intro = true; await K.say("Puységur", "Bienvenue à Buzancy. Je n'ai pas de baquet : j'ai cet orme, ces cordes, et la volonté de faire du bien."); await K.say("Puységur", "Voici Victor. Vingt-trois ans, la poitrine prise, et un chagrin qu'il ne dit pas. Éveillé, il n'ose rien. Trouvez ce qui le ronge."); await K.say("Puységur", "Revenez me voir : je l'endors et je le réveille d'un geste."); K.endDlg(); return; }
      if(etape === 2){ await K.say("Puységur", "Vous voyez. Deux mémoires dans un seul homme, et la seconde en sait plus long que la première."); await K.say("Puységur", "Je pense un air sans ouvrir la bouche, et il le chante. Ma volonté passe en lui."); await K.Nr("Ou bien le marquis fredonne sans s'en apercevoir. Ce soir-là, personne ne songe à vérifier."); await seuil("III"); return; }
      const c = await K.choose("Puységur", dort ? "Il dort. Parlez-lui, il vous entend." : "Il veille. Voulez-vous que je l'endorme ?", [dort ? "Le réveiller" : "L'endormir", "Pas maintenant"]); if(c === 0){ dort = !dort; vic.tex = dort ? S.victorDort : S.victor; K.Snd.clair(); await K.Nr(dort ? "Le marquis passe la main devant le front de Victor. Ses paupières tombent. Il reste debout." : "Le marquis lui touche les yeux. Victor sursaute, regarde autour de lui."); } K.endDlg(); }};
    const sp = [{x:7.5, y:6.2, h:2.7, tex:recol(S.orme, NUITBLEUE)}, vic, puy];
    [[6.6, 5.7, 1.45], [8.5, 5.9, 1.6], [7.3, 6.9, 1.25], [8.1, 6.6, 1.7], [6.9, 6.3, 1.85]].forEach(p => sp.push({x:p[0], y:p[1], h:.3, z:p[2], tex:lanterne, em:true, emL:.95, emMin:.7, emK:.1})); [[5.2, 5.2, 0], [9.8, 5.4, 1], [7.6, 4.2, 2], [4.6, 7.2, 1], [10.6, 7.6, 0]].forEach(p => sp.push({x:p[0], y:p[1], h:.72, tex:S.paysans[p[2]], range:1.5, label:"Un villageois", act:async () => { await K.Nr(["Elle dort assise, une corde autour du poignet. Elle sourit.", "Il tient la corde à deux mains, les yeux mi-clos. Il dit que ça chauffe.", "Elle dort. Elle a posé son panier."][p[2]]); K.endDlg(); }}));
    eng.load({map:["CCCCCCCCCCCCCCC", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "H.............H", "HHHHHHHHHHHHHHH"], walls:{H:W.haieNuit, C:W.chateauNuit}, sprites:sp, sky:[4, .05, .62], stars:K.stars(420, 14), floor:"earth", floorC:4, floorC2:3, dens:.085, lum:.56, far:26, speed:1.8, a0:-Math.PI/2, lights:[[7.5, 6.4, 3.6, .3], [7.5, 1.2, 6, .3]],
      /* la lune, haut au-dessus du château, peinte par-dessus pour que les murs ne la cachent pas */
      over:(ctx, c) => { let da = -.98 - Math.atan2(c.dy, c.dx); da = Math.atan2(Math.sin(da), Math.cos(da)); if(Math.abs(da) > 1) return; const x = (c.W/2 + Math.tan(da)*c.proj)*c.kx, y = c.hz*.3*c.ky, r = 8*c.kx;
        const g = ctx.createRadialGradient(x, y, r*.4, x, y, r*4.5); g.addColorStop(0, "rgba(220,228,244,.3)"); g.addColorStop(1, "rgba(207,217,234,0)"); ctx.fillStyle = g; ctx.fillRect(x - r*5, y - r*5, r*10, r*10);
        ctx.imageSmoothingEnabled = false; ctx.drawImage(lunePx || (lunePx = PX.show(lune, 7)), x - r, y - r, r*2, r*2); } }, [7.5, 11.2]);
    K.setMode("3d"); K.fade(false, 1100); K.cap("Buzancy, près de Soissons, une nuit de mai 1784. La lune, un château, un orme plein de lanternes, et des gens qui dorment assis.", 9000);
  }

  /* ================================================================ IV. FARIA, PUIS BRAID */
  async function braid(){
    PX.setTheme("gaz"); const o = {lieu:"braid", sujets:[]}; K.scene2(PX.etude, o); K.setLieu("Manchester, 1841"); K.Snd.ambiance({gaz:.03}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Manchester, 1841. Le chirurgien James Braid sort du spectacle d'un magnétiseur, décidé à démasquer le truc. Il n'en a pas trouvé. Alors il essaie chez lui, sur toi.");
      await K.say("Braid", "Un abbé venu de Goa, Faria, le disait déjà à Paris il y a trente ans : tout est dans celui qui s'endort. On s'est moqué de lui. Voyons s'il avait raison.");
      await K.say("Braid", "Asseyez-vous. Fixez mon porte-lancette, un peu au-dessus des yeux. Ne le lâchez pas, quoi qu'il arrive.");
      let dit = 0; await tenir("", "Le métal brille sous le bec de gaz.", "Fixer le point (tiens appuyé)", 9, (p, on) => { o.paup = p*.92; const t = K.$(".mir-txt"); if(p > .25 && dit < 1){ dit = 1; t.textContent = "Une mouche contre la vitre. Tes yeux piquent."; } if(p > .55 && dit < 2){ dit = 2; t.textContent = "Un fiacre passe dans la rue. Le point brillant se dédouble."; } if(p > .8 && dit < 3){ dit = 3; t.textContent = "Tes paupières pèsent. Il n'y a plus que le point."; } });
      o.paup = 1; K.Snd.grave(); await K.Nr("Le noir. Tes paupières sont tombées toutes seules."); o.paup = .12; o.sujets = [];
      await K.say("Braid", "Je n'ai rien émis. Aucun fluide, aucune volonté. Vos yeux se sont fatigués, et votre attention s'est réduite à un point."); await K.say("Braid", "Il faut un mot neuf pour une chose neuve. Je dirai : hypnotisme. Du grec hypnos, le sommeil."); o.paup = 0;
      await seuil("IV"); });
  }

  /* ================================================================ V. LA SALPÊTRIÈRE, PUIS NANCY */
  async function salpe(){
    PX.setTheme("jour"); const o = {stade:0}; K.scene2(PX.amphi, o); K.setLieu("La Salpêtrière, 1885"); K.Snd.ambiance({foule:.07}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Paris, la Salpêtrière, 1885. Le mardi, le professeur Charcot donne sa leçon devant des médecins, des écrivains et des curieux.");
      await K.say("Charcot", "L'hypnose est un état nerveux propre aux hystériques. Elle a trois stades, toujours les mêmes. Voyez.");
      K.Snd.gong(); o.stade = 2; await K.Nr("Un coup de gong. Elle se fige, le bras levé, comme une statue de cire. La catalepsie.");
      o.stade = 1; await K.Nr("On lui ferme les paupières. Elle s'effondre dans les bras de l'interne. La léthargie.");
      o.stade = 3; await K.Nr("On lui frotte le sommet du crâne. Elle se lève, marche, obéit. Le somnambulisme.");
      await K.say("Charcot", "Trois stades, comme une maladie a ses symptômes. Passez dans la salle, et choisissez-moi une malade pour mardi prochain.");
      o.stade = 0; const poses = [{}, {}, {}, {}], vus = {anc:false, neuve:0}; Object.assign(o, {salle:true, poses}); K.Snd.ambiance({foule:.02});
      await K.Nr("Quatre femmes. Trois sont ici depuis des années. La quatrième est arrivée hier : elle a encore de la boue aux sabots, et son baluchon au pied du lit.");
      const NOMS = ["Blanche", "Augustine", "Geneviève", "la nouvelle"], POSE = [{bras:"haut"}, {ferme:true, tilt:2, dy:1}, {bras:"avant", ferme:true}];
      for(;;){ const opts = NOMS.map(n => "Frapper le gong devant " + n); if(vus.neuve === 1) opts.push("Laisser la nouvelle regarder les trois autres"); if(vus.anc && vus.neuve === 3) opts.push("Retourner voir le professeur");
        const c = await K.choose("", "La salle.", opts); o.sel = c < 4 ? c : 3;
        if(c < 3){ K.Snd.gong(); for(const p of POSE){ poses[c] = p; await K.wait(650); } await K.Nr(`${NOMS[c]} : catalepsie, léthargie, somnambulisme. Dans l'ordre, sans une faute. Elle a vu cent leçons.`); poses[c] = {}; vus.anc = true; }
        else if(c === 3){ K.Snd.gong(); if(vus.neuve < 2){ await K.Nr("Elle sursaute, te regarde, et attend. Rien. Elle ne sait pas ce qu'on attend d'elle."); vus.neuve = Math.max(1, vus.neuve); }
          else { for(const p of POSE){ poses[3] = p; await K.wait(650); } await K.Nr("Elle se fige, tombe, se relève et marche. Dans l'ordre, sans une faute."); poses[3] = {}; vus.neuve = 3; } }
        else if(opts[c].startsWith("Laisser")){ for(let i = 0; i < 3; i++){ poses[i] = POSE[i]; } await K.Nr("Elle regarde les autres se figer, tomber, marcher. Longtemps. Ses lèvres bougent, comme si elle apprenait."); for(let i = 0; i < 3; i++) poses[i] = {}; vus.neuve = 2; }
        else break; }
      await K.Nr("Tu tiens quelque chose que le professeur ne voit pas : les trois stades ne se montrent que chez celles qui les ont appris.");
      await K.Nr("Tu ne le lui dis pas. Quelqu'un d'autre le dira, à trois cents kilomètres d'ici."); K.endDlg(); await K.fade(true, 900); });
    nancy();
  }
  async function nancy(){
    PX.setTheme("jour"); const su = {c:"#5c3f26", c2:"#3d2a1c", h:"#2a2622"}, o = {lieu:"nancy", sujets:[su]}; K.scene2(PX.etude, o); K.setLieu("Nancy, 1884"); K.Snd.ambiance({}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Nancy, 1884. Le professeur Bernheim hypnotise des ouvriers, des soldats, des enfants. Pas d'hystériques, pas de gong, pas de public.");
      o.geste = "tendu"; await K.say("Bernheim", "Votre bras est léger. Il monte tout seul."); su.bras = "haut"; await K.Nr("Le bras du menuisier monte. Il n'a pas fermé les yeux. Il sourit, un peu gêné.");
      await K.say("Bernheim", "Les trois stades de Paris ? Je ne les ai jamais vus chez quelqu'un qui ne les avait pas appris. Il n'y a pas de maladie là-dedans : il y a de la suggestion.");
      await K.say("Bernheim", "À votre tour. Vous ne pouvez pas appuyer sur ce bouton."); await K.choose("Bernheim", "Vous ne pouvez pas.", ["Appuyer quand même"]);
      await K.say("Bernheim", "Bien sûr que si. Une suggestion n'est pas un ordre : c'est une idée qu'on accepte ou qu'on refuse. À Paris, elles acceptaient celle du maître.");
      await seuil("V"); });
  }

  /* ================================================================ VI. LE HAVRE, PUIS VIENNE */
  async function havre(){
    PX.setTheme("jour"); const o = {lieu:"havre", sujets:[{c:"#4a5a8a", c2:"#2e3a66", robe:true, chignon:true, h:"#3d2a1c"}], ecrit:0}; K.scene2(PX.etude, o); K.setLieu("Le Havre, 1886"); K.Snd.ambiance({pluie:.08}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Le Havre, 1886. Pierre Janet, jeune professeur de philosophie, vient chaque jour à l'hôpital. Sa patiente, qu'il appelle Marie, ne voit plus de l'œil gauche. Aucun médecin ne trouve pourquoi.");
      await K.say("Janet", "Parlez-lui de n'importe quoi. Pendant qu'elle vous répond, glissez un crayon dans sa main, et interrogez la main à voix basse.");
      const REP = ["depuis mes six ans", "on m'a couchée près d'une enfant malade", "tout un côté de son visage. le gauche. j'ai eu peur"], QU = ["Demander à la main : depuis quand ?", "Demander à la main : que s'est-il passé ?", "Demander à la main : qu'as-tu vu ?"], BAV = ["Oh, il pleut depuis mardi. Les bateaux ne sortent plus.", "Mon frère est sur les quais. Il dit que le charbon a encore augmenté.", "J'aime bien quand il pleut. On entend moins la salle."]; let distraite = false, n = 0;
      while(n < 3){ const c = await K.choose("", distraite ? "Marie parle, les yeux sur la fenêtre. Sa main droite repose sur la table." : "Marie te regarde, attentive.", ["Lui parler de la pluie, du port, des bateaux", QU[n]]);
        if(c === 0){ distraite = true; await K.say("Marie", BAV[n]); }
        else if(!distraite){ await K.say("Marie", "Pourquoi me donnez-vous ce crayon ? Je n'ai rien à écrire."); await K.Nr("Elle te regarde faire. Tant qu'elle regarde, la main ne répondra pas."); }
        else { o.ecrit = (n + 1)*2; K.Snd.vitre(); await K.Nr(`Sans qu'elle baisse les yeux, la main écrit : « ${REP[n]} ».`); n++; distraite = false; } }
      await K.Nr("Marie parle toujours de la pluie. Elle n'a rien vu de ce que sa main vient d'écrire.");
      await K.say("Janet", "Une idée fixe, restée à part de sa conscience. Je l'appelle subconsciente. Sous hypnose, je lui ferai revoir l'enfant, guérie cette fois. Et la vue reviendra.");
      K.endDlg(); await K.fade(true, 900); });
    vienne();
  }
  async function vienne(){
    PX.setTheme("nuit"); const o = {}; K.scene2(PX.vienne, o); K.setLieu("Vienne, 1892"); K.Snd.ambiance({feu:.08}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Vienne, vers 1892. Le docteur Freud a vu Charcot à Paris et Bernheim à Nancy. Il hypnotise mal, et ses malades le sentent.");
      await K.say("Freud", "Celle-ci m'a demandé de me taire et de la laisser dire. J'ai obéi. Faites comme moi : ne dites rien, ne touchez à rien.");
      await silence(["Je pensais à mon père,", "les derniers mois."], 5, o); await K.wait(500);
      await silence(["Je le veillais la nuit.", "Une fois, je me suis endormie sur la chaise.", "Au réveil, j'ai eu honte."], 7, o); await K.wait(500);
      await silence(["Ce n'est pas le sommeil, la honte.", "C'est qu'un instant", "j'ai voulu que cela finisse.", "Voilà. Je ne l'avais jamais dit."], 9, o);
      o.assise = true; K.Snd.clair(); await K.Nr("Elle se redresse, étonnée de respirer si bien.");
      await K.say("Freud", "Je ne les endors plus. Ils parlent, et j'écoute surtout l'endroit où ils s'arrêtent : là, quelque chose résiste."); await K.say("Freud", "Mon ami Breuer a vu une malade guérir ainsi, d'avoir dit. Elle appelait cela ramoner la cheminée.");
      await K.Nr("En te levant, tu regardes le divan. Tu l'as déjà vu quelque part. Ou tu le verras.");
      await seuil("VI"); });
  }

  /* ================================================================ ÉPILOGUE : COUÉ */
  async function coue(){
    PX.setTheme("jour"); const o = {ang:0}; K.scene2(PX.pendule, o); K.setLieu("Nancy, 1920"); K.Snd.ambiance({}); await K.fade(false, 1000);
    await K.run(async () => {
      await K.Nr("Nancy, 1920. Dans sa pharmacie, puis dans son jardin, Émile Coué reçoit des centaines de gens par jour. Il ne touche personne.");
      await K.say("Coué", "Tenez cette ficelle au-dessus du cercle. Ne bougez pas la main. Pensez seulement : il se balance, de gauche à droite.");
      await new Promise(res => { const box = panneau("", "Pose le doigt sur l'image et tiens-le aussi immobile que tu peux. (Au clavier : tiens Espace.)", `<div class="mir-bar"><i></i></div>`), bar = box.querySelector("i"), cv = K.$(".mir-2d canvas"); let v = 0, a = 0, lx = null, tenu = false, t0 = 0, last = performance.now(), fin = false, amp = 0; const tok = jeton;
        const dn = e => { tenu = true; lx = e.clientX; t0 = performance.now(); try{ cv.setPointerCapture(e.pointerId); }catch(_){} }, mv = e => { if(!tenu) return; v += (e.clientX - lx)*.012; lx = e.clientX; }, up = () => { tenu = false; }, kd = e => { if(e.key === " "){ e.preventDefault(); if(!tenu){ tenu = true; t0 = performance.now(); } } }, ku = e => { if(e.key === " ") tenu = false; };
        cv.style.touchAction = "none"; cv.addEventListener("pointerdown", dn); cv.addEventListener("pointermove", mv); cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up); addEventListener("keydown", kd); addEventListener("keyup", ku);
        const loop = t => { if(fin || !K.alive || tok !== jeton){ removeEventListener("keydown", kd); removeEventListener("keyup", ku); return; } const dt = Math.min(.05, (t - last)/1000); last = t; if(tenu){ const k = Math.min(1, (t - t0)/9000); v += (v >= 0 ? 1 : -1)*(.012 + k*.05)*dt*8 + (Math.random() - .5)*.004; } v += (-9*a - (tenu ? .12 : 1.2)*v)*dt; a += v*dt; a = Math.max(-.6, Math.min(.6, a)); o.ang = a; amp = Math.max(amp*(1 - dt*.6), Math.abs(a)); bar.style.width = Math.min(100, amp/.42*100) + "%";
          if(amp >= .42){ fin = true; cv.removeEventListener("pointerdown", dn); cv.removeEventListener("pointermove", mv); cv.removeEventListener("pointerup", up); cv.removeEventListener("pointercancel", up); removeEventListener("keydown", kd); removeEventListener("keyup", ku); box.innerHTML = ""; res(); return; } requestAnimationFrame(loop); }; requestAnimationFrame(loop); });
      K.Snd.clair(); await K.Nr("Il se balance. Tu jurerais que ta main n'a pas bougé.");
      await K.say("Coué", "Vous n'avez rien voulu. Vous l'avez pensé, et votre main a obéi sans vous prévenir."); await K.say("Coué", "Je n'ai jamais guéri personne. J'apprends aux gens ce qu'ils se font à eux-mêmes. Et plus on force, moins cela vient : vous le saviez déjà, depuis une certaine nuit en Grèce.");
      await K.Nr("Aujourd'hui, dans des hôpitaux, on opère des patients éveillés, sous hypnose, avec très peu d'anesthésiques. On ne parle plus de fluide. On mesure l'attention, l'attente, la confiance.");
      await seuil("E"); });
  }

  const LANCE = {I:() => sanctuaire(false), II:mesmer, III:buzancy, IV:braid, V:salpe, VI:havre, E:coue};
  function start(k){ K = k; const n = K.st.niv; K.$(".mir-fade").classList.add("on"); if(n && LANCE[n] && !fait(n)){ LANCE[n](); } else hub(K, {}); }
  return {start, hub, corpus, apresMiroir, N, ORDRE, LANCE, _:{sanctuaire, songe, passy, braid, nancy, vienne, seuil, fini}};
})();
