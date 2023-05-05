const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const popupAddCardElement = document.querySelector('.popup_card-add');
const zoomImageElement = document.querySelector('.popup_zoom-picture');
const popupCloseButtonElements = document.querySelectorAll('.popup__close-button');
const editProfileButtonElement = document.querySelector('.profile__edit-button');
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

const openModal = function(modal) {
  modal.classList.add('popup_opened');
}

const openProfileEditPopup = function() {
  openModal(popupProfileEditElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openImagePopup(event) {
  const cardName = event.target.alt; 
  const cardLink = event.target.src;
  imageTitleElement.textContent = cardName;
  imageUrlElement.src = cardLink; 
  openModal(zoomImageElement);
} 

function openCardPopup() {
  openModal(popupAddCardElement);
}

const closeModal = function(modal) {
  modal.classList.remove('popup_opened');
}

popupCloseButtonElements.forEach(function(item) { 
  item.addEventListener('click', (evt) => closeModal(evt.target.closest('.popup')));
});


function likeButtonPopup(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteCardButton(event) {
  const card = event.target.closest('.element');
  card.remove();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupProfileEditElement);
}

editProfileButtonElement.addEventListener('click', openProfileEditPopup);
cardPopupOpenButton.addEventListener('click', openCardPopup);
formElementEditProfile.addEventListener('submit', handleProfileFormSubmit); 

function insertCard(name, link) {
  const card = templateElement.content.cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardLink = card.querySelector('.element__image');
  const likeButtonElement = card.querySelector('.element__like-button');
  const deleteCardButtonElement = card.querySelector('.element__delete-button');
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
  cardLink.addEventListener('click', openImagePopup);
  likeButtonElement.addEventListener('click', likeButtonPopup);
  likeButtonElement.addEventListener('click', likeButtonPopup);
  deleteCardButtonElement.addEventListener('click', deleteCardButton);
  cardContainer.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
  insertCard(initialCards[i].name, initialCards[i].link);
}

function insertCardOnSubmit(evt) {
  evt.preventDefault();  
  insertCard(placeInput.value, placeLink.value);
  closeModal(popupAddCardElement);
  formElementAddCard.reset();
}
formElementAddCard.addEventListener('submit', insertCardOnSubmit); 