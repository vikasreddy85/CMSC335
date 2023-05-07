const rangeInput1 = document.getElementById('activity-range1');
const rangeInput2 = document.getElementById('activity-range2');
const rangeInput3 = document.getElementById('activity-range3');
const rangeInput4 = document.getElementById('activity-range4');
const rangeInput5 = document.getElementById('activity-range5');
const rangeInput6 = document.getElementById('activity-range6');
const rangeInput7 = document.getElementById('activity-range7');
const rangeInput8 = document.getElementById('activity-range8');
const rangeInput9 = document.getElementById('activity-range9');

const numberDisplay1 = document.getElementById('activity-number1');
const numberDisplay2 = document.getElementById('activity-number2');
const numberDisplay3 = document.getElementById('activity-number3');
const numberDisplay4 = document.getElementById('activity-number4');
const numberDisplay5 = document.getElementById('activity-number5');
const numberDisplay6 = document.getElementById('activity-number6');
const numberDisplay7 = document.getElementById('activity-number7');
const numberDisplay8 = document.getElementById('activity-number8');
const numberDisplay9 = document.getElementById('activity-number9');

const bc1 = document.querySelector('.bc1');
const bp1 = document.querySelector('.bp1');
const bf1 = document.querySelector('.bf1');
const bcal1 = document.querySelector('.bcal1');
const bc2 = document.querySelector('.bc2');
const bp2 = document.querySelector('.bp2');
const bf2 = document.querySelector('.bf2');
const bcal2 = document.querySelector('.bcal2');
const bc3 = document.querySelector('.bc3');
const bp3 = document.querySelector('.bp3');
const bf3 = document.querySelector('.bf3');
const bcal3 = document.querySelector('.bcal3');

const lc1 = document.querySelector('.lc1');
const lp1 = document.querySelector('.lp1');
const lf1 = document.querySelector('.lf1');
const lcal1 = document.querySelector('.lcal1');
const lc2 = document.querySelector('.lc2');
const lp2 = document.querySelector('.lp2');
const lf2 = document.querySelector('.lf2');
const lcal2 = document.querySelector('.lcal2');
const lc3 = document.querySelector('.lc3');
const lp3 = document.querySelector('.lp3');
const lf3 = document.querySelector('.lf3');
const lcal3 = document.querySelector('.lcal3');

const dc1 = document.querySelector('.dc1');
const dp1 = document.querySelector('.dp1');
const df1 = document.querySelector('.df1');
const dcal1 = document.querySelector('.dcal1');
const dc2 = document.querySelector('.dc2');
const dp2 = document.querySelector('.dp2');
const df2 = document.querySelector('.df2');
const dcal2 = document.querySelector('.dcal2');
const dc3 = document.querySelector('.dc3');
const dp3 = document.querySelector('.dp3');
const df3 = document.querySelector('.df3');
const dcal3 = document.querySelector('.dcal3');

const breakfast = document.querySelector('.current-breakfast');
const lunch = document.querySelector('.current-lunch');
const dinner = document.querySelector('.current-dinner');
const total = document.querySelector('.current-calorie');

rangeInput1.addEventListener('input', function() {
  const value = rangeInput1.value;
  const formattedValue = value + "g";
  numberDisplay1.textContent = formattedValue;
});

rangeInput2.addEventListener('input', function() {
  const value = rangeInput2.value;
  const formattedValue = value + "g";
  numberDisplay2.textContent = formattedValue;
});
rangeInput3.addEventListener('input', function() {
  const value = rangeInput3.value;
  const formattedValue = value + "g";
  numberDisplay3.textContent = formattedValue;
});
rangeInput4.addEventListener('input', function() {
  const value = rangeInput4.value;
  const formattedValue = value + "g";
  numberDisplay4.textContent = formattedValue;
});
rangeInput5.addEventListener('input', function() {
  const value = rangeInput5.value;
  const formattedValue = value + "g";
  numberDisplay5.textContent = formattedValue;
});
rangeInput6.addEventListener('input', function() {
  const value = rangeInput6.value;
  const formattedValue = value + "g";
  numberDisplay6.textContent = formattedValue;
});
rangeInput7.addEventListener('input', function() {
  const value = rangeInput7.value;
  const formattedValue = value + "g";
  numberDisplay7.textContent = formattedValue;
});
rangeInput8.addEventListener('input', function() {
  const value = rangeInput8.value;
  const formattedValue = value + "g";
  numberDisplay8.textContent = formattedValue;
});
rangeInput9.addEventListener('input', function() {
  const value = rangeInput9.value;
  const formattedValue = value + "g";
  numberDisplay9.textContent = formattedValue;
});

const originalBc1 = parseFloat(bc1.textContent);
const originalBp1 = parseFloat(bp1.textContent);
const originalBf1 = parseFloat(bf1.textContent);
const originalBcal1 = parseFloat(bcal1.textContent);
breakfast.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent))).toFixed(1);
total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
(parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);

rangeInput1.addEventListener('input', () => {
  const rangeValue = rangeInput1.value;
  numberDisplay1.textContent = `${rangeValue}g`;
  const bcValue = originalBc1;
  const bpValue = originalBp1;
  const bfValue = originalBf1;
  const bcalValue = originalBcal1;
  
  const bcPer100g = parseFloat(bcValue) / 100;
  const bpPer100g = parseFloat(bpValue) / 100;
  const bfPer100g = parseFloat(bfValue) / 100;
  const bcalPer100g = parseFloat(bcalValue) / 100;
  
  calculatedBc = bcPer100g * rangeValue;
  bc1.textContent = calculatedBc.toFixed(1);

  calculatedBp = bpPer100g * rangeValue;
  bp1.textContent = calculatedBp.toFixed(1);

  calculatedBf = bfPer100g * rangeValue;
  bf1.textContent = calculatedBf.toFixed(1);

  calculatedBcal = bcalPer100g * rangeValue;
  bcal1.textContent = calculatedBcal.toFixed(1);

  breakfast.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalBc2 = parseFloat(bc2.textContent);
const originalBp2 = parseFloat(bp2.textContent);
const originalBf2 = parseFloat(bf2.textContent);
const originalBcal2 = parseFloat(bcal2.textContent);
rangeInput2.addEventListener('input', () => {
  const rangeValue = rangeInput2.value;
  numberDisplay2.textContent = `${rangeValue}g`;
  const bcValue = originalBc2;
  const bpValue = originalBp2;
  const bfValue = originalBf2;
  const bcalValue = originalBcal2;
  
  const bcPer100g = parseFloat(bcValue) / 100;
  const bpPer100g = parseFloat(bpValue) / 100;
  const bfPer100g = parseFloat(bfValue) / 100;
  const bcalPer100g = parseFloat(bcalValue) / 100;
  
  calculatedBc = bcPer100g * rangeValue;
  bc2.textContent = calculatedBc.toFixed(1);

  calculatedBp = bpPer100g * rangeValue;
  bp2.textContent = calculatedBp.toFixed(1);

  calculatedBf = bfPer100g * rangeValue;
  bf2.textContent = calculatedBf.toFixed(1);

  calculatedBcal = bcalPer100g * rangeValue;
  bcal2.textContent = calculatedBcal.toFixed(1);

  breakfast.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalBc3 = parseFloat(bc3.textContent);
const originalBp3 = parseFloat(bp3.textContent);
const originalBf3 = parseFloat(bf3.textContent);
const originalBcal3 = parseFloat(bcal3.textContent);
rangeInput3.addEventListener('input', () => {
  const rangeValue = rangeInput3.value;
  numberDisplay3.textContent = `${rangeValue}g`;
  const bcValue = originalBc3;
  const bpValue = originalBp3;
  const bfValue = originalBf3;
  const bcalValue = originalBcal3;
  
  const bcPer100g = parseFloat(bcValue) / 100;
  const bpPer100g = parseFloat(bpValue) / 100;
  const bfPer100g = parseFloat(bfValue) / 100;
  const bcalPer100g = parseFloat(bcalValue) / 100;
  
  calculatedBc = bcPer100g * rangeValue;
  bc3.textContent = calculatedBc.toFixed(1);

  calculatedBp = bpPer100g * rangeValue;
  bp3.textContent = calculatedBp.toFixed(1);

  calculatedBf = bfPer100g * rangeValue;
  bf3.textContent = calculatedBf.toFixed(1);

  calculatedBcal = bcalPer100g * rangeValue;
  bcal3.textContent = calculatedBcal.toFixed(1);

  breakfast.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalLc1 = parseFloat(lc1.textContent);
const originalLp1 = parseFloat(lp1.textContent);
const originalLf1 = parseFloat(lf1.textContent);
lunch.textContent = parseFloat((parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent))).toFixed(1);
const originalLcal1 = parseFloat(lcal1.textContent);
rangeInput4.addEventListener('input', () => {
  const rangeValue = rangeInput4.value;
  numberDisplay4.textContent = `${rangeValue}g`;
  const lcValue = originalLc1;
  const lpValue = originalLp1;
  const lfValue = originalLf1;
  const lcalValue = originalLcal1;
  
  const lcPer100g = parseFloat(lcValue) / 100;
  const lpPer100g = parseFloat(lpValue) / 100;
  const lfPer100g = parseFloat(lfValue) / 100;
  const lcalPer100g = parseFloat(lcalValue) / 100;
  
  calculatedLc = lcPer100g * rangeValue;
  lc1.textContent = calculatedLc.toFixed(1);

  calculatedLp = lpPer100g * rangeValue;
  lp1.textContent = calculatedLp.toFixed(1);

  calculatedLf = lfPer100g * rangeValue;
  lf1.textContent = calculatedLf.toFixed(1);

  calculatedLcal = lcalPer100g * rangeValue;
  lcal1.textContent = calculatedLcal.toFixed(1);

  lunch.textContent = parseFloat((parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalLc2 = parseFloat(lc2.textContent);
const originalLp2 = parseFloat(lp2.textContent);
const originalLf2 = parseFloat(lf2.textContent);
const originalLcal2 = parseFloat(lcal2.textContent);
rangeInput5.addEventListener('input', () => {
  const rangeValue = rangeInput5.value;
  numberDisplay5.textContent = `${rangeValue}g`;
  const lcValue = originalLc2;
  const lpValue = originalLp2;
  const lfValue = originalLf2;
  const lcalValue = originalLcal2;
  
  const lcPer100g = parseFloat(lcValue) / 100;
  const lpPer100g = parseFloat(lpValue) / 100;
  const lfPer100g = parseFloat(lfValue) / 100;
  const lcalPer100g = parseFloat(lcalValue) / 100;
  
  calculatedLc = lcPer100g * rangeValue;
  lc2.textContent = calculatedLc.toFixed(1);

  calculatedLp = lpPer100g * rangeValue;
  lp2.textContent = calculatedLp.toFixed(1);

  calculatedLf = lfPer100g * rangeValue;
  lf2.textContent = calculatedLf.toFixed(1);

  calculatedLcal = lcalPer100g * rangeValue;
  lcal2.textContent = calculatedLcal.toFixed(1);

  lunch.textContent = parseFloat((parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalLc3 = parseFloat(lc3.textContent);
const originalLp3 = parseFloat(lp3.textContent);
const originalLf3 = parseFloat(lf3.textContent);
const originalLcal3 = parseFloat(lcal3.textContent);
rangeInput6.addEventListener('input', () => {
  const rangeValue = rangeInput6.value;
  numberDisplay6.textContent = `${rangeValue}g`;
  const lcValue = originalLc3;
  const lpValue = originalLp3;
  const lfValue = originalLf3;
  const lcalValue = originalLcal3;
  
  const lcPer100g = parseFloat(lcValue) / 100;
  const lpPer100g = parseFloat(lpValue) / 100;
  const lfPer100g = parseFloat(lfValue) / 100;
  const lcalPer100g = parseFloat(lcalValue) / 100;
  
  calculatedLc = lcPer100g * rangeValue;
  lc3.textContent = calculatedLc.toFixed(1);

  calculatedLp = lpPer100g * rangeValue;
  lp3.textContent = calculatedLp.toFixed(1);

  calculatedLf = lfPer100g * rangeValue;
  lf3.textContent = calculatedLf.toFixed(1);

  calculatedLcal = lcalPer100g * rangeValue;
  lcal3.textContent = calculatedLcal.toFixed(1);

  lunch.textContent = parseFloat((parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalDc1 = parseFloat(dc1.textContent);
const originalDp1 = parseFloat(dp1.textContent);
const originalDf1 = parseFloat(df1.textContent);
const originalDcal1 = parseFloat(dcal1.textContent);
dinner.textContent = parseFloat((parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
rangeInput7.addEventListener('input', () => {
  const rangeValue = rangeInput7.value;
  numberDisplay7.textContent = `${rangeValue}g`;
  const dcValue = originalDc1;
  const dpValue = originalDp1;
  const dfValue = originalDf1;
  const dcalValue = originalDcal1;
  
  const dcPer100g = parseFloat(dcValue) / 100;
  const dpPer100g = parseFloat(dpValue) / 100;
  const dfPer100g = parseFloat(dfValue) / 100;
  const dcalPer100g = parseFloat(dcalValue) / 100;
  
  calculatedDc = dcPer100g * rangeValue;
  dc1.textContent = calculatedDc.toFixed(1);

  calculatedDp = dpPer100g * rangeValue;
  dp1.textContent = calculatedDp.toFixed(1);

  calculatedDf = dfPer100g * rangeValue;
  df1.textContent = calculatedDf.toFixed(1);

  calculatedDcal = dcalPer100g * rangeValue;
  dcal1.textContent = calculatedDcal.toFixed(1);

  dinner.textContent = parseFloat((parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalDc2 = parseFloat(dc2.textContent);
const originalDp2 = parseFloat(dp2.textContent);
const originalDf2 = parseFloat(df2.textContent);
const originalDcal2 = parseFloat(dcal2.textContent);
rangeInput8.addEventListener('input', () => {
  const rangeValue = rangeInput8.value;
  numberDisplay8.textContent = `${rangeValue}g`;
  const dcValue = originalDc2;
  const dpValue = originalDp2;
  const dfValue = originalDf2;
  const dcalValue = originalDcal2;
  
  const dcPer100g = parseFloat(dcValue) / 100;
  const dpPer100g = parseFloat(dpValue) / 100;
  const dfPer100g = parseFloat(dfValue) / 100;
  const dcalPer100g = parseFloat(dcalValue) / 100;
  
  calculatedDc = dcPer100g * rangeValue;
  dc2.textContent = calculatedDc.toFixed(1);

  calculatedDp = dpPer100g * rangeValue;
  dp2.textContent = calculatedDp.toFixed(1);

  calculatedDf = dfPer100g * rangeValue;
  df2.textContent = calculatedDf.toFixed(1);

  calculatedDcal = dcalPer100g * rangeValue;
  dcal2.textContent = calculatedDcal.toFixed(1);

  dinner.textContent = parseFloat((parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});

const originalDc3 = parseFloat(dc3.textContent);
const originalDp3 = parseFloat(dp3.textContent);
const originalDf3 = parseFloat(df3.textContent);
const originalDcal3 = parseFloat(dcal3.textContent);
rangeInput9.addEventListener('input', () => {
  const rangeValue = rangeInput9.value;
  numberDisplay9.textContent = `${rangeValue}g`;
  const dcValue = originalDc3;
  const dpValue = originalDp3;
  const dfValue = originalDf3;
  const dcalValue = originalDcal3;
  
  const dcPer100g = parseFloat(dcValue) / 100;
  const dpPer100g = parseFloat(dpValue) / 100;
  const dfPer100g = parseFloat(dfValue) / 100;
  const dcalPer100g = parseFloat(dcalValue) / 100;
  
  calculatedDc = dcPer100g * rangeValue;
  dc3.textContent = calculatedDc.toFixed(1);

  calculatedDp = dpPer100g * rangeValue;
  dp3.textContent = calculatedDp.toFixed(1);

  calculatedDf = dfPer100g * rangeValue;
  df3.textContent = calculatedDf.toFixed(1);

  calculatedDcal = dcalPer100g * rangeValue;
  dcal3.textContent = calculatedDcal.toFixed(1);

  dinner.textContent = parseFloat((parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
  total.textContent = parseFloat((parseFloat(bcal1.textContent) + parseFloat(bcal2.textContent) + parseFloat(bcal3.textContent)) + 
  (parseFloat(lcal1.textContent) + parseFloat(lcal2.textContent) + parseFloat(lcal3.textContent)) + (parseFloat(dcal1.textContent) + parseFloat(dcal2.textContent) + parseFloat(dcal3.textContent))).toFixed(1);
});