import { logout, onAuthChange } from '../../firebase/auth.js';
import { createPressRelease, updatePressRelease, getPressRelease } from '../../firebase/firestore.js';

// DOM Elements
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const pageTitle = document.getElementById('page-title');
const pressForm = document.getElementById('press-form');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const linkInput = document.getElementById('link');
const contentTextarea = document.getElementById('content');
const isPublishedCheckbox = document.getElementById('isPublished');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const toast = document.getElementById('toast');

// Get edit ID from URL
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');
const isEditMode = !!editId;

// Auth check
onAuthChange((user) => {
    if (!user) {
        window.location.href = '/admin/login.html';
    } else {
        userEmailSpan.textContent = user.email;
        if (isEditMode) {
            loadPressRelease();
        }
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
        window.location.href = '/admin/login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Load press release for editing
async function loadPressRelease() {
    pageTitle.textContent = '글 수정';
    saveBtn.textContent = '수정하기';

    try {
        const release = await getPressRelease(editId);
        if (!release) {
            showToast('게시글을 찾을 수 없습니다.', 'error');
            setTimeout(() => {
                window.location.href = '/admin/';
            }, 1500);
            return;
        }

        titleInput.value = release.title || '';
        categorySelect.value = release.category || '';
        linkInput.value = release.link || '';
        contentTextarea.value = release.content || '';
        isPublishedCheckbox.checked = release.isPublished || false;
    } catch (error) {
        console.error('Load error:', error);
        showToast('데이터를 불러오는데 실패했습니다.', 'error');
    }
}

// Show toast
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form submit
pressForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const category = categorySelect.value;
    const link = linkInput.value.trim();
    const content = contentTextarea.value.trim();
    const isPublished = isPublishedCheckbox.checked;

    if (!title) {
        showToast('제목을 입력해주세요.', 'error');
        titleInput.focus();
        return;
    }

    if (!category) {
        showToast('카테고리를 선택해주세요.', 'error');
        categorySelect.focus();
        return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = '저장 중...';

    const data = {
        title,
        category,
        link,
        content,
        isPublished
    };

    try {
        if (isEditMode) {
            await updatePressRelease(editId, data);
            showToast('게시글이 수정되었습니다.');
        } else {
            await createPressRelease(data);
            showToast('게시글이 등록되었습니다.');
        }

        setTimeout(() => {
            window.location.href = '/admin/';
        }, 1000);
    } catch (error) {
        console.error('Save error:', error);
        showToast('저장에 실패했습니다.', 'error');
        saveBtn.disabled = false;
        saveBtn.textContent = isEditMode ? '수정하기' : '저장하기';
    }
});

// Cancel button
cancelBtn.addEventListener('click', () => {
    if (titleInput.value || contentTextarea.value) {
        if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
            window.location.href = '/admin/';
        }
    } else {
        window.location.href = '/admin/';
    }
});
