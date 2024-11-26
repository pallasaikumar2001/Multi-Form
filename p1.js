document.addEventListener("DOMContentLoaded", function() {
    const steps = document.querySelectorAll('.step');
    let count = 0;

    const updateSteps = () => {
        steps.forEach((step, index) => {
            if (index === count) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });
    };

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', function() {
        
        count = (count + 1) % steps.length; // Increment count and wrap around using modulo
        updateSteps();
        console.log()
    });

    // Initialize display
    updateSteps();
});
