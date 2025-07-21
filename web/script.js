//FOR LAPTOP AND DESKTOPS
if(window.innerWidth > 900 ) {
   // Desktop navigation is now hidden
   //LOCOMOTIVE
function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}
init();

//Page1
gsap.from(".page1 .MiddleText", {
    y: 2,
    rotate: 5,
    delay: 0.3,
    duration: 0.7,
    opacity: 0
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#Digi",
        scroller: ".main",
        scrub: 2,
        //markers:true,
        start: "top 20%",
        end: "top -10%"
    }
})

tl.to("#Digi", {
    x: -60
}, "anim")

tl.to("#Digi2", {
    x: 60
}, "anim")

tl.to("#videoo", {
    width: "90%"
}, "anim")
document.addEventListener("DOMContentLoaded", function () {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            //markers: true,
            start: "top 5%",
            end: "top 0%",
            scrub: 2
        }
    });

    tl2.to(".page2, .page3", {
        backgroundColor: "#fff"
    });
    
    // Handle Get in Touch button
    const getInTouchBtn = document.getElementById('getInTouchBtn');
    const pointerArrow = document.getElementById('pointerArrow');
    const contactFormSection = document.getElementById('contactFormSection');
    const emailInput = document.getElementById('emailInput');
    
    if(getInTouchBtn && pointerArrow && contactFormSection && emailInput) {
        getInTouchBtn.addEventListener('click', function() {
            // Scroll to form
            contactFormSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show arrow and animate it
            setTimeout(function() {
                pointerArrow.classList.add('visible');
                
                // For mobile, wait a bit longer before focusing to ensure scroll is complete
                setTimeout(function() {
                    emailInput.focus();
                }, window.innerWidth <= 767 ? 300 : 0);
                
                // Hide arrow after 3 seconds
                setTimeout(function() {
                    pointerArrow.classList.remove('visible');
                }, 3000);
            }, window.innerWidth <= 767 ? 800 : 600);
        });
    }
    
    // Fix input focus issues on mobile
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Ensure the input is in view when focused on mobile
            if(window.innerWidth <= 767) {
                setTimeout(() => {
                    this.scrollIntoView({behavior: 'smooth', block: 'center'});
                }, 300);
            }
        });
    });
    
    // Handle form submission
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    
    if(sendMessageBtn && nameInput && emailInput && messageInput) {
        sendMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Basic validation
            if(!nameInput.value.trim()) {
                alert('Please enter your name');
                nameInput.focus();
                return;
            }
            
            if(!emailInput.value.trim()) {
                alert('Please enter your email');
                emailInput.focus();
                return;
            }
            
            if(!messageInput.value.trim()) {
                alert('Please enter your message');
                messageInput.focus();
                return;
            }
            
            // Form is valid
            const mailtoLink = `mailto:m.ahmad.software.engineer@gmail.com?subject=Message from ${nameInput.value}&body=${encodeURIComponent(messageInput.value)}`;
            window.location.href = mailtoLink;
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            
            // Show confirmation message
            alert('Thank you for your message! Redirecting to your email client...');
        });
    }
});

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#pg4Help",
        scroller: ".main",
        //markers:true,
        start: "top 100%",
        scrub: 4
    }
});

tl3.to(".page4 , .page5 ,.page3 ,.page2", {
    backgroundColor: "#0F0D0D"
}, "color")

var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".div2ForPg5",
        scroller: ".main",
        // markers:true,
        start: "103% 65%",
        end: "0% 0%",
        scrub: 4,
        // pin:true
    }
})

// tl4.to(".div2ForPg5", {
//     x: "-270%"
// }, "lol");

tl4.to(".lineWhite", {
    width: "400vw"
}, "lol");

var crsr = document.querySelector(".cursor");
var xPrevScale = 0;
var yPrevScale = 0;
var time;

function mouseSkew() {
    window.addEventListener("mousemove", (event) => {
        clearTimeout(time);

        var xDiff = event.clientX - xPrevScale;
        var yDiff = event.clientY - yPrevScale;

        xPrevScale = event.clientX;
        yPrevScale = event.clientY;

        // Normalize and clamp the scale
        var xScale = gsap.utils.clamp(0.8, 1.2, 1 + (xDiff));
        var yScale = gsap.utils.clamp(0.8, 1.2, 1 + (yDiff));

        cursorMove(event.clientX, event.clientY, xScale, yScale);

        // Reset the scale after 100ms
        time = setTimeout(function () {
            crsr.style.transform = `translate(${event.clientX}px , ${event.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function cursorMove(x, y, xScale, yScale) {
    crsr.style.transform = `translate(${x}px , ${y}px) scale(${xScale} , ${yScale})`;
}

mouseSkew();
document.querySelectorAll(".Elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3.easeOut,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        // Get the viewport height in pixels
        let viewportHeight = window.innerHeight;
        
        // Convert 50vh to pixels
        let pixels = (50 / 100) * viewportHeight;
        
        var diff = (dets.clientY - elem.getBoundingClientRect().top - (pixels /2));
       
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        // console.log(elem.getBoundingClientRect().top);
        //console.log(Array.from(elem.parentNode.children).indexOf(elem));
        // Set display to block before starting the animation
        elem.querySelector("img").style.display = "block";
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3.easeOut,
            duration: 0.5,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

console.log("Desktop and Laptop devices detected. Navigation hidden, Locomotive Scroll initialized, and animations set up.");
}

// For mobile and tablet devices
else if(window.innerWidth <= 991) {
    document.addEventListener("DOMContentLoaded", function() {
        // Show navigation for mobile
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.display = 'flex';
            
            // Add mobile-specific navigation styling
            nav.classList.add('mobile-nav');
            
            // Add hamburger menu functionality for mobile
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.cssText = 'position: fixed; top: 15px; right: 15px; z-index: 1000; background: rgba(0,0,0,0.5); color: white; border: none; font-size: 24px; padding: 8px 15px; border-radius: 5px; transition: all 0.3s ease;';
            
            document.body.appendChild(mobileMenuBtn);
            
            const navMiddle = document.querySelector('.navMiddle');
            if (navMiddle) {
                navMiddle.style.display = 'none'; // Hide by default on mobile
                
                mobileMenuBtn.addEventListener('click', function() {
                    if (navMiddle.style.display === 'none') {
                        navMiddle.style.display = 'flex';
                        navMiddle.style.flexDirection = 'column';
                        navMiddle.style.position = 'fixed';
                        navMiddle.style.top = '0';
                        navMiddle.style.left = '0';
                        navMiddle.style.right = '0';
                        navMiddle.style.bottom = '0'; // Make it full height
                        navMiddle.style.backgroundColor = 'rgba(0,0,0,0.95)';
                        navMiddle.style.padding = '60px 20px 20px';
                        navMiddle.style.zIndex = '999';
                        
                        // Animate menu items with improved animation
                        Array.from(navMiddle.children).forEach((item, index) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(30px)';
                            setTimeout(() => {
                                item.style.transition = 'all 0.5s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 150 * index);
                        });
                        
                        // Add styling to make menu button appear active
                        mobileMenuBtn.style.backgroundColor = 'rgba(237, 191, 255, 0.7)';
                        
                        mobileMenuBtn.innerHTML = '✕';
                    } else {
                        navMiddle.style.display = 'none';
                        mobileMenuBtn.innerHTML = '☰';
                    }
                });
            }
        }
        
        // Define carousel containers that need navigation
        const carouselContainers = [
            document.querySelector('.pics'),
            document.querySelector('.pics2')
        ];
        
        // Add carousel wrapper and navigation buttons to each container
        carouselContainers.forEach(container => {
            if (container) {
                // Create wrapper for the container
                const wrapper = document.createElement('div');
                wrapper.className = 'carousel-wrapper';
                
                // Move the container's children to a slide container
                const slideContainer = document.createElement('div');
                slideContainer.className = 'scroll-container';
                
                // Clone the container's content
                while (container.firstChild) {
                    slideContainer.appendChild(container.firstChild);
                }
                
                // Add the slide container to the wrapper
                wrapper.appendChild(slideContainer);
                
                // Navigation buttons have been removed
                
                // Replace the original container with the wrapper
                container.parentNode.replaceChild(wrapper, container);
                
                // Add slide transition class to all direct children
                Array.from(slideContainer.children).forEach(child => {
                    child.classList.add('slide');
                });
                
                // Set up navigation
                let currentIndex = 0;
                const slideCount = slideContainer.children.length;
                
                // Update the slide position based on current index
                function updateSlidePosition() {
                    const translateX = -100 * currentIndex;
                    slideContainer.style.transform = `translateX(${translateX}%)`;
                }
                
                // Initialize slides
                updateSlidePosition();
                
                // Add touch swipe support
                let startX, moveX;
                
                slideContainer.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                }, { passive: true });
                
                slideContainer.addEventListener('touchmove', function(e) {
                    if (!startX) return;
                    moveX = e.touches[0].clientX;
                }, { passive: true });
                
                slideContainer.addEventListener('touchend', function() {
                    if (startX && moveX) {
                        const diff = startX - moveX;
                        if (Math.abs(diff) > 50) { // Minimum swipe distance
                            if (diff > 0) {
                                // Swipe left - go to next
                                if (currentIndex < slideCount - 1) {
                                    currentIndex++;
                                    updateSlidePosition();
                                }
                            } else {
                                // Swipe right - go to previous
                                if (currentIndex > 0) {
                                    currentIndex--;
                                    updateSlidePosition();
                                }
                            }
                        }
                    }
                    // Reset values
                    startX = null;
                    moveX = null;
                }, { passive: true });
            }
        });
    });
}
    
  // Define the content arrays for headings and descriptions
      const headings = [
    "I BUILD MODERN FRONTENDS<br>WITH REACT, THREE.JS, TAILWIND & SCSS",
    "I DEVELOP ROBUST BACKENDS<br>USING EXPRESS & SPRING BOOT",
    "I DESIGN DATABASE ARCHITECTURES<br>WITH POSTGRE, SSMS & FIREBASE",
    "I DEPLOY APPS SEAMLESSLY<br>WITH DOCKER, VERCEL & RAILWAY"
];

const descriptions = [
    "I craft responsive, interactive, and high-performing UIs using React. For styling, I blend the utility-first power of Tailwind CSS with the flexibility of SCSS. I optimize components with hooks like useMemo and useCallback, and bring visuals to life using Three.js to build stunning 3D experiences right in the browser.",
    
    "My backend work involves building scalable RESTful APIs with Express and enterprise-grade services with Spring Boot. I implement SOLID principles and design patterns like MVC and Singleton, apply data structures for optimized logic, and test endpoints using Postman to ensure rock-solid performance and security.",
    
    "From relational databases like PostgreSQL and SSMS to real-time NoSQL with Firebase — I structure data for performance and scalability. I use Neon Console for hosting PostgreSQL, design clean schema relationships, apply indexing, and manage real-time data syncing and secure authentication flows.",
    
    "I containerize full-stack apps using Docker for consistent environments. For deployment, I use Vercel for frontend hosting and Railway for backend and full-stack projects. With automated CI/CD pipelines, I ensure quick, reliable, and production-ready releases every time."
];

        
        let currentIndex = 0; // Current index to track position
        
        // Get references to navigation elements and content elements
        const mainNavContainer = document.getElementById('content-nav');        
        const prevBtn = mainNavContainer ? mainNavContainer.querySelector('.prev-btn') : null;
        const nextBtn = mainNavContainer ? mainNavContainer.querySelector('.next-btn') : null;
        
        // Get references to the displayed content elements - with more specific selectors
        const numberElement = document.querySelector('.div2ForPg5 .num1');
        const headingElement = document.querySelector('.div2ForPg5 .news1 p');
        const descriptionElement = document.querySelector('.div2ForPg5 .newsUnderLine1 p');
        
        console.log("Element references:", {
            mainNavContainer: !!mainNavContainer,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            numberElement: !!numberElement,
            headingElement: !!headingElement,
            descriptionElement: !!descriptionElement
        });
        
        // Hide all sections except the first one
        document.querySelectorAll('.head2, .head3, .head4, .newsUnderLine2, .newsUnderLine3, .newsUnderLine4').forEach(elem => {
            elem.style.display = 'none';
        });
        
        // Function to update content and button visibility based on current index
        function updateContent() {
            console.log("Updating content to index:", currentIndex);
            
            // Double-check that index is within valid range
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= headings.length) currentIndex = headings.length - 1;
            
            // Log the actual content we're about to show with full details
            console.log("Content to display:", {
                index: currentIndex,
                number: String(currentIndex + 1).padStart(3, '0'),
                heading: headings[currentIndex],
                description: descriptions[currentIndex]
            });
            
            // Apply fade-out effect
            if (headingElement && descriptionElement) {
                headingElement.style.opacity = '0';
                descriptionElement.style.opacity = '0';
                
                // After a short delay, update content and fade back in
                setTimeout(() => {
                    // Update the numeric indicator (001, 002, etc.)
                    if (numberElement) {
                        const paddedIndex = String(currentIndex + 1).padStart(3, '0');
                        numberElement.querySelector('p').textContent = paddedIndex;
                        console.log("Updated number display to:", paddedIndex);
                    }
                    
                    // Update the heading text
                    if (headingElement) {
                        headingElement.innerHTML = headings[currentIndex];
                        headingElement.style.opacity = '1';
                        console.log("Updated heading to:", headings[currentIndex]);
                    }
                    
                    // Update the description text
                    if (descriptionElement) {
                        descriptionElement.innerHTML = descriptions[currentIndex];
                        descriptionElement.style.opacity = '1';
                        console.log("Updated description to match index:", currentIndex);
                    }
                    
                    // Force a repaint to ensure changes are reflected visually
                    document.body.style.display = 'none';
                    document.body.offsetHeight; // Force a reflow
                    document.body.style.display = '';
                    
                }, 300);
            } else {
                console.error("Critical content elements not found:", {
                    numberElement: !!numberElement,
                    headingElement: !!headingElement,
                    descriptionElement: !!descriptionElement
                });
            }
            
            // Update navigation button visibility based on current position
            const prevBtnElement = document.querySelector('.prev-btn');
            const nextBtnElement = document.querySelector('.next-btn');
            
            if (prevBtnElement && nextBtnElement) {
                // Show/hide previous button based on whether we're at the first item
                prevBtnElement.style.display = currentIndex > 0 ? 'inline-block' : 'none';
                
                // Show/hide next button based on whether we're at the last item
                nextBtnElement.style.display = currentIndex < headings.length - 1 ? 'inline-block' : 'none';
                
                console.log("Navigation button visibility updated:", {
                    currentIndex: currentIndex,
                    prevBtn: currentIndex > 0 ? 'visible' : 'hidden',
                    nextBtn: currentIndex < headings.length - 1 ? 'visible' : 'hidden'
                });
            } else {
                console.error("Navigation buttons not found for visibility update");
            }
            
            // Debug output to verify current state
            console.log("Content updated successfully to index:", currentIndex);
        }
        
        // Set up event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                console.log("Previous button clicked, current index before:", currentIndex);
                e.preventDefault();
                e.stopPropagation();
                if (currentIndex > 0) {
                    currentIndex--;
                    console.log("New index after decrement:", currentIndex);
                    updateContent();
                }
            });
        } else {
            console.error("Previous button not found");
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                console.log("Next button clicked, current index before:", currentIndex);
                e.preventDefault();
                e.stopPropagation();
                if (currentIndex < headings.length - 1) {
                    // Only increment by 1 to go to the next item
                    currentIndex = currentIndex + 1;
                    console.log("New index after increment:", currentIndex);
                    updateContent();
                }
            });
        } else {
            console.error("Next button not found");
        }
        
        // Add fallback click listeners to the main nav container
        if (mainNavContainer) {
            const navButtons = mainNavContainer.querySelectorAll('button');
            navButtons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    console.log("Button clicked via container:", btn.className, "current index:", currentIndex);
                    e.preventDefault();
                    e.stopPropagation();
                    if (btn.classList.contains('prev-btn') && currentIndex > 0) {
                        currentIndex = Math.max(0, currentIndex - 1);
                        console.log("New index after prev click:", currentIndex);
                        updateContent();
                    } else if (btn.classList.contains('next-btn') && currentIndex < headings.length - 1) {
                        // Explicitly increment by 1 to go through all indices in order
                        currentIndex = Math.min(headings.length - 1, currentIndex + 1);
                        console.log("New index after next click:", currentIndex);
                        updateContent();
                    }
                });
            });
        }
        
        // Initialize content
        updateContent();
        
        // Clear all previous event listeners and add fresh ones
        if (mainNavContainer) {
            // Create completely new buttons to remove any existing handlers
            const navContainer = mainNavContainer.cloneNode(false); // Clone without children
            
            // Create brand new buttons
            const newPrevButton = document.createElement('button');
            newPrevButton.className = 'prev-btn';
            newPrevButton.textContent = 'Previous';
            
            const newNextButton = document.createElement('button');
            newNextButton.className = 'next-btn';
            newNextButton.textContent = 'Next';
            
            // Add buttons to the cloned container
            navContainer.appendChild(newPrevButton);
            navContainer.appendChild(newNextButton);
            
            // Replace old container with new one
            mainNavContainer.parentNode.replaceChild(navContainer, mainNavContainer);
            
            // Add event listeners to new buttons
            newNextButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("CLEAN Next button click, current index:", currentIndex);
                
                if (currentIndex < headings.length - 1) {
                    // Increment by exactly 1 to ensure all items are shown
                    currentIndex = currentIndex + 1;
                    console.log("New index after increment:", currentIndex);
                    updateContent();
                }
            });
            
            newPrevButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("CLEAN Prev button click, current index:", currentIndex);
                
                if (currentIndex > 0) {
                    // Decrement by exactly 1
                    currentIndex = currentIndex - 1;
                    console.log("New index after decrement:", currentIndex);
                    updateContent();
                }
            });
            
            // Debug log to confirm new buttons are set up
            console.log("Fresh navigation buttons created with new event listeners");
        }
        // Add enhanced debug information to help with troubleshooting
        const contentArea = document.querySelector('.div2ForPg5');
        const debugInfo = document.getElementById('debug-info');
        const currentIndexDisplay = document.getElementById('current-index');
        
        function updateDebugDisplay() {
            if (currentIndexDisplay) {
                currentIndexDisplay.textContent = currentIndex;
            }
            
            if (debugInfo) {
                debugInfo.innerHTML = `
                    ${currentIndex + 1} of ${headings.length}
                `;
            }
        }
        
        // Update debug display when content changes
        const originalUpdateContent = updateContent;
        updateContent = function() {
            originalUpdateContent();
            updateDebugDisplay();
        };
        
        // Initialize debug display
        updateDebugDisplay();
        
        // After a short delay, check if the navigation is working
        setTimeout(() => {
            console.log("Current navigation state:", {
                currentIndex: currentIndex,
                totalHeadings: headings.length,
                buttonsFound: !!document.querySelector('#content-nav'),
                prevBtnVisible: document.querySelector('.prev-btn')?.style.display !== 'none',
                nextBtnVisible: document.querySelector('.next-btn')?.style.display !== 'none'
            });
        }, 1000);