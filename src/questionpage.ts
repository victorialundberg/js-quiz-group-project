import QuizQuestions from './models/Questions';
// import { HighscoreList } from './models/HighscoreList';
// import { ScoreItem } from './models/Score';

// const score = new ScoreItem(1, 'Jari', 200, 120);
// const score2 = new ScoreItem(1, 'Linda', 200, 120);

// const highscoreList = HighscoreList.instance;
// // highscoreList.load();
// highscoreList.addScore(score);
// highscoreList.addScore(score2);
// highscoreList.save();
// // console.log(highscoreList);
// // console.log(highscoreList.load());

// const scores = highscoreList.list;

// console.log('High Scores:');
// scores.forEach((score) => {
//   console.log(
//     `ID: ${score.id}, Name: ${score.name}, Points: ${score.totalPoints}, Time: ${score.totalTime}`
//   );
// });

// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================

  const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;
 // const abortQuizButton = document.querySelector('.abort-quiz-button') as HTMLButtonElement;

  let questionCounter: number = 1;


let currentQuestionsArray: object[] = []; // Array for current session
let usedQuestionsArray: object[] = []; // Array for questions used this and previous session

// Push rendered question into array for current session
function addTocurrentQuestionsArray(question: object): void {
  currentQuestionsArray.push(question);
}

// Clone the array for current session to array for used questions
 function addToUsedQuestionsArray(): void {
   usedQuestionsArray = [...currentQuestionsArray];
}
// Stringify array for used questions and store in local storage
 function saveToLocalStorage(): void {
   const usedQuestionsArrayAsString = JSON.stringify(usedQuestionsArray);
   localStorage.setItem('usedQuestions', usedQuestionsArrayAsString);
 }
 // Clear current session (after 10 questions)
 function clearcurrentQuestionsArray(): void {
   currentQuestionsArray = [];
 }
 // Clear used questions (after 20 questions)
 function clearusedQuestionsArray(): void {
   localStorage.removeItem('usedQuestions');
 }


// ==================================================================================================
// ------------------------------------   TOTAL TIME TIMER ------------------------------------------
// ==================================================================================================

/* let timerValue = parseInt(localStorage.getItem('timerValue') ?? '0', 10);
let intervalId: number | null = null;
let paused = localStorage.getItem('paused') === 'true';

const timerElement = document.querySelector('.timer') as HTMLDivElement;
const pausedTimeElement = document.querySelector(
  '#pausedTimer'
) as HTMLDivElement;

// get paused time from localstorage
const pausedTime = localStorage.getItem('pausedTime');

// showing paused time if any
if (pausedTime !== null) {
  pausedTimeElement.innerHTML = pausedTime;
}

function updateTimerDisplay(): void { 
  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer(): void {
  intervalId = setInterval(() => {
    timerValue += 1; // ändrat från "++" pga eslint
    updateTimerDisplay();
    if (timerValue >= 10) { // 300
      pauseTimer();
    }
  }, 1000);

  updateTimerDisplay(); 
}

if (nextButton !== null) {
  nextButton.addEventListener('click', pauseTimer);
}

function pauseTimer(): void {
  const currentTime = timerElement.innerText;
  localStorage.setItem('pausedTime', currentTime);
  const pausedTime = localStorage.getItem('pausedTime');
  paused = true;
  if (pausedTime !== null && pausedTime !== undefined) {
    pausedTimeElement.innerText = pausedTime;
  }
}

function resumeTimer(): void {
  if (intervalId === null && paused) {
    startTimer();
    paused = false;
  }
}

abortQuizButton.addEventListener('click', resetTimer);

function resetTimer(): void {
  timerValue = 0;
  paused = false;
  updateTimerDisplay();
  localStorage.removeItem('pausedTime');
  localStorage.setItem('timerValue', timerValue.toString());
  localStorage.setItem('paused', paused.toString());
  console.log('reset gjort');
  window.location.href = '../../index.html';
}

const currentPage = window.location.pathname;

if (currentPage.includes('question')) {
  startTimer();
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem('timerValue', timerValue.toString());
  localStorage.setItem('paused', paused.toString());
});

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    paused = localStorage.getItem('paused') === 'true';
    resumeTimer();
  }
}); */

// ==================================================================================================
// -----------------------------------   RANDOM QUESTIONS   -----------------------------------------
// ==================================================================================================

function getRandomQuestion(): object | null {
  if (QuizQuestions.length === 0) {
    return null;
  }

  let randomQuestion: object | null = null;
  let attempts = 0;
  const maxAttempts = 3;

  do {
    const randomIndex = Math.floor(Math.random() * QuizQuestions.length);
    randomQuestion = QuizQuestions[randomIndex];

    const isQuestionUsed = usedQuestionsArray.some((usedQuestion) => {
      return (usedQuestion as any).id === (randomQuestion as any).id;
    });

    if (!isQuestionUsed) {
      addTocurrentQuestionsArray(randomQuestion);
      break;
    }

    attempts++;
  } while (attempts < maxAttempts);

  return randomQuestion;
}

const questionTextContainer: any = document.querySelector(
  '.question-text-container'
);

// function getRandomObject<T>(array: T[]): T | undefined {
//   console.error('from random gen');

//   let randomIndex = Math.floor(Math.random() * array.length);
//   let selectedQuestion = array[randomIndex];

//   while (usedQuestionsArray.some((q) => q.id === selectedQuestion.id)) {
//     randomIndex = Math.floor(Math.random() * array.length);
//     selectedQuestion = array[randomIndex];
//   }

//   addToUsedQuestionsArray(selectedQuestion);

//   return selectedQuestion;
// }

// ==================================================================================================
// -------------------------------------   RENDER QUESTIONS   ---------------------------------------
// ==================================================================================================

const renderQuestion = function (question: {
  id?: number;
  question: any;
  answerOne?: string;
  answerTwo?: string;
  correctAnswer?: string;
}): void {
  console.log('Rendering question:', question);
  const html = `
  <h2 class="question-counter">Question 1 / 10</h2>

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
  questionTextContainer.innerHTML = html;
  addTocurrentQuestionsArray(QuizQuestions);
  countQuestions();  
};

const randomQuestion = getRandomQuestion();

// Render the random question
const newQuestion = function() {
  if (randomQuestion) {
    renderQuestion(randomQuestion as any);
  } else {
    console.log('No questions available.');
  }
}

nextButton.addEventListener('click', newQuestion);


// Add rendered question to currentQuestionsArray
// addTocurrentQuestionsArray(QuizQuestions);
// Update questionCounter
// countQuestions();
 
// ==================================================================================================
// ----------------------------------   QUESTION COUNTER   ------------------------------------------
// ==================================================================================================

  function countQuestions(): void {
    // Calculate length and add 1 (for next question)
    questionCounter = currentQuestionsArray.length + 1;
    if (questionCounter < 10) {
      // Check if used and renderQuestion()?
      // ---- code ----
    } else {
      // Push this sessions questions into array for used question
      addToUsedQuestionsArray();
      // Save array for used questions to local storage
      saveToLocalStorage();
      checkIfHighscore();
      // Render result/use the array
      // ---- code ----
      // Clear current session
      clearcurrentQuestionsArray();
      // When used question array is at 20, clear
      if (usedQuestionsArray.length > 19) {
        clearusedQuestionsArray();
      }
    }
  }

  function checkIfHighscore(): void {
    // ---- code ----
  }
