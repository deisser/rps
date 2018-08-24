Vue.component("user-input", {
  props: ["rps"],
  template:
    '<div class="btn"><button type="button">{{rps.value}}</button></div>'
});

Vue.component("score", {
  props: ["score"],
  template: "<div><p>{{score.name}}: {{score.points}}</p></div>"
});

var rpsArray = [
  { id: 0, value: "Rock" },
  { id: 1, value: "Paper" },
  { id: 2, value: "Scissors" }
];

var scoreArray = [
  { name: "User", points: 0, float: "left" },
  { name: "Computer", points: 0, float: "right" }
];

var main = new Vue({
  el: "#main",
  data: {
    rpsList: rpsArray,
    computerEl: null,
    result: { value: null, background: null }
  },
  methods: {
    startRps: function(user) {
      var item = rpsArray[Math.floor(Math.random() * rpsArray.length)];
      this.computerEl = item.value;
      rpsGame(user.value, item.value, this.result);
    }
  }
});

var score = new Vue({
  el: "#score",
  data: {
    score: scoreArray
  },
  methods: {
    test: function(score) {
      score.points += 1;
    }
  }
});

var reset = new Vue({
  el: "#reset",
  methods: {
    reset: function() {
      scoreArray.map(score => (score.points = 0));
      main.computerEl = null;
      main.result = { value: null, background: null };
    }
  }
});

var rpsGame = function(user, computer, result) {
  if (user === computer) {
    result.background = "yellow";
    result.value = "Tie!";
  } else {
    if (user === "Rock") {
      if (computer === "Scissors") {
        userWin();
        result.background = "green";
        result.value = "You win!";
      } else {
        computerWin();
        result.background = "red";
        result.value = "You lose! Try again.";
      }
    }
    if (user === "Paper") {
      if (computer === "Rock") {
        userWin();
        result.background = "green";
        result.value = "You win!";
      } else {
        computerWin();
        result.background = "red";
        result.value = "You lose! Try again.";
      }
    }
    if (user === "Scissors") {
      if (computer === "Rock") {
        computerWin();
        result.background = "red";
        result.value = "You lose! Try again.";
      } else {
        userWin();
        result.background = "green";
        result.value = "You win!";
      }
    }
  }
};

var userWin = function() {
  score.score
    .filter(el => {
      if (el.name === "User") {
        return el;
      }
    })
    .map(score => (score.points += 1));
};

var computerWin = function() {
  score.score
    .filter(el => {
      if (el.name === "Computer") {
        return el;
      }
    })
    .map(score => (score.points += 1));
};
