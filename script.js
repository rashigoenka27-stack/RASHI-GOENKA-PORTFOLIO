// script.js
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
const cursor = document.getElementById('cursor');

// Only run cursor logic if it's a pointing device (desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Add hover effect for links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
} else {
    // Hide cursor on mobile/touch
    if (cursor) cursor.style.display = 'none';
}

// 2. Responsive Menu Logic
// We use the IDs present in your HTML: 'menu', 'menu-btn', and 'close-btn'
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

/**
 * Function to Open Menu
 */
const openMenuAction = () => {
    if (menu) {
        // Ensure it starts from 100% before animating in
        gsap.set(menu, { xPercent: 100 }); 
        
        gsap.to(menu, { 
            xPercent: 0, 
            duration: 0.8, 
            ease: "expo.inOut" 
        });

        // Staggered text entrance for links inside menu
        const menuLinks = menu.querySelectorAll('.menu-link');
        gsap.fromTo(menuLinks, 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3
            }
        );
    }
};

/**
 * Function to Close Menu
 */
const closeMenuAction = () => {
    if (menu) {
        gsap.to(menu, { 
            xPercent: 100, 
            duration: 0.8, 
            ease: "expo.inOut" 
        });
    }
};

// Event Listeners for Menu
if (menuBtn) menuBtn.addEventListener('click', openMenuAction);
if (closeBtn) closeBtn.addEventListener('click', closeMenuAction);

// 3. Smooth Close on Link Click
// Ensures the menu closes when a user clicks a nav link
const allMenuLinks = document.querySelectorAll('.menu-link');
allMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenuAction);
});

// 4. Handle Window Resizing
// If the user resizes from mobile to desktop while menu is open, hide it
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenuAction();
    }
});