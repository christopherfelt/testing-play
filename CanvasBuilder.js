import PathDataGenerator from "./PathDataGenerator.js";
import PathBuilder from "./PathBuilder.js"
 

class CanvasBuilder {


    constructor(context){
        this.ctx = context;
    }

    // buildGrid(){
    //     let x =0;
    //     let y=0;
    //     for(let i = 0; i < 16; i++){
    //         this.ctx.setLineDash([6]);
    //         this.ctx.strokeRect(x*100, y*100, 100, 100);
    //         x++;
    //         if( x==4 ){
    //             x=0,
    //             y++;
    //         }
    //     }
    //     this.ctx.setLineDash([]);
    // }

    buildGrid(){
        this.ctx.setLineDash([6]);
        for(let i = 1; i < 4; i++){
            this.ctx.beginPath();
            this.ctx.moveTo(0, i*100);
            this.ctx.lineTo(400, i*100);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(i*100, 0);
            this.ctx.lineTo(i*100, 400);
            this.ctx.stroke();
        }
        this.ctx.setLineDash([]);
    }
    
    buildCanvas(){


        let pdg = new PathDataGenerator();
        pdg.generatePathData()
        let data = pdg.getAllData();

        let pb = new PathBuilder(data, this.ctx);
        pb.buildPath();


    }
}

export default CanvasBuilder;