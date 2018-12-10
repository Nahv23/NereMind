
function Board() {
  this.table = new Array(40).fill('')
}

Board.prototype.nextTile = function(Token) {
  for(var i = -1; ++i < this.table.length;) {
    if(!this.table[i]) {
      this.table[i] = Token
      return
    }
  }
}