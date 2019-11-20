/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

var waypoint = new Waypoint({
  element: document.getElementById('article'),
  handler: function(direction) {
    console.log('Scrolled to article!')
  }
})