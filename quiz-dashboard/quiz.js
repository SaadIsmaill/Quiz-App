
// Questions kay Questions 30 Array
    const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "80°C", "70°C"], answer: 1 },
    { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"], answer: 1 },
    
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
let timeLeft = 60;

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
        button.className = "px-4 py-2 bg-gray-200  rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-all";
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