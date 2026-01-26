export const Footer = () => {
  return `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-col">
          <h3>Research Well</h3>
          <p>주소 : 대구광역시 달서구 월배로 347, 3층 / 대표 : 김 욱</p>
          <p>전화번호 : 053-657-6288 / 010-6688-9108</p>
          <p>E-mail : kw6258@gmail.com</p>
        </div>
        <div class="footer-col">
          <p>&copy; ${new Date().getFullYear()} Research Well. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
};
