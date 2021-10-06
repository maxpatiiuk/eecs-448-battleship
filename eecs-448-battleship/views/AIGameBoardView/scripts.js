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
class AIGameBoardView extends View {
  constructor(options) {
    super(options);
    this.totalCells = shipCellCount(this.options.numberOfShips);
  }

  /**
   * This is going to be the method to randomly place the AI's ships on the board
   * ~ = no ship and not hit
   * X = ship there and hit
   * x = unhit ship
   * \ = no ship and shot
   * @param {*} ships
   */
   makeAIBoard(ships){
    //initializing array to all no ships
    //coordinates are [row][column]
    var AIShips = [
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~'],
      ['~','~','~','~','~','~','~','~','~','~']
    ];
    var startingRow;
    var startingColumn;
    var growDirection;
    var badShip;
    for (var i = 1; i<= ships; i++){
      //@TODO: if the ship you are attempting to place overlaps with another ship, the program crashes
      //is this caused by the order of the or statement?
      //get a random float between 0 and 1, multiply by 9, take the floor
      startingRow = Math.floor(Math.random()*9); //This should be between 0 and 8 if I am doing my math right.
      startingColumn = Math.floor(Math.random()*10); //This should be between 0 and 9 if I am doing my math right.
      growDirection = Math.floor(Math.random()*10); //This should return a value 0 through 3, which will then be translated into a direction
      for(var j = 0; j < i; j++){
        if (growDirection == 0){//down
          if (AIShips[startingRow+j][startingColumn] == 'x' || startingRow+j > 8){
            badShip = true;
            break;
          }
        }
        else if (growDirection == 1){//left
          if (AIShips[startingRow][startingColumn-j] == 'x' || startingColumn-j < 0){
            badShip = true;
            break;
          }
        }
        else if (growDirection == 2){//up
          if (AIShips[startingRow-j][startingColumn] == 'x' || startingRow-j < 0){
            badShip = true;
            break;
          }
        }
        else if (growDirection == 3){//right
          if (AIShips[startingRow][startingColumn+j] == 'x' || startingColumn+j > 9){
            badShip = true;
            break;
          }
        }
      }
      if(!badShip){
        for(var j = 0; j < i; j++){
          if (growDirection == 0){//down
            AIShips[startingRow+j][startingColumn] = 'x';
          }
          else if (growDirection == 1){//left
            AIShips[startingRow][startingColumn-j] = 'x';
          }
          else if (growDirection == 2){//up
            AIShips[startingRow-j][startingColumn] = 'x';
          }
          else if (growDirection == 3){//right
            AIShips[startingRow][startingColumn+j] = 'x';
          }
        }
      }
      else{
        i--;//retry placing this ship
      }
    }
    return AIShips;
  }

  /**
   * Renders a defined view into a container. Passes in necessary, predefined
   * render parameters.
   * @async
   * @function render
   * @memberof AIGameBoardView
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

    this.AIBoard = this.makeAIBoard(this.options.numberOfShips);//I assume options.numberOfShips is 1-6 and not 1-21 for the number of cells

    return this;
  }

  
  /**
   * check if the square that was shot had a ship on it
   * @function checkHitAI
   * @memberof AIGameBoardView
   * @param row 
   * @param col
   */
  checkHitAI(row, col){
    return (this.AIBoard[row][col] == 'x');
  }
  /**
   * Player turn message handling
   * @function turn
   * @memberof AIGameBoardView
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
   * @memberof AIGameBoardView
   * @param owner 'player'|'opponent' - whose board was clicked
   * @param event event to log
   */
  handleBoardClick(owner, event) {
    if (this.container.getAttribute('data-focus') !== owner) return;//if the container does not match the owner parameter, end the function

    event.cell.children[0].disabled = true;//make it so we can't click on this square again
    if (owner === 'opponent') this.checkOffenceResult(event);
    else {
      this.turn('opponent');
      this.checkWin('player');
    }
  }

  /**
   * User prompt handler for messaging.
   * @function promptUser
   * @memberof AIGameBoardView
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
   * @memberof AIGameBoardView
   * @param row
   * @param col 
   * @param cell
   */
  checkOffenceResult({ row, col, cell }) {
    //row and col are both ints 0-8 and 0-9 respectively
    //cell is the html element that represents the button on the page, it is the thing we actually have to change to make stuff show up on the web page
    /*
    const colLetter = getNthLetter(col);
    this.promptUser(
      `Does opponent have a ship at <code>${colLetter}${row + 1}</code>?`,
      'Yes!',
      'no.',
      (isHit) => {
        isHit = this.checkHitAI(row, col);
        if (isHit) cell.classList.add('ship');
        this.addBorder();
        if (!isHit || !this.checkWin('opponent')) this.turn('player');
      }
    );
    */
    var isHit = this.checkHitAI(row, col);
    if (isHit) cell.classList.add('ship');
    this.addBorder();
    if (!isHit || !this.checkWin('opponent')) this.turn('player');
    
  }

  /**   
   * Find ship on gameboard
   * @function findShip
   * @memberof AIGameBoardView
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
   * @memberof AIGameBoardView
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
   * @memberof AIGameBoardView
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
   * @memberof AIGameBoardView
   */
  remove() {
    super.remove();

    /* Remove event listeners */
    this.playerBoard.remove();
    this.oppositeBoard.remove();
  }
}
