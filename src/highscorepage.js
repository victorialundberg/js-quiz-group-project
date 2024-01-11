"use strict";
const renderHighscoreList = function () {
    let highscoreHTML = `
    <h2 class="highscore-title">Highscore</h2>
    <div class="highscore-container">
        <div class="highscore-1to5">
  `;
    const storedHighscores = localStorage.getItem('highScores');
    const scores = storedHighscores ? JSON.parse(storedHighscores) : [];
    console.table(storedHighscores);
    console.log(scores);
    //!
    console.log(scores.length);
    if (scores.length > 0) {
        scores.slice(0, 5).forEach((score, index) => {
            highscoreHTML += `
        <p class="highscore">${index + 1}. <span>${score._name}, ${score._totalPoints}p, ${score._totalTime} minutes</span></p>
      `;
        });
        highscoreHTML += `
          </div>
          <div class="highscore-6to10">
    `;
        scores.slice(5, 10).forEach((score, index) => {
            highscoreHTML += `
        <p class="highscore">${index + 6}. <span>${score._name}, ${score._totalPoints}p, ${score._totalTime}m</span></p>
      `;
        });
    }
    else {
        highscoreHTML += `<p>No high scores yet.</p>`;
    }
    highscoreHTML += `
        </div>
    </div>
    
      <button class="next-button" id="playAgainButton" aria-label="next-button"><img src="../assets/images/ducks-with-signs/PlayAgainDuck.webp"
      alt="Duck with sign saying 'next'" width="130" height="100" loading="lazy"></button>
    
      `;
    //!
    const highscoreListContainer = document.querySelector('.content-container');
    highscoreListContainer.innerHTML = highscoreHTML;
    const playAgainButton = document.querySelector('#playAgainButton');
    playAgainButton.addEventListener('click', startQuizFromHighscore);
};
const navigateToQuestionPageFromHighscore = () => {
    localStorage.setItem('startQuiz', 'true');
    window.location.href = './questionpage.html';
};
const startQuizFromHighscore = function () {
    navigateToQuestionPageFromHighscore();
};
renderHighscoreList();
