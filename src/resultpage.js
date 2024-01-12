import { addEffectToButton } from './questionpage.js';
const printTime = localStorage.getItem('stoppedTime');
const abortQuizButton = document.querySelector('.abort-quiz-button');
const clearStorage = function () {
    localStorage.removeItem('answers');
    localStorage.removeItem('timeToPoints');
    localStorage.removeItem('stoppedTime');
    localStorage.removeItem('correctAnswersCount');
};
addEffectToButton(abortQuizButton);
abortQuizButton.addEventListener('click', clearStorage);
const renderResults = function () {
    const storedQuestions = localStorage.getItem('answers');
    const result = storedQuestions ? JSON.parse(storedQuestions) : [];
    const correctAnswersCount = localStorage.getItem('correctAnswersCount');
    let resultHTML = `
   <div class="result-text-container">
   <div class="result-title-your-result">
   <h2 class="result-title">Results</h2>
   <p class="your-result">You got ${correctAnswersCount || 0}/10 correct answers</p>
   </div>
  
   <div class="answers-container">
   <h3 class="answers-title">Your answers</h3>
  
   <div class="answers-1to5">
      ${result
        .slice(0, 5)
        .map((questionObj, index) => `
              <p class="answer">${index + 1}. <span>${questionObj.answer}</span> - ${questionObj.isCorrect ? '✅' : '💀'}</p>
            `)
        .join('')}
    </div>
  
   <div class="answers-6to10">
   ${result
        .slice(5, 10)
        .map((questionObj, index) => `
              <p class="answer">${index + 6}. <span>${questionObj.answer}</span> - ${questionObj.isCorrect ? '✅' : '💀'}</p>
            `)
        .join('')}
   </div>
   </div>
  
   <div class="input-wrapper"></div>
  
   </div>
  
  `;
    console.log(result);
    const resultsList = document.querySelector('.content-container');
    resultsList.innerHTML = resultHTML;
};
const pointsCounter = document.querySelector('.points');
const renderPoints = function () {
    const storedPoints = localStorage.getItem('timeToPoints') || 0;
    if (pointsCounter) {
        const pointsHTML = `
    <p class="points-counter">Points: <span class="number">${storedPoints}</span></p>
    `;
        pointsCounter.innerHTML = pointsHTML;
    }
};
const renderTimer = function () {
    const timerElement = document.querySelector('.timer');
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
function renderInputField() {
    const points = parseInt(localStorage.getItem('timeToPoints') || '0', 10);
    console.log('INPUT POINTS', points);
    let inputHTML = `
  <input type="text" class="input-name" placeholder="Your name here">
  <button class="submit-button button-effect" aria-label="submit-button"><img src="../assets/images/ducks-with-signs/SubmitDuck.webp"
  alt="Duck with sign saying 'submit'" width="130" height="100" loading="lazy"></button>
  `;
    let inputNotHighscoreHTML = `
  <button class="next-button button-effect" aria-label="next-button"><img src="../assets/images/ducks-with-signs/NextDuck.webp"
  alt="Duck with sign saying 'next'" width="130" height="100" loading="lazy"></button>

  `;
    const resultsList = document.querySelector('.input-wrapper');
    let highscoreListArrayString = localStorage.getItem('highScores');
    let highscoreListArray = JSON.parse(highscoreListArrayString || '[]');
    if (highscoreListArray.length <= 10 ||
        points > highscoreListArray[highscoreListArray.length - 1]._totalPoints) {
        resultsList.innerHTML = inputHTML;
        const submitButton = document.querySelector('.submit-button');
        addEffectToButton(submitButton);
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            saveInputName();
            navigateToHighscorePage();
        });
    }
    else {
        resultsList.innerHTML = inputNotHighscoreHTML;
        const navigateToHighscoreBtn = document.querySelector('.next-button');
        navigateToHighscoreBtn.addEventListener('click', navigateToHighscorePage);
        console.log('Where is my ducking button');
    }
}
function saveInputName() {
    let nameInput = document.querySelector('.input-name');
    if (nameInput) {
        let playerName = nameInput.value;
        const points = parseInt(localStorage.getItem('timeToPoints') || '0', 10);
        const time = parseInt(localStorage.getItem('stoppedTime') || '0', 10);
        console.log('Time from localStorage:', time);
        let newScore = {
            _name: playerName,
            _totalPoints: points,
        };
        let highscoreList = JSON.parse(localStorage.getItem('highScores') || '[]');
        highscoreList.push(newScore);
        highscoreList.sort((a, b) => b._totalPoints - a._totalPoints);
        if (highscoreList.length > 10) {
            highscoreList = highscoreList.slice(0, 10);
        }
        localStorage.setItem('highScores', JSON.stringify(highscoreList));
        console.log('After adding new score:', highscoreList);
        nameInput.value = '';
    }
    else {
        console.log('Name input field not found');
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
