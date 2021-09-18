'use strict';

// The name of this view
// Later, to render this view, call:
// new ShipPlacementView(options).render(container)
class ShipPlacementView extends View {
  /*
   * */
  constructor(options) {
    super(options);
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* Render the 9x10 grid */
    this.board = new Board({ rows, cols, tagName: 'section' }).render(
      this.container.getElementsByClassName('board')[0]
    );

    /* TODO: Render between 1 and 6 ships on the sidebar */
    /* TODO: allow selecting a ship and putting it on the board*/
    /*
     * TODO: once ready, call:
     *  new GameBoard({ board: board }).render(container),
     *   where board is a 9x10 array of booleans signifying whether there is a
     *   ship at that cell
     */

    return this;
  }
  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
