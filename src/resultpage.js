"use strict";
const renderResults = function () {
    const storedQuestions = localStorage.getItem('usedQuestions');
    const result = storedQuestions ? JSON.parse(storedQuestions) : [];
    let resultHTML = `
  <div class="result-text-container">
  <div class="result-title-your-result">
  <h2 class="result-title">Results</h2>
  <p class="your-result">You got 4/10 correct answers</p>
  </div>
  
  <div class="answers-container">
  <h3 class="answers-title">Your answers</h3>
  
  <div class="answers-1to5">
      ${result
        .slice(0, 5)
        .map((questionObj, index) => `
              <p class="answer">${index + 1}. <span>${questionObj.correctAnswer}</span></p>
            `)
        .join('')}
    </div>
  
  <div class="answers-6to10">
  ${result
        .slice(5, 10)
        .map((questionObj, index) => `
              <p class="answer">${index + 6}. <span>${questionObj.correctAnswer}</span></p>
            `)
        .join('')}
  </div>
  </div>
  
  <div class="input-wrapper">HALLOJ</div>
  
  </div>
  
  `;
    console.log(result);
    const resultsList = document.querySelector('.content-container');
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
    let currentScore = 100;
    // let lowestScore: number = 500;
    let inputHTML = `
  <input type="text" class="input-name" placeholder="Your name here">
  <button class="submit-button">Submit</button>
  `;
    let inputNotHighscoreHTML = `
  <button class="next-button">Next</button>

  `;
    // const resultsList: any = document.querySelector('.input-wrapper');
    const resultsList = document.querySelector('.input-wrapper');
    let highscoreListArrayString = localStorage.getItem('highScores');
    let highscoreListArray = JSON.parse(highscoreListArrayString || '[]');
    let lowestScore = highscoreListArray[9]._totalPoints;
    if (currentScore > lowestScore) {
        resultsList.innerHTML = inputHTML;
        const submitButton = document.querySelector('.submit-button');
        submitButton.addEventListener('click', saveInputName);
    }
    else {
        resultsList.innerHTML = inputNotHighscoreHTML;
        const navigateToHighscoreBtn = document.querySelector('.next-button');
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
    let nameInput = document.querySelector('.input-name');
    if (nameInput) {
        let _name = nameInput.value;
        localStorage.setItem('userName', _name);
        console.log(_name);
    }
    else {
        console.log('DUCK IT RIGHT');
    }
}
const navigateToHighscorePage = () => {
    window.location.href = 'highscorepage.html';
};
renderInputField();
console.log('Hej');
