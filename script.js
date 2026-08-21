// ============================================
// NSTU CLASS ROUTINE GENERATOR - V2
// ============================================


// ============================================
// OFFICIAL TIME STRUCTURE
// ============================================

const timeSlots = [

    {
        start: "9:00",
        end: "9:45",
        emoji: "🕘"
    },

    {
        start: "9:50",
        end: "10:35",
        emoji: "🕘"
    },

    {
        start: "10:40",
        end: "11:25",
        emoji: "🕙"
    },

    {
        start: "11:30",
        end: "12:15",
        emoji: "🕦"
    },

    {
        start: "12:20",
        end: "1:05",
        emoji: "🕧"
    },

    // BREAK
    {
        start: "1:45",
        end: "2:30",
        emoji: "🕜"
    },

    {
        start: "2:30",
        end: "3:15",
        emoji: "🕝"
    },

    {
        start: "3:15",
        end: "4:00",
        emoji: "🕒"
    }

];


// ============================================
// COURSE DATABASE
// ============================================

const courses = [

    {
        code: "ESDM 3201",
        name: "Environmental Toxicology",
        teachers: ["MSR", "PC"]
    },

    {
        code: "ESDM 3202",
        name: "Environmental ...",
        teachers: ["MSR", "PC", "MAS"]
    },

    {
        code: "ESDM 3203",
        name: "Integrated Water Resource Management",
        teachers: ["MSK", "SA"]
    },

    {
        code: "ESDM 3204",
        name: "Environmental ...",
        teachers: ["MAS", "MSK", "AT"]
    },

    {
        code: "ESDM 3205",
        name: "Climate Change",
        teachers: ["JKB", "NS"]
    },

    {
        code: "ESDM 3206",
        name: "Environmental ...",
        teachers: ["MKT", "MSR", "NS"]
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


// ============================================
// WEEKLY ROUTINE
// ============================================
//
// Day names use JavaScript numbering:
//
// 0 = Sunday
// 1 = Monday
// 2 = Tuesday
// 3 = Wednesday
// 4 = Thursday
// 5 = Friday
// 6 = Saturday
//
// Only GREEN Y-3 routine is included.
// ============================================

const weeklyRoutine = {

    // SUNDAY
    0: [

        {
            slots: [0, 1],
            course: "ESDM 3205",
            teacher: "JKB + NS",
            classroom: "C-3"
        },

        {
            slots: [2],
            course: "ESDM 3211",
            teacher: "NS",
            classroom: "C-3"
        },

        {
            slots: [3, 4],
            course: "ESDM 3203",
            teacher: "MSK + SA",
            classroom: "C-3"
        },

        {
            slots: [5],
            course: "ESDM 3201",
            teacher: "MSR + PC",
            classroom: "C-3"
        },

        {
            slots: [6],
            course: "ESDM 3202",
            teacher: "MSR + PC + MAS",
            classroom: "C-3"
        }

    ],


    // MONDAY
    1: [

        {
            slots: [0],
            course: "ESDM 3201",
            teacher: "MSR + PC",
            classroom: "C-3"
        },

        {
            slots: [1],
            course: "ESDM 3203",
            teacher: "MSK + SA",
            classroom: "C-3"
        },

        {
            slots: [2, 3],
            course: "ESDM 3207",
            teacher: "MAS + PS",
            classroom: "C-3"
        },

        {
            slots: [4],
            course: "ESDM 3205",
            teacher: "JKB + NS",
            classroom: "C-3"
        },

        {
            slots: [5],
            course: "ESDM 3213",
            teacher: "FAB + MSR",
            classroom: "C-3"
        },

        {
            slots: [6],
            course: "ESDM 3204",
            teacher: "MAS + MSK + AT",
            classroom: "C-3"
        }

    ],


    // TUESDAY
    2: [],


    // WEDNESDAY
    3: [

        {
            slots: [0],
            course: "ESDM 3213",
            teacher: "FAB + MSR",
            classroom: "C-1"
        },

        {
            slots: [1],
            course: "ESDM 3211",
            teacher: "NS",
            classroom: "C-1"
        },

        {
            slots: [2],
            course: "ESDM 3207",
            teacher: "MAS + PS",
            classroom: "C-1"
        },

        {
            slots: [3, 4],
            course: "ESDM 3209",
            teacher: "MKT",
            classroom: "C-1"
        },

        {
            slots: [5, 6],
            course: "ESDM 3206",
            teacher: "MKT + MSR + NS",
            classroom: "C-1"
        }

    ],


    // THURSDAY
    4: [],


    // FRIDAY
    5: [],


    // SATURDAY
    6: []

};


// ============================================
// STATE
// ============================================

let selectedDate = new Date();


// Default = TOMORROW

selectedDate.setDate(
    selectedDate.getDate() + 1
);


// Schedule state

let schedule = [];


// ============================================
// DATE
// ============================================

function formatDate(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


function updateDateDisplay() {

    document.getElementById(
        "scheduleDate"
    ).textContent = formatDate(selectedDate);


    const day =
        selectedDate.getDay();


    const routine =
        weeklyRoutine[day];


    const status =
        document.getElementById(
            "routineStatus"
        );


    if (routine.length > 0) {

        status.textContent =
            "Regular Routine Loaded";

    } else {

        status.textContent =
            "No Regular Class Scheduled";

    }

}


// ============================================
// FIND COURSE
// ============================================

function findCourse(code) {

    return courses.find(
        course =>
            course.code === code
    );

}


// ============================================
// TEACHER OPTIONS
// ============================================

function getTeacherOptions(
    courseCode,
    selectedTeacher
) {

    if (!courseCode) {

        return `
            <option value="">
                — Select Teacher —
            </option>
        `;

    }


    const course =
        findCourse(courseCode);


    if (!course) {

        return `
            <option value="">
                — Select Teacher —
            </option>
        `;

    }


    let options = `
        <option value="">
            — Select Teacher —
        </option>
    `;


    course.teachers.forEach(
        teacher => {

            options += `
                <option
                    value="${teacher}"
                    ${
                        selectedTeacher === teacher
                            ? "selected"
                            : ""
                    }
                >
                    ${teacher}
                </option>
            `;

        }
    );


    // Combined teachers

    if (course.teachers.length > 1) {

        const combined =
            course.teachers.join(" + ");


        options += `
            <option
                value="${combined}"
                ${
                    selectedTeacher === combined
                        ? "selected"
                        : ""
                }
            >
                ${combined}
            </option>
        `;

    }


    return options;

}


// ============================================
// COURSE OPTIONS
// ============================================

function getCourseOptions(
    selectedCourse,
    scheduledCourse
) {

    let options = `
        <option value="">
            — Select Course —
        </option>
    `;


    courses.forEach(
        course => {

            const isSelected =
                selectedCourse === course.code;


            const isScheduled =
                scheduledCourse === course.code;


            options += `
                <option
                    value="${course.code}"
                    ${
                        isSelected
                            ? "selected"
                            : ""
                    }
                >
                    ${
                        isScheduled
                            ? "★ "
                            : ""
                    }${course.code} – ${course.name}${
                        isScheduled
                            ? " (Scheduled)"
                            : ""
                    }
                </option>
            `;

        }
    );


    return options;

}


// ============================================
// CREATE EMPTY SCHEDULE
// ============================================

function createEmptySchedule() {

    schedule =
        timeSlots.map(
            () => ({

                course: "",

                teacher: "",

                classroom: "",

                mergedWith: null,

                scheduled: false

            })
        );

}


// ============================================
// LOAD ROUTINE
// ============================================

function loadRoutine() {

    createEmptySchedule();


    const day =
        selectedDate.getDay();


    const routine =
        weeklyRoutine[day];


    routine.forEach(
        classInfo => {

            classInfo.slots.forEach(
                slotIndex => {

                    schedule[slotIndex] = {

                        course:
                            classInfo.course,

                        teacher:
                            classInfo.teacher,

                        classroom:
                            classInfo.classroom,

                        mergedWith:
                            null,

                        scheduled:
                            true

                    };

                }
            );


            // Automatically mark
            // consecutive official routine
            // periods as merged.

            if (classInfo.slots.length > 1) {

                const first =
                    classInfo.slots[0];


                classInfo.slots.forEach(
                    slotIndex => {

                        schedule[
                            slotIndex
                        ].mergedWith =
                            first;

                    }
                );

            }

        }
    );


    // Set classroom from routine

    const firstClass =
        routine.find(
            item =>
                item.classroom
        );


    document.getElementById(
        "classroom"
    ).value =
        firstClass
            ? firstClass.classroom
            : "";

}


// ============================================
// RENDER
// ============================================

function renderSchedule() {

    const container =
        document.getElementById(
            "scheduleContainer"
        );


    container.innerHTML = "";


    timeSlots.forEach(
        (slot, index) => {

            const current =
                schedule[index];


            // If this slot belongs to a merged
            // group but isn't the first slot,
            // don't render it.

            if (
                current.mergedWith !== null
                &&
                current.mergedWith !== index
            ) {

                return;

            }


            let groupIndexes =
                [index];


            if (
                current.mergedWith === index
            ) {

                groupIndexes =
                    schedule
                        .map(
                            (item, i) =>
                                item.mergedWith === index
                                    ? i
                                    : null
                        )
                        .filter(
                            i =>
                                i !== null
                        );

            }


            const firstIndex =
                groupIndexes[0];


            const lastIndex =
                groupIndexes[
                    groupIndexes.length - 1
                ];


            const startTime =
                timeSlots[
                    firstIndex
                ].start;


            const endTime =
                timeSlots[
                    lastIndex
                ].end;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "schedule-slot";


            if (
                current.scheduled
            ) {

                div.classList.add(
                    "scheduled"
                );

            }


            if (
                current.mergedWith !== null
            ) {

                div.classList.add(
                    "merged"
                );

            }


            div.innerHTML = `

                <div class="slot-top">

                    <div>

                        <span class="time">

                            ${startTime}
                            –
                            ${endTime}

                        </span>

                        ${
                            current.scheduled
                                ? `
                                    <span class="scheduled-label">
                                        ★ Scheduled
                                    </span>
                                  `
                                : ""
                        }

                    </div>


                    <label class="select-slot">

                        <input
                            type="checkbox"
                            class="slot-checkbox"
                            data-index="${index}"
                        >

                        Select

                    </label>

                </div>


                <select
                    class="course-select"
                    data-index="${index}"
                >

                    ${
                        getCourseOptions(
                            current.course,
                            current.scheduled
                                ? current.course
                                : ""
                        )
                    }

                </select>


                <select
                    class="teacher-select"
                    data-index="${index}"
                >

                    ${
                        getTeacherOptions(
                            current.course,
                            current.teacher
                        )
                    }

                </select>

            `;


            container.appendChild(
                div
            );


            // COURSE CHANGE

            div
                .querySelector(
                    ".course-select"
                )
                .addEventListener(
                    "change",
                    event => {

                        schedule[index].course =
                            event.target.value;


                        // When course changes,
                        // reset teacher.

                        schedule[index].teacher =
                            "";


                        schedule[index].scheduled =
                            false;


                        renderSchedule();

                    }
                );


            // TEACHER CHANGE

            div
                .querySelector(
                    ".teacher-select"
                )
                .addEventListener(
                    "change",
                    event => {

                        schedule[index].teacher =
                            event.target.value;

                    }
                );

        }
    );

}


// ============================================
// MERGE
// ============================================

document
    .getElementById(
        "mergeButton"
    )
    .addEventListener(
        "click",
        () => {

            const selected =
                Array.from(
                    document.querySelectorAll(
                        ".slot-checkbox:checked"
                    )
                )
                .map(
                    checkbox =>
                        Number(
                            checkbox.dataset.index
                        )
                )
                .sort(
                    (a, b) =>
                        a - b
                );


            if (
                selected.length < 2
            ) {

                alert(
                    "Select at least two consecutive periods."
                );

                return;

            }


            // Must be consecutive

            for (
                let i = 1;
                i < selected.length;
                i++
            ) {

                if (
                    selected[i]
                    !==
                    selected[i - 1] + 1
                ) {

                    alert(
                        "Only consecutive periods can be merged."
                    );

                    return;

                }

            }


            // Cannot merge an already merged group

            for (
                const index
                of selected
            ) {

                if (
                    schedule[index]
                        .mergedWith !== null
                ) {

                    alert(
                        "One of the selected periods is already merged."
                    );

                    return;

                }

            }


            // IMPORTANT:
            // We DO NOT check course or teacher.
            //
            // This allows:
            //
            // Select → Merge → Course → Teacher
            //
            // exactly as requested.


            const first =
                selected[0];


            selected.forEach(
                index => {

                    schedule[index]
                        .mergedWith =
                        first;

                }
            );


            // Keep the first slot's
            // current course/teacher.
            //
            // If it is empty, user can
            // select the course afterward.

            renderSchedule();

        }
    );


// ============================================
// UNMERGE
// ============================================

document
    .getElementById(
        "unmergeButton"
    )
    .addEventListener(
        "click",
        () => {

            const selected =
                document.querySelector(
                    ".slot-checkbox:checked"
                );


            if (!selected) {

                alert(
                    "Select the merged period first."
                );

                return;

            }


            const index =
                Number(
                    selected.dataset.index
                );


            const group =
                schedule[index]
                    .mergedWith;


            if (
                group === null
            ) {

                alert(
                    "This period is not merged."
                );

                return;

            }


            schedule.forEach(
                item => {

                    if (
                        item.mergedWith === group
                    ) {

                        item.mergedWith =
                            null;

                    }

                }
            );


            renderSchedule();

        }
    );


// ============================================
// DATE NAVIGATION
// ============================================

document
    .getElementById(
        "previousDay"
    )
    .addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() - 1
            );


            loadRoutine();

            updateDateDisplay();

            renderSchedule();

        }
    );


document
    .getElementById(
        "nextDay"
    )
    .addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() + 1
            );


            loadRoutine();

            updateDateDisplay();

            renderSchedule();

        }
    );


// ============================================
// RESET
// ============================================

document
    .getElementById(
        "resetSchedule"
    )
    .addEventListener(
        "click",
        () => {

            loadRoutine();

            updateDateDisplay();

            renderSchedule();

        }
    );


// ============================================
// GENERATE OUTPUT
// ============================================

document
    .getElementById(
        "generateButton"
    )
    .addEventListener(
        "click",
        () => {

            let message =
                "🔰 Tomorrow's Class Schedule 🔰\n";


            message +=
                "📅 "
                +
                formatDate(
                    selectedDate
                )
                +
                "\n\n";


            schedule.forEach(
                (item, index) => {

                    // Skip secondary merged slots

                    if (
                        item.mergedWith !== null
                        &&
                        item.mergedWith !== index
                    ) {

                        return;

                    }


                    // Skip empty classes

                    if (
                        !item.course
                    ) {

                        return;

                    }


                    const course =
                        findCourse(
                            item.course
                        );


                    if (!course) {

                        return;

                    }


                    let lastIndex =
                        index;


                    if (
                        item.mergedWith === index
                    ) {

                        while (

                            lastIndex + 1
                            <
                            schedule.length

                            &&

                            schedule[
                                lastIndex + 1
                            ].mergedWith === index

                        ) {

                            lastIndex++;

                        }

                    }


                    const start =
                        timeSlots[
                            index
                        ].start;


                    const end =
                        timeSlots[
                            lastIndex
                        ].end;


                    const emoji =
                        timeSlots[
                            index
                        ].emoji;


                    let line =
                        `${emoji} ${start} – ${end} : `;


                    line +=
                        `${course.code} – ${course.name}`;


                    if (
                        item.teacher
                    ) {

                        line +=
                            ` (${item.teacher})`;

                    }


                    message +=
                        line
                        +
                        "\n\n";

                }
            );


            const classroom =
                document.getElementById(
                    "classroom"
                ).value;


            if (
                classroom
            ) {

                message +=
                    `📍 Classroom : ${classroom}\n\n`;

            }


            const notice =
                document.getElementById(
                    "notice"
                ).value.trim();


            if (
                notice
            ) {

                message +=
                    `📢 Notice : ${notice}\n\n`;

            }


            message +=
                "@everyone";


            document.getElementById(
                "output"
            ).textContent =
                message;

        }
    );


// ============================================
// COPY
// ============================================

document
    .getElementById(
        "copyButton"
    )
    .addEventListener(
        "click",
        async () => {

            const output =
                document.getElementById(
                    "output"
                ).textContent;


            if (!output) {

                alert(
                    "Generate the schedule first."
                );

                return;

            }


            await navigator.clipboard.writeText(
                output
            );


            const button =
                document.getElementById(
                    "copyButton"
                );


            button.textContent =
                "Copied!";


            setTimeout(
                () => {

                    button.textContent =
                        "Copy";

                },
                1500
            );

        }
    );


// ============================================
// INITIALIZE
// ============================================

loadRoutine();

updateDateDisplay();

renderSchedule();
