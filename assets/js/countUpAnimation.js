const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // The element will start counting when at least 50% visible
};

document.addEventListener('DOMContentLoaded', function () {
    const countUpElements = document.querySelectorAll('[data-final-count]');

    const startCountUpAnimation = (entries, observer) => {
        const minDuration = 2500; // 2.5 seconds
        const maxDuration = 5000; // 5 seconds
        entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalCount = parseInt(element.getAttribute('data-final-count').replace(/,/g, ''));
                    const randomDuration = Math.random() * (maxDuration - minDuration) + minDuration;
                    const step = finalCount / (randomDuration / 10);
                    let currentCount = 0;
                    const updateCount = () => {
                        currentCount += step;
                        if (currentCount < finalCount) {
                            element.textContent = Math.round(currentCount).toLocaleString();
                            requestAnimationFrame(updateCount);
                        } else {
                            element.textContent = finalCount.toLocaleString();
                        }
                    };
                updateCount();
                observer.unobserve(element); // Once counted, stop observing this element
                }
        });
    };

    const intersectionObserver = new IntersectionObserver(startCountUpAnimation, observerOptions);
    countUpElements.forEach((element) => intersectionObserver.observe(element));
});
