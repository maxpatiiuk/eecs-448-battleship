const getElementIndex = (element) =>
  Array.from(element.parentElement.children).indexOf(element);

const isValidPosition = (row, col) => row < rows || col < cols;
