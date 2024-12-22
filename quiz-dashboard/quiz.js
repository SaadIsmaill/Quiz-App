
// Questions kay Questions 30 Array
    const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "80°C", "70°C"], answer: 1 },
    { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"], answer: 1 },
    { question: "Which is the largest ocean on Earth?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 },
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: 2 },
    { question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: 1 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Hg"], answer: 0 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: 2 },
    { question: "Which gas do plants use for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: 2 },
    { question: "Which planet is closest to the sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: 0 },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: 1 },
    { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
    { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
    { question: "Which element has the atomic number 1?", options: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"], answer: 1 },
    { question: "What is the capital of Italy?", options: ["Milan", "Venice", "Rome", "Naples"], answer: 2 },
    { question: "What is the speed of light?", options: ["299,792 km/s", "300,000 km/s", "150,000 km/s", "250,000 km/s"], answer: 0 },
    { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: 1 },
    { question: "What is the freezing point of water?", options: ["0°C", "10°C", "-10°C", "100°C"], answer: 0 },
    { question: "Who invented the telephone?", options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], answer: 0 },
    { question: "Which continent has the most countries?", options: ["Asia", "Africa", "Europe", "South America"], answer: 1 },
    { question: "Which is the smallest planet in the solar system?", options: ["Mercury", "Mars", "Earth", "Venus"], answer: 0 },
    { question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], answer: 1 },
    { question: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctica", "Kalahari"], answer: 2 },
    { question: "What is the national flower of Japan?", options: ["Cherry Blossom", "Rose", "Lotus", "Tulip"], answer: 0 },
    { question: "Who discovered penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Gregor Mendel"], answer: 1 },
    { question: "Which is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], answer: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextButton = document.getElementById('nextButton');
const timerEl = document.getElementById('timer');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const quizContainer = document.getElementById('quizContainer');
const restartButton = document.getElementById('restartButton');

// Initialize Timer
let timeLeft = 350;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}


function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-all";
        button.addEventListener("click", () => selectAnswer(index));
        answersEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }
    nextButton.classList.remove("hidden");
}

function showResults() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hidden");
    resultsEl.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.classList.add("hidden");
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 120;
    resultsEl.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion();
    startTimer();
});



// Start the quiz

showQuestion();
startTimer();