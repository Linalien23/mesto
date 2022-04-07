const formElementAdd = document.querySelector('.add-popup__form');
const formElementEdit = document.querySelector('.edit-popup__form');

const nameValue = document.querySelector('.profile__inner-name');
const jobValue = document.querySelector('.profile__inner-activity');

//кнопки
const editButton = document.querySelector('.profile__inner-edit-btn');
const addButton = document.querySelector('.profile__add-btn');

//попапы
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const zoomPopup = document.querySelector('.zoom-popup');

//содержимое попапов
const zoomPopupCard = document.querySelector('.zoom-popup__item');
const zoomPopupCardTitle = document.querySelector('.zoom-popup__title');

//инпуты
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeNameInput = document.querySelector('.popup__input_type_place');
const urlInput = document.querySelector('.popup__input_type_url');

//закрывающие крестики
const closeEditButton = editPopup.querySelector('.popup__close-btn');
const closeAddButton = addPopup.querySelector('.popup__close-btn');
const zoomCloseButton = document.querySelector('.zoom-popup__close-btn');

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

function openPopup(popup) { //общая функция открытия попапа
  popup.classList.add('popup_opened'); //добавляю попапу новый класс
}

function closePopup(popup) { //общая функция закрытия попапа
  popup.classList.remove('popup_opened'); //удаляю ранее добавленный класс
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function editProfile() { //функция РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  nameInput.value = nameValue.textContent; //заполняю поле "имя" значением из профиля
  jobInput.value = jobValue.textContent; //заполняю поле "о себе" значением из профиля
  openPopup(editPopup); //вызываю функцию открытия попапа
}

editButton.addEventListener('click', editProfile); //открыть попап по клику на кнопку редактирования профиля (вызов функции редактирования)

closeEditButton.addEventListener('click', function () { //закрыть попап по клику на крестик
  closePopup(editPopup);
});

function formSubmitHandler(evt) { //отправить форму и добавить её содержимое на страницу
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась

  nameValue.textContent = nameInput.value; //заменяю имя в профиле на введённое в форме
  jobValue.textContent = jobInput.value; //заменяю "о себе" в профиле на введённое в форме
  closePopup(editPopup); //вызываю функцию закрытия попапа при клике на "Сохранить"
}

formElementEdit.addEventListener('submit', formSubmitHandler); //отправить форму и добавить её содержимое на страницу

//ЗАГРУЗКА КАРТОЧЕК

const createPlaceCards = function (photoCard) { //функция загрузки карточек на страницу
  const templateCards = document.querySelector('#cards').content;
  const photoGalleryCard = templateCards.querySelector('.photo-gallery__card').cloneNode(true);
  photoGalleryCard.querySelector('.photo-gallery__title').textContent = photoCard.name;
  const CardItem = photoGalleryCard.querySelector('.photo-gallery__item');
  CardItem.src = photoCard.link;
  CardItem.alt = photoCard.name;

  photoGalleryCard.querySelector('.photo-gallery__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-gallery__like-btn_active'); //лайк
  });

  photoGalleryCard.querySelector('.photo-gallery__delete-btn').addEventListener('click', function () { //удаление публикации
    photoGalleryCard.remove();
  });

  photoGalleryCard.querySelector('.photo-gallery__zoom-btn').addEventListener('click', function () { //зум-попап
    zoomPopupCard.src = photoCard.link;
    zoomPopupCard.alt = photoCard.link;
    zoomPopupCardTitle.textContent = photoCard.name;
    openPopup(zoomPopup);
  });

  zoomCloseButton.addEventListener('click', function () { //закрываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по крестику
    closePopup(zoomPopup);
  });

  return photoGalleryCard;
};

//ДОБАВЛЕНИЕ КАРТОЧКИ

addButton.addEventListener('click', function () { //открываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по кнопке
  openPopup(addPopup); 
});

closeAddButton.addEventListener('click', function () { //закрываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по крестику
  closePopup(addPopup);
});

const photoGalleryCards = document.querySelector('.photo-gallery__cards'); //тут все карточки

const comeFirstCard = function (photoCard) { //функция расположения новой карточки на первом месте
  photoGalleryCards.prepend(createPlaceCards(photoCard));
}

const addCard = function (evt) { //функция добавления публикации
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась

  const photoCard = {}; //объект "фотокарточка"
  photoCard.name = placeNameInput.value; //берём имя карточки из значения поля в форме добавлени карточки
  photoCard.link = urlInput.value; //ссылка на  карточку из поля
  comeFirstCard(photoCard); //вызываю функцию расположения новой карточки на первом месте
  closePopup(addPopup); //вызываю функцию закрытия попапа при клике на "Сохранить"
  placeNameInput.value = ''; //сбрасываю значения в полях формы
  urlInput.value = '';
}

formElementAdd.addEventListener('submit', addCard); //вызываю функцию добавления карточки по клику на "Сохранить"

const newPlaceCards = placeCards.map(function (photoCard) { //новый массив из объявленного ранее массива карточек
  return createPlaceCards(photoCard);
});
photoGalleryCards.append(...newPlaceCards); //добавляю новый массив карточек в список