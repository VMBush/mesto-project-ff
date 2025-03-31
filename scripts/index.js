// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__title").textContent = cardData.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt =
    "Картинка с изображением достопримечательности " + cardData.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteFunction);

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => placesList.append(createCard(el, deleteCard)));
