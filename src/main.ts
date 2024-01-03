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
};

startButton.addEventListener('click', () => {
  renderQuestion(QuizQuestions[0]);
});

console.log('Hello world');

// startButton.addEventListener('click', renderQuestion);

// renderQuestion(QuizQuestions[0]);
