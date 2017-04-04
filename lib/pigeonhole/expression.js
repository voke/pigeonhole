'use strict';

class Expression {

  constructor(value) {
    this.value = value;
  }

  compile() {

    let words = String(this.value).split(",");

    let patterns = words.map(word => {

      if(!word.startsWith('*')) {
        word = "\\b" + word;
      }

      if(!word.endsWith('*')) {
        word = word + "\\b";
      }

      return word.replace(/\*/g,"").trim();

    })

    return new RegExp(patterns.join("|"), "i");

  }

}

module.exports = Expression
