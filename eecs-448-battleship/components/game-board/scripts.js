defineView({
  // The name of this view
  name: 'game-board',
  // Later, to render this view, call renderView(name, container, options)
  render(
    // Container would be populated with elements from index.html
    container,
    // Any options that were passed to renderView
    {
      /*
       * A 9x10 array of booleans (if cell is true, then there is ship at that
       * cell)
       *
       */
      board,
    }
  ) {
    /* TODO: Render the 9x10 grid */
    /*
     * TODO: once game is finished, call:
     *   renderView('game-over', container, { win: true })
     *   (win is true, if player won, else false)
     */
  },
  // Cleanup
  remove() {
    /* TODO: Remove click event listeners (event.removeEventListener) */
  },
});
