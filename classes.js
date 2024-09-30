const Rectangle = function(width,heigth) {
    this.width = width
    this.heigth = heigth
}
Rectangle.prototype.toString = function () {
    return `width: ${this.width}; heigth: ${this.heigth}`
}
Rectangle.prototype.perimeter = function() {
    return (this.width + this.heigth) * 2
}
Rectangle.prototype.area = function() {
    return this.width * this.heigth
}
function Square(length) {
    Rectangle.call(this,length,length)
}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        configurable: true,
        enumerable:true,
        value: Square,
        writeable: true
    }
})
Square.prototype.toString = function() {
    return `length: ${this.width}`
}
let mySquare = new Square(5)
console.log(mySquare.perimeter())