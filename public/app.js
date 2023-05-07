const unitSelect = document.getElementById("unit");
const heightCm = document.getElementById("height-cm");
const heightFtIn = document.getElementById("height-ft-in");
const rangeInput = document.getElementById('activity-range');
const numberDisplay = document.getElementById('activity-number');

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

