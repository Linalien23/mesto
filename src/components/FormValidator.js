export { formElementList, FormValidator };

const formElementList = {
  input: '.popup__input',
  submitButton: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorTextClass: 'popup__input_texterror'
};

class FormValidator {
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

  _toggleButtonState = () => { 
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButtonElement(this._buttonElement); // Дизейблить кнопку при невалидном поле
    } else {
      this._activeButtonElement(this._buttonElement);
    }
  }

  resetValidation() { // Метод сброса неверных данных формы при закрытии попапа с формой
    this._toggleButtonState(); 

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); 
    });

  } 

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};