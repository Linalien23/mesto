import { Popup } from './Popup.js';

export class PopupDeleteImage extends Popup {
    constructor({ data, callbackSubmitForm }, popupSelector) {
        super(popupSelector);

        this._data = data;
        this._callbackSubmitForm = callbackSubmitForm;

        this._formElement = this._popup.querySelector('.popup__form');
        this._popupDelButton = this._popup.querySelector('.delete-popup__submit-btn');
    }

    open(cardElement, id) {
        this._element = cardElement;
        this._element_id = id;

        super.open();
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            this.renderLoadingDel(true);

            evt.preventDefault();
            this._callbackSubmitForm(this._data, this._element, this._element_id);
        });
        super.setEventListeners();
    }

    renderLoadingDel(isLoading) {  // Добавить лоадер на кнопку "Сохранить"
        if (isLoading) {
            this._popupDelButton.textContent = 'Удаление...';
        } else {
            this._popupDelButton.textContent = 'Да';
        }
    }
}