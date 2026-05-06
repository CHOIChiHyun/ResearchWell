# Research Well

대구 소재 여론조사 전문기관 **Research Well**의 공식 웹사이트입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Vanilla JavaScript (ES6+) |
| Bundler | Vite |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Hosting | Netlify |
| Styling | Pure CSS (CSS Custom Properties) |

## 프로젝트 구조

```
ResearchWell/
├── index.html                    # 메인 페이지
├── reports.html                  # 여론조사 보고서 페이지
├── press.html                    # 언론 공표 목록 페이지
├── press-detail.html             # 언론 공표 상세 페이지
├── admin/                        # 관리자 페이지
│   ├── login.html                # 로그인
│   ├── index.html                # 대시보드 (게시글 관리)
│   ├── press-write.html          # 글 작성/수정
│   └── press-list.html           # 목록 (리다이렉트)
├── src/
│   ├── main.js                   # 앱 진입점
│   ├── assets/
│   │   ├── style.css             # 메인 스타일시트
│   │   └── admin.css             # 관리자 페이지 스타일
│   ├── components/
│   │   ├── Header.js             # 공통 헤더
│   │   └── Footer.js             # 공통 푸터
│   ├── firebase/
│   │   ├── config.js             # Firebase 초기화
│   │   ├── auth.js               # 인증 함수 (로그인/로그아웃)
│   │   └── firestore.js          # DB CRUD 함수
│   ├── pages/
│   │   ├── press-list.js         # 공개 목록 페이지 로직
│   │   ├── press-detail.js       # 공개 상세 페이지 로직
│   │   └── admin/
│   │       ├── login.js          # 로그인 처리
│   │       ├── dashboard.js      # 대시보드 로직
│   │       └── press-editor.js   # 글 작성/수정 로직
│   └── utils/
│       └── navigation.js         # 네비게이션 유틸
├── public/
│   ├── images/                   # 로고 등 이미지
│   ├── reports/                  # PDF 보고서 파일
│   └── favicon.png
├── vite.config.js
├── package.json
└── netlify.toml
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 3. 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

## Firebase 설정

### Firebase Console 설정

1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. **Firestore Database** 활성화 (위치: asia-northeast3 서울)
3. **Authentication** > 이메일/비밀번호 로그인 활성화
4. 웹 앱 등록 후 `firebaseConfig` 복사

### 프로젝트에 Firebase 설정 적용

`src/firebase/config.js` 파일에서 Firebase 설정 값을 수정:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Firestore 보안 규칙

Firebase Console > Firestore Database > 규칙 탭에서 아래 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /press-releases/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Firestore 인덱스

`isPublished`와 `createdAt` 복합 쿼리를 위한 인덱스가 필요합니다.
첫 쿼리 실행 시 콘솔 에러에 나오는 링크를 클릭하면 자동 생성됩니다.

### 관리자 계정 생성

Firebase Console > Authentication > Users 탭에서 관리자 계정 추가:
- 이메일/비밀번호 입력 후 "사용자 추가"

## Firestore 데이터 구조

### press-releases 컬렉션

```javascript
{
  title: string,           // 제목
  content: string,         // 본문 (일반 텍스트)
  link: string,            // 뉴스 기사 URL
  category: string,        // "보도자료"
  isPublished: boolean,    // 공개 여부
  createdAt: timestamp,    // 작성일
  updatedAt: timestamp     // 수정일
}
```

## 주요 기능

### 공개 페이지

- **메인 페이지** (`/`): 회사 소개, 미션, 비전, 사업 영역
- **Research Reports** (`/reports.html`): 여론조사 보고서 PDF 다운로드
- **Press** (`/press.html`): 언론 공표 자료 목록
- **Press Detail** (`/press-detail.html?id=xxx`): 게시글 상세

### 관리자 페이지

- **로그인** (`/admin/login.html`): 이메일/비밀번호 로그인, 이메일 저장 기능
- **대시보드** (`/admin/`): 게시글 목록, 통계, 삭제 기능
- **글 작성** (`/admin/press-write.html`): 새 게시글 작성
- **글 수정** (`/admin/press-write.html?id=xxx`): 기존 게시글 수정

### 인증

- Firebase Authentication 사용
- 브라우저 세션 기반 (브라우저 닫으면 로그아웃)
- 이메일 저장 기능 (localStorage)

## 배포

### Netlify 자동 배포

GitHub 저장소와 Netlify가 연결되어 있어 `main` 브랜치에 push하면 자동 배포됩니다.

### 수동 배포

```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 디자인 시스템

### 컬러

```css
--primary-color: #0F4571;    /* 메인 네이비 */
--primary-light: #1A5A8A;    /* 밝은 네이비 */
--accent-color: #D9232A;     /* 포인트 레드 */
--text-color: #334155;       /* 본문 텍스트 */
--text-heading: #0F4571;     /* 헤딩 텍스트 */
```

### 폰트

- **Outfit**: 영문 헤딩
- **Noto Sans KR**: 한글 본문
- **Inter**: UI 요소

## 개발 가이드

### 새 페이지 추가

1. 루트에 HTML 파일 생성
2. `vite.config.js`의 `input`에 엔트리 추가
3. 필요시 `src/pages/`에 JavaScript 로직 추가
4. `src/components/Header.js`에 네비게이션 링크 추가

### 스타일 수정

- 공통 스타일: `src/assets/style.css`
- 관리자 스타일: `src/assets/admin.css`
- 페이지별 인라인 스타일: 각 HTML 파일의 `<style>` 태그

### Firebase 함수 추가

- 인증 관련: `src/firebase/auth.js`
- DB 관련: `src/firebase/firestore.js`

## 서비스 계정 정보

| 서비스 | 로그인 방식 | 계정 |
|--------|------------|------|
| Firebase Console | Google 로그인 | chlclgus97@gmail.com |
| Netlify | GitHub 로그인 | chlclgus97@gmail.com |

- **Firebase Console**: https://console.firebase.google.com
- **Netlify Dashboard**: https://app.netlify.com

## 문의

- **회사명**: Research Well
- **주소**: 대구광역시 달서구 월배로 347, 3층
- **전화**: 053-657-6288
- **이메일**: kw6258@gmail.com
