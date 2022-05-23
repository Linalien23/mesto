import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.zoom-popup__item');
        this._imageTitle = this._popup.querySelector('.zoom-popup__title');
    }

    open(cardname, link) {
        this._image.src = link;
        this._image.alt = cardname;
        this._imageTitle.textContent = cardname;
        super.open();
    }
}