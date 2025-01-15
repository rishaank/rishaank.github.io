const conceptDropDown = document.getElementById("conceptSelect");
const startButton = document.getElementById("startButton");

conceptDropDown.addEventListener("change", saveData);
startButton.addEventListener("click", checkStart);

function saveData() {
  localStorage.setItem("concept", conceptDropDown.value);
}

function checkStart() {
  if (conceptDropDown.value === null || conceptDropDown.value === "") {
    alert("Choose a concept to practice from the dropdown.");
  } else {
    window.location.href = "../game/index.html";
  }
}
