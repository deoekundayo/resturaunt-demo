(function () {
  "use strict";

  var form = document.getElementById("review-form");
  var ratingInput = document.getElementById("rating");
  var ratingLabel = document.getElementById("rating-label");
  var starBtns = document.querySelectorAll(".star-btn");
  var clearBtn = document.getElementById("star-clear");

  var FILLED = "★";
  var EMPTY = "☆";

  function setRating(value) {
    var num = Math.max(0, Math.min(5, parseInt(value, 10) || 0));
    ratingInput.value = String(num);
    ratingLabel.textContent = num + " of 5 stars";

    starBtns.forEach(function (btn) {
      var v = parseInt(btn.getAttribute("data-value"), 10);
      var filled = v <= num;
      btn.textContent = filled ? FILLED : EMPTY;
      btn.classList.toggle("filled", filled);
    });
  }

  function initStars() {
    starBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setRating(btn.getAttribute("data-value"));
      });
    });
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        setRating(0);
      });
    }
  }

  if (form) {
    form.addEventListener("reset", function () {
      setTimeout(function () {
        setRating(0);
      }, 0);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var rating = parseInt(ratingInput.value, 10);
      var comment = (form.querySelector("#comment") || {}).value || "";
      var recommendEl = form.querySelector("input[name='recommend']:checked");
      var recommend = recommendEl ? recommendEl.value : "";

      if (rating < 0 || rating > 5) {
        alert("Please choose a rating from 0 to 5 stars.");
        return;
      }

      // In a full app you would send this to your backend (e.g. POST /api/reviews)
      console.log("Review submitted:", { rating: rating, comment: comment, recommend: recommend });
      alert("Thank you! Your review has been submitted.\n\nRating: " + rating + " of 5 stars");
      form.reset();
      setRating(0);
    });
  }

  initStars();
  setRating(ratingInput ? ratingInput.value : 0);
})();
