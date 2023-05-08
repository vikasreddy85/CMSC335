const unitSelect = document.getElementById("unit");
const heightCm = document.getElementById("height-cm");
const heightFtIn = document.getElementById("height-ft-in");
const rangeInput = document.getElementById('activity-range');
const numberDisplay = document.getElementById('activity-number');
const ageInput = document.getElementById("ageInput");
const ageError = document.getElementById("ageError");
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");
const heightCmInput = document.getElementById("height-cm");
const heightFtInInput = document.getElementById("height-ft-in");
const heightError = document.getElementById("heightError");
const weightInput = document.querySelector("input[name='weight']");
const weightError = document.getElementById("weightError");
const lettersOnly = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]*(\.)?[^\s@]+$/;
const heightFtInRegex = /^[0-9]+ [0-9]+$/;
const weightRegex = /^[0-9]+(\.[0-9]+)?$/;
const inputTimeout = 1000;
let timeoutId;

unitSelect.addEventListener("change", function() {
  if (unitSelect.value === "kg") {
    heightCm.classList.remove("hide");
    heightFtIn.classList.add("hide");
  } else {
    heightCm.classList.add("hide");
    heightFtIn.classList.remove("hide");
  }
});

rangeInput.addEventListener('input', function() {
  const value = rangeInput.value;
  numberDisplay.textContent = value;
});

ageInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const ageValue = Number(ageInput.value);
    if (isNaN(ageValue) || ageValue < 1 || ageValue > 100) {
      ageError.textContent = "Age must be a number between 1 and 100";
      ageInput.setCustomValidity("Invalid input");
    } else {
      ageError.textContent = "";
      ageInput.setCustomValidity("");
    }
  }, inputTimeout);
});

nameInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const nameValue = nameInput.value;
    if (!lettersOnly.test(nameValue)) {
      nameError.textContent = "Name must contain only letters";
      nameInput.setCustomValidity("Invalid input");
    } else {
      nameError.textContent = "";
      nameInput.setCustomValidity("");
    }
  }, inputTimeout);
});

emailInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const emailValue = emailInput.value;
    if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Email must be a valid email address";
      emailInput.setCustomValidity("Invalid input");
    } else {
      emailError.textContent = "";
      emailInput.setCustomValidity("");
    }
  }, inputTimeout);
});

heightCmInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const heightCmValue = heightCmInput.value;
    if (isNaN(heightCmValue) || heightCmValue < 100 || heightCmValue > 250) {
      heightError.textContent = "Height must be a valid number";
      heightCmInput.setCustomValidity("Invalid input");
    } else {
      heightError.textContent = "";
      heightCmInput.setCustomValidity("");
    }
  }, inputTimeout);
});

heightFtInInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const heightFtInValue = heightFtInInput.value;
    if (!heightFtInRegex.test(heightFtInValue)) {
      heightError.textContent = "Height must be a valid number in ft and in";
      heightFtInInput.setCustomValidity("Invalid input");
    } else {
      heightError.textContent = "";
      heightFtInInput.setCustomValidity("");
    }
  }, inputTimeout);
});

weightInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const weightValue = weightInput.value;
    if (isNaN(weightValue) || weightValue < 20 || weightValue > 700) { 
      weightError.textContent = "Weight must be a valid number";
      weightInput.setCustomValidity("Invalid input");
    } else {
      weightError.textContent = "";
      weightInput.setCustomValidity("");
    }
  }, inputTimeout);
});