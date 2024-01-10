import { images } from './models/Images';
import { QuizQuestions } from './models/Questions';
// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================
const nextButton = document.querySelector('#nextButton');
// const abortQuizButton = document.querySelector(
//   '.abort-quiz-button'
// ) as HTMLAnchorElement;
let questionCounter;
let currentSessionArray = []; // Array for current session
let usedQuestionsArray = []; // Array for questions used this and previous session
// Push rendered question into array for current session
function addTocurrentSessionArray(id) {
    currentSessionArray.push(id);
}
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
function clearcurrentSessionArray() {
    currentSessionArray = [];
}
// Clear used questions (after 20 questions)
function clearusedQuestionsArray() {
    localStorage.removeItem('usedQuestions');
}
// ==================================================================================================
// -----------------------------------------   TIMERS   ---------------------------------------------
// ==================================================================================================
// ====================================== TOTAL TIME TIMER ==========================================
let countUpTimerValue = parseInt(localStorage.getItem('countUpTimerValue') ?? '0', 10);
let intervalId;
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
    intervalId = setInterval(() => {
        countUpTimerValue += 1;
        updateTimerDisplay();
        if (countUpTimerValue >= 300) {
            stopTimer();
        }
    }, 1000);
    updateTimerDisplay();
}
/* if (nextButton !== null) {
  nextButton.addEventListener('click', stopTimer);
} */
// const stopTimeBtn: any = document.querySelector('.testTimer');
function stopTimer() {
    clearInterval(intervalId);
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
//   if (intervalId === null && timerStopped) {
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
const currentPage = window.location.pathname;
if (currentPage.includes('question')) {
    startTimer();
}
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
// let intervalId: ReturnType<typeof setInterval>;
let timeLeft = 0;
export function startCountdownTimer(callback) {
    console.log('start count down 30sec');
    let seconds = 30;
    intervalId = setInterval(() => {
        if (seconds === 0) {
            stopCountDownTimer();
            if (callback) {
                callback(timeLeft);
            }
        }
        else {
            timeLeft = seconds;
            seconds--;
            console.log(seconds);
            if (callback) {
                callback(timeLeft);
            }
        }
    }, 1000);
}
function stopCountDownTimer() {
    clearInterval(intervalId);
    console.log('Time left:', timeLeft);
    // Retrieve the current value from local storage and parse it as a number
    const currentPoints = parseInt(localStorage.getItem('timeToPoints') || '0', 10);
    // Add the current value of timeLeft to the existing points
    const updatedPoints = currentPoints + timeLeft;
    // Set the updated value in local storage
    localStorage.setItem('timeToPoints', updatedPoints.toString());
    return timeLeft;
    // clearInterval(intervalId);
    // console.log('Time left:', timeLeft);
    // localStorage.setItem('timeToPoints:', timeLeft.toString());
    // return timeLeft;
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
    console.log('Rendering question:', question);
    if (question && question.id !== undefined) {
        const html = `
          <h2 class="question-counter">Question ${questionCounter + 1} / 10</h2>

          <p class="question-text">
          ${question.question}
          </p>

          <h3 class="answers">Answer Options</h3>

          <div class="answer-container">

          <label for="a1" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a1">
          1. &nbsp;<span class="answer">${question.answerOne}</span>
          </label>

          <label for="a2" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a2">
          X. &nbsp; <span class="answer">${question.answerTwo}</span>
          </label>

          <label for="a3" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a3">
          2. &nbsp;<span class="answer">${question.correctAnswer}</span>
          </label>

          </div>
          `;
        if (questionTextContainer) {
            questionTextContainer.innerHTML = html;
        }
        else {
            console.log('QT not found');
        }
        addTocurrentSessionArray(question.id);
        countQuestions();
        startTimer();
        // startCountdownTimer();
    }
    else {
        console.log('No ducking question found');
    }
};
export const newQuestion = function () {
    countQuestions();
    // const stoppedTime = stopCountDownTimer();
    stopCountDownTimer();
    startCountdownTimer();
    const randomQuestion = getRandomQuestion();
    if (randomQuestion) {
        renderQuestion(randomQuestion);
    }
    else {
        console.log('No ducking questions available.');
    }
};
const startQuizFromStorage = localStorage.getItem('startQuiz');
if (startQuizFromStorage === 'true') {
    newQuestion();
    localStorage.removeItem('startQuiz');
}
nextButton.addEventListener('click', newQuestion);
// ==================================================================================================
// ----------------------------------   QUESTION COUNTER   ------------------------------------------
// ==================================================================================================
const navigateToResultPage = () => {
    window.location.href = 'resultpage.html';
};
function countQuestions() {
    // Calculate length and add 1 (for next question)
    // questionCounter = currentSessionArray.length + 1;
    questionCounter = currentSessionArray.length;
    if (currentSessionArray.length <= 10) {
        // Check if used and renderQuestion()?
        console.log('Length num Q', questionCounter);
        // ---- code ----
    }
    if (currentSessionArray.length === 10) {
        // alert('YOU ARE DONE');
        nextButton.addEventListener('click', navigateToResultPage);
        // Save array for used questions to local storage
        saveToLocalStorage();
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
// function checkAnswer() {
//   const selectedAnswer = document.querySelector(
//     'input[name="radio"]:checked'
//   ) as HTMLInputElement;
//   if (selectedAnswer) {
//     const userAnswer = selectedAnswer.value;
//     //const correctAnswer = {}; //! connect this to quizquestions array
//     const correctAnswer = QuizQuestions[currentQuestion].correctAnswer;
//     if (userAnswer === correctAnswer) {
//       calculateScore();
//       console.log('correct answer selected!');
//     } else {
//       score = 0;
//       console.log('incorrect answer selected!');
//     }
//     console.log('Points:', score);
//   }
// }
// checkAnswer();
//? Save answer to localStorage? currentSession?
// ==================================================================================================
// -----------------------------------   CALCULATE POINTS   -----------------------------------------
// ==================================================================================================
// let score = 0;
// function calculateScore(): void {
//   score = Math.max(0, 30 - startCountdownTimer());
//   console.log('Points:', score);
// }
// ==================================================================================================
// --------------------------------------   RENDER IMAGE   ------------------------------------------
// ==================================================================================================
function renderImage() {
    for (let i = 0; i < 20; i++) {
        let imageSrc = images[i].src;
        let imageAlt = images[i].alt;
        let imageHTML = `

    <img
      src="${imageSrc}"
      alt="${imageAlt}"
      width = 640
      heigth = 420>
    `;
        const imageContainer = document.querySelector('.img-container');
        imageContainer.innerHTML = imageHTML;
        if (i > 19) {
            i = 0;
        }
    }
}
// call function in right place - when rendering a question?
const renderImageBool = false;
if (renderImageBool) {
    renderImage();
}
