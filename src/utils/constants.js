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
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

//массив карточек
export const placeCards = [ // Добавить эти карточки при загрузке страницы
  {
    cardname: 'Гамсутль',
    link: '../images/Gams.jpg'
  },
  {
    cardname: 'Хунзах',
    link: '../images/Hun.jpg'
  },
  {
    cardname: 'Сулак',
    link: '../images/Sulack.jpg'
  },
  {
    cardname: 'Матлас',
    link: '../images/Matlas.jpg'
  },
  {
    cardname: 'Ирганай',
    link: '../images/Irganai.jpg'
  },
  {
    cardname: 'Дербент',
    link: '../images/Derbent.jpg'
  }
];