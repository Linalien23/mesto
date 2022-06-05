import { Popup } from './Popup.js';

export class PopupDeleteImage extends Popup {
    constructor({ data, callbackSubmit }, popupSelector) {
        super(popupSelector);

        this._data = data;
        this._callbackSubmit = callbackSubmit;

        this._formElement = this._popup.querySelector('.popup__form');
    }

    open(cardElement, id) {
        this._element = cardElement;
        this._element_id = id;
        
        super.open();
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._data, this._element, this._element_id);
        });
        super.setEventListeners();
    }
}   