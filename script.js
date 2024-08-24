function showNoAlertText() {
  // Hide image and informational text from non-added text
  document.getElementById('no-content-alert').style.display = "none";
}
showNoAlertText();

function createDecodedText() {
  const heading = document.querySelector('h1');
  heading.innerHTML = 'Encrypted Texts';
  // Get the text of textarea
  const userInput = document.getElementById('user-text').value;
  // Create a new paragraph
  const newParagraph = document.createElement('p');
  // Denifes the text of the new paragraph
  newParagraph.innerHTML = userInput;
  // Add a new paragraph to the section
  document.getElementById('text-section').appendChild(newParagraph);
  // Clear the text of textarea
  document.getElementById('user-text').value = "";
}