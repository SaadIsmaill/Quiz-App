let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90; // Timer set to 60 seconds
let timerInterval;

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    }
    
];

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement('button');
        answerButton.innerText = answer;
        answerButton.className = "w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all";
        answerButton.onclick = () => selectAnswer(index, answerButton);
        answersContainer.appendChild(answerButton);
    });

    // Show the Next button but disable it initially
    const nextButton = document.getElementById('nextButton');
    nextButton.classList.remove('hidden'); // Make it visible
    nextButton.disabled = true; // Disable it initially
}

function selectAnswer(selectedIndex, answerButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const answers = document.getElementById('answers').children;

    // Highlight selected answer
    for (let i = 0; i < answers.length; i++) {
        if (i === selectedIndex) {
            answerButton.classList.add('bg-light-blue-500', 'text-white'); // Change to light blue
        } else {
            answers[i].classList.add('bg-gray-300'); // Optional: Dim other options
        }
    }

    // Check if the selected answer is correct
    if (selectedIndex === currentQuestion.correct) {
        score++;
    }

    // Enable the Next button after an answer is selected
    const nextButton = document.getElementById('nextButton');
    nextButton.disabled = false; // Enable the button
}

document.getElementById('nextButton').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval); // Stop timer when quiz ends
        showResults();
    }
};

function showResults() {
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('score').innerText = `You scored ${score} out of ${questions.length}`;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults(); // End quiz when time is up
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Restart Quiz Functionality
document.getElementById('restartButton').onclick = () => {
    restartQuiz();
};

function restartQuiz() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Reset timer to 60 seconds

    // Reset the timer display
    document.getElementById('timer').innerText = formatTime(timeLeft);
    
    // Hide the results and show the quiz container again
    document.getElementById('results').classList.add('hidden');
    document.getElementById('quizContainer').classList.remove('hidden');

    // Load the first question and start the timer
    loadQuestion();
    startTimer();
}

// Initialize the quiz and start the timer
loadQuestion();
startTimer();