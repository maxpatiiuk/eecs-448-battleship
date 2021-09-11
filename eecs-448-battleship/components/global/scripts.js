const views = {};
const activeViews = {};
let renderedViewCount = 0;
const viewTemplate = {};

/**
 * Defines a view from passed in name and gets the view template from the associated component dir.
 * @function defineView
 * @param view View name
 */
function defineView(view) {
  // Add view to list of defined views
  views[view.name] = view;
  // Download the template file (index.html)
  viewTemplate[view.name] = fetch(`./components/${view.name}/index.html`).then(
    async (response) => response.text()
  );
}

/**
 * Renders a defined view into a container. Passes in neccessary, predefined render parameters.
 * @async
 * @function renderView
 * @param viewName View name
 * @param container Container to render the view within
 * @param renderOptions Array of view-specific rendering options
 * @throws Undefined if view is undefined for this context
 */
async function renderView(viewName, container, renderOptions = {}) {
  if (typeof views[viewName] === 'undefined')
    throw new Error('This view is not defined');

  // Call destructor
  const currentViewId = container.id;
  const currentView = activeViews[currentViewId];
  currentView?.remove?.();
  activeViews[currentViewId || ''] = undefined;

  // Clean view's content
  const id = `${viewName}-${renderedViewCount}`;
  container.outerHTML = `<div
    class="${viewName}"
    id="${id}"
  ></div>`;
  container = document.getElementById(id);

  if (typeof viewTemplate[viewName] !== 'string')
    viewTemplate[viewName] = await viewTemplate[viewName];

  container.innerHTML = viewTemplate[viewName];
  const view = Object.create(views[viewName]);
  view.render(container, renderOptions);
  renderedViewCount += 1;
}
