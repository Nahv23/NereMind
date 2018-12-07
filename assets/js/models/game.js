
function Game() {
  this.secret = []
  this.board = new Board()
  this.selectables = []
  this.colorsList = ["red", "blue", "yellow", "pink", "green", "orange"];
  //this.guess = 0;
  // Inicialización de elementos del DOM
  this.secretDOM = document.getElementById('secret')
  this.boardDOM = document.getElementById('board')
  this.optionsDOM = document.getElementById('options')
}

Game.prototype.init = function() {
  this.createSecret()
  this.createSelectables()
  this.checkCoincidence()
  this.renderSecret();
  this.renderBoard();
  this.renderSelectables(); 
}

Game.prototype.createSecret = function() { //¡¡¡¡¡FUNCIONA!!!!!
  for (var i=0; i<4 ; i++){
    this.secret.push(this.colorsList[Math.floor(Math.random()*this.colorsList.length)]);
  }
}

// Prototipo para crear elementos en el DOM referente a this.secret

Game.prototype.renderSecret = function (){
  this.secret.map(function(color, index){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", index);
    newDiv.setAttribute("class", "token tokenSecret");
    newDiv.setAttribute("tabIndex", 1)
    newDiv.style.backgroundColor = color;
    this.secretDOM.appendChild(newDiv)
  }.bind(this))


  // this.tokensColors.appendChild (newDiv)
  // if (index === arr.length -1) {
  //   var button = document.createElement ("button");
  //   button.innerText = "OK"
  //   this.tokensColors.appendChild(button)
  //   }
  // })
}

// ================

// Prototipo para crear elementos en el DOM referente a this.selectables
Game.prototype.renderSelectables = function (){
  this.selectables.map(function(Token){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", Token.color);
    newDiv.setAttribute("class", "token tokenSelectable");
    newDiv.setAttribute("tabIndex", 1)
    newDiv.style.backgroundColor = Token.color;
    newDiv.addEventListener("click", function (event){
      this.board.nextTile(Token)
      console.info('BOARD => ', this.board.table)
    }.bind(this))
    this.optionsDOM.appendChild(newDiv)
}.bind(this))

}

// ================

// Prototipo para crear elementos en el DOM referente a this.board.table

Game.prototype.renderBoard = function() {
  this.board.table.map(function(Token) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "token table");
    newDiv.setAttribute("tabIndex", 1)
    // if(board.table === ""){ ///NO DIBUJA
    //   newDiv.style.backgroundColor = Token.color;
    //   console.log(color)
    // } else{
      newDiv.style.backgroundColor = "grey";
      console.log(Token.color)

    
    
    this.boardDOM.appendChild(newDiv)
  }.bind(this))
}

// ===============

Game.prototype.createSelectables = function() {
  this.selectables = this.colorsList.map(function(color) {
    return new Token(color)
  })
}

Game.prototype.checkCoincidence = function() {
  var boardEnd = this.board.table.indexOf('')
  if(boardEnd % 4 === 0) {
    for(var i = boardEnd - 1; i > boardEnd - 5; i--) {
      // Revisar cómo hacemos el for
      // this.checkWin(this.board.table[i])
    }
  } else {
    console.info('NO CONTAMOS')
  }
}

// // Revisar
// Game.prototype.checkWin = function(secret, Token) {
//   console.info('CHECK => ', secret, Token, secret === Token.color)
// }
