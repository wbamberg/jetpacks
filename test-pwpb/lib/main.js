/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var data = require("self").data;

require("sdk/addon-page");

require("widget").Widget({
  id: "pwpb-tests",
  label: "Tests",
  contentURL: "https://mozilla.org/favicon.ico",
  onClick: openUI
});

function openUI() {
  require("tabs").open({
    url: data.url("index.html"),
    onReady: function(tab) {
      worker = tab.attach({
        contentScriptFile: data.url("ui.js"),
        contentScriptWhen: "end"
      });
      initializeWorker(worker);
    }
  });
}

function initializeWorker(worker) {
  worker.port.on("open-panel", function() {
    openDelayedPanel();
  });

  worker.port.on("log-tabs", function() {
    logTabs();
  });

  worker.port.on("log-windows", function() {
    logWindows();
  });

  worker.port.on("open-private-window", function() {
    openPrivateWindow();
  });

  worker.port.on("log-selection-delayed", function() {
    logSelectionDelayed();
  });
}

/******************/

var wikipanel = require("sdk/panel").Panel({
  width: 180,
  height: 180,
  contentURL: "https://en.wikipedia.org/w/index.php?title=Jetpack&useformat=mobile"
});

function openDelayedPanel() {
  console.log('opening panel in 5 seconds');
  require("timers").setTimeout(function() {
      console.log('opening panel now');
    wikipanel.show();
  }, 5000);
}

function openPrivateWindow() {
  console.log('opening private window - even if we do not support it');
//    require("sdk/window/utils").openDialog({url:"http://example.org", private: true, features: {private: true}});
  require("sdk/window/utils").openDialog({url:"http://example.org", features: {private: true}});
}

function logTabs() {
  console.log('logging all open tabs');
  for each (var tab in require("sdk/tabs"))
    console.log(tab.url);
}

function logWindows() {
  console.log('logging all open windows');
  for each (var window in require("sdk/windows").browserWindows)
    console.log(window.title);
}

function logSelectionDelayed() {
  console.log('logging selection in 5 seconds');
  require("timers").setTimeout(logSelection, 5000);
}

function logSelection() {
  console.log('logging selection now');
  var selection = require("sdk/selection");
  if (!selection.isContiguous) {
    for (var subselection in selection) {
       console.log(subselection.text);
    }
  }
  else {
    console.log(selection.text);
  }
}

