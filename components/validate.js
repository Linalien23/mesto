export class FormValidator {
  constructor(obj, form) {
    this._input = obj.input;
    this._submitButton = obj.submitButton;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorTextClass = obj.errorTextClass;
    this._form = form;

    this._buttonElement = this._form.querySelector(this._submitButton);
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
  }

  _showInputError = (inputElement, errorMessage) => { // функция показа ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // выбираем элемент ошибки на основе уникального класса 
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorTextClass);
  }

  _hideInputError = (inputElement) => { // функция скрытия ошибки
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorTextClass);
    errorElement.textContent = " ";
  }

  _hasInvalidInput = () => { // проверка валидности МАССИВА полей
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButtonElement = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _activeButtonElement = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButtonElement(this._buttonElement);
    } else {
      this._activeButtonElement(this._buttonElement);
    }
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}



// // функция показа ошибки
// const showInputError = (formElement, inputElement, errorMessage, obj) => { //находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //выбираем элемент ошибки на основе уникального класса 
//   inputElement.classList.add(obj.inputErrorClass);
//   errorElement.textContent = errorMessage; //заменяем содержимое span с ошибкой на переданный параметр
//   errorElement.classList.add(obj.errorTextClass); //показываем сообщение об ошибке
// };

// // функция скрытия ошибки
// const hideInputError = (formElement, inputElement, obj) => { //находим элемент ошибки внутри самой функции
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(obj.inputErrorClass);
//   errorElement.classList.remove(obj.errorTextClass); //скрываем сообщение об ошибке
//   errorElement.textContent = '';
// }

// // функция проверяет валидность ОДНОГО поля
// const isValid = (formElement, inputElement, obj) => {
//   if (!inputElement.validity.valid) { // если инпут не валиден
//     showInputError(formElement, inputElement, inputElement.validationMessage, obj); // показать сообщение об ошибке
//   } else {
//     hideInputError(formElement, inputElement, obj); // иначе скрыть сообщение об ошибке
//   }
// };

// // проверка валидности МАССИВА полей
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => { // проходим по этому массиву методом some
//     return !inputElement.validity.valid;
//   });
// };

// // функция активации кнопки
// const activeButtonElement = (buttonElement, obj) => {
//   buttonElement.classList.remove(obj.inactiveButtonClass);
//   buttonElement.disabled = false;
// }

// // функция деактивации кнопки
// const disableButtonElement = (buttonElement, obj) => {
//   buttonElement.classList.add(obj.inactiveButtonClass);
//   buttonElement.disabled = true;
// }

// // функция переключения состояние кнопки
// const toggleButtonState = (inputList, buttonElement, obj) => {
//   if (hasInvalidInput(inputList)) { //если один из инпутов не валиден 
//     disableButtonElement(buttonElement, obj); //кнопка задизейблена
//   } else {
//     activeButtonElement(buttonElement, obj); //иначе кнопка активна
//   }
// }

// const setEventListeners = (formElement, obj) => {
//   const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)); // находим все поля внутри формы
//   const buttonElement = formElement.querySelector(obj.submitButtonSelector); // сделаем из них массив методом Array.from
//   toggleButtonState(inputList, buttonElement, obj); // вызовем toggleButtonState, чтобы не ждать ввода данных в поля (кнопка должна быть задизейблена с самого начала)
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, obj); // сверяем состояние кнопки при каждом изменении полей формы
//       toggleButtonState(inputList, buttonElement, obj); // кнопка станет активной, если все поля валидны
//     });
//   });
// };

// // добавление обработчиков всем формам
// const enableValidation = (obj) => {
//   const formList = Array.from(document.querySelectorAll(obj.formSelector)); // найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
//   formList.forEach((formElement) => { // переберём полученную коллекцию
//     setEventListeners(formElement, obj); // для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
//   });
// }

// //включение валидации вызовом enableValidation
// //все настройки передаются при вызове
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-btn',
//   inactiveButtonClass: 'popup__submit-btn_inactive',
//   inputErrorClass: 'popup__input_error',
//   errorTextClass: 'popup__input_texterror'
// });