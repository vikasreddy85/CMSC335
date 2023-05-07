const rangeInput = document.getElementById('activity-range');
const numberDisplay = document.getElementById('activity-number');





rangeInput.addEventListener('input', function() {
  const value = rangeInput.value;
  const formattedValue = value + "g";
  numberDisplay.textContent = formattedValue;
});