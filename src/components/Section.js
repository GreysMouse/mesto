class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(item, direction) {
    if(direction === 'toBegin') this._container.prepend(item);
    else this._container.append(item);
  }
}

export {Section};