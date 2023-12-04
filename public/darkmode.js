//darkmode 토글 버튼
const checkbox = document.getElementById('checkbox');

//html 태그에 class='dark'를 적용해야함
const html = document.querySelector('html');

checkbox.addEventListener('click', () => {
    checkbox.checked ? html.classList.add('dark') : html.classList.remove('dark')
});