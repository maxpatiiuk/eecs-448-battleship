'use strict';

// The name of this view
// Later, to render this view, call new MainView(options).render(container)
class MainView extends View {
  constructor(options) {
    super(options);
    /*
     * You can set global variables like so:
     * this.someValue = 'abc';
     * Now, any other method can access that variable as this.someValue
     *
     */
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /*
     * TODO: Listen for button clicks inside our container
     * (element.addEventListener)
     *
     * Once a button is clicked, call:
     * new ShipPlacementView({numberOfShips: 6}).render(this.container)
     * (replace 6 by the actual number of ships selected)
     *
     */

    return this;
  }
  remove() {
    super.remove();
    // TODO: Unset event listeners from buttons (element.removeEventListener)
  }
}
