

// const div = document.getElementById('calendar-container');
// const h2 = document.createElement('h2');
// h2.innerHTML = '日付を選択';
// div.appendChild(h2);


const year = new Date().getFullYear();
// console.log("year", year);
// const month = new Date().getMonth() + 1;
const month = new Date().getMonth()
// console.log("month: ", month); 
// console.log("now: ", new Date())
function createCalendar(year, month){
  const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土']
  const headerRow = document.getElementById('calendar-header');
  dayOfWeeks.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th)
  });
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const calendarBody = document.getElementById('calendar-body');
  let row = document.createElement('tr');

  for(let i = 0; i < firstDay.getDay(); i++){
    row.appendChild(document.createElement('td'));
  }

  for(let date = 1; date <= lastDay.getDate(); date){
    const day = new Date(year, month, date).getDay();
    const td = document.createElement('td');
    td.textContent = date;
    row.appendChild(td);

    if(day === 6 || day === lastDay.getDate()){
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
  }
}

createCalendar(year, month);