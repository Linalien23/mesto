import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ callbackSubmitForm }, popupSelector) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm; // Колбэк сабмита формы
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        his._popupButton = this._popup.querySelector('.popup__submit-btn');
    }

    _getInputValues() { // Собрать данные всех полей формы
        this._formValues = {}; // Создать пустой объект
        this._inputList.forEach((input) => { // Пройтись по всем инпутам
            this._formValues[input.name] = input.value; // Добавить в созданный выше объект значения всех полей
        });
        return this._formValues; // Вернуть объект
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', () => { // Отправить форму и добавить её содержимое на страницу
            this._callbackSubmitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._formElement.reset(); // Сбрасывать форму при закрытии попапа
    }

    renderLoading(isLoading) {  // Добавить лоадер на кнопку "Сохранить"
        if (isLoading) {
            this._popupButton.textContent = 'Сохранение...';
        } else {
            this._popupButton.textContent = 'Сохранить';
        }
    }
}