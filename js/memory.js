const grid = document.getElementById("card-grid");
const matchSound = document.getElementById("match-sfx");
const completeSound = document.getElementById("complete-sfx");

const icons = ["💜", "🌸", "🎁", "💌", "✨", "🌙"];
let cards = [...icons, ...icons];
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matched = 0;

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = icon;

  const back = document.createElement("div");
  back.classList.add("back");

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => {
    if (flippedCards.length >= 2 || card.classList.contains("flip")) return;

    card.classList.add("flip");
    flippedCards.push({ card, icon });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });

  grid.appendChild(card);
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.icon === second.icon) {
    matchSound.play();
    matched += 1;
    flippedCards = [];

    if (matched === icons.length) {
      completeGame();
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flip");
      second.card.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

function completeGame() {
  completeSound.play();
  document.body.style.transition = "background 2s";
  document.body.style.background = "radial-gradient(circle, #d9a9ff, #222)";
  setTimeout(() => {
    window.location.href = "platformer.html"; // Phase 3
  }, 3000);
}

cards.forEach(icon => createCard(icon));
