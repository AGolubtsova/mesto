export class FormValidator {
  constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._formElement = formElement;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputErrorClass = config.inputErrorClass;
    }

  _disableButtonElement(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButtonElement(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState(buttonElement, isActive) {
    if (!isActive) {
        this._disableButtonElement(buttonElement);
    } else {
        this._enableButtonElement(buttonElement);
    }
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement, config) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

/** функция проверки валидности */
  _checkInputValidation(inputElement, formElement) {
    const inputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    
    if (!inputValid) {
        this._showInputError(inputElement, errorElement);
    } else {
        this._hideInputError(inputElement, errorElement);
    };
  }

/** вешаем обработчики событий на формы и инпуты */
  _setEventListener(formElement) {
    const formInputLists = formElement.querySelectorAll(this._inputSelector);
    const popupSubmitButtonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(popupSubmitButtonElement, formElement.checkValidity());

    [...formInputLists].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            this._toggleButtonState(popupSubmitButtonElement, formElement.checkValidity());
            this._checkInputValidation(inputItem, formElement);
        });
    })
  }

  enableValidation() {
    const forms = document.querySelectorAll(this._formSelector);
    [...forms].forEach((formItem) => {
      this._setEventListener(formItem);
    });
  }
}