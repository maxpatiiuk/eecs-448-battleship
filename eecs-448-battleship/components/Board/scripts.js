'use strict';

const getNthLetter = (index) => String.fromCharCode('A'.charCodeAt(0) + index);

const generateBoard = ({ rows, cols }) => `<table>
  <thead>
    <tr>
      ${Array.from({ length: cols + 1 })
        .map(
          (_, col) => `<th scope="col">
        ${col === 0 ? '' : getNthLetter(col - 1)}
      </th>`
        )
        .join('\n')}
    </tr>
  </thead>
  <tbody>
    ${Array.from({ length: rows })
      .map(
        (_, row) => `<tr>
      <th scope="row">${row + 1}</th>
      ${Array.from({ length: cols })
        .fill(
          `<td>
        <button type="button"></button>
      </td>`
        )
        .join('\n')}
    </tr>`
      )
      .join('\n')} 
  </tbody>
</table>`;

// The name of this component
// Later, to render this component, call:
// new Board(options).render(container)
class Board extends Component {
  static #eventListeners = {
    onMouseOver: 'mouseover',
    omMouseOut: 'mouseout',
    onClick: 'click',
  };
  #events = {};
  constructor(options) {
    super(options);
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    this.container.innerHTML = generateBoard(this.options);
    this.container.style.setProperty('--cols', this.options.cols);

    // Set event listeners
    Object.entries(Board.#eventListeners)
      .filter(([optionName]) => typeof this.options[optionName] === 'function')
      .forEach(([optionName, eventName]) => {
        this.#events[optionName] = (event) =>
          // Only run event callbacks for buttons
          event.target.tagName === 'BUTTON'
            ? this.options[optionName](event)
            : undefined;
        this.container.addEventListener(eventName, this.#events[optionName]);
      });

    return this;
  }
  remove() {
    super.remove();

    // Unset event listeners
    Object.entries(Board.#eventListeners)
      .filter(([optionName]) => typeof this.options[optionName] === 'function')
      .forEach(([optionName, eventName]) =>
        this.container.removeEventListener(eventName, this.#events[optionName])
      );
  }
}
