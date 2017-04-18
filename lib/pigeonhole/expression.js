'use strict';

class Expression {

  static compile(value) {

    let words = String(value).split(",").map(w => w.trim());

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
