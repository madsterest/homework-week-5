var hours = document.querySelectorAll(".hour");
var dayDisplay = document.getElementById("current-day");
var body = document.querySelector(".container");
var activities = [];

function init() {
  time();
  display();
  addItems();
}

function time() {
  var currentTime = moment().format("dddd, MMMM Do");
  console.log(currentTime);
  dayDisplay.innerHTML = currentTime;
  var savedTime = JSON.parse(localStorage.getItem("day"));
  console.log(savedTime);
  if (savedTime !== currentTime) {
    activities = [];
    localStorage.removeItem("activities");
  }
  localStorage.setItem("day", JSON.stringify(currentTime));
}
function display() {
  var currentTimeLarge = moment().format("HH");
  var textArea = document.querySelectorAll("textarea");

  for (var i = 0; i < hours.length; i++) {
    var textBox = textArea[i];
    var hoursText = hours[i].getAttribute("data-time");
    if (hoursText < currentTimeLarge) {
      textBox.classList.remove("present", "future");
      textBox.classList.add("past");
    } else if (hoursText === currentTimeLarge) {
      textBox.classList.remove("past", "future");
      textBox.classList.add("present");
    } else if (hoursText > currentTimeLarge) {
      textBox.classList.remove("past", "present");
      textBox.classList.add("future");
    }
  }
}
body.addEventListener("click", function (event) {
  var target = event.target;
  if (target.nodeName === "BUTTON") {
    var buttonID = target.id;
    var textID = "text-" + buttonID;
    var text = document.getElementById(textID).value;
    if (text === "") {
      return;
    } else {
      var currentActivity = {
        idNo: textID,
        content: text,
      };
      var items = JSON.parse(localStorage.getItem("schedule"));
      if (items === null) {
        activities.push(currentActivity);
        localStorage.setItem("schedule", JSON.stringify(activities));
      } else if (items !== null) {
        items.push(currentActivity);
        localStorage.setItem("schedule", JSON.stringify(items));
      }
    }
  }
});

function addItems() {
  var items = JSON.parse(localStorage.getItem("schedule"));
  if (items !== null) {
    for (var i = 0; i < items.length; i++) {
      var itemId = items[i].idNo;
      var itemContent = items[i].content;
      document.getElementById(itemId).value = itemContent;
    }
  }
}
init();
