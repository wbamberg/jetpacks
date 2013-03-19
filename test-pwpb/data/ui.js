
wireUpEvent("open-private-window");
wireUpEvent("open-panel");
wireUpEvent("log-tabs");
wireUpEvent("log-windows");
wireUpEvent("log-selection-delayed");

function wireUpEvent(eventName) {
  var el = document.getElementById(eventName);
  el.addEventListener("click", function() {
    self.port.emit(eventName)
  }, false);

}