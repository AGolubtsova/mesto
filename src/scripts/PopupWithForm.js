import Popup from './Popup.js';

class PopupWithForm extends Popup {
  // Наследует от Popup и принимает в конструктор селектор popup и callback сабмита формы
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._formItem = this._popupItem.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  // Метод собирает данные всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }

  // Метод закрытия popup
  close() {
    super.close();
    this._popupFormItem.reset();
  }
}

export default PopupWithForm;