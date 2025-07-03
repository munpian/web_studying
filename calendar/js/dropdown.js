export function populateDropdown(){
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');

    const now = new Date().getFullYear();

    // optionタグ年
    for (let y = 1900; y <= now; y++){
        yearSelect.add(new Option(y, y));
    }
    // Optionタグ月
    for (let m = 1; m <= 12; m++){
        monthSelect.add(new Option(m, m));
    }
    // Optionタグ日
    for (let d = 1; d <= 31; d++){
        daySelect.add(new Option(d, d));
    }
}