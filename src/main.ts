/* eslint-disable */
import './scss/style.scss'; // Importera huvud-SCSS-filen

// import HighscoreList from './models/HighscoreList';
import QuizQuestions from './models/Questions';
// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================
// Question page
const startButton: any = document.querySelector('.start-quiz-button button');
const questionTextContainer: any = document.querySelector('.question-text-container');

// ==================================================================================================
// -------------------------------------   RENDER QUESTION   ------------------- (Question page) ----
// ==================================================================================================
const renderQuestion = function (question: {
  id?: number;
  question: any;
  answerOne?: string;
  answerTwo?: string;
  correctAnswer?: string;
}) {
  console.log('Rendering question:', question);
  const html = `
  <h2 class="question-counter">Question ${question.id || 1} / 10</h2>

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
  getRandomObject(QuizQuestions);
};

// startButton.addEventListener('click', () => {
//   renderQuestion(QuizQuestions[0]);
// });

if (startButton) {
  startButton.addEventListener('click', () => {
    renderQuestion(QuizQuestions[0]);
  });
} else {
  //console.error('Start button not found');
}

//console.log('Hello world');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const questionId = urlParams.get('questionId');

if (questionId) {
  const questionIndex = parseInt(questionId) - 1;
  renderQuestion(QuizQuestions[questionIndex]);
} else {
  //console.log('Question ID not found');
}
// startButton.addEventListener('click', renderQuestion);

// renderQuestion(QuizQuestions[0]);

/**
 ** Random Generator
 * @param array
 * @returns a random object
 */

function getRandomObject<T>(array: T[]): T | undefined {
  console.error('from random gen');
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

// const arr = ['cykel', 'bil', 'moped', 'boat', 'buss', 5, 52, 12];
// console.log(getRandomObject(arr));

// const randomQuestion = getRandomObject(QuizQuestions);

// if (randomQuestion) {
//   console.log('Random Question:', randomQuestion.question);
//   console.log('Answer One:', randomQuestion.answerOne);
//   console.log('Answer Two:', randomQuestion.answerTwo);
//   console.log('Correct Answer:', randomQuestion.correctAnswer);
// } else {
//   console.log('QuizQuestions array is empty');
// }

// ==================================================================================================
// ------------------------------------   TOTAL TIME TIMER --------------------- (Question page) ----
// ==================================================================================================

// in progress by Carro
//todo: 
//pausa timern och visa tiden på resultatsidan 

  document.addEventListener('DOMContentLoaded', () => {
  let timerValue = parseInt(localStorage.getItem('timerValue') || '0', 10);
  let intervalId: number | null = null;
  let paused = localStorage.getItem('paused') === 'true';

  const timerElement = document.querySelector('.timer') as HTMLDivElement;
  const pausedTimeElement = document.querySelector('#pausedTimer') as HTMLDivElement;


  console.log('Running code on result page');

  // get paused time from localstorage
  const pausedTime = localStorage.getItem('pausedTime');

  // showing paused time if any
  if (pausedTime !== null) {    
    pausedTimeElement.textContent = pausedTime;
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  function startTimer() {
    intervalId = setInterval(() => {
      timerValue++;
      updateTimerDisplay();
      if (timerValue >= 300) { 
        pauseTimer(); 
      }
    }, 1000);

    updateTimerDisplay();
  }

  function pauseTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      paused = true;
      // save paused time to localstorage
      localStorage.setItem('pausedTime', timerElement.textContent || '0');
    }
  }

  function resumeTimer() {
    if (!intervalId && paused) {
      startTimer(); 
      paused = false; 
    }
  }

  function resetTimer() {
    timerValue = 0;
    paused = false;
    updateTimerDisplay();
    localStorage.setItem('timerValue', timerValue.toString());
    localStorage.setItem('paused', paused.toString());
  }

  const currentPage = window.location.pathname; 

  if (currentPage.includes('question')) {
    startTimer();
  } else if (currentPage.includes('result')) {
    pauseTimer();
  } else if (currentPage.includes('index')) {
    timerValue = 0;
    resetTimer();
    updateTimerDisplay();
    
    localStorage.setItem('timerValue', timerValue.toString());
    localStorage.setItem('paused', paused.toString());
  }

    window.addEventListener('beforeunload', () => {
    localStorage.setItem('timerValue', timerValue.toString());
    localStorage.setItem('paused', paused.toString());
  }); 

  if (currentPage.includes('index')) {
    resetTimer();
    localStorage.clear();
  }

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      paused = localStorage.getItem('paused') === 'true';
      resumeTimer();
    } else {
      resetTimer();
    }
  });
}); 