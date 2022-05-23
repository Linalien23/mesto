import './index.css';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  profileEditButton,
  profileAddButton,
  formElementEdit,
  formElementAdd,
  places,
  formElementList,
  userInf,
  nameInput,
  jobInput
} from '../utils/constants.js';



// НОВЫЙ КОД ЗАГРУЗКИ И ДОБАВЛЕНИЯ КАРТОЧЕК
const createNewCard = (data) => { // Функция создания карточки
  const card = new Card(data, '#cards', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const addNewCards = function (items) { // Функция добавления новой карточки в DOM
  const cardFromPopup = createNewCard(items);
  photoGalleryCards.prepend(cardFromPopup);
};

placeCards.forEach((item) => { // Добавим карточки из массива placeCards в DOM
  const cardFromArray = createNewCard(item);
  photoGalleryCards.append(cardFromArray);
});

const handleAddCard = function (evt) { //функция добавления публикации
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась
  const photoCard = {}; //объект "фотокарточка"
  photoCard.name = placeNameInput.value; //берём имя карточки из значения поля в форме добавлени карточки
  photoCard.link = urlInput.value; //ссылка на  карточку из поля
  addNewCards(photoCard); //вызываю функцию расположения новой карточки на первом месте
  closePopup(popupAdd); //вызываю функцию закрытия попапа при клике на "Сохранить"
  formElementAdd.reset(); //сбрасываю значения в полях формы
}

// Общая функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляю попапу новый класс
  document.addEventListener('keyup', closeWithEsc); //добавляю обработчик нажатия, когда попап открыт
};

// ФУНКЦИЯ ОТКРЫТИЯ ЗУМ-ПОПАПА ДЛЯ ПЕРЕДАЧИ В Card (ИЗ РЕВЬЮ)
function handleCardClick(name, link) {
  zoomPopupCard.src = link;
  zoomPopupCard.alt = name;
  zoomPopupCardTitle.textContent = name;
  openPopup(popupZoom);
}

// Общая функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //удаляю ранее добавленный класс
  document.removeEventListener('keyup', closeWithEsc);//удаляю обработчик нажатия, когда попап закрыт
};

// Функция закрытия попапа по кнопке Escape
const closeWithEsc = (evt) => {
  if (evt.key === 'Escape') { //если пользователь нажал Escape
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened); //вызов функции закрытия попапа
  }
};

// Функция закрытия попапа по клику на оверлей
function closePopupOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) { //если нажали на элемент с классом popup_opened (то есть оверлей)
    closePopup(evt.target); //то вызови функцию закрытия попапа
  }
};

// Валидация формы редактирования профиля
const editProfileValidate = new FormValidator(formElementList, formElementEdit); // Экземпляр класса FormValidator
editProfileValidate.enableValidation(); // enableValidation в файле валидации

// Валидация формы добавления карточки
const addProfileValidate = new FormValidator(formElementList, formElementAdd);
addProfileValidate.enableValidation();

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function handleEditProfile() { //функция РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  nameInput.value = nameValue.textContent; //заполняю поле "имя" значением из профиля
  jobInput.value = jobValue.textContent; //заполняю поле "о себе" значением из профиля
  editProfileValidate.toggleButtonState(); // функция активации кнопки (из файла с кодом для валидации)
  openPopup(popupEdit); //вызываю функцию открытия попапа
};

function handleProfileFormSubmit(evt) { //отправить форму и добавить её содержимое на страницу
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась
  nameValue.textContent = nameInput.value; //заменяю имя в профиле на введённое в форме
  jobValue.textContent = jobInput.value; //заменяю "о себе" в профиле на введённое в форме
  closePopup(popupEdit); //вызываю функцию закрытия попапа при клике на "Сохранить"
};

//ОБРАБОТЧИКИ СОБЫТИЙ

//объединить обработчики оверлея и крестиков:
const popups = document.querySelectorAll('.popup') // находим все попапы

popups.forEach((popup) => { // пробегаемся по ним, навешивая обработчик
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) { // закрываем попап (любой) по нажатию на оверлей
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-btn')) { // закрываем попап (любой) по нажатию на крестик
          closePopup(popup)
        }
    })
})

buttonEdit.addEventListener('click', handleEditProfile); //открыть попап по клику на кнопку редактирования профиля (вызов функции редактирования)

formElementEdit.addEventListener('submit', handleProfileFormSubmit); //отправить форму и добавить её содержимое на страницу

buttonAdd.addEventListener('click', function () { //открываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по кнопке
  addProfileValidate.toggleButtonState(); // Функция из файла валидации
  openPopup(popupAdd);
});

formElementAdd.addEventListener('submit', handleAddCard); //вызываю функцию добавления карточки по клику на "Сохранить"