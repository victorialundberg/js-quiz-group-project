const printTime = localStorage.getItem('stoppedTime');
const abortQuizButton = document.querySelector(
  '.abort-quiz-button'
) as HTMLAnchorElement;

const clearStorage = function () {
  localStorage.removeItem('answers');
  localStorage.removeItem('timeToPoints');
  localStorage.removeItem('stoppedTime');
  localStorage.removeItem('correctAnswersCount');
};

abortQuizButton.addEventListener('click', clearStorage);

const renderResults = function (): void {
  const storedQuestions = localStorage.getItem('answers');
  const result = storedQuestions ? JSON.parse(storedQuestions) : [];
  const correctAnswersCount = localStorage.getItem('correctAnswersCount');

  let resultHTML = `
   <div class="result-text-container">
   <div class="result-title-your-result">
   <h2 class="result-title">Results</h2>
   <p class="your-result">You got ${
     correctAnswersCount || 0
   }/10 correct answers</p>
   </div>
  
   <div class="answers-container">
   <h3 class="answers-title">Your answers</h3>
  
   <div class="answers-1to5">
      ${result
        .slice(0, 5)
        .map(
          (questionObj: any, index: number) => `
              <p class="answer">${index + 1}. <span>${
                questionObj.answer
              }</span></p>
            `
        )
        .join('')}
    </div>
  
   <div class="answers-6to10">
   ${result
     .slice(5, 10)
     .map(
       (questionObj: any, index: number) => `
              <p class="answer">${index + 6}. <span>${
                questionObj.answer
              }</span></p>
            `
     )
     .join('')}
   </div>
   </div>
  
   <div class="input-wrapper">HALLOJ</div>
  
   </div>
  
  `;

  console.log(result);

  const resultsList: any = document.querySelector('.content-container');

  resultsList.innerHTML = resultHTML;
};

const pointsCounter = document.querySelector('.points');
const renderPoints: any = function () {
  const storedPoints = localStorage.getItem('timeToPoints') || 0;

  if (pointsCounter) {
    const pointsHTML = `
    <p class="points-counter">Points: <span class="number">${storedPoints}</span></p>
    `;
    pointsCounter.innerHTML = pointsHTML;
  }
};

const renderTimer: any = function () {
  const timerElement = document.querySelector('.timer') as HTMLDivElement;

  if (timerElement) {
    timerElement.innerText = `${printTime}`;
  }
};

renderResults();
renderPoints();
renderTimer();
console.log();

// ==================================================================================================
// -----------------------------------   HIGHSCORE CHECK   ------------------------------------------
// ==================================================================================================

// Funktion som tar in currentScore
// Kollar highscore i local storage

// function checkIfHighscore(): void {

//   let highscoreListArrayString = localStorage.getItem('highScores');
//   let highscoreListArray: any[] = JSON.parse(highscoreListArrayString || '[]');
//   let lowestScore: number = highscoreListArray[9];

//   if (currentScore > lowestScore) {
//     renderInputField();
//   } else {
//     renderNextButton();
//   }

//   // if > index 9 run functions for
//   // render input, from input:
//   // add name
//   // set highscore
//   // store to local
//   // else render next button

//   // currentSession, set name
// }

function renderInputField() {
  let currentScore: number = 500;
  // let lowestScore: number = 500;

  let inputHTML = `
  <input type="text" class="input-name" placeholder="Your name here">
  <button class="submit-button" aria-label="submit-button"><img src="../assets/images/ducks-with-signs/SubmitDuck.webp"
  alt="Duck with sign saying 'submit'" width="130" height="100" loading="lazy"></button>
  `;

  let inputNotHighscoreHTML = `
  <button class="next-button" aria-label="next-button"><img src="../assets/images/ducks-with-signs/NextDuck.webp"
  alt="Duck with sign saying 'next'" width="130" height="100" loading="lazy"></button>

  `;

  // const resultsList: any = document.querySelector('.input-wrapper');
  const resultsList: any = document.querySelector('.input-wrapper');

  let highscoreListArrayString = localStorage.getItem('highScores');
  let highscoreListArray: any[] = JSON.parse(highscoreListArrayString || '[]');
  let lowestScore: number = highscoreListArray[9]._totalPoints;

  if (currentScore > lowestScore) {
    resultsList.innerHTML = inputHTML;

    const submitButton: any = document.querySelector(
      '.submit-button'
    ) as HTMLButtonElement | null;
    submitButton.addEventListener('click', saveInputName);
    submitButton.addEventListener('click', navigateToHighscorePage);
  } else {
    resultsList.innerHTML = inputNotHighscoreHTML;

    const navigateToHighscoreBtn: any = document.querySelector('.next-button');
    navigateToHighscoreBtn.addEventListener('click', navigateToHighscorePage);
    // const nextButton: any = document.querySelector('.next-button');
    // navigateToHighscorePage();
    console.log('Where is my ducking button');
  }

  // resultsList.innerHTML = inputHTML;
}

// function renderNextButton() {
//   let inputHTML = `
//     <button class="next-button">Next</button>`;
//   const resultsList: any = document.querySelector('.input-wrapper');
//   resultsList.innerHTML = inputHTML;
// }

function saveInputName() {
  let nameInput = document.querySelector(
    '.input-name'
  ) as HTMLInputElement | null;
  if (nameInput) {
    let _name = nameInput.value;
    localStorage.setItem('userName', _name);
    console.log(_name);
  } else {
    console.log('DUCK IT RIGHT');
  }
}

const navigateToHighscorePage = () => {
  window.location.href = './highscorepage.html';
  localStorage.removeItem('answers');
  localStorage.removeItem('timeToPoints');
  localStorage.removeItem('stoppedTime');
  localStorage.removeItem('correctAnswersCount');
};

renderInputField();
console.log('Hej');
