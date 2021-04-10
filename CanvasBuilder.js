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

    buildConflictGrid(data, compatiblityReport){

        console.log("data", typeof data);
        this.ctx.globalAlpha = 0.2;
        for(let i = 0; i < data.cellData.length; i++){
            let bottomConflict = compatiblityReport[i].bottom.conflict;
            let rightConflict = compatiblityReport[i].right.conflict;
            let cell = data.cellData[i];
            let color;
            let x = (cell.coordinates[0]-1)*data.cellWidth;
            let y = (cell.coordinates[1]-1)*data.cellHeight;

            if(!bottomConflict && !rightConflict){//no conflict
                color = "#00FF00"; //green
            } else if(bottomConflict && !rightConflict){//bottom conflict only
                color = "#FFFF00"; //yellow
            } else if(!bottomConflict && rightConflict){//right conflict only
                color = "#0000FF"; //blue
            } else if(bottomConflict && rightConflict){//both conflicts
                color = "#FF0000"; //red
            }

            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, data.cellWidth, data.cellHeight);
        }
        this.ctx.globalAlpha = 1.0;

    }
    
    buildCanvas(){


        let pdg = new PathDataGenerator();
        pdg.generatePathData()
        let data = pdg.getAllData();

        this.buildGrid();

        let compatiblityReport = pdg.getCompatibilityReport();
        this.buildConflictGrid(data, compatiblityReport);

        let pb = new PathBuilder(data, this.ctx);
        pb.buildPath();


    }
}

export default CanvasBuilder;