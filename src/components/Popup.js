export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelectorAll(popupSelector);
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
            closePopup(popupOpened); //вызов функции закрытия попапа
        }
    };

    setEventListeners() {
        this._popup.forEach((popup) => { // пробегаемся по всем попапам, навешивая обработчик
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) { // закрываем попап (любой) по нажатию на оверлей
                    this.close(popup);
                }
                if (evt.target.classList.contains('popup__close-btn')) { // закрываем попап (любой) по нажатию на крестик
                    this.close(popup);
                }
            })
        })
    };
}