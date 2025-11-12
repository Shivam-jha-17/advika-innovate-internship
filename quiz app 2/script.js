// Quiz App State
const quizState = {
    username: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedAnswer: null,
    answered: false
};

// DOM Elements
const usernameScreen = document.getElementById('username-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const usernameInput = document.getElementById('username-input');
const startBtn = document.getElementById('start-btn');
const usernameDisplay = document.getElementById('username-display');
const currentScore = document.getElementById('current-score');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const questionNum = document.getElementById('question-num');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const restartBtn = document.getElementById('restart-btn');
const changeUserBtn = document.getElementById('change-user-btn');
const totalQuestionsEl = document.getElementById('total-questions');
const correctAnswersEl = document.getElementById('correct-answers');
const wrongAnswersEl = document.getElementById('wrong-answers');
const finalScoreEl = document.getElementById('final-score');

// Initialize App
function init() {
    // Load username from localStorage
    const savedUsername = localStorage.getItem('quizUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        quizState.username = savedUsername;
    }

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startQuiz();
        }
    });
    restartBtn.addEventListener('click', restartQuiz);
    changeUserBtn.addEventListener('click', changeUser);
}

// Start Quiz
async function startQuiz() {
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Please enter your name!');
        return;
    }

    quizState.username = username;
    localStorage.setItem('quizUsername', username);

    // Reset quiz state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.correctAnswers = 0;
    quizState.wrongAnswers = 0;

    // Show quiz screen
    showScreen('quiz');
    
    // Fetch and load questions
    await loadQuestions();
    displayQuestion();
    updateUI();
}

// Load Questions - Always use India-specific questions
async function loadQuestions() {
    // Directly use India-specific questions
    quizState.questions = getIndiaQuestions();
    // Shuffle questions and take 10 random ones
    quizState.questions = shuffleArray(quizState.questions).slice(0, 10);
}

// India-Specific Questions (50+ interesting & diverse questions)
function getIndiaQuestions() {
    return [
        // Fun & Interesting Facts
        {
            question: "Which Indian city is famous for having the world's largest population of wild Asiatic lions?",
            correctAnswer: "Gir, Gujarat",
            options: ["Gir, Gujarat", "Ranthambore, Rajasthan", "Bandipur, Karnataka", "Kaziranga, Assam"]
        },
        {
            question: "What is the name of India's first indigenous aircraft carrier?",
            correctAnswer: "INS Vikrant",
            options: ["INS Vikrant", "INS Viraat", "INS Vikramaditya", "INS Vishal"]
        },
        {
            question: "Which Indian state produces the most amount of spices in the country?",
            correctAnswer: "Kerala",
            options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"]
        },
        {
            question: "What is the world's highest cricket ground located in India?",
            correctAnswer: "Chail Cricket Ground, Himachal Pradesh",
            options: ["Chail Cricket Ground, Himachal Pradesh", "Dharamshala Stadium", "Leh Cricket Ground", "Gulmarg Cricket Ground"]
        },
        {
            question: "Which Indian city is known as the 'Pink City'?",
            correctAnswer: "Jaipur",
            options: ["Udaipur", "Jodhpur", "Jaipur", "Bikaner"]
        },
        {
            question: "What is India's rank in the world for having the most number of billionaires?",
            correctAnswer: "3rd",
            options: ["1st", "2nd", "3rd", "4th"]
        },
        {
            question: "Which Indian state has the highest number of UNESCO World Heritage Sites?",
            correctAnswer: "Maharashtra",
            options: ["Rajasthan", "Uttar Pradesh", "Maharashtra", "Tamil Nadu"]
        },
        {
            question: "What is the name of India's first bullet train project?",
            correctAnswer: "Mumbai-Ahmedabad High Speed Rail",
            options: ["Delhi-Mumbai High Speed Rail", "Mumbai-Ahmedabad High Speed Rail", "Chennai-Bangalore High Speed Rail", "Kolkata-Delhi High Speed Rail"]
        },
        {
            question: "Which Indian festival involves throwing colored powder and water at each other?",
            correctAnswer: "Holi",
            options: ["Diwali", "Holi", "Dussehra", "Raksha Bandhan"]
        },
        {
            question: "What is the name of India's first woman to win an Olympic medal?",
            correctAnswer: "Karnam Malleswari",
            options: ["P.T. Usha", "Karnam Malleswari", "Mary Kom", "Saina Nehwal"]
        },
        // Food & Culture
        {
            question: "Which Indian dish is known as the 'King of Biryanis'?",
            correctAnswer: "Hyderabadi Biryani",
            options: ["Lucknowi Biryani", "Hyderabadi Biryani", "Kolkata Biryani", "Mumbai Biryani"]
        },
        {
            question: "What is the traditional name of the spinning wheel used by Mahatma Gandhi?",
            correctAnswer: "Charkha",
            options: ["Charkha", "Takli", "Loom", "Spindle"]
        },
        {
            question: "Which Indian state is famous for its backwaters and houseboats?",
            correctAnswer: "Kerala",
            options: ["Goa", "Kerala", "Karnataka", "Tamil Nadu"]
        },
        {
            question: "What is the name of India's national fruit?",
            correctAnswer: "Mango",
            options: ["Apple", "Banana", "Mango", "Guava"]
        },
        {
            question: "Which Indian classical dance form originated in Tamil Nadu?",
            correctAnswer: "Bharatanatyam",
            options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"]
        },
        {
            question: "What is the traditional Indian greeting with folded hands called?",
            correctAnswer: "Namaste",
            options: ["Namaste", "Salaam", "Hello", "Adab"]
        },
        // History & Heritage
        {
            question: "Which ancient Indian mathematician is credited with inventing zero?",
            correctAnswer: "Brahmagupta",
            options: ["Aryabhata", "Brahmagupta", "Bhaskara", "Varahamihira"]
        },
        {
            question: "What is the name of the world's largest religious gathering that happens in India?",
            correctAnswer: "Kumbh Mela",
            options: ["Kumbh Mela", "Maha Shivaratri", "Rath Yatra", "Pushkar Fair"]
        },
        {
            question: "Which Indian monument is one of the Seven Wonders of the World?",
            correctAnswer: "Taj Mahal",
            options: ["Red Fort", "Taj Mahal", "Qutub Minar", "Hawa Mahal"]
        },
        {
            question: "What is the name of India's first satellite?",
            correctAnswer: "Aryabhata",
            options: ["Bhaskara", "Aryabhata", "Rohini", "INSAT"]
        },
        {
            question: "Which Indian freedom fighter is known as 'Netaji'?",
            correctAnswer: "Subhash Chandra Bose",
            options: ["Bhagat Singh", "Subhash Chandra Bose", "Chandrashekhar Azad", "Lala Lajpat Rai"]
        },
        // Technology & Innovation
        {
            question: "Which Indian city is known as the 'IT Capital of India'?",
            correctAnswer: "Bangalore",
            options: ["Hyderabad", "Pune", "Bangalore", "Chennai"]
        },
        {
            question: "What is the name of India's first nuclear-powered submarine?",
            correctAnswer: "INS Arihant",
            options: ["INS Chakra", "INS Arihant", "INS Kalvari", "INS Vikrant"]
        },
        {
            question: "Which Indian company is the world's largest producer of two-wheelers?",
            correctAnswer: "Hero MotoCorp",
            options: ["Bajaj Auto", "Hero MotoCorp", "TVS Motors", "Royal Enfield"]
        },
        {
            question: "What is India's position in the world for mobile phone manufacturing?",
            correctAnswer: "2nd",
            options: ["1st", "2nd", "3rd", "4th"]
        },
        {
            question: "Which Indian state launched the world's first blockchain-based degree verification system?",
            correctAnswer: "Maharashtra",
            options: ["Karnataka", "Maharashtra", "Tamil Nadu", "Telangana"]
        },
        // Geography & Nature
        {
            question: "Which is the smallest state in India by area?",
            correctAnswer: "Goa",
            options: ["Sikkim", "Goa", "Tripura", "Mizoram"]
        },
        {
            question: "What is the name of India's highest mountain peak?",
            correctAnswer: "Kanchenjunga",
            options: ["Mount Everest", "Kanchenjunga", "Nanda Devi", "Kamet"]
        },
        {
            question: "Which Indian state is known as the 'Land of Five Rivers'?",
            correctAnswer: "Punjab",
            options: ["Haryana", "Punjab", "Uttar Pradesh", "Bihar"]
        },
        {
            question: "What is the name of India's longest beach?",
            correctAnswer: "Marina Beach, Chennai",
            options: ["Juhu Beach, Mumbai", "Marina Beach, Chennai", "Calangute Beach, Goa", "Puri Beach, Odisha"]
        },
        {
            question: "Which Indian state has the highest number of tigers?",
            correctAnswer: "Madhya Pradesh",
            options: ["Karnataka", "Madhya Pradesh", "Uttarakhand", "Maharashtra"]
        },
        // More History Questions
        {
            question: "In which year did India conduct its first nuclear test?",
            correctAnswer: "1974",
            options: ["1972", "1974", "1976", "1978"]
        },
        {
            question: "Who was the first Indian to win a Nobel Prize?",
            correctAnswer: "Rabindranath Tagore",
            options: ["C.V. Raman", "Rabindranath Tagore", "Mother Teresa", "Amartya Sen"]
        },
        {
            question: "Which Indian king is known as 'Ashoka the Great'?",
            correctAnswer: "Ashoka",
            options: ["Chandragupta Maurya", "Ashoka", "Harsha", "Akbar"]
        },
        {
            question: "What is the name of India's first talkie film?",
            correctAnswer: "Alam Ara",
            options: ["Raja Harishchandra", "Alam Ara", "Devdas", "Mother India"]
        },
        {
            question: "Which Indian state was the first to be formed on linguistic basis?",
            correctAnswer: "Andhra Pradesh",
            options: ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Kerala"]
        },
        // More Culture & Traditions
        {
            question: "Which Indian state is famous for the 'Bihu' festival?",
            correctAnswer: "Assam",
            options: ["West Bengal", "Assam", "Odisha", "Tripura"]
        },
        {
            question: "What is the traditional Indian system of medicine called?",
            correctAnswer: "Ayurveda",
            options: ["Ayurveda", "Unani", "Homeopathy", "Siddha"]
        },
        {
            question: "Which Indian state is known as the 'Land of Festivals'?",
            correctAnswer: "Rajasthan",
            options: ["Punjab", "Rajasthan", "Gujarat", "West Bengal"]
        },
        {
            question: "What is the name of India's national tree?",
            correctAnswer: "Banyan Tree",
            options: ["Neem Tree", "Banyan Tree", "Peepal Tree", "Mango Tree"]
        },
        {
            question: "Which Indian state is famous for 'Pattachitra' painting?",
            correctAnswer: "Odisha",
            options: ["Rajasthan", "Madhya Pradesh", "Odisha", "West Bengal"]
        },
        // More Geography
        {
            question: "Which is the longest river in India?",
            correctAnswer: "Ganges",
            options: ["Yamuna", "Ganges", "Godavari", "Narmada"]
        },
        {
            question: "Which Indian state shares borders with the most number of states?",
            correctAnswer: "Uttar Pradesh",
            options: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra"]
        },
        {
            question: "What is the name of India's largest desert?",
            correctAnswer: "Thar Desert",
            options: ["Kutch Desert", "Thar Desert", "Ladakh Desert", "Rann of Kutch"]
        },
        {
            question: "Which Indian state is known as the 'Spice Garden of India'?",
            correctAnswer: "Kerala",
            options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"]
        },
        {
            question: "What is the name of India's southernmost point?",
            correctAnswer: "Indira Point",
            options: ["Kanyakumari", "Indira Point", "Rameswaram", "Cape Comorin"]
        },
        // More Technology & Science
        {
            question: "Which Indian mission successfully landed on the Moon's south pole?",
            correctAnswer: "Chandrayaan-3",
            options: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Mangalyaan"]
        },
        {
            question: "Who is known as the 'Missile Man of India'?",
            correctAnswer: "Dr. A.P.J. Abdul Kalam",
            options: ["Dr. Vikram Sarabhai", "Dr. A.P.J. Abdul Kalam", "Dr. Homi Bhabha", "Dr. C.V. Raman"]
        },
        {
            question: "Which Indian city hosts the largest number of IT companies?",
            correctAnswer: "Bangalore",
            options: ["Hyderabad", "Pune", "Bangalore", "Chennai"]
        },
        {
            question: "What is the name of India's first supercomputer?",
            correctAnswer: "PARAM 8000",
            options: ["PARAM 8000", "SAGA-220", "EKA", "Mihir"]
        },
        {
            question: "Which Indian state has the highest number of startups?",
            correctAnswer: "Karnataka",
            options: ["Maharashtra", "Karnataka", "Telangana", "Tamil Nadu"]
        },
        // More Sports
        {
            question: "Which Indian cricketer has scored the most international centuries?",
            correctAnswer: "Sachin Tendulkar",
            options: ["Virat Kohli", "Sachin Tendulkar", "Rohit Sharma", "Sunil Gavaskar"]
        },
        {
            question: "In which year did India win its first Cricket World Cup?",
            correctAnswer: "1983",
            options: ["1975", "1979", "1983", "1987"]
        },
        {
            question: "Which Indian state is known as the 'Cradle of Indian Hockey'?",
            correctAnswer: "Punjab",
            options: ["Haryana", "Punjab", "Uttar Pradesh", "Bihar"]
        },
        {
            question: "Who was the first Indian to win an individual Olympic gold medal?",
            correctAnswer: "Abhinav Bindra",
            options: ["Rajyavardhan Singh Rathore", "Abhinav Bindra", "Leander Paes", "Vijender Singh"]
        },
        {
            question: "Which Indian city hosted the 2010 Commonwealth Games?",
            correctAnswer: "Delhi",
            options: ["Mumbai", "Delhi", "Bangalore", "Chennai"]
        },
        // More Fun Facts
        {
            question: "Which Indian state has the highest number of airports?",
            correctAnswer: "Gujarat",
            options: ["Maharashtra", "Gujarat", "Rajasthan", "Karnataka"]
        },
        {
            question: "What is the name of India's first metro rail system?",
            correctAnswer: "Kolkata Metro",
            options: ["Delhi Metro", "Mumbai Metro", "Kolkata Metro", "Bangalore Metro"]
        },
        {
            question: "Which Indian state is known as the 'Rice Bowl of India'?",
            correctAnswer: "Andhra Pradesh",
            options: ["Punjab", "Haryana", "Andhra Pradesh", "West Bengal"]
        },
        {
            question: "What is the name of India's longest railway bridge?",
            correctAnswer: "Bogibeel Bridge",
            options: ["Vidyasagar Setu", "Bogibeel Bridge", "Howrah Bridge", "Bandra-Worli Sea Link"]
        },
        {
            question: "Which Indian city is known as the 'City of Pearls'?",
            correctAnswer: "Hyderabad",
            options: ["Surat", "Hyderabad", "Jaipur", "Varanasi"]
        }
    ];
}

// Display Current Question
function displayQuestion() {
    if (quizState.currentQuestionIndex >= quizState.questions.length) {
        showResults();
        return;
    }

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    quizState.answered = false;
    quizState.selectedAnswer = null;

    currentQuestion.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectAnswer(option, optionBtn));
        optionsContainer.appendChild(optionBtn);
    });
}

// Select Answer
function selectAnswer(selectedOption, buttonElement) {
    if (quizState.answered) return;

    quizState.answered = true;
    quizState.selectedAnswer = selectedOption;
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // Disable all buttons
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.add('disabled'));

    // Show animation and reveal answer
    if (isCorrect) {
        buttonElement.classList.add('correct');
        quizState.score += 10;
        quizState.correctAnswers++;
    } else {
        buttonElement.classList.add('incorrect');
        quizState.wrongAnswers++;
        
        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentQuestion.correctAnswer) {
                setTimeout(() => {
                    btn.classList.add('correct');
                }, 300);
            }
        });
    }

    updateUI();

    // Move to next question after delay
    setTimeout(() => {
        quizState.currentQuestionIndex++;
        if (quizState.currentQuestionIndex < quizState.questions.length) {
            displayQuestion();
            updateUI();
        } else {
            // Update progress to 100% before showing results
            progressBar.style.width = '100%';
            setTimeout(() => {
                showResults();
            }, 300);
        }
    }, 2000);
}

// Update UI Elements
function updateUI() {
    usernameDisplay.textContent = quizState.username;
    currentScore.textContent = quizState.score;
    const currentQ = quizState.currentQuestionIndex + 1;
    questionNumber.textContent = currentQ;
    questionNum.textContent = currentQ;
    
    // Update progress bar
    const progress = ((currentQ - 1) / quizState.questions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Show Results
function showResults() {
    showScreen('results');
    totalQuestionsEl.textContent = quizState.questions.length;
    correctAnswersEl.textContent = quizState.correctAnswers;
    wrongAnswersEl.textContent = quizState.wrongAnswers;
    finalScoreEl.textContent = quizState.score;
}

// Restart Quiz
function restartQuiz() {
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.correctAnswers = 0;
    quizState.wrongAnswers = 0;
    progressBar.style.width = '0%';
    showScreen('quiz');
    loadQuestions().then(() => {
        displayQuestion();
        updateUI();
    });
}

// Change User
function changeUser() {
    localStorage.removeItem('quizUsername');
    showScreen('username');
    usernameInput.value = '';
    usernameInput.focus();
}

// Show Screen
function showScreen(screenName) {
    usernameScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');

    if (screenName === 'username') {
        usernameScreen.classList.add('active');
    } else if (screenName === 'quiz') {
        quizScreen.classList.add('active');
    } else if (screenName === 'results') {
        resultsScreen.classList.add('active');
    }
}

// Utility Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Initialize when page loads
init();

