const list = document.querySelector("[data-project]");
const filtersList = document.querySelectorAll("[data-filter=link]");
const template = document.querySelector("[data-template='project-card']");

function createCard(cardData) {
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
function createCardList(cardsData) {
  if (!list) return;
  list.classList.remove("is-active");
  list.innerHTML = "";
  if (!document.createElement("template").content) {
    alert(
      "К сожалению невозможно отобразить данные. Пожалуйста обновите браузер"
    );
  }

  cardsData.forEach((card) => {
    const cardItem = createCard(card);
    list.appendChild(cardItem);
  });

  list.classList.add("is-active");
}

const getCardsData = async () => {
  return await fetch("./public/projects.json").then((res) => res.json());
};

const applyFilter = (dataArray) => {
  const resetFilterTags = ["#all", ""];
  if (!dataArray.length) {
    return [];
  }
  const tag = location.hash;
  return dataArray.filter((card) =>
    resetFilterTags.includes(tag) ? card : card.tags.includes(tag)
  );
};

const switchActiveFilter = (filtersList) => {
  const tag = location.hash;
  if (!filtersList.length || !filtersList) return;
  if (!tag) return;
  filtersList.forEach((filterLink) => {
    filterLink.getAttribute("href") === tag
      ? filterLink.classList.add("is-active")
      : filterLink.classList.remove("is-active");
  });
};

const renderCards = async () => {
  const cardsData = await getCardsData();
  const filteredCardsData = applyFilter(cardsData);
  switchActiveFilter(filtersList);
  createCardList(filteredCardsData);
};

renderCards();

window.addEventListener("popstate", async () => {
  renderCards();
});
