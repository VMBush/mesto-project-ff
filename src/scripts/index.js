import '../pages/index.css'
import initialCards from './cards'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);

  card.querySelector(".card__title").textContent = cardData.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(card));

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => placesList.append(createCard(el, deleteCard)));
