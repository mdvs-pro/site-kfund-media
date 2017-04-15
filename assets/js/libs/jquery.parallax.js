var DOM = {
    canvas   : document.getElementById('mouseCanvas')
};

var Settings = {};

function MouseParallax() {}

MouseParallax.prototype.init = function init() {

    console.log('MouseParallax initiated');

    this.cacheDOM();

    this.moveImages();
}

MouseParallax.prototype.cacheDOM = function cacheDOM() {

    var imageElements = document.getElementsByClassName('image');

    var tempData = [];
    for (var i = imageElements.length - 1; i >= 0; i--) {
        tempData.push( imageElements[i] );
    };

    Settings.images = tempData;

}

MouseParallax.prototype.moveImages = function moveImages() {

    var that = this;

    DOM.canvas.addEventListener('mousemove', function(event) {
        var mousePos = that.getMousePos(event);
        
        var parralaxInt = (Settings.images.length + 1) * 5;

        for (var i = Settings.images.length - 1; i >= 0; i--) {

            parralaxInt -= 5;

            that.moveImage(Settings.images[i],  mousePos.x, mousePos.y, parralaxInt);

        };

    }, false);

}

MouseParallax.prototype.getMousePos = function getMousePos(event) {

    var rect = DOM.canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };

}

MouseParallax.prototype.moveImage = function moveImage(image, mouseXPos, mouseYPos, parralaxAmount) {

    // move image relative to the mouse on its center

    var centerX = (mouseXPos - (DOM.canvas.width  / 2)) / parralaxAmount;
    var centerY = (mouseYPos - (DOM.canvas.height / 2)) / parralaxAmount;

    image.style.webkitTransform = 'translate(' + centerX + 'px, ' + centerY + 'px)';

}

var jerry = new MouseParallax();

jerry.init();