'use strict';
const importantText = document.querySelector('.important');

function checkScreenWidth() {
    let windowWidth = window.innerWidth;

    if (windowWidth < 720) importantText.innerHTML = 'Important info';
    else importantText.innerHTML = 'Important info regarding our service';
}
window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);


const disclouser = document.querySelector('.disclouser');
const disclouserInfo = document.querySelector('.disclouser-info');
const downArrow = document.querySelector('.down');

disclouser.addEventListener('click', () => {
    downArrow.classList.toggle('rotate-180');
    disclouserInfo.classList.toggle('hidden');
})