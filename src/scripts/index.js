// Импорт стилей
import '../pages/index.css';

// Импорт списка с карточками и селекторами валидации, классов
import { initialCards, configFormSelector } from '../utils/constants.js';
import { Card } from './Card.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'; 
import { FormValidator } from './FormValidator.js';

// Импорт задействованных в index переменных
import { 
  popupCloseButtonElements,
  profileEditButtonElement,
  nameInput,
  jobInput,
  placeInput,
  placeLink,
  cardPopupOpenButton,
  profileForm,
  cardForm
} from '../utils/constants.js';

//Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_zoom-picture'); //создала класс для открытия попапа с фотографией

//Экземпляр класса PopupWithForm
const PopupProfileEdit = new PopupWithForm('.popup_profile-edit', handleProfileFormSubmit); //Экземпляр класса PopupWithForm

//Экземпляр класса UserInfo
const newUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__description'
});

//Экземпляр класса PopupWithForm
const popupAddCard = new PopupWithForm('.popup_card-add', () => {
  const item = {
    name: placeInput.value,
    link: placeLink.value
  }
  const cardElement = createCard(item);
  section.addItem(cardElement);
});

//Экземпляр класса Section
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card)}  
  },'.elements');

//создаем объект карточки c помощью функции, передаем ее далее как параметр функций
function createCardData(name, link) {
  const cardData = {
    userName: name, 
    srcImage: link
  };

  return cardData;
}

function  createCard(item) {
  const card = new Card(createCardData(item.name, item.link), '#element-template', openModalZooom);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleProfileFormSubmit() {
  const name = nameInput.value;
  const info = jobInput.value;
  newUserInfo.setUserInfo({
    username: name,
    profession: info,
  });
 
  PopupProfileEdit.close();
}

const openProfileEditPopup = function() {
  formValidatorPopupProfileEdit.resetValidation();

  const userData = newUserInfo.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.profession;

  PopupProfileEdit.open();
}

// функция открытия попапа с фотографией
function openModalZooom(name, link) {
  popupWithImage.open(name, link);
}

popupCloseButtonElements.forEach(() => {
  popupWithImage.setEventListeners();
});

const formValidatorPopupProfileEdit = new FormValidator(configFormSelector, profileForm);
formValidatorPopupProfileEdit.enableValidation();

const formValidatorpopupAddCard = new FormValidator(configFormSelector, cardForm);
formValidatorpopupAddCard.enableValidation();

profileEditButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', () => {
  popupAddCard.open(); 
  cardForm.reset();
  formValidatorpopupAddCard.resetValidation();});

popupWithImage.setEventListeners();
PopupProfileEdit.setEventListeners();
popupAddCard.setEventListeners();
section.renderItems();
