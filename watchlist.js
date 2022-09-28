let displayList = JSON.parse(localStorage.getItem("myList"));
let displayEl = document.querySelector(".display-container");
let html = "";
for (let item of displayList) {
  html += `
        <div class="movie-item">
            <div class="movie-poster">
              <img src="${item.poster}" />
            </div>
            <div class="movie-about">
              <div class="title">
                <span><h3>${item.title}</h3></span>
                <span>⭐${item.rating}</span>
              </div>
              <div class="type">
                <span>${item.Runtime}</span>
                <span>${item.genre}</span>
                <span><img src="images/remove icon.png" class="remove-movie" />Remove</span>
              </div>
              <div class="plot">${item.plot}</div>
            </div>
          </div>
          <div class="break"></div>
        `;
}
displayEl.innerHTML = html;
// console.log(html);
let removeEl = document.getElementsByClassName("remove-movie");

for (let each of removeEl) {
  each.addEventListener("click", function (event) {
    console.log();
  });
}
html = " ";
