//формы
export const formElementAdd = document.querySelector('.add-popup__form');
export const formElementEdit = document.querySelector('.edit-popup__form');

export const userInf = {
    nameValueSelector: '.profile__inner-name',
    jobValueSelector: '.profile__inner-activity'
}

export const formElementList = {
    input: '.popup__input',
    submitButton: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_error',
    errorTextClass: 'popup__input_texterror'
  };

//кнопки
export const buttonEdit = document.querySelector('.profile__inner-edit-btn'); // Редактировать
export const buttonAdd = document.querySelector('.profile__add-btn'); // Добавить фотографию


//инпуты
export const nameInput = popupEdit.querySelector('.popup__input_type_name');
export const jobInput = popupEdit.querySelector('.popup__input_type_job');

//массив карточек
export const placeCards = [ // Добавить эти карточки при загрузке страницы
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