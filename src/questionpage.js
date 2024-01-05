/* eslint-disable comma-dangle */
// import QuizQuestions from './models/Questions.js';
import QuizQuestions from './models/Questions';
// document.addEventListener('DOMContentLoaded', () => {
// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================
//! ////////////////////////////////////////////////////////////////////
function getRandomQuestion() {
    if (QuizQuestions.length === 0) {
        return null; // Return null if there are no questions in the array
    }
    const randomIndex = Math.floor(Math.random() * QuizQuestions.length);
    const randomQuestion = QuizQuestions[randomIndex];
    return randomQuestion;
}
// function getRandomQuestion() {
//   if (QuizQuestions.length === 0) {
//     return null; // Return null if there are no questions in the array
//   }
//   const randomIndex = Math.floor(Math.random() * QuizQuestions.length);
//   const randomQuestion = QuizQuestions[randomIndex];
//   return randomQuestion;
// }
// // Usage
// const randomQuestion = getRandomQuestion();
// if (randomQuestion) {
//   console.log('Random Question:', randomQuestion.question);
//   console.log('Possible answers:');
//   console.log('1. ', randomQuestion.answerOne);
//   console.log('2. ', randomQuestion.answerTwo);
//   console.log('Correct answer:', randomQuestion.correctAnswer);
//   console.log(randomQuestion.id);
// } else {
//   console.log('No questions available.');
// }
// // // Question page
// // const startButton: any = document.querySelector('.start-quiz-button button');
const questionTextContainer = document.querySelector('.question-text-container');
//! //////////////////////////////////////////////////////////////
// const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;
// const abortQuizButton = document.querySelector(
//   '.abort-quiz-button'
// ) as HTMLButtonElement;
// // const playAgainButton = document.querySelector('#playAgainButton') as HTMLButtonElement;
// let questionCounter: number = 1;
// // ==================================================================================================
// // ------------------------------------------   NAVIGATION   ----------------------------------------
// // ==================================================================================================
// /*
//   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//   if (startButton) {
//     startButton.addEventListener('click', goToQuestionPage);
//   }
//   function goToQuestionPage(event: any): void {
//     event.preventDefault();
//     console.log('Knappen klickades!');
//     window.location.href = 'src/views/questionpage.html';
//   }
// */
// // ==================================================================================================
// // -------------------------------------   QUESTION ARRAYS   ------------------- (Question page) ----
// // ==================================================================================================
// const currentQuestionArray: object[] = []; // current Session Array
// const usedQuestionsArray: object[] = []; // used questions in this session
// function addToCurrentQuestionArray(question: object): void {
//   currentQuestionArray.push(question);
//   console.log(currentQuestionArray);
// }
// function addToUsedQuestionArray(question: object): void {
//   usedQuestionsArray.push(question);
//   console.log(usedQuestionsArray);
// }
// // ==================================================================================================
// // -------------------------------------   RENDER QUESTION   ------------------- (Question page) ----
// // ==================================================================================================
const renderQuestion = function (question) {
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
    /*
    let currentQuestionArray = [];
    let availableQuestions = [...QuizQuestions];
    */
    // getRandomObject(QuizQuestions);
    // addToCurrentQuestionArray(QuizQuestions);
    // addToUsedQuestionArray(QuizQuestions);
};
const randomQuestion = getRandomQuestion();
// Render the random question
if (randomQuestion) {
    renderQuestion(randomQuestion);
}
else {
    console.log('No questions available.');
}
// // startButton.addEventListener('click', () => {
// //   renderQuestion(QuizQuestions[0]);
// // });
// if (startButton !== null && startButton !== undefined) {
//   startButton.addEventListener('click', () => {
//     renderQuestion(QuizQuestions[0]);
//     window.location.href = '../../src/views/questionpage.html';
//   });
// }
// console.log('Hello world');
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const questionId = urlParams.get('questionId');
// if (questionId !== null && questionId !== undefined) {
//   const questionIndex = parseInt(questionId) - 1;
//   renderQuestion(QuizQuestions[questionIndex]);
// }
// // startButton.addEventListener('click', renderQuestion);
// // renderQuestion(QuizQuestions[0]);
// // ==================================================================================================
// // -------------------------------------   RANDOM GENERATOR   ------------------ (Question page) ----
// // ==================================================================================================
// /**
//  ** Random Generator
//  * @param array
//  * @returns a random object
//  */
// function getRandomObject<T>(array: T[]): T | undefined {
//   console.error('from random gen');
//   if (array.length === 0) {
//     return undefined;
//   }
//   const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }
// // const arr = ['cykel', 'bil', 'moped', 'boat', 'buss', 5, 52, 12];
// // console.log(getRandomObject(arr));
// // const randomQuestion = getRandomObject(QuizQuestions);
// // if (randomQuestion) {
// //   console.log('Random Question:', randomQuestion.question);
// //   console.log('Answer One:', randomQuestion.answerOne);
// //   console.log('Answer Two:', randomQuestion.answerTwo);
// //   console.log('Correct Answer:', randomQuestion.correctAnswer);
// // } else {
// //   console.log('QuizQuestions array is empty');
// // }
// // ==================================================================================================
// // ------------------------------------   TOTAL TIME TIMER --------------------- (Question page) ----
// // ==================================================================================================
// let timerValue = parseInt(localStorage.getItem('timerValue') ?? '0', 10);
// let intervalId: number | null = null;
// let paused = localStorage.getItem('paused') === 'true';
// const timerElement = document.querySelector('.timer') as HTMLDivElement;
// const pausedTimeElement = document.querySelector(
//   '#pausedTimer'
// ) as HTMLDivElement;
// // get paused time from localstorage
// //   const pausedTime = localStorage.getItem('pausedTime');
// // showing paused time if any
// //   if (pausedTime !== null) {
// //     pausedTimeElement.textContent = 'pausedTime';
// //   }
// function updateTimerDisplay(): void {
//   const minutes = Math.floor(timerValue / 60);
//   const seconds = timerValue % 60;
//   const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
//   const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
//   timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
// }
// function startTimer(): void {
//   intervalId = setInterval(() => {
//     timerValue += 1; // ändrat från "++" pga eslint
//     updateTimerDisplay();
//     if (timerValue >= 300) {
//       pauseTimer();
//     }
//   }, 1000);
//   updateTimerDisplay();
// }
// if (nextButton !== null) {
//   nextButton.addEventListener('click', pauseTimer);
// }
// function pauseTimer(): void {
//   const currentTime = timerElement.innerText;
//   localStorage.setItem('pausedTime', currentTime);
//   const pausedTime = localStorage.getItem('pausedTime');
//   paused = true;
//   if (pausedTime !== null && pausedTime !== undefined) {
//     pausedTimeElement.innerText = pausedTime;
//     console.log(pausedTime);
//   }
// }
// function resumeTimer(): void {
//   if (intervalId === null && paused) {
//     startTimer();
//     paused = false;
//   }
// }
// abortQuizButton.addEventListener('click', resetTimer);
// function resetTimer(): void {
//   timerValue = 0;
//   paused = false;
//   updateTimerDisplay();
//   localStorage.removeItem('pausedTime');
//   localStorage.setItem('timerValue', timerValue.toString());
//   localStorage.setItem('paused', paused.toString());
//   console.log('reset gjort');
//   window.location.href = '../../index.html';
// }
// const currentPage = window.location.pathname;
// if (currentPage.includes('question')) {
//   startTimer();
// }
// window.addEventListener('beforeunload', () => {
//   localStorage.setItem('timerValue', timerValue.toString());
//   localStorage.setItem('paused', paused.toString());
// });
// window.addEventListener('visibilitychange', () => {
//   if (document.visibilityState === 'visible') {
//     paused = localStorage.getItem('paused') === 'true';
//     resumeTimer();
//   }
// });
// // ==================================================================================================
// // ----------------------------------   QUESTION COUNTER   --------------------- (Question page) ----
// // ==================================================================================================
// // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
// if (nextButton) {
//   nextButton.addEventListener('click', countQuestions);
// }
// // Kolla antal ställda frågor
// function countQuestions(): void {
//   questionCounter = currentQuestionArray.length; // +1 ?
//   console.log('klicketiklick');
//   if (questionCounter < 10) {
//     // Kalla på funktionen som renderar ny fråga (som i sin tur randomiserar?)
//   } else {
//     checkIfHighscore();
//   }
// }
// function checkIfHighscore(): void {
//   // Kolla mot local storage
// }
// }); // DOMContentLoaded
console.log('Test question');
console.log('Test question');
console.log('Test question');
