export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  modal.escHandler = (evt) => closeModalHandler(evt, modal);
  document.body.addEventListener("keydown", modal.escHandler);
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
