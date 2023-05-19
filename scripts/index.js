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
const templateElement = document.querySelector('#element-template');
const cardContainer = document.querySelector('.elements');
const imageUrlElement = zoomImageElement.querySelector('.popup__image');
const imageTitleElement = zoomImageElement.querySelector('.popup__caption');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
const formElementAddCard = popupAddCardElement.querySelector('.popup__form');
const popupAddCardsubmitButtonElement = popupAddCardElement.querySelector('.popup__submit');

const openModal = function(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', escCloseModal);
}

const openProfileEditPopup = function() {
  openModal(popupProfileEditElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  formElementEditProfile.reset();
}
 
function openCardPopup() {
  openModal(popupAddCardElement);
}

const closeModal = function(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', escCloseModal);
}
/** закртыие модального окна через overlay */
const overlayCloseModal = function(evt) {
  [...popupModals].forEach((item) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeModal(item);
    }
  });
}

popupModals.forEach((popup) => {
  popup.addEventListener('click', overlayCloseModal);
});

/** закрытие модального окна через esc */
const escCloseModal = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopupElement = document.querySelector('.popup_opened');
    closeModal(openedPopupElement);
  }
}

popupCloseButtonElements.forEach(function(item) { 
  item.addEventListener('click', (evt) => closeModal(evt.target.closest('.popup')));
});

function handleDeleteClick(event) {
  const card = event.target.closest('.element');
  card.remove();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEditElement);
}

const cardData = {
  useName: 'name',
  srcImage: 'link',
  altImage: 'link'
}

/** функция создания карточки */
function createCard(cardData) {
  const card = templateElement.content.cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardLink = card.querySelector('.element__image');
  const likeButtonElement = card.querySelector('.element__like-button');
  const deleteCardButtonElement = card.querySelector('.element__delete-button');

  cardName.textContent = cardData.useName;
  cardLink.src =  cardData.srcImage;
  cardLink.alt = cardData.useName;
  
  cardLink.addEventListener('click', () => {
    imageTitleElement.textContent = cardData.useName;
    imageUrlElement.src = cardData.srcImage; 
    imageUrlElement.alt = cardData.useName; 

    openModal(zoomImageElement);
  });

  likeButtonElement.addEventListener('click', () => {
    likeButtonElement.classList.toggle('element__like-button_active');
  });
  
  deleteCardButtonElement.addEventListener('click', handleDeleteClick);
  return card;
}

/** 
 * создаем объект карточки c помощью функции
 * передаем ее далее как параметр функций
 */
function createCardData(name, link) {
  const cardData = {
    useName: '', 
    srcImage: '',
    altImage: ''
  };

  cardData.useName = name;
  cardData.srcImage = link;
  cardData. altImage = name;

  return cardData;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(createCardData(initialCards[i].name, initialCards[i].link));
  cardContainer.prepend(card);
}

function insertCardOnSubmit(evt) {
  evt.preventDefault();
  const card = createCard(createCardData(placeInput.value, placeLink.value));
  cardContainer.prepend(card);
  closeModal(popupAddCardElement);
  formElementAddCard.reset();
  popupAddCardsubmitButtonElement.disabled = true;
  popupAddCardsubmitButtonElement.classList.add('popup__submit_disabled');
}

profileEditButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', openCardPopup);
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddCard.addEventListener('submit', insertCardOnSubmit); 