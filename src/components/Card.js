export class Card { // Создаем конструктор с данными карточки и ее template-элементом
  constructor({ data, userId, handleCardClick, deleteCardPopup, handleLike, handleDislike }, cardSelector) { // В конструкторе будут динамические данные, для каждого экземпляра свои
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner._id;
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
    if (this._userId === this._owner._id) { // если айдишник текущего юзера совпадает с айдишником владельца карточки
      this._deleteCardBtn.classList.add('photo-gallery__delete-btn-visible'); // показываем корзину
    } else {
      this._deleteCardBtn.classList.remove('photo-gallery__delete-btn-visible'); // иначе скрываем корзину
    };
  }

  _checkLikeOwner() {
    this._likes.forEach((likeOwner) => {
      if (likeOwner._id === this._userId) {
        this._likeBtn.classList.add('photo-gallery__like-btn-active');
      }
    })
  }

  _putLike() {
    this._likeBtn.classList.add('photo-gallery__like-btn-active');
    this._handleLike(this.data);
  }

  _removeLike() {
    this._likeBtn.classList.remove('photo-gallery__like-btn-active');
    this._handleDislike(this.data);
  }

  _likesCounter(data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _setEventListeners() {

    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('photo-gallery__like-btn-active')) {
        this._removeLike(this._data);
      } else {
        this._putLike(this._data);
      }
    });

    this._deleteCardButton.addEventListener('click', () => {
      this._deleteCardPopup(this._element, this._id);
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
    this._likesCounter(this._data);
    this._setEventListeners(); // Добавим обработчики

    return this._element; // Вернём элемент наружу
  }

};