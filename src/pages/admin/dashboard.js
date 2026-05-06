import { logout, onAuthChange } from '../../firebase/auth.js';
import { getAllPressReleases, deletePressRelease, updatePressRelease } from '../../firebase/firestore.js';

// DOM Elements
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const loadingDiv = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const pressTable = document.getElementById('press-table');
const pressList = document.getElementById('press-list');
const statTotal = document.getElementById('stat-total');
const statPublished = document.getElementById('stat-published');
const statDraft = document.getElementById('stat-draft');

// Modal elements
const deleteModal = document.getElementById('delete-modal');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const confirmDeleteBtn = document.getElementById('confirm-delete');

// Toast
const toast = document.getElementById('toast');

let deleteTargetId = null;

// Auth check
onAuthChange((user) => {
    if (!user) {
        window.location.href = '/admin/login.html';
    } else {
        userEmailSpan.textContent = user.email;
        loadPressReleases();
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
        window.location.href = '/admin/login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('로그아웃에 실패했습니다.', 'error');
    }
});

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Show toast
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Load press releases
async function loadPressReleases() {
    try {
        const releases = await getAllPressReleases();

        // Update stats
        const published = releases.filter(r => r.isPublished).length;
        statTotal.textContent = releases.length;
        statPublished.textContent = published;
        statDraft.textContent = releases.length - published;

        loadingDiv.style.display = 'none';

        if (releases.length === 0) {
            emptyState.style.display = 'block';
            pressTable.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            pressTable.style.display = 'table';
            renderTable(releases);
        }
    } catch (error) {
        console.error('Load error:', error);
        loadingDiv.innerHTML = '<p style="color: var(--accent-color);">데이터를 불러오는데 실패했습니다.</p>';
    }
}

// Render table
function renderTable(releases) {
    pressList.innerHTML = releases.map(release => `
        <tr>
            <td class="title-cell">${escapeHtml(release.title)}</td>
            <td>
                <span class="category-badge ${release.category === '여론조사' ? 'poll' : 'press'}">
                    ${escapeHtml(release.category)}
                </span>
            </td>
            <td>
                <span class="status-badge ${release.isPublished ? 'published' : 'draft'}">
                    ${release.isPublished ? '공개' : '비공개'}
                </span>
            </td>
            <td>${formatDate(release.createdAt)}</td>
            <td class="actions">
                <button class="btn-icon edit" onclick="editPress('${release.id}')" title="수정">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                </button>
                <button class="btn-icon delete" onclick="deletePress('${release.id}')" title="삭제">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Edit press - global function
window.editPress = function(id) {
    window.location.href = `/admin/press-write.html?id=${id}`;
};

// Delete press - global function
window.deletePress = function(id) {
    deleteTargetId = id;
    deleteModal.classList.add('show');
};

// Cancel delete
cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.remove('show');
    deleteTargetId = null;
});

// Confirm delete
confirmDeleteBtn.addEventListener('click', async () => {
    if (!deleteTargetId) return;

    try {
        await deletePressRelease(deleteTargetId);
        showToast('게시글이 삭제되었습니다.');
        deleteModal.classList.remove('show');
        deleteTargetId = null;
        loadPressReleases();
    } catch (error) {
        console.error('Delete error:', error);
        showToast('삭제에 실패했습니다.', 'error');
    }
});

// Close modal on overlay click
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.classList.remove('show');
        deleteTargetId = null;
    }
});
