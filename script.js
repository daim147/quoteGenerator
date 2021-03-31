const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const author = document.getElementById("author");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// GEt API
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const random = data[Math.floor(Math.random() * data.length)];
    // IF Author is blank
    if (!random.author) {
      author.innerText = "Unknown";
    } else {
      author.innerText = random.author;
    }
    // Reduce Font size
    if (random.text.length > 100) {
      quoteText.classList.add("long-qoute");
    } else {
      quoteText.classList.remove("long-qoute");
    }
    quoteText.innerText = random.text;
    complete();
  } catch (error) {}
}
twitterBtn.addEventListener("click", tweetQuote);
newQuote.addEventListener("click", getQuote);

function tweetQuote() {
  const quote = quoteText.innerText;
  const authors = author.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authors}`;

  window.open(twitterUrl, "_blank");
}
getQuote();
