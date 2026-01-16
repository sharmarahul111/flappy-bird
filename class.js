class Star {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.radius = Math.random() * 2
  }
  update() {
    this.draw()
    this.x -= 2 * GAMESPEED
    if (this.x + this.radius < 0) {
      this.x = canvas.width
      this.y = Math.random() * canvas.height
    }
  }
  draw() {
    c.beginPath()
    c.fillStyle = "white"
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fill()
  }
}
class Pillar {
  constructor() {
    this.x = canvas.width//+Math.random()*canvas.width*.5
    this.gapOffset = (Math.random() * canvas.height * .4) + (canvas.height * .2)
    this.color = "#fff"
    this.width = 30
  }
  update() {
    this.draw()
    this.x -= 4 * GAMESPEED

    //Gameover code || Collision Detection
    if (this.x + this.width >= bird.x && this.x < bird.x + bird.length) {
      if (bird.y < this.gapOffset || bird.y + bird.length > this.gapOffset + PILLARGAP) {
        gameOver()
      }
    }
  }
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.x, 0, this.width, this.gapOffset) // top pillar
    c.fillRect(this.x, this.gapOffset + PILLARGAP, this.width, canvas.height - (this.gapOffset + PILLARGAP)) // bottom pillar
  }
}
class Player {
  constructor() {
    this.x = 5
    this.y = canvas.height / 2
    this.vy = 0
    this.acceleration = 0.8
    this.friction = 0.07
    this.length = 30
    this.color = "#00ffd1"
  }
  update() {
    this.draw()
    if (this.y > canvas.height - this.length) {
      this.y = canvas.height - this.length
      this.vy = 0
    } else if (this.y < 0) {
      this.y = 0
      this.vy = 0
    } else {
      this.vy += this.acceleration
      this.vy *= 1 - this.friction
      this.y += this.vy
    }
  }
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.x, this.y, this.length, this.length)
    c.strokeRect(this.x, this.y, this.length, this.length)
  }
  flap() {
    this.vy -= FLAPSPEED * GAMESPEED
  }
}
