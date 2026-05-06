import { getPressReleases } from '../firebase/firestore.js';

// DOM Elements
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const pressGrid = document.getElementById('press-grid');
const filtersContainer = document.getElementById('filters');

let allReleases = [];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPressReleases();
    setupFilters();
});

// Setup filters
function setupFilters() {
    filtersContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Filter
            currentCategory = e.target.dataset.category;
            renderReleases();
        }
    });
}

// Load press releases
async function loadPressReleases() {
    try {
        allReleases = await getPressReleases();
        loadingDiv.style.display = 'none';

        if (allReleases.length === 0) {
            emptyState.style.display = 'block';
        } else {
            renderReleases();
        }
    } catch (error) {
        console.error('Load error:', error);
        loadingDiv.innerHTML = '<p style="color: var(--accent-color);">데이터를 불러오는데 실패했습니다.</p>';
    }
}

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Truncate text
function truncate(text, length = 100) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

// Render releases
function renderReleases() {
    const filtered = currentCategory === 'all'
        ? allReleases
        : allReleases.filter(r => r.category === currentCategory);

    if (filtered.length === 0) {
        pressGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    pressGrid.style.display = 'grid';

    pressGrid.innerHTML = filtered.map(release => `
        <div class="press-card">
            <span class="press-card-tag ${release.category === '여론조사' ? 'poll' : 'press'}">
                ${escapeHtml(release.category)}
            </span>
            <h3>${escapeHtml(release.title)}</h3>
            <p>${escapeHtml(truncate(release.content, 200))}</p>
            <div class="press-card-footer">
                <span class="press-card-date">${formatDate(release.createdAt)}</span>
                ${release.link ? `
                    <a href="${escapeHtml(release.link)}" target="_blank" rel="noopener noreferrer" class="press-card-link">
                        기사 보기
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                ` : `
                    <a href="/press-detail.html?id=${release.id}" class="press-card-link">
                        자세히 보기
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                `}
            </div>
        </div>
    `).join('');
}
