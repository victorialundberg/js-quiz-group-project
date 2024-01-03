/* eslint-disable */
import './scss/style.scss'; // Importera huvud-SCSS-filen

// import HighscoreList from './models/HighscoreList';
import QuizQuestions from './models/Questions';

const startButton: any = document.querySelector('.start-quiz-button button');


const questionTextContainer: any = document.querySelector(
  '.question-text-container'
);


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
  console.error('Start button not found');
}

console.log('Hello world');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const questionId = urlParams.get('questionId');

if (questionId) {
  const questionIndex = parseInt(questionId) - 1;
  renderQuestion(QuizQuestions[questionIndex]);
} else {
  console.log('Question ID not found');
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

/*
const nextButton: any = document.querySelector('.next-button button');
nextButton.addEventListener('click', () => {
countQuestions;
});
*/


// Array för frågor som ställts hittils

let currentQuestionArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let questionCounter:number;

document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
  console.log(nextButton);
  if (nextButton) {
    nextButton.addEventListener('click', countQuestions);
  }
});

function countQuestions () {
  questionCounter = currentQuestionArray.length;
  if (questionCounter < 10) {
    //Rendera ny fråga
  }
  else checkIfHighscore();
}

function checkIfHighscore () {
//Kolla mot local storage
}


