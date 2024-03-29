import Popup from './Popup.js';

class PopupWithImage extends Popup {
  // Наследует от Popup и принимает в конструктор селектор popup
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupItem находится в родительском классе
    this._popupCaption = this._popupItem.querySelector('.popup__caption');
    this._popupImage = this._popupItem.querySelector('.popup__image');
  }

  // Метод перезаписывает родительский метод open
  open(name, link) {
    // Вставляем в popup картинку с src изображения и подписью к картинке
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }

}

//Экспортируем класс в index.js
export default PopupWithImage;