const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

// console.log(day)



const createElemet = (node, className, content) => {
    const el = document.createElement('node');
    if(className)
        el.classList.add(className);
    if(content)
        el.textContent = content;

    return el;
};

const createCalendarNav = (year, month, day) => {
    const lefttButton = createElemet('div', 'box', '<');
    const today = createElemet('div', null, `${year}年${month + 1}月${day}日`);
    const rightButton = createElemet('div', 'box', '>');

    const header = document.getElementById('date-selector');
    
    header.appendChild(lefttButton);
    header.appendChild(today);
    header.appendChild(rightButton);
}


const createCalendar = (year, month, day) => {
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
    const headerRow = document.createElement('th');
    
}
// const createEmptyCell = (year, month, day) => {
//     const calendarRow = document.createElemet('td')
//     const firstDay = new Date(year, month, 1);
//     for(let i = 0; i < firstDay.getDate(); i++){
//         const empCell = document.createElement('tr');
//         calendarRow.appendChild(empCell);
//     }
// }


createCalendarNav(year, month, day);
// createEmptyCell(year, month, day);