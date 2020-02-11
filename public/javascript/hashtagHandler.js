// import { response } from "express";

let hashtag = document.getElementById("hashtags");
let hashtagSuggestions;

hashtag.onkeyup = searchForHashtag;

function searchForHashtag() {
  let searchTerm = hashtag.value;
  let hashtagBox = document.querySelector(".hashtags");
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
        hashtagBox.appendChild(hashtagSuggestion);
        hashtagSuggestion.onclick = addHashtagToDatabas;
        return;
      }

      response.data.forEach(hashtag => {
        let hashtagSuggestion = document.createElement("p");
        hashtagSuggestion.innerText = hashtag.tag;
        hashtagSuggestion.classList.add("hashtag-suggestion");
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
  event.target.classList.toggle("hashtag-clicked");
  console.log("Hashtag set!", event.target);

  if (event.target.classList.contains("hashtag-clicked")) {
    console.log("hashtag-clicked");
    //   axios.patch();
    // if hashtag is clicked, add user id to the property of the movieId
  } else {
    console.log("hashtag-unclicked");
  }
}

function addHashtagToDatabas(event) {
  event.target.classList.toggle("hashtag-clicked");
  console.log("adding new Hashtag to Database");
  axios
    .post("http://localhost:3000/hashtag", { newTag: event.target.innerText })
    .then(response => {
      console.log(response);
      //   addHashtagToMovie(event);
    })
    .catch();
}
