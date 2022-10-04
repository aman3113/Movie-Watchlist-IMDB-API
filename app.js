let inputEl = document.getElementById("input-el");
let searchBtn = document.querySelector("#search-el");
let displayEl = document.querySelector(".display-container");

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    movieSearch();
  }
});

searchBtn.addEventListener("click", movieSearch);

function movieSearch() {
  document.querySelector(".not-found").textContent = "";
  displayEl.innerHTML = "";
  let inputStr = inputEl.value.replace(" ", "+");
  let url = `
   http://www.omdbapi.com/?s=${inputStr}&apikey=c1f8d76a
 `;
  moviesListGenerator(url);
  inputEl.value = "";
}

function moviesListGenerator(url) {
  let id = [];
  // let myIdList = [];
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        document.querySelector(".not-found").textContent = "Movie Not found";
        console.log("not found");
      } else {
        data.Search.forEach((movie) => {
          id.push(movie.imdbID);
        });
        id.forEach((id) => {
          let url = ` https://www.omdbapi.com/?i=${id}&apikey=a3a84389`;
          fetch(url)
            .then((res) => res.json())
            .then((movie) => {
              templateGenerator(movie);

              const watchListButton = document.querySelectorAll(".add-movie");
              watchListButton.forEach((btn) =>
                btn.addEventListener("click", function () {
                  if (btn.textContent != "Added") {
                    btn.textContent = "Added";
                    btn.style.backgroundColor = "rgb(60, 107, 60)";
                    btn.style.Color = "Black";
                    // myIdList.push(this.id);
                    window.localStorage.setItem(this.id, this.id);
                  } else {
                    btn.innerHTML = `<img src="images/add icon.png"  />Watchlist`;
                    btn.style.backgroundColor = "#1c1c1c";
                    btn.style.Color = "White";
                    // myIdList = myIdList.filter(function (item) {
                    //   return item !== this.id;
                    // });
                    window.localStorage.removeItem(this.id);
                  }
                })
              );

              //
            });
        });
      }
    });
  // window.localStorage.setItem("myListId", JSON.stringify(myIdList));
}
function templateGenerator(data) {
  displayEl.innerHTML += `
  <div class="movie-item">
      <div class="movie-poster">
        <img src="${data.Poster}" />
      </div>
      <div class="movie-about">
        <div class="title">
          <span><h3>${data.Title}</h3></span>
          <span>⭐${data.imdbRating}</span>
        </div>
        <div class="type">
          <span>${data.Runtime}</span>
          <span>${data.Genre}</span>
          <span><button class="add-movie" id="${data.imdbID}"><img src="images/add icon.png"  />Watchlist</button></span>
        </div>
        <div class="plot">${data.Plot}</div>
      </div>
    </div>
    <div class="break"></div>
  `;
}
