const rooms = [
  { name: "大会議室", capacity: 30 },
  { name: "中会議室A", capacity: 12 },
  { name: "中会議室B", capacity: 10 },
  { name: "小会議室1", capacity: 4 }
];

const times = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30"
];


class BookingDateManager {
  constructor(labelId, calendarRenderFunction) {
    this.labelElement = document.getElementById(labelId);
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.renderCalendar = calendarRenderFunction;

    this.updateDateLabel();
  }

  selectToday() {
    const today = new Date();
    this.selectedDate = today;
    this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.updateDateLabel();
    this.renderCalendar(this.currentDate, this.selectedDate);
  }

  selectTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.selectedDate = tomorrow;
    this.currentDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    this.updateDateLabel();
    this.renderCalendar(this.currentDate, this.selectedDate);
  }

  updateDateLabel() {
    const d = this.selectedDate;
    const label = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日の会議室空き状況`;
    if (this.labelElement) {
      this.labelElement.textContent = label;
    }
  }
}

const manager = new BookingDateManager("selected-date", renderCalendar);

document.getElementById("select-today").addEventListener("click", () => manager.selectToday());
document.getElementById("select-tomorrow").addEventListener("click", () => manager.selectTomorrow());