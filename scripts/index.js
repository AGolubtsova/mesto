//нашла popup и назначила переменную
const popupElement = document.querySelector('.popup');

//нашла элемент закрытия формы - крестик и назначила переменную
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

//нашла кнопку для открытия popup редактирования и назначила переменную
const popupOpenedButtonElement = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#userName-input');
const jobInput = formElement.querySelector('#userProf-input');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
// Просим форму не отправлять данные самостоятельно
  evt.preventDefault();  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}
popupOpenedButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


