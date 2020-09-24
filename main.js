function make_2D_array() {

    var grid = [];
    for (var j = 0; j < rows; j++) {
        grid.push([]);
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid[j].push(cell);
        }
    }

    return grid;
}

function display_grid(grid) {

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid[j][i].show();
        }
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;

    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);

    return d;
}

function checkPosition(current, neighbor) {

    var temp = !(current.j - 1 < 0) && grid[current.i][current.j - 1] === neighbor ? 0 :
                  !(current.i + 1 > cols - 1) && grid[current.i + 1][current.j] === neighbor ? 1 :
                      !(current.j + 1 > rows - 1) && grid[current.i][current.j + 1] === neighbor ? 2 :
                          !(current.i - 1 < 0) && grid[current.i - 1][current.j] === neighbor ? 3 : '';

    return temp;
}


//Code starts here

var cols, rows;
var w = 25;
var grid = [];
var current;

var stack = [];


var iter = 0;


//A* variables
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var isEnd = false;


// P5.js starts here
function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);


    grid = make_2D_array();

    current = grid[0][0];


    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);
}

function draw() {
    background(51);

    display_grid(grid);
    current.visited = true;
    current.highlight();

    //STEP 1
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;

        //STEP 2
        stack.push(current);

        //STEP 3
        removeWalls(current, next);

        //STEP 4
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    } else {

        //Maze is done get an A* algorithm started
        if (stack.length === 0) {
            if (openSet.length > 0 && !isEnd) {
                //We can keep going
                var lowestIndex = 0;
                for (iter = 0; iter < openSet.length; iter++) {
                    if (openSet[iter].f < openSet[lowestIndex].f) {
                        lowestIndex = iter;
                    }
                }

                var currentA = openSet[lowestIndex];

                if (currentA === end) {

                    //Find path
                    var temp = currentA;
                    path.push(temp);
                    while (temp.previous) {
                        path.push(temp.previous);
                        temp = temp.previous;
                    }

                    openSet = [];

                    isEnd = true;
                    console.log('DONE!');
                }

                removeFromArray(openSet, currentA);
                closedSet.push(currentA);

                var neighbors = currentA.getNeighbors();


                for (iter = 0; iter < neighbors.length; iter++) {
                    var neighbor = neighbors[iter];

                    var wallPosition = checkPosition(currentA, neighbor);


                    if (!closedSet.includes(neighbor) && currentA.walls[wallPosition] !== true) {
                        var tempG = currentA.g + 1;

                        if (openSet.includes(neighbor)) {
                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                            }
                        } else {
                            neighbor.g = tempG;
                            openSet.push(neighbor);
                        }

                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = currentA;
                    }

                }

            } else {
                //No solution
            }

            // DEBUG openSet and closedSet
            for (iter = 0; iter < openSet.length; iter++) {
                openSet[iter].showColor(color(0, 255, 0));
            }
            for (iter = 0; iter < closedSet.length; iter++) {
                closedSet[iter].showColor(color(255, 0, 255, 100));
            }


        }
        for (iter = 0; iter < path.length; iter++) {
            path[iter].showColor(color(0, 0, 255, 60));
        }
    }


}