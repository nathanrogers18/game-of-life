grid = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


function getNeighborCount(x, y, grid) {
    neighborCount = 0;
    for (i = y - 1; i <= y + 1; i++) {
        for (j = x - 1; j <= x + 1; j++) {
            if (i != y || j != x) {
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    neighborCount += grid[i][j];
                }
            }
        }

    }
    return neighborCount;
}

function evolve(x, y, startGrid, nextGrid) {
    neighborCount = getNeighborCount(x, y, grid);
    if (startGrid[x][y] == 1) {
        // Cell starts alive
        if (neighborCount < 2 || neighborCount > 3) {
            nextGrid[x][y] = 0;
        } else {
            nextGrid[x][y] = 1;
        }
    } else {
        //Cell starts Dead
        if (neighborCount == 3) {
            nextGrid[x][y] = 1;
        } else {
            nextGrid[x][y] = 0;
        }
    }
}

function printGrid(grid) {
    console.log('Column 0,1,2,3,4,5,6,7,8,9');
    for (var row = 0; row < grid.length; row++) {
        console.log('Row ' + row + ': ' + grid[row]);
    }
    console.log('');
}

function gameOfLife(startGrid, generations) {
    for (var gen = 0; gen < generations; gen++) {
        nextGrid = startGrid.slice();
        for (var row = 0; row < startGrid.length; row++) {
            for (var col = 0; col < startGrid.length; col++) {
                evolve(row, col, startGrid, nextGrid);
            }
        }
        console.log('Grid: ' + gen);
        printGrid(startGrid);
        startGrid = nextGrid;
    }
    return nextGrid;
}
// Any live cell with fewer than two live neighbors dies, as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overcrowding.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
