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
        <p class="highscore">${index + 1}. <span>${score._name}, ${score._totalPoints}p, ${score._totalTime}m</span></p>
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
    <a href="../../src/views/questionpage.html?questionId=1">
      <button class="next-button" id="playAgainButton">Play again</button>
    </a>
  `;
    //!
    const highscoreListContainer = document.querySelector('.content-container');
    highscoreListContainer.innerHTML = highscoreHTML;
};
renderHighscoreList();
