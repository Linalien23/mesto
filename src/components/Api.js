export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    handleResponse(res) { // Обработка ответа
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getProfileInfo() { // Получить информацию о пользователе
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    getInitialCards() { // Получить карточки
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    updateUserInfo(data) { // Обновить информацию о пользователе
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }) // Преобразовать данные в строку
            .then((res) =>
                this.handleResponse(res)
            );
    }

    createNewCard(data) { // Добавить новую фотографию
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    deleteCard(data, id) { // Удалить карточку
        const cardId = id;
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    updateUserAvatar(data) { // Обновить аватар пользователя
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    likeCard(data, id) { // Поставить лайк фотографии
        const cardId = id;
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

    dislikeCard(data, id) { // Удалить лайк
        const cardId = id;
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) =>
                this.handleResponse(res)
            );
    }

}