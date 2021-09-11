defineView({
  // The name of this view
  name: 'main',
  // Later, to render this view, call renderView(name, container, options)
  render(
    // Container would be populated with elements from index.html
    container,
    // Any options that were passed to renderView
    options
  ) {
    /*
     * You can set global variables like so:
     * this.container = container;
     * Now, any other method can access that variable as this.container
     *
     */
    /*
     * TODO: Listen for button clicks inside our container
     * (element.addEventListener)
     *
     * Once a button is clicked, call:
     * renderView('ship-placement', container, {numberOfShips: 6})
     * (replace 6 by the actual number of ships selected)
     *
     */
  },
  // Cleanup
  remove() {
    // TODO: Unset event listeners from buttons (element.removeEventListener)
  },
});
