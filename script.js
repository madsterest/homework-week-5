var hours = document.querySelectorAll(".hour");
var dayDisplay = document.getElementById("current-day");
var body = document.querySelector(".container");
var activities = [];

function init() {
  time();
  display();
  addItems();
}
//Gets the current time from moment() and displays it in the header. Gets the saved time from local storage and checks if a day has passed. If it is a new day, the activites array is reset and the local storage cleared. The new day is then saved.
function time() {
  var currentTime = moment().format("dddd, MMMM Do");
  dayDisplay.innerHTML = currentTime;
  var savedTime = JSON.parse(localStorage.getItem("day"));
  if (savedTime !== currentTime) {
    activities = [];
    localStorage.removeItem("schedule");
    localStorage.setItem("day", JSON.stringify(currentTime));
  }
}
//Gets the current hour (in 24 hour time). All of the textarea elements are selected and stored in the array textArea. Each hour column in the html document is given a data-time that stores the time in 24 hour time. The array is looped through comparing the current and data-time to set the right display to the text area (sets its attribute to present, past or future)
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
//Event listener added to the body. The target is and checked whether it is a button element. The button id is retrieved and used to form the id for the corresponding textarea. If the textarea value is not an empty string, the idNo and text value get saved in the object current activity. The schdule is retireved from local storage and saved as items. If it is null (first entry of the day), the objected is pushed to the empty activities array and saved to local storage. If it is already in use, the new activity is pushed to the itmes array and saved to local storage.
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
//The items array is retireved from local storage. If it is not null(there are items saved), the array is looped through. The idNo and content saved in the local storage object is used to make sure the content is displayed in the right textarea.
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
