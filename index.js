/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const subZeroSpriteSheet = new Image()
subZeroSpriteSheet.src = './img/subZeroSpriteSheet.png'
subZeroSpriteSheet.onload = loadImages

let cols = 7
let rows = 2
let spriteWidth = subZeroSpriteSheet.width / cols
let spriteHeight = subZeroSpriteSheet.height / rows
let totalFrames = 7
let currentFrame = 0
let srcX = 0
let srcY = 0
let framesDrawn = 0
ctx.webkitImageSmoothingEnabled = false
ctx.imageSmoothingEnabled = false

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate)

  currentFrame = currentFrame % totalFrames
  srcX = currentFrame * spriteWidth
  ctx.save()
  resizeImage(4)
  ctx.drawImage(subZeroSpriteSheet, srcX, srcY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
  ctx.restore()
  framesDrawn++
  if (framesDrawn >= 10) {
    currentFrame++
    framesDrawn = 0
  }
}

function resizeImage(scaleFactor) {
  let midXPos = innerWidth / 2 - (spriteWidth * scaleFactor) / 2
  let midYPos = innerHeight / 2 - (spriteHeight * scaleFactor) / 2
  ctx.translate(midXPos, midYPos)
  ctx.scale(scaleFactor, scaleFactor)
}

addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    srcY = 1 * spriteHeight
  }
})

addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    srcY = 0 * spriteHeight
  }
})

let numOfImages = 1
function loadImages() {
  if (--numOfImages > 0) return
  animate()
}