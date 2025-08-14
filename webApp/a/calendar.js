class DatePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.currentDate = new Date();
        this.selectedYear = this.currentDate.getFullYear();
        this.selectedMonth = this.currentDate.getMonth();
        this.selectedDay = this.currentDate.getDate();

        this.viewMode = 'day';
        this.startYear = this.selectedYear - (this.selectedYear % 12);

        const style = document.createElement('style');
        style.textContent = `
            .wrapper { position: relative; display: inline-block; font-family: sans-serif; }
            input { width: 150px; padding: 4px; }
            .icon { cursor: pointer; margin-left: -24px; }
            .popup { position: absolute; top: 28px; left: 0; background: white; border: 1px solid #ccc; padding: 8px; z-index: 100; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
            .nav { text-align: center; margin-bottom: 8px; font-weight: bold; }
            .nav span { cursor: pointer; padding: 0 4px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
            button { padding: 4px; cursor: pointer; }
            table { border-collapse: collapse; width: 100%; }
            th, td { text-align: center; padding: 4px; }
            th { background: #f0f0f0; }
            td { cursor: pointer; }
            td.empty { background: #f9f9f9; cursor: default; }
        `;
        this.shadowRoot.appendChild(style);

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.readOnly = true;
        this.input.value = this.formatDate(this.currentDate);

        this.icon = document.createElement('span');
        this.icon.textContent = '📅';
        this.icon.classList.add('icon');

        this.popup = document.createElement('div');
        this.popup.classList.add('popup');
        this.popup.style.display = 'none';

        this.wrapper.appendChild(this.input);
        this.wrapper.appendChild(this.icon);
        this.wrapper.appendChild(this.popup);
        this.shadowRoot.appendChild(this.wrapper);

        this.icon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePopup(true);
        });

        // 外部クリック判定（内部は閉じない）
        document.addEventListener('click', (e) => {
            const clickedInside = this.shadowRoot.contains(e.target) || this.contains(e.target);
            if (!clickedInside) {
                this.togglePopup(false);
            }
        });

        this.render();
    }

    formatDate(date) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }

    togglePopup(show) {
        this.popup.style.display = show ? 'block' : 'none';
    }

    render() {
        this.popup.innerHTML = '';
        this.createNavigation();
        if (this.viewMode === 'year') {
            this.createYearView();
        } else if (this.viewMode === 'month') {
            this.createMonthView();
        } else {
            this.createDayView();
        }
    }

    createNavigation() {
        const nav = document.createElement('div');
        nav.classList.add('nav');

        const yearSpan = document.createElement('span');
        yearSpan.textContent = `${this.selectedYear}年`;
        yearSpan.addEventListener('click', () => {
            this.viewMode = 'year';
            this.startYear = this.selectedYear - (this.selectedYear % 12);
            this.render();
        });

        const monthSpan = document.createElement('span');
        monthSpan.textContent = `${this.selectedMonth + 1}月`;
        monthSpan.addEventListener('click', () => {
            this.viewMode = 'month';
            this.render();
        });

        const daySpan = document.createElement('span');
        daySpan.textContent = `${this.selectedDay}日`;

        nav.appendChild(yearSpan);
        nav.appendChild(monthSpan);
        nav.appendChild(daySpan);

        this.popup.appendChild(nav);
    }

    createYearView() {
        const header = document.createElement('div');
        header.classList.add('header');

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.startYear -= 12;
            this.render();
        });

        const title = document.createElement('span');
        title.textContent = `${this.startYear}年 - ${this.startYear + 11}年`;

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.startYear += 12;
            this.render();
        });

        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        this.popup.appendChild(header);

        const grid = document.createElement('div');
        grid.classList.add('grid');
        for (let y = this.startYear; y < this.startYear + 12; y++) {
            const btn = document.createElement('button');
            btn.textContent = `${y}年`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectedYear = y;
                this.viewMode = 'month';
                this.render();
            });
            grid.appendChild(btn);
        }
        this.popup.appendChild(grid);
    }

    createMonthView() {
        const header = document.createElement('div');
        header.classList.add('header');

        const backBtn = document.createElement('button');
        backBtn.textContent = '← 年選択';
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.viewMode = 'year';
            this.startYear = this.selectedYear - (this.selectedYear % 12);
            this.render();
        });

        const title = document.createElement('span');
        title.textContent = `${this.selectedYear}年`;

        header.appendChild(backBtn);
        header.appendChild(title);
        this.popup.appendChild(header);

        const grid = document.createElement('div');
        grid.classList.add('grid');
        for (let m = 0; m < 12; m++) {
            const btn = document.createElement('button');
            btn.textContent = `${m + 1}月`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectedMonth = m;
                this.viewMode = 'day';
                this.render();
            });
            grid.appendChild(btn);
        }
        this.popup.appendChild(grid);
    }

    createDayView() {
        const header = document.createElement('div');
        header.classList.add('header');

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedMonth--;
            if (this.selectedMonth < 0) {
                this.selectedMonth = 11;
                this.selectedYear--;
            }
            this.render();
        });

        const title = document.createElement('span');
        title.textContent = `${this.selectedYear}年${this.selectedMonth + 1}月`;

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectedMonth++;
            if (this.selectedMonth > 11) {
                this.selectedMonth = 0;
                this.selectedYear++;
            }
            this.render();
        });

        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        this.popup.appendChild(header);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        ['日', '月', '火', '水', '木', '金', '土'].forEach(d => {
            const th = document.createElement('th');
            th.textContent = d;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const firstDay = new Date(this.selectedYear, this.selectedMonth, 1);
        const startDay = firstDay.getDay();
        const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

        let row = document.createElement('tr');
        for (let i = 0; i < startDay; i++) {
            const td = document.createElement('td');
            td.classList.add('empty');
            row.appendChild(td);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const td = document.createElement('td');
            td.textContent = d;
            td.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectedDay = d;
                this.input.value = this.formatDate(new Date(this.selectedYear, this.selectedMonth, d));
                this.togglePopup(false);
            });
            row.appendChild(td);
            if ((startDay + d) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        }

        if (row.children.length > 0) {
            while (row.children.length < 7) {
                const td = document.createElement('td');
                td.classList.add('empty');
                row.appendChild(td);
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        this.popup.appendChild(table);
    }
}

customElements.define('date-picker', DatePicker);
