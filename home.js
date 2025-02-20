document.querySelectorAll(".mainTitle").forEach((element, index) => {
  element.addEventListener("mouseover", function () {
    const hiddenElement = document.querySelectorAll(".hidden")[index];
    if (hiddenElement) {
      hiddenElement.style.opacity = 1;
      document.getElementById("hint").style.opacity = 0;
    }
  });
});
