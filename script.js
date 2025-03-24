document.addEventListener("DOMContentLoaded", loadStudents);

document.getElementById("student-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("studentName").value.trim();
    let id = document.getElementById("studentID").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!name || !id || !email || !contact) {
        alert("All fields are required!.");
        return;
    }

    if (isNaN(id) || isNaN(contact)) {
        alert("Student ID and Contact No. must be numeric.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("student-form").reset();
    loadStudents();
});

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentList = document.getElementById("student-table");
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
