class CanvasBuilder {


    // Will need abstract all this into a seperate class


    constructor(context){
        this.ctx = context;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.gridWidth = 4;
        this.gridHeight = 4;
        this.gridSize = this.gridWidth * this.gridHeight;
        this.boundaryCells = [];
        this.acceptablePaths = [];
        this.randomPath = 0;
    }

    buildGrid(){
        let x =0;
        let y=0;
        for(let i = 0; i < 16; i++){
            this.ctx.strokeRect(x*100, y*100, 100, 100);
            x++;
            if( x==4 ){
                x=0,
                y++;
            }
        }
    }

    buildPath(){
        let x_counter = 0;
        let y_counter = 0;
        
        this.determineAcceptablePathsForBoundaryCells();

        for(let i = 0; i < 16; i++){
            //random
            this.x = x_counter * 100;
            this.y = y_counter * 100;
            
            this.determineRandomPath(i);
            this.buildPathGridCell();

            x_counter++;
    
            if( x_counter==4 ){
                x_counter=0,
                y_counter++;
            }
    
        }

    }

    determineAcceptablePathsForBoundaryCells(){
        // consider just doing a return
        let x_counter = 1;
        let y_counter = 1;
        for(let i = 1; i <= this.gridSize; i++){
            if(y_counter == 1){
                if(x_counter == 1){
                    console.log("Top Left Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([7]);
                    // this.boundaryCells.push("TOP_LEFT_CORNER");
                } else if (x_counter == this.gridWidth){
                    console.log("Top Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([9])
                    // this.boundaryCells.push("TOP_RIGHT_CORNER");
                } else {
                    console.log("Top");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([0, 4, 7, 9])
                    // this.boundaryCells.push("TOP");
                }
            } else if (y_counter == this.gridHeight){
                if(x_counter == 1){
                    console.log("Bottom Left Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([8])
                    // this.boundaryCells.push("BOTTOM_LEFT_CORNER");
                } else if(x_counter == this.gridWidth){
                    console.log("Bottom Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([10])
                    // this.boundaryCells.push("BOTTOM_RIGHT_CORNER");
                } else {
                    console.log("Bottom");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                    this.acceptablePaths.push([0, 3, 8, 10]);
                    // this.boundaryCells.push("BOTTOM");
                }
            } else if (x_counter == 1){
                console.log("Left");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push([1, 5, 7, 8 ]);
                // this.boundaryCells.push("LEFT");
            } else if (x_counter == this.gridWidth){
                console.log("Right");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push([1, 6, 9, 10]);
                // this.boundaryCells.push("RIGHT");
            } else {
                console.log("Center");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                this.acceptablePaths.push([])
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

    determineRandomPath(cn){
        // cn = cell number
        let bca = this.acceptablePaths[cn];
        let randomPath;
        if(bca.length > 1){
            randomPath = bca[Math.floor(Math.random()*bca.length)];
        } else if(bca.length == 1){
            randomPath = bca[0];
        } else {
            randomPath = Math.floor(Math.random()*Math.floor(11))
        }
        this.randomPath = randomPath;
    }

    buildPathGridCell(){
        // let randomInt = Math.floor(Math.random()*Math.floor(11));
        switch(this.randomPath){
            // Straight Path Horizontal
            case 0:
                this.drawStraightPathHorizontal();
                break;
            // Straight Path Vertical
            case 1:
                this.drawStraightPathVertical();
                break;
            // Cross Path
            case 2:
                this.drawStraightPathHorizontal();
                this.drawStraightPathVertical();
                break;
            // Horizontal Top Path
            case 3:
                this.drawStraightPathHorizontal();
                this.drawTopHalfPath();
                break;
            // Horizontal Bottom Path
            case 4:
                this.drawStraightPathHorizontal();
                this.drawBottomHalfPath();
                break;
            // Vertical Right Path
            case 5:
                this.drawStraightPathVertical();
                this.drawRightHalfPath();
                break;
            // Vertical Left Path
            case 6:
                this.drawStraightPathVertical();
                this.drawLeftHalfPath();
                break;
            // Right Bottom Corner Path
            case 7:
                this.drawRightHalfPath();
                this.drawBottomHalfPath();
                break;
            // Right Top Corner Path
            case 8:
                this.drawRightHalfPath();
                this.drawTopHalfPath();
                break;
            // Left Bottom Corner Path
            case 9:
                this.drawLeftHalfPath();
                this.drawBottomHalfPath();
                break;
            // Left Top Corner Path
            case 10:
                this.drawLeftHalfPath();
                this.drawTopHalfPath();
                break;
        }
        
    }

    drawStraightPathHorizontal(){
        var moveToYCoors = this.y + this.height/2;
        var lineToXCoors = this.x + this.width;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();
    }

    drawStraightPathVertical(){
        var moveToXCoors = this.x + this.width/2;
        var lineToYCoors = this.y + this.height;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, this.y);
        this.ctx.lineTo(moveToXCoors, lineToYCoors);
        this.ctx.stroke();
    }

    drawLeftHalfPath(){
        var moveToYCoors = this.y + this.height/2;
        var lineToXCoors = this.x + this.width/2;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();

    }

    drawRightHalfPath(){
        var moveToXCoors = this.x + this.width/2
        var moveToYCoors = this.y + this.height/2;
        var lineToXCoors = this.x + this.width;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();
    }

    drawTopHalfPath(){
        var moveToXCoors = this.x + this.width/2;
        var lineToYCoors = this.y + this.height/2;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, this.y);
        this.ctx.lineTo(moveToXCoors, lineToYCoors);
        this.ctx.stroke();
    }

    drawBottomHalfPath(){
        var moveToXCoors = this.x + this.width/2;
        var moveToYCoors = this.y + this.height/2;
        var lineToYCoors = this.y + this.height;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, moveToYCoors);
        this.ctx.lineTo(moveToXCoors, lineToYCoors);
        this.ctx.stroke();

    }

}

export default CanvasBuilder;