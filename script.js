// Select Form Elements
const studentForm = document.querySelector("#studentForm");

const studentName = document.querySelector("#studentName");

const studentId = document.querySelector("#studentId");

const email = document.querySelector("#email");

const contactNumber = document.querySelector("#contactNumber");

const studentList = document.querySelector("#studentList");

// Store Student Data in Array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Track Edit Mode
let editIndex = null;

// Display Existing Students When Page Loads
displayStudents();

// Form Submit Event
studentForm.addEventListener("submit", function (event) {

  // Prevent Page Refresh
  event.preventDefault();

  // Get Input Values
  const nameValue = studentName.value.trim();

  const idValue = studentId.value.trim();

  const emailValue = email.value.trim();

  const contactValue = contactNumber.value.trim();

  // Empty Validation
  if (
    nameValue === "" ||
    idValue === "" ||
    emailValue === "" ||
    contactValue === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  // Name Validation
  const namePattern = /^[A-Za-z ]+$/;

  if (!namePattern.test(nameValue)) {
    alert("Student name should contain only letters");
    return;
  }

  // Student ID Validation
  const idPattern = /^[0-9]+$/;

  if (!idPattern.test(idValue)) {
    alert("Student ID should contain only numbers");
    return;
  }

  // Email Validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!emailPattern.test(emailValue)) {
    alert("Enter a valid email address");
    return;
  }

  // Contact Number Validation
  const contactPattern = /^[0-9]{10,}$/;

  if (!contactPattern.test(contactValue)) {
    alert("Contact number must contain at least 10 digits");
    return;
  }

  // Prevent Duplicate Student ID
  const existingStudent = students.find(function (student) {

    return student.id === idValue;

  });

  if (existingStudent && editIndex === null) {

    alert("Student ID already exists");

    return;

  }

  // Student Object
  const student = {
    name: nameValue,
    id: idValue,
    email: emailValue,
    contact: contactValue
  };

  // Edit Existing Student
  if (editIndex !== null) {

    students[editIndex] = student;

  } else {

    // Add New Student
    students.push(student);

  }

  // Save Data to Local Storage
  localStorage.setItem("students", JSON.stringify(students));

  // Display Updated Students
  displayStudents();

  // Reset Form
  studentForm.reset();

  // Exit Edit Mode
  editIndex = null;

});

// Function to Display Students
function displayStudents() {

  // Clear Existing Table Data
  studentList.innerHTML = "";

  // Loop Through Student Array
  students.forEach(function (student, index) {

    // Create Table Row
    const row = document.createElement("tr");

    // Add Row Data
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>

      <td>
        <button class="edit-btn" onclick="editStudent(${index})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteStudent(${index})">
          Delete
        </button>
      </td>
    `;

    // Append Row to Table
    studentList.appendChild(row);

  });

}

// Function to Delete Student
function deleteStudent(index) {

  // Confirm Before Delete
  const confirmDelete = confirm(
    "Do you want to delete this student record?"
  );

  if (confirmDelete) {

    // Remove Student from Array
    students.splice(index, 1);

    // Update Local Storage
    localStorage.setItem("students", JSON.stringify(students));

    // Refresh Student Display
    displayStudents();

  }

}

// Function to Edit Student
function editStudent(index) {

  // Get Selected Student
  const student = students[index];

  // Fill Input Fields with Existing Data
  studentName.value = student.name;

  studentId.value = student.id;

  email.value = student.email;

  contactNumber.value = student.contact;

  // Enable Edit Mode
  editIndex = index;

}