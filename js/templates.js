/* =======================================================
   Studio Magico — Template SVG
   5 temi (Compleanno, Natale, Animali, Spazio, Unicorno)
   per 4 tipi (biglietto, striscione, certificato, segnalibro).

   Convenzioni SVG:
   - viewBox dimensionato sul tipo:
       biglietto   800 x 533   (A5 landscape)
       striscione 1200 x 300   (4:1)
       certificato 566 x 800   (A4 portrait)
       segnalibro  267 x 800   (1:3)
   - class="template-svg" per identificare lo sfondo
   - preserveAspectRatio="none" per riempire il canvas senza letterbox
   - Sfondi con <linearGradient> in <defs>
   - Bordo decorativo (rect con stroke tratteggiato o continuo)
   - Forme colorabili con classe "colorable" + id univoco
   - Zone testo come <rect> arrotondati semitrasparenti
     (fill="white" opacity="0.4") con data-text-zone="campo1|campo2|..."
   ======================================================= */

window.TEMPLATES = {

  /* =====================================================
     BIGLIETTO  (800 x 533)
     Una sola zona testo centrale (a_chi | messaggio | firma)
     ===================================================== */
  biglietto: [

    /* --- 1. Compleanno --- */
    {
      nome: 'Compleanno',
      emoji: '🎂',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FFB5D8 50%, #FFD93D 100%)',
      coloreAccento: '#FF6B9D',
      svg: `<svg viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF6B9D"/>
            <stop offset="50%" stop-color="#FFB5D8"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#bg)"/>
        <rect x="16" y="16" width="768" height="501" rx="22" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 9" opacity="0.85"/>

        <!-- coriandoli sinistra -->
        <rect x="48" y="60"  width="10" height="16" rx="2" fill="#C77DFF" transform="rotate(20 53 68)"/>
        <rect x="80" y="120" width="9"  height="14" rx="2" fill="#FFD93D" transform="rotate(-25 84 127)"/>
        <rect x="40" y="200" width="10" height="14" rx="2" fill="#FFFFFF" transform="rotate(35 45 207)"/>
        <rect x="70" y="370" width="9"  height="14" rx="2" fill="#C77DFF" transform="rotate(-20 74 377)"/>
        <rect x="40" y="450" width="9"  height="14" rx="2" fill="#FFD93D" transform="rotate(15 44 457)"/>

        <!-- coriandoli destra -->
        <rect x="725" y="80"  width="10" height="14" rx="2" fill="#FFFFFF" transform="rotate(40 730 87)"/>
        <rect x="745" y="240" width="9"  height="14" rx="2" fill="#C77DFF" transform="rotate(-15 749 247)"/>
        <rect x="720" y="430" width="10" height="14" rx="2" fill="#FFD93D" transform="rotate(20 725 437)"/>
        <rect x="700" y="490" width="9"  height="14" rx="2" fill="#FFFFFF" transform="rotate(-30 704 497)"/>

        <!-- stelline sparse -->
        <path d="M 105 95 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFFFFF" opacity="0.9"/>
        <path d="M 690 380 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFFFFF" opacity="0.9"/>
        <path d="M 60 280 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF" opacity="0.8"/>

        <!-- palloncini (top-right) -->
        <ellipse id="bd-balloon-1" class="colorable" cx="720" cy="130" rx="34" ry="42" fill="#C77DFF"/>
        <polygon points="720,172 715,178 725,178" fill="#C77DFF"/>
        <path d="M 720 178 Q 728 220 712 260 Q 724 300 718 340" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>
        <ellipse id="bd-balloon-2" class="colorable" cx="648" cy="170" rx="28" ry="35" fill="#FFFFFF"/>
        <polygon points="648,205 644,211 652,211" fill="#FFFFFF"/>
        <path d="M 648 211 Q 654 250 640 290 Q 650 325 645 350" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>

        <!-- torta (bottom-left) -->
        <ellipse cx="170" cy="470" rx="120" ry="10" fill="#2A2438" opacity="0.18"/>
        <rect id="bd-cake-bot" class="colorable" x="80"  y="395" width="180" height="68" rx="8" fill="#FFFFFF"/>
        <path d="M 80 410 q 18 14 36 0 q 18 16 36 0 q 18 16 36 0 q 18 16 36 0 q 18 14 36 0 l 0 5 l -180 0 z" fill="#FF6B9D"/>
        <rect id="bd-cake-mid" class="colorable" x="108" y="338" width="124" height="58" rx="8" fill="#FFB5D8"/>
        <path d="M 108 353 q 16 10 31 0 q 16 14 31 0 q 16 14 31 0 q 16 10 31 0 l 0 5 l -124 0 z" fill="#C77DFF"/>
        <rect id="bd-cake-top" class="colorable" x="135" y="290" width="70" height="50" rx="8" fill="#FFFFFF"/>
        <rect x="165" y="258" width="10" height="32" rx="2" fill="#FF6B9D"/>
        <ellipse cx="170" cy="248" rx="6" ry="11" fill="#FFD93D"/>
        <ellipse cx="170" cy="251" rx="3" ry="6"  fill="#FF9A3C"/>

        <!-- zona testo -->
        <rect data-text-zone="a_chi|messaggio|firma" x="280" y="150" width="420" height="230" rx="24" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    },

    /* --- 2. Natale --- */
    {
      nome: 'Natale',
      emoji: '🎄',
      background: 'linear-gradient(180deg, #1E5F3F 0%, #2E7D5A 60%, #E63946 100%)',
      coloreAccento: '#E63946',
      svg: `<svg viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1E5F3F"/>
            <stop offset="55%" stop-color="#2E7D5A"/>
            <stop offset="100%" stop-color="#E63946"/>
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#bg)"/>
        <rect x="16" y="16" width="768" height="501" rx="22" fill="none" stroke="#FFD700" stroke-width="3" stroke-dasharray="6 6" opacity="0.85"/>

        <!-- fiocchi di neve a 6 punte -->
        <g stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round">
          <g transform="translate(110 90)">
            <line x1="-14" y1="0" x2="14" y2="0"/><line x1="0" y1="-14" x2="0" y2="14"/>
            <line x1="-10" y1="-10" x2="10" y2="10"/><line x1="-10" y1="10" x2="10" y2="-10"/>
          </g>
          <g transform="translate(700 110)">
            <line x1="-12" y1="0" x2="12" y2="0"/><line x1="0" y1="-12" x2="0" y2="12"/>
            <line x1="-8" y1="-8" x2="8" y2="8"/><line x1="-8" y1="8" x2="8" y2="-8"/>
          </g>
          <g transform="translate(80 220)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
          <g transform="translate(740 260)">
            <line x1="-9" y1="0" x2="9" y2="0"/><line x1="0" y1="-9" x2="0" y2="9"/>
            <line x1="-6" y1="-6" x2="6" y2="6"/><line x1="-6" y1="6" x2="6" y2="-6"/>
          </g>
        </g>

        <!-- albero di Natale (left) -->
        <polygon id="bn-tree-top"    class="colorable" points="140,140 90,225 190,225" fill="#3A8C5C"/>
        <polygon id="bn-tree-mid"    class="colorable" points="140,200 75,290 205,290" fill="#3A8C5C"/>
        <polygon id="bn-tree-bot"    class="colorable" points="140,265 60,360 220,360" fill="#3A8C5C"/>
        <rect x="128" y="358" width="24" height="34" fill="#6B3F1D"/>
        <!-- palline e stella -->
        <circle cx="140" cy="135" r="0"/>
        <polygon points="140,108 146,124 162,124 149,134 154,150 140,140 126,150 131,134 118,124 134,124" fill="#FFD700"/>
        <circle cx="115" cy="215" r="6" fill="#E63946"/>
        <circle cx="160" cy="200" r="5" fill="#FFD700"/>
        <circle cx="95"  cy="275" r="6" fill="#FFD700"/>
        <circle cx="175" cy="270" r="6" fill="#E63946"/>
        <circle cx="135" cy="245" r="5" fill="#FFFFFF"/>
        <circle cx="85"  cy="340" r="7" fill="#E63946"/>
        <circle cx="195" cy="335" r="6" fill="#FFD700"/>
        <circle cx="140" cy="320" r="5" fill="#FFFFFF"/>

        <!-- pacchi regalo (bottom-right) -->
        <rect id="bn-gift-1" class="colorable" x="600" y="400" width="80" height="65" rx="4" fill="#E63946"/>
        <rect x="635" y="400" width="10" height="65" fill="#FFD700"/>
        <rect x="600" y="427" width="80" height="10" fill="#FFD700"/>
        <path d="M 638 400 q -10 -16 -22 -6 q 6 6 22 6 q 16 0 22 -6 q -12 -10 -22 6 z" fill="#FFD700"/>

        <rect id="bn-gift-2" class="colorable" x="690" y="425" width="60" height="42" rx="4" fill="#FFD700"/>
        <rect x="715" y="425" width="8" height="42" fill="#E63946"/>
        <rect x="690" y="442" width="60" height="8" fill="#E63946"/>

        <!-- neve in basso -->
        <path d="M 0 510 q 100 -30 200 0 q 100 30 200 0 q 100 -30 200 0 q 100 30 200 0 l 0 23 l -800 0 z" fill="#FFFFFF" opacity="0.85"/>

        <!-- zona testo -->
        <rect data-text-zone="a_chi|messaggio|firma" x="260" y="130" width="410" height="240" rx="24" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    },

    /* --- 3. Animali --- */
    {
      nome: 'Animali',
      emoji: '🦊',
      background: 'linear-gradient(180deg, #A8DCFF 0%, #C8F0D8 60%, #FFD93D 100%)',
      coloreAccento: '#FF9A3C',
      svg: `<svg viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#A8DCFF"/>
            <stop offset="60%" stop-color="#C8F0D8"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#bg)"/>
        <rect x="16" y="16" width="768" height="501" rx="22" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="3 7" opacity="0.85"/>

        <!-- nuvole arrotondate -->
        <g fill="#FFFFFF" opacity="0.85">
          <ellipse cx="120" cy="85" rx="38" ry="20"/>
          <ellipse cx="150" cy="70" rx="28" ry="18"/>
          <ellipse cx="90"  cy="78" rx="26" ry="16"/>
          <ellipse cx="680" cy="105" rx="42" ry="22"/>
          <ellipse cx="715" cy="92"  rx="28" ry="18"/>
          <ellipse cx="650" cy="98"  rx="26" ry="16"/>
        </g>

        <!-- alberi stilizzati (sinistra) -->
        <rect x="60"  y="370" width="16" height="55" fill="#8B5A2B"/>
        <circle id="ba-tree-1" class="colorable" cx="68"  cy="355" r="42" fill="#5ECFB1"/>
        <rect x="140" y="385" width="14" height="45" fill="#8B5A2B"/>
        <circle id="ba-tree-2" class="colorable" cx="147" cy="372" r="34" fill="#3A8C5C"/>

        <!-- alberi stilizzati (destra) -->
        <rect x="700" y="380" width="16" height="50" fill="#8B5A2B"/>
        <circle id="ba-tree-3" class="colorable" cx="708" cy="365" r="38" fill="#3A8C5C"/>

        <!-- volpe geometrica (bottom-center-left) -->
        <g id="fox">
          <!-- corpo -->
          <polygon id="ba-fox-body" class="colorable" points="180,440 280,440 290,470 170,470" fill="#FF9A3C"/>
          <!-- testa -->
          <polygon id="ba-fox-head" class="colorable" points="200,400 260,400 245,445 215,445" fill="#FF9A3C"/>
          <!-- orecchie -->
          <polygon points="200,400 188,376 210,388" fill="#FF9A3C"/>
          <polygon points="260,400 272,376 250,388" fill="#FF9A3C"/>
          <polygon points="200,400 196,386 207,392" fill="#FFFFFF"/>
          <polygon points="260,400 264,386 253,392" fill="#FFFFFF"/>
          <!-- muso bianco -->
          <polygon points="215,425 245,425 235,448 225,448" fill="#FFFFFF"/>
          <!-- naso -->
          <polygon points="230,438 226,432 234,432" fill="#2A2438"/>
          <!-- occhi -->
          <circle cx="218" cy="418" r="3" fill="#2A2438"/>
          <circle cx="242" cy="418" r="3" fill="#2A2438"/>
          <!-- coda -->
          <polygon points="290,455 320,425 330,460" fill="#FF9A3C"/>
          <polygon points="318,440 330,432 330,460" fill="#FFFFFF"/>
        </g>

        <!-- fiori semplici -->
        <g transform="translate(420 460)">
          <circle cx="0" cy="0" r="6" fill="#FF6B9D"/>
          <circle cx="-8" cy="-4" r="6" fill="#FF6B9D"/>
          <circle cx="8"  cy="-4" r="6" fill="#FF6B9D"/>
          <circle cx="-5" cy="6"  r="6" fill="#FF6B9D"/>
          <circle cx="5"  cy="6"  r="6" fill="#FF6B9D"/>
          <circle cx="0" cy="0" r="3" fill="#FFD93D"/>
        </g>
        <g transform="translate(480 480)">
          <circle cx="0" cy="0" r="5" fill="#C77DFF"/>
          <circle cx="-7" cy="-3" r="5" fill="#C77DFF"/>
          <circle cx="7"  cy="-3" r="5" fill="#C77DFF"/>
          <circle cx="-4" cy="5"  r="5" fill="#C77DFF"/>
          <circle cx="4"  cy="5"  r="5" fill="#C77DFF"/>
          <circle cx="0" cy="0" r="2.5" fill="#FFD93D"/>
        </g>
        <g transform="translate(560 465)">
          <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
          <circle cx="-8" cy="-4" r="6" fill="#FFFFFF"/>
          <circle cx="8"  cy="-4" r="6" fill="#FFFFFF"/>
          <circle cx="-5" cy="6"  r="6" fill="#FFFFFF"/>
          <circle cx="5"  cy="6"  r="6" fill="#FFFFFF"/>
          <circle cx="0" cy="0" r="3" fill="#FF9A3C"/>
        </g>

        <!-- zona testo -->
        <rect data-text-zone="a_chi|messaggio|firma" x="240" y="140" width="430" height="220" rx="24" fill="#FFFFFF" opacity="0.55"/>
      </svg>`
    },

    /* --- 4. Spazio --- */
    {
      nome: 'Spazio',
      emoji: '🚀',
      background: 'linear-gradient(180deg, #0F1438 0%, #1A1F4E 60%, #7E3FA8 100%)',
      coloreAccento: '#7E3FA8',
      svg: `<svg viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#0F1438"/>
            <stop offset="60%" stop-color="#1A1F4E"/>
            <stop offset="100%" stop-color="#7E3FA8"/>
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#bg)"/>
        <rect x="16" y="16" width="768" height="501" rx="22" fill="none" stroke="#FFD93D" stroke-width="3" stroke-dasharray="2 10" opacity="0.7"/>

        <!-- stelle di varie dimensioni -->
        <g fill="#FFFFFF">
          <circle cx="80"  cy="60"  r="2"/>
          <circle cx="160" cy="100" r="1.5"/>
          <circle cx="220" cy="50"  r="2.5"/>
          <circle cx="60"  cy="180" r="1.5"/>
          <circle cx="140" cy="240" r="2"/>
          <circle cx="40"  cy="300" r="1.5"/>
          <circle cx="180" cy="350" r="2"/>
          <circle cx="100" cy="430" r="1.5"/>
          <circle cx="540" cy="80"  r="2"/>
          <circle cx="620" cy="40"  r="1.5"/>
          <circle cx="700" cy="100" r="2"/>
          <circle cx="760" cy="180" r="1.5"/>
          <circle cx="630" cy="260" r="2"/>
          <circle cx="720" cy="340" r="1.5"/>
          <circle cx="780" cy="420" r="2"/>
          <circle cx="640" cy="470" r="1.5"/>
        </g>
        <!-- stelle a 4 punte -->
        <g fill="#FFD93D">
          <path d="M 110 130 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 250 200 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 680 200 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 60 460 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
        </g>

        <!-- luna crescente (top-right) -->
        <circle cx="700" cy="120" r="46" fill="#FFD93D"/>
        <circle cx="718" cy="112" r="42" fill="#1A1F4E"/>

        <!-- meteore (linee con testa) -->
        <g stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.85">
          <line x1="60"  y1="30"  x2="120" y2="60"/>
          <line x1="540" y1="320" x2="600" y2="360"/>
        </g>
        <circle cx="120" cy="60"  r="3" fill="#FFFFFF"/>
        <circle cx="600" cy="360" r="3" fill="#FFFFFF"/>

        <!-- pianeti -->
        <g id="planet1">
          <circle id="bs-planet-1" class="colorable" cx="120" cy="370" r="40" fill="#FF6B9D"/>
          <ellipse cx="120" cy="370" rx="62" ry="10" fill="none" stroke="#FFD93D" stroke-width="3" transform="rotate(-18 120 370)"/>
        </g>
        <circle id="bs-planet-2" class="colorable" cx="260" cy="450" r="22" fill="#6BAEFF"/>
        <circle id="bs-planet-3" class="colorable" cx="610" cy="450" r="28" fill="#C77DFF"/>

        <!-- razzo (bottom-right) -->
        <g id="rocket" transform="translate(700 350) rotate(-15 0 60)">
          <ellipse id="bs-rocket-body" class="colorable" cx="0" cy="40" rx="18" ry="50" fill="#FFFFFF"/>
          <polygon points="0,-15 -16,15 16,15" fill="#E63946"/>
          <circle cx="0" cy="30" r="7" fill="#6BAEFF" stroke="#2A2438" stroke-width="2"/>
          <polygon points="-18,60 -32,90 -10,75" fill="#E63946"/>
          <polygon points="18,60  32,90  10,75" fill="#E63946"/>
          <polygon points="-6,90 6,90 4,108 -4,108" fill="#FFD93D"/>
          <polygon points="-3,108 3,108 0,118" fill="#FF9A3C"/>
        </g>

        <!-- zona testo -->
        <rect data-text-zone="a_chi|messaggio|firma" x="250" y="140" width="400" height="230" rx="24" fill="#FFFFFF" opacity="0.38"/>
      </svg>`
    },

    /* --- 5. Unicorno --- */
    {
      nome: 'Unicorno',
      emoji: '🦄',
      background: 'linear-gradient(135deg, #FFB5D8 0%, #C77DFF 50%, #A8DCFF 100%)',
      coloreAccento: '#C77DFF',
      svg: `<svg viewBox="0 0 800 533" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stop-color="#FFB5D8"/>
            <stop offset="50%" stop-color="#C77DFF"/>
            <stop offset="100%" stop-color="#A8DCFF"/>
          </linearGradient>
        </defs>
        <rect width="800" height="533" fill="url(#bg)"/>
        <rect x="16" y="16" width="768" height="501" rx="22" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 8" opacity="0.85"/>

        <!-- arcobaleno (top-right) -->
        <g transform="translate(700 533)" fill="none" stroke-width="14">
          <path d="M -200 0 A 200 200 0 0 1 200 0" stroke="#FF6B9D"/>
          <path d="M -186 0 A 186 186 0 0 1 186 0" stroke="#FF9A3C"/>
          <path d="M -172 0 A 172 172 0 0 1 172 0" stroke="#FFD93D"/>
          <path d="M -158 0 A 158 158 0 0 1 158 0" stroke="#5ECFB1"/>
          <path d="M -144 0 A 144 144 0 0 1 144 0" stroke="#6BAEFF"/>
          <path d="M -130 0 A 130 130 0 0 1 130 0" stroke="#C77DFF"/>
        </g>

        <!-- nuvole -->
        <g fill="#FFFFFF" opacity="0.9">
          <ellipse cx="120" cy="100" rx="42" ry="20"/>
          <ellipse cx="152" cy="86"  rx="28" ry="18"/>
          <ellipse cx="90"  cy="92"  rx="26" ry="16"/>
          <ellipse cx="540" cy="80"  rx="34" ry="16"/>
          <ellipse cx="570" cy="68"  rx="22" ry="14"/>
        </g>

        <!-- unicorno (bottom-left) -->
        <g id="unicorn" transform="translate(180 380)">
          <!-- corpo -->
          <ellipse id="bu-body" class="colorable" cx="0" cy="0" rx="80" ry="42" fill="#FFFFFF"/>
          <!-- zampe -->
          <rect x="-55" y="30" width="14" height="55" rx="4" fill="#FFFFFF"/>
          <rect x="-30" y="35" width="14" height="50" rx="4" fill="#FFFFFF"/>
          <rect x="20"  y="35" width="14" height="50" rx="4" fill="#FFFFFF"/>
          <rect x="48"  y="30" width="14" height="55" rx="4" fill="#FFFFFF"/>
          <!-- collo -->
          <polygon points="50,-25 64,-65 78,-50 62,-10" fill="#FFFFFF"/>
          <!-- testa -->
          <ellipse cx="80" cy="-65" rx="22" ry="16" fill="#FFFFFF"/>
          <!-- orecchio -->
          <polygon points="74,-78 70,-92 82,-82" fill="#FFFFFF"/>
          <!-- corno -->
          <polygon id="bu-horn" class="colorable" points="84,-82 86,-115 90,-82" fill="#FFD93D"/>
          <!-- occhio -->
          <circle cx="88" cy="-65" r="2.5" fill="#2A2438"/>
          <!-- criniera arcobaleno -->
          <path id="bu-mane-1" class="colorable" d="M 70 -75 q -25 -8 -38 8 q -10 16 0 28 q -8 12 4 24 q 14 8 28 -2" fill="#FF6B9D"/>
          <path id="bu-mane-2" class="colorable" d="M 56 -45 q -22 0 -28 14 q -4 14 8 22 q 14 8 26 0" fill="#C77DFF"/>
          <path id="bu-mane-3" class="colorable" d="M 50 -20 q -18 4 -22 16 q 0 12 12 18 q 14 4 22 -4" fill="#A8DCFF"/>
          <!-- coda -->
          <path d="M -78 -10 q -28 -4 -36 18 q -4 22 14 30 q 14 4 24 -8 q -16 -16 -2 -40 z" fill="#FF6B9D"/>
          <path d="M -82 4 q -22 4 -28 22 q 4 18 22 22 q 12 0 18 -10" fill="#FFD93D"/>
        </g>

        <!-- cuori e stelline sparse -->
        <path d="M 470 220 q -10 -12 -20 -2 q -8 12 20 30 q 28 -18 20 -30 q -10 -10 -20 2 z" fill="#FF6B9D"/>
        <path d="M 720 280 q -8 -10 -16 -2 q -6 10 16 24 q 22 -14 16 -24 q -8 -8 -16 2 z" fill="#FFFFFF"/>
        <path d="M 100 460 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFD93D"/>
        <path d="M 470 460 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFFFFF"/>

        <!-- zona testo -->
        <rect data-text-zone="a_chi|messaggio|firma" x="290" y="130" width="400" height="230" rx="24" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    }
  ],

  /* =====================================================
     STRISCIONE  (1200 x 300)
     Una sola zona testo orizzontale (principale | secondario)
     ===================================================== */
  striscione: [

    /* --- 1. Compleanno --- */
    {
      nome: 'Compleanno',
      emoji: '🎂',
      background: 'linear-gradient(90deg, #FF6B9D 0%, #FFD93D 100%)',
      coloreAccento: '#FF6B9D',
      svg: `<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF6B9D"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#bg)"/>
        <rect x="12" y="12" width="1176" height="276" rx="18" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 9" opacity="0.85"/>

        <!-- coriandoli sparse -->
        <g>
          <rect x="60"  y="40"  width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(20 64 47)"/>
          <rect x="160" y="60"  width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(-30 164 67)"/>
          <rect x="50"  y="240" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(15 54 247)"/>
          <rect x="1040" y="50" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(40 1044 57)"/>
          <rect x="1130" y="220" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(-25 1134 227)"/>
          <rect x="1080" y="250" width="9" height="14" rx="2" fill="#FFD93D" transform="rotate(10 1084 257)"/>
        </g>

        <!-- palloncini sinistra -->
        <ellipse id="sd-balloon-1" class="colorable" cx="110" cy="100" rx="28" ry="36" fill="#C77DFF"/>
        <polygon points="110,136 106,142 114,142" fill="#C77DFF"/>
        <path d="M 110 142 Q 120 200 100 260" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>
        <ellipse id="sd-balloon-2" class="colorable" cx="62" cy="140" rx="22" ry="28" fill="#FFFFFF"/>
        <polygon points="62,168 58,174 66,174" fill="#FFFFFF"/>
        <path d="M 62 174 Q 70 220 56 270" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>

        <!-- torta (destra) -->
        <ellipse cx="1090" cy="240" rx="90" ry="8" fill="#2A2438" opacity="0.18"/>
        <rect id="sd-cake-bot" class="colorable" x="1020" y="195" width="140" height="42" rx="6" fill="#FFFFFF"/>
        <path d="M 1020 207 q 14 10 28 0 q 14 12 28 0 q 14 12 28 0 q 14 12 28 0 q 14 10 28 0 l 0 4 l -140 0 z" fill="#FF6B9D"/>
        <rect id="sd-cake-top" class="colorable" x="1050" y="150" width="80" height="42" rx="6" fill="#FFB5D8"/>
        <rect x="1086" y="125" width="8" height="26" rx="2" fill="#FF6B9D"/>
        <ellipse cx="1090" cy="118" rx="5" ry="9" fill="#FFD93D"/>

        <!-- stelle sparse -->
        <path d="M 200 50 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF" opacity="0.85"/>
        <path d="M 970 70 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF" opacity="0.85"/>

        <!-- zona testo -->
        <rect data-text-zone="principale|secondario" x="220" y="55" width="760" height="190" rx="22" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    },

    /* --- 2. Natale --- */
    {
      nome: 'Natale',
      emoji: '🎄',
      background: 'linear-gradient(90deg, #1E5F3F 0%, #2E7D5A 50%, #E63946 100%)',
      coloreAccento: '#E63946',
      svg: `<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stop-color="#1E5F3F"/>
            <stop offset="55%" stop-color="#2E7D5A"/>
            <stop offset="100%" stop-color="#E63946"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#bg)"/>
        <rect x="12" y="12" width="1176" height="276" rx="18" fill="none" stroke="#FFD700" stroke-width="3" stroke-dasharray="6 6" opacity="0.85"/>

        <!-- albero sinistra -->
        <polygon id="sn-tree-top" class="colorable" points="110,40 70,110 150,110" fill="#3A8C5C"/>
        <polygon id="sn-tree-mid" class="colorable" points="110,90 55,170 165,170" fill="#3A8C5C"/>
        <polygon id="sn-tree-bot" class="colorable" points="110,150 40,235 180,235" fill="#3A8C5C"/>
        <rect x="100" y="233" width="20" height="28" fill="#6B3F1D"/>
        <polygon points="110,10 116,26 132,26 119,36 124,52 110,42 96,52 101,36 88,26 104,26" fill="#FFD700"/>
        <circle cx="90"  cy="95"  r="5" fill="#E63946"/>
        <circle cx="130" cy="105" r="5" fill="#FFD700"/>
        <circle cx="80"  cy="160" r="5" fill="#FFD700"/>
        <circle cx="140" cy="155" r="5" fill="#E63946"/>
        <circle cx="65"  cy="220" r="6" fill="#E63946"/>
        <circle cx="155" cy="225" r="5" fill="#FFD700"/>

        <!-- fiocchi neve -->
        <g stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round">
          <g transform="translate(250 90)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
          <g transform="translate(950 110)">
            <line x1="-9" y1="0" x2="9" y2="0"/><line x1="0" y1="-9" x2="0" y2="9"/>
            <line x1="-6" y1="-6" x2="6" y2="6"/><line x1="-6" y1="6" x2="6" y2="-6"/>
          </g>
          <g transform="translate(1080 80)">
            <line x1="-8" y1="0" x2="8" y2="0"/><line x1="0" y1="-8" x2="0" y2="8"/>
            <line x1="-5" y1="-5" x2="5" y2="5"/><line x1="-5" y1="5" x2="5" y2="-5"/>
          </g>
        </g>

        <!-- pacchi regalo destra -->
        <rect id="sn-gift-1" class="colorable" x="1020" y="180" width="78" height="62" rx="4" fill="#E63946"/>
        <rect x="1054" y="180" width="10" height="62" fill="#FFD700"/>
        <rect x="1020" y="206" width="78" height="10" fill="#FFD700"/>
        <rect id="sn-gift-2" class="colorable" x="1110" y="205" width="60" height="38" rx="4" fill="#FFD700"/>
        <rect x="1135" y="205" width="8" height="38" fill="#E63946"/>
        <rect x="1110" y="220" width="60" height="8" fill="#E63946"/>

        <!-- neve in basso -->
        <path d="M 0 280 q 150 -20 300 0 q 150 20 300 0 q 150 -20 300 0 q 150 20 300 0 l 0 20 l -1200 0 z" fill="#FFFFFF" opacity="0.85"/>

        <!-- zona testo -->
        <rect data-text-zone="principale|secondario" x="220" y="55" width="760" height="180" rx="22" fill="#FFFFFF" opacity="0.4"/>
      </svg>`
    },

    /* --- 3. Animali --- */
    {
      nome: 'Animali',
      emoji: '🦊',
      background: 'linear-gradient(90deg, #A8DCFF 0%, #C8F0D8 50%, #FFD93D 100%)',
      coloreAccento: '#FF9A3C',
      svg: `<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stop-color="#A8DCFF"/>
            <stop offset="55%" stop-color="#C8F0D8"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#bg)"/>
        <rect x="12" y="12" width="1176" height="276" rx="18" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="3 7" opacity="0.85"/>

        <!-- nuvole -->
        <g fill="#FFFFFF" opacity="0.9">
          <ellipse cx="200" cy="50" rx="38" ry="16"/>
          <ellipse cx="230" cy="40" rx="24" ry="14"/>
          <ellipse cx="900" cy="50" rx="34" ry="16"/>
          <ellipse cx="930" cy="40" rx="22" ry="14"/>
        </g>

        <!-- alberi sinistra -->
        <rect x="46" y="190" width="14" height="50" fill="#8B5A2B"/>
        <circle id="sa-tree-1" class="colorable" cx="53"  cy="175" r="36" fill="#3A8C5C"/>
        <rect x="120" y="200" width="12" height="40" fill="#8B5A2B"/>
        <circle id="sa-tree-2" class="colorable" cx="126" cy="190" r="28" fill="#5ECFB1"/>

        <!-- volpe (sinistra-basso) -->
        <g id="fox" transform="translate(60 245)">
          <polygon id="sa-fox-body" class="colorable" points="0,0 80,0 84,20 -4,20" fill="#FF9A3C"/>
          <polygon id="sa-fox-head" class="colorable" points="14,-30 60,-30 50,5 24,5" fill="#FF9A3C"/>
          <polygon points="14,-30 6,-50 22,-42" fill="#FF9A3C"/>
          <polygon points="60,-30 68,-50 52,-42" fill="#FF9A3C"/>
          <polygon points="22,-12 52,-12 42,8 32,8" fill="#FFFFFF"/>
          <circle cx="24" cy="-18" r="2.5" fill="#2A2438"/>
          <circle cx="50" cy="-18" r="2.5" fill="#2A2438"/>
          <polygon points="37,0 34,-4 40,-4" fill="#2A2438"/>
          <polygon points="84,8 110,-12 116,18" fill="#FF9A3C"/>
          <polygon points="108,-2 116,-8 116,18" fill="#FFFFFF"/>
        </g>

        <!-- alberi destra -->
        <rect x="1070" y="195" width="14" height="50" fill="#8B5A2B"/>
        <circle id="sa-tree-3" class="colorable" cx="1077" cy="180" r="36" fill="#5ECFB1"/>
        <rect x="1140" y="200" width="12" height="40" fill="#8B5A2B"/>
        <circle id="sa-tree-4" class="colorable" cx="1146" cy="190" r="28" fill="#3A8C5C"/>

        <!-- fiori in basso -->
        <g transform="translate(280 265)">
          <circle cx="0" cy="0" r="5" fill="#FF6B9D"/>
          <circle cx="-7" cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="7"  cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="-4" cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="4"  cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="0" cy="0" r="2.5" fill="#FFD93D"/>
        </g>
        <g transform="translate(950 270)">
          <circle cx="0" cy="0" r="5" fill="#C77DFF"/>
          <circle cx="-7" cy="-3" r="5" fill="#C77DFF"/>
          <circle cx="7"  cy="-3" r="5" fill="#C77DFF"/>
          <circle cx="-4" cy="5"  r="5" fill="#C77DFF"/>
          <circle cx="4"  cy="5"  r="5" fill="#C77DFF"/>
          <circle cx="0" cy="0" r="2.5" fill="#FFD93D"/>
        </g>

        <!-- zona testo -->
        <rect data-text-zone="principale|secondario" x="230" y="60" width="740" height="180" rx="22" fill="#FFFFFF" opacity="0.55"/>
      </svg>`
    },

    /* --- 4. Spazio --- */
    {
      nome: 'Spazio',
      emoji: '🚀',
      background: 'linear-gradient(90deg, #0F1438 0%, #1A1F4E 50%, #7E3FA8 100%)',
      coloreAccento: '#7E3FA8',
      svg: `<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stop-color="#0F1438"/>
            <stop offset="55%" stop-color="#1A1F4E"/>
            <stop offset="100%" stop-color="#7E3FA8"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#bg)"/>
        <rect x="12" y="12" width="1176" height="276" rx="18" fill="none" stroke="#FFD93D" stroke-width="3" stroke-dasharray="2 10" opacity="0.7"/>

        <!-- stelle puntini -->
        <g fill="#FFFFFF">
          <circle cx="80"  cy="40"  r="1.5"/>
          <circle cx="150" cy="80"  r="2"/>
          <circle cx="220" cy="50"  r="1.5"/>
          <circle cx="50"  cy="120" r="2"/>
          <circle cx="190" cy="160" r="1.5"/>
          <circle cx="60"  cy="220" r="2"/>
          <circle cx="160" cy="250" r="1.5"/>
          <circle cx="290" cy="200" r="1.5"/>
          <circle cx="940" cy="40"  r="2"/>
          <circle cx="1020" cy="80" r="1.5"/>
          <circle cx="1100" cy="50" r="2"/>
          <circle cx="970"  cy="160" r="1.5"/>
          <circle cx="1140" cy="180" r="2"/>
          <circle cx="1050" cy="220" r="1.5"/>
          <circle cx="900"  cy="240" r="2"/>
        </g>
        <g fill="#FFD93D">
          <path d="M 120 130 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 1080 130 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
        </g>

        <!-- luna sinistra -->
        <circle cx="80" cy="80" r="36" fill="#FFD93D"/>
        <circle cx="94" cy="74" r="32" fill="#1A1F4E"/>

        <!-- pianeti sinistra -->
        <circle id="ss-planet-1" class="colorable" cx="70"  cy="220" r="30" fill="#FF6B9D"/>
        <ellipse cx="70" cy="220" rx="48" ry="7" fill="none" stroke="#FFD93D" stroke-width="2.5" transform="rotate(-18 70 220)"/>

        <!-- pianeti destra -->
        <circle id="ss-planet-2" class="colorable" cx="1140" cy="200" r="22" fill="#C77DFF"/>
        <circle id="ss-planet-3" class="colorable" cx="1080" cy="250" r="14" fill="#6BAEFF"/>

        <!-- razzo destra -->
        <g id="rocket" transform="translate(1100 90) rotate(-15 0 50)">
          <ellipse id="ss-rocket-body" class="colorable" cx="0" cy="30" rx="14" ry="40" fill="#FFFFFF"/>
          <polygon points="0,-12 -12,10 12,10" fill="#E63946"/>
          <circle cx="0" cy="24" r="6" fill="#6BAEFF" stroke="#2A2438" stroke-width="2"/>
          <polygon points="-14,48 -26,72 -8,60" fill="#E63946"/>
          <polygon points="14,48  26,72  8,60" fill="#E63946"/>
          <polygon points="-5,72 5,72 3,86 -3,86" fill="#FFD93D"/>
          <polygon points="-3,86 3,86 0,94" fill="#FF9A3C"/>
        </g>

        <!-- meteora -->
        <line x1="270" y1="40" x2="330" y2="70" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
        <circle cx="330" cy="70" r="3" fill="#FFFFFF"/>

        <!-- zona testo -->
        <rect data-text-zone="principale|secondario" x="220" y="55" width="760" height="190" rx="22" fill="#FFFFFF" opacity="0.38"/>
      </svg>`
    },

    /* --- 5. Unicorno --- */
    {
      nome: 'Unicorno',
      emoji: '🦄',
      background: 'linear-gradient(90deg, #FFB5D8 0%, #C77DFF 50%, #A8DCFF 100%)',
      coloreAccento: '#C77DFF',
      svg: `<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stop-color="#FFB5D8"/>
            <stop offset="50%" stop-color="#C77DFF"/>
            <stop offset="100%" stop-color="#A8DCFF"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#bg)"/>
        <rect x="12" y="12" width="1176" height="276" rx="18" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 8" opacity="0.85"/>

        <!-- arcobaleno (destra) -->
        <g transform="translate(1100 300)" fill="none" stroke-width="10">
          <path d="M -160 0 A 160 160 0 0 1 160 0" stroke="#FF6B9D"/>
          <path d="M -148 0 A 148 148 0 0 1 148 0" stroke="#FF9A3C"/>
          <path d="M -136 0 A 136 136 0 0 1 136 0" stroke="#FFD93D"/>
          <path d="M -124 0 A 124 124 0 0 1 124 0" stroke="#5ECFB1"/>
          <path d="M -112 0 A 112 112 0 0 1 112 0" stroke="#6BAEFF"/>
          <path d="M -100 0 A 100 100 0 0 1 100 0" stroke="#C77DFF"/>
        </g>

        <!-- nuvole -->
        <g fill="#FFFFFF" opacity="0.9">
          <ellipse cx="200" cy="55" rx="32" ry="14"/>
          <ellipse cx="230" cy="45" rx="22" ry="12"/>
          <ellipse cx="950" cy="60" rx="28" ry="14"/>
        </g>

        <!-- unicorno (sinistra) -->
        <g id="unicorn" transform="translate(110 220)">
          <ellipse id="su-body" class="colorable" cx="0" cy="0" rx="60" ry="32" fill="#FFFFFF"/>
          <rect x="-42" y="20" width="12" height="42" rx="3" fill="#FFFFFF"/>
          <rect x="-22" y="25" width="12" height="38" rx="3" fill="#FFFFFF"/>
          <rect x="12"  y="25" width="12" height="38" rx="3" fill="#FFFFFF"/>
          <rect x="32"  y="20" width="12" height="42" rx="3" fill="#FFFFFF"/>
          <polygon points="40,-20 50,-50 60,-38 48,-8" fill="#FFFFFF"/>
          <ellipse cx="62" cy="-52" rx="18" ry="13" fill="#FFFFFF"/>
          <polygon points="58,-62 54,-74 64,-66" fill="#FFFFFF"/>
          <polygon id="su-horn" class="colorable" points="66,-66 68,-92 72,-66" fill="#FFD93D"/>
          <circle cx="68" cy="-52" r="2" fill="#2A2438"/>
          <path id="su-mane-1" class="colorable" d="M 56 -60 q -22 -6 -32 8 q -8 14 0 24 q -6 10 4 18" fill="#FF6B9D"/>
          <path id="su-mane-2" class="colorable" d="M 44 -34 q -18 0 -22 12 q -2 12 8 18" fill="#C77DFF"/>
          <path d="M -58 -6 q -22 -4 -28 14 q -2 18 12 22 q 12 2 18 -8" fill="#FF6B9D"/>
          <path d="M -62 6 q -16 4 -20 18 q 4 14 18 18 q 8 0 12 -8" fill="#FFD93D"/>
        </g>

        <!-- cuori e stelle -->
        <path d="M 380 70 q -8 -10 -16 -2 q -6 10 16 24 q 22 -14 16 -24 q -8 -8 -16 2 z" fill="#FF6B9D"/>
        <path d="M 880 80 q -7 -9 -14 -2 q -5 9 14 22 q 19 -13 14 -22 q -7 -7 -14 2 z" fill="#FFFFFF"/>
        <path d="M 370 250 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFD93D"/>
        <path d="M 910 250 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF"/>

        <!-- zona testo -->
        <rect data-text-zone="principale|secondario" x="240" y="55" width="700" height="190" rx="22" fill="#FFFFFF" opacity="0.45"/>
      </svg>`
    }
  ],

  /* =====================================================
     CERTIFICATO  (566 x 800)
     Tre zone testo separate: premiato (alta), motivazione
     (centrale), firmato_da (bassa).
     ===================================================== */
  certificato: [

    /* --- 1. Compleanno --- */
    {
      nome: 'Compleanno',
      emoji: '🎂',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #FFB5D8 60%, #FF6B9D 100%)',
      coloreAccento: '#FF6B9D',
      svg: `<svg viewBox="0 0 566 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFF8F0"/>
            <stop offset="60%" stop-color="#FFE4F1"/>
            <stop offset="100%" stop-color="#FFB5D8"/>
          </linearGradient>
        </defs>
        <rect width="566" height="800" fill="url(#bg)"/>
        <rect x="22" y="22" width="522" height="756" rx="18" fill="none" stroke="#FF6B9D" stroke-width="4"/>
        <rect x="32" y="32" width="502" height="736" rx="14" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-dasharray="3 6"/>

        <!-- intestazione torta -->
        <g transform="translate(283 110)">
          <rect id="cd-cake-bot" class="colorable" x="-60" y="0" width="120" height="36" rx="5" fill="#FFFFFF"/>
          <path d="M -60 8 q 12 8 24 0 q 12 10 24 0 q 12 10 24 0 q 12 10 24 0 q 12 8 24 0 l 0 4 l -120 0 z" fill="#FF6B9D"/>
          <rect id="cd-cake-top" class="colorable" x="-36" y="-32" width="72" height="32" rx="5" fill="#FFB5D8"/>
          <rect x="-4" y="-52" width="8" height="22" rx="2" fill="#FF6B9D"/>
          <ellipse cx="0" cy="-58" rx="5" ry="9" fill="#FFD93D"/>
        </g>

        <!-- palloncini ai lati -->
        <ellipse id="cd-balloon-1" class="colorable" cx="70" cy="220" rx="28" ry="36" fill="#C77DFF"/>
        <polygon points="70,256 66,262 74,262" fill="#C77DFF"/>
        <path d="M 70 262 Q 78 320 64 380" stroke="#FF6B9D" stroke-width="2" fill="none" opacity="0.7"/>
        <ellipse id="cd-balloon-2" class="colorable" cx="496" cy="220" rx="28" ry="36" fill="#FFD93D"/>
        <polygon points="496,256 492,262 500,262" fill="#FFD93D"/>
        <path d="M 496 262 Q 502 320 490 380" stroke="#FF6B9D" stroke-width="2" fill="none" opacity="0.7"/>

        <!-- coriandoli sparsi -->
        <g>
          <rect x="80"  y="450" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(20 84 457)"/>
          <rect x="120" y="500" width="9" height="14" rx="2" fill="#FFD93D" transform="rotate(-15 124 507)"/>
          <rect x="445" y="455" width="9" height="14" rx="2" fill="#FFD93D" transform="rotate(35 449 462)"/>
          <rect x="470" y="510" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(-20 474 517)"/>
          <rect x="100" y="650" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(15 104 657)"/>
          <rect x="460" y="640" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(-30 464 647)"/>
        </g>

        <!-- stelline -->
        <path d="M 60 540 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFFFFF" opacity="0.9"/>
        <path d="M 490 540 l 4 10 l 10 1 l -8 6 l 3 10 l -9 -5 l -9 5 l 3 -10 l -8 -6 l 10 -1 z" fill="#FFFFFF" opacity="0.9"/>

        <!-- nastro sigillo (basso) -->
        <circle cx="283" cy="715" r="28" fill="#FF6B9D" stroke="#FFD93D" stroke-width="3"/>
        <polygon points="265,735 257,775 283,755 309,775 301,735" fill="#FF6B9D"/>
        <text x="283" y="722" font-family="Baloo 2, sans-serif" font-weight="800" font-size="22" fill="#FFFFFF" text-anchor="middle">★</text>

        <!-- zone testo -->
        <rect data-text-zone="premiato"    x="80"  y="280" width="406" height="80"  rx="16" fill="#FFFFFF" opacity="0.55"/>
        <rect data-text-zone="motivazione" x="80"  y="380" width="406" height="200" rx="16" fill="#FFFFFF" opacity="0.45"/>
        <rect data-text-zone="firmato_da"  x="120" y="620" width="326" height="64"  rx="14" fill="#FFFFFF" opacity="0.5"/>
      </svg>`
    },

    /* --- 2. Natale --- */
    {
      nome: 'Natale',
      emoji: '🎄',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #C8E6C9 60%, #2E7D5A 100%)',
      coloreAccento: '#2E7D5A',
      svg: `<svg viewBox="0 0 566 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFF8F0"/>
            <stop offset="55%" stop-color="#E6F4E0"/>
            <stop offset="100%" stop-color="#C8E6C9"/>
          </linearGradient>
        </defs>
        <rect width="566" height="800" fill="url(#bg)"/>
        <rect x="22" y="22" width="522" height="756" rx="18" fill="none" stroke="#2E7D5A" stroke-width="4"/>
        <rect x="32" y="32" width="502" height="736" rx="14" fill="none" stroke="#E63946" stroke-width="2" stroke-dasharray="6 6"/>

        <!-- albero centrale (testa) -->
        <g transform="translate(283 0)">
          <polygon id="cn-tree-top" class="colorable" points="0,70 -42,140 42,140" fill="#3A8C5C"/>
          <polygon id="cn-tree-mid" class="colorable" points="0,120 -54,200 54,200" fill="#3A8C5C"/>
          <polygon id="cn-tree-bot" class="colorable" points="0,180 -64,250 64,250" fill="#3A8C5C"/>
          <rect x="-10" y="248" width="20" height="22" fill="#6B3F1D"/>
          <polygon points="0,40 6,56 22,56 9,66 14,82 0,72 -14,82 -9,66 -22,56 -6,56" fill="#FFD700"/>
          <circle cx="-20" cy="125" r="5" fill="#E63946"/>
          <circle cx="22"  cy="135" r="5" fill="#FFD700"/>
          <circle cx="-30" cy="185" r="5" fill="#FFD700"/>
          <circle cx="34"  cy="180" r="5" fill="#E63946"/>
          <circle cx="-44" cy="240" r="5" fill="#E63946"/>
          <circle cx="48"  cy="235" r="5" fill="#FFD700"/>
        </g>

        <!-- fiocchi neve ai lati -->
        <g stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round">
          <g transform="translate(80 200)">
            <line x1="-12" y1="0" x2="12" y2="0"/><line x1="0" y1="-12" x2="0" y2="12"/>
            <line x1="-8" y1="-8" x2="8" y2="8"/><line x1="-8" y1="8" x2="8" y2="-8"/>
          </g>
          <g transform="translate(486 200)">
            <line x1="-12" y1="0" x2="12" y2="0"/><line x1="0" y1="-12" x2="0" y2="12"/>
            <line x1="-8" y1="-8" x2="8" y2="8"/><line x1="-8" y1="8" x2="8" y2="-8"/>
          </g>
          <g transform="translate(60 460)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
          <g transform="translate(506 460)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
          <g transform="translate(80 670)">
            <line x1="-8" y1="0" x2="8" y2="0"/><line x1="0" y1="-8" x2="0" y2="8"/>
            <line x1="-5" y1="-5" x2="5" y2="5"/><line x1="-5" y1="5" x2="5" y2="-5"/>
          </g>
          <g transform="translate(486 670)">
            <line x1="-8" y1="0" x2="8" y2="0"/><line x1="0" y1="-8" x2="0" y2="8"/>
            <line x1="-5" y1="-5" x2="5" y2="5"/><line x1="-5" y1="5" x2="5" y2="-5"/>
          </g>
        </g>

        <!-- pacchi regalo in basso -->
        <g transform="translate(283 740)">
          <rect id="cn-gift-1" class="colorable" x="-90" y="-50" width="70" height="50" rx="4" fill="#E63946"/>
          <rect x="-65" y="-50" width="10" height="50" fill="#FFD700"/>
          <rect x="-90" y="-30" width="70" height="8" fill="#FFD700"/>
          <rect id="cn-gift-2" class="colorable" x="-10" y="-58" width="62" height="58" rx="4" fill="#FFD700"/>
          <rect x="13"  y="-58" width="8" height="58" fill="#E63946"/>
          <rect x="-10" y="-36" width="62" height="8" fill="#E63946"/>
          <rect id="cn-gift-3" class="colorable" x="60"  y="-44" width="46" height="44" rx="4" fill="#3A8C5C"/>
          <rect x="76" y="-44" width="6" height="44" fill="#FFD700"/>
          <rect x="60" y="-28" width="46" height="6" fill="#FFD700"/>
        </g>

        <!-- zone testo -->
        <rect data-text-zone="premiato"    x="80"  y="310" width="406" height="80"  rx="16" fill="#FFFFFF" opacity="0.55"/>
        <rect data-text-zone="motivazione" x="80"  y="410" width="406" height="200" rx="16" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="firmato_da"  x="120" y="630" width="326" height="64"  rx="14" fill="#FFFFFF" opacity="0.55"/>
      </svg>`
    },

    /* --- 3. Animali --- */
    {
      nome: 'Animali',
      emoji: '🦊',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #D6F0DE 60%, #FFD93D 100%)',
      coloreAccento: '#FF9A3C',
      svg: `<svg viewBox="0 0 566 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFF8F0"/>
            <stop offset="55%" stop-color="#D6F0DE"/>
            <stop offset="100%" stop-color="#FFE4A0"/>
          </linearGradient>
        </defs>
        <rect width="566" height="800" fill="url(#bg)"/>
        <rect x="22" y="22" width="522" height="756" rx="18" fill="none" stroke="#FF9A3C" stroke-width="4"/>
        <rect x="32" y="32" width="502" height="736" rx="14" fill="none" stroke="#3A8C5C" stroke-width="2" stroke-dasharray="3 6"/>

        <!-- nuvole alto -->
        <g fill="#FFFFFF" opacity="0.92">
          <ellipse cx="120" cy="110" rx="30" ry="14"/>
          <ellipse cx="148" cy="100" rx="22" ry="12"/>
          <ellipse cx="440" cy="120" rx="30" ry="14"/>
          <ellipse cx="468" cy="110" rx="22" ry="12"/>
        </g>

        <!-- volpe (centro alto, intestazione) -->
        <g transform="translate(283 180)">
          <polygon id="ca-fox-body" class="colorable" points="-50,0 50,0 56,28 -56,28" fill="#FF9A3C"/>
          <polygon id="ca-fox-head" class="colorable" points="-32,-44 32,-44 22,4 -22,4" fill="#FF9A3C"/>
          <polygon points="-32,-44 -42,-66 -22,-58" fill="#FF9A3C"/>
          <polygon points="32,-44 42,-66 22,-58" fill="#FF9A3C"/>
          <polygon points="-32,-44 -36,-58 -25,-52" fill="#FFFFFF"/>
          <polygon points="32,-44 36,-58 25,-52" fill="#FFFFFF"/>
          <polygon points="-18,-18 18,-18 8,8 -8,8" fill="#FFFFFF"/>
          <circle cx="-14" cy="-28" r="3" fill="#2A2438"/>
          <circle cx="14"  cy="-28" r="3" fill="#2A2438"/>
          <polygon points="0,-4 -4,-10 4,-10" fill="#2A2438"/>
          <polygon points="56,18 86,-12 96,22" fill="#FF9A3C"/>
          <polygon points="84,0 96,-6 96,22" fill="#FFFFFF"/>
        </g>

        <!-- alberi laterali -->
        <rect x="56"  y="690" width="14" height="48" fill="#8B5A2B"/>
        <circle id="ca-tree-1" class="colorable" cx="63"  cy="675" r="34" fill="#3A8C5C"/>
        <rect x="496" y="690" width="14" height="48" fill="#8B5A2B"/>
        <circle id="ca-tree-2" class="colorable" cx="503" cy="675" r="34" fill="#5ECFB1"/>

        <!-- fiori sparsi -->
        <g transform="translate(140 730)">
          <circle cx="0" cy="0" r="5" fill="#FF6B9D"/>
          <circle cx="-7" cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="7"  cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="-4" cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="4"  cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="0" cy="0" r="2.5" fill="#FFD93D"/>
        </g>
        <g transform="translate(220 750)">
          <circle cx="0" cy="0" r="4" fill="#C77DFF"/>
          <circle cx="-6" cy="-3" r="4" fill="#C77DFF"/>
          <circle cx="6"  cy="-3" r="4" fill="#C77DFF"/>
          <circle cx="-3" cy="4"  r="4" fill="#C77DFF"/>
          <circle cx="3"  cy="4"  r="4" fill="#C77DFF"/>
          <circle cx="0" cy="0" r="2" fill="#FFD93D"/>
        </g>
        <g transform="translate(350 745)">
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
          <circle cx="-7" cy="-3" r="5" fill="#FFFFFF"/>
          <circle cx="7"  cy="-3" r="5" fill="#FFFFFF"/>
          <circle cx="-4" cy="5"  r="5" fill="#FFFFFF"/>
          <circle cx="4"  cy="5"  r="5" fill="#FFFFFF"/>
          <circle cx="0" cy="0" r="2.5" fill="#FF9A3C"/>
        </g>
        <g transform="translate(430 730)">
          <circle cx="0" cy="0" r="5" fill="#FF6B9D"/>
          <circle cx="-7" cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="7"  cy="-3" r="5" fill="#FF6B9D"/>
          <circle cx="-4" cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="4"  cy="5"  r="5" fill="#FF6B9D"/>
          <circle cx="0" cy="0" r="2.5" fill="#FFD93D"/>
        </g>

        <!-- zone testo -->
        <rect data-text-zone="premiato"    x="80"  y="290" width="406" height="80"  rx="16" fill="#FFFFFF" opacity="0.65"/>
        <rect data-text-zone="motivazione" x="80"  y="390" width="406" height="180" rx="16" fill="#FFFFFF" opacity="0.6"/>
        <rect data-text-zone="firmato_da"  x="120" y="600" width="326" height="60"  rx="14" fill="#FFFFFF" opacity="0.6"/>
      </svg>`
    },

    /* --- 4. Spazio --- */
    {
      nome: 'Spazio',
      emoji: '🚀',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #6BAEFF 50%, #1A1F4E 100%)',
      coloreAccento: '#6BAEFF',
      svg: `<svg viewBox="0 0 566 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFF8F0"/>
            <stop offset="40%" stop-color="#A8C8F0"/>
            <stop offset="100%" stop-color="#1A1F4E"/>
          </linearGradient>
        </defs>
        <rect width="566" height="800" fill="url(#bg)"/>
        <rect x="22" y="22" width="522" height="756" rx="18" fill="none" stroke="#FFD93D" stroke-width="4"/>
        <rect x="32" y="32" width="502" height="736" rx="14" fill="none" stroke="#FFD93D" stroke-width="2" stroke-dasharray="2 10" opacity="0.7"/>

        <!-- razzo centrale (intestazione) -->
        <g transform="translate(283 160)">
          <ellipse id="cs-rocket-body" class="colorable" cx="0" cy="0" rx="28" ry="74" fill="#FFFFFF"/>
          <polygon points="0,-90 -24,-50 24,-50" fill="#E63946"/>
          <circle cx="0" cy="-20" r="12" fill="#6BAEFF" stroke="#2A2438" stroke-width="2"/>
          <polygon points="-28,30 -50,80 -8,60" fill="#E63946"/>
          <polygon points="28,30  50,80  8,60" fill="#E63946"/>
          <polygon points="-10,76 10,76 6,100 -6,100" fill="#FFD93D"/>
          <polygon points="-4,100 4,100 0,116" fill="#FF9A3C"/>
        </g>

        <!-- stelle puntini -->
        <g fill="#FFFFFF">
          <circle cx="70"  cy="80"  r="2"/>
          <circle cx="140" cy="50"  r="1.5"/>
          <circle cx="220" cy="100" r="2"/>
          <circle cx="40"  cy="200" r="1.5"/>
          <circle cx="100" cy="280" r="2"/>
          <circle cx="430" cy="80"  r="2"/>
          <circle cx="500" cy="60"  r="1.5"/>
          <circle cx="470" cy="200" r="2"/>
          <circle cx="510" cy="280" r="1.5"/>
          <circle cx="50"  cy="500" r="2"/>
          <circle cx="120" cy="560" r="1.5"/>
          <circle cx="440" cy="520" r="2"/>
          <circle cx="510" cy="580" r="1.5"/>
          <circle cx="80"  cy="700" r="2"/>
          <circle cx="490" cy="700" r="2"/>
        </g>
        <g fill="#FFD93D">
          <path d="M 80 360 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 486 360 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
        </g>

        <!-- pianeti -->
        <circle id="cs-planet-1" class="colorable" cx="80"  cy="640" r="34" fill="#FF6B9D"/>
        <ellipse cx="80" cy="640" rx="56" ry="8" fill="none" stroke="#FFD93D" stroke-width="2.5" transform="rotate(-20 80 640)"/>
        <circle id="cs-planet-2" class="colorable" cx="486" cy="640" r="26" fill="#C77DFF"/>
        <circle id="cs-planet-3" class="colorable" cx="486" cy="720" r="14" fill="#5ECFB1"/>

        <!-- luna -->
        <circle cx="486" cy="120" r="28" fill="#FFD93D"/>
        <circle cx="498" cy="114" r="24" fill="#A8C8F0"/>

        <!-- zone testo -->
        <rect data-text-zone="premiato"    x="80"  y="300" width="406" height="80"  rx="16" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="motivazione" x="80"  y="400" width="406" height="200" rx="16" fill="#FFFFFF" opacity="0.42"/>
        <rect data-text-zone="firmato_da"  x="120" y="640" width="326" height="64"  rx="14" fill="#FFFFFF" opacity="0.48"/>
      </svg>`
    },

    /* --- 5. Unicorno --- */
    {
      nome: 'Unicorno',
      emoji: '🦄',
      background: 'linear-gradient(180deg, #FFF8F0 0%, #FFB5D8 60%, #C77DFF 100%)',
      coloreAccento: '#C77DFF',
      svg: `<svg viewBox="0 0 566 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFF8F0"/>
            <stop offset="55%" stop-color="#FFE0F0"/>
            <stop offset="100%" stop-color="#E8C8FF"/>
          </linearGradient>
        </defs>
        <rect width="566" height="800" fill="url(#bg)"/>
        <rect x="22" y="22" width="522" height="756" rx="18" fill="none" stroke="#C77DFF" stroke-width="4"/>
        <rect x="32" y="32" width="502" height="736" rx="14" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-dasharray="2 8"/>

        <!-- arcobaleno in alto -->
        <g transform="translate(283 60)" fill="none" stroke-width="10">
          <path d="M -170 100 A 170 170 0 0 1 170 100" stroke="#FF6B9D"/>
          <path d="M -158 100 A 158 158 0 0 1 158 100" stroke="#FF9A3C"/>
          <path d="M -146 100 A 146 146 0 0 1 146 100" stroke="#FFD93D"/>
          <path d="M -134 100 A 134 134 0 0 1 134 100" stroke="#5ECFB1"/>
          <path d="M -122 100 A 122 122 0 0 1 122 100" stroke="#6BAEFF"/>
          <path d="M -110 100 A 110 110 0 0 1 110 100" stroke="#C77DFF"/>
        </g>

        <!-- nuvole sotto arcobaleno -->
        <g fill="#FFFFFF" opacity="0.95">
          <ellipse cx="120" cy="170" rx="30" ry="14"/>
          <ellipse cx="146" cy="158" rx="20" ry="12"/>
          <ellipse cx="446" cy="170" rx="30" ry="14"/>
          <ellipse cx="420" cy="158" rx="20" ry="12"/>
        </g>

        <!-- unicorno (basso, centrale) -->
        <g transform="translate(283 700)">
          <ellipse id="cu-body" class="colorable" cx="0" cy="0" rx="70" ry="38" fill="#FFFFFF"/>
          <rect x="-50" y="28" width="14" height="50" rx="3" fill="#FFFFFF"/>
          <rect x="-26" y="32" width="14" height="46" rx="3" fill="#FFFFFF"/>
          <rect x="14"  y="32" width="14" height="46" rx="3" fill="#FFFFFF"/>
          <rect x="38"  y="28" width="14" height="50" rx="3" fill="#FFFFFF"/>
          <polygon points="46,-24 58,-58 70,-44 56,-12" fill="#FFFFFF"/>
          <ellipse cx="72" cy="-60" rx="20" ry="15" fill="#FFFFFF"/>
          <polygon points="68,-72 64,-86 76,-76" fill="#FFFFFF"/>
          <polygon id="cu-horn" class="colorable" points="78,-76 80,-108 84,-76" fill="#FFD93D"/>
          <circle cx="80" cy="-60" r="2.5" fill="#2A2438"/>
          <path id="cu-mane-1" class="colorable" d="M 60 -70 q -25 -8 -36 8 q -10 16 0 28 q -8 12 4 24" fill="#FF6B9D"/>
          <path id="cu-mane-2" class="colorable" d="M 50 -40 q -22 0 -28 14 q -2 14 10 22" fill="#C77DFF"/>
          <path d="M -68 -8 q -26 -4 -32 16 q -4 20 14 26 q 12 2 18 -8" fill="#FF6B9D"/>
          <path d="M -72 4 q -20 4 -24 22 q 4 16 22 20 q 10 0 14 -8" fill="#FFD93D"/>
        </g>

        <!-- cuori e stelline -->
        <path d="M 80 380 q -8 -10 -16 -2 q -6 10 16 24 q 22 -14 16 -24 q -8 -8 -16 2 z" fill="#FF6B9D"/>
        <path d="M 486 380 q -8 -10 -16 -2 q -6 10 16 24 q 22 -14 16 -24 q -8 -8 -16 2 z" fill="#FFFFFF"/>
        <path d="M 100 540 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFD93D"/>
        <path d="M 470 540 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFD93D"/>

        <!-- zone testo -->
        <rect data-text-zone="premiato"    x="80"  y="290" width="406" height="80"  rx="16" fill="#FFFFFF" opacity="0.55"/>
        <rect data-text-zone="motivazione" x="80"  y="390" width="406" height="180" rx="16" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="firmato_da"  x="120" y="595" width="326" height="60"  rx="14" fill="#FFFFFF" opacity="0.55"/>
      </svg>`
    }
  ],

  /* =====================================================
     SEGNALIBRO  (267 x 800)
     Due zone testo separate: nome (alto), frase (basso)
     ===================================================== */
  segnalibro: [

    /* --- 1. Compleanno --- */
    {
      nome: 'Compleanno',
      emoji: '🎂',
      background: 'linear-gradient(180deg, #FF6B9D 0%, #FFB5D8 50%, #FFD93D 100%)',
      coloreAccento: '#FF6B9D',
      svg: `<svg viewBox="0 0 267 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FF6B9D"/>
            <stop offset="50%" stop-color="#FFB5D8"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="267" height="800" fill="url(#bg)"/>
        <rect x="10" y="10" width="247" height="780" rx="14" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 8" opacity="0.85"/>

        <!-- palloncini in alto -->
        <ellipse id="gd-balloon-1" class="colorable" cx="80"  cy="80" rx="22" ry="28" fill="#C77DFF"/>
        <polygon points="80,108 76,114 84,114" fill="#C77DFF"/>
        <path d="M 80 114 Q 86 160 76 200" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>
        <ellipse id="gd-balloon-2" class="colorable" cx="180" cy="100" rx="20" ry="26" fill="#FFFFFF"/>
        <polygon points="180,126 176,132 184,132" fill="#FFFFFF"/>
        <path d="M 180 132 Q 184 180 176 220" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>

        <!-- coriandoli centrali -->
        <g>
          <rect x="40"  y="320" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(20 44 327)"/>
          <rect x="200" y="340" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(-25 204 347)"/>
          <rect x="60"  y="400" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(35 64 407)"/>
          <rect x="180" y="430" width="9" height="14" rx="2" fill="#C77DFF" transform="rotate(-20 184 437)"/>
          <rect x="40"  y="500" width="9" height="14" rx="2" fill="#FFD93D" transform="rotate(15 44 507)"/>
          <rect x="190" y="510" width="9" height="14" rx="2" fill="#FFFFFF" transform="rotate(-30 194 517)"/>
        </g>

        <!-- torta in basso -->
        <g transform="translate(133 720)">
          <rect id="gd-cake-bot" class="colorable" x="-50" y="0" width="100" height="38" rx="6" fill="#FFFFFF"/>
          <path d="M -50 8 q 10 8 20 0 q 10 10 20 0 q 10 10 20 0 q 10 10 20 0 q 10 8 20 0 l 0 4 l -100 0 z" fill="#FF6B9D"/>
          <rect id="gd-cake-top" class="colorable" x="-32" y="-32" width="64" height="32" rx="6" fill="#FFB5D8"/>
          <rect x="-4" y="-52" width="8" height="22" rx="2" fill="#FF6B9D"/>
          <ellipse cx="0" cy="-58" rx="5" ry="9" fill="#FFD93D"/>
        </g>

        <!-- foro -->
        <circle cx="133" cy="30" r="10" fill="#FFFFFF" opacity="0.55"/>

        <!-- zone testo -->
        <rect data-text-zone="nome"  x="30" y="220" width="207" height="80"  rx="14" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="frase" x="30" y="540" width="207" height="140" rx="14" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    },

    /* --- 2. Natale --- */
    {
      nome: 'Natale',
      emoji: '🎄',
      background: 'linear-gradient(180deg, #1E5F3F 0%, #2E7D5A 60%, #E63946 100%)',
      coloreAccento: '#E63946',
      svg: `<svg viewBox="0 0 267 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#1E5F3F"/>
            <stop offset="55%" stop-color="#2E7D5A"/>
            <stop offset="100%" stop-color="#E63946"/>
          </linearGradient>
        </defs>
        <rect width="267" height="800" fill="url(#bg)"/>
        <rect x="10" y="10" width="247" height="780" rx="14" fill="none" stroke="#FFD700" stroke-width="3" stroke-dasharray="6 6" opacity="0.85"/>

        <!-- albero in alto -->
        <g transform="translate(133 90)">
          <polygon id="gn-tree-top" class="colorable" points="0,0 -36,60 36,60" fill="#3A8C5C"/>
          <polygon id="gn-tree-mid" class="colorable" points="0,40 -46,110 46,110" fill="#3A8C5C"/>
          <polygon id="gn-tree-bot" class="colorable" points="0,90 -56,170 56,170" fill="#3A8C5C"/>
          <rect x="-10" y="168" width="20" height="22" fill="#6B3F1D"/>
          <polygon points="0,-30 6,-14 22,-14 9,-4 14,12 0,2 -14,12 -9,-4 -22,-14 -6,-14" fill="#FFD700"/>
          <circle cx="-18" cy="48" r="5" fill="#E63946"/>
          <circle cx="20"  cy="55" r="4" fill="#FFD700"/>
          <circle cx="-28" cy="95" r="5" fill="#FFD700"/>
          <circle cx="30"  cy="90" r="5" fill="#E63946"/>
          <circle cx="-40" cy="155" r="5" fill="#E63946"/>
          <circle cx="42"  cy="160" r="5" fill="#FFD700"/>
        </g>

        <!-- fiocchi neve -->
        <g stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round">
          <g transform="translate(50 360)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
          <g transform="translate(220 400)">
            <line x1="-9" y1="0" x2="9" y2="0"/><line x1="0" y1="-9" x2="0" y2="9"/>
            <line x1="-6" y1="-6" x2="6" y2="6"/><line x1="-6" y1="6" x2="6" y2="-6"/>
          </g>
          <g transform="translate(60 480)">
            <line x1="-8" y1="0" x2="8" y2="0"/><line x1="0" y1="-8" x2="0" y2="8"/>
            <line x1="-5" y1="-5" x2="5" y2="5"/><line x1="-5" y1="5" x2="5" y2="-5"/>
          </g>
          <g transform="translate(210 540)">
            <line x1="-10" y1="0" x2="10" y2="0"/><line x1="0" y1="-10" x2="0" y2="10"/>
            <line x1="-7" y1="-7" x2="7" y2="7"/><line x1="-7" y1="7" x2="7" y2="-7"/>
          </g>
        </g>

        <!-- pacchi regalo in basso -->
        <g transform="translate(133 740)">
          <rect id="gn-gift-1" class="colorable" x="-60" y="-40" width="56" height="44" rx="4" fill="#E63946"/>
          <rect x="-40" y="-40" width="8" height="44" fill="#FFD700"/>
          <rect x="-60" y="-22" width="56" height="6" fill="#FFD700"/>
          <rect id="gn-gift-2" class="colorable" x="6" y="-48" width="56" height="52" rx="4" fill="#FFD700"/>
          <rect x="26"  y="-48" width="8" height="52" fill="#E63946"/>
          <rect x="6"   y="-28" width="56" height="6" fill="#E63946"/>
        </g>

        <!-- foro -->
        <circle cx="133" cy="30" r="10" fill="#FFFFFF" opacity="0.55"/>

        <!-- zone testo -->
        <rect data-text-zone="nome"  x="30" y="310" width="207" height="80"  rx="14" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="frase" x="30" y="590" width="207" height="120" rx="14" fill="#FFFFFF" opacity="0.42"/>
      </svg>`
    },

    /* --- 3. Animali --- */
    {
      nome: 'Animali',
      emoji: '🦊',
      background: 'linear-gradient(180deg, #A8DCFF 0%, #C8F0D8 60%, #FFD93D 100%)',
      coloreAccento: '#FF9A3C',
      svg: `<svg viewBox="0 0 267 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#A8DCFF"/>
            <stop offset="55%" stop-color="#C8F0D8"/>
            <stop offset="100%" stop-color="#FFD93D"/>
          </linearGradient>
        </defs>
        <rect width="267" height="800" fill="url(#bg)"/>
        <rect x="10" y="10" width="247" height="780" rx="14" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="3 7" opacity="0.85"/>

        <!-- nuvole in alto -->
        <g fill="#FFFFFF" opacity="0.92">
          <ellipse cx="80"  cy="80" rx="28" ry="14"/>
          <ellipse cx="105" cy="70" rx="20" ry="12"/>
          <ellipse cx="190" cy="120" rx="26" ry="14"/>
        </g>

        <!-- volpe centrale -->
        <g transform="translate(133 360)">
          <polygon id="ga-fox-body" class="colorable" points="-40,0 40,0 46,22 -46,22" fill="#FF9A3C"/>
          <polygon id="ga-fox-head" class="colorable" points="-26,-36 26,-36 18,4 -18,4" fill="#FF9A3C"/>
          <polygon points="-26,-36 -34,-54 -18,-48" fill="#FF9A3C"/>
          <polygon points="26,-36  34,-54 18,-48" fill="#FF9A3C"/>
          <polygon points="-14,-14 14,-14 6,8 -6,8" fill="#FFFFFF"/>
          <circle cx="-12" cy="-22" r="3" fill="#2A2438"/>
          <circle cx="12"  cy="-22" r="3" fill="#2A2438"/>
          <polygon points="0,-2 -3,-8 3,-8" fill="#2A2438"/>
          <polygon points="46,14 70,-10 78,18" fill="#FF9A3C"/>
          <polygon points="68,2 78,-4 78,18" fill="#FFFFFF"/>
        </g>

        <!-- alberi laterali -->
        <rect x="30"  y="540" width="12" height="40" fill="#8B5A2B"/>
        <circle id="ga-tree-1" class="colorable" cx="36"  cy="528" r="28" fill="#3A8C5C"/>
        <rect x="220" y="540" width="12" height="40" fill="#8B5A2B"/>
        <circle id="ga-tree-2" class="colorable" cx="226" cy="528" r="28" fill="#5ECFB1"/>

        <!-- fiori in basso -->
        <g transform="translate(70 720)">
          <circle cx="0" cy="0" r="4" fill="#FF6B9D"/>
          <circle cx="-6" cy="-3" r="4" fill="#FF6B9D"/>
          <circle cx="6"  cy="-3" r="4" fill="#FF6B9D"/>
          <circle cx="-3" cy="4"  r="4" fill="#FF6B9D"/>
          <circle cx="3"  cy="4"  r="4" fill="#FF6B9D"/>
          <circle cx="0" cy="0" r="2" fill="#FFD93D"/>
        </g>
        <g transform="translate(200 730)">
          <circle cx="0" cy="0" r="4" fill="#C77DFF"/>
          <circle cx="-6" cy="-3" r="4" fill="#C77DFF"/>
          <circle cx="6"  cy="-3" r="4" fill="#C77DFF"/>
          <circle cx="-3" cy="4"  r="4" fill="#C77DFF"/>
          <circle cx="3"  cy="4"  r="4" fill="#C77DFF"/>
          <circle cx="0" cy="0" r="2" fill="#FFD93D"/>
        </g>

        <!-- foro -->
        <circle cx="133" cy="30" r="10" fill="#FFFFFF" opacity="0.55"/>

        <!-- zone testo -->
        <rect data-text-zone="nome"  x="30" y="190" width="207" height="80"  rx="14" fill="#FFFFFF" opacity="0.55"/>
        <rect data-text-zone="frase" x="30" y="600" width="207" height="100" rx="14" fill="#FFFFFF" opacity="0.5"/>
      </svg>`
    },

    /* --- 4. Spazio --- */
    {
      nome: 'Spazio',
      emoji: '🚀',
      background: 'linear-gradient(180deg, #0F1438 0%, #1A1F4E 60%, #7E3FA8 100%)',
      coloreAccento: '#7E3FA8',
      svg: `<svg viewBox="0 0 267 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#0F1438"/>
            <stop offset="60%" stop-color="#1A1F4E"/>
            <stop offset="100%" stop-color="#7E3FA8"/>
          </linearGradient>
        </defs>
        <rect width="267" height="800" fill="url(#bg)"/>
        <rect x="10" y="10" width="247" height="780" rx="14" fill="none" stroke="#FFD93D" stroke-width="3" stroke-dasharray="2 10" opacity="0.7"/>

        <!-- stelle puntini -->
        <g fill="#FFFFFF">
          <circle cx="40"  cy="80"  r="2"/>
          <circle cx="220" cy="100" r="1.5"/>
          <circle cx="60"  cy="200" r="2"/>
          <circle cx="200" cy="240" r="1.5"/>
          <circle cx="50"  cy="380" r="2"/>
          <circle cx="220" cy="420" r="1.5"/>
          <circle cx="40"  cy="540" r="2"/>
          <circle cx="220" cy="580" r="1.5"/>
          <circle cx="80"  cy="700" r="2"/>
          <circle cx="200" cy="720" r="1.5"/>
        </g>
        <g fill="#FFD93D">
          <path d="M 80 120 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
          <path d="M 180 460 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z"/>
        </g>

        <!-- razzo verticale (top) -->
        <g transform="translate(133 160)">
          <ellipse id="gs-rocket-body" class="colorable" cx="0" cy="0" rx="20" ry="50" fill="#FFFFFF"/>
          <polygon points="0,-62 -18,-30 18,-30" fill="#E63946"/>
          <circle cx="0" cy="-12" r="8" fill="#6BAEFF" stroke="#2A2438" stroke-width="2"/>
          <polygon points="-20,20 -36,54 -6,42" fill="#E63946"/>
          <polygon points="20,20  36,54  6,42" fill="#E63946"/>
          <polygon points="-7,52 7,52 5,72 -5,72" fill="#FFD93D"/>
          <polygon points="-3,72 3,72 0,82" fill="#FF9A3C"/>
        </g>

        <!-- pianeti centrali e bassi -->
        <circle id="gs-planet-1" class="colorable" cx="60"  cy="430" r="26" fill="#FF6B9D"/>
        <ellipse cx="60" cy="430" rx="44" ry="7" fill="none" stroke="#FFD93D" stroke-width="2.5" transform="rotate(-20 60 430)"/>
        <circle id="gs-planet-2" class="colorable" cx="210" cy="660" r="22" fill="#C77DFF"/>
        <circle id="gs-planet-3" class="colorable" cx="60"  cy="700" r="14" fill="#5ECFB1"/>

        <!-- luna -->
        <circle cx="210" cy="320" r="24" fill="#FFD93D"/>
        <circle cx="220" cy="314" r="20" fill="#1A1F4E"/>

        <!-- foro -->
        <circle cx="133" cy="30" r="10" fill="#FFFFFF" opacity="0.55"/>

        <!-- zone testo -->
        <rect data-text-zone="nome"  x="30" y="230" width="207" height="80"  rx="14" fill="#FFFFFF" opacity="0.42"/>
        <rect data-text-zone="frase" x="30" y="510" width="207" height="120" rx="14" fill="#FFFFFF" opacity="0.38"/>
      </svg>`
    },

    /* --- 5. Unicorno --- */
    {
      nome: 'Unicorno',
      emoji: '🦄',
      background: 'linear-gradient(180deg, #FFB5D8 0%, #C77DFF 50%, #A8DCFF 100%)',
      coloreAccento: '#C77DFF',
      svg: `<svg viewBox="0 0 267 800" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stop-color="#FFB5D8"/>
            <stop offset="50%" stop-color="#C77DFF"/>
            <stop offset="100%" stop-color="#A8DCFF"/>
          </linearGradient>
        </defs>
        <rect width="267" height="800" fill="url(#bg)"/>
        <rect x="10" y="10" width="247" height="780" rx="14" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 8" opacity="0.9"/>

        <!-- arcobaleno in cima -->
        <g transform="translate(133 60)" fill="none" stroke-width="8">
          <path d="M -110 100 A 110 110 0 0 1 110 100" stroke="#FF6B9D"/>
          <path d="M -100 100 A 100 100 0 0 1 100 100" stroke="#FF9A3C"/>
          <path d="M -90  100 A 90  90  0 0 1 90  100" stroke="#FFD93D"/>
          <path d="M -80  100 A 80  80  0 0 1 80  100" stroke="#5ECFB1"/>
          <path d="M -70  100 A 70  70  0 0 1 70  100" stroke="#6BAEFF"/>
          <path d="M -60  100 A 60  60  0 0 1 60  100" stroke="#C77DFF"/>
        </g>

        <!-- nuvole -->
        <g fill="#FFFFFF" opacity="0.95">
          <ellipse cx="60"  cy="180" rx="22" ry="10"/>
          <ellipse cx="80"  cy="172" rx="14" ry="8"/>
          <ellipse cx="210" cy="180" rx="22" ry="10"/>
        </g>

        <!-- unicorno centrale -->
        <g transform="translate(133 460)">
          <ellipse id="gu-body" class="colorable" cx="0" cy="0" rx="56" ry="30" fill="#FFFFFF"/>
          <rect x="-40" y="22" width="11" height="40" rx="3" fill="#FFFFFF"/>
          <rect x="-22" y="26" width="11" height="36" rx="3" fill="#FFFFFF"/>
          <rect x="12"  y="26" width="11" height="36" rx="3" fill="#FFFFFF"/>
          <rect x="30"  y="22" width="11" height="40" rx="3" fill="#FFFFFF"/>
          <polygon points="36,-18 46,-46 56,-34 44,-8" fill="#FFFFFF"/>
          <ellipse cx="56" cy="-48" rx="16" ry="12" fill="#FFFFFF"/>
          <polygon points="52,-58 48,-70 60,-62" fill="#FFFFFF"/>
          <polygon id="gu-horn" class="colorable" points="62,-62 64,-86 68,-62" fill="#FFD93D"/>
          <circle cx="62" cy="-48" r="2" fill="#2A2438"/>
          <path id="gu-mane-1" class="colorable" d="M 46 -56 q -20 -6 -28 8 q -8 14 0 22 q -6 10 4 18" fill="#FF6B9D"/>
          <path id="gu-mane-2" class="colorable" d="M 36 -32 q -16 0 -20 12 q -2 12 8 16" fill="#C77DFF"/>
          <path d="M -54 -4 q -20 -4 -26 14 q -2 18 14 20 q 10 0 14 -8" fill="#FF6B9D"/>
          <path d="M -58 6 q -16 4 -18 18 q 4 14 18 16 q 8 0 10 -8" fill="#FFD93D"/>
        </g>

        <!-- cuori e stelle -->
        <path d="M 50 320 q -7 -9 -14 -2 q -5 9 14 22 q 19 -13 14 -22 q -7 -7 -14 2 z" fill="#FF6B9D"/>
        <path d="M 210 340 q -7 -9 -14 -2 q -5 9 14 22 q 19 -13 14 -22 q -7 -7 -14 2 z" fill="#FFFFFF"/>
        <path d="M 50 660 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFD93D"/>
        <path d="M 210 700 l 3 8 l 8 1 l -6 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF"/>

        <!-- foro -->
        <circle cx="133" cy="30" r="10" fill="#FFFFFF" opacity="0.55"/>

        <!-- zone testo -->
        <rect data-text-zone="nome"  x="30" y="240" width="207" height="80"  rx="14" fill="#FFFFFF" opacity="0.5"/>
        <rect data-text-zone="frase" x="30" y="600" width="207" height="120" rx="14" fill="#FFFFFF" opacity="0.45"/>
      </svg>`
    }
  ],

  /* =====================================================
     INVITO  (800 x 566 — A6 landscape, 1/4 di A4)
     Tre campi: festeggiato | quando | dove
     5 temi (Compleanno, Natale, Animali, Spazio, Unicorno)
     ===================================================== */
  invito: [

    /* --- 1. Compleanno --- */
    {
      nome: 'Compleanno',
      emoji: '🎂',
      background: 'linear-gradient(135deg, #FFE5EC 0%, #FFD6A5 60%, #FFF4CC 100%)',
      coloreAccento: '#FF6B9D',
      svg: `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="invitoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#FFE5EC"/>
            <stop offset="60%"  stop-color="#FFD6A5"/>
            <stop offset="100%" stop-color="#FFF4CC"/>
          </linearGradient>
          <linearGradient id="invitoCakeBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFB088"/>
            <stop offset="100%" stop-color="#D08060"/>
          </linearGradient>
        </defs>

        <rect width="800" height="566" fill="url(#invitoBg)"/>
        <rect x="14" y="14" width="772" height="538" rx="22" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="2 9" opacity="0.9"/>

        <!-- coriandoli sparsi -->
        <rect x="45"  y="55"  width="9"  height="14" rx="2" fill="#C77DFF" transform="rotate(20 49 62)"/>
        <rect x="75"  y="200" width="9"  height="13" rx="2" fill="#FFD93D" transform="rotate(-25 79 207)"/>
        <rect x="40"  y="340" width="9"  height="13" rx="2" fill="#FF6B9D" transform="rotate(35 44 347)"/>
        <rect x="430" y="40"  width="9"  height="13" rx="2" fill="#FFD93D" transform="rotate(15 434 47)"/>
        <rect x="535" y="60"  width="9"  height="13" rx="2" fill="#C77DFF" transform="rotate(-20 539 67)"/>
        <rect x="720" y="265" width="9"  height="13" rx="2" fill="#FF6B9D" transform="rotate(25 724 272)"/>
        <rect x="755" y="345" width="9"  height="13" rx="2" fill="#FFFFFF" transform="rotate(-30 759 352)"/>

        <!-- stelline -->
        <path d="M 380 70 l 3 8 l 9 1 l -7 5 l 2 8 l -7 -4 l -7 4 l 2 -8 l -7 -5 l 9 -1 z" fill="#FFFFFF" opacity="0.85"/>
        <path d="M 460 220 l 3 7 l 8 1 l -6 5 l 2 8 l -7 -4 l -6 4 l 2 -8 l -6 -5 l 8 -1 z" fill="#FFFFFF" opacity="0.75"/>

        <!-- PALLONCINI in alto -->
        <!-- palloncino 1 (rosa) -->
        <ellipse cx="120" cy="115" rx="44" ry="54" fill="#FF6B9D"/>
        <ellipse cx="108" cy="100" rx="10" ry="14" fill="#FFFFFF" opacity="0.55"/>
        <polygon points="115,168 125,168 120,180" fill="#FF6B9D"/>
        <path d="M 120 180 Q 115 220 135 250 Q 150 280 130 310" stroke="#7B5CA8" stroke-width="1.5" fill="none"/>

        <!-- palloncino 2 (viola) più alto -->
        <ellipse cx="205" cy="80" rx="42" ry="52" fill="#C77DFF"/>
        <ellipse cx="194" cy="65" rx="10" ry="13" fill="#FFFFFF" opacity="0.5"/>
        <polygon points="200,131 210,131 205,143" fill="#C77DFF"/>
        <path d="M 205 143 Q 200 190 215 230 Q 225 265 205 295" stroke="#7B5CA8" stroke-width="1.5" fill="none"/>

        <!-- palloncino 3 (giallo) destra -->
        <ellipse cx="685" cy="110" rx="44" ry="54" fill="#FFD93D"/>
        <ellipse cx="673" cy="95" rx="10" ry="14" fill="#FFFFFF" opacity="0.55"/>
        <polygon points="680,163 690,163 685,175" fill="#FFD93D"/>
        <path d="M 685 175 Q 690 215 670 250 Q 655 285 675 315" stroke="#7B5CA8" stroke-width="1.5" fill="none"/>

        <!-- palloncino 4 (menta) più a destra -->
        <ellipse cx="755" cy="145" rx="40" ry="50" fill="#80E5C5"/>
        <ellipse cx="744" cy="130" rx="9"  ry="12" fill="#FFFFFF" opacity="0.5"/>
        <polygon points="750,194 760,194 755,205" fill="#80E5C5"/>
        <path d="M 755 205 Q 760 245 745 280 Q 730 315 750 345" stroke="#7B5CA8" stroke-width="1.5" fill="none"/>

        <!-- TORTA in basso a destra -->
        <!-- piatto -->
        <ellipse cx="660" cy="540" rx="125" ry="10" fill="#A88FCC" opacity="0.6"/>
        <!-- base torta -->
        <rect x="555" y="450" width="210" height="90" rx="6" fill="url(#invitoCakeBase)"/>
        <!-- glassa che cola sulla base -->
        <path d="M 555 458 Q 580 472 605 458 Q 630 474 660 458 Q 690 476 715 458 Q 745 472 765 458 L 765 470 L 555 470 Z" fill="#FFE5EC"/>
        <!-- piano medio -->
        <rect x="585" y="395" width="150" height="60" rx="6" fill="#FFB5D8"/>
        <path d="M 585 402 Q 605 414 625 402 Q 645 416 665 402 Q 685 414 705 402 Q 720 414 735 402 L 735 412 L 585 412 Z" fill="#FFFFFF" opacity="0.7"/>
        <!-- piano top -->
        <rect x="610" y="350" width="100" height="50" rx="6" fill="#FFD6E7"/>
        <!-- candeline -->
        <rect x="635" y="320" width="6" height="32" rx="1" fill="#FF6B9D"/>
        <rect x="657" y="320" width="6" height="32" rx="1" fill="#FFD93D"/>
        <rect x="679" y="320" width="6" height="32" rx="1" fill="#80E5C5"/>
        <!-- fiammelle -->
        <path d="M 638 320 Q 632 312 638 304 Q 644 312 638 320 Z" fill="#FFA940"/>
        <path d="M 638 320 Q 636 314 638 308 Q 640 314 638 320 Z" fill="#FFE070"/>
        <path d="M 660 320 Q 654 312 660 304 Q 666 312 660 320 Z" fill="#FFA940"/>
        <path d="M 660 320 Q 658 314 660 308 Q 662 314 660 320 Z" fill="#FFE070"/>
        <path d="M 682 320 Q 676 312 682 304 Q 688 312 682 320 Z" fill="#FFA940"/>
        <path d="M 682 320 Q 680 314 682 308 Q 684 314 682 320 Z" fill="#FFE070"/>

        <!-- titolo decorativo "Sei invitato!" sopra la zona testo -->
        <text x="265" y="220" font-family="Pacifico, cursive" font-size="42" fill="#FF6B9D" opacity="0.95">Sei invitato!</text>

        <!-- ZONA TESTO centrale: festeggiato | quando | dove -->
        <rect data-text-zone="festeggiato|quando|dove"
              x="260" y="240" width="460" height="190" rx="20"
              fill="#FFFFFF" opacity="0.55"/>
      </svg>`
    },

    /* --- 2. Natale --- */
    {
      nome: 'Natale',
      emoji: '🎄',
      background: 'linear-gradient(135deg, #C8E6D0 0%, #FFF4CC 60%, #FFD6D6 100%)',
      coloreAccento: '#2E7D5C',
      svg: `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="natBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#C8E6D0"/>
            <stop offset="60%"  stop-color="#FFF4CC"/>
            <stop offset="100%" stop-color="#FFD6D6"/>
          </linearGradient>
        </defs>

        <rect width="800" height="566" fill="url(#natBg)"/>
        <rect x="14" y="14" width="772" height="538" rx="22" fill="none" stroke="#2E7D5C" stroke-width="3" stroke-dasharray="2 9" opacity="0.55"/>

        <!-- fiocchi di neve sparsi -->
        <circle cx="65"  cy="60"  r="4" fill="#FFFFFF"/>
        <circle cx="120" cy="160" r="3" fill="#FFFFFF"/>
        <circle cx="55"  cy="280" r="4" fill="#FFFFFF"/>
        <circle cx="95"  cy="420" r="3" fill="#FFFFFF"/>
        <circle cx="745" cy="55"  r="4" fill="#FFFFFF"/>
        <circle cx="715" cy="180" r="3" fill="#FFFFFF"/>
        <circle cx="755" cy="310" r="4" fill="#FFFFFF"/>
        <circle cx="725" cy="445" r="3" fill="#FFFFFF"/>
        <circle cx="430" cy="80"  r="3" fill="#FFFFFF"/>
        <circle cx="380" cy="40"  r="3" fill="#FFFFFF"/>
        <circle cx="510" cy="50"  r="3" fill="#FFFFFF"/>

        <!-- ALBERO DI NATALE a sinistra -->
        <!-- stella in punta -->
        <path d="M 145 90 l 6 14 l 15 1 l -12 9 l 4 14 l -13 -8 l -13 8 l 4 -14 l -12 -9 l 15 -1 z" fill="#FFD93D" stroke="#E5B92F" stroke-width="1"/>
        <!-- chioma top -->
        <polygon points="145,130 95,210 195,210" fill="#2E7D5C"/>
        <!-- chioma medium -->
        <polygon points="145,180 80,280 210,280" fill="#3A8E6D"/>
        <!-- chioma base -->
        <polygon points="145,250 60,380 230,380" fill="#2E7D5C"/>
        <!-- tronco -->
        <rect x="128" y="380" width="34" height="34" fill="#8B5A2B"/>
        <!-- decorazioni: palline colorate -->
        <circle cx="125" cy="200" r="6" fill="#FF6B9D"/>
        <circle cx="165" cy="195" r="6" fill="#FFD93D"/>
        <circle cx="110" cy="240" r="6" fill="#C77DFF"/>
        <circle cx="180" cy="245" r="6" fill="#FFD93D"/>
        <circle cx="95"  cy="310" r="7" fill="#FF6B9D"/>
        <circle cx="145" cy="320" r="7" fill="#FFD93D"/>
        <circle cx="195" cy="315" r="7" fill="#C77DFF"/>
        <circle cx="80"  cy="360" r="7" fill="#FFD93D"/>
        <circle cx="210" cy="365" r="7" fill="#FF6B9D"/>

        <!-- REGALI in basso a destra -->
        <!-- regalo grande -->
        <rect x="600" y="400" width="120" height="90" fill="#FF6B9D"/>
        <rect x="650" y="400" width="20" height="90" fill="#FFD93D"/>
        <rect x="600" y="435" width="120" height="20" fill="#FFD93D"/>
        <path d="M 660 400 Q 640 380 645 400 M 660 400 Q 680 380 675 400" stroke="#FFD93D" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- regalo medio -->
        <rect x="540" y="430" width="70" height="60" fill="#C77DFF"/>
        <rect x="568" y="430" width="14" height="60" fill="#FFFFFF"/>
        <rect x="540" y="453" width="70" height="14" fill="#FFFFFF"/>
        <!-- regalo piccolo -->
        <rect x="730" y="445" width="55" height="45" fill="#2E7D5C"/>
        <rect x="750" y="445" width="14" height="45" fill="#FFD93D"/>
        <rect x="730" y="460" width="55" height="14" fill="#FFD93D"/>

        <!-- agrifoglio decorativo in alto -->
        <path d="M 580 60 Q 600 50 610 70 Q 600 90 580 80 Q 570 70 580 60 Z" fill="#2E7D5C"/>
        <path d="M 610 70 Q 630 60 640 80 Q 630 100 610 90 Q 600 80 610 70 Z" fill="#3A8E6D"/>
        <circle cx="595" cy="85"  r="6" fill="#D32F2F"/>
        <circle cx="615" cy="92"  r="6" fill="#D32F2F"/>
        <circle cx="605" cy="78"  r="5" fill="#D32F2F"/>

        <!-- titolo -->
        <text x="285" y="220" font-family="Pacifico, cursive" font-size="40" fill="#D32F2F" opacity="0.95">Sei invitato!</text>

        <!-- zona testo -->
        <rect data-text-zone="festeggiato|quando|dove"
              x="260" y="240" width="460" height="190" rx="20"
              fill="#FFFFFF" opacity="0.6"/>
      </svg>`
    },

    /* --- 3. Animali --- */
    {
      nome: 'Animali',
      emoji: '🐾',
      background: 'linear-gradient(135deg, #D9F0C4 0%, #FFF4CC 60%, #FFE5B5 100%)',
      coloreAccento: '#8B5A2B',
      svg: `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aniBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#D9F0C4"/>
            <stop offset="60%"  stop-color="#FFF4CC"/>
            <stop offset="100%" stop-color="#FFE5B5"/>
          </linearGradient>
        </defs>

        <rect width="800" height="566" fill="url(#aniBg)"/>
        <rect x="14" y="14" width="772" height="538" rx="22" fill="none" stroke="#8B5A2B" stroke-width="3" stroke-dasharray="2 9" opacity="0.5"/>

        <!-- ZAMPETTE sparse in background (decorative paw prints) -->
        <g fill="#8B5A2B" opacity="0.18">
          <g transform="translate(70,90) rotate(-15)">
            <ellipse cx="0"   cy="0"   rx="12" ry="14"/>
            <ellipse cx="-12" cy="-15" rx="5"  ry="6"/>
            <ellipse cx="-2"  cy="-22" rx="5"  ry="6"/>
            <ellipse cx="10"  cy="-20" rx="5"  ry="6"/>
            <ellipse cx="16"  cy="-9"  rx="5"  ry="6"/>
          </g>
          <g transform="translate(110,470) rotate(20)">
            <ellipse cx="0"   cy="0"   rx="12" ry="14"/>
            <ellipse cx="-12" cy="-15" rx="5"  ry="6"/>
            <ellipse cx="-2"  cy="-22" rx="5"  ry="6"/>
            <ellipse cx="10"  cy="-20" rx="5"  ry="6"/>
            <ellipse cx="16"  cy="-9"  rx="5"  ry="6"/>
          </g>
          <g transform="translate(720,440) rotate(-25)">
            <ellipse cx="0"   cy="0"   rx="12" ry="14"/>
            <ellipse cx="-12" cy="-15" rx="5"  ry="6"/>
            <ellipse cx="-2"  cy="-22" rx="5"  ry="6"/>
            <ellipse cx="10"  cy="-20" rx="5"  ry="6"/>
            <ellipse cx="16"  cy="-9"  rx="5"  ry="6"/>
          </g>
          <g transform="translate(740,110) rotate(10)">
            <ellipse cx="0"   cy="0"   rx="12" ry="14"/>
            <ellipse cx="-12" cy="-15" rx="5"  ry="6"/>
            <ellipse cx="-2"  cy="-22" rx="5"  ry="6"/>
            <ellipse cx="10"  cy="-20" rx="5"  ry="6"/>
            <ellipse cx="16"  cy="-9"  rx="5"  ry="6"/>
          </g>
        </g>

        <!-- GATTO in basso a sinistra -->
        <ellipse cx="135" cy="475" rx="60" ry="42" fill="#FFB088"/>
        <circle  cx="135" cy="420" r="38" fill="#FFB088"/>
        <polygon points="105,395 100,365 125,388" fill="#FFB088"/>
        <polygon points="165,395 170,365 145,388" fill="#FFB088"/>
        <polygon points="108,393 105,377 119,388" fill="#FF8AAE"/>
        <polygon points="162,393 165,377 151,388" fill="#FF8AAE"/>
        <circle cx="122" cy="418" r="3" fill="#2A2438"/>
        <circle cx="148" cy="418" r="3" fill="#2A2438"/>
        <path d="M 130 432 Q 135 437 140 432" stroke="#2A2438" stroke-width="2" fill="none" stroke-linecap="round"/>
        <polygon points="133,427 137,427 135,430" fill="#FF6B9D"/>
        <!-- baffi -->
        <line x1="105" y1="425" x2="85"  y2="420" stroke="#2A2438" stroke-width="1"/>
        <line x1="105" y1="430" x2="85"  y2="432" stroke="#2A2438" stroke-width="1"/>
        <line x1="165" y1="425" x2="185" y2="420" stroke="#2A2438" stroke-width="1"/>
        <line x1="165" y1="430" x2="185" y2="432" stroke="#2A2438" stroke-width="1"/>
        <!-- coda -->
        <path d="M 190 470 Q 230 460 240 420 Q 245 400 230 395" stroke="#FFB088" stroke-width="14" fill="none" stroke-linecap="round"/>

        <!-- CANE in basso a destra -->
        <ellipse cx="660" cy="490" rx="62" ry="38" fill="#C19A6B"/>
        <circle  cx="660" cy="440" r="36" fill="#C19A6B"/>
        <!-- orecchie pendenti -->
        <ellipse cx="628" cy="430" rx="14" ry="26" fill="#8B5A2B" transform="rotate(-20 628 430)"/>
        <ellipse cx="692" cy="430" rx="14" ry="26" fill="#8B5A2B" transform="rotate(20 692 430)"/>
        <circle cx="648" cy="436" r="3" fill="#2A2438"/>
        <circle cx="672" cy="436" r="3" fill="#2A2438"/>
        <ellipse cx="660" cy="452" rx="6" ry="5" fill="#2A2438"/>
        <path d="M 655 460 Q 660 465 665 460" stroke="#2A2438" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- coda scodinzolante -->
        <path d="M 718 480 Q 745 460 740 430" stroke="#C19A6B" stroke-width="12" fill="none" stroke-linecap="round"/>

        <!-- cuoricini tra i due -->
        <path d="M 400 460 Q 396 454 402 452 Q 408 454 404 460 L 400 466 Z" fill="#FF6B9D" opacity="0.7"/>
        <path d="M 380 500 Q 376 494 382 492 Q 388 494 384 500 L 380 506 Z" fill="#FF6B9D" opacity="0.55"/>
        <path d="M 420 510 Q 416 504 422 502 Q 428 504 424 510 L 420 516 Z" fill="#FF6B9D" opacity="0.55"/>

        <!-- titolo -->
        <text x="270" y="220" font-family="Pacifico, cursive" font-size="40" fill="#8B5A2B" opacity="0.95">Sei invitato!</text>

        <!-- zona testo -->
        <rect data-text-zone="festeggiato|quando|dove"
              x="260" y="240" width="460" height="190" rx="20"
              fill="#FFFFFF" opacity="0.6"/>
      </svg>`
    },

    /* --- 4. Spazio --- */
    {
      nome: 'Spazio',
      emoji: '🚀',
      background: 'linear-gradient(135deg, #1A1B4B 0%, #3B2C7A 60%, #6B4A9E 100%)',
      coloreAccento: '#FFD93D',
      svg: `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spcBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#1A1B4B"/>
            <stop offset="60%"  stop-color="#3B2C7A"/>
            <stop offset="100%" stop-color="#6B4A9E"/>
          </linearGradient>
          <radialGradient id="spcSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stop-color="#FFE070"/>
            <stop offset="70%" stop-color="#FFA940"/>
            <stop offset="100%" stop-color="#FF6B3D"/>
          </radialGradient>
        </defs>

        <rect width="800" height="566" fill="url(#spcBg)"/>
        <rect x="14" y="14" width="772" height="538" rx="22" fill="none" stroke="#FFD93D" stroke-width="3" stroke-dasharray="2 9" opacity="0.55"/>

        <!-- stelline sparse -->
        <g fill="#FFFFFF">
          <circle cx="55"  cy="50"  r="2"/>
          <circle cx="120" cy="90"  r="1.5"/>
          <circle cx="70"  cy="160" r="2"/>
          <circle cx="40"  cy="240" r="1.5"/>
          <circle cx="100" cy="330" r="2"/>
          <circle cx="55"  cy="420" r="1.5"/>
          <circle cx="135" cy="500" r="2"/>
          <circle cx="380" cy="40"  r="2"/>
          <circle cx="450" cy="80"  r="1.5"/>
          <circle cx="500" cy="50"  r="2"/>
          <circle cx="730" cy="80"  r="2"/>
          <circle cx="760" cy="160" r="1.5"/>
          <circle cx="720" cy="260" r="2"/>
          <circle cx="755" cy="390" r="1.5"/>
          <circle cx="710" cy="500" r="2"/>
        </g>
        <!-- stelle a 4 punte -->
        <path d="M 90 100 l 3 7 l 7 1 l -6 4 l 2 7 l -6 -4 l -6 4 l 2 -7 l -6 -4 l 7 -1 z" fill="#FFD93D"/>
        <path d="M 440 30 l 2 6 l 6 1 l -5 3 l 1 6 l -4 -3 l -4 3 l 1 -6 l -5 -3 l 6 -1 z" fill="#FFD93D"/>
        <path d="M 700 350 l 3 7 l 7 1 l -6 4 l 2 7 l -6 -4 l -6 4 l 2 -7 l -6 -4 l 7 -1 z" fill="#FFD93D"/>

        <!-- LUNA in alto a sinistra -->
        <circle cx="140" cy="120" r="50" fill="#F0E0C0"/>
        <circle cx="140" cy="120" r="50" fill="#D0BFA0" opacity="0.3"/>
        <circle cx="118" cy="105" r="6"  fill="#B8A88A" opacity="0.5"/>
        <circle cx="155" cy="135" r="8"  fill="#B8A88A" opacity="0.5"/>
        <circle cx="130" cy="142" r="4"  fill="#B8A88A" opacity="0.5"/>

        <!-- PIANETA con anello in alto a destra -->
        <ellipse cx="680" cy="180" rx="72" ry="14" fill="none" stroke="#FFD93D" stroke-width="3" opacity="0.7" transform="rotate(-18 680 180)"/>
        <circle cx="680" cy="180" r="40" fill="url(#spcSun)"/>
        <ellipse cx="680" cy="180" rx="72" ry="14" fill="none" stroke="#FFD93D" stroke-width="3" opacity="0.9" transform="rotate(-18 680 180)" stroke-dasharray="100 200"/>

        <!-- RAZZO in basso al centro-sinistra -->
        <g transform="translate(180,420) rotate(-15)">
          <!-- corpo razzo -->
          <path d="M 0 -50 Q 18 -40 18 0 L 18 50 L -18 50 L -18 0 Q -18 -40 0 -50 Z" fill="#E8E8E8"/>
          <!-- punta -->
          <path d="M 0 -50 Q 18 -40 18 0 L -18 0 Q -18 -40 0 -50 Z" fill="#FF6B9D"/>
          <!-- oblò -->
          <circle cx="0" cy="-10" r="9" fill="#7BC8FF" stroke="#FFFFFF" stroke-width="2"/>
          <!-- alette -->
          <polygon points="-18,30 -32,55 -18,55" fill="#FF6B9D"/>
          <polygon points="18,30 32,55 18,55" fill="#FF6B9D"/>
          <!-- fiamma -->
          <path d="M -10 50 Q -5 70 0 75 Q 5 70 10 50 Z" fill="#FFA940"/>
          <path d="M -5 50 Q 0 65 5 50 Z" fill="#FFE070"/>
        </g>

        <!-- titolo -->
        <text x="285" y="220" font-family="Pacifico, cursive" font-size="40" fill="#FFD93D" opacity="0.98">Sei invitato!</text>

        <!-- zona testo -->
        <rect data-text-zone="festeggiato|quando|dove"
              x="260" y="240" width="460" height="190" rx="20"
              fill="#FFFFFF" opacity="0.65"/>
      </svg>`
    },

    /* --- 5. Unicorno --- */
    {
      nome: 'Unicorno',
      emoji: '🦄',
      background: 'linear-gradient(135deg, #FFD6E7 0%, #E0D0FF 50%, #CCE8FF 100%)',
      coloreAccento: '#C77DFF',
      svg: `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="template-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="uniBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#FFD6E7"/>
            <stop offset="50%"  stop-color="#E0D0FF"/>
            <stop offset="100%" stop-color="#CCE8FF"/>
          </linearGradient>
          <linearGradient id="uniRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#FF6B9D"/>
            <stop offset="25%"  stop-color="#FFA940"/>
            <stop offset="50%"  stop-color="#FFD93D"/>
            <stop offset="75%"  stop-color="#80E5C5"/>
            <stop offset="100%" stop-color="#C77DFF"/>
          </linearGradient>
        </defs>

        <rect width="800" height="566" fill="url(#uniBg)"/>
        <rect x="14" y="14" width="772" height="538" rx="22" fill="none" stroke="#C77DFF" stroke-width="3" stroke-dasharray="2 9" opacity="0.55"/>

        <!-- ARCOBALENO in alto a destra -->
        <g transform="translate(700,200)">
          <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke="#FF6B9D" stroke-width="12"/>
          <path d="M -75 0 A 75 75 0 0 1 75 0" fill="none" stroke="#FFA940" stroke-width="12"/>
          <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke="#FFD93D" stroke-width="12"/>
          <path d="M -45 0 A 45 45 0 0 1 45 0" fill="none" stroke="#80E5C5" stroke-width="12"/>
          <path d="M -30 0 A 30 30 0 0 1 30 0" fill="none" stroke="#7BC8FF" stroke-width="12"/>
          <path d="M -15 0 A 15 15 0 0 1 15 0" fill="none" stroke="#C77DFF" stroke-width="12"/>
        </g>
        <!-- nuvolette ai piedi dell'arcobaleno -->
        <ellipse cx="600" cy="205" rx="28" ry="14" fill="#FFFFFF" opacity="0.95"/>
        <ellipse cx="613" cy="198" rx="20" ry="12" fill="#FFFFFF" opacity="0.95"/>
        <ellipse cx="800" cy="205" rx="28" ry="14" fill="#FFFFFF" opacity="0.95"/>
        <ellipse cx="787" cy="198" rx="20" ry="12" fill="#FFFFFF" opacity="0.95"/>

        <!-- UNICORNO in basso a sinistra (silhouette stilizzata) -->
        <g transform="translate(150,430)">
          <!-- corpo -->
          <ellipse cx="0" cy="0" rx="70" ry="38" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <!-- gambe -->
          <rect x="-50" y="20" width="12" height="55" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <rect x="-25" y="25" width="12" height="50" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <rect x="15"  y="25" width="12" height="50" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <rect x="40"  y="20" width="12" height="55" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <!-- collo + testa -->
          <path d="M -60 -10 Q -75 -50 -100 -55 Q -120 -55 -115 -30 Q -110 -10 -85 0 Z" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <!-- orecchio -->
          <polygon points="-100,-55 -97,-72 -90,-58" fill="#FFFFFF" stroke="#C77DFF" stroke-width="2"/>
          <!-- corno -->
          <polygon points="-110,-55 -103,-85 -98,-58" fill="#FFD93D" stroke="#E5B92F" stroke-width="1.5"/>
          <!-- occhio -->
          <circle cx="-103" cy="-42" r="2.5" fill="#2A2438"/>
          <!-- guancia rosa -->
          <circle cx="-108" cy="-32" r="4" fill="#FFB5D8" opacity="0.7"/>
          <!-- criniera (multi-colore) -->
          <path d="M -90 -50 Q -75 -65 -55 -55 Q -50 -40 -65 -30 Q -85 -35 -90 -50 Z" fill="#FF6B9D"/>
          <path d="M -70 -45 Q -55 -55 -40 -45 Q -35 -30 -50 -20 Q -65 -28 -70 -45 Z" fill="#C77DFF"/>
          <path d="M -50 -35 Q -35 -42 -20 -28 Q -18 -10 -35 -10 Q -50 -18 -50 -35 Z" fill="#80E5C5"/>
          <!-- coda -->
          <path d="M 70 -5 Q 100 -15 105 10 Q 110 35 90 30 Q 75 15 70 -5 Z" fill="#FF6B9D"/>
          <path d="M 85 5 Q 110 5 110 30 Q 100 40 85 25 Z" fill="#C77DFF"/>
        </g>

        <!-- stelline magiche sparse -->
        <path d="M 380 90 l 3 7 l 7 1 l -6 4 l 2 7 l -6 -4 l -6 4 l 2 -7 l -6 -4 l 7 -1 z" fill="#C77DFF" opacity="0.85"/>
        <path d="M 470 50 l 2 6 l 6 1 l -5 3 l 1 6 l -4 -3 l -4 3 l 1 -6 l -5 -3 l 6 -1 z" fill="#FF6B9D" opacity="0.85"/>
        <path d="M 350 480 l 3 7 l 7 1 l -6 4 l 2 7 l -6 -4 l -6 4 l 2 -7 l -6 -4 l 7 -1 z" fill="#80E5C5" opacity="0.85"/>
        <path d="M 510 510 l 2 6 l 6 1 l -5 3 l 1 6 l -4 -3 l -4 3 l 1 -6 l -5 -3 l 6 -1 z" fill="#FFD93D" opacity="0.85"/>

        <!-- titolo -->
        <text x="285" y="220" font-family="Pacifico, cursive" font-size="40" fill="#C77DFF" opacity="0.95">Sei invitato!</text>

        <!-- zona testo -->
        <rect data-text-zone="festeggiato|quando|dove"
              x="260" y="240" width="460" height="190" rx="20"
              fill="#FFFFFF" opacity="0.62"/>
      </svg>`
    }
  ]
};

/* =======================================================
   Template salvati dall'utente (localStorage)
   =======================================================
   Chiave: 'studiomagico_templates' → array di oggetti template
   con isUserTemplate=true, snapshot dell'editor, id univoco.
   ======================================================= */

const USER_TEMPLATES_KEY = 'studiomagico_templates';

window.getUserTemplates = function () {
  try {
    const raw = localStorage.getItem(USER_TEMPLATES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
};

window.saveUserTemplate = function (tpl) {
  if (!tpl || typeof tpl !== 'object') return false;
  const list = window.getUserTemplates();
  list.push(tpl);
  try {
    localStorage.setItem(USER_TEMPLATES_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.warn('[templates] saveUserTemplate fallito:', e);
    return false;
  }
};

window.deleteUserTemplate = function (id) {
  if (!id) return false;
  const list = window.getUserTemplates();
  const next = list.filter(t => t.id !== id);
  if (next.length === list.length) return false;
  try {
    localStorage.setItem(USER_TEMPLATES_KEY, JSON.stringify(next));
    return true;
  } catch (e) {
    console.warn('[templates] deleteUserTemplate fallito:', e);
    return false;
  }
};

/* =======================================================
   Bozze (work-in-progress) — localStorage multi-slot
   =======================================================
   Chiave: 'studiomagico_drafts' → array di {id, nome, updatedAt, state}
   La state è una copia profonda di APP_STATE (incluso brushStrokes),
   senza undoStack.
   ======================================================= */

const DRAFTS_KEY = 'studiomagico_drafts';

window.getDrafts = function () {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
};

window.saveDraft = function (draft) {
  if (!draft || typeof draft !== 'object') return false;
  const list = window.getDrafts();
  list.push(draft);
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.warn('[templates] saveDraft fallito:', e);
    return false;
  }
};

window.deleteDraft = function (id) {
  if (!id) return false;
  const list = window.getDrafts();
  const next = list.filter(d => d.id !== id);
  if (next.length === list.length) return false;
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
    return true;
  } catch (e) {
    console.warn('[templates] deleteDraft fallito:', e);
    return false;
  }
};
