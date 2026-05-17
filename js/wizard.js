/* =======================================================
   Studio Magico — Wizard (3 step)
   ======================================================= */

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
  ]
};

const FONTS = ['Baloo 2', 'Pacifico', 'Fredoka One', 'Patrick Hand'];

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

  btnNext.addEventListener('click', () => {
    if (window.APP_STATE.tipo === 'colora') {
      goToStep('colora');
    } else {
      goToStep(2);
    }
  });
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

/* ---------- Navigazione ---------- */
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

function restartWizard() {
  window.APP_STATE = {
    tipo: null,
    template: null,
    testi: {},
    font: 'Baloo 2'
  };
  document.getElementById('editor').hidden = true;
  document.getElementById('wizard').hidden = false;
  goToStep(1);
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
window.wizard = { goToStep, restartWizard };
