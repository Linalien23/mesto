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

const zoomPopupFunc = new PopupWithImage ('.zoom-popup'); // экземпляр класса PopupWithImage
zoomPopupFunc.setEventListeners();


// ФУНКЦИЯ ОТКРЫТИЯ ЗУМ-ПОПАПА ДЛЯ ПЕРЕДАЧИ В Card (ИЗ РЕВЬЮ)
function handleCardClick(cardname, link) {
  zoomPopupFunc.open(cardname, link);
}

// НОВЫЙ КОД ЗАГРУЗКИ И ДОБАВЛЕНИЯ КАРТОЧЕК
const createNewCard = (data) => { // Функция создания карточки
  const card = new Card({ data, handleCardClick }, '#cards');
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

const createUserInfo = new UserInfo(userInf);

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