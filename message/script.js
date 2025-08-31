const flames = document.querySelectorAll('.flame');
const cake = document.getElementById('cakeStage');
const letterStage = document.getElementById('letterStage');
const closedLetter = document.getElementById('closedLetter');
const openLetter = document.getElementById('openLetter');
const messageContent = document.getElementById('messageContent');
const openSound = document.getElementById('openSound');

let extinguishedCount = 0;

flames.forEach(flame => {
  flame.addEventListener('click', () => {
    flame.style.opacity = '0';
    flame.style.pointerEvents = 'none';
    extinguishedCount++;

    if (extinguishedCount === flames.length) {
      setTimeout(() => {
        cake.style.display = 'none';
        letterStage.style.display = 'flex';
      }, 800);
    }
  });
});

closedLetter.addEventListener('click', () => {
  closedLetter.style.display = 'none';
  openLetter.style.display = 'block';
  openSound.play();
  setTimeout(() => {
    messageContent.style.display = 'block';
  }, 500);
});

document.getElementById('backHome').addEventListener('click', () => {
  window.location.href = '../index.html'; // sesuaikan path jika file ada di folder 'message'
});
