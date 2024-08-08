const monthYearElem = document.getElementById('month-year');
const daysElem = document.getElementById('days');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentYear;
let currentMonth;

// Define the shift pattern
const shifts = ['OFF', 'OFF', 'E', 'E', 'L', 'L', 'N', 'N'];

// Define special shifts with consistent formatting
const specialShifts = {
    '2024-09-24': '#PH',
    '2024-10-01': '#PH',
    '2024-10-02': '#PH',
    '2024-10-03': '#PH',
    '2024-10-15': '#PH',
    '2024-10-29': '#PH',
    '2024-11-09': '#PH',
    '2024-11-14': '#PH',
    '2024-11-15': '#PH',
    '2024-11-16': '#PH',
};

// Initialize the calendar to the current date
function initializeCalendar() {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
}

// Format date as 'YYYY-MM-DD'
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get the shift for a given date
function getShift(date) {
    const formattedDate = formatDate(date);

    // Check for special shifts
    if (specialShifts[formattedDate]) {
        return specialShifts[formattedDate];
    }

    // If no special shift, return the regular shift
    const firstDate = new Date(currentYear, 0, 1); // January 1 of the current year
    const daysSinceStart = Math.floor((date - firstDate) / (1000 * 60 * 60 * 24));
    return shifts[daysSinceStart % shifts.length];
}

// Render the calendar for the given month and year
function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const fragment = document.createDocumentFragment();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'empty';
        fragment.appendChild(div);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= lastDate; day++) {
        const cellDate = new Date(year, month, day);
        const isToday = cellDate.toDateString() === today.toDateString();
        const shift = getShift(cellDate);
        const dayDiv = document.createElement('div');
        dayDiv.className = `day ${isToday ? 'today' : ''}`;
        dayDiv.innerHTML = `${day} <span class="shift ${shift === '#PH' ? 'ph' : ''}" data-shift="${shift}">${shift}</span>`;
        fragment.appendChild(dayDiv);
    }

    daysElem.innerHTML = '';
    daysElem.appendChild(fragment);

    // Update the month-year heading
    monthYearElem.textContent = new Date(year, month).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}

// Navigate to the previous month
function goToPreviousMonth() {
    if (currentMonth === 0) {
        currentMonth = 11; // December
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentYear, currentMonth);
}

// Navigate to the next month
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
