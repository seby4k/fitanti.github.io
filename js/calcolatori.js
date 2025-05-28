document.addEventListener('DOMContentLoaded', () => {
  // Tab navigation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const calculatorContents = document.querySelectorAll('.calculator-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding content
      calculatorContents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
      
      // Update URL hash
      window.location.hash = target;
    });
  });
  
  // Check URL hash on page load
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const targetTab = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (targetTab) {
      targetTab.click();
    }
  }
  
  // IMC Calculator
  const imcWeightInput = document.getElementById('imc-weight');
  const imcHeightInput = document.getElementById('imc-height');
  const imcCalculateBtn = document.getElementById('imc-calculate');
  const imcResult = document.getElementById('imc-result');
  const imcValue = document.getElementById('imc-value');
  const imcCategory = document.getElementById('imc-category');
  const imcDescription = document.getElementById('imc-description');
  const imcIndicator = document.getElementById('imc-indicator');
  
  if (imcCalculateBtn) {
    imcCalculateBtn.addEventListener('click', calculateIMC);
  }
  
  function calculateIMC() {
    const weight = parseFloat(imcWeightInput.value);
    const height = parseFloat(imcHeightInput.value) / 100; // convert to meters
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Inserisci valori validi per peso e altezza.');
      return;
    }
    
    const imc = weight / (height * height);
    const imcRounded = Math.round(imc * 10) / 10;
    
    imcValue.textContent = imcRounded;
    
    // Determine category
    let category;
    let description;
    let position;
    
    if (imc < 18.5) {
      category = 'Sottopeso';
      description = 'Il tuo IMC indica che sei sottopeso. Potresti considerare di aumentare il tuo apporto calorico in modo sano.';
      position = '12.5%';
    } else if (imc < 25) {
      category = 'Normopeso';
      description = 'Il tuo IMC indica che sei in un range di peso normale. Continua a mantenere una dieta equilibrata e a fare attività fisica regolare.';
      position = '37.5%';
    } else if (imc < 30) {
      category = 'Sovrappeso';
      description = 'Il tuo IMC indica che sei in sovrappeso. Considera di fare più attività fisica e di migliorare la tua alimentazione.';
      position = '62.5%';
    } else {
      category = 'Obesità';
      description = 'Il tuo IMC indica obesità. Ti consigliamo di consultare un professionista della salute per un piano personalizzato.';
      position = '87.5%';
    }
    
    imcCategory.textContent = category;
    imcDescription.textContent = description;
    imcIndicator.style.left = position;
    
    // Add class for category
    imcCategory.className = 'result-category';
    imcCategory.classList.add(category.toLowerCase());
    
    // Show result
    imcResult.classList.remove('hidden');
  }
  
  // TDEE Calculator
  const tdeeAgeInput = document.getElementById('tdee-age');
  const tdeeWeightInput = document.getElementById('tdee-weight');
  const tdeeHeightInput = document.getElementById('tdee-height');
  const tdeeActivitySelect = document.getElementById('tdee-activity');
  const tdeeCalculateBtn = document.getElementById('tdee-calculate');
  const tdeeResult = document.getElementById('tdee-result');
  const bmrValue = document.getElementById('bmr-value');
  const tdeeValue = document.getElementById('tdee-value');
  const tdeeLose = document.getElementById('tdee-lose');
  const tdeeMaintain = document.getElementById('tdee-maintain');
  const tdeeGain = document.getElementById('tdee-gain');
  
  if (tdeeCalculateBtn) {
    tdeeCalculateBtn.addEventListener('click', calculateTDEE);
  }
  
  function calculateTDEE() {
    const age = parseInt(tdeeAgeInput.value);
    const weight = parseFloat(tdeeWeightInput.value);
    const height = parseFloat(tdeeHeightInput.value);
    const gender = document.querySelector('input[name="tdee-gender"]:checked').value;
    const activityLevel = parseFloat(tdeeActivitySelect.value);
    
    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
      alert('Inserisci valori validi per età, peso e altezza.');
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE
    const tdee = Math.round(bmr * activityLevel);
    
    // Update result values
    bmrValue.textContent = Math.round(bmr);
    tdeeValue.textContent = tdee;
    tdeeMaintain.textContent = tdee;
    tdeeLose.textContent = Math.round(tdee * 0.8); // 20% deficit
    tdeeGain.textContent = Math.round(tdee * 1.15); // 15% surplus
    
    // Show result
    tdeeResult.classList.remove('hidden');
  }
  
  // Macronutrient Calculator
  const macroCaloriesInput = document.getElementById('macro-calories');
  const macroGoalSelect = document.getElementById('macro-goal');
  const macroActivitySelect = document.getElementById('macro-activity');
  const macroCalculateBtn = document.getElementById('macro-calculate');
  const macroResult = document.getElementById('macro-result');
  const macroDailyCalories = document.getElementById('macro-daily-calories');
  const proteinPercentage = document.getElementById('protein-percentage');
  const proteinGrams = document.getElementById('protein-grams');
  const proteinCalories = document.getElementById('protein-calories');
  const carbsPercentage = document.getElementById('carbs-percentage');
  const carbsGrams = document.getElementById('carbs-grams');
  const carbsCalories = document.getElementById('carbs-calories');
  const fatPercentage = document.getElementById('fat-percentage');
  const fatGrams = document.getElementById('fat-grams');
  const fatCalories = document.getElementById('fat-calories');
  const macroDescription = document.getElementById('macro-description');
  
  if (macroCalculateBtn) {
    macroCalculateBtn.addEventListener('click', calculateMacros);
  }
  
  function calculateMacros() {
    const calories = parseInt(macroCaloriesInput.value);
    const goal = macroGoalSelect.value;
    const activity = macroActivitySelect.value;
    
    if (isNaN(calories) || calories <= 0) {
      alert('Inserisci un valore valido per le calorie giornaliere.');
      return;
    }
    
    let proteinPct, carbsPct, fatPct;
    
    // Adjust macros based on goal and activity level
    if (goal === 'lose') {
      if (activity === 'light') {
        proteinPct = 35;
        fatPct = 30;
        carbsPct = 35;
      } else if (activity === 'moderate') {
        proteinPct = 30;
        fatPct = 30;
        carbsPct = 40;
      } else { // high
        proteinPct = 30;
        fatPct = 25;
        carbsPct = 45;
      }
      
      macroDescription.textContent = 'Per la perdita di peso, questa distribuzione di macronutrienti mette l\'enfasi su proteine per preservare la massa muscolare e un equilibrio di grassi e carboidrati per l\'energia.';
    } else if (goal === 'maintain') {
      if (activity === 'light') {
        proteinPct = 25;
        fatPct = 35;
        carbsPct = 40;
      } else if (activity === 'moderate') {
        proteinPct = 25;
        fatPct = 30;
        carbsPct = 45;
      } else { // high
        proteinPct = 25;
        fatPct = 25;
        carbsPct = 50;
      }
      
      macroDescription.textContent = 'Per il mantenimento del peso, questa distribuzione di macronutrienti è bilanciata per fornire energia sufficiente e supportare il recupero muscolare.';
    } else { // gain
      if (activity === 'light') {
        proteinPct = 25;
        fatPct = 30;
        carbsPct = 45;
      } else if (activity === 'moderate') {
        proteinPct = 25;
        fatPct = 25;
        carbsPct = 50;
      } else { // high
        proteinPct = 30;
        fatPct = 20;
        carbsPct = 50;
      }
      
      macroDescription.textContent = 'Per l\'aumento della massa muscolare, questa distribuzione fornisce carboidrati sufficienti per l\'energia e il recupero, con un adeguato apporto proteico per supportare la crescita muscolare.';
    }
    
    // Calculate grams and calories for each macro
    const proteinCaloriesValue = Math.round(calories * (proteinPct / 100));
    const carbsCaloriesValue = Math.round(calories * (carbsPct / 100));
    const fatCaloriesValue = Math.round(calories * (fatPct / 100));
    
    const proteinGramsValue = Math.round(proteinCaloriesValue / 4); // 4 calories per gram
    const carbsGramsValue = Math.round(carbsCaloriesValue / 4); // 4 calories per gram
    const fatGramsValue = Math.round(fatCaloriesValue / 9); // 9 calories per gram
    
    // Update result values
    macroDailyCalories.textContent = calories;
    proteinPercentage.textContent = proteinPct;
    proteinGrams.textContent = proteinGramsValue;
    proteinCalories.textContent = proteinCaloriesValue;
    carbsPercentage.textContent = carbsPct;
    carbsGrams.textContent = carbsGramsValue;
    carbsCalories.textContent = carbsCaloriesValue;
    fatPercentage.textContent = fatPct;
    fatGrams.textContent = fatGramsValue;
    fatCalories.textContent = fatCaloriesValue;
    
    // Show result
    macroResult.classList.remove('hidden');
    
    // Create a simple pie chart (we'll use a placeholder for now)
    const pieChart = document.getElementById('macro-pie-chart-container');
    if (pieChart) {
      pieChart.innerHTML = `
        <div style="position: relative; width: 200px; height: 200px;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(
            #EF5350 0% ${proteinPct}%, 
            #66BB6A ${proteinPct}% ${proteinPct + carbsPct}%, 
            #FFA726 ${proteinPct + carbsPct}% 100%
          );"></div>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <span style="font-size: 1.5rem; font-weight: 600;">${calories}</span><br>
            <span style="font-size: 0.875rem;">calorie</span>
          </div>
        </div>
      `;
    }
  }
  
  // Calorie per dimagrire Calculator
  const calCurrentWeightInput = document.getElementById('cal-current-weight');
  const calGoalWeightInput = document.getElementById('cal-goal-weight');
  const calHeightInput = document.getElementById('cal-height');
  const calAgeInput = document.getElementById('cal-age');
  const calActivitySelect = document.getElementById('cal-activity');
  const calTimeframeInput = document.getElementById('cal-timeframe');
  const calCalculateBtn = document.getElementById('cal-calculate');
  const calResult = document.getElementById('cal-result');
  
  if (calCalculateBtn) {
    calCalculateBtn.addEventListener('click', calculateCalorieDeficit);
  }
  
  function calculateCalorieDeficit() {
    const currentWeight = parseFloat(calCurrentWeightInput.value);
    const goalWeight = parseFloat(calGoalWeightInput.value);
    const height = parseFloat(calHeightInput.value);
    const age = parseInt(calAgeInput.value);
    const gender = document.querySelector('input[name="cal-gender"]:checked').value;
    const activityLevel = parseFloat(calActivitySelect.value);
    const timeframe = parseInt(calTimeframeInput.value);
    
    if (isNaN(currentWeight) || isNaN(goalWeight) || isNaN(height) || isNaN(age) || isNaN(timeframe) ||
        currentWeight <= 0 || height <= 0 || age <= 0 || timeframe <= 0) {
      alert('Inserisci valori validi per tutti i campi.');
      return;
    }
    
    if (goalWeight >= currentWeight) {
      alert('Il peso obiettivo deve essere inferiore al peso attuale per un piano di dimagrimento.');
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate maintenance calories
    const maintenanceCalories = Math.round(bmr * activityLevel);
    
    // Calculate weight to lose and weekly rate
    const weightToLose = currentWeight - goalWeight;
    const weeklyRate = weightToLose / timeframe;
    
    // Calculate calorie deficit needed (1kg fat = ~7700 calories)
    const dailyDeficit = Math.round((weeklyRate * 7700) / 7);
    
    // Calculate target calories
    const targetCalories = maintenanceCalories - dailyDeficit;
    
    // Safety check: ensure minimum healthy calorie intake
    const minCalories = gender === 'male' ? 1500 : 1200;
    const safeTargetCalories = Math.max(targetCalories, minCalories);
    
    // Update result values
    document.getElementById('cal-weight-to-lose').textContent = weightToLose.toFixed(1);
    document.getElementById('cal-weeks').textContent = timeframe;
    document.getElementById('cal-maintenance').textContent = maintenanceCalories;
    document.getElementById('cal-target').textContent = safeTargetCalories;
    document.getElementById('cal-deficit').textContent = maintenanceCalories - safeTargetCalories;
    document.getElementById('cal-start-weight').textContent = currentWeight;
    document.getElementById('cal-end-weight').textContent = goalWeight;
    document.getElementById('cal-milestone-week').textContent = timeframe;
    
    // Feedback based on weekly rate
    const feedback = document.getElementById('cal-feedback');
    if (weeklyRate > 1) {
      feedback.textContent = `Nota: Stai pianificando di perdere ${weeklyRate.toFixed(1)} kg a settimana, che è sopra il tasso di perdita di peso raccomandato di 0.5-1 kg a settimana. Considera di estendere il periodo per un approccio più sostenibile.`;
      feedback.style.color = 'var(--warning-color)';
    } else if (targetCalories < minCalories) {
      feedback.textContent = `Attenzione: Il deficit calorico calcolato porterebbe a un apporto calorico troppo basso. Abbiamo aggiustato a ${safeTargetCalories} calorie al giorno per la sicurezza. Considera di estendere il periodo per il tuo obiettivo di peso.`;
      feedback.style.color = 'var(--error-color)';
    } else {
      feedback.textContent = `Il tuo piano prevede una perdita di ${weeklyRate.toFixed(1)} kg a settimana, che è dentro il range raccomandato. Questo approccio dovrebbe essere sostenibile e sano.`;
      feedback.style.color = 'var(--success-color)';
    }
    
    // Show result
    calResult.classList.remove('hidden');
  }
});