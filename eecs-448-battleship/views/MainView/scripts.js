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

    // Listen for button clicks inside the container
    this.buttons = Array.from(this.container.getElementsByTagName('button'));
    this.buttons.forEach((button) =>
      button.addEventListener('click', this.handleClick.bind(this))
    );

    return this;
  }

  handleClick({ target: button }) {
    // Once a button is clicked, render ship placement view
    new ShipPlacementView({
      numberOfShips: Number.parseInt(button.textContent),
    }).render(this.container);
  }

  remove() {
    super.remove();

    // Unset event listeners from buttons
    this.buttons.forEach((button) =>
      button.removeEventListener('click', this.handleClick)
    );
  }
}
