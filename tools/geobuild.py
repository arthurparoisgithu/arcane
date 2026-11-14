"""Usage : python3 tools/geobuild.py astro/villes.js <dossier GeoNames>
Construit astro/villes.js à partir des fichiers GeoNames (CC BY 4.0) téléchargés dans /home/claude/geo.
France et outre-mer : toutes les localités peuplées (communes) ; Belgique, Suisse, Luxembourg, Monaco, Québec,
Algérie, Maroc, Tunisie : villes de plus de 1 000 habitants ; reste du monde : villes de plus de 15 000 habitants.
Format compact : une ligne par lieu, champs séparés par « | » :
nom | autre nom (facultatif) | indice de région | lat | lon | indice de fuseau | population (en centaines)."""
import zipfile, io, csv, sys, json
G = (sys.argv[2] if len(sys.argv) > 2 else ".").rstrip("/") + "/"   # dossier des fichiers GeoNames téléchargés
csv.field_size_limit(10**9)

def rows(path_or_zip, member=None):
    if member:
        z = zipfile.ZipFile(path_or_zip)
        f = io.TextIOWrapper(z.open(member), encoding="utf-8")
    else:
        f = open(path_or_zip, encoding="utf-8")
    for line in f:
        if line.startswith("#"): continue
        yield line.rstrip("\n").split("\t")

BAD = {"PPLX", "PPLH", "PPLQ", "PPLW", "PPLCH"}
places = {}   # geonameid -> dict
def add(r, minpop):
    gid, name, asc, alts, lat, lon, fc, fcode, cc = r[0], r[1], r[2], r[3], float(r[4]), float(r[5]), r[6], r[7], r[8]
    a1, a2, pop, tz = r[10], r[11], int(r[14] or 0), r[17]
    if fc != "P" or fcode in BAD or not tz: return
    if pop < minpop: return
    places[gid] = dict(name=name, lat=lat, lon=lon, cc=cc, a1=a1, a2=a2, pop=pop, tz=tz)

# monde
for r in rows(G + "cities15000.zip", "cities15000.txt"): add(r, 15000)
# francophonie proche
NEAR = {"BE", "CH", "LU", "MC", "DZ", "MA", "TN"}
for r in rows(G + "cities1000.zip", "cities1000.txt"):
    if r[8] in NEAR or (r[8] == "CA" and r[10] == "10"): add(r, 1000)
# France et outre-mer : toutes les communes (lieux peuplés avec une population)
for c in ["FR", "GP", "MQ", "GF", "RE", "YT", "PM", "NC", "PF", "WF", "BL", "MF"]:
    for r in rows(G + c + ".zip", c + ".txt"): add(r, 1)
print("lieux", len(places), file=sys.stderr)

# régions : département pour la France, région (admin1) ailleurs
adm1 = {r[0]: (r[1], r[3]) for r in rows(G + "admin1CodesASCII.txt")}
adm2 = {r[0]: (r[1], r[3]) for r in rows(G + "admin2Codes.txt")}
countries = {}
for r in rows(G + "countryInfo.txt"):
    if len(r) > 16: countries[r[0]] = (r[4], r[16])

# noms français (alternateNamesV2) pour les lieux, régions et pays
need = set(places) | {v[1] for v in adm1.values()} | {v[1] for v in adm2.values()} | {v[1] for v in countries.values()}
fr = {}
for r in rows(G + "altV2.zip", "alternateNamesV2.txt"):
    if len(r) < 4 or r[2] != "fr" or r[1] not in need: continue
    if len(r) > 7 and (r[6] == "1" or r[7] == "1"): continue   # familier ou historique
    pref = len(r) > 4 and r[4] == "1"
    if r[1] not in fr or pref: fr[r[1]] = r[3]
print("noms fr", len(fr), file=sys.stderr)

FR_CC = {"FR", "GP", "MQ", "GF", "RE", "YT", "PM", "NC", "PF", "WF", "BL", "MF"}
OUTRE = {"GP": "Guadeloupe", "MQ": "Martinique", "GF": "Guyane", "RE": "La Réunion", "YT": "Mayotte", "PM": "Saint-Pierre-et-Miquelon", "NC": "Nouvelle-Calédonie", "PF": "Polynésie française", "WF": "Wallis-et-Futuna", "BL": "Saint-Barthélemy", "MF": "Saint-Martin"}
def country_fr(cc):
    if cc in OUTRE: return OUTRE[cc]
    c = countries.get(cc)
    return fr.get(c[1], c[0]) if c else cc
def region(p):
    cc = p["cc"]
    if cc == "FR":
        a = adm2.get(f"FR.{p['a1']}.{p['a2']}")
        return (fr.get(a[1], a[0]) if a else "") + ", France"
    if cc in OUTRE: return OUTRE[cc]
    a = adm1.get(f"{cc}.{p['a1']}")
    reg = fr.get(a[1], a[0]) if a else ""
    cn = country_fr(cc)
    return f"{reg}, {cn}" if reg and reg != cn else cn

def clean(s):
    return s.replace("|", " ").replace("\n", " ").strip()
regions, tzs, out = {}, {}, []
for gid, p in places.items():
    name = p["name"]
    frn = fr.get(gid) if p["cc"] not in FR_CC else None
    shown, other = (frn, name) if frn and frn != name else (name, "")
    reg = region(p)
    ri = regions.setdefault(reg, len(regions)); ti = tzs.setdefault(p["tz"], len(tzs))
    out.append((p["pop"], f"{clean(shown)}|{clean(other)}|{ri}|{p['lat']:.3f}|{p['lon']:.3f}|{ti}|{round(p['pop']/100)}"))
out.sort(key=lambda x: -x[0])
reg_list = [k for k, _ in sorted(regions.items(), key=lambda x: x[1])]
tz_list = [k for k, _ in sorted(tzs.items(), key=lambda x: x[1])]
js = ("/* Villes du monde pour le thème natal. Données GeoNames (geonames.org), licence CC BY 4.0.\n"
      "   Généré par un script : France et outre-mer (toutes les communes), francophonie proche (> 1 000 hab.), monde (> 15 000 hab.). */\n"
      "window.ARCANES_VILLES = {R:" + json.dumps(reg_list, ensure_ascii=False) + ",Z:" + json.dumps(tz_list) + ",V:" +
      json.dumps("\n".join(l for _, l in out), ensure_ascii=False) + "};\n")
open(sys.argv[1], "w", encoding="utf-8").write(js)
print("écrit", len(out), "lieux,", len(reg_list), "régions,", len(tz_list), "fuseaux,", len(js.encode()) // 1024, "Ko", file=sys.stderr)
