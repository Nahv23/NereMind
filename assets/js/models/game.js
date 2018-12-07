
function Game() {
  this.secret = [];
  this.board = new Board();
  this.selectables = []; 
  this.colorsList = ["red", "blue", "yellow", "purple", "green", "orange"];
  //this.guess = 0;
  this.a = 0;

  // Inicialización de elementos del DOM
  this.secretDOM = document.getElementById('secret');
  this.boardDOM = document.getElementById('board');
  this.optionsDOM = document.getElementById('options');
}

Game.prototype.init = function() {
  this.topSecret(); //Tapa el secreto
  this.createSecret();
  this.createSelectables();
  this.renderSecret();
  this.renderBoard();
  this.renderSelectables(); 

}

Game.prototype.topSecret = function (){
  var hideSecret = document.getElementById("secret")
  hideSecret.setAttribute("class","hide"); 
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

}


Game.prototype.createSelectables = function() {
  this.selectables = this.colorsList.map(function(color) {
    return new Token(color)
  })
}

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
      this.changeColor (this.a, Token.color); //HACE FALTA LLAMAR A LA FUNCION QUE  PINTE, ¡¡¡FUNCIONA!!!
      this.a++;
        console.info('BOARD => ', this.board.table)
      this.checkCoincidence(Token.color);
    }.bind(this))
    this.optionsDOM.appendChild(newDiv)

    
    // if (index === this.selectables.length -1) {
    //   var button = document.createElement ("button");
    //   button.innerText = "OK"
    //   this.newDiv.appendChild(button)
    //  }
    }.bind(this))
}


// Prototipo para crear elementos en el DOM referente a this.board.table
Game.prototype.renderBoard = function() {
  this.board.table.map(function() {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "token table");
    newDiv.setAttribute("tabIndex", 1)
    newDiv.style.backgroundColor = "grey";
    this.boardDOM.appendChild(newDiv)
  }.bind(this))
}

//Cambiar el color de la ficha por el color seleccionado ¡¡¡FUNCIONA!!!
Game.prototype.changeColor = function (num, color){
  var newColor = document.getElementsByClassName("token table")
  newColor[num].style.backgroundColor = color;  
}



Game.prototype.checkCoincidence = function(color) { 
  var boardEnd = this.board.table.indexOf('')
  if(boardEnd % 4 === 0) {
    for(var i = boardEnd - 1; i > boardEnd - 5; i--) {
      if(this.board.table[i].Token.color === this.secret[i]){
       console.log ("si");
    } else {
      console.log ("no");
    }

    // this.checkWin(this.board.table[i])
    }
  } else {
    console.info('NO CONTAMOS', this.board.table[1], "secreto", this.secret[boardEnd])
  }
}

// // Revisar
// Game.prototype.checkWin = function(secret, Token) {
//   console.info('CHECK => ', secret, Token, secret === Token.color)
// }
