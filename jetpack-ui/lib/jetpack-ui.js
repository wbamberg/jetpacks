var { emit } = require("sdk/event/core");
var { EventTarget } = require("sdk/event/target");
var { Class } = require("sdk/core/heritage");
var { merge } = require("sdk/util/object");
var data = require("self").data;

require("sdk/addon-page");

function createUI(target) {
  require("tabs").open({
    url: data.url("index.html"),
    onReady: function(tab) {
      worker = tab.attach({
        contentScriptFile: data.url("ui.js"),
        contentScriptWhen: "end"
      });
      initializeWorker(target, worker);
    }
  });
}

function initializeWorker(target, worker) {
  worker.on("message", function(events) {
    initializeEvents(target, worker, events);
  });
}

function initializeEvents(target, worker, events) {
  events.forEach(function addEvent(event) {
    worker.port.on(event, function() {
      emit(target, event);
    });
  });
}

var JetpackUI = Class({
  extends: EventTarget,
  initialize: function initialize(options) {
    EventTarget.prototype.initialize.call(this, options);
    merge(this, options);
    createUI(this);
  }
});
 
exports.JetpackUI = JetpackUI;