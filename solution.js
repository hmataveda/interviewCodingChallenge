function checkForBingo(bingoCard, drawNumbers) {
  var size = 5;
  const matrix = reshape(bingoCard, size); // converts 1D array to Matrix
  let bingo = false;

  for (let item of drawNumbers) {
    const indexin1dArray = bingoCard.indexOf(item);

    // if the drawn number is not present in bingo card it will skip that number and continues with next numbers
    if (indexin1dArray == -1) {
      console.log("Number not found in the bingo card", item);
      continue;
    }

    const row = Math.floor(indexin1dArray / size);
    const col = indexin1dArray % size;
    matrix[row][col] = "Done"; // fills the drawn number as "DONE" in Bingo card

    bingo = checkOver(); //checks for the marked line in rows, cols and diagonals;

    if (bingo) {
      console.log("BINGO!");
      return true;
    }
  }

  function checkOver() {
    var bingoLine = markedLine(0, 0, 1, 1) || markedLine(size - 1, 0, -1, 1);
    for (i = 0; i < size; i++) {
      bingoLine = bingoLine || markedLine(i, 0, 0, 1) || markedLine(0, i, 1, 0);
    }
    if (bingoLine) {
      console.log("result Card", matrix); // view the resulted Bingo card
      return true;
    } else {
      return false;
    }
  }

  function markedLine(x, y, dx, dy) {
    var r = true;
    while (r && x >= 0 && x < size && y >= 0 && y < size) {
      r = r && (matrix[x][y] == "Done" || matrix[x][y] == "FREE");
      x += dx;
      y += dy;
    }
    return r;
  }

  console.log("result Card", matrix);
  console.log("Sorry no BINGO!!");
  return false;
}

function reshape(bingocard, size) {
  let result = [];
  let n = size;
  for (let i = 0; i < n; i++) {
    result[i] = [];
  }
  for (let i = 0; i < bingocard.length; ++i) {
    result[Math.floor(i / n)][i % n] = bingocard[i];
  }
  console.log("Marix", result);
  return result;
}

const bingoCard = [
  8,
  29,
  35,
  54,
  65,
  13,
  24,
  44,
  48,
  67,
  9,
  21,
  "FREE",
  59,
  63,
  7,
  19,
  34,
  53,
  61,
  1,
  20,
  33,
  46,
  72,
];
const drawnNumbers = [8, 24, 53, 72];

console.log(checkForBingo(bingoCard, drawnNumbers));
