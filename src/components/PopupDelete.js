import Popup from './Popup.js';

export class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupConfirmButton = this._popupItem.querySelector('.popup_delete__submit');
        this._submitHandler = null;
    }
    
    addSubmitHandler(handler) {
        this._submitHandler = handler;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupConfirmButton.addEventListener('click', () => {
          this._submitHandler();
          this.close()
        });
    }
}