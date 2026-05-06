import { getPressRelease } from '../firebase/firestore.js';

// DOM Elements
const loadingDiv = document.getElementById('loading');
const notFoundDiv = document.getElementById('not-found');
const pressContent = document.getElementById('press-content');
const detailTag = document.getElementById('detail-tag');
const detailTitle = document.getElementById('detail-title');
const detailDate = document.getElementById('detail-date');
const detailBody = document.getElementById('detail-body');
const detailLinkWrapper = document.getElementById('detail-link-wrapper');

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const pressId = urlParams.get('id');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!pressId) {
        showNotFound();
        return;
    }
    loadPressRelease();
});

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show not found
function showNotFound() {
    loadingDiv.style.display = 'none';
    notFoundDiv.style.display = 'block';
}

// Load press release
async function loadPressRelease() {
    try {
        const release = await getPressRelease(pressId);

        loadingDiv.style.display = 'none';

        if (!release || !release.isPublished) {
            showNotFound();
            return;
        }

        // Update page title
        document.title = `${release.title} - Research Well`;

        // Render content
        detailTag.textContent = release.category;
        detailTag.className = `press-detail-tag ${release.category === '여론조사' ? 'poll' : 'press'}`;
        detailTitle.textContent = release.title;
        detailDate.textContent = formatDate(release.createdAt);
        detailBody.textContent = release.content || '';

        // Link button
        if (release.link) {
            detailLinkWrapper.innerHTML = `
                <a href="${escapeHtml(release.link)}" target="_blank" rel="noopener noreferrer" class="press-detail-link">
                    기사 원문 보기
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            `;
        }

        pressContent.style.display = 'block';
    } catch (error) {
        console.error('Load error:', error);
        showNotFound();
    }
}
