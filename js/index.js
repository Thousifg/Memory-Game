function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var shuffleCards = function () {
  var cardArray = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube",
  ];
  shuffle(cardArray);
  ulString = '<ul class="deck">';
  for (var i = 0; i < cardArray.length; i++) {
    ulString += '<li class="card"><i class="' + cardArray[i] + '"></i></li>';
  }
  ulString += "</ul>";

  if ($(".container .deck").length === 0) {
    $(".container").append(ulString);
  } else {
    $(".container .deck").replaceWith(ulString);
  }
};

var count = 0,
  moveCount = 0,
  a,
  list = [],
  matchedGrid = [],
  starCount,
  ulString;

var moves = function () {
  moveCount++;
  $(".moves").text(moveCount);
  return moveCount;
};

var displayCard = function (el) {
  $(el).addClass("open show");
};

var openCardList = function (el) {
  a = $(el).find("i").attr("class");
  list.push(a);
  console.log(list);
  return list;
};

var matchedCard = function (el) {
  $(".open").addClass("match");
  $(".match").removeClass("open show");
  matchedGrid.push($(el).find("i").attr("class"));
  console.log("matched cards" + matchedGrid);
  if (matchedGrid.length === 8) {
    gameComplete();
  }
};

var unmatchedCards = function () {
  $(".card").removeClass("open show  red");
};

var gameComplete = function () {
  displaypage();
};

var displaypage = function () {
  $(".container").toggleClass("hide");
  $(".winPage").toggleClass("hide");
};

var redGrid = function () {
  $(".show").addClass("red");
  setTimeout(unmatchedCards, 500);
};

var restart = function () {
  moveCount = 0;
  starCount = 3;
  $(".moves").text(moveCount);
  $(".card").removeClass("open show match");
  star(moveCount);
  shuffleCards();
  list = [];
  $(".card").on("click", onClick);
};

var star = function (moveCount) {
  if (moveCount > 8 && moveCount < 14) {
    $("ul.stars li:nth-child(3) i").removeClass("fa fa-star");
    $("ul.stars li:nth-child(3) i").addClass("fa fa-star-o");
    starCount = 2;
    console.log(starCount);
  } else if (moveCount >= 14 && moveCount < 20) {
    $("ul.stars li:nth-child(2) i").removeClass("fa fa-star");
    $("ul.stars li:nth-child(2) i").addClass("fa fa-star-o");
    starCount = 1;
    console.log(starCount);
  } else if (moveCount >= 20) {
    $("ul.stars li:nth-child(1) i").removeClass("fa fa-star");
    $("ul.stars li:nth-child(1) i").addClass("fa fa-star-o");
    starCount = 0;
    console.log(starCount);
  } else {
    starCount = 3;
    console.log(starCount);
    $("ul.stars li i").removeClass("fa fa-star-o");
    $("ul.stars li i").addClass("fa fa-star");
  }
  $(".starsCount").text(starCount);
};

var onClick = function (event) {
  $(event.target).addClass("open show");
  list = openCardList(event.target);

  if (list.length === 2) {
    if (list[0] === list[1]) {
      matchedCard(event.target);
    } else {
      redGrid(); //Incase   of wrong match
    }
    list = []; // reset array
    moveCount = moves(); // increment moves counter
    star(moveCount);
  }
};

shuffleCards();

$(".card").on("click", onClick);

$(".restart").on("click", function () {
  restart();
});

$(".playAgain").on("click", function () {
  restart();
  displaypage();
});
