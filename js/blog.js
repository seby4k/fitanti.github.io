document.addEventListener('DOMContentLoaded', () => {
  // Blog category filters
  const categoryButtons = document.querySelectorAll('.category-btn');
  const blogArticles = document.querySelectorAll('.blog-article');
  const sidebarCategoryLinks = document.querySelectorAll('.categories-list a');
  
  // Modal elements
  const articleModal = document.getElementById('article-modal');
  const modalClose = document.querySelector('.close-modal');
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  const popularArticleLinks = document.querySelectorAll('.popular-articles a');
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  // Blog article content
  const articleContent = {
    'hiit': {
      title: 'I benefici dell\'allenamento HIIT',
      category: 'Allenamento',
      date: '15 Marzo 2025',
      image: 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: `
        <p>L'allenamento a intervalli ad alta intensità (HIIT) è diventato estremamente popolare negli ultimi anni, e per buone ragioni. Questo tipo di allenamento alterna brevi periodi di esercizio ad alta intensità con periodi di recupero attivo o passivo. Vediamo i principali benefici che lo rendono così efficace.</p>
        
        <h3>Brucia più calorie in meno tempo</h3>
        <p>Uno dei principali vantaggi del HIIT è la sua efficienza temporale. Studi dimostrano che un allenamento HIIT di 20-30 minuti può bruciare tante calorie quanto un'ora di cardio a intensità moderata. Questo è dovuto all'"after-burn effect" o EPOC (Excess Post-Exercise Oxygen Consumption), che fa continuare a bruciare calorie anche dopo l'allenamento.</p>
        
        <h3>Migliora la capacità cardiovascolare</h3>
        <p>Il HIIT è estremamente efficace per migliorare la salute cardiovascolare. La ricerca ha dimostrato che può aumentare la VO2 max (il massimo volume di ossigeno che un atleta può utilizzare) anche più efficacemente dell'allenamento cardio tradizionale. Questo significa un cuore più forte e una migliore capacità polmonare.</p>
        
        <h3>Mantiene la massa muscolare</h3>
        <p>A differenza del cardio tradizionale, che può portare a perdita di massa muscolare se fatto in eccesso, il HIIT aiuta a preservare i muscoli durante la perdita di peso. Alcuni studi suggeriscono che può persino favorire la crescita muscolare, soprattutto negli individui precedentemente sedentari.</p>
        
        <h3>Migliora la sensibilità all'insulina</h3>
        <p>Il HIIT può migliorare significativamente la sensibilità all'insulina, aiutando il corpo a utilizzare meglio il glucosio nel sangue. Questo è particolarmente benefico per la prevenzione del diabete di tipo 2 e per la gestione del peso.</p>
        
        <h3>Si adatta facilmente a diversi livelli di fitness</h3>
        <p>Un altro grande vantaggio del HIIT è la sua adattabilità. Poiché si basa sull'intensità relativa (cioè, quanto intenso è l'esercizio per te personalmente), può essere adattato a qualsiasi livello di fitness. Un principiante può fare un HIIT efficace quanto un atleta avanzato, semplicemente adattando l'intensità al proprio livello.</p>
        
        <h3>Può essere fatto ovunque con poco o nessun equipaggiamento</h3>
        <p>Non hai bisogno di attrezzature costose o di una palestra per fare un buon allenamento HIIT. Esercizi a corpo libero come burpees, mountain climbers, jumping jacks e sprint sul posto sono perfetti per un circuito HIIT che può essere fatto in qualsiasi spazio disponibile.</p>
        
        <h3>Come iniziare con il HIIT</h3>
        <p>Se sei nuovo al HIIT, inizia gradualmente con intervalli meno intensi e periodi di recupero più lunghi. Un buon punto di partenza potrebbe essere 30 secondi di lavoro ad alta intensità seguiti da 90 secondi di recupero, ripetuto per 15-20 minuti. Man mano che migliori, puoi aumentare l'intensità e ridurre i tempi di recupero.</p>
        
        <p>Ricorda che "alta intensità" significa portarti a circa l'80-90% della tua frequenza cardiaca massima durante gli intervalli di lavoro. Dovresti sentirti come se non potessi mantenere quell'intensità per più di un minuto o due.</p>
        
        <p>Come per qualsiasi programma di esercizio, consulta un medico prima di iniziare, soprattutto se hai condizioni di salute preesistenti. E ricorda: la chiave per ottenere benefici dal HIIT è la consistenza, quindi trova un programma che ti piace e che puoi mantenere nel tempo.</p>
      `,
      tags: ['HIIT', 'Allenamento', 'Fitness', 'Cardio']
    },
    'alimentazione': {
      title: 'Alimentazione e sport: cosa mangiare prima e dopo l\'allenamento',
      category: 'Nutrizione',
      date: '10 Marzo 2025',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: `
        <p>Una corretta alimentazione è fondamentale per ottimizzare le prestazioni sportive e il recupero. Ciò che mangi prima e dopo l'allenamento può influenzare significativamente i tuoi risultati, la tua energia e il recupero muscolare. Vediamo come strutturare al meglio i pasti pre e post workout.</p>
        
        <h3>Alimentazione pre-allenamento</h3>
        <p>Lo scopo principale dell'alimentazione pre-allenamento è fornire energia sufficiente per massimizzare le prestazioni senza causare disagio digestivo. Ecco alcune linee guida:</p>
        
        <p><strong>Timing:</strong> Idealmente, dovresti mangiare un pasto completo 2-3 ore prima dell'allenamento, o uno spuntino più leggero 30-60 minuti prima se non hai tempo per un pasto completo.</p>
        
        <p><strong>Composizione:</strong> Il pasto pre-allenamento dovrebbe contenere:</p>
        <ul>
          <li><strong>Carboidrati:</strong> Sono la fonte di energia primaria durante l'esercizio ad alta intensità. Opta per carboidrati a medio-basso indice glicemico che forniscono energia sostenuta (pane integrale, riso, pasta, avena).</li>
          <li><strong>Proteine:</strong> Una moderata quantità di proteine aiuta a ridurre il catabolismo muscolare durante l'allenamento (yogurt greco, uova, pollo, tofu).</li>
          <li><strong>Grassi:</strong> Limita i grassi prima dell'allenamento poiché rallentano la digestione. Una piccola quantità va bene, soprattutto per attività di lunga durata a bassa intensità.</li>
        </ul>
        
        <p><strong>Esempi di pasti pre-allenamento:</strong></p>
        <ul>
          <li>2-3 ore prima: Pollo alla griglia con riso integrale e verdure</li>
          <li>1-2 ore prima: Yogurt greco con banana e un cucchiaio di miele</li>
          <li>30-60 minuti prima: Banana o una barretta energetica a basso contenuto di fibre</li>
        </ul>
        
        <h3>Alimentazione post-allenamento</h3>
        <p>Dopo l'allenamento, il corpo è particolarmente ricettivo ai nutrienti. L'obiettivo principale è favorire il recupero, ripristinare le riserve di glicogeno e promuovere la sintesi proteica muscolare.</p>
        
        <p><strong>Timing:</strong> La "finestra anabolica" ideale è entro 30-60 minuti dopo l'allenamento, ma l'importante è comunque consumare un pasto equilibrato entro 2 ore.</p>
        
        <p><strong>Composizione:</strong> Il pasto post-allenamento dovrebbe contenere:</p>
        <ul>
          <li><strong>Proteine:</strong> Essenziali per la riparazione e la crescita muscolare. Cerca di assumere 20-30g di proteine di alta qualità (whey protein, pollo, pesce, uova, legumi).</li>
          <li><strong>Carboidrati:</strong> Aiutano a ripristinare le riserve di glicogeno muscolare. Il rapporto ideale carboidrati:proteine dipende dal tipo e dall'intensità dell'allenamento, ma in generale un rapporto di 2:1 o 3:1 è efficace per la maggior parte delle persone.</li>
          <li><strong>Liquidi e elettroliti:</strong> Reidratarsi è fondamentale, soprattutto se hai sudato molto.</li>
        </ul>
        
        <p><strong>Esempi di pasti post-allenamento:</strong></p>
        <ul>
          <li>Frullato proteico con latte, banana e un cucchiaio di burro di arachidi</li>
          <li>Petto di tacchino con patata dolce e verdure a foglia verde</li>
          <li>Omelette di albumi con avocado e toast integrale</li>
        </ul>
        
        <h3>Considerazioni specifiche per diversi tipi di allenamento</h3>
        
        <p><strong>Allenamento di forza:</strong> Maggiore enfasi sulle proteine post-allenamento per supportare la riparazione e la crescita muscolare.</p>
        
        <p><strong>Cardio di lunga durata:</strong> Maggiore enfasi sui carboidrati sia prima (per l'energia) che dopo (per ripristinare il glicogeno) l'allenamento.</p>
        
        <p><strong>HIIT o allenamenti misti:</strong> Approccio bilanciato con particolare attenzione all'idratazione e al ripristino degli elettroliti.</p>
        
        <h3>Considerazioni finali</h3>
        <p>Ricorda che queste sono linee guida generali e che le esigenze individuali possono variare in base a molti fattori, tra cui il tipo di allenamento, l'intensità, la durata, gli obiettivi personali e la tolleranza digestiva. Sperimentare e ascoltare il proprio corpo è la chiave per trovare la strategia alimentare ottimale per te.</p>
        
        <p>Inoltre, l'alimentazione attorno all'allenamento dovrebbe essere vista nel contesto della tua dieta complessiva. Non importa quanto sia ottimale il tuo pasto pre o post-allenamento se il resto della tua alimentazione non è bilanciato e allineato con i tuoi obiettivi.</p>
      `,
      tags: ['Nutrizione', 'Sport', 'Recupero', 'Prestazioni']
    },
    'stretching': {
      title: 'L\'importanza dello stretching: prima o dopo l\'allenamento?',
      category: 'Allenamento',
      date: '5 Marzo 2025',
      image: 'https://media.gq.com/photos/59a9a273dc3ba42b1cdca2e9/master/pass/2017-09_GQ-FITNESS-Stretching_3x2.jpg',
      content: `
        <p>Lo stretching è una componente essenziale di qualsiasi routine di fitness, ma esiste ancora molta confusione su quando sia meglio farlo: prima o dopo l'allenamento? In questo articolo, analizzeremo i diversi tipi di stretching e quando è più appropriato utilizzarli.</p>
        
        <h3>Tipi di stretching</h3>
        <p>Prima di discutere del timing, è importante comprendere i diversi tipi di stretching:</p>
        
        <p><strong>Stretching statico:</strong> Consiste nel mantenere una posizione di allungamento per un periodo di tempo (generalmente 15-60 secondi). È il tipo di stretching più comune.</p>
        
        <p><strong>Stretching dinamico:</strong> Implica movimenti controllati attraverso l'intero range di movimento di un'articolazione. Non ci si ferma in una posizione, ma si mantiene il movimento continuo.</p>
        
        <p><strong>Stretching balistico:</strong> Utilizza movimenti rimbalzanti o ritmici per forzare un arto oltre il suo normale range di movimento. Non è generalmente raccomandato per la maggior parte delle persone a causa del rischio di infortuni.</p>
        
        <p><strong>PNF (Proprioceptive Neuromuscular Facilitation):</strong> Combina stretching passivo e contrazioni isometriche. È molto efficace ma richiede spesso un partner.</p>
        
        <h3>Stretching prima dell'allenamento</h3>
        <p>Contrariamente a quanto molti credono, lo stretching statico prima dell'allenamento potrebbe non essere la scelta migliore. Diversi studi hanno dimostrato che lo stretching statico prolungato immediatamente prima dell'attività può ridurre temporaneamente la forza muscolare, la potenza e le prestazioni esplosive.</p>
        
        <p>Ecco cosa è consigliato invece:</p>
        
        <p><strong>Riscaldamento generale:</strong> Inizia con 5-10 minuti di attività cardiovascolare leggera come camminata veloce, jogging leggero o cyclette per aumentare la temperatura corporea e il flusso sanguigno ai muscoli.</p>
        
        <p><strong>Stretching dinamico:</strong> Dopo il riscaldamento generale, lo stretching dinamico è ideale prima dell'allenamento. Aiuta a preparare i muscoli e le articolazioni per il movimento, aumenta il range di movimento funzionale e può migliorare le prestazioni. Esempi includono swing delle gambe, circuiti di braccia, affondi con rotazione del busto, ecc.</p>
        
        <p><strong>Movimenti specifici per lo sport:</strong> Concludi con movimenti che imitano quelli che utilizzerai durante l'allenamento, ma a intensità ridotta.</p>
        
        <h3>Stretching dopo l'allenamento</h3>
        <p>Il post-allenamento è il momento ideale per lo stretching statico. Ecco perché:</p>
        
        <p><strong>Muscoli caldi:</strong> I muscoli sono già caldi e più ricettivi allo stretching dopo l'allenamento.</p>
        
        <p><strong>Riduzione della rigidità muscolare:</strong> Lo stretching statico può aiutare a ridurre la rigidità muscolare che può verificarsi dopo l'allenamento.</p>
        
        <p><strong>Miglioramento della flessibilità a lungo termine:</strong> La pratica regolare dello stretching statico dopo l'allenamento può portare a miglioramenti della flessibilità nel tempo.</p>
        
        <p><strong>Ritorno alla calma:</strong> Lo stretching può aiutare a ridurre gradualmente la frequenza cardiaca e promuovere il rilassamento.</p>
        
        <h3>Considerazioni speciali</h3>
        
        <p><strong>Per attività che richiedono flessibilità:</strong> Se pratichi attività che richiedono un'elevata flessibilità (come ginnastica, danza o arti marziali), potresti beneficiare di una sessione di stretching dedicata, separata dai tuoi allenamenti regolari.</p>
        
        <p><strong>Per le aree problematiche:</strong> Se hai aree particolarmente rigide o stai lavorando per recuperare da un infortunio, potresti aver bisogno di sessioni di stretching aggiuntive, possibilmente sotto la guida di un professionista.</p>
        
        <h3>Conclusioni</h3>
        <p>In sintesi, per la maggior parte delle persone, la strategia ottimale è:</p>
        <ul>
          <li><strong>Prima dell'allenamento:</strong> Riscaldamento generale seguito da stretching dinamico</li>
          <li><strong>Dopo l'allenamento:</strong> Stretching statico per migliorare la flessibilità e favorire il recupero</li>
        </ul>
        
        <p>Ricorda che lo stretching dovrebbe essere sempre confortevole e mai doloroso. Un leggero disagio è normale, ma il dolore acuto è un segnale che stai spingendo troppo.</p>
        
        <p>Infine, come per qualsiasi componente del fitness, la coerenza è fondamentale. I benefici dello stretching si accumulano nel tempo, quindi cerca di incorporarlo regolarmente nella tua routine per vederne i risultati.</p>
      `,
      tags: ['Stretching', 'Flessibilità', 'Riscaldamento', 'Recupero']
    },
    'sonno': {
      title: 'L\'importanza del sonno per il recupero muscolare',
      category: 'Salute',
      date: '28 Febbraio 2025',
      image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: `
        <p>Il sonno è spesso la componente più sottovalutata nel recupero muscolare e nella crescita. Mentre molti si concentrano sull'allenamento e sull'alimentazione, trascurano l'importanza cruciale che il sonno ha nella trasformazione di questi sforzi in risultati tangibili.</p>
        
        <h3>Perché il sonno è fondamentale per il recupero muscolare</h3>
        
        <p><strong>Rilascio dell'ormone della crescita:</strong> Durante il sonno profondo (fase non-REM), il corpo rilascia significative quantità di ormone della crescita (GH), che è essenziale per la riparazione e la crescita dei tessuti, inclusi i muscoli. Fino al 75% dell'ormone della crescita giornaliero viene rilasciato durante il sonno.</p>
        
        <p><strong>Sintesi proteica:</strong> Il sonno fornisce condizioni ottimali per la sintesi proteica muscolare, il processo mediante il quale il corpo costruisce nuove proteine muscolari. Studi hanno dimostrato che la privazione del sonno può ridurre la sintesi proteica fino al 18%.</p>
        
        <p><strong>Riduzione del cortisolo:</strong> Il sonno adeguato aiuta a mantenere bassi i livelli di cortisolo, l'ormone dello stress che, quando elevato cronicamente, può portare alla degradazione muscolare e ostacolare il recupero.</p>
        
        <p><strong>Recupero del sistema nervoso:</strong> L'allenamento intenso non stressa solo i muscoli ma anche il sistema nervoso centrale. Il sonno è essenziale per il recupero neurale, migliorando la funzione muscolare, la coordinazione e la forza nelle sessioni future.</p>
        
        <h3>Gli effetti della privazione del sonno sulle prestazioni fisiche</h3>
        
        <p>La mancanza di sonno adeguato può avere effetti negativi significativi:</p>
        
        <ul>
          <li>Diminuzione della forza e della potenza muscolare</li>
          <li>Tempi di reazione più lenti</li>
          <li>Ridotta capacità di recupero tra le sessioni di allenamento</li>
          <li>Maggiore percezione dello sforzo (un allenamento normale sembra più difficile)</li>
          <li>Compromissione del metabolismo del glucosio e aumento della resistenza all'insulina</li>
          <li>Alterazione degli ormoni regolatori dell'appetito, portando spesso a scelte alimentari meno salutari</li>
        </ul>
        
        <h3>Quanto sonno è necessario?</h3>
        
        <p>Mentre le raccomandazioni generali suggeriscono 7-9 ore di sonno per gli adulti, gli atleti e le persone fisicamente attive potrebbero beneficiare di un po' di più, tipicamente 8-10 ore. L'esatto fabbisogno varia in base a fattori individuali come età, livello di attività, genetica e qualità generale del sonno.</p>
        
        <p>Alcuni atleti d'élite, come LeBron James e Roger Federer, riferiscono di dormire fino a 12 ore al giorno per massimizzare il recupero e le prestazioni.</p>
        
        <h3>Strategie per migliorare il sonno e il recupero</h3>
        
        <p><strong>Mantieni un orario regolare:</strong> Cerca di andare a letto e svegliarti alla stessa ora ogni giorno, anche nei fine settimana. Questo aiuta a regolare il tuo orologio biologico.</p>
        
        <p><strong>Crea un ambiente ottimale:</strong> Mantieni la camera da letto fresca (circa 18-20°C), buia e silenziosa. Considera l'uso di maschere per gli occhi o tappi per le orecchie se necessario.</p>
        
        <p><strong>Limita l'esposizione alla luce blu:</strong> La luce blu emessa da smartphone, tablet e computer può sopprimere la produzione di melatonina, l'ormone del sonno. Cerca di evitare questi dispositivi almeno un'ora prima di coricarti.</p>
        
        <p><strong>Attento alla caffeina:</strong> La caffeina ha un'emivita di circa 5-6 ore, il che significa che metà della caffeina è ancora nel tuo sistema dopo questo periodo. Evita il consumo di caffeina nel pomeriggio e in serata.</p>
        
        <p><strong>Considera il timing dell'allenamento:</strong> L'esercizio intenso poco prima di coricarsi può interferire con il sonno. Se possibile, programma gli allenamenti intensi almeno 2-3 ore prima di andare a letto.</p>
        
        <p><strong>Nutri il tuo corpo adeguatamente:</strong> Una cena equilibrata con carboidrati complessi, proteine magre e grassi sani può promuovere un buon sonno. Evita pasti abbondanti proprio prima di coricarti.</p>
        
        <p><strong>Considera integratori naturali:</strong> Alcuni supplementi come la melatonina, la magnesio e la glicina hanno mostrato benefici per il sonno in alcuni studi. Consulta sempre un professionista sanitario prima di iniziare qualsiasi integrazione.</p>
        
        <h3>Conclusione</h3>
        <p>Il sonno non è un periodo di inattività ma un processo attivo essenziale per il recupero, la riparazione e la crescita muscolare. È letteralmente il momento in cui il tuo corpo trasforma il tuo duro lavoro in palestra in risultati concreti.</p>
        
        <p>Se stai lottando per vedere progressi nonostante un allenamento e un'alimentazione adeguati, il sonno potrebbe essere l'anello mancante. Investire nel sonno di qualità non è un lusso ma una necessità per chiunque sia serio riguardo al fitness e alle prestazioni fisiche.</p>
        
        <p>Ricorda: dormire di più e meglio non è pigrizia — è una parte strategica e scientificamente provata del tuo regime di allenamento.</p>
      `,
      tags: ['Sonno', 'Recupero', 'Ormoni', 'Salute']
    },
    'proteine': {
      title: 'Le migliori fonti proteiche per vegetariani e vegani',
      category: 'Nutrizione',
      date: '20 Febbraio 2025',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: `
        <p>Una delle preoccupazioni più comuni per chi segue una dieta vegetariana o vegana è ottenere un adeguato apporto di proteine. Contrariamente al mito che le diete plant-based siano carenti di proteine, esistono numerose fonti vegetali che possono soddisfare il fabbisogno proteico quotidiano, anche per gli sportivi e gli atleti.</p>
        
        <h3>Fabbisogno proteico: quanto è necessario?</h3>
        <p>Prima di esaminare le fonti, è utile capire quanto proteine sono necessarie. Le raccomandazioni generali suggeriscono:</p>
        <ul>
          <li><strong>Persone sedentarie:</strong> 0.8g per kg di peso corporeo</li>
          <li><strong>Persone moderatamente attive:</strong> 1.0-1.2g per kg</li>
          <li><strong>Atleti di resistenza:</strong> 1.2-1.4g per kg</li>
          <li><strong>Atleti di forza o in fase di costruzione muscolare:</strong> 1.6-2.0g per kg</li>
        </ul>
        
        <p>Per i vegetariani e vegani, alcuni esperti suggeriscono un leggero aumento (circa 10%) di questi valori a causa della minore digeribilità di alcune proteine vegetali, ma studi recenti mostrano che con una dieta ben pianificata, questo aumento potrebbe non essere necessario.</p>
        
        <h3>Le migliori fonti proteiche vegetali</h3>
        
        <h4>Legumi</h4>
        <p>I legumi sono tra le fonti proteiche vegetali più complete:</p>
        <ul>
          <li><strong>Lenticchie:</strong> 9g di proteine per 100g (cotte)</li>
          <li><strong>Ceci:</strong> 8.9g di proteine per 100g (cotti)</li>
          <li><strong>Fagioli neri:</strong> 8.7g di proteine per 100g (cotti)</li>
          <li><strong>Fagioli bianchi:</strong> 8.2g di proteine per 100g (cotti)</li>
          <li><strong>Piselli:</strong> 5.4g di proteine per 100g (cotti)</li>
        </ul>
        <p>I legumi sono anche ricchi di fibre, ferro, zinco e magnesio, e hanno un basso indice glicemico.</p>
        
        <h4>Soia e derivati</h4>
        <p>La soia è una delle proteine vegetali più complete, contenente tutti gli aminoacidi essenziali:</p>
        <ul>
          <li><strong>Tempeh:</strong> 19g di proteine per 100g</li>
          <li><strong>Tofu:</strong> 8-15g di proteine per 100g (varia in base alla consistenza)</li>
          <li><strong>Edamame:</strong> 11g di proteine per 100g</li>
          <li><strong>Latte di soia:</strong> 3.3g di proteine per 100ml</li>
        </ul>
        <p>La soia contiene anche isoflavoni, che possono offrire benefici per la salute cardiovascolare.</p>
        
        <h4>Seitan</h4>
        <p>Il seitan è prodotto dal glutine del frumento ed è incredibilmente ricco di proteine:</p>
        <ul>
          <li><strong>Seitan:</strong> 25g di proteine per 100g</li>
        </ul>
        <p>Nota: Non adatto a chi soffre di celiachia o sensibilità al glutine.</p>
        
        <h4>Cereali e pseudocereali</h4>
        <p>Alcuni cereali e pseudocereali offrono un buon contenuto proteico:</p>
        <ul>
          <li><strong>Quinoa:</strong> 4.4g di proteine per 100g (cotta)</li>
          <li><strong>Amaranto:</strong> 4g di proteine per 100g (cotto)</li>
          <li><strong>Avena:</strong> 13g di proteine per 100g (secca)</li>
          <li><strong>Farro:</strong> 6g di proteine per 100g (cotto)</li>
        </ul>
        <p>La quinoa e l'amaranto sono completi in termini di aminoacidi essenziali, una rarità tra i vegetali.</p>
        
        <h4>Frutta secca e semi</h4>
        <p>Ottime fonti di proteine e grassi sani:</p>
        <ul>
          <li><strong>Semi di canapa:</strong> 31g di proteine per 100g</li>
          <li><strong>Semi di zucca:</strong> 30g di proteine per 100g</li>
          <li><strong>Semi di chia:</strong> 17g di proteine per 100g</li>
          <li><strong>Mandorle:</strong> 21g di proteine per 100g</li>
          <li><strong>Arachidi:</strong> 26g di proteine per 100g</li>
        </ul>
        <p>Sono calorie-densi, quindi un piccolo quantitativo è sufficiente come snack proteico.</p>
        
        <h4>Per i vegetariani (non vegani)</h4>
        <p>Chi segue una dieta vegetariana può anche includere:</p>
        <ul>
          <li><strong>Uova:</strong> 13g di proteine per 100g</li>
          <li><strong>Yogurt greco:</strong> 10g di proteine per 100g</li>
          <li><strong>Cottage cheese:</strong> 11g di proteine per 100g</li>
          <li><strong>Whey protein:</strong> 80-90g di proteine per 100g</li>
        </ul>
        
        <h3>Combinare le proteine: un approccio superato?</h3>
        <p>Tradizionalmente, si consigliava di combinare diverse fonti proteiche vegetali nello stesso pasto per ottenere tutti gli aminoacidi essenziali (ad esempio, riso e fagioli). Oggi, la ricerca suggerisce che non è necessario combinare le proteine nello stesso pasto, ma è sufficiente consumare una varietà di fonti proteiche nell'arco della giornata.</p>
        
        <h3>Strategie pratiche per aumentare l'apporto proteico</h3>
        <ul>
          <li>Aggiungi semi di canapa, chia o proteine in polvere vegane ai frullati</li>
          <li>Includi hummus o altra crema di legumi come snack con verdure crude</li>
          <li>Usa la farina di legumi (ceci, lenticchie) in pancake o prodotti da forno</li>
          <li>Aggiungi tofu sbriciolato o tempeh alle insalate</li>
          <li>Prepara burri di frutta secca fatti in casa</li>
          <li>Tosta i ceci come snack croccante</li>
        </ul>
        
        <h3>Considerazioni sulla qualità delle proteine</h3>
        <p>Alcune proteine vegetali possono avere una digeribilità leggermente inferiore rispetto alle proteine animali. Tecniche di preparazione come l'ammollo, la germogliazione e la fermentazione possono migliorare la biodisponibilità dei nutrienti nei legumi e nei cereali.</p>
        
        <h3>Conclusione</h3>
        <p>Una dieta vegetariana o vegana ben pianificata può fornire tutte le proteine necessarie per sostenere la salute, l'attività fisica e persino la crescita muscolare. La chiave è la varietà: consumare diverse fonti proteiche vegetali assicura un apporto completo di aminoacidi essenziali e altri nutrienti importanti.</p>
        
        <p>Se stai passando a una dieta plant-based, introduci gradualmente più legumi e altre fonti proteiche vegetali, aumentando anche l'apporto di liquidi per adattarti all'aumento di fibre. E ricorda: la proteina è importante, ma una nutrizione ottimale comprende un equilibrio di tutti i macronutrienti e una vasta gamma di vitamine e minerali.</p>
      `,
      tags: ['Proteine', 'Vegetariano', 'Vegano', 'Alimentazione']
    },
    'meditazione': {
      title: 'La meditazione come strumento per migliorare le prestazioni sportive',
      category: 'Mindfulness',
      date: '15 Febbraio 2025',
      image: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: `
        <p>Quando pensiamo al miglioramento delle prestazioni sportive, tendiamo a concentrarci su allenamento fisico, nutrizione e recupero. Tuttavia, un elemento spesso trascurato ma incredibilmente potente è l'allenamento mentale, in particolare la meditazione. In questo articolo, esploreremo come la meditazione può essere un potente strumento per migliorare le prestazioni atletiche a tutti i livelli.</p>
        
        <h3>Il collegamento mente-corpo nelle prestazioni sportive</h3>
        <p>Le prestazioni sportive non sono determinate solo dalla capacità fisica, ma anche dallo stato mentale. Stress, ansia, dubbi e pensieri negativi possono significativamente compromettere anche l'atleta più allenato fisicamente. La meditazione aiuta a coltivare una mente calma, concentrata e resiliente che può operare in sinergia con un corpo ben allenato.</p>
        
        <h3>Benefici della meditazione per gli atleti</h3>
        
        <h4>Miglioramento della concentrazione</h4>
        <p>La concentrazione è fondamentale in qualsiasi sport. La meditazione, in particolare la mindfulness, allena la mente a mantenere l'attenzione sul momento presente, ignorando le distrazioni. Studi hanno dimostrato che anche solo 8 settimane di pratica meditativa possono migliorare significativamente la capacità di concentrazione e attenzione.</p>
        
        <h4>Gestione dello stress e dell'ansia</h4>
        <p>L'ansia da prestazione può sabotare anche gli atleti più talentuosi. La meditazione aiuta a ridurre i livelli di cortisolo (l'ormone dello stress) e attiva la risposta di rilassamento del corpo. Questo permette agli atleti di affrontare situazioni ad alta pressione con maggiore calma e chiarezza mentale.</p>
        
        <h4>Migliore recupero</h4>
        <p>Il recupero non è solo fisico ma anche mentale. La meditazione promuove un sonno di qualità migliore e aiuta il sistema nervoso a passare dalla modalità "fight or flight" (lotta o fuga) alla modalità "rest and digest" (riposo e digestione), accelerando i processi di recupero del corpo.</p>
        
        <h4>Maggiore consapevolezza corporea</h4>
        <p>La meditazione aumenta la consapevolezza delle sensazioni corporee, aiutando gli atleti a riconoscere piccoli segnali di affaticamento, tensione o potenziali infortuni prima che diventino problemi seri. Questa consapevolezza può anche migliorare la tecnica e l'efficienza dei movimenti.</p>
        
        <h4>Miglioramento della resilienza mentale</h4>
        <p>La meditazione insegna a osservare pensieri e sensazioni senza reagire immediatamente, sviluppando la capacità di rimanere equilibrati durante difficoltà e sfide. Questo è particolarmente utile per superare battute d'arresto, sconfitte o momenti difficili durante una competizione.</p>
        
        <h4>Potenziamento del flow state</h4>
        <p>Il "flow state" (stato di flusso) è quella condizione mentale in cui ci si sente completamente immersi e coinvolti in un'attività, con un'elevata concentrazione e godimento. Gli atleti lo descrivono come "essere nella zona". La meditazione regolare può aumentare la probabilità di entrare in questo stato ottimale durante la performance.</p>
        
        <h3>Tipi di meditazione per gli atleti</h3>
        
        <h4>Mindfulness</h4>
        <p>La meditazione di consapevolezza consiste nel portare attenzione al momento presente senza giudizio. Per gli atleti, questo può tradursi in maggiore concentrazione e minore distrazione durante l'allenamento o la competizione.</p>
        
        <h4>Visualizzazione</h4>
        <p>Questa tecnica implica l'immaginare vividamente il completamento con successo di un'azione sportiva. Gli atleti che praticano regolarmente la visualizzazione creano connessioni neurali simili a quelle che si formerebbero eseguendo fisicamente l'azione, migliorando la performance reale.</p>
        
        <h4>Meditazione sul respiro</h4>
        <p>Semplice ma potente, questa pratica consiste nel concentrarsi sul respiro, usandolo come ancora per rimanere nel presente. Può essere particolarmente utile per calmarsi prima di una competizione o per recuperare la concentrazione durante un momento difficile.</p>
        
        <h4>Body scan</h4>
        <p>Questa tecnica prevede di portare l'attenzione sistematicamente a diverse parti del corpo, notando sensazioni senza giudicarle. Aiuta ad aumentare la consapevolezza corporea e può essere utile per identificare e rilasciare tensioni nascoste.</p>
        
        <h3>Integrare la meditazione nella routine dell'atleta</h3>
        
        <h4>Iniziare con sessioni brevi</h4>
        <p>Per i principianti, è consigliabile iniziare con sessioni di 5-10 minuti al giorno, aumentando gradualmente. La coerenza è più importante della durata: meglio 5 minuti ogni giorno che 30 minuti una volta alla settimana.</p>
        
        <h4>Momento strategico</h4>
        <p>Molti atleti trovano beneficio nel meditare al mattino per impostare l'intenzione della giornata, o la sera per favorire il recupero. Altri preferiscono brevi momenti di mindfulness prima dell'allenamento o della competizione.</p>
        
        <h4>Utilizzare app e risorse</h4>
        <p>App come Headspace, Calm o Insight Timer offrono meditazioni guidate specifiche per atleti e performance. Anche molti coach sportivi ora integrano tecniche meditative nei loro programmi.</p>
        
        <h4>Essere pazienti</h4>
        <p>Come qualsiasi abilità, la meditazione richiede pratica. I benefici possono non essere immediati, ma con la costanza, la maggior parte degli atleti nota miglioramenti significativi entro alcune settimane.</p>
        
        <h3>Atleti di successo che praticano la meditazione</h3>
        <p>Numerosi atleti di alto livello hanno incorporato la meditazione nella loro routine, tra cui:</p>
        <ul>
          <li>LeBron James, che pratica regolarmente meditazione per mantenere la calma sotto pressione</li>
          <li>Novak Djokovic, che attribuisce parte del suo successo alla mindfulness e alla visualizzazione</li>
          <li>Kobe Bryant, che ha lavorato con coach di meditazione per migliorare la sua concentrazione</li>
          <li>La squadra NBA dei Chicago Bulls, che negli anni '90 praticava meditazione sotto la guida di Phil Jackson</li>
          <li>Michael Jordan, che utilizzava tecniche di visualizzazione prima delle partite</li>
        </ul>
        
        <h3>Conclusione</h3>
        <p>La meditazione non è un sostituto dell'allenamento fisico, ma un potente complemento che può fare la differenza tra una buona e un'eccellente performance. In un mondo sportivo dove i margini di vittoria sono spesso minimi, la forza mentale coltivata attraverso la meditazione può essere quel vantaggio che distingue i campioni.</p>
        
        <p>Come disse una volta Phil Jackson, leggendario allenatore NBA e sostenitore della meditazione: "La forza mentale è come un muscolo: più la usi, più diventa forte". La meditazione è l'allenamento per quel muscolo.</p>
        
        <p>Che tu sia un atleta professionista o un appassionato di fitness, integrare anche solo pochi minuti di meditazione nella tua routine quotidiana potrebbe essere uno dei cambiamenti più impattanti che puoi fare per migliorare le tue prestazioni.</p>
      `,
      tags: ['Meditazione', 'Mindfulness', 'Performance', 'Psicologia sportiva']
    }
  };
  
  // Filter articles by category
  function filterArticles(category) {
    blogArticles.forEach(article => {
      const articleCategory = article.dataset.category;
      
      if (category === 'all' || articleCategory === category) {
        article.style.display = 'flex';
      } else {
        article.style.display = 'none';
      }
    });
  }
  
  // Event listeners for category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter articles
      filterArticles(category);
    });
  });
  
  // Event listeners for sidebar category links
  sidebarCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      
      // Update active button
      categoryButtons.forEach(btn => {
        if (btn.dataset.category === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      // Filter articles
      filterArticles(category);
      
      // Scroll to blog content
      document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Show article modal
  function showArticleModal(articleId) {
    const article = articleContent[articleId];
    
    if (!article) {
      alert('Articolo non trovato');
      return;
    }
    
    document.getElementById('modal-article-title').textContent = article.title;
    document.getElementById('modal-article-category').textContent = article.category;
    document.getElementById('modal-article-date').textContent = article.date;
    document.getElementById('modal-article-img').src = article.image;
    document.getElementById('modal-article-img').alt = article.title;
    document.getElementById('modal-article-content').innerHTML = article.content;
    
    // Tags
    const tagsContainer = document.getElementById('modal-article-tags');
    tagsContainer.innerHTML = '';
    
    article.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'article-tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });
    
    // Show modal
    articleModal.style.display = 'block';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }
  
  // Event listeners for read more buttons
  readMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = button.dataset.article;
      showArticleModal(articleId);
    });
  });
  
  // Event listeners for popular article links
  popularArticleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = link.dataset.article;
      showArticleModal(articleId);
    });
  });
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      articleModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === articleModal) {
      articleModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      if (email) {
        alert(`Grazie per esserti iscritto alla newsletter con l'email: ${email}`);
        newsletterForm.reset();
      }
    });
  }
  
  // Share buttons functionality
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      const articleTitle = document.getElementById('modal-article-title').textContent;
      alert(`Condivisione dell'articolo "${articleTitle}" su ${button.textContent} simulata.`);
    });
  });
});