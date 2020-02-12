// import { response } from "express";

let hashtag = document.getElementById("hashtag-input");
let hashtagSuggestions;

document
  .querySelectorAll(".existing-hashtag")
  .forEach(hashtag => (hashtag.onclick = upvoteHashtag));

console.log(window.location.href.split("/"));

let url = window.location.href.split("/");
let movieId = url[url.length - 1];

console.log(movieId);

hashtag.onkeyup = searchForHashtag;

function searchForHashtag() {
  let searchTerm = hashtag.value;
  let hashtagBox = document.getElementById("suggestion-hashtags");
  console.log(searchTerm);

  if (searchTerm === "") {
    hashtagBox.innerHTML = "";

    return;
  }

  axios
    .get(`http://localhost:3000/hashtag?hashtag=${hashtag.value}`)
    .then(response => {
      hashtagBox.innerHTML = "";

      if (response.data.length === 0) {
        console.log("no response");
        let hashtagSuggestion = document.createElement("p");
        hashtagSuggestion.innerText = hashtag.value;
        hashtagSuggestion.classList.add("hashtag-suggestion");
        hashtagSuggestion.classList.add("new-hashtag");
        hashtagSuggestion.classList.add("hashtag");
        hashtagBox.appendChild(hashtagSuggestion);
        hashtagSuggestion.onclick = addHashtagToDatabas;
        return;
      }

      response.data.forEach(hashtag => {
        let hashtagSuggestion = document.createElement("p");
        hashtagSuggestion.innerText = hashtag.tag;
        hashtagSuggestion.classList.add("hashtag-suggestion");
        hashtagSuggestion.classList.add("hashtag");
        hashtagBox.appendChild(hashtagSuggestion);
        hashtagSuggestion.onclick = addHashtagToMovie;
      });
    })
    .catch(err => console.log(err));

  //check database for the value

  //show results in a list below the box

  //when clicking on a results, add hashtag to database
}

function addHashtagToMovie(event) {
  // empty the hashtag input, move hashtag to added hashtags
  hashtag.value = "";
  let addedHashtag = document.createElement("p");
  addedHashtag.innerText = event.target.innerText;
  document.getElementById("suggestion-hashtags").removeChild(event.target);
  document.querySelector(".hashtags").appendChild(addedHashtag);
  addedHashtag.classList.add("hashtag");
  addedHashtag.classList.add("existing-hashtag");

  axios
    .patch(`http://localhost:3000/hashtag?hashtag=${addedHashtag.innerText}`, {
      movieId: movieId
    })
    .then(response => {
      console.log(response.data);
      addedHashtag.onclick = upvoteHashtag;
    })
    .catch(err => console.log(err));

  //outsource to another onclick function
  //when hashtag is clicked, check if user is part of the hashtag movie user array, if yes, remove, if not, add
}

function addHashtagToDatabas(event) {
  console.log("adding new Hashtag to Database");
  axios
    .post("http://localhost:3000/hashtag", { newTag: event.target.innerText })
    .then(response => {
      console.log(response.data);

      //add movie to database

      addHashtagToMovie(event);
    })
    .catch();
}

function upvoteHashtag(event) {
  let hashtagValue = event.target.innerText;
  console.log("hashtag-upvoted: ", hashtagValue);

  axios
    .patch(`http://localhost:3000/hashtag?hashtag=${hashtagValue}`, {
      movieId: movieId
    })
    .then(response => {
      console.log("movie voted");
    })
    .catch(err => console.log(err));
}
