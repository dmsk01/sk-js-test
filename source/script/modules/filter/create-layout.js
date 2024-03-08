import { isElement } from "./utils.js";

function createCard(cardData) {
  if (!document.createElement("template").content) {
    alert(
      "К сожалению невозможно отобразить данные. Пожалуйста обновите браузер"
    );
  }
  const template = document.querySelector("[data-template='project-card']");
  const { title, date, hit, alt, href, label, src, classes, width, height } =
    cardData;
  const item = template.content.cloneNode(true);

  item.querySelector(".product-card").classList.add(classes[0]);
  item.querySelector(".product-card__title").textContent = title;
  item.querySelector(".product-card__label").textContent = label;
  item.querySelector(".product-card__date").textContent = date;
  item.querySelector(".product-card__shadow-link").href = href;
  item.querySelector(".product-card__hit").style.display = hit
    ? "inline"
    : "none";

  const image = item.querySelector(".product-card__img");
  image.src = src;
  image.alt = alt;
  image.style.width = width;
  image.style.height = height;

  return item;
}

function createCardList(cardsData, container) {
  if (!container || !isElement(container)) return;
  container.innerHTML = "";

  cardsData.forEach((card) => {
    const cardItem = createCard(card);
    container.appendChild(cardItem);
  });
}

export { createCardList };
