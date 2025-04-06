const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const feedback = document.getElementById('feedback');

let score = 0;
let questionCount = 0;

function generateQuestion() {
    if (questionCount >= 10) {
        showScore();
        return;
    }

    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let correctAnswer;
    if (operator === '+') correctAnswer = num1 + num2;
    else if (operator === '-') correctAnswer = num1 - num2;
    else correctAnswer = num1 * num2;

    questionText.innerText = `Question ${questionCount + 1}: ${num1} ${operator} ${num2} = ?`;
    
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let randomNum = Math.floor(Math.random() * 200) - 50;
        if (!answers.includes(randomNum)) {
            answers.push(randomNum);
        }
    }
    answers.sort(() => Math.random() - 0.5);

    optionsContainer.innerHTML = '';
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', () => checkAnswer(answer, correctAnswer));
        optionsContainer.appendChild(button);
    });

    questionCount++;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        feedback.innerText = "Correct!";
        feedback.className = "correct";
    } else {
        feedback.innerText = "Wrong!";
        feedback.className = "wrong";
    }

    setTimeout(() => {
        feedback.innerText = '';
        generateQuestion();
    }, 1000);
}

function showScore() {
    quizContainer.innerHTML = `
        <h2>Quiz Over!</h2>
        <p>Your Score: ${score} / 10</p>
        <p>Congratulations!</p>
        <a href="index.html" class="start-btn">Play Again</a>
    `;
}

generateQuestion();
