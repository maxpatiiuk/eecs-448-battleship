'use strict';

// The name of this view
// Later, to render this view, call:
// new GameBoardView(options).render(container)
class GameBoardView extends View {
  constructor(options) {
    super(options);

    const {
      /*
       * A 9x10 array of booleans (if cell is true, then there is ship at that
       * cell)
       *
       */
      board,
    } = options;
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

    return this;
  }
  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
