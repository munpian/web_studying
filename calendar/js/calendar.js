export class Calendar {
    constructor(year, month){
        this.year = year;
        this.month = month;
    }

    generateCalendarHTML(){
        let html = '<table><tr>';
        const headers = ['日', '月', '火', '水', '木', '金', '土'];
        for (let header of headers){
            html += `<th>${header}</th>`;
        }
        html += '</tr><tr>';

        const firstDay = new Date(this.year, this.month, 1).getDay();
        const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
        console.log("this.year: ", this.year);
        console.log("this.month: ", this.month);
        console.log("firstDay", firstDay);
        console.log("daysInMonth", daysInMonth);
        
        for(let i = 0; i < firstDay; i++){
            html += '<td></td>';
        }

        // 土日判定
        for(let d = 1; d <= daysInMonth; d++){
            const weekday = new Date(this.year, this.month, d).getDay();
            let cls = '';
            if(weekday === 0)
                cls = 'sunday';
            else if(weekday === 6)
                cls = 'saturday';
            console.log("cls: ", cls); 
            console.log("weekday: ", weekday);
            html += `<td class="${cls}">${d}</td>`;
            if(weekday === 6)
                html += '</tr><tr>';
        }

        html += '</tr></table>';
        return html;
    }
}