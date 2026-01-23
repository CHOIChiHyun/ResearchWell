(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const a=()=>{const t=window.location.pathname.includes("reports.html");return`
    <header class="header">
      <div class="container header-container">
        <a href="./" class="logo">
          <img src="images/logo.png" alt="Research Well Logo" class="logo-img">
        </a>
        <nav class="nav">
          <ul class="nav-list">
            <li><a href="${t?"./index.html":"#home"}" class="${t?"":"active"}">Home</a></li>
            <li><a href="${t?"./index.html#mission":"#mission"}">Mission</a></li>
            <li><a href="${t?"./index.html#vision":"#vision"}">Vision</a></li>
            <li><a href="${t?"./index.html#service":"#service"}">Business Areas</a></li>
            <li><a href="./reports.html" target="_blank" class="${t?"active":""}">Research Reports</a></li>
          </ul>
        </nav>
        <button class="mobile-menu-btn" aria-label="Toggle Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `},d=()=>`
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-col">
          <h3>Research Well</h3>
          <p>주소 : 대구광역시 달서구 월배로 347, 3층 / 대표 : 김 욱</p>
          <p>전화번호 : 053-657-6288 / 010-6688-9108</p>
          <p>E-mail : researchwell@naver.com</p>
        </div>
        <div class="footer-col">
          <p>&copy; ${new Date().getFullYear()} Research Well. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,u=()=>{const t=document.querySelectorAll("section[id]"),n=document.querySelectorAll(".nav-list a");if(!!window.location.pathname.includes("reports.html"))return;function s(){let e="";const o=window.scrollY+120;if(t.forEach(i=>{const r=i.offsetTop,c=i.clientHeight;o>=r&&o<r+c&&(e=i.getAttribute("id"))}),n.forEach(i=>{i.classList.remove("active");const r=i.getAttribute("href");e&&r.includes(`#${e}`)&&i.classList.add("active")}),!e&&window.scrollY<100){const i=document.querySelector('.nav-list a[href="#home"]');i&&i.classList.add("active")}}window.addEventListener("scroll",s),setTimeout(s,100)},f=()=>{const t=document.querySelector(".mobile-menu-btn");t&&t.addEventListener("click",()=>{console.log("Mobile menu active")})};document.addEventListener("DOMContentLoaded",()=>{document.getElementById("app");const t=document.getElementById("header-root"),n=document.getElementById("footer-root");t&&(t.innerHTML=a()),n&&(n.innerHTML=d()),u(),f(),console.log("Research Well Application Initialized")});
