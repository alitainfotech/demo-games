function convertObjToArrAndSort(diceObj) {
    const arr = [];
    for (const key in diceObj) {
        if (Object.hasOwnProperty.call(diceObj, key)) {
            const count = diceObj[key];
            arr.push(count);
        }
    }
    const sortedArr = arr.sort((a, b) => b - a);
    return sortedArr;
}

function checkWinningLevels(sortedArr) {
    if (sortedArr[0] === 5) {
        return 50;
    } else if (sortedArr[0] === 4) {
        return 40;
    } else if (sortedArr[0] === 3 && sortedArr[1] === 2) {
        return 30;
    } else if (sortedArr[0] === 2 && sortedArr[1] === 2) {
        return 10;
    }
    return 0;
}

function getScores(arr) {
    const diceObj = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };
    let isStraight = true;
    let previousValue = 0;
    let totalScore = 0;
    for (let index = 0; index < arr.length; index++) {
        const num = arr[index];
        if (index > 0) {
            previousValue++;
            if (previousValue !== num) {
                isStraight = false;
            }
        } else {
            previousValue = num;
        }
        diceObj[num] += 1;
        totalScore += num;
    }
    let levelScore = 0;
    let sortedArr = [];
    if (isStraight) {
        levelScore = 20;
    } else {
        sortedArr = convertObjToArrAndSort(diceObj);
        levelScore = checkWinningLevels(sortedArr);
    }
    return levelScore + totalScore;
}

module.exports = {
    getScores
}