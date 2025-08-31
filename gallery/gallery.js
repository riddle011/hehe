// Pop up muncul saat load halaman
window.onload = function() {
  document.getElementById("popup").style.display = "flex";
};

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Lightbox
function openLightbox(element) {
  const imgSrc = element.querySelector("img").src;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  lightboxImg.src = imgSrc;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
