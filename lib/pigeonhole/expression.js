'use strict';

class Expression {

  constructor(value) {
    this.value = value;
  }

  compile() {

    let string = this.value;

    if(!string.startsWith('*')) {
      string = "\\b" + string;
    }

    if(!string.endsWith('*')) {
      string = string + "\\b";
    }

    string = string.replace('*','');

    return new RegExp(string, "i");

  }

}

module.exports = Expression
