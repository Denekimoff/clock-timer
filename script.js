const clockElement = document.createElement('div')
clockElement.classList.add('clock')
document.body.prepend(clockElement)

//----- Создание часов при помощи рекурсии -----
function getTime() {
  const time = new Date()
  let hour = time.getHours()
  let minutes =
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  let seconds =
    time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  clockElement.innerHTML = `${hour}:${minutes}:${seconds}`

  setTimeout(getTime, 1000)
}
getTime()

//----- Таймер -----
let displayElement = document.querySelector('.sec')
const startElement = document.querySelector('.start')
const pauseElement = document.querySelector('.pause')
const resetElement = document.querySelector('.reset')

const oneSec = 1000
let count = 0
const defaultCount = displayElement.textContent

function handleStartTimer() {
  const timer = setInterval(() => {
    count++
    displayElement.innerHTML = count < 10 ? '0' + count : count

    function handlePauseTimer(event) {
      if (event.target.closest('.pause')) clearInterval(timer)
    }
    pauseElement.addEventListener('click', handlePauseTimer)

    function handleResetTimer(event) {
      if (event.target.closest('.reset')) {
        clearInterval(timer)
        count = defaultCount
        displayElement.textContent = defaultCount
      }
    }
    resetElement.addEventListener('click', handleResetTimer)
  }, oneSec)
}

startElement.addEventListener('click', handleStartTimer)
startElement.addEventListener('click', function () {
  resetElement.classList.remove('red')
  pauseElement.classList.remove('orange')
  startElement.classList.add('green')
})
pauseElement.addEventListener('click', function () {
  startElement.classList.remove('green')
  resetElement.classList.remove('red')
  pauseElement.classList.add('orange')
})
resetElement.addEventListener('click', function () {
  startElement.classList.remove('green')
  pauseElement.classList.remove('orange')
  resetElement.classList.add('red')

  setTimeout(() => {
    resetElement.classList.remove('red')
  }, 4000)
})
