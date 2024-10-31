const authorFirstNameEntryBox = document.getElementById(
  "author-first-name-entry-box"
);
const authorLastNameEntryBox = document.getElementById(
  "author-last-name-entry-box"
);
const bookTitleEntryBox = document.getElementById("book-title-entry-box");
const editionEntryBox = document.getElementById("edition-entry-box");
const publisherEntryBox = document.getElementById("publisher-entry-box");
const publicationYearEntryBox = document.getElementById(
  "publication-year-entry-box"
);
const publicationPlaceEntryBox = document.getElementById(
  "publication-place-entry-box"
);
const citationTypeSelectionBox = document.getElementById(
  "citation-type-selection-box"
);
const generateButton = document.getElementById("generate-button");

citationTypeSelectionBox.addEventListener("change", toggleEntryBoxVisibility);
generateButton.addEventListener("click", outputCitation);

function toggleEntryBoxVisibility() {
  const selectedValue = citationTypeSelectionBox.value;
  if (
    selectedValue === "MLA" ||
    selectedValue === "APA" ||
    selectedValue === "ChicagoNotes" ||
    selectedValue === "ChicagoAuthor"
  ) {
    authorFirstNameEntryBox.style.display = "block";
    authorLastNameEntryBox.style.display = "block";
    bookTitleEntryBox.style.display = "block";
    editionEntryBox.style.display = "none";
    publisherEntryBox.style.display = "block";
    publicationYearEntryBox.style.display = "block";
    if (selectedValue === "ChicagoNotes" || selectedValue === "ChicagoAuthor") {
      publicationPlaceEntryBox.style.display = "block";
    } else {
      publicationPlaceEntryBox.style.display = "none";
    }
  } else {
    authorFirstNameEntryBox.style.display = "block";
    authorLastNameEntryBox.style.display = "block";
    bookTitleEntryBox.style.display = "block";
    editionEntryBox.style.display = "block";
    publisherEntryBox.style.display = "block";
    publicationYearEntryBox.style.display = "block";
    publicationPlaceEntryBox.style.display = "block";
  }
}

function findInitials(initialType) {
  return initialType === "first"
    ? `${authorFirstNameEntryBox.value[0]}.`
    : `${authorFirstNameEntryBox.value[0]}.${authorLastNameEntryBox.value[0]}.`;
}

function checkForm() {
  const selectedValue = citationTypeSelectionBox.value;
  if (
    (selectedValue === "MLA" ||
      selectedValue === "APA" ||
      selectedValue === "ChicagoNotes" ||
      selectedValue === "ChicagoAuthor") &&
    authorFirstNameEntryBox.value.length > 0 &&
    authorLastNameEntryBox.value.length > 0 &&
    bookTitleEntryBox.value.length > 0 &&
    publisherEntryBox.value.length > 0 &&
    /^\d{4}$/.test(publicationYearEntryBox.value)
  ) {
    if (
      (selectedValue === "ChicagoNotes" || selectedValue === "ChicagoAuthor") &&
      publicationPlaceEntryBox.value.length == 0
    ) {
      return false;
    } else {
      return true;
    }
  } else if (
    authorFirstNameEntryBox.value.length > 0 &&
    authorLastNameEntryBox.value.length > 0 &&
    bookTitleEntryBox.value.length > 0 &&
    publisherEntryBox.value.length > 0 &&
    /^\d{4}$/.test(publicationYearEntryBox.value) &&
    publicationPlaceEntryBox.value.length > 0
  ) {
    return true;
  } else {
    return false;
  }
}

function outputCitation() {
  const valid = checkForm();
  const selectedValue = citationTypeSelectionBox.value;

  if (valid === false) {
    alert("Invalid/Missing Inputs");
  } else {
    if (selectedValue === "MLA") {
      alert(
        authorLastNameEntryBox.value +
          ", " +
          authorFirstNameEntryBox.value +
          ". " +
          bookTitleEntryBox.value +
          ". " +
          publisherEntryBox.value +
          ", " +
          publicationYearEntryBox.value
      );
    } else if (selectedValue === "APA") {
      alert(
        authorLastNameEntryBox.value +
          ", " +
          authorFirstNameEntryBox.value[0] +
          ". (" +
          publicationYearEntryBox.value +
          "). " +
          bookTitleEntryBox.value +
          ". " +
          publisherEntryBox.value +
          "."
      );
    } else if (selectedValue === "ChicagoNotes") {
      alert(
        authorFirstNameEntryBox.value +
          " " +
          authorLastNameEntryBox.value +
          ". " +
          bookTitleEntryBox.value +
          ". " +
          publicationPlaceEntryBox.value +
          ": " +
          publisherEntryBox.value +
          ", " +
          publicationYearEntryBox.value +
          "."
      );
    } else if (selectedValue === "ChicagoAuthor") {
      alert(
        authorLastNameEntryBox.value +
          ", " +
          authorFirstNameEntryBox.value +
          ". " +
          publicationYearEntryBox.value +
          ". " +
          bookTitleEntryBox.value +
          ". " +
          publicationPlaceEntryBox.value +
          ": " +
          publisherEntryBox.value +
          "."
      );
    } else if (selectedValue === "Harvard") {
      if (editionEntryBox.value.length > 0) {
        alert(
          authorLastNameEntryBox.value +
            ", " +
            authorFirstNameEntryBox.value[0] +
            ". (" +
            publicationYearEntryBox.value +
            ") " +
            bookTitleEntryBox.value +
            ". " +
            editionEntryBox.value +
            ". " +
            publicationPlaceEntryBox.value +
            ": " +
            publisherEntryBox.value +
            "."
        );
      } else {
        alert(
          authorLastNameEntryBox.value +
            ", " +
            authorFirstNameEntryBox.value[0] +
            ". (" +
            publicationYearEntryBox.value +
            ") " +
            bookTitleEntryBox.value +
            ". " +
            publicationPlaceEntryBox.value +
            ": " +
            publisherEntryBox.value +
            "."
        );
      }
    } else {
      if (editionEntryBox.value.length > 0) {
        alert(
          authorFirstNameEntryBox.value[0] +
            ". " +
            authorLastNameEntryBox.value +
            ", " +
            bookTitleEntryBox.value +
            ", " +
            editionEntryBox.value +
            ". " +
            publicationPlaceEntryBox.value +
            ": " +
            publisherEntryBox.value +
            ", " +
            publicationYearEntryBox.value +
            "."
        );
      } else {
        alert(
          authorFirstNameEntryBox.value[0] +
            ". " +
            authorLastNameEntryBox.value +
            ", " +
            bookTitleEntryBox.value +
            ", " +
            publicationPlaceEntryBox.value +
            ": " +
            publisherEntryBox.value +
            ", " +
            publicationYearEntryBox.value +
            "."
        );
      }
    }
  }
}

toggleEntryBoxVisibility();
