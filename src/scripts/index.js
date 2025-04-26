import "../pages/index.css";
//import initialCards from "./cards";
import { createCard, likeCard, deleteCard } from "./card";
import { openModal, closeModalHandler, closeModal } from "./modal";
import { clearValidation, enableValidation } from "./validation";
import {
  fetchInitialCards,
  fetchProfileInfo,
  patchProfileImage,
  patchProfileInfo,
  postAddCard,
} from "./api";
import initialCards from "./cards";

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
const newCardModal = document.querySelector(".popup_type_new-card");
const cardImageModal = document.querySelector(".popup_type_image");
const editProfileImageModal = document.querySelector(
  ".popup_type_profile-image"
);

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

const profileInfoPromise = fetchProfileInfo();
profileInfoPromise
  .then((res) => {
    profileInfoName.textContent = res.name;
    profileInfoDescription.textContent = res.about;
    profileImage.style.backgroundImage = `URL(${res.avatar})`;
  })
  .catch(log);

const initialCardsPromise = fetchInitialCards();
Promise.all([profileInfoPromise, initialCardsPromise])
  .then(([profileInfo, initialCards]) => {
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
  editProfileFormName.value = profileInfoName.textContent;
  editProfileFormDescription.value = profileInfoDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

profileImage.addEventListener("click", () => {
  editProfileImageFormUrl.value = "";
  clearValidation(editProfileImageForm, validationConfig);
  openModal(editProfileImageModal);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardModal);
});

editProfileModal.addEventListener("click", (evt) =>
  closeModalHandler(evt, editProfileModal)
);
editProfileImageModal.addEventListener("click", (evt) => {
  closeModalHandler(evt, editProfileImageModal);
});
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

  const submitButton = editProfileForm.querySelector("button");
  submitButton.textContent = "Сохранение...";
  patchProfileInfo(editProfileFormName.value, editProfileFormDescription.value)
    .catch(log)
    .finally(() => {
      closeModal(editProfileModal);
      submitButton.textContent = "Сохранить";
    });
});

editProfileImageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = editProfileImageForm.querySelector("button");
  submitButton.textContent = "Сохранение...";
  patchProfileImage(editProfileImageFormUrl.value)
    .then((res) => {
      profileImage.style.backgroundImage = `URL(${res.avatar})`;
    })
    .catch(log)
    .finally(() => {
      closeModal(editProfileImageModal);
      submitButton.textContent = "Сохранить";
    });
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardDataElement = {
    name: newCardForm.elements["place-name"].value,
    link: newCardForm.elements.link.value,
  };

  const submitButton = newCardForm.querySelector("button");
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
    })
    .catch(log)
    .finally(() => {
      closeModal(newCardModal);
      submitButton.textContent = "Сохранить";
      newCardForm.reset();
    });
});

function openImageModal(evt) {
  const modalImage = cardImageModal.querySelector(".popup__image");
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;

  const popupCaption = evt.target.alt;
  cardImageModal.querySelector(".popup__caption").textContent = popupCaption;

  openModal(cardImageModal);
}

function log(message) {
  console.log(message);
}

enableValidation(validationConfig);
