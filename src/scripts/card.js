import {
  deleteCard as deleteCardHttp,
  deleteLikeCard,
  putLikeCard,
} from "./api";

export function createCard(
  cardTemplate,
  cardData,
  likeFunction,
  openImageFunction,
  deleteFunction,
  profileId
) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeCaption = card.querySelector(".card__like-caption");

  card.querySelector(".card__title").textContent = cardData.name;
  likeCaption.textContent = cardData.likes.length;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", openImageFunction);

  card.dataset._id = cardData._id;

  likeButton.addEventListener("click", () =>
    likeFunction(likeButton, likeCaption, cardData._id)
  );

  if (cardData.owner._id === profileId) {
    deleteButton.addEventListener("click", () => deleteFunction(card));
  } else {
    deleteButton.remove();
  }

  if (cardData.likes.some((el) => el._id === profileId)) {
    toggleLikeButton(likeButton);
  }

  return card;
}

export function deleteCard(cardElement) {
  cardElement.remove();
  deleteCardHttp(cardElement.dataset._id).catch(log);
}

export function likeCard(likeButton, likeCaption, id) {
  toggleLikeButton(likeButton);

  let likeFunction;
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeFunction = putLikeCard;
  } else {
    likeFunction = deleteLikeCard;
  }

  likeFunction(id)
    .then((cardInfo) => (likeCaption.textContent = cardInfo.likes.length))
    .catch(log);
}

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function log(message) {
  console.log(message);
}
