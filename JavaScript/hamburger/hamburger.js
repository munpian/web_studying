const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});