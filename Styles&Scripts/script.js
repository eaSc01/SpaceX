const btn = document.getElementById('menu-button'); // points the hamburger
const menuOverlay = document.getElementById('menu-overlay');
const showMenu = document.getElementById('mobile-menu');

const swiperImages = document.querySelectorAll('.swipeImg');  // points to each div containing the bg image in image slider in nav pages
const totalImages = swiperImages.length;        // has size of nodeList, i.e, total number of images in swipe window
const counters = document.querySelectorAll('.number');         // nodeList points to each stat counter
const captionArea = document.getElementById('textContent');

let scrollStarted = false;          // this flag stops the counter from restarting when scrolling
let swiperPos = 0;                  // current image pos in swiper

const captions = [
    "Falcon 9 launches Dragon to the International Space Station from Launch Complex 39A",
    "Falcon 9 lifts off with its Iridium-8 payload",
    "Falcon 9 with its Radarsat payload at sunset before launch",
    "Falcon 9 first and second stages after separating in flight"
];

document.addEventListener('scroll', scrollPage);  // listens to scroller
btn.addEventListener('click', navToggle);   // listens to hamburger clicks

function navToggle() {  
    // function handles all actions to be performed when clicking hamburger icon
    btn.classList.toggle('menu-btn');                         // toggles the menu-btn class (For hamburger animation)
    menuOverlay.classList.toggle('menu-background');          // toggles black screen when clicked on hamburger
    // document.body.classList.toggle('stop-scrolling');     // doesnt work yet
    showMenu.classList.toggle('show-menu');                     // toggles translateX(0) animation inwards the screen
}


function countUp() {
    counters.forEach((counter)=> {
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