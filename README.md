# Arcanes

Une application pour apprendre et pratiquer cinq arts : le **tarot**, l'**astrologie**, la **magie** (astrale et hermétique), l'**alchimie** et **Psyché** (l'inconscient, de Mesmer à Jung).

- **Tarot** : sept jeux historiques (Marseille de Conver, Waite-Smith, Sola Busca, Grand Etteilla, Wirth…), tirages, cours, histoire, journal.
- **Astrologie** : « Ton ciel aujourd'hui » en une phrase tirée de tes transits (avec « Pourquoi on dit ça ? », qui montre le calcul et ouvre la leçon), une image à partager (ciel du jour et trio Soleil, Lune, Ascendant), le ciel du jour calculé sur l'appareil, l'Observatoire en quatre ateliers (point de vue Terre ou Soleil, rétrogradations, aspects, Lune), la comparaison de deux thèmes, thème natal (lieux de naissance dans toutes les communes de France et les villes du monde) avec lecture guidée, lames de tarot du thème, maisons expliquées en clair, calendrier de l'année et journal des transits, école, histoire en dix chapitres illustrés, à lire un par un, chacun ouvert par une scène (`astro/astro-jour.js` pour l'accueil, mode chapitre dans `histoire.js`).
- **Magie** : heures planétaires, carrés d'Agrippa, atelier du sigil, Arbre de vie expliqué sephira par sephira avec les 22 lettres et leurs sentiers, guématrie en cinq méthodes, cabinet des pentacles (composer le sien en sept étapes, et les pentacles du monde : Salomon, l'Arbatel, les 72 génies, l'abbé Julio, la médaille de saint Benoît, le wafq…), traducteur d'écritures (grec, hébreu, thébain et les trois écritures d'Agrippa), géomancie, rituels guidés, cycle de 28 jours, cours en quinze modules et cinquante et une leçons sur la carte d'un château, histoire de la magie en onze chapitres illustrés, « Composer un rituel » (intention, planète, heure, lame, métal, sigil).
- **Alchimie** : l'athanor (métal du jour, opération du mois), le Grand Œuvre à conduire au soufflet dans un vase animé, « Mon Œuvre » (une pratique en quatre couleurs avec journal), la roue des métaux, le carré des éléments, la table des signes, huit planches du Splendor solis à gagner puis à explorer détail par détail, six emblèmes commentés, le bestiaire vivant (six bêtes qui se changent l'une en l'autre dans le vase), le livre muet (les quinze planches du Mutus Liber de 1677 à feuilleter), la Table d'émeraude phrase par phrase, un cours de quinze leçons, une histoire illustrée. Le jeu a trois niveaux et un défi par jour.
- **Psyché** : l'archétype et la question du jour ; six outils (le test d'associations de Jung, le journal des rêves avec amplification, l'atelier du mandala, le miroir de l'ombre, l'expérience de 1784, la ficelle de Coué) ; un cours de dix modules et trente leçons rangé dans la maison du rêve de Jung ; une histoire en onze chapitres, du temple d'Asclépios au laboratoire du sommeil. Chargé à la demande (`psyche/psyche.js`), il ne pèse rien au démarrage.
- **Le grand chelem** (dans le chemin) : un jeu par art. L'ordre des lames (tarot), la roue du zodiaque (astrologie), le carré de Saturne (magie), le Grand Œuvre (alchimie) et la descente dans la maison de Jung (Psyché). Les trois premiers sont dans `chelem.js`, chargé à la demande.
- **Le globe des traditions** (depuis les pages Histoire, ou `…/?globe`) : un globe dessiné comme une carte ancienne, 84 traditions spirituelles et ésotériques qui se regroupent de loin et se séparent au zoom, leurs voyages animés, 74 fils d'héritage entre traditions (qui a transmis quoi à qui), 36 événements, 26 symboles tracés, quatre parcours guidés, six voyageurs historiques à suivre, la comparaison de deux traditions et des jeux (géographie, vrai ou légende, remettre dans l'ordre, suivre le fil, énigme du jour). Fleuves, montagnes, déserts, navires et monstres marins gravés ; chaque fiche a son image d'époque (72 œuvres du domaine public ou sous licence libre : Wellcome Collection, Art Institute of Chicago, Cleveland Museum of Art), ce qu'on y croyait, les grandes figures, les textes et ce qu'il en reste aujourd'hui. Chargé à la demande.

Tout fonctionne dans le navigateur, sans serveur ni compte : les données personnelles (journal, thèmes, carnet) restent sur l'appareil. Une sauvegarde se fait depuis Mon espace.

## Lancer en local

```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000.

## Crédits

Les sources des images, des polices et des textes sont listées dans l'application (pied de page → Crédits et sources).
