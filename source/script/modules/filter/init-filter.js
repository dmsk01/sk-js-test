import { getCardsData } from "./get-data.js";
import { applyFilter } from "./utils.js";
import { createCardList } from "./create-layout.js";

const list = document.querySelector("[data-project]");
const filtersList = document.querySelectorAll("[data-filter=link]");

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
  if (!list || !filtersList) return;

  list.classList.remove("is-active");
  const cardsData = await getCardsData();
  const filteredCardsData = applyFilter(cardsData);
  switchActiveFilter(filtersList);
  createCardList(filteredCardsData, list);
  list.classList.add("is-active");
};

renderCards();

window.addEventListener("popstate", async () => {
  renderCards();
});
