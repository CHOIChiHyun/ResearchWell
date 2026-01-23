export const Header = () => {
  // 현재 페이지가 reports.html인지 확인
  const isReportsPage = window.location.pathname.includes('reports.html');

  // Vite의 base 설정이나 현재 환경을 고려한 로고 경로
  // '/images/logo.png' 대신 상대 경로를 사용하여 어디서든 깨지지 않게 함
  const logoPath = 'images/logo.png';

  return `
    <header class="header">
      <div class="container header-container">
        <a href="./" class="logo">
          <img src="${logoPath}" alt="Research Well Logo" class="logo-img">
        </a>
        <nav class="nav">
          <ul class="nav-list">
            <li><a href="${isReportsPage ? './index.html' : '#home'}" class="${!isReportsPage ? 'active' : ''}">Home</a></li>
            <li><a href="${isReportsPage ? './index.html#mission' : '#mission'}">Mission</a></li>
            <li><a href="${isReportsPage ? './index.html#vision' : '#vision'}">Vision</a></li>
            <li><a href="${isReportsPage ? './index.html#service' : '#service'}">Business Areas</a></li>
            <li><a href="./reports.html" target="_blank" class="${isReportsPage ? 'active' : ''}">Research Reports</a></li>
          </ul>
        </nav>
        <button class="mobile-menu-btn" aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;
};
