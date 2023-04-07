document.addEventListener('DOMContentLoaded', () => {
    const teamHistory = document.querySelector('#team-history');
    const events = teamHistory.querySelectorAll('.event');

    const colors = ['#830506', '#ACACAC', '#111010', '#D90000'];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const color = colors[Math.floor(Math.random() * colors.length)];
        event.style.backgroundColor = color;
        event.style.color = ['#ffffff'];
    }

    function updateEvents() {
        const centerIndex = Math.floor((events.length - 1) / 2);
        const centerEvent = events[centerIndex];

        const viewportHeight = window.innerHeight;
        const userPosition = window.scrollY + viewportHeight / 2;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const distanceFromUser = Math.abs(event.offsetTop + event.offsetHeight / 2 - userPosition + viewportHeight/2);
            const scaleFactor = 1 / (1 + distanceFromUser / viewportHeight);
            event.style.transform = `scale(${scaleFactor})`;

            const fontScaleFactor = Math.max(1 - distanceFromUser / viewportHeight, 0.5);
            event.style.fontSize = `${20 * fontScaleFactor}px`;
        }
    }

    updateEvents();

    window.addEventListener('scroll', () => {
        updateEvents();
    });

    window.addEventListener('resize', () => {
        updateEvents();
    });


});
