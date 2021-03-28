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
        
        this.determineBoundary();

        for(let i = 0; i < 16; i++){
            //random
            this.x = x_counter * 100;
            this.y = y_counter * 100;
            
            this.buildPathGridCell();

            x_counter++;
    
            if( x_counter==4 ){
                x_counter=0,
                y_counter++;
            }
    
        }

    }

    determineBoundary(){
        let x_counter = 1;
        let y_counter = 1;
        for(let i = 1; i <= this.gridSize; i++){
            if(y_counter == 1 || x_counter == this.gridWidth || x_counter == 1 || i > (this.gridSize-this.gridWidth)){
                
                this.boundaryCells.push(i);
            }
            if(y_counter == 1){
                if(x_counter == 1){
                    console.log("Top Left Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                } else if (x_counter == this.gridWidth){
                    console.log("Top Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                } else {
                    console.log("Top");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                }
            } else if (y_counter == this.gridHeigth){
                if(x_counter == 1){
                    console.log("Bottom Left Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                } else if(x_counter == this.gridWidth){
                    console.log("Bottom Right Corner");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                } else {
                    console.log("Bottom");
                    console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
                }
            } else if (x_counter == 1){
                console.log("Left");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
            } else if (x_counter == this.gridWidth){
                console.log("Right");
                console.log("(" + x_counter + ", " + y_counter, ") i: " + i);
            } 

            // Top Left Corner
            // if Y counter == 1
                // if x counter == 1
                    // top left corner
                // else if x counter == this.gridWidth
                    // top right corner
                // else
                    // top
            // if Ycounter == gridHeigth
                // if x counter == 1
                    // bottom left corner
                // if x counter == this.gridWith
                    // bottom right corner
                // else
                    // bottom
            // if X_counter == 1
                // Left side
            // if x_counter == gridWidth
                // Rgiht Side
            
            // Top Right Corner
            // Y_Counter == 1
                // X counter == this.gridWidth

            if(x_counter==this.gridWidth){
                y_counter++;
                x_counter=0;
            }
            x_counter++;
        }
        console.log(this.boundaryCells);
    }

    buildPathGridCell(){
        let randomInt = Math.floor(Math.random()*Math.floor(11));
        switch(randomInt){
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

    drawRightHalfPath(){
        var moveToYCoors = this.y + this.height/2;
        var lineToXCoors = this.x + this.width/2;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();

    }

    drawLeftHalfPath(){
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