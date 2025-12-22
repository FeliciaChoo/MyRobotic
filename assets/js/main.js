/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

/**
 * Ultrasonic distance simulator (Video 1)
 */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("distSlider");
  const distValue = document.getElementById("distValue");
  const decision = document.getElementById("robotDecision");
  const decisionBox = document.getElementById("decisionBox");

  // Stop if slider doesn't exist on this page
  if (!slider) return;

  function updateDistance() {
    const d = Number(slider.value);
    distValue.textContent = d;

    // Reset colours
    decisionBox.classList.remove("bg-success", "bg-warning", "bg-danger", "text-dark", "text-white");

    if (d <= 20) {
      decision.textContent = "Stop! Object is very close.";
      decisionBox.classList.add("bg-danger", "text-white");
    }
    else if (d <= 50) {
      decision.textContent = "Slow down and be careful.";
      decisionBox.classList.add("bg-warning", "text-dark");
    }
    else {
      decision.textContent = "Safe to move.";
      decisionBox.classList.add("bg-success", "text-white");
    }
  }

  slider.addEventListener("input", updateDistance);
  updateDistance();
});

/**
 * A* Algorithm Demo (Video 2 Page)
 * - Uses Manhattan heuristic
 * - Visualises open/closed/path on a fixed 10x10 grid
 */
document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("astarGrid");
  const runBtn = document.getElementById("astarRunBtn");
  const resetBtn = document.getElementById("astarResetBtn");
  const statusEl = document.getElementById("astarStatus");

  // If this page doesn't have the A* grid, do nothing (prevents breaking other pages)
  if (!gridEl || !runBtn || !resetBtn || !statusEl) return;

  const ROWS = 10;
  const COLS = 10;

  // Fixed map (0=free, 1=wall)
  // Feel free to tweak obstacles later, but keep it simple for demo
  const baseWalls = new Set([
    "1,3","2,3","3,3","4,3",
    "5,5","5,6","5,7",
    "7,2","7,3","7,4",
    "3,7","2,7","1,7"
  ]);

  const START = { r: 0, c: 0 };
  const GOAL  = { r: 9, c: 9 };

  let cells = []; // DOM references
  let animating = false;

  function key(r, c) { return `${r},${c}`; }

  function inBounds(r, c) {
    return r >= 0 && r < ROWS && c >= 0 && c < COLS;
  }

  function manhattan(a, b) {
    return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
  }

  function neighbours(node) {
    const dirs = [
      { dr: -1, dc: 0 },
      { dr:  1, dc: 0 },
      { dr:  0, dc: -1 },
      { dr:  0, dc: 1 },
    ];
    return dirs
      .map(d => ({ r: node.r + d.dr, c: node.c + d.dc }))
      .filter(p => inBounds(p.r, p.c));
  }

  function clearClasses() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const el = cells[r][c];
        el.className = "astar-cell";
      }
    }
  }

  function renderBase() {
    clearClasses();

    // walls
    baseWalls.forEach(k => {
      const [r, c] = k.split(",").map(Number);
      cells[r][c].classList.add("wall");
    });

    // start/goal
    cells[START.r][START.c].classList.add("start");
    cells[GOAL.r][GOAL.c].classList.add("goal");
  }

  function buildGrid() {
    gridEl.innerHTML = "";
    cells = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const div = document.createElement("div");
        div.className = "astar-cell";
        div.dataset.r = String(r);
        div.dataset.c = String(c);
        gridEl.appendChild(div);
        cells[r][c] = div;
      }
    }
    renderBase();
  }

  // Simple priority queue using array (fine for small demo)
  function popLowestF(open, fScore) {
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) {
      const k1 = open[i];
      const k0 = open[bestIdx];
      if ((fScore.get(k1) ?? Infinity) < (fScore.get(k0) ?? Infinity)) bestIdx = i;
    }
    return open.splice(bestIdx, 1)[0];
  }

  function reconstructPath(cameFrom, currentKey) {
    const path = [currentKey];
    while (cameFrom.has(currentKey)) {
      currentKey = cameFrom.get(currentKey);
      path.push(currentKey);
    }
    return path.reverse();
  }

  async function runAStar() {
    if (animating) return;
    animating = true;
    statusEl.textContent = "Running A*...";

    renderBase();

    const startK = key(START.r, START.c);
    const goalK  = key(GOAL.r, GOAL.c);

    const open = [startK];
    const openSet = new Set(open);
    const closedSet = new Set();

    const cameFrom = new Map();

    const gScore = new Map();
    const fScore = new Map();

    gScore.set(startK, 0);
    fScore.set(startK, manhattan(START, GOAL));

    function isWallKey(k) {
      return baseWalls.has(k);
    }

    function parseKey(k) {
      const [r, c] = k.split(",").map(Number);
      return { r, c };
    }

    let steps = 0;

    while (open.length > 0) {
      const currentK = popLowestF(open, fScore);
      openSet.delete(currentK);

      const { r: cr, c: cc } = parseKey(currentK);

      if (currentK !== startK && currentK !== goalK) {
        cells[cr][cc].classList.add("closed");
      }

      closedSet.add(currentK);

      if (currentK === goalK) {
        const path = reconstructPath(cameFrom, currentK);
        // paint path
        for (const pk of path) {
          const { r, c } = parseKey(pk);
          if (pk !== startK && pk !== goalK) cells[r][c].classList.add("path");
          await new Promise(res => setTimeout(res, 40));
        }
        statusEl.textContent = `Done. Path length: ${path.length - 1} steps. Expanded: ${closedSet.size} nodes.`;
        animating = false;
        return;
      }

      const currentNode = { r: cr, c: cc };

      for (const nb of neighbours(currentNode)) {
        const nbK = key(nb.r, nb.c);

        if (isWallKey(nbK) || closedSet.has(nbK)) continue;

        const tentativeG = (gScore.get(currentK) ?? Infinity) + 1;

        if (!openSet.has(nbK)) {
          open.push(nbK);
          openSet.add(nbK);
          if (nbK !== goalK) cells[nb.r][nb.c].classList.add("open");
        } else if (tentativeG >= (gScore.get(nbK) ?? Infinity)) {
          continue;
        }

        cameFrom.set(nbK, currentK);
        gScore.set(nbK, tentativeG);
        fScore.set(nbK, tentativeG + manhattan(nb, GOAL));
      }

      steps++;
      // small delay so users can see exploration
      await new Promise(res => setTimeout(res, 45));

      // safety (should never hit in 10x10)
      if (steps > 2000) break;
    }

    statusEl.textContent = "No path found (blocked). Try resetting or adjusting obstacles.";
    animating = false;
  }

  function resetDemo() {
    if (animating) return;
    renderBase();
    statusEl.textContent = "Ready.";
  }

  runBtn.addEventListener("click", runAStar);
  resetBtn.addEventListener("click", resetDemo);

  buildGrid();
});



})();