class DatePicker extends HTMLElement {
  constructor() {
    super();

    this.currentDate = new Date();

    const shadow = this.attachShadow({ mode: 'open' });

    // スタイル
    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: relative;
        font-family: sans-serif;
      }
      input {
        padding: 5px;
        width: 160px;
      }
      .calendar {
        display: none;
        position: absolute;
        top: 30px;
        left: 0;
        background: white;
        border: 1px solid #ccc;
        padding: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 10;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        text-align: center;
        padding: 4px;
        cursor: pointer;
      }
      td:hover {
        background: #eee;
      }
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }
      .nav button {
        background: none;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
      }
    `;

    // wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    // input
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.readOnly = true;
    this.input.placeholder = '日付を選択';

    // calendar container
    this.calendar = document.createElement('div');
    this.calendar.classList.add('calendar');

    // 組み立て
    wrapper.appendChild(this.input);
    wrapper.appendChild(this.calendar);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    // イベント
    this.input.addEventListener('click', () => this.toggleCalendar());
    document.addEventListener('click', (e) => this.handleOutsideClick(e));

    this.buildCalendar(this.currentDate);
  }

  toggleCalendar() {
    this.calendar.style.display = this.calendar.style.display === 'block' ? 'none' : 'block';
  }

  handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.calendar.style.display = 'none';
    }
  }

  buildCalendar(date) {
    this.calendar.innerHTML = ''; // 初期化

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // ナビゲーションバー（前月・月名・次月）
    const nav = document.createElement('div');
    nav.className = 'nav';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.buildCalendar(this.currentDate);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.buildCalendar(this.currentDate);
    });

    const title = document.createElement('span');
    title.textContent = `${year}年 ${month + 1}月`;

    nav.appendChild(prevBtn);
    nav.appendChild(title);
    nav.appendChild(nextBtn);
    this.calendar.appendChild(nav);

    // カレンダーテーブル
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    days.forEach(day => {
      const th = document.createElement('th');
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    let row = document.createElement('tr');

    // 空白セル
    for (let i = 0; i < startDay; i++) {
      row.appendChild(document.createElement('td'));
    }

    // 日付セル
    for (let day = 1; day <= daysInMonth; day++) {
      const td = document.createElement('td');
      td.textContent = String(day);
      td.addEventListener('click', () => {
        const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        this.input.value = selectedDate;
        this.calendar.style.display = 'none';
      });

      row.appendChild(td);

      if ((startDay + day) % 7 === 0 || day === daysInMonth) {
        tbody.appendChild(row);
        row = document.createElement('tr');
      }
    }

    table.appendChild(tbody);
    this.calendar.appendChild(table);
  }
}

customElements.define('date-picker', DatePicker);
