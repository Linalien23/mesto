import { formElementList, FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//формы
const formElementAdd = document.querySelector('.add-popup__form');
const formElementEdit = document.querySelector('.edit-popup__form');

const nameValue = document.querySelector('.profile__inner-name');
const jobValue = document.querySelector('.profile__inner-activity');

//кнопки
const buttonEdit = document.querySelector('.profile__inner-edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const buttonAddSubmit = document.querySelector('.add-popup__submit-btn');
const buttonEditSubmit = document.querySelector('.edit-popup__submit-btn');

//попапы
const popupEdit = document.querySelector('.edit-popup');
const popupAdd = document.querySelector('.add-popup');
const popupZoom = document.querySelector('.zoom-popup');

//содержимое попапов
const zoomPopupCard = document.querySelector('.zoom-popup__item');
const zoomPopupCardTitle = document.querySelector('.zoom-popup__title');

//инпуты
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const placeNameInput = popupAdd.querySelector('.popup__input_type_place');
const urlInput = popupAdd.querySelector('.popup__input_type_url');

//закрывающие крестики
const buttonEditClose = popupEdit.querySelector('.popup__close-btn');
const buttonAddClose = popupAdd.querySelector('.popup__close-btn');
const buttonZoomClose = popupZoom.querySelector('.zoom-popup__close-btn');

//массив карточек
const placeCards = [ //добавляем эти карточки при загрузке страницы
  {
    name: 'Гамсутль',
    link: './images/Gams.jpg'
  },
  {
    name: 'Хунзах',
    link: './images/Hun.jpg'
  },
  {
    name: 'Сулак',
    link: './images/Sulack.jpg'
  },
  {
    name: 'Матлас',
    link: './images/Matlas.jpg'
  },
  {
    name: 'Ирганай',
    link: './images/Irganai.jpg'
  },
  {
    name: 'Дербент',
    link: './images/Derbent.jpg'
  }
];

const photoGalleryCards = document.querySelector('.photo-gallery__cards'); // тут все карточки

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
popupEdit.addEventListener('click', closePopupOverlayClick);
popupAdd.addEventListener('click', closePopupOverlayClick);
popupZoom.addEventListener('click', closePopupOverlayClick);

buttonEdit.addEventListener('click', handleEditProfile); //открыть попап по клику на кнопку редактирования профиля (вызов функции редактирования)

buttonEditClose.addEventListener('click', function () { //закрыть попап по клику на крестик
  closePopup(popupEdit);
});

formElementEdit.addEventListener('submit', handleProfileFormSubmit); //отправить форму и добавить её содержимое на страницу

buttonAdd.addEventListener('click', function () { //открываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по кнопке
  addProfileValidate.toggleButtonState(); // Функция из файла валидации
  openPopup(popupAdd);
});

buttonAddClose.addEventListener('click', function () { //закрываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по крестику
  closePopup(popupAdd);
});

buttonZoomClose.addEventListener('click', function () { //закрываю zoom-попап кликом по крестику
  closePopup(popupZoom);
});

formElementAdd.addEventListener('submit', handleAddCard); //вызываю функцию добавления карточки по клику на "Сохранить"