class MyCalendar extends HTMLElement {
  constructor() {
    super();

    // Shadow DOMを作成（openモード）
    const shadow = this.attachShadow({ mode: 'open' });

    // カレンダー本体を作成
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'calendar');

    const style = document.createElement('style');
    style.textContent = `
      .calendar {
        font-family: sans-serif;
        border: 1px solid #ccc;
        padding: 10px;
        width: 200px;
      }
      .day {
        display: inline-block;
        width: 28px;
        text-align: center;
        margin: 2px;
      }
    `;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0〜11

    const days = new Date(year, month + 1, 0).getDate(); // 月の日数
    const startDay = new Date(year, month, 1).getDay(); // 開始曜日

    function createElement(node, className){
        const el = document.createElement(node);
        el.classList.add(className);
        return el;
    }

    for (let i = 0; i < startDay; i++) {
      const empty = createElement('div', 'day');
      empty.innerHTML = '&nbsp;';
      wrapper.appendChild(empty);
    }

    for (let i = 1; i <= days; i++) {
      const day = createElement('div', 'day');
      day.textContent = i;
      wrapper.appendChild(day);
    }
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

customElements.define('my-calendar', MyCalendar);