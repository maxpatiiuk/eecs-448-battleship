const views = {};
const activeViews = {};
let renderedViewCount = 0;
const viewTemplate = {};

function defineView(view) {
  // Add view to list of defined views
  views[view.name] = view;
  // Download the template file (index.html)
  viewTemplate[view.name] = fetch(`./components/${view.name}/index.html`).then(
    async (response) => response.text()
  );
}

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
