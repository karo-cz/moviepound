let hashtag = document.getElementById("hashtags");

hashtag.onkeyup = searchForHashtag;

function searchForHashtag() {
  let searchTerm = hashtag.value;
  console.log(searchTerm);
  axios
    .get(`http://localhost:3000/hashtag/search?hashtag=${hashtag.value}`)
    .then()
    .catch();

  //check database for the value

  //show results in a list below the box

  //when clicking on a results, add hashtag to database
}
