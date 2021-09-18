'use strict';

// The name of this view
// Later, to render this view, call:
// new GameBoardView(options).render(this.container)
class GameBoardView extends View {
  constructor(options) {
    super(options);
  }

  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* TODO: Render the 9x10 grid */
    /*
     * TODO: once game is finished, call:
     *   new GameOverView({win: true}).render(this.container)
     *   (where win is true, if player won, else false)
     */

    /* Render the 9x10 grid */
    console.log(this.options);
    this.board = await new Board({
      rows,
      cols,
      tagName: 'section',
      onMouseOver: this.handleBoardOver.bind(this),
      onClick: this.handleBoardClick.bind(this),
    }).render(this.container.getElementsByClassName('game-board')[0]);
    for(var i = 0; i < rows; i ++) {
      for(var j = 0; j < cols; j ++){
        if(this.options.board[i][j] == true)
        {
          this.board.cells[i][j].classList.add("ship");

        }
      }
    }
  

    /* This is suppose to create the scoreboard */

    return this;
  }

  scoreBoard() {
   var playerOneScore = 0;
    var playerTwoScore = 0;
    this.buttonOne = this.container.getElementsByTagName('button')[0];
    this.Onclick = playerOneScore + 1;
    this.buttonOne.addEventListener("click", this.Onclick);
    this.buttonTwo = this.container.getElementsByTagName('button')[1];
    this.Onclick = console.log(playerOneScore);
    this.buttonTwo.addEventListener("click", this.Onclick);


  }

  handleBoardOver(event) {
    console.log(event);
  }
  handleBoardClick(event) {
    console.log(event);
  }

  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
