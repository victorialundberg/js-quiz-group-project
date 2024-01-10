import { HighscoreList } from './models/HighscoreList.js';
import { ScoreItem } from './models/Score.js';

const score = new ScoreItem(1, 'Jari', 200, 120);
const score2 = new ScoreItem(1, 'Linda', 200, 120);
const score3 = new ScoreItem(1, 'Jenni', 200, 120);
const score4 = new ScoreItem(1, 'Caroline', 200, 120);
const score5 = new ScoreItem(1, 'Victoria', 200, 120);
const score6 = new ScoreItem(1, 'Ellinor', 200, 120);
const score7 = new ScoreItem(1, 'Jari', 200, 120);
const score8 = new ScoreItem(1, 'Karl', 200, 120);
const score9 = new ScoreItem(1, 'Sture', 200, 120);
const score10 = new ScoreItem(1, 'Klas', 200, 120);

// name, totalPoints, totalTime

const highscoreList = HighscoreList.instance;
highscoreList.addScore(score);
highscoreList.addScore(score2);
highscoreList.addScore(score3);
highscoreList.addScore(score4);
highscoreList.addScore(score5);
highscoreList.addScore(score6);
highscoreList.addScore(score7);
highscoreList.addScore(score8);
highscoreList.addScore(score9);
highscoreList.addScore(score10);
highscoreList.save();

const scores = highscoreList.list;

console.log('High Scores:');
scores.forEach((score) => {
  console.log(
    `ID: ${score.id}, Name: ${score.name}, Points: ${score.totalPoints}, Time: ${score.totalTime}`
  );
});

const navigateToQuestionPage = () => {
  localStorage.setItem('startQuiz', 'true');
  window.location.href = './src/views/questionpage.html';
};

const startBtn: any = document.querySelector('.start-quiz-button');

const startQuiz = function () {
  navigateToQuestionPage();
};

startBtn.addEventListener('click', startQuiz);
