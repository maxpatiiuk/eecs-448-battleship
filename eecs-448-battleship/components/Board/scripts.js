'use strict';

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
// new Board(options).render(this.container)
/**
 * Base board class
 * @class Board
 * @constructor
 * @param options
 * @extends Component
 * @public
 */
class Board extends Component {
  /**
   * Relevant class event listeners 
   * @type {object}
   * @memberof Board
   * @param onMouseOver mouse over event listener
   * @param onMouseOut mouse over event listener
   * @param onClick mouse over event listener
   * @public
   */
  static #eventListeners = {
    onMouseOver: 'mouseover',
    omMouseOut: 'mouseout',
    onClick: 'click',
  };

  /**
   * Relevant class events 
   * @type {object}
   * @memberof Board
   * @public
   */
  #events = {};
  constructor(options) {
    super(options);
  }

  /**
   * Renders a defined view into a container. Passes in necessary, predefined
   * render parameters.
   * @async
   * @function render
   * @memberof Board
   * @param container Container to render the view within
   */
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    this.container.innerHTML = generateBoard(this.options);
    this.cells = Array.from(
      this.container.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
    ).map((row) => Array.from(row.getElementsByTagName('td')));
    this.container.style.setProperty('--cols', this.options.cols);

    // Set event listeners
    Object.entries(Board.#eventListeners)
      .filter(([optionName]) => typeof this.options[optionName] === 'function')
      .forEach(([optionName, eventName]) => {
        this.#events[optionName] = ({ target }) => {
          // Only run event callbacks for buttons
          if (target.tagName !== 'BUTTON') return;

          const cell = target.parentElement;
          const col = getElementIndex(cell) - 1;
          const row = getElementIndex(cell.parentElement);
          this.options[optionName]({
            cell,
            col,
            row,
            eventName,
          });
        };
        this.container.addEventListener(eventName, this.#events[optionName]);
      });

    return this;
  }

  /**   
   * View remove function for ephemeral objects, ie. eventListeners
   * @function remove
   * @memberof Board
   */
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
