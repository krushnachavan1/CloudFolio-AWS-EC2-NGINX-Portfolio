/* ═══════════════════════════════════════════
   script.js — CloudFolio JavaScript
   Author  : Your Name
   Server  : AWS EC2 + Nginx
   ═══════════════════════════════════════════ */

"use strict";

/* ──────────────────────────────────────────
   1. ANIMATED STARFIELD (Canvas)
   ────────────────────────────────────────── */

const canvas = document.getElementById("stars-canvas");
const ctx    = canvas.getContext("2d");
let stars    = [];

/** Resize canvas to fill the viewport */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

/** Create random star objects */
function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 8000);

  for (let i = 0; i < count; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001
    });
  }
}

/** Draw and animate stars every frame */
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(function(s) {
    s.alpha += s.speed;

    // Reset star to a new random position when it fades out
    if (s.alpha > 1) {
      s.alpha = 0;
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 212, 255, " + (s.alpha * 0.7) + ")";
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

// Initialize and start starfield
resizeCanvas();
initStars();
drawStars();

// Re-init on window resize
window.addEventListener("resize", function() {
  resizeCanvas();
  initStars();
});


/* ──────────────────────────────────────────
   2. TYPING EFFECT (Hero section)
   ────────────────────────────────────────── */

const typedWords  = ["Future", "Scalable", "Reliable", "Secure"];
let wordIndex     = 0;
let charIndex     = 0;
let isDeleting    = false;
const typedEl     = document.getElementById("typed-text");

function typeEffect() {
  const currentWord = typedWords[wordIndex];

  if (!isDeleting) {
    // Typing forward
    charIndex++;
    typedEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      // Pause at full word, then start deleting
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    // Deleting backward
    charIndex--;
    typedEl.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      // Move to next word
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % typedWords.length;
    }
  }

  // Speed: faster when deleting
  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing after a short delay
setTimeout(typeEffect, 900);


/* ──────────────────────────────────────────
   3. SCROLL REVEAL ANIMATION
   ────────────────────────────────────────── */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");

      // Trigger skill bars inside this element
      entry.target.querySelectorAll(".skill-fill").forEach(function(bar) {
        bar.style.width = bar.dataset.width + "%";
      });

      // Trigger count-up numbers inside this element
      const numEl = entry.target.querySelector(".stat-num");
      if (numEl && numEl.dataset.target) {
        animateCounter(numEl, parseInt(numEl.dataset.target));
      }

      // Stop observing once revealed
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});


/* ──────────────────────────────────────────
   4. COUNT-UP ANIMATION (Stats)
   ────────────────────────────────────────── */

/**
 * Animate a number from 0 to target over ~1.2 seconds
 * @param {HTMLElement} el     - the DOM element to update
 * @param {number}      target - the final number to count to
 */
function animateCounter(el, target) {
  let current   = 0;
  const duration = 1200;                    // total time in ms
  const stepTime  = duration / target;      // time between each increment

  const interval = setInterval(function() {
    current++;
    el.textContent = current;

    if (current >= target) {
      clearInterval(interval);
    }
  }, stepTime);
}


/* ──────────────────────────────────────────
   5. MOUSE PARALLAX (Hero Badges)
   ────────────────────────────────────────── */

const badges = document.querySelectorAll(".hero-badge");

document.addEventListener("mousemove", function(e) {
  // Normalize mouse position: -0.5 to 0.5
  const mx = (e.clientX / window.innerWidth  - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;

  badges.forEach(function(badge, index) {
    const factor = (index + 1) * 0.5;
    badge.style.transform = "translate(" + (mx * factor) + "px, " + (my * factor) + "px)";
  });
});


/* ──────────────────────────────────────────
   6. MOBILE HAMBURGER MENU
   ────────────────────────────────────────── */

const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
  navMenu.classList.toggle("open");
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll("a").forEach(function(link) {
  link.addEventListener("click", function() {
    navMenu.classList.remove("open");
  });
});


/* ──────────────────────────────────────────
   7. SMOOTH ACTIVE NAV HIGHLIGHT on Scroll
   ────────────────────────────────────────── */

const sections    = document.querySelectorAll("section[id]");
const navLinks    = document.querySelectorAll("nav ul a");

window.addEventListener("scroll", function() {
  let currentSection = "";

  sections.forEach(function(sec) {
    const top    = sec.offsetTop - 100;
    const height = sec.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = sec.getAttribute("id");
    }
  });

  navLinks.forEach(function(link) {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + currentSection) {
      link.style.color = "var(--accent)";
    }
  });
});


/* ──────────────────────────────────────────
   8. YEAR IN FOOTER (auto-update)
   ────────────────────────────────────────── */

// If you add a <span id="year"> in footer, this fills it automatically
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
