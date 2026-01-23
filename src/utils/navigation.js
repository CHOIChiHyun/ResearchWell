export const initNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    const isReportsPage = window.location.pathname.includes('reports.html');

    // 보고서 페이지에서는 스크롤에 따른 active 변경 로직을 실행하지 않음 (오직 Reports에 고정)
    if (isReportsPage) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes('reports.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        return;
    }

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;

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

            // 해시 링크인 경우에만 스크롤 상태 반영
            if (current && href === `#${current}`) {
                link.classList.add('active');
            }
        });

        // 최상단일 때 Home 활성화
        if (window.scrollY < 100) {
            const homeLink = document.querySelector('.nav-list a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
};

export const initMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // 모바일 메뉴 처리 로직 (필요 시)
        });
    }
};
