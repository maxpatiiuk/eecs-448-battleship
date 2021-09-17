'use strict';

// The name of this view
// Later, to render this view, call:
// new ShipPlacementView(options).render(container)
class ShipPlacementView extends View {
  /*
   * */
  constructor(options) {
    super(options);

    // destructuring assignment of numberOfShips from options
    const {
      // Number of ships the player selected (int between 1 and 6)
      numberOfShips
    } = options;

    /*
     * You can set global variables like so:
     * this.someValue = 'abc';
     * Now, any other method can access that variable as this.someValue
     *
     */
    this.numberOfShips = numberOfShips
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* TODO: Render between 1 and 6 ships on the sidebar */
    /* TODO: Render the 9x10 grid */
    /* TODO: allow selecting a ship and putting it on the board*/
    /*
     * TODO: once ready, call:
     *  new GameBoard({ board: board }).render(container),
     *   where board is a 9x10 array of booleans signifying whether there is a
     *   ship at that cell
     */
    
    for(let i = this.numberOfShips + 1; i <= 6; i++) {
      let ship = document.getElementsByClassName('shp-'+i);
      for(let j = 0; j < i; j++) {
        ship[j].style.backgroundColor = 'gray';
      }
    }

    return this;
  }
  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
