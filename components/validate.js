// функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, obj) => { //находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //выбираем элемент ошибки на основе уникального класса 
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage; //заменяем содержимое span с ошибкой на переданный параметр
  errorElement.classList.add(obj.errorTextClass); //показываем сообщение об ошибке
};

// функция скрытия ошибки
const hideInputError = (formElement, inputElement, obj) => { //находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorTextClass); //скрываем сообщение об ошибке
  errorElement.textContent = '';
}

// функция проверяет валидность ОДНОГО поля
const isValid = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) { // если инпут не валиден
    showInputError(formElement, inputElement, inputElement.validationMessage, obj); // показать сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement, obj); // иначе скрыть сообщение об ошибке
  }
};

// проверка валидности МАССИВА полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { // проходим по этому массиву методом some
    return !inputElement.validity.valid;
  });
};

// функция активации кнопки
const activeButtonElement = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.disabled = false;
}

// функция деактивации кнопки
const disableButtonElement = (buttonElement, obj) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.disabled = true;
}

// функция переключения состояние кнопки
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) { //если один из инпутов не валиден 
    disableButtonElement(buttonElement, obj); //кнопка задизейблена
  } else {
    activeButtonElement(buttonElement, obj); //иначе кнопка активна
  }
}

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)); // находим все поля внутри формы
  const buttonElement = formElement.querySelector(obj.submitButtonSelector); // сделаем из них массив методом Array.from
  toggleButtonState(inputList, buttonElement, obj); // вызовем toggleButtonState, чтобы не ждать ввода данных в поля (кнопка должна быть задизейблена с самого начала)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj); // сверяем состояние кнопки при каждом изменении полей формы
      toggleButtonState(inputList, buttonElement, obj); // кнопка станет активной, если все поля валидны
    });
  });
};

// добавление обработчиков всем формам
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector)); // найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  formList.forEach((formElement) => { // переберём полученную коллекцию
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // у каждой формы отменим стандартное поведение
    });
    setEventListeners(formElement, obj); // для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
}

//включение валидации вызовом enableValidation
//все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorTextClass: 'popup__input_texterror'
});