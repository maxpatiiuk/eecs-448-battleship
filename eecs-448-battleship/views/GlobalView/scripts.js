'use strict';

/**
 * Defines a view from passed in name and gets the view template from the
 * associated component dir.
 * @class View
 * @param view View name
 */
class View {
  #name;
  static #index = 0;
  static #activeViews = {};
  static #viewTemplate = {};
  /**
   *
   * @param renderOptions Object with view-specific rendering options
   */
  constructor(renderOptions) {
    this.#name = this.constructor.name;
    if (!(this.#name in View.#viewTemplate))
      View.#viewTemplate[this.#name] = fetch(
        `./views/${this.#name}/index.html`
      ).then(async (response) => response.text());
  }
  /**
   * Renders a defined view into a container. Passes in necessary, predefined
   * render parameters.
   * @async
   * @function render
   * @param container Container to render the view within
   */
  async render(container) {
    // Call destructor
    const currentViewId = container.id;
    const currentView = View.#activeViews[currentViewId];
    currentView?.remove?.();
    View.#activeViews[currentViewId || ''] = undefined;

    this.container = container;

    // Clean view's content
    const id = `${this.#name}-${View.#index}`;
    container.outerHTML = `<div
      class="${this.#name}"
      id="${id}"
    ></div>`;
    const newContainer = document.getElementById(id);

    if (typeof View.#viewTemplate[this.#name] !== 'string')
      View.#viewTemplate[this.#name] = await View.#viewTemplate[this.#name];

    newContainer.innerHTML = View.#viewTemplate[this.#name];
    View.#index += 1;
  }
  remove() {}
}
