// schedule-ui.js

// 状態に応じた記号を返す
export const getSymbol = (status) => {
  const map = {
    available: '○',
    partial: '△',
    full: '×'
  };
  return map[status] || '?';
};

// 時刻文字列（例：9 → 09:00）整形
export const formatHour = hour =>
  `${String(hour).padStart(2, '0')}:00`;

// セルを生成（1時間単位）
export const createScheduleCell = ({ hour, status }) => {
  const td = document.createElement('td');
  td.textContent = getSymbol(status);
  td.setAttribute('data-hour', hour);
  td.setAttribute('data-status', status);
  td.className = `status-${status}`; // CSSで色付け
  return td;
};

// 行を生成（1日分 or 1会議室分）
export const createScheduleRow = (roomName, scheduleArray) => {
  const tr = document.createElement('tr');
  const roomTd = document.createElement('td');
  roomTd.textContent = roomName;
  tr.appendChild(roomTd);

  scheduleArray.forEach(entry => {
    tr.appendChild(createScheduleCell(entry));
  });

  return tr;
};

// テーブルを描画（全会議室）
export const renderScheduleTable = (rootEl, data) => {
  rootEl.innerHTML = ''; // 初期化

  const table = document.createElement('table');
  table.className = 'schedule-table';

  // ヘッダ
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.appendChild(document.createElement('th')).textContent = '会議室';

  for (let i = 9; i <= 17; i++) {
    const th = document.createElement('th');
    th.textContent = formatHour(i);
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  // 本体
  const tbody = document.createElement('tbody');
  data.forEach(({ room, schedule }) => {
    tbody.appendChild(createScheduleRow(room, schedule));
  });

  table.appendChild(tbody);
  rootEl.appendChild(table);
};