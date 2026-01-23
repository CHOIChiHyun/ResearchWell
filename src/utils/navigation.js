export const initNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    // reports.html이 포함되지 않았을 때만 스크롤 감지 로직 실행
    const isMainPage = !window.location.pathname.includes('reports.html');

    if (!isMainPage) return;

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120; // 헤더 높이를 고려한 오프셋

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            // href가 #home, #mission 등 ID와 일치하는지 확인
            if (current && href.includes(`#${current}`)) {
                link.classList.add('active');
            }
        });

        // 아무것도 활성화되지 않았고 화면이 맨 위라면 Home 활성화
        if (!current && window.scrollY < 100) {
            const homeLink = document.querySelector('.nav-list a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    // 페이지 로드 시 즉시 한 번 실행
    setTimeout(updateActiveLink, 100);
};

export const initMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            console.log('Mobile menu active');
        });
    }
};
