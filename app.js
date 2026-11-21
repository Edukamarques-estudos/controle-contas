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
let filtersExpanded = false;

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

// ================= EXPANDIR / RECOLHER FILTROS =================
window.toggleFiltersBox = function() {
  filtersExpanded = !filtersExpanded;
  const body = document.getElementById('filtersCollapsibleBody');
  const arrow = document.getElementById('filtersToggleArrow');
  body.classList.toggle('hidden', !filtersExpanded);
  arrow.textContent = filtersExpanded ? '▴' : '▾';
  updateFiltersToggleSummary();
};

function updateFiltersToggleSummary() {
  const label = document.getElementById('filtersToggleLabel');
  if (!label) return;

  const statusVal = document.getElementById('statusFilter').value;
  const searchVal = document.getElementById('searchFilter').value.trim();
  const activeCount =
    selectedDescs.size +
    selectedTypes.size +
    selectedCats.size +
    (statusVal !== 'all' ? 1 : 0) +
    (searchVal ? 1 : 0) +
    (periodMode !== 'month' ? 1 : 0);

  if (activeCount > 0) {
    label.textContent = `🔍 Filtros (${activeCount} ativo${activeCount > 1 ? 's' : ''})`;
  } else {
    label.textContent = '🔍 Filtros (Período, Descrição, Tipo...)';
  }
}

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

  updateFiltersToggleSummary();
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
  updateFiltersToggleSummary();
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
  updateFiltersToggleSummary();
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
  updateFiltersToggleSummary();
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

  // Sem título na tela de movimentações (apenas ícone de Home)
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
    .replace(/[̀-ͯ]/g, '');
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

  updateFiltersToggleSummary();

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
        const lines = content.split(/?
/).filter(l => l.trim() !== '');
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