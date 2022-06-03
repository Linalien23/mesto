export class Card { // Создаем конструктор с данными карточки и ее template-элементом
  constructor({ data, handleCardClick }, cardSelector) { // В конструкторе будут динамические данные, для каждого экземпляра свои
    this._name = data.cardname;
    this._link = data.link;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
    this._handleCardClick = handleCardClick;
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

    this._cardImage.addEventListener('click', () => { // Клик по карточке открывает зумпопап
      this._handleCardClick(this._name, this._link)
    });
  }

  _likeCard() { // Метод лайка
    this._like.classList.toggle('photo-gallery__like-btn_active');
  }

  _deleteCard() { // Метод удаления карточки
    this._element.remove();
    this._element = null;
  }

};