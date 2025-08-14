// DatePicker クラスを定義（誰でも理解しやすい）
class DatePicker extends HTMLElement {
    constructor() {
        super(); // HTMLElement の初期化
        this.attachShadow({ mode: 'open' });

        // 今日の日付を初期設定
        const today = new Date();
        this.selectedYear = today.getFullYear();
        this.selectedMonth = today.getMonth();
        this.selectedDay = today.getDate();
        this.viewMode = 'day';
        this.startYear = this.selectedYear - (this.selectedYear % 12);

        // ラッパー要素
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');

        // 入力欄
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.readOnly = true;
        this.input.value = formatDate(today);

        // アイコン
        this.icon = document.createElement('span');
        this.icon.textContent = '📅';
        this.icon.classList.add('icon');

        // ポップアップ
        this.popup = document.createElement('div');
        this.popup.classList.add('popup');
        this.popup.style.display = 'none';

        this.wrapper.appendChild(this.input);
        this.wrapper.appendChild(this.icon);
        this.wrapper.appendChild(this.popup);
        this.shadowRoot.appendChild(this.wrapper);
        this.shadowRoot.appendChild(DatePickerStyle());

        // イベント
        this.icon.addEventListener('click', e => {
            e.stopPropagation();
            this.togglePopup(true);
        });

        document.addEventListener('click', e => {
            const clickedInside = this.shadowRoot.contains(e.target) || this.contains(e.target);
            if (!clickedInside) this.togglePopup(false);
        });
    }

    connectedCallback() {
        this.render();
    }

    togglePopup(show) {
        this.popup.style.display = show ? 'block' : 'none';
    }

    render() {
        this.popup.innerHTML = '';

        // ナビゲーション
        const nav = document.createElement('div');
        nav.classList.add('nav');

        const yearSpan = document.createElement('span');
        yearSpan.textContent = this.selectedYear + '年';
        yearSpan.addEventListener('click', () => {
            this.viewMode = 'year';
            this.render();
        });

        const monthSpan = document.createElement('span');
        monthSpan.textContent = (this.selectedMonth + 1) + '月';
        monthSpan.addEventListener('click', () => {
            this.viewMode = 'month';
            this.render();
        });

        const daySpan = document.createElement('span');
        daySpan.textContent = this.selectedDay + '日';

        nav.appendChild(yearSpan);
        nav.appendChild(monthSpan);
        nav.appendChild(daySpan);
        this.popup.appendChild(nav);

        // ビュー切り替え
        if (this.viewMode === 'year') this.popup.appendChild(createYearView(this));
        else if (this.viewMode === 'month') this.popup.appendChild(createMonthView(this));
        else this.popup.appendChild(createDayView(this));
    }
}

// カスタム要素として登録
customElements.define('date-picker', DatePicker);
