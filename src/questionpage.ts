import { IQuizQuestion, QuizQuestions } from './models/Questions.js';

// ==================================================================================================
// ------------------------------------------   GLOBAL   --------------------------------------------
// ==================================================================================================

let questionCounter: number;

let currentSessionArray: number[] = [];
let usedQuestionsArray: IQuizQuestion[] = [];

const storedUsedQuestions = localStorage.getItem('usedQuestions');

if (storedUsedQuestions) {
  usedQuestionsArray = JSON.parse(storedUsedQuestions);
}

const nextButton = document.querySelector('#nextButton') as HTMLButtonElement;
const pointsCounter = document.querySelector('.points');
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

const renderPoints: any = function () {
  const storedPoints = localStorage.getItem('timeToPoints') || 0;

  if (pointsCounter) {
    const pointsHTML = `
    <p class="points-counter">Points: <span class="number">${storedPoints}</span></p>
    `;

    pointsCounter.innerHTML = pointsHTML;
  } else {
    console.log('Element not found');
  }
};

function saveToLocalStorage(): void {
  const usedQuestionsArrayAsString = JSON.stringify(usedQuestionsArray);
  localStorage.setItem('usedQuestions', usedQuestionsArrayAsString);
}

function clearusedQuestionsArray(): void {
  console.log('Clearing usedQuestionsArray');
  usedQuestionsArray.length = 0;
  saveToLocalStorage();
}

function getUsedQuestionsArray(): string[] {
  const storedArray = localStorage.getItem('usedQuestions');
  return storedArray ? JSON.parse(storedArray) : [];
}

// ==================================================================================================
// -----------------------------------------   TIMERS   ---------------------------------------------
// ==================================================================================================

// ====================================== TOTAL TIME TIMER ==========================================

let countUpTimerValue = parseInt(
  localStorage.getItem('countUpTimerValue') ?? '0',
  10
);

let countUpIntervalId: ReturnType<typeof setInterval>;
let countDownIntervalId: ReturnType<typeof setInterval>;

const timerElement = document.querySelector('.timer') as HTMLDivElement;

function updateTimerDisplay(): void {
  const minutes = Math.floor(countUpTimerValue / 60);
  const seconds = countUpTimerValue % 60;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer(): void {
  console.log('start timer');
  countUpIntervalId = setInterval(() => {
    countUpTimerValue += 1;
    updateTimerDisplay();
    if (countUpTimerValue >= 300) {
      stopTimer();
    }
  }, 1000);

  updateTimerDisplay();
}

function stopTimer(): void {
  clearInterval(countUpIntervalId);
  const currentTime = timerElement.innerText;

  localStorage.setItem('stoppedTime', currentTime);
  console.log('Value in localStorage:', localStorage.getItem('stoppedTime'));
}

// ====================================== COUNT DOWN TIMER ==========================================

const contentContainer: any = document.querySelector('.content-container');

function startTimerColorAnimation() {
  contentContainer.classList.remove('timer-color');
  void contentContainer.offsetWidth;
  contentContainer.classList.add('timer-color');
}

const updatePoints = function (newPoints: number) {
  localStorage.setItem('timeToPoints', newPoints.toString());

  renderPoints();
};

function addTocurrentSessionArray(id: number): void {
  currentSessionArray.push(id);
}

let timeLeft = 0;

export function startCountdownTimer(
  callback?: (timeLeft: number) => void
): void {
  clearInterval(countDownIntervalId);
  let seconds = 30;

  startTimerColorAnimation();
  countDownIntervalId = setInterval(() => {
    timeLeft = seconds;
    if (seconds === 0) {
      stopCountDownTimer();
      newQuestion();
      console.warn('TIME OUT');

      if (callback) {
        callback(timeLeft);
      }
    } else {
      timeLeft = seconds;
      seconds--;
      if (callback) {
        callback(timeLeft);
      }
    }
  }, 1000);
}

function stopCountDownTimer(): number {
  clearInterval(countDownIntervalId);
  console.log('Time left:', timeLeft);

  const currentPoints = parseInt(
    localStorage.getItem('timeToPoints') || '0',
    10
  );

  const updatedPoints = currentPoints + timeLeft;

  localStorage.setItem('timeToPoints', updatedPoints.toString());

  updatePoints(updatedPoints);

  return updatedPoints;
}

// ==================================================================================================
// -----------------------------------   RANDOM QUESTIONS   -----------------------------------------
// ==================================================================================================

const questionTextContainer: any = document.querySelector(
  '.question-text-container'
);

contentContainer.classList.add('timer-color');
const imageContainer: any = document.querySelector('.img-container');

export function getRandomQuestion(): IQuizQuestion | null {
  if (QuizQuestions.length === 0) {
    return null;
  }

  let randomQuestion: IQuizQuestion | null = null;
  let attempts = 0;

  while (true) {
    const randomIndex = Math.floor(Math.random() * QuizQuestions.length);
    randomQuestion = QuizQuestions[randomIndex];

    const isQuestionUsed = usedQuestionsArray.some((usedQuestion) => {
      return usedQuestion.id === randomQuestion!.id;
    });

    console.log('Attempts:', attempts);
    console.log('Random Index:', randomIndex);
    console.log('Is Question Used:', isQuestionUsed);
    console.log('Used Questions Array:', usedQuestionsArray);

    if (!isQuestionUsed) {
      usedQuestionsArray.push(randomQuestion);
      console.log('Selected Question:', randomQuestion);
      return randomQuestion;
    }

    attempts++;
  }
}

// ==================================================================================================
// -------------------------------------   RENDER QUESTIONS   ---------------------------------------
// ==================================================================================================

export const renderQuestion = function (question: IQuizQuestion | null): void {
  if (question && question.id !== undefined) {
    const answerOptions: string[] = [
      question.answerOne,
      question.answerTwo,
      question.correctAnswer,
    ];

    const { shuffledArray } = shuffleArray(answerOptions);

    const html = `
          <h2 class="question-counter">Question ${questionCounter + 1} / 10</h2>

          <p class="question-text">
          ${question.question}
          </p>

          <h3 class="answers">Answer Options</h3>

          <div class="answer-container">

          <label for="a1" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a1" value="${
            shuffledArray[0]
          }">
          1. &nbsp;<span class="answer">${shuffledArray[0]}</span>
          </label>

          <label for="a2" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a2" value="${
            shuffledArray[1]
          }">
          X. &nbsp; <span class="answer">${shuffledArray[1]}</span>
          </label>

          <label for="a3" class="answer-alternative">
          <input type="radio" class="answer-button" name="radio" id="a3" value="${
            shuffledArray[2]
          }">
          2. &nbsp;<span class="answer">${shuffledArray[2]}</span>
          </label>

          </div>
          `;
    let imageHTML = `
          <img
            src="${question.src}"
            alt="${question.alt}"
            width = 1920
            heigth = 1080>
          `;

    if (questionTextContainer) {
      questionTextContainer.innerHTML = html;
    } else {
      console.log('QT not found');
    }
    if (imageContainer) {
      imageContainer.innerHTML = imageHTML;
    } else {
      console.log('IMG not found');
    }
    addTocurrentSessionArray(question.id);
  } else {
    console.log('No ducking question found');
  }
};

function shuffleArray<T>(array: T[]): {
  shuffledArray: T[];
  correctAnswerIndex: number;
} {
  const shuffledArray = array.slice();
  let correctAnswerIndex = -1;

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];

    if (shuffledArray[i] === array[array.length - 1]) {
      correctAnswerIndex = i;
    }
  }

  return { shuffledArray, correctAnswerIndex };
}

function shuffleAnswerOptions(question: IQuizQuestion): void {
  const answerOptions: string[] = [
    question.answerOne,
    question.answerTwo,
    question.correctAnswer,
  ];

  shuffleArray(answerOptions);

  [question.answerOne, question.answerTwo, question.correctAnswer] =
    answerOptions;
}

let currentQuestion: IQuizQuestion | null = null;

function getCurrentQuestion(): IQuizQuestion | null {
  console.log('THIS IS NEW', currentQuestion);

  return currentQuestion;
}

export const newQuestion = function () {
  countQuestions();

  if (questionCounter < 10) {
    startCountdownTimer();

    const randomQuestion = getRandomQuestion();
    if (randomQuestion) {
      renderQuestion(randomQuestion as any);
      shuffleAnswerOptions(randomQuestion);

      currentQuestion = randomQuestion;

      nextButton.addEventListener('click', checkIfCorrectAnswer);
      console.warn('Render and stopCountdown');
      getCurrentQuestion();
    } else {
      console.log('No ducking questions available.');
    }
  } else {
    console.log('Q 10');
    navigateToResultPage();
  }
};

const startQuizFromStorage = localStorage.getItem('startQuiz');

if (startQuizFromStorage === 'true') {
  startTimer();
  newQuestion();
  localStorage.removeItem('startQuiz');
}

function buttonEffect(element: HTMLElement) {
  element.addEventListener('mouseover', () => {
    element.style.transform = 'rotate(3deg)';
  });

  element.addEventListener('mouseout', () => {
    element.style.transform = 'rotate(0deg)';
  });
}

export function addEffectToButton(button: any) {
  if (button) {
    buttonEffect(button);
  }
}

addEffectToButton(nextButton);
addEffectToButton(abortQuizButton);

// ==================================================================================================
// ----------------------------------   QUESTION COUNTER   ------------------------------------------
// ==================================================================================================

const navigateToResultPage = () => {
  stopTimer();
  window.location.href = './resultpage.html';
};

function countQuestions(): void {
  const usedQuestionsArray = getUsedQuestionsArray();
  questionCounter = currentSessionArray.length;

  if (currentSessionArray.length <= 10) {
    console.log('Length num Q', questionCounter);
    saveToLocalStorage();
  }

  if (usedQuestionsArray.length >= 20) {
    clearusedQuestionsArray();
  }

  console.log('current session:', currentSessionArray);
}

// ==================================================================================================
// ------------------------------   CHECK IF CORRECT ANSWER   ---------------------------------------
// ==================================================================================================

export const userAnswerChoices: {
  id: number;
  answer: string;
  isCorrect: boolean;
}[] = [];

export function checkIfCorrectAnswer() {
  const selectedAnswer = document.querySelector(
    'input[name="radio"]:checked'
  ) as HTMLInputElement;

  if (!selectedAnswer) {
    alert('Quack a question');
    return;
  }

  const userAnswer = selectedAnswer.value;
  const currentQuestion = getCurrentQuestion();

  let isCorrect = false;

  if (currentQuestion && userAnswer === currentQuestion.correctAnswer) {
    console.log('YAY');
    isCorrect = true;

    const correctAnswersCount = parseInt(
      localStorage.getItem('correctAnswersCount') || '0',
      10
    );
    localStorage.setItem(
      'correctAnswersCount',
      (correctAnswersCount + 1).toString()
    );

    stopCountDownTimer();
  } else if (currentQuestion) {
    console.log('NAY');
  }
  const answerObject = {
    id: userAnswerChoices.length + 1,
    answer: userAnswer,
    isCorrect: isCorrect,
  };
  userAnswerChoices.push(answerObject);
  localStorage.setItem('answers', JSON.stringify(userAnswerChoices));

  newQuestion();
}
console.log();
