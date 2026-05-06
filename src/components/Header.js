export const Header = () => {
  // Vite가 설정된 base 경로를 자동으로 가져옵니다 (e.g., '/ResearchWell/' 또는 '/')
  const base = import.meta.env.BASE_URL;
  const pathname = window.location.pathname;
  const isReportsPage = pathname.includes('reports.html');
  const isPressPage = pathname.includes('press.html') || pathname.includes('press-detail.html');
  const isSubPage = isReportsPage || isPressPage;

  // 경로를 깔끔하게 합쳐주는 헬퍼 함수
  const getPath = (path) => `${base}${path}`.replace(/\/+/g, '/');

  const logoPath = getPath('images/logo.png');
  const homeUrl = getPath('index.html');
  const reportsUrl = getPath('reports.html');
  const pressUrl = getPath('press.html');

  return `
    <header class="header">
      <div class="container header-container">
        <a href="${homeUrl}" class="logo">
          <img src="${logoPath}" alt="Research Well Logo" class="logo-img">
        </a>
        <nav class="nav">
          <ul class="nav-list">
            <li><a href="${isSubPage ? homeUrl : '#home'}" class="${!isSubPage ? 'active' : ''}">Home</a></li>
            <li><a href="${isSubPage ? homeUrl + '#mission' : '#mission'}">Mission</a></li>
            <li><a href="${isSubPage ? homeUrl + '#vision' : '#vision'}">Vision</a></li>
            <li><a href="${isSubPage ? homeUrl + '#service' : '#service'}">Business Areas</a></li>
            <li><a href="${pressUrl}" class="${isPressPage ? 'active' : ''}">Press</a></li>
            <li><a href="${reportsUrl}" class="${isReportsPage ? 'active' : ''}">Research Reports</a></li>
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
