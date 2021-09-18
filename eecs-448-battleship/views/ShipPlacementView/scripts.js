'use strict';

// The name of this view
// Later, to render this view, call:
// new ShipPlacementView(options).render(this.container)

class ShipPlacementView extends View {
  constructor(options) {
    super(options);
    this.currentShip = undefined;
    this.currentShipSize = undefined;
    this.isValidPlacement = false;
    this.orientatioon = 'horizontal';
    this.shipShadow = undefined;

    this.handleBoardCellOver = this.handleBoardCellOver.bind(this);
    this.handleBoardCellOut = this.handleBoardCellOut.bind(this);
    this.handleBoardCellClick = this.handleBoardCellClick.bind(this);
    this.handleSelectedShipChange = this.handleSelectedShipChange.bind(this);
    this.handleRotateShip = this.handleRotateShip.bind(this);
    this.handleFinishPlacement = this.handleFinishPlacement.bind(this);
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* Render the 9x10 grid */
    this.board = await new Board({
      rows,
      cols,
      tagName: 'section',
      onMouseOver: this.handleBoardCellOver,
      onMouseOut: this.handleBoardCellOut,
      onClick: this.handleBoardCellClick,
    }).render(this.container.getElementsByClassName('board')[0]);

    /* Render between 1 and 6 ships on the sidebar */
    const fleet = this.container.getElementsByClassName('fleet')[0];
    fleet.innerHTML = Array.from({
      length: this.options.numberOfShips,
    })
      .map(
        (_, index) => `<label>
        <input type="radio" class="sr-only" name="ship">
        <span class="ship" aria-hidden="true">
          ${Array.from({ length: index + 1 })
            .fill('<span></span>')
            .join('\n')}
        </span>
        <p class="sr-only">Ship ${index + 1}</p>
      </label>`
      )
      .join('\n');

    /* Allow selecting a ship and putting it on the board */
    this.ships = Array.from(fleet.getElementsByTagName('input'));
    this.ships.forEach((input) =>
      input.addEventListener('change', this.handleSelectedShipChange)
    );

    this.rotateButton = this.container.getElementsByClassName('rotate')[0];
    this.rotateButton.addEventListener('click', this.handleRotateShip);

    this.finishButton = this.container.getElementsByClassName('finish')[0];
    this.finishButton.addEventListener('click', this.handleFinishPlacement);

    /*
     * TODO: once ready, call:
     *  new GameBoard({ board: board }).render(this.container),
     *   where board is a 9x10 array of booleans signifying whether there is a
     *   ship at that cell
     */

    return this;
  }
  handleSelectedShipChange({ target }) {
    this.currentShip = target;
    this.currentShipSize = getElementIndex(target.parentElement) + 1;
  }
  handleRotateShip() {
    const isToggled = this.orientatioon === 'vertical';
    this.orientatioon = isToggled ? 'horizontal' : 'vertical';
    this.rotateButton.ariaPressed = isToggled;
  }
  handleBoardCellOver({ row, col }) {
    if (typeof this.currentShipSize !== 'number' || this.currentShip.disabled)
      return;
    this.shipShadow = Array.from({
      length: this.orientatioon === 'vertical' ? this.currentShipSize : 1,
    }).flatMap((_, rowIndex) =>
      Array.from({
        length: this.orientatioon === 'horizontal' ? this.currentShipSize : 1,
      }).map((_, colIndex) => [row + rowIndex, col + colIndex])
    );
    this.isValidPlacement = this.shipShadow.every(
      ([row, col]) =>
        typeof this.board.cells[row]?.[col] !== 'undefined' &&
        [
          [row, col],
          [row - 1, col - 1],
          [row - 1, col + 1],
          [row + 1, col - 1],
          [row + 1, col + 1],
        ].every(
          ([row, col]) =>
            this.board.cells[row]?.[col]?.classList.contains('ship') !== true
        )
    );

    this.handleBoardCellOut();
    if (this.isValidPlacement)
      this.shipShadow.forEach(([row, col]) =>
        this.board.cells[row][col].classList.add('shadow')
      );
  }
  handleBoardCellOut() {
    this.board.cells.flat().map((cell) => cell.classList.remove('shadow'));
  }
  handleBoardCellClick(event) {
    if (!this.isValidPlacement) return;
    this.isValidPlacement = false;

    this.handleBoardCellOut();
    this.shipShadow.forEach(([row, col]) => {
      this.board.cells[row][col].classList.remove('shadow');
      this.board.cells[row][col].classList.add('ship');
    });
    console.log(event);

    this.currentShip.disabled = true;
    this.finishButton.disabled &&= !this.ships.every((input) => input.disabled);
  }
  handleFinishPlacement() {
    new GameBoardView({
      board: this.board.cells.map((row) =>
        row.map((cell) => cell.classList.contains('ship'))
      )
    }).render(this.container);
  }
  remove() {
    super.remove();

    /* Remove event listeners (event.removeEventListener) */
    this.ships.forEach((input) =>
      input.removeEventListener(
        'change',
        this.handleSelectedShipChange.bind(this)
      )
    );

    this.rotateButton.removeEventListener('click', this.rotateShip);
  }
}
