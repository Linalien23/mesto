export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(data) { // Метод, отвечающий за отрисовку всех элементов
        data.reverse().forEach((item) => { // Перебирает массив данных _dataArray
            this._renderer(item);
        });
    }

    addItem(element) { // Метод, принимающий DOM-элемент и добавляющий его в контейнер
        this._container.prepend(element);
    }
}