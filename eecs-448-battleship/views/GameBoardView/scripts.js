'use strict';

// The name of this view
// Later, to render this view, call:
// new GameBoardView(options).render(this.container)
/**
 * Base GameBoard class
 * @class GameBoardView
 * @constructor
 * @param options
 * @extends View
 * @public
 */
class GameBoardView extends View {
  constructor(options) {
    super(options);
    this.totalCells = shipCellCount(this.options.numberOfShips);
  }

  /**
   * Renders a defined view into a container. Passes in necessary, predefined
   * render parameters.
   * @async
   * @function render
   * @memberof GameBoardView
   * @param container Container to render the view within
   */
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    this.container.setAttribute('data-focus', 'dialog');

    /* Render your board */
    this.playerBoard = await new Board({
      rows,
      cols,
      onClick: this.handleBoardClick.bind(this, 'player'),
    }).render(this.container.getElementsByClassName('player-board')[0]);

    this.options.board.forEach((row, rowIndex) =>
      row.forEach((hasShip, columnIndex) =>
        hasShip
          ? this.playerBoard.cells[rowIndex][columnIndex].classList.add('ship')
          : undefined
      )
    );

    /* Render opponent's board */
    this.opponentBoard = await new Board({
      rows,
      cols,
      onClick: this.handleBoardClick.bind(this, 'opponent'),
    }).render(this.container.getElementsByClassName('opponent-board')[0]);

    /* Render opponent's fleet */
    this.fleet = await new Fleet({
      numberOfShips: this.options.numberOfShips,
    }).render(this.container.getElementsByClassName('opponent-fleet')[0]);

    this.dialog = this.container.getElementsByClassName('dialog')[0];
    this.promptUser('Who goes first?', 'Me', 'Opponent', (playerGoesFirst) =>
      this.turn(playerGoesFirst ? 'opponent' : 'player')
    );

    return this;
  }

  turn(player) {
    const message =
      player === 'opponent'
        ? 'Where do you want to fire?'
        : 'Where did your opponent fire?';
    this.dialog.innerHTML = `<h2>${message}</h2>`;
    this.container.setAttribute('data-focus', player);
  }

  /**
   * Board click event handler
   * @function handleBoardClick
   * @memberof GameBoardView
   * @param owner 'player'|'opponent' - whose board was clicked
   * @param event event to log
   */
  handleBoardClick(owner, event) {
    if (this.container.getAttribute('data-focus') !== owner) return;

    event.cell.children[0].disabled = true;
    if (owner === 'opponent') this.checkOffenceResult(event);
    else this.turn('opponent');
    this.checkWin(owner);
  }

  promptUser(question, buttonLeftText, buttonRightText, callback) {
    this.dialog.innerHTML = `
      <h2>${question}</h2>
      <span>
        <button type="button" class="magic-button yes">${buttonLeftText}</button>
        <button type="button" class="magic-button no">${buttonRightText}</button>
      </span>
    `;
    const buttons = Array.from(this.dialog.getElementsByTagName('button'));
    const handleClick = ({ target }) => {
      buttons.map((button) => button.removeEventListener('click', handleClick));
      callback(target.classList.contains('yes'));
    };
    buttons.map((button) => button.addEventListener('click', handleClick));
  }

  checkOffenceResult({ row, col, cell }) {
    const colLetter = getNthLetter(col);
    this.promptUser(
      `Does opponent have a ship at <code>${colLetter}${row + 1}</code>?`,
      'Yes!',
      'no.',
      (isHit) => {
        if (isHit) cell.classList.add('ship');
        this.addBorder();
        this.turn('player');
      }
    );
  }

  addBorder() {
    // TODO: draw a hit area over a sunk enemy ship
  }

  checkWin(owner) {
    const playerCanWin = owner === 'opponent';
    const board = playerCanWin ? this.opponentBoard : this.playerBoard;
    const discoveredShips = board.cells
      .flat()
      .filter((cell) =>
        cell.classList.contains(playerCanWin ? 'ship' : 'destroyed')
      );
    if (this.totalCells === discoveredShips)
      new GameOverView({
        win: playerCanWin,
      }).render(this.container);
  }

  remove() {
    super.remove();

    /* TODO: Remove event listeners */
    this.playerBoard.remove();
    this.oppositeBoard.remove();
  }
}
