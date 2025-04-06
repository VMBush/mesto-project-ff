import "../pages/index.css";
import initialCards from "./cards";
import { createCard, likeCard, deleteCard } from "./card";
import {
  openModal,
  openImageModal,
  openProfileEditModal,
  closeModalHandler,
  closeModal,
} from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileInfo = document.querySelector(".profile__info");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");

const newCardForm = document.forms["new-place"];

initialCards.forEach((el) =>
  placesList.append(
    createCard(
      cardTemplate,
      el,
      likeCard,
      openImageModal,
      cardImagePopup,
      deleteCard
    )
  )
);

profileEditButton.addEventListener("click", () =>
  openProfileEditModal(profileInfo, editProfilePopup)
);

profileAddButton.addEventListener("click", () => openModal(newCardPopup));

editProfilePopup.addEventListener("click", (evt) =>
  closeModalHandler(evt, editProfilePopup)
);
newCardPopup.addEventListener("click", (evt) =>
  closeModalHandler(evt, newCardPopup)
);
cardImagePopup.addEventListener("click", (evt) =>
  closeModalHandler(evt, cardImagePopup)
);

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardDataElement = {
    name: newCardForm.elements["place-name"].value,
    link: newCardForm.elements.link.value,
  };
  placesList.prepend(
    createCard(
      cardTemplate,
      cardDataElement,
      likeCard,
      openImageModal,
      cardImagePopup,
      deleteCard
    )
  );
  closeModal(newCardPopup);
  newCardForm.reset();
});
