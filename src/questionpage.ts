import QuizQuestions from './models/Questions';

// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================

const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;
// const abortQuizButton = document.querySelector(
//   '.abort-quiz-button'
// ) as HTMLAnchorElement;

let questionCounter: number = 1;

let currentSessionArray: object[] = []; // Array for current session
let usedQuestionsArray: object[] = []; // Array for questions used this and previous session

// Push rendered question into array for current session
function addTocurrentSessionArray(question: object): void {
  currentSessionArray.push(question);
}

// Clone the array for current session to array for used questions
function addToUsedQuestionsArray(): void {
  usedQuestionsArray = [...currentSessionArray];
}
// Stringify array for used questions and store in local storage
function saveToLocalStorage(): void {
  const usedQuestionsArrayAsString = JSON.stringify(usedQuestionsArray);
  localStorage.setItem('usedQuestions', usedQuestionsArrayAsString);
}
// Clear current session (after 10 questions)
function clearcurrentSessionArray(): void {
  currentSessionArray = [];
}
// Clear used questions (after 20 questions)
function clearusedQuestionsArray(): void {
  localStorage.removeItem('usedQuestions');
}

// ==================================================================================================
// -----------------------------------------   TIMERS   ---------------------------------------------
// ==================================================================================================

// ====================================== TOTAL TIME TIMER ==========================================

// let countUpTimerValue = parseInt(
//   localStorage.getItem('countUpTimerValue') ?? '0',
//   10
// );

// let intervalId: number | undefined = undefined;
// let timerStopped = localStorage.getItem('timerStopped') === 'true';

// const timerElement = document.querySelector('.timer') as HTMLDivElement;
// const stoppedTimeElement = document.querySelector('#stoppedTimer') as HTMLDivElement;

// get stopped time from localstorage
// const stoppedTime = localStorage.getItem('stoppedTime');

// showing stopped time if any
/*  if (stoppedTime !== null) {
  stoppedTimeElement.innerHTML = stoppedTime;
}  */

// function updateTimerDisplay(): void {
//   const minutes = Math.floor(countUpTimerValue / 60);
//   const seconds = countUpTimerValue % 60;

//   const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
//   const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

//   timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
// }

// function startTimer(): void {
//   console.log('start timer');
//   intervalId = setInterval(() => {
//     countUpTimerValue += 1;
//     updateTimerDisplay();
//     if (countUpTimerValue >= 300) {
//       stopTimer();
//     }
//   }, 1000);

//   updateTimerDisplay();
// }

/* if (nextButton !== null) {
  nextButton.addEventListener('click', stopTimer);
} */

// const stopTimeBtn: any = document.querySelector('.testTimer');

// function stopTimer(): void {
//   clearInterval(intervalId);
//   const currentTime = timerElement.innerText;

//   localStorage.setItem('stoppedTime', currentTime);
//   console.log('Value in localStorage:', localStorage.getItem('stoppedTime'));

//   // const stoppedTime = localStorage.getItem('stoppedTime');
//   timerStopped = true;
//   /* if (stoppedTime !== null && stoppedTime !== undefined) {
//     stoppedTimeElement.innerText = stoppedTime;
//   }  */
// }

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

// const currentPage = window.location.pathname;

// if (currentPage.includes('question')) {
//   startTimer();
// }

// window.addEventListener('beforeunload', () => {
//   localStorage.setItem('countUpTimerValue', countUpTimerValue.toString());
//   localStorage.setItem('timerStopped', timerStopped.toString());
// });

// window.addEventListener('visibilitychange', () => {
//   if (document.visibilityState === 'visible') {
//     timerStopped = localStorage.getItem('timerStopped') === 'true';
//     resumeTimer();
//   }
// });

// ====================================== COUNT DOWN TIMER ==========================================

export function startCountdownTimer(): void {
  console.log('start count down 30sec');
  let seconds = 5;

  const intervalId = setInterval(() => {
    console.log(seconds);

    if (seconds === 0) {
      clearInterval(intervalId);
      console.log('GAME OVER');
    } else {
      seconds--;
    }
  }, 1000);
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
const questionTextContainer: any = document.querySelector(
  '.question-text-container'
);

export function getRandomQuestion(): object | null {
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
      addTocurrentSessionArray(randomQuestion);
      break;
    }

    attempts++;
  } while (attempts < maxAttempts);

  return randomQuestion;
}

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

export const renderQuestion = function (question: {
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
  if (questionTextContainer) {
    questionTextContainer.innerHTML = html;
  } else {
    console.log('QT not found');
  }
  addTocurrentSessionArray(QuizQuestions);
  countQuestions();
  startCountdownTimer();
};

// Render the random question
export const newQuestion = function () {
  const randomQuestion = getRandomQuestion();
  if (randomQuestion) {
    renderQuestion(randomQuestion as any);
  } else {
    console.log('No questions available.');
  }
};

const startQuizFromStorage = localStorage.getItem('startQuiz');

if (startQuizFromStorage === 'true') {
  newQuestion();

  localStorage.removeItem('startQuiz');
}

nextButton.addEventListener('click', newQuestion);

// document.addEventListener('DOMContentLoaded', () => {
//   // Your code that accesses the DOM elements goes here
//   const nextButton = document.querySelector('#nextButton');
//   if (nextButton) {
//     nextButton.addEventListener('click', newQuestion);
//   } else {
//     console.error('Next button not found.');
//   }
// });

// Add rendered question to currentSessionArray
// addTocurrentSessionArray(QuizQuestions);
// Update questionCounter
// countQuestions();

// ==================================================================================================
// ----------------------------------   QUESTION COUNTER   ------------------------------------------
// ==================================================================================================

function countQuestions(): void {
  // Calculate length and add 1 (for next question)
  questionCounter = currentSessionArray.length + 1;
  if (questionCounter < 10) {
    // Check if used and renderQuestion()?
    // ---- code ----
  } else {
    // Push this sessions questions into array for used question
    addToUsedQuestionsArray();
    // Save array for used questions to local storage
    saveToLocalStorage();
    // checkIfHighscore();
    // Render result/use the array
    // ---- code ----
    // Clear current session
    clearcurrentSessionArray();
    // When used question array is at 20, clear
    if (usedQuestionsArray.length > 19) {
      clearusedQuestionsArray();
    }
  }
}

// ==================================================================================================
// ------------------------------   CHECK IF CORRECT ANSWER   ---------------------------------------
// ==================================================================================================

// function checkAnswer() {
//   const selectedAnswer = document.querySelector(
//     'input[name="radio"]:checked'
//   ) as HTMLInputElement; //??

//   if (selectedAnswer) {
//     const userAnswer = selectedAnswer.value;
//     const correctAnswer = QuizQuestions.correctAnswer;

//     if (userAnswer === correctAnswer) {
//       console.log('correct answer selected!');
//     } else {
//       console.log('incorrect answer selected!');
//     }
//   }
// }
//! Adjust to make it work..
//? Save answer to localStorage? currentSession?
