const form = document.getElementById("registration-form");
const tableBody = document.getElementById("entries");

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function addRow(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.acceptedTerms}</td>
  `;
  tableBody.appendChild(row);
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const user = { name, email, password, dob, acceptedTerms };
  const users = getUsers();
  users.push(user);
  setUsers(users);
  addRow(user);
  form.reset();
});

window.onload = () => {
  const users = getUsers();
  users.forEach(user => addRow(user));

  // Set min and max DOB range
  const dobInput = document.getElementById("dob");
  const today = new Date();
  const maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDob = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  dobInput.setAttribute("max", formatDate(maxDob));
  dobInput.setAttribute("min", formatDate(minDob));
};
