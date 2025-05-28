document.addEventListener('DOMContentLoaded', () => {
  // Form elements
  const generatePlanBtn = document.getElementById('generate-plan');
  const workoutGoal = document.getElementById('workout-goal');
  const workoutDays = document.getElementById('workout-days');
  const workoutDuration = document.getElementById('workout-duration');
  const workoutEquipment = document.getElementById('workout-equipment');
  const workoutLevel = document.getElementById('workout-level');
  const workoutTypeCheckboxes = document.querySelectorAll('input[name="workout-type"]');
  
  // Results elements
  const workoutPlan = document.getElementById('workout-plan');
  const planGoal = document.getElementById('plan-goal');
  const planLevel = document.getElementById('plan-level');
  const planDays = document.getElementById('plan-days');
  const planNotesList = document.getElementById('plan-notes-list');
  const printPlanBtn = document.getElementById('print-plan');
  const newPlanBtn = document.getElementById('new-plan');
  
  // Exercise library elements
  const filterMuscle = document.getElementById('filter-muscle');
  const filterEquipment = document.getElementById('filter-equipment');
  const filterLevel = document.getElementById('filter-level');
  const exerciseLibrary = document.getElementById('exercise-library');
  const exerciseModal = document.getElementById('exercise-modal');
  const modalClose = document.querySelector('.close-modal');
  
  // Event listeners
  if (generatePlanBtn) {
    generatePlanBtn.addEventListener('click', generateWorkoutPlan);
  }
  
  if (printPlanBtn) {
    printPlanBtn.addEventListener('click', () => {
      window.print();
    });
  }
  
  if (newPlanBtn) {
    newPlanBtn.addEventListener('click', () => {
      workoutPlan.classList.add('hidden');
      window.scrollTo({
        top: document.querySelector('.generator-form').offsetTop - 100,
        behavior: 'smooth'
      });
    });
  }
  
  // Exercise library filters
  if (filterMuscle && filterEquipment && filterLevel) {
    filterMuscle.addEventListener('change', filterExercises);
    filterEquipment.addEventListener('change', filterExercises);
    filterLevel.addEventListener('change', filterExercises);
  }
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      exerciseModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === exerciseModal) {
      exerciseModal.style.display = 'none';
    }
  });
  
  // Generate workout plan
  function generateWorkoutPlan() {
    // Validate form
    if (!workoutGoal.value || !workoutDays.value || !workoutDuration.value || 
        !workoutEquipment.value || !workoutLevel.value) {
      alert('Per favore, compila tutti i campi prima di generare il piano.');
      return;
    }
    
    // Get selected workout types
    const selectedTypes = [];
    workoutTypeCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        selectedTypes.push(checkbox.value);
      }
    });
    
    if (selectedTypes.length === 0) {
      alert('Seleziona almeno un tipo di allenamento.');
      return;
    }
    
    // Update plan info
    const goalMap = {
      'perdita-peso': 'Perdita di peso',
      'tonificazione': 'Tonificazione muscolare',
      'massa': 'Aumento della massa muscolare',
      'resistenza': 'Miglioramento della resistenza',
      'forza': 'Aumento della forza'
    };
    
    const levelMap = {
      'principiante': 'Principiante',
      'intermedio': 'Intermedio',
      'avanzato': 'Avanzato'
    };
    
    planGoal.textContent = goalMap[workoutGoal.value];
    planLevel.textContent = levelMap[workoutLevel.value];
    planDays.textContent = workoutDays.value;
    
    // Generate workout schedule
    generateSchedule(
      parseInt(workoutDays.value),
      workoutGoal.value,
      workoutLevel.value,
      workoutEquipment.value,
      selectedTypes,
      parseInt(workoutDuration.value)
    );
    
    // Add notes based on goal and level
    generateNotes(workoutGoal.value, workoutLevel.value);
    
    // Show the plan
    workoutPlan.classList.remove('hidden');
    
    // Scroll to plan
    window.scrollTo({
      top: workoutPlan.offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  function generateSchedule(days, goal, level, equipment, types, duration) {
    // Clear previous schedule
    for (let i = 1; i <= 7; i++) {
      const dayContent = document.getElementById(`day-${i}`);
      if (dayContent) {
        dayContent.innerHTML = '';
      }
    }
    
    // Determine workout split based on days and goal
    let workoutSplit;
    
    if (goal === 'perdita-peso') {
      workoutSplit = generateWeightLossSplit(days, types, level);
    } else if (goal === 'massa' || goal === 'forza') {
      workoutSplit = generateMuscleBuildingSplit(days, level);
    } else if (goal === 'tonificazione') {
      workoutSplit = generateToningSplit(days, types, level);
    } else if (goal === 'resistenza') {
      workoutSplit = generateEnduranceSplit(days, types, level);
    }
    
    // Generate workouts for each day
    const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    let dayCounter = 0;
    
    for (let i = 1; i <= 7; i++) {
      const dayContent = document.getElementById(`day-${i}`);
      const dayHeader = document.querySelector(`.day-column[data-day="${i}"] .day-header`);
      
      if (dayContent && dayHeader) {
        dayHeader.textContent = daysOfWeek[i - 1];
        
        if (dayCounter < days) {
          const workout = workoutSplit?.[dayCounter];
          
          // Add defensive check for undefined workout
          if (!workout || workout.type === 'rest') {
            dayContent.innerHTML = '<div class="rest-day">Giorno di riposo</div>';
          } else {
            let workoutHTML = `
              <div class="workout-item">
                <h4>${workout.name}</h4>
                <p>${workout.description}</p>
            `;
            
            // Add exercises
            if (workout.exercises && workout.exercises.length > 0) {
              for (const exercise of workout.exercises) {
                let sets, reps;
                
                if (goal === 'resistenza') {
                  sets = '3-4';
                  reps = '15-20';
                } else if (goal === 'perdita-peso') {
                  sets = '3-4';
                  reps = '12-15';
                } else if (goal === 'tonificazione') {
                  sets = '3';
                  reps = '12-15';
                } else if (goal === 'massa') {
                  sets = '4-5';
                  reps = '8-12';
                } else if (goal === 'forza') {
                  sets = '5';
                  reps = '4-6';
                }
                
                // Adjust based on level
                if (level === 'principiante') {
                  sets = parseInt(sets.split('-')[0]);
                } else if (level === 'avanzato' && goal !== 'resistenza') {
                  reps = '8-12 + a fallimento';
                }
                
                workoutHTML += `
                  <div class="exercise-item">
                    <span>${exercise}</span>
                    <span>${sets} x ${reps}</span>
                  </div>
                `;
              }
            }
            
            workoutHTML += '</div>';
            dayContent.innerHTML = workoutHTML;
          }
          
          dayCounter++;
        } else {
          dayContent.innerHTML = '<div class="rest-day">Giorno di riposo</div>';
        }
      }
    }
  }
  
  function generateWeightLossSplit(days, types, level) {
    const workouts = [];
    const hasCardio = types.includes('cardio');
    const hasHiit = types.includes('hiit');
    const hasStrength = types.includes('forza');
    const hasFlexibility = types.includes('flessibilita');
    
    if (days <= 3) {
      // 2-3 days: Full body workouts with cardio
      for (let i = 0; i < days; i++) {
        if (i === 0) {
          workouts.push({
            type: 'full-body',
            name: 'Allenamento Total Body',
            description: 'Allenamento completo per tutto il corpo con focus su grandi gruppi muscolari',
            exercises: [
              'Squat',
              'Push-up / Piegamenti',
              'Rematore con manubri',
              'Affondi',
              'Crunch addominali',
              'Ponte per glutei'
            ]
          });
        } else if (hasCardio || hasHiit) {
          workouts.push({
            type: hasHiit ? 'hiit' : 'cardio',
            name: hasHiit ? 'HIIT Cardio' : 'Cardio Steady State',
            description: hasHiit ? 'Allenamento intervallato ad alta intensità per massimizzare il dispendio calorico' : 'Cardio a intensità moderata per bruciare calorie',
            exercises: hasHiit ? 
              ['Burpees', 'Mountain climber', 'Jumping jack', 'Squat jump', 'Plank alternato'] : 
              ['Corsa/camminata', 'Cyclette', 'Ellittica', 'Jumping jack', 'Salto con la corda']
          });
        } else {
          workouts.push({
            type: 'circuit',
            name: 'Circuit Training',
            description: 'Circuito di esercizi da eseguire con poco riposo per massimizzare il dispendio calorico',
            exercises: [
              'Squat',
              'Mountain climber',
              'Affondi alternati',
              'Plank',
              'Step-up'
            ]
          });
        }
      }
    } else if (days <= 5) {
      // 4-5 days: Mix of strength and cardio
      if (hasStrength) {
        workouts.push({
          type: 'upper',
          name: 'Parte Superiore',
          description: 'Allenamento per spalle, petto, schiena e braccia',
          exercises: [
            'Push-up / Piegamenti',
            'Rematore con manubri',
            'Shoulder press',
            'Curl bicipiti',
            'Dip per tricipiti'
          ]
        });
        
        workouts.push({
          type: 'lower',
          name: 'Parte Inferiore',
          description: 'Allenamento per gambe e glutei',
          exercises: [
            'Squat',
            'Affondi',
            'Ponte per glutei',
            'Calf raise',
            'Stacchi rumeni'
          ]
        });
      }
      
      if (hasCardio) {
        workouts.push({
          type: 'cardio',
          name: 'Cardio Steady State',
          description: 'Cardio a intensità moderata per bruciare calorie',
          exercises: ['30-45 minuti di corsa, cyclette, ellittica o camminata veloce']
        });
      }
      
      if (hasHiit) {
        workouts.push({
          type: 'hiit',
          name: 'HIIT Cardio',
          description: 'Allenamento intervallato ad alta intensità per massimizzare il dispendio calorico',
          exercises: [
            'Burpees: 30s lavoro, 30s riposo',
            'Mountain climber: 30s lavoro, 30s riposo',
            'Jumping jack: 30s lavoro, 30s riposo',
            'Squat jump: 30s lavoro, 30s riposo',
            'Plank alternato: 30s lavoro, 30s riposo',
            'Ripeti il circuito 3-4 volte'
          ]
        });
      }
      
      if (hasFlexibility) {
        workouts.push({
          type: 'flexibility',
          name: 'Flessibilità e Recupero',
          description: 'Stretching e yoga per migliorare la flessibilità e favorire il recupero',
          exercises: ['20-30 minuti di stretching o yoga flow']
        });
      }
      
      // Fill remaining days with circuit training
      while (workouts.length < days) {
        workouts.push({
          type: 'circuit',
          name: 'Circuit Training',
          description: 'Circuito di esercizi da eseguire con poco riposo per massimizzare il dispendio calorico',
          exercises: [
            'Jumping jack: 45s',
            'Squat: 45s',
            'Push-up: 45s',
            'Plank: 45s',
            'Affondi: 45s',
            'Mountain climber: 45s',
            '30s riposo tra esercizi, ripeti 3 volte'
          ]
        });
      }
    } else {
      // 6 days: Full split with rest day
      if (hasStrength) {
        workouts.push({
          type: 'push',
          name: 'Push Day',
          description: 'Allenamento per petto, spalle e tricipiti',
          exercises: [
            'Push-up / Piegamenti',
            'Shoulder press',
            'Dip per tricipiti',
            'Alzate laterali',
            'Push-up inclinati'
          ]
        });
        
        workouts.push({
          type: 'pull',
          name: 'Pull Day',
          description: 'Allenamento per schiena e bicipiti',
          exercises: [
            'Rematore con manubri',
            'Pull-up assistiti',
            'Curl bicipiti',
            'Face pull',
            'Stacchi'
          ]
        });
        
        workouts.push({
          type: 'legs',
          name: 'Leg Day',
          description: 'Allenamento per gambe e glutei',
          exercises: [
            'Squat',
            'Affondi',
            'Ponte per glutei',
            'Stacchi rumeni',
            'Calf raise'
          ]
        });
      }
      
      if (hasCardio) {
        workouts.push({
          type: 'cardio',
          name: 'Cardio Steady State',
          description: 'Cardio a intensità moderata per bruciare calorie',
          exercises: ['30-45 minuti di corsa, cyclette, ellittica o camminata veloce']
        });
      }
      
      if (hasHiit) {
        workouts.push({
          type: 'hiit',
          name: 'HIIT Cardio',
          description: 'Allenamento intervallato ad alta intensità per massimizzare il dispendio calorico',
          exercises: [
            'Burpees: 30s lavoro, 30s riposo',
            'Mountain climber: 30s lavoro, 30s riposo',
            'Jumping jack: 30s lavoro, 30s riposo',
            'Squat jump: 30s lavoro, 30s riposo',
            'Plank alternato: 30s lavoro, 30s riposo',
            'Ripeti il circuito 3-4 volte'
          ]
        });
      }
      
      if (hasFlexibility) {
        workouts.push({
          type: 'flexibility',
          name: 'Flessibilità e Recupero',
          description: 'Stretching e yoga per migliorare la flessibilità e favorire il recupero',
          exercises: ['20-30 minuti di stretching o yoga flow']
        });
      }
      
      // Fill remaining days with circuit training
      while (workouts.length < days - 1) {
        workouts.push({
          type: 'circuit',
          name: 'Circuit Training',
          description: 'Circuito di esercizi da eseguire con poco riposo per massimizzare il dispendio calorico',
          exercises: [
            'Jumping jack: 45s',
            'Squat: 45s',
            'Push-up: 45s',
            'Plank: 45s',
            'Affondi: 45s',
            'Mountain climber: 45s',
            '30s riposo tra esercizi, ripeti 3 volte'
          ]
        });
      }
      
      // Add rest day
      workouts.push({
        type: 'rest',
        name: 'Riposo',
        description: 'Giorno di recupero'
      });
    }
    
    return workouts;
  }
  
  function generateMuscleBuildingSplit(days, level) {
    const workouts = [];
    
    if (days <= 3) {
      // 2-3 days: Full body workouts
      for (let i = 0; i < days; i++) {
        workouts.push({
          type: 'full-body',
          name: 'Allenamento Total Body',
          description: 'Allenamento completo per tutto il corpo con focus su grandi gruppi muscolari',
          exercises: [
            'Squat',
            'Panca piana',
            'Stacchi',
            'Shoulder press',
            'Trazioni/Lat machine',
            'Curl bicipiti'
          ]
        });
        
        // Add rest day between full body workouts
        if (i < days - 1) {
          workouts.push({
            type: 'rest',
            name: 'Riposo',
            description: 'Giorno di recupero'
          });
        }
      }
    } else if (days === 4) {
      // 4 days: Upper/Lower split
      workouts.push({
        type: 'upper',
        name: 'Parte Superiore A',
        description: 'Allenamento per petto, spalle, tricipiti e bicipiti',
        exercises: [
          'Panca piana',
          'Shoulder press',
          'Dip per tricipiti',
          'Curl bicipiti',
          'Alzate laterali'
        ]
      });
      
      workouts.push({
        type: 'lower',
        name: 'Parte Inferiore A',
        description: 'Allenamento per quadricipiti, femorali, glutei e polpacci',
        exercises: [
          'Squat',
          'Stacchi rumeni',
          'Affondi',
          'Leg extension',
          'Calf raise'
        ]
      });
      
      workouts.push({
        type: 'upper',
        name: 'Parte Superiore B',
        description: 'Allenamento per schiena, spalle e braccia',
        exercises: [
          'Pull-up/Lat machine',
          'Rematore con bilanciere',
          'Shoulder press',
          'Skull crusher',
          'Face pull'
        ]
      });
      
      workouts.push({
        type: 'lower',
        name: 'Parte Inferiore B',
        description: 'Allenamento per gambe con focus su glutei',
        exercises: [
          'Stacchi',
          'Leg press',
          'Hip thrust',
          'Leg curl',
          'Calf raise'
        ]
      });
    } else if (days === 5) {
      // 5 days: Push/Pull/Legs
      workouts.push({
        type: 'push',
        name: 'Push Day A',
        description: 'Allenamento per petto, spalle e tricipiti',
        exercises: [
          'Panca piana',
          'Shoulder press',
          'Panca inclinata',
          'Dip per tricipiti',
          'Alzate laterali'
        ]
      });
      
      workouts.push({
        type: 'pull',
        name: 'Pull Day A',
        description: 'Allenamento per schiena e bicipiti',
        exercises: [
          'Pull-up/Lat machine',
          'Rematore con bilanciere',
          'Curl bicipiti',
          'Pulldown',
          'Face pull'
        ]
      });
      
      workouts.push({
        type: 'legs',
        name: 'Leg Day',
        description: 'Allenamento per gambe e glutei',
        exercises: [
          'Squat',
          'Stacchi rumeni',
          'Leg press',
          'Leg extension',
          'Calf raise'
        ]
      });
      
      workouts.push({
        type: 'push',
        name: 'Push Day B',
        description: 'Allenamento per petto, spalle e tricipiti',
        exercises: [
          'Panca inclinata',
          'Dip per petto',
          'Arnold press',
          'Skull crusher',
          'Cable fly'
        ]
      });
      
      workouts.push({
        type: 'pull',
        name: 'Pull Day B',
        description: 'Allenamento per schiena e bicipiti',
        exercises: [
          'Stacchi',
          'Rematore con manubri',
          'Hammer curl',
          'Pulldown presa stretta',
          'Pulley'
        ]
      });
    } else {
      // 6 days: Arnold split or PPL twice
      workouts.push({
        type: 'chest-back',
        name: 'Petto e Schiena',
        description: 'Allenamento per petto e schiena',
        exercises: [
          'Panca piana',
          'Pull-up/Lat machine',
          'Panca inclinata',
          'Rematore con bilanciere',
          'Pectoral fly'
        ]
      });
      
      workouts.push({
        type: 'shoulders-arms',
        name: 'Spalle e Braccia',
        description: 'Allenamento per spalle, bicipiti e tricipiti',
        exercises: [
          'Shoulder press',
          'Alzate laterali',
          'Curl bicipiti',
          'Dip per tricipiti',
          'Face pull'
        ]
      });
      
      workouts.push({
        type: 'legs',
        name: 'Gambe',
        description: 'Allenamento per gambe e glutei',
        exercises: [
          'Squat',
          'Stacchi',
          'Leg press',
          'Leg extension',
          'Calf raise'
        ]
      });
      
      workouts.push({
        type: 'chest-back',
        name: 'Petto e Schiena',
        description: 'Allenamento per petto e schiena',
        exercises: [
          'Panca inclinata',
          'Pulley',
          'Dip per petto',
          'Rematore con manubri',
          'Cable fly'
        ]
      });
      
      workouts.push({
        type: 'shoulders-arms',
        name: 'Spalle e Braccia',
        description: 'Allenamento per spalle, bicipiti e tricipiti',
        exercises: [
          'Arnold press',
          'Alzate posteriori',
          'Hammer curl',
          'Skull crusher',
          'Upright row'
        ]
      });
      
      workouts.push({
        type: 'legs',
        name: 'Gambe',
        description: 'Allenamento per gambe e glutei',
        exercises: [
          'Front squat',
          'Stacchi rumeni',
          'Hip thrust',
          'Leg curl',
          'Calf raise'
        ]
      });
    }
    
    return workouts.slice(0, days);
  }
  
  function generateToningSplit(days, types, level) {
    const workouts = [];
    const hasCardio = types.includes('cardio');
    const hasHiit = types.includes('hiit');
    const hasStrength = types.includes('forza');
    const hasFlexibility = types.includes('flessibilita');
    
    if (days <= 3) {
      // 2-3 days: Full body with some cardio
      workouts.push({
        type: 'full-body',
        name: 'Allenamento Total Body',
        description: 'Allenamento completo per tutto il corpo con focus sulla tonificazione',
        exercises: [
          'Squat',
          'Push-up / Piegamenti',
          'Rematore con manubri',
          'Affondi',
          'Plank',
          'Ponte per glutei'
        ]
      });
      
      if (hasCardio || hasHiit) {
        workouts.push({
          type: hasHiit ? 'hiit' : 'cardio',
          name: hasHiit ? 'HIIT Cardio' : 'Cardio Steady State',
          description: hasHiit ? 'Allenamento intervallato per bruciare calorie e tonificare' : 'Cardio moderato per migliorare la definizione',
          exercises: hasHiit ? 
            ['20 minuti di intervalli: 30s intensi, 30s recupero'] : 
            ['30 minuti di cardio a intensità moderata']
        });
      }
      
      if (days === 3) {
        workouts.push({
          type: 'full-body',
          name: 'Allenamento Total Body',
          description: 'Secondo allenamento completo con esercizi diversi',
          exercises: [
            'Stacchi rumeni',
            'Shoulder press',
            'Trazioni/Lat machine',
            'Step-up',
            'Russian twist',
            'Plank laterale'
          ]
        });
      }
    } else if (days <= 5) {
      // 4-5 days: Upper/Lower/Core + Cardio
      workouts.push({
        type: 'upper',
        name: 'Parte Superiore',
        description: 'Allenamento per spalle, petto, schiena e braccia',
        exercises: [
          'Push-up / Piegamenti',
          'Rematore con manubri',
          'Shoulder press',
          'Curl bicipiti',
          'Dip per tricipiti',
          'Plank'
        ]
      });
      
      workouts.push({
        type: 'lower',
        name: 'Parte Inferiore',
        description: 'Allenamento per gambe e glutei',
        exercises: [
          'Squat',
          'Affondi',
          'Ponte per glutei',
          'Calf raise',
          'Stacchi rumeni',
          'Wall sit'
        ]
      });
      
      workouts.push({
        type: 'core',
        name: 'Core e Addominali',
        description: 'Allenamento mirato per addominali e core',
        exercises: [
          'Plank',
          'Crunch',
          'Russian twist',
          'Mountain climber',
          'Leg raise',
          'Side plank'
        ]
      });
      
      if (hasCardio || hasHiit) {
        workouts.push({
          type: hasHiit ? 'hiit' : 'cardio',
          name: hasHiit ? 'HIIT Cardio' : 'Cardio Steady State',
          description: hasHiit ? 'Allenamento intervallato per bruciare calorie e tonificare' : 'Cardio moderato per migliorare la definizione',
          exercises: hasHiit ? 
            ['25 minuti di intervalli: 30s intensi, 30s recupero'] : 
            ['40 minuti di cardio a intensità moderata']
        });
      }
      
      if (hasFlexibility) {
        workouts.push({
          type: 'flexibility',
          name: 'Flessibilità e Yoga',
          description: 'Stretching e yoga per migliorare la flessibilità e la postura',
          exercises: ['30 minuti di stretching e yoga flow']
        });
      }
    } else {
      // 6 days: Push/Pull/Legs + Cardio + Core
      workouts.push({
        type: 'push',
        name: 'Push Day',
        description: 'Allenamento per petto, spalle e tricipiti',
        exercises: [
          'Push-up / Piegamenti',
          'Shoulder press',
          'Dip per tricipiti',
          'Alzate laterali',
          'Push-up inclinati'
        ]
      });
      
      if (hasCardio || hasHiit) {
        workouts.push({
          type: hasHiit ? 'hiit' : 'cardio',
          name: hasHiit ? 'HIIT Cardio' : 'Cardio Steady State',
          description: hasHiit ? 'Allenamento intervallato per bruciare calorie e tonificare' : 'Cardio moderato per migliorare la definizione',
          exercises: hasHiit ? 
            ['20 minuti di intervalli: 30s intensi, 30s recupero'] : 
            ['30 minuti di cardio a intensità moderata']
        });
      }
      
      workouts.push({
        type: 'pull',
        name: 'Pull Day',
        description: 'Allenamento per schiena e bicipiti',
        exercises: [
          'Rematore con manubri',
          'Pull-up assistiti',
          'Curl bicipiti',
          'Face pull',
          'Stacchi'
        ]
      });
      
      workouts.push({
        type: 'core',
        name: 'Core e Addominali',
        description: 'Allenamento mirato per addominali e core',
        exercises: [
          'Plank',
          'Crunch',
          'Russian twist',
          'Mountain climber',
          'Leg raise',
          'Side plank'
        ]
      });
      
      workouts.push({
        type: 'legs',
        name: 'Leg Day',
        description: 'Allenamento per gambe e glutei',
        exercises: [
          'Squat',
          'Affondi',
          'Ponte per glutei',
          'Stacchi rumeni',
          'Calf raise'
        ]
      });
      
      if (hasFlexibility) {
        workouts.push({
          type: 'flexibility',
          name: 'Flessibilità e Yoga',
          description: 'Stretching e yoga per migliorare la flessibilità e la postura',
          exercises: ['30 minuti di stretching e yoga flow']
        });
      } else {
        workouts.push({
          type: 'rest',
          name: 'Riposo',
          description: 'Giorno di recupero'
        });
      }
    }
    
    return workouts.slice(0, days);
  }
  
  function generateEnduranceSplit(days, types, level) {
    const workouts = [];
    const hasCardio = types.includes('cardio');
    const hasHiit = types.includes('hiit');
    const hasStrength = types.includes('forza');
    const hasFlexibility = types.includes('flessibilita');
    
    // For endurance, cardio and HIIT are key
    if (days <= 3) {
      // 2-3 days
      if (hasCardio) {
        workouts.push({
          type: 'cardio',
          name: 'Cardio Lungo',
          description: 'Sessione di cardio a bassa intensità ma lunga durata',
          exercises: ['45-60 minuti di corsa, cyclette o nuoto a intensità moderata']
        });
      }
      
      if (hasHiit) {
        workouts.push({
          type: 'hiit',
          name: 'HIIT Cardio',
          description: 'Allenamento intervallato per migliorare la resistenza e la capacità aerobica',
          exercises: [
            'Riscaldamento: 5 minuti',
            'Intervalli: 30s sprint, 90s recupero × 10',
            'Defaticamento: 5 minuti'
          ]
        });
      }
      
      if (hasStrength) {
        workouts.push({
          type: 'circuit',
          name: 'Circuit Training',
          description: 'Circuito di forza per migliorare la resistenza muscolare',
          exercises: [
            'Squat: 20 reps',
            'Push-up: 15 reps',
            'Rematore: 15 reps',
            'Affondi: 20 reps (10 per gamba)',
            'Plank: 45 secondi',
            'Ripeti il circuito 3-4 volte con poco riposo'
          ]
        });
      }
    } else if (days <= 5) {
      // 4-5 days
      workouts.push({
        type: 'cardio',
        name: 'Cardio Lungo',
        description: 'Sessione di cardio a bassa intensità ma lunga durata',
        exercises: ['60 minuti di corsa, cyclette o nuoto a intensità moderata']
      });
      
      if (hasHiit) {
        workouts.push({
          type: 'hiit',
          name: 'HIIT Cardio',
          description: 'Allenamento intervallato per migliorare la resistenza e la capacità aerobica',
          exercises: [
            'Riscaldamento: 5 minuti',
            'Intervalli: 30s sprint, 90s recupero × 12',
            'Defaticamento: 5 minuti'
          ]
        });
      }
      
      if (hasStrength) {
        workouts.push({
          type: 'upper',
          name: 'Resistenza Parte Superiore',
          description: 'Allenamento per migliorare la resistenza muscolare della parte superiore',
          exercises: [
            'Push-up: 3 × 15-20',
            'Rematore: 3 × 15-20',
            'Shoulder press: 3 × 15-20',
            'Dip: 3 × 15-20',
            'Plank: 3 × 60s'
          ]
        });
        
        workouts.push({
          type: 'lower',
          name: 'Resistenza Parte Inferiore',
          description: 'Allenamento per migliorare la resistenza muscolare della parte inferiore',
          exercises: [
            'Squat: 3 × 20',
            'Affondi: 3 × 20 (10 per gamba)',
            'Step-up: 3 × 20 (10 per gamba)',
            'Ponte per glutei: 3 × 20',
            'Wall sit: 3 × 60s'
          ]
        });
      }
      
      workouts.push({
        type: 'tempo',
        name: 'Allenamento Tempo',
        description: 'Allenamento cardio con variazioni di ritmo per migliorare la soglia anaerobica',
        exercises: [
          'Riscaldamento: 10 minuti',
          '5 × (5 minuti a ritmo sostenuto, 2 minuti di recupero)',
          'Defaticamento: 10 minuti'
        ]
      });
    } else {
      // 6 days
      workouts.push({
        type: 'cardio',
        name: 'Cardio Lungo',
        description: 'Sessione di cardio a bassa intensità ma lunga durata',
        exercises: ['75 minuti di corsa, cyclette o nuoto a intensità moderata']
      });
      
      if (hasStrength) {
        workouts.push({
          type: 'upper',
          name: 'Resistenza Parte Superiore',
          description: 'Allenamento per migliorare la resistenza muscolare della parte superiore',
          exercises: [
            'Push-up: 3 × 15-20',
            'Rematore: 3 × 15-20',
            'Shoulder press: 3 × 15-20',
            'Dip: 3 × 15-20',
            'Plank: 3 × 60s'
          ]
        });
      }
      
      workouts.push({
        type: 'tempo',
        name: 'Allenamento Tempo',
        description: 'Allenamento cardio con variazioni di ritmo per migliorare la soglia anaerobica',
        exercises: [
          'Riscaldamento: 10 minuti',
          '6 × (5 minuti a ritmo sostenuto, 1 minuto di recupero)',
          'Defaticamento: 10 minuti'
        ]
      });
      
      if (hasStrength) {
        workouts.push({
          type: 'lower',
          name: 'Resistenza Parte Inferiore',
          description: 'Allenamento per migliorare la resistenza muscolare della parte inferiore',
          exercises: [
            'Squat: 3 × 20',
            'Affondi: 3 × 20 (10 per gamba)',
            'Step-up: 3 × 20 (10 per gamba)',
            'Ponte per glutei: 3 × 20',
            'Wall sit: 3 × 60s'
          ]
        });
      }
      
      if (hasHiit) {
        workouts.push({
          type: 'hiit',
          name: 'HIIT Cardio',
          description: 'Allenamento intervallato per migliorare la resistenza e la capacità aerobica',
          exercises: [
            'Riscaldamento: 5 minuti',
            'Intervalli: 30s sprint, 60s recupero × 15',
            'Defaticamento: 5 minuti'
          ]
        });
      }
      
      workouts.push({
        type: 'cardio',
        name: 'Cardio Recupero',
        description: 'Sessione di cardio leggera per facilitare il recupero',
        exercises: ['30 minuti di camminata veloce o nuoto a bassa intensità']
      });
    }
    
    // Add flexibility if selected
    if (hasFlexibility) {
      const flexIndex = Math.min(days - 1, 2); // Add flexibility on day 3 or earlier
      workouts.splice(flexIndex, 0, {
        type: 'flexibility',
        name: 'Flessibilità e Mobilità',
        description: 'Stretching e mobilità per prevenire infortuni e migliorare la performance',
        exercises: ['30 minuti di stretching dinamico e statico']
      });
    }
    
    return workouts.slice(0, days);
  }
  
  function generateNotes(goal, level) {
    // Clear previous notes
    planNotesList.innerHTML = '';
    
    // General notes
    const generalNotes = [
      'Esegui sempre un riscaldamento di 5-10 minuti prima di ogni allenamento.',
      'Ascolta il tuo corpo e non esagerare con i carichi, soprattutto all\'inizio.',
      'Mantieni una corretta idratazione prima, durante e dopo l\'allenamento.',
      'Assicurati di assumere proteine di qualità dopo l\'allenamento per favorire il recupero muscolare.'
    ];
    
    // Goal-specific notes
    let goalNotes = [];
    
    if (goal === 'perdita-peso') {
      goalNotes = [
        'Per massimizzare la perdita di grasso, cerca di mantenere un deficit calorico di 300-500 calorie al giorno.',
        'Combina l\'allenamento di forza con il cardio per ottimizzare il dispendio calorico.',
        'Monitora le porzioni e privilegia alimenti ricchi di proteine e fibre per sentirti sazio più a lungo.',
        'Ricorda che il sonno di qualità è fondamentale per il controllo dell\'appetito e del peso.'
      ];
    } else if (goal === 'tonificazione') {
      goalNotes = [
        'Per la tonificazione, concentrati su serie con ripetizioni moderate (12-15) e riposo limitato tra le serie.',
        'Mantieni un apporto proteico adeguato per favorire il recupero e la definizione muscolare.',
        'Combina allenamenti di forza con sessioni cardio per migliorare la definizione generale.',
        'Per risultati visibili, è importante avere una percentuale di grasso corporeo sufficientemente bassa.'
      ];
    } else if (goal === 'massa') {
      goalNotes = [
        'Per l\'ipertrofia muscolare, concentrati su serie da 8-12 ripetizioni con carichi impegnativi.',
        'Assicurati di essere in un leggero surplus calorico (200-300 calorie in più al giorno).',
        'Punta a consumare 1.6-2g di proteine per kg di peso corporeo al giorno.',
        'Assicurati un recupero adeguato tra gli allenamenti dello stesso gruppo muscolare (48-72 ore).'
      ];
    } else if (goal === 'resistenza') {
      goalNotes = [
        'Per migliorare la resistenza cardiovascolare, aumenta gradualmente la durata delle sessioni cardio.',
        'Includi allenamenti di forza per migliorare la resistenza muscolare e prevenire infortuni.',
        'Varia l\'intensità delle sessioni cardio per stimolare diversi sistemi energetici.',
        'Un\'adeguata alimentazione con carboidrati complessi è essenziale per sostenere l\'energia durante l\'attività prolungata.'
      ];
    } else if (goal === 'forza') {
      goalNotes = [
        'Per aumentare la forza, concentrati su serie con poche ripetizioni (4-6) e carichi elevati.',
        'Dai priorità ai grandi esercizi multi-articolari come squat, stacchi e panca.',
        'Assicurati periodi di riposo adeguati tra le serie (2-3 minuti) per recuperare completamente.',
        'La progressione nei carichi è fondamentale: cerca di aumentare gradualmente il peso sollevato.'
      ];
    }
    
    // Level-specific notes
    let levelNotes = [];
    
    if (level === 'principiante') {
      levelNotes = [
        'Come principiante, concentrati sulla corretta esecuzione degli esercizi prima di aumentare i carichi.',
        'Non allenarti fino al cedimento muscolare, ma fermati 1-2 ripetizioni prima.',
        'Un periodo di recupero di 48 ore tra gli allenamenti è importante per permettere ai muscoli di adattarsi.',
        'Inizia con 2-3 allenamenti a settimana e aumenta gradualmente la frequenza con il tempo.'
      ];
    } else if (level === 'intermedio') {
      levelNotes = [
        'A questo livello, puoi iniziare a sperimentare con tecniche più avanzate come superserie o drop set.',
        'Considera di implementare periodizzazione nell\'allenamento per continuare a progredire.',
        'Monitora i tuoi progressi tenendo un diario di allenamento.',
        'Alterna fasi di intensità più alta con periodi di recupero più leggeri per prevenire il sovrallenamento.'
      ];
    } else if (level === 'avanzato') {
      levelNotes = [
        'Implementa tecniche avanzate come serie rest-pause, superserie antagoniste o allenamento a cedimento.',
        'Considera una periodizzazione più strutturata con fasi di volume, forza e recupero.',
        'Presta attenzione ai segnali di sovrallenamento e adatta il programma di conseguenza.',
        'Considera l\'inclusione di settimane di scarico ogni 4-6 settimane per favorire il recupero completo.'
      ];
    }
    
    // Combine and add notes to the list
    const allNotes = [...generalNotes, ...goalNotes, ...levelNotes];
    
    // Randomly select 6-8 notes
    const selectedNotes = shuffleArray(allNotes).slice(0, Math.min(8, allNotes.length));
    
    selectedNotes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note;
      planNotesList.appendChild(li);
    });
  }
  
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  // Exercise library
  function loadExerciseLibrary() {
    // Sample exercise data
    const exercises = [
      {
        name: 'Squat',
        muscle: 'gambe',
        equipment: 'nessuna',
        level: 'principiante',
        image: 'https://www.projectinvictus.it/wp-content/uploads/2022/05/ALESSIA4-scaled.jpg',
        description: 'Lo squat è un esercizio composto che coinvolge principalmente quadricipiti, glutei e muscoli posteriori della coscia.',
        execution: 'Stai in piedi con i piedi alla larghezza delle spalle. Abbassa il corpo piegando le ginocchia e spingendo i fianchi indietro, come se ti stessi sedendo su una sedia. Mantieni il petto alto e la schiena dritta. Scendi fino a quando le cosce sono parallele al pavimento, poi risali alla posizione iniziale.',
        tips: [
          'Mantieni i talloni a terra per tutto l\'esercizio',
          'Le ginocchia dovrebbero seguire la direzione delle punte dei piedi',
          'Contrai i glutei quando torni alla posizione iniziale'
        ]
      },
      {
        name: 'Push-up / Piegamenti',
        muscle: 'petto',
        equipment: 'nessuna',
        level: 'principiante',
        image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-982408932-643e4f5fc2e0d.jpg',
        description: 'I piegamenti sono un esercizio a corpo libero che coinvolge principalmente petto, tricipiti e spalle.',
        execution: 'Parti in posizione prona con le mani leggermente più larghe delle spalle e i piedi uniti. Mantieni il corpo in linea retta dalla testa ai talloni. Abbassa il corpo piegando i gomiti fino a quando il petto è vicino al pavimento, poi spingi per tornare alla posizione iniziale.',
        tips: [
          'Mantieni il corpo rigido come una tavola durante tutto il movimento',
          'Non lasciare che i fianchi si abbassino o si alzino',
          'Per una variante più facile, appoggia le ginocchia a terra'
        ]
      },
      {
        name: 'Rematore con manubri',
        muscle: 'schiena',
        equipment: 'manubri',
        level: 'principiante',
        image: 'https://www.projectinvictus.it/wp-content/uploads/2017/11/Manubri-2.0-12.png',
        description: 'Il rematore con manubri è un esercizio che mira a sviluppare i muscoli della schiena, in particolare il dorsale e il romboide.',
        execution: 'Posizionati con un ginocchio e una mano su una panca, con la schiena parallela al pavimento. Con l\'altra mano, tieni un manubrio con il braccio disteso. Tira il manubrio verso l\'anca, mantenendo il gomito vicino al corpo. Abbassa lentamente e ripeti.',
        tips: [
          'Mantieni la schiena piatta e parallela al suolo',
          'Concentrati sulla contrazione dei muscoli della schiena',
          'Evita di ruotare il tronco durante il movimento'
        ]
      },
      {
        name: 'Stacchi',
        muscle: 'gambe',
        equipment: 'bilanciere',
        level: 'intermedio',
        image: 'https://www.projectinvictus.it/wp-content/uploads/2021/04/Immagini-di-copertina-1.png',
        description: 'Lo stacco è un esercizio composto che coinvolge quasi tutti i muscoli del corpo, con focus su glutei, femorali e parte bassa della schiena.',
        execution: 'Posizionati con i piedi alla larghezza delle spalle, con il bilanciere sopra la metà dei piedi. Piega le ginocchia e abbassa i fianchi, afferrando il bilanciere con le mani all\'esterno delle gambe. Solleva il bilanciere estendendo ginocchia e anche, mantenendo la schiena dritta. Torna alla posizione iniziale abbassando il bilanciere controllando il movimento.',
        tips: [
          'Mantieni la schiena dritta durante tutto il movimento',
          'Spingi attraverso i talloni',
          'Contrai i glutei al top del movimento'
        ]
      },
      {
        name: 'Plank',
        muscle: 'core',
        equipment: 'nessuna',
        level: 'principiante',
        image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-590575189-640aed1489db4.jpg',
        description: 'Il plank è un esercizio isometrico che rafforza il core, le spalle e la schiena.',
        execution: 'Posizionati a faccia in giù con gli avambracci a terra, i gomiti sotto le spalle e i piedi uniti. Solleva il corpo, mantenendolo in linea retta dalla testa ai talloni. Mantieni la posizione contratta per il tempo desiderato.',
        tips: [
          'Non lasciare che i fianchi si abbassino o si alzino',
          'Guarda leggermente in avanti per mantenere il collo in linea con la schiena',
          'Respira normalmente durante l\'esercizio'
        ]
      },
      {
        name: 'Shoulder Press',
        muscle: 'spalle',
        equipment: 'manubri',
        level: 'principiante',
        image: 'https://www.projectinvictus.it/wp-content/uploads/2023/09/Shoulder-press-esecuzione-1280x720.jpg',
        description: 'Il shoulder press è un esercizio che mira a sviluppare i muscoli delle spalle, in particolare il deltoide.',
        execution: 'Siediti su una panca con schienale verticale o stai in piedi. Tieni un manubrio in ciascuna mano all\'altezza delle spalle, con i palmi rivolti in avanti. Spingi i manubri verso l\'alto fino a estendere completamente le braccia, quindi abbassali lentamente alla posizione iniziale.',
        tips: [
          'Non inarcare la schiena durante il movimento',
          'Evita di spingere con le gambe',
          'Mantieni i polsi dritti'
        ]
      }
    ];
    
    // Generate library
    exerciseLibrary.innerHTML = '';
    
    exercises.forEach(exercise => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.dataset.muscle = exercise.muscle;
      card.dataset.equipment = exercise.equipment;
      card.dataset.level = exercise.level;
      
      card.innerHTML = `
        <img src="${exercise.image}" alt="${exercise.name}" class="exercise-img">
        <div class="exercise-details">
          <h3>${exercise.name}</h3>
          <div class="exercise-meta">
            <span>${capitalizeFirstLetter(exercise.muscle)}</span>
            <span>${capitalizeFirstLetter(exercise.level)}</span>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        showExerciseModal(exercise);
      });
      
      exerciseLibrary.appendChild(card);
    });
  }
  
  function filterExercises() {
    const muscleFilter = filterMuscle.value;
    const equipmentFilter = filterEquipment.value;
    const levelFilter = filterLevel.value;
    
    const cards = exerciseLibrary.querySelectorAll('.exercise-card');
    
    cards.forEach(card => {
      const matchesMuscle = muscleFilter === 'all' || card.dataset.muscle === muscleFilter;
      const matchesEquipment = equipmentFilter === 'all' || card.dataset.equipment === equipmentFilter;
      const matchesLevel = levelFilter === 'all' || card.dataset.level === levelFilter;
      
      if (matchesMuscle && matchesEquipment && matchesLevel) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  function showExerciseModal(exercise) {
    document.getElementById('modal-exercise-name').textContent = exercise.name;
    document.getElementById('modal-exercise-img').src = exercise.image;
    document.getElementById('modal-exercise-img').alt = exercise.name;
    document.getElementById('modal-muscle-group').textContent = capitalizeFirstLetter(exercise.muscle);
    document.getElementById('modal-equipment').textContent = capitalizeFirstLetter(exercise.equipment);
    document.getElementById('modal-level').textContent = capitalizeFirstLetter(exercise.level);
    document.getElementById('modal-description').textContent = exercise.execution;
    
    const tipsList = document.getElementById('modal-tips');
    tipsList.innerHTML = '';
    exercise.tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
    
    exerciseModal.style.display = 'block';
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Load exercise library on page load
  loadExerciseLibrary();
});