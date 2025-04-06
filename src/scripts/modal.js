export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  modal.escHandler = (evt) => closeModalHandler(evt, modal);
  document.body.addEventListener("keydown", modal.escHandler);
}

function fillImageModal(imageCard, modal) {
  const sourceImage = imageCard.querySelector(".card__image");

  const modalImage = modal.querySelector(".popup__image");
  modalImage.src = sourceImage.src;
  modalImage.alt = sourceImage.alt;

  const popupCaption = imageCard.querySelector(".card__title").textContent;
  modal.querySelector(".popup__caption").textContent = popupCaption;
}

function fillProfileEditModal(profileInfo, modal) {
  modal.querySelector(".popup__input_type_name").value =
    profileInfo.querySelector(".profile__title").textContent;
  modal.querySelector(".popup__input_type_description").value =
    profileInfo.querySelector(".profile__description").textContent;
}

export function openImageModal(imageCard, modal) {
  fillImageModal(imageCard, modal);
  openModal(modal);
}

function addListenerToProfileEditModal(profileInfo, modal) {
  const form = modal.querySelector(".popup__form");

  const nameInput = form.name;
  const jobInput = form.description;

  function handleFormSubmit(evt) {
    evt.preventDefault();

    profileInfo.querySelector(".profile__title").textContent = nameInput.value;
    profileInfo.querySelector(".profile__description").textContent =
      jobInput.value;

    closeModal(modal);
  }

  form.addEventListener("submit", handleFormSubmit);
}

export function openProfileEditModal(profileInfo, modal) {
  fillProfileEditModal(profileInfo, modal);
  addListenerToProfileEditModal(profileInfo, modal);
  openModal(modal);
}

export function closeModalHandler(evt, modalElement) {
  if (
    (evt.type === "keydown" && evt.key === "Escape") ||
    (evt.type === "click" &&
      (evt.target == modalElement ||
        evt.target.classList.contains("popup__close")))
  ) {
    closeModal(modalElement);
  }
}

export function closeModal(modalElement) {
  document.body.removeEventListener("keydown", modalElement.escHandler);
  delete modalElement.escHandler;
  modalElement.classList.remove("popup_is-opened");
}
