/* =======================================================
   Studio Magico — Wizard (3 step)
   ======================================================= */

window.APP_STATE = {
  tipo: null,        // 'biglietto' | 'striscione' | 'certificato' | 'segnalibro' | 'invito' | 'colora' | 'libero'
                     // ('colora' e 'libero' sono entry-point dal menu home, non dal wizard)
  template: null,    // oggetto template scelto
  testi: {},         // { campo: 'valore', ... }
  font: 'Baloo 2'
};

const TIPI = [
  { id: 'biglietto',   nome: 'Biglietto',   emoji: '📨' },
  { id: 'striscione',  nome: 'Striscione',  emoji: '🎉' },
  { id: 'certificato', nome: 'Certificato', emoji: '🏆' },
  { id: 'segnalibro',  nome: 'Segnalibro',  emoji: '🔖' },
  { id: 'invito',      nome: 'Invito',      emoji: '✉️' }
];

const CAMPI_PER_TIPO = {
  biglietto: [
    { id: 'a_chi',      label: 'A chi?',     type: 'text',     placeholder: 'Es: Marco' },
    { id: 'messaggio',  label: 'Messaggio',  type: 'textarea', placeholder: 'Tanti auguri di cuore...' },
    { id: 'firma',      label: 'Firma',      type: 'text',     placeholder: 'Da Luca con affetto' }
  ],
  striscione: [
    { id: 'principale', label: 'Testo principale', type: 'text', placeholder: 'BUON COMPLEANNO!' },
    { id: 'secondario', label: 'Testo secondario', type: 'text', placeholder: '8 anni di festa' }
  ],
  certificato: [
    { id: 'premiato',    label: 'Nome del premiato', type: 'text',     placeholder: 'Sofia Rossi' },
    { id: 'motivazione', label: 'Motivazione',       type: 'textarea', placeholder: 'Per essere stata...' },
    { id: 'firmato_da',  label: 'Firmato da',        type: 'text',     placeholder: 'La Maestra Giulia' }
  ],
  segnalibro: [
    { id: 'nome',  label: 'Nome',            type: 'text',     placeholder: 'Anna' },
    { id: 'frase', label: 'Frase preferita', type: 'textarea', placeholder: 'I libri sono porte magiche.' }
  ],
  invito: [
    { id: 'festeggiato', label: 'Festeggiato',     type: 'text', placeholder: 'Es: Marco compie 8 anni!' },
    { id: 'quando',      label: 'Quando',          type: 'text', placeholder: 'Es: Sabato 14 giugno, ore 16:00' },
    { id: 'dove',        label: 'Dove',            type: 'text', placeholder: 'Es: A casa nostra, via Roma 12' }
  ]
};

const FONTS = [
  'Baloo 2',          // sans serif morbido (default)
  'Patrick Hand',     // scrittura a mano pulita
  'Caveat',           // scrittura a mano fluida
  'Schoolbell',       // scrittura scolastica
  'Fredoka One',      // display chunky
  'Bangers',          // fumetto/cartoon
  'Permanent Marker', // pennarello indelebile
  'Pacifico',         // script vintage
  'Princess Sofia',   // script elegante
  'Sarina'            // decorativo
];

/* ---------- STEP 1 ---------- */
function renderStep1() {
  const root = document.getElementById('step1');
  root.innerHTML = `
    <h2 class="step-title">Cosa vuoi creare oggi?</h2>
    <p class="step-subtitle">Scegli il tipo di creazione magica ✨</p>
    <div class="type-grid">
      ${TIPI.map(t => `
        <div class="type-card" data-tipo="${t.id}" role="button" tabindex="0">
          <span class="type-emoji">${t.emoji}</span>
          <span class="type-name">${t.nome}</span>
        </div>
      `).join('')}
    </div>
    <div class="nav-buttons">
      <button class="btn btn-secondary" id="btn-home-1" type="button">← Torna al menu</button>
      <button class="btn btn-primary" id="btn-next-1" disabled>Avanti →</button>
    </div>
  `;

  const btnHome = root.querySelector('#btn-home-1');
  if (btnHome) {
    btnHome.addEventListener('click', () => {
      if (window.editor && typeof window.editor._showMenu === 'function') {
        window.editor._showMenu();
      }
    });
  }

  const btnNext = root.querySelector('#btn-next-1');
  root.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('click', () => selectTipo(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectTipo(card);
      }
    });
  });

  function selectTipo(card) {
    root.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    window.APP_STATE.tipo = card.dataset.tipo;
    // se cambio tipo, azzero template e testi — riconoscendo
    // anche i template utente (che hanno il loro proprio tipo)
    const tpl = window.APP_STATE.template;
    let stillValid = false;
    if (tpl) {
      if (tpl.isUserTemplate) {
        stillValid = (tpl.tipo === window.APP_STATE.tipo);
      } else {
        const baseList = window.TEMPLATES[window.APP_STATE.tipo] || [];
        stillValid = baseList.includes(tpl);
      }
    }
    if (!stillValid) {
      window.APP_STATE.template = null;
      window.APP_STATE.testi = {};
    }
    btnNext.disabled = false;
  }

  // ripristina stato
  if (window.APP_STATE.tipo) {
    const card = root.querySelector(`[data-tipo="${window.APP_STATE.tipo}"]`);
    if (card) {
      card.classList.add('selected');
      btnNext.disabled = false;
    }
  }

  btnNext.addEventListener('click', () => goToStep(2));
}

/* ---------- STEP 2 ---------- */
function renderStep2() {
  const root = document.getElementById('step2');
  const tipo = window.APP_STATE.tipo;
  const baseTemplates = (window.TEMPLATES && window.TEMPLATES[tipo]) || [];
  const allUserTemplates = (typeof window.getUserTemplates === 'function')
    ? window.getUserTemplates() : [];
  const userTemplates = allUserTemplates.filter(t => t.tipo === tipo);
  // array combinato: gli indici delle card data-index puntano qui
  const allTemplates = baseTemplates.concat(userTemplates);

  const baseCardsHtml = baseTemplates.map((t, i) => `
    <div class="template-card"
         data-index="${i}"
         role="button"
         tabindex="0"
         style="background: ${t.background}">
      <span class="template-emoji">${t.emoji}</span>
      <span class="template-name">${escapeHtml(t.nome)}</span>
    </div>
  `).join('');

  const userCardsHtml = userTemplates.map((t, idx) => {
    const i = baseTemplates.length + idx;
    return `
      <div class="template-card user-template-card"
           data-index="${i}"
           data-user-id="${escapeHtml(t.id)}"
           role="button"
           tabindex="0"
           style="background: ${escapeHtml(t.background || '#FFF8F0')}">
        <span class="template-badge">⭐ Mio</span>
        <button type="button" class="user-tpl-delete-btn" title="Elimina" aria-label="Elimina template">🗑️</button>
        <span class="template-emoji">⭐</span>
        <span class="template-name">${escapeHtml(t.nome || 'Senza nome')}</span>
        <span class="template-category">${escapeHtml(t.categoria || 'Altro')}</span>
      </div>
    `;
  }).join('');

  const userBlockHtml = userTemplates.length > 0 ? `
    <div class="user-tpls-separator">— I tuoi template —</div>
    <div class="template-grid user-template-grid">
      ${userCardsHtml}
    </div>
  ` : '';

  root.innerHTML = `
    <h2 class="step-title">Scegli un tema</h2>
    <p class="step-subtitle">Ogni tema ha la sua magia 🎨</p>
    <div class="template-grid">
      ${baseCardsHtml}
    </div>
    ${userBlockHtml}
    <div class="nav-buttons">
      <button class="btn btn-secondary" id="btn-prev-2">← Indietro</button>
      <button class="btn btn-primary" id="btn-next-2" disabled>Avanti →</button>
    </div>
  `;

  const btnNext = root.querySelector('#btn-next-2');

  root.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // i click sul bottone di elimina e sulla conferma inline
      // non devono selezionare la card
      if (e.target && e.target.closest &&
          (e.target.closest('.user-tpl-delete-btn') ||
           e.target.closest('.card-confirm'))) return;
      selectTemplate(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectTemplate(card);
      }
    });
  });

  // gestione delete inline sulle card utente
  root.querySelectorAll('.user-tpl-delete-btn').forEach(delBtn => {
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = delBtn.closest('.template-card');
      if (!card || card.querySelector('.card-confirm')) return;
      showInlineConfirm(card);
    });
  });

  function showInlineConfirm(card) {
    const id = card.dataset.userId;
    const overlay = document.createElement('div');
    overlay.className = 'card-confirm';
    overlay.innerHTML = `
      <div class="card-confirm-msg">Eliminare?</div>
      <div class="card-confirm-actions">
        <button type="button" class="card-confirm-no">No</button>
        <button type="button" class="card-confirm-yes">Sì</button>
      </div>
    `;
    overlay.addEventListener('click', (e) => e.stopPropagation());
    card.appendChild(overlay);

    overlay.querySelector('.card-confirm-no').addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.remove();
    });
    overlay.querySelector('.card-confirm-yes').addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.deleteUserTemplate === 'function' &&
          window.deleteUserTemplate(id)) {
        // se la card eliminata era quella selezionata, azzera APP_STATE.template
        const cur = window.APP_STATE.template;
        if (cur && cur.isUserTemplate && cur.id === id) {
          window.APP_STATE.template = null;
        }
        renderStep2();
      }
    });
  }

  function selectTemplate(card) {
    root.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    window.APP_STATE.template = allTemplates[parseInt(card.dataset.index, 10)];
    btnNext.disabled = false;
  }

  // ripristina stato (match per id se template utente, per riferimento altrimenti)
  if (window.APP_STATE.template) {
    const cur = window.APP_STATE.template;
    let idx = -1;
    if (cur.isUserTemplate && cur.id) {
      idx = allTemplates.findIndex(t => t.isUserTemplate && t.id === cur.id);
    } else {
      idx = allTemplates.indexOf(cur);
    }
    if (idx >= 0) {
      const card = root.querySelector(`[data-index="${idx}"]`);
      if (card) {
        card.classList.add('selected');
        btnNext.disabled = false;
      }
    }
  }

  root.querySelector('#btn-prev-2').addEventListener('click', () => goToStep(1));
  btnNext.addEventListener('click', () => goToStep(3));
}

/* ---------- STEP 3 ---------- */
function renderStep3() {
  const root = document.getElementById('step3');
  const tipo = window.APP_STATE.tipo;
  const campi = CAMPI_PER_TIPO[tipo] || [];

  root.innerHTML = `
    <h2 class="step-title">Scrivi i tuoi testi</h2>
    <p class="step-subtitle">Le parole magiche e il font perfetto 📝</p>

    <div class="form-container">
      ${campi.map(c => {
        const val = escapeHtml(window.APP_STATE.testi[c.id] || '');
        if (c.type === 'textarea') {
          return `
            <div class="field">
              <label for="field-${c.id}">${c.label}</label>
              <textarea id="field-${c.id}" data-field="${c.id}"
                        placeholder="${escapeHtml(c.placeholder)}">${val}</textarea>
            </div>`;
        }
        return `
          <div class="field">
            <label for="field-${c.id}">${c.label}</label>
            <input type="text" id="field-${c.id}" data-field="${c.id}"
                   placeholder="${escapeHtml(c.placeholder)}"
                   value="${val}">
          </div>`;
      }).join('')}

      <div class="field">
        <label>Scegli il font</label>
        <div class="font-picker">
          ${FONTS.map(f => `
            <div class="font-option ${window.APP_STATE.font === f ? 'selected' : ''}"
                 data-font="${f}"
                 role="button"
                 tabindex="0"
                 style="font-family: '${f}', sans-serif">
              ${f}
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="nav-buttons">
      <button class="btn btn-secondary" id="btn-prev-3">← Indietro</button>
      <button class="btn btn-primary" id="btn-start-editor">Inizia a decorare! →</button>
    </div>
  `;

  // input handler
  root.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('input', () => {
      window.APP_STATE.testi[input.dataset.field] = input.value;
    });
  });

  // font picker handler
  root.querySelectorAll('.font-option').forEach(opt => {
    opt.addEventListener('click', () => selectFont(opt));
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectFont(opt);
      }
    });
  });

  function selectFont(opt) {
    root.querySelectorAll('.font-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    window.APP_STATE.font = opt.dataset.font;
  }

  root.querySelector('#btn-prev-3').addEventListener('click', () => goToStep(2));
  root.querySelector('#btn-start-editor').addEventListener('click', () => {
    if (window.editor && typeof window.editor.init === 'function') {
      window.editor.init();
    }
  });
}

/* ---------- SCHERMATA COLORA (entry-point dal menu home) ---------- */
/* file attualmente selezionato dalla galleria — resettato a ogni renderScreenColora() */
let _selectedColoraFile = null;

async function renderScreenColora() {
  const root = document.getElementById('screen-colora');
  if (!root) return;

  // reset: ogni volta che entriamo nella schermata, nessun disegno è selezionato
  _selectedColoraFile = null;

  // markup iniziale (placeholder finché non carico il manifest)
  root.innerHTML = `
    <h2 class="step-title">🎨 Scegli un disegno da colorare</h2>
    <p class="step-subtitle">Scegli dalla galleria o carica un disegno dal tuo computer</p>

    <div id="colora-gallery" class="colora-gallery" aria-live="polite">
      <p class="colora-loading">Caricamento disegni…</p>
    </div>

    <div class="colora-upload-row">
      <input type="file" id="colora-file-input"
             accept=".png,.jpg,.jpeg,.jfif,image/png,image/jpeg" hidden />
      <button type="button" class="btn btn-secondary" id="btn-colora-upload">
        📁 Carica dal computer
      </button>
    </div>

    <div class="nav-buttons">
      <button class="btn btn-secondary" id="btn-prev-colora">← Torna al menu</button>
      <button class="btn btn-primary"   id="btn-next-colora" disabled>Avanti →</button>
    </div>
  `;

  // back: torna al menu home
  root.querySelector('#btn-prev-colora').addEventListener('click', () => {
    if (window.editor && typeof window.editor._showMenu === 'function') {
      window.editor._showMenu();
    }
  });

  // Avanti: apre l'editor col disegno selezionato dalla galleria
  root.querySelector('#btn-next-colora').addEventListener('click', () => {
    if (_selectedColoraFile) {
      loadColoraDrawing(_selectedColoraFile);
    }
  });

  // upload da PC: apre l'editor direttamente (passa per il file picker)
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

  const cardsHtml = drawings.map((d) => {
    // thumb in colouring_pages/thumbs/<basename>.png se file è PNG/JPG/JFIF;
    // per SVG non c'è thumb generato (fallback all'emoji)
    const ext = (d.file.split('.').pop() || '').toLowerCase();
    const base = d.file.replace(/\.[^.]+$/, '');
    const hasThumb = ['png', 'jpg', 'jpeg', 'jfif'].includes(ext);
    const thumbUrl = hasThumb ? `colouring_pages/thumbs/${base}.png` : null;
    const visual = thumbUrl
      ? `<img class="colora-card-thumb" src="${escapeHtml(thumbUrl)}" alt="" loading="lazy" />`
      : `<span class="colora-card-emoji">${escapeHtml(d.emoji || '🎨')}</span>`;
    return `
      <div class="colora-card"
           data-file="${escapeHtml(d.file)}"
           data-category="${escapeHtml(d.category || '')}"
           role="button" tabindex="0">
        ${visual}
        <span class="colora-card-name">
          <span class="colora-card-name-emoji" aria-hidden="true">${escapeHtml(d.emoji || '')}</span>
          ${escapeHtml(d.name || d.file)}
        </span>
      </div>
    `;
  }).join('');

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

  // click su una card: seleziona il disegno (l'editor si apre col bottone Avanti).
  // Doppio click → seleziona + apre direttamente, comodo per chi sa già cosa vuole.
  gallery.querySelectorAll('.colora-card').forEach(card => {
    const select = () => {
      gallery.querySelectorAll('.colora-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      _selectedColoraFile = card.dataset.file;
      const nextBtn = document.getElementById('btn-next-colora');
      if (nextBtn) nextBtn.disabled = false;
    };
    card.addEventListener('click', select);
    card.addEventListener('dblclick', () => {
      select();
      loadColoraDrawing(card.dataset.file);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
  });
}

async function loadColoraDrawing(file) {
  if (!file) return;
  let blob;
  try {
    const res = await fetch('colouring_pages/' + file, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    blob = await res.blob();
  } catch (err) {
    alert('Impossibile caricare il disegno: ' + err.message);
    return;
  }
  let prepared;
  try {
    // rasterFileToColoringSvg accetta qualunque Blob (File estende Blob)
    prepared = await rasterFileToColoringSvg(blob);
  } catch (err) {
    alert('Impossibile caricare l\'immagine: ' + err.message);
    return;
  }
  openColoraEditor(prepared);
}

function openColoraEditor(prepared) {
  // assicura che tipo sia 'colora' (entry-point dal menu, non dal wizard)
  window.APP_STATE.tipo = 'colora';
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

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_UPLOAD_EXTS = ['png', 'jpg', 'jpeg', 'jfif'];

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
    alert('Formato non supportato. Usa PNG, JPG o JFIF.');
    return;
  }

  let prepared;
  try {
    prepared = await rasterFileToColoringSvg(file);
  } catch (err) {
    alert('Impossibile caricare l\'immagine: ' + err.message);
    return;
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

/* ---------- Navigazione ---------- */
function goToStep(n) {
  document.querySelectorAll('.wizard-step').forEach(s => {
    s.classList.remove('active');
    s.hidden = true;
  });

  const target = document.getElementById(`step${n}`);
  if (!target) return;
  target.hidden = false;
  target.classList.add('active');

  updateStepBar(n);

  if (n === 1)      renderStep1();
  else if (n === 2) renderStep2();
  else if (n === 3) renderStep3();
}

function updateStepBar(n) {
  const bar = document.querySelector('.step-bar');
  if (!bar) return;

  const config = [
    { num: 1, label: 'Tipo' },
    { num: 2, label: 'Tema' },
    { num: 3, label: 'Testi' }
  ];

  bar.innerHTML = config.map((s, i) => {
    const isLast = i === config.length - 1;
    const stepNum = i + 1;
    const cls = stepNum < n ? 'step completed'
              : stepNum === n ? 'step active'
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

function restartWizard() {
  // azzera lo stato e torna al menu home: l'utente sceglie da lì
  // se proseguire col wizard, con la modalità Colora o con Crea libero
  window.APP_STATE = {
    tipo: null,
    template: null,
    testi: {},
    font: 'Baloo 2'
  };
  if (window.editor && typeof window.editor._showMenu === 'function') {
    window.editor._showMenu();
  } else {
    // fallback per sicurezza (non dovrebbe accadere a runtime)
    document.getElementById('editor').hidden = true;
    document.getElementById('wizard').hidden = false;
    goToStep(1);
  }
}

/* ---------- Utility ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  goToStep(1);
  const btnRestart = document.getElementById('btn-restart');
  if (btnRestart) btnRestart.addEventListener('click', restartWizard);
});

// esponi per uso da altri file
window.wizard = { goToStep, restartWizard, renderScreenColora };
