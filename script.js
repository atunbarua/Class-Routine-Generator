// ===============================
// CLASS ROUTINE GENERATOR
// ===============================


// Time slots
const timeSlots = [
    "9:00 – 9:45",
    "9:50 – 10:35",
    "10:40 – 11:25",
    "11:30 – 12:15",
    "12:20 – 1:05",
    "1:45 – 2:30"
];


// Courses
const courses = [
    {
        code: "ESDM 3201",
        name: "Environmental Toxicology",
        teachers: ["MSR", "PC"]
    },

    {
        code: "ESDM 3203",
        name: "Integrated Water Resource Management",
        teachers: ["MSK", "SA"]
    },

    {
        code: "ESDM 3205",
        name: "Climate Change",
        teachers: ["JKB", "NS"]
    },

    {
        code: "ESDM 3207",
        name: "Environmental Impact Assessment",
        teachers: ["MAS", "PS"]
    },

    {
        code: "ESDM 3209",
        name: "Remote Sensing",
        teachers: ["MKT"]
    },

    {
        code: "ESDM 3211",
        name: "Coastal Marine Resource Management",
        teachers: ["NS"]
    },

    {
        code: "ESDM 3213",
        name: "Environmental Health and Sanitation",
        teachers: ["FAB", "MSR"]
    }
];


// Current date being prepared
let selectedDate = new Date();


// Default = tomorrow
selectedDate.setDate(selectedDate.getDate() + 1);


// =================================
// DATE FUNCTIONS
// =================================

function formatDate(date) {

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


function updateDateDisplay() {

    document.getElementById("scheduleDate").textContent =
        formatDate(selectedDate);

}


// =================================
// CREATE SCHEDULE SLOTS
// =================================

function createScheduleSlots() {

    const container =
        document.getElementById("scheduleContainer");

    container.innerHTML = "";

    timeSlots.forEach((time, index) => {

        const slot = document.createElement("div");

        slot.className = "schedule-slot";

        slot.innerHTML = `

            <span class="time">
                ${time}
            </span>

            <select id="slot-${index}">

                <option value="">
                    — No Class —
                </option>

                ${courses.map((course, courseIndex) => `
                    <option value="${courseIndex}">
                        ${course.code} – ${course.name}
                    </option>
                `).join("")}

            </select>

        `;

        container.appendChild(slot);

    });

}


// =================================
// DATE NAVIGATION
// =================================

document
    .getElementById("previousDay")
    .addEventListener("click", () => {

        selectedDate.setDate(
            selectedDate.getDate() - 1
        );

        updateDateDisplay();

    });


document
    .getElementById("nextDay")
    .addEventListener("click", () => {

        selectedDate.setDate(
            selectedDate.getDate() + 1
        );

        updateDateDisplay();

    });


// =================================
// RESET
// =================================

document
    .getElementById("resetSchedule")
    .addEventListener("click", () => {

        createScheduleSlots();

        document.getElementById("classroom").value = "";

        document.getElementById("notice").value = "";

    });


// =================================
// GENERATE
// =================================

document
    .getElementById("generateButton")
    .addEventListener("click", () => {

        let message =
            "🔰 Tomorrow's Class Schedule 🔰\n";

        message +=
            "📅 " + formatDate(selectedDate) + "\n\n";


        timeSlots.forEach((time, index) => {

            const value =
                document.getElementById(`slot-${index}`).value;

            if (value !== "") {

                const course =
                    courses[value];

                message +=
                    `${time} : ${course.code} – ${course.name}\n\n`;

            }

        });


        const classroom =
            document.getElementById("classroom").value;

        if (classroom) {

            message +=
                `📍 Classroom : ${classroom}\n\n`;

        }


        const notice =
            document.getElementById("notice").value;

        if (notice) {

            message +=
                `📢 Notice : ${notice}\n\n`;

        }


        message += "@everyone";


        document.getElementById("output").textContent =
            message;

    });


// =================================
// COPY
// =================================

document
    .getElementById("copyButton")
    .addEventListener("click", async () => {

        const output =
            document.getElementById("output").textContent;

        await navigator.clipboard.writeText(output);

        document.getElementById("copyButton").textContent =
            "Copied!";

        setTimeout(() => {

            document.getElementById("copyButton").textContent =
                "Copy";

        }, 1500);

    });


// =================================
// INITIALIZE
// =================================

updateDateDisplay();

createScheduleSlots();
