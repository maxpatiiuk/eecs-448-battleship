'use strict';

/**
 * Base class for views
 * @class View
 * @constructor
 * @public
 */
class View {
  /*
   * View Name
   * @type string
   * @public
   * */
  #name;
  /*
   * Total count of rendered views
   * @type number
   * @public
   * */
  static #index = 0;
  /*
   * Record<id, view> of currently visible views
   * @public
   * */
  static #activeViews = {};
  /*
   * Record<viewName, string|Promise<string>> of view templates
   * @public
   * */
  static #viewTemplate = {};
  /*
   * Static template directory
   * */
  /**
   *
   * @param options Object with view-specific rendering options
   */
  constructor({ templateDirectory = 'views', ...options } = {}) {
    this.#name = this.constructor.name;
    this.options = {
      tagName: 'div',
      ...options,
    };

    // Download the template if haven't done so already
    if (!(this.#name in View.#viewTemplate))
      View.#viewTemplate[this.#name] = fetch(
        `./${templateDirectory}/${this.#name}/index.html`
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

    // Clean view's content
    const id = `${this.#name}-${View.#index}`;
    container.outerHTML = `<${this.options.tagName}
      class="${this.#name}"
      id="${id}"
    ></${this.options.tagName}>`;
    const newContainer = document.getElementById(id);

    this.container = newContainer;

    if (typeof View.#viewTemplate[this.#name] !== 'string')
      View.#viewTemplate[this.#name] = await View.#viewTemplate[this.#name];

    newContainer.innerHTML = View.#viewTemplate[this.#name];
    View.#index += 1;
  }
  /*
   * Cleanup function
   * Nothing here yet
   * */
  remove() {}
}
