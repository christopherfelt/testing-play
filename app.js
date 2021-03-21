import CanvasBuilder from "./CanvasBuilder.js";

function main(){


    var c = document.getElementById("myCanvas")
    var ctx = c.getContext("2d");
    
    let cb = new CanvasBuilder(ctx);
    cb.buildGrid();
    cb.buildTest();

    // generateGrid(ctx);

}

main();



// function test(ctx){
//     ctx.moveTo(0,0);
//     ctx.lineTo(200, 100);
//     ctx.moveTo(200, 100);
//     ctx.lineTo(200, 200);
//     ctx.stroke();

//     ctx.strockRect()
// }



// function generateGrid(ctx){

//     let x =0;
//     let y=0;
//     for(let i = 0; i < 16; i++){

//         ctx.strokeRect(x*100, y*100, 100, 100);
//         x++;

//         if( x==4 ){
//             x=0,
//             y++;
//         }

//     }
// }



// Make a maze
// Create AI
// Create player
