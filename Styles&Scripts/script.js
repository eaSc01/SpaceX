
// viewPort values
let viewHeight = document.documentElement.clientHeight;
let viewWidth = document.documentElement.clientWidth;

const btn = document.getElementById('menu-button'); // points the hamburger
const menuOverlay = document.getElementById('menu-overlay');
const showMenu = document.getElementById('mobile-menu');

const swiperImages = document.querySelectorAll('.swipeImg');  // points to each div containing the bg image in image slider in nav pages
const totalImages = swiperImages.length;        // has size of nodeList, i.e, total number of images in swipe window
const counters = document.querySelectorAll('.number');         // nodeList points to each stat counter
const captionArea = document.getElementById('textContent');
const navBar = document.getElementById('navBar');   // points the navigation bar


let scrollStarted = false;          // this flag stops the counter from restarting when scrolling
let swiperPos = 0;                  // current image pos in swiper
let scrollPosition = window.scrollY;    // current scroll position
let heroAnimateTriggered = false;

const captions = [
    "Launches Dragon to the International Space Station from Launch Complex 39A",
    "Lifts off with its Iridium-8 payload",
    "Radarsat payload at sunset before launch",
    "First and second stages after separating in flight"
];

// const isVisible = (element) => {
//     let rect = element.getBoundingClientRect();
//     return rect.bottom <= document.documentElement.clientHeight;
// }

const isVisible = (element) => {
    // Check if the element is within the viewport's  bounds
    const rect = element.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;

    const verticalInView = rect.top <= windowHeight && rect.bottom >= 0;
    const horizontalInView = rect.left <= windowWidth && rect.right >= 0;

    return verticalInView && horizontalInView;
}

const handleAnimateScroll = () => {
    const delay0sAnimate = document.querySelectorAll('.animate-group0s'); // group 1 animate on scroll delay 0s
    const delay02sAnimate = document.querySelectorAll('.animate-group02s'); // group 1 animate on scroll delay .2s
    const delay04sAnimate = document.querySelectorAll('.animate-group04s'); // group 1 animate on scroll delay .4s

    if (!heroAnimateTriggered) {
        delay0sAnimate.forEach((element) => {
            if (isVisible(element)) {
                element.classList.add('fadeUpIn0s');
                element.style.visibility = 'visible';
            }
        })
        delay02sAnimate.forEach((element) => {
            if (isVisible(element)) {
                element.classList.add('fadeUpIn02s');
                element.style.visibility = 'visible';
            }
        })
        delay04sAnimate.forEach((element) => {
            if (isVisible(element)) {
                element.classList.add('fadeUpIn04s');
                element.style.visibility = 'visible';
            }
        })
    }
}


const handleNavBarScroll = () => {
    
    // this function makes navbar dissappear when scrolling down, and appear when scrolling up
    let newScrollPosition = window.scrollY;

    if (newScrollPosition > scrollPosition) {
        // scroll down behaviour
        navBar.classList.add("navBar-disappear");
    } else {
        // scroll up behaviour
        navBar.classList.remove("navBar-disappear");
    }
    
    scrollPosition = newScrollPosition;
}

function navToggle() {
    // function handles all actions to be performed when clicking hamburger icon
    btn.classList.toggle('menu-btn');                         // toggles the menu-btn class (For hamburger animation)
    menuOverlay.classList.toggle('menu-background');          // toggles black screen when clicked on hamburger
    // document.body.classList.toggle('stop-scrolling');     // doesnt work yet
    showMenu.classList.toggle('show-menu');                     // toggles translateX(0) animation inwards the screen
}


handleAnimateScroll();
window.addEventListener('scroll', handleAnimateScroll);
window.addEventListener('scroll', handleNavBarScroll);
document.addEventListener('scroll', scrollPage);  // listens to scroller
btn.addEventListener('click', navToggle);   // listens to hamburger clicks

function countUp() {
    counters.forEach((counter) => {
        counter.innerText = '0';
        
        function updateCounter() {
            // updates the counter value each iteration
            const target = Number.parseInt(counter.getAttribute('data-value'));     // grabs the destination value
            const current = Number.parseInt(counter.innerText);         // grabs the current counter value
            const increment = target / 15;          // 1/10 of the target is increament

            if (current < target) {
                // to update
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(updateCounter, 75)
            } else {
                // to stop
                counter.innerText = target;
            }
        }
        updateCounter(counter);
    })
}

function scrollPage() {

    // actions based on stat counter with scroll effects
    let scrollPos = window.scrollY;     // takes current scrollY value

    if (scrollPos > 140 && !scrollStarted) {
        // starts the counter
        countUp();
        scrollStarted = true;
    } else if (scrollPos < 140 && scrollStarted) {
        // resets the counter
        reset();
        scrollStarted = false;
    }
}

function reset() {
    // resets the counter when scrolling back
    counters.forEach((counter) => counter.innerText = '0');
}

// goes through each image, and multiplies its index value to 100, to push each image 100% towards right in image slide
swiperImages.forEach((image, index) => {
    image.style.left = `${index * 100}%`;
})

function leftSwipe() {
    // actions to perform for left swipe
    swiperPos = (swiperPos - 1 + totalImages) % totalImages;
    captionArea.innerHTML = captions[swiperPos];
    swipeTheImg();
}

function rightSwipe() {
    // actions to perform for right swipe
    swiperPos = (swiperPos + 1) % totalImages;
    captionArea.innerHTML = captions[swiperPos];
    swipeTheImg();
}

function swipeTheImg() {
    // swipes the image in slider based on swiperPos count
    swiperImages.forEach((img) => {
        img.style.transform = `translateX(-${swiperPos * 100}%)`;
    })
}