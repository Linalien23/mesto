window.addEventListener('load', () => {
    const editPopup = document.querySelector('.edit__popup');
    const addPopup = document.querySelector('.add__popup');
    const editButton = document.querySelector('.profile__inner-edit-btn');
    const closeButton = document.querySelector('.popup__close-btn');
    const formElement = document.querySelector('form');
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_job');
    const nameValue = document.querySelector('.profile__inner-name');
    const jobValue  = document.querySelector('.profile__inner-activity');
    const addButton = document.querySelector('.profile__add-btn');
    const placeInput = document.querySelector('.popup__input_type_place');
    const urlInput = document.querySelector('.popup__input_type_url');

    function openEditPopup() {
        editPopup.classList.add('popup_opened');
        nameInput.value = nameValue.textContent;
        jobInput.value = jobValue.textContent;
    }

    function closeEditPopup() {
        editPopup.classList.remove('popup_opened');
    }

    editButton.addEventListener('click', openEditPopup);

    closeButton.addEventListener('click', closeEditPopup);

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
    
    closeButton.addEventListener('click', closeAddPopup);

});


