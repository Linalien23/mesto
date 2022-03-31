window.addEventListener('load', () => {
    const formElement = document.querySelector('form');
    const nameValue = document.querySelector('.profile__inner-name');
    const jobValue  = document.querySelector('.profile__inner-activity');

    //кнопки
    const editButton = document.querySelector('.profile__inner-edit-btn');
    const addButton = document.querySelector('.profile__add-btn');

    //попапы
    const editPopup = document.querySelector('.edit__popup');
    const addPopup = document.querySelector('.add__popup');

    //инпуты
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_job');
    const placeInput = document.querySelector('.popup__input_type_place');
    const urlInput = document.querySelector('.popup__input_type_url');

    //закрывающие крестики
    const closeEditButton = editPopup.querySelector('.popup__close-btn');
    const closeAddButton = addPopup.querySelector('.popup__close-btn');

    //массив карточек
    const placeCards = [
        {
          name: 'Гамсутль',
          link: './images/Gams.jpg'
        },
        {
          name: 'Хунзах',
          link: './images/Hun.jpg'
        },
        {
          name: 'Сулак',
          link: './images/Sulack.jpg'
        },
        {
          name: 'Матлас',
          link: './images/Matlas.jpg'
        },
        {
          name: 'Ирганай',
          link: './images/Irganai.jpg'
        },
        {
          name: 'Дербент',
          link: './images/Derbent.jpg'
        }
      ]; 

    //загрузка карточек на страницу
    const photoGalleryCards = document.querySelector('.photo-gallery__cards');

    const templateCards = document.querySelector('#cards').content;

    placeCards.forEach(function (item) {
        photoGalleryCard = templateCards.querySelector('.photo-gallery__card').cloneNode(true);;

        photoGalleryCard.querySelector('.photo-gallery__item').src = item.link;
        photoGalleryCard.querySelector('.photo-gallery__title').textContent = item.name;

        //кнопка лайка
        photoGalleryCard.querySelector('.photo-gallery__like-btn').addEventListener('click', function (evt) {
            evt.target.classList.toggle('photo-gallery__like-btn_active');
        });

        //корзина
        



        photoGalleryCards.append(photoGalleryCard);
    })

    function openEditPopup() {
        editPopup.classList.add('popup_opened');
        nameInput.value = nameValue.textContent;
        jobInput.value = jobValue.textContent;
    }

    function closeEditPopup() {
        editPopup.classList.remove('popup_opened');
    }

    editButton.addEventListener('click', openEditPopup);

    closeEditButton.addEventListener('click', closeEditPopup);

    function formSubmitHandler (evt) {
        evt.preventDefault(); 
        
        nameValue.textContent = nameInput.value;
        jobValue.textContent = jobInput.value;
        closeEditPopup();
    }

    formElement.addEventListener('submit', formSubmitHandler); 

    function openAddPopup() {
        addPopup.classList.add('popup_opened');
    }

    function closeAddPopup() {
        addPopup.classList.remove('popup_opened');
    }

    addButton.addEventListener('click', openAddPopup);
    
    closeAddButton.addEventListener('click', closeAddPopup);

});