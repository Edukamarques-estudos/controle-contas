:root {
    /* Tema Claro (Paleta Pastel Suave) */
    --bg: #f8f7f4;
    --surface: #ffffff;
    --surface-paid: #fcfbf9;
    --header-home: #3d5a7c;
    --header-home-text: #ffffff;
    --card-contas: #7c9cbf;
    --card-carro: #5c947c;
    --card-adm: #7c77a6;
    --debit-bg: #fdf5f6;
    --debit-border: #f3dce0;
    --credit-bg: #f2f8fd;
    --credit-border: #d5e6f5;
    --notes-bg: rgba(0, 0, 0, 0.035);
    --notes-text: #5c6573;
    --primary: #7c9cbf;
    --primary-hover: #6788ad;
    --primary-soft: #e6eef7;
    --primary-text: #3d5a7c;
    --success: #4a8b71;
    --success-bg: #e1f3eb;
    --warning: #a67c37;
    --warning-bg: #fcf1d8;
    --warning-border: #f2dfb3;
    --danger: #b85d68;
    --danger-bg: #fae6e8;
    --edit: #6d689e;
    --edit-bg: #ecebfa;
    --gain: #3b73a8;
    --gain-bg: #dcebfa;
    --text: #3b424c;
    --muted: #7e8794;
    --border: #eae6df;
    --shadow: 0 4px 12px rgba(59, 66, 76, 0.05);
    --radius: 16px;
  }
  
  /* Tema Escuro (Dark Mode Pastel) */
  body.dark {
    --bg: #16191e;
    --surface: #1f242c;
    --surface-paid: #1a1e25;
    --header-home: #1f2937;
    --header-home-text: #e2e8f0;
    --card-contas: #4d6e94;
    --card-carro: #3e6b58;
    --card-adm: #54507a;
    --debit-bg: #271f23;
    --debit-border: #3d2c33;
    --credit-bg: #1d2632;
    --credit-border: #2c3c52;
    --notes-bg: rgba(255, 255, 255, 0.05);
    --notes-text: #cbd5e1;
    --primary: #8ab0db;
    --primary-hover: #9fc0e6;
    --primary-soft: #253447;
    --primary-text: #a5c7ed;
    --success: #6ec49e;
    --success-bg: #1d362d;
    --warning: #e5b567;
    --warning-bg: #382e1e;
    --warning-border: #4d3f28;
    --danger: #e0828d;
    --danger-bg: #3b2327;
    --edit: #a8a2e6;
    --edit-bg: #29273d;
    --gain: #7cb8f0;
    --gain-bg: #1c324a;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --border: #2e3540;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
  
  body {
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    line-height: 1.5;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  
  /* ================= TELA INICIAL (HOME) ================= */
  #homeScreen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .home-header {
    background: var(--header-home);
    color: var(--header-home-text);
    padding: 18px 20px 22px 20px;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }
  
  .home-header-inner {
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .home-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .home-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .icon-btn-header {
    background: transparent;
    color: var(--header-home-text);
    border: none;
    padding: 6px 8px;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 1.1rem;
    transition: background 0.15s ease;
  }
  
  .icon-btn-header:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  
  .home-username {
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }
  
  .bell-badge {
    position: absolute;
    top: 1px;
    right: 1px;
    background: #e06d7a;
    color: #ffffff;
    font-size: 0.68rem;
    font-weight: 800;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--header-home);
  }
  
  .home-container {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    padding: 22px 18px 24px 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }
  
  .home-status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.78rem;
    color: var(--muted);
    padding: 0 4px;
  }
  
  /* Cartão Principal Unificado */
  .menu-card {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    padding: 28px 24px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 6px 16px rgba(59, 66, 76, 0.12);
    transition: transform 0.15s ease, filter 0.15s ease;
    text-align: left;
    border: none;
    width: 100%;
  }
  
  .menu-card:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
  }
  
  .menu-card:active {
    transform: scale(0.99);
  }
  
  .menu-card::before {
    content: "";
    position: absolute;
    right: -35px;
    top: -45px;
    width: 190px;
    height: 220px;
    border-radius: 50%;
    border: 22px solid rgba(255, 255, 255, 0.11);
    pointer-events: none;
  }
  
  .menu-card::after {
    content: "";
    position: absolute;
    right: 35px;
    bottom: -75px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.07);
    pointer-events: none;
  }
  
  .menu-card.card-financeiro { background: var(--card-contas); }
  
  .menu-card-text {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .menu-card-title {
    font-size: 1.28rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  .menu-card-desc {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.35;
    max-width: 260px;
  }
  
  .menu-card-icon {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    opacity: 0.95;
  }
  
  /* Rodapé discreto da Home com ADM pequeno */
  .home-footer {
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    padding: 12px 18px 22px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .btn-adm-footer {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 600;
    opacity: 0.78;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  
  .btn-adm-footer:hover {
    opacity: 1;
    border-color: var(--card-adm);
    color: var(--text);
  }
  
  /* ================= DRAWER MENU LATERAL (TRÊS RISCOS) ================= */
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 20, 28, 0.5);
    backdrop-filter: blur(2px);
    display: none;
    z-index: 60;
  }
  
  .drawer-backdrop.active {
    display: block;
  }
  
  .drawer-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 290px;
    max-width: 84vw;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 6px 0 24px rgba(0, 0, 0, 0.2);
    z-index: 65;
  }
  
  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  
  .drawer-header h3 {
    font-size: 1.05rem;
    font-weight: 700;
  }
  
  .drawer-item {
    width: 100%;
    justify-content: flex-start;
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: left;
  }
  
  .drawer-item:hover {
    border-color: var(--primary);
  }
  
  /* ================= TELAS INTERNAS ================= */
  .subpage-wrapper {
    max-width: 960px;
    margin: 0 auto;
    padding: 14px 18px 88px 18px;
  }
  
  .subpage-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }
  
  .subpage-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .btn-home-icon {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 12px;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-home-icon:hover {
    border-color: var(--primary);
    color: var(--primary-text);
  }
  
  .subpage-title-group h1 {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text);
  }
  
  .sync-badge {
    font-size: 0.72rem;
    padding: 3px 9px;
    border-radius: 999px;
    background: var(--success-bg);
    color: var(--success);
    font-weight: 600;
  }
  
  .sync-badge.offline {
    background: var(--warning-bg);
    color: var(--warning);
  }
  
  /* Botões Gerais */
  button {
    cursor: pointer;
    border: none;
    border-radius: 10px;
    padding: 9px 14px;
    font-size: 0.88rem;
    font-weight: 600;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  
  .btn-primary { background: var(--primary); color: #ffffff; }
  body.dark .btn-primary { color: #16191e; }
  .btn-primary:hover { background: var(--primary-hover); }
  
  .btn-outline { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
  .btn-outline:hover { filter: brightness(0.95); }
  body.dark .btn-outline:hover { filter: brightness(1.15); }
  
  /* Botão Flutuante Circular (+) */
  .fab-add {
    position: fixed;
    bottom: 22px;
    right: 22px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary);
    color: #ffffff;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
    padding: 0;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
    z-index: 40;
  }
  body.dark .fab-add {
    color: #16191e;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
  }
  .fab-add:hover {
    background: var(--primary-hover);
    transform: scale(1.05);
  }
  
  /* Botões de ação */
  .btn-sm { padding: 5px 9px; font-size: 0.75rem; border-radius: 7px; }
  .btn-icon-only { padding: 5px 8px; min-width: 28px; height: 27px; }
  .btn-pay { background: var(--success-bg); color: var(--success); }
  .btn-edit { background: var(--edit-bg); color: var(--edit); }
  .btn-copy { background: var(--primary-soft); color: var(--primary-text); }
  
  /* Botão Excluir (X) no canto superior direito do card */
  .btn-del-corner {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 0.75rem;
    border-radius: 7px;
    background: var(--danger-bg);
    color: var(--danger);
    opacity: 0.85;
  }
  .btn-del-corner:hover { opacity: 1; }
  
  /* ================= PAINEL SUPERIOR CONGELADO E CENTRALIZADO ================= */
  .sticky-top-panel {
    position: sticky;
    top: 0;
    z-index: 35;
    background: var(--bg);
    padding: 8px 0 10px 0;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    max-width: 720px;
    margin: 0 auto;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 10px 12px;
    box-shadow: var(--shadow);
  }
  
  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 2px;
  }
  
  .summary-item span {
    font-size: 0.73rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  .summary-item strong {
    font-size: 1.02rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .summary-item small {
    font-size: 0.69rem;
    color: var(--muted);
    line-height: 1.2;
  }
  
  .text-danger { color: var(--danger); }
  .text-success { color: var(--success); }
  .text-credit { color: var(--gain); }
  
  /* ================= BARRA DE FILTROS RETRÁTIL ================= */
  .filters-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 10px 12px;
    margin-bottom: 14px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filters-box.collapsed {
    gap: 0;
    padding: 8px 12px;
  }

  .filters-toggle-bar {
    width: 100%;
    background: transparent;
    color: var(--text);
    padding: 4px 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.86rem;
    font-weight: 700;
    border-radius: 8px;
  }

  .filters-toggle-bar:hover {
    background: var(--bg);
  }

  .filters-toggle-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filters-summary-badge {
    font-size: 0.74rem;
    font-weight: 600;
    padding: 2px 9px;
    border-radius: 999px;
    background: var(--primary-soft);
    color: var(--primary-text);
  }

  .filters-chevron {
    font-size: 0.95rem;
    color: var(--muted);
    transition: transform 0.2s ease;
  }

  .filters-box:not(.collapsed) .filters-chevron {
    transform: rotate(180deg);
  }

  .filters-collapsible-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 8px;
    border-top: 1px solid var(--border);
  }

  .filters-box.collapsed .filters-collapsible-content {
    display: none;
  }
  
  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    align-items: center;
  }
  
  .period-pills {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
  
  .pill-btn {
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 6px 11px;
    border-radius: 9px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .pill-btn.active {
    background: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
  }
  body.dark .pill-btn.active {
    color: #16191e;
  }
  
  .custom-range-inputs {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: var(--muted);
  }
  
  /* Dropdown de Seleção Múltipla */
  .multi-dropdown {
    position: relative;
    display: inline-block;
  }
  
  .multi-trigger {
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 7px 11px;
    border-radius: 9px;
    font-size: 0.82rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  
  .multi-trigger.has-selection {
    background: var(--primary-soft);
    color: var(--primary-text);
    border-color: var(--primary);
  }
  
  .multi-panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 285px;
    max-width: 88vw;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
    padding: 10px;
    z-index: 45;
    display: none;
    flex-direction: column;
    gap: 8px;
  }
  
  .multi-panel.open {
    display: flex;
  }
  
  .multi-panel-search {
    width: 100%;
    padding: 6px 9px !important;
    font-size: 0.8rem !important;
  }
  
  .multi-options-list {
    max-height: 210px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .multi-option-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 6px;
    border-radius: 7px;
    font-size: 0.82rem;
    cursor: pointer;
  }
  
  .multi-option-item:hover {
    background: var(--bg);
  }
  
  .multi-option-item input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: var(--primary);
    cursor: pointer;
  }
  
  .multi-panel-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--border);
    padding-top: 7px;
  }
  
  .search-input {
    flex: 1;
    min-width: 160px;
  }
  
  input[type="month"], select, input[type="text"], input[type="number"], input[type="date"], textarea {
    padding: 7px 10px;
    border: 1px solid var(--border);
    border-radius: 9px;
    font-size: 0.84rem;
    background: var(--surface);
    color: var(--text);
    outline: none;
  }
  
  body.dark input[type="month"],
  body.dark input[type="date"] {
    color-scheme: dark;
  }
  
  textarea {
    resize: vertical;
    min-height: 68px;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
  }
  
  /* Chips de filtros ativos */
  .active-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }
  
  .filter-chip {
    background: var(--primary-soft);
    color: var(--primary-text);
    font-size: 0.74rem;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  
  .filter-chip button {
    background: transparent;
    color: inherit;
    padding: 0;
    font-size: 0.78rem;
    line-height: 1;
  }
  
  /* Lista de Registros */
  .bill-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .bill-item {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 15px 42px 15px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    box-shadow: var(--shadow);
  }
  
  .bill-item.debit-item {
    background: var(--debit-bg);
    border-color: var(--debit-border);
  }
  
  .bill-item.credit-item {
    background: var(--credit-bg);
    border-color: var(--credit-border);
  }
  
  .bill-item.paid {
    opacity: 0.84;
  }
  
  .bill-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 220px;
    flex: 1;
  }
  
  .bill-title {
    font-weight: 600;
    font-size: 1.02rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .status-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .badge {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .badge-pending { background: var(--warning-bg); color: var(--warning); }
  .badge-overdue { background: var(--danger-bg); color: var(--danger); }
  .badge-paid { background: var(--success-bg); color: var(--success); }
  .badge-type-debit { background: var(--danger-bg); color: var(--danger); }
  .badge-type-credit { background: var(--gain-bg); color: var(--gain); }
  
  .bill-meta {
    font-size: 0.84rem;
    color: var(--muted);
  }
  
  .weekday-tag {
    text-transform: lowercase;
    font-weight: 600;
    color: var(--text);
    opacity: 0.8;
  }
  
  .bill-notes {
    font-size: 0.83rem;
    color: var(--notes-text);
    background: var(--notes-bg);
    padding: 6px 10px;
    border-radius: 8px;
    margin-top: 2px;
    border-left: 3px solid var(--primary);
    word-break: break-word;
  }
  
  .bill-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .bill-amount {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--danger);
  }
  
  .bill-amount.credit {
    color: var(--gain);
  }
  
  .bill-actions {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .empty-state {
    text-align: center;
    padding: 36px 20px;
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px dashed var(--border);
    color: var(--muted);
    font-size: 0.9rem;
  }
  
  /* ================= SEÇÃO ADM ================= */
  .adm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }
  
  .adm-card {
    background: var(--surface);
    padding: 20px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .adm-card h2 { font-size: 1.08rem; }
  .adm-card p { font-size: 0.84rem; color: var(--muted); }
  .adm-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  
  .adm-inline-form {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
  }
  
  .adm-inline-form input {
    flex: 1;
    min-width: 140px;
  }
  
  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 4px;
  }
  
  .config-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    border: 1px solid var(--border);
    background: var(--bg);
  }
  
  .config-tag.tag-credit {
    background: var(--credit-bg);
    border-color: var(--credit-border);
    color: var(--gain);
  }
  
  .config-tag.tag-debit {
    background: var(--debit-bg);
    border-color: var(--debit-border);
    color: var(--danger);
  }
  
  .config-tag button {
    background: transparent;
    color: inherit;
    padding: 0 2px;
    font-size: 0.8rem;
    opacity: 0.75;
  }
  
  .config-tag button:hover {
    opacity: 1;
  }
  
  /* Modais */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 20, 28, 0.55);
    backdrop-filter: blur(2px);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 70;
  }
  
  .modal-backdrop.active { display: flex; }
  
  .modal {
    background: var(--surface);
    width: 100%;
    max-width: 470px;
    border-radius: var(--radius);
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.25);
    max-height: 92vh;
    overflow-y: auto;
  }
  
  .modal.modal-wide {
    max-width: 780px;
  }
  
  .modal h2 { font-size: 1.2rem; margin-bottom: 6px; }
  .modal p.subtitle { font-size: 0.88rem; color: var(--muted); margin-bottom: 16px; }
  
  .form-group {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  
  .form-group label { font-size: 0.84rem; font-weight: 600; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  
  /* Lista de Lembretes (Sino) */
  .reminder-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  
  .reminder-item {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  
  .reminder-item.overdue {
    background: var(--danger-bg);
    border-color: var(--debit-border);
  }
  
  .reminder-item.soon {
    background: var(--warning-bg);
    border-color: var(--warning-border);
  }
  
  .reminder-info strong {
    display: block;
    font-size: 0.92rem;
  }
  
  .reminder-info span {
    font-size: 0.8rem;
    color: var(--muted);
  }
  
  .reminder-val {
    font-weight: 700;
    font-size: 0.92rem;
    white-space: nowrap;
  }
  
  /* Tabela de Relatório para Impressão */
  .report-area {
    margin-top: 14px;
    border-top: 1px solid var(--border);
    padding-top: 14px;
  }
  
  .report-summary-box {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    background: var(--bg);
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 12px;
    font-size: 0.86rem;
  }
  
  .report-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
  }
  
  .report-table th, .report-table td {
    border-bottom: 1px solid var(--border);
    padding: 8px 6px;
    text-align: left;
  }
  
  .report-table th {
    font-weight: 700;
    color: var(--muted);
    font-size: 0.78rem;
    text-transform: uppercase;
  }
  
  .hidden { display: none !important; }
  
  /* Estilos específicos de impressão */
  @media print {
    body * {
      visibility: hidden;
    }
    #printReportContainer, #printReportContainer * {
      visibility: visible;
    }
    #printReportContainer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: #ffffff !important;
      color: #000000 !important;
      padding: 12px;
    }
    .no-print {
      display: none !important;
    }
  }
3. app.js
JavaScript


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const FIREBASE_DATABASE_URL = "https://controle-contas-6fa7e-default-rtdb.firebaseio.com";

// Controle do Tema (Claro / Escuro)
const themeToggleBtn = document.getElementById('themeToggle');
function applySavedTheme() {
  const savedTheme = localStorage.getItem('contas_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }
}
applySavedTheme();

window.toggleTheme = function() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('contas_theme', isDark ? 'dark' : 'light');
  if (themeToggleBtn) themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
};

const app = initializeApp({ databaseURL: FIREBASE_DATABASE_URL });
const db = getDatabase(app);

// Referências no Firebase
const refs = {
  lancamentos: ref(db, 'lancamentos'),
  contasLegacy: ref(db, 'contas'),
  carroLegacy: ref(db, 'carro'),
  configTypes: ref(db, 'config/types'),
  configCategories: ref(db, 'config/categories')
};

const DEFAULT_TYPES = [
  { id: 't_conta', name: 'Conta a Pagar', nature: 'debit' },
  { id: 't_ganhos', name: 'Ganhos App', nature: 'credit' },
  { id: 't_comb', name: 'Combustível', nature: 'debit' },
  { id: 't_prev', name: 'Man. Preventiva', nature: 'debit' },
  { id: 't_corr', name: 'Man. Corretiva', nature: 'debit' },
  { id: 't_ativo', name: 'Compra de Ativo', nature: 'debit' }
];

const DEFAULT_CATEGORIES = [
  "Casa / Moradia",
  "Contas Fixas",
  "Cartão / Empréstimo",
  "Uber / 99 / Corridas",
  "Abastecimento",
  "Revisão / Troca de Óleo",
  "Mecânica Geral",
  "Pneus / Alinhamento",
  "Elétrica / Bateria",
  "Documentação / Seguro / IPVA",
  "Estética",
  "Outros"
];

let rawBuckets = {
  lancamentos: [],
  contasLegacy: [],
  carroLegacy: []
};

let customTypes = [...DEFAULT_TYPES];
let customCategories = [...DEFAULT_CATEGORIES];

let currentPage = 'home';
let periodMode = 'month';
let lastPaidBill = null;

// Conjuntos de filtros múltiplos selecionados
let selectedDescs = new Set();
let selectedTypes = new Set();
let selectedCats = new Set();

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const monthFilter = document.getElementById('monthFilter');
const syncStatus = document.getElementById('syncStatus');
const syncStatusHome = document.getElementById('syncStatusHome');

function getTodayLocalStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysToStr(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d + days);
  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

function getCurrentWeekRange() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const todayStr = getTodayLocalStr();
  const start = addDaysToStr(todayStr, -dayOfWeek);
  const end = addDaysToStr(start, 6);
  return { start, end };
}

function getCurrentMonthStr() {
  return getTodayLocalStr().slice(0, 7);
}

monthFilter.value = getCurrentMonthStr();

function getAllRecords() {
  return [
    ...rawBuckets.lancamentos.map(item => ({
      ...item,
      _source: 'lancamentos',
      launchType: item.launchType || 'Conta a Pagar',
      nature: item.nature || getNatureByTypeName(item.launchType || 'Conta a Pagar')
    })),
    ...rawBuckets.contasLegacy.map(item => ({
      ...item,
      _source: 'contas',
      launchType: item.launchType || 'Conta a Pagar',
      nature: 'debit'
    })),
    ...rawBuckets.carroLegacy.map(item => {
      const tName = item.maintType || item.launchType || 'Man. Preventiva';
      return {
        ...item,
        _source: 'carro',
        launchType: tName,
        nature: tName === 'Ganhos App' ? 'credit' : getNatureByTypeName(tName)
      };
    })
  ];
}

function getNatureByTypeName(typeName) {
  const found = customTypes.find(t => t.name.toLowerCase() === String(typeName || '').toLowerCase());
  if (found) return found.nature;
  if (String(typeName || '').toLowerCase().includes('ganho') || String(typeName || '').toLowerCase().includes('crédito')) {
    return 'credit';
  }
  return 'debit';
}

function onDataUpdated() {
  document.getElementById('countTotalRecords').textContent = getAllRecords().length;
  updateBellReminders();
  refreshMultiFilterOptions();
  if (currentPage === 'financeiro') render();
}

// Escuta configurações de Tipos na ADM
onValue(refs.configTypes, (snapshot) => {
  const val = snapshot.val();
  if (val && Array.isArray(val) && val.length > 0) {
    customTypes = val;
  } else if (val && typeof val === 'object') {
    customTypes = Object.values(val);
  } else {
    customTypes = [...DEFAULT_TYPES];
  }
  renderAdmConfig();
  refreshMultiFilterOptions();
  if (currentPage === 'financeiro') render();
});

// Escuta configurações de Categorias na ADM
onValue(refs.configCategories, (snapshot) => {
  const val = snapshot.val();
  if (val && Array.isArray(val) && val.length > 0) {
    customCategories = val;
  } else if (val && typeof val === 'object') {
    customCategories = Object.values(val);
  } else {
    customCategories = [...DEFAULT_CATEGORIES];
  }
  renderAdmConfig();
  refreshMultiFilterOptions();
});

// Escuta base unificada
onValue(refs.lancamentos, (snapshot) => {
  const data = snapshot.val();
  rawBuckets.lancamentos = data ? Object.values(data) : [];
  syncStatus.textContent = "Sincronizado";
  syncStatus.classList.remove("offline");
  syncStatusHome.textContent = "● Nuvem ativa";
  onDataUpdated();
}, (error) => {
  console.error(error);
  syncStatus.textContent = "Erro de conexão";
  syncStatus.classList.add("offline");
  syncStatusHome.textContent = "Offline";
});

// Escuta registros antigos de contas
onValue(refs.contasLegacy, (snapshot) => {
  const data = snapshot.val();
  rawBuckets.contasLegacy = data ? Object.values(data) : [];
  onDataUpdated();
});

// Escuta registros antigos de carro
onValue(refs.carroLegacy, (snapshot) => {
  const data = snapshot.val();
  rawBuckets.carroLegacy = data ? Object.values(data) : [];
  onDataUpdated();
});

// ================= ADM: CADASTRO DE TIPOS E CATEGORIAS =================
function renderAdmConfig() {
  const typesContainer = document.getElementById('admTypesList');
  const catsContainer = document.getElementById('admCategoriesList');

  typesContainer.innerHTML = customTypes.map((t, idx) => `
    <span class="config-tag ${t.nature === 'credit' ? 'tag-credit' : 'tag-debit'}">
      ${t.nature === 'credit' ? '+' : '-'} ${escapeHTML(t.name)}
      <button type="button" onclick="removeLaunchType(${idx})" title="Remover tipo">✕</button>
    </span>
  `).join('');

  catsContainer.innerHTML = customCategories.map((c, idx) => `
    <span class="config-tag">
      ${escapeHTML(c)}
      <button type="button" onclick="removeCategoryItem(${idx})" title="Remover categoria">✕</button>
    </span>
  `).join('');
}

window.addLaunchType = async function() {
  const nameInput = document.getElementById('newTypeName');
  const nature = document.getElementById('newTypeNature').value;
  const name = nameInput.value.trim();
  if (!name) return;

  if (customTypes.some(t => t.name.toLowerCase() === name.toLowerCase())) {
    alert('Já existe um tipo com esse nome.');
    return;
  }

  const updated = [...customTypes, { id: 't_' + Date.now(), name, nature }];
  await set(refs.configTypes, updated);
  nameInput.value = '';
};

window.removeLaunchType = async function(index) {
  if (customTypes.length <= 1) {
    alert('Mantenha pelo menos 1 tipo cadastrado.');
    return;
  }
  if (!confirm(`Remover o tipo "${customTypes[index].name}"?`)) return;
  const updated = customTypes.filter((_, i) => i !== index);
  await set(refs.configTypes, updated);
};

window.addCategoryItem = async function() {
  const input = document.getElementById('newCategoryName');
  const name = input.value.trim();
  if (!name) return;

  if (customCategories.some(c => c.toLowerCase() === name.toLowerCase())) {
    alert('Essa categoria já está cadastrada.');
    return;
  }

  const updated = [...customCategories, name];
  await set(refs.configCategories, updated);
  input.value = '';
};

window.removeCategoryItem = async function(index) {
  if (customCategories.length <= 1) {
    alert('Mantenha pelo menos 1 categoria cadastrada.');
    return;
  }
  if (!confirm(`Remover a categoria "${customCategories[index]}"?`)) return;
  const updated = customCategories.filter((_, i) => i !== index);
  await set(refs.configCategories, updated);
};

// ================= EXPANDIR / RECOLHER FILTROS =================
window.toggleFiltersPanel = function() {
  const box = document.getElementById('filtersBox');
  const btn = document.getElementById('filtersToggleBtn');
  const isCollapsed = box.classList.toggle('collapsed');
  btn.setAttribute('aria-expanded', String(!isCollapsed));
};

function updateFiltersSummaryBadge() {
  const badge = document.getElementById('filtersSummaryBadge');
  if (!badge) return;

  const parts = [];
  if (periodMode === 'today') parts.push('Hoje');
  else if (periodMode === 'week') parts.push('Semana');
  else if (periodMode === 'custom') parts.push('Período livre');
  else if (monthFilter.value) {
    const [y, m] = monthFilter.value.split('-');
    parts.push(`${m}/${y}`);
  }

  const statusVal = document.getElementById('statusFilter').value;
  if (statusVal === 'pending') parts.push('Pendentes');
  else if (statusVal === 'paid') parts.push('Pagas/Recebidas');

  const extraCount =
    selectedDescs.size +
    selectedTypes.size +
    selectedCats.size +
    (document.getElementById('searchFilter').value.trim() ? 1 : 0);

  if (extraCount > 0) {
    parts.push(`+${extraCount} filtro(s)`);
  }

  badge.textContent = parts.join(' • ');
}

// ================= FILTROS MULTIPLOS E PERÍODOS =================
window.setPeriodMode = function(mode) {
  periodMode = mode;

  document.getElementById('pillMonth').classList.toggle('active', mode === 'month');
  document.getElementById('pillWeek').classList.toggle('active', mode === 'week');
  document.getElementById('pillToday').classList.toggle('active', mode === 'today');
  document.getElementById('pillCustom').classList.toggle('active', mode === 'custom');

  document.getElementById('monthFilter').classList.toggle('hidden', mode !== 'month');
  document.getElementById('customRangeInputs').classList.toggle('hidden', mode !== 'custom');

  if (mode === 'custom') {
    const startEl = document.getElementById('customStart');
    const endEl = document.getElementById('customEnd');
    if (!startEl.value || !endEl.value) {
      const week = getCurrentWeekRange();
      startEl.value = week.start;
      endEl.value = week.end;
    }
  }

  render();
};

window.onMonthInputChange = function() {
  if (periodMode !== 'month') {
    setPeriodMode('month');
  } else {
    render();
  }
};

function refreshMultiFilterOptions() {
  const all = getAllRecords();

  const uniqueDescs = [...new Set(all.map(r => (r.desc || '').trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const uniqueTypes = [...new Set([
    ...customTypes.map(t => t.name),
    ...all.map(r => r.launchType).filter(Boolean)
  ])].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const uniqueCats = [...new Set([
    ...customCategories,
    ...all.map(r => r.category).filter(Boolean)
  ])].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  document.getElementById('descSuggestions').innerHTML = uniqueDescs
    .map(d => `<option value="${escapeHTML(d)}">`)
    .join('');

  renderCheckboxList('listDesc', uniqueDescs, selectedDescs, 'desc');
  renderCheckboxList('listType', uniqueTypes, selectedTypes, 'type');
  renderCheckboxList('listCat', uniqueCats, selectedCats, 'cat');
  updateMultiTriggersUI();
}

function renderCheckboxList(containerId, items, selectedSet, filterKey) {
  const el = document.getElementById(containerId);
  el.innerHTML = '';

  if (!items.length) {
    el.innerHTML = `<div style="font-size:0.78rem; color:var(--muted); padding:6px;">Nenhuma opção</div>`;
    return;
  }

  items.forEach(val => {
    const label = document.createElement('label');
    label.className = 'multi-option-item';
    label.setAttribute('data-label', normalizeText(val));

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = selectedSet.has(val);
    checkbox.addEventListener('change', () => {
      toggleMultiValue(filterKey, val, checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = val;

    label.appendChild(checkbox);
    label.appendChild(span);
    el.appendChild(label);
  });
}

window.filterMultiOptions = function(listId, query) {
  const q = normalizeText(query);
  const labels = document.querySelectorAll(`#${listId} .multi-option-item`);
  labels.forEach(lbl => {
    const text = lbl.getAttribute('data-label') || '';
    lbl.style.display = text.includes(q) ? 'flex' : 'none';
  });
};

window.toggleMultiValue = function(filterKey, val, isChecked) {
  const targetSet = filterKey === 'desc' ? selectedDescs : (filterKey === 'type' ? selectedTypes : selectedCats);
  if (isChecked) targetSet.add(val);
  else targetSet.delete(val);

  updateMultiTriggersUI();
  render();
};

window.clearMultiFilter = function(filterKey) {
  if (filterKey === 'desc') {
    selectedDescs.clear();
    const sInput = document.getElementById('searchMultiDesc');
    if (sInput) sInput.value = '';
  } else if (filterKey === 'type') {
    selectedTypes.clear();
  } else {
    selectedCats.clear();
  }

  refreshMultiFilterOptions();
  render();
};

function updateMultiTriggersUI() {
  const tDesc = document.getElementById('triggerDesc');
  const tType = document.getElementById('triggerType');
  const tCat = document.getElementById('triggerCat');

  tDesc.textContent = selectedDescs.size > 0 ? `Descrições (${selectedDescs.size}) ▾` : 'Descrições (Todas) ▾';
  tDesc.classList.toggle('has-selection', selectedDescs.size > 0);

  tType.textContent = selectedTypes.size > 0 ? `Tipos (${selectedTypes.size}) ▾` : 'Tipos (Todos) ▾';
  tType.classList.toggle('has-selection', selectedTypes.size > 0);

  tCat.textContent = selectedCats.size > 0 ? `Categorias (${selectedCats.size}) ▾` : 'Categorias (Todas) ▾';
  tCat.classList.toggle('has-selection', selectedCats.size > 0);

  const chipsRow = document.getElementById('activeChipsRow');
  chipsRow.innerHTML = '';

  const createChip = (prefix, val, key) => {
    const chip = document.createElement('span');
    chip.className = 'filter-chip';
    chip.textContent = `${prefix}: ${val} `;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '✕';
    btn.addEventListener('click', () => {
      toggleMultiValue(key, val, false);
      refreshMultiFilterOptions();
    });

    chip.appendChild(btn);
    chipsRow.appendChild(chip);
  };

  selectedDescs.forEach(v => createChip('Desc', v, 'desc'));
  selectedTypes.forEach(v => createChip('Tipo', v, 'type'));
  selectedCats.forEach(v => createChip('Cat', v, 'cat'));

  if (chipsRow.children.length > 0) {
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn-outline btn-sm';
    clearBtn.textContent = 'Limpar filtros';
    clearBtn.addEventListener('click', clearAllMultiFilters);
    chipsRow.appendChild(clearBtn);
    chipsRow.classList.remove('hidden');
  } else {
    chipsRow.classList.add('hidden');
  }
}

window.clearAllMultiFilters = function() {
  selectedDescs.clear();
  selectedTypes.clear();
  selectedCats.clear();
  const sInput = document.getElementById('searchMultiDesc');
  if (sInput) sInput.value = '';
  refreshMultiFilterOptions();
  render();
};

window.toggleMultiPanel = function(panelId, event) {
  event.stopPropagation();
  const target = document.getElementById(panelId);
  const wasOpen = target.classList.contains('open');
  closeAllMultiPanels();
  if (!wasOpen) target.classList.add('open');
};

window.closeAllMultiPanels = function() {
  document.querySelectorAll('.multi-panel').forEach(p => p.classList.remove('open'));
};

document.addEventListener('click', () => {
  closeAllMultiPanels();
});

// ================= LEMBRETES NO SINO =================
function getUpcomingReminders() {
  const todayStr = getTodayLocalStr();
  const limitStr = addDaysToStr(todayStr, 5);

  return getAllRecords()
    .filter(item => item.nature === 'debit' && !item.paid && item.dueDate && item.dueDate <= limitStr)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

function updateBellReminders() {
  const upcoming = getUpcomingReminders();
  const badge = document.getElementById('bellCount');
  const hint = document.getElementById('homeReminderHint');

  if (upcoming.length > 0) {
    badge.textContent = upcoming.length;
    badge.classList.remove('hidden');
    const uniqueDays = [...new Set(upcoming.map(i => formatDatePlain(i.dueDate)))];
    hint.textContent = `🔔 ${upcoming.length} vencimento(s) próximo(s): ${uniqueDays.slice(0, 3).join(', ')}`;
  } else {
    badge.classList.add('hidden');
    hint.textContent = 'Nenhum vencimento nos próximos 5 dias';
  }
}

// ================= NAVEGAÇÃO ENTRE TELAS =================
window.goHome = function() {
  currentPage = 'home';
  document.getElementById('homeScreen').classList.remove('hidden');
  document.getElementById('appScreens').classList.add('hidden');
  document.getElementById('btnNewItem').classList.add('hidden');
  updateBellReminders();
};

window.switchPage = function(page) {
  currentPage = page;
  document.getElementById('homeScreen').classList.add('hidden');
  document.getElementById('appScreens').classList.remove('hidden');

  const isAdm = page === 'adm';
  const titleEl = document.getElementById('pageTitle');
  document.getElementById('recordsView').classList.toggle('hidden', isAdm);
  document.getElementById('admView').classList.toggle('hidden', !isAdm);
  document.getElementById('btnNewItem').classList.toggle('hidden', isAdm);

  if (isAdm) {
    titleEl.textContent = 'ADM';
    titleEl.classList.remove('hidden');
    renderAdmConfig();
    return;
  }

  titleEl.textContent = '';
  titleEl.classList.add('hidden');
  render();
};

window.openDrawer = function() {
  document.getElementById('drawerBackdrop').classList.add('active');
};

window.closeDrawer = function() {
  document.getElementById('drawerBackdrop').classList.remove('active');
};

window.openRemindersModal = function() {
  const upcoming = getUpcomingReminders();
  const todayStr = getTodayLocalStr();
  const listEl = document.getElementById('remindersList');

  if (upcoming.length === 0) {
    listEl.innerHTML = `<div class="empty-state">Nenhuma conta vencida ou próxima do vencimento nos próximos 5 dias.</div>`;
  } else {
    listEl.innerHTML = upcoming.map(item => {
      const isOverdue = item.dueDate < todayStr;
      const isToday = item.dueDate === todayStr;
      const tag = isOverdue ? 'VENCIDA' : (isToday ? 'VENCE HOJE' : 'PRÓXIMA');
      return `
        <div class="reminder-item ${isOverdue ? 'overdue' : 'soon'}">
          <div class="reminder-info">
            <strong>${escapeHTML(item.desc)} (${tag})</strong>
            <span>Dia: ${formatDatePlain(item.dueDate)} • ${escapeHTML(item.launchType)}</span>
          </div>
          <div class="reminder-val">${formatCurrency(item.amount)}</div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('remindersModal').classList.add('active');
};

window.openReportModal = function() {
  closeDrawer();
  document.getElementById('reportPeriodPreset').value = 'thisMonth';
  applyReportPreset();
  document.getElementById('reportModal').classList.add('active');
};

window.applyReportPreset = function() {
  const preset = document.getElementById('reportPeriodPreset').value;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  const startInput = document.getElementById('reportStart');
  const endInput = document.getElementById('reportEnd');

  if (preset === 'today') {
    const today = getTodayLocalStr();
    startInput.value = today;
    endInput.value = today;
  } else if (preset === 'thisWeek') {
    const w = getCurrentWeekRange();
    startInput.value = w.start;
    endInput.value = w.end;
  } else if (preset === 'thisMonth') {
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    startInput.value = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`;
    endInput.value = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;
  } else if (preset === 'lastMonth') {
    const firstDay = new Date(y, m - 1, 1);
    const lastDay = new Date(y, m, 0);
    startInput.value = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`;
    endInput.value = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;
  }
  generateReport();
};

window.generateReport = function() {
  const start = document.getElementById('reportStart').value;
  const end = document.getElementById('reportEnd').value;
  const natureFilter = document.getElementById('reportNatureFilter').value;
  const out = document.getElementById('reportOutput');

  const filtered = getAllRecords()
    .filter(r => (!start || r.dueDate >= start) && (!end || r.dueDate <= end))
    .filter(r => natureFilter === 'all' || r.nature === natureFilter)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  let totalCredits = 0;
  let totalDebits = 0;

  filtered.forEach(r => {
    if (r.nature === 'credit') totalCredits += Number(r.amount);
    else totalDebits += Number(r.amount);
  });

  const net = totalCredits - totalDebits;

  if (filtered.length === 0) {
    out.innerHTML = `<div class="empty-state">Nenhum lançamento encontrado no período selecionado.</div>`;
    return;
  }

  out.innerHTML = `
    <h3 style="margin-bottom:4px;">Relatório Financeiro Unificado</h3>
    <p style="font-size:0.8rem; color:var(--muted); margin-bottom:10px;">
      Período: ${start ? formatDatePlain(start) : 'Início'} até ${end ? formatDatePlain(end) : 'Hoje'} • ${filtered.length} registro(s)
    </p>
    <div class="report-summary-box">
      <div><strong>Créditos:</strong> ${formatCurrency(totalCredits)}</div>
      <div><strong>Débitos:</strong> ${formatCurrency(totalDebits)}</div>
      <div><strong>Saldo Líquido:</strong> ${formatCurrency(net)}</div>
    </div>
    <table class="report-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Tipo / Categoria</th>
          <th>Status</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(r => {
          const isCredit = r.nature === 'credit';
          return `
            <tr>
              <td>${formatDatePlain(r.dueDate)}</td>
              <td>${escapeHTML(r.desc)}${r.notes ? `<br><small style="color:var(--muted)">${escapeHTML(r.notes)}</small>` : ''}</td>
              <td>${escapeHTML(r.launchType)} (${escapeHTML(r.category)})</td>
              <td>${r.paid ? (isCredit ? 'Recebido' : 'Pago') : 'Pendente'}</td>
              <td style="font-weight:700;">${isCredit ? '+ ' : ''}${formatCurrency(r.amount)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
};

// ================= FORMULÁRIO NOVO / EDITAR / COPIAR =================
function populateFormSelects(selectedType = '', selectedCategory = '') {
  const typeSelect = document.getElementById('launchType');
  const catSelect = document.getElementById('category');

  const typeOptions = [...customTypes];
  if (selectedType && !typeOptions.some(t => t.name === selectedType)) {
    typeOptions.push({ name: selectedType, nature: getNatureByTypeName(selectedType) });
  }

  typeSelect.innerHTML = typeOptions.map(t => `
    <option value="${escapeHTML(t.name)}">${escapeHTML(t.name)} (${t.nature === 'credit' ? 'Crédito +' : 'Débito -'})</option>
  `).join('');

  if (selectedType) typeSelect.value = selectedType;

  const catOptions = [...customCategories];
  if (selectedCategory && !catOptions.includes(selectedCategory)) {
    catOptions.push(selectedCategory);
  }

  catSelect.innerHTML = catOptions.map(c => `
    <option value="${escapeHTML(c)}">${escapeHTML(c)}</option>
  `).join('');

  if (selectedCategory) catSelect.value = selectedCategory;
}

window.openNewModal = function() {
  document.getElementById('editBillId').value = '';
  document.getElementById('editBillLegacySource').value = '';
  document.getElementById('modalTitle').textContent = 'Novo Lançamento';
  document.getElementById('modalSubtitle').textContent = 'Preencha os dados abaixo.';
  document.getElementById('submitBtn').textContent = 'Confirmar e Salvar';
  document.getElementById('billForm').reset();

  populateFormSelects();

  const selectedMonth = monthFilter.value || getCurrentMonthStr();
  const dayStr = String(new Date().getDate()).padStart(2, '0');
  document.getElementById('dueDate').value = periodMode === 'month' ? `${selectedMonth}-${dayStr}` : getTodayLocalStr();

  document.getElementById('formModal').classList.add('active');
  document.getElementById('desc').focus();
};

window.editBill = function(id, source) {
  const bill = getAllRecords().find(b => b.id === id && b._source === source);
  if (!bill) return;

  document.getElementById('editBillId').value = bill.id;
  document.getElementById('editBillLegacySource').value = bill._source;
  document.getElementById('modalTitle').textContent = 'Editar Lançamento';
  document.getElementById('modalSubtitle').textContent = 'Altere o valor, tipo, data, observação ou outros dados:';
  document.getElementById('submitBtn').textContent = 'Salvar Alterações';

  populateFormSelects(bill.launchType, bill.category);

  document.getElementById('desc').value = bill.desc;
  document.getElementById('amount').value = bill.amount;
  document.getElementById('dueDate').value = bill.dueDate;
  document.getElementById('notes').value = bill.notes || '';

  document.getElementById('formModal').classList.add('active');
  document.getElementById('amount').focus();
};

window.copyBill = function(id, source) {
  const bill = getAllRecords().find(b => b.id === id && b._source === source);
  if (!bill) return;

  document.getElementById('editBillId').value = '';
  document.getElementById('editBillLegacySource').value = '';
  document.getElementById('modalTitle').textContent = 'Copiar Lançamento';
  document.getElementById('modalSubtitle').textContent = 'Confira ou ajuste os dados copiados antes de salvar.';
  document.getElementById('submitBtn').textContent = 'Confirmar e Salvar';

  populateFormSelects(bill.launchType, bill.category);

  document.getElementById('desc').value = bill.desc;
  document.getElementById('amount').value = bill.amount;
  document.getElementById('dueDate').value = bill.dueDate;
  document.getElementById('notes').value = bill.notes || '';

  document.getElementById('formModal').classList.add('active');
};

window.saveBill = async function(event) {
  event.preventDefault();
  const editingId = document.getElementById('editBillId').value;
  const legacySource = document.getElementById('editBillLegacySource').value;

  const desc = document.getElementById('desc').value.trim();
  const launchType = document.getElementById('launchType').value;
  const nature = getNatureByTypeName(launchType);
  const category = document.getElementById('category').value;
  const rawAmount = parseFloat(document.getElementById('amount').value);
  const amount = isNaN(rawAmount) ? 0 : rawAmount;
  const dueDate = document.getElementById('dueDate').value;
  const notes = document.getElementById('notes').value.trim();

  if (editingId) {
    const targetPath = legacySource || 'lancamentos';
    const existing = getAllRecords().find(b => b.id === editingId && b._source === targetPath) || {};
    const updatedBill = {
      ...existing,
      id: editingId,
      desc,
      launchType,
      nature,
      category,
      amount,
      dueDate,
      notes,
      ...(targetPath === 'carro' ? { maintType: launchType } : {})
    };
    delete updatedBill._source;
    await set(ref(db, `${targetPath}/${editingId}`), updatedBill);
  } else {
    const id = Date.now().toString();
    const newBill = {
      id,
      desc,
      launchType,
      nature,
      category,
      amount,
      dueDate,
      notes,
      paid: false,
      paidAt: null
    };
    await set(ref(db, `lancamentos/${id}`), newBill);
  }

  closeModal('formModal');
  if (periodMode === 'month') {
    monthFilter.value = dueDate.slice(0, 7);
  }
};

window.togglePaid = async function(id, source) {
  const bill = getAllRecords().find(b => b.id === id && b._source === source);
  if (!bill) return;

  const targetPath = source || 'lancamentos';
  const updatedBill = {
    ...bill,
    paid: !bill.paid,
    paidAt: !bill.paid ? getTodayLocalStr() : null
  };
  delete updatedBill._source;

  await set(ref(db, `${targetPath}/${id}`), updatedBill);

  if (updatedBill.paid) {
    lastPaidBill = { ...updatedBill, nature: bill.nature, launchType: bill.launchType };
    const isCredit = bill.nature === 'credit';
    document.getElementById('promptTitle').textContent = isCredit ? 'Marcado como recebido!' : 'Marcado como pago!';
    document.getElementById('promptMessage').textContent =
      `${isCredit ? 'Você recebeu' : 'Você pagou'} "${updatedBill.desc}" (${formatCurrency(updatedBill.amount)}). Quer gerar um lançamento igual a este para mês que vem?`;
    document.getElementById('nextMonthPromptModal').classList.add('active');
  }
};

window.confirmGenerateNextMonth = function() {
  closeModal('nextMonthPromptModal');
  if (!lastPaidBill) return;

  document.getElementById('editBillId').value = '';
  document.getElementById('editBillLegacySource').value = '';
  document.getElementById('modalTitle').textContent = 'Confirmar - Mês Seguinte';
  document.getElementById('modalSubtitle').textContent = 'Dados preenchidos automaticamente. Confira o valor e a data:';
  document.getElementById('submitBtn').textContent = 'Confirmar e Salvar';

  populateFormSelects(lastPaidBill.launchType, lastPaidBill.category);

  document.getElementById('desc').value = lastPaidBill.desc;
  document.getElementById('amount').value = lastPaidBill.amount;
  document.getElementById('dueDate').value = addOneMonth(lastPaidBill.dueDate);
  document.getElementById('notes').value = lastPaidBill.notes || '';

  document.getElementById('formModal').classList.add('active');
};

window.deleteBill = async function(id, source) {
  if (!confirm('Deseja realmente excluir este registro?')) return;
  const targetPath = source || 'lancamentos';
  await remove(ref(db, `${targetPath}/${id}`));
};

window.closeModal = function(modalId) {
  document.getElementById(modalId).classList.remove('active');
};

// ================= RENDERIZAÇÃO PRINCIPAL =================
function formatCurrency(val) {
  return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDatePlain(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const localDate = new Date(y, m - 1, d);
  const weekday = WEEKDAYS[localDate.getDay()] || '';
  const dd = String(d).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${dd}/${mm}/${y} (${weekday})`;
}

function formatDateWithWeekday(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const localDate = new Date(y, m - 1, d);
  const weekday = WEEKDAYS[localDate.getDay()] || '';
  const dd = String(d).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${dd}/${mm}/${y} <span class="weekday-tag">(${weekday})</span>`;
}

function escapeHTML(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function addOneMonth(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const nextMonthIndex = m;
  const lastDayOfNextMonth = new Date(y, nextMonthIndex + 1, 0).getDate();
  const safeDay = Math.min(d, lastDayOfNextMonth);
  const targetDate = new Date(y, nextMonthIndex, safeDay);

  const ny = targetDate.getFullYear();
  const nm = String(targetDate.getMonth() + 1).padStart(2, '0');
  const nd = String(targetDate.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

window.render = function() {
  if (currentPage !== 'financeiro') return;

  updateFiltersSummaryBadge();

  const selectedMonth = monthFilter.value;
  const statusFilter = document.getElementById('statusFilter').value;
  const searchQuery = normalizeText(document.getElementById('searchFilter').value.trim());
  const listEl = document.getElementById('billList');
  const todayStr = getTodayLocalStr();
  const weekRange = getCurrentWeekRange();
  const customStart = document.getElementById('customStart').value;
  const customEnd = document.getElementById('customEnd').value;

  const periodBills = getAllRecords()
    .filter(b => {
      if (!b.dueDate) return false;
      if (periodMode === 'today') return b.dueDate === todayStr;
      if (periodMode === 'week') return b.dueDate >= weekRange.start && b.dueDate <= weekRange.end;
      if (periodMode === 'custom') {
        return (!customStart || b.dueDate >= customStart) && (!customEnd || b.dueDate <= customEnd);
      }
      return b.dueDate.startsWith(selectedMonth);
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const filteredBills = periodBills.filter(b => {
    const matchesStatus =
      statusFilter === 'pending' ? !b.paid :
      statusFilter === 'paid' ? b.paid : true;

    const matchesDesc =
      selectedDescs.size === 0 || selectedDescs.has((b.desc || '').trim());

    const matchesType =
      selectedTypes.size === 0 || selectedTypes.has(b.launchType);

    const matchesCat =
      selectedCats.size === 0 || selectedCats.has(b.category);

    const matchesSearch =
      !searchQuery ||
      normalizeText(b.desc).includes(searchQuery) ||
      normalizeText(b.notes).includes(searchQuery) ||
      normalizeText(b.launchType).includes(searchQuery) ||
      normalizeText(b.category).includes(searchQuery);

    return matchesStatus && matchesDesc && matchesType && matchesCat && matchesSearch;
  });

  const credits = filteredBills.filter(b => b.nature === 'credit');
  const debits = filteredBills.filter(b => b.nature !== 'credit');

  const totalCredits = credits.reduce((acc, b) => acc + Number(b.amount), 0);
  const totalDebits = debits.reduce((acc, b) => acc + Number(b.amount), 0);
  const pendingDebits = debits.filter(b => !b.paid).reduce((acc, b) => acc + Number(b.amount), 0);
  const netBalance = totalCredits - totalDebits;

  document.getElementById('card1Value').textContent = formatCurrency(totalCredits);
  document.getElementById('card1Sub').textContent = credits.length ? `${credits.length} entrada(s)` : '';

  document.getElementById('card2Value').textContent = formatCurrency(totalDebits);
  document.getElementById('card2Sub').textContent = pendingDebits > 0 ? `A pagar: ${formatCurrency(pendingDebits)}` : 'Tudo pago';

  const c3Val = document.getElementById('card3Value');
  c3Val.className = netBalance >= 0 ? 'text-credit' : 'text-danger';
  c3Val.textContent = formatCurrency(netBalance);
  document.getElementById('card3Sub').textContent = `${filteredBills.length} reg.`;

  if (filteredBills.length === 0) {
    listEl.innerHTML = `<div class="empty-state">Nenhum lançamento encontrado para os filtros selecionados.</div>`;
    return;
  }

  const reopenIconSvg = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
    </svg>
  `;

  const editPencilSvg = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  `;

  listEl.innerHTML = filteredBills.map(bill => {
    const isCredit = bill.nature === 'credit';
    const isOverdue = !bill.paid && bill.dueDate < todayStr;

    let statusBadge = `<span class="badge badge-pending">${isCredit ? 'A Receber' : 'Pendente'}</span>`;
    if (bill.paid) statusBadge = `<span class="badge badge-paid">${isCredit ? 'Recebido' : 'Pago'}</span>`;
    else if (isOverdue && !isCredit) statusBadge = `<span class="badge badge-overdue">Vencida</span>`;

    const typeBadgeClass = isCredit ? 'badge-type-credit' : 'badge-type-debit';
    const notesHtml = bill.notes
      ? `<div class="bill-notes">${escapeHTML(bill.notes)}</div>`
      : '';

    const payBtnContent = bill.paid
      ? reopenIconSvg
      : (isCredit ? '✓ Receber' : '✓ Pagar');

    const payBtnClass = bill.paid ? 'btn-sm btn-icon-only btn-pay' : 'btn-sm btn-pay';
    const payBtnTitle = bill.paid ? 'Reabrir lançamento' : (isCredit ? 'Marcar como recebido' : 'Marcar como pago');
    const cardToneClass = isCredit ? 'credit-item' : 'debit-item';

    return `
      <div class="bill-item ${cardToneClass} ${bill.paid ? 'paid' : ''}">
        <button class="btn-del-corner" onclick="deleteBill('${bill.id}', '${bill._source}')" title="Excluir">✕</button>
        <div class="bill-info">
          <div class="bill-title">${escapeHTML(bill.desc)} ${statusBadge}</div>
          <div class="status-row">
            <span class="badge ${typeBadgeClass}">${escapeHTML(bill.launchType)}</span>
          </div>
          <div class="bill-meta">Data: <strong>${formatDateWithWeekday(bill.dueDate)}</strong> • ${escapeHTML(bill.category)}</div>
          ${notesHtml}
        </div>
        <div class="bill-right">
          <div class="bill-amount ${isCredit ? 'credit' : ''}">
            ${isCredit ? '+ ' : ''}${formatCurrency(bill.amount)}
          </div>
          <div class="bill-actions">
            <button class="${payBtnClass}" onclick="togglePaid('${bill.id}', '${bill._source}')" title="${payBtnTitle}" aria-label="${payBtnTitle}">
              ${payBtnContent}
            </button>
            <button class="btn-sm btn-icon-only btn-edit" onclick="editBill('${bill.id}', '${bill._source}')" title="Editar lançamento" aria-label="Editar">
              ${editPencilSvg}
            </button>
            <button class="btn-sm btn-copy" onclick="copyBill('${bill.id}', '${bill._source}')" title="Copiar lançamento">
              Copiar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

// ================= BACKUP & IMPORTAÇÃO (ADM) =================
window.exportAllData = function() {
  const items = getAllRecords().map(({ _source, ...rest }) => rest);
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-financeiro-${getTodayLocalStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.importData = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.onload = async (e) => {
    const content = e.target.result.trim();
    const updates = {};
    let count = 0;

    try {
      if (file.name.toLowerCase().endsWith('.json')) {
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          imported.forEach((item, index) => {
            const safeId = item.id ? String(item.id) : `${Date.now()}_${index}`;
            const parsedVal = parseFloat(item.amount);
            const tName = item.launchType || item.maintType || 'Conta a Pagar';
            updates[safeId] = {
              id: safeId,
              desc: String(item.desc || '').trim(),
              launchType: tName,
              nature: item.nature || getNatureByTypeName(tName),
              category: item.category || 'Outros',
              amount: isNaN(parsedVal) ? 0 : parsedVal,
              dueDate: String(item.dueDate || '').trim(),
              notes: String(item.notes || '').trim(),
              paid: Boolean(item.paid),
              paidAt: item.paid ? (item.paidAt || item.dueDate) : null
            };
            count++;
          });
        }
      } else {
        const lines = content.split(/\r?\n/).filter(l => l.trim() !== '');
        if (lines.length < 2) throw new Error('Planilha vazia');

        const separator = lines[0].includes(';') ? ';' : ',';
        const headers = lines[0].split(separator).map(h => h.trim().replace(/^"|"$/g, ''));

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(separator).map(c => c.trim().replace(/^"|"$/g, ''));
          const row = {};
          headers.forEach((h, idx) => { row[h] = cols[idx] || ''; });

          if (!row.desc || row.amount === '' || !row.dueDate) continue;

          const safeId = row.id ? String(row.id) : `${Date.now()}_${i}`;
          const parsedAmount = parseFloat(String(row.amount).replace(/\./g, '').replace(',', '.'));
          const finalAmount = isNaN(parsedAmount) ? 0 : parsedAmount;
          const isPaid = String(row.paid).toUpperCase() === 'TRUE' || String(row.paid).toLowerCase() === 'sim';
          const tName = row.launchType || row.maintType || 'Conta a Pagar';

          updates[safeId] = {
            id: safeId,
            desc: row.desc,
            launchType: tName,
            nature: getNatureByTypeName(tName),
            category: row.category || 'Outros',
            amount: finalAmount,
            dueDate: row.dueDate,
            notes: row.notes || '',
            paid: isPaid,
            paidAt: isPaid ? row.dueDate : null
          };
          count++;
        }
      }

      if (count > 0) {
        await update(refs.lancamentos, updates);
        alert(`${count} registro(s) importado(s) com sucesso!`);
      } else {
        alert('Nenhuma linha válida encontrada. Verifique os títulos desc, amount e dueDate.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao ler o arquivo. Verifique o formato.');
    }
    event.target.value = '';
  };

  reader.readAsText(file, 'UTF-8');
};
