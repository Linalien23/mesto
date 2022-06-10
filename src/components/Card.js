export class Card { // Создаем конструктор с данными карточки и ее template-элементом
  constructor({ data, handleCardClick, deleteCardPopup, likeCards, dislikeCards }, cardSelector) { // В конструкторе будут динамические данные, для каждого экземпляра свои
    this._name = data.cardname;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._like = data.like;
    this._handleCardClick = handleCardClick;
    this._deleteCardPopup = deleteCardPopup;
    this._likeCards = likeCards;
    this._dislikeCards = dislikeCards;
    this._userId = userId;
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
    this._likeBtn = this._element.querySelector('.photo-gallery__like-btn');
    this._likeCounter = this._element.querySelector('.photo-gallery__like-counter');
    this._likeCounter.textContent = this._like.length;

    if (this._putLike()) { // Поставить лайк
      this._likeBtn.classList.add('photo-gallery__like-btn-active');
    }

    this._deleteCardButton = this._element.querySelector('.photo-gallery__delete-btn') // находим корзину
    if (this._userId === this._owner._id) { // если айдишник текущего юзера совпадает с айдишником владельца карточки
      this._deleteCardButton.classList.add('photo-gallery__delete-btn-visible'); // показываем корзину
    } else {
      this._deleteCardButton.classList.remove('photo-gallery__delete-btn-visible'); // иначе скрываем корзину
    };

    this._setEventListeners(); // Добавим обработчики
    return this._element; // Вернём элемент наружу
  }



  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._likeBtn = !this._likeBtn;
      if (!this._likeBtn) {
        this._likeCards(this._element, this._id, this._likeCounter);
      } else {
        this._dislikeCards(this._element, this._id, this._likeCounter);
      }
    });

    this._deleteCardButton.addEventListener('click', () => {
      this._deleteCardPopup(this._element, this._id);
    });

    this._cardImage.addEventListener('click', () => { // Клик по карточке открывает зумпопап
      this._handleCardClick(this._name, this._link)
    });
  }

};