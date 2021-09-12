'use strict';

// The name of this view
// Later, to render this view, call:
// new GameOverView(options).render(container)
class GameOverView extends View {
  constructor(options) {
    super(options);

    const {
      // A boolean, whether the player won or lost
      win,
    } = options;
  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);

    /* TODO: Display the appropriate lose/win message */
    /* TODO: Listen for "Play again" button click */
    /* TODO: Once button is clicked, call:
         new MainView().render(container) */

    return this;
  }
  remove() {
    super.remove();
    /* TODO: Remove click event listeners (event.removeEventListener) */
  }
}
