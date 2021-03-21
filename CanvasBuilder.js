class CanvasBuilder {
    constructor(context){
        this.ctx = context;
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

    buildTest(){
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(200, 100);
        this.ctx.moveTo(200, 100);
        this.ctx.lineTo(200, 200);
        this.ctx.stroke();
    }

}

export default CanvasBuilder;