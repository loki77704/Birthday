const messageBox = document.getElementById("messageBox");

const messages = [
  "Selamat ulang tahun MAAAAK!",
  "Semoga berkah selalu, panjang umur",
  "sukses, makin cantik 😌",
];

let index = 0;
function showNextMessage() {
  messageBox.textContent = messages[index];
  index = (index + 1) % messages.length;
}

setInterval(showNextMessage, 4000); // new line every 4s
showNextMessage();
