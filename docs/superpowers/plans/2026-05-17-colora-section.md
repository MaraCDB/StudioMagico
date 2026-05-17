# Sezione "Colora" nel wizard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere una sezione "Colora" al wizard di Studio Magico: 5° tipo in Step 1, nuovo step "Scegli disegno" con galleria SVG + upload da PC, editor A4 (portrait/landscape) con disegno come sfondo e linee nere sempre visibili.

**Architecture:** Riutilizzo dell'infrastruttura esistente: un disegno colorabile è modellato come un `template` standard (`{ svg, isColoringPage, orientation }`), così l'`init()` dell'editor lo gestisce senza riscritture. Il wizard branchia su `tipo === 'colora'` saltando Step 2/3 e mostrando il nuovo step. `mix-blend-mode: multiply` sul brush canvas tiene i contorni neri sempre in primo piano.

**Tech Stack:** Vanilla JS, HTML5, CSS3, `html2canvas` (già presente). Nessuna nuova dipendenza.

**Source spec:** `docs/superpowers/specs/2026-05-17-colora-section-design.md`

**Convenzioni di commit:** Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`). Lint pre-commit: `node --check <file.js>` per ogni JS modificato. CSS/HTML: verifica visuale nel browser.

---

## File map

| File | Tipo | Responsabilità |
|---|---|---|
| `index.html` | modify | Aggiungere `<section id="step-colora">` dentro `#wizard`, file input nascosto |
| `js/wizard.js` | modify | 5° tipo `'colora'`, branching navigation, `renderStepColora()`, step-bar dinamica |
| `js/editor.js` | modify | Supporto coloring template (orientation), brush canvas in multiply, print A4 corretto |
| `js/tools.js` | modify | Disabilitare bucket-fill se template è coloring senza `.colorable` |
| `css/style.css` | modify | `.ratio-colora-portrait/landscape`, galleria, upload button, step-bar 2 step, mobile |
| `colouring_pages/README.md` | exists | Già creato dalla spec — niente da fare |
| `colouring_pages/index.json` | exists | Già creato (vuoto) — niente da fare |

---

## Task 1: Aggiungere il 5° tipo "Colora" nel wizard Step 1

**Files:**
- Modify: `js/wizard.js:5-17`

- [ ] **Step 1: Aggiungere `'colora'` ai tipi validi e all'array TIPI**

Sostituire le righe 5-17 di `js/wizard.js`:

```javascript
window.APP_STATE = {
  tipo: null,        // 'biglietto' | 'striscione' | 'certificato' | 'segnalibro' | 'colora'
  template: null,    // oggetto template scelto
  testi: {},         // { campo: 'valore', ... }
  font: 'Baloo 2'
};

const TIPI = [
  { id: 'biglietto',   nome: 'Biglietto',   emoji: '📨' },
  { id: 'striscione',  nome: 'Striscione',  emoji: '🎉' },
  { id: 'certificato', nome: 'Certificato', emoji: '🏆' },
  { id: 'segnalibro',  nome: 'Segnalibro',  emoji: '🔖' },
  { id: 'colora',      nome: 'Colora',      emoji: '🎨' }
];
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output (success).

- [ ] **Step 3: Verifica nel browser**

Apri `index.html` in un browser, clicca "Crea con il wizard". Step 1 ora mostra 5 card: Biglietto, Striscione, Certificato, Segnalibro, **🎨 Colora**.
Cliccando "Colora" il bottone "Avanti" si abilita ma cliccarlo porta a uno Step 2 vuoto/errato (sarà fissato nel Task 5–6).

- [ ] **Step 4: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): add 'colora' as 5th tipo card in step 1"
```

---

## Task 2: CSS — aspect ratio A4 per i due orientamenti

**Files:**
- Modify: `css/style.css:978-981`

- [ ] **Step 1: Aggiungere le classi A4 dopo le quattro esistenti**

Inserire dopo la riga 981:

```css
.ratio-colora-portrait  { aspect-ratio: 210 / 297; max-width: 560px; }
.ratio-colora-landscape { aspect-ratio: 297 / 210; max-width: 800px; }
```

- [ ] **Step 2: Verifica visuale**

Apri DevTools del browser, valuta in console:
```javascript
const el = document.createElement('div');
el.classList.add('ratio-colora-portrait');
document.body.appendChild(el);
getComputedStyle(el).aspectRatio
```
Expected: `"210 / 297"` (o `"0.707..."`).

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "style(editor): add A4 portrait/landscape ratio classes for colora"
```

---

## Task 3: Aggiungere `<section id="step-colora">` in index.html

**Files:**
- Modify: `index.html:198-202`

- [ ] **Step 1: Aggiungere la sezione subito dopo `#step3`**

Sostituire le righe 198-202:

```html
<div id="wizard" hidden>
  <section id="step1" class="wizard-step active"></section>
  <section id="step2" class="wizard-step" hidden></section>
  <section id="step3" class="wizard-step" hidden></section>
  <section id="step-colora" class="wizard-step" hidden></section>
</div>
```

- [ ] **Step 2: Verifica struttura**

In DevTools console:
```javascript
document.getElementById('step-colora') !== null
```
Expected: `true`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(wizard): add empty step-colora section in wizard container"
```

---

## Task 4: Implementare `renderStepColora()` skeleton con fetch del manifest

**Files:**
- Modify: `js/wizard.js` (aggiungere dopo `renderStep3`, prima di `goToStep`)

- [ ] **Step 1: Aggiungere la funzione**

Inserire prima della funzione `goToStep` (riga ~352):

```javascript
/* ---------- STEP COLORA ---------- */
async function renderStepColora() {
  const root = document.getElementById('step-colora');
  if (!root) return;

  // markup iniziale (placeholder finché non carico il manifest)
  root.innerHTML = `
    <h2 class="step-title">🎨 Scegli un disegno da colorare</h2>
    <p class="step-subtitle">Scegli dalla galleria o carica un disegno dal tuo computer</p>

    <div id="colora-gallery" class="colora-gallery" aria-live="polite">
      <p class="colora-loading">Caricamento disegni…</p>
    </div>

    <div class="colora-upload-row">
      <input type="file" id="colora-file-input"
             accept=".svg,.png,.jpg,.jpeg,.jfif,image/svg+xml,image/png,image/jpeg" hidden />
      <button type="button" class="btn btn-secondary" id="btn-colora-upload">
        📁 Carica dal computer
      </button>
    </div>

    <div class="nav-buttons">
      <button class="btn btn-secondary" id="btn-prev-colora">← Indietro</button>
    </div>
  `;

  // back: torna allo Step 1
  root.querySelector('#btn-prev-colora').addEventListener('click', () => goToStep(1));

  // upload (handler completo nel Task 9)
  const fileInput = root.querySelector('#colora-file-input');
  const btnUpload = root.querySelector('#btn-colora-upload');
  btnUpload.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => handleColoraUpload(e));

  // fetch manifest
  let manifest = { drawings: [] };
  try {
    const res = await fetch('colouring_pages/index.json', { cache: 'no-store' });
    if (res.ok) {
      manifest = await res.json();
    }
  } catch (err) {
    console.warn('[colora] impossibile caricare il manifest:', err);
  }

  renderColoraGallery(manifest.drawings || []);
}

function renderColoraGallery(drawings) {
  const gallery = document.getElementById('colora-gallery');
  if (!gallery) return;

  if (!Array.isArray(drawings) || drawings.length === 0) {
    gallery.innerHTML = `
      <p class="colora-empty">
        Nessun disegno disponibile ancora.<br />
        Carica un disegno dal tuo computer 👇
      </p>
    `;
    return;
  }

  // categorie uniche per filtri
  const categories = [...new Set(drawings.map(d => d.category).filter(Boolean))];
  const filtersHtml = categories.length > 0 ? `
    <div class="colora-filters" role="tablist">
      <button type="button" class="colora-filter active" data-cat="">Tutti</button>
      ${categories.map(c => `
        <button type="button" class="colora-filter" data-cat="${escapeHtml(c)}">
          ${escapeHtml(c)}
        </button>
      `).join('')}
    </div>
  ` : '';

  const cardsHtml = drawings.map((d, i) => `
    <div class="colora-card"
         data-file="${escapeHtml(d.file)}"
         data-category="${escapeHtml(d.category || '')}"
         role="button" tabindex="0">
      <span class="colora-card-emoji">${escapeHtml(d.emoji || '🎨')}</span>
      <span class="colora-card-name">${escapeHtml(d.name || d.file)}</span>
    </div>
  `).join('');

  gallery.innerHTML = `
    ${filtersHtml}
    <div class="colora-grid">${cardsHtml}</div>
  `;

  // filtri
  gallery.querySelectorAll('.colora-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      gallery.querySelectorAll('.colora-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat || '';
      gallery.querySelectorAll('.colora-card').forEach(card => {
        card.hidden = cat && card.dataset.category !== cat;
      });
    });
  });

  // click su una card: carica il disegno (handler completo nel Task 7)
  gallery.querySelectorAll('.colora-card').forEach(card => {
    const open = () => loadColoraDrawing(card.dataset.file);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

// stub: implementato nel Task 7
function loadColoraDrawing(file) {
  console.log('[colora] TODO: load drawing', file);
}

// stub: implementato nel Task 9
function handleColoraUpload(e) {
  console.log('[colora] TODO: upload', e.target.files);
}
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): add renderStepColora() with gallery skeleton and stubs"
```

---

## Task 5: Wire `goToStep` per gestire lo step "colora"

**Files:**
- Modify: `js/wizard.js:352-373`

- [ ] **Step 1: Sostituire la funzione `goToStep`**

```javascript
function goToStep(n) {
  document.querySelectorAll('.wizard-step').forEach(s => {
    s.classList.remove('active');
    s.hidden = true;
  });

  // 'colora' è un id-string speciale, non un numero
  const targetId = (n === 'colora') ? 'step-colora' : `step${n}`;
  const target = document.getElementById(targetId);
  if (!target) return;
  target.hidden = false;
  target.classList.add('active');

  // step-bar dinamica
  updateStepBar(n);

  if (n === 1)             renderStep1();
  else if (n === 2)        renderStep2();
  else if (n === 3)        renderStep3();
  else if (n === 'colora') renderStepColora();
}
```

- [ ] **Step 2: Aggiungere `updateStepBar` subito sotto `goToStep`**

```javascript
function updateStepBar(n) {
  const bar = document.querySelector('.step-bar');
  if (!bar) return;
  const tipo = window.APP_STATE && window.APP_STATE.tipo;

  // configurazione step a seconda del tipo
  const config = (tipo === 'colora')
    ? [{ num: 1, label: 'Tipo' }, { num: 2, label: 'Disegno' }]
    : [{ num: 1, label: 'Tipo' }, { num: 2, label: 'Tema' }, { num: 3, label: 'Testi' }];

  // numero "corrente" come indice 1-based nella sequenza config
  let currentIdx;
  if (n === 1)             currentIdx = 1;
  else if (n === 'colora') currentIdx = 2;
  else                     currentIdx = n;

  bar.innerHTML = config.map((s, i) => {
    const isLast = i === config.length - 1;
    const stepNum = i + 1;
    const cls = stepNum < currentIdx ? 'step completed'
              : stepNum === currentIdx ? 'step active'
              : 'step';
    return `
      <div class="${cls}" data-step="${stepNum}">
        <span class="step-num">${stepNum}</span>
        <span class="step-label">${s.label}</span>
      </div>
      ${isLast ? '' : '<span class="step-line" aria-hidden="true"></span>'}
    `;
  }).join('');
}
```

- [ ] **Step 3: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output.

- [ ] **Step 4: Verifica nel browser**

Ricarica la pagina, vai a wizard, Step 1: il bottone "Avanti" è ancora collegato a `goToStep(2)`. Per ora non possiamo testare il branch colora finché non l'aggiungiamo (Task 6).
Verifica che gli altri tipi (Biglietto/Striscione/...) funzionino normalmente — la step-bar mostra 3 step.

- [ ] **Step 5: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): support 'colora' step in goToStep and dynamic step-bar"
```

---

## Task 6: Branching — Avanti da Step 1 va a 'colora' se tipo è colora

**Files:**
- Modify: `js/wizard.js:114`

- [ ] **Step 1: Sostituire il listener del bottone "Avanti" in renderStep1**

Cercare la riga 114 (`btnNext.addEventListener('click', () => goToStep(2));`) e sostituirla con:

```javascript
btnNext.addEventListener('click', () => {
  if (window.APP_STATE.tipo === 'colora') {
    goToStep('colora');
  } else {
    goToStep(2);
  }
});
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output.

- [ ] **Step 3: Verifica nel browser**

Ricarica, wizard → Step 1: seleziona "🎨 Colora", clicca "Avanti". Ora si apre lo step "Scegli un disegno da colorare", la step-bar mostra **2 step** (Tipo / Disegno) e il messaggio "Nessun disegno disponibile" (cartella vuota).
Verifica anche che gli altri tipi (Biglietto, etc.) vadano correttamente a Step 2.

- [ ] **Step 4: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): branch step 1 → step-colora when tipo='colora'"
```

---

## Task 7: Caricare un disegno dalla galleria → editor

**Files:**
- Modify: `js/wizard.js` (sostituire la stub `loadColoraDrawing`)

- [ ] **Step 1: Aggiungere le utility di parsing/validazione SVG e implementare `loadColoraDrawing`**

Sostituire la stub esistente (`function loadColoraDrawing(file) { console.log(...) }`) con:

```javascript
/**
 * Parsa una stringa SVG, estrae viewBox e orientamento,
 * marca l'elemento root con class="template-svg" pronto per l'editor.
 * @returns { svg: string, orientation: 'portrait'|'landscape', hasColorable: boolean } | null
 */
function prepareColoringSvg(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const parserError = doc.querySelector('parsererror');
  if (parserError) return null;
  const svg = doc.documentElement;
  if (!svg || svg.tagName.toLowerCase() !== 'svg') return null;

  const vb = svg.getAttribute('viewBox');
  if (!vb) return null;
  const parts = vb.trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isFinite(n))) return null;
  const [, , w, h] = parts;
  if (w <= 0 || h <= 0) return null;

  svg.classList.add('template-svg');

  const hasColorable = svg.querySelector('.colorable') !== null;
  const orientation = w > h ? 'landscape' : 'portrait';
  return {
    svg: new XMLSerializer().serializeToString(svg),
    orientation,
    hasColorable
  };
}

async function loadColoraDrawing(file) {
  if (!file) return;
  let svgText;
  try {
    const res = await fetch('colouring_pages/' + file, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    svgText = await res.text();
  } catch (err) {
    alert('Impossibile caricare il disegno: ' + err.message);
    return;
  }
  const prepared = prepareColoringSvg(svgText);
  if (!prepared) {
    alert('Disegno non valido — assicurati che l\'SVG abbia un viewBox valido.');
    return;
  }
  openColoraEditor(prepared);
}

function openColoraEditor(prepared) {
  window.APP_STATE.template = {
    nome: 'Colora',
    background: '#FFFFFF',
    svg: prepared.svg,
    isColoringPage: true,
    orientation: prepared.orientation,
    hasColorable: prepared.hasColorable
  };
  window.APP_STATE.testi = {};
  if (window.editor && typeof window.editor.init === 'function') {
    window.editor.init();
  }
}
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output.

- [ ] **Step 3: Test manuale**

L'editor non ancora gestisce il tipo `colora` per il sizing. Verifica nel frattempo che con un SVG di prova (vedi sotto) la galleria si popoli. Crea temporaneamente `colouring_pages/test.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect class="colorable" fill="#FFFFFF" x="20" y="20" width="160" height="160" />
  <rect fill="none" stroke="#000000" stroke-width="4" x="20" y="20" width="160" height="160" />
</svg>
```

E modifica temporaneamente `colouring_pages/index.json`:

```json
{ "drawings": [{ "file": "test.svg", "name": "Test", "category": "festa", "emoji": "🧪" }] }
```

Ricarica → wizard → Colora → vedi la card "🧪 Test". Cliccala: l'editor si apre con un canvas dalle dimensioni sbagliate (sarà fissato nel Task 8) ma il quadrato nero si vede. Riporta `index.json` a `{"drawings": []}` e cancella `test.svg` al termine del task.

- [ ] **Step 4: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): load gallery drawing as template and open editor"
```

---

## Task 8: Editor — supportare il sizing A4 per tipo `colora`

**Files:**
- Modify: `js/editor.js:278-294`

- [ ] **Step 1: Estendere il blocco "dimensione canvas" per gestire `tipo === 'colora'`**

Sostituire le righe 278-294 (il blocco `// 2. dimensione canvas: ...` fino a chiusura else con `canvas.classList.add('ratio-' + state.tipo)`):

```javascript
    // 2. dimensione canvas: classe ratio-* per i 4 tipi standard,
    //    'colora' (A4) con orientamento variabile, 'libero' con misura custom
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.className = '';
    if (state.tipo === 'libero') {
      const fs = state.freeSize || { w: 15, h: 10 };
      const ratio = fs.w / fs.h;
      canvas.style.width = `min(90vw, ${ratio * 600}px)`;
      canvas.style.aspectRatio = `${fs.w} / ${fs.h}`;
      canvas.style.maxWidth = 'none';
    } else if (state.tipo === 'colora') {
      canvas.style.width = '';
      canvas.style.aspectRatio = '';
      canvas.style.maxWidth = '';
      const orientation = (state.template && state.template.orientation) || 'portrait';
      canvas.classList.add('ratio-colora-' + orientation);
    } else {
      canvas.style.width = '';
      canvas.style.aspectRatio = '';
      canvas.style.maxWidth = '';
      canvas.classList.add(`ratio-${state.tipo}`);
    }
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/editor.js`
Expected: no output.

- [ ] **Step 3: Verifica nel browser**

Ricrea il file `colouring_pages/test.svg` e l'entry in `index.json` come nel Task 7. Apri wizard → Colora → click su Test: il canvas è ora un A4 verticale (rapporto 210:297). Crea anche un SVG di prova con viewBox 297×210 e verifica che si apra come A4 orizzontale.
Pulisci i file di test al termine.

- [ ] **Step 4: Commit**

```bash
git add js/editor.js
git commit -m "feat(editor): support A4 portrait/landscape sizing for tipo=colora"
```

---

## Task 9: Upload da PC — gestione del file selezionato

**Files:**
- Modify: `js/wizard.js` (sostituire la stub `handleColoraUpload`)

- [ ] **Step 1: Implementare `handleColoraUpload`**

Sostituire `function handleColoraUpload(e) { console.log(...) }` con:

```javascript
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_UPLOAD_EXTS = ['svg', 'png', 'jpg', 'jpeg', 'jfif'];

async function handleColoraUpload(e) {
  const input = e.target;
  const file = input.files && input.files[0];
  // resetto sempre il valore dell'input così l'utente può ricaricare lo stesso file
  input.value = '';
  if (!file) return;

  if (file.size > MAX_UPLOAD_BYTES) {
    alert('File troppo grande. Massimo 5 MB.');
    return;
  }
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!ALLOWED_UPLOAD_EXTS.includes(ext)) {
    alert('Formato non supportato. Usa SVG, PNG, JPG o JFIF.');
    return;
  }

  let prepared;
  if (ext === 'svg') {
    let svgText;
    try {
      svgText = await file.text();
    } catch (err) {
      alert('Impossibile leggere il file: ' + err.message);
      return;
    }
    prepared = prepareColoringSvg(svgText);
    if (!prepared) {
      alert('SVG non valido — assicurati che abbia un viewBox e nessun errore di sintassi.');
      return;
    }
  } else {
    // raster: leggo come dataURL e creo un SVG wrapper con viewBox = dimensione immagine
    try {
      prepared = await rasterFileToColoringSvg(file);
    } catch (err) {
      alert('Impossibile caricare l\'immagine: ' + err.message);
      return;
    }
  }
  openColoraEditor(prepared);
}

/**
 * Trasforma un file raster in un "coloring template": legge dimensioni
 * naturali, costruisce un SVG wrapper con viewBox W×H e un <image> con
 * dataURL come unico contenuto. Nessuna zona .colorable (solo pennello).
 */
function rasterFileToColoringSvg(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('errore di lettura del file'));
    reader.onload = () => {
      const dataUrl = reader.result;
      const img = new Image();
      img.onerror = () => reject(new Error('immagine non valida'));
      img.onload = () => {
        const w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) { reject(new Error('dimensioni immagine non valide')); return; }
        const orientation = w > h ? 'landscape' : 'portrait';
        const svg =
          `<svg class="template-svg" xmlns="http://www.w3.org/2000/svg" ` +
          `viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">` +
          `<image href="${dataUrl}" x="0" y="0" width="${w}" height="${h}" ` +
          `preserveAspectRatio="xMidYMid meet" />` +
          `</svg>`;
        resolve({ svg, orientation, hasColorable: false });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/wizard.js`
Expected: no output.

- [ ] **Step 3: Verifica nel browser**

Apri wizard → Colora → clicca "📁 Carica dal computer".
- Carica una PNG/JPG qualunque → l'editor si apre con l'immagine come sfondo. Il canvas è A4 con orientamento corrispondente all'aspect ratio dell'immagine.
- Carica un SVG con viewBox → si apre correttamente.
- Carica un file > 5MB → alert "File troppo grande".
- Carica un .txt → alert "Formato non supportato".
- Carica due volte la stessa immagine → riapre l'editor (l'input value viene resettato).

- [ ] **Step 4: Commit**

```bash
git add js/wizard.js
git commit -m "feat(wizard): file upload for colora — SVG and raster (PNG/JPG/JFIF)"
```

---

## Task 10: Disabilitare il secchiello quando il template è coloring senza `.colorable`

**Files:**
- Modify: `js/tools.js` (cercare l'init del color tool)

- [ ] **Step 1: Localizzare la funzione di init del color tool**

Run: `grep -n "color:" d:/Workspace/StudioMagico/js/tools.js | head -5`
Aspettati una struttura tipo `color: { init() { ... } }`.

- [ ] **Step 2: Dentro l'init del color tool, dopo aver creato i bottoni della toolbar**

Cercare il punto in cui viene creato il tab/bottone "Secchiello" e aggiungere subito DOPO la sua creazione:

```javascript
// disabilita il secchiello se siamo su un coloring page senza zone .colorable
const tpl = window.APP_STATE && window.APP_STATE.template;
if (tpl && tpl.isColoringPage && !tpl.hasColorable) {
  const bucketBtn = document.querySelector('[data-color-tab="bucket"]')
                 || document.getElementById('color-tab-bucket');
  if (bucketBtn) {
    bucketBtn.disabled = true;
    bucketBtn.title = 'Disponibile solo su disegni preparati con zone colorabili';
    bucketBtn.classList.add('tool-disabled');
  }
}
```

Se i selettori esatti per il bottone bucket sono diversi nel codice, cercarli con:
```
grep -n "secchiello\|bucket\|fill" d:/Workspace/StudioMagico/js/tools.js | head -20
```
e adattare il selettore al markup reale.

- [ ] **Step 3: Aggiungere la classe CSS `.tool-disabled` in `css/style.css`**

Aggiungere in fondo al file (o vicino agli stili dei `.tool-btn`):

```css
.tool-disabled,
.tool-btn.tool-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: auto; /* per il tooltip su hover */
}
```

- [ ] **Step 4: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/tools.js`
Expected: no output.

- [ ] **Step 5: Verifica nel browser**

- Apri wizard → Colora → carica una PNG. Apri lo strumento Colore: il tab "Secchiello" appare disabilitato (opacità ridotta, tooltip al passaggio).
- Carica un SVG con `.colorable`: il secchiello è attivo.
- Apri un Biglietto normale: il secchiello funziona come prima.

- [ ] **Step 6: Commit**

```bash
git add js/tools.js css/style.css
git commit -m "feat(tools): disable bucket tab when coloring page has no .colorable zones"
```

---

## Task 11: Brush canvas in `mix-blend-mode: multiply` per il coloring

**Files:**
- Modify: `js/editor.js` (dentro `initBrushCanvas` o subito dopo)

- [ ] **Step 1: Trovare la fine di `initBrushCanvas`**

Run: `grep -n "initBrushCanvas\|brush-canvas" d:/Workspace/StudioMagico/js/editor.js | head -10`

`initBrushCanvas` parte alla riga ~1469. Leggere il blocco di creazione del canvas (in particolare gli `style.*` applicati).

- [ ] **Step 2: Applicare `mix-blend-mode` al brush canvas in modalità colora**

Trovare dentro `initBrushCanvas` la sezione dove si imposta `brushCanvas.style.*` (subito dopo l'assegnazione di width/height). Aggiungere subito dopo questi style:

```javascript
const tpl = window.APP_STATE && window.APP_STATE.template;
if (tpl && tpl.isColoringPage) {
  brushCanvas.style.mixBlendMode = 'multiply';
} else {
  brushCanvas.style.mixBlendMode = '';
}
```

- [ ] **Step 3: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/editor.js`
Expected: no output.

- [ ] **Step 4: Verifica nel browser**

- Crea un SVG con contorni neri e regioni `.colorable`, mettilo in `colouring_pages/test.svg` e in `index.json`.
- Apri wizard → Colora → Test → modalità Pennello con colore brillante (es. rosa). Dipingi sopra una linea nera del disegno: la linea nera deve **restare visibile**.
- Pulisci i file di test.
- Apri un biglietto normale: dipingi col pennello, copre lo sfondo come prima (no multiply).

- [ ] **Step 5: Commit**

```bash
git add js/editor.js
git commit -m "feat(editor): apply mix-blend-mode multiply to brush canvas in colora mode"
```

---

## Task 12: Stampa — formato A4 corretto per il tipo `colora`

**Files:**
- Modify: `js/editor.js:1889-1908`

- [ ] **Step 1: Estendere `_injectPrintPageStyle` per il tipo `colora`**

Sostituire la funzione (righe 1889-1908):

```javascript
  _injectPrintPageStyle(tipo) {
    const SIZES = {
      biglietto:   'A5 landscape',
      striscione:  'A4 landscape',
      certificato: 'A4 portrait',
      segnalibro:  'A5 portrait'
    };
    let size = SIZES[tipo] || 'A4 portrait';
    if (tipo === 'libero') {
      const fs = (window.APP_STATE && window.APP_STATE.freeSize) || { w: 15, h: 10 };
      size = `${fs.w}cm ${fs.h}cm`;
    } else if (tipo === 'colora') {
      const orientation = (window.APP_STATE && window.APP_STATE.template
                           && window.APP_STATE.template.orientation) || 'portrait';
      size = orientation === 'landscape' ? 'A4 landscape' : 'A4 portrait';
    }
    let styleEl = document.getElementById('print-page-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'print-page-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `@page { size: ${size}; margin: 0; }`;
  },
```

- [ ] **Step 2: Verifica syntax**

Run: `node --check d:/Workspace/StudioMagico/js/editor.js`
Expected: no output.

- [ ] **Step 3: Verifica nel browser**

- Apri wizard → Colora → un disegno (o un upload), dipingi qualcosa, clicca "Stampa".
- Nella preview di stampa: orientamento A4 corretto, il disegno e i colori sono visibili, **le linee nere restano in primo piano** (multiply preservato).
- Test sia con orientamento portrait sia landscape.

Se il multiply non viene reso correttamente in stampa (alcuni browser hanno restrizioni), aggiungere `-webkit-print-color-adjust: exact;` e `print-color-adjust: exact;` su `#card-canvas` in `css/style.css`. Annotare nella checklist QA per verifica esplicita.

- [ ] **Step 4: Commit**

```bash
git add js/editor.js
git commit -m "feat(editor): print A4 portrait/landscape based on coloring orientation"
```

---

## Task 13: CSS della galleria, upload, e step-bar a 2 step

**Files:**
- Modify: `css/style.css` (aggiungere in fondo)

- [ ] **Step 1: Aggiungere blocco CSS in fondo al file**

```css
/* ===== Sezione COLORA — galleria, upload, step-bar 2 step ===== */
#step-colora {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 80px;
}

.colora-loading,
.colora-empty {
  text-align: center;
  color: #6c5b8a;
  font-size: 16px;
  padding: 32px 16px;
}
.colora-empty {
  background: #FFF8F0;
  border: 2px dashed #E0CFF7;
  border-radius: 16px;
}

.colora-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
}
.colora-filter {
  background: #FFF;
  border: 2px solid #E0CFF7;
  color: #6c5b8a;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  font: 600 14px 'Quicksand', sans-serif;
  transition: all 0.15s ease;
}
.colora-filter:hover { background: #F4ECFF; }
.colora-filter.active {
  background: linear-gradient(135deg, #FF6B9D, #C77DFF);
  border-color: transparent;
  color: #FFF;
}

.colora-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.colora-card {
  background: #FFF;
  border: 3px solid #E0CFF7;
  border-radius: 16px;
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.colora-card:hover,
.colora-card:focus-visible {
  transform: translateY(-4px);
  border-color: #C77DFF;
  box-shadow: 0 8px 20px rgba(199, 125, 255, 0.25);
  outline: none;
}
.colora-card-emoji { font-size: 42px; line-height: 1; }
.colora-card-name {
  font: 600 14px 'Baloo 2', sans-serif;
  color: #2A2438;
  text-align: center;
}

.colora-upload-row {
  display: flex;
  justify-content: center;
  margin: 28px 0 8px;
}
#btn-colora-upload {
  font-size: 16px;
  padding: 12px 22px;
}

/* Mobile */
@media (max-width: 600px) {
  .colora-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  .colora-card { padding: 12px 8px; }
  .colora-card-emoji { font-size: 32px; }
  .colora-card-name { font-size: 13px; }
}
```

- [ ] **Step 2: Verifica visuale**

Ricarica il browser, vai a wizard → Colora. Verifica:
- Galleria centrata e con buon padding
- Card disegni in griglia responsive, hover ed emoji visibili
- Filtri categoria stilati (pill button)
- Bottone "Carica dal computer" ben visibile e cliccabile
- Su mobile (DevTools → 375px) la griglia si adatta a 2-3 colonne

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "style(colora): gallery, filters, cards, upload button, mobile responsive"
```

---

## Task 14: Salva bozza e Salva template — funzionamento in modalità colora

**Files:**
- Read: `js/editor.js` (sezioni di salvataggio bozza/template)

- [ ] **Step 1: Leggere le funzioni di salvataggio bozza e template**

Run:
```
grep -n "saveDraft\|saveTemplate\|snapshot\|isUserTemplate" d:/Workspace/StudioMagico/js/editor.js | head -30
```

Identificare le funzioni che serializzano `state.template` e i punti in cui viene letto `template.svg`.

- [ ] **Step 2: Verificare che `state.template.svg` venga già serializzato nelle bozze**

Le funzioni di salvataggio bozza in Studio Magico già serializzano interamente `APP_STATE.template`, quindi `svg`, `isColoringPage`, `orientation`, `hasColorable` vengono salvati automaticamente. Verificare nel codice: nessuna modifica richiesta in caso positivo.

Se la serializzazione filtra solo certi campi (es. salva `nome` e `background` ma non `svg`), aggiornare lo schema di serializzazione per includere anche `svg`, `isColoringPage`, `orientation`, `hasColorable`.

- [ ] **Step 3: Verifica nel browser**

- Apri wizard → Colora → un disegno → dipingi qualcosa → "Salva bozza".
- Riavvia la pagina → menu → "Riprendi bozza" → seleziona la bozza salvata. L'editor si riapre nello stato corretto: il disegno è di nuovo lo sfondo, il pennello è ancora multiply, i tratti dipinti sono ripristinati.
- Stesso test per "Salva template" e "I miei template" (se applicabile alla modalità colora).

- [ ] **Step 4: Commit (solo se sono state fatte modifiche)**

```bash
git add js/editor.js
git commit -m "feat(editor): persist coloring template fields in drafts and user templates"
```

Se nessuna modifica era necessaria, saltare il commit e proseguire.

---

## Task 15: Manual QA — esecuzione completa della test plan

**Files:** nessuna modifica al codice (solo verifica)

- [ ] **Step 1: Eseguire la checklist completa dalla spec**

Aprire `docs/superpowers/specs/2026-05-17-colora-section-design.md`, sezione **Test plan (manuale)**. Eseguire **ogni** singolo checkbox e annotare eventuali fallimenti.

Categorie da coprire:
- Wizard flow (5 check)
- Galleria (4 check)
- Carica da PC (7 check)
- Canvas A4 e orientamento (3 check)
- Coloring (5 check)
- Stampa e salvataggio (4 check)
- Responsive (2 check)

- [ ] **Step 2: Se trovi bug**

Per ogni bug:
1. Creare una nuova mini-task in coda al piano
2. Fixarlo
3. Riverificare il singolo checkbox della test plan
4. Commit con `fix(...)` appropriato

- [ ] **Step 3: Quando tutta la test plan è verde**

Procedere a Task 16.

---

## Task 16: Convertire i 2 file raster esistenti (utente fa offline)

**Files:**
- Delete: `colouring_pages/palloncini.png`
- Delete: `colouring_pages/torta1.jfif`
- Create: `colouring_pages/palloncini.svg` (a cura dell'utente, offline)
- Create: `colouring_pages/torta.svg` (a cura dell'utente, offline)
- Modify: `colouring_pages/index.json`

- [ ] **Step 1: L'utente prepara gli SVG offline**

Seguendo la guida in `colouring_pages/README.md`, l'utente:
1. Apre i due raster in Inkscape
2. Vettorizza (Tracciato → Vettorizza bitmap)
3. Aggiunge `class="colorable"` ai path delle regioni interne
4. Salva come SVG ottimizzato

- [ ] **Step 2: Aggiornare `colouring_pages/index.json`**

Quando i due SVG sono pronti:

```json
{
  "drawings": [
    { "file": "palloncini.svg", "name": "Palloncini", "category": "festa", "emoji": "🎈" },
    { "file": "torta.svg",       "name": "Torta",      "category": "festa", "emoji": "🎂" }
  ]
}
```

- [ ] **Step 3: Eliminare i raster originali**

```bash
git rm colouring_pages/palloncini.png colouring_pages/torta1.jfif
```

- [ ] **Step 4: Verifica nel browser**

Wizard → Colora → galleria mostra "🎈 Palloncini" e "🎂 Torta" filtrabili con "Festa". Cliccando uno dei due, il secchiello funziona sulle regioni interne, le linee nere restano sopra.

- [ ] **Step 5: Commit**

```bash
git add colouring_pages/
git commit -m "feat(colouring_pages): replace raster placeholders with curated SVG drawings"
```

---

## Task 17: Aggiornare MEMORY.md e claude-mem

**Files:**
- Modify: `C:\Users\Mara\.claude\projects\d--Workspace-StudioMagico\memory\MEMORY.md`
- Action: salvare in claude-mem un'osservazione sintesi

- [ ] **Step 1: Aggiungere a MEMORY.md eventuali decisioni durature emerse**

Esempi candidati (solo se non già coperti dal codice o dal README):
- "Coloring page convention: SVG con .colorable per regioni, contorni dopo nello z-order"
- "Brush canvas usa mix-blend-mode: multiply quando template.isColoringPage"

Lo standard formato è quello in `MEMORY.md` (vedi `feedback_lint_before_commit.md` come esempio di struttura).

- [ ] **Step 2: Salvare in claude-mem una sintesi del lavoro**

Una sola osservazione di tipo `S<num>` con titolo del tipo:
> "Implementazione sezione Colora nel wizard: 5° tipo + galleria SVG + upload PC + A4 A/orizzontale + multiply blend per linee nere"

- [ ] **Step 3: Commit di MEMORY.md (se modificato)**

```bash
git add ../../.claude/projects/d--Workspace-StudioMagico/memory/
git commit -m "docs(memory): record coloring page conventions and multiply blend decision"
```

---

## Self-Review (pre-execution)

**Spec coverage:**
- ✅ 5° tipo "Colora" in wizard Step 1 → Task 1
- ✅ Step "Scegli disegno" con galleria e filtri → Tasks 3, 4
- ✅ Step-bar dinamica 2 step per colora → Task 5
- ✅ Branching da Step 1 → Task 6
- ✅ Caricamento SVG dalla cartella + manifest → Tasks 4, 7
- ✅ Carica da PC (SVG + raster) → Task 9
- ✅ A4 portrait/landscape sizing → Tasks 2, 8
- ✅ `mix-blend-mode: multiply` su brush canvas → Task 11
- ✅ Secchiello disabilitato senza `.colorable` → Task 10
- ✅ Stampa con orientamento corretto → Task 12
- ✅ Salva bozza/template → Task 14
- ✅ Empty state galleria → Task 4 (gestito da `renderColoraGallery`)
- ✅ Validazione SVG (viewBox, parse errors) → Tasks 7, 9
- ✅ Limite 5MB e formati ammessi → Task 9
- ✅ CSS galleria + mobile → Task 13
- ✅ Test manuali full → Task 15
- ✅ Conversione raster esistenti → Task 16
- ✅ Update memoria → Task 17

**Placeholder scan:** Tutti i blocchi di codice sono completi e copia-incollabili. Nessun "TBD" o "implement later" lasciato indietro.

**Type/naming consistency:** I campi del template colora (`isColoringPage`, `orientation`, `hasColorable`) sono usati con esattamente gli stessi nomi in `openColoraEditor` (Task 7), `initBrushCanvas` (Task 11), color tool init (Task 10), `_injectPrintPageStyle` (Task 12), sizing canvas (Task 8). `prepareColoringSvg` e `rasterFileToColoringSvg` restituiscono lo stesso shape `{ svg, orientation, hasColorable }`.

**Selettori incerti** (annotati per attenzione in esecuzione): nel Task 10 il selettore del bottone secchiello (`[data-color-tab="bucket"]` o `#color-tab-bucket`) potrebbe non corrispondere al markup reale di `tools.js`. Il task include esplicitamente l'istruzione di verificare con `grep` e adattare.
