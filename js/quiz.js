document.addEventListener('DOMContentLoaded', () => {
  // Quiz elements
  const quizIntro = document.getElementById('quiz-intro');
  const quizContent = document.getElementById('quiz-content');
  const quizResults = document.getElementById('quiz-results');
  const startQuizButtons = document.querySelectorAll('.start-quiz-btn');
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const quizTitle = document.getElementById('quiz-title');
  const currentQuestionEl = document.getElementById('current-question');
  const totalQuestionsEl = document.getElementById('total-questions');
  const progressFill = document.getElementById('progress-fill');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  
  // Result elements
  const scorePercentage = document.getElementById('score-percentage');
  const correctAnswers = document.getElementById('correct-answers');
  const totalAnswers = document.getElementById('total-answers');
  const resultsFeedback = document.getElementById('results-feedback');
  const summaryContainer = document.getElementById('summary-container');
  const retryBtn = document.getElementById('retry-btn');
  const newQuizBtn = document.getElementById('new-quiz-btn');
  
  // Stats elements
  const completedQuizzesEl = document.getElementById('completed-quizzes');
  const averageScoreEl = document.getElementById('average-score');
  const bestScoreEl = document.getElementById('best-score');
  
  // Quiz data
  let currentCategory = '';
  let questions = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let quizStartTime = 0;
  
  // Quiz questions
  const quizQuestions = {
    'nutrizione': [
      {
        question: 'Quale dei seguenti macronutrienti fornisce più calorie per grammo?',
        options: ['Carboidrati', 'Proteine', 'Grassi', 'Fibre'],
        answer: 2
      },
      {
        question: 'Quanti grammi di proteine sono consigliati per kg di peso corporeo per una persona attiva che vuole aumentare la massa muscolare?',
        options: ['0.8g/kg', '1.2-1.6g/kg', '1.6-2.2g/kg', '3.0g/kg o più'],
        answer: 2
      },
      {
        question: 'Quale delle seguenti non è una proteina completa (contenente tutti gli aminoacidi essenziali)?',
        options: ['Uova', 'Tofu', 'Riso', 'Pesce'],
        answer: 2
      },
      {
        question: 'Quale vitamina è comunemente conosciuta come "vitamina del sole"?',
        options: ['Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina E'],
        answer: 2
      },
      {
        question: 'Quale dei seguenti alimenti contiene grassi omega-3?',
        options: ['Pollo', 'Salmone', 'Patate dolci', 'Riso bianco'],
        answer: 1
      },
      {
        question: 'Qual è lo scopo principale della dieta chetogenica?',
        options: ['Aumentare il consumo di carboidrati', 'Indurre uno stato di chetosi', 'Eliminare le proteine', 'Aumentare il livello di zucchero nel sangue'],
        answer: 1
      },
      {
        question: 'Cosa sono i BCAA?',
        options: ['Acidi grassi essenziali', 'Aminoacidi a catena ramificata', 'Vitamine del gruppo B', 'Minerali alcalini'],
        answer: 1
      },
      {
        question: 'Quale dei seguenti è un carboidrato complesso?',
        options: ['Zucchero da tavola', 'Miele', 'Farina d\'avena', 'Sciroppo d\'acero'],
        answer: 2
      },
      {
        question: 'Qual è la funzione principale delle proteine nel corpo?',
        options: ['Fornire energia immediata', 'Costruzione e riparazione dei tessuti', 'Immagazzinare energia a lungo termine', 'Assorbire vitamine liposolubili'],
        answer: 1
      },
      {
        question: 'Quale minerale è più importante per la salute delle ossa?',
        options: ['Ferro', 'Calcio', 'Sodio', 'Potassio'],
        answer: 1
      }
    ],
    'allenamento': [
      {
        question: 'Qual è lo scopo principale del periodo di riscaldamento prima dell\'allenamento?',
        options: ['Bruciare grassi', 'Aumentare la temperatura muscolare e preparare il corpo', 'Costruire massa muscolare', 'Migliorare la resistenza cardiovascolare'],
        answer: 1
      },
      {
        question: 'Cosa significa "HIIT"?',
        options: ['High Intensity Interval Training', 'Heavy Impact Isolation Training', 'Highly Intensive Isometric Training', 'Health Improvement Intensity Training'],
        answer: 0
      },
      {
        question: 'Quale principio di allenamento si riferisce all\'aumentare gradualmente l\'intensità nel tempo?',
        options: ['Specificità', 'Progressione', 'Variazione', 'Recupero'],
        answer: 1
      },
      {
        question: 'Quale tipo di esercizio è migliore per migliorare la flessibilità?',
        options: ['Esercizi isometrici', 'Esercizi pliometrici', 'Stretching statico e dinamico', 'Sollevamento pesi pesanti'],
        answer: 2
      },
      {
        question: 'Cosa significa "RM" nell\'allenamento con i pesi?',
        options: ['Range di Movimento', 'Ripetizione Massima', 'Resistenza Muscolare', 'Recupero Metabolico'],
        answer: 1
      },
      {
        question: 'Quale dei seguenti è un esercizio composto?',
        options: ['Curl bicipiti', 'Estensione tricipiti', 'Alzate laterali', 'Squat'],
        answer: 3
      },
      {
        question: 'Cosa si intende per "supercompensazione" nell\'allenamento?',
        options: ['Allenarsi oltre il punto di cedimento', 'Il processo di adattamento che porta a un miglioramento della condizione fisica dopo il recupero', 'Fare più esercizi per lo stesso gruppo muscolare', 'Aumentare eccessivamente i carichi'],
        answer: 1
      },
      {
        question: 'Quale forma di cardio brucia tipicamente più calorie per unità di tempo?',
        options: ['Camminata', 'Jogging leggero', 'Nuoto', 'Salto con la corda'],
        answer: 3
      },
      {
        question: 'Qual è lo scopo principale dell\'allenamento pliometrico?',
        options: ['Aumentare la massa muscolare', 'Migliorare la potenza e l\'esplosività', 'Aumentare la resistenza muscolare', 'Migliorare la flessibilità'],
        answer: 1
      },
      {
        question: 'Quale principio dell\'allenamento suggerisce che i benefici sono specifici al tipo di esercizio svolto?',
        options: ['Principio della specificità', 'Principio dell\'individualità', 'Principio della progressione', 'Principio del sovraccarico'],
        answer: 0
      }
    ],
    'misto': [
      {
        question: 'Quale macronutriente è la principale fonte di energia durante l\'esercizio ad alta intensità?',
        options: ['Grassi', 'Proteine', 'Carboidrati', 'Vitamine'],
        answer: 2
      },
      {
        question: 'Qual è il muscolo più grande del corpo umano?',
        options: ['Bicipite', 'Quadricipite', 'Gluteo massimo', 'Gran dorsale'],
        answer: 2
      },
      {
        question: 'Quale nutriente aiuta principalmente nella riparazione dei tessuti muscolari dopo l\'allenamento?',
        options: ['Carboidrati', 'Grassi', 'Acqua', 'Proteine'],
        answer: 3
      },
      {
        question: 'Cosa significa essere in un "deficit calorico"?',
        options: ['Consumare più calorie di quelle bruciate', 'Consumare meno calorie di quelle bruciate', 'Mangiare solo una volta al giorno', 'Non mangiare carboidrati'],
        answer: 1
      },
      {
        question: 'Qual è la frequenza cardiaca massima approssimativa per una persona di 30 anni?',
        options: ['170 bpm', '180 bpm', '190 bpm', '200 bpm'],
        answer: 2 // 220 - 30 = 190
      },
      {
        question: 'Quale delle seguenti non è una componente della forma fisica?',
        options: ['Forza muscolare', 'Composizione corporea', 'Flessibilità', 'Indice di massa ossea'],
        answer: 3
      },
      {
        question: 'Quale tipo di stretching è generalmente sconsigliato prima dell\'attività fisica?',
        options: ['Stretching dinamico', 'Stretching statico', 'Stretching attivo', 'Stretching balistico'],
        answer: 1
      },
      {
        question: 'Cosa significa "BMR" in termini di nutrizione?',
        options: ['Body Mass Ratio', 'Basic Metabolic Rate', 'Basal Metabolic Rate', 'Body Metabolism Regulation'],
        answer: 2
      },
      {
        question: 'Quale principio di allenamento si riferisce al corpo che si adatta agli stimoli?',
        options: ['Principio di adattamento', 'Principio di specificità', 'Principio di individualità', 'Principio di varietà'],
        answer: 0
      },
      {
        question: 'Quale nutriente è importante assumere immediatamente dopo un allenamento intenso?',
        options: ['Solo proteine', 'Solo carboidrati', 'Una combinazione di proteine e carboidrati', 'Solo grassi'],
        answer: 2
      }
    ]
  };
  
  // Stats data
  let stats = {
    completedQuizzes: 0,
    scores: [],
    bestScore: 0
  };
  
  // Load stats from localStorage
  function loadStats() {
    const savedStats = localStorage.getItem('fitnessQuizStats');
    if (savedStats) {
      stats = JSON.parse(savedStats);
      updateStatsDisplay();
    }
  }
  
  // Save stats to localStorage
  function saveStats() {
    localStorage.setItem('fitnessQuizStats', JSON.stringify(stats));
    updateStatsDisplay();
  }
  
  // Update stats display
  function updateStatsDisplay() {
    completedQuizzesEl.textContent = stats.completedQuizzes;
    
    if (stats.scores.length > 0) {
      const sum = stats.scores.reduce((a, b) => a + b, 0);
      const average = Math.round(sum / stats.scores.length);
      averageScoreEl.textContent = `${average}%`;
      bestScoreEl.textContent = `${stats.bestScore}%`;
    } else {
      averageScoreEl.textContent = '0%';
      bestScoreEl.textContent = '0%';
    }
  }
  
  // Start quiz
  function startQuiz(category) {
    currentCategory = category;
    quizStartTime = Date.now();
    
    // Set quiz title
    if (category === 'nutrizione') {
      quizTitle.textContent = 'Quiz sulla Nutrizione';
    } else if (category === 'allenamento') {
      quizTitle.textContent = 'Quiz sull\'Allenamento';
    } else {
      quizTitle.textContent = 'Quiz Completo';
    }
    
    // Get questions
    questions = [...quizQuestions[category]];
    
    // Shuffle questions
    questions = shuffleArray(questions);
    
    // Take the first 10 questions if there are more
    if (questions.length > 10) {
      questions = questions.slice(0, 10);
    }
    
    // Initialize user answers
    userAnswers = Array(questions.length).fill(-1);
    
    // Update total questions display
    totalQuestionsEl.textContent = questions.length;
    
    // Show first question
    currentQuestionIndex = 0;
    showQuestion(currentQuestionIndex);
    
    // Show quiz content
    quizIntro.classList.add('hidden');
    quizContent.classList.remove('hidden');
    quizResults.classList.add('hidden');
  }
  
  // Show question
  function showQuestion(index) {
    const question = questions[index];
    
    // Update question text
    questionContainer.querySelector('h3').textContent = question.question;
    
    // Clear options
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, i) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option';
      if (userAnswers[index] === i) {
        optionEl.classList.add('selected');
      }
      
      optionEl.innerHTML = `
        <div class="option-label">
          <span class="option-marker">${String.fromCharCode(65 + i)}</span>
          <span class="option-text">${option}</span>
        </div>
      `;
      
      optionEl.addEventListener('click', () => {
        // Select option
          document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  optionEl.classList.add('selected');
  userAnswers[index] = i;

  // Enable next or submit button
  nextBtn.disabled = false;
        
        // If this is the last question, show submit button
          if (index === questions.length - 1) {
    // Se siamo sull'ultima domanda, abilita il bottone di submit
    submitBtn.disabled = false;
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  }
      });
      
      optionsContainer.appendChild(optionEl);
    });
    
    // Update current question display
    currentQuestionEl.textContent = index + 1;
    
    // Update progress bar
    const progress = ((index + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = userAnswers[index] === -1;
    
    // Show/hide submit button
    if (index === questions.length - 1) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
      submitBtn.disabled = userAnswers[index] === -1;
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }
  }
  
  // Show results
  function showResults() {
    // Calculate score
    let correctCount = 0;
    questions.forEach((question, i) => {
      if (userAnswers[i] === question.answer) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    // Update stats
    stats.completedQuizzes++;
    stats.scores.push(percentage);
    if (percentage > stats.bestScore) {
      stats.bestScore = percentage;
    }
    saveStats();
    
    // Update results display
    scorePercentage.textContent = `${percentage}%`;
    correctAnswers.textContent = correctCount;
    totalAnswers.textContent = questions.length;
    
    // Generate feedback
    let feedback = '';
    if (percentage >= 90) {
      feedback = 'Eccellente! Hai una conoscenza approfondita di questo argomento.';
    } else if (percentage >= 70) {
      feedback = 'Ottimo lavoro! Hai una buona comprensione dei concetti chiave.';
    } else if (percentage >= 50) {
      feedback = 'Buono sforzo! C\'è spazio per migliorare la tua conoscenza in alcune aree.';
    } else {
      feedback = 'Continua a imparare! Questo quiz può aiutarti a identificare le aree in cui puoi migliorare.';
    }
    
    resultsFeedback.textContent = feedback;
    
    // Generate summary
    summaryContainer.innerHTML = '';
    questions.forEach((question, i) => {
      const isCorrect = userAnswers[i] === question.answer;
      
      const summaryItem = document.createElement('div');
      summaryItem.className = 'summary-question';
      
      summaryItem.innerHTML = `
        <h4>Domanda ${i + 1}: ${question.question}</h4>
        <div class="summary-options">
          ${question.options.map((option, j) => {
            let className = '';
            if (j === question.answer) {
              className = 'correct';
            } else if (userAnswers[i] === j && userAnswers[i] !== question.answer) {
              className = 'incorrect';
            }
            
            let userSelectedClass = userAnswers[i] === j ? 'user-selected' : '';
            
            return `
              <div class="summary-option ${className} ${userSelectedClass}">
                <span>${String.fromCharCode(65 + j)}</span> ${option}
                ${j === question.answer ? ' ✓' : ''}
                ${userAnswers[i] === j && userAnswers[i] !== question.answer ? ' ✗' : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
      
      summaryContainer.appendChild(summaryItem);
    });
    
    // Calculate quiz duration
    const quizEndTime = Date.now();
    const quizDuration = Math.round((quizEndTime - quizStartTime) / 1000); // in seconds
    const minutes = Math.floor(quizDuration / 60);
    const seconds = quizDuration % 60;
    
    const durationText = document.createElement('p');
    durationText.textContent = `Tempo impiegato: ${minutes} minuti e ${seconds} secondi`;
    resultsFeedback.appendChild(durationText);
    
    // Show results
    quizContent.classList.add('hidden');
    quizResults.classList.remove('hidden');
  }
  
  // Event listeners
  startQuizButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      startQuiz(category);
    });
  });
  
  prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  });
  
  submitBtn.addEventListener('click', () => {
    // Check if all questions are answered
    const unanswered = userAnswers.indexOf(-1);
    
    if (unanswered !== -1) {
      if (confirm(`Hai ${userAnswers.filter(a => a === -1).length} domande senza risposta. Vuoi comunque completare il quiz?`)) {
        showResults();
      } else {
        // Go to first unanswered question
        currentQuestionIndex = unanswered;
        showQuestion(currentQuestionIndex);
      }
    } else {
      showResults();
    }
  });
  
  retryBtn.addEventListener('click', () => {
    startQuiz(currentCategory);
  });
  
  newQuizBtn.addEventListener('click', () => {
    quizResults.classList.add('hidden');
    quizIntro.classList.remove('hidden');
  });
  
  // Helper function to shuffle array
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  // Load stats on page load
  loadStats();
});