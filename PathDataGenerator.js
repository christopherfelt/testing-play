import {ACCEPTABLE_BOUNDARY_PATH_TYPES, COMPATIBLE_PATHS} from './PathDataLibrary.js';


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
        this.compatiblityReport = [];

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

    getAllData(){
        let gridData = {
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight,
            gridSize: this.gridSize,
            cellData: this.cellData
        }
        return gridData;
    }

    getCompatibilityReport(){
        return this.compatiblityReport;
    }

    generatePathData(){
        this.generateInitialPathData();
        // this.resolvePathConflicts();
        this.analyzePath();
        // console.log(this.compatiblityReport);


    }

    generateInitialPathData(){
        // consider doing an array of objects
        // add random this this function
        let x_counter = 1;
        let y_counter = 1;
        for(let i = 1; i <= this.gridSize; i++){

            if(y_counter == 1){
                if(x_counter == 1){
                    this.generateCellRecord('TOP_LEFT_CORNER', x_counter, y_counter);

                } else if (x_counter == this.gridWidth){
                    this.generateCellRecord('TOP_RIGHT_CORNER', x_counter, y_counter);
                } else {
                    this.generateCellRecord('TOP', x_counter, y_counter);
                }
            } else if (y_counter == this.gridHeight){
                if(x_counter == 1){
                    this.generateCellRecord('BOTTOM_LEFT_CORNER', x_counter, y_counter);
                } else if(x_counter == this.gridWidth){
                    this.generateCellRecord('BOTTOM_RIGHT_CORNER', x_counter, y_counter);
                } else {
                    this.generateCellRecord('BOTTOM', x_counter, y_counter);
                }
            } else if (x_counter == 1){
                this.generateCellRecord('LEFT', x_counter, y_counter);
            } else if (x_counter == this.gridWidth){
                this.generateCellRecord('RIGHT', x_counter, y_counter);
            } else {
                this.generateCellRecord('CENTER', x_counter, y_counter);
            }

            if(x_counter==this.gridWidth){
                y_counter++;
                x_counter=0;
            }
            x_counter++;
        }
    }

    generateCellRecord(cellBoundaryType, x_counter, y_counter){
        // console.log(cellBoundaryType);
        // console.log("(" + x_counter + ", " + y_counter, ")");
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

    resolvePathConflicts(){
        this.analyzePath();
        // this.generateConflictResolutionStrategy();

    }

    analyzePath(){

        let cellData = this.cellData;

        // let compatiblityReport=[
        //     // {
        //     //     cell:{
        //     //         coordinates: [],
        //     //         selectedPath: ''
        //     //     },
        //     //     bottom: {
        //     //         coordinates: [],
        //     //         selectedPath: '',
        //     //         conflict: false
        //     //     },
        //     //     right: {
        //     //         coordinates: [],
        //     //         selectedPath: '',
                        // conflict: false
        //     //     }
        //     // }
        // ]
        
        for(let i = 0; i < cellData.length; i++){
            
            let cell = cellData[i];
            
            let reportRecord = {
                cell:{},
                top:{},
                bottom:{},
                left:{},
                right:{}
            };
            
            // Record the current cells data
            reportRecord.cell.coordinates = cell.coordinates;
            reportRecord.cell.selectedPath = cell.selectedPath;

            // Get the coordinates for the bottom and right adjacent cells
            let adjTopCellCoors = cell.coordinates[1]-1 > 0 ? [cell.coordinates[0], cell.coordinates[1]-1] : "NA";
            let adjBottomCellCoors = cell.coordinates[1]+1 <= this.gridHeight ? [cell.coordinates[0], cell.coordinates[1]+1] : "NA";
            let adjLeftCellCoors = cell.coordinates[0]-1 > 0 ? [cell.coordinates[0]-1, cell.coordinates[1]] : "NA";
            let adjRightCellCoors =  cell.coordinates[0]+1 <= this.gridWidth ? [cell.coordinates[0]+1, cell.coordinates[1]] : "NA";
            
            // Find the cells in the celldata
            let adjTopCellSelectedPath = adjTopCellCoors == "NA" ? "NA" : cellData.find(p => {
                return p.coordinates[0] == adjTopCellCoors[0] && p.coordinates[1] == adjTopCellCoors[1] });

            let adjBottomCellSelectedPath = adjBottomCellCoors == "NA" ? "NA" : cellData.find(p => {
                return p.coordinates[0] == adjBottomCellCoors[0] && p.coordinates[1] == adjBottomCellCoors[1] });

            let adjLeftCellSelectedPath = adjLeftCellCoors == "NA" ? "NA" :  cellData.find((p) => {
                    return p.coordinates[0] == adjLeftCellCoors[0] && p.coordinates[1] == adjLeftCellCoors[1]})

            let adjRightCellSelectedPath = adjRightCellCoors == "NA" ? "NA" :  cellData.find((p) => {
                return p.coordinates[0] == adjRightCellCoors[0] && p.coordinates[1] == adjRightCellCoors[1]})
                
            // Determine if the selected paths for the adjacent cells conflict with the current cells path and add it to the record
            // Record cell data for the adjacent cells
            if(adjTopCellCoors == "NA"){
                reportRecord.top.coordinates = "NA";
                reportRecord.top.selectedPath = "NA";
                reportRecord.top.conflict = false;
            } else {
                reportRecord.top.coordinates = adjTopCellCoors;
                reportRecord.top.selectedPath = adjTopCellSelectedPath["selectedPath"];
                reportRecord.top.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["TOP"].includes(reportRecord.top.selectedPath);
            }

            if(adjBottomCellCoors == "NA"){
                reportRecord.bottom.coordinates = "NA";
                reportRecord.bottom.selectedPath = "NA";
                reportRecord.bottom.conflict = false;
            } else {
                reportRecord.bottom.coordinates = adjBottomCellCoors;
                reportRecord.bottom.selectedPath = adjBottomCellSelectedPath["selectedPath"];
                reportRecord.bottom.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["BOTTOM"].includes(reportRecord.bottom.selectedPath);
            }

            if(adjLeftCellCoors == "NA"){
                reportRecord.left.coordinates = "NA";
                reportRecord.left.selectedPath = "NA";
                reportRecord.left.conflict = false;
            } else {
                reportRecord.left.coordinates = adjLeftCellCoors;
                reportRecord.left.selectedPath = adjLeftCellSelectedPath["selectedPath"];
                reportRecord.left.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["LEFT"].includes(reportRecord.left.selectedPath);
            }

            if(adjRightCellCoors == "NA"){
                reportRecord.right.coordinates = "NA";
                reportRecord.right.selectedPath = "NA";
                reportRecord.right.conflict = false;
            } else {
                reportRecord.right.coordinates = adjRightCellCoors;
                reportRecord.right.selectedPath = adjRightCellSelectedPath["selectedPath"];
                reportRecord.right.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["RIGHT"].includes(reportRecord.right.selectedPath);
            }

            this.compatiblityReport.push(reportRecord);
        }

        // generateConflictResolutionStrategy(){

        // }



    }

}

export default PathDataGenerator;