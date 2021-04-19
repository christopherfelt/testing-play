import {ACCEPTABLE_BOUNDARY_PATH_TYPES, COMPATIBLE_PATHS,  PATH_ORIENTATION} from './PathDataLibrary.js';


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
        this.analyzePath();
        this.resolvePathConflicts();
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
        cellRecord["cellBoundaryType"] = cellBoundaryType;
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

    resolveConflicts(){
        // create initial compatibility report
        this.analyzePath();
        // resolveConflicts
        

    }

    analyzePath(){

        let cellData = this.cellData;
        
        for(let i = 0; i < cellData.length; i++){
            
            let cell = cellData[i];

            this.compatiblityReport.push(this.analyzeCell(cell));

        }
    }

    analyzeCell(cell){
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
        let adjTopCellSelectedPath = adjTopCellCoors == "NA" ? "NA" : this.cellData.find(p => {
            return p.coordinates[0] == adjTopCellCoors[0] && p.coordinates[1] == adjTopCellCoors[1] });

        let adjBottomCellSelectedPath = adjBottomCellCoors == "NA" ? "NA" : this.cellData.find(p => {
            return p.coordinates[0] == adjBottomCellCoors[0] && p.coordinates[1] == adjBottomCellCoors[1] });

        let adjLeftCellSelectedPath = adjLeftCellCoors == "NA" ? "NA" :  this.cellData.find((p) => {
                return p.coordinates[0] == adjLeftCellCoors[0] && p.coordinates[1] == adjLeftCellCoors[1]})

        let adjRightCellSelectedPath = adjRightCellCoors == "NA" ? "NA" :  this.cellData.find((p) => {
            return p.coordinates[0] == adjRightCellCoors[0] && p.coordinates[1] == adjRightCellCoors[1]})
            
        // Determine if the selected paths for the adjacent cells conflict with the current cells path and add it to the record
        // Record cell data for the adjacent cells
        if(adjTopCellCoors == "NA"){
            reportRecord.top.coordinates = "NA";
            reportRecord.top.selectedPath = "NA";
            reportRecord.top.conflict = true;
        } else {
            reportRecord.top.coordinates = adjTopCellCoors;
            reportRecord.top.selectedPath = adjTopCellSelectedPath["selectedPath"];
            reportRecord.top.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["TOP"].includes(reportRecord.top.selectedPath);
        }

        if(adjBottomCellCoors == "NA"){
            reportRecord.bottom.coordinates = "NA";
            reportRecord.bottom.selectedPath = "NA";
            reportRecord.bottom.conflict = true;
        } else {
            reportRecord.bottom.coordinates = adjBottomCellCoors;
            reportRecord.bottom.selectedPath = adjBottomCellSelectedPath["selectedPath"];
            reportRecord.bottom.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["BOTTOM"].includes(reportRecord.bottom.selectedPath);
        }

        if(adjLeftCellCoors == "NA"){
            reportRecord.left.coordinates = "NA";
            reportRecord.left.selectedPath = "NA";
            reportRecord.left.conflict = true;
        } else {
            reportRecord.left.coordinates = adjLeftCellCoors;
            reportRecord.left.selectedPath = adjLeftCellSelectedPath["selectedPath"];
            reportRecord.left.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["LEFT"].includes(reportRecord.left.selectedPath);
        }

        if(adjRightCellCoors == "NA"){
            reportRecord.right.coordinates = "NA";
            reportRecord.right.selectedPath = "NA";
            reportRecord.right.conflict = true;
        } else {
            reportRecord.right.coordinates = adjRightCellCoors;
            reportRecord.right.selectedPath = adjRightCellSelectedPath["selectedPath"];
            reportRecord.right.conflict = !COMPATIBLE_PATHS[cell.selectedPath]["RIGHT"].includes(reportRecord.right.selectedPath);
        }

        return reportRecord;
    }

    resolvePathConflicts(){

        let cellData = this.cellData;
       

        // get cells in window
        let topLeft = [1, 1];
        let topRight;
        let bottomLeft;
        let bottomRight;


        while (topLeft[1] < this.gridHeight){
            topRight = [topLeft[0]+1, topLeft[1]];
            bottomLeft = [topLeft[0], topLeft[1]+1];
            bottomRight = [topLeft[0]+1, topLeft[1]+1];
            // // find cell report record
            let window = [topLeft, topRight, bottomLeft, bottomRight]
            let allRecordsForWindowCells = [];

            // find if one cell has all conflicts
            // for(let c = 0; c < window.length; c++){
            //     let windowCell = window[c];
                

            //     let cellCompatibilityRecord = this.compatiblityReport.find(r => {
            //         return r.cell.coordinates[0] == windowCell[0] && r.cell.coordinates[1] == windowCell[1];
            //     })

            //     let allConflicts = checkForAllConflicts(cellCompatibilityRecord);

            //     console.log("All Conflicts: " + windowCell + " " + allConflicts);

            //     if(allConflict){
            //         let cellRecord= cellData.find(c => {
            //             return c.coordinates[0] == windowCell[0] && c.coordinates[1] == windowCell[1];
            //         })
            //         if(cellRecord.cellBoundaryType == "")
            //     }

            // }

            for(let c = 0; c < window.length; c++){
                let windowCell = window[c];

                let cellRecord= cellData.find(c => {
                    return c.coordinates[0] == windowCell[0] && c.coordinates[1] == windowCell[1];
                })

                let cellCompatibilityRecord = this.compatiblityReport.find(r => {
                    return r.cell.coordinates[0] == windowCell[0] && r.cell.coordinates[1] == windowCell[1];
                })

                allRecordsForWindowCells.push({data: cellRecord, conflict: cellCompatibilityRecord})

            }

            let topLeftRightConflict = allRecordsForWindowCells[0].conflict.right.conflict;
            let topLeftBoundaryType = allRecordsForWindowCells[0].data.cellBoundaryType;
            let topLeftPath = allRecordsForWindowCells[0].data.selectedPath;

            let topRightLeftConflict = allRecordsForWindowCells[1].conflict.left.conflict;
            let topRightBoundaryType = allRecordsForWindowCells[1].data.cellBoundaryType;
            let topRightPath = allRecordsForWindowCells[1].data.selectedPath;


            if(topLeftRightConflict && topLeftBoundaryType !="TOP_LEFT_CORNER" && !PATH_ORIENTATION.RIGHT_FACING.includes(topLeftPath)){
                
                if(topLeftBoundaryType == "TOP"){allRecordsForWindowCells[0].data.selectedPath = "HORIZONTAL_BOTTOM"}
                else if(topLeftBoundaryType == "LEFT"){allRecordsForWindowCells[0].data.selectedPath = "VERTICAL_RIGHT"}
                else{allRecordsForWindowCells[0].data.selectedPath = "CROSS"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                continue;
            }

            if(topRightLeftConflict && topLeftBoundaryType !="TOP_RIGHT_CORNER" && !PATH_ORIENTATION.LEFT_FACING.includes(topRightPath)){
                
                if(topRightBoundaryType == "TOP"){allRecordsForWindowCells[0].data.selectedPath = "HORIZONTAL_BOTTOM"}
                else if(topRightBoundaryType == "RIGHT"){allRecordsForWindowCells[0].data.selectedPath = "VERTICAL_LEFT"}
                else{allRecordsForWindowCells[0].data.selectedPath = "CROSS"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                continue;
            }

            if(topRightLeftConflict && topLeftBoundaryType !="BOTTOM_LEFT_CORNER" && !PATH_ORIENTATION.RIGHT_FACING.includes(bottomLeftPath)){
                
                if(topRightBoundaryType == "BOTTOM"){allRecordsForWindowCells[0].data.selectedPath = "HORIZONTAL_TOP"}
                else if(topRightBoundaryType == "LEFT"){allRecordsForWindowCells[0].data.selectedPath = "VERTICAL_RIGHT"}
                else{allRecordsForWindowCells[0].data.selectedPath = "CROSS"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                continue;
            }

            //do the remaining cells

            
            //also make the window overlapping by reducing the 2s to 1s in the little bit below
            topLeft[0] += 2;
            if(topLeft[0] >= this.gridWidth){
                topLeft[0] = 1;
                topLeft[1] += 2;
            }
        }




        function checkForAllConflicts(cell){
            let allConflicts = cell.top.conflict && cell.bottom.conflict && cell.left.conflict && cell.right.conflict;

            let cellCheck = cellData.find(c => {
                return c.coordinates[0] == cell.cell.coordinates[0] && c.coordinates[1] == cell.cell.coordinates[1];
            })
            
            let isCorner = cellCheck.cellBoundaryType == "TOP_LEFT_CORNER" ||
                            cellCheck.cellBoundaryType == "TOP_RIGHT_CORNER" ||
                            cellCheck.cellBoundaryType == "BOTTOM_LEFT_CORNER" ||
                            cellCheck.cellBoundaryType == "BOTTOM_RIGHT_CORNER";
            
            return allConflicts && !isCorner

        }

         


        // moving a 4 cell square window over over the grid
        // if one cell has all conflict change it or if is a corner change one adjacent
        // regenerate conflict report
        // (for now the window will move from left to right and top to bottom)
        // check same area
            // if the bottom two squares have bottom conflict and are not bottom facing pieces switch one
        // (I will need to make another library for facing pieces)
        // I will have to do special checks for boundary pieces

    }

   updateConflictRecords(cellCoordinates, analysis){

        let compatibilityRecordIndex = this.compatiblityReport.findIndex(r => {
            return this.compareCellCoordinates(r.cell.coordinates, cellCoordinates)
        })

        this.compatiblityReport[compatibilityRecordIndex] = analysis;
        
    }

    compareCellCoordinates(cell1, cell2){
        return cell1[0] == cell2[0] && cell1[1] == cell2[1];
    }


}

export default PathDataGenerator;