import {ACCEPTABLE_BOUNDARY_PATH_TYPES} from './PathData.js';


class PathDataGenerator {

    constructor(){
        this.gridWidth = 4;
        this.gridHeight = 4;
        this.gridSize = this.gridWidth * this.gridHeight;
        this.x = 0;
        this.y = 0;
        this.cellWidth = 100;
        this.cellHeight = 100;
        this.boundaryCells = [];
        this.acceptablePaths = [];
        this.randomPath = 0;
        this.cellData = [];

    }

    setGridSize(width, height){
        this.gridWidth = width;
        this.gridHeight = height;
        this.gridSize = this.gridWidth * this.gridHeight;
    }

    setCellSize(width, height){
        this.cellWidth = width;
        this.cellHeight = height;
    }

    getCellData(){
        return this.cellData
    }

    // generatePathData(){

    //     let x_counter = 0;
    //     let y_counter = 0;

    //     this.determineAcceptablePathsForCells();

    //     for(let i = 0; i < this.gridSize; i++){
    //         this.x = x_counter * this.cellWidth;
    //         this.y = y_counter * this.cellHeight;
            
    //         this.determineRandomPath(i);

    //         x_counter++;
    
    //         if( x_counter==4 ){
    //             x_counter=0,
    //             y_counter++;
    //         }
    
    //     }

    // }


    generatePathData(){
        // consider doing an array of objects
        // add random this this function
        let x_counter = 1;
        let y_counter = 1;
        for(let i = 1; i <= this.gridSize; i++){

            if(y_counter == 1){
                if(x_counter == 1){
                    // console.log("Top Left Corner");
                    // console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    // cellDataObj["cellBoundayType"] = "TOP_LEFT_CORNER";
                    // cellDataObj["coordinates"] = [x_counter, y_counter];
                    // cellDataObj["acceptableBoundaryPathTypes"] = ACCEPTABLE_BOUNDARY_PATH_TYPES['TOP_LEFT_CORNER'];
                    // cellDataObj["selectedPath"] = this.determineRandomPath(cellDataObj); //going to need to fix this
                    this.generateCellRecord('TOP_LEFT_CORNER');


                } else if (x_counter == this.gridWidth){
                    console.log("Top Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['TOP_RIGHT_CORNER'])
                    // this.boundaryCells.push("TOP_RIGHT_CORNER");
                } else {
                    console.log("Top");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['TOP'])
                    // this.boundaryCells.push("TOP");
                }
            } else if (y_counter == this.gridHeight){
                if(x_counter == 1){
                    console.log("Bottom Left Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['BOTTOM_LEFT_CORNER'])
                    // this.boundaryCells.push("BOTTOM_LEFT_CORNER");
                } else if(x_counter == this.gridWidth){
                    console.log("Bottom Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['BOTTOM_RIGHT_CORNER'])
                    // this.boundaryCells.push("BOTTOM_RIGHT_CORNER");
                } else {
                    console.log("Bottom");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['BOTTOM']);
                    // this.boundaryCells.push("BOTTOM");
                }
            } else if (x_counter == 1){
                console.log("Left");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['LEFT']);
                // this.boundaryCells.push("LEFT");
            } else if (x_counter == this.gridWidth){
                console.log("Right");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['RIGHT']);
                // this.boundaryCells.push("RIGHT");
            } else {
                console.log("Center");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push(ACCEPTABLE_BOUNDARY_PATH_TYPES['CENTER'])
                // this.boundaryCells.push("CENTER");
            }

            if(x_counter==this.gridWidth){
                y_counter++;
                x_counter=0;
            }
            x_counter++;
        }
        // console.log(this.boundaryCells);
    }

    generateCellRecord(cellBoundaryType, x_counter, y_counter){
        console.log(cellBoundaryType);
        console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
        let cellRecord = {}
        cellRecord["cellBoundayType"] = cellBoundaryType;
        cellRecord["coordinates"] = [x_counter, y_counter];
        cellRecord["acceptableBoundaryPathTypes"] = ACCEPTABLE_BOUNDARY_PATH_TYPES[cellBoundaryType];
        cellRecord["selectedPath"] = this.determineRandomPath(cellRecord);
        this.cellData.push(cellRecord);
    }

    determineRandomPath(cellRecord){
        let paths = cellRecord.acceptableBoundaryPathTypes
        let randomPath;
        if(paths.length > 1){
            randomPath = paths[Math.floor(Math.random()*paths.length)];
        } else if(paths.length == 1){
            randomPath = paths[0];
        }
        return randomPath;
    }

}