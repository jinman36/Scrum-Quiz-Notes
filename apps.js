const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'what is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '12',
    choice4: '9',
    answer: 4,
  },
  {
    question: 'what is 3 + 6?',
    choice1: '2',
    choice2: '4',
    choice3: '12',
    choice4: '9',
    answer: 9,
  },
  {
    question: 'what is 2 + 10?',
    choice1: '2',
    choice2: '4',
    choice3: '12',
    choice4: '9',
    answer: 12,
  },
  {
    question: 'what is 2 + 0?',
    choice1: '2',
    choice2: '4',
    choice3: '12',
    choice4: '9',
    answer: 2,
  }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

gameStart = () => {
  questionsCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('/end.html');
  }
  questionsCounter++;

  progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionsCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)

  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
};

gameStart()

