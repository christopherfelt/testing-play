class CanvasBuilder {
    constructor(context){
        this.ctx = context;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
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

        for(let i = 0; i < 16; i++){
            //random
            
            this.x = x_counter * 100;
            this.y = y_counter * 100;
            
            // this.drawStraightPath();
            this.drawStraightPathVertical();

            x_counter++;
    
            if( x_counter==4 ){
                x_counter=0,
                y_counter++;
            }
    
        }

    }

    buildPathGridCell(){
        //switch
        
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
        var moveToYCoors = this.y + height/2;
        var lineToXCoors = this.x + width/2;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();

    }

    drawLeftHalfPath(){
        var moveToXCoors = this.x + width/2
        var moveToYCoors = this.y + height/2;
        var lineToXCoors = this.x + width;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, moveToYCoors);
        this.ctx.lineTo(lineToXCoors, moveToYCoors);
        this.ctx.stroke();
    }

    drawTopHalfPath(){
        var moveToXCoors = this.x + width/2;
        var lineToYCoors = this.y + height/2;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, this.y);
        this.ctx.lineTo(moveToXCoors, lineToYCoors);
        this.ctx.stroke();
    }

    drawBottomHalfPath(){
        var moveToXCoors = this.x + width/2;
        var moveToYCoors = this.y + height/2;
        var lineToYCoors = this.y + this.height;

        this.ctx.beginPath();
        this.ctx.moveTo(moveToXCoors, moveToYCoors);
        this.ctx.lineTo(moveToXCoors, lineToYCoors);
        this.ctx.stroke();

    }


    buildTest(){
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(200, 100);
        this.ctx.moveTo(200, 100);
        this.ctx.lineTo(200, 200);
        this.ctx.stroke();
    }

}

export default CanvasBuilder;