// ========================================
// CLASS ROUTINE GENERATOR
// ========================================


// ========================================
// TIME SLOTS
// ========================================

const timeSlots = [

    {
        start: "9:00",
        end: "9:45"
    },

    {
        start: "9:50",
        end: "10:35"
    },

    {
        start: "10:40",
        end: "11:25"
    },

    {
        start: "11:30",
        end: "12:15"
    },

    {
        start: "12:20",
        end: "1:05"
    },

    {
        start: "1:45",
        end: "2:30"
    }

];


// ========================================
// COURSES
// ========================================

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


// ========================================
// STATE
// ========================================

let selectedDate = new Date();


// Default = TOMORROW

selectedDate.setDate(
    selectedDate.getDate() + 1
);


// Each slot stores its current state

let schedule = timeSlots.map(() => ({

    course: "",
    teacher: "",

    // If this slot is part of a merged class,
    // mergedWith stores the ID of the merged group.

    mergedWith: null

}));


// ========================================
// DATE
// ========================================

function formatDate(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


function updateDateDisplay() {

    document.getElementById(
        "scheduleDate"
    ).textContent = formatDate(selectedDate);

}


// ========================================
// COURSE OPTIONS
// ========================================

function getCourseOptions(selectedCourse) {

    let html = `
        <option value="">
            — Select Course —
        </option>
    `;

    courses.forEach((course, index) => {

        const selected =
            selectedCourse === index
                ? "selected"
                : "";

        html += `
            <option
                value="${index}"
                ${selected}
            >
                ${course.code} – ${course.name}
            </option>
        `;

    });

    return html;

}


// ========================================
// TEACHER OPTIONS
// ========================================

function getTeacherOptions(
    courseIndex,
    selectedTeacher
) {

    if (courseIndex === "") {

        return `
            <option value="">
                — Select Teacher —
            </option>
        `;

    }


    const course =
        courses[courseIndex];


    let html = `
        <option value="">
            — Select Teacher —
        </option>
    `;


    course.teachers.forEach(
        teacher => {

            const selected =
                selectedTeacher === teacher
                    ? "selected"
                    : "";

            html += `
                <option
                    value="${teacher}"
                    ${selected}
                >
                    ${teacher}
                </option>
            `;

        }
    );


    // If there are multiple teachers,
    // allow selecting them together.

    if (course.teachers.length > 1) {

        const combined =
            course.teachers.join(" + ");

        const selected =
            selectedTeacher === combined
                ? "selected"
                : "";

        html += `
            <option
                value="${combined}"
                ${selected}
            >
                ${combined}
            </option>
        `;

    }


    return html;

}


// ========================================
// RENDER SCHEDULE
// ========================================

function renderSchedule() {

    const container =
        document.getElementById(
            "scheduleContainer"
        );


    container.innerHTML = "";


    timeSlots.forEach(
        (slot, index) => {

            // Skip slots hidden by merging

            if (
                schedule[index].mergedWith !== null
                &&
                schedule[index].mergedWith !== index
            ) {

                return;

            }


            const current =
                schedule[index];


            // Determine merged group

            let groupIndexes = [index];


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
                            i => i !== null
                        );

            }


            const firstIndex =
                groupIndexes[0];

            const lastIndex =
                groupIndexes[
                    groupIndexes.length - 1
                ];


            const startTime =
                timeSlots[firstIndex].start;

            const endTime =
                timeSlots[lastIndex].end;


            const div =
                document.createElement("div");


            div.className =
                "schedule-slot";


            div.dataset.index =
                index;


            div.innerHTML = `

                <div class="slot-top">

                    <span class="time">
                        ${startTime} – ${endTime}
                    </span>

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

                    ${getCourseOptions(
                        current.course
                    )}

                </select>


                <select
                    class="teacher-select"
                    data-index="${index}"
                >

                    ${getTeacherOptions(
                        current.course,
                        current.teacher
                    )}

                </select>

            `;


            container.appendChild(div);


            // COURSE CHANGE

            div
                .querySelector(".course-select")
                .addEventListener(
                    "change",
                    event => {

                        const value =
                            event.target.value;


                        schedule[index].course =
                            value === ""
                                ? ""
                                : Number(value);


                        // Reset teacher

                        schedule[index].teacher =
                            "";


                        renderSchedule();

                    }
                );


            // TEACHER CHANGE

            div
                .querySelector(".teacher-select")
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


// ========================================
// MERGE
// ========================================

document
    .getElementById("mergeButton")
    .addEventListener(
        "click",
        () => {

            const checkboxes =
                document.querySelectorAll(
                    ".slot-checkbox:checked"
                );


            const selected =
                Array.from(checkboxes)
                    .map(
                        checkbox =>
                            Number(
                                checkbox.dataset.index
                            )
                    )
                    .sort(
                        (a, b) => a - b
                    );


            // Need at least 2 slots

            if (selected.length < 2) {

                alert(
                    "Select at least two consecutive slots to merge."
                );

                return;

            }


            // Check consecutive

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
                        "Only consecutive slots can be merged."
                    );

                    return;

                }

            }


            const first =
                selected[0];


            const last =
                selected[selected.length - 1];


            // Check that all selected slots
            // have the same course

            const firstCourse =
                schedule[first].course;


            if (!firstCourse) {

                alert(
                    "Select a course before merging."
                );

                return;

            }


            for (const index of selected) {

                if (
                    schedule[index].course
                    !==
                    firstCourse
                ) {

                    alert(
                        "Merged slots must have the same course."
                    );

                    return;

                }

            }


            // Check teacher

            const firstTeacher =
                schedule[first].teacher;


            for (const index of selected) {

                if (
                    schedule[index].teacher
                    !==
                    firstTeacher
                ) {

                    alert(
                        "Merged slots must have the same teacher."
                    );

                    return;

                }

            }


            // Mark all selected slots
            // as one merged group

            selected.forEach(
                index => {

                    schedule[index].mergedWith =
                        first;

                }
            );


            renderSchedule();

        }
    );


// ========================================
// UNMERGE
// ========================================

document
    .getElementById("unmergeButton")
    .addEventListener(
        "click",
        () => {

            const checkboxes =
                document.querySelectorAll(
                    ".slot-checkbox:checked"
                );


            if (checkboxes.length === 0) {

                alert(
                    "Select a merged class first."
                );

                return;

            }


            const index =
                Number(
                    checkboxes[0].dataset.index
                );


            const group =
                schedule[index].mergedWith;


            if (group === null) {

                alert(
                    "This slot is not merged."
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


// ========================================
// DATE NAVIGATION
// ========================================

document
    .getElementById("previousDay")
    .addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() - 1
            );

            updateDateDisplay();

        }
    );


document
    .getElementById("nextDay")
    .addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() + 1
            );

            updateDateDisplay();

        }
    );


// ========================================
// RESET
// ========================================

document
    .getElementById("resetSchedule")
    .addEventListener(
        "click",
        () => {

            schedule =
                timeSlots.map(
                    () => ({

                        course: "",
                        teacher: "",
                        mergedWith: null

                    })
                );


            document.getElementById(
                "classroom"
            ).value = "";


            document.getElementById(
                "notice"
            ).value = "";


            document.getElementById(
                "output"
            ).textContent = "";


            renderSchedule();

        }
    );


// ========================================
// GENERATE OUTPUT
// ========================================

document
    .getElementById("generateButton")
    .addEventListener(
        "click",
        () => {

            let message =
                "🔰 Tomorrow's Class Schedule 🔰\n";


            message +=
                "📅 "
                +
                formatDate(selectedDate)
                +
                "\n\n";


            schedule.forEach(
                (item, index) => {

                    // Skip slots that are
                    // secondary members of
                    // a merged group.

                    if (
                        item.mergedWith !== null
                        &&
                        item.mergedWith !== index
                    ) {

                        return;

                    }


                    if (
                        item.course === ""
                    ) {

                        return;

                    }


                    const course =
                        courses[item.course];


                    // Determine end time

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
                        timeSlots[index].start;


                    const end =
                        timeSlots[lastIndex].end;


                    let line =
                        `${start} – ${end} : `;


                    line +=
                        `${course.code} – ${course.name}`;


                    if (
                        item.teacher
                    ) {

                        line +=
                            ` (${item.teacher})`;

                    }


                    message +=
                        line + "\n\n";

                }
            );


            const classroom =
                document.getElementById(
                    "classroom"
                ).value;


            if (classroom) {

                message +=
                    `📍 Classroom : ${classroom}\n\n`;

            }


            const notice =
                document.getElementById(
                    "notice"
                ).value.trim();


            if (notice) {

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


// ========================================
// COPY
// ========================================

document
    .getElementById("copyButton")
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


// ========================================
// INITIALIZE
// ========================================

updateDateDisplay();

renderSchedule();
