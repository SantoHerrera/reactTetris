import React, { Component } from 'react';
import './index.css'
import './App.css';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionMark: '?',
            Grid,
            currentShape: null,
            currentLocation: {
                row: 3,
                col: 6
            },
            shapes: {
                0: [
                    ["#", "#", "#", "#"]
                ],
                1: [
                    ["#", "#", "#"],
                    [".", ".", "#"]
                ],
                2: [
                    ["#", "#", "#"],
                    ["#", ".", "."]
                ],
                3: [
                    ["#", "#"],
                    ["#", "#"]
                ],
                4: [
                    [".", "#", "#"],
                    ["#", "#", "."]
                ],
                5: [
                    ["#", "#", "#"],
                    [".", "#", "."]
                ],
                6: [
                    ["#", "#", "."],
                    [".", "#", "#"]
                ]
            }
        }
    }

    getGridReady = () => {
        this.createNestedArray(15, 10);

    };

    createNestedArray = (x, y) => {
        //x is how many arrays
        // y is how many objects in x array

        //ex x = 3, y = 2
        //[
        //[{}, {}], 
        //[{}, {}], 
        //[{}, {}]
        //]

        let nestedArray = [];
        for (let i = 0; i < x; i++) {
            nestedArray.push([]);
            for (let j = 0; j < y; j++) {
                //information of individual cell
                nestedArray[i][j] = {
                    screen: "0",
                    id: `${i}-${j}`
                };
            }
        }

        this.setState({
            grid: nestedArray
        })
    }

    //for every item in array creates cell
    //[[],creates row from array
    //[{randomObj}], creates cell from randomObj
    //[{}, {}, {}] row with 3 cells
    tablerows = (nestedArray) => {
        if (!this.state.grid) { return; }//if a board already exist return
        return nestedArray.map((rows, x) => {
            let row = rows.map((cell, y) => <td id={`${x}-${y}`}>
                {/*if is hasnt been clicked display a question mark, else deplending on the situation display some kind of logic */}
                {this.state.grid[x][y].screen}
            </td>);
            return (
                <tr>
                    {row}
                </tr>
            );
        });
    }

    setShape = () => {
        //randomNum
        let randomNumber = Math.floor(Math.random() * Object.keys(this.state.shapes).length);
        let newShape = this.state.shapes[randomNumber];

        this.setState({
            currentShape: newShape
        }, () => { this.drawShape() })
    }

    clearShape = () => {
        let newGrid = this.state.grid

        let shape = this.state.currentShape

        let row = this.state.currentLocation.row

        let col = this.state.currentLocation.col

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === '#') {
                    newGrid[i + row][j + col].screen = '0'
                }
            }
        }

        this.setState({ grid: newGrid })
    }

    drawShape = () => {
        let newGrid = this.state.grid

        let shape = this.state.currentShape

        let row = this.state.currentLocation.row

        let col = this.state.currentLocation.col

        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === '#') {
                    newGrid[i + row][j + col].screen = "#"
                }
            }
        }

        this.setState({ grid: newGrid })
    }

    logSomething = () => {
        console.log(this.state.grid);
    }

    init = () => {
        this.setShape();
        this.drawShape();
        this.logSomething()
    }

    render() {
        return (
            <div>
                <button onClick={() => { this.getGridReady(); }}>Start New Game</button>
                <table><tbody>{this.tablerows(this.state.grid)}</tbody></table>
                <button onClick={() => { this.setShape() }}> </button>
                <button onClick={() => { this.clearShape() }}> </button>
            </div>
        )
    }
}


/*
const initNewShape = () => {
    //makes it spawn in top left
    current.row = SPAWN_ROW;// = 0
    //has the new shape appear 3 over
    current.col = SPAWN_COL;// = 3
    if (next.shape == null) {
        //randomly chooses a number to get shape from shapes object
        current.index = Math.floor(Math.random() * Object.keys(shapes).length);

        current.shape = shapes[current.index];

    } else {
        current.index = next.index;
        current.shape = next.shape;
    }

    next.index = Math.floor(Math.random() * Object.keys(shapes).length);
    next.shape = shapes[next.index];

    old.row = SPAWN_ROW;
    old.col = SPAWN_COL;
    old.shape = current.shape;

    showNext();
    updateGrid();
}
*/