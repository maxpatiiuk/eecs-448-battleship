'use strict';

// The name of this view
// Later, to render this view, call:
// new GameOverView(options).render(container)
class GameOverView extends View {
  constructor(options) {
    super(options);

  }
  async render(
    // Container would be populated with elements from index.html
    container
  ) {
    await super.render(container);
    /*Display the appropriate lose/win message */
     this.container.getElementsByTagName('p')[0].textContent = this.options.win ? "You Win" : "You Lose";

    /*Listen for "Play again" button click, Once button is clicked, call: new MainView().render(this.container) */
    this.button = this.container.getElementsByTagName('button')[0];
    this.Onclick = ()=>new MainView().render(this.container);
    this.button.addEventListener("click", this.Onclick);

    return this;
  }
  remove() {
    super.remove();
    /* TODO: Remove cl
    ick event listeners (event.removeEventListener) */
    this.button.removeEventListener("click", this.Onclick);

  }
}
