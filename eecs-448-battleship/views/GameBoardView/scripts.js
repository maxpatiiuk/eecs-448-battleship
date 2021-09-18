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

    const board = document.getElementsByClassName('game-board')[0];
    for (let rows = 1; rows <= 9; rows++) {
      for (let cols = 1; cols <= 10; cols++) {
        var boardElement = document.createElement('div');
        boardElement.setAttribute('row', rows);
        boardElement.setAttribute('col', cols);
        boardElement.setAttribute('class', 'space');
        board.appendChild(boardElement);
      }
    }

    return this;
  }

  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
