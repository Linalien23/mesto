import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ callbackSubmitForm }, popupSelector) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm; // Колбэк сабмита формы
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => { // Пройтись по всем инпутам
            this._formValues[input.name] = input.value; // 
        });
        return this._formValues;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', () => { // Отправить форму и добавить её содержимое на страницу
            this._callbackSubmitForm(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._formElement.reset(); // Сбрасывать форму при закрытии попапа
    }
}