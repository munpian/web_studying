function createYearView(dp) {
    const container = document.createElement('div');

    const header = document.createElement('div');
    header.classList.add('header');

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); dp.startYear -= 12; dp.render(); });

    const title = document.createElement('span');
    title.textContent = `${dp.startYear}年 - ${dp.startYear + 11}年`;

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); dp.startYear += 12; dp.render(); });

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let y = dp.startYear; y < dp.startYear + 12; y++) {
        const btn = document.createElement('button');
        btn.textContent = y + '年';
        btn.addEventListener('click', (e) => { e.stopPropagation(); dp.selectedYear = y; dp.viewMode = 'month'; dp.render(); });
        grid.appendChild(btn);
    }
    container.appendChild(grid);
    return container;
}

function createMonthView(dp) {
    const container = document.createElement('div');

    const header = document.createElement('div');
    header.classList.add('header');

    const backBtn = document.createElement('button');
    backBtn.textContent = '← 年選択';
    backBtn.addEventListener('click', (e) => { e.stopPropagation(); dp.viewMode = 'year'; dp.startYear = dp.selectedYear - (dp.selectedYear % 12); dp.render(); });

    const title = document.createElement('span');
    title.textContent = dp.selectedYear + '年';
    header.appendChild(backBtn);
    header.appendChild(title);
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let m = 0; m < 12; m++) {
        const btn = document.createElement('button');
        btn.textContent = (m + 1) + '月';
        btn.addEventListener('click', (e) => { e.stopPropagation(); dp.selectedMonth = m; dp.viewMode = 'day'; dp.render(); });
        grid.appendChild(btn);
    }
    container.appendChild(grid);
    return container;
}

function createDayView(dp) {
    const container = document.createElement('div');

    const header = document.createElement('div');
    header.classList.add('header');

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dp.selectedMonth--;
        if (dp.selectedMonth < 0) { dp.selectedMonth = 11; dp.selectedYear--; }
        dp.render();
    });

    const title = document.createElement('span');
    title.textContent = dp.selectedYear + '年' + (dp.selectedMonth + 1) + '月';

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dp.selectedMonth++;
        if (dp.selectedMonth > 11) { dp.selectedMonth = 0; dp.selectedYear++; }
        dp.render();
    });

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);
    container.appendChild(header);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['日','月','火','水','木','金','土'].forEach(d => { const th = document.createElement('th'); th.textContent = d; trHead.appendChild(th); });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const firstDay = new Date(dp.selectedYear, dp.selectedMonth, 1);
    const startDay = firstDay.getDay();
    const daysInMonthVal = daysInMonth(dp.selectedYear, dp.selectedMonth);

    let row = document.createElement('tr');
    for (let i = 0; i < startDay; i++) { const td = document.createElement('td'); td.classList.add('empty'); row.appendChild(td); }

    for (let d = 1; d <= daysInMonthVal; d++) {
        const td = document.createElement('td');
        td.textContent = d;
        td.addEventListener('click', (e) => { e.stopPropagation(); dp.selectedDay = d; dp.input.value = formatDate(new Date(dp.selectedYear, dp.selectedMonth, d)); dp.togglePopup(false); });
        row.appendChild(td);
        if ((startDay + d) % 7 === 0) { tbody.appendChild(row); row = document.createElement('tr'); }
    }
    if (row.children.length > 0) { while(row.children.length < 7){ const td = document.createElement('td'); td.classList.add('empty'); row.appendChild(td); } tbody.appendChild(row); }

    table.appendChild(tbody);
    container.appendChild(table);
    return container;
}
