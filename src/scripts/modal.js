export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.body.addEventListener("keydown", closeByEsc);
}

export function closeByOverlay(evt, modalElement) {
  if (evt.target == modalElement) {
    closeModal(modalElement);
  }
}

export function closeModal(modalElement) {
  document.body.removeEventListener("keydown", closeByEsc);
  modalElement.classList.remove("popup_is-opened");
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}
