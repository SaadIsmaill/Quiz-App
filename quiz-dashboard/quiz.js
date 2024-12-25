document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("nextButton");
    const resultsElement = document.getElementById("results");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const restartButton = document.getElementById("restartButton");

    // New Element for Question Number
    const questionNumberElement = document.createElement("div");
    questionNumberElement.className = "text-lg font-semibold mb-4";
    questionElement.parentElement.insertBefore(questionNumberElement, questionElement);

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null; // To track the selected option
    let timerInterval;

    // Updated Questions: 6 questions
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 2,
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1,
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
            correctAnswer: 1,
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3,
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O", "H2O", "CO2", "HO"],
            correctAnswer: 1,
        }
    ];

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        resultsElement.classList.add("hidden");
        answersElement.innerHTML = "";
        timerElement.textContent = "02:00";
        nextButton.classList.remove("hidden"); // Ensure Next Button is visible
        nextButton.disabled = true; // Disable Next Button initially
        loadQuestion();
        startTimer();
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];

        // Update question number dynamically
        questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionElement.textContent = question.question;

        answersElement.innerHTML = "";
        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.className =
                "px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-all";
            button.textContent = option;
            button.addEventListener("click", function () {
                selectOption(button, index);
            });
            answersElement.appendChild(button);
        });

        selectedOption = null;
        nextButton.disabled = true; // Disable the "Next Question" button until an option is selected
    }

    function selectOption(button, index) {
        // Deselect previously selected option
        if (selectedOption) {
            selectedOption.style.backgroundColor = "";
            selectedOption.style.color = "";
        }

        // Highlight the current selection
        button.style.backgroundColor = "lightgreen";
        button.style.color = "black";
        selectedOption = button;

        // Enable the "Next Question" button once an option is selected
        nextButton.disabled = false;
    }

    function handleNextQuestion() {
        // Check the selected option
        if (selectedOption) {
            const selectedAnswerIndex = Array.from(
                answersElement.children
            ).indexOf(selectedOption);

            if (selectedAnswerIndex === questions[currentQuestionIndex].correctAnswer) {
                score++;
            }
        }

        // Move to the next question or show results
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionElement.textContent = "";
        questionNumberElement.textContent = ""; // Clear question number
        answersElement.innerHTML = "";
        resultsElement.classList.remove("hidden");
        scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
        nextButton.classList.add("hidden"); // Hide Next Button on Results Screen
        clearInterval(timerInterval);
    }

    function startTimer() {
        let timeRemaining = 120;

        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                showResults();
            } else {
                timeRemaining--;
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`;
            }
        }, 1000);
    }

    // Add event listeners
    nextButton.addEventListener("click", handleNextQuestion);
    restartButton.addEventListener("click", startQuiz);

    startQuiz();
});
