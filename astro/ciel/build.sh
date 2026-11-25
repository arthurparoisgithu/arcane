#!/bin/sh
# Compile le jeu « Le ciel qui tourne » avec Three.js en un seul fichier.
# Prérequis : npm i esbuild three@0.187.0 dans un dossier de travail, puis CIEL_MODULES vers son node_modules.
# Exemple : CIEL_MODULES=/tmp/t3/node_modules ESBUILD=/tmp/t3/node_modules/.bin/esbuild sh astro/ciel/build.sh
cd "$(dirname "$0")/../.." && NODE_PATH="${CIEL_MODULES:-/tmp/t3/node_modules}" "${ESBUILD:-/tmp/t3/node_modules/.bin/esbuild}" astro/ciel/src/jeu.js --bundle --minify --format=esm --target=es2020 --legal-comments=eof --outfile=astro/ciel/ciel.min.js
