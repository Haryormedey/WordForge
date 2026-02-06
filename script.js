const input = document.getElementById("textInput");

const wordsEl = document.getElementById("words");
const charsEl = document.getElementById("chars");
const charsNoSpaceEl = document.getElementById("charsNoSpace");
const sentencesEl = document.getElementById("sentences");
const paragraphsEl = document.getElementById("paragraphs");
const readingTimeEl = document.getElementById("readingTime");
const avgWordEl = document.getElementById("avgWord");

let debounceTimer;

input.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(analyzeText, 60);
});

function analyzeText() {
  const text = input.value;

  // Characters
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;

  // Words (Unicode-safe)
  const wordsArray = text.match(/\b[\p{L}\p{N}']+\b/gu) || [];
  const words = wordsArray.length;

  // Sentences (realistic)
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 0).length;

  // Paragraphs (Word / Docs logic)
  const paragraphs = text
    .split(/\n{2,}/) // two or more line breaks = new paragraph
    .map(p => p.trim())
    .filter(p => p.length > 0).length;

  // Average word length
  const avgWord = words ? (charsNoSpace / words).toFixed(2) : 0;

  // Reading time (accurate & human)
  const wordsPerMinute = 200;
  const totalSeconds = Math.round((words / wordsPerMinute) * 60);

  let readingTimeText = "0 sec";

  if (totalSeconds > 0) {
    if (totalSeconds < 60) {
      readingTimeText = `${totalSeconds} sec`;
    } else {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      readingTimeText =
        seconds === 0
          ? `${minutes} min`
          : `${minutes} min ${seconds} sec`;
    }
  }

  // Output
  wordsEl.textContent = words;
  charsEl.textContent = chars;
  charsNoSpaceEl.textContent = charsNoSpace;
  sentencesEl.textContent = sentences;
  paragraphsEl.textContent = paragraphs;
  readingTimeEl.textContent = readingTimeText;
  avgWordEl.textContent = avgWord;
}