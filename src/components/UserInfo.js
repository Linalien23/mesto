export class UserInfo {
    constructor({ nameValueSelector, jobValueSelector, avatarSelector }) {
        this._nameValue = document.querySelector(nameValueSelector);
        this._jobValue = document.querySelector(jobValueSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const data = {}
        data.name = this._nameValue.textContent;
        data.about = this._jobValue.textContent;
        return data; // Объект с данными пользователя; подставляется в форму при открытии
    }

    setUserInfo(data) { // Метод  принимает новые данные пользователя и добавляет их на страницу
        this._nameValue.textContent = data.username;
        this._jobValue.textContent = data.job;
        this._avatar.src = data.avatar;
    }
}