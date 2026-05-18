/* =======================================================
   Studio Magico — Tools
   ======================================================= */

window.tools = window.tools || {};

/**
 * Chiude tutti i pannelli/tool tranne quello indicato.
 * Garantisce la mutua esclusione: quando si apre un menu,
 * gli altri si chiudono automaticamente.
 *
 * @param {string} except — nome del tool da non toccare
 *                          ('sticker' | 'text' | 'tape' | 'color')
 */
window.tools.closeAllExcept = function (except) {
  const t = window.tools;
  if (except !== 'sticker' && t.sticker && t.sticker.panelEl &&
      !t.sticker.panelEl.hidden &&
      typeof t.sticker._setOpen === 'function') {
    t.sticker._setOpen(false);
  }
  if (except !== 'text' && t.text && t.text.active &&
      typeof t.text._setActive === 'function') {
    t.text._setActive(false);
  }
  if (except !== 'tape' && t.tape && t.tape.active &&
      typeof t.tape._setActive === 'function') {
    t.tape._setActive(false);
  }
  if (except !== 'color' && t.color && t.color.active &&
      typeof t.color._setActive === 'function') {
    t.color._setActive(false);
  }
  if (except !== 'background' && t.background && t.background.panelEl &&
      !t.background.panelEl.hidden &&
      typeof t.background._setOpen === 'function') {
    t.background._setOpen(false);
  }
};

const STICKER_CATEGORIES = [
  {
    id: 'animali',
    label: 'Animali',
    icon: '🐾',
    stickers: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐙','🦋','🐢','🦄']
  },
  {
    id: 'cibo',
    label: 'Cibo',
    icon: '🍕',
    stickers: ['🍕','🍔','🍟','🌮','🍩','🍪','🎂','🍰','🧁','🍭','🍬','🍫','🍓','🍉','🍦','🧃','🍿','🥞']
  },
  {
    id: 'cuori',
    label: 'Cuori',
    icon: '💖',
    stickers: ['💖','💝','💘','💗','💓','💞','💕','❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💫','⭐']
  },
  {
    id: 'magia',
    label: 'Magia',
    icon: '✨',
    stickers: ['✨','🌟','💫','⭐','🌈','🦄','🧚','🧙‍♀️','🔮','🌙','☀️','🌸','🌺','🌻','🌼','💐','🍀','🌿']
  },
  {
    id: 'festa',
    label: 'Festa',
    icon: '🎉',
    stickers: ['🎉','🎊','🎈','🎁','🎀','🏆','🥇','🎖️','🎗️','🪅','🎆','🎇','🧨','🎠','🎡','🎢','🎪','🎭']
  },
  {
    id: 'natura',
    label: 'Natura',
    icon: '🌍',
    stickers: ['🌍','🌊','🏔️','🌋','🌅','🌄','🦋','🐝','🌞','🌝','🍄','🌲','🌴','🌵','🎋','🎍','🍁','🍂']
  }
];

window.tools.sticker = {
  buttonEl: null,
  panelEl: null,
  _docClickHandler: null,

  /**
   * Aggiunge il bottone 😺 alla toolbar e costruisce il
   * pannello sticker (nascosto di default). Idempotente:
   * eventuali istanze precedenti vengono rimosse.
   */
  init() {
    this.destroy();

    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    // svuota eventuale contenuto residuo
    toolbar.textContent = '';

    // bottone
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.dataset.tool = 'sticker';
    btn.title = 'Sticker';
    btn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">😺</span>' +
      '<span class="tool-btn-label">Sticker</span>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePanel();
    });
    toolbar.appendChild(btn);
    this.buttonEl = btn;

    // pannello
    const panel = document.createElement('div');
    panel.id = 'panel-sticker';
    panel.hidden = true;
    panel.innerHTML = this._buildPanelHTML();
    panel.addEventListener('click', (e) => e.stopPropagation());
    toolbar.appendChild(panel);
    this.panelEl = panel;

    this._bindPanelEvents();

    // click esterno chiude il pannello
    this._docClickHandler = () => {
      if (this.panelEl && !this.panelEl.hidden) {
        this._setOpen(false);
      }
    };
    document.addEventListener('click', this._docClickHandler);
  },

  /**
   * Rimuove bottone, pannello e listener globali.
   */
  destroy() {
    if (this.buttonEl) {
      this.buttonEl.remove();
      this.buttonEl = null;
    }
    if (this.panelEl) {
      this.panelEl.remove();
      this.panelEl = null;
    }
    if (this._docClickHandler) {
      document.removeEventListener('click', this._docClickHandler);
      this._docClickHandler = null;
    }
  },

  togglePanel() {
    if (!this.panelEl) return;
    this._setOpen(this.panelEl.hidden);
  },

  _setOpen(open) {
    if (!this.panelEl || !this.buttonEl) return;
    this.panelEl.hidden = !open;
    this.buttonEl.classList.toggle('active', open);
    if (open) window.tools.closeAllExcept('sticker');
  },

  _buildPanelHTML() {
    const tabs = STICKER_CATEGORIES.map((cat, i) => `
      <button type="button"
              class="sticker-tab ${i === 0 ? 'active' : ''}"
              data-cat="${cat.id}"
              title="${cat.label}">
        ${cat.icon}
      </button>
    `).join('');

    const grids = STICKER_CATEGORIES.map((cat, i) => `
      <div class="sticker-grid" data-cat="${cat.id}"${i === 0 ? '' : ' hidden'}>
        ${cat.stickers.map(s =>
          `<button type="button" class="sticker-item" data-emoji="${s}">${s}</button>`
        ).join('')}
      </div>
    `).join('');

    return `
      <div class="sticker-tabs">${tabs}</div>
      <div class="sticker-grids">${grids}</div>
    `;
  },

  _bindPanelEvents() {
    const panel = this.panelEl;
    if (!panel) return;

    // tab → mostra la griglia corrispondente
    panel.querySelectorAll('.sticker-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const catId = tab.dataset.cat;
        panel.querySelectorAll('.sticker-tab').forEach(t => {
          t.classList.toggle('active', t === tab);
        });
        panel.querySelectorAll('.sticker-grid').forEach(g => {
          g.hidden = g.dataset.cat !== catId;
        });
      });
    });

    // click su sticker → editor.addSticker
    panel.querySelectorAll('.sticker-item').forEach(item => {
      item.addEventListener('click', () => {
        const emoji = item.dataset.emoji || item.textContent.trim();
        if (window.editor && typeof window.editor.addSticker === 'function') {
          window.editor.addSticker(emoji);
        }
      });
    });
  }
};

/* =========================================================
   Tool TESTO LIBERO
   ========================================================= */

const TEXT_FONTS = [
  { name: 'Baloo 2',          family: "'Baloo 2', sans-serif" },
  { name: 'Patrick Hand',     family: "'Patrick Hand', cursive" },
  { name: 'Caveat',           family: "'Caveat', cursive" },
  { name: 'Schoolbell',       family: "'Schoolbell', cursive" },
  { name: 'Fredoka One',      family: "'Fredoka One', cursive" },
  { name: 'Bangers',          family: "'Bangers', cursive" },
  { name: 'Permanent Marker', family: "'Permanent Marker', cursive" },
  { name: 'Pacifico',         family: "'Pacifico', cursive" },
  { name: 'Princess Sofia',   family: "'Princess Sofia', cursive" },
  { name: 'Sarina',           family: "'Sarina', cursive" },
  { name: 'Quicksand',        family: "'Quicksand', sans-serif" }
];

const TEXT_COLORS = [
  '#2A2438', '#FFFFFF', '#FF6B9D', '#C77DFF',
  '#6BAEFF', '#5ECFB1', '#FFD93D', '#FF9A3C',
  '#FF3B5C', '#9B59B6', '#3498DB', '#2ECC71',
  '#F1C40F', '#E67E22', '#34495E', '#95A5A6'
];

window.tools.text = {
  buttonEl: null,
  panelEl: null,
  active: false,
  _docClickHandler: null,

  /**
   * Aggiunge il bottone ✍️ alla toolbar e costruisce il
   * pannello testo (nascosto di default). Idempotente.
   */
  init() {
    this.destroy();

    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    if (!window.APP_STATE.currentTextSettings) {
      window.APP_STATE.currentTextSettings = {
        font: 'Baloo 2', size: 24, color: '#2A2438', bold: false, italic: false
      };
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.dataset.tool = 'text';
    btn.title = 'Aggiungi testo';
    btn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">✍️</span>' +
      '<span class="tool-btn-label">Testo</span>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleActive();
    });
    toolbar.appendChild(btn);
    this.buttonEl = btn;

    const panel = document.createElement('div');
    panel.id = 'panel-text';
    panel.hidden = true;
    panel.innerHTML = this._buildPanelHTML();
    // i click dentro al pannello non devono propagare
    panel.addEventListener('click', (e) => e.stopPropagation());
    panel.addEventListener('mousedown', (e) => e.stopPropagation());
    toolbar.appendChild(panel);
    this.panelEl = panel;

    this._bindPanelEvents();
    this.syncPanel();

    // chiusura del tool al click fuori (canvas, panel e button
    // sono esclusi: il canvas serve a creare/selezionare testi)
    this._docClickHandler = (e) => {
      if (!this.active) return;
      const canvas = document.getElementById('card-canvas');
      if (this.panelEl && this.panelEl.contains(e.target)) return;
      if (this.buttonEl && this.buttonEl.contains(e.target)) return;
      if (canvas && canvas.contains(e.target)) return;
      this._setActive(false);
    };
    document.addEventListener('click', this._docClickHandler);
  },

  /**
   * Rimuove bottone, pannello e listener globali.
   */
  destroy() {
    if (this.buttonEl) { this.buttonEl.remove(); this.buttonEl = null; }
    if (this.panelEl)  { this.panelEl.remove();  this.panelEl  = null; }
    if (this._docClickHandler) {
      document.removeEventListener('click', this._docClickHandler);
      this._docClickHandler = null;
    }
    const canvas = document.getElementById('card-canvas');
    if (canvas) canvas.classList.remove('text-tool-active');
    this.active = false;
  },

  toggleActive() {
    this._setActive(!this.active);
  },

  _setActive(active) {
    this.active = active;
    if (this.buttonEl) this.buttonEl.classList.toggle('active', active);
    if (this.panelEl)  this.panelEl.hidden = !active;
    const canvas = document.getElementById('card-canvas');
    if (canvas) canvas.classList.toggle('text-tool-active', active);
    if (active) window.tools.closeAllExcept('text');
  },

  _buildPanelHTML() {
    const fonts = TEXT_FONTS.map(f => `
      <button type="button"
              class="font-btn"
              data-font="${f.name}"
              style="font-family:${f.family}">
        ${f.name}
      </button>
    `).join('');

    const swatches = TEXT_COLORS.map(c => `
      <button type="button"
              class="color-swatch"
              data-color="${c}"
              style="background:${c}"
              title="${c}"></button>
    `).join('');

    return `
      <div class="panel-section">
        <div class="panel-section-title">Font</div>
        <div class="font-grid">${fonts}</div>
      </div>
      <div class="panel-section">
        <div class="panel-section-title">
          Dimensione <span class="size-value">24</span>px
        </div>
        <input type="range" class="size-slider"
               min="12" max="72" step="1" value="24" />
      </div>
      <div class="panel-section">
        <div class="panel-section-title">Colore</div>
        <div class="color-grid">${swatches}</div>
        <input type="color" class="color-picker" value="#2A2438" />
      </div>
      <div class="panel-section style-buttons">
        <button type="button" class="style-btn bold-btn" title="Grassetto"><b>B</b></button>
        <button type="button" class="style-btn italic-btn" title="Corsivo"><i>I</i></button>
      </div>
    `;
  },

  _bindPanelEvents() {
    const panel = this.panelEl;
    if (!panel) return;

    // font
    panel.querySelectorAll('.font-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._updateSetting({ font: btn.dataset.font });
      });
    });

    // dimensione
    const slider = panel.querySelector('.size-slider');
    const sizeValueEl = panel.querySelector('.size-value');
    if (slider) {
      slider.addEventListener('input', () => {
        const size = parseInt(slider.value, 10) || 24;
        if (sizeValueEl) sizeValueEl.textContent = String(size);
        this._updateSetting({ size });
      });
    }

    // pallini colore
    panel.querySelectorAll('.color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        this._updateSetting({ color: sw.dataset.color });
      });
    });

    // color picker libero
    const colorPicker = panel.querySelector('.color-picker');
    if (colorPicker) {
      colorPicker.addEventListener('input', () => {
        this._updateSetting({ color: colorPicker.value });
      });
    }

    // grassetto / corsivo
    const boldBtn = panel.querySelector('.bold-btn');
    if (boldBtn) {
      boldBtn.addEventListener('click', () => {
        const cur = window.APP_STATE.currentTextSettings || {};
        this._updateSetting({ bold: !cur.bold });
      });
    }
    const italicBtn = panel.querySelector('.italic-btn');
    if (italicBtn) {
      italicBtn.addEventListener('click', () => {
        const cur = window.APP_STATE.currentTextSettings || {};
        this._updateSetting({ italic: !cur.italic });
      });
    }
  },

  /**
   * Aggiorna currentTextSettings e, se c'è un elemento testo
   * selezionato, propaga il cambio al DOM e all'array.
   */
  _updateSetting(partial) {
    const cur = window.APP_STATE.currentTextSettings || {
      font: 'Baloo 2', size: 24, color: '#2A2438', bold: false, italic: false
    };
    Object.assign(cur, partial);
    window.APP_STATE.currentTextSettings = cur;

    if (window.APP_STATE.selectedTextId &&
        window.editor &&
        typeof window.editor.updateSelectedTextElement === 'function') {
      window.editor.updateSelectedTextElement(partial);
    }

    this.syncPanel();
  },

  /**
   * Allinea i controlli del pannello ai valori in
   * APP_STATE.currentTextSettings. Chiamato dopo ogni cambio
   * e quando si seleziona un elemento esistente.
   */
  syncPanel() {
    const panel = this.panelEl;
    if (!panel) return;
    const s = window.APP_STATE.currentTextSettings || {
      font: 'Baloo 2', size: 24, color: '#2A2438', bold: false, italic: false
    };

    panel.querySelectorAll('.font-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.font === s.font);
    });

    const slider = panel.querySelector('.size-slider');
    if (slider) slider.value = String(s.size);
    const sizeValueEl = panel.querySelector('.size-value');
    if (sizeValueEl) sizeValueEl.textContent = String(s.size);

    const curColor = (s.color || '').toLowerCase();
    panel.querySelectorAll('.color-swatch').forEach(sw => {
      sw.classList.toggle('selected',
        (sw.dataset.color || '').toLowerCase() === curColor);
    });
    const colorPicker = panel.querySelector('.color-picker');
    if (colorPicker) colorPicker.value = s.color;

    const boldBtn = panel.querySelector('.bold-btn');
    if (boldBtn) boldBtn.classList.toggle('active', !!s.bold);
    const italicBtn = panel.querySelector('.italic-btn');
    if (italicBtn) italicBtn.classList.toggle('active', !!s.italic);
  }
};

/* =========================================================
   Tool WASHI TAPE
   ========================================================= */

// contatore globale per id univoci dei pattern SVG nelle preview
let __TAPE_PREVIEW_SEED = 0;

window.tools.tape = {
  buttonEl: null,
  panelEl: null,
  popupEl: null,
  active: false,
  selectedTapeId: null,
  _startIndicatorEl: null,
  _docClickHandler: null,
  _canvasClickHandler: null,

  /**
   * Aggiunge il bottone 📦 alla toolbar e costruisce il
   * pannello tape (nascosto di default). Idempotente.
   */
  init() {
    this.destroy();

    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    if (typeof window.APP_STATE.currentTapeType !== 'number') {
      window.APP_STATE.currentTapeType = 0;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.dataset.tool = 'tape';
    btn.title = 'Washi tape';
    btn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">📦</span>' +
      '<span class="tool-btn-label">Washi tape</span>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleActive();
    });
    toolbar.appendChild(btn);
    this.buttonEl = btn;

    const panel = document.createElement('div');
    panel.id = 'panel-tape';
    panel.hidden = true;
    panel.innerHTML = this._buildPanelHTML();
    panel.addEventListener('click',     (e) => e.stopPropagation());
    panel.addEventListener('mousedown', (e) => e.stopPropagation());
    toolbar.appendChild(panel);
    this.panelEl = panel;

    this._bindPanelEvents();
    this._syncPanelSelection();

    this._attachCanvasHandler();

    this._docClickHandler = (e) => {
      // chiudi popup se click fuori dal popup e fuori da un altro tape
      if (this.popupEl && !this.popupEl.contains(e.target)) {
        const onTape = e.target.closest && e.target.closest('.tape-el');
        if (!onTape) this._closePopup();
      }

      if (!this.active) return;
      const canvas = document.getElementById('card-canvas');
      if (this.panelEl  && this.panelEl.contains(e.target))  return;
      if (this.buttonEl && this.buttonEl.contains(e.target)) return;
      if (canvas        && canvas.contains(e.target))        return;
      if (this.popupEl  && this.popupEl.contains(e.target))  return;
      this._setActive(false);
    };
    document.addEventListener('click', this._docClickHandler);
  },

  /**
   * Rimuove bottone, pannello, popup e listener.
   */
  destroy() {
    if (this.buttonEl) { this.buttonEl.remove(); this.buttonEl = null; }
    if (this.panelEl)  { this.panelEl.remove();  this.panelEl  = null; }
    this._closePopup();
    this._removeStartIndicator();
    if (this._docClickHandler) {
      document.removeEventListener('click', this._docClickHandler);
      this._docClickHandler = null;
    }
    const canvas = document.getElementById('card-canvas');
    if (canvas) canvas.classList.remove('tape-tool-active');
    this.active = false;
  },

  toggleActive() {
    this._setActive(!this.active);
  },

  _setActive(active) {
    this.active = active;
    if (this.buttonEl) this.buttonEl.classList.toggle('active', active);
    if (this.panelEl)  this.panelEl.hidden = !active;
    const canvas = document.getElementById('card-canvas');
    if (canvas) canvas.classList.toggle('tape-tool-active', active);
    if (!active) {
      this._removeStartIndicator();
      window.APP_STATE.tapeInProgress = null;
    }
    if (active) window.tools.closeAllExcept('tape');
  },

  _buildPanelHTML() {
    const previews = [];
    for (let i = 0; i < 8; i++) {
      previews.push(`
        <button type="button"
                class="tape-preview"
                data-tipo="${i}"
                title="Tape ${i + 1}">
          ${this._buildTapeSVG(i, 120, 28, 4)}
        </button>
      `);
    }
    return `
      <div class="tape-panel-title">
        Scegli un tape, poi clicca due punti sul biglietto
      </div>
      <div class="tape-preview-grid">
        ${previews.join('')}
      </div>
    `;
  },

  /**
   * Genera markup SVG riusabile per anteprime tape.
   */
  _buildTapeSVG(tipo, w, h, rx) {
    const pid = `tprev-${++__TAPE_PREVIEW_SEED}`;
    return `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>${window.editor._buildTapePatternDef(pid, tipo)}</defs>
        <rect width="${w}" height="${h}" rx="${rx || 0}" fill="url(#${pid})"/>
      </svg>
    `;
  },

  _bindPanelEvents() {
    if (!this.panelEl) return;
    this.panelEl.querySelectorAll('.tape-preview').forEach(p => {
      p.addEventListener('click', () => {
        const tipo = parseInt(p.dataset.tipo, 10) | 0;
        window.APP_STATE.currentTapeType = tipo;
        this._syncPanelSelection();
      });
    });
  },

  _syncPanelSelection() {
    if (!this.panelEl) return;
    const cur = window.APP_STATE.currentTapeType | 0;
    this.panelEl.querySelectorAll('.tape-preview').forEach(p => {
      p.classList.toggle('selected', (parseInt(p.dataset.tipo, 10) | 0) === cur);
    });
  },

  /**
   * Attacca al canvas il listener che gestisce il piazzamento
   * dei due punti del tape. Idempotente via flag sul canvas.
   */
  _attachCanvasHandler() {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    if (canvas._tapeCanvasHandlerAttached) return;
    canvas._tapeCanvasHandlerAttached = true;

    canvas.addEventListener('click', (e) => {
      if (!this.active) return;
      // ignora click su tape esistenti (li gestisce il rect handler)
      if (e.target && e.target.classList &&
          e.target.classList.contains('tape-strip')) return;
      // solo click diretti sul canvas (non sui figli)
      if (e.target !== canvas) return;

      const rect = canvas.getBoundingClientRect();
      const xPct = rect.width  ? ((e.clientX - rect.left) / rect.width)  * 100 : 50;
      const yPct = rect.height ? ((e.clientY - rect.top)  / rect.height) * 100 : 50;

      if (!window.APP_STATE.tapeInProgress) {
        // PRIMO CLICK: salva punto A e mostra pallino
        window.APP_STATE.tapeInProgress = { x1: xPct, y1: yPct };
        this._showStartIndicator(xPct, yPct);
        return;
      }

      // SECONDO CLICK: crea il tape
      const a = window.APP_STATE.tapeInProgress;
      const dx = xPct - a.x1;
      const dy = yPct - a.y1;
      // distanza in % — se troppo corta, ignora e azzera
      if ((dx * dx + dy * dy) < 0.3) {
        this._removeStartIndicator();
        window.APP_STATE.tapeInProgress = null;
        return;
      }

      const id = 'tp_' + Date.now().toString(36) + '_' +
                 Math.random().toString(36).slice(2, 7);
      const tape = {
        id,
        x1: a.x1, y1: a.y1,
        x2: xPct, y2: yPct,
        tipo: window.APP_STATE.currentTapeType | 0
      };
      if (!Array.isArray(window.APP_STATE.tapes)) {
        window.APP_STATE.tapes = [];
      }
      window.APP_STATE.tapes.push(tape);
      if (window.editor && typeof window.editor.renderTape === 'function') {
        window.editor.renderTape(tape);
      }
      this._removeStartIndicator();
      window.APP_STATE.tapeInProgress = null;
    });
  },

  _showStartIndicator(xPct, yPct) {
    this._removeStartIndicator();
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    const dot = document.createElement('div');
    dot.className = 'tape-point-indicator';
    dot.style.left = xPct + '%';
    dot.style.top  = yPct + '%';
    canvas.appendChild(dot);
    this._startIndicatorEl = dot;
  },

  _removeStartIndicator() {
    if (this._startIndicatorEl) {
      this._startIndicatorEl.remove();
      this._startIndicatorEl = null;
    }
  },

  /**
   * Seleziona un tape esistente, evidenziandolo e mostrando
   * il popup con le 8 anteprime tipo e il bottone 🗑️.
   */
  _selectTape(id, clientX, clientY) {
    this._closePopup();
    this.selectedTapeId = id;

    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;

    canvas.querySelectorAll('.tape-el').forEach(el => {
      el.classList.toggle('selected', el.dataset.tapeId === id);
    });

    const popup = document.createElement('div');
    popup.id = 'tape-popup';
    popup.innerHTML = this._buildPopupHTML(id);
    popup.style.left = clientX + 'px';
    popup.style.top  = clientY + 'px';
    popup.addEventListener('click',     (e) => e.stopPropagation());
    popup.addEventListener('mousedown', (e) => e.stopPropagation());

    document.body.appendChild(popup);
    this.popupEl = popup;

    this._bindPopupEvents();
  },

  _buildPopupHTML(id) {
    const tape = (window.APP_STATE.tapes || []).find(t => t.id === id);
    const cur = tape ? (tape.tipo | 0) : 0;
    let dots = '';
    for (let i = 0; i < 8; i++) {
      dots += `
        <button type="button"
                class="tape-popup-type${i === cur ? ' selected' : ''}"
                data-tipo="${i}"
                title="Tape ${i + 1}">
          ${this._buildTapeSVG(i, 22, 22, 11)}
        </button>
      `;
    }
    return `
      <div class="tape-popup-types">${dots}</div>
      <button type="button" class="tape-popup-delete" title="Elimina">🗑️</button>
    `;
  },

  _bindPopupEvents() {
    if (!this.popupEl) return;
    this.popupEl.querySelectorAll('.tape-popup-type').forEach(b => {
      b.addEventListener('click', () => {
        if (!this.selectedTapeId) return;
        const tipo = parseInt(b.dataset.tipo, 10) | 0;
        if (window.editor && typeof window.editor.updateTapeType === 'function') {
          window.editor.updateTapeType(this.selectedTapeId, tipo);
        }
        // mantieni il tape selezionato dopo il re-render
        const canvas = document.getElementById('card-canvas');
        if (canvas) {
          canvas.querySelectorAll('.tape-el').forEach(el => {
            el.classList.toggle('selected',
              el.dataset.tapeId === this.selectedTapeId);
          });
        }
        this.popupEl.querySelectorAll('.tape-popup-type').forEach(x => {
          x.classList.toggle('selected',
            (parseInt(x.dataset.tipo, 10) | 0) === tipo);
        });
      });
    });

    const delBtn = this.popupEl.querySelector('.tape-popup-delete');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (!this.selectedTapeId) return;
        if (window.editor && typeof window.editor.removeTape === 'function') {
          window.editor.removeTape(this.selectedTapeId);
        }
        this._closePopup();
      });
    }
  },

  _closePopup() {
    if (this.popupEl) {
      this.popupEl.remove();
      this.popupEl = null;
    }
    this.selectedTapeId = null;
    const canvas = document.getElementById('card-canvas');
    if (canvas) {
      canvas.querySelectorAll('.tape-el.selected')
        .forEach(el => el.classList.remove('selected'));
    }
  }
};

/* =========================================================
   Tool COLORE — Secchiello (zone SVG) + Pennello (canvas 2D)
   ========================================================= */

const COLOR_PALETTE_20 = [
  '#FF3B5C', '#FF6B9D', '#FFB8D4', '#C77DFF',
  '#9B59B6', '#6BAEFF', '#3498DB', '#2980B9',
  '#5ECFB1', '#2ECC71', '#16A085', '#A8E6D1',
  '#FFD93D', '#F1C40F', '#FF9A3C', '#E67E22',
  '#2A2438', '#34495E', '#95A5A6', '#FFFFFF'
];

window.tools.color = {
  buttonEl: null,
  panelEl: null,
  active: false,
  activeTab: 'bucket',
  _docClickHandler: null,
  _bucketClickHandler: null,
  _brushDown: null,
  _brushMove: null,
  _brushUp: null,
  _brushTouchStart: null,
  _brushTouchMove: null,
  _brushTouchEnd: null,
  _currentStroke: null,
  _drawing: false,

  /**
   * Aggiunge il bottone 🎨 alla toolbar, costruisce il
   * pannello a due tab (secchiello / pennello) e collega
   * i listener su #card-canvas e #brush-canvas.
   */
  init() {
    this.destroy();

    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    if (typeof window.APP_STATE.currentColor !== 'string') {
      window.APP_STATE.currentColor = '#FF6B9D';
    }
    if (typeof window.APP_STATE.currentBrushSize !== 'number') {
      window.APP_STATE.currentBrushSize = 10;
    }

    // bottone toolbar
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.dataset.tool = 'color';
    btn.title = 'Colore e pennello';
    btn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">🎨</span>' +
      '<span class="tool-btn-label">Colore</span>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleActive();
    });
    toolbar.appendChild(btn);
    this.buttonEl = btn;

    // pannello
    const panel = document.createElement('div');
    panel.id = 'panel-color';
    panel.hidden = true;
    panel.innerHTML = this._buildPanelHTML();
    panel.addEventListener('click',     (e) => e.stopPropagation());
    panel.addEventListener('mousedown', (e) => e.stopPropagation());
    toolbar.appendChild(panel);
    this.panelEl = panel;

    this._bindPanelEvents();
    this._syncPanelSelection();

    // disabilita il secchiello se il template è un coloring page senza zone .colorable
    // (es. PNG/JPG caricato dall'utente, o SVG senza path .colorable)
    const tpl = window.APP_STATE && window.APP_STATE.template;
    if (tpl && tpl.isColoringPage && !tpl.hasColorable) {
      const bucketBtn = panel.querySelector('.color-tab[data-tab="bucket"]');
      if (bucketBtn) {
        bucketBtn.disabled = true;
        bucketBtn.title = 'Disponibile solo su disegni preparati con zone colorabili';
        bucketBtn.classList.add('color-tab-disabled');
      }
      // forza il tab attivo su brush (default è bucket)
      this.activeTab = 'brush';
    }

    this._attachBucketHandler();
    this._attachBrushHandlers();

    // chiusura su click esterno
    this._docClickHandler = (e) => {
      if (!this.active) return;
      const cardCanvas  = document.getElementById('card-canvas');
      const brushCanvas = document.getElementById('brush-canvas');
      if (this.panelEl   && this.panelEl.contains(e.target))   return;
      if (this.buttonEl  && this.buttonEl.contains(e.target))  return;
      if (cardCanvas     && cardCanvas.contains(e.target))     return;
      if (brushCanvas    && brushCanvas.contains(e.target))    return;
      this._setActive(false);
    };
    document.addEventListener('click', this._docClickHandler);
  },

  /**
   * Rimuove bottone, pannello e listener.
   */
  destroy() {
    if (this.buttonEl) { this.buttonEl.remove(); this.buttonEl = null; }
    if (this.panelEl)  { this.panelEl.remove();  this.panelEl  = null; }
    if (this._docClickHandler) {
      document.removeEventListener('click', this._docClickHandler);
      this._docClickHandler = null;
    }
    // pulisci stato visivo
    const cardCanvas  = document.getElementById('card-canvas');
    const brushCanvas = document.getElementById('brush-canvas');
    if (cardCanvas)  cardCanvas.classList.remove('bucket-tab-active', 'brush-tab-active');
    if (brushCanvas) brushCanvas.classList.remove('brush-tab-active');
    this.active = false;
    this._drawing = false;
    this._currentStroke = null;
  },

  toggleActive() {
    this._setActive(!this.active);
  },

  _setActive(active, tab) {
    this.active = active;
    if (this.buttonEl) this.buttonEl.classList.toggle('active', active);
    if (this.panelEl)  this.panelEl.hidden = !active;

    if (active) {
      this._showTab(tab || this.activeTab || 'bucket');
      window.tools.closeAllExcept('color');
    } else {
      this._applyTabState(); // rimuove le classi sul canvas
    }
  },

  _showTab(tab) {
    this.activeTab = tab;
    if (this.panelEl) {
      this.panelEl.querySelectorAll('.color-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
      });
      this.panelEl.querySelectorAll('.color-tab-content').forEach(c => {
        c.hidden = c.dataset.tab !== tab;
      });
    }
    this._applyTabState();
  },

  /**
   * Sincronizza le classi sul card-canvas e brush-canvas in
   * base a active+activeTab.
   */
  _applyTabState() {
    const cardCanvas  = document.getElementById('card-canvas');
    const brushCanvas = document.getElementById('brush-canvas');
    const bucketOn = this.active && this.activeTab === 'bucket';
    const brushOn  = this.active && this.activeTab === 'brush';
    if (cardCanvas)  cardCanvas.classList.toggle('bucket-tab-active', bucketOn);
    if (cardCanvas)  cardCanvas.classList.toggle('brush-tab-active',  brushOn);
    if (brushCanvas) brushCanvas.classList.toggle('brush-tab-active',  brushOn);
  },

  _buildPanelHTML() {
    const swatches = COLOR_PALETTE_20.map(c => `
      <button type="button"
              class="color-swatch-big"
              data-color="${c}"
              style="background:${c}"
              title="${c}"></button>
    `).join('');

    // identica per i due tab — generata 2 volte con namespace dei selettori CSS
    const paletteSection = (extraClass) => `
      <div class="panel-section">
        <div class="panel-section-title">Colore</div>
        <div class="color-palette ${extraClass}">${swatches}</div>
        <input type="color" class="color-picker color-picker-big" value="#FF6B9D" />
      </div>
    `;

    return `
      <div class="color-tabs">
        <button type="button" class="color-tab active" data-tab="bucket" title="Secchiello">
          🪣 <span>Secchiello</span>
        </button>
        <button type="button" class="color-tab" data-tab="brush" title="Pennello">
          🖌️ <span>Pennello</span>
        </button>
      </div>

      <div class="color-tab-content" data-tab="bucket">
        ${paletteSection('palette-bucket')}
        <div class="bucket-hint">
          Clicca una zona <b>colorabile</b> del biglietto
        </div>
      </div>

      <div class="color-tab-content" data-tab="brush" hidden>
        ${paletteSection('palette-brush')}
        <div class="panel-section">
          <div class="panel-section-title">
            Dimensione <span class="brush-size-value">10</span>px
          </div>
          <input type="range" class="brush-size-slider"
                 min="2" max="40" step="1" value="10" />
        </div>
        <button type="button" class="clear-strokes-btn">
          Cancella tratti 🗑️
        </button>
      </div>
    `;
  },

  _bindPanelEvents() {
    const panel = this.panelEl;
    if (!panel) return;

    // tab switcher
    panel.querySelectorAll('.color-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        this._showTab(tabBtn.dataset.tab);
      });
    });

    // palette colori (tutti i swatch, sia bucket che brush)
    panel.querySelectorAll('.color-swatch-big').forEach(sw => {
      sw.addEventListener('click', () => {
        window.APP_STATE.currentColor = sw.dataset.color;
        this._syncPanelSelection();
      });
    });

    // color picker liberi
    panel.querySelectorAll('.color-picker-big').forEach(p => {
      p.addEventListener('input', () => {
        window.APP_STATE.currentColor = p.value;
        this._syncPanelSelection();
      });
    });

    // slider dimensione pennello
    const slider = panel.querySelector('.brush-size-slider');
    const sizeValEl = panel.querySelector('.brush-size-value');
    if (slider) {
      slider.addEventListener('input', () => {
        const size = parseInt(slider.value, 10) || 10;
        window.APP_STATE.currentBrushSize = size;
        if (sizeValEl) sizeValEl.textContent = String(size);
      });
    }

    // pulisci tratti
    const clearBtn = panel.querySelector('.clear-strokes-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.APP_STATE.brushStrokes = [];
        if (window.editor && typeof window.editor.redrawBrush === 'function') {
          window.editor.redrawBrush();
        }
      });
    }
  },

  _syncPanelSelection() {
    if (!this.panelEl) return;
    const cur = (window.APP_STATE.currentColor || '').toLowerCase();
    this.panelEl.querySelectorAll('.color-swatch-big').forEach(sw => {
      sw.classList.toggle('selected',
        (sw.dataset.color || '').toLowerCase() === cur);
    });
    this.panelEl.querySelectorAll('.color-picker-big').forEach(p => {
      p.value = window.APP_STATE.currentColor;
    });
  },

  /* -------- Secchiello: click su .colorable ---------- */

  _attachBucketHandler() {
    const cardCanvas = document.getElementById('card-canvas');
    if (!cardCanvas) return;
    if (cardCanvas._bucketHandlerAttached) return;
    cardCanvas._bucketHandlerAttached = true;

    this._bucketClickHandler = (e) => {
      if (!this.active || this.activeTab !== 'bucket') return;
      const t = e.target;
      let zone = null;
      if (t && t.classList && t.classList.contains('colorable')) {
        zone = t;
      } else if (t && typeof t.closest === 'function') {
        zone = t.closest('.colorable');
      }
      if (!zone || !zone.id) return;
      e.stopPropagation();
      if (window.editor && typeof window.editor.colorZone === 'function') {
        window.editor.colorZone(zone.id, window.APP_STATE.currentColor);
      }
    };
    cardCanvas.addEventListener('click', this._bucketClickHandler);
  },

  /* -------- Pennello: mouse + touch sul brush-canvas ---------- */

  _attachBrushHandlers() {
    const brushCanvas = document.getElementById('brush-canvas');
    if (!brushCanvas) return;
    if (brushCanvas._brushHandlersAttached) return;
    brushCanvas._brushHandlersAttached = true;

    const isBrush = () => this.active && this.activeTab === 'brush';

    const getNormCoords = (clientX, clientY) => {
      const rect = brushCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top)  / rect.height
      };
    };

    const startStroke = (clientX, clientY) => {
      const p = getNormCoords(clientX, clientY);
      if (!p) return;
      this._currentStroke = {
        color: window.APP_STATE.currentColor || '#FF6B9D',
        size:  window.APP_STATE.currentBrushSize || 10,
        points: [p]
      };
      this._drawing = true;
    };

    const addPoint = (clientX, clientY) => {
      if (!this._drawing || !this._currentStroke) return;
      const p = getNormCoords(clientX, clientY);
      if (!p) return;
      const prev = this._currentStroke.points[this._currentStroke.points.length - 1];
      this._currentStroke.points.push(p);

      // disegno incrementale dell'ultimo segmento
      const ctx = brushCanvas.getContext('2d');
      if (!ctx) return;
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this._currentStroke.color;
      ctx.lineWidth   = this._currentStroke.size;
      ctx.beginPath();
      ctx.moveTo(prev.x * brushCanvas.width, prev.y * brushCanvas.height);
      ctx.lineTo(p.x    * brushCanvas.width, p.y    * brushCanvas.height);
      ctx.stroke();
    };

    const endStroke = () => {
      if (!this._drawing) return;
      this._drawing = false;
      if (this._currentStroke && this._currentStroke.points.length > 0) {
        if (!Array.isArray(window.APP_STATE.brushStrokes)) {
          window.APP_STATE.brushStrokes = [];
        }
        // se è solo un punto, ridisegnalo per far comparire il pallino
        if (this._currentStroke.points.length === 1 &&
            window.editor && typeof window.editor._drawBrushStroke === 'function') {
          const ctx = brushCanvas.getContext('2d');
          if (ctx) window.editor._drawBrushStroke(ctx, this._currentStroke);
        }
        window.APP_STATE.brushStrokes.push(this._currentStroke);
      }
      this._currentStroke = null;
    };

    // MOUSE
    this._brushDown = (e) => {
      if (!isBrush()) return;
      e.preventDefault();
      startStroke(e.clientX, e.clientY);
    };
    this._brushMove = (e) => {
      if (!this._drawing) return;
      e.preventDefault();
      addPoint(e.clientX, e.clientY);
    };
    this._brushUp = () => {
      endStroke();
    };
    brushCanvas.addEventListener('mousedown', this._brushDown);
    document.addEventListener('mousemove', this._brushMove);
    document.addEventListener('mouseup',   this._brushUp);

    // TOUCH
    this._brushTouchStart = (e) => {
      if (!isBrush()) return;
      if (!e.touches || e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      startStroke(t.clientX, t.clientY);
    };
    this._brushTouchMove = (e) => {
      if (!this._drawing) return;
      if (!e.touches || e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      addPoint(t.clientX, t.clientY);
    };
    this._brushTouchEnd = (e) => {
      if (!this._drawing) return;
      e.preventDefault();
      endStroke();
    };
    brushCanvas.addEventListener('touchstart', this._brushTouchStart, { passive: false });
    brushCanvas.addEventListener('touchmove',  this._brushTouchMove,  { passive: false });
    brushCanvas.addEventListener('touchend',   this._brushTouchEnd,   { passive: false });
    brushCanvas.addEventListener('touchcancel',this._brushTouchEnd,   { passive: false });
  }
};

/* =======================================================
   Strumento SFONDO — replica della palette di "crea libero",
   con supporto tinta unita + gradiente a 2 colori.
   ======================================================= */

const BG_SWATCHES = [
  { c: '#FFFFFF', name: 'Bianco' },
  { c: '#FFF8F0', name: 'Crema' },
  { c: '#FFD6E7', name: 'Rosa pastello' },
  { c: '#FFF4CC', name: 'Giallo pastello' },
  { c: '#CCFFF0', name: 'Menta pastello' },
  { c: '#CCE8FF', name: 'Azzurro pastello' },
  { c: '#EDD6FF', name: 'Viola pastello' }
];

const BG_DIRECTIONS = [
  { dir: '180deg', label: '↓',  title: 'Verticale' },
  { dir: '135deg', label: '↘', title: 'Diagonale ↘' },
  { dir: '90deg',  label: '→', title: 'Orizzontale' },
  { dir: '45deg',  label: '↗', title: 'Diagonale ↗' }
];

window.tools.background = {
  buttonEl: null,
  panelEl: null,
  _docClickHandler: null,
  // stato dei controlli (separato dallo stato applicato sul canvas)
  _mode: 'solid',
  _solidColor: '#FFFFFF',
  _gradColor1: '#FFB5D8',
  _gradColor2: '#C77DFF',
  _gradDir: '135deg',

  /**
   * Aggiunge il bottone 🖼️ alla toolbar e costruisce il pannello
   * sfondo (nascosto di default). Idempotente.
   */
  init() {
    this.destroy();

    const toolbar = document.getElementById('toolbar');
    if (!toolbar) return;

    // ricostruisci lo stato dei controlli dal background attuale del template
    this._readStateFromTemplate();

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-btn';
    btn.dataset.tool = 'background';
    btn.title = 'Sfondo';
    btn.innerHTML =
      '<span class="tool-btn-icon" aria-hidden="true">🖼️</span>' +
      '<span class="tool-btn-label">Sfondo</span>';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePanel();
    });
    toolbar.appendChild(btn);
    this.buttonEl = btn;

    const panel = document.createElement('div');
    panel.id = 'panel-background';
    panel.hidden = true;
    panel.innerHTML = this._buildPanelHTML();
    panel.addEventListener('click', (e) => e.stopPropagation());
    panel.addEventListener('mousedown', (e) => e.stopPropagation());
    toolbar.appendChild(panel);
    this.panelEl = panel;

    this._bindPanelEvents();
    this._syncPanel();

    this._docClickHandler = (e) => {
      if (!this.panelEl || this.panelEl.hidden) return;
      if (this.panelEl.contains(e.target)) return;
      if (this.buttonEl && this.buttonEl.contains(e.target)) return;
      this._setOpen(false);
    };
    document.addEventListener('click', this._docClickHandler);
  },

  destroy() {
    if (this.buttonEl) { this.buttonEl.remove(); this.buttonEl = null; }
    if (this.panelEl)  { this.panelEl.remove();  this.panelEl  = null; }
    if (this._docClickHandler) {
      document.removeEventListener('click', this._docClickHandler);
      this._docClickHandler = null;
    }
  },

  togglePanel() {
    if (!this.panelEl) return;
    this._setOpen(this.panelEl.hidden);
  },

  _setOpen(open) {
    if (!this.panelEl) return;
    this.panelEl.hidden = !open;
    if (this.buttonEl) this.buttonEl.classList.toggle('active', open);
    if (open) {
      // rileggi lo stato corrente nel caso sia cambiato da undo/redo
      this._readStateFromTemplate();
      this._syncPanel();
      window.tools.closeAllExcept('background');
    }
  },

  /**
   * Interpreta state.template.background per pre-popolare i controlli
   * (rileva un linear-gradient a 2 stop, altrimenti tratta come tinta unita).
   */
  _readStateFromTemplate() {
    const tpl = window.APP_STATE && window.APP_STATE.template;
    const bg = (tpl && tpl.background) || '#FFFFFF';
    const grad = this._parseGradient(bg);
    if (grad) {
      this._mode = 'gradient';
      this._gradColor1 = grad.c1;
      this._gradColor2 = grad.c2;
      this._gradDir = grad.dir;
    } else if (/^#[0-9a-f]{3,8}$/i.test(bg.trim())) {
      this._mode = 'solid';
      this._solidColor = bg.trim();
    } else {
      // background CSS arbitrario (es. gradiente a 3 stop di un template):
      // restiamo in modalità solid ma manteniamo il default bianco nel picker
      this._mode = 'solid';
    }
  },

  /**
   * Parser permissivo per `linear-gradient(<dir>, <c1> 0%, <c2> 100%)`.
   * Ritorna null se la stringa non rispetta esattamente la forma a 2 stop.
   */
  _parseGradient(s) {
    if (typeof s !== 'string') return null;
    const m = s.trim().match(
      /^linear-gradient\(\s*([^,]+?)\s*,\s*(#[0-9a-f]{3,8})\s+0%\s*,\s*(#[0-9a-f]{3,8})\s+100%\s*\)$/i
    );
    if (!m) return null;
    return { dir: m[1].trim(), c1: m[2], c2: m[3] };
  },

  _buildPanelHTML() {
    const swatches = BG_SWATCHES.map(s => `
      <button type="button"
              class="bg-swatch"
              data-bg="${s.c}"
              style="background:${s.c}"
              title="${s.name}"></button>
    `).join('');

    const dirs = BG_DIRECTIONS.map(d => `
      <button type="button"
              class="bg-dir-btn"
              data-dir="${d.dir}"
              title="${d.title}">${d.label}</button>
    `).join('');

    return `
      <div class="bg-mode-tabs">
        <button type="button" class="bg-mode-tab" data-bg-mode="solid">🎨 <span>Tinta unita</span></button>
        <button type="button" class="bg-mode-tab" data-bg-mode="gradient">🌈 <span>Gradiente</span></button>
      </div>

      <div class="bg-mode-content" data-bg-mode="solid">
        <div class="bg-palette">
          ${swatches}
          <input type="color" class="bg-color-picker bg-solid-picker"
                 value="${this._solidColor}" title="Colore personalizzato" />
        </div>
      </div>

      <div class="bg-mode-content" data-bg-mode="gradient">
        <div class="bg-gradient-row">
          <label class="bg-gradient-color">
            <span>Colore 1</span>
            <input type="color" class="bg-grad-1" value="${this._gradColor1}" />
          </label>
          <label class="bg-gradient-color">
            <span>Colore 2</span>
            <input type="color" class="bg-grad-2" value="${this._gradColor2}" />
          </label>
        </div>
        <div class="bg-gradient-dir-row">
          <span class="bg-gradient-dir-label">Direzione</span>
          <div class="bg-gradient-dir-grid">${dirs}</div>
        </div>
        <div class="bg-gradient-preview" aria-hidden="true"></div>
      </div>
    `;
  },

  _bindPanelEvents() {
    const panel = this.panelEl;
    if (!panel) return;

    // tab solid / gradient
    panel.querySelectorAll('.bg-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const mode = tab.dataset.bgMode;
        if (mode !== 'solid' && mode !== 'gradient') return;
        if (mode === this._mode) return;
        this._mode = mode;
        this._applyBackground(true /* snapshot */);
        this._syncPanel();
      });
    });

    // swatch tinta unita
    panel.querySelectorAll('.bg-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        this._solidColor = sw.dataset.bg || '#FFFFFF';
        this._mode = 'solid';
        this._applyBackground(true);
        this._syncPanel();
      });
    });

    // color picker tinta unita: live preview senza snapshot, snapshot al commit
    const solidPicker = panel.querySelector('.bg-solid-picker');
    if (solidPicker) {
      solidPicker.addEventListener('input', () => {
        this._solidColor = solidPicker.value;
        this._mode = 'solid';
        this._applyBackground(false);
        this._highlightSwatch();
      });
      solidPicker.addEventListener('change', () => {
        this._solidColor = solidPicker.value;
        this._mode = 'solid';
        this._applyBackground(true);
        this._highlightSwatch();
      });
    }

    // gradiente colori
    const grad1 = panel.querySelector('.bg-grad-1');
    if (grad1) {
      grad1.addEventListener('input', () => {
        this._gradColor1 = grad1.value;
        this._mode = 'gradient';
        this._applyBackground(false);
        this._updatePreview();
      });
      grad1.addEventListener('change', () => {
        this._gradColor1 = grad1.value;
        this._mode = 'gradient';
        this._applyBackground(true);
      });
    }
    const grad2 = panel.querySelector('.bg-grad-2');
    if (grad2) {
      grad2.addEventListener('input', () => {
        this._gradColor2 = grad2.value;
        this._mode = 'gradient';
        this._applyBackground(false);
        this._updatePreview();
      });
      grad2.addEventListener('change', () => {
        this._gradColor2 = grad2.value;
        this._mode = 'gradient';
        this._applyBackground(true);
      });
    }

    // gradiente direzione
    panel.querySelectorAll('.bg-dir-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._gradDir = btn.dataset.dir || '135deg';
        this._mode = 'gradient';
        this._applyBackground(true);
        this._syncPanel();
      });
    });
  },

  /**
   * Costruisce la stringa CSS background dalla configurazione corrente.
   */
  _composeBg() {
    if (this._mode === 'gradient') {
      return `linear-gradient(${this._gradDir}, ${this._gradColor1} 0%, ${this._gradColor2} 100%)`;
    }
    return this._solidColor;
  },

  /**
   * Salva snapshot (se richiesto), aggiorna state.template.background
   * e il background del canvas.
   */
  _applyBackground(takeSnapshot) {
    const state = window.APP_STATE;
    if (!state) return;
    if (!state.template) state.template = {};

    if (takeSnapshot && window.editor && typeof window.editor.saveSnapshot === 'function') {
      window.editor.saveSnapshot();
    }

    const bg = this._composeBg();
    state.template.background = bg;

    const canvas = document.getElementById('card-canvas');
    if (canvas) canvas.style.background = bg;
  },

  /**
   * Allinea i controlli del pannello ai valori interni.
   */
  _syncPanel() {
    const panel = this.panelEl;
    if (!panel) return;

    panel.querySelectorAll('.bg-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.bgMode === this._mode);
    });
    panel.querySelectorAll('.bg-mode-content').forEach(c => {
      c.hidden = c.dataset.bgMode !== this._mode;
    });

    const solidPicker = panel.querySelector('.bg-solid-picker');
    if (solidPicker) solidPicker.value = this._solidColor;
    this._highlightSwatch();

    const grad1 = panel.querySelector('.bg-grad-1');
    if (grad1) grad1.value = this._gradColor1;
    const grad2 = panel.querySelector('.bg-grad-2');
    if (grad2) grad2.value = this._gradColor2;
    panel.querySelectorAll('.bg-dir-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.dir === this._gradDir);
    });

    this._updatePreview();
  },

  _highlightSwatch() {
    if (!this.panelEl) return;
    const cur = (this._solidColor || '').toLowerCase();
    this.panelEl.querySelectorAll('.bg-swatch').forEach(sw => {
      sw.classList.toggle('selected',
        (sw.dataset.bg || '').toLowerCase() === cur);
    });
  },

  _updatePreview() {
    if (!this.panelEl) return;
    const prev = this.panelEl.querySelector('.bg-gradient-preview');
    if (!prev) return;
    prev.style.background =
      `linear-gradient(${this._gradDir}, ${this._gradColor1} 0%, ${this._gradColor2} 100%)`;
  }
};
