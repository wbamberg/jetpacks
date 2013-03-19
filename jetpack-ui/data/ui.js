
function wireUpEvent(element) {
  element.addEventListener("click", function() {
    self.port.emit(element.id)
  }, false);
}

var events = [];
var elements = document.getElementsByClassName("jetpack-ui");

for (var i = 0; i < elements.length; ++i) {
  wireUpEvent(elements[i]);
  events.push(elements[i].id);
}

self.postMessage(events);
