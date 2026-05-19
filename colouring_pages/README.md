# 🎨 Cartella `colouring_pages/`

Qui dentro vivono i disegni da colorare che appaiono nella galleria della sezione **Colora** sul menu home di Studio Magico.

---

## Workflow rapido per aggiungere disegni

In ordine, ogni volta che hai nuove immagini da mettere in galleria:

1. **Trascina i file** (PNG / JPG / JFIF) dentro questa cartella, al livello principale (NON in sottocartelle).
2. **Apri `index.json`** e aggiungi una riga per ognuno (vedi sotto la sezione dedicata).
3. **Lancia lo script di ottimizzazione** dal terminale, dalla root del progetto:
   ```bash
   node scripts/optimize-coloring-pages.mjs
   ```
4. **`git add` + commit + push** (Netlify ridepoloya automaticamente).
5. Apri Studio Magico → 🎨 Colora: i nuovi disegni sono in galleria.

---

## Lo script di ottimizzazione

Lo script `scripts/optimize-coloring-pages.mjs` è quello che fa la magia. Per ogni immagine al livello principale di questa cartella:

- **Ridimensiona** il lato lungo a max **1754px** (= A4 a ~150 DPI, qualità di stampa più che decente)
- **Riconverte tutto in PNG** con palette quantizzata (formato perfetto per i contorni neri dei coloring → niente sbavature JPEG che farebbero "colare" il secchiello tra le zone)
- **Elimina il file originale** se aveva un'estensione diversa (es. `.jfif` → diventa `.png`, l'originale viene cancellato)
- **Genera l'anteprima** (≤ 240px sul lato lungo) dentro `thumbs/<nomefile>.png` — è quella che vedi nella card della galleria
- Stampa un report con i risparmi ottenuti

### Setup iniziale (una volta sola)

Lo script usa la libreria **sharp** (Node.js). Per installarla la prima volta:

```bash
cd scripts
npm install sharp
cd ..
```

`scripts/node_modules/` è nel `.gitignore`, quindi non finisce mai su GitHub.

### Esecuzione

Dalla cartella root del progetto:

```bash
node scripts/optimize-coloring-pages.mjs
```

Esempio di output:
```
gatto.png                      2000×2000   129 KB →   44 KB  (thumb 6 KB)
cane_passeggiata.png           1408×768   1866 KB →  388 KB  (thumb 14 KB)
torta2.png                      864×1232  1193 KB →  251 KB  (thumb 15 KB)
...
Processati 16 file
Totale prima:  4.71 MB
Totale dopo:   2.34 MB
Risparmio:     50%
```

Idempotente: rilanciarlo su file già ottimizzati non rompe niente (semplicemente non risparmia nulla).

---

## `index.json` — il manifest della galleria

L'app NON legge automaticamente il contenuto della cartella (i browser non possono elencare le directory locali per sicurezza). Per questo c'è il file `index.json` che elenca cosa mostrare nella galleria.

### Struttura

```json
{
  "drawings": [
    { "file": "gatto.png",      "name": "Gatto",      "category": "animali", "emoji": "🐱" },
    { "file": "torta.png",      "name": "Torta",      "category": "festa",   "emoji": "🎂" },
    { "file": "arcobaleno.png", "name": "Arcobaleno", "category": "fantasia","emoji": "🌈" }
  ]
}
```

### Campi

| Campo | Obbligatorio | Cosa è |
|---|---|---|
| `file` | sì | Nome del file con estensione (es: `"gatto.png"`). Sempre `.png` dopo aver passato lo script di ottimizzazione |
| `name` | sì | Nome mostrato sotto l'anteprima nella galleria (es: `"Gatto"`) |
| `category` | sì | Categoria per i filtri. Valori previsti: `animali`, `festa`, `fantasia`, `natura`, `veicoli`. Se ne aggiungi una nuova compare automaticamente come filtro |
| `emoji` | no | Emoji decorativa accanto al nome. Se manca, viene usata 🎨 di default |

### Aggiungere un nuovo disegno

1. Copia il file (es: `gatto-spaziale.png`) in `colouring_pages/`
2. Apri `index.json` e aggiungi una riga nell'array `drawings`:

   ```json
   { "file": "gatto-spaziale.png", "name": "Gatto spaziale", "category": "fantasia", "emoji": "🐱" }
   ```

3. **Virgola** tra una riga e l'altra, **niente virgola** dopo l'ultima (è JSON, non JS).
4. Lancia lo script di ottimizzazione (vedi sopra).
5. Commit + push.

L'ordine nell'array `drawings` decide l'ordine nella galleria.

---

## Convenzioni per i file sorgente

- **Cosa funziona meglio**: line-art nero su sfondo bianco (i classici disegni da colorare), con linee chiuse e contrasto alto. Il secchiello (flood fill) si ferma sui pixel scuri (luminanza < 80/255).
- **Cosa non funziona**: foto a colori, disegni con tante sfumature di grigio (il secchiello potrebbe "colare" attraverso i bordi sfumati), immagini con sfondi non bianchi.
- **Naming**: tutto minuscolo, senza accenti, parole separate da trattino o underscore (`gatto_casa.png`, `cane-al-parco.png`). Niente spazi.
- **Dimensioni di partenza**: qualunque, lo script ridimensiona a A4. Idealmente le immagini sorgente sono già ≥ 1200px sul lato lungo, così la riduzione mantiene buona qualità.
- **Formato di partenza**: PNG/JPG/JFIF — tutti vengono comunque convertiti in PNG ottimizzato dallo script.

---

## Cosa fa l'app col file in runtime

1. La card della galleria mostra `thumbs/<nome>.png` come anteprima (caricata in lazy)
2. Click sulla card → fetch del file principale, viene wrappato in un SVG dinamico con `<image href="data:...">` e usato come sfondo del canvas A4 dell'editor
3. **Pennello**: dipinge sopra il disegno; grazie a `mix-blend-mode: multiply` i contorni neri restano sempre in primo piano sopra i colori
4. **Secchiello**: clicca su una zona bianca → flood fill dal pixel cliccato espandendosi fino al primo bordo scuro, riempie l'area sul brush canvas col colore scelto. Funziona indipendentemente dalla struttura del file (raster o SVG single-path o SVG con `.colorable`).
5. **Stampa**: il canvas viene inviato alla stampante in formato A4 con orientamento corretto (portrait se H ≥ W, landscape altrimenti).

---

## File e cartelle qui dentro

| Path | Cosa è |
|---|---|
| `README.md` | Questo file |
| `index.json` | Manifest della galleria (vedi sopra) |
| `*.png` al livello root | I disegni a piena risoluzione (A4 @ 150 DPI) |
| `thumbs/*.png` | Anteprime ≤ 240px usate nelle card della galleria |

Niente da fare a mano in `thumbs/` — la cartella è gestita interamente dallo script.

---

## SVG curati (modalità avanzata, opzionale)

Se in futuro vuoi preparare SVG con regioni `.colorable` per avere bucket fill di "qualità vettoriale" su zone specifiche (più pulito del flood fill su pixel), l'app supporta ancora questa modalità per retrocompatibilità. Convenzione:

- `viewBox` obbligatorio
- Path delle regioni colorabili con `class="colorable"` e un id univoco
- Contorni neri come path separati, scritti DOPO le regioni colorabili nel file (per stare sopra nello z-order)

L'app dà la precedenza ai `.colorable` quando il click colpisce uno di questi path. Altrimenti, fallback automatico al flood fill su pixel.

**Per la maggior parte dei casi non serve fare questa preparazione**: il flood fill su pixel funziona benissimo sulle immagini raster prese così come sono.
