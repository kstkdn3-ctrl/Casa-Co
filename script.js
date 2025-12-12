document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = card.dataset.link;
  });
});
const buttons = document.querySelectorAll(".text-btn");
try {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Сторінка завантажена");

    // Отримуємо елементи
    const searchBtn = document.getElementById("searchBtn");
    console.log("Знайдено кнопку пошуку:", searchBtn);
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const performSearchBtn = document.getElementById("performSearch");
    const searchResults = document.getElementById("searchResults");

    // Перевірка елементів
    if (!searchBtn) console.log("Не знайдено searchBtn");
    if (!searchOverlay) console.log("Не знайдено searchOverlay");
    if (!searchInput) console.log("Не знайдено searchInput");
    if (!performSearchBtn) console.log("Не знайдено performSearchBtn");

    // Відкриття пошуку
    if (searchBtn) {
      searchBtn.addEventListener("click", function () {
        console.log("Клік на пошук");
        if (searchOverlay) {
          searchOverlay.style.display = "flex";
          if (searchInput) searchInput.focus();
        }
      });
    }

    // Закриття пошуку
    if (closeSearch) {
      closeSearch.addEventListener("click", function () {
        if (searchOverlay) {
          searchOverlay.style.display = "none";
        }
      });
    }

    // Закриття по кліку на фон
    if (searchOverlay) {
      searchOverlay.addEventListener("click", function (e) {
        if (e.target === searchOverlay) {
          searchOverlay.style.display = "none";
        }
      });
    }

    // Пошук при натисканні Enter
    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          searchProducts();
        }
      });
    }

    // Пошук при кліку на кнопку
    if (performSearchBtn) {
      performSearchBtn.addEventListener("click", searchProducts);
    }

    // Функція пошуку
    function searchProducts() {
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        alert("Будь ласка, введіть пошуковий запит");
        return;
      }

      // Показуємо завантаження
      if (searchResults) {
        searchResults.innerHTML = '<div class="no-results">Шукаємо...</div>';
        searchResults.style.display = "block";
      }

      // Шукаємо товари на сторінці
      const cards = document.querySelectorAll(".card");
      const foundProducts = [];

      cards.forEach((card) => {
        const nameElement = card.querySelector(".name_of_goods");
        if (nameElement) {
          const productName = nameElement.textContent.toLowerCase();
          if (productName.includes(query)) {
            foundProducts.push({
              name: nameElement.textContent,
              element: card,
            });
          }
        }
      });

      // Показуємо результати
      setTimeout(() => {
        if (searchResults) {
          if (foundProducts.length > 0) {
            let html = `<h3>Знайдено ${foundProducts.length} товарів:</h3>`;
            foundProducts.forEach((product, index) => {
              html += `
                                    <div class="result-item" style="cursor: pointer;" data-index="${index}">
                                        <div class="result-title">${index + 1}. ${product.name}</div>
                                    </div>
                                `;
            });
            searchResults.innerHTML = html;

            // Додаємо обробники кліків на результати
            document.querySelectorAll(".result-item").forEach((item) => {
              item.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                if (foundProducts[index] && foundProducts[index].element) {
                  foundProducts[index].element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  // Додаємо підсвічування
                  foundProducts[index].element.style.boxShadow = "0 0 0 3px #b77466";
                  setTimeout(() => {
                    foundProducts[index].element.style.boxShadow = "";
                  }, 2000);
                }
              });
            });
          } else {
            searchResults.innerHTML = `
                                <div class="no-results">
                                    <h3>Нічого не знайдено</h3>
                                    <p>Спробуйте інші ключові слова</p>
                                </div>
                            `;
          }
        }
      }, 500);
    }

    // Додаємо пошук при введенні в маленьке поле
    const smallSearchInput = document.querySelector(".search-input-small");
    if (smallSearchInput) {
      smallSearchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const query = this.value.trim();
          if (query) {
            if (searchOverlay) {
              searchOverlay.style.display = "flex";
              if (searchInput) {
                searchInput.value = query;
                searchInput.focus();
                setTimeout(() => {
                  searchProducts();
                }, 100);
              }
            }
          }
        }
      });
    }
  });
} catch (e) {
  console.log(e, "Помилка при ініціалізації пошуку");
}

let cartCount = 0;
function updateCart() {
  const cartElement =
    document.querySelector(".cart-count") ||
    document.querySelector(".cart-counter") ||
    document.querySelector('[class*="cart"] span') ||
    document.querySelector(".cart span");

  if (cartElement) {
    cartElement.textContent = cartCount;
    console.log("Кошик оновлено:", cartCount);
  } else {
    console.log("Не знайшов елемент кошика!");

    // Створимо кошик, якщо його немає
    const header = document.querySelector("header");
    if (header) {
      const newCart = document.createElement("div");
      newCart.innerHTML = '🛒 <span class="cart-count">0</span>';
      newCart.style.cssText = "margin-left: 20px; font-size: 20px;";
      header.appendChild(newCart);
    }
  }
}

// Додаємо події на всі кнопки
try {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Сторінка завантажена. Шукаю кнопки...");

    const buyButtons = document.querySelectorAll(".button");
    console.log("Знайшов кнопок:", buyButtons.length);

    buyButtons.forEach((button, index) => {
      // Видаляємо старі обробники
      button.onclick = null;

      // Додаємо новий
      button.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        cartCount++;
        console.log(`Кнопка ${index + 1} натиснута. Кошик: ${cartCount}`);

        updateCart();

        // Візуальний ефект
        button.style.backgroundColor = "#4CAF50";
        button.textContent = "✓ Додано";

        setTimeout(() => {
          button.style.backgroundColor = "";
          button.textContent = "Купити";
        }, 1000);
      };
    });

    // Ініціалізуємо кошик
    updateCart();
  });

  document.head.appendChild(style);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  document.getElementById("char").addEventListener("click", function () {
    document.getElementById("char1").scrollIntoView({
      behavior: "smooth",
    });
  });
  document.getElementById("delivery").addEventListener("click", function () {
    document.getElementById("delivery1").scrollIntoView({
      behavior: "smooth",
    });
  });
  document.getElementById("reviews").addEventListener("click", function () {
    document.getElementById("reviews1").scrollIntoView({
      behavior: "smooth",
    });
  });
} catch (e) {
  console.log("Помилка при додаванні подій:", e);
}

const modal = document.getElementById("galleryModal");
const modalBigImage = document.getElementById("modalBigImage");
let images = [];
let currentIndex = 0;

function updateModalContent() {
  modalBigImage.src = images[currentIndex];
}

function openModal() {
  modal.style.display = "block";
  updateModalContent();
}

function closeModal() {
  modal.style.display = "none";
}

const productImages = document.querySelectorAll(".image-box img");

productImages.forEach((img, i) => {
  images.push(img.src);
  img.dataset.index = i;
});

productImages.forEach((img) => {
  img.addEventListener("click", () => {
    currentIndex = parseInt(img.dataset.index);
    openModal();
  });
});

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
