const popupElement = document.querySelector('.popup');
const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const addCardElement = document.querySelector('.popup_card-add');
const zoomImageElement = document.querySelector('.popup_zoom-picture');
const popupCloseButtonElements = document.querySelectorAll('.popup__close-button');
const popupOpenedButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#userName-input');
const jobInput = formElement.querySelector('#userProf-input');
const placeInput = addCardElement.querySelector('#placeName-input');
const placeLink = addCardElement.querySelector('#placeLink-input');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const templateElement = document.querySelector('#element-template');
const cardContainer = document.querySelector('.elements');
let imageUrlElement = zoomImageElement.querySelector('.popup__image');
let imageTitleElement = zoomImageElement.querySelector('.popup__caption');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const formElementAddCard = addCardElement.querySelector('.popup__form');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const openModal = function(modal) {
  modal.classList.add('popup_opened');
}

const openPopup = function() {
  openModal(popupProfileEditElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openImagePopup(event) {
  let cardElement = event.target.parentElement;
  let cardName = cardElement.querySelector('.element__title');
  let cardLink = cardElement.querySelector('.element__image');
  imageTitleElement.textContent = cardName.textContent;
  imageUrlElement.src = cardLink.src; 
  openModal(zoomImageElement);
} 

function openCardPopup() {
  openModal(addCardElement);
}

const closeModal = function(event) {
  let popupCloseElement = event.target.parentElement;
  let popupParentCloseElement = popupCloseElement.parentElement;
  popupParentCloseElement.classList.remove('popup_opened');
}

popupCloseButtonElements.forEach(function(item) {
  item.addEventListener('click', closeModal);
});


function likeButtonPopup(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteCardButton(event) {
  let card = event.target.parentElement;
  card.remove();
}

function handleFormSubmit(evt) {
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

popupOpenedButtonElement.addEventListener('click', openPopup);
cardElementOpenButton.addEventListener('click', openCardPopup);
formElement.addEventListener('submit', handleFormSubmit); 

function insertCard(name, link) {
  let card = templateElement.content.cloneNode(true);
  let cardName = card.querySelector('.element__title');
  let cardLink = card.querySelector('.element__image');
  let likeButtonElement = card.querySelector('.element__like-button');
  let deleteCardButtonElement = card.querySelector('.element__delete-button');
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.addEventListener('click', openImagePopup);
  likeButtonElement.addEventListener('click', likeButtonPopup);
  likeButtonElement.addEventListener('click', likeButtonPopup);
  deleteCardButtonElement.addEventListener('click', deleteCardButton);
  cardContainer.prepend(card);
}

for (let i = 0; i < 6; i++) {
  insertCard(initialCards[i].name, initialCards[i].link);
}

function insertCardOnSubmit(evt) {
  evt.preventDefault();  
  insertCard(placeInput.value, placeLink.value);
  closePopup();
}
formElementAddCard.addEventListener('submit', insertCardOnSubmit); 