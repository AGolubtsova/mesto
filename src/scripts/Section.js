export default class Section {
  constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      //console.log(this._container);
  }

    // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
  // Метод отрисовки всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
  
}