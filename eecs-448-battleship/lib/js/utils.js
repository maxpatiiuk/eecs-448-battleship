const getNthLetter = (index) => String.fromCharCode('A'.charCodeAt(0) + index);

const getElementIndex = (element) =>
  Array.from(element.parentElement.children).indexOf(element);

const shipCellCount = (numberOfShips) =>
  (numberOfShips * (numberOfShips + 1)) / 2;
