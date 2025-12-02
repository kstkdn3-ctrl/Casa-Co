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