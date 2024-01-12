"use strict";
const renderHighscoreListMain = function () {
    let highscoreHTMLMain = `
    <a href="./src/views/highscorepage.html">
            <p class="highscore-heading">High Score</p>
          </a>
          <div class="highscore-landing-text-container"></div>
          <div class="right-eye-container">
            <div class="right-pupil"></div>
          </div>
  `;
    const storedHighscores = localStorage.getItem('highScores');
    const scores = storedHighscores ? JSON.parse(storedHighscores) : [];
    console.log(scores.length);
    if (scores.length > 0) {
        scores.slice(0, 5).forEach((score, index) => {
            highscoreHTMLMain += `
        <p class="highscore-landing-1to5">${index + 1}. <span>${score._name}, ${score._totalPoints}p</span></p>
      `;
        });
    }
    else if (scores.length < 0) {
        highscoreHTMLMain = `
    <p class="highscore-landing-1to5">No highscores set yet</p>
    `;
    }
    const highscoreListContainer = document.querySelector('.highscore-landing');
    highscoreListContainer.innerHTML = highscoreHTMLMain;
};
renderHighscoreListMain();
const navigateToQuestionPage = () => {
    localStorage.setItem('startQuiz', 'true');
    window.location.href = './src/views/questionpage.html';
};
const startBtn = document.querySelector('.start-quiz-button');
const startQuiz = function () {
    navigateToQuestionPage();
};
startBtn.addEventListener('click', startQuiz);
