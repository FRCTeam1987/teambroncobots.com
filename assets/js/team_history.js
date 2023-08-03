document.addEventListener('DOMContentLoaded', () => {
    const teamHistory = document.querySelector('#team-history');
    const events = teamHistory.querySelectorAll('.event');

    const colors = ['#830506', '#ACACAC', '#111010', '#D90000'];

    // Precompute colors and store them in an array for each event
    for (let i = 0; i < events.length; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        events[i].style.backgroundColor = color;
        events[i].style.color = '#ffffff'; // Fix typo in setting color
    }

    let nearestEventIndex = -1; // Index of the nearest event to the center
    const viewportHeight = window.innerHeight;

    function updateVisibleEvents() {
        const userPosition = window.scrollY + viewportHeight / 2;
        let minDistance = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];

            // Check if the event is within the user's view
            if (isElementInViewport(event)) {
                const distanceFromUser = Math.abs(event.offsetTop + event.offsetHeight / 2 - userPosition + viewportHeight / 2);

                if (distanceFromUser < minDistance) {
                    minDistance = distanceFromUser;
                    nearestEventIndex = i;
                }
            }
        }

        // Calculate the scale factor for each event based on their distance from the center event
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const distanceFromCenter = Math.abs(i - nearestEventIndex);
            let scaleFactor = 1 - distanceFromCenter * 0.15;
            scaleFactor = Math.max(scaleFactor, 0.01); // Ensure scaleFactor is not negative (minimum value of 0.01).
            event.style.transform = `scale(${scaleFactor})`;

            const fontScaleFactor = Math.max(1 - distanceFromCenter * 0.1, 0.5);
            event.style.fontSize = `${20 * fontScaleFactor}px`;
        }
    }

    // Function to scroll to the nearest event
    function scrollToNearestEvent() {
        if (nearestEventIndex !== -1) {
            const event = events[nearestEventIndex];
            const eventTop = event.offsetTop;
            window.scrollTo({
                top: eventTop,
                behavior: 'smooth', // Add smooth scrolling effect
            });
        }
    }

    // Initial update to display events visible on page load
    updateVisibleEvents();

    // Throttle the update function to avoid excessive calls while scrolling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateVisibleEvents();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Call updateEvents on window resize to handle scaling properly
    window.addEventListener('resize', () => {
        updateVisibleEvents();
    });

    // Scroll to the nearest event after scrolling stops
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(scrollToNearestEvent, 150); // Adjust the delay time as needed
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
