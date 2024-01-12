import { addEffectToButton } from './questionpage.js';
const renderHighscoreList = function (): void {
  let highscoreHTML = `
    <h2 class="highscore-title">Highscore</h2>
    <div class="highscore-container">
        <div class="highscore-1to5">
  `;

  const storedHighscores = localStorage.getItem('highScores');
  const scores = storedHighscores ? JSON.parse(storedHighscores) : [];

  console.table(storedHighscores);
  console.log(scores);

  console.log(scores.length);

  if (scores.length > 0) {
    scores.slice(0, 5).forEach((score: any, index: number) => {
      highscoreHTML += `
        <p class="highscore">${index + 1}. <span>${score._name}, ${
          score._totalPoints
        }p</span></p>
      `;
    });

    highscoreHTML += `
          </div>
          <div class="highscore-6to10">
    `;

    scores.slice(5, 10).forEach((score: any, index: number) => {
      highscoreHTML += `
        <p class="highscore">${index + 6}. <span>${score._name}, ${
          score._totalPoints
        }p</span></p>
      `;
    });
  } else {
    highscoreHTML += `<p>No high scores yet.</p>`;
  }

  highscoreHTML += `
        </div>
    </div>
    
      <button class="next-button button-effect" id="playAgainButton" aria-label="next-button"><img src="../assets/images/ducks-with-signs/PlayAgainDuck.webp"
      alt="Duck with sign saying 'next'" width="130" height="100" loading="lazy"></button>
    
      `;

  const highscoreListContainer: any =
    document.querySelector('.content-container');
  highscoreListContainer.innerHTML = highscoreHTML;
  const playAgainButton: any = document.querySelector('#playAgainButton');
  addEffectToButton(playAgainButton);
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
