export default class Section {
  constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  
  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
    });
  }
}