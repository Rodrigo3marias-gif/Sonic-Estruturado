const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const fundo = document.querySelector(".fundo");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("game-over");

let score = 0;

// Velocidade inicial)
let eggmanSpeed = 4000;
eggman.style.animation = `eggman_animation ${eggmanSpeed}ms linear infinite`;

// Aumenta dificuldade 
const speedInterval = setInterval(() => {
  if (eggmanSpeed > 1000) { 
    eggmanSpeed -= 50; 
    eggman.style.animation = `eggman_animation ${eggmanSpeed}ms linear infinite`;
  }
}, 6000); 

// Score
const scoreInterval = setInterval(() => {
  score++;
  scoreDisplay.innerText = `Score: ${score}`;
}, 100);

// Pulo
const jump = () => {
  if (!sonic.classList.contains("jump")) {
 -   sonic.classList.add("jump");
    sonic.src = "./Arquivos/Sonic-Jump.gif";

    setTimeout(() => {
      sonic.classList.remove("jump");
      sonic.src = "./Arquivos/Sonic.gif";
    }, 900);
  }
};

// Loop principal
const loop = setInterval(() => {
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window.getComputedStyle(sonic).bottom.replace("px", "");

  if (eggmanPosition < 110 && eggmanPosition > 0 && sonicPosition < 220) {

    // Para Eggman
    eggman.style.animation = "none";
    eggman.style.left = `${eggmanPosition}px`;

    // Tremor
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);

    // Sonic perde
    sonic.style.animation = "none";
    sonic.src = "./Arquivos/Sonic-Loss.gif";
    sonic.style.width = "240px";

    // Fundo Game Over
    fundo.style.opacity = "0";
    setTimeout(() => {
      fundo.src = "./Arquivos/GameoverSMB-1.png";
      fundo.style.opacity = "1";
    }, 200);

    // Mostra texto
    gameOverText.classList.remove("hidden");

    // Para tudo
    clearInterval(loop);
    clearInterval(scoreInterval);
    clearInterval(speedInterval);

    // Reinicia ao clicar
    setTimeout(() => {
      document.addEventListener("click", resetGame);
    }, 500);
  }
}, 10);

// Reinício
function resetGame() {
  location.reload();
}

document.addEventListener("click", jump);

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" || e.code === "Space") jump();
});