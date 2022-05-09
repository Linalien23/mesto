import { openPopup } from "./index.js";

export class Card {
  constructor(name, link, cardSelector) { // В конструкторе будут динамические данные, для каждого экземпляра свои
    this._name = name; // name и link — приватные поля, 
    this._link = link; // они нужны только внутри класса
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }

  _getTemplate() {
    const cardElement = document // забираем разметку из HTML и клонируем элемент
      .querySelector(this._cardSelector) // Используем this._cardSelector
      .content
      .querySelector('.photo-gallery__card')
      .cloneNode(true);
    return cardElement; // Вернём DOM-элемент карточки
  }

  generateCard() { // Метод подготовит карточку к публикации
    this._element = this._getTemplate(); // Запишем разметку в приватное поле _element, так у других элементов появится доступ к ней
    this._cardImage = this._element.querySelector('.photo-gallery__item');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photo-gallery__title').textContent = this._name;
    this._like = this._element.querySelector('.photo-gallery__like-btn');
    this._setEventListeners(); // Добавим обработчики
    return this._element; // Вернём элемент наружу
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.photo-gallery__delete-btn').addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._openZoomPopup();
    });
  }

  _likeCard() { // Метод лайка
    this._like.classList.toggle('photo-gallery__like-btn_active');
  }

  _deleteCard() { // Метод удаления карточки
    this._element.remove();
    this._element = null;
  }

  _openZoomPopup() {
    document.querySelector('.zoom-popup__item').src = this._link;
    document.querySelector('.zoom-popup__item').alt = this._name;
    document.querySelector('.zoom-popup__title').textContent = this._name;
    openPopup(document.querySelector('.zoom-popup'));
  }

}