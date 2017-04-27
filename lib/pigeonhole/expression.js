'use strict';

const leadBoundary = "(?:^|\\s|-)";
const trailBoundary = "(?:$|\\s|-)";

class Expression {

  static compile(value) {

    const words = String(value).split(",").map(w => w.trim());

    const patterns = words.map(word => {

      if(!word.startsWith('*')) {
        word = leadBoundary + word;
      }

      if(!word.endsWith('*')) {
        word = word + trailBoundary;
      }

      return word.replace(/\*/g,"").trim();

    })

    return new RegExp(patterns.join("|"), "i");

  }

}

module.exports = Expression
