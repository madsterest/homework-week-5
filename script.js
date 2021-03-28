var hours = document.querySelectorAll(".hour");

var currentTime = moment().format("h");
var textArea = document.querySelectorAll("textarea");
console.log(textArea);

for (var i = 0; i < hours.length; i++) {
  var hoursText = hours[i].textContent;
  var textBox = textArea[i];
  if (currentTime === hoursText) {
    textBox.classList.remove("future");
    textBox.classList.add("present");
  } else if (currentTime < hoursText) {
    textBox.classList.remove("future");
    textBox.classList.add("past");
  }
}
