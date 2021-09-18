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
    const fleet = this.container.getElementsByClassName('fleet')[0];
    fleet.innerHTML = Array.from({
      length: this.options.numberOfShips,
    })
      .map(
        (_, index) => `<label>
        <input type="radio" class="sr-only" name="ship">
        <span class="ship" aria-hidden="true">
          ${Array.from({ length: index + 1 })
            .fill('<span></span>')
            .join('\n')}
        </span>
        <p class="sr-only">Ship ${index + 1}</p>
      </label>`
      )
      .join('\n');

    this.ships = Array.from(fleet.getElementsByTagName('input'));
    this.ships.forEach((input) =>
      input.addEventListener('change', this.handleSelectedShipChange.bind(this))
    );

    /* TODO: allow selecting a ship and putting it on the board*/
    /*
     * TODO: once ready, call:
     *  new GameBoard({ board: board }).render(container),
     *   where board is a 9x10 array of booleans signifying whether there is a
     *   ship at that cell
     */

    return this;
  }
  handleSelectedShipChange(selected) {}
  remove() {
    super.remove();

    /* Remove event listeners (event.removeEventListener) */
    this.ships.forEach((input) =>
      input.removeEventListener(
        'change',
        this.handleSelectedShipChange.bind(this)
      )
    );
  }
}
