document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');
    
    let currentTranslate = 0;
    let itemWidth = 0;
    let gap = 20; // Match your CSS gap value

    function updateCarousel() {
        // Get fresh measurements
        itemWidth = items[0].offsetWidth;
        const containerWidth = container.offsetWidth;
        const totalTrackWidth = items.length * (itemWidth + gap);
        const maxTranslate = Math.min(0, containerWidth - totalTrackWidth);

        // Apply constraints
        currentTranslate = Math.max(currentTranslate, maxTranslate);
        currentTranslate = Math.min(currentTranslate, 0);
        
        track.style.transform = `translateX(${currentTranslate}px)`;
        
        // Update button states
        btnLeft.disabled = currentTranslate === 0 ;
        btnRight.disabled = currentTranslate <= maxTranslate ;
    }

    function moveCarousel(direction) {
        // Get fresh item width in case of resize
        itemWidth = items[0].offsetWidth;
        const step = itemWidth + gap;
        
        if(direction === 'forward') {
            currentTranslate -= step;
        } else if(direction === 'backward') {
            currentTranslate += step;
        }
        
        updateCarousel();
    }

    // Initial setup
    updateCarousel();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 100);
    });

    // Button event listeners
    btnRight.addEventListener('click', () => moveCarousel('forward'));
    btnLeft.addEventListener('click', () => moveCarousel('backward'));
});

const testimonials = [
    { text: "As a machine quilter, I love the sheen of Glide and how it adds an extra special touch to my quilts.It's the perfect blend of beauty and strength. Not only do I love the thread, but I love working with Hab+Dash to bring out the best in my quilting. They have been an integral part of our Free Motion Quilting Challenges and helped meet our thread needs each time!", author:"- Angela Walters -" },
    { text: "The thread quality is outstanding and makes my projects stand out! I’ve never used a product that glides so smoothly through my machine. Hab+Dash has truly elevated my quilting experience.", author: "- Jane Doe -" },
    { text: "I’ve been quilting for over 20 years, and this is by far the best thread I’ve ever used. The colors are vibrant, the strength is unmatched, and my projects always turn out beautifully!", author: "- John Smith -" }
];

let currentTestimonial = 0;

function updateTestimonial() {
    document.getElementById("testimonial-text").innerText = testimonials[currentTestimonial].text;
    document.getElementById("testimonial-author").innerText = testimonials[currentTestimonial].author;
    document.getElementById("testimonial-index").innerText = `${currentTestimonial + 1} / ${testimonials.length}`;
    
    document.getElementById("prev-btn").disabled = currentTestimonial === 0;
    document.getElementById("next-btn").disabled = currentTestimonial === testimonials.length - 1;
}

function nextTestimonial() {
    if (currentTestimonial < testimonials.length - 1) {
        currentTestimonial++;
        updateTestimonial();
    }
}

function prevTestimonial() {
    if (currentTestimonial > 0) {
        currentTestimonial--;
        updateTestimonial();
    }
}

updateTestimonial();

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

// Toggle mobile menu
const toggleMenu = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
};

hamburger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu on menu item click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Close menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    }
});
