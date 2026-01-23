import './assets/style.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { initNavigation, initMobileMenu } from './utils/navigation'

document.addEventListener('DOMContentLoaded', () => {
  // Inject Header and Footer
  const app = document.getElementById('app');

  // Create header and footer containers if they don't exist as placeholders
  // But for cleaner HTML, we'll just prepend/append to the app div or find specific IDs
  const headerPlaceholder = document.getElementById('header-root');
  const footerPlaceholder = document.getElementById('footer-root');

  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = Header();
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = Footer();
  }

  // Initialize logic
  initNavigation();
  initMobileMenu();

  console.log('Research Well Application Initialized');
});
