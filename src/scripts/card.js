export function createCard(
  cardTemplate,
  cardData,
  likeFunction,
  openImageFunction,
  imageModal,
  deleteFunction
) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__title").textContent = cardData.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", () =>
    openImageFunction(card, imageModal)
  );

  likeButton.addEventListener("click", () => likeFunction(likeButton));
  deleteButton.addEventListener("click", () => deleteFunction(card));

  return card;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
