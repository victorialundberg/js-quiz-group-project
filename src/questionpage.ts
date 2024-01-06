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

//! ////////////////////////////////////////////////////////////////////

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
//! //////////////////////////////////////////////////////////////

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
};

const randomQuestion = getRandomQuestion();

// Render the random question
if (randomQuestion) {
  renderQuestion(randomQuestion as any);
} else {
  console.log('No questions available.');
}
