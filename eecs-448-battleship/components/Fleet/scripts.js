'use strict';

// The name of this component
// Later, to render this view, call:
// new Fleet(options).render(this.container)

class Fleet extends Component {
  constructor(options) {
    super(options);
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* Render between 1 and 6 ships */
    const canSelectShip = typeof this.options.onChange === 'function';

    this.container.innerHTML = Array.from({
      length: this.options.numberOfShips,
    })
      .map(
        (_, index) => `<label>
        <input
          type="radio"
          class="sr-only"
          name="ship"
          ${canSelectShip ? '' : 'readonly'}
        >
        <span class="ship" aria-hidden="true">
          ${Array.from({ length: index + 1 })
            .fill('<span></span>')
            .join('\n')}
        </span>
        <p class="sr-only">Ship ${index + 1}</p>
      </label>`
      )
      .join('\n');

    /* Allow selecting a ship */
    if (canSelectShip) {
      this.ships = Array.from(this.container.getElementsByTagName('input'));
      this.ships.forEach((input) =>
        input.addEventListener('change', this.options.onChange)
      );
    }

    return this;
  }
  remove() {
    super.remove();

    /* Remove event listeners (event.removeEventListener) */
    if (typeof this.options.onChange === 'function')
      this.ships.forEach((input) =>
        input.removeEventListener('change', this.options.onChange.bind(this))
      );
  }
}
