const configFormSelector  = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_invalid'
}

function disabledButtonElement(buttonElement, config) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
} 

function enabledButtonElement(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
} 

function toggleButtonState(buttonElement, isActive, config) {
    if (!isActive) {
        disabledButtonElement(buttonElement, config);
    } else {
        enabledButtonElement(buttonElement, config);
    }
}

function showInputError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

//функция проверки валидности
function checkInputValidation(inputElement, formElement, config) {
    const inputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    
    if (!inputValid) {
        showInputError(inputElement, errorElement, config);
    } else {
        hideInputError(inputElement, errorElement, config);
    };
}


//вешаем обработчики событий на формы и инпуты
function setEventListener(formElement, config) {
    const formInputLists = formElement.querySelectorAll(config.inputSelector);
    const popupSubmitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(popupSubmitButtonElement, formElement.checkValidity(), config);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    [...formInputLists].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            toggleButtonState(popupSubmitButtonElement, formElement.checkValidity(), config);
            checkInputValidation(inputItem, formElement, config);
        });
    })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((formItem) => {
    setEventListener(formItem, config);
  });
}

enableValidation(configFormSelector);