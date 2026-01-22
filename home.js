const indexList = [];
window.setTimeout(() => {
  document.querySelectorAll(".mainTitle").forEach((element, index) => {
    element.addEventListener("mouseover", function () {
      const hiddenElement = document.querySelectorAll(".hidden")[index];
      const hiddenBox = document.querySelector(".hiddenBox");
      if (hiddenElement) {
        hiddenBox.style.opacity = 1;
        hiddenElement.style.opacity = 1;
        document.getElementById("hint").style.opacity = 0;
        if (!indexList.includes(index)) {
          indexList.push(index);
        }
      }
      if (indexList.length == 7) {
        window.setTimeout(() => {
          hiddenBox.classList.add("boxReveal");
      }
    });
  });
}, 200);
