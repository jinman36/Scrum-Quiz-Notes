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
    question: 'what statement best describes Scrum?',
    choice1: 'A cookbook that defines best practices for software development',
    choice2: 'A defined and predictive process that fits in with traditional management approaches',
    choice3: 'A complete methodology that defines how to develop software',
    choice4: 'A framework with built-in reality checks for complex work in uncertain domains',
    answer: 4,
  },
  {
    question: 'When is Sprint execution completed?',
    choice1: 'It depends',
    choice2: 'When all planned Product Backlog Items meet their definition of "done"',
    choice3: 'When the timebox expires',
    choice4: 'When all tasks are complete',
    answer: 3,
  },
  {
    question: 'How often should Backlog Refinement occur?',
    choice1: 'Every release cycle',
    choice2: 'Once, at the end of the project',
    choice3: 'Once, at the beginning of the project',
    choice4: 'Every Sprint',
    answer: 4,
  },
  {
    question: 'The CEO asks a team member to do some work outside the goals of the current Sprint in progress. What should the team member do?',
    choice1: 'Inform the Product Owner so they can work with the CEO',
    choice2: 'Add it to the next Sprint',
    choice3: 'Add it to the current Sprint',
    choice4: 'Add it to the current Sprint while swapping out planned work of equal size',
    answer: 1,
  },
  {
    question: 'Who owns Sprint plans?',
    choice1: 'Individuals, as assigned by the Scrum Master',
    choice2: 'The Team owns them collectively',
    choice3: 'Individuals, as determined during the Sprint Planning Meeting',
    choice4: 'The Scrum Master',
    answer: 2,
  },
  {
    question: 'How is the Product Backlog arranged?',
    choice1: 'Items are randomly arranged',
    choice2: 'Most important items at the top to least important items at the bottom',
    choice3: 'Into categories P1, P2, P3, etc.',
    choice4: 'Large items at the top to small items at the bottom',
    answer: 2,
  },
  {
    question: 'Who estimates the effort to complete a Product Backlog Item',
    choice1: 'The Scrum Master, with input from the Scrum Development Team',
    choice2: 'The Product owner, with input from the Scrum Development Team',
    choice3: 'The Scrum Development Team, after clarifying the requirements',
    choice4: 'The most senior people in the organization, such as engineering managers or the software architect',
    answer: 3,
  },
  {
    question: 'Should the Product Backlog contain tasks?',
    choice1: 'Yes',
    choice2: 'No',
    choice3: 'Depends on the task',
    choice4: 'If there is enough time in the Sprint Planning Meeting',
    answer: 2,
  },
  {
    question: 'During Sprint Execution, When are new Sprint Tasks added?',
    choice1: 'As soon as possible after they are identified, unless they endanger the Sprint goals',
    choice2: 'Never, the Sprint Tasks are fixed and decided during Sprint Planning',
    choice3: 'When the Scrum master approves them',
    choice4: 'When the Product Owner identifies a new task',
    answer: 1,
  },
  {
    question: 'what is the timebox for the daily Scrum Meeting?',
    choice1: 'As long as necessary',
    choice2: '15 minutes',
    choice3: '5 minutes',
    choice4: '60 minutes',
    answer: 2,
  },
  {
    question: 'When is the Sprint Backlog created?',
    choice1: 'During the Sprint Planning Meeting, though the tasks needed to accomplish the fixed goals will change during Sprint Execution',
    choice2: 'At the beginning of the project',
    choice3: 'During the Backlog Refinement Meeting',
    choice4: 'Whenever needed',
    answer: 1,
  },
  {
    question: 'What is the recommended size of a scrum team?',
    choice1: 'About 10 people',
    choice2: 'About 6 people',
    choice3: '10 plus or minus 3, or more if the team is geographically dispersed',
    choice4: 'it dosent matter, as long as the team is cross functional',
    answer: 2,
  },
  {
    question: 'which is NOT an effective way to encourage collaboration between the Scrum Development Team and Product Owner?',
    choice1: 'Listen to their communications',
    choice2: 'Act as a go-between for them',
    choice3: 'Teach the team to talk in terms of business needs and objectives',
    choice4: 'Teach the Product Owner about technologies the team uses',
    answer: 2,
  },
  {
    question: 'Does Scrum have rules, or just guidelines?',
    choice1: 'Scrum has had a few simple rules for a decade or two, with minor refinements. Appendix A in Ken Schwabers old book Agile Project Management with Scrum was called "Rules" and teh current Scrum Guide is called "Rules of the Game"',
    choice2: 'Scrum has guidelines, no rules at all',
    choice3: 'Dictated during the Backlog refinement Meeting',
    choice4: 'Scrum is dedicated to adhering to hard rules that will cause the project to fail if not regarded to the letter',
    answer: 1,
  },
  {
    question: 'How frequently do experienced Agile software developers test?',
    choice1: 'Once per day or night',
    choice2: 'As soon as the QA person is available',
    choice3: 'Once per 30 days',
    choice4: 'Every time the code changes (potentially many times per day)',
    answer: 4,
  },
  {
    question: 'Which is the more important reason to demonstrate working projects frequently?',
    choice1: 'To get more features out',
    choice2: 'To accelerate our understanding of the users real needs',
    choice3: 'Applause',
    choice4: 'To build power point presentation about hypothetical things',
    answer: 2,
  },
  {
    question: 'Does Scrum have a role call "project manager?"',
    choice1: 'Yes',
    choice2: 'No',
    choice3: 'Depends on the project scope',
    choice4: 'The Scrum master acts as the Project Manager',
    answer: 2,
  },
  {
    question: 'What often happens to the Product Backlog as the development continues from Sprint to Sprint?',
    choice1: 'it gets smaller, because the initial scope was probably right',
    choice2: 'it gets larger, because every Sprint Review demonstration prompts requests for more or different features',
    choice3: 'it gets smaller, because Scrum Teams work so fast',
    choice4: '9',
    answer: 2,
  },
  {
    question: 'In a Scrum organization, which is a responsibility of management external to the Scrum Team?',
    choice1: 'Monitor the Daily Scrum meetings and reward team players',
    choice2: 'Help resolve Team-reported impediments and improve the larger organization',
    choice3: 'Set up performance appraisals',
    choice4: 'Coordinate activities between the Scrum Teams',
    answer: 2,
  },
  {
    question: 'When should a Product Backlog be re-prioritized?',
    choice1: 'Sometimes. The Product Owner should re-prioritize only before the elaboration stage gate',
    choice2: 'never, Due to the "cost of change" curve, the Product Backlog should be locked down before Sprinting begins',
    choice3: 'Always. The Product Owner should re-prioritize the Product Backlog constantly, as we learn more',
    choice4: 'While monitoring the Sprint burn down Chart, to ensure that individuals are contributing',
    answer: 3,
  },
  {
    question: 'When should a retrospective Meeting be held?',
    choice1: 'Every now and then, when the team wants to improve ',
    choice2: 'At the end of each Sprint, before the Sprint Review Meeting',
    choice3: 'Only at the end of a project',
    choice4: 'At the end of each Sprint, after the Sprint Review Meeting',
    answer: 4,
  },
  {
    question: 'In a good Retrospective, when are decisions made?',
    choice1: 'At the end of the meeting, after all team members have expressed themselves',
    choice2: 'During the meeting, as soon as someone suggests them',
    choice3: 'At teh beginning of the meeting, to avoid discomfort',
    choice4: '',
    answer: 1,
  },
  {
    question: 'Most organizations that claim to be doing Scrum_______',
    choice1: 'Have modified the difficult, uncomfortable parts that could have led to breakthroughs',
    choice2: 'Are doing it as well as possible',
    choice3: '',
    choice4: '',
    answer: 1,
  },
  {
    question: 'According to Bill Wake, the acronym "INVEST" can help you remember what a well-formed Product Backlog looks like. What do the FIRST three letters stand for?',
    choice1: 'Immutable, Necessary, Vast',
    choice2: 'Independent, Negotiable, Valuable',
    choice3: 'Incoherent, Nebulous, Vain',
    choice4: 'Idealistic, Noble, Valiant',
    answer: 2,
  },
  {
    question: 'According to Bill Wake, the acronym "INVEST" can help you remember what a well-formed Product Backlog looks like. What do the LAST three letters stand for?',
    choice1: 'Ecclesiastical, Sacred, Truthful',
    choice2: 'Easy, Sane, Traceable',
    choice3: 'Estimable, Small, Testable',
    choice4: 'Effective, Secure, Trusted',
    answer: 3,
  },
  {
    question: 'What is the difference between the Product Backlog and the Sprint Backlog?',
    choice1: 'There is no difference ',
    choice2: 'The Product Backlog contains features, while the Sprint Backlog contains bugs',
    choice3: 'The Product Backlog contains everything we might ever work on, while the Sprint Backlog contains just the things well work on during one Sprint',
    choice4: '',
    answer: 3,
  },
  {
    question: 'Should the team expect to know all the tasks necessary to complete the committed PBIs during the Sprint Planning Meeting?',
    choice1: 'No, According to Agile Project Management with Scrum(Schwabber 2004), only 60% of the tasks are likely to be identified during the Sprint Planning Meeting. Other tasks, such as unanticipated dependencies, will be discovered during Sprint Execution',
    choice2: 'Yes, the most important thing is to make sure everyone is busy every hour of the entire Sprint',
    choice3: '',
    choice4: '',
    answer: 1,
  },
  {
    question: 'What is the longest allowable iteration, or Sprint, in Scrum?',
    choice1: '30 days, or one calender month, but one or two weeks is recommended',
    choice2: 'Six weeks',
    choice3: 'It depends how much work was planned for the sprint',
    choice4: '',
    answer: 1,
  },
  {
    question: 'In Scrum, is it acceptable to postpone testing until another Sprint?',
    choice1: 'No, in Scrum, teams attempt to develop a potentially shippable product increment every Sprint',
    choice2: 'Yes. We cannot learn how to code and test in one Sprint',
    choice3: '',
    choice4: '',
    answer: 1,
  },
  {
    question: 'A 30-day Sprint uses a 1-day timebox for the Sprint Planning Meeting. How long (at most) should the Sprint Planning Meeting be for a two-week Sprint?',
    choice1: '15 minutes max',
    choice2: '1 hour max',
    choice3: '1 day max',
    choice4: '4 hours max',
    answer: 4,
  },
  {
    question: 'Do you agree the PBI will need some testing tasks?',
    choice1: 'No, Testing should be postponed. There is always plenty of time for testing before the release date',
    choice2: 'Yes, the team learns to use Test Driven Development (TDD), some of this will be handles implicitly and repeatedly. Manual exploratory testing is also important',
    choice3: '',
    choice4: '',
    answer: 2,
  },
  {
    question: 'Who is responsible for selecting work in the Sprint Planning Meeting?',
    choice1: 'The Product Owner',
    choice2: 'The Development Team',
    choice3: 'The Scrum Master',
    choice4: '',
    answer: 2,
  },
  {
    question: 'How many Sprints are planned during a Sprint Planning Meeting?',
    choice1: 'All the Sprints left in a project. We know more on the first day of a project than we will know in the future',
    choice2: 'One Sprint only, Once the Team has established a consistent pace, the Product Owner may use this to make longer range forecasts and release plans',
    choice3: 'Four Sprints',
    choice4: '',
    answer: 2,
  },
  {
    question: 'In Scrum, what does a Team attempt to do during its very first Sprint?',
    choice1: 'Analyze, design, build, integrate, and test a potentially shippable product increment, even if its features are initially simple and small',
    choice2: 'Analyze requirements only',
    choice3: 'Analyze requirements, and put together infrastructure only',
    choice4: '',
    answer: 1,
  }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

gameStart = () => {
  questionsCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }
  questionsCounter++

  progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question;
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion();
    }, 1000)

  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

gameStart()

