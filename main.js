const canvas = document.querySelector('canvas')
const scoreBoard = document.querySelector('.score')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
let aspectRatio = canvas.height / canvas.width
const PILLARGAP = 220
const GAMESPEED = 1
const FLAPSPEED = 25
let highScore = localStorage.getItem("flappyBirdHighScore") || 0
let score = 0
let backgroundPos = { x1: 0, x2: aspectRatio * 800 }
let frame = 0
document.body.height = innerHeight

let pillars = []
let stars = []
let bird = new Player()
let animationFrame;

function animate() {
  animationFrame = requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  updateScore()
  handleStars()
  handlePillars()
  generatePillars()
  bird.update()
  frame++
}
function handlePillars() {
  pillars.forEach(pillar => {
    pillar.update()
  })
  pillars.forEach((pillar, i) => {
    if (pillar.x + pillar.width < 0) {
      pillars.splice(i, 1)
      score++
    }
  })
}
function updateScore() {
  scoreBoard.innerHTML = `HI ${highScore} ${score}`
}
function generatePillars() {
  if (frame % 70 == 0) {
    pillars.push(new Pillar)
    frame = 0
  }
}
function handleStars() {
  stars.forEach(star => {
    star.update()
  })
}
(function() {
  for (let i = 0; i < 50; i++) {
    stars.push(new Star())
  }
})()
function gameOver() {
  cancelAnimationFrame(animationFrame)
  document.querySelector('.menu').style.display = null
  document.querySelector('.play').innerHTML = 'Restart'
  pillars = []
  localStorage.setItem("flappyBirdHighScore", highScore < score ? highScore = score : highScore)
  score = 0
  frame = 0
}

let flapEvents = ['pointerdown', 'keydown']
flapEvents.forEach(event => addEventListener(event, () => bird.flap()))


addEventListener('load', loadCanvas)
function loadCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  updateScore()
  handleStars()
  bird.draw()
}
function start() {
  document.querySelector('.menu').style.display = 'none'
  bird = new Player()
  animate()
}
function randomInt(a, b) {
  return a + Math.floor((b - a) * Math.random())
}

const rotateBtn = document.querySelector('.orientation')
rotateBtn.addEventListener('click', function() {
  if (screen.orientation.type == 'landscape-primary') {
    screen.orientation.unlock()
    resizeCanvas()
  } else {
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
    resizeCanvas()
    screen.orientation.lock("landscape-primary")
      .then(resizeCanvas)
      .catch(function(error) { alert(error); }
      );
  }
})

function resizeCanvas() {
  document.body.height = innerHeight
  canvas.width = innerWidth
  canvas.height = innerHeight
  pillars = []
  stars = [];
  (function() {
    for (let i = 0; i < 50; i++) {
      stars.push(new Star())
    }
  })()
  handleStars()
  bird.y = canvas.height / 2
}
addEventListener('fullscreenchange', resizeCanvas)
addEventListener('webkitfullscreenchange', resizeCanvas)
screen.orientation.addEventListener("change", resizeCanvas)
addEventListener('resize', resizeCanvas)
