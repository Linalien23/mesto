window.addEventListener('load', () => {
    const popupElement = document.querySelector('.popup');
    const editButton = document.querySelector('.profile__inner-edit-btn');
    const closeButton = document.querySelector('.popup__close-btn');
    let formElement = document.querySelector('form');
    let nameInput = document.querySelector('.popup__input_type_name');
    let jobInput = document.querySelector('.popup__input_type_job');
    let nameValue = document.querySelector('.profile__inner-name');
    let jobValue  = document.querySelector('.profile__inner-activity');

    function openPopup() {
        popupElement.classList.add('popup_opened');
        nameInput.value = nameValue.textContent;
        jobInput.value = jobValue.textContent;
    }

    function closePopup() {
        popupElement.classList.remove('popup_opened');
    }

    editButton.addEventListener('click', openPopup);

    closeButton.addEventListener('click', closePopup);

    function formSubmitHandler (evt) {
        evt.preventDefault(); 
        
        nameValue.textContent = nameInput.value;
        jobValue.textContent = jobInput.value;
        closePopup();

    }

    formElement.addEventListener('submit', formSubmitHandler); 

});
