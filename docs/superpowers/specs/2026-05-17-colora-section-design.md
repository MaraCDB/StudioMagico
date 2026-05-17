# Sezione "Colora" nel wizard — Design Spec

**Data:** 2026-05-17
**Stato:** approvato in brainstorming, in attesa di piano implementativo

## Sommario

Aggiungere una nuova sezione "Colora" al wizard di Studio Magico che permette ai bambini di colorare disegni in formato A4 (verticale o orizzontale a seconda del disegno). I disegni sono SVG curati distribuiti con l'app (cartella `colouring_pages/`) oppure caricati dall'utente dal proprio computer. Una volta scelto il disegno, l'editor esistente viene aperto con il disegno come sfondo e gli strumenti normali (pennello, secchiello, sticker, testi, tape, ecc.) disponibili.

## Flusso utente

```
Menu principale
   └─ Crea con il wizard
         └─ Step 1: scegli Tipo
              [📨 Biglietto] [🎉 Striscione] [🏆 Certificato] [🔖 Segnalibro] [🎨 Colora]

              Se "Colora" → salta Step 2 (Tema) e Step 3 (Testi)
                ↓
                Nuovo Step "Scegli il disegno":
                  ├─ Galleria SVG dalla cartella colouring_pages/
                  └─ Bottone "📁 Carica dal computer"
                ↓
                Editor (canvas A4 con disegno come sfondo, strumenti normali)
```

La step-bar in testata si adatta dinamicamente: per il tipo `colora` mostra solo `1. Tipo → 2. Disegno`.

## Formato dei disegni

### Cartella `colouring_pages/` (SVG curati)

Solo file `.svg`. I file raster esistenti (`palloncini.png`, `torta1.jfif`) saranno convertiti offline dall'utente prima dell'implementazione.

Requisiti per ciascun SVG:
- Attributo `viewBox="0 0 W H"` obbligatorio (definisce l'area del disegno)
- Orientamento A4 dedotto dal rapporto W/H:
  - `W > H` → A4 orizzontale (canvas 1123 × 794 px ≈ 297 × 210 mm @ 96dpi)
  - `H ≥ W` → A4 verticale (canvas 794 × 1123 px ≈ 210 × 297 mm @ 96dpi)
- **Regioni colorabili**: path con `class="colorable"` e `fill="#FFFFFF"` (o colore chiaro di default). Su questi il secchiello fa il riempimento.
- **Contorni neri**: path con `fill="none"` e `stroke="#000000"` (o vicino al nero), **scritti dopo** le regioni colorabili nel file SVG (così appaiono sopra nello z-order). Non hanno `class="colorable"`, così il secchiello non li tocca.
- Nessun JavaScript embedded, nessun riferimento esterno (font, immagini incorporate)

Convenzione di naming: lowercase, senza accenti, parole separate da trattino (`gatto-spaziale.svg`).

### Manifest `colouring_pages/index.json`

L'app fa fetch di questo file per popolare la galleria.

```json
{
  "drawings": [
    { "file": "palloncini.svg",   "name": "Palloncini",   "category": "festa",    "emoji": "🎈" },
    { "file": "torta.svg",        "name": "Torta",        "category": "festa",    "emoji": "🎂" },
    { "file": "unicorno.svg",     "name": "Unicorno",     "category": "fantasia", "emoji": "🦄" }
  ]
}
```

Categorie iniziali: `festa`, `animali`, `fantasia`, `natura`, `veicoli`. Filtri categoria opzionali nella galleria (pattern simile a "I miei template").

### Carica da PC

File input che accetta `.svg`, `.png`, `.jpg`, `.jpeg`, `.jfif`. Limite dimensione 5MB.

Adattamento ad A4:
1. Leggere dimensioni (SVG: `viewBox`; raster: `naturalWidth/Height` di `Image`)
2. Orientamento: `W > H` → orizzontale, altrimenti verticale
3. Canvas dimensionato come A4 fisso (794×1123 o 1123×794)
4. Fitting:
   - SVG: come sfondo dell'editor con `width:100%; height:100%; preserveAspectRatio="xMidYMid meet"` (mantiene proporzioni, eventuali bande bianche)
   - Raster: `object-fit: contain` o `background-size: contain`

**Secchiello**: disponibile solo se il file caricato è SVG e contiene almeno un path con `class="colorable"`. Altrimenti pulsante disabilitato con tooltip "Disponibile solo su disegni preparati". **Pennello sempre disponibile.**

**Privacy**: i file utente restano solo nel browser, mai inviati a server.

## Trucco "linee nere sempre in primo piano"

Per evitare che il pennello cancelli i contorni del disegno: applicare `mix-blend-mode: multiply` al brush canvas quando siamo in modalità "colora". I pixel scuri del disegno sottostante passano come moltiplicatori e restano sempre visibili sopra qualunque pittura. I colori del pennello tingono solo le aree bianche/chiare.

Per il secchiello su SVG con `.colorable` non serve: il path del contorno è già un'entità sopra le regioni colorabili nello z-order SVG.

## Architettura — file da toccare

| File | Cosa cambia |
|---|---|
| `index.html` | Aggiungere `<section id="step-colora">` dentro `#wizard` + file input nascosto |
| `js/wizard.js` | Aggiungere tipo `'colora'` in `TIPI` (5° card). Branching: se tipo=`'colora'` salta a `renderStepColora()` invece di Step 2/3. Step-bar dinamica |
| `js/wizard.js` (nuovo blocco) | `renderStepColora()`: fetch `index.json`, render galleria, filtri categoria, click handler disegno, handler "carica da PC", apertura editor |
| `js/editor.js` | Aggiungere `initColoring(drawing)`: canvas A4 (portrait/landscape) basato su orientamento del disegno, inserisce SVG/immagine come sfondo, abilita/disabilita secchiello in base a presenza di `.colorable` |
| `js/editor.js` (dimensioni) | Aggiungere tipo interno `colora-portrait` / `colora-landscape` con dimensioni fisse (794×1123 / 1123×794) |
| `js/tools.js` (color tool) | Applicare `mix-blend-mode: multiply` sul brush canvas in modalità "colora" |
| `css/style.css` | Stili galleria disegni (riusa pattern `my-tpls-grid`), step-bar "colora" a 2 step, brush canvas in multiply, file input nascosto + bottone upload |
| `colouring_pages/README.md` | **Nuovo**: guida formato SVG + manifest per l'utente |
| `colouring_pages/index.json` | **Nuovo**: manifest di partenza |

Nessuna nuova dipendenza, nessun build step.

## Edge case

- **Cartella vuota / `index.json` mancante**: galleria mostra placeholder "Nessun disegno disponibile ancora. Carica un disegno dal tuo computer 👇" + bottone upload sempre visibile
- **SVG senza `viewBox`**: alert "Disegno non valido — manca viewBox" e non viene caricato
- **File > 5MB**: alert "File troppo grande, massimo 5MB"
- **File raster caricato senza `.colorable`**: secchiello disabilitato, pennello attivo, no errore
- **Stampa** (`Stampa` toolbar action esistente): html2canvas supporta `mix-blend-mode`. Test obbligatorio in implementazione per confermare il rendering corretto della stampa
- **Salva bozza / Salva template**: la modalità colora serializza l'SVG di sfondo come `dataURL` per non dipendere dalla cartella `colouring_pages/` se il file viene rimosso o se è un upload da PC. Dettagli da finalizzare nel piano implementativo
- **Undo / Clear / Redo**: già supportano pennello, secchiello, testi e sticker. Nessuna modifica richiesta

## Test plan (manuale)

Checklist riproducibile da eseguire al termine dell'implementazione e in regression dopo modifiche all'area:

### Wizard flow
- [ ] Menu → Crea con wizard mostra 5 card in Step 1
- [ ] Selezionare "Colora" porta al nuovo step "Scegli il disegno", saltando Tema e Testi
- [ ] La step-bar in testata mostra "1. Tipo → 2. Disegno" (no Step 3)
- [ ] Bottone "← Indietro" dallo step disegno torna al Step 1
- [ ] Bottone "← Torna al menu" funziona da Step 1

### Galleria
- [ ] Se `index.json` esiste e ha drawings, la galleria li mostra con emoji e nome
- [ ] Filtri categoria filtrano correttamente
- [ ] Cartella vuota / `index.json` mancante → placeholder amichevole + upload disponibile
- [ ] Click su un disegno apre l'editor con quel disegno come sfondo

### Carica da PC
- [ ] Accetta `.svg`, `.png`, `.jpg`, `.jpeg`, `.jfif`
- [ ] Rifiuta altri formati con messaggio chiaro
- [ ] File > 5MB → alert e nessun caricamento
- [ ] SVG senza `viewBox` → alert "Disegno non valido"
- [ ] SVG con `.colorable` → secchiello attivo
- [ ] SVG senza `.colorable` → secchiello disabilitato con tooltip
- [ ] PNG/JPG → secchiello disabilitato, pennello attivo

### Canvas A4 e orientamento
- [ ] Disegno con `W > H` → canvas A4 orizzontale (1123×794)
- [ ] Disegno con `H ≥ W` → canvas A4 verticale (794×1123)
- [ ] Disegno con aspect ratio diverso da A4 → fittato con `preserveAspectRatio="xMidYMid meet"` (bande bianche, no stretch)

### Coloring
- [ ] Pennello su disegno colora le aree chiare, le linee nere restano visibili (multiply funziona)
- [ ] Secchiello su path `.colorable` riempie correttamente
- [ ] Secchiello NON colora i contorni neri
- [ ] Sticker, testi, tape funzionano sopra il disegno come negli altri tipi
- [ ] Undo/Redo funzionano per pennello e secchiello

### Stampa e salvataggio
- [ ] Stampa (`html2canvas`) renderizza correttamente il `mix-blend-mode: multiply` — i contorni neri vanno in stampa
- [ ] Stampa rispetta l'orientamento A4 (portrait/landscape) del disegno
- [ ] Salva bozza ripristina la modalità colora con il disegno corretto
- [ ] Salva template (se applicabile alla modalità colora) ripristina correttamente

### Responsive (mobile / tablet)
- [ ] Galleria si adatta a schermo stretto
- [ ] Editor in modalità colora resta utilizzabile su tablet

## Out of scope

- Convertitore automatico raster → SVG con detection di regioni colorabili (qualità imprevedibile, decisione esplicita in brainstorming)
- Setup di un framework di test automatizzato (rimandato a futura adozione)
- Editing dell'SVG di sfondo (i contorni del disegno non sono modificabili dall'utente)
- Generazione automatica di `index.json` dalla cartella (non possibile senza server-side; l'utente lo mantiene manualmente — vedi README)
