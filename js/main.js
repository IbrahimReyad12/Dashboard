const calendarDates = document.getElementById('calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const lastDate = new Date(year, month + 1, 0).getDate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${months[month]} ${year}`;

  calendarDates.innerHTML = '';

  // إضافة الفراغات
  const blankDays = (firstDay + 6) % 7; // تبدأ من الأحد
  for (let i = 0; i < blankDays; i++) {
    const blank = document.createElement("div");
    calendarDates.appendChild(blank);
  }

  // إنشاء الأيام
  for (let day = 1; day <= lastDate; day++) {
    const dateDiv = document.createElement("div");
    dateDiv.textContent = day;

    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    if (isToday) dateDiv.classList.add("today");

    // عند النقر على اليوم
    dateDiv.addEventListener("click", () => {
      // إزالة التحديد من الكل
      document.querySelectorAll('.calendar-dates div').forEach(el => {
        el.classList.remove("selected-date");
      });

      // تحديد العنصر الحالي
      dateDiv.classList.add("selected-date");
    });

    calendarDates.appendChild(dateDiv);
  }
}

// التحكم بالأزرار
prevMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

nextMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

// أول مرة
renderCalendar(currentDate);
