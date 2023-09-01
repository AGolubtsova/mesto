export class Card {
  /* 1. Объект карточки 2. Template элемента*/    
  constructor(cardData, templateElementSelector, handleCardClick) {
    this._name = cardData.userName;
    this._link = cardData.srcImage;
    this._templateElementSelector = templateElementSelector;
    this._handleCardClick = handleCardClick;
  }

  /* получаем шаблон карточки;*/
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateElementSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
  _onLikeCard() {
    this._elementLikeBtn.classList.toggle('element__like-button_active');
  }
  
  _onDeleteCard() {
    this._element.remove();
    this._element = null;
    
  }

  /* Устанавливаем слушатели на карточку: лайк, удаление, нажатие на изображение*/
  _setEventListeners() {
    /*Слушатель кнопки лайка */
    this._elementLikeBtn.addEventListener('click', () => {
      this._onLikeCard();
    });

    /*Слушатель кнопки удаления */
    this._elementDeleteBtn.addEventListener('click', () => {
        this._onDeleteCard();
    });

    /*Слушатель нажатия на изображение */
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      
    });
 }

  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.element__image'); 
    this._elementName = this._element.querySelector('.element__title');
    this._elementLikeBtn = this._element.querySelector('.element__like-button');
    this._elementDeleteBtn = this._element.querySelector('.element__delete-button');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
} 

