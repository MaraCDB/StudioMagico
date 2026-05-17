/* =======================================================
   Studio Magico — Editor
   ======================================================= */

/**
 * Layout di testo per ciascun tipo di creazione.
 * Ogni voce descrive dove e come posizionare un campo
 * compilato nello step 3 all'interno del canvas.
 *
 * I valori di font-size usano clamp() così da scalare
 * bene con la dimensione del canvas (che ha max-width
 * variabile per tipo).
 */
const TEXT_LAYOUTS = {
  biglietto: [
    {
      field: 'a_chi',
      prefix: 'Per ',
      style: {
        top: '14%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        fontSize: 'clamp(20px, 4.2vw, 38px)',
        fontWeight: '800',
        color: 'white',
        textShadow: '0 3px 10px rgba(0,0,0,0.18)'
      }
    },
    {
      field: 'messaggio',
      style: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '78%',
        fontSize: 'clamp(14px, 2.7vw, 22px)',
        fontWeight: '500',
        color: 'white',
        lineHeight: '1.45',
        textShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }
    },
    {
      field: 'firma',
      style: {
        bottom: '12%',
        right: '8%',
        maxWidth: '50%',
        fontSize: 'clamp(14px, 2.4vw, 22px)',
        fontWeight: '700',
        color: 'white',
        fontStyle: 'italic',
        textShadow: '0 2px 8px rgba(0,0,0,0.18)',
        textAlign: 'right'
      }
    }
  ],

  striscione: [
    {
      field: 'principale',
      style: {
        top: '38%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '92%',
        fontSize: 'clamp(28px, 7.5vw, 72px)',
        fontWeight: '800',
        color: 'white',
        letterSpacing: '-1px',
        textShadow: '0 4px 14px rgba(0,0,0,0.22)'
      }
    },
    {
      field: 'secondario',
      style: {
        top: '72%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '88%',
        fontSize: 'clamp(14px, 3vw, 26px)',
        fontWeight: '600',
        color: 'white',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }
    }
  ],

  certificato: [
    {
      field: 'premiato',
      style: {
        top: '32%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        fontSize: 'clamp(22px, 5vw, 40px)',
        fontWeight: '800',
        color: '#2A2438',
        letterSpacing: '-0.5px'
      }
    },
    {
      field: 'motivazione',
      style: {
        top: '52%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '78%',
        fontSize: 'clamp(13px, 2.4vw, 18px)',
        fontWeight: '500',
        color: '#2A2438',
        lineHeight: '1.5',
        opacity: '0.85'
      }
    },
    {
      field: 'firmato_da',
      prefix: '— ',
      style: {
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        fontSize: 'clamp(13px, 2.2vw, 18px)',
        fontWeight: '600',
        color: '#2A2438',
        fontStyle: 'italic',
        opacity: '0.8'
      }
    }
  ],

  segnalibro: [
    {
      field: 'nome',
      style: {
        top: '7%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        fontSize: 'clamp(15px, 3.8vw, 22px)',
        fontWeight: '800',
        color: 'white',
        textShadow: '0 2px 8px rgba(0,0,0,0.22)',
        letterSpacing: '0.5px'
      }
    },
    {
      field: 'frase',
      style: {
        bottom: '9%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '84%',
        fontSize: 'clamp(11px, 2.6vw, 14px)',
        fontWeight: '500',
        color: 'white',
        fontStyle: 'italic',
        lineHeight: '1.5',
        textShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }
    }
  ]
};

window.editor = {
  /**
   * Avvia l'editor: nasconde il wizard, mostra il canvas
   * con il template scelto e i testi inseriti.
   */
  init() {
    const state = window.APP_STATE;
    if (!state || !state.tipo || !state.template) {
      console.warn('[editor] stato incompleto, impossibile avviare.');
      return;
    }

    // assicura che lo stato degli sticker esista
    if (!Array.isArray(state.stickers)) {
      state.stickers = [];
    }

    // assicura che lo stato dei testi liberi esista
    if (!Array.isArray(state.textElements)) {
      state.textElements = [];
    }
    if (!state.currentTextSettings) {
      state.currentTextSettings = {
        font: 'Baloo 2',
        size: 24,
        color: '#2A2438',
        bold: false,
        italic: false
      };
    }
    state.selectedTextId = null;

    // assicura che lo stato dei tape esista
    if (!Array.isArray(state.tapes)) {
      state.tapes = [];
    }
    if (typeof state.currentTapeType !== 'number') {
      state.currentTapeType = 0;
    }
    state.tapeInProgress = null;

    // assicura che lo stato di colore/pennello esista
    if (!state.coloredZones || typeof state.coloredZones !== 'object') {
      state.coloredZones = {};
    }
    if (!Array.isArray(state.brushStrokes)) {
      state.brushStrokes = [];
    }
    if (typeof state.currentColor !== 'string') {
      state.currentColor = '#FF6B9D';
    }
    if (typeof state.currentBrushSize !== 'number') {
      state.currentBrushSize = 10;
    }

    // assicura che gli stack di undo/redo esistano (max 30 snapshot per stack)
    if (!Array.isArray(state.undoStack)) {
      state.undoStack = [];
    }
    if (!Array.isArray(state.redoStack)) {
      state.redoStack = [];
    }

    // se il template scelto è un template utente, sovrascrivi lo stato
    // con lo snapshot salvato (sticker, testi liberi, tape, zone colorate).
    // I campi testo dello step 3 vengono ignorati: il template ha già
    // i suoi elementi testo.
    // ECCEZIONE: se arriviamo da una bozza ripristinata, lo stato è già
    // popolato con le modifiche dell'utente — NON ricaricare lo snapshot.
    if (!state._restoredFromDraft && state.template && state.template.isUserTemplate &&
        state.template.snapshot && typeof state.template.snapshot === 'object') {
      const snap = state.template.snapshot;
      state.stickers     = JSON.parse(JSON.stringify(snap.stickers     || []));
      state.textElements = JSON.parse(JSON.stringify(snap.textElements || []));
      state.tapes        = JSON.parse(JSON.stringify(snap.tapes        || []));
      state.coloredZones = JSON.parse(JSON.stringify(snap.coloredZones || {}));
      state.testi = {};
      state.selectedTextId = null;
      state.tapeInProgress = null;
    }
    // consuma il flag (non deve persistere oltre questa init)
    delete state._restoredFromDraft;

    // intercetta i push diretti su tapes e brushStrokes (fatti da tools.js)
    // per registrare uno snapshot prima della mutazione
    this._patchArrayPush(state.tapes);
    this._patchArrayPush(state.brushStrokes);

    // classe sul body per ricetta @page stampa + iniezione regola @page
    document.body.classList.remove(
      'print-biglietto', 'print-striscione',
      'print-certificato', 'print-segnalibro', 'print-libero'
    );
    document.body.classList.add('print-' + state.tipo);
    this._injectPrintPageStyle(state.tipo);

    // body mode: editor da wizard vs editor da "crea libero"
    document.body.classList.remove(
      'mode-menu', 'mode-wizard', 'mode-free',
      'mode-editor-wizard', 'mode-editor-free',
      'mode-my-tpls', 'mode-drafts'
    );
    document.body.classList.add(state.freeMode ? 'mode-editor-free' : 'mode-editor-wizard');

    // 1. nascondi wizard, mostra editor
    const wizard = document.getElementById('wizard');
    const editorEl = document.getElementById('editor');
    if (wizard) wizard.hidden = true;
    if (editorEl) editorEl.hidden = false;

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

    // 3. iniezione dell'SVG del template come sfondo del canvas
    //    (oppure fallback al background CSS se l'svg non è disponibile)
    this._installTemplateBackground();

    // 4. renderizza i testi (zone SVG se presenti, altrimenti TEXT_LAYOUTS)
    this.renderTexts();

    // 4-bis. converti i testi del wizard in elementi testo editabili
    //        (così l'utente può modificarli/spostarli nell'editor)
    this._materializeWizardTexts();

    // 5. renderizza gli sticker già presenti nello stato
    this.renderStickers();

    // 6. renderizza eventuali testi liberi già presenti nello stato
    this.renderTextElements();

    // 7. renderizza i tape già presenti nello stato
    this.renderTapes();

    // 8. (rimosso) forme colorabili di test — ora vengono dal template SVG

    // 9. riapplica i colori salvati alle zone colorabili
    this.applyColoredZones();

    // 10. crea il canvas del pennello in cima al biglietto
    this.initBrushCanvas();

    // 11. click sul canvas vuoto: crea testo (se tool attivo) o deseleziona
    this._attachCanvasClickHandler();

    // 12. barra step: tutti completati
    document.querySelectorAll('.step-bar .step').forEach(s => {
      s.classList.remove('active');
      s.classList.add('completed');
    });

    // 13. inizializza gli strumenti (idempotente)
    if (window.tools && window.tools.sticker && typeof window.tools.sticker.init === 'function') {
      window.tools.sticker.init();
    }
    if (window.tools && window.tools.text && typeof window.tools.text.init === 'function') {
      window.tools.text.init();
    }
    if (window.tools && window.tools.tape && typeof window.tools.tape.init === 'function') {
      window.tools.tape.init();
    }
    if (window.tools && window.tools.color && typeof window.tools.color.init === 'function') {
      window.tools.color.init();
    }
    if (window.tools && window.tools.background && typeof window.tools.background.init === 'function') {
      window.tools.background.init();
    }

    // 14. bottoni Undo / Cancella tutto / Stampa (dopo i tools, perché
    //     sticker.init() svuota la toolbar quando si re-inizializza)
    this._setupActionButtons();

    // 15. shortcut Ctrl+Z → undo (idempotente)
    this._attachUndoShortcut();

    // scroll all'inizio dell'editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Genera i div di testo dentro #card-canvas in base
   * al tipo e ai valori inseriti nello step 3.
   */
  renderTexts() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    // rimuove solo i testi del wizard, preservando sticker, testi liberi,
    // tape, SVG template, forme colorabili e #brush-canvas
    canvas.querySelectorAll('.canvas-text').forEach(el => el.remove());

    // se è presente un SVG template con zone data-text-zone, posiziona
    // i testi dentro le rispettive zone; altrimenti fallback a TEXT_LAYOUTS
    const svg = canvas.querySelector('svg.template-svg');
    const zones = svg ? svg.querySelectorAll('[data-text-zone]') : [];
    if (svg && zones.length > 0) {
      this._renderTextsInSvgZones(svg, zones);
    } else {
      this._renderTextsByLayout();
    }
  },

  /**
   * Converte i testi inseriti dal wizard (rendererizzati come
   * .canvas-text statici) in elementi testo liberi editabili
   * (.text-el con drag-handle, contenteditable, font/size/color
   * modificabili dal pannello).
   *
   * Idempotente: dopo la prima esecuzione svuota state.testi e
   * marca state.wizardTextsMaterialized così che ulteriori init()
   * (es. re-render da undo) non duplichino gli elementi.
   *
   * Posizione, font-size, colore e peso vengono letti dagli stili
   * computati dei .canvas-text (così sia la modalità "layout legacy"
   * che la modalità "SVG zone" producono coordinate coerenti).
   * @private
   */
  _materializeWizardTexts() {
    const state = window.APP_STATE;
    if (!state || state.wizardTextsMaterialized) return;

    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    const canvasTexts = canvas.querySelectorAll('.canvas-text');
    if (canvasTexts.length === 0) return;

    const canvasRect = canvas.getBoundingClientRect();
    if (!canvasRect.width || !canvasRect.height) return;

    if (!Array.isArray(state.textElements)) state.textElements = [];

    const defaultFont = state.font || 'Baloo 2';

    canvasTexts.forEach((el, idx) => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // top-left in percentuale del canvas (coerente con il modello
      // di .text-el, che ancora il box top-left a (data.x%, data.y%))
      const xPct = ((rect.left - canvasRect.left) / canvasRect.width) * 100;
      const yPct = ((rect.top  - canvasRect.top)  / canvasRect.height) * 100;

      const size = Math.round(parseFloat(cs.fontSize) || 24);
      const family = (cs.fontFamily || '').split(',')[0].replace(/['"]/g, '').trim();
      const weightNum = parseInt(cs.fontWeight, 10);
      const bold = !isNaN(weightNum) ? weightNum >= 600 : /bold/i.test(cs.fontWeight || '');
      const italic = (cs.fontStyle || '').toLowerCase() === 'italic';
      const color = cs.color || '#2A2438';

      const id = 'tx_' + Date.now().toString(36) + '_' + idx + '_' +
                 Math.random().toString(36).slice(2, 6);

      state.textElements.push({
        id,
        x: xPct,
        y: yPct,
        testo: el.textContent || '',
        font: family || defaultFont,
        size,
        color,
        bold,
        italic
      });
    });

    // rimuovi i .canvas-text statici: ora i loro contenuti vivono
    // in state.textElements e verranno renderizzati come .text-el
    canvasTexts.forEach(el => el.remove());

    // svuota i campi testo del wizard così che renderTexts() (chiamato
    // da renderAll) non li ridipinga, e marca lo stato come materializzato
    state.testi = {};
    state.wizardTextsMaterialized = true;
  },

  /**
   * Renderizza i testi del wizard secondo TEXT_LAYOUTS (modalità
   * "legacy", per template senza SVG / senza zone data-text-zone).
   * @private
   */
  _renderTextsByLayout() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    const { tipo, testi, font } = window.APP_STATE;
    const layout = TEXT_LAYOUTS[tipo] || [];

    layout.forEach(item => {
      const raw = (testi && testi[item.field]) || '';
      const value = raw.trim();
      if (!value) return;

      const el = document.createElement('div');
      el.className = 'canvas-text';
      el.textContent = (item.prefix || '') + value;
      el.style.fontFamily = `'${font}', 'Baloo 2', sans-serif`;

      Object.entries(item.style).forEach(([prop, val]) => {
        el.style[prop] = val;
      });

      canvas.appendChild(el);
    });
  },

  /**
   * Renderizza i testi del wizard dentro le zone data-text-zone
   * dell'SVG template. Ogni zona può ospitare uno o più campi
   * (separati da "|"), che vengono impilati verticalmente e
   * centrati orizzontalmente nel rect.
   * @private
   */
  _renderTextsInSvgZones(svg, zones) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width || !vb.height) return;
    const vbW = vb.width, vbH = vb.height;

    const { tipo, testi, font } = window.APP_STATE;
    const layoutList = TEXT_LAYOUTS[tipo] || [];

    zones.forEach(zone => {
      const fields = (zone.getAttribute('data-text-zone') || '')
        .split('|').map(s => s.trim()).filter(Boolean);
      if (fields.length === 0) return;

      const x = parseFloat(zone.getAttribute('x')) || 0;
      const y = parseFloat(zone.getAttribute('y')) || 0;
      const w = parseFloat(zone.getAttribute('width'))  || vbW;
      const h = parseFloat(zone.getAttribute('height')) || vbH;

      // raccoglie i campi non vuoti con la rispettiva style del layout
      const items = fields.map(f => {
        const raw = (testi && testi[f]) || '';
        const value = raw.trim();
        if (!value) return null;
        const layoutEntry = layoutList.find(L => L.field === f);
        return {
          field: f,
          value: (layoutEntry && layoutEntry.prefix ? layoutEntry.prefix : '') + value,
          style: this._textStyleForSvgZone(layoutEntry)
        };
      }).filter(Boolean);
      if (items.length === 0) return;

      // distribuisce verticalmente i campi nella zona
      const slotH = h / items.length;
      items.forEach((item, i) => {
        const slotCenterY = y + slotH * i + slotH / 2;
        const xPct = (x + w / 2) / vbW * 100;
        const yPct = slotCenterY / vbH * 100;
        const wPct = (w * 0.92)  / vbW * 100;

        const el = document.createElement('div');
        el.className = 'canvas-text';
        el.textContent = item.value;
        el.style.position = 'absolute';
        el.style.left = xPct + '%';
        el.style.top  = yPct + '%';
        el.style.transform = 'translate(-50%, -50%)';
        el.style.width = wPct + '%';
        el.style.textAlign = 'center';
        el.style.fontFamily = `'${font}', 'Baloo 2', sans-serif`;
        Object.entries(item.style).forEach(([prop, val]) => {
          el.style[prop] = val;
        });
        canvas.appendChild(el);
      });
    });
  },

  /**
   * Costruisce lo stile (font-size, weight, italic, ecc.) per un
   * testo posizionato in una zona SVG. Riusa lo stile di
   * TEXT_LAYOUTS rimuovendo le proprietà di posizione e adattando
   * il colore al fondo bianco-trasparente delle zone.
   * @private
   */
  _textStyleForSvgZone(layoutEntry) {
    const base = {
      fontSize: 'clamp(14px, 2.6vw, 22px)',
      fontWeight: '500',
      color: '#2A2438',
      lineHeight: '1.3',
      textShadow: '0 1px 2px rgba(255,255,255,0.55)'
    };
    if (!layoutEntry || !layoutEntry.style) return base;
    const POSITIONAL = new Set([
      'top', 'bottom', 'left', 'right',
      'transform', 'width', 'maxWidth', 'textAlign'
    ]);
    const out = {};
    Object.entries(layoutEntry.style).forEach(([k, v]) => {
      if (POSITIONAL.has(k)) return;
      out[k] = v;
    });
    // sulle zone bianche-trasparenti il colore scuro è più leggibile
    out.color = '#2A2438';
    out.textShadow = '0 1px 2px rgba(255,255,255,0.55)';
    if (!out.lineHeight) out.lineHeight = '1.3';
    if (!out.fontWeight) out.fontWeight = '500';
    if (!out.fontSize)   out.fontSize   = 'clamp(14px, 2.6vw, 22px)';
    return out;
  },

  /**
   * Inietta nello #card-canvas l'SVG del template (se presente),
   * altrimenti applica il background CSS come fallback. Rimuove
   * eventuali SVG template precedenti.
   * @private
   */
  _installTemplateBackground() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    const tpl = window.APP_STATE && window.APP_STATE.template;
    if (!tpl) return;

    // rimuovi eventuali svg template precedenti (idempotente)
    canvas.querySelectorAll('svg.template-svg').forEach(el => el.remove());

    if (tpl.svg && typeof tpl.svg === 'string' && tpl.svg.trim()) {
      // modalità SVG: niente background CSS, SVG come sfondo
      canvas.style.background = '';
      // l'SVG va inserito come PRIMO figlio così sta dietro a tutto il resto
      canvas.insertAdjacentHTML('afterbegin', tpl.svg);
      const svg = canvas.querySelector('svg.template-svg');
      if (svg) {
        svg.style.position = 'absolute';
        svg.style.inset = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.zIndex = '0';
        svg.style.pointerEvents = 'none';
        // le forme .colorable devono comunque catturare il click
        svg.querySelectorAll('.colorable').forEach(el => {
          el.style.pointerEvents = 'auto';
        });
        // memorizza i fill originali per il futuro reset (undo/clearAll)
        this._captureOriginalFills();
      }
    } else {
      // fallback al gradiente CSS
      canvas.style.background = tpl.background || '';
    }
  },

  /* =====================================================
     STICKER — aggiungi / rimuovi / drag
     ===================================================== */

  /**
   * Aggiunge uno sticker al canvas e allo stato.
   * Chiamata da tools.js quando l'utente clicca un emoji.
   */
  addSticker(emoji) {
    if (!emoji) return;
    this.saveSnapshot();
    if (!Array.isArray(window.APP_STATE.stickers)) {
      window.APP_STATE.stickers = [];
    }
    const id = 'sk_' + Date.now().toString(36) + '_' +
               Math.random().toString(36).slice(2, 7);
    const data = { id, emoji, x: 45, y: 45 };
    window.APP_STATE.stickers.push(data);
    this._createStickerEl(data);
  },

  /**
   * Rimuove gli sticker dal DOM e li ricrea a partire da
   * APP_STATE.stickers[]. Utile per undo/redo futuri.
   */
  renderStickers() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.sticker-el').forEach(el => el.remove());
    const list = Array.isArray(window.APP_STATE.stickers)
      ? window.APP_STATE.stickers
      : [];
    list.forEach(data => this._createStickerEl(data));
  },

  /**
   * Crea il div sticker e collega drag, hover-X e dblclick.
   * @private
   */
  _createStickerEl(data) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return null;

    const el = document.createElement('div');
    el.className = 'sticker-el';
    el.dataset.id = data.id;
    el.style.position = 'absolute';
    el.style.fontSize = '48px';
    el.style.left = data.x + '%';
    el.style.top = data.y + '%';
    el.textContent = data.emoji;

    // bottone X (compare in hover via CSS)
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('mousedown', (e) => {
      // evita che il mousedown sulla X avvii il drag
      e.stopPropagation();
    });
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._removeSticker(data.id);
    });
    el.appendChild(removeBtn);

    // drag
    this._attachDrag(el, data);

    // doppio click rimuove
    el.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this._removeSticker(data.id);
    });

    canvas.appendChild(el);
    return el;
  },

  /**
   * Collega gli handler di drag a uno sticker. Aggiorna
   * left/top in % rispetto al canvas, clampando ai bordi.
   * @private
   */
  _attachDrag(el, data) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    let dragging = false;
    let startMouseX = 0, startMouseY = 0;
    let startX = 0, startY = 0;
    let canvasW = 0, canvasH = 0;
    let stickerWPct = 0, stickerHPct = 0;

    const onMouseDown = (e) => {
      // ignora se il click parte dalla X
      if (e.target && e.target.classList && e.target.classList.contains('remove-btn')) {
        return;
      }
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;
      const sRect = el.getBoundingClientRect();
      stickerWPct = (sRect.width / canvasW) * 100;
      stickerHPct = (sRect.height / canvasH) * 100;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startX = data.x;
      startY = data.y;
      dragging = true;
      el.classList.add('dragging');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      const dxPct = canvasW ? (dx / canvasW) * 100 : 0;
      const dyPct = canvasH ? (dy / canvasH) * 100 : 0;
      let newX = startX + dxPct;
      let newY = startY + dyPct;
      // impedisci di uscire dai bordi
      const maxX = Math.max(0, 100 - stickerWPct);
      const maxY = Math.max(0, 100 - stickerHPct);
      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));
      el.style.left = newX + '%';
      el.style.top = newY + '%';
      data.x = newX;
      data.y = newY;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    el.addEventListener('mousedown', onMouseDown);
  },

  /**
   * Rimuove uno sticker dal DOM e dallo stato.
   * @private
   */
  _removeSticker(id) {
    this.saveSnapshot();
    const canvas = document.getElementById('card-canvas');
    if (canvas) {
      const el = canvas.querySelector(`.sticker-el[data-id="${id}"]`);
      if (el) el.remove();
    }
    if (Array.isArray(window.APP_STATE.stickers)) {
      window.APP_STATE.stickers = window.APP_STATE.stickers.filter(s => s.id !== id);
    }
  },

  /* =====================================================
     TESTI LIBERI — aggiungi / sposta / modifica / rimuovi
     ===================================================== */

  /**
   * Crea un nuovo elemento di testo libero alle coordinate
   * espresse in percentuale rispetto al canvas.
   * Chiamato da tools.js quando il tool testo è attivo e
   * l'utente clicca sul canvas.
   */
  addTextElement(x, y) {
    this.saveSnapshot();
    if (!Array.isArray(window.APP_STATE.textElements)) {
      window.APP_STATE.textElements = [];
    }
    const settings = window.APP_STATE.currentTextSettings || {
      font: 'Baloo 2', size: 24, color: '#2A2438', bold: false, italic: false
    };
    const id = 'tx_' + Date.now().toString(36) + '_' +
               Math.random().toString(36).slice(2, 7);
    const data = {
      id,
      x: typeof x === 'number' ? x : 45,
      y: typeof y === 'number' ? y : 45,
      testo: '',
      font: settings.font,
      size: settings.size,
      color: settings.color,
      bold: !!settings.bold,
      italic: !!settings.italic
    };
    window.APP_STATE.textElements.push(data);
    this._createTextEl(data);
    this.selectTextElement(id);
  },

  /**
   * Ricrea tutti gli elementi testo dal DOM a partire dallo
   * stato. Utile a init() per ripristinare la situazione.
   */
  renderTextElements() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.text-el').forEach(el => el.remove());
    const list = Array.isArray(window.APP_STATE.textElements)
      ? window.APP_STATE.textElements
      : [];
    list.forEach(data => this._createTextEl(data));
  },

  /**
   * Aggiorna nello stato e nel DOM l'elemento testo
   * attualmente selezionato. Chiamato dai controlli del
   * pannello quando cambiano font/size/color/bold/italic.
   */
  updateSelectedTextElement(partial) {
    const id = window.APP_STATE.selectedTextId;
    if (!id) return;
    const data = (window.APP_STATE.textElements || []).find(t => t.id === id);
    if (!data) return;
    Object.assign(data, partial);
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    const el = canvas.querySelector(`.text-el[data-id="${id}"]`);
    if (!el) return;
    const content = el.querySelector('.text-content');
    if (content) this._applyTextStyles(content, data);
  },

  /**
   * Imposta selectedTextId, evidenzia l'elemento nel DOM,
   * sincronizza currentTextSettings e il pannello.
   */
  selectTextElement(id) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    window.APP_STATE.selectedTextId = id;
    canvas.querySelectorAll('.text-el').forEach(el => {
      const isSel = el.dataset.id === id;
      el.classList.toggle('selected', isSel);
      if (!isSel) {
        el.classList.remove('editing');
        const content = el.querySelector('.text-content');
        if (content && document.activeElement === content) content.blur();
      }
    });
    const data = (window.APP_STATE.textElements || []).find(t => t.id === id);
    if (data) {
      window.APP_STATE.currentTextSettings = {
        font: data.font,
        size: data.size,
        color: data.color,
        bold: !!data.bold,
        italic: !!data.italic
      };
      if (window.tools && window.tools.text && typeof window.tools.text.syncPanel === 'function') {
        window.tools.text.syncPanel();
      }
    }
  },

  /**
   * Deseleziona tutti gli elementi testo e chiude eventuale
   * editing in corso (salvando il contenuto).
   */
  deselectAllTextElements() {
    window.APP_STATE.selectedTextId = null;
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.text-el').forEach(el => {
      el.classList.remove('selected');
      el.classList.remove('editing');
      const content = el.querySelector('.text-content');
      if (content && document.activeElement === content) content.blur();
    });
  },

  /**
   * Entra in modalità editing per un elemento testo
   * (lo seleziona, aggiunge classe .editing, mette focus
   * sul contenteditable con cursore alla fine).
   */
  startEditingTextElement(id) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    this.selectTextElement(id);
    const el = canvas.querySelector(`.text-el[data-id="${id}"]`);
    if (!el) return;
    el.classList.add('editing');
    const content = el.querySelector('.text-content');
    if (!content) return;
    content.focus();
    try {
      const range = document.createRange();
      range.selectNodeContents(content);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (_) { /* selection può fallire se vuoto */ }
  },

  /**
   * Costruisce il div .text-el con drag-handle, remove-btn
   * e contenteditable. Collega tutti gli handler.
   * @private
   */
  _createTextEl(data) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return null;

    const el = document.createElement('div');
    el.className = 'text-el';
    el.dataset.id = data.id;
    el.style.position = 'absolute';
    el.style.left = data.x + '%';
    el.style.top = data.y + '%';

    const handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.textContent = '⠿';
    handle.title = 'Trascina';
    el.appendChild(handle);

    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '×';
    removeBtn.title = 'Elimina';
    removeBtn.addEventListener('mousedown', (e) => e.stopPropagation());
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._removeTextElement(data.id);
    });
    el.appendChild(removeBtn);

    const content = document.createElement('div');
    content.className = 'text-content';
    content.contentEditable = 'true';
    content.spellcheck = false;
    content.dataset.placeholder = 'Scrivi qui...';
    content.textContent = data.testo || '';
    this._applyTextStyles(content, data);
    el.appendChild(content);

    const updateEmptyState = () => {
      const isEmpty = (content.textContent || '').trim() === '';
      content.classList.toggle('is-empty', isEmpty);
    };
    updateEmptyState();

    // blocca il focus del contenteditable se non siamo in editing:
    // così single-click seleziona soltanto, e dblclick entra in edit.
    content.addEventListener('mousedown', (e) => {
      if (!el.classList.contains('editing')) {
        e.preventDefault();
      }
    });

    content.addEventListener('input', () => {
      data.testo = content.textContent;
      updateEmptyState();
    });

    content.addEventListener('blur', () => {
      data.testo = content.textContent;
      el.classList.remove('editing');
      updateEmptyState();
    });

    // click su tutto l'elemento → seleziona (a parte X)
    el.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('remove-btn')) return;
      e.stopPropagation();
      this.selectTextElement(data.id);
    });

    // doppio click → entra in editing
    el.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.startEditingTextElement(data.id);
    });

    this._attachTextDrag(el, data, handle);

    canvas.appendChild(el);
    return el;
  },

  /**
   * Applica font/size/color/bold/italic al contenteditable.
   * @private
   */
  _applyTextStyles(contentEl, data) {
    contentEl.style.fontFamily = `'${data.font}', 'Baloo 2', sans-serif`;
    contentEl.style.fontSize = data.size + 'px';
    contentEl.style.color = data.color;
    contentEl.style.fontWeight = data.bold ? '800' : '500';
    contentEl.style.fontStyle = data.italic ? 'italic' : 'normal';
  },

  /**
   * Drag dalla maniglia ⠿. Aggiorna x%,y% in data e nel DOM
   * con clamp ai bordi del canvas (stesso pattern degli sticker).
   * @private
   */
  _attachTextDrag(el, data, handle) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    let dragging = false;
    let startMouseX = 0, startMouseY = 0;
    let startX = 0, startY = 0;
    let canvasW = 0, canvasH = 0;
    let elemWPct = 0, elemHPct = 0;

    const onMouseDown = (e) => {
      // ignora click sulla X di rimozione
      if (e.target && e.target.classList && e.target.classList.contains('remove-btn')) return;
      // se l'utente sta editando il testo, non avviare il drag:
      // lascia che mouse/cursor interagiscano col contenteditable
      if (el.classList.contains('editing')) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;
      const eRect = el.getBoundingClientRect();
      elemWPct = canvasW ? (eRect.width / canvasW) * 100 : 0;
      elemHPct = canvasH ? (eRect.height / canvasH) * 100 : 0;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startX = data.x;
      startY = data.y;
      dragging = true;
      el.classList.add('dragging');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      const dxPct = canvasW ? (dx / canvasW) * 100 : 0;
      const dyPct = canvasH ? (dy / canvasH) * 100 : 0;
      let newX = startX + dxPct;
      let newY = startY + dyPct;
      const maxX = Math.max(0, 100 - elemWPct);
      const maxY = Math.max(0, 100 - elemHPct);
      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));
      el.style.left = newX + '%';
      el.style.top = newY + '%';
      data.x = newX;
      data.y = newY;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // drag dall'intero elemento (più intuitivo per i bambini),
    // non solo dalla maniglia ⠿
    el.addEventListener('mousedown', onMouseDown);
  },

  /**
   * Rimuove un elemento testo dal DOM e dallo stato.
   * @private
   */
  _removeTextElement(id) {
    this.saveSnapshot();
    const canvas = document.getElementById('card-canvas');
    if (canvas) {
      const el = canvas.querySelector(`.text-el[data-id="${id}"]`);
      if (el) el.remove();
    }
    if (Array.isArray(window.APP_STATE.textElements)) {
      window.APP_STATE.textElements =
        window.APP_STATE.textElements.filter(t => t.id !== id);
    }
    if (window.APP_STATE.selectedTextId === id) {
      window.APP_STATE.selectedTextId = null;
    }
  },

  /**
   * Click sul canvas:
   *  - target === canvas (cioè non un elemento figlio)
   *  - se text tool attivo → addTextElement alle coords %
   *  - altrimenti → deselectAllTextElements
   * @private
   */
  _attachCanvasClickHandler() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    if (canvas._textCanvasHandlerAttached) return;
    canvas._textCanvasHandlerAttached = true;

    canvas.addEventListener('click', (e) => {
      if (e.target !== canvas) return;
      const textTool = window.tools && window.tools.text;
      if (textTool && textTool.active) {
        const rect = canvas.getBoundingClientRect();
        const x = rect.width  ? ((e.clientX - rect.left) / rect.width)  * 100 : 50;
        const y = rect.height ? ((e.clientY - rect.top)  / rect.height) * 100 : 50;
        this.addTextElement(x, y);
      } else {
        this.deselectAllTextElements();
      }
    });
  },

  /* =====================================================
     WASHI TAPE — striscia SVG ruotata tra due punti
     ===================================================== */

  /**
   * Disegna una striscia SVG dentro #card-canvas dato un
   * oggetto tape = {id, x1,y1,x2,y2 (%), tipo (0..7)}.
   * Lo SVG è posizionato a (x1%, y1%), ruotato dell'angolo
   * corretto con transform-origin sul punto iniziale.
   * pointer-events solo sulla striscia stessa.
   */
  renderTape(tapeObj) {
    if (!tapeObj || !tapeObj.id) return null;
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return null;

    // rimuovi eventuale versione precedente di questo tape
    canvas.querySelectorAll(`.tape-el[data-tape-id="${tapeObj.id}"]`)
      .forEach(el => el.remove());

    const rect = canvas.getBoundingClientRect();
    const cw = rect.width  || 1;
    const ch = rect.height || 1;
    const x1px = (tapeObj.x1 / 100) * cw;
    const y1px = (tapeObj.y1 / 100) * ch;
    const x2px = (tapeObj.x2 / 100) * cw;
    const y2px = (tapeObj.y2 / 100) * ch;
    const dx = x2px - x1px;
    const dy = y2px - y1px;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle  = Math.atan2(dy, dx) * 180 / Math.PI;

    const TAPE_H = 28;

    // wrapper ruotato con origine sul punto A
    const wrapper = document.createElement('div');
    wrapper.className = 'tape-el';
    wrapper.dataset.tapeId = tapeObj.id;
    wrapper.style.position = 'absolute';
    wrapper.style.left = tapeObj.x1 + '%';
    wrapper.style.top  = tapeObj.y1 + '%';
    wrapper.style.width  = '0';
    wrapper.style.height = '0';
    wrapper.style.transformOrigin = '0 0';
    wrapper.style.transform = `rotate(${angle}deg)`;
    wrapper.style.pointerEvents = 'none';

    // svg posizionato in alto a sinistra del wrapper, traslato in alto di TAPE_H/2
    // così che la linea A-B passi al centro verticale della striscia
    const svgNS = 'http://www.w3.org/2000/svg';
    const patternId = `tape-pat-${tapeObj.id}`;
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width',  String(length));
    svg.setAttribute('height', String(TAPE_H));
    svg.setAttribute('viewBox', `0 0 ${length} ${TAPE_H}`);
    svg.style.position = 'absolute';
    svg.style.left = '0';
    svg.style.top  = (-TAPE_H / 2) + 'px';
    svg.style.overflow = 'visible';
    svg.style.pointerEvents = 'none';

    svg.innerHTML = `
      <defs>${this._buildTapePatternDef(patternId, tapeObj.tipo)}</defs>
      <rect class="tape-strip"
            x="0" y="0"
            width="${length}" height="${TAPE_H}"
            fill="url(#${patternId})" />
    `;

    // click sulla striscia → seleziona via il tool
    const strip = svg.querySelector('rect.tape-strip');
    if (strip) {
      strip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.tools && window.tools.tape &&
            typeof window.tools.tape._selectTape === 'function') {
          window.tools.tape._selectTape(tapeObj.id, e.clientX, e.clientY);
        }
      });

      // drag della striscia (sposta i due endpoint mantenendo angolo e lunghezza)
      this._attachTapeDrag(wrapper, strip, tapeObj);
    }

    wrapper.appendChild(svg);
    canvas.appendChild(wrapper);
    return wrapper;
  },

  /**
   * Collega il drag a una striscia di washi tape. Sposta entrambi
   * gli endpoint dello stesso delta (così l'angolo e la lunghezza
   * restano invariati e basta aggiornare wrapper.left / wrapper.top).
   * Se il movimento è significativo, sopprime il click successivo
   * così che il popup di selezione non si apra dopo un drag.
   * @private
   */
  _attachTapeDrag(wrapper, strip, tapeObj) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    let dragging = false;
    let moved = false;
    let startMouseX = 0, startMouseY = 0;
    let startX1 = 0, startY1 = 0, startX2 = 0, startY2 = 0;
    let canvasW = 0, canvasH = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = canvas.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      startX1 = tapeObj.x1;
      startY1 = tapeObj.y1;
      startX2 = tapeObj.x2;
      startY2 = tapeObj.y2;
      dragging = true;
      moved = false;
      wrapper.classList.add('dragging');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startMouseX;
      const dy = e.clientY - startMouseY;
      if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) moved = true;
      const dxPct = canvasW ? (dx / canvasW) * 100 : 0;
      const dyPct = canvasH ? (dy / canvasH) * 100 : 0;

      // clamp del delta così che entrambi gli endpoint restino in [0, 100]
      const minX = -Math.min(startX1, startX2);
      const maxX =  100 - Math.max(startX1, startX2);
      const minY = -Math.min(startY1, startY2);
      const maxY =  100 - Math.max(startY1, startY2);
      const clampedDx = Math.max(minX, Math.min(maxX, dxPct));
      const clampedDy = Math.max(minY, Math.min(maxY, dyPct));

      tapeObj.x1 = startX1 + clampedDx;
      tapeObj.y1 = startY1 + clampedDy;
      tapeObj.x2 = startX2 + clampedDx;
      tapeObj.y2 = startY2 + clampedDy;

      // l'angolo è preservato (delta uguale sui due punti), basta
      // muovere il wrapper — la rotazione è già su transform-origin 0,0
      wrapper.style.left = tapeObj.x1 + '%';
      wrapper.style.top  = tapeObj.y1 + '%';
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      wrapper.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // se è stato un vero drag (non un click), inghiottisci il prossimo
      // click così che il popup di selezione non si apra subito dopo
      if (moved) {
        const swallow = (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        strip.addEventListener('click', swallow, { once: true, capture: true });
      }
    };

    strip.addEventListener('mousedown', onMouseDown);
  },

  /**
   * Ricrea tutti i tape nel DOM a partire dallo stato.
   */
  renderTapes() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.tape-el').forEach(el => el.remove());
    const list = Array.isArray(window.APP_STATE.tapes)
      ? window.APP_STATE.tapes
      : [];
    list.forEach(t => this.renderTape(t));
  },

  /**
   * Rimuove un tape dal DOM e dallo stato.
   */
  removeTape(id) {
    if (!id) return;
    this.saveSnapshot();
    const canvas = document.getElementById('card-canvas');
    if (canvas) {
      const el = canvas.querySelector(`.tape-el[data-tape-id="${id}"]`);
      if (el) el.remove();
    }
    if (Array.isArray(window.APP_STATE.tapes)) {
      window.APP_STATE.tapes =
        window.APP_STATE.tapes.filter(t => t.id !== id);
    }
  },

  /**
   * Aggiorna il tipo di pattern di un tape esistente e
   * lo ridisegna.
   */
  updateTapeType(id, tipoIndex) {
    if (!id) return;
    const tape = (window.APP_STATE.tapes || []).find(t => t.id === id);
    if (!tape) return;
    this.saveSnapshot();
    tape.tipo = tipoIndex | 0;
    this.renderTape(tape);
  },

  /**
   * Restituisce il markup <pattern> per il tipo richiesto.
   * Usato sia dal tape sul canvas che dalle anteprime nel
   * pannello e nel popup.
   * @internal
   */
  _buildTapePatternDef(patternId, tipo) {
    switch (tipo | 0) {
      case 0: // Rosa tinta unita
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#FF6B9D"/>
        </pattern>`;
      case 1: // Giallo tinta unita
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#FFD93D"/>
        </pattern>`;
      case 2: // Menta tinta unita
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#5ECFB1"/>
        </pattern>`;
      case 3: // Pois bianchi su blu
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#6BAEFF"/>
          <circle cx="5" cy="5" r="3" fill="white"/>
        </pattern>`;
      case 4: // Righe diagonali giallo/arancio
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
          <rect width="14" height="14" fill="#FFD93D"/>
          <rect x="0" y="0" width="7" height="14" fill="#FF9A3C"/>
        </pattern>`;
      case 5: // Cuoricini rossi su bianco (ogni 14px)
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="14" height="14">
          <rect width="14" height="14" fill="#FFFFFF"/>
          <path d="M 7,11 C 1.5,7.5 1,4 4,3 C 5.5,2.5 6.5,3.5 7,4.5 C 7.5,3.5 8.5,2.5 10,3 C 13,4 12.5,7.5 7,11 Z" fill="#FF3B5C"/>
        </pattern>`;
      case 6: // Stelline viola su rosa (ogni 12px)
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" fill="#FFB8D4"/>
          <path d="M 6,1.5 L 7.2,4.6 L 10.6,4.8 L 7.9,6.9 L 8.7,10.1 L 6,8.3 L 3.3,10.1 L 4.1,6.9 L 1.4,4.8 L 4.8,4.6 Z" fill="#9B59B6"/>
        </pattern>`;
      case 7: // Fiori su verde menta (ogni 16px)
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="16" height="16">
          <rect width="16" height="16" fill="#A8E6D1"/>
          <circle cx="8" cy="3.5"  r="2"   fill="#FFFFFF"/>
          <circle cx="8" cy="12.5" r="2"   fill="#FFFFFF"/>
          <circle cx="3.5" cy="8"  r="2"   fill="#FFFFFF"/>
          <circle cx="12.5" cy="8" r="2"   fill="#FFFFFF"/>
          <circle cx="8" cy="8"    r="2.2" fill="#FFD93D"/>
        </pattern>`;
      default:
        return `<pattern id="${patternId}" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="#FF6B9D"/>
        </pattern>`;
    }
  },

  /* =====================================================
     COLORE — secchiello (zone SVG) + pennello (canvas 2D)
     ===================================================== */

  /**
   * Colora una zona SVG con id `elementId`. Salva la scelta
   * in APP_STATE.coloredZones così da poter ridisegnare dopo
   * un reset del canvas.
   */
  colorZone(elementId, color, silent) {
    if (!elementId || !color) return;
    if (!silent) this.saveSnapshot();
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    let el = null;
    try {
      el = canvas.querySelector('#' + CSS.escape(elementId));
    } catch (_) {
      el = canvas.querySelector('#' + elementId);
    }
    if (el) {
      el.setAttribute('fill', color);
    }
    if (!window.APP_STATE.coloredZones || typeof window.APP_STATE.coloredZones !== 'object') {
      window.APP_STATE.coloredZones = {};
    }
    window.APP_STATE.coloredZones[elementId] = color;
  },

  /**
   * Riapplica tutte le colorazioni salvate in coloredZones
   * alle zone presenti nel canvas. Le voci che non trovano
   * elemento corrispondente rimangono in stato (potranno
   * essere applicate se il template viene cambiato).
   */
  applyColoredZones() {
    const zones = window.APP_STATE.coloredZones || {};
    Object.keys(zones).forEach(id => {
      this.colorZone(id, zones[id], true);
    });
  },

  /**
   * Crea (o ricrea) un <canvas id="brush-canvas"> sopra il
   * #card-canvas. Stesse dimensioni del card-canvas, gestite
   * via ResizeObserver. Di default pointer-events:none — viene
   * abilitato solo quando il tab pennello è attivo.
   */
  initBrushCanvas() {
    const cardCanvas = document.getElementById('card-canvas');
    if (!cardCanvas) return;

    // rimuovi eventuali brush canvas già presenti (idempotenza)
    cardCanvas.querySelectorAll('#brush-canvas').forEach(el => el.remove());

    const brushCanvas = document.createElement('canvas');
    brushCanvas.id = 'brush-canvas';
    cardCanvas.appendChild(brushCanvas);

    // adatta subito le dimensioni se il canvas è già stato layoutato
    const setSize = () => {
      const r = cardCanvas.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return false;
      // evita reset inutili se la dimensione non è cambiata
      if (brushCanvas.width !== Math.round(r.width) ||
          brushCanvas.height !== Math.round(r.height)) {
        brushCanvas.width  = Math.round(r.width);
        brushCanvas.height = Math.round(r.height);
        this.redrawBrush();
      }
      return true;
    };
    setSize();

    // ResizeObserver per seguire il card-canvas
    if (this._brushResizeObserver) {
      try { this._brushResizeObserver.disconnect(); } catch (_) {}
    }
    if (typeof ResizeObserver !== 'undefined') {
      this._brushResizeObserver = new ResizeObserver(() => setSize());
      this._brushResizeObserver.observe(cardCanvas);
    }
  },

  /**
   * Pulisce il brush-canvas e ridisegna tutti i tratti in
   * APP_STATE.brushStrokes. Le coordinate dei punti sono
   * normalizzate in [0,1] rispetto al brush-canvas.
   */
  redrawBrush() {
    const brushCanvas = document.getElementById('brush-canvas');
    if (!brushCanvas) return;
    const ctx = brushCanvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);

    const strokes = Array.isArray(window.APP_STATE.brushStrokes)
      ? window.APP_STATE.brushStrokes
      : [];
    strokes.forEach(stroke => this._drawBrushStroke(ctx, stroke));
  },

  /**
   * Disegna un singolo tratto sul context 2D.
   * @private
   */
  _drawBrushStroke(ctx, stroke) {
    if (!stroke || !Array.isArray(stroke.points) || stroke.points.length === 0) return;
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;

    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color || '#FF6B9D';
    ctx.lineWidth   = stroke.size  || 10;

    if (stroke.points.length === 1) {
      // tap singolo: disegna un pallino del colore del tratto
      const p = stroke.points[0];
      ctx.fillStyle = stroke.color || '#FF6B9D';
      ctx.beginPath();
      ctx.arc(p.x * cw, p.y * ch, (stroke.size || 10) / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    ctx.beginPath();
    stroke.points.forEach((p, i) => {
      const x = p.x * cw;
      const y = p.y * ch;
      if (i === 0) ctx.moveTo(x, y);
      else         ctx.lineTo(x, y);
    });
    ctx.stroke();
  },

  /* =====================================================
     UNDO — snapshot dello stato + ripristino
     ===================================================== */

  /**
   * Patcha il push() di un array per chiamare saveSnapshot()
   * prima di ogni mutazione. Usato per tapes e brushStrokes
   * che vengono modificati direttamente da tools.js.
   * @private
   */
  _patchArrayPush(arr) {
    if (!Array.isArray(arr) || arr._undoPatched) return;
    Object.defineProperty(arr, '_undoPatched', {
      value: true, writable: true, configurable: true, enumerable: false
    });
    const origPush = Array.prototype.push;
    const self = this;
    Object.defineProperty(arr, 'push', {
      value: function (...items) {
        self.saveSnapshot();
        return origPush.apply(this, items);
      },
      writable: true,
      configurable: true,
      enumerable: false
    });
  },

  /**
   * Salva uno snapshot profondo di APP_STATE (senza undoStack/redoStack).
   * Mantiene al massimo 30 snapshot. Azzera anche redoStack perché una
   * nuova azione invalida la "timeline futura" del redo.
   * Rispetta il flag interno _suppressSnapshot usato durante
   * undo/redo/renderAll/clearAll.
   */
  saveSnapshot() {
    if (this._suppressSnapshot) return;
    const state = window.APP_STATE;
    if (!state) return;
    if (!Array.isArray(state.undoStack)) state.undoStack = [];
    if (!Array.isArray(state.redoStack)) state.redoStack = [];

    // separa gli stack dallo snapshot (non vogliamo serializzarli)
    const undo = state.undoStack;
    const redo = state.redoStack;
    state.undoStack = undefined;
    state.redoStack = undefined;
    let snap = null;
    try {
      snap = JSON.parse(JSON.stringify(state));
    } catch (_) {
      snap = null;
    }
    state.undoStack = undo;
    state.redoStack = redo;
    if (!snap) return;

    state.undoStack.push(snap);
    if (state.undoStack.length > 30) state.undoStack.shift();
    // nuova azione → invalida la timeline futura
    state.redoStack = [];
    this._updateUndoRedoBadges();
  },

  /**
   * Pop dell'ultimo snapshot da undoStack, spinge lo stato corrente
   * in redoStack e ripristina i campi su APP_STATE.
   */
  undo() {
    const state = window.APP_STATE;
    if (!state) return;
    if (!Array.isArray(state.undoStack) || state.undoStack.length === 0) return;
    if (!Array.isArray(state.redoStack)) state.redoStack = [];

    // cattura lo stato corrente come futuro snap di redo
    const currentSnap = this._snapshotForHistory(state);

    const snap = state.undoStack.pop();

    this._suppressSnapshot = true;
    try {
      Object.keys(snap).forEach(k => {
        if (k === 'undoStack' || k === 'redoStack') return;
        state[k] = snap[k];
      });
      // spingi lo stato pre-undo nel redoStack
      if (currentSnap) {
        if (!Array.isArray(state.redoStack)) state.redoStack = [];
        state.redoStack.push(currentSnap);
        if (state.redoStack.length > 30) state.redoStack.shift();
      }
      // re-patcha gli array ricostruiti dal JSON
      this._patchArrayPush(state.tapes);
      this._patchArrayPush(state.brushStrokes);
      this.renderAll();
    } finally {
      this._suppressSnapshot = false;
    }
    this._updateUndoRedoBadges();
  },

  /**
   * Pop dell'ultimo snapshot da redoStack, spinge lo stato corrente
   * in undoStack e ripristina i campi su APP_STATE. È l'inverso di undo().
   */
  redo() {
    const state = window.APP_STATE;
    if (!state) return;
    if (!Array.isArray(state.redoStack) || state.redoStack.length === 0) return;
    if (!Array.isArray(state.undoStack)) state.undoStack = [];

    // cattura lo stato corrente per poter tornare indietro
    const currentSnap = this._snapshotForHistory(state);

    const snap = state.redoStack.pop();

    this._suppressSnapshot = true;
    try {
      Object.keys(snap).forEach(k => {
        if (k === 'undoStack' || k === 'redoStack') return;
        state[k] = snap[k];
      });
      if (currentSnap) {
        if (!Array.isArray(state.undoStack)) state.undoStack = [];
        state.undoStack.push(currentSnap);
        if (state.undoStack.length > 30) state.undoStack.shift();
      }
      this._patchArrayPush(state.tapes);
      this._patchArrayPush(state.brushStrokes);
      this.renderAll();
    } finally {
      this._suppressSnapshot = false;
    }
    this._updateUndoRedoBadges();
  },

  /**
   * Helper interno: serializza APP_STATE per metterlo in cronologia
   * (undoStack o redoStack), escludendo gli stack stessi.
   * @private
   */
  _snapshotForHistory(state) {
    const undo = state.undoStack;
    const redo = state.redoStack;
    state.undoStack = undefined;
    state.redoStack = undefined;
    let snap = null;
    try {
      snap = JSON.parse(JSON.stringify(state));
    } catch (_) {
      snap = null;
    }
    state.undoStack = undo;
    state.redoStack = redo;
    return snap;
  },

  /**
   * Ridisegna tutto a partire da APP_STATE: testi del wizard,
   * sticker, testi liberi, tape, zone colorate, tratti pennello.
   */
  renderAll() {
    this._suppressSnapshot = true;
    try {
      const canvas = document.getElementById('card-canvas');
      if (!canvas) return;

      // garantisce la presenza dell'SVG template (può essere stato
      // rimosso solo in casi estremi: lo reinstalla se manca)
      if (!canvas.querySelector('svg.template-svg')) {
        this._installTemplateBackground();
      }

      // tiene allineato lo sfondo CSS del canvas a state.template.background
      // (così l'undo/redo del tool Sfondo ripristina il bg sotto agli SVG
      // trasparenti e in modalità free creation)
      const tpl = window.APP_STATE && window.APP_STATE.template;
      if (tpl) canvas.style.background = tpl.background || '';

      // renderTexts rimuove solo .canvas-text, preserva tutto il resto
      this.renderTexts();
      this.renderStickers();
      this.renderTextElements();
      this.renderTapes();

      // ripristina i fill originali delle .colorable PRIMA di
      // applicare i colori salvati nello stato (così l'undo torna pulito)
      this._resetColorableFills();
      this.applyColoredZones();

      // se per qualche motivo il brush-canvas non c'è più, ricrealo
      if (!canvas.querySelector('#brush-canvas')) {
        this.initBrushCanvas();
      }
      this.redrawBrush();
    } finally {
      this._suppressSnapshot = false;
    }
  },

  /**
   * Memorizza i fill SVG originali di tutti gli elementi .colorable
   * in un attributo data-orig-fill. Chiamato subito dopo
   * l'iniezione del template SVG, prima che l'utente possa
   * cambiarne i colori. Idempotente: salta gli elementi già marcati.
   * @private
   */
  _captureOriginalFills() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.colorable').forEach(el => {
      if (el.hasAttribute('data-orig-fill')) return;
      const f = el.getAttribute('fill');
      if (f != null) el.setAttribute('data-orig-fill', f);
    });
  },

  /**
   * Riporta tutti gli .colorable al fill originale memorizzato in
   * data-orig-fill. Usato prima di applyColoredZones() per evitare
   * colori sporchi dopo un undo o un clearAll.
   * @private
   */
  _resetColorableFills() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    canvas.querySelectorAll('.colorable').forEach(el => {
      const orig = el.getAttribute('data-orig-fill');
      if (orig != null) el.setAttribute('fill', orig);
    });
  },

  /* =====================================================
     CANCELLA TUTTO — svuota tutte le decorazioni
     ===================================================== */

  /**
   * Mostra il dialog di conferma. Se confermato, svuota
   * sticker, testi liberi, tape, brush strokes e zone colorate.
   * Salva uno snapshot prima della cancellazione.
   */
  clearAll() {
    this._showConfirmDialog(
      'Vuoi cancellare tutte le decorazioni?',
      'Sì, cancella',
      'No, torna indietro',
      () => this._doClearAll()
    );
  },

  /** @private */
  _doClearAll() {
    this.saveSnapshot();
    const state = window.APP_STATE;
    state.stickers = [];
    state.textElements = [];
    state.tapes = [];
    state.brushStrokes = [];
    state.coloredZones = {};
    state.selectedTextId = null;
    state.tapeInProgress = null;
    // i nuovi array sono "puliti": ri-patcha il push
    this._patchArrayPush(state.tapes);
    this._patchArrayPush(state.brushStrokes);
    this.renderAll();
  },

  /**
   * Costruisce e mostra un dialog di conferma centrato con
   * overlay scuro. Pulisce sé stesso alla chiusura.
   * @private
   */
  _showConfirmDialog(message, yesLabel, noLabel, onYes) {
    // rimuovi eventuali dialog precedenti
    document.querySelectorAll('#confirm-dialog, #confirm-overlay').forEach(el => el.remove());

    const overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';

    const dialog = document.createElement('div');
    dialog.id = 'confirm-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');

    const msg = document.createElement('div');
    msg.className = 'confirm-message';
    msg.textContent = message;
    dialog.appendChild(msg);

    const actions = document.createElement('div');
    actions.className = 'confirm-actions';

    const btnYes = document.createElement('button');
    btnYes.type = 'button';
    btnYes.className = 'confirm-btn confirm-btn-yes';
    btnYes.textContent = yesLabel;

    const btnNo = document.createElement('button');
    btnNo.type = 'button';
    btnNo.className = 'confirm-btn confirm-btn-no';
    btnNo.textContent = noLabel;

    actions.appendChild(btnNo);
    actions.appendChild(btnYes);
    dialog.appendChild(actions);

    const close = () => {
      overlay.remove();
      dialog.remove();
    };

    btnYes.addEventListener('click', () => {
      close();
      if (typeof onYes === 'function') onYes();
    });
    btnNo.addEventListener('click', close);
    overlay.addEventListener('click', close);

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);
  },

  /* =====================================================
     STAMPA — prepara DOM, chiama window.print, ripristina
     ===================================================== */

  /**
   * Inietta una regola @page dinamica corrispondente al tipo
   * (biglietto/striscione/certificato/segnalibro). Sostituisce
   * eventuali regole iniettate in precedenza.
   * @private
   */
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
    }
    let styleEl = document.getElementById('print-page-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'print-page-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `@page { size: ${size}; margin: 0; }`;
  },

  /**
   * Avvia la procedura di stampa: prepara DOM, chiama
   * window.print(), poi ripristina lo stato originale.
   */
  print() {
    this._prePrint();
    window.print();
    // fallback se onafterprint non scatta (es. alcuni browser)
    setTimeout(() => this._postPrint(), 800);
  },

  /** @private */
  _prePrint() {
    if (this._printing) return;
    this._printing = true;

    document.body.classList.add('printing');

    // memorizza ed elimina .selected da text-el e tape-el
    this._printSelectedTexts = Array.from(
      document.querySelectorAll('.text-el.selected')
    );
    this._printSelectedTapes = Array.from(
      document.querySelectorAll('.tape-el.selected')
    );
    this._printEditingTexts = Array.from(
      document.querySelectorAll('.text-el.editing')
    );
    this._printSelectedTexts.forEach(el => el.classList.remove('selected'));
    this._printSelectedTapes.forEach(el => el.classList.remove('selected'));
    this._printEditingTexts.forEach(el => el.classList.remove('editing'));

    // chiudi i pannelli aperti (toggle delle tool-btn attive)
    this._printToggledTools = [];
    document.querySelectorAll('#toolbar .tool-btn.active').forEach(btn => {
      this._printToggledTools.push(btn);
      btn.click();
    });
  },

  /** @private */
  _postPrint() {
    if (!this._printing) return;
    this._printing = false;

    document.body.classList.remove('printing');

    (this._printSelectedTexts || []).forEach(el => el.classList.add('selected'));
    (this._printSelectedTapes || []).forEach(el => el.classList.add('selected'));
    (this._printEditingTexts  || []).forEach(el => el.classList.add('editing'));
    this._printSelectedTexts = null;
    this._printSelectedTapes = null;
    this._printEditingTexts  = null;
    this._printToggledTools  = null;
  },

  /* =====================================================
     BOTTONI TOOLBAR (undo, cancella, stampa) e shortcut
     ===================================================== */

  /**
   * Aggiunge i bottoni ↩️ 🗑️ 🖨️ in coda alla toolbar.
   * Idempotente: rimuove versioni precedenti prima.
   * @private
   */
  _setupActionButtons() {
    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    // rimuovi eventuali bottoni d'azione già presenti
    toolbar.querySelectorAll('.action-btn-wrap, .action-divider').forEach(el => el.remove());

    const divider = document.createElement('div');
    divider.className = 'action-divider';
    toolbar.appendChild(divider);

    // UNDO con badge contatore
    const undoWrap = document.createElement('div');
    undoWrap.className = 'action-btn-wrap';
    const undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.className = 'action-btn action-btn-undo';
    undoBtn.title = 'Annulla ultima azione (Ctrl+Z)';
    undoBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">↩️</span>' +
      '<span class="tool-btn-label">Annulla</span>';
    undoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.undo();
    });
    const badge = document.createElement('span');
    badge.className = 'undo-badge';
    badge.textContent = '0';
    undoWrap.appendChild(undoBtn);
    undoWrap.appendChild(badge);
    toolbar.appendChild(undoWrap);
    this._undoBadgeEl = badge;
    this._undoBtnEl = undoBtn;

    // RIPRISTINA (redo) con badge contatore
    const redoWrap = document.createElement('div');
    redoWrap.className = 'action-btn-wrap';
    const redoBtn = document.createElement('button');
    redoBtn.type = 'button';
    redoBtn.className = 'action-btn action-btn-redo';
    redoBtn.title = 'Ripristina (Ctrl+Y o Ctrl+Shift+Z)';
    redoBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">↪️</span>' +
      '<span class="tool-btn-label">Ripristina</span>';
    redoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.redo();
    });
    const redoBadge = document.createElement('span');
    redoBadge.className = 'undo-badge redo-badge';
    redoBadge.textContent = '0';
    redoWrap.appendChild(redoBtn);
    redoWrap.appendChild(redoBadge);
    toolbar.appendChild(redoWrap);
    this._redoBadgeEl = redoBadge;
    this._redoBtnEl = redoBtn;

    // CANCELLA TUTTO
    const clearWrap = document.createElement('div');
    clearWrap.className = 'action-btn-wrap';
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'action-btn action-btn-clear';
    clearBtn.title = 'Cancella tutte le decorazioni';
    clearBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">🗑️</span>' +
      '<span class="tool-btn-label">Cancella</span>';
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearAll();
    });
    clearWrap.appendChild(clearBtn);
    toolbar.appendChild(clearWrap);

    // STAMPA
    const printWrap = document.createElement('div');
    printWrap.className = 'action-btn-wrap';
    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.className = 'action-btn action-btn-print';
    printBtn.title = 'Stampa';
    printBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">🖨️</span>' +
      '<span class="tool-btn-label">Stampa</span>';
    printBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.print();
    });
    printWrap.appendChild(printBtn);
    toolbar.appendChild(printWrap);

    // ESPORTA PNG
    const exportWrap = document.createElement('div');
    exportWrap.className = 'action-btn-wrap';
    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'action-btn action-btn-export';
    exportBtn.title = 'Esporta come immagine PNG';
    exportBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">🖼️</span>' +
      '<span class="tool-btn-label">Esporta PNG</span>';
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.exportPNG();
    });
    exportWrap.appendChild(exportBtn);
    toolbar.appendChild(exportWrap);

    // SALVA BOZZA
    const saveDraftWrap = document.createElement('div');
    saveDraftWrap.className = 'action-btn-wrap';
    const saveDraftBtn = document.createElement('button');
    saveDraftBtn.type = 'button';
    saveDraftBtn.className = 'action-btn action-btn-save-draft';
    saveDraftBtn.title = 'Salva bozza (per riprenderla più tardi)';
    saveDraftBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">💾</span>' +
      '<span class="tool-btn-label">Salva bozza</span>';
    saveDraftBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._showSaveDraftModal();
    });
    saveDraftWrap.appendChild(saveDraftBtn);
    toolbar.appendChild(saveDraftWrap);

    // SALVA COME TEMPLATE
    const saveTplWrap = document.createElement('div');
    saveTplWrap.className = 'action-btn-wrap';
    const saveTplBtn = document.createElement('button');
    saveTplBtn.type = 'button';
    saveTplBtn.className = 'action-btn action-btn-save-tpl';
    saveTplBtn.title = 'Salva come template';
    saveTplBtn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">⭐</span>' +
      '<span class="tool-btn-label">Salva template</span>';
    saveTplBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._showSaveTemplateModal();
    });
    saveTplWrap.appendChild(saveTplBtn);
    toolbar.appendChild(saveTplWrap);

    this._updateUndoBadge();
  },

  /**
   * Aggiorna i badge "(n)" sui bottoni Annulla/Ripristina e
   * il loro stato disabled quando lo stack è vuoto.
   * @private
   */
  _updateUndoRedoBadges() {
    const state = window.APP_STATE;
    if (this._undoBadgeEl && this._undoBtnEl) {
      const n = (state && Array.isArray(state.undoStack)) ? state.undoStack.length : 0;
      this._undoBadgeEl.textContent = String(n);
      this._undoBtnEl.classList.toggle('is-disabled', n === 0);
    }
    if (this._redoBadgeEl && this._redoBtnEl) {
      const n = (state && Array.isArray(state.redoStack)) ? state.redoStack.length : 0;
      this._redoBadgeEl.textContent = String(n);
      this._redoBtnEl.classList.toggle('is-disabled', n === 0);
    }
  },

  /**
   * Alias retro-compatibile: alcune chiamate interne usavano
   * il nome vecchio _updateUndoBadge.
   * @private
   */
  _updateUndoBadge() {
    this._updateUndoRedoBadges();
  },

  /**
   * Aggancia Ctrl+Z → editor.undo(), Ctrl+Y / Ctrl+Shift+Z → editor.redo()
   * e onbeforeprint/onafterprint per cleanup automatico. Idempotente.
   * @private
   */
  _attachUndoShortcut() {
    if (!this._undoShortcutAttached) {
      this._undoShortcutAttached = true;
      document.addEventListener('keydown', (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;
        // se l'utente sta editando un testo libero/input, lascia che
        // il browser gestisca undo/redo nativi del contenteditable
        const ae = document.activeElement;
        if (ae && (ae.isContentEditable ||
                   ae.tagName === 'INPUT' ||
                   ae.tagName === 'TEXTAREA')) return;
        const k = (e.key || '').toLowerCase();
        if (k === 'z' && !e.shiftKey) {
          e.preventDefault();
          this.undo();
        } else if ((k === 'z' && e.shiftKey) || k === 'y') {
          e.preventDefault();
          this.redo();
        }
      });
    }
    if (!this._printHooksAttached) {
      this._printHooksAttached = true;
      window.addEventListener('beforeprint', () => this._prePrint());
      window.addEventListener('afterprint',  () => this._postPrint());
    }
  },

  /* =====================================================
     CREA LIBERO — entry-point alternativo al wizard
     ===================================================== */

  /**
   * Avvia l'editor in modalità "crea libero". Salta il wizard:
   * imposta direttamente tipo, sfondo e — per il tipo 'libero' —
   * dimensioni custom in cm.
   *
   * @param {string} tipo - 'biglietto' | 'striscione' | 'certificato'
   *                        | 'segnalibro' | 'libero'
   * @param {string} sfondo - colore CSS del fondo (es. '#FFF8F0')
   * @param {number} [w] - larghezza in cm (solo per tipo 'libero')
   * @param {number} [h] - altezza in cm (solo per tipo 'libero')
   */
  initFree(tipo, sfondo, w, h) {
    const state = window.APP_STATE = window.APP_STATE || {};
    state.tipo = tipo;
    state.template = { nome: 'Libero', svg: null, background: sfondo };
    state.testi = {};
    if (!state.font) state.font = 'Baloo 2';
    state.freeMode = true;
    if (tipo === 'libero') {
      const ww = (typeof w === 'number' && w > 0) ? w : 15;
      const hh = (typeof h === 'number' && h > 0) ? h : 10;
      state.freeSize = { w: ww, h: hh };
    } else {
      state.freeSize = null;
    }

    const screenMenu = document.getElementById('screen-menu');
    const screenFree = document.getElementById('screen-free');
    const wizard     = document.getElementById('wizard');
    const editorEl   = document.getElementById('editor');
    if (screenMenu) screenMenu.hidden = true;
    if (screenFree) screenFree.hidden = true;
    if (wizard)     wizard.hidden     = true;
    if (editorEl)   editorEl.hidden   = false;

    this.init();
  },

  /* =====================================================
     NAVIGAZIONE TRA SCHERMATE (menu / wizard / free)
     ===================================================== */

  /** Mostra il menu principale e nasconde tutto il resto. */
  _showMenu() {
    const screenMenu  = document.getElementById('screen-menu');
    const screenFree  = document.getElementById('screen-free');
    const screenMyTpl = document.getElementById('screen-my-templates');
    const wizard      = document.getElementById('wizard');
    const editorEl    = document.getElementById('editor');
    if (screenFree)  screenFree.hidden  = true;
    if (screenMyTpl) screenMyTpl.hidden = true;
    if (wizard)      wizard.hidden      = true;
    if (editorEl)    editorEl.hidden    = true;
    if (screenMenu)  screenMenu.hidden  = false;
    this._setBodyMode('menu');
    this._refreshMyTemplatesMenuButton();
    this._refreshDraftsMenuButton();
  },

  /** Mostra il wizard (lo stato è già renderizzato da wizard.js). */
  _showWizard() {
    const screenMenu = document.getElementById('screen-menu');
    const screenFree = document.getElementById('screen-free');
    const wizard     = document.getElementById('wizard');
    const editorEl   = document.getElementById('editor');
    if (screenMenu) screenMenu.hidden = true;
    if (screenFree) screenFree.hidden = true;
    if (editorEl)   editorEl.hidden   = true;
    if (wizard)     wizard.hidden     = false;
    this._setBodyMode('wizard');
  },

  /** Mostra la schermata "crea libero". */
  _showScreenFree() {
    const screenMenu = document.getElementById('screen-menu');
    const screenFree = document.getElementById('screen-free');
    const wizard     = document.getElementById('wizard');
    const editorEl   = document.getElementById('editor');
    if (screenMenu) screenMenu.hidden = true;
    if (wizard)     wizard.hidden     = true;
    if (editorEl)   editorEl.hidden   = true;
    if (screenFree) screenFree.hidden = false;
    this._setBodyMode('free');
  },

  /**
   * Sostituisce le body class di modalità con quella richiesta.
   * Le mode-* sono usate dal CSS per nascondere la step-bar quando
   * non siamo nel flusso wizard.
   */
  _setBodyMode(mode) {
    document.body.classList.remove(
      'mode-menu', 'mode-wizard', 'mode-free',
      'mode-editor-wizard', 'mode-editor-free',
      'mode-my-tpls', 'mode-drafts'
    );
    if (mode) document.body.classList.add('mode-' + mode);
  },

  /* =====================================================
     WIRE-UP DELLE NUOVE SCHERMATE (menu + screen-free)
     ===================================================== */

  /** Aggancia i listener alla schermata menu. Idempotente. */
  _setupMenuScreen() {
    const btnWizard = document.getElementById('path-wizard');
    if (btnWizard && !btnWizard._menuWired) {
      btnWizard._menuWired = true;
      btnWizard.addEventListener('click', () => this._showWizard());
    }
    const btnFree = document.getElementById('path-free');
    if (btnFree && !btnFree._menuWired) {
      btnFree._menuWired = true;
      btnFree.addEventListener('click', () => this._showScreenFree());
    }
  },

  /** Aggancia i listener della schermata "crea libero". Idempotente. */
  _setupFreeScreen() {
    const root = document.getElementById('screen-free');
    if (!root || root._freeWired) return;
    root._freeWired = true;

    const localState = {
      tipo: null,
      bg: '#FFFFFF',
      bgMode: 'solid',       // 'solid' | 'gradient'
      solidBg: '#FFFFFF',
      gradColor1: '#FFB5D8',
      gradColor2: '#C77DFF',
      gradDir: '135deg',
      w: 15,
      h: 10
    };

    const sizeSection  = root.querySelector('#free-size-section');
    const widthInput   = root.querySelector('#free-width');
    const heightInput  = root.querySelector('#free-height');
    const previewEl    = root.querySelector('#free-size-preview');
    const previewLabel = root.querySelector('.free-size-preview-label');
    const btnStart     = root.querySelector('#btn-free-start');
    const btnBack      = root.querySelector('#btn-free-back');
    const customColor  = root.querySelector('#bg-custom');
    const grad1        = root.querySelector('#bg-grad-1');
    const grad2        = root.querySelector('#bg-grad-2');
    const gradPreview  = root.querySelector('#bg-grad-preview');

    const updateStartBtn = () => {
      if (btnStart) btnStart.disabled = !localState.tipo;
    };

    const updatePreview = () => {
      const wRaw = parseFloat(widthInput && widthInput.value);
      const hRaw = parseFloat(heightInput && heightInput.value);
      const w = (isFinite(wRaw) && wRaw > 0) ? wRaw : localState.w;
      const h = (isFinite(hRaw) && hRaw > 0) ? hRaw : localState.h;
      localState.w = w;
      localState.h = h;
      const MAX = 120;
      let pw, ph;
      if (w >= h) { pw = MAX;            ph = MAX * (h / w); }
      else        { ph = MAX;            pw = MAX * (w / h); }
      if (previewEl) {
        previewEl.style.width  = Math.max(30, Math.round(pw)) + 'px';
        previewEl.style.height = Math.max(30, Math.round(ph)) + 'px';
      }
      if (previewLabel) {
        const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(1);
        previewLabel.textContent = fmt(w) + ' × ' + fmt(h) + ' cm';
      }
    };

    // selezione formato (4 standard + 'libero')
    const formatCards = root.querySelectorAll('.type-card[data-free-tipo]');
    const selectFormat = (card) => {
      formatCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      localState.tipo = card.dataset.freeTipo;
      if (sizeSection) {
        sizeSection.hidden = (localState.tipo !== 'libero');
      }
      if (localState.tipo === 'libero') updatePreview();
      updateStartBtn();
    };
    formatCards.forEach(card => {
      card.addEventListener('click', () => selectFormat(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectFormat(card);
        }
      });
    });

    if (widthInput)  widthInput.addEventListener('input', updatePreview);
    if (heightInput) heightInput.addEventListener('input', updatePreview);

    // ricalcola la stringa CSS del background in base alla modalità corrente
    const recomputeBg = () => {
      if (localState.bgMode === 'gradient') {
        localState.bg =
          `linear-gradient(${localState.gradDir}, ${localState.gradColor1} 0%, ${localState.gradColor2} 100%)`;
      } else {
        localState.bg = localState.solidBg;
      }
      if (gradPreview) gradPreview.style.background = localState.bg;
    };

    // tab mode: tinta unita / gradiente
    root.querySelectorAll('.bg-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.bgMode;
        if (mode !== 'solid' && mode !== 'gradient') return;
        localState.bgMode = mode;
        root.querySelectorAll('.bg-mode-tab').forEach(t =>
          t.classList.toggle('active', t.dataset.bgMode === mode));
        root.querySelectorAll('.bg-mode-content').forEach(c => {
          c.hidden = c.dataset.bgMode !== mode;
        });
        recomputeBg();
      });
    });

    // palette sfondi (tinta unita)
    root.querySelectorAll('.bg-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        root.querySelectorAll('.bg-swatch').forEach(s => s.classList.remove('selected'));
        sw.classList.add('selected');
        localState.solidBg = sw.dataset.bg || '#FFFFFF';
        if (customColor) customColor.value = localState.solidBg;
        recomputeBg();
      });
    });

    if (customColor) {
      customColor.addEventListener('input', () => {
        root.querySelectorAll('.bg-swatch').forEach(s => s.classList.remove('selected'));
        localState.solidBg = customColor.value;
        recomputeBg();
      });
    }

    // gradiente: colori
    if (grad1) {
      grad1.addEventListener('input', () => {
        localState.gradColor1 = grad1.value;
        recomputeBg();
      });
    }
    if (grad2) {
      grad2.addEventListener('input', () => {
        localState.gradColor2 = grad2.value;
        recomputeBg();
      });
    }

    // gradiente: direzione
    root.querySelectorAll('.bg-dir-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.bg-dir-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localState.gradDir = btn.dataset.dir || '135deg';
        recomputeBg();
      });
    });

    // valore iniziale anteprima
    recomputeBg();

    if (btnBack) {
      btnBack.addEventListener('click', () => this._showMenu());
    }

    if (btnStart) {
      btnStart.addEventListener('click', () => {
        if (!localState.tipo) return;
        const w = localState.tipo === 'libero' ? localState.w : undefined;
        const h = localState.tipo === 'libero' ? localState.h : undefined;
        this.initFree(localState.tipo, localState.bg, w, h);
      });
    }
  },

  /**
   * Aggancia un listener delegato sul document per allineare
   * verticalmente il pannello del tool al bottone che lo apre
   * (così non finisce lontano dal click). Solo su desktop —
   * sotto i 760px la CSS responsive li tiene sotto la toolbar.
   * Idempotente.
   */
  _setupToolPanelPositioning() {
    if (this._toolPanelPositioningWired) return;
    this._toolPanelPositioningWired = true;

    const TOOLS = ['sticker', 'text', 'tape', 'color', 'background'];

    const reposition = (tool) => {
      const panel = document.getElementById('panel-' + tool);
      const btn = document.querySelector(`#toolbar .tool-btn[data-tool="${tool}"]`);
      if (!panel || !btn) return;
      if (window.innerWidth <= 760) {
        // su mobile lascia che sia la CSS responsive a gestire la posizione
        panel.style.top = '';
        return;
      }
      panel.style.top = btn.offsetTop + 'px';
    };

    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest &&
                  e.target.closest('#toolbar .tool-btn[data-tool]');
      if (!btn) return;
      const tool = btn.dataset.tool;
      if (TOOLS.indexOf(tool) === -1) return;
      // lascia che tools.js apra/chiuda prima di posizionare
      requestAnimationFrame(() => reposition(tool));
    });

    // riallinea tutti i pannelli aperti al resize della finestra
    window.addEventListener('resize', () => {
      TOOLS.forEach(t => {
        const panel = document.getElementById('panel-' + t);
        if (panel && !panel.hidden) reposition(t);
      });
    });
  },

  /**
   * Aggancia un secondo listener a #btn-restart così che, oltre
   * al restartWizard di wizard.js, l'utente venga riportato alla
   * schermata del menu principale. Idempotente.
   */
  _setupRestartToMenu() {
    const btn = document.getElementById('btn-restart');
    if (!btn || btn._menuRestartWired) return;
    btn._menuRestartWired = true;
    btn.addEventListener('click', () => {
      // wizard.js mostra il wizard a step 1 e resetta APP_STATE;
      // qui lo nascondiamo e mostriamo il menu come "vera home".
      this._showMenu();
    });
  },

  /* =====================================================
     SALVA COME TEMPLATE — modal, anteprima, persistenza
     ===================================================== */

  /** Costanti delle 6 categorie disponibili nel modal. */
  _TEMPLATE_CATEGORIES: [
    { id: 'Compleanno', label: 'Compleanno', emoji: '🎂' },
    { id: 'Natale',     label: 'Natale',     emoji: '🎄' },
    { id: 'Animali',    label: 'Animali',    emoji: '🐾' },
    { id: 'Spazio',     label: 'Spazio',     emoji: '🚀' },
    { id: 'Unicorno',   label: 'Unicorno',   emoji: '🦄' },
    { id: 'Altro',      label: 'Altro',      emoji: '✨' }
  ],

  /** Etichette per i 4 tipi base (riusate nel modal e in #screen-my-templates). */
  _TIPO_LABELS: {
    biglietto:   { label: 'Biglietto',   emoji: '📨' },
    striscione:  { label: 'Striscione',  emoji: '🎉' },
    certificato: { label: 'Certificato', emoji: '🏆' },
    segnalibro:  { label: 'Segnalibro',  emoji: '🔖' }
  },

  /** Aggancia i listener del modal salva-template. Idempotente. */
  _setupSaveTemplateModal() {
    const modal = document.getElementById('modal-save-template');
    if (!modal || modal._wired) return;
    modal._wired = true;

    const overlay = document.getElementById('modal-save-template-overlay');
    const btnCancel = modal.querySelector('#tpl-cancel');
    const btnSave   = modal.querySelector('#tpl-save');
    const nameInput = modal.querySelector('#tpl-name');

    if (btnCancel) btnCancel.addEventListener('click', () => this._hideSaveTemplateModal());
    if (overlay)   overlay.addEventListener('click',   () => this._hideSaveTemplateModal());

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const nome = (nameInput && nameInput.value || '').trim();
        const tipo = (modal.querySelector('input[name="tpl-tipo"]:checked') || {}).value;
        const cat  = (modal.querySelector('input[name="tpl-categoria"]:checked') || {}).value;
        if (!nome) {
          if (nameInput) nameInput.focus();
          this._showToast('Scegli un nome per il template');
          return;
        }
        if (!tipo) {
          this._showToast('Seleziona un tipo');
          return;
        }
        const ok = this.saveAsTemplate(nome, tipo, cat || 'Altro');
        if (ok) this._hideSaveTemplateModal();
      });
    }

    // Esc chiude il modal
    if (!this._modalEscHandlerAttached) {
      this._modalEscHandlerAttached = true;
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (modal.hidden) return;
        e.preventDefault();
        this._hideSaveTemplateModal();
      });
    }
  },

  /** Apre il modal precompilando tipo corrente, categoria 'Altro' e anteprima. */
  _showSaveTemplateModal() {
    const overlay = document.getElementById('modal-save-template-overlay');
    const modal   = document.getElementById('modal-save-template');
    if (!modal || !overlay) return;

    const state = window.APP_STATE || {};
    const nameInput = modal.querySelector('#tpl-name');
    if (nameInput) nameInput.value = '';

    // preseleziona il tipo corrente (se è uno dei 4 standard)
    const radios = modal.querySelectorAll('input[name="tpl-tipo"]');
    radios.forEach(r => { r.checked = (r.value === state.tipo); });
    // se nessuno è selezionato (es. 'libero'), default a biglietto
    if (![...radios].some(r => r.checked) && radios.length > 0) {
      radios[0].checked = true;
    }

    // categoria default: Altro
    modal.querySelectorAll('input[name="tpl-categoria"]').forEach(r => {
      r.checked = (r.value === 'Altro');
    });

    this._renderTemplatePreview();

    overlay.hidden = false;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    if (nameInput) setTimeout(() => nameInput.focus(), 60);
  },

  /** Chiude il modal e ripulisce l'anteprima. */
  _hideSaveTemplateModal() {
    const overlay = document.getElementById('modal-save-template-overlay');
    const modal   = document.getElementById('modal-save-template');
    if (overlay) overlay.hidden = true;
    if (modal)   modal.hidden = true;
    document.body.classList.remove('modal-open');
    const preview = document.getElementById('tpl-preview');
    if (preview) preview.innerHTML = '';
  },

  /**
   * Costruisce l'anteprima miniaturizzata del canvas corrente:
   * clona #card-canvas, lo scala con transform e lo inserisce
   * in #tpl-preview.
   */
  _renderTemplatePreview() {
    const previewEl = document.getElementById('tpl-preview');
    const canvas    = document.getElementById('card-canvas');
    if (!previewEl || !canvas) return;
    previewEl.innerHTML = '';

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const MAX_W = 300;
    const MAX_H = 180;
    const scale = Math.min(MAX_W / rect.width, MAX_H / rect.height);

    const wrap = document.createElement('div');
    wrap.className = 'tpl-preview-wrap';
    wrap.style.width  = Math.round(rect.width  * scale) + 'px';
    wrap.style.height = Math.round(rect.height * scale) + 'px';

    const clone = canvas.cloneNode(true);
    clone.id = '';
    clone.removeAttribute('class');
    // copia le classi necessarie per ratio/background (anche se lo scaling sovrasta)
    clone.style.position = 'absolute';
    clone.style.top  = '0';
    clone.style.left = '0';
    clone.style.transformOrigin = 'top left';
    clone.style.transform = `scale(${scale})`;
    clone.style.width  = rect.width  + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    // disattiva eventuali interattività residue dei cloni
    clone.querySelectorAll('.remove-btn, .drag-handle').forEach(el => el.remove());

    wrap.appendChild(clone);
    previewEl.appendChild(wrap);
  },

  /**
   * Costruisce un oggetto template a partire dallo stato corrente
   * e lo salva in localStorage. Mostra un toast all'utente.
   * @returns {boolean} true se il salvataggio è andato a buon fine
   */
  saveAsTemplate(nome, tipo, categoria) {
    if (!nome || !tipo) return false;
    const state = window.APP_STATE;
    if (!state) return false;

    const tpl = {
      id: 'utpl_' + Date.now().toString(36) + '_' +
           Math.random().toString(36).slice(2, 6),
      nome: String(nome).trim(),
      tipo: tipo,
      categoria: categoria || 'Altro',
      isUserTemplate: true,
      background: (state.template && state.template.background) || '',
      svg: null,
      snapshot: {
        stickers:     JSON.parse(JSON.stringify(state.stickers     || [])),
        textElements: JSON.parse(JSON.stringify(state.textElements || [])),
        tapes:        JSON.parse(JSON.stringify(state.tapes        || [])),
        coloredZones: JSON.parse(JSON.stringify(state.coloredZones || {}))
        // brushStrokes intenzionalmente escluso (troppo pesante)
      }
    };

    const ok = (typeof window.saveUserTemplate === 'function') &&
               window.saveUserTemplate(tpl);
    if (ok) {
      this._showToast('✅ Template salvato!');
      this._refreshMyTemplatesMenuButton();
    } else {
      this._showToast('❌ Salvataggio fallito');
    }
    return ok;
  },

  /* =====================================================
     TOAST — notifica temporanea bottom-center
     ===================================================== */

  _showToast(message, duration) {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    // forza un reflow per far partire l'animazione
    // eslint-disable-next-line no-unused-expressions
    toast.offsetHeight;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 320);
    }, duration || 2400);
  },

  /* =====================================================
     SCHERMATA "I MIEI TEMPLATE"
     ===================================================== */

  /** Aggancia listener della schermata my-templates. Idempotente. */
  _setupMyTemplatesScreen() {
    const screen = document.getElementById('screen-my-templates');
    if (!screen || screen._wired) return;
    screen._wired = true;

    const btnBack = screen.querySelector('#btn-my-tpls-back');
    if (btnBack) btnBack.addEventListener('click', () => this._showMenu());

    // bottone nel menu principale
    const btnOpen = document.getElementById('path-my-tpls');
    if (btnOpen && !btnOpen._wired) {
      btnOpen._wired = true;
      btnOpen.addEventListener('click', () => this._showMyTemplates());
    }
  },

  /** Mostra la schermata #screen-my-templates con la griglia rigenerata. */
  _showMyTemplates() {
    const screenMenu  = document.getElementById('screen-menu');
    const screenFree  = document.getElementById('screen-free');
    const screenMyTpl = document.getElementById('screen-my-templates');
    const wizard      = document.getElementById('wizard');
    const editorEl    = document.getElementById('editor');
    if (screenMenu)  screenMenu.hidden = true;
    if (screenFree)  screenFree.hidden = true;
    if (wizard)      wizard.hidden     = true;
    if (editorEl)    editorEl.hidden   = true;
    if (screenMyTpl) screenMyTpl.hidden = false;
    this._setBodyMode('my-tpls');
    this._renderMyTemplatesGrid();
  },

  /** Costruisce le card dei template salvati nella griglia. */
  _renderMyTemplatesGrid() {
    const grid    = document.getElementById('my-tpls-grid');
    const emptyEl = document.getElementById('my-tpls-empty');
    if (!grid) return;
    grid.innerHTML = '';

    const list = (typeof window.getUserTemplates === 'function')
      ? window.getUserTemplates() : [];

    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (list.length === 0) return;

    list.forEach(tpl => {
      const tipoInfo = this._TIPO_LABELS[tpl.tipo] || { label: tpl.tipo || '?', emoji: '📄' };
      const card = document.createElement('div');
      card.className = 'my-tpl-card';
      card.dataset.id = tpl.id;
      card.innerHTML = `
        <div class="my-tpl-swatch" style="background:${this._escapeAttr(tpl.background || '#FFF8F0')}">
          <span class="my-tpl-swatch-emoji">${tipoInfo.emoji}</span>
        </div>
        <div class="my-tpl-body">
          <div class="my-tpl-name">${this._escapeHtml(tpl.nome || 'Template')}</div>
          <div class="my-tpl-meta">
            <span class="my-tpl-tag">${tipoInfo.emoji} ${this._escapeHtml(tipoInfo.label)}</span>
            <span class="my-tpl-tag my-tpl-tag-cat">${this._escapeHtml(tpl.categoria || 'Altro')}</span>
          </div>
          <div class="my-tpl-actions">
            <button type="button" class="btn btn-primary my-tpl-use">Usa questo →</button>
            <button type="button" class="my-tpl-delete" title="Elimina">🗑️</button>
          </div>
        </div>
      `;

      card.querySelector('.my-tpl-use').addEventListener('click', () => {
        this._useUserTemplate(tpl);
      });
      card.querySelector('.my-tpl-delete').addEventListener('click', () => {
        this._showConfirmDialog(
          `Vuoi eliminare il template "${tpl.nome || 'senza nome'}"?`,
          'Sì, elimina',
          'Annulla',
          () => {
            if (window.deleteUserTemplate && window.deleteUserTemplate(tpl.id)) {
              this._showToast('🗑️ Template eliminato');
              this._renderMyTemplatesGrid();
              this._refreshMyTemplatesMenuButton();
            }
          }
        );
      });

      grid.appendChild(card);
    });
  },

  /**
   * Apre l'editor direttamente con un template utente.
   * Salta il wizard: resetta APP_STATE a uno stato pulito e
   * lascia che init() carichi lo snapshot dal template.
   */
  _useUserTemplate(tpl) {
    if (!tpl) return;
    // reset completo per evitare residui di sessioni precedenti
    window.APP_STATE = {
      tipo: tpl.tipo,
      template: tpl,
      testi: {},
      font: 'Baloo 2',
      freeMode: false,
      freeSize: null
    };

    const screenMyTpl = document.getElementById('screen-my-templates');
    const editorEl    = document.getElementById('editor');
    if (screenMyTpl) screenMyTpl.hidden = true;
    if (editorEl)    editorEl.hidden   = false;

    this.init();
  },

  /**
   * Mostra/nasconde il pulsante "I miei template" nel menu in base
   * alla presenza di template salvati. Aggiorna il contatore.
   */
  _refreshMyTemplatesMenuButton() {
    const btn = document.getElementById('path-my-tpls');
    if (!btn) return;
    const list = (typeof window.getUserTemplates === 'function')
      ? window.getUserTemplates() : [];
    btn.hidden = list.length === 0;
    const countEl = btn.querySelector('#my-tpls-count');
    if (countEl) countEl.textContent = list.length > 0 ? `(${list.length})` : '';
  },

  /* =====================================================
     SALVA BOZZA — multi-slot, work-in-progress
     ===================================================== */

  /** Aggancia i listener del modal salva-bozza. Idempotente. */
  _setupSaveDraftModal() {
    const modal = document.getElementById('modal-save-draft');
    if (!modal || modal._wired) return;
    modal._wired = true;

    const overlay   = document.getElementById('modal-save-draft-overlay');
    const btnCancel = modal.querySelector('#draft-cancel');
    const btnSave   = modal.querySelector('#draft-save');
    const nameInput = modal.querySelector('#draft-name');

    if (btnCancel) btnCancel.addEventListener('click', () => this._hideSaveDraftModal());
    if (overlay)   overlay.addEventListener('click',   () => this._hideSaveDraftModal());

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const nome = (nameInput && nameInput.value || '').trim();
        if (!nome) {
          if (nameInput) nameInput.focus();
          this._showToast('Scegli un nome per la bozza');
          return;
        }
        const ok = this.saveAsDraft(nome);
        if (ok) this._hideSaveDraftModal();
      });
    }

    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && btnSave) btnSave.click();
      });
    }
  },

  /** Apre il modal precompilato con un nome di default ('Bozza del DD/MM/YYYY'). */
  _showSaveDraftModal() {
    const overlay = document.getElementById('modal-save-draft-overlay');
    const modal   = document.getElementById('modal-save-draft');
    if (!modal || !overlay) return;

    const nameInput = modal.querySelector('#draft-name');
    if (nameInput) {
      const d = new Date();
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      nameInput.value = `Bozza del ${dd}/${mm}/${yyyy} ${hh}:${mi}`;
    }

    overlay.hidden = false;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    if (nameInput) setTimeout(() => { nameInput.focus(); nameInput.select(); }, 60);
  },

  /** Chiude il modal salva-bozza. */
  _hideSaveDraftModal() {
    const overlay = document.getElementById('modal-save-draft-overlay');
    const modal   = document.getElementById('modal-save-draft');
    if (overlay) overlay.hidden = true;
    if (modal)   modal.hidden = true;
    document.body.classList.remove('modal-open');
  },

  /**
   * Salva l'intero APP_STATE corrente come bozza in localStorage.
   * Crea sempre una nuova entry (slot multi-bozza).
   * @returns {boolean} true se ok
   */
  saveAsDraft(nome) {
    if (!nome) return false;
    const state = window.APP_STATE;
    if (!state || !state.tipo || !state.template) {
      this._showToast('❌ Nulla da salvare');
      return false;
    }

    // copia profonda escludendo gli stack di cronologia (rumore) e flag interni
    const snap = {};
    Object.keys(state).forEach(k => {
      if (k === 'undoStack' || k === 'redoStack') return;
      if (k.charAt(0) === '_') return;
      try {
        snap[k] = JSON.parse(JSON.stringify(state[k]));
      } catch (_) { /* salta valori non serializzabili */ }
    });

    const draft = {
      id: 'dft_' + Date.now().toString(36) + '_' +
           Math.random().toString(36).slice(2, 6),
      nome: String(nome).trim(),
      updatedAt: Date.now(),
      state: snap
    };

    const ok = (typeof window.saveDraft === 'function') && window.saveDraft(draft);
    if (ok) {
      this._showToast('💾 Bozza salvata!');
      this._refreshDraftsMenuButton();
    } else {
      this._showToast('❌ Salvataggio fallito');
    }
    return ok;
  },

  /* =====================================================
     SCHERMATA "BOZZE"
     ===================================================== */

  /** Aggancia listener di #screen-drafts e del bottone nel menu. Idempotente. */
  _setupDraftsScreen() {
    const screen = document.getElementById('screen-drafts');
    if (screen && !screen._wired) {
      screen._wired = true;
      const btnBack = screen.querySelector('#btn-drafts-back');
      if (btnBack) btnBack.addEventListener('click', () => this._showMenu());
    }
    const btnOpen = document.getElementById('path-drafts');
    if (btnOpen && !btnOpen._wired) {
      btnOpen._wired = true;
      btnOpen.addEventListener('click', () => this._showDrafts());
    }
  },

  /** Mostra #screen-drafts con la griglia rigenerata. */
  _showDrafts() {
    const screenMenu    = document.getElementById('screen-menu');
    const screenFree    = document.getElementById('screen-free');
    const screenMyTpl   = document.getElementById('screen-my-templates');
    const screenDrafts  = document.getElementById('screen-drafts');
    const wizard        = document.getElementById('wizard');
    const editorEl      = document.getElementById('editor');
    if (screenMenu)   screenMenu.hidden   = true;
    if (screenFree)   screenFree.hidden   = true;
    if (screenMyTpl)  screenMyTpl.hidden  = true;
    if (wizard)       wizard.hidden       = true;
    if (editorEl)     editorEl.hidden     = true;
    if (screenDrafts) screenDrafts.hidden = false;
    this._setBodyMode('drafts');
    this._renderDraftsGrid();
  },

  /** Costruisce le card delle bozze nella griglia. */
  _renderDraftsGrid() {
    const grid    = document.getElementById('drafts-grid');
    const emptyEl = document.getElementById('drafts-empty');
    if (!grid) return;
    grid.innerHTML = '';

    const list = (typeof window.getDrafts === 'function') ? window.getDrafts() : [];
    // ordina dalla più recente alla più vecchia
    list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (list.length === 0) return;

    list.forEach(draft => {
      const s = (draft && draft.state) || {};
      const tipo = s.tipo || '?';
      const tipoInfo = this._TIPO_LABELS[tipo] ||
        { label: tipo === 'libero' ? 'Misura libera' : tipo, emoji: '📐' };
      const bg = (s.template && s.template.background) || '#FFF8F0';
      const isGradient = typeof bg === 'string' &&
        (bg.indexOf('gradient') !== -1);
      const swatchStyle = isGradient ? `background:${bg}` : `background:${this._escapeAttr(bg)}`;
      const dateStr = draft.updatedAt
        ? this._formatDraftDate(draft.updatedAt)
        : '';
      const counts = [
        Array.isArray(s.stickers) && s.stickers.length    ? `${s.stickers.length} 🐱`    : '',
        Array.isArray(s.textElements) && s.textElements.length ? `${s.textElements.length} ✍️` : '',
        Array.isArray(s.tapes) && s.tapes.length          ? `${s.tapes.length} 📦`       : '',
        Array.isArray(s.brushStrokes) && s.brushStrokes.length ? `${s.brushStrokes.length} 🖌️` : ''
      ].filter(Boolean).join(' · ');

      const card = document.createElement('div');
      card.className = 'my-tpl-card draft-card';
      card.dataset.id = draft.id;
      card.innerHTML = `
        <div class="my-tpl-swatch" style="${swatchStyle}">
          <span class="my-tpl-swatch-emoji">${tipoInfo.emoji}</span>
        </div>
        <div class="my-tpl-body">
          <div class="my-tpl-name">${this._escapeHtml(draft.nome || 'Bozza')}</div>
          <div class="my-tpl-meta">
            <span class="my-tpl-tag">${tipoInfo.emoji} ${this._escapeHtml(tipoInfo.label)}</span>
            ${dateStr ? `<span class="my-tpl-tag my-tpl-tag-date">${this._escapeHtml(dateStr)}</span>` : ''}
          </div>
          ${counts ? `<div class="draft-counts">${counts}</div>` : ''}
          <div class="my-tpl-actions">
            <button type="button" class="btn btn-primary my-tpl-use">Riprendi →</button>
            <button type="button" class="my-tpl-delete" title="Elimina">🗑️</button>
          </div>
        </div>
      `;

      card.querySelector('.my-tpl-use').addEventListener('click', () => {
        this._useDraft(draft);
      });
      card.querySelector('.my-tpl-delete').addEventListener('click', () => {
        this._showConfirmDialog(
          `Vuoi eliminare la bozza "${draft.nome || 'senza nome'}"?`,
          'Sì, elimina',
          'Annulla',
          () => {
            if (window.deleteDraft && window.deleteDraft(draft.id)) {
              this._showToast('🗑️ Bozza eliminata');
              this._renderDraftsGrid();
              this._refreshDraftsMenuButton();
            }
          }
        );
      });

      grid.appendChild(card);
    });
  },

  /** Ripristina lo stato della bozza in APP_STATE e apre l'editor. */
  _useDraft(draft) {
    if (!draft || !draft.state) return;
    const snap = draft.state;

    // ricostruisci APP_STATE dalla snapshot
    window.APP_STATE = {};
    Object.keys(snap).forEach(k => {
      try {
        window.APP_STATE[k] = JSON.parse(JSON.stringify(snap[k]));
      } catch (_) { /* skip */ }
    });
    // reset di campi che non vanno persistiti
    window.APP_STATE.undoStack = [];
    window.APP_STATE.selectedTextId = null;
    window.APP_STATE.tapeInProgress = null;
    // flag: dice a init() di non ricaricare lo snapshot del template
    // (la bozza contiene già le modifiche dell'utente)
    window.APP_STATE._restoredFromDraft = true;

    const screenDrafts = document.getElementById('screen-drafts');
    const editorEl     = document.getElementById('editor');
    if (screenDrafts) screenDrafts.hidden = true;
    if (editorEl)     editorEl.hidden     = false;

    this.init();
    this._showToast('▶️ Bozza ripresa');
  },

  /**
   * Mostra/nasconde il pulsante "Bozze" nel menu e aggiorna il contatore.
   */
  _refreshDraftsMenuButton() {
    const btn = document.getElementById('path-drafts');
    if (!btn) return;
    const list = (typeof window.getDrafts === 'function') ? window.getDrafts() : [];
    btn.hidden = list.length === 0;
    const countEl = btn.querySelector('#drafts-count');
    if (countEl) countEl.textContent = list.length > 0 ? `(${list.length})` : '';
  },

  /** Format compatto DD/MM HH:MM di un timestamp. @private */
  _formatDraftDate(ts) {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm} ${hh}:${mi}`;
  },

  /* =====================================================
     ESPORTA PNG — rasterizza #card-canvas via html2canvas
     ===================================================== */

  /**
   * Cattura #card-canvas come PNG (2x scale) e avvia il download.
   * Usa html2canvas caricato via CDN da index.html. Se la libreria
   * non è disponibile, mostra un toast di errore.
   */
  async exportPNG() {
    if (typeof window.html2canvas !== 'function') {
      this._showToast('❌ Libreria di esportazione non disponibile');
      return;
    }
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    // disattiva tool attivi e nascondi handle/X durante la cattura
    document.body.classList.add('exporting-png');
    const prevPanelsOpen = [];
    document.querySelectorAll('#toolbar .tool-btn.active').forEach(btn => {
      prevPanelsOpen.push(btn);
      btn.click(); // chiude il pannello
    });

    this._showToast('⏳ Sto generando l\'immagine...');

    try {
      const out = await window.html2canvas(canvas, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
        // tagliato esattamente alle dimensioni del card-canvas
        width: canvas.offsetWidth,
        height: canvas.offsetHeight
      });
      const dataURL = out.toDataURL('image/png');
      const tipo = (window.APP_STATE && window.APP_STATE.tipo) || 'studiomagico';
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = `studiomagico-${tipo}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      this._showToast('🖼️ Immagine scaricata!');
    } catch (e) {
      console.error('exportPNG fallito:', e);
      this._showToast('❌ Esportazione fallita');
    } finally {
      document.body.classList.remove('exporting-png');
    }
  },

  /* =====================================================
     HTML escape helpers (uso interno)
     ===================================================== */
  _escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },
  _escapeAttr(s) {
    return this._escapeHtml(s);
  }
};

/* =====================================================
   BOOT — al DOMContentLoaded aggancia i nuovi schermi e
   imposta la modalità iniziale a "menu". wizard.js gira
   in parallelo e renderizza step1 nel #wizard nascosto.
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!window.editor) return;
  window.editor._setupMenuScreen();
  window.editor._setupFreeScreen();
  window.editor._setupRestartToMenu();
  window.editor._setupToolPanelPositioning();
  window.editor._setupSaveTemplateModal();
  window.editor._setupSaveDraftModal();
  window.editor._setupMyTemplatesScreen();
  window.editor._setupDraftsScreen();
  window.editor._refreshMyTemplatesMenuButton();
  window.editor._refreshDraftsMenuButton();
  window.editor._setBodyMode('menu');
});
