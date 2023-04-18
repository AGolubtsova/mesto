//нашла popup и назначила переменную
const popupElement = document.querySelector('.popup');

//нашла элемент закрытия формы - крестик и назначила переменную
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

//нашла кнопку для открытия popup редактирования и назначила переменную
const popupOpenedButtonElement = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form');

const SubmitCloseButtonElement = formElement.querySelector('.popup__submit');

const openPopup = function() {
  console.log('openPopup');
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  console.log('closePopup');
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
// Просим форму не отправлять данные самостоятельно
  evt.preventDefault();  
// Находим форму в DOM
  let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
  let nameInput = formElement.querySelector('#userName-input');
  let jobInput = formElement.querySelector('#userProf-input');
// Получите значение полей jobInput и nameInput из свойства value  
  console.log(nameInput.value);
  console.log(jobInput.value);
// Вставьте новые значения с помощью textContent
// Выберите элементы, куда должны быть вставлены значения полей
  let ProfileTitle = document.querySelector('.profile__title');
  ProfileTitle.textContent = nameInput.value;
  let ProfileDescription = document.querySelector('.profile__description');
  ProfileDescription.textContent = jobInput.value;
}
popupOpenedButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

//после отправки данных форма закрыввается
SubmitCloseButtonElement.addEventListener('click', closePopup);

