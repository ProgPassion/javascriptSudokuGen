let map = [];
for (let i = 0; i < 9; i++) {
	let row = [];
	for (let j = 0; j < 9; j++) {
		row[j] = 0;
	}
	map[i] = row;
}

let numGenerated = [];
for (let i = 0; i < 81; i++) {
	numGenerated[i] = {
		numTested: [],
		currentNum: 0,
	};
}

let index = 0;
while (true) {
	let randNum = Math.round(Math.random() * 8) + 1;

	let row = Math.floor(index / 9);
	let col = index % 9;
	let rulesNotBroken = true;

	if (index == 81)
		break;

	if (numGenerated[index].currentNum == 0) {
		numGenerated[index].currentNum = randNum;
		numGenerated[index].numTested.push(randNum);
	} else if (numGenerated[index].numTested.length == 9) {
		numGenerated[index].numTested = [];
		numGenerated[index].currentNum = 0;
		map[row][col] = 0;
		index--;
		continue;
	} else if (numGenerated[index].numTested.includes(randNum))
		continue;
	else {
		numGenerated[index].currentNum = randNum;
		numGenerated[index].numTested.push(randNum);
	}


	if (!checkVertical(row, col, randNum)) {
		rulesNotBroken = false;
	}
	if (!checkHorizontal(row, col, randNum)) {
		rulesNotBroken = false;
	}
	if (!checkThreeByThreeGrid(row, col, randNum)) {
		rulesNotBroken = false;
	}

	if (rulesNotBroken) {
		map[row][col] = randNum;
		index++;
	}
}

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		if (Math.round(Math.random() * 3) == 2) {
			map[i][j] = 0;
		}
	}
}

function checkVertical(row, colChosen, num) {
	for (let i = 0; i < 9; i++) {
		if (row == i)
			continue;

		if (map[i][colChosen] == num)
			return false;
	}
	return true;
}

function checkHorizontal(row, colChosen, num) {
	for (let i = 0; i < 9; i++) {
		if (colChosen == i)
			continue;

		if (map[row][i] == num)
			return false;
	}
	return true;
}

function checkThreeByThreeGrid(row, colChosen, num) {
	for (let i = row - (row % 3); i <= row - (row % 3) + 2; i++) {
		for (let j = colChosen - (colChosen % 3); j <= colChosen - (colChosen % 3) + 2; j++) {
			if (i == row && j == colChosen)
				continue;

			if (map[i][j] == num)
				return false;
		}
	}
	return true;
}
