
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
  this.renderSecret();//Tendré que ponerlo en otro sitio cuando se muestre la clave
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
    newDiv.setAttribute("class", "token tokenSecret hide");
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
  this.selectables.map(function(token){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", token.color);
    newDiv.setAttribute("class", "token tokenSelectable");
    newDiv.setAttribute("tabIndex", 1)
    newDiv.style.backgroundColor = token.color;
    newDiv.addEventListener("click", function (event){
      this.board.nextTile(token)
      this.changeColorDOM (this.a, token.color);
      this.a++;
      console.info('BOARD => ', this.board.table)
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
Game.prototype.changeColorDOM = function (num, color){
  var newColor = document.getElementsByClassName("token table")
  newColor[num].style.backgroundColor = color;  
}



Game.prototype.checkCoincidence = function(color) { 
  var boardEnd = this.board.table.indexOf(''); 
  console.log ("boardEnd ->", boardEnd);
 
  if (boardEnd === -1){ //Superado las 10 filas 
    this.stop (2);

  }else if(boardEnd % 4 === 0) {
    var getRight = 0; //para ver cuantos colores se han acertado
    var j = 3; // para recorrer el array secret
    for(var i = boardEnd - 1; i > boardEnd - 5; i--) {
      if (this.isCorrect(this.board.table[i], this.secret[j])){
        getRight++;
        console.log ("acertadas ->", getRight);
        this.checkWin (getRight);
      }
       console.log ("index de i ->", i, "index de j ->", j);
       j--;
    }
   
  } else {
    console.info('NO CONTAMOS',)
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


 Game.prototype.stop = function (whatHappen){
  this.renderSecret(); //Para mostrar la contraseña
  switch (whatHappen){
    case 1: alert("Enhorabuena, has adivinado la contraseña");          break;
    case 2: alert ("Has perdido");
            break;
  }
}