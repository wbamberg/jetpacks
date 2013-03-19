/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/******************/

function openUI() {
  var jetpackUI = require("./jetpack-ui").JetpackUI();
  jetpackUI.on("log-tabs", logTabs);
  jetpackUI.on("open-panel", openPanel);
}

/******************/

require("widget").Widget({
  id: "show-ui",
  label: "Show the UI",
  contentURL: "https://mozilla.org/favicon.ico",
  onClick: openUI
});

/******************/

var wikipanel = require("sdk/panel").Panel({
  width: 180,
  height: 180,
  contentURL: "https://en.wikipedia.org/w/index.php?title=Jetpack&useformat=mobile"
});

function openPanel() {
  wikipanel.show();
}

function logTabs() {
  console.log('logging all open tabs');
  for each (var tab in require("sdk/tabs"))
    console.log(tab.url);
}

