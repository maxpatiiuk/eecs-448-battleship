defineView({
  // The name of this view
  name: 'ship-placement',
  // Later, to render this view, call renderView(name, container, options)
  render(
    // Container would be populated with elements from index.html
    container,
    // Any options that were passed to renderView
    {
      // Number of ships the player selected (int between 1 and 6)
      numberOfShips,
    }
  ) {
    /* TODO: Render between 1 and 6 ships on the sidebar */
    /* TODO: Render the 9x10 grid */
    /* TODO: allow selecting a ship and putting it on the board*/
    /*
     * TODO: once ready, call renderView('game-board', container, { board: board }),
     *   where board is a 9x10 array of booleans signifying whether there is a
     *   ship at that cell
     */
  },
  // Cleanup
  remove() {
    /* TODO: Remove click event listeners (event.removeEventListener) */
  },
});
