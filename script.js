const monthYearElem = document.getElementById('month-year');
const daysElem = document.getElementById('days');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

// Initialize current date variables
let currentYear;
let currentMonth;

// Define the shift pattern and special shifts with descriptions
const shifts = ['OFF', 'OFF', 'E', 'E', 'L', 'L', 'N', 'N'];

const specialShifts = {
    '2024-09-24': { code: '#PH', description: 'ទិវា​ប្រកាស​រដ្ឋ​ធម្មនុញ្ញ (Constitution Day)' },
    '2024-10-01': { code: '#PH', description: 'ពិធី​បុណ្យ​ភ្ជុំ​បិណ្ឌ (Pchum Ben Festival)' },
    '2024-10-02': { code: '#PH', description: 'ពិធី​បុណ្យ​ភ្ជុំ​បិណ្ឌ (Pchum Ben Festival)' },
    '2024-10-03': { code: '#PH', description: 'ពិធី​បុណ្យ​ភ្ជុំ​បិណ្ឌ (Pchum Ben Festival)ឌ' },
    '2024-10-15': { code: '#PH', description: "ទិវា​ប្រារព្ធ​ពិធី​គោរព​ព្រះវិញ្ញាណក្ខន្ធ ព្រះករុណា​ព្រះបាទ​សម្តេច​ព្រះ នរោត្តម សីហនុ ព្រះមហាវីរក្សត្រ ព្រះ​វររាជ​បិតា​ឯករាជ្យ បូរណភាព​ទឹកដី និង​ឯកភាព​ជាតិ​ខ្មែរ (King Father's Commemoration Day)" },
    '2024-10-29': { code: '#PH', description: "ព្រះ​រាជ​ពិធី​គ្រង​ព្រះ​បរម​រាជ​សម្បត្តិ​របស់​ ព្រះ​ករុណា​ព្រះ​បាទ​សម្តេច​ព្រះ​បរមនាថ នរោត្តម សីហមុនី ព្រះ​មហាក្សត្រ​នៃ​ព្រះរាជាណាចក្រ​កម្ពុជា (King's Coronation Day)" },
    '2024-11-09': { code: '#PH', description: 'ពិធី​បុណ្យ​ឯករាជ្យ​ជាតិ (Independence Day)' },
    '2024-11-14': { code: '#PH', description: 'ព្រះ​រាជ​ពិធី​បុណ្យ​អុំ​ទូក បណ្ដែត​ប្រទីប និង​សំពះ​ព្រះ​ខែ អកអំបុក (Water Festival)' },
    '2024-11-15': { code: '#PH', description: 'ព្រះ​រាជ​ពិធី​បុណ្យ​អុំ​ទូក បណ្ដែត​ប្រទីប និង​សំពះ​ព្រះ​ខែ អកអំបុក (Water Festival)' },
    '2024-11-16': { code: '#PH', description: 'ព្រះ​រាជ​ពិធី​បុណ្យ​អុំ​ទូក បណ្ដែត​ប្រទីប និង​សំពះ​ព្រះ​ខែ អកអំបុក (Water Festival)' },
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

// Get the shift for a given date, including special shift details
function getShift(date) {
    const formattedDate = formatDate(date);

    // Check for special shifts
    if (specialShifts[formattedDate]) {
        return specialShifts[formattedDate];
    }

    // If no special shift, return the regular shift
    const firstDate = new Date(currentYear, 0, 1); // January 1 of the current year
    const daysSinceStart = Math.floor((date - firstDate) / (1000 * 60 * 60 * 24));
    return { code: shifts[daysSinceStart % shifts.length], description: '' };
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
        dayDiv.innerHTML = `${day} <span class="shift ${shift.code === '#PH' ? 'ph' : ''}" data-shift="${shift.code}">${shift.code}</span>`;

        // Add click event listener to the day cell
        dayDiv.addEventListener('click', () => showDateInfo(cellDate));

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

// Show information about the clicked date using alert
function showDateInfo(date) {
    const formattedDate = formatDate(date);
    const shift = getShift(date);

    // Display the information using alert
    alert(`Date: ${formattedDate}\nShift: ${shift.code}\nDescription: ${shift.description || 'Regular Shift'}`);
}

// Attach event listeners
prevMonthBtn.addEventListener('click', goToPreviousMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);

// Initialize calendar on page load
initializeCalendar();
