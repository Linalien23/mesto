import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  buttonEdit,
  buttonAdd,
  formElementEdit,
  formElementAdd,
  placeCards,
  formElementList,
  userInf,
  nameInput,
  jobInput
} from '../utils/constants.js';

import { PopupDeleteImage } from '../components/PopupDeleteImage';

let userId;

const createUserInfo = new UserInfo(userInf);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c49772d7-9370-4a4f-bf19-05cc76e5748b',
    'Content-Type': 'application/json'
  }
});

const pageContent = [api.getProfileInfo(), api.getCards()]; // Получить информацию о пользователе и карточки с сервера (массив с промисами)

Promise.all(pageContent) // Передать массив с промисами методу Promise.all
  .then(([userStats, data]) => {
    userId = userStats._id;
    createUserInfo.setUserInfo(userStats);
    createCard.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  })

const zoomPopupFunc = new PopupWithImage('.zoom-popup'); // экземпляр класса PopupWithImage
zoomPopupFunc.setEventListeners();

const deletePopup = new PopupDeleteImage( // экземпляр класса PopupDeleteImage
  {
    callbackSubmitForm: (data, element, id) => { // Функция удаления карточки
      api.deleteCard(data, id) //  Обращаться к api и удалять из вёрстки элемент карточки
        .then((data) => { // Если всё ок
          element.remove(); // Удалить элемент
          deletePopup.close(); // Закрыть попап
        })
        .catch((err) => { // Если не ок
          console.log(err);
        })
    }
  },
  '.delete-popup');
deletePopup.setEventListeners();


// Функции, передаваемые в Card
function handleCardClick(cardname, link) { // Открытие зум-попапа
  zoomPopupFunc.open(cardname, link);
}

function deleteCardPopup (cardElement, id) { // Открытие попапа удаления карточки
  deletePopup.open(cardElement, id);
}

function likeCards (cardElement, id) { // Поставить лайк
  api.likeCard (cardElement, id)
    .then ((data) => {
      cardElement.querySelector('.photo-gallery__like-btn').classList.add('photo-gallery__like-btn_active'); // Активный лайк
      cardElement.querySelector('.photo-gallery__like-counter').textContent = data.likes.length; // Счётчик лайков
    })
    .catch ((err) => {
      console.log (err);
   })
}

function disiikeCards(cardElement, id) { // Убрать лайк
  api.dislikeCard(cardElement, id)
    .then((data) => {
      cardElement.querySelector('.photo-gallery__like-btn').classList.remove('photo-gallery__like-btn_active');
      cardElement.querySelector('.photo-gallery__like-counter').textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}

const createNewCard = (data) => { // Функция создания карточки
  const card = new Card({ data, handleCardClick, deleteCardPopup, likeCards, disiikeCards}, userId, '#cards');
  const cardElement = card.generateCard();
  return cardElement;
};

const createCard = new Section({ // Создать карточки из массива
  data: placeCards,
  renderer: (item) => {
    const cardFromArray = createNewCard(item);
    createCard.addItem(cardFromArray);
  }
}, '.photo-gallery__cards');
createCard.renderItems(); // Отрисовывать карточки из массива

const popupWithFormEdit = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      createUserInfo.setUserInfo(data);
      popupWithFormEdit.close();
    }
  }, '.edit-popup');
popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm(
  {
    callbackSubmitForm: (data) => {
      const cardFromPopup = createNewCard(data);
      createCard.addItem(cardFromPopup);
      popupWithFormAdd.close();
    }
  }, '.add-popup');
popupWithFormAdd.setEventListeners();

function editProfile() {
  const profileData = createUserInfo.getUserInfo();
  nameInput.value = profileData.username; // заполняю поле "имя" значением из профиля
  jobInput.value = profileData.job; //заполняю поле "о себе" значением из профиля
  editProfileValidate.resetValidation();
  popupWithFormEdit.open();
}

buttonEdit.addEventListener('click', () => {
  editProfile();
});

buttonAdd.addEventListener('click', () => {
  addProfileValidate.resetValidation();
  popupWithFormAdd.open();
});

// Валидация формы редактирования профиля
const editProfileValidate = new FormValidator(formElementList, formElementEdit); // Экземпляр класса FormValidator
editProfileValidate.enableValidation(); // enableValidation в файле валидации

// Валидация формы добавления карточки
const addProfileValidate = new FormValidator(formElementList, formElementAdd);
addProfileValidate.enableValidation();