const info = document.getElementById('info');
const deck = document.getElementById('deck');
const home = document.getElementById('home');
const navCollapse = document.getElementsByClassName('navbar-toggler');
const buttonCollapse = document.getElementById('navbarCollapse');



deck.addEventListener('click', (e) => {
    const sections = document.getElementsByClassName('section');
    const section_title_deck = sections[1].children[0];
    const section_title_info = sections[0].children[0];
    info.classList.remove("active");
    deck.classList.add("active");
    if (navCollapse[0].getAttribute('aria-expanded') === 'true') {
        navCollapse[0].setAttribute('aria-expanded', 'false');
        navCollapse[0].classList.add("collapsed");
        buttonCollapse.classList.remove('show');
    }
    section_title_deck.classList.add("active");
    section_title_info.classList.remove("active");

});
info.addEventListener('click', (e) => {
    const sections = document.getElementsByClassName('section');
    const section_title_deck = sections[1].children[0];
    const section_title_info = sections[0].children[0];
    deck.classList.remove("active");
    info.classList.add("active");
    if (navCollapse[0].getAttribute('aria-expanded') === 'true') {
        navCollapse[0].setAttribute('aria-expanded', 'false');
        navCollapse[0].classList.add("collapsed");
        buttonCollapse.classList.remove('show');
    }
    section_title_deck.classList.remove("active");
    section_title_info.classList.add("active");
});
home.addEventListener('click', (e) => {
    const sections = document.getElementsByClassName('section');
    const section_title_deck = sections[1].children[0];
    const section_title_info = sections[0].children[0];
    deck.classList.remove("active");
    info.classList.add("active");
    if (navCollapse[0].getAttribute('aria-expanded') === 'true') {
        navCollapse[0].setAttribute('aria-expanded', 'false');
        navCollapse[0].classList.add("collapsed");
        buttonCollapse.classList.remove('show');
    }
    section_title_deck.classList.remove("active");
    section_title_info.classList.add("active");
});


