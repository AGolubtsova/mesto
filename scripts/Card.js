export class Card {
  /* 1. Объект карточки 2. Template элемента*/    
  constructor(cardData, templateElementSelector, onLikeCard, onDeleteCard, openModalCallback) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateElementSelector = templateElementSelector;
    this._onLikeCard = onLikeCard;
    this._onDeleteCard = onDeleteCard;
    this._openModalCallback = openModalCallback;
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

  /* Устанавливаем слушатели на карточку: лайк, удаление, нажатие на изображение*/
  _setEventListeners() {
    /*Слушатель кнопки лайка */
    const likeButtonElement = this._element.querySelector('.element__like-button');
    
    likeButtonElement.addEventListener('click', () => {
      //likeButtonElement.classList.toggle('element__like-button_active');
      this._onLikeCard(likeButtonElement);
    });

    /*Слушатель кнопки удаления */
    const deleteCardButtonElement = this._element.querySelector('.element__delete-button');
    deleteCardButtonElement.addEventListener('click', (event) => {
        this._onDeleteCard(event);
        //this._element.remove();
        //this._element = null;
    });

    /*Слушатель нажатия на изображение */
    this._elementImage.addEventListener('click', () => {
      this._openModalCallback(this._name, this._link);
      
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

