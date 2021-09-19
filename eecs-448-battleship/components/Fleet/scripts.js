'use strict';

// The name of this component
// Later, to render this view, call:
// new Fleet(options).render(this.container)
/**
 * Base fleet class
 * @class Fleet
 * @constructor
 * @param options
 * @extends Component
 * @public
 */
class Fleet extends Component {
  constructor(options) {
    super(options);
  }

  /**
   * Renders a defined view into a container. Passes in necessary, predefined
   * render parameters.
   * @async
   * @function render
   * @memberof Fleet
   * @param container Container to render the view within
   */
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
    this.ships = Array.from(this.container.getElementsByTagName('input'));
    if (canSelectShip)
      this.ships.forEach((input) =>
        input.addEventListener('change', this.options.onChange)
      );

    return this;
  }

  /**   
   * View remove function for ephemeral objects, ie. eventListeners
   * @function remove
   * @memberof Fleet
   */
  remove() {
    super.remove();

    /* Remove event listeners (event.removeEventListener) */
    if (typeof this.options.onChange === 'function')
      this.ships.forEach((input) =>
        input.removeEventListener('change', this.options.onChange.bind(this))
      );
  }
}
