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
        validateInput(formElement, inputElement, validationConfig.errorClass);
        toggleSubmitButton(
          inputElements,
          submitButton,
          validationConfig.inactiveButtonClass
        );
      });
    });
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputElements = formElement.querySelectorAll(
    validationConfig.inputSelector
  );

  inputElements.forEach((el) => (el.value = ""));

  formElement
    .querySelectorAll(validationConfig.inputErrorClass)
    .forEach(hideError);

  toggleSubmitButton(
    inputElements,
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig.inactiveButtonClass
  );
}

function validateInput(formElement, inputElement, errorClass) {
  const errorElement = formElement.querySelector(
    `.popup_${inputElement.name}_error`
  );

  if (inputElement.validity.patternMismatch) {
    showError(errorElement, inputElement.dataset.errorMessage, errorClass);
  } else if (!inputElement.validity.valid) {
    showError(errorElement, inputElement.validationMessage, errorClass);
  } else {
    hideError(errorElement, errorClass);
  }
}

function showError(errorElement, errorMessage, errorClass) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideError(errorElement, errorClass) {
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
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
