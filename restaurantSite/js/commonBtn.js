var aboutUs = document.getElementById('aboutUs');
var menu = document.getElementById('menu');
var contactUs = document.getElementById('contactUs');

aboutUs.addEventListener('click', goToAboutUs);
menu.addEventListener('click', goToMenu);
contactUs.addEventListener('click', goToContactUs);

function goToAboutUs() {
    location.href = 'aboutUsTheRetro.html';
}

function goToMenu() {
    location.href = 'menuTheRetro.html';
}

function goToContactUs() {
    location.href = 'contactUsTheRetro.html';
}