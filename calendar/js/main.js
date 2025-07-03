import { populateDropdown } from "./dropdown.js";
import { Calendar } from "./calendar.js";
import { openModal, setupModalEvents } from "./modal.js";


document.addEventListener('DOMContentLoaded', function() {
  populateDropdown();
  setupModalEvents();

  document.getElementById('generateButton').addEventListener('click', function() {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);

    // 入力された日付が存在するかを検証
    const checkDate = new Date(year, month - 1, day);
    console.log("checkDate", checkDate);
    if (checkDate.getFullYear() !== year || checkDate.getMonth() !== (month - 1) || checkDate.getDate() !== day) {
      alert('存在しない日付です。正しい日付を選んでください。');
      return;
    }

    const calendar = new Calendar(year, month - 1); // 月は0始まり
    const html = calendar.generateCalendarHTML();
    openModal(html);
  });
});