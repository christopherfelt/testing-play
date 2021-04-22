import {ACCEPTABLE_BOUNDARY_PATH_TYPES, COMPATIBLE_PATHS,  PATH_ORIENTATION} from './PathDataLibrary.js';


class PathDataGenerator {

    constructor(){
        this.gridWidth = 6;
        this.gridHeight = 6;
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

        this.resolveConflictsHorizontally();
        this.resolveConflictsVertically();

    }

    resolveConflictsHorizontally(){
        let cellData = this.cellData;
       

        // get cells in window
        let topLeft = [1, 1];
        let topRight = [0,0];
        let bottomLeft = [0, 0];
        let bottomRight = [0, 0];
        let windowRepeatCount = 1;


        while (topLeft[0] <= this.gridWidth-1 && topLeft[1] <= this.gridHeight-1){
            topRight = [topLeft[0]+1, topLeft[1]];
            bottomLeft = [topLeft[0], topLeft[1]+1];
            bottomRight = [topLeft[0]+1, topLeft[1]+1];
            // // find cell report record
            let window = [topLeft, topRight, bottomLeft, bottomRight]
            let allRecordsForWindowCells = [];

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

            // console.log("window (" + windowRepeatCount + "):", JSON.stringify(window), allRecordsForWindowCells);
            let topLeftRightConflict = allRecordsForWindowCells[0].conflict.right.conflict;
            let topLeftBoundaryType = allRecordsForWindowCells[0].data.cellBoundaryType;
            let topLeftPath = allRecordsForWindowCells[0].data.selectedPath;

            let topRightLeftConflict = allRecordsForWindowCells[1].conflict.left.conflict;
            let topRightBoundaryType = allRecordsForWindowCells[1].data.cellBoundaryType;
            let topRightPath = allRecordsForWindowCells[1].data.selectedPath;

            let bottomLeftRightConflict = allRecordsForWindowCells[2].conflict.right.conflict;
            let bottomLeftBoundaryType = allRecordsForWindowCells[2].data.cellBoundaryType;
            let bottomLeftPath = allRecordsForWindowCells[2].data.selectedPath;

            let bottomRightLeftConflict = allRecordsForWindowCells[3].conflict.left.conflict;
            let bottomRightBoundaryType = allRecordsForWindowCells[3].data.cellBoundaryType;
            let bottomRightPath = allRecordsForWindowCells[3].data.selectedPath;


            if(topLeftRightConflict && topLeftBoundaryType !="TOP_LEFT_CORNER" && !PATH_ORIENTATION.RIGHT_FACING.includes(topLeftPath)){
                
                // console.log("topleft resolution");
                // console.log(allRecordsForWindowCells[0]);
                if(topLeftBoundaryType == "TOP"){allRecordsForWindowCells[0].data.selectedPath = "HORIZONTAL_BOTTOM"}
                else if(topLeftBoundaryType == "LEFT"){allRecordsForWindowCells[0].data.selectedPath = "VERTICAL_RIGHT"}
                else{allRecordsForWindowCells[0].data.selectedPath = "HORIZONTAL_STRAIGHT"}//or cross or horizontal bottom

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                this.updateConflictRecords(bottomLeft, this.analyzeCell(allRecordsForWindowCells[2].data));
                this.updateConflictRecords(bottomRight, this.analyzeCell(allRecordsForWindowCells[3].data));
                windowRepeatCount++;
                continue;
            }

            if(topRightLeftConflict && topRightBoundaryType !="TOP_RIGHT_CORNER" && !PATH_ORIENTATION.LEFT_FACING.includes(topRightPath)){
                
                // console.log("topright resolution");
                // console.log(allRecordsForWindowCells[1]);
                if(topRightBoundaryType == "TOP"){allRecordsForWindowCells[1].data.selectedPath = "HORIZONTAL_BOTTOM"}
                else if(topRightBoundaryType == "RIGHT"){allRecordsForWindowCells[1].data.selectedPath = "VERTICAL_LEFT"}
                else{allRecordsForWindowCells[1].data.selectedPath = "HORIZONTAL_STRAIGHT"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                this.updateConflictRecords(bottomLeft, this.analyzeCell(allRecordsForWindowCells[2].data));
                this.updateConflictRecords(bottomRight, this.analyzeCell(allRecordsForWindowCells[3].data));
                windowRepeatCount++;
                continue;
            }

            if(bottomLeftRightConflict && bottomLeftBoundaryType !="BOTTOM_LEFT_CORNER" && !PATH_ORIENTATION.RIGHT_FACING.includes(bottomLeftPath)){
                
                // console.log("bottom left resolution");
                // console.log(allRecordsForWindowCells[2]);
                if(bottomLeftBoundaryType == "BOTTOM"){allRecordsForWindowCells[2].data.selectedPath = "HORIZONTAL_TOP"}
                else if(bottomLeftBoundaryType == "LEFT"){allRecordsForWindowCells[2].data.selectedPath = "VERTICAL_RIGHT"}
                else{allRecordsForWindowCells[2].data.selectedPath = "HORIZONTAL_STRAIGHT"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                this.updateConflictRecords(bottomLeft, this.analyzeCell(allRecordsForWindowCells[2].data));
                this.updateConflictRecords(bottomRight, this.analyzeCell(allRecordsForWindowCells[3].data));
                windowRepeatCount++;
                continue;
            }
            
            if(bottomRightLeftConflict && bottomRightBoundaryType !="BOTTOM_RIGHT_CORNER" && !PATH_ORIENTATION.LEFT_FACING.includes(bottomRightPath)){
                
                // console.log("bottom right resolution");
                // console.log(allRecordsForWindowCells[3]);
                if(bottomRightBoundaryType == "BOTTOM"){allRecordsForWindowCells[3].data.selectedPath = "HORIZONTAL_TOP"}
                else if(bottomRightBoundaryType == "RIGHT"){allRecordsForWindowCells[3].data.selectedPath = "VERTICAL_LEFT"}
                else{allRecordsForWindowCells[3].data.selectedPath = "HORIZONTAL_STRAIGHT"}

                this.updateConflictRecords(topLeft, this.analyzeCell(allRecordsForWindowCells[0].data));
                this.updateConflictRecords(topRight, this.analyzeCell(allRecordsForWindowCells[1].data));
                this.updateConflictRecords(bottomLeft, this.analyzeCell(allRecordsForWindowCells[2].data));
                this.updateConflictRecords(bottomRight, this.analyzeCell(allRecordsForWindowCells[3].data));
                windowRepeatCount++;
                continue;
            }

            // console.log(topLeft, this.gridWidth)
            // console.log("==================RESOLVED==================")
            windowRepeatCount = 1;
            topLeft[0] += 1;
            if(topLeft[0] >= this.gridWidth){
                topLeft[0] = 1;
                topLeft[1] += 1;
            }
        }

    }

    resolveConflictsVertically(){

        // Move the window down row by row
        // the window will be the width of the grid and the height of two rows
        let cellData = this.cellData;
        let compatiblityReport = this.compatiblityReport

        let firstCell = [1,1]
        let lastCell = [this.gridWidth, firstCell[1]+1];

        let window = compatiblityReport.filter(c =>{
            // console.log(c.cell.coordinates)
            // console.log(lastCell[1])
            // console.log(c.cell.coordinates[0] >= 1, c.cell.coordinates[0] <= this.gridWidth, c.cell.coordinates[1] >= firstCell[1],  c.cell.coordinates <= lastCell[1])
            return c.cell.coordinates[0] >= 1 && c.cell.coordinates[0] <= this.gridWidth && c.cell.coordinates[1] >= firstCell[1] && c.cell.coordinates[1] <= lastCell[1]
        })

        console.log(window);

        // while(firstCell[0] != this.gridHeight-1){

        //     // for(let c = 1; c <)

        //     firstCell[1] +=1
        // }
        
        
    }




   updateConflictRecords(cellCoordinates, analysis){

        let compatibilityRecordIndex = this.compatiblityReport.findIndex(r => {
            return this.compareCellCoordinates(r.cell.coordinates, cellCoordinates)
        })

        // console.log("analysis", analysis);

        this.compatiblityReport[compatibilityRecordIndex] = analysis;
        
    }

    compareCellCoordinates(cell1, cell2){
        return cell1[0] == cell2[0] && cell1[1] == cell2[1];
    }


}

export default PathDataGenerator;