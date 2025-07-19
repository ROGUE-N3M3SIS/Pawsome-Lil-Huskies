
// === Snow Animation ===

// Get canvas and context
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Snowflake array
let snowflakes = [];

// Create initial snowflakes
function createSnowflakes() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1,
      speed: Math.random() * 1 + 0.5,
    });
  }
}

// Draw snowflakes on canvas
function drawSnowflakes() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  }
  ctx.fill();
  moveSnowflakes();
}

// Move snowflakes downward
function moveSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;
    if (flake.y > height) {
      flake.y = 0;
      flake.x = Math.random() * width;
    }
  }
}

// Animation loop
function update() {
  drawSnowflakes();
  requestAnimationFrame(update);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Initialize
createSnowflakes();
update();

// === Tab Toggle Logic ===

// Toggle tab visibility
function toggleTab(id) {
  const allTabs = document.querySelectorAll('.tab-content');
  const clickedTab = document.getElementById(id);
  allTabs.forEach(tab => {
    if (tab !== clickedTab) tab.style.display = 'none';
  });
  const isVisible = clickedTab.style.display === 'block';
  clickedTab.style.display = isVisible ? 'none' : 'block';
}

// === Lightbox Gallery ===

// Lightbox gallery functions
function openGallery(id) {
  document.getElementById(id).style.display = 'block';
}
function closeGallery(id) {
  document.getElementById(id).style.display = 'none';
}

// === Dark Mode Toggle ===

// Dark mode toggle
const toggleButton = document.getElementById('darkModeToggle');
const elementsToToggle = [
  document.body,
  document.querySelector('header'),
  document.querySelector('footer'),
  ...document.querySelectorAll('.husky-card'),
  ...document.querySelectorAll('.tab-content'),
  ...document.querySelectorAll('.tab-button'),
  ...document.querySelectorAll('form'),
  ...document.querySelectorAll('form button'),
  ...document.querySelectorAll('.parent-card')
];

// Function to update the toggle button text
function updateToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  toggleButton.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
}

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  elementsToToggle.forEach(el => el.classList.add('dark-mode'));
}
updateToggleText(); // <-- Apply correct label on load

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
  elementsToToggle.forEach(el => el.classList.toggle('dark-mode'));
  const isNowDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isNowDark ? 'enabled' : 'disabled');
  updateToggleText(); // <-- Update label after toggle
});
 // === Parent Lightbox ===
function openParentLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  lightboxImg.src = imgSrc;
  lightbox.style.display = 'block';
}

function closeParentLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Apply only to parent images
document.querySelectorAll('.parent-card img').forEach(img => {
  img.addEventListener('click', () => {
    openParentLightbox(img.src);
  });
});
