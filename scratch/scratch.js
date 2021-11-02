let acceptableBoudaryPathTypes = {
    TOP_LEFT_CORNER = []
}



let gridData = {
    cell_1:{
        cellBoundaryType: "CENTER",
        coors: [2,1],
        acceptableBoundaryPathTypes: acceptableBoudaryPathTypes["CENTER"],
        selectedPath: 'CROSS_PATH'
    }
}

// CELL BOUNDARY TYPES
// TOP_LEFT_CORNER, TOP_RIGHT_CORNER, TOP, BOTTOM_LEFT_CORNER
// BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER, BOTTOM, LEFT, RIGTH, 
// CENTER

// PATH TYPES
// HORIZONTAL_STRAIGHT, VERTICAL_STRAIGHT, CROSS,
// HORIZONTAL_WITH_TOP, HORIZONTAL_WITH_BOTTOM,
// VERTICAL_WITH_RIGHT, VERTICAL_WITH_LEFT,
// RIGHT_BOTTOM, RIGHT_TOP, LEFT_BOTTOM, LEFT_TOP
//testing
//testing again