function hasClass(el, name) {
  return (' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1;
}

function addClass(el, name) {
  if (!hasClass(el, name)) {
    el.className = el.className + ' ' + name;
  }
}

function removeClass(el, name) {
  var parts = el.className.split(' ');
  var keep = [];
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] !== name && parts[i] !== '') {
      keep[keep.length] = parts[i];
    }
  }
  el.className = keep.join(' ');
}

function setClass(el, name, on) {
  if (on) {
    addClass(el, name);
  } else {
    removeClass(el, name);
  }
}

function getWithAttribute(attr) {
  var all = document.getElementsByTagName('*');
  var found = [];
  for (var i = 0; i < all.length; i++) {
    if (all[i].getAttribute(attr) !== null) {
      found[found.length] = all[i];
    }
  }
  return found;
}

function addCommas(n) {
  var s = String(n);
  var out = '';
  var count = 0;
  for (var i = s.length - 1; i >= 0; i--) {
    out = s.charAt(i) + out;
    count = count + 1;
    if (count % 3 === 0 && i > 0) {
      out = ',' + out;
    }
  }
  return out;
}

function trimText(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

var burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', function () {
    var menu = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0];
    setClass(menu, 'open', !hasClass(menu, 'open'));
  });
}

var navLinks = document.getElementsByTagName('nav')[0].getElementsByTagName('a');

var path = window.location.pathname;
var currentPage = path.substring(path.lastIndexOf('/') + 1);

if (currentPage === '') {
    currentPage = 'index.html';
}

for (var n = 0; n < navLinks.length; n++) {
    var href = navLinks[n].getAttribute('href');

    if (href === currentPage) {
        addClass(navLinks[n], 'active');
    }
}

function isVisible(el) {
  return el.getBoundingClientRect().top < window.innerHeight - 40;
}

function countUp(el) {
  var end = parseInt(el.getAttribute('data-count'));
  var current = 0;
  var step = Math.ceil(end / 80);
  var timer = setInterval(function () {
    current = current + step;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    el.innerHTML = addCommas(current);
  }, 20);
}

function checkScroll() {
  var i;
  var reveals = document.getElementsByClassName('reveal');
  for (i = 0; i < reveals.length; i++) {
    if (isVisible(reveals[i])) {
      addClass(reveals[i], 'in');
    }
  }

  var counters = getWithAttribute('data-count');
  for (i = 0; i < counters.length; i++) {
    if (isVisible(counters[i]) && counters[i].getAttribute('data-done') === null) {
      counters[i].setAttribute('data-done', 'yes');
      countUp(counters[i]);
    }
  }

  var charts = document.getElementsByClassName('bars');
  for (i = 0; i < charts.length; i++) {
    if (isVisible(charts[i])) {
      var bars = charts[i].getElementsByTagName('div');
      for (var j = 0; j < bars.length; j++) {
        bars[j].style.height = bars[j].getAttribute('data-h') + '%';
      }
    }
  }
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
checkScroll();

let currentFilter = 'all';
let currentSearch = '';

function filterEmirateCards() {
    const cards = document.querySelectorAll('[data-cat]');

    cards.forEach(card => {
        const category = card.getAttribute('data-cat');
        const text = card.textContent.toLowerCase();

        const matchesCategory =
            currentFilter === 'all' || category === currentFilter;

        const matchesSearch =
            text.includes(currentSearch);

        card.classList.toggle(
            'hide',
            !(matchesCategory && matchesSearch)
        );
    });
}

document.querySelectorAll('[data-f]').forEach(button => {
    button.addEventListener('click', function () {
        currentFilter = this.getAttribute('data-f');
        filterEmirateCards();
    });
});

const searchInput = document.getElementById('search');

if (searchInput) {
    searchInput.addEventListener('input', function () {
        currentSearch = this.value.toLowerCase().trim();
        filterEmirateCards();
    });
}

var modal = document.getElementById('modal');


function openModal() {
    document.getElementById('mTitle').textContent = this.getAttribute('data-title');
    document.getElementById('mText').textContent = this.getAttribute('data-info');
    addClass(modal, 'on');
}


if (modal) {
  var moreButtons = document.getElementsByClassName('more');
  for (var m = 0; m < moreButtons.length; m++) {
    moreButtons[m].addEventListener('click', openModal);
  }
  modal.addEventListener('click', function (event) {
    if (event.target.id === 'modal' || event.target.className === 'x') {
      removeClass(modal, 'on');
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      removeClass(modal, 'on');
    }
  });
}

function tabClick() {
  var buttons = this.parentNode.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    removeClass(buttons[i], 'on');
  }
  addClass(this, 'on');

  var panels = document.getElementsByClassName('panel');
  for (var j = 0; j < panels.length; j++) {
    setClass(panels[j], 'on', panels[j].id === this.getAttribute('data-t'));
  }
}

var tabBars = document.getElementsByClassName('tabs');
for (var t = 0; t < tabBars.length; t++) {
  var tabButtons = tabBars[t].getElementsByTagName('button');
  for (var k = 0; k < tabButtons.length; k++) {
    tabButtons[k].addEventListener('click', tabClick);
  }
}

function compareValues(a, b) {
    const numA = parseFloat(a.replace(/,/g, '').replace(/[^\d.-]/g, ''));
    const numB = parseFloat(b.replace(/,/g, '').replace(/[^\d.-]/g, ''));

    if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
    }

    return a.localeCompare(b);
}

function sortTable() {
  var column = this.cellIndex;
  var table = this.parentNode.parentNode.parentNode;
  var body = table.getElementsByTagName('tbody')[0];
  var rows = body.getElementsByTagName('tr');

  var list = [];
  for (var i = 0; i < rows.length; i++) {
    list[i] = rows[i];
  }

  var direction = this.getAttribute('data-d') === 'a' ? 'd' : 'a';
  this.setAttribute('data-d', direction);

  for (var pass = 0; pass < list.length - 1; pass++) {
    for (var j = 0; j < list.length - 1 - pass; j++) {
      var result = compareValues(list[j].cells[column].textContent.replace(/^\s+|\s+$/g, ''),
                                 list[j + 1].cells[column].textContent.replace(/^\s+|\s+$/g, ''));
      if (direction === 'd') {
        result = -result;
      }
      if (result > 0) {
        var temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }

  for (var r = 0; r < list.length; r++) {
    body.appendChild(list[r]);
  }
}

var sortTables = document.getElementsByClassName('sort');
for (var s = 0; s < sortTables.length; s++) {
  var headers = sortTables[s].getElementsByTagName('th');
  for (var h = 0; h < headers.length; h++) {
    headers[h].addEventListener('click', sortTable);
  }
}
 

var quiz = document.getElementById('quiz');

if (quiz) {
    var places = [
        'Dubai',
        'Abu Dhabi',
        'Sharjah',
        'Ajman',
        'Umm Al Quwain',
        'RAK',
        'Fujairah'
    ];

    var results = {
        'Dubai': 'Dubai - skyscrapers, shopping and nonstop energy!',
        'Abu Dhabi': 'Abu Dhabi - culture, museums and grand mosques.',
        'Sharjah': 'Sharjah - art, heritage and museums.',
        'Ajman': 'Ajman - peaceful beaches and a relaxed atmosphere.',
        'Umm Al Quwain': 'Umm Al Quwain - nature, mangroves and water activities.',
        'RAK': 'Ras Al Khaimah - mountains, zip lines and adventure.',
        'Fujairah': 'Fujairah - beaches, diving and calm coastlines.'
    };

    quiz.onsubmit = function () {

        // Check that all three questions have been answered
        var questions = quiz.querySelectorAll('.quiz-question');

        var allAnswered = Array.from(questions).every(function (question) {
            return question.querySelector('input[type="radio"]:checked');
        });

        var output = document.getElementById('quizOut');

        if (!allAnswered) {
            output.textContent = 'Please answer all three questions!';
            return false;
        }

        // Calculate scores for each emirate
        var scores = {};

        for (var i = 0; i < places.length; i++) {
            scores[places[i]] = 0;
        }

        var inputs = quiz.querySelectorAll('input[type="radio"]:checked');

        inputs.forEach(function (input) {
            if (scores[input.value] !== undefined) {
                scores[input.value]++;
            }
        });

        // Find the highest score
        var highestScore = Math.max(...Object.values(scores));

        // Collect all emirates with the highest score
        var winners = places.filter(function (place) {
            return scores[place] === highestScore;
        });

        // Randomly select a winner if there is a tie
        var bestPlace = winners[Math.floor(Math.random() * winners.length)];

        output.textContent = 'Your match: ' + results[bestPlace];

        return false;
    };
}

var budget = document.getElementById('budget');

function calculateBudget() {
  var days = parseInt(document.getElementById('days').value);
  var people = parseInt(document.getElementById('people').value);
  var hotel = parseInt(document.getElementById('hotel').value);
  var food = parseInt(document.getElementById('food').value);

  var activities = 0;
  var inputs = budget.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].name === 'act' && inputs[i].checked) {
      activities = activities + parseInt(inputs[i].value);
    }
  }

  var total = (hotel * Math.ceil(people / 2) + food * people) * days + activities * people;
  document.getElementById('dv').innerHTML = days;
  document.getElementById('pv').innerHTML = people;
  document.getElementById('total').innerHTML =
    'AED ' + addCommas(total) + '  (about USD ' + addCommas(Math.round(total / 3.6725)) + ')';
}

if (budget) {
  budget.addEventListener('input', calculateBudget);
  calculateBudget();
}

var countdown = document.getElementById('countdown');



function showCountdown() {
  var now = new Date();

// Show a greeting on UAE National Day (December 2)
if (now.getMonth() === 11 && now.getDate() === 2) {
    countdown.innerHTML = '<h2>Happy National Day!</h2>';
    return;
}

var target = new Date(now.getFullYear(), 11, 2);

if (target < now) {
    target = new Date(now.getFullYear() + 1, 11, 2);
}
  var seconds = Math.floor((target - now) / 1000);
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor(seconds / 3600) % 24;
  var minutes = Math.floor(seconds / 60) % 60;
  var secs = seconds % 60;
  countdown.innerHTML =
    '<div><b>' + days + '</b>Days</div>' +
    '<div><b>' + hours + '</b>Hours</div>' +
    '<div><b>' + minutes + '</b>Minutes</div>' +
    '<div><b>' + secs + '</b>Seconds</div>';
}

if (countdown) {
  showCountdown();
  setInterval(showCountdown, 1000);
}

function checkRule(rule, value) {
  var v = trimText(value);
  switch (rule) {
    case 'name':
      if (v.length < 3) {
        return 'Name must be at least 3 characters.';
      }
      return '';
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v))  {
        return 'Enter a valid email address.';
      }
      return '';
    case 'phone':
      if (!/^(?:\+971|0)5\d{8}$/.test(v.replace(/\s/g, ''))) {
        return 'Use a UAE mobile like 0501234567.';
      }
      return '';
    case 'date':
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (v === '' || new Date(v) < today) {
        return 'Choose today or a future date.';
      }
      return '';
    case 'msg':
      if (v.length < 10) {
        return 'Message must be at least 10 characters.';
      }
      return '';
    case 'pick':
      if (v === '') {
        return 'Please choose an option.';
      }
      return '';
  }
  return '';
}

function checkForm() {
  var form = this;
  var ok = true;
  var fields = form.getElementsByTagName('*');
  for (var i = 0; i < fields.length; i++) {
    var rule = fields[i].getAttribute('data-rule');
    if (rule !== null) {
      var message = checkRule(rule, fields[i].value);
      var errorBox = fields[i].parentNode.getElementsByClassName('err')[0];
      if (message !== '') {
        addClass(fields[i], 'invalid');
        errorBox.innerHTML = message;
        ok = false;
      } else {
        removeClass(fields[i], 'invalid');
        errorBox.innerHTML = '';
      }
    }
  }

  var success = form.getElementsByClassName('msg')[0];
  if (ok) {
    success.innerHTML = 'Thank you! Your form was submitted successfully.';
    removeClass(success, 'hide');
    form.reset();
  } else {
    addClass(success, 'hide');
  }
  return false;
}

var validForms = document.getElementsByClassName('validate');
for (var v = 0; v < validForms.length; v++) {
  validForms[v].onsubmit = checkForm;
}
