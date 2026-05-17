# 🎨 Cartella `colouring_pages/`

Questa cartella contiene i disegni da colorare che appaiono nella galleria della sezione **Colora** del wizard di Studio Magico.

## Come aggiungere un nuovo disegno

1. **Prepara il file SVG** seguendo le regole sotto
2. **Copialo dentro questa cartella** (`colouring_pages/`)
3. **Aggiungilo a `index.json`** (il manifest che l'app legge per popolare la galleria)
4. Apri Studio Magico → Crea con wizard → Colora: il disegno appare nella galleria

Niente compilazione, niente riavvio del server. Basta ricaricare la pagina del browser.

---

## Regole per i file SVG

### Solo SVG

L'app accetta solo file `.svg` in questa cartella. PNG, JPG e altri formati raster **non funzionano** dalla cartella interna (l'utente finale può comunque caricarli da PC, ma in quel caso sarà disponibile solo il pennello, non il secchiello).

Se hai un'immagine raster da convertire, usa offline strumenti tipo **Inkscape** (`Tracciato → Vettorizza bitmap`) o servizi tipo **vectormagic.com**, poi rifinisci a mano in Inkscape per assicurarti che le regioni colorabili siano path chiusi.

### Struttura del file

Apri il file SVG con un editor di testo. Deve avere questa forma:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <!-- 1) REGIONI COLORABILI (scritte PRIMA, stanno sotto) -->
  <path class="colorable" fill="#FFFFFF" d="M ..." />
  <path class="colorable" fill="#FFFFFF" d="M ..." />
  <path class="colorable" fill="#FFFFFF" d="M ..." />

  <!-- 2) CONTORNI NERI (scritti DOPO, stanno sopra) -->
  <path fill="none" stroke="#000000" stroke-width="3" d="M ..." />
  <path fill="none" stroke="#000000" stroke-width="3" d="M ..." />
</svg>
```

### Cosa è obbligatorio

| Cosa | Perché |
|---|---|
| Attributo `viewBox="0 0 W H"` sul `<svg>` | Definisce l'area del disegno. L'app deduce l'**orientamento A4** dal rapporto W/H:<br>• `W > H` → A4 **orizzontale** (1123×794 px)<br>• `H ≥ W` → A4 **verticale** (794×1123 px) |
| Path delle regioni con `class="colorable"` e `fill="#FFFFFF"` | Su questi path il **secchiello** colora con un click |
| Path dei contorni con `fill="none"` e `stroke="#000000"` (o vicino al nero) | Sono le linee del disegno, **non vanno colorate**. Niente `class="colorable"` su di loro |
| Contorni scritti **dopo** le regioni colorabili nel file | Nello z-order SVG, gli elementi scritti dopo stanno sopra. Così il contorno nero appare sopra il riempimento |
| Niente JavaScript embedded, niente riferimenti esterni (font, immagini incorporate) | Sicurezza e portabilità |

### Convenzione di naming

- Tutto minuscolo
- Senza accenti
- Parole separate da trattino

Esempi: `gatto-spaziale.svg`, `castello.svg`, `palloncini.svg`

---

## Il manifest `index.json`

L'app **non legge automaticamente** il contenuto della cartella (i browser non possono elencare directory locali). Per questo c'è un file `index.json` che elenca i disegni disponibili.

### Struttura

```json
{
  "drawings": [
    { "file": "palloncini.svg",   "name": "Palloncini",   "category": "festa",    "emoji": "🎈" },
    { "file": "torta.svg",        "name": "Torta",        "category": "festa",    "emoji": "🎂" },
    { "file": "unicorno.svg",     "name": "Unicorno",     "category": "fantasia", "emoji": "🦄" }
  ]
}
```

### Campi per ogni disegno

| Campo | Obbligatorio | Cosa è |
|---|---|---|
| `file` | sì | Nome del file SVG dentro questa cartella (es: `"palloncini.svg"`) |
| `name` | sì | Nome mostrato sotto l'anteprima nella galleria (es: `"Palloncini"`) |
| `category` | sì | Categoria per i filtri. Valori previsti: `festa`, `animali`, `fantasia`, `natura`, `veicoli`. Se ne aggiungi di nuove, l'app le mostra come filtri |
| `emoji` | no | Emoji decorativa accanto al nome (es: `"🎈"`) |

### Aggiungere un nuovo disegno

1. Copia il file SVG in questa cartella (es: `gatto-spaziale.svg`)
2. Apri `index.json` e aggiungi una riga nell'array `drawings`:

```json
{ "file": "gatto-spaziale.svg", "name": "Gatto spaziale", "category": "fantasia", "emoji": "🐱" }
```

3. Ricorda la **virgola** tra una riga e l'altra, ma **niente virgola** dopo l'ultima riga (è un JSON, non un JavaScript array)
4. Ricarica Studio Magico nel browser

---

## Esempio minimo completo

File `cuore.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path class="colorable" fill="#FFFFFF"
        d="M100,170 C40,120 20,80 50,50 C70,30 95,40 100,70 C105,40 130,30 150,50 C180,80 160,120 100,170 Z" />
  <path fill="none" stroke="#000000" stroke-width="3"
        d="M100,170 C40,120 20,80 50,50 C70,30 95,40 100,70 C105,40 130,30 150,50 C180,80 160,120 100,170 Z" />
</svg>
```

Riga corrispondente in `index.json`:

```json
{ "file": "cuore.svg", "name": "Cuore", "category": "festa", "emoji": "❤️" }
```

Risultato:
- La galleria mostra una card "❤️ Cuore" nella categoria Festa
- Il disegno è 200×200 (quadrato), `H ≥ W` → l'editor apre in A4 **verticale**
- Click sul cuore col secchiello → si riempie del colore scelto, il bordo nero resta visibile

---

## Domande frequenti

**Il mio disegno ha più colori già, non solo bianco. Funziona?**
Sì, ma le aree pre-colorate non sono `.colorable` → il secchiello non le tocca. Puoi sempre dipingerci sopra col pennello.

**Il secchiello mi colora anche le linee nere — perché?**
Hai messo `class="colorable"` su un path che è un contorno. Toglilo. Solo le regioni interne devono avere `class="colorable"`.

**Posso usare colori diversi dal nero per i contorni?**
Sì, qualsiasi colore. L'app non li tratta diversamente — semplicemente non hanno `class="colorable"` quindi il secchiello non li tocca.

**Le proporzioni del mio disegno non sono A4. Si stiracchia?**
No. L'app fa **fit** mantenendo le proporzioni (`preserveAspectRatio="xMidYMid meet"`). Se l'aspect ratio è diverso da A4, vedrai bande bianche ai lati. Per stampe pulite, prepara disegni con aspect ratio 210:297 (verticale) o 297:210 (orizzontale).

**Posso aggiungere font o immagini esterne nell'SVG?**
No, per sicurezza. Converti tutto il testo in path (in Inkscape: `Tracciato → Da oggetto a tracciato`) e incorpora le immagini come `<image>` con `data:` URL solo se proprio necessario.
