export class UserInfo {
    constructor({ nameValueSelector, jobValueSelector }) {
        this._nameValue = document.querySelector(nameValueSelector);
        this._jobValue = document.querySelector(jobValueSelector);
    }

    getUserInfo() {
        const data = {}
        data.username = this._nameValue.textContent;
        data.job = this._jobValue.textContent;
        return data; // Объект с данными пользователя; подставляется в форму при открытии
    }

    setUserInfo(data) { // Метод  принимает новые данные пользователя и добавляет их на страницу
        this._nameValue.textContent = data.username;
        this._jobValue.textContent = data.job;
    }
}