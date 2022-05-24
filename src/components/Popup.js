export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() { // Общая функция открытия попапа
        this._popup.classList.add('popup_opened'); // Добавить попапу новый класс
        document.addEventListener('keyup', this._handleEscClose); // Добавить обработчик нажатия, когда попап открыт
    }

    close() { // Общая функция закрытия попапа
        this._popup.classList.remove('popup_opened'); // Удалить ранее добавленный класс
        document.removeEventListener('keyup', _handleEscClose);// Удалить обработчик нажатия, когда попап закрыт
    }

    _handleEscClose = (evt) => { // Метод закрытия попапа по кнопке Escape
        if (evt.key === 'Escape') { //если пользователь нажал Escape
            const popupOpened = document.querySelector('.popup_opened');
            this.close(popupOpened); //вызов функции закрытия попапа
        }
    };

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-btn')
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close(evt.target);
            }
        });
    }
};