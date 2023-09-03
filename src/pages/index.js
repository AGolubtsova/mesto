// Импорт стилей
import '../pages/index.css';

// Импорт списка с карточками и селекторами валидации, классов
import { initialCards, configFormSelector } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'; 
import { FormValidator } from '../components/FormValidator.js';

// Импорт задействованных в index переменных
import { 
  profileEditButtonElement,
  nameInput,
  jobInput,
  cardPopupOpenButton
} from '../utils/constants.js';

//Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_zoom-picture'); //создала класс для открытия попапа с фотографией

//Экземпляр класса PopupWithForm
const popupProfileEdit = new PopupWithForm('.popup_profile-edit', (formValues) =>{
  const name = formValues['username'];     
  const info = formValues['profession'];  
  newUserInfo.setUserInfo({
    username: name,
    profession: info,
  });
 
  popupProfileEdit.close();
});

//Экземпляр класса UserInfo
const newUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__description'
});

//Экземпляр класса PopupWithForm
const popupAddCard = new PopupWithForm('.popup_card-add', (formValues) => {
  const item = {
    name: formValues['name'],
    link: formValues['link'],
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

const openProfileEditPopup = function() {
  formValidators['popupFormProfile'].resetValidation();

  const userData = newUserInfo.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.profession;

  popupProfileEdit.open();
}

// функция открытия попапа с фотографией
function openModalZooom(name, link) {
  popupWithImage.open(name, link);
}

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configFormSelector);

profileEditButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', () => {
  popupAddCard.open(); 
  formValidators['popupFormAddCard'].resetValidation();});

popupWithImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupAddCard.setEventListeners();
section.renderItems();
