const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenedButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#userName-input');
const jobInput = formElement.querySelector('#userProf-input');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const templateElement = document.querySelector('#element-template');
const cardContainer = document.querySelector('.elements');
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

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}



const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

popupOpenedButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 

function insertCard(name, link) {
  let card = templateElement.content.cloneNode(true);
  let cardName = card.querySelector('.element__title');
  let cardLink = card.querySelector('.element__image');
  cardName.textContent = name;
  cardLink.src = link;
  //cardLink.setAttribute('src', link);
  cardContainer.prepend(card);
}

for (let i = 0; i < 6; i++) {
  insertCard(initialCards[i].name, initialCards[i].link);
}

