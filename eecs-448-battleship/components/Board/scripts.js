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
      ${Array.from({ length: cols }).fill('<td></td>').join('\n')}
    </tr>`
      )
      .join('\n')} 
  </tbody>
</table>`;

// The name of this component
// Later, to render this component, call:
// new Board(options).render(container)
class Board extends Component {
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

    return this;
  }
  remove() {
    super.remove();
  }
}
