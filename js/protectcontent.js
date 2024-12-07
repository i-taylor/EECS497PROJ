document.addEventListener('DOMContentLoaded', () => {
    const disableRightClick = () => {
        const images = document.querySelectorAll('img');
        images.forEach((image) => {
            if (!image.dataset.listenerAdded) {
                image.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    alert('Right-click is disabled on media to protect user content. Message the user to access their work!');
                });
                image.dataset.listenerAdded = true;
            }
        });
    };

    disableRightClick();

    const observer = new MutationObserver(() => {
        disableRightClick();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});