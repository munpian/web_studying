
// smart-utils.js

// DOM取得（セレクタ or id）
export function get(el) {
  return typeof el === 'string'
    ? document.querySelector(el)
    : el;
}

// 複数取得
export function getAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// 要素作成（tag, クラス名, テキスト）
export function createElement(tag, className = '', text = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// クラス追加
export function addClass(el, className) {
  get(el)?.classList.add(className);
}

// クラス削除
export function removeClass(el, className) {
  get(el)?.classList.remove(className);
}

// クラス切替
export function toggleClass(el, className) {
  get(el)?.classList.toggle(className);
}

// innerHTML設定
export function setHTML(el, html) {
  get(el).innerHTML = html;
}

// 子要素追加
export function appendChildren(parent, ...children) {
  const p = get(parent);
  children.forEach(child => p.appendChild(child));
}

// イベント登録
export function onEvent(el, event, handler, options = false) {
  get(el)?.addEventListener(event, handler, options);
}

// JSON取得（fetch簡略化）
export async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch failed');
  return await res.json();
}

// スリープ（非同期待機）
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// -----------------------------------------------------------------

// renderScheduleTable.js
import {
  get, createElement, setHTML, appendChildren, loadJSON
} from './smart-utils.js';

// ステータスを記号に変換
function statusSymbol(status) {
  switch (status) {
    case 'available': return '○';
    case 'partial': return '△';
    case 'full': return '×';
    default: return '?';
  }
}

// 時間を "09:00" のような形式に
function formatHour(hour) {
  return `${String(hour).padStart(2, '0')}:00`;
}

// 予約テーブルを描画
export async function renderScheduleTable(containerSelector, url = '/api/schedule') {
  const container = get(containerSelector);
  setHTML(container, '読み込み中...');

  try {
    const data = await loadJSON(url);
    const table = createElement('table', 'schedule-table');

    // ヘッダ
    const thead = createElement('thead');
    const headerRow = createElement('tr');
    appendChildren(headerRow, createElement('th', '', '会議室'));

    for (let hour = 9; hour <= 17; hour++) {
      appendChildren(headerRow, createElement('th', '', formatHour(hour)));
    }

    appendChildren(thead, headerRow);
    appendChildren(table, thead);

    // 本体
    const tbody = createElement('tbody');

    data.forEach(roomData => {
      const row = createElement('tr');
      appendChildren(row, createElement('td', '', roomData.room));

      for (let hour = 9; hour <= 17; hour++) {
        const entry = roomData.schedule.find(s => s.hour === hour);
        const symbol = entry ? statusSymbol(entry.status) : '-';
        const td = createElement('td', `status-${entry?.status || 'none'}`, symbol);
        appendChildren(row, td);
      }

      appendChildren(tbody, row);
    });

    appendChildren(table, tbody);
    setHTML(container, '');
    appendChildren(container, table);
  } catch (err) {
    console.error(err);
    setHTML(container, 'スケジュールの読み込みに失敗しました。');
  }
}

