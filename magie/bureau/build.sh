#!/bin/sh
# Compile le jeu « Sans suite » (le Bureau) avec Three.js en un seul fichier.
# Prérequis : npm i esbuild three@0.187.0 dans un dossier de travail.
# Exemple : CIEL_MODULES=/tmp/t3/node_modules ESBUILD=/tmp/t3/node_modules/.bin/esbuild sh magie/bureau/build.sh
cd "$(dirname "$0")/../.." && NODE_PATH="${CIEL_MODULES:-/tmp/t3/node_modules}" "${ESBUILD:-/tmp/t3/node_modules/.bin/esbuild}" magie/bureau/src/jeu.js --bundle --minify --format=esm --target=es2020 --legal-comments=eof --outfile=magie/bureau/bureau.min.js
