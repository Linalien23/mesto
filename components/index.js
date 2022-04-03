const nameValue = document.querySelector('.profile__inner-name');
const jobValue = document.querySelector('.profile__inner-activity');

//кнопки
const editButton = document.querySelector('.profile__inner-edit-btn');
const addButton = document.querySelector('.profile__add-btn');

//попапы
const editPopup = document.querySelector('.edit__popup');
const addPopup = document.querySelector('.add__popup');

//формы
const formElement = document.querySelector('form');
const editForm = document.querySelector('.edit__form');
const addForm = document.querySelector('.add__form');

//инпуты
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeNameInput = document.querySelector('.popup__input_type_place');
const urlInput = document.querySelector('.popup__input_type_url');

//закрывающие крестики
const closeEditButton = editPopup.querySelector('.popup__close-btn');
const closeAddButton = addPopup.querySelector('.popup__close-btn');

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


//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() { //функция открытия попапа РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  editPopup.classList.add('popup_opened'); //добавляю попапу РЕДАКТИРОВАНИЯ ПРОФИЛЯ новый класс
  nameInput.value = nameValue.textContent; //заполняю поле "имя" значением из профиля
  jobInput.value = jobValue.textContent; //заполняю поле "о себе" значением из профиля
}

function closeEditPopup() { //функция закрытия попапа
  editPopup.classList.remove('popup_opened'); //удаляю у попапа ранее добавленный класс
}

editButton.addEventListener('click', openEditPopup); //открыть попап по клику на кнопку редактирования профиля

closeEditButton.addEventListener('click', closeEditPopup); //закрыть попап по клику на крестик

function formSubmitHandler(evt) { //отправить форму и добавить её содержимое на страницу
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась

  nameValue.textContent = nameInput.value; //заменяю имя в профиле на введённое в форме
  jobValue.textContent = jobInput.value; //заменяю "о себе" в профиле на введённое в форме
  closeEditPopup(); //вызываю функцию закрытия попапа при клике на "Сохранить"
}

formElement.addEventListener('submit', formSubmitHandler); //отправить форму и добавить её содержимое на страницу

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

  photoGalleryCard.querySelector('.photo-gallery__delete-btn').addEventListener('click', () => { // удаление публикации
    photoGalleryCard.remove();
  });

  return photoGalleryCard;
};

//ДОБАВЛЕНИЕ КАРТОЧКИ
function openAddPopup() { //функция открытия попапа ДОБАВЛЕНИЯ КАРТОЧКИ
  addPopup.classList.add('popup_opened');
}
addButton.addEventListener('click', openAddPopup); //открываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по кнопке

function closeAddPopup() { //функция закрытия попапа ДОБАВЛЕНИЯ КАРТОЧКИ
  addPopup.classList.remove('popup_opened');
}
closeAddButton.addEventListener('click', closeAddPopup); //закрываю попап ДОБАВЛЕНИЯ КАРТОЧКИ кликом по крестику

const photoGalleryCards = document.querySelector('.photo-gallery__cards'); //тут все карточки

const comeFirstCard = function (photoCard) { //функция расположения новой карточки на первом месте
  photoGalleryCards.prepend(createCard(photoCard));
}

function addCard(evt) { //функция добавления публикации
  evt.preventDefault(); //запретить выполнение события по умолчанию, чтобы при отправении формы страница не перезагружалась

  const photoCard = {}; //объект "фотокарточка"
  photoCard.name = placeNameInput.value; //берём имя карточки из значения поля в форме добавлени карточки
  photoCard.link = urlInput.value; //ссылка на  карточку из поля
  comeFirstCard(photoCard); //вызываю функцию расположения новой карточки на первом месте
  closeAddPopup() //вызываю функцию закрытия попапа
}

formElement.addEventListener('submit', addCard); //вызываю функцию добавления карточки 

const newPlaceCards = placeCards.map(function (photoCard) { //новый массив из объявленного ранее массива карточек
  return createPlaceCards(photoCard);
});
photoGalleryCards.append(...newPlaceCards); //добавляю новый массив карточек в список