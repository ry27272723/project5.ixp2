(function () {
  var colors = ['#FF8484', '#FFB347', '#D4BFA8', '#C46A3A', '#F7C59F'];

  function spawnParticle(x, y) {
    var size  = 4 + Math.random() * 6;
    var angle = Math.random() * Math.PI * 2;
    var dist  = 30 + Math.random() * 50;
    var dx    = Math.cos(angle) * dist;
    var dy    = Math.sin(angle) * dist - 20;
    var color = colors[Math.floor(Math.random() * colors.length)];
    var dur   = 500 + Math.random() * 400;

    var el = document.createElement('span');
    el.style.cssText = 'position:fixed;pointer-events:none;border-radius:50%;z-index:9999;opacity:1;'
      + 'left:' + (x - size / 2) + 'px;top:' + (y - size / 2) + 'px;'
      + 'width:' + size + 'px;height:' + size + 'px;background:' + color + ';'
      + 'transition:transform ' + dur + 'ms ease-out,opacity ' + dur + 'ms ease-out';
    document.body.appendChild(el);

    // two rAFs: first paints the element, second triggers the transition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        el.style.opacity   = '0';
      });
    });

    setTimeout(function () { el.remove(); }, dur + 50);
  }

  document.addEventListener('click', function (e) {
    var count = 6 + Math.floor(Math.random() * 5);
    for (var i = 0; i < count; i++) spawnParticle(e.clientX, e.clientY);
  });
}());

document.addEventListener('DOMContentLoaded', function () {

  var dropdown = document.createElement('div');
  dropdown.className = 'menu-dropdown';
  dropdown.id = 'menu-dropdown';
  dropdown.innerHTML =
    '<a href="index.html"            class="menu-dropdown__link">Home</a>'
    + '<a href="index.html#apple-grid" class="menu-dropdown__link">Apples</a>'
    + '<a href="appleti.html"          class="menu-dropdown__link">Appleti</a>';
  document.body.appendChild(dropdown);

  var menuTrigger = document.querySelector('.js-menu-trigger');

  function openMenu() {
    var rect = menuTrigger.getBoundingClientRect();
    dropdown.style.top   = (rect.bottom + 8) + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
    document.body.classList.add('show-menu');
  }
  function closeMenu() { document.body.classList.remove('show-menu'); }

  if (menuTrigger) {
    menuTrigger.addEventListener('click', function () {
      document.body.classList.contains('show-menu') ? closeMenu() : openMenu();
    });
  }

  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('show-menu')) return;
    if (menuTrigger && menuTrigger.contains(e.target)) return;
    if (dropdown.contains(e.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  function appleSVG(filled) {
    var body = filled ? '#FF8484' : '#D4BFA8';
    var leaf = filled ? '#966060' : '#B8A898';
    var stem = filled ? '#955555' : '#B8A898';
    return '<svg width="20" height="21" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<path d="M29 17.4439C29 25.4348 21.2684 31 14.5 31C7.73154 31 0 25.4348 0 17.4439C0 9.45301 2.46125 3.78043 14.5 3.78043C26.5387 3.78043 29 9.45301 29 17.4439Z" fill="' + body + '"/>'
      + '<path d="M9.5553 5.16695C10.9736 6.65232 14.653 8.73184 18.0244 5.16695H9.5553Z" fill="' + leaf + '" fill-opacity="0.28"/>'
      + '<path d="M13.6726 0C12.9493 0.741749 13.3712 5.06593 13.6726 7.1353H14.4831C14.109 4.74881 14.3272 1.38406 14.4831 0H13.6726Z" fill="' + stem + '"/>'
      + '</svg>';
  }

  document.querySelectorAll('.rating-dots').forEach(function (el) {
    var score = parseInt(el.dataset.score, 10);
    var max   = parseInt(el.dataset.max,   10);
    var html  = '';
    for (var i = 1; i <= max; i++) html += appleSVG(i <= score);
    el.innerHTML = html;
  });

  var appleWrapper = document.getElementById('apple-wrapper');
  if (!appleWrapper) return;

  var appleImg    = document.getElementById('apple-img');
  var tapHint     = document.getElementById('tap-hint');
  var biteComment = document.getElementById('bite-comment');
  var ratingCard  = document.getElementById('rating-card');

  var match  = appleImg.getAttribute('src').match(/images\/([a-z-]+)0\./);
  var prefix = match ? match[1] : 'apple';

  var biteComments = {
    opal: [
      'cute yellow color.',
      'not very crunchy.',
      'very flavorful, actually.',
      'there\'s something milky about this.',
      'i think i like it.'
    ],
    cosmic: [
      'okay, that\'s dark red.',
      'oh — that\'s actually very crisp.',
      'high acid. sharp.',
      'there\'s a lot going on.',
      'intense. i get it now.'
    ],
    gala: [
      'nothing too surprising.',
      'mild. familiar.',
      'there\'s a faint floral thing going on.',
      'gets a little sweeter toward the end.',
      'fine. genuinely fine.'
    ],
    sugarbee: [
      'okay, the hype is real — visually at least.',
      'very crisp.',
      'juicy, but where\'s the sweetness?',
      'still waiting for the caramel notes.',
      'good apple. just not what i was told.'
    ],
    hunnyz: [
      'smells nice.',
      'okay, this is pretty normal.',
      'wait — it\'s getting sweeter.',
      'more fragrant than i expected.',
      'okay that last bite was actually really good.'
    ],
    pink: [
      'thick skin — you feel it immediately.',
      'sweet and tart, kind of at the same time.',
      'a little dry though.',
      'balanced.',
      'but i wanted more juice.'
    ],
    envy: [
      'no acid at all.',
      'sweet, dense, kind of hard.',
      'fragrant though — i\'ll give it that.',
      'small but it has something.',
      'didn\'t expect to like it. i kind of do.'
    ],
    ladya: [
      'dense. needs some effort to bite through.',
      'sweet, not much juice.',
      'something interesting underneath — hard to name.',
      'drier than i\'d like.',
      'grows on you a little.'
    ],
    granny: [
      'first bite — less sour than i thought?',
      'wait, there it is.',
      'bitter-tart. kind of astringent.',
      'this is not the sour i expected. it\'s something else.',
      'there\'s sweetness too, buried under everything.'
    ],
    kanzi: [
      'easier to bite than i thought.',
      'oh — that\'s tart.',
      'juicy though, really juicy.',
      'kind of astringent on the back end.',
      'more interesting than it looked.'
    ],
    honeyc: [
      'okay, i understand the hype now.',
      'incredibly crisp — almost loud.',
      'juicy, very juicy.',
      'the sweetness is there, but quiet.',
      'good. i think i just got an off one.'
    ],
    sugarbeeo: [
      'okay this is different.',
      'thin skin — barely there.',
      'pure sweet. no acid at all.',
      'firm, almost like snack.',
      'i was wrong about this one.'
    ],
    lucky: [
      'may you have more than enough.',
      'good fortune, good health.',
      'everything you wish for.',
      'riches and joy.',
      'a hundred years of happiness.'
    ]
  };

  var comments    = biteComments[prefix] || ['...', '...', '...', '...', '...'];
  var totalBites  = comments.length;
  var currentBite = 0;

  function advanceBite() {
    if (currentBite >= totalBites) return;
    currentBite++;

    appleImg.src = 'images/' + prefix + currentBite + '.png';

    if (currentBite === 1) tapHint.classList.add('hidden');

    biteComment.classList.remove('visible');
    setTimeout(function () {
      biteComment.textContent = comments[currentBite - 1];
      biteComment.classList.add('visible');
    }, 180);

    if (currentBite === totalBites) {
      setTimeout(function () {
        ratingCard.classList.add('revealed');
        ratingCard.removeAttribute('aria-hidden');
      }, 500);
    }
  }

  appleWrapper.addEventListener('click', advanceBite);
  appleWrapper.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advanceBite(); }
  });

});
