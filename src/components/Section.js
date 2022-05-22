export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._dataArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() { // Метод, отвечающий за отрисовку всех элементов
        this._dataArray.forEach((item) => { // Перебирает массив данных _dataArray
            this._renderer(item);
        });
    }

    addItem(element) { // Метод, принимающий DOM-элемент и добавляющий его в контейнер
        this._container.prepend(element);
    }
}