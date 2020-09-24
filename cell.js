function Cell(j, i) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; //top, right, bottom, left
    this.visited = false;

    //A*
    this.previous = undefined;

    //Stuff needed for A* algorithm
    this.f = 0;
    this.g = 0;
    this.h = 0;


    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100); // If visited make it visible by coloring it
            rect(x, y, w, w);
        }
    };

    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();

        fill(0,0,255);
        rect(x,y,w,w);
    };

    this.showColor = function(color) {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        noStroke();
        fill(color);
        rect(x,y,w,w);
    };

    this.checkNeighbors = function () {
        var neighbors = [];

        var top = (j - 1 < 0) ? false : grid[i][j - 1];
        var right = (i + 1 > cols - 1) ? false : grid[i + 1][j];
        var bottom = (j + 1 > rows - 1) ? false : grid[i][j + 1];
        var left = (i - 1 < 0) ? false : grid[i - 1][j];

        // j is row
        // i is column
        // var top = (j - 1 < 0) ? false : grid[j-1][i];
        // var right = (i + 1 > cols - 1) ? false : grid[j][i+1];;
        // var bottom = (j + 1 > rows - 1) ? false : grid[j+1][i];
        // var left = (i - 1 < 0) ? false : grid[j][i-1];


        if (top !== false && !top.visited) {
            neighbors.push(top);
        }
        if (right !== false && !right.visited) {
            neighbors.push(right);
        }
        if (bottom !== false && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left !== false && !left.visited) {
            neighbors.push(left);
        }


        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }

    };

    this.getNeighbors = function () {
        var neighbors = [];

        var top = (j - 1 < 0) ? false : grid[i][j - 1];
        var right = (i + 1 > cols - 1) ? false : grid[i + 1][j];
        var bottom = (j + 1 > rows - 1) ? false : grid[i][j + 1];
        var left = (i - 1 < 0) ? false : grid[i - 1][j];

        if (top !== false) {
            neighbors.push(top);
        }
        if (right !== false) {
            neighbors.push(right);
        }
        if (bottom !== false) {
            neighbors.push(bottom);
        }
        if (left !== false) {
            neighbors.push(left);
        }


        return neighbors;

    };
}