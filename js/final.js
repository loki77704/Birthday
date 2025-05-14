const messageBox = document.getElementById("messageBox");

const messages = [
  "Selamat ulang tahun MAAAAK!",
  "Semoga berkah selalu, panjang umur",
  "sukses, makin cantik 😌 - Chiki",
  "Hiii girl it's mei ", 
  "sry if I couldn't make the pic more pretty ",
  "but I'd like to do it for you🎀 happy birthday to U ", 
  "I'm happy we found each other and playing.",
  "💓wish you all the best and get everything you want ❤️",
  "stay healthy and rich always. - Mei",
  "Happy Birthday to the most wonderful person I've met online 🎂",
  "Though screens may separate us for now...",
  "This little world I've created is just a small token of my affection.",
  "Each element here holds a piece of my heart, just for you ✨",
  "You've brought so much light and joy into my life.",
  "I hope your special day is filled with happiness, even across the miles.",
  "Dreaming of the moment we finally meet face-to-face 🤍",
  "Until then, please accept this virtual embrace filled with all my love 🤗",
  "Happy Birthday again, my amazing game partner and more 🌟 - Loki"
];

let index = 0;
function showNextMessage() {
  messageBox.textContent = messages[index];
  index = (index + 1) % messages.length;
}

setInterval(showNextMessage, 4000); // new line every 4s
showNextMessage();
