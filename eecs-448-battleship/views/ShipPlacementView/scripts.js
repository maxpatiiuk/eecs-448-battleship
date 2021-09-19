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
    this.fleet = await new Fleet({
      numberOfShips: this.options.numberOfShips,
      onChange: this.handleSelectedShipChange,
    }).render(this.container.getElementsByClassName('fleet')[0]);

    this.rotateButton = this.container.getElementsByClassName('rotate')[0];
    this.rotateButton.addEventListener('click', this.handleRotateShip);

    this.finishButton = this.container.getElementsByClassName('finish')[0];
    this.finishButton.addEventListener('click', this.handleFinishPlacement);

    return this;
  }
  // Allow selecting a ship and putting it on the board
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
          [row, col - 1],
          [row, col],
          [row, col + 1],
          [row - 1, col - 1],
          [row - 1, col],
          [row - 1, col + 1],
          [row + 1, col - 1],
          [row + 1, col],
          [row + 1, col + 1],
        ].every(
          ([row, col]) =>
            this.board.cells[row]?.[col]?.classList.contains('ship') !== true
        )
    );

    this.handleBoardCellOut();
    this.shipShadow.forEach(([row, col]) =>
      this.board.cells[row]?.[col]?.classList.add(
        this.isValidPlacement ? 'shadow' : 'invalid'
      )
    );
  }
  handleBoardCellOut() {
    this.board.cells.flat().map((cell) => {
      cell.classList.remove('shadow');
      cell.classList.remove('invalid');
    });
  }
  handleBoardCellClick() {
    if (!this.isValidPlacement) return;
    this.isValidPlacement = false;

    this.handleBoardCellOut();
    this.shipShadow.forEach(([row, col]) => {
      this.board.cells[row][col].classList.remove('shadow');
      this.board.cells[row][col].classList.remove('invalid');
      this.board.cells[row][col].classList.add('ship');
    });

    this.currentShip.disabled = true;
    this.finishButton.disabled &&= !this.fleet.ships.every(
      (input) => input.disabled
    );
  }
  // Render game board once finished
  handleFinishPlacement() {
    new GameBoardView({
      numberOfShips: this.options.numberOfShips,
      board: this.board.cells.map((row) =>
        row.map((cell) => cell.classList.contains('ship'))
      ),
    }).render(this.container);
  }
  remove() {
    super.remove();

    this.board.remove();
    this.fleet.remove();

    this.rotateButton.removeEventListener('click', this.rotateShip);
  }
}
