document.getElementById("R").addEventListener("mouseover", function () {
  document.getElementById("K").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("I").addEventListener("mouseover", function () {
  document.getElementById("O").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("S").addEventListener("mouseover", function () {
  document.getElementById("T").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("H").addEventListener("mouseover", function () {
  document.getElementById("I2").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("A").addEventListener("mouseover", function () {
  document.getElementById("A3").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("A2").addEventListener("mouseover", function () {
  document.getElementById("N2").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

document.getElementById("N").addEventListener("mouseover", function () {
  document.getElementById(".").style.opacity = 1;
  document.getElementById("hint").style.opacity = 0;
});

function comingSoon() {
  document.getElementById("about").onclick = null;

  document.getElementById("R").style.opacity = 0;
  document.getElementById("I").style.opacity = 0;
  document.getElementById("S").style.opacity = 0;
  document.getElementById("H").style.opacity = 0;
  document.getElementById("A").style.opacity = 0;
  document.getElementById("A2").style.opacity = 0;
  document.getElementById("N").style.opacity = 0;

  document.getElementById("K").style.opacity = 0;
  document.getElementById("O").style.opacity = 0;
  document.getElementById("T").style.opacity = 0;
  document.getElementById("I2").style.opacity = 0;
  document.getElementById("A3").style.opacity = 0;
  document.getElementById("N2").style.opacity = 0;
  document.getElementById(".").style.opacity = 0;

  setTimeout(() => {
    document.getElementById("R").innerHTML = "C";
    document.getElementById("I").innerHTML = "O";
    document.getElementById("S").innerHTML = "M";
    document.getElementById("H").innerHTML = "I";
    document.getElementById("A").innerHTML = "N";
    document.getElementById("A2").innerHTML = "G";
    document.getElementById("N").innerHTML = "";

    document.getElementById("K").innerHTML = "S";
    document.getElementById("T").innerHTML = "O";
    document.getElementById("I2").innerHTML = "N";
    document.getElementById("A3").innerHTML = ".";
    document.getElementById("N2").innerHTML = ".";
  }, 300);

  setTimeout(() => {
    document.getElementById("R").style.opacity = 1;
    document.getElementById("I").style.opacity = 1;
    document.getElementById("S").style.opacity = 1;
    document.getElementById("H").style.opacity = 1;
    document.getElementById("A").style.opacity = 1;
    document.getElementById("A2").style.opacity = 1;
    document.getElementById("N").style.opacity = 1;

    document.getElementById("K").style.opacity = 1;
    document.getElementById("O").style.opacity = 1;
    document.getElementById("T").style.opacity = 1;
    document.getElementById("I2").style.opacity = 1;
    document.getElementById("A3").style.opacity = 1;
    document.getElementById("N2").style.opacity = 1;
    document.getElementById(".").style.opacity = 1;
    document.getElementById("hint").style.opacity = 0;
  }, 500);

  setTimeout(() => {
    document.getElementById("R").style.opacity = 0;
    document.getElementById("I").style.opacity = 0;
    document.getElementById("S").style.opacity = 0;
    document.getElementById("H").style.opacity = 0;
    document.getElementById("A").style.opacity = 0;
    document.getElementById("A2").style.opacity = 0;
    document.getElementById("N").style.opacity = 0;

    document.getElementById("K").style.opacity = 0;
    document.getElementById("O").style.opacity = 0;
    document.getElementById("T").style.opacity = 0;
    document.getElementById("I2").style.opacity = 0;
    document.getElementById("A3").style.opacity = 0;
    document.getElementById("N2").style.opacity = 0;
    document.getElementById(".").style.opacity = 0;

    setTimeout(() => {
      document.getElementById("R").innerHTML = "R";
      document.getElementById("I").innerHTML = "I";
      document.getElementById("S").innerHTML = "S";
      document.getElementById("H").innerHTML = "H";
      document.getElementById("A").innerHTML = "A";
      document.getElementById("A2").innerHTML = "A";
      document.getElementById("N").innerHTML = "N";

      document.getElementById("K").innerHTML = "K";
      document.getElementById("T").innerHTML = "T";
      document.getElementById("I2").innerHTML = "I";
      document.getElementById("A3").innerHTML = "A";
      document.getElementById("N2").innerHTML = "N";
    }, 300);

    setTimeout(() => {
      document.getElementById("R").style.opacity = 1;
      document.getElementById("I").style.opacity = 1;
      document.getElementById("S").style.opacity = 1;
      document.getElementById("H").style.opacity = 1;
      document.getElementById("A").style.opacity = 1;
      document.getElementById("A2").style.opacity = 1;
      document.getElementById("N").style.opacity = 1;

      document.getElementById("K").style.opacity = 1;
      document.getElementById("O").style.opacity = 1;
      document.getElementById("T").style.opacity = 1;
      document.getElementById("I2").style.opacity = 1;
      document.getElementById("A3").style.opacity = 1;
      document.getElementById("N2").style.opacity = 1;
      document.getElementById(".").style.opacity = 1;
    }, 500);

    document.getElementById("about").onclick = comingSoon;
  }, 1500);
}
