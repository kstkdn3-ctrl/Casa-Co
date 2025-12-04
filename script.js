document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        window.location.href = card.dataset.link;
    });
});
const buttons = document.querySelectorAll('.text-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
document.getElementById("char").addEventListener("click", function () {
  document.getElementById("char1").scrollIntoView({
    behavior: "smooth"
  });
});
document.getElementById("delivery").addEventListener("click", function () {
  document.getElementById("delivery1").scrollIntoView({
    behavior: "smooth"
  });
});
document.getElementById("reviews").addEventListener("click", function () {
  document.getElementById("reviews1").scrollIntoView({
    behavior: "smooth"
  });
});
let images = [];
let currentIndex = 0;

const productImages = document.querySelectorAll(".image-box img");

productImages.forEach((img, i) => {
    images.push(img.src);     
    img.dataset.index = i;    
});

productImages.forEach(img => {
    img.addEventListener("click", () => {
        currentIndex = parseInt(img.dataset.index);
        openModal();
    });
});