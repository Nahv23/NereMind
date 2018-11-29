//SE va a encargar de cargar el juego (tablero, fichas, etc)
 
function Game (){
  
  this.masterMind = new Board(colors);
  this.rows = 0;

}

Game.prototype.startGame () = function (){ // funcion que hará empezar el juego

 this.masterMind.createSecretCode ();

 this.masterMind.availableColors ();

 this.masterMind.creatRows ();


//  if(this.isThePassword){
//   //Felicidades has adivinado la password
//   } else if (rows === 10) {
//   FIN DEL JUEGO,  HAS PERDIDO
//   this.result;
//   } else{
//   pasamos a la fila siguiente
//   this.rows ++;
//   }
}

  

//Check si es la password



//creamos los 6 colores que se pueden seleccionar para jugar
Game.prototype.availableColors = function (){


}


//Crea las filas del tablero en el HTML con atributos para poder seleccionarlas
Game.prototype.creatRows = function (){


}


//Tiempo que se ha tardado


// Dificultad (F=15lineas, M=11 lineas; D= 8 lineas)




