
function Game() {
  this.secret = [];
  this.board = new Board();
  this.result = new Board ();
  this.selectables = []; 
  this.colorsList = ["red", "blue", "yellow", "purple", "green", "brown"];
  //this.guess = 0;
  this.nextItem = 0;

  // Inicialización de elementos del DOM
  this.secretDOM = document.getElementById('secret');
  this.boardDOM = document.getElementById('table');
  this.resultDOM = document.getElementById('result');
  this.optionsDOM = document.getElementById('options');
}

Game.prototype.init = function() {
  this.createSecret();
  this.createSelectables();
  this.renderSecret();
  this.renderBoard();
  this.renderResult ();
  this.renderSelectables(); 
}

Game.prototype.stop = function (whatHappen){
  switch (whatHappen){
    case 1: 
        this.revealSecret(); //Revela el secreto 
        setTimeout(function(){alert("Enhorabuena, has adivinado la contraseña"); }, 250); 
      break;

    case 2: 
        this.revealSecret(); //Revela el secreto 
        setTimeout(function(){alert ("Has perdido"); }, 250); 
      break;         
  }
}

Game.prototype.revealSecret = function (){
  this.secret.map(function(color, index){
    var newDiv = document.getElementById(index);
    newDiv.removeAttribute("class");
    newDiv.setAttribute("class", "token tokenSecret");
    newDiv.style.backgroundColor = color;
    this.secretDOM.appendChild(newDiv)
  }.bind(this)); 
}

Game.prototype.createSecret = function() { 
  for (var i=0; i<4 ; i++){
    this.secret.push(this.colorsList[Math.floor(Math.random()*this.colorsList.length)]);
  }
  console.log(this.secret);
}

// Prototipo crea elementos en DOM ref a this.secret
Game.prototype.renderSecret = function (){
  this.secret.map(function(color, index){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", index);
    newDiv.setAttribute("class", " tokenSecret image");
    newDiv.setAttribute("tabIndex", 1)
    this.secretDOM.appendChild(newDiv)
  }.bind(this))

}


Game.prototype.createSelectables = function() {
  this.selectables = this.colorsList.map(function(color) {
    return new Token(color)
  })
}

// Prototipo crea elems en DOM ref a this.selectables
Game.prototype.renderSelectables = function (){
  this.selectables.map(function(token){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", token.color);
    newDiv.setAttribute("class", "token tokenSelectable");
    newDiv.setAttribute("tabIndex", 1)
    newDiv.style.backgroundColor = token.color;
    newDiv.addEventListener("click", function (event){
      this.board.nextTile(token)
      this.changeColorDOM (this.nextItem, token.color);
      this.nextItem++;
      this.checkCoincidence(token.color);
    }.bind(this))
    this.optionsDOM.appendChild(newDiv)

    
    // if (index === this.selectables.length -1) {
    //   var button = document.createElement ("button");
    //   button.innerText = "OK"
    //   this.newDiv.appendChild(button)
    //  }
    }.bind(this))
}


// Prototipo crea elems en DOM ref a this.board.table
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
Game.prototype.changeColorDOM = function (num, color){
  var newColor = document.getElementsByClassName("token table")
  newColor[num].style.backgroundColor = color;  
}

// Prototipo crea elems en DOM ref a this.result.table
Game.prototype.renderResult = function() {
  this.result.table.map(function() {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", " token result");
    newDiv.setAttribute("tabIndex", 1);
    newDiv.style.backgroundColor = "grey";
    this.boardDOM.appendChild(newDiv);
  }.bind(this))
}

Game.prototype.giveResultDOM = function (index, numRight){

  var newColor = document.getElementsByClassName("token result");
  
  for ( var drawBlack = numRight; drawBlack > 0; drawBlack--){
   
      newColor[index-1].style.backgroundColor = "black"; 
      index--;
    }
  }

  // var drawBlack = numRight;
  // for ( var i = index - 1; i > index - 5; i--){
  //   if( drawBlack >= numRight){
  //     newColor[i].style.backgroundColor = "black";
  //     drawBlack--;  
  //   }
  // }
//}


Game.prototype.checkCoincidence = function() { 

  var boardEnd = this.board.table.indexOf(''); 
 
  if (boardEnd === -1){ //Superado las 10 filas 
    this.stop (2);

  }else if(boardEnd % 4 === 0) {
    var getRight = 0; //para ver cuantos colores se han acertado
    var j = 3; // para recorrer el array secret
    for(var i = boardEnd - 1; i > boardEnd - 5; i--) {
      if (this.isCorrect(this.board.table[i], this.secret[j])){
        getRight++;
        console.log ("acertadas ->", getRight);
        this.giveResultDOM (boardEnd, getRight);
        this.checkWin (getRight);
      }
       j--;
    }
  }
}

Game.prototype.isCorrect = function (token, secret){
  if(token.color === secret){
    return true;
  } else {
     return false;
  }
}

Game.prototype.checkWin = function(getRight) {
 
  if (getRight === 4){
    this.stop(1);
    } else {
      return false;
    }
  }


