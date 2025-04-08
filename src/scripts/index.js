import "../pages/index.css";
import initialCards from "./cards";
import { createCard, likeCard, deleteCard } from "./card";
import {
  openModal,
  closeModalHandler,
  closeModal,
} from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileInfo = document.querySelector(".profile__info");
const profileInfoName = profileInfo.querySelector(".profile__title");
const profileInfoDescription = profileInfo.querySelector(
  ".profile__description"
);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const cardImageModal = document.querySelector(".popup_type_image");

const editProfileForm = editProfileModal.querySelector(".popup__form");
const editProfileFormName = editProfileForm.name;
const editProfileFormDescription = editProfileForm.description;

const newCardForm = document.forms["new-place"];

initialCards.forEach((el) =>
  placesList.append(
    createCard(cardTemplate, el, likeCard, openImageModal, deleteCard)
  )
);

profileEditButton.addEventListener("click", () => {
  editProfileFormName.value = profileInfoName.textContent;
  editProfileFormDescription.value = profileInfoDescription.textContent;
  openModal(editProfileModal);
});

profileAddButton.addEventListener("click", () => openModal(newCardModal));

editProfileModal.addEventListener("click", (evt) =>
  closeModalHandler(evt, editProfileModal)
);
newCardModal.addEventListener("click", (evt) =>
  closeModalHandler(evt, newCardModal)
);
cardImageModal.addEventListener("click", (evt) =>
  closeModalHandler(evt, cardImageModal)
);

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileInfoName.textContent = editProfileFormName.value;
  profileInfoDescription.textContent = editProfileFormDescription.value;

  closeModal(editProfileModal);
});

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
      deleteCard
    )
  );
  closeModal(newCardModal);
  newCardForm.reset();
});

function openImageModal(evt) {
  const modalImage = cardImageModal.querySelector(".popup__image");
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;

  const popupCaption = evt.target.alt;
  cardImageModal.querySelector(".popup__caption").textContent = popupCaption;

  openModal(cardImageModal);
}
