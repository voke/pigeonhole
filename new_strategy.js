

// Om vi tänker oss att vi bara behöver kolla om SISTA id:et i path
// är en del av någon annan path så löser det ju problemet?
// Förutsatt att alla paths är up-to-date...

Array.prototype.equals = function( array ) {
  return this.length == array.length &&
    this.every( function(this_i,i) { return this_i == array[i] } )
}

let paths = []

paths.push([1,2,3,4])
paths.push([1,2])
paths.push([1,2,3])
paths.push([5,6])
paths.push([50,40,30])
paths.push([50,40,30,20])

let deepest = paths.filter(path => {
  return !paths.some(otherPath => {
    return !otherPath.equals(path) && otherPath.includes(path[path.length - 1])
  });
});

// Return only last ID of path as Integer
let finalIds = deepest.map(path => {
  return path[path.length - 1];
})

console.log(finalIds)
