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

  /**
   * Player turn message handling
   * @function turn
   * @memberof GameBoardView
   * @param player 'player'|'opponent' for message variations 
   */
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
    else {
      this.turn('opponent');
      this.checkWin('player');
    }
  }

  /**
   * User prompt handler for messaging.
   * @function promptUser
   * @memberof GameBoardView
   * @param question current question string
   * @param buttonLeftText option one button text string
   * @param buttonRightText option two button text string
   * @param callback function, click handling
   */
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

  /**
   * Function to check results of offensive player game.
   * @function checkOffenceResult
   * @memberof GameBoardView
   * @param row
   * @param col 
   * @param cell
   */
  checkOffenceResult({ row, col, cell }) {
    const colLetter = getNthLetter(col);
    this.promptUser(
      `Does opponent have a ship at <code>${colLetter}${row + 1}</code>?`,
      'Yes!',
      'no.',
      (isHit) => {
        if (isHit) cell.classList.add('ship');
        this.addBorder();
        if (!isHit || !this.checkWin('opponent')) this.turn('player');
      }
    );
  }

  /**   
   * Find ship on gameboard
   * @function findShip
   * @memberof GameBoardView
   * @param row
   * @param col 
   */
  findShip(row, col) {
    const neighborCell = getNeighbourCells(row, col).find(([row, col]) =>
      this.opponentBoard.cells[row]?.[col]?.classList.contains('ship')
    );

    const isHorizontal = neighborCell?.[0] === row;
    const shipStart = Array.from({ length: Math.max(rows, cols) }, (_, index) =>
      isHorizontal ? [row, col - index] : [row - index, col]
    ).find(
      ([row, col]) =>
        this.opponentBoard.cells[row]?.[col]?.classList.contains('ship') !==
        true
    );
    const shipEnd = Array.from({ length: Math.max(rows, cols) }, (_, index) =>
      isHorizontal ? [row, col + index] : [row + index, col]
    ).find(
      ([row, col]) =>
        this.opponentBoard.cells[row]?.[col]?.classList.contains('ship') !==
        true
    );

    const horizontalIndex = isHorizontal ? 1 : 0;
    const ship = Array.from(
      { length: shipEnd[horizontalIndex] - shipStart[horizontalIndex] + 1 },
      (_, index) =>
        isHorizontal ? [row, shipStart[1] + index] : [shipStart[0] + index, col]
    );
    const trimmedShip = ship.slice(1, -1);

    const largestShip =
      this.fleet.ships.length -
      Array.from(this.fleet.ships)
        .reverse()
        .findIndex((ship) => !ship.disabled);

    let canAddBorder = trimmedShip.length === largestShip;
    if (typeof neighborCell === 'undefined')
      canAddBorder ||= getNeighbourCells(row, col).every(
        ([row, col]) =>
          this.opponentBoard.cells[row]?.[col]?.children[0].disabled !== false
      );
    else
      canAddBorder ||=
        this.opponentBoard.cells[shipStart[0]]?.[shipStart[1]]?.children[0]
          .disabled !== false &&
        this.opponentBoard.cells[shipEnd[0]]?.[shipEnd[1]]?.children[0]
          .disabled !== false;

    if (canAddBorder) {
      trimmedShip
        .flatMap(([row, col]) => getAllNeighbourCells(row, col))
        .forEach(([row, col]) => {
          if (typeof this.opponentBoard.cells[row]?.[col] !== 'undefined')
            this.opponentBoard.cells[row][col].children[0].disabled = true;
        });
      this.fleet.ships[trimmedShip.length - 1].disabled = true;
    }

    return ship;
  }

  /**   
   * Add gameboard view border
   * @function addBorder
   * @memberof GameBoardView
   */
  addBorder() {
    const passedCells = new Set();
    this.opponentBoard.cells.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (passedCells.has(`${rowIndex}_${colIndex}`)) return;
        if (cell.classList.contains('ship'))
          this.findShip(rowIndex, colIndex).forEach(([row, col]) =>
            passedCells.add(`${row}_${col}`)
          );
      })
    );
  }

  /**   
   * Check if player is victorious
   * @function checkWin
   * @memberof GameBoardView
   * @param owner
   */
  checkWin(owner) {
    const playerCanWin = owner === 'opponent';
    const board = playerCanWin ? this.opponentBoard : this.playerBoard;
    const discoveredShips = board.cells
      .flat()
      .filter(
        (cell) => cell.classList.contains('ship') && cell.children[0].disabled
      ).length;
    const win = this.totalCells === discoveredShips;
    if (win)
      new GameOverView({
        win: playerCanWin,
      }).render(this.container);
    return win;
  }

  /**   
   * View remove function for ephemeral objects, ie. eventListeners
   * @function remove
   * @memberof GameBoardView
   */
  remove() {
    super.remove();

    /* Remove event listeners */
    this.playerBoard.remove();
    this.oppositeBoard.remove();
  }
}
