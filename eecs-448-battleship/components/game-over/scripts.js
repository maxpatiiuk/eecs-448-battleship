defineView({
  // The name of this view
  name: 'game-over',
  // Later, to render this view, call renderView(name, container, options)
  render(
    // Container would be populated with elements from index.html
    container,
    // Any options that were passed to renderView
    {
      // A boolean, whether the player won or lost
      win,
    }
  ) {
    /* Display the appropriate lose/win message */
    /* Listen for "Play again" button click */
    /* Call renderView('main', container) once button is clicked */
  },
  // Cleanup
  remove() {
    /* TODO: Remove click event listeners (event.removeEventListener) */
  },
});
