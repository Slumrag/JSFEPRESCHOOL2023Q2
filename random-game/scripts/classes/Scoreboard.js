export class Scoreboard {
  constructor(params) {
    this._list = JSON.parse(localStorage.getItem('scoreboard')) ?? [];
    this._key = params?.key ?? 'score';
    this._maxItems = params?.maxItems ?? 10;
  }
  add(data) {
    if (!data.hasOwnProperty(this.key)) return;
    if (this.get(-1)?.[this.key] > data[this.key]) return;
    if (this.hasScore(data)) {
      const oldDataIndex = this._list.findIndex((el) => el[this.key] === data[this.key]);
      this._list[oldDataIndex] = data;
      return;
    }
    if (this._list.length < this._maxItems) {
      this._list.push(data);
    } else {
      const closestDataIndex = this._list.findIndex((el) => el[this.key] < data[this.key]);
      this._list.splice(closestDataIndex, 0, data);
      this._list.pop();
    }
    this._list.sort((a, b) => b[this.key] - a[this.key]);
  }
  get maxItems() {
    return this._maxItems;
  }
  set maxItems(number) {
    if (number > 0) this._maxItems = number;
  }
  get key() {
    return this._key;
  }
  set key(key) {
    this._key = String(key);
  }
  get list() {
    return this._list;
  }
  get(index) {
    return this._list.at(index);
  }
  hasScore(data) {
    return this._list.some((el) => el[this.key] === data?.[this.key]);
  }
  save() {
    localStorage.setItem('scoreboard', JSON.stringify(this._list));
  }
  static createListItem(number, score, ...args) {
    const timestamp = new Date(args[0]);
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    });
    const timeString = formatter.format(timestamp);
    const element = document.createElement('li');
    element.classList.add('scoreboard__item');
    element.innerHTML = `
              <p class="scoreboard__index">${number}</p>
              <p class="scoreboard__score">${score}</p>
              <time class="scoreboard__time">${timeString}</time>
            `;
    return element;
  }
  static displayList(listContainer, list) {
    while (listContainer?.firstChild) {
      listContainer?.removeChild(listContainer?.lastChild);
    }
    if (list.length === 0) {
      const placeholder = document.createElement('li');
      placeholder.classList.add('scoreboard__item_placeholder');
      placeholder.textContent = 'No entries yet...';
      listContainer.append(placeholder);
      return;
    }
    list.forEach((item, i) => {
      const [score, ...values] = Object.values(item);
      const HTMLitem = Scoreboard.createListItem(i + 1, score, ...values);
      listContainer?.append(HTMLitem);
    });
  }
}
