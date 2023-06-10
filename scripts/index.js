import { initialCards, configFormSelector } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupModals = document.querySelectorAll('.popup');
const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const popupAddCardElement = document.querySelector('.popup_card-add');
const zoomImageElement = document.querySelector('.popup_zoom-picture');
const popupCloseButtonElements = document.querySelectorAll('.popup__close-button');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const formElementEditProfile = popupProfileEditElement.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('#userName-input');
const jobInput = formElementEditProfile.querySelector('#userProf-input');
const placeInput = popupAddCardElement.querySelector('#placeName-input');
const placeLink = popupAddCardElement.querySelector('#placeLink-input');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.elements');
const imageUrlElement = zoomImageElement.querySelector('.popup__image');
const imageTitleElement = zoomImageElement.querySelector('.popup__caption');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const formElementAddCard = popupAddCardElement.querySelector('.popup__form');
const popupAddCardSubmitButtonElement = popupAddCardElement.querySelector('.popup__submit');
const profileForm = document.forms["popupFormProfile"];
const cardForm = document.forms["popupFormAddCard"];

const openModal = function(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

const openProfileEditPopup = function() {
  openModal(popupProfileEditElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
 
function openCardPopup() {
  openModal(popupAddCardElement);
}

const closeModal = function(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

/** закртыие модального окна через overlay */
const closePopupByOverlay = function(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closeModal(evt.target);
  }
}

popupModals.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlay);
});

/** закрытие модального окна через esc */
const closePopupByEscape = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopupElement = document.querySelector('.popup_opened');
    closeModal(openedPopupElement);
  }
}

popupCloseButtonElements.forEach(function(item) { 
  item.addEventListener('click', (evt) => closeModal(evt.target.closest('.popup')));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEditElement);
}

/** 
 * создаем объект карточки c помощью функции
 * передаем ее далее как параметр функций
 */
function createCardData(name, link) {
  const cardData = {
    userName: name, 
    srcImage: link
  };

  return cardData;
}

function openModalZooom(name, link) {
  imageTitleElement.textContent = name;
  imageUrlElement.src = link; 
  imageUrlElement.alt = name; 

  openModal(zoomImageElement);
}

function  createCard(item) {
  const card = new Card(createCardData(item.name, item.link), '#element-template', openModalZooom);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardContainer.prepend(cardElement);
});

function insertCardOnSubmit(evt) {
  evt.preventDefault();

  const item = {
    name: placeInput.value,
    link: placeLink.value
  }
  const cardElement = createCard(item);

  cardContainer.prepend(cardElement);
  closeModal(popupAddCardElement);
  formElementAddCard.reset();
  formValidatorpopupAddCard.resetValidation(popupAddCardSubmitButtonElement);
}

const formValidatorPopupProfileEdit = new FormValidator(configFormSelector, profileForm);
formValidatorPopupProfileEdit.enableValidation();


const formValidatorpopupAddCard = new FormValidator(configFormSelector, cardForm);
formValidatorpopupAddCard .enableValidation();

profileEditButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', openCardPopup);
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddCard.addEventListener('submit', insertCardOnSubmit);