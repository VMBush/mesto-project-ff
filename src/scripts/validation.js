// Example of config object
// {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: '.popup__error',
//   errorClass: 'popup__error__visible'
// }
export function enableValidation(validationConfig) {
  const formElements = document.querySelectorAll(validationConfig.formSelector);

  formElements.forEach((formElement) => {
    const inputElements = formElement.querySelectorAll(
      validationConfig.inputSelector
    );
    const submitButton = formElement.querySelector(
      validationConfig.submitButtonSelector
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        validateInput(formElement, inputElement);
        toggleSubmitButton(
          inputElements,
          submitButton,
          validationConfig.inactiveButtonClass
        );
      });
    });
  });
}

export function clearValidation(profileForm, validationConfig) {
  profileForm
    .querySelectorAll(validationConfig.inputErrorClass)
    .forEach(hideError);

  toggleSubmitButton(
    profileForm.querySelectorAll(validationConfig.inputSelector),
    profileForm.querySelector(validationConfig.submitButtonSelector),
    validationConfig.inactiveButtonClass
  );
}

function validateInput(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.popup_${inputElement.name}_error`
  );

  if (inputElement.validity.patternMismatch) {
    showError(errorElement, inputElement.dataset.errorMessage);
  } else if (!inputElement.validity.valid) {
    showError(errorElement, inputElement.validationMessage);
  } else {
    hideError(errorElement);
  }
}

function showError(errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error__visible");
}

function hideError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error__visible");
}

function toggleSubmitButton(inputElements, submitButton, toggleClass) {
  if (Array.from(inputElements).some((input) => !input.validity.valid)) {
    submitButton.classList.add(toggleClass);
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.classList.remove(toggleClass);
    submitButton.removeAttribute("disabled");
  }
}
