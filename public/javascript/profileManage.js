let movielogArray = document.querySelectorAll(".movielog-card");
let wishlistArray = document.querySelectorAll(".wishlist-card");

document.querySelectorAll(".remove-log-button").forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log("button was clicked");
    axios.get(`/movielog/${button.value}/delete`).then(result => {
      console.log("server answered");

      movielogArray[index].remove();
    });
  });
});

document
  .querySelectorAll(".remove-wishlist-button")
  .forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log("button was clicked");
      axios.get(`/wishlist/${button.value}/delete`).then(result => {
        console.log("server answered");
        console.log(wishlistArray[index]);
        wishlistArray[index].remove();
      });
    });
  });
