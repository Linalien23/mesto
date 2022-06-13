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
        document.removeEventListener('keyup', this._handleEscClose);// Удалить обработчик нажатия, когда попап закрыт
    }

    _handleEscClose = (evt) => { // Метод закрытия попапа по кнопке Escape
        if (evt.key === 'Escape') { //если пользователь нажал Escape
            this.close(); //вызов функции закрытия попапа
        }
    }; // ПРИВЕТ! Я ПОПРАВИЛА ТУТ, НО В ПРОШЛЫЙ РАЗ ЗАБЫЛА ЗАПУШИТЬ ПЕРЕД ОТПРАВКОЙ НА ПРОВЕРКУ, СОРРИ! =)

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) { 
                this.close();
            }
        });
    }
};