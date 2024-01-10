const renderResults = function (): void {
  let resultHTML = `
    <div class="result-text-container">
        <div class="result-title-your-result">
            <h2 class="result-title">Results</h2>
            <p class="your-result">You got 4/10 correct answers</p>
        </div>

        <div class="answers-container">
            <h3 class="answers-title">Your answers</h3>

            <div class="answers-1to5">
                <p class="answer">1. <span>-</span></p>
                <p class="answer">2. <span>-</span></p>
                <p class="answer">3. <span>-</span></p>
                <p class="answer">4. <span>-</span></p>
                <p class="answer">5. <span>-</span></p>
            </div>

            <div class="answers-6to10">
                <p class="answer">6. <span>-</span></p>
                <p class="answer">7. <span>eflknsdlfkn</span></p>
                <p class="answer">8. <span>-</span></p>
                <p class="answer">9. <span>-</span></p>
                <p class="answer">10. <span>-</span></p>
            </div>
        </div>

        <div class="input-wrapper">HALLOJ</div>
        
    </div>
    
  `;

  const resultsList: any = document.querySelector('.content-container');

  resultsList.innerHTML = resultHTML;
};

renderResults();
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
  let currentScore: number = 750;
  let lowestScore: number = 800;

  let inputHTML = `
  <input type="text" class="input-name" placeholder="Your name here">
  <button class="submit-button">Next</button>
  <button class="next-button">Next</button>
  `;

  // const resultsList: any = document.querySelector('.input-wrapper');
  const resultsList: any = document.querySelector('.input-wrapper');

  // let highscoreListArrayString = localStorage.getItem('highScores');
  // let highscoreListArray: any[] = JSON.parse(highscoreListArrayString || '[]');
  // let lowestScore: number = highscoreListArray[9];

  if (currentScore > lowestScore) {
    resultsList.innerHTML = inputHTML;

    const submitButton: any = document.querySelector(
      '.submit-button'
    ) as HTMLButtonElement | null;
    submitButton.addEventListener('click', saveInputName);
  } else {
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
    let name = nameInput.value;
    localStorage.setItem('userName', name);
    console.log(name);
  } else {
    console.log('DUCK IT RIGHT');
  }
}

// const navigateToHighscorePage = () => {
//   // localStorage.setItem('startQuiz', 'true');
//   window.location.href = './src/views/highscorepage.html';

//   /* const currentPage = window.location.pathname;

//   if (currentPage.includes('result')) {
//   } */
// };

renderInputField();
console.log('Hej');
