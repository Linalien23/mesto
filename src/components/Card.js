export class Card { // Создаем конструктор с данными карточки и ее template-элементом
  constructor({ data, userId, handleCardClick, deleteCardPopup, handleLike, handleDislike }, cardSelector) { // В конструкторе будут динамические данные, для каждого экземпляра свои
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._deleteCardPopup = deleteCardPopup;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
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

  _hideTrash() {
    if (this._userId !== this._ownerId) { // если айдишник текущего юзера совпадает с айдишником владельца карточки
      this._deleteCardBtn.remove();
    }
  }

  _checkLikeOwner() {
    this._likes.forEach((likeOwner) => {
      if (likeOwner._id === this._userId) {
        this._likeBtn.classList.add('photo-gallery__like-btn_active');
      }
    })
  }

  _putLike() {
    this._handleLike(this._element, this._cardId);
  }

  addLike() {
    this._likeBtn.classList.add('photo-gallery__like-btn_active');
  }

  _disLike() {
    this._handleDislike(this._element, this._cardId);
  }

  removeLike() {
    this._likeBtn.classList.remove('photo-gallery__like-btn_active');
  }

  updateLikes(data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _setEventListeners() {

    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('photo-gallery__like-btn_active')) {
        this._disLike();
      } else {
        this._putLike();
      }
    });

    this._deleteCardBtn.addEventListener('click', () => {
      this._deleteCardPopup(this._element, this._cardId);
    });

    this._cardImage.addEventListener('click', () => { // Клик по карточке открывает зумпопап
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() { // Метод подготовит карточку к публикации
    this._element = this._getTemplate(); // Запишем разметку в приватное поле _element, так у других элементов появится доступ к ней

    this._cardImage = this._element.querySelector('.photo-gallery__item');
    this._cardTitle = this._element.querySelector('.photo-gallery__title');
    this._likeBtn = this._element.querySelector('.photo-gallery__like-btn');
    this._likeCounter = this._element.querySelector('.photo-gallery__like-counter');
    this._deleteCardBtn = this._element.querySelector('.photo-gallery__delete-btn');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._hideTrash();
    this._checkLikeOwner();
    this.updateLikes(this._data);
    this._setEventListeners(); // Добавим обработчики

    return this._element; // Вернём элемент наружу
  }

};