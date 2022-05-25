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

import GamsImage from '../images/Gams.jpg';
import HunImage from '../images/Hun.jpg';
import SulackImage from '../images/Sulack.jpg';
import MatlasImage from '../images/Matlas.jpg';
import IrganaiImage from '../images/Irganai.jpg';
import DerbentImage from '../images/Derbent.jpg';

//массив карточек
export const placeCards = [ // Добавить эти карточки при загрузке страницы
  {
    cardname: 'Гамсутль',
    link: GamsImage
  },
  {
    cardname: 'Хунзах',
    link: HunImage
  },
  {
    cardname: 'Сулак',
    link: SulackImage
  },
  {
    cardname: 'Матлас',
    link: MatlasImage
  },
  {
    cardname: 'Ирганай',
    link: IrganaiImage
  },
  {
    cardname: 'Дербент',
    link: DerbentImage
  }
];