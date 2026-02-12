document.addEventListener("DOMContentLoaded", () => {
  const visibleLetters = document.querySelectorAll(
    ".horizontalLayout:not(.hiddenBox) .mainTitle",
  ); // # of Top Row Letters
  const hiddenLetters = document.querySelectorAll(".hidden"); // # of Bottom Row Letters
  const hiddenBox = document.querySelector(".hiddenBox"); // Box for final animation
  const hint = document.getElementById("hint"); // Hint text

  // Check if page elements present
  if (!hiddenBox || visibleLetters.length === 0 || hiddenLetters.length === 0) {
    return;
  }

  const revealedIndices = new Set(); // Set of indexes to revealed Bottom Row Letters
  const totalLetters = Math.min(visibleLetters.length, hiddenLetters.length); // Minimum safe pairs of Top and Bottom Row Letters
  let didRevealBox = false;

  visibleLetters.forEach((letter, index) => {
    // Stop if all possible letter pairs revealed
    if (index >= totalLetters) {
      return;
    }

    letter.addEventListener("mouseover", () => {
      const hiddenLetter = hiddenLetters[index];
      if (!hiddenLetter) {
        return;
      }

      hiddenBox.style.opacity = "1";
      hiddenLetter.style.opacity = "1";

      if (hint) {
        hint.style.opacity = "0";
      }

      revealedIndices.add(index);

      if (!didRevealBox && revealedIndices.size === totalLetters) {
        didRevealBox = true;
        window.setTimeout(() => {
          hiddenBox.classList.add("boxReveal");
        }, 120);
      }
    });
  });
});
