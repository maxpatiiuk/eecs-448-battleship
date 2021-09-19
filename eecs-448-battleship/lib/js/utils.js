const getNthLetter = (index) => String.fromCharCode('A'.charCodeAt(0) + index);

const getElementIndex = (element) =>
  Array.from(element.parentElement.children).indexOf(element);

const shipCellCount = (numberOfShips) =>
  (numberOfShips * (numberOfShips + 1)) / 2;

const getNeighbourCells = (row, col) => [
  [row - 1, col],
  [row, col - 1],
  [row, col + 1],
  [row + 1, col],
];

const getAllNeighbourCells = (row, col) => [
  [row, col - 1],
  [row, col],
  [row, col + 1],
  [row - 1, col - 1],
  [row - 1, col],
  [row - 1, col + 1],
  [row + 1, col - 1],
  [row + 1, col],
  [row + 1, col + 1],
];
