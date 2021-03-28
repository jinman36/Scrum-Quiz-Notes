const username = document.querySelector('#username');
const SaveScoreBtn = document.querySelector('#SaveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

cont MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  SaveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
  e.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  highScores.push(score)

  highScores.sort((a,b) => {
    return b.score - a.score
  })
  highScores.splice(5)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('/')
}