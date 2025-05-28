document.addEventListener('DOMContentLoaded', () => {
  // Filter elements
  const filterCategory = document.getElementById('filter-category');
  const filterDiet = document.getElementById('filter-diet');
  const filterTime = document.getElementById('filter-time');
  const searchInput = document.getElementById('recipe-search');
  const searchBtn = document.getElementById('search-btn');
  const recipesContainer = document.getElementById('recipes-container');
  
  // Modal elements
  const recipeModal = document.getElementById('recipe-modal');
  const modalClose = document.querySelector('.close-modal');
  
  // Recipe data
  const recipes = [
    {
      id: 1,
      title: 'Bowl di quinoa con verdure e pollo',
      category: 'pranzo',
      description: 'Un piatto completo ricco di proteine, carboidrati complessi e verdure colorate.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '25 min',
      difficulty: 'Facile',
      servings: 2,
      tags: ['highprotein', 'glutenfree'],
      nutrition: {
        calories: '420 kcal',
        protein: '28g',
        carbs: '45g',
        fat: '15g',
        fiber: '6g'
      },
      ingredients: [
        '100g di quinoa',
        '200g di petto di pollo',
        '1 zucchina',
        '1 peperone rosso',
        '1 carota',
        '1 cucchiaio di olio d\'oliva',
        'Succo di mezzo limone',
        'Sale e pepe q.b.',
        'Erbe aromatiche a piacere'
      ],
      instructions: [
        'Sciacqua la quinoa sotto acqua corrente e cuocila in acqua bollente salata per circa 15 minuti, fino a quando i chicchi sono morbidi.',
        'Nel frattempo, taglia il petto di pollo a cubetti e cuocilo in una padella antiaderente con un po\' di olio, sale e pepe.',
        'Lava e taglia a cubetti le verdure. Cuocile in un\'altra padella con un filo d\'olio per 5-7 minuti, mantenendole croccanti.',
        'Componi la bowl: metti la quinoa alla base, aggiungi il pollo e le verdure.',
        'Condisci con un filo d\'olio, succo di limone e le erbe aromatiche.'
      ],
      tips: 'Puoi preparare questo piatto in anticipo e conservarlo in frigorifero per il giorno successivo. Per una versione vegana, sostituisci il pollo con tofu o ceci.'
    },
    {
      id: 2,
      title: 'Smoothie proteico con frutti di bosco',
      category: 'colazione',
      description: 'Una colazione veloce e nutriente, perfetta dopo l\'allenamento o per iniziare la giornata con energia.',
      image: 'https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '5 min',
      difficulty: 'Molto facile',
      servings: 1,
      tags: ['vegetarian', 'quick'],
      nutrition: {
        calories: '280 kcal',
        protein: '22g',
        carbs: '35g',
        fat: '5g',
        fiber: '8g'
      },
      ingredients: [
        '200ml di latte scremato o bevanda vegetale',
        '1 scoop di proteine in polvere (circa 25g)',
        '100g di frutti di bosco misti (freschi o surgelati)',
        '1/2 banana',
        '1 cucchiaio di semi di chia',
        'Ghiaccio (opzionale)'
      ],
      instructions: [
        'Inserisci tutti gli ingredienti nel frullatore.',
        'Frulla fino a ottenere una consistenza omogenea.',
        'Se lo smoothie è troppo denso, aggiungi un po\' d\'acqua o latte.'
      ],
      tips: 'Per aumentare l\'apporto calorico, puoi aggiungere un cucchiaino di burro di arachidi o un quarto di avocado. Se usi frutti di bosco surgelati, non sarà necessario aggiungere ghiaccio.'
    },
    {
      id: 3,
      title: 'Insalata di farro con tonno e verdure',
      category: 'pranzo',
      description: 'Un\'insalata fredda perfetta per il pranzo, ricca di carboidrati complessi e proteine.',
      image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '20 min',
      difficulty: 'Facile',
      servings: 2,
      tags: ['highprotein'],
      nutrition: {
        calories: '380 kcal',
        protein: '25g',
        carbs: '48g',
        fat: '12g',
        fiber: '7g'
      },
      ingredients: [
        '150g di farro',
        '160g di tonno al naturale (sgocciolato)',
        '1 pomodoro grande',
        '1/2 cetriolo',
        '1/2 peperone giallo',
        '10 olive nere denocciolate',
        '1 cucchiaio di olio extravergine d\'oliva',
        'Succo di mezzo limone',
        'Sale e pepe q.b.',
        'Basilico fresco'
      ],
      instructions: [
        'Cuoci il farro in abbondante acqua salata seguendo le istruzioni sulla confezione (generalmente 20-25 minuti).',
        'Scola il farro e lascialo raffreddare.',
        'Nel frattempo, lava e taglia a cubetti il pomodoro, il cetriolo e il peperone.',
        'In una ciotola grande, unisci il farro raffreddato, le verdure tagliate, il tonno sgocciolato e le olive.',
        'Condisci con olio, succo di limone, sale e pepe. Mescola bene.',
        'Guarnisci con foglie di basilico fresco prima di servire.'
      ],
      tips: 'Puoi preparare questa insalata il giorno prima e conservarla in frigorifero. Il farro può essere sostituito con orzo o quinoa per variare.'
    },
    {
      id: 4,
      title: 'Frittata al forno con spinaci e feta',
      category: 'cena',
      description: 'Una frittata leggera e proteica, ottima per la cena o il brunch.',
      image: 'https://images.pexels.com/photos/6529924/pexels-photo-6529924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '30 min',
      difficulty: 'Media',
      servings: 4,
      tags: ['vegetarian', 'lowcarb', 'highprotein'],
      nutrition: {
        calories: '220 kcal',
        protein: '18g',
        carbs: '4g',
        fat: '16g',
        fiber: '2g'
      },
      ingredients: [
        '8 uova',
        '200g di spinaci freschi',
        '100g di formaggio feta sbriciolato',
        '1 cipolla piccola',
        '2 spicchi d\'aglio',
        '2 cucchiai di olio d\'oliva',
        'Sale e pepe q.b.',
        'Un pizzico di noce moscata'
      ],
      instructions: [
        'Preriscalda il forno a 180°C.',
        'In una padella, fai soffriggere la cipolla tritata e l\'aglio in un cucchiaio di olio fino a quando diventano trasparenti.',
        'Aggiungi gli spinaci e cuoci fino a quando appassiscono (circa 3 minuti).',
        'In una ciotola, sbatti le uova con sale, pepe e noce moscata.',
        'Aggiungi gli spinaci cotti e la feta sbriciolata, mescolando delicatamente.',
        'Versa il composto in una teglia da forno leggermente unta.',
        'Cuoci in forno per circa 20 minuti, o fino a quando la frittata è dorata e ben cotta.'
      ],
      tips: 'Questa frittata è ottima anche fredda il giorno dopo. Puoi aggiungere pomodorini secchi o olive per più sapore.'
    },
    {
      id: 5,
      title: 'Pancake proteici alla banana',
      category: 'colazione',
      description: 'Pancake soffici e proteici, perfetti per una colazione energetica pre o post allenamento.',
      image: 'https://blog.giallozafferano.it/luiginalaurenzi/wp-content/uploads/2023/11/IMG_9373-scaled.jpeg',
      time: '15 min',
      difficulty: 'Facile',
      servings: 2,
      tags: ['vegetarian', 'highprotein'],
      nutrition: {
        calories: '320 kcal',
        protein: '24g',
        carbs: '38g',
        fat: '8g',
        fiber: '4g'
      },
      ingredients: [
        '2 banane mature',
        '4 albumi (o 2 uova intere)',
        '50g di fiocchi d\'avena',
        '1 scoop di proteine in polvere (circa 25g)',
        '1/4 cucchiaino di lievito in polvere',
        'Un pizzico di cannella',
        'Olio di cocco per la cottura'
      ],
      instructions: [
        'Schiaccia le banane in una ciotola fino a ottenere una purea.',
        'Aggiungi gli albumi (o le uova) e mescola bene.',
        'Incorpora i fiocchi d\'avena, le proteine in polvere, il lievito e la cannella. Mescola fino a ottenere un impasto omogeneo.',
        'Scalda una padella antiaderente e aggiungi un po\' di olio di cocco.',
        'Versa piccole porzioni di impasto nella padella calda e cuoci a fuoco medio-basso per circa 2 minuti per lato, o fino a quando appaiono dorati.',
        'Servi con frutta fresca, yogurt greco o un filo di miele.'
      ],
      tips: 'Per una versione senza glutine, usa fiocchi d\'avena certificati senza glutine. Se l\'impasto è troppo denso, puoi aggiungere un po\' di latte.'
    },
    {
      id: 6,
      title: 'Snack proteico: Palline di datteri e frutta secca',
      category: 'spuntino',
      description: 'Uno snack energetico e nutriente, ideale prima dell\'allenamento o come spezzafame.',
      image: 'https://www.zuccheroesale.it/wp-content/uploads/2017/02/energy-balls.jpg',
      time: '15 min',
      difficulty: 'Facile',
      servings: 12,
      tags: ['vegan', 'glutenfree', 'quick'],
      nutrition: {
        calories: '95 kcal',
        protein: '3g',
        carbs: '15g',
        fat: '4g',
        fiber: '2g'
      },
      ingredients: [
        '200g di datteri denocciolati',
        '50g di mandorle',
        '50g di noci',
        '2 cucchiai di semi di chia',
        '1 cucchiaio di cacao amaro in polvere',
        '1 pizzico di sale'
      ],
      instructions: [
        'Metti i datteri in ammollo in acqua calda per 10 minuti, poi scolali bene.',
        'Trita grossolanamente le mandorle e le noci.',
        'In un robot da cucina, frulla i datteri fino a ottenere una pasta.',
        'Aggiungi la frutta secca tritata, i semi di chia, il cacao e il sale. Frulla brevemente per amalgamare.',
        'Con le mani leggermente umide, forma delle palline di circa 3 cm di diametro.',
        'Conserva in frigorifero in un contenitore ermetico per fino a una settimana.'
      ],
      tips: 'Puoi rotolare le palline in cocco grattugiato o cacao per una finitura diversa. Per variare, aggiungi scorza di arancia grattugiata o un po\' di cannella.'
    },
    {
      id: 7,
      title: 'Brownie proteico fit',
      category: 'dolce',
      description: 'Un dolce goloso ma con meno calorie e più proteine rispetto alla versione tradizionale.',
      image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '30 min',
      difficulty: 'Media',
      servings: 9,
      tags: ['vegetarian', 'lowcarb'],
      nutrition: {
        calories: '150 kcal',
        protein: '12g',
        carbs: '15g',
        fat: '6g',
        fiber: '3g'
      },
      ingredients: [
        '100g di farina d\'avena',
        '60g di proteine in polvere al cioccolato',
        '30g di cacao amaro in polvere',
        '120ml di yogurt greco 0%',
        '2 uova',
        '60ml di latte scremato o bevanda vegetale',
        '60g di dolcificante (eritritolo o stevia)',
        '1/2 cucchiaino di lievito in polvere',
        '1 pizzico di sale',
        '50g di gocce di cioccolato fondente'
      ],
      instructions: [
        'Preriscalda il forno a 180°C e fodera una teglia quadrata di circa 20x20 cm con carta forno.',
        'In una ciotola, mescola gli ingredienti secchi: farina d\'avena, proteine in polvere, cacao, dolcificante, lievito e sale.',
        'In un\'altra ciotola, sbatti le uova e aggiungi lo yogurt e il latte, mescolando bene.',
        'Unisci gli ingredienti secchi a quelli liquidi e mescola fino a ottenere un impasto omogeneo.',
        'Aggiungi le gocce di cioccolato e mescola delicatamente.',
        'Versa l\'impasto nella teglia e livellalo.',
        'Cuoci in forno per 20-25 minuti. Il brownie dovrebbe essere ancora leggermente umido al centro.',
        'Lascia raffreddare completamente prima di tagliarlo in quadrati.'
      ],
      tips: 'Non cuocere troppo il brownie per evitare che diventi secco. Per una versione ancora più proteica, sostituisci le gocce di cioccolato con frutta secca tritata.'
    },
    {
      id: 8,
      title: 'Pasta al pesto di avocado e pollo',
      category: 'cena',
      description: 'Un primo piatto cremoso e ricco di nutrienti, perfetto per una cena post-allenamento.',
      image: 'https://www.basilicosecco.com/wp-content/uploads/2021/11/Pasta-con-avocado-scaled-1-1200x1803.jpg',
      time: '25 min',
      difficulty: 'Media',
      servings: 2,
      tags: ['highprotein'],
      nutrition: {
        calories: '480 kcal',
        protein: '32g',
        carbs: '55g',
        fat: '18g',
        fiber: '8g'
      },
      ingredients: [
        '160g di pasta integrale',
        '200g di petto di pollo',
        '1 avocado maturo',
        '1 spicchio d\'aglio',
        'Succo di mezzo limone',
        '20g di parmigiano grattugiato',
        '1 manciata di basilico fresco',
        '2 cucchiai di olio d\'oliva',
        'Sale e pepe q.b.'
      ],
      instructions: [
        'Cuoci la pasta in abbondante acqua salata secondo le istruzioni sulla confezione.',
        'Nel frattempo, taglia il pollo a cubetti e cuocilo in una padella con un cucchiaio di olio, sale e pepe, fino a quando è ben cotto.',
        'Per il pesto: taglia l\'avocado a metà, rimuovi il nocciolo e metti la polpa in un frullatore.',
        'Aggiungi l\'aglio, il succo di limone, il parmigiano, il basilico, l\'olio rimanente, sale e pepe. Frulla fino a ottenere una crema liscia.',
        'Scola la pasta, conservando un po\' di acqua di cottura.',
        'In una ciotola grande, mescola la pasta con il pesto di avocado, aggiungendo un po\' di acqua di cottura se necessario per diluire la salsa.',
        'Aggiungi i cubetti di pollo e mescola delicatamente.',
        'Servi con una spolverata di parmigiano e foglie di basilico fresco.'
      ],
      tips: 'Puoi sostituire il pollo con gamberi o tofu per variare. Per una versione più leggera, usa pasta di legumi invece della pasta tradizionale.'
    }
  ];
  
  // Event listeners
  if (filterCategory && filterDiet && filterTime) {
    filterCategory.addEventListener('change', filterRecipes);
    filterDiet.addEventListener('change', filterRecipes);
    filterTime.addEventListener('change', filterRecipes);
  }
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      filterRecipes();
    });
    
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        filterRecipes();
      }
    });
  }
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      recipeModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
      recipeModal.style.display = 'none';
    }
  });
  
  // Display recipes
  function displayRecipes(recipesToShow) {
    recipesContainer.innerHTML = '';
    
    if (recipesToShow.length === 0) {
      recipesContainer.innerHTML = '<div class="no-results">Nessuna ricetta trovata. Prova a modificare i filtri.</div>';
      return;
    }
    
    recipesToShow.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.dataset.id = recipe.id;
      
      // Create tags HTML
      let tagsHTML = '';
      if (recipe.tags && recipe.tags.length > 0) {
        tagsHTML = '<div class="recipe-tags">';
        recipe.tags.forEach(tag => {
          const tagLabel = getTagLabel(tag);
          tagsHTML += `<span class="recipe-tag">${tagLabel}</span>`;
        });
        tagsHTML += '</div>';
      }
      
      card.innerHTML = `
        <div class="recipe-image">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="recipe-time">${recipe.time}</div>
        </div>
        <div class="recipe-details">
          <h3 class="recipe-title">${recipe.title}</h3>
          <p class="recipe-description">${recipe.description}</p>
          ${tagsHTML}
          <div class="recipe-meta">
            <div class="recipe-difficulty">Difficoltà: <span>${recipe.difficulty}</span></div>
            <div class="recipe-calories">${recipe.nutrition.calories}</div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        showRecipeModal(recipe);
      });
      
      recipesContainer.appendChild(card);
    });
  }
  
  // Filter recipes
  function filterRecipes() {
    const categoryValue = filterCategory.value;
    const dietValue = filterDiet.value;
    const timeValue = filterTime.value;
    const searchValue = searchInput.value.toLowerCase().trim();
    
    let filteredRecipes = recipes.filter(recipe => {
      // Category filter
      const matchesCategory = categoryValue === 'all' || recipe.category === categoryValue;
      
      // Diet filter
      const matchesDiet = dietValue === 'all' || (recipe.tags && recipe.tags.includes(dietValue));
      
      // Time filter
      let matchesTime = true;
      if (timeValue === 'quick') {
        matchesTime = recipe.time.includes('5 min') || recipe.time.includes('10 min') || recipe.time.includes('15 min');
      } else if (timeValue === 'medium') {
        matchesTime = recipe.time.includes('20 min') || recipe.time.includes('25 min') || recipe.time.includes('30 min');
      } else if (timeValue === 'long') {
        matchesTime = parseInt(recipe.time) > 30;
      }
      
      // Search filter
      const matchesSearch = searchValue === '' || 
                            recipe.title.toLowerCase().includes(searchValue) || 
                            recipe.description.toLowerCase().includes(searchValue) || 
                            recipe.category.toLowerCase().includes(searchValue);
      
      return matchesCategory && matchesDiet && matchesTime && matchesSearch;
    });
    
    displayRecipes(filteredRecipes);
  }
  
  // Show recipe modal
  function showRecipeModal(recipe) {
    // Set modal content
    document.getElementById('modal-recipe-title').textContent = recipe.title;
    document.getElementById('modal-recipe-image').src = recipe.image;
    document.getElementById('modal-recipe-time').textContent = recipe.time;
    document.getElementById('modal-recipe-difficulty').textContent = recipe.difficulty;
    document.getElementById('modal-recipe-servings').textContent = recipe.servings;
    
    // Nutrition info
    document.getElementById('modal-recipe-calories').textContent = recipe.nutrition.calories;
    document.getElementById('modal-recipe-protein').textContent = recipe.nutrition.protein;
    document.getElementById('modal-recipe-carbs').textContent = recipe.nutrition.carbs;
    document.getElementById('modal-recipe-fat').textContent = recipe.nutrition.fat;
    document.getElementById('modal-recipe-fiber').textContent = recipe.nutrition.fiber;
    
    // Tags
    const tagsContainer = document.getElementById('modal-recipe-tags');
    tagsContainer.innerHTML = '';
    if (recipe.tags && recipe.tags.length > 0) {
      recipe.tags.forEach(tag => {
        const tagLabel = getTagLabel(tag);
        const tagSpan = document.createElement('span');
        tagSpan.className = 'recipe-tag';
        tagSpan.textContent = tagLabel;
        tagsContainer.appendChild(tagSpan);
      });
    }
    
    // Ingredients
    const ingredientsList = document.getElementById('modal-recipe-ingredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    
    // Instructions
    const instructionsList = document.getElementById('modal-recipe-instructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
      const li = document.createElement('li');
      li.textContent = instruction;
      instructionsList.appendChild(li);
    });
    
    // Tips
    document.getElementById('modal-recipe-tips').textContent = recipe.tips;
    
    // Show modal
    recipeModal.style.display = 'block';
  }
  
  // Helper function to get tag label
  function getTagLabel(tag) {
    const tagMap = {
      'vegetarian': 'Vegetariano',
      'vegan': 'Vegano',
      'glutenfree': 'Senza glutine',
      'lowcarb': 'Low carb',
      'highprotein': 'Alto contenuto proteico',
      'quick': 'Veloce'
    };
    
    return tagMap[tag] || tag;
  }
  
  // Initial display
  displayRecipes(recipes);
});