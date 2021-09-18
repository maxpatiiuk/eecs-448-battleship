'use strict';

// The name of this view
// Later, to render this view, call:
// new GameBoardView(options).render(container)
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
     *   new GameOverView({win: true}).render(container)
     *   (where win is true, if player won, else false)
     */

    /* Render the 9x10 grid */
    this.board = await new Board({
      rows,
      cols,
      tagName: 'section',
      onMouseOver: this.handleBoardOver.bind(this),
      onClick: this.handleBoardClick.bind(this),
    }).render(this.container.getElementsByClassName('game-board')[0]);

    /* This is suppose to create the scoreboard */
    var playerOneScore = 0;
    var playerTwoScore = 0;
    this.button = this.container.getElementsByTagName('button')[0];
    this.Onclick = ()=> playerOneScore + 1;
    this.button.addEventListener("click", this.Onclick);

    return this;
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
