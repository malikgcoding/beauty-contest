document.addEventListener("DOMContentLoaded", () => {
    const cursorPosition = document.querySelector(".grid-lines_cursor-position");

    if (cursorPosition) {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener("mousemove", (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            cursorPosition.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale3d(1, 1, 1)`;

            requestAnimationFrame(animate);
        }

        animate();
    }
});
