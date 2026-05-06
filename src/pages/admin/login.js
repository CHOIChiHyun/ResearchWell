import { login, onAuthChange } from '../../firebase/auth.js';

// DOM Elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const saveEmailCheckbox = document.getElementById('save-email');
const loginBtn = document.getElementById('login-btn');
const errorDiv = document.getElementById('login-error');

// 저장된 이메일 불러오기
const savedEmail = localStorage.getItem('savedEmail');
if (savedEmail) {
    emailInput.value = savedEmail;
    saveEmailCheckbox.checked = true;
}

// Check if already logged in
onAuthChange((user) => {
    if (user) {
        window.location.href = '/admin/';
    }
});

// Show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

// Hide error message
function hideError() {
    errorDiv.classList.remove('show');
}

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showError('이메일과 비밀번호를 입력해주세요.');
        return;
    }

    // Disable button
    loginBtn.disabled = true;
    loginBtn.textContent = '로그인 중...';

    try {
        await login(email, password);

        // 이메일 저장 처리
        if (saveEmailCheckbox.checked) {
            localStorage.setItem('savedEmail', email);
        } else {
            localStorage.removeItem('savedEmail');
        }

        window.location.href = '/admin/';
    } catch (error) {
        console.error('Login error:', error);

        // Error messages
        let message = '로그인에 실패했습니다.';
        if (error.code === 'auth/user-not-found') {
            message = '등록되지 않은 이메일입니다.';
        } else if (error.code === 'auth/wrong-password') {
            message = '비밀번호가 올바르지 않습니다.';
        } else if (error.code === 'auth/invalid-email') {
            message = '유효하지 않은 이메일 형식입니다.';
        } else if (error.code === 'auth/too-many-requests') {
            message = '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
        } else if (error.code === 'auth/invalid-credential') {
            message = '이메일 또는 비밀번호가 올바르지 않습니다.';
        }

        showError(message);
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = '로그인';
    }
});
