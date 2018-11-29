//fichas 
function Board () {

  this.tokensPicked = []

  this.tokensColors = ["red", "blue", "yellow", "grey", "green", "orange"]; //colores disponibles para jugar
  this.secret = []; //array con la combinacion a adivinar

  this.tokensGuesses = ["black", "white"]; // colores para ver si se ha acertado o no el color y posicion
  this.colorGuesses = []; // array donde iré si se ha acertado o no

    
}

// Crea la combinacion que hay que adivinar
Board.prototype.createSecretCode = function (){ 

  for (var i=0; i<4 ; i++){

    this.secret.push(tokensColors[Math.floor(Math.random()*tokensColors.length)]);
  }
}
 

  //cuando se pulse el evento de añadir color (comprobar que no se puedan coger mas de 4 colores)
Board.prototype.addColor = function (){

  this.tokensPicked = this.tokensPicked.push();
}


  //cuando se pulse el evento de borrar los colores seleccionados 
Board.prototype.delete = function () {

  this.tokensPicked = this.tokensPicked.pop(); 
}


//cuando se da al boton de Ok se lanza esta funcion para comprobar si se ha acertado o no
Board.prototype.isThePassword = function (){

    if (this.secret === this.tokensPicked){
      return true;
    }else {
      return false;
    }
}


//Para pintar los colores adivinados
Board.prototype.result = function (){


}