window.DatePicker = function() { return Reflect.construct(HTMLElement, [], window.DatePicker); };
window.DatePicker.prototype = Object.create(HTMLElement.prototype);
window.DatePicker.prototype.constructor = window.DatePicker;

window.DatePicker.prototype.connectedCallback = function() {
    this.attachShadow({ mode: 'open' });

    const today = new Date();
    this.selectedYear = today.getFullYear();
    this.selectedMonth = today.getMonth();
    this.selectedDay = today.getDate();
    this.currentDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);

    this.viewMode = 'day';
    this.startYear = this.selectedYear - (this.selectedYear % 12);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.readOnly = true;
    this.input.value = formatDate(this.currentDate);

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
    this.shadowRoot.appendChild(DatePickerStyle());

    this.icon.addEventListener('click', (e)=>{ e.stopPropagation(); this.togglePopup(true); });

    document.addEventListener('click', (e)=>{
        const clickedInside = this.shadowRoot.contains(e.target) || this.contains(e.target);
        if(!clickedInside) this.togglePopup(false);
    });

    this.render();
};

window.DatePicker.prototype.togglePopup = function(show){
    this.popup.style.display = show ? 'block' : 'none';
};

window.DatePicker.prototype.render = function(){
    this.popup.innerHTML = '';
    const nav = document.createElement('div');
    nav.classList.add('nav');

    const yearSpan = document.createElement('span');
    yearSpan.textContent = this.selectedYear + '年';
    yearSpan.addEventListener('click', ()=>{ this.viewMode='year'; this.render(); });

    const monthSpan = document.createElement('span');
    monthSpan.textContent = (this.selectedMonth+1)+'月';
    monthSpan.addEventListener('click', ()=>{ this.viewMode='month'; this.render(); });

    const daySpan = document.createElement('span');
    daySpan.textContent = this.selectedDay+'日';

    nav.appendChild(yearSpan);
    nav.appendChild(monthSpan);
    nav.appendChild(daySpan);
    this.popup.appendChild(nav);

    if(this.viewMode==='year') this.popup.appendChild(createYearView(this));
    else if(this.viewMode==='month') this.popup.appendChild(createMonthView(this));
    else this.popup.appendChild(createDayView(this));
};
