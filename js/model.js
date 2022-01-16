import {Parser as jQuery} from "acorn";
//import cloneDeep from "../clone-deep-master";


let graph = {}
graphInit(graph);

let isTwoRealPlayers = 0;
let isGameOver = 0
let newWall = {
  rowN: 1,
  columnN: 1,
  wallType: "hboard",
  player: 0
}
let firstPlayer = {
  prevPos: {
    row: 9,
    column: 5,
  },
  row: 9,
  column: 5,
  wallsAmount: 10,
  finishCellRow: 1,
  changePos: 0,
  points:0
}
let secondPlayer = {
  prevPos: {
    row: 1,
    column: 5,
  },
  row: 1,
  column: 5,
  wallsAmount: 10,
  finishCellRow: 9,
  changePos: 0,
  points:0
}
let players = [firstPlayer, secondPlayer]
let currentPlayer = players[0]


let dots = []
dotsInit(dots)/*= [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];*/

function dotsInit(dots) {

  // creating two dimensional array
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      dots[i] = [];
    }
  }

  // inserting elements to array
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      dots[i][j] = 1;
    }
  }
  //console.log(dots)

}

export function playII() {
  isTwoRealPlayers = 0
}

export function playFriend() {
  isTwoRealPlayers = 1
}



export function restart_model() {
  isGameOver = 0
  newWall = {
    rowN: 1,
    columnN: 1,
    wallType: "hboard",
    player: 0
  }
  /*players[0] = {
    prevPos: {
      row: 9,
      column: 5,
    },
    row: 9,
    column: 5,
    wallsAmount: 10,
    finishCellRow: 1,
    changePos: 0
  }*/
  players[0].prevPos.row=9
  players[0].prevPos.column=5
  players[0].row=9
  players[0].column=5
  players[0].wallsAmount=10

  //console.log("гравці рестартнуті",players)
  /*players[1] = {
    prevPos: {
      row: 1,
      column: 5,
    },
    row: 1,
    column: 5,
    wallsAmount: 10,
    finishCellRow: 9,
    changePos: 0
  }*/

  players[1].prevPos.row=1
  players[1].prevPos.column=5
  players[1].row=1
  players[1].column=5
  players[1].wallsAmount=10


  firstPlayer = players[0]
  secondPlayer = players[1]
  currentPlayer = players[0]
  //console.log("поточний гравець",currentPlayer)
  //console.log("гравці рестартнуті",players)

  graphInit(graph);
  dotsInit(dots)
}

export function resetCounterModel(){
  players[0].points=0
  players[1].points=0
}

export function getCurrentPlayer() {
  //console.log(currentPlayer)
  if (currentPlayer === players[0]) return 0
  else return 1
}

export function getPlayer(num) {
  return players[num]
}

export function isFinish() {
  return isGameOver
}

export function getIsTwoRealPlayers() {
  return isTwoRealPlayers

}

export function getFirstPlayerWalls() {
  return players[0].wallsAmount
}

export function getSecondPlayerWalls() {
  return players[1].wallsAmount
}

export function getCurrentPlayerRow() {

  return currentPlayer.row
}

export function getCurrentPlayerColumn() {

  return currentPlayer.column
}

export function changeCurrentPlayerPos(newRow, newColumn) {
  currentPlayer.prevPos.row = JSON.parse(JSON.stringify(currentPlayer.row))
  currentPlayer.prevPos.column = JSON.parse(JSON.stringify(currentPlayer.column))
  currentPlayer.row = newRow
  currentPlayer.column = newColumn
  currentPlayer.changePos = 1

  if ((currentPlayer.row) === currentPlayer.finishCellRow) {

    isGameOver = 1
    currentPlayer.points=currentPlayer.points+1
    return
  }
  changeCurrentPlayer()
}

export function changePlayerPos(newRow, newColumn) {
  players[0].row = newRow
  players[0].column = newColumn
}

function changeCurrentPlayer() {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1]
  } else {
    currentPlayer = players[0]
  }
  if (currentPlayer === players[1] && !isTwoRealPlayers) {
    console.log("тут йде")
    goII()

  }
}

function goII() {

  while (true) {
    if (Math.round(Math.random())) {
      let neighbors = getCurrentPlayerNeighbors()
      //console.log(neighbors)
      let notNullNeighbors = []
      for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i] != null) {
          notNullNeighbors.push(neighbors[i])
        }
      }
      let newN = Math.round(Math.random() * (notNullNeighbors.length - 1))
      changeCurrentPlayerPos(notNullNeighbors[newN].pos.row, notNullNeighbors[newN].pos.column)
      return;
    } else {

      let row = Math.round(Math.random() * (9 - 1) + 1)
      let column = Math.round(Math.random() * (9 - 1) + 1)
      let wallType
      if (Math.round(Math.random())) {
        wallType = "vborder"
      } else {
        wallType = "hborder"
      }
      if (canAddWall(row, column, wallType)) {
        addWallToGraph(row, column, wallType)
        return
      }

    }
  }


}

export function getPlayerRow(num) {
  if (num) {
    return players[1].row
  } else {
    return players[0].row
  }
}

export function getPlayerColumn(num) {
  if (num) {
    return players[1].column
  } else {
    return players[0].column
  }
}

export function getPlayerPrevRow(num) {
  if (num) {
    return players[1].prevPos.row
  } else {
    return players[0].prevPos.row
  }
}

export function getPlayerPrevColumn(num) {
  if (num) {
    return players[1].prevPos.column
  } else {
    return players[0].prevPos.column
  }
}

export function getNewWall() {
  return newWall
}

export function getFirstPlayerNeighbors() {
  let playerCell = graph[players[0].row + "-" + players[0].column]
  return [playerCell.leftN, playerCell.rightN, playerCell.topN, playerCell.bottomN]
}

export function getCurrentPlayerNeighbors() {

  let opponent
  if (currentPlayer === players[0]) {
    opponent = players[1]
  } else {
    opponent = players[0]
  }
  let playerCell = graph[currentPlayer.row + "-" + currentPlayer.column]
  let leftNeighbor
  let rightNeighbor
  let topNeighbor
  let bottomNeighbor
  let opponentCell = graph[opponent.row + "-" + opponent.column]
  if (playerCell.leftN === opponentCell) {
    if (graph[opponent.row + "-" + (opponent.column - 1)] != null && opponentCell.leftN != null) {
      leftNeighbor = graph[opponent.row + "-" + (opponent.column - 1)]
    } else leftNeighbor = null
  } else {
    leftNeighbor = playerCell.leftN
  }

  if (playerCell.rightN === opponentCell) {
    if (graph[opponent.row + "-" + (opponent.column + 1)] != null && opponentCell.rightN != null) {
      rightNeighbor = graph[opponent.row + "-" + (opponent.column + 1)]
    } else rightNeighbor = null
  } else {
    rightNeighbor = playerCell.rightN
  }

  if (playerCell.topN === opponentCell) {
    if (graph[(opponent.row - 1) + "-" + opponent.column] != null && opponentCell.topN != null) {
      topNeighbor = graph[(opponent.row - 1) + "-" + opponent.column]
    } else topNeighbor = null
  } else {
    topNeighbor = playerCell.topN
  }
  if (playerCell.bottomN === opponentCell) {
    if (graph[(opponent.row + 1) + "-" + opponent.column] != null && opponentCell.bottomN != null) {
      bottomNeighbor = graph[(opponent.row + 1) + "-" + opponent.column]
    } else bottomNeighbor = null
  } else {
    bottomNeighbor = playerCell.bottomN
  }
  return [leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor]
}

export function isPlayerNeighbor(askedID, isFirstPlayer) {

  let askedCell = graph[askedID]
  if (isFirstPlayer) {
    let playerCell = graph[players[0].row + "-" + players[0].column]
    let neighbors = [playerCell.leftN, playerCell.rightN, playerCell.topN, playerCell.bottomN]
    for (let neighborCell of neighbors) {
      if (askedCell === neighborCell) {
        return true
      }
    }
  }
  return false
}

export function isCurrentPlayerNeighbor(askedID) {
  let opponent
  if (currentPlayer === players[0]) {
    opponent = players[1]
  } else {
    opponent = players[0]
  }

  let askedCell = graph[askedID]

  let neighbors = getCurrentPlayerNeighbors()
  for (let neighborCell of neighbors) {
    if (askedCell === neighborCell) {
      return true
    }
  }

  return false
}


export function graphInit(graph) {

  let first = 1;
  let last = 9;
  for (let i = first; i <= last; i++) {
    for (let j = first; j <= last; j++) {
      graph[i + "-" + j] = {pos: {row: i, column: j}}
    }
  }

  for (let i = first; i <= last; i++) {
    for (let j = first; j <= last; j++) {

      graph[i + "-" + j].leftN = j - 1 < first ? null : graph[i + "-" + (j - 1)];
      graph[i + "-" + j].rightN = j + 1 > last ? null : graph[i + "-" + (j + 1)];
      graph[i + "-" + j].bottomN = i + 1 > last ? null : graph[(i + 1) + "-" + j];
      graph[i + "-" + j].topN = i - 1 < first ? null : graph[(i - 1) + "-" + j];

    }
  }


}


export function canAddWall(rowN, columnN, wallType) {
  if (wallType === "vborder") {
    let leftCellRow = parseInt(rowN);
    let leftCellColumn = parseInt(columnN);

    if (graph[leftCellRow + "-" + leftCellColumn].rightN === null
      || (graph[leftCellRow + 1 + "-" + leftCellColumn] != null && graph[leftCellRow + 1 + "-" + leftCellColumn].rightN === null)
      || leftCellRow === 9
      || ((graph[leftCellRow + 1 + "-" + leftCellColumn] != null && graph[leftCellRow + 1 + "-" + leftCellColumn].topN === null)
        && (graph[(leftCellRow + 1) + "-" + (leftCellColumn + 1)] != null && graph[(leftCellRow + 1) + "-" + (leftCellColumn + 1)].topN === null)
        && !dots[leftCellRow - 1][leftCellColumn - 1])
      || !canReachAtLeastOne(graph, players[0].row + "-" + players[0].column, players[0].finishCellRow, leftCellRow, leftCellColumn, wallType)
      || !canReachAtLeastOne(graph, players[1].row + "-" + players[1].column, players[1].finishCellRow, leftCellRow, leftCellColumn, wallType)
      || currentPlayer.wallsAmount < 1

    ) {
      return false
    } else return true
  }

  if (wallType === "hborder") {
    let BottomCellRow = parseInt(rowN);
    let BottomCellColumn = parseInt(columnN);


    if (graph[BottomCellRow + "-" + BottomCellColumn].topN === null
      || (graph[BottomCellRow + "-" + (BottomCellColumn + 1)] != null && graph[BottomCellRow + "-" + (BottomCellColumn + 1)].topN === null)
      || BottomCellColumn === 9
      || ((graph[BottomCellRow + "-" + (BottomCellColumn + 1)] != null && graph[BottomCellRow + "-" + (BottomCellColumn + 1)].leftN === null)
        && (graph[(BottomCellRow - 1) + "-" + (BottomCellColumn + 1)] != null && graph[(BottomCellRow - 1) + "-" + (BottomCellColumn + 1)].leftN === null)
        && !dots[BottomCellRow - 2][BottomCellColumn - 1])
      || !canReachAtLeastOne(graph, players[0].row + "-" + players[0].column, players[0].finishCellRow, BottomCellRow, BottomCellColumn, wallType)
      || !canReachAtLeastOne(graph, players[1].row + "-" + players[1].column, players[1].column, BottomCellRow, BottomCellColumn, wallType)
      || currentPlayer.wallsAmount < 1
    ) {
      return false
    } else return true
  }

}

export function addWallToGraph(rowN, columnN, wallType) {
  graph = addWall(graph, dots, rowN, columnN, wallType)
  currentPlayer.wallsAmount = currentPlayer.wallsAmount - 1
  currentPlayer.changePos = 0
  newWall.rowN = rowN
  newWall.columnN = columnN
  newWall.wallType = wallType
  if (currentPlayer === players[0]) {
    newWall.player = 0
  } else {
    newWall.player = 1
  }

  changeCurrentPlayer()

}

// вертикально лівий сусід
// горизонтальний нижній сусід
function addWall(graph, dots, rowN, columnN, wallType) {

  if (wallType === "vborder") {
    let leftCellRow = rowN;
    let leftCellColumn = columnN;

    graph[leftCellRow + "-" + leftCellColumn].rightN = null
    graph[leftCellRow + "-" + (leftCellColumn + 1)].leftN = null

    dots[leftCellRow - 1][leftCellColumn - 1] = 0

    if (graph[(leftCellRow + 1) + "-" + leftCellColumn] != null) {
      graph[(leftCellRow + 1) + "-" + leftCellColumn].rightN = null
      graph[(leftCellRow + 1) + "-" + (leftCellColumn + 1)].leftN = null
    }
  } else if (wallType === "hborder") {
    let BottomCellRow = rowN;
    let BottomCellColumn = columnN;

    graph[BottomCellRow + "-" + BottomCellColumn].topN = null
    graph[(BottomCellRow - 1) + "-" + BottomCellColumn].bottomN = null
    dots[BottomCellRow - 2][BottomCellColumn - 1] = 0

    if (graph[BottomCellRow + "-" + (BottomCellColumn + 1)] != null) {
      graph[BottomCellRow + "-" + (BottomCellColumn + 1)].topN = null
      graph[(BottomCellRow - 1) + "-" + (BottomCellColumn + 1)].bottomN = null
    }
  }
  return graph;

}

function deleteWall(rowN, columnN, wallType) {

  if (wallType === "vborder") {
    graph[rowN + "-" + (columnN + 1)].leftN = columnN < 1 ? null : graph[rowN + "-" + (columnN)];
    graph[rowN + "-" + columnN].rightN = columnN + 1 > 9 ? null : graph[rowN + "-" + (columnN + 1)];
    if (graph[rowN + 1 + "-" + columnN] != null) {
      graph[rowN + 1 + "-" + (columnN + 1)].leftN = columnN < 1 ? null : graph[rowN + 1 + "-" + (columnN)];
      graph[rowN + 1 + "-" + columnN].rightN = columnN + 1 > 9 ? null : graph[rowN + 1 + "-" + (columnN + 1)];
    }
  }
  if (wallType === "hborder") {
    //if(rowN - 1 < 9){}
    graph[rowN + "-" + columnN].topN = rowN - 1 < 1 ? null : graph[(rowN - 1) + "-" + columnN];
    graph[(rowN - 1) + "-" + columnN].bottomN = rowN > 9 ? null : graph[(rowN) + "-" + columnN];

    if (rowN + "-" + (columnN + 1) != null) {
      graph[rowN + "-" + (columnN + 1)].topN = rowN - 1 < 1 ? null : graph[(rowN - 1) + "-" + (columnN + 1)];
      graph[rowN - 1 + "-" + (columnN + 1)].bottomN = rowN > 9 ? null : graph[(rowN) + "-" + (columnN + 1)];

    }
  }

}

function canReachAtLeastOne(graph, startID, appointedRow, rowN, column, wallType) {

  let first = 1
  let last = 9
  for (let j = first; j <= last; j++) {
    if (canReach(addWall(graph, JSON.parse(JSON.stringify(dots)), rowN, column, wallType), graph[startID], graph[appointedRow + "-" + j])) {
      deleteWall(rowN, column, wallType)
      return true;
    }
  }
  deleteWall(rowN, column, wallType)
  return false;
}

function canReach(graph, startCell, finishCell) {

  let queue = []
  queue.push(startCell)
  startCell.visited = true
  while (queue.length > 0) {
    let currentCell = queue.shift()
    let neighbors = [currentCell.leftN, currentCell.rightN, currentCell.topN, currentCell.bottomN]
    for (let neighborCell of neighbors) {
      if (neighborCell != null) {
        if (!neighborCell.visited) {
          queue.push(neighborCell)
          neighborCell.visited = true
          try {
            if (neighborCell === finishCell) {
              Object.keys(graph).forEach(key => graph[key].visited = false)
              return true
            }
          } catch (e) {
          }
        }
      }
    }
  }

  Object.keys(graph).forEach(key => graph[key].visited = false)
  return false
}


export function sum(a, b) {/*тестова штука*/
  return a + b;
}

export default graph

/*
function graphInit1() {

  let first = 1;
  let last = 17;

  for (let j = first; j <= last; j++) {
    for (let i = first; i <= last; i++) {
      if (i === first && j === first) {
        graph.set(i + "-" + j, [(i + 1) + "-" + j, i + "-" + (j + 1)]);
      } else if (i === first && j === last) {
        graph.set(i + "-" + j, [(i + 1) + "-" + j, i + "-" + (j - 1)]);
      } else if (i === last && j === first) {
        graph.set(i + "-" + j, [(i - 1) + "-" + j, i + "-" + (j + 1)]);
      } else if (i === last && j === last) {
        graph.set(i + "-" + j, [(i - 1) + "-" + j, i + "-" + (j - 1)]);
      } else if ((i < last || i > first) && j === first) {
        graph.set(i + "-" + j, [(i + 1) + "-" + j, i + "-" + (j + 1), (i - 1) + "-" + j]);
      } else if ((i < last || i > first) && j === last) {
        graph.set(i + "-" + j, [(i + 1) + "-" + j, i + "-" + (j - 1), (i - 1) + "-" + j]);
      } else if ((j < last || j > first) && i === first) {
        graph.set(i + "-" + j, [i + "-" + (j + 1), (i + 1) + "-" + j, i + "-" + (j - 1)]);
      } else if ((j < last || j > first) && i === last) {
        graph.set(i + "-" + j, [i + "-" + (j + 1), (i - 1) + "-" + j, i + "-" + (j - 1)]);
      } else {
        //середина
        graph.set(i + "-" + j, [(i + 1) + "-" + j, i + "-" + (j + 1), (i - 1) + "-" + j, i + "-" + (j - 1)]);
      }
      //graph.add("cell"+i+"_"+j:["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j+1), "cell"+(i-1)+"_"+j, "cell"+i+"_"+(j-1)])


    }
  }


}

function bfs1(adj, s, t) {
  // adj - смежный список
  // s - начальная вершина
  // t - пункт назначения

  // инициализируем очередь
  let queue = []
  // добавляем s в очередь
  queue.push(s)
  // помечаем s как посещенную вершину во избежание повторного добавления в очередь
  s.visited = true
  while (queue.length > 0) {
    // удаляем первый (верхний) элемент из очереди
    let v = queue.shift()
    // abj[v] - соседи v
    for (let neighbor of adj[v]) {
      // если сосед не посещался
      if (neighbor != null && !neighbor.visited) {
        // добавляем его в очередь
        queue.push(neighbor)
        // помечаем вершину как посещенную
        neighbor.visited = true
        // если сосед является пунктом назначения, мы победили
        if (neighbor === t) return true
      }
    }
  }
  // если t не обнаружено, значит пункта назначения достичь невозможно
  return false
}
*/
/*if(i===first && j===first){
        graph.set("cell"+i+"_"+j, ["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j+1)]);
      }else if(i===first && j===last){
        graph.set("cell"+i+"_"+j, ["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j-1)]);
      }else if(i===last && j===first){
        graph.set("cell"+i+"_"+j, ["cell"+(i-1)+"_"+j, "cell"+i+"_"+(j+1)]);
      }else if(i===last && j===last){
        graph.set("cell"+i+"_"+j, ["cell"+(i-1)+"_"+j, "cell"+i+"_"+(j-1)]);
      }else if((i<last || i>first) && j===first){
        graph.set("cell"+i+"_"+j, ["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j+1), "cell"+(i-1)+"_"+j]);
      }else if((i<last || i>first) && j===last){
        graph.set("cell"+i+"_"+j, ["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j-1), "cell"+(i-1)+"_"+j]);
      }else if((j<last || j>first) && i===first){
        graph.set("cell"+i+"_"+j, ["cell"+i+"_"+(j+1), "cell"+(i+1)+"_"+j, "cell"+i+"_"+(j-1)]);
      }else if((j<last || j>first) && i===last){
        graph.set("cell"+i+"_"+j, ["cell"+i+"_"+(j+1), "cell"+(i-1)+"_"+j, "cell"+i+"_"+(j-1)]);
      }else{
        //середина
        graph.set("cell"+i+"_"+j, ["cell"+(i+1)+"_"+j, "cell"+i+"_"+(j+1), "cell"+(i-1)+"_"+j, "cell"+i+"_"+(j-1)]);
      }*/

/*const graph = {
  cell1_1: ['cell1_2', 'cell2_1'],
  b: ['c'],
  c: ['d'],
  d: ['b', 'c']
}*/
