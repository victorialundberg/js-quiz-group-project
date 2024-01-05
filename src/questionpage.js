"use strict";
/* eslint-disable comma-dangle */
// import './scss/style.scss'; // Importera huvud-SCSS-filen
Object.defineProperty(exports, "__esModule", { value: true });
// import HighscoreList from './models/HighscoreList';
var Questions_1 = require("./models/Questions");
document.addEventListener('DOMContentLoaded', function () {
    // ==================================================================================================
    // ------------------------------------------   GLOBAL   --------------------------------------------
    // ==================================================================================================
    var _a;
    // Question page
    var startButton = document.querySelector('.start-quiz-button button');
    var questionTextContainer = document.querySelector('.question-text-container');
    var nextButton = document.querySelector('#nextButton');
    var abortQuizButton = document.querySelector('.abort-quiz-button');
    // const playAgainButton = document.querySelector('#playAgainButton') as HTMLButtonElement;
    var questionCounter = 1;
    // ==================================================================================================
    // ------------------------------------------   NAVIGATION   ----------------------------------------
    // ==================================================================================================
    /*
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (startButton) {
      startButton.addEventListener('click', goToQuestionPage);
    }
    function goToQuestionPage(event: any): void {
      event.preventDefault();
      console.log('Knappen klickades!');
      window.location.href = 'src/views/questionpage.html';
    }
  */
    // ==================================================================================================
    // -------------------------------------   QUESTION ARRAYS   ------------------- (Question page) ----
    // ==================================================================================================
    var currentQuestionArray = []; // current Session Array
    var usedQuestionsArray = []; // used questions in this session
    function addToCurrentQuestionArray(question) {
        currentQuestionArray.push(question);
        console.log(currentQuestionArray);
    }
    function addToUsedQuestionArray(question) {
        usedQuestionsArray.push(question);
        console.log(usedQuestionsArray);
    }
    // ==================================================================================================
    // -------------------------------------   RENDER QUESTION   ------------------- (Question page) ----
    // ==================================================================================================
    var renderQuestion = function (question) {
        console.log('Rendering question:', question);
        var html = "\n  <h2 class=\"question-counter\">Question ".concat(questionCounter, " / 10</h2>\n\n  <p class=\"question-text\">\n      ").concat(question.question, "\n  </p>\n\n  <h3 class=\"answers\">Answer Options</h3>\n\n  <div class=\"answer-container\">\n\n      <label for=\"a1\" class=\"answer-alternative\">\n          <input type=\"radio\" class=\"answer-button\" name=\"radio\" id=\"a1\">\n          1. &nbsp;<span class=\"answer\">").concat(question.answerOne, "</span>\n      </label>\n\n      <label for=\"a2\" class=\"answer-alternative\">\n          <input type=\"radio\" class=\"answer-button\" name=\"radio\" id=\"a2\">\n          X. &nbsp; <span class=\"answer\">").concat(question.answerTwo, "</span>\n      </label>\n\n      <label for=\"a3\" class=\"answer-alternative\">\n          <input type=\"radio\" class=\"answer-button\" name=\"radio\" id=\"a3\">\n          2. &nbsp;<span class=\"answer\">").concat(question.correctAnswer, "</span>\n      </label>\n\n  </div>\n  ");
        questionTextContainer.innerHTML = html;
        /*
      let currentQuestionArray = [];
      let availableQuestions = [...QuizQuestions];
      */
        getRandomObject(Questions_1.default);
        addToCurrentQuestionArray(Questions_1.default);
        addToUsedQuestionArray(Questions_1.default);
    };
    // startButton.addEventListener('click', () => {
    //   renderQuestion(QuizQuestions[0]);
    // });
    if (startButton !== null && startButton !== undefined) {
        startButton.addEventListener('click', function () {
            renderQuestion(Questions_1.default[0]);
            window.location.href = '../../src/views/questionpage.html';
        });
    }
    console.log('Hello world');
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var questionId = urlParams.get('questionId');
    if (questionId !== null && questionId !== undefined) {
        var questionIndex = parseInt(questionId) - 1;
        renderQuestion(Questions_1.default[questionIndex]);
    }
    // startButton.addEventListener('click', renderQuestion);
    // renderQuestion(QuizQuestions[0]);
    // ==================================================================================================
    // -------------------------------------   RANDOM GENERATOR   ------------------ (Question page) ----
    // ==================================================================================================
    /**
     ** Random Generator
     * @param array
     * @returns a random object
     */
    function getRandomObject(array) {
        console.error('from random gen');
        if (array.length === 0) {
            return undefined;
        }
        var randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
    // const arr = ['cykel', 'bil', 'moped', 'boat', 'buss', 5, 52, 12];
    // console.log(getRandomObject(arr));
    // const randomQuestion = getRandomObject(QuizQuestions);
    // if (randomQuestion) {
    //   console.log('Random Question:', randomQuestion.question);
    //   console.log('Answer One:', randomQuestion.answerOne);
    //   console.log('Answer Two:', randomQuestion.answerTwo);
    //   console.log('Correct Answer:', randomQuestion.correctAnswer);
    // } else {
    //   console.log('QuizQuestions array is empty');
    // }
    // ==================================================================================================
    // ------------------------------------   TOTAL TIME TIMER --------------------- (Question page) ----
    // ==================================================================================================
    var timerValue = parseInt((_a = localStorage.getItem('timerValue')) !== null && _a !== void 0 ? _a : '0', 10);
    var intervalId = null;
    var paused = localStorage.getItem('paused') === 'true';
    var timerElement = document.querySelector('.timer');
    var pausedTimeElement = document.querySelector('#pausedTimer');
    // get paused time from localstorage
    //   const pausedTime = localStorage.getItem('pausedTime');
    // showing paused time if any
    //   if (pausedTime !== null) {
    //     pausedTimeElement.textContent = 'pausedTime';
    //   }
    function updateTimerDisplay() {
        var minutes = Math.floor(timerValue / 60);
        var seconds = timerValue % 60;
        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
        var formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
        timerElement.textContent = "".concat(formattedMinutes, ":").concat(formattedSeconds);
    }
    function startTimer() {
        intervalId = setInterval(function () {
            timerValue += 1; // ändrat från "++" pga eslint
            updateTimerDisplay();
            if (timerValue >= 300) {
                pauseTimer();
            }
        }, 1000);
        updateTimerDisplay();
    }
    if (nextButton !== null) {
        nextButton.addEventListener('click', pauseTimer);
    }
    function pauseTimer() {
        var currentTime = timerElement.innerText;
        localStorage.setItem('pausedTime', currentTime);
        var pausedTime = localStorage.getItem('pausedTime');
        paused = true;
        if (pausedTime !== null && pausedTime !== undefined) {
            pausedTimeElement.innerText = pausedTime;
        }
    }
    function resumeTimer() {
        if (intervalId === null && paused) {
            startTimer();
            paused = false;
        }
    }
    abortQuizButton.addEventListener('click', resetTimer);
    function resetTimer() {
        timerValue = 0;
        paused = false;
        updateTimerDisplay();
        localStorage.removeItem('pausedTime');
        localStorage.setItem('timerValue', timerValue.toString());
        localStorage.setItem('paused', paused.toString());
        console.log('reset gjort');
        window.location.href = '../../index.html';
    }
    var currentPage = window.location.pathname;
    if (currentPage.includes('question')) {
        startTimer();
    }
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('timerValue', timerValue.toString());
        localStorage.setItem('paused', paused.toString());
    });
    window.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            paused = localStorage.getItem('paused') === 'true';
            resumeTimer();
        }
    });
    // ==================================================================================================
    // ----------------------------------   QUESTION COUNTER   --------------------- (Question page) ----
    // ==================================================================================================
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (nextButton) {
        nextButton.addEventListener('click', countQuestions);
    }
    // Kolla antal ställda frågor
    function countQuestions() {
        questionCounter = currentQuestionArray.length; // +1 ?
        console.log('klicketiklick');
        if (questionCounter < 10) {
            // Kalla på funktionen som renderar ny fråga (som i sin tur randomiserar?)
        }
        else {
            checkIfHighscore();
        }
    }
    function checkIfHighscore() {
        // Kolla mot local storage
    }
}); // DOMContentLoaded
console.log('Test question');
console.log('Test question');
console.log('Test question');
