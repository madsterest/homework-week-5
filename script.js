var hours = document.querySelectorAll(".hour");
var dayDisplay = document.getElementById("current-day");
var body = document.querySelector(".container");

function init() {
  var currentTime = moment().format("dddd, MMMM Do");
  dayDisplay.innerHTML = currentTime;

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
      console.log(text);
    }
  }
});
init();
