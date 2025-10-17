const form = document.getElementById("ninjaForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const errorMessages = document.querySelectorAll(".error-message");
  for (const error of errorMessages) error.textContent = "";

  if (validateForm()) {
    form.submit();
    console.log("work");
  } else {
    console.log("not work");
  }
});

function isNotEmpty(value) {
  return value.trim() !== "";
}

function hasCheckedOption(name) {
  const options = document.getElementsByName(name);
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) return true;
  }
  return false;
}

function isSelected(selectElement) {
  return selectElement.value !== "guess";
}

function showInputError(inputElement, message) {
  let span = inputElement.parentElement.querySelector(".error-message");
  if (!span) {
    span = inputElement.closest("fieldset").querySelector(".error-message");
  }
  if (span) {
    span.textContent = message;
  }
}

function validateForm() {
  let isValid = true;

  const userName = document.getElementById("userName");
  const email = document.getElementById("email");
  const origin = document.getElementById("origin");
  const fillDate = document.getElementById("fillDate");
  const firstWords = document.getElementById("firstWords");
  const skills = document.getElementsByName("skills");

  const lettersOnly = /^[A-Za-z]+$/;
  if (!isNotEmpty(userName.value)) {
    showInputError(userName, "Name error");
    isValid = false;
  } else if (!lettersOnly.test(userName.value)) {
    showInputError(userName, "Name must not has number and not be empty.");
    isValid = false;
  }

  if (!hasCheckedOption("ninjaExist")) {
    const radio = document.getElementsByName("ninjaExist")[0];
    showInputError(radio, "At least select one");
    isValid = false;
  }

  let skillChecked = false;
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].checked) skillChecked = true;
  }
  if (!skillChecked) {
    showInputError(skills[0], "Please select at least one skill");
    isValid = false;
  }

  if (!isSelected(origin)) {
    showInputError(origin, "Just guess the Ninja origin");
    isValid = false;
  }

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailPattern.test(email.value)) {
    showInputError(email, "Enter a valid email address");
    isValid = false;
  }

  if (fillDate.value === "") {
    showInputError(fillDate, "Please select a date");
    isValid = false;
  }

  if (firstWords.value.trim() === "") {
    showInputError(firstWords, "Please write something");
    isValid = false;
  }

  return isValid;
}
