const form = document.getElementById("ninjaForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const errorMessages = document.querySelectorAll(".error-message");
  for (const el of errorMessages) el.textContent = "";

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

  if (!isNotEmpty(userName.value)) {
    showInputError(userName, "Pls write down your name");
    isValid = false;
  }

  if (!hasCheckedOption("ninjaExist")) {
    const radio = document.getElementsByName("ninjaExist")[0];
    showInputError(radio, "At least select one");
    isValid = false;
  }

  if (!isSelected(origin)) {
    showInputError(origin, "Just guess the Ninja origin");
    isValid = false;
  }

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!isNotEmpty(email.value)) {
    showInputError(email, "Email cannot be empty");
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    showInputError(email, "Enter a valid email address");
    isValid = false;
  }

  return isValid;
}
