// import { images } from './models/Images.js';
import { QuizQuestions } from './models/Questions.js';
// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================
const nextButton = document.querySelector('#nextButton');
const pointsCounter = document.querySelector('.points');
const abortQuizButton = document.querySelector('.abort-quiz-button');
const clearStorage = function () {
    localStorage.removeItem('answers');
    localStorage.removeItem('timeToPoints');
    localStorage.removeItem('stoppedTime');
    localStorage.removeItem('correctAnswersCount');
};
abortQuizButton.addEventListener('click', clearStorage);
const renderPoints = function () {
    // const storedPoints = parseInt(localStorage.getItem('timeToPoints')) || 0;
    const storedPoints = localStorage.getItem('timeToPoints') || 0;
    if (pointsCounter) {
        const pointsHTML = `
    <p class="points-counter">Points: <span class="number">${storedPoints}</span></p>
    `;
        pointsCounter.innerHTML = pointsHTML;
    }
    else {
        console.log('Element not found');
    }
};
// QuizQuestions.forEach((question) => {
//   addTocurrentSessionArray(question.id);
// });
// QuizQuestions.forEach((question) => {
//   addTocurrentSessionArray(question.id); // Pass the ID directly instead of the entire object
// });
// Clone the array for current session to array for used questions
// function addToUsedQuestionsArray(): void {
// usedQuestionsArray.push(...currentSessionArray);
// }
// Stringify array for used questions and store in local storage
function saveToLocalStorage() {
    const usedQuestionsArrayAsString = JSON.stringify(usedQuestionsArray);
    localStorage.setItem('usedQuestions', usedQuestionsArrayAsString);
}
// Clear current session (after 10 questions)
// function clearcurrentSessionArray(): void {
//   currentSessionArray = [];
// }
// Clear used questions (after 20 questions)
function clearusedQuestionsArray() {
    localStorage.removeItem('usedQuestions');
}
// ==================================================================================================
// -----------------------------------------   TIMERS   ---------------------------------------------
// ==================================================================================================
// ====================================== TOTAL TIME TIMER ==========================================
let countUpTimerValue = parseInt(localStorage.getItem('countUpTimerValue') ?? '0', 10);
let countUpIntervalId;
let countDownIntervalId;
// let timerStopped = localStorage.getItem('timerStopped') === 'true';
const timerElement = document.querySelector('.timer');
// const stoppedTimeElement = document.querySelector('#stoppedTimer') as HTMLDivElement;
// get stopped time from localstorage
// const stoppedTime = localStorage.getItem('stoppedTime');
// showing stopped time if any
/*  if (stoppedTime !== null) {
  stoppedTimeElement.innerHTML = stoppedTime;
}  */
function updateTimerDisplay() {
    const minutes = Math.floor(countUpTimerValue / 60);
    const seconds = countUpTimerValue % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}
function startTimer() {
    console.log('start timer');
    countUpIntervalId = setInterval(() => {
        countUpTimerValue += 1;
        updateTimerDisplay();
        if (countUpTimerValue >= 300) {
            stopTimer();
        }
    }, 1000);
    updateTimerDisplay();
}
function stopTimer() {
    clearInterval(countUpIntervalId);
    const currentTime = timerElement.innerText;
    localStorage.setItem('stoppedTime', currentTime);
    console.log('Value in localStorage:', localStorage.getItem('stoppedTime'));
    // const stoppedTime = localStorage.getItem('stoppedTime');
    // timerStopped = true;
    /* if (stoppedTime !== null && stoppedTime !== undefined) {
      stoppedTimeElement.innerText = stoppedTime;
    }  */
}
// stopTimeBtn.addEventListener('click', stopTimer);
// function resumeTimer(): void {
//   if (countUpIntervalId === null && timerStopped) {
//     startTimer();
//     timerStopped = false;
//   }
// }
/* function resetTimer(): void {
  countUpTimerValue = 0;
  timerStopped = false;
  updateTimerDisplay();
  localStorage.removeItem('stoppedTime');
  localStorage.setItem('countUpTimerValue', countUpTimerValue.toString());
  localStorage.setItem('timerStopped', timerStopped.toString());
} */
// const currentPage = window.location.pathname;
// if (currentPage.includes('question')) {
//   startTimer();
// }
/* window.addEventListener('beforeunload', () => {
  localStorage.setItem('countUpTimerValue', countUpTimerValue.toString());
  localStorage.setItem('timerStopped', timerStopped.toString());
});

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    timerStopped = localStorage.getItem('timerStopped') === 'true';
    resumeTimer();
  }
}); */
// ====================================== COUNT DOWN TIMER ==========================================
const contentContainer = document.querySelector('.content-container');
function startTimerColorAnimation() {
    contentContainer.classList.remove('timer-color');
    void contentContainer.offsetWidth;
    contentContainer.classList.add('timer-color');
}
const updatePoints = function (newPoints) {
    localStorage.setItem('timeToPoints', newPoints.toString());
    renderPoints();
};
let questionCounter;
let currentSessionArray = []; // Array for current session
let usedQuestionsArray = []; // Array for questions used this and previous session
// Push rendered question into array for current session
function addTocurrentSessionArray(id) {
    currentSessionArray.push(id);
}
let timeLeft = 0;
export function startCountdownTimer(callback) {
    clearInterval(countDownIntervalId);
    let seconds = 60;
    startTimerColorAnimation();
    countDownIntervalId = setInterval(() => {
        timeLeft = seconds;
        if (seconds === 0) {
            stopCountDownTimer();
            newQuestion();
            console.warn('TIME OUT');
            if (callback) {
                callback(timeLeft);
            }
        }
        else {
            timeLeft = seconds;
            seconds--;
            console.warn(seconds);
            if (callback) {
                callback(timeLeft);
            }
        }
    }, 1000);
}
function stopCountDownTimer() {
    clearInterval(countDownIntervalId);
    console.log('Time left:', timeLeft);
    // Retrieve the current value from local storage and parse it as a number
    const currentPoints = parseInt(localStorage.getItem('timeToPoints') || '0', 10);
    // Add the current value of timeLeft to the existing points
    const updatedPoints = currentPoints + timeLeft;
    // Set the updated value in local storage
    localStorage.setItem('timeToPoints', updatedPoints.toString());
    updatePoints(updatedPoints);
    return updatedPoints;
}
// ==================================================================================================
// --------------------------------------   CLEAR QUIZ   --------------------------------------------
// ==================================================================================================
/* function clearQuiz(): void {
  resetTimer();
  // clearPoints();
  resetQuestions();
}

// function clearPoints(): void {}

function resetQuestions(): void {
  clearcurrentSessionArray();
} */
// abortQuizButton.addEventListener('click', clearQuiz);
// ==================================================================================================
// -----------------------------------   RANDOM QUESTIONS   -----------------------------------------
// ==================================================================================================
const questionTextContainer = document.querySelector('.question-text-container');
contentContainer.classList.add('timer-color');
const imageContainer = document.querySelector('.img-container');
export function getRandomQuestion() {
    if (QuizQuestions.length === 0) {
        return null;
    }
    let randomQuestion = null;
    let attempts = 0;
    const maxAttempts = 3;
    do {
        const randomIndex = Math.floor(Math.random() * QuizQuestions.length);
        randomQuestion = QuizQuestions[randomIndex];
        const isQuestionUsed = usedQuestionsArray.some((usedQuestion) => {
            return usedQuestion.id === randomQuestion.id;
        });
        if (!isQuestionUsed) {
            usedQuestionsArray.push(randomQuestion); // Push the entire question object
            return randomQuestion; // Return the whole question object
        }
        attempts++;
    } while (attempts < maxAttempts);
    return null; // Return null if no unique question found within attempts
}
// ==================================================================================================
// -------------------------------------   RENDER QUESTIONS   ---------------------------------------
// ==================================================================================================
export const renderQuestion = function (question) {
    if (question && question.id !== undefined) {
        const answerOptions = [
            question.answerOne,
            question.answerTwo,
            question.correctAnswer,
        ];
        const { shuffledArray } = shuffleArray(answerOptions);
        const html = `
          <h2 class="question-counter">Question ${questionCounter + 1} / 10</h2>

          <p class="question-text">
          ${question.question}
          </p>

          <h3 class="answers">Answer Options</h3>

          <div class="answer-container">

          <label for="a1" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a1" value="${shuffledArray[0]}">
          1. &nbsp;<span class="answer">${shuffledArray[0]}</span>
          </label>

          <label for="a2" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a2" value="${shuffledArray[1]}">
          X. &nbsp; <span class="answer">${shuffledArray[1]}</span>
          </label>

          <label for="a3" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a3" value="${shuffledArray[2]}">
          2. &nbsp;<span class="answer">${shuffledArray[2]}</span>
          </label>

          </div>
          `;
        let imageHTML = `
          <img
            src="${question.src}"
            alt="${question.alt}"
            width = 640
            heigth = 500>
          `;
        if (questionTextContainer) {
            questionTextContainer.innerHTML = html;
        }
        else {
            console.log('QT not found');
        }
        if (imageContainer) {
            imageContainer.innerHTML = imageHTML;
        }
        else {
            console.log('IMG not found');
        }
        addTocurrentSessionArray(question.id);
        // countQuestions();
    }
    else {
        console.log('No ducking question found');
    }
};
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a shallow copy of the array to avoid modifying the original
    let correctAnswerIndex = -1;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        // Update the correctAnswerIndex when the correct answer is moved
        if (shuffledArray[i] === array[array.length - 1]) {
            correctAnswerIndex = i;
        }
    }
    return { shuffledArray, correctAnswerIndex };
}
function shuffleAnswerOptions(question) {
    const answerOptions = [
        question.answerOne,
        question.answerTwo,
        question.correctAnswer,
    ];
    shuffleArray(answerOptions);
    [question.answerOne, question.answerTwo, question.correctAnswer] =
        answerOptions;
}
let currentQuestion = null;
function getCurrentQuestion() {
    console.log('THIS IS NEW', currentQuestion);
    return currentQuestion;
}
export const newQuestion = function () {
    countQuestions();
    // const stoppedTime = stopCountDownTimer();
    if (questionCounter < 10) {
        // stopCountDownTimer();
        startCountdownTimer();
        const randomQuestion = getRandomQuestion();
        if (randomQuestion) {
            renderQuestion(randomQuestion);
            shuffleAnswerOptions(randomQuestion);
            currentQuestion = randomQuestion;
            nextButton.addEventListener('click', checkIfCorrectAnswer);
            console.warn('Render and stopCountdown');
        }
        else {
            console.log('No ducking questions available.');
        }
    }
    else {
        console.log('Q 10');
        navigateToResultPage();
    }
    getCurrentQuestion();
};
const startQuizFromStorage = localStorage.getItem('startQuiz');
if (startQuizFromStorage === 'true') {
    startTimer();
    newQuestion();
    localStorage.removeItem('startQuiz');
}
// ==================================================================================================
// ----------------------------------   QUESTION COUNTER   ------------------------------------------
// ==================================================================================================
const navigateToResultPage = () => {
    stopTimer();
    window.location.href = './resultpage.html';
};
function countQuestions() {
    questionCounter = currentSessionArray.length;
    if (currentSessionArray.length <= 10) {
        console.log('Length num Q', questionCounter);
        saveToLocalStorage();
    }
    else if (questionCounter === 10) {
        nextButton.addEventListener('click', navigateToResultPage);
        // checkIfHighscore();
        // Use the array
        // ---- code ----
        // Clear current session
        // clearcurrentSessionArray();
        // When used question array is at 20, clear
        if (usedQuestionsArray.length > 20) {
            clearusedQuestionsArray();
        }
    }
    console.log('current session:', currentSessionArray);
}
// ==================================================================================================
// ------------------------------   CHECK IF CORRECT ANSWER   ---------------------------------------
// ==================================================================================================
export const userAnswerChoices = [];
export function checkIfCorrectAnswer() {
    const selectedAnswer = document.querySelector('input[name="radio"]:checked');
    if (!selectedAnswer) {
        alert('Quack a question');
        return;
    }
    const userAnswer = selectedAnswer.value;
    const currentQuestion = getCurrentQuestion();
    let isCorrect = false;
    if (currentQuestion && userAnswer === currentQuestion.correctAnswer) {
        console.log('YAY');
        isCorrect = true;
        const correctAnswersCount = parseInt(localStorage.getItem('correctAnswersCount') || '0', 10);
        localStorage.setItem('correctAnswersCount', (correctAnswersCount + 1).toString());
        // const answerObject = {
        //   id: userAnswerChoices.length + 1,
        //   answer: userAnswer,
        // };
        // userAnswerChoices.push(answerObject);
        // localStorage.setItem('answers', JSON.stringify(userAnswerChoices));
        stopCountDownTimer();
    }
    else if (currentQuestion) {
        console.log('NAY');
    }
    const answerObject = {
        id: userAnswerChoices.length + 1,
        answer: userAnswer,
        isCorrect: isCorrect,
    };
    userAnswerChoices.push(answerObject);
    localStorage.setItem('answers', JSON.stringify(userAnswerChoices));
    newQuestion();
}
// const pointsDispencer = function () {};
// function checkAnswer() {
//   const selectedAnswer = document.querySelector(
//     'input[name="radio"]:checked'
//   ) as HTMLInputElement;
//   if (!selectedAnswer) {
//      console.log('PICK AN ANSWER, DUCKER');
//      return;
//   }
//   if (selectedAnswer) {
//     const userAnswer = selectedAnswer.value;
//     //const correctAnswer = {}; //! connect this to quizquestions array
//     const correctAnswer = IQuizQuestions[currentQuestion].correctAnswer;
//     if (userAnswer === correctAnswer) {
//       ti();
//       console.log('correct answer selected!');
//     } else {
//       score = 0;
//       console.log('incorrect answer selected!');
//     }
//     console.log('Points:', score);
//   }
// }
// checkAnswer();
// ==================================================================================================
// -----------------------------------   CALCULATE POINTS   -----------------------------------------
// ==================================================================================================
// let score = 0;
// function calculateScore(): void {
//   score = Math.max(0, 30 - startCountdownTimer());
//   console.log('Points:', score);
// }
