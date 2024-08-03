const monthYearElem = document.getElementById('month-year');
const daysElem = document.getElementById('days');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentYear;
let currentMonth;

// Define the shift pattern
const shifts = ['OFF', 'OFF', 'E', 'E', 'L', 'L', 'N', 'N'];

// Initialize the calendar to the current date
function initializeCalendar() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
}

function getShift(date) {
    const firstDate = new Date(2024, 0, 1); // January 1, 2024
    const daysSinceStart = Math.floor((date - firstDate) / (1000 * 60 * 60 * 24));
    return shifts[daysSinceStart % shifts.length];
}

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    daysElem.innerHTML = ''; // Clear existing days
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        daysElem.innerHTML += '<div class="empty"></div>';
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDate; day++) {
        const cellDate = new Date(year, month, day);
        const isToday = cellDate.toDateString() === today.toDateString();
        const shift = getShift(cellDate);
        const todayClass = isToday ? 'today' : '';
        
        daysElem.innerHTML += `<div class="day ${todayClass}">
            ${day} <span class="shift" data-shift="${shift}">${shift}</span>
        </div>`;
    }
    
    // Update the month-year heading
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(year, month);
    monthYearElem.textContent = date.toLocaleDateString(undefined, options);
}

function goToPreviousMonth() {
    if (currentMonth === 0) {
        currentMonth = 11; // December
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentYear, currentMonth);
}

function goToNextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0; // January
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentYear, currentMonth);
}

// Attach event listeners
prevMonthBtn.addEventListener('click', goToPreviousMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);

// Initialize calendar on page load
initializeCalendar();
