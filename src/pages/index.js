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
import Api from '../components/Api.js';
import {PopupDelete} from '../components/PopupDelete.js';
// Импорт задействованных в index переменных
import { 
  profileEditButtonElement,
  nameInput,
  jobInput,
  cardPopupOpenButton,
  iconAvatarEdit,
  userName,
  userInfo,
  userAvatar
} from '../utils/constants.js';

// переменная под id пользователя
let userId;

//Экземпляр класса UserInfo
const newUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__description',
  userAvatarSelectors: '.profile__avatar'
});

//Экземпляр класса PopupWithImage оздала класс для открытия попапа с фотографией
const popupWithImage = new PopupWithImage('.popup_zoom-picture');

//Экземпляр класса PopupDelete
const popupDelete = new PopupDelete('.popup_delete');

// Объявление экземпляра API
const optionsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75', 
  headers: {
    authorization: '70f8a693-b9dd-448d-93df-9935ed4791fc',
    'Content-Type': "application/json"
  }
}
const api = new Api(optionsApi);

const cardList = new Section ({
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card)
  },
},'.elements')

// функция открытия попапа с фотографией
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(data) {

  const handleLikesCard = (id) => {
    api.addCardLike(id)
    .then((res) => {
      card.updateCardLike(res);
      card.renderCardLike();
    })
    .catch((error) => { console.log(`При лайке карточки возникла ошибка, ${error}`) })
  }

  const handleDeleteLike = (id) => {
    api.deleteCardLike(id)
    .then((res) => {
      card.updateCardLike(res);
      card.renderCardLike();
    })
    .catch((error) => { console.log(`При дизлайке карточки возникла ошибка, ${error}`) })
  }

  const handlePopupDelete = (id) => {
    popupDelete.open();
    popupDelete.addSubmitHandler(() => {
      api.deleteCard(data._id)
      .then(() => {
        card._remove();
        popupDelete.close();
      })
      .catch((error) => { console.log(`При закрытии карточки возникла ошибка, ${error}`) })
    });
  }

  const card = new Card(data, '#element-template', userId,
    handleCardClick, handleLikesCard, handleDeleteLike, handlePopupDelete);
  return card.generateCard();
}
// возвращает результат исполнения нужных промисов (карточки и информация пользователя)
api.getAllNeededData()
  .then(( [cards, userData] ) => {
    newUserInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((error) => console.log(error))

//Экземпляр класса PopupWithForm
const popupAddCard = new PopupWithForm('.popup_card-add', (formValues) => {
  popupAddCard.renderLoading(true);
  api.createNewCard(formValues)
    .then((data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
      popupAddCard.close();
    })
    .catch((error) => { console.log(`При добавлении карточки возникла ошибка, ${error}`) })
  });

//Экземпляр класса PopupWithForm
const popupProfileEdit = new PopupWithForm('.popup_profile-edit', (formValues) => {
  popupProfileEdit.renderLoading(true);
  api.sendUserInfo(formValues)
  .then((res) => {
    newUserInfo.setUserInfo(res);
    popupProfileEdit.close();
  })
  .catch((error) => { console.log(`При редактировании профиля возникла ошибка, ${error}`) })
  //popupProfileEdit.close();
});

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

const popupAvatar = new PopupWithForm('.popup_avatar-edit', (data) => {
  popupAvatar.renderLoading(true);
   api.handleUserAvatar(data)
   .then((res) => {
    newUserInfo.setUserAvatar(res);
    formValidators['popupAvatarForm'].resetValidation();
    popupAvatar.close();
  })
  .catch((error) => console.log(error))
  .finally(() => popupAvatar.renderLoading(false))
})
popupAvatar.setEventListeners();

const openProfileEditPopup = function() {
  formValidators['popupFormProfile'].resetValidation();

  const userData = newUserInfo.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.profession;

  popupProfileEdit.open();
}

iconAvatarEdit.addEventListener('click', function () {
  popupAvatar.open();
}); 

profileEditButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', () => {
  popupAddCard.open(); 
  formValidators['popupFormAddCard'].resetValidation();});

popupWithImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupAddCard.setEventListeners();
popupDelete.setEventListeners();