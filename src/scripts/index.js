import "../pages/index.css";
//import initialCards from "./cards";
import { createCard, likeCard, deleteCard } from "./card";
import { openModal, closeByOverlay, closeModal } from "./modal";
import { clearValidation, enableValidation } from "./validation";
import {
  fetchInitialCards,
  fetchProfileInfo,
  patchProfileImage,
  patchProfileInfo,
  postAddCard,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileInfo = document.querySelector(".profile__info");
const profileInfoName = profileInfo.querySelector(".profile__title");
const profileInfoDescription = profileInfo.querySelector(
  ".profile__description"
);
const profileImage = document.querySelector(".profile__image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileModalClose = editProfileModal.querySelector(".popup__close");

const newCardModal = document.querySelector(".popup_type_new-card");
const newCardModalClose = newCardModal.querySelector(".popup__close");

const cardImageModal = document.querySelector(".popup_type_image");
const cardImageModalClose = cardImageModal.querySelector(".popup__close");

const cardImageModalImage = cardImageModal.querySelector(".popup__image");
const cardImageModalCaption = cardImageModal.querySelector(".popup__caption");
const editProfileImageModal = document.querySelector(
  ".popup_type_profile-image"
);
const editProfileImageModalClose =
  editProfileImageModal.querySelector(".popup__close");

const editProfileForm = editProfileModal.querySelector(".popup__form");
const editProfileFormName = editProfileForm.name;
const editProfileFormDescription = editProfileForm.description;

const newCardForm = document.forms["new-place"];

const editProfileImageForm = document.forms["profile-image"];
const editProfileImageFormUrl = editProfileImageForm.link;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".popup__error",
  errorClass: "popup__error__visible",
};

Promise.all([fetchProfileInfo(), fetchInitialCards()])
  .then(([profileInfo, initialCards]) => {
    profileInfoName.textContent = profileInfo.name;
    profileInfoDescription.textContent = profileInfo.about;
    profileImage.style.backgroundImage = `URL(${profileInfo.avatar})`;

    initialCards.forEach((el) =>
      placesList.append(
        createCard(
          cardTemplate,
          el,
          likeCard,
          openImageModal,
          deleteCard,
          profileInfo._id
        )
      )
    );
  })
  .catch(log);

profileEditButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  editProfileFormName.value = profileInfoName.textContent;
  editProfileFormDescription.value = profileInfoDescription.textContent;
  openModal(editProfileModal);
});

profileImage.addEventListener("click", () => {
  clearValidation(editProfileImageForm, validationConfig);
  openModal(editProfileImageModal);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";
  patchProfileInfo(editProfileFormName.value, editProfileFormDescription.value)
    .then(() => {
      profileInfoName.textContent = editProfileFormName.value;
      profileInfoDescription.textContent = editProfileFormDescription.value;
      closeModal(editProfileModal);
    })
    .catch(log)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

editProfileImageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";
  patchProfileImage(editProfileImageFormUrl.value)
    .then((res) => {
      profileImage.style.backgroundImage = `URL(${res.avatar})`;
      closeModal(editProfileImageModal);
    })
    .catch(log)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardDataElement = {
    name: newCardForm.elements["place-name"].value,
    link: newCardForm.elements.link.value,
  };

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";
  postAddCard(cardDataElement.name, cardDataElement.link)
    .then((cardData) => {
      placesList.prepend(
        createCard(
          cardTemplate,
          cardData,
          likeCard,
          openImageModal,
          deleteCard,
          cardData.owner._id
        )
      );
      closeModal(newCardModal);
    })
    .catch(log)
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
});

function openImageModal(src, alt) {
  const modalImage = cardImageModalImage;
  modalImage.src = src;
  modalImage.alt = alt;

  cardImageModalCaption.textContent = alt;

  openModal(cardImageModal);
}

function handleModalsClose(modals) {
  modals.forEach((modal) => {
    const modalClose = modal.querySelector(".popup__close");

    modal.addEventListener("click", (evt) => {
      closeByOverlay(evt, modal);
    });
    modalClose.addEventListener("click", () =>
      closeModal(modal)
    );
  })
}

function log(message) {
  console.log(message);
}

enableValidation(validationConfig);

handleModalsClose([editProfileModal, editProfileImageModal, newCardModal, cardImageModal])
