let currentMovieId;
let currentMovie = {};

// const tmdbKEY = process.env.KARO_KEY;
// console.log(tmdbKEY);

async function getAMovie() {
  if (
    document.querySelector(".btn-add-log") &&
    document.querySelector(".btn-wishlist")
  ) {
    document.querySelector(".btn-add-log").innerHTML =
      '<img src="images/checkbox.png" alt="checkbox-image">';
    document.querySelector(".btn-wishlist").innerHTML =
      '<img src="images/add-to-wishlist.png" alt = "add-wishlist" >';
  }

  let randomMovieId = Math.floor(Math.random() * 672000 + 1);
  console.log(randomMovieId);

  try {
    const axiosCall = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
    );

    console.log(axiosCall);

    const movieTrailer = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomMovieId}/videos?api_key=6cca41f7f8c15f95a4d4a11b0fae6429`
    );

    console.log(movieTrailer);

    if (!movieTrailer.data.results.length) {
      return getAMovie();
    } else {
      loading = false;
    }

    // Display title
    document.querySelector(".movie-title").innerText =
      axiosCall.data.original_title;
    console.log(axiosCall);

    // Display tagline
    document.querySelector(".movie-tagline").innerText = axiosCall.data.tagline;

    //Display release date
    document.querySelector(".release-date").innerText =
      axiosCall.data.release_date;

    // Display trailer
    document
      .querySelector(".trailer")
      .setAttribute(
        "src",
        `https://www.youtube.com/embed/${movieTrailer.data.results[0].key}`
      );

    // Give more details source LOGGED IN

    if (document.querySelector(".see-more")) {
      document
        .querySelector(".see-more")
        .setAttribute("href", `/movies/${axiosCall.data.id}`);
    }

    currentMovieId = randomMovieId;

    //CREATE MOVIE OBJECT
    currentMovie.title = axiosCall.data.original_title;
    currentMovie.imdbId = axiosCall.data.imdb_id;
    currentMovie.releaseDate = axiosCall.data.release_date;
    currentMovie.genre = axiosCall.data.genre;
    currentMovie.image = axiosCall.data.poster_path;
    currentMovie.trailer = movieTrailer.data.results[0].key;
    currentMovie.tmdb_id = randomMovieId;
  } catch (error) {
    if (error) return getAMovie();
  }
}

getAMovie();

// Button NEXT MOVIE

document.querySelector(".btn-next-movie").onclick = getAMovie;

function addMovieLog() {
  console.log("i was clicked");
  axios
    .post("/movielog", {
      currentMovie
    })
    .then(response => {
      document.querySelector(".btn-add-log").innerText = "Added to your log";
    })
    .catch(err => {
      console.log(err);
    });
}

if (document.querySelector(".btn-add-log")) {
  document.querySelector(".btn-add-log").onclick = addMovieLog;
}

function addWishlist() {
  console.log("wishlist clicked");
  axios
    .post("/wishlist", {
      currentMovie
    })
    .then(response => {
      document.querySelector(".btn-wishlist").innerText = "Added for later";
    })
    .catch(err => {
      console.log(err);
    });
}
if (document.querySelector(".btn-wishlist")) {
  document.querySelector(".btn-wishlist").onclick = addWishlist;
}
