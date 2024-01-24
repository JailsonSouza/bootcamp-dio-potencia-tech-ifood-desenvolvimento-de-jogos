const state = {
  view: {
    boxes: document.querySelectorAll(".box"),
    ralph: document.querySelector(".ralph"),
    timeLeft: document.querySelector("#timer"),
    score: document.querySelector("#punctuation"),
    playerLives: document.querySelector("#life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    punctuation: 0,
    curretTime: 60,
    lives: 5,
  },
  actions: {
    timerId: setInterval(randomBox, 1000),
    countDownTimerId: setInterval(countDown, 1000),

  },
};

function playSound(audioName) {
  let audio = new Audio(`./assets/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.punctuation);
    window.location.reload();
  }
}

function randomBox() {
  state.view.boxes.forEach((box) => {
    box.classList.remove("ralph");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomBox = state.view.boxes[randomNumber];
  randomBox.classList.add("ralph");
  state.values.hitPosition = randomBox.id;
}

function addListenerHitBox() {
  state.view.boxes.forEach((box) => {
    box.addEventListener("mousedown", () => {
      if (box.id === state.values.hitPosition) {
        state.values.punctuation++;
        state.view.score.textContent = state.values.punctuation;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.lives--;
        state.view.playerLives.textContent = state.values.lives;
        state.values.hitPosition = null;

        if (state.values.lives <= 0) {
          clearInterval(state.actions.countDownTimerId);
          clearInterval(state.actions.timerId);
          alert("Game Over! O seu resultado foi: " + state.values.punctuation);
          window.location.reload();
        }
      }
    });
  });
}

function main() {
  addListenerHitBox();
}

main();
