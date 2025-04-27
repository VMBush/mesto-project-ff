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
  cardImage.addEventListener("click", () =>
    openImageFunction(cardData.link, cardData.name)
  );

  likeButton.addEventListener("click", () =>
    likeFunction(likeButton, likeCaption, cardData._id)
  );

  if (cardData.owner._id === profileId) {
    deleteButton.addEventListener("click", () =>
      deleteFunction(card, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  if (cardData.likes.some((el) => el._id === profileId)) {
    toggleLikeButton(likeButton);
  }

  return card;
}

export function deleteCard(cardElement, id) {
  deleteCardHttp(id).then(cardElement.remove()).catch(log);
}

export function likeCard(likeButton, likeCaption, id) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeFunction = isLiked ? deleteLikeCard : putLikeCard;

  likeFunction(id)
    .then((cardInfo) => {
      toggleLikeButton(likeButton, isLiked);
      likeCaption.textContent = cardInfo.likes.length;
    })
    .catch(log);
}

function toggleLikeButton(likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}

function log(message) {
  console.log(message);
}
